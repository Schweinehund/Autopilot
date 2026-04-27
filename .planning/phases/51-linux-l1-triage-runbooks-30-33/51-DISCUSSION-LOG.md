# Phase 51: Linux L1 Triage + Runbooks 30–33 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 51-CONTEXT.md — this log preserves the alternatives considered and the adversarial-review evidence chain that locked each winner.

**Date:** 2026-04-27
**Phase:** 51-linux-l1-triage-runbooks-30-33
**Areas discussed:** Triage tree shape (GA-1) / Multi-cause runbook structure (GA-2) / L1 actor boundary on Linux (GA-3) / Validator depth + commit atomicity (GA-4)
**Methodology:** Adversarial review — single Finder, single Adversary, single Referee (Opus tier; deliverable/architecture review type per skill).

---

## Discussion Format

User selected ALL 4 gray areas via `AskUserQuestion` and instructed Claude to apply `/adversarial-review` for each option in each area. Skill invocation produced a 3-agent pipeline:

1. **Finder** scored every defect of every candidate option (366 raw points across 85 defects).
2. **Adversary** attempted to disprove Finder's defects (6 attempted, 0 CRIT / 5 MED / 1 LOW).
3. **Referee** adopted/rejected each disprove, locked per-area winners, generated cross-decision integration callouts (CDIs) and downstream-phase obligations (DPOs).

---

## Gray Area 1 — Triage tree shape

### Candidate Options Presented

| Option | Description | Finder Score |
|--------|-------------|---------------|
| 1A | Flat symptom-only root → 4 symptom branches → 4 runbooks. Single decision step. | 17 (5 defects: 2 LOW + 3 MED) |
| 1B | Pre-gate ("Is the device enrolled?") → No → Runbook 30; Yes → 3-symptom selector. | 22 (5 defects: 1 CRIT + 2 MED + 2 LOW) |
| 1C | Flat symptom-only + Don't-Know escalation node. | 8 (4 defects: 3 LOW + 1 MED) |
| 1D | Symptom-first → cause-within-symptom subtree (deeper tree). | 36 (6 defects: 2 CRIT + 3 MED + 1 LOW) |

### Adversary Disproves Attempted

- **1A-3 [MED, +5/-10]:** "Single-mode reassurance framing" loss is fabricated; Linux has no enrollment-mode axis (PITFALL-3 deb-only); PITFALL-1 prohibits forcing multi-axis framing on Linux's narrow surface.
- **1A-4 [MED, +5/-10]:** SC#1 "in 2 decision steps" is a CEILING, not a mandate; PITFALL-2 lives at runbook level not tree level.
- **1A-5 [MED, +5/-10]:** TRD3 + AND1 pre-gates exist BECAUSE of platform-specific mode divergence (Phase 40 D-01 explicit on Android); Linux structurally lacks this axis; symmetry-for-symmetry violates PITFALL-1.
- **1C-3 [MED, +5/-10]:** Same as 1A-4 — PITFALL-2 routing discipline lives at runbook level only.

### Referee Verdicts

- **1A-3 ADOPTED.** Linux has no enrollment modes (deb single path per PITFALL-3); Phase 40 D-01 mode-divergence is platform-specific to Android; PITFALL-1 explicitly forbids forcing capability/structure framings that don't apply. "Single-mode reassurance framing" is fabricated.
- **1A-4 ADOPTED.** SC#1 verbatim "reaches the correct runbook in 2 decision steps for each of the 4 failure branches" — "in 2 decision steps" is ceiling/budget assertion (≤2), not mandate. Verified against Android tree's Routing Verification preamble at line 79: "All terminal nodes are within 2 decision steps of the root node (AND1), well under the SC #1 5-node budget."
- **1A-5 ADOPTED.** TRD3 (Initial-Triage line 51) and AND1 (Android tree line 31) pre-gates exist BECAUSE both platforms have structurally divergent failure-by-mode surfaces. Linux structurally lacks this axis. Importing TRD3/AND1 shape onto Linux violates PITFALL-1 whitelist-first discipline.
- **1C-3 REJECTED.** ROADMAP line 211 SC#3 verbatim wording: "L1 runbook 32 (CA blocking web-app access) routes to web-app CA workflow only — not to device compliance CA path (**PITFALL-2 routing discipline enforced in L1 triage**)." In this codebase's taxonomy, "L1 triage" denotes the **decision-tree layer** (`docs/decision-trees/*-triage.md` filenames are the canonical L1 triage trees). SC#3 therefore mandates routing discipline AT THE TREE LEVEL — not exclusively at the runbook level. Adversary's claim that PITFALL-2 lives only at runbook level contradicts SC#3 verbatim wording. Defect 1C-3 RETAINED as REAL ISSUE.

### Post-Ruling Scores

| Option | Original | Adopted Disproves | Final | Rank |
|--------|----------|-------------------|-------|------|
| 1A | 17 | -15 (1A-3 + 1A-4 + 1A-5) | **2** | **1st (BEST)** |
| 1B | 22 | 0 | 22 | 3rd |
| 1C | 8 | 0 (1C-3 REJECTED) | 8 | 2nd |
| 1D | 36 | 0 | 36 | 4th |

### Winner

**Option 1A** — Flat symptom-only tree, no enrollment-mode pre-gate (whitelist-first).

**Synthesized shape (from 1A + retained 1C-1/1C-2/1C-4 confirmed defects + REJECTED 1C-3):**

- 1A's flat-symptom shape (no mode pre-gate) — primary structural choice
- + Don't-Know escalation node (per 1A-2 confirmed defect — every L1 tree has one)
- + Tree-level CA disambiguation node with explicit "PITFALL-2: web-app CA only — see Runbook 32" callout (per REJECTED 1C-3 — SC#3 mandates tree-level enforcement)

### Notes

User's profile: max-effort preference. Adversary deliberately preserved score by confirming all 13 CRITs (CRIT-vs-LOW asymmetry of -20 penalty vs +10 gain made speculative CRIT disproves unprofitable). All 3 adopted disproves were against MED-severity defects of 1A; the Referee's adoption flipped 1A from middle-ranked (17pts) to BEST (2pts).

---

## Gray Area 2 — Multi-cause runbook structure

### Candidate Options Presented

| Option | Description | Finder Score |
|--------|-------------|---------------|
| 2A | Anchor-indexed H2-per-cause (Runbook 25 precedent). | 8 (4 defects: 3 LOW + 1 MED) |
| 2B | Numbered cause-sequenced L1 Triage Steps (Runbook 22/26 precedent). | 17 (5 defects: 3 MED + 2 LOW) |
| 2C | Hybrid — Runbooks 30+31 = 2A; Runbook 32 = 2B. | 12 (4 defects: 2 MED + 2 LOW) |
| 2D | Sub-runbook split (30a/30b separate files). | 51 (8 defects: 3 CRIT + 4 MED + 1 LOW) |

### Adversary Disproves Attempted

- **2A-3 [MED, +5/-10]:** LIN-10's 3 causes (device not enrolled / device not compliant / Edge not signed in) are observably independent in the Intune portal (distinct portal observables per cause), not sequential. Runbook 25 Cause C "CA Timing Gap" precedent (line 137-181) confirms anchor-indexed handles logical-precedence causes fine.

### Referee Verdicts

- **2A-3 ADOPTED.** Runbook 25 Cause C entry condition (line 137-181) is observable ("P-09 shows compliance state 'Not evaluated' or 'In grace period'; OR 'Not compliant' with empty failing-settings list"), not a logical-precedence gate. Runbook 25 line 35 verbatim: "Causes are independently diagnosable — you do not need to rule out prior causes." LIN-10's 3 causes are likewise distinct portal observables. The Finder's "SEQUENTIAL" claim was a FALSE POSITIVE.

### Post-Ruling Scores

| Option | Original | Adopted Disproves | Final | Rank |
|--------|----------|-------------------|-------|------|
| 2A | 8 | -5 (2A-3) | **3** | **1st (BEST)** |
| 2B | 17 | 0 | 17 | 3rd |
| 2C | 12 | 0 | 12 | 2nd |
| 2D | 51 | 0 | 51 | 4th |

### Winner

**Option 2A** — Anchor-indexed H2-per-cause for multi-cause runbooks 30/31/32.

**Refinement:** Runbook 33 (LIN-11 single-cause) uses Runbook 22-style single-cause structure (NOT anchor-indexed; defect 2A-1 confirmed: applying multi-cause shape to single-cause runbook is over-engineering). This produces a uniform-structure outcome: 3 multi-cause runbooks with anchor-indexed pattern + 1 single-cause runbook with simpler pattern.

### Notes

LIN-10's "device not enrolled" cause superficially looks sequential (you can't be compliant without enrolling) but Runbook 25 Cause C is the load-bearing precedent that proves anchor-indexed shape handles logical-precedence causes. Each LIN-10 cause has a distinct portal observable: device-absent-from-inventory vs visible-but-non-compliant vs visible-compliant-but-Edge-unauthenticated.

---

## Gray Area 3 — L1 actor boundary on Linux

### Candidate Options Presented

| Option | Description | Finder Score |
|--------|-------------|---------------|
| 3A | Strict portal-only L1 + escalate-to-L2 if no terminal access. | 35 (5 defects: 2 CRIT + 3 MED) |
| 3B | Allow L1-guided read-only terminal walkthrough across all 4 runbooks. | 22 (6 defects: 4 MED + 2 LOW) |
| 3C | Hybrid — portal-only for 30/31/32; terminal for Runbook 33 only. | 22 (5 defects: 1 CRIT + 2 MED + 2 LOW) |
| 3D | Hybrid+ — Option 3C + Runbook 30 package-install cause gets terminal walkthrough. | 17 (5 defects: 3 MED + 2 LOW) |

### Adversary Disproves Attempted

- **3B-5 [LOW, +1/-2]:** `apt list` is user-runnable on Ubuntu/Debian; sudo is not required for read-only query operations. Finder over-generalized from state-changing to read-only apt operations.

### Referee Verdicts

- **3B-5 ADOPTED.** Standard Ubuntu/Debian apt(8) behavior: `apt list`, `apt list --installed`, `dpkg -l`, `apt-cache policy` are user-runnable read-only commands; sudo is not required for query operations. Only state-changing operations (`apt install`, `apt update`, `apt upgrade`, `apt remove`, `dpkg -i`) require root. Finder over-generalized.

### Post-Ruling Scores

| Option | Original | Adopted Disproves | Final | Rank |
|--------|----------|-------------------|-------|------|
| 3A | 35 | 0 | 35 | 4th |
| 3B | 22 | -1 (3B-5) | 21 | 3rd |
| 3C | 22 | 0 | 22 | 2nd (tied) |
| 3D | 17 | 0 | **17** | **1st (BEST)** |

### Winner

**Synthesized per-runbook-per-cause hybrid actor-boundary** built on Option 3D as the structural baseline + GA-3B sub-rule (read-vs-write apt distinction):

- **Runbook 30 (LIN-08):** Terminal walkthrough across ALL 3 causes (defect 3D-2 MED confirmed: sign-in cause needs `journalctl -u microsoft-identity-broker`; timeout cause needs `journalctl -u intune-agent.timer`; package-install cause needs `apt list --installed` + `dpkg -l`)
- **Runbook 31 (LIN-09):** Portal-first for distro-version + encryption + password causes; terminal walkthrough for custom-compliance Bash cause only (defect 3C-2 MED confirmed: portal cannot see Bash exit codes)
- **Runbook 32 (LIN-10):** Portal-only across all 3 causes (Edge access blocked = compliance redirect mid-workflow per defect 3B-2; portal-side investigation suffices for all 3 LIN-10 causes)
- **Runbook 33 (LIN-11):** Terminal walkthrough single cause (no portal alternative for `systemctl --user status intune-agent.timer`)

Cross-cutting **read-vs-write apt distinction** (per GA-3B sub-rule winner) holds across all 4 runbooks: read-only commands run as user; sudo prefix appears ONLY on admin-action-required state-changing remediation.

### Notes

The Referee did not lock a single Option 3X winner per-se because Option 3X structural shapes overlapped imperfectly with the per-runbook-per-cause confirmed-defect surface. Confirmed CRITs in 3A (3A-1 + 3A-2) and 3C (3C-1) ruled out strict-portal options. Defect 3D-2 (Runbook 30 sign-in/timeout still need terminal) extended the terminal scope beyond 3D's stated package-install-only. The synthesized winner is "3D extended to all Runbook 30 causes + read-vs-write apt distinction."

---

## Gray Area 4 — Validator depth + commit atomicity

### Candidate Options Presented

| Option | Description | Finder Score |
|--------|-------------|---------------|
| 4A | Minimal validator + single atomic commit. | 41 (6 defects: 3 CRIT + 2 MED + 1 LOW) |
| 4B | Mid validator (cross-link literals) + single atomic commit. | 26 (5 defects: 1 CRIT + 3 MED + 1 LOW) |
| 4C | Full validator (negative-assertion + pinned H2s) + single atomic commit. | 9 (5 defects: 1 MED + 4 LOW) |
| 4D | Full validator + two commits. | 23 (7 defects: 4 MED + 3 LOW) |

### Adversary Disproves Attempted

None. Adversary deliberately confirmed all 4 CRIT defects in 4A/4B (4A-1 + 4A-2 + 4A-3 + 4B-1 — all SC#3 / DPO-01 / DPO-02 cross-link contracts) since CRIT-vs-MED asymmetry made speculative CRIT disproves unprofitable.

### Referee Verdicts

All Finder defects in GA-4 RETAINED.

### Post-Ruling Scores

| Option | Original | Adopted Disproves | Final | Rank |
|--------|----------|-------------------|-------|------|
| 4A | 41 | 0 | 41 | 4th |
| 4B | 26 | 0 | 26 | 3rd |
| 4C | 9 | 0 | **9** | **1st (BEST)** |
| 4D | 23 | 0 | 23 | 2nd |

### Winner

**Option 4C** — Full validator (frontmatter C10 + file existence + 4-branch Mermaid + literal cross-link strings + PITFALL-2 negative-assertion in Runbook 32 + pinned H2 strings per runbook + read-vs-write apt regex) + single atomic commit.

### Notes

Defect 4C-4 (MED, retained): Phase 50 D-18 "ZERO append-only edits to existing pinned files" load-bearing reason does NOT directly transfer to Phase 51 (which has 2 append-only edits at `00-index.md` + `00-initial-triage.md`). However, those append targets are NOT in the v1.5 supervision_exemptions sidecar (Android files only), so the technical constraint that drove Phase 49's 2-commit split (PITFALL-12 pin-coord refresh atomicity per Phase 48 D-14) ALSO does not apply. The Referee's CDI-Phase51-06 located the load-bearing reason for single-commit elsewhere: validator V-51-21 + V-51-22 assert append-only-edit presence at the 2 hub files; in a 2-commit split (rejected 4D), commit-1 of the 2 would FAIL because the append targets aren't yet modified — atomicity-contract violation per Phase 48 D-14 commit-each-bisect-clean discipline. Single atomic commit is forced by validator shape, not Phase 50 D-18 precedent inheritance.

---

## Cross-Decision Integration Callouts (Referee Output)

| ID | Coupling | Description |
|----|----------|-------------|
| CDI-Phase51-01 | D-01 × D-04 | Whitelist-first tree shape + tree-level CA disambiguation node — mutually reinforcing; tree authors only nodes for axes that exist; Linux has only web-app CA. |
| CDI-Phase51-02 | D-09 × D-04 | Anchor-indexed Runbook 32 cause shape + tree-level PITFALL-2 routing — tree CA branch routes ONLY to Runbook 32; 3 internal causes are all web-app-CA failure modes. |
| CDI-Phase51-03 | D-04 × Phase 50 CDI-Phase50-04 | Tree CA H2 deep-link to `linux-capability-matrix.md#conditional-access` — Phase 50 anchor stability contract; renaming requires same-commit Phase 51 update. |
| CDI-Phase51-04 | D-09 × Phase 49 DPO-04 | Anchor-indexed cause shape + glossary-anchor consumption — runbooks reference ~10-12 of Phase 49's ~21 native terms via `_glossary-linux.md#term`. |
| CDI-Phase51-05 | D-13 × D-15 | Read-vs-write apt distinction + per-runbook actor-boundary — sudo prefix appears only on state-changing remediation, never on read-only diagnostic queries. |
| CDI-Phase51-06 | D-19 × D-22 | Full validator scope + single atomic commit — validator V-51-21/V-51-22 append-assertions force single-commit; 2-commit split would fail commit-1. |
| CDI-Phase51-07 | D-15 × Phase 30 D-10 | Per-runbook-per-cause actor-boundary + L1-readonly scope — mixed actor-boundaries preserve L1-readonly invariant at cause level. |

---

## Downstream Phase Obligations (Referee Output)

| ID | Target | Obligation |
|----|--------|------------|
| DPO-01 | Phase 52 | L2 runbooks 24/25 cross-link L1 cause anchors (per D-11); Phase 52 inherits anchor strings as locked. |
| DPO-02 | Phase 52 | L2 runbooks inherit GA-3B read-vs-write apt distinction; check-phase-52.mjs analogous regex assertion. |
| DPO-03 | Phase 56 | DRIFT-07 Linux encryption drift fold inherits PITFALL-1 whitelist-first discipline. |
| DPO-04 | Phase 58 | 4-platform comparison Linux row inherits CA-row wording from Phase 50 + Phase 51. |
| DPO-05 | Phase 59 | CLEAN-08 hub integration consumes Phase 51 anchor surface; runs anchor inventory before authoring. |
| DPO-06 | v1.5.1 | LIN-DEFER-01 Bash deep-dive inherits read-vs-write apt distinction. |
| DPO-07 | Phase 51 | Single-commit atomicity per D-22 + GA-4C winner. |
| DPO-08 | Phase 60 | Audit harness finalization may consider C13 broken-link graduation against Phase 51 cross-links. |

---

## Score Reconciliation

| Stage | Defects | Points |
|-------|---------|--------|
| Finder | 85 (13 CRIT / 41 MED / 31 LOW) | 366 |
| Adversary attempted | 6 disproves (0 CRIT / 5 MED / 1 LOW) | 26 gross / 52 penalty |
| Referee adopted | 5 disproves (0 CRIT / 4 MED / 1 LOW) | 21 points removed |
| Referee rejected | 1 disprove (1C-3 MED) | 0 points adopted; defect retained |
| **Net surviving** | **80 confirmed defects** | **345 points** |

Per-area winners locked:
- GA-1: **Option 1A** (whitelist-first; 2 pts post-ruling) + tree-level CA disambiguation node + Don't-Know escalation node
- GA-2: **Option 2A** (anchor-indexed H2-per-cause for multi-cause; 3 pts post-ruling) + single-cause Runbook 22-style for Runbook 33
- GA-3: **Synthesized per-runbook-per-cause** built on Option 3D baseline (17 pts) + GA-3B read-vs-write apt sub-rule
- GA-4: **Option 4C** (full validator + single atomic commit; 9 pts; retained 4C-4 acknowledged in CDI-Phase51-06)

---

## Claude's Discretion (captured in CONTEXT.md as CD-01..CD-08)

User said "use /adversarial-review to recommend the best one and provide your reasoning" — Claude executed the skill and synthesized the Referee's output into the per-area winners + CDIs + DPOs above. Within the locked decisions, the following remain at author discretion at plan/execute time:

- CD-01: Exact wording of `09-linux-triage.md` platform-gate blockquote
- CD-02: Mermaid styling (classDef colors mirror Android tree)
- CD-03: CA branch shape (decision diamond vs callout-shape)
- CD-04: Runbook 31 cause ordering (likelihood vs other; anchors locked)
- CD-05: Per-cause body length within multi-cause runbooks
- CD-06: Whether Runbook 31 custom-compliance cause includes 1-2 minimal Bash exit-code snippets
- CD-07: Mermaid root node label phrasing
- CD-08: Don't-Know escalation node — inline data-collection vs Escalation Data table at bottom

---

## Deferred Ideas (captured in CONTEXT.md `<deferred>`)

- PITFALL-5 collision-audit graduation to v1.5 harness (Phase 60 consideration)
- Pre-commit advisory hook coverage extension (Phase 60 consideration)
- C13 broken-link graduation against Phase 51 cross-links (Phase 60 consideration)
- L2 anchor surface inventory (Phase 52 plan-author work)
- Hub navigation extensions (Phase 59 CLEAN-08)
- 4-platform comparison Linux CA row wording (Phase 58 DEFER-08)
- DRIFT-07 Linux encryption drift section (Phase 56)
- v1.5.1 LIN-DEFER-01 Bash deep-dive (Phase 50 LIN-DEFER-01 inheritance)
- PITFALL-13 false-positive allowlist for V-51-19 (lazy-add at first occurrence)

### Reviewed Todos (not folded)

*(No pending todos matched Phase 51 scope — `todo match-phase 51` not run by orchestrator at discuss-phase time. Phase 51 plan-phase orchestrator may surface relevant todos.)*

---

*Phase: 51-linux-l1-triage-runbooks-30-33*
*Discussion log generated: 2026-04-27*
*Adversarial review applied: Finder/Adversary/Referee on 4 gray areas covering 14 candidate options*
*Finder 366 raw → Adversary attempted 6 disproves → Referee adopted 5 (21 points removed; ~345 surviving across 80 confirmed defects)*
