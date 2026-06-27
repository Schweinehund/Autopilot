---
phase: 94-post-migration-verification-content-closure
reviewed: 2026-06-26T00:00:00Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - docs/macos-lifecycle/02-mdm-migration-psso.md
findings:
  critical: 1
  warning: 1
  info: 2
  total: 4
status: issues_found
---

# Phase 94: Code Review Report

**Reviewed:** 2026-06-26
**Depth:** standard
**Files Reviewed:** 1
**Status:** issues_found

## Summary

Reviewed `docs/macos-lifecycle/02-mdm-migration-psso.md` — a 565-line operator walkthrough for macOS MDM migration from Kandji/Iru to Intune with PSSO. The review applied the scope constraints from the review orientation (factual/citation integrity, internal consistency, scope/constraint compliance for MIGV-03 and the pilot command, markdown structure).

The document is well-structured and the MIGV-03 supervision content correctly maintains MEDIUM confidence with no flat "supervision is preserved" assertion and no claim that the Secure Enclave key survives migration. The `last_verified`/`review_by` freshness stamps are present in the YAML frontmatter. No broken relative links were introduced by this file in isolation.

One critical cross-file inconsistency was found: the glossary `Kandji-Iru` entry states a single URL (`support.kandji.io`) with the phrase "the support portal URL is unchanged," which directly contradicts the walkthrough's three-URL picture (`support.kandji.io`, `support.iru.io`, `docs.iru.com`). One warning was found regarding the pilot supervision verification command. Two informational items cover a stage-table sequencing ambiguity and a note on the pilot command form relative to the locked constraint.

---

## Critical Issues

### CR-01: Glossary Kandji-Iru URL Entry Contradicts Walkthrough's Three-URL Picture

**File:** `docs/_glossary-macos.md:114` (cross-referenced against `docs/macos-lifecycle/02-mdm-migration-psso.md:148,152,553`)

**Issue:** The glossary `### Kandji-Iru` entry (line 114 of `_glossary-macos.md`) reads:

> "The support portal URL is unchanged: support.kandji.io."

This is a flat, single-URL assertion that says the URL has not changed. The walkthrough under review (lines 148, 152, 553-554) describes a three-URL reality established during the 2026-06-26 verification:

- `support.kandji.io` — accessible, displays Iru branding ("Kandji is now Iru")
- `support.iru.io` — resolves but is a login-gated SPA with no publicly accessible content
- `docs.iru.com` — **new authoritative Iru public documentation domain**, publicly accessible

The glossary says the URL is "unchanged" when in fact Iru has introduced a new authoritative documentation domain (`docs.iru.com`) that the walkthrough treats as the primary source-of-truth for the Delete Device Record UI path (line 154: "UI path below is confirmed from `docs.iru.com`"). A reader who arrives at the glossary `Kandji-Iru` entry — which the walkthrough's own Glossary Quick Reference table links to at line 553 — will see only the old URL and no mention of `docs.iru.com`, which is directly contradicted by what Stage 2 instructs them to use.

**Fix:** Update `docs/_glossary-macos.md`, `### Kandji-Iru` entry body (line 114) to align with the three-URL reality documented in the walkthrough. Replace the current single-URL sentence with:

```markdown
macOS MDM platform rebranded from Kandji to Iru in October 2025. Both names refer to the
same product; this documentation uses "Kandji/Iru" throughout to be clear for readers who
may know either name. Portal URLs as of 2026-06-26: `support.kandji.io` hosts Iru-branded
KB articles (verified accessible); `support.iru.io` resolves but is a login-gated SPA
(no publicly accessible content); `docs.iru.com` is the new authoritative Iru public docs
domain (verified accessible). Verify which URLs resolve on your authoring day.
```

---

## Warnings

### WR-01: Pilot Supervision Verification Command Uses a Pipe — Diverges from Locked Constraint Form

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md:331`

**Issue:** The review orientation constraint specifies: "the pilot command must be the single `profiles status -type enrollment` (NO `profiles list` before/after baseline)." Line 331 prescribes:

```bash
profiles status -type enrollment | grep Supervised
```

The piped `grep Supervised` transforms the command output to show only lines containing "Supervised," which silently filters out any other lines that might contain diagnostically useful status. The constraint specifies the single base command. While `profiles list` is correctly absent, the addition of `| grep Supervised` diverges from the locked constraint form in a way that reduces diagnostic visibility: if the command returns an unexpected output structure or the "Supervised" string changes across macOS versions, the operator sees nothing rather than the full output.

Additionally, the command is nested inside a Note callout within the prose of item 4 (MEDIUM confidence supervision block), whereas the scope constraint treats it as a locked pilot verification command. Its placement inside a confidence-qualified note may make it appear optional to operators who skim.

**Fix:** Change the command at line 331 to the plain locked form without the pipe:

```bash
profiles status -type enrollment
```

Add a separate instruction telling the operator what to look for in the output (e.g., "Look for `Supervised: Yes` in the output"), rather than piping to grep. This preserves full output visibility and matches the locked constraint form exactly.

---

## Info

### IN-01: Stage Summary Table and B2 Stage 2/3 Body Describe Delete Device Record in Two Different Stages

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md:88,478,484`

**Issue:** There is a sequencing ambiguity between the Stage Summary Table and the B2 stage bodies:

- Stage Summary Table, row B2-3 (line 88): "What Happens" lists "Delete Device Record in Kandji/Iru; Erase Mac" — placing DDR as part of Stage 3.
- B2 Stage 2 body (line 478): "Complete Delete Device Record in Kandji/Iru and allow ~15 minutes for agent self-removal before proceeding to the wipe" — DDR is explicitly an action in Stage 2.
- B2 Stage 3 body (line 484): "After secrets are retrieved and the device record is deleted in Kandji/Iru, initiate an Erase Mac command" — refers to DDR as already completed, consistent with Stage 2.

The Stage 3 row in the summary table incorrectly lists DDR as a Stage 3 action when the stage bodies place it in Stage 2. An operator relying solely on the table may believe DDR and Erase Mac are co-located in Stage 3 and inadvertently skip the ~15-minute agent-removal delay that Stage 2 requires between DDR and the wipe.

**Fix:** Correct the Stage Summary Table row for B2-3 at line 88 to remove "Delete Device Record in Kandji/Iru" from its "What Happens" column, leaving only "Erase Mac; device enters Setup Assistant." The B2-2 row already covers DDR as its own line — the duplication is the source of the ambiguity.

---

### IN-02: Glossary Quick Reference Table Kandji/Iru Row — Anchor Slug Diverges from Glossary Heading

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md:553`

**Issue:** The Glossary Quick Reference table (line 553) links to the glossary Kandji/Iru entry as:

```markdown
[Kandji / Iru](../_glossary-macos.md#kandji-iru)
```

The glossary heading (line 112 of `_glossary-macos.md`) is:

```markdown
### Kandji-Iru
```

GitHub Markdown renders `### Kandji-Iru` as slug `#kandji-iru` (hyphen separator, no slash). The link `#kandji-iru` will therefore resolve correctly to the `### Kandji-Iru` heading. However, the display text `Kandji / Iru` (with space-slash-space) and the heading `Kandji-Iru` (with hyphen) are inconsistent in their separator character. This is a cosmetic inconsistency rather than a broken link, but it is worth noting because the project's memory note on glossary anchor slugs (reference_glossary_anchor_slugs.md) flags the double-hyphen trap: "bare `### Kandji-Iru` not `### Kandji / Iru` (double-hyphen trap)" — the heading already correctly uses `Kandji-Iru`, and the link slug is therefore correct. No functional defect; the display-text slash is a cosmetic inconsistency only.

**Fix:** Optionally align the display text in the table to match the glossary heading: change `Kandji / Iru` to `Kandji/Iru` (no spaces around the slash) so it matches the usage throughout the walkthrough body.

---

_Reviewed: 2026-06-26_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
