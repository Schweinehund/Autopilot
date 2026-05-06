---
phase: 60-audit-harness-v1-5-finalization
slug: audit-harness-v1-5-finalization
generated: 2026-05-06
calibration_scope: docs/admin-setup-android/**/*.md, docs/operations/**/*.md, docs/android-lifecycle/**/*.md, docs/**/*.md (C11)
total_c9_hits: 1
total_c11_hits_in_window: 7
total_c11_hits_requires_pinning: 5
total_c11_hits_anti_pattern: 0
---

# Phase 60: Calibration Corpus Scan -- C9 + C11 Pre-Promotion

> **Lifecycle:** Read-only artifact produced BEFORE Plan 09 atomic harness commit per CONTEXT D-28. Informs c9_exemptions[] pin set + C11 final keyword list.

## Header

- **Phase:** 60
- **Generated:** 2026-05-06
- **Calibration tools:** `node scripts/validation/v1.5-milestone-audit.mjs` (C9 lines 417-437, C11 lines 477-504) + Plan-01 one-shot Node corpus scanners mirroring harness regex semantics (`new RegExp(p, 'gi')`); ±200-char window evaluator for C11 D-01 keyword set.
- **Scope:** Android + ops-depth corpus for C9 (`androidDocPaths()` ∪ `docs/operations/**/*.md`, 52 files); full `docs/**/*.md` for C11 (218 files).
- **C9 raw hits:** 1 (1 legitimate-disambiguation, 0 anti-pattern)
- **C11 raw hits:** 12 (7 windowed-exempt under D-01 starting set, 5 requires-pinning, 0 anti-pattern)

## Section A -- C9 cope_banned_phrases corpus scan

**Patterns scanned (8 verbatim from sidecar lines 33-42):**

```
\bCOPE\b[^.]*\bdeprecated\b
\bCOPE\b[^.]*\bend of life\b
\bCOPE\b[^.]*\bremoved\b
\bCOPE\b[^.]*\bEOL\b
\bCOPE\b[^.]*\bno longer supported\b
\bCOPE\b[^.]*\bobsolete\b
\bCOPE\b[^.]*\bsunset\b
\bCOPE\b[^.]*\bretired\b
```

**Scope:** `androidDocPaths()` (harness lines 90-136) ∪ `docs/operations/**/*.md` -- 52 files scanned.

**Methodology:** Each pattern compiled as `new RegExp(p, 'gi')` (mirrors harness:427 `'i'` semantics with global flag added for hit enumeration). Match-text greedy `[^.]*` may span newlines (JS regex does not exclude `\n` from `[^.]`). Each hit tabulated below with file, line, pattern, and disposition.

| File | Line | Pattern Match | Disposition | Pin reason (if pinning) |
|------|------|---------------|-------------|--------------------------|
| docs/android-lifecycle/03-android-version-matrix.md | 41 | `\bCOPE\b[^.]*\bremoved\b` -- matched text: `COPE NFC Provisioning Removed` (H3 heading at line 41 describing Google's Android-11-driven removal of NFC + afw#setup paths for COPE / WPCO; per Phase 34 Foundation + Phase 36 AECOBO-02 + Phase 36 D-NN: this is HISTORICAL prose about a Google-side provisioning-method removal, NOT a deprecation claim against COPE itself; PITFALL-13 disambiguation -- Google has NOT formally deprecated COPE per `_glossary-android.md:200` 2023+ entry "COPE -> WPCO terminology drift recorded. Google has NOT formally deprecated COPE; community shorthand incorrectly conflates 'recommended-against' with 'deprecated.'") | legitimate-disambiguation | Phase 34 Foundation + Phase 36 (AECOBO-02 COBO migration-note) -- heading documents Android-11 NFC-removal historical context; PITFALL-13 disambiguation rule: only Google-driven provisioning-method removal, not a COPE-mode deprecation |

**Section A row count:** 1 hit, classified as `legitimate-disambiguation`.

**Anti-pattern hits:** 0. (Phase 49-59 V-NN-NN structural assertions guarantee no regressions.)

**Note on RESEARCH HIGH-confidence claim (60-RESEARCH.md lines 380-398):** RESEARCH predicted 4 file-level false positives at `_glossary-android.md:196` + `admin-setup-android/03-fully-managed-cobo.md:149` + `android-lifecycle/03-android-version-matrix.md:37` + `reference/android-capability-matrix.md:50`. Live calibration scan in this Plan 01 execution finds **only 1 hit** at `android-lifecycle/03-android-version-matrix.md:41` (line 41, NOT line 37 -- `<a id="android-11-breakpoint"></a>` anchor at line 40 + H3 heading at line 41 `### Android 11 -- COPE NFC Provisioning Removed`). The other 3 RESEARCH-predicted hits do not surface under current corpus state (post-Phase-59 line-shifts and content edits applied; e.g., `_glossary-android.md:196` is now a Phase 34 Foundation Version History changelog row that does not match any banned-phrase pattern; `03-fully-managed-cobo.md:149` is now a `[02-provisioning-methods.md#nfc]` link reference; `android-capability-matrix.md:50` is now a Managed Google Play LOB-APK row that does not contain any banned phrase). The single live hit is NOT a regex-greediness paragraph-spanning false positive -- it is a single-line H3-heading match where match-text "COPE NFC Provisioning Removed" is contained entirely within line 41.

## Section B -- C11 ops-domain anti-pattern corpus scan with proximity-window evaluation

**Patterns scanned (4 verbatim from harness lines 487-490):**

```
\bSystem Center\b
\bSCCM\b[^.]*\bIntune\b
\bAutopatch rings\b
\bSafetyNet\b[^.]*\bcompliance\b
```

**Scope:** `docs/**/*.md` -- 218 files scanned.

**Methodology:** Each pattern compiled as `new RegExp(p, 'gi')`. For each match, the ±200-char window is evaluated against D-01 starting keyword regex `/successor|deprecated|historical|disambiguation|mutual-exclusion|PITFALL-9|first-occurrence|callout/i`. Disposition assigned per Plan 01 Task 1 action step 3.

| File | Line | Pattern Match | Window Keywords Found | Disposition |
|------|------|---------------|------------------------|-------------|
| docs/common-issues.md | 143 | `\bSCCM\b[^.]*\bIntune\b` -- matched text: `SCCM replacement\n- **Admin:** [GPO to Intune]` (Migration Issues section link-list label "MDT/SCCM replacement" + adjacent "[GPO to Intune]" link; cross-tool migration index entry) | -- (D-01 starting set finds no keyword in window; "Migration Issues" H3 heading sits at line 138, just outside the ±200-char window from line-143 match-text) | requires-pinning |
| docs/operations/patch-management/01-windows-wufb-rings.md | 165 | `\bSCCM\b[^.]*\bIntune\b` -- matched text: `SCCM co-management still controls the Windows Update\nworkload (workload slider not yet at Pilot Intune or Intune` (Dual-scan source conflict pitfall prose -- legitimate co-management technical narrative explaining workload-slider phase) | -- (D-01 starting set finds no keyword in window; explicit `co-management` term present in match-text but not in starting keyword regex) | requires-pinning |
| docs/operations/patch-management/01-windows-wufb-rings.md | 170 | `\bSCCM\b[^.]*\bIntune\b` -- matched text: `SCCM-WSUS scan source (because the WU workload is\nstill ConfigMgr-authoritative) AND the WUfB-cloud scan source (because the driver/firmware\npolicy targets the device through Intune` (dual-scan oscillation prose -- legitimate co-management technical detail) | -- (D-01 starting set finds no keyword in window; `co-management` and `ConfigMgr-authoritative` present but not in starting keyword regex) | requires-pinning |
| docs/reference/00-index.md | 46 | `\bSCCM\b[^.]*\bIntune\b` -- matched text: `SCCM to Autopilot transition guide (WMIG-02)\n- [GPO to Intune]` (Migration Guides link-list entry under "## Migration Guides" H2 at line 43) | -- (D-01 starting set finds no keyword in window; "Migration Guides" H2 heading at line 43 sits within the ±200-char window backward but the keyword `Migration` is not in the starting set) | requires-pinning |
| docs/operations/patch-management/00-overview.md | 77 | `\bAutopatch rings\b` -- matched text: `Autopatch rings are the service-managed ring topology` (definitional list-item describing Autopatch ring term as part of disambiguation list with WUfB deployment ring) | -- (D-01 starting set finds no keyword; line 75-76 contain `mutually\nexclusive` which would match a whitespace-tolerant `mutually\s+exclusive` keyword extension, NOT the literal hyphenated `mutual-exclusion` token in the starting set) | requires-pinning |
| docs/operations/patch-management/00-overview.md | 82 | `\bAutopatch rings\b` -- matched text: `Autopatch rings -- they are an independent policy` (driver/firmware update policy clarification clause) | mutual-exclusion | windowed-exempt |
| docs/operations/patch-management/00-overview.md | 85 | `\bAutopatch rings\b` -- matched text: `Autopatch rings is a frequent source of` (mutual-exclusion property paragraph opener at line 85) | mutual-exclusion | windowed-exempt |
| docs/operations/patch-management/01-windows-wufb-rings.md | 60 | `\bAutopatch rings\b` -- matched text: `Autopatch Rings (Disambiguation)` (H2 heading `## Windows Autopatch Rings (Disambiguation) {#autopatch-disambiguation}`) | Disambiguation | windowed-exempt |
| docs/operations/patch-management/01-windows-wufb-rings.md | 63 | `\bAutopatch rings\b` -- matched text: `Autopatch rings) that Windows Autopatch automatically rotates` (Disambiguation paragraph body enumerating Test/First/Fast/Broad rings) | Disambiguation | windowed-exempt |
| docs/operations/patch-management/01-windows-wufb-rings.md | 75 | `\bAutopatch rings\b` -- matched text: `Autopatch rings are **mutually exclusive**` (PITFALL-9 callout body referencing canonical pitfall ID) | PITFALL-9 | windowed-exempt |
| docs/operations/patch-management/04-android-patch-delivery.md | 72 | `\bSafetyNet\b[^.]*\bcompliance\b` -- matched text: `SafetyNet attestation API was deprecated by Google in January 2025 and no\nlonger appears in current Intune Android compliance` (deprecation note explaining SafetyNet-to-Play-Integrity migration) | deprecated | windowed-exempt |
| docs/operations/patch-management/04-android-patch-delivery.md | 73 | `\bSafetyNet\b[^.]*\bcompliance\b` -- matched text: `SafetyNet\ncompliance` (continuation of deprecation note -- second match where greedy `[^.]*` re-matches across the same paragraph) | deprecated | windowed-exempt |

**Section B row count:** 12 hits. Disposition breakdown: 7 windowed-exempt, 5 requires-pinning, 0 anti-pattern.

**Verification of 6 PLAN.md-cited hits (lines 22 + 134):** Plan 01 must_haves cites 6 currently-hit lines that MUST all pass via D-01 keyword window OR be listed for `c11_ops_exemptions[]` pinning. Live calibration result:

| Cited line | D-01 starting-set disposition | Action required |
|------------|-------------------------------|-----------------|
| docs/operations/patch-management/00-overview.md:77 | requires-pinning | Keyword extension OR pin (Plan 09) |
| docs/operations/patch-management/00-overview.md:82 | windowed-exempt | None |
| docs/operations/patch-management/00-overview.md:85 | windowed-exempt | None |
| docs/operations/patch-management/01-windows-wufb-rings.md:60 | windowed-exempt | None |
| docs/operations/patch-management/01-windows-wufb-rings.md:63 | windowed-exempt | None |
| docs/operations/patch-management/01-windows-wufb-rings.md:75 | windowed-exempt | None |

5 of 6 PLAN-cited hits already pass via the D-01 starting keyword set. The remaining hit (`00-overview.md:77`) is part of the same Autopatch-vs-WUfB disambiguation paragraph as lines 82 and 85 -- the line-77 prose says "Autopatch rings are the service-managed ring topology" with line 75-76 immediately above containing `mutually\n  exclusive` (whitespace-flanked across a Markdown list-item soft break). Lines 82 and 85 use the canonical hyphenated form `mutual-exclusion property` which matches the literal D-01 keyword `mutual-exclusion`; line 77's `mutually exclusive` two-word form does not.

**Live verification of extended keyword set:** Adding `mutually\s+exclusive`, `co-management`, `migration`, `transition`, `replacement` to the keyword regex resolves all 5 `requires-pinning` hits to `windowed-exempt`:

```
docs/common-issues.md:143                                         kw=migration
docs/operations/patch-management/01-windows-wufb-rings.md:165     kw=co-management
docs/operations/patch-management/01-windows-wufb-rings.md:170     kw=co-management
docs/reference/00-index.md:46                                     kw=Migration
docs/operations/patch-management/00-overview.md:77                kw=mutually_exclusive (whitespace-flexible)
```

Plan 09 atomic harness commit recommendation: **extend the C11 proximity-window keyword regex** to:

```
/successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout/i
```

This eliminates `c11_ops_exemptions[]` initial population per CONTEXT D-02 (reserved-empty array shape preserved). All 12 C11 corpus hits pass via window negation; zero pinning required. Per Plan 01 line 99 + RESEARCH "Specifics" guidance ("Window-extension is preferred for generic terms; pinning is preferred for site-specific terms"), `mutually exclusive`, `co-management`, `migration`, `transition`, `replacement` are GENERIC ops-domain disambiguation terms expected to recur across v1.6+ content -- window-extension is correct.

**Anti-pattern hits in Section B:** 0. (Phase 49-59 V-NN-NN structural assertions guarantee no regressions; D-28 pre-promotion calibration confirms zero ops-domain false-positives that would represent a Phase 49-59 regression.)

## Summary

| Section | Hits | Disposition Breakdown |
|---------|------|------------------------|
| A: C9 corpus | 1 | 1 legitimate (-> c9_exemptions[]) / 0 anti-pattern (REGRESSION; must be 0) |
| B: C11 corpus | 12 | 7 windowed-exempt / 5 requires-pinning (resolved via Plan 09 keyword extension; -> c11_ops_exemptions[] reserved-empty per D-02) / 0 anti-pattern (REGRESSION; must be 0) |
| **Total** | **13** | **8 already-passing under D-01 starting set / 5 resolved via keyword extension / 1 c9_exemptions[] seed / 0 anti-pattern** |

## Plan 09 Inputs

**c9_exemptions[] seed entries (Plan 09 atomic harness commit):**

- `{"file": "docs/android-lifecycle/03-android-version-matrix.md", "line": 41, "reason": "Phase 34 Foundation + Phase 36 (AECOBO-02 COBO migration-note) -- ### Android 11 -- COPE NFC Provisioning Removed H3 heading documents Google-driven Android-11 NFC + afw#setup provisioning-method removal for COPE / WPCO; PITFALL-13 disambiguation: Google has NOT formally deprecated COPE per _glossary-android.md:200 2023+ entry. Match-text is HISTORICAL prose about a provisioning-method removal, NOT a COPE-mode deprecation claim. legitimate-disambiguation."}`

Total seed count: **1 entry**.

**C11 final keyword regex (Plan 09 atomic harness commit):**

```
/successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout/i
```

Added beyond D-01 starting set: `mutually\s+exclusive` (whitespace-tolerant for soft-break paragraph wraps), `co-management` (canonical SCCM/Intune workload-slider co-management term), `migration` (Migration Guides / Migration Issues hub-section semantics), `transition` (cross-tool migration-guide labels), `replacement` (legacy-tool replacement labels in index entries).

Each keyword cited above is a GENERIC ops-domain disambiguation term that recurs across v1.5 ops-depth + v1.6+ planned content (per RESEARCH "Specifics" guidance). Window-extension is preferred over per-line `c11_ops_exemptions[]` pinning per Plan 01 line 99 ("central calibration knob per D-01 Claude's Discretion").

**c11_ops_exemptions[] seed entries (Plan 09 atomic harness commit):**

Reserved-empty per CONTEXT D-02 -- initial population = 0 entries.

(All 12 C11 corpus hits pass via the extended keyword window after Plan 09 lands; no per-line pin coordinates required at Phase 60 close. Lazy-add per CONTEXT D-02 + Phase 48 D-15 when first non-windowed legitimate occurrence appears in v1.6+ content.)

