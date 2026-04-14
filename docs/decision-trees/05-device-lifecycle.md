---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
platform: Windows
---

> **Version gate:** This decision tree applies to both Windows Autopilot (APv1) and Windows Autopilot Device Preparation (APv2). Actions marked "APv1 only" are not available for APv2 devices. For framework identification, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Device Lifecycle Action Decision Tree

## How to Use This Tree

Start here when you need to perform a device management action post-enrollment. Answer the entry point question based on what you want to preserve, and the tree routes you to the correct action within three steps.

## Decision Tree

```mermaid
graph TD
    START["What do you want to preserve?"]
    START --> Q1{"User's personal data\n(files, photos, personal apps)?"}

    Q1 -->|"Yes — remove org data only"| RETIRE["**Retire**<br/>Removes org data and policies.<br/>Personal data preserved.<br/>See: 02-retire-wipe.md"]

    Q1 -->|"No"| Q2{"Org enrollment and\nsettings (re-use for next user)?"}

    Q2 -->|"Yes — re-use for next user\nwithin same tenant"| Q3{"Same tenant?"}

    Q3 -->|"Yes"| RESET["**Autopilot Reset**<br/>APv1 only. Removes personal files.<br/>Re-applies org config.<br/>See: 01-autopilot-reset.md"]

    Q3 -->|"No — different tenant"| TENANT["**Tenant Migration**<br/>Deregister from Tenant A,<br/>re-import to Tenant B.<br/>See: 04-tenant-migration.md"]

    Q2 -->|"No — full factory reset"| Q4{"Keep user documents\n(Home folder)?"}

    Q4 -->|"Yes — clean OS, keep files"| FRESH["**Fresh Start**<br/>Removes OEM bloatware and apps.<br/>Keeps user documents.<br/>See: 02-retire-wipe.md"]

    Q4 -->|"No — erase everything"| WIPE["**Wipe**<br/>Factory reset. Erases everything.<br/>Use for lost/stolen or hybrid devices.<br/>See: 02-retire-wipe.md"]

    classDef action fill:#0078d4,color:#fff,stroke:#005a9e
    classDef decision fill:#f3f2f1,color:#323130,stroke:#8a8886

    class RETIRE,RESET,TENANT,FRESH,WIPE action
    class Q1,Q2,Q3,Q4 decision
```

## Action Quick Reference

| Action | Preserves | Framework | Guide |
|--------|-----------|-----------|-------|
| Autopilot Reset | Wi-Fi, SCEP certs, MDM enrollment | APv1 only | [01-autopilot-reset.md](../device-operations/01-autopilot-reset.md) |
| Retire | Personal files, user documents | Both | [02-retire-wipe.md](../device-operations/02-retire-wipe.md) |
| Wipe | Nothing (optionally Wi-Fi state) | Both | [02-retire-wipe.md](../device-operations/02-retire-wipe.md) |
| Fresh Start | User documents (Home folder) | Both | [02-retire-wipe.md](../device-operations/02-retire-wipe.md) |
| Delete (Deregister) | Physical device unchanged | Both | [02-retire-wipe.md](../device-operations/02-retire-wipe.md) |
| Tenant Migration | N/A — cross-tenant re-registration | Both | [04-tenant-migration.md](../device-operations/04-tenant-migration.md) |

## Already Wiped or Decommissioned?

If the device has already been wiped or decommissioned and you just need to clean up the Intune record, use **Delete** (Deregister). Delete removes the Intune device record and Autopilot registration without affecting the physical device state.

See [Retire and Wipe](../device-operations/02-retire-wipe.md) — Step-by-Step: Delete (Deregister).

## Hybrid Entra Joined Devices

> **Note:** Autopilot Reset is **not supported** for hybrid Entra joined devices. If the device is hybrid joined and you need a clean slate, use **Wipe**. After wipe, the device re-enrolls as hybrid joined if the Group Policy hybrid join configuration is still in place.

---

## See Also

- [Device Operations Overview](../device-operations/00-overview.md) — All post-enrollment device management guides
- [Initial Triage Decision Tree](00-initial-triage.md) — Troubleshooting enrollment failures (not lifecycle actions)

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Initial version |
