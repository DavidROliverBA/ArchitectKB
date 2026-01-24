#!/usr/bin/env python3
"""
System Roadmap Generator

Generates system lifecycle roadmap visualisations from Obsidian vault System notes.
Uses the Roadmapper library to create PNG/SVG outputs.

Usage:
    python3 scripts/system_roadmap.py [--output <path>] [--format png|svg] [--theme <theme>]
    python3 scripts/system_roadmap.py --help

Examples:
    python3 scripts/system_roadmap.py
    python3 scripts/system_roadmap.py --output +Attachments/my-roadmap.png
    python3 scripts/system_roadmap.py --format svg --theme BLUEMOUNTAIN
"""

import argparse
import sys
from pathlib import Path
from datetime import datetime, date
from typing import Optional

import frontmatter
from roadmapper.roadmap import Roadmap
from roadmapper.timelinemode import TimelineMode


# Configuration
VAULT_PATH = Path(__file__).parent.parent
DEFAULT_OUTPUT = VAULT_PATH / "+Attachments" / "system-lifecycle-roadmap.png"
THEMES = ["DEFAULT", "GREYWOOF", "ORANGEPEEL", "GREENTURTLE", "BLUEMOUNTAIN"]

# TIME category colours (for grouping)
TIME_CATEGORIES = {
    "invest": "Strategic Investment",
    "tolerate": "Maintain (Tolerate)",
    "migrate": "Transition (Migrate)",
    "eliminate": "Retire (Eliminate)",
}


def parse_date(date_val) -> Optional[date]:
    """Parse various date formats from frontmatter."""
    if date_val is None:
        return None
    if isinstance(date_val, date):
        return date_val
    if isinstance(date_val, datetime):
        return date_val.date()
    if isinstance(date_val, str):
        try:
            return datetime.strptime(date_val, "%Y-%m-%d").date()
        except ValueError:
            try:
                return datetime.strptime(date_val, "%Y-%m").date()
            except ValueError:
                return None
    return None


def load_system_notes(vault_path: Path) -> list[dict]:
    """Load all System notes from the vault."""
    systems = []

    # Search for System notes in root
    for md_file in vault_path.glob("System - *.md"):
        try:
            post = frontmatter.load(md_file)
            if post.get("type") == "System":
                system = {
                    "file": md_file,
                    "title": post.get("title", md_file.stem.replace("System - ", "")),
                    "status": post.get("status"),
                    "criticality": post.get("criticality"),
                    "timeCategory": post.get("timeCategory"),
                    "launchDate": parse_date(post.get("launchDate")),
                    "sunsetDate": parse_date(post.get("sunsetDate")),
                    "replacedBy": post.get("replacedBy"),
                    "predecessors": post.get("predecessors", []),
                    "hosting": post.get("hosting"),
                }
                systems.append(system)
        except Exception as e:
            print(f"Warning: Could not parse {md_file}: {e}", file=sys.stderr)

    return systems


def infer_time_category(system: dict) -> str:
    """Infer TIME category from system data if not explicitly set."""
    if system.get("timeCategory"):
        return system["timeCategory"]

    status = system.get("status", "")

    if status == "planned":
        return "invest"
    elif status == "deprecated":
        return "eliminate"
    elif status == "retired":
        return "eliminate"
    elif system.get("sunsetDate"):
        return "migrate"
    else:
        return "tolerate"


def generate_roadmap(
    systems: list[dict],
    output_path: Path,
    format_type: str = "png",
    theme: str = "BLUEMOUNTAIN",
    start_year: int = None,
    years: int = 10,
) -> None:
    """Generate the roadmap visualisation."""

    if not systems:
        print("No systems found to visualise.", file=sys.stderr)
        return

    # Determine timeline range
    today = date.today()
    if start_year is None:
        # Find earliest launch date or default to 5 years ago
        launch_dates = [s["launchDate"] for s in systems if s["launchDate"]]
        if launch_dates:
            start_year = min(d.year for d in launch_dates)
            start_year = max(start_year, today.year - 10)  # Cap at 10 years ago
        else:
            start_year = today.year - 5

    start_date = f"{start_year}-01-01"

    # Create roadmap
    painter_type = "svg" if format_type == "svg" else "png"
    roadmap = Roadmap(
        width=1600,
        height=800,
        auto_height=True,
        colour_theme=theme,
        show_marker=True,
        painter_type=painter_type,
    )

    roadmap.set_title("Systems Lifecycle Roadmap")
    roadmap.set_subtitle(f"Generated {today.strftime('%Y-%m-%d')} from Obsidian Vault")
    roadmap.set_timeline(
        mode=TimelineMode.YEARLY,
        start=start_date,
        number_of_items=years,
    )

    # Group systems by TIME category
    categorised = {cat: [] for cat in TIME_CATEGORIES}
    for system in systems:
        category = infer_time_category(system)
        if category in categorised:
            categorised[category].append(system)
        else:
            categorised["tolerate"].append(system)

    # Add groups and tasks
    for category, label in TIME_CATEGORIES.items():
        systems_in_cat = categorised.get(category, [])
        if not systems_in_cat:
            continue

        group = roadmap.add_group(label)

        for system in sorted(systems_in_cat, key=lambda s: s.get("criticality") or "z"):
            title = system["title"]

            # Determine task dates
            launch = system.get("launchDate")
            sunset = system.get("sunsetDate")

            # Default dates if not specified
            if not launch:
                launch = date(start_year, 1, 1)
            if not sunset:
                sunset = date(start_year + years, 12, 31)

            # Ensure dates are within range
            launch_str = launch.strftime("%Y-%m-%d")
            sunset_str = sunset.strftime("%Y-%m-%d")

            try:
                task = group.add_task(title, launch_str, sunset_str)

                # Add milestone for sunset date if it's a real retirement
                if system.get("sunsetDate") and category in ["migrate", "eliminate"]:
                    task.add_milestone("EOL", sunset_str)

                # Add milestone for systems being replaced
                if system.get("replacedBy"):
                    replaced_by = system["replacedBy"]
                    if isinstance(replaced_by, str):
                        # Clean up wiki-link format
                        replaced_by = replaced_by.replace("[[", "").replace("]]", "")
                        replaced_by = replaced_by.replace("System - ", "")
            except Exception as e:
                print(f"Warning: Could not add task for {title}: {e}", file=sys.stderr)

    # Draw and save
    roadmap.draw()

    # Ensure output directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)

    roadmap.save(str(output_path))
    print(f"Roadmap saved to: {output_path}")


def main():
    parser = argparse.ArgumentParser(
        description="Generate system lifecycle roadmap from Obsidian vault System notes.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    python3 scripts/system_roadmap.py
    python3 scripts/system_roadmap.py --output +Attachments/roadmap.png
    python3 scripts/system_roadmap.py --format svg --theme GREENTURTLE
    python3 scripts/system_roadmap.py --start-year 2020 --years 15
        """,
    )

    parser.add_argument(
        "--output", "-o",
        type=Path,
        default=DEFAULT_OUTPUT,
        help=f"Output file path (default: {DEFAULT_OUTPUT})",
    )

    parser.add_argument(
        "--format", "-f",
        choices=["png", "svg"],
        default="png",
        help="Output format (default: png)",
    )

    parser.add_argument(
        "--theme", "-t",
        choices=THEMES,
        default="BLUEMOUNTAIN",
        help="Colour theme (default: BLUEMOUNTAIN)",
    )

    parser.add_argument(
        "--start-year",
        type=int,
        default=None,
        help="Start year for timeline (default: auto-detect from data)",
    )

    parser.add_argument(
        "--years",
        type=int,
        default=12,
        help="Number of years to show (default: 12)",
    )

    parser.add_argument(
        "--vault",
        type=Path,
        default=VAULT_PATH,
        help=f"Vault path (default: {VAULT_PATH})",
    )

    parser.add_argument(
        "--list",
        action="store_true",
        help="List found systems without generating roadmap",
    )

    args = parser.parse_args()

    # Load systems
    print(f"Loading System notes from {args.vault}...")
    systems = load_system_notes(args.vault)
    print(f"Found {len(systems)} System notes")

    if args.list:
        print("\nSystems found:")
        for s in sorted(systems, key=lambda x: x["title"]):
            category = infer_time_category(s)
            launch = s.get("launchDate", "?")
            sunset = s.get("sunsetDate", "ongoing")
            print(f"  - {s['title']}: {category} ({launch} → {sunset})")
        return

    if not systems:
        print("No System notes found. Ensure notes have 'type: System' in frontmatter.")
        sys.exit(1)

    # Handle relative output paths
    output = args.output
    if not output.is_absolute():
        output = args.vault / output

    # Adjust extension based on format
    if args.format == "svg" and output.suffix != ".svg":
        output = output.with_suffix(".svg")
    elif args.format == "png" and output.suffix != ".png":
        output = output.with_suffix(".png")

    # Generate roadmap
    generate_roadmap(
        systems=systems,
        output_path=output,
        format_type=args.format,
        theme=args.theme,
        start_year=args.start_year,
        years=args.years,
    )

    print(f"\nEmbed in Obsidian with: ![[{output.name}]]")


if __name__ == "__main__":
    main()
