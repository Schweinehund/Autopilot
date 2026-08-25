# Phase 150: Per-OEM BIOS Guides & Capability Matrix - Pattern Map

**Mapped:** 2026-08-25
**Files analyzed:** 5 (3 new operations guides, 1 new reference matrix, 2 edited files) + 1 filed-amendment target
**Analogs found:** 5 / 5

This is a documentation corpus, not an application codebase. "Files" are Markdown docs under `docs/`;
"roles" are doc_type/EEE classes; "data flow" is read-only reference content, not runtime data flow.

## File Classification

| New/Modified File | Role | Doc class | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/operations/firmware-bios/02-dell-bios-configuration.md` | operations guide (unenrolled, no frontmatter) | vendor-specific configuration guide | `docs/operations/firmware-bios/01-windows-dfci.md` | exact (same directory, same phase-149 sibling shape) |
| `docs/operations/firmware-bios/03-hp-bios-configuration.md` | operations guide (unenrolled) | vendor-specific configuration guide | `docs/operations/firmware-bios/01-windows-dfci.md` | exact |
| `docs/operations/firmware-bios/04-lenovo-bios-configuration.md` | operations guide (unenrolled) | vendor-specific configuration guide | `docs/operations/firmware-bios/01-windows-dfci.md` | exact |
| `docs/reference/firmware-oem-matrix.md` (new, RE-226) | EEE-enrolled reference doc | OEM capability matrix | `docs/reference/aosp-oem-matrix.md` (RE-145) | exact — only other OEM matrix in corpus, explicitly the chosen precedent in CONTEXT.md D-05/D-06/D-13/D-15 |
| `docs/operations/firmware-bios/00-overview.md` | operations guide, **edited** (D-36..D-40) | domain router | itself (149-shipped) — read the existing file before editing, do not import a different template | n/a (edit, not new) |
| `docs/_glossary.md` | EEE-enrolled reference doc, **edited** (D-85..D-87) | glossary | itself — follow the Phase-149 edit precedent at its own `## Version History` rows 2026-08-24/2026-08-25 | n/a (edit, not new) |
| `.planning/REQUIREMENTS.md` | planning artifact, **edited** (D-02) | filed amendment | 149 D-05's SC#4 registration-path premise amendment (same file, same mechanism) | exact |

No file in this phase has an "analog not found" — the corpus ships exactly one prior OEM matrix and
exactly one prior sibling-guide pair (149's own `00`/`01`) to copy from.

## Pattern Assignments

### The three new guides — `02-dell-*.md`, `03-hp-*.md`, `04-lenovo-*.md`

**Analog:** `docs/operations/firmware-bios/01-windows-dfci.md` (and its sibling `00-overview.md`)

**These files are UNENROLLED — no YAML frontmatter, no `doc_id`.** `[MEASURED]` (CONTEXT D-10):
`grep -rln "doc_id" docs/operations/firmware-bios/` returns zero. Do not add frontmatter to the new
guides — copy `01-windows-dfci.md`'s frontmatter-free shape exactly.

**Header block** (`01-windows-dfci.md` lines 1-16, verbatim structure to copy):
```
---
last_verified: 2026-08-24
review_by: 2026-10-23
applies_to: APv1
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific and covers the Device Firmware
> Configuration Interface (DFCI) as its own surface — what the interface is, its prerequisites and
> disqualifiers, OEM support, Surface eligibility, the settings surface, and the irreversible
> configuration, retire, reuse and recover sequences. For the domain overview and the routing
> question of who holds the BIOS secret on Dell, HP and Lenovo hardware, see
> [Firmware and BIOS Governance](00-overview.md).

# Device Firmware Configuration Interface (DFCI)
```
Note this block still carries `last_verified`/`review_by`/`applies_to`/`audience`/`platform` keys as
plain YAML even though the file is unenrolled (no `doc_id`, no `status`, no `owner`, no `doc_type`) —
copy that exact reduced key set, not the full C17 seven-key set used by the matrix.

**Platform-applicability blockquote:** every guide opens with one, D-79 requires it (`> **Platform
applicability:** …`), and it must route back to `00-overview.md`. `[MEASURED]` CONTEXT D-79 warns
`01`'s own blockquote is 493 characters (2.5× the 200-char C17 cap) and survives only because
operations files are unenrolled — the new guides may follow that length, but should not be padded
further without reason.

**Heading skeleton — the SIX capability H2s (D-01, one-way amendment) plus two tail H2s, one
hand-authored `<a id>` above every H2 except the two tail H2s** (D-78 — "anchors equal H2 minus the
two tail H2s", verified this session at `00-overview.md` 7 anchors / 9 H2s and `01` 10 anchors / 12
H2s):
```
<a id="delivery"></a>
## Delivery

<a id="authentication"></a>
## Authentication

<a id="scope"></a>
## Scope

<a id="prerequisites"></a>
## Prerequisites

<a id="offboarding-and-loss-of-the-management-plane"></a>
## Offboarding and Loss of the Management Plane

<a id="recovery"></a>
## Recovery

## Unsupported and Anti-Feature Callouts

## Related Resources
```
(Exact anchor id text is Claude's discretion at plan time per CONTEXT — write the id list into the
PLAN before executing; do not improvise ids per-file.) The two tail H2s (`## Unsupported and
Anti-Feature Callouts` / `## Related Resources`, or `## External References` — 01 has both of the
latter two, 00-overview does too) are copied from `01-windows-dfci.md` lines 534-587 verbatim as the
"two inherited tail H2s" D-01 refers to.

**Source lines / citations** (`00-overview.md` lines 39-47, the exact form to copy):
```
**Dell — Intune holds the secret.** ... Custody and vendor
coverage are both stated on the Microsoft page for that surface:

> Intune stores the BIOS passwords for each device.
>
> Currently, only Dell is supported.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (ms.date 2024-06-06, updated 2026-07-01)
```
Rule (D-46/D-47): one evidence line ("**Source:** …") per blockquote of contiguous quotes from ONE
page; never let one evidence line cover two pages' worth of quotes. Vendor pages without a Learn
`ms.date`/`updated_at` pair get a single parenthetical date (see the HP and Lenovo Source lines at
`00-overview.md` lines 54 and 68 — `(Version 1.2.0, published 2022-09-27)` and `(published
2025-11-04)`).

**Blockquotes are bare `>` form, never `> *"…"*`.** `[MEASURED]` (D-11): `grep -rn '^> \*"' docs/` = 0
— the corpus has never shipped an emphasis-wrapped blockquote. The 200-character C17 cap does not
bind these unenrolled files, but D-10 says the phase treats it as house style anyway for the six
strings that exceed it — do not artificially wrap or fence long quotes; a blockquote spanning
multiple `>` lines is one contiguous quote, not a violation, per D-09 (no file-level blockquote
budget, confirmed by reading `c17-eee-contract.mjs:389-408` yourself if double-checking).

**Ordered sequences, never code fences.** `[INHERITED]` D-65: zero code fences anywhere in this
phase — provisioning/de-provisioning orders (D-29, D-64) ship as a numbered Markdown list, exactly
the pattern 149 D-36 already set.

**Cross-document links — relative paths computed from the SOURCE file, always** (D-27/D-79). From a
file in `docs/operations/firmware-bios/`, a link to the matrix is
`[Firmware OEM Capability Matrix](../../reference/firmware-oem-matrix.md)`; a link to
`00-overview.md` or between the three new guides is a same-directory relative link,
e.g. `[Firmware and BIOS Governance](00-overview.md)`. Anchor targets are the hand-authored
`<a id>` strings, never a GitHub heading slug — `check-nav-hub-links.mjs`'s `resolveLinkTarget`
(line 288) resolves fragments against `resolvableAnchorSet`, which reads the literal `<a id="...">`
tags, and there is **no allowlist** for a mismatch.

**Error/absence handling (the corpus's closest thing to "error handling" for a documentation
repo):** an absence of vendor documentation ships as an enumerated fact with an as-of date (D-57),
never as a sourced negative dressed as a quote (`[INHERITED]` D-43): *"As of `<date>`, `<vendor>`
does not document `<X>`; pages checked: `<list>`."* This is the guide-side half of D-58/D-59's
search-terms provenance record (the RESEARCH.md side is not this phase's file to write, but the
in-guide sentence is).

**Retired/current Microsoft branding convention** (D-71), copy verbatim from
`docs/operations/drift-migration/01-windows-drift-detection.md:18`:
```
Intune Remediations (formerly Proactive Remediations)
```
Apply the same parenthetical-retirement form to Microsoft Endpoint Manager and to Azure Active
Directory → Microsoft Entra ID, except inside a vendor product's own literal name (e.g. "HP Connect
for Microsoft Endpoint Manager" ships unchanged because that is the product's own name).

---

### `docs/reference/firmware-oem-matrix.md` (new, RE-226)

**Analog:** `docs/reference/aosp-oem-matrix.md` (RE-145) — the corpus's only other OEM matrix, and
CONTEXT.md's explicitly chosen structural precedent (D-05, D-06, D-07, D-13, D-15, D-16, D-19).

**Exact YAML frontmatter block** (`aosp-oem-matrix.md` lines 1-12, every key in order with real
values — this phase's matrix drops `applies_to` per D-17):
```yaml
---
doc_id: RE-145
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---

**Platform:** Android · **Doc Type:** Reference · **Doc ID:** RE-145 · **Status:** Approved
```
Per D-17 the new matrix ships: `doc_id: RE-226` · `status: Approved` · `owner:` matched to whichever
sibling matrix carries it (Claude's discretion — read `owner:` off the four platform matrices at
plan time) · `doc_type: Reference` · `platform: Windows` · `audience: admin` ·
`last_verified:` = commit-1 execution date · `review_by:` = last_verified + 60 (D-18, NOT the
template's +90) · **no `applies_to` key at all** (drop the line entirely, do not write `applies_to: `
blank). The header-block bold line above the H1 must byte-match these four frontmatter fields per
C17 assertion 9 (`c17-eee-contract.mjs:312-330`) — e.g.
`**Platform:** Windows · **Doc Type:** Reference · **Doc ID:** RE-226 · **Status:** Approved`.

**Heading skeleton** (`aosp-oem-matrix.md` H2 line numbers 15-109, verbatim outline to adapt):
```
# Intune: AOSP OEM Matrix — ...

## Summary

## Scope

## Hardware Scope
## Enrollment Method and Wi-Fi Embedding
## Vendor Portals and Licensing
## Intune AOSP Mode

## See Also

## Source Attribution

## Version History
```
This phase's matrix (D-04, D-05) uses:
```
# Firmware OEM Capability Matrix

## Summary

## Delivery
## Authentication
## Scope
## Prerequisites
## Offboarding and Loss of the Management Plane
## Recovery

## Key Gaps Summary

## Source Attribution

## See Also

## Version History
```
Note the ordering difference from the aosp precedent: this matrix's `## Key Gaps Summary` sits
between the six capability H2s and `## Source Attribution` (D-05), and `## See Also` sits AFTER
`## Source Attribution` here (D-05 order), whereas aosp has `## See Also` before `## Source
Attribution` (lines 87, 97) — do not copy aosp's H2 order past `## Summary`, only its H2 *set* and
per-H2 conventions. `## Summary` must be the first H2 with zero H3 between the header block and it,
and carry ≥30 words (C17 assertion 4/5, `c17-eee-contract.mjs:239-253`).

**Table + table-summary blockquote pattern** (`aosp-oem-matrix.md` lines 29-40, the exact unit to
repeat per capability H2 — D-07, D-08, D-09):
```
The table below lists the supported models, minimum firmware, and device type for each of the five AOSP OEMs.

| OEM | Models | Minimum Firmware | Type |
|-----|--------|------------------|------|
| RealWear | HMT-1 / HMT-1Z1 / Navigator 500 | HMT-1 11.2; HMT-1Z1 11.2; Nav 500 1.1 | AR/VR Headset |
...

> **Table summary:** This table lists supported models and minimum firmware for all 5 AOSP OEMs; all are AR/VR headsets except Zebra's wearable scanner.
```
Rows = the three OEMs (Dell, HP, Lenovo). Cell values are literal strings only — a sourced value,
`Not documented by vendor` (documented silence), or `n/a` (structural absence), never `+` notation
(D-19). BIOS-06's 2×2 password-state sub-table sits inside `## Prerequisites` (D-31): rows =
password-state, columns = Dell/Lenovo — a second, smaller table inside that one H2, same
table-summary-blockquote convention applied to it too.

**`## Source Attribution` pattern** (`aosp-oem-matrix.md` lines 97-107, per-OEM pins OUTSIDE the
tables):
```
Per-OEM source-confidence pins for the data points across the four capability sub-tables above (D-15: pins live OUTSIDE tables to keep cells literal-strings only per D-16).

- RealWear: `[HIGH: MS Learn AOSP supported devices + support.realwear.com, last_verified 2026-04-25]`
- Zebra: `[HIGH: MS Learn oemconfig-zebra-android-devices + techdocs.zebra.com, last_verified 2026-04-25]`
...
```
This phase adapts this to Dell/HP/Lenovo pins, including explicit `[DIRECT]`/`[RELAYED]` markers per
D-48/D-52 where the underlying research used them.

**`## See Also` pattern** (`aosp-oem-matrix.md` lines 87-94, a full inventory not a minimal one):
```
## See Also

- [AOSP Stub](../admin-setup-android/06-aosp-stub.md) — AOSP scope context
- [Android Capability Matrix](android-capability-matrix.md) — ...
- [09 RealWear](../admin-setup-android/09-aosp-realwear.md) — RealWear admin guide
...
```
This phase's `## See Also` carries six links (D-13): the three new guides, `00-overview.md`,
`01-windows-dfci.md`, and `docs/decision-trees/03-tpm-attestation.md` (D-12's C1-5 cross-link
target).

**`## Version History` pattern** (`aosp-oem-matrix.md` lines 109-113, one initial row that records
the shape decisions themselves, not just "initial version"):
```
| Date | Change | Author |
|------|--------|--------|
| 2026-07-06 | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-06) — 4 H2 sub-tables in fixed order (...); `## Source Attribution` H2 per D-15 (...); cell-value rules literal-strings only per D-16 (...) | -- |
```

**Footnote pattern** (only if needed — `aosp-oem-matrix.md:53`, `[^meta-volatility]:` — this phase
has no obvious footnote need per CONTEXT but the mechanism exists if a per-OEM caveat needs it
without breaking table-cell literalness).

**No platform-applicability blockquote on the matrix** — `[MEASURED]` D-79: 0 of 7 reference
matrices carries one; do not add one to `firmware-oem-matrix.md` even though the three guides each
get one.

---

### `docs/operations/firmware-bios/00-overview.md` (edited)

Edit the file in place; do not use a different template. Six-to-eight edit sites are named in D-37:
(1) the false sentence at lines 128-130 (`sed -n '124,133p'` to re-locate at edit time, do not trust
a cached line number), (2) the `02/03/04` outbound links (same site as (1)), (3) D-32's cross-reference
sentence (*"Dell wants a virgin BIOS; Lenovo needs a provisioned one"*) added to `## Choosing a Path`
or `## Related Resources`, (4) two frontmatter fields (`last_verified`/`review_by` — D-39, NOT D-69),
(5) D-36's HP-quote and Lenovo-quote reduction to a custody claim + link (the current quotes are at
lines 52 and 66, evidence lines at 54 and 68), (6) the new outbound link to the matrix (D-38). Copy
the file's own existing conventions (evidence-line form, blockquote form, anchor form) rather than
importing any other file's style — this is the file's own precedent, not a copy from elsewhere.

---

### `docs/_glossary.md` (edited)

**Analog:** the file's own 2026-08-24/2026-08-25 Version History rows (Phase 149's edit to this same
file) — copy that edit's shape exactly, not a different glossary file.

**New term block form** (`docs/_glossary.md` under `## Hardware`, e.g. lines 115-121, the pattern to
repeat for `Sure Admin`, `Think BIOS Config`, `HP Connect`, `DCECMI`):
```
### Hardware hash

A 4K-byte device fingerprint derived from hardware identifiers, used by APv1 to match a physical device to its Autopilot profile before OOBE.

> **APv2 note:** ...
```
**Alphabetical Index single-line insertion** (`docs/_glossary.md:33`, ONE physical line — never
split it):
```
[APv1](#apv1) | [APv2](#apv2) | ... | [ZTDID](#ztdid) | [ZTD](#ztd)
```
Insert the four new term links sorted in place into this one pipe-delimited line.

**`## Version History` row form** (`docs/_glossary.md:301`):
```
| 2026-08-24 | Phase 149 (BIOS-02 / BIOS-04): added `### BIOS configuration and other settings`, ... | -- |
```

**`last_verified` STAYS UNCHANGED** (D-87, owner-ruled 2026-08-25) — `2026-06-29` /
`review_by: 2026-09-27` — do not advance frontmatter dates on this file; instead add a Version
History row recording the non-advance, exactly like the file's own 2026-08-25 row already does.

---

### `.planning/REQUIREMENTS.md` (filed amendment, D-02)

**Analog:** 149 D-05's SC#4 registration-path premise amendment, in this same file. Read that
amendment's exact form at plan time (grep `REQUIREMENTS.md` for the 149 D-05 amendment entry) and
copy its shape — an evidence-carrying entry naming the CONTEXT decision (here, D-01) as its ground,
amending SC#1/BIOS-05 from "five-section" to "six-section".

## Shared Patterns

### Frontmatter / enrollment split
**Source:** `scripts/validation/c17-eee-contract.mjs`
**Apply to:** the matrix only (enrolled), NOT the three guides or the overview (unenrolled, no
`doc_id`).
- Assertion 2/3 (H1 rules): exactly one H1 after the header block; not a bare `RE-NNN` H1.
- Assertion 4/5 (`## Summary` first, ≥30 words).
- Assertion 8 (required frontmatter keys: `doc_id`, `status`, `owner`, `doc_type`, `last_verified`).
- Assertion 9 (header-block bold line byte-matches the four frontmatter fields).
- Assertion 10 (`platform` value must be in the 20-entry `D1_MAP` at `c17-eee-contract.mjs:26-47` —
  `'Windows'` is a valid literal key; hard failure, no fallback, on anything else).
- Assertion 11 (`c17-eee-contract.mjs:345-384`) — 25-data-row-plus-header threshold for a required
  table-of-contents; irrelevant here, three-OEM tables are far under it.
- Assertion 12 (`c17-eee-contract.mjs:389-408`) — 200-char cap per contiguous `^>` run, joined with a
  space; only binds the matrix (enrolled) and the glossary, not the three unenrolled guides or the
  overview.
Run: `node scripts/validation/c17-eee-contract.mjs` (add `--verbose` to see per-assertion detail).

### Anchor / link resolution
**Source:** `scripts/validation/check-nav-hub-links.mjs` (`resolveLinkTarget` line 288,
`githubSlug` lines 121-126, inbound-link walk lines 276-300)
**Apply to:** all new and edited files. Target existence AND anchor resolution, with **no
allowlist, baseline, ratchet, or expected-failure list** — any dangling link or unresolved fragment
is a hard failure. Anchors resolve against hand-authored `<a id="...">` tags, never a computed
GitHub heading slug.
Run: `node scripts/validation/check-nav-hub-links.mjs`

### Corpus-wide prose gates
**Source:** `scripts/validation/check-phase-54.mjs` (`V-54-27` at lines 437-467; `PATCH_FILES`
constant at line 35 — the five `patch-management/` files, NOT this phase's `firmware-bios/` files)
**Apply to:** all `.md` under `docs/` including `.planning/`. American-spelling regex, retired
Microsoft-name checks (`Configuration Manager`, singular `Autopatch ring`), one runnable grep per
prose negative (D-34, D-82).

### C11 (live corpus prose scan)
**Source:** `scripts/validation/v1.20-milestone-audit.mjs` lines ~574-585, `walkMd('docs')`
**Apply to:** both the edited overview and the new matrix (D-81) — C11 strips nothing, so URL text
is scanned too.

### The apex chain
**Source:** `scripts/validation/check-phase-144.mjs`
**Apply to:** run after the content commit AND again after the overview commit, separately from the
verifier (D-83). It transitively subsumes `check-nav-hub-links` (via `check-phase-143.mjs`'s
`V-143-CORPUSRUN`), C11 and C17 (via `V-144-AUDIT-HARNESS`), and `check-phase-54`'s `V-54-27` (via
the chained 54). `check-phase-150.mjs` does **not exist** — it is Phase 153's file to author; do not
create it in this phase.
Run: `node scripts/validation/check-phase-144.mjs`

### Glossary collision audit
**Source:** `scripts/validation/check-phase-49.mjs` lines 288-317 (`V-49-19`)
**Apply to:** run once after the `_glossary.md` edit, to check the new H3 term set against the Linux
glossary for collisions.
Run: `node scripts/validation/check-phase-49.mjs`

### Registry / filename-map / publish-bundle canaries
**Source:** `docs/_registry/RE-index.md` (tail rows: `RE-224`/`RE-225`, table format
`| RE-NNN | path | Title | Type | Status |`), `scripts/pipeline/build-filename-map.mjs` line 283
(self-test canary `(c) parseRegistry(...) yields exactly 225 rows`), and
`scripts/pipeline/build-publish-bundle.mjs` line 520 (self-test canary `(a) Approved selection
yields exactly 225 rows`, and line 523's Approved-filter that drives the `.docx` bundle).
**Apply to:** the registry row for RE-226 is **NOT landed in this phase** — it is Phase 152's
(INT-01/INT-04). Both `225`-row canaries in `build-filename-map.mjs` and `build-publish-bundle.mjs`
are correspondingly **NOT bumped to 226 in this phase** — bumping only one of the two self-test
canaries independently, without the registry row landing, would desync them from
`docs/_registry/RE-index.md`'s real row count and break both self-tests. Leave both files untouched.
The matrix ships `status: Approved` with `doc_id: RE-226` but is silently excluded from the publish
bundle's `.docx` output until Phase 152 lands the row — `[MEASURED]` D-22, `build-publish-bundle.mjs`
line 520's `allRows.filter(r => r.status === 'Approved')` reads only rows that exist in
`RE-index.md`, so an Approved doc with no row simply isn't in `allRows` and nothing throws.

## Registration fence — explicitly OUT of scope for this phase

Per CONTEXT.md's Phase Boundary and D-20/D-21/D-22, this phase must NOT touch:
- `docs/_registry/RE-index.md` — read-only, for the `max(RE-NNN)+1 = RE-226` recompute check
  (Phase 152 lands the row).
- `scripts/pipeline/build-filename-map.mjs`'s `225` self-test canary — leave at 225.
- `scripts/pipeline/build-publish-bundle.mjs`'s `225` self-test canary — leave at 225.
- Any ops-index or `docs/index.md` entry for the new files — Phase 152 (INT-01/INT-04).
- `check-phase-150.mjs` — Phase 153 (HARN-04).
- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` — read only (D-42, D-67,
  D-68); the seam sentence in each new guide links to it, but `06` itself is not edited.
- `docs/operations/firmware-bios/01-windows-dfci.md` — read only (D-41); linking into it is not
  editing it.

## No Analog Found

None. Every file this phase creates or edits has a concrete in-corpus precedent (either the aosp
matrix, the 149-shipped `00`/`01` sibling pair, or the file's own prior edit history for
`00-overview.md` and `_glossary.md`).

## Metadata

**Analog search scope:** `docs/reference/*.md`, `docs/operations/firmware-bios/*.md`,
`docs/_glossary.md`, `docs/_registry/RE-index.md`, `scripts/validation/*.mjs`,
`scripts/pipeline/*.mjs`.
**Files scanned:** `docs/reference/aosp-oem-matrix.md`, `docs/operations/firmware-bios/00-overview.md`,
`docs/operations/firmware-bios/01-windows-dfci.md`, `docs/_glossary.md`,
`docs/_registry/RE-index.md`, `scripts/validation/c17-eee-contract.mjs`,
`scripts/validation/check-nav-hub-links.mjs`, `scripts/validation/check-phase-49.mjs`,
`scripts/validation/check-phase-144.mjs`, `scripts/pipeline/build-filename-map.mjs`,
`scripts/pipeline/build-publish-bundle.mjs`.
**Pattern extraction date:** 2026-08-25
</content>
