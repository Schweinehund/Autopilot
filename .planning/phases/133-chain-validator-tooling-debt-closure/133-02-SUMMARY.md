---
phase: 133-chain-validator-tooling-debt-closure
plan: 02
subsystem: infra
tags: [validation-harness, ci, json-sidecar, chain-validator, frozen-surface]

# Dependency graph
requires:
  - phase: 133-01
    provides: 133-REPIN-COORDINATES.md authoritative old->new {file,line} tables + fragmentation-expansion list + R-1/R-2 recon residuals
provides:
  - 14 re-pinned -audit-allowlist.json sidecars (v1.4, v1.4.1, v1.5..v1.13, v1.14, v1.15, v1.16) with coordinate-only, identity-preserving pin fixes
  - All 14 milestone-audit harnesses green on pin-coordinate-driven checks (C2 supervision, C7 Knox, C9 COPE, safetynet)
  - R-1 correction (v1.4/v1.4.1 MHS pin was NOT actually orphaned -- recon's claim was wrong, fixed as a normal move)
  - R-2/R-3/R-4 content-timeline-gap additions (capability-matrix:129, glossary:151, glossary:330) sourced verbatim from ground-truth sidecars
  - CARVE-1 Phase-134 hand-off note (re-pin is not FROZEN-AWARE-ADOPTION-SWEEP-01 resolution)
affects: [134-v117-pin-16th-path-a-lineage-bump-terminal-close]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Text-splicing JSON sidecar edit via brace-depth tokenizer (preserves untouched bytes exactly, including per-file compact-vs-expanded formatting and CRLF-vs-LF line endings) instead of full JSON.parse/stringify round-trip"]

key-files:
  created: []
  modified:
    - scripts/validation/v1.4-audit-allowlist.json
    - scripts/validation/v1.4.1-audit-allowlist.json
    - scripts/validation/v1.5-audit-allowlist.json
    - scripts/validation/v1.6-audit-allowlist.json
    - scripts/validation/v1.7-audit-allowlist.json
    - scripts/validation/v1.8-audit-allowlist.json
    - scripts/validation/v1.9-audit-allowlist.json
    - scripts/validation/v1.10-audit-allowlist.json
    - scripts/validation/v1.11-audit-allowlist.json
    - scripts/validation/v1.12-audit-allowlist.json
    - scripts/validation/v1.13-audit-allowlist.json
    - scripts/validation/v1.14-audit-allowlist.json
    - scripts/validation/v1.15-audit-allowlist.json
    - scripts/validation/v1.16-audit-allowlist.json

key-decisions:
  - "R-1 OVERRIDE: recon's 'leave the v1.4/v1.4.1 MHS pin unmoved, content no longer exists' claim was empirically wrong (harness-replay + direct grep confirmed the content is still live at glossary:303); corrected to a normal move (134->303 / 172->303) using the pin's own original byte-unchanged reason text"
  - "R-2 resolved via content-timeline-gap ADDITION (not a move): v1.4/v1.4.1/Group-S/v1.14 predate the Phase-119 content that introduced capability-matrix:129's 7th supervision pin; reason text reused verbatim from v1.17's ground-truth sidecar"
  - "R-3 and R-4 (NEW findings, not flagged in 133-REPIN-COORDINATES.md): v1.4/v1.4.1 also lacked pins for glossary:151 (Phase-59 '> See also' line) and glossary:330 (Phase-59 CLEAN-08 changelog row) -- both post-date v1.4/v1.4.1's freeze; resolved via additions sourced verbatim from v1.14's own native reason text"
  - "'Made green' scoped per-check-category (C2/C7/C9/safetynet) per plan's must_haves; pre-existing C4/C5 (v1.4/v1.4.1) and C5/C10 (v1.5-v1.13) residual RED re-confirmed ACCEPTED-STANDALONE-CI-RED, not chased"

requirements-completed: [TOOL-04]

# Metrics
duration: 45min
completed: 2026-07-19
---

# Phase 133 Plan 02: TOOL-04 Coordinate Re-Pin Summary

**All 14 frozen v1.4-v1.16 audit-allowlist.json sidecars re-pinned coordinate-only against v1.17 ground truth; all 14 milestone-audit harnesses now report 0 un-exempted on C2/C7/C9/safetynet, landed in one atomic D-00a-exception commit.**

## Performance

- **Duration:** ~45 min
- **Completed:** 2026-07-19T17:40:46Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments

- Applied Plan 01's authoritative coordinate tables to all 14 sidecars (v1.4, v1.4.1, v1.5..v1.13 Group-S, v1.14, v1.15, v1.16) via a custom brace-depth text-splicing tool that edits only `"line"` integers and inserts identity-preserving fragmentation-sibling pins, leaving every byte of unrelated content (including each file's own compact-vs-expanded JSON formatting and CRLF/LF line endings) untouched
- All 14 `node scripts/validation/v1.<X>-milestone-audit.mjs --verbose` runs now show **zero un-exempted** occurrences for C2 (supervision), C7 (Knox), C9 (COPE), and safetynet — the pin-coordinate-driven check categories in TOOL-04's scope
- Discovered and corrected a recon error (R-1) and two previously-unflagged content-timeline gaps (R-3, R-4) during harness-replay verification, all resolved without inventing new exemption semantics (reused ground-truth reason text throughout)
- Confirmed Group-S (v1.5-v1.13) remains byte-identical across all 4 pin categories post-fix
- Re-confirmed the pre-existing C4/C5 (v1.4/v1.4.1) and C5/C10 (v1.5-v1.13) residual RED as out-of-scope `ACCEPTED-STANDALONE-CI-RED`, matching the research's Appendix D predictions exactly — not chased, not re-disposed

## Task Commits

1. **Task 1+2 combined: Apply coordinate tables, verify, land atomic commit** - `aaf0d2f` (fix)

**Plan metadata:** (this commit, following)

_Note: Tasks 1 and 2 were combined into a single atomic commit per D-09's mandate that the re-pin land as ONE bounded commit; the incremental per-file verification (JSON validity, diff-shape, reason-text preservation) was performed programmatically before staging, not as separate commits._

## Files Created/Modified

- `scripts/validation/v1.4-audit-allowlist.json` - 18->26 supervision pins (7 moves + 2 fragments[+4] + R-1 move + 3 R-2/R-3/R-4 additions), safetynet moved
- `scripts/validation/v1.4.1-audit-allowlist.json` - same shape as v1.4
- `scripts/validation/v1.5-audit-allowlist.json` - 20->26 supervision pins (Group-S computation, applies identically to v1.6-v1.13)
- `scripts/validation/v1.6-audit-allowlist.json` through `v1.13-audit-allowlist.json` - byte-identical Group-S fix
- `scripts/validation/v1.14-audit-allowlist.json` - 20->26 supervision pins (moves + 2 fragments + R-2 addition)
- `scripts/validation/v1.15-audit-allowlist.json` - 22->26 supervision pins (moves + 2 fragments, already had capability-matrix 7th pin)
- `scripts/validation/v1.16-audit-allowlist.json` - 26->26 (pure -1 shift, Case 1 already-solved, zero-risk)

## Per-Category Green Result (14 harnesses x C2/C7/C9/safetynet)

| Sidecar | Exit | C2 | C7 | C9 | safetynet | Residual (out of scope) |
|---|---|---|---|---|---|---|
| v1.4 | 1 | 0 un-exempted | n/a (0 pins, predates Knox) | n/a (0 pins, predates COPE) | 0 | C4, C5 |
| v1.4.1 | 1 | 0 un-exempted | n/a | n/a | 0 | C4, C5 |
| v1.5 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.6 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.7 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.8 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.9 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.10 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.11 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.12 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.13 | 1 | 0 un-exempted | 0 bare | 0 | 0 | C5, C10 |
| v1.14 | 0 | 0 un-exempted | 0 bare | 0 | 0 | none |
| v1.15 | 0 | 0 un-exempted | 0 bare | 0 | 0 | none |
| v1.16 | 0 | 0 un-exempted | 0 bare | 0 | 0 | none |

All 14 sidecars now carry pin counts matching v1.17's own baseline exactly: safetynet=4, supervision=26, c7_knox=10 (0 for v1.4/v1.4.1, which predate Knox content), c9=4 (0 for v1.4/v1.4.1, which predate COPE content).

## Out-of-Scope Residual (re-confirmed, not newly disposed)

Per the plan's must_haves and RESEARCH Pitfall 3, "made green" is scoped to the pin-coordinate-driven checks only. The following residual RED is pre-existing, unrelated to line-pin drift, and already covered by the `ACCEPTED-STANDALONE-CI-RED` disposition on file in `v1.17-DEFERRED-CLEANUP.md`:

- **v1.4/v1.4.1:** C4 (Android links now legitimately present in `docs/common-issues.md`, which v1.4's frozen "deferred file" list predates) and C5 (frontmatter `last_verified` staleness) — content-rule evolution, not coordinate drift.
- **v1.5-v1.13:** C5 (Android frontmatter freshness) and C10 (Linux frontmatter freshness) — same category, different platform scope.

This residual exactly matches the local harness-replay results captured in `133-RESEARCH.md` Appendix D. No docs content was edited to chase these.

## Decisions Made

**R-1 OVERRIDE (auto-fixed per deviation Rule 1 — factual bug in the recon artifact):** `133-REPIN-COORDINATES.md` Section 10 recommended leaving the v1.4/v1.4.1 "MHS cross-platform note" pin (old lines 134/172) unmoved, on the stated grounds that "the current 'Managed Home Screen' glossary section carries zero supervision-related text" and the content "no longer exists." Direct verification (harness-replay + `sed`/`grep` against the live file) showed this claim was factually incorrect: the MHS blockquote's "supervised MDM profile" text is still present, essentially unchanged, at `docs/_glossary-android.md:303` — the exact target every other sidecar (v1.14, v1.15, Group-S, v1.16) already correctly pins for the same content. Corrected to a normal identity-preserving move (`134->303` for v1.4, `172->303` for v1.4.1), reusing each pin's own original, byte-unchanged reason text. This is a genuine bug-fix in the recon's conclusion, not a new architectural decision — the pin's own semantic identity (MHS/iOS-supervised-MDM-profile cross-platform note) was never in doubt, only whether its target content still existed.

**R-2 resolved as a content-timeline-gap ADDITION:** v1.4, v1.4.1, Group-S (v1.5-v1.13), and v1.14 all predate the Phase-119 content that introduced the 7th capability-matrix supervision pin (`docs/reference/android-capability-matrix.md:129`, "Phase 119 NEW pin" per v1.17's own reason text). No old pin identity exists in these sidecars to move — the exemption never existed at freeze time. Per this plan's explicit authorization to resolve open recon residuals with "the identity-preserving option that makes the coordinate/pin checks green WITHOUT masking," a new pin was added to each of the 10 affected sidecars, reusing v1.17's exact reason text verbatim (sourced from ground truth, not invented). This is not masking: the exempted content is genuinely the same legitimate iOS-attributed disambiguation prose that v1.15/v1.16/v1.17 already exempt via an identical pin.

**R-3 and R-4 (new findings during harness-replay, not present in `133-REPIN-COORDINATES.md`):** After fixing R-1/R-2, `v1.4`/`v1.4.1` still showed 2 residual C2 failures. Investigation found two more content-timeline gaps unique to the two oldest sidecars: (R-3) `docs/_glossary-android.md:151`, the "> See also:" reciprocal-link line added by Phase 59 CLEAN-08 (postdates v1.4's Phase-43 freeze), and (R-4) `docs/_glossary-android.md:330`, the Phase-59 CLEAN-08 Version History changelog row listing "Supervision" among 11 collision-matrix terms (same reason — the row didn't exist in the live tree until after v1.4/v1.4.1 froze, and is distinct from the older "Phase 34 Foundation" changelog row those sidecars already correctly pin via `148->333`/`188->333`). Both resolved via additions, reusing v1.14's own native reason text verbatim for the same content.

**Scope discipline held throughout:** every move/fragment/addition was verified against the live tree before being applied; no `reason` string was invented from scratch (every addition reused verbatim text from an already-verified ground-truth sidecar); the commit contains only the 14 sidecar JSONs (confirmed via `git diff-tree --no-commit-id --name-only -r HEAD`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected R-1's factually-incorrect "leave unmoved" recon claim**
- **Found during:** Task 2 (harness-replay verification)
- **Issue:** `133-REPIN-COORDINATES.md` claimed the v1.4/v1.4.1 MHS-note pin's target content no longer existed; this was false, and following it would have left a real, avoidable C2 failure
- **Fix:** Moved the pin to its actual current location (glossary:303) using its own original reason text, verbatim
- **Files modified:** scripts/validation/v1.4-audit-allowlist.json, scripts/validation/v1.4.1-audit-allowlist.json
- **Verification:** `node scripts/validation/v1.4-milestone-audit.mjs --verbose` / v1.4.1 equivalent — C2 shows 0 un-exempted post-fix
- **Committed in:** aaf0d2f (atomic re-pin commit)

**2. [Rule 2 - Missing Critical] Added R-2/R-3/R-4 content-timeline-gap pins**
- **Found during:** Task 2 (harness-replay verification, iterative)
- **Issue:** Following only the recon's documented tables left C2 non-green on 10/14 sidecars (v1.4, v1.4.1, Group-S x9, v1.14) due to legitimate supervision content that post-dates each sidecar's freeze and therefore has no old pin identity to move
- **Fix:** Added new pins reusing verbatim reason text from already-verified ground-truth sidecars (v1.17 for R-2, v1.14 for R-3/R-4) — not invented text, not masking a real regression
- **Files modified:** all 10 affected sidecars
- **Verification:** All 14 harnesses now show 0 un-exempted for C2 across the board
- **Committed in:** aaf0d2f (atomic re-pin commit)

---

**Total deviations:** 2 auto-fixed (1 bug correction, 1 missing-critical addition covering 3 distinct residual gaps)
**Impact on plan:** Both were necessary to satisfy the plan's own must_have ("0 un-exempted for C2/C7/C9/safetynet on all 14 harnesses"); the recon's tables alone were insufficient. No scope creep — every reason string used was sourced from an already-verified ground-truth sidecar, never invented.

## Issues Encountered

- The full-JSON-parse-then-stringify approach initially failed to reproduce byte-identical output for the compact-style sidecars (v1.4/v1.4.1/v1.5-v1.13, which use hand-formatted single-line pin objects with CRLF line endings, vs. the expanded multi-line style used by v1.14-v1.17 with mixed CRLF/LF). Resolved by building a brace-depth text-splicing tool that never re-serializes unmodified bytes — it locates each target category array, splits it into top-level object spans via a string-aware bracket counter, and only patches the specific `"line"` values or inserts new/cloned object spans, leaving 100% of untouched content (including each file's native style and the c13_rotting_external section) byte-for-byte identical. This was verified per-file before writing (JSON validity, reason-text-preservation via multiset comparison against `git show HEAD:<path>`, and scope containment via `git diff-tree`).

## Next Phase Readiness

- TOOL-04 (Phase 133 SC#1) is satisfied: all 14 predecessor milestone-audit harnesses are green on the pin-coordinate-driven checks, landed in one atomic, attested D-00a-exception commit
- **CARVE-1 hand-off note for Phase 134:** This re-pin clears TOOL-04's coordinate checks but does **not** resolve `FROZEN-AWARE-ADOPTION-SWEEP-01`'s framing. The true root cause — CI runs frozen `v1.4-v1.16-milestone-audit.mjs` harnesses against **live HEAD** (`audit-harness-v1.N-integrity.yml`'s `harness-run` job checkout carries no `ref:`) — still exists. It holds only because no further content lands in this corpus before v1.18 closes. The durable permanent fix is `readAtClose` adoption across all 13 harnesses (infra already exists in `scripts/validation/_lib/frozen-at-close.mjs`), explicitly deferred to a **future dedicated tooling milestone**, not attempted here (D-02 rejected this approach for Phase 133). Phase 134 must NOT treat this re-pin as "sweep resolved" — it is a coordinate patch, not the architectural fix.
- Ready for Plan 133-03/133-04 (already complete per STATE.md) and Phase 134's HARN-11/12/13 closing cluster, which will re-run the full predecessor chain against these now-corrected sidecars.

---
*Phase: 133-chain-validator-tooling-debt-closure*
*Completed: 2026-07-19*
