---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers migration from MDT and SCCM/ConfigMgr imaging to Windows Autopilot (APv1 or APv2). Both Autopilot frameworks are valid targets. For APv1 vs APv2 selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# On-Premises Imaging to Autopilot Migration Guide

Organizations running MDT task sequences or SCCM/ConfigMgr OSD can migrate to Windows Autopilot. This guide covers the migration paths, app packaging workflow, and parallel operation model to avoid service disruption during transition.

## MDT Retirement Notice

> **Admin Note:** Microsoft Deployment Toolkit (MDT) receives no further updates, fixes, or support after the first ConfigMgr release following October 2025. Downloads have been removed from official channels. MDT-based task sequences must be replaced. There is no extended support timeline. If your organization still uses MDT, plan the transition now.

## Migration Prerequisites

### Source Environment

- Complete inventory of task sequence applications (name, version, installer type: MSI/EXE/custom script)
- Documented task sequence customizations (scripts, driver injection steps, OS settings, join behavior)
- SCCM client version documented if SCCM OSD is the source — required for the "Autopilot for Existing Devices" scenario
- GPO baseline exported as XML from GPMC.msc before migration — feeds the [GPO-to-Intune migration](gpo-to-intune.md) process

### Target Environment

- Intune tenant configured with Autopilot per [Admin Setup Overview](../admin-setup-apv1/00-overview.md)
- Win32 Content Prep Tool downloaded from [Microsoft/Microsoft-Win32-Content-Prep-Tool on GitHub](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool)
- App inventory cross-referenced against apps already deployed in Intune (avoid duplicates)

## Migration Paths

| Source | Target | Method | Notes |
|--------|--------|--------|-------|
| MDT task sequence | Autopilot user-driven (APv1 or APv2) | Package TS apps as Intune Win32 apps; wipe devices to clean Windows | Most common migration path; requires app-by-app packaging effort |
| MDT task sequence | ConfigMgr OSD | Direct evolution of MDT; task sequence migrates to SCCM | Only if organization has existing ConfigMgr site investment |
| SCCM OSD | Autopilot for Existing Devices | Create JSON profile; embed in SCCM task sequence; runs Autopilot on existing hardware | JSON supports user-driven Entra join and hybrid Entra join ONLY. Self-deploying and pre-provisioning are NOT supported via JSON |
| Manual imaging (USB/WDS) | Autopilot | Collect hardware hash during imaging; wipe to clean state; register in Intune | For small environments without MDT/SCCM infrastructure |

## Steps: App Packaging Migration

For each application in the task sequence inventory, follow these steps.

### Step 1: Identify installer format

Determine the installer type for each application:

- **MSI** — Windows Installer package (`.msi`). Detection rule can use Product Code (auto-detected by Intune).
- **EXE** — Executable installer with silent switch. Requires manual detection rule (file version or registry key).
- **Custom script** — PowerShell or batch installer. Requires PowerShell detection script.

### Step 2: Package as Win32 (.intunewin) using the Win32 Content Prep Tool

1. Create a source folder containing the installer and any supporting files.
2. Open a command prompt and run:
   ```
   IntuneWinAppUtil.exe -c <source_folder> -s <setup_file> -o <output_folder>
   ```
   Example: `IntuneWinAppUtil.exe -c C:\Apps\7zip -s 7z2301-x64.msi -o C:\IntuneApps`
3. The tool creates a `.intunewin` file in the output folder.
4. Upload to **Intune admin center** > Apps > Windows > Add > Windows app (Win32).
5. Upload the `.intunewin` file and complete the app metadata form.

### Step 3: Set detection rule

Configure how Intune determines whether the app is installed:

- **MSI**: Use **MSI product code** — auto-populated from the `.intunewin` file metadata. Preferred for MSI apps.
- **EXE**: Use **File version check** — specify the executable path and minimum version. More reliable than registry when installers update the executable.
- **Custom script**: Use **PowerShell detection script** — script must exit 0 (detected) or non-zero (not detected) and optionally write to stdout.

See [Win32 App Packaging Best Practices](win32-app-packaging.md) for detection rule priority and common pitfalls.

### Step 4: Configure assignment

- **Required** — App is tracked by ESP and must install before the user reaches the desktop. Use for critical apps.
- **Available** — App appears in Company Portal but does not block enrollment. Use for optional apps.

> **What breaks if sequenced incorrectly:** Too many Required apps causes ESP timeouts. Move non-critical apps to Available assignment to keep the Required app count low. See [ESP Timeout Tuning](esp-timeout-tuning.md) for timeout thresholds by scenario.

### Step 5: Declare dependencies if install order matters

If App B requires App A to be installed first (runtime, framework, base component):

1. Open App B in Intune admin center > Apps > Windows.
2. Under **Dependencies**, add App A.
3. Set **Automatically install** to Yes.

> **What breaks if sequenced incorrectly:** App requires .NET Framework runtime. Runtime is not declared as a dependency. App installs before the runtime. App install fails. ESP retries the app install until the timeout is reached. The device fails enrollment with a generic app install error. Always declare runtime dependencies explicitly.

## Autopilot for Existing Devices (SCCM Path)

For organizations with existing SCCM infrastructure that want to use Autopilot without replacing every device:

**JSON profile location on device:**
```
%windir%\provisioning\autopilot\AutoPilotConfigurationFile.json
```

**JSON profile limitations (important):**
- JSON supports: user-driven Entra join, user-driven hybrid Entra join
- JSON does NOT support: self-deploying mode, pre-provisioning (white glove)
- The task sequence MUST include a full device wipe — Autopilot for Existing Devices does not work on upgrade-in-place

**SCCM task sequence steps:**
1. Download the JSON profile from Intune (Intune admin center > Devices > Windows enrollment > Deployment profiles > Export profile).
2. Create a package in SCCM containing the JSON file.
3. In the task sequence, add a step to copy the JSON file to `%windir%\provisioning\autopilot\` before the OS reboot.
4. The task sequence wipes the OS partition, installs a clean Windows image, and the device boots into OOBE where Autopilot applies the JSON profile.

> **What breaks if sequenced incorrectly:** JSON file placed after the OS partition is wiped. File is lost. Device boots to OOBE without Autopilot profile. User sees a generic Windows OOBE, not an Autopilot-branded experience. The device enrolls as a standard non-Autopilot device if the user completes OOBE manually.

## Rollback/Recovery

Maintain imaging infrastructure in parallel during migration. Do not decommission MDT or SCCM until Autopilot is validated for all device categories.

**Parallel operation model:**
- Keep at least one task sequence operational as an emergency fallback for 90 days post-migration
- If Autopilot fails for a device category, fall back to imaging for that category
- Decommission MDT/SCCM only after all device categories have been validated on Autopilot

**Per-device rollback (if Autopilot fails during migration):**
1. Re-image the device using the task sequence fallback.
2. Diagnose the Autopilot failure before re-attempting migration.
3. Common causes: missing app packaging, incorrect detection rule, dependency order issue.

## Verification

- [ ] Pilot devices complete Autopilot enrollment and reach the desktop
- [ ] All Required apps install during ESP
- [ ] Detection rules correctly report apps as installed (no re-install loops)
- [ ] Dependencies install in correct order
- [ ] MDT/SCCM task sequence is still operational as fallback (test quarterly during transition)

## Configuration-Caused Failures

| Misconfiguration | Symptom | Resolution |
|------------------|---------|------------|
| EXE app missing silent install switch | App launches UI during ESP; enrollment hangs waiting for user input | Add `/S`, `/quiet`, or vendor-specific silent switch to install command |
| Detection rule points to wrong path | App shows as Not Installed after successful install; ESP retries indefinitely | Verify detection path in a test VM before deploying |
| Dependency not declared | App fails to install; ESP timeout | Add runtime/framework as dependency with auto-install enabled |
| More than 25 Required apps (APv2) | APv2 deployment policy ignores apps beyond 25 limit | Reduce to 25 Required apps maximum; move remainder to Available |
| JSON file missing from SCCM task sequence | Device completes SCCM task sequence but enrolls as non-Autopilot | Verify JSON copy step runs before OS reboot in task sequence |
| Autopilot for Existing Devices with self-deploy JSON | Enrollment fails; self-deploying mode not supported via JSON profile | Use user-driven mode for Autopilot for Existing Devices; self-deploying requires direct APv1 hash registration |

## See Also

- [Win32 App Packaging Best Practices](win32-app-packaging.md)
- [ESP Timeout Tuning](esp-timeout-tuning.md)
- [APv1-to-APv2 Migration Playbook](apv1-apv2-migration.md)
- [GPO-to-Intune Migration Guide](gpo-to-intune.md)
- [Admin Setup Overview](../admin-setup-apv1/00-overview.md)
