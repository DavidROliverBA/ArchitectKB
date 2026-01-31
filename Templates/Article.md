<%\*
const name = await tp.system.prompt("Article title:");
if (name) {
await tp.file.rename("Article - " + name);
}
\_%>

---

type: Article
pillar: node
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
articleType: null # article | blog-post | video | podcast | linkedin-post
platform: null # medium | substack | confluence | linkedin | youtube
targetAudience: null # internal | external | both
status: draft # draft | ready | published | archived
publishedUrl: null
publishedDate: null
parentIdea: null
nodeRelationships: []
entityRelationships: []

# Quality Indicators

summary: null
keywords: []
confidence: medium
freshness: current
source: synthesis
verified: false
reviewed: <% tp.date.now("YYYY-MM-DD") %>

---

# <% name %>

## Summary

<!-- One paragraph executive summary -->

## Key Points

-

## Content

<!-- Main article content -->

## Call to Action

<!-- What should the reader do next? -->

## References

-
