# Phase 30: iOS L1 Triage & Runbooks - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 30-CONTEXT.md — this log preserves the alternatives considered and the adversarial-review reasoning trail.

**Date:** 2026-04-17
**Phase:** 30-ios-l1-triage-runbooks
**Areas discussed:** Triage tree root structure, Initial-triage integration, L1 scope on admin-config failures, Actor-boundary format (SC #4), Placeholder-link retrofit
**Decision method:** User-selected all 4 gray areas, then requested `/adversarial-review` on each option with reasoning. Ran single consolidated adversarial review covering 19 candidate options spanning 5 sub-decisions. Finder spawned first (367 pts surfaced), Adversary attempted 6 disproves, Referee ruled all 6 FALSE POSITIVE and picked winners.

---

## Area 1: Triage Tree Root Structure (for `docs/decision-trees/07-ios-triage.md`)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A Symptom-first root | Mirror macOS pattern: "What is the user observing?" routes to enrollment-failure / compliance / app-not-available subtrees | |
| 1B Enrollment-path-first root | "Which enrollment path?" (ADE / Device Enrollment / User Enrollment / MAM-WE) → then symptom within path | |
| 1C Intune-visibility-first root | "Is the device visible in Intune admin center?" (binary gate) → subtrees | |
| 1D Hybrid 2-axis (visibility + symptom) | Visibility gate (axis 1) + symptom fork (axis 2) — mirrors macOS MAC1→MAC2/MAC3 structure | ✓ |

**Finder flaws surfaced:**
- 1A: 1 CRITICAL (symptom overlap for 5 tenant-config causes), 2 MEDIUM (node-budget pressure, no visible iOS gate equivalent), 2 LOW
- 1B: 2 CRITICAL (L1 cannot determine path without admin access, APNs cross-path break), 2 MEDIUM, 2 LOW
- 1C: 0 CRITICAL, 3 MEDIUM, 2 LOW
- 1D: 1 CRITICAL (1D-F1: "Was this device ever enrolled?" unanswerable by L1), 2 MEDIUM, 2 LOW

**Adversary disproves:** 1D-F4 (LOW) — "conflicts with macOS single-axis precedent" → FALSE POSITIVE (macOS is actually 2-axis MAC1→MAC2/MAC3).

**Referee verdict:** 1D winner. Reasoning: With 1D-F4 disproved, 1D cleanly mirrors the macOS 2-axis structure. 1B had the most confirmed criticals (2); 1A has overlap problem; 1C is 1D minus the symptom gate (weaker). 1D-F1 CRITICAL remains but reframed — the hybrid as selected is "visibility + symptom" (matching macOS MAC1→MAC2/MAC3), not "ever enrolled? + activity?" as originally framed. The root question is visibility-in-Intune (same as macOS MAC2), not a temporal question.

**User's final choice:** 1D (accepted via "Accept all 5, write CONTEXT.md")

**Notes:** CONTEXT.md D-01 captures the decision as "visibility gate (axis 1) + symptom fork (axis 2)" which is the Referee's reframing of 1D. The originally-flagged 1D-F1 critical does not apply to the final interpretation.

---

## Area 2: Initial-Triage Integration (how `docs/decision-trees/00-initial-triage.md` routes to iOS)

| Option | Description | Selected |
|--------|-------------|----------|
| 1W Banner-only | Add iOS banner at top of file (matches existing macOS banner line 9). No Mermaid graph changes. | ✓ |
| 1X New top-level Apple-vs-Windows branch | Insert TRD0 gate before TRD1: "Is this an Apple device?" → route to platform-selector | |
| 1Y Extend TRD5 with iOS entries | Add "iOS enrollment failure" / "iOS compliance blocked" to existing main-symptom router | |

**Finder flaws surfaced:**
- 1W: 1 CRITICAL (1W-F1: "single branch" means Mermaid edge not banner), 2 MEDIUM, 1 LOW
- 1X: 1 CRITICAL (TRD ID renumbering cascade), 2 MEDIUM, 2 LOW
- 1Y: 2 CRITICAL (embeds iOS in Windows flow — literal SC #2 violation; routes iOS through Windows-specific TRD1-TRD4 gates), 1 MEDIUM, 2 LOW

**Adversary disproves:**
- 1W-F1 (CRITICAL) — FALSE POSITIVE. Macrm OS integration at 00-initial-triage.md line 9 is banner-only; Mermaid has zero macOS routing. Project already interpreted "single branch" as banner cross-reference.
- 1W-F3 (MEDIUM) — FALSE POSITIVE. Banners are at top of file (lines 8-9) before "How to Use These Trees" — immediately visible on file open.

**Referee verdict:** 1W winner. With the two banner-only objections ruled FALSE POSITIVE, 1W is the consistency choice. 1X requires TRD ID renumbering that cascades through How-to-Check and Escalation Data tables — large-scope change not owned by Phase 30. 1Y literally violates SC #2 ("does not embed iOS decision logic in the Windows triage flow").

**User's final choice:** 1W (accepted)

---

## Area 3: L1 Scope on Admin-Config Failures

| Option | Description | Selected |
|--------|-------------|----------|
| 2A Detect-and-escalate | L1 observes portal state, documents evidence, escalates. No config writes. | ✓ |
| 2B Verify-and-report | L1 performs read-only portal navigation, reports findings with screenshots, escalates | |
| 2C Toggle-safe-settings | L1 can perform pre-approved writes with approval (group-add, token resync, clear retire state) | |
| 2D Mixed per scenario | Each runbook declares its own L1 scope based on risk | |

**Finder flaws surfaced:**
- 2A: 0 CRITICAL, 2 MEDIUM, 2 LOW
- 2B: 0 CRITICAL, 2 MEDIUM, 2 LOW
- 2C: 2 CRITICAL (2C-F1: writes have RBAC/cost/change-control implications; 2C-F2: "clear retire state" can reverse intentional admin action), 2 MEDIUM, 1 LOW
- 2D: 0 CRITICAL, 3 MEDIUM, 2 LOW (2D-F2: SC #4 ambiguity re-introduced at runbook boundaries)

**Adversary disproves:** None attempted in this area — all 2A-2D flaws confirmed.

**Referee verdict:** 2A winner. 2C has 2 confirmed criticals (write actions not safe in enterprise RBAC). 2D directly fails SC #4 (no ambiguity) by design. 2B blurs the verify/toggle seam. 2A cleanly matches macOS L1 precedent (runbook 10 pattern: check → escalate, with step-10 manual-sync as narrowly-scoped exception — captured in CONTEXT.md D-08).

**User's final choice:** 2A (accepted)

**Notes:** D-08 in CONTEXT.md preserves the macOS runbook-10 step-10 manual-token-sync exception as the single documented L1 write action — scoped to re-trigger existing config, not create/modify.

---

## Area 4: Actor-Boundary Format (SC #4 literal: "no ambiguity about who does what")

| Option | Description | Selected |
|--------|-------------|----------|
| 3A Actor-split table at top | L1/Admin/User responsibilities table before Steps section | |
| 3B Inline per-step actor labels | [L1] / [Admin] / [User] prefix on every step | |
| 3C Sectioned H2 | Separate H2 sections: "L1 Triage Steps" / "Admin Action Required" / "User Action Required" / "Escalation Criteria" | ✓ |
| 3D macOS-precedent prose | "Say to the user" callouts + inline escalation cues + Escalation Criteria (current macOS pattern) | |

**Finder flaws surfaced:**
- 3A: 0 CRITICAL, 2 MEDIUM, 2 LOW
- 3B: 0 CRITICAL, 2 MEDIUM, 2 LOW
- 3C: 1 CRITICAL (3C-F1: L1 can't execute Admin Actions section — breaks scripted single-path), 2 MEDIUM, 2 LOW
- 3D: 0 CRITICAL, 3 MEDIUM (including 3D-F3: SC #4 ambiguity leaks across 3 format locations), 2 LOW

**Adversary disproves:** None attempted in this area.

**Referee verdict:** 3C winner. Reasoning: SC #4 demands the literal "no ambiguity" — H2 section headings provide the strongest visual binary. 3D (macOS prose) was shipped before SC #4 existed and doesn't enforce the boundary. 3C-F1 CRITICAL is mitigated by reframing the Admin Action Required section as the escalation packet template (L1 documents, doesn't execute) — captured in CONTEXT.md D-10 / D-12.

**User's final choice:** 3C (accepted)

**Notes:** D-10 in CONTEXT.md resolves 3C-F1 by structuring Admin Action Required as a 3-part packet (Ask the admin to / Verify / Handoff) — L1 executes documentation of the packet, not the admin actions themselves.

---

## Area 5: Placeholder-Link Retrofit (71 "iOS L1 runbooks (Phase 30)" strings)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A Resolve all 71 inline | Update all admin-setup-ios/01-09 Configuration-Caused Failures tables + prose references | ✓ |
| 4B Defer all to Phase 32 | Leave placeholders, Phase 32 NAV-02 sweep handles | |
| 4C Partial (tables only) | Resolve table placeholders, leave narrative prose untouched | |
| 4D Resolve all + PLACEHOLDER-MAP.md | 4A + maintain phase-local map of resolutions | |

**Finder flaws surfaced:**
- 4A: 0 CRITICAL, 3 MEDIUM (4A-F1: scope creep; 4A-F2: mapping ambiguity; 4A-F3: last_verified drift), 2 LOW
- 4B: 0 CRITICAL, 3 MEDIUM, 2 LOW
- 4C: 0 CRITICAL, 3 MEDIUM, 2 LOW
- 4D: 0 CRITICAL, 3 MEDIUM, 3 LOW

**Adversary disproves:**
- 4A-F1 (MEDIUM) — FALSE POSITIVE. Phase 28 D-22 literal text: "Runbook column uses 'iOS L1 runbooks (Phase 30)' placeholder text **until Phase 30 delivers actual runbook files**." Explicit cross-phase forward-contract designates Phase 30 as resolution milestone. Retrofit is scope completion, not scope creep.
- 4C-F5 (LOW) — FALSE POSITIVE. Same reasoning as 4A-F1.

**Referee verdict:** 4A winner. With the scope-creep objection disproved (D-22 is explicit), 4A is the cleanest fulfillment. 4B violates D-22 literal contract. 4C is arbitrary half-measure. 4D adds a PLACEHOLDER-MAP.md that IS genuine scope creep (not in ROADMAP Phase 30 scope, and git log + grep serve the same forensic purpose).

**User's final choice:** 4A (accepted)

**Notes:** D-16/D-17/D-18/D-19/D-20 in CONTEXT.md enumerate the retrofit scope (71 rows + 1 prose sentence + 9 last_verified bumps + 9 Version History entries + 1 atomic commit). D-17 MANDATES that the planner produce a complete per-row enumeration in PLAN.md with target-runbook + target-link; execute-phase is pure substitution from that enumeration — no guessing at execution time.

---

## Adversarial Review Summary

**Method:** 3-agent adversarial review (Finder → Adversary → Referee). All agents Opus. Sequential. User requested `/adversarial-review` on each option with reasoning.

**Scoring:**
- Finder: 367 total points (11 critical × 10 + 44 medium × 5 + 37 low × 1 = 110 + 220 + 37 = 367)
- Adversary: 6 disproves attempted (1C-F1, 1D-F4, 1W-F1, 1W-F3, 4A-F1, 4C-F5) — expected +16 points per Adversary self-assessment
- Referee: All 6 disproves ruled FALSE POSITIVE (Adversary +6 correct rulings, +16 actual earnings matching expected)

**Flaw verdict count:**
- 6 FALSE POSITIVE (Finder wrong, Adversary correct)
- 57 CONFIRMED (Finder correct — genuine flaws carried into CONTEXT.md residual-risk notes where relevant)

**All 5 recommended winners accepted by user:** 1D triage-root hybrid / 1W banner-only integration / 2A detect-and-escalate / 3C sectioned H2 / 4A resolve all inline.

---

## Claude's Discretion

Captured in CONTEXT.md `<decisions>` § "Claude's Discretion":
- Second-level branching within 07-ios-triage.md within the 5-node SC #1 cap
- Mermaid styling within the macOS-pattern constraint
- Exact L1 Triage Steps per runbook within the detect-and-escalate scope
- Per-runbook Symptom-section indicator count (1-3)
- Per-runbook file length (100-180 lines typical; runbook 21 may reach 200)
- Whether to use sub-H2 multi-cause layout in runbook 21 (compliance-blocked)
- Exact placeholder-to-runbook mappings within the D-17 per-row judgment rule
- Exact iOS banner wording in 00-initial-triage.md (D-04 gives recommended template)
- Whether to add an "iOS MAM Failures" advisory note to 00-index.md matching the existing "TPM Attestation Note" pattern

## Deferred Ideas

Captured in CONTEXT.md `<deferred>`:
- iOS MAM-specific L1 runbooks (selective wipe failures, PIN loop, app protection not applying) — ADDTS-01 future milestone
- iOS L2 investigation runbooks — Phase 31 L2TS-02 scope
- iOS log collection runbook — Phase 31 L2TS-01 scope
- macOS L1 APNs-expired runbook — deferred to v1.4 cross-platform gap closure
- iOS quick-reference card extension — Phase 32 NAV-02
- Glossary additions for iOS L1 terms — Phase 32 NAV-01
- Capability matrix iOS L1 entry — Phase 32 NAV-03
- Automated link-check CI for placeholder-free state — future milestone tooling
- Apple Configurator 2 manual enrollment L1 runbook — REQUIREMENTS out-of-scope
- Shared iPad L1 specifics — SIPAD-01 future milestone
