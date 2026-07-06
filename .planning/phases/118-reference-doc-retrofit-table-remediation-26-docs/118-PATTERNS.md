# Phase 118: Reference Doc Retrofit + Table Remediation (~26 docs) — Pattern Map

**Mapped:** 2026-07-06
**Files analyzed:** 3 artifact classes (34 enrolled reference-class docs + 1 new helper script + 1 registry) across 2 directories + 2 standalone comparison docs
**Analogs found:** 3 / 3

This is the **third and final** Phase-1 EEE-retrofit phase. The mechanical skeleton is **>90% identical** to the shipped Phase-117 admin-setup retrofit — same helper shape, same block-line/frontmatter contract, same pre-H1-span relocation, same #12 blockquote-split vocabulary. This document therefore leads with the **three genuine deltas** from 117 (VH column-shape detection, keyless-platform injection shape, per-table prose) and then carries the rest by direct reference to 117-PATTERNS.md.

---

## File Classification

| New/Modified Artifact | Role | Data Flow | Closest Analog | Match Quality |
|------------------------|------|-----------|-----------------|---------------|
| `docs/reference/00-index.md` + `docs/error-codes/00-index.md` (2 class-directory indexes) | documentation (reference, nav-hub) | transform (reformat) | `docs/l1-runbooks/00-index.md`-class precedent (Phase-116 D-06) via `docs/_templates/reference-template.md` | exact |
| `docs/reference/{4-platform-capability-comparison,android/aosp-oem/ios/linux/macos-capability-matrix}.md` (7 files, per-table prose IN SCOPE) | documentation (reference, capability matrix) | transform (reformat) + hand-authored per-table prose | `docs/_templates/reference-template.md` §"Tables exceeding 25 rows" worked example | exact |
| `docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md` (2 comparison docs, per-table prose IN SCOPE, both keyless-adjacent) | documentation (reference, comparison) | transform (reformat) + hand-authored per-table prose | `docs/_templates/reference-template.md` | exact |
| `docs/reference/{apv1-apv2-migration,compliance-timing,deployment-reporting,drift-detection,endpoints,entra-prerequisites,esp-timeout-tuning,gpo-to-intune,imaging-to-autopilot,licensing-matrix,macos-commands,macos-log-paths,network-infrastructure,new-batch-workflow,powershell-ref,registry-paths,security-baseline-conflicts,win32-app-packaging}.md` (18 files, ordinary reference — no D-118-1 prose) | documentation (reference, lookup) | transform (reformat) | `docs/_templates/reference-template.md` | exact |
| `docs/error-codes/{00-index,01-05,06}.md` (7 files, all keyless-platform) | documentation (reference, error-code lookup) | transform (reformat) | `docs/_templates/reference-template.md` (generic shape — no error-code-specific template exists, same as 117's Linux gap) | role-match |
| `scripts/pipeline/retrofit-reference.mjs` (NEW) | utility (transform script) | batch transform, file-I/O | `scripts/pipeline/retrofit-guide.mjs` (Phase 117) | role-match, fork-not-reuse (2 new code paths: VH column detection, multi-path allowlist) |
| `docs/_registry/RE-index.md` (Status column, RE-142..167 minus RE-147, RE-168..174, RE-177/178) | config / registry | CRUD (row edits) | `docs/_registry/RE-index.md` itself (116/117 precedent: same file, same edit shape) | self-update |

**1 file NOT enrolled this phase** (mermaid-deferred, D-05 — leave keyless, do not touch): `docs/reference/ca-enrollment-timing.md` (RE-147).

---

## Critical Structural Note: Three Deltas From the 117 Precedent (read this first)

Everything else in this phase (frontmatter key injection, block line, pre-H1-span relocation, #12 split vocabulary, registry flip) is the **same recipe as 117**, adapted from `doc_type: Guide` → `doc_type: Reference` and `owner` staying uniform `Intune Admin Lead`. Only three things are genuinely new this phase:

1. **Version-History column-shape detection** (13/34 files already have a `## Version History` section — 8 are 2-column `| Date | Change |`, 5 are 3-column `| Date | Change | Author |`). The 117 helper's hardcoded 3-column row is a **silent-misalignment bug waiting to trigger** if forked unmodified. See Artifact Class 2 Pattern A.
2. **Keyless-platform injection over a heterogeneous path shape** — 10 files (7 error-codes + `powershell-ref.md` + `registry-paths.md` + `apv1-vs-apv2.md`) need `platform: Windows` injected. The *detection* logic is identical to 117 (platform-key-absent → inject), but the *path allowlist* must accept two **bare single files** (`docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md`) in addition to two directories — 117's allowlist was directory-only. See Artifact Class 2 Pattern B.
3. **Per-table prose (D-118-1)** — a genuinely new hand-authoring requirement not present in 116 or 117 at all: every capability-matrix/comparison table (45 tables across 8 files) needs a one-line lead-in before + a `> **Table summary:**` blockquote within 5 lines after. `docs/_templates/reference-template.md` already documents the worked example (authored Phase 114, anticipating this phase). See Artifact Class 3 Pattern C.

---

## Pattern Assignments

### Artifact Class 1: Retrofitted Reference Doc Shape

**Primary analog:** `docs/_templates/reference-template.md` (60 lines, read in full — the only reference-class template; no per-platform variants exist unlike admin-setup's 4 templates)
**Secondary analog (already-retrofitted, Approved, EEE-conformant real file, cross-phase):** `docs/l1-runbooks/01-device-not-registered.md` (Phase 116 output) — proves the exact post-retrofit skeleton shape a C17-passing file takes.

#### Current (pre-retrofit) reference file shape — verified this session, two representative variants

**Variant A — nav-hub index, no gate blockquote, `platform: all` already present** (`docs/reference/00-index.md` lines 1-11):
```markdown
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: both
audience: all
platform: all
---

# Reference Documentation

Technical reference documents for Windows Autopilot and macOS ADE configuration...
```

**Variant B — content file with a pre-H1 gate blockquote, NO `platform:` key (one of the 10 keyless files)** (`docs/error-codes/00-index.md` lines 1-13):
```markdown
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
---

> **Framework coverage:** This index primarily covers Windows Autopilot (classic/APv1) error codes. APv2 (Device Preparation) failures are symptom-based rather than code-based -- see the APv2 Note at the bottom of this page.
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Error Code Index

This is the master lookup table...
```

Note `applies_to: both` here is NOT a platform key — the retrofit must not confuse it with `platform:`; the guard correctly checks for `^platform:` presence only (inherited unmodified from 117 Guard logic, see Artifact Class 2).

**Variant C — capability matrix, `platform:` present as a real D1 value** (`docs/reference/android-capability-matrix.md` lines 1-8):
```markdown
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: both
audience: admin
platform: Android
phase_46_wave2_retrofit: 2026-04-25
---

# Intune: Android Capability Matrix — Modes by Feature
```

**Variant D — comparison doc, no `platform:` key, has a pre-H1 gate blockquote** (`docs/apv1-vs-apv2.md` lines 1-9):
```markdown
---
last_verified: 2026-03-11
review_by: 2026-06-09
applies_to: both
audience: both
---

> **Version gate:** This guide applies to Windows Autopilot (classic). For Autopilot Device Preparation, see below.

# APv1 vs APv2: Which Autopilot Are You Troubleshooting?
```

#### Frontmatter key set pattern (`reference-template.md` lines 22-30)

```yaml
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Reference
platform: all
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
---
```

**Retrofit rule:** Inject `doc_id`, `status`, `owner`, `doc_type` at the top (new keys, identical order to 117). Retain `last_verified`/`review_by`/`applies_to`/`audience` verbatim. Inject `platform: Windows` ONLY for the 10 confirmed keyless files (7 error-codes + `powershell-ref.md` + `registry-paths.md` + `apv1-vs-apv2.md`); all other 24 files already carry a resolvable `platform:` key — leave as-is. Set:
- `doc_id:` from registry path join (`RE-index.md`, never hand-transcribe — C17 #9 unforgiving)
- `status: Approved` (all 34 — live retrofitted docs)
- `owner: Intune Admin Lead` (uniform, all 34, carries 117 D-04 — diverges deliberately from the template's `Reviewer:` comment role placeholder)
- `doc_type: Reference` (uniform — carries D-118-3/3A, registry-locked regardless of "Guide"-titled filenames)

#### EEE block line pattern (`reference-template.md` line 32)

```markdown
**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** RE-[NNN] · **Status:** Draft
```

**Concrete real retrofit targets** (from the per-file inventory):
```markdown
<!-- RE-142, docs/reference/00-index.md, platform: all -->
**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** RE-142 · **Status:** Approved

<!-- RE-144, docs/reference/android-capability-matrix.md, platform: Android -->
**Platform:** Android · **Doc Type:** Reference · **Doc ID:** RE-144 · **Status:** Approved

<!-- RE-168, docs/error-codes/00-index.md, platform injected -> Windows -->
**Platform:** Windows · **Doc Type:** Reference · **Doc ID:** RE-168 · **Status:** Approved
```

**Retrofit rule:** Field order fixed `Platform · Doc Type · Doc ID · Status`; `·` = U+00B7 middle-dot; `owner` NEVER appears in the block (Phase-114 D-01/D-05, C17 #7). D1 label comes from `D1_MAP[frontmatter_platform]` — copy `D1_MAP` verbatim from `c17-eee-contract.mjs:26-47` (identical map, zero new entries needed this phase — every raw value found in this corpus, `all/Windows/macOS/Android/Linux`, already resolves).

#### Body order pattern (skeleton, `reference-template.md` lines 32-59, cross-confirmed against `docs/l1-runbooks/01-device-not-registered.md`)

```
blank → block line → blank → H1 → blank → ## Summary → blank →
[FILL-IN ≥30-word Summary prose, reference-template lead] → blank →
relocated whole pre-H1 span (if present — gate blockquote(s), HTML comments, in original order) → blank →
rest of body (content sections, tables + D-118-1 prose where in scope) → ## Version History (prepend or create, see Artifact Class 2 Pattern A)
```

`## Summary` lead prescription (`reference-template.md` line 38):
```
[2–3 sentences ... Minimum 30 words. State what information this doc provides (e.g., capability
matrix, error-code lookup, endpoint list, platform comparison), which platforms or product
versions it covers, and who the primary audience is (L1 service desk, L2 engineers, Intune
admins, or end users).]
```

**Retrofit rule:** unlike 117 (4 platform-keyed Summary leads), this phase has **one** generic reference lead — no per-platform Summary-template branching exists for the reference class (confirmed: only one template file). Summarize existing content only — no new claims (reformat-only envelope, REQUIREMENTS.md:75-76).

---

### Artifact Class 2: Mechanical Retrofit Helper Script (`scripts/pipeline/retrofit-reference.mjs`, NEW — forked from `retrofit-guide.mjs`)

**Primary analog:** `scripts/pipeline/retrofit-guide.mjs` (Phase 117, 664 lines, read in full) — reuse ~85% verbatim (D1_MAP, `padLabel`/`readFile`/`walkMd`/`relNormalize`, `buildDocIdMap`, frontmatter regex, TEMPLATE-SENTINEL guard, doc-id-unresolved guard, platform-injection + D1_MAP guard, whole-pre-H1-span relocation, self-test CLI shape, main runner).
**Secondary analog:** `scripts/validation/c17-eee-contract.mjs` (the live gate; #10/#11/#12 logic mirrored as measurement tooling exactly as 117 did).

#### What to reuse verbatim from `retrofit-guide.mjs`

| Element | Source lines | Change needed |
|---|---|---|
| Shebang + node-builtins-only import block | `retrofit-guide.mjs:1-45` | None — copy verbatim |
| `D1_MAP` constant | `retrofit-guide.mjs:58-79` | None — copy verbatim, NEVER diverge |
| `padLabel`, `readFile` (CRLF normalize), `walkMd`, `relNormalize` | `retrofit-guide.mjs:112-153` | None — copy verbatim |
| `buildDocIdMap` (registry join on Path column) | `retrofit-guide.mjs:162-172` | None — copy verbatim |
| Frontmatter parse regex `/^---\n([\s\S]*?)\n---/m` | `retrofit-guide.mjs:258` | None — copy verbatim |
| TEMPLATE-SENTINEL guard | `retrofit-guide.mjs:264-269` | None — copy verbatim (none of the 34 enrolled files currently carry the sentinel — verified this session) |
| Doc-ID-unresolved guard | `retrofit-guide.mjs:271-275` | None — copy verbatim |
| Platform-detection + injection + D1_MAP guard | `retrofit-guide.mjs:277-289` | None — copy verbatim; the detection logic (`/^platform:\s*.../m` presence-only test) is ALREADY correct for this corpus's `applies_to: both/APv1/APv2` decoys — it never matches on `applies_to` |
| Whole-pre-H1-span relocation | `retrofit-guide.mjs:328-398` | None — copy verbatim; this corpus is structurally SIMPLER than 117's (at most 1 blockquote group, 0 HTML comments per file, confirmed this session) but the general (non-conditional) implementation still applies unchanged |
| Self-test harness shape (6 sub-tests incl. the span-fix proof) | `retrofit-guide.mjs:421-578` | Adapt fixture paths/platform values to reference corpus; ADD a 7th sub-test for VH column detection (see Pattern A below) |
| Main runner (`--dry-run`, `--all`, PASS/ERROR/WRITTEN, exit codes) | `retrofit-guide.mjs:582-664` | Change `--all` target enumeration to merge dir-walks + 2 explicit single-file paths (see Pattern B below) |

#### What MUST change — Pattern A: Version-History column-shape detection (the load-bearing NEW fix)

`retrofit-guide.mjs`'s `insertVersionHistoryRow` (lines 182-220) hardcodes a 3-column row and only implements the CREATE branch meaningfully (117's corpus never exercised PREPEND). This phase has **13 pre-existing sections in two incompatible shapes** — reusing the hardcoded row would misalign 8 of them.

**Confirmed existing shapes (this session), the two concrete real-file exhibits:**

2-column (`docs/error-codes/00-index.md` lines 71-76, already read in full above):
```markdown
## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Updated frontmatter and version gate for dual-framework coverage |
| 2026-03-14 | Initial creation — 23 hex codes and 6 event IDs indexed across 5 category files |
```

3-column (`docs/reference/android-capability-matrix.md` tail):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-30 | Phase 58 D-14: ... | -- |
| 2026-04-25 | Phase 45 AEAOSPFULL-09: ... | -- |
| 2026-04-24 | Initial version ... | -- |
```

**Required new logic (replaces the fixed-format prepend branch of `insertVersionHistoryRow`):**

```javascript
// NEW for retrofit-reference.mjs: detect column count of the EXISTING header row
// before constructing the new row. Never assume 3-column (117's corpus never had
// a pre-existing 2-column table to discover this bug).
function detectVhColumnCount(lines, vhIdx) {
  for (let i = vhIdx + 1; i < Math.min(vhIdx + 5, lines.length); i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && !/^\|[-: |]+\|$/.test(line)) {
      // header row: count pipe-delimited cells (exclude the leading/trailing empty split)
      return line.split('|').filter((c, idx, arr) => idx > 0 && idx < arr.length - 1).length;
    }
  }
  return null; // section truly absent -- CREATE branch
}

const NEW_ROW_2COL = '| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed |';
const NEW_ROW_3COL = '| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed | — |';

// In insertVersionHistoryRow's PREPEND branch: choose the row matching the
// detected column count instead of always using NEW_ROW_3COL.
const colCount = detectVhColumnCount(newLines, vhIdx);
const newRow = colCount === 2 ? NEW_ROW_2COL : NEW_ROW_3COL; // 3-col is the safe default
                                                              // for the CREATE branch (21 files) —
                                                              // matches 116/117 corpus-wide precedent
                                                              // (Research Open Question 1 recommendation)
```

**Which files exercise which branch (from the RESEARCH.md per-file inventory):**

| Branch | Files | Column shape |
|---|---|---|
| PREPEND | `docs/reference/00-index.md`, all 7 `docs/error-codes/*.md` | 2-column (8 files) |
| PREPEND | `docs/reference/{4-platform-capability-comparison,android/aosp-oem/ios/linux-capability-matrix}.md` | 3-column (5 files) |
| CREATE | remaining 21 files (`macos-capability-matrix.md` included — it has 8 content tables but NO pre-existing VH section) | 3-column (new, per Open Question 1 recommendation) |

**Self-test addition (7th sub-test, beyond the 6 inherited from 117):** synthetic fixture with an existing 2-column `## Version History` table asserts the inserted row has exactly 2 cells (not 3) — the direct regression proof for this phase's signature defect class.

#### What MUST change — Pattern B: Path allowlist (directories + 2 bare single files)

`retrofit-guide.mjs`'s allowlist (`ADMIN_SETUP_DIRS`, lines 86-94) is directory-only. This phase's scope includes **two standalone top-level files** (`docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md`) that are not under any enrolled directory — `rel.startsWith(dir)` alone will never match them.

```javascript
// retrofit-guide.mjs's existing guard shape (analog to fork FROM, lines 238-242):
const inAllowlist = ADMIN_SETUP_DIRS.some(d => rel.startsWith(d));
if (!inAllowlist) {
  return { ok: false, rel, error: 'PATH-ALLOWLIST: path not in any docs/admin-setup-*/ dir' };
}

// Fork for retrofit-reference.mjs -- directories AND explicit single files:
const REFERENCE_DIRS = ['docs/reference/', 'docs/error-codes/'];
const REFERENCE_SINGLE_FILES = new Set(['docs/apv1-vs-apv2.md', 'docs/windows-vs-macos.md']);
const MERMAID_DEFERRED_PATHS = new Set(['docs/reference/ca-enrollment-timing.md']); // 1 file, not 9

const inAllowlist = REFERENCE_DIRS.some(d => rel.startsWith(d)) || REFERENCE_SINGLE_FILES.has(rel);
if (!inAllowlist) {
  return { ok: false, rel, error: 'PATH-ALLOWLIST: path not in docs/reference/, docs/error-codes/, or the 2 enrolled comparison docs' };
}
if (MERMAID_DEFERRED_PATHS.has(rel)) {
  return { ok: false, rel, error: 'MERMAID-DEFERRED: ca-enrollment-timing.md is the D-05 carve-out -- deferred to v1.16, refusing to process' };
}
```

`--all` enumeration must merge `REFERENCE_DIRS.flatMap(walkMd)` with the 2 explicit `REFERENCE_SINGLE_FILES` absolute paths (walkMd only takes directories — 117's `ADMIN_SETUP_DIRS.flatMap(d => walkMd(d))` pattern at `retrofit-guide.mjs:593` needs this union, not a direct copy).

#### Other required literal changes (mechanical, same shape as 117's fork-from-116 deltas)

| Element | 117 value | 118 value |
|---|---|---|
| `doc_type` literal (frontmatter assembly + block line) | `'Guide'` | `'Reference'` |
| `owner` constant | `'Intune Admin Lead'` | `'Intune Admin Lead'` (unchanged — D-04 carries) |
| `[FILL-IN]` Summary placeholder banner | `per-platform-template (PLATFORM) Summary lead` | `reference-template Summary lead` (no per-platform branching — only 1 template exists) |

---

### Artifact Class 3: Registry Status Flip + Per-Table Prose + #12/#11 Completion Measurement

**Primary analog:** Phase 116/117's `RE-index.md` Status column edit pattern + `c17-eee-contract.mjs:341-405` (#11/#12 exact logic, reused as pre/post measurement tooling).
**Pattern C analog (per-table prose, NEW this phase — no 116/117 precedent exists):** `docs/_templates/reference-template.md` lines 44-55 (the only worked example of this pattern in the codebase).

#### Registry row shape to flip (verbatim, `docs/_registry/RE-index.md`)

```markdown
| RE-142 | docs/reference/00-index.md | Reference Documentation | Reference | Pending |
| RE-168 | docs/error-codes/00-index.md | Error Code Index | Reference | Pending |
| RE-177 | docs/apv1-vs-apv2.md | APv1 vs APv2: Which Autopilot Are You Troubleshooting? | Reference | Pending |
| RE-178 | docs/windows-vs-macos.md | Windows Autopilot vs macOS ADE: Concept Comparison | Reference | Pending |
```

**Retrofit rule:** Flip `Pending → Approved` for all 34 enrolled rows (`RE-142..RE-167` skip `RE-147`; `RE-168..RE-174`; `RE-177`; `RE-178`) after that batch's files pass C17 exit 0. Leave `RE-147` (`ca-enrollment-timing.md`) `Pending` — do NOT touch. Manual table edit, exactly as 116/117 — the retrofit script does not touch the registry.

#### Pattern C: Per-table prose (D-118-1) — the genuinely new artifact class

**Source (`docs/_templates/reference-template.md` lines 44-55, verbatim):**
```markdown
### Tables exceeding 25 rows — prose summary required

If any table in this document exceeds 25 rows, add a `> **Table summary:**` blockquote within
5 lines of the closing table delimiter. This is enforced by C17 assertion #11 at Phase 118.

Example:

| [Column A] | [Column B] | [Column C] |
|------------|------------|------------|
| [value]    | [value]    | [value]    |

> **Table summary:** [1–2 sentence prose summary — REQUIRED if the table exceeds 25 rows. Describe what the table shows and call out the most operationally important entries. Omit this blockquote for tables with 25 or fewer rows.]
```

**Retrofit rule (D-118-1, applies per-table, not per-file):** The template only shows the AFTER half (a trailing `> **Table summary:**` blockquote). D-118-1 additionally requires a **one-line lead-in BEFORE** each table (not in the template — hand-author per CONTEXT.md's "before (one-line lead-in) and after (trailing summary within 5 lines)"). Both restate the table's existing scope — no new claims. Apply to the 45 tables in the 8 in-scope files only (5 named capability matrices + `4-platform-capability-comparison.md` + `aosp-oem-matrix.md` + `apv1-vs-apv2.md` + `windows-vs-macos.md`) — NOT to ordinary lookup tables (SKU lists, endpoint tables, error-code tables). See RESEARCH.md Common Pitfalls 2 for the exact in/out-of-scope boundary; this is the single highest-risk over-application mistake in this phase.

**Note the C17 #11 gate itself is a no-op** (`c17-eee-contract.mjs:341-380`, `dataRows > 25` header-inclusive) — the only qualifying table (`error-codes/00-index.md`, 30 rows) is already compliant via its existing L69 prose ("Select a category above or use Ctrl+F...") within the 5-line window after the table. D-118-1's prose is authored for chunk-survival (PIPE-02), not gate compliance — do not gate the per-table-prose batches on #11 output; #11 will already read 0 violations before and after.

#### #11 measurement logic — reuse verbatim (`c17-eee-contract.mjs:344-380`)

```javascript
const isSeparator = (line) => /^\|[-: |]+\|$/.test(line);
// ... counts header-inclusive data rows per table, scans 5 lines after for non-|/#/>/```
// prose line. Use this exact logic as the pre/post measurement tool, never a divergent
// ad-hoc scanner (a divergent scanner could mis-flag error-codes/00-index.md as needing
// new authoring when it is already compliant).
```

#### #12 measurement logic — reuse verbatim (`c17-eee-contract.mjs:383-405`, identical to 117-PATTERNS.md Artifact Class 3)

```javascript
if (!isTemplate) {
  let i = 0;
  while (i < bodyLines.length) {
    if (!inCodeFence[i] && /^>/.test(bodyLines[i])) {
      const bqLines = [];
      while (i < bodyLines.length && !inCodeFence[i] && /^>/.test(bodyLines[i])) {
        bqLines.push(bodyLines[i].replace(/^>\s?/, ''));
        i++;
      }
      const bqText = bqLines.join(' ');
      if (bqText.length > 200) {
        violations.push({ assertion: 12, detail: `Blockquote exceeds 200 chars (${bqText.length} chars)` });
      }
    } else {
      i++;
    }
  }
}
```

**Key invariant unique to this phase:** `docs/error-codes/00-index.md` has **two** independent over-limit groups (L8 "Framework coverage" pre-H1, 287c; L65 "APv2 Note" post-H1, 284c) — both need word-preserving splits (D-GC-01). #12 scans every top-level blockquote group regardless of position, not just the pre-H1 gate.

#### C17 enrollment scan — same mechanism as 116/117 (`c17-eee-contract.mjs`, enrollment by `doc_id:` key presence)

**Implication:** enrollment is opt-in — batches are independently mergeable, and `ca-enrollment-timing.md` stays invisible to C17 by staying keyless (D-05). Author the two-part per-phase SC per batch, exactly as 115 D-02 / 116/117 precedent:

```
SC-[batch]-ENROLL: All [N] files in this batch carry doc_id, status, owner, doc_type keys
SC-[batch]-C17:    node scripts/validation/c17-eee-contract.mjs exits 0 with zero violations
                   for all [N] files in this batch
```

---

## Shared Patterns

### Platform Injection Guard (10 files, heterogeneous path shape — the phase's mandatory rider)

**Source:** CONTEXT.md D-118-4 mandatory rider / RESEARCH.md D1-map verification
**Apply to:** `docs/error-codes/{00-index,01-05,06}.md` (7) + `docs/reference/{powershell-ref,registry-paths}.md` (2) + `docs/apv1-vs-apv2.md` (1) = 10 files needing `platform: Windows` injection

```bash
grep -rL "^platform:" docs/reference/*.md docs/error-codes/*.md docs/apv1-vs-apv2.md docs/windows-vs-macos.md
```
(confirms `windows-vs-macos.md` and `reference/00-index.md` already carry `platform: all` — leave both untouched.)

### Whole-Pre-H1-Span Relocation (all 34 files — carries 117's fix, simpler corpus)

**Source:** RESEARCH.md Architecture Pattern 1 (this phase independently re-confirmed: at most ONE blockquote group, ZERO HTML comments, in every file's pre-H1 span — simpler than 117's corpus, which had genuine 2-blockquote and HTML-comment cases)
**Apply to:** All 34 enrolled files, implemented generally (never conditionally) — copy `retrofit-guide.mjs:328-398` verbatim, no logic change needed, only the corpus happens not to exercise the multi-element branch this time.

### #12 Word-Preserving Blockquote Split Rule (61 groups across 27/34 files — D-GC-01 carries)

**Source:** CONTEXT.md D-GC-01 rider / RESEARCH.md Common Pitfalls 3+4
**Apply to:** every over-limit group in 27 of the 34 enrolled files (61 groups total; `docs/error-codes/00-index.md` needs a MANDATORY double-split — 2 separate groups, not 1)

Two allowed transforms, identical vocabulary to 116/117 D-GC-01: **Transform A** (sentence-boundary split, truly-empty blank line required — bare `>` does not split a group) and **Transform B** (de-blockquote a structured callout with embedded code, converting `> \`\`\`powershell` into a real top-level fence that IS masked by `inCodeFence`). Forbidden: trimming, rewording, removing words or links.

### D1_MAP Exact Match Requirement (all 34 files)

**Source:** `c17-eee-contract.mjs:26-47` / C17 assertion #9/#10
**Apply to:** All files — block line Platform field must equal `D1_MAP[frontmatter_platform]` exactly. Clean coverage confirmed this session: `all, Windows, macOS, Android, Linux` — no unmapped value exists anywhere in the corpus; zero new D1_MAP entries needed.

### Template-Sentinel False-Pass Guard

**Source:** `c17-eee-contract.mjs:135-137` (referenced) / RESEARCH.md Anti-Patterns
**Apply to:** All retrofitted files — copy the `retrofit-guide.mjs:264-269` guard verbatim. None of the 34 enrolled files currently carry `last_verified: 1970-01-01` (verified this session).

### Registry Status Update (Pending → Approved)

**Source:** Phase 116/117 precedent / `docs/_registry/RE-index.md`
**Apply to:** Each of the 34 files as its batch passes C17; `RE-147` stays `Pending`. Manual table edit per batch — the retrofit script does not touch the registry.

---

## No Analog Found

None — all three artifact classes have strong, directly-reusable analogs already in the codebase (the reference template + the 117 helper script as fork base + the 116/117 registry-edit precedent + a real already-Approved cross-phase retrofitted file to prove the target shape). The two genuinely NEW pieces (VH column-shape detection, per-table prose) have no prior-phase code analog but DO have a documented worked example already checked in (`reference-template.md` lines 44-55, authored Phase 114 in anticipation of this exact phase) — so even the "new" pieces are template-grounded, not invented from scratch.

---

## Metadata

**Analog search scope:** `docs/_templates/reference-template.md`, `scripts/pipeline/retrofit-guide.mjs`, `scripts/validation/c17-eee-contract.mjs`, `docs/_registry/RE-index.md`, `docs/l1-runbooks/01-device-not-registered.md` (cross-phase proven-passing shape), `docs/reference/{00-index,android-capability-matrix}.md`, `docs/error-codes/00-index.md`, `docs/apv1-vs-apv2.md`, `docs/reference/powershell-ref.md` (raw pre-retrofit corpus, 5 representative files read)
**Files scanned:** 9 (1 template, retrofit-guide.mjs, c17-eee-contract.mjs, RE-index.md, l1-runbooks/01-device-not-registered.md, plus 5 raw reference-class corpus files spanning all 4 pre-retrofit shape variants)
**Pattern extraction date:** 2026-07-06
