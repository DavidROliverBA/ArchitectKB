#!/usr/bin/env python3
"""
Archive orphaned attachments that are not referenced in any vault note.

Usage:
    python archive-orphan-attachments.py [--dry-run] [--verbose]

Options:
    --dry-run   Show what would be archived without moving files
    --verbose   Show detailed output including all orphaned files
"""
import os
import re
import sys
import json
import shutil
from pathlib import Path
from datetime import datetime
from collections import defaultdict

# Configuration
VAULT_PATH = Path(__file__).parent.parent.parent
ATTACHMENTS_PATH = VAULT_PATH / "Attachments"
ARCHIVE_PATH = VAULT_PATH / "Archive" / "Attachments"
MANIFEST_PATH = ARCHIVE_PATH / "archive-manifest.json"

# Files to never archive
PROTECTED_FILES = {".gitkeep", ".DS_Store", "README.md"}

# Patterns to find file references in markdown
LINK_PATTERNS = [
    r'\[\[([^\]|]+)',              # [[filename]] or [[filename|alias]]
    r'!\[\[([^\]]+)\]\]',          # ![[image]]
    r'\]\(([^)]+)\)',              # [text](path)
    r'src=["\']([^"\']+)["\']',    # src="path"
    r'file=["\']([^"\']+)["\']',   # file="path"
]


def get_all_attachments() -> dict[str, Path]:
    """Get all attachment files mapped by filename."""
    attachments = {}
    for f in ATTACHMENTS_PATH.rglob("*"):
        if f.is_file() and f.name not in PROTECTED_FILES:
            attachments[f.name] = f
    return attachments


def find_referenced_files(verbose: bool = False) -> set[str]:
    """Find all attachment filenames referenced in vault notes."""
    referenced = set()

    # Scan markdown files
    md_files = list(VAULT_PATH.rglob("*.md"))
    if verbose:
        print(f"Scanning {len(md_files)} markdown files...")

    for md_file in md_files:
        # Skip archive and git directories
        if ".git" in str(md_file) or "/Archive/" in str(md_file):
            continue
        try:
            content = md_file.read_text(encoding='utf-8', errors='ignore')
            for pattern in LINK_PATTERNS:
                for match in re.finditer(pattern, content):
                    ref = match.group(1)
                    # Extract filename from path (handle both / and \ separators)
                    filename = Path(ref.replace("\\", "/")).name
                    # URL decode common patterns
                    filename = filename.replace("%20", " ")
                    referenced.add(filename)
        except Exception:
            pass

    # Scan canvas files
    canvas_files = list(VAULT_PATH.rglob("*.canvas"))
    if verbose:
        print(f"Scanning {len(canvas_files)} canvas files...")

    for canvas_file in canvas_files:
        if ".git" in str(canvas_file) or "/Archive/" in str(canvas_file):
            continue
        try:
            content = canvas_file.read_text(encoding='utf-8', errors='ignore')
            # Canvas files use JSON, check for file references
            for attachment in get_all_attachments().keys():
                if attachment in content:
                    referenced.add(attachment)
        except Exception:
            pass

    return referenced


def find_orphans(verbose: bool = False) -> list[tuple[str, Path, int]]:
    """Find orphaned attachments. Returns list of (filename, path, size)."""
    attachments = get_all_attachments()
    referenced = find_referenced_files(verbose)

    orphans = []
    for filename, path in attachments.items():
        if filename not in referenced:
            try:
                size = path.stat().st_size
                orphans.append((filename, path, size))
            except Exception:
                pass

    return sorted(orphans, key=lambda x: x[0])


def load_manifest() -> dict:
    """Load existing manifest or create new one."""
    if MANIFEST_PATH.exists():
        try:
            return json.loads(MANIFEST_PATH.read_text())
        except Exception:
            pass
    return {
        "created": datetime.now().isoformat(),
        "archives": []
    }


def save_manifest(manifest: dict):
    """Save manifest to file."""
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))


def archive_orphans(dry_run: bool = False, verbose: bool = False) -> dict:
    """Archive orphaned attachments and return summary."""
    orphans = find_orphans(verbose)

    if not orphans:
        return {"moved": 0, "size_bytes": 0, "files": []}

    # Group by extension for summary
    by_ext = defaultdict(list)
    total_size = 0

    for filename, path, size in orphans:
        ext = path.suffix.lower() or "(no ext)"
        by_ext[ext].append(filename)
        total_size += size

    print(f"\n{'[DRY RUN] ' if dry_run else ''}Orphaned attachments found:")
    print(f"  Total files: {len(orphans)}")
    print(f"  Total size: {total_size / 1024 / 1024:.1f} MB")
    print(f"\n  By type:")
    for ext, files in sorted(by_ext.items(), key=lambda x: -len(x[1])):
        print(f"    {ext}: {len(files)}")

    if verbose:
        print(f"\n  Files:")
        for filename, path, size in orphans[:50]:
            print(f"    - {filename} ({size / 1024:.1f} KB)")
        if len(orphans) > 50:
            print(f"    ... and {len(orphans) - 50} more")

    if dry_run:
        print(f"\n[DRY RUN] Would move {len(orphans)} files to {ARCHIVE_PATH}")
        return {"moved": 0, "would_move": len(orphans), "size_bytes": total_size}

    # Create archive directory
    ARCHIVE_PATH.mkdir(parents=True, exist_ok=True)

    # Load manifest
    manifest = load_manifest()

    # Archive entry
    archive_entry = {
        "date": datetime.now().isoformat(),
        "files_moved": len(orphans),
        "total_bytes": total_size,
        "files": []
    }

    # Move files
    moved = 0
    for filename, src_path, size in orphans:
        # Preserve relative path structure if in subdirectory
        relative = src_path.relative_to(ATTACHMENTS_PATH)
        dest_path = ARCHIVE_PATH / relative

        try:
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(src_path), str(dest_path))
            moved += 1
            archive_entry["files"].append({
                "filename": filename,
                "original_path": str(relative),
                "size_bytes": size
            })
        except Exception as e:
            print(f"  Error moving {filename}: {e}")

    # Update manifest
    manifest["archives"].append(archive_entry)
    manifest["last_updated"] = datetime.now().isoformat()
    save_manifest(manifest)

    print(f"\n✓ Moved {moved} files to {ARCHIVE_PATH}")
    print(f"✓ Manifest updated: {MANIFEST_PATH}")

    return {"moved": moved, "size_bytes": total_size, "files": archive_entry["files"]}


def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    verbose = "--verbose" in args or "-v" in args

    print("=" * 60)
    print("Orphaned Attachment Archiver")
    print("=" * 60)
    print(f"\nVault: {VAULT_PATH}")
    print(f"Attachments: {ATTACHMENTS_PATH}")
    print(f"Archive to: {ARCHIVE_PATH}")

    result = archive_orphans(dry_run=dry_run, verbose=verbose)

    if dry_run and result.get("would_move", 0) > 0:
        print(f"\nRun without --dry-run to archive these files.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
