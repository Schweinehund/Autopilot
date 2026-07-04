<!-- REFERENCE DOCUMENT TEMPLATE
     Usage: Copy this file as your starting point for any reference doc — capability matrix,
     platform comparison, error-code guide, endpoint list, feature table, or other lookup material.
     Rules:
     - Fill in last_verified and review_by dates at doc creation time (review_by = last_verified + 90 days)
     - The `1970-01-01 # TEMPLATE-SENTINEL` value on last_verified is a harness-skip sentinel —
       REPLACE with actual authoring date when copying this template
     - Fill in doc_id from docs/_registry/RE-index.md at doc creation time
     - Set owner to the person or role responsible for this document
     - Set doc_type: Reference (this template is Reference-class only)
     - Set platform to the appropriate D1-mapped value — replace 'all' if the reference covers a
       specific platform. Valid values: Windows | macOS | iOS | Android | Linux | all
     - Update the EEE block line (immediately after the frontmatter close) to match your
       platform label and assigned Doc ID before publishing
     - Tables: any table exceeding 25 rows MUST have a prose summary paragraph within 5 lines
       of the closing table delimiter (Phase 118 C17 table-remediation rule — assertion #11).
       Use the "Table summary" blockquote pattern shown in the example section below.
     - No Mermaid code fences (C17 assertion #1)
     - Owner promotes status from Draft to Approved when content is reviewed and ready
     Reviewer: [Platform Lead for the reference domain]
-->
---
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Reference
platform: all
---

**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** RE-[NNN] · **Status:** Draft

# [Reference Doc Title — descriptive, not a bare RE-NNN]

## Summary

[2–3 sentences describing the scope and purpose of this reference document and its target audience. Minimum 30 words. State what information this doc provides (e.g., capability matrix, error-code lookup, endpoint list, platform comparison), which platforms or product versions it covers, and who the primary audience is (L1 service desk, L2 engineers, Intune admins, or end users).]

## [Reference Section Title]

[Reference content — tables, lists, code samples, or comparison matrices. Use this section for structured lookup material.]

### Tables exceeding 25 rows — prose summary required

If any table in this document exceeds 25 rows, add a `> **Table summary:**` blockquote within
5 lines of the closing table delimiter. This is enforced by C17 assertion #11 at Phase 118.

Example:

| [Column A] | [Column B] | [Column C] |
|------------|------------|------------|
| [value]    | [value]    | [value]    |

> **Table summary:** [1–2 sentence prose summary — REQUIRED if the table exceeds 25 rows. Describe what the table shows and call out the most operationally important entries. Omit this blockquote for tables with 25 or fewer rows.]

## See Also

- [Related reference doc](link)
- [Relevant runbook or admin guide](link)
