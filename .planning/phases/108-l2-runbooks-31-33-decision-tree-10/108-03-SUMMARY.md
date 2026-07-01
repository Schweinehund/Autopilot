---
phase: 108-l2-runbooks-31-33-decision-tree-10
plan: "03"
subsystem: documentation
tags: [802.1x, l2-runbook, radius, eap, radius-team-checklist, eap-mismatch, server-name-validation, cross-platform]

requires:
  - phase: 108-l2-runbooks-31-33-decision-tree-10
    provides: "#31 log collection runbook (prerequisite for #33); #32 cert investigation sibling"
  - phase: 107-l1-runbooks-38-41-802-1x-triage
    provides: "L1 runbooks #38-41 that escalate to #33; D-04 RADIUS framing decision"
  - phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
    provides: "01-eap-method-overview.md (co-equal EAP link target); 02-cert-delivery-foundation.md (server-name-validation link target)"

provides:
  - "docs/l2-runbooks/33-8021x-radius-eap-investigation.md — cross-platform L2 RADIUS/EAP investigation runbook (SC3, DOT1X-10)"
  - "RADIUS Team Request Checklist (ask-side only: NPS event IDs 6272/6273, EAP type codes 13/25/21, server cert, account state)"
  - "Five per-platform EAP-method-mismatch diagnosis subsections (Windows/macOS/iOS/Android/Linux)"
  - "Five per-platform server-name-validation failure diagnosis subsections"

affects: [108-04-link-wiring, 109-802-1x-integration-nav-hubs]

tech-stack:
  added: []
  patterns:
    - "D-04 hybrid: RADIUS-team request checklist (ask-side only) + per-platform EAP-mismatch subsections + per-platform server-name-validation subsections"
    - "Colon-separated H3 platform headings (e.g., '### Windows: EAP-Method Mismatch') to avoid em-dash double-hyphen slug trap"
    - "Link-not-copy for foundation theory: 01-eap-method-overview.md (co-equal EAP) + 02-cert-delivery-foundation.md#radius-server-name-validation"
    - "macOS MEDIUM confidence NOTE callout pattern (matching L1 runbooks #38-#41)"
    - "Android adb WARNING callout with three USB prerequisites"

key-files:
  created:
    - docs/l2-runbooks/33-8021x-radius-eap-investigation.md
  modified: []

key-decisions:
  - "D-04 executed: #33 framing = C (hybrid) — RADIUS-team request checklist (clause 1) + per-platform EAP-method-mismatch diagnosis (clause 2) + per-platform server-name-validation diagnosis (clause 3); maps 1:1 to SC3 three-clause enumeration"
  - "RADIUS Team Request Checklist is strictly ask-side: every item phrased as 'request/confirm from the RADIUS team' with zero NPS-config imperative verbs"
  - "Co-equal EAP preserved throughout: diagnosis matches client profile to RADIUS policy, never ranks methods; EAP type codes 13/25/21 documented without preference"
  - "Colon separators in per-platform H3 headings to avoid em-dash → double-hyphen slug trap"
  - "macOS server-name-validation section carries MEDIUM confidence NOTE matching the established corpus callout pattern from L1 runbooks"

patterns-established:
  - "Three-block SC3 structure: (1) RADIUS ask-checklist, (2) per-platform EAP-mismatch, (3) per-platform server-name-validation — reusable for future multi-failure-class L2 investigation runbooks"
  - "Ask-side-only checklist pattern: NOTE callout citing REQUIREMENTS.md Out-of-Scope; all items phrased as 'request from the RADIUS/NPS team'"

requirements-completed: [DOT1X-10]

duration: 8m
completed: 2026-07-01
---

# Phase 108 Plan 03: 802.1X RADIUS/EAP Investigation Runbook (#33) Summary

**Cross-platform L2 RADIUS/EAP investigation runbook with ask-side-only RADIUS team request checklist (NPS event IDs 6272/6273, EAP codes 13/25/21), five per-platform EAP-method-mismatch subsections, and five per-platform server-name-validation failure subsections**

## Performance

- **Duration:** 8 min
- **Started:** 2026-07-01T00:00:00Z
- **Completed:** 2026-07-01T00:08:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Authored `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` — the cross-platform L2 RADIUS/EAP investigation runbook satisfying SC3 and the D-04 hybrid framing decision
- RADIUS Team Request Checklist (seven items, all ask-side only): NPS event IDs 6272 (Access-Accept) and 6273 (Access-Reject with Reason Code + Authentication-Type), EAP type codes 13/25/21, inner auth method, RADIUS server cert details, account state, policy-change history, and KB5014754 strong mapping check for EAP-TLS
- Five per-platform EAP-method-mismatch diagnosis subsections: Windows (WLAN-AutoConfig/Wired-AutoConfig event EAP type numbers), macOS (eapolclient EAP-NAK with MEDIUM confidence NOTE), iOS/iPadOS (symptom-pattern — PEAP requires MS-CHAPv2, PAP causes immediate EAP-NAK), Android (adb logcat wpa_supplicant with USB-debugging WARNING), Linux (CTRL-EVENT-EAP-PROPOSED-METHOD in journalctl + nmcli 802-1x.eap comparison)
- Five per-platform server-name-validation failure diagnosis subsections: Windows (event 8001/CAPI2 chain text + Certificate server names field), macOS (silent failure + TLS handshake failure in eapolclient), iOS/iPadOS (silent portal + Certificate server names field), Android (SSL certificate verification in wpa_supplicant + Certificate server names), Linux (802-1x.domain-suffix-match + 802-1x.ca-cert via nmcli)
- Link-not-copy preserved: EAP theory linked to 01-eap-method-overview.md; server-name-validation theory linked to 02-cert-delivery-foundation.md#radius-server-name-validation; not restated

## Task Commits

1. **Task 1: Author #33 cross-platform 802.1X L2 RADIUS/EAP investigation runbook** — `b869260` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified

- `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` — cross-platform L2 RADIUS/EAP investigation runbook (#33): RADIUS team request checklist + EAP-method-mismatch diagnosis (5 platforms) + server-name-validation failure diagnosis (5 platforms)

## Decisions Made

- D-04 executed as planned: three-block SC3 structure maps 1:1 to the three-clause ROADMAP enumeration
- RADIUS request checklist NOTE callout cites REQUIREMENTS.md Out-of-Scope explicitly to anchor the ask-side boundary
- Colon separators chosen for all per-platform H3 headings (e.g., `### Windows: EAP-Method Mismatch`) — avoids the em-dash double-hyphen GitHub slug trap documented in PATTERNS.md
- macOS server-name-validation diagnosis subsection also carries the MEDIUM confidence NOTE (not just EAP-mismatch) because eapolclient log references appear in both diagnosis blocks

## Deviations from Plan

None — plan executed exactly as written. All acceptance criteria satisfied by the automated verification gate.

## Issues Encountered

None.

## Known Stubs

None — all content is based on verified signals from RESEARCH.md and the plan's read_first sources. No hardcoded empty values, placeholder text, or unwired data sources.

## Threat Flags

None — documentation-only file; no new network endpoints, auth paths, file access patterns, or schema changes introduced. Threat model disposition `accept` confirmed (T-108-03).

## Next Phase Readiness

- `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` committed and verified — satisfies the navigation-last prerequisite for Phase 108 plan 04 link-wiring
- Plan 04 (link-wiring wave) can now wire live L2 links into `docs/decision-trees/10-8021x-triage.md` and L1 runbooks #38-#41, completing D-03 within this phase

## Self-Check: PASSED

- `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` — FOUND
- Commit `b869260` — FOUND (confirmed via git log)

---
*Phase: 108-l2-runbooks-31-33-decision-tree-10*
*Completed: 2026-07-01*
