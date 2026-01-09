# Contributing to Obsidian Architect Vault Template

Thank you for your interest in improving this vault template! Contributions from the community help make this resource better for all architects.

## How to Contribute

### Reporting Issues

If you find a problem with the template:

1. **Search existing issues** first to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Detailed description of the problem
   - Steps to reproduce (if applicable)
   - Expected vs actual behaviour
   - Your Obsidian version and OS
   - Screenshots (if helpful)

### Suggesting Enhancements

Have an idea to improve the template?

1. **Check existing issues** for similar suggestions
2. **Create an enhancement issue** with:
   - Clear description of the enhancement
   - Use case / problem it solves
   - Proposed solution (if you have one)
   - Examples from other systems (if applicable)

### Contributing Code/Content

#### Before You Start

- **Discuss major changes** by creating an issue first
- **Keep it generic**: Avoid organization-specific content
- **Maintain quality**: Follow existing patterns and standards
- **Test thoroughly**: Verify Dataview queries work

#### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**:
   - Follow existing file/folder conventions
   - Update relevant documentation
   - Test Dataview queries
   - Check for typos and formatting
4. **Commit your changes**:
   - Use clear, descriptive commit messages
   - Reference related issues: "Fixes #123"
5. **Push to your fork**: `git push origin feature/your-feature-name`
6. **Create a Pull Request**:
   - Describe what changed and why
   - Reference related issues
   - Include screenshots (if UI changes)

#### What to Contribute

**Welcomed Contributions:**
- Bug fixes (broken queries, typos, errors)
- New MOC views or queries
- Additional Claude skills
- Better example notes
- Documentation improvements
- New note type templates (if broadly useful)
- Quality of life improvements

**Contributions We'll Likely Decline:**
- Organization-specific content
- Highly opinionated workflows
- Features for edge cases
- Duplicate functionality
- Breaking changes without discussion

## Style Guide

### Markdown

- Use ATX-style headers (`#` not `===`)
- One blank line between sections
- Bullet lists with `-` not `*`
- Code blocks with language: ` ```yaml`
- Links: `[[Wiki Links]]` for internal, `[Text](URL)` for external

### Frontmatter

- Always include `type` field
- Use lowercase for status/priority values
- Date format: `YYYY-MM-DD`
- No `#` prefix for tags in frontmatter
- Maintain alphabetical order of fields (where sensible)

### Dataview Queries

- Use `TABLE WITHOUT ID` for cleaner output
- Add comments explaining complex queries
- Sort results meaningfully
- Limit results when appropriate
- Test queries against example notes

### File Naming

- Follow established conventions in README
- Use Title Case for names
- No special characters except `-`
- Be descriptive but concise

### Templates

- Include helpful inline comments
- Provide example values
- Use Templater syntax (`<%*` ... `_%>`)
- Auto-rename files where appropriate
- Mark required vs optional fields

## Testing Your Changes

Before submitting a PR:

1. **Open in Obsidian**:
   - Clone your fork
   - Open in Obsidian
   - Install Dataview and Templater plugins

2. **Verify MOCs**:
   - Open each MOC you changed
   - Verify Dataview queries execute
   - Check for query errors

3. **Test Templates**:
   - Create notes from templates
   - Verify auto-rename works
   - Check frontmatter populates correctly

4. **Check Links**:
   - All `[[wiki-links]]` resolve
   - No broken links
   - Example notes cross-reference correctly

5. **Review Documentation**:
   - README reflects your changes
   - CHANGELOG updated (if significant)
   - Inline comments added for complexity

## Documentation

### README.md

- Update for new features or changed behavior
- Add examples for new note types
- Keep Quick Start section current
- Update skill list if you add skills

### CHANGELOG.md

Add entries for:
- New features
- Breaking changes
- Bug fixes
- Deprecations

Format:
```markdown
## [Version] - YYYY-MM-DD

### Added
- New feature description

### Changed
- What changed and why

### Fixed
- Bug fix description
```

### Inline Documentation

- Add comments in complex Dataview queries
- Explain non-obvious template logic
- Document customization points in context files

## Code of Conduct

### Our Pledge

We're committed to making this project welcoming and harassment-free for everyone, regardless of experience level, background, or identity.

### Our Standards

**Positive behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards other community members

**Unacceptable behavior:**
- Harassment, trolling, or insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Project maintainers will address inappropriate behavior. We reserve the right to remove comments, commits, or contributions that don't align with this Code of Conduct.

## Questions?

- **General questions**: Create a GitHub Discussion
- **Bug reports**: Create an issue
- **Feature requests**: Create an issue
- **Security issues**: Email maintainer directly (see README)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md (if significant contribution)
- Mentioned in CHANGELOG.md
- Thanked in PR comments

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

**Thank you for helping make this template better for the architecture community!**
