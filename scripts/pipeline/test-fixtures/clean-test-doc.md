---
title: Clean Test Document
last_verified: 2026-07-03
platform: Windows
status: approved
---

# Clean Test Document

**Doc ID:** RE-T00 . **Platform:** Windows . **Doc Type:** Runbook . **Status:** Approved

This is a synthetic test fixture for Phase 113 pipeline validation. It exercises the basic
conversion and guard checks: YAML frontmatter is promoted to Word document properties (not
leaked into body text), and heading levels are preserved as Word Heading styles.

## Section One

This section provides content under Heading 2. The guard checks that Heading1 and Heading2
styleIds appear in the converted .docx body XML.

### Sub-section One-A

Content under Heading 3 confirms three heading levels are preserved through the pipeline.

## Section Two

A second top-level section confirms that multiple Heading 2 instances are handled correctly.
The YAML-leak check verifies that the frontmatter block above (delimited by `---`) does not
appear in the first 500 characters of the body text.

### Sub-section Two-A

Additional content for the guard self-test baseline.

### Sub-section Two-B

Final sub-section to confirm heading style IDs for Heading3 are present in the output.
