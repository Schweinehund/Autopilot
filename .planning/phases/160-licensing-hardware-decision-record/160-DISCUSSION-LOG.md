# Phase 160: Licensing / Hardware Decision Record - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-10 → 2026-09-12
**Phase:** 160-licensing-hardware-decision-record
**Areas discussed:** The ruling itself; Block placement in RE-237; Consequences and evidence; Licensing-matrix edits; Lock the block wording; check-phase-160 needle set; Read-only pilot checkpoint; Verify depth on the rewritten cell; SC2 / LIC-02 amendment mechanics; Plan split, order and commit shape; Fact-check rubric and source refetch; Style keeps and dispositions

**Method (owner-instructed, both rounds 1-3):** "Use /grill-me to thoroughly raise additional questions in each of the areas and use /adversarial review to evaluate each of the questions in each of those areas to recommend the best one and provide your reasoning." Each round: a question tree with candidate options and a recommended pick was written to the session scratchpad, then a Finder → Adversary → Referee chain (Opus, fresh context each) scored every recommendation against the repository at HEAD 80179c9e. The owner then ruled on the owner-only calls and confirmed or overrode the Referee's picks.

| Round | Areas | Finder issues | Adversary disproved | Referee real | Picks the review changed |
|---|---|---|---|---|---|
| 1 | Ruling, placement, consequences, matrix | 26 (4 critical) | 8 (Referee overturned 1) | 17 | B2 Case 2 → Case 1; B5 leave :42 → rewrite; D1 blockquote-only → ruling in the :62 cell; A1 LTSC conflation fixed; 4 new questions |
| 2 | Wording, needles, pilot checkpoint, verify depth | 29 (6 critical) | 1 | 28 | Three false SKU absolutes rewritten to the source's split; CSP citation scoped; Branch cells given real links; callout count 5 → 9; six "reported as unactivated" sites; judge-packets replaced by hand-built packets; lock scope narrowed; :31 pointer dropped |
| 3 | Amendment mechanics, plan split, fact-check rubric, style keeps | 26 (4 critical) | 3 | 23 | `[REQUIREMENT AMENDMENT]` (invented) → `[SUCCESS-CRITERION AMENDMENT]`; leaf validator → Phase 167; five plans → three; `claude -p` dispatch; ms.date tiebreak; six keeps not four |

**Deviation recorded:** three files are committed by this step (`160-CONTEXT.md`, `160-DISCUSSION-LOG.md`, `160-DRAFTS.md`) where `discuss-phase.md` step `git_commit` names two. Reason: the drafts are verbatim-locked strings the planner must copy, too long for `<specifics>`, and they existed only in a session scratchpad.

---

## The ruling itself

| Option | Description | Selected |
|--------|-------------|----------|
| MAK-Enterprise on current HP | Volume-licensed Windows Enterprise activated per device with a MAK on the existing hardware; IoT Enterprise hardware the net-new alternative | ✓ |
| OEM-licensed IoT Enterprise hardware | IoT hardware as the standard; HP/MAK an interim posture | |
| Staged: MAK now, IoT at refresh | Two rulings in one block | |
| Record at an execution checkpoint | Defer the ruling | |

**User's choice:** MAK-Enterprise on current HP (Referee-recommended).
**Sub-questions:** A2 record now, dated 2026-09-10 ✓; A3 MAK entitlement — **Unknown / not confirmed** (owner), so the ruling names a prerequisite; A4 kiosk class only; A5 prose attribution.
**Notes:** Owner asked "What about Windows 365 E3 licenses as an option?" Answered from the fetched Windows 365 Enterprise requirements page (ms.date 2026-03-06): per-user Cloud-PC licences do not license the endpoint's edition; Windows 365 Link is a different device class. Owner chose: **Deferred idea only**.

## Block placement in RE-237

| Option | Description | Selected |
|--------|-------------|----------|
| Top of Step 4 with bridge sentence | Before the existing delivery-mechanism fork | ✓ |
| Prerequisites | Extend the :31 bullet | |
| New Step / unnumbered H3 | Renumbers pinned-eligible headings | |

**User's choice:** Accept all Referee picks (round 1). Case 1 (Referee changed from my Case 2); ruling as prose after the table; :42 remedy cell rewritten (Referee changed from "leave"); one callout.
**Round-2 corrections accepted:** Branch cells carry real links (MAK → Step 5; IoT → the Shell Launcher XML asset); **shared target with :106 accepted** by the owner over "link the IoT arm to Step 8"; :31 pointer dropped; lock scope narrowed to capped lines + placement.

## Consequences and evidence

| Option | Description | Selected |
|--------|-------------|----------|
| OEM cleanup stays under both arms | Factory-image problem; narrows per SKU at procurement | ✓ |
| Retires under the IoT arm | PROJECT.md framing | |
| Silent | | |

**User's choice:** Accept all. No live MAK activation (offered as an override, declined); reasoning idiom for the unsourced remedy; inline Learn links + See Also; four surfaces cross-checked incl. RE-224.
**Round-2 corrections accepted:** the three "never IoT Enterprise" absolutes replaced by the source's New-Device/Upgrade split with "qualifying operating system" UNVERIFIED; CSP citation scoped to Enterprise/Education.

## Licensing-matrix edits

| Option | Description | Selected |
|--------|-------------|----------|
| Ruling in the :62 Notes cell + one blockquote + VH row | Referee-formulated (d) | ✓ |
| Blockquote line only | My original pick — zero cell edits | |
| Replace the "Not pilot-tested" line | Would assert a test that never ran | |

**User's choice:** Accept all. No `[PILOT]` in the matrix; re-stamp both files.
**Round-3 rationale correction:** re-stamp kept on the "edit re-verifies claims against sources" rule; EEE-SOP:675 counter-precedent named.

## Lock the block wording now

| Option | Description | Selected |
|--------|-------------|----------|
| Capped lines + placement verbatim; rest facts + shape | Referee (c)+placement | ✓ |
| Lock everything verbatim | My original pick; unsatisfiable with the pilot sentence and fact-check rewrites | |
| Shape only | | |

**User's choice:** Accept all (round 2). Measured: lead-in 167, callout 194, matrix blockquote 186; the spelled-out "operating system" form measured 208 and failed the cap.

## check-phase-160 needle set

| Option | Description | Selected |
|--------|-------------|----------|
| Phase 167 authors the leaf; needle list via 160-EVIDENCE.md | ROADMAP:173 + HARN-04 + 15/15 precedent | ✓ |
| Phase 160 ships it | Needs cross-phase amendments with no precedent | |

**User's choice:** Phase 167 authors it (round 3, reversing round-2 F6). Needle list: 5 lead-ins, 9 callouts, verbatim lead-in, durable literals, negatives; no anchor/date/run-count pins.

## Read-only pilot checkpoint

| Option | Description | Selected |
|--------|-------------|----------|
| Keep, re-scoped | cscript commands; allowlist; honest sentence; disposition per License Status; decline is a resume signal | ✓ |
| Drop | Pure authoring | |

**User's choice:** Keep, re-scoped (round 2); single-gate form accepted (round 3; two-gate form offered and not taken).

## Verify depth on the rewritten cell

| Option | Description | Selected |
|--------|-------------|----------|
| Hand-built packets + fresh-process fact check | judge-packets emits 0 packets for zero-modal lines | ✓ |
| Nothing (additive-phase rule) | | |
| Full google-style-verify run | | |

**User's choice:** Accept all. Round 3 fixed the dispatch (`claude -p`, no Agent tool) and added the table-cell class and the six-process cap.

## SC2 / LIC-02 amendment mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| Amend SC2 and LIC-02 via SUCCESS-CRITERION AMENDMENT, landed in plan 01 | Precedented idiom; check-phase-54 32/0 before/after | ✓ |
| Keep SC2 literal | Everything into the :62 cell; no VH row | |

**User's choice:** Amend (round 2 owner ruling); round 3 fixed the idiom (`[REQUIREMENT AMENDMENT]` had zero uses), the antecedent quotes, and demoted the grep to "measured, not guarded".

## Plan split, order and commit shape

| Option | Description | Selected |
|--------|-------------|----------|
| Three plans (amendment; RE-237 with in-plan checkpoint; matrix) | Referee round 3 | ✓ |
| Five plans | My draft; separate checkpoint plan strands LIC-01 on decline; leaf plan belongs to 167 | |
| One plan | | |

**User's choice:** Accept all. `requirements: []` on plan 01 kept (Adversary disproved the "must not be empty" claim; 159-05 precedent). docs/fix commits, never feat. Gates inside each editing plan. GATE-BASELINE single snapshot. 160-DRAFTS.md as a sibling.

## Fact-check rubric and source refetch

| Option | Description | Selected |
|--------|-------------|----------|
| Re-fetch served HTML at execution; quote ms.date | No public backing repo for either page; IoT page is a live one-day decoy | ✓ |
| Reuse recorded quotes only | | |

**User's choice:** Accept all. Five classes incl. table-cell aggregation; two rounds per fragment, six processes max.

## Style keeps and dispositions

| Option | Description | Selected |
|--------|-------------|----------|
| Record six keeps; no tooling change | No sweep3 rule can touch any of them; check.py has no suppression; dispositions cannot pre-exist | ✓ |
| KEEP_LINE entry in sweep3.py | Tooling edit outside phase scope | |
| _DISPOSITIONS.tsv rows | No-op | |

**User's choice:** Accept all.

## Claude's Discretion

- Exact sentence wording after a fact-check rewrite (facts and shape locked).
- GATE-BASELINE field values; EVIDENCE prose layout.
- Single-gate vs two-gate `Licensed` handling (owner allowed either).

## Deferred Ideas

- Live MAK activation + ShellLauncher re-test on the pilot device (follow-through milestone).
- Windows 365 Link / Frontline shared as a Cloud-PC-targeted walk-up device class (future recipe; third-lockdown-recipe bar).
- REQUIREMENTS.md:107 "OEM-cleanup class retires" wording (planning assumption to correct at the next milestone scoping).
- Corpus-wide `KEEP_LINE` for `Ask the admin:` (tooling).
- `check-phase-160.mjs` (Phase 167; needle list handed over in 160-EVIDENCE.md).
