# Phase 138: V118 Pin + 17th Path-A Lineage Bump + Terminal Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-03
**Phase:** 138-v118-pin-17th-path-a-lineage-bump-terminal-close
**Areas discussed:** Axis-2 execution mechanics, Windows deep-nest axis, Predecessor standalone-RED disposition, v1.19-DEFERRED-CLEANUP scope

**Method:** The owner selected all four areas and directed: *"Use /grill-me to thoroughly raise additional questions in each of the areas and use /adversarial review to evaluate each of the questions in each of those areas to recommend the best one and provide your reasoning."*

- **`/grill-me`** produced 24 questions (A1–A7, B1–B5, C1–C6, D1–D6), each with a candidate ruling, grounded in 16 live repo measurements rather than inference.
- **`/adversarial-review`** ran 3 parallel Finders (split by area: A+B, C, D+facts) → Adversary → Referee. Synthesizer skipped (decision review, not code review).
- **Result: 66 findings raised, 8 disproved by the Adversary and upheld by the Referee, 58 confirmed. 9 of the 24 candidate rulings were overturned.** Two were overturned because their load-bearing premise was factually false.

---

## Area 1 — Gray-area selection

| Option | Description | Selected |
|--------|-------------|----------|
| Axis-2 execution mechanics | How the Linux-GHA authoritative axis runs for a brand-new, not-yet-remote v1.19 harness | ✓ |
| Windows deep-nest axis | Advisory vs mandatory at [48..137]/90 entries; Axis-3 independence | ✓ |
| Predecessor standalone-RED | What "full predecessor chain BEFORE the close-gate" means operationally | ✓ |
| DEFERRED-CLEANUP scope | Which of ~9 candidate entries land; log-only discipline | ✓ |

**User's choice:** All four, plus the `/grill-me` + `/adversarial-review` method directive.

---

## Area 2 — Axis-2 execution mechanics (A1–A7)

| Option | Description | Selected |
|--------|-------------|----------|
| Owner push + `workflow_dispatch`, in-phase | Named plan checkpoint; owner runs `git push origin master` then `gh workflow run … --ref master`; phase resumes and captures the live run before the close-gate. Matches v1.7–v1.14 (8 milestones), each for a then-new workflow. | ✓ |
| Defer Axis-2 to a post-close push | Repeat v1.18's shape; SC3 recorded UNMET; named `V119-AXIS2-DEFERRAL` entry | |
| Branch + PR (v1.17 shape) | Push an atom branch, open a PR, let `pull_request` fire | |

**User's choice:** Owner push + dispatch, in-phase. **Owner-ruled 2026-08-03.**

**Notes:** This overturned the pre-review recommendation (branch + PR) *and* struck its premise. The claim *"a direct master push produces no Axis-2 evidence"* is false — `workflow_dispatch` requires the workflow file on the **default branch**, so pushing master is the precondition for dispatch, not a dead end. Finder 1 surfaced that neither v1.17 nor v1.18 is the dominant precedent: `v1.7:176`, `v1.8:164`, `v1.9:174`, `v1.10:166`, `v1.11:168`, `v1.12:165`, `v1.13:186`, `v1.14:260` all record `Event: workflow_dispatch (--ref master)`, and this repo did exactly that on 2026-08-04 → run `30872644813`.

The branch+PR option was found strictly worse on three independent grounds: it created three `origin/phase-*-atom-2` branches that are still live; the mis-set upstream to `origin/phase-125-atom-2` is the documented root cause of this milestone's own blocker (`REQUIREMENTS.md:47`); and `pull_request` checks out `refs/pull/N/merge` rather than a named SHA. The stated PR topology ("branch that is an ancestor of master") was additionally incoherent — an ancestor head yields an empty diff and GitHub refuses the PR.

Also overturned in this area: the "PR head SHA" ruling (v1.17's precedent is defective — `gha_authoritative_sha: 5da45802` vs Axis-1 at `4e89d68c`, yet `:25` asserts exact match), replaced by **one SHA for all three axes**. And a previously-unstated coupling was found: `audit-harness-v1.18-integrity.yml:172` carries the only standalone `check-phase-134` job, which is how HARN-16's "authoritative for BOTH chain validators" is satisfied for the predecessor apex — so the v1.18 run must be GREEN and is not fallback-eligible.

---

## Area 3 — Windows deep-nest axis (B1–B5)

| Option | Description | Selected |
|--------|-------------|----------|
| Axis-1 ADVISORY (re-affirm GA-1 D-01) | Two clean cycles don't retire a known platform timeout; promoting it makes a flaky win32 property a close blocker | ✓ |
| Promote Axis-1 to mandatory-PASS | Given v1.17 @80 and v1.18 @86 completed cleanly | |

**User's choice:** ADVISORY (survives review), with one ground struck and the record corrected.

**Notes:** The byte-unchanged reject-ground was struck as *stated* (it conflated the new file's GHA `timeout-minutes` with the frozen per-subprocess budgets) and survives only in its narrow form. The "two clean cycles" framing was corrected: `v1.15-MILESTONE-AUDIT.md:221` records *"apex NOT run on Windows"*, and v1.16 likewise — so the honest history is not-run at v1.15/v1.16, clean at v1.17/v1.18.

Axis-3's ruling changed: the pre-review recommendation declared it "explicitly redundant when Axis-2 lands," which un-meets a written success criterion — HARN-16 and ROADMAP SC3 both *name* "fresh zero-context reproduction" as a required leg. Final ruling: corroborating in weight, **mandatory in execution**, run regardless of Axis-2.

Two Finder claims in this area were disproved and did **not** make it into CONTEXT.md: that B1 and B5 contradict each other (they address two different timeout budgets), and that WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 should be re-scoped-or-closed against the v1.14 160s→2s collapse (`v1.18-DEFERRED-CLEANUP.md:110` already separates the cold-clone curve from the within-apex curve).

Priority was inverted on timeouts: `timeout-minutes: 30` is a phantom risk (~900× headroom on an O(n) property); the budget that matters is the 600s/300s per-subprocess pair, plus a **missing `maxBuffer`** on the apex's `execFileSync` — the concrete mechanism that breaks "nested-green ⟹ apex-green."

---

## Area 4 — Predecessor standalone-RED (C1–C6)

| Option | Description | Selected |
|--------|-------------|----------|
| Three-part gate: apex + nested sweep + O(n²) disclaimer | The pre-review candidate | |
| Four-part gate: apex + **non-nested** band run + exponential disclaimer + **post-close-gate** run | Replacement after review | ✓ |

**User's choice:** The four-part gate (replacement).

**Notes:** This was the review's highest-value finding. The candidate's nested sweep is **redundant with** the apex, not a second gate — `check-phase-134.mjs:143` spawns children with the identical env and cwd a manual sweep uses, and running the apex itself under `CHECK_PHASE_NESTED=1` skips all 86 chain checks plus the harness check. More seriously, the only branch where live-HEAD drift surfaces is the non-nested one, which is exactly the detect-and-convert purpose `v1.16-REQUIREMENTS.md:67` gave `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`. The candidate gate skipped that branch and then pre-declared the residue non-blocking — reducing HARN-15 to a checkbox.

Supporting measurements that changed the rulings:
- Standalone-RED is **{30, 31, 48, 60, 61, 62, 63, 64, 65, 66}** — ten, not the one the candidate named (only check-phase-61 had been run).
- A third root-cause class was never named: **cascading chain-guards** (48 red → 60 red → 61 red → 62..66 inherit). Fixing the two named causes would not green the set.
- The non-nested chain is **exponential**, not O(n²) — measured doubling 5/10/19/37/75/148/~300s across 60..66.
- The 47-surface byte gate omits every shared mutable dependency (`c17-eee-contract.mjs` 8 importers incl. four frozen harnesses; `archive-path.mjs` 23; `exec-fail-detail.mjs` 31; `frozen-at-close.mjs` 25).
- The allowlist proof instrument was wrong: `regenerate-supervision-pins.mjs:290` hardcodes the **v1.7** sidecar and walks 26 of 59 line-pins. Replaced with a ~2s `git diff` over the pinned file set (result: zero pinned files changed).
- apex-134 shipped the *opposite* of its own `134-CONTEXT.md:38` fail-loud guardrail; the fail-loud half is restored via a post-close-gate assertion that `V-138-AUDIT` is PASS, not SKIP.

One Finder claim was disproved: that check-phase-30/31 "produce no Result line / crash before summary" — both emit `Summary:` and exit 1; the sweep had grepped for `Result:`.

---

## Area 5 — v1.19-DEFERRED-CLEANUP scope (D1–D6)

| Option | Description | Selected |
|--------|-------------|----------|
| Log-only, ~9 entries, DEFER-119-A re-opened | The pre-review candidate | |
| Log-only document (phase is not), entry list + 6 mandatory additions, DEFER-119-A **unchanged**, correction slot redirected | Replacement after review | ✓ |

**User's choice:** The replacement.

**Notes:** The candidate's headline correction-of-record was a misread. `v1.18-DEFERRED-CLEANUP.md:125-129`'s heading says "AUTO-RESOLVED per TOOL-04" but its body says *"remains ACCEPTED-ADVISORY… advisory-RED-capable… Not a blocker"* — it never closed the item. And the self-test's complete inputs are byte-identical across `7af8a147..HEAD`, so it was red at the v1.18 close too: a "re-open" framing would have implied a regression that provably did not occur. The correction slot was redirected to the larger false premise — `:123`'s claim that the *"complete non-nested [48..133] chain"* found "0 FAIL", which `check-phase-134.mjs:143` makes structurally impossible.

Six mandatory additions were found: the Deployment/Infra trio (dropped open items); all four `136-01-SUMMARY.md:201-207` entries under a **binding verbatim-transcription mandate** on Phase 138; `135-01-SUMMARY.md:113`'s first of two candidates; a DROPPED-and-recorded-Closed section (`V118-PIN-DEFERRAL` closes here); discharging ACCEPTED-STANDALONE-CI-RED's pending status before extending its span; and a deliberate "CARVE-2 closed at v1.18, not re-carried" note.

The double-booking guard was moved from ID level to **root-cause level** — `ACCEPTED-SCOPED-RED` and `DEFER-119-A` are one defect, and `134-CONTEXT.md:53` governs the question verbatim.

Two Finder claims were disproved here: that dropping CARVE-2 reverses a ruling (`:7` scopes the do-not-mask doctrine to *open* items), and that the M2 recovery method departs from STATE's mandate (the subject-line filter **is** the mandate; the bare grep's count of 2 is the false positive it exists to defeat). A third — "M16 cites evidence dated one day in the future" — was disproved by timezone arithmetic: HEAD is authored `2026-08-03 21:50 -0500` = `2026-08-04T02:50Z`, and GHA stamps runs in UTC.

---

## Claude's Discretion

- Internal structure of the 4 new `check-phase-135..138.mjs` validators within the locked invariants (the `check-phase-137.mjs` needle is **not** discretionary — fully specified by 137 D-19/D-20 and `137-02-SUMMARY.md`'s measured actuals).
- Exact `v1.19-audit-allowlist.json` header values and BASELINE_23 comment wording, within the three-item action list.
- Plan decomposition and commit-message subjects.
- Section ordering within `v1.19-MILESTONE-AUDIT.md`, inheriting the v1.18 shape.

## Deferred Ideas

- Ownership rule for `c17-eee-contract.mjs` across the 17-milestone lineage (byte-frozen this phase as a stopgap).
- Re-wording HARN-15, whose literal text ("the full predecessor chain") is unsatisfiable — a genuinely full non-nested chain is exponential.
- The `parseAllowlist` v1.7 lineage freeze (`regenerate-supervision-pins.mjs:415`'s promised repoint, never honoured across 11 milestones).
- Fixing any of the four standalone-RED root-cause classes.
- Correcting `check-phase-134.mjs`'s three latent hazards in place (fixed in the new file only, under D-00a).
- Amending `v1.18-MILESTONE-AUDIT.md:258`/`:290`'s false push semantics in place — precedented via `6acc429b`, but Phase 138 records the correction rather than editing the predecessor doc.
