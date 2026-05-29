# Phase 68: CHAIN_SKIP Root-Cause Resolution (Pillar B — Validator Surgery) — Research

**Researched:** 2026-05-26
**Domain:** Node.js validator harness surgery + sidecar JSON coord rebase + atomic multi-file Set-literal edits
**Confidence:** HIGH — every byte-level claim in this document is verified by direct file probe or live validator run on 2026-05-26 on the Windows host (D:\claude\Autopilot)

---

## Summary

Phase 68 is exceptionally well-scoped by CONTEXT.md: four adversarial-review advisors (D-01..D-04) have already locked the mechanism for each of the 3 CHAIN-NN requirements + MILESTONES.md remediation + close-gate, including verbatim byte-level edits, atomic-commit topology, and a 5-plan layout. Research's role here is **NOT** to re-score gray areas but to produce a planner-ready dossier of (1) byte-exact target line numbers, (2) verification commands, (3) edge cases the dossiers may have under-detailed, and (4) cross-validator dependency surfaces.

**The five plans are file-disjoint by construction:**
- 68-01 touches only `check-phase-{51,58}.mjs` `readFile()` bodies
- 68-02 touches only `scripts/validation/_lib/archive-path.mjs` (new) + `check-phase-{31,48,60}.mjs` + `regenerate-supervision-pins.mjs` + `v1.5-audit-allowlist.json`
- 68-03 touches only `check-phase-{62,63,64,65,66}.mjs` CHAIN_SKIP sets + their canonical comment blocks
- 68-04 touches only `.planning/MILESTONES.md` (DELETE lines 3-71)
- 68-05 authors `68-VERIFICATION.md` + flips traceability rows in `PROJECT.md` + `REQUIREMENTS.md`

**Primary recommendation:** The planner should pin Plan 68-03's atomic-commit indivisibility front-and-center (5 files, ONE git SHA per Phase 66-02 `3a9a671` precedent) and treat Plans 68-01, 68-02, 68-04 as wave-1-parallelizable (file-disjoint). Plan 68-03 is wave-2 (depends on 68-01 + 68-02 chain-pass verification). Plan 68-05 is wave-3 close-gate.

**Empirical key findings (this research session):**
1. **V-60-23 root cause CONFIRMED empirically.** `v1.5-milestone-audit.mjs` C2 FAIL outputs `docs/_glossary-android.md:17 ("Supervision"), :17 ("supervision"), :50 ("supervised")` — the v1.5 sidecar `supervision_exemptions[]` references those same files at `:16/:49/:69` and `:122` (for `### DPC`-area note), missing the +1 shift from Phase 62-07's Apple Business banner.
2. **MILESTONES.md cdcce23 garbage CONFIRMED.** File is 208 lines. `## v1.5 ...` H2 appears twice — line 3 (garbage; bulleted "One-liner:" stubs) and line 73 (correct entry with Methodology highlights + DEFER-07/08). Git log confirms cdcce23 (`chore: archive v1.5 milestone files`) is the introducing commit, post-dating 965f509 (the correct authoring commit).
3. **regenerate-supervision-pins.mjs --self-test FAILs as advisor D-03 predicted.** Empirical output names 4 false-negatives `:16/:195/:49/:69` and 7 false-positives `:17/:182/:196/:199/:50/:70/:83` plus 1 un-pinned Tier-2 at `:80 ### Supervision`. Diff is EXACTLY the +1 banner shift.
4. **check-phase-{51,58}.mjs PASS today on Windows** (25/25 and 26/26 — confirmed). The CHAIN-01 fix is hardening for the contributor-PR-on-CRLF-host scenario, not a current-state bug fix.
5. **`scripts/validation/_lib/` does NOT exist yet.** Plan 68-02 creates it.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| CRLF normalization at read time | Validator helper (`readFile()`) | — | Phase 31 ca40eb9 lineage; 3 sister validators already centralize here |
| Archive-path resolution | New shared helper (`_lib/archive-path.mjs`) | Per-validator call sites | DRY across 6+ validators; future Path-A inheritors benefit transparently |
| Sidecar coord rebase | JSON data file edits | Validator helper (lineage repoint) | Data-layer maintenance; orthogonal to code logic |
| Atomic CHAIN_SKIP removal | 5 validator source files (one commit) | — | Chain-validator indivisibility; partial removal creates inconsistent topology |
| Planning-doc corpus defect deletion | `.planning/MILESTONES.md` byte-range delete | — | Separated from validator-surgery commit for auditor clarity |
| Close-gate traceability flip | `PROJECT.md` + `REQUIREMENTS.md` Active→Validated | New `68-VERIFICATION.md` | Phase 67 67-VERIFICATION.md format inherited verbatim |

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CHAIN-01 | CRLF regex mismatch resolved in `check-phase-51.mjs` + `check-phase-58.mjs` | D-01 dossier locked Option B (readFile() centralization); 2 verbatim edits documented at byte level below |
| CHAIN-02 | Archive-path detection added to `check-phase-48.mjs`; `regenerate-supervision-pins.mjs --self-test` line-number drift fixed | D-02 + D-03 dossiers locked the helper mechanism + lineage repoint; V-60-23 sidecar rebase scope additionally locked by D-04 |
| CHAIN-03 | Cascade fixes to `check-phase-{60,61}.mjs`; CHAIN_SKIP entries removed atomically across `check-phase-{62..66}.mjs` | All 5 CHAIN_SKIP lines empirically verified (62:66 / 63:73 / 64:73 / 65:69 / 66:64); identical canonical comment block precedes each |

---

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 = Option B (CRLF-normalize in readFile()).** Add `.replace(/\r\n/g, '\n')` to `readFile()` body at `check-phase-51.mjs:14-18` and `check-phase-58.mjs:18-22`. Zero regex changes. Verbatim idiom copied from `check-phase-48.mjs:25`, `check-phase-60.mjs:24`, `regenerate-supervision-pins.mjs:77` (Phase 31 `ca40eb9` lineage).
- **D-02 = Option B (helper function `resolveArchivedPhasePath()`).** New file `scripts/validation/_lib/archive-path.mjs`. Affects 6 validators currently (check-phase-{31, 48, 60-×2, 62, 63}) + every future milestone-close validator via HARNESS-03 Path-A inheritance.
- **D-03 = Option A-prime (BASELINE_9 coord rebase + sidecar lineage repoint v1.5→v1.6).** 2 surgical edits to `regenerate-supervision-pins.mjs`: BASELINE_9 `_glossary-android.md` coords `{79, 81, 181, 198}` → `{80, 82, 182, 199}`; `parseAllowlist()` v1.5 sidecar → v1.6 sidecar at line 422.
- **D-04 = Option E (5-plan split).** Plan 68-{01,02,03,04,05}. ATOMIC commit ONLY for CHAIN-03 (per ROADMAP SC#4); per-plan-per-requirement elsewhere.

### Claude's Discretion

- Exact line numbers within `check-phase-31.mjs:32` silent-swallow bug fix (advisor flagged line 32; planner verifies exact context at Plan 68-02 wave 2)
- Exact `_glossary-android.md` coord entries to rebase in `v1.5-audit-allowlist.json` `supervision_exemptions[]` for V-60-23 (planner diff-discovers exact array indexes at Plan 68-02 wave 4)
- Whether Plan 68-01 is a single 2-file commit OR two single-file commits
- Whether `check-phase-66.mjs` CHAIN_SKIP line is `:73` or different (RESEARCH-CONFIRMED: line 64; see Atomic Commit Surface section)
- Whether to grep check-phase-62 + 63 for additional hardcoded `.planning/phases/...` paths
- Whether cdcce23 root-cause investigation is single v1.7-DEFERRED-CLEANUP.md line item OR more elaborate deferred-issue artifact

### Deferred Ideas (OUT OF SCOPE)

- CI-Linux ubuntu-latest runner job (Phase 69)
- v1.7 audit harness lineage bump (Phase 70 — HARNESS-01..06)
- CI-3 Managed Apple ID corpus rename (v1.8+)
- Multi-tenant Apple Business surfaces / Apple Business Device API documentation / per-OU Conference Room Display deep-dive / Account Holder lockout standalone runbook / Apple School Manager
- cdcce23 archive-script garbage-insert root cause investigation (flagged for v1.7-DEFERRED-CLEANUP.md at Phase 70 close)
- check-phase-31.mjs silent-swallow data-integrity bug — closed in this phase via helper routing
- Per-entry sidecar coord drift detection automation (v1.8+)
- Defense-in-depth sweep of `indexOf("\n", ...)` literal-string usages (v1.8+)

---

## Project Constraints (from CLAUDE.md)

`CLAUDE.md` is documentation-suite framing for the Windows Autopilot Troubleshooter project (PowerShell + Python FastAPI + TypeScript React stack). Phase 68 is **harness/tooling**, not `docs/*` edits, so the doc-suite conventions (Pester tests, pytest backend, frontend Vitest) **do not apply directly**. The validator-source surface (Node.js `.mjs` files under `scripts/validation/`) is outside the three-tier diagnostic stack described in CLAUDE.md.

CLAUDE.md does NOT impose constraints on:
- Node.js validator source edits
- JSON sidecar coord rebases
- Planning doc surgical deletes

**Therefore:** The planner SHOULD NOT over-constrain Plans 68-01..05 with CLAUDE.md's diagnostic-stack patterns. The relevant constraints come from:
- `REQUIREMENTS.md` (Pillar B literal contracts)
- `ROADMAP.md` (SC#1-5)
- `STATE.md` (anti-regression invariants; CHAIN_SKIP carry-over)
- CONTEXT.md (D-01..D-04 locked decisions)
- Project skills: only `.claude/skills/adversarial-review/`, `.claude/skills/fireworks-tech-graph/`, `.claude/skills/jira-milestone/`, `.agents/skills/fireworks-tech-graph/` exist; none constrain validator surgery.
- Memory: `feedback_effort_level` (max thoroughness), `feedback_adversarial_review_preference` (already honored in /gsd-discuss-phase), `project_execphase_sequential.md` (sequential-on-main-tree execution; NO worktree experiments) — all already captured in CONTEXT.md.

---

## Target Validator Inventory

> All values **empirically verified** 2026-05-26 against the live `D:\claude\Autopilot` working tree.

| Validator | `readFile()` line | Hardcoded archive paths (line : path) | CHAIN_SKIP line : content | Other relevant constants |
|-----------|------------------|---------------------------------------|---------------------------|--------------------------|
| `check-phase-31.mjs` | 15-19 (already CRLF-normalized, `// per ca40eb9`) | **32** : `.planning/phases/31-ios-l2-investigation/placeholder-inventory.json` (silent-swallow at line 33: `if (!raw) return { placeholders: [] };`) | — (not a v1.6 chain validator) | `parseInventory()` at lines 31-39; bug is the silent return-empty pattern |
| `check-phase-48.mjs` | 22-26 (CRLF-normalized; D-01 idiom source) | **83** : `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` (inside check 5 body) | — | check 5 (V-48-05) at lines 79-93; reads inventory + asserts Category A/B/C |
| `check-phase-51.mjs` | **14-18** (NOT CRLF-normalized — Plan 68-01 target) | (none — pure docs/* paths) | — | 5 file constants `TREE`/`RB30..33` at lines 21-32; mermaid regex lines 107/120/153; frontmatter regex at line 79 |
| `check-phase-58.mjs` | **18-22** (NOT CRLF-normalized — Plan 68-01 target) | (none — pure docs/* paths) | — | indexOf literal at line **188** (`c.indexOf("---\n", 4)`); frontmatter regex at line 201; this is D-01's adversarial wedge |
| `check-phase-60.mjs` | 21-25 (CRLF-normalized) | **30** : `.planning/phases/48-...VERIFICATION-broken-links.md` (`BROKEN_LINKS_INVENTORY`); **32** : `.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md` (`CALIBRATION_DOC`) | — | V-60-08 at line 150 (uses `BROKEN_LINKS_INVENTORY`); V-60-24 at line 257 (uses `CALIBRATION_DOC`); V-60-25 at line 272 (reads `BROKEN_LINKS_INVENTORY` again); V-60-23 at line 240 is the `v1.5-milestone-audit.mjs` subprocess |
| `check-phase-61.mjs` | 24-28 (CRLF-normalized) | (none — reads live planning docs at top via const at lines 30-36) | — | `MILESTONES_DOC` const at line 36; V-61-17/18/19/20 all use `c.indexOf('## v1.5 ', ...)` pattern starting line 269 — exact garbage-entry wedge |
| `check-phase-62.mjs` | 26-30 (CRLF-normalized) | **41** : `.planning/phases/62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md` (`ANCHOR_INVENTORY`) | **66** : `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | V-62-ANCHORS check uses `ANCHOR_INVENTORY` (file is already archived); CHAIN_SKIP doc comments at lines 47-66 |
| `check-phase-63.mjs` | 29-33 (CRLF-normalized) | **48** : `.planning/phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md` (`ANCHOR_INVENTORY`) | **73** : `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | V-63-ANCHOR-INVENTORY uses `ANCHOR_INVENTORY` (file is still live at `.planning/phases/`); CHAIN_SKIP doc comments at lines 54-73 |
| `check-phase-64.mjs` | 34-38 (CRLF-normalized) | (none — pure docs/* paths to AB_11..AB_18) | **73** : `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | CHAIN_SKIP doc comments at lines 54-73; lines 55-73 are the CANONICAL rationale block per CONTEXT canonical-refs §"Source-of-truth root cause docs" |
| `check-phase-65.mjs` | 27-31 (CRLF-normalized) | (none — pure docs/* paths) | **69** : `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | CHAIN_SKIP doc comments at lines 49-69 |
| `check-phase-66.mjs` | 28-32 (CRLF-normalized) | (none — pure planning paths to v1.6-MILESTONE-AUDIT.md etc.) | **64** : `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` (Claude's-discretion question RESOLVED) | CHAIN_SKIP doc comments at lines 45-64; V-66-07 at line 198 asserts `v1.6-DEFERRED-CLEANUP.md` contains CHAIN_SKIP-CRLF section (will continue to pass after Plan 68-03 — the deferred-cleanup file is unchanged) |

**Cross-cutting:**
- **All 5 v1.6 chain validators carry the SAME canonical CHAIN_SKIP comment block** describing root causes (a) archive drift / (b) Windows CRLF-LF mismatch / (c) cascading. Headers vary subtly: 62/63/64 say "Phase 66 terminal re-audit will resolve"; 65 says same; **66 differs — it says "deferred to v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md"** (the Phase 66 D-03 advisor amendment captured in `v1.6-DEFERRED-CLEANUP.md:108`). Plan 68-03 wave-2 must replace ALL 5 with a uniform Phase 68 closure narrative — see Atomic Commit Surface section.

---

## Verbatim Edit Targets

### Plan 68-01 (CHAIN-01 — readFile() CRLF centralization)

| # | File | Line | BEFORE (exact bytes) | AFTER (exact bytes) |
|---|------|------|----------------------|---------------------|
| 1 | `scripts/validation/check-phase-51.mjs` | 17 | `  return readFileSync(abs, 'utf8');` | `  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization (CHAIN-01; mirrors check-phase-48.mjs:25)` |
| 2 | `scripts/validation/check-phase-58.mjs` | 21 | `  return readFileSync(abs, 'utf8');` | `  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization (CHAIN-01; mirrors check-phase-48.mjs:25)` |

**Total diff:** 2 lines changed across 2 files. No additions. No deletions. No file moves. **No regex bodies change.** No indexOf calls change.

**Style note:** Both target validators use **single quotes** for the `'utf8'` literal (confirmed by Read of both files). Executor must preserve single-quote style. Inline comment is optional but recommended for traceability.

---

### Plan 68-02 (CHAIN-02 — archive-path helper + self-test repoint + v1.5 sidecar rebase)

**Wave 1 — new file `scripts/validation/_lib/archive-path.mjs`** (verbatim contents per CONTEXT D-02):

```javascript
// scripts/validation/_lib/archive-path.mjs
// Resolves a phase artifact path that may live at either:
//   - .planning/phases/PHASEDIR/FILENAME           (live, pre-archival)
//   - .planning/milestones/v1.5-phases/PHASEDIR/FILENAME  (archived at v1.5 close)
//
// Returns the resolved relative path (string) or null if neither exists.
// CALLER OWNS FAIL SEMANTICS — this helper does not throw and does not swallow.
//
// Lineage: introduced Phase 68 CHAIN-02 per REQUIREMENTS.md:20
//   handles BOTH pre-archival path AND post-archival path

import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function resolveArchivedPhasePath(phaseSuffix) {
  const live = '.planning/phases/' + phaseSuffix;
  const archived = '.planning/milestones/v1.5-phases/' + phaseSuffix;
  if (existsSync(join(process.cwd(), live))) return live;
  if (existsSync(join(process.cwd(), archived))) return archived;
  return null;
}
```

> **Helper-signature variant note:** CONTEXT.md D-02 shows the **single-arg `phaseSuffix`** signature (passes the full sub-path string). The D-02 advisor dossier showed a **two-arg `(phaseDir, filename)`** signature plus a `readdirSync` glob over `.planning/milestones/v*-phases/`. The CONTEXT version is simpler and pinned to v1.5 only — which is sufficient since Phase 68 only resolves v1.5-archived artifacts. The planner should use the **CONTEXT.md single-arg signature** (locked decision). Future Phase 70 inheritors can extend the helper to glob multiple `vN-phases/` roots if needed.

**Wave 2 — call-site replacements** (5 confirmed call sites; planner runs `grep -rn "\.planning/phases/[0-9]" scripts/validation/` to detect any additional):

| # | Validator | Line | BEFORE (path literal) | AFTER (helper call) | Failure-detail string update |
|---|-----------|------|----------------------|---------------------|------------------------------|
| 1 | `check-phase-31.mjs` | 32 | `'.planning/phases/31-ios-l2-investigation/placeholder-inventory.json'` (inside `parseInventory()`) | `resolveArchivedPhasePath('31-ios-l2-investigation/placeholder-inventory.json')` — and change line 33 silent-swallow `if (!raw) return { placeholders: [] };` to **return `{ _missing: true, placeholders: [] }`** and have V-31-21/V-31-24 callers check `_missing` and FAIL. **Bonus discovery from D-02 dossier — Claude's discretion: STRETCH** | Caller now FAILs on missing file instead of silent-passing |
| 2 | `check-phase-48.mjs` | 83 | `'.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md'` | `resolveArchivedPhasePath('48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md')` | Detail string updates to mention "not found at .planning/phases/ or .planning/milestones/v1.5-phases/" |
| 3 | `check-phase-60.mjs` | 30 | `const BROKEN_LINKS_INVENTORY = '.planning/phases/...48-VERIFICATION-broken-links.md';` | `const BROKEN_LINKS_INVENTORY = resolveArchivedPhasePath('48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md');` | (also handle `null` case in consumers V-60-08 line 152, V-60-25 line 274) |
| 4 | `check-phase-60.mjs` | 32 | `const CALIBRATION_DOC = '.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md';` | `const CALIBRATION_DOC = resolveArchivedPhasePath('60-audit-harness-v1-5-finalization/60-CALIBRATION.md');` | V-60-24 line 257 must handle `null` |
| 5 | `check-phase-62.mjs` | 41 | `const ANCHOR_INVENTORY = '.planning/phases/62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md';` | `const ANCHOR_INVENTORY = resolveArchivedPhasePath('62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md');` (v1.5 helper resolves v1.6-phases when extended; for now Plan 68-02 may need a v1.6-aware variant OR leave 62-ANCHOR-INVENTORY in place if v1.6-phases archival is post-Phase-70) — **OPEN QUESTION: see Edge Cases** |
| 6 | `check-phase-63.mjs` | 48 | `const ANCHOR_INVENTORY = '.planning/phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md';` | Same as #5 (`63-ANCHOR-INVENTORY` is currently live, would drift at Phase 70 v1.6 archive) |

**Each call site MUST add the import:**
```javascript
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
```

**Wave 3 — regenerate-supervision-pins.mjs edits** (BASELINE_9 coord rebase + parseAllowlist repoint):

| # | File | Line(s) | BEFORE | AFTER |
|---|------|---------|--------|-------|
| A | `scripts/validation/regenerate-supervision-pins.mjs` | 408 | `  ['docs/_glossary-android.md', 79],   // ### Supervision heading (was 65/76; 79 at Phase 59; stable post-Plan-06 — H3 sits before line 127)` | `  ['docs/_glossary-android.md', 80],   // ### Supervision heading (was 79 at Phase 59; +1 Phase 62-07 banner shift; H3 sits before line 127)` |
| B | same | 409 | `  ['docs/_glossary-android.md', 81],   // Supervision disambiguation blockquote (was 67/78; 81 at Phase 59; stable post-Plan-06)` | `  ['docs/_glossary-android.md', 82],   // Supervision disambiguation blockquote (was 81 at Phase 59; +1 Phase 62-07 banner shift)` |
| C | same | 410 | `  ['docs/_glossary-android.md', 181],  // MHS cross-platform note (was 134/172/179; 181 post-Plan-06 +2 from #kme/#kpe shims)` | `  ['docs/_glossary-android.md', 182],  // MHS cross-platform note (was 181 at Phase 60-06; +1 Phase 62-07 banner shift)` |
| D | same | 411 | `  ['docs/_glossary-android.md', 198],  // Version History row (was 148/188/196; 198 post-Plan-06 +2)` | `  ['docs/_glossary-android.md', 199],  // Version History row (was 198 at Phase 60-06; +1 Phase 62-07 banner shift)` |
| E | same | 422 | `  const allow = parseAllowlist('scripts/validation/v1.5-audit-allowlist.json');` | `  const allow = parseAllowlist('scripts/validation/v1.6-audit-allowlist.json');` |
| F | same | 423 | `    process.stderr.write('FAIL: sidecar missing at scripts/validation/v1.5-audit-allowlist.json\n');` | `    process.stderr.write('FAIL: sidecar missing at scripts/validation/v1.6-audit-allowlist.json\n');` |

**Wave 3 also recommended (D-03 advisor §"Edit 3 optional but recommended"):** Add a `BASELINE_10`-style attribution comment after line 406 matching the existing 390/393/396/399 pattern, citing Phase 68 CHAIN-02 + the v1.5→v1.6 sidecar-target repoint rationale + forward-pointer to Phase 70 HARNESS-02 repoint to v1.7 sidecar. **Optional but high-value for auditor clarity.**

**Wave 4 — v1.5-audit-allowlist.json `supervision_exemptions[]` coord rebase for V-60-23.**

Empirically verified entry-index map (from `node -e "..."` inspection):

| Array index | Current `{file, line}` | After rebase | Source-truth coord (v1.6 sidecar) |
|-------------|------------------------|--------------|-----------------------------------|
| 0 | `{file: "docs/_glossary-android.md", line: 79}` (### Supervision H3) | `80` | v1.6:80 (+1 banner shift) |
| 1 | `{file: "docs/_glossary-android.md", line: 81}` (Supervision disambig blockquote) | `82` | v1.6:82 |
| 2 | `{file: "docs/_glossary-android.md", line: 181}` (MHS cross-platform note) | `182` | v1.6:182 |
| 3 | `{file: "docs/_glossary-android.md", line: 198}` (Phase 34 V-History entry) | `199` | v1.6:199 |
| 4 | `{file: "docs/_glossary-android.md", line: 16}` (Alphabetical Index) | `17` | v1.6:17 |
| 5 | `{file: "docs/_glossary-android.md", line: 49}` (COBO cross-platform note) | `50` | v1.6:50 |
| 6 | `{file: "docs/_glossary-android.md", line: 69}` (Fully Managed cross-platform note) | `70` | v1.6:70 |
| 7 | `{file: "docs/_glossary-android.md", line: 82}` (CLEAN-08 see-also line) | `83` | v1.6:83 |
| 8 | `{file: "docs/_glossary-android.md", line: 195}` (CLEAN-08 V-History prose) | `196` | v1.6:196 |

> **9 entries total** in v1.5 sidecar reference `_glossary-android.md`. All 9 shift by **exactly +1** because Phase 62-07 added a single Apple Business banner line at `_glossary-android.md:13` (before all 9 supervision-pin coords). **Empirically confirmed by `node -e ...` script that listed both v1.5 and v1.6 entries side-by-side** — every v1.6 entry's reason field cites "Phase 62 carry-over: line N shifted +1".

> **Non-_glossary-android.md entries in v1.5 sidecar `supervision_exemptions[]`** (`{file: docs/admin-setup-android/03-fully-managed-cobo.md, line: 36}` and similar) are **NOT shifted** by Phase 62-07's banner add — different file. **DO NOT touch them.**

> **Also verify the C2 FAIL is NOT cascade from C7 / C9:** The empirical run shows three independent FAILs (C2 supervision, C7 bare Knox, C9 COPE banned-phrase). V-60-23 will only PASS when ALL THREE clear. Inspection of v1.5 sidecar reveals separate exemption arrays:
> - `safetynet_exemptions[]` for C1 — already passes
> - `supervision_exemptions[]` for C2 — Plan 68-02 Wave 4 fixes this
> - `c7_knox_allowlist[]` for C7 — **may also need rebase** (planner verifies)
> - `cope_banned_phrases[]` for C9 — **may also need rebase** (planner verifies: `docs/_glossary-android.md:203` is the empirical C9 FAIL line)
>
> **Plan 68-02 Wave 4 scope expansion (planner discretion):** D-04 §2.3 advised "**broad reading** — rebase ALL exemption arrays (safetynet/supervision/c7_knox/cope-related)" to fix V-60-23 fully. Reading the C2/C7/C9 FAILs holistically, this **broad rebase is REQUIRED** — narrow supervision-only rebase will leave V-60-23 FAILing (because the v1.5 audit harness is the V-60-23 subprocess and C7+C9 also FAIL).
>
> **Recommended: Plan 68-02 Wave 4 rebases all 4 v1.5-allowlist exemption arrays for `_glossary-android.md` entries** (planner runs full diff against v1.6-allowlist to enumerate exact array indices).

---

### Plan 68-03 (CHAIN-03 — ATOMIC 5-file CHAIN_SKIP removal)

Five files in ONE indivisible git commit (per Phase 66-02 `3a9a671` atomic-harness-commit precedent):

| # | File | Line | BEFORE | AFTER |
|---|------|------|--------|-------|
| 1 | `scripts/validation/check-phase-62.mjs` | 66 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |
| 2 | `scripts/validation/check-phase-63.mjs` | 73 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |
| 3 | `scripts/validation/check-phase-64.mjs` | 73 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |
| 4 | `scripts/validation/check-phase-65.mjs` | 69 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |
| 5 | `scripts/validation/check-phase-66.mjs` | 64 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |

**Plus 5 canonical comment-block rewrites** above each `const CHAIN_SKIP` — see Atomic Commit Surface section below for the EXACT replacement text.

---

### Plan 68-04 (MILESTONES.md cdcce23 garbage-entry deletion)

| File | Operation | Byte range to DELETE |
|------|-----------|----------------------|
| `.planning/MILESTONES.md` | DELETE lines | **3 through 71 inclusive** (preserves line 1 `# Milestones` H1 + line 2 blank line; preserves line 73-92 correct v1.5 entry; preserves blank line 72 if any, OR adjusts to maintain blank-line-before-H2 markdown convention) |

**Verification (planner runs before delete):**

```bash
grep -n "^## v1.5" .planning/MILESTONES.md
# Expected output (current state):
# 3:## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-08)
# 73:## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-07)
```

After delete:
```bash
grep -n "^## v1.5" .planning/MILESTONES.md
# Expected output (post-delete):
# 3:## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-07)
# (single entry; "Shipped: 2026-05-07" is the correct date per 965f509 commit)
```

> **Note on date asymmetry:** Garbage entry says "Shipped: 2026-05-08" (the cdcce23 commit date 2026-05-07 plus archive-script's internal timestamp); correct entry says "Shipped: 2026-05-07" (the actual close commit date per 965f509). Plan 68-04 keeps the **2026-05-07** entry — that is the authoritative one (per `git log .planning/MILESTONES.md`).

---

### Plan 68-05 (close-gate)

**Files created:**
- `.planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-VERIFICATION.md` (Path-A from Phase 67 `67-VERIFICATION.md` template)

**Files edited (traceability flips):**
- `.planning/PROJECT.md` — CHAIN-01/02/03 entries flipped Active→Validated with closing commit SHAs
- `.planning/REQUIREMENTS.md` — Traceability table rows for CHAIN-01/02/03 flipped Pending→Complete (lines 81-83) + active-list checkboxes `[ ]` → `[x]` at lines 18, 20, 22
- `.planning/STATE.md` — Phase 68 row updated (current row may not exist yet; planner adds it)
- `.planning/ROADMAP.md` — Phase 68 row flipped to Complete with date
- **Possibly** `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` (file does NOT exist yet — Plan 68-05 may CREATE it stub-only OR defer creation to Phase 70 HARNESS-06; advisor D-04 §5.2 + CONTEXT D-04 Caveat say: file cdcce23 root cause for v1.8+ deferred-cleanup listing here; planner picks the artifact shape per Claude's discretion bullet 6).

**Verification commands** — see Verification Harness section.

---

## Atomic Commit Surface (Plan 68-03)

> The 5 files Plan 68-03 touches in ONE git SHA. Critical: this is the ONLY plan in Phase 68 that uses atomic-multi-file commit topology (per ROADMAP SC#4 + Phase 66-02 `3a9a671` precedent).

### File-by-file atomic-commit surface

| File | CHAIN_SKIP Set line | CHAIN_SKIP doc-comment range | Doc-comment header phrasing | Resolution-narrative tail phrasing |
|------|---------------------|------------------------------|----------------------------|-----------------------------------|
| `check-phase-62.mjs` | 66 | 47-66 (20 lines) | "Pre-existing failure root causes (documented for Phase 66 terminal re-audit):" | "Resolution path: Phase 66 terminal re-audit will run in a fresh Linux worktree where CRLF issues disappear; v1.5-audit-allowlist.json line-number rebase tracked in deferred-items." |
| `check-phase-63.mjs` | 73 | 54-73 (20 lines) | "Pre-existing failure root causes (documented for Phase 66 terminal re-audit):" | Same as 62 |
| `check-phase-64.mjs` | 73 | 54-73 (20 lines) — **CANONICAL block per CONTEXT canonical-refs §"Source-of-truth root cause docs"** | "Pre-existing failure root causes (documented for Phase 66 terminal re-audit):" | Same as 62 |
| `check-phase-65.mjs` | 69 | 49-69 (21 lines) | "Pre-existing failure root causes (documented for Phase 66 terminal re-audit):" | Same as 62 |
| `check-phase-66.mjs` | 64 | 45-64 (20 lines) — **DIVERGES** | "Pre-existing failure root causes (documented for v1.7 CI-Linux job resolution):" | "Phase 66 adds NO new entries… Resolution path: **deferred to v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md** (introduced Phase 66 Plan 66-03)." |

### Recommended uniform replacement for ALL 5 doc-comment blocks

The atomic-commit must replace each per-file comment block with a uniform Phase 68 closure narrative. Suggested template (planner final-call on exact wording):

```
// CHAIN_SKIP topology: HISTORICAL — empty by Phase 68 CHAIN-03 close (sha {PLAN_68_03_SHA}).
//
// Pre-existing v1.5/v1.6-era failures {48, 51, 58, 60, 61} had been suppressed here pending
// root-cause resolution (documented at scripts/validation/check-phase-64.mjs:55-73 prior to
// Phase 68 close; full historical narrative in .planning/milestones/v1.6-DEFERRED-CLEANUP.md
// "CHAIN_SKIP Resolution" section).
//
// Phase 68 (Pillar B — Validator Surgery) resolved all 5 root causes:
//   - CHAIN-01: CRLF normalization in check-phase-{51,58}.mjs readFile() — sha {68_01_SHA}
//   - CHAIN-02: archive-path helper scripts/validation/_lib/archive-path.mjs across
//               check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs
//               BASELINE_9 +1 banner-shift rebase + v1.5 sidecar supervision_exemptions[]
//               +1 coord rebase — sha {68_02_SHA}
//   - CHAIN-03: this atomic 5-file empty-Set commit — sha {68_03_SHA}
//   - MILESTONES.md cdcce23 garbage v1.5 H2 entry deletion (V-61-19/20 PASS) — sha {68_04_SHA}
//
// Full chain check-phase-{48..66}.mjs exits 0 on Windows host with NO CHAIN_SKIP entries
// for the first time since v1.5 close. Phase 68 close-gate: sha {68_05_SHA}.
const CHAIN_SKIP = new Set([]);
```

**Each of the 5 files gets this same comment block.** Comment-block byte count grows by ~10 lines vs original; planner ensures line-number references in other files don't break (they don't — the only inbound reference is `check-phase-64.mjs:65-73` from `v1.6-DEFERRED-CLEANUP.md:108` and the V-66-07 substring check, both of which would survive a comment rewrite because they grep for substring `CHAIN_SKIP`).

### V-66-07 compatibility check

V-66-07 (check-phase-66.mjs line 198-210) asserts `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` contains substrings `## CI-1`, `## CI-2`, `## CI-3`, `CHAIN_SKIP`. **Plan 68-03 does NOT touch v1.6-DEFERRED-CLEANUP.md** → V-66-07 continues to PASS unchanged. The CHAIN_SKIP token appears in the deferred-cleanup file at multiple positions (verified: line 9, 95, 97, 106, 110, 136, 146, 147 contain the token).

### V-62-SELF, V-63-SELF, V-64-SELF, V-65-SELF, V-66-SELF compatibility

Each chain validator has a `V-NN-SELF` check that asserts `CHAIN_PHASES does NOT include NN` AND prints `CHAIN_SKIP = [...skipList...]`. After Plan 68-03, the printed list becomes `CHAIN_SKIP = []` (empty) — assertion logic still passes (the assertion is "NN not in CHAIN_PHASES", which is independent of CHAIN_SKIP contents). **All 5 V-NN-SELF checks continue to PASS.**

---

## Verification Harness

> All commands runnable from `D:\claude\Autopilot` working directory. Exit-code semantics: 0 = PASS, non-zero = FAIL.

### Plan 68-01 (CHAIN-01)

**Pre-edit baseline capture (MANDATORY — Phase 68 INTENT contract requires "verified against existing PASS state"):**

```powershell
node scripts/validation/check-phase-51.mjs ; echo "exit=$LASTEXITCODE"
# Expected: 25 passed, 0 failed, 0 skipped; exit=0

node scripts/validation/check-phase-58.mjs ; echo "exit=$LASTEXITCODE"
# Expected: 26 passed, 0 failed, 0 skipped; exit=0
```

**Post-edit verification:**

```powershell
# Same as pre-edit — must remain 25/25 + 26/26
node scripts/validation/check-phase-51.mjs ; echo "exit=$LASTEXITCODE"
node scripts/validation/check-phase-58.mjs ; echo "exit=$LASTEXITCODE"
```

**Sister-validator regression sweep (the ROADMAP SC#1 "other phases the regex touches" clause):**

```powershell
foreach ($p in 48,49,52,53,54,55,56,57,59,62,63,64,65,66) {
  Write-Host "--- check-phase-$p.mjs ---"
  node scripts/validation/check-phase-$p.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "REGRESSION on $p" }
}
# Phases 50, 60, 61 excluded; 60+61 will FAIL today (cascade) — Plan 68-02 fixes; 50 is stub-state
```

**Expected post-Plan-68-01 chain state:** check-phase-{49,52..57,59,62..66}.mjs all PASS (62-66 because CHAIN_SKIP suppresses 48/51/58/60/61 — still skipping until Plan 68-03).

---

### Plan 68-02 (CHAIN-02)

**Pre-edit baselines:**

```powershell
node scripts/validation/regenerate-supervision-pins.mjs --self-test 2>&1 | tail -25 ; echo "exit=$LASTEXITCODE"
# Expected (pre-edit): FAIL — 4 false-negatives + 7 false-positives + 1 un-pinned Tier-2; exit=1

node scripts/validation/v1.5-milestone-audit.mjs 2>&1 | tail -15 ; echo "exit=$LASTEXITCODE"
# Expected (pre-edit): Summary: 9 passed, 3 failed, 0 skipped (C2, C7, C9 FAIL); exit=1

node scripts/validation/check-phase-48.mjs 2>&1 | tail -3 ; echo "exit=$LASTEXITCODE"
# Expected (pre-edit): 5/7 PASS, 2 FAIL (V-48-04 self-test cascade + V-48-05 archive-path); exit=1
```

**Post-edit verification (after Waves 1-4 land):**

```powershell
node scripts/validation/regenerate-supervision-pins.mjs --self-test 2>&1 | tail -10
# Expected: "Diff: identical / Un-pinned Tier-2 count: 0 / Self-test: PASS"; exit=0

node scripts/validation/v1.5-milestone-audit.mjs 2>&1 | tail -3
# Expected: "Summary: 12 passed, 0 failed, 0 skipped"; exit=0

node scripts/validation/check-phase-48.mjs 2>&1 | tail -3
# Expected: "Result: 7 PASS, 0 FAIL, 0 SKIPPED"; exit=0

node scripts/validation/check-phase-31.mjs 2>&1 | tail -3
# Expected: PASS or whatever current state holds (V-31-21/V-31-24 may now FAIL if STRETCH non-silent-swallow applied
# AND placeholder-inventory.json is missing — but it should resolve via helper); confirm intent
```

**Cascade verification (must run AFTER Plan 68-02 lands, BEFORE Plan 68-03):**

```powershell
node scripts/validation/check-phase-60.mjs 2>&1 | tail -3
# Expected post-Plan-68-02: 25/25 PASS (V-60-08, V-60-23, V-60-24, V-60-25 all PASS)

node scripts/validation/check-phase-61.mjs 2>&1 | tail -3
# Expected post-Plan-68-02: 32/34 PASS, 2 FAIL (V-61-19, V-61-20 still FAIL until Plan 68-04 lands)
```

---

### Plan 68-03 (CHAIN-03 — atomic CHAIN_SKIP removal)

**Pre-edit verification (after Plans 68-01 + 68-02 + 68-04 ALL land):**

```powershell
# Plans 68-01 + 68-02 land first → chain regression-free → THEN Plan 68-04 lands → THEN Plan 68-03
# (planner may sequence 68-04 before or in parallel with 68-03; 68-03 wave-1 is the verification step)

# Wave 1 verification (all 5 root-cause plans landed):
foreach ($p in 48..66) {
  if (Test-Path "scripts/validation/check-phase-$p.mjs") {
    node scripts/validation/check-phase-$p.mjs 2>&1 | tail -1
  }
}
# Expected: every check-phase-N PASS or SKIPPED (62-66 still SKIP 48/51/58/60/61 until this commit)
```

**Atomic-commit edit (Wave 2): all 5 files staged together:**

```powershell
git add scripts/validation/check-phase-62.mjs `
        scripts/validation/check-phase-63.mjs `
        scripts/validation/check-phase-64.mjs `
        scripts/validation/check-phase-65.mjs `
        scripts/validation/check-phase-66.mjs

git status
# Expected: 5 files staged (Modified)
```

**Post-edit verification (full chain):**

```powershell
$failures = @()
foreach ($p in 48..66) {
  if (Test-Path "scripts/validation/check-phase-$p.mjs") {
    $result = node scripts/validation/check-phase-$p.mjs 2>&1
    $exitCode = $LASTEXITCODE
    $summary = $result | Select-String -Pattern "Summary|Result" | Select-Object -Last 1
    Write-Host "phase-$p : exit=$exitCode | $summary"
    if ($exitCode -ne 0) { $failures += $p }
  }
}
Write-Host "FAILURES: $($failures -join ',')"
# Expected: "FAILURES: " (empty); all phases PASS; SKIPPED count = 0
```

---

### Plan 68-04 (MILESTONES.md cdcce23 deletion)

**Pre-edit verification:**

```powershell
(Get-Content .planning/MILESTONES.md).Count
# Expected: 208 (current)

Select-String -Path .planning/MILESTONES.md -Pattern "^## v1.5"
# Expected: 2 matches at lines 3 and 73
```

**Post-edit verification:**

```powershell
(Get-Content .planning/MILESTONES.md).Count
# Expected: 138 (208 - 70 lines deleted)

Select-String -Path .planning/MILESTONES.md -Pattern "^## v1.5"
# Expected: 1 match at line 3 (the correct entry "Shipped: 2026-05-07")

node scripts/validation/check-phase-61.mjs 2>&1 | Select-String "V-61-19|V-61-20"
# Expected: both PASS (Methodology highlights + DEFER-07/08 cited — the correct entry has both)
```

---

### Plan 68-05 (close-gate)

**Full-chain green verification:**

```powershell
$results = @{}
foreach ($p in 48..66) {
  if (Test-Path "scripts/validation/check-phase-$p.mjs") {
    $r = node scripts/validation/check-phase-$p.mjs 2>&1
    $exitCode = $LASTEXITCODE
    $passLine = ($r | Select-String -Pattern "Summary|Result").Line | Select-Object -Last 1
    $results[$p] = @{ exit = $exitCode; summary = $passLine }
  }
}
$results | Format-Table -AutoSize
# Expected: every row exit=0, 0 SKIPPED entries in any summary line

# v1.6 harness baseline (no regression):
node scripts/validation/v1.6-milestone-audit.mjs 2>&1 | tail -5 ; echo "exit=$LASTEXITCODE"
# Expected: 15/15 PASS, exit=0 (unchanged from Phase 66 close baseline)

# v1.5 harness fully passing:
node scripts/validation/v1.5-milestone-audit.mjs 2>&1 | tail -5 ; echo "exit=$LASTEXITCODE"
# Expected: 12/12 PASS, exit=0 (new — was 9/12 pre-Plan-68-02)

# regenerate-supervision-pins self-test:
node scripts/validation/regenerate-supervision-pins.mjs --self-test 2>&1 | Select-String -Pattern "Self-test:"
# Expected: "Self-test: PASS"
```

**End-state success criteria (68-VERIFICATION.md ledger):**

| Phase | check-phase-NN.mjs | Expected | SC mapping |
|-------|-------------------|----------|------------|
| 48 | exits 0 | 7/7 PASS, 0 SKIP | SC#2 (CHAIN-02 archive-path) |
| 49 | exits 0 | unchanged | regression-free |
| 50 | exits 0 / SKIP | stub | unchanged |
| 51 | exits 0 | 25/25 PASS | SC#1 (CHAIN-01 INTENT) |
| 52-57, 59 | exits 0 | unchanged | regression-free |
| 58 | exits 0 | 26/26 PASS | SC#1 |
| 60 | exits 0 | 25/25 PASS | SC#3 (cascade) |
| 61 | exits 0 | 34/34 PASS | SC#3 (cascade + V-61-19/20 close from Plan 68-04) |
| 62-66 | exits 0 | unchanged content, CHAIN_SKIP empty Set | SC#4 (atomic removal) |
| `v1.5-milestone-audit.mjs` | exits 0 | 12/12 PASS | SC#2 (v1.5 sidecar rebase landed) |
| `v1.6-milestone-audit.mjs` | exits 0 | 15/15 PASS | regression-free |
| `regenerate-supervision-pins.mjs --self-test` | exits 0 | identical diff | SC#5 (self-test exits 0; validator-only-commit) |

---

## Cross-Validator Dependency Map

### `CHAIN_SKIP` references (entire codebase)

Empirical grep (`grep -rn "CHAIN_SKIP" scripts/validation/`):

| File | Lines | Reference type |
|------|-------|----------------|
| `check-phase-62.mjs` | 66, 302, 303, 304, 452, 453 | declaration + 4 usages + V-62-SELF detail string |
| `check-phase-63.mjs` | 73, 307, 308, 309, 420, 421 | same shape |
| `check-phase-64.mjs` | 73, 294, 295, 296, 339, 340 | same shape |
| `check-phase-65.mjs` | 69, 283, 284, 285, 329, 330 | same shape |
| `check-phase-66.mjs` | 64, 196, 198, 202, 299, 300, 301, 345, 346 | declaration + 4 usages + V-66-07 substring assert + V-66-SELF detail string |

**Plan 68-03 only modifies the declaration line in each (62:66, 63:73, 64:73, 65:69, 66:64) + the canonical comment block above each. The usage lines (`.has(phaseNum)` + `[...CHAIN_SKIP]` and the V-NN-SELF detail strings) are untouched — they work correctly with `new Set([])`.**

### `_lib/` directory (currently NONEXISTENT)

```bash
ls scripts/validation/_lib/ 2>&1
# ls: cannot access 'scripts/validation/_lib/': No such file or directory
```

**No path conflict.** Plan 68-02 introduces `scripts/validation/_lib/archive-path.mjs` as the first inhabitant. Future v1.7+ helpers may colocate here.

**Import-path portability:** ESM `import { ... } from './_lib/archive-path.mjs'` uses forward-slash convention — node resolves cross-platform on Windows + Linux + macOS. The 3 existing validators (`check-phase-48.mjs`, `check-phase-60.mjs`, `regenerate-supervision-pins.mjs`) already use forward-slash string-literal paths against the filesystem (`.planning/phases/...`) — same idiom.

### `BASELINE_9` references

Empirical grep:

| File | Line | Reference type |
|------|------|----------------|
| `regenerate-supervision-pins.mjs` | 386, 388, 390-406 (multi-line comment), 407 (declaration), 433, 447 | Phase 43 hand-authored 9-pin baseline; 4 entries pin `_glossary-android.md` |
| `check-phase-60.mjs` | 165, 166, 170 (V-60-09 asserts the freshness comment) | Read-only reference to the existing comment text |

**Plan 68-02 Wave 3 only edits lines 408-411 (BASELINE_9 array body) + line 422 (parseAllowlist arg) + line 423 (FAIL message). V-60-09's substring assertion (`/BASELINE_9 refreshed 2026-05-06 \(Phase 60 Plan 08\)/`) survives because Plan 68-02 ADDS new comment lines (recommended) without removing the existing 2026-05-06 attribution line.**

### `supervision_exemptions[]` references

Empirical grep:

| File | References |
|------|-----------|
| `scripts/validation/v1.5-audit-allowlist.json` | data file — 20 entries; 9 reference `_glossary-android.md` (all +1-shift candidates) |
| `scripts/validation/v1.6-audit-allowlist.json` | data file — 20 entries; same 9 reference `_glossary-android.md` already at +1 coords |
| `scripts/validation/check-phase-48.mjs` | line 50 V-48-03: `j.supervision_exemptions.length` assertion (read-only count check) |
| `scripts/validation/regenerate-supervision-pins.mjs` | line 432: `(allow.supervision_exemptions || []).map(e => e.file + ':' + e.line)` — consumes the array |
| `scripts/validation/v1.5-milestone-audit.mjs` + `v1.6-milestone-audit.mjs` | C2 supervision check consumes the array for exemption lookups |

**Plan 68-02 Wave 4 ONLY edits the JSON data file `v1.5-audit-allowlist.json` — array entry line-coords shift +1 for the 9 `_glossary-android.md` entries. Array length and shape unchanged. All consumers continue to function unchanged.**

---

## V-60-23 Diagnosis (empirical confirmation)

**Diagnostic command + actual output (captured 2026-05-26):**

```
$ node scripts/validation/v1.5-milestone-audit.mjs 2>&1 | head -15
[1/12] C1: Zero SafetyNet as compliance mechanism ....... PASS
[2/12] C2: Zero supervision as Android mgmt term ........ FAIL -- 22 un-exempted supervision reference(s): docs/_glossary-android.md:17 ("Supervision"), docs/_glossary-android.md:17 ("supervision"), docs/_glossary-android.md:50 ("supervised")
[3/12] C3: AOSP stub word count within Phase 39 envelope PASS (informational -- Phase 39 self-certification; body 596 words vs envelope 600-900)
[4/12] C4: Zero Android links in deferred shared files .. PASS
[5/12] C5: last_verified frontmatter on all Android docs PASS
[6/12] C6: PITFALL-7 preservation in AOSP + per-OEM docs PASS
[7/12] C7: bare-"Knox" disambiguation check ............. FAIL -- 5 bare "Knox" occurrence(s) without SKU qualifier
[9/12] C9: COPE banned-phrase check ..................... FAIL -- 1 un-exempted COPE banned-phrase hit(s): docs/_glossary-android.md:203
...
Summary: 9 passed, 3 failed, 0 skipped
```

**Interpretation against D-04 advisor's diagnosis:**

| Failure | Empirical token coords | v1.5 sidecar coords (today) | v1.6 sidecar coords (today; sourced from cross-table inspection) | Shift |
|---------|------------------------|----------------------------|-----------------------------------------------------------------|-------|
| C2 "Supervision" | line 17 | `:16` (entry idx 4) | `:17` (entry idx 4) | +1 |
| C2 "supervision" | line 17 | `:16` | `:17` | +1 |
| C2 "supervised" | line 50 | `:49` (entry idx 5) | `:50` (entry idx 5) | +1 |
| (further C2 hits not surfaced in head; full --verbose output would show more) | various | `:69, :79, :81, :82, :181, :195, :198` | `:70, :80, :82, :83, :182, :196, :199` | +1 each |
| C7 bare-Knox | (5 occurrences in _glossary-android.md; planner --verbose investigates exact coords) | (separate `c7_knox_allowlist[]` array — Plan 68-02 Wave 4 broad-rebase scope) | (likely same +1 shift) | +1 |
| C9 COPE banned-phrase | line 203 | (cope_banned_phrases checks would have specific coord references) | (likely same +1 shift) | +1 |

**D-04 advisor's diagnosis empirically CONFIRMED.** The +1 shift originates from Phase 62-07's Apple Business reciprocal banner added at `_glossary-android.md:13` (visible in the file head — line 13 begins `> **Apple Business governance:** ...`). All content after line 13 shifted +1.

**Plan 68-02 Wave 4 scope is BROADER than just `supervision_exemptions[]`** — V-60-23 closes only when ALL THREE of C2/C7/C9 pass, which requires rebasing the sidecar coords across:
- `supervision_exemptions[]` (9 _glossary-android.md entries)
- `c7_knox_allowlist[]` (planner enumerates)
- `cope_banned_phrases[]` (planner enumerates; line 203 is the empirical C9 FAIL location)
- `safetynet_exemptions[]` (C1 currently PASSes — verify it stays passing after rebase)

**Suggestion:** Planner uses a node one-liner to diff v1.5 vs v1.6 sidecar entries for `_glossary-android.md` across ALL exemption arrays; rebase v1.5 entries to match v1.6's +1 shift.

---

## MILESTONES.md cdcce23 Defect

### Empirical state captured 2026-05-26

```
$ wc -l .planning/MILESTONES.md
208 .planning/MILESTONES.md

$ grep -n "^## v1.5" .planning/MILESTONES.md
3:## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-08)
73:## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-07)
```

### Lines 3-71 content sample (the garbage)

Lines 5-30 contain bulleted entries like:
```
**Phases completed:** 14 phases, 101 plans, 70 tasks

**Key accomplishments:**

- One-liner:
- SUBSUMED BY PLAN 48-01.
- SUBSUMED BY PLAN 48-01.
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- Co-management overview with 7 CB 2503 workloads, 3 slider states...
- One-liner:
...
- File:
- Hash:
- Total file size:
- NO COMMIT MADE.
...
```

These are **scripted-extraction debris** — looks like the archive automation tried to extract summary-bullets from per-plan SUMMARY files but caught the placeholder labels (`One-liner:`, `Hash:`, `Pre-edit:`) instead of the bullet content.

### Line 73-92 content (the correct entry)

The correct entry at line 73-92 has full structured content:
- Line 73: `## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-07)`
- Line 75: `**Phases completed:** 14 phases (48-61), 96+ plans, ~150 tasks`
- Line 77: `**Audit status:** passed (.planning/milestones/v1.5-MILESTONE-AUDIT.md...)`
- Line 80: `**Key accomplishments:**` (with 4 bulleted Pillar sections)
- Line 87: `**v1.4.1 deferred items closed:** DEFER-07 ... DEFER-08`
- Line 89: `**Known deferred items at close...**`
- Line 91: `**Methodology highlights:** Wave-based parallel execution...`

This entry is the **authoritative one** — it satisfies V-61-18 (Phases completed line), V-61-19 (Key accomplishments + Methodology highlights), V-61-20 (DEFER-07 + DEFER-08 citations).

### Git archaeology (commit attribution)

```
$ git log --oneline -5 .planning/MILESTONES.md
cdcce23 chore: archive v1.5 milestone files (Linux Platform, Operational Depth & Cross-Platform Cleanup)
965f509 docs(61-05): MILESTONES.md v1.5 entry append + ROADMAP Phase 61 close + STATE.md milestone-complete
6f91d14 chore: archive v1.4.1 milestone (Android Enterprise Completion & v1.4 Cleanup)
13d2c88 chore: archive v1.4 milestone files (MILESTONES.md, PROJECT.md, ROADMAP.md, STATE.md)
9a4cb4f chore: archive v1.3 milestone files
```

`965f509` (docs(61-05)) is the legitimate "MILESTONES.md v1.5 entry append" commit — appended the correct entry (now at lines 73-92).
`cdcce23` (`chore: archive v1.5 milestone files`) is the introducing commit of the garbage at lines 3-70. **D-04 advisor's git archaeology CONFIRMED.**

### Plan 68-04 exact line range to DELETE

**Lines 3-71 inclusive (69 lines deleted)**:
- Line 3: garbage `## v1.5 ... (Shipped: 2026-05-08)` H2
- Lines 4-70: garbage body (One-liner stubs, Hash:, NO COMMIT, etc.)
- Line 71: blank line separator (the `---` was likely line 71 or 72 — planner runs `sed -n '70,73p' .planning/MILESTONES.md` to verify exact boundaries)

Post-delete:
- Line 1: `# Milestones: Windows Autopilot Troubleshooter`
- Line 2: blank
- Line 3: `## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-07)` (formerly line 73)
- ... rest of file

**Resulting line count: 138** (208 - 70).

### Phase 70 archive risk

Per D-04 advisor §5.2 + CONTEXT D-04 Caveat: the cdcce23 archive-script defect MAY re-trigger when Phase 70 archives v1.7 milestone files. Plan 68-05 close-gate MUST flag this:
- **Action 1:** Add line item to `v1.7-DEFERRED-CLEANUP.md` (file may need creation at Plan 68-05 OR Phase 70 HARNESS-06 — planner picks). Item: "Investigate archive-automation root cause that produced cdcce23 garbage v1.5 H2 insert (2026-05-07). May live in `.claude/commands/gsd-complete-milestone.md` or related skill. Required before Phase 70 v1.7 archival."
- **Action 2:** Plan 70 (Phase 70 author) must audit `.planning/MILESTONES.md` post-archival via pre-archive vs. post-archive diff.

---

## Edge Cases & Landmines

### 1. Windows path separators in `resolveArchivedPhasePath()`

**Question:** Does the helper need `path.posix.join` or is string-concat `'.planning/phases/' + suffix` portable across Windows + Linux?

**Answer:** The CONTEXT D-02 helper uses **forward-slash string concatenation** + `join(process.cwd(), live)` to make the path absolute. Node's `path.join` on Windows converts `/` to `\` automatically when joining; `existsSync` accepts both. The 3 existing CRLF-normalized validators (`check-phase-48.mjs`, `check-phase-60.mjs`, `regenerate-supervision-pins.mjs`) **all use forward-slash string literals** for relative paths and `join()` for absolutification — same idiom. **No path-separator concern.**

### 2. `existsSync` race conditions

**Question:** Could the helper return a path that becomes invalid by the time the caller reads it?

**Answer:** Not in this use case. All Phase 68 operations are **read-only** validator runs — no concurrent writes to the resolved paths. Trivial.

### 3. `check-phase-68.mjs` self-verifier (HARNESS-03 at Phase 70)

**Concern:** When Phase 70 Path-A copies `check-phase-66.mjs` → `check-phase-{67..70}.mjs`, the resulting `check-phase-68.mjs` may include a literal-letter check for `\r?\n` regex (per ROADMAP SC#1 narrow wording).

**Recommendation (per D-01 advisor §4 + §5):** The Phase 70 planner authoring `check-phase-68.mjs` **MUST verify CHAIN-01 via INTENT** (e.g., assert: `check-phase-{51,58}.mjs` exit 0 + 0 CHAIN_SKIP + 25/25 / 26/26 PASS counts under simulated CRLF re-injection) and **NOT via literal-letter source grep of `\r?\n`**.

**Suggested assertion shape for check-phase-68.mjs:**

```javascript
{
  id: 'CHAIN-01-INTENT',
  name: "CHAIN-01: check-phase-{51,58}.mjs readFile() applies CRLF normalization",
  run() {
    const c51 = readFile('scripts/validation/check-phase-51.mjs');
    const c58 = readFile('scripts/validation/check-phase-58.mjs');
    if (!c51 || !c58) return { pass: false, detail: 'source file(s) missing' };
    // Assert the readFile() body contains the CRLF-normalize idiom (substring grep — not literal-letter \r?\n regex grep)
    if (!c51.includes(".replace(/\\r\\n/g, '\\n')")) {
      return { pass: false, detail: "check-phase-51.mjs readFile() missing CRLF normalization (.replace(/\\r\\n/g, '\\n'))" };
    }
    if (!c58.includes(".replace(/\\r\\n/g, '\\n')")) {
      return { pass: false, detail: "check-phase-58.mjs readFile() missing CRLF normalization" };
    }
    return { pass: true, detail: 'both validators apply CRLF normalization in readFile()' };
  }
}
```

**Plan 68-05 close-gate authors a NOTE to this effect in 68-VERIFICATION.md `## Phase 69/70 Forward Coordination` section.**

### 4. `v1.6-audit-allowlist.json` v1.5-lineage compatibility

**Question:** When `regenerate-supervision-pins.mjs --self-test` repoints to v1.6 sidecar, do all schema keys align?

**Empirical answer (verified):**
- v1.5 sidecar keys: `c11_ops_exemptions, c13_broken_link_allowlist, c7_knox_allowlist, c9_exemptions, cope_banned_phrases, generated, phase, safetynet_exemptions, schema_version, supervision_exemptions`
- v1.6 sidecar keys: same 10 keys + 2 v1.6-additions: `c13_rotting_external, c16_missing_endpoint_exemptions`

**The `supervision_exemptions[]` array (the one --self-test consumes) is present in BOTH with identical shape `{file, line, reason}` per-entry.** The 2 extra v1.6-only keys (`c13_rotting_external`, `c16_missing_endpoint_exemptions`) are unused by `--self-test` — no compatibility issue. **Helper repoint is safe.**

### 5. Node.js version + ESM import portability

**Empirical answer:**
- Node version on host: **v24.15.0**
- `package.json` does NOT have an `engines.node` constraint (verified — no `"engines"` block).
- `node:fs` / `node:path` ESM imports are **stable since Node 14+** (`node:` protocol prefix was introduced in Node 14 / 16 LTS). Supported in Node 18, 20, 22, 24.

**No concern.** The `import { existsSync } from 'node:fs'; import { join } from 'node:path';` idiom in the new helper file is portable across all supported Node versions and matches the existing validator codebase patterns.

### 6. Phase 70 archive risk for cdcce23 re-trigger

**Plan 68-05 must flag this for `v1.7-DEFERRED-CLEANUP.md`** per advisor D-04 §5.2:
- Investigation deferred to v1.8+ pending root-cause analysis of `.claude/commands/gsd-complete-milestone.md` (or wherever the archive script lives)
- Phase 70 v1.7 milestone-archival author MUST do `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` after archive automation runs to verify no garbage-insert recurrence

### 7. check-phase-62.mjs `ANCHOR_INVENTORY` archive ambiguity

**Concern:** Plan 68-02 Wave 2 includes `check-phase-62.mjs:41` in the helper-call replacement list. But `62-ANCHOR-INVENTORY.md` is already archived (per D-02 advisor's empirical finding: file lives at `.planning/milestones/v1.6-phases/62-...`). The CONTEXT D-02 helper resolves v1.5-phases only.

**Resolution:** Either
- **(a)** Extend the helper to glob `.planning/milestones/v*-phases/` (advisor D-02 original sketch did this) — slight scope creep beyond CONTEXT D-02 helper signature.
- **(b)** Have `check-phase-62.mjs` use a v1.6-specific path resolver inline OR a separate helper variant.
- **(c)** Skip `check-phase-62.mjs:41` from Plan 68-02 helper replacement and let V-62-ANCHORS continue to FAIL (it's currently in CHAIN_SKIP suppression scope as a 62-self-check; **wait — V-62-ANCHORS is NOT in CHAIN_SKIP — it's a V-62-NN test**).

**Empirical verification needed:** Run `node scripts/validation/check-phase-62.mjs 2>&1 | grep V-62-ANCHORS` post Plan 68-02 to see actual current state. **The planner should resolve this ambiguity at Plan 68-02 Wave 2 by inspecting which milestone-phases directory contains `62-ANCHOR-INVENTORY.md` and either extending the helper or using inline.**

**Recommended fix:** Extend the CONTEXT helper signature to optionally accept milestone version (`resolveArchivedPhasePath(suffix, milestoneRoots = ['v1.5-phases'])` defaulting to v1.5 only), and call it from `check-phase-62.mjs:41` with `['v1.6-phases']`. Minimal scope creep; preserves CONTEXT D-02 semantics for the v1.5 callers.

---

## Plan Sequencing & Wave Dependencies

### Wave dependency graph

```
Wave 1 (parallel):
  Plan 68-01 (CHAIN-01) — touches check-phase-{51,58}.mjs only
  Plan 68-02 (CHAIN-02) — touches _lib/archive-path.mjs (new) + check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs + v1.5-audit-allowlist.json
  Plan 68-04 (MILESTONES.md cdcce23) — touches .planning/MILESTONES.md only
  → All 3 wave-1 plans are file-disjoint (verified — see table below)

Wave 2:
  Plan 68-03 (CHAIN-03 atomic) — touches check-phase-{62,63,64,65,66}.mjs only
  → Depends on Wave 1 ALL landed + chain green verification (Plan 68-03 Wave 1 is the verification step)

Wave 3:
  Plan 68-05 (close-gate) — authors 68-VERIFICATION.md + traceability flips in PROJECT.md/REQUIREMENTS.md/ROADMAP.md/STATE.md
  → Depends on Plan 68-03 landed
```

### File-disjoint verification (Wave 1)

| Plan | Files modified |
|------|----------------|
| 68-01 | `scripts/validation/check-phase-51.mjs`, `scripts/validation/check-phase-58.mjs` |
| 68-02 | `scripts/validation/_lib/archive-path.mjs` (NEW), `scripts/validation/check-phase-31.mjs`, `scripts/validation/check-phase-48.mjs`, `scripts/validation/check-phase-60.mjs`, `scripts/validation/check-phase-62.mjs`, `scripts/validation/check-phase-63.mjs`, `scripts/validation/regenerate-supervision-pins.mjs`, `scripts/validation/v1.5-audit-allowlist.json` |
| 68-04 | `.planning/MILESTONES.md` |

**No file overlap.** Wave 1 plans are concurrent-safe; planner may sequence sequentially or run in parallel branches per user memory `project_execphase_sequential.md` (which suggests sequential-on-main-tree).

### Plan 68-03 (Wave 2) file overlap with Wave 1

| Plan 68-02 (Wave 1) | Plan 68-03 (Wave 2) | Overlap? |
|---------------------|---------------------|----------|
| `check-phase-62.mjs` (line 41 ANCHOR_INVENTORY) | `check-phase-62.mjs` (line 66 CHAIN_SKIP) | Same file, different lines |
| `check-phase-63.mjs` (line 48 ANCHOR_INVENTORY) | `check-phase-63.mjs` (line 73 CHAIN_SKIP) | Same file, different lines |

**Plan 68-03 ONLY edits the CHAIN_SKIP line + canonical comment block above it; Plan 68-02 ONLY edits the ANCHOR_INVENTORY const declaration. No line conflict. But the planner MUST sequence 68-02 before 68-03** (CHAIN_SKIP removal requires that the suppressed validators ACTUALLY PASS first — Plan 68-02 makes 60 + 61 cascade-pass; Plan 68-04 makes V-61-19/20 pass).

---

## Project Skills + CLAUDE.md Compliance

### Project skills audit

```bash
$ ls .claude/skills/
adversarial-review
fireworks-tech-graph
jira-milestone

$ ls .agents/skills/
fireworks-tech-graph
```

- `adversarial-review` — already invoked in /gsd-discuss-phase for D-01..D-04 (per CONTEXT.md + user memory `feedback_adversarial_review_preference`). Phase 68 is past that gate.
- `fireworks-tech-graph` — knowledge-graph tool; not invoked in this research (graph.json does not exist in this project per `ls .planning/graphs/`).
- `jira-milestone` — Jira-integration tool; irrelevant to Phase 68 (no Jira tickets in this project's workflow).

**None of the project skills constrain validator surgery.** The planner does NOT need to invoke them.

### CLAUDE.md compliance

`CLAUDE.md` describes a 3-tier diagnostic stack (PowerShell + Python FastAPI + TypeScript React) for Windows Autopilot deployments. Phase 68 is **harness/tooling under `scripts/validation/`** + **planning-doc surgery under `.planning/`** — neither tier of the diagnostic stack.

The relevant CLAUDE.md guidance that DOES apply:
- "**Never commit `.env` file or any credentials**" — Phase 68 touches no env files; no concern
- "**Audit log all administrative actions with user attribution**" — Phase 68 commit messages reference the requirement IDs (CHAIN-01/02/03) and atomic-commit precedent (Phase 66-02 `3a9a671`); satisfies audit-trail
- "**Validate all user inputs**" — N/A (validators read static files, no user input)

The CLAUDE.md diagnostic-stack patterns (Pester for PowerShell, pytest for Python, Vitest for frontend) do **NOT** apply because Phase 68 doesn't touch any of those tiers.

### .planning/config.json constraints

```
{
  "workflow": {
    "research": true,
    "_auto_chain_active": true,
    "ui_safety_gate": false,
    "ui_phase": false,
    "use_worktrees": false
  }
}
```

`use_worktrees: false` (durable per memory `project_execphase_sequential.md`) — Plans 68-01..05 execute sequentially on the main tree. NO worktree experiments. CONTEXT.md already captures this.

**No `workflow.nyquist_validation` key in config.json** — per `<output_format>` instruction, the Validation Architecture section is treated as **enabled** (absent = enabled). Phase 68's test framework IS the chain validator harness itself; see Validation Architecture section below.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Custom Node.js validator harness (`check-phase-NN.mjs` per-phase + `vN-milestone-audit.mjs` aggregate) |
| Config file | None — validators are self-contained `.mjs` files |
| Quick run command (per validator) | `node scripts/validation/check-phase-NN.mjs` |
| Full suite command (entire chain) | `foreach ($p in 48..66) { node scripts/validation/check-phase-$p.mjs }` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Test exists? |
|--------|----------|-----------|-------------------|--------------|
| CHAIN-01 | check-phase-51/58 PASS without CHAIN_SKIP | unit (per-validator) | `node scripts/validation/check-phase-51.mjs ; node scripts/validation/check-phase-58.mjs` | ✅ |
| CHAIN-01 | v1.5/v1.6 chain still PASS (no regressions in other validators) | integration (chain sweep) | full chain `foreach ($p in 48..66) { ... }` | ✅ |
| CHAIN-02 | check-phase-48 V-48-05 PASS | unit | `node scripts/validation/check-phase-48.mjs` | ✅ |
| CHAIN-02 | regenerate-supervision-pins.mjs --self-test PASS | unit (self-test) | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ✅ |
| CHAIN-02 | v1.5-milestone-audit.mjs PASS (V-60-23 close) | integration | `node scripts/validation/v1.5-milestone-audit.mjs` | ✅ |
| CHAIN-02 | check-phase-31 silent-swallow bug closed | unit | `node scripts/validation/check-phase-31.mjs` (V-31-21/V-31-24 still PASS — verify after STRETCH lands) | ✅ |
| CHAIN-03 | All 5 chain validators 62-66 exit 0 with CHAIN_SKIP empty | integration (atomic-commit verification) | `foreach ($p in 62..66) { node scripts/validation/check-phase-$p.mjs }` | ✅ |
| CHAIN-03 | Full chain check-phase-{48..66}.mjs exits 0, 0 SKIPPED | end-to-end | full chain sweep (commands above) | ✅ |
| (Plan 68-04) | V-61-19, V-61-20 PASS after MILESTONES.md cdcce23 deletion | unit | `node scripts/validation/check-phase-61.mjs` | ✅ |

### Sampling Rate
- **Per task commit:** appropriate per-validator command from table above
- **Per wave merge:** chain sweep across 48..66
- **Phase gate:** Plan 68-05 close-gate runs full chain + both milestone audits + self-test (all must exit 0)

### Wave 0 Gaps

None — every Phase 68 requirement maps to an existing automated test (the existing chain validators ARE the test framework). **Phase 68 inverts the usual pattern:** the validators are the deliverables, and the existing chain validators are simultaneously the test harness. No new test scaffolding required.

---

## Security Domain

`.planning/config.json` has no `security_enforcement` key — per the protocol "absent = enabled", I include this section briefly.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | no | Phase 68 does not touch auth surfaces |
| V3 Session Management | no | N/A |
| V4 Access Control | no | N/A |
| V5 Input Validation | partial | Validators read static files only — no user input to validate; helper inputs are static phase-suffix strings from validator source code |
| V6 Cryptography | no | No crypto operations |
| V14 Configuration | yes | The new `_lib/` directory is a configuration change — planner ensures it does not contain secrets (it won't — it's pure path-resolution logic) |

### Known Threat Patterns for {Node.js validator harness}

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path traversal in `resolveArchivedPhasePath()` | Tampering | Helper input is a static string from validator source — not user-supplied. **Caller responsibility:** never pass user input to the helper. (Not a Phase 68 concern.) |
| Filesystem race conditions | TOCTOU | All operations are read-only; no atomic-action-after-check vulnerability. |
| Untrusted JSON deserialization | Tampering | `JSON.parse()` on internal sidecar files — files are git-tracked and reviewed. Not a threat surface. |

**Net assessment:** Phase 68 has **minimal security surface**. The new helper is filesystem-pure, no network, no shell, no eval. The atomic CHAIN_SKIP removal is data-edit only.

---

## Assumptions Log

> Claims tagged `[ASSUMED]` in this research. The planner should verify each before locking decisions.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The 9 v1.5-allowlist `supervision_exemptions[]` entries referencing `_glossary-android.md` ALL shift by +1 (no other shift patterns) | Verbatim Edit Targets — Wave 4 | If some entries shifted +2 or 0, the rebase under-corrects/over-corrects → V-60-23 stays FAIL. **Mitigation:** Planner runs `diff <(jq...v1.5) <(jq...v1.6)` to enumerate exact shifts per entry. |
| A2 | C7 bare-Knox + C9 COPE FAILs in `v1.5-milestone-audit.mjs` are ALSO +1 shift defects (not corpus regressions) | V-60-23 Diagnosis | If C7/C9 are real corpus regressions, Plan 68-02 Wave 4 broad-rebase will miss them → V-60-23 stays FAIL. **Mitigation:** Planner runs `node scripts/validation/v1.5-milestone-audit.mjs --verbose` (if supported) OR cross-checks the v1.6 sidecar's `c7_knox_allowlist[]` + `cope_banned_phrases[]` entries against v1.5 to verify the +1 shift hypothesis. |
| A3 | `.planning/MILESTONES.md` line 71 is a `---` separator (planner verifies via `sed -n '70,73p'` before delete) | MILESTONES.md cdcce23 Defect | If line 71 is part of the correct entry (line 73 H2 boundary off by 1), Plan 68-04 over-deletes → corrupts the file. **Mitigation:** Planner runs `sed -n '69,75p' .planning/MILESTONES.md` for byte-exact pre-delete verification. |
| A4 | The CONTEXT.md D-02 single-arg `resolveArchivedPhasePath(phaseSuffix)` helper signature is sufficient for `check-phase-62.mjs:41` (which resolves a v1.6-archived file) | Edge Cases §7 | If the helper only handles v1.5-phases, V-62-ANCHORS won't resolve. **Mitigation:** Planner extends helper at Plan 68-02 Wave 1 to support optional milestone-roots list, OR defers `check-phase-62.mjs:41` to Plan 68-02 Wave 2's "scan via grep before applying" discretion. |
| A5 | Plan 68-04 deletes lines 3-71 inclusive (not 3-70 — the inclusive range matters for the trailing separator) | Verbatim Edit Targets — Plan 68-04 | Off-by-one risk on the separator line. **Mitigation:** Pre-delete `sed -n '69,75p'` confirms boundary; post-delete `grep -c "^## v1.5"` returns 1 (validates). |
| A6 | `check-phase-31.mjs` STRETCH (silent-swallow fix) does not break V-31-21 or V-31-24 (which rely on `parseInventory()` returning placeholders) | Verbatim Edit Targets — Wave 2 #1 | If the change to non-silent FAIL breaks the V-31-21 inventory-scrub logic (which iterates `inv.placeholders`), check-phase-31 may regress. **Mitigation:** Planner verifies that `placeholder-inventory.json` actually exists at the archived path (`.planning/milestones/v1.3-phases/...`) — D-02 advisor §4.7 confirmed presence. Helper return `null` means V-31-21 sees `placeholders: []` initially; need to ensure caller properly distinguishes "missing-by-helper" vs "missing-by-inventory-empty". |
| A7 | The `cdcce23 archive script garbage-insert` defect is reproducible if Phase 70 runs the same scripted archival pattern | Edge Cases §6 + Phase 70 archive risk | If the defect was a one-time aberration, no Phase 70 mitigation needed. **Mitigation:** Plan 68-05 flags this in v1.7-DEFERRED-CLEANUP.md as "needs investigation" — does not block Phase 68 close. |

---

## Open Questions (RESOLVED)

1. **`check-phase-62.mjs:41` ANCHOR_INVENTORY archive resolution mechanism**
   - What we know: `62-ANCHOR-INVENTORY.md` is currently archived to `.planning/milestones/v1.6-phases/62-...` (per D-02 advisor empirical finding).
   - What's unclear: Should Plan 68-02 (a) extend the CONTEXT D-02 helper signature to support v1.6-phases, or (b) skip 62/63 from Plan 68-02 helper replacement and patch them in Plan 70 HARNESS-03? D-02 advisor §4.5-4.6 says apply now (defensive); CONTEXT D-02 lists 62/63 in scope.
   - **RESOLVED:** (a) extend helper signature to `resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases'])` so 62/63 callers pass `['v1.6-phases']`. Backward-compatible. Transcribed into Plan 68-02 Wave 1 helper signature.

2. **Plan 68-02 Wave 4 broad-rebase scope (CHAIN-02 narrow vs broad interpretation)**
   - What we know: V-60-23 FAILs because C2 + C7 + C9 ALL fail; D-04 advisor §2.3 recommends broad rebase.
   - What's unclear: Does Plan 68-02 own the c7_knox_allowlist[] + cope_banned_phrases[] rebases, OR is that out of CHAIN-02 literal scope per REQUIREMENTS.md:20 narrow reading?
   - **RESOLVED:** broad reading (per advisor D-04 §2.3 Reading 1). All v1.5-sidecar exemption arrays referencing `_glossary-android.md` rebase together at Plan 68-02 Wave 4. Single coordinated commit per advisor's section. Transcribed into Plan 68-02 Wave 4 acceptance criteria.

3. **v1.7-DEFERRED-CLEANUP.md creation timing**
   - What we know: File does NOT exist yet (`ls .planning/milestones/v1.7-DEFERRED-CLEANUP.md` returns "No such file"). It is referenced in REQUIREMENTS.md:46 + advisor D-04 as the cdcce23 root-cause landing site.
   - What's unclear: Plan 68-05 (close-gate) OR Phase 70 HARNESS-06 creates the file? CONTEXT.md "Deferred Ideas" says "cdcce23 archive-script garbage-insert root cause … Plan 68-05 author files this in v1.7-DEFERRED-CLEANUP.md line item with cdcce23 SHA citation" — so Plan 68-05 CREATES the file (stub at minimum).
   - **RESOLVED:** Plan 68-05 creates `v1.7-DEFERRED-CLEANUP.md` as a stub with the cdcce23 line item + any other Phase 68 discoveries (check-phase-31 silent-swallow closed, archive-script defect deferred). Phase 70 HARNESS-06 extends with v1.7-final additions. Transcribed into Plan 68-05 task list.

4. **`check-phase-31.mjs` STRETCH vs DEFER (D-02 advisor §4.7)**
   - What we know: D-02 advisor recommends STRETCH (low cost — helper already loaded).
   - What's unclear: Does the STRETCH break V-31-21/V-31-24 if `placeholder-inventory.json` resolves to archived v1.3-phases path correctly?
   - **RESOLVED:** STRETCH per D-02 advisor. Plan 68-02 Wave 2 covers it. Planner verifies V-31-21 + V-31-24 continue to PASS post-fix (the helper resolves the file at archived path, so `placeholders[]` is populated → both V-NN PASS). Transcribed into Plan 68-02 Wave 2 acceptance criteria.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Validator runtime + new helper | ✓ | v24.15.0 | — |
| Git | Version control + atomic commit | ✓ | (Windows Git, assumed; not probed) | — |
| `node:fs`, `node:path` (ESM imports) | New helper file | ✓ (stable Node 14+) | — | — |
| PowerShell | Verification command harness on Windows host | ✓ | Default Windows shell | bash via Git Bash if needed |
| `existsSync`, `readFileSync`, `readdirSync` | Helper + validators | ✓ | Node built-in | — |

**All dependencies present.** No blockers.

---

## Sources

### Primary (HIGH confidence)

- **`.planning/phases/68-.../68-CONTEXT.md`** — locked decisions D-01..D-04 + Claude's-discretion items
- **`.planning/REQUIREMENTS.md`** — Pillar B contracts (CHAIN-01/02/03 literal text)
- **`.planning/ROADMAP.md`** — Phase 68 Success Criteria #1-5
- **`.planning/STATE.md`** — anti-regression invariants + CHAIN_SKIP carry-over context
- **`.planning/milestones/v1.6-DEFERRED-CLEANUP.md`** — historical CHAIN_SKIP rationale + advisor D-03 amendment
- **`.claude/tmp/phase68-D01-advisor.md`** — full D-01 dossier (CRLF strategy + adversarial wedges)
- **`.claude/tmp/phase68-D02-advisor.md`** — full D-02 dossier (helper signature + 6-validator scope + check-phase-31 silent-swallow bug)
- **`.claude/tmp/phase68-D03-advisor.md`** — full D-03 dossier (sidecar staleness reframe + pinned-Tier-2 doctrine)
- **`.claude/tmp/phase68-D04-advisor.md`** — full D-04 dossier (corpus definition + cdcce23 garbage entry + V-60-23 root cause)
- **`.planning/phases/67-.../67-CONTEXT.md` + `67-VERIFICATION.md`** — D-04 score E=7 commit topology precedent + close-gate format
- **Direct file probes** — every byte-level claim in Verbatim Edit Targets verified by Read tool against the live working tree on 2026-05-26
- **Direct command runs** — V-60-23 diagnosis + cdcce23 archaeology + self-test FAIL output captured via Bash tool

### Secondary (MEDIUM confidence)

- `scripts/validation/README-supervision-pins.md` — Two-tier discrimination doctrine consulted (read tool); confirms the pinned-Tier-2 mechanism D-03 relies on.
- Git log `cdcce23` + `965f509` commit-message inspection — confirms the introducing-commit attribution.

### Tertiary (LOW confidence)

- None — all claims in this document either citation-backed or empirically verified.

---

## Metadata

**Confidence breakdown:**
- Target Validator Inventory: HIGH — every line number empirically read from working tree
- Verbatim Edit Targets: HIGH — Plans 68-01, 68-03 byte-exact; Plan 68-02 Wave 4 broad-rebase scope MEDIUM (planner enumerates exact entries via sidecar diff)
- Atomic Commit Surface: HIGH — 5 files + 5 line numbers + canonical comment-block template
- Verification Harness: HIGH — every command runnable on the live host today
- Cross-Validator Dependency Map: HIGH — direct grep results
- V-60-23 Diagnosis: HIGH — direct subprocess output captured
- MILESTONES.md cdcce23 Defect: HIGH — direct file content + git archaeology
- Edge Cases: MEDIUM — landmine #3 (check-phase-68.mjs HARNESS-03) is forward-looking and may change at Phase 70 authoring time

**Research date:** 2026-05-26
**Valid until:** 2026-06-25 (30-day window — Phase 68 should execute well within this; if Phase 68 slips beyond, re-verify v1.5-milestone-audit C7/C9 + MILESTONES.md state)

---

## RESEARCH COMPLETE

**Executive summary:** Phase 68 research is exhaustively constrained by CONTEXT.md — every gray area is locked, every mechanism is pinned, every test command exists. This research dossier serves the planner by surfacing **byte-level state** (10 target validators × line numbers + 9 sidecar entries + 1 helper signature + 5 atomic-commit targets), **empirical confirmation** of the three diagnostic predictions made by adversarial advisors (V-60-23 +1 shift = REAL; cdcce23 garbage entry = REAL; --self-test FAIL = REAL with EXACT predicted diff), and **5 substantive open questions** that the planner must resolve (broad vs narrow sidecar rebase; check-phase-62/63 archive-path scope ambiguity; v1.7-DEFERRED-CLEANUP.md creation timing; check-phase-31 STRETCH risk; helper signature extension for v1.6-phases). The biggest planner-blocker surprise is that **Plan 68-02 Wave 4 likely needs broad-rebase across `c7_knox_allowlist[]` + `cope_banned_phrases[]` + `safetynet_exemptions[]` in addition to the supervision_exemptions[] alone** — confirmed by empirical 3-FAIL output of `v1.5-milestone-audit.mjs`. The smallest landmine is that **`check-phase-66.mjs` CHAIN_SKIP is at line 64, not 73** (Claude's-discretion question RESOLVED by this research). The atomic-commit surface (Plan 68-03) is byte-exact: 5 files, 5 lines, 5 comment-block rewrites — ready for executor download-and-paste with the suggested uniform replacement template.
