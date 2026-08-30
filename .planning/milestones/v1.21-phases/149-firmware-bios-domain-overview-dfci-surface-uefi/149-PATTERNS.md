# Phase 149: Firmware/BIOS Domain — Overview, DFCI & Surface UEFI - Pattern Map

**Mapped:** 2026-08-24
**Files analyzed:** 3 (2 new, 1 modified)
**Analogs found:** 3 / 3

This is a documentation corpus, not an application. "Pattern" = authoring convention (frontmatter,
blockquote shape, anchor style, Source-line format) plus which validator scripts actually bind the
new paths (confirmed by reading their globs, not inferred from filenames).

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|-----------------|---------------|
| `docs/operations/firmware-bios/00-overview.md` | ops routing-hub doc | request-response (reader navigation) | `docs/operations/patch-management/06-windows-driver-firmware-updates.md` | exact (same doc-class: ops-tier, no `doc_id`, policy-surface guide) |
| `docs/operations/firmware-bios/01-windows-dfci.md` | ops guide doc | request-response (reader navigation) | `docs/operations/patch-management/06-windows-driver-firmware-updates.md` | exact |
| `docs/_glossary.md` (edit, additive) | reference doc / glossary | CRUD (append entry) | itself — Phase-75 precedent row at `:285`; `### Secure Boot` (`:201`) and `### TPM` (`:137`) as term-entry shape | exact (same file, existing precedent edit) |

No files with zero analog — this phase is greenfield content but the sibling doc-class (`patch-management/05-08`) and the glossary's own prior edits fully cover the shape needed.

## Pattern Assignments

### `docs/operations/firmware-bios/00-overview.md` and `01-windows-dfci.md` (ops doc, request-response)

**Analog:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (also cross-check `05-08` siblings — all four are byte-identical in shape: 10 H2s / 8 anchors / 0 fences / 0 Version History)

**Frontmatter pattern** (verbatim, lines 1-7):
```yaml
---
last_verified: 2026-08-20
review_by: 2026-10-19
applies_to: all
audience: admin
platform: Windows
---
```
No `doc_id` key. For this phase's two files: `applies_to: APv1` (not `all` — D-30), dates computed
at actual execution time (`review_by` = `last_verified` + 60, never mirrored from a sibling).

**Platform-applicability blockquote** (lines 9-14):
```markdown
> **Platform applicability:** This guide is Windows-specific and covers the Intune driver and
> firmware update policy as its own surface — approval modes, the approval workflow, deferral and
> deadline behavior, OEM catalog and firmware delivery, reporting, Configuration Manager
> co-existence, and the documented absences. For the cross-platform overview, see
> [Patch Management Overview](00-overview.md). For WUfB deployment ring topology and Autopatch ring
> disambiguation, see [Windows WUfB Rings](01-windows-wufb-rings.md).
```
Must be `> **Platform applicability:**`, never `> **Platform:**` — the latter is the exact bare
token `V-54-27` negative-asserts against (see Shared Patterns). Ends with cross-links to sibling
files by relative path — mirrors D-29's bidirectional-cross-link requirement between `00` and `01`.

**Anchor + H2 pairing** (lines 379-380):
```markdown
<a id="oem-catalog-firmware"></a>
## OEM Catalog and Firmware Delivery
```
Hand-authored short id, own line immediately above the H2 — never the full heading slug (D-12).
Anchor count = H2 count − 2 (`## Related Resources` and `## External References` stay unanchored).

**Source-line pattern** (line 48, and 63 more like it in this file):
```markdown
**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)
```
Standalone, line-start paragraph placed **after** the claim it supports, never inside a leading
blockquote, never an inline parenthetical. This phase's own D-51 upgrades the shape to **two
dates**: `(ms.date YYYY-MM-DD, updated YYYY-MM-DD)` — the sibling's single-date form is the OLD
shape; do not copy it verbatim, copy the placement/standalone-paragraph rule and add the second
date.

**Zero code fences, zero Version History** — confirmed on all four `patch-management/05-08`
siblings; carry the same absences into both new files (D-31).

---

### `docs/_glossary.md` (reference, additive edit)

**Analog:** the file's own prior edits — Phase-75 precedent (Entra ID SSO) and existing
`### Secure Boot` / `### TPM` term bodies.

**Frontmatter** (lines 1-10, unchanged by this edit):
```yaml
---
doc_id: RE-184
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-06-29
review_by: 2026-09-27
applies_to: both
audience: all
platform: all
---
```
90-day cycle — do not "correct" to the milestone's 60-day interval (D-63).

**Alphabetical Index row** (line 31, single pipe-delimited line under the summary blockquotes):
```
[APv1](#apv1) | [APv2](#apv2) | ... | [ZTD](#ztd)
```
Insert new `[Term](#anchor)` entries into this line in alphabetical position.

**Term-entry shape** (`### Secure Boot`, lines 201-203, and `### TPM`, lines 137+):
```markdown
### Secure Boot

A UEFI firmware feature that verifies the bootloader's digital signature, required for TPM attestation.
```
Plain `### Term Name` H3 under an existing topical `## H2` (`## Security` at `:189`, `## Hardware`
at `:109`) — no template macro. Optional `> See also:` blockquote follows the body when
cross-referencing (e.g. `### TPM`'s `> See also: [Secure Enclave](_glossary-macos.md#secure-enclave)...`).

**Version History row** (tail table, line 285, Phase-75 precedent — copy the shape, not the content):
```
| 2026-06-20 | Phase 75 (SSOREF-01 / XC-1): added `### Entra ID SSO` term (Security section) and a reciprocal `> See also:` to Secure Enclave inside the existing `### TPM` body; Alphabetical Index updated | -- |
```
One row per change, `| Date | Change | Author |`, author `--`.

## Shared Patterns

### Frontmatter (no `doc_id`, ops-tier)
**Source:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:1-7`
**Apply to:** both new firmware-bios files.
No enforcement exists on these two files' `review_by` interval — `V-54-07` is `PATCH_FILES`-scoped
only (`check-phase-54.mjs:35`); do not assume a validator will catch a wrong date.

### Anchor id union (explicit id ∪ heading slug)
**Source:** `check-nav-hub-links.mjs:142-172` (`githubSlug` at `:121-126`)
**Apply to:** every `<a id>` and every internal link target in both new files.
Strips `[^a-z0-9 _-]` in place then maps each remaining space to one hyphen without collapsing —
an `&` in an H2 produces a double hyphen; write `and`, never `&` (D-23).

### `check-nav-hub-links` binds via a recursive `docs/` walk, not a directory allowlist
**Source:** `check-nav-hub-links.mjs:275` — `const allMd = walkMd('docs');`
**Apply to:** both new files automatically, with no directory-specific configuration needed. Zero
dangling links / zero unresolved anchors is the bar (no allowlist, no ratchet, confirmed
`check-nav-hub-links.mjs:7-8`).

### `V-54-27` — corpus-wide negative on bare `> **Platform:**`
**Source:** `check-phase-54.mjs:437-462` — `id: 27`, its own recursive `walkMd(dir, acc)` over
**both** `docs/` and `.planning/`.
**Apply to:** both new files AND any PLAN file this phase's planner writes (it walks `.planning/`
too) — never write the bare `> **Platform:**` token; only `> **Platform applicability:**` is safe.

### C11 (banned-phrase fallback) — binds via `v1.20-milestone-audit.mjs`, not `check-phase-54`
**Source:** `v1.20-milestone-audit.mjs:574-585` — `for (const abs of walkMd('docs')) { targets.push(...) }`, patterns `\bSystem Center\b`, `\bSCCM\b[^.]*\bIntune\b`, `\bAutopatch rings\b`, `\bSafetyNet\b[^.]*\bcompliance\b`.
**Apply to:** both new files (scope comment in source: `// Scope: all docs/**/*.md (ops-depth is cross-platform)`). Write `Configuration Manager`, never `SCCM`/`System Center`; singular `Autopatch ring` if mentioned. `check-phase-54` passing is NOT evidence of C11 cleanliness — it lives only in the milestone audit.

### `docs/_glossary.md` binds 4 validators (10 mentions), none constrains new-entry shape
**Source:** `check-phase-49.mjs:25-345` (H3-collision audit, `V-49-19` loads the term set — run
`check-phase-49` after editing), `check-phase-59.mjs:30-33` (glossary path constants),
`check-phase-121.mjs` and `check-phase-62.mjs` also name the path.
**Apply to:** the glossary edit only. None of the four asserts an H3 count or blocks additive
entries — the binding risk is the Linux-glossary collision check (`V-49-19`), not a structural gate.

## No Analog Found

None. All three files (two new ops docs + one glossary edit) have a byte-identical or
functionally-identical existing analog in the corpus.

## Metadata

**Analog search scope:** `docs/operations/patch-management/{05,06,07,08}-*.md`, `docs/_glossary.md`,
`scripts/validation/check-phase-{49,54,59,121}.mjs`, `scripts/validation/check-nav-hub-links.mjs`,
`scripts/validation/v1.20-milestone-audit.mjs`.
**Files scanned:** 10 (4 sibling ops docs, 1 glossary, 5 validator scripts — read via grep + targeted line ranges, no full-file loads).
**Pattern extraction date:** 2026-08-24
