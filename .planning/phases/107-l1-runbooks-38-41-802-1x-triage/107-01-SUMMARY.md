---
phase: 107-l1-runbooks-38-41-802-1x-triage
plan: 01
subsystem: documentation
tags: [802.1x, l1-runbooks, triage, cross-platform, eapol, radius, certificate-failure, radius-reject]

# Dependency graph
requires:
  - phase: 106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap
    provides: journalctl -u NetworkManager verified as Linux primary L1 signal; callout vocabulary census (NOTE/WARNING/DANGER/CRITICAL)
  - phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
    provides: 02-cert-delivery-foundation.md (ordering rule, EKU, server-name validation) — link target for #38 First Checks
provides:
  - L1 runbook #38 (802.1X certificate failure): cross-platform symptom-primary triage, cert-profile status verification in Intune, deployment-ordering constraint linked, per-platform diagnostic signal table
  - L1 runbook #39 (802.1X RADIUS reject): cross-platform symptom-primary triage, four SC2 parts, per-platform diagnostic signal table, L2 #33 routing prose
affects:
  - 107-l1-runbooks-38-41-802-1x-triage plans 02-03 (sibling runbooks #40/#41 + decision tree #10 reuse identical skeleton)
  - Phase 108 (L2 runbooks #31-33 wire the live links referenced here in prose)
  - Phase 109 (navigation hubs — 00-index.md 802.1X section, capability matrix rows)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "1C runbook structure: shared Symptom + Prerequisites + First Checks (All Platforms) → per-platform diagnostic-signal table → per-platform escalation notes → Escalation Criteria (SC2:213 ordering)"
    - "Compound multi-platform frontmatter: platform windows+macos+ios+android+linux + audience L1 + applies_to both + 90-day freshness stamps"
    - "Per-platform L1 depth calibration: Windows names event-viewer channel; macOS names signal + one read-only log show command; iOS Intune-portal only; Android names adb logcat as escalation-collected (not L1); Linux journalctl command"
    - "Prose-only L2 forward-references: no live links to ../l2-runbooks/ (Phase 108); D-07 routing map baked into escalation prose"

key-files:
  created:
    - docs/l1-runbooks/38-8021x-certificate-failure.md
    - docs/l1-runbooks/39-8021x-radius-reject.md
  modified: []

key-decisions:
  - "D-01 (locked): 1C structure — shared Symptom/First Checks prose then per-platform diagnostic table then per-platform escalation notes; SC2:213 four-part ordering is the spec"
  - "D-02 (locked): compound frontmatter token platform: windows+macos+ios+android+linux; audience: L1; applies_to: both; 90-day freshness pair"
  - "D-05 (locked): per-platform-calibrated depth — Windows/macOS/Linux get named signal + one read-only command; iOS = portal inspection only; Android = adb logcat named as escalation-collected, never an L1 action"
  - "D-06/D-07 (locked): L2 #31/#32/#33 references are prose-only; #38 routes to #31→#32; #39 routes to #31→#33; no live markdown links to ../l2-runbooks/ (Phase 108 wires them)"
  - "D-08 (locked): docs/l1-runbooks/00-index.md NOT edited — conscious defer to Phase 109 (navigation-last per ROADMAP.md:241,243)"
  - "Windows wired event channel is Microsoft-Windows-Wired-AutoConfig/Operational — NOT Dot3Svc/Operational (RESEARCH correction applied)"

patterns-established:
  - "Pattern: footer link [Back to 802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) above Version History — reusable for #40/#41"
  - "Pattern: Android cell in per-platform table always names adb logcat signal then immediately qualifies it as escalation-collected with explicit do-NOT-run-at-L1 qualifier"
  - "Pattern: iOS cell always states Intune-portal inspection only with no device command — not just implied but explicit"
  - "Pattern: First Checks (All Platforms) section links to 02-cert-delivery-foundation.md for ordering rule rather than restating it (link-not-copy enforced)"

requirements-completed: [DOT1X-09]

# Metrics
duration: 8min
completed: 2026-06-30
---

# Phase 107 Plan 01: L1 Runbooks #38 and #39 Summary

**Two cross-platform 802.1X L1 triage runbooks (certificate failure #38 and RADIUS reject #39) with five-platform diagnostic-signal tables, prose-only L2 routing, and calibrated per-platform depth across Windows/macOS/iOS/Android/Linux.**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-07-01T03:20:00Z
- **Completed:** 2026-07-01T03:28:17Z
- **Tasks:** 2 of 2
- **Files modified:** 2

## Accomplishments

- Authored L1 runbook #38 (802.1X Certificate Failure): cross-platform symptom-primary runbook with deployment-ordering constraint linked (SC1), per-platform diagnostic-signal table using exact RESEARCH-verified strings, and prose-only L2 routing to #31→#32
- Authored L1 runbook #39 (802.1X RADIUS Reject): all four SC2 parts (symptom, first-checks, per-platform diagnostic commands, escalation trigger), with First Checks explicitly ruling out #38 and #40, Windows 8003-without-cert-error discriminator noted, and prose-only L2 routing to #31→#33
- Applied exact Windows channel corrections from RESEARCH (Wired-AutoConfig/Operational, never Dot3Svc/Operational) in both files
- Enforced per-platform calibrated depth (D-05): iOS portal-only, Android adb as escalation-collected with explicit do-NOT-run-at-L1 qualifier, macOS `log show` with `--last 2h` fallback

## Task Commits

Each task was committed atomically:

1. **Task 1: Author L1 runbook #38 — 802.1X Certificate Failure** - `ef13d71` (docs)
2. **Task 2: Author L1 runbook #39 — 802.1X RADIUS Reject** - `b00885a` (docs)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `docs/l1-runbooks/38-8021x-certificate-failure.md` — L1 #38: 802.1X cert-failure triage; 116 lines; SC1 (cert-profile status + ordering constraint link + per-platform signal)
- `docs/l1-runbooks/39-8021x-radius-reject.md` — L1 #39: 802.1X RADIUS-reject triage; 129 lines; SC2 four-part structure (symptom + first-checks + per-platform commands + escalation trigger)

## Decisions Made

All decisions locked at CONTEXT.md phase-planning time (D-01 through D-08); no plan-time decisions were deferred to execution. Execution followed locked decisions exactly:

- D-05 per-platform calibration applied as specified; macOS `--last 2h` fallback note included per RESEARCH recommendation
- D-07 routing baked in as prose: #38 → L2 #31 → L2 #32; #39 → L2 #31 → L2 #33
- RESEARCH correction applied: Wired-AutoConfig/Operational used everywhere (Dot3Svc/Operational never appears)

## Deviations from Plan

None — plan executed exactly as written. Both files satisfy all acceptance criteria and pass all automated verify checks.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required. Pure documentation phase.

## Known Stubs

None. Both runbooks deliver complete L1 triage content. L2 links are intentionally prose-only (not stubs) — live links are Phase 108's deliverable per D-06/D-07.

## Threat Flags

None. Both files contain placeholder identifiers only (no real credentials, keys, device serials, or UPNs). T-107-01 mitigated as planned.

## Next Phase Readiness

- Plan 01 complete; sibling runbooks #40/#41 (plans 02-03) can reuse the identical 1C skeleton, compound frontmatter, per-platform table shape, and footer established here
- Decision tree #10 (plan 03 or later) can use the `click` targets pointing to #38 and #39 now that those files exist
- Phase 108 (L2 runbooks) can wire the live links to `../l2-runbooks/31-`, `32-`, `33-` when those files are committed

## Self-Check

- [x] `docs/l1-runbooks/38-8021x-certificate-failure.md` exists — FOUND
- [x] `docs/l1-runbooks/39-8021x-radius-reject.md` exists — FOUND
- [x] Commit `ef13d71` exists — FOUND
- [x] Commit `b00885a` exists — FOUND

## Self-Check: PASSED

---
*Phase: 107-l1-runbooks-38-41-802-1x-triage*
*Completed: 2026-06-30*
