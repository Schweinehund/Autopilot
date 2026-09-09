---
phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
plan: 03
subsystem: docs-assets
tags: [assets-tree, intune-payloads, powershell-shouldprocess, secrets-scrub, vendored-supply-chain, RE-237]

# Dependency graph
requires:
  - phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
    provides: "plan 155-02's founded asset tree, NOTICE convention, and pinned-SHA vendoring method; plan 155-03's own earlier debug.xml derivation (f53a2882)"
provides:
  - "assets/recipes/06-walk-up-avd-kiosk/package-sources/, remediations/ and diagnostics/ founded with the ten-item RCP-09 payload: three package sources, two detect/remediate pairs, the triage sensor and two diagnostics"
  - "Both Remove-KioskOemBloat.ps1 and Remove-KioskRunTasks.ps1 gated with [CmdletBinding(SupportsShouldProcess)] plus a $PSCmdlet.ShouldProcess check around every delete/remove/deprovision/unregister call, applied identically across all three required deployment copies"
  - "ConfigMgr package source scrubbed to documented placeholders per the owner's dated Task 2 ruling; two further employer-name occurrences found and scrubbed by the same threat class"
  - "package-sources/windows-app-win32/Dependencies/DEPENDENCIES.md pinning both VCLibs .appx dependencies by filename/version/URL/SHA256 in lieu of committing the binaries"
  - "NOTICE extended with full per-file provenance, both owner rulings verbatim, and a documented non-blocking GUID-search finding"
affects: [155-05-rcp-09-10-content-corrections, 155-06-registration-and-promotion, gsd-secure-phase]

# Actuals (#2632)
actuals:
  tokens: 31218
  tasks: 3
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SupportsShouldProcess on plain scripts (not functions): [CmdletBinding(SupportsShouldProcess)] plus param() placed after comment-based help, before any executable statement, so a top-level script gets a working $PSCmdlet without becoming a function. Every ShouldProcess check evaluates true by default (no -WhatIf/-Confirm passed, default ConfirmImpact Medium < default ConfirmPreference High), so unattended Intune Remediations behavior is provably unchanged while a future interactive caller gets -WhatIf support for free."
    - "Triplicated-copy edit discipline: when a recipe's own stated invariant is 'these N copies must stay byte-identical,' apply the edit to one working copy, then `cp` it verbatim into every other required location and confirm with `sha256sum` before commit, rather than hand-editing each copy separately."
    - "Owner-employer-name scrub as a threat class, not a single grep target: Ruling 1 named one literal (a ConfigMgr FQDN); the owner's covering instruction ('must not reach the index in ANY file') is the actual scope. A full-tree case-insensitive scan for the employer's name, run separately from the ruling's named literal, caught two further occurrences the ruling's own location pointer did not."
    - "Binary dependency pinning without committing: SHA256 computed directly from the owner-delivered staged bytes (not copied from any other source), paired with a live HTTP HEAD confirmation of the upstream URL at a pinned commit SHA whose Content-Length matches the staged file size exactly — the same discipline 155-02 established for the MSIX, extended to a second binary pair."

key-files:
  created:
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Build-WindowsAppPackage.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Deploy-WindowsApp.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Detect-WindowsApp.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/New-IntuneWindowsAppKiosk.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/README.md
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/README-upstream.md
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Dependencies/DEPENDENCIES.md
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskOemBloat.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskRunTasks.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Install-ConfigMgrClient.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Detect-ConfigMgrClient.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Uninstall-ConfigMgrClient.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/README.md
    - assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Detect-KioskOemBloat.ps1
    - assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Remove-KioskOemBloat.ps1
    - assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Detect-KioskRunTasks.ps1
    - assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1
    - assets/recipes/06-walk-up-avd-kiosk/remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1
    - assets/recipes/06-walk-up-avd-kiosk/diagnostics/Get-RdpCredDiag.ps1
    - assets/recipes/06-walk-up-avd-kiosk/diagnostics/Trace-StorisEula.ps1
  modified:
    - assets/recipes/06-walk-up-avd-kiosk/NOTICE

key-decisions:
  - "Triplication resolved by placement, not by a fourth directory: the manifest's `06-07-shared-removal-scripts/` staging folder was the owner's own authoring convenience (prove byte-identity before delivery), not one of RCP-09's ten enumerated items and not named in this plan's `<files>` manifest. Remove-KioskOemBloat.ps1 and Remove-KioskRunTasks.ps1 are committed to exactly the two real deployment surfaces that must each be self-contained — the Kiosk Baseline PSADT package's own Files\ folder, and the corresponding standalone Intune Remediations package — with the ShouldProcess edit applied identically to both and confirmed byte-identical by SHA256 before commit. This preserves RE-237:194's 'never let the copies diverge' invariant rather than breaking it."
  - "Scrub scope extended beyond Ruling 1's named literal to the same threat class: the owner's covering instruction that the employer name 'must not reach the index in ANY file' is broader than the one ConfigMgr line Ruling 1 named. A full-tree scan found two further Publisher/AppVendor-field occurrences of the employer name and scrubbed them to the same `<ORGANIZATION>` placeholder convention, while leaving the `EEE` abbreviation itself untouched (already an established, non-identifying attribution convention in this NOTICE since plan 155-02)."
  - "windows-app-win32/Deploy-WindowsApp.ps1 and Detect-WindowsApp.ps1 committed as a second, provenance-comment-free copy of the same upstream files 155-02 already vendored: this copy is the functional package-assembly tree Build-WindowsAppPackage.ps1 patches in place (regex-replacing $TargetVersion), so it must match what the owner actually built and ran on the pilot byte-for-byte, not carry an inserted comment block the way the 155-02 documentation-reference copy does."
  - "RemoveBloat.ps1 (Andrew Taylor's public De-Bloat) is not vendored. RE-237:196-201 frames it as a still-open 'Ask the admin' decision, not a settled requirement; this phase's own D-34 records SEED-002 §D lists it as deferred, not decided; and it was not part of the owner's Task 1 delivery. Recorded as a named NOTICE gap rather than fabricated or silently omitted."
  - "Get-RdpCredDiag.ps1's own header is left reading 'Untested as written' despite being pilot-validated on 2026-08-28: RE-237's own header-update convention (recipe manifest, 'Header convention' section) names only items 6-10 as the pilot-validated exception. The validation fact is recorded in NOTICE instead, without the pilot device's identifier (scrubbed under the same posture as Ruling 1 — a specific asset tag, not a documented placeholder)."

requirements-completed: [RCP-09]

coverage:
  - id: D1
    description: "Ten-item RCP-09 enumeration committed under assets/recipes/06-walk-up-avd-kiosk/ (three package sources, two detect/remediate pairs, the triage sensor, two diagnostics), every path tracked, non-empty, and matched by no .gitignore pattern"
    requirement: "RCP-09"
    verification:
      - kind: other
        ref: "git ls-files -- assets/recipes/06-walk-up-avd-kiosk/package-sources assets/recipes/06-walk-up-avd-kiosk/remediations assets/recipes/06-walk-up-avd-kiosk/diagnostics | while read p; do test -s \"$p\"; git check-ignore -q \"$p\"; done -- all 22 paths pass (non-empty, not ignored)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs -- 0 hub-presence failures, 0 corpus-link failures"
        status: pass
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs -- 237 files checked, 0 with violations"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-153.mjs (non-nested) -- 111 PASS, 0 FAIL, 0 SKIPPED, matching 155-GATE-BASELINE.json exactly"
        status: pass
    human_judgment: false
  - id: D2
    description: "ConfigMgr package source scrubbed to documented placeholders per the owner's dated ruling; both Remove-Kiosk*.ps1 scripts gated with SupportsShouldProcess/ShouldProcess on every destructive call without changing unattended behavior"
    requirement: "RCP-09"
    verification:
      - kind: other
        ref: "git grep -hoE GUID-pattern -- assets/ | sort -u | grep -civ 9A2A490F... -- returns 1 (not 0): the second GUID is a documented, pre-existing, non-tenant finding (see Task 3 verify results below), not a scrub failure in this plan's own payload"
        status: pass
      - kind: other
        ref: "grep -l SupportsShouldProcess assets/recipes/06-walk-up-avd-kiosk/**/Remove-Kiosk*.ps1 -- lists both scripts in all three committed locations"
        status: pass
      - kind: other
        ref: "powershell.exe parse-check ([System.Management.Automation.Language.Parser]::ParseFile) over every committed .ps1 -- ALL PS1 FILES PARSE CLEAN"
        status: pass
    human_judgment: true
    rationale: "Secret-scrub completeness on a public remote is a one-way, unrecoverable decision (D-29), and the automated backstop search surfaced one documented non-tenant GUID finding that a human should independently confirm is correctly dispositioned (not scrubbed by this plan's own scope) rather than accept on the executor's own account. Destructive-script ShouldProcess gates run unattended as SYSTEM daily on every enrolled kiosk; behavior-preservation reasoning is recorded here but warrants a human's own read before the next pilot cycle."

duration: 3h16m (f53a2882 to 9a114815, spanning the owner's artifact-staging turnaround between the two continuation sessions)
completed: 2026-09-04
status: complete
---

# Phase 155 Plan 03: Kiosk Baseline and Remediation Assets Summary

**Committed RCP-09's ten-item owner-supplied payload (three package sources, two detect/remediate pairs, the triage sensor, two diagnostics) under `assets/recipes/06-walk-up-avd-kiosk/`, scrubbed the ConfigMgr package source's live CMG hostname/site-code and two further employer-name leaks, and added `SupportsShouldProcess`/`ShouldProcess` gates to both destructive removal scripts across all three required deployment copies without changing their unattended pilot-validated behavior.**

## Performance

- **Duration:** ~3h16m total plan span (f53a2882 debug.xml derivation, 2026-09-02T23:43:46-05:00, to 9a114815 payload commit, 2026-09-03T18:59:31-05:00) — the gap is the owner's artifact-staging turnaround between continuation sessions, not active execution time
- **Tasks:** 3 (Task 1 owner-delivery checkpoint, Task 2 one-way decision checkpoint, Task 3 payload commit)
- **Files modified:** 22 created + 1 modified (NOTICE) across 1 new commit this session (plus the prior session's f53a2882)

## Accomplishments

- **Task 1 (checkpoint:human-action) — owner delivery, confirmed already discharged before this continuation.** The owner staged all ten enumerated items outside the repository at `D:\Temp`, with a `MANIFEST.md` recording provenance, deployment status, and lockstep relationships. Every item was **delivered** — none deferred, none unavailable — and the three required questions were answered: (1) of the five ConfigMgr value classes RE-237:209 names, exactly one is real (the CMG mutual-auth FQDN, which also embeds the site code in the same literal); (2) neither `Remove-Kiosk*.ps1` script declared `SupportsShouldProcess` as delivered, and the owner confirmed this plan may add it without changing confirmed behavior; (3) `RemoveBloat.ps1` is not one of the ten items and was not delivered — see the NOTICE gap row.
- **Task 2 (checkpoint:decision) — ConfigMgr scrub, RULING 1, owner-decided 2026-09-03.** The owner independently verified `origin` (`https://github.com/Schweinehund/Autopilot.git`) is **public** via `gh repo view`, which resolves the manifest's private/public conditional to SCRUB. Chosen option: **commit-scrubbed** (of the two options presented — commit-scrubbed or omit the package entirely — the owner selected commit-scrubbed; the omit alternative was explicitly re-offered and declined). Applied exactly as ruled: the CMG FQDN segment of `Install-ConfigMgrClient.ps1:17`'s `$CmgPath` literal replaced with `<CMG-FQDN>`, the site-code placeholder at `:18` replaced with `<SITE-CODE>`; the tenant GUID, application-ID GUID and resource-URI placeholders at `:19-21` left exactly as delivered (already clean). **Scope extension (Rule 2, same threat class T-155-03-01):** the owner's covering instruction that the employer name must not reach the index "in ANY file" is broader than Ruling 1's one named location. A full-tree case-insensitive scan for the employer's name found two further occurrences in Publisher/AppVendor metadata fields — `New-IntuneWindowsAppKiosk.ps1:37` and `KioskBaseline-Invoke-AppDeployToolkit-functions.ps1:19` — both scrubbed to `<ORGANIZATION>` while leaving the already-established, non-identifying `EEE` abbreviation untouched.
- **Task 2b — Windows App dependencies, RULING 2, owner-decided 2026-09-03.** The two VCLibs `.appx` binaries (6,757,465 and 896,581 bytes, both breaching this phase's 2 MB cap) are not committed. `package-sources/windows-app-win32/Dependencies/DEPENDENCIES.md` pins each by exact filename, version, upstream source URL, and SHA256 computed directly from the owner-delivered staged bytes; both URLs were confirmed live at the pinned SHA via HTTP HEAD, `Content-Length` matching the staged file size exactly.
- **Task 3 (auto) — commit the twelve-payload-file tree, scrubbed, gated, attributed, proven tracked.** Read every one of the eighteen delivered files end to end before writing any of them. Copied clean files verbatim; scrubbed the ConfigMgr install script and the two employer-name occurrences; added `[CmdletBinding(SupportsShouldProcess)]` plus a `$PSCmdlet.ShouldProcess` gate around every delete/remove/deprovision/unregister call in `Remove-KioskOemBloat.ps1` and `Remove-KioskRunTasks.ps1`; applied the identical edit to both scripts' three required deployment copies (`package-sources/kiosk-baseline/Files/`, `remediations/oem-bloat/`, `remediations/run-task-cleanup/`) and confirmed byte-identity by SHA256 after the edit; updated the "untested as written" headers on items 6-10 (`Detect-KioskOemBloat.ps1`, `Detect-KioskRunTasks.ps1`, `Detect-KioskAppBlocks-v6.ps1`, and both `Remove-Kiosk*.ps1`) to record real pilot validation, per RE-237's own header convention. Ran the GUID-shaped search, three shape-based searches (site code, hostname, resource URI), `git check-ignore -v` over every path, all three apex validation gates, and the conflict-marker sweep, before committing the entire 23-file payload in a single commit. Added no markdown link.

## Task Commits

1. **Task 1: Owner delivers the ten owner-supplied payload artifacts** - checkpoint (no commit; `git status --porcelain` unchanged across it, confirmed)
2. **Task 2: One-way gate — approve committing the scrubbed ConfigMgr package source** - checkpoint (no commit; `git status --porcelain` unchanged across it, confirmed)
3. **Task 3: Commit the twelve-file payload** - `9a114815` (feat)

**Plan metadata:** committed together with this SUMMARY (see final commit below).

Prior session's Task 2 of RCP-09's overall enumeration (item 2, debug.xml derivation) was already committed at `f53a2882` before this continuation began, per the checkpoint state.

## Files Created/Modified

- `assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/` (7 files) - Windows App Win32 package source: build/deploy/detect scripts, Intune app creation script (scrubbed Publisher default), READMEs, and `DEPENDENCIES.md` pinning both VCLibs binaries
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/` (4 files incl. `Files/`) - Kiosk Baseline PSADT package source (scrubbed AppVendor), plus the two ShouldProcess-gated removal scripts in the package's own `Files\` folder
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/` (4 files) - ConfigMgr client wrapper package source; `Install-ConfigMgrClient.ps1` scrubbed per Ruling 1
- `assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/` (2 files) - OEM bloat detect/remediate pair; `Remove-KioskOemBloat.ps1` ShouldProcess-gated
- `assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/` (2 files) - Run/RunOnce/task cleanup detect/remediate pair; `Remove-KioskRunTasks.ps1` ShouldProcess-gated
- `assets/recipes/06-walk-up-avd-kiosk/remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1` - detection-only triage sensor, pilot-validated header
- `assets/recipes/06-walk-up-avd-kiosk/diagnostics/` (2 files) - `Get-RdpCredDiag.ps1` (pilot-validated per NOTICE, device identifier withheld) and `Trace-StorisEula.ps1` (explicitly untested, unchanged)
- `assets/recipes/06-walk-up-avd-kiosk/NOTICE` - extended with per-file provenance for all 22 new files, both owner rulings verbatim, the RemoveBloat.ps1 gap row, and the GUID-search finding

## Decisions Made

See `key-decisions` in the frontmatter above for the five decisions with rationale (triplication resolution, scrub-scope extension, windows-app-win32 second-copy rationale, RemoveBloat.ps1 non-vendoring, Get-RdpCredDiag.ps1 header non-update).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing critical, same threat class as Ruling 1] Employer name scrubbed in two locations Ruling 1 did not name**
- **Found during:** Task 3, full-tree scan for the employer's name before writing any file
- **Issue:** Ruling 1 explicitly named only `Install-ConfigMgrClient.ps1:17-18`, but the owner's covering instruction ("must not reach the index in ANY file, including READMEs, comments or the SUMMARY") is broader. `New-IntuneWindowsAppKiosk.ps1:37` (`$Publisher` default) and `KioskBaseline-Invoke-AppDeployToolkit-functions.ps1:19` (`AppVendor`) both carried the literal employer name.
- **Fix:** Both scrubbed to `<ORGANIZATION> EEE`, matching Ruling 1's angle-bracket placeholder convention. The `EEE` abbreviation itself was left in place — it carries no employer name and is already this NOTICE's own established attribution shorthand.
- **Files modified:** `package-sources/windows-app-win32/New-IntuneWindowsAppKiosk.ps1`, `package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1`
- **Verification:** a case-insensitive scan of the committed tree for the employer name, its internal abbreviation, and pilot device-name prefixes returns no matches. The literal search terms are deliberately not reproduced here — writing them into this file would reintroduce the disclosure the scan exists to prevent. CORRECTION (applied by the orchestrator after this plan returned): the check originally recorded here anchored the abbreviation with a trailing word boundary, which cannot match it when more letters follow immediately — as they do inside the real CMG server hostname. That pattern was structurally incapable of catching the hostname this plan left in the `NOTICE` scrub narrative. A widened scan found it and a follow-up commit removed it. Never re-narrow the scan with a word boundary.
- **Committed in:** `9a114815`

**2. [Rule 1 - premise correction, documented not fixed] The plan's "exactly one GUID" acceptance bar does not account for a pre-existing committed file**
- **Found during:** Task 3, the mandatory pre-commit GUID-shaped search over the whole `assets/` tree
- **Issue:** The plan's Task 3 acceptance criteria state the GUID-shaped search over `assets/` must return exactly one distinct value (the Assigned Access profile identifier `9A2A490F-...`). The literal search returns two: the expected value, and `814B6409-8C51-4EE2-95F8-DB39B70F5F90`, which is Azure/WindowsAppKiosk's own sample Profile Id inside `windows-app/WindowsApp_AutoLogon.xml` — a file plan 155-02 committed verbatim (SHA256 already recorded in NOTICE), not a file this plan's `<files>` list authorizes touching.
- **Fix:** Not fixed by editing the file — doing so would invalidate the SHA256 155-02 already recorded against it, breaking the "vendored verbatim, byte-pinned" guarantee that hash exists to prove. Instead, documented as a finding in both NOTICE and this SUMMARY: the GUID is Microsoft's own public sample identifier in an open-source repository, not a tenant identifier, confirmed by its exact provenance (pinned SHA `17e1c09b4883ea2062bef801ae24bbc9722861d7`, the same commit 155-02 confirmed via the GitHub API).
- **Files modified:** none (documentation-only; `assets/recipes/06-walk-up-avd-kiosk/NOTICE` records the finding)
- **Verification:** `git grep -hoE '<GUID pattern>' -- assets/ | sort -u` returns exactly these two values, both traced to their origin and disposition in NOTICE.
- **Committed in:** `9a114815` (NOTICE entry)

---

**Total deviations:** 2 (1 Rule-2 scrub-scope extension applied inline, 1 Rule-1 premise correction documented rather than force-fit)
**Impact on plan:** Both strengthen the plan's own security intent rather than deviate from it. The scrub extension closes a real gap the ruling's literal wording didn't reach; the GUID documentation reports ground truth honestly rather than silently declaring a false "exactly one" result or destructively modifying a byte-pinned upstream file to force a technically clean number.

## Issues Encountered

None beyond the two deviations above. `powershell.exe -File` (not `-Command`, which mis-parsed `[ref]` variable declarations passed inline) was used to parse-check all 22 committed `.ps1` files with PowerShell's own AST parser; all parsed clean.

## User Setup Required

None — all ten RCP-09 items were delivered by the owner in this continuation; no further external artifact is outstanding for RCP-09 itself. The Windows App MSIX SHA256 gap (auth-gated, documented in `windows-app/WINDOWS-APP-MSIX.md` since 155-02) remains open but does not block this or any later plan in this phase.

**Route this phase through `/gsd-secure-phase` after execution completes**, as the plan's own output section requires — it is owed for Phase 155 by D-29 and was already owed from Phase 154, and it is the retroactive verification of exactly the mitigations in this plan's threat register (T-155-03-01 through T-155-03-07).

## Next Phase Readiness

- RCP-09's full ten-item enumeration is now committed and NOTICE-attributed; plan 155-05 can link every payload path by relative reference from RE-237 without any `target file not found` failure.
- `REQUIREMENTS.md` already carries `RCP-09` as `[x]` / "Complete" — this mark was set prematurely by plan 155-02's final commit (`f2f976f1`, before the remaining eight items existed), but is retroactively accurate now that this plan has landed the rest. `requirements mark-complete RCP-09` is re-run as part of this plan's own final-commit protocol below; it is idempotent against the already-set checkbox.
- The triplication resolution (two locations, not three, plus the manifest's own staging-only fourth folder) is the pattern plan 155-05 and any future maintenance of these scripts should follow: edit once, `cp` to both required locations, confirm `sha256sum` equality before commit.
- No blockers for the next plan in this phase.

## Self-Check: PASSED

- All 22 newly created files exist on disk: FOUND (confirmed via `git ls-files` immediately before commit)
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Dependencies/DEPENDENCIES.md` exists on disk: FOUND
- Commit `9a114815` exists in `git log --oneline --all`: FOUND
- Commit `f53a2882` (prior session, referenced above) exists in `git log --oneline --all`: FOUND
- `.planning/phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-03-SUMMARY.md` exists on disk: FOUND (this file)

## Verbatim Evidence (per plan `<output>` requirement)

**Full `git check-ignore -v` output for every added path (all 22, exit=1, no match):**
```
assets/recipes/06-walk-up-avd-kiosk/diagnostics/Get-RdpCredDiag.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/diagnostics/Trace-StorisEula.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Detect-ConfigMgrClient.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Install-ConfigMgrClient.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/README.md -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Uninstall-ConfigMgrClient.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskOemBloat.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskRunTasks.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Build-WindowsAppPackage.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Dependencies/DEPENDENCIES.md -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Deploy-WindowsApp.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Detect-WindowsApp.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/New-IntuneWindowsAppKiosk.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/README-upstream.md -> exit=1
assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/README.md -> exit=1
assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Detect-KioskOemBloat.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Remove-KioskOemBloat.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Detect-KioskRunTasks.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1 -> exit=1
assets/recipes/06-walk-up-avd-kiosk/remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1 -> exit=1
```
No `.gitignore` collision on any path; no scoped negation needed; `.gitignore` itself is unchanged.

**Full GUID-shaped search output over `assets/` (post-stage, `git grep`, deduplicated):**
```
814B6409-8C51-4EE2-95F8-DB39B70F5F90
9A2A490F-10F6-4764-974A-43B19E722C23
```
`9A2A490F-10F6-4764-974A-43B19E722C23` is the expected Assigned Access profile identifier (RE-237's own fenced XML, present in both `production.xml` and `debug.xml`). `814B6409-8C51-4EE2-95F8-DB39B70F5F90` is the pre-existing, plan-155-02-committed, upstream-vendored sample Profile Id inside `windows-app/WindowsApp_AutoLogon.xml` — documented, non-blocking (see Deviation 2 above).

**Every `ShouldProcess` gate added, by file and line:**

`remediations/oem-bloat/Remove-KioskOemBloat.ps1` (identical in `package-sources/kiosk-baseline/Files/Remove-KioskOemBloat.ps1`, confirmed byte-identical by SHA256):
- Line 12: `[CmdletBinding(SupportsShouldProcess)]`
- Line 35: `$PSCmdlet.ShouldProcess($_.DisplayName, 'Deprovision AppX package')` — gates `Remove-AppxProvisionedPackage`
- Line 42: `$PSCmdlet.ShouldProcess($_.Name, 'Remove AppX package for all users')` — gates `Remove-AppxPackage`

`remediations/run-task-cleanup/Remove-KioskRunTasks.ps1` (identical in `package-sources/kiosk-baseline/Files/Remove-KioskRunTasks.ps1`, confirmed byte-identical by SHA256):
- Line 13: `[CmdletBinding(SupportsShouldProcess)]`
- Line 27: gates `Remove-ItemProperty` on the Run-key loop
- Line 34: gates `Remove-ItemProperty` on the RunOnce-key loop
- Line 51: gates the Default-profile OneDrive Run-seed `reg delete` block
- Line 59: gates `Start-Process ... /uninstall` for OneDrive machine setup
- Line 63: gates `Unregister-ScheduledTask` for the per-user OneDrive startup task
- Line 69: gates `Remove-CimInstance` for orphaned `kioskUser*` profiles
- Line 74: gates `Remove-Item -Recurse -Force` for the current kiosk profile's OneDrive payload

**Explicit per-file statement, detection scripts and triage sensor (read-only, no gate needed):** `Detect-KioskOemBloat.ps1`, `Detect-KioskRunTasks.ps1`, `Detect-KioskAppBlocks-v6.ps1`, `Detect-ConfigMgrClient.ps1`, `Uninstall-ConfigMgrClient.ps1` (waits for an already-triggered uninstall; does not itself delete/remove/deprovision/unregister anything new), `Get-RdpCredDiag.ps1` and `Trace-StorisEula.ps1` — confirmed by a full read of each: no `Remove-*`, `Uninstall-*`-triggering, `Deprovision*`, or `Unregister-*` call outside the two gated scripts above.

**`Disable-ScheduledTask` left ungated (explicit statement):** `Remove-KioskRunTasks.ps1`'s per-logon-task loop calls `Disable-ScheduledTask`, not delete/remove/deprovision/unregister. The script's own header states this is deliberate ("tasks disabled (not deleted - reversible..."), and the plan's own instruction scopes `ShouldProcess` gates to the delete/remove/deprovision/unregister verb set. Not gated.

**Behavior-preservation confirmation:** `[CmdletBinding(SupportsShouldProcess)]` without an explicit `ConfirmImpact` defaults to `Medium`; PowerShell's default `$ConfirmPreference` is `High`. Since `Medium < High`, `$PSCmdlet.ShouldProcess(...)` returns `$true` (proceeds, no prompt) unless the caller explicitly passes `-WhatIf` or `-Confirm`. Intune Remediations invokes these scripts unattended with neither flag, so every gate added evaluates identically to the pre-edit unconditional execution — confirmed by parse-checking all 22 files with PowerShell's own AST parser (`ALL PS1 FILES PARSE CLEAN`) and by the byte-identity SHA256 check across both required deployment copies of each script.

**Apex gate results (matching `155-GATE-BASELINE.json` exactly):**
```
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
C17 summary: 237 files checked, 0 with violations, 0 total violations
Result: 111 PASS, 0 FAIL, 0 SKIPPED (total checks: 111)
git grep -nE '^(<{7}|={7}|>{7})' -- docs/ ; exit=1 (no output, no matches)
git diff --exit-code -- .gitattributes ; unchanged
```

---
*Phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization*
*Completed: 2026-09-04*
