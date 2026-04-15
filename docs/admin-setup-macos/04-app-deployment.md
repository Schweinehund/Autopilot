---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS App Deployment

This guide covers deploying macOS applications through Intune using three methods: DMG, PKG (managed and unmanaged), and [VPP](../_glossary-macos.md#vpp)/Apps and Books.

## App Type Comparison Table

| Attribute | DMG | PKG (Managed LOB) | PKG (Unmanaged) | VPP/Apps and Books |
|-----------|-----|-------------------|-----------------|---------------------|
| Size limit | 8 GB | 2 GB | 8 GB | N/A (App Store) |
| Wrapping required | No | No (.pkg uploaded directly) | No | No |
| Detection rule | Bundle ID + version | Bundle ID + version | Bundle ID + version | App Store ID |
| Uninstall support | Yes (Required/Available/Uninstall) | Only when "Install as managed: Yes" (macOS 11+) | No (Known Issue) | Yes (Uninstall intent + license revoke) |
| Assignment types | Required, Available, Uninstall | Required, Available for enrolled, Uninstall* | Required, Available | Required, Available for enrolled |
| Delivery channel | IME agent | MDM (managed) or IME (unmanaged) | IME agent | MDM (Apple installs) |
| Agent requirement | Yes (macOS agent 2304.039+) | No (managed); Yes (unmanaged: 2308.006+) | Yes (2308.006+) | No |

*PKG managed LOB Uninstall: only when "Install as managed: Yes" AND macOS 11+, single app installing to `/Applications/`.

> **Note:** The `.intunemac` wrapping tool was removed in August 2022. All macOS app types are now uploaded directly without wrapping.

## Prerequisites

### DMG and PKG Prerequisites

- Intune Administrator role
- Devices enrolled via ADE
- Intune Management Extension (IME) agent installed on target devices (for DMG and unmanaged PKG)
- For PKG managed LOB: `.pkg` must be signed with "Developer ID Installer" certificate from Apple Developer account
- For PKG managed LOB: `.pkg` must contain a payload (packages without payload attempt to reinstall continuously)

### VPP/Apps and Books Prerequisites

- Apple Business Manager account with active VPP location token
- VPP location token uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)
- App licenses purchased in ABM for each app to deploy
- Annual token renewal configured (see Renewal / Maintenance section below)

## DMG Apps

#### In Intune admin center

1. Navigate to **Apps** > **macOS** > **Add** > **macOS app (DMG)**.
2. Select the .dmg app package file (max 8 GB).
3. Configure app information (name, description, publisher).
4. Configure the **Included apps** list: add the `.app` bundle(s) contained in the DMG. First app in list is used for reporting.
5. Configure detection rules: Bundle ID + build number from Included apps.
6. Configure assignments: Required, Available, or Uninstall.

> **What breaks if misconfigured:** Adding non-application files to the Included apps list causes Intune to report installation failure because listed items are not `.app` bundles installed to `/Applications/`. Symptom appears in: Intune admin center (app install status shows "Failed").
> See: [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md)

> **What breaks if misconfigured:** When using Uninstall assignment with `Ignore app version: No`, both bundle ID AND version must match the installed app for removal. Stale version deployments silently fail to uninstall. Symptom appears in: Intune admin center (uninstall status "Pending" indefinitely).
> See: [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md)

**Limitation:** App is NOT automatically removed from device on device retirement -- must be explicitly uninstalled first.

## PKG Apps (Managed LOB)

#### In Intune admin center

1. Navigate to **Apps** > **macOS** > **Add** > **macOS app (PKG)** (select "Line-of-business app").
2. Upload the `.pkg` file directly (max 2 GB). No `.intunemac` wrapping required.
3. Signing requirement: must be signed with "Developer ID Installer" certificate.
4. Configure "Install as managed" setting: set to **Yes** for macOS 11+ if Uninstall support is needed.
5. Configure Included apps for detection.
6. Assign to groups.

> **What breaks if misconfigured:** Using managed LOB for a PKG > 2 GB causes upload failure. Use unmanaged PKG type (8 GB limit) instead, but note that Uninstall assignment is not available for unmanaged PKG. Symptom appears in: Intune admin center (upload error).
> See: [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md)

> **What breaks if misconfigured:** PKG without payload (e.g., script-only packages) continuously reinstalls. Symptom appears in: Intune admin center (perpetual "Installing" status) and on device (repeated installation prompts).
> See: [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md)

## PKG Apps (Unmanaged)

#### In Intune admin center

1. Navigate to **Apps** > **macOS** > **Add** > **macOS app (PKG)** (Intune auto-detects based on signing).
2. Upload `.pkg` file directly (max 8 GB). Signed OR unsigned packages supported.
3. Agent requirement: IME version 2308.006+ required.
4. Pre/post-install scripts supported (agent 2309.007+ required).
5. Assign: Required or Available (no Uninstall -- Known Issue).

Supported scenarios beyond managed LOB: non-flat packages, component packages, unsigned packages, packages without payload, packages installing outside `/Applications/`, custom packages with scripts.

> **What breaks if misconfigured:** Uninstall assignment type is not available for unmanaged PKG (Known Issue in Intune). If uninstall is required, use DMG or managed LOB PKG type. Symptom appears in: Intune admin center (Uninstall option missing from assignment type dropdown).
> See: [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md)

## VPP / Apps and Books

#### In Apple Business Manager

1. Sign in to [Apple Business Manager](https://business.apple.com).
2. Navigate to **Apps and Books** (or legacy: Content).
3. Search for the app and purchase licenses (device licensing recommended -- no Apple ID sign-in required on device).
4. Confirm license quantity and location.

#### In Intune admin center

1. Navigate to **Tenant administration** > **Connectors and tokens** > **Apple VPP tokens**.
2. Verify the VPP location token is active and synced.
3. Navigate to **Apps** > **macOS** -- VPP apps appear automatically after sync.
4. Select the app > **Properties** > **Assignments**.
5. Assign as Required (device or user groups) or Available for enrolled devices (user groups only).

> **What breaks if misconfigured:** VPP app assigned as Available to a device group will not appear in Company Portal. Available deployment intent for VPP works only with user groups. Use Required for device groups. Symptom appears in: Intune admin center (assignment shows succeeded) but device (Company Portal does not list the app).
> See: [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md)

> **What breaks if misconfigured:** Revoking a VPP license without Uninstall intent leaves the app installed on the device. The revoked license remains usable for a 30-day grace period (Apple policy). To fully remove: assign with Uninstall intent, which removes the app AND revokes the license. Symptom appears in: ABM (license shows revoked) but device (app still installed and usable for up to 30 days).
> See: [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md)

## Verification

- [ ] DMG/PKG apps show "Installed" status in Intune admin center > Apps > [app] > Device install status
- [ ] VPP apps synced from ABM appear in Intune Apps > macOS
- [ ] VPP license count matches purchased quantity in ABM
- [ ] App visible in Company Portal on device (for Available assignments to user groups)
- [ ] Uninstall assignment removes app from target devices (DMG and managed PKG only)

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Non-app file in DMG Included apps list | Intune | Installation reported as failed | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| Managed PKG > 2 GB | Intune | Upload fails | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| PKG without payload (managed LOB) | Intune | Continuous reinstallation | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| VPP Available assigned to device group | Intune | App not visible in Company Portal | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| Uninstall on unmanaged PKG | Intune | Uninstall option not available (Known Issue) | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| VPP license revoked without Uninstall intent | ABM | App remains installed for 30-day grace period | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| Expired VPP token | Intune | VPP apps stop syncing; existing installs unaffected | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|---------------|---------------------|---------------|
| VPP location token | Annual (365 days) | VPP apps stop syncing from ABM; existing installs unaffected but no new assignments or license management | 1. In ABM: Preferences > Payments and Billing > Apps and Books > Content Tokens > Download. 2. In Intune: Tenant admin > Connectors and tokens > Apple VPP tokens > [token] > Edit > Upload new token |

Up to 3,000 VPP tokens supported per Intune tenant. One VPP token cannot be shared between Intune tenants.

## See Also

- [ABM Configuration](01-abm-configuration.md) -- ADE token setup (prerequisite for VPP)
- [Compliance Policies](05-compliance-policy.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [Win32 App Packaging (Windows)](../reference/win32-app-packaging.md) -- Windows equivalent
- [Capability Matrix](../reference/macos-capability-matrix.md) -- cross-platform app deployment comparison

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Resolved Phase 24 runbook links | -- |
| 2026-04-14 | Initial version -- DMG, PKG (managed/unmanaged), VPP with comparison table, per-type prerequisites, VPP renewal | -- |
