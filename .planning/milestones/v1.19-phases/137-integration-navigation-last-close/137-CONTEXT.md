# Phase 137: Integration & Navigation-Last Close - Context

**Gathered:** 2026-08-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Register both already-authored recipes, publish them through the existing pipeline, and make them discoverable from `docs/index.md`. Recipe **body content is complete and frozen** — this phase is terminal wiring only (CLASS-05, CLASS-06).

**Delivers:**
- RE-224 / RE-225 rows in `docs/_registry/RE-index.md` at `Status: Approved`
- Both recipes' two-site `Draft → Approved` flip (frontmatter `status:` + the `**...Status:**` byline at `:13`)
- Regenerated (never hand-edited) `scripts/pipeline/filename-map.md`
- **Two** registry-row-count drift canaries bumped: `build-filename-map.mjs` 223 → 225 **and** `build-publish-bundle.mjs` 221 → 225
- `docs/index.md` wired on **both** surfaces (table rows + the line-38 quick-nav bullet), landed in one commit
- An explicit recorded ruling on the troubleshooting-hub disposition, **with the correction that `V-132-HUBSNOTWIRED` does not actually cover the new recipes**
- pandoc + `guard-docx.mjs` pre-flight of both recipes, gated before the flip
- Full-corpus C17 green; `check-nav-hub-links` 0/0; both pipeline `--self-test` harnesses green

**Explicitly NOT delivered:** any edit to recipe body prose; any edit to `check-phase-132.mjs` (v1.18 frozen surface); any `check-phase-137.mjs` authorship (Phase 138 / HARN-15 owns leaf validators); any hub-file edit.

**Method note:** all rulings below were produced by `/grill-me` (21 questions across 4 areas) then `/adversarial-review` (3 parallel Finders → Adversary → Referee; 50 findings raised, 22 confirmed real — 6 CRITICAL). 17 of the 21 candidate rulings changed as a result, and 4 new questions (D5.x) were added that no area had asked. Two CRITICAL findings were independently re-verified by the orchestrator before any ruling depended on them.

</domain>

<decisions>
## Implementation Decisions

### Area 1 — Troubleshooting-hub disposition (SC4)

- **D-01: Hubs stay NOT-WIRED.** `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` are untouched. Exactly **two** grounds are recorded, in this order:
  - **(a) Doc-class taxonomy** — the three hubs are symptom→runbook routers; a recipe is `doc_type: Guide` (locked Phase 129 D-02). Routing a symptom to a zero-to-verified provisioning procedure is a category error. *(State this ground without any "no runbook exists" clause — that clause is contingent and must not carry the ruling.)*
  - **(b) The hub→runbook→recipe layering already serves the L1-adjacency concern** — `docs/quick-ref-l2.md:352` already routes to `docs/l2-runbooks/19-android-enrollment-investigation.md`, whose pattern at `:226-242` covers "Dedicated device boots the full Android launcher instead of the kiosk experience, MHS policy unassigned"; and `docs/recipes/04-android-dedicated-mhs-multi-app.md:107,292` already links **out** to `docs/l2-runbooks/20-android-app-install-investigation.md`. Symptom-first discovery already reaches the recipe through the correct layer.
  - **The "frozen validator cost" ground is DELETED.** See D-02.
  — **Reversibility:** reversible — no file is edited; reversing means adding links later.

- **D-02: CORRECTION OF RECORD — `V-132-HUBSNOTWIRED` does NOT cover recipes 03/04, and `REQUIREMENTS.md:31` is factually wrong on this point.** `scripts/validation/check-phase-132.mjs:97` tests `/docs\/recipes|01-shared-windows-avd|02-shared-ipad/` against the three hub files. The hub files live *in* `docs/`, so a real link reads `recipes/03-windows-11-multi-app-kiosk.md` — the `docs/recipes` arm never fires, and the other two arms are hardcoded to recipes 01/02. **Verified:** `node -e "/docs\/recipes|01-shared-windows-avd|02-shared-ipad/.test('[x](recipes/03-windows-11-multi-app-kiosk.md)')"` → `false`. CLASS-06's claim that it "bars `docs/recipes` … generically" is therefore false, and the cost of wiring the hubs is **zero**, not prohibitive. This correction is a named phase output carried in `137-VERIFICATION.md`. — **Reversibility:** reversible.

- **D-03: Enforcement of D-01 is three-layer, none of which touches the frozen validator.**
  1. **In-phase (mechanical):** `137-VERIFICATION.md` carries an observable truth evidenced by `grep -lE 'recipes/0[34]-|03-windows-11-multi-app-kiosk|04-android-dedicated-mhs' docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md` returning nothing, plus `git diff` over the three files being empty. (This mirrors `132-VERIFICATION.md` truth #3, which also used a raw grep — the validator was never the Phase-132 enforcement mechanism either.)
  2. **Durable:** the needle-spec handed to Phase 138 requires `check-phase-137.mjs` to carry a hubs-not-wired assertion with the **corrected** literals `recipes/03-` and `recipes/04-`.
  3. **Documentary:** `137-VERIFICATION.md` records D-02 verbatim so Phase 138/139 cannot re-import the false premise.
  — **Reversibility:** reversible.

- **D-04: `check-phase-132.mjs` is NOT edited.** It is a v1.18 predecessor frozen surface under the D-00a byte-unchanged doctrine; editing it is an explicit CARVE for zero gain, since the new leaf validator covers 03/04 additively. — **Reversibility:** one-way — an edit would break `predecessor_byte_unchanged: CLEAN` for the whole v1.19 close and require a scoped CARVE in the milestone audit.

- **D-05: Ruling is SCOPED to RE-224 and RE-225 — no standing rule is enacted.** Add one non-binding sentence: *"The taxonomy ground generalizes, but no standing rule is enacted here — the phase adding recipe 05 re-rules."* CLASS-06 asks for a ruling on *this* disposition; the candidate's escalation to a binding rule rested entirely on the false de-facto-enforcement premise (D-02). — **Reversibility:** reversible.

- **D-06: The non-barred-surface middle path is OUT OF SCOPE for Phase 137.** CLASS-06 names `docs/index.md` only. Record instead as a `v1.19-DEFERRED-CLEANUP.md` candidate entry, **drafted verbatim inside `137-02-SUMMARY.md` as a flagged contribution** (the file itself is created by Phase 138 / HARN-16 — this is the milestone's established carrier convention, per `135-01-SUMMARY.md:113` and `136-01-PLAN.md:25`). Entry text: *"If a kiosk-lockout or MHS-exit-PIN-lockout L1/L2 runbook is ever authored, the hub routes to THAT runbook and the runbook may cross-link the recipe; the three hubs never link `docs/recipes` directly."* — **Reversibility:** reversible.

### Area 2 — `docs/index.md` navigation surfaces (SC3)

- **D-07: The line-38 quick-nav bullet enumerates all four recipes. Exact final string is fixed HERE, not at execution time:**
  ```
  - [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning recipes with embedded admin decision points (shared Windows AVD-client device, Shared iPad full provisioning, Windows 11 multi-app kiosk, Android Dedicated multi-app kiosk)
  ```
  **The candidate rationale ("every other bullet enumerates its section's members") is STRUCK as false** — `docs/index.md:34` (macOS) enumerates nothing, `:40` (Cross-Platform References) is generic categories, `:33/35/36/37` enumerate frameworks and enrollment modes rather than section members, and `:39` (Operations) names four sub-topics against five `###` subsections (omitting Apple Business Governance at `:329`). `:38` is the **only** bullet on the page that names individual documents. Replacement grounds: (i) extending an existing enumeration is a smaller diff than deleting live content from an Approved doc (RE-219) that no requirement asks to delete; (ii) a generic bullet makes SC3's "both surfaces in the same commit" vacuous and leaves the CLASS-06 needle nothing per-recipe to assert on the bullet side. **The literals must be fixed at ruling time** — `index.md:38` carries no path, filename or doc ID, so leaving wording to execution-time discretion makes the D-19 needle unbuildable. **Owner-ruled 2026-08-03** against the alternative (genericize, per `132-REVIEW.md:66-83`'s originally-prescribed fix text). Drop the candidate's arbitrary "~6 recipes" revisit threshold. — **Reversibility:** reversible.

- **D-08: Table row order = filename order** — append `03` then `04` after `02`. The same order governs the line-38 parenthetical (so the parenthetical order needs no separate ruling). `docs/index.md:280-281` is already filename-ordered and matches `RE-index.md:238-239`'s RE-NNN sequence. — **Reversibility:** reversible.

- **D-09: Link text = H1 verbatim, INHERITED from Phases 135/136 — never re-derived.** Identity chain: `index.md` link text == `RE-index.md` Title == filename-map stem source. Literals:
  - RE-224 → `Windows 11 Multi-App Kiosk: Assigned Access Provisioning` → expected stem `windows-11-multi-app-kiosk-assigned-access-provisioning.docx`
  - RE-225 → `Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning`
  `135-01-SUMMARY.md:28,108` locks the slug and H1 with "Phase 137 inherit these, NEVER RE-DERIVE" — the *string* is inherited; only its **use as index link text and registry Title** is ruled here. **This ruling also discharges CLASS-05's "descriptive filenames are settled here" clause**, since `filename-map.md`'s header names the registry `Title` column as the D-07 source of truth for the `.docx` output name. — **Reversibility:** costly — the Title drives published `.docx` filenames that become Copilot citation titles; changing it after publish orphans citations.

- **D-10: "When to Use" blurb — budget 20–33 words** (the measured precedent range: `index.md:280` ≈ 33 words, `:281` ≈ 22). Derive from the recipe's `applies_to` frontmatter plus its `## Summary`. **Shape is not fixed** — row 1 is [what you get] + [scoping caveat], row 2 is [what you get] + [component list]; either is conformant. Exact wording is Claude's discretion within the budget; the **measured actual** is recorded in the plan SUMMARY so Phase 138 can derive needles.

- **D-11: The existing line-38 capitalization is NOT a defect — leave both existing strings byte-unchanged.** Forward rule for the two new entries: take the leading fragment of the recipe's `applies_to` frontmatter, **preserving corpus-standard capitalization of enrollment-mode names**. Yields `Windows 11 multi-app kiosk` and `Android Dedicated multi-app kiosk` — **`Dedicated` stays capitalized** (`index.md:36`, `quick-ref-l2.md:352`, `docs/recipes/04-*.md:9` all capitalize it as an enrollment-mode proper noun). A naive "capitalize only real product names" rule would wrongly lowercase it. — **Reversibility:** reversible.

- **D-12: Platform-section `### Admin Setup` cross-reference rows are OUT OF SCOPE.** CLASS-06's text is exhaustive ("via **both** surfaces — the table **and** the prose quick-nav bullet") and Phase 132 added no platform-section cross-refs either (`grep -n 'recipes/' docs/index.md` → only `:280`, `:281`).

### Area 3 — Commit topology

- **D-13: Two plans, `137-02 depends_on: ["137-01"]`.** 137-01 = pre-flight + flip + registry + regen + canaries; 137-02 = `docs/index.md` both surfaces. The wave dependency makes navigation-last structural rather than a discipline note a plan author could forget. Mirrors `132-01`/`132-02`.

- **D-14: THREE content commits, flip-FIRST — reversing the candidate's "one commit" ruling.**
  - **Commit A** — two-site `Draft → Approved` flip on both recipe files (frontmatter `status:` + `**...Status:**` byline at `:13`). Gated by the D-17 pre-flight.
  - **Commit B** — `RE-index.md` rows + `filename-map.md` regeneration + **both** canary bumps. This is the binding atom per SC2.
  - **Commit C** (plan 137-02) — `docs/index.md` table rows + line-38 bullet, together.
  **Precedent verified:** Phase 132 split these — `996dcead docs(132-01): flip RE-222/RE-223 recipes Draft to Approved` **precedes** `fb179bfa docs(132-01): register RE-222/RE-223 and regenerate filename-map`. **The candidate's C17-#9 rationale is STRUCK** — C17 #9 is "Block field values match frontmatter" (`c17-eee-contract.mjs:108`) and never reads `RE-index.md`; `RE-index.md:9-14` states verbatim that its Status column tracks the **EEE retrofit lifecycle**, "distinct from the standard's frontmatter `status` vocabulary". Flip-first is additionally the safe direction for the `build-publish-bundle.mjs:137-149` D-12 divergence guard: an Approved doc absent from the registry is simply unselected, whereas an Approved registry row pointing at Draft frontmatter fails closed.

- **D-15: The binding same-commit atom is `{filename-map regen + BOTH canary bumps}` — nothing more.** The registry-row addition rides in Commit B because the regeneration reads the registry. SC2 mandates only that the canary bump land in the same commit as the regeneration; it says nothing about the flip. **The `build-filename-map.mjs` bump touches all three sites carrying `223`:** the comment at `:274-276`, the assertion label at `:281`, and the assertion at `:282`. **No D-00a CARVE is required** — `v1.18-MILESTONE-AUDIT.md:294` scopes the byte-unchanged HARD gate to 44 surfaces (15 milestone-audit `.mjs` + 15 sidecar JSON + 14 integrity workflows) plus `check-phase-48..128.mjs`; commit `6acc429b` states it verbatim: *"harness byte-gate is scoped to `scripts/validation/`, not `scripts/pipeline/`."* This clearing fact is recorded so no planner blocks on it.

- **D-16: Navigation-last evidence is a `137-VERIFICATION.md` observable truth, NOT a SUMMARY note.** Worded on the `132-VERIFICATION.md:23` model: the `docs/index.md` commit SHA **with author timestamp**, the registry/regen commit SHA **with author timestamp**, and the assertion that the former strictly post-dates the latter. **Name the two content commits explicitly** — plan-artifact/SUMMARY commits are excluded by name (Phase 132's two plans produced ~9 commits, so "the SHA per plan" would otherwise be ambiguous).

- **D-17: Validation gates — three, not one.**
  - **C17 after every commit** (all three). After Commit A both recipes are Approved with matching bylines, so C17 #9/#13 are satisfied and there is no excuse for a red intermediate state in history.
  - **`check-nav-hub-links.mjs` after Commit C only.**
  - **NEW — a recipe outbound-link sweep before close.** `check-nav-hub-links.mjs:217,249` scans only links *from* the 4 hubs and links *targeting* the 4 hubs. The ~28 `../` outbound links the two new recipes ship (e.g. `04:107,292` → `../l2-runbooks/20-…`) are checked by **no** tool. SC5's "link-checker 0/0" is therefore weaker assurance than it reads; verify those links resolve, once, before close.

### Area 4 — CLASS-06 validator needle

- **D-18: The needle-spec is HANDED OFF to Phase 138 — Phase 137 does NOT author `check-phase-137.mjs`.** Grounds: (i) **current** convention — since `407ba895 feat(74-03)` (v1.8) the harness-close phase authors leaf validators, and `63bb0665 feat(134-03): author 5 leaf validators check-phase-129..133` did exactly this for v1.18's content phases; (ii) HARN-15 already names `check-phase-135..138.mjs` as a Phase-138 deliverable, so authoring here forks the convention and duplicates work.
  **Two candidate grounds are STRUCK:** the blanket claim that content phases never authored their own validators is **false** (`aecf0141 docs(55)` ships 5 docs plus a 612-line `check-phase-55.mjs` in one commit; likewise `be7f59db docs(54)`, `8d37ab24 docs(53)`, `c8a644de docs(51)`, `ee4f6c7e feat(63-06)`, `3d16120e feat(64-01)`, `c25fa10d feat(65-01)`, `0ae89754 feat(66-01)`) — the convention is *current*, not universal. And **`V-137-SELF` is NOT apex-owned**: every leaf carries its own `CHAIN_PHASES=[]`, `CHAIN_SKIP=new Set([])` and `V-NNN-SELF` dual-invariant (`check-phase-132.mjs:34-35,106-121`). Only apex chain **registration** is apex-owned.

- **D-19: The needle is a per-recipe, line-scoped CO-PRESENCE invariant — not presence-of-both.** For each recipe assert:
  1. a line matching `^\| \[<H1 verbatim>\]\(recipes/0N-….md\) \|` exists in `docs/index.md`; and
  2. the **single line** matching `^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)` contains the recipe's fixed prose name (`Windows 11 multi-app kiosk` / `Android Dedicated multi-app kiosk`).
  **Extract that one line and test it in isolation — NOT a whole-file `c.includes()`.** Every existing V-132 needle is whole-file; a whole-file `includes('Dedicated')` would match `docs/index.md:36` two lines above the recipes bullet, plus three other sites. The needle is only buildable because D-07 fixes the bullet-side literals.
  **Note the candidate's causal story is STRUCK:** `check-phase-132.mjs` was created by `63bb0665 feat(134-03)` and **did not exist during Phase 132** — WR-01 escaped because *nothing* existed to catch it, not because `V-132-INDEXNAV`'s needle was weak. The prescription stands on its own merit.

- **D-20: Needle-spec literals per D-19, plus the corrected hubs assertion.** Table side: `recipes/03-windows-11-multi-app-kiosk.md`, `recipes/04-android-dedicated-mhs-multi-app.md`. Bullet side: `Windows 11 multi-app kiosk`, `Android Dedicated multi-app kiosk`. **Plus** the hubs-not-wired assertion with literals `recipes/03-` / `recipes/04-` (per D-03), which belongs in `check-phase-137.mjs` precisely because `check-phase-132.mjs:97` provably does not cover them and must not be edited.

- **D-21: The spec lands in three places.** (a) this CONTEXT `<decisions>` block as a named deliverable; (b) an explicit **"Needle-spec handoff"** section in `137-VERIFICATION.md` carrying the **measured actual literals** as shipped (bullet line text, table link text, table target paths) — this is the surface the harness already reads, per `check-phase-132.mjs:5` *"NEEDLES DERIVED INLINE from `132-VERIFICATION.md`"*; (c) **append to the existing `STATE.md` "Plan-Time Research Flags → Phase 138" block** rather than opening a parallel entry alongside `STATE.md:334`/`:345`.

- **D-22: Add a non-validator in-phase guard, and record the CLASS-06 tension explicitly.** Plan 137-02 lands both index surfaces in one task/commit (structural), `137-VERIFICATION.md` carries an observable truth asserting both, **and the phase writes a mechanical grep pair into the VERIFICATION evidence column** proving both surfaces. State plainly in this CONTEXT: CLASS-06 asks for a validator needle *"rather than relying on code-review"*, the needle lands in Phase 138, and Phase 138 carries a HARD BLOCKER (the owner's PIPE-02 push) — the in-phase grep is what covers that window.

### Area 5 — Questions no area asked (surfaced by adversarial review)

- **D-23: Phase 137 OWNS and BUMPS the second registry-derived canary.** `scripts/pipeline/build-publish-bundle.mjs:515,519` carries `stAssert('(a) Approved selection yields exactly 221 rows', rows.length === 221)` over `parseRegistry(...).filter(r => r.status === 'Approved')`. **It is already RED** — verified: `node scripts/pipeline/build-publish-bundle.mjs --self-test` → `14 passed, 1 failed`, `(a) … FAIL -- rows.length=223`. It has been failing since the v1.18 close and Phase 137 takes it to 225.
  - Bump `221 → 225` at **both** `:515` (label) and `:519` (assertion), plus the stale header comment at `:7` reading "(221 today)", **in the same Commit B as the `build-filename-map.mjs` canary and the regeneration**.
  - Add a one-line comment recording both bumps (221→223 missed at v1.18 close; 223→225 here) so the next milestone greps it.
  - **`node scripts/pipeline/build-publish-bundle.mjs --self-test` exiting 15/15 is a Phase-137 close gate.**
  - **Amend `REQUIREMENTS.md` CLASS-05 and `ROADMAP.md` Phase-137 SC2 in-phase to name BOTH canaries.**
  Leaving it would be a verbatim recurrence of the `FILENAME-MAP-SELFTEST-DRIFT` defect that CLASS-05 itself cites as the milestone's #1 recurring lesson (see `git show 6acc429b`). **Owner-ruled 2026-08-03** against deferring to Phase 138. — **Reversibility:** reversible.

- **D-24: pandoc + `guard-docx.mjs` pre-flight of BOTH recipes, gated BEFORE Commit A.** Run `convert.ps1` then `guard-docx.mjs` on `docs/recipes/03-*.md` and `04-*.md`; both must be clean before the flip lands. If pandoc is absent from the executor's PATH, record a NOT-RUN with a named `v1.19-DEFERRED-CLEANUP.md` candidate in `137-01-SUMMARY.md`, and **the flip still proceeds** — but the Phase-138 handoff states RE-225 is unproven.
  **Why this is not optional housekeeping:** `grep -rli 'guard-docx|pandoc'` returns **9 Phase-135 artifacts and ZERO Phase-136 artifacts`. Phase 135 ran the conversion as a named HARN-16 de-risk for RE-224; Phase 136 never did it for RE-225 — which ships a column-0 ` ```json ` fence, the highest-risk conversion surface in the corpus. `build-publish-bundle.mjs:312` selects on `status === 'Approved'`, so **the Phase-137 flip is precisely the act that drags RE-225 into the publish set**, and HARN-16 then requires both recipes pandoc-convertible and guard-docx-clean inside a phase hard-blocked on the owner's push with no content-remediation budget. **Owner-ruled 2026-08-03** against leaving it to Phase 138. — **Reversibility:** reversible.

- **D-25: The stale pipeline line at STATE.md line 307 is WRONG and is corrected in Phase 137's first commit.** It currently reads *"Registry -> filename-map -> publish-bundle pipeline … Phase 137 is standard mechanical execution, **zero pipeline code changes expected**"* — directly contradicting CLASS-05, ROADMAP SC2, and `STATE.md:345`. Rewrite to: *"…pipeline is unchanged and generic; Phase 137's only pipeline edits are the two registry-row-count drift canaries (`build-filename-map.mjs` 223→225 and `build-publish-bundle.mjs` 221→225), which are named CLASS-05 deliverables."*
  **Additionally: `137-VERIFICATION.md` must NOT carry `132-VERIFICATION.md:22`'s "zero pipeline code changes" observable truth or its `git diff --quiet scripts/pipeline/build-filename-map.mjs` evidence** — that check is *expected to fail* at 137, and its replacement is the two `--self-test` runs. A verifier copying Phase 132's truth table forward would either trip the gate or, worse, "fix" it by reverting the canary bump. This stale line is the most plausible reason the second canary went unnoticed for an entire milestone. — **Reversibility:** reversible.

### Claude's Discretion

- Exact "When to Use" blurb wording for each new row, within D-10's 20–33 word budget and either conformant shape.
- Exact commit-message subjects (following the `docs(137-NN):` convention).
- Placement of the correction comment in `build-publish-bundle.mjs` (D-23).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` §CLASS-05 (`:30`), §CLASS-06 (`:31`) — acceptance criteria. **NOTE D-02: CLASS-06's claim that `check-phase-132.mjs` "bars `docs/recipes` … generically" is FACTUALLY FALSE.** CLASS-05 is amended in-phase per D-23.
- `.planning/ROADMAP.md` §"Phase 137" (`:104-120`) — SC1–SC5. SC2 is amended in-phase per D-23.
- `.planning/STATE.md` — `:307` is corrected in-phase per D-25; `:334` (hubs todo) is retired by D-01/D-03; `:345` (canary + two-surface watch items) is carried by D-15 and D-22.

### Files this phase edits
- `docs/recipes/03-windows-11-multi-app-kiosk.md` — RE-224, `status: Draft` at `:3`, byline `**Status:** Draft` at `:13`. **Metadata only — body prose is frozen.**
- `docs/recipes/04-android-dedicated-mhs-multi-app.md` — RE-225, same two sites at `:3` / `:13`. **Metadata only.**
- `docs/_registry/RE-index.md` — append RE-224/225 after the RE-223 row at `:239`. **The table does NOT end the file** — a prose `## Review Notes` section follows at `:241-250`; rows must land inside the table. (`parseRegistry`'s filter `/^\|\s*RE-\d+\s*\|/` at `build-filename-map.mjs:106` would count a misplaced row anyway, so the canary is blind to this.)
- `docs/index.md` — RE-219; line-38 bullet per D-07, table rows after `:281` per D-08/D-09/D-10.
- `scripts/pipeline/build-filename-map.mjs` — canary `223 → 225` at `:274-276` (comment), `:281` (label), `:282` (assertion).
- `scripts/pipeline/build-publish-bundle.mjs` — canary `221 → 225` at `:515` (label), `:519` (assertion), plus the stale header comment at `:7`.

### Pipeline (run, never hand-edit)
- `scripts/pipeline/filename-map.md` — GENERATED. Header names the registry `Title` column as the D-07 source of truth for `.docx` output filenames.
- `scripts/pipeline/convert.ps1` + `scripts/pipeline/guard-docx.mjs` — the D-24 pre-flight.

### Validators (run; do NOT edit)
- `scripts/validation/c17-eee-contract.mjs` — full-corpus C17. #9 = "Block field values match frontmatter" (`:108`); #11 fires only above 25 data rows and counts the header row (recipes table goes 3 → 5 counted rows — nowhere near the threshold); `RE-index.md` has no frontmatter `doc_id` so is **not C17-enrolled at all** (`:522-533`).
- `scripts/validation/check-nav-hub-links.mjs` — scans links *from* the 4 hubs (`:217`) and links *targeting* them (`:249`) only. **Does not cover the recipes' own `../` outbound links** — see D-17.
- `scripts/validation/check-phase-132.mjs` — **READ-ONLY, FROZEN.** `:97` is the miscited regex; `:34-35`/`:106-121` show the leaf-owned SELF invariant. Do not edit (D-04).

### Precedent (the exact analogue — read before planning)
- `.planning/milestones/v1.18-phases/132-integration-navigation-last-close/132-CONTEXT.md` — D-01/D-02 index.md section placement, still binding.
- `.planning/milestones/v1.18-phases/132-integration-navigation-last-close/132-VERIFICATION.md` — `:22` (the "zero pipeline code changes" truth that must NOT be copied forward, per D-25); `:23` (the nav-last observable-truth wording model, per D-16); truth #3 (the grep-based hub enforcement, per D-03).
- `.planning/milestones/v1.18-phases/132-integration-navigation-last-close/132-REVIEW.md` `:66-83` — the WR-01 finding and its originally-prescribed *generic* bullet text (the alternative D-07 ruled against).
- Commits: `996dcead` (flip) → `fb179bfa` (register+regen) → `71ad89a3` (index.md) — the three-commit flip-first shape D-14 restores. `63bb0665 feat(134-03)` — leaf-validator authorship precedent (D-18). `6acc429b` — the byte-gate scoping statement (D-15) and the FILENAME-MAP-SELFTEST-DRIFT lesson (D-23).

### Upstream handoffs (both explicitly address Phase 137)
- `.planning/phases/135-recipe-3-windows-11-multi-app-kiosk/135-01-SUMMARY.md` `:28`, `:108` — slug/H1 locked, "Phase 137 inherit these, NEVER RE-DERIVE" (D-09).
- `.planning/phases/135-recipe-3-windows-11-multi-app-kiosk/135-02-SUMMARY.md` `:257` — the four-item Phase-137 handoff; `:258` — 135's own needle-spec basis for Phase 138.
- `.planning/phases/136-recipe-4-android-dedicated-mhs-multi-app/136-02-SUMMARY.md` `:195` — 136's handoff + its measured-actuals needle basis.
- `.planning/phases/136-recipe-4-android-dedicated-mhs-multi-app/136-CONTEXT.md` `:101` (D4.8) — recipe 04's deliberate non-link to recipe 03. **The "03 is Draft until Phase 137" precondition expires here, but the second ground (`01:29`'s no-link idiom) is unconditional and survives — so the no-link disposition stands and needs no re-decision.** `:154` — names `build-filename-map.mjs:281-282` as Phase 137's canary.

### Standards
- `docs/_standards/EEE-SOP-standard.md` — D-02 recipe ruling (`docs/recipes/*` → `doc_type: Guide`), C17 rules.
- `.planning/milestones/v1.18-MILESTONE-AUDIT.md` `:294` — the 44-surface byte-unchanged gate scoping that clears `scripts/pipeline/` (D-15).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Registry → filename-map → publish-bundle pipeline** — generic and byte-stable across v1.15–v1.18. Phase 137 runs it; the only code edits are the two canary integers.
- **`RE-index.md` row format** — `| RE-NNN | <path> | <title> | <doc_type> | <status> |`; append after `:239`, inside the table.
- **`132-VERIFICATION.md`'s observable-truth wording** — reusable verbatim for D-16's nav-last truth and D-03's grep truth.

### Established Patterns
- **Navigation-last as a wave dependency**, not a discipline note (D-13) — the Phase-132 mechanism.
- **Leaf validators authored by the harness-close phase** (current convention since v1.8; `63bb0665` for v1.18).
- **Needles derived from the phase VERIFICATION's measured actuals**, not from its CONTEXT (`check-phase-132.mjs:5`).
- **Deferred-cleanup entries drafted in the originating phase's SUMMARY** as flagged contributions, since the `vX.Y-DEFERRED-CLEANUP.md` file is created by the close phase.

### Integration Points
- Recipe frontmatter `status` + the `**Platform:** … **Status:**` byline + the RE-index row must all read `Approved` — but they are tied by **different mechanisms**: C17 #9 ties frontmatter↔byline; the registry↔frontmatter tie is the D-12 divergence guard at `build-publish-bundle.mjs:137-149`, which fires only at bundle time (Phase 138), not in any per-commit gate at 137.
- `build-publish-bundle.mjs:312` selects on `status === 'Approved'` — this is why D-24's pre-flight must gate the flip.
- Both `parseRegistry` consumers (`build-filename-map.mjs`, `build-publish-bundle.mjs`) carry independent row-count canaries. Both must move together.

</code_context>

<specifics>
## Specific Ideas

- Final line-38 string is fixed verbatim in D-07 — the planner copies it, does not compose it.
- Registry Titles are fixed verbatim in D-09, along with the expected `.docx` stem for RE-224 (a cheap post-regen spot-check).
- The D-03 grep is the phase's own hub enforcement and should read exactly:
  `grep -lE 'recipes/0[34]-|03-windows-11-multi-app-kiosk|04-android-dedicated-mhs' docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md`

</specifics>

<deferred>
## Deferred Ideas

- **Hub wiring via a non-barred surface** (`docs/l1-runbooks/00-index.md`, `docs/decision-trees/`) — D-06. Routed to a `v1.19-DEFERRED-CLEANUP.md` candidate drafted in `137-02-SUMMARY.md`. Belongs to whatever phase authors a kiosk-lockout or MHS-exit-PIN-lockout runbook.
- **Standing rule on recipes-vs-hubs for recipe 05+** — D-05 deliberately declines to enact one; the phase adding recipe 05 re-rules.
- **Genericizing the line-38 quick-nav bullet** (per `132-REVIEW.md:66-83`'s originally-prescribed text) — considered and owner-ruled against at D-07. Would structurally eliminate the WR-01 class but gut SC3's same-commit mechanic. Revisit if the recipes section grows unwieldy.
- **`V-132-HUBSNOTWIRED`'s broken regex** — D-04 declines to fix it (frozen surface, zero gain, additive coverage lands in `check-phase-137.mjs` instead). A future milestone that legitimately re-opens `scripts/validation/` predecessors could correct both the regex and `REQUIREMENTS.md:31`'s claim about it.
- **The recipes' own `../` outbound links have no validator coverage** — D-17 adds a one-off manual sweep. A durable checker extending `check-nav-hub-links.mjs` beyond the 4 hubs is a tooling-debt item, and v1.19 has NO-TOOLING-PILLAR (locked at roadmap).

### Reviewed Todos (not folded)
None — `todo.match-phase 137` returned 0 matches.

</deferred>

---

*Phase: 137-integration-navigation-last-close*
*Context gathered: 2026-08-03*
