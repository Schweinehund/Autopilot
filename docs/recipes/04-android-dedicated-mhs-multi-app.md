---
doc_id: RE-225
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Android
last_verified: 2026-08-03
review_by: 2026-11-01
applies_to: Android Enterprise Dedicated multi-app kiosk (Managed Home Screen curated app allow-list, delivered by an Intune App Configuration policy assigned to com.microsoft.launcher.enterprise)
audience: admin
---

**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-225 · **Status:** Approved

# Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning

## Summary

Following this recipe yields an Android Enterprise Dedicated device locked to a curated Managed Home Screen (MHS) multi-app kiosk — a bounded allow-list of apps on a fixed home-screen grid, delivered by an Intune App Configuration policy assigned to the Managed Home Screen app (`com.microsoft.launcher.enterprise`). It covers Android 8.0 and later on devices already enrolled with a Standard Corporate-owned dedicated device token, and requires the Intune Administrator role to assign the Managed Home Screen app as Required and to author and assign the MHS App Configuration policy carrying the worked JSON payload.

> **Scope:** Covers the Android Enterprise **Dedicated** multi-app kiosk scenario — a curated Managed Home Screen (MHS) app grid on a device with no per-user identity by default.

> See [Android dedicated device disambiguation](../_glossary-android.md#dedicated).

> This is distinct from single-app Lock Task Mode, digital signage, and Entra shared device mode — all four scenarios share one enrollment surface but diverge in locking style and identity model.

> Assumes the device is already enrolled as Dedicated with a Standard token, and that every allow-listed app already exists as an Intune app.

> Also assumes the static Entra device group naming the fleet already exists.

## Prerequisites

- **This recipe is NOT:** Entra shared device mode ([per-user Entra sign-in and sign-out on a shared device](../_glossary-android.md#entra-shared-device-mode) — a different enrollment token type), single-app kiosk / Lock Task Mode (one app pinned via Android's OS-level lock rather than a curated MHS grid — see [Scenarios](../admin-setup-android/05-dedicated-devices.md#scenarios)), digital signage / screensaver mode (unattended-display use, deferred — see [Scenarios](../admin-setup-android/05-dedicated-devices.md#scenarios)), or Windows multi-app kiosk (a different platform's restricted-user-experience recipe).
- **Managed Google Play binding complete** — see [Managed Google Play binding](../admin-setup-android/01-managed-google-play.md#bind-mgp). This recipe does not re-bind it.
- **A static Entra device group** already exists and is the single target for both the Managed Home Screen app assignment ([Step 2](#step-2-deploy-managed-home-screen-as-a-required-app)) and the App Configuration policy assignment ([Step 5](#step-5-author-and-assign-the-app-configuration-policy)) — see [Enrollment profile — Delta 2](../admin-setup-android/05-dedicated-devices.md#enrollment-profile).
- **A device already enrolled as Dedicated with a Standard token.** This recipe starts post-enrollment; enrollment profile creation and token-type semantics are the anchor's own content — see [Enrollment profile](../admin-setup-android/05-dedicated-devices.md#enrollment-profile) and [Enrollment token](../admin-setup-android/05-dedicated-devices.md#enrollment-token).
- **Intune Administrator role**, or a custom RBAC role covering app assignment and app-configuration-policy authoring.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---|---|---|
| Setting `enable_mhs_signin = TRUE` and leaving `signin_type` at its default | `signin_type` defaults to Microsoft Entra ID, so an admin who turns sign-in on and changes nothing else lands on the Entra-ID path. The real first-party negative is scoped to account type, not to enrollment mode: users who sign in with a non-Microsoft Entra ID account don't get single sign-on to apps integrated with Microsoft Entra shared device mode, but they still sign in to Managed Home Screen | Ship `enable_mhs_signin: false` as the worked value — the documented default, matching the no-per-user-identity Standard token — and route true per-worker single sign-on to Entra shared device mode |
| Exposing system navigation (the Home and Overview buttons, or the status bar) for a friendlier feel | If Device Restrictions' Enabled System Navigation Features includes Home and Overview, or System notifications and information is shown, end users can skip the Managed Home Screen sign-in screen and the session-PIN screen entirely — bypassing the sign-in gate this recipe configures | Keep system navigation fully restricted, the default Dedicated posture, whenever sign-in or session-PIN protection is meant to be enforced |
| Setting Device Restrictions' Notification windows to Disable as a blanket hardening move | Notification windows breaks screensaver, virtual home button, or automatic sign-out if you later enable any of them — none of which is set by this recipe, so zero dependents exist among the settings this recipe sets today, but the dependency is silent and worth naming before it surfaces later | Leave Notification windows enabled once screensaver, virtual home button, or automatic sign-out is configured; document the dependency rather than discovering it after the fact |
| Expecting per-signed-in-identity personalization (different app sets per user) on this Standard-token, sign-in-disabled device | There is no distinguishing identity at the device layer when `enable_mhs_signin` is FALSE — every user of the device sees the identical shared configuration | If per-role differentiation is required, route to Entra shared device mode — a routing signal, not a worked path in this recipe |
| Assuming end users can toggle Wi-Fi on and off from the MHS settings menu | Users can switch between already-visible networks but cannot enable or disable the Wi-Fi radio itself | Manage Wi-Fi radio state via device policy, not end-user MHS interaction |
| Assuming end users can initiate a first-time connection to an Intune-preconfigured Enterprise Wi-Fi network from inside MHS | The device can use a preconfigured Enterprise network automatically, but end users cannot manually initiate that connection from within MHS itself | Preconfigure the Enterprise network and let the device connect automatically; do not rely on end-user-initiated connection from MHS |
| Expecting end users to reorder, rename, or move folders or apps on the Managed Home Screen | `lock_home_screen` defaults to TRUE, and end users can't move folders, rename the folders, or move the apps within the folders | If reordering is required, set it at the admin/policy layer via `managed_folders`, not through end-user drag-and-drop |
| Configuring Zero-Touch and [Knox Mobile Enrollment (KME)](../admin-setup-android/05-dedicated-devices.md#provisioning-method-choice) simultaneously on Samsung hardware | A CRITICAL-severity mutual exclusion documented in the anchor — configuring both causes out-of-sync enrollment state on Samsung hardware | Pick one provisioning method per Samsung device — see [Provisioning method choice](../admin-setup-android/05-dedicated-devices.md#provisioning-method-choice) |
| Treating digital signage or single-app kiosk guidance as applicable to this recipe | Out of this recipe's scope by design — multi-app only. Digital signage and single-app kiosk use different locking mechanisms (screensaver mode; Lock Task Mode without MHS, respectively) | See [Scenarios](../admin-setup-android/05-dedicated-devices.md#scenarios) — cross-link, don't re-author |

## Steps

### Step 1: Confirm the token type on the enrollment profile

Confirm that the enrollment profile which provisioned this device uses the Standard Corporate-owned dedicated device token. If it uses the Corporate-owned dedicated device with Microsoft Entra ID shared mode token instead, this recipe is not the path — this step confirms and routes only; token-type creation and semantics are the anchor's own content.

> **Ask the admin:** Does this device need per-user Entra sign-in and sign-out, or does it run under a single shared device identity?

| Option | When to choose | Consequence if wrong | Branch |
|---|---|---|---|
| Standard ("Corporate-owned dedicated device (default)") | The device runs a shared, no-per-user-identity multi-app kiosk | No per-user Entra sign-in or sign-out is available on this device | Worked here — continue to [Step 2](#step-2-deploy-managed-home-screen-as-a-required-app) |
| Corporate-owned dedicated device with Microsoft Entra ID shared mode | Multi-shift workers need to sign in and out with their own Entra account | The token-type choice is irreversible within the enrollment profile: revoke the token, recreate the enrollment profile, and redistribute the new QR or enrollment artifact to every field site. `[MEDIUM: MS Learn setup dedicated, last_verified 2026-08-03]` | Not worked here — see [Scenarios](../admin-setup-android/05-dedicated-devices.md#scenarios) and [Enrollment profile — Delta 1](../admin-setup-android/05-dedicated-devices.md#enrollment-profile) |

> **Ask the admin:** Which provisioning method will field technicians use to enroll this device?

| Option | When to choose | Recorded as |
|---|---|---|
| QR code | Field techs can scan a printed or displayed code at factory-reset setup | QR payload |
| NFC | Devices support NFC tap-to-provision and the payload fits the tag's byte limit | NFC tag |
| `afw#setup` | A technician types the DPC identifier manually at the Google sign-in prompt | DPC identifier |
| Zero-Touch | Devices are pre-registered with a reseller for zero-touch provisioning at unboxing | Zero-Touch DPC extras JSON |

Configuring Zero-Touch and [Knox Mobile Enrollment (KME)](../admin-setup-android/05-dedicated-devices.md#provisioning-method-choice) simultaneously on the same Samsung hardware is a CRITICAL-severity mutual exclusion — pick one provisioning method per Samsung device; see [Provisioning method choice](../admin-setup-android/05-dedicated-devices.md#provisioning-method-choice) for every method's own click-path and constraints.

> **What breaks if misconfigured:** Confirming the wrong token type routes this whole recipe to the wrong scenario before any MHS configuration is authored.

Recovery is the anchor's own — revoke the token, recreate the enrollment profile with the correct token type, and redistribute the enrollment artifact. See [Enrollment profile](../admin-setup-android/05-dedicated-devices.md#enrollment-profile).

### Step 2: Deploy Managed Home Screen as a Required app

Managed Home Screen (`com.microsoft.launcher.enterprise`) is already present in **Apps** > **All apps** the moment the tenant binds to Managed Google Play — there is no Create or Add step. `[MEDIUM: MS Learn setup dedicated + add-managed-google-play, last_verified 2026-08-03]`

1. **Apps** > **All apps**.
2. Select **Managed Home Screen** from the list.
3. Select **Properties**.
4. Select **Edit** next to **Assignments**.
5. On the **Assignments** tab, under **Required**, select **Add group**.
6. Select the static Entra device group from [Prerequisites](#prerequisites), then **Select**.

> **What breaks if misconfigured:** A Required assignment boots the device directly into Managed Home Screen before an exit PIN exists on either policy surface.

Devices already enrolled and in the target group when this step lands boot straight into the no-PIN state. Until the exit PIN is set in [Step 6](#step-6-set-the-exit-kiosk-pin-and-harden-exit-retries), attempting to exit shows "A PIN to exit kiosk mode has not been set by your IT admin" with no way out. Complete Steps 3-6 promptly, and force a policy sync from the Intune admin center rather than waiting the typical 8-hour window — see [Exit-kiosk PIN synchronization](../admin-setup-android/05-dedicated-devices.md#exit-kiosk-pin-synchronization).

### Step 3: Deploy the allow-listed apps

Every app that will appear on the MHS grid must already be installed on the device — on Dedicated devices, only apps assigned Required actually install.

1. **Apps** > **All apps**.
2. Select each allow-listed app.
3. Select **Properties** > **Edit** next to **Assignments**.
4. On the **Assignments** tab, under **Required**, select **Add group** and select the same static Entra device group used in [Step 2](#step-2-deploy-managed-home-screen-as-a-required-app).

> **What breaks if misconfigured:** An app assigned Available, or to the wrong group, is absent from the device — and therefore the MHS grid — with no error surfaced.

> See: [L2: Android App Install Investigation](../l2-runbooks/20-android-app-install-investigation.md) — covers an MGP or LOB app showing Failed, Not installed, or Pending.

### Step 4: Choose the sign-in mode

This is its own step, immediately before the payload step, which physically separates the sign-in decision from [Step 6](#step-6-set-the-exit-kiosk-pin-and-harden-exit-retries)'s exit-retry hardening.

> **Ask the admin:** Should end users sign in to Managed Home Screen, and if so, with which identity type?

| Option | When to choose | Recorded as |
|---|---|---|
| `enable_mhs_signin: false` | The device presents one shared curated grid to anyone — the documented default, matching the no-per-user-identity Standard token | Worked here — continue to [Step 5](#step-5-author-and-assign-the-app-configuration-policy) |
| `enable_mhs_signin: true`, `signin_type: Other` | Individual-session accountability (who used the device, session PIN, automatic sign-out) is needed without the Entra shared-device-mode token | `signin_type: Other` |
| `enable_mhs_signin: true`, `signin_type: Microsoft Entra ID` (also the field's own default once sign-in is turned on) | Users should sign in with their Entra account. Users who sign in with a non-Microsoft Entra ID account don't get single sign-on to apps integrated with Microsoft Entra shared device mode, but they still sign in to Managed Home Screen | `signin_type: AAD` |

When `enable_mhs_signin` is TRUE, two further decision points become meaningful and are not worked here: offline/no-network app access and pre-sign-in app availability (scoped per app inside `applications`), and session PIN complexity. Both are free-value choices made at author time against the live tenant.

> **What breaks if misconfigured:** Choosing `signin_type: Microsoft Entra ID` without confirming Entra licensing for every worker adds friction, not a broken sign-in.

`enable_mhs_signin` stays FALSE unless a specific accountability need justifies turning it on — flipping it with no plan for `signin_type` lands users on the Entra-ID default by surprise.

### Step 5: Author and assign the App Configuration policy

Declined from the payload below, each for a stated reason: the screensaver keys (deferred, RCPFUT-04); the widgets, wallpaper and branding keys (deferred, RCPFUT-05); the cosmetic ordering and icon keys — `app_orders`, `app_order_enabled`, `icon_size`, `app_folder_icon`, `screen_orientation` (out of scope; an anti-feature "Do this instead" cell may still name `Application order enabled` at the admin/policy layer); the virtual home button (declined — it was a Case-2 candidate and stays out of this recipe's bounded key set); and `enable_app_offline` plus `app_available_prior_to_sign_in`, the two `applications` sub-keys that are only meaningful when sign-in is TRUE and are therefore inert here — a named carve-out from the general rule that sign-in sub-keys are out, since `app_available_prior_to_sign_in` sits inside `applications`, a key that is in. Also declined: the OEMConfig Overlay and exact-alarm permission grant, because every dependent feature — screensaver, virtual home button, automatic sign-out, notification badges, auto-relaunch — is itself deferred or scoped to a non-worked sign-in arm.

1. **Apps** > **Configuration** > **Create** > **Managed devices**.
2. **Basics:** enter a **Name** and **Description** (**Device enrollment type** is fixed to **Managed devices**).
3. **Platform:** select **Android Enterprise**.
4. **Targeted app:** select **Select app** > choose **Managed Home Screen** > **OK**.
5. Select **Next** to reach **Settings**.
6. **Configuration settings format:** select **Enter JSON data** and paste the payload below. The equivalent UI path is the **Configuration designer**, which exposes the same settings as individual fields.
7. Select **Next** through **Scope tags**.
8. On **Assignments**, set **Assign to** to **Add groups** and select the static Entra device group from [Prerequisites](#prerequisites) — a separate Intune blade from [Step 2](#step-2-deploy-managed-home-screen-as-a-required-app)'s app assignment, and the action that makes the payload below take effect.
9. Select **Next** to **Review + create**, then select **Create**.

`[MEDIUM: MS Learn app-configuration-policies-use-android, last_verified 2026-08-03]` This article's own introductory prose says user groups, while its wizard's **Assign to** dropdown also offers **Add groups** and **Add all devices** — do not let the stale introductory phrasing narrow this instruction; verify against your own tenant at author time.

Paste the JSON below into the **Enter JSON data** editor.

```json
{
    "kind": "androidenterprise#managedConfiguration",
    "productId": "app:com.microsoft.launcher.enterprise",
    "managedProperty": [
        {
            "key": "lock_home_screen",
            "valueBool": true
        },
        {
            "key": "grid_size",
            "valueString": "4;5"
        },
        {
            "key": "applications",
            "valueBundleArray": [
                {
                    "managedProperty": [
                        {
                            "key": "package",
                            "valueString": "com.contoso.warehousescanner"
                        }
                    ]
                }
            ]
        },
        {
            "key": "managed_folders",
            "valueBundleArray": [
                {
                    "managedProperty": [
                        {
                            "key": "folder_name",
                            "valueString": "Store Apps"
                        },
                        {
                            "key": "applications",
                            "valueBundleArray": [
                                {
                                    "managedProperty": [
                                        {
                                            "key": "package",
                                            "valueString": "com.contoso.warehousescanner"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "key": "exit_lock_task_mode_code",
            "valueString": "PLACEHOLDER-SET-PER-TENANT"
        },
        {
            "key": "max_number_of_attempts_for_exit_PIN",
            "valueInteger": 5
        },
        {
            "key": "amount_of_time_before_try_exit_PIN_again",
            "valueInteger": 300
        },
        {
            "key": "enable_mhs_signin",
            "valueBool": false
        }
    ]
}
```

> **[MEDIUM: MS Learn, last_verified 2026-08-03]:** Microsoft's field description states this password "must be configured through a device configuration profile."

Set the matching value in the Device Restrictions profile too, per [Exit-kiosk PIN synchronization](../admin-setup-android/05-dedicated-devices.md#exit-kiosk-pin-synchronization) — do not rely on this JSON entry alone.

| # | Setting / JSON key | Configuration designer label | What it does | Worked value |
|---|---|---|---|---|
| 1 | `lock_home_screen` | Lock Home Screen | Prevents end users from rearranging or removing apps and folders on the grid | `true` |
| 2 | `grid_size` | Set Grid Size | Sets the number of columns and rows in `columns;rows` format; defaults to Auto | `"4;5"` |
| 3 | `applications` | Set allow-listed applications | Defines the apps visible on the home screen, from among the apps already installed on the device | one app (`com.contoso.warehousescanner`) |
| 4 | `managed_folders` | Create Managed Folder for grouping apps | Groups allow-listed apps into a named folder on the grid | one folder ("Store Apps") |
| 5 | `exit_lock_task_mode_code` | Exit lock task mode password | Sets the PIN used to temporarily exit lock-task mode for troubleshooting; must match the Device Restrictions PIN | placeholder — set per tenant |
| 6 | `max_number_of_attempts_for_exit_PIN` | Maximum number of attempts to exit lock task mode | Attempts allowed before the user is blocked from retrying; 0 means no limit; usable only if the exit PIN is configured | `5` |
| 7 | `amount_of_time_before_try_exit_PIN_again` | Time before exit lock task password can be retried | The retry-delay after the max-attempts limit is hit; no unit is documented for the integer; 0 means no limit | `300` |
| 8 | `enable_mhs_signin` | Enable sign in | Turns end-user sign-in to Managed Home Screen on or off; defaults to FALSE | `false` |
| 9 | — | Enable easy access debug menu | Controls whether the easy-access entry point to the debug menu is shown; the 15-press back-button gesture reaches the exit-PIN prompt regardless — see [Verification](#verification) | not in the payload |

Every key above ships in the fence except row 9, which is GUI-only and demoted to a Verification line — see [Step 6](#step-6-set-the-exit-kiosk-pin-and-harden-exit-retries) for the exit-PIN and retry-hardening detail this table decomposes.

> **Ask the admin:** What grid size (`columns;rows`) should the allow-listed apps use?

The supplied value is recorded directly as the `grid_size` string in the fence above.

> **Ask the admin:** Should the allow-listed apps be grouped into named folders, and if so, what should each folder contain?

The supplied grouping is recorded directly as `managed_folders` entries in the fence above; omit the key entirely if no grouping is needed.

> **What breaks if misconfigured:** Authoring the JSON payload without also assigning the policy on the **Assignments** page leaves it created but never delivered to any device.

That is the same failure class the anchor documents one Intune blade over, for the app assignment in [Step 2](#step-2-deploy-managed-home-screen-as-a-required-app).

### Step 6: Set the exit-kiosk PIN and harden exit retries

The Device Restrictions profile's **Leave kiosk mode code** and this policy's **Exit lock task mode password** name the same field and must be set to the same value. `[MEDIUM: MS Q&A community, last_verified 2026-08-03]` See [Exit-kiosk PIN synchronization](../admin-setup-android/05-dedicated-devices.md#exit-kiosk-pin-synchronization) for the two policy locations and the remediation if they drift.

The retry-hardening keys are already set in [Step 5](#step-5-author-and-assign-the-app-configuration-policy)'s payload; this step explains and verifies them.

> **What breaks if misconfigured:** Setting `max_number_of_attempts_for_exit_PIN` alone does nothing.

Time before exit lock task mode password can be retried must also be set for the max-attempts limit to take effect — with no error and no admin-side signal if it isn't. No unit is documented for the retry-delay integer: sibling timers on the same page state seconds, this one does not. Both values at 0 mean no limit.

Two settings share nearly the same name but gate on different conditions and produce different consequences. `max_number_of_attempts_for_exit_PIN` ("Maximum number of attempts to exit lock task mode") is usable only if the exit lock task mode password is configured, and blocks further exit attempts once exceeded. `max_number_of_attempts_for_session_PIN` ("Maximum number of attempts for session PIN") is usable only if session PIN and sign-in are both enabled, and automatically logs the user out of Managed Home Screen once exceeded. The session-PIN key stays out of the payload above — it is inert under this recipe's worked `enable_mhs_signin: false`.

Microsoft's own labels do not spell the setting name the same way across the two retry fields: the max-attempts label reads "Maximum number of attempts to exit lock task **mode**," while the retry-delay label reads "Time before exit lock task **password** can be retried" — carried here as published, not normalized.

## Verification

- [ ] The MHS grid shows exactly the allow-listed apps from [Step 3](#step-3-deploy-the-allow-listed-apps) — nothing more, nothing less.
- [ ] Home, Overview, and the back-navigation gesture do not surface the standard Android launcher or any app outside the allow-list.
- [ ] Pressing back roughly 15 times reaches the exit-PIN prompt, and the PIN configured in [Step 6](#step-6-set-the-exit-kiosk-pin-and-harden-exit-retries) exits lock-task mode.
- [ ] Folders and apps on the grid cannot be dragged, renamed, or reordered by a test user.
- [ ] Test users can switch between already-visible Wi-Fi networks, but the Wi-Fi radio toggle itself is unavailable from inside MHS.
- [ ] The Intune admin center confirms the device enrolled under the Standard Corporate-owned dedicated device token, not Entra shared device mode.
- [ ] The easy-access entry point to the debug menu is closed by the fence's default — only the back-button gesture above still reaches the exit-PIN prompt.

For Android 15 re-provisioning behavior, see [Android 15 FRP and re-provisioning](../admin-setup-android/05-dedicated-devices.md#android-15-frp-reprovisioning) — cross-link only; the three-pathway table is not re-authored here.

## Rollback/Recovery

Returning a device to its prior state is not the same as removing this recipe's own configuration — the two procedures below are the ones the anchor does not already cover.

**Returning a device to the standard launcher:**

- Unassign the MHS App Configuration policy, or set the Managed Home Screen app assignment to Uninstall for the device group — either removes the Required assignment that keeps the device in the MHS grid.

**A forgotten exit PIN:**

- The anchor's own remediation — verify both policies carry the same code — presupposes a known code. If the code itself is forgotten, set a new value in both the Device Restrictions profile and the MHS App Configuration policy and force a policy sync; there is no separate "reveal" path once a PIN is set, since its value is obfuscated after saving.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|---|---|---|
| The Device Restrictions PIN and the MHS App Configuration PIN set to different values | Users see "A PIN to exit kiosk mode has not been set by your IT admin" at exit attempt | [Step 6](#step-6-set-the-exit-kiosk-pin-and-harden-exit-retries) |
| `max_number_of_attempts_for_exit_PIN` reached without a correct retry | Further exit attempts are blocked until the retry-delay window elapses, or indefinitely if the delay is also 0 | [Step 6](#step-6-set-the-exit-kiosk-pin-and-harden-exit-retries) |
| The Managed Home Screen policy assigned Required ([Step 2](#step-2-deploy-managed-home-screen-as-a-required-app)) before an exit PIN exists on either policy ([Step 6](#step-6-set-the-exit-kiosk-pin-and-harden-exit-retries)) | No exit affordance exists at all until both PIN surfaces are set and synced | [Step 2](#step-2-deploy-managed-home-screen-as-a-required-app) |
| An allow-listed app assigned Available, or to the wrong group, before the first kiosk boot | The app is absent from the MHS grid with no error surfaced | [L2: Android App Install Investigation](../l2-runbooks/20-android-app-install-investigation.md) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md) — the full spec this recipe's decision blocks instantiate
- [Android 15 FRP and re-provisioning](../admin-setup-android/05-dedicated-devices.md#android-15-frp-reprovisioning) — re-provisioning behavior for kiosk fleets, additive to its Verification placement
- [Managed Google Play binding](../admin-setup-android/01-managed-google-play.md#bind-mgp) — the hard prerequisite this recipe assumes is already complete
- [Android dedicated device disambiguation](../_glossary-android.md#dedicated) — cross-platform terminology comparison
- [Enrollment profile](../admin-setup-android/05-dedicated-devices.md#enrollment-profile) — token-type creation and the static-device-group requirement this recipe assumes
- [Exit-kiosk PIN synchronization](../admin-setup-android/05-dedicated-devices.md#exit-kiosk-pin-synchronization) — the two-policy PIN requirement Step 6 cross-links
