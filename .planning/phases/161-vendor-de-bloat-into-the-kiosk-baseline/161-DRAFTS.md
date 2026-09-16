# Phase 161: Vendor De-Bloat into the Kiosk Baseline - Source Text (DRAFTS)

**Provenance:** produced by three adversarial-review rounds (Finder → Adversary → Referee, Opus) at HEAD `cdc496be`; every string, count and line pointer below was re-measured by the round-2 or round-3 Referee. This file is named in `161-CONTEXT.md` `<canonical_refs>`; the planner MUST put its path in every editing task's `<read_first>` (plan-phase `<deep_work_rules>`), and the executor copies the VERBATIM-LOCKED strings byte-exact.

**Lock scope (D-25, D-28, D-55):** VERBATIM — E-A1..A4, E-N2, E-N3, E-N4, E-P1, E-P2b, E-B1, E-R1, E-R6, E-C1, E-K1, E-J1..J4. FACTS + SHAPE (re-measured, not byte-pinned) — E-N1, E-P2a, E-R2, E-R3, E-R4, E-R5, the README section prose, the EVIDENCE section bodies. PLACEHOLDERS — `2026-09-DD` (execution date), `<commit>`, `<blob-sha1>`, `<sha256>`, `<n>`, `<sensor summary>`, `<OOBE-branch literal>`. `D-27` and `2026-09-15` are already written into E-A1..A4 (a `[MEASURED <date>]` label records when the measurement was taken, not when the string lands).

**Traps every string was scanned against:** tight em dash for every new `docs/` string (RE-237 U+2014 = 74, ASCII ` -- ` = 0, all six recipes 0); ASCII `--` only in `.planning/` strings; `administrator` stays 10 on RE-237; `sign into` stays 0 corpus-wide; C17 #12 ≤ 200 chars per contiguous `>` run (no new blockquote is added; E-R3 is prose separated from the callout at line 222 by one blank line each side); table pipes balanced and no unescaped `|` inside a cell; `ruled 2026-09-10` rises from 1 to 2 by design via E-R1 (E-R3 uses "ruled on 2026-09-10", which does not match); no `must`/`will` in any new string outside quoted antecedents.

Line numbers are convenience pointers measured at `cdc496be`, never identity. Locate by quoted text, then re-measure.

---

## PART A — Amendment strings (E-A1..A4, VERBATIM; 161-01 T2)

Each string is appended to the END of its line with exactly one leading space; original words are never deleted; each file quotes its OWN antecedent byte-exact. Re-measured: every antecedent occurs exactly once in its owning file and zero times in the other. Scratch-applied: `check-phase-54` 32/0 before and after all four; `c17-eee-contract` 237/0 after; `- [ ] **VND-02**:` and `- [ ] **VND-03**:` anchors intact; `SUCCESS-CRITERION AMENDMENT` 3 per file after; `must`/`will` 0 on the four lines; U+2014/U+2026 added 0.

### E-A1 — `.planning/ROADMAP.md` Phase 161 success criterion 2 (line 105) — append

```text
 **[SUCCESS-CRITERION AMENDMENT, D-27]** The clause "and the script carries the same Authenticode signing chain as the rest of the Baseline package" is superseded, not deleted: it is rescoped to **the Baseline `README.md` records the signing step for all three `Files\` scripts using the certificate-thumbprint idiom `Build-WindowsAppPackage.ps1` already documents, and the `Get-AuthenticodeSignature` reading -- Status on all three and the distinct-thumbprint count, counts only, never a thumbprint, Subject or Issuer -- is `[PILOT]` evidence taken at the Phase 161 pilot checkpoint; if the owner declines that checkpoint, the `README.md` states that the signing step has not yet been exercised rather than assuming it**. The ruling stands on precedent, not on a measurement: the chain this clause names is produced at assembly and never held in the repository, and the repository's only signing idiom says so -- `Build-WindowsAppPackage.ps1` records, under `.PARAMETER CodeSigningCertThumbprint`, "Thumbprint of a code-signing cert in Cert:\CurrentUser\My or Cert:\LocalMachine\My." -- so the certificate is supplied at assembly from the operator's own store and no committed byte of the Baseline, EEE-authored or vendored, carries it. The one Authenticode signature block this phase does commit is the upstream author's, retained at `Files\RemoveBloat.ps1` lines 4229-4405 by success criterion 1's verbatim requirement and replaced at assembly by the Baseline's own signing step: the wrong chain, not the one this clause asks for. Corroboration only, load-bearing on nothing: `[MEASURED 2026-09-15, not guarded]` `grep -rlF '# SIG # Begin signature block' assets/` names no EEE-authored file before this phase and names only the vendored script after it. No validator guards that reading and none is added here; re-measure it rather than cite this line.
```

### E-A2 — `.planning/REQUIREMENTS.md` VND-02 (line 64) — append (different antecedent; the antecedent is mid-line, the append is end-of-line)

```text
 **[SUCCESS-CRITERION AMENDMENT, D-27]** The clause "re-signed with the same Authenticode chain the Baseline package already uses" is superseded, not deleted: it is rescoped to **the Baseline `README.md` records the signing step for all three `Files\` scripts using the certificate-thumbprint idiom `Build-WindowsAppPackage.ps1` already documents; the `Get-AuthenticodeSignature` reading (Status on all three and the distinct-thumbprint count, counts only) is `[PILOT]` evidence taken at the Phase 161 pilot checkpoint, and a declined checkpoint is stated in the `README.md` rather than assumed**. The ruling stands on the repository's own signing idiom -- `Build-WindowsAppPackage.ps1` records, under `.PARAMETER CodeSigningCertThumbprint`, "Thumbprint of a code-signing cert in Cert:\CurrentUser\My or Cert:\LocalMachine\My." -- so the chain is supplied at assembly and no committed Baseline byte carries it, not on a measurement. Corroboration only: `[MEASURED 2026-09-15, not guarded]` `grep -rlF '# SIG # Begin signature block' assets/` names no EEE-authored file. See ROADMAP Phase 161 success criterion 2 for the full reading.
```

### E-A3 — `.planning/ROADMAP.md` Phase 161 success criterion 3 (line 106) — append

```text
 **[SUCCESS-CRITERION AMENDMENT, D-27]** The clause "and a pilot-device run's second-boot block-sensor reading is recorded as `[PILOT]`" is superseded, not deleted: it is rescoped to **the reading is recorded as `[PILOT]` in RE-237 Step 8 and the Baseline `README.md` when the owner runs the Phase 161 checkpoint; if the owner declines, both surfaces state that the vendored step has not yet been exercised on the pilot, `STATE.md` carries "VND-03 pilot run owed" forward to Phase 163, and no reading is written that was not taken -- the absence is stated, never assumed**. The ruling stands on precedent, not on a measurement: Phase 160 met the same decline on the same class of clause, recorded in `160-02-SUMMARY.md` under `key-decisions` as "Task 1's pilot device licensing checkpoint was resolved DECLINED by the owner (2026-09-14); P2 was written without the pilot-measurement sentence per D-30's decline path, and LIC-01 flipped at this plan's boundary regardless", and this criterion applies that path to a clause that is part of the criterion itself rather than corroboration of a ruling.
```

### E-A4 — `.planning/REQUIREMENTS.md` VND-03 (line 65) — append

```text
 **[SUCCESS-CRITERION AMENDMENT, D-27]** The clause "the change is exercised once on the pilot device with the second-boot block-sensor reading recorded as `[PILOT]`" is superseded, not deleted: it is rescoped to **the reading is recorded as `[PILOT]` in RE-237 Step 8 and the Baseline `README.md` when the owner runs the Phase 161 checkpoint; a declined checkpoint is stated on both surfaces and carried forward in `STATE.md` as "VND-03 pilot run owed" to Phase 163, never assumed**. The ruling stands on the Phase 160 decline path for the same class of clause -- `160-02-SUMMARY.md` records, under `key-decisions`, "LIC-01 flipped at this plan's boundary regardless" -- not on a measurement. See ROADMAP Phase 161 success criterion 3 for the full reading.
```

**161-01 gate bracket (D-39, D-40):** `check-phase-54` 32/0 immediately before and after the four appends in the same task (recorded reason: `check-phase-61.mjs` lines 67-83 and `check-phase-70.mjs` lines 54-57 read these files frozen at `ba2cbc0`/`aa6de68`; `check-phase-66.mjs` line 86 names `ROADMAP.md` only inside an error string); `gsd_run query roadmap.get-phase 161` → 3 `success_criteria`; `grep -cE '^- \[ \] \*\*VND-0[23]\*\*:' .planning/REQUIREMENTS.md` → 2; `grep -oF 'D-NN' .planning/ROADMAP.md .planning/REQUIREMENTS.md | wc -l` → 0; `grep -oF 'SUCCESS-CRITERION AMENDMENT' <file> | wc -l` → 3 in each. No `requirements.mark-complete` call of any kind in 161-01 (it has no dry-run mode and would flip VND-02/03).

---

## PART B — NOTICE (`assets/recipes/06-walk-up-avd-kiosk/NOTICE`; 161-02 T2, 161-04 T1)

### E-N3 — header amendment (VERBATIM; 161-02 T2)

`cat -A` of lines 9-10 today:
```
This repository carries no LICENSE file. Founding one is deliberately out of$
scope for this phase (v1.22 Phase 155); the absence below is not an oversight.$
```
Locate the single line whose bytes are exactly `scope for this phase (v1.22 Phase 155); the absence below is not an oversight.` (`grep -cFx` → 1 before the edit). Replace that one line with these three (hard-wrapped; the file's line 9 is 76 columns, line 10 is 78, nonblank median 73, p90 82):
```text
scope for this phase (v1.22 Phase 155); the absence below is not an oversight. One
third-party license text is carried in the tree for the vendored GPL-3.0 script;
see the Files/RemoveBloat.ps1 entry under Plan 161 vendoring.
```
(81/79/60 columns. If 81 is unacceptable against the p90 of 82, break after `oversight.` and start the new sentence on its own line.) Needle: `One third-party license text is carried in the tree` occurs once.

### E-N2 — CLOSED paragraph (VERBATIM except the date; 161-02 T2)

Appended at column 0 directly under the `Not vendored: RemoveBloat.ps1 …` paragraph (lines 332-342 today; the block is column-0 throughout, so the closure is column-0 too), separated by one blank line:
```text
CLOSED 2026-09-DD (v1.23 Phase 161). The admin decision this paragraph deferred
was ruled at v1.23 scoping (2026-09-10) in favour of vendoring; the vendored
bytes are recorded under "Plan 161 vendoring" below. This paragraph is retained
as the record of the gap.
```
Needle: `^CLOSED 2026-09-[0-9]{2} \(v1\.23 Phase 161\)` occurs once. The heading literal `Plan 161 vendoring` therefore occurs twice unanchored; the needle for the heading is anchored `^Plan 161 vendoring$`.

### E-N1 — the `Plan 161 vendoring` section (FACTS + SHAPE; 161-02 T2; re-hash lines 161-04 T1)

Inserted as a new `====`-underlined section immediately before `Plan 155-05 wiring` (line 362 today), after the `Mechanical scrub verification note` paragraph (lines 344-360) and its blank line. Field values are filled from the 161-02 T1 measurements.
```text
Plan 161 vendoring
==================

package-sources/kiosk-baseline/Files/RemoveBloat.ps1
  Origin: vendored verbatim from andrew-s-taylor/public, De-Bloat/RemoveBloat.ps1
    (upstream-declared Version: 5.6.4 at line 20 of the script).
  Pinned SHA: <commit>   Blob SHA-1: <blob-sha1>
  Retrieval date: 2026-09-DD (GitHub API commits?path= returned this commit first;
    the raw file was fetched twice at that SHA and the two downloads compared equal).
  License: GPL-3.0 (repository root LICENSE at the same SHA); full text carried at
    package-sources/kiosk-baseline/Files/LICENSE.GPL-3.0.txt.
  Local modifications: NONE. The committed bytes equal the upstream blob; verify with
    `git show HEAD:<this path> | sha256sum`. The repository's `* text=auto eol=lf`
    rule is a no-op on this LF file.
  Upstream Authenticode signature block: retained in-repo (lines 4229-4405, the
    upstream author's certificate); replaced at assembly by the Baseline's own
    signing step (README, Assemble).
  Invocation: first in the Baseline's Install loop with `-AllowStartMenuReset false`
    and no `-customwhitelist` (owner ruling 2026-09-15); `-custombloatlist` is never
    passed on this device class (README, Kiosk-safety review).
  Runtime fetch paths (5): start2.bin (line 1716; skipped by the parameter above);
    HPConnOpt.iss (line 2288; only if the HP Connect Optimizer InstallShield folder
    exists); mcafeeclean.zip (line 3951) and mccleanup.zip (line 3970; only if a
    McAfee uninstall entry exists); the Office Deployment Tool from
    officecdn.microsoft.com (line 4189) -- UNCONDITIONAL during ESP device setup,
    because the enclosing gate at line 4097 tests OOBE completion, not an Intune
    app count.
  Upstream identifiers pre-declared (public, not scrubbed): ten distinct GUIDs at
    lines 352-355, 818, 900-901, 966, 976, 1487, 1599, 2286, 2290, 2910, 3594
    (fifteen occurrences).
  Size: at 179,789 bytes this is the largest tracked file outside .planning/; the
    repository-wide precedent named in RE-237 and above (1.6 MB) is not breached.
  SHA256 (as written, equals upstream): <sha256>
  Bytes: 179789

package-sources/kiosk-baseline/Files/LICENSE.GPL-3.0.txt
  Origin: verbatim andrew-s-taylor/public root LICENSE at the same pinned SHA
    (GPL-3.0, "Version 3, 29 June 2007").
  SHA256 (as written): 3972dc9744f6499f0f9b2dbf76696f2ae7ad8af9b23dde66d6af86c9dfb36986
  Bytes: 35149.

Post-161 edit -- KioskBaseline-Invoke-AppDeployToolkit-functions.ps1 and README.md
  (2026-09-DD). Re-hashed after this phase's edits (three-script install loop, the
  hive-unload line, AppVersion/AppScriptVersion 1.1.0, the README's attribution,
  fetch-path, review and reconciliation sections):
    KioskBaseline-Invoke-AppDeployToolkit-functions.ps1  <sha256>
    README.md                                            <sha256>
```

### E-N4 — supersede for the `Plan 155-05 wiring` artifact count (VERBATIM except the date; 161-02 T2)

Lines 371-376 today read "…the three artifacts named in the recipe but not committed here: … and RemoveBloat.ps1 (Andrew Taylor's public De-Bloat — still an open "Ask the admin" decision in RE-237 Step 8, not vendored)." Those words are retained. Append at column 0 after the section's last line (378 today), separated by one blank line:
```text
SUPERSEDED IN PART 2026-09-DD (v1.23 Phase 161). The paragraph above records
plan 155-05's own wiring correctly and is retained unchanged. Two of its
statements are no longer true of this tree: RemoveBloat.ps1 is now vendored
here, at a pinned commit under GPL-3.0, and the "Ask the admin" decision it
cites as still open was ruled in favour of vendoring at v1.23 scoping
(2026-09-10) and is recorded in RE-237 Step 8. RE-237 now names two
uncommitted artifacts, not three. See the Files/RemoveBloat.ps1 entry under
Plan 161 vendoring above.
```
(78/76/74/75/70/68/72/45 columns.) The 161-02 diff of NOTICE is insertions only.

---

## PART C — PSADT functions file (`package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1`; 161-04 T1)

### E-P1 — `$script:BundledScripts`, both loops, the unload line (VERBATIM)

Declared immediately below `$script:RegKey = 'HKLM:\SOFTWARE\EEE\KioskBaseline'` (line 40), before `function Install-ADTDeployment`:
```powershell
$script:BundledScripts = @(
    @{ File = 'RemoveBloat.ps1';           Args = '-AllowStartMenuReset false' }   # vendored, GPL-3.0, see NOTICE.
                                                                                   # No -customwhitelist (owner ruling 2026-09-15); adding one
                                                                                   # re-runs the README PROTECTED review first.
                                                                                   # NEVER pass -custombloatlist: it strips entries from the
                                                                                   # upstream protection list (RemoveBloat.ps1:519).
    @{ File = 'Remove-KioskOemBloat.ps1';  Args = '' }
    @{ File = 'Remove-KioskRunTasks.ps1';  Args = '' }
)
```
Pre-Install loop (replaces the `foreach ($f in 'Remove-KioskOemBloat.ps1','Remove-KioskRunTasks.ps1')` block at lines 47-52):
```powershell
    foreach ($s in $script:BundledScripts) {
        if (-not (Test-Path (Join-Path $adtSession.DirFiles $s.File))) {
            Write-ADTLogEntry -Message "Bundled script missing: $($s.File)" -Severity 3
            Close-ADTSession -ExitCode 70001
        }
    }
```
Install comment and loop (replaces lines 58-68; the comment is E-P2b):
```powershell
    ## Invoke the bundled scripts in $script:BundledScripts order: the vendored De-Bloat pass first,
    ## then the two EEE scripts the drift remediations also use. The EEE pair is defensive
    ## (SilentlyContinue) and exits 0; the vendored script's exit behaviour is upstream's and is not
    ## assumed here. A non-zero from any of them should fail provisioning loudly rather than ship a
    ## device that only looks clean.
    foreach ($s in $script:BundledScripts) {
        Write-ADTLogEntry -Message "Running $($s.File) $($s.Args)"
        # -ErrorAction SilentlyContinue is load-bearing, not defensive noise: without it PSADT 4.1.7
        # throws on a non-zero exit and $r is never assigned, so the 70002 gate below is unreachable
        # and the session exits 60001 instead - a code this package's Intune return-code map does not carry.
        $r = Start-ADTProcess -FilePath "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" `
              -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$(Join-Path $adtSession.DirFiles $s.File)`" $($s.Args)" `
              -WindowStyle Hidden -PassThru -ErrorAction SilentlyContinue
        Write-ADTLogEntry -Message "$($s.File) exit code $($r.ExitCode)"
        if ($r.ExitCode -ne 0) { Close-ADTSession -ExitCode 70002 }
        if ($s.File -eq 'RemoveBloat.ps1') {
            # De-Bloat mounts C:\Users\Default\NTUSER.DAT as HKU\temphive three times (:1250/:1417/:1529)
            # and never checks its own unloads. A leaked mount blocks Remove-KioskRunTasks.ps1:52.
            reg unload HKU\temphive 2>&1 | Out-Null
        }
    }
```
Needle checks after landing: `grep -oF 'reg unload HKU\temphive' <file> | wc -l` → 1 (`-F` mandatory); `grep -F -- '-custombloatlist' <file> | grep -cvE '^[[:space:]]*#'` → 0; `grep -oF -- '-AllowStartMenuReset false' <file> | wc -l` → 1.

### E-P2a — header comment amendments (FACTS + SHAPE; lines 1-16)

- Line 8 ("ESP-BLOCKING by design: local-only work, seconds to run, no network dependencies.") → "ESP-BLOCKING by design. The EEE scripts are local-only; the vendored De-Bloat script has five runtime fetch paths, four conditional and one — the Office Deployment Tool — unconditional during ESP. All five are listed in README."
- Line 10 ("Files\ must contain (copied from the SAME repo commit as the remediation packages - one source):") → "Files\ must contain — the two EEE scripts copied from the SAME repo commit as the remediation packages (one source for their pattern lists), plus the vendored De-Bloat script and its license text at the commit NOTICE pins:" followed by the four file lines (`RemoveBloat.ps1`, `LICENSE.GPL-3.0.txt`, the two EEE scripts with their existing notes).
- Session block: `AppVersion = '1.1.0'`, `AppScriptVersion = '1.1.0'`, `AppScriptDate = '2026-09-DD'`; `AppScriptAuthor` unchanged.

---

## PART D — Baseline README (`package-sources/kiosk-baseline/README.md`)

### E-B1 — `## Assemble` H2 replacement (VERBATIM; 161-04 T1)

Replaces line 9 `## Assemble (same repo commit as the remediation packages - ONE source for pattern lists)`:
```text
## Assemble (EEE scripts from the SAME repo commit as the remediation packages - ONE source for their pattern lists; De-Bloat vendored at the commit NOTICE pins)
```

### Section order and locked H2 literals (D-25)

`## Why` (unchanged) → `## Attribution and license` (161-02) → E-B1 (161-04) → `## Intune Win32 app` (161-04: detection `1.1.0-01`; the 60001 sentence) → `## Versioning` (161-04: the re-pin procedure) → `## Known runtime fetch paths and their triggers` (161-03) → `## Kiosk-safety review` (161-03) → `## Pattern-list reconciliation` (161-03) → `## Validation (pilot)` (161-04). The five H2 literals `## Attribution and license`, `## Known runtime fetch paths and their triggers`, `## Kiosk-safety review`, `## Pattern-list reconciliation`, `## Validation (pilot)` and E-B1 are pinned with `grep -cFx`.

### `## Assemble` step 2 and 3 (FACTS + SHAPE; 161-04 T1)
"Files\ <- RemoveBloat.ps1 (vendored, see NOTICE), LICENSE.GPL-3.0.txt, Remove-KioskOemBloat.ps1, Remove-KioskRunTasks.ps1." and "Sign all three scripts with the same code-signing certificate (Set-AuthenticodeSignature -TimestampServer … -HashAlgorithm SHA256, cert by thumbprint from Cert:\CurrentUser\My or Cert:\LocalMachine\My, the idiom Build-WindowsAppPackage.ps1 documents); the signature replaces the upstream author's block on RemoveBloat.ps1. Signed bytes are never committed. Then IntuneWinAppUtil …". One sentence records the repository's reading that Authenticode signing gates execution policy on the organization's own devices and does not restrict a recipient's GPL §6 right to modify and run the script.

### `## Kiosk-safety review` shape (FACTS + SHAPE; 161-03 T1)
1. **PROTECTED list** (single source): `MicrosoftEdgeUpdate*` scheduled tasks and `MicrosoftEdgeUpdate.exe`; Edge and WebView2 (`Microsoft.MicrosoftEdge.Stable`, `Microsoft.Win32WebViewHost`, the Evergreen runtime); Windows App `MicrosoftCorporationII.Windows365`; `Microsoft.Windows.AssignedAccessLockApp`; `Microsoft.AAD.BrokerPlugin`; Intune Management Extension; the ConfigMgr client (Step 9); `Microsoft.CompanyPortal`; Quick Assist (`MicrosoftCorporationII.QuickAssist`, named exception — see row); the endpoint agents in the sensor's SVCUI census; `RtkAudUService` (accepted residue).
2. **Class table** (line ranges re-measured at the pinned bytes): AppX bloat list `$Bloatware` 425-508 minus `$appstoignore` 421, predicates 529/547 — ONE PROTECTED item on the removal list, `Microsoft.MicrosoftEdge.Stable` at 444, surviving only because 332 whitelists it, re-verified at every re-pin | AppX remote assistance 479 Quick Assist — named exception, RE-237 line 48 names it as a viewing path; Remote Help and AVD shadowing untouched | Windows App — 0 hits | HP Win32 list 2188-2221 — 8 `AD2F1837.*` entries plus 427; no Win32 "HP Support Assistant"; exact `-notcontains` at 2225; version-baked literal at 2198 | Other OEM and third-party Win32 uninstalls — Dell 2514, Lenovo 2919, Samsung 3314, Acer 3551, Asus 3818, McAfee 3945-3985, Chrome 4115-4147, Office C2R 4148-4196 — no PROTECTED item | Registry and Default-user hive: loads 1250/1417/1529, unloads 1268/1521/1633 — no PROTECTED impact; the Baseline unloads `HKU\temphive` after the pass | Policy writes 1775-1780 — `HKLM:\SOFTWARE\Policies\Microsoft\Edge` created if absent, `AllowSurfGame = 0` written; an unmanaged write into the Intune-owned key, stated | Measured-inert code — `$Keys` 579-610 consumed by one `Remove-Item` at 613-617 with zero `New-PSDrive` (silent no-ops); bookmark loop 3800-3817 builds `C:\Users\C:\Users\…` (never true) | Scheduled tasks 1104-1129, Xbox services 1732-1735, `UDCService` 3307 — no PROTECTED impact | Start-menu reset 1640-1723 — skipped by `-AllowStartMenuReset false` | Runtime fetches 1716, 2288, 3951, 3970, 4189 — four conditional, the ODT unconditional in ESP.
3. **Negative controls** (counts only): `Microsoft.MicrosoftEdge.Stable` occurrences = 2; `edgeupdate` (case-insensitive) = 0; `Windows365` = 0; `AssignedAccess` = the one `$NonRemovable` entry; `New-PSDrive` = 0. Every PROTECTED string is cross-checked for membership in `$Bloatware` 425-508.
4. **Prohibition**: `-custombloatlist` is never passed on this device class (line 519 strips matching entries from `$appstoignore`); any future proposal re-runs this review first. Brittleness caveat for any future `-customwhitelist`: exact-string match at 2225; the `…Application Support for Chrome 122.0.6261.139` literal at 2198 is version-baked.
5. The `$intunecomplete` note: the value is read only inside a log string (4199); the 4097 gate is OOBE state; the transcript literal identifies the branch.

### `## Pattern-list reconciliation` (FACTS + SHAPE; 161-03 T1) — expected dispositions at `11918c50…`
Removed by `$Bloatware` (7): `Microsoft.BingNews` 436, `Microsoft.BingSearch` 437, `Microsoft.BingWeather` 438, `Microsoft.GetHelp` 439, `Microsoft.GamingApp` 441, `Microsoft.MicrosoftSolitaireCollection` 448, `Microsoft.PowerAutomateDesktop` 457. Kept by the upstream whitelist (2): `Microsoft.MicrosoftStickyNotes` 305, `Microsoft.OutlookForWindows` 330. Not listed upstream (5): `MicrosoftWindows.Client.WebExperience` (commented out, 507), `aimgr`, `Microsoft.Office.ActionsServer`, `Clipchamp.Clipchamp` (changelog mention 27 only), `AdvancedMicroDevicesInc-2.AMDRadeonSoftware`. HP publisher (1): partial — 8 named `AD2F1837.*` Win32 entries (2199-2205, 2219) plus 427; the EEE regex `^AD2F1837\.` catches the whole publisher. Conclusion stated: De-Bloat is not a superset; the overlay stays load-bearing for 7 of 15; the EEE scripts do not change.

### `## Known runtime fetch paths and their triggers` (161-03 T1) — five rows
`start2.bin` 1716 — only when no non-admin profile exists AND `-AllowStartMenuReset` is `true` (skipped) | `HPConnOpt.iss` 2288 — only if the HP Connect Optimizer InstallShield folder exists | `mcafeeclean.zip` 3951 and `mccleanup.zip` 3970 — only if a McAfee uninstall entry exists | Office Deployment Tool `officecdn.microsoft.com/pr/wsus/setup.exe` 4189-4191 then `setup.exe /configure … -Wait` 4194 — UNCONDITIONAL during ESP device setup (gate 4097 is OOBE state); if the host is unreachable the fetch fails silently under line 232 and the cost is a timeout with no log line beyond the transcript.

### `## Validation (pilot)` extension (FACTS + SHAPE; 161-04 T3)
Keep the existing text. Add the short record: run date; Baseline `1.1.0-01`; the sensor result as counts and categories ("the recorded reading is redacted: the sensor's RUN and RUN1 lines carry the kiosk account SID"); `Total Script Duration`; the three exit codes and session code; WARN count; `Status` ×3 and distinct-thumbprint count; the runtime ruling token. Declined variant: "The vendored step has not yet been exercised on the pilot device; the run is carried forward to Phase 163."

---

## PART E — RE-237 (`docs/recipes/06-walk-up-avd-kiosk-autologon.md`; 161-04 T4)

### Placement spec (VERBATIM-LOCKED)
- E-R6(a) edits line 211 (Step 8 item 1). E-R6(b) edits the README parenthetical in the same line 211.
- E-R1 replaces the Row 1 "Recorded as" cell at line 219.
- E-R2 replaces (measured) or leaves (unchanged) the Row 2 "When to choose" cell at line 220.
- E-R3 is inserted as a prose paragraph after the table (line 220) and before the `> **What breaks if misconfigured:**` callout (line 222), with exactly one blank line above and below — C17 assertion 12 joins contiguous `>` lines, so no `>` line may become adjacent.
- E-R4 edits Asset Provenance paragraph 2 (line 238) and paragraph 3 (line 240); `Deploy-WindowsApp.ps1` in paragraph 3 is preserved verbatim.
- E-R5 is inserted newest-first as the first data row of the Version History table (above the `2026-09-14` row, line 324).
- Frontmatter: `last_verified: 2026-09-DD`, `review_by:` = that date plus 90 days.
- The `> **Ask the admin:**` lead-in at line 215 and the `**[PILOT]**` Edge-Update callout at line 224 are byte-unchanged.

### E-R6 — Step 8 item 1 (VERBATIM)
(a) `old_string`: `that runs the shared removal scripts before the autologon account exists—OEM and consumer package deprovisioning`
`new_string`: `that runs the bundled removal scripts before the autologon account exists—the vendored De-Bloat pass first ([RemoveBloat.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1)), then OEM and consumer package deprovisioning`
(b) `old_string`: `stage `Files\` with the two removal scripts, sign, wrap to `.intunewin``
`new_string`: `stage `Files\` with the three removal scripts and the GPL-3.0 license text, sign, wrap to `.intunewin``

### E-R1 — Row 1 "Recorded as" cell (VERBATIM; tight em dash)
```text
[RemoveBloat.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1) in the Baseline `Files` folder at the commit pinned in [NOTICE](../../assets/recipes/06-walk-up-avd-kiosk/NOTICE), invoked first with `-AllowStartMenuReset false` and no `-customwhitelist`—vendoring ruled 2026-09-10, parameters ruled 2026-09-15
```

### E-R2 — Row 2 "When to choose" cell (FACTS + SHAPE; in-cell marker)
Measured variant: `Small pilot; **[PILOT]** the De-Bloat pass added <n> minutes to ESP device setup on 2026-09-DD`
Unchanged variant (byte-identical to today): `Small pilot; ESP time budget not yet measured against De-Bloat's runtime`

### E-R3 — ruling paragraph (FACTS + SHAPE; per-clause markers; no pilot claim in the whitelist clause)
Measured variant:
```text
The Intune Admin Lead ruled on 2026-09-10 that the Baseline runs Andrew Taylor's De-Bloat script first, vendored verbatim under GPL-3.0 at the commit recorded in NOTICE, ahead of the EEE removal scripts, which stay in place because the upstream whitelist keeps two packages the EEE lists remove anyway and never lists five others; the Baseline README's pattern-list reconciliation records all fifteen dispositions. The Baseline package's own README also records the kiosk-safety review of the vendored script against the PROTECTED list. **[PILOT]** On 2026-09-DD the second boot after an Autopilot Reset with Baseline 1.1.0 reported <sensor summary as counts and categories>. **[PILOT]** The De-Bloat step took <n> minutes inside ESP, and **[PILOT]** the <OOBE-branch literal> branch ran.
```
Declined variant — the last two sentences are replaced by:
```text
The vendored step has not yet been exercised on the pilot device; the run is carried forward to Phase 163.
```
Class check: the whitelist clause is class 1 (measured membership at lines 305 and 330, sourced to the README reconciliation) and carries no `[PILOT]`; each observation clause carries its own marker (class 2, sourced to the checkpoint record); "ruled on 2026-09-10" does not match the `ruled 2026-09-10` needle.

### E-R4 — Asset Provenance (FACTS + SHAPE)
Paragraph 2 gains, after the Windows App sentence: `` `RemoveBloat.ps1` is vendored verbatim from `andrew-s-taylor/public` (`De-Bloat/RemoveBloat.ps1`) at pinned commit `<commit>` under GPL-3.0; the license text travels with it in the Baseline's `Files` folder as [LICENSE.GPL-3.0.txt](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/LICENSE.GPL-3.0.txt), and NOTICE records the pinned commit, hashes and the five runtime downloads the script can still make. ``
Paragraph 3: `Three artifacts are named in this recipe but not committed.` → `Two artifacts are named in this recipe but not committed.`; the sentence beginning `` `RemoveBloat.ps1` (Andrew Taylor's public De-Bloat, named in Step 8's still-open "Ask the admin" decision) is not vendored `` through `…vendored.` is removed; the VCLibs and `ccmsetup.exe` sentences are byte-unchanged.

### E-R5 — Version History row (FACTS + SHAPE)
`| 2026-09-DD | Vendored Andrew Taylor's De-Bloat script into the Kiosk Baseline at a pinned commit under GPL-3.0; recorded the Step 8 ruling, the kiosk-safety review outcome and the **[PILOT]** second-boot reading; Asset Provenance updated |`
Declined variant: `| 2026-09-DD | Vendored Andrew Taylor's De-Bloat script into the Kiosk Baseline at a pinned commit under GPL-3.0; recorded the Step 8 ruling and the kiosk-safety review outcome; pilot run carried to Phase 163; Asset Provenance updated |`

---

## PART F — The checkpoint, the allowlist, the redaction pass, the evidence file

### E-C1 — checkpoint task (VERBATIM; 161-04 T2)
```xml
<task type="checkpoint:human-action">
  <name>Task 2: Pilot device De-Bloat run and second-boot reading</name>
  <read_first>
- `.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-DRAFTS.md` — the checkpoint task block under PART F, which is the locked source of this task's instruction text, and the "Decline path" paragraph explaining why VND-02 and VND-03 cannot strand (D-31, D-56).
  </read_first>
  <action>Assemble, sign and deploy Baseline 1.1.0 from HEAD, Autopilot Reset the pilot kiosk, and report seven items plus today's date. The recording rule is an allowlist of exactly seven items, not an exclusion list applied to a full dump: the excluded identifier fields are named verbatim in the instructions below and in 161-DRAFTS.md, and none of them is ever transcribed into a committed file. Every pasted value is put through the D-48 redaction pass in-process before anything is written; only counts of substitutions are recorded. If the owner types `decline`, that is a supported answer: record the single token with its date and continue to completion.</action>
  <instructions>
The PSADT change is already committed, so assemble 1.1.0 from HEAD: paste the functions file over a
fresh PSADT v4 template, stage `Files\` with the three scripts and `LICENSE.GPL-3.0.txt`, sign all
three scripts with your own code-signing thumbprint, wrap to `.intunewin`, upload, assign to the kiosk
group as ESP-blocking, then Autopilot Reset the pilot device and let it reach the second boot.

Report exactly these seven items and today's date, and nothing else:

  1. The run date and the detection registry value (expect `1.1.0-01`).
  2. The sensor v6 second-boot output. Paste it as-is; it is redacted in-process before any write.
     Its RUN and RUN1 lines carry the kiosk account SID, which is why the redaction pass exists.
  3. The nine `Debloat.log` checklist lines only — eight are fixed file literals and the ninth is the
     composed `Total Script Duration:` line. Never paste the full transcript.
  4. The three `<script> exit code <n>` lines plus the PSADT session exit code, extracted by grep.
  5. The count only of `WARN: Default hive busy`: `grep -oF 'WARN: Default hive busy' <psadt log> | wc -l`.
  6. `Get-AuthenticodeSignature` on the three staged scripts: `Status` for each, and the count of
     distinct thumbprints (expect 1). Counts only — never a thumbprint, Subject or Issuer string.
  7. Yes or no: were all three signed with the same certificate?

This is an allowlist, never an exclusion list. Do not report, and do not paste anything containing:
the device hostname or asset tag; any SID in any form; the tenant ID or the Intune device ID; the
employer name; any certificate thumbprint, Subject or Issuer; any account name other than
`kioskUser<n>`; any profile path other than `kioskUser<n>`, `Public` or `Default`; the pilot user's
identity.

Also answer one further question: is the measured De-Bloat runtime acceptable for the ESP budget?
Answer `yes` or `no`. Default if you say nothing: `NOT RULED` — it is recorded as not ruled and
carried forward to Phase 163 with the VND-03 note. A `no` reverts nothing in this plan; it is recorded
and a follow-up plan handles it.

If you would rather not run this, type `decline`. Declining is a supported answer, not a failure.
  </instructions>
  <verification>161-EVIDENCE.md carries either the seven-item allowlisted record with its date and the redaction substitution counts, or the single token DECLINED with its date. Either outcome is a pass and the plan continues to completion.</verification>
  <resume-signal>Paste the seven items, or type `decline`</resume-signal>
  <acceptance_criteria>
- `161-EVIDENCE.md` contains a section recording either (a) exactly seven items with the run date, or (b) the single token `DECLINED` with its date.
- No eighth item appears in the recorded allowlisted record. The ESP-runtime token is recorded as a separately labelled disposition line, not as an item.
- No `S-1-` sequence other than the literal `<SID>` placeholder appears in the recorded sensor block.
- No `C:\Users\` path segment other than `kioskUser<n>`, `Public` or `Default` appears in the recorded sensor block.
- The recorded sensor block does not exceed the sensor's 2,000-character emit cap.
- The plan does not halt on `decline`: if `decline` was given, RE-237 Step 8 and the Baseline README both state that the vendored step has not yet been exercised, STATE carries "VND-03 pilot run owed" forward to Phase 163, and VND-02 and VND-03 still flip at this plan's boundary.
  </acceptance_criteria>
  <done>The seven-item record or the `DECLINED` token is in `161-EVIDENCE.md` with its date and its redaction counts, and the plan proceeds either way.</done>
  <reversibility rating="costly">Undoing the deployment means reverting this plan's wiring commit and running one further Autopilot Reset on the pilot — the cycle the package's own header already documents (`functions.ps1:15`). Unlike 160-02's read-only analogue this gate mutates a device, so it is rated rather than left unrated.</reversibility>
</task>
```

**Decline path.** VND-02 and VND-03 are declared in 161-04 and flip at its boundary whatever the owner answers, because `requirements.mark-complete` fires from plan frontmatter at every boundary and the amended clauses (E-A1..A4) make the stated absence a satisfying outcome. Nothing strands: 161-04 is the last plan and has no dependents.

### The nine `Debloat.log` checklist literals
Eight file literals at the pinned bytes: `Still in OOBE, continue` (4100); `Intune detected, skipping removal of apps` (4198); `HP detected` (2183); `McAfee detected` (3945); `Downloading McAfee Removal Tool` (3949, 3968); `Found Chrome version` (4124, 4140); `Removing Chrome` (4126, 4142); `number of apps detected` (4199). The ninth, `Total Script Duration: mm min ss sec`, is composed at runtime from lines 4211/4214 and 4218 and does not appear in the file.

### D-48 redaction (G3-R) and verification (G3-V)
G3-R, in-process before any write, on the pasted text only: `S-1-[0-9]+(-[0-9]+)+` → `<SID>`; `(?i)C:\\Users\\(?!kioskUser[0-9]+\b|Public\b|Default\b)[^\\|, ]+` → `C:\Users\<USER>`; record "applied, N `<SID>` substitutions, M `<USER>` substitutions" — counts only.
G3-V, after every write in 161-04, over `161-EVIDENCE.md`, `161-04-SUMMARY.md`, `161-DRAFTS.md`, the Baseline README and RE-237, counted only, never echoed: `S-1-[0-9]+(-[0-9]+)+` → 0; the employer name derived by character-class split → 0; `(?i)\b[0-9a-f]{40}\b` → 0; `CN=` → 0; `(?i)[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}` count reported and reviewed against the ten pre-declared GUIDs (twelve distinct expected tree-wide). A surviving hit widens the regex (twice at most), then the sensor block degrades to counts-and-categories with the degradation stated. No hostname needle exists.

### `161-EVIDENCE.md` sections (D-57; task-headed)
1. `## Task 1 (161-01): Gate baseline` 2. `## Task 2 (161-01): Amendment landing` 3. `## Task 1 (161-02): Vendoring identity record` 4. `## Task 3 (161-02): Scrub scan` 5. `## Task 1 (161-03): Review and reconciliation record` 6. `## Task 3 (161-04): Checkpoint outcome` (the seven items after G3-R with substitution counts, or `DECLINED 2026-09-DD`; the runtime token on its own labelled line) 7. `## Excluded-identifier needle check (D-48 enforcement)` 8. `## Sensor v6 defects observed (hand-off to Phase 164)` (dead guard at 111; SID emission at 113/123; unguarded RUN1 121-123; SRP-RULE path at 87; the observed substitution counts; not fixed here — D-26 and the NOTICE hash at line 293) 9. `## Task 6 (161-04): Post-edit measurements, style-instrument limits, and the Phase 167 hand-off` (RE-237 `>` runs/max; pinned counts; byte counts and re-hashes; `check.py` keeps; sweep3 blind spots; `## Needle list handed to Phase 167 (HARN-04)`; the post-edit apex against the 161-01 anchor).

---

## PART G — Needle list handed to Phase 167 (D-42; 40 rows)

Prelude: `A=assets/recipes/06-walk-up-avd-kiosk; B=$A/package-sources/kiosk-baseline; F=$B/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1; R=docs/recipes/06-walk-up-avd-kiosk-autologon.md`. House form `grep -oE|-oF <pattern> <file> | wc -l` (`grep -c` counts lines, not occurrences).

| # | Needle | Command | Expected at landing |
|---|---|---|---|
| 1 | vendored script present | `test -f "$B/Files/RemoveBloat.ps1"` | rc 0 |
| 2 | blob identity | `git show HEAD:"$B/Files/RemoveBloat.ps1" \| sha256sum` | = NOTICE pin |
| 3 | LICENSE present | `test -f "$B/Files/LICENSE.GPL-3.0.txt"` | rc 0 |
| 4 | LICENSE identity | `git show HEAD:"$B/Files/LICENSE.GPL-3.0.txt" \| sha256sum` | `3972dc97…` |
| 5 | GPL title | `grep -oF 'GNU GENERAL PUBLIC LICENSE' "$B/Files/LICENSE.GPL-3.0.txt" \| wc -l` | 1 |
| 6 | GPL version line | `grep -oF 'Version 3, 29 June 2007' "$B/Files/LICENSE.GPL-3.0.txt" \| wc -l` | 1 |
| 7 | Edge control | `grep -oF 'Microsoft.MicrosoftEdge.Stable' "$B/Files/RemoveBloat.ps1" \| wc -l` | 2 |
| 8 | edgeupdate negative | `grep -oiF 'edgeupdate' "$B/Files/RemoveBloat.ps1" \| wc -l` | 0 |
| 9 | upstream SIG block, file | `grep -oF '# SIG # Begin signature block' "$B/Files/RemoveBloat.ps1" \| wc -l` | 1 |
| 10 | upstream SIG block, tree | `grep -rlF '# SIG # Begin signature block' assets/ \| wc -l` | 1 (row 1's path) |
| 11 | functions names the script | `grep -oF 'RemoveBloat.ps1' "$F" \| wc -l` | ≥1; exact recorded |
| 12 | parameter present | `grep -oF -- '-AllowStartMenuReset false' "$F" \| wc -l` | 1 |
| 13 | prohibition comment alive | `grep -oF -- '-custombloatlist' "$F" \| wc -l` | 1 |
| 14 | custombloatlist never invoked | `grep -F -- '-custombloatlist' "$F" \| grep -cvE '^[[:space:]]*#'` | 0 |
| 15 | hive-unload line | `grep -oF 'reg unload HKU\temphive' "$F" \| wc -l` (`-F` mandatory) | 1 |
| 16 | AppVersion | `grep -cE "AppVersion[[:space:]]+= '1\.1\.0'" "$F"` | 1 |
| 17 | AppScriptVersion | `grep -cE "AppScriptVersion[[:space:]]+= '1\.1\.0'" "$F"` | 1 |
| 18 | NOTICE section heading | `grep -cE '^Plan 161 vendoring$' "$A/NOTICE"` | 1 |
| 19 | GAP paragraph retained | `grep -oF 'Not vendored: RemoveBloat.ps1' "$A/NOTICE" \| wc -l` | 1 |
| 20 | closure marker | `grep -oE '^CLOSED 2026-09-[0-9]{2} \(v1\.23 Phase 161\)' "$A/NOTICE" \| wc -l` | 1 |
| 21 | upstream path recorded | `grep -oF 'De-Bloat/RemoveBloat.ps1' "$A/NOTICE" \| wc -l` | ≥1 |
| 22 | header amendment | `grep -oF 'One third-party license text is carried in the tree' "$A/NOTICE" \| wc -l` | 1 |
| 22b | 155-05 supersede | `grep -oE '^SUPERSEDED IN PART 2026-09-[0-9]{2} \(v1\.23 Phase 161\)' "$A/NOTICE" \| wc -l` | 1 |
| 23 | README new H2s | `for h in '## Attribution and license' '## Known runtime fetch paths and their triggers' '## Kiosk-safety review' '## Pattern-list reconciliation'; do grep -cFx "$h" "$B/README.md"; done` | 1 each |
| 24 | README existing final H2 | `grep -cFx '## Validation (pilot)' "$B/README.md"` | 1 |
| 24b | README Assemble H2 (E-B1) | `grep -cFx '## Assemble (EEE scripts from the SAME repo commit as the remediation packages - ONE source for their pattern lists; De-Bloat vendored at the commit NOTICE pins)' "$B/README.md"` | 1 |
| 25 | PROTECTED name recorded | `grep -oF 'MicrosoftEdgeUpdate' "$B/README.md" \| wc -l` | ≥1 |
| 26 | prohibition sentence | `grep -oF -- '-custombloatlist' "$B/README.md" \| wc -l` | ≥1 |
| 27 | RE-237 admin lead-ins | `grep -cE '^> \*\*Ask the admin:\*\*' "$R"` | 5 |
| 28 | RE-237 misconfig callouts | `grep -cE '^> \*\*What breaks if misconfigured:\*\*' "$R"` | 9 |
| 29 | V-156-ADMIN-4 carry-forward | `grep -oE 'administrator' "$R" \| wc -l` | 10 |
| 30 | vendored path linked | `grep -oF 'package-sources/kiosk-baseline/Files/RemoveBloat.ps1' "$R" \| wc -l` | ≥1 |
| 31 | license linked | `grep -oF 'LICENSE.GPL-3.0.txt' "$R" \| wc -l` | ≥1 |
| 32 | ruling date literal | `grep -oE 'ruled 2026-09-10' "$R" \| wc -l` | 2 (line 108 plus E-R1) |
| 33 | V-155-CONTENT literal | `grep -oE 'Deploy-WindowsApp\.ps1' "$R" \| wc -l` | 4 |
| 34 | V-156-SIGNINTO carry-forward | `grep -roF 'sign into' docs/ \| wc -l` | 0 |
| 35 | matrix untouched | `git diff --quiet <161-01 baseline sha> HEAD -- docs/reference/licensing-matrix.md` | rc 0 |
| 36 | amendment count, ROADMAP | `grep -oF 'SUCCESS-CRITERION AMENDMENT' .planning/ROADMAP.md \| wc -l` | 3 |
| 37 | amendment count, REQUIREMENTS | `grep -oF 'SUCCESS-CRITERION AMENDMENT' .planning/REQUIREMENTS.md \| wc -l` | 3 |
| 38 | no placeholder shipped | `grep -oF 'D-NN' .planning/ROADMAP.md .planning/REQUIREMENTS.md \| wc -l` | 0 |
| 39 | checkpoint taken | `grep -oF 'not yet been exercised' "$B/README.md" "$R" \| wc -l` | 0 if the run happened |
| 40 | checkpoint declined | same, plus `grep -oE '^DECLINED 2026-' 161-EVIDENCE.md \| wc -l` | 2 and 1 if declined — exactly one of rows 39/40 holds |
| 41 | ASCII dash negative on RE-237 | `grep -oF -- ' -- ' "$R" \| wc -l` | 0 |

Not pinned: `#` anchors (nav-hub-links resolves them), line numbers, run counts, byte sizes, `## Asset Provenance` (V-155-PROVENANCE asserts it). Rows 29 and 34 are validator duplicates carried because 160-EVIDENCE and D8 mandate the carry. Date literals are pinned as literal-presence needles (rows 20, 22b, 32).

---

## PART H — Plan frontmatters and task lists (E-J1..J4, VERBATIM frontmatters; D-35)

Common: `phase: 161-vendor-de-bloat-into-the-kiosk-baseline`, `type: execute`, waves 1-4 sequential on master (`use_worktrees: false`), `confidence: low   # estimate-calibration: factor 1, applied false, sample_count 0, min_samples 3`. `.planning/STATE.md` is declared wherever the harness boundary commit writes it. One scratchpad context bundle per plan naming paths; `RemoveBloat.ps1` by path only. `claude auth status` probed in the pre-wave baseline and again before 161-03 T2 and 161-04 T5. Process cap: three rounds per fragment, eight `claude -p` processes total (3 review + 3 fact-check + 2 judge); at a cap the residual is a named open finding stated on the surface and the flip proceeds. EDGE truths are generated by the plan-phase edge probe, not authored here.

### E-J1 — 161-01-PLAN.md
```yaml
---
phase: 161-vendor-de-bloat-into-the-kiosk-baseline
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/ROADMAP.md
  - .planning/REQUIREMENTS.md
  - .planning/STATE.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-GATE-BASELINE.json
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md
autonomous: true
requirements: []   # D-35/O-2: VND-01 flips at 161-02, VND-02+VND-03 at 161-04; this plan declares none
                   # so no boundary flip can fire before the content lands (160-01-PLAN.md:12-15
                   # precedent; requirements.mark-complete runs from frontmatter at EVERY plan boundary)
estimate:
  tokens: 45000
  raw_tokens: 45000
  tasks: 3
  confidence: low   # estimate-calibration: factor 1, applied false, sample_count 0, min_samples 3
---
```
T1 pre-wave baseline → `161-GATE-BASELINE.json` (D-39, D-44: six validators with tallyLines and the apex wall-clock; `style_residual`; `pin_residency` for RE-237 — `Ask the admin` 5, `What breaks` 9, `administrator` 10, `ruled 2026-09-10` 1, `Deploy-WindowsApp.ps1` 4, ASCII ` -- ` 0, `>` run count/max; `line_endings` for RE-237, NOTICE, functions file, README and the two future vendored paths via `git check-attr -a`; `claude auth status` + PONG; `npm test` baseline; `git status --porcelain` empty). Committed with T2. T2 the four appends (PART A) by direct `Edit` under D-40 with the gate bracket. Commit `docs(161-01): amend Phase 161 SC2/SC3 and VND-02/VND-03 for the signing and pilot clauses`. T3 bootstrap `161-EVIDENCE.md` §1-§2. Commit `docs(161-01): bootstrap the phase evidence record with the gate baseline and amendment tallies`.

### E-J2 — 161-02-PLAN.md
```yaml
---
phase: 161-vendor-de-bloat-into-the-kiosk-baseline
plan: 02
type: execute
wave: 2
depends_on: ["161-01"]   # not reflexive: both plans write 161-EVIDENCE.md, and a shared
                         # files_modified entry is an implicit dependency that execute-phase
                         # reports as a planning defect if the two plans sit in the same wave
files_modified:
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/LICENSE.GPL-3.0.txt
  - assets/recipes/06-walk-up-avd-kiosk/NOTICE
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md
autonomous: true
requirements: [VND-01]   # D-35/O-2: VND-01's last conjunct (the NOTICE GAP closed, not deleted)
                         # is settled at this boundary
estimate:
  tokens: 70000
  raw_tokens: 70000
  tasks: 3
  confidence: low   # estimate-calibration: factor 1, applied false, sample_count 0, min_samples 3
---
```
T1 pin and fetch (`commits?path=` count 1 → SHA; `contents` at that ref → blob SHA-1; raw download twice, `cmp`, `sha256sum`; `wc -c`; LF check; write both files; `git check-attr -a`). Commit `feat(161-02): vendor RemoveBloat.ps1 and the GPL-3.0 license text at a pinned commit` (the two files only). T2 NOTICE (E-N1 before line 362; E-N2 under 332-342; E-N4 after 378; E-N3 header, `grep -cFx` = 1 before) plus README `## Attribution and license`. Commit `docs(161-02): record the vendoring in NOTICE, close the GAP and supersede the 155-05 artifact count`. T3 scrub scan (D-36; ten GUIDs plus the employer split); EVIDENCE §3-§4 with needle rows 1-6, 9-10, 18-22b. Commit `docs(161-02): record the vendoring identity, scrub scan and needle re-measurements`.
Truths: bytes equal the upstream blob; zero modifications stated; license SHA256 recorded; GAP paragraph retained and CLOSED present and 371-376 superseded; historical paragraphs byte-unchanged (diff insertions only); `check-phase-155` 10/0; tree-wide SIG-block count exactly 1 at the vendored path; tree-wide `(?i)` GUID count exactly 12 distinct, all in D-36's set.

### E-J3 — 161-03-PLAN.md
```yaml
---
phase: 161-vendor-de-bloat-into-the-kiosk-baseline
plan: 03
type: execute
wave: 3
depends_on: ["161-02"]
files_modified:
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-FACTCHECK.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md
autonomous: true
requirements: []   # D-35/O-2: VND-02's amended clause names the 161-04 checkpoint as the source of
                   # its Get-AuthenticodeSignature evidence, so its last conjunct settles there,
                   # not here — declaring it here would flip on a plan that produces no such evidence
estimate:
  tokens: 90000
  raw_tokens: 90000
  tasks: 3
  confidence: low   # estimate-calibration: factor 1, applied false, sample_count 0, min_samples 3
---
```
T1 chunked full read → README `## Known runtime fetch paths and their triggers`, `## Kiosk-safety review`, `## Pattern-list reconciliation` (PART D shapes). Commit `docs(161-03): record the kiosk-safety review and pattern-list reconciliation in the Baseline README`. T2 the confirmation pass (D-52): probe auth; dispatch logged in `161-FACTCHECK.md`; the five controls requested as counts with the expected values held in the plan and never in the prompt; ≤ 3 rounds; disposition at the cap. Commit `docs(161-03): log the second-pass review dispatches and verdicts`. T3 needle rows 23-26 and the control counts → EVIDENCE §5. Commit `docs(161-03): record the review measurements and control counts`.
Truths: every PROTECTED string cross-checked against `$Bloatware` 425-508; the Edge 444/332 finding stated; the Quick Assist row with RE-237 line 48; policy-write and inert rows present; EEE scripts byte-unchanged (`check-phase-155` 10/0); the `## Assemble` H2 not touched here (161-04 owns E-B1).

### E-J4 — 161-04-PLAN.md
```yaml
---
phase: 161-vendor-de-bloat-into-the-kiosk-baseline
plan: 04
type: execute
wave: 4
depends_on: ["161-03"]
files_modified:
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md
  - assets/recipes/06-walk-up-avd-kiosk/NOTICE
  - docs/recipes/06-walk-up-avd-kiosk-autologon.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-FACTCHECK.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-FACTCHECK-RUBRIC.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-FACTCHECK-PACKET.md
  - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-JUDGE-PACKET.md
  - .planning/STATE.md
autonomous: false   # carries one checkpoint:human-action (the pilot run) per D-31
requirements: [VND-02, VND-03]   # D-35/O-2: both clauses' last conjuncts are settled only at this
                                 # boundary, and both flip on the decline path too (D-31)
estimate:
  tokens: 150000
  raw_tokens: 150000
  tasks: 6
  confidence: low   # estimate-calibration: factor 1, applied false, sample_count 0, min_samples 3
---
```
One commit per task boundary. T1 PSADT change (E-P1, E-P2a, E-P2b), README E-B1 plus the license staging line, `## Intune Win32 app` (`1.1.0-01`; the 60001 sentence), `## Versioning` (re-pin procedure), NOTICE re-hash lines. Commits `feat(161-04): wire the vendored De-Bloat pass into the Baseline install order` then `docs(161-04): update the Baseline README assembly, Intune and versioning sections and re-hash NOTICE`. Committed before the checkpoint so the owner assembles 1.1.0 from HEAD. T2 the checkpoint, E-C1 verbatim. T3 record: G3-R; EVIDENCE §6 (or `DECLINED`) with the runtime token as a labelled disposition line; README `## Validation (pilot)`; G3-V counts. Commit `docs(161-04): record the redacted pilot checkpoint outcome and the runtime ruling`. T4 RE-237 edits (PART E, measured or declined variants; re-stamp). Commit `docs(161-04): record the Step 8 vendoring ruling and update Asset Provenance in RE-237`. T5 fact-check (D-33; E-K1 rubric, `161-FACTCHECK-PACKET.md`) and the judge packet (D-53; `161-JUDGE-PACKET.md`) in fresh `claude -p` processes; packets and rubric committed before each dispatch; apply accepted rewrites. Commits `docs(161-04): commit the fact-check rubric and packets before dispatch` then `fix(161-04): apply the fact-check and judge rewrites to the RE-237 prose`. T6 post-wave gates (D-44, all three link targets), style instruments (D-54), confirmation of every PART G row, EVIDENCE §7-§9, STATE carry-forward. Commit `docs(161-04): record the post-edit gates, needle handover and sensor-defect hand-off`.
Truths: 70002 reachable via `-ErrorAction SilentlyContinue`; the `reg unload` line present; `AppVersion` and `AppScriptVersion` both `1.1.0`; the 58-60 comment amended; NOTICE hashes re-recorded; RE-237 lead-ins 5, callouts 9, `administrator` 10, `## Asset Provenance` 1, `Deploy-WindowsApp.ps1` 4, `ruled 2026-09-10` 2, ASCII ` -- ` 0; only allowlisted items appear and the E-C1 criteria hold; the `DECLINED` path stated on both surfaces if taken; every `claude -p` process logged with its dispatch string, ≤ 8 total; the apex re-run against the 161-01 anchor.

---

## PART I — Rubric and packets (161-04 T5; E-K1 VERBATIM)

- `161-FACTCHECK-RUBRIC.md` — a byte copy of `.planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK-RUBRIC.md` with exactly two edits: the title line becomes `# 161-04 Fact-Check Rubric`, and class 2's source clause becomes "traceable to a cited pre-edit RE-237 line or to the checkpoint record in `161-EVIDENCE.md`". Every other byte, including the fail-on-any-promotion rule and the class-5 aggregation rule, is unchanged. The packet checklist appended to the dispatch carries: "nothing in new prose asserts as conditional a behaviour the review table measured as unconditional (the Office Deployment Tool fetch above all)".
- `161-FACTCHECK-PACKET.md` — the E-R1, E-R2, E-R3, E-R4 and E-R5 fragments as landed, plus their sources: the NOTICE `Plan 161 vendoring` entry, the README review, reconciliation and fetch-path sections, EVIDENCE §6 (or the `DECLINED` token), and `git show <pre-edit sha>:docs/recipes/06-walk-up-avd-kiosk-autologon.md` for lines 219 and 240.
- `161-JUDGE-PACKET.md` — the before/after Row 1 cell, Row 2 cell and Asset Provenance paragraphs with the intended "Three → Two artifacts" delta named so it is not judged INVERTED.
- `161-FACTCHECK.md` — every `claude -p` process across 161-03 and 161-04 with its literal dispatch string (the `_JUDGE-VERDICTS-batch10.json` line-13 shape), round number, packet path and verdict summary; review-confirmation rounds first, then fact-check rounds, then the judge dispatches; the eight-process cap and any cap disposition. A recorded deviation from 160's per-plan fact-check record.
