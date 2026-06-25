# Phase 92: Navigation Hub Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-25
**Phase:** 92-navigation-hub-integration
**Areas discussed:** index.md placement, common-issues entries, quick-ref-l2 commands, decision-tree leaf, nav-last + commit shape

**Method:** User selected all four nav-hub areas, then instructed: "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning." All five gray areas (the four hub areas + the cross-cutting nav-last/commit-shape decision) were resolved via the `/adversarial-review` skill (Finder/Adversary/Referee, three Opus agents). Finder raised 41 flaws (score 168); Adversary disproved 3 (1.1, 3.1, 4.6); Referee confirmed the remainder, downgraded over-severe CRITICALs, confirmed the sleeper flaw 4.2, and declared the winners. User then locked all five winners.

---

## Area 1 — index.md placement

| Option | Description | Selected |
|--------|-------------|----------|
| 1A — Duplicate rows across role tables | Add 01/02 to both L1 and L2 tables; #30 to L2 only. Matches the 00-ade-lifecycle triple-table precedent. | ✓ (modified) |
| 1B — New role-neutral "Scenario Walkthroughs" sub-section | List 00/01/02 once above the role tables. | |
| 1C — L1-table-only for 01/02 | Walkthroughs as L1-first; #30 in L2 table. | |

**User's choice:** 1A (modified) — per adversarial-review winner.
**Notes:** Adversary overturned Finder's "1A mis-signals audience" CRITICAL — 01/02 are role-neutral lifecycle walkthroughs like 00, which is already triple-listed. 1B rejected for sibling asymmetry (no other platform block has a pre-table neutral listing); 1C rejected for under-satisfying SC1 "both roles" and splitting 02 from its #30 runbook. Execution: add only 01/02 (not re-adding 00); #30 to L2 table only; labels surface both Kandji+Iru.

---

## Area 2 — common-issues.md entries

| Option | Description | Selected |
|--------|-------------|----------|
| 2A — Two new `###` symptom subsections | "MDM Migration Failure" → #30; "Platform SSO Re-Registration Failure (Post-Migration)" → #27+#30. Mirrors one-symptom-per-### anatomy. | ✓ |
| 2B — One combined "MDM Migration Failures" subsection | Two bullet groups under one heading. | |
| 2C — Fold into existing "Platform SSO Sign-In Failure" | Add migration bullets to the existing PSSO entry. | |

**User's choice:** 2A — per adversarial-review winner.
**Notes:** 2C was the CRITICAL (2.7) — a deadline-lockout reader would never look under "Platform SSO Sign-In Failure". 2B breaks the file's one-symptom-per-### index anatomy and collapses SC2's two required entries. 2A's migration entry symptom-line must name the non-dismissible full-screen lockout; L1 = escalate-to-L2 (verbatim Kerberos pattern).

---

## Area 3 — quick-ref-l2.md commands

| Option | Description | Selected |
|--------|-------------|----------|
| 3A — Hybrid link-not-copy | Cross-ref the already-present app-sso/profiles commands by anchor; add only net-new commands (ls /Library/Kandji/, sw_vers); add #30 bullet. | ✓ |
| 3B — Self-contained block restating commands inline | Re-state app-sso platform -s + profiles status alongside new commands. | |
| 3C — Runbook-bullet only | Just add the L2 #30 bullet; no diagnostics subsection. | |

**User's choice:** 3A — per adversarial-review winner.
**Notes:** 3B was CRITICAL (3.4) — restating commands already at lines 150/185 violates link-not-copy + drift. 3C under-satisfies SC3 (net-new commands never surface). Adversary overturned Finder's "new subsection" objection — file already uses per-topic #### diagnostic blocks (Platform SSO Attestation, Kerberos). Execution: match #### nesting; skip `profiles list` (file has `profiles show`).

---

## Area 4 — decision-tree leaf

| Option | Description | Selected |
|--------|-------------|----------|
| 4A — Single escalate leaf off MAC3 | New MAC3 branch → MACE3 (red) → click to L2 #30. Mirrors Kerberos MACE2 pattern. | ✓ (modified + mandatory MAC1 fix) |
| 4B — MACSSO-style sub-decision | New MACMIG sub-decision splitting into #30's 3 tracks. | |
| 4C — Off-MAC1 gate / off-"Other/unclear" | Attach higher (root) or bury under generic escalation. | |

**User's choice:** 4A (modified) — per adversarial-review winner.
**Notes:** 4C was CRITICAL (4.7 root break / 4.8 fails SC4). 4B's sub-decision is degenerate (all 3 tracks land on #30, unlike MACSSO's true 3-way fan-out) and zero edge-margin. **Sleeper flaw 4.2 (CONFIRMED REAL):** a deadline-lockout device is on a full-screen non-dismissible prompt, NOT at the Finder desktop — MAC1 "Did Setup Assistant complete?" is ambiguous. The brief's "it's at the desktop → Yes" was factually wrong. Mandatory fix: label the branch for the migration-prompt presentation + add a MAC1 "How to Check" note routing a full-screen Kandji/Iru→Intune prompt as MAC1=Yes → migration leaf; add MACE3 to escalateL2 classDef + Routing Verification + Version History rows.

---

## Area 5 — navigation-last enforcement + commit shape

| Option | Description | Selected |
|--------|-------------|----------|
| 5A — Single atomic commit + explicit pre-commit verification | One commit over all 4 hubs; verify content exists + anchors resolve first. | ✓ (modified: add anchor verification) |
| 5B — Per-hub commits | 4 commits, each with content check. | |
| 5C — Single atomic commit, no verification step | Rely on 89/90 having committed content. | |

**User's choice:** 5A (modified) — per adversarial-review winner.
**Notes:** 5B leaves cross-hub-incoherent intermediate HEADs (antithetical to a nav-integration phase). 5C defeats the phase's defining invariant + ships unverified anchors (Phase 91 anchor-slug fragility precedent). 5A modified to verify BOTH content existence at HEAD AND anchor/path resolution. No V-63 pin to regenerate (those pin Phase-91 matrix files, not these hubs). Run sequentially on main tree per use_worktrees:false.

## Claude's Discretion

- Exact "When to Use" cell wording, symptom-line phrasing, Version History footer text (within both-names + lockout-presentation rules).
- Exact `####` migration-diagnostics heading text and net-new command order.
- Exact MAC3 branch label wording + mermaid node id (MACE3 suggested).

## Deferred Ideas

- L1 quick-ref parity (`quick-ref-l1.md` migration entry) — out of scope (SC3 names only quick-ref-l2.md; migration diagnostics are L2-grade). Note for a future phase only if L1 demand surfaces.
- Per-phase validator `check-phase-92.mjs` + any nav-hub pinning — belongs to Phase 93 (harness lineage bump), not here.
