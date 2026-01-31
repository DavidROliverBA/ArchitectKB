<%\*
const subject = await tp.system.prompt("Email subject:");
const direction = await tp.system.suggester(["Inbound", "Outbound", "Draft"], ["inbound", "outbound", "draft"]);
const prefix = direction === "inbound" ? "From" : "To";
const contact = await tp.system.prompt(prefix + " (name):");
if (subject && contact) {
const date = tp.date.now("YYYY-MM-DD");
await tp.file.move("Emails/Email - " + contact + " - " + subject);
}
\_%>

---

type: Email
pillar: event
title: <% subject %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
subject: <% subject %>
from: null
to: []
cc: []
date: <% tp.date.now("YYYY-MM-DD") %>
time: null
direction: <% direction %> # inbound | outbound | draft
purpose: null # action-required | waiting | fyi | reference | decision
status: received # draft | sent | received | processed | archived
priority: medium
project: null
person: null
thread: null
createdTasks: []
nodeRelationships: []
entityRelationships: []

# Quality

summary: null
keywords: []

---

# Email: <% subject %>

## Details

- **From:**
- **To:**
- **CC:**
- **Date:**

## Content

## Action Items

- [ ]

## Notes
