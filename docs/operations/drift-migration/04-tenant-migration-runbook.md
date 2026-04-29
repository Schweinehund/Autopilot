---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: cross-platform
confidence: MEDIUM
---

> **Platform applicability:** This guide is the cross-platform tenant-to-tenant migration
> runbook covering Windows / macOS / iOS / Android plus a folded cross-platform
> encryption-drift section. For drift detection (separate scope), see
> [Drift Detection Overview](00-overview.md).
> **Windows:** See [Windows Drift Detection](01-windows-drift-detection.md).
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md).
> **iOS/Android:** See [iOS + Android Drift Detection](03-ios-android-drift-detection.md).

> ⚠️ **MEDIUM confidence** — Tenant migration is not a formally supported Intune scenario.
> Microsoft does not provide automated tooling for tenant-to-tenant device migration. Test the
> process in a non-production environment before executing at scale.

# Tenant Migration Runbook: Cross-Platform

This runbook covers tenant-to-tenant migration across Windows / macOS / iOS / Android, plus a
folded cross-platform encryption-drift section. Tenant migration is **not a formally supported
Intune scenario** — Microsoft does not provide automated tooling for tenant-to-tenant device
migration. The procedures documented here are best-effort, drawn from Microsoft support guidance,
Apple/Google admin-portal documentation, and community-validated patterns.

> **Scope:** This runbook covers BitLocker re-key options (Phase 56 net-new), macOS/iOS ABM
> token re-issue + ADE Await-Configuration behavior, Android Managed Google Play re-binding
> + per-ownership-mode re-provisioning, and a cross-platform encryption-drift fold section.
> For Windows hardware-hash deregistration / re-registration step-by-step procedure with
> batch-size + timing constraints, see
> [Tenant-to-Tenant Device Migration](../../device-operations/04-tenant-migration.md)
> (v1.2 SSoT preserved; Windows-only scope).

The runbook is organized as four platform H2 sections in document order — Windows,
macOS / iOS, Android — followed by a cross-platform encryption-drift fold section (DRIFT-07).

---

## Windows tenant migration

Windows tenant migration follows a five-step sequence covering pre-migration inventory through
post-migration validation. This H2 covers BitLocker re-key options and post-migration escrow
validation (Phase 56 net-new scope). For hardware-hash collection methods, batch-size limits
(500-device cap), Autopilot profile assignment, and step-by-step wipe + re-provision procedure,
see [Tenant-to-Tenant Device Migration](../../device-operations/04-tenant-migration.md) (v1.2
SSoT; Windows-only).

### Migration sequence

1. **Pre-migration inventory** — Collect serial numbers; collect hardware hashes if not
   already on file (required for re-registration in target tenant; see v1.2 SSoT for hash
   collection commands and batch-size limits).
2. **Autopilot deregistration in the source tenant** — Remove device from Tenant A Autopilot
   device list (Intune admin center → Devices → Windows → Enrollment → Windows Autopilot
   devices → Delete). Also delete the Intune enrollment record. This deregistration step
   is a hard prerequisite — a device cannot be re-registered in Tenant B while still
   registered in Tenant A. Cross-reference the v1.2 doc above for exact sequencing with
   deregistration + timing constraints.
3. **BitLocker re-key** — Choose ONE of three approaches enumerated below. The choice is
   made based on tenant-side data-risk tolerance, third-party tooling budget, and PowerShell
   scripting capacity. All three options are enumerated neutrally — no Microsoft preference.
4. **Autopilot re-registration in the target tenant** — Import hardware hashes into Tenant B
   (Intune admin center → Devices → Windows → Enrollment → Windows Autopilot devices →
   Import). Assign the Autopilot profile and verify profile assignment. See v1.2 SSoT for
   batch-import limits and profile-assignment timing guidance.
5. **Post-migration BitLocker recovery key escrow validation** — Verify that BitLocker
   recovery keys are present in the target Microsoft Entra ID before retiring the source
   tenant admin access. See the escrow validation section below.

---

### BitLocker re-key: three approaches (neutral enumeration)

The three BitLocker re-key approaches are enumerated below WITHOUT Microsoft preference.
REQ DRIFT-04 explicitly requires neutrality on tooling/approach choice.

#### Option (a): Source-tenant escrow → target Entra via PowerShell scheduled task

This approach uses source-tenant escrow data to seed the target Entra ID: a PowerShell
scheduled task post-migration calls `BackupToAAD-BitLockerKeyProtector` to escrow the existing
recovery key from the workstation to the target Microsoft Entra ID.
This approach preserves device encryption continuity — there is no decrypt window, and the
device remains encrypted throughout migration. It is the canonical PowerShell-driven path used
by community tooling for cross-tenant BitLocker key migration.

The high-level implementation uses a PowerShell script deployed as an Intune Script (or
Win32 app package) that is published to the target Intune tenant post-device-migration,
triggering at user logon. The script identifies all BitLocker-protected volumes, then calls
`BackupToAAD-BitLockerKeyProtector` for each to escrow the recovery key to the target Entra.

**Prerequisite caveat (CRITICAL — silent-failure pattern):**
`BackupToAAD-BitLockerKeyProtector` only escrows the existing `RecoveryPassword` key protector
IF a new key protector is created AND encryption is re-triggered (or if the existing protector
has never been escrowed during the device's lifetime). On devices that had their BitLocker
recovery key previously escrowed to the source tenant, simply calling
`BackupToAAD-BitLockerKeyProtector` on the existing protector may appear to succeed (no error
returned) but no escrow occurs in the target Entra tenant. To ensure a new escrow, create a
new key protector first:

```powershell
# On each protected volume, add a NEW RecoveryPassword protector and escrow it
$volumeInfo = Get-BitLockerVolume -MountPoint "C:"
# Add a new RecoveryPassword protector to force a re-escrow opportunity
Add-BitLockerKeyProtector -MountPoint "C:" -RecoveryPasswordProtector

# Retrieve the newly added protector (last entry in the list)
$volume = Get-BitLockerVolume -MountPoint "C:"
$newProtector = $volume.KeyProtector |
    Where-Object { $_.KeyProtectorType -eq 'RecoveryPassword' } |
    Select-Object -Last 1

# Escrow the new protector to the target Entra tenant
BackupToAAD-BitLockerKeyProtector -MountPoint "C:" -KeyProtectorId $newProtector.KeyProtectorId
```

After running, confirm that a new recovery key entry appears in the target Microsoft Entra
admin center (Devices → select device → BitLocker keys tab). Test this prerequisite caveat
against a pilot device before fleet-wide deployment — the silent-failure pattern has caught
administrators off-guard in production migrations.

---

#### Option (b): Decrypt source-tenant BitLocker → re-encrypt under target tenant

Decrypt each device using `manage-bde -off C:` (or via an Intune disk encryption policy
assigned to a target-migration group that sets encryption to "Not configured"), complete the
tenant migration, then re-encrypt under the target tenant's Intune disk encryption policy and
escrow the new recovery key to the target Entra ID.

This approach is operationally simpler than option (a) for fleets that can tolerate a decrypt
window — no custom PowerShell scripting or scheduled-task packaging required. The trade-off
is the data-risk window described below.

> ⚠️ **Data-risk window** — Option (b) leaves devices unencrypted between the decrypt step
> and the re-encrypt step. The duration of this window depends on disk size, migration cadence,
> and whether decryption is performed concurrently across the fleet or in waves. For regulated
> workloads (HIPAA, FedRAMP, PCI-DSS), remote / unsupervised devices, or any device that may
> leave the office during migration, prefer option (a) or option (c). Document the decrypt
> window in your change record and confirm with your security team before proceeding.

Re-encryption is triggered automatically when the target tenant's Intune disk encryption
profile applies to the re-enrolled device. Confirm the disk encryption profile is assigned
to the correct Entra group before provisioning devices to the target tenant.

---

#### Option (c): Third-party tool

A third-party tool may provide an integrated BitLocker handling workflow as part of the broader
tenant-migration product, removing the need for custom PowerShell scripting (option a) or an
explicit decrypt window (option b).

Quest On Demand Migration is a documented example of a tool that includes BitLocker re-key
tasks as part of its tenant-to-tenant migration product. Its BitLocker module installs a
PowerShell script and scheduled task on the workstation as part of the migration workflow;
the scheduled task escrows the recovery key to the target Entra ID at the first user logon
post-migration.

The choice of third-party tool is a procurement decision outside the scope of this runbook.
Tool selection criteria (licensing cost, scope of features beyond BitLocker key handling,
support SLA, compatibility with your Entra ID tier) are outside the documentation scope.

---

### Post-migration BitLocker recovery key escrow validation

After completing the chosen BitLocker re-key approach and the Autopilot re-registration in the
target tenant, perform escrow validation to confirm BitLocker recovery keys are present in the
target Entra before decommissioning source tenant admin access:

1. In the Microsoft Entra admin center (target tenant), navigate to **Devices** → select the
   device by serial number or device name → **BitLocker keys** tab.
2. Confirm that one or more recovery key entries are listed. The `KeyProtectorId` shown should
   match the protector escrowed by the chosen approach.
3. For fleet-level validation, use the Microsoft Entra Devices export (Devices → Download)
   to cross-reference against the hardware serial-number inventory from the pre-migration
   inventory step.

If the recovery key is absent or stale (protector ID from the source tenant only), re-run
the chosen re-key approach and re-validate. Devices missing recovery keys post-migration are
a known-and-recoverable condition — re-running is idempotent and safe.

---

## macOS / iOS tenant migration

> 📌 **OS 26+ device migration** — Apple has introduced new ABM device-migration APIs in OS 26
> (iOS 26 / iPadOS 26 / macOS 26) that materially change the cross-MDM migration surface:
> no wipe required; user data is preserved; enrollment deadlines are enforced automatically.
> Devices on OS 26+ may use the new path. Devices on OS 25 and earlier use the legacy path
> documented below as the BASELINE. Apple's documentation owns the OS 26 procedure detail —
> see [Apple's Migrate managed devices guide](https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web)
> for current 2026 OS 26 mechanics. The legacy path remains canonical for mixed fleets and
> as a fallback.

### Legacy path (BASELINE for iOS <26 / iPadOS <26 / macOS <26)

macOS and iOS tenant migration follows a four-step sequence on the legacy path:

1. **ABM token re-issue** — In Apple Business Manager (or Apple School Manager), navigate
   to the MDM server settings for the source tenant and `release` each device (or device
   group) from the source MDM server. Then `re-assign` each device to the MDM server in the
   target tenant's ABM. The `ABM token` for the target tenant's MDM server must be uploaded
   to the target Intune enrollment configuration **before** re-assignment; otherwise the
   target MDM server is not available in the ABM portal to receive device assignments.

   Note: MDM server assignment **cannot** be transferred between tenants — devices must be
   explicitly released from Tenant A's MDM server first, then assigned to Tenant B's MDM
   server in a separate step. There is no "move" operation in ABM that preserves enrollment
   state cross-tenant.

2. **In-use device handling** — Devices that are currently enrolled and actively in use
   require a `wipe` followed by `re-enrollment` against the target tenant. Cross-tenant
   enrollment-state preservation is not supported on the legacy path: the enrolled MDM
   profile, configuration profiles, and managed apps from Tenant A cannot be transferred.
   The wipe + re-enrollment sequence is the only Apple-supported path for in-use devices on
   the legacy path.

3. **ADE Await-Configuration behavior** — Devices enrolled via Apple Automated Device
   Enrollment (ADE, previously DEP) wait at the Setup Assistant `Await-Configuration` screen
   for the new MDM server check-in to complete. The target tenant's ADE enrollment profile
   must be assigned and pushed to the ABM MDM server configuration **before** the device
   powers on after wipe; otherwise the device stalls at the Setup Assistant prompt waiting
   indefinitely for the new MDM server. Confirm that the target tenant's ADE profile is
   active and assigned to the device group in ABM before initiating the wipe.

4. **Re-enrollment validation** — After re-enrollment completes, validate device compliance
   state in the target tenant's Intune compliance reports (Devices → Monitor → Device
   compliance). FileVault recovery key escrow (a separate concern from device configuration;
   see the cross-platform encryption-drift section below) does **not** auto-update
   post-re-enrollment — the re-enrolled device generates a new FileVault personal recovery
   key that must be escrowed to the target tenant via the Intune FileVault escrow workflow.
   Plan a follow-up escrow validation step as part of the migration checklist.

### OS 26+ alternative path

For fleets running iOS 26 / iPadOS 26 / macOS 26 or newer, Apple's cross-MDM migration APIs
allow device assignment transfer between MDM servers without a wipe + re-enrollment cycle:

- In the ABM/ASM portal, use the OS 26 device-migration API to transfer device assignment
  between MDM servers. The UI surface in ABM for OS 26 migration differs from the legacy
  "release + re-assign" flow — refer to Apple's current admin documentation for the 2026 UI
  path.
- Set an enrollment deadline during the transfer; devices that do not re-enroll by the
  deadline are automatically locked until enrollment completes.
- Personal user data is preserved across the migration on the OS 26 path — no wipe is
  required for OS 26+ devices. Managed apps and configuration profiles are re-applied by
  the target MDM server post-migration.

Apple's documentation owns the OS 26 procedure detail; this runbook references but does not
replicate Apple's OS 26 procedure. See
[Apple OS 26 device migration (Microsoft TechCommunity)](https://techcommunity.microsoft.com/blog/intunecustomersuccess/apple-making-device-migration-to-microsoft-intune-easy-with-upcoming-os-26-relea/4439895)
for the Microsoft Intune integration notes for the OS 26 path.

The OS 26 path is operationally simpler for fleets that meet the version requirement. For
mixed fleets (OS 26+ devices and older), run two parallel tracks: OS 26 path for eligible
devices, legacy wipe + re-enrollment path for older devices.

---

## Android tenant migration

Android tenant migration follows a four-step sequence covering Managed Google Play (MGP)
re-binding and per-ownership-mode device re-provisioning.

### MGP re-binding sequence

The MGP re-binding sequence must be completed in order. Each step is a hard prerequisite for
the next.

1. **`disconnect` from source MGP** — In the Intune admin center (source tenant), navigate
   to **Tenant administration** → **Connectors and tokens** → **Managed Google Play** →
   **Disconnect**. Confirm the disconnect action.

   > ⚠️ **Fleet-affecting operation:** Disconnecting Managed Google Play from the source
   > Intune tenant retires and deletes ALL enrolled Android devices in that tenant per
   > Microsoft's documented behavior. Plan the disconnect timing to coincide with the device
   > re-provisioning wave — devices will lose MDM management immediately upon disconnect.
   > Ensure device-recovery readiness (wipe procedure + target tenant enrollment flow tested
   > on pilot devices) before executing at fleet scale.

2. **`bind new` MGP account to target Intune tenant** — In the target Intune tenant, navigate
   to **Tenant administration** → **Connectors and tokens** → **Managed Google Play** →
   **I agree** (to grant Intune access to the MGP account). Use an Entra-linked Managed Google
   Domain account (the recommended "new way" introduced August 2024; replaces personal-Gmail-
   based bindings). Personal-Gmail-based bindings continue to work for existing tenants but
   Entra-linked accounts are recommended for new bindings in 2026.

3. **`re-approve` all apps** in the target Managed Google Play console — The existing app
   catalog from the source tenant does **not** survive the disconnect/rebind. After binding
   the new MGP account, navigate to the target Intune admin center → Apps → Android apps →
   Managed Google Play app and re-approve every application that was approved in the source
   tenant's MGP catalog. This is a known-and-documented requirement that catches admins off-
   guard; budget significant time to re-approve every app in the source catalog, especially
   for large app catalogs (50+ apps).

4. **`re-provision` devices** per ownership mode — See the per-ownership-mode section below.

### Per-ownership-mode re-provisioning

Android device re-provisioning depends on the device ownership model:

- **Corporate-owned (fully managed / dedicated / COBO):** Perform a `factory reset` on each
  device (Intune Wipe action or Settings → General management → Reset → Factory data reset
  on the device). After factory reset, `re-enrollment` occurs via the target tenant's Device
  Policy Controller (DPC). For Android Enterprise fully managed, enrollment is triggered by
  scanning the target tenant's enrollment QR code or entering the enrollment token at OOBE.

- **BYOD (work profile):** Perform `work profile re-creation` — the user removes the existing
  work profile from Tenant A via Settings → Accounts → Work account → Remove, then re-enrolls
  the work profile via the target tenant's Company Portal app. The user's personal data and
  personal apps are not affected by work profile removal or re-creation. The Company Portal
  app version installed from the personal profile (non-managed Play Store) is used to initiate
  work profile enrollment against the target tenant.

- **Zero-Touch enrolled corporate-owned:** Perform `ZT portal re-upload` with target tenant
  credentials. The sequence is:
  1. In the source Intune tenant, disconnect the Zero-Touch enrollment account (Settings →
     Android Enterprise → Zero-Touch enrollment → Disconnect).
  2. In the Google Zero-Touch portal (business.google.com/zerotouchemail), update the EMM
     DPC configuration to point to the target Intune tenant (update the EMM token and DPC
     extras JSON with the target tenant enrollment token).
  3. Link the new Zero-Touch account to the target Intune tenant (Tenant administration →
     Connectors and tokens → Android Enterprise → Zero-Touch enrollment → Add).
  4. Devices receive the new EMM DPC configuration from the Zero-Touch portal at first boot
     after factory reset and enroll automatically into the target tenant.

### Android migration validation

After re-provisioning:

- Validate device enrollment state in the target tenant's Intune Devices view (All devices →
  filter by OS: Android).
- Verify the work profile (BYOD) or fully-managed surface (corporate-owned) is bound to the
  target tenant: Settings → Accounts → Work account → Account info should show the target
  tenant UPN.
- Re-validate Play Integrity verdict if Play-Integrity-based compliance policies are enabled
  in the target tenant. Freshly re-enrolled devices may require 24-48 hours for Play Integrity
  attestation to stabilize, especially on devices with recent firmware updates.
- Confirm all Managed Google Play apps are installing from the new MGP binding. Check App
  install status in the target Intune admin center (Devices → select device → App install
  status).

---

## Cross-platform encryption drift

Tenant migration interacts with platform-level encryption surfaces differently across Windows,
macOS, iOS, and Android. This section is **educational and comparative** — it documents the
encryption surfaces, drift risks, and MDM management boundaries for each platform WITHOUT
recommending specific encryption-key-recovery tools. The MEDIUM-confidence framing of this
runbook extends to encryption-drift characterization; per-OEM variation and platform-specific
implementation details may differ from the descriptions below.

### Per-platform encryption surfaces

| Platform | Encryption surface | Drift risk during tenant migration | MDM management surface |
|---|---|---|---|
| **Windows** | `BitLocker` (full-disk encryption; AES-XTS 256-bit by default on Entra-joined devices; recovery key escrowed to Microsoft Entra ID) | **Key escrow targeting risk:** The BitLocker recovery key is escrowed to the source Entra. Tenant migration leaves the recovery key orphaned in Tenant A unless a re-escrow workflow runs against the target Entra (see Windows tenant migration section above). Devices continue to function normally; the risk is that the recovery key is inaccessible to Tenant B admins in the event of a recovery event. | YES — Intune disk encryption policy drives BitLocker enablement; `BackupToAAD-BitLockerKeyProtector` escrows recovery key to Entra; recovery key visible in Entra admin center per-device BitLocker keys tab. |
| **macOS** | `FileVault` (full-disk encryption; XTS-AES-128; recovery key is a personal recovery key escrowed to MDM or an institutional recovery key held by IT) | **Escrow not updated post-re-enrollment:** Re-enrolling a macOS device in the target tenant generates a new FileVault personal recovery key, but the old key (escrowed to the source tenant) is no longer accessible by Tenant B admins. The re-enrolled device generates a new personal recovery key that must be actively escrowed to the target Intune tenant via the Intune FileVault escrow workflow. This does NOT happen automatically — admin action is required. | YES — Intune FileVault policy with personal recovery key or institutional recovery key options; escrow action is triggered by the Intune agent after policy application; admin verifies escrow via Devices → Recovery keys in the Intune admin center. |
| **iOS** | `iOS device-level` encryption (hardware-backed; AES-256; derived from device UID fused at manufacturing and user passcode; applies to all data at rest automatically) | **None — encryption is not tenant-bound:** iOS device encryption is hardware-enforced and passcode-derived. It is independent of MDM enrollment and tenant identity. Tenant migration does not affect iOS encryption state. There is no recovery key escrow surface for iOS encryption. | **NO MDM management beyond compliance check** — MDM cannot read or write the iOS encryption key. The only MDM-surfaced signal is the device compliance check (Compliance policy: "Require device encryption" checks the `isEncrypted` device property returned by the Intune MDM channel; passcode complexity policy governs the strength of the passcode-derived key indirectly). |
| **Android** | `dm-crypt` (used in Android < 10 for full-disk encryption; Android 10+ uses file-based encryption [FBE] with per-file keys; per-OEM implementation variance — Pixel, Samsung Knox, Zebra DataWedge each implement FBE differently at the firmware level; LUKS is a Linux-only volume manager and is **not** available on Android) | **None — encryption is not tenant-bound:** Android encryption (dm-crypt or FBE) is handled at the OS + firmware level and is independent of MDM enrollment. Factory reset (required for corporate re-provisioning) re-generates the per-file encryption keys automatically. There is no recovery key escrow surface on Android for Intune to manage. | **NO MDM management beyond compliance check** — Intune cannot read or rotate Android encryption keys. Compliance policy checks the `storageEncrypted` property (reported by the Android Enterprise DPC). Per-OEM variance is noted: some OEMs expose additional encryption status fields via proprietary APIs (e.g., Samsung Knox Attestation); these are out of scope for standard Intune compliance policy. |

### Editorial boundaries

This section intentionally:

- **Does not recommend specific encryption-key-recovery tools** for any platform. The
  4-platform encryption surface comparison is educational, not prescriptive. Tool selection
  for encryption-key recovery or key migration is a security architecture decision that
  requires threat-model alignment, vendor vetting, and procurement approval.
- **Does not name commercial recovery products** beyond the single mention of Quest On Demand
  Migration in the Windows tenant migration section (scoped to the BitLocker option (c)
  narrative; not applicable to this encryption-drift section).
- **Frames iOS as "no MDM management beyond compliance check"** — admins migrating iOS fleets
  should not expect any iOS-side encryption-key handling. The compliance signal (`isEncrypted`)
  is a read-only attestation, not a management surface.
- **Frames Android as "per-OEM variance"** — admins should validate per-OEM encryption
  behavior on a per-fleet basis. Zebra devices on Android 12 GMS, Samsung Galaxy on Android 14
  Knox, and Pixel devices on Android 15 may report encryption state differently in Intune
  compliance reports. Test compliance policy behavior with each OEM model in use.
- **Excludes LUKS** — LUKS (Linux Unified Key Setup) is a Linux-only disk encryption standard.
  It is not present in Android. Any documentation implying Android uses LUKS is incorrect.

For BitLocker re-key approaches (Windows) and FileVault re-escrow planning (macOS), see the
Windows and macOS / iOS tenant migration sections above. The cross-platform encryption-drift
content in this section is comparative, not procedural.

---

## Related Resources

- [Drift Detection Overview](00-overview.md) — Cross-platform compliance drift signals hub
- [Windows Drift Detection](01-windows-drift-detection.md) — Intune Remediations + canonical
  script-authoring pattern
- [macOS Drift Detection](02-macos-drift-detection.md) — Profile-revocation + DDM compliance
  signals
- [iOS + Android Drift Detection](03-ios-android-drift-detection.md) — Jailbreak / OS downgrade
  / Play Integrity verdict signals
- [Tenant-to-Tenant Device Migration](../../device-operations/04-tenant-migration.md) — v1.2
  SSoT — Windows tenant migration with hardware-hash deregistration step-by-step procedure,
  batch-size limits, and Autopilot profile assignment (scope-overlapping; Windows-only)
- [Patch & Update Management Overview](../patch-management/00-overview.md) — Sibling
  ops-domain (Phase 54)
- [App Lifecycle Automation Overview](../app-lifecycle/00-overview.md) — Sibling ops-domain
  (Phase 55)
- [Operations Documentation Index](../00-index.md) — Cross-reference only

---

## External References

- [BitLocker Recovery Key Migration Practical Guide (Microsoft TechCommunity)](https://techcommunity.microsoft.com/blog/coreinfrastructureandsecurityblog/migrating-bitlocker-recovery-key-management-from-configmgr-to-intune-a-practical/4414948) — Option (a) PowerShell pattern background (community-verified)
- [Migrate BitLocker Recovery Keys to Azure AD with Proactive Remediation (osdsune.com)](https://www.osdsune.com/home/blog/microsoft-intune/migrate-bitlocker-recovery-key-s-to-azure-ad-with-proactive-remediation) — Prerequisite caveat for new key protector and silent-failure avoidance
- [Apple: Migrate managed devices to another device management service (Apple Support)](https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web) — ABM cross-MDM transfer guidance (legacy path + OS 26 path)
- [Apple OS 26 Device Migration to Microsoft Intune (Microsoft TechCommunity)](https://techcommunity.microsoft.com/blog/intunecustomersuccess/apple-making-device-migration-to-microsoft-intune-easy-with-upcoming-os-26-relea/4439895) — Apple OS 26 ABM API path and Intune integration notes
- [Disconnect Managed Google Play from Intune (Microsoft Q&A)](https://learn.microsoft.com/en-us/answers/questions/1338223/disconnect-managed-google-play-from-intune-(all-an)) — Disconnect retires and deletes all Android devices behavior
- [Connect Intune Account to Managed Google Play Account (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-enrollment/android/connect-managed-google-play) — MGP binding flow (Entra-linked Managed Google Domain account)
- [Zero Touch Enrollment (Google)](https://support.google.com/work/android/answer/7514005) — Google Zero-Touch portal documentation for ZT portal re-upload procedure

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-29 | Initial version (Phase 56) — DRIFT-04 Windows tenant migration (BitLocker 3-option neutral enumeration + Autopilot deregistration/re-registration + escrow validation) + DRIFT-05 macOS/iOS ABM token re-issue + ADE Await-Configuration + wipe/re-enrollment + OS 26 note + DRIFT-06 Android MGP re-binding + per-ownership-mode re-provisioning + DRIFT-07 cross-platform encryption drift fold (BitLocker + FileVault + iOS device-level + dm-crypt) + MEDIUM-confidence dual-surface framing |
