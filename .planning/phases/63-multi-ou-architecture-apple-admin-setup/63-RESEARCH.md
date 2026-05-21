# Phase 63: Multi-OU Architecture & Apple Admin Setup - Research

**Researched:** 2026-05-21
**Domain:** Apple Business Manager (ABM) / Apple School Manager (ASM) multi-organizational-unit administration, custom roles, MDM server assignment, VPP/content tokens, Managed Apple Accounts, Shared iPad & Apple TV lifecycle
**Confidence:** MEDIUM — partial research completed before timeout; Apple-side framing claims verified against training knowledge and prior phase context, several items flagged as RESEARCH GAP for portal verification.

> **TIMEOUT NOTICE:** This file was written under a forced-stop directive. Sections completed before timeout are tagged with confidence. Incomplete sections are marked `> RESEARCH GAP:` so the planner can route them to portal verification or discuss-phase.

---

## Summary

Phase 63 documents the multi-OU administrative architecture for Apple Business/School Manager and the companion admin-onboarding, MDM-server-assignment, VPP/content-token, Managed Apple Account, and device-lifecycle (Shared iPad, Apple TV) procedures. The phase produces 10 documentation artifacts plus a `check-phase-63.mjs` validation harness. The core design tension is **Organizational Units (OUs) vs. Custom Roles** as the privilege-partitioning mechanism: OUs partition *which devices/content* an admin sees, while custom roles partition *which actions* an admin can perform. The recommended approach for OU-02 is a tightly-scoped 4-6 permission bundle that grants operational sub-org administration without granting tenant-fatal privileges.

The locked operational constraints (OP-1, OP-2, OP-3) require that the OU-02 bundle: (OP-1) does NOT include Manage-MDM-Servers — this stays DENY-by-default at the sub-org tier; (OP-2) contains NO Account-Holder action — Account Holder is a singleton tenant role that must never be delegated; (OP-3) maps every Manage privilege to its companion View privilege so sub-org admins can see what they manage. Doc-integrity constraints C15 (Apple-side framing only — no Microsoft/Intune cross-contamination in Apple docs) and C16 (exact GitHub-Markdown anchor slugs) govern the prose.

**Primary recommendation:** Build OU-02 as a 4-6 permission bundle of {Manage Devices, View Devices, Manage Content/Apps, View Content/Apps, Manage Assigned Users (View+limited Manage)} with Manage-MDM-Servers and Account-Holder explicitly excluded; document OU-06 onboarding with a manual / SCIM / OIDC+JIT decision tree framed entirely in Apple terminology; and write `check-phase-63.mjs` to assert structural invariants (anchor slug presence, byte-unchanged guarantee on the two pre-existing capability matrices, OP-1/OP-2 exclusion language present).

---

## User Constraints (from CONTEXT.md)

> RESEARCH GAP: CONTEXT.md was not fully read before timeout. The constraints below are reconstructed from the orchestrator's spawn directive (OP-1, OP-2, OP-3, C15, C16, D-06, OP-8) and MUST be reconciled against the actual `63-CONTEXT.md` by the planner before locking decisions.

### Locked Decisions (reconstructed from spawn directive)
- **OP-1:** OU-02 bundle MUST NOT include Manage-MDM-Servers. This privilege stays DENY-by-default at the sub-org admin tier.
- **OP-2:** OU-02 bundle MUST contain NO Account-Holder action. Account Holder is non-delegable.
- **OP-3:** Every Manage privilege in the OU-02 bundle MUST be paired with its companion View privilege.
- **C15:** Apple docs use Apple-side framing only — no Microsoft/Intune/Entra terminology leakage. (Decision criteria framed in Apple terms.)
- **C16:** Anchor slugs must be exact GitHub-Markdown-rendered slugs. The required slug for the admin-ownership section is `#which-admin-owns-this-pool`.

### Claude's Discretion
- OU-02 bundle exact composition within the 4-6 permission constraint (subject to OP-1/OP-2/OP-3).
- OU-06 onboarding decision-tree structure (manual / SCIM / OIDC+JIT).
- `check-phase-63.mjs` assertion granularity.

### Deferred Ideas (OUT OF SCOPE)
> RESEARCH GAP: Deferred ideas not confirmed from CONTEXT.md. D-06 (sub-OU nesting depth) and OP-8 (offboarding auto-revoke) are flagged as open portal-verification items below, NOT confirmed as deferred.

---

## Phase Requirements

> RESEARCH GAP: REQUIREMENTS.md requirement IDs were not loaded before timeout. The planner MUST populate this table from the actual phase requirements. The 10 deliverables below are derived from the orchestrator spawn directive.

| Deliverable | Description | Research Support |
|-------------|-------------|------------------|
| 03-ous-vs-custom-roles.md | Conceptual comparison: OUs partition scope, custom roles partition actions | See "OUs vs Custom Roles" section |
| 04-custom-role-authoring.md | How to author a custom role / permission bundle in ABM/ASM | See "Custom Role Authoring" + OU-02 bundle |
| 05-sub-org-admin-onboarding.md | Onboarding a sub-org administrator | See "OU-06 Onboarding Decision Criteria" |
| 06-mdm-server-assignment.md | Assigning devices to MDM servers per OU | See "MDM Server Assignment" |
| 07-vpp-content-token-consolidation.md | VPP / content token consolidation across OUs | See "VPP / Content Token" section |
| 08-managed-apple-account-provisioning.md | Provisioning Managed Apple Accounts | See "Managed Apple Account Provisioning" |
| 09-shared-ipad-lifecycle.md | Shared iPad lifecycle | See "Shared iPad Lifecycle" + anchor-inventory procedure |
| 10-apple-tv-lifecycle.md | Apple TV lifecycle | See "Apple TV Lifecycle" |
| ios-capability-matrix.md (3 rows) | iOS capability matrix, exactly 3 rows | See "iOS Capability Matrix" |
| check-phase-63.mjs | Validation harness | See "check-phase-63.mjs Assertion List" |

---

## Per-Deliverable Findings

### 03-ous-vs-custom-roles.md

**Core distinction [ASSUMED — verify against current ABM docs]:**
- **Organizational Units (OUs / "Locations" in ABM):** partition *scope* — which devices, which content tokens, which users an admin can see and act upon. In ABM these are surfaced as Locations; in ASM as a location hierarchy. OUs answer "WHAT can this admin touch?"
- **Roles (built-in + custom):** partition *actions* — which verbs (View, Manage) an admin can perform on the items in their scope. Roles answer "WHICH operations can this admin perform?"
- The two are orthogonal and composable: an admin is granted (Role × OU-scope). A sub-org admin = a custom role bundle scoped to one OU.

**Built-in roles [ASSUMED]:** Administrator, Account Holder (singleton), People Manager, Device Enrollment Manager, Content Manager. Custom roles let you compose a narrower bundle than any built-in.

> RESEARCH GAP: Exact current ABM role names and whether ABM uses the term "Custom Role" vs "permission bundle" needs portal verification. Apple has renamed several of these over time (e.g., "Manager" tiers). C15 requires Apple-exact terminology — do not invent names.

**Confidence:** MEDIUM (conceptual model is stable; exact UI labels need verification).

### 04-custom-role-authoring.md — OU-02 Recommended Permission Bundle (OP-1/OP-2/OP-3)

**Recommended OU-02 bundle (4-6 permissions, Manage→View paired per OP-3):**

| # | Manage Privilege | Companion View Privilege (OP-3) | Included? | Rationale |
|---|------------------|--------------------------------|-----------|-----------|
| 1 | Manage Devices | View Devices | ✅ | Sub-org admin assigns/unassigns devices within their OU |
| 2 | Manage Content & Apps | View Content & Apps | ✅ | Sub-org admin distributes VPP apps within their OU's content scope |
| 3 | Manage Assigned Users (limited) | View Users | ✅ | Sub-org admin manages Managed Apple Accounts within their OU |
| — | **Manage MDM Servers** | View MDM Servers | ❌ **EXCLUDED (OP-1)** | DENY-by-default — server topology is a tenant-level concern |
| — | **Account Holder actions** | (n/a) | ❌ **EXCLUDED (OP-2)** | Singleton, non-delegable tenant role |

This yields a bundle of **3 Manage + 3 View = 6 permissions** (within the 4-6 range). If a tighter 4-permission variant is desired, drop "Manage Assigned Users" to View-only (2 Manage + 2 View = 4), reframing user provisioning as a tenant-admin task.

**OP-1 confirmation:** Manage-MDM-Servers is explicitly absent and documented as DENY-by-default. The companion View-MDM-Servers is also excluded (no need to view server topology to operate within an OU) — but this is a discretion call; including View-MDM-Servers alone does not violate OP-1 since OP-1 targets *Manage*.

> RESEARCH GAP: Confirm whether View-MDM-Servers should be included for troubleshooting visibility. OP-1 only forbids Manage. Recommend leaving it out for least-privilege; flag for discuss-phase.

**OP-2 confirmation:** No Account-Holder action appears in the bundle. Account Holder is the single tenant owner role and is structurally non-delegable.

**OP-3 confirmation:** Every Manage privilege above has its companion View privilege listed in the same row. The bundle never grants Manage-without-View.

**Confidence:** MEDIUM — bundle composition is sound against OP-1/2/3; exact Apple privilege string names need portal verification for C15 compliance.

### 05-sub-org-admin-onboarding.md — OU-06 Onboarding Decision Criteria (C15-safe, Apple-side framing)

**Decision tree — choose the provisioning path for a new sub-org admin:**

1. **Manual (ABM web portal entry)**
   - **When:** Small sub-org (few admins), no upstream identity provider federated to ABM, or one-off/break-glass admin creation.
   - **Apple framing:** Account Holder or an Administrator creates the account directly in Apple Business/School Manager and assigns the custom role + Location scope.
   - **Tradeoff:** No automatic deprovisioning; relies on manual offboarding (see OP-8).

2. **SCIM (directory-synced provisioning)**
   - **When:** Sub-org admins are managed in a federated directory and you want account *lifecycle* (create/update/deactivate) synced into ABM/ASM automatically.
   - **Apple framing:** ABM/ASM consumes SCIM provisioning from the federated identity source; accounts and group memberships flow into Apple's directory. Role/scope assignment still mapped on the Apple side.
   - **Tradeoff:** Requires federation setup; role-to-group mapping must be maintained.

3. **OIDC + JIT (federated sign-in with just-in-time account creation)**
   - **When:** You want admins to authenticate with federated credentials and have the Managed Apple Account materialize on first sign-in.
   - **Apple framing:** ABM/ASM federated authentication via OpenID Connect; the Managed Apple Account is created just-in-time on first successful federated sign-in.
   - **Tradeoff:** JIT creates the *account* but role/scope grant is a separate Apple-side step; first-login latency.

**C15 compliance:** All three paths are framed in Apple terminology (Managed Apple Account, ABM/ASM, federated authentication, Location scope). No Intune/Entra/Conditional-Access language is used. The planner must keep prose Apple-side only — describe the identity provider generically as "your federated identity source," not by a Microsoft product name.

> RESEARCH GAP: Verify current ABM support matrix for SCIM and OIDC federation, and whether ABM uses "federated authentication" vs "Sign in with..." labels. Apple's federation feature set has evolved; confirm exact capability names before locking C15-exact prose.

**Confidence:** MEDIUM.

### 06-mdm-server-assignment.md — MDM Server Assignment

- Devices are assigned to MDM servers within ABM/ASM; assignment can be manual, by default-server-per-Location, or via assignment rules.
- Per OP-1, sub-org (OU-02) admins do NOT manage MDM servers — server creation/token-renewal/assignment-rule editing is reserved to tenant administrators.
- Document the per-OU default MDM server pattern: each Location can have a default server so newly-added devices in that Location auto-assign.

> RESEARCH GAP: Confirm current ABM terminology — "default device assignment server" per Location, and whether assignment rules exist beyond default-server. Verify against portal.

**Confidence:** MEDIUM.

### 07-vpp-content-token-consolidation.md — VPP / Content Token Consolidation

- Each Location holds its own content token (formerly "VPP token" / server token). Consolidation across OUs means deciding whether to centralize app licenses at the tenant root or distribute per-Location tokens.
- App licenses are managed/transferable within the content scope; transferring licenses between Locations has constraints (cool-down / revocation rules apply historically).

> RESEARCH GAP: Verify current license-transfer cool-down rules and whether content tokens are still per-Location in current ABM. The 30-day license transfer restriction was historically present — confirm it still applies.

**Confidence:** LOW — historical knowledge, needs verification.

### 08-managed-apple-account-provisioning.md — Managed Apple Account Provisioning

- "Managed Apple ID" was renamed to **"Managed Apple Account"** [VERIFIED via prior phase context / recent Apple rename]. C15 requires using the current name "Managed Apple Account" in all Apple docs.
- Provisioning paths align with the OU-06 onboarding tree: manual, SCIM-synced, or OIDC-JIT.
- Roles are attached to Managed Apple Accounts; scope is set by Location.

> RESEARCH GAP: Confirm Managed Apple Account capability differences (e.g., iCloud restrictions, sign-in surfaces) for current OS versions.

**Confidence:** MEDIUM.

### 09-shared-ipad-lifecycle.md — Shared iPad Lifecycle + Anchor-Inventory Procedure

**Lifecycle stages [ASSUMED]:** enrollment (supervised, ADE) → Shared iPad mode config → user sign-in with Managed Apple Account (cached user data partition) → sign-out → guest mode → wipe/re-provision.

**C16 anchor slug requirement:** This document must contain a section whose GitHub-rendered anchor slug is exactly **`#which-admin-owns-this-pool`**. To produce this slug, the Markdown heading must be:

```markdown
## Which admin owns this pool?
```

GitHub slug algorithm: lowercase, spaces→hyphens, strip punctuation (the `?` is dropped). `## Which admin owns this pool?` → `which-admin-owns-this-pool`. ✅ Matches C16 exactly.

> The `check-phase-63.mjs` harness MUST assert this exact slug is present (see assertion list).

**OU-09 pre-edit anchor-inventory procedure + byte-unchanged guarantee:**

Before editing `09-shared-ipad-lifecycle.md` (or any cross-linked doc), the procedure is:

1. **Inventory existing anchors** in the two pre-existing capability matrices BEFORE any edit:
   - `macos-capability-matrix.md`
   - `4-platform-capability-comparison.md`
2. Compute and record a **byte-length / checksum baseline** for both files.
3. Perform Phase 63 edits ONLY in the new/owned artifacts. The two pre-existing matrices are **read-only references** — they must be **byte-unchanged** by Phase 63.
4. After edits, re-checksum both files and assert byte-identical to baseline.

**Byte-unchanged guarantee:** Phase 63 adds `ios-capability-matrix.md` as a *new* file and may *link to* `macos-capability-matrix.md` and `4-platform-capability-comparison.md`, but must not modify them. `check-phase-63.mjs` enforces this via checksum comparison (see assertions).

> RESEARCH GAP: Confirm the exact relative paths and current checksums of `macos-capability-matrix.md` and `4-platform-capability-comparison.md` from the repo before the planner writes the harness baseline. Not read before timeout.

**Confidence:** MEDIUM (slug algorithm HIGH; lifecycle stages MEDIUM; file paths/checksums unverified).

### 10-apple-tv-lifecycle.md — Apple TV Lifecycle

**Lifecycle stages [ASSUMED]:** ADE enrollment (supervised) → Conference Room Display / single-app mode config → content/app assignment → AirPlay/access config → decommission/wipe.

> RESEARCH GAP: tvOS supervised-management capability matrix not verified. Confirm ADE support and management surface for current tvOS.

**Confidence:** LOW-MEDIUM.

### ios-capability-matrix.md — iOS Capability Matrix (exactly 3 rows)

The matrix must contain **exactly 3 rows** of capability data.

> RESEARCH GAP: The exact 3 capabilities/dimensions to enumerate were not confirmed from CONTEXT/REQUIREMENTS before timeout. Candidate row set (planner to confirm): (1) Supervised vs Unsupervised management surface, (2) Shared iPad support, (3) Managed Apple Account sign-in support. The harness should assert row-count == 3, not specific row content unless CONTEXT specifies it.

**C15:** Apple-side framing only — describe management via ABM/ASM + MDM generically, no Intune column.

**Confidence:** LOW — row content unverified; structural 3-row constraint is the firm requirement.

---

## check-phase-63.mjs — Assertion List

The validation harness should assert the following structural invariants. Pattern follows the existing `check-phase-62.mjs` harness in the repo (Node ESM `.mjs`, exit non-zero on failure, print per-assertion PASS/FAIL).

**Assertions (recommended):**

1. **All 10 artifacts exist** at expected paths (03-, 04-, 05-, 06-, 07-, 08-, 09-, 10-, ios-capability-matrix.md, check-phase-63.mjs itself).
2. **C16 anchor slug present:** `09-shared-ipad-lifecycle.md` contains a heading rendering to slug `which-admin-owns-this-pool` (assert presence of `## Which admin owns this pool?` or equivalent that slugifies identically).
3. **Byte-unchanged guarantee:** checksum (or byte-length) of `macos-capability-matrix.md` and `4-platform-capability-comparison.md` matches a recorded baseline — fail if either was modified by Phase 63.
4. **iOS matrix row count == 3:** parse `ios-capability-matrix.md` table body, assert exactly 3 data rows.
5. **OP-1 exclusion language:** `04-custom-role-authoring.md` contains explicit DENY-by-default / excluded language for Manage-MDM-Servers (assert the bundle table does NOT list Manage-MDM-Servers as included, and contains the exclusion rationale).
6. **OP-2 exclusion language:** `04-custom-role-authoring.md` asserts no Account-Holder action in the OU-02 bundle.
7. **OP-3 pairing:** every "Manage" privilege named in the OU-02 bundle table has a companion "View" privilege in the same row (assert no orphan Manage).
8. **C15 framing guard:** Apple docs contain no forbidden Microsoft/Intune/Entra terminology (assert absence of a denylist of strings: "Intune", "Entra", "Conditional Access", "Azure AD" — case-insensitive — in the Apple-side artifacts).
9. **OU-02 bundle size 4-6:** the bundle table has between 4 and 6 permission rows.

> RESEARCH GAP: Confirm `check-phase-62.mjs` exact API/style (it exists per git log commit 8b824bd / e8ae896) so `check-phase-63.mjs` matches harness conventions (v1.6 harness + sidecar). Not read before timeout.

**Confidence:** MEDIUM — assertions are derivable from constraints; harness style needs alignment with check-phase-62.mjs.

---

## Open Items — Portal Verification & Deferred Decisions

### D-06: Sub-OU nesting depth
> RESEARCH GAP: How deep can the OU/Location hierarchy nest in current ABM/ASM? Whether Phase 63 supports multi-level sub-OUs or a flat single-level sub-org model is unconfirmed. Recommend: document single-level sub-org as the supported pattern unless portal verification confirms nesting. Flag for discuss-phase / portal check.

### OP-8: Offboarding auto-revoke
> RESEARCH GAP: Does removing/deactivating a sub-org admin's Managed Apple Account auto-revoke their role+scope grants, or is manual cleanup required? This interacts with the OU-06 provisioning path:
> - Manual provisioning → manual offboarding (no auto-revoke).
> - SCIM → deactivation flows from directory (auto-revoke of account; role grant cleanup TBD).
> - OIDC+JIT → account deactivation on federation removal; scope grant cleanup TBD.
>
> Recommend documenting offboarding explicitly per provisioning path and flagging the auto-revoke behavior for portal verification.

---

## Project Constraints (from CLAUDE.md)

CLAUDE.md governs the broader Autopilot suite (PowerShell + FastAPI + React for Windows Autopilot). Phase 63 is an **Apple-side documentation phase** — CLAUDE.md's Windows/Intune content is OUT OF SCOPE for the prose per C15. The relevant CLAUDE.md directives that DO apply:
- Never commit credentials / .env.
- Audit-log administrative actions with user attribution (informs offboarding/onboarding doc tone).
- Validate inputs (informs harness rigor).

> Note: C15 specifically forbids Intune/Microsoft framing in Apple docs — this is in tension with CLAUDE.md being a Windows-Autopilot project. The planner must treat Phase 63 Apple docs as a walled garden: Apple terminology only.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | ABM uses "Locations" as the OU primitive | 03 | Wrong terminology breaks C15 |
| A2 | Built-in roles: Administrator, Account Holder, People Manager, Device Enrollment Manager, Content Manager | 03 | Wrong role names break C15 |
| A3 | OU-02 6-permission bundle (3 Manage + 3 View) | 04 | May exceed least-privilege intent |
| A4 | SCIM and OIDC+JIT both supported by current ABM | 05 | Decision tree branch invalid |
| A5 | Content tokens are per-Location; 30-day transfer cool-down | 07 | Consolidation guidance wrong |
| A6 | "Managed Apple Account" is current name (not "Managed Apple ID") | 08 | C15 violation if stale |
| A7 | iOS matrix 3 rows = supervised/shared-iPad/managed-account | ios-matrix | Wrong rows, harness asserts count only |
| A8 | check-phase-62.mjs is the harness template | check-phase-63 | Style mismatch |
| A9 | macOS + 4-platform matrices must stay byte-unchanged | 09 | Harness baseline wrong |

**All A-items above need confirmation.** Most are portal-verifiable or repo-readable; the planner should gate C15-exact prose behind verification of A1, A2, A4, A5, A6.

---

## Open Questions

1. **Exact CONTEXT.md decisions** — not read before timeout. Reconcile reconstructed OP-1/2/3, C15, C16 against the real file.
2. **REQUIREMENTS.md requirement IDs** — not loaded; map deliverables to REQ-IDs.
3. **Repo paths + checksums** of `macos-capability-matrix.md` and `4-platform-capability-comparison.md` — needed for harness byte-unchanged baseline.
4. **check-phase-62.mjs API/style** — needed for harness consistency.
5. **D-06 sub-OU depth** and **OP-8 auto-revoke** — portal verification.

---

## Sources

### Primary (HIGH confidence)
- GitHub Markdown slug algorithm (lowercase, spaces→hyphens, drop punctuation) — `## Which admin owns this pool?` → `which-admin-owns-this-pool`. HIGH (deterministic).

### Secondary (MEDIUM confidence)
- Prior phase context / repo git log (check-phase-62.mjs v1.6 harness exists, commits 8b824bd, e8ae896, 2840694).
- Training knowledge of ABM/ASM role + Location model.

### Tertiary (LOW confidence)
- Content-token transfer cool-down (historical), tvOS management surface — unverified, flagged as RESEARCH GAP.

---

## Metadata

**Confidence breakdown:**
- C16 anchor slug: HIGH — deterministic slug algorithm.
- OU-02 bundle vs OP-1/2/3: MEDIUM — logic sound, Apple privilege names unverified.
- OU-06 decision tree: MEDIUM — structure sound, ABM SCIM/OIDC support unverified.
- Byte-unchanged procedure: MEDIUM — procedure sound, baseline checksums unread.
- check-phase-63 assertions: MEDIUM — derivable, harness style needs alignment.
- VPP/content tokens, Apple TV, iOS matrix rows: LOW — historical/unverified.

**Research date:** 2026-05-21
**Valid until:** 2026-05-28 (7 days — Apple portal terminology is fast-moving; verify C15-critical names before locking prose)
