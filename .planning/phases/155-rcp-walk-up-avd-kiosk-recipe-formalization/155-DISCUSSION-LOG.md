# Phase 155: RCP — Walk-Up AVD Kiosk Recipe Formalization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-02
**Phase:** 155-rcp-walk-up-avd-kiosk-recipe-formalization
**Areas discussed:** Asset sourcing and the `assets/` tree; the `[PILOT]` label; RE-222 / RE-224 /
licensing reconciliation; RCP-10 research and the Approved gate

**Method:** the user selected all four gray areas and directed `/grill-me` to deepen the question set
and `/adversarial-review` to adjudicate each question and recommend the best option with reasoning.
A grill draft was written with 20 questions and a recommended answer each, then subjected to a
5-Finder → Adversary → Referee chain. **127 raw findings → 97 deduplicated → 86 confirmed real, 11
false positives**, clustered into 11 distinct defects. Four of the draft's own recommendations were
falsified and reversed. The 11 owner decisions below were then put to the user.

---

## Question 1 — Promotion ordering (RCP-01 / RCP-03 / RCP-04 / `checkDivergence`)

| Option | Description | Selected |
|--------|-------------|----------|
| Amend RCP-04/SC#5 — flip first | Review → sign-off → frontmatter flip (both sites) → atomic registration commit. Matches the `c3733928 → f0b7aa90` precedent. Costs an annotate-and-supersede amendment with the `check-phase-54` rider. | ✓ |
| Accept a broken-bundle window | Keep RCP-04's ordering; `build-publish-bundle.mjs` exits 1 between the RCP-03 and RCP-04 commits. No requirement amended. | |
| Land the row non-`Approved` | Foreclosed by measurement — 236/236 rows are `Approved`, `Pending` has zero live instances, and it would kill RCP-03. | |

**User's choice:** Amend RCP-04/SC#5 — flip first.
**Notes:** This reverses the discussion draft, which had asserted (under a `[MEASURED]` tag, sourced
from a ledger rather than from git) that Phase 137 registered first and flipped after. The Adversary
recommended the broken-window option; the Referee overruled it on the ground that "no bundle is built
until Phase 158" is a premise with nothing enforcing it — neither generator is invoked by any
validator or CI workflow, which is the same structural blindness that let the bundle canary sit red
for an entire milestone.

---

## Question 2 — Asset sourcing (RCP-09)

| Option | Description | Selected |
|--------|-------------|----------|
| Vendor upstream at a pinned SHA + owner supplies 2 | 4 of 6 named assets are public upstream per RE-237's own text; only `Remove-KioskOemBloat.ps1` and `Remove-KioskRunTasks.ps1` are pilot-only. | ✓ |
| Owner supplies everything | One provenance story, but duplicates upstream code without pinning and worsens the licensing gap. | |
| Descope RCP-09 to a manifest | Requires an owner-gated amendment; leaves the recipe un-reproducible, which the owner ruling already rejected once. | |

**User's choice:** Vendor upstream + owner supplies 2.
**Notes:** The draft's premise — "they exist only on the pilot device or in the Claude Desktop
conversation" — was falsified by RE-237 itself at `:81`, `:106` and `:200`. The draft had also
declared the same GitHub repository authoritatively enumerable at a pinned SHA in one area while
calling its files unobtainable in another.

---

## Question 3 — Secrets in the ConfigMgr package source

| Option | Description | Selected |
|--------|-------------|----------|
| Scrub to placeholders + `/gsd-secure-phase` | Replace tenant identifiers, site code and CMG hostname; add a `-WhatIf`/ShouldProcess review for the two destructive scripts. | ✓ |
| Omit the ConfigMgr package entirely | Step 9 is already optional; removes the exposure at the cost of one step's reproducibility. | |
| Commit as-is | Treat client IDs as non-secret configuration. Not recommended without a deliberate ruling. | |

**User's choice:** Scrub to placeholders + `/gsd-secure-phase`.
**Notes:** RE-237:209 names `AADTENANTID`, `AADCLIENTAPPID`, `AADRESOURCEURI`, the site code and the
CMG mutual-auth path; the remote is public and HARN-06 pushes to it; committing is one-way. The draft
had proposed an adversarial **content** review and explicitly ruled out a code review of the diff —
backwards for the one artifact class in this phase that is executable code.

---

## Question 4 — Google style now or in Phase 156

| Option | Description | Selected |
|--------|-------------|----------|
| Style now, with `--no-headings` | STYLE-06 and VERIFY-01 are both `[x]` COMPLETE and assert 0 wanted edits over the landed set, which contains all three Area C files. | ✓ |
| Leave it for Phase 156 | Smaller diff, but knowingly regresses two complete requirements. | |

**User's choice:** Style now, with `--no-headings`.
**Notes:** The draft self-labelled this its weakest recommendation and reached it for an incomplete
reason (Phase 156's judge hunk count). The real reason is the sweep3 landed-set-zero invariant, which
the draft never named. Mandatory riders added: STYLE-04's `--no-headings`, and the tight em-dash canon
per STD-02's recorded conflict with ten milestone-audit validators.

---

## Question 5 — The Windows App MSIX

| Option | Description | Selected |
|--------|-------------|----------|
| Pin by URL + SHA256, don't commit | Preserves RE-237's intent (a pinned, verifiable version) without the binary. One-line scope note. | ✓ |
| Commit with Git LFS | Introduces LFS to a repo that has never used it; every clone, all 18 workflows and HARN-04's fresh-clone re-audit would need it. | |
| Amend RCP-09 to exclude binaries | Cleanest as a rule, but spends an owner-gated amendment on something URL+hash handles in scope. | |

**User's choice:** Pin by URL + SHA256.
**Notes:** Neither the draft's Area A3 nor A4 noticed the binary at all; A4 opened the
`.gitattributes` question and answered "change nothing".

---

## Question 6 — Asset access for published (`.docx` / SharePoint) readers

| Option | Description | Selected |
|--------|-------------|----------|
| Add a provenance section to RE-237 | Names the repo path, the upstream pinned SHA, and how to request the two pilot-only scripts. Keeps the owner's `assets/` location ruling intact. | ✓ |
| Accept the gap, record it | Zero work, but ships a recipe whose executable half is invisible to its published audience. | |
| Reopen the RCP-09 location ruling | Reverses an explicit owner ruling that already weighed three alternatives. | |

**User's choice:** Add a provenance section to RE-237.
**Notes:** Nobody asked this when the location was ruled. The bundle README claims it "contains the
entire Approved documentation corpus" and grounds Copilot Studio, yet `assets/` can never enter it.

---

## Question 7 — The RE-224 line-count pin

| Option | Description | Selected |
|--------|-------------|----------|
| Retire the equality pin for grep content needles | The instrument `151-05-SUMMARY.md:450` explicitly recommends. Idempotent under Phase 156's restyle. | ✓ |
| Amend the constant to the new count | The draft's original recommendation. Its cited precedent does not exist, and Phase 156 would stale it again. | |
| Make the edits line-count-neutral | Subordinates three mandated prose corrections to an arithmetic target. | |

**User's choice:** Retire the equality pin.
**Notes:** This reverses the discussion draft. Three separate legs of the draft's reasoning failed:
D-48 (the governing Phase 151 precedent) was unmentioned, the HARN-02 citation used to dismiss the
frozen-read option was the wrong requirement, and `git log -S` proves `EXPECTED_LINE_COUNT` has been
touched by exactly one commit ever — its authoring commit. The decisive argument was staleability:
RE-224 is in Phase 156's batch-10 set, so amending the number buys one phase and then demands a second
amendment of the same predecessor constant in the same milestone.

---

## Question 8 — Freshness re-stamping

| Option | Description | Selected |
|--------|-------------|----------|
| Re-stamp only what this phase edits | The four documents Phase 155 touches; leave the rest of the past-due corpus alone. | ✓ |
| Hold the line on owner ruling 4 | Consistent as literally worded, but ships rewritten Approved documents with stale dates. | |
| Re-stamp RE-237 only | The other three receive targeted reconciliations rather than rewrites. | |

**User's choice:** Re-stamp only what this phase edits.
**Notes:** `licensing-matrix.md` is 52 days past its own `review_by`. Owner ruling 4 scoped out a
corpus-wide sweep; it does not exempt a file this phase rewrites (`151-CONTEXT.md:277` convention).

---

## Question 9 — Third-party attribution

| Option | Description | Selected |
|--------|-------------|----------|
| Per-asset attribution headers + `NOTICE` file | Each vendored file keeps its upstream header and gains source repo, pinned SHA and retrieval date. | ✓ |
| Reference De-Bloat by URL, vendor only Microsoft's | Honours SEED-002 §D's "still deferred"; costs that step its reproducibility. | |
| Add a `LICENSE` file to the repo first | Correct in principle but a project-level decision outside RCP-09's scope. | |

**User's choice:** Per-asset attribution headers + `NOTICE` file.
**Notes:** `ls LICENSE*` returns nothing — the repo has no licence file, so attribution had no home.
Deliberately avoids deciding what licence *this* repo is under.

---

## Question 10 — Landing branch

| Option | Description | Selected |
|--------|-------------|----------|
| Continue on `v1.22/154-style-landing` | Phases 155-159 stack; milestone merges at HARN-06's close push. Preserves Phase 154 D-33's "master is never touched". | ✓ |
| Merge 154 to `master` first | Earlier CI visibility, but breaks D-33 and fires the close cascade against a partially-landed milestone. | |
| New branch per phase off 154 | Cleaner isolation, but more ceremony than `use_worktrees:false` sequential execution implies. | |

**User's choice:** Continue on the 154 branch.
**Notes:** Measured: `origin/master` is 28 commits behind HEAD, local `master` 11 behind, and there is
no remote branch for the feature branch — so no CI run observes any Phase 155 work until the close
push. The apex is the phase's real gate throughout.

---

## Question 11 — SEED-002 closure

| Option | Description | Selected |
|--------|-------------|----------|
| Close it in Phase 155 | Flip to `status: closed` in the final commit, noting which sections discharged where; carry §B/§D to backlog. | ✓ |
| Close it in Phase 157 with HYG-07 | Keeps seed hygiene in one place; Phase 157 would have to re-derive what 155 discharged. | |
| Leave it planted | Preserves §B/§D, but §A and §C would read as outstanding when done. | |

**User's choice:** Close it in Phase 155.
**Notes:** SEED-002 appears nowhere in REQUIREMENTS.md, ROADMAP.md or STATE.md, yet this phase
discharges its §A and §C in full. HYG-07 exists in this milestone precisely because "a seed that never
closes trains the seed-scan to be ignored."

---

## Claude's Discretion

- Exact wording of RE-237's `[PILOT]` pointer sentence, provided it does not contradict
  `REQUIREMENTS.md:17`.
- The specific grep needles replacing `V-135-RECIPE`'s equality assertion.
- Commit message wording, provided the registration commit names the vendored upstream SHA and the
  amendment cites `c3733928 → f0b7aa90`.
- `NOTICE` file granularity.
- Filenames for the currently-unnamed assets, provided they derive from owner-supplied artifacts.

## Deferred Ideas

- A corpus-wide evidence-label taxonomy (`[SOURCED]`/`[ASSUMED]`/`[UNVERIFIED]`/`[PILOT]`) — Phase 157.
- A `LICENSE` file for the repository — project-level.
- A merge-marker/conflict-marker standing validator — still uncovered since Phase 154.
- `V-132-HUBSNOTWIRED` / `V-137-HUBSNOTWIRED` regex repair for relative recipe links.
- `.gitattributes * text=auto eol=lf` — already deferred to Phase 159.
- SEED-002 §B (L2 kiosk-popup triage runbook, Windows App child-process reference row, Credential
  Guard/CredSSP, Intune Remote Help unattended control).
- SEED-002 §D (kiosk-class licensing/hardware standard, AVD host-pool Entra SSO, STORIS SCiX
  ClickOnce kiosk).
- `CLAUDE.md:305` "Project Structure" staleness once `assets/` is founded.
- A generalized fenced-block ↔ file byte-equality check for duplicated payloads.
