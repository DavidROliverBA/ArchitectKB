---
type: DataAsset
pillar: entity
title: null
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
assetId: null

# Classification
domain: null # engineering | data | operations | finance | hr | supply-chain | maintenance
dataType: null # database-table | database-view | api-endpoint | kafka-topic | data-product | data-lake | file | report | cache
classification: null # public | internal | confidential | secret

# Location & Format
sourceSystem: null # "[[System - X]]"
storageLocation: null
format: null # sql | json | parquet | avro | csv | xml | binary

# Ownership
owner: null # "[[Person - X]]"
steward: null # "[[Person - Y]]"

# Data Relationships
producedBy: []
consumedBy: []
derivedFrom: []
feedsInto: []

# Operational
refreshFrequency: null # real-time | hourly | daily | weekly | monthly | ad-hoc
slaAvailability: null
slaLatency: null

# Governance
gdprApplicable: false
piiFields: []

# Relationships
nodeRelationships: []
entityRelationships: []

# Quality
confidence: medium
freshness: current
verified: false
reviewed: null
---

# <% tp.file.title %>

## Overview

## Data Flow

## Schema

## Quality

## Notes

-
