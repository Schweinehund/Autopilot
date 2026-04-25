---
phase: 46
plan: 01
subsystem: documentation
tags: [android, cope, wpco, admin-guide, intune, phase-46, wave-1, aecope-01]
requires:
  - .planning/phases/46-cope-full-admin/46-CONTEXT.md (D-01..D-34 LOCKED)
  - .planning/phases/46-cope-full-admin/46-RESEARCH.md (Path A LOCKED, 8 pitfalls, 2 NEW HIGH findings)
  - .planning/phases/46-cope-full-admin/46-VALIDATION.md (per-task verification map)
  - docs/admin-setup-android/03-fully-managed-cobo.md (PRIMARY SIBLING — 11 H2 anchor source)
  - docs/_glossary-android.md (COPE / WPCO / KME / Work Profile canonical anchors)
  - docs/admin-setup-android/02-zero-touch-portal.md (#kme-zt-mutual-exclusion + #dpc-extras-json + #link-zt-to-intune anchors)
  - docs/admin-setup-android/07-knox-mobile-enrollment.md (Phase 44 sibling Samsung-admin reading-path node)
provides:
  - docs/admin-setup-android/08-cope-full-admin.md (NEW; 11 H2s mirroring COBO; ~317 lines; full Intune admin guide for Corporate-owned devices with work profile / COPE / WPCO)
affects:
  - .planning/REQUIREMENTS.md (AECOPE-01 closed; Wave 2 plan 46-02 will mark in atomic retrofit)
  - Wave 2 plan 46-02 (depends_on: [46-01]; consumes the new admin doc as the cross-link landing target for capability-matrix retrofit + glossary Private Space H3 + version-matrix breakpoint H3 + COBO migration-note trim + BYOD line 167 retrofit)
tech-stack:
  added: []
  patterns:
    - "11-H2 admin guide skeleton (Key Concepts / Prerequisites / [Mode-specific] / Enrollment profile / Enrollment token / Provisioning method / Android 15 FRP / What Breaks / Renewal / See Also / Changelog) — D-01 lock; byte-identical sequence to COBO sibling"
    - "Inline `> What breaks if misconfigured` blockquotes at action points (sibling pattern)"
    - "Emoji-bearing `> ⚠️` blockquote callouts for Private Space (one-line single-source-of-truth; D-08 + D-33 Pitfall 8 Option A scope-tightened wording) and Samsung-admins (verbatim WPCO equivalence sentence; D-19)"
    - "Inverse-direction COPE Migration Note H2 with back-link to COBO sibling (D-03 repurposed-not-duplicated)"
    - "5 sub-H3s under Provisioning method choice (QR / NFC / afw#setup / Token entry / Zero-Touch) preserving parity with MS Learn ref-corporate-methods.md enumeration; THREE Android-11+-removal callouts (RESEARCH NEW FINDING #1)"
    - "COPE-vs-COBO decision matrix as sub-H3 inside Provisioning method choice (preserves 11-H2 lock per D-05 / RESEARCH Open Question #1)"
    - "Source-confidence marker regex compliance (4 HIGH markers; D-28 inheritance)"
    - "60-day Android freshness frontmatter (D-26 inheritance)"
key-files:
  created:
    - docs/admin-setup-android/08-cope-full-admin.md
  modified: []
decisions:
  - "Decision matrix placed as sub-H3 inside `## Provisioning method choice` (NOT as 12th H2) per D-05 / RESEARCH Open Question #1 — preserves 11-H2 lock so COBO H2 sequence diff is empty"
  - "Block A Private Space callout uses CONTEXT D-33 / Pitfall 8 Option A scope-tightened wording: '**Intune** cannot manage Private Space content...' (NOT the absolute D-08 wording 'no admin policy lever in COPE or any other mode'); honors Bayton AMAPI-native EMM nuance"
  - "5 provisioning sub-H3s adopted (QR / NFC / afw#setup / Token entry / Zero-Touch) per RESEARCH Open Question #3; Token entry surfaced as a 5th method per RESEARCH NEW FINDING #1 with verbatim Note from MS Learn ref-corporate-methods.md"
  - "Android 15 FRP H2 mirrors COBO STRUCTURE only (NOT body) and embeds COPE-specific FRP behavior table (Block F) verbatim PLUS the COPE-specific Settings-app re-enrollment requirement (Block G); does NOT copy-paste COBO body — RESEARCH NEW FINDING #2"
  - "Microsoft Intune Plan 1+ baseline matched from COBO sibling per RESEARCH Open Question #4"
  - "Source-attribution HTML comment in COPE Migration Note rephrased to avoid the banned word `deprecated` even when used in factual evidence-against-deprecation context — defensive D-31 discipline"
metrics:
  duration: ~30 minutes
  completed_date: 2026-04-25
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  lines_added: 317
  bytes: 39000
---

# Phase 46 Plan 01: COPE Full Admin Guide Wave 1 Authoring Summary

**One-liner:** Full Intune admin guide for Corporate-owned devices with work profile (COPE / WPCO) authored at `docs/admin-setup-android/08-cope-full-admin.md` — 11 H2s byte-identical to COBO sibling, 5 provisioning sub-H3s with three Android 11+ removal callouts, COPE-specific Android 15 FRP behavior table, Private Space ⚠️ unmanaged callout, COPE-vs-COBO decision matrix sub-H3, Samsung-admins KME-or-ZT callout — closes AECOPE-01.

## What Shipped

One new file: `docs/admin-setup-android/08-cope-full-admin.md` (317 lines, 39 KB). Byte-count and line-count within the planned envelope (200-320 lines per COBO sibling shape per D-32).

### 11 H2 Names In Order (byte-identical to COBO sibling)

1. `## Key Concepts` (line 25)
2. `## Prerequisites` (line 42)
3. `## COPE Migration Note` (line 62) — REPURPOSED inverse-direction per D-03
4. `## Enrollment profile creation` (line 73)
5. `## Enrollment token management` (line 124)
6. `## Provisioning method choice` (line 158) — contains decision matrix sub-H3
7. `## Android 15 FRP and EFRP` (line 222)
8. `## What Breaks Summary` (line 263)
9. `## Renewal / Maintenance` (line 284)
10. `## See Also` (line 296)
11. `## Changelog` (line 313)

`diff` of `grep '^## '` output between `08-cope-full-admin.md` and `03-fully-managed-cobo.md` is EMPTY — sequence and names match exactly.

### Verbatim Content Blocks A-J Landed

| Block | Description | Source | New File Line(s) |
|-------|-------------|--------|------------------|
| **A** | D-33 Pitfall 8 Option A scope-tightened Private Space `> ⚠️` callout (Intune-scoped, NOT absolute "no admin policy lever in any mode") | RESEARCH §Pitfall 8 + CONTEXT D-08 + D-33 | 39 (inside `## Key Concepts` H2 trailing line) |
| **B** | Intune admin center COPE 5-step navigation including verbatim UI label "Corporate-owned devices with work profile" | MS Learn `setup-corporate-work-profile.md` Create-an-enrollment-profile section | 78-82 (inside `## Enrollment profile creation` H2) |
| **C** | 2 GA token types (default + via staging up to 65 years) verbatim | MS Learn `setup-corporate-work-profile.md` | 91-95 (inside `## Enrollment profile creation` H2) |
| **D** | All 7 naming templates (`{{SERIAL}}` / `{{SERIALLAST4DIGITS}}` / `{{DEVICETYPE}}` / `{{ENROLLMENTDATETIME}}` / `{{UPNPREFIX}}` / `{{USERNAME}}` / `{{RAND:x}}`) verbatim with trailing edits-only-apply-to-new sentence | MS Learn `setup-corporate-work-profile.md` Naming Template section | 99-109 (inside `## Enrollment profile creation` H2) |
| **E** | Three Android 11+ removed methods for COPE: NFC + `afw#setup` + Token entry (verbatim NFC/afw#setup sentence at lines 174 / 182 + verbatim Token entry Note at line 190) per RESEARCH NEW FINDING #1 | MS Learn `setup-corporate-work-profile.md` + `ref-corporate-methods.md` Enroll-by-using-a-token Note | 160 (intro callout); 174 (### NFC); 182 (### afw#setup); 190 (### Token entry) |
| **F** | COPE-specific FRP behavior table (verbatim from MS Learn; differs from COBO at Settings>Factory data reset row) per RESEARCH NEW FINDING #2 | MS Learn `ref-corporate-methods.md` Factory reset protection section | 230-234 (inside `## Android 15 FRP and EFRP` H2) |
| **G** | Android 15 COPE-specific re-enrollment requirement (verbatim; does NOT appear in COBO H2) per RESEARCH NEW FINDING #2 | MS Learn `ref-corporate-methods.md` | 238-240 (inside `## Android 15 FRP and EFRP` H2 immediately after Block F) |
| **H** | Conditional Access exclusion verbatim quote | MS Learn `ref-corporate-methods.md` opening Note | 57 (inside `## Prerequisites` H2 tenant-conditional bullet) |
| **I** | Samsung-admins callout with verbatim WPCO equivalence sentence + 4 forward-links per D-19 | CONTEXT D-19 LOCKED text | 200 (inside `### Zero-Touch` H3 of `## Provisioning method choice` H2) |
| **J** | COPE-vs-COBO decision matrix (5 rows × 3 cols) as `### COPE-vs-COBO decision matrix` sub-H3 with `<a id="cope-vs-cobo-decision"></a>` anchor immediately above | CONTEXT D-13/D-15/D-16/D-17 LOCKED cells | 206 (anchor); 207 (sub-H3); 211-217 (table) |

## Acceptance Criteria Verification

All 24 acceptance criteria from Plan 46-01 verified:

| # | Criterion | Result |
|---|-----------|--------|
| 1 | File `docs/admin-setup-android/08-cope-full-admin.md` exists | ✅ |
| 2 | `grep -c '^## '` returns exactly `11` | ✅ |
| 3 | All 11 expected H2 names match COBO sibling | ✅ |
| 4 | H2 sequence diff against COBO sibling is EMPTY | ✅ |
| 5 | UI label `Corporate-owned devices with work profile` appears verbatim ≥1 (actual: 6 hits) | ✅ |
| 6 | 7 naming templates each ≥1 hit | ✅ (each = 1) |
| 7 | Two GA token types verbatim ≥1 each | ✅ (each = 2) |
| 8 | `up to 65 years` ≥1 (actual: 4) | ✅ |
| 9 | Android 11+ removal callout enumerates THREE methods (NFC + afw#setup + Token entry) | ✅ (combined ≥3 distinct method references) |
| 10 | COPE FRP table row verbatim present | ✅ |
| 11 | Android 15 COPE re-enrollment text verbatim present | ✅ |
| 12 | Private Space ⚠️ callout in Key Concepts with forward-links | ✅ |
| 13 | Decision matrix anchor `<a id="cope-vs-cobo-decision"></a>` + sub-H3 `### COPE-vs-COBO decision matrix` both present | ✅ |
| 14 | Decision matrix has header + separator + 5 data rows = 7 markdown table lines | ✅ |
| 15 | Samsung-admins callout WPCO equivalence sentence verbatim | ✅ |
| 16 | Samsung-admins callout has 4 forward links (Knox doc / ZT mutex / WPCO glossary / Zero-Touch glossary) | ✅ |
| 17 | Inverse-direction COPE Migration back-link `03-fully-managed-cobo.md#cope-migration` ≥1 | ✅ |
| 18 | Frontmatter `applies_to: COPE` | ✅ |
| 19 | Frontmatter `audience: admin` | ✅ |
| 20 | Frontmatter `platform: Android` | ✅ |
| 21 | Frontmatter `last_verified: 2026-04-25` (YYYY-MM-DD format) | ✅ |
| 22 | Frontmatter `review_by: 2026-06-24` (last_verified + 60d, YYYY-MM-DD format) | ✅ |
| 23 | Banned-phrase compliance — zero hits attached to COPE-mode | ✅ (only `removed` hits remain; all factual Android-11+-method-removal phrasing per plan-explicit allowance; harness regex `\bCOPE\b[^.]*\bremoved\b` does NOT match in any sentence) |
| 24 | Audit harness `node scripts/validation/v1.4.1-milestone-audit.mjs` returns 8/8 PASS | ✅ |
| 25 | File length 200-320 lines (actual: 317) | ✅ |

## Audit Harness Result

```
[1/8] C1: Zero SafetyNet as compliance mechanism ........ PASS
[2/8] C2: Zero supervision as Android mgmt term ......... PASS
[3/8] C3: AOSP stub word count within Phase 39 envelope . PASS (informational)
[4/8] C4: Zero Android links in deferred shared files ... PASS
[5/8] C5: last_verified frontmatter on all Android docs . PASS
[6/8] C6: PITFALL-7 preservation in AOSP + per-OEM docs . PASS (informational)
[7/8] C7: bare-"Knox" disambiguation check .............. PASS (informational - 117 bare "Knox" occurrence(s); +1 from 116 baseline due to new doc cross-link to KME glossary)
[9/8] C9: COPE banned-phrase check ...................... PASS (informational - 3 COPE banned-phrase occurrence(s); UNCHANGED from baseline; new doc adds zero new hits)

Summary: 8 passed, 0 failed, 0 skipped
```

**Banned-phrase delta:** Zero new hits introduced by Plan 46-01. C9 hit count unchanged from pre-commit baseline (3 hits, all in pre-existing files outside Phase 46 scope).

## Source-Attribution Discipline

4 HIGH-confidence source-attribution markers landed:
- `[HIGH: MS Learn ref-corporate-methods, last_verified 2026-04-25]` — Conditional Access prereq
- `[HIGH: MS Learn setup-corporate-work-profile, last_verified 2026-04-25]` — Enrollment profile creation
- `[HIGH: MS Learn ref-corporate-methods, last_verified 2026-04-25]` — Android 15 FRP behavior table
- `[HIGH: MS Learn factory-reset-protection-emails-not-enforced + Google AE Help answer/14549362, last_verified 2026-04-25]` — EFRP configuration

All MEDIUM/LOW assertions: NONE — every claim in the file is HIGH-confidence verbatim or paraphrase from MS Learn primary sources verified within 9 days of authoring (per `46-RESEARCH.md` updated_at 2026-04-16).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Initial source-attribution HTML comment in `## COPE Migration Note` H2 contained the literal word `deprecated` inside the corpus-canonical evidence-against-deprecation citation**
- **Found during:** Post-write banned-phrase grep audit
- **Issue:** Original HTML comment quoted the glossary line 179 corpus posture verbatim: `corpus-canonical "Google has NOT formally deprecated COPE" posture per _glossary-android.md:179`. Even though semantically this is the EVIDENCE AGAINST deprecation (Google has NOT...), the literal word `deprecated` near `COPE` triggers the plan's defensive D-31 banned-phrase grep `\b(deprecated|...)\b`. While the audit harness C9 check uses a directional regex `\bCOPE\b[^.]*\bdeprecated\b` (which would NOT match because the order is "deprecated COPE" not "COPE...deprecated"), the plan acceptance criterion is broader.
- **Fix:** Rephrased the HTML comment to: `corpus-canonical "Google has not issued a formal end-of-support notice" posture per _glossary-android.md:179`. Preserves semantic intent (no formal end-of-life signal from Google) without using any banned vocabulary attached to COPE.
- **Files modified:** `docs/admin-setup-android/08-cope-full-admin.md` line 70 (single HTML comment, before commit)
- **Commit:** `7272eca` (single-commit task; fix applied pre-commit during banned-phrase verification cycle)

No other deviations. Plan executed structurally as written.

## Authentication Gates

None. Plan was pure markdown authoring with no external service or auth requirements.

## What's Wired vs Stub

This is a documentation file. No data-source wiring concerns apply. Cross-link forward-references to anchors that Wave 2 (Plan 46-02) creates:

- `../_glossary-android.md#private-space` — anchor created by Wave 2 (D-09)
- `../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint` — anchor created by Wave 2 (D-11)

These are EXPECTED transient broken links until Wave 2 lands per CONTEXT D-34 LOCKED interpretation of SC#3 ("ATOMIC same-commit" applies to Wave 2's 5-file retrofit bundle, NOT a cross-Wave-1+Wave-2 single commit). Wave 2 plan declares `depends_on: [46-01]` so sequential landing is enforced. The transient broken-link window closes when Wave 2 commits.

## AECOPE-01 Closure

AECOPE-01 (Phase 46 central deliverable) is functionally CLOSED by this plan. The new admin doc establishes:
- The cross-link landing target for Wave 2 retrofits (capability matrix column, glossary back-link, BYOD line 167 retrofit, version-matrix breakpoint H3, COBO migration-note retrofit)
- The verbatim Intune admin center label, token types, naming templates, version breakpoints, and provisioning methods that the rest of v1.4.1 Phase 46 depends on
- The Path A (full admin guide) execution per CONTEXT Locked Carry-Forward + RESEARCH Gate D-25 PASS

Ready for Wave 2 (Plan 02) atomic same-commit retrofits per CONTEXT D-32 / D-23 / D-34.

## Self-Check: PASSED

- ✅ FOUND: `docs/admin-setup-android/08-cope-full-admin.md`
- ✅ FOUND: commit `7272eca` in `git log --oneline`
- ✅ FOUND: 1 file added, 0 deletions in commit
- ✅ FOUND: Audit harness 8/8 PASS post-commit
- ✅ FOUND: All 24 acceptance criteria satisfied
