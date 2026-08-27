---
phase: 152-integration-registry-navigation-last-close
plan: 03
subsystem: docs-navigation
tags: [navigation-last, nav-hub, operations-index, master-hub, no-commit, c17, link-checker]

requires:
  - phase: 152-integration-registry-navigation-last-close
    provides: "Plan 01 Commit A 74917b7d — registry at 236 Approved rows, filename map at 236, both canaries at 236"
  - phase: 152-integration-registry-navigation-last-close
    provides: "Plan 02 real bundle run at --version=v1.21.0 — 236 CONVERT-OK / 236 GUARD-OK, parity 0 excluded / 0 missing / 0 orphan"
provides:
  - "docs/operations/00-index.md — a sixth H2 domain section, Firmware and BIOS Governance, carrying six Guide/Covers rows including the cross-directory matrix row"
  - "docs/operations/00-index.md — a nine-row Patch and Update Management table, grown from five by four appended rows in filename order"
  - "docs/index.md — a third-level Firmware and BIOS Governance sub-section under Operations, three rows, mirroring the operations-index placement"
  - "docs/index.md — a fifth recipes row for Recipe #5, a fourth Patch sub-table row for Linux, an amended banner clause and an amended single-line recipes quick-nav bullet"
  - "Two Version History rows, one per hub file, at the top of each table"
  - "Both hub files left MODIFIED AND UNCOMMITTED for Plan 04's single Commit B"
affects: [152-04 inbound links and terminal gates, 153 harness close]

actuals:
  tokens: 21500
  tasks: 3
  commits: 0

tech-stack:
  added: []
  patterns:
    - "A hub edit against a CRLF file asserts its own match count before writing, so a terminator mismatch fails loudly instead of zero-matching in silence"
    - "A line-scoped validator assertion is verified by extracting the line to a file and testing fragments against that file, never by a whole-file substring test"

key-files:
  created: []
  modified:
    - docs/operations/00-index.md
    - docs/index.md

key-decisions:
  - "The banner clause landed on the operational-domain paragraph, which measured 143 stripped characters before the edit and 173 after, against a 200 cap; the provisioning-platform paragraph, with eighteen characters of headroom, is byte-identical to the phase base"
  - "The recipes quick-nav bullet was amended in place and never split; its anchor match count is exactly 1 before and after"
  - "The cross-directory matrix row on the operations index is beyond INT-04's literal wording and is the matrix's only operations-side reachability"
  - "The stale four-platform description cells and the Operations quick-nav bullet were left untouched under standing owner rulings"
  - "No commit of any kind, per the plan's commit contract; both hub files are staged for Plan 04's Commit B by being left dirty"

patterns-established:
  - "Navigation is wired only after both the registry atom and a real bundle run have proved the documents exist and are reachable"

requirements-completed: [INT-04]

duration: 25min
completed: 2026-08-27
status: complete
---

# Phase 152 Plan 03: Navigation-Last Summary

**Both index surfaces now route to the eleven documents Phases 146-151 authored — a new Firmware and BIOS Governance section on each hub, four appended operations-index Patch rows, and one row each for Recipe #5 and Linux update delivery on the master hub — with C17 at 236 files / 0 violations, the link checker at zero of both failure classes, the apex at 101/0/0, and zero commits.**

## Performance

- **Duration:** ~25 min
- **Tasks:** 3 of 3
- **Commits:** **0.** No `git add`, no `git commit`, at any point in this plan.
- **HEAD unchanged throughout:** `18e13d05` at the cleanliness gate and at the close.

## Task 1 — the cleanliness gate, with its actual output

Run before any byte was written to any hub file.

```
$ git log --oneline 56f55307..HEAD -- docs/_registry/ scripts/pipeline/
74917b7d docs(152): register RE-226..RE-236, regenerate filename map, bump both canaries to 236
count=1

$ git hash-object scripts/pipeline/filename-map.md
71c384c9bd1be807902bd0ace4ababf5947432c5
$ git rev-parse HEAD:scripts/pipeline/filename-map.md
71c384c9bd1be807902bd0ace4ababf5947432c5
```

Exactly one commit touched the registry or the pipeline since the phase base, and the tracked
filename map that Plan 02's bundle run rewrote as a build step is byte-identical to its committed
blob. **Gate green.** Both hub files were edited only after this.

The bare `git status --porcelain -- docs/ scripts/` at gate time returned one line,
`?? scripts/docs-style/judge-packets.py`, a foreign untracked file from a concurrent Google-style
documentation pass. The `-uno` form was **empty**. Both forms are named; neither is reported as a
result it is not. See Deviation 1 for what happened to that surface later in the run.

## Task 1 — the operations index

Not C17-enrolled; bound by six validators, all of which use substring presence or a frozen read.

**H2 order after the edit,** read by `grep -n '^## '`:

```
14:## Co-Management
26:## Patch & Update Management
42:## App Lifecycle Automation
54:## Compliance Drift Detection + Tenant Migration
66:## Apple Business Governance
78:## Firmware and BIOS Governance
93:## Version History
```

Appended after Apple Business Governance and before Version History, as ruled — preserving the
one-to-one section-order mirror against the master hub's Operations sub-headings.

The heading literal is `## Firmware and BIOS Governance`, the and-not-ampersand form. It is not one
of the three barred literal headings on this file, each verified by reading the negative rather than
by assertion: `## Patch Management` (check-phase-54 V-54-28), `## App Lifecycle` (check-phase-55
V-55-28), `## Drift Detection` / `## Tenant Migration` (check-phase-56 V-56-29). None concerns
firmware.

## Task 2 — the master hub

C17-enrolled as `RE-219`; bound by all thirteen C17 assertions plus the link checker plus the
milestone audits. Six edits, every one asserting its own match count of exactly 1 before writing.

The new sub-heading is the sixth and last H3 inside the Operations H2, immediately after Apple
Business Governance and before the horizontal rule that closes the block:

```
333:### Apple Business Governance
343:### Firmware and BIOS Governance
```

### The amended banner paragraph, measured

Measured under C17 assertion 12's own rules — strip the `>` marker, join only **consecutive** marker
runs, so the four banner paragraphs measure separately.

| Paragraph | Stripped length before | After | Cap |
|---|---|---|---|
| provisioning platforms | 182 | **182, byte-identical** | 200 |
| operational domains (the edit target) | 143 | **173** | 200 |

Post-edit text of the amended paragraph, in full:

```
plus cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration, firmware and BIOS governance),
```

The provisioning-platform paragraph, with eighteen characters of headroom, is proved untouched by
`diff` against its `56f55307` version.

### The recipes quick-nav bullet — extracted line, in full

```
$ grep -cE '^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)' docs/index.md
1
```

Match count **1**, both before and after — the line was amended in place and never split.

```
- [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning and governance recipes with embedded admin decision points (shared Windows AVD-client device, Shared iPad full provisioning, Windows 11 multi-app kiosk, Android Dedicated multi-app kiosk, enterprise update plan)
```

Fragments tested against **that extracted line in isolation**, written to its own file first, never
against the whole hub:

| Fragment | Hits on the isolated line |
|---|---|
| `Windows 11 multi-app kiosk` | 1 |
| `Android Dedicated multi-app kiosk` | 1 |
| `governance recipes` | 1 |
| `enterprise update plan` | 1 |

`check-phase-137.mjs` — the frozen validator that owns this assertion — reports **5 PASS, 0 FAIL**.

The Recipe #5 link text was compared to the source H1 programmatically rather than by eye:

```
H1        : 'Enterprise Update Plan: A Governed Update Posture for the Whole Fleet'
link text : 'Enterprise Update Plan: A Governed Update Posture for the Whole Fleet'
MATCH
```

## The six row counts, each with the command that produced it

| Table | Command | Result | Required |
|---|---|---|---|
| operations-index Firmware | `awk '/^## Firmware and BIOS Governance$/,/^## Version History$/' docs/operations/00-index.md \| grep -c '^\| \['` | **6** | 6 |
| operations-index Patch | `awk '/^## Patch . Update Management$/,/^## App Lifecycle Automation$/' docs/operations/00-index.md \| grep -c '^\| \['` | **9** | 9 |
| master-hub Firmware | `awk '/^### Firmware and BIOS Governance$/,/^## Cross-Platform References$/' docs/index.md \| grep -c '^\| \['` | **3** | 3 |
| master-hub Patch | `awk '/^### Patch . Update Management$/,/^### App Lifecycle Automation$/' docs/index.md \| grep -c '^\| \['` | **4** | 4 |
| master-hub recipes | `awk '/^## Device Configuration Recipes$/,/^## Operations$/' docs/index.md \| grep -c '^\| \['` | **5** | 5 |
| master-hub H2 count (unchanged) | `grep -c '^## ' docs/index.md` vs the same at `56f55307` | **11 == 11** | equal |

No new table is empty; no H2 was added, removed or renamed.

## The four live corpus-walk patterns, per file

The milestone audit's C11 check compiles these four case-insensitively and walks `docs/` live, with
a 200-character disambiguation window. Greps run with the audit's own patterns, case-insensitively,
on both hub files:

| Pattern (as compiled by the audit) | `docs/operations/00-index.md` | `docs/index.md` |
|---|---|---|
| `\bSystem Center\b` | **0** | **0** |
| `\bSCCM\b[^.]*\bIntune\b` | **0** | **0** |
| `\bAutopatch rings\b` | **0** | **0** |
| `\bSafetyNet\b[^.]*\bcompliance\b` | **0** | **0** |

The Autopatch description cell is *about* groups and rings and was live exposure. The adjacency is
broken in the prose, not in an allowlist: the cell reads
`Autopatch service prerequisites, Autopatch groups and the Test and Last deployment rings, update workloads and service objectives`,
so the product name is never immediately followed by the ring word. The legacy Configuration
Manager product name does not appear in either barred form anywhere on either file.

This is confirmed end to end rather than by grep alone: the apex is the only gate that runs the
milestone audit, and it reports `V-144-AUDIT-HARNESS ... PASS`.

## Gate results

| Gate | Result |
|---|---|
| `node scripts/validation/c17-eee-contract.mjs` | `236 files checked, 0 with violations, 0 total violations`; per-assertion counts `#1=0 … #13=0` |
| `node scripts/validation/check-nav-hub-links.mjs` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` |
| `node scripts/validation/check-phase-137.mjs` | 5 PASS, 0 FAIL, 0 SKIPPED |
| `node scripts/validation/check-phase-132.mjs` | 5 PASS, 0 FAIL, 0 SKIPPED |
| `node scripts/validation/check-phase-59.mjs` | 36 passed, 0 failed, 0 skipped |
| `node scripts/validation/check-phase-144.mjs` (apex, run as extra) | **101 PASS, 0 FAIL, 0 SKIPPED** |

### The two 236s, named apart

They are different objects that happen to collide, and the collision is live enough to mislead a
reviewer. Every appearance below is labelled.

- **236 = the C17 *file* count.** `c17-eee-contract.mjs` reports **236 files checked, 0 with
  violations**. This number is **unchanged from before the phase**. That is the point of quoting
  it: it is the cheapest observable proving no operations document accidentally acquired a
  `doc_id`, since acquiring one would enroll the file and move the count to 237. INT-02 held.
- **236 = the registry *row* count.** `grep -c '^| RE-' docs/_registry/RE-index.md` returns **236**,
  and that number **did** change in this phase — Plan 01 moved it from 225 to 236.

One count held constant to prove a negative; the other grew by eleven to deliver the phase.

## Task 3 — the untouched surfaces, proved per path

Every assertion is `git diff --quiet 56f55307 -- <path>` against the **phase base**, not against the
working tree — a bare `git diff --stat` would show clean for a file edited and committed mid-phase.

### The eleven authored documents

| Path | Result |
|---|---|
| `docs/operations/firmware-bios/00-overview.md` | UNCHANGED |
| `docs/operations/firmware-bios/01-windows-dfci.md` | UNCHANGED |
| `docs/operations/firmware-bios/02-dell-bios-configuration.md` | UNCHANGED |
| `docs/operations/firmware-bios/03-hp-bios-configuration.md` | UNCHANGED |
| `docs/operations/firmware-bios/04-lenovo-bios-configuration.md` | UNCHANGED |
| `docs/operations/patch-management/05-linux-update-delivery.md` | UNCHANGED |
| `docs/operations/patch-management/06-windows-driver-firmware-updates.md` | UNCHANGED |
| `docs/operations/patch-management/07-windows-autopatch.md` | UNCHANGED |
| `docs/operations/patch-management/08-windows-app-updates.md` | UNCHANGED |
| `docs/recipes/05-enterprise-update-plan.md` | UNCHANGED |
| `docs/reference/firmware-oem-matrix.md` | UNCHANGED |

### Validators and the allowlist

| Path | Result | Note |
|---|---|---|
| `scripts/validation/check-phase-132.mjs` | UNCHANGED | the frozen recipe-hub validator SC#5 names |
| `scripts/validation/check-phase-137.mjs` | UNCHANGED | **extra** — strictly stronger than SC#5 requires, not the requirement itself |
| `scripts/validation/v1.20-audit-allowlist.json` | UNCHANGED | no accepted-violation baseline; its two empty buckets are the reflex fix INT-06 forbids |
| `scripts/validation/` (whole tree) | UNCHANGED | this phase authors zero validators |
| `scripts/validation/check-phase-152.mjs` | **does not exist** | `ls` returns `No such file or directory` |

## Working state, exactly as the commit contract requires

```
$ git status --porcelain -- docs/
 M docs/index.md
 M docs/operations/00-index.md

$ git diff --cached --name-only
(empty — nothing staged)

$ git log --oneline 74917b7d..HEAD -- docs/ scripts/
(empty — this plan committed nothing)
```

Two modified paths, nothing staged, no commit. `git diff --numstat 56f55307`:

```
15	2	docs/index.md
20	0	docs/operations/00-index.md
```

The operations-index edit is **pure addition** — zero deleted content lines. The master-hub edit
deletes exactly the two lines it replaces in place, both intended and both enumerated:

```
-> plus cross-platform operational depth (co-management, patch & update management, …
-- [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning recipes …
```

Both files still report CRLF line terminators under `file`. Every replacement asserted its own match
count of exactly 1 before writing, so a terminator mismatch would have failed loudly rather than
zero-matching in silence.

## Deliberately left alone, with the ruling that put each out of scope

- **The stale four-platform description cells.** `grep -c '4-platform comparison hub'` on the
  operations index returns **3**, the same value it returned at `56f55307`, and `git diff` shows no
  hunk touching any of those lines. Owner-ruled out of this phase on 2026-08-26 (152 D-33): the
  standing requirement text scopes Phase 152 to *adding* rows, and Phase 149's D-68 lists this exact
  cell among accepted inconsistencies that stay stale and unowned. The cheap "fix" would also have
  been wrong: two of the three occurrences describe rows that are **genuinely still four-platform**,
  so a blanket replace makes the corpus less accurate in two places while correcting one. Trigger
  for the real fix: a corpus-hygiene milestone.
- **The Operations quick-nav bullet on `docs/index.md`.** Byte-identical to its `56f55307` version,
  proved by `diff` on the extracted line. 152 D-43: the direct structural precedent — Phase 65's
  `f4399195`, which added an Operations sub-heading exactly as this plan does — amended the banner
  blockquote, inserted the sub-heading with a three-row table, appended two Cross-Platform
  References rows, and **deliberately did not touch this bullet**. It has been missing one domain
  since 2026-05-22 by ratified precedent, and will now be missing two. Half-fixing it here is out of
  scope; its stale enumeration stays on the deferred list against the same corpus-hygiene trigger.
- **No `docs/index.md` row for the firmware OEM matrix.** `grep -c 'firmware-oem-matrix'` on the
  master hub returns **0**, as D-48 requires. Four of the eight `docs/reference/` matrix and
  comparison files are absent from that hub entirely, including the other OEM matrix, so the
  precedent for an OEM matrix there is absence.
- **The operations-index frontmatter is not re-stamped.** `sed -n '1,7p'` is byte-identical to the
  same range at `56f55307`. `check-phase-53.mjs` V-53-06 is a live read that caps the
  `review_by` minus `last_verified` window at sixty days, and this file sits at **exactly sixty,
  zero margin**. Any future re-stamp must keep that window at sixty days or fewer.

## The cross-directory matrix row — beyond INT-04's literal wording

Row 6 of the new operations-index Firmware table links `../reference/firmware-oem-matrix.md`. This
is flagged here rather than buried: **INT-04's literal wording does not ask for it**, and it is
recorded as a deliberate addition under D-31.

It earns its place because it is the matrix's **only operations-side reachability**. D-48 bars a
master-hub row for the same file, so without this row the matrix is reachable from a hub only via
`docs/reference/00-index.md`, which D-74 also declines. The shape is precedented on this exact file:
the Apple Business Governance section carries cross-directory rows at five of five.

## Deviations from Plan

**1. [Rule 3 — verification command over-reaches on a concurrent workstream's surface] Task 3's `git status --porcelain -- scripts/` is not empty, and six of the entries appeared mid-run from work this plan never touched**

- **Found during:** Task 3, assertion 2.
- **As-written result:** `git status --porcelain -- scripts/` returns **seven** lines, not zero:
  six ` M` entries for tracked `.tsv` files under `scripts/docs-style/`, plus the known
  `?? scripts/docs-style/judge-packets.py`.
- **Measured provenance, not assumed.** At this plan's own cleanliness gate the `-uno` form of the
  same command was **empty** — so the six tracked modifications appeared *during* this run. Their
  mtimes are all `2026-08-27 11:36:30`, which falls **between** this plan's two hub writes
  (`docs/operations/00-index.md` at 11:35:13, `docs/index.md` at 11:37:03). All six are
  `subs-*.tsv` substitution tables belonging to the Google-style documentation pass, and every hunk
  is a pure deletion of substitution rows (`0 5`, `0 3`, `0 6`, `0 1`, `0 4`, `0 1` in
  `--numstat`). This plan wrote exactly two files, both named literally in the two edit scripts it
  ran; it has no code path that opens a `.tsv`.
- **Resolution:** not touched, not staged, not reverted. Reverting another workstream's uncommitted
  edits would be destructive, and staging them would violate this plan's commit contract.
- **The substantive claim the criterion protects is asserted by a narrower instrument and holds:**
  `git status --porcelain -- docs/` lists exactly the two intended paths;
  `git diff --quiet 56f55307 -- scripts/validation/` exits 0, so no validator moved;
  `git log --oneline 74917b7d..HEAD -- docs/ scripts/` is empty, so nothing was committed. What
  fails is only the claim that the *whole* `scripts/` tree is clean, and that is now false for a
  reason outside this phase.
- **Follow-on for Plan 04:** the same bare emptiness check will fail identically. Narrow to
  `scripts/validation/` or to `docs/`, and say which form was run.

**2. [Rule 1 — plan self-inconsistency] Task 3's `git log --oneline 56f55307..HEAD -- docs/` criterion cannot be satisfied by any correct execution of this phase**

- **Found during:** Task 3, assertion 10.
- **Issue:** the criterion reads "`git log --oneline 56f55307..HEAD -- docs/` returns no lines —
  this plan committed nothing". It returns **one** line: `74917b7d`, Plan 01's Commit A, which
  touched `docs/_registry/RE-index.md` by design (152 D-02). The criterion's stated *reason* is
  about this plan; its *range* starts at the phase base and therefore necessarily includes
  Commit A. The two halves contradict each other for any execution in which Commit A landed —
  that is, for every correct one.
- **Resolution:** the substantive claim is proved with the range that actually isolates this plan.
  `git log --oneline 74917b7d..HEAD -- docs/ scripts/` returns **zero** lines. That is also the form
  the phase-level success criteria use, so the two agree.

## Recorded Facts

- **The C17 blockquote measurement was re-derived from the validator source, not taken on trust.**
  `c17-eee-contract.mjs` assertion 12 strips `/^>\s?/` per line and joins only **consecutive**
  marker runs with a single space, so the four banner paragraphs — separated by blank lines —
  measure independently. The pre-edit measurements reproduced the plan's constants exactly: 182 /
  143 / 132 / 144. That is what made the line choice safe to execute rather than a judgement call.
- **`check-phase-59.mjs` V-59-14, the row-count equality that guards the operations-index Patch
  table, reads through `readAtV15Close` — a frozen read at `ba2cbc0`.** Growing the live table from
  five rows to nine cannot move it, and the validator reports 36/36 after the edit. Phase 145's
  FIX-12 converted it specifically so this growth would be safe.
- **`check-phase-137.mjs` V-137-HUBSNOTWIRED** still passes: the three troubleshooting hubs remain
  unwired to `recipes/03-` and `recipes/04-`. This plan touched none of them, and the SC#5 content
  precondition is intact — the master hub carries the Recipe #5 table row and the quick-nav
  fragment, the frozen validator is byte-unchanged, and both gates exit 0.
- **The 152-PATTERNS.md coordinate for the Patch table row-growth pattern is wrong, and was not
  used.** It labels its excerpt `docs/operations/00-index.md:301-308` and shows a
  `| Resource | Description |` table under a `### Patch & Update Management` H3. That is
  `docs/index.md` content. The operations index was 79 lines at the phase base, its Patch section is
  a top-level H2, and its header is the Guide/Covers pair. Both files were re-measured directly
  before editing; the PATTERNS coordinate was treated as an error, not a second opinion.
- **File sizes after the edits:** `docs/operations/00-index.md` 79 to 99 lines;
  `docs/index.md` 395 to 408 lines.

## Known Stubs

None. Every row written links a document that exists on disk and is registered at
`Status: Approved`; the link checker resolves every target and every anchor fragment at zero
failures of both classes.

## Threat Flags

None. This plan added no network endpoint, no auth path, no schema change at a trust boundary, and
no package-manager install. Register mitigations were applied and each is evidenced above:
**T-152-12** by the quick-nav anchor match count of exactly 1 plus both prior recipe fragments
tested on the extracted line in isolation; **T-152-13** by the pre-edit re-derivation of the
blockquote measurement rules, the post-edit 173-character re-measure, and the byte-identity proof on
the provisioning-platform paragraph; **T-152-14** by the link checker at zero of both failure
classes on both tasks; **T-152-15** by the four per-file pattern greps at zero and by the apex's
`AUDIT-HARNESS` pass, which is the only gate that actually runs the live corpus walk;
**T-152-16** by the byte-unchanged assertions on the allowlist and on the whole
`scripts/validation/` tree; **T-152-17** by the H2 count equality at 11 == 11 and the link
checker's fragment resolution. **T-152-SC** applies vacuously — zero package-manager installs.

## Commit

**None.** By design, per this plan's commit contract. Both hub files are left modified in the
working tree; Plan 04 adds the four inbound-link edits and lands all six files in a single Commit B,
which is what INT-04's navigation-last mandate requires. This SUMMARY, `STATE.md` and `ROADMAP.md`
are also left uncommitted for Plan 04 — a `git add -A` here would have swept the hub edits into the
wrong commit and destroyed Commit B.

## Hand-forward to Plan 04

- Both hub files are dirty and unstaged. Commit B's file list is the two hub files plus the four
  inbound-link host files (D-51 through D-54), plus the phase's planning artifacts.
- `git status --porcelain -- scripts/` is **no longer clean** for reasons outside this phase — six
  tracked `subs-*.tsv` files from the concurrent Google-style pass, plus the untracked
  `judge-packets.py`. Do not stage, revert or tidy any of them. Narrow any cleanliness check to
  `docs/` or to `scripts/validation/`, and record which form was run.
- The apex already reads **101 PASS, 0 FAIL, 0 SKIPPED** at this working state, before the four
  inbound links land. D-67's terminal gate should be re-run *after* Commit B, not treated as
  discharged by this measurement.
- `docs/admin-setup-apv1/01-hardware-hash-upload.md` is C17-enrolled as `RE-077`; its D-54 edit is
  bound by all thirteen C17 assertions, unlike the two files this plan edited, only one of which
  was enrolled.

## Self-Check: PASSED

- `docs/operations/00-index.md` and `docs/index.md` both exist on disk and both carry the edits
  described above, verified by re-running every row-count and grep in this summary after writing it.
- No commit hash is claimed by this plan, so there is none to verify;
  `git log --oneline 74917b7d..HEAD -- docs/ scripts/` is empty, which is the claim.
- `git status --porcelain -- docs/` lists exactly the two intended paths and nothing is staged.
