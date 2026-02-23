#!/usr/bin/env python3
"""
Batch PDF extraction using docling.

Processes all PDFs in Attachments/ and outputs markdown to Attachments/docling_output/.
Skips already-processed PDFs unless --force is specified.

Usage:
    python scripts/batch_pdf_extract.py              # Process new PDFs only
    python scripts/batch_pdf_extract.py --force      # Re-process all PDFs
    python scripts/batch_pdf_extract.py --dry-run    # Show what would be processed
"""

import argparse
import json
import sys
import time
from pathlib import Path
from datetime import datetime

# Vault paths
VAULT_ROOT = Path(__file__).parent.parent
PDF_DIR = VAULT_ROOT / "Attachments"
OUTPUT_DIR = PDF_DIR / "docling_output"


def get_all_pdfs() -> list[Path]:
    """Find all PDFs in Attachments/ directory (recursive)."""
    pdfs = list(PDF_DIR.glob("**/*.pdf"))
    # Exclude PDFs in docling_output directory
    pdfs = [p for p in pdfs if "docling_output" not in str(p)]
    return sorted(pdfs)


def get_output_path(pdf_path: Path) -> Path:
    """Get the output markdown path for a PDF."""
    return OUTPUT_DIR / f"{pdf_path.stem}_docling.md"


def is_processed(pdf_path: Path) -> bool:
    """Check if PDF has already been processed."""
    output_path = get_output_path(pdf_path)
    if not output_path.exists():
        return False
    # Check if output is newer than PDF (re-process if PDF updated)
    return output_path.stat().st_mtime >= pdf_path.stat().st_mtime


def process_pdf(pdf_path: Path, converter) -> dict:
    """
    Process a single PDF with docling.
    Returns dict with status and metadata.
    """
    output_md = get_output_path(pdf_path)
    output_json = OUTPUT_DIR / f"{pdf_path.stem}_docling.json"

    start_time = time.time()

    try:
        # Convert PDF
        result = converter.convert(str(pdf_path))

        # Export to markdown
        markdown = result.document.export_to_markdown()

        # Export to dict/JSON
        doc_dict = result.document.export_to_dict()

        # Get stats
        page_count = len(result.document.pages)
        table_count = len(result.document.tables) if hasattr(result.document, 'tables') else 0

        # Save markdown
        output_md.write_text(markdown, encoding='utf-8')

        # Save JSON
        output_json.write_text(json.dumps(doc_dict, indent=2), encoding='utf-8')

        elapsed = time.time() - start_time

        return {
            "status": "success",
            "pages": page_count,
            "tables": table_count,
            "chars": len(markdown),
            "time": elapsed,
            "output": str(output_md)
        }

    except Exception as e:
        elapsed = time.time() - start_time
        return {
            "status": "error",
            "error": str(e),
            "time": elapsed
        }


def main():
    parser = argparse.ArgumentParser(
        description="Batch extract text from PDFs using docling"
    )
    parser.add_argument(
        "--force", "-f",
        action="store_true",
        help="Re-process all PDFs, even if already processed"
    )
    parser.add_argument(
        "--dry-run", "-n",
        action="store_true",
        help="Show what would be processed without actually processing"
    )
    args = parser.parse_args()

    print("=" * 70)
    print("BATCH PDF EXTRACTION")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Find all PDFs
    all_pdfs = get_all_pdfs()
    print(f"\nFound {len(all_pdfs)} PDFs in {PDF_DIR}")

    # Determine which to process
    if args.force:
        to_process = all_pdfs
        print(f"Force mode: will process all {len(to_process)} PDFs")
    else:
        to_process = [p for p in all_pdfs if not is_processed(p)]
        already_done = len(all_pdfs) - len(to_process)
        print(f"Already processed: {already_done}")
        print(f"To process: {len(to_process)}")

    if not to_process:
        print("\n✅ All PDFs already processed. Use --force to re-process.")
        return

    # Dry run - just list files
    if args.dry_run:
        print("\n[DRY RUN] Would process:")
        for pdf in to_process:
            print(f"  - {pdf.relative_to(VAULT_ROOT)}")
        print(f"\nEstimated time: ~{len(to_process) * 25} seconds ({len(to_process)} × 25s)")
        return

    # Import docling (slow import, only do if actually processing)
    print("\nLoading docling...")
    try:
        from docling.document_converter import DocumentConverter
    except ImportError:
        print("ERROR: docling not installed. Run: pip install docling")
        sys.exit(1)

    # Initialise converter once (reuse for all PDFs)
    converter = DocumentConverter()
    print("Docling loaded.\n")

    # Process PDFs
    results = {
        "success": [],
        "error": []
    }
    total_time = 0
    total_pages = 0

    print("-" * 70)
    for i, pdf in enumerate(to_process, 1):
        rel_path = pdf.relative_to(VAULT_ROOT)
        print(f"[{i}/{len(to_process)}] Processing: {rel_path}")

        result = process_pdf(pdf, converter)
        total_time += result["time"]

        if result["status"] == "success":
            results["success"].append(pdf.name)
            total_pages += result["pages"]
            print(f"         ✓ {result['pages']} pages, {result['chars']:,} chars in {result['time']:.1f}s")
        else:
            results["error"].append({"file": pdf.name, "error": result["error"]})
            print(f"         ✗ ERROR: {result['error']}")

    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total PDFs processed: {len(to_process)}")
    print(f"  Successful: {len(results['success'])}")
    print(f"  Errors: {len(results['error'])}")
    print(f"Total pages: {total_pages}")
    print(f"Total time: {total_time:.1f}s ({total_time/60:.1f} minutes)")
    if to_process:
        print(f"Average: {total_time/len(to_process):.1f}s per PDF")

    if results["error"]:
        print("\n⚠️  ERRORS:")
        for err in results["error"]:
            print(f"  - {err['file']}: {err['error']}")

    print(f"\nOutput directory: {OUTPUT_DIR}")
    print(f"Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)


if __name__ == "__main__":
    main()
