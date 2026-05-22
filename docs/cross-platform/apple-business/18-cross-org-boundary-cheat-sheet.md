---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: ios+ipados+macos+tvos
---

> **Platform applicability:** This document covers the cross-organizational responsibility
> boundary between Apple Business and Microsoft Intune for Apple-managed device governance
> (iOS, iPadOS, macOS, tvOS). It is the canonical source-of-truth disambiguation table
> (DELEG-08) that all Phase 64 delegation runbooks (`11-`–`17-`) forward-link to.
> This cheat sheet does NOT carry a scope-boundary callout pointing to itself — it IS the SOT.

> **Training-data notice:** Capability ownership assignments and integration-layer descriptions
> are authored from AI training knowledge of Apple Business portal behavior and Microsoft Intune
> documentation as of the pre-2026-04-14 rebrand, cross-referenced against research/STACK.md §6
> and the C15 guard semantics. Rows marked `[CITED: training; needs live verification]` reflect
> areas where live portal verification of exact UI labels or behavior may be needed.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# Cross-Org Boundary Cheat Sheet (Apple Business vs. Intune)

This table disambiguates which capabilities belong to **Apple Business** (the Apple-owned
permission surface), which belong to **Microsoft Intune** (the MDM/endpoint management surface),
and which live in the **integration layer** between the two. Use this as the authoritative
reference when a delegation runbook says "out of scope" for the Apple Business surface.

**Reading the table:**
- **Apple Business owns** — action is performed in the Apple Business portal; Apple Business
  permissions control who can perform it.
- **Intune owns** — action is performed in Microsoft Intune; Intune governs who can perform it.
- **Integration layer** — the handoff point or artifact shared between the two surfaces;
  ownership context depends on which step of the workflow is being performed.

---

## Capability Ownership Table

| Capability | Apple Business owns | Intune owns | Integration layer |
|------------|--------------------|-----------|--------------------|
<!-- ABAUDIT-17: next line documents the Intune-side VPP token upload step as an Intune admin action involving the content token; C15 regex 8 false-positive exemption (factual ownership statement: Intune admin uploads the downloaded content token — this is the Intune-side step, not an Apple Business permission claim) -->
| **VPP catalog management** | Content token creation and per-OU scoping; app purchasing ("Apps and Books"); license assignment (device-licensed and user-licensed); license transfer between OUs (up to 24,999 unassigned per transfer); payment method per OU | Intune admin uploads the downloaded content token at `Tenant administration > Connectors and tokens > Apple VPP tokens`; Intune-side app assignment to devices/users after token upload | Content token artifact (Apple calls it "content token"; Intune labels it "Apple VPP token" — same cryptographic credential); token upload step bridges Apple Business → Intune |
<!-- ABAUDIT-18: next line documents that Shared iPad partition passcode reset via MDM path requires Intune RBAC to issue MDM commands; C15 regex 1 false-positive exemption (factual ownership statement: the MDM passcode commands are gated by Intune RBAC, clearly outside Apple Business permission surface) -->
| **Shared iPad passcode reset** | Per-user Managed Apple Account passcode reset (Path A — "Reset Shared iPad Passcode" People permission, OU-scoped, L1-delegatable); the ONLY method that resets the per-user partition passcode | MDM ClearPasscode and MDM EraseDevice commands (Paths B/C); requires Intune RBAC to issue MDM device commands; these affect the device-level passcode, NOT the per-user partition passcode — a critical anti-feature distinction | MDM command channel (Apple Business creates the Managed Apple Account; Intune issues MDM commands via push certificate) |
| **Device release from ADE** | "Release Devices" action in Devices sidebar — deletes the device-to-MDM-server binding in Apple's DEP backend; soft-delete semantics (supervision persists until next factory reset) | Receives MDM notification of device release from Apple; device continues to report to Intune until factory reset | ADE (Automated Device Enrollment) backend — Apple owns the binding record; Intune reads the enrollment outcome |
<!-- ABAUDIT-19: next line documents that Intune config profile assignment is an Intune-owned authority that survives Apple Business OU transfers; C15 regex 4 false-positive exemption (factual ownership statement: Intune-side config profile assignment is outside the Apple Business permission surface — this is the Apple Business vs Intune responsibility boundary for device configuration) -->
| **Cross-OU device transfer** | Device Location (OU) reassignment in Apple Business Devices sidebar; VPP device-licensed apps STOP working after transfer (license is source-OU-scoped — must be revoked and re-assigned from target OU) | Intune-side config profile assignment authority: profiles survive OU transfer because Intune is the assignment authority, not Apple Business; enrollment profile does NOT follow device | Apple Business OU determines enrollment profile and default MDM server; Intune holds config profile assignment independently [CITED: training; needs live verification] |
| **MDM server reassignment** | Selects which MDM server receives newly enrolled devices per OU (default MDM server assignment); bulk device-to-server reassignment via Devices sidebar | Re-enrollment of devices after factory reset (legacy path) or in-place migration (OS 26+ path); receives device re-enrollment requests from ADE | ADE device-to-server binding — Apple Business updates the binding; Intune (as the target MDM) receives the enrollment |
<!-- ABAUDIT-20: next line documents that Intune enrollment is a downstream consumer of Managed Apple Accounts and not the provisioning authority; C15 regex 4 false-positive exemption (factual ownership statement: Intune-side enrollment consumes the Managed Apple Account provisioned by Apple Business and Entra, clarifying that the provisioning surface belongs to Apple Business, not Intune) -->
| **Managed Apple Account provisioning** | Manual account creation (People > Add Account); SCIM provisioning endpoint (`https://federation.apple.com/feeds/business/scim`); OIDC + JIT federation via Microsoft Entra ID; account-to-OU assignment | Intune-side enrollment uses the resulting Managed Apple Account for user-affinity enrollment and account-driven User Enrollment; no provisioning role — Intune is a downstream consumer of the account | Microsoft Entra ID acts as identity provider for SCIM sync and OIDC federation; the Entra Enterprise App "Apple Business Manager" gallery app bridges identity from Entra to Apple Business |
<!-- ABAUDIT-23: next line references "Intune admin center" as the access point for Intune-side audit surfaces, distinct from Apple Business Activity logs; C15 regex 8 false-positive exemption (factual disambiguation: "Intune admin center" is the name of the Intune portal — this row explains that audit log access in Intune is a separate surface from Apple Business, clarifying the boundary, not conflating the two) -->
| **Audit log access** | Activity sidebar in Apple Business portal — filter by category, event name, date range; Download Logs exports filtered set; "Read log files" permission (Logs / Activity group) controls access; logs are scoped to author's OU (OP-14 author-scope semantics) | Intune device audit logs, compliance reports, and device diagnostic data are separate Intune-side surfaces — accessed in Intune admin center, not Apple Business portal | No shared audit surface; Apple Business and Intune maintain independent log stores; SIEM is the recommended convergence point for unified retention (OP-13) |
<!-- ABAUDIT-21: next line documents that Intune admin performs the content token upload step using the downloaded token; C15 regex 8 false-positive exemption (factual workflow step: the Intune admin role is the actor for the upload side of this integration; this clarifies that the download surface belongs to Apple Business, the upload surface belongs to Intune) -->
| **Content token download** | "Download content tokens" permission (Apps & Books group, OU-scoped) — sub-org admin downloads the token from Apple Business portal | Intune admin uploads the downloaded token at `Tenant administration > Connectors and tokens > Apple VPP tokens` to activate VPP licensing in Intune | The content token file is the integration artifact; Apple Business produces it, Intune consumes it; the two upload steps are separate actions on separate portals |
<!-- ABAUDIT-22: next line documents that Intune enrollment profiles and device configuration are Intune RBAC-gated surfaces outside Apple Business scope; C15 regex 1 false-positive exemption (factual ownership statement: enrollment profile assignment and device configuration policy are Intune RBAC-controlled surfaces — the table row explains this is outside the Apple Business permission surface) -->
| **Enrollment profile assignment (Intune-side)** | Apple Business-side: ADE enrollment profile assignment scoped to OU (determines MDM server, supervision flags, app pre-loads) — this is the Apple-side enrollment profile | Intune enrollment profiles, device configuration profiles, and compliance policies are Intune RBAC-gated; fully outside the Apple Business permission surface | ADE token (MDM push certificate) bridges Apple Business OU enrollment profile → Intune MDM enrollment; devices enrolled via ADE receive both the Apple Business-side ADE profile and Intune-assigned configuration profiles |

---

## Key Disambiguation Notes

### "Content token" vs "Apple VPP token"

Apple Business calls the per-OU licensing credential a **content token**. Microsoft Intune
labels the same artifact an **Apple VPP token**. They are the same cryptographic object — a
credential that ties purchased app and book licenses to a specific OU. When following both
portals simultaneously, expect this label difference. All Phase 64 runbooks use Apple's
terminology ("content token").

### Passcode Reset Anti-Feature

The most common misconfiguration: Intune's "Reset Passcode" and "Remove Passcode" remote
actions operate at the **device level** (clearing the device screen-lock passcode). On a
Shared iPad, they do **NOT** reset the per-user Shared iPad partition passcode. The
per-user partition passcode can only be reset via Path A (Apple Business UI — "Reset Shared
iPad Passcode") or factory wipe. See [12-shared-ipad-passcode-reset.md](12-shared-ipad-passcode-reset.md)
for the full 3-path decision matrix.

### Author-Scope vs Target-Scope (Audit Logs)

Apple Business audit log entries are scoped to the **author's OU**, not the target resource's
OU. A sub-org admin for OU-A who transfers a device to OU-B generates an audit entry visible
to OU-A's admin (the author) and to tenant-wide admins — but potentially NOT visible to OU-B's
admin (the target-OU admin). This is the OP-14 author-scope semantic. See
[17-audit-log-scoping-runbook.md](17-audit-log-scoping-runbook.md) for the full scoping model.

### VPP License + OU Transfer Interaction

When a device is transferred between OUs in Apple Business, **VPP device-licensed apps stop
working immediately** because the license is tied to the source OU's content token. Apps must
be explicitly revoked from the source OU (observed 30-day grace period for managed devices)
and re-assigned from the target OU's catalog. Enrollment profiles and Intune-managed
configuration profiles are NOT affected by the Apple Business OU transfer — they follow
different assignment authorities. See [14-device-transfer-runbook.md](14-device-transfer-runbook.md)
for the full 4-cell impact matrix.

---

## Verification

After reviewing this cheat sheet:

- **Confirm capability ownership before opening a ticket:** Check the table to identify
  whether the action you need is performed in the Apple Business portal or in Intune admin
  center. Opening an Intune ticket for an Apple Business-owned action (or vice versa) is the
  most common misdirection.
- **For detailed runbooks on each capability:** Follow the forward links in the table rows
  or navigate to the individual runbooks (`11-`–`17-`) in this directory.
- **For permission catalog details:** See [01-role-permission-model.md](01-role-permission-model.md)
  for Apple Business role and permission definitions.
- **For terminology canon:** See the
  [Apple Business Governance Glossary](../../_glossary-apple-business.md) for rebrand mapping,
  role names, and architectural terms.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 64 plan 64-05: initial authoring — canonical Apple-Business-vs-Intune disambiguation table (DELEG-08); 9-row capability table with line-pair-scoped ABAUDIT-17..ABAUDIT-22 exemptions for C15 compliance; D-02 SOT (no self-referential scope-boundary link) | -- |
