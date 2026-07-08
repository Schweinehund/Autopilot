---
doc_id: RE-212
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
platform: Windows
---

**Platform:** Windows · **Doc Type:** Reference · **Doc ID:** RE-212 · **Status:** Approved

# Device Lifecycle Action Decision Tree

## Summary

Reference decision table for post-enrollment Windows Autopilot (APv1/APv2) device lifecycle actions — Retire, Autopilot Reset, Tenant Migration, Fresh Start, or Wipe. Gates on which personal and organizational data must be preserved, then routes through up to four decision points to the correct action and its operational guide.

> **Version gate:** This decision tree applies to both Windows Autopilot (APv1) and Windows Autopilot Device Preparation (APv2). Actions marked "APv1 only" are not

> available for APv2 devices. For framework identification, see [APv1 vs APv2](../apv1-vs-apv2.md).

## How to Use This Tree

Start here when you need to perform a device management action post-enrollment. Answer the entry point question based on what you want to preserve, and the tree routes you to the correct action within three steps.

## Decision Tree

**LOCKED — 18 (nodes + labeled edges)** — 10 nodes + 8 labeled edges (plus 1 unlabeled entry edge, the root question routing into Q1), independently re-derived from the pre-conversion decision graph (`git show 71be4ab`). All 4 diamonds (Q1-Q4) are represented below; each row traces one complete path from the root question to a terminal action, and no cell collapses more than one incoming labeled edge.

| Path | Q1: Preserve personal data (files, photos, personal apps)? | Q2: Preserve org enrollment + settings (re-use for next user)? | Q3: Same tenant? | Q4: Keep user documents (Home folder)? | Action |
|------|--------------------------------------------------------------|--------------------------------------------------------------------|-------------------|--------------------------------------------|--------|
| Retire | Yes — remove org data only | — (terminal) | — | — | **Retire** — removes org data and policies; personal data preserved. See: 02-retire-wipe.md |
| Autopilot Reset | No | Yes — re-use for next user within same tenant | Yes | — | **Autopilot Reset** — APv1 only. Removes personal files, re-applies org config. See: 01-autopilot-reset.md |
| Tenant Migration | No | Yes — re-use for next user within same tenant | No — different tenant | — | **Tenant Migration** — deregister from Tenant A, re-import to Tenant B. See: 04-tenant-migration.md |
| Fresh Start | No | No — full factory reset | — | Yes — clean OS, keep files | **Fresh Start** — removes OEM bloatware and apps; keeps user documents. See: 02-retire-wipe.md |
| Wipe | No | No — full factory reset | — | No — erase everything | **Wipe** — factory reset, erases everything. Use for lost/stolen or hybrid devices. See: 02-retire-wipe.md |

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

> **Note:** Autopilot Reset is **not supported** for hybrid Entra joined devices. If the device is hybrid joined and you need a clean slate, use **Wipe**.

> After wipe, the device re-enrolls as hybrid joined if the Group Policy hybrid join configuration is still in place.

---

## See Also

- [Device Operations Overview](../device-operations/00-overview.md) — All post-enrollment device management guides
- [Initial Triage Decision Tree](00-initial-triage.md) — Troubleshooting enrollment failures (not lifecycle actions)

---

## Version History

| Date | Change |
|------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed |
| 2026-07-08 | Phase 122 plan 04: converted Mermaid decision graph (Q1-Q4) to a single 5-row ordinal-column decision table (LOCKED — 18, nodes + labeled edges); removed the mermaid fence; enrolled as RE-212, doc_type Reference per D-04(a) directory precedence (decision-trees/* -> Reference despite the `-lifecycle` filename). |
| 2026-04-13 | Initial version |
