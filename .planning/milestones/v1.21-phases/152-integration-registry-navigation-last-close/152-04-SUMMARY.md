---
phase: 152-integration-registry-navigation-last-close
plan: 04
subsystem: docs-navigation
tags: [inbound-links, navigation-last, commit-b, terminal-gates, needle-spec, no-baseline]

requires:
  - phase: 152-integration-registry-navigation-last-close
    provides: "Plan 01 Commit A 74917b7d — registry at 236 Approved rows, filename map at 236, both canaries at 236"
  - phase: 152-integration-registry-navigation-last-close
    provides: "Plan 02 real bundle run at --version=v1.21.0 — 236 CONVERT-OK / 236 GUARD-OK, parity 0/0/0"
  - phase: 152-integration-registry-navigation-last-close
    provides: "Plan 03 both hub files wired and left MODIFIED AND UNCOMMITTED for this plan's Commit B"
provides:
  - "Commit B 4816635b — the phase's second and last content commit, exactly six files"
  - "Four inbound links, each deferred by its own predecessor phase specifically because Phase 152 owns it (D-51..D-55)"
  - "A Version History row on docs/admin-setup-apv1/01-hardware-hash-upload.md citing INT-04, with no frontmatter re-stamp"
  - "Three terminal gates green at the Commit B tree: C17 236/0/0, link checker 0/0/0, apex 101 PASS / 0 FAIL / 0 SKIPPED"
  - "A byte-unchanged proof against phase base 56f55307 over the authored documents, the two named validators, the audit allowlist and the whole scripts/validation/ tree"
  - "A fully pre-specified check-phase-152.mjs needle-spec on two surfaces — this summary and STATE.md's Plan-Time Research Flags block"
affects: [153 harness close]

actuals:
  tokens: 41000
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "A commit contract that derives its file list from measured working-tree state and asserts the count before staging, rather than pinning the list at plan time"
    - "An anchor fragment is derived by running the target heading read off disk through the checker's own three-line slug rules, never retyped"

key-files:
  created:
    - .planning/phases/152-integration-registry-navigation-last-close/152-04-SUMMARY.md
  modified:
    - docs/operations/patch-management/06-windows-driver-firmware-updates.md
    - docs/operations/app-lifecycle/00-overview.md
    - docs/admin-setup-apv2/02-etg-device-group.md
    - docs/admin-setup-apv1/01-hardware-hash-upload.md
    - docs/index.md
    - docs/operations/00-index.md
    - .planning/STATE.md

key-decisions:
  - "The 01-windows-wufb-rings.md companion link is deferred on the milestone-level Phase-146 isolation constraint, explicitly NOT on a validator-pin premise, which was measured and found false"
  - "The apv1 hardware-hash link lands as a See Also bullet plus a Version History row, with the frontmatter deliberately not re-stamped"
  - "This phase authors zero validators; a third option — a non-leaf validator authored here — existed and was declined, not overlooked"
  - "A red gate would have been fixed in the content; the audit allowlist's two empty buckets were never touched"

patterns-established:
  - "The terminal gate set is three, not two — the apex is the only gate that runs the milestone audit and therefore the live corpus walk over newly written prose"

requirements-completed: [INT-04, INT-05, INT-06]

duration: 35min
completed: 2026-08-27
status: complete
---

# Phase 152 Plan 04: Inbound Links, Terminal Gates and the Needle-Spec Handoff Summary

**The four inbound links every predecessor deferred to this phase landed in Commit B `4816635b` alongside the two hub files Plan 03 left dirty — one commit, exactly six files, taking the phase to exactly two content commits — and all three terminal gates are green at that tree: C17 at 236 files / 0 violations, the link checker at zero of both failure classes, and the apex at 101 PASS / 0 FAIL / 0 SKIPPED.**

## Performance

- **Duration:** ~35 min
- **Tasks:** 3 of 3
- **Commits:** 2 — one content commit (`4816635b`, Commit B) and one planning-artifact commit, never folded together.

## The four inbound links

Each row records the source path, the host section, the target path, and where a fragment is involved, the derivation.

| # | Decision | Source | Host section | Target |
|---|---|---|---|---|
| 1 | D-51 | `docs/operations/patch-management/06-windows-driver-firmware-updates.md` | `## Related Resources` (line 782, between the H2 at 773 and the next H2 at 785) | `../firmware-bios/00-overview.md` |
| 2 | D-52 | `docs/operations/app-lifecycle/00-overview.md` | `## Related Resources` (line 211, between the H2 at 197 and the next H2 at 214) | `../patch-management/08-windows-app-updates.md` |
| 3 | D-53 | `docs/admin-setup-apv2/02-etg-device-group.md` | the supported-app-types sentence, line 129 | `../operations/patch-management/08-windows-app-updates.md#enterprise-app-management-store-apps-and-winget--routing` |
| 4 | D-54 | `docs/admin-setup-apv1/01-hardware-hash-upload.md` | `## See Also` (line 188, between the H2 at 184 and `## Version History` at 193) | `../operations/firmware-bios/01-windows-dfci.md#prerequisites-and-disqualifiers` |

### The two fragment derivations, shown

Both were derived by reading the heading text off disk at its measured line and running it through the checker's own three-line slug rules — lowercase, delete every character outside `[a-z0-9 _-]` **in place**, then map each remaining space to one hyphen, never collapsing consecutive hyphens (`check-nav-hub-links.mjs:121-126`). Neither was retyped.

**Fragment 1** — `docs/operations/patch-management/08-windows-app-updates.md:252`

```
heading: "Enterprise App Management, Store Apps and WinGet — Routing"
lowercase                     -> enterprise app management, store apps and winget — routing
delete [^a-z0-9 _-] in place  -> enterprise app management store apps and winget  routing
                                 (the comma and the em dash are DELETED, and because the em dash
                                  carried a space on each side, two spaces survive where it stood)
spaces -> hyphens             -> enterprise-app-management-store-apps-and-winget--routing
```

The derivation agrees with the plan's expected value, **double hyphen included**. The checker never collapses consecutive hyphens, and its own comment at `:117-120` names this exact artefact as the reason.

**Fragment 2** — `docs/operations/firmware-bios/01-windows-dfci.md:59`

```
heading: "Prerequisites and Disqualifiers"
lowercase                     -> prerequisites and disqualifiers
delete [^a-z0-9 _-] in place  -> prerequisites and disqualifiers   (nothing to delete)
spaces -> hyphens             -> prerequisites-and-disqualifiers
```

### Link 3 preserved the phrase rather than replacing it

`grep -c 'Microsoft Store (WinGet)'` on `docs/admin-setup-apv2/02-etg-device-group.md` returns **1** after the edit, as before it: the phrase became the link text, it was not deleted or reworded. The other app types on that sentence are still unlinked. The parenthetical inside the link text is safe under the checker's link grammar — the link text carries no `]` and the target carries no `)`.

### Link 4 was not a one-line edit

`docs/admin-setup-apv1/01-hardware-hash-upload.md` is `RE-077`, C17-enrolled, and carries its own `## See Also` and `## Version History` sections. Three sub-decisions, each recorded:

- **Host section:** the new bullet lands in `## See Also`, matching that section's existing bare `- [Text](path)` bullet shape. This is an *outbound* link from the enrolled file, so the prior rule that says "link the file, not a heading anchor" does not apply — that rule governs links **into** that file, and the hand-forward describes this one as going to the prerequisites.
- **Version History:** one row landed, at the top of the reverse-chronological table, dated at execution and citing the requirement:

  ```
  | 2026-08-27 | Phase 152 INT-04: added a See Also link to the DFCI guide's prerequisites and disqualifiers section. | -- |
  ```

  The Author cell uses `--`, the placeholder the table's own most recent existing row uses. The older row uses an em dash; both forms are present in the file, and the newer convention was followed.
- **Frontmatter:** not re-stamped. Proved: the first 12 lines are byte-identical to the `56f55307` version, by `diff` against `git show 56f55307:<path>`. The file is past its `review_by`, and re-stamping it belongs to the corpus-wide past-due population deferred to a hygiene milestone.

### Per-file edit size and line-ending class

Every replacement asserted its own match count of exactly 1 **before** writing, so a terminator mismatch would have raised rather than silently zero-matching. The terminator was detected per file from its own bytes and reused for every inserted line.

| File | Terminator detected | Terminator after | `git diff --numstat 56f55307` |
|---|---|---|---|
| `06-windows-driver-firmware-updates.md` | LF | LF | `2  0` |
| `app-lifecycle/00-overview.md` | **CRLF** | CRLF | `2  0` |
| `admin-setup-apv2/02-etg-device-group.md` | LF | LF | `1  1` |
| `admin-setup-apv1/01-hardware-hash-upload.md` | LF | LF | `2  0` |

Single-digit changed-line counts on all four — no whole-file rewrite. The one deleted line is link 3's in-place sentence replacement.

### The prose constraint, measured per file

The milestone audit's live corpus walk compiles four patterns case-insensitively. Run with those patterns, case-insensitively, over each of the four host files:

| Pattern | `06-...` | `app-lifecycle/00` | `apv2/02` | `apv1/01` |
|---|---|---|---|---|
| `Autopatch rings` | 0 | 0 | 0 | 0 |
| `System Center` | 0 | 0 | 0 | 0 |
| `SCCM[^.]*Intune` | 0 | 0 | 0 | 0 |
| `SafetyNet[^.]*compliance` | 0 | 0 | 0 | 0 |
| bare `SCCM` | 0 | 0 | 0 | 0 |

Confirmed end to end rather than by grep alone: the apex reports `V-144-AUDIT-HARNESS ... PASS`, and the apex is the only gate that actually executes that walk.

## The `01-windows-wufb-rings.md` deferral, with its ground recorded verbatim

The companion site for the D-51 reciprocal link is **deferred**, and the ground is recorded so the next phase inherits the reasoning rather than the conclusion.

- **The reason it is deferred:** the ROADMAP and STATE both record, as a Phase 146 hard constraint, that Phase 146 is the **only phase in v1.21 that edits `docs/operations/patch-management/01-windows-wufb-rings.md`** and that its stub-and-move surgery must stay isolated. That constraint is milestone-level and still in force.
- **The reason it is NOT deferred:** it is *not* true that the file's validator pins bar a firmware link. `check-phase-54.mjs` is the only validator naming that file, and its bare-ring negative scans word-boundary ring tokens with a preceding-40-character qualifier window — a Related Resources bullet linking `../firmware-bios/00-overview.md` contains no ring token at all and could not fire it. Claiming otherwise would be a fabricated premise, and this plan does not make one.
- **The routing already exists transitively:** `06-windows-driver-firmware-updates.md` already links to `01-windows-wufb-rings.md` in its Related Resources, and this plan added the firmware-bios link to `06`, so the path from the rings guide to the firmware domain is one hop.

Proved untouched: `git diff --quiet 56f55307 -- docs/operations/patch-management/01-windows-wufb-rings.md` exits **0**.

Also untouched by design, and proved the same way: `docs/admin-setup-apv2/03-device-preparation-policy.md`, the third WinGet site, which stays on the backlog per Phase 148's D-64. `git diff --quiet 56f55307 -- <path>` exits **0**.

## Commit B

**SHA `4816635b`** — `docs(152): navigation-last close -- both hub surfaces plus the four deferred inbound links`

`git show --pretty=format: --name-only HEAD` lists exactly six paths and nothing else:

```
docs/admin-setup-apv1/01-hardware-hash-upload.md
docs/admin-setup-apv2/02-etg-device-group.md
docs/index.md
docs/operations/00-index.md
docs/operations/app-lifecycle/00-overview.md
docs/operations/patch-management/06-windows-driver-firmware-updates.md
```

`6 files changed, 42 insertions(+), 3 deletions(-)`. The six were staged **individually by explicit path** — no `git add -A`, no `git add .`, no directory-level stage — because a concurrent unrelated documentation workstream held uncommitted edits in the same tree throughout this run.

The file list was **derived, not assumed**: `git status --porcelain -- docs/` was enumerated and asserted to be exactly six lines before anything was staged. It listed the four inbound-link host files plus `docs/index.md` and `docs/operations/00-index.md`, matching the contract.

```
$ git log --oneline 56f55307..HEAD -- docs/
4816635b docs(152): navigation-last close -- both hub surfaces plus the four deferred inbound links
74917b7d docs(152): register RE-226..RE-236, regenerate filename map, bump both canaries to 236
count=2
```

Exactly two content commits for the phase, as D-01 and D-03 require. `git status --porcelain -- docs/` is empty after the commit, and `git diff --diff-filter=D --name-only HEAD~1 HEAD` is empty — the commit deleted nothing.

## The three terminal gates, verbatim, each run as its own invocation

Run **after** Commit B. The apex was run alone, not combined with any other command, because a URL-fragment or line-insertion change can trip line-pinned exemptions and interleaving makes attribution ambiguous.

### Gate 1 — full-corpus C17

```
$ node scripts/validation/c17-eee-contract.mjs
C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0
C17 summary: 236 files checked, 0 with violations, 0 total violations
exit 0
```

### Gate 2 — the corpus-wide link and anchor checker

```
$ node scripts/validation/check-nav-hub-links.mjs
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
exit 0
```

Both newly authored anchor fragments resolve under this gate. Its header states it exits 0 only on zero failures, with no allowlist, ratchet file or expected-failure list of any kind, so this result admits no baseline by construction.

### Gate 3 — the apex, run alone, at the Commit B SHA

`git rev-parse HEAD` **immediately before** the invocation returned:

```
4816635bd55ebddc6fb595d4d9009a7477e8465f
```

which is Commit B. `git rev-parse HEAD` immediately after the run returned the same value — the tree did not move under the gate.

```
$ node scripts/validation/check-phase-144.mjs
...
[AUDIT-HARNESS/101] V-144-AUDIT-HARNESS: v1.20-milestone-audit.mjs exits 0 (current-milestone harness) PASS
[SELF/101] V-144-SELF: CHAIN_PHASES does NOT include 144; CHAIN_SKIP is empty Set PASS

Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)
```

**101 pass, 0 fail, 0 skipped** — the value it held at the phase base. Zero skips, so no check was silently unmeasured. This is the only gate that executes the milestone audit and therefore the only one that runs the live corpus walk policing the new hub and link prose.

**No gate was red at any point, so no fix of any kind was applied to green one.** No entry was added to any allowlist, ratchet or expected-failure list.

## The two 236s, named apart from each other

They are different objects that collide numerically, and the collision is live enough to mislead a reviewer, so every appearance above is labelled.

- **236 = the C17 *file* count.** `c17-eee-contract.mjs` reports 236 files checked, 0 with violations. This number is **unchanged from before the phase**, and that is why it is quoted: it is the cheapest observable proving no operations document accidentally acquired a `doc_id`, since acquiring one would enroll the file and move the count to 237. INT-02 held.
- **236 = the registry *row* count.** `grep -c '^| RE-' docs/_registry/RE-index.md` returns 236, and that number **did** change in this phase — Plan 01 moved it from 225 to 236.

One count held constant to prove a negative; the other grew by eleven to deliver the phase.

## Byte-unchanged, proved per path against the phase base

Every assertion below is `git diff --quiet 56f55307 -- <path>`, measured against the **phase base commit**, never against the working tree at one instant — a validator edited and committed mid-phase would show clean under a bare status or `git diff --stat`.

### The eleven documents Phases 146-151 authored

| # | Path | Result |
|---|---|---|
| 1 | `docs/operations/firmware-bios/00-overview.md` | UNCHANGED |
| 2 | `docs/operations/firmware-bios/01-windows-dfci.md` | UNCHANGED |
| 3 | `docs/operations/firmware-bios/02-dell-bios-configuration.md` | UNCHANGED |
| 4 | `docs/operations/firmware-bios/03-hp-bios-configuration.md` | UNCHANGED |
| 5 | `docs/operations/firmware-bios/04-lenovo-bios-configuration.md` | UNCHANGED |
| 6 | `docs/operations/patch-management/05-linux-update-delivery.md` | UNCHANGED |
| 7 | `docs/operations/patch-management/06-windows-driver-firmware-updates.md` | **CHANGED — by this plan's own mandated D-51 edit. See Deviation 1.** |
| 8 | `docs/operations/patch-management/07-windows-autopatch.md` | UNCHANGED |
| 9 | `docs/operations/patch-management/08-windows-app-updates.md` | UNCHANGED |
| 10 | `docs/recipes/05-enterprise-update-plan.md` | UNCHANGED |
| 11 | `docs/reference/firmware-oem-matrix.md` | UNCHANGED |

Ten of eleven byte-unchanged; the eleventh changed by exactly the two added lines this plan was ordered to add, and its full diff is reproduced in Deviation 1.

### The four validator and allowlist results, each named

| Path | Result | How it is recorded |
|---|---|---|
| `scripts/validation/check-phase-132.mjs` | UNCHANGED | **SC#5's subject** — the frozen recipe-hub validator, never edited |
| `scripts/validation/check-phase-137.mjs` | UNCHANGED | **Extra** — strictly stronger than SC#5 requires, not the requirement |
| `scripts/validation/v1.20-audit-allowlist.json` | UNCHANGED | no accepted-violation baseline introduced |
| `scripts/validation/` (whole tree) | UNCHANGED | this phase authored zero validators |

`ls scripts/validation/check-phase-152.mjs` fails with `No such file or directory` — the spec was written, the validator was not.

The allowlist's **two empty buckets are still empty**, read out of the file itself: `c11_ops_exemptions` = 0 entries and `c16_missing_endpoint_exemptions` = 0 entries. Those are the reflex fix for the two failure classes this phase could actually cause, and neither was filled. Since the whole file is byte-unchanged, no other bucket moved either.

### The negative needle — the three troubleshooting hubs

```
$ grep -l 'recipes/05-' docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md
(no output)
```

None of the three references the new recipe path. The SC#5 content precondition holds.

## The phase-wide changed-path set

```
$ git diff --name-only 56f55307 HEAD -- docs/ scripts/ ':!scripts/docs-style/'
docs/_registry/RE-index.md
docs/admin-setup-apv1/01-hardware-hash-upload.md
docs/admin-setup-apv2/02-etg-device-group.md
docs/index.md
docs/operations/00-index.md
docs/operations/app-lifecycle/00-overview.md
docs/operations/patch-management/06-windows-driver-firmware-updates.md
scripts/pipeline/build-filename-map.mjs
scripts/pipeline/build-publish-bundle.mjs
scripts/pipeline/filename-map.md
count=10
```

**Ten paths, counted and listed:** the registry (1), the four inbound-link host files (4), the two hub files (2), the two pipeline scripts (2), the generated filename map (1). That is the exact set the plan enumerates, though the plan's own arithmetic calls it nine — see Deviation 2.

The unfiltered form of the same command returns **23** paths. The additional thirteen all live under `scripts/docs-style/` and were committed by a **concurrent, unrelated documentation workstream** in commits `0332a61c` and `9b3007c1`, both of which landed inside this phase's window and neither of which is a Phase 152 commit. Attribution is measured, not assumed:

```
$ git log --oneline 56f55307..HEAD -- scripts/docs-style/
9b3007c1 feat(docs-style): judge-packets.py, the 406 verdicts, and the rule rows they overturned
0332a61c fix(docs-style): tighten three over-firing verifier rules, close the sweep's idempotency hole
```

Nothing belonging to that workstream was staged, committed, reverted or tidied by this plan. See Deviation 3 for the working-tree half of the same situation.

## SC#5, discharged as two explicitly named obligations

Recorded by name, never silently, per D-59.

**Obligation 1 — the content precondition, discharged HERE.** All four halves hold and each is evidenced above:

1. the three troubleshooting hubs stay unwired to `recipes/05-` (the `grep -l` returns nothing);
2. the master hub carries both the Recipe #5 table row and the `enterprise update plan` quick-nav fragment on a single anchor-matching line (match count exactly 1);
3. the frozen recipe-hub validator `check-phase-132.mjs` is byte-unchanged against the phase base;
4. both corpus gates exit 0 — C17 at 236/0/0 and the link checker at 0/0/0.

**Obligation 2 — the enforcement, handed FORWARD to Phase 153.** The frozen validator's generic recipes arm never fires for later recipes, so the new recipe is enforced by nothing today. The fix is a successor validator authored in Phase 153, never an edit to the frozen one. The full spec is the next section.

## The declined third option

A third option existed and was **declined, not overlooked**. The first draft of this phase's decisions presented a false binary between "author the leaf here" and "hand it forward".

The third option was to author a **non-leaf** validator in this phase. Two non-leaf validators in this tree were authored inside content phases: `c17-eee-contract.mjs` in a v1.15 content phase and `check-nav-hub-links.mjs` in a v1.16 navigation-content phase — a navigation validator authored inside the navigation phase, the exact analog of what SC#5 asks. Neither is a `check-phase-NN` leaf, so neither sits inside the harness requirement's atom, and either would have satisfied SC#5's literal "authored additively" wording with **no owner ratification at all**.

**It was declined because the Phase 153 leaf would duplicate it.** Two validators asserting the same needles is a maintenance liability, and the leaf is already assigned: the harness requirement gives Phase 153 the whole leaf range plus the apex, with a chain range generated by arithmetic. The precedent for handing the leaf forward is unanimous across three milestones, and this phase's exact structural twin committed the handoff rather than the validator.

## The needle-spec for `check-phase-152.mjs` — the authoritative source Phase 153 copies

**Transcribe every literal below. Compose nothing at execution time.** The one exception in this phase's rules — a canary equality that must be computed from the registry — does not appear in this spec; that object lives in Plan 01 and the two rules do not conflict here.

Every literal below was verified present on disk at the Commit B tree before it was transcribed here, with the grep whose result is given in the last column. Phase 153 implements; it does not re-derive.

### Shape

Lightweight leaf. **No chain** — the chain lives only in the apex. Both chain constants are empty, matching the twin's own two-line invariant:

```js
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
```

### Header

The header must state that the needle is **fully pre-specified**, copied from this summary (`152-04-SUMMARY.md`) and from the `.planning/STATE.md` Plan-Time Research Flags entry, and **not re-derived**.

It must also carry the corrected-literal warning: the frozen recipe-hub validator `scripts/validation/check-phase-132.mjs` has an existing not-wired pattern that **does not cover** the new recipe path `recipes/05-`, and it **must not be edited**. The coverage is added **additively** in the new leaf.

### Needles — master hub, `docs/index.md`

| Needle | Literal | Verified at Commit B |
|---|---|---|
| recipes-table row | a table-row line whose link target is `recipes/05-enterprise-update-plan.md` | `grep -c` = 1 |
| quick-nav bullet, **line-scoped** | extract every line matching the anchor regex below, assert the match count is exactly **1**, then test the fragment `enterprise update plan` against **that isolated line only** | anchor match count = 1; fragment on the isolated line = 1 |
| sub-heading literal | `### Firmware and BIOS Governance` | `grep -c '^### Firmware and BIOS Governance$'` = 1 |

The anchor regex, transcribed exactly:

```
^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)
```

A whole-file substring test for `enterprise update plan` false-matches lines above the bullet, which is why the twin's own header documents this. The check must extract the single matching line and test that line in isolation.

### Needles — operations index, `docs/operations/00-index.md`

| Needle | Literal | Verified at Commit B |
|---|---|---|
| heading literal | `## Firmware and BIOS Governance` | `grep -c '^## Firmware and BIOS Governance$'` = 1 |
| Patch fragment 1 | `patch-management/05-linux-update-delivery.md` | `grep -c` = 1 |
| Patch fragment 2 | `patch-management/06-windows-driver-firmware-updates.md` | `grep -c` = 1 |
| Patch fragment 3 | `patch-management/07-windows-autopatch.md` | `grep -c` = 1 |
| Patch fragment 4 | `patch-management/08-windows-app-updates.md` | `grep -c` = 1 |
| Version History row | a row citing `INT-04` | `grep -c 'INT-04'` = 1, at line 97, inside the Version History table |

### Needle — the filename map, `scripts/pipeline/filename-map.md`

All eleven identifiers present: `RE-226`, `RE-227`, `RE-228`, `RE-229`, `RE-230`, `RE-231`, `RE-232`, `RE-233`, `RE-234`, `RE-235`, `RE-236`.

Verified at Commit B, one grep per identifier, all eleven returning 1.

**Carrying this needle is not optional.** Omitting it would be a straight regression against the structural twin `check-phase-132.mjs`, which carries a `V-132-FILENAMEMAP` assertion of exactly this class.

### Negative needle — the three troubleshooting hubs

`docs/common-issues.md`, `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` must **not** contain the fragment `recipes/05-`.

Verified at Commit B: `grep -l 'recipes/05-'` over the three paths returns nothing.

### Self-reference guard

The same shape the twin uses: the validator asserts its own file is present at its own path, so a renamed or moved leaf fails loudly rather than silently passing. The twin pairs this with the dual chain invariant — `CHAIN_PHASES` does not include the phase number, and `CHAIN_SKIP` is an empty Set.

### Both handoff surfaces

1. **`.planning/STATE.md`, `### Plan-Time Research Flags` block** — one entry addressed to Phase 153, naming `check-phase-152.mjs`, listing every needle above in compressed form, naming this summary as the full spec, and stating that the frozen recipe-hub validator is never edited. Written idempotently: the block was grepped for an existing entry before writing, `grep -c 'check-phase-152' .planning/STATE.md` returned **0**, and one entry was added. It now returns exactly **1**, at line 629, which falls between the `### Plan-Time Research Flags` heading at line 622 and the next `###` heading, `### Pending Todos`, at line 631. Re-running the task replaces rather than appends.
2. **This summary**, in full, as the authoritative spec.

A spec living only in a summary is not on the surface a Phase 153 planner reads; a spec living only in STATE is too compressed to implement from. Both are required and both exist.

## INT-06's unclassified edge — residual surfaced, not dismissed

The deterministic probe could not classify INT-06's edge family, and the residual is recorded rather than waved away.

"No accepted-violation baseline" is **operationalized** here as two things: byte-equality on the named audit allowlist `scripts/validation/v1.20-audit-allowlist.json`, and the link checker's structural no-baseline guarantee, which its own header states. Both hold.

**The residual:** there is no test that would catch a baseline introduced *elsewhere* in the validation tree — a new allowlist file under a different name, or an exemption added to a different validator's inline constants. The closest available proxy is asserted instead: the whole `scripts/validation/` tree is byte-unchanged against the phase base, which forecloses every in-tree route. It does not foreclose a baseline introduced outside that tree. **Residual risk accepted and recorded, not dismissed.**

## Deviations from Plan

**1. [Rule 1 — plan self-inconsistency] `06-windows-driver-firmware-updates.md` is simultaneously one of the eleven documents Task 2 asserts byte-unchanged and one of the four files Task 1 orders edited**

- **Found during:** Task 2, the eleven-document byte-unchanged sweep.
- **Issue:** Task 2's acceptance criterion reads "`git diff --quiet 56f55307 -- <path>` exits 0 for each of the eleven authored documents". `docs/operations/patch-management/06-windows-driver-firmware-updates.md` is item 7 of that eleven — it was authored in Phase 146 — **and** it is the D-51 host file Task 1 mandates a Related Resources bullet be appended to. The two criteria cannot both hold for any correct execution of this plan. The same overlap makes the plan's `<verification>` block internally contradictory: it lists both "eleven authored documents byte-unchanged" and "Commit B contains exactly 6 files", one of which is that document.
- **Resolution:** Task 1's explicit instruction governs; the byte-unchanged sweep is reported honestly at ten of eleven rather than fudged to eleven. The substantive claim the criterion protects — that no authored document acquired content beyond what this phase was ordered to add — is asserted by reproducing the entire diff of the one exception:

  ```diff
  @@ -779,6 +779,8 @@
     workload migration sequence, including the Windows Update workload slider
   - [Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md) — Windows
     Autopatch prerequisites and co-management workload sequencing
  +- [Firmware and BIOS Governance](../firmware-bios/00-overview.md) — DFCI eligibility, per-OEM
  +  BIOS configuration paths, and the OEM capability matrix
  
   ## External References
  ```

  Two added lines, zero deleted, inside `## Related Resources`, and nothing else. The other ten are byte-identical.
- **Follow-on:** a future close phase should scope the byte-unchanged sweep to "the authored documents **minus** this phase's own declared host files", because the overlap is structural — a navigation phase that wires inbound links necessarily edits documents an earlier phase authored.

**2. [Rule 1 — plan arithmetic error] The plan calls the changed-path set "exactly nine paths" while enumerating ten**

- **Found during:** Task 2, the changed-path assertion.
- **Issue:** the criterion reads "lists exactly nine paths: the registry, the two pipeline scripts, the generated filename map, the two hub files and the four inbound-link host files". That enumeration sums to 1 + 2 + 1 + 2 + 4 = **ten**. The measured set matches the enumeration exactly and is ten, so the prose figure, not the execution, is wrong.
- **Resolution:** the enumeration governs; the count is reported as measured, at ten, with the full list shown above. Every one of the ten is accounted for by name.

**3. [Rule 3 — verification command over-reaches onto a concurrent workstream's surface] The plan's `git status --porcelain -- docs/ scripts/` emptiness check cannot pass, for reasons outside this phase**

- **Found during:** Task 1, the post-commit cleanliness assertion.
- **Issue:** a concurrent, unrelated documentation workstream held uncommitted edits under `scripts/docs-style/` throughout this run, and committed two further changesets there inside the phase window. The bare `git status --porcelain -- docs/ scripts/` therefore reports lines that this plan neither created nor may touch. Both predecessor plans in this phase hit the identical failure and handed the warning forward.
- **Resolution:** not staged, not committed, not reverted, not tidied. Reverting another workstream's uncommitted edits would destroy work that exists nowhere else. **The narrowed forms that isolate this plan's real claim were run instead, and are named:**
  - `git status --porcelain -- docs/` — **empty** after Commit B. This is the claim that matters: no content file is left dirty.
  - `git diff --quiet 56f55307 -- scripts/validation/` — **exit 0**. No validator moved.
  - `git diff --name-only 56f55307 HEAD -- docs/ scripts/ ':!scripts/docs-style/'` — ten paths, all this phase's own.
  - `git log --oneline 56f55307..HEAD -- scripts/docs-style/` — two commits, both from the other workstream, neither a Phase 152 commit.

  What fails is only the claim that the *whole* `scripts/` tree is clean, and that is false for a reason this phase did not cause and must not fix. No false red is reported and no false green is claimed.
- **Staging discipline applied:** every one of the six Commit B paths was staged individually by explicit path. No `git add -A`, no `git add .`, no directory-level stage was used at any point in this plan.

## Recorded Facts

- **The 152-PATTERNS.md Patch-table coordinate is wrong and was not used.** It labels its excerpt `docs/operations/00-index.md:301-308` while showing `docs/index.md` content. Plan 03 recorded the same finding independently. Every file this plan edited was re-read immediately before editing; no edit was made from a coordinate read earlier in the run.
- **Line-ending classes are not uniform in this corpus and were detected per file rather than assumed.** Of the four host files, three are LF and `docs/operations/app-lifecycle/00-overview.md` is CRLF. Each inserted line used its own file's detected terminator, and each replacement asserted a match count of exactly 1 before writing — a terminator mismatch would have raised, not silently zero-matched.
- **Both anchor targets pre-exist; only the references to them are new.** `#enterprise-app-management-store-apps-and-winget--routing` resolves to the heading at `08-windows-app-updates.md:252` and `#prerequisites-and-disqualifiers` to the heading at `01-windows-dfci.md:59`. Neither heading was created, renamed or moved by this phase.
- **Git emits `LF will be replaced by CRLF` warnings for the three LF host files** on `add` and on `diff`. This is the repository's standing `core.autocrlf` behaviour with no `.gitattributes`, not an artefact of this plan. The staged `--numstat` matched the worktree `--numstat` exactly (2/0, 1/1, 2/0), so no whole-file normalisation entered the commit.
- **The apex was measured at 101/0/0 both before this plan (Plan 03, pre-Commit-B working tree) and after Commit B.** The plan required the post-commit measurement specifically, and the pre-commit reading was not treated as discharging it.

## Known Stubs

None. Every link this plan wrote resolves to a file that exists on disk, and both anchor fragments resolve to headings that exist, under a checker that admits no baseline.

## Threat Flags

None. This plan added no network endpoint, no auth path, no schema change at a trust boundary, and no package-manager install. The register's mitigations were applied and each is evidenced above:

- **T-152-18** (allowlist elevation) — byte-equality against the phase base on `v1.20-audit-allowlist.json` and on the entire `scripts/validation/` tree, plus the recorded fact that no gate was ever red, so no absorption was even tempting. Both named empty buckets read 0 entries.
- **T-152-19** (frozen validator tampering) — `check-phase-132.mjs` byte-unchanged, proved per path against the base commit rather than by a working-tree diff.
- **T-152-20** (anchor spoofing) — both fragments derived from the target headings on disk with the checker's own slug rules, the double-hyphen artefact called out in advance and reproduced by the derivation, and the link checker reporting zero corpus-link failures.
- **T-152-21** (handoff repudiation) — the spec on two surfaces, the STATE write guarded by a pre-write grep that returned 0 and a post-write grep that returns exactly 1, and every literal transcribed with the grep that verified it.
- **T-152-22** (unmeasured gate class) — three gates, not two; the apex run as its own invocation after the last commit, at the Commit B SHA, reporting zero skips.
- **T-152-23** (third content commit) — `git log --oneline 56f55307..HEAD -- docs/` returns exactly 2 after every task, and the STATE write was committed as a separate planning-artifact commit.
- **T-152-SC** — vacuous; zero package-manager installs.

## Commits

| Commit | Class | Subject | Files |
|---|---|---|---|
| `4816635b` | **content (Commit B)** | `docs(152): navigation-last close -- both hub surfaces plus the four deferred inbound links` | the six paths listed above |
| *(recorded below)* | planning artifact | `docs(152-04): close the phase — terminal gates green, needle-spec handed to Phase 153` | `.planning/STATE.md`, `.planning/ROADMAP.md`, `152-03-SUMMARY.md`, `152-04-SUMMARY.md` |

The planning commit is deliberately a separate class and was never folded into Commit B. It adds no content commit: `git log --oneline 56f55307..HEAD -- docs/` still returns exactly 2 after it.

## Hand-forward to Phase 153

- **The needle-spec above is complete and verified.** Implement `scripts/validation/check-phase-152.mjs` from it. Do not re-derive a single literal, and do not edit `scripts/validation/check-phase-132.mjs`.
- **The allowlist bump belongs to Phase 153**, not here. `v1.20-audit-allowlist.json` is byte-unchanged from the phase base and its two relevant buckets are empty.
- **The concurrent documentation workstream is still live in this tree.** Narrow every cleanliness check to `docs/` or to `scripts/validation/`, and say which form was run.
- **The twenty legacy operations documents remain unregistered**, and Plan 02 measured the consequence: the eleven new documents link out to nine unregistered `docs/operations/**` targets, five of them to the patch-management overview alone. That is a content-completeness fact about the published library, not a broken-anchor one — the bundle rewrites no links, and the link checker is green.
- **`dist/docs-library-v1.21.0.zip`** is Plan 02's proof artifact and is deliberately named apart from the plain `v1.21` artifact the harness requirement produces in Phase 153.

## Self-Check: PASSED

- All seven files this plan created or modified exist on disk: the four inbound-link host files, both hub files and `.planning/STATE.md`, plus this summary.
- Commit `4816635b` is present in `git log`.
- `git log --oneline 56f55307..HEAD -- docs/` returns exactly 2 after the planning commit — the planning-artifact commit added no content commit.
- `grep -c 'check-phase-152' .planning/STATE.md` returns exactly 1.
- D-66 negative re-checked on both files this plan wrote: no blockquote line at line start outside a code fence in this summary, and the only such lines in `.planning/STATE.md` are pre-existing at lines 32-36, outside this plan's entry at line 629 and carrying no bare-noun platform token.
