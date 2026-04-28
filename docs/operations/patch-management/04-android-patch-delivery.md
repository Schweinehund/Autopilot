---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: Android
---

> **Platform applicability:** This guide is Android-specific (Google Play patch delivery + Play
> Integrity MEETS_STRONG_INTEGRITY enforcement + Zebra LifeGuard OEM + Samsung KSP). For the
> cross-platform overview, see [Patch Management Overview](00-overview.md).
> **Windows:** See [Windows WUfB Rings](01-windows-wufb-rings.md).
> **macOS:** See [macOS DDM Update Enforcement](02-macos-update-enforcement.md).
> **iOS/iPadOS:** See [iOS Update Lifecycle](03-ios-update-lifecycle.md).

# Android Patch Delivery: Play Integrity + OEM Firmware

This guide is the Android-specific patch and update lifecycle reference. It covers Google Play
monthly security patch delivery, the **MEETS_STRONG_INTEGRITY** Play Integrity verdict and its
enforcement cascade (Google May 2025 / Intune September 30 2025 / fleet compliance hard deadline
October 31 2026), Android 13+ security patch age requirement (≤12 months), Zebra LifeGuard OTA
firmware management via Intune (GA January 2026), and Samsung Knox Service Plugin (KSP) as the
analogous Samsung-side OEM mechanism.

For the cross-platform comparison, see [Patch Management Overview](00-overview.md).

## Google Play Patch Delivery

Android security patches are delivered through Google Play Services and the Android System
WebView component on a monthly cadence. OEM firmware patches (full Android version updates,
kernel patches) are delivered separately by the device OEM (Samsung, Pixel/Google, Zebra, etc.)
on the OEM's release cadence. Intune does not directly schedule Play Services updates — the OS
handles the delivery — but Intune compliance policy can require a minimum security patch level
via Play Integrity attestation.

**Patch surfaces:**

- **Google Play Services + Play System Update** — monthly security patches; delivered via Google
  Play; user-transparent
- **OEM firmware** — Android version + kernel updates; delivered via OEM OTA; cadence varies by
  OEM (Pixel monthly; Samsung monthly for flagship + quarterly enterprise; Zebra quarterly via
  LifeGuard; budget OEM ad-hoc)
- **Android System WebView** — separate Play Store app; security updates outside the OS update
  channel

**Tenant policy surface:** Intune Android Enterprise compliance policy (Devices > Compliance >
Android Enterprise > Create) controls minimum security patch level and Play Integrity verdict
requirement. Devices failing the compliance policy enter Conditional Access non-compliant state.

## Play Integrity Attestation {#play-integrity-attestation}

Play Integrity is Google's device-attestation API. Intune compliance policy queries the verdict
to determine device trust. The verdicts and Intune mapping:

| Verdict | Definition | Intune Policy Use |
|---------|------------|-------------------|
| `MEETS_BASIC_INTEGRITY` | Device passes basic integrity checks (genuine device + non-rooted) | Compliance "Basic + Device integrity" option |
| `MEETS_DEVICE_INTEGRITY` | Above + device boot integrity | Compliance "Basic + Device integrity" option |
| `MEETS_STRONG_INTEGRITY` | Above + recent security patch + hardware-backed attestation | Compliance "Strong integrity" option |

**MEETS_STRONG_INTEGRITY** [HARD-DEADLINE — see Deadlines H2] is the verdict that gates the
fleet-compliance hard deadline. It encodes three concurrent conditions:

1. Hardware-backed key attestation (TEE/StrongBox)
2. Android 13 or higher
3. Security patch ≤12 months old

Devices not returning MEETS_STRONG_INTEGRITY [HARD-DEADLINE — see Deadlines H2] post Oct 31 2026
will fail Intune compliance and be blocked by Conditional Access policies querying the
compliance signal.

> **Note:** The older SafetyNet attestation API was deprecated by Google in January 2025 and no
> longer appears in current Intune Android compliance blade options. Tenants using SafetyNet
> compliance settings should migrate to Play Integrity verdicts.

## Deadlines & Cutover Dates {#deadlines-cutover-dates}

The MEETS_STRONG_INTEGRITY enforcement cascade affects all Android tenants. Zebra LifeGuard +
Samsung KSP are soft cutovers (feature additions; no fleet-wide failure mode).

| Integrity Verdict / Mechanism | Status | Effective |
|--------------------------------|--------|-----------|
| Play Integrity MEETS_STRONG_INTEGRITY (Google enforcement) | **[HARD-DEADLINE]** — see callout | Oct 31 2026 (fleet compliance) |
| Zebra LifeGuard OTA via Intune (GA) | Soft cutover (feature addition) | Jan 2026 |
| Samsung KSP (Knox Service Plugin) | Analog OEM mechanism | Samsung fleets only |

> ⚠️ **Hard deadline (Oct 31 2026):** MEETS_STRONG_INTEGRITY enforcement: Google enforced
> May 2025; Intune enforced September 30 2025; fleet compliance deadline October 31 2026. Android
> 13+ devices must have a security patch ≤12 months old. Devices not meeting this threshold will
> fail Intune compliance after Oct 31 2026.

## Enforcement Cascade Migration

The MEETS_STRONG_INTEGRITY [HARD-DEADLINE — see Deadlines H2] cascade rolled out in three stages:

**Stage 1 — Google enforcement (May 2025):** Google's Play Integrity API began returning
MEETS_STRONG_INTEGRITY verdicts at production scale; tenants could query but Intune-side
enforcement remained tenant-discretionary.

**Stage 2 — Intune enforcement (September 30 2025):** Intune Android compliance blade began
honoring MEETS_STRONG_INTEGRITY [HARD-DEADLINE — see Deadlines H2] as the "Strong integrity"
compliance setting. Tenants enabling this setting from Sept 30 2025 onward gate device compliance
on the verdict.

**Stage 3 — Fleet compliance deadline (October 31 2026):** All tenants must have devices
returning MEETS_STRONG_INTEGRITY [HARD-DEADLINE — see Deadlines H2] OR have a documented
exception. Devices failing the verdict post-deadline cannot pass Intune compliance and will be
blocked by Conditional Access policies querying the compliance signal.

**Migration plan:**

1. Inventory devices currently failing MEETS_STRONG_INTEGRITY via Intune > Devices > Compliance
   reports (filter by verdict = `MEETS_DEVICE_INTEGRITY` only — no Strong integrity)
2. For Android 13+ devices: schedule OEM firmware updates to bring security patch ≤12 months old
3. For Android 12 and earlier devices: plan device replacement or downgrade compliance scope
4. For devices with hardware-backed-attestation issues: contact OEM for Play Integrity remediation
5. Pilot Strong integrity policy on a subset before full fleet enforcement

**Critical scheduling note:** The October 31 2026 [HARD-DEADLINE — see Deadlines H2] is fleet-wide.
Tenants with rugged-device fleets (Zebra, Honeywell, etc.) on extended firmware cadences should
plan firmware roll-up well in advance — see [Zebra LifeGuard OTA](#zebra-lifeguard) for the
Zebra-side mechanism.

**OEM patch-rollout variance considerations:**

- **Pixel/Google:** monthly Android security patches; typically <14-day rollout window
- **Samsung flagship:** monthly Android security patches via Knox; typically <30-day rollout
- **Samsung enterprise / mid-tier:** quarterly Android security patches; up to 90-day rollout
- **Zebra rugged:** quarterly via LifeGuard; up to 90-day rollout
- **Generic AOSP / budget OEM:** ad-hoc; can exceed 6-month gaps and slip the 12-month window

Plan firmware-update orchestration with the slowest OEM in your fleet as the pacing constraint.

## Zebra LifeGuard OTA (Zebra Fleets) {#zebra-lifeguard}

**Zebra LifeGuard OTA** firmware management via Intune (GA **January 2026**) is a Zebra-specific
OEM mechanism for Zebra Android Enterprise rugged devices. Zebra LifeGuard delivers OEM firmware
patches (kernel, modem, baseband, security) on a quarterly cadence directly to Zebra devices,
complementing the standard Google Play security patch channel.

**Configuration path:** Intune > Tenant administration > Connectors and tokens > Manage OEM
connectors > Zebra LifeGuard > Configure (use Zebra MDM ID + LifeGuard subscription token).
After connector configuration, Zebra OTA campaigns target Azure AD device groups under
Devices > Android > Zebra firmware updates.

**Coverage:**

- **Eligible devices:** Zebra rugged devices in Android Enterprise (corporate-owned fully managed
  or dedicated)
- **Patch types:** kernel + modem + baseband + Android security patches rolled up by Zebra
- **Cadence:** quarterly per Zebra release schedule
- **Co-management with Play security patches:** Zebra LifeGuard delivers OEM-specific patches;
  Google Play delivers Android Play Services + WebView patches; both run on the same device

**Zebra LifeGuard timing relative to MEETS_STRONG_INTEGRITY [HARD-DEADLINE — see Deadlines H2]:**
Zebra fleets relying on LifeGuard for the security-patch ≤12 months requirement should validate
that the LifeGuard quarterly cadence keeps the security patch age within the Android 13+
requirement window. Most Zebra firmware releases include a roll-up of recent monthly Google
security patches, but the Q-to-Q gap means a missed quarterly release can slip the 12-month
window — schedule LifeGuard campaigns conservatively against the Oct 31 2026 deadline.

## Samsung Knox Service Plugin (Samsung Fleets) {#samsung-ksp}

**Samsung KSP** (**Knox Service Plugin**) is the analogous Samsung-side OEM mechanism for
firmware update enforcement and Knox-specific configuration on Samsung Android Enterprise
devices. KSP is functionally analogous to Zebra LifeGuard — both are OEM-specific mechanisms
running alongside Intune-managed Android Enterprise policy and complementing the standard
Google Play security patch channel.

**Configuration path:** Knox Service Plugin is published as an OEMConfig app on Managed Google
Play (MGP). Tenants approve KSP in MGP, deploy via Intune > Apps > Android > Add > Managed Google
Play app, then configure the KSP OEMConfig profile under Intune > Devices > Configuration
profiles > Create > Android Enterprise > OEMConfig.

**KSP capabilities relevant to patch management:**

- Force quarterly Samsung security update enforcement (independent of Play Integrity verdict)
- Restrict Samsung firmware updates to specific approved versions (Knox-managed firmware policy)
- Configure Samsung-specific update channels (carrier, enterprise)
- Defer or accelerate firmware rollout windows per Samsung Knox firmware policy

**KSP and Knox Mobile Enrollment (KME):** KSP runs on devices already enrolled via KME or
Managed Google Play. KSP is not an enrollment mechanism — see
[Knox Mobile Enrollment](../../admin-setup-android/07-knox-mobile-enrollment.md) for Samsung
zero-touch enrollment.

**Samsung KSP relative to MEETS_STRONG_INTEGRITY [HARD-DEADLINE — see Deadlines H2]:** Samsung
fleets using KSP-enforced quarterly Samsung security updates typically meet the Android 13+
≤12-month patch age requirement automatically on flagship devices. Mid-tier Samsung devices on
Samsung's quarterly enterprise cadence should be audited explicitly against the Oct 31 2026
deadline — Samsung KSP can force update windows but cannot accelerate Samsung's underlying
quarterly release schedule.

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison + Ring Terminology hub
- [Windows WUfB Rings](01-windows-wufb-rings.md) — Windows forward path
- [macOS DDM Update Enforcement](02-macos-update-enforcement.md) — macOS forward path
- [iOS Update Lifecycle](03-ios-update-lifecycle.md) — iOS DDM
- [Knox Mobile Enrollment](../../admin-setup-android/07-knox-mobile-enrollment.md) — Samsung
  zero-touch enrollment
- [BYOD Work Profile](../../admin-setup-android/04-byod-work-profile.md) — Play Integrity
  compliance policy context

## External References

- [Play Integrity API (Google Developer)](https://developer.android.com/google/play/integrity)
- [Android Compliance Policy (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android)
- [Support tip: Changes to Google Play strong integrity for Android 13 or above (Microsoft Tech Community)](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130)
- [Zebra LifeGuard OTA](https://techdocs.zebra.com/lifeguard/)
- [Samsung Knox Service Plugin](https://docs.samsungknox.com/admin/knox-platform-for-enterprise/kbas/kba-114-ksp/)
