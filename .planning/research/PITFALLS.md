# Pitfalls Research — v1.6 Apple Business Delegated Governance & Multi-Org Operations

**Domain:** Documentation suite — Apple Business delegated permission model (Locations + custom roles + content-token consolidation) layered onto existing v1.0-v1.5 5-platform Intune docs corpus
**Researched:** 2026-05-20
**Overall confidence:** HIGH for operational pitfalls (Apple official docs + rebrand newsroom + Intune Learn verified); HIGH for doc-authoring pitfalls (existing v1.0-v1.5 corpus patterns + harness behaviors directly observable); MEDIUM for some corpus-integrity pitfalls (rotting-reference rates are inherently predictive)

## Scope Reminder

This document categorizes pitfalls across three axes per the consumer specification:

- **AXIS 1 — Operational:** mistakes Apple Business admins commonly make in the field (feed in-doc "what breaks if misconfigured" callouts inside delegation runbooks)
- **AXIS 2 — Doc-authoring:** mistakes v1.6 authors will make while writing the new docs (feed PLAN.md per-phase contracts)
- **AXIS 3 — Corpus-integrity:** mistakes the 5-platform corpus will accumulate if v1.6 isn't architected carefully (feed new C14-C16 audit harness checks + deferred-cleanup tracking)

**Existing pitfall lineage NOT re-litigated here** (cross-reference instead):
- PITFALL-7 (whitelist-first / AOSP scope-firewall) — v1.4 Phase 39
- PITFALL-6 (anchor-stability surface / pre-edit anchor inventory contract) — v1.5 Phase 58
- PITFALL-13 (cope_banned_phrases C9 sidecar pattern) — v1.4.1 Phase 47
- PITFALL-14 (transient external link allowlist category) — v1.5 Phase 60
- PITFALL-15 (GFM-deterministic slug behavior) — v1.5 Phase 58
- PITFALL-9 (SCCM disambiguation / WUfB-vs-Autopatch / SafetyNet-cross-domain) — v1.5 Phase 54

## Confidence-Level Legend

| Level | Evidence type | Use |
|-------|--------------|-----|
| HIGH | Apple official support guide + Microsoft Learn + Apple newsroom OR direct v1.0-v1.5 corpus evidence | State as fact in v1.6 docs |
| MEDIUM | Single authoritative source OR established analog v1.0-v1.5 pattern with explicit reasoning | State with attribution / hedge |
| LOW | Predictive / hypothetical-but-plausible / single-community-source | Flag for live-tenant validation before publish |

---

## AXIS 1 — Operational Pitfalls (Apple Business Admins, 2026 corpus)

### OP-1: "Create MDM Server" privilege accidentally delegated to sub-org admin

**Confidence:** HIGH (Apple official: "Intro to roles and privileges in Apple Business Manager"; the privilege "Manage MDM Servers" exists and is independently toggleable in custom roles)

**Severity:** HIGH

**What goes wrong:** Custom role for a sub-org admin includes the "Manage MDM Servers" privilege (which sub-org admins legitimately need to assign devices to MDM servers). Admin clicks "Add MDM Server" instead of "Edit MDM Server" and creates a competing MDM server entry. New devices synced through ABM/Apple Business that hit the wrong default-MDM-server route enroll into a competing Intune tenant or get marked Unassigned. Existing devices on the correct MDM server are unaffected, so the issue is invisible until net-new device drain is detected.

**Why it happens:** Apple Business uses one privilege bundle ("Manage MDM Servers") to cover four distinct actions: (a) Add server, (b) Edit server, (c) Assign devices to server, (d) Download server token. Admins receive (c) intentionally but inherit (a) by privilege bundling. Apple's UI does not visually distinguish (a) from (c) at the click level.

**Warning sign:**
- New MDM server entry appears in Apple Business that the central tenant admin did not create
- Sudden drop in net-new device throughput on the production MDM server token sync after a sub-org admin onboarded
- Apple Business `Devices > [serial] > Default MDM server` shows a server the central admin doesn't recognize

**Prevention strategy:**
- v1.6 custom-role authoring guide (Phase 62 Foundation): require explicit list of which privileges to GRANT vs DENY for the canonical "VPP-and-passcode-reset sub-org admin" role; treat "Manage MDM Servers" as DENY by default per whitelist-first PITFALL-7 pattern
- Delegation runbook for MDM server assignment (Phase 64): hard scope-boundary callout — "this runbook requires Account Holder or a custom role with `Manage MDM Servers` deliberately granted; sub-org device-pool admins SHOULD NOT have this privilege"
- L2 diagnostic runbook (Phase 65): "competing MDM server detection" diagnostic — query Apple Business `Preferences > MDM Server Assignments` and compare against known-good list

**Doc-authoring contract:** Phase 62 custom-role authoring guide MUST contain a privilege-grant matrix table with at minimum 6 sub-org-admin reference roles and explicit grant/deny per privilege; reject PR if "Manage MDM Servers" is silently granted in any non-Account-Holder reference role

---

### OP-2: Account Holder privilege delegated and irreversible

**Confidence:** HIGH (Apple official: "Intro to Account Holder" — only one Account Holder per organization, and only the current Account Holder can transfer)

**Severity:** HIGH

**What goes wrong:** Admin grants the "Account Holder" privilege (or transfers Account Holder role) to a sub-org admin or to a person who later leaves the organization, or to a personal Apple ID. Account Holder is the only role that can: re-accept Apple Terms of Service, transfer Account Holder, manage federation root, and recover lost Administrator passwords. Once transferred to an account that goes dark (employee departure, personal Apple ID locked, federated account disabled), the org is structurally locked out of Apple Business for governance-level actions. Existing enrolled devices keep working; net-new tenant-level changes block.

**Why it happens:** Account Holder transfer is presented in the same UI surface as routine role edits. The "this is irreversible without the prior holder's consent" warning is a single confirmation dialog. Federation collisions and personal-Apple-ID-confused-with-Managed-Apple-Account are pervasive (see OP-7).

**Warning sign:**
- Apple Business shows Account Holder = a personal-email-domain Apple ID (not the org's Managed Apple Account domain)
- Apple Business shows Account Holder = the email of an offboarded employee
- Apple T&C updates pile up unacknowledged in Apple Business banner
- Federation root cannot be re-configured (Account Holder gate)

**Prevention strategy:**
- v1.6 Foundation doc (Phase 62) MUST contain a "What is the Account Holder, why you should not delegate it" callout in the role/privilege overview
- Delegation runbook anti-pattern callout: every custom-role authoring runbook gets a hard-bordered "DO NOT include Account-Holder-transfer privilege in delegated roles" callout
- L1/L2 escalation runbook (Phase 65): "Account Holder lockout" recovery is hard-routed to L2+ AND explicitly notes the Apple Enterprise Support paid-ticket path (no L1 self-service)

**Doc-authoring contract:** Phase 62 glossary entry for "Account Holder" MUST cite Apple official support URL + carry a "lock-on" reciprocal reference from every custom-role authoring sub-section

---

### OP-3: Role granted "Edit" privilege without companion "View" privilege

**Confidence:** MEDIUM (community sources: HardSoft blog + Codeproof MDM integration docs describe the privilege-toggle UI; Apple official confirms privileges are independently checkable. The specific "Edit-without-View blank UI" symptom is plausible-but-not-officially-documented by Apple)

**Severity:** MEDIUM

**What goes wrong:** Custom role granted `Edit Device Assignments` but not `View Devices`. UI loads the Devices section but shows an empty list (the admin's role cannot read the device list to enumerate edit targets). Admin reports "the privilege didn't apply" / "Apple Business is broken." Actual cause: Edit is gated behind View. Time wasted in support tickets.

**Why it happens:** Apple Business custom-role UI doesn't visualize privilege dependencies. Most admins assume "Edit > View" hierarchically, but Apple models them as independent toggles that compose multiplicatively.

**Warning sign:**
- Sub-org admin reports "I have permissions but I see nothing"
- L1 ticket pattern: "Apple Business shows blank in {Devices, Apps and Books, People}" combined with role recently created

**Prevention strategy:**
- v1.6 custom-role authoring guide includes a "privilege dependency table" mapping each Edit privilege to its required companion View privileges
- L2 diagnostic runbook (Phase 65) includes a "permission-denied generic-vs-specific" decision tree (see DA-9) — one branch explicitly covers Edit-without-View

**Doc-authoring contract:** Phase 62 privilege table column "Requires" enumerates companion View privileges for each Edit privilege; harness check optional (skip until v1.7) since this is a generated-table validation, not corpus integrity

---

### OP-4: Per-Location role applied at tenant level (or vice versa)

**Confidence:** HIGH (Apple official: "Since role privileges are assigned by location, you can give the same user different roles in different locations" — assignment scope is per-Location-or-all by design)

**Severity:** HIGH

**What goes wrong:** Two specific footguns:
- (a) Admin assigns a Location-A-only role to a user who already has an All-Locations role — Apple Business uses MOST PRIVILEGED policy across overlapping role assignments, so the Location-A scope intended as a downgrade is silently overridden by the existing All-Locations grant. Admin thinks they restricted scope; they didn't.
- (b) Admin assigns an All-Locations role intending to restrict by Location-A in a subsequent step. Forgets the subsequent step. User has tenant-wide read-write on a delegated workflow that was supposed to be scoped.

**Why it happens:** Apple Business role-assignment UI presents Location and Role as two independent dropdowns; the "scope-narrowing semantics" of per-Location assignment vs the "scope-expansion semantics" of multiple role assignments are not surfaced in the UI. Admins coming from Intune RBAC mental-model (where role IS scope) misframe the mental model.

**Warning sign:**
- Audit log shows a sub-org admin successfully performed an action in a Location the central admin believed was out-of-scope
- Sub-org admin reports "I can see Locations I shouldn't"
- Role-assignment list in Apple Business `Access Management > People > [user]` shows multiple overlapping role+Location pairs for one user

**Prevention strategy:**
- v1.6 Foundation doc (Phase 62) Locations-vs-custom-roles decision matrix MUST contain a "role scope is additive (most-permissive wins across overlapping assignments)" explicit callout
- Multi-cohort architecture guide (Phase 63) MUST contain a "single-role-per-user-per-Location" recommended pattern + a "how to audit overlapping role assignments" sub-section
- L2 diagnostic runbook (Phase 65): "sub-org admin sees more than expected" — first triage step is "list all role+Location pairs for that user in Access Management"

**Doc-authoring contract:** Phase 62 + Phase 63 docs MUST cross-reference each other on the additive-scope semantics; harness C15 (proposed) checks for the literal phrase "most-permissive wins" OR equivalent disambiguation prose in both files

---

### OP-5: Device transfer between Locations breaks license + profile assignments

**Confidence:** HIGH for VPP license behavior (Apple official "Migrate content tokens" guide explicitly documents this — Content Manager migrations to a Location that already has licenses move only unassigned licenses); MEDIUM for enrollment profile re-evaluation behavior (inferred from MDM-server-per-Location model, not officially stated in a single guide)

**Severity:** HIGH

**What goes wrong:** Device moved from Location A to Location B in Apple Business (admin action: bulk edit, MDM server reassign, or Location reassign). Side effects:
- VPP device-licensed apps purchased under Location-A's content token may STOP working because the license is tied to Location A's token, not the device. Apps remain installed on the device but show as unlicensed; new devices in Location B can't be assigned these apps.
- Enrollment profile assigned at MDM-server-level (Location-A's MDM server) does not follow the device to Location B's MDM server. On next factory reset, device gets Location B's enrollment profile (which may differ in supervision flags, app pre-load, restrictions).
- Configuration profiles assigned via Intune (NOT Apple Business) survive because Intune is the assignment authority. This creates a mixed-state device: Intune-managed config A + Location-B enrollment profile + Location-A VPP licenses (unlicensed) — a hybrid state most admins don't expect.

**Why it happens:** Apple Business and Intune partition the assignment surface differently. Apple Business owns: device-to-MDM-server, device-to-Location, content-token-to-Location. Intune owns: profile-to-device, app-assignment-to-device-or-user. The cross-Location move only touches Apple-Business-side bindings, but the user-facing "device just got moved" mental model assumes everything moves.

**Warning sign:**
- Apps installed on a moved device show as unlicensed in Intune (`Devices > [device] > App install status`)
- Newly-imaged moved devices receive a different OOBE experience than peers in the source Location
- Help-desk tickets cluster around "after my device was transferred, apps stopped opening"

**Prevention strategy:**
- v1.6 device-transfer runbook (Phase 64) MUST contain a 4-cell impact matrix table: { VPP licenses, Enrollment profile, Configuration profiles (Intune), Compliance state } × { survives transfer | breaks }
- v1.6 device-transfer runbook MUST include a pre-transfer checklist: "before transferring devices, identify cross-Location license dependencies" + a SQL/PowerShell-style query template against Intune Graph API
- L1 runbook for "app stopped working" (existing common-issues.md) extended with an Apple-Business cross-Location-transfer branch

**Doc-authoring contract:** Phase 64 device-transfer runbook MUST cite Apple's content-token migration guide for the license-doesn't-follow-device claim; harness C14 (rebrand-statement presence) AND C15 (Intune-delegation anti-pattern guard) both touch this file

---

### OP-6: Releasing a device that's still under DEP profile assignment

**Confidence:** HIGH (Apple official: "Release devices" guide — release in Apple Business deletes the device-to-MDM-server binding; on next Apple Business sync via the device's serial, if the device is re-added to Apple Business by reseller or manual re-add, it WILL re-acquire a default profile if one is set)

**Severity:** HIGH

**What goes wrong:** Admin releases a device from Apple Business intending permanent removal. Device remains in physical possession (not wiped, not re-imaged). At next Apple Business sync (every 12-24 hours), the device's serial number gets re-fetched from Apple's DEP backend by ANY MDM server that has the device pre-assigned via reseller upload. If a reseller continues to push devices to the same Apple Business account, the released device's serial can re-appear; admin thinks they removed it. On next factory reset, device hits whatever default enrollment profile is currently set — possibly a profile that doesn't apply (because the device is now physically with the user as a personal device).

**Why it happens:** "Release" in Apple Business is a soft delete — it removes the device's assignment but does NOT remove the device from Apple's DEP backend. Resellers continue to push to Apple Business per their commercial agreement. Bulk-released devices appearing later is a known Apple Business surprise.

**Warning sign:**
- Device released >30 days ago re-appears in Apple Business device list
- Released device serial shows in Apple Business audit log with action: "Device added by reseller"
- End user reports OOBE forcing MDM enrollment on a device they consider personal

**Prevention strategy:**
- v1.6 device-release runbook (Phase 64) MUST contain a "release is not permanent removal — to permanently remove, coordinate with reseller to remove from DEP backend" callout
- Device-release runbook MUST contain an "active-shared-iPad-session" + "DEP-profile-assignment" + "another-admin-MDM-scope" pre-release checklist (3 specific blocking conditions)
- Bulk-release runbook contains an explicit "Apple confirmation UI shows count, not serials — verify CSV before submit" warning

**Doc-authoring contract:** Phase 64 device-release runbook serves as the canonical "what release does and does not do" document — Foundation glossary entry for "Release device" cross-references it

---

### OP-7: Personal Apple ID collision with Managed Apple Account federation

**Confidence:** HIGH (Apple official: Federated Authentication guide documents the "Apple ID with same email exists" conflict path — Apple notifies user via email and provides a 60-day window to rename personal Apple ID. Existing v1.3 docs already reference this collision risk indirectly via the personal-vs-Managed-Apple-ID disambiguation)

**Severity:** HIGH

**What goes wrong:** Org federates Microsoft Entra to Apple Business. User `alice@corp.com` has a personal Apple ID at `alice@corp.com` (created years ago using corp email, perhaps for an old iPhone). At federation time, Apple flags the collision. If unresolved within 60 days, Apple converts the personal Apple ID's email to a different address (forces rename), or blocks the federation. Side effects:
- User's personal iCloud data (photos, contacts) remains accessible but is now signed in with a different email → confusion + perceived data loss
- Work-side Managed Apple Account creation may silently fail for the user; admin doesn't see this in Apple Business
- For shared iPad scenarios, the user cannot sign in until federation collision is resolved

**Why it happens:** Apple historically allowed personal Apple ID creation with any email address (no domain verification). When orgs adopt Managed Apple Accounts post-hoc, the collision surface depends on how many employees historically created personal Apple IDs on the corp email domain (often >10% of workforce). The Apple email notification to the user (warning about the rename) often goes to a personal mailbox or gets filtered.

**Warning sign:**
- Federation rollout pre-flight check shows N "conflicting Apple IDs" in Apple Business federation banner
- Users report "I can't sign in to Managed Apple Account"
- Apple Business federation status shows "partial federation"

**Prevention strategy:**
- v1.6 federation runbook (Phase 64) MUST contain a 60-day-window collision-resolution sub-section with explicit user-comms template
- L1 runbook for "Apple Business federation rejected sign-in" (Phase 65) MUST first-step verify "is this a colliding personal Apple ID" before MDM-side troubleshooting
- Account-driven User Enrollment docs (existing `docs/admin-setup-ios/08-user-enrollment.md`) get a v1.6 forward-link to the new federation runbook (sentence-level surgical edit only per v1.4 D-25 / v1.5 Q5(b) no-corpus-sweep)

**Doc-authoring contract:** Phase 62 glossary entry for "Managed Apple Account" cross-references the federation collision section; harness C14 confirms the rebrand-statement callout is present in `08-user-enrollment.md` (already acknowledged at line 22, 49 in existing doc)

---

### OP-8: Federated admin offboarded — role auto-revoke or stuck?

**Confidence:** MEDIUM (Apple official documents federation but does not authoritatively document the offboarding-cascades behavior across all scenarios; community reports confirm Entra-disable → Managed Apple Account sign-in blocked, but the Apple Business role assignment ROW remains until manually removed)

**Severity:** MEDIUM (HIGH when combined with OP-2 Account Holder)

**What goes wrong:** Admin Alice has an Apple Business custom role assigned via federated Managed Apple Account from Entra. Alice leaves the org; Entra account is disabled in offboarding workflow. Effects:
- Alice can no longer sign in to Apple Business (Entra-federated authentication fails) ✓ expected
- Alice's Apple Business role assignment ROW persists in `Access Management > People > Alice` — the role is not auto-revoked, just unusable
- If Alice is re-enabled in Entra (rehire, contractor return), the role is automatically usable again without re-approval — surprise risk
- If Alice was Account Holder, see OP-2 — the org may be effectively locked out of governance actions

**Why it happens:** Apple Business federation is authentication-layer only. Authorization (the role assignment) lives in Apple Business's own data model and does not subscribe to Entra group changes or disable events. There is no Entra-Group-driven-role-assignment mechanism in Apple Business (unlike Intune RBAC group assignments).

**Warning sign:**
- Offboarded employees still appear in Apple Business `Access Management > People` with active role assignments
- Periodic Apple Business audit shows N people with role X, but HR's active-employee list shows N-K

**Prevention strategy:**
- v1.6 sub-org admin onboarding runbook (Phase 64) MUST contain a paired offboarding section — "Apple Business role revocation is NOT automatic; add to your offboarding checklist"
- L2 diagnostic runbook (Phase 65) Apple Business audit log review playbook includes "people with role X but disabled in Entra" cross-tenant reconciliation query

**Doc-authoring contract:** Phase 64 onboarding runbook MUST link to a corresponding offboarding runbook (or have a paired offboarding sub-section in same file); harness C15 optional check

---

### OP-9: Content token consolidation — "untouched Location" gotcha

**Confidence:** HIGH (Apple official: "Migrate content tokens" guide explicitly documents: "When you create a location in an untouched state, it allows Apple to transfer all licenses, including licenses currently in use from a legacy token, but as soon as anything is done on this location, only unused licenses are transferred")

**Severity:** HIGH

**What goes wrong:** Org begins migration from legacy per-Location VPP tokens to consolidated content tokens. Admin creates the new Location, then "tests" it by purchasing 1 app, OR assigns ANY license to it BEFORE the legacy-token migration completes. From that moment, the Location is no longer "untouched" — Apple's migration tool will only transfer UNUSED legacy licenses. Licenses currently assigned to devices stay tied to the legacy token. Admin discovers months later that 60% of fleet licenses are still pointing at the legacy token (which they thought was retired) and re-doing this is impractical because licenses-in-use cannot be transferred from a "touched" Location.

**Why it happens:** "Untouched state" is a specific Apple data-model term not surfaced in the UI. The migration tool's pre-flight check does not warn about touched-state at the time the admin clicks "test purchase." Admins testing the new Location naturally want to "verify it works" by buying one app — which is precisely the action that breaks the bulk-migration semantic.

**Warning sign:**
- After migration, Apple Business shows the legacy token still has ~50%+ of licenses assigned
- New device assignments fail license-checkout against the new Location's token even though purchased-license count is sufficient
- Apps installed on old devices stop syncing license-state into Intune

**Prevention strategy:**
- v1.6 VPP content-token consolidation runbook (Phase 64) MUST contain a "DO NOT TOUCH the new Location until full migration completes" hard-bordered callout with explicit list of forbidden actions (purchase, assign, edit metadata, etc.)
- Pre-migration checklist MUST include: "verify all Content Managers have selected a Location" + "verify all VPP purchasers invited and accepted" + "Location is empty (no licenses, no people, no devices)"
- Post-migration verification step: "compare license counts between legacy token and new Location — must match within 0.1%"

**Doc-authoring contract:** Phase 64 VPP consolidation runbook is the highest-stakes runbook in v1.6 — recommend explicit L2-approval-gate before action; runbook MUST cite Apple official migration guide URL

---

### OP-10: Intune-side VPP token upload after rebrand — UI navigation

**Confidence:** HIGH (Microsoft Learn confirmed in May 2026: Intune admin center path remains `Tenant administration > Connectors and tokens > Apple VPP tokens`; Apple's content-token consolidation is portal-side at business.apple.com — does NOT change the Intune-side upload path)

**Severity:** LOW (cosmetic confusion)

**What goes wrong:** Admin reads Apple's new Apple Business documentation (which uses "content token" terminology) and looks for "content token" in Intune. Intune admin center still uses "Apple VPP tokens" label in `Tenant administration > Connectors and tokens`. Admin spends 10 minutes searching for a non-existent menu, files a support ticket, escalates.

**Why it happens:** Apple rebranded ABM → Apple Business and VPP-location-token → content-token in April 2026. Microsoft Intune's UI surface has not (as of May 2026) renamed the corresponding menu — it remains "Apple VPP tokens." This is normal lag for cross-vendor terminology synchronization.

**Warning sign:**
- L1 ticket: "where is the content token upload in Intune?"
- Apple-side docs and Intune-side docs use different terms for the same artifact

**Prevention strategy:**
- v1.6 VPP consolidation runbook MUST have a `> Note: Apple calls this a "content token" — Microsoft Intune calls it an "Apple VPP token." Same artifact, different label.` callout
- Glossary entry for "VPP location token" carries `→ now called content token in Apple Business (2026 rebrand); Intune UI still labels as Apple VPP token` cross-reference
- v1.6 docs use "content token (Apple VPP token in Intune)" compound phrasing on first mention per section

**Doc-authoring contract:** Phase 62 glossary MUST contain reciprocal entries for both terms; harness C14 (rebrand-statement) catches missing Apple-vs-Intune label disambiguation

---

### OP-11: Shared iPad passcode reset — three paths, three privilege gates

**Confidence:** HIGH (Apple official: "Create or reset user passwords in Apple Business Manager" guide documents the Apple-Business-UI path; MDM `ClearPasscode` and `EraseDevice` commands are documented in Apple's Developer MDM Protocol reference; Apple Configurator USB-tethered reset is documented but is a fallback)

**Severity:** HIGH (data loss risk on wrong-path choice)

**What goes wrong:** L1 admin needs to reset a shared iPad passcode. Three paths exist:
- (a) Apple Business UI passcode reset — requires `Reset Shared iPad Passcode` privilege (per-Location); preserves user data; works for federated Managed Apple Accounts only
- (b) MDM `ClearPasscode` command from Intune — requires Intune RBAC + device must be online; clears the device passcode but does NOT reset the Managed Apple Account password
- (c) MDM `EraseDevice` — destructive; nukes the device; for last-resort recovery

Admin picks (c) when (a) would have sufficed → data loss. OR admin picks (a) when the user is in an active shared iPad session → race condition: passcode reset happens mid-session, user is signed out, in-flight work is lost.

**Why it happens:** The three paths are documented in three separate vendors' docs (Apple Business help + Apple Developer MDM Protocol + Intune Learn). No single source enumerates the decision matrix. L1 admins facing time pressure pick the "obvious" path which is often the most destructive.

**Warning sign:**
- Help-desk ticket: "shared iPad data loss after passcode reset"
- L1 ticket history shows EraseDevice used in 100% of reset cases when fewer are warranted

**Prevention strategy:**
- v1.6 L1 shared iPad passcode reset runbook (Phase 65) IS the canonical decision matrix — explicit 3x3 table: { Apple Business UI, MDM ClearPasscode, MDM EraseDevice } × { federated Managed Apple Account, non-federated, supervised vs unsupervised }
- Runbook ordering: Apple Business UI FIRST (least destructive), MDM ClearPasscode SECOND, EraseDevice LAST with a hard L2-approval-required gate
- "Which admin owns this device pool" lookup step (the DA-8 doc-authoring pitfall) is a PREREQUISITE step in the runbook — admin must first identify the per-Location admin who has reset privilege

**Doc-authoring contract:** Phase 65 L1 shared iPad passcode reset runbook is the FIRST L1 runbook in v1.6 and the architectural template for all subsequent L1 runbooks; harness C16 (proposed: shared iPad passcode-reset cross-link integrity) validates this runbook cross-links to MDM ClearPasscode docs in `docs/admin-setup-ios/` AND to the Apple Business UI path in the delegation runbook section

---

### OP-12: Find-My enabled blocks shared iPad reset / device release

**Confidence:** HIGH (Apple official: Activation Lock requires Find My to be disabled before MDM commands like erase + setup-from-scratch will succeed on supervised devices; this is a long-standing Apple security boundary)

**Severity:** HIGH

**What goes wrong:** Shared iPad has Find My enabled (often via a misconfigured initial setup OR a user enabling it via Settings during a prior session). Admin attempts passcode reset path that requires erase (path c), or attempts device release. Operation fails with Activation Lock error. Without prior unlinking of the user's Apple ID (which requires the user's password OR Apple Enterprise Support intervention), the device is bricked from a re-enrollment standpoint.

**Why it happens:** Find My can be enabled by end users on shared iPad (depending on supervision restriction profile) — admins assume supervision blocks it but the restriction is a separate Configuration Profile setting (`Restrictions.payloadIdentifier.allowFindMyDevice` or similar) that must be explicitly disabled.

**Warning sign:**
- Activation Lock error in Intune device action log
- Apple Business device shows "Activation Lock: Enabled" in detail panel

**Prevention strategy:**
- v1.6 shared iPad provisioning admin guide (Phase 63) MUST include "disable Find My in supervised restrictions" as a mandatory pre-deployment configuration step
- L1 passcode reset runbook (Phase 65) has a pre-check: "if Find My is enabled, do NOT proceed with EraseDevice path; escalate to L2 for Activation Lock unlock via Apple Business `Device > Bypass Activation Lock` (requires `Activation Lock Bypass` privilege)"

**Doc-authoring contract:** Phase 65 L1 runbook + Phase 63 admin guide both reference the Activation Lock unlock privilege; harness C15 confirms cross-reference is bilateral

---

### OP-13: Audit log retention < SOX / compliance requirement

**Confidence:** MEDIUM (Apple does not publish official audit log retention SLA for Apple Business; community reports vary 90-365 days; SOX/compliance frameworks often require 7-year retention)

**Severity:** MEDIUM

**What goes wrong:** SOX-regulated org assumes Apple Business audit log will satisfy compliance retention requirements. Discovers at audit time that Apple Business retains audit log for [X] days, not [Y] years. Compliance gap. Org cannot prove who authorized a specific device release 14 months ago.

**Why it happens:** Apple Business is positioned as a device-management tool, not a compliance audit system. Apple does not publish a retention SLA. Community reports (anecdotal) suggest <1 year.

**Warning sign:**
- Compliance team asks "produce audit log for action X on date Y, 18 months ago"
- Apple Business audit log query returns "no records" for old date ranges

**Prevention strategy:**
- v1.6 audit log scoping runbook (Phase 64) MUST include a "Apple Business does NOT guarantee long-term audit retention; for compliance frameworks requiring >1 year retention, configure periodic export to an external SIEM" callout
- Confidence-marker: this finding is MEDIUM — recommend per-org live-tenant validation against Apple Business's current retention behavior
- Cross-link to Intune-side audit log (which DOES have configurable retention via Azure Monitor)

**Doc-authoring contract:** Phase 64 audit log runbook flags external-SIEM-export pattern as recommended; harness check not needed (this is content quality, not corpus integrity)

---

### OP-14: Cross-Location audit visibility

**Confidence:** MEDIUM (Apple official: roles assigned per Location restrict view scope; cross-Location actions are visible to whoever has tenant-wide audit privilege — but the exact "what does sub-org admin see" matrix isn't single-source documented)

**Severity:** MEDIUM

**What goes wrong:** Sub-org admin for Location A performs an action that affects a device in Location B (e.g., reassigns device A-to-B). Audit log entry exists. WHO sees this entry?
- Sub-org admin for Location A: sees the action they performed
- Sub-org admin for Location B: may NOT see the inbound device because the action was authored in Location A's scope
- Central tenant admin: sees both

Result: Location B admin discovers a device in their fleet that they didn't authorize. Audit query for "how did this device get here" against Location B's scoped log returns nothing.

**Why it happens:** Audit log scoping follows author-scope, not target-scope. This is consistent with most audit systems but counter-intuitive for new admins.

**Warning sign:**
- Location B admin reports "ghost device" — appears in fleet without traceable provenance
- Cross-Location reconciliation discrepancies

**Prevention strategy:**
- v1.6 audit log scoping runbook (Phase 64) MUST explicitly document author-scope vs target-scope semantics
- Multi-cohort architecture guide (Phase 63) recommends central-tenant-admin retains tenant-wide audit privilege; per-Location admins are scoped to their own Location only
- L2 diagnostic runbook (Phase 65) "device with unknown provenance" — investigation starts at tenant-wide audit log, not Location-scoped log

**Doc-authoring contract:** Phase 64 audit log runbook contains a labeled "Author-scope vs target-scope" sub-section; harness check not needed

---

### OP-15: Apple TV in conference room — content assignment ownership boundary

**Confidence:** MEDIUM (Apple TV management surface is documented but Conference Room Display mode + per-Location content assignment is sparse in official docs)

**Severity:** LOW (niche surface — most orgs have <10 Apple TVs)

**What goes wrong:** Apple TV deployed in a conference room is assigned to Location-A's MDM server. Content (apps, configurations, AirPlay restrictions) flows through Location-A's content token. Location B's admin wants to deploy a new conference-room AirPlay app to Location B's Apple TVs. Discovers Apple TV configuration is partitioned by Apple Business Location, not by physical conference room location. Admin can't independently configure if Apple TV was assigned to the wrong Location at intake.

**Why it happens:** Apple TVs in shared physical spaces (conference rooms) have weak organizational ownership (no single department "owns" the conference room). Initial-assignment-to-Location is often arbitrary. The misassignment is invisible until a Location-B admin tries to make a change.

**Warning sign:**
- L2 ticket: "I can't see Apple TV X in my Location"
- Apple TV's MDM server entry differs from expected Location

**Prevention strategy:**
- v1.6 Apple TV provisioning admin guide (Phase 63) recommends a "shared physical space → central tenant admin owns; non-shared spaces → per-Location admin owns" assignment heuristic
- Apple TV transfer between Locations: same caveats as OP-5 (VPP licenses, enrollment profile)

**Doc-authoring contract:** Phase 63 Apple TV provisioning admin guide is the niche surface; explicitly de-prioritize to satisfy doc-authoring pitfall DA-1 (don't skip Apple TV / shared iPad sections)

---

## AXIS 2 — Doc-Authoring Pitfalls (v1.6 Authors)

### DA-1: Cross-platform language drift — "iOS" used when "all Apple platforms managed by Apple Business" intended

**Confidence:** HIGH (observable pattern in existing v1.3 + v1.5 cross-platform corpus — e.g., `docs/admin-setup-ios/08-user-enrollment.md:22` already pre-emptively notes "Managed Apple ID" vs "Managed Apple Account" terminology drift)

**Severity:** HIGH (will mislead admins managing macOS or Apple TV through Apple Business)

**What goes wrong:** v1.6 author writes "in iOS, the Apple Business custom role grants…" when the actual statement applies to iOS + iPadOS + macOS + shared iPad + Apple TV. Reader managing macOS thinks the v1.6 doc doesn't apply to them. Authors default to iOS-framing because (a) Apple Business UI is most-frequently demonstrated on iOS in marketing material, (b) existing v1.3 iOS work is fresh in author memory, (c) iOS user base is larger.

**Why it happens:** Apple Business is genuinely cross-platform but most authoring examples bias to iOS. Existing docs tree split (`docs/admin-setup-ios/` vs `docs/admin-setup-macos/`) creates a directory-level naming pull on author terminology choice. v1.6 merged docs tree (per project constraint) creates ambiguity about which sub-directory new docs live in.

**Warning sign:**
- Grep for "iOS" in v1.6 PR diff returns N occurrences in delegation docs where "Apple platform" or "iOS / iPadOS / macOS" would be correct
- Code-review comment pattern: "doesn't this also apply to macOS?"

**Prevention strategy:**
- Phase 62 (Foundation) ships a "v1.6 docs cross-platform language convention" mini-style-guide as an HTML comment block at top of every v1.6 doc
- Convention: use "Apple Business" + "Managed Apple Account" + "Apple platforms (iOS / iPadOS / macOS / shared iPad / Apple TV)" as the canonical phrasing on first mention per H2 section
- Phase contract: every v1.6 phase PLAN.md MUST include a "cross-platform language check" pre-merge item

**Doc-authoring contract:** Phase 62 PLAN.md mandates the language-convention HTML comment block; harness C15 (proposed: Intune-delegation anti-pattern guard) can be extended to catch bare "iOS" without "iPadOS / macOS" companion in v1.6-scoped files

---

### DA-2: Rebrand inconsistency WITHIN v1.6 itself

**Confidence:** HIGH (Q5 (b) decision explicitly limits rebrand to glossary + 2 intro callouts → v1.6 docs will use "Apple Business" while linking to existing "ABM" docs that v1.6 doesn't touch)

**Severity:** MEDIUM (cosmetic but compounds confusion with DA-3)

**What goes wrong:** v1.6 author writes `## Apple Business Custom Roles` in a new doc and immediately links to `[ABM Configuration](../admin-setup-macos/01-abm-configuration.md)` — title says Apple Business, link title says ABM. Reader is confused: is this Apple Business or ABM? Are they the same thing? (They are — but the doc doesn't say so explicitly.) Authors will be tempted to "fix" the ABM references in the existing doc, violating Q5(b) no-corpus-sweep contract.

**Why it happens:** The rebrand-callout-budget is intentionally tight (glossary + 2 callouts). Authors with completionist instincts will reach for "while I'm in this file, let me also rename…" — the same instinct that caused v1.4 to retroactively-sweep frontmatter (which was correctly avoided by D-25).

**Warning sign:**
- v1.6 PR diff touches any file in `docs/admin-setup-{ios,macos}/0[1-9]-*.md` for terminology-only changes
- v1.6 PR diff renames "ABM" → "Apple Business" in body text outside the 2 sanctioned callout sites

**Prevention strategy:**
- Phase 62 PLAN.md explicitly enumerates the 3 rebrand-callout sites (glossary entry, macOS ABM-config intro, iOS ABM-token intro) by file:line and forbids any other corpus changes for rebrand
- v1.6 audit harness C14 (proposed: rebrand-statement presence) validates the 3 sanctioned callouts EXIST AND simultaneously validates no other file received an ABM→Apple-Business edit (negative-check via git diff against baseline)
- Pre-merge contract: every v1.6 PR description includes a "rebrand sites touched: 0/1/2/3" line item

**Doc-authoring contract:** Harness C14 is the technical enforcement; PLAN.md per-phase is the prose enforcement; both must agree on the 3-site whitelist

---

### DA-3: Glossary forward-reference conflict — Managed Apple ID vs Managed Apple Account

**Confidence:** HIGH (existing v1.3 doc already shows this conflict in-corpus: `docs/admin-setup-ios/08-user-enrollment.md:22` documents "Managed Apple ID (sometimes branded 'Managed Apple Account'…); Microsoft Intune documentation continues to use 'Managed Apple ID'")

**Severity:** MEDIUM (admin confusion across reading new + old docs)

**What goes wrong:** v1.6 glossary introduces "Managed Apple Account" as canonical term. Existing docs (v1.3+) use "Managed Apple ID" pervasively. Admin reading the new v1.6 federation runbook + the old v1.3 User Enrollment guide sees two terms. Admin's mental model fractures: are these the same thing? Is one newer? Which should I trust?

**Why it happens:** Q5 (b) explicitly leaves existing "Managed Apple ID" usages unchanged. Apple's rebrand creates a transient terminology fork.

**Warning sign:**
- L1 ticket: "the docs use Managed Apple ID and Managed Apple Account — which is current?"
- Glossary entry for one term doesn't cross-reference the other

**Prevention strategy:**
- Phase 62 Foundation glossary entry for "Managed Apple Account" MUST contain a bidirectional "← see also: Managed Apple ID (Microsoft Intune retains this term as of v1.6 publication date)" cross-reference
- Glossary entry for "Managed Apple ID" gets a single-line forward-reference: "→ Apple rebranded this to 'Managed Apple Account' in 2026. In Intune contexts, the older term is still used."
- Both entries cite Apple newsroom URL + Microsoft Learn URL with publication dates

**Doc-authoring contract:** Harness C14 validates both glossary entries exist + cross-reference each other; corpus-wide single-term-only-please enforcement is OUT OF SCOPE per Q5(b)

---

### DA-4: Anchor stability regression in capability matrices

**Confidence:** HIGH (this is a direct lineage from PITFALL-6 / v1.5 D-10 sibling-matrix-anchor-pin contract — Phase 58 already locked the pre-edit anchor inventory pattern)

**Severity:** HIGH (will fail C12 audit harness check)

**What goes wrong:** v1.6 adds an Apple Business delegation row group to iOS + macOS capability matrices. New H2 inserted between existing H2s shifts all downstream anchor offsets. If sibling-matrix-anchor-pin contract isn't honored (reciprocal-H2 in all 4 sibling matrices: Windows / Linux / iOS / macOS / Android), `docs/reference/4-platform-capability-comparison.md` cells linking to the now-shifted anchor break. C12 audit fails.

**Why it happens:** Author makes a "small surgical add" to one matrix file without remembering the cross-matrix contract. v1.5 D-10 specifically created this contract to prevent this regression — v1.6 authors who haven't read v1.5 retrospective will re-discover it the hard way.

**Warning sign:**
- C12 audit check fails post-PR
- `4-platform-capability-comparison.md` link sweep finds broken anchors
- Sibling matrices have H2 count mismatch

**Prevention strategy:**
- Phase 63 (architecture / capability matrix extension) PLAN.md MUST include a "pre-edit anchor inventory" artifact (lift verbatim from v1.5 Phase 58 Plan 58-05 contract)
- Sibling-matrix-anchor-pin contract is reciprocal: every new H2 in iOS/macOS matrices REQUIRES a reciprocal H2 in Linux/Windows/Android matrices (even if cells are `n/a — [matrix](...)`)
- Pre-merge check: anchor inventory diff must show new anchors are reciprocal across all 5 matrices

**Doc-authoring contract:** Inherit verbatim from v1.5 D-10; explicit re-statement in Phase 63 PLAN.md is mandatory (no implicit inheritance)

---

### DA-5: C12 240-cell math drift

**Confidence:** HIGH (C12 validator implementation in `scripts/validation/v1.5-milestone-audit.mjs:556-595` checks `cells.length !== 6` AND validates 6 named H2s; expanding to 7th H2 changes the assertion math)

**Severity:** HIGH (will fail v1.6 audit on Phase 58 carry-over)

**What goes wrong:** v1.6 adds 7th H2 "Apple Business Delegation" to `docs/reference/4-platform-capability-comparison.md`. C12 validator's H2 list at v1.5-milestone-audit.mjs:591 is hardcoded to 6 H2 names. Validator either (a) doesn't find the new H2 in its expected list and passes silently (false-negative), or (b) author copies the validator unchanged into v1.6-milestone-audit.mjs and the new H2 goes unvalidated. Cell-link-math (currently 240 cells = 6 H2 × ~8 rows × 5 platforms) also changes.

**Why it happens:** Validator math is hardcoded for v1.5 expected state. Path-A copy v1.5→v1.6 needs explicit math update at the new harness; authors who skip this get a silent-pass false negative.

**Warning sign:**
- v1.6 audit harness Path-A copy passes immediately on Phase 1 without any v1.6 content (false-positive PASS = signal to investigate)
- Cell count in `4-platform-capability-comparison.md` exceeds 240 but C12 still reports 240-cell math

**Prevention strategy:**
- Phase 68 (v1.6 audit harness Path-A copy) PLAN.md MUST explicitly update: (a) C12 H2 list to 7 entries including "Apple Business Delegation", (b) cell-count math to ~280 (or whatever the new row × column product equals), (c) BASELINE refresh to capture pre-v1.6 state for diff
- Atomic harness commit pattern (v1.5 Phase 60 Plan 60-08 precedent) — promotion + math update + sidecar refresh land in ONE commit
- BASELINE refresh `regenerate-supervision-pins.mjs --self-test` analog for new C14-C16 checks

**Doc-authoring contract:** Phase 68 audit harness work is the LAST v1.6 phase; cannot land until all content phases stable; harness self-test must pass before milestone close

---

### DA-6: Sibling-matrix-anchor-pin contract violation

**Confidence:** HIGH (same lineage as DA-4 but specifically the cross-matrix-symmetry constraint)

**Severity:** HIGH (will produce `n/a`-cell mismatches in comparison doc)

**What goes wrong:** Apple Business delegation H2 added only to iOS + macOS capability matrices (because Apple Business is Apple-only). But the comparison doc requires reciprocal H2s in ALL 5 platform columns. Windows/Linux/Android matrices need an Apple-Business-Delegation H2 with `n/a` cells (or a footnote redirecting to "see iOS / macOS").

**Why it happens:** Authors reason "this doesn't apply to Windows/Linux/Android, so why add an empty section?" — forgetting that the comparison doc's structural validator requires the row to exist (with `n/a` cells) for the comparison to be authored at all.

**Warning sign:**
- C12 validator reports "missing H2" in Windows/Linux/Android capability matrices
- Comparison doc has Apple-Business-Delegation row but referenced matrix files don't have the anchor

**Prevention strategy:**
- Phase 63 PLAN.md explicit checklist: "Apple-Business-Delegation H2 added to ALL 5 platform matrices, including n/a-only ones"
- Reciprocal-H2 prose convention: Windows/Linux/Android matrices include a `## Apple Business Delegation` H2 with a single sentence: "n/a — Apple Business is an Apple platform exclusive. See [iOS](../reference/ios-capability-matrix.md#apple-business-delegation) or [macOS](../reference/macos-capability-matrix.md#apple-business-delegation)."

**Doc-authoring contract:** Phase 63 PLAN.md SC must enumerate the 5 expected H2 anchors by file:line:anchor-slug; harness C12 enforces

---

### DA-7: C11 ops-domain false-positive on Apple Business prose

**Confidence:** HIGH (C11 implementation calibrated via v1.5 Phase 60 Plan 60-08 CALIBRATION; documented at v1.5-milestone-audit.mjs:494-545; the keyword set `successor|deprecated|historical|disambiguation|mutual-exclusion|...` defines the ±200-char window negation)

**Severity:** MEDIUM (will produce noisy CI failures; demoralizes authors)

**What goes wrong:** v1.6 docs will frequently reference "Intune VPP token upload" (the handshake between Apple Business and Intune). The C11 regex set includes patterns like `\bIntune\b[^.]*\bAutopatch\b`-style cross-domain detection. Even if Apple Business prose doesn't match the LITERAL patterns, expansion of the pattern set during v1.6 audit-harness Path-A copy may introduce new patterns that DO false-positive on legitimate Apple-Business-meets-Intune prose.

**Why it happens:** C11 was tuned for v1.5 ops-depth content (SCCM disambiguation, WUfB-vs-Autopatch). v1.6 introduces a new cross-domain prose surface (Apple Business ↔ Intune) where boundary-call language is legitimate. The CALIBRATION pattern (live-corpus refinement of keyword set) needs to be re-run for v1.6.

**Warning sign:**
- v1.6 audit harness CI run shows N C11 false-positives on Apple-Business-meets-Intune sentences
- Calibration drift: keyword set doesn't cover v1.6 disambiguation phrases like "Apple Business owns; Intune owns; integration handshake"

**Prevention strategy:**
- Phase 68 (audit harness) MUST include a C11 CALIBRATION sub-phase modeled on v1.5 Plan 60-08 CALIBRATION
- Keyword set extended with v1.6-specific tokens: `apple-business-side|intune-side|integration-handshake|owned-by-apple-business|owned-by-intune|scope-boundary`
- Live-corpus refinement run against drafted v1.6 docs BEFORE C11 promotion to blocking

**Doc-authoring contract:** Phase 68 PLAN.md CALIBRATION sub-task is a HARD prerequisite to C11 blocking-mode promotion; if calibration finds >5 false-positives that aren't reducible by keyword extension, C11 stays informational for v1.6

---

### DA-8: L1 "which admin owns this device pool" lookup directory missing

**Confidence:** HIGH (the problem is structural — Apple Business does not natively provide a "who has reset privilege for this device pool" query; admins must manually correlate Device → Location → Role-Assignments → People)

**Severity:** HIGH (L1 runbook unusable without this lookup; blocks OP-11 prevention)

**What goes wrong:** L1 shared iPad passcode reset runbook step 1 is "look up which admin owns this device pool." But: Apple Business UI doesn't surface this directly. L1 admin's available data: device serial number. To get from "device serial" to "admin who can reset" requires: (a) lookup device → Location, (b) lookup Location → Role-assignments containing `Reset Shared iPad Passcode` privilege, (c) lookup those role-assignments → People → contact info. Step (b) requires Access Management privilege which L1 doesn't have.

**Why it happens:** Apple Business is not designed as an org-chart lookup tool. The L1 → L2 escalation pattern is the implicit answer (escalate to L2 who has Access Management read).

**Warning sign:**
- L1 runbook step "look up which admin owns this device pool" has no concrete action verb
- L1 admin tickets show this step as a frequent stuck-point

**Prevention strategy:**
- v1.6 Foundation (Phase 62) MUST ship a "delegated admin contact-directory" doc OR convention — recommended approach: org maintains an external (SharePoint / wiki / IT-portal) lookup keyed by Location → primary admin contact email/phone; v1.6 runbook step is "look up Location in the Apple-Business-admin-directory at [LINK]" with a clear note that "[LINK]" is org-specific
- L1 → L2 escalation packet (per v1.3 D-12 three-part contract) includes Location ID as one of the three artifacts so L2 can resolve the admin via Apple Business Access Management
- Phase 65 L1 runbook EXPLICITLY documents this is an escalation-required step when org hasn't built the directory

**Doc-authoring contract:** Phase 62 ships the convention doc; Phase 65 L1 runbook references it; harness C16 (cross-link integrity) confirms the back-pointer

---

### DA-9: L2 "permission denied" runbook generic-vs-specific

**Confidence:** HIGH (Apple Business permission errors are notoriously generic — UI shows "You don't have permission to perform this action" with no privilege-level diagnostics)

**Severity:** HIGH (L2 runbook quality is the value prop)

**What goes wrong:** L2 admin receives ticket: "sub-org admin can't perform action X." Apple Business UI showed a generic permission-denied error. L2 doesn't know if the failure was: (i) role lacks privilege X, (ii) Location boundary blocks action, (iii) MDM-side permission, (iv) Apple-account-locked, (v) Find My / Activation Lock, (vi) federation collision, (vii) Account Holder gate. L2 runbook that says "check permissions" is useless — needs a specific decision tree.

**Why it happens:** Apple's permission-denied error is intentionally vague (security non-disclosure). L2 must externally reason about the 7 failure modes and build a differential-diagnosis tree.

**Warning sign:**
- L2 ticket cycle time on "permission denied" > 30 min
- L2 ticket re-escalation rate > 20%

**Prevention strategy:**
- Phase 65 L2 "Apple Business permission-denied" diagnostic runbook MUST contain a 7-leaf decision tree (one leaf per failure mode above); each leaf has a specific signature to look for in: (a) Apple Business audit log, (b) device logs, (c) federation status, (d) MDM command logs
- Each leaf carries a remediation step that references the relevant operational pitfall (OP-1 through OP-15)
- Mermaid diagram preferred (consistent with v1.4 Android L1 triage tree pattern)

**Doc-authoring contract:** Phase 65 PLAN.md SC enumerates the 7 leaves; harness C16 confirms each leaf cross-links to the corresponding OP-N pitfall doc

---

## AXIS 3 — Corpus-Integrity Pitfalls (5-Platform Corpus Long-Term)

### CI-1: "Apple Business Manager" rotting reference (long-tail dead URLs)

**Confidence:** MEDIUM (Apple has stated business.apple.com remains the URL; legacy ABM docs continue to be reachable as of May 2026; future redirect chains are speculative)

**Severity:** MEDIUM (URL-level failure surface; not corpus-prose-level)

**What goes wrong:** Apple's 2026-04-14 rebrand: ABM → Apple Business. URL `business.apple.com` retained per Apple newsroom + support guide. But over a 12-24 month window, support URLs Apple links to may migrate (e.g., `support.apple.com/guide/apple-business-manager/...` → `support.apple.com/guide/apple-business/...`). v1.0-v1.5 docs reference ~30 ABM URLs across `docs/admin-setup-ios/*` + `docs/admin-setup-macos/*` + `docs/_glossary-macos.md`. Q5(b) no-corpus-sweep decision means these references remain unchanged. Over time, % broken URLs grows.

**Why it happens:** Cross-vendor terminology rebrand has inherent URL-level lag. PITFALL-14 (transient external links) already documents this pattern for non-Microsoft domains.

**Warning sign:**
- markdown-link-check (C13 harness) reports increasing % broken external links in `support.apple.com/guide/apple-business-manager/*` paths over quarterly audits
- User reports "the link in the docs goes to a 404 page on Apple's site"

**Prevention strategy:**
- v1.6 Phase 68 audit harness adds a NEW sidecar category `c13_rotting_external` for tracked-known-current external URLs Apple ecosystem
- Quarterly audit job (CI workflow or manual): re-run markdown-link-check against `support.apple.com/guide/*` and flag drift
- Deferred-cleanup tracking list (v1.6+): document the ~30 ABM URLs that v1.6 explicitly left unchanged per Q5(b); they become candidates for v1.7+ corpus sweep if Apple drops ABM URL support

**Doc-authoring contract:** Phase 68 ships the rotting-reference sidecar category; deferred-cleanup list lives at `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (new artifact)

---

### CI-2: "VPP location token" rotting reference

**Confidence:** HIGH (specific files cited: `docs/admin-setup-ios/05-app-deployment.md:201` line "VPP (Apps and Books) location token" in Renewal/Maintenance table; `docs/admin-setup-macos/04-app-deployment.md:148` line "VPP location token" in Renewal/Maintenance table)

**Severity:** MEDIUM

**What goes wrong:** Apple's content-token consolidation (per OP-9) means the term "VPP location token" is now historical. Existing v1.5 docs in `docs/admin-setup-{ios,macos}/0[45]-app-deployment.md` use this term. Admin reading these docs in 2027 sees a term that no longer exists in Apple Business UI. Confusion + tickets.

**Why it happens:** Q5(b) leaves these unchanged. Apple's portal label is now "content token" (or just "token"); UI search for "VPP location token" returns nothing or redirects to a help article that uses the new term.

**Warning sign:**
- L1 ticket pattern: "the doc says VPP location token but I can't find it in Apple Business"
- Apple Business UI search for legacy term returns zero results

**Prevention strategy:**
- v1.6 Phase 62 glossary adds reciprocal entries: "VPP location token" → "renamed to content token in Apple Business (2026 rebrand). Microsoft Intune UI continues to use 'Apple VPP token' as of v1.6 publication date."
- Deferred-cleanup list flags these 2 specific lines for v1.7 surgical rename
- v1.6 docs use "content token (formerly VPP location token; still labeled 'Apple VPP token' in Intune)" compound phrasing on first mention per H2

**Doc-authoring contract:** Phase 62 glossary contract — same as DA-3 lineage; harness C14 catches missing reciprocity

---

### CI-3: "Managed Apple ID" → "Managed Apple Account" rotting reference

**Confidence:** HIGH (pervasive across `docs/admin-setup-ios/08-user-enrollment.md` lines 22, 49, 51; `docs/admin-setup-macos/01-abm-configuration.md` line 23; many other sites)

**Severity:** MEDIUM (already partially mitigated by v1.3 author's forward-looking disclaimer at line 22)

**What goes wrong:** Same lineage as CI-2 but for the user-account term. v1.6 introduces "Managed Apple Account"; existing docs use "Managed Apple ID." Admin sees both, asks if they're the same.

**Why it happens:** Q5(b). Apple's rebrand. Microsoft Intune retains the older term.

**Warning sign:**
- Cross-doc terminology mismatch in glossary lookup
- L1/L2 tickets reference "Managed Apple ID/Account" as one OR other inconsistently

**Prevention strategy:**
- Same as DA-3 — glossary reciprocal cross-reference is the prevention
- Phase 62 glossary entries: both terms, each cross-references the other, each cites authoritative source
- Deferred-cleanup list tracks all sites using "Managed Apple ID" for v1.7+ surgical sweep (when Apple's rebrand has settled and Intune may have caught up)

**Doc-authoring contract:** Phase 62 glossary work is the v1.6 surface; corpus-wide sweep deferred

---

### CI-4: Capability matrix de-normalization (iOS + macOS Apple Business rows drift)

**Confidence:** HIGH (structural risk inherent in cross-matrix row duplication; v1.5 D-10 sibling-matrix-anchor-pin contract solved the H2 surface but not the row content)

**Severity:** HIGH (long-term drift between iOS + macOS matrices for same Apple Business capability)

**What goes wrong:** v1.6 adds an Apple Business delegation row group to iOS + macOS matrices. Rows are substantially the same (because Apple Business is one tool managing both iOS and macOS). Without an explicit shared-source convention, the rows in iOS matrix and macOS matrix will drift over future maintenance windows. Six months later, "Custom Role privilege list" row in iOS matrix says X, in macOS matrix says X+1.

**Why it happens:** No shared-source for the same prose. Each matrix maintained independently.

**Warning sign:**
- iOS + macOS matrix Apple Business rows diverge in periodic audit
- Comparison doc cell-link points to different verdicts for what should be the same capability

**Prevention strategy:**
- v1.6 Phase 63 architectural decision: Apple-Business-Delegation rows in iOS + macOS matrices reference a SINGLE source (a new `docs/reference/apple-business-capability-supplement.md` OR embed-via-HTML-anchor pattern)
- Recommended: introduce a "shared-row-supplement" pattern — comparison-doc cells point to the supplement; iOS + macOS matrix cells also point to the supplement for the Apple Business row group
- C12 validator extended to check row-prose-equality across iOS + macOS matrices for Apple-Business-flagged rows

**Doc-authoring contract:** Phase 63 architectural decision; harness C15 OR C16 enforces row-equality OR shared-source link

---

### CI-5: L1 runbook proliferation cascade

**Confidence:** HIGH (observable pattern: v1.4 had 6 L1 Android runbooks, v1.4.1 added 2 more, v1.5 added 4 Linux — each new platform/surface triggers 4-8 new L1 runbooks)

**Severity:** MEDIUM (corpus grows but each runbook is small; aggregate cognitive load is the issue)

**What goes wrong:** v1.6 ships L1 shared iPad passcode reset runbook (Phase 65). If "shared iPad passcode reset" gets its own L1 runbook, what about Apple TV factory reset? Apple TV conference-room provisioning? Apple TV AirPlay restriction lifecycle? VPP license reclamation from departed user? Device transfer between Locations? Each of these is a plausible L1 runbook candidate. Proliferation: L1 runbook count grows from ~33 to ~50+, L1 admin spend more time finding the runbook than executing it.

**Why it happens:** "If X gets a runbook, Y should too" — symmetric reasoning. Without explicit scope-gate, every delegation surface attracts its own L1 runbook.

**Warning sign:**
- Phase 65 PLAN.md L1 runbook count exceeds 3
- L1 quick-ref-l1.md Apple Business section grows beyond 1 H3

**Prevention strategy:**
- Phase 65 PLAN.md MUST cap L1 runbook count at 2 (shared iPad passcode reset + Apple Business permission-denied as the L2 escalation entry point)
- Anti-pattern callout: "If a delegation surface doesn't have a high-volume L1 ticket pattern, the L1 runbook is premature; route to L2 instead"
- L2 runbooks are the catch-all for the long-tail (Apple TV, VPP reclamation, device transfer escalation, etc.)

**Doc-authoring contract:** Phase 65 PLAN.md SC explicitly caps L1 runbook count; future v1.7+ work can add more L1 runbooks once ticket-volume data exists

---

### CI-6: Audit harness over-/under-fitting (C14-C16)

**Confidence:** HIGH (lineage from v1.5 informational-then-blocking promotion ladder; C11/C12/C13 calibration history)

**Severity:** HIGH (audit harness IS the corpus-integrity enforcement)

**What goes wrong:** Two failure modes:
- (a) Over-fitting: C14-C16 designed too narrowly. Pass v1.6 work but miss future regressions. e.g., C14 only checks the 3 sanctioned rebrand sites by file:line — works for v1.6, but doesn't catch rebrand drift introduced in v1.7+
- (b) Under-fitting: C14-C16 designed too broadly. Catch legitimate v1.6 work as violations. e.g., C15 ("Intune-delegation anti-pattern guard") false-positives on legitimate Apple-Business-meets-Intune handshake prose

**Why it happens:** Designing checks without seeing the live corpus they'll run against. v1.5 solved this via informational-first-then-blocking promotion. v1.6 inherits the pattern.

**Warning sign:**
- (a) C14-C16 pass on v1.6 immediately upon harness ship — no false-positives but also no insight into edge cases
- (b) C14-C16 fail on legitimate v1.6 content; calibration loop required

**Prevention strategy:**
- Phase 68 ships C14-C16 informational-first per v1.5 D-25 graduation pattern
- C14-C16 promotion to blocking happens at Phase 69 (v1.6 close) AFTER live-corpus refinement
- Each check carries a sidecar exemption array for legitimate exceptions (consistent with v1.4.1+ pattern)
- BASELINE_10 refresh closes v1.5 carry-over (BASELINE_9 → BASELINE_10) at v1.6 close

**Doc-authoring contract:** Phase 68 PLAN.md mandates informational-first; Phase 69 close-gate requires C14-C16 blocking-mode PASS from fresh worktree per D-22 auditor-independence

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|------------------|----------------|-----------------|
| Skip rebrand callout in glossary, "add it later" | Faster Phase 62 ship | Authors miss the 3-site callout budget; rebrand inconsistency cascades | Never — Phase 62 IS the rebrand foundation |
| Add 4th, 5th rebrand callout "for completeness" | Author satisfaction; reader clarity per-site | Erodes Q5(b) no-corpus-sweep contract; sets precedent for v1.7+ scope creep | Never — strictly cap at 3 sanctioned sites |
| Skip the "untouched Location" callout in VPP runbook | Faster Phase 64 ship | OP-9 high-stakes data loss in real-world migration | Never — OP-9 is HIGH severity |
| Use "iOS" as proxy for "all Apple platforms" in v1.6 prose | Author velocity (iOS is most familiar) | Cross-platform language drift (DA-1); macOS admin alienation | Only in iOS-specific paragraphs explicitly scoped to iOS |
| Skip Apple TV / shared iPad sections "they're niche" | Faster shipping | Org with shared iPad fleet has no v1.6 coverage; OP-12 + OP-15 land in tickets | Only if explicitly scoped out at Phase 62 boundary (NOT recommended) |
| Hardcode C12 H2 list to 7 entries without atomic harness commit | Single-line edit | Math drift; sidecar miss; v1.5 lineage break | Never — atomic harness commit pattern is locked |
| Auto-translate every "ABM" to "Apple Business" in PR | Author thinks they're being helpful | Violates Q5(b); breaks v1.5 D-25 lock-on precedent; harness C14 negative-check FAILS | Never |
| Reuse v1.5 C11 keyword set unchanged in v1.6 harness | Path-A copy velocity | DA-7 false-positives on legitimate Apple-Business-meets-Intune prose; CI noise | Only if calibration sub-phase confirms zero false-positives |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|---------------|------------------|
| Apple Business UI ↔ Intune VPP token upload | Admin looks for "content token" in Intune UI | Use compound phrasing "content token (Apple VPP token in Intune)"; reciprocal glossary entries |
| Apple Business Federation ↔ Microsoft Entra | Assume Entra disable cascades to Apple Business role revocation | Document offboarding requires explicit Apple Business role removal; OP-8 prevention |
| Apple Business MDM server ↔ Intune ADE token | Sub-org admin can create new MDM server unintentionally | Whitelist-first custom role authoring; "Manage MDM Servers" privilege is DENY by default |
| Apple Business shared iPad ↔ MDM ClearPasscode | Use ClearPasscode when Apple Business UI reset would suffice | L1 runbook decision matrix orders by least-destructive-first |
| Apple Business device release ↔ DEP backend | Assume release is permanent removal | Document release is soft-delete; coordinate with reseller for permanent removal |
| Apple Business Location ↔ VPP content token | Touch the new Location before migration completes | "Untouched Location" callout in VPP consolidation runbook |
| Apple Business audit log ↔ SOX retention | Assume Apple Business satisfies long-term retention | Recommend periodic SIEM export; cite Apple does not publish retention SLA |
| Apple Business Account Holder ↔ Apple T&C acceptance | Account Holder = departed employee → T&C updates pile up | OP-2 callout; Account-Holder-as-personal-Apple-ID is hard error |

## Performance Traps

Not directly applicable — this is a documentation corpus, not a runtime system. The performance trap equivalents are:

| Trap | Symptoms | Prevention | When It Breaks |
|------|---------|-----------|----------------|
| Audit harness runtime > 30s | CI feedback loop too slow; authors disable harness | Keep file-walks scoped (e.g., apple-business doc paths only for C14-C16) | At ~250 docs (current corpus + v1.6 adds ~15) |
| L1 runbook count > 35 | L1 admin spend > 60s finding the runbook | Cap L1 runbook count per CI-5 prevention strategy | Already approaching limit at v1.5 |
| Glossary entry count > 80 | Glossary becomes unscannable; cross-references go stale | Defer non-canonical terms to in-context disambiguation prose | At ~100 entries the index UX degrades |
| Capability matrix row count per platform > 60 | Comparison doc cell count > 300; eye-fatigue | Cap per-domain rows; defer niche capabilities to platform-specific matrices only | At ~50 rows currently in iOS/macOS |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|-----------|
| Account Holder delegated to non-canonical account | Org structural lockout (OP-2) | Phase 62 hard-bordered callout; never include in delegated roles |
| Custom role grants Manage MDM Servers privilege to sub-org admin (OP-1) | Sub-org admin creates competing MDM server; device drain to wrong tenant | Whitelist-first role design; deny by default |
| Personal Apple ID becomes Account Holder | Federation-impossible; T&C unacknowledgeable | Pre-flight federation collision check (OP-7) |
| Apple Business audit log relied on for compliance > 1 year | Compliance gap at audit time (OP-13) | Periodic SIEM export pattern |
| Federated admin leaves org without Apple Business role revocation (OP-8) | Rehire silently re-grants Apple Business access | Offboarding checklist couples Entra disable + Apple Business role removal |
| Find My enabled on shared iPad blocks reset (OP-12) | Device bricked from re-enrollment standpoint | Disable Find My in supervised restrictions; Activation Lock bypass privilege |
| Released device re-acquires default enrollment profile (OP-6) | OOBE forces MDM on user's expected personal device | Coordinate with reseller for permanent DEP removal |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|------------|-----------------|
| Cross-platform language drift (DA-1) | macOS admin thinks v1.6 doc doesn't apply to them | "Apple platforms (iOS / iPadOS / macOS / shared iPad / Apple TV)" canonical phrasing |
| Rebrand inconsistency within v1.6 (DA-2) | Reader sees "Apple Business" + "ABM" in same paragraph | 3-site rebrand-callout budget enforced by harness |
| Two glossary terms for same concept (DA-3) | Admin doesn't know which is current | Bidirectional cross-references with publication-date attribution |
| L1 "look up admin" step has no action verb (DA-8) | L1 stuck; ticket escalates | Convention doc + L1→L2 escalation packet template |
| L2 generic "permission denied" runbook (DA-9) | L2 cycle time > 30 min on common ticket | 7-leaf decision tree |
| VPP terminology mismatch across Apple + Intune (OP-10) | 10-min menu search per admin | Compound phrasing convention |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Custom role authoring guide:** Often missing the privilege-grant matrix table with at minimum 6 sub-org-admin reference roles — verify Phase 62 ships the table
- [ ] **VPP content token consolidation runbook:** Often missing the "untouched Location" hard-bordered callout — verify OP-9 prevention is in-doc
- [ ] **Shared iPad passcode reset runbook:** Often missing the 3-path decision matrix and Find My pre-check — verify OP-11 + OP-12 are both in Phase 65 L1 runbook
- [ ] **Federation runbook:** Often missing the 60-day collision-resolution window detail — verify OP-7 prevention
- [ ] **Device release runbook:** Often missing the "release is not permanent removal" callout + active-shared-iPad-session pre-check — verify OP-6 prevention
- [ ] **Sibling capability matrices:** Often missing the reciprocal-H2 in Windows/Linux/Android matrices — verify DA-6 prevention; C12 harness check confirms
- [ ] **Glossary entries for both rebrand terms:** Often missing bidirectional cross-reference — verify DA-3 + CI-2 + CI-3 prevention
- [ ] **C12 H2 list in v1.6 harness:** Often missing the 7th H2 update post-Apple-Business addition — verify Phase 68 atomic harness commit landed math update
- [ ] **C11 calibration for v1.6 keyword set:** Often missing live-corpus refinement; defaults to v1.5 keyword set causing false-positives — verify Phase 68 CALIBRATION sub-phase
- [ ] **L1 runbook count:** Often grows beyond cap due to symmetric reasoning; verify CI-5 prevention (cap at 2)
- [ ] **Deferred-cleanup tracking list:** Often missing artifact; v1.7+ corpus sweep candidates aren't tracked — verify `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` exists
- [ ] **Pre-edit anchor inventory:** Often skipped on "small" matrix retrofit — verify DA-4 prevention; Phase 63 PLAN.md mandates artifact

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|--------------|----------------|
| OP-1 (competing MDM server created) | MEDIUM | Identify competing MDM server in Apple Business; reassign devices back to canonical MDM server; revoke "Manage MDM Servers" privilege from sub-org role |
| OP-2 (Account Holder lockout) | HIGH | Apple Enterprise Support paid ticket; identity verification; possible re-onboarding of Apple Business tenant if cannot recover |
| OP-5 (cross-Location device transfer broke licenses) | MEDIUM | Re-assign device to original Location; re-acquire licenses against Location-A token; if migration is permanent, purchase additional licenses against Location-B token |
| OP-6 (released device re-appeared) | LOW | Re-release device + coordinate with reseller to remove from DEP backend |
| OP-7 (federation collision) | MEDIUM | Resolve within 60-day Apple-imposed window; rename conflicting personal Apple ID OR use a non-conflicting Managed Apple Account domain |
| OP-8 (offboarded admin retains role assignment) | LOW | Periodic Apple Business audit; remove role assignments for Entra-disabled users |
| OP-9 (VPP migration touched Location too early) | HIGH | Cannot transfer licenses-in-use from "touched" Location; org must purchase replacement licenses against new Location OR continue using legacy token in parallel |
| OP-11 (data loss from EraseDevice on shared iPad) | HIGH | Restore from Time Machine / iCloud backup if available; no recovery if no backup |
| OP-12 (Activation Lock from Find My) | MEDIUM | Apple Business `Bypass Activation Lock` privilege; OR Apple Enterprise Support escalation |
| OP-13 (audit log gap at compliance audit) | HIGH | No recovery; document the retention SLA limitation; recommend SIEM export going forward |
| DA-4 (anchor stability regression) | LOW | Atomic fix-up commit; revert problematic edit; re-apply with anchor inventory artifact |
| DA-5 (C12 math drift in v1.6 harness) | LOW | Atomic harness commit updating C12 H2 list + math + sidecar |
| DA-6 (sibling-matrix-anchor-pin violation) | LOW | Atomic fix-up commit adding reciprocal H2 to missing platform matrices |
| CI-1 (rotting external URL) | LOW per URL | Surgical URL update; sidecar entry for transient external category |
| CI-4 (capability matrix row drift) | MEDIUM | Periodic audit; converge to single shared source if drift detected |

## Pitfall-to-Phase Mapping

How v1.6 phases should address these pitfalls. Phase numbering continues from v1.5 close at Phase 61; v1.6 spans Phase 62+.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| OP-1 (Manage MDM Servers privilege) | Phase 62 (Foundation), Phase 64 (delegation runbooks) | Privilege-grant matrix table present; harness C15 confirms |
| OP-2 (Account Holder lockout) | Phase 62 | Glossary entry + hard-bordered callout in role overview |
| OP-3 (Edit-without-View) | Phase 62 | Privilege dependency table column "Requires" populated |
| OP-4 (per-Location vs tenant scope) | Phase 62 + Phase 63 (multi-org architecture) | Bidirectional cross-reference between Foundation and architecture; "most-permissive wins" callout present |
| OP-5 (cross-Location transfer) | Phase 64 (delegation runbooks) | 4-cell impact matrix table in device-transfer runbook |
| OP-6 (release ≠ removal) | Phase 64 | "Release is not permanent removal" callout |
| OP-7 (federation collision) | Phase 64 | 60-day window collision-resolution sub-section |
| OP-8 (offboarded admin) | Phase 64 | Paired onboarding/offboarding runbook sub-sections |
| OP-9 (untouched Location) | Phase 64 | Hard-bordered callout in VPP consolidation runbook |
| OP-10 (Intune VPP token UI label) | Phase 62 (glossary) + Phase 64 | Compound phrasing convention enforced |
| OP-11 (3-path passcode reset) | Phase 65 (L1/L2 integration) | 3x3 decision matrix in L1 runbook; harness C16 confirms cross-links |
| OP-12 (Find My / Activation Lock) | Phase 63 (admin setup) + Phase 65 (L1 runbook) | Pre-deployment config step + L1 pre-check both present |
| OP-13 (audit retention) | Phase 64 (audit log runbook) | SIEM export recommendation callout |
| OP-14 (cross-Location audit visibility) | Phase 64 | Author-scope vs target-scope sub-section |
| OP-15 (Apple TV ownership boundary) | Phase 63 (admin setup) | Shared-physical-space heuristic in Apple TV provisioning guide |
| DA-1 (cross-platform language drift) | Phase 62 (style guide) | HTML comment block at top of every v1.6 doc; per-phase PLAN.md check |
| DA-2 (rebrand inconsistency) | Phase 62 + Phase 68 (harness) | 3-site whitelist; harness C14 negative-check |
| DA-3 (Managed Apple ID/Account) | Phase 62 (glossary) | Bidirectional cross-reference; harness C14 |
| DA-4 (anchor stability regression) | Phase 63 (matrix retrofit) | Pre-edit anchor inventory artifact mandatory |
| DA-5 (C12 math drift) | Phase 68 (harness) | Atomic harness commit with H2 list + math + sidecar update |
| DA-6 (sibling-matrix-anchor-pin) | Phase 63 | SC enumerates 5 expected H2 anchors by file:line:slug |
| DA-7 (C11 false-positive on Apple-Business-Intune prose) | Phase 68 (CALIBRATION sub-phase) | Live-corpus refinement; keyword set extended |
| DA-8 (L1 admin-directory lookup) | Phase 62 (convention) + Phase 65 (runbook back-pointer) | External directory convention documented; harness C16 |
| DA-9 (L2 permission-denied tree) | Phase 65 | 7-leaf decision tree; each leaf cross-links to OP-N |
| CI-1 (rebrand URL rot) | Phase 68 (rotting-reference sidecar) + deferred-cleanup list | New sidecar category; quarterly audit job |
| CI-2 (VPP location token rot) | Phase 62 (glossary) + deferred-cleanup list | Reciprocal entries; v1.7+ sweep candidates tracked |
| CI-3 (Managed Apple ID rot) | Phase 62 (glossary) + deferred-cleanup list | Reciprocal entries; v1.7+ sweep candidates tracked |
| CI-4 (matrix de-normalization) | Phase 63 (shared-source convention) | Shared-row-supplement pattern OR row-equality harness check |
| CI-5 (L1 runbook proliferation) | Phase 65 PLAN.md cap | L1 runbook count ≤ 2 enforced at PLAN.md SC |
| CI-6 (harness over-/under-fitting) | Phase 68 (informational-first) + Phase 69 (close-gate promotion) | C14-C16 promoted to blocking only after live-corpus refinement |

## Suggested v1.6 Phase Structure (Informed by Pitfalls)

Based on pitfall mapping, recommended phase ordering:

1. **Phase 62 — Foundation & Rebrand** — covers OP-1 (privilege overview), OP-2 (Account Holder), OP-3 (privilege dependencies), OP-4 (Locations decision matrix), OP-10 + DA-3 + CI-2 + CI-3 (glossary reciprocity), DA-1 (style guide), DA-2 (rebrand-callout budget), DA-8 (admin-directory convention)
2. **Phase 63 — Multi-org Architecture & Admin Setup** — covers OP-4 (architecture extension), OP-12 + OP-15 (Apple TV / shared iPad provisioning), DA-4 + DA-6 (capability matrix retrofit with pre-edit anchor inventory), CI-4 (shared-source convention)
3. **Phase 64 — Delegation Runbooks** — covers OP-5 (transfer), OP-6 (release), OP-7 (federation), OP-8 (offboarding), OP-9 (VPP consolidation), OP-13 + OP-14 (audit log)
4. **Phase 65 — L1 / L2 / Common-Issues Integration** — covers OP-11 + OP-12 (shared iPad reset L1), DA-9 (permission-denied L2), DA-8 (admin-directory back-pointer), CI-5 (runbook count cap)
5. **Phase 68 — Validation Tooling** — covers DA-2 (C14 rebrand-statement), DA-5 (C12 H2 math), DA-7 (C11 calibration), CI-1 (rotting-reference sidecar), CI-6 (informational-first promotion ladder)
6. **Phase 69 — Milestone Close** — covers CI-6 (blocking-mode promotion) + auditor-independence (D-22 lineage)

Phases 66-67 reserved for ad-hoc work / regression / wave-based parallel execution slots (consistent with v1.5 methodology).

## Sources

### Apple Official (HIGH confidence)
- [Intro to roles and privileges in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web)
- [Manage content tokens in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/manage-content-tokens-axme0f8659ec/web)
- [Migrate content tokens to Apple Business Manager](https://support.apple.com/guide/apple-business-manager/migrate-content-tokens-to-apps-axm593d6f469/web)
- [Create or reset user passwords in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/create-or-reset-user-passwords-axmd9c4cbc33/web)
- [Edit Managed Apple Accounts in Apple Business Manager](https://support.apple.com/guide/apple-business-manager/edit-managed-apple-accounts-axmfbea5f962/web)
- [Apple Business Manager is now Apple Business — transition notice](https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web)
- [Introducing Apple Business — newsroom](https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/)
- [Intro to federated authentication with Apple Business Manager](https://support.apple.com/guide/apple-business-manager/intro-to-federated-authentication-axmb19317543/web)

### Microsoft Learn (HIGH confidence)
- [Manage Apple Volume-Purchased Apps — Microsoft Intune](https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple)

### Community (MEDIUM confidence — confirms rebrand and operational patterns)
- [Apple Business Manager Is Becoming Apple Business — Pulkit Vora / Medium](https://medium.com/@pulkitvora/apple-business-manager-is-becoming-apple-business-what-this-means-and-why-it-matters-3c653a03c1ed)
- [Apple Business: Everything you need to know — IT Pro](https://www.itpro.com/software/apple/apple-business-everything-you-need-to-know-about-the-all-new-enterprise-platform)
- [Apple Unveils Apple Business All-in-One Platform — MacRumors](https://www.macrumors.com/2026/03/24/apple-unveils-apple-business/)
- [The New Apple Business Manager — Jon Brown blog](https://jonbrown.org/blog/new-apple-business-manager-overview/)
- [What are Role Privileges in Apple Business Manager — HardSoft](https://www.hardsoftcomputers.co.uk/blog/apple-business-manager/understanding-role-privileges-in-apple-business-manager/)

### Internal v1.0-v1.5 Lineage (HIGH confidence — direct corpus evidence)
- `.planning/PROJECT.md` (v1.4 D-25 platform-frontmatter-defaults-to-Windows no-retroactive-sweep; v1.5 D-10 sibling-matrix-anchor-pin; v1.5 D-22 auditor independence; v1.5 D-25 informational-first promotion ladder)
- `.planning/MILESTONES.md` (v1.5 methodology highlights — wave-based parallel execution; progressive-landing per-plan commits; auditor-independence via fresh worktree)
- `docs/admin-setup-macos/01-abm-configuration.md` (existing single-admin assumptions — Account Holder, Managed Apple ID requirement, MDM server assignment)
- `docs/admin-setup-ios/02-abm-token.md` (existing iOS ABM token doc — cross-references macOS, ASM functionally identical)
- `docs/admin-setup-ios/05-app-deployment.md:201` (VPP location token rotting-reference candidate)
- `docs/admin-setup-macos/04-app-deployment.md:148` (macOS VPP rotting-reference candidate)
- `docs/admin-setup-ios/08-user-enrollment.md:22, 49, 51` (Managed Apple ID rebrand acknowledgment — pre-existing forward-looking disclaimer)
- `docs/reference/4-platform-capability-comparison.md` (C12 math context — 6 H2 × 5 platform × 48 row = 240 cell)
- `scripts/validation/v1.5-milestone-audit.mjs:494-595` (C11 + C12 validator implementation; CALIBRATION pattern lineage)
- `scripts/validation/v1.5-audit-allowlist.json` (sidecar schema for exemption arrays — c11_ops_exemptions, c13_broken_link_allowlist, c9_exemptions, cope_banned_phrases, supervision_exemptions, safetynet_exemptions)

---
*Pitfalls research for: v1.6 Apple Business Delegated Governance & Multi-Org Operations*
*Researched: 2026-05-20*
*Author: gsd-project-researcher (Pitfalls axis)*
*Confidence: HIGH overall (verified against Apple official + Microsoft Learn + v1.0-v1.5 corpus)*
