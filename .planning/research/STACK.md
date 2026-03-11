# Stack Research

**Domain:** Windows Autopilot documentation and troubleshooting guides (Markdown-first, multi-tier audience)
**Researched:** 2026-03-10
**Confidence:** HIGH (core tools); MEDIUM (export pipeline)

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Markdown (CommonMark) | n/a | Source format for all docs | Version-controlled, exportable to any wiki platform; matches existing project constraint |
| Mermaid | 11.x (latest: 11.13.0) | Flowcharts and decision trees embedded in Markdown | Native GitHub/GitLab rendering; no build step required; ideal for L1 decision trees; text-based so diffable |
| MkDocs + Material theme | 9.7.2 | Local documentation site and PDF/HTML rendering | Python-based (aligns with existing backend); Material theme adds search, tabs, admonitions, and native Mermaid support; widely used for IT ops docs |
| Pandoc | 3.9 | Export Markdown to DOCX/PDF for SharePoint distribution | De-facto standard for document format conversion; supports custom reference.docx for branded output |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| markdownlint-cli2 | 0.21.0 | Lint Markdown files for consistency and formatting errors | Run in CI and as pre-commit hook; catches broken heading hierarchy, trailing spaces, inconsistent list styles before merge |
| mkdocs-mermaid2-plugin | latest stable | Alternative Mermaid renderer for MkDocs if native integration has rendering issues | Only needed if Material theme's built-in Mermaid support fails in your environment |
| pymdownx.superfences | bundled with mkdocs-material | Enables fenced Mermaid code blocks in MkDocs | Required in mkdocs.yml to activate Mermaid rendering; no extra install |
| mark (kovetskiy/mark) | latest | Sync Markdown files to Confluence via REST API | Use when Confluence is the team wiki; handles page create/update automatically |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| VS Code + Markdown Preview Mermaid Support extension | Live preview of Mermaid diagrams in editor | Extension ID: bierner.markdown-mermaid; zero-config |
| mermaid.live | Online editor for iterating on diagram syntax | Use during authoring; paste finished diagram back into Markdown file |
| Pandoc reference.docx | DOCX template for branded exports | Run `pandoc --print-default-data-file reference.docx > reference.docx` to generate, then style headings/tables to match your org's template |

## Installation

```bash
# Documentation site (add to existing Python backend venv or a separate docs venv)
pip install mkdocs-material==9.7.2

# Markdown linting (dev dependency — add to package.json if fronend devs also write docs, or install globally)
npm install -D markdownlint-cli2@0.21.0

# Pandoc: install via system package manager (not pip)
# Windows: winget install JohnMacFarlane.Pandoc
# or download installer from https://pandoc.org/installing.html

# Confluence sync (optional, only if Confluence is target wiki)
# Install mark binary from https://github.com/kovetskiy/mark/releases
```

## MkDocs Configuration (mkdocs.yml)

The minimal config to enable Mermaid decision trees in the docs site:

```yaml
site_name: Windows Autopilot Troubleshooting
theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - search.highlight
    - content.tabs.link

markdown_extensions:
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
  - admonition
  - pymdownx.details
  - pymdownx.tabbed:
      alternate_style: true
  - tables
  - toc:
      permalink: true
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Mermaid | PlantUML | When diagrams are large and complex (architecture-level); requires Java runtime and server/plugin, which adds friction for docs contributors; overkill for L1 decision trees |
| MkDocs Material | Docusaurus | If the team already has React expertise and wants a full SPA with i18n and versioned docs; heavier setup, Node-based, harder to add to a Python project |
| MkDocs Material | GitBook | If you want zero-config hosted docs with a commercial platform; avoid for this project because docs must live in git and be exportable |
| markdownlint-cli2 | Vale | Vale is better for prose style enforcement (Microsoft Style Guide rules); use Vale only if editorial consistency (grammar, voice, terminology) is a priority — overkill for this milestone's goal of structural correctness |
| Pandoc + reference.docx | Direct SharePoint upload of .md | SharePoint renders .md as plain text, not formatted pages; Pandoc-converted DOCX uploads as a proper document |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| GitBook (hosted) | Docs must live in git and be independently exportable; vendor lock-in; free tier limitations | MkDocs Material with GitHub Pages or local serve |
| Sphinx | Python-first but RST syntax, not Markdown; steep learning curve for IT writers; designed for API reference, not operational runbooks | MkDocs Material |
| draw.io / Lucidchart embedded diagrams | Binary or proprietary formats that cannot be diffed; break when diagrams are embedded as image links; maintenance burden when troubleshooting steps change | Mermaid (text-based, diffable, renders natively in GitHub) |
| Heavy CI pipeline for docs on first milestone | Overly complex for a documentation-first milestone; adds setup burden without immediate value | Validate locally with `mkdocs serve` and `markdownlint-cli2`; add CI later |
| Confluence as the source of truth | Cannot version-control Confluence pages; Markdown-first then sync to Confluence is the correct direction | Markdown in `docs/` as canonical source; sync to Confluence as a secondary step |

## Stack Patterns by Variant

**If consuming team uses SharePoint exclusively:**
- Export with Pandoc to DOCX: `pandoc input.md -o output.docx --reference-doc=reference.docx`
- Upload DOCX to SharePoint document library
- No additional tooling needed

**If consuming team uses Confluence:**
- Use `mark` CLI to sync `docs/` directory to Confluence space
- Set `CONFLUENCE_USERNAME`, `CONFLUENCE_PASSWORD`, and `CONFLUENCE_URL` env vars
- Run `mark --dry-run` first to preview page creation

**If docs site is published internally (intranet):**
- `mkdocs build` produces a static site in `site/`
- Host on any static file server, IIS, or SharePoint as a document library with HTML files
- No server-side runtime required

**If only Markdown in `docs/` (no site build) is the goal for this milestone:**
- Skip MkDocs entirely for now — Mermaid renders natively in GitHub and Azure DevOps wikis
- Add MkDocs build as a future milestone when a browsable site is needed
- Markdownlint-cli2 still applies regardless

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| mkdocs-material 9.7.x | MkDocs 1.6.x | Material 9.7.x is the final feature release; security patches will continue for 12 months |
| pymdownx.superfences (bundled) | mkdocs-material 9.x | Do not install pymdownx separately; it is bundled with mkdocs-material |
| mermaid 11.x | MkDocs Material 9.x | Material auto-loads Mermaid JS; no separate npm install needed for the docs site |
| markdownlint-cli2 0.21.x | Node.js 18+ | Works standalone; no relation to MkDocs or Python |
| Pandoc 3.9 | Any OS | Windows installer available; no Python or Node dependency |

## Sources

- [mermaid npm page](https://www.npmjs.com/package/mermaid) — version 11.13.0 confirmed current as of 2026-03-10
- [mkdocs-material PyPI](https://pypi.org/project/mkdocs-material/) — version 9.7.2 confirmed current; Insiders features now free
- [Material for MkDocs Diagrams reference](https://squidfunk.github.io/mkdocs-material/reference/diagrams/) — native Mermaid integration config verified
- [markdownlint-cli2 npm](https://www.npmjs.com/package/markdownlint-cli2) — version 0.21.0 confirmed current
- [Pandoc releases](https://pandoc.org/releases.html) — version 3.9 confirmed current
- [kovetskiy/mark GitHub](https://github.com/kovetskiy/mark) — Confluence sync tool, MEDIUM confidence (community tool, not officially supported by Atlassian)
- [PlantUML vs Mermaid comparison](https://www.gleek.io/blog/mermaid-vs-plantuml) — rationale for Mermaid preference in docs-first context
- [MkDocs vs Docusaurus comparison](https://blog.damavis.com/en/mkdocs-vs-docusaurus-for-technical-documentation/) — rationale for MkDocs preference in Python project context

---
*Stack research for: Windows Autopilot documentation tooling (Markdown, diagrams, export)*
*Researched: 2026-03-10*
