# Skills Context

> **Template:** Populate this file with your vault's skill inventory.
> Load when: user asks about available skills, skill usage, or `/help`.

## Available Skills

<!-- List your skills here with command and purpose -->

| Command | Purpose | Model |
| ------- | ------- | ----- |
| `/daily` | Create daily note | haiku |
| `/meeting` | Create meeting note | sonnet |
| `/task` | Create or update task | haiku |
| `/adr` | Create architecture decision record | opus |
| `/person` | Create person note | haiku |
| `/q` | Search the vault | haiku |

## Skill Categories

### Note Creation
<!-- Skills that create new notes -->

### Search & Query
<!-- Skills for finding content -->

### Maintenance
<!-- Skills for vault health and upkeep -->

### Integration
<!-- Skills for external service integration -->

## Adding New Skills

New skills are created in `.claude/skills/<name>/SKILL.md`. Use the `/skill-creator` meta-agent or create manually following the SKILL.md template convention.
