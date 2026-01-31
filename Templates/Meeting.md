<%\*
const name = await tp.system.prompt("Meeting name:");
if (name) {
const date = tp.date.now("YYYY-MM-DD");
const year = tp.date.now("YYYY");
const filename = "Meeting - " + date + " " + name;
await tp.file.move("Meetings/" + year + "/" + filename);
}
\_%>

---

type: Meeting
pillar: event
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
date: <% tp.date.now("YYYY-MM-DD") %>
time: null
project: null
attendees: []
summary: null
nodeRelationships: []
entityRelationships: []

---

# <% name %>

## Attendees

-

## Agenda

1.

## Discussion Notes

## Action Items

- [ ]

## Decisions Made

-

## Follow-up
