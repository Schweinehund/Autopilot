# Phase 77: Auth Methods Deep-Dive - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-21
**Phase:** 77-auth-methods-deep-dive
**Areas discussed:** Document structure, FileVault treatment, Misconception warnings, Comparison table

**Resolution method:** All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per the user's standing preference ("For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning"). Finder objections: 140 pts across 12 options. Adversary disproved 15 objections (+44, zero wrong-disproves). Referee confirmed 3 CRITICALs (A1, C2, B3-verbatim), ruled 5 false positives, downgraded the A2 hub-orphan CRITICAL→MEDIUM. User accepted all four picks ("Lock all & chain to plan").

---

## Document structure (Decision A)

| Option | Description | Selected |
|--------|-------------|----------|
| A1 — Reuse guide 07's flat corpus skeleton | Prerequisites / Steps / Verification / Config-Caused-Failures / See Also | |
| A2 — Method-per-section + table-up-top | Comparison table → ## Secure Enclave → ## Password Sync → ## Smart Card → advanced; no skeleton tail | |
| A3 — Hybrid | Method-per-section body PLUS corpus-compatible ## Configuration-Caused Failures + ## See Also tail | ✓ |

**User's choice:** A3 (hybrid).
**Notes:** A1 ruled CRITICAL — flat `## Steps` skeleton cannot host the SC1 4-dimension selection table or three co-equal method deep-dives (SC1/SC2 unbuildable). A2 ruled MEDIUM — drops the skeleton the `06-config-failures` reverse-lookup hub relies on (orphaning latent, not active). A3 carries zero real objections; direct analog of Phase-76's blessed D-01 hybrid.

---

## FileVault treatment (Decision C)

| Option | Description | Selected |
|--------|-------------|----------|
| C1 — Dedicated section only | One ## FileVault + Platform SSO Interaction section | |
| C2 — Per-method callouts only | FileVault facts distributed into each method, no dedicated section | |
| C3 — Both | Dedicated sub-section AND per-method cross-referenced callouts | ✓ |

**User's choice:** C3 (both).
**Notes:** C2 ruled CRITICAL — omits the dedicated FileVault/SE sub-section that research mandates in three places (DF-6:170, CD-2:485, Phase-Warnings table:729) and weakens SC2/PSSO-06. C1 loses per-method nuance (Password-sync one-password vs SE separate-concerns, CD-3). C3's anchor/duplication objection ruled FALSE POSITIVE (new file + cross-ref is the blessed pattern). Mechanism: state each fact once canonically, cross-reference from point-of-use.

---

## Misconception warnings (Decision D)

| Option | Description | Selected |
|--------|-------------|----------|
| D1 — Consolidated box only | Upfront "Common Misconceptions" myth-vs-fact box | |
| D2 — Inline callouts only | Hard-bordered callouts at point-of-use only | |
| D3 — Both | Consolidated box + point-of-use cross-referenced callouts (Phase-76 D-03 pattern) | ✓ |

**User's choice:** D3 (both).
**Notes:** The three named dangers (FileVault≠SE key; password-reset destroys SE key; Touch-ID no-fallback lockout) are silent-failure class → need both consolidated visibility and point-of-use reinforcement. D1 loses point-of-use (Phase-76 #20 ruling); D2 loses the consolidated CD-3 myth/fact artifact and risks under-surfacing a danger. D3 = direct analog of the referee-blessed Phase-76 D-03/C4 blockers pattern.

---

## Comparison table (Decision B)

| Option | Description | Selected |
|--------|-------------|----------|
| B1 — Decision-first (top) | Selection table at top before the method deep-dives | ✓ (placement) |
| B2 — Detail-first (end) | Deep-dives first, comparison table near the end | |
| B3 — Lift research draft verbatim vs restructure | Use SUMMARY L60-74 draft as-is, or rebuild | ✓ (restructure arm) |

**User's choice:** B1 placement + restructure (NOT verbatim).
**Notes:** B1's three objections all ruled FALSE POSITIVE — decision-first IS SC1's requirement ("use the table to select"; mark SE recommended). B2 inverts the selection-first contract. B3-verbatim ruled CRITICAL — the SUMMARY draft has ~10 rows but SC1 locks exactly 4 dimensions (passwordless / phishing-resistant / hardware / macOS-version). Resolution: B1 placement, table restructured to the four dimensions; the draft's extra rows move into the per-method bodies.

---

## Claude's Discretion

- Exact prose wording of the guide, method deep-dives, table cells, callouts, and misconception box.
- Internal heading names/anchors for guide 08 (new file → no anchor-stability constraint).
- Per-line `last_verified`/`review_by` annotations per the 90-day PSSO cadence where the researcher flags rapidly-changing facts.

## Deferred Ideas

- `NewUserAuthorizationMode` exact key omitted (PSSO-11/PSSO-FUT-01) → tracked in `v1.9-DEFERRED-CLEANUP.md` pending verification.
- Guide 09 / migration (Phase 78); capability matrix (Phase 79); L1/L2 runbooks (Phase 80); nav-hub integration (Phase 81); v1.9 harness bump (Phase 82).
- Old-numbering research trap flagged: PITFALLS/SUMMARY label guide 08 as "Phase 76".
