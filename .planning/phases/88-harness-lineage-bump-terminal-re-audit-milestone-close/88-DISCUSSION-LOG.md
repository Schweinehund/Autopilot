# Phase 88: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-24
**Phase:** 88-harness-lineage-bump-terminal-re-audit-milestone-close
**Areas discussed:** Validator self-freezing, 3-axis re-audit execution, Milestone-close boundary, Deferred-cleanup scope

**Method:** User selected all four gray areas and requested `/adversarial-review` to recommend the best option per area with reasoning (per standing preference for gray-area picks). A Finder→Adversary→Referee chain (opus) evaluated a grounded decision brief. Finder raised 11 critical / 16 medium / 15 low concerns; Adversary disproved 7 as overstated/stale (+32, no wrongful disproves); Referee calibrated. **All four areas resolved to Option A.** The decisive value of the review was not the winner selection (both prior agents independently picked A everywhere) but the two binding conditions (CX-1, CX-2) and the chain-RED carry-forward correction (D-07).

---

## Validator self-freezing strategy (check-phase-83..88)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Structural/self-referential only (precedent 71–82); no v1.10 content coupling | ✓ |
| B | Content-coupled + same-milestone self-freeze against a V110 pin | |
| C | Content-coupled at HEAD, defer conversion to next milestone | |

**Choice:** Option A.
**Notes:** B is a bootstrap paradox — the V110 SHA = the close-gate commit, which does not exist when the validators are authored, forcing a RED window or a post-close conversion commit (recreating the V17/V17_CLOSEGATE ambiguity, RETRO-02). C willfully manufactures v1.11 chain-health debt — the exact pre-71 content-coupled pattern phase 86 just spent a whole phase removing. A is the verified `check-phase-82` pattern ("AUDIT-HARNESS + SELF only") that kept 75–82 green with zero debt. "Theater" critique (structural-only verifies nothing about content) dismissed: content correctness is enforced by check-phase-83..87 + per-phase verification at authoring time; the milestone harness verifies lineage/immutability.

---

## 3-axis terminal re-audit execution

| Option | Description | Selected |
|--------|-------------|----------|
| A | Fresh `git clone --no-hardlinks` (not worktree) + Linux GHA + Task-tool sub-agent | ✓ |
| B | Worktrees for Axis 1/3 with retries + verification guards | |
| C | Drop Axis 1 fresh-clone; rely on Axis 2 (GHA) + Axis 3 sub-agent | |

**Choice:** Option A — **conditional on the mandatory D-03 mitigation (CX-2)**.
**Notes:** A clone ≠ a worktree, so A sidesteps the known-unreliable worktree lifecycle on this repo. B fights that bug and uses retries (determinism-masking). C ships 2 axes for a "3-axis" requirement. The make-or-break condition: the v1.10 apex is [48..87] (+6 vs v1.9); the open `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` O(n²) cold-clone cost worsens with depth, so the authoritative apex count MUST come from the warm main tree + Linux GHA, with the fresh clone used only for fast non-apex validators. `--no-hardlinks` cost dismissed as non-decisive (it lands off the mitigated apex path).

---

## Milestone-close boundary

| Option | Description | Selected |
|--------|-------------|----------|
| A | Phase ends at close-gate; archival separate via `/gsd-complete-milestone` | ✓ |
| B | Phase 88 also performs `/gsd-complete-milestone` archival as its final act | |

**Choice:** Option A.
**Notes:** Exact v1.4–v1.9 precedent — phase 82 ended at the close-gate (`b29dca5`), archival was separate (`f66cf25` + jira `306a30a`). B couples *irreversible* archival to the phase before independent verification and mutates the byte-layout/path resolution (`resolveArchivedPhasePath`) the validators read. Dismissed concerns: "two-step archival might never run" (disproved — v1.9 proves it completes) and "close-gate-vs-archival SHA ambiguity" (disproved — the rule already pins the close-gate SHA, e.g. V18 = close-gate not archival).

---

## Deferred-cleanup scope (v1.10-DEFERRED-CLEANUP.md)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Deferred requirements only (MTPSSO, KRBFUT) | ✓ |
| B | Requirements + repo-hygiene checklist (worktrees, TEMP files, docs.zip) | |
| C | Requirements only + one-line "cruft out of scope" note | |

**Choice:** Option A.
**Notes:** DEFERRED-CLEANUP is a requirements-traceability artifact, not a janitorial log. B/C pollute it with janitorial content and reference untracked files absent from the close SHA. **Key correction (D-07):** the legacy chain-RED (`PRE-EXISTING-CHAIN-RED-AT-HEAD-01`, FAILs 58–66/73) is RESOLVED by phase 86 (37 PASS / 0 FAIL both OSes) and MUST NOT be carried forward as unresolved debt. `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` IS still open and carries forward.

## Claude's Discretion

- `V110` naming for the future v1.10 frozen key is convention-correct (readability nit only); not pinned in this phase.
- v1.10 CI coexistence workflow is the 7th, following the existing pattern.

## Deferred Ideas

- Repo working-tree cleanup → `/gsd-cleanup` (separate work).
- Subprocess-result caching as the durable fix for the Windows cold-clone timeout (still open; carry forward).
- DEFERRED-CLEANUP single-canonical-location convergence (low-priority hygiene flag).
- MTPSSO-01/02/03, KRBFUT-01/02 → own future milestones.
