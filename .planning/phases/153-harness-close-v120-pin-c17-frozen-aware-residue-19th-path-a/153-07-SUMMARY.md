---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
plan: 07
subsystem: testing
tags: [validators, content-leaf, application-updates, firmware-bios, dfci, oem-matrix, needle-doctrine]

# Dependency graph
requires:
  - phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
    provides: "the content-leaf template (check-phase-126.mjs) and the D-22..D-28/D-38 needle doctrine (153-05, 153-06, 153-CONTEXT.md)"
provides:
  - "check-phase-148.mjs -- asserts Phase 148's Autopatch delta guide and application-update governance guide, with positive needles replacing 148-VERIFICATION.md's non-transcribable git-diff-against-base-SHA assertions"
  - "check-phase-149.mjs -- asserts Phase 149's greenfield firmware/BIOS custody-routing overview and DFCI mechanics guide, including a file-scoped (not corpus-wide) barred-phrasing negative"
  - "check-phase-150.mjs -- asserts Phase 150's three per-vendor BIOS guides (each per-vendor needle scoped to its own file path) and the reference capability matrix's own structure"
affects: [153-08 (151/152 leaves), 153-09 (check-phase-153.mjs apex chains all eight leaves)]

actuals:
  tokens: 12640
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Non-transcribable-to-positive replacement (D-28): where a phase's VERIFICATION.md expresses a prohibition as a git-diff-against-phase-local-base-SHA emptiness assertion, derive a positive needle asserting the protected state directly instead of transcribing the (unpinnable) diff. Applied twice in check-phase-148.mjs (CROSSLINKS, OVERVIEWTOUCH)."
    - "Count-derived-from-the-document needles: instead of baking a remembered figure (\"eight limitations\", \"the count agrees\"), slice the file content between two structural boundaries and count the pattern programmatically at runtime, then assert the count. Used for check-phase-148.mjs's LIMITATIONS (8 EAM bold lead-ins) and check-phase-150.mjs's MATRIX (silence-cell count vs Documentation-silences bullet count)."
    - "File-scoped negative for a phase-local barred phrasing (not corpus-wide): check-phase-149.mjs's BARREDPHRASINGS checks only the two documents this phase shipped, per the plan's explicit instruction that a corpus-wide negative would be a scope claim the phase never made -- distinct from Phase 145's corpus-wide ARCHIVALDRIFT negative, which IS backed by a ratified invariant (D-25)."
    - "Per-vendor needle file-scoping for a shared document shape: check-phase-150.mjs's SHAPE-*/RECOVERY-* checks are three independent check objects, each reading only its own vendor file, so a defect in one vendor's guide cannot be masked by a sibling's presence -- proved by an in-memory mutation probe removing Dell's Recovery heading and confirming only Dell's checks go red."
    - "Matrix-asserts-its-own-structure, not a guide restatement: check-phase-150.mjs's MATRIX needle counts 'Not documented by vendor' table cells and the matrix's own 'Documentation silences' bullet enumeration and asserts they are equal -- catching matrix/guide disagreement that a needle merely restating a guide claim could not."

key-files:
  created:
    - scripts/validation/check-phase-148.mjs
    - scripts/validation/check-phase-149.mjs
    - scripts/validation/check-phase-150.mjs

key-decisions:
  - "check-phase-148.mjs's CROSSLINKS and OVERVIEWTOUCH needles replace 148-VERIFICATION.md's git-diff-against-a161a43c/037305f1 emptiness prohibitions (D-28) rather than transcribing them: CROSSLINKS asserts co-management/03 still carries its <a id=\"autopatch-prerequisites\"> anchor and its \"Autopatch Prerequisites\" heading (the state the \"must not edit\" prohibition protected); OVERVIEWTOUCH asserts 00-overview.md still carries its four ratified routing/Related-Resources literals into 07 and 08 (the state the \"byte-identical since wiring commit\" assertion protected). Both were measured true against the live corpus before baking."
  - "check-phase-148.mjs's LIMITATIONS needle counts the eight EAM limitations from the document itself at runtime -- slicing between the '## Unsupported and Anti-Feature Callouts' heading and its first non-'Source:' bold lead-in region's closing 'Source:' line, then counting bold lead-ins excluding 'Source:' lines -- rather than asserting a hardcoded 8, so a future legitimate addition or removal of a limitation is caught rather than silently accepted or silently broken."
  - "check-phase-149.mjs's BARREDPHRASINGS negative for 'the six' uses a negative lookahead on the trailing hyphen (/\\bthe six(?!-)\\b/i) so the permitted compound 'six-OEM variant' does not trip it, while a genuine standalone 'the six OEMs' usage would. Verified against the real corpus (0 hits, both files) and against an in-memory probe string containing both barred phrasings (both matched, confirming the regex is failable)."
  - "check-phase-149.mjs's BARREDPHRASINGS is scoped to the two documents Phase 149 shipped (00-overview.md, 01-windows-dfci.md), not corpus-wide, per the plan's explicit instruction -- corpus-wide measured count is 13 hits for the loose pattern (mostly the permitted six-OEM compound and unrelated prose elsewhere in the corpus), recorded for transparency but not asserted."
  - "check-phase-150.mjs's SHAPE-*/RECOVERY-* checks are three separate check objects (one per vendor file) rather than one combined check, specifically to satisfy the plan's per-vendor file-scoping requirement -- an unscoped needle would be satisfied by any one of the three guides sharing the identical shape and would prove nothing about a specific vendor's regression."
  - "check-phase-150.mjs asserts the amended six-capability-H2 shape (Delivery, Authentication, Scope, Prerequisites, Offboarding and Loss of the Management Plane, Recovery), not the pre-amendment five-section premise the plan's own task description named -- 150-VERIFICATION.md reads SC#1 'through the filed D-01/D-02 amendment' and measured all three guides at nine identical H2 headings including the six capability ones. Measuring against the live corpus (not the plan text) surfaced this before baking, the same discipline 153-06 applied to the ARCHIVALDRIFT needle."
  - "check-phase-150.mjs's MATRIX needle asserts the matrix's own structure (row set, shared six-H2 columns) plus a countable relationship it records itself -- the number of 'Not documented by vendor' table-cell occurrences (3, measured, in the tables region before '## Key Gaps Summary') equals the number of bullets in its own 'Documentation silences' enumeration (3, measured) -- rather than restating a guide claim, per the plan's explicit instruction that a matrix needle duplicating a guide needle can pass while the two artifacts disagree."

requirements-completed: [HARN-04]

coverage:
  - id: D1
    description: "check-phase-148.mjs asserts Phase 148's application-update deliverables: presence of both guides, the necessary-but-not-sufficient entitlement distinction, the five EAM reachability gates, the eight named limitations (count derived from the document), the WinGet FAQ negative plus routing/hardening framing, both cross-links resolving with co-management/03's pin intact, and the overview's four ratified literals -- replacing 148-VERIFICATION.md's non-transcribable git-diff assertions with positive needles"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-148.mjs --verbose -> 9 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "LIMITATIONS failability probe: in-memory mutation removing the 'Conflicts with other app types' bullet from a copy of 08-windows-app-updates.md's content -> count 7 (FAIL, expected 8); real file re-run PASS (8)"
        status: pass
    human_judgment: false
  - id: D2
    description: "check-phase-149.mjs asserts Phase 149's firmware/BIOS domain deliverables: presence of both files, the custody-routing table and three positions, both native surfaces named as disjoint, the nine-OEM canonical list with its trailing pending sentence, the disqualifying-prerequisite gate plus the 24H2 known issue, the DFCI bricking quotation plus both distinct sequence headings, and the two barred phrasings absent from both shipped documents (file-scoped, not corpus-wide)"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-149.mjs --verbose -> 9 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "BARREDPHRASINGS failability probe: in-memory string 'This corpus documents the six OEMs and most business OEMs in one breath.' matched both regexes (FAIL, as expected); real files re-confirmed 0 hits (PASS)"
        status: pass
    human_judgment: false
  - id: D3
    description: "check-phase-150.mjs asserts Phase 150's per-vendor and matrix deliverables: presence of all four artifacts, the six-capability-H2 shape scoped to each of the three guides individually, the Dell/Lenovo inverted-prerequisite halves plus the overview's canonical one-liner, HP Connect's vendor-connector characterisation with both juxtaposed custody quotes, Lenovo's two-tool fork and certificate-tool-only model floor, the Recovery heading present in all three vendor files (each scoped), and the matrix's own row/column structure plus its self-consistent silence-cell/documentation-silences count relationship"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-150.mjs --verbose -> 17 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "Per-vendor scoping probe: in-memory mutation removing Dell's '## Recovery' heading from a copy of 02-dell-bios-configuration.md's content -> Dell's SHAPE and RECOVERY checks FAIL, HP and Lenovo checks (real, untouched) remain PASS; real Dell file re-run PASS"
        status: pass
      - kind: other
        ref: "all three leaves run in one sequence: node check-phase-148.mjs && check-phase-149.mjs && check-phase-150.mjs -> combined exit 0 (9/9/17 all green)"
        status: pass
    human_judgment: false

duration: ~50min
completed: 2026-08-29
status: complete
---

# Phase 153 Plan 07: Harness Close — check-phase-148/149/150.mjs Content Leaves Summary

**Authored the middle three of eight content leaves (`check-phase-148.mjs`, `149.mjs`, `150.mjs`), each a lightweight standalone validator asserting its own phase's shipped `docs/` deliverables — application-update management, greenfield firmware/BIOS overview + DFCI, and the three per-vendor BIOS guides plus their capability matrix — with zero planning-directory reads at runtime, per-vendor needles scoped to a single file path where the shape is shared, and non-transcribable base-SHA prohibitions replaced by positive needles.**

## Performance

- **Duration:** ~50 min
- **Completed:** 2026-08-29
- **Tasks:** 3
- **Files modified:** 3 (all new)

## Accomplishments

- `check-phase-148.mjs`: 9 checks (2 presence + entitlement + reachability gates + limitations-count + routing + cross-links + overview-touch + self-invariant), 9 PASS / 0 FAIL / 0 SKIPPED standalone.
- `check-phase-149.mjs`: 9 checks (2 presence + custody + disjoint + OEM list + disqualifiers + bricking + barred-phrasings + self-invariant), 9 PASS / 0 FAIL / 0 SKIPPED standalone.
- `check-phase-150.mjs`: 17 checks (4 presence + 3 scoped shape + 3 prerequisite + vendor-connector + fork + 3 scoped recovery + matrix + self-invariant), 17 PASS / 0 FAIL / 0 SKIPPED standalone.
- All three run green in one sequence: `node check-phase-148.mjs && check-phase-149.mjs && check-phase-150.mjs` → combined exit 0.
- Two non-transcribable-assertion prohibitions from `148-VERIFICATION.md` replaced with positive needles, mapped below.
- `150-VERIFICATION.md`'s D-01/D-02 amendment (six capability H2s, not the plan-text's five-section premise) caught by measuring the live corpus rather than trusting the task description — recorded as a deviation.
- All three required failability/scoping probes recorded red-then-green, entirely in-memory (no scratch files written to `docs/`).
- `git diff --stat` for this plan's three commits lists exactly 3 new files, 0 files modified — no `docs/` content was created, edited or deleted.

## Non-Transcribable-to-Positive Mapping (D-28, `check-phase-148.mjs` only)

`148-VERIFICATION.md`'s Prohibitions table (lines 128-136) expresses its constraints as `git diff <phase-local base SHA> HEAD --stat` emptiness assertions. Both are unpinnable in a permanent apex member and would go red the moment more commits land against those trees for unrelated reasons.

| Non-transcribable assertion (148-VERIFICATION.md) | What it protected | Positive needle that replaced it | Why it covers the same ground |
|---|---|---|---|
| `git diff a161a43c HEAD --stat` on `co-management/**`, `app-lifecycle/**`, `admin-setup-apv1/**`, `admin-setup-apv2/**`, `docs/reference/**`, `01-windows-wufb-rings.md` is empty | The co-management prerequisite document (and four other trees) must not be edited or trimmed by Phase 148 | `V-148-CROSSLINKS` asserts `co-management/03-cocmgmt-migration-paths.md` still carries its `<a id="autopatch-prerequisites"></a>` anchor and its `## Autopatch Prerequisites` heading, and that `07`'s outbound links into it and into `01-windows-wufb-rings.md#autopatch-disambiguation` resolve to files/anchors that exist | Asserts the *protected state* (the pin still present, the link still resolving) directly, rather than a moving diff against a phase-local base that has no meaning once more commits land for unrelated reasons |
| `git diff 037305f1 HEAD --stat -- 00-overview.md` is empty (byte-identical since the 148-03 wiring commit) | `00-overview.md`'s four Phase-148 wiring sites (two routing bullets, two Related Resources links into `07`/`08`) must survive later edits by other phases | `V-148-OVERVIEWTOUCH` asserts all four literal strings are still present in `00-overview.md` | A byte-identical-since-SHA assertion cannot survive a legitimate future edit to an unrelated part of the file; asserting the four specific literals directly is both durable and precise to what the prohibition actually protected |

## Needle Inventory — every baked literal with its measuring grep and authoring-time count

### `check-phase-148.mjs`

| Needle | Measuring command | Authoring-time result |
|---|---|---|
| PRESENCE-07/08 | `test -s` on both files | both present (25,930 / 32,270 bytes) |
| ENTITLEMENT | `grep -c "necessary but not sufficient"` on `07` | 1 hit |
| REACHABILITY | `grep -c "gated as hard as its own entitlement"` on `08` + flat-search for "Five reachability gates apply together" (wraps mid-line-break) | both present; the five gate labels (Licensing./Application types./Hosting and installation./Cloud environments./Assignment intent.) all present |
| LIMITATIONS | Node: slice `08` between `## Unsupported and Anti-Feature Callouts` and the first `**Source:**` line, count bold lead-ins excluding `**Source:**` lines | 8 (measured programmatically both by the leaf and independently at authoring time) |
| ROUTING | flat-search for the FAQ Q&A pair + "This section is about hardening" / "not about patching" (both wrap) + heading presence | all present |
| CROSSLINKS | `grep` for both outbound link strings in `07`; `grep -c 'id="autopatch-prerequisites"'` + `grep -c '^## Autopatch Prerequisites'` on `co-management/03` (1/1); `grep -c 'id="autopatch-disambiguation"'` on `01-windows-wufb-rings.md` (1) | all present |
| OVERVIEWTOUCH | `grep -n` for both routing bullets (168-169) and both Related Resources links (241, 245) in `00-overview.md` | all 4 present |
| SELF | source inspection | `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])` |

### `check-phase-149.mjs`

| Needle | Measuring command | Authoring-time result |
|---|---|---|
| PRESENCE-OVERVIEW/DFCI | `test -s` on both files | both present (16,966 / 41,524 bytes) |
| CUSTODY | flat-search for the H2, table header, all three custody-position sentences, and the RBAC/logging/rotation phrase in `00-overview.md` | all 7 sub-needles present |
| DISJOINT | flat-search for both surface statements, the disjointness sentence, and the 2 MB `.cctk` limit in `00-overview.md` | all 5 sub-needles present |
| OEMLIST | `grep` for all 9 canonical OEM names, `"Other OEMs are pending."`, and `## OEM Support` in `01-windows-dfci.md` | all present, source order confirmed |
| DISQUALIFIERS | flat-search for the disqualifiers H2, the manual-registration disqualifier, the external-attestation gate, the 24H2 known issue and its `KB5046740` workaround in `01-windows-dfci.md` | all 5 sub-needles present |
| BRICKING | flat-search for the DFCI bricking quote and the delete-removes-nothing quote; `grep` for `## Retiring a Device` and `## Reusing a Device` in `01-windows-dfci.md` | all 4 sub-needles present |
| BARREDPHRASINGS | Node regex `/\bthe six(?!-)\b/i` and `/most business OEMs/i` against `00-overview.md` and `01-windows-dfci.md` individually; corpus-wide loose-pattern count for transparency `grep -rniE "the six[^-]\|most business OEMs" docs/` | 0 hits in both files (file-scoped); 13 hits corpus-wide (not asserted — recorded per the plan's transparency instruction) |
| SELF | source inspection | `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])` |

### `check-phase-150.mjs`

| Needle | Measuring command | Authoring-time result |
|---|---|---|
| PRESENCE x4 | `test -s` on all three guides + the matrix | all present (18,819 / 22,991 / 17,518 / 14,972 bytes) |
| SHAPE-DELL/HP/LENOVO | `grep -n '^## '` on each of the three guides individually | byte-identical 9-line H2 sets (measured); six capability H2s asserted, scoped per file |
| PREREQ-DELL | flat-search for "requires no pre-existing BIOS password on the device" + "refuses outright" in `02-dell-bios-configuration.md` | both present |
| PREREQ-LENOVO | flat-search for "cannot bootstrap an initial supervisor password remotely" + "requires one already set and cannot create it remotely" in `04-lenovo-bios-configuration.md` | both present |
| PREREQ-OVERVIEW | `grep -c "Dell wants a virgin BIOS; Lenovo needs a provisioned one"` on `00-overview.md` | 1 hit |
| VENDORCONNECTOR | flat-search for "a vendor connector, not a Win32 agent" + "No per-device agent." + both custody quotes (HP's own + Dell's contrast quote, confirmed present verbatim at `03:147`) in `03-hp-bios-configuration.md` | all 4 sub-needles present |
| FORK-LENOVO | flat-search for "Lenovo is a two-tool vendor" + TBCT V2's own ThinkCentre-exclusion sentence + "attached to the certificate tool by name and never to the settings tool" + the certificate-tool model-floor list in `04-lenovo-bios-configuration.md` | all 4 sub-needles present |
| RECOVERY-DELL/HP/LENOVO | `grep -c '## Recovery'` on each of the three guides individually | 1/1/1 |
| MATRIX | `grep` for the six capability H2s, `\| Dell \|`/`\| HP \|`/`\| Lenovo \|` row markers, `## Key Gaps Summary` and `**Documentation silences**` in `docs/reference/firmware-oem-matrix.md`; Node: count `Not documented by vendor` occurrences before `## Key Gaps Summary` vs count of `- ` bullets under `**Documentation silences**` | silence-cell count = 3 (lines 113, 129, 130 — the line-204 Version History mention of the vocabulary is excluded by the region boundary); Documentation-silences bullet count = 3; equal |
| SELF | source inspection | `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])` |

## Failability and Scoping Probes — recorded red-then-green

All three probes were performed entirely **in-memory** (Node string mutation of a `readFileSync`d copy) — no scratch file was ever written to `docs/` or elsewhere, and `git status --short docs/` was empty before, during and after every probe.

### 1. `check-phase-148.mjs` LIMITATIONS (required by acceptance criteria)

```
$ node -e "
const fs = require('fs');
const c = fs.readFileSync('docs/operations/patch-management/08-windows-app-updates.md', 'utf8');
const mutated = c.replace('**Conflicts with other app types.** ... resolution path.\n\n', '');
function countEamLimitations(content) { /* same slice-and-count as the leaf */ }
console.log('original count:', countEamLimitations(c));   // 8
console.log('mutated count:', countEamLimitations(mutated)); // 7 -> would FAIL the ===8 assertion
"
original count: 8
mutated count: 7
```
Real file re-run: `node scripts/validation/check-phase-148.mjs` → `LIMITATIONS ... PASS -- eight EAM limitations counted from the document itself (8)`.

### 2. `check-phase-149.mjs` BARREDPHRASINGS (required by acceptance criteria)

```
$ node -e "
const reSix = /\bthe six(?!-)\b/i;
const reBiz = /most business OEMs/i;
const probe = 'This corpus documents the six OEMs and most business OEMs in one breath.';
console.log(probe.match(reSix));  // matched 'the six' -> FAIL
console.log(probe.match(reBiz));  // matched 'most business OEMs' -> FAIL
"
```
Both patterns correctly fire red against a probe string carrying the barred phrasings. Real files re-confirmed 0 hits (`BARREDPHRASINGS ... PASS`).

### 3. `check-phase-150.mjs` per-vendor scoping (required by acceptance criteria)

```
$ node -e "
const fs = require('fs');
const dellReal = fs.readFileSync('docs/operations/firmware-bios/02-dell-bios-configuration.md','utf8').replace(/\r\n/g,'\n');
const dellMutated = dellReal.replace('## Recovery', '## XXX-Removed-Recovery');
// shapeResult()/recoveryResult() mirror the leaf's own check logic
console.log('Dell (mutated) SHAPE:', shapeResult(dellMutated));       // FAIL -- missing: ## Recovery
console.log('Dell (mutated) RECOVERY:', recoveryResult(dellMutated)); // FAIL
console.log('HP (untouched) SHAPE/RECOVERY:', shapeResult(hpReal), recoveryResult(hpReal));         // PASS / PASS
console.log('Lenovo (untouched) SHAPE/RECOVERY:', shapeResult(lenovoReal), recoveryResult(lenovoReal)); // PASS / PASS
"
Dell (mutated, Recovery removed) SHAPE: FAIL -- missing: ## Recovery   RECOVERY: FAIL
HP (untouched) SHAPE: PASS   RECOVERY: PASS
Lenovo (untouched) SHAPE: PASS   RECOVERY: PASS
Dell (real, untouched) SHAPE: PASS   RECOVERY: PASS
```
Confirms per-vendor scoping: removing one vendor's Recovery heading (in memory only) fails only that vendor's `SHAPE-*` and `RECOVERY-*` checks; the other two vendors' checks — run against their real, untouched files — remain green throughout.

## Task Commits

Each task was committed atomically:

1. **Task 1: `check-phase-148.mjs`** - `284ef34b` (feat)
2. **Task 2: `check-phase-149.mjs`** - `2468764a` (feat)
3. **Task 3: `check-phase-150.mjs`** - `d861dd20` (feat)

**Plan metadata:** committed separately, see below.

## Files Created/Modified

- `scripts/validation/check-phase-148.mjs` - new, 309 lines, 9 checks, Phase 148 content leaf
- `scripts/validation/check-phase-149.mjs` - new, 279 lines, 9 checks, Phase 149 content leaf
- `scripts/validation/check-phase-150.mjs` - new, 355 lines, 17 checks, Phase 150 content leaf

## Decisions Made

See `key-decisions` in frontmatter for full reasoning. Summary:

1. **Replaced two non-transcribable base-SHA prohibitions in `check-phase-148.mjs` with positive needles** (D-28) — see the mapping table above. Both were measured true against the live corpus before baking, not re-derived from the stale base-SHA diff.
2. **`check-phase-148.mjs`'s LIMITATIONS count is derived programmatically at runtime**, not baked as a literal 8 — the leaf itself slices and counts the EAM callouts region, so a future legitimate addition or removal of a limitation is caught by the leaf rather than silently passing or silently breaking on a stale hardcoded number.
3. **`check-phase-149.mjs`'s barred-phrasing negative is file-scoped, not corpus-wide**, per the plan's explicit instruction — the loose corpus-wide pattern returns 13 hits (mostly the permitted `six-OEM` compound and unrelated prose), recorded for transparency but never asserted. The negative lookahead `(?!-)` distinguishes the barred standalone usage from the permitted compound.
4. **`check-phase-150.mjs`'s SHAPE-*/RECOVERY-* checks are three independent objects, not one combined check**, satisfying the plan's per-vendor file-scoping requirement — proved by the in-memory mutation probe above.
5. **`check-phase-150.mjs` asserts the amended six-capability-H2 shape**, discovered by measuring the live corpus (which reads `150-VERIFICATION.md`'s SC#1 "through the filed D-01/D-02 amendment") rather than trusting the plan task description's pre-amendment five-section premise — documented as a deviation below, following the same discipline 153-06 applied.
6. **`check-phase-150.mjs`'s MATRIX needle asserts the matrix's own structure and a self-consistency count**, not a restatement of guide content, per the plan's explicit instruction that a duplicating needle can pass while the artifacts disagree.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug avoided pre-commit] Plan task description's "five-section shape" for Phase 150's per-vendor guides is superseded by a filed amendment**
- **Found during:** Task 3, while reading `150-VERIFICATION.md` per the mandatory `read_first` gate, before writing any needle
- **Issue:** The 153-07-PLAN.md task description for `check-phase-150.mjs` says "the identical five-section shape". `150-VERIFICATION.md`'s Observable Truths table explicitly reads Success Criterion 1 "through the filed D-01/D-02 amendment" and measures all three vendor guides at a byte-identical **nine**-H2 set including **six** capability sections (Delivery, Authentication, Scope, Prerequisites, Offboarding and Loss of the Management Plane, Recovery) — the pre-amendment ROADMAP text's "five-section" premise was superseded during Phase 150's own execution (`REQUIREMENTS.md:75 [AMENDED 2026-08-25] [OWNER-RULED]`). A leaf baked against the literal plan-text premise would have asserted a false five-heading shape that does not match the live corpus.
- **Fix:** Measured `grep -n '^## '` against all three live guide files (confirmed byte-identical 9-line H2 sets) and asserted the six-capability-H2 shape that actually shipped, per-file-scoped as `SHAPE-DELL`/`SHAPE-HP`/`SHAPE-LENOVO`.
- **Files modified:** none beyond the planned `check-phase-150.mjs` (this is a needle-design decision made before any code was written, not a post-hoc patch).
- **Verification:** `node scripts/validation/check-phase-150.mjs` → `SHAPE-DELL`/`SHAPE-HP`/`SHAPE-LENOVO` all PASS; `grep -n '^## '` independently re-run against all three files confirms the identical 9-heading set.
- **Committed in:** `d861dd20` (Task 3)

---

**Total deviations:** 1 auto-fixed (Rule 1 — a needle-durability defect caught during derivation, before it ever reached a committed file, following the identical discipline 153-06 recorded for the ARCHIVALDRIFT needle).
**Impact on plan:** No scope creep. The corrected needle set matches what the phase actually shipped (confirmed by its own re-verified, `status: passed` VERIFICATION.md) rather than a superseded plan-text premise, and was required to satisfy this plan's own `<needle_doctrine>` instruction to derive needles from measured actuals rather than a remembered figure.

## Issues Encountered

None beyond the deviation documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Six of eight content leaves are now on disk: `check-phase-145.mjs` through `check-phase-150.mjs`. Plan 153-08 authors the final two (151/152), and plan 153-09 authors the apex `check-phase-153.mjs` that chains all eight plus `check-phase-30/31.mjs` (`CHAIN_EXTRA`) into `[48..152]`.
- All three leaves in this plan are independent of one another and of the eventual apex — each exits 0 standalone, none reads a planning path at runtime, none spawns a subprocess.
- The `.github/workflows/audit-harness-v1.21-integrity.yml` job entries for `check-phase-148`, `149` and `150` (authored ahead of these validators in 153-05) now have real targets to run.
- No blockers for 153-08/153-09.

## Self-Check: PASSED

- FOUND: `scripts/validation/check-phase-148.mjs` (309 lines)
- FOUND: `scripts/validation/check-phase-149.mjs` (279 lines)
- FOUND: `scripts/validation/check-phase-150.mjs` (355 lines)
- FOUND: commit `284ef34b` (Task 1)
- FOUND: commit `2468764a` (Task 2)
- FOUND: commit `d861dd20` (Task 3)
- Re-ran all plan-level `<verification>` commands: `node scripts/validation/check-phase-148.mjs && node scripts/validation/check-phase-149.mjs && node scripts/validation/check-phase-150.mjs` → combined exit 0 (9/0/0, 9/0/0, 17/0/0).
- `git diff --stat` across this plan's three commits → exactly 3 files changed, 0 modified, 943 insertions, 0 deletions.
- `grep -c "child_process" scripts/validation/check-phase-14{8,9}.mjs scripts/validation/check-phase-150.mjs` → 0 for all three files.
- `grep -noE '[0-9a-f]{7,40}' scripts/validation/check-phase-14{8,9}.mjs scripts/validation/check-phase-150.mjs` → only the carried Phase-68 `7b635ca` self-invariant comment string (twice per file, verbatim across the whole content-leaf family), no other commit-shaped literal.

---
*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Completed: 2026-08-29*
