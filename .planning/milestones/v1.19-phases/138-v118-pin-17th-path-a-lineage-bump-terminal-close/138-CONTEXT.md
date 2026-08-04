# Phase 138: V118 Pin + 17th Path-A Lineage Bump + Terminal Close - Context

**Gathered:** 2026-08-03
**Status:** Ready for planning

<domain>
## Phase Boundary

The terminal close of milestone v1.19. Delivers the mandatory V118 back-anchor pin, the 17th Path-A audit-harness lineage bump, and a 3-axis terminal re-audit + single close-gate — the sole deliverable cluster of this phase (mirrors Phase 100/112/119/125/128/134; the harness close NEVER batches with content).

**Delivers (HARN-14 / HARN-15 / HARN-16):**
- `_lib/frozen-at-close.mjs` gains the **V118** entry + `readAtV118Close` export (append-only).
- `v1.19-milestone-audit.mjs` (Path-A from v1.18, C1–C17 inherited) + `v1.19-audit-allowlist.json` + BASELINE_23 + `check-phase-135..138.mjs` (4 new validators; apex `[48..137]`) + `audit-harness-v1.19-integrity.yml` (16th CI coexistence workflow).
- 3-axis terminal re-audit + publish bundle regenerated `--version=v1.19` under the `publish-bundle-gate.cjs` Stop-hook + a SINGLE close-gate commit flipping all 17 v1.19 requirements to Validated + `v1.19-MILESTONE-AUDIT.md` + `v1.19-DEFERRED-CLEANUP.md`.

**Explicitly NOT delivered:** the V119 pin (back-anchor circularity — the successor milestone's job, recorded as `V119-PIN-DEFERRAL`); any content or tooling-debt work; any fix to the standalone-RED predecessors or to `check-phase-30/31`; any edit to a frozen predecessor surface.

**Blocking precondition: DISCHARGED.** PIPE-02 landed 2026-08-03 as a plain fast-forward (`237158c5..042d6559`, 257 commits, plus the `v1.18` annotated tag). Verified live at context time: `origin/master == master`, 0 ahead. V118 SHA and V117 SHA are both reachable on `origin/master`; no rebase/squash/force was used.

**Method note:** all rulings below were produced by `/grill-me` (24 questions across 4 areas, codebase-grounded with 16 live measurements) then `/adversarial-review` (3 parallel Finders → Adversary → Referee). 66 findings raised, 8 disproved, 58 confirmed. **9 of the 24 candidate rulings were overturned**, including two whose load-bearing premise was factually false. Several "measured facts" were themselves corrected by the review — those corrections are recorded in `<specifics>`.

</domain>

<decisions>
## Implementation Decisions

### Area A — Axis-2 execution mechanics (HARN-16)

- **D-01: Axis-2 runs IN-PHASE via owner-executed push-to-master + explicit `workflow_dispatch`. OWNER-RULED 2026-08-03.** Phase 138 halts at a named plan checkpoint; the owner runs `git push origin master`, then `gh workflow run audit-harness-v1.19-integrity.yml --ref master`; the phase resumes and captures the live authoritative run BEFORE authoring the close-gate.
  **The candidate ruling (v1.17 branch+PR) is STRUCK, and so is its premise.** "A direct master push produces no Axis-2 evidence" is FALSE: `workflow_dispatch` requires the workflow file on the DEFAULT BRANCH, so pushing master is the *precondition* for dispatch, not a dead end. The dominant precedent is neither v1.17 nor v1.18 — `v1.7-MILESTONE-AUDIT.md:176`, `v1.8:164`, `v1.9:174`, `v1.10:166`, `v1.11:168`, `v1.12:165`, `v1.13:186`, `v1.14:260` all record `Event: workflow_dispatch (gh workflow run … --ref master)`, **each for a then-brand-new workflow**; `93-03-PLAN.md:77` and `95-03-PLAN.md:83` make it the canonical Axis-2 step. This repo executed exactly that on 2026-08-04 → run `30872644813`, 12/12.
  — **Reversibility:** one-way once the push lands — pushing is outward-facing and fires the cascade; there is no un-push. This is why it is an owner checkpoint, not an autonomous step.

- **D-02: The owner executes both commands.** `v1.18-MILESTONE-AUDIT.md:254` forbids `git push` and firing Actions from within an unattended execution run — authorization alone does not move the executor across that boundary. Hard stop at the checkpoint; the plan must not proceed past it autonomously.

- **D-03: Post-push assertions, in order, before dispatch.** (i) `git rev-parse origin/master` == `HEAD` and 0-ahead; (ii) the new workflow appears in `gh workflow list` **and is not disabled** — GitHub auto-disables schedule-bearing workflows after 60 days of repository inactivity, and this remote sat 257 commits stale; a disabled workflow refuses `workflow_dispatch` and reads as *missing evidence*, not as red. **Under dispatch the `paths:` filter is irrelevant** — the candidate's "paths filter might not match" failure mode is struck as near-impossible and replaced by the disabled-workflow mode.

- **D-04: ONE SHA for all three axes — `origin/master` HEAD at dispatch time (the pre-close-gate atom tip). The v1.17 precedent is DEFECTIVE, not exemplary.** `v1.17-MILESTONE-AUDIT.md:22` records `gha_authoritative_sha: 5da45802` while `:99/:151/:250/:267` record Axis-1's fresh clone at `4e89d68c` — verified ancestor-but-different — yet `:25` asserts `cross_os_exact_match: true`. Follow `v1.16:244` and `v1.18:240`, which both assert a single shared SHA. Dispatch also dissolves the `refs/pull/N/merge` hazard (a PR checkout validates a synthetic merge tree, not a named commit).
  — **Reversibility:** costly — a re-run at a different SHA invalidates the exact-match table and forces Axis-1/Axis-3 re-runs (see D-06).

- **D-05: The exact-match table records PASS/FAIL/SKIP TRIPLES, and the expected apex result carries ≥1 SKIP.** `V-138-AUDIT` SKIP-passes until `138-VERIFICATION.md` exists (v1.17 was 82/0/1; v1.18 88/0/1). A PASS-only match is not the HARN-16 contract — the requirement says PASS/FAIL/**SKIP** exact match.

- **D-06: Rule the Axis-2-comes-back-RED path, not just the owner-declines path.** Precedent `v1.14-MILESTONE-AUDIT.md:227-231`: first run RED → executor HALTED → fresh re-run GREEN at a NEW headSha. Under D-04's single-SHA rule that forces Axis-1 and Axis-3 re-runs. **Budget: exactly ONE remediation round** (the v1.16 Plan 125-05 shape); a second means the close does not land this phase. Note the irreversibility: once pushed, "fall back to the v1.18 deferral shape" is no longer available.

- **D-07: If Axis-2 is not captured for any reason, ROADMAP SC3 is recorded UNMET — never "satisfied by fallback."** Making Axis-1 advisory (D-09) + Axis-3 corroborating (D-11) + Axis-2 deferred simultaneously disclaims all three authoritative legs (`134-CONTEXT.md:26`: *"Linux GHA … + a zero-context subagent carry the authoritative verdict"*). That exact combination is how v1.18 shipped and is what turned the V118 pin into a milestone-long blocker. A named `V119-AXIS2-DEFERRAL` entry stating the successor-blocking cost is mandatory in that branch.

- **D-08: GA-4 cascade — re-rule, criteria-gated, freshly enumerated, with three corrections.**
  (i) **The paths-filtered PR cascade would be 14, not 16** (`v1.5` and `v1.6` filters match nothing in a harness-only atom; base + v1.7..v1.18 + new v1.19 = 14). Under dispatch you *choose* the set — enumerate and dispatch all **16** by name. Never trust a carried count.
  (ii) **The inherited baseline is 5 PASS / 10 FAIL, not 7/10.** `STATE.md:346`'s own enumeration is GREEN = v1.14..v1.18 (5), RED = base + v1.5..v1.13 (10); 5+10 = 15 = `ls .github/workflows/*.yml`. Fix the arithmetic before it is carried into `v1.19-MILESTONE-AUDIT.md`.
  (iii) **LOAD-BEARING, previously unstated:** `audit-harness-v1.18-integrity.yml:172` carries the **only** standalone `check-phase-134` job — that is how HARN-16's "authoritative for **BOTH** chain validators" is actually satisfied for the predecessor apex. Therefore **the v1.18 run must be GREEN and is NOT eligible for `ACCEPTED-STANDALONE-CI-RED`** (it was 12/12 on 2026-08-04). **Do NOT add a `check-phase-134` job to the v1.19 workflow.**
  Retain the three ACCEPTED-STANDALONE-CI-RED criteria and the `gh run view --json jobs` machine-verification rule; confirm apex-138 passed on Axis-2 BEFORE invoking any fallback.

- **D-09: Restate the inherited DUAL-APEX contract verbatim in the v1.19 workflow header** (`audit-harness-v1.18-integrity.yml:11-14`): the standalone apex job AND `linux-chain-ubuntu-latest` both run the full recursion — *do NOT deduplicate, and do NOT add `CHECK_PHASE_NESTED=1` to either top-level GHA invocation.*

### Area B — Windows deep-nest axis and cross-axis independence

- **D-10: Axis-1 (Windows fresh clone) stays ADVISORY — re-affirming Phase 134 GA-1 D-01 — but one ground is STRUCK and the record is corrected.** Two clean cycles do not retire a known platform timeout, and promoting it makes a flaky win32 property a hard close-blocker against the D-03 OS split.
  **STRUCK ground:** "it would force a timeout edit colliding with the byte-unchanged invariant" — as *stated* that conflates two budgets. It survives only in its narrow form: the per-subprocess budgets at `check-phase-134.mjs:141-142` sit inside the v1.19 byte-unchanged gate (D-17) and must not be edited. The GHA `timeout-minutes` in the NEW workflow is a free authoring choice.
  **CORRECTION OF RECORD:** stop calling it "two clean cycles." `v1.15-MILESTONE-AUDIT.md:221` records *"apex NOT run on Windows (cascade per D-119-2)"*, and v1.16 likewise. Honest history: **not-run at v1.15/v1.16, clean at v1.17/v1.18**. Write "not-run ≠ clean" into the entry.

- **D-11: Axis-3 is corroborating-only, FULL STOP — the "explicitly redundant when Axis-2 lands" clause is DELETED.** HARN-16 (`REQUIREMENTS.md:42`) and ROADMAP SC3 both **name** "fresh zero-context reproduction" as a required leg; declaring a mandated axis redundant un-meets a written success criterion by fiat. **Axis-3 runs regardless of Axis-2's outcome** — corroborating in *weight*, mandatory in *execution*. A same-host subagent inherits the win32 timeout and is not host-independent; say so plainly rather than inflating it.

- **D-12: Axis-3 attempts the FULL non-nested apex first; the shallow form is a labelled fallback, not a default.** If the shallow `CHECK_PHASE_NESTED=1` form is used it must be entered in the table as **shape-match, NOT count-match**, and SC3's exact-match claim scoped to the non-shallow axes — because that shallow form IS GA-1's rejected Option C (`134-CONTEXT.md:31`: *"a shallow run changes what is validated → vacuous 'exact match'"*). Cite and rebut the rejection; never adopt it silently.

- **D-13: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 carries as corroboration, never resolution — depth label `[48..137]`.** `[48..138]` would mean the apex chains itself, the exact self-reference `V-138-SELF` must hard-fail on. No re-scope-or-close: `v1.18-DEFERRED-CLEANUP.md:110` already separates this item's **cold-clone** cost curve from the within-apex curve that the v1.14 112-06 NESTED-guard remediation collapsed (160s → 2s); the apex still performs ~90 cold Node spawns from a fresh clone.

- **D-14: Timeout priorities are INVERTED from the candidate.** `timeout-minutes: 30` is a phantom risk — the Linux chain has run at ~2s since v1.14 on an O(n) property (`v1.14-MILESTONE-AUDIT.md:231,252`). Copy 30 forward verbatim; spend no plan step on it. The budget that matters is the **600s peer / 300s per-subprocess** timeout, the sole coupling point with WINDOWS-CLONE-DEEPNEST-TIMEOUT-01, and in a brand-new `check-phase-138.mjs` at 90 entries it IS a free authoring choice.
  **MANDATORY:** set an explicit **`maxBuffer`** on the new apex's `execFileSync`. `check-phase-134.mjs:141-150` uses `stdio:'pipe'` with none → Node's 1 MiB default kills a chatty child into `catch` as a FAIL, which a hand sweep can never reproduce. This is the concrete mechanism that breaks "nested-green ⟹ apex-green."

### Area C — Predecessor chain gate, standalone-RED, frozen surfaces

- **D-15: The HARN-15 gate is FOUR parts, and part (ii) must be NON-NESTED. The candidate's nested-sweep gate is REPLACED.**
  Why the candidate fails: `check-phase-134.mjs:143` spawns children with the *identical* env and cwd a manual top-level nested sweep uses, so the sweep is **redundant with** the apex, not corroborating. And running the apex itself under `CHECK_PHASE_NESTED=1` hits `:134-136` and `:172-174` — all 86 chain checks plus the harness check SKIP, validating nothing. Worse, the only branch where live-HEAD drift surfaces is the NON-nested one (`check-phase-60.mjs:257-261`, `check-phase-61.mjs:364-365/385-386`) — precisely the detect-and-convert purpose `.planning/milestones/v1.16-REQUIREMENTS.md:67` gave `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`. The candidate gate skips that branch and then pre-declares the residue non-blocking, reducing HARN-15 to a checkbox.
  **The gate:**
  1. apex-138 green **non-nested** standalone, run with **no competing local load** (a concurrent sweep flaked `CHAIN-99` once);
  2. a **non-nested** run of the drift-bearing band, RED set enumerated **by name with root cause classified**;
  3. an explicit statement that a full non-nested sweep of all 90 is **exponential** — measured doubling 5/10/19/37/75/148/~300s across 60..66, because 9 validators in that band do not propagate `CHECK_PHASE_NESTED` to their children — and is NOT being attempted;
  4. a **POST-close-gate confirmatory apex run**.
  **Part 4 is not optional:** `check-phase-54.mjs:30-31` reads LIVE `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md` with a negative assertion at `:344-355` / `:568-586`, and the close-gate rewrites both. A pre-gate green proves nothing about post-gate state.
  **NEVER write "0 FAIL across the non-nested chain"** (`STATE.md:343`; and see D-24 — that claim was already false at v1.18).

- **D-16: Standalone-RED is NOT a close blocker — but the SET and the CAUSES in the candidate were wrong by an order of magnitude.** Direction survives (apex is the contract surface, it nests by design, never edit a frozen validator to silence it — D-00a). The `ACCEPTED-SCOPED-RED` entry must enumerate **ten** standalone-RED validators — **30, 31, 48, 60, 61, 62, 63, 64, 65, 66** — and **four** root-cause classes:
  (a) `regenerate-supervision-pins.mjs --self-test` classifier-vs-frozen-Phase-43-fixture at `docs/_glossary-android.md:145` — this **IS** DEFER-119-A, one defect (see D-27);
  (b) v1.5-harness C5 freshness `90d > 60d` on the same file — formally superseded by Phase 112's 90d lock;
  (c) **cascading chain-guards** — 48 red → 60 red → 61 red → 62..66 inherit. The class the candidate never named;
  (d) pre-chain content drift in 30/31.
  check-phase-61's four FAILs are **V-61-21** (48 red), **V-61-32** (60 red), **V-61-33** (C5 freshness), **V-61-34** (self-test) — the candidate named only the last two.
  **MANDATORY:** state explicitly that fixing (a)+(b) would **NOT** green the set, or a successor picks the deferral up as a two-line fix and fails.

- **D-17: `check-phase-30/31` are deferred, not fixed — booked RE-SURFACED, not NEW, with all five failures listed and a preservation constraint.**
  - **RE-SURFACED:** `v1.16-MILESTONE-AUDIT.md:214` already root-caused `check-phase-30/51/92/99` as Phase-122 Mermaid-conversion drift at v1.16. The defect worth naming is that it was **never logged to any DEFERRED-CLEANUP**.
  - The Mermaid hypothesis covers **1 of 5** failing assertions. List all five: 30 fails the diamond count **and** the `l1-template.md` `"Windows | macOS | iOS | all"` literal; 31 fails **V-31-23** (`06-compliance-policy.md` line 182 vs `expected-d23.txt`), **V-31-25** (L2 template iOS enum), **V-31-29** (runbook line counts ±15%). Four are unverified.
  - **PRESERVATION CONSTRAINT:** `check-phase-68.mjs:100` and `:170-174` pin `check-phase-31.mjs` as a frozen call-site (must import `archive-path`, must carry the `_missing` discriminator marker), and check-phase-68 IS in the chain. Whoever fixes 31 preserves both markers or takes the apex red.
  - Drop the "no `Result:` line / exits before summary" premise — both emit `Summary:` and exit 1. Fixing content drift inside a harness-close phase would violate HARNESS-PHASE.

- **D-18: The byte-unchanged HARD gate is independently derived at 47 surfaces — AND the derivation is INCOMPLETE as stated.** 16 milestone-audit `.mjs` + 16 sidecar JSON + 15 integrity workflows + `check-phase-48..134.mjs`. Do NOT copy v1.18's 44.
  **The omission:** the gate names no **shared mutable dependency** of the frozen validators — `c17-eee-contract.mjs` (8 importers, including the v1.15/v1.16/v1.17/v1.18 milestone-audit harnesses), `_lib/archive-path.mjs` (23), `_lib/exec-fail-detail.mjs` (31), `_lib/frozen-at-close.mjs` (25). A one-line edit to `c17-eee-contract.mjs` silently changes four "byte-unchanged" frozen harnesses while the 47-surface diff reports CLEAN — and Phase 137 just moved C17 from 232 to 234 files.
  **GUARDRAILS:** `_lib/frozen-at-close.mjs` is **append-only** (the V118 entry + `readAtV118Close`, nothing else). `c17-eee-contract.mjs`, `_lib/archive-path.mjs`, `_lib/exec-fail-detail.mjs` are **byte-frozen for the duration of Phase 138**, no carve-out. Name the anchor command explicitly — `git diff <WAVE0_ANCHOR>..HEAD` with the anchor captured and recorded in `138-01-SUMMARY.md` before any Phase-138 edit (v1.18 used `18fd8b63`, recorded in `134-01-SUMMARY.md`). `scripts/pipeline/` stays OUT, but restate it as a **v1.19 ruling**, not an inherited fact: the only citation is inside commit `6acc429b`'s own message, and `v1.18-MILESTONE-AUDIT.md:294`'s 44-surface enumeration is silent on it.
  — **Reversibility:** one-way — a frozen-surface edit breaks `predecessor_byte_unchanged: CLEAN` for the whole v1.19 close and requires a scoped CARVE in the milestone audit.

- **D-19: Phase 138 owns the archival-drift PRE-scan, with the fail-loud half of the guardrail RESTORED and the scan WIDENED.**
  - **Restore what apex-134 dropped.** `134-CONTEXT.md:38` mandated verbatim: *"A wrong guess → `resolveArchivedPhasePath` returns null → graceful-skip returns `pass:true` → **silent false-green**. Make resolver-null **fail-loud**, not skip-pass."* What shipped at `check-phase-134.mjs:115` is `return { pass: true, skipped: true }`, and `archive-path.mjs:29` returns null without throwing. The candidate restated the TOKEN half and dropped the FAIL-LOUD half. **Resolution:** SKIP-pass IS legitimate pre-gate, so keep it — and close the hole in the post-close-gate confirmatory run (D-15 part 4), which must assert **`V-138-AUDIT` is PASS, not SKIP**. A wrong `['v1.19-phases']` token then fails loudly exactly once, where it matters.
  - **Widen beyond `.planning/phases/`.** `check-phase-54.mjs:30-31` reads live `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md` — the ROADMAP-collapse / REQUIREMENTS-overwrite class `/gsd-complete-milestone` performs. The candidate's enumeration instruction would have missed it entirely. (`check-phase-61` and `check-phase-70` read the same docs but frozen-aware, so they are safe.)
  - Keep the zero-`.planning/phases/`-reads rule for the new leaves 135..137 (v1.18's successful sidestep, verified: 129..133 contain no such reads), and record the **second sanctioned option** — `check-phase-124.mjs:46` keeps a hardcoded phases path and survives archival because `:97` reads it via `readAtV116Close`.
  - The apex uses the objectively correct token `['v1.19-phases']` — never the predecessor-copied wrong token that 119/125/128 carry frozen.

- **D-20: The allowlist dichotomy is FALSE and the candidate's proof instrument is WRONG; only the conclusion survives.**
  - Byte-verbatim is **impossible**: `diff v1.17-audit-allowlist.json v1.18-audit-allowlist.json` = the `generated` and `phase` header fields only.
  - `regenerate-supervision-pins.mjs --report` **cannot prove anything about v1.19**: `:290` inside `doReport()` hardcodes `parseAllowlist('scripts/validation/v1.7-audit-allowlist.json')` (also `:336`, `:530`; the comment says v1.6 while the code reads v1.7, and the lineage repoint promised at `:415` never advanced). It walks only `supervision_exemptions` = **26 of 59** line-pins, missing `safetynet_exemptions` (4), `c7_knox_allowlist` (10), `c9_exemptions` (4), `c13_broken_link_allowlist` (15).
  - **REPLACEMENT INSTRUMENT (~2s, covers all 59):** derive the pinned file set from the v1.18 sidecar, then `git diff --name-only 7af8a147..HEAD -- docs scripts .github`. Verified at context time: changed = `RE-index.md`, `EEE-SOP-standard.md`, `index.md`, `recipes/03-*`, `recipes/04-*`, `scripts/pipeline/{build-filename-map.mjs,build-publish-bundle.mjs,filename-map.md}` → **pinned files changed: ZERO.**
  - **v1.19 action list — enumerate it, do not leave it implicit:** (a) copy the sidecar, update `generated` + `phase` only; (b) append the BASELINE_23 comment block following BASELINE_22's shape at `regenerate-supervision-pins.mjs:503-514`; (c) point `v1.19-milestone-audit.mjs`'s sidecar `readFile(...)` at `v1.19-audit-allowlist.json`.
  - **CORRECTION OF RECORD:** `v1.18-milestone-audit.mjs:4`'s claim that zero pin drift was *"positively confirmed via `regenerate-supervision-pins.mjs --report`"* could not have proven what it claims. Do not carry that premise forward.

### Area D — `v1.19-DEFERRED-CLEANUP.md`

- **D-21: The DOCUMENT is strictly log-only; the PHASE is not.** The close-gate necessarily rewrites PROJECT/ROADMAP/STATE/REQUIREMENTS to flip 17 requirements. Say which is which — the candidate conflated them.
  **GUARDRAIL:** the six `.planning` sites of the `c17-eee-contract.mjs:150` → `:158` coordinate correction (`135-CONTEXT.md:48,:204,:287`; `135-01-SUMMARY.md:113`; `135-02-SUMMARY.md:196`; `135-PATTERNS.md:312`) are historical artifacts and are **NOT edited**; the correction rides as an **append to the existing fence-mask entry**, per `136-01-SUMMARY.md:203`'s explicit mandate.

- **D-22: `v1.19-DEFERRED-CLEANUP.md` lives at `.planning/milestones/v1.19-DEFERRED-CLEANUP.md`.** `136-01-PLAN.md:188` guards two *other* candidate locations (`.planning/` and repo root); the v1.18 workflow's `paths:` pins the milestones path explicitly.

- **D-23: The new `audit-harness-v1.19-integrity.yml` path filter MUST list `.planning/milestones/v1.19-DEFERRED-CLEANUP.md`** (and `v1.19-MILESTONE-AUDIT.md`, and `.planning/REQUIREMENTS.md`), mirroring the `paths:` block in v1.18's workflow. Omitting it silently narrows the trigger surface.

- **D-24: DEFER-119-A carries forward UNCHANGED — not re-opened, not new. The candidate's correction-of-record was aimed at the wrong claim and is REDIRECTED.**
  Three things were wrong with the premise. (1) `v1.18-DEFERRED-CLEANUP.md:125-129` **never closed the item** — the heading says "AUTO-RESOLVED per TOOL-04" but the body says *"remains ACCEPTED-ADVISORY"*, *"advisory-RED-capable"*, and closes *"**Status:** ACCEPTED advisory-RED-capable condition. CARRIED from v1.17/v1.16/v1.15/v1.14. **Not a blocker.**"* A red self-test does not contradict it. (2) The complete inputs to `androidDocPaths()` (`regenerate-supervision-pins.mjs:107-124`) plus the helper and the frozen fixture are **byte-identical across `7af8a147..HEAD`** — so `--self-test` was exit 1 at the v1.18 close too. Not a HEAD-only condition, **not a v1.19 regression**; a "re-open" framing would imply a regression that provably did not occur. (3) The one genuinely false clause is the parenthetical *"no acute instance exists at this close"* (`:129`) — an acute instance did exist and still does, at `docs/_glossary-android.md:145`.
  Also STRUCK: "do NOT edit the frozen v1.18 doc" — `git log -- .planning/milestones/v1.18-DEFERRED-CLEANUP.md` returns **two** commits, `7af8a147` and `6acc429b` (a post-close append, now at `:17`); `137-CONTEXT.md:163` cites `6acc429b` by name. Phase 138 may still decline to amend, but not on a false premise.
  **THE CORRECTION SLOT GOES HERE INSTEAD — the larger, load-bearing false premise:** `v1.18-DEFERRED-CLEANUP.md:123` claims the *"complete non-nested `[48..133]` chain"* found **"0 FAIL"**. `check-phase-134.mjs:143` unconditionally sets `CHECK_PHASE_NESTED:'1'` on every child spawn, so the apex **structurally cannot** produce a non-nested chain result; and 48/60/61/62/63/64/65/66 all exit 1 standalone on inputs unchanged since `7af8a147`. `STATE.md:343` already warns against inheriting the phrasing. Record the correction; do not carry the claim.

- **D-25: The entry list — six mandatory additions to the candidate.**
  1. **RESTORE the Deployment/Infra trio to CARRIED** — `v1.18-DEFERRED-CLEANUP.md:71` SharePoint Content-Approval, `:83` Azure AI Search Structured Index, `:93` Graph-API Auto-Upload. Re-carried at v1.17 AND v1.18, re-stated at `REQUIREMENTS.md:73`. Dropping open items is exactly the masking-via-deletion the Part B/C header bars.
  2. **ADD all four `136-01-SUMMARY.md:201-207` entries — BINDING.** `136-01-SUMMARY.md:199`: *"Phase 138/HARN-16 creates the file and **transcribes these four entries verbatim**"*, repeated as a traceability row at `136-01-PLAN.md:242`. The four: Option B shared kiosk/dedicated taxonomy Reference doc; the past-due `review_by: 2026-06-22` on `docs/admin-setup-android/05-dedicated-devices.md`; the `:150`→`:158` six-site correction **appended to the existing fence-mask entry**; the `## Rollback/Recovery` divergence count **2-of-4**.
  3. **ADD `135-01-SUMMARY.md:113`'s FIRST candidate** — the HYG-05 "retrieve poorly" unfalsified-extrapolation entry. That line names *two*; the candidate booked only the second, while citing the same line as its carrier-convention precedent.
  4. **ADD a DROPPED-and-recorded-Closed section** — structurally mandatory at both prior closes (`v1.18-DEFERRED-CLEANUP.md:15`; v1.17 footer `:162`). **`V118-PIN-DEFERRAL` closes at v1.19 via HARN-14** and must be dropped from the carried list with a Closed record in `v1.19-MILESTONE-AUDIT.md`.
  5. **ACCEPTED-STANDALONE-CI-RED must DISCHARGE before it extends.** The v1.18 entry's status is *"disposition PENDING owner push, not pre-assumed"* (`:113`). Discharge it with the 2026-08-04 evidence (corrected to **5 PASS / 10 FAIL**), then extend the span to v1.4–v1.18.
  6. **CARVE-2 is correctly DROPPED** — closed at v1.18, and `v1.18-DEFERRED-CLEANUP.md:7` scopes the do-not-mask doctrine to **open** items only. Add a one-line "Closed at v1.18, not re-carried" note so the departure from GA-3's Option-B reasoning reads as deliberate.
  **Also:** NEW = `V119-PIN-DEFERRAL`, `PRE-CHAIN-VALIDATOR-RED-30/31` (re-surfaced per D-17), `ACCEPTED-SCOPED-RED` (D-16), `RECIPE-OUTBOUND-LINK-COVERAGE` (137 D-17 — 42 `../` links across recipes 03/04 covered by no tool), `V-132-HUBSNOTWIRED-REGEX-BROKEN` (137 D-04), `HUB-WIRING-NON-BARRED-SURFACE` (137 D-06), `C17-VS-PIPELINE-FENCE-MASK-DIVERGENCE`, the CI-3 scope correction, and the D-24 correction of record. CARRIED = CARVE-1, WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (`[48..137]`), LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01 (with the D-24 correction), DEFER-119-A (unchanged), RCPFUT-01..05, ANDROID-APPDEPLOY-01, MTPSSO-01/02/03 + PSSO-FUT-03, KRBFUT-01/02, CI-3, AOSP-wired 802.1X + Cloud PKI, all v1.8 Part-C items. Inherit `## Cross-References` (`:166`) and the provenance footer (`:177`) — the footer is where v1.17/v1.18 recorded the double-book cross-check D-27 depends on.
  **GUARDRAIL:** pin the CI-3 derivation command **with `--include=*.md`**. Without it the count is 58/18 (an untracked `docs/graphify-out/` JSON) and a successor reads the corrected 57/17 as stale again.

- **D-26: The 137 D-06 hub entry is copied verbatim AND carries a scope line.** The drafted sentence at `137-02-SUMMARY.md:197` is about future runbook routing, while the ID `HUB-WIRING-NON-BARRED-SURFACE` is named for the two surfaces at `137-CONTEXT.md:211` — `docs/l1-runbooks/00-index.md` and `docs/decision-trees/`. Copy the sentence verbatim **and** carry those two surfaces as the entry's scope line, or the item loses the thing it is named for.

- **D-27: The double-booking guard runs at ROOT-CAUSE level, not ID level.** Exact-ID matching against an exclusion list of already-frozen predecessor deferrals is right in form and **cannot catch the double-book the candidate actually committed**: `ACCEPTED-SCOPED-RED` (whose content includes "the self-test") and `DEFER-119-A` are **one defect** — `V-61-34` *is* `regenerate-supervision-pins.mjs --self-test`, failing at the same `docs/_glossary-android.md:145`. An exact-ID matcher sees two IDs and passes. `134-CONTEXT.md:53` governs this precise question verbatim: *"DEFER-119-A re-listing is **optional** … **Include only if it does not reintroduce double-booking.**"*
  **RULING: DEFER-119-A is the SOLE OWNER of the self-test defect.** `ACCEPTED-SCOPED-RED` cross-references it and does not restate it. Record the guard's result in the provenance footer per v1.17/v1.18 convention.

- **D-28: The CI-3 scope correction is a DEFERRED-CLEANUP text correction only** — zero corpus edits; `REQUIREMENTS.md` already carries **57 occurrences / 17 files**. Label "+27%" as **occurrences-only** (files 16→17 is +6%).

### Cross-cutting guardrails

- **D-29: Two `check-phase-138.mjs` numbers, independently derived, both load-bearing at module load.** `CHAIN_PHASES` = **90 entries** `[48..137]`; total checks = **93** (90 CHAIN + AUDIT + AUDIT-HARNESS + SELF), against apex-134's 86 / 89. Do NOT copy Phase 134's array forward. `check-phase-134.mjs:93-97`'s bound asserts **throw at import** — an un-updated copy crashes with no summary line. Keep the dedup guard (`new Set(CHAIN_PHASES).size !== length`), the length/termini throws, `CHAIN_SKIP = new Set([])`, and the `V-138-SELF` dual-invariant.

- **D-30: Three latent apex hazards get FIXED in the new file, not inherited.** (i) no `maxBuffer` on `execFileSync` → 1 MiB default silently converts a chatty child into a FAIL (D-14); (ii) the `isMissing` heuristic at `:155-157` (`stderr.includes('not found') || 'Could not resolve'`) converts module-load throws into **green skips**; (iii) `:138-140` graceful-skips a non-existent chain child, so the apex structurally cannot detect a **deleted** predecessor validator.

- **D-31: Correction of record for the v1.18 audit's push semantics.** `v1.18-MILESTONE-AUDIT.md:258` (push *"fires the `audit-harness-v1.18-integrity.yml` cascade"*) and `:290` (*"the cascade only fires on push"*) are **both false** — no workflow in `.github/workflows/` has a `push:` trigger. D-01/D-02 depend on getting this right; log it.

- **D-32: Note the `check-phase-30/31` protection asymmetry.** They sit outside every `CHAIN_PHASES` array AND outside the byte-unchanged gate, yet every integrity workflow's `paths:` globs `scripts/validation/check-phase-*.mjs` — so touching them fires all 16 workflows while no gate protects their content. Their only real protection is `check-phase-68`'s frozen call-site pin (D-17).

### Claude's Discretion

- Internal structure of the 4 new `check-phase-135..138.mjs` validators within the invariants above (each follows the check-phase-134 template: AUDIT + CHAIN + AUDIT-HARNESS + SELF, NESTED-aware). The `check-phase-137.mjs` needle is NOT discretionary — it is fully specified by 137 D-19/D-20 and `137-02-SUMMARY.md`'s measured actuals.
- Exact `v1.19-audit-allowlist.json` header values and the BASELINE_23 comment wording, within D-20's three-item action list.
- Plan decomposition and commit-message subjects (following the `docs(138-NN):` / `feat(138-NN):` convention).
- Section ordering within `v1.19-MILESTONE-AUDIT.md`, inheriting the v1.18 shape.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` — HARN-14 (`:40`), HARN-15 (`:41`), HARN-16 (`:42`); "Blocking Precondition" (`:44`, now DISCHARGED); "Carried backlog" (`:73`) for the Deployment/Infra trio and CI-3's corrected 57/17.
- `.planning/ROADMAP.md` §"Phase 138" — SC1–SC4. **SC3 is the cross-OS exact-match criterion governed by D-04/D-05/D-07.**
- `.planning/STATE.md` — `:28-36` (PIPE-02 discharge + the verified V118 recovery method); `:342-349` (Phase-138 plan-time research flags, incl. the "do NOT inherit v1.18's non-nested 0-FAIL phrasing" warning at `:343` and the check-phase-137 needle-spec handoff at `:349`).

### The exact analogue — read before planning
- `.planning/milestones/v1.18-phases/134-v117-pin-16th-path-a-lineage-bump-terminal-close/134-CONTEXT.md` — GA-1..GA-4. **`:26`** (both-authoritative-legs statement, governs D-07), **`:31`** (rejected Option C, governs D-12), **`:38` and `:84`** (the fail-loud resolver guardrail apex-134 did not honour, governs D-19), **`:53`** (the DEFER-119-A double-booking clause, governs D-27).
- `.planning/milestones/v1.18-MILESTONE-AUDIT.md` — `:254-256` (owner-executes-push boundary, D-02); `:258` and `:290` (both FALSE, D-31); `:294` (44-surface gate scoping, D-18); `:240` (single-shared-SHA precedent, D-04).
- `.planning/milestones/v1.17-MILESTONE-AUDIT.md` — `:22` vs `:99/:151/:250/:267` (the cross-SHA defect, D-04); `:25` (the unsupported `cross_os_exact_match: true`).
- `.planning/milestones/v1.16-MILESTONE-AUDIT.md` — `:214` (check-phase-30/51/92/99 already root-caused, D-17); `:244` (single-shared-SHA precedent).
- `.planning/milestones/v1.15-MILESTONE-AUDIT.md` — `:221` ("apex NOT run on Windows", D-10); `:243` (D-119-2 and "both chain validators").
- `.planning/milestones/v1.14-MILESTONE-AUDIT.md` — `:227-231` (Axis-2 RED → HALT → re-run at new headSha, D-06); `:231,:252` (160s → 2s Linux chain collapse, D-14).
- `.planning/milestones/v1.16-REQUIREMENTS.md` `:67` — the ORIGINAL text of `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01` ("so every drift is caught and converted frozen-aware"). Governs D-15.
- Axis-2 dispatch precedent: `v1.7-MILESTONE-AUDIT.md:176`, `v1.8:164`, `v1.9:174`, `v1.10:166`, `v1.11:168`, `v1.12:165`, `v1.13:186`, `v1.14:260`; plan-level at `93-03-PLAN.md:77` and `95-03-PLAN.md:83`. Governs D-01.

### Deferred-cleanup lineage
- `.planning/milestones/v1.18-DEFERRED-CLEANUP.md` — `:7` (drop-when-closed doctrine, D-25.6); `:9` (working-tree cruft already scoped out — do not re-litigate); `:15` (the DROPPED-and-Closed section, D-25.4); `:57` (CARVE-2 CLOSED); `:71/:83/:93` (the Deployment/Infra trio, D-25.1); `:110` (cold-clone vs within-apex separation, D-13); `:113` (ACCEPTED-STANDALONE-CI-RED pending status, D-25.5); `:123` (**the false "0 FAIL" claim**, D-24); `:125-129` (DEFER-119-A in full, D-24); `:166` Cross-References; `:177` provenance footer.
- `.planning/milestones/v1.17-DEFERRED-CLEANUP.md` `:162` — the prior DROPPED-and-Closed precedent.

### Upstream handoffs that BIND this phase
- `.planning/phases/136-recipe-4-android-dedicated-mhs-multi-app/136-01-SUMMARY.md` `:199` and `:201-207` — **the binding verbatim-transcription mandate for four entries** (D-25.2); `136-01-PLAN.md:242` (traceability row); `136-01-PLAN.md:188` (the path guard, D-22).
- `.planning/phases/135-recipe-3-windows-11-multi-app-kiosk/135-01-SUMMARY.md` `:113` — **two** deferred-cleanup candidates, not one (D-25.3); also the carrier convention.
- `.planning/phases/137-integration-navigation-last-close/137-CONTEXT.md` — D-04 (`:46`, the broken hub regex), D-06 (`:50`, `:211`, the two non-barred surfaces), D-17 (`:90`, the uncovered outbound links), D-18..D-22 (`:94-107`, the check-phase-137 needle-spec).
- `.planning/phases/137-integration-navigation-last-close/137-02-SUMMARY.md` — the "Needle-spec handoff" measured actuals (`check-phase-132.mjs:5` establishes that needles derive from the VERIFICATION/SUMMARY measured actuals, never from CONTEXT); `:197` (the verbatim hub sentence, D-26).

### Harness surfaces this phase edits or extends
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (V117 `b56bba5` present at `:76`; V118 slot next) + `readAtClose()` + convenience exports. **APPEND-ONLY** (D-18).
- `scripts/validation/check-phase-134.mjs` — the prior apex and the copy-forward template. `:75-79` chain array; `:87-98` dedup + bound throws; `:110-120` the resolver/SKIP-PASS shape (D-19); `:134-136`/`:172-174` NESTED guards; `:141-150` timeouts + the missing `maxBuffer` (D-14/D-30); `:155-157` the `isMissing` heuristic (D-30); `:189-206` `V-134-SELF`.
- `scripts/validation/_lib/archive-path.mjs` — `resolveArchivedPhasePath`; `:29` returns null without throwing ("CALLER OWNS FAIL SEMANTICS"). **BYTE-FROZEN this phase** (D-18).
- `scripts/validation/v1.18-milestone-audit.mjs` — the 16th harness, Path-A template. `:4` carries the false `--report` confirmation claim (D-20).
- `scripts/validation/v1.18-audit-allowlist.json` — sidecar template; 59 line-pins across 5 arrays (D-20).
- `scripts/validation/regenerate-supervision-pins.mjs` — `:290`/`:336`/`:530` hardcode the **v1.7** sidecar (D-20); `:415` the never-honoured repoint forward-pointer; `:503-514` the BASELINE_22 comment shape to follow for BASELINE_23.
- `scripts/validation/c17-eee-contract.mjs` — imported by the v1.15–v1.18 milestone-audit harnesses. **BYTE-FROZEN this phase** (D-18).
- `scripts/validation/check-phase-54.mjs` `:30-31`, `:344-355`, `:568-586` — live REQUIREMENTS/ROADMAP negative assertions (D-15 part 4, D-19).
- `scripts/validation/check-phase-68.mjs` `:100`, `:170-174` — the frozen call-site pin on `check-phase-31.mjs` (D-17).
- `.github/workflows/audit-harness-v1.18-integrity.yml` — template for the 16th workflow. `:11-14` DUAL-APEX contract (D-09); `:22-34` triggers (no `push:`, D-31); `:26-31` the `.planning/` paths set (D-23); `:172` the standalone `check-phase-134` job (D-08.iii); `:15-18` the CARVE-1 no-ref checkout (do not fix).

### Publish bundle (HARN-16)
- `scripts/pipeline/build-publish-bundle.mjs` — `:40` still defaults to `v1.17` without the flag; `--version=v1.19` is required. Its Approved-row canary was bumped to 225 by Phase 137.
- `.claude/hooks/publish-bundle-gate.cjs` — the Stop-hook gate the regeneration runs under.
- `scripts/pipeline/convert.ps1`, `scripts/validation/guard-docx.mjs` — both new recipes were already pandoc/guard-docx pre-flighted clean at Phase 137 (D-24 pre-flight, first attempt, no remediation).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`check-phase-134.mjs`** — copy-forward template for all 4 new validators. Carries the fail-loud module-load dedup/length/terminus asserts, the dual-invariant SELF check, and the NESTED-aware AUDIT-HARNESS step. **Three defects must NOT be copied forward** (D-30).
- **`v1.18-milestone-audit.mjs` + `v1.18-audit-allowlist.json`** — Path-A copy source for the 17th harness (C1–C17 inherited verbatim; C17 subprocess-spawns `c17-eee-contract.mjs`).
- **`audit-harness-v1.18-integrity.yml`** — template for the 16th coexistence workflow, including the DUAL-APEX header contract and the `linux-chain-ubuntu-latest` job with its `CHAIN_TIMING_LINUX` `::notice`.
- **`_lib/frozen-at-close.mjs`** — mature `readAtClose(tag, path)`; the V118 append is a mechanical one-entry add plus one export line.

### Established Patterns
- **Back-anchor invariant:** at the close of milestone N, pin the PREVIOUS milestone's close SHA. Single entry per close; the current milestone's pin is the successor's job.
- **`[48..N-1]` chain-apex invariant:** apex = close phase; the array spans every integer 48..(N-1); apex asserts self NOT in chain AND `CHAIN_SKIP` empty.
- **Validator-atom deferral:** content phases hand off a needle-spec; the close phase authors the whole validator block as one indivisible atom (137 D-18 re-confirmed this for v1.19).
- **NESTED guard:** `CHECK_PHASE_NESTED=1` short-circuits both the recursive chain-guard and the audit-harness re-run — which is precisely why it cannot be the drift-detection gate (D-15).
- **Deferred-cleanup entries drafted in the originating phase's SUMMARY** as flagged contributions, since the close phase creates the file.

### Integration Points
- The 4 new validators chain into apex-138; the 17th harness reads the new sidecar (also read transitively by the chain); the 16th CI workflow coexists with the 15 prior integrity workflows; the close-gate flips 17 requirements across 4 planning docs.
- **Predecessor-apex Axis-2 evidence comes from `audit-harness-v1.18-integrity.yml`'s standalone `check-phase-134` job, not from anything in the v1.19 workflow** (D-08.iii). This is the coupling that makes the v1.18 run non-fallback-eligible.
- `check-phase-30/31` sit outside every chain and outside the byte gate, but inside every workflow's `paths:` glob (D-32).

</code_context>

<specifics>
## Specific Ideas

**Live measurements taken at context time (2026-08-03, HEAD `2ca0109b`) — use these, do not re-derive:**

- **V118 SHA = `7af8a14766d346a348f7adf05d260676dbe4c1b2`**, subject `docs(134-05): v1.18 MILESTONE CLOSE — single close-gate commit, 20/20 requirements Validated`. Recovered by the STATE-mandated subject-line method, **count = 1**, reachable on `origin/master`:
  ```
  git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.18/ && $2 ~ /MILESTONE CLOSE/'
  ```
  The bare `git log --all --grep="v1.18" --grep="MILESTONE CLOSE" --all-match` returns **2** (it also matches the v1.17 close-gate `b56bba5e`) — that is the documented false positive the subject-line mandate exists to defeat, not a defect in the method.
- **Standalone-RED set = `{30, 31, 48, 60, 61, 62, 63, 64, 65, 66}`.** Both 30 and 31 emit `Summary:` (not `Result:`) and exit 1 — a `Result:`-only grep manufactures a false "crashes before summary" reading.
- **`check-phase-61`:** standalone exit 1 (30 PASS / 4 FAIL: V-61-21, V-61-32, V-61-33, V-61-34); nested exit 0 (20 PASS / 0 FAIL / 14 SKIPPED).
- **Non-nested wall-clock doubles**: 60=5s, 61=10s, 62=19s, 63=37s, 64=75s, 65=148s, 66≈300s. The band that fails to propagate `CHECK_PHASE_NESTED` to children is **60..66** (`check-phase-71:210` *does* set it).
- **`regenerate-supervision-pins.mjs --self-test` exits 1**, and its complete inputs are byte-identical across `7af8a147..HEAD` — so it was red at the v1.18 close too.
- **Pinned-file drift proof (~2s):** `git diff --name-only 7af8a147..HEAD -- docs scripts .github` → **zero** allowlist-pinned files changed.
- **`_lib` importer counts:** `c17-eee-contract.mjs` 8, `archive-path.mjs` 23, `exec-fail-detail.mjs` 31, `frozen-at-close.mjs` 25.
- **Workflow count = 15** (`ls .github/workflows/*.yml`); the correct cascade baseline is **5 PASS / 10 FAIL**.
- **Derived apex-138 numbers: 90 chain entries, 93 total checks.**

</specifics>

<deferred>
## Deferred Ideas

- **Who owns `c17-eee-contract.mjs` across the 17-milestone lineage.** It is imported by four "byte-unchanged" frozen harnesses with no stated discipline, and v1.19 just added a doc class to the corpus it governs. D-18 byte-freezes it for this phase as a stopgap; a durable ownership rule belongs to a dedicated tooling milestone.
- **Whether HARN-15's text is satisfiable as written.** A genuinely *full* non-nested predecessor chain is exponential (measured), so "the full predecessor chain runs BEFORE the close-gate" cannot mean what it literally says. D-15 substitutes a bounded, honestly-labelled gate. A successor milestone should re-word the requirement rather than keep substituting.
- **The `parseAllowlist` v1.7 lineage freeze.** `regenerate-supervision-pins.mjs` has read the v1.7 sidecar for 11 milestones; `:415`'s promised one-line repoint was never honoured. Fixing it is tooling work — v1.19 carries `NO-TOOLING-PILLAR`.
- **Fixing the standalone-RED set** (the superseded 60d C5 rule, the self-test classifier, the cascading chain-guards, the 30/31 content drift). All four classes are logged, none are fixed here — a harness-close phase never batches remediation.
- **Correcting `check-phase-134.mjs`'s three latent hazards in place.** D-30 fixes them in the NEW file only; the frozen apex keeps them under D-00a.
- **The `v1.18-MILESTONE-AUDIT.md` push-semantics correction (D-31) as an in-place amendment.** Precedent exists (`6acc429b` amended the v1.18 deferred-cleanup doc post-close), so this is a live option a successor may take; Phase 138 records the correction rather than editing the predecessor doc.

### Reviewed Todos (not folded)
None — `todo.match-phase 138` returned 0 matches.

</deferred>

---

*Phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close*
*Context gathered: 2026-08-03*
