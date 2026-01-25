# /infographic

Generate or regenerate the ArchitectKB capabilities infographic.

## Usage

```
/infographic           # Regenerate the infographic
/infographic --open    # Regenerate and open in Preview
```

## What It Does

Generates a visual capabilities reference showing all ArchitectKB features:

- 61 AI-powered skills
- 26 note types
- 10+ automation hooks
- 9 tag hierarchies
- 7 MCP integrations
- 20+ templates
- CLI tools

## Output

- **File**: `ArchitectKB-Abilities.jpg`
- **Location**: `screenshots/` folder
- **Size**: ~1 MB at 200 DPI

## Implementation

The skill runs `scripts/generate_infographic.py` which uses matplotlib to create a dense 3x4 grid layout with:

- Dark theme (#0f172a background)
- Colour-coded category cards
- Stats bar with key metrics
- Coloured bullet points for each item

## Updating Content

To update the infographic content, edit `scripts/generate_infographic.py`:

1. **FEATURES dict** (line ~43): Contains all categories and items
2. **COLORS dict** (line ~20): Colour palette
3. **Stats bar** (line ~310): Summary statistics

After editing, run `/infographic` to regenerate.

## Dependencies

- Python 3
- matplotlib (`pip3 install matplotlib`)
- Pillow (`pip3 install pillow`)

## When to Regenerate

Run this skill after:

- Adding new skills to the vault
- Updating note types or templates
- Changing major features
- Before releases to keep README screenshot current
