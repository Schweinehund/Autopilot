---
phase: 119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal
plan: 01
subsystem: milestone-close-harness
tags: [wave-0, reconnaissance, anchor-sha, v114-pin, baseline-diagnostic, sidecar-repoint]
requires: []
provides:
  - "Wave-0 anchor SHA (predecessor-byte-unchanged HARD-gate base for Plan 119-04)"
  - "Confirmed V114 = 7d922a7 (substantive v1.14 close-gate; f3959c8 explicitly rejected)"
  - "Baseline v1.14-harness diagnostic = sidecar-repoint worklist for Plan 119-02"
affects:
  - "119-02 (Atom 1 sidecar repoint consumes the C2/C7/C9 shifted-pin worklist)"
  - "119-03 (frozen-at-close V114 entry consumes the 7d922a7 disambiguation)"
  - "119-04 (predecessor-byte-unchanged HARD gate consumes the Wave-0 anchor SHA)"
tech-stack:
  added: []
  patterns: [reconnaissance-only-wave-0, back-anchor-invariant, single-point-of-failure-sha-confirmation]
key-files:
  created:
    - .planning/phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/119-01-SUMMARY.md
  modified: []
decisions:
  - "V114 positively confirmed as 7d922a7 via commit-message assertion (contains both MILESTONE-AUDIT and MILESTONE CLOSE); naive grep-recovery result f3959c8 explicitly rejected"
  - "Wave-0 anchor SHA recorded as DISTINCT from the BASELINE_19 freshness anchor (119-02 captures the latter JIT immediately before the Atom-1 commit; Pitfall 4)"
  - "Baseline v1.14 harness ran RED (11/4/0) against HEAD — all 4 FAILs are EEE-retrofit-induced pin drift on Phase-1 surfaces; NO harness file authored (reconnaissance-only, v1.14 112-01 precedent)"
  - "HARN-02/HARN-03 NOT flipped to complete — Wave-0 contributes to them but SC5 flips all 16 reqs in the single close-gate commit only"
metrics:
  duration: ~10min
  completed: 2026-07-06
  tasks: 2
  files: 1
---

# Phase 119 Plan 01: Wave-0 Pre-Anchor + Baseline Reconnaissance Summary

Captured the Wave-0 predecessor-byte-unchanged anchor SHA, positively confirmed the V114 close-gate pin is `7d922a7` (rejecting the ambiguous `f3959c8` grep-recovery), and ran the current v1.14 milestone-audit against HEAD to produce the exact sidecar-repoint worklist Plan 119-02 must apply before authoring the v1.15 sidecar. No harness file was authored — this is reconnaissance-only per the v1.14 Plan 112-01 precedent.

## Task 1 — Wave-0 Anchor SHA + V114 Disambiguation

### Wave-0 anchor SHA (predecessor-byte-unchanged HARD-gate base for Plan 119-04)

```
c6ea8d257e0a2cbcf97cc597fc24d169f804a286
```

This is the current HEAD at Wave-0 time (`git rev-parse HEAD`). It is the base for the **predecessor-byte-unchanged HARD gate** asserted at close by Plan 119-04: `git diff c6ea8d2 HEAD` over the non-Phase-1 frozen surfaces must be EMPTY (v1.14 audit line-330 pattern).

**CRITICAL — this is DISTINCT from the BASELINE_19 freshness anchor.** Per RESEARCH Pitfall 4, Plan 119-02 must capture the BASELINE_19 back-anchor SHA via `git rev-parse HEAD` **just-in-time, immediately before authoring the Atom-1 commit** — NOT reuse this Wave-0 SHA. An intervening automated commit (this repo runs a Jira-milestone Stop-hook that auto-commits on phase-state transitions) may land between Wave-0 and Atom 1, exactly as v1.14's Wave-0 anchor `0a7699f` was an *ancestor* of (not identical to) its true BASELINE_18 anchor `1a0ee15`. Do NOT conflate the two anchors.

### V114 = 7d922a7 CONFIRMED substantive close-gate — DO NOT pin f3959c8

- `git log -1 --format=%s 7d922a7` returns:
  `docs(112-05): Phase 112 close-gate — v1.14 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.14 MILESTONE CLOSE`
  — contains **both** `MILESTONE-AUDIT` **and** `MILESTONE CLOSE` (assertion passes).
- The naive recovery command `git log --all --grep="112-05" --grep="close-gate" --all-match -1 --format=%H` returns **`f3959c8`** with subject `docs(112-05): complete v1.14 milestone close-gate plan` — this is the SUMMARY-plan follow-up that landed ~3 min later, **NOT** the substantive close-gate. **DO NOT pin f3959c8.**

This disambiguation is load-bearing for Plan 119-03's `_lib/frozen-at-close.mjs` V114 entry (`V114: '7d922a7'` + `readAtV114Close` helper). A wrong SHA here would silently read the wrong frozen corpus for any validator adopting `readAtV114Close`.

### New-collision-class assessment (no guard code authored here)

v1.14's Plan 112-06 completed the `CHECK_PHASE_NESTED` guard doctrine + frozen-aware-read conversion across the predecessor cohort authored **through Phase 112** (validators 96-99 / 101-111 are all pre-112 and covered by that sweep). The new 113-119 validators are authored fresh in Atom 2 with the guard. So the *NESTED-guard collision class* is expected to be inoculated.

**However**, the baseline diagnostic (Task 2) surfaces a **different, still-live class**: content-assertion-vs-evolved-corpus drift. The EEE retrofit's edit shape (EEE header block + `## Summary` block + Version-History row insertion) shifted the C2/C7/C9 sidecar `{file,line}` pins on Phase-1 surfaces **and** introduced a brand-new C15 Summary-text collision (see Task 2). This is exactly the surface the Atom-1 sidecar repoint (119-02) + the pre-authorized emergent remediation slot (D-119-3) exist to absorb. Per Open Question 3, treat any authoritative-GHA-apex RED as informative, not surprising. **No guard/remediation code authored in this plan** — deferred to 119-02 (sidecar) and the conditional remediation slot.

## Task 2 — Baseline v1.14 Harness Diagnostic (against HEAD `c6ea8d2`)

### Tally

| Run | Result |
|-----|--------|
| `node scripts/validation/v1.14-milestone-audit.mjs --self-test` | **9 passed, 0 failed** — exit 0 |
| `node scripts/validation/v1.14-milestone-audit.mjs --verbose` | **11 PASS / 4 FAIL / 0 SKIP** — exit 1 |

Failing checks: **C2 (supervision), C7 (bare-Knox), C9 (COPE), C15 (Intune-delegation).** All 4 are EEE-retrofit-induced drift against Phase-1 surfaces retrofitted in Phases 116/117/118. The v1.15 sidecar **cannot be copied verbatim** (confirms RESEARCH Assumption A3 / Pitfall / Pattern-2 "do not copy verbatim without re-verification").

### RE-144 (android-capability-matrix.md) pins SHIFTED — CONFIRMED

Yes. The Phase-118 RETRO-03 EEE retrofit of `docs/reference/android-capability-matrix.md` (RE-144) shifted its Cross-Platform Equivalences supervision block down by ~+34..+36 lines and its AMAPI COPE-footnote by +20. This was the single highest-probability silent-copy-error site and it did in fact drift.

### Sidecar-repoint worklist for Plan 119-02 (v1.15-audit-allowlist.json)

**C2 — `supervision_exemptions[]`** (regex `/\bsupervis(ion|ed|ory)\b/gi`; 17 un-exempted matches total):

| File (Doc ID) | Old pin line(s) | New line(s) | Delta / note |
|---------------|-----------------|-------------|--------------|
| docs/reference/android-capability-matrix.md (RE-144) | 89, 91, 92, 94, 98, 99 | 123, 125, 126, 128, 130, 134, 135 | ~+34..+36; block grew 6→7 distinct pinned lines (14 raw matches, line 135 alone has 6) |
| docs/admin-setup-android/03-fully-managed-cobo.md (RE-095) | 36 | 52, 54 | +16 / +18; 1 pin → 2 lines |
| docs/l2-runbooks/20-android-app-install-investigation.md (RE-062) | 21 | 33 | +12 |

**C7 — `c7_knox_allowlist[]`** (bare `\bKnox\b`, 50-char suffix window; 5 un-exempted):

| File (Doc ID) | Old pin line(s) | New line(s) | Context |
|---------------|-----------------|-------------|---------|
| docs/admin-setup-android/07-knox-mobile-enrollment.md (RE-099) | 11, 143, 143, 145 | 21, 167, 167, 173 | "Knox→Intune handoff" (21); "Knox silently produces" + "Knox does not recognize" (both 167); "Knox JSON shown above" (173) |
| docs/admin-setup-android/02-zero-touch-portal.md (RE-094) | 131 | 147 | "Samsung Knox docs" |

**C9 — `c9_exemptions[]`** (`/\bCOPE\b[^.]*\bremoved\b/`; 2 un-exempted):

| File (Doc ID) | Old pin line | New line | Delta |
|---------------|--------------|----------|-------|
| docs/admin-setup-android/03-fully-managed-cobo.md (RE-095) | 153 | 199 | +46 |
| docs/reference/android-capability-matrix.md (RE-144) | 55 | 75 | +20 |

**C15 — NOT a sidecar repoint (distinct class).** C15 uses an **inline `<!-- ABAUDIT-## -->` HTML-comment** exemption mechanism, not a `{file,line}` sidecar list. The 2 authoritative harness matches are a **NEW collision** introduced by the Phase-117 EEE `## Summary` block — the prose "…requires the Intune Administrator role in **Intune admin** center … in **Apple Business** Manager…" trips `/\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|…)/i`. Confirmed primary site: **docs/admin-setup-ios/02-abm-token.md:19 (RE-108, EEE Summary block).** Resolution belongs to 119-02 or the emergent remediation slot — options: (a) insert an `<!-- ABAUDIT-## -->` comment immediately before the Summary line (a Phase-1 surface edit, which is *permitted* this milestone since Phase-1 surfaces are deliberately re-baselined), or (b) reword the Summary to avoid the Intune-admin↔Apple-Business proximity. A broader-scope read (not in the harness's current curated `appleBusinessDocPaths()` C15 scope) shows the same Summary-block pattern latent at `docs/admin-setup-ios/04-configuration-profiles.md:19` and `docs/admin-setup-ios/06-compliance-policy.md:19` — surface these to 119-02 in case the C15 scope enumeration expands.

### Non-Phase-1 pins UNCHANGED (invariant holds)

Every `docs/_glossary-android.md` supervision/Knox/COPE pin (lines 18/51/71/81/83/84/183/197/199/200/204/123/125/127) still resolves and still PASSES — the glossary is NOT in Phase-1 retrofit scope (deferred to v1.16), confirming the non-Phase-1-byte-unchanged invariant holds for those surfaces even now.

### next_review cadence flag (do NOT change here — for 119-02)

`c13_rotting_external.quarterly_audit.next_review = "2027-01-01"` against cron `0 8 1 1,4,7,10 *` (fires Jan/Apr/Jul/Oct 1). Today is **2026-07-06**: the 2026-07-01 quarterly fire just passed and the field's `2027-01-01` value **skips both the 2026-07-01 and 2026-10-01 quarters** (ABM URLs `last_revalidated: 2026-05-26`). Flag for 119-02: decide whether to advance `next_review` to `2026-10-01` (the next unrun quarter) when repointing the sidecar. Not changed in this plan.

## Deviations from Plan

None — plan executed exactly as written. Both tasks are reconnaissance/recording only; no code or harness files were authored or modified (git status shows only the SUMMARY under `scripts/validation/`-adjacent scope, and STATE.md/ROADMAP.md via the close-out metadata commit). Acceptance criterion "No file under scripts/validation/ or .github/ is modified by this plan" holds.

## Requirements Note

Frontmatter tags this plan to HARN-02/HARN-03, but they are **NOT** marked complete here. Per D-119-4 + SC5, all 16 v1.15 requirements flip to Validated in the **single close-gate commit** (Plan 119-08). Marking them now would produce a dishonest audit record. Wave-0 only *contributes* the anchor + confirmed pin + worklist that later plans consume.

## Self-Check

- Wave-0 anchor SHA recorded (`c6ea8d25…`, 40-char, equals HEAD) — verified below.
- `git log -1 --format=%s 7d922a7` contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" — verified (V114_OK).
- Baseline `--self-test` (9/9) and `--verbose` (11/4/0) tallies recorded with full per-check FAIL worklist.
- android-capability-matrix.md (RE-144) shift explicitly stated; next_review cadence flag recorded.
- No file under `scripts/validation/` or `.github/` modified.
