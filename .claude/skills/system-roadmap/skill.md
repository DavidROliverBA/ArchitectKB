# Skill: /system-roadmap

Generate a visual system lifecycle roadmap from System notes in the vault.

## Trigger

- `/system-roadmap` - Generate default roadmap
- `/system-roadmap --list` - List systems without generating
- `/system-roadmap --svg` - Generate SVG format
- `/system-roadmap --theme GREENTURTLE` - Use different colour theme

## Description

This skill generates a PNG or SVG roadmap visualisation showing system lifecycles grouped by Gartner TIME category (Invest, Tolerate, Migrate, Eliminate). It reads System notes from the vault and uses their lifecycle frontmatter fields.

## Prerequisites

The following Python packages must be installed:

```bash
pip3 install roadmapper python-frontmatter
```

## Execution Steps

1. **Run the script** with appropriate options:

```bash
# Default - generates PNG to +Attachments/
python3 scripts/system_roadmap.py

# List systems found (dry run)
python3 scripts/system_roadmap.py --list

# Generate SVG format
python3 scripts/system_roadmap.py --format svg

# Custom output location
python3 scripts/system_roadmap.py --output +Attachments/custom-roadmap.png

# Different theme (DEFAULT, GREYWOOF, ORANGEPEEL, GREENTURTLE, BLUEMOUNTAIN)
python3 scripts/system_roadmap.py --theme GREENTURTLE

# Custom timeline
python3 scripts/system_roadmap.py --start-year 2020 --years 15
```

2. **Report the output** location to the user

3. **Provide embed syntax** for Obsidian:
   ```markdown
   ![[system-lifecycle-roadmap.png]]
   ```

## System Frontmatter Fields

The script reads these fields from System notes:

| Field          | Purpose               | Example                           |
| -------------- | --------------------- | --------------------------------- |
| `type`         | Must be "System"      | `type: System`                    |
| `title`        | System display name   | `title: Core ERP`                 |
| `status`       | Current status        | `status: active`                  |
| `timeCategory` | TIME classification   | `timeCategory: migrate`           |
| `launchDate`   | When system went live | `launchDate: 2005-01-01`          |
| `sunsetDate`   | Planned retirement    | `sunsetDate: 2030-06-01`          |
| `replacedBy`   | Successor system      | `replacedBy: "[[System - New ERP]]"` |
| `criticality`  | Business criticality  | `criticality: critical`           |

## TIME Category Inference

If `timeCategory` is not set, the script infers it:

- `status: planned` → **invest**
- `status: deprecated` or `retired` → **eliminate**
- Has `sunsetDate` → **migrate**
- Default → **tolerate**

## Output

- Default location: `+Attachments/system-lifecycle-roadmap.png`
- Grouped by TIME category (Invest, Tolerate, Migrate, Eliminate)
- Shows launch dates and sunset milestones
- Current date marker indicated

## Example Output

The roadmap shows:

- **Strategic Investment** - Systems we are actively growing (New CRM, Data Platform)
- **Maintain (Tolerate)** - Stable systems (Core ERP, Identity Platform)
- **Transition (Migrate)** - Systems being replaced (Legacy HR System)
- **Retire (Eliminate)** - Systems being decommissioned (Old Reporting Tool)

## Troubleshooting

**No systems found:**

- Ensure System notes have `type: System` in frontmatter
- Check notes are in vault root (not archived)

**Roadmapper not installed:**

```bash
pip3 install roadmapper python-frontmatter
```

**Image not rendering in Obsidian:**

- Ensure file is in `+Attachments/` folder
- Use correct embed syntax: `![[filename.png]]`

## Related

- [[MOC - Systems]]
