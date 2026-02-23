# MCP Servers Context

> **Template:** Populate this file with your MCP server configuration details.
> Load when: user asks about MCP tools, Notion/Diagrams/YouTube integration.

## Configured Servers

<!-- List your MCP servers from .mcp.json here -->

| Server | Purpose | Tools |
| ------ | ------- | ----- |
| `memory` | Cross-session learning | create_entities, search_nodes, add_observations |
| `context7` | Live library documentation | resolve-library-id, query-docs |

## Tool Usage Examples

### Memory Server

```
# Search for existing knowledge
mcp__memory__search_nodes("query")

# Create new entity
mcp__memory__create_entities([{ name: "Lesson-Example", entityType: "LessonLearned", observations: ["..."] }])

# Add observation to existing entity
mcp__memory__add_observations([{ entityName: "Lesson-Example", contents: ["New observation"] }])
```

### Context7 Server

```
# Look up a library
mcp__context7__resolve-library-id("react")

# Query documentation
mcp__context7__query-docs({ libraryId: "...", query: "hooks" })
```

## Adding New Servers

Configure MCP servers in `.mcp.json` (repo-portable) or global settings. See Claude Code documentation for setup instructions.
