# Phase 58 Pre-Edit Anchor Inventory

**Captured:** 2026-05-01T04:39:55Z
**Pre-edit baseline HEAD:** 22161b9b5f13436bc2d68bb52822037720c7096d
**Purpose:** PITFALL-6 + D-15 baseline for append-only contract verification across 5 reference files. Phase 57 D-32 step 5 inheritance.
**Owner:** Plan 58-01 (per recommended plan ordering — pre-edit MANDATORY before any docs/reference/*.md edit in plans 58-02 / 58-04).

This artifact captures the pre-edit anchor reference map for the 4 capability matrices Phase 58 modifies + inbound references to the new comparison-doc filename + the legacy `deferred-4-platform-unified-capability-comparison` anchor (D-14 preservation target). After all Phase 58 plans land, a post-edit re-grep should produce zero NEW broken-anchor references vs this baseline (existing references still resolve; the +3 new CA H2 anchors added by Plan 58-02 resolve by virtue of same-plan-series H2 creation).

## Pre-retrofit anchor literals (BASELINE — 24 anchors expected)

| File | Line | H2 / Anchor literal | GFM-derived slug |
|------|------|---------------------|------------------|
| docs/reference/linux-capability-matrix.md | 15 | `## Enrollment` | `#enrollment` |
| docs/reference/linux-capability-matrix.md | 24 | `## Configuration` | `#configuration` |
| docs/reference/linux-capability-matrix.md | 33 | `## App Deployment` | `#app-deployment` |
| docs/reference/linux-capability-matrix.md | 42 | `## Compliance` | `#compliance` |
| docs/reference/linux-capability-matrix.md | 51 | `## Software Updates` | `#software-updates` |
| docs/reference/linux-capability-matrix.md | 59 | `## Conditional Access` | `#conditional-access` |
| docs/reference/linux-capability-matrix.md | 68 | `## Cross-Platform Equivalences` | `#cross-platform-equivalences` |
| docs/reference/macos-capability-matrix.md | 13 | `## Enrollment` | `#enrollment` |
| docs/reference/macos-capability-matrix.md | 28 | `## Configuration` | `#configuration` |
| docs/reference/macos-capability-matrix.md | 42 | `## App Deployment` | `#app-deployment` |
| docs/reference/macos-capability-matrix.md | 56 | `## Compliance` | `#compliance` |
| docs/reference/macos-capability-matrix.md | 68 | `## Software Updates` | `#software-updates` |
| docs/reference/ios-capability-matrix.md | 13 | `## Enrollment` | `#enrollment` |
| docs/reference/ios-capability-matrix.md | 30 | `## Configuration` | `#configuration` |
| docs/reference/ios-capability-matrix.md | 44 | `## App Deployment` | `#app-deployment` |
| docs/reference/ios-capability-matrix.md | 57 | `## Compliance` | `#compliance` |
| docs/reference/ios-capability-matrix.md | 70 | `## Software Updates` | `#software-updates` |
| docs/reference/android-capability-matrix.md | 14 | `## Enrollment` | `#enrollment` |
| docs/reference/android-capability-matrix.md | 31 | `## Configuration` | `#configuration` |
| docs/reference/android-capability-matrix.md | 44 | `## App Deployment` | `#app-deployment` |
| docs/reference/android-capability-matrix.md | 56 | `## Compliance` | `#compliance` |
| docs/reference/android-capability-matrix.md | 67 | `## Software Updates` | `#software-updates` |
| docs/reference/android-capability-matrix.md | 76 | `## Cross-Platform Equivalences` | `#cross-platform-equivalences` |
| docs/reference/android-capability-matrix.md | 124 | `<a id="deferred-full-aosp-capability-mapping"></a>` (Phase 45 AEAOSPFULL-09 — preserve) | `#deferred-full-aosp-capability-mapping` |
| docs/reference/android-capability-matrix.md | 132 | `<a id="deferred-4-platform-unified-capability-comparison"></a>` (D-14 F3 — preserve) | `#deferred-4-platform-unified-capability-comparison` |

## Pre-retrofit raw H2 grep output

```
$ grep -nE "^## (Enrollment|Configuration|App Deployment|Compliance|Software Updates|Conditional Access|Cross-Platform Equivalences|Key Gaps Summary)" docs/reference/linux-capability-matrix.md docs/reference/macos-capability-matrix.md docs/reference/ios-capability-matrix.md docs/reference/android-capability-matrix.md
docs/reference/macos-capability-matrix.md:13:## Enrollment
docs/reference/macos-capability-matrix.md:28:## Configuration
docs/reference/macos-capability-matrix.md:42:## App Deployment
docs/reference/macos-capability-matrix.md:56:## Compliance
docs/reference/macos-capability-matrix.md:68:## Software Updates
docs/reference/macos-capability-matrix.md:78:## Key Gaps Summary
docs/reference/ios-capability-matrix.md:13:## Enrollment
docs/reference/ios-capability-matrix.md:30:## Configuration
docs/reference/ios-capability-matrix.md:44:## App Deployment
docs/reference/ios-capability-matrix.md:57:## Compliance
docs/reference/ios-capability-matrix.md:70:## Software Updates
docs/reference/ios-capability-matrix.md:80:## Key Gaps Summary
docs/reference/android-capability-matrix.md:14:## Enrollment
docs/reference/android-capability-matrix.md:31:## Configuration
docs/reference/android-capability-matrix.md:44:## App Deployment
docs/reference/android-capability-matrix.md:56:## Compliance
docs/reference/android-capability-matrix.md:67:## Software Updates
docs/reference/android-capability-matrix.md:76:## Cross-Platform Equivalences
docs/reference/android-capability-matrix.md:94:## Key Gaps Summary
docs/reference/linux-capability-matrix.md:15:## Enrollment
docs/reference/linux-capability-matrix.md:24:## Configuration
docs/reference/linux-capability-matrix.md:33:## App Deployment
docs/reference/linux-capability-matrix.md:42:## Compliance
docs/reference/linux-capability-matrix.md:51:## Software Updates
docs/reference/linux-capability-matrix.md:59:## Conditional Access
docs/reference/linux-capability-matrix.md:68:## Cross-Platform Equivalences
docs/reference/linux-capability-matrix.md:87:## Key Gaps Summary
```

Confirmation:
- macOS / iOS matrices contain NO `## Conditional Access` H2 pre-retrofit (D-04 retrofit target — Plan 58-02 owns).
- Android matrix contains NO `## Conditional Access` H2 pre-retrofit (D-04 retrofit target — Plan 58-02 owns).
- Linux matrix already has `## Conditional Access` at line 59 (NOT a retrofit target — D-04 explicitly excludes Linux).
- All 4 matrices contain `## Key Gaps Summary` H2 (out of D-04 scope; not enumerated as a Phase 58 anchor).
- Linux + Android matrices contain `## Cross-Platform Equivalences` H2 (existing, preserved).

## Pre-retrofit Android `<a id>` literal grep output

```
$ grep -n '<a id="' docs/reference/android-capability-matrix.md
117:<a id="knox-mobile-enrollment-row"></a>
124:<a id="deferred-full-aosp-capability-mapping"></a>
132:<a id="deferred-4-platform-unified-capability-comparison"></a>
```

Confirmation:
- 3 explicit `<a id>` literals in `android-capability-matrix.md`. Phase 58 PRESERVES all 3 (lines 124 + 132 are explicitly named D-14 + Phase 45 preservation targets; line 117 Knox-row anchor is pre-existing pre-Phase-58 and out of D-04 / D-14 modification scope).
- Plan 58-04 Edit Zone F (Android footer F3) targets ONLY the `<a id="deferred-4-platform-unified-capability-comparison"></a>` literal at line 132 — anchor LITERAL preserved verbatim; body prose at lines 132-139 replaced with single-line forward-link per D-14.
- Line 124 anchor `<a id="deferred-full-aosp-capability-mapping"></a>` (Phase 45 AEAOSPFULL-09 precedent) MUST NOT be touched by any Phase 58 plan.

## Inbound references to comparison-doc filename (PRE-Phase-58 EXPECTED — 2 references)

```
$ grep -rn "4-platform-capability-comparison.md" docs/
docs/reference/linux-capability-matrix.md:70:This section maps three Linux↔Apple capability pairs called out in ROADMAP SC#4. It is NOT a 4-platform comparison — see Phase 58's [4-Platform Capability Comparison](4-platform-capability-comparison.md) (when shipped) for that. Each paired row attributes the platform explicitly on both sides; mappings are STRUCTURAL, not behavioral (per Phase 49 PITFALL-1 partial-mapping discipline at `_glossary-linux.md` line 84 and 112).
docs/reference/linux-capability-matrix.md:112:- [4-Platform Capability Comparison](4-platform-capability-comparison.md) — when Phase 58 ships
```

Expected at capture-time: 2 hits — both in `docs/reference/linux-capability-matrix.md` (line 70 + line 112). Both references currently use `(when shipped)` / `when Phase 58 ships` hedge prose per D-13; Plan 58-04 closes the hedge atomically once Plan 58-03 ships the comparison doc.

## Inbound references to deferred-4-platform-unified-capability-comparison anchor (PRE-Phase-58)

```
$ grep -rn "deferred-4-platform-unified-capability-comparison" docs/
docs/reference/android-capability-matrix.md:83:This section maps three Apple↔Android capability pairs called out in ROADMAP SC#1. It is NOT a 4-platform comparison — see the [4-platform deferral footer](#deferred-4-platform-unified-capability-comparison) below. Each paired row attributes the platform explicitly on both sides (e.g., "iOS Supervision" and "Android Fully Managed"); the Android side never uses Apple-attributed terms such as "supervised" or "unsupervised" as Android management states.
docs/reference/android-capability-matrix.md:132:<a id="deferred-4-platform-unified-capability-comparison"></a>
```

Expected at capture-time: 2 hits — `android-capability-matrix.md:83` (in-document reference) + `android-capability-matrix.md:132` (anchor definition). Plan 58-04 preserves the anchor at line 132 verbatim and rewrites lines 132-139 body prose only (D-14 F3 anchor-preservation discipline). The line-83 reference remains stable post-Phase-58 because the anchor literal is preserved.

Note (research-vs-reality reconciliation): Plan 58-01 PLAN.md `must_haves.truths` line listed `android-capability-matrix.md:82` as the inbound reference. Live grep at this baseline HEAD shows the reference is on line **83** (a 1-line offset; non-blocking — anchor literal `#deferred-4-platform-unified-capability-comparison` is identical, and 58-RESEARCH.md §"Inbound references to deferred-4-platform-unified-capability-comparison anchor" likewise renders the line as 82 in research prose vs 83 in actual grep). Both references resolve to the same anchor literal at line 132; the 1-line offset has zero impact on PITFALL-6 / PITFALL-15 invariants. The verbatim grep output above is authoritative for VERIFICATION.md cross-check.

## Post-retrofit anchor literals (POST-Phase-58 EXPECTED — 27 anchors total; +3 delta)

Plan 58-02 will retrofit `## Conditional Access` H2 into macOS/iOS/Android matrices. The 3 new anchors:

| File | Estimated new H2 line | H2 / Anchor literal | GFM-derived slug |
|------|----------------------|---------------------|------------------|
| docs/reference/macos-capability-matrix.md | inserted after `## Software Updates` body (~line 78), before `## Key Gaps Summary` | `## Conditional Access` | `#conditional-access` |
| docs/reference/ios-capability-matrix.md | inserted after `## Software Updates` body (~line 80), before `## Key Gaps Summary` | `## Conditional Access` | `#conditional-access` |
| docs/reference/android-capability-matrix.md | inserted after `## Software Updates` body (~line 76), before `## Cross-Platform Equivalences` | `## Conditional Access` | `#conditional-access` |

## Comparison-doc cell→anchor target mapping (Plan 58-03 consumption baseline — 30 cell positions)

The new `docs/reference/4-platform-capability-comparison.md` (Plan 58-03) has **5 platform columns × 6 H2 rows = 30 link targets**. Each non-empty cell's link target follows the canonical pattern `<platform>-capability-matrix.md#<h2-slug>`. Windows column resolves to the Windows column of `linux-capability-matrix.md` per D-08 (canonical Windows source until a dedicated `windows-capability-matrix.md` is authored in v1.6+).

| Comparison-doc Row (H2) | Windows cell target | macOS cell target | iOS cell target | Android cell target | Linux cell target |
|-------------------------|---------------------|-------------------|-----------------|---------------------|-------------------|
| Enrollment | `linux-capability-matrix.md#enrollment` | `macos-capability-matrix.md#enrollment` | `ios-capability-matrix.md#enrollment` | `android-capability-matrix.md#enrollment` | `linux-capability-matrix.md#enrollment` |
| Configuration | `linux-capability-matrix.md#configuration` | `macos-capability-matrix.md#configuration` | `ios-capability-matrix.md#configuration` | `android-capability-matrix.md#configuration` | `linux-capability-matrix.md#configuration` |
| App Deployment | `linux-capability-matrix.md#app-deployment` | `macos-capability-matrix.md#app-deployment` | `ios-capability-matrix.md#app-deployment` | `android-capability-matrix.md#app-deployment` | `linux-capability-matrix.md#app-deployment` |
| Compliance | `linux-capability-matrix.md#compliance` | `macos-capability-matrix.md#compliance` | `ios-capability-matrix.md#compliance` | `android-capability-matrix.md#compliance` | `linux-capability-matrix.md#compliance` |
| Software Updates | `linux-capability-matrix.md#software-updates` | `macos-capability-matrix.md#software-updates` | `ios-capability-matrix.md#software-updates` | `android-capability-matrix.md#software-updates` | `linux-capability-matrix.md#software-updates` |
| Conditional Access | `linux-capability-matrix.md#conditional-access` | `macos-capability-matrix.md#conditional-access` ⚠️ POST-58-02 | `ios-capability-matrix.md#conditional-access` ⚠️ POST-58-02 | `android-capability-matrix.md#conditional-access` ⚠️ POST-58-02 | `linux-capability-matrix.md#conditional-access` |

**⚠️ POST-58-02 markers** identify the 3 cell targets that depend on Plan 58-02 (CA H2 retrofit) landing BEFORE the comparison-doc is authored in Plan 58-03. Wave ordering invariant per D-15 + Plan 58-01 gating: Plan 58-02 MUST land before Plan 58-03 consumes these anchors.

**Windows column collapse note (D-08):** the Windows column maps to the same 6 anchor targets as the Linux column because both columns resolve to `linux-capability-matrix.md` (Windows column lives inside the Linux matrix as the Win-bilateral source). Total UNIQUE link targets across the 30-cell mapping: 24 unique slugs (6 H2s × 4 distinct matrices) — Windows + Linux columns share the same 6 anchor targets.

## Post-retrofit verification command (re-run at Phase 58 close)

```
grep -nE "^## (Enrollment|Configuration|App Deployment|Compliance|Software Updates|Conditional Access|Cross-Platform Equivalences)" docs/reference/{linux,macos,ios,android}-capability-matrix.md
```

Expected POST-Phase-58 output: **25 H2 lines** computed as:
- 5 H2s × 4 matrices = 20 (Enrollment / Configuration / App Deployment / Compliance / Software Updates)
- + Linux Conditional Access (existing) = 21
- + Linux Cross-Platform Equivalences (existing) = 22
- + Android Cross-Platform Equivalences (existing) = 23
- + 3 retrofitted Conditional Access H2s in macOS/iOS/Android = **25**

Note: macOS/iOS do NOT add Cross-Platform Equivalences in Phase 58 — only the Conditional Access H2 retrofit per D-04.

```
grep -n '<a id="' docs/reference/android-capability-matrix.md
```

Expected POST-Phase-58 output: identical to pre-Phase-58 — all 3 `<a id>` literals (lines 117 / 124 / 132) preserved verbatim. Line numbers may shift downward because Plan 58-02 inserts the `## Conditional Access` H2 before line 76 (`## Cross-Platform Equivalences`), pushing all subsequent content down — but the literal anchor strings remain byte-identical and resolve unchanged.

## Summary Counts

| Pattern | Pre-Phase-58 Count | Post-Phase-58 Expected | Delta |
|---------|-------------------|------------------------|-------|
| `## Enrollment` H2 | 4 | 4 | 0 |
| `## Configuration` H2 | 4 | 4 | 0 |
| `## App Deployment` H2 | 4 | 4 | 0 |
| `## Compliance` H2 | 4 | 4 | 0 |
| `## Software Updates` H2 | 4 | 4 | 0 |
| `## Conditional Access` H2 | 1 (Linux) | 4 (Linux + macOS + iOS + Android) | +3 |
| `## Cross-Platform Equivalences` H2 | 2 (Linux + Android) | 2 | 0 |
| `<a id="deferred-..."` anchors | 2 (both in Android matrix) | 2 (both PRESERVED per D-14 + Phase 45) | 0 |
| `4-platform-capability-comparison.md` filename references | 2 (both in linux-matrix lines 70 + 112 with `(when shipped)` hedge) | ≥5 (Linux × 2 lines hedge-removed + 3 sibling matrix intros + Android footer F3 forward-link) | +3 to +N |

**This baseline is auditable and persists for `58-VERIFICATION.md` cross-check at Phase 58 close.**
