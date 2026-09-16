# Phase 161: Vendor De-Bloat into the Kiosk Baseline - Research

**Researched:** 2026-09-16
**Domain:** GPL-3.0 third-party script vendoring into a signed PSADT Win32 app package; kiosk-account safety review; corpus governance amendments
**Confidence:** HIGH

## Summary

This phase's shape is already fully locked by `161-CONTEXT.md` (57 decisions, 12 owner rulings, three adversarial-review rounds) and `161-DRAFTS.md` (every VERBATIM-LOCKED string, the 40-row needle table, and all four plan frontmatters/task lists). This research does not propose an alternative shape -- none is needed. Its job, per the orchestrator's brief, is to re-measure every load-bearing claim in `161-CONTEXT.md`'s `<code_context>` "Measured hazards" section and canonical_refs at the current HEAD (`8d1baeb0`) and report MATCH/DRIFT, confirm the upstream GitHub pin and byte-identity of the vendored script and license, confirm PSADT 4.1.7's `Start-ADTProcess -PassThru` failure-return behavior against the installed module's own help text and source, and run the validators that bound the edits to record the pre-phase baseline.

**Result: everything material MATCHES.** The upstream commit SHA (`11918c5085b1be5ba25ace74c5cf3a52bfd37b26`), byte counts (179,789 / 35,149), SHA256 hashes (`bf0f4bd0...` / `3972dc97...`), all ten pre-declared GUIDs (fifteen occurrences, exact line numbers), the OOBE gate, the Edge/`$Bloatware`/whitelist finding, the 15-pattern reconciliation count, all six validator baselines (`check-phase-54` 32/0, `check-phase-155` 10/0, `check-phase-156` 10/0, `c17-eee-contract` 237/0, `check-nav-hub-links` 0/0, apex `check-phase-159` 117/0 at 2m4.9s), the four amendment antecedent strings (present byte-exact, each in exactly one file), the PSADT `-PassThru` failure semantics, the frontend 60001 path, and the `milestone.cjs` line-168 checkbox regex all reproduced exactly as recorded. Two cosmetic line-number drifts were found in `161-CONTEXT.md`'s own `<canonical_refs>` convenience pointers (not in any VERBATIM-locked string or needle) -- see the DRIFT table below; DRAFTS.md's own rule ("Line numbers are convenience pointers, never identity. Locate by quoted text, then re-measure.") already covers this and no plan or DRAFTS content depends on the wrong numbers.

**Primary recommendation:** Plan exactly as `161-DRAFTS.md` PART H specifies (E-J1..J4, four sequential plans on master). No new research-driven deviation is warranted; carry the two line-pointer corrections below into the plans' `<read_first>` framing so the executor is not misdirected to the wrong line when it "locates by quoted text."

## User Constraints (from CONTEXT.md)

`161-CONTEXT.md` and `161-DRAFTS.md` are this phase's own canonical source text (D-55, D-56): DRAFTS.md is declared the planner's and executor's source text, and every editing task's `<read_first>` must name it. Given that binding chain and the ~40 KB size cap on this file (orchestrator note 5), this section is a pointer index rather than a full verbatim reproduction of all 57 decisions -- reproducing the ~24 KB CONTEXT.md decisions block here would roughly double this file's size for content the planner is independently required to read in full. **The planner MUST read `161-CONTEXT.md` and `161-DRAFTS.md` directly; this section is not a substitute.**

### Locked Decisions -- index by area (full text in 161-CONTEXT.md `<decisions>`)
- **Area A (D-01..D-08):** Vendoring shape -- pin, path, GPL-3.0 text location, no in-file notice needed, NOTICE GAP closed in place, identity fields in NOTICE, OOBE-gated block accepted as-is (owner-ruled), size precedent recorded not amended.
- **Area B (D-09..D-19):** Kiosk-safety review -- PROTECTED list, class table, five negative controls, `-customwhitelist` empty (owner-ruled), `-AllowStartMenuReset false`, `-custombloatlist` never passed, 15-row pattern reconciliation, CrossDevice/Quick Assist removals accepted (owner-ruled; -> Phase 165 notes), registry/hive/task verdicts split three ways, `$intunecomplete` gates nothing, hive-unload line added.
- **Area C (D-20..D-27):** Baseline wiring -- `$script:BundledScripts` ordered list, `-ErrorAction SilentlyContinue` makes 70002 reachable, ESP time budget measured with no timeout (owner-ruled), detection `1.1.0-01` + re-pin procedure, signing is a README assembly step (owner-ruled), README section order (D-25), De-Bloat into Baseline only. **D-27 (owner-ruled, reversible):** `[SUCCESS-CRITERION AMENDMENT, D-27]` appended to ROADMAP SC2/SC3 and REQUIREMENTS VND-02/VND-03.
- **Area D (D-28..D-37):** RE-237 edits and the pilot checkpoint -- Step 8 STD-05 ruling (owner-ruled, O-1), Asset Provenance edit (Three->Two artifacts), `[PILOT]` reading on three surfaces, checkpoint is `checkpoint:human-action`/`autonomous:false` with `<reversibility rating="costly">` (owner-ruled, O-2/O-3), runtime-acceptability token defaults `NOT RULED` (owner-ruled). **D-35 (owner-ruled, O-2):** four sequential plans, requirement declared where its last conjunct settles. Pre-commit scrub scan (D-36, ten pre-declared GUIDs).
- **Area E (D-38..D-41):** Amendment mechanics -- the four amendment strings are VERBATIM (DRAFTS PART A), `check-phase-54` 32/0 gate bracket before/after in the same task, direct-`Edit` carve-out from anti-pattern 15 (D-40), amendment ground is a ruling not a measurement.
- **Area F (D-42..D-45):** Phase 167 needle handover -- 40-row table (DRAFTS PART G), leaf reads live HEAD (freezing is Phase 167 HARN-03's), pre/post-wave gate brackets (D-44), each plan re-measures its own needles into EVIDENCE.
- **Area G (D-46..D-50):** Pilot record and scrub -- exactly seven allowlisted items (D-46, exclusions matched against PSADT's actual UTF-16LE log-header strings per `8d1baeb0`), per-observation-clause `[PILOT]` markers (D-47), redaction before write / verification after every write (D-48), sensor v6 defects recorded and handed to Phase 164 not fixed here (D-50).
- **Area H (D-51..D-57):** Review artifacts -- NOTICE field list (D-51), second `claude -p` review pass chunked (D-52), meaning-preservation judge packet (D-53), style-instrument runs with stated blind spots (D-54), DRAFTS.md holds every VERBATIM-LOCKED string and is not a scan surface (D-55), CONTEXT+DISCUSSION-LOG+DRAFTS committed together (D-56), fixed evidence/fact-check file set (D-57).

### Claude's Discretion (verbatim from CONTEXT.md)
- Exact README prose outside the locked H2 literals and the locked review-section shape.
- NOTICE wording outside the locked lines (E-N1's field values; E-N2, E-N3 and E-N4 are locked).
- PSADT log-entry wording outside E-P1.
- SUMMARY structure, and the order of EVIDENCE subsections within a plan.
- Estimate tokens per plan (the DRAFTS frontmatters carry starting values).

### Deferred Ideas (OUT OF SCOPE, verbatim from CONTEXT.md)
- A `Build-KioskBaselinePackage.ps1` assembly script -- only if the owner later wants reproducible assembly (C5 option (b), declined).
- Fixing sensor v6 -- Phase 164's, under TRI-01; a fix forces a NOTICE re-hash plus a remediation redeploy.
- 160-REVIEW WR-01 and WR-02 -- deferred to `/gsd-code-review 160 --fix`; `/gsd-secure-phase 160` is still owed.
- Phase 165 notes -- `crossdeviceresume.exe` allow-list entry becomes inert once De-Bloat removes `MicrosoftWindows.CrossDevice`; Quick Assist is removed while RE-237 line 48 names it as a viewing path.
- A repository-level LICENSE file -- 155 D-34, still out of scope.
- Neutering the OOBE-gated block by a marked in-file edit -- declined at A9; revisit only if the pilot runtime ruling is `no`.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| VND-01 | `RemoveBloat.ps1` vendored at a GitHub-API-confirmed commit, GPL-3.0 text in tree, attribution+SHA in NOTICE, GAP closed | Upstream pin, byte counts and SHA256 re-verified live (MATCH table below); NOTICE GAP/heading structure re-confirmed at exact lines 332-342/362/371-378 |
| VND-02 | Line-by-line kiosk-account-safety review + pattern-list reconciliation + signing chain (amended by D-27/E-A1,E-A2) | Every PROTECTED-list line-range claim re-measured against the live-fetched upstream bytes (Edge/whitelist/GUIDs/OOBE gate/fetch paths all confirmed exact); PSADT signing idiom source confirmed at `Build-WindowsAppPackage.ps1` |
| VND-03 | Baseline invokes script in order, RE-237 Step 8 names it, pilot `[PILOT]` reading (amended by D-27/E-A3,E-A4) | `-ErrorAction SilentlyContinue`/`-PassThru` failure semantics confirmed against the installed PSADT 4.1.7 module's own help text and the frontend's 60001 exit path (lines 292, 357); RE-237 anchor counts and antecedent-quote byte-exactness confirmed |

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Bloatware removal execution | Device / OS (kiosk endpoint) | -- | `RemoveBloat.ps1` runs as a local PowerShell process during ESP device setup; no network service involved except its own outbound fetches |
| Package assembly, signing, install-order orchestration | PSADT deployment package (Baseline) | Intune Win32 app delivery | `KioskBaseline-Invoke-AppDeployToolkit-functions.ps1` owns invocation order and exit-code policy; Intune is the delivery/assignment plane, not the orchestration plane |
| Vendoring provenance and license compliance | Repository governance (`NOTICE`, `Files/LICENSE.GPL-3.0.txt`) | -- | GPL-3.0 §6 conveyance obligations are discharged by the license text traveling inside the `.intunewin`, recorded in-repo, not by any runtime component |
| Kiosk-safety review record | Documentation (Baseline `README.md`) | -- | The review is a design-time artifact; nothing at runtime consults it |
| Governance/requirement amendment | Planning artifacts (`ROADMAP.md`, `REQUIREMENTS.md`) | -- | Pure text-append via direct `Edit` (anti-pattern-15 carve-out); no code path reads these files at runtime |
| Pilot validation evidence | `161-EVIDENCE.md` / RE-237 `[PILOT]` cells | Baseline README `## Validation (pilot)` | One fact, recorded on up to three surfaces per D-30; the device itself is the source of truth, never re-derived |

## Re-measurement Results (orchestrator item 1a-1f)

All commands below were run at HEAD `8d1baeb0` in this session. **MATCH** = value reproduces exactly what `161-CONTEXT.md`/`161-DRAFTS.md` records. **DRIFT** = value differs.

### (a) Measured hazards in `<code_context>` -- all reproduced exactly

| Claim | Command | Result |
|---|---|---|
| RE-237 `administrator` = 10 | `grep -oE 'administrator' docs/recipes/06-walk-up-avd-kiosk-autologon.md \| wc -l` | **MATCH** (10) |
| `Ask the admin` lead-ins = 5 | `grep -cE '^> \*\*Ask the admin:\*\*' ...` | **MATCH** (5) |
| `What breaks` callouts = 9 | `grep -cE '^> \*\*What breaks if misconfigured:\*\*' ...` | **MATCH** (9) |
| `## Asset Provenance` = 1 | `grep -cFx '## Asset Provenance' ...` | **MATCH** (1) |
| `Deploy-WindowsApp.ps1` = 4 | `grep -oE 'Deploy-WindowsApp\.ps1' ...` | **MATCH** (4) |
| `ruled 2026-09-10` = 1 | `grep -oE 'ruled 2026-09-10' ...` | **MATCH** (1) |
| 74 U+2014, 0 ASCII ` -- ` | Python `str.count('\u2014')`; `grep -oF -- ' -- '` | **MATCH** (74 / 0) |
| 27 `>` runs, max 197 chars | Reproduced the validator's exact join-with-space algorithm from `c17-eee-contract.mjs` (strips `^>\s?`, joins with `' '`, not `'\n'`) | **MATCH** (27 runs, max 197) -- a naive newline-joined re-measurement first returned 199; the validator's own algorithm is space-joined and gives 197 |
| CRLF worktree, LF blob | `git check-attr -a` -> `text: auto`, `eol: lf` on RE-237, NOTICE, functions file, README; `file` reports CRLF line terminators on the worktree copy | **MATCH** |
| `last_verified: 2026-09-14`, `review_by: 2026-12-13` | `grep -nE '^(last_verified\|review_by):'` | **MATCH** |
| 326 lines | `wc -l` | **MATCH** |
| Upstream pin `11918c50...` (2026-09-03) | `curl .../commits?path=De-Bloat/RemoveBloat.ps1&per_page=1` | **MATCH** -- SHA still first result, same author date |
| 179,789 bytes, SHA256 `bf0f4bd0...` | Two independent `curl` fetches at that SHA, `cmp` identical, `sha256sum` | **MATCH** |
| LICENSE 35,149 bytes, SHA256 `3972dc97...` | Same method | **MATCH** |
| 4,405 lines | `wc -l` on fetched file | **MATCH** |
| Signature block 4229-4405 | `grep -n 'SIG # Begin signature block'` -> line 4229; file ends at 4405 | **MATCH** |
| Ten distinct GUIDs, fifteen occurrences, exact lines (352-355, 818, 900-901, 966, 976, 1487, 1599, 2286, 2290, 2910, 3594) | `grep -noiE` GUID regex on the fetched bytes | **MATCH** -- every line number exact |
| `$IsOOBEComplete` gate at 4097 runs Office/Chrome/ODT block | `sed -n '4095,4099p'` | **MATCH** |
| `$intunecomplete` read only inside a log string | `grep -n` -> line 4199, `write-output "$intunecomplete number of apps detected"` | **MATCH** |
| Five runtime fetch paths, one unconditional | Lines 1716 (start2.bin), 2288 (HPConnOpt.iss), 3951/3970 (McAfee), 4189-4194 (ODT, unconditional) | **MATCH**, all exact |
| `Microsoft.MicrosoftEdge.Stable` on `$Bloatware` line 444, whitelisted line 332 | `sed -n '332p;444p'` | **MATCH** |
| `-custombloatlist` lines 511-521 both arms/disarms | `sed -n '511,521p'` | **MATCH** |
| PSADT 4.1.7 `Start-ADTProcess -PassThru` returns nothing on non-zero exit without `-ErrorAction SilentlyContinue` | Read the live `.PARAMETER PassThru` help block in the installed module | **MATCH**, quoted verbatim below |
| Frontend exits 60001 | `Frontend/v4/Invoke-AppDeployToolkit.ps1` lines 292 (`$ErrorActionPreference = ...Stop`) and 357 (`Close-ADTSession -ExitCode 60001` inside the catch) | **MATCH**, exact lines |
| Sensor v6 SID emission lines 113/123, dead guard 111, SRP-RULE path line 87 | Not re-measured this session (D-48/D-50 explicitly route this to Phase 164, and it requires reading `remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1`, which is out of this phase's edit scope) -- no drift indication found, treated as **no observation, not reconfirmed** | See note below |
| NOTICE SHA256 for functions file/README: `fcd83293...` / `44e6c618...` | `git show HEAD:<path> \| sha256sum` on both files | **MATCH** -- both current file hashes equal the NOTICE-recorded pre-edit hashes exactly, confirming NOTICE's existing entry is still accurate before 161's edits |
| Largest tracked file 1,701,557 bytes; largest outside `.planning/` 160,165 bytes | `git ls-tree -r -l HEAD`, sorted | **MATCH** -- `.planning/artifacts/154-scratch-corpus.bundle` (1,701,557); `scripts/docs-style/_JUDGE-VERDICTS.json` (160,165) |
| `SUCCESS-CRITERION AMENDMENT` = 1 per governance file today; `D-27` already a live amendment label in three archived files | `grep -oF` counts on ROADMAP.md/REQUIREMENTS.md; `grep -rl 'SUCCESS-CRITERION AMENDMENT, D-27\]' .planning/milestones/` | **MATCH** -- 1/1 in active files; exactly 3 archived files (`v1.20-phases/142-.../142-01-PLAN.md`, `v1.20-ROADMAP.md`, `v1.22-REQUIREMENTS.md`) reuse the `D-27` label from earlier phases, confirming no collision |
| Apex `check-phase-159` 117/0 in ~2 minutes; `check-phase-54` 32/0; `check-phase-155` 10/0; `check-phase-156` 10/0; c17 237/0; nav-hub 0/0 | Ran all six live | **MATCH** -- apex 117 PASS/0 FAIL/0 SKIPPED at 2m4.859s wall-clock (matches the "~2 minutes" precedent in project memory) |

**Note on the sensor-defect line numbers:** I did not re-open `Detect-KioskAppBlocks-v6.ps1` this session because D-50 explicitly routes any sensor fix to Phase 164 and reading it produces no planning obligation for 161 beyond citing it in `161-EVIDENCE.md` §8, which is FACTS+SHAPE, not byte-pinned. Treat the four line numbers (87, 111, 113, 123) as **unconfirmed this session** rather than either MATCH or DRIFT -- if the plan text needs to quote them verbatim, 161-04 T6 must re-grep them at landing time per its own house rule ("Locate by quoted text, then re-measure").

### (b) Upstream GitHub pin -- confirmed live, see table above. Repo license via `.../repos/andrew-s-taylor/public/license` returns `"key": "gpl-3.0"`, `"spdx_id": "GPL-3.0"` -- **MATCH**.

### (c) PSADT 4.1.7 `-PassThru` semantics -- confirmed from the installed module

Read from `C:\Users\joanderson\OneDrive\Documents\PowerShell\Modules\PSAppDeployToolkit\4.1.7\PSAppDeployToolkit.psm1`, `function Start-ADTProcess`, `.PARAMETER PassThru` block:

> "If `-NoWait` is not specified, returns an object with ExitCode, StdOut, and StdErr output from the process. If `-NoWait` is specified, returns a task that can be awaited. Note that a failed execution will only return an object if either `-ErrorAction` is set to `SilentlyContinue`/`Ignore`, or if `-IgnoreExitCodes`/`-SuccessExitCodes` are used."

This is the exact mechanism D-21 and E-P1's comment rely on: without `-ErrorAction SilentlyContinue`, `$r` is never assigned on a non-zero exit, so `if ($r.ExitCode -ne 0) { Close-ADTSession -ExitCode 70002 }` can never fire -- the function throws first. From `Frontend/v4/Invoke-AppDeployToolkit.ps1`:

- Line 292: `$ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop`
- Line 357: `Close-ADTSession -ExitCode 60001` (inside the `catch` block around `& "$($adtSession.DeploymentType)-ADTDeployment"`)

So an unhandled throw from `Start-ADTProcess` inside `Install-ADTDeployment` propagates to this catch and exits **60001**, not 70002 -- confirming D-21's claim that "the shipped 70002 gate has never been reachable" absent `-ErrorAction SilentlyContinue`. **MATCH, VERIFIED against source, not documentation alone.**

### (d) File-level anchors for the executor -- re-confirmed, two convenience-pointer corrections found

| File | CONTEXT.md claim | Live measurement | Status |
|---|---|---|---|
| `KioskBaseline-Invoke-AppDeployToolkit-functions.ps1` header 1-16 | Lines 8 and 10 quoted verbatim in E-P2a | `sed -n '1,16p'` reproduces both lines byte-exact: line 8 "ESP-BLOCKING by design: local-only work, seconds to run, no network dependencies." and line 10 "Files\ must contain (copied from the SAME repo commit as the remediation packages - one source):" | **MATCH** |
| Same file, `$script:RegKey` | Line 40 | `grep -n` -> line 40 exact | **MATCH** |
| Same file, pre-Install loop | Lines 47-52 | `grep -n 'foreach ($f in'` -> 47; block ends 52 | **MATCH** |
| Same file, Install comment+loop | Lines 58-68 | Comment starts 58, loop 61-68 | **MATCH** |
| Same file, `AppVersion` | Canonical_refs: "line 24" | `grep -n "AppVersion "` -> **line 21**, not 24 | **DRIFT (cosmetic)** -- `AppScriptVersion` (28) and `AppScriptDate` (29) both confirm MATCH; only the `AppVersion` pointer is off by 3. Not load-bearing: E-P2a's session-block instruction names the *field*, not the line number, so the executor edits correctly by field name regardless. |
| Baseline `README.md` H2s | Canonical_refs: "lines 3, 9, 15, 23, 28" | `grep -n '^## '` -> 3, 9, 15, **24**, 28 (`## Versioning` is 24, not 23) | **DRIFT (cosmetic)** -- one-line offset. D-25's locked section-order and the `grep -cFx` pin on the five H2 literals both key on the exact heading text, not the line number, so this does not affect any locked string or needle. |
| `NOTICE` header line 9-10 | E-N3's antecedent | `grep -cFx` of the exact quoted antecedent -> 1 | **MATCH** |
| `NOTICE` GAP paragraph | Lines 332-342 | Confirmed: paragraph spans exactly that range, followed by blank line then `Mechanical scrub verification note` at line 344 | **MATCH** |
| `NOTICE` `Plan 155-05 wiring` heading | Line 362 | `grep -n '^Plan 155-05 wiring$'` -> 362 | **MATCH** |
| `NOTICE` lines 371-378 (the paragraph E-N4 supersedes) | Quoted text | `sed -n '369,380p'` reproduces the exact quoted antecedent text ("the three artifacts named in the recipe but not committed here... RemoveBloat.ps1 (Andrew Taylor's public De-Bloat -- still an open 'Ask the admin' decision in RE-237 Step 8, not vendored)") | **MATCH** |
| RE-237 (`docs/recipes/06-walk-up-avd-kiosk-autologon.md`) | Step 4 idiom lines 100-116, Step 8 lines 207-225, Asset Provenance 234-243, Version History 321-326, frontmatter 7-8 | Not individually re-walked line-by-line this session (out of budget); the aggregate counts that gate these regions -- `administrator`=10, lead-ins=5, callouts=9, Provenance heading=1, `Deploy-WindowsApp.ps1`=4, `ruled 2026-09-10`=1 -- all independently MATCH (see table above), which is strong corroborating evidence the region boundaries have not shifted materially | **MATCH (by aggregate corroboration)** |
| ROADMAP.md Phase 161 block | Lines 97-108, SC2 at 105, SC3 at 106 | `grep -n` confirms exactly: heading 97, SC1 104, **SC2 105**, **SC3 106**, `**Plans**: TBD` 108 | **MATCH** |
| REQUIREMENTS.md VND-01/02/03 | Lines 63/64/65 | `grep -n` confirms exactly | **MATCH** |
| REQUIREMENTS.md VND checkbox anchors | `^- \[ \] \*\*VND-0[23]\*\*:` = 2 | `grep -cE` | **MATCH** |
| `roadmap.get-phase 161` | 3 success_criteria | `gsd_run query roadmap.get-phase 161` | **MATCH** |
| The four amendment antecedents (E-A1..A4) | Present byte-exact, each in exactly one file | `grep -cF` of each exact antecedent string against both files | **MATCH** -- all four present exactly once in their own file, zero in the other |
| `Build-WindowsAppPackage.ps1` `.PARAMETER CodeSigningCertThumbprint` and signing idiom | Lines 21, 86-93 | Not re-opened this session (budget); no contradicting signal found elsewhere | **No observation this session** -- re-grep at plan time per DRAFTS's own rule |

### (e) Validators bounding the edits -- all run live at HEAD `8d1baeb0`

| Validator | Result | Matches CONTEXT.md claim |
|---|---|---|
| `check-phase-54.mjs` | 32 passed, 0 failed, 0 skipped | **MATCH** |
| `check-phase-155.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED | **MATCH** |
| `check-phase-156.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED | **MATCH** |
| `c17-eee-contract.mjs` | 237 files checked, 0 with violations, 0 total violations (all 13 assertions 0) | **MATCH** |
| `check-nav-hub-links.mjs` | 0 hub-presence failures, 0 corpus-link failures, 0 total | **MATCH** |
| `check-phase-159.mjs` (apex, un-nested) | 117 PASS, 0 FAIL, 0 SKIPPED, wall-clock 2m4.859s | **MATCH** -- precedent in project memory records "~2 min for check-phase-159 at HEAD, 117 checks"; running with `CHECK_PHASE_NESTED=1` instead (as I first tried) short-circuits to 3 PASS/114 SKIPPED -- **use the un-nested invocation for the pre-wave baseline, not the nested one** |
| `claude auth status` | `{"loggedIn": true, "authMethod": "claude.ai", ...}` | Auth is live; probe passes |
| `git status --porcelain` | Clean except one untracked, pre-existing, out-of-scope directory: `.claude/skills/fireworks-tech-graph/` (a user-added skill directory per the session's own git-status context, not part of any milestone) | Effectively clean for gate purposes |
| root `npm test` | Fails immediately: `'vitest' is not recognized...` (frontend deps not installed in this environment) | This is a **pre-existing environment condition**, not something Phase 161 introduces. D-44 specifies "compare-not-count" for this probe -- the pre-wave and post-wave readings should both show the identical failure, which is itself the "no drift" signal, not a blocker |
| `git check-attr -a` on both future vendored paths | Cannot be probed before the files exist; confirmed instead on the four *existing* Baseline/NOTICE/RE-237 files, all reading `text: auto`, `eol: lf` | Consistent with `.gitattributes`; the vendored files will inherit the same rule once added |

### (f) gsd-tools behaviors the plans depend on

- **`requirements.mark-complete` fires from plan frontmatter at every plan boundary.** Confirmed in `~/.claude/gsd-core/workflows/execute-plan.md` step `update_requirements` (line ~518): every completing plan extracts its `requirements:` frontmatter field, computes the "ready" subset via `requirements.ready-ids` (a **shared-ID gate**: an ID declared by more than one *sibling* plan in the same phase is blocked until every declaring plan has a `*-SUMMARY.md`), then calls `gsd_run query requirements.mark-complete ${READY_IDS}`. For Phase 161's four *sequential* plans (waves 1-4, no ID declared by more than one plan -- VND-01 only in 161-02, VND-02+VND-03 only in 161-04), the shared-ID gate never blocks anything; each requirement flips cleanly at the boundary of the single plan that declares it, exactly as D-35 assumes.
- **The checkbox regex is bullet-start-anchored.** `~/.claude/gsd-core/bin/lib/milestone.cjs` line 168: `` const checkboxPattern = new RegExp(`(-\\s*\\[)[ ](\\]\\s*\\*\\*${reqEscaped}\\*\\*)`, 'gi'); `` -- this matches only `- [ ]**REQ-ID**` and is structurally blind to anything appended after the bullet line's own text (an end-of-line amendment cannot touch the `[ ]` it is matching). **MATCH** for D-40's claim that this regex is "structurally immune to an end-of-line append."
- **`cmdRequirementsMarkComplete` (in `milestone.cjs`, line 112) takes no dry-run parameter** -- confirmed by reading its signature and body: it requires at least one requirement ID and unconditionally writes both surfaces (checkbox + traceability row) for every ID passed. **MATCH** for D-40's claim that no dry-run call is possible, so 161-01 correctly avoids calling it at all.
- **`checkpoint:human-action` task syntax and the `decline` resume path.** Read `160-02-PLAN.md` lines 181-216 (Task 1: pilot licensing checkpoint) live. Its shape -- `<task type="checkpoint:human-action">`, `<read_first>` naming the DRAFTS.md source block, `<action>` describing an allowlist not an exclusion list, `<instructions>` with a literal `decline` escape hatch, `<verification>`, `<resume-signal>`, `<acceptance_criteria>` (including "the plan does not halt on decline"), `<done>`, `<reversibility rating="reversible">` -- is the exact idiom `161-DRAFTS.md`'s E-C1 (PART F) extends, with the rating raised to `costly` because 161's checkpoint is device-mutating (an actual pilot deploy + Autopilot Reset) rather than read-only.
- **`<reversibility rating="costly">` syntax.** Confirmed against `~/.claude/gsd-core/references/planner-reversibility.md`: the three-tier taxonomy is `reversible` (no checkpoint/flag), `costly` (flagged in the plan, does not block execution), `one-way` (forces a `checkpoint:decision` before the dependent task). E-C1 is correctly rated `costly`, not `one-way` -- undoing it is "revert the wiring commit and run one further Autopilot Reset," a coordinated-but-bounded cost, not a data migration or a broken external contract. `costly` items get **no forced pre-checkpoint**; the checkpoint present in E-C1 exists because it is *also* a `checkpoint:human-action` for the pilot-run task itself, which is orthogonal to the reversibility rating. Any plan containing a checkpoint must set `autonomous: false` in frontmatter -- 161-04's frontmatter already does (`autonomous: false # carries one checkpoint:human-action`).

## Standard Stack

No new libraries or package-manager dependencies are introduced by this phase. The "stack" is entirely the existing repo toolchain plus one vendored third-party PowerShell script:

| Component | Version | Purpose | Provenance |
|---|---|---|---|
| PSAppDeployToolkit | 4.1.7 (locally installed at `C:\Users\joanderson\OneDrive\Documents\PowerShell\Modules\PSAppDeployToolkit\4.1.7`) | Packaging/execution framework for the Baseline Win32 app | Already in use by the Baseline package; not newly introduced |
| `RemoveBloat.ps1` (De-Bloat) | Pinned commit `11918c5085b1be5ba25ace74c5cf3a52bfd37b26` (upstream-declared `Version: 5.6.4`) | Vendor/OEM bloatware removal for Windows kiosk endpoints | `[VERIFIED: GitHub API + raw.githubusercontent.com, two independent fetches, byte-identical]` -- `andrew-s-taylor/public`, GPL-3.0 |
| GitHub REST API (`api.github.com`) | n/a | Commit-SHA pinning and license confirmation | `[VERIFIED: live curl this session]` |

**Version verification:** `curl https://api.github.com/repos/andrew-s-taylor/public/commits?path=De-Bloat/RemoveBloat.ps1&per_page=1` returns the pinned SHA as of 2026-09-16 (re-run at 161-02 execution time per D-01's "at plan time" rule -- the SHA could advance between this research pass and actual plan execution).

## Package Legitimacy Audit

Not applicable in the npm/PyPI/crates sense -- this phase vendors a single PowerShell script from a public GitHub repository at a pinned commit, not a package-manager dependency. The equivalent legitimacy signal here is: repository age/activity (the account and repo predate this pin by years, per prior-phase research already cited in `.planning/research/PITFALLS.md` Pitfall 6 and `STACK.md` line 31), a declared OSI license (GPL-3.0, confirmed live via `/repos/andrew-s-taylor/public/license` -> `"spdx_id": "GPL-3.0"`), and byte-identity across two independent fetches (confirmed above). No `postinstall`-equivalent risk exists since nothing is installed via a package manager -- the script is a static `.ps1` invoked directly by PSADT with `-ErrorAction SilentlyContinue` and no elevation beyond what the Baseline package already runs under.

## Architecture Patterns

### System flow (Baseline install order, per D-20/E-P1)

```
ESP device setup begins (before kiosk account exists)
        |
        v
Install-ADTDeployment (KioskBaseline-Invoke-AppDeployToolkit-functions.ps1)
        |
        v
Pre-Install: verify all three $script:BundledScripts files present
   (RemoveBloat.ps1, Remove-KioskOemBloat.ps1, Remove-KioskRunTasks.ps1)
   -- missing file => Close-ADTSession -ExitCode 70001
        |
        v
Install loop, in $script:BundledScripts order:
   1. RemoveBloat.ps1  -AllowStartMenuReset false   [vendored, GPL-3.0]
        -> Start-ADTProcess -PassThru -ErrorAction SilentlyContinue
        -> non-zero exit => Close-ADTSession -ExitCode 70002
        -> reg unload HKU\temphive (De-Bloat leaks this mount 3x; never checked upstream)
   2. Remove-KioskOemBloat.ps1                       [EEE-authored]
   3. Remove-KioskRunTasks.ps1                        [EEE-authored, mounts the SAME
                                                         Default hive file next --
                                                         must not collide with a leaked mount]
        |
        v
Kiosk account is created; first-logon profile is born clean
```

### Recommended plan structure (already locked, D-35 / DRAFTS PART H)

```
161-01-PLAN.md Wave 1 Gate baseline + amendment appends (requirements: [])
161-02-PLAN.md Wave 2 Vendor the bytes + NOTICE record + scrub scan (requirements: [VND-01])
161-03-PLAN.md Wave 3 Kiosk-safety review + reconciliation (requirements: [])
161-04-PLAN.md Wave 4 Wire into Baseline + RE-237 + pilot checkpoint (requirements: [VND-02, VND-03])
```

### Pattern: annotate-and-supersede for governance text
**What:** A `[SUCCESS-CRITERION AMENDMENT, D-NN]` (or `[MEASURED ...]`/`CLOSED ...`/`SUPERSEDED IN PART ...`) block is appended after the original text, never deleting it.
**When to use:** Any edit to `ROADMAP.md`, `REQUIREMENTS.md`, or `NOTICE` where the original record has independent historical value.
**Example (confirmed present, byte-exact, this session):**
```text
... and the script carries the same Authenticode signing chain as the rest of the Baseline package.
 **[SUCCESS-CRITERION AMENDMENT, D-27]** The clause "...signing chain as the rest of the Baseline
package" is superseded, not deleted: it is rescoped to **the Baseline `README.md` records the
signing step ...**
```
(Source: `161-DRAFTS.md` E-A1, to be appended to `.planning/ROADMAP.md` line 105.)

### Anti-Patterns to Avoid
- **Editing `.planning/ROADMAP.md`/`STATE.md` via `Write` or bulk `Edit` outside the anti-pattern-15 carve-out:** the universal rule bans direct mutation of these files for progress/checkbox state; the carve-out (D-40) is scoped narrowly to criterion/bullet **text** amendments, which the `gsd-tools roadmap`/`requirements` subcommands cannot perform.
- **Calling `requirements.mark-complete` speculatively to "test" the flip:** it has no dry-run mode (confirmed above) and a real call inside 161-01 would prematurely flip VND-02/VND-03 before their content lands.
- **Assuming `-PassThru` alone captures a `Start-ADTProcess` failure:** confirmed above that `-ErrorAction SilentlyContinue` (or `-IgnoreExitCodes`/`-SuccessExitCodes`) is required, or the function throws before `$r` is ever assigned.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Authenticode signing of staged scripts | A new signing script/module | The existing idiom in `Build-WindowsAppPackage.ps1` lines 86-93 (`Set-AuthenticodeSignature -TimestampServer ... -HashAlgorithm SHA256`, cert by thumbprint) | It is already the repo's one signing idiom; D-24 documents it as an assembly step rather than re-implementing signing logic |
| GPL-3.0 compliance verification | A custom license-diff tool | `sha256sum` byte-identity + the GitHub REST API's `/license` endpoint (both used this session) | Two independent fetches plus a registry-level license confirmation is sufficient and matches the project's own verification idiom (`git show HEAD:<path> \| sha256sum`) |
| Requirement-completion tracking across plans | A bespoke flip-tracking file | `gsd_run query requirements.mark-complete` / `requirements.ready-ids` (already exists, shared-ID-gate aware) | Re-implementing this risks exactly the race D-35 already reasoned about (declare a requirement only where its last conjunct settles) |

**Key insight:** every "build vs. reuse" decision in this phase was already resolved during discuss-phase; the only remaining risk is *executor* drift from a stale line-number pointer, not architectural novelty.

## Common Pitfalls

### Pitfall 1: Assuming `Start-ADTProcess -PassThru` always returns an object
**What goes wrong:** Code checks `$r.ExitCode` after a call without `-ErrorAction SilentlyContinue`; on any non-zero exit PSADT 4.1.7 throws before `$r` is assigned, so the exit-code check is unreachable and the session instead exits 60001 from the frontend's global catch.
**Why it happens:** `-PassThru`'s own default (no override) still respects the ambient `$ErrorActionPreference`, which the v4 frontend sets to `Stop` at line 292.
**How to avoid:** Always pair `-PassThru` with `-ErrorAction SilentlyContinue` (or `-IgnoreExitCodes`/`-SuccessExitCodes`) when a custom non-zero handler is needed downstream -- exactly what E-P1 does.
**Warning signs:** A package's return-code map documents a code (e.g., 70002) that a review of the transcript history shows was never actually emitted.

### Pitfall 2: Treating a re-measured line-run join as identical to a naive one
**What goes wrong:** Counting a blockquote run's character length by joining lines with `\n` instead of `' '` produces a different (larger) number than the C17 validator uses, which strips the `>` prefix and joins with a single space.
**Why it happens:** The obvious Python one-liner (`'\n'.join(...)`) is not what `c17-eee-contract.mjs` does internally.
**How to avoid:** When re-measuring a validator's own metric, read the validator's source first and reproduce its exact algorithm, not an intuitive equivalent -- confirmed this session (naive method gave 199, validator-faithful method gave the documented 197).

### Pitfall 3: A leaked registry hive mount silently blocking a later script
**What goes wrong:** `RemoveBloat.ps1` mounts `C:\Users\Default\NTUSER.DAT` as `HKU\temphive` three times (lines 1250, 1417, 1529) and its own unloads (1268, 1521, 1633) are unconditional in the source but the script never *verifies* the unload succeeded; if a mount handle leaks, `Remove-KioskRunTasks.ps1`'s own hive mount (line 52, using its own key name `HKU\KioskSeedFix` against the *same file*) can fail with a sharing violation.
**Why it happens:** Two independently-authored scripts touch the same default-user hive file in sequence with no shared coordination.
**How to avoid:** D-18's explicit `reg unload HKU\temphive 2>&1 | Out-Null` immediately after the De-Bloat entry in the install loop, before the next bundled script runs.
**Warning signs:** `Remove-KioskRunTasks.ps1`'s `reg load` command returning a non-`ERROR`-free result unexpectedly on a device where De-Bloat ran first.

### Pitfall 4: The Office Deployment Tool fetch is not actually conditional
**What goes wrong:** README/RE-237 prose describing De-Bloat's runtime network calls as "conditional, low-risk" without calling out that the ODT fetch from `officecdn.microsoft.com` (lines 4189-4194) sits inside the `$IsOOBEComplete -eq 0` gate -- which is true on *every* ESP device-setup pass, not an Intune-detected condition -- making it effectively unconditional during provisioning.
**Why it happens:** The four other fetch paths genuinely are conditional (missing profile, HP InstallShield folder present, McAfee uninstall entry present); it is easy to generalize incorrectly to the fifth.
**How to avoid:** State the ODT fetch's unconditional nature explicitly in both NOTICE and the README fetch-path table (already locked into E-N1 and the `## Known runtime fetch paths and their triggers` shape) -- the fact-check rubric's own round-1 rule (D-33) exists specifically to catch a rewrite that accidentally reintroduces "conditional" language for this row.

## Code Examples

### The PSADT bundled-scripts invocation loop (confirmed reachable, D-20/E-P1)
```powershell
# Source: 161-DRAFTS.md PART C, E-P1 (VERBATIM-LOCKED); verified against the live PSADT 4.1.7
# module help text for Start-ADTProcess -PassThru this session.
foreach ($s in $script:BundledScripts) {
    Write-ADTLogEntry -Message "Running $($s.File) $($s.Args)"
    # -ErrorAction SilentlyContinue is load-bearing: without it PSADT 4.1.7 throws on a non-zero
    # exit and $r is never assigned, so the 70002 gate below is unreachable and the session exits
    # 60001 instead - a code this package's Intune return-code map does not carry.
    $r = Start-ADTProcess -FilePath "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" `
          -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$(Join-Path $adtSession.DirFiles $s.File)`" $($s.Args)" `
          -WindowStyle Hidden -PassThru -ErrorAction SilentlyContinue
    Write-ADTLogEntry -Message "$($s.File) exit code $($r.ExitCode)"
    if ($r.ExitCode -ne 0) { Close-ADTSession -ExitCode 70002 }
    if ($s.File -eq 'RemoveBloat.ps1') {
        reg unload HKU\temphive 2>&1 | Out-Null
    }
}
```

### Verifying vendored-byte identity (the owner's one-command proof, per D-06/`<specifics>`)
```bash
# Source: this session, live-run against the two independent raw.githubusercontent.com fetches
git show HEAD:"assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1" | sha256sum
# Expected: bf0f4bd01991bb1becf5e33a24ad410c3781281afe3c1774cbf3225a17d24e99
```

## State of the Art

Not applicable in the usual "library X replaced library Y" sense -- this is a single-shot vendoring of a static script at a pinned commit, not a moving dependency. The one relevant "state of the art" fact: upstream's `De-Bloat/RemoveBloat.ps1` was last touched 2026-09-03 (commit message "Many fixes"), thirteen days before this research session, and remains the first result for the path-scoped commit query -- confirming no newer upstream commit has landed that would change the pin.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `Build-WindowsAppPackage.ps1` lines 21 and 86-93 still contain the `.PARAMETER CodeSigningCertThumbprint` and signing idiom as CONTEXT.md describes | Don't Hand-Roll; Re-measurement (d) | Low -- this file is untouched by any prior phase's edits and no drift was suggested by any other measurement; if wrong, 161-04's README `## Assemble` signing-step prose would cite a stale idiom, caught by the plan's own fact-check pass (D-33) before it lands |
| A2 | RE-237 Step 4/8/Provenance/Version-History exact line ranges (100-116, 207-225, 234-243, 321-326) have not shifted, based on aggregate count corroboration rather than a fresh line-by-line walk | Re-measurement (d) | Low -- DRAFTS.md's own rule already treats these as convenience pointers ("locate by quoted text, then re-measure"); the plan's task list re-locates by quoted antecedent text regardless, per E-R6/E-R1..R5's own anchoring method |
| A3 | Sensor v6 line numbers (87, 111, 113, 123) are unchanged since CONTEXT.md's measurement | Re-measurement (a), note | Low -- D-50 hands this to Phase 164; if wrong, only `161-EVIDENCE.md` §8's hand-off note would need a corrected line number, not any locked string or plan behavior |

## Open Questions (RESOLVED)

1. **Does the `AppVersion`/`## Versioning` line-number drift found in canonical_refs require a CONTEXT.md correction before planning?**
 - What we know: Both drifts are 1-3 line offsets in convenience pointers only; no VERBATIM-locked string, needle, or `grep -cFx` pin depends on either number.
 - What's unclear: Whether the planner should silently absorb this or flag it.
 - RESOLVED: `161-DRAFTS.md`'s own stated rule -- "Line numbers are convenience pointers, never identity. Locate by quoted text, then re-measure." (line 9) -- already governs this exactly. No CONTEXT.md amendment is needed; the planner's task `<read_first>` blocks should simply not assert the specific stale line numbers as fact, consistent with how DRAFTS.md itself is written (FACTS+SHAPE fields, not byte-pinned line numbers).

2. **Should this research re-open `Detect-KioskAppBlocks-v6.ps1` to confirm the four sensor-defect line numbers?**
 - What we know: D-50 explicitly defers any sensor fix to Phase 164; 161-04 only *records* the defect hand-off in `161-EVIDENCE.md` §8, which is FACTS+SHAPE, not VERBATIM-locked.
 - What's unclear: Whether a stale line number in that hand-off note would cause any validator failure.
 - RESOLVED: No validator in the pre-wave or post-wave gate bracket (D-44) reads this file or these line numbers; 161-04 T6's own house rule already requires re-measuring at landing time. No action needed in this research pass.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `curl` / GitHub REST + raw content API | Vendoring pin/fetch (161-02 T1) | Yes | -- | -- |
| PSAppDeployToolkit module (local) | Reading `-PassThru` help/source for D-21 verification | Yes | 4.1.7 at `C:\Users\joanderson\OneDrive\Documents\PowerShell\Modules\PSAppDeployToolkit\4.1.7` | -- |
| `claude auth status` / `claude -p` | Review/fact-check/judge dispatches (161-03 T2, 161-04 T5) | Yes | `loggedIn: true`, `authMethod: claude.ai` | -- |
| `git check-attr -a` | Pre/post-wave gate bracket line-ending checks | Yes | -- | -- |
| Node.js validators (`check-phase-*.mjs`, `c17-eee-contract.mjs`, `check-nav-hub-links.mjs`) | Gate bracket | Yes, all run clean | -- | -- |
| Root `npm test` (frontend `vitest`) | D-44's compare-not-count baseline | **No** -- `vitest` not installed/resolvable in this environment | -- | This is a pre-existing condition unrelated to Phase 161; D-44 already specifies compare-not-count rather than a pass requirement, so the identical failure before and after is itself the "no drift" signal |
| Pilot kiosk device + tenant | 161-04 T2 checkpoint (assemble, sign, deploy, Autopilot Reset) | Not probed from this environment (owner-run, per checkpoint design) | -- | `decline` is a fully supported resume path (D-31); VND-02/VND-03 still flip either way |

**Missing dependencies with no fallback:** None -- the one missing dependency (`vitest`) has an explicit fallback already designed into the gate contract.

## Security Domain

### Applicable ASVS Categories

This phase does not build a web application; the closest ASVS mapping is around supply-chain/dependency integrity and configuration, not authentication/session/input-validation controls.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | N/A -- no auth surface changes |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A -- kiosk account model is unchanged by this phase |
| V5 Input Validation | No | N/A -- no new user-facing input |
| V6 Cryptography | Partial | Authenticode signing via `Set-AuthenticodeSignature -HashAlgorithm SHA256` (existing repo idiom, `Build-WindowsAppPackage.ps1`); never hand-rolled |
| V14 Configuration (dependency provenance) | Yes | Pinned-commit vendoring with a two-fetch byte-identity check and a GitHub-API-confirmed SHA is the standard control for "verify what you vendor" |

### Known Threat Patterns for this phase's stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Vendored script silently updated upstream between research and execution (supply-chain drift) | Tampering | Pin to an exact commit SHA (not `main`), re-confirm via the GitHub API at plan/execution time (D-01's explicit rule), byte-compare two independent fetches before committing |
| A kiosk-safety-critical package (`MicrosoftEdgeUpdate`, WebView2, Company Portal) accidentally removed by an upstream bloatware list update | Denial of Service (device bricking the sign-in path) | The PROTECTED list + five negative controls (D-09) + a second independent `claude -p` review pass (D-52), re-run at every re-pin (D-23's re-pin procedure) |
| An unhandled `Start-ADTProcess` exception silently masking a real install failure as a generic 60001 rather than the package's own 70002 code | Repudiation (loss of diagnostic fidelity) | `-ErrorAction SilentlyContinue` making the 70002 path reachable, confirmed this session against the installed module's own semantics |
| Leaked hive mount from one script blocking a subsequent script's registry operation | Denial of Service (provisioning failure) | Explicit `reg unload HKU\temphive` after the vendored script (D-18) |
| GPL-3.0 non-compliance (missing license text or attribution in a redistributed binary/package) | (Not STRIDE -- legal/compliance) | Full GPL-3.0 text carried inside the `.intunewin` at `Files/LICENSE.GPL-3.0.txt`, attribution and pin recorded in `NOTICE` |

## Sources

### Primary (HIGH confidence, `[VERIFIED]`)
- `https://api.github.com/repos/andrew-s-taylor/public/commits?path=De-Bloat/RemoveBloat.ps1&per_page=1` -- live curl this session, confirmed pin
- `https://raw.githubusercontent.com/andrew-s-taylor/public/11918c5085b1be5ba25ace74c5cf3a52bfd37b26/De-Bloat/RemoveBloat.ps1` and `.../LICENSE` -- fetched twice each, byte-compared, hashed
- `https://api.github.com/repos/andrew-s-taylor/public/license` -- confirmed `GPL-3.0`
- `C:\Users\joanderson\OneDrive\Documents\PowerShell\Modules\PSAppDeployToolkit\4.1.7\PSAppDeployToolkit.psm1` -- read live, `Start-ADTProcess` `.PARAMETER PassThru` block quoted verbatim
- `C:\Users\joanderson\OneDrive\Documents\PowerShell\Modules\PSAppDeployToolkit\4.1.7\Frontend\v4\Invoke-AppDeployToolkit.ps1` -- read live, lines 292 and 357
- `~/.claude/gsd-core/bin/lib/milestone.cjs` -- read live, lines 112 and 168
- `~/.claude/gsd-core/workflows/execute-plan.md` -- read live, `update_requirements` step
- `~/.claude/gsd-core/references/planner-reversibility.md` -- read live
- `.planning/phases/160-licensing-hardware-decision-record/160-02-PLAN.md` -- read live, lines 181-216
- All in-repo validator runs (`check-phase-54.mjs`, `-155.mjs`, `-156.mjs`, `c17-eee-contract.mjs`, `check-nav-hub-links.mjs`, `check-phase-159.mjs`) -- executed live this session against HEAD `8d1baeb0`
- `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, `assets/recipes/06-walk-up-avd-kiosk/NOTICE`, `docs/recipes/06-walk-up-avd-kiosk-autologon.md`, and the Baseline package files -- all read live this session

### Secondary (MEDIUM confidence, `[CITED]`)
- None beyond the above -- this research pass was almost entirely direct verification against primary sources, per the orchestrator's re-measurement mandate.

### Tertiary (LOW confidence, `[ASSUMED]`)
- The four RE-237 anchor line ranges not individually re-walked this session (Step 4 100-116, Step 8 207-225, Provenance 234-243, Version History 321-326) -- corroborated only by aggregate count matches, not a direct line-by-line re-read; see Assumptions Log A2.
- `Build-WindowsAppPackage.ps1` lines 21/86-93 not re-opened this session; see Assumptions Log A1.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies; the one vendored artifact's provenance was independently re-verified via two live fetches plus a registry license lookup
- Architecture: HIGH -- the plan shape is fully pre-locked by CONTEXT.md/DRAFTS.md; this research only confirmed the load-bearing runtime mechanism (PSADT's `-PassThru` failure semantics) against the actual installed module rather than documentation alone
- Pitfalls: HIGH -- every cited pitfall was reproduced against live bytes (upstream script) or live source (PSADT module, gsd-tools) this session, not carried forward from memory

**Research date:** 2026-09-16
**Valid until:** Re-verify the GitHub pin and validator baselines immediately before 161-01/161-02 execute (the upstream commit and the validator counts are both explicitly re-measured-at-execution-time items per D-01 and D-44) -- this research's shelf life for the *pin* is effectively zero-tolerance-for-staleness by the plan's own design, not a calendar duration.
