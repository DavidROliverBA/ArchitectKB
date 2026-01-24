<%*
const name = await tp.system.prompt("Article title:");
if (name) {
  await tp.file.rename("Article - " + name);
}
_%>
---
type: Article
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []

# Article Classification
articleType: null
# article | blog-post | document | guardrail | video | podcast | linkedin-post

platform: null
# medium | substack | confluence | linkedin | youtube | spotify | internal | null

targetAudience: null
# internal | external | both

# Provenance
parentIdea: null
# "[[Incubator - Source Idea]]" - link to incubating idea (if applicable)

# Publication
status: draft
# draft | ready | published | archived

publishedUrl: null
publishedDate: null

# Quality Indicators
summary: null
confidence: medium
freshness: current
source: synthesis
verified: false
reviewed: <% tp.date.now("YYYY-MM-DD") %>

# Semantic Discovery
keywords: []

# Relationships
relatedTo: []
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
