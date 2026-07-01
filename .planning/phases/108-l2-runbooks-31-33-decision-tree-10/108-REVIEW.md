---
phase: 108-l2-runbooks-31-33-decision-tree-10
reviewed: 2026-07-01T00:00:00Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - docs/l2-runbooks/31-8021x-log-collection.md
  - docs/l2-runbooks/32-8021x-cert-investigation.md
  - docs/l2-runbooks/33-8021x-radius-eap-investigation.md
  - docs/decision-trees/10-8021x-triage.md
  - docs/l1-runbooks/38-8021x-certificate-failure.md
  - docs/l1-runbooks/39-8021x-radius-reject.md
  - docs/l1-runbooks/40-8021x-server-trust-failure.md
  - docs/l1-runbooks/41-8021x-eap-negotiation-failure.md
findings:
  critical: 2
  warning: 2
  info: 0
  total: 4
status: issues_found
---

# Phase 108: Code Review Report

**Reviewed:** 2026-07-01
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

Reviewed the three new L2 runbooks (#31 log collection, #32 cert investigation, #33 RADIUS/EAP investigation), the 802.1X triage decision tree (#10), and the four L1 runbooks authored in phase 107 (#38–#41). The overall structure is sound: L1→L2 routing is consistent across all files, escalation targets match the spec, channel names correctly avoid the `Dot3Svc/Operational` anti-pattern throughout, EAP type codes are correct (13/25/21), callout vocabulary is consistent for established project conventions, and anchor slugs resolve without double-hyphen issues. Two defects require fixing before this content ships: a broken link pair in #32 (wrong file number for Linux admin setup) and a factual error in #32's EKU/SAN checklist that reverses the trust-store direction for the Issuer chain row.

---

## Critical Issues

### CR-01: Broken link — Linux admin setup referenced as `06-linux.md`, file is `07-linux.md`

**File:** `docs/l2-runbooks/32-8021x-cert-investigation.md:278` and `:382`

**Issue:** Two links in #32 target `../admin-setup-8021x/06-linux.md`. That file does not exist. The actual Linux admin setup file is `docs/admin-setup-8021x/07-linux.md` (confirmed by `docs/admin-setup-8021x/00-overview.md` and the directory listing). `06-linux.md` does not exist — `06-android.md` is the Android guide.

- Line 278 (in the Linux: Certificate Inspection NOTE callout): `[Linux 802.1X Admin Setup](../admin-setup-8021x/06-linux.md)`
- Line 382 (in Related Resources): `[Linux 802.1X Admin Setup](../admin-setup-8021x/06-linux.md)`

Both links will 404 on GitHub.

**Fix:** Replace both occurrences with the correct path:

```markdown
[Linux 802.1X Admin Setup](../admin-setup-8021x/07-linux.md)
```

---

### CR-02: Factual error — EKU/SAN checklist "Issuer chain" row reverses the trust-store direction

**File:** `docs/l2-runbooks/32-8021x-cert-investigation.md:364`

**Issue:** The "Issuer chain" row of the EKU/SAN/Expiry Checklist states in the "What to Verify" column:

> "Root CA that issued the client cert is deployed to the device Trusted Root store and matches RADIUS server's trust anchor"

This is factually wrong. The device's Trusted Root store must contain the **RADIUS server's** root CA (so the supplicant can validate the RADIUS server's certificate during TLS setup). The **client certificate's** root CA must be trusted by the **NPS/RADIUS server**, not the device. An engineer following this guidance would check the device for the client cert's CA when they should be checking the NPS server's trust store — a misdirected investigation.

The "Failure Indicator" column then routes to #33 "for server-name diagnosis," which is also imprecise: the chain failure described here is a server-trust failure (device cannot validate RADIUS server cert), which is primarily covered by #33's Server-Name Validation Failure section and the L1 path via #40. The routing is functional but the root description is wrong.

**Fix:** Update the "Issuer chain" row's "What to Verify" cell to correctly describe the two distinct chain directions:

```markdown
| Issuer chain | (a) The RADIUS server's root CA is deployed to the device Trusted Root
store (via the Intune Trusted Certificate profile) so the supplicant can validate the
server certificate. (b) The root CA that issued the client cert is trusted by the
RADIUS/NPS server (NPS-side trust store — confirm with the RADIUS team, checklist
item 4 in #33). | (a) Missing RADIUS root CA on device → server-trust failure; route
to [#33](33-8021x-radius-eap-investigation.md) server-name validation section. (b)
Client cert's CA not trusted by NPS → RADIUS team must add CA to NPS trust store. |
```

---

## Warnings

### WR-01: Stale phrase in all four L1 runbooks — "#31 is authored" condition is now true

**Files:**
- `docs/l1-runbooks/38-8021x-certificate-failure.md:60`
- `docs/l1-runbooks/39-8021x-radius-reject.md:71`
- `docs/l1-runbooks/40-8021x-server-trust-failure.md:70`
- `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md:80`

**Issue:** All four L1 runbooks contain the macOS signal-confidence callout with the trailing phrase:

> "This signal is flagged for independent re-verification when the L2 log-collection runbook (#31) is authored."

Runbook #31 was authored in this phase. The phrase is now factually incorrect — it implies #31 does not yet exist. A reader will find #31 already exists and wonder why the L1 runbook says it has not been written. The authoritative macOS confidence callout now lives in #31 itself.

**Fix:** In all four L1 runbooks, replace the trailing clause with a forward reference to #31:

```markdown
> **NOTE — macOS signal confidence:** The macOS `com.apple.eapol` unified-log predicate is
> MEDIUM confidence — sourced from community/Jamf references, not yet confirmed against
> official Apple documentation. If it returns no EAPOL entries even with `--last 2h`, try
> the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`.
> See [#31: 802.1X Log Collection](../l2-runbooks/31-8021x-log-collection.md) for the
> authoritative per-platform signal table.
```

---

### WR-02: Non-standard callout label `> **Tool landscape:**` in #31

**File:** `docs/l2-runbooks/31-8021x-log-collection.md:44`

**Issue:** The callout block beginning at line 44 uses the label `> **Tool landscape:**`. The project's approved callout vocabulary is NOTE / WARNING / DANGER / CRITICAL. All other non-prose callouts used in this document set (Platform gate, L1 scope note, Foundation references) are project-established conventions that appear identically across multiple files from prior phases. `> **Tool landscape:**` is unique to this file and does not appear elsewhere — it is an ad hoc label that departs from the established vocabulary.

**Fix:** Change the callout opener to the standard `> **NOTE:**`:

```markdown
> **NOTE:** Each platform's 802.1X supplicant writes to a different log surface.
> Windows uses two dedicated Event Viewer channels ...
```

Alternatively, convert to plain prose under the "Tool Landscape" section heading (line 43 already serves as a section heading), removing the callout syntax entirely.

---

_Reviewed: 2026-07-01_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
