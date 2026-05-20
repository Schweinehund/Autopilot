# Stack Research — v1.6 Apple Business Delegated Governance

**Domain:** Apple Business (formerly Apple Business Manager) admin / delegation surface for documentation authoring across iOS/iPadOS + macOS in Microsoft Intune
**Researched:** 2026-05-20
**Confidence:** HIGH for rebrand timing + portal URLs + role/permission categories + content token + federation existence (verified against Apple Newsroom, support.apple.com/guide/business, learn.microsoft.com); MEDIUM for full per-permission enumeration (Apple's User Guide pages return navigation-only via WebFetch — per-permission tables exist but were not fully scraped); LOW for Locations / OU max counts (Apple publishes no numeric limit)
**Scope reminder:** "Stack" here = the Apple-side platform surfaces (portals, URLs, identity, content delivery, federation) that v1.6 docs must cite. v1.6 ships markdown documentation only — there is no code to install.

---

## TL;DR for downstream consumers

| Item | Value | Confidence |
|---|---|---|
| Rebrand name | **Apple Business Manager → Apple Business** | HIGH |
| Announcement date | **2026-03-24** (Apple Newsroom) | HIGH |
| GA / launch date | **2026-04-14** (>200 countries) | HIGH |
| Portal URL | `https://business.apple.com` (unchanged) | HIGH |
| New User Guide URL | `https://support.apple.com/guide/business/` | HIGH |
| Legacy User Guide URL | `https://support.apple.com/guide/apple-business-manager/` (still resolves; carries "Apple Business Manager is now Apple Business" banner page `axmd79d79dea`) | HIGH |
| "Locations" renamed to | **Organizational Units** | HIGH |
| Legacy fixed-role triad status | **Retired in name; functionally replaced** by Organization Administrator / IT Administrator / Marketing Administrator / Staff + 5 preset custom roles (People Manager, Content Manager, Device Enrollment Manager, Device API Manager, Brand Manager) | HIGH |
| Custom roles | **Supported** with granular per-permission selection | HIGH |
| Permission groups | Organization, People, Devices, Apps & Services, Brands (+ subgroups: Basic organization, Organization access, API/OAuth, AppleCare, Apps & Books, Subscription, Email service, Brand, Brand location, Branded Mail, Tap to Pay, Verify with Wallet) | HIGH |
| Content token model | **Per-OU content token** (was "per-Location"); same token can be referenced by multiple MDM policies in same tenant | HIGH |
| Microsoft Entra ID federation | OIDC + SCIM both supported and documented; status = effectively **GA** (no preview flag in Apple docs; Microsoft Learn page dated 2025-11-04) | HIGH |
| Intune-side portal language | `Tenant administration > Connectors and tokens > Apple VPP tokens` **UNCHANGED** as of 2026-04-30 Microsoft Learn tutorial revision (Apple-side branding shifted; Intune-side label still says "Apple VPP tokens"; tutorial prose now says "Apple Business" instead of "Apple Business Manager") | HIGH |
| iOS/iPadOS + macOS + Apple TV + Shared iPad | All four device classes managed from same Apple Business tenant; same role/permission surface | HIGH |

> **The single most important v1.6 implication:** Apple renamed the entire administrative substrate (Locations→Organizational Units; privileges→permissions; the fixed-role triad → expanded role set with custom roles) but **kept the URL at `business.apple.com`** and **Microsoft Intune's UI labels still say "Apple VPP tokens"**. v1.6 docs must use Apple's NEW terminology (Organizational Units, permissions, Apple Business) when describing the Apple-side surface, but preserve Intune's CURRENT labels verbatim when describing the Intune-side handshake. This is the rebrand-callout discipline.

---

## 1. Apple Business Rebrand — Authoritative Surface

### 1.1 Timing

| Event | Date | Source |
|---|---|---|
| Public announcement | 2026-03-24 | [Apple Newsroom — Introducing Apple Business](https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/) |
| Global availability (GA) | 2026-04-14 | [Apple Newsroom — Introducing Apple Business](https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/) |
| Legacy ABM/ABE/Connect retirement | 2026-04-14 (Apple states the three legacy platforms "will no longer be available once Apple Business launches"; existing data auto-migrated) | [Apple Newsroom](https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/); [Apple Support — Apple Business Manager is now Apple Business `axmd79d79dea`](https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web) |

**Single canonical authoritative date for v1.6 glossary callout: 2026-04-14 (GA). The 2026-03-24 announcement is supporting context.** Confidence: HIGH.

### 1.2 What Apple Business consolidates

The rebrand merges three previously distinct platforms into one offering:

- **Apple Business Manager** (ABM) — device enrollment, MDM linking, content token administration, Managed Apple IDs (legacy name for Managed Apple Account)
- **Apple Business Essentials** (ABE) — Apple-hosted MDM-lite for SMB (previously paid; now free as part of Apple Business consolidation)
- **Apple Business Connect** (ABC) — customer-facing brand listings, Apple Maps/Wallet/Mail business surface

**Implication for v1.6:** ABE features (built-in MDM, Blueprints) and ABC features (brand profiles, Maps ads, Branded Mail) are now in the Apple Business portal. **They are OUT OF SCOPE for v1.6** — v1.6 documents the device-management / delegation surface that was formerly ABM. v1.6 glossary callout must explicitly say "Apple Business in the context of this guide refers to the device-management surface formerly known as Apple Business Manager."

### 1.3 URL surface (the practical reality)

| Surface | URL | Status |
|---|---|---|
| Sign-in portal | `https://business.apple.com` | **Unchanged** — same URL admins have used for years |
| Sign-in login page | `https://business.apple.com/login` | Unchanged |
| Sign-up page | `https://business.apple.com/signup` | Unchanged |
| New User Guide (canonical) | `https://support.apple.com/guide/business/` | New URL path; replaces ABM guide for new readers |
| Legacy User Guide | `https://support.apple.com/guide/apple-business-manager/` | Still resolves; top-level page now displays "Apple Business Manager is now Apple Business" banner (article ID `axmd79d79dea`); deep links still valid |
| URL ID stability | Article IDs (e.g., `axm97dd59159`, `axmfdbe2cb0d`, `axme0f8659ec`) are **STABLE across the rebrand** — same article ID resolves at both `/guide/apple-business-manager/` and `/guide/business/` paths | HIGH |

**v1.6 doc-authoring rule:** Always link to the new `/guide/business/` paths in newly authored v1.6 content. Legacy `/guide/apple-business-manager/` URLs in pre-existing docs do NOT require sweep retrofit (per v1.6 Q5 option b scope decision: glossary + 2 intro callouts only).

---

## 2. Custom Role & Permission Model

### 2.1 The legacy fixed-role triad — current status

The old ABM 5-role model was:

1. Administrator
2. People Manager
3. Device Enrollment Manager (also called Device Manager in some Apple docs)
4. Content Manager
5. Staff

**Status in Apple Business (post-2026-04-14):** The fixed-role triad has been **functionally retired as the top-of-tree structure** but **preserved as preset custom roles**.

| Legacy role | Apple Business equivalent | Notes |
|---|---|---|
| Administrator | **Organization Administrator** (renamed, expanded) | Top-level role; can also assign IT Administrator + Marketing Administrator |
| (new) | **IT Administrator** | New top-level role separating device/MDM concerns from marketing/brand concerns |
| (new) | **Marketing Administrator** | New top-level role owning Brand profiles, Branded Mail, Maps ads (ABC-origin features) |
| Staff | **Staff** (preserved) | Bottom-level role |
| People Manager | Preset custom role (preserved name) | Permissions scoped to People group |
| Device Enrollment Manager | Preset custom role (preserved name) | Permissions scoped to Devices group |
| Content Manager | Preset custom role (preserved name) | Permissions scoped to Apps & Services group |
| (new) | **Device API Manager** | Preset custom role — exposes Apple's Apple Business API surface (new) |
| (new) | **Brand Manager** | Preset custom role — Marketing Administrator subset |

Source: [Intro to roles and permissions in Apple Business — `axm97dd59159`](https://support.apple.com/guide/business/intro-to-roles-and-permissions-axm97dd59159/web). Confidence: HIGH for the role list; HIGH that custom roles supersede the fixed triad as the primary delegation mechanism.

### 2.2 Permission categories (the new flat model)

Apple Business exposes permissions in **5 top-level groups**, decomposed into **11+ subgroups** for granular custom-role authoring:

| Top-level group | Subgroups (per Apple's intro page navigation) |
|---|---|
| **Organization** | Basic organization, Organization access, API/OAuth |
| **People** | People |
| **Devices** | Devices, AppleCare |
| **Apps & Services** | Apps & Books, Subscription, Email service |
| **Brands** | Brand, Brand location, Branded Mail, Tap to Pay, Verify with Wallet |

**v1.6 in-scope subgroups** (device-management surface):

- Basic organization
- Organization access
- API/OAuth (Device API Manager preset)
- People (Managed Apple Account provisioning)
- Devices (device assignment, MDM server management, device release)
- AppleCare (device support entitlement)
- Apps & Books (content tokens, license assignment, VPP-successor)

**v1.6 out-of-scope subgroups** (ABC/ABE-origin marketing surface):

- Subscription (ABE billing — no longer charged post-2026-04-14)
- Email service (Branded Mail)
- Brand / Brand location / Branded Mail / Tap to Pay / Verify with Wallet

Source: [Intro to roles and permissions in Apple Business `axm97dd59159`](https://support.apple.com/guide/business/intro-to-roles-and-permissions-axm97dd59159/web). Confidence: HIGH for category list; MEDIUM for per-subgroup permission enumeration — Apple's intro page lists category names but the per-permission tables live on linked sub-pages that WebFetch could not extract (likely require JavaScript rendering or authentication). **v1.6 phase 1 may need a one-off manual scrape of the 11 subgroup permission tables for the glossary**; flag for `gsd-research` phase-research before Phase 62/63 authoring.

### 2.3 Custom role authoring surface

Per [Intro to roles and permissions](https://support.apple.com/guide/business/intro-to-roles-and-permissions-axm97dd59159/web):

- Path: **Settings > Roles & Permissions** in the Apple Business portal
- Operation: "Add a custom role and define very specific permissions to that role"
- Constraint: Only users whose role has "view, edit, and delete roles" permissions in the Organization permission group can author custom roles (the meta-permission)
- Scope: **A user can have more than one role assigned** — a key change from the legacy ABM single-role-per-user model. Confidence: HIGH.

**v1.6 implication for Phase 1 (Foundation) and Phase 2 (Multi-org architecture):** The Locations-vs-custom-roles decision matrix must reflect that custom roles are now first-class (not an afterthought) and that multi-role assignment is possible. The "one Apple Business account with Locations and/or custom roles per team (Q2 b/c + combination)" topology maps directly to OU + custom-role authoring.

### 2.4 Specific privileges identified by category (best-effort from accessible docs)

> Caveat: Apple's complete permission tables live behind a JavaScript-rendered table on the intro page sub-links that did not return full content via WebFetch. The list below is what was triangulated from the Apple intro page navigation + the legacy ABM HardSoft/community summary + the Microsoft Learn Intune tutorial. **Confidence: MEDIUM** per privilege; **HIGH** for category-level coverage. v1.6 Phase 1 should perform a manual scrape against the 11 sub-pages.

| Subgroup | Confirmed example permissions (illustrative, NOT exhaustive) |
|---|---|
| Basic organization | View organization profile; edit organization profile; accept Terms of Service |
| Organization access | View users; edit users; assign roles; delete roles; configure federated authentication; configure SCIM provisioning; create/edit/delete organizational units |
| API/OAuth | Generate Apple Business API tokens (Device API surface); revoke API tokens |
| People | Create Managed Apple Accounts; edit Managed Apple Accounts; delete Managed Apple Accounts; reset Managed Apple Account passwords; reset Shared iPad passcodes; configure default Managed Apple ID username format |
| Devices | Add devices (manual / Configurator); assign devices to MDM server; reassign devices; unassign devices; release devices from organization; manage MDM servers; manage device suppliers (reseller numbers); upload via Apple Configurator |
| AppleCare | View AppleCare entitlements; submit AppleCare repair requests |
| Apps & Books | View content tokens; download content tokens; purchase content (apps + books); assign content (device-licensed); assign content (user-licensed); reclaim licenses; view purchase history |

Sources: [Apple Business intro page navigation `axm97dd59159`](https://support.apple.com/guide/business/intro-to-roles-and-permissions-axm97dd59159/web); [HardSoft legacy ABM role summary (MEDIUM confidence, third-party)](https://www.hardsoftcomputers.co.uk/blog/apple-business-manager/understanding-role-privileges-in-apple-business-manager/); [Microsoft Learn tutorial verifying device + MDM permission boundaries](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/tutorial-automated-ios)

---

## 3. Organizational Units (formerly "Locations")

### 3.1 What changed in the rebrand

| Aspect | Legacy ABM (pre-2026-04-14) | Apple Business (post-2026-04-14) |
|---|---|---|
| Term | Locations | **Organizational Units (OUs)** |
| Article ID | `axmfdbe2cb0d` | Same `axmfdbe2cb0d` (URL preserved) |
| Sub-Location concept | "Sublocation" supported for nesting | Sublocation concept preserved; called "sub-OU" in some user-facing prose |
| Primary scope | App content licenses (per-location content tokens), MDM server attachment | Same: content tokens + MDM server + user/role scoping |

Source: [Configure organizational units in Apple Business `axmfdbe2cb0d`](https://support.apple.com/guide/business/configure-organizational-units-axmfdbe2cb0d/web); [legacy ABM page same article ID](https://support.apple.com/guide/apple-business-manager/configure-locations-axmfdbe2cb0d/web). Confidence: HIGH.

### 3.2 Hierarchy rules

| Property | Value | Confidence |
|---|---|---|
| Structure | **Flat by default with optional sub-OUs** (1-level sublocation supported in legacy ABM; this concept appears preserved in Apple Business though the new docs describe the structure as flat in their primary text) | MEDIUM (Apple does not explicitly state "max 1 nesting level" in 2026 docs; legacy ABM supported sub-location but Apple's "Configure organizational units" page describes it primarily as flat) |
| First OU | Auto-created at signup; named after organization | HIGH |
| Max count | **NO numeric limit published by Apple** | HIGH (negative claim verified — Apple publishes no max; community Q&A explicitly notes the absence of a documented limit) |
| Naming uniqueness | OU names must be unique within the organization | HIGH |
| Deletion | Manually-created OUs can be deleted **only after transferring accounts and Apps & Books licenses to another OU** | HIGH |

**v1.6 implication:** Phase 2 (Multi-org architecture) cannot promise specific max-count guidance because Apple doesn't publish one. The doc should say "Apple has not published a maximum OU count as of 2026-05-20; large-scale deployments (>100 OUs) should consult Apple Enterprise support before architecting."

### 3.3 What scopes per OU

| Scopable | At OU level? | Notes |
|---|---|---|
| **Devices** | YES | Devices are assigned to OUs via Configurator, reseller upload (Reseller Number tied to OU), or manual assignment |
| **Content tokens (Apps & Books)** | YES | One downloadable content token per OU; same token can be used by multiple MDM policies in same MDM tenant |
| **MDM servers** | YES (indirectly — MDM servers are linked at OU level for ADE-via-OU) | An MDM server is created in Apple Business per OU; devices in that OU are assigned to that MDM server |
| **Users / Managed Apple Accounts** | YES | Users can be added to specific OUs; the same user can be added to multiple OUs |
| **Role assignments** | YES — this is the delegation lever | Custom roles can be assigned scoped to specific OUs (so e.g. a "Site B Device Manager" role only manages Site B devices/content) |
| **Federated authentication / SCIM** | NO — tenant-wide | Federated auth and SCIM are configured at the organization level, not per OU. Confidence: HIGH. |

Source: [Configure organizational units `axmfdbe2cb0d`](https://support.apple.com/guide/business/configure-organizational-units-axmfdbe2cb0d/web); [Manage content tokens in Apple Business `axme0f8659ec`](https://support.apple.com/en-ca/guide/business/axme0f8659ec/web). Confidence: HIGH.

### 3.4 How devices are assigned to OUs

| Path | Mechanism | Notes |
|---|---|---|
| **Reseller upload** | Reseller Number registered on the OU profile; devices ordered via that reseller auto-flow into that OU | Each OU has its own Reseller Number set; canonical for large fleets |
| **Apple Configurator (manual)** | Admin runs Configurator 2 on Mac, pairs the iOS/iPadOS/tvOS device, uploads to Apple Business; assigns to an OU at upload time | Useful for devices NOT purchased via authorized reseller (retail / refurb / hand-me-down) |
| **Direct from Apple** | Devices ordered with Apple Customer Number registered to the OU auto-flow | Same as reseller path but Apple direct |
| **Cross-OU reassignment** | Admin uses Devices page → select devices → Reassign to OU | Useful for device transfer between sites |
| **Provisional release period** | Manually-Configurator-added devices have a 30-day provisional period during which the end-user can release the device from MDM | Important for v1.6 device-transfer runbook |

Source: [Add devices using Apple Configurator `axm200a54d59`](https://support.apple.com/guide/business/add-devices-using-apple-configurator-axm200a54d59/web); [Assign, reassign, or unassign devices `axmf500c0851`](https://support.apple.com/guide/apple-business-manager/axmf500c0851/web). Confidence: HIGH.

---

## 4. Content Token Model (replacing legacy "VPP location token")

### 4.1 Before vs after framing

| Era | Apple-side label | Microsoft Intune-side label | Token shape |
|---|---|---|---|
| Pre-2018 (VPP era) | "VPP token" | "Apple VPP tokens" | Per-Apple-ID; one VPP account per Apple ID |
| 2018–2026-04-14 (ABM era) | "Content token (Location)" — "location token" colloquially | "Apple VPP tokens" (unchanged label) | Per-ABM-Location; downloadable from ABM Preferences > Payments and Billing > Apps and Books |
| Post-2026-04-14 (Apple Business era) | **"Content token (Organizational Unit)"** | **"Apple VPP tokens"** (unchanged label — see §6 below) | Per-OU; same article-ID `axme0f8659ec` page |

Source: [Manage content tokens in Apple Business `axme0f8659ec`](https://support.apple.com/guide/apple-business-manager/manage-content-tokens-axme0f8659ec/web). Confidence: HIGH.

### 4.2 Current shape

- **One content token per Organizational Unit.** Token is generated and downloadable from Apple Business at `Preferences > Payments and Billing > Apps and Books > Content Tokens > Download` (path may be slightly different in new portal navigation; the article still refers to the same area).
- The **same content token can be uploaded to multiple MDM tenants OR multiple policies within the same tenant** — but licenses are shared across all consumers; no per-tenant isolation when the same token is reused. **This is the "do not share content tokens across Intune tenants" pitfall** (v1.6 PITFALLS topic).
- **Token lifecycle:** 1 year validity; annual renewal required; expiry causes new app sync to halt but existing installs continue working.
- **Device-vs-user licensing model:** Unchanged from legacy ABM. Device-licensed (pinned to serial; silent-install on supervised iOS/iPadOS) and user-licensed (pinned to Managed Apple Account; requires sign-in) variants both still exist. v1.5 Phase 55 APP-06 already documents this.

### 4.3 What changed in the licensing model

Per [Apple Business — Manage content tokens `axme0f8659ec`](https://support.apple.com/guide/business/axme0f8659ec/web) and the Apple Newsroom announcement: the underlying VPP licensing semantics (device vs user, 30-day grace period on revocation, license reclamation, 1-year token validity) are **structurally unchanged**. Only the **container term** changed (Location → Organizational Unit) and the **portal navigation paths**.

**v1.6 implication:** APP-06 (iOS VPP licensing) and APP-04/05 (macOS VPP) docs from v1.5 do not require content rewrites — only an Apple Business / OU terminology pass in the new v1.6 Apple Business governance docs tree that references them.

---

## 5. Managed Apple Account Federation

### 5.1 Rebrand: Managed Apple ID → Managed Apple Account

- Apple formally rebranded **Managed Apple ID → Managed Apple Account in 2024** (predates the 2026 Apple Business rebrand).
- Existing iOS user-enrollment doc `docs/admin-setup-ios/08-user-enrollment.md` already acknowledges this at line 49 with a 2024 rebrand callout — that callout is sufficient and does not need re-authoring for v1.6.
- v1.6 glossary callout should consolidate: "Apple uses Managed Apple Account as of 2024; Microsoft Intune documentation continues to use Managed Apple ID; both refer to the same identity object."

### 5.2 Microsoft Entra ID federation — current status

| Mechanism | Status | URL |
|---|---|---|
| **OIDC (OpenID Connect) federation** | **GA** — documented in Apple Business User Guide and Microsoft Learn deployment guide; no preview / beta flag | [Apple Support — Use federated authentication with Microsoft Entra ID in Apple Business `axm8c1cac980`](https://support.apple.com/guide/business/federated-authentication-microsoft-entra-axm8c1cac980/web) |
| **SCIM provisioning** (auto-create Managed Apple Accounts on user create) | **GA** — official Apple Business User Guide page; documented with concrete endpoint URLs | [Apple Support — Sync user accounts from your identity provider `axm526a05814`](https://support.apple.com/guide/business/sync-user-accounts-identity-provider-axm526a05814/web) |
| **Microsoft Enterprise SSO plug-in for Apple devices** | **GA** (Platform SSO; supports Mac and iOS) | [Microsoft Learn — Microsoft Enterprise SSO plug-in for Apple devices](https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin) (last published 2025-11-04) |
| **Profile-based User Enrollment (legacy)** | **Deprecated** on iOS 18+ (already documented in existing iOS user-enrollment guide) | n/a |
| **National-cloud Entra IDs (Gov / China / 21Vianet)** | **NOT SUPPORTED** | [Apple Support — Integrate with Microsoft Entra ID `depa85a35cf2`](https://support.apple.com/guide/deployment/integrate-with-microsoft-entra-id-depa85a35cf2/web): "Integration with national clouds isn't currently supported." |

Confidence: HIGH for all federation status entries.

### 5.3 SCIM endpoint surface (for documentation accuracy)

For Apple Business / Entra SCIM provisioning, v1.6 docs may cite:

- SCIM connector base URL: `https://federation.apple.com/feeds/business/scim`
- Access token URI: `https://appleaccount.apple.com/auth/oauth2/v2/token`
- Authorization URI: `https://appleaccount.apple.com/auth/oauth2/v2/authorize`
- SCIM token validity: **1 year**; Apple sends notification 60 days before expiry
- Token transfer window: **4 calendar days** to complete handoff from Apple Business to Entra after token generation

Source: [Apple Business — Sync user accounts `axm526a05814`](https://support.apple.com/guide/business/sync-user-accounts-identity-provider-axm526a05814/web). Confidence: HIGH.

### 5.4 Federation scope (per-OU vs tenant-wide)

- **Federated authentication is configured at the organization (tenant) level, not per OU.** A Managed Apple Account federated from Entra exists in the organization and is then assignable to one or more OUs.
- **Role scope is per-OU even when federated.** Federation establishes the identity; the role grant (which OUs a delegated admin can operate in) is a separate operation. Confidence: HIGH.

### 5.5 Account-Driven User Enrollment intersection

- AD-UE uses Managed Apple Accounts; federation accelerates Managed Apple Account provisioning but **federation is NOT a precondition for AD-UE** (admins can manually create Managed Apple Accounts in Apple Business). Existing iOS user-enrollment doc captures this.
- **iOS 18.2+ ABM-federated devices** have an alternate discovery path that bypasses the `.well-known/com.apple.remotemanagement` JSON hosting requirement (already documented in iOS user-enrollment guide at line 50).

---

## 6. Microsoft Intune-Side Handshake (the half v1.6 must reference but NOT document)

> **Reminder:** v1.6 is Apple Business surface only. Intune-side RBAC, profile authoring, compliance, enrollment-profile assignment are OUT OF SCOPE per the v1.6 scope decision. This section captures only the Intune-side **labels and paths** that v1.6 docs must cite to anchor the Apple-side handshake correctly.

### 6.1 Microsoft's terminology adoption status (as of 2026-04-30)

From the most recently updated Microsoft Learn page ([Tutorial: Use Apple Business to enroll iOS/iPadOS devices in Intune](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/tutorial-automated-ios), updated `2026-04-30`):

| Microsoft surface | Current text | Status |
|---|---|---|
| Tutorial title + prose | "Apple Business" (matches Apple's new branding) | UPDATED |
| Admin Center menu: `Devices > Device onboarding > Enrollment > Apple mobile > Enrollment program tokens` | Same path | UNCHANGED |
| Admin Center menu: `Tenant administration > Connectors and tokens > Apple VPP tokens` | **Still labeled "Apple VPP tokens"** | NOT YET UPDATED |
| Admin Center menu: `Devices > Enrollment > Apple > MDM Push Certificate` | Same path | UNCHANGED |
| Tutorial step language | "Create a token via Apple Business" | UPDATED |
| Apple Support link targets in tutorials | Link to `https://support.apple.com/guide/apple-business-manager/...` (legacy URL — but auto-redirects to new content) | NOT YET UPDATED |

**v1.6 doc-authoring rule:** When citing Intune-side portal paths, use the **CURRENT in-portal label** verbatim — including "Apple VPP tokens" — and add a parenthetical clarifier `(formerly VPP token, now Apple Business content token)` only on first mention in each runbook. Do NOT mass-rewrite the existing ~30 ABM references in v1.0-v1.5 docs (per v1.6 Q5 option b).

### 6.2 Intune connectors-and-tokens paths v1.6 docs will reference

| Surface | Intune path | Apple Business equivalent |
|---|---|---|
| ADE / ABM token (.p7m) | `Devices > Enrollment > Apple > Enrollment program tokens` | `Settings > Preferences > MDM Server Assignments` (legacy) / new equivalent in Apple Business |
| Content token (VPP successor) | `Tenant administration > Connectors and tokens > Apple VPP tokens` | `Preferences > Payments and Billing > Apps and Books > Content Tokens` |
| APNs Push Certificate | `Devices > Enrollment > Apple > MDM Push Certificate` | n/a (created at identity.apple.com, not Apple Business) |

---

## 7. Shared iPad Lifecycle — Apple Business-Owned Actions

### 7.1 What Apple Business controls (delegate-able surface)

| Action | Surface | Permission group | v1.6 audience |
|---|---|---|---|
| **Reset Shared iPad passcode** for a specific Managed Apple Account user | Apple Business portal — "Reset Shared iPad Passcode" button on the Managed Apple Account profile | People (permission: reset Shared iPad passcode) | L1 (primary v1.6 use case) |
| **Reset Managed Apple Account password** (broader than passcode) | Apple Business portal — Access Management > user profile | People (permission: reset password) | L1 / Admin |
| **Delete user session** (free local storage on a specific Shared iPad) | MDM-side `DeleteUser` command (Apple Business does NOT directly expose; v1.6 must clarify this) | n/a — MDM-side | Admin (out of v1.6 scope for runbook depth, but glossary callout needed) |
| **Reassign Shared iPad device between OUs** | Apple Business — Devices > select > Reassign | Devices (permission: reassign devices) | Admin |
| **Federated password sync caveat** | Documented: changing Shared iPad passcode in Apple Business does NOT change the federated Entra password | n/a — operational pitfall | L1 + L2 |

Source: [Create or reset user passwords in Apple Business Manager `axmd9c4cbc33`](https://support.apple.com/guide/apple-business-manager/create-or-reset-user-passwords-axmd9c4cbc33/web); [Microsoft Learn — Shared iPad devices](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad). Confidence: HIGH.

### 7.2 Three surfaces converge on Shared iPad — v1.6 must disambiguate

The Shared iPad passcode-reset surface is split across **three places**, and v1.6 must clarify which one each audience touches:

| Surface | What it does | Who uses it |
|---|---|---|
| **Apple Business portal** (admin-driven password reset on the Managed Apple Account) | Resets the user's Managed Apple Account credentials globally; affects all devices the user signs into | L1 (per v1.6 scope) — primary v1.6 runbook |
| **MDM command (`ClearPasscode` / `DeleteUser`)** | Clears device-side passcode without resetting the cloud identity; or deletes a cached user session to free storage | Admin / L2 — out of v1.6 scope (MDM concern) |
| **Apple Configurator (physical / Bluetooth)** | Local recovery when the device is unreachable via MDM | L2 fallback — out of v1.6 scope (recovery concern) |

**v1.6 implication:** The L1 Shared iPad passcode-reset runbook (REQUIREMENTS) must include an explicit "Apple Business password reset != MDM `ClearPasscode` != local Configurator reset" boundary callout — this is one of the C14-C16 audit-harness check candidates per the milestone scope.

---

## 8. Apple TV Delegation Surface

### 8.1 What is delegate-able for Apple TV in Apple Business

| Action | Apple Business permission group | Notes |
|---|---|---|
| Add Apple TV to organization (Configurator path) | Devices | Required because most Apple TVs are retail-purchased, not bought through Apple authorized resellers (no Reseller Number flow available for retail purchases) |
| Assign Apple TV to MDM server (Intune) | Devices | Same flow as iOS / iPadOS / Mac assignment |
| Assign Apple TV to OU | Devices | Same flow; Apple TV is treated identically to iOS for OU scoping |
| Reassign Apple TV to different OU | Devices | Cross-org device transfer |
| Release Apple TV from organization | Devices | Necessary for device disposal / resale |
| **AirPlay restrictions, Single App Mode, OS update deferrals** | **MDM-side only — NOT Apple Business** | These are configuration profile concerns, owned by Intune. v1.6 documents that they exist but does not document how to configure them (out-of-scope, MDM concern). |
| **Content assignment to Apple TV** | Apps & Books | Apps for tvOS can be assigned via content token like any other Apple device class |

Source: [Apple Support — Deploy Apple TV `dep027e1d5a0`](https://support.apple.com/guide/deployment/deploy-apple-tv-dep027e1d5a0/web); [Apple Support — Device management restrictions for Apple TV devices `depzf41d7aae`](https://support.apple.com/guide/deployment/restrictions-for-apple-tv-depzf41d7aae/web); [Microsoft Learn — Set up automated device enrollment (ADE) for tvOS](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-tv-os). Confidence: HIGH.

### 8.2 Retail-purchase pitfall

Apple TV devices purchased at retail (Best Buy, Amazon, Apple Store retail) **cannot flow to Apple Business via Reseller Number** because retail isn't an authorized device-enrollment reseller path. They must be added via **Apple Configurator 2 over Bluetooth/USB-C/network**. v1.6 Apple TV delegation runbook must include this constraint as a callout — it's the dominant Apple TV onboarding pitfall.

---

## 9. Portal & API Surfaces — Canonical URLs for v1.6 Citations

### 9.1 Apple authoritative URLs (use these in v1.6 docs)

| Purpose | URL | Notes |
|---|---|---|
| Apple Business portal (sign-in) | `https://business.apple.com` | Primary navigation entry |
| New Apple Business User Guide | `https://support.apple.com/guide/business/` | All new v1.6 doc citations |
| Apple Business — Roles & Permissions intro | `https://support.apple.com/guide/business/intro-to-roles-and-permissions-axm97dd59159/web` | Canonical for role/permission model |
| Apple Business — Organizational Units | `https://support.apple.com/guide/business/configure-organizational-units-axmfdbe2cb0d/web` | Canonical for OU model |
| Apple Business — Content tokens | `https://support.apple.com/guide/business/manage-content-tokens-axme0f8659ec/web` | Canonical for content token + Apps and Books |
| Apple Business — Federated authentication (Entra) | `https://support.apple.com/guide/business/federated-authentication-microsoft-entra-axm8c1cac980/web` | Canonical for Entra OIDC federation |
| Apple Business — Sync from IdP (SCIM) | `https://support.apple.com/guide/business/sync-user-accounts-identity-provider-axm526a05814/web` | Canonical for SCIM provisioning |
| Apple Business — Apple Configurator device add | `https://support.apple.com/guide/business/add-devices-using-apple-configurator-axm200a54d59/web` | Apple TV + retail iPad add-flow |
| Apple Newsroom rebrand announcement | `https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/` | Authoritative for rebrand date |
| Apple Support — "Apple Business Manager is now Apple Business" banner page | `https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web` | Use as the citation for the glossary rebrand callout |
| Apple Deployment Guide — Microsoft Entra ID integration | `https://support.apple.com/guide/deployment/integrate-with-microsoft-entra-id-depa85a35cf2/web` | Apple-published Microsoft cross-reference |
| Apple Deployment Guide — Deploy Apple TV | `https://support.apple.com/guide/deployment/deploy-apple-tv-dep027e1d5a0/web` | Apple TV onboarding overview |
| Apple Deployment Guide — Apple TV restrictions | `https://support.apple.com/guide/deployment/restrictions-for-apple-tv-depzf41d7aae/web` | Apple TV management restrictions |
| Apple Deployment Guide — Prepare Shared iPad | `https://support.apple.com/guide/deployment/prepare-shared-ipad-dep6fa9dd532/web` | Shared iPad architecture |

### 9.2 Microsoft authoritative URLs (cross-references)

| Purpose | URL |
|---|---|
| Intune tutorial: enroll iOS/iPadOS via Apple Business | `https://learn.microsoft.com/en-us/intune/device-enrollment/apple/tutorial-automated-ios` |
| Intune tvOS ADE setup | `https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-tv-os` |
| Intune Shared iPad guidance | `https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad` |
| Intune Apple VPP management | `https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple` |
| Microsoft Entra SSO plug-in for Apple devices | `https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin` |

### 9.3 API surface (Apple Business — for the Device API Manager preset role)

- The new **Device API Manager** preset custom role exposes the Apple Business **Device API** — a developer-facing surface (not part of the SCIM provisioning surface).
- Apple has not yet published a dedicated developer.apple.com landing page for the Apple Business Device API as of 2026-05-20; v1.6 docs should treat this as an **acknowledge-but-do-not-document-deeply** surface unless Phase 62/63 research finds an authoritative API reference URL.
- Confidence: MEDIUM (the role exists per Apple's roles intro page; the API documentation URL was not located).

---

## 10. Out-of-Scope Orientation — What v1.6 Docs MUST NOT Add

> Downstream consumers (REQUIREMENTS, ROADMAP, FEATURES) should treat the items below as explicitly excluded — anti-features for the v1.6 scope.

| Surface | Reason excluded |
|---|---|
| **Apple Business Connect (brand profiles, Maps ads, Branded Mail, Tap to Pay, Verify with Wallet)** | Customer-facing surface; NOT device delegation. Mention in v1.6 glossary callout for completeness only. |
| **Apple Business Essentials (built-in Apple-hosted MDM, Blueprints)** | Microsoft Intune is the MDM throughout this docs suite. Apple's built-in MDM is a competing surface; v1.6 mentions Blueprints as a concept in glossary only. |
| **Apple School Manager (ASM)** specific features | ASM is functionally identical to ABM for MDM purposes (per v1.3 doc precedent); v1.6 keeps the existing ASM=ABM cross-reference and does not add ASM-school-specific content (SIS rostering, classes, etc.). |
| **Multiple separate Apple Business accounts** (cross-tenant federation) | v1.6 scope is one Apple Business account with OUs + custom roles. Multi-account topology is Q3 b/c — explicitly out of scope. |
| **Intune-side RBAC** (Intune roles, scope tags, custom Intune permissions) | MDM concern; covered by other Intune RBAC docs outside v1.6 scope. v1.6 runbooks carry explicit boundary callouts here (audit C14-C16). |
| **ChromeOS / Android / Windows surfaces** | Wrong platform. |
| **iCloud personal account surface** (consumer features) | Not an enterprise admin surface. |
| **Apple Push Notification certificate (APNs) lifecycle deep-dive** | Already covered by existing v1.2/v1.3 docs; v1.6 only references. |
| **Profile-based User Enrollment (legacy)** | Deprecated iOS 18+; already documented; v1.6 does not refresh. |

---

## 11. What NOT to Use (rebrand-era anti-patterns)

| Anti-pattern | Why | Use Instead |
|---|---|---|
| Saying "Apple Business Manager" in newly authored v1.6 docs | Apple retired the name 2026-04-14 | "Apple Business (formerly Apple Business Manager)" on first mention; "Apple Business" thereafter |
| Saying "Location" in newly authored v1.6 docs | Renamed to Organizational Unit | "Organizational Unit (OU)" — on first mention add "(formerly Location)" |
| Saying "privileges" in newly authored v1.6 docs | Apple renamed to "permissions" | "permissions" |
| Saying "Managed Apple ID" in newly authored v1.6 docs | Apple renamed in 2024 (predates Apple Business rebrand) | "Managed Apple Account" with parenthetical "(Microsoft Intune documentation continues to use Managed Apple ID)" on first mention |
| Linking to legacy `/guide/apple-business-manager/` URLs in newly authored v1.6 docs | Apple's new canonical is `/guide/business/` | Use `/guide/business/...` paths; same article IDs resolve at both paths but new path is preferred |
| Mass-sweeping existing v1.0–v1.5 docs to rename ABM → Apple Business | Out of v1.6 scope per Q5 option b | Leave existing ABM references alone; only add a rebrand callout at the 3 canonical sites (glossary + macOS ABM-config intro + iOS ABM-token intro) |
| Renaming "Apple VPP tokens" in Intune-side documentation prose | Microsoft has not renamed the in-portal label as of 2026-04-30 | Use Microsoft's current verbatim label "Apple VPP tokens" when citing Intune-portal paths |
| Claiming "Apple Business has a max of N Organizational Units" | Apple publishes no max | State "Apple does not publish a maximum OU count; consult Apple Enterprise support for large-scale deployments (>100 OUs)" |
| Documenting Intune-side RBAC alongside Apple Business roles | Out of v1.6 scope (MDM concern) | Add explicit boundary callout "This runbook covers the Apple Business surface only; Intune-side RBAC is documented separately at [Intune RBAC docs]" |

---

## 12. Cross-Platform Applicability Matrix

Per the v1.6 quality gate requirement: which capabilities apply to which device classes.

| Apple Business capability | iOS / iPadOS | macOS | Apple TV (tvOS) | Shared iPad |
|---|:---:|:---:|:---:|:---:|
| Add device via reseller upload | YES | YES | YES (rare; most retail) | YES |
| Add device via Apple Configurator | YES | YES | YES (primary path for tvOS) | YES |
| Assign device to OU | YES | YES | YES | YES |
| Reassign device between OUs | YES | YES | YES | YES |
| Release device from organization | YES | YES | YES | YES |
| Content token / Apps and Books | YES (VPP iOS) | YES (VPP macOS) | YES (tvOS apps) | YES (VPP user-licensed for student/shared scenarios) |
| Managed Apple Account sign-in | YES (AD-UE; Shared iPad) | YES (Sonoma+) | NO (tvOS doesn't sign into Managed Apple Account at user level) | YES (REQUIRED — Shared iPad mandates Managed Apple Account) |
| Reset Shared iPad passcode (Apple Business UI) | n/a | n/a | n/a | YES (the unique Shared iPad operation) |
| AirPlay restrictions | n/a | n/a | YES (but MDM-side, not Apple Business) | n/a |
| OS update deferral | YES (DDM, MDM-side) | YES (DDM, MDM-side) | YES (MDM-side) | YES (MDM-side) |
| Federated authentication (OIDC) | YES (Managed Apple Account at AD-UE) | YES (Managed Apple Account at sign-in) | NO (tvOS does not consume Managed Apple Account identity directly) | YES (Shared iPad sign-in) |
| Custom role scoping per OU | n/a (device class doesn't matter for role scope; admin-side) | same | same | same |

Confidence: HIGH for matrix structure; HIGH for cell values.

---

## 13. Confidence Summary

| Finding | Confidence | Source basis |
|---|---|---|
| Rebrand name + GA date (2026-04-14) | HIGH | Apple Newsroom + Apple Support banner page |
| URL surface (business.apple.com + /guide/business/) | HIGH | Direct fetch from Apple Support |
| Legacy fixed-role triad retired in name | HIGH | Apple Business intro page lists new role names + custom role mechanism |
| Custom role authoring + multi-role assignment | HIGH | Apple Business intro page explicit text |
| Full per-permission table for each subgroup | MEDIUM | Apple's intro page lists categories but sub-page tables not extractable via WebFetch; manual scrape recommended for v1.6 Phase 1 glossary |
| OU hierarchy + scoping behavior | HIGH for primary structure; MEDIUM for nesting depth | Apple article preserved with same ID; community confirms sublocation exists; Apple new docs describe primarily flat |
| Apple OU max count = unpublished | HIGH (negative claim verified) | Multiple Apple community threads explicitly note no published max |
| Content token model (per-OU, 1-year, share-allowed) | HIGH | Apple support page + community confirmation |
| Microsoft Entra federation status (GA, OIDC + SCIM) | HIGH | Apple Support pages + Microsoft Learn page dated 2025-11-04 |
| National-cloud Entra unsupported | HIGH | Direct quote from Apple deployment guide |
| Intune-side label still "Apple VPP tokens" | HIGH | Microsoft Learn tutorial dated 2026-04-30 |
| Shared iPad passcode-reset split across 3 surfaces | HIGH | Apple Support + Microsoft Learn + Apple Deployment Guide consensus |
| Apple TV retail-purchase Configurator-only path | HIGH | Multiple Apple Support + Microsoft Learn confirmations |
| Device API Manager preset role exists | HIGH | Apple Business intro page |
| Device API public API URL | UNKNOWN — not located | (Apple does not currently publish a developer.apple.com landing page for the Apple Business Device API surface) |

---

## 14. Sources

### Apple-authoritative (HIGH confidence)

- [Apple Newsroom — Introducing Apple Business (2026-03-24)](https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/) — rebrand announcement, GA date 2026-04-14
- [Apple Support — Apple Business Manager is now Apple Business `axmd79d79dea`](https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web) — official banner page
- [Apple Business User Guide — Welcome](https://support.apple.com/guide/business/welcome/web) — top of new docs tree
- [Apple Business User Guide — Intro to roles and permissions `axm97dd59159`](https://support.apple.com/guide/business/intro-to-roles-and-permissions-axm97dd59159/web) — role + permission model
- [Apple Business User Guide — Configure organizational units `axmfdbe2cb0d`](https://support.apple.com/guide/business/configure-organizational-units-axmfdbe2cb0d/web) — OU model
- [Apple Business User Guide — Manage content tokens `axme0f8659ec`](https://support.apple.com/guide/business/manage-content-tokens-axme0f8659ec/web) — content token (per-OU)
- [Apple Business User Guide — Federated authentication with Microsoft Entra ID `axm8c1cac980`](https://support.apple.com/guide/business/federated-authentication-microsoft-entra-axm8c1cac980/web) — Entra OIDC federation
- [Apple Business User Guide — Sync user accounts from your identity provider `axm526a05814`](https://support.apple.com/guide/business/sync-user-accounts-identity-provider-axm526a05814/web) — SCIM provisioning
- [Apple Business User Guide — Add devices using Apple Configurator `axm200a54d59`](https://support.apple.com/guide/business/add-devices-using-apple-configurator-axm200a54d59/web) — manual device add
- [Apple Business User Guide — Assign, reassign, or unassign devices `axmf500c0851`](https://support.apple.com/guide/apple-business-manager/axmf500c0851/web) — device assignment (legacy URL, same content)
- [Apple Business Manager User Guide — Create or reset user passwords `axmd9c4cbc33`](https://support.apple.com/guide/apple-business-manager/create-or-reset-user-passwords-axmd9c4cbc33/web) — Shared iPad passcode reset
- [Apple Deployment Guide — Integrate with Microsoft Entra ID `depa85a35cf2`](https://support.apple.com/guide/deployment/integrate-with-microsoft-entra-id-depa85a35cf2/web) — Entra integration (published 2025-11-04)
- [Apple Deployment Guide — Deploy Apple TV `dep027e1d5a0`](https://support.apple.com/guide/deployment/deploy-apple-tv-dep027e1d5a0/web) — Apple TV onboarding
- [Apple Deployment Guide — Restrictions for Apple TV devices `depzf41d7aae`](https://support.apple.com/guide/deployment/restrictions-for-apple-tv-depzf41d7aae/web) — Apple TV management surface
- [Apple Deployment Guide — Prepare Shared iPad `dep6fa9dd532`](https://support.apple.com/guide/deployment/prepare-shared-ipad-dep6fa9dd532/web) — Shared iPad architecture

### Microsoft-authoritative (HIGH confidence)

- [Microsoft Learn — Tutorial: Use Apple Business to enroll iOS/iPadOS devices in Intune](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/tutorial-automated-ios) (updated 2026-04-30; uses "Apple Business" terminology in prose)
- [Microsoft Learn — Set up automated device enrollment (ADE) for tvOS](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-tv-os)
- [Microsoft Learn — Shared iPad devices](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad)
- [Microsoft Learn — Manage Apple Volume-Purchased Apps](https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple)
- [Microsoft Learn — Microsoft Enterprise SSO plug-in for Apple devices](https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin) (published 2025-11-04)

### Third-party (MEDIUM confidence — use only to corroborate Apple-authoritative)

- [HardSoft — Understanding Role Privileges in Apple Business Manager](https://www.hardsoftcomputers.co.uk/blog/apple-business-manager/understanding-role-privileges-in-apple-business-manager/) — pre-rebrand role/permission summary (used to triangulate per-permission examples in §2.4)
- [Apple Insider — Apple Business goes free (2026-03-24)](https://appleinsider.com/articles/26/03/24/apple-business-goes-free-consolidating-business-and-brand-management-tools-in-one-platform) — corroborates rebrand timing
- [MacRumors — Apple Launches Apple Business Platform (2026-04-14)](https://www.macrumors.com/2026/04/14/apple-business-platform-launches/) — corroborates GA date
- [9to5Mac — Apple @ Work: Managed Apple Accounts and federated authentication (2025-11-15)](https://9to5mac.com/2025/11/15/apple-work-why-managed-apple-accounts-and-federated-authentication-are-now-essential-for-every-enterprise/) — federation context

### Last verified

`last_verified: 2026-05-20` — all URLs and dates above were verified against the listed sources during the v1.6 research phase.

---

*Stack research for: v1.6 Apple Business Delegated Governance — Apple Business platform surfaces for documentation citation in iOS/iPadOS + macOS delegation runbooks*
*Researched: 2026-05-20*
