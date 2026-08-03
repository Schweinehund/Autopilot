# Phase 137: Integration & Navigation-Last Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-03
**Phase:** 137-integration-navigation-last-close
**Areas discussed:** Hub disposition ruling, index.md nav surfaces, Commit topology, CLASS-06 validator needle
**Method:** user requested `/grill-me` to deepen the question set and `/adversarial-review` to rule each question.

---

## Area selection

| Option | Description | Selected |
|--------|-------------|----------|
| Hub disposition ruling | SC4's named ruling: re-confirm not-wired, or revise given kiosk/MHS lockout L1-adjacency | ✓ |
| index.md nav surfaces | Line-38 quick-nav parenthetical policy, table row order, link text, blurb style | ✓ |
| Commit topology | Two same-commit constraints + navigation-last ordering → plan/commit split | ✓ |
| CLASS-06 validator needle | Author `check-phase-137.mjs` here vs. hand a needle-spec to Phase 138 | ✓ |

**User's choice:** All four, plus — *"Use /grill-me to thoroughly raise additional questions in each of the areas and use /adversarial review to evaluate each of the questions in each of those areas to recommend the best one and provide your reasoning."*

---

## /grill-me — question expansion

21 questions raised across the four areas (Q1.1–Q1.5, Q2.1–Q2.5, Q3.1–Q3.5, Q4.1–Q4.5), each with a candidate ruling.

**Settled by codebase exploration rather than asked:** leaf-validator authorship precedent (`63bb0665 feat(134-03)`); registry at 223 rows with tail RE-223; the registry `Title` column driving the `.docx` filename with RE-222/223 using H1 verbatim; C17 #11's 25-row threshold being irrelevant; the three hub files containing zero kiosk/MHS-lockout content; recipes 03/04 having zero inbound links corpus-wide.

---

## /adversarial-review — 3 parallel Finders → Adversary → Referee

| Stage | Result |
|---|---|
| Finder (Areas 1–2, Areas 3–4, cross-cutting) | 50 issues raised (merged, deduplicated) |
| Adversary | 34 disproved (claimed 125 pts) |
| Referee | **22 confirmed real** — 6 CRITICAL, 8 MEDIUM, 8 LOW |

**Outcome: 17 of the 21 candidate rulings changed.** Four new questions (D-23, D-24, D-25, plus the hubs-enforcement question folded into D-03) were added that no area had asked.

**Two CRITICAL findings independently re-verified by the orchestrator before any ruling depended on them:**
- `check-phase-132.mjs:97`'s regex returns `false` for both `recipes/03-…` and `recipes/04-…` — verified by direct `node -e` execution.
- `build-publish-bundle.mjs --self-test` → `14 passed, 1 failed`, `(a) Approved selection yields exactly 221 rows FAIL -- rows.length=223` — verified by running it.

**Notable Adversary wins (Finder findings ruled FALSE POSITIVE by the Referee):** the claim that L2 runbooks 19/20 cover kiosk *lockout* (they cover policy-unassigned and allow-list exclusion — `grep -niE 'exit.?pin|lockout'` returns nothing); the claim that `v1.19-DEFERRED-CLEANUP.md` is not a valid landing spot; the claim that Q2.3 re-derives Phase 135's locked H1 (different decision — link text vs. slug/H1); the claim that platform-section `### Admin Setup` rows are in CLASS-06's scope.

---

## Owner calls (3)

### Line-38 quick-nav bullet

| Option | Description | Selected |
|--------|-------------|----------|
| Enumerate all four | Extend the parenthetical to name all four recipes. Keeps SC3's same-commit mechanic meaningful; makes the per-recipe needle buildable. Line grows unboundedly. | ✓ |
| Genericize the bullet | Strip the enumeration — what `132-REVIEW.md:66-83` actually prescribed before the shipped text deviated. Structurally eliminates the WR-01 class but guts SC3 and leaves the needle nothing per-recipe to assert. | |

**User's choice:** Enumerate all four.
**Notes:** The candidate's stated rationale ("every other index.md bullet enumerates its section's members") was struck as false — `:34` and `:40` enumerate nothing, and `:39` names four of five `###` subsections. Replacement grounds are diff size against an Approved doc and needle buildability. Recorded as D-07.

### Second canary (`build-publish-bundle.mjs`, already RED at 221 vs 223)

| Option | Description | Selected |
|--------|-------------|----------|
| Fix in 137 | Bump 221→225 in the same commit as the other canary; amend CLASS-05/SC2 to name both. Small scope addition beyond CLASS-05's literal text. | ✓ |
| Defer to Phase 138 | Log as a DEFERRED-CLEANUP candidate — but 138 is hard-blocked on the owner's push and this canary is already a milestone overdue. | |
| Fix, no requirement edits | Bump and record, but leave REQUIREMENTS.md/SC2 untouched — deliverable then untraceable to a requirement clause. | |

**User's choice:** Fix in 137.
**Notes:** Leaving it would be a verbatim recurrence of the `FILENAME-MAP-SELFTEST-DRIFT` defect CLASS-05 itself cites as the milestone's #1 recurring lesson. Recorded as D-23.

### RE-225 pandoc / guard-docx pre-flight

| Option | Description | Selected |
|--------|-------------|----------|
| Pre-flight before the flip | Run `convert.ps1` + `guard-docx.mjs` on both recipes, gated before Commit A. Moves any remediation out of hard-blocked Phase 138. | ✓ |
| Leave it to Phase 138 / HARN-16 | Keeps 137 minimal, but a `guard-docx` failure would surface in the terminal close phase, which has no content-remediation budget. | |

**User's choice:** Pre-flight before the flip.
**Notes:** `grep -rli 'guard-docx|pandoc'` → 9 Phase-135 artifacts, **zero** Phase-136 artifacts. RE-225 ships a column-0 ` ```json ` fence and `build-publish-bundle.mjs:312` selects on `status === 'Approved'` — the Phase-137 flip is what enrolls it. Recorded as D-24.

---

## Rulings that reversed the candidate

| Ruling | Candidate said | Final | Forced by |
|---|---|---|---|
| D-01/D-02 | Frozen-validator cost is a corroborating ground | Cost is **zero**; the ground is deleted and the requirement text is corrected | `check-phase-132.mjs:97` regex verified non-matching |
| D-03 | V-132 already covers 03/04, no new needle | V-132 covers nothing; new needle **required** | same |
| D-05 | Enact a standing rule for future recipes | Scoped to RE-224/225 only | standing rule rested on the false premise |
| D-14 | One atomic commit | **Three commits, flip-first** | `996dcead` → `fb179bfa` precedent; C17 #9 misattribution |
| D-16 | Nav-last evidence in SUMMARY | VERIFICATION observable truth, with timestamps, content commits named | `132-VERIFICATION.md:23` |
| D-17 | C17 + link-checker after each plan | C17 after every commit + a recipe outbound-link sweep no tool covers | `check-nav-hub-links.mjs:217,249` scope |
| D-18 | Content phases never authored validators | Convention is **current** (since v1.8), not universal; `V-137-SELF` is leaf-owned not apex-owned | `aecf0141 docs(55)`; `check-phase-132.mjs:34-35` |
| D-19 | Needle literals = path substrings | Path substrings can't match line 38 at all; prose-name literals fixed at ruling time, line-extraction mandated | `docs/index.md:38` carries no path/ID |

---

## Claude's Discretion

- Exact "When to Use" blurb wording per new row, within the 20–33 word measured-precedent budget.
- Commit-message subjects.
- Placement of the correction comment in `build-publish-bundle.mjs`.

## Deferred Ideas

- Hub wiring via a non-barred surface (`l1-runbooks/00-index.md`, `decision-trees/`) — belongs to whatever phase authors a kiosk-lockout / MHS-exit-PIN-lockout runbook.
- A standing recipes-vs-hubs rule for recipe 05+ — deliberately not enacted.
- Genericizing the line-38 bullet — considered, owner-ruled against, revisit if the section grows unwieldy.
- Fixing `V-132-HUBSNOTWIRED`'s regex and `REQUIREMENTS.md:31`'s claim about it — frozen surface, deferred to a milestone that legitimately re-opens `scripts/validation/` predecessors.
- A durable checker extending `check-nav-hub-links.mjs` beyond the 4 hubs — tooling debt, and v1.19 has NO-TOOLING-PILLAR locked at roadmap.
