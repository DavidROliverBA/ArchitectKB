# Skill: Archive Orphaned Attachments

**Command:** `/archive-attachments [--dry-run]`
**Model:** 🟢 Haiku
**Agent:** None (direct execution)

## Purpose

Find and archive attachments that are not referenced in any vault note. Orphaned attachments waste storage and clutter the vault without adding value.

## When to Use

- During quarterly vault maintenance
- After bulk PDF/PPTX conversions that leave unreferenced files
- When Attachments folder grows unexpectedly
- Before committing large changes to reduce repo size

## Usage

```bash
# Preview what would be archived (recommended first step)
/archive-attachments --dry-run

# Archive orphaned files
/archive-attachments
```

## What It Does

1. **Scans all markdown and canvas files** for attachment references
2. **Identifies orphaned files** in `Attachments/` not referenced anywhere
3. **Moves orphans** to `Archive/Attachments/` preserving folder structure
4. **Updates manifest** at `Archive/Attachments/archive-manifest.json`

## Protected Files

These files are never archived:
- `.gitkeep`
- `.DS_Store`
- `README.md`

## Output

The script reports:
- Total orphaned files and size
- Breakdown by file type
- Files moved (or would move in dry-run)

## Implementation

Run the Python script:

```bash
python3 .claude/scripts/archive-orphan-attachments.py [--dry-run] [--verbose]
```

### Flags

| Flag | Description |
|------|-------------|
| `--dry-run` | Show what would be archived without moving files |
| `--verbose` | Show detailed file list |

## Manifest Format

The manifest tracks all archive operations:

```json
{
  "created": "2026-02-01T08:26:26",
  "last_updated": "2026-02-01T08:26:26",
  "archives": [
    {
      "date": "2026-02-01T08:26:26",
      "files_moved": 1176,
      "total_bytes": 826369700,
      "files": [
        {
          "filename": "example.png",
          "original_path": "subfolder/example.png",
          "size_bytes": 12345
        }
      ]
    }
  ]
}
```

## Restoring Files

If a file was archived by mistake:

1. Check the manifest for the original path
2. Move the file back from `Archive/Attachments/` to `Attachments/`
3. The next run will skip it if it's now referenced

## Related

- `/vault-maintenance` - Full quarterly health check
- `/quality-report` - Comprehensive vault metrics
- `npm run health` - Quick health check
