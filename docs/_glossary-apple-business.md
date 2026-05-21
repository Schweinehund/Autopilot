---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: all
platform: ios+macos
---

> **Apple Business governance:** This glossary covers Apple Business delegated permission and
> governance terminology introduced with the 2026-04-14 Apple Business launch (formerly Apple
> Business Manager). For Apple platform provisioning terminology (ADE, Supervision, VPP, APNs,
> ABM), see the [Apple Provisioning Glossary](_glossary-macos.md).
>
> See also: [Windows Autopilot Glossary](_glossary.md) · [Android Enterprise Glossary](_glossary-android.md) · [Linux Provisioning Glossary](_glossary-linux.md)

# Apple Business Governance Glossary

## Rebrand Mapping Table

The following terms were renamed as part of Apple's 2026-04-14 rebrand of Apple Business Manager → Apple Business. Both legacy and new terms are searchable in this glossary; each entry's H3 slug uses the NEW term only (legacy term appears parenthetically in the entry body per first-mention convention).

| Legacy term | New term | Effective date | Where used in v1.6 docs |
|-------------|----------|----------------|------------------------|
| Apple Business Manager (ABM) | Apple Business | 2026-04-14 | All v1.6 Apple-side references |
| Location | Organizational Unit (OU) | 2026-04-14 | `02-ous-architecture.md`, all delegation runbooks |
| privilege | permission | 2026-04-14 | `01-role-permission-model.md` |
| Managed Apple ID | Managed Apple Account | 2024 (predates Apple Business rebrand) | `_glossary-macos.md`, federation runbook |
| VPP location token | content token | 2026-04-14 | `01-role-permission-model.md`, VPP runbook |
| People Manager (built-in role) | People Manager (preset custom role) | 2026-04-14 | `01-role-permission-model.md` |
| Device Enrollment Manager (built-in) | Device Enrollment Manager (preset) | 2026-04-14 | `01-role-permission-model.md` |
| Content Manager (built-in) | Content Manager (preset) | 2026-04-14 | `01-role-permission-model.md` |

## Alphabetical Index

[Account Holder](#account-holder) | [Apple Business](#apple-business) | [Apple Business Token](#apple-business-token) | [Audit Log](#audit-log) | [Content Administrator](#content-administrator) | [Content Manager](#content-manager) | [Content Token](#content-token) | [Custom Role](#custom-role) | [Device API Manager](#device-api-manager) | [Device Enrollment Manager](#device-enrollment-manager) | [Federation Collision](#federation-collision) | [IT Administrator](#it-administrator) | [Managed Apple Account](#managed-apple-account) | [OIDC+JIT](#oidcjit) | [Organizational Unit](#organizational-unit) | [OU Scope](#ou-scope) | [People Administrator](#people-administrator) | [People Manager](#people-manager) | [SCIM Provisioning](#scim-provisioning) | [Sub-OU](#sub-ou) | [Sub-Org Admin](#sub-org-admin)

---

## Roles & Permissions

### Account Holder

The tenant-level Apple Business owner with irrevocable lockout-recovery authority. The Account Holder role is the sole role that can recover an Apple Business tenancy after all IT Administrators are locked out; it cannot be delegated to a sub-organization admin (see [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md#account-holder-do-not-delegate) for the OP-2 / DA-2 pitfall callout). The Account Holder Managed Apple Account must use a dedicated email address that is NOT shared with any IT Administrator account to prevent single-point-of-lockout. Apple article: [axm97dd59159](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web).

> **DO NOT DELEGATE:** The Account Holder role must be held by a named individual (not a shared mailbox, not a service account) per the OP-2 prevention strategy in `.planning/research/PITFALLS.md`. Delegating or sharing the Account Holder Managed Apple Account is the single highest-severity operational risk in Apple Business administration.

### Apple Business

The post-2026-04-14 name for what was previously called Apple Business Manager (ABM). Apple Business is the all-in-one web portal accessed at [business.apple.com](https://business.apple.com) for managing device enrollment (ADE), app distribution (Apps and Books / VPP), Organizational Units, Managed Apple Accounts, and delegated role assignments across an organization's Apple device fleet. See the Rebrand Mapping Table at the top of this file for the full set of renamed terms. For ABM provisioning terminology (ADE token, VPP token, APNs certificate, Supervision), see the [Apple Provisioning Glossary](_glossary-macos.md#abm-apple-business-manager). Apple article: [axmd79d79dea](https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web).

> See also: [ABM](_glossary-macos.md#abm) in the Apple Provisioning Glossary for legacy ABM provisioning surface terminology (ADE, Supervision, ABM token) that remains unchanged despite the portal rename.

### IT Administrator

The second top-level role in Apple Business, providing mid-tier permissions across all Apple Business sub-surfaces. IT Administrators can manage Organizational Units (OUs), assign MDM servers, manage content tokens, create and manage Managed Apple Accounts, and perform most day-to-day Apple Business administration tasks. IT Administrator permissions are organization-wide by default and cannot be scoped to a single OU — OU-scoped administration requires a sub-org admin Custom Role assignment. Multiple IT Administrators can be assigned to a single Apple Business tenant; unlike the Account Holder role, the IT Administrator role is designed to be assigned to multiple staff members and is the appropriate role for most infrastructure and device-management engineers. See [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md) for the full permission set across all 7 Apple Business permission subgroups. Apple article: [axm97dd59159](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web).

### People Administrator

The third top-level role in Apple Business, scoped to people and account management. People Administrators can create, update, and remove Managed Apple Accounts across the organization; they cannot manage devices, OUs, content tokens, or MDM servers. Use this role for IT staff who manage user onboarding / offboarding without needing device-management authority. Permissions are organization-wide; the People Manager preset custom role is the OU-scoped analog. Apple article: [axm97dd59159](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web).

### Content Administrator

The fourth top-level role in Apple Business, scoped to content and app distribution (Apps and Books / VPP). Content Administrators can purchase and assign app licenses via content tokens, manage Apple Business token assignments, and administer the Apps and Books surface. They cannot manage users, OUs, MDM servers, or devices. Use for app-management staff who do not need people-management authority. The Content Manager preset custom role is the OU-scoped analog. Apple article: [axm97dd59159](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web).

### People Manager

People Manager (formerly built-in role; now a preset custom role per 2026-04-14 rebrand) is a pre-defined Custom Role template in Apple Business that scopes people-management permissions to a specific Organizational Unit. Unlike the organization-wide People Administrator top-level role, a People Manager assignment is bound to an OU — the assigned admin can only manage Managed Apple Accounts within that OU. This role is the standard starting point for delegating OU-level people management to Sub-Org Admins. See [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md) for the full preset permission list. Apple article: [axm97dd59159](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web).

### Content Manager

Content Manager (formerly built-in role; now a preset custom role per 2026-04-14 rebrand) is a pre-defined Custom Role template in Apple Business that scopes content-management permissions (Apps and Books / VPP) to a specific Organizational Unit. The assigned admin can purchase, assign, and revoke app licenses for devices within their OU's content token scope, but cannot act on other OUs' content tokens. This role is the standard starting point for delegating OU-level content distribution to Sub-Org Admins. See [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md). Apple article: [axme0f8659ec](https://support.apple.com/guide/apple-business-manager/manage-content-tokens-axme0f8659ec/web).

### Device Enrollment Manager

Device Enrollment Manager (formerly built-in role; now a preset custom role per 2026-04-14 rebrand) is a pre-defined Custom Role template in Apple Business that scopes device enrollment and MDM-server assignment permissions to a specific Organizational Unit. The assigned admin can assign devices to MDM servers within their OU and manage ADE token pairing for that OU, but cannot manage devices in other OUs. Use this preset as the starting point for delegating OU-level device provisioning. See [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md). Apple article: [axm97dd59159](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web).

### Device API Manager

Device API Manager is a preset custom role in Apple Business providing programmatic access to the Apple Business Device API (OAuth-scoped). As of 2026-04-14, Apple has not yet published a dedicated `developer.apple.com` landing page for the Device API Manager surface; this entry acknowledges the role's existence in Apple Business but does not document its permission set in depth. Full coverage is deferred to v1.7+ when Apple's developer documentation is expected to be complete. Admins requiring Device API access should consult the Apple Business User Guide directly for the current permission set. The Device API Manager preset is distinct from the Apple Business Token (see [Apple Business Token](#apple-business-token) in the Content Distribution section) — the preset role grants a user the ability to manage Device API integrations, while the Apple Business Token is the OAuth credential the API integration itself uses for authentication.

### Custom Role

A Custom Role in Apple Business is a named permission bundle built from a combination of preset role templates plus additional individual permission grants, assigned to a specific Organizational Unit. Custom Roles are the mechanism for OU-scoped delegation — an admin assigned a Custom Role can only exercise the granted permissions within the scope of the assigned OU. Custom Roles CANNOT be based on or derived from the Account Holder role (the anti-elevation invariant per OP-2 prevention in `.planning/research/PITFALLS.md`). Custom Roles that grant Edit permissions without the corresponding View permissions will fail silently — see the Edit-without-View dependency table in [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md#edit-without-view-dependency-table) for the full dependency mapping (OP-3 prevention). Apple article: [axm97dd59159](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web).

### Sub-Org Admin

A Sub-Org Admin is an IT Administrator or Managed Apple Account holder assigned a Custom Role (typically built from People Manager, Content Manager, or Device Enrollment Manager presets) scoped to one or more Organizational Units. The Sub-Org Admin concept enables multi-org operations where different organizational units are administered by different teams without granting organization-wide authority. To resolve which admin owns a given device pool or OU, use the lookup convention in [cross-platform/apple-business/_admin-directory.md](cross-platform/apple-business/_admin-directory.md) (Phase 62 AB-07 deliverable). Sub-Org Admins cannot self-elevate to Account Holder or IT Administrator roles — any escalation requires the Account Holder to re-grant at the tenant level.

---

## Organizational Units

### Organizational Unit

Organizational Unit (OU) (formerly Location in Apple Business Manager) is the primary administrative boundary in Apple Business. OUs are used to partition devices, content tokens (formerly VPP location tokens), MDM server assignments, and user accounts into independently administrable groups. Apple Business ships with a default flat OU structure; sub-OUs are supported for organizations needing a second level of hierarchy. Each OU carries its own set of delegated Custom Role assignments, its own content tokens, and its own MDM server bindings — see [02-ous-architecture.md](cross-platform/apple-business/02-ous-architecture.md) for the full OU scoping model and delegation tree. Apple article: [axm79d79dea](https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web).

> **Cross-platform note:** OUs in Apple Business are not the same as Active Directory Organizational Units or Entra ID Management Units. Apple Business OUs are purely an Apple-side administrative construct that maps to your organization's logical structure. Intune-side policy scoping (via Entra groups and assignment filters) is a separate layer — see the Intune-Apple terminology mapping in [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md#intune-side-labels-preserved).

### Sub-OU

A Sub-OU is a second-level Organizational Unit nested under a top-level OU in Apple Business. Legacy Apple Business Manager (ABM) supported one level of nesting (Location → sub-Location); Apple Business continues to support at least one nesting level. Definitive depth verification (whether Apple Business supports deeper nesting beyond 2 levels) is deferred to Phase 63 portal verification — see `.planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md` deferred items. Sub-OUs inherit the parent OU's MDM server bindings unless explicitly overridden; Custom Role assignments and content token scoping apply independently at each level. When planning delegation hierarchies for large organizations, design Sub-OU boundaries around operational teams (e.g., geography, business unit) rather than technical criteria — Apple Business does not support more than one or two nesting levels, so deep hierarchical delegation designs must use multiple top-level OUs instead. See [02-ous-architecture.md](cross-platform/apple-business/02-ous-architecture.md) for the nesting model and practical design guidance.

### OU Scope

OU Scope refers to the 5-resource scope boundary that an Organizational Unit controls in Apple Business: (1) Devices — which physical devices are assigned to this OU; (2) Content Tokens — which content tokens (VPP pools) are bound to this OU; (3) MDM Servers — which MDM server assignments apply to devices in this OU; (4) Managed Apple Accounts — which user accounts are homed in this OU; (5) Role Assignments — which Custom Role delegates have authority in this OU. Understanding OU Scope is prerequisite to delegation design — a Sub-Org Admin's effective authority is exactly the intersection of their Custom Role permissions and their OU's scope. OU Scope is an Apple-side construct only; it does not map to Entra ID scope boundaries or Intune assignment filter scopes. A device's Apple-side OU membership and its Intune-side Entra group membership are independent axes of administrative control and must be kept in sync manually (or via automation) during device reassignments. Cross-OU device moves (moving a device from one OU to another) are an IT Administrator or Account Holder operation and may require MDM server reassignment if the source and destination OUs use different MDM server bindings. See [02-ous-architecture.md](cross-platform/apple-business/02-ous-architecture.md#ou-scope-coverage) for the scoping matrix and the cross-OU device-move runbook (forthcoming Phase 64).

---

## Content Distribution

### Content Token

Content token (formerly VPP location token in Apple Business Manager) is the OU-scoped authentication token issued by Apple Business that enables app license purchases and assignments via the Apps and Books surface. Each Organizational Unit can hold one or more content tokens; a single content token cannot span multiple OUs. Content tokens have a 1-year validity period and must be renewed annually — a lapsed content token stops app assignment for all devices in that OU. Content tokens replace the previous VPP location token model as of 2026-04-14; the Intune admin center UI label "Apple VPP tokens" remains unchanged on the Intune side (see [_glossary-macos.md](_glossary-macos.md#vpp) for the Intune-side label). Forward-reference: content token lifecycle runbook is forthcoming in Phase 64. Apple article: [axme0f8659ec](https://support.apple.com/guide/apple-business-manager/manage-content-tokens-axme0f8659ec/web).

> **Intune-side label preserved:** Intune admin center continues to display "Apple VPP tokens" under `Tenant administration > Connectors and tokens > Apple VPP tokens`. This is an intentional Intune-side label lag (CI-2 / CI-3 pattern per `.planning/research/PITFALLS.md`). Do not rename Intune UI labels in admin documentation — annotate the discrepancy parenthetically where needed.

### Managed Apple Account

Managed Apple Account (formerly Managed Apple ID; renamed 2024, predates Apple Business rebrand) is the organization-owned Apple identity for employees and students in Apple Business. Managed Apple Accounts are provisioned by the organization (via Apple Business direct creation, SCIM provisioning, or federation) and are homed in an Organizational Unit. They grant the user access to Apple platform services (iCloud for Work, FaceTime for Work, App Store purchases) under organizational control. Managed Apple Accounts are required for Account-Driven User Enrollment (BYOD) and are the identity surface for federated sign-in (OIDC+JIT or SCIM).

> See also: [Managed Apple ID](_glossary-macos.md#managed-apple-id) in the Apple Provisioning Glossary for the provisioning and enrollment-flow context (renamed 2024, predates Apple Business rebrand).

### Apple Business Token

The Apple Business Token is the API-level OAuth-scoped token used by the Apple Business Device API and integration surfaces (not to be confused with content tokens or ABM tokens). Apple Business Tokens carry explicit OAuth scope identifiers and are subject to revocation. Per the OP-1 DENY-by-default framing in `.planning/research/PITFALLS.md`, Apple Business Token revocation results in an immediate loss of API access across all integrations bound to that token — plan for rotation runbooks before provisioning API integrations. As of 2026-04-14, documentation of the full Apple Business Token OAuth scope list is pending Apple developer portal publication. Token management is assigned to administrators holding the Device API Manager preset custom role (see [Device API Manager](#device-api-manager) in the Roles & Permissions section). Organizations should establish a break-glass procedure for Apple Business Token rotation before deploying any Device API integration in production — an unplanned token revocation (e.g., from a security incident) with no rotation runbook in place will halt all API-dependent automation until the token is manually reprovisioned by an authorized admin.

---

## Federated Identity & Governance Operations

### SCIM Provisioning

System for Cross-domain Identity Management (SCIM) Provisioning is the automated user-account provisioning protocol supported by Apple Business for populating Managed Apple Accounts from a corporate IdP (Entra ID, Okta, or compatible SCIM 2.0 providers). SCIM provisioning in Apple Business is per-OU — each OU can have an independent SCIM token with its own renewal cadence (Apple recommends rotating SCIM tokens on a schedule aligned with your organization's secret-rotation policy). The SCIM endpoint is published per tenant in the Apple Business admin portal under Settings > SCIM. SCIM provisioning and OIDC+JIT federation are mutually exclusive deployment patterns; organizations should select one approach per IdP domain. SCIM is preferred for organizations that need accounts pre-seeded in Apple Business before users' first sign-in (for example, to pre-assign device slots or content licenses). OIDC+JIT is preferred when account creation at first sign-in is acceptable and pre-seeding is operationally burdensome. Forward-reference: full SCIM provisioning setup runbook is forthcoming in Phase 64 `16-managed-apple-account-runbook.md`. Apple article: [axmb19317543](https://support.apple.com/guide/apple-business-manager/intro-to-federated-authentication-axmb19317543/web).

### OIDC+JIT

OpenID Connect with Just-in-Time (JIT) provisioning is the federation pattern where Apple Business delegates authentication to a corporate IdP via OIDC; Managed Apple Accounts are created automatically at first sign-in (JIT) rather than pre-provisioned via SCIM. OIDC+JIT is an alternative to SCIM Provisioning — organizations typically choose one or the other based on IdP capabilities and pre-provisioning requirements. JIT provisioning means accounts are not pre-seeded in Apple Business; this simplifies provisioning but requires that the JIT-created account is correctly scoped to an OU at creation time. The OU assignment for JIT-created accounts is governed by claim mapping rules configured in the IdP's Apple Business OIDC application — incorrect claim mapping results in accounts landing in the default OU rather than the intended OU, which can cause content token and MDM server binding mismatches. Before enabling OIDC+JIT in production, verify claim mapping against a test account in a staging OU. See the federation runbook in Phase 64 for the OIDC+JIT OU-assignment configuration and claim-mapping validation procedure. Apple article: [axmb19317543](https://support.apple.com/guide/apple-business-manager/intro-to-federated-authentication-axmb19317543/web).

### Federation Collision

A Federation Collision is a conflict that occurs when an Apple ID (personal or organizational) that an employee previously created is claimed by the same domain being federated in Apple Business. When a tenant domain is federated, all Apple IDs ending in that domain become subject to organizational control — users who created personal Apple IDs with their corporate email address hit the collision. Apple Business surfaces a 60-day grace period for affected users to merge or migrate their personal Apple ID before the domain federation becomes irrevocable. This is the OP-7 callout in `.planning/research/PITFALLS.md` — failing to notify affected users BEFORE federation causes data loss (personal iCloud content irreversibly transferred to organizational control). Apple article: [axmb19317543](https://support.apple.com/guide/apple-business-manager/intro-to-federated-authentication-axmb19317543/web).

> **60-day window:** The grace period is 60 days from the moment domain federation is confirmed. After the grace period, personal Apple IDs on the federated domain are converted to Managed Apple Accounts without further notice. Communicate to all affected users before initiating federation.

### Audit Log

The Apple Business Audit Log records administrative actions taken within Apple Business (role assignments, OU changes, content token operations, device reassignments, federation events). Apple does not publish a retention SLA for Audit Log data; community reports indicate 90–365 days of available history depending on tenant activity volume. For compliance horizons greater than 1 year, configure periodic SIEM export from the Apple Business Audit Log API before the retention window elapses. Forward-reference: audit log scoping and SIEM export runbook is forthcoming in Phase 64 `17-audit-log-scoping-runbook.md`.

> **Retention hedge:** Apple's official documentation does not specify an Audit Log retention period. Do not design compliance workflows that depend on Audit Log availability beyond 90 days without a verified SIEM export pipeline in place.

---

## Terminology Usage Notes

### Intune-Side vs Apple-Side Label Conventions

Apple Business (2026-04-14) renamed several terms while Microsoft's Intune admin center retained the legacy labels. This creates a documentation ambiguity for v1.6 cross-platform runbooks. The canonical convention for v1.6 docs:

- Use **Apple-side new terms** (content token, Organizational Unit, Apple Business, permission) when describing Apple Business portal actions.
- Use **Intune-side verbatim labels** (Apple VPP tokens, Location, Apple Business Manager token, privilege) when describing Intune admin center navigation paths.
- When the two surfaces are described in the same sentence, use a parenthetical: "Select the content token (shown as 'Apple VPP token' in Intune admin center) for this OU."

The CI-2 / CI-3 pitfall categories in `.planning/research/PITFALLS.md` document the full set of label-lag terms that admins commonly confuse when switching between portal contexts.

### Permission vs Privilege

The term "privilege" was replaced by "permission" across Apple Business documentation as of 2026-04-14. In v1.6 docs: always use "permission" when describing Apple Business role grants. The word "privilege" may appear in legacy Apple support articles (pre-2026-04-14); treat as a synonym of "permission" when encountered in older sources. Do not use "privilege" in new v1.6 content unless quoting a legacy Apple article verbatim. The Rebrand Mapping Table at the top of this glossary lists `privilege → permission` as an explicit 2026-04-14 rename; if `c13_rotting_external` quarterly audit flags a pre-2026-04-14 Apple article still using "privilege", annotate the inline citation with `<!-- legacy-term: privilege = permission (2026-04-14 rename) -->` rather than updating the Apple article URL.

### Account Holder vs IT Administrator — Decision Checklist

When provisioning a new Apple Business admin, use the following checklist to determine the correct role:

1. Does this person need lockout-recovery authority?
   → **Account Holder** (maximum one per domain; dedicated Managed Apple Account required).
2. Does this person need organization-wide device + people + content management?
   → **IT Administrator** (appropriate for senior infrastructure engineers).
3. Does this person need OU-scoped device management only?
   → **Device Enrollment Manager** preset Custom Role.
4. Does this person need OU-scoped people/account management only?
   → **People Manager** preset Custom Role.
5. Does this person need OU-scoped content/VPP management only?
   → **Content Manager** preset Custom Role.
6. Does this person need a combination of OU-scoped capabilities?
   → **Custom Role** built from relevant presets.

See [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md) for the full per-permission grant table for each option.

## Threat Notes

### T-62-C: Apple URL Article-ID Stability

Apple article IDs cited in this glossary (e.g., `axm97dd59159`, `axme0f8659ec`, `axmb19317543`, `axmd79d79dea`) are stable Apple-side identifiers. The legacy `support.apple.com/guide/apple-business-manager/` URL path continues to redirect to the new `support.apple.com/guide/business/` path per the 2026-04-14 Apple Business rebrand, so existing article IDs resolve at both URL patterns.

Residual risk: Apple periodically restructures documentation at major platform revisions. The `c13_rotting_external` quarterly audit category (Phase 62 Plan 62-08 deliverable) tracks all Apple article IDs cited in v1.6 docs for URL rot detection. If an article ID in this glossary stops resolving, update the inline reference and log the change in the Version History table.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 62 (Plan 62-02): initial Apple Business Governance Glossary — rebrand-mapping table (8 pairs, 2026-04-14 effective), 4 H2 category sections (Roles & Permissions, Organizational Units, Content Distribution, Federated Identity & Governance Operations), 21 H3 entries with clean slugs per D-04 anchor-stability contract, first-mention parentheticals in body prose (not headings), N-way reciprocal blockquote to 4 sibling glossaries, T-62-C threat residual noted (Apple URL article-ID stability). | — |
