---
type: Prompt
title: { { title } }
version: "1.0.0"
created: { { date } }
modified: { { date } }

# Classification
category: writing | analysis | code | planning | review | extraction
domain: []
targetAI: claude | gpt | any
audience: executive | architect | developer | operations
tone: formal | educational | conversational | technical
format: prose | json | markdown | bullets | table

# Quality
effectiveness: untested
consistency: null
usageCount: 0
lastUsed: null
lastTested: null

# Model Config (optional)
model: null
temperature: null
maxTokens: null

# Relationships
relatedTo: []
usedBy: []
supersedes: []

tags:
  - prompt/{{category}}
---

# {{title}}

## Purpose

What this prompt is for and when to use it.

## Variables

| Variable   | Description | Required | Default |
| ---------- | ----------- | -------- | ------- |
| `{{var1}}` |             | Yes      | -       |
| `{{var2}}` |             | No       |         |

## The Prompt

```
[The actual prompt text with {{variables}}]
```

## Example Usage

**Input:**

- var1: "example value"
- var2: "example value"

**Output excerpt:**
[Sample of what this prompt produces]

## Version History

| Version | Date     | Change  | Result |
| ------- | -------- | ------- | ------ |
| 1.0.0   | {{date}} | Initial |        |

## Related

- Related prompts
- Skills that use this prompt
