<%*
const name = await tp.system.prompt("Course name:");
if (name) {
  await tp.file.rename("Course - " + name);
}
_%>
---
type: Course
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
provider:
url:
project:
status: not-started
start-date:
end-date:
certificate:
---

# <% name %>

## Overview

- **Provider:**
- **URL:**
- **Duration:**
- **Status:** Not Started | In Progress | Completed

## Learning Objectives

-

## Modules / Sections

### Module 1:

#### Key Points

-

#### Notes

### Module 2:

#### Key Points

-

#### Notes

## Key Takeaways

-

## Action Items

- [ ]

## Resources

-

## Certificate

<!-- Link to certificate if completed -->
