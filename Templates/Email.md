---
type: Email
pillar: event
title: null
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
subject: null
from: null # "[[Person - X]]" or email address
to: []
cc: []
date: <% tp.date.now("YYYY-MM-DD") %>
time: null

# Classification
direction: null # inbound | outbound | draft
purpose: null # action-required | waiting | fyi | reference | decision
status: received # draft | sent | received | processed | archived
priority: medium # high | medium | low

# Relationships
project: null # "[[Project - X]]"
person: null # "[[Person - X]]"
thread: null # "[[Email - Previous]]"
createdTasks: []
nodeRelationships: []
entityRelationships: []

# Quality
summary: null
keywords: []
---

# <% tp.file.title %>

## Summary

## Content

## Action Items

- [ ]

## Related

-
