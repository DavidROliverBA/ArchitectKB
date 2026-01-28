---
type: Page
title: Claude Code with AWS Bedrock Guide
created: 2026-01-28
modified: 2026-01-28
tags:
  - activity/documentation
  - domain/cloud
  - technology/aws
  - technology/bedrock
  - audience/architect

# Quality Indicators
summary: Setup and configuration guide for using Claude Code with AWS Bedrock
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-28

# Semantic Discovery
keywords:
  - aws-bedrock
  - claude-code
  - enterprise
  - configuration
  - api

# Relationships
relatedTo:
  - "[[Page - Claude Code Skills Quick Reference]]"
  - "[[Page - Secrets and Security Setup Guide]]"
  - "[[Page - How to Use This Vault]]"
---

# Claude Code with AWS Bedrock Guide

This guide covers setting up Claude Code to use AWS Bedrock as the AI provider, enabling enterprise deployment with data residency controls and cost management.

---

## Overview: Why Bedrock?

AWS Bedrock provides several advantages for enterprise use:

| Feature             | Benefit                                 |
| ------------------- | --------------------------------------- |
| **Data Residency**  | Data stays in your AWS region           |
| **VPC Integration** | Private endpoints, no public internet   |
| **IAM Control**     | Fine-grained access via AWS IAM         |
| **Cost Management** | Pay per token, track via AWS billing    |
| **Compliance**      | SOC2, HIPAA, PCI-DSS via AWS compliance |
| **Model Selection** | Choose specific Claude model versions   |

---

## Prerequisites

### 1. AWS Account with Bedrock Access

Ensure your AWS account has:

- Bedrock service enabled in your region
- Claude model access granted (requires separate request)

### 2. AWS CLI Configured

```bash
# Check AWS CLI is installed
aws --version

# Configure credentials
aws configure

# Verify access
aws sts get-caller-identity
```

### 3. Claude Model Access Enabled

In AWS Console:

1. Navigate to **Amazon Bedrock** → **Model access**
2. Request access to Anthropic Claude models
3. Wait for approval (usually automatic)

### 4. Claude Code Installed

```bash
# Verify installation
claude --version

# Should show version 1.0.0 or later
```

---

## Configuration

### Environment Variables

Set these environment variables for Bedrock authentication:

```bash
# AWS credentials (if not using aws configure)
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_REGION="us-east-1"  # or your preferred region

# Optional: Use a specific profile
export AWS_PROFILE="bedrock-profile"
```

### AWS Credentials File

Alternatively, configure in `~/.aws/credentials`:

```ini
[bedrock-profile]
aws_access_key_id = AKIA...
aws_secret_access_key = your-secret-key
region = us-east-1
```

### Claude Code Settings

Configure Claude Code to use Bedrock:

```bash
# Set provider to Bedrock
claude config set provider bedrock

# Set default region (if not in AWS config)
claude config set bedrock.region us-east-1
```

Or via environment variable:

```bash
export CLAUDE_PROVIDER=bedrock
```

---

## Claude Code Setup for Bedrock

### Starting a Session

```bash
# Start with Bedrock provider
claude --provider bedrock

# Or with explicit model
claude --provider bedrock --model anthropic.claude-3-5-sonnet-20241022-v2:0
```

### Model IDs on Bedrock

AWS Bedrock uses specific model IDs:

| Model             | Bedrock Model ID                            |
| ----------------- | ------------------------------------------- |
| Claude 3.5 Sonnet | `anthropic.claude-3-5-sonnet-20241022-v2:0` |
| Claude 3 Opus     | `anthropic.claude-3-opus-20240229-v1:0`     |
| Claude 3 Sonnet   | `anthropic.claude-3-sonnet-20240229-v1:0`   |
| Claude 3 Haiku    | `anthropic.claude-3-haiku-20240307-v1:0`    |

### Mapping to Claude Code Models

When using Bedrock, Claude Code model names map to Bedrock IDs:

```bash
# These are equivalent
claude --provider bedrock --model sonnet
claude --provider bedrock --model anthropic.claude-3-5-sonnet-20241022-v2:0
```

| Claude Code | Bedrock Model                               |
| ----------- | ------------------------------------------- |
| `opus`      | `anthropic.claude-3-opus-20240229-v1:0`     |
| `sonnet`    | `anthropic.claude-3-5-sonnet-20241022-v2:0` |
| `haiku`     | `anthropic.claude-3-haiku-20240307-v1:0`    |

---

## Model Selection on Bedrock

### Available Models

Check available models in your region:

```bash
aws bedrock list-foundation-models \
  --by-provider anthropic \
  --query 'modelSummaries[*].[modelId,modelName]' \
  --output table
```

### Pricing Considerations

Bedrock pricing (approximate, check AWS for current):

| Model             | Input (per 1K tokens) | Output (per 1K tokens) |
| ----------------- | --------------------- | ---------------------- |
| Claude 3.5 Sonnet | $0.003                | $0.015                 |
| Claude 3 Opus     | $0.015                | $0.075                 |
| Claude 3 Haiku    | $0.00025              | $0.00125               |

**Cost-effective usage:**

- Use Haiku for quick tasks
- Use Sonnet for most work
- Reserve Opus for complex reasoning

### Model Selection by Task

| Task Type                   | Recommended Model | Bedrock ID                      |
| --------------------------- | ----------------- | ------------------------------- |
| Quick capture, search       | Haiku             | `anthropic.claude-3-haiku-*`    |
| Analysis, documentation     | Sonnet            | `anthropic.claude-3-5-sonnet-*` |
| Complex ADRs, deep analysis | Opus              | `anthropic.claude-3-opus-*`     |

---

## Usage Examples

### Basic Session with Bedrock

```bash
# Start session
claude --provider bedrock

# Run with specific model
claude --provider bedrock --model haiku
```

### Using Skills with Bedrock

All ArchitectKB skills work with Bedrock:

```bash
# Start Bedrock session
claude --provider bedrock

# Then use skills normally
/daily
/meeting Sprint Planning
/q type:Adr status:proposed
```

### Switching Providers Mid-Session

You cannot switch providers mid-session. Start a new session:

```bash
# Direct API session
claude --provider anthropic

# Bedrock session
claude --provider bedrock
```

---

## Troubleshooting

### "Access Denied"

**Problem:** `AccessDeniedException` when calling Bedrock

**Solutions:**

1. **Check IAM permissions:**

   ```json
   {
     "Effect": "Allow",
     "Action": ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream"],
     "Resource": "arn:aws:bedrock:*:*:*"
   }
   ```

2. **Verify model access:**
   - AWS Console → Bedrock → Model access
   - Ensure Claude models are enabled

3. **Check region:**
   - Bedrock isn't available in all regions
   - Use `us-east-1`, `us-west-2`, or `eu-west-1`

### "Model Not Available"

**Problem:** Model not found in Bedrock

**Solutions:**

1. **Check model ID:**

   ```bash
   aws bedrock list-foundation-models --by-provider anthropic
   ```

2. **Request model access:**
   - Some models require explicit access request
   - AWS Console → Bedrock → Model access → Request access

3. **Verify region supports model:**
   - Not all models available in all regions

### "Throttling" or "Rate Limit"

**Problem:** `ThrottlingException` during heavy use

**Solutions:**

1. **Request quota increase:**
   - Service Quotas → Amazon Bedrock
   - Request increase for "Tokens per minute"

2. **Implement backoff:**
   - Claude Code handles this automatically
   - For scripts, add exponential backoff

3. **Use provisioned throughput:**
   - For high-volume production use
   - AWS Console → Bedrock → Provisioned throughput

### "Credentials Not Found"

**Problem:** AWS credentials not being picked up

**Solutions:**

1. **Check environment variables:**

   ```bash
   echo $AWS_ACCESS_KEY_ID
   echo $AWS_REGION
   ```

2. **Verify AWS CLI config:**

   ```bash
   aws sts get-caller-identity
   ```

3. **Check credentials file:**
   ```bash
   cat ~/.aws/credentials
   ```

---

## Security Considerations

### IAM Policies

**Least-privilege policy for Bedrock:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-*"
      ]
    }
  ]
}
```

### VPC Endpoints

For private connectivity (no internet):

```bash
# Create VPC endpoint for Bedrock
aws ec2 create-vpc-endpoint \
  --vpc-id vpc-xxx \
  --service-name com.amazonaws.us-east-1.bedrock-runtime \
  --vpc-endpoint-type Interface
```

### CloudTrail Logging

Enable logging for audit:

```bash
# Verify CloudTrail is logging Bedrock calls
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=EventSource,AttributeValue=bedrock.amazonaws.com
```

---

## Cost Management

### Tracking Usage

Monitor costs via AWS:

1. **Cost Explorer:**
   - Filter by service: Amazon Bedrock
   - Group by model ID

2. **CloudWatch Metrics:**
   - `InvocationsCount`
   - `InputTokenCount`
   - `OutputTokenCount`

### Budget Alerts

Set up cost alerts:

```bash
# Create budget alert (via AWS CLI or Console)
aws budgets create-budget \
  --account-id 123456789012 \
  --budget file://bedrock-budget.json
```

Example budget JSON:

```json
{
  "BudgetName": "Bedrock-Monthly",
  "BudgetLimit": {
    "Amount": "100",
    "Unit": "USD"
  },
  "BudgetType": "COST",
  "TimeUnit": "MONTHLY"
}
```

### Token Optimisation

Reduce costs:

1. **Use appropriate model:**
   - Haiku for simple tasks (~20x cheaper than Opus)
   - Sonnet for most work

2. **Limit context:**
   - Use `/wipe` to clear context regularly
   - Be specific in queries

3. **Batch similar requests:**
   - Combine related questions
   - Use skills that batch operations

---

## Quick Reference

### Environment Setup

```bash
# AWS credentials
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_REGION="us-east-1"

# Claude Code provider
export CLAUDE_PROVIDER=bedrock
```

### Starting Sessions

```bash
# Bedrock with default model
claude --provider bedrock

# Bedrock with specific model
claude --provider bedrock --model haiku
claude --provider bedrock --model sonnet
claude --provider bedrock --model opus
```

### Useful AWS Commands

```bash
# List available Claude models
aws bedrock list-foundation-models --by-provider anthropic

# Check model access status
aws bedrock get-model-access

# Test invoke (requires model ID)
aws bedrock-runtime invoke-model \
  --model-id anthropic.claude-3-haiku-20240307-v1:0 \
  --body '{"prompt": "Hello", "max_tokens": 100}' \
  response.json
```

---

## Related Guides

- [[Page - Claude Code Skills Quick Reference]] - All skills reference
- [[Page - Secrets and Security Setup Guide]] - Credential management
- [[Page - How to Use This Vault]] - General vault usage
