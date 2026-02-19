---
type: Email
title: null
created: '<% tp.date.now("YYYY-MM-DD") %>'
modified: '<% tp.date.now("YYYY-MM-DD") %>'
tags: []
subject: null
from: null # "[[X]]" or email address
to: []
cc: []
date: '<% tp.date.now("YYYY-MM-DD") %>'
time: null

# Classification
direction: null # inbound | outbound | draft
purpose: null # action-required | waiting | fyi | reference | decision
status: received # draft | sent | received | processed | archived
priority: medium # high | medium | low

# Relationships
project: null # "[[Project - X]]"
person: null # "[[X]]"
thread: null # "[[Email - Previous]]"
createdTasks: []
relatedTo: []

summary: null
---

# <% tp.file.title %>

## Summary

## Content

## Action Items

- [ ]

## Related

-
