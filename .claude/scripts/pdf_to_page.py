#!/usr/bin/env python3
"""
Convert PDF to PNG images and create an Obsidian Page note.

Usage:
    python3 pdf_to_page.py <path_to_pdf> [page_title]
"""

import sys
import os
from pathlib import Path
from pdf2image import convert_from_path
from datetime import date

def pdf_to_page(pdf_path, page_title=None):
    """Convert PDF to images and create a Page note."""

    pdf_path = Path(pdf_path)
    if not pdf_path.exists():
        print(f"Error: File not found: {pdf_path}")
        return False

    # Determine output paths
    vault_root = Path(__file__).parent.parent
    attachments_dir = vault_root / "Attachments"
    attachments_dir.mkdir(exist_ok=True)

    # Generate page title
    if not page_title:
        page_title = pdf_path.stem.replace("_", " ").replace("-", " ")

    # Safe filename for the page
    safe_filename = page_title.replace("/", "-").replace(":", "-")
    page_filename = f"Page - {safe_filename}.md"
    page_path = vault_root / page_filename

    print(f"Converting {pdf_path.name} to PNG images...")

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

    print(f"Extracted {len(images)} pages")

    # Save images
    image_paths = []
    base_name = safe_filename

    for i, image in enumerate(images, start=1):
        img_filename = f"{base_name} - Page {i:02d}.png"
        img_path = attachments_dir / img_filename
        image.save(str(img_path), 'PNG')
        image_paths.append(img_filename)
        print(f"  Saved: {img_filename}")

    # Copy original PDF to attachments if not already there
    if pdf_path.parent != attachments_dir:
        pdf_dest = attachments_dir / pdf_path.name
        if not pdf_dest.exists():
            import shutil
            shutil.copy2(pdf_path, pdf_dest)
            print(f"  Copied PDF to: Attachments/{pdf_path.name}")

    # Create Page note
    print(f"Creating Page note: {page_filename}")

    today = date.today().isoformat()

    content = f"""---
type: Page
title: {page_title}
created: {today}
modified: {today}
tags:
  - document
  - pdf
source: "{pdf_path.name}"
sourceType: PDF
---

# {page_title}

> **Source**: [[{pdf_path.name}]]
> **Imported**: {today}
> **Pages**: {len(images)}

## Overview

[Add overview of the document here]

## Content

"""

    # Add all page images
    for i, img_name in enumerate(image_paths, start=1):
        content += f"### Page {i}\n\n"
        content += f"![[{img_name}]]\n\n"
        content += "---\n\n"

    content += """
## Related

- [[{pdf_path.name}|Original PDF]]

## Notes

Document imported from PDF on {today}.
"""

    # Write the page note
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\n✅ Success!")
    print(f"   Page note: {page_filename}")
    print(f"   Pages extracted: {len(image_paths)}")
    print(f"\nYou can now link this page in your notes with: [[{page_filename[:-3]}]]")

    return str(page_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 pdf_to_page.py <path_to_pdf> [page_title]")
        sys.exit(1)

    pdf_file = sys.argv[1]
    title = sys.argv[2] if len(sys.argv) > 2 else None

    result = pdf_to_page(pdf_file, title)
    sys.exit(0 if result else 1)
