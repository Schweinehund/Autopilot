---
last_verified: 2026-05-01
review_by: 2026-06-30
applies_to: both
audience: L1
platform: all
---

> **Platform coverage:** This card covers Windows Autopilot (classic/APv1), Autopilot Device Preparation (APv2), macOS ADE, and iOS/iPadOS.
> Sections are labeled by platform/framework. See [APv1 vs APv2](apv1-vs-apv2.md) for Windows framework selection or [Windows vs macOS](windows-vs-macos.md) for cross-platform.

# L1 Quick-Reference Card

## Top 5 Checks

**Framework:** APv1 (classic)

1. **Device in portal?** — Intune > Devices > Windows > Enrollment > [Windows Autopilot](_glossary.md#autopilot) devices — search by serial number
2. **Profile assigned?** — Same portal page, Profile column shows "Assigned" (not blank or "Not assigned")
3. **Endpoints reachable?** — From device browser, navigate to `https://login.microsoftonline.com` — page loads without error
4. **[ESP](_glossary.md#esp) past expected time?** — Device phase: >30 min stuck. User phase: >60 min stuck.
5. **Error code on screen?** — Look up in [Error Code Index](error-codes/00-index.md)

## Escalation Triggers

- Serial confirmed correct, device not in portal → **Escalate L2** (collect: serial number, hardware hash screenshot, tenant ID)
- ESP stuck at same point after one restart AND over time threshold → **Escalate L2** (collect: error code if visible, screenshot, time elapsed)
- Error code not in lookup table or L1 action did not resolve → **Escalate L2** (collect: exact error code, screenshot)
- Device in correct group, profile still not assigned after 30 min → **Escalate L2** (collect: device serial, group name, expected profile name)
- Wrong profile assigned → **Escalate L2** (collect: current profile name, expected profile name)
- Cannot reach login.microsoftonline.com or Autopilot endpoints → **Escalate Infrastructure/Network** (NOT L2)
- OOBE fails a second time with same symptoms → **Escalate L2** (collect: exact error, screenshot, number of attempts)
- Blue screen or Windows recovery mode → **Escalate L2** (collect: stop code if visible, device model)

## Decision Trees

- [Initial Triage](decision-trees/00-initial-triage.md) — start here
- [ESP Failure](decision-trees/01-esp-failure.md)
- [Profile Assignment](decision-trees/02-profile-assignment.md)
- [TPM Attestation](decision-trees/03-tpm-attestation.md)

## Runbooks

- [Device Not Registered](l1-runbooks/01-device-not-registered.md)
- [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md)
- [Profile Not Assigned](l1-runbooks/03-profile-not-assigned.md)
- [Network Connectivity Failure](l1-runbooks/04-network-connectivity.md)
- [OOBE Fails Immediately](l1-runbooks/05-oobe-failure.md)
- [Error Code Index](error-codes/00-index.md)

---

## APv2 Quick Reference

**Framework:** APv2 (Device Preparation)

### Top 3 Checks

1. **Device Preparation experience appeared?** -- After OOBE sign-in, the deployment experience screen should launch automatically. If the desktop appeared instead, the device may not be targeted by a Device Preparation policy.
2. **Apps and scripts installing?** -- During the deployment experience, apps and scripts should show progress. If items show as "Failed" or "Skipped," check the Device Preparation policy configuration in Intune.
3. **Deployment report status?** -- Intune admin center > Devices > Monitor > Device preparation deployments -- check the device's deployment status for errors.

### APv2 Escalation Triggers

- Desktop appeared instead of deployment experience after OOBE sign-in --> **Escalate L2** (collect: device serial, Intune deployment report screenshot)
- ESP appeared instead of deployment experience --> **Check for APv1 registration conflict** using [APv1 Conflict runbook](l1-runbooks/08-apv2-apv1-conflict.md)
- Deployment experience timed out --> **Escalate L2** (collect: device serial, deployment report, time elapsed)
- Apps showing "Failed" or "Skipped" in deployment experience --> **Escalate L2** (collect: app names, deployment report screenshot)

### APv2 Decision Tree

- [APv2 Device Preparation Triage](decision-trees/04-apv2-triage.md) -- start here for APv2 failures

### APv2 Runbooks

- [Deployment Not Launched](l1-runbooks/06-apv2-deployment-not-launched.md)
- [Apps Not Installed](l1-runbooks/07-apv2-apps-not-installed.md)
- [APv1 Registration Conflict](l1-runbooks/08-apv2-apv1-conflict.md)
- [Deployment Timeout](l1-runbooks/09-apv2-deployment-timeout.md)

---

## macOS ADE Quick Reference

**Platform:** macOS ADE (Automated Device Enrollment)

### Top Checks

1. **Device in ABM?** -- Apple Business Manager > Devices -- search by serial number, verify MDM server assignment shows your Intune MDM server name
2. **Device in Intune?** -- Intune admin center > Devices > macOS -- search by serial number, check enrollment status
3. **Enrollment profile assigned?** -- Intune > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles -- verify profile is assigned to the device
4. **Compliance state?** -- Intune > Devices > macOS > [device] > Device compliance -- check for "Compliant" or review non-compliant settings

### macOS Escalation Triggers

- Serial in ABM but device not in Intune after 24 hours --> **Escalate L2** (collect: serial number, ABM MDM server assignment screenshot, Intune enrollment status)
- Setup Assistant stuck or authentication failure after one retry --> **Escalate L2** (collect: serial number, screenshot of error, macOS version)
- Configuration profile not applied after 4-hour sync wait and manual sync --> **Escalate L2** (collect: serial number, expected profile name, Intune device compliance screenshot)
- App showing "Failed" in Intune after reinstall attempt --> **Escalate L2** (collect: app name, app type, Intune app install status screenshot)
- Device non-compliant but user believes settings are correct --> **Escalate L2** (collect: non-compliant setting names, device serial)

### macOS Decision Tree

- [macOS ADE Triage](decision-trees/06-macos-triage.md) -- start here for macOS ADE failures

### macOS Runbooks

- [Device Not Appearing](l1-runbooks/10-macos-device-not-appearing.md)
- [Setup Assistant Failed](l1-runbooks/11-macos-setup-assistant-failed.md)
- [Profile Not Applied](l1-runbooks/12-macos-profile-not-applied.md)
- [App Not Installed](l1-runbooks/13-macos-app-not-installed.md)
- [Compliance / Access Blocked](l1-runbooks/14-macos-compliance-access-blocked.md)
- [Company Portal Sign-In](l1-runbooks/15-macos-company-portal-sign-in.md)

---

## iOS/iPadOS Quick Reference

**Platform:** iOS/iPadOS through Microsoft Intune

### Top Checks

1. **Device in ABM?** (ADE path) OR **User licensed for Intune?** (BYOD path) -- ABM [business.apple.com] > Devices (verify serial + MDM server assignment) | Entra admin center > Users > [user] > Licenses (verify Intune license)
2. **Device in Intune?** -- Intune admin center > Devices > iOS/iPadOS -- search by serial number, check enrollment state
3. **Enrollment profile assigned?** (ADE path only) -- Intune admin center > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles -- verify profile assigned to device serial
4. **Compliance state?** -- Intune admin center > Devices > [device] > Device compliance -- check "Compliant" vs "Non-compliant" and review non-compliant settings

### iOS Escalation Triggers

- Serial in ABM but device not in Intune after 24 hours --> **Escalate L2** (collect: serial number, ABM MDM server assignment screenshot, enrollment token profile assignment screenshot)
- Setup Assistant stuck or authentication failure after one retry --> **Escalate L2** (collect: serial number, screenshot of error, iOS version, enrollment token)
- Enrollment blocked by enrollment restriction and restriction configuration does not obviously apply --> **Escalate L2** (collect: serial number, user UPN, enrollment restriction screenshot, error message)
- User license verified in Entra but enrollment reports "license invalid" after 24-hour sync --> **Escalate L2** (collect: user UPN, license screenshot, timestamped enrollment attempt)
- Device marked compliant in Intune but Conditional Access still blocks Microsoft 365 access --> **Escalate L2** (collect: user UPN, device ID, compliance screenshot, CA sign-in log timestamp)

### iOS Decision Tree

- [iOS Triage Decision Tree](decision-trees/07-ios-triage.md) -- start here for iOS/iPadOS failures

### iOS Runbooks

- [iOS APNs Certificate Expired](l1-runbooks/16-ios-apns-expired.md) -- cross-platform blast radius; all iOS/iPadOS + macOS MDM communication affected
- [iOS ADE Not Starting](l1-runbooks/17-ios-ade-not-starting.md) -- three failure signatures
- [iOS Enrollment Restriction Blocking](l1-runbooks/18-ios-enrollment-restriction-blocking.md) -- reciprocal with Device Cap Reached
- [iOS License Invalid](l1-runbooks/19-ios-license-invalid.md) -- dual manifestation at enrollment
- [iOS Device Cap Reached](l1-runbooks/20-ios-device-cap-reached.md) -- user or group cap exceeded
- [iOS Compliance Blocked](l1-runbooks/21-ios-compliance-blocked.md) -- multi-cause A/B/C with user action

## Android Enterprise Quick Reference

**Platform:** Android Enterprise through Microsoft Intune

### Top Checks

1. **[All GMS]** Device visible in Intune? -- Intune admin center > Devices > Android -- search by serial number, check enrollment state
2. **[BYOD]** Work profile / briefcase badge present on device? -- User-side check; if briefcase missing on a BYOD-mode device, work profile creation failed (route to runbook 23)
3. **[ZTE/Knox]** Serial in Zero-Touch portal or Knox Mobile Enrollment portal? -- Admin-only check; L1 escalates to admin if portal access required
4. **[All GMS]** Compliance state in Intune device blade? -- Devices > [device] > Device compliance -- Compliant vs Non-compliant + non-compliant settings (incl. Play Integrity verdict)
5. **[AOSP]** OEM identifier captured? -- RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest -- different enrollment paths per OEM (route to runbook 29)

### Android Escalation Triggers

- **[ZTE]** Device serial in Zero-Touch portal but not in Intune after 24 hours --> **Escalate L2** (collect: serial, ZTE assignment screenshot, Knox-check-if-applicable)
- **[Knox]** Samsung KME-provisioned device booted to consumer setup or never arrived in Intune --> **Escalate L2** (collect: serial, Knox portal screenshot, Samsung model + OS version)
- **[BYOD]** Work profile creation never started after enrollment completed in Company Portal --> **Escalate L2** (collect: user UPN, device serial, Company Portal screenshot, Android version)
- **[All GMS]** Device marked compliant in Intune but Conditional Access still blocks Microsoft 365 access --> **Escalate L2** (collect: user UPN, device ID, Play Integrity verdict, CA sign-in log timestamp)
- **[AOSP]** AOSP device enrollment fails on a specific OEM (RealWear / Zebra / Pico / HTC / Meta Quest) and per-OEM checklist exhausted --> **Escalate L2** (collect: OEM identifier, device serial, enrollment-token configuration screenshot)

### Android Decision Tree

- [Android Triage Decision Tree](decision-trees/08-android-triage.md) -- start here for Android Enterprise failures (mode-first per Phase 40 D-01)

### Android Runbooks

- **[All GMS]** [Android Enrollment Blocked](l1-runbooks/22-android-enrollment-blocked.md) -- enrollment restriction or "device cannot enroll" error across all GMS modes
- **[BYOD]** [Android Work Profile Not Created](l1-runbooks/23-android-work-profile-not-created.md) -- BYOD work profile container never created
- **[All GMS]** [Android Device Not Enrolled](l1-runbooks/24-android-device-not-enrolled.md) -- device never appeared in Intune (no restriction error visible)
- **[All GMS]** [Android Compliance Blocked](l1-runbooks/25-android-compliance-blocked.md) -- non-compliant or CA blocking M365; multi-cause incl. Play Integrity verdict change
- **[All GMS]** [Android MGP App Not Installed](l1-runbooks/26-android-mgp-app-not-installed.md) -- Managed Google Play app not delivered to device
- **[ZTE]** [Android ZTE Enrollment Failed](l1-runbooks/27-android-zte-enrollment-failed.md) -- Zero-Touch Enrollment did not initiate or stalled
- **[Knox]** [Android Knox Enrollment Failed](l1-runbooks/28-android-knox-enrollment-failed.md) -- Samsung KME provisioning failed (consumer setup loop or never arrived)
- **[AOSP]** [Android AOSP Enrollment Failed](l1-runbooks/29-android-aosp-enrollment-failed.md) -- AOSP enrollment did not initiate across 5 OEMs (RealWear / Zebra / Pico / HTC / Meta Quest)

---

## Linux Quick Reference

**Platform:** Linux (Ubuntu 22.04 / 24.04 LTS) through Microsoft Intune

### Top Checks

1. Device visible in Intune? -- Intune admin center > Devices > Linux -- search by serial; check enrollment state
2. Compliance state? -- Devices > [device] > Device compliance -- Compliant vs Non-compliant + non-compliant categories (Allowed Distributions / Custom Compliance / Device Encryption / Password Policy)
3. `intune-portal` package installed? -- `dpkg -l intune-portal` returns `ii` status (status indicator `ii` = installed + configured)
4. `intune-agent.timer` running? -- `systemctl --user list-timers intune-agent.timer` shows recent activation timestamp

### Linux Escalation Triggers

- Enrollment timeout > 30 minutes after `intune-portal` sign-in --> **Escalate L2** (collect: `journalctl -u intune-agent`, `/var/log/dpkg.log`, `/var/log/intune-update.log`)
- Compliance category failure persists across 2+ evaluation cycles --> **Escalate L2** (collect: full compliance evaluation output + Bash discovery script logs)
- Conditional access blocking Microsoft Edge sign-in despite device showing as compliant in Intune --> **Escalate L2** (cause-A: stale CA evaluation; cause-B: web-app CA mode mis-scoped; reference admin-setup-linux/05-conditional-access.md)
- Intune agent service crash-loop on systemd restart --> **Escalate L2** (collect: `systemctl status intune-agent`, `journalctl --user -u intune-agent`)
- Identity Broker `intune-portal` 2.0.2+ Java-to-broker breaking change re-enrollment loop --> **Escalate L2** (Phase 50 LIN-05 known pitfall; verify post-update CA assignments / filters / Entra group memberships)

### Linux Decision Tree

- [Linux Triage Decision Tree](decision-trees/09-linux-triage.md) -- start here for Linux Intune failures

### Linux Runbooks

- [Linux Enrollment Failed](l1-runbooks/30-linux-enrollment-failed.md) -- package install error / sign-in failure / enrollment timeout
- [Linux Device Non-Compliant](l1-runbooks/31-linux-compliance-non-compliant.md) -- distro/version out of range / disk not encrypted / password policy not met / custom compliance failure
- [Linux Conditional Access Blocking Web Access](l1-runbooks/32-linux-ca-blocking-web-access.md) -- device not enrolled / device not compliant / Edge not signed in
- [Linux Intune Agent Service Failure](l1-runbooks/33-linux-agent-service-failure.md) -- `intune-agent` service not running / timer not firing

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-01 | Phase 59 (CLEAN-08): added Linux Quick Reference H2 (4-part substructure: Top Checks 4 items / Linux Escalation Triggers / Linux Decision Tree single link / Linux Runbooks 4-link list) matching iOS quick-ref non-mode-tag pattern; D-25 mode-tag-free contract | -- |
| 2026-04-30 | Phase 57: added Android Enterprise Quick Reference H2 (4-part substructure: Top Checks 5 / Escalation Triggers 5 / Decision Tree 1 / Runbooks 8) with inline [Mode] prefix tags per row (mode-first per v1.4 triage tree); Mode vocabulary [BYOD]/[ZTE]/[AOSP]/[Knox]/[All GMS] LOCKED verbatim from L1-index Mode column (CLEAN-03; DEFER-07 close) | -- |
| 2026-04-17 | Phase 32: added iOS/iPadOS Quick Reference section with 4 top checks, 5 escalation triggers, decision tree link, and 6 runbook links (16-21) | -- |
| 2026-04-15 | Added macOS ADE Quick Reference section with top checks, escalation triggers, and runbook links | -- |
| 2026-04-13 | Added APv2 quick-reference section | -- |
| 2026-03-23 | Initial version | — |
