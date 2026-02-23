#!/usr/bin/env python3
"""
Convert PowerPoint slides to PNG images and create an Obsidian Page note.

Usage:
    python3 pptx_to_page.py <path_to_pptx_file> [page_title]
"""

import sys
import os
import subprocess
import tempfile
from pathlib import Path
from pdf2image import convert_from_path
from datetime import date

def pptx_to_page(pptx_path, page_title=None):
    """Convert PPTX to images and create a Page note."""

    pptx_path = Path(pptx_path)
    if not pptx_path.exists():
        print(f"Error: File not found: {pptx_path}")
        return False

    # Determine output paths
    vault_root = Path(__file__).parent.parent
    attachments_dir = vault_root / "Attachments"
    attachments_dir.mkdir(exist_ok=True)

    # Generate page title
    if not page_title:
        page_title = pptx_path.stem.replace("_", " ").replace("-", " ")

    # Safe filename for the page
    safe_filename = page_title.replace("/", "-").replace(":", "-")
    page_filename = f"Page - {safe_filename}.md"
    page_path = vault_root / page_filename

    print(f"Converting {pptx_path.name} to PDF...")

    # Create temporary directory for PDF
    with tempfile.TemporaryDirectory() as tmpdir:
        pdf_path = Path(tmpdir) / f"{pptx_path.stem}.pdf"

        # Convert PPTX to PDF using LibreOffice
        try:
            result = subprocess.run([
                'soffice',
                '--headless',
                '--convert-to', 'pdf',
                '--outdir', tmpdir,
                str(pptx_path)
            ], capture_output=True, text=True, timeout=120)

            if result.returncode != 0:
                print(f"Error converting to PDF: {result.stderr}")
                return False

        except subprocess.TimeoutExpired:
            print("Error: Conversion timeout")
            return False
        except FileNotFoundError:
            print("Error: soffice command not found. Is LibreOffice installed?")
            return False

        if not pdf_path.exists():
            print(f"Error: PDF was not created at {pdf_path}")
            return False

        print(f"Converting PDF pages to PNG images...")

        # Convert PDF pages to images
        try:
            images = convert_from_path(
                str(pdf_path),
                dpi=200,
                fmt='png'
            )
        except Exception as e:
            print(f"Error converting PDF to images: {e}")
            return False

        print(f"Extracted {len(images)} slides")

        # Save images
        image_paths = []
        base_name = safe_filename

        for i, image in enumerate(images, start=1):
            img_filename = f"{base_name} - Slide {i:02d}.png"
            img_path = attachments_dir / img_filename
            image.save(str(img_path), 'PNG')
            image_paths.append(img_filename)
            print(f"  Saved: {img_filename}")

    # Create Page note
    print(f"Creating Page note: {page_filename}")

    today = date.today().isoformat()

    content = f"""---
type: Page
title: {page_title}
created: {today}
modified: {today}
tags:
  - presentation
  - slides
---

# {page_title}

Source: [[{pptx_path.name}]]

Total Slides: {len(images)}

---

"""

    # Add all slide images
    for i, img_name in enumerate(image_paths, start=1):
        content += f"## Slide {i}\n\n"
        content += f"![[{img_name}]]\n\n"
        content += "---\n\n"

    # Write the page note
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\n✅ Success!")
    print(f"   Page note: {page_filename}")
    print(f"   Images saved: {len(image_paths)}")
    print(f"\nYou can now link this page in your meeting notes with: [[{page_filename[:-3]}]]")

    return str(page_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 pptx_to_page.py <path_to_pptx_file> [page_title]")
        sys.exit(1)

    pptx_file = sys.argv[1]
    title = sys.argv[2] if len(sys.argv) > 2 else None

    result = pptx_to_page(pptx_file, title)
    sys.exit(0 if result else 1)
