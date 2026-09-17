# Phase 161 Plans 03-04 — Fact-Check Record

This file spans this plan (161-03) and 161-04 (D-57), a recorded deviation from 160's per-plan
fact-check record — costless because 161-04 already declares `depends_on: ["161-03"]`. 161-03 owns
the review-confirmation rounds below; 161-04 appends its own fact-check rounds and judge dispatches
after them.

`dispatch_command` (shape reused across all three rounds below, prompt file substituted per round):

```
timeout 600 claude -p "$(cat <round-N-prompt-file>)" --output-format text </dev/null > <round-N-output-file>
```

Each process was a fresh `claude -p` operating-system process, stdin redirected from `/dev/null`,
`--output-format text`, given only the two artifact paths named in its prompt (the Baseline README
and the vendored script) and left to read them itself with its own Read tool, chunked, rather than
having either file's content embedded in the dispatch string — the script is 4,405 lines and
embedding it verbatim in every round would not change what "chunked across the whole file" means for
the dispatched process. No process was dispatched inside the context that produced the review.

**Process count against the phase-wide eight-process cap (D-57): 3 of 8 used by this plan** (all
three are review-confirmation rounds; 161-04 owns the remaining budget for its fact-check and judge
dispatches).

## Round 1 (2026-09-17)

**Packet path:** `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md`
(the three new H2 sections Task 1 landed) plus
`assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1` (read by
the dispatched process itself, in nine sequential 500-line chunks).

**Dispatch string (verbatim, prompt file contents substituted for `$(cat …)`):**

```
You are performing an independent confirmation review. Two artifacts, both under
D:\claude\Autopilot :

1. The Baseline README's kiosk-safety review, at
   assets\recipes\06-walk-up-avd-kiosk\package-sources\kiosk-baseline\README.md
   -- read the whole file, paying special attention to the "## Known runtime fetch
   paths and their triggers", "## Kiosk-safety review" and "## Pattern-list
   reconciliation" sections.

2. The vendored script it reviews, at
   assets\recipes\06-walk-up-avd-kiosk\package-sources\kiosk-baseline\Files\RemoveBloat.ps1
   (4405 lines) -- read it IN FULL using your Read tool in sequential chunks (e.g.
   offset 1/limit 500, then offset 501/limit 500, and so on) until you reach line
   4405. Do not sample or skip sections. Do not rely on any prior knowledge of this
   script; read the actual committed bytes.

Task: cross-check every PROTECTED-list member named in the README's "## Kiosk-safety
review" section (Part 1) against every removal path in the script (the $Bloatware
AppX list, the $NonRemovable list, the HP/Dell/Lenovo/Samsung/Acer/Asus manufacturer
blocks, the Office/Chrome removal block, the scheduled-task and service disables,
and any registry removal). Then report, and ONLY report, the following four items
with no other commentary:

A. Any PROTECTED-list member you find reachable by a removal path in the script that
   the README's class table (Part 2) does NOT name. List each one, or write "none".

B. Any entire removal class present in the script (a whole manufacturer block, a
   whole registry block, a whole service/task block, etc.) that the README's class
   table omits entirely. List each one, or write "none".

C. Report these five counts, each measured by you directly against the script's
   actual bytes (search the file yourself; do not guess or estimate):
   - Occurrences of the literal string "Microsoft.MicrosoftEdge.Stable"
   - Case-insensitive occurrences of "edgeupdate"
   - Case-insensitive occurrences of "Windows365"
   - Occurrences of "AssignedAccess"
   - Occurrences of "New-PSDrive"

D. State whether you read the script in full (confirm the last line number you saw).

Report only sections A, B, C, D above, each labelled, with no additional prose.
```

**Verdict (transcribed verbatim):**

> **A.** none. Every PROTECTED member resolves to a path the class table names or to zero
> occurrences: `Microsoft.MicrosoftEdge.Stable` (444, whitelisted 332); `MicrosoftCorporationII.QuickAssist`
> (479, named exception); `Microsoft.Win32WebViewHost` (366), `Microsoft.MicrosoftEdge` (364),
> `Microsoft.AAD.BrokerPlugin` (357), `Microsoft.Windows.AssignedAccessLockApp` (368) all sit in
> `$NonRemovable`; `Microsoft.CompanyPortal` is in `$WhitelistedApps` (298) and absent from
> `$Bloatware`; `edgeupdate`, `Windows365`, `RtkAudUService`, ConfigMgr/CcmExec have zero
> occurrences; Intune Management Extension appears only as a registry path read (1698, 4059). No
> wildcard removal path (`*lenovo*` 2958, `*McAfee*` 3986, `Dell*Optimizer*` 2830/2848,
> `*SupportAssist*` 2590) can match any PROTECTED string. One adjacent item, not on the PROTECTED
> list and therefore not counted here: `Microsoft.RemoteDesktop` (line 460) is on `$Bloatware` with
> no whitelist entry.
>
> **B.** Removal classes present in the script that the class table's Lines column does not name:
> - Windows 10 Windows Backup removal: `Remove-WindowsPackage` of the UserExperience-Desktop package
>   plus DISM add-capability, lines 1176-1193 (gated on a Windows 10 caption).
> - OneDrive Photos app removal: deletes `OneDrive.App.exe` per-profile and machine-wide and any
>   Start Menu `.lnk` targeting it, lines 1339-1409.
> - HKLM and per-SID HKU registry settings block, lines 620-928 (including `Remove-Item` of the 3D
>   Objects namespace keys at 904/908 and the direct Cortana `Remove-AppxPackage` at 928 outside the
>   `$Bloatware` filter), OOBE keys 937-950, Dsh feeds 1164-1169, WindowsCopilot 1204-1297, WindowsAI
>   1305-1331. The "Registry and Default-user hive" row names only the three temphive load/unload
>   lines; its finding text covers these generically.
> - Xbox section beyond the four `Set-Service` lines: `xbgm` service Start=4 (1731),
>   `XblGameSaveTask` disable via `Set-ScheduledTask` (1736-1740), ACL takeover and deletion of
>   `System32\GameBarPresenceWriter.exe` (1743-1760), GameDVR and `SettingsPageVisibility` policy
>   writes (1767-1768), `Remove-Item C:\Windows\Temp\SetACL.exe` (1769).
> - Misc shortcut removal (`Benutzerhandbuch.lnk`), lines 1808-1827.
> - HP regex-pattern uninstall loop, lines 2337-2497: matches `DisplayName -match
>   [regex]::Escape(pattern)` (substring) and is not filtered by `$appstoignore`. The HP row names
>   only the list 2188-2221 and the filter at 2225. The same loop structure recurs in Dell
>   (2667-2819), Samsung (3394-3546) and Acer (3643-3795), which the table covers only by block
>   start line.
> - `Remove-CustomScheduledTasks` (253-287, invoked 1149-1153), reachable only when
>   `-TasksToRemove` is passed; the Baseline does not pass it.
>
> **C.**
>
> | String | Count | Lines |
> |---|---|---|
> | `Microsoft.MicrosoftEdge.Stable` | 2 | 332, 444 |
> | `edgeupdate` (case-insensitive) | 0 | — |
> | `Windows365` (case-insensitive) | 0 | — |
> | `AssignedAccess` | 1 | 368 |
> | `New-PSDrive` | 0 | — |
>
> **D.** Yes. Read in nine sequential chunks from line 1 to the end. Last content line seen: 4405
> (`# SIG # End signature block`); the Read tool displayed a trailing empty line numbered 4406 after
> the final newline, and `wc -l` reports 4405.

**Outcome:** zero omitted PROTECTED hits (A = none); zero of the five negative-control counts
differed from the values recorded in this plan. Section B surfaced seven omitted-class categories;
per D-52, the README was corrected (new "Miscellaneous OS-tweak removals" and "Manufacturer
uninstall-loop matching mechanism" rows added) and round 2 was dispatched.

## Round 2 (2026-09-17)

**Packet path:** same two paths as round 1, README re-read after the round-1 correction.

**Dispatch string:** identical in structure to round 1, with one added sentence in item B directing
the process to also check the two rows added after round 1 (`"Miscellaneous OS-tweak removals"` and
`"Manufacturer uninstall-loop matching mechanism"`); full text preserved in
`161-03-review-dispatch-2.md` in this session's scratchpad (not committed — the prompt text is
reproduced in full in round 1's entry above with that one addition, per D-52's rule that no dispatch
states an expected value).

**Verdict (transcribed verbatim):**

> **A.** none strictly. Two qualified near-misses, both outside the table:
> - `Microsoft.Edge.GameAssist` (line 490, `$Bloatware`, no whitelist entry) is an Edge-family AppX
>   package that is actually removed; the PROTECTED list names only `Microsoft.MicrosoftEdge.Stable`,
>   `Microsoft.Win32WebViewHost` and the Evergreen runtime, so it is not a member by the list's own
>   wording, but no class-table row mentions it.
> - The McAfee block matches `*McAfee*` by substring (detection 3927/3937, uninstall 3986) with no
>   `$appstoignore` filter. If the sensor's SVCUI service census contains an agent whose uninstall
>   DisplayName contains "McAfee" (e.g. a legacy McAfee/Trellix Agent), it is reachable. The census
>   names are not in the README, so this cannot be confirmed either way.
>
> **B.**
> - `UninstallAppFull` / `parseExeUninstall` helper functions (1978-2125): the exact-DisplayName
>   (`-eq`) uninstall engine every manufacturer loop calls; not named in any row.
> - HP third removal mechanism and hardcoded-path removals: `Get-Package | Uninstall-Package`
>   (2255-2257), `Doc_uninstall.cmd` (2280-2283), Z by HP Data Science Stack Manager (2293-2296),
>   folder and Start Menu shortcut deletions `HP\Shared`, `Online Services`, `ProgramData\HP\TCO`,
>   Amazon/Angebote/TCO/Booking/Adobe/Miro `.lnk` (2300-2326). The HP row covers only 2188-2225.
> - OEM process-kill and service-stop loops: Dell process kills (2563-2587) and `*SupportAssist*`
>   service stops (2590-2593), Lenovo process kills including the `*lenovo*` wildcard (2953-2991),
>   Acer process kills without the `Test-ProcessCritical` guard (3557-3568). No row names a
>   process/service-kill class.
> - Unfiltered wildcard/substring Win32 removals outside the HP regex loop, contradicting the
>   mechanism row's "the one substring-matching removal path" claim: Dell `-match "Dell SupportAssist
>   Remediation"` (2599), `"Dell SupportAssist OS Recovery Plugin for Dell Update"` (2617), `-like
>   "Dell*Optimizer*Core"` (2830), `"Dell*Optimizer"` (2848), `"Dell*Display*Manager*"` (2866); the
>   last three remove `Dell Optimizer Core` and `Dell Display Manager 2.0/2.1/2.2` even though those
>   are in `$WhitelistedApps` (320, 324-326). Lenovo `UninstallApp` function `-like "*$appName*"`
>   (2927-2949, invoked 3070) and `Lenovo Vantage Service` via `Invoke-Expression` (3052-3058).
>   McAfee `*McAfee*` (3986) and `McAfee Safe Connect` (4017).
> - OEM registry and shell-layout removals not in the "Registry and Default-user hive" row: Lenovo
>   `Remove-Item HKLM:\SOFTWARE\Policies\Lenovo\*` keys (3088-3090), Lenovo and Asus
>   `Themes\ThemeName` / `DesktopBackground` value deletions (3283-3292, 3871-3882), Asus
>   `C:\Windows\OEM\TaskbarLayoutModification.xml` deletion and `Explorer\LayoutXMLPath` value
>   removal (3885-3905), Lenovo E14 `EnableFrameServerMode` write (3259-3276), Lenovo hardcoded-path
>   uninstallers and `uninstall.ps1` invocations (3062-3214), User Guide / Responsible AI Policy
>   shortcut and folder deletions (3217-3255), X-Rite (3295-3303).
>
> **C.**
>
> | String | Count |
> |---|---|
> | `Microsoft.MicrosoftEdge.Stable` | 2 (lines 332, 444) |
> | `edgeupdate` (case-insensitive) | 0 |
> | `Windows365` (case-insensitive) | 0 |
> | `AssignedAccess` | 1 (line 368) |
> | `New-PSDrive` | 0 |
>
> **D.** Yes, read in full in sequential 500-line chunks. Last content line seen: 4405 (`# SIG # End
> signature block`); the Read tool reported an empty line 4406 after it, and `wc -l` reports 4405.

**Outcome:** zero omitted PROTECTED hits (A = none, with two disclosed near-misses); zero
negative-control drift. Section B surfaced further omitted classes and one over-claim (the
"substring-matching" row's "the one" wording). Per D-52, the README was corrected again (expanded
mechanism row, new "Additional per-manufacturer removal paths not covered above" row, and a
Microsoft.Edge.GameAssist / SVCUI-census disclosure added to the AppX row) and round 3 was
dispatched.

## Round 3 (2026-09-17) — three-round cap reached

**Packet path:** same two paths, README re-read after the round-2 correction.

**Dispatch string:** identical in structure to rounds 1-2, with item B's scope note updated to name
all three rows now present ("Miscellaneous OS-tweak removals", "Manufacturer uninstall-loop matching
mechanism" and "Additional per-manufacturer removal paths not covered above"); full text in
`161-03-review-dispatch-3.md` in this session's scratchpad.

**Verdict (transcribed verbatim):**

> **A.** none
>
> **B.**
> - Dell hardcoded-path uninstaller invocations, lines 2883-2914 (`C:\Program Files\Dell\Dell
>   Peripheral Manager\Uninstall.exe /S`, `C:\Program Files\Dell\Dell Pair\Uninstall.exe /S`,
>   `C:\ProgramData\Package Cache\{0a5aa116-…}\DellUpdateSupportAssistPlugin.exe /uninstall
>   /quiet`). No row names them; the Lenovo analogue (3062-3214) is named, the Dell one is not.
> - "Learn about this picture" registry write, lines 959-978 (`HideDesktopIcons\NewStartPanel` value
>   set to 1 under HKCU and every HKU SID). Registry write, not a removal, but it is neither named by
>   word nor inside any line range the "Miscellaneous OS-tweak removals" row lists (620-928, 937-950,
>   1164-1169).
>
> **C.**
>
> | String | Count | Lines |
> |---|---|---|
> | `Microsoft.MicrosoftEdge.Stable` (literal) | 2 | 332, 444 |
> | `edgeupdate` (case-insensitive) | 0 | — |
> | `Windows365` (case-insensitive) | 0 | — |
> | `AssignedAccess` | 1 | 368 |
> | `New-PSDrive` | 0 | — |
>
> **D.** Yes. Read in full via nine sequential Read chunks (1-500 through 4001-4500); last line seen
> was 4405 (`# SIG # End signature block`), and `wc -l` on the file returns 4405.
>
> Out of scope, one line: the HP row says "five OEM Start Menu `.lnk` targets (2300-2326)"; the
> script has six (Amazon.com, Angebote, TCO Certified, Booking.com, Adobe offers, Miro Offer at
> 2309-2325).

**Outcome:** zero omitted PROTECTED hits across all three rounds (A = none every time); zero
negative-control drift across all three rounds. Two small items remained at the cap (the Dell
hardcoded-path uninstaller trio and the "Learn about this picture" registry write) plus a
count-precision correction (five vs. six `.lnk` targets). **Pass condition (zero omitted PROTECTED
hits, zero omitted classes) was met on the safety dimension (zero PROTECTED hits, all three rounds)
but not on the completeness dimension after the third round.** Per D-52, at the three-round cap: the
two final items and the count correction were folded into the README's class table (the fourth
edit made after this round), and the residual is recorded as a **named open finding directly on the
README surface** (the "Named open finding (D-52 round cap reached)" paragraph in the
"## Kiosk-safety review" section) rather than suppressed. The flip proceeds — no requirement is
declared in this plan's frontmatter (`requirements: []`), so nothing flips here regardless.

---

*Sections for 161-04's fact-check rounds and judge dispatches are appended below this line by that
plan (D-57).*
