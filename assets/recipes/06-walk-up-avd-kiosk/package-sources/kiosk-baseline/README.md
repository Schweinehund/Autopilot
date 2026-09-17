# EEE-WIN-Kiosk-Baseline - provisioning-time cleanup (Win32, ESP-blocking)

## Why
OneDrive seeding and OEM/consumer bloat are FIRST-LOGON effects. Cleaning during ESP device setup
(before the kiosk account exists) prevents the noisy first boot instead of converging after it.
Daily remediations (OemDebloat, RunTaskCleanup) stay assigned as the drift janitor.
Autopilot Reset wipes IME tracking -> this package re-runs during the reset's ESP automatically.

## Attribution and license
`Files\RemoveBloat.ps1` is vendored verbatim from Andrew Taylor's public De-Bloat script
(`andrew-s-taylor/public`, `De-Bloat/RemoveBloat.ps1`) at the pinned commit recorded in this
recipe tree's `NOTICE` file, under the GPL-3.0 license. The full license text is carried
alongside it at `Files\LICENSE.GPL-3.0.txt`, so it travels inside the `.intunewin` package
rather than depending on a runtime fetch. See `NOTICE` for the pinned commit SHA, blob SHA-1,
retrieval date and SHA256 identity proof.

This is the repository's own reading, not legal advice: shipping the full license text inside
the deployed package is read here as discharging GPL-3.0's conveyance obligation for this
script, and the aggregation reading is read as covering the EEE-authored scripts that travel
beside it in the same package without themselves becoming derivative works.

## Assemble (same repo commit as the remediation packages - ONE source for pattern lists)
1. Fresh PSADT v4 template; paste KioskBaseline-Invoke-AppDeployToolkit-functions.ps1 over the
   session block + three deployment functions.
2. Files\ <- Remove-KioskOemBloat.ps1, Remove-KioskRunTasks.ps1 (current copies included here).
3. Sign scripts; IntuneWinAppUtil -c . -s Invoke-AppDeployToolkit.exe -o .\out

## Intune Win32 app
Install:   Invoke-AppDeployToolkit.exe -DeploymentType Install -DeployMode Silent
Uninstall: Invoke-AppDeployToolkit.exe -DeploymentType Uninstall -DeployMode Silent
System | no restart action | x64 | Win11 22H2+
Detection: registry HKLM\SOFTWARE\EEE\KioskBaseline\Version equals <AppVersion-Rev>
Returns: defaults + 70001/70002 Failed
Assign: Required -> kiosk device group. ESP: ADD to blocking apps list (this package is the
exception to the "nothing extra in ESP" rule: local-only, fast, and its whole point is pre-first-logon).

## Versioning
Pattern change anywhere = update the shared Remove-* scripts once, re-upload to BOTH the remediation
packages and this package's Files\, bump AppVersion + detection. Never let the copies diverge.

## Known runtime fetch paths and their triggers
Five paths in `Files\RemoveBloat.ps1` reach outside the device at runtime. Four are conditional;
one is not. Line numbers below were re-measured against the committed bytes in this task, not
carried from an earlier reading.

| Path | Line | Trigger |
|---|---|---|
| `start2.bin` (`https://github.com/andrew-s-taylor/public/raw/main/De-Bloat/start2.bin`) | 1716 | Only when no non-admin profile is logged on AND `-AllowStartMenuReset` is `true`. The Baseline passes `-AllowStartMenuReset false`, so this fetch is skipped entirely (see `## Kiosk-safety review`). |
| `HPConnOpt.iss` (`https://raw.githubusercontent.com/andrew-s-taylor/public/main/De-Bloat/HPConnOpt.iss`) | 2288 | Only if the HP Connect Optimizer InstallShield folder exists (`C:\Program Files (x86)\InstallShield Installation Information\{6468C4A5-E47E-405F-B675-A70A70983EA6}\setup.exe`). |
| `mcafeeclean.zip` (`https://github.com/andrew-s-taylor/public/raw/main/De-Bloat/mcafeeclean.zip`) | 3951 | Only if a McAfee uninstall registry entry is detected (32-bit or 64-bit `Uninstall` hive scan). |
| `mccleanup.zip` (`https://github.com/andrew-s-taylor/public/raw/main/De-Bloat/mccleanup.zip`) | 3970 | Same McAfee-detected condition as the row above; this is a second, newer removal tool fetched in addition to the first. |
| Office Deployment Tool (`https://officecdn.microsoft.com/pr/wsus/setup.exe`, downloaded line 4189, run with `/configure … -Wait` line 4194) | 4189 | **UNCONDITIONAL during ESP device setup.** The enclosing gate at line 4097 (`if ($IsOOBEComplete -eq 0)`) tests OOBE completion state, not an Intune app count — it is not skipped once Intune has finished installing apps. If the host cannot reach `officecdn.microsoft.com`, the fetch fails silently under the script's global `$ErrorActionPreference = 'silentlycontinue'` (line 232) and the device pays a timeout with no log line beyond the transcript's own duration figure. |

## Kiosk-safety review
Andrew Taylor's script was read line by line, chunked across the whole file, against an explicit
PROTECTED list for this device class. Every line range below was re-measured against the committed
bytes in this task.

**1. PROTECTED list (single source).** Nothing on this list may be removed by the vendored script on
this device class: `MicrosoftEdgeUpdate*` scheduled tasks and `MicrosoftEdgeUpdate.exe`; Edge and
WebView2 (`Microsoft.MicrosoftEdge.Stable`, `Microsoft.Win32WebViewHost`, the Evergreen runtime);
the Windows 365 Windows App package (`MicrosoftCorporationII.Windows365`);
`Microsoft.Windows.AssignedAccessLockApp` (the Assigned Access lock app);
`Microsoft.AAD.BrokerPlugin`; the Intune Management Extension; the ConfigMgr client (Step 9);
`Microsoft.CompanyPortal`; Quick Assist (`MicrosoftCorporationII.QuickAssist` — named exception, see
below); the endpoint agents in the sensor's SVCUI service census; and `RtkAudUService` (the Realtek
audio user service, accepted residue).

**2. Class table** (line ranges re-measured against the pinned bytes at this plan's landing commit):

| Class | Lines | Finding |
|---|---|---|
| AppX bloat list (`$Bloatware` minus `$appstoignore`) | `$Bloatware` 425-508, `$appstoignore` (via `$WhitelistedApps` + `$NonRemovable`) 296-421, removal predicates 529 and 547 | **Exactly ONE PROTECTED item sits on the removal list: `Microsoft.MicrosoftEdge.Stable`, at line 444.** It survives removal only because line 332 lists the identical string in `$WhitelistedApps`, which both `$Bloatware` filters (`-notin $appstoignore`) exclude from the actual `Remove-AppxPackage`/`Remove-AppxProvisionedPackage` calls. This is a finding to be re-verified at every re-pin (`## Versioning`), not a property of the script that can be assumed to hold — a future upstream commit could remove the whitelist line without removing the bloat-list line. |
| AppX remote assistance | 479 | `MicrosoftCorporationII.QuickAssist` is on `$Bloatware` with no whitelist entry — a **named exception**, accepted below. RE-237 Step 8 item 1 names Quick Assist as a viewing path elsewhere in the recipe; Remote Help and AVD shadowing are untouched by this script (neither string appears in it). |
| Windows App | — | `Windows365` (case-insensitive) has zero occurrences in the vendored script. The Windows 365 Windows App package is not reachable by any removal path here. |
| HP Win32 list | 2188-2221, `-notcontains` filter 2225 | Eight `AD2F1837.*`-publisher Win32 entries (lines 2199-2205, 2219) plus one AppX entry at line 427 (`AD2F1837.HPPrinterControl`). No "HP Support Assistant" Win32 entry exists (only the AppX `AD2F1837.HPSupportAssistant` at 2203). The exclusion filter is an exact-string `-notcontains` match at line 2225 — not a wildcard or regex — and the `"HP Wolf Security Application Support for Chrome 122.0.6261.139"` literal at line 2198 is version-baked: it will silently stop matching the day Chrome bumps that version number in the installed program's display name. |
| Other OEM and third-party Win32 uninstalls | Dell 2514, Lenovo 2919, Samsung 3314, Acer 3551, Asus 3818, McAfee 3943-4052, Chrome 4115-4147, Office C2R 4149-4196 | No PROTECTED item is named in any of these seven manufacturer/vendor blocks. (McAfee's measured range, 3943-4052, is wider than the DRAFTS pinned-SHA pointer of 3945-3985 — that pointer named only the two removal-tool download/run sub-blocks; the full `if ($mcafeeinstalled -eq "true")` block, including the WebAdvisor and SafeConnect cleanup that follows, extends to line 4052.) |
| Registry and Default-user hive | Loads at 1250, 1417, 1529; unloads at 1268, 1521, 1633 | No PROTECTED impact — none of the keys written touch a PROTECTED package or service. The Baseline's own PSADT wiring (`## Assemble`, 161-04) unloads `HKU\temphive` after the whole bundled-script pass runs, because this script mounts and unmounts the hive three times and never checks whether its own unloads succeeded. |
| Policy writes | 1775-1780 | `HKLM:\SOFTWARE\Policies\Microsoft\Edge` is created if absent and `AllowSurfGame` is written as `0` (DWord). This is an **unmanaged write into a key Intune owns** — stated here plainly rather than neutered, per the standing decision not to edit the vendored script in-file. |
| Measured-inert code | `$Keys` 579-610, consumed by one `Remove-Item` loop at 613-617; bookmark loop 3800-3817 | `$Keys` is a static list of `HKCR:\Extensions\...\PackageId\...` paths removed with `Remove-Item -Recurse` and zero `New-PSDrive` calls anywhere in the script — these paths are consumed exactly as written, no drive mapping makes them reachable beyond the registry provider's default view, and the removal is a silent no-op wherever the key does not already exist. The bookmark-removal loop at 3800-3817 builds the path `C:\Users\$userpath\AppData\...` where `$userpath` is already the full path returned by `$user.FullName` (e.g. `C:\Users\kioskUser1`), composing `C:\Users\C:\Users\kioskUser1\AppData\...\Bookmarks` — a path that can never exist on Windows, so this loop never actually removes an Edge bookmarks file. |
| Scheduled tasks, Xbox services, update service | Scheduled tasks 1099-1130, Xbox services 1732-1735, `UDCService` 3307-3308 | No PROTECTED impact — none of `XblGameSaveTaskLogon`, `XblGameSaveTask`, `Consolidator`, `UsbCeip`, `DmClient`, `DmClientOnScenarioDownload`, the four Xbox services, or the Lenovo `UDCService` is on the PROTECTED list. |
| Start-menu reset | 1640-1723 | Skipped entirely by `-AllowStartMenuReset false`, on both the Windows 10 and Windows 11 branches (see `## Pattern-list reconciliation` note below and D-11). |
| Runtime fetches | 1716, 2288, 3951, 3970, 4189 | See `## Known runtime fetch paths and their triggers` above — four conditional, the Office Deployment Tool fetch unconditional in ESP. |

**3. Negative controls (counts only, measured against the committed bytes):**

| Control | Count |
|---|---|
| `Microsoft.MicrosoftEdge.Stable` | 2 |
| `edgeupdate` (case-insensitive) | 0 |
| `Windows365` (case-insensitive) | 0 |
| `AssignedAccess` | 1 (the single `$NonRemovable` entry, line 368) |
| `New-PSDrive` | 0 |

Every PROTECTED string was cross-checked for membership in `$Bloatware` (425-508); the Edge finding
above is the only membership hit.

**4. Prohibition.** `-custombloatlist` is never passed to this script on this device class. Line 519
strips any matching entries out of `$appstoignore` (the combined whitelist), so passing this
parameter would disarm the very whitelist line that keeps `Microsoft.MicrosoftEdge.Stable` off the
removal path. Any future proposal to pass `-custombloatlist` re-runs this whole review first.
**Brittleness caveat for any future `-customwhitelist`:** the whitelist exclusion at line 2225 is an
exact-string `-notcontains` match, not a pattern match, and the `"HP Wolf Security Application
Support for Chrome 122.0.6261.139"` literal at line 2198 is version-baked — both will silently stop
matching as soon as the underlying installed-program strings change.

**5. The `$intunecomplete` note.** `$intunecomplete` (the count of Win32 apps under
`HKLM:\SOFTWARE\Microsoft\IntuneManagementExtension\Win32Apps`) gates nothing: its value is read
only inside a log string at line 4199 (`"$intunecomplete number of apps detected"`). The real gate
at line 4097 is `$IsOOBEComplete`, an OOBE-completion state read via a native `OOBEComplete` P/Invoke
call — not an Intune app count. On the pilot device, the transcript literal that identifies which
branch ran is either `"Still in OOBE, continue"` (line 4100, Office/Chrome/ODT block runs) or
`"Intune detected, skipping removal of apps"` (line 4198, block skipped).

**Named acceptances, recorded rather than omitted:**
- **CrossDevice.** `MicrosoftWindows.CrossDevice` removal (line 480, `$Bloatware`) is accepted. RE-237's
  `crossdeviceresume.exe` allow-list entry is not edited by this plan; the consequence of removing the
  package it belongs to is noted for Phase 165.
- **Quick Assist.** Removal is accepted as a measured exception (line 479, see the class table above);
  RE-237 Step 8 item 1 names Quick Assist as a viewing path elsewhere, and a note goes to Phase 165.
- **Realtek audio.** `RealtekSemiconductorCorp.HPAudioControl` (AppX, HP Win32 list lines 2206 and
  2209) removal is accepted. The Realtek audio user service, `RtkAudUService`, is untouched by both
  this script and `Remove-KioskOemBloat.ps1` — neither string appears in either file — so the residue
  row stays consistent with the Phase 165 inventory.

## Pattern-list reconciliation
`Remove-KioskOemBloat.ps1` carries fifteen removal patterns (one HP-publisher prefix regex plus
fourteen exact-name patterns). Each was checked against `Files\RemoveBloat.ps1`'s own `$Bloatware`
and `$WhitelistedApps` arrays at the committed bytes. Rows are grouped by disposition and ordered
within each group by the line at which the upstream match occurs.

**Removed by `$Bloatware` (7):**

| Pattern | Upstream line |
|---|---|
| `Microsoft.BingNews` | 436 |
| `Microsoft.BingSearch` | 437 |
| `Microsoft.BingWeather` | 438 |
| `Microsoft.GetHelp` | 439 |
| `Microsoft.GamingApp` | 441 |
| `Microsoft.MicrosoftSolitaireCollection` | 448 |
| `Microsoft.PowerAutomateDesktop` | 457 |

**Kept by the upstream whitelist (2):**

| Pattern | Upstream line |
|---|---|
| `Microsoft.MicrosoftStickyNotes` | 305 |
| `Microsoft.OutlookForWindows` | 330 |

**Not listed upstream (5):**

| Pattern | Note |
|---|---|
| `MicrosoftWindows.Client.WebExperience` | Present in `$Bloatware` only as a commented-out line (427... line 507), so it is not actually enforced upstream. |
| `aimgr` | No occurrence anywhere in the vendored script. |
| `Microsoft.Office.ActionsServer` | No occurrence anywhere in the vendored script. |
| `Clipchamp.Clipchamp` | Only a changelog mention (line 27, "Added Clipchamp"); no array entry. |
| `AdvancedMicroDevicesInc-2.AMDRadeonSoftware` | No occurrence anywhere in the vendored script. |

**HP publisher partial (1):**

| Pattern | Note |
|---|---|
| `^AD2F1837\.` | The EEE regex catches the whole `AD2F1837` publisher prefix. The vendored script's `$Bloatware` carries exactly one AppX entry under that publisher (`AD2F1837.HPPrinterControl`, line 427); the script's separate HP Win32 list (2188-2221) removes eight more `AD2F1837.*` **Win32** programs by exact display name, which the EEE AppX-only regex cannot reach. |

**Group totals: 7 + 2 + 5 + 1 = 15.** Conclusion: De-Bloat is not a superset of the EEE removal
list. The EEE overlay (`Remove-KioskOemBloat.ps1`) stays load-bearing for seven of the fifteen
patterns it carries — the five "not listed upstream" plus the HP-publisher partial's Win32 remainder
— and the Assemble step still stages and runs both EEE scripts unchanged (D-13). Neither
`Remove-KioskOemBloat.ps1` nor `Remove-KioskRunTasks.ps1` is edited by this plan.

## Validation (pilot)
Lab: run install as SYSTEM, confirm marker + both script exit codes 0 in the PSADT log.
Device: Autopilot Reset the pilot kiosk -> expect QUIET first boot (no dialog), sensor v6 clean of
launcher lines, OneDrive absent from the new kioskUserN profile, RunTasks detection = OK on first run.
