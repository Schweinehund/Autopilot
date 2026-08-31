---
seed_id: SEED-002
planted: 2026-08-31
planted_during: "Live walk-up AVD kiosk pilot build (2026-08-27 → 2026-08-30) — one HP device, self-deploying, Entra-only, internet-only"
trigger_when: "scoping the next Device Configuration Recipe milestone, or any milestone touching RE-222 / RE-224 / Windows kiosk content"
status: planted
---

# SEED-002: Walk-Up AVD Kiosk Recipe — Field-Validated Build, Cross-Doc Conflicts, and Asset Placement

## Idea

Bring the field-validated walk-up kiosk build under requirements + the C17 harness as Recipe #6
(`docs/recipes/06-walk-up-avd-kiosk-autologon.md`, RE-237, authored Draft outside the GSD phase
flow on 2026-08-31), reconcile four places where the pilot's observed behaviour disagrees with or
resolves `[ASSUMED]` markers in RE-222 and RE-224, and decide where the recipe's executable assets
(scripts, XML, package sources) live in a docs-first repo.

## When to Surface

When running `/gsd-new-milestone` for a recipe milestone (v1.22+), or when RE-222 / RE-224 come
up for their 90-day review — the conflicts below should be resolved in the same phase that
promotes RE-237 from Draft to Approved.

## Why This Matters

Recipe #6 is the only recipe in the corpus authored from a live build rather than from Learn pages,
so it carries observed-behaviour claims the harness cannot validate and two existing recipes make
statements the pilot contradicted. Left un-reconciled, a reader following RE-222 §5a or RE-224's
autologon row would be steered away from the configuration that actually works for this device
class.

## Scope Captured

### A. Cross-doc conflicts / `[ASSUMED]` resolutions to reconcile

- **RE-222 Step 5a (Kiosk template, single-app, Windows App via "Add Store app").** The pilot did
  not use this path and Microsoft's own reference implementation (`Azure/WindowsAppKiosk`) ships
  no single-app variant — only Shell Launcher and multi-app. Recommend adding a callout that
  single-app Assigned Access runs above the lock screen and that Windows App's Entra sign-in
  (WAM broker / WebView2) is the known risk there; route readers wanting autologon + Windows App to
  RE-237.
- **RE-222 Step 4 `[ASSUMED]` reset field names** (`ResetAppOnCloseOnly` / `ResetAppAfterConnection`
  / `ResetAppOnIdle`). Field-resolved: there is no Settings Catalog field. The values are install
  parameters of `Deploy-WindowsApp.ps1` (`ResetAppOnCloseOnly`, `ResetAppAfterConnection`,
  `ResetAppOnCloseOrIdle` + `-AutoLogoffTimeInterval`) writing
  `HKLM\SOFTWARE\Microsoft\WindowsApp` (`AutoLogoffEnable`, `AutoLogoffTimeInterval`,
  `AutoLogoffOnSuccessfulConnect`). Documented at learn.microsoft.com/windows-app/windowsautologoff.
- **RE-222 Step 5a `[ASSUMED]` offline Store license for the autologon account.** Field-resolved
  negative: the provisioned MSIX (`Add-AppxProvisionedPackage`) registered for the Assigned Access
  autologon account with no offline license and Windows App launched normally.
- **RE-224 anti-feature row "A local autologon account instead of the Entra group … that is the
  single-app case".** The pilot ran autologon + multi-app successfully (it is the reference
  implementation's shipped pattern). The row's reasoning holds only when allow-listed apps need an
  authenticated *Windows* user; where the sole app performs its own sign-in (Windows App), autologon
  multi-app is the correct arm. Recommend narrowing the row and cross-linking RE-237.
- **RE-224 Step 6 data-type note (MEDIUM confidence, String vs String (XML file)).** Field-confirmed
  `String` with a raw paste in this tenant. Additionally observed: pre-escaped XML fails with
  `0xc00ce556` (double-encoded). Keep the tenant-observed label; Learn documents escaping as the
  MDM server's job, not Intune's UI behaviour.
- **RE-224 prerequisites — Shell Launcher "not supported on Pro".** Pilot adds: also fails on
  *unactivated* Enterprise (`Class is not licensed for use`, Intune `-2016281112`), because a
  self-deploying kiosk never triggers per-user subscription activation. Licensing implication for
  the licensing matrix (`docs/reference/licensing-matrix.md`): per-user E3/E5 cannot license a
  userless device; MAK (per-device VL) or IoT Enterprise hardware is required for Shell Launcher.

### B. Observed behaviours worth a runbook or reference row (not yet in corpus)

- Every Assigned Access configuration change (and Autopilot Reset) retires the autologon account
  and mints the next (`kioskUser0` → `kioskUser1` …); the fresh profile re-runs first-logon seeds
  (OneDrive setup, Store registration parade, first-run experiences) → one noisy boot. Evaluate the
  second boot. Candidate for an L2 runbook: "Kiosk popup 'blocked by your system administrator'
  triage" — dialog text = packaged-app (AL8025) block dialog; RestrictRun blocks do not log;
  attribute only by sensor timestamp correlation across a controlled reboot.
- Windows App child processes that must be allow-listed in multi-app mode: `windows365.exe`,
  `msedgewebview2.exe`, `msrdc.exe`, `crossdeviceresume.exe` (source: `Azure/WindowsAppKiosk`
  `ADVANCED_CUSTOMIZATIONS.md`). Missing WebView2 = blank sign-in page; missing msrdc = connect fails.
- Factory-image OEM/consumer packages that produced the recurring dialog on HP hardware:
  `AD2F1837.*` (HP), `aimgr`, `Microsoft.SecHealthUI` (via `SecurityHealth` Run value),
  `Microsoft.PowerAutomateDesktop`, `Microsoft.OutlookForWindows`, `Microsoft.BingSearch`,
  `Microsoft.MicrosoftStickyNotes`, `Microsoft.Office.ActionsServer`, plus per-user OneDrive
  startup tasks re-seeded from the Default profile. Accepted residue: Realtek `RtkAudUService`
  Run value (self-restoring), Widgets remnant (policy-backstopped), `MicrosoftEdgeUpdate` task
  (PROTECTED — services WebView2).
- Intune Remote Help gained Windows **unattended** control with remote sign-in (Intune August
  2026 service release) — changes the support-tooling answer for this device class; licensing check
  pending. ConfigMgr Remote Control does not work over CMG (never shipped for internet clients).
- Credential Guard (default-on, Windows 11 22H2+ Enterprise) blocks CredSSP delegation of saved /
  logon credentials for RDP; the client-side "server's authentication policy does not allow …
  saved credentials" message appears even when the target has no such policy. Fix = Kerberos-clean
  targets (FQDN, DC line of sight) or AVD host-pool Entra SSO. Candidate reference-doc row.

### C. Asset placement decision (open)

The recipe references executable assets that a docs-only corpus has no home for: the production
and debug Assigned Access XML, three PSADT package sources (Windows App, Kiosk Baseline, ConfigMgr
client), two detect/remediate pairs, the v6 triage sensor, and two diagnostics. Options considered:
`src/powershell/kiosk/` (beside the diagnostic modules — but these are Intune payloads, not
module functions), a new top-level `assets/recipes/06-walk-up-avd-kiosk/` (outside `docs/` so the
`.docx` conversion walk never touches them), or a separate scripts repository referenced by path.
Owner decision needed; the recipe currently names the files without a path.

### D. Deferred follow-ups captured from the pilot (not recipe content)

- Licensing / hardware standard for the kiosk class (MAK per-device Enterprise vs IoT Enterprise
  or clean-image hardware) — decides Shell Launcher return and retires the OEM-cleanup class.
- AVD host-pool Entra SSO (`enablerdsaadauth`) for single-prompt sign-in: Kerberos server object
  for hybrid session hosts, SP RDP config + `targetDeviceGroups`, CA review; `screen mode id:i:2`
  for full-screen sessions.
- Vendoring `andrew-s-taylor/public` De-Bloat (pin, review, re-sign) into the Kiosk Baseline.
- STORIS SCiX ClickOnce kiosk (tabled): per-user ClickOnce install must run in the kiosk account
  via a wrapper; EULA acceptance location untraced.

## Decisions locked this session (carry into requirements)

- Delivery mechanism for this device class is multi-app Assigned Access (custom OMA-URI, raw XML,
  autologon account, `rs5:AutoLaunch`) **until** activation is solved; Shell Launcher
  (`V2:AllAppsFullScreen`) returns when it is.
- Everything is device-context, Required, device-group; ESP blocks on exactly three apps
  (Windows App, endpoint agent, Kiosk Baseline). ConfigMgr client is never ESP-blocking.
- Never hide Fast User Switching on this class; LAPS at the console is the service entrance.
- Pattern lists are single-sourced in the shared `Remove-*` scripts and re-uploaded to both the
  remediation packages and the Baseline; stopping rule for extending them recorded in RE-237.
- All observed-behaviour claims in RE-237 are labelled as tenant/pilot observations, not Learn
  citations; the harness cannot validate them and the promotion review must not pretend it did.
