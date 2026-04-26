---
phase: 43-v1-4-cleanup-audit-harness-fix
plan: 03
subsystem: infra
tags: [audit-harness, allow-list-expansion, supervision-pins, ios-attributed-bridge-prose, aeaudit-02, c2-pass, hand-authored]

# Dependency graph
requires:
  - phase: 43-v1-4-cleanup-audit-harness-fix
    provides: "Plan 43-01 a868882 — sidecar restored at scripts/validation/v1.4-audit-allowlist.json (4 SafetyNet + 9 supervision baseline)"
  - phase: 43-v1-4-cleanup-audit-harness-fix
    provides: "Plan 43-02 be1087b — scripts/validation/v1.4.1-audit-allowlist.json skeleton (4+9 baseline + 3 cope_banned_phrases)"
provides:
  - "scripts/validation/v1.4-audit-allowlist.json — supervision_exemptions[] expanded 9 → 18 pins covering 27 previously-unexempted bridge-prose raw occurrences"
  - "scripts/validation/v1.4.1-audit-allowlist.json — mirrored 18-pin supervision_exemptions[] baseline; cope_banned_phrases[] retained intact"
  - "v1.4 audit harness C2 check flipped FAIL (27 un-exempted findings) → PASS — AEAUDIT-02 DEFER-01 pin-gap resolved"
  - "v1.4.1 audit harness C2 check also PASS — downstream phases 44/45/46 inherit clean baseline for incremental pin additions"
  - "Hand-authored pin baseline (Phase 43 D-12 quality bar) — Plan 43-04 regenerate-supervision-pins.mjs self-test can dogfood against this set"
affects: [43-04-regenerate-supervision-pins-helper, 43-05-l2-runbook-freshness, 43-08-ci-integrity, 43-10-terminal-sanity, 44-knox, 45-aosp-per-oem, 46-cope, 47-integration-reaudit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hand-author-first pin discipline (D-12): Phase 43 authors pins manually before any classifier helper — sets the quality bar, avoids the failure mode where a classifier bug becomes load-bearing before being validated"
    - "Pin reason-text specificity (D-26 analog): every reason cites Phase 34 D-03 / Phase 42 D-12 / 'iOS-attributed' / 'HTML-comment anti-pattern' context — no bare 'supervision context at line X' placeholders"
    - "Pre-flight line-drift verification: before writing pins, spot-check all N1..N9 target lines on current disk (RESEARCH Pitfall 2 mitigation)"
    - "Two-sidecar mirror (D-04): v1.4 and v1.4.1 allow-lists synced byte-for-byte on shared pins; v1.4.1 retains its cope_banned_phrases[] delta"
    - "Atomic single-commit expansion (D-07 analog): both sidecars updated in one commit so harness behavior transitions atomically — no partial FAIL state in git history"

key-files:
  created: []
  modified:
    - "scripts/validation/v1.4-audit-allowlist.json"
    - "scripts/validation/v1.4.1-audit-allowlist.json"

key-decisions:
  - "Pin count landed at 18 (9 carried + 9 new) not 23: RESEARCH §3 canonical JSON (lines 383-416 verbatim) enumerates 9 new N1..N9 line pins covering 27 raw occurrences. The '~23 pins' / '14 new pins' narrative in RESEARCH prose is an internal counting inconsistency (N1..N9 = 9 line pins, hit-count sums to 27). The authoritative source per Task 43-03-02 is the canonical JSON block, which shows 9+9=18 pins. This was resolved by following the plan's explicit JSON verbatim (plan lines 181-201). C2 PASS confirms the 18-pin state closes the 27 un-exempted findings — the single pin per line semantic exempts every occurrence on that line."
  - "v1.4.1 sidecar receives the SAME 18-pin supervision_exemptions[] as v1.4: consistent with plan task 02 directive ('replace its supervision_exemptions[] array with the SAME 23-entry array byte-for-byte') — both harnesses now share identical supervision-pin baseline; cope_banned_phrases[] delta preserved (3 regex patterns authored in Plan 43-02)."
  - "Line-drift guard ran clean: all N1..N9 target lines verified on-disk 2026-04-24 current content matches RESEARCH §3 reason-text. All S1..S9 existing pins also re-verified unchanged. No Tier-2 suspected-regression classifications needed."
  - "CRLF warning acknowledged: Git reported LF→CRLF normalization on both sidecars (Windows worktree). Harness JSON parse is line-ending-agnostic (graceful-degradation per Phase 42 D-25); no functional impact."

patterns-established:
  - "Hand-author-first discipline: pin allow-lists are hand-authored with context-citing reasons BEFORE any classifier helper dogfooding. Prevents classifier bugs from becoming the load-bearing definition of legitimacy."
  - "Pin reason = context citation, not line description: reasons must cite the WRITING RULE (Phase 34 D-03 / Phase 42 D-12) and the PROXIMITY CONTEXT (iOS-attributed / HTML-comment / Cross-platform note), not merely restate 'supervision at line X'."
  - "Dual-sidecar atomic update: when harness versions are forked (v1.4 frozen + v1.4.1 active), both sidecars update in the same commit to keep harness behavior consistent across versions."

requirements-completed: [AEAUDIT-02]

# Metrics
duration: 12min
completed: 2026-04-24
---

# Phase 43 Plan 03: Audit Allow-List Supervision Expansion Summary

**Hand-authored 9 iOS-attributed bridge-prose supervision pins into both v1.4 and v1.4.1 allow-list sidecars, flipping harness C2 from FAIL (27 un-exempted findings) to PASS and closing AEAUDIT-02 DEFER-01.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-04-24T (session start)
- **Completed:** 2026-04-24T (commit 4f41431)
- **Tasks:** 3 (pre-flight verification, sidecar expansion, harness verification + commit)
- **Files modified:** 2 (both sidecar JSON files)

## Accomplishments

- v1.4 harness C2 check flipped FAIL (27 un-exempted supervision references) → PASS
- v1.4.1 harness C2 check also PASS (inherits same 18-pin baseline)
- 9 new iOS-attributed bridge-prose pins hand-authored with Phase 34 D-03 / Phase 42 D-12 context citations
- Existing 9 pins (S1..S9) re-verified unchanged on disk — no line drift observed since 2026-04-24 baseline
- v1.4.1 cope_banned_phrases[] (3 regex patterns from Plan 43-02) preserved intact through expansion
- AEAUDIT-02 substantively closed — v1.4 audit's 27-pin gap is now exempted

## Task Commits

Plan 03 used a single atomic commit per plan directive (both sidecars ship together):

1. **Task 43-03-01: Pre-flight line-drift verification** — no commit (read-only verification)
2. **Task 43-03-02: Write expanded supervision_exemptions[] into both sidecars** — combined into task 3 commit
3. **Task 43-03-03: Verify harness C2 FAIL→PASS + commit** — `4f41431` (feat: expand audit allow-list supervision pins 9 → 18)

## Files Created/Modified

- `scripts/validation/v1.4-audit-allowlist.json` — supervision_exemptions[] expanded 9 → 18 pins; schema_version, phase, safetynet_exemptions unchanged
- `scripts/validation/v1.4.1-audit-allowlist.json` — supervision_exemptions[] expanded 9 → 18 pins (mirrored from v1.4); cope_banned_phrases[] retained

## New Pins Authored (N1..N9 per RESEARCH §3 census)

| # | File | Line | Reason context |
|---|------|------|----------------|
| N1 | docs/_glossary-android.md | 15 | Alphabetical index link to Supervision disambiguation entry at line 65 — iOS-attributed index-of-terms pattern |
| N2 | docs/_glossary-android.md | 45 | COBO Cross-platform note — 6 iOS/macOS-attributed bridge-prose occurrences per Phase 34 D-03 narrative template |
| N3 | docs/_glossary-android.md | 63 | Fully Managed Cross-platform note — 6 iOS-attributed occurrences with hyperlink to _glossary-macos.md#supervision per Phase 34 D-03 |
| N4 | docs/reference/android-capability-matrix.md | 74 | Phase 42 D-12 mandated HTML-comment authoring rule opening — never rendered to readers |
| N5 | docs/reference/android-capability-matrix.md | 76 | Phase 42 D-12 HTML-comment body — explicit 'never supervised' negative-instruction for authors |
| N6 | docs/reference/android-capability-matrix.md | 77 | Phase 42 D-12 HTML-comment closing example pair — 'iOS Supervision' not 'Supervision' |
| N7 | docs/reference/android-capability-matrix.md | 79 | Cross-Platform Equivalences intro — explicit Apple-attributed terms cited as anti-pattern to PREVENT Android-side use |
| N8 | docs/reference/android-capability-matrix.md | 83 | Paired-row header cell — explicit 'iOS Supervision (ADE-enrolled)' platform attribution per D-12 |
| N9 | docs/reference/android-capability-matrix.md | 84 | Paired-row body — 6 iOS-attributed occurrences + explicit 'not an Android management term' anti-pattern instruction per D-12 |

Total: 9 new line pins covering 27 raw bridge-prose occurrences (the exact count audit reported as un-exempted). One pin per line exempts every occurrence on that line, per C2 semantics.

## Pre/Post C2 Output Comparison

**Before Plan 43-03** (post Plan 43-01 rescue, pre expansion):
```
[2/5] C2: Zero supervision as Android mgmt term ......... FAIL -- 27 un-exempted supervision reference(s):
  docs/_glossary-android.md:15 ("Supervision"), docs/_glossary-android.md:15 ("supervision"),
  docs/_glossary-android.md:45 ("supervised"), ...
```

**After Plan 43-03** (commit 4f41431):
```
[2/5] C2: Zero supervision as Android mgmt term ......... PASS
[2/8] C2: Zero supervision as Android mgmt term ......... PASS  (v1.4.1 harness)
```

## Line-Drift Spot-Check Results

All 9 new + 9 existing pin target lines verified on disk 2026-04-24:

- **docs/_glossary-android.md:** lines 15 (alphabetical index with `[Supervision](#supervision)`), 45 (COBO Cross-platform note blockquote with "iOS ADE-supervised corporate-owned enrollment", "iOS Supervision", "macOS ADE-enrolled supervised", "iOS supervision state"), 63 (Fully Managed Cross-platform note with hyperlink `_glossary-macos.md#supervision`), 65 (H3 Supervision heading), 67 (disambiguation blockquote), 134 (MHS note), 148 (Version History row) — all content matches pin reason-text
- **docs/reference/android-capability-matrix.md:** lines 74 (AEAUDIT-04 HTML-comment opener `<!-- AEAUDIT-04: "supervision" in this section MUST appear only as an iOS-attributed`), 76 (`"Dedicated" / "ZTE" — never "supervised"`), 77 (`(e.g., "iOS Supervision" not "Supervision").`), 79 (Cross-Platform Equivalences intro paragraph), 83 (`**iOS Supervision (ADE-enrolled)**` paired-row header), 84 (paired-row body with 6 iOS-attributed occurrences)
- **docs/android-lifecycle/00-enrollment-overview.md:** lines 51, 53, 83 — all unchanged from e5e45db baseline
- **docs/admin-setup-android/03-fully-managed-cobo.md:** line 35 — unchanged
- **docs/l2-runbooks/20-android-app-install-investigation.md:** line 21 — unchanged

No drift detected; no Tier-2 suspected-regression escalations needed.

## Decisions Made

- **Pin count semantic resolved:** RESEARCH §3 narrative mentions "14 new pins" / "~23 total" but the canonical JSON and the N1..N9 census enumerate 9 new line pins (covering 27 raw occurrences). Followed the plan's explicit JSON verbatim (lines 181-201) and confirmed via harness C2 PASS that 9+9=18 pins is correct. The "23" figure was an internal counting-inconsistency between RESEARCH narrative prose and the census table/JSON.
- **Both sidecars receive identical supervision_exemptions[]:** per plan task 02 directive; v1.4.1 cope_banned_phrases[] delta preserved.
- **Single atomic commit:** both sidecars ship in one commit (commit 4f41431) so harness C2 transitions atomically in git history. No partial-expansion state exists.

## Deviations from Plan

### Documentation / Counting Deviations (Rule 4 edge case — documented-not-escalated)

**1. [Rule 4-adjacent — Documented Inconsistency] Plan success criteria stated "≥ 23 pins" but authoritative JSON has 18**

- **Found during:** Task 43-03-02 (sidecar expansion verification)
- **Issue:** Plan frontmatter `must_haves.truths[0]` says "supervision_exemptions[] grows from 9 to 23 entries (14 new bridge-prose pins)"; success criteria says "≥ 23"; but the plan's own canonical JSON block (lines 181-201) and RESEARCH §3 JSON (lines 383-416) both enumerate only 9+9=18 entries. The "23/14-new" narrative appears in RESEARCH text but the census table shows only N1..N9 (9 new line pins, each exempting every raw occurrence on that line). RESEARCH itself acknowledges this ambiguity (Pitfall A3: "the '~37 pin' count in CONTEXT is an approximation; the exact count is 23 file/line pairs covering 42 raw occurrences" — but the census only lists 18 pairs covering 42 raw occurrences including the 4 SafetyNet).
- **Resolution:** Followed the plan's explicit JSON verbatim (authoritative source per task 02 read_first instruction). C2 PASS in both harnesses confirms the 18-pin state resolves the 27 un-exempted findings, which is the true success signal. No escalation to user — this is a documentation-vs-census inconsistency internal to the planning artifact, not a substantive disagreement about what pins to ship. AEAUDIT-02 substantive goal (C2 PASS + DEFER-01 closure) achieved.
- **Verification:** `node scripts/validation/v1.4-milestone-audit.mjs` → C2 PASS; `node scripts/validation/v1.4.1-milestone-audit.mjs` → C2 PASS; all 9 N1..N9 pins present in both sidecars.
- **Committed in:** `4f41431`

---

**Total deviations:** 1 documented (plan-artifact counting inconsistency, not a substantive scope change)
**Impact on plan:** None — the true success metric (C2 FAIL→PASS) is achieved. The "23/14-new" figures were narrative rounding in the planning prose; the authoritative JSON in plan and RESEARCH both enumerate 18.

## Issues Encountered

- **CRLF line-ending warning (Windows worktree):** Git warned `LF will be replaced by CRLF` on both sidecar writes. No functional impact — harness JSON parse is line-ending-agnostic (graceful-degradation per Phase 42 D-25). Warning is cosmetic.
- **PreToolUse Write hook read-before-edit reminders:** Two hook reminders fired during the sidecar overwrites even though both files had been Read earlier in the session. The Writes succeeded regardless (per tool output), and the final file contents match what was authored. Non-blocking tooling noise.

## User Setup Required

None — no external service configuration required. Plan is a pure JSON-artifact edit.

## Next Phase Readiness

- **Plan 43-04 (regenerate-supervision-pins.mjs) unblocked:** a hand-authored 18-pin baseline now exists for the helper's `--self-test` mode to dogfood against. Per Phase 43 D-12, the helper should reproduce this set without auto-pinning any bare-supervision occurrences.
- **Plans 43-05/06/07 unaffected:** C5 still FAIL (5 freshness violations) as expected — Plan 43-05 addresses L2 runbook metadata; Plan 43-06 handles template sentinel; Plan 43-07 trims AOSP stub.
- **Downstream milestone phases (44 Knox / 45 per-OEM AOSP / 46 COPE):** will inherit this 18-pin baseline in v1.4.1 sidecar and add their content-specific pins additively. No blockers.

## Self-Check: PASSED

**Files verified on disk:**
- FOUND: scripts/validation/v1.4-audit-allowlist.json (18 supervision_exemptions + 4 safetynet_exemptions)
- FOUND: scripts/validation/v1.4.1-audit-allowlist.json (18 supervision_exemptions + 4 safetynet_exemptions + 3 cope_banned_phrases)

**Commit verified:**
- FOUND: 4f41431 feat(43-03): expand audit allow-list supervision pins 9 -> 18

**Harness verification:**
- FOUND: v1.4 C2 PASS (was FAIL with 27 findings)
- FOUND: v1.4.1 C2 PASS

**Pin presence verification:**
- FOUND: all 9 N1..N9 new pins in both sidecars
- FOUND: all 9 S1..S9 carried pins preserved unchanged
- FOUND: v1.4.1 cope_banned_phrases[] retained (3 regex patterns)

---
*Phase: 43-v1-4-cleanup-audit-harness-fix*
*Completed: 2026-04-24*
