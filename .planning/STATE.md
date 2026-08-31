---
gsd_state_version: 1.0
milestone: v1.22
milestone_name: Google-Style Corpus Landing, Authoring-Standard Adoption & Walk-Up AVD Kiosk Recipe
status: planning
last_updated: "2026-08-31T16:00:00.000Z"
last_activity: 2026-08-31
progress:
  total_phases: 6
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-08-31 — v1.22 scoped: 39 requirements across 6 pillars, roadmap created)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base. v1.22 makes that corpus read as one voice: a single adopted writing standard applied to every document, proven not to have changed any document's meaning, and carried forward into how new documents are authored — plus the field-validated walk-up AVD kiosk build formalized as Recipe #6.
**Current focus:** Roadmap created 2026-08-31 — 39/39 requirements mapped to 6 phases (154-159), zero orphans. Next: `/gsd-plan-phase 154`.

## Current Position

Phase: 154 of 159 (STYLE Landing — Merge the Verified Google-Style Pass)
Plan: — (not yet planned)
Status: Ready to plan
Last activity: 2026-08-31 — Roadmap created for v1.22

Progress: [░░░░░░░░░░] 0%

## v1.22 Requirement Coverage (39/39 mapped — roadmap created 2026-08-31)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 154 | STYLE-01, STYLE-03, STYLE-04, STYLE-05, STYLE-06, VERIFY-01 | 6 |
| 155 | RCP-01, RCP-02, RCP-03, RCP-04, RCP-05, RCP-06, RCP-07, RCP-08, RCP-09, RCP-10 | 10 |
| 156 | STYLE-02, VERIFY-02, VERIFY-03, VERIFY-04 | 4 |
| 157 | STD-01, STD-02, STD-03, STD-04, HYG-01, HYG-02, HYG-03, HYG-04, HYG-05, HYG-06, HYG-07 | 11 |
| 158 | VERIFY-05, VERIFY-06 | 2 |
| 159 | HARN-01, HARN-02, HARN-03, HARN-04, HARN-05, HARN-06 | 6 |
| **Total** | **39/39 mapped (0 orphaned, 0 duplicated)** | **39** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable user constraint). Phase numbering continues from v1.21 (closed at Phase 153) → v1.22 spans Phases 154-159.

**Named decisions (LOCKED at roadmap 2026-08-31):**

- PHASE-COUNT: 6 phases (154-159), one per pillar with STYLE and VERIFY each split across two phases to honor the landing/prove-it and merge/extend orderings. `config.json` sets no `granularity` key (default standard, 4-6); 6 sits at the top of that band, justified by 39 requirements across 6 categories plus two non-negotiable internal orderings (STYLE-01→STYLE-02→VERIFY-04's after-half; RCP-01..03→RCP-04). Comparable shape is v1.18 (6 phases) and v1.20 (6 phases) rather than v1.21 (9).
- STYLE-SPLIT: STYLE-01/03/04/05/06 (the merge plus its protective canon) land in Phase 154; STYLE-02 (batch 10, including RE-237) lands in Phase 156, after Phase 155 (RCP) has finished reconciling and researching RE-237's content — so the style pass touches RE-237 once, after its prose is final, not before. VERIFY-04's before-measurement is captured in Phase 154 (the first phase, per the milestone's own hard constraint); its after-measurement — required to follow **both** STYLE-01 and STYLE-02 — lands in Phase 156 where both are complete.
- RCP-BEFORE-STYLE2: Phase 155 (RCP, all 10 requirements as one phase) is sequenced between Phase 154 and Phase 156 because RCP-06/RCP-07 edit RE-222 and RE-224, which are themselves part of the merged scratch corpus — those edits must land after the Phase 154 merge, not before it or they risk being overwritten; and RCP-09/RCP-10 finalize RE-237's own prose before STYLE-02 batches it in Phase 156, avoiding a re-style.
- RCP-ATOMICITY: RCP-01 (registry row), RCP-02 (nav wiring) and RCP-03 (both canary bumps) are one commit; RCP-04 (Draft→Approved) is a later, separate commit — both inside Phase 155. Content phases never touch the registry outside this phase.
- STD-HYG-TOGETHER: STD (4 reqs) and HYG (7 reqs) share Phase 157 rather than splitting into two thin phases — both are independent of the STYLE/RCP critical path, both are "close out the milestone's remaining surface area" work, and STD-04's authoring guidance and HYG's corrections are both prose-hygiene concerns a single content pass can carry together.
- FINAL-VERIFY-SEPARATE: VERIFY-05 (dist rebuild) and VERIFY-06 (fix-verification discipline) form their own Phase 158 rather than folding into Phase 157, because VERIFY-05 needs the *fully* final corpus (post STD gate, post HYG fixes, post RCP-04 promotion) and VERIFY-06 is a cross-cutting audit over claims made across Phases 154-157 — it is honestly a final phase, not a 157 sub-task.
- HARNESS-PHASE: Phase 159 is the sole deliverable of the closing cluster (mirrors v1.13 Phase 100 / v1.14 112 / v1.15 119 / v1.16 125 / v1.17 128 / v1.18 134 / v1.19 138 / v1.20 144 / v1.21 153). Hard constraint from the milestone brief: HARN never batches with content work.
- NO-COMPLIANCE-FILENAME: this file and ROADMAP.md were authored and checked against `check-phase-54.mjs`'s `V-54-21` negative — neither file names the off-by-one compliance-policy filename the milestone brief flags.
- DISCUSS-PHASE-FLAGS: gray areas are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` + `/adversarial-review` per project convention. Named: whether RCP-05's `[PILOT]` labeling is already satisfied by the as-authored Draft or needs active editing (155); the exact split of STD-02's mechanical-gate implementation vs STD-03's non-gate documentation (157); whether VERIFY-06's git-log-S audit needs a reusable script or is a one-time manual pass (158).

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25
- v1.5: 14 phases, 101 plans — shipped 2026-05-07
- v1.6: 5 phases (62-66), 30 plans — shipped 2026-05-25
- v1.7: 4 phases (67-70), 15 plans — shipped 2026-05-29
- v1.8: 4 phases (71-74), 13 plans — shipped 2026-06-08
- v1.9: 8 phases (75-82), 19 plans — shipped 2026-06-22
- v1.10: 6 phases (83-88), 16 plans — shipped 2026-06-24
- v1.11: 5 phases (89-93), 13 plans — shipped 2026-06-26
- v1.12: 2 phases (94-95), 5 plans — shipped 2026-06-26
- v1.13: 5 phases (96-100), 14 plans — shipped 2026-06-29
- v1.14: 12 phases (101-112), 38 plans — shipped 2026-07-02
- v1.15: 7 phases (113-119), 40 plans — shipped 2026-07-06
- v1.16: 6 phases (120-125), 38 plans — shipped 2026-07-10
- v1.17: 3 phases (126-128), 11 plans — shipped 2026-07-11
- v1.18: 6 phases (129-134), 17 plans — shipped 2026-07-20
- v1.19: 4 phases (135-138), 12 plans — shipped 2026-08-04
- v1.20: 6 phases (139-144), 44 plans — shipped 2026-08-18
- v1.21: 9 phases (145-153), 48 plans, 131 tasks — shipped 2026-08-30
- v1.22: 6 phases (154-159) — roadmap created 2026-08-31, not yet planned

**Per-plan duration history (v1.0–v1.21):** archived in `.planning/milestones/vX.Y-ROADMAP.md` per milestone and in `.planning/MILESTONES.md`'s key-accomplishments entries. Re-populated here per-plan as v1.22 phases execute.

*Updated after each plan completion*

## Accumulated Context

### Decisions

**v1.22 roadmap decisions (LOCKED 2026-08-31):** see "Named decisions" above.

**Carried-forward durable architectural decisions (from v1.14–v1.21):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commits (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; non-current-milestone predecessor frozen surfaces BYTE-UNCHANGED except explicitly-scoped exceptions (D-00a doctrine).
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01: Linux GHA BOTH chain validators authoritative (D-03 corrected OS split, held v1.12–v1.21); the within-apex curve is healthy (~17s at HEAD).
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory `feedback_adversarial_review_preference.md`).
- Back-anchor pin recovery precedent (V117→V121, now due at v1.22 close for V121): recover the close-gate SHA via the subject-line pair discriminator `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /vX\.Y/ && $2 ~ /MILESTONE CLOSE/'`, count=1 — NOT the dual-token `--grep --all-match` form, which returns multiple candidates because it matches on the commit body.
- A later `check-phase-N` validator can pin an earlier `check-phase`'s EXACT call-site string verbatim — grep before editing any frozen validator line (memory `reference_frozen_callsite_pinning.md`).
- Archival-drift close blocker: `complete-milestone` archiving `.planning/phases/NNN/` can break predecessor check-phase validators reading hardcoded `phases/` paths — scan nested-fail children pre-push at every close (memory `reference_archival_drift_close_blocker.md`).
- `.planning/REQUIREMENTS.md` must not be deleted at milestone close — `check-phase-54.mjs` live-reads it outside the frozen-at-close mechanism (memory `reference_complete_milestone_keep_requirements.md`); the same validator also live-reads `.planning/ROADMAP.md` with the `V-54-21` negative-filename assertion.
- `KEEP_LINE` is the only thing protecting a hand-adjudicated style revert; a revert with no `KEEP_LINE` entry is undone by the next `sweep3.py` run. A blanket TSV row that splits a real label pair must be deleted from the TSV, not worked around.
- `must` is the dangerous style rewrite, not the flattened assertion — STRENGTHENED (a hedge promoted to `must`) outnumbered INVERTED 26 to 19 in the original judge pass.
- A written audit log is not evidence — a prior `RESUME.md` ruling claimed a revert that `git log -S` proved never happened, and the false label shipped gate-green for four batches. Verify any claimed fix with `git log -S "<string>"` before trusting a count that rests on it (this is VERIFY-06's whole premise).

*(Full v1.0–v1.21 execution-decision logs are archived in `.planning/milestones/vX.Y-MILESTONE-AUDIT.md` and `.planning/MILESTONES.md`. The detailed per-plan D-NN decision ledger for v1.21's own Phases 145-153 lives in `.planning/milestones/v1.21-phases/*/*-SUMMARY.md` and `.planning/milestones/v1.21-ROADMAP.md`.)*

### Plan-Time Research Flags (not blockers — resolve at each phase's plan time)

- **Phase 155 (RCP-10): the two external claims RE-237 rests on.** Whether the reference implementation (`Azure/WindowsAppKiosk`) genuinely ships no single-app variant, and the activation-versus-edition basis of the Shell Launcher licensing failure (`Class is not licensed for use`, Intune `-2016281112`). Fetch canonical pages as source bytes, not `WebFetch` — the same URL has returned contradictory answers to two agents in one session in this project's history (memory `reference_canonical_source_bytes_not_webfetch.md`).
- **Phase 154/156 (STYLE-01/STYLE-02): re-measure drift at plan time.** The `22 files / 4,032 insertions / 12 deletions` figure and the `c97d322` pristine-baseline SHA are `[MEASURED 2026-08-31]` — this repo takes commits from other sessions, so both must be re-confirmed, not assumed, when each phase actually plans.
- **Phase 159 (HARN-01): V121 SHA already recovered and confirmed at milestone scoping** — `MILESTONE_CLOSE_SHAS.V121 = e129081e` (the v1.21 close-gate commit). Re-confirm with the subject-line pair discriminator at plan/execute time rather than trusting this note blindly.

### Pending Todos

None yet for v1.22.

### Blockers/Concerns

No open blockers. v1.21 shipped clean: 58/58 Validated, apex 111/0/0 measured before and after archival, zero archival drift, three-axis re-audit owner-ruled all-green. `origin/master` was 0 ahead / 0 behind with tag `v1.21` present at v1.22 scoping time — re-measure before the v1.22 close rather than assuming it still holds.

**Live watch items carried into v1.22:**

- **`V121-PIN-DEFERRAL` is mandatory at the v1.22 close (Phase 159, HARN-01/02).** Insert `MILESTONE_CLOSE_SHAS.V121 = e129081e` strictly before the `V14` entry in `frozen-at-close.mjs`, never appended — `V-140-V14PIN` regex-asserts `V14` stays the object's last key, and an append fails that apex-chain check. This is the sixth link in an unbroken back-anchor chain (V117 → V118 → V119 → V120 → V121).
- **`C17-FROZEN-AWARE-RESIDUE-V21` is open until Phase 159 lands** — `v1.21-milestone-audit.mjs` is live-HEAD by construction, since no `V121` pin existed until this milestone's close.
- **A one-time measurement is not a guard.** FIX-11 proved `docs/` carried zero `.planning/` references at v1.21 Phase 145; Phase 151 reintroduced two, and nothing noticed because no validator asserts it. HYG-02 fixes the two known leaks and widens the sweep to catch the class (not just the `.planning/` prefix) — but any success criterion that must still hold at close needs a gate, not a checklist tick. VERIFY-06 exists for exactly this reason.
- **9 audit items are structurally un-suppressible** until `DEFER-121-07-A`'s 9 `YYYY-MM-DD` Version-History date placeholders are filled (`docs/_glossary.md`, `docs/_glossary-linux.md`, `docs/ios-lifecycle/00-enrollment-overview.md`, `docs/android-lifecycle/{00,01,02,03}-*.md`, `docs/linux-lifecycle/{00,01}-*.md`) — they surface at every milestone close by design and are **not** in v1.22's own requirement scope (no v1.22 requirement names them); they will carry forward again unless a future milestone adds a requirement for them.
- **Glossary zero-margin hazard remains live.** Re-measure glossary `last_verified` / `review_by` metadata at plan time (HYG-06 adds new terms to these files); never assume the staleness margin held.
- **Two stale provenance citations** at `docs/_standards/EEE-SOP-standard.md:578` and `:649` point at an archived Phase-151 context file. No gate catches them (inline code, not links). Left unedited on purpose at v1.21 close; worth noticing if Phase 157's hygiene pass touches that file, though it is not a named HYG requirement.
- **`e1`, `e2`, `ee`** are stray 2026-08-04 debug-output files at the repo root, noted in PROJECT.md Key Context as housekeeping — delete opportunistically in whichever v1.22 phase first touches the working tree root, not itself a requirement.

## Deferred Items

Items acknowledged and deferred at milestone close, most recent first. Acknowledgment is **verdict-preserving and self-invalidating** — it never rewrites an artifact's own verdict, and the suppression lapses automatically the moment the artifact changes, so a stale acknowledgment can never hide a new problem.

**v1.21 close (2026-08-30) — 26 acknowledged.** Every one is an **archived-milestone carry-forward** (v1.0 through v1.17). **Zero** are in v1.21's own scope: v1.21 shipped 58/58 requirements Validated, 9/9 phases verified, and a milestone audit of `passed`. Full 26-row table archived in `.planning/milestones/v1.21-MILESTONE-AUDIT.md` (mirrors the table that lived here through v1.21's own close).

### Not acknowledgeable — carried forward unsuppressed (9)

Nine open items could **not** be acknowledged by any sanctioned path. All nine are GFM **table rows** in `.planning/milestones/v1.16-phases/121-structural-retrofit-glossaries-lifecycle-end-user-guides/deferred-items.md`, belonging to a single deferral, `DEFER-121-07-A` — unfilled `YYYY-MM-DD` Version-History date placeholders in 9 documents, self-rated **Low / cosmetic** by its own author:

```
docs/_glossary.md                                  docs/android-lifecycle/02-provisioning-methods.md
docs/_glossary-linux.md                            docs/android-lifecycle/03-android-version-matrix.md
docs/ios-lifecycle/00-enrollment-overview.md       docs/linux-lifecycle/00-enrollment-overview.md
docs/android-lifecycle/00-enrollment-overview.md   docs/linux-lifecycle/01-linux-prerequisites.md
docs/android-lifecycle/01-android-prerequisites.md
```

**Why they cannot be acknowledged.** For `deferred_items` the suppression marker is the entry's own `status:` field set to `acknowledged`. That works for heading and bullet entries. It cannot work for table rows: `parseDeferredItemsWithStatus` appends rows from `parseDeferredTableItems` with a hardcoded empty status, so no status a human writes is ever read back. The CLI writer refuses them outright, and its own source comments describe table rows as *"permanently un-acknowledgeable via the CLI writer — a known, deliberate limitation"*.

**Why not fixed instead.** The remediation is trivial — fill `2026-07-07` into 9 Version-History rows — but no v1.22 requirement names this fix, so it is not in scope. It remains a candidate for a future milestone's HYG-class requirement.

**They will resurface at every future milestone close** until either the 9 dates are filled by a scoped requirement or `deferred-items.md` gains a table-row acknowledgment path.

## Session Continuity

Last session: 2026-08-31
Stopped at: v1.22 roadmap created (Phases 154-159, 39/39 requirements mapped, 0 orphaned)
Resume file: None
Next action: `/gsd-plan-phase 154`

## Operator Next Steps

1. **`/gsd-plan-phase 154`** — plan the STYLE Landing phase (merge + protective canon + baseline structural-gate measurement). Re-measure the fork-point drift (`534073f4` → HEAD) and confirm the pristine baseline SHA `c97d322` before planning, per the Plan-Time Research Flags above.

2. **`V121-PIN-DEFERRAL` is MANDATORY at the v1.22 close (Phase 159)** — the sixth link in an unbroken back-anchor chain (V117 → V118 → V119 → V120 → V121). Phase 159 must add to `scripts/validation/_lib/frozen-at-close.mjs`:
   - `MILESTONE_CLOSE_SHAS.V121 = 'e129081e'` — **inserted before the `V14` entry, never appended.**
   - `readAtV121Close` / `lsTreeAtV121Close` exports, following the V18..V120 single-entry pattern.
   - Recover the SHA with the **subject-line pair discriminator** (returns count=1), never the naive dual-token `--grep --all-match` form:
     ```
     git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.21/ && $2 ~ /MILESTONE CLOSE/'
     ```
     Already recovered and confirmed at v1.21's own close: `e129081e`. Re-verify before trusting it.

3. **Also open at this roadmap's creation:**
   - `C17-FROZEN-AWARE-RESIDUE-V21` — `v1.21-milestone-audit.mjs` is live-HEAD by construction, because no `V121` pin exists yet. Resolves when Phase 159 lands.
   - **9 un-acknowledgeable audit items** (see `## Deferred Items` above) — not in v1.22's requirement scope; will resurface at the v1.22 close unless a future milestone scopes their fix.

4. **Durable close-time carve-outs for this repo** (sixth consecutive milestone applying them):
   - **Never `git rm .planning/REQUIREMENTS.md`.** `check-phase-54.mjs` live-reads it outside the frozen-at-close mechanism.
   - **`.planning/ROADMAP.md` is also live-read** by `check-phase-54` (`V-54-21`/`V-54-32`: the off-by-one compliance-policy filename must be absent, and the file must be non-empty). This roadmap was authored with zero occurrences of that filename — verify `check-phase-54.mjs` still passes after any future edit to this file or to ROADMAP.md.
   - **The `milestone.complete` summarizer cannot be trusted at face value.** Two consecutive closes undercounted tasks and scraped deviation-log fragments into MILESTONES.md as accomplishments. Rewrite the entry, the task count, and these Operator Next Steps by hand at the v1.22 close.
