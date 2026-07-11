# Phase 128: V116 Pin + 15th Path-A Lineage Bump + Terminal Close - Pattern Map

**Mapped:** 2026-07-11
**Files analyzed:** 13 (1 lib modify, 2 new harness/sidecar, 3 new check-phase validators, 8 modify-in-place
converted validators, 1 new CI workflow, 1 modify supervision-pin regenerator)
**Analogs found:** 13 / 13 — this phase is a pure Path-A copy-and-repoint; every file has an exact-lineage
predecessor. There is no "No Analog Found" section.

**Read-only note:** all excerpts below are extracted from files also cited in `128-CONTEXT.md` /
`128-RESEARCH.md`; nothing was modified to produce this map.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|-----------------|----------------|
| `scripts/validation/_lib/frozen-at-close.mjs` | utility (library) | transform (git-show frozen read) | its own V115 entry (self, prior milestone block) | exact |
| `scripts/validation/v1.17-milestone-audit.mjs` | validator (harness) | batch/CRUD-scan | `scripts/validation/v1.16-milestone-audit.mjs` | exact (Path-A copy) |
| `scripts/validation/v1.17-audit-allowlist.json` | config (sidecar data) | batch (declarative exemption data) | `scripts/validation/v1.16-audit-allowlist.json` | exact (Path-A copy + targeted repoint) |
| `scripts/validation/check-phase-128.mjs` (apex) | validator (test/CI) | batch (chain-recursion) | `scripts/validation/check-phase-125.mjs` | exact (Path-A copy, range bump) |
| `scripts/validation/check-phase-126.mjs` (non-apex) | validator (test/CI) | request-response (single-shot) | `scripts/validation/check-phase-123.mjs` | exact (Path-A shape; needles differ) |
| `scripts/validation/check-phase-127.mjs` (non-apex) | validator (test/CI) | request-response (single-shot) | `scripts/validation/check-phase-124.mjs` | exact (Path-A shape; needles differ) |
| `scripts/validation/check-phase-49.mjs` (MODIFY) | validator (test/CI) | transform (live→frozen read conversion) | `scripts/validation/check-phase-50.mjs` (existing `readAtV114Close` conversion) | exact (conversion-pattern analog, not phase-content analog) |
| `scripts/validation/check-phase-58.mjs` (MODIFY) | validator (test/CI) | transform | `scripts/validation/check-phase-51.mjs` (existing `readAtV115Close` conversion) | exact |
| `scripts/validation/check-phase-59.mjs` (MODIFY) | validator (test/CI) | transform | `scripts/validation/check-phase-51.mjs` | exact |
| `scripts/validation/check-phase-62.mjs` (MODIFY) | validator (test/CI) | transform | `scripts/validation/check-phase-51.mjs` | exact |
| `scripts/validation/check-phase-101.mjs` (MODIFY) | validator (test/CI) | transform | `scripts/validation/check-phase-51.mjs` | exact |
| `scripts/validation/check-phase-109.mjs` (MODIFY) | validator (test/CI) | transform | `scripts/validation/check-phase-51.mjs` | exact |
| `scripts/validation/check-phase-118.mjs` (MODIFY) | validator (test/CI) | transform | `scripts/validation/check-phase-51.mjs` | exact |
| `scripts/validation/check-phase-121.mjs` (MODIFY) | validator (test/CI) | transform | `scripts/validation/check-phase-51.mjs` | exact |
| `.github/workflows/audit-harness-v1.17-integrity.yml` | config (CI workflow) | event-driven (paths-triggered) | `.github/workflows/audit-harness-v1.16-integrity.yml` | exact (Path-A copy + paths repoint) |
| `scripts/validation/regenerate-supervision-pins.mjs` (MODIFY) | utility (advisory tool) | batch (comment-only append) | its own BASELINE_20 comment block (self, prior milestone) | exact |

## Pattern Assignments

### 1. `scripts/validation/_lib/frozen-at-close.mjs` (utility/library, MODIFY)

**Analog:** its own existing `V115` entry + `readAtV115Close` export (this file IS the copy-source; the pattern
is "add one more of the same shape").

**MILESTONE_CLOSE_SHAS tail — exact insertion shape** (`frozen-at-close.mjs:62-71`, current V115 entry + the
comment placeholder this phase resolves):
```javascript
V115: '29a3599',  // Phase 119 Plan 119-07 close-gate — v1.15 milestone close-gate; atom == close-gate.
                  // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                  // `git log -1 --format=%s 29a3599`). Do NOT pin a SUMMARY follow-up (the V114
                  // f3959c8 trap). Single entry — same single-entry pattern as V18..V114 (back-anchor
                  // invariant: V115 references a PAST close SHA; the V116 pin is deferred to v1.17 per
                  // the back-anchor rule — this phase adds only the v1.15 close pin).
// V14 omitted — RETRO-01 must surface a v1.4-close-state assertion in check-phase-{48..66}.mjs
// before adding (v1.4 close was Phase 42, predating chain validators).
// Candidates if needed: b5cf529 or 671f72a (D-02 advisor pre-scan).
```

**Target insertion (per RESEARCH.md Pattern 1, positively-confirmed SHA `3dd251249a812e31147cd653a7ad01e6878c091b`
→ short `3dd2512`):**
```javascript
V116: '3dd2512',  // Phase 125 Plan 125-07 close-gate — v1.16 milestone close-gate; atom == close-gate.
                  // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                  // `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1
                  // --format=%H` -> 3dd251249a812e31147cd653a7ad01e6878c091b, subject: "docs(125-07):
                  // Phase 125 close-gate — v1.16 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability +
                  // apex-range correction + v1.16 MILESTONE CLOSE"). Single entry — same single-entry
                  // pattern as V18..V115 (back-anchor invariant: V116 references a PAST close SHA; the
                  // V117 pin is deferred to v1.18 per the back-anchor rule).
```
Insert directly after the `V115` block (before the `// V14 omitted` comment, preserving that comment's position
relative to the object — it is a standalone comment inside the object literal, not attached to V115).

**readAtV115Close export tail — exact shape** (`frozen-at-close.mjs:92-105`, the convenience-export block):
```javascript
// Convenience exports for readability at call-sites
export const readAtV141Close      = (p) => readAtClose('V141',         p);
export const readAtV15Close       = (p) => readAtClose('V15',          p);
export const readAtV16Close       = (p) => readAtClose('V16',          p);
export const readAtV17Close       = (p) => readAtClose('V17',          p);
export const readAtV17CloseGate   = (p) => readAtClose('V17_CLOSEGATE', p);
export const readAtV18Close       = (p) => readAtClose('V18',          p);
export const readAtV19Close       = (p) => readAtClose('V19',          p);
export const readAtV110Close      = (p) => readAtClose('V110',         p);
export const readAtV111Close      = (p) => readAtClose('V111',         p);
export const readAtV112Close      = (p) => readAtClose('V112',         p);
export const readAtV113Close      = (p) => readAtClose('V113',         p);
export const readAtV114Close      = (p) => readAtClose('V114',         p);
export const readAtV115Close      = (p) => readAtClose('V115',         p);
```

**Target addition (append after `readAtV115Close`):**
```javascript
export const readAtV116Close      = (p) => readAtClose('V116',         p);
```

**What changes:** exactly 2 additions — one `MILESTONE_CLOSE_SHAS` key/comment block, one export line. No other
line in the file changes (frozen-surface-adjacent but this file itself is the mutable pin registry, not a frozen
surface).

---

### 2. `scripts/validation/v1.17-milestone-audit.mjs` (validator/harness, NEW)

**Analog:** `scripts/validation/v1.16-milestone-audit.mjs` (Path-A copy, C1–C17 inherited verbatim).

**Header/version-constants block to repoint** (`v1.16-milestone-audit.mjs:1-6`):
```javascript
#!/usr/bin/env node
// v1.16 Milestone Audit Harness (Path A copy of v1.15; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → v1.12 → v1.13 → v1.14 → v1.15 → v1.16; C1-C16 inherited verbatim from v1.15 [no freshness-threshold change this milestone]; C17 (EEE contract) inherited verbatim from v1.15 [already FOLDED IN per Phase 119 D-119 — subprocess-spawn of c17-eee-contract.mjs — see check id 17; NOT re-folded this milestone])
// Source of truth: .planning/phases/125-v115-pin-14th-path-a-lineage-bump-terminal-close/125-CONTEXT.md (D-125-1..D-125-4)
// Sidecar allow-list: scripts/validation/v1.16-audit-allowlist.json (v1.16 Path-A from v1.15 — docs/_glossary-android.md + docs/android-lifecycle/00-enrollment-overview.md + docs/android-lifecycle/03-android-version-matrix.md C2/C7/C9 line-pins TARGETED-repointed per the Phase-121/122 EEE-retrofit blockquote-split drift; confirmed against live corpus, not copied verbatim; the OTHER 5 C2/C7/C9-pinned files remain byte-unchanged since v1.15 close and are copied verbatim)
// Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close
// File reads: C1-C16 load all content via fs.readFileSync (no shell invocations). C17 (id 17) spawns a subprocess (execFileSync node c17-eee-contract.mjs) — the one shell invocation in this harness, treated exit-code-as-pass/fail per the check-phase-112.mjs AUDIT-HARNESS spawn precedent.
```
**Repoint for v1.17:** `v1.16` → `v1.17` everywhere in this block (name, lineage tail `...v1.15 → v1.16 → v1.17`,
source-of-truth path → `128-*/128-CONTEXT.md`, sidecar reference → `v1.17-audit-allowlist.json`, sidecar
provenance comment → describe the 4-file `-1` line-shift repoint done THIS phase per D-128-C extended finding
(NOT the Phase-121/122 blockquote-split cause — that was v1.16's drift cause; v1.17's is HYG-02's frontmatter
deletion), C1–C17 stays "inherited verbatim from v1.16".

**Allowlist-sidecar load — exact function** (`v1.16-milestone-audit.mjs:79-80` header, function body not shown
here but referenced by name; the load call itself lives later in the file as `const ALLOWLIST = parseAllowlist(...)`):
```javascript
// parseAllowlist: load and parse the committed JSON sidecar (D-26 contract).
// Follows check-phase-31.mjs parseInventory() degradation pattern -- degrade to empty arrays on parse failure.
```
**Repoint:** the sidecar path constant inside `parseAllowlist()` (and the CI `path-match` job's `grep` target)
must read `scripts/validation/v1.17-audit-allowlist.json`, not `v1.16-*`.

**Exact-match C1/C2 logic — the 35-pin landmine site** (`v1.16-milestone-audit.mjs:266-268` C1 SafetyNet,
`:300-301` C2 supervision):
```javascript
// C1 (SafetyNet), line 266-268
const pinned = ALLOWLIST.safetynet_exemptions.some(
  e => e.file === relPath && e.line === lineNum
);
```
```javascript
// C2 (supervision), line 300-301
const pinned = ALLOWLIST.supervision_exemptions.some(
  e => e.file === relPath && e.line === lineNum
);
```
**Do NOT touch this logic** — it is the frozen C1–C17 check-body code (byte-identical Path-A inheritance). The
landmine is entirely on the sidecar-data side (file 3 below), because this harness reads the 5 HYG-02 files at
LIVE HEAD (post-line-shift) while the copied sidecar pins reference PRE-shift line numbers.

**What changes:** header comments (name/lineage/source-of-truth/sidecar-provenance), the sidecar path string,
and nothing else — C1–C17 check bodies are byte-copied.

---

### 3. `scripts/validation/v1.17-audit-allowlist.json` (config/sidecar, NEW)

**Analog:** `scripts/validation/v1.16-audit-allowlist.json`.

**Top-of-file structural shape** (`v1.16-audit-allowlist.json:1-10`):
```json
{
  "schema_version": "1.1",
  "generated": "2026-07-09T00:00:00Z",
  "phase": "125-v115-pin-14th-path-a-lineage-bump-terminal-close",
  "safetynet_exemptions": [
    {
      "file": "docs/_glossary-android.md",
      "line": 187,
      "reason": "Phase 62 carry-over: ... Play Integrity prose references SafetyNet as predecessor (historical context)"
    },
```
**Repoint:** `generated` → Phase-128 authoring date; `phase` →
`"128-v116-pin-15th-path-a-lineage-bump-terminal-close"`.

**The 4 stale-pin sample entries requiring the -1 line-shift** (exact live text, from
`v1.16-audit-allowlist.json`):
```json
{
  "file": "docs/_glossary-android.md",
  "line": 38,
  "reason": "Phase 125 v1.16 EEE-retrofit repoint (was line 18): Alphabetical Index entry -- [Supervision](#supervision) link (2 raw matches on one line: display text + anchor fragment)"
},
```
```json
{
  "file": "docs/_glossary-android.md",
  "line": 94,
  "reason": "Phase 125 v1.16 EEE-retrofit repoint (was line 51, single blockquote, second half after the #12 split): 'Do not conflate COBO with iOS supervision state; supervision is a permanent per-device gating state on iOS, whereas COBO is an ownership-mode designation on Android.' -- 2 raw matches; same COBO cross-platform disambiguation content as the line-90 companion fragment, both descending from the single v1.15 line-51 pin"
},
```
```json
{
  "file": "docs/admin-setup-android/03-fully-managed-cobo.md",
  "line": 52,
  "reason": "v1.5 inherit baseline 2026-04-26; Phase 119 repoint: was line 36, +16 from Phase-118 RETRO-03 EEE header-block + ## Summary insertion -- 'closest analog to iOS Supervision' cross-platform note (iOS-attributed, intentional disambiguation); byte-unchanged since v1.15 close (0 commits since 29a3599) -- verbatim carry, not repointed this milestone"
},
```
```json
{
  "file": "docs/reference/android-capability-matrix.md",
  "line": 123,
  "reason": "Phase 119 repoint (was line 89; +34 from Phase-118 RETRO-03 EEE header-block + Version-History-row insertion): AEAUDIT-04 doctrine HTML comment header -- 'supervision in this section MUST appear only as an iOS-attributed reference'; byte-unchanged since v1.15 close (0 commits since 29a3599) -- verbatim carry, not repointed this milestone"
},
```
**What changes (per RESEARCH.md's definitive enumeration):** for these 4 files' pins ONLY — apply a uniform
`-1` line-shift and re-verify each new line still contains the expected needle (do NOT blind-decrement without
re-reading; see RESEARCH Pitfall 3), then update the `reason` string to record "Phase 128 HYG-02 repoint (was
line N): -1 from HYG-02 frontmatter-line deletion (commit 7dda1f7)":
- `docs/_glossary-android.md` — 21 pins (lines 38, 90, 94, 126, 128, 130, 132, 146, 148, 152, 187, 202, 219,
  221 (×2), 225, 304, 331, 333, 334, 338) → each becomes `line - 1`.
- `docs/reference/android-capability-matrix.md` — 8 pins (75, 123, 125, 126, 128, 130, 134, 135) → each
  becomes `line - 1`.
- `docs/admin-setup-android/03-fully-managed-cobo.md` — 3 pins (52, 54, 199) → each becomes `line - 1`.
- `docs/android-lifecycle/03-android-version-matrix.md` — 3 pins (58, 102, 104) → each becomes `line - 1`.
- `docs/admin-setup-android/04-byod-work-profile.md` — 0 line-pins (only a `count`-based tracker; unaffected).
- All OTHER ~470+ entries across all other files: copy byte-verbatim (no change).

Mirror the precedent documented in `v1.16-milestone-audit.mjs`'s own header comment (line 4) for how a targeted
repoint is described: **"TARGETED-repointed ... confirmed against live corpus, not copied verbatim; the OTHER
N files remain byte-unchanged ... and are copied verbatim."**

---

### 4. `scripts/validation/check-phase-128.mjs` (validator/apex, NEW)

**Analog:** `scripts/validation/check-phase-125.mjs`.

**CHAIN_PHASES declaration + throw guards — exact model** (`check-phase-125.mjs:56-75`):
```javascript
// Phase 125 chain-apex extends the chain through Phase 124 (every integer 48..124).
// 77 entries: integers 48 through 124 inclusive. [48..N-1] invariant: apex EXCLUDES its own phase.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
                      67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
                      86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,
                      104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,
                      119,120,121,122,123,124];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress (D-125-1 / SC#2).
// NEVER add entries: V-125-SELF hard-asserts CHAIN_SKIP.size === 0.
const CHAIN_SKIP = new Set([]);

// Programmatic bound assertions (fail-loud at module load if the chain topology drifts):
// CHAIN_PHASES must be exactly 77 entries and terminate at 124 (the [48..N-1] invariant for N=125).
if (CHAIN_PHASES.length !== 77) {
  throw new Error('check-phase-125 CHAIN_PHASES length ' + CHAIN_PHASES.length + ' !== 77 (integers 48..124 inclusive)');
}
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 124) {
  throw new Error('check-phase-125 CHAIN_PHASES must span 48..124 (got ' + CHAIN_PHASES[0] + '..' + CHAIN_PHASES[CHAIN_PHASES.length - 1] + ')');
}
```
**CRITICAL — the length/terminus hard-throw MUST be updated** (RESEARCH Pitfall 2 / CONTEXT grounding
correction #5): `!== 77` → `!== 80`; terminus `!== 124` → `!== 127`; array literal extends `...,125,126,127`
(80 entries total, 48..127 inclusive). Rename `check-phase-125` → `check-phase-128` in every error string and
the `HARNESS` constant target (`scripts/validation/v1.16-milestone-audit.mjs` → `v1.17-milestone-audit.mjs`).

**CHAIN_SKIP.size===0 assertion — V-NNN-SELF dual-invariant** (`check-phase-125.mjs:163-180`):
```javascript
// === V-125-SELF: dual-invariant guard (CHAIN_PHASES excludes 125; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-125-SELF: CHAIN_PHASES does NOT include 125; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(125)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 125 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [48..124] (77 entries; 125 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```
**Repoint:** `125` → `128` throughout; the closing pass-detail string → `'CHAIN_PHASES = [48..127] (80 entries; 128 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)'`.

**Also copy verbatim (unchanged structurally, only ID/name/HARNESS-target strings repoint):** the `V-128-AUDIT`
check (VERIFICATION-heading presence, `check-phase-125.mjs:79-95`), the `V-128-CHAIN-NN` loop (`:97-136`,
NESTED-aware `execFileSync` subprocess pattern with `isPeer = phaseNum >= 67` / 600s timeout), the
`V-128-AUDIT-HARNESS` subprocess check (`:138-161`, targets the renamed harness file), and the runner loop
(`:182-209`, only the banner string `'check-phase-128 -- Phase 128 deliverables (...)'` changes).

**What changes:** file header comment (Phase-128-specific narrative + `128-CONTEXT.md`/`128-RESEARCH.md`
source-of-truth path), `HARNESS` constant, `CHAIN_PHASES` array (80 entries, 48..127), both throw literals
(80/127), all `125`→`128` self-references, `V-125-*` id/name strings → `V-128-*`.

---

### 5. `scripts/validation/check-phase-126.mjs` + `check-phase-127.mjs` (validator/non-apex, NEW)

**Analog:** `scripts/validation/check-phase-123.mjs` (`CHAIN_PHASES = []` shape) / `check-phase-124.mjs`
(same shape, alternate content-needle example).

**Empty-chain shape — exact lines** (`check-phase-123.mjs:34-36`, identical at `check-phase-124.mjs:33-35`):
```javascript
// Lightweight: NO chain (chain lives only in apex check-phase-125.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
```
**Repoint:** the apex reference in the comment → `check-phase-128.mjs`.

**presence() helper + needle-check pattern (generic, reusable for either 126 or 127)** (`check-phase-123.mjs:44-55`):
```javascript
function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-123-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}
```

**SELF dual-invariant guard (no chain, so no CHAIN_PHASES.includes-self special case beyond the same shape)**
(`check-phase-123.mjs:98-112`):
```javascript
// === V-123-SELF: dual-invariant guard (CHAIN_PHASES excludes 123; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-123-SELF: CHAIN_PHASES does NOT include 123; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(123)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 123 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (123 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```
**What changes:** `123`/`124` → `126`/`127` respectively throughout; deliverable path constants and their
needle checks are entirely phase-content-specific — derive them from `126-VERIFICATION.md` /
`127-VERIFICATION.md` "Required Artifacts / Observable Truths" (mirrors how `check-phase-123.mjs`'s needles
were derived inline from `123-VERIFICATION.md` per its own header comment at line 5-8, and
`check-phase-124.mjs`'s from `124-VERIFICATION.md`). This phase's own scope only names the VALIDATOR shape, not
the specific 126/127 content needles (those are Phase 126/127's already-shipped deliverables — HARN-08/09/10
only require these validators exist with the correct empty-chain/SELF-guard skeleton wrapping whatever
presence/content needles best regression-guard Phase 126's `.docx` bundle pipeline and Phase 127's Stop-hook).

---

### 6. `.github/workflows/audit-harness-v1.17-integrity.yml` (config/CI workflow, NEW)

**Analog:** `.github/workflows/audit-harness-v1.16-integrity.yml`.

**Header comment block + `paths:` trigger — exact lines to repoint** (`audit-harness-v1.16-integrity.yml:1-25`):
```yaml
# v1.16 Audit Harness Integrity
# v1.16 integration surface. v1.4 + v1.4.1 + v1.5 + v1.6 + v1.7 + v1.8 + v1.9 + v1.10 + v1.11 + v1.12 + v1.13 + v1.14 + v1.15 harnesses frozen in their respective workflow files.
# Phase 125 HARN-06: 13th coexistence workflow. path-filter v1.16-scoped + 2 crons + parse/path-match/harness-run repointed v1.16 +
# pin-helper-advisory + rotting-external-quarterly + active check-phase-120..125 invocations.
# PRESERVES from Phase 69 dd1ff08 + 85521bb + 2d61981 (inherited verbatim via v1.13/v1.14/v1.15 Path-A):
#   linux-chain-ubuntu-latest fetch-depth:0 (FETCH-DEPTH-01 inheritance contract)
#   linux-chain-ubuntu-latest core.autocrlf false (LF-fidelity contract)
#   linux-chain-ubuntu-latest continue-on-error:false (D-A9 PR-blocking contract)
#   linux-chain-ubuntu-latest timeout-minutes:30
#   chain-apex CHAIN_TIMING_LINUX ::notice emission
# DUAL-APEX (Pitfall 6, D-125-4): the standalone check-phase-125 job AND linux-chain-ubuntu-latest BOTH run
#   the full apex recursion 48..124. This is intentional and audited -- do NOT deduplicate, and do NOT add
#   CHECK_PHASE_NESTED=1 to either top-level GHA invocation.

name: Audit Harness v1.16 Integrity

on:
  pull_request:
    paths:
      - 'scripts/validation/v1.16-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.16-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.16-MILESTONE-AUDIT.md'
      - '.planning/milestones/v1.16-DEFERRED-CLEANUP.md'
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch: 08:00 UTC every Monday (Path-A from v1.6)
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check: 08:00 UTC on 1st of Jan/Apr/Jul/Oct (Phase 70 HARNESS-04 inheritance from Phase 66 AUDIT-14)
  workflow_dispatch:
```
**Repoint:** all `v1.16` → `v1.17` (name, `paths:` entries incl. MILESTONE-AUDIT/DEFERRED-CLEANUP paths); "13th
coexistence workflow" → **"14th"** (RESEARCH grounding correction #7 — v1.17 is the 15th Path-A lineage bump but
only 14th CI coexistence workflow, do NOT mislabel as "15th/14th"); the `check-phase-*.mjs` glob line and
`.planning/REQUIREMENTS.md` line stay unchanged (already generic); the DUAL-APEX comment's phase numbers
`check-phase-125` / `48..124` → `check-phase-128` / `48..127`.

**`linux-chain-ubuntu-latest` job — preserve verbatim (D-128-B mandatory rider)** (`:77-95`):
```yaml
  linux-chain-ubuntu-latest:
    name: Validator chain on Linux LF (Phase 69 CILINUX-01)
    runs-on: ubuntu-latest
    needs: harness-run
    timeout-minutes: 30
    continue-on-error: false
    steps:
      - name: Disable autocrlf BEFORE checkout (LF-fidelity contract)
        run: git config --global core.autocrlf false
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run chain-apex check-phase-125.mjs (recursively spawns 48..124)
        run: |
          START=$(date +%s)
          node scripts/validation/check-phase-125.mjs --verbose
          END=$(date +%s)
          echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: deep-nest at [48..124]; subprocess timeout: 600s)"
```
**Repoint ONLY:** `check-phase-125.mjs` → `check-phase-128.mjs` (step name + `run:` command + the `::notice`
comment's `[48..124]` → `[48..127]`). PRESERVE verbatim: `core.autocrlf false`, `fetch-depth: 0`,
`continue-on-error: false`, `timeout-minutes: 30` — these are the D-128-B mandatory-rider invariants.

**Per-phase job list (`check-phase-120`..`check-phase-125` block, `:97-179`):** repoint the job-id/name/run-target
trio for the current milestone's own phases — new workflow carries `check-phase-126`, `check-phase-127`,
`check-phase-128` (apex, "recursively spawns 48..127") jobs, each `needs: harness-run`, `timeout-minutes: 15`
(30 for the apex job per the `check-phase-125` apex precedent at `:167-179`), `continue-on-error: false`. Drop
the `check-phase-120..124` job entries (those belong to v1.16's own workflow file, frozen).

**`parse` / `path-match` / `harness-run` / `pin-helper-advisory` / `rotting-external-quarterly` jobs (`:31-76`,
`:181-232`):** copy structurally verbatim, repoint every `v1.16-audit-allowlist.json` /
`v1.16-milestone-audit.mjs` string literal to `v1.17-*`.

---

### 7. `scripts/validation/regenerate-supervision-pins.mjs` (utility, MODIFY)

**Analog:** its own existing BASELINE_20 marker (self, prior milestone's comment block).

**BASELINE_20 comment block — exact text to model the BASELINE_21 insertion on** (`regenerate-supervision-pins.mjs:476-491`):
```javascript
// verified against HEAD a323332 (JIT pre-Atom-1 HEAD -- captured via `git rev-parse HEAD`
// immediately before authoring Atom 1, NOT the Wave-0 anchor c6ea8d2; an automated Jira-sync
// commit landed between Wave-0 and Atom 1, so the true pre-Atom-1 predecessor is a323332).
// BASELINE_9 entries above remain unchanged -- Phase 119 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 119
// close and remain valid for the v1.15 corpus. Resolution path: BASELINE_20 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.14 -> BASELINE_18 -> v1.15 -> BASELINE_19).
// BASELINE_20 refreshed 2026-07-09 (Phase 125 Plan 125-02): closes BASELINE_19 v1.15 carry-over
// per HARN-06 contract (REQUIREMENTS.md + ROADMAP.md Phase 125 SC#1); v1.16 line positions
// verified against HEAD 0d01eae8026318f74b4fb95624b247df575b38c7 (JIT pre-Atom-1 HEAD -- captured
// via `git rev-parse HEAD` immediately before authoring Atom 1, NOT the Wave-0 anchor 42b31c5;
// per 125-01's recorded Pitfall-2 distinction, the two anchors are captured separately by design).
// BASELINE_9 entries above remain unchanged -- Phase 125 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 125
// close and remain valid for the v1.16 corpus. Resolution path: BASELINE_21 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.15 -> BASELINE_19 -> v1.16 -> BASELINE_20).
const BASELINE_9 = [
```
**Target insertion (append a new comment block after the existing BASELINE_20 paragraph, mirroring its exact
shape — do NOT rename `BASELINE_9` the array identifier, only append a new trailing comment):**
```javascript
// BASELINE_21 refreshed <Phase-128-authoring-date> (Phase 128 Plan 128-0N): closes BASELINE_20 v1.16
// carry-over per HARN-09 contract (REQUIREMENTS.md + ROADMAP.md Phase 128 SC#2); v1.17 line positions
// verified against HEAD <Wave-0-pre-anchor-SHA> (JIT pre-Atom-1 HEAD -- captured via `git rev-parse HEAD`
// immediately before authoring Atom 1, per the Wave-0-vs-pre-Atom-1-anchor distinction established at
// Phase 119/125). BASELINE_9 entries above remain unchanged -- Phase 128 does NOT alter the line-coord
// array; this comment records the audit-trail event that line-positions were re-verified at Phase 128
// close and remain valid for the v1.17 corpus. Resolution path: BASELINE_22 will refresh at the next
// milestone close per the Path-A inheritance pattern (... -> v1.16 -> BASELINE_20 -> v1.17 -> BASELINE_21).
```
**What changes:** ONE appended comment block (per D-128-D: "BASELINE_21 is the correct freshness marker...
back-anchor to the Wave-0 / pre-Atom-1 HEAD"). The `BASELINE_9` line-coordinate array itself is NOT touched —
this file's array entries are re-verified, not re-generated, unless the plan-time HYG-02 diff-scope check
(RESEARCH Pitfall 3) surfaces an actual coordinate drift in one of these tracked occurrences.

---

### 8. D-128-C conversion set — representative predecessor validators (MODIFY, 8 files)

**Analog for the CONVERSION MECHANICS (not the phase-content):** two already-live `readAtVxxClose` conversions
elsewhere in the repo — `check-phase-50.mjs` (`readAtV114Close`) and `check-phase-51.mjs` (`readAtV115Close`).
These are the established "how to convert a live-HEAD reader to frozen-aware" precedent the RESEARCH file
points to (Pattern 4).

**Import line to add** (`check-phase-50.mjs:10`):
```javascript
import { readAtV114Close } from './_lib/frozen-at-close.mjs';
```
For Phase 128: `import { readAtV116Close } from './_lib/frozen-at-close.mjs';` — added to each of the 8 target
files' import block (none of the 8 currently import from `_lib/frozen-at-close.mjs`; verify each file's
existing import block before appending).

**Conversion-in-place shape #1 — inline try/catch at call-site** (`check-phase-50.mjs:269-277`, converting a
single check's `run()`):
```javascript
// pitfall` blockquote form is intact. Expected pattern UNCHANGED (no value-mask); only the read
// SOURCE moved live→frozen. Honest-accounting: .planning/phases/119-*/119-05-SUMMARY.md.
run() {
  let c;
  try { c = readAtV114Close(ADMIN_AGENT); } catch { c = null; }
  if (c === null) return { pass: false, detail: "File missing (frozen V114 read failed)" };
  if (/^> ⚠️ \*\*Known admin pitfall/m.test(c)) return { pass: true };
  return { pass: false, detail: "LIN-05 blockquote regex not found (frozen V114)" };
}
```

**Conversion-in-place shape #2 — extracted frozen-read helper function** (`check-phase-51.mjs:24-32`):
```javascript
// that V-51-06..11 assert. Assert the Phase-51 deliverable at the frozen v1.15 close
// (V115=29a3599 — the last state BEFORE the Phase-122 retrofit), where the Mermaid tree is
// intact. Expected patterns UNCHANGED (no value-mask); only the read SOURCE moved live→frozen.
// File-existence / frontmatter checks (V-51-01..05) intentionally stay LIVE (they pass on HEAD).
// Honest-accounting: .planning/phases/125-*/125-05-SUMMARY.md.
function readTreeFrozen() {
  try { return readAtV115Close(TREE); } catch { return null; }
}
```

**Target shape for the 8 files (per RESEARCH's enumerated live-HEAD read sites):**
```javascript
// Phase 128 D-128-C frozen-aware conversion: HYG-02 deleted a frontmatter line from
// docs/_glossary-android.md (or the applicable HYG-02 file) at live HEAD; this check's expected
// needle is UNCHANGED — only the read SOURCE moved live -> frozen (V116 = 3dd2512, the pre-HYG-02
// v1.16 close-gate). Honest-accounting: .planning/phases/128-*/128-0N-SUMMARY.md.
run() {
  let c;
  try { c = readAtV116Close(GLOSSARY_ANDROID_PATH); } catch { c = null; }
  if (c === null) return { pass: false, detail: '<...> missing (frozen V116 read failed)' };
  if (!c.includes(VHROW)) return { pass: false, detail: 'VHROW needle absent (frozen V116)' };
  return { pass: true, detail: '... present (frozen V116)' };
}
```
Applied per-site to the exact 14 checks enumerated in RESEARCH.md's "Confirmed live-HEAD readers" table:
`check-phase-49.mjs` (V-49-19, V-49-21), `check-phase-58.mjs` (V-58-13/16/17/18/19/22), `check-phase-59.mjs`
(V-59-05, V-59-36), `check-phase-62.mjs` (V-62-06..09), `check-phase-101.mjs` (V-101-BANNER),
`check-phase-109.mjs` (V-109-ROW-ANDROID), `check-phase-118.mjs` (V-118-PRESENCE-MATRIX/ENROLL/REFORMAT/
TABLE-REMEDIATION), `check-phase-121.mjs` (V-121-VHROW — its current live-HEAD read is shown below).

**The exact live-HEAD line being converted in `check-phase-121.mjs` (representative concrete target)**
(`check-phase-121.mjs:99-109`):
```javascript
// === V-121-VHROW: one-time "v1.16 EEE reformat" Version-History row landed ===
checks.push({
  id: 'VHROW',
  name: 'V-121-VHROW: "' + VHROW + '" Version-History row present in ' + DELIVERABLE_GLOSSARY_ANDROID,
  run() {
    const c = readFile(DELIVERABLE_GLOSSARY_ANDROID);
    if (c === null) return { pass: false, detail: DELIVERABLE_GLOSSARY_ANDROID + ' missing' };
    if (!c.includes(VHROW)) return { pass: false, detail: 'VHROW needle absent: ' + VHROW };
    return { pass: true, detail: 'one-time "' + VHROW + '" Version-History row present' };
  }
});
```
**Conversion:** replace `readFile(DELIVERABLE_GLOSSARY_ANDROID)` with a `readAtV116Close(DELIVERABLE_GLOSSARY_ANDROID)`
call wrapped in try/catch (mirroring the `check-phase-50.mjs` inline shape above); `VHROW` string and all other
logic/needles stay byte-identical (no value-masking).

**What changes per file:** (1) add the `readAtV116Close` import, (2) replace the specific `readFile(...)` /
`fs.readFileSync(...)` call(s) at the enumerated line(s) with `readAtV116Close(...)` wrapped in try/catch
(local var + null-check, following whichever of the two shapes above already fits the file's existing style),
(3) add a one-line "frozen-aware conversion" comment citing the phase and honest-accounting SUMMARY path. NO
other line changes — `CHAIN_PHASES`/`CHAIN_SKIP` stay exactly as they are in each file (still `[]` for the
non-apex ones, D-128-C mandatory constraint: `CHAIN_SKIP` stays empty on every touched validator).

---

## Shared Patterns

### Path-A copy-then-repoint (applies to files 2, 3, 4, 6)
**Source:** the entire v1.16 close scaffold (`v1.16-milestone-audit.mjs`, `v1.16-audit-allowlist.json`,
`check-phase-125.mjs`, `audit-harness-v1.16-integrity.yml`).
**Apply to:** every NEW file in this phase. Copy byte-for-byte, then repoint ONLY: version tokens (`v1.16`→
`v1.17`, `125`→`128`/`126`/`127`), numeric ranges (`77`→`80`, `124`→`127`), and provenance comments (source-of-truth
paths, sidecar-repoint rationale). Never redesign structure — RESEARCH.md's "Don't Hand-Roll" table names this
explicitly: "Any task that 'designs' new validator architecture... should be treated as a scope violation."

### Back-anchor pin, single-entry (applies to file 1)
**Source:** `scripts/validation/_lib/frozen-at-close.mjs` — the `V18`..`V115` single-entry lineage.
**Apply to:** the `V116` pin only. Never add a `V117` pin this phase (back-anchor invariant: pins reference only
PAST close SHAs).

### Frozen-aware read conversion (applies to file 8, the 8-validator conversion set)
**Source:** `scripts/validation/check-phase-50.mjs` (readAtV114Close) and `check-phase-51.mjs` (readAtV115Close).
**Apply to:** the exact 8 files / 14 checks enumerated in RESEARCH.md's definitive D-128-C table — no more, no
less. Converting any OTHER predecessor validator's reads is the out-of-scope
`FROZEN-AWARE-ADOPTION-SWEEP-01` (deferred to v1.18+).

### Exact-match sidecar line-pin repoint (applies to file 3 only, no other file shares this pattern)
**Source:** `v1.16-milestone-audit.mjs`'s own header-comment precedent for describing a targeted (non-verbatim)
sidecar repoint, plus the concrete C1/C2 `e.file === relPath && e.line === lineNum` exact-match code shown in
file 2's excerpt above.
**Apply to:** the 35 pins across 4 files in `v1.17-audit-allowlist.json` only.

### CHAIN_SKIP-stays-empty invariant (applies to files 4, 5, 8 — every touched/new validator)
**Source:** `check-phase-125.mjs:64-66`, `check-phase-123.mjs:36` / `:106-110` (the `V-NNN-SELF` hard-assert).
**Apply to:** `check-phase-128.mjs`, `check-phase-126.mjs`, `check-phase-127.mjs`, and all 8 converted files —
none may ever populate `CHAIN_SKIP` with an entry to force green (D-128-C mandatory constraint, GA3-C
self-disqualifier precedent).

## No Analog Found

None — every file in this phase's scope has an exact-lineage Path-A predecessor or a directly-applicable
established conversion pattern already live in the repo.

## Metadata

**Analog search scope:** `scripts/validation/` (all `check-phase-*.mjs`, `v1.16-*`, `_lib/frozen-at-close.mjs`,
`regenerate-supervision-pins.mjs`), `.github/workflows/` (`audit-harness-v1.16-integrity.yml` and siblings).
**Files scanned:** `frozen-at-close.mjs`, `check-phase-{50,51,58,101,109,118,121,123,124,125}.mjs`,
`v1.16-milestone-audit.mjs`, `v1.16-audit-allowlist.json`, `audit-harness-v1.16-integrity.yml`,
`regenerate-supervision-pins.mjs` — 15 files read this session (all excerpts above are non-overlapping targeted
reads; no file re-read).
**Pattern extraction date:** 2026-07-11

## PATTERN MAPPING COMPLETE
