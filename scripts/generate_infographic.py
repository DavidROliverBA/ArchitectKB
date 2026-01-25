#!/usr/bin/env python3
"""
Generate ArchitectKB Abilities Infographic
Dense, information-rich layout with visual markers
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Circle
import numpy as np
from PIL import Image
import io

# Configure for high resolution
plt.rcParams['figure.dpi'] = 150
plt.rcParams['savefig.dpi'] = 200
plt.rcParams['font.family'] = ['DejaVu Sans', 'Arial', 'Helvetica', 'sans-serif']

# Colour palette - professional and readable
COLORS = {
    'bg': '#0f172a',           # Deep navy background
    'card_bg': '#1e293b',      # Slate card
    'header_skills': '#ef4444',      # Red
    'header_notes': '#3b82f6',       # Blue
    'header_auto': '#8b5cf6',        # Purple
    'header_tags': '#14b8a6',        # Teal
    'header_mcp': '#f59e0b',         # Amber
    'header_templates': '#06b6d4',   # Cyan
    'header_cli': '#22c55e',         # Green
    'header_research': '#a855f7',    # Violet
    'header_maintenance': '#f43f5e', # Rose
    'header_capture': '#10b981',     # Emerald
    'header_docs': '#eab308',        # Yellow
    'header_sync': '#f97316',        # Orange
    'text_white': '#f8fafc',
    'text_light': '#94a3b8',
    'text_dim': '#64748b',
    'accent': '#38bdf8',
}

# Use simple ASCII/Unicode symbols that render in all fonts
# All ArchitectKB features with descriptions
FEATURES = {
    'skills': {
        'icon': '*',
        'title': 'AI-Powered Skills',
        'subtitle': '61 Commands',
        'color': COLORS['header_skills'],
        'items': [
            ('>', '/daily, /meeting, /weekly-summary', 'Daily workflow automation'),
            ('>', '/adr, /project-status, /find-decisions', 'Architecture decision tracking'),
            ('>', '/related, /summarize, /timeline', 'Research & discovery tools'),
            ('>', '/vault-maintenance, /quality-report', 'Automated health checks'),
            ('>', '/task, /person, /weblink, /article', 'Quick capture commands'),
            ('>', '/pdf-to-page, /pptx-to-page', 'Document conversion'),
            ('>', '/sync-notion, /sync-governance', 'External system sync'),
        ]
    },
    'notes': {
        'icon': '*',
        'title': 'Note Types',
        'subtitle': '26 Types',
        'color': COLORS['header_notes'],
        'items': [
            ('>', 'Project, Task, Meeting', 'Core work tracking'),
            ('>', 'Person, Organisation', 'People & relationships'),
            ('>', 'Page, ADR, Article', 'Documentation types'),
            ('>', 'System, DataAsset', 'Technical inventory'),
            ('>', 'Weblink, CodeSnippet', 'External references'),
            ('>', 'Incubator, IncubatorNote', 'Idea development'),
            ('>', 'OKR, FormSubmission, Trip', 'Specialised tracking'),
        ]
    },
    'automation': {
        'icon': '*',
        'title': 'Automation Hooks',
        'subtitle': '10+ Hooks',
        'color': COLORS['header_auto'],
        'items': [
            ('>', 'Pre-edit hook', 'Auto-update modified dates'),
            ('>', 'Post-create hook', 'Validate new files'),
            ('>', 'Frontmatter validator', 'Schema enforcement'),
            ('>', 'Tag taxonomy enforcer', 'Consistent tagging'),
            ('>', 'Wiki-link checker', 'Link integrity'),
            ('>', 'Secret detection', 'Credential scanning'),
            ('>', 'Filename convention', 'Naming standards'),
        ]
    },
    'tags': {
        'icon': '*',
        'title': 'Tag Hierarchies',
        'subtitle': '9 Categories',
        'color': COLORS['header_tags'],
        'items': [
            ('>', 'activity/', 'architecture, research, implementation'),
            ('>', 'domain/', 'engineering, data, cloud, security'),
            ('>', 'project/', 'Your project identifiers'),
            ('>', 'technology/', 'aws, sap, kafka, python'),
            ('>', 'type/', 'adr, system, diagram, hld'),
            ('>', 'criticality/', 'critical, high, medium, low'),
            ('>', 'audience/', 'executive, architect, developer'),
        ]
    },
    'integrations': {
        'icon': '*',
        'title': 'MCP Integrations',
        'subtitle': '7 Servers',
        'color': COLORS['header_mcp'],
        'items': [
            ('>', 'Confluence', 'Sync policies, guardrails, ADRs'),
            ('>', 'Jira', 'Issue tracking & search'),
            ('>', 'Notion', 'Bidirectional page sync'),
            ('>', 'Outlook', 'Calendar & email access'),
            ('>', 'YouTube', 'Transcript extraction'),
            ('>', 'Diagrams', 'Architecture diagram generation'),
            ('>', 'Web Tools', 'URL fetching & search'),
        ]
    },
    'templates': {
        'icon': '*',
        'title': 'Templates',
        'subtitle': '20+ Templates',
        'color': COLORS['header_templates'],
        'items': [
            ('>', 'Project', 'Full project documentation'),
            ('>', 'ADR', 'Architecture decisions'),
            ('>', 'Meeting', 'Meeting notes & actions'),
            ('>', 'System', 'System documentation'),
            ('>', 'Page', 'Long-form content'),
            ('>', 'Task', 'Task tracking'),
            ('>', 'Incubator', 'Idea exploration'),
        ]
    },
    'cli': {
        'icon': '*',
        'title': 'CLI Tools',
        'subtitle': 'Node.js & Python',
        'color': COLORS['header_cli'],
        'items': [
            ('>', 'graph-query.js', 'BM25 search, backlinks, orphans'),
            ('>', 'graph-build.js', 'Index vault content'),
            ('>', 'roadmapper.js', 'System lifecycle visualisation'),
            ('>', 'notion_sync.py', 'Notion integration'),
            ('>', 'pdf_to_page.py', 'PDF conversion'),
            ('>', 'pptx_to_page.py', 'PowerPoint extraction'),
            ('>', 'analyze_metadata.py', 'Vault analytics'),
        ]
    },
    'research': {
        'icon': '*',
        'title': 'Research Tools',
        'subtitle': 'Discovery & Analysis',
        'color': COLORS['header_research'],
        'items': [
            ('>', '/book-search', 'Search indexed PDF content'),
            ('>', '/related', 'Find connected notes'),
            ('>', '/summarize', 'AI-powered summaries'),
            ('>', '/timeline', 'Chronological project history'),
            ('>', '/incubator', 'Idea lifecycle management'),
            ('>', '/exec-summary', 'Executive summaries'),
            ('>', '/find-decisions', 'Decision archaeology'),
        ]
    },
    'maintenance': {
        'icon': '*',
        'title': 'Maintenance',
        'subtitle': 'Vault Health',
        'color': COLORS['header_maintenance'],
        'items': [
            ('>', '/vault-maintenance', 'Quarterly health check'),
            ('>', '/quality-report', 'Comprehensive metrics'),
            ('>', '/check-weblinks', 'Dead link detection'),
            ('>', '/orphans', 'Unlinked note finder'),
            ('>', '/broken-links', 'Wiki-link validation'),
            ('>', '/archive', 'Soft archive notes'),
            ('>', '/wipe', 'Context handoff'),
        ]
    },
    'capture': {
        'icon': '*',
        'title': 'Quick Capture',
        'subtitle': 'Fast Note Creation',
        'color': COLORS['header_capture'],
        'items': [
            ('>', '/task', 'Quick task with project/due date'),
            ('>', '/person', 'Person from template'),
            ('>', '/weblink', 'URL with analysis'),
            ('>', '/youtube', 'Video + transcript analysis'),
            ('>', '/article', 'Blog post, video, podcast'),
            ('>', '/form', 'DPIA, CyberRisk, TPRM tracking'),
            ('>', '/incubator', 'New idea capture'),
        ]
    },
    'documents': {
        'icon': '*',
        'title': 'Document Processing',
        'subtitle': 'AI-Powered Extraction',
        'color': COLORS['header_docs'],
        'items': [
            ('>', '/pdf-to-page', 'PDF to Page with images'),
            ('>', '/pptx-to-page', 'PowerPoint slide extraction'),
            ('>', '/screenshot-analyze', 'Comprehensive OCR'),
            ('>', '/diagram-review', 'Architecture analysis'),
            ('>', '/document-extract', 'Scanned doc extraction'),
            ('>', '/attachment-audit', 'Visual attachment review'),
            ('>', 'AI Vision', 'Multi-modal analysis'),
        ]
    },
    'sync': {
        'icon': '*',
        'title': 'Sync & Subscriptions',
        'subtitle': 'External Sources',
        'color': COLORS['header_sync'],
        'items': [
            ('>', '/sync-notion', 'Notion meeting sync'),
            ('>', '/sync-notion-pages', 'Bidirectional pages'),
            ('>', '/sync-governance', 'Confluence policies'),
            ('>', '/rss-check', 'YouTube subscriptions'),
            ('>', '/rss-check --add', 'Subscribe to channels'),
            ('>', '/rss-check --list', 'View subscriptions'),
            ('>', 'Auto-notify', 'New content alerts'),
        ]
    },
}

def draw_card(ax, x, y, width, height, feature_key, feature_data):
    """Draw a single feature card with title and items."""

    # Inset the border by 0.005 on each side to prevent overlap
    inset = 0.005
    x_inset = x + inset
    y_inset = y + inset
    width_inset = width - 2 * inset
    height_inset = height - 2 * inset

    # Card background with rounded corners
    card = FancyBboxPatch(
        (x_inset, y_inset), width_inset, height_inset,
        boxstyle="round,pad=0,rounding_size=0.015",
        facecolor=COLORS['card_bg'],
        edgecolor=feature_data['color'],
        linewidth=2.5,
        alpha=0.98
    )
    ax.add_patch(card)

    # Header bar
    header_height = height_inset * 0.16
    header = FancyBboxPatch(
        (x_inset, y_inset + height_inset - header_height), width_inset, header_height,
        boxstyle="round,pad=0,rounding_size=0.015",
        facecolor=feature_data['color'],
        edgecolor='none',
        alpha=1.0
    )
    ax.add_patch(header)

    # Title in header (left side)
    header_y = y_inset + height_inset - header_height/2
    ax.text(x_inset + 0.012, header_y + 0.005, feature_data['title'],
            fontsize=10, fontweight='bold', color=COLORS['text_white'],
            va='center', ha='left')
    # Subtitle/count badge (right side)
    ax.text(x_inset + width_inset - 0.012, header_y + 0.005, feature_data['subtitle'],
            fontsize=7, color='white',
            va='center', ha='right',
            bbox=dict(boxstyle='round,pad=0.15', facecolor='black', alpha=0.3, edgecolor='none'))

    # Items list - use full height
    items = feature_data['items']
    content_height = height_inset - header_height - 0.015
    item_height = content_height / len(items)
    item_start_y = y_inset + height_inset - header_height - 0.012

    for i, (marker, name, desc) in enumerate(items):
        item_y = item_start_y - i * item_height

        # Colored bullet
        bullet = Circle((x_inset + 0.015, item_y - 0.003), 0.004,
                        facecolor=feature_data['color'], edgecolor='none', alpha=0.8)
        ax.add_patch(bullet)

        # Name (bold, larger)
        ax.text(x_inset + 0.028, item_y + 0.004, name,
                fontsize=7, fontweight='bold', color=COLORS['text_white'],
                va='center', ha='left')

        # Description (lighter, below name)
        ax.text(x_inset + 0.028, item_y - 0.009, desc,
                fontsize=5.5, color=COLORS['text_light'],
                va='center', ha='left')

def create_infographic():
    """Create the full infographic."""

    # Figure setup - portrait orientation
    fig, ax = plt.subplots(figsize=(16, 20))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.set_aspect('equal')
    ax.axis('off')

    # Background
    fig.patch.set_facecolor(COLORS['bg'])
    ax.set_facecolor(COLORS['bg'])

    # Title section - more compact
    ax.text(0.5, 0.975, 'ArchitectKB', fontsize=36, fontweight='bold',
            color=COLORS['text_white'], ha='center', va='top')
    ax.text(0.5, 0.945, 'Complete Capabilities Reference',
            fontsize=14, color=COLORS['text_light'], ha='center', va='top')
    ax.text(0.5, 0.925, 'Production-ready Obsidian vault template for Solutions Architects',
            fontsize=10, color=COLORS['text_dim'], ha='center', va='top')

    # Stats bar - inline
    stats_y = 0.895
    stats = [
        ('61', 'Skills'),
        ('26', 'Note Types'),
        ('10+', 'Hooks'),
        ('9', 'Tag Hierarchies'),
        ('7', 'MCP Servers'),
        ('20+', 'Templates'),
    ]
    stat_width = 0.9 / len(stats)
    for i, (num, label) in enumerate(stats):
        sx = 0.05 + i * stat_width + stat_width/2
        ax.text(sx, stats_y, num, fontsize=18, fontweight='bold',
                color=COLORS['accent'], ha='center', va='center')
        ax.text(sx, stats_y - 0.018, label, fontsize=7,
                color=COLORS['text_light'], ha='center', va='center')

    # Card grid layout - 3 columns, 4 rows, tighter spacing
    margin = 0.02
    gap = 0.015
    card_width = (1 - 2*margin - 2*gap) / 3
    card_height = 0.195
    gap_y = 0.015
    start_y = 0.855 - card_height

    # Order of features for grid
    order = [
        'skills', 'notes', 'automation',
        'tags', 'integrations', 'templates',
        'cli', 'research', 'maintenance',
        'capture', 'documents', 'sync',
    ]

    for idx, key in enumerate(order):
        row = idx // 3
        col = idx % 3

        x = margin + col * (card_width + gap)
        y = start_y - row * (card_height + gap_y)

        draw_card(ax, x, y, card_width, card_height, key, FEATURES[key])

    # Footer
    footer_y = 0.012
    ax.text(0.5, footer_y, 'github.com/DavidROliverBA/ArchitectKB  |  MIT License  |  Built with Claude Code',
            fontsize=8, color=COLORS['text_dim'], ha='center', va='center')

    # Save as PNG first, then convert to JPEG
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    png_path = os.path.join(repo_root, 'screenshots', 'ArchitectKB-Abilities.png')
    output_path = os.path.join(repo_root, 'screenshots', 'ArchitectKB-Abilities.jpg')

    plt.savefig(png_path,
                facecolor=COLORS['bg'],
                edgecolor='none',
                bbox_inches='tight',
                pad_inches=0.05,
                dpi=200)
    plt.close()

    # Convert PNG to JPEG with Pillow
    img = Image.open(png_path)
    rgb_img = img.convert('RGB')
    rgb_img.save(output_path, 'JPEG', quality=95)

    # Remove PNG
    os.remove(png_path)

    print(f"Infographic saved to: {output_path}")

    # Print file size
    size_bytes = os.path.getsize(output_path)
    print(f"File size: {size_bytes / 1024:.1f} KB")

    return output_path

if __name__ == '__main__':
    create_infographic()
