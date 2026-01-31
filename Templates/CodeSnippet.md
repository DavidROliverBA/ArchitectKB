<%*
const name = await tp.system.prompt("Code snippet name:");
if (name) {
  await tp.file.rename("Code Snippet - " + name);
}
_%>
---
type: CodeSnippet
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
language:
source:
project:
---

# <% name %>

## Description

What does this code do and when would you use it?

## Code

```
// paste code here
```

## Usage Example

```
// example of how to use it
```

## Notes

-

## Related

-
