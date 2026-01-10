---
context: fork
---

# /youtube

Save a YouTube video as a detailed weblink note with transcript analysis.

## Usage

```
/youtube <url>
/youtube <url> <optional title override>
```

## Examples

```
/youtube https://www.youtube.com/watch?v=dQw4w9WgXcQ
/youtube https://youtu.be/abc123 AWS re:Invent Keynote
```

## Prerequisites

This skill requires the `youtube_transcript` MCP server. If not already added:
```
mcp-add youtube_transcript
```

## Instructions

1. **Add MCP server if needed**:
   - Check if youtube_transcript tools are available
   - If not, add: `mcp-add youtube_transcript`

2. **Fetch video information**:
   - Use `get_video_info` to get title, channel, duration
   - Use `get_transcript` to get full transcript text
   - If transcript unavailable, note this in the output

3. **Analyse the transcript** (REQUIRED):
   - Write a 3-5 sentence summary of the video content
   - Extract 5-10 key points/arguments made
   - Identify the speaker(s) and their credentials if mentioned
   - Note any technologies, frameworks, or tools discussed
   - Identify relevance to your architecture work

4. **Generate filename**: `Weblink - Youtube - {{title}}.md`

5. **Create weblink in vault root**:

```markdown
---
type: Weblink
title: "{{title}}"
created: {{DATE}}
modified: {{DATE}}
tags: [video, {{relevant tags}}]
url: {{youtube_url}}
domain: youtube.com
author: {{channel name}}
source: YouTube
duration: {{duration if available}}
---

# {{title}}

## Source

- **URL:** {{url}}
- **Channel:** {{channel name}}
- **Duration:** {{duration}}

## Summary

{{3-5 sentence summary of the video content and main thesis}}

## Key Points

- {{key argument/point 1}}
- {{key argument/point 2}}
- {{...continue for all major points}}

## Speaker

{{Brief bio of speaker if mentioned in video, or note if unknown}}

## Notable Quotes

> "{{memorable quote 1}}"

> "{{memorable quote 2}}"

## Technologies/Concepts Mentioned

- {{technology or concept 1}}
- {{technology or concept 2}}

## Relevance

{{How this relates to your work, architecture, or current projects. Remove section if not relevant.}}

## Transcript

<details>
<summary>Full Transcript (click to expand)</summary>

{{full transcript text, cleaned up for readability}}

</details>

## Related

- {{wiki-links to related notes}}
```

6. **Transcript formatting**:
   - Clean up line breaks for readability
   - Preserve paragraph structure where natural breaks occur
   - Keep speaker changes clear if multiple speakers

7. **Tag extraction**:
   - Always include `video` tag
   - Add 3-6 topic-relevant tags
   - Use existing vault tags where possible

8. **Find related notes**:
   - Search vault for related topics, people, technologies
   - Add wiki-links to relevant existing notes

9. **After creating**:
   - Confirm creation with file path
   - Show brief summary of video content
   - Highlight key relevance if applicable

## Quality Standards

- **Always** fetch and analyse the transcript - never create without it
- **Always** provide a meaningful summary (not just the video title)
- **Always** extract key points - minimum 5 for substantive videos
- **Include** notable quotes that capture the speaker's main arguments
- **Preserve** the full transcript in a collapsible section for reference
- Use UK English throughout
