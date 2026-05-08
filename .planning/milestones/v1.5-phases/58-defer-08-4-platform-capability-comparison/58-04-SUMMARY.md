---
phase: 58-defer-08-4-platform-capability-comparison
plan: 58-04
subsystem: docs-reference
tags: [capability-matrix, cross-platform, comparison-doc, sibling-intro-cross-ref, hedge-removal, anchor-preservation, defer-08, clean-05, w-8-domain-count, phase-45-precedent]

requires:
  - phase: 58-01
    provides: "58-ANCHOR-INVENTORY.md baseline with 24 pre-retrofit anchor literals + 2 Android `<a id>` compat shims tracked for preservation discipline"
  - phase: 58-02
    provides: "3 retrofitted `## Conditional Access` H2 anchors in macOS/iOS/Android matrices (Plan 58-04 W-8 mandatory rewrite enumerates Conditional Access into Android intro domain list — W-8 only computable post-58-02)"
  - phase: 58-03
    provides: "docs/reference/4-platform-capability-comparison.md (forward-link target — gate satisfied at commits 0a55ecd / 629d7fc / 8e888af)"
provides:
  - "D-12 5C cross-reference sentence inserted into macOS / iOS / Android capability matrix intros (single sentence appended to existing intro paragraph; not banner blockquote / not new H2)"
  - "D-13 Linux matrix `(when shipped)` + `when Phase 58 ships` hedge fully closed at line 70 (prose) + line 112 (See Also list-item) atomically with comparison-doc landing"
  - "D-14 Android footer F3 retrofit: `<a id=\"deferred-4-platform-unified-capability-comparison\"></a>` anchor PRESERVED byte-identical; H3 `Deferred:` prefix dropped per Phase 45 AEAOSPFULL-09 verbatim model; 5-line body block REMOVED and REPLACED with single forward-link sentence"
  - "W-8 mandatory rewrite: Android intro `five locked domains — Enrollment, Configuration, App Deployment, Compliance, and Software Updates` → `six locked domains — Enrollment, Configuration, App Deployment, Compliance, Software Updates, and Conditional Access` (post-Plan-58-02 CA H2 retrofit reality)"
  - "Phase 45 AEAOSPFULL-09 anchor `<a id=\"deferred-full-aosp-capability-mapping\"></a>` + H3 + body — UNTOUCHED byte-identical (V-58-22 regression-guard target satisfied)"
affects: [58-05, 58-06, 58-07, 59, 60, 61]

tech-stack:
  added: []
  patterns:
    - "5C single-sentence-paragraph-edit cross-reference pattern (D-12) — insertion into existing intro paragraph; appendage is an additional sentence, NOT a new paragraph and NOT a banner blockquote (5B explicitly rejected) and NOT a new H2 (5D explicitly rejected)"
    - "Anchor-preservation-when-body-retargeted (Phase 45 AEAOSPFULL-09 precedent) — D-14 F3 mirror: anchor `<a id>` preserved verbatim as compat shim; H3 `Deferred:` prefix dropped; body retargeted from deferral wording to forward-link prose"
    - "Hedge-close-atomic-with-target-landing (D-13) — `(when shipped)` parenthetical + `when Phase 58 ships` em-dash trailing prose dropped only after the linked target doc has landed (Plan 58-03 commits 0a55ecd / 629d7fc / 8e888af satisfied gate)"
    - "Domain-count enumeration consistency (W-8) — when intro phrasing enumerates the domain list by name, expanding the matrix structure (CA H2 retrofit by Plan 58-02) MANDATES updating the count and named list together; non-enumerated count phrasing (macOS / iOS) is plan-author discretion"

key-files:
  created: []
  modified:
    - "docs/reference/macos-capability-matrix.md (intro line 11 — single sentence appended; D-12 5C)"
    - "docs/reference/ios-capability-matrix.md (intro line 11 — single sentence appended; D-12 5C)"
    - "docs/reference/android-capability-matrix.md (intro line 12 — D-12 5C sentence appended + W-8 `five locked domains` → `six locked domains` rewrite; footer lines 142-149 — D-14 F3 anchor-preserve + H3 prefix-drop + body-retarget; Version History +1 row)"
    - "docs/reference/linux-capability-matrix.md (line 70 prose + line 112 See Also list-item — D-13 hedge close)"

key-decisions:
  - "5C in-paragraph-sentence pattern locked (D-12): banner blockquote (5B) and new H2 (5D) both rejected; 5C is the in-paragraph sentence appendage that satisfies SC#3 'intro updated to cross-reference' literal text most directly"
  - "F3 anchor-preservation locked (D-14 + Phase 45 AEAOSPFULL-09 precedent): the `<a id>` compat shim is the contract; the body is the variable; F2 (delete anchor wholesale) was rejected — breaks inbound link discoverability without compensating benefit"
  - "Phase 45 AEAOSPFULL-09 verbatim model honored: H3 `Deferred:` prefix dropped (sibling block at lines 134-135 used the same prefix-drop discipline when AEAOSPFULL-09 retargeted body to aosp-oem-matrix.md); same discipline applied to D-14 F3 block at lines 142-143"
  - "W-8 mandatory rewrite scope locked to Android only — Android intro phrasing is enumerated (lists domain names); macOS / iOS intros use non-enumerated count phrasing (`five operational domains` / no count) so executor discretion applied — left unchanged (the appended D-12 cross-ref sentence carries the 6-domain scope via the linked comparison doc)"
  - "Cross-Platform Equivalences intro (Android matrix line 93) link text `4-platform deferral footer` left unchanged: append-only contract for Task 2 explicitly forbade modifying lines 1-130; the anchor target still resolves correctly post-F3-retrofit (PITFALL-7 link-not-copy: anchor preservation is the load-bearing contract, link-text is informational)"

patterns-established:
  - "Pattern 1: 5C in-paragraph cross-reference — single sentence appended to existing intro paragraph for sibling-doc cross-references (substitute pattern for the banner-blockquote pattern that's reference-domain-inappropriate per CONTEXT D-12 precedent rationale: blockquote pattern appears in 18 docs/operations/ files and ZERO docs/reference/ files)"
  - "Pattern 2: F3 footer retrofit (anchor-preserve + H3-prefix-drop + body-retarget) — applicable to any historical `Deferred:`-prefixed footer block where the deferred target has subsequently shipped; preserves inbound-link integrity while updating prose to current-state forward-link"
  - "Pattern 3: Atomic hedge-close-with-target-landing — `(when shipped)` parenthetical hedges in forward-references should be dropped IN THE SAME PLAN-SERIES as the target doc lands (D-13); leaving the hedge after target lands creates stale forward-reference indistinguishable from broken-link defect"
  - "Pattern 4: Domain-count consistency on H2 expansion — when intro phrasing enumerates domain names (e.g., `N domains — A, B, C`), structural expansion (e.g., adding a new H2) MANDATES the count + name-list update in the same plan; non-enumerated count phrasing (`N operational domains` without listed names) is discretionary"

requirements-completed: [CLEAN-05]

duration: ~12min
completed: 2026-05-01
---

# Phase 58 Plan 58-04: Sibling Matrix Surface Edits Summary

**Sibling matrix intro cross-refs added to macOS/iOS/Android (D-12 5C); Linux `(when shipped)` hedge closed at lines 70+112 (D-13); Android footer F3 applied (body retargeted, anchor preserved, intro forward-link added) — D-14 satisfied; W-8 Android `five → six locked domains` rewrite landed; Phase 45 AEAOSPFULL-09 anchor untouched.**

## Performance

- **Duration:** ~12 min (sequential executor on main working tree)
- **Started:** 2026-05-01T05:00:00Z (immediately after Plan 58-03 SUMMARY commit `8e888af`)
- **Completed:** 2026-05-01T05:11:14Z
- **Tasks:** 2 (Task 1: D-12 5C intro cross-refs across 3 sibling matrices + W-8 Android rewrite; Task 2: D-13 Linux hedge close + D-14 Android footer F3 retrofit)
- **Files created:** 0
- **Files modified:** 4 (`docs/reference/macos-capability-matrix.md`, `docs/reference/ios-capability-matrix.md`, `docs/reference/android-capability-matrix.md`, `docs/reference/linux-capability-matrix.md`)

## Accomplishments

### Task 1 — D-12 5C cross-references inserted (commit `610b3bb`)

Three sibling matrix intros each received a single sentence appended to the existing intro paragraph cross-referencing the new comparison doc. Substantive sentences as committed:

**macOS** (`docs/reference/macos-capability-matrix.md` line 11, sentence appended at end of paragraph):

> For a side-by-side comparison of macOS capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md).

**iOS** (`docs/reference/ios-capability-matrix.md` line 11, sentence appended at end of paragraph):

> For a side-by-side comparison of iOS capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md).

**Android** (`docs/reference/android-capability-matrix.md` line 12, sentence appended at end of paragraph PLUS W-8 mid-paragraph rewrite landed in same edit):

> For a side-by-side comparison of Android capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md).

**W-8 mandatory rewrite (Android intro mid-paragraph):**

- BEFORE: `five locked domains — Enrollment, Configuration, App Deployment, Compliance, and Software Updates`
- AFTER:  `six locked domains — Enrollment, Configuration, App Deployment, Compliance, Software Updates, and Conditional Access`

Rationale: post-Plan-58-02 the Android matrix has 6 H2s (CA H2 added). The intro phrasing enumerates domain names by reference, so leaving "five" while the named list expands would be self-contradictory. macOS / iOS intro count phrasings are non-enumerated (no listed names); left unchanged per executor discretion — the appended D-12 cross-ref sentence carries the 6-domain scope via the linked comparison doc.

### Task 2 — D-13 Linux hedge close + D-14 Android footer F3 retrofit (commit `4feb805`)

**D-13 Linux matrix `(when shipped)` hedge close:**

Two atomic edits to `docs/reference/linux-capability-matrix.md`:

- Line 70 (Cross-Platform Equivalences H2 intro paragraph):
  - BEFORE: `It is NOT a 4-platform comparison — see Phase 58's [4-Platform Capability Comparison](4-platform-capability-comparison.md) (when shipped) for that.`
  - AFTER:  `It is NOT a 4-platform comparison — see the [4-Platform Capability Comparison](4-platform-capability-comparison.md) for that.`
  - Net: drops `Phase 58's` ownership reference (the doc has now shipped — owned by `docs/reference/`) AND `(when shipped)` parenthetical hedge (target now exists)
- Line 112 (See Also bulleted list):
  - BEFORE: `- [4-Platform Capability Comparison](4-platform-capability-comparison.md) — when Phase 58 ships`
  - AFTER:  `- [4-Platform Capability Comparison](4-platform-capability-comparison.md)`
  - Net: drops `— when Phase 58 ships` em-dash trailing prose; link literal preserved

After both edits, NEITHER `(when shipped)` NOR `when Phase 58 ships` literals appear anywhere in linux-capability-matrix.md (V-58-20 NEGATIVE assertion target satisfied).

**D-14 Android footer F3 retrofit (Phase 45 AEAOSPFULL-09 verbatim model):**

The 8-line block at lines 142-149 (anchor + H3 + 5-line body block + closing blank line + `---` separator boundary) collapsed to a 4-line block (anchor + H3 + 1-line body + closing blank line):

BEFORE (8-line block):

```
<a id="deferred-4-platform-unified-capability-comparison"></a>
### Deferred: 4-platform unified capability comparison

This matrix is Android-centric with a bounded 3-row Cross-Platform Equivalences
section. A unified Windows|macOS|iOS|Android 4-platform feature comparison doc
is deferred to v1.5 (AECOMPARE-01). The paired rows in this matrix are NOT a
4-platform comparison — they are mode-level feature parity assertions between
Apple and Android, constrained to the 3 SC#1-named pairs.
```

AFTER (4-line block):

```
<a id="deferred-4-platform-unified-capability-comparison"></a>
### 4-platform unified capability comparison

For a side-by-side comparison of Android Enterprise capabilities against Windows, macOS, iOS, and Linux across all 6 capability domains (Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access), see [4-Platform Capability Comparison](4-platform-capability-comparison.md).
```

**F3 disciplines satisfied:**

1. Anchor `<a id="deferred-4-platform-unified-capability-comparison"></a>` PRESERVED byte-identical (V-58-17 pin)
2. H3 `Deferred:` prefix dropped per Phase 45 AEAOSPFULL-09 verbatim model (sibling block at lines 134-135 already follows this discipline: `### AOSP per-OEM capability mapping` not `### Deferred: AOSP per-OEM capability mapping`)
3. Body REPLACED with single forward-link sentence containing literal `4-platform-capability-comparison.md` link target (V-58-18 pin within 800 chars after the anchor)
4. Pre-Phase-58 deferral wording (`deferred to v1.5`, `AECOMPARE-01`) ABSENT in the H3 block post-edit (V-58-19 NEGATIVE assertion target satisfied)
5. Phase 45 AEAOSPFULL-09 anchor `<a id="deferred-full-aosp-capability-mapping"></a>` + H3 `### AOSP per-OEM capability mapping` + body (lines 134-140) UNTOUCHED byte-identical (V-58-22 regression-guard target satisfied — confirmed via `git diff` showing zero changes in that block region)

**Optional Version History row append (consistent with Phase 45 + Phase 57 precedent):**

```
| 2026-04-30 | Phase 58 D-14: `#deferred-4-platform-unified-capability-comparison` anchor preserved; H3 `Deferred:` prefix dropped; 7-line body retargeted to single-sentence forward-link prose to `4-platform-capability-comparison.md`. Phase 45 AEAOSPFULL-09 anchor-preservation precedent. Plan 58-04 also appended D-12 5C intro cross-ref sentence and W-8 domain-count rewrite (`five locked domains` → `six locked domains` enumerating Conditional Access). | -- |
```

## Verification

### Plan-level grep matrix (9/9 PASS)

| # | Assertion | Expected | Actual |
|---|-----------|----------|--------|
| 1 | macOS cross-ref count | ≥ 1 | 1 ✓ |
| 2 | iOS cross-ref count | ≥ 1 | 1 ✓ |
| 3 | Android cross-ref count (intro + footer F3) | ≥ 2 | 2 ✓ |
| 4 | Linux 4-Platform link still present | ≥ 1 | 2 ✓ |
| 5 | Linux `(when shipped)` literal | = 0 | 0 ✓ |
| 6 | Linux `when Phase 58 ships` literal | = 0 | 0 ✓ |
| 7 | Android D-14 anchor preserved | = 1 | 1 ✓ |
| 8 | Android Phase 45 AEAOSPFULL-09 anchor preserved | = 1 | 1 ✓ |
| 9 | Android W-8 `six locked domains` present + OLD `five locked domains —…` absent | ≥ 1 + = 0 | 2 + 0 ✓ |

### Task 1 node check (13/13 PASS)

All 3 sibling matrix intros contain D-12 5C cross-ref sentence within first 30 lines; all 3 retain Plan-58-02 `## Conditional Access` H2; both Android compat shim anchors preserved; W-8 Android `six locked domains` literal present + old `five locked domains —…` absent.

### Task 2 node check (11/11 PASS)

Linux: zero `(when shipped)` AND zero `when Phase 58 ships` literals; comparison-doc link preserved at both former hedge sites; all 7 H2s preserved (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access / Cross-Platform Equivalences). Android: D-14 anchor preserved verbatim; Phase 45 anchor preserved; H3 `Deferred:` prefix dropped from D-14 block; new heading present; forward-link present in body within 800 chars after D-14 anchor; H3 block does NOT contain `deferred to v1.5` or `AECOMPARE-01` literals; Phase 45 H3 block UNCHANGED.

### H2 stability (4/4 matrices preserve all 6 capability H2s)

```
macos:  H2 count = 6 (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access)
ios:    H2 count = 6 (same — Plan 58-02 retrofit intact)
android: H2 count = 6 (same — Plan 58-02 retrofit intact; W-8 enumeration consistent)
linux:  H2 count = 6 (pre-existing)
```

(Cross-Platform Equivalences and Knox Mobile Enrollment H2/H3 supplements not counted in the canonical 6 — but verified UNCHANGED in all 4 matrices.)

### Phase 45 AEAOSPFULL-09 byte-identity (V-58-22 regression-guard target)

`git diff HEAD~2 HEAD docs/reference/android-capability-matrix.md` shows zero changes in the Phase 45 block region (lines 134-140 — anchor + H3 + 4-line body) — only changes are at lines 12 (intro), 142-145 (D-14 F3 retrofit), and 153 (Version History append). Phase 45 anchor + heading + body block confirmed byte-identical pre/post Plan 58-04.

## Commit Lineage

| Task | Commit | Files | Net delta |
|------|--------|-------|-----------|
| Task 1 (D-12 5C + W-8) | `610b3bb` | macos / ios / android intros | 3 files / +3 / −3 lines |
| Task 2 (D-13 + D-14) | `4feb805` | linux / android | 2 files / +5 / −8 lines |

Total: 4 files modified across 2 atomic commits; net delta `−3` lines (8-line F3 block → 4-line F3 block; +1 Version History row in Android; otherwise pure surface edits).

## Plan-Series Gate Verification (Wave 4 dependencies satisfied)

| Dep | Plan | Required artifact | Status pre-Plan-58-04 |
|-----|------|-------------------|------------------------|
| Wave 1 | 58-01 | 58-ANCHOR-INVENTORY.md (24 anchors + 2 Android compat shims tracked) | ✓ commit `16b98ad` (referenced for V-58-22 no-touch zone discipline; Phase 45 AEAOSPFULL-09 anchor confirmed byte-identical pre/post) |
| Wave 2 | 58-02 | 3 retrofitted `## Conditional Access` H2s in macOS/iOS/Android | ✓ commits `54a70b8` + `6d3ce98` (W-8 Android domain-count rewrite enumerates Conditional Access into the intro list — only computable post-58-02) |
| Wave 3 | 58-03 | `docs/reference/4-platform-capability-comparison.md` exists | ✓ commits `0a55ecd` + `629d7fc` + `8e888af` (forward-link target confirmed at file-path-existence check pre-flight in Task 1) |

Wave 5 unblocked — Plan 58-05 validator can now pin V-58-14/15/16 (intro cross-refs in 3 sibling matrices), V-58-17/18/19 (Android footer F3 anchor preserved + forward-link present + NEGATIVE deferral wording), V-58-20/21 (Linux hedge removal NEGATIVE + link preserved), V-58-22 (Phase 45 AEAOSPFULL-09 anchor regression-guard).

## Deviations from Plan

### Auto-fixed Issues

None — Plan 58-04 executed exactly as written with two minor executor-discretion notes:

1. **Line-number drift accommodation (informational, not deviation):** PLAN.md referenced Android footer block at "lines 132-139" (the pre-Plan-58-02 baseline). Post-Plan-58-02 (CA H2 retrofit added a full H2 + table above the Cross-Platform Equivalences H2), the equivalent block is now at lines 142-149. Plan-author's structural locator (`<a id="deferred-4-platform-unified-capability-comparison"></a>`) was the load-bearing reference and resolved correctly via grep. No edit-target ambiguity arose.

2. **W-8 Android domain-count rewrite executed as-required:** The plan's `<action>` block flagged this as MANDATORY (not discretionary) — `five locked domains — Enrollment, Configuration, App Deployment, Compliance, and Software Updates` rewritten to `six locked domains — Enrollment, Configuration, App Deployment, Compliance, Software Updates, and Conditional Access`. Both edits (D-12 sentence append + W-8 mid-paragraph rewrite) landed atomically in Task 1 commit `610b3bb`.

### Out-of-scope discoveries (NOT auto-fixed per scope boundary)

- **Cross-Platform Equivalences intro link text (Android matrix line 93)** — currently reads `see the [4-platform deferral footer](#deferred-4-platform-unified-capability-comparison) below`. Post-F3-retrofit the linked footer is no longer a "deferral footer" (the deferral wording was removed in Task 2). The link target (`#deferred-4-platform-unified-capability-comparison` anchor) still resolves correctly per anchor-preservation contract. The link text "4-platform deferral footer" is now stale label-wise but functional. Task 2's append-only contract explicitly forbade modifying lines 1-130; this is line 93 which falls inside the no-touch zone. Stale link text is a label-level inconsistency (informational), not a broken link or content defect — anchor preservation is the load-bearing PITFALL-7 contract. A future cleanup phase or Plan 58-05 validator addendum could choose to update this label; for Plan 58-04 it is logged here and intentionally NOT fixed.

## Threat Flags

None — Plan 58-04 made surface prose edits only; no new endpoints, auth paths, file access patterns, or schema changes were introduced.

## Self-Check: PASSED

**Files modified verification:**

```
git log --oneline -3
4feb805 docs(58-04): D-13 Linux hedge close + D-14 Android footer F3 retrofit
610b3bb docs(58-04): append D-12 5C cross-ref + W-8 Android domain-count rewrite
8e888af docs(58-03): complete 4-platform comparison doc plan
```

**FOUND:** `docs/reference/macos-capability-matrix.md` (modified)
**FOUND:** `docs/reference/ios-capability-matrix.md` (modified)
**FOUND:** `docs/reference/android-capability-matrix.md` (modified — both intro + footer F3 + Version History row)
**FOUND:** `docs/reference/linux-capability-matrix.md` (modified — both line 70 + line 112 hedge sites)

**Commits:**

**FOUND:** `610b3bb` — Task 1 (D-12 5C cross-refs + W-8 Android rewrite) — 3 files / +3 / −3 lines
**FOUND:** `4feb805` — Task 2 (D-13 Linux hedge close + D-14 Android F3 retrofit) — 2 files / +5 / −8 lines

**Plan-level success criteria:**

- [x] D-12 satisfied: 3 sibling matrices (macOS / iOS / Android) cross-reference the new comparison doc via 5C single-sentence-paragraph-edit pattern
- [x] D-13 satisfied: Linux matrix `(when shipped)` + `when Phase 58 ships` hedge fully closed at lines 70 + 112; link literal preserved at both sites
- [x] D-14 satisfied: Android footer F3 retrofit — anchor `<a id="deferred-4-platform-unified-capability-comparison">` preserved verbatim; `Deferred:` prefix dropped from H3; body retargeted to single forward-link sentence; no pre-Phase-58 deferral wording remains
- [x] W-8 mandatory rewrite landed: Android `six locked domains` (with CA enumerated) present; old `five locked domains —…` absent
- [x] V-58-22 regression-guard target satisfied: Phase 45 AEAOSPFULL-09 anchor + H3 + body UNTOUCHED byte-identical
- [x] All 6 H2 anchors stable in all 4 matrices (macOS / iOS / Android / Linux all show 6 capability H2s)
- [x] Plan 58-05 unblocked: validator V-58-14/15/16/17/18/19/20/21/22 assertions are now testable
- [x] Both atomic per-task commits made; SUMMARY.md written
