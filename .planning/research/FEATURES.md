# Feature Research — Apple Business Delegated Governance Workflows (v1.6)

**Domain:** Apple Business (formerly Apple Business Manager) delegated permission surface — workflows performed by internal-org / sub-org admins on behalf of multi-team or multi-location device pools, documented from the Apple Business portal perspective (Intune-side actions explicitly OUT OF SCOPE per PROJECT.md scope-boundary).
**Researched:** 2026-05-20
**Confidence:** HIGH on rebrand fact, role model, license-transfer, device-release/transfer/migration distinction, audit-log surface; MEDIUM on per-role privilege enumeration depth (Apple's full privilege matrix is gated behind admin sign-in to the portal — public docs describe groups but not always exhaustive sub-privilege lists); LOW on certain edge cases (specific privilege names for the "shared content token" model post-2024 consolidation; activity-log retention exact period).

## Critical Context: 2026 Rebrand

On 2026-03-24, Apple announced and on 2026-04-14 launched **"Apple Business"** — a unified platform consolidating three previously-separate products into one:

1. **Apple Business Manager** (ABM — device management, ADE token, VPP/Apps and Books)
2. **Apple Business Essentials** (ABE — light MDM)
3. **Apple Business Connect** (ABC — customer-facing listings)

Source: [Apple Business launch announcement (business.apple.com migration banner)](https://support.apple.com/guide/business/sign-up-and-verify-your-organization-axm402206497/web); [Six Colors — Apple in the Enterprise: 2026 commentary](https://sixcolors.com/post/2026/05/apple-in-the-enterprise-the-complete-2026-commentary/); [TechRadar — Apple Business now offers MDM](https://www.techradar.com/pro/weve-unified-apples-strongest-business-offerings-into-one-simple-secure-platform-apple-business-will-now-offer-mdm-upgraded-icloud-storage-and-more-plus-the-option-to-put-ads-in-maps).

Apple's user-guide pages now redirect from `support.apple.com/guide/apple-business-manager/*` to `support.apple.com/guide/business/*`; Apple support search results still surface the legacy ABM URL but the portal landing page shows "Apple Business Manager is now Apple Business" (HIGH confidence — verified via direct WebFetch of the migration banner). Both URL families currently route to current documentation.

Throughout this research doc, the portal is referred to as **Apple Business** (current branding) with **ABM** as the legacy parenthetical where helpful for L1/L2 readers searching old documentation. Per PROJECT.md, the v1.6 corpus handles the rebrand via glossary + 2 intro callouts only (Q5 b) — no retroactive sweep of ~30 existing ABM references.

---

## Feature Landscape

### Workflow Category Classification Key

Each workflow below is tagged with:
- **Category** — Table-stakes / Differentiator / Anti-feature (per `<question>` requirements)
- **Audience reach** — Admin / Admin + L1 / Admin + L1 + L2 (which audience tiers need the workflow documented)
- **Cross-platform applicability** — iOS-only / iPadOS-only / macOS-only / shared iPad-only / Apple TV-only / cross-platform (Apple-wide)
- **Confidence** — HIGH / MEDIUM / LOW
- **Apple Business UI surface** — portal sidebar path
- **Primary citation** — Apple Support URL

---

## 1. Custom Role Authoring Workflow

### 1.1 Create a Custom Role

**Category:** Table-stakes
**Audience:** Admin
**Cross-platform:** Cross-platform (governance layer — affects all Apple device types)
**Confidence:** HIGH
**UI surface:** `Access Management > Roles > Add (+ next to Custom Roles)`
**Citation:** [Intro to roles and privileges in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web); [View and assign roles](https://support.apple.com/guide/apple-business-manager/view-and-assign-roles-axmb46d473c7/web)

**Workflow:**
1. Sign in as **Administrator** (only role that can create custom roles).
2. Navigate sidebar: **Access Management** > **Roles**.
3. Select **Add (+)** next to **Custom Roles**.
4. Enter role name and optional description.
5. Select each permissions group, then check individual privileges this role can perform.
6. Save.

**Prerequisite:** Signed-in user must have a role with permission to "create, edit, and delete Managed Apple Accounts." Only Administrator has this by default.

### 1.2 Privilege Groups (canonical 5 — public docs confirm these as the consistent top-level groupings)

| Group | Example Privileges | Notes |
|-------|-------------------|-------|
| **Users / Managed Apple Accounts** | Create / edit / delete accounts, reset passwords, generate verification codes, manage federation, **Reset Shared iPad Passcode** | "Reset Shared iPad Passcode" is the canonical L1-delegated privilege |
| **Devices** | Add / assign / unassign / release devices, manage MDM servers, view device assignments | Core Device Enrollment Manager surface |
| **Content (Apps and Books)** | Buy content, reassign licenses, transfer licenses between locations, manage payment methods | Core Content Manager surface |
| **Locations** | Create / edit / delete locations | Restricted to Admin + People Manager by default |
| **Logs / Activity** | Read log files, view activity, download logs | Audit-access privilege; often delegated to compliance/security L2 |

> **Confidence note:** MEDIUM on completeness of sub-privileges. Apple's public role-privileges page enumerates groups but the full per-privilege matrix is most accurately viewed inside the portal at `Access Management > Roles > [role] > Edit`. v1.6 docs should screenshot the in-portal matrix or reference [Apple's role privileges reference page](https://support.apple.com/guide/apple-business-manager/role-privileges-tes97dd59159/web) for the canonical list.

### 1.3 Built-in Roles (5)

| Role | Default Privileges (paraphrased) | When to Use |
|------|----------------------------------|-------------|
| **Administrator** | Full control of all settings; accept Apple T&Cs; only role that can manage other Admins | One per org (Account Holder); minimum redundancy = 2 |
| **People Manager** | Create/edit/delete Managed Apple Accounts; reset passwords (except other Admins); configure federation; **create/edit Locations**; cannot manage devices or content | HR-adjacent delegation; org-restructure work |
| **Device Enrollment Manager** | Add / assign / remove / release devices; manage MDM servers; **cannot manage content** | Pure device-ops L2; no app/license access |
| **Content Manager** | Buy content; reassign licenses; cannot manage devices, MDM servers, or grant roles | App-procurement delegation |
| **Staff** | Use managed devices; sign in to iCloud with Managed Apple Account; access assigned managed apps | End-user role; not an admin role |

**Citation:** [HardSoft — Role Privileges in Apple Business Manager](https://www.hardsoftcomputers.co.uk/blog/apple-business-manager/understanding-role-privileges-in-apple-business-manager/) (MEDIUM confidence community source for the default-role privilege summary; Apple's own page is structurally vaguer).

### 1.4 Location Scoping of Roles

**Confidence:** HIGH
**Key fact:** Role privileges are assigned **by Location**. The same user can hold different roles in different Locations (e.g., Content Manager in Location A, Device Enrollment Manager in Location B). This is the canonical mechanism for sub-org delegation.

**Workflow:**
1. When assigning a role to a Managed Apple Account, the assignment dialog lists each Location the assigning user has access to.
2. Select role per Location (or "All Locations" if Administrator-level scope is appropriate).
3. Save.

**Implication for runbooks:** When a sub-org admin loses access to a workflow, the FIRST diagnostic is "which Location was this role assigned in, and does the device/license belong to that Location?" — this becomes the L2 permission-denied diagnostic per Pillar 4 of v1.6 scope.

### 1.5 Modify or Revoke a Role

**Category:** Table-stakes
**Audience:** Admin
**Confidence:** HIGH
**UI surface:** `Access Management > Roles > [role] > Edit`
**Citation:** [Apple Business — role privileges reference](https://support.apple.com/guide/apple-business-manager/role-privileges-tes97dd59159/web)

**Modify privileges:** Administrator selects **Access Management** > **Roles** > [role] > **Edit** > toggle checkboxes > **Save**. Privilege change propagates to all users holding the role.

**Revoke a role from a user:** **Access Management** > **Users** > [user] > **Roles** tab > deselect role for the relevant Location > **Save**.

> **Privilege-change blast radius callout for v1.6 runbook:** A privilege removed from a custom role removes it for EVERY user holding that role across EVERY location it's scoped to. Document this in the "Custom Role Authoring" runbook as a `> ⚠️ What breaks` callout.

### 1.6 "Minimum Viable Delegated Admin" — Canonical Privilege Bundle

**Category:** Differentiator (v1.6 unique value-add — Apple does not publish a canonical "sub-org device admin" template)
**Confidence:** MEDIUM (synthesis of community guidance + the explicit v1.6 scope of VPP + Shared iPad passcode reset + device release)

Per the `<milestone_context>` user-confirmed delegation surface (VPP app management, shared iPad passcode reset, device release), the recommended 4-6 privilege bundle for a sub-org device admin is:

| # | Privilege | Group | Rationale |
|---|-----------|-------|-----------|
| 1 | **Manage devices in this Location** (add/assign/unassign/release) | Devices | Core device lifecycle ownership |
| 2 | **Manage content (Apps and Books) in this Location** | Content | Sub-org VPP catalog ownership |
| 3 | **Reset Shared iPad Passcode** | Users / Managed Apple Accounts | L1-facing passcode reset |
| 4 | **View activity / Read log files (scoped to this Location)** | Logs / Activity | Self-service audit visibility |
| 5 (optional) | **Reassign MDM Server (this Location's devices only)** | Devices | If sub-org runs its own Intune tenant |
| 6 (optional) | **Create / edit Managed Apple Accounts in this Location** | Users / Managed Apple Accounts | If sub-org runs its own account provisioning (skip if SCIM-from-Entra) |

**Note for v1.6 runbook:** Apple does not provide a single "Bundled Device Admin" toggle — the bundle must be authored manually per role. v1.6's "Custom Role Authoring Guide" is the canonical reference doc that ships this template.

### 1.7 Dependencies

```
Create Location (Workflow 2.1)
    └─required-before──> Scope role to Location (Workflow 1.4)
                            └─required-before──> Assign role to user (Workflow 1.1)

Federated Authentication or Manual Account Creation (Workflow 6)
    └─required-before──> Assign role to Managed Apple Account (Workflow 1.1)
```

---

## 2. Location Management Workflow

### 2.1 Create a Location

**Category:** Table-stakes
**Audience:** Admin
**Cross-platform:** Cross-platform (Location is a container for devices of all types)
**Confidence:** HIGH
**UI surface:** `Locations (sidebar) > Add (+)`
**Citation:** [Configure locations in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/configure-locations-axmfdbe2cb0d/web); [Apple Deployment training — Adding Locations and Users](https://it-training.apple.com/tutorials/deployment/dm050/)

**Required permissions:** Administrator OR People Manager.

**Workflow:**
1. Sign in as Administrator or People Manager.
2. Sidebar: **Locations**.
3. Select **Add (+)** at top of window.
4. Enter location details (Name, Address fields, Phone, Time Zone). Address is required by Apple for tax-jurisdiction purposes on Apps and Books purchases.
5. Save.

**Key fact:** When org first signs up for Apple Business, the **first Location is auto-created** mirroring the org name. Multi-location work begins by adding the second Location.

### 2.2 Edit a Location

**Category:** Table-stakes
**Audience:** Admin
**Confidence:** HIGH
**UI surface:** `Locations > [location] > Edit`
**Citation:** [Edit or remove a location](https://support.apple.com/guide/business/edit-or-remove-a-location-abcb7fc491ec/web)

Administrator or People Manager selects location > **Edit** > update fields > **Save**.

### 2.3 Move Devices Between Locations

**Category:** Table-stakes
**Audience:** Admin (NOT L1 — moving devices changes role-scope visibility)
**Confidence:** HIGH
**UI surface:** `Devices > [select devices] > Edit Location` (or `Edit MDM Server` with location-scoped server)
**Citation:** [Assign, reassign, or unassign devices in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/assign-reassign-or-unassign-devices-axmf500c0851/web)

**Workflow:**
1. **Devices** sidebar.
2. Select devices by checkbox, serial number, order number, or CSV upload (CSV bulk-move supported — same CSV-upload pattern as initial device assignment).
3. **Edit Location** (or **Edit MDM Server** if the target Location has a distinct MDM server entry).
4. Confirm. No approval workflow within Apple Business — single Admin click.

**Bulk-move methods:**
- **CSV upload** at `Devices > Edit Location > Choose Devices > Upload CSV` (serial number column).
- **Reseller upload** (initial device-assignment time only) — when a reseller is linked to Apple Business via Apple Customer Number, devices arrive at a default Location set by the Admin in `Preferences > Apple Customer Numbers`. Not a "move" workflow per se — pre-assignment routing.
- **API:** Apple Business does NOT publish a public REST API for device-location move; CSV is the canonical bulk mechanism.

**Device-side effect:** Moving a device between Locations does NOT trigger re-enrollment by itself. However, if the target Location uses a different MDM server, the device's next factory reset will route to the new MDM server (legacy reassign-MDM behavior — see Workflow 5.3).

### 2.4 Delete / Archive a Location

**Category:** Table-stakes (with hard prerequisites — anti-feature edge documented)
**Audience:** Admin
**Confidence:** HIGH
**UI surface:** `Locations > [location] > Delete`
**Citation:** [Configure locations in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/configure-locations-axmfdbe2cb0d/web)

**Hard prerequisites — ALL must be true before delete is permitted:**
1. Accounts (Managed Apple Accounts) must be transferred to another Location.
2. Apps and Books licenses must be transferred to another Location (see Workflow 3.4).
3. Devices must be moved to another Location.
4. No Admin or People Manager roles scoped exclusively to this Location may remain.

**Workflow:**
1. Admin or People Manager: **Locations** sidebar > select location > **Delete**.
2. Apple Business validates prerequisites. If any unmet, delete is rejected with an error pointing at the unmet prerequisite.
3. Confirm. **This action cannot be undone.** No "archive" intermediate state — delete is permanent.

> **Anti-feature flag for PITFALLS researcher:** No "archive" or "soft-delete" state exists. There is no way to retain a Location's audit history after deletion — activity log entries scoped to the deleted Location remain visible at org level, but the Location name appears as a "deleted Location" placeholder in some audit views.

### 2.5 Dependencies

```
Workflow 2.1 (Create Location)
    └─required-before──> Workflow 1.4 (Scope role to Location)
    └─required-before──> Workflow 2.3 (Move devices between Locations)
    └─required-before──> Workflow 3.4 (Transfer licenses between Locations)
    └─required-before──> Workflow 6.4 (Account roaming between Locations)

Workflows 2.3 + 3.4 + 6.4
    └─prerequisites-for──> Workflow 2.4 (Delete Location)
```

---

## 3. VPP / Content Token Delegation Workflow

### 3.1 Content Token Model (Post-2024 Consolidation)

**Category:** Table-stakes
**Audience:** Admin (Content Manager scope) + L2 (when troubleshooting sync)
**Cross-platform:** Cross-platform (Apps and Books applies to iOS / iPadOS / macOS / tvOS)
**Confidence:** HIGH
**UI surface:** `Settings > Apps and Books` (formerly `Preferences > Payments and Billing > Apps and Books > Content Tokens`)
**Citation:** [Intro to buying content in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/intro-to-buying-content-axme19b23f7f/web); [Distribute content with Apps and Books](https://support.apple.com/en-us/103264)

**Key facts:**
- **One content token per Location.** Apple did NOT consolidate to a single global content token in the 2024 Apps-and-Books update. The "VPP location token" terminology continues to apply — each Location gets its own token, and each token is uploaded to Intune as a separate VPP token entry.
- Tokens are valid 365 days from download.
- Up to 3,000 VPP tokens per Intune tenant (Intune-side limit; Apple Business does not impose a token count limit per org).
- **A given content token cannot be shared between Intune tenants.**

**Confidence note:** The phrase "shared content token model" in the v1.6 question prompt may refer to community/internal misunderstanding — the actual Apple model is "one token per Location, with cross-Location license transfer via the portal." Document this as a glossary callout to prevent confusion.

### 3.2 Sub-Org Admin Claims a Content Token

**Workflow:**
1. Sub-org admin (with Content Manager privilege scoped to their Location) signs in to Apple Business.
2. **Settings** > **Apps and Books**.
3. Selects the token for their Location > **Download**.
4. Uploads to the sub-org's Intune tenant at `Tenant administration > Connectors and tokens > Apple VPP tokens > Add`.
5. Intune syncs licenses from that Location.

**Constraint:** Sub-org admin can only see / download tokens for Locations where they hold Content Manager (or equivalent custom-role) privilege.

### 3.3 Can Sub-Orgs Have Different VPP Catalogs?

**Confidence:** HIGH
**Answer:** Yes. Each Location has its own catalog of purchased apps and books, distinct from other Locations. A purchase made under Location A's payment method results in licenses in Location A's catalog only. This is the foundation of multi-org VPP delegation.

**Implication for v1.6:** Document the "per-Location catalog" model in the rebrand glossary callout — admins migrating from single-tenant ABM may incorrectly assume a global catalog.

### 3.4 License Reclamation Across Location Boundaries

**Category:** Table-stakes
**Audience:** Admin (Content Manager)
**Confidence:** HIGH
**UI surface:** `Apps and Books > [app] > Transfer`
**Citation:** [Transfer licenses to another location in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/transfer-licenses-axm1242b0715/web)

**Workflow:**
1. Content Manager: **Apps and Books** > search/select app.
2. App details show license counts per Location admin has access to.
3. Select **Transfer** > enter quantity (up to 24,999 per transfer) and target Location > confirm.
4. Transfer completes in a few minutes; license counts update at both Locations.

**Hard constraint:** **Only unassigned licenses can be transferred between Locations.** Licenses currently assigned to a user or device must first be revoked (and the 30-day Apple grace period observed if revoking from a managed device) before transfer is permitted.

**Device-moves-between-Locations implication:** Moving a device between Locations does NOT automatically transfer that device's VPP licenses. The Content Manager must explicitly revoke licenses in source Location, then re-purchase or transfer-then-assign in target Location. This is a critical L2 diagnostic for "device moved but apps disappeared" — flag for PITFALLS.

### 3.5 Buying Apps / Books for a Sub-Org

**Category:** Table-stakes
**Audience:** Admin (Content Manager)
**Confidence:** HIGH
**UI surface:** `Apps and Books > Search > [app] > Buy`
**Citation:** [Get licenses for apps and books in Apple Business](https://support.apple.com/guide/business/get-licenses-for-apps-and-books-axmc21817890/web); [Select and buy content](https://support.apple.com/guide/apple-business-manager/select-and-buy-content-axmc21817890/web)

**Workflow:**
1. Content Manager: **Apps and Books** sidebar.
2. Search for app by name or App Store ID.
3. Select **Buy**.
4. Choose **Assign to: Devices** (device licensing — recommended for corporate-owned supervised) OR **Assign to: Users** (user licensing — required for User Enrollment or apps with books content).
5. Select **Location** (drop-down restricted to Locations the buyer has Content Manager privilege in).
6. Enter quantity. Free apps require quantity but no payment. Paid apps require valid payment method on the Location's account.
7. Confirm.

**Payment method scoping:** Each Location can have its own VPP credit / payment method configured at `Settings > Apps and Books > Payment Methods`. This is the canonical mechanism for sub-org budget isolation — sub-org A's purchases bill against sub-org A's payment method, never to sub-org B.

### 3.6 Dependencies

```
Workflow 2.1 (Create Location)
    └─required-before──> Workflow 3.5 (Buy apps for sub-org)
                            └─required-before──> Workflow 3.2 (Sub-org claims content token)
                                                    └─required-before──> Intune-side VPP token upload (out-of-scope)
Workflow 3.4 (License transfer) requires unassigned licenses
    └─prerequisite──> Revoke licenses from devices/users first (with 30-day grace period)
```

---

## 4. Shared iPad Passcode Reset Workflow (THREE PATHS)

### 4.1 Path A: Apple Business UI (Admin or L1)

**Category:** Table-stakes
**Audience:** Admin + L1
**Cross-platform:** Shared iPad ONLY (iPadOS supervised devices configured for Shared iPad mode)
**Confidence:** HIGH
**UI surface:** `Users > [user] > More > Lock` then `Reset Shared iPad Passcode`
**Citation:** [Reset a Shared iPad passcode in Apple Business Manager](https://support.apple.com/en-gb/guide/apple-business-manager/axm61439a814/1/web/1); [Create Shared iPad passcodes](https://support.apple.com/guide/apple-business-manager/create-shared-ipad-passcodes-axm124535e27/web)

**Required privileges:** "privileges to reset passwords, generate verification codes and create sign-in information." Built-in: Administrator OR People Manager OR custom role with these privileges.

**Workflow:**
1. Sign in with admin/L1 holding the required privileges.
2. **Users** sidebar > search by Managed Apple Account / name / email > select user.
3. **More** menu > **Lock** (the "Reset Shared iPad Passcode" button appears in this dialog).
4. Enter a new 8-character alphanumeric passcode (Apple-enforced Shared iPad minimum — passcode complexity settings in Intune device configuration profiles DO NOT apply to Shared iPad).
5. Select delivery method:
   - **Download as 1-up PDF** (one page per user with passcode for printing / handover)
   - **Download as CSV** (columns: Managed Apple Account, first/middle/last name, passcode — for bulk handoff)
6. Hand new passcode to user via the chosen method.

**Federated authentication caveat:** If federation is enabled, resetting the Shared iPad passcode in Apple Business does NOT change the user's federated (Entra) password. The Shared iPad passcode is a separate device-side credential. Users may still need to use their Entra password for federated sign-in to apps.

### 4.2 Path B: Intune MDM Remote Action — DOES NOT WORK FOR SHARED IPAD (Anti-feature)

**Category:** Anti-feature (flag for PITFALLS researcher)
**Audience:** L2 (must know this DOES NOT work)
**Confidence:** HIGH
**Citation:** [Microsoft Q&A — What is the remove passcode used for in the case of shared iPad in Intune portal?](https://learn.microsoft.com/en-us/answers/questions/1192129/what-is-the-remove-passcode-used-for-in-the-case-o); [Shared iPad devices — Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad)

**The trap:** Intune exposes two passcode-related remote actions:
- **Reset Passcode** (`Devices > [device] > ... > Reset Passcode`) — sets a temporary passcode on the device
- **Remove Passcode** (`Devices > [device] > ... > Remove Passcode`) — removes the device passcode

**On a Shared iPad, BOTH of these affect the DEVICE-LEVEL passcode (rarely set on a managed Shared iPad), NOT the per-user Shared iPad partition passcode.** The per-user Shared iPad passcode that a user actually uses to sign in to their partition can ONLY be reset via Apple Business Path A (Workflow 4.1) or factory wipe.

**Why this is an anti-feature:** L1 and L2 staff coming from single-user iPad experience reasonably assume Intune's Reset Passcode remote action covers Shared iPad. It does not. Document this prominently in the v1.6 L1 Shared iPad runbook and L2 permission-denied diagnostic.

### 4.3 Path C: Apple Configurator (USB-Tethered Local Admin)

**Category:** Differentiator (edge-case last-resort path)
**Audience:** L2 (admin-attended local)
**Cross-platform:** Shared iPad only (any iPad, but for passcode-reset scenarios specifically the Shared iPad partition passcode)
**Confidence:** MEDIUM (Apple Configurator supports erase + re-supervise on USB-tethered iPad; this resets ALL Shared iPad user partitions, not a single user — different operational profile than Path A)
**Citation:** [Add devices using Apple Configurator to Apple Business Manager](https://support.apple.com/guide/apple-business-manager/add-devices-using-apple-configurator-axm200a54d59/web); [Add devices to ABM via Configurator](https://support.apple.com/guide/apple-configurator-mac/add-devices-apple-school-manager-business-apd7a57d9560/mac)

**Workflow (last-resort full-wipe path):**
1. L2 admin connects iPad to a Mac running Apple Configurator 2 via USB-C (or Lightning + adapter).
2. Apple Configurator 2 > select device > **Actions** > **Advanced** > **Erase All Content and Settings**.
3. Device factory-resets. All Shared iPad user partitions and their passcodes are destroyed.
4. On reboot, device re-runs Setup Assistant, re-enrolls via ADE, re-pulls Shared iPad configuration from Intune.

**When to use Path C vs A:** Use Path A for single-user passcode reset (99% of cases). Use Path C only when the device is unreachable from Apple Business (e.g., severed from network for extended period and admin needs to recover the device before getting it back online), or when the entire Shared iPad pool needs reset (mass passcode forgotten scenario in education-style deployments).

### 4.4 Path Selection Decision Matrix

| Scenario | Recommended Path | Reason |
|----------|------------------|--------|
| Single user forgot Shared iPad passcode (most common) | Path A (Apple Business UI) | Targeted, no other users impacted, fast |
| All users on one device forgot passcodes | Path A repeated per user OR Path C if unreachable | Path A scales linearly; Path C is faster when >5 users |
| Device offline / firewalled, can be brought to admin desk | Path C (Apple Configurator) | Path A requires device to receive MDM push; Path C is local |
| L1 thinks Intune Reset Passcode will fix it | **NEITHER — escalate to Path A** | Anti-feature trap (see 4.2) |
| Device returned from L2 with corrupted Shared iPad partition | Path C (factory reset + re-enroll) | Configuration-level corruption |

### 4.5 Dependencies

```
Workflow 1.6 (Custom Role bundle) — privilege "Reset Shared iPad Passcode"
    └─required-before──> Workflow 4.1 (Path A by L1)

Workflow 6 (Managed Apple Account exists for the Shared iPad user)
    └─required-before──> Workflow 4.1 (cannot reset a non-existent account's passcode)

Workflow 4.3 (Path C)
    └─requires──> Workflow 2.3 (device still assigned to a Location with valid MDM server)
                  └─else──> Workflow 5.1 (Release device first if pool is being decommissioned)
```

---

## 5. Device Release / Transfer / MDM Reassignment Workflow (THREE DISTINCT WORKFLOWS — DO NOT CONFLATE)

### 5.1 RELEASE: Remove Device from Apple Business Entirely

**Category:** Table-stakes
**Audience:** Admin (Device Enrollment Manager or higher)
**Cross-platform:** Cross-platform (iOS, iPadOS, macOS, tvOS)
**Confidence:** HIGH
**UI surface:** `Devices > [device(s)] > Release Devices`
**Citation:** [Assign, reassign, or unassign devices in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/assign-reassign-or-unassign-devices-axmf500c0851/web); [Apple Community — Adding a released device back into ABM](https://discussions.apple.com/thread/255677993)

**When to use:** Device is being sold, donated, returned to lessor, scrapped, or sent for RMA permanently.

**Workflow:**
1. Device Enrollment Manager (or higher) signs in.
2. **Devices** sidebar > select device(s) by serial / CSV.
3. **Release Devices** action > confirm.
4. Apple sends a release notification to the device's MDM server (Intune); Intune removes the device.
5. **At next factory reset**, device runs standard (non-managed) Setup Assistant. Device is no longer supervised, no longer in ABM.

**Device-side effects:**
- Existing supervision / MDM enrollment is NOT immediately broken — device continues to operate as-managed until next factory reset.
- After factory reset, device is "civilian" — can be sold or handed to a personal user.

**Re-adding a released device:** A released device CAN be re-added to Apple Business via Apple Configurator (Workflow 4.3 equivalent flow for re-add, not erase). The 30-day provisional period (during which the user can remove the device from ABM unilaterally) applies to Configurator-added devices.

**Audit trail:** Release event logged in Activity log with admin identity, device serial, and timestamp (see Workflow 7).

### 5.2 TRANSFER: Move Device Between Locations Within Same Apple Business

**Category:** Table-stakes
**Audience:** Admin (Device Enrollment Manager with privilege in both source AND target Location)
**Cross-platform:** Cross-platform
**Confidence:** HIGH
**UI surface:** `Devices > [device(s)] > Edit Location`
**Citation:** [Assign, reassign, or unassign devices in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/assign-reassign-or-unassign-devices-axmf500c0851/web)

**See Workflow 2.3 for full mechanics.** Key distinction from Release:
- Device stays in Apple Business.
- Device remains supervised / enrolled.
- Audit log records the Location-to-Location move.
- VPP licenses do NOT auto-transfer (see Workflow 3.4 dependency).
- If source and target Location use the SAME MDM server, no device-side effect.
- If source and target Location use DIFFERENT MDM servers, the device's next factory reset will route to the new server.

### 5.3 REASSIGN MDM SERVER: Same Apple Business, Different MDM Server (Two Sub-Paths)

**Category:** Table-stakes (with two sub-paths — legacy and OS-26+)
**Audience:** Admin (Device Enrollment Manager)
**Cross-platform:** Cross-platform
**Confidence:** HIGH
**Citation:** [Migrate managed devices to another device management service (Apple Deployment Guide)](https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web); [Migrate devices to a new management service (ABM)](https://support.apple.com/guide/apple-business-manager/migrate-devices-to-a-new-management-service-axm3a49a769d/web)

#### 5.3.1 Sub-path A: Legacy Reassign (iOS 18 / iPadOS 18 / macOS 15 and earlier)

**UI surface:** `Devices > [device(s)] > Edit MDM Server`

**Behavior:** Changing the MDM server in Apple Business updates the device's **next-factory-reset** routing. The currently-enrolled device continues talking to the OLD MDM server until factory wiped.

**Required device-side action:** Factory wipe the device, then have it re-run Setup Assistant. New MDM server enrolls device.

**Use case:** Tenant-to-tenant migration when accepting one factory-reset per device (greenfield rollouts, refresh cycles).

#### 5.3.2 Sub-path B: OS-26+ In-Place Migration (NO ERASE)

**UI surface:** `Devices > [device(s)] > Edit MDM Server` + new "Set deadline for completing enrollment" field.

**Eligibility:** Devices running **iOS 26 / iPadOS 26 / macOS 26 / tvOS 26 or later**.

**Behavior:**
1. Admin changes MDM server in Apple Business; sets enrollment deadline.
2. Device receives notification of pending migration.
3. User experiences guided migration: device unenrolls from old MDM (preserves user data + declarative managed apps), then enrolls in new MDM, which redeploys configs + managed apps.
4. Escalating notifications (daily, then hourly, then minute-by-minute in the final hour). If deadline passes, mandatory restart (iOS / iPadOS) or full-screen prompt (macOS) enforces migration.

**What is preserved:** All user data, declarative managed app data; managed app inventory the new MDM has re-pushed (apps not in new MDM's list are removed).

**What is NOT preserved:** MDM-installed configs, restrictions, VPN profiles, Wi-Fi profiles — the new MDM must redeploy these.

**VPP token implication:** The new MDM server must have a valid VPP/content token uploaded; VPP-purchased apps require new content-token-upload within 30 days of migration start.

**This is the canonical workflow for Intune-tenant-to-Intune-tenant migration without device wipe on supported OS versions.**

### 5.4 Workflow Selection Decision Matrix

| Goal | Workflow | Device Stays in ABM? | Device-Side Effect |
|------|----------|----------------------|---------------------|
| Sell / donate device | 5.1 Release | No | At next wipe, device becomes civilian |
| Move device between teams (same org) | 5.2 Transfer (Edit Location) | Yes | No device-side change unless MDM server differs |
| Move device between Intune tenants (greenfield) | 5.3.1 Legacy Reassign | Yes | Factory wipe required |
| Move device between Intune tenants (OS 26+, no wipe) | 5.3.2 In-Place Migration | Yes | User experiences guided unenroll/re-enroll, data preserved |

### 5.5 Audit Trail per Workflow

| Workflow | Logged Event |
|----------|--------------|
| 5.1 Release | "Device released" with admin, serial, timestamp, source Location |
| 5.2 Transfer | "Device Location changed" with admin, serial, timestamp, source + target Location |
| 5.3.1 Legacy Reassign | "MDM server changed" with admin, serial, timestamp, source + target MDM server |
| 5.3.2 In-Place Migration | "Device migration initiated" + "Device migration completed/failed" + per-device deadline metadata |

### 5.6 Dependencies

```
Workflow 5.2 (Transfer between Locations)
    └─dependency──> Workflow 3.4 (License transfer must be done separately — anti-feature edge)

Workflow 5.3.2 (OS-26 in-place migration)
    └─requires──> All target devices on OS 26+ (mixed-OS fleets must split into two waves)
    └─requires──> New MDM has valid VPP/content token uploaded
    └─requires──> Source and target are both within ABM (cross-Apple-Business migration NOT supported — out of v1.6 scope)
```

---

## 6. Managed Apple Account Provisioning Workflow (FOUR PATHS)

### 6.1 Path A: Manual Account Creation in Apple Business UI

**Category:** Table-stakes (every org needs to know this path even if they federate)
**Audience:** Admin (People Manager or higher)
**Cross-platform:** Cross-platform (accounts span devices)
**Confidence:** HIGH
**UI surface:** `Users > Add (+) > Add Account`
**Citation:** [Apple Business Manager — sign-up and account creation](https://support.apple.com/guide/apple-business-manager/sign-up-axm402206497/web); [About Managed Apple Accounts in Apple Business Manager](https://support.apple.com/en-sa/guide/apple-business-manager/axm78b477c81/web)

**Workflow:**
1. People Manager (or Admin): **Users** sidebar > **Add (+)**.
2. Enter user details: first/middle/last name, Managed Apple Account (must be unique within Apple's global Apple Account namespace), Location, role(s).
3. Optionally set a temporary password OR generate a one-time verification code.
4. Save. User receives an email or printable sheet with sign-in info.
5. User signs in on a managed device or at appleid.apple.com to set permanent password.

**Use case:** Small orgs (<100 users), test/break-glass accounts, accounts that don't exist in the IdP (e.g., a contractor with Apple-only access).

### 6.2 Path B: SCIM Provisioning from Microsoft Entra ID

**Category:** Table-stakes (most enterprise orgs use this for production)
**Audience:** Admin (Federation privilege)
**Confidence:** HIGH
**UI surface:** `Account (top-right) > Preferences > Federated Authentication / Directory Sync > Microsoft Entra ID`
**Citation:** [Sync user accounts from your identity provider in Apple Business Manager](https://support.apple.com/en-gb/guide/apple-business-manager/axm526a05814/web); [HCS Online — Renew your SCIM Token for Directory Sync between Apple Business Manager and Microsoft Entra ID](https://hcsonline.com/support/resources/white-papers/renew-your-scim-token-for-directory-sync-between-apple-business-manager-and-microsoft-entra-id)

**Workflow:**
1. Admin sets up Microsoft Entra Enterprise App for Apple Business (gallery app: "Apple Business Manager") OR uses the new "Apple Business" enterprise gallery app.
2. Configure SCIM endpoint and tenant URL.
3. Generate SCIM token in Apple Business UI > paste into Entra.
4. Map attributes (UPN → Managed Apple Account, displayName, etc.).
5. Assign Entra groups to the enterprise app for sync scope.
6. Start provisioning. Accounts appear in Apple Business with **account source: Microsoft Entra Connect Sync** and federated authentication enabled.

**Token renewal:** SCIM token expires; Apple sends renewal notice at 60 days. **Failure to renew = sync stops; new accounts don't appear.** Annual operational concern.

### 6.3 Path C: OIDC Federated Authentication (JIT — Just-In-Time Provisioning)

**Category:** Differentiator (newer, simpler than SCIM for some orgs)
**Audience:** Admin (Federation privilege)
**Confidence:** HIGH
**UI surface:** `Account > Preferences > Federated Authentication > Microsoft Entra ID > OIDC`
**Citation:** [Use federated authentication with Microsoft Entra ID in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/federated-authentication-microsoft-entra-axm8c1cac980/web); [Cloudtek Space — Federate with Entra and Apple Business Manager](https://www.cloudtekspace.com/post/federate-with-entra-and-apple-business-manager)

**Key fact:** OIDC supports **JIT provisioning** — when a user signs in with their Entra account for the first time on an Apple device, a Managed Apple Account is auto-created in Apple Business if one doesn't already exist. No upfront SCIM sync required.

**Constraints:**
- User's Entra UPN must match their email address.
- Sign-in method must be OIDC (not legacy SAML federation).
- Scope access: `ssf.manage` and `ssf.read` permissions in Entra.

**SCIM vs OIDC choice (for v1.6 decision matrix):**

| Criterion | SCIM (Path B) | OIDC + JIT (Path C) |
|-----------|---------------|---------------------|
| Upfront sync | Yes (all users pre-staged) | No (lazy, on first sign-in) |
| Visibility in Apple Business before user signs in | Yes | No (account doesn't exist until JIT) |
| Suited for shared iPad pre-staging | YES (must pre-stage user accounts) | NO (Shared iPad needs accounts pre-existing for passcode reset L1 path) |
| Token renewal burden | Annual SCIM token renewal | None (OIDC tokens managed by Entra) |
| Recommendation | Shared iPad fleets + account-driven User Enrollment with pre-known users | macOS/iOS supervised single-user fleets, ad-hoc user adds |

### 6.4 Path D: Account-Driven Enrollment Intersection

**Category:** Table-stakes (intersection with v1.3 account-driven User Enrollment)
**Audience:** Admin
**Confidence:** HIGH
**Citation:** [iOS/iPadOS Account-Driven User Enrollment](../../docs/admin-setup-ios/08-user-enrollment.md) (existing corpus); [About Managed Apple Accounts](https://support.apple.com/en-sa/guide/apple-business-manager/axm78b477c81/web)

**Intersection:** When a user enrolls via Account-Driven User Enrollment (iOS 15+) on a personal device:
- The user MUST sign in with a Managed Apple Account (NOT personal Apple ID).
- The Managed Apple Account MUST have been provisioned via Path A, B, or C BEFORE the user attempts enrollment.
- The account's Location at provisioning time dictates which VPP/content token's user-licensed apps the user gets.

**Implication for v1.6:** The User Enrollment runbook (existing v1.3 doc) does NOT cover the case where the user's account is in the WRONG Location. Add a cross-reference in the v1.6 multi-org admin setup guide.

### 6.5 Account Roaming Between Locations

**Category:** Differentiator
**Audience:** Admin (People Manager)
**Confidence:** MEDIUM (Apple's public docs describe account transfer between Locations but operational details around what carries over — license assignments, federated state — are less explicit)
**UI surface:** `Users > [user] > Edit > Location > [new Location] > Save`
**Citation:** [Configure locations in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/configure-locations-axmfdbe2cb0d/web); [Transfer licenses to another location](https://support.apple.com/guide/apple-business-manager/transfer-licenses-axm1242b0715/web)

**Workflow:**
1. People Manager: **Users** > select user > **Edit** > change Location > **Save**.
2. Account moves to new Location.
3. User's previously-assigned VPP user-licensed apps may need re-assignment from the new Location's catalog if the old Location's licenses are revoked.

**Key gotcha:** If the user account was created via SCIM from Entra, manual Location reassignment may be overwritten on next SCIM sync if the SCIM mapping enforces a specific Location. Document this in v1.6 anti-pattern callouts.

### 6.6 Dependencies

```
Workflow 6 (any path)
    └─required-before──> Workflow 1.1 (Assign role to account)
    └─required-before──> Workflow 4.1 (Reset Shared iPad Passcode for user)
    └─required-before──> Workflow 6.4 (Account-Driven User Enrollment)
    └─required-before──> Shared iPad sign-in by user

Workflow 6.2 (SCIM)
    └─requires──> SCIM token renewed annually

Workflow 6.5 (Account roaming)
    └─may conflict with──> Workflow 6.2 (SCIM enforces Location mapping)
```

---

## 7. Audit Log Workflow

### 7.1 Activity Log Access

**Category:** Table-stakes
**Audience:** Admin + L2 (compliance/security investigations)
**Cross-platform:** Cross-platform (logs cover all device types and admin actions)
**Confidence:** HIGH
**UI surface:** `Activity (sidebar)`
**Citation:** [View activity in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/view-activity-axmf7d043c03/web); [Read log files in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/read-log-files-axm90f9d53f2/web)

**Required privileges:** "Read log files" privilege on user's role. Built-in: Administrator. Custom-role-delegatable to L2 / security users.

**Workflow:**
1. Sign in with privilege.
2. **Activity** sidebar.
3. Search by:
   - **Category** (Devices, Users, Content / Apps and Books, MDM servers, Federation, Locations, etc.)
   - **Event name** (e.g., "Device released", "License purchased", "Password reset")
   - **Activity status** (Completed, Failed, In progress)
   - **Date range**
4. Select event > view detailed log message (UPDATED / FAILED / IN PROGRESS).
5. **Download Logs** to export.

### 7.2 What Is Logged

Per Apple's `view-activity` page, all admin actions are logged. Confirmed-logged categories include:

| Category | Example Events |
|----------|----------------|
| Devices | Device assigned, reassigned, unassigned, released, MDM server changed, Location changed, migration initiated/completed |
| Users | Account created / edited / deleted, role assigned, password reset, Shared iPad passcode reset, federation events |
| Content (Apps and Books) | License purchased, transferred between Locations, revoked, payment method changed |
| MDM Servers | MDM server added / edited / deleted, server token regenerated |
| Federation | SCIM token created / renewed, OIDC configuration changed, federation enabled/disabled |
| Locations | Location created / edited / deleted, default-location changed |

### 7.3 Filtering by Location / Role / Admin

**Confidence:** MEDIUM (Apple's public docs confirm filtering by category, event, status, date; filtering by Location and admin is reported in community posts but Apple's own doc page doesn't enumerate every filter dimension)
**Implication:** v1.6 audit-scoping runbook should screenshot the in-portal filter UI to document the canonical filter dimensions.

### 7.4 Export Format

**Confidence:** HIGH (for general "Download Logs" + CSV device-assignment export)
**Citation:** [Read log files in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/read-log-files-axm90f9d53f2/web)

- **Download Logs** button on the Activity page exports the filtered log set.
- File format: Text/log file (browser downloads via standard file dialog).
- For device-assignment-specific events: **CSV with serial numbers** is downloadable via a separate Download button on the assignment event.

### 7.5 Retention Policy

**Confidence:** LOW (Apple's public documentation does NOT enumerate an explicit retention period; community sources reference "approximately 90 days" but Apple has not committed to this number publicly)
**Recommendation for v1.6 audit runbook:** Document this as "Apple does not publish a definitive retention period; rotate exported logs to long-term storage in your SIEM / log archive at least monthly to ensure compliance evidence retention."

### 7.6 API Access for Audit Log

**Confidence:** HIGH
**Answer:** **There is no public Apple Business REST API for activity log export.** Audit log access is UI-only. This is a documented limitation — flag for PITFALLS and as a "what NOT to document" boundary (admins asking for automation should be redirected to Apple Feedback Assistant).

### 7.7 Dependencies

```
Workflow 7.1 (Audit log access)
    └─requires──> Custom role with "Read log files" privilege OR built-in Administrator role
    └─scoped-by──> Location (audit entries are visible based on Location-scope of viewer's privileges)
```

---

## 8. Apple TV Management Workflow

### 8.1 Provisioning: Add Apple TV to Apple Business

**Category:** Table-stakes (for orgs deploying Apple TVs)
**Audience:** Admin (Device Enrollment Manager) + L2 (for Configurator-based adds)
**Cross-platform:** Apple TV (tvOS) only
**Confidence:** HIGH
**Citation:** [Add devices using Apple Configurator to Apple Business Manager](https://support.apple.com/guide/apple-business-manager/add-devices-using-apple-configurator-axm200a54d59/web); [SimpleMDM — Enroll Apple TV into MDM](https://simplemdm.com/blog/enroll-appletv-mdm/); [Manage Engine — MDM enroll Apple TV ABM using Apple Configurator](https://www.manageengine.com/mobile-device-management/how-to/mdm-enroll-apple-tv-abm-using-apple-configurator.html)

**Two provisioning paths:**

#### 8.1.1 Path A: Reseller Direct (Like Mac/iPhone/iPad)

Apple TVs purchased directly from Apple, an Apple Authorized Reseller, or authorized cellular carrier with the org's Apple Customer Number arrive pre-loaded into Apple Business. They appear in `Devices > Apple TV` and can be assigned to an MDM server like any other device.

#### 8.1.2 Path B: Apple Configurator USB Add-In (Devices NOT Purchased via Reseller Path)

For Apple TVs not purchased through the linked reseller channel (e.g., older inventory, retail purchases, refurbished units):

1. L2 admin runs **Apple Configurator 2** on a Mac.
2. Connect Apple TV to Mac via USB-C (Apple TV HD or 4K Gen 1+) or via same-network Ethernet + 6-digit PIN displayed on Apple TV (Apple TV 4K Gen 2+).
3. In Apple Configurator: **Select Apple TV** > **Add to Apple Business Manager** > select org > Apple TV appears in Apple Business `Devices` within ~5 minutes.
4. Assign to MDM server.

**30-day provisional period:** Apple Configurator-added devices grant the end-user 30 days to remove the device from supervision via Settings. After 30 days, supervision is locked.

### 8.2 Restrictions / Configuration

**Category:** Out-of-scope for v1.6 (Intune-side concern per scope-boundary)
**Note:** Apple Business assigns the Apple TV to an MDM server; the MDM server (Intune) handles restrictions, AirPlay config, conference-room mode, etc. **v1.6 documents only the Apple Business assignment side.**

### 8.3 Retire / Release Apple TV

**Category:** Table-stakes
**Audience:** Admin (Device Enrollment Manager)
**Confidence:** HIGH

Same as Workflow 5.1 (Release) — Apple TV is released from Apple Business via `Devices > [Apple TV] > Release Devices`. Device returns to civilian state on next factory reset.

### 8.4 Reassign Apple TV Between Locations

**Category:** Table-stakes
**Audience:** Admin
**Confidence:** HIGH

Same as Workflow 5.2 — `Devices > [Apple TV] > Edit Location`.

### 8.5 Pool Lifecycle (Conference-Room Pool Management)

**Category:** Differentiator
**Audience:** Admin
**Confidence:** MEDIUM (the "pool" concept is operational rather than a distinct Apple Business feature — Apple TVs are managed as individual devices; the "pool" framing is an org-management abstraction)

**Workflow:** Group Apple TVs by Location (e.g., "HQ Conference Rooms" Location). Apply uniform MDM server assignment. Bulk-release at end of life via CSV.

**v1.6 runbook note:** Document the Apple-TV-pool workflow as "treat as a per-Location set of devices; use CSV bulk operations for at-scale lifecycle moves."

### 8.6 Dependencies

```
Workflow 8.1.2 (Apple Configurator add)
    └─requires──> Physical Mac + Apple Configurator 2 + USB or Ethernet to Apple TV

Workflow 8.4 (Apple TV Location move)
    └─follows──> Workflow 5.2 (same mechanics as iPad/Mac)
```

---

## Cross-Workflow Dependency Graph (DAG)

```
                          ┌───────────────────────────────────────┐
                          │  2.1 Create Location (Admin only)     │
                          └────────────────────┬──────────────────┘
                                               │
              ┌────────────────────────────────┼───────────────────────────────┐
              │                                │                               │
              ▼                                ▼                               ▼
   ┌──────────────────────┐    ┌──────────────────────────┐    ┌──────────────────────────┐
   │ 1.4 Scope role to    │    │ 3.5 Buy apps for sub-org │    │ 6 Provision Managed      │
   │     Location         │    │     (per-Location ctlg)  │    │   Apple Account          │
   └──────────┬───────────┘    └────────────┬─────────────┘    └────────────┬─────────────┘
              │                              │                              │
              ▼                              ▼                              ▼
   ┌──────────────────────┐    ┌──────────────────────────┐    ┌──────────────────────────┐
   │ 1.1 Create + assign  │◄───┤ 3.2 Sub-org claims       │    │ 6.4 User can enroll      │
   │     custom role      │    │     content token        │    │     (account-driven UE)  │
   └──────────┬───────────┘    └────────────┬─────────────┘    └──────────────────────────┘
              │                              │
              │   ┌──────────────────────────┴────────────────────────────┐
              │   │                                                       │
              ▼   ▼                                                       ▼
   ┌──────────────────────────┐                              ┌──────────────────────────┐
   │ 1.6 Min-viable bundle    │                              │ 3.4 License transfer     │
   │ • Device mgmt            │                              │     between Locations    │
   │ • Content mgmt           │                              │ (unassigned only)        │
   │ • Reset Shared iPad pwd  │                              └────────────┬─────────────┘
   │ • Read logs              │                                           │
   └──────────┬───────────────┘                                           │
              │                                                           │
              ▼                                                           │
   ┌──────────────────────────┐                                           │
   │ Sub-org admin can now:   │                                           │
   │ - 4.1 Reset SP iPad pwd  │                                           │
   │ - 5.1 Release device     │                                           │
   │ - 5.2 Move device locn   │◄──────────────────────────────────────────┘
   │ - 5.3 Reassign MDM srv   │       (Workflow 5.2 + 3.4 must be
   │ - 7.1 Audit own scope    │        sequenced together — Anti-feature)
   └──────────────────────────┘

   ┌──────────────────────────┐    ┌──────────────────────────┐
   │ 2.3 Move devices         │    │ 6.5 Move accounts        │
   │  (sub-prereq for 2.4)    │    │  (sub-prereq for 2.4)    │
   └────────────┬─────────────┘    └────────────┬─────────────┘
                └──────────────────┬────────────┘
                                   ▼
                      ┌──────────────────────────┐
                      │ 2.4 Delete Location      │
                      │ (all assets must move)   │
                      └──────────────────────────┘
```

---

## Anti-Features (Flagged for PITFALLS Researcher)

Workflows that LOOK like they should work but DON'T, or have sharp edges that cause silent failures:

| Anti-Feature | Why It Trips People Up | Reality | Document Where |
|---|---|---|---|
| **Intune "Reset Passcode" / "Remove Passcode" on Shared iPad** (4.2) | L1 sees iOS device and assumes Intune passcode action works | Affects device-level passcode, NOT per-user Shared iPad partition passcode. Only Apple Business UI Path A or Apple Configurator factory wipe works. | L1 Shared iPad runbook + L2 permission-denied diagnostic |
| **Device move between Locations preserving VPP licenses** (5.2 + 3.4) | "I moved the device, why are the apps gone?" | License transfer is a SEPARATE workflow with hard "only-unassigned" prerequisite — must revoke first | v1.6 device-transfer runbook + v1.6 VPP runbook cross-link |
| **Single global content token / catalog** (3.1) | Multi-tenant ABM admins assume one token consolidates all locations | Each Location still has its own token + catalog post-2024 Apps-and-Books refresh | Rebrand glossary callout |
| **Audit log API for automation** (7.6) | Compliance/SOC admins expect API export | UI-only download, no public REST API | v1.6 audit runbook + "out-of-scope" callout |
| **OS 26 in-place migration on mixed-OS fleets** (5.3.2) | "Just turn on migration" assumes all devices support it | Only iOS 26 / iPadOS 26 / macOS 26 / tvOS 26+ — older OS still requires factory reset | v1.6 MDM-reassign runbook + version matrix |
| **Location deletion without prerequisites** (2.4) | "I'll delete this empty Location" — but it's not empty | Apple validates accounts + licenses + devices + role scopes all moved first; otherwise rejection | v1.6 Location-archival runbook |
| **SCIM-from-Entra Location override on manual roaming** (6.5) | Admin manually moves a SCIM-managed account to a new Location | Next SCIM sync may overwrite the manual move | v1.6 account-provisioning runbook anti-pattern |
| **"Reset Shared iPad Passcode" changing federated password** (4.1) | Admin assumes resetting Shared iPad passcode also fixes Entra sign-in issues | Shared iPad passcode is separate from federated password | L1 Shared iPad runbook + federation context |
| **Release-then-readd round-trip via Apple Configurator** (5.1) | Admin releases a device thinking they can readd it later | Re-add via Configurator triggers the 30-day provisional period, not the same as the original reseller-direct status | v1.6 device-release runbook |
| **Custom role privilege change blast radius** (1.5) | Admin removes a privilege from a custom role thinking it affects one user | Affects EVERY user holding that role across EVERY Location | v1.6 custom-role-authoring runbook |

---

## Cross-Platform Applicability Matrix

| Workflow | Windows | macOS | iOS / iPadOS | Shared iPad | Apple TV |
|----------|---------|-------|--------------|-------------|----------|
| 1. Custom role authoring | n/a | ✓ (governance affects) | ✓ (governance affects) | ✓ (governance affects) | ✓ (governance affects) |
| 2. Locations | n/a | ✓ | ✓ | ✓ | ✓ |
| 3. VPP / content token | n/a | ✓ | ✓ | ✓ | ✓ (tvOS apps) |
| 4. Shared iPad passcode reset | n/a | n/a | n/a | ✓ ONLY | n/a |
| 5. Device release / transfer / MDM reassign | n/a | ✓ | ✓ | ✓ | ✓ |
| 6. Managed Apple Account provisioning | n/a | ✓ (federation, SCIM) | ✓ (User Enrollment, Shared iPad) | ✓ REQUIRED | ✓ (less common) |
| 7. Audit log | n/a | ✓ (entries logged) | ✓ (entries logged) | ✓ (entries logged) | ✓ (entries logged) |
| 8. Apple TV management | n/a | n/a | n/a | n/a | ✓ ONLY |

---

## Audience Reach per Workflow

| Workflow | Admin | L1 | L2 |
|----------|:-----:|:--:|:--:|
| 1.1 Create custom role | ✓ (primary) | — | — |
| 1.4 Scope role to Location | ✓ (primary) | — | — |
| 1.5 Modify / revoke role | ✓ (primary) | — | — |
| 1.6 Min-viable bundle template | ✓ (primary) | — | — |
| 2.1 Create Location | ✓ (primary) | — | — |
| 2.3 Move devices between Locations | ✓ (primary) | — | ✓ (escalation diagnosis) |
| 2.4 Delete Location | ✓ (primary) | — | — |
| 3.2 Sub-org admin claims token | ✓ (primary) | — | — |
| 3.4 License transfer | ✓ (primary) | — | ✓ (cross-Location license diag) |
| 3.5 Buy apps for sub-org | ✓ (primary) | — | — |
| 4.1 Shared iPad passcode reset (Path A) | ✓ | ✓ (delegated via privilege bundle) | — |
| 4.2 Anti-feature: Intune Reset Passcode on Shared iPad | — | ✓ (must know NOT to use) | ✓ (permission-denied diag) |
| 4.3 Apple Configurator factory wipe (Path C) | — | — | ✓ (primary) |
| 5.1 Release device | ✓ (primary) | — | ✓ (asset lifecycle diag) |
| 5.2 Transfer device between Locations | ✓ (primary) | — | — |
| 5.3.1 Legacy MDM reassign | ✓ (primary) | — | ✓ (greenfield rollouts) |
| 5.3.2 OS-26+ in-place migration | ✓ (primary) | — | ✓ (mixed-OS-wave planning) |
| 6.1 Manual account creation | ✓ (primary) | — | — |
| 6.2 SCIM provisioning | ✓ (primary) | — | ✓ (token-renewal failure diag) |
| 6.3 OIDC + JIT | ✓ (primary) | — | ✓ (federation diag) |
| 6.4 User Enrollment intersection | ✓ (primary) | — | ✓ (account-location mismatch diag) |
| 6.5 Account roaming | ✓ (primary) | — | ✓ (SCIM-overwrite diag) |
| 7.1 Audit log access | ✓ (primary) | — | ✓ (security investigation) |
| 7.6 API expectation (anti-feature) | ✓ (must know) | — | ✓ (must know) |
| 8.1 Add Apple TV | ✓ (primary) | — | ✓ (Configurator path) |
| 8.3 Release Apple TV | ✓ (primary) | — | — |
| 8.4 Apple TV Location reassign | ✓ (primary) | — | — |

---

## MVP Definition for v1.6 Documentation

### Launch With (v1.6 Pillar 3 — Delegation Runbooks)

Per `<milestone_context>`, the user-confirmed delegation surface is VPP, shared iPad passcode reset, device release. Mapped to workflows above:

- [x] **1.1 + 1.4 + 1.5 — Custom Role Authoring Guide** (foundation for everything; without this, no delegation)
- [x] **1.6 — Min-Viable Bundle Template** (the canonical "sub-org device admin" recipe)
- [x] **2.1 + 2.3 + 2.4 — Multi-Location Architecture Guide** (foundation for everything; without this, no Location-scoping)
- [x] **3.2 + 3.4 + 3.5 — VPP Content Token Consolidation Runbook** (Pillar 3 confirmed scope)
- [x] **4.1 — Shared iPad Passcode Reset Runbook (Path A)** (Pillar 3 + Pillar 4 L1 confirmed scope)
- [x] **4.2 — Anti-feature callout for Intune Reset Passcode on Shared iPad** (Pillar 4 L2 confirmed scope: permission-denied diagnostic)
- [x] **5.1 — Device Release Runbook** (Pillar 3 confirmed scope)
- [x] **5.2 + 5.3.1 + 5.3.2 — Device Transfer + MDM Reassign Runbook** (Pillar 3 multi-cohort scope)
- [x] **6.1 + 6.2 + 6.3 — Managed Apple Account Provisioning Runbook** (Pillar 3 confirmed scope)
- [x] **7.1 — Audit Log Scoping Runbook** (Pillar 3 confirmed scope)
- [x] **8.1 + 8.3 + 8.4 — Apple TV Multi-Org Provisioning Runbook** (Pillar 3 confirmed scope: "shared iPad / Apple TV pool lifecycle")

### Add If Time Permits (v1.6 stretch)

- [ ] **4.3 — Apple Configurator Path C** runbook (last-resort wipe path; admin-only, not in confirmed L1/L2 scope but useful as a Differentiator)
- [ ] **6.5 — Account Roaming** detail (Differentiator; covered briefly in 6 main runbook)

### Future Consideration (v1.7+)

- [ ] Apple Business → Apple Business cross-tenant operations (currently OUT OF SCOPE per PROJECT.md inter-tenant boundary)
- [ ] Apple Business REST API automation (currently no public API; depends on future Apple roadmap)
- [ ] Apple Business Connect customer-listing workflows (rebrand consolidation: Apple Business inherits these from ABC, but out-of-scope for IT device-management workflows)
- [ ] School-specific ASM features (Classroom, Schoolwork, Class Roster) — explicitly out-of-scope per `<downstream_consumer>`

---

## Feature Prioritization Matrix (Documentation Workflows)

Priority key: P1 = Pillar 3 confirmed scope (must ship in v1.6); P2 = supporting docs (Pillars 1 + 2 + 4); P3 = stretch / nice-to-have.

| Workflow | User Value | Documentation Cost | Priority |
|----------|------------|---------------------|----------|
| 1.1 + 1.4 + 1.5 Custom Role Authoring | HIGH | MEDIUM (privilege matrix screenshots required) | P1 |
| 1.6 Min-Viable Bundle Template | HIGH | LOW | P1 |
| 2.1 + 2.3 + 2.4 Multi-Location Architecture | HIGH | MEDIUM | P1 |
| 3.2 + 3.4 + 3.5 VPP Content Token | HIGH | MEDIUM | P1 |
| 4.1 Shared iPad Passcode (Path A) | HIGH | LOW (single-portal flow) | P1 |
| 4.2 Anti-feature: Intune Reset Passcode | HIGH | LOW (single callout) | P1 |
| 5.1 Device Release | HIGH | LOW | P1 |
| 5.2 Transfer between Locations | HIGH | LOW | P1 |
| 5.3.1 + 5.3.2 MDM Reassign (legacy + OS-26) | HIGH | MEDIUM (OS-version matrix) | P1 |
| 6.1 + 6.2 + 6.3 Account Provisioning (3 paths) | HIGH | MEDIUM-HIGH (SCIM + OIDC each complex) | P1 |
| 6.4 User Enrollment intersection | MEDIUM | LOW (cross-link to v1.3 existing doc) | P1 |
| 7.1 Audit Log Access | HIGH | LOW | P1 |
| 7.6 No-API anti-feature callout | MEDIUM | LOW | P1 |
| 8.1 + 8.3 + 8.4 Apple TV Lifecycle | MEDIUM | LOW | P1 |
| 4.3 Apple Configurator Path C | LOW | MEDIUM | P3 |
| 6.5 Account Roaming detail | LOW | LOW | P3 |

---

## What NOT to Document (Out-of-Scope per Downstream Consumer)

- **School-specific ASM features** — Classroom, Schoolwork, class rosters, Managed Apple ID for students
- **Consumer Apple ID flows** — Personal Apple IDs, App Store family sharing
- **Apple Business Connect customer-listing workflows** — out-of-scope (orthogonal to device management; inherited from ABC consolidation but not IT-device-relevant)
- **Inter-tenant patterns** — Multi-account Apple Business federation (per PROJECT.md scope boundary)
- **Intune-side actions** — Per PROJECT.md hard scope boundary: Intune RBAC, configuration profile authoring, compliance authoring, enrollment profile authoring are MDM concerns, NOT Apple Business workflows
- **Apple Business Manager UI screenshots from pre-rebrand era** — rebrand handling is glossary + 2 intro callouts only (no retroactive sweep)

---

## Confidence Summary

| Workflow | Confidence | Why |
|----------|------------|-----|
| 1. Custom Role Authoring | HIGH | Apple's docs + community sources align; built-in roles well-documented |
| 1.6 Min-Viable Bundle | MEDIUM | Synthesized recommendation from v1.6 scope; no Apple "official" template exists |
| 2. Locations | HIGH | Apple's `configure-locations` page is detailed and current |
| 3. VPP / Content Token | HIGH | Apple's Apps and Books docs + Microsoft Intune docs cross-verify per-location model |
| 4.1 Shared iPad Passcode (Path A) | HIGH | Apple's `axm61439a814` reset page is detailed; delivery methods (PDF/CSV) confirmed |
| 4.2 Intune Anti-feature | HIGH | Microsoft Q&A + Microsoft Learn confirm Shared iPad limitation |
| 4.3 Apple Configurator (Path C) | MEDIUM | Workflow inferred from Apple Configurator docs; explicit "shared iPad passcode reset via Configurator" not a documented use case but is functionally equivalent to wipe-and-readd |
| 5. Device Release / Transfer / MDM Reassign | HIGH | Apple's `assign-reassign-or-unassign-devices` + `migrate-devices-to-a-new-management-service` + `migrate-managed-devices` deployment guides are comprehensive |
| 5.3.2 OS-26+ in-place migration | HIGH | Apple's deployment guide describes the new flow in detail; Miradore + Jamf + Addigy community articles cross-verify |
| 6.1 Manual provisioning | HIGH | Apple's account creation flow is well-documented |
| 6.2 SCIM | HIGH | Apple + Microsoft + HCS guide all align |
| 6.3 OIDC + JIT | HIGH | Apple's `federated-authentication-microsoft-entra` page is detailed |
| 6.5 Account roaming | MEDIUM | Workflow exists; specific behavior with SCIM overlay is less documented |
| 7.1 - 7.4 Audit log | HIGH | Apple's `view-activity` + `read-log-files` pages document the UI and export |
| 7.5 Retention period | LOW | Apple does NOT publish retention; community guesses ~90 days but unverified |
| 7.6 No public REST API | HIGH | Verified absence — no API documented |
| 8.1 Apple TV provisioning | HIGH | Apple's Configurator docs + multi-MDM community guides align |

---

## Sources

### Apple Official Documentation (HIGH-confidence)

- [Intro to roles and privileges in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web)
- [View and assign roles in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/view-and-assign-roles-axmb46d473c7/web)
- [Role privileges in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/role-privileges-tes97dd59159/web)
- [Configure locations in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/configure-locations-axmfdbe2cb0d/web)
- [Edit or remove a location in Apple Business](https://support.apple.com/guide/business/edit-or-remove-a-location-abcb7fc491ec/web)
- [Assign, reassign, or unassign devices in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/assign-reassign-or-unassign-devices-axmf500c0851/web)
- [Migrate devices to a new management service (ABM)](https://support.apple.com/guide/apple-business-manager/migrate-devices-to-a-new-management-service-axm3a49a769d/web)
- [Migrate managed devices to another device management service (Apple Deployment Guide)](https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web)
- [Automated Device Enrollment and device management (Apple Deployment Guide)](https://support.apple.com/guide/deployment/automated-device-enrollment-management-dep73069dd57/web)
- [Create Shared iPad passcodes in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/create-shared-ipad-passcodes-axm124535e27/web)
- [Reset a Shared iPad passcode in Apple Business Manager](https://support.apple.com/en-gb/guide/apple-business-manager/axm61439a814/1/web/1)
- [Create or reset user passwords in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/create-or-reset-user-passwords-axmd9c4cbc33/web)
- [Intro to buying content in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/intro-to-buying-content-axme19b23f7f/web)
- [Get licenses for apps and books in Apple Business](https://support.apple.com/guide/business/get-licenses-for-apps-and-books-axmc21817890/web)
- [Transfer licenses to another location in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/transfer-licenses-axm1242b0715/web)
- [Distribute content with Apps and Books in Apple School Manager, Apple Business Essentials, and Apple Business Manager](https://support.apple.com/en-us/103264)
- [View activity in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/view-activity-axmf7d043c03/web)
- [Read log files in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/read-log-files-axm90f9d53f2/web)
- [Add devices using Apple Configurator to Apple Business Manager](https://support.apple.com/guide/apple-business-manager/add-devices-using-apple-configurator-axm200a54d59/web)
- [Add devices to Apple School Manager or Apple Business Manager in Apple Configurator for Mac](https://support.apple.com/guide/apple-configurator-mac/add-devices-apple-school-manager-business-apd7a57d9560/mac)
- [Use federated authentication with Microsoft Entra ID in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/federated-authentication-microsoft-entra-axm8c1cac980/web)
- [Sync user accounts from your identity provider in Apple Business Manager](https://support.apple.com/en-gb/guide/apple-business-manager/axm526a05814/web)
- [About Managed Apple Accounts in Apple Business Manager](https://support.apple.com/en-sa/guide/apple-business-manager/axm78b477c81/web)
- [Sign up for Apple Business](https://support.apple.com/guide/business/sign-up-and-verify-your-organization-axm402206497/web)
- [Integrate Apple devices with Microsoft Entra ID (Apple Deployment Guide)](https://support.apple.com/guide/deployment/integrate-with-microsoft-entra-id-depa85a35cf2/web)

### Microsoft Documentation (HIGH-confidence for Intune side)

- [Manage Apple Volume-Purchased Apps — Microsoft Intune](https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple)
- [Shared iPad devices — Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad)
- [Device Action: Remove Passcode — Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/device-remove-passcode)
- [Device Action: Reset Passcode — Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/device-passcode-reset)
- [What is the remove passcode used for in the case of shared iPad in Intune portal? — Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/1192129/what-is-the-remove-passcode-used-for-in-the-case-o)
- [Set up automated device enrollment (ADE) for iOS/iPadOS](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-ios)

### Community / Vendor Sources (MEDIUM-confidence, cross-verified where used)

- [HardSoft Computers — Understanding Role Privileges in Apple Business Manager](https://www.hardsoftcomputers.co.uk/blog/apple-business-manager/understanding-role-privileges-in-apple-business-manager/)
- [Cloudtek Space — Provision managed Apple IDs in ABM with Entra and SCIM](https://www.cloudtekspace.com/post/provision-managed-apple-ids-in-abm-with-entra-and-scim)
- [Cloudtek Space — Federate with Entra and Apple Business Manager](https://www.cloudtekspace.com/post/federate-with-entra-and-apple-business-manager)
- [HCS Online — Renew your SCIM Token for Directory Sync between Apple Business Manager and Microsoft Entra ID](https://hcsonline.com/support/resources/white-papers/renew-your-scim-token-for-directory-sync-between-apple-business-manager-and-microsoft-entra-id)
- [The Sequence — Federated Authentication in Apple Business Manager with Azure AD / Office 365](https://the-sequence.com/federated-authentication-in-apple-business-manager-with-azure-ad-office-365)
- [Ivanti — Apple Business Manager Device Migration: What You Need to Know](https://www.ivanti.com/blog/apple-business-manager-device-migration-what-you-need-to-know)
- [Miradore — Migrate Apple devices running iOS 26 / iPadOS 26 / macOS 26+ without factory reset](https://www.miradore.com/knowledge/apple/ios-ipados-macos26-migration-without-factory-reset/)
- [Miradore — Migrate Apple devices running iOS 18 / iPadOS 18 / macOS 15 with factory reset](https://www.miradore.com/knowledge/apple/apple-migration-with-factory-reset/)
- [Addigy — Migrating MDM Devices Using Apple Business Manager (ABM) and OS 26+](https://support.addigy.com/hc/en-us/articles/46108153085459-Migrating-MDM-Devices-Using-Apple-Business-Manager-ABM-and-OS-26)
- [Jamf — Easier MDM Migrations](https://www.jamf.com/blog/easier-mdm-migrations/)
- [SimpleMDM — How to enroll an Apple TV into your MDM](https://simplemdm.com/blog/enroll-appletv-mdm/)
- [SimpleMDM — How to migrate macOS devices between MDMs](https://simplemdm.com/blog/mdm-migration/)
- [ManageEngine — How to enroll Apple TV to Apple Business Manager using Apple Configurator](https://www.manageengine.com/mobile-device-management/how-to/mdm-enroll-apple-tv-abm-using-apple-configurator.html)
- [Apple Deployment Training — Adding Locations and Users](https://it-training.apple.com/tutorials/deployment/dm050/)
- [Apple Community — Adding a released device back into Apple Business Manager](https://discussions.apple.com/thread/255677993)
- [Apple Community — Reassigning a Device to a Different MDM Server](https://discussions.apple.com/thread/254591605)

### Rebrand / Industry Context (2026)

- [Six Colors — Apple in the Enterprise: The complete 2026 commentary](https://sixcolors.com/post/2026/05/apple-in-the-enterprise-the-complete-2026-commentary/)
- [TechRadar — Apple Business now offers MDM, upgraded iCloud storage — and ads in Maps](https://www.techradar.com/pro/weve-unified-apples-strongest-business-offerings-into-one-simple-secure-platform-apple-business-will-now-offer-mdm-upgraded-icloud-storage-and-more-plus-the-option-to-put-ads-in-maps)
- [BusinessToday — Apple brings enterprise tools under one roof with new "Apple Business"](https://www.businesstoday.in/technology/news/story/apple-bring-enterprise-tools-under-one-roof-with-new-apple-business-522177-2026-03-24)
- [iru.com — What Apple Business Actually Means for Your IT Team (And Whether It Replaces Your MDM)](https://www.iru.com/blog/updates-apple-business-mdm)

---
*Feature research for: Apple Business delegated governance + multi-org workflows (v1.6 Pillar 3 — Delegation Runbooks foundation)*
*Researched: 2026-05-20*
