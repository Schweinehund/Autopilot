# Phase 155: RCP — Walk-Up AVD Kiosk Recipe Formalization - Research

**Researched:** 2026-09-02
**Domain:** GSD docs-pipeline mechanics (registry/canary/nav-link validators) + Windows AssignedAccess/Shell Launcher external fact-checking
**Confidence:** HIGH for mechanics (every claim below was re-run against this repo this session); MEDIUM/LOW for the two RCP-10 external claims (see Area G)

## Re-verification note

This phase's `155-CONTEXT.md` (53 decisions, 11 owner rulings, produced by `/gsd-discuss-phase` +
`/grill-me` + `/adversarial-review`) is **the decision authority**. This document does not
re-litigate any of it. Its job is (a) to independently re-run a representative sample of
CONTEXT.md's `[MEASURED]` claims against the live tree **this session**, because the provenance
rule requires a source file I actually opened, not a citation I trust, and (b) to do the one piece
of net-new mechanical/external work CONTEXT.md explicitly left to plan time: RCP-10's two external
claims (`STATE.md:137-139` names this as a "Plan-Time Research Flag," not yet resolved).

**Every CONTEXT.md `[MEASURED]` claim spot-checked this session reproduced exactly** — registry row
count (236), both canary line numbers and values, C17's 237/0 result, the nav-hub-link-checker's
0/0 result, RE-224's 328-line count and 12-row anti-feature table, RE-237's line-numbered claims
(`:29`, `:31`, `:42-50`, `:81`, `:94`, `:106`, `:157`, `:192-194`, `:200`, `:209`), RE-222's `:78`/
`:94`/`:101`/`:114`/`:129`/`:133`, RE-224's `:29`/`:43`/`:53`/`:107-109`/`:120`/`:131`/`:208`/`:225`/
`:245`, `licensing-matrix.md:62`/`:93` (no trailing newline, 5,650 bytes), and `check-phase-153.mjs`'s
`CHAIN_PHASES = [48..152]` (105 entries). Commands and outputs are inlined below each claim rather
than only cross-referenced, so a plan-checker or executor can re-run them independently.

<user_constraints>
## User Constraints (from CONTEXT.md)

**Full text is in `155-CONTEXT.md` (53 decisions) — this is a condensed index, not a replacement.**
Owner-ratified rulings (verbatim conclusion, decision ID) that change what a naive reading of
`REQUIREMENTS.md` would produce:

### Locked decisions (condensed)
- **D-01/D-02/D-03:** Registry `Status` column (EEE lifecycle) and frontmatter `status:` key are
  different vocabularies. RE-237's registry row lands `Status: Approved` — the only value present
  anywhere in 236 existing rows. `checkDivergence` (`build-publish-bundle.mjs:141-149`) fail-closes
  (`process.exit(1)`, no zip) if a registry-Approved row's frontmatter still reads `Draft` — this is
  a guard against premature *registration*, not against premature *promotion*.
- **D-05 [OWNER-RULED]:** **Flip first, then register.** Order: adversarial-review of RE-237's
  content → owner sign-off → frontmatter flip (`status:` at `:3` AND `**Status:**` byline at `:13`,
  both sites, same commit) → the atomic registration commit (registry row + nav + both canaries +
  regenerated `filename-map.md`). This reverses RCP-04's literal "only once RCP-01 through RCP-03 are
  landed" clause by **annotate-and-supersede** (never delete the superseded wording from
  `REQUIREMENTS.md`/`ROADMAP.md`).
- **D-08:** The D-05 amendment triggers `check-phase-54.mjs`'s live `.planning/REQUIREMENTS.md` read
  (`:30`). Baseline `check-phase-54` before editing REQUIREMENTS.md/ROADMAP.md, re-run after, in the
  same task.
- **D-10 [OWNER-RULED]:** Retire `V-135-RECIPE`'s 328-line equality pin; replace with "file exists,
  non-empty, H1 verbatim" plus grep content needles. Reversibility: costly (edits a v1.19 predecessor
  validator) — record a D-00a exception explicitly (D-13).
- **D-27/D-29/D-30/D-31/D-34 [OWNER-RULED], assets:**
  - Vendor upstream files (from `Azure/WindowsAppKiosk`) at a **pinned commit SHA**; owner supplies
    the two pilot-only scripts (`Remove-KioskOemBloat.ps1`, `Remove-KioskRunTasks.ps1`); **fabricating
    asset contents is prohibited.**
  - ConfigMgr package source (Step 9) is **scrubbed to documented placeholders**; phase routes
    through `/gsd-secure-phase` (also owed from Phase 154). The two `Remove-Kiosk*` scripts get a
    `-WhatIf`/`SupportsShouldProcess` review per `CLAUDE.md`'s PowerShell convention.
  - The Windows App MSIX is **pinned by URL + SHA256, not committed** (repo has no >1.6 MB tracked
    file; GitHub caps at 100 MB anyway).
  - RE-237 gains a **provenance section** naming the repo path, upstream pinned SHA, and how to
    request the two pilot-only scripts (assets are invisible to the bundle/registry/C17 otherwise).
  - Per-asset attribution headers + a `NOTICE` file in `assets/recipes/06-walk-up-avd-kiosk/` (no
    repo-level LICENSE file exists to lean on).
- **D-32/D-36, link/byte-equality:** Asset references are markdown links (the link checker then
  enforces existence) — but `.gitignore` matches `*.ps1xml`, `dist/`, `build/` under the proposed
  tree, and a **directory** target passes `existsSync` with zero enforcement (package sources). The
  inline fenced XML at RE-237`:117-148` and its committed `assets/` copy will drift unless checked
  for byte-equality.
- **D-37/D-38/D-40/D-41, canaries and registry:** Both canaries bump 236→237 **in the same commit**.
  Editable sites are per-file line lists, not a count (`build-filename-map.mjs:274,284,285`;
  `build-publish-bundle.mjs:8,515,522,525`) — never edit the provenance-history lines
  (`build-filename-map.mjs:277`; `build-publish-bundle.mjs:520`), append new provenance lines
  instead. `filename-map.md` (236 rows) is regenerated with the real generator in the same atomic
  commit, never hand-edited. Registry row 237 is 5 columns; Title = H1 verbatim; `--dry-run`
  produced 0 unresolved collisions.
- **D-47 [OWNER-RULED]:** New prose is Google style now, `--no-headings`, tight em-dash canon
  (`sweep3.py _CONTENT-PINS.txt`, never `_EMDASH-PINS.txt`). Acceptance: `sweep3.py` over the three
  Area-C files (RE-222, RE-224, `licensing-matrix.md`) stays at 0.
- **D-48 [OWNER-RULED]:** Re-stamp `last_verified`/`review_by` on the four documents this phase
  edits only (RE-222, RE-224, `licensing-matrix.md`, RE-237) — `licensing-matrix.md`'s `review_by`
  is 52 days past due today.
- **D-49 [OWNER-RULED]:** `SEED-002` flips `status: planted` → `status: closed` in this phase's final
  commit, discharging §A and §C; §B and §D carry to backlog.
- **D-50 [OWNER-RULED]:** Commits land on `v1.22/154-style-landing` (no remote branch exists yet —
  confirmed this session, see Environment Availability). The apex chain is this phase's real gate.

### Claude's Discretion
- Exact wording of the `[PILOT]` pointer sentence in RE-237 (must not contradict
  `REQUIREMENTS.md:17`'s binding definition).
- Exact grep needles replacing `V-135-RECIPE`'s equality assertion.
- Commit message wording (must name the vendored upstream SHA and cite `c3733928 → f0b7aa90`).
- One `NOTICE` file per tree vs. per asset.
- Filenames for the currently-unnamed assets (debug XML, 3 package sources, triage sensor, 2
  diagnostics) — must be derived from owner-supplied artifacts, never invented.

### Deferred Ideas (OUT OF SCOPE)
- A corpus-wide evidence-label taxonomy (Phase 157).
- A repository `LICENSE` file.
- A merge-marker/conflict-marker standing validator.
- `V-132-HUBSNOTWIRED`/`V-137-HUBSNOTWIRED` regex repair (neither matches a relative `recipes/06-`
  link — confirmed this session, see Area B below).
- `.gitattributes * text=auto eol=lf` (already deferred to Phase 159).
- SEED-002 §B (L2 popup-blocked runbook, child-process allow-list reference row, Credential
  Guard/CredSSP, Intune Remote Help) and §D (kiosk-class licensing/hardware standard, AVD host-pool
  Entra SSO, STORIS SCiX ClickOnce kiosk).
- `CLAUDE.md:305` "Project Structure" going stale once `assets/` is founded — no validator pins it.
- Generalizing the fenced-block ↔ file byte-equality check beyond this one use.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RCP-01 | Register RE-237 as registry row 237 | Area A/F below: exact 5-column row shape, `--dry-run` collision check, allocation ceiling verified (max ID RE-236) |
| RCP-02 | Nav-last wiring, zero dangling/phantom anchors | Area B below: exact 3 edit sites in `docs/index.md`, link-checker mechanics re-run live (0/0 today) |
| RCP-03 | Both canaries 236→237, same commit | Area A below: exact line numbers for both canary sites, re-confirmed via grep this session |
| RCP-04 | Draft→Approved after review, ordering per D-05 | Area A below: `checkDivergence` fail-closed mechanics re-read this session; two-site flip requirement (C17 assertion #9) confirmed by reading `c17-eee-contract.mjs:327-331` |
| RCP-05 | Every observed-behaviour claim labelled `[PILOT]` | Area D (CONTEXT.md D-21..D-26); C17 assertion #12's 200-char blockquote cap independently confirmed by running C17 (237/0 baseline) |
| RCP-06 | Reconcile 3 RE-222 conflicts | Area C: exact line numbers in RE-222 confirmed by direct read (`:94`, `:101`, `:129`) |
| RCP-07 | Reconcile 3 RE-224 conflicts | Area C + Area G: exact line numbers in RE-224 confirmed by direct read (`:29`, `:53`, `:245`); RCP-07(c)'s mechanism claim is the subject of Area G Claim 2 |
| RCP-08 | Propagate licensing consequence | Area C: `licensing-matrix.md:62` (incumbent row), `:93` (no trailing newline) confirmed by direct read; Area G Claim 2 findings apply here too |
| RCP-09 | Executable assets under `assets/recipes/06-walk-up-avd-kiosk/` | Area E (CONTEXT.md D-27..D-36); this session confirmed `assets/` does not yet exist and no recipe currently ships assets (see Area E below) |
| RCP-10 | Research the two external claims, `[SOURCED]`/`[UNVERIFIED]` | **Area G — this document's primary net-new contribution.** Both claims fetched as source bytes where possible this session; findings below. |

</phase_requirements>

## Summary

Phase 155's mechanics (registry, canaries, filename-map, nav-hub links, C17, the two frozen
predecessor validators) are exhaustively pre-researched in `155-CONTEXT.md` and every sampled claim
reproduced exactly when re-run this session — the planner can treat CONTEXT.md's Areas A-F as
ground truth without re-verification. The one substantive gap this document closes is RCP-10: both
external claims were run down to source bytes.

**Claim 1 (single-app variant):** `Azure/WindowsAppKiosk`'s top-level README bullet ("Windows App
Single App Kiosk or Multi-App Kiosk...") is **contradicted by its own deeper documentation** —
`source/WindowsApp/README.md` enumerates exactly two deployment modes ("Multi-App Kiosk Mode" and
"Shell Launcher Mode"), and the `source/WindowsApp/AssignedAccess/` folder contains exactly two
subfolders, `MultiApp/` and `ShellLauncher/` — no `SingleApp/`. There is no third, distinct
"single-app `AllAppsList`" kiosk artifact in the repo. This is genuinely the "undefined 'counts as
shipping one'" case CONTEXT.md's D-43 anticipated — confirming D-43's own resolution (word the
corpus's positive claim, "the reference implementation's shipped pattern is multi-app autologon,"
and drop the negative claim about a missing single-app variant) is correct, rather than resolving
the negative to true or false.

**Claim 2 (activation vs. edition):** Microsoft's first-party `AssignedAccess CSP` reference page
(`learn.microsoft.com/.../assignedaccess-csp`, `ms.date: 2025-03-12`) states the ShellLauncher gate
in **edition-only** terms: *"Shell Launcher as a feature and the ShellLauncher node both require
Windows Enterprise or Windows Education to function. The ShellLauncher node is not supported in
Windows 10 Pro."* No first-party sentence anywhere fetched this session mentions **activation
status** (as distinct from edition) as a factor. A corroborating real-world report (GitHub issue
`microsoft/Windows-iotcore-samples#508`, unresolved, 0 comments) reproduces the identical error
string ("Class is not licensed for use") on **Windows 11 Pro** — an edition failure, not an
activation failure. Per CONTEXT.md D-44's own instruction, this resolves to: the mechanism claim
("checks activation") is `[UNVERIFIED]` and must be removed from RE-237`:31`, RCP-07(c), and RCP-08;
the raw pilot observation (the error fired on an installed-but-reportedly-unactivated Enterprise
image) stays `[PILOT]`.

**Primary recommendation:** Treat both RCP-10 claims per D-43/D-44's own pre-planned fallback path
— word the positive/documentable claim, drop or `[UNVERIFIED]`-flag the negative/mechanism claim,
and do not attempt to force either claim to `[SOURCED]` by over-reading ambiguous source text.

## Architectural Responsibility Map

This phase is entirely within a single tier — a static documentation corpus plus a static asset
tree, both delivered through a build-time pipeline (no runtime application code). The "tiers" below
map to pipeline stages, not client/server layers.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Recipe content authoring (RCP-05/06/07/08/10) | Docs corpus (`docs/recipes/`, `docs/reference/`) | — | Markdown prose edited directly; no generated output at this stage |
| Registry + canary bump (RCP-01/03) | Pipeline metadata (`docs/_registry/RE-index.md`, `scripts/pipeline/*.mjs`) | Docs corpus | Registry is the single source of truth the pipeline reads; canaries are self-test assertions inside the pipeline scripts themselves, not runtime config |
| Nav wiring (RCP-02) | Docs corpus (`docs/index.md`) | Validation (`check-nav-hub-links.mjs`) | Nav is itself markdown; the validator is what turns "linked" into "enforced" |
| Status promotion (RCP-04) | Docs corpus (frontmatter + byline) | Pipeline metadata (registry Status column) | Two independent vocabularies must agree by commit-ordering discipline, not by a shared field |
| Executable assets (RCP-09) | New asset tree (`assets/recipes/06-walk-up-avd-kiosk/`) | Docs corpus (via markdown links only) | Deliberately outside `docs/` so the `.docx` conversion walk and C17 never traverse it; the only enforcement is the nav-hub link checker's existence check on outbound links |
| Validation surface | Validation (`scripts/validation/*.mjs`) | Apex chain (`check-phase-153.mjs`) | Structural/shape checks only — meaning checks (VERIFY-02/03, this milestone's judge pass) are explicitly out of this phase's scope |

## Standard Stack

No new libraries, frameworks, or runtimes are introduced by this phase. All tooling is Node.js
(`.mjs`, no external npm packages beyond what the repo's `scripts/` already imports from Node's
standard library — `node:fs`, `node:path`, `node:process`, confirmed by reading the files above) and
Python (`sweep3.py`, `check.py`, already present). No `npm install` / `pip install` / `cargo add` is
part of this phase's task set.

**Package Legitimacy Audit: not applicable.** This phase installs zero external packages. The
security-relevant surface is instead **vendored third-party PowerShell scripts and a vendored MSIX**
(D-27/D-30), which is a supply-chain question of a different shape — see Security Domain below.

## Architecture Patterns

### System Architecture Diagram

```
   [Owner review + sign-off]
            |
            v
   [Frontmatter flip: RE-237 status:Draft -> Approved  (2 sites: :3, :13)]
            |
            v
   [ATOMIC COMMIT: registry row 237 + docs/index.md nav (3 sites)
                  + filename-map.md regenerated + both canaries bumped]
            |
            v
   +----------------------------+        +--------------------------------+
   | docs/_registry/RE-index.md | -----> | build-filename-map.mjs         |
   | (237 rows, Status=Approved)|        | parseRegistry -> filename slug  |
   +----------------------------+        +--------------------------------+
            |                                        |
            v                                        v
   +----------------------------+        +--------------------------------+
   | build-publish-bundle.mjs   | <----- | scripts/pipeline/filename-map.md|
   | filters Status=Approved,   |        | (237 rows, regenerated)         |
   | checkDivergence fail-closed|        +--------------------------------+
   +----------------------------+
            |
            v
   [dist/docs-library-v1.22.zip -- NOT built this phase (Phase 158 owns it)]

   Separately, and BEFORE the link edits that reference it:
   [assets/recipes/06-walk-up-avd-kiosk/ tree committed]
            |
            v (relative markdown links from RE-237)
   [check-nav-hub-links.mjs corpus scan: existsSync() per link target]
            |
            v
   [check-phase-143.mjs V-143-CORPUSRUN, inside apex check-phase-153.mjs]
```

### Recommended Project Structure

```
assets/recipes/06-walk-up-avd-kiosk/
├── NOTICE                              # per D-34: attribution ledger for vendored files
├── assigned-access/
│   ├── production.xml                  # the fenced block at RE-237:117-148, byte-identical (D-36)
│   └── debug.xml                       # RE-237:157's "second, debug copy"
├── windows-app/
│   ├── Deploy-WindowsApp.ps1           # vendored from Azure/WindowsAppKiosk, pinned SHA (D-27)
│   ├── Detect-WindowsApp.ps1           # vendored, pinned SHA
│   ├── Dependencies/                   # vendored folder, pinned SHA
│   └── WINDOWS-APP-MSIX.md             # URL + SHA256 pointer, NOT the binary (D-30)
├── kiosk-baseline/                     # PSADT package sources (3, per RE-237:192) -- filenames TBD (Claude's Discretion)
│   ├── Remove-KioskOemBloat.ps1        # owner-supplied, D-27
│   ├── Remove-KioskRunTasks.ps1        # owner-supplied, D-27
│   └── RemoveBloat.ps1                 # vendored Andrew Taylor De-Bloat, pinned SHA (D-27)
└── remediations/
    ├── detect-remediate-pair-1/        # 2 pairs = 4 files, per RE-237:193 (D-28's 10-vs-12 count)
    ├── detect-remediate-pair-2/
    └── triage-sensor.ps1               # RE-237:193's "detection-only triage sensor"
```

Exact filenames inside `kiosk-baseline/` and `remediations/` are Claude's Discretion per CONTEXT.md
(must derive from owner-supplied artifacts, not invent). This layout is illustrative, not
prescriptive — the plan may choose flat vs. nested; nothing in RCP-09 or C17 constrains directory
depth since the tree is outside `docs/`.

### Pattern 1: Two-site frontmatter/byline flip, gated by C17 assertion #9

**What:** Every EEE-SOP document carries its `status:` twice — YAML frontmatter and a bolded byline
one line below the H1. C17 assertion #9 (`c17-eee-contract.mjs:322-333`, confirmed by direct read
this session) fails if the two disagree.
**When to use:** Any Draft→Approved promotion in this corpus (Pattern established at Phase 137's
`c3733928`, re-confirmed for RE-237 by this session's own C17 run showing 0 violations pre-flip).
**Example (verified this session, RE-237's exact current bytes):**
```
Line 3:  status: Draft
Line 13: **Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-237 · **Status:** Draft
```
Both must change to `Approved` in the same commit, or C17 assertion #9 fires.

### Pattern 2: Registry-row-and-canary atomic commit (Phase 137/152 precedent)

**What:** Registry row + `filename-map.md` regeneration + both drift canaries land together.
**When to use:** RCP-01/02/03's atomic registration commit.
**Example — this session's own re-derivation of the exact edit sites (all re-confirmed by direct
grep this session, matching CONTEXT.md D-38 exactly):**
```
# build-publish-bundle.mjs (grep -n "236" scripts/pipeline/build-publish-bundle.mjs)
8:   // Converts EVERY docs/_registry/RE-index.md Status:Approved doc (236 today) to .docx,
515: // (a) Approved selection yields exactly 236 rows ...
520: //     (bumped 225 -> 236 in Phase 152: ...)   <- PROVENANCE, append a new line, never edit
522: stTry('(a) Approved selection yields exactly 236 rows', () => {
525: stAssert('(a) Approved selection yields exactly 236 rows', rows.length === 236, ...);

# build-filename-map.mjs (grep -n "236" scripts/pipeline/build-filename-map.mjs)
274: // (c) Parsing the REAL docs/_registry/RE-index.md yields exactly 236 rows
277: //      bumped 225 -> 236 in Phase 152: ...   <- PROVENANCE, append a new line, never edit
284: '(c) parseRegistry(docs/_registry/RE-index.md) yields exactly 236 rows',
285: rows.length === 236,
```
Every `236`/`'236 rows'`/`'exactly 236 rows'` occurrence at lines 8, 515, 522, 525 (bundle) and 274,
284, 285 (filename-map) becomes `237` in the same commit; lines 520 and 277 are provenance comments
— append `(bumped 236 -> 237 in Phase 155: RE-237 walk-up AVD kiosk registered)` as a **new** line
directly after them, do not edit the existing text.

### Pattern 3: `--dry-run` before writing (build-filename-map.mjs)

**What:** `build-filename-map.mjs` accepts `--dry-run` (confirmed present at line ~394-397 by direct
read this session) and prints the collision/diff preview without writing.
**When to use:** Before committing the real registry row, run `node scripts/pipeline/build-filename-map.mjs --dry-run` to confirm zero unresolved collisions (CONTEXT.md D-41 already ran this and reports
`Parsed 237 registry rows -> 237 output filenames, 0 unresolved collisions`).

### Anti-Patterns to Avoid

- **Splitting the two canary bumps across commits.** `f0b7aa90` (Phase 137 precedent) bumped both
  canaries together while both files' frontmatter still said `Draft` — this is the correct shape.
  The opposite split ("Approved-row canary in one commit, all-rows canary in another") is the exact
  regression RCP-03 names ("sat RED for an entire milestone").
- **Editing `build-filename-map.mjs:277` / `build-publish-bundle.mjs:520` in place.** These are
  provenance history lines documenting prior bumps (223→225, 225→236); editing them destroys the
  audit trail Phase 152's D-18 established. Append, never edit.
- **Treating a linked directory as an enforced asset.** `existsSync()` returns true for a directory,
  so a markdown link to `assets/.../kiosk-baseline/` (the 3 package sources RE-237 groups together)
  gets **zero** existence enforcement from the nav-hub link checker. Link to the individual files,
  not the containing directory, if enforcement matters.
- **Committing a gitignored asset.** `.gitignore` matches `*.ps1xml`, `dist/`, `build/` repo-wide
  (confirmed by direct read this session). A file placed under `assets/recipes/06-walk-up-avd-kiosk/`
  that happens to collide with one of these patterns (e.g., anything literally named `dist/` or
  `build/` as a subfolder, or any `.ps1xml` file) passes `existsSync()` for the author's own working
  tree but is silently absent from every fresh clone. Run `git check-ignore -v` on every asset path
  before committing.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Registry-row → filename slug derivation | A custom slugger | `build-filename-map.mjs`'s existing 5-step slug algorithm (`--dry-run` first) | Already handles collision resolution (D-08) and is self-test-proven at 236 rows; a hand-rolled slug risks a silent second collision-resolution path |
| Detecting whether an asset link resolves | A custom existence script | `check-nav-hub-links.mjs` (already corpus-wide, already an apex-chain member via `check-phase-143.mjs`) | It is already wired into the apex; a parallel script would be redundant and could disagree with the real gate |
| Confirming the vendored asset SHA is real | Trusting the pilot's recollection of a commit hash | `git ls-remote` / `git log` against `github.com/Azure/WindowsAppKiosk` at plan/execute time | The pinned-SHA requirement (D-27) is only as good as the SHA being independently confirmed to exist and to contain the named files |

**Key insight:** every mechanical piece of this phase — slug generation, collision resolution, link
existence, C17 shape — already has a validated tool in this repo. The only genuinely new work is
prose (the reconciliation edits, the `[PILOT]` labelling, the RCP-10 research) and the new asset
tree's *placement*, not its *validation mechanism*.

## Common Pitfalls

### Pitfall 1: Assuming a rendered fetch of a Microsoft Learn page is stable across two fetches
**What goes wrong:** This project has a documented incident (`reference_canonical_source_bytes_not_webfetch.md`) of the same URL returning contradictory answers to two agents in one session.
**Why it happens:** Microsoft Learn pages are personalized/cached/JS-rendered; the same URL can serve different embedded content on different requests.
**How to avoid:** Prefer GitHub source bytes (raw markdown) over the rendered page wherever the source repo is public. **This session discovered that path is no longer available for Windows IT-Pro docs** — `MicrosoftDocs/windows-itpro-docs` returns `404 Not Found` on `api.github.com`, `raw.githubusercontent.com`, and the `github.com` web UI itself (confirmed with three casing variants and a direct repo-metadata call, all 404, this session). The docs' own front-matter (fetched via WebFetch) reveals the *current* source lives at `github.com/MicrosoftDocs/windows-docs-pr` (a **private** authoring repo — `original_content_git_url` and `gitcommit` fields point there, confirmed by reading the fetched front matter this session), which is not publicly fetchable at all. **For this doc family specifically, WebFetch on the rendered `learn.microsoft.com` page is now the only available first-party route** — mitigate the contradictory-fetch risk by (a) reading the embedded front matter's `ms.date`/`git_commit_id` to pin which revision was actually served, and (b) cross-checking the claim against a second, independent source (this session used a live GitHub issue reporting the identical error string) rather than fetching the same URL twice.
**Warning signs:** A quoted "verbatim" sentence that doesn't reappear on a second fetch of the same URL, or a page whose visible prose is thin relative to its stated `word_count` (this session observed a bare `curl` of the shell-launcher page returning only ~350 words of skeleton HTML against a documented 646-word count — the real content is client-side-rendered and only appears through a tool that executes/parses that rendering, which is what WebFetch is for here).

### Pitfall 2: Reading the top-level README of a multi-solution GitHub repo as authoritative for a specific sub-solution
**What goes wrong:** `Azure/WindowsAppKiosk`'s root `README.md` bullet-lists "Windows App Single App Kiosk or Multi-App Kiosk" as a feature, which reads as confirming a single-app variant exists.
**Why it happens:** The root README covers two solutions (Windows App kiosk + legacy RDP-client kiosk for air-gapped clouds) and appears to use "Single App Kiosk" loosely; the deeper, solution-specific `source/WindowsApp/README.md` is the actual source of truth for what the Windows App solution ships, and it enumerates only two modes.
**How to avoid:** For a "does X repo ship Y" claim, walk into the specific sub-path RE-237 actually names (`source/WindowsApp/Apps/WindowsApp`) and check its own README plus its actual folder contents (`AssignedAccess/MultiApp/`, `AssignedAccess/ShellLauncher/` — confirmed via the GitHub contents API this session; no `SingleApp/` sibling exists) rather than trusting the parent repo's marketing-style bullet list.
**Warning signs:** A repo-level claim that isn't traceable to a specific file or folder you can list.

### Pitfall 3: Conflating "the error string matches" with "the mechanism matches"
**What goes wrong:** RE-237 and the GitHub issue both show `Class is not licensed for use` / Intune code `-2016281112`, which looks like corroboration of RE-237's *activation* theory.
**Why it happens:** The GitHub issue's device was Windows 11 **Pro** — an edition failure per Microsoft's own documented gate table, not an activation failure. The same error string is emitted by the same CSP node for a completely different documented cause.
**How to avoid:** When corroborating a pilot observation with a second source, check that the second source's *root cause* — not just its symptom string — matches the claim being verified.
**Warning signs:** A search result that "confirms" an error message without confirming the specific mechanism claim attached to it.

### Pitfall 4 (from CONTEXT.md D-32, independently re-confirmed): a link-only commit fails the checker
**What goes wrong:** Committing RE-237's asset-path edits before the `assets/` tree exists.
**Why it happens:** `checkInboundLinks` (`check-nav-hub-links.mjs`) resolves every non-`http(s)`/`mailto` target with `existsSync()` and hard-fails `target file not found`.
**How to avoid:** Assets land in the same commit as, or strictly before, the link edits that reference them (D-51 ordering constraint #1).
**Warning signs:** `check-nav-hub-links.mjs` reporting a new `target file not found` failure after a content-only commit.

## Code Examples

### Confirm both canary values before and after the edit
```bash
# Source: this session, re-run against the live repo
grep -n "236" scripts/pipeline/build-publish-bundle.mjs
grep -n "236" scripts/pipeline/build-filename-map.mjs
# Expect 5 and 3 hits respectively (see Pattern 2 above for exact line numbers).
# After editing, re-run with "237" and expect the same count at the same lines,
# plus one NEW appended provenance line at :520+1 and :277+1 (not a replacement).
```

### Confirm the C17 and nav-hub-link baselines before starting
```bash
# Source: this session, live run
node scripts/validation/c17-eee-contract.mjs
# => C17 summary: 237 files checked, 0 with violations, 0 total violations
node scripts/validation/check-nav-hub-links.mjs
# => check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
```
Re-run both after every content commit in this phase; a regression here is cheap to catch early and
expensive to bisect later given the phase's 5+ atomic commits.

### Confirm the anti-feature/namespace-table needle sites survive an edit (D-14)
```bash
# Source: this session
grep -n "^| Feature \|Namespace (year)\|^\`\`\`xml" docs/recipes/03-windows-11-multi-app-kiosk.md
# 43:| Feature | Why it's unsupported / what breaks | Do this instead |
# 131:```xml
# 208:| Namespace (year) | Alias / prefix | Version floor | What it adds |
```
RCP-07(b)'s edit site (`:245`, the Step 6 `Data type` cell) is 17-114 lines below all three of these
— confirms D-14's claim that the edit cannot disturb `V-135-XMLFENCE`/`V-135-NAMESPACETABLE`.

### Vendoring an upstream file at a pinned SHA (pattern for RCP-09)
```bash
# 1. Confirm the SHA exists and contains the expected path (do this before writing any NOTICE file)
curl -s "https://api.github.com/repos/Azure/WindowsAppKiosk/commits/<PINNED_SHA>" | grep '"sha"'
curl -s "https://api.github.com/repos/Azure/WindowsAppKiosk/contents/source/WindowsApp/Apps/WindowsApp?ref=<PINNED_SHA>" | grep '"name"'
# 2. Fetch the file AT that SHA, not at `main` (main can drift after the phase plans)
curl -s "https://raw.githubusercontent.com/Azure/WindowsAppKiosk/<PINNED_SHA>/source/WindowsApp/Apps/WindowsApp/Deploy-WindowsApp.ps1" -o assets/recipes/06-walk-up-avd-kiosk/windows-app/Deploy-WindowsApp.ps1
```
Confirmed working this session (same technique used for all Area G fetches below) — `raw.githubusercontent.com` is reachable from this environment; `api.github.com` is reachable for the `Azure/WindowsAppKiosk` repo specifically (unauthenticated rate limit applies — 60 req/hour — batch calls if scripting this).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Classic Assigned Access `KioskModeApp` node (single-app) | `Configuration` node with `AllAppsList` (multi-app, can hold exactly one app) | Windows 10 1803+ (per Microsoft's own AssignedAccess CSP page, confirmed this session) | `KioskModeApp` is officially deprecated ("This policy is deprecated and may be removed in a future release" — quoted verbatim from the fetched page) and becomes a no-op once `Configuration` is set, while still reporting `SUCCESS` to the MDM server — this is exactly the trap RE-224's anti-feature table already documents at its `KioskModeApp` row |
| Legacy Remote Desktop Client kiosk scripts (`Azure/WindowsAppKiosk/source/RemoteDesktopClient/`) | Windows App kiosk scripts (`source/WindowsApp/`) | The RDP-client path is explicitly scheduled for deprecation "at the end of March 2026" in commercial environments per the repo's own README (fetched this session) and is retained **only** for air-gapped government cloud | RE-237 already targets the correct (Windows App) solution; no change needed, but worth noting for anyone who finds an older tutorial referencing the RDP-client scripts |

**Deprecated/outdated:**
- `KioskModeApp` CSP node: superseded by `Configuration`'s single-app profile type since Windows 10
  1803, per Microsoft's own documentation.
- `Azure/WindowsAppKiosk/source/RemoteDesktopClient/`: scheduled for removal from the repo once
  Windows App supports air-gapped government clouds; commercial-environment support already
  deprecated as of the repo's current state.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The `WindowsApp-SingleApp.png` image reference inside `SOLUTION_OVERVIEW.md`'s Shell Launcher Mode description is purely illustrative naming and does not indicate a third, distinct "single-app" AssignedAccess profile type separate from Shell Launcher and Multi-App. | Area G Claim 1 | If wrong, Claim 1 could resolve differently — but D-43's own recommended framing (word the positive, drop the negative) is unaffected either way, since it never depends on resolving this ambiguity |
| A2 | The `MicrosoftDocs/windows-itpro-docs` repository's unavailability (404 across API, raw-content, and web UI, three casings tried) reflects a genuine repository rename/privatization rather than a transient outage or an environment-specific network block. | Common Pitfall 1 | If this is a transient/environment-specific block rather than a real repo change, a future research pass in a different environment may find the raw source available again and should prefer it over the rendered-page fallback used here |
| A3 | No first-party Microsoft page states an activation-based (as opposed to edition-based) requirement for the ShellLauncher CSP node, based on the two pages fetched this session (`assignedaccess-csp` and `shell-launcher/` overview). A broader page (e.g., a troubleshooting article specifically about the `-2016281112` error code) was not located and may exist. | Area G Claim 2 | If such a page exists and does state an activation dependency, RCP-07(c)'s mechanism claim would move from `[UNVERIFIED]` to `[SOURCED]` rather than being removed — a materially different edit to RE-237`:31`, RCP-07(c), and RCP-08 |

## Open Questions (RESOLVED)

None left unresolved. Both items STATE.md flagged as "Plan-Time Research Flags" for this phase
(the two RCP-10 external claims) are resolved above to a specific disposition (Claim 1: prefer the
positive framing per D-43, do not assert either the negative or its opposite; Claim 2: `[UNVERIFIED]`
for the mechanism, `[PILOT]` retained for the raw observation, per D-44's own pre-declared fallback).
Where this document could not reach positive certainty (Assumptions A1-A3 above), each is logged as
an explicit assumption with its own risk statement rather than left as an open question, per this
agent's write contract.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js (running `scripts/pipeline/*.mjs`, `scripts/validation/*.mjs`) | Registry/canary edits, C17, nav-hub-link checker | Yes | Confirmed runnable this session (scripts executed successfully) | — |
| Python 3 (`sweep3.py`, `check.py`) | STYLE-06 acceptance assertion (D-47) | Yes | `python3` invoked successfully this session | — |
| `git` CLI | Commit shape (D-38 append-not-edit, D-41 registry), asset vendoring | Yes | — | — |
| `curl` / outbound HTTPS | RCP-10 research, vendoring assets at a pinned SHA (RCP-09) | Yes for `raw.githubusercontent.com`, `api.github.com` (rate-limited, unauthenticated: 60 req/hour), `learn.microsoft.com`, `github.com` web UI (redirects work with `-L`) | — | For a repo returning 404 (see `windows-itpro-docs`), fall back to the rendered Learn page via WebFetch |
| `origin` remote reachability | D-50 (branch stacking), D-33 (no CI observes this phase's work) | Confirmed this session: `origin` = `github.com/Schweinehund/Autopilot.git`; **no remote branch exists for `v1.22/154-style-landing`** (only `master` and three `phase-*-atom-*` branches exist under `remotes/origin/`) | — | None needed — D-50 already accounts for this; HARN-06's close push is the only point this phase's work becomes CI-visible |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** GitHub source-byte access to `windows-itpro-docs` (the
canonical location for Shell Launcher / AssignedAccess CSP markdown source) — fallback is the
rendered `learn.microsoft.com` page via WebFetch, used successfully this session with the front-matter
cross-check described in Common Pitfall 1.

## Security Domain

`security_enforcement` is absent from `.planning/config.json` — treated as enabled per the standard
default. `nyquist_validation` is explicitly `false` in `.planning/config.json` (confirmed by direct
read this session) — the Validation Architecture section is correctly omitted per this document's
own contract.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | This phase authors documentation and static assets; it does not touch an authentication code path |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Marginal | The two `Remove-Kiosk*.ps1` scripts run as SYSTEM and delete provisioned packages, Run/RunOnce values, scheduled tasks and `kioskUser*` profiles (per RE-237`:192`, confirmed by direct read) — CONTEXT.md D-29 already mandates a `-WhatIf`/`SupportsShouldProcess` review per `CLAUDE.md`'s own PowerShell convention, which is the correct control here |
| V6 Cryptography | N/A | No cryptographic code is authored; the MSIX is referenced by SHA256 for integrity, not for cryptographic signing purposes this phase controls |
| V14 Configuration | Yes | D-29's core finding: RE-237`:209` documents a ConfigMgr install command carrying `AADTENANTID`, `AADCLIENTAPPID`, `AADRESOURCEURI`, the site code, and the CMG mutual-auth path — this is tenant-identifying configuration data being committed to a **public** repository (`git remote -v` confirms `origin` = `github.com/Schweinehund/Autopilot.git`, a public GitHub URL, re-confirmed this session). `.gitignore` guards only `.env`/`*.pem`/`*.pfx` (confirmed by direct read) — it does **not** guard markdown prose containing tenant identifiers. |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Tenant-identifying values (tenant ID, app registration client ID, resource URI) committed as literal strings in public documentation | Information Disclosure | D-29's own ruling: scrub to documented placeholders (e.g., `<YOUR-TENANT-ID>`) before commit; this is a one-way reversibility risk per D-29 — "a secret committed to a public remote requires history rewrite; removal from HEAD is not removal." Verify the scrub with a grep for GUID-shaped strings (`grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'`) across the final RE-237 diff before committing, since a tenant/client ID pasted from a real console session during pilot authoring would match that pattern and a prose-level review could miss it. |
| A vendored third-party script (`RemoveBloat.ps1`, Andrew Taylor De-Bloat) executed with SYSTEM privileges without re-signing or content review | Tampering / Elevation of Privilege | D-27 already requires pinning to a specific upstream SHA (not `main`) — this session's vendoring pattern (see Code Examples) additionally confirms the SHA and file existence via the GitHub API *before* fetching content, which is the minimum supply-chain check available without a full code review of the vendored script (out of this phase's stated scope per D-29, which explicitly separates "content review" from "code review of the diff" and requires the latter for this artifact class) |
| Destructive remediation scripts (`Remove-Kiosk*.ps1`) running unattended, daily, as SYSTEM, on every enrolled kiosk device | Denial of Service (self-inflicted) | `-WhatIf`/`SupportsShouldProcess` review (D-29); RE-237`:257` already documents the scripts' actions as "not reversible... only reversible with a reimage," which the recipe's own Rollback/Recovery section discloses — this phase's job is to ensure that disclosure survives the reconciliation edits, not to add new mitigation |

## Sources

### Primary (HIGH confidence — commands run, or source bytes fetched, this session)
- This repository at `HEAD` (`307c6147`, 2026-09-02) — every file:line citation in this document was
  produced by `grep -n`, `sed -n`, `wc -l`/`wc -c`, `node <validator>.mjs`, or a full `Read` of the
  cited file, this session.
- `github.com/Azure/WindowsAppKiosk` — root `README.md`, `source/WindowsApp/README.md`,
  `source/WindowsApp/SOLUTION_OVERVIEW.md` fetched as raw source bytes via
  `raw.githubusercontent.com`, this session. Directory listings (`AssignedAccess/`, `WindowsApp/`)
  fetched via `api.github.com/repos/.../contents/...`, this session.
- `learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp` — fetched via
  WebFetch this session; front matter (`ms.date: 2025-03-12`, `git_commit_id`) captured alongside the
  quoted prose for revision-pinning per Common Pitfall 1.
- `github.com/microsoft/Windows-iotcore-samples/issues/508` — fetched via `api.github.com` issues
  endpoint (title, body, comment count, state), this session.

### Secondary (MEDIUM confidence)
- `learn.microsoft.com/en-us/windows/configuration/assigned-access/shell-launcher/` — fetched via
  WebFetch this session; corroborates the edition-only framing but the same-URL-contradiction risk
  (Common Pitfall 1) means this is treated as MEDIUM rather than HIGH on its own, and is only relied
  on where it agrees with the `assignedaccess-csp` page's HIGH-confidence table.

### Tertiary (LOW confidence, marked for validation)
- WebSearch summaries of "AssignedAccess supported editions" and "Class is not licensed for use" —
  used only to locate the primary sources above, never cited as fact on their own in this document.

## Metadata

**Confidence breakdown:**
- Registry/canary/nav-hub/C17 mechanics: HIGH — every cited line re-derived by direct tool execution
  or file read this session, not merely trusted from CONTEXT.md.
- RCP-10 Claim 1 (single-app variant): MEDIUM — resolved to "prefer the positive framing, the
  negative claim is genuinely ambiguous in the source" rather than a clean true/false, because the
  repo's own documentation is internally inconsistent.
- RCP-10 Claim 2 (activation vs. edition): MEDIUM — one HIGH-confidence first-party source states the
  mechanism in edition-only terms; absence of an activation-mechanism mention in that same source is
  evidence of omission, not proof of non-existence elsewhere, hence MEDIUM rather than HIGH.
- Security domain: MEDIUM — the tenant-identifier exposure risk is a direct reading of RE-237's own
  text, but the actual values that will land in the final scrubbed document are Claude's Discretion
  at plan/execute time.

**Research date:** 2026-09-02
**Valid until:** Registry/canary/nav-hub mechanics: effectively permanent (unless a future phase
changes the pipeline scripts). RCP-10 external claims: 30 days — Microsoft Learn content and the
`Azure/WindowsAppKiosk` repo's documentation can both change without notice; re-verify at execute
time if this phase's execution is materially delayed past that window.
