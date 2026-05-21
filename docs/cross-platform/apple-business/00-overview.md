---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** This tree covers Apple Business delegated governance on iOS,
<!-- ABAUDIT-02: next line explicitly declares Intune-side surfaces OUT OF SCOPE; C15 regex 4 false-positive exemption (scope disclaimer is the inverse of an Intune-delegation anti-pattern) per AEAUDIT-04 precedent -->
> iPadOS, and macOS Apple-managed devices. Microsoft Intune-side surfaces (RBAC, scope tags,
> admin role assignments within Intune) are out of scope per Q5(b); see the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md) for terminology canon.

> **Rebrand notice (2026-04-14):** Apple Business Manager (ABM) became **Apple Business** on
> 2026-04-14. This documentation uses the new terminology throughout. Legacy term "Apple Business
> Manager" is searchable via the [Apple Business Governance Glossary](../../_glossary-apple-business.md)
> rebrand-mapping table. See also: Apple's [transition announcement](https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web).

# Apple Business Governance Overview

This index covers the foundational Apple Business delegated governance documentation for v1.6.
Guides establish the terminology canon, role and permission model, Organizational Unit (OU)
architecture, and the L1 admin-directory lookup convention. Delegation runbooks and L1/L2
routing build on this foundation in Phases 64-65.

Coverage boundary: Apple Business is the Apple-owned permission surface for Apple-managed
<!-- ABAUDIT-03: next line explicitly contrasts Apple Business with Intune-side RBAC to clarify distinct surfaces; C15 regex 4 false-positive exemption (disambiguation clause, not conflation) per AEAUDIT-04 precedent -->
devices (iOS / iPadOS / macOS). It is distinct from Intune-side RBAC (which controls
Intune's MDM surface). The two surfaces interact at device-policy enforcement boundaries but
have separate role/permission models.

## Governance Foundation

This section establishes the Apple Business terminology canon, role/permission model, OU
architecture, and L1 admin-directory lookup convention. Downstream phases (delegation runbooks,
L1/L2, hub nav) cite these foundation docs as Source of Truth.

| Guide | Covers |
|-------|--------|
| [Apple Business Governance Glossary](../../_glossary-apple-business.md) | Terminology canon (8-pair rebrand mapping; 4 H2 categories) |
| [Role/Permission Model](01-role-permission-model.md) | 4 top-level roles + 5 preset custom roles + per-permission catalog + OP-2/OP-3 callouts |
| [Organizational Units Architecture](02-ous-architecture.md) | OU primitive + scoping table + Locations→OUs migration framing |
| [L1 Admin Directory (Lookup Convention)](_admin-directory.md) | Tenant-fillable lookup template for "which admin owns this device pool" |

## Downstream Phases

Phase 62 establishes the foundation layer. Subsequent phases build on these docs:

| Phase | Scope | Key Deliverables |
|-------|-------|-----------------|
| Phase 63 | Sub-organization admin workflows | Custom role authoring, OU onboarding, device lifecycle, Apple TV |
| Phase 64 | Delegation runbooks | MDM server reassignment, audit log scoping, cross-org boundary cheat sheet |
| Phase 65 | L1/L2 routing + hub navigation | L1 #34 Shared iPad passcode reset; hub nav entries |
| Phase 66 | Terminal re-audit | Fresh-worktree v1.6 harness exit 0; BASELINE_10 refresh |

Hub navigation entries for Apple Business are a Phase 65 deliverable; Phase 62 does not modify
any hub files (`docs/operations/00-index.md`, `docs/quick-ref-l1.md`, `docs/common-issues.md`).

## Style Guide: HTML-Comment Allowlist Exemptions

For v1.6 Apple Business documentation that legitimately discusses both Apple Business surfaces
AND Intune surfaces (e.g., the future `18-cross-org-boundary-cheat-sheet.md` disambiguation
table in Phase 64), the audit harness's C15 banned-phrase guard provides an allowlist exemption
via HTML comments in this form:

```html
<!-- ABAUDIT-01: intentional Apple-Business-vs-Intune disambiguation table; C15 false-positive allowlisted -->
```

Rules:

- **Numbering:** `ABAUDIT-01`, `ABAUDIT-02`, ... sequentially across the v1.6 corpus.
- **Intent line:** one-sentence rationale describing why C15 would otherwise flag this content.
- **Placement:** the HTML comment immediately precedes the line(s) the exemption covers.
- **Removal contract:** C15 exemptions do NOT have a `sunset_phase` field (unlike
  `c16_missing_endpoint_exemptions` in the sidecar JSON); C15 exemptions persist for the lifetime
  of the published doc.

This convention is **published in Phase 62**. Actual exemption blocks ship in Phase 64
`18-cross-org-boundary-cheat-sheet.md`; no Phase 62 doc requires C15 exemptions at landing time.

Precedent: v1.4.1 AEAUDIT-04 HTML-comment exemption pattern.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 62: tree founded; rebrand callout #1; style-guide HTML-comment convention published | -- |
