# Phase 35: Android Prerequisites — MGP & Zero-Touch Portal - Research

**Researched:** 2026-04-21
**Domain:** Android Enterprise prerequisite portals — Managed Google Play binding and Zero-Touch portal configuration
**Confidence:** HIGH (MGP mechanics, DPC JSON schema, ZT portal structure verified against current MS Learn 2026-04-16; MEDIUM for enrollment token 90-day maximum — not in current MS Learn)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Carrying forward from Phase 34:**
- Tri-portal shorthand: "Intune admin center" / "Managed Google Play (MGP)" / "Zero-Touch portal (ZT portal)"
- Mode labels: COBO (Fully Managed), BYOD (Work Profile), Dedicated (COSU), ZTE (Zero-Touch Enrollment), AOSP
- AEAUDIT-04 guard: never use "supervision" as an Android management term
- 60-day review cycle on all Phase 35 frontmatter
- No modifications to v1.0–v1.3 shared files (PITFALL 9, PITFALL 11)
- Admin template `docs/_templates/admin-template-android.md` (Phase 34 deliverable) is the structural template
- HTML-comment subtractive-deletion pattern (Phase 34 D-17) for ZT portal H4 in non-ZT guides

**Phase 35 decisions (from adversarial review):**
- D-01: `01-android-prerequisites.md` is concept-only orientation (no setup mechanics)
- D-07: Single mermaid flowchart for `00-overview.md`
- D-09: Prerequisites checklists split by path: GMS-path, ZTE-path, AOSP-path, shared
- D-10: Portal Navigation Note at bottom of `00-overview.md` for `endpoint.microsoft.com` vs `intune.microsoft.com`
- D-12: Hybrid what-breaks table (failure-mode rows + downstream-impact column) in MGP doc
- D-13: BOTH dedicated "Account types" subsection AND inline Entra reminder in MGP doc
- D-14: Pre-August-2024 consumer Gmail bindings deferred to v1.4.1 via text-only "See also" stub
- D-15: Every portal-step reference uses full URL `endpoint.microsoft.com` — never bare "Intune admin center" alone
- D-16: Disconnect-consequence callout inline at binding step AND in what-breaks table
- D-19: Step 0 reseller gate uses BOTH top-of-page blockquote AND numbered Step 0 section
- D-20: Commented DPC extras JSON skeleton with adjacent "Fields reference" table
- D-21: KME/ZT mutual-exclusion callout uses BOTH top-of-doc warning box AND inline callout at ZT-Intune linking step
- D-22: Phase 35 scope: portal account creation, ZT↔Intune linking, DPC extras JSON, Step 0 reseller gate, KME/ZT forward-reference, network-dependency note, single-org-to-account-link constraint
- D-26: Plan-phase researcher MUST run plan-time verification for all three research flags before authoring tasks
- D-27: Executor re-verifies portal-UI-specific assertions at execute time
- D-28: Enrollment token 90-day expiry: omit or label MEDIUM confidence — never stated as authoritative without verification

### Claude's Discretion

- Exact word counts within 600–900-word target for `01-android-prerequisites.md`; 800–1200 for admin guides
- Whether DPC extras JSON skeleton uses adjacent "Fields reference" table or inline JSON comments with "remove before use" note
- Exact phrasing of Step 0 blockquote vs Step 0 numbered section (avoid verbatim duplication)
- Whether to include a mermaid diagram in `02-zero-touch-portal.md` (not required)
- How what-breaks table rows are ordered (severity-descending recommended)
- Per-term cross-platform callouts that reference `_glossary-android.md` anchors

### Deferred Ideas (OUT OF SCOPE)

- Pre-August-2024 consumer Gmail binding migration path (v1.4.1)
- Full DPC extras JSON with tenant-specific Intune values (out of scope — skeleton only)
- ZT portal corporate-scale content: device-claim workflow, profile assignment at scale, reseller-upload handoff, dual-SIM IMEI 1 note, configuration-must-be-assigned gotcha (Phase 39)
- ZTE L1 triage runbook 27 (Phase 40)
- COPE migration language and Android 15 FRP callout (Phase 36)
- Knox Mobile Enrollment full admin path (v1.4.1 — only KME/ZT mutual-exclusion callout in Phase 35)
- BYOD-specific enrollment restrictions and privacy-boundary table (Phase 37)
- Managed Home Screen exit-PIN sync callout (Phase 38)
- Cross-platform nav integration (post-v1.4)
- Reciprocal `_glossary-macos.md` cross-reference (Phase 42)
- AOSP full coverage (v1.4.1)
- Play Integrity verdict depth (Phase 41)
- Enrollment token 90-day expiry authoritative statement (pending verification)

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEPREQ-01 | Intune admin can read an Android prerequisites doc (`docs/android-lifecycle/01-android-prerequisites.md`) summarizing the tri-portal surface, GMS vs AOSP split, and corporate-identifier behavior with Android 12+ IMEI/serial removal | Tri-portal model confirmed HIGH; GMS/AOSP split confirmed HIGH; Android 12+ identifier removal confirmed HIGH via MS Learn add-corporate-identifiers |
| AEPREQ-02 | Intune admin can read an admin setup overview (`docs/admin-setup-android/00-overview.md`) describing the correct tri-portal setup sequence and per-mode portal dependencies | iOS 00-overview structural template read; 5-mode branching confirmed; prerequisite-checklist pattern confirmed |
| AEPREQ-03 | Intune admin can bind a tenant to Managed Google Play (`docs/admin-setup-android/01-managed-google-play.md`) using an Entra account (preferred since August 2024), starting from `endpoint.microsoft.com`, with a "what breaks" table covering disconnect consequences | Binding mechanics verified HIGH via MS Learn connect-managed-google-play (2026-04-16); Entra preference confirmed; four auto-provisioned apps confirmed; disconnect behavior confirmed |
| AEPREQ-04 | Intune admin can configure the Zero-Touch portal (`docs/admin-setup-android/02-zero-touch-portal.md`) with reseller requirement as Step 0, portal navigation, DPC extras JSON, ZT-Intune linking, and KME/ZT mutual-exclusion callout for Samsung devices | ZT portal structure verified via Google AE Help; DPC extras JSON schema verified HIGH via MS Learn ref-corporate-methods (2026-04-16); KME/ZT exclusion confirmed HIGH via Samsung Knox docs; iframe linking confirmed |

</phase_requirements>

---

## Summary

Phase 35 delivers the two hard gates for Android Enterprise enrollment — Managed Google Play tenant binding and Zero-Touch portal configuration — plus the conceptual orientation doc and admin setup overview that downstream phases (36–39) will reference rather than duplicate. All four deliverables have been fully researched against current sources.

**MGP binding mechanics** are verified HIGH confidence against MS Learn `connect-managed-google-play` (last updated 2025-11-11, git 2026-04-16). The Entra account preference since August 2024 is confirmed; the four auto-provisioned apps (Microsoft Intune, Microsoft Authenticator, Intune Company Portal, Managed Home Screen) are confirmed; the disconnect consequence (disables all Android Enterprise GMS management for the tenant) is confirmed. The `endpoint.microsoft.com` portal entry is the link provided in Microsoft's own step-by-step (`go.microsoft.com/fwlink/?linkid=2109431` resolves to `intune.microsoft.com`'s branded redirect, which ultimately reaches the admin center; the critical warning is about using `intune.microsoft.com` vs `endpoint.microsoft.com` as the browser entry point when the redirect behavior matters during binding).

**ZT portal mechanics** are verified via Google Android Enterprise Help. The portal requires Google account login; five sidebar sections confirmed: Configurations, Devices, Users, Resellers, Customer details. DPC extras JSON schema verified HIGH against MS Learn `ref-corporate-methods` (updated 2025-12-04, git 2026-04-16) — the exact four-field JSON with `com.google.android.apps.work.clouddpc` is documented there. Iframe linking steps verified. KME/ZT mutual exclusion noted explicitly in Google's help page.

**Enrollment token 90-day maximum:** NOT confirmed in current MS Learn. MS Learn `setup-fully-managed` and `setup-dedicated` both state tokens expire "up to 65 years in the future" — no 90-day cap. AOSP tokens have a 90-day maximum (noted in FEATURES.md research), but this applies specifically to AOSP enrollment tokens, not COBO/Dedicated GMS tokens. Per D-28, the 90-day claim must be omitted or labeled MEDIUM confidence citing community consensus only. **This research resolves the ambiguity: the 90-day maximum is AOSP-specific, not a general GMS enrollment token limit.**

**Android 12+ corporate identifier removal** is confirmed HIGH against MS Learn `add-corporate-identifiers` (updated 2025-04-11): Google removed IMEI/serial/MEID read access from personally-owned work profile devices in Android 12. COBO/COSU/COPE auto-mark as corporate without pre-upload.

**Primary recommendation:** Phase 35 is fully plannable. No blocking research gaps. The plan-time verification protocol resolves the enrollment-token ambiguity with a clear finding (AOSP-only 90-day; GMS tokens go to 65 years). ZT portal UI navigation paths should be treated as MEDIUM confidence — portal is authenticated-only so UI steps cannot be live-verified; write steps based on Google help docs and MS Learn iframe walkthrough, and flag for executor re-verification per D-27.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| MGP binding authentication (Entra account) | API / Backend (Google + Intune) | — | Binding happens server-side between Intune tenant and Google enterprise — no client-side component |
| MGP binding UI steps | Admin portal (Intune admin center) | Google-side signup | Admin navigates Intune admin center; Google presents signup form via iframe |
| Zero-Touch portal configuration | Admin portal (Zero-Touch portal) | Intune admin center (iframe) | ZT portal is the authoritative source; iframe is a convenience access point |
| DPC extras JSON configuration | Admin portal (Zero-Touch portal) | — | JSON is pasted into ZT portal Configurations UI |
| ZT-to-Intune linking | Admin portal (Intune admin center) | Zero-Touch portal (direct) | Iframe link in Intune; or direct portal navigation for COPE/Dedicated |
| Android 12+ corporate identifiers | API / Backend (Intune) | — | Hardware identifier restriction is enforced at the Android OS + Intune API layer |
| Concept-only orientation (`01-android-prerequisites.md`) | Documentation | — | No admin portal steps; conceptual content only |

---

## Standard Stack

### Core (Portals and Tools for Phase 35 Content)

| Portal / Tool | URL | Purpose | Confidence |
|---------------|-----|---------|------------|
| Microsoft Intune admin center | `https://intune.microsoft.com` (entry); `https://go.microsoft.com/fwlink/?linkid=2109431` (deep link) | MGP binding, ZT iframe linking, enrollment profile management | HIGH — MS Learn verified |
| Managed Google Play (MGP) | `https://play.google.com/work` | App approval/distribution; auto-provisioned at binding | HIGH — MS Learn verified |
| Zero-Touch portal (ZT portal) | `https://enterprise.google.com/android/zero-touch/customers` | Configuration management, device linking, DPC extras | HIGH — Google AE Help verified; UI is authenticated-only (cannot be live-verified without login) |
| Android Enterprise Solutions Directory (resellers) | `https://androidenterprisepartners.withgoogle.com/resellers/` | Authorized reseller verification | HIGH — Google-operated directory |

### Supporting

| Item | Version/Date | Purpose | Confidence |
|------|-------------|---------|------------|
| MS Learn: connect-managed-google-play | Updated 2025-11-11; git 2026-04-16 | Authoritative MGP binding steps | HIGH |
| MS Learn: ref-corporate-methods | Updated 2025-12-04; git 2026-04-16 | DPC extras JSON, ZT enrollment methods | HIGH |
| MS Learn: setup-fully-managed | Updated 2025-05-08; git 2026-04-16 | Token expiry, token types | HIGH |
| MS Learn: setup-dedicated | Updated 2025-05-08; git 2026-04-16 | Dedicated token options, token expiry | HIGH |
| Google AE Help: answer/7514005 | Fetched 2026-04-21 | ZT portal navigation, reseller workflow, KME/ZT exclusion, network requirements | HIGH (Google-authoritative) |
| MS Learn: add-corporate-identifiers | Updated 2025-04-11; git 2026-04-16 | Android 12+ IMEI/serial removal | HIGH |

---

## Architecture Patterns

### Recommended Project Structure for Phase 35

Phase 35 creates one new directory and adds one file to an existing directory:

```
docs/
├── android-lifecycle/           # EXISTS (Phase 34)
│   ├── 00-enrollment-overview.md   (Phase 34)
│   ├── 01-android-prerequisites.md ← NEW: Phase 35 (AEPREQ-01)
│   ├── 02-provisioning-methods.md  (Phase 34)
│   └── 03-android-version-matrix.md (Phase 34)
└── admin-setup-android/         ← NEW DIRECTORY: Phase 35 creates this
    ├── 00-overview.md           ← NEW: Phase 35 (AEPREQ-02)
    ├── 01-managed-google-play.md ← NEW: Phase 35 (AEPREQ-03)
    └── 02-zero-touch-portal.md  ← NEW: Phase 35 (AEPREQ-04)
```

Note: `docs/admin-setup-android/` directory does NOT exist yet. Phase 34 does not create it (Phase 34 CONTEXT D-22 confirms this). Phase 35 creates both the directory and the first three files.

### Pattern 1: `01-android-prerequisites.md` — Concept-Only Orientation (600–900 words)

**What:** Explains the tri-portal surface (what each portal is for, which modes use it), GMS-vs-AOSP split, Android 12+ corporate-identifier behavior — then points to mechanics guides. No setup steps.

**Anchor contract (downstream phases depend on these):**
- `#tri-portal-surface`
- `#gms-vs-aosp-split`
- `#android-12-corporate-identifiers`
- `#portal-dependencies-by-mode`

**Cross-references required:**
- Phase 34's `_glossary-android.md` for MGP, Zero-Touch Enrollment, DPC anchors
- Phase 34's `03-android-version-matrix.md` for IMEI/serial assertion (D-03: link, do not restate)
- Phase 34's `02-provisioning-methods.md` for method-mode reference (D-04: link, do not duplicate)

**What NOT to include:** Portal navigation steps, account type recommendations, DPC JSON, reseller requirements — all belong in the mechanics guides.

### Pattern 2: `00-overview.md` — Setup-Sequence Navigation (800–1200 words)

**What:** Mermaid flowchart + numbered path lists + path-split prerequisites checklists. Structural template: `docs/admin-setup-ios/00-overview.md`.

**Mermaid diagram specification** (D-07):
```
flowchart TD
    START[Admin lands here] --> CHOOSE{Choose your mode}
    CHOOSE -->|COBO / BYOD WP / Dedicated| MGP[01-managed-google-play.md]
    MGP --> COBO_PATH[Phase 36 — COBO admin guide]
    MGP --> BYOD_PATH[Phase 37 — BYOD Work Profile guide]
    MGP --> DED_PATH[Phase 38 — Dedicated devices guide]
    CHOOSE -->|Zero-Touch Enrollment| MGPZTE[01-managed-google-play.md]
    MGPZTE --> ZT[02-zero-touch-portal.md]
    ZT --> ZTE_PATH[Phase 39 — ZTE admin content]
    CHOOSE -->|AOSP| AOSP_PATH[Phase 39 — AOSP stub]
```

**Prerequisites checklists** (D-09):
- **GMS-path** (COBO / BYOD WP / Dedicated): MGP binding required; Intune Administrator role; Intune Plan 1; Entra tenant
- **ZTE-path**: All GMS-path prerequisites PLUS authorized reseller relationship established at device purchase; ZT portal Google account; ZT portal account linked to Intune
- **AOSP-path**: Intune Administrator role; Intune Plan 1 (verify if Plan 2/Suite required per OEM); device is in AOSP-supported-devices list
- **Shared**: Intune Plan 1, Intune Administrator role, Entra tenant active

**Portal Navigation Note** (D-10): At bottom of `00-overview.md` — single location for `endpoint.microsoft.com` vs `intune.microsoft.com` reminder at overview level. Full what-breaks callout for wrong-URL lives inline in `01-managed-google-play.md`.

### Pattern 3: `01-managed-google-play.md` — MGP Binding Mechanics (800–1200 words)

**Binding steps (verified HIGH — MS Learn `connect-managed-google-play`, 2026-04-16):**
1. Sign in to Intune admin center → `go.microsoft.com/fwlink/?linkid=2109431`
2. Devices > Enrollment > Android tab > Prerequisites > Managed Google Play
3. Accept data-sharing terms (Microsoft shares user/device info with Google — document in privacy note)
4. Select "Launch Google to connect now"
5. Confirm prefilled Microsoft Entra account (as of August 2024: Entra preferred — not Gmail, not Google Workspace)
6. Follow Google prompts to create Admin account
7. Select "Allow and create account" to grant Intune permission
8. On completion: four apps auto-approved in Managed Google Play store

**Four auto-provisioned apps** (confirmed HIGH):
1. Microsoft Intune (`com.microsoft.intune`) — fully managed, dedicated, COPE
2. Microsoft Authenticator (`com.azure.authenticator`) — two-factor, Entra shared device mode
3. Intune Company Portal (`com.microsoft.windowsintune.companyportal`) — work profile scenarios, MAM
4. Managed Home Screen (`com.microsoft.launcher.enterprise`) — multi-app kiosk on dedicated devices

**Account types — three-row comparison table** (D-13):

| Account type | Supported | Notes |
|-------------|-----------|-------|
| Microsoft Entra account | YES — Preferred since August 2024 | Corporate email; must have active mailbox for Google validation; manages Google Admin account for entire tenant |
| Consumer Gmail account | YES — Legacy supported | Existing consumer Gmail bindings from before August 2024 continue to work; new bindings should use Entra |
| Google Workspace / G-Suite | NO | Binding fails with opaque error; do not use |

**Binding permanence:** The Entra/Gmail account is associated with ALL Android Enterprise management tasks for the tenant. Google recommends minimum two owners for redundancy. Cannot change the linked account without disconnecting (which breaks everything).

**Disconnect consequences:** Disconnecting disables Android Enterprise device management for the tenant. Step sequence: must retire all AE personally-owned WP devices, AE corporate-owned WP devices, AE fully managed, and AE dedicated devices BEFORE disconnecting. App assignments, OEMConfig assignments, and LOB app availability are lost.

**What-breaks table** (D-12 hybrid, per CONTEXT specifics):

| Failure mode | What happens | Downstream impact (modes broken) | Recovery |
|-------------|--------------|----------------------------------|----------|
| Wrong portal URL used (`intune.microsoft.com` without `endpoint.microsoft.com` entry) | Binding redirect may behave unexpectedly; browser security zone mismatch (portal.azure.com / play.google.com / enterprise.google.com must be same zone) | None — no binding created | Use `endpoint.microsoft.com`; follow browser security zone alignment instructions in MS Learn |
| Google Workspace / G-Suite account used | Binding fails with opaque error | None — no binding created | Use Entra account (preferred) or consumer Gmail |
| Consumer Gmail used (new binding post-August 2024) | Binding succeeds; Entra-preference path not taken | All GMS modes work but future migration required per v1.4.1 | See Also: "Binding migration for pre-August-2024 consumer Google/Gmail bindings — tracked for v1.4.1" (text-only stub, not hyperlink) |
| Binding disconnected | All app assignments lost; OEMConfig assignments lost; LOB app availability lost instantly | **CRITICAL**: COBO broken; BYOD WP broken; Dedicated broken; ZTE-GMS-path broken; AOSP unaffected | Re-bind; reassign every app and configuration manually |
| App assignment lost post-binding change | Apps disappear from managed device catalogs | Affects all modes that relied on the lost assignments | Re-approve apps in MGP; re-assign in Intune |

**Enrollment token clarification** (resolves STATE.md flag):
- COBO and Dedicated GMS enrollment tokens: up to 65 years in the future (MS Learn `setup-fully-managed` and `setup-dedicated`, 2026-04-16). **No 90-day cap for GMS tokens.**
- AOSP enrollment tokens: 90-day maximum (FEATURES.md — this is the AOSP-specific limit, not a general GMS limit)
- The "90-day max" claim in community sources refers specifically to AOSP tokens; applying it to COBO/Dedicated GMS tokens is incorrect.
- **Per D-28: do NOT state a 90-day maximum for GMS enrollment tokens. Document the 65-year option from MS Learn (HIGH confidence) and omit the community-sourced 90-day claim entirely.**

### Pattern 4: `02-zero-touch-portal.md` — ZT Portal Configuration (800–1200 words)

**Step 0 dual placement** (D-19):

*Top-of-page blockquote* (decision-framing):
> **Reseller prerequisite:** Devices must be purchased from an authorized Zero-Touch reseller. Self-registration of existing stock is not supported. Devices deregistered from Zero-Touch cannot be re-registered without reseller involvement. See Step 0 below.

*Step 0 section* (execution):
- Reseller eligibility checklist (link to Android Enterprise Solutions Directory)
- How to verify reseller status with device vendor
- What to do if reseller relationship not in place: STOP — enroll via COBO QR/NFC/afw#setup or defer to corporate procurement

**ZT portal navigation** (verified via Google AE Help, 2026-04-21):
- Portal URL: `https://enterprise.google.com/android/zero-touch/customers` (requires Google account login — cannot deep-link without authentication)
- Account creation: Create Google account at `accounts.google.com/signupwithoutgmail` using corporate email (NOT Gmail)
- Portal sidebar sections: Configurations / Devices / Users / Resellers / Customer details

**ZT↔Intune linking** (verified HIGH via MS Learn `ref-corporate-methods`, 2026-04-16):

Two methods — document both:

Method A: **Via iframe in Intune admin center**
1. Intune admin center → Devices > By platform > Android > Device onboarding > Enrollment > Bulk enrollment methods > Zero-touch enrollment
2. Add `update app sync` permission first (Tenant administration > Roles)
3. Sign in with Google account provided to reseller
4. Select ZT account to link; select "Link"
5. Default configuration created automatically (targets Fully Managed — for Dedicated or COPE, use Method B)

Method B: **Direct Zero-Touch portal**
- Navigate directly to `enterprise.google.com/android/zero-touch/customers`
- Select "Add new configuration" → select Microsoft Intune as EMM DPC app
- Paste DPC extras JSON (see DPC extras section)
- Supports Fully Managed, Dedicated, and COPE configurations

**Caution** (from MS Learn, HIGH confidence): Linking account via iframe creates a default Fully Managed configuration that overrides the portal default. Do not use iframe linking if the intent is Dedicated or COPE enrollment — use Method B instead.

**DPC extras JSON skeleton** (verified HIGH — MS Learn `ref-corporate-methods`, 2026-04-16):

```json
{
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
    "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
    "I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg",
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
    "https://play.google.com/managed/downloadManagingApp?identifier=setup",
  "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
    "com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "YourEnrollmentToken"
  }
}
```

**Fields reference table** (D-20 — adjacent to skeleton):

| Field | Required | Source | Purpose |
|-------|----------|--------|---------|
| `android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME` | Required | Google ZT spec | Identifies the DPC receiver class — fixed value for Microsoft Intune (CloudDPC) |
| `android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM` | Required | Google ZT spec | Verifies the DPC app signature — fixed value for CloudDPC |
| `android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION` | Required | Google ZT spec | URL where the device downloads the DPC app |
| `android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE` | Required | Google AMAPI schema | Wrapper object for Intune-specific extras |
| `com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN` | Required | MS Learn (Intune-specific) | Your Intune enrollment token — replace `YourEnrollmentToken` with actual token string exported from the enrollment profile |

**Note for authors:** Export the enrollment token from Intune admin center (enrollment profile > Token > Export token) to get the JSON-formatted token value. Replace `YourEnrollmentToken` exactly, preserving the surrounding double quotes.

**Network dependency** (D-22): Devices need a working internet connection when first set up — Ethernet, Wi-Fi, or cellular. Captive-portal networks or networks without Google service access will cause enrollment to fall through to consumer setup. [VERIFIED: Google AE Help answer/7514005]

**Single-org-to-account-link constraint** (D-22): An org can only link to one Zero-Touch account. Account unlinking while the org exists makes the account unrecoverable. [VERIFIED: research PITFALLS.md — citing Google docs; ASSUMED at claim-level — not re-verified in this session against current Google developers documentation]

**KME/ZT mutual-exclusion callout** (D-21):

*Top-of-doc warning box* (decision-framing; not a gotchas section):
> For Samsung device fleets: choose either Knox Mobile Enrollment (KME) or Zero-Touch Enrollment — never both. Configuring both on the same Samsung devices causes out-of-sync enrollment state that is difficult to diagnose. Full KME admin coverage is tracked for v1.4.1. See [v1.4.1 deferred items].

*Inline placement*: At the ZT-Intune linking step, one-line callout: "Samsung admins: confirm KME is NOT also configured for the same device set."

**Note on KME behavior in dual configuration** (HIGH confidence — Samsung Knox docs and Google Developers known issues): "If a device is registered and configured in both Knox Mobile Enrollment and zero-touch, the device will enroll using Knox Mobile Enrollment." Remove KME configuration to ensure Zero-Touch applies.

### Anti-Patterns to Avoid

- **Stating "90-day maximum" for GMS enrollment tokens without qualification.** MS Learn states 65 years for both COBO and Dedicated GMS tokens. The 90-day limit is AOSP-specific. See D-28.
- **Duplicating version matrix details in `01-android-prerequisites.md`.** The doc links to `03-android-version-matrix.md` for the IMEI/serial assertion — it does not restate version gate details.
- **Using the iframe method for Dedicated or COPE ZT configurations.** MS Learn's caution: the default configuration from iframe linking is Fully Managed. Use the direct portal for other modes.
- **Saying "supervision" in any Android context.** AEAUDIT-04 guard — use "fully managed."
- **Modifying any v1.0–v1.3 shared file.** PITFALL 9 / PITFALL 11 guard.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Portal URL redirect behavior | Custom URL redirect documentation | MS Learn's documented entry point via `go.microsoft.com/fwlink/?linkid=2109431` | Microsoft documents the correct entry; redirect behavior is portal-side |
| DPC extras JSON | Custom JSON schema from scratch | MS Learn `ref-corporate-methods` four-field skeleton (HIGH confidence, 2026-04-16) | Schema is exact — wrong values cause silent enrollment failure |
| Reseller directory | Custom reseller list | Google Android Enterprise Solutions Directory (`androidenterprisepartners.withgoogle.com/resellers/`) | Google-operated, always current; any static list goes stale |
| ZT portal navigation steps | Inferred from portal UI | Google AE Help `support.google.com/work/android/answer/7514005` | Portal redesigns frequently; Google's own help is the canonical source |
| Enrollment token JSON export | Manual JSON construction | Intune admin center > enrollment profile > Token > Export token | The export produces the exact JSON for ZT/KME; constructing manually risks errors |

---

## Common Pitfalls

### Pitfall 1: Enrollment Token 90-Day Ambiguity

**What goes wrong:** Author states "enrollment tokens have a 90-day maximum" as an authoritative claim. This is INCORRECT for COBO and Dedicated GMS tokens (MS Learn states 65 years). The 90-day limit is AOSP-specific and applies to AOSP enrollment tokens only.

**Root cause:** Community sources cite 90-day across all token types; this was historically accurate for dedicated device tokens but changed in December 2022 (per FEATURES.md research). MS Learn `setup-fully-managed` and `setup-dedicated` both document "up to 65 years."

**How to avoid:** Per D-28, do not state a 90-day maximum for GMS enrollment tokens. Document the 65-year option (MS Learn, HIGH confidence). If AOSP token expiry appears in Phase 39 AOSP stub, document 90-day as AOSP-specific.

**Warning signs:** Any Phase 35 doc prose that says "enrollment tokens expire every 90 days" or "tokens have a 90-day maximum."

### Pitfall 2: ZT Portal UI Navigation Cannot Be Live-Verified

**What goes wrong:** Author writes portal navigation steps based on Google help docs but the portal UI has redesigned since the help docs were written.

**Root cause:** ZT portal at `enterprise.google.com/android/zero-touch/customers` requires authenticated Google account access. Research cannot live-verify the current navigation without access. Google AE Help describes five sidebar sections (Configurations, Devices, Users, Resellers, Customer details) — this is the canonical reference.

**How to avoid:** Per D-25 and D-27, executor re-verifies portal-UI-specific steps at execute time. Document steps with attributions to Google AE Help `answer/7514005` (fetched 2026-04-21). Mark portal UI navigation assertions as needing executor verification with inline notes.

**Warning signs:** Portal navigation prose that says "look in the sidebar under X" without citing source and verification date.

### Pitfall 3: MGP Binding Browser Zone Mismatch

**What goes wrong:** Admin gets a redirect loop or silent failure during binding because browser security zones don't match.

**Root cause:** MS Learn documents that `portal.azure.com`, `play.google.com`, and `enterprise.google.com` must be in the same browser security zone for the binding to succeed. This is an MS Learn tip that is easy to miss in the step sequence.

**How to avoid:** Include the browser security zone note (as a tip, not a warning) at the binding step. Source: MS Learn `connect-managed-google-play` "Tip: Due to the interaction between Google and Microsoft domains, you might need to adjust your browser settings."

### Pitfall 4: CONTEXT D-15 Portal URL Specificity

**What goes wrong:** Author writes "navigate to the Intune admin center" without the URL, then the "what breaks" table only says "wrong portal used" without specifying which URL is correct.

**Root cause:** D-15 requires that every portal-step reference uses the full URL `endpoint.microsoft.com` — never bare "Intune admin center" without the URL when the `intune.microsoft.com` redirect is in play. The distinction matters for the what-breaks table.

**How to avoid:** Every portal navigation step in `01-managed-google-play.md` includes the explicit URL. The what-breaks table row for "wrong portal URL" names `intune.microsoft.com` as the wrong URL and `endpoint.microsoft.com` as the correct entry point.

### Pitfall 5: Phase 34 Template Not Available at Phase 35 Plan Time

**What goes wrong:** Phase 35 admin guides reference a structural template (`docs/_templates/admin-template-android.md`) that is a Phase 34 deliverable. If Phase 34 is incomplete, the template does not exist and the admin guides cannot be structurally verified.

**Root cause:** STATE.md shows Phase 34 is currently executing. Phase 35 planning depends on Phase 34 completion.

**How to avoid:** Planner must verify Phase 34 deliverables before tasking admin guide authoring (per CONTEXT.md code_context integration points note). The filesystem check confirms: `docs/_templates/admin-template-android.md` does NOT exist yet — Phase 34 execution must complete first. Wave 1 of Phase 35 planning should gate on Phase 34 template existence.

---

## Plan-Time Verification Protocol (D-26 Compliance)

The following table documents the verification outcome for each STATE.md research flag relevant to Phase 35:

| Flag | Confidence Before | Verification Result | Confidence After | Action for Planner |
|------|------------------|---------------------|-----------------|-------------------|
| ZT portal UI navigation paths | MEDIUM (history of redesigns) | Verified portal requires Google login; five sidebar sections confirmed via Google AE Help answer/7514005 (fetched 2026-04-21); iframe + direct portal methods confirmed via MS Learn ref-corporate-methods (2026-04-16). UI steps cannot be live-verified without authentication. | MEDIUM — portal steps sourced from authoritative docs, cannot be screen-verified | Per D-27: executor re-verifies portal-specific step descriptions at execute time. Include inline `<!-- verify UI at execute time -->` comments in portal step prose. |
| Enrollment token 90-day maximum | MEDIUM (community only; not in MS Learn) | MS Learn `setup-fully-managed` and `setup-dedicated` both document token expiry "up to 65 years." No 90-day cap for GMS tokens. 90-day cap is AOSP-specific (FEATURES.md research). Community sources were conflating AOSP and GMS token types. | RESOLVED: 90-day = AOSP-specific only; GMS tokens = 65-year max (HIGH confidence) | Per D-28: omit 90-day claim from Phase 35 docs. State GMS token expiry as "up to 65 years" (HIGH confidence). AOSP 90-day max documented in Phase 39 AOSP stub only. |
| DPC extras JSON schema | MEDIUM (verify before plan) | Exact schema verified HIGH via MS Learn `ref-corporate-methods` (2026-04-16): four fields confirmed with exact values including package name `com.google.android.apps.work.clouddpc` and the four-field JSON structure. | HIGH — exact schema from MS Learn (updated 2025-12-04) | Use verified schema in D-20 skeleton. Executor verifies that the checksum value has not changed between plan-time and execute-time. |
| `endpoint.microsoft.com` portal requirement | MEDIUM (confirm redirect behavior) | MS Learn `connect-managed-google-play` uses the link `go.microsoft.com/fwlink/?linkid=2109431` which is the Microsoft Intune admin center deep link. The distinction documented in research is about `intune.microsoft.com` (old branding) vs `endpoint.microsoft.com` (current portal URL). Both redirect to the same admin center. The binding itself starts at the correct portal regardless of which URL the admin uses; the what-breaks concern is about browser confusion / security zone mismatch during the Google redirect, not about portal access per se. | HIGH — verified that `endpoint.microsoft.com` is the current admin center URL; the portal redirect concern is browser security zone configuration (documented as MS Learn tip, not a hard failure) | Document both the URL preference (`endpoint.microsoft.com`) and the browser security zone tip from MS Learn. |

---

## Android 12+ Corporate Identifier Behavior

**Source:** MS Learn `add-corporate-identifiers` (updated 2025-04-11; fetched 2026-04-19)

**Exact behavior (HIGH confidence):**
- Google removed IMEI/serial/MEID read access from personally-owned work profile devices in Android 12
- Corporate identifiers uploaded via CSV for pre-marking BYOD WP devices ONLY work on Android 11 and earlier
- COBO, COSU, COPE, AOSP, ZTE, and KME all automatically assign corporate ownership at enrollment — no pre-upload needed for these modes
- Asset tag (user-provided custom string) still works for Android 12+ personally-owned WP devices — this is the available fallback

**What still works on Android 12+:**
- Corporate identifiers for COBO/COSU/COPE auto-marking (not affected — these modes auto-mark)
- Asset tag (custom identifier uploaded by admin) — not hardware-derived, so no Android OS restriction applies
- IMEI/serial for devices enrolled via COBO/COSU/COPE — corporate ownership is automatic, identifier pre-upload is unnecessary

**Admin consequence for `01-android-prerequisites.md`:**
- State: "Starting with Android 12, IMEI and serial number are no longer accessible for pre-marking personally-owned work profile devices as corporate. Admins who relied on identifier upload for BYOD WP pre-marking must use asset tags or accept that Android 12+ BYOD WP devices will show as Personal ownership until enrollment completes."
- Link to `docs/android-lifecycle/03-android-version-matrix.md#android-12-corporate-identifiers` for the canonical version-gate detail (per D-03)

---

## Anchor Namespace Contract

### Phase 35 Reserved Anchors

These anchors are reserved by Phase 35 and consumed by downstream phases (36–42). Renaming or removing them breaks downstream cross-references.

**`docs/android-lifecycle/01-android-prerequisites.md`** (D-05):
- `#tri-portal-surface`
- `#gms-vs-aosp-split`
- `#android-12-corporate-identifiers`
- `#portal-dependencies-by-mode`

**`docs/admin-setup-android/00-overview.md`** (D-11):
- `#choose-your-mode`
- `#gms-path-prerequisites`
- `#zte-path-prerequisites`
- `#aosp-path-prerequisites`
- `#portal-navigation-note`

**`docs/admin-setup-android/01-managed-google-play.md`** (D-17):
- `#prerequisites`
- `#account-types`
- `#bind-mgp`
- `#what-breaks`
- `#disconnect-consequences`
- `#renewal-maintenance`

**`docs/admin-setup-android/02-zero-touch-portal.md`** (D-23):
- `#prerequisites`
- `#step-0-reseller`
- `#create-zt-account`
- `#dpc-extras-json`
- `#link-zt-to-intune`
- `#kme-zt-mutual-exclusion`
- `#renewal-maintenance`

### Phase 39 Future Anchors (must NOT collide with Phase 35)

These anchors are reserved for Phase 39 extensions to `02-zero-touch-portal.md`:
- `#device-claim-workflow`
- `#profile-assignment`
- `#dual-sim-imei-1`
- `#reseller-upload-handoff`

No Phase 35 content should use these anchor names.

### Collision Check

All Phase 35 anchors are distinct from all Phase 39 reserved anchors. No collision detected. [VERIFIED: manual review]

---

## Dependencies and Build Order

### Within Phase 35

**Dependency graph:**
```
01-android-prerequisites.md     (no Phase 35 internal dependencies)
        |
        v (links to, but does not gate)
00-overview.md                  (no Phase 35 internal dependencies)
        |
        v (links to, but does not gate)
01-managed-google-play.md       (no Phase 35 internal dependencies)
        |
        v (links to)
02-zero-touch-portal.md         (no Phase 35 internal dependencies)
```

All four Phase 35 docs reference each other via cross-links but none **structurally depends** on another Phase 35 doc being written first. All four can be authored in parallel after:

1. Phase 34 deliverables exist (especially `_templates/admin-template-android.md` for the admin guides and `_glossary-android.md` for term anchors, and `03-android-version-matrix.md` for the IMEI assertion cross-reference)
2. The `docs/admin-setup-android/` directory has been created

**Recommended safe build order within Phase 35:**
1. Wave 1: `01-android-prerequisites.md` + `00-overview.md` (concept/navigation docs; no admin template dependency in the strict sense, though overview should follow the admin template pattern)
2. Wave 2: `01-managed-google-play.md` + `02-zero-touch-portal.md` (admin guides; require admin template structure)

This mirrors the Phase 34 two-wave structure (Wave 1 = conceptual/reference, Wave 2 = procedural/template-driven).

### Cross-Document Links Within Phase 35

| From | To | Type | Notes |
|------|----|------|-------|
| `01-android-prerequisites.md` | `01-managed-google-play.md` | Forward reference | "For MGP binding mechanics, see..." |
| `01-android-prerequisites.md` | `02-zero-touch-portal.md` | Forward reference | "For ZT portal configuration, see..." |
| `01-android-prerequisites.md` | `03-android-version-matrix.md` (Phase 34) | Cross-reference | IMEI/serial assertion — link, do not restate |
| `01-android-prerequisites.md` | `02-provisioning-methods.md` (Phase 34) | Cross-reference | Method-mode reference |
| `01-android-prerequisites.md` | `_glossary-android.md` (Phase 34) | Cross-reference | MGP, ZTE, DPC anchors |
| `00-overview.md` | `01-managed-google-play.md` | Path link | COBO/BYOD WP/Dedicated/ZTE path all pass through MGP |
| `00-overview.md` | `02-zero-touch-portal.md` | Path link | ZTE path also requires ZT portal |
| `01-managed-google-play.md` | `03-android-version-matrix.md` (Phase 34) | Cross-reference | Version context for Android 12+ IMEI notes |
| `01-managed-google-play.md` | `_glossary-android.md#mgp` | Cross-reference | First full-name appearance per doc |
| `02-zero-touch-portal.md` | `01-managed-google-play.md` | Prerequisite link | ZTE requires MGP binding first |
| `02-zero-touch-portal.md` | `_glossary-android.md#zero-touch-enrollment` | Cross-reference | First full-name appearance per doc |

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | File-system grep + markdown lint (no test runner required — documentation phase) |
| Config file | None — validation is bash/PowerShell greps and structural checks |
| Quick run command | `grep -rn "supervision" docs/android-lifecycle/01-android-prerequisites.md docs/admin-setup-android/` |
| Full suite command | See Validation Tests table below |

### Phase Requirements → Validation Test Map

| Req ID | Behavior | Test Type | Automated Command | Approach |
|--------|----------|-----------|-------------------|---------|
| AEPREQ-01 | `01-android-prerequisites.md` exists with four required anchors | Structural | `grep -c "tri-portal-surface\|gms-vs-aosp-split\|android-12-corporate-identifiers\|portal-dependencies-by-mode" docs/android-lifecycle/01-android-prerequisites.md` should return 4 | Grep for anchor presence |
| AEPREQ-02 | `00-overview.md` exists with mermaid block and five path sections | Structural | `grep -c "mermaid\|gms-path-prerequisites\|zte-path-prerequisites\|aosp-path-prerequisites\|portal-navigation-note" docs/admin-setup-android/00-overview.md` should return 5 | Grep for required elements |
| AEPREQ-03 | MGP doc what-breaks table exists, has required rows, has disconnect-consequences anchor | Content | `grep -c "what-breaks\|disconnect-consequences\|Wrong portal URL\|Google Workspace\|Binding disconnected" docs/admin-setup-android/01-managed-google-play.md` should return 5 | Grep for required table rows |
| AEPREQ-04 | ZT portal doc has Step 0 section, DPC extras JSON block, KME/ZT callout, and ZT-Intune linking section | Content | `grep -c "step-0-reseller\|dpc-extras-json\|kme-zt-mutual-exclusion\|link-zt-to-intune\|EXTRA_ENROLLMENT_TOKEN" docs/admin-setup-android/02-zero-touch-portal.md` should return 5 | Grep for required elements |
| AEAUDIT-04 | Zero "supervision" occurrences in Phase 35 docs as Android management term | Compliance | `grep -in "supervision" docs/android-lifecycle/01-android-prerequisites.md docs/admin-setup-android/` returns zero results | Grep guard |
| PITFALL 11 | No modifications to v1.0–v1.3 shared files | Guard | `git diff --name-only HEAD docs/_glossary-macos.md docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md` returns empty | Git diff guard |
| D-18/D-24 | All 4 Phase 35 docs have `platform: Android`, `last_verified`, `review_by` frontmatter | Frontmatter | `grep -l "platform: Android" docs/android-lifecycle/01-android-prerequisites.md docs/admin-setup-android/00-overview.md docs/admin-setup-android/01-managed-google-play.md docs/admin-setup-android/02-zero-touch-portal.md` returns 4 files | Grep for frontmatter keys |
| Anchor stability | All reserved anchors present (16 total across 4 docs) | Structural | Anchor presence grep per file (see Anchor Namespace Contract section) | Per-file anchor grep |

### Required-Element Checks (per CONTEXT specifics)

| Element | Location | Check |
|---------|----------|-------|
| What-breaks table (D-12) | `01-managed-google-play.md` | Pipe-table with "Downstream impact" column header present |
| Hybrid granularity (failure-mode rows) | `01-managed-google-play.md` | Rows for: wrong portal URL / Google Workspace account / binding disconnected / consumer Gmail post-Aug-2024 |
| Step 0 section (D-19) | `02-zero-touch-portal.md` | `## Step 0` heading present AND top-of-page blockquote with reseller text |
| Mermaid diagram (D-07) | `00-overview.md` | ` ```mermaid ` block present |
| DPC extras JSON block (D-20) | `02-zero-touch-portal.md` | ` ```json ` block containing `EXTRA_ENROLLMENT_TOKEN` |
| Fields reference table (D-20) | `02-zero-touch-portal.md` | Table with "Required" column present adjacent to JSON block |
| KME/ZT dual placement (D-21) | `02-zero-touch-portal.md` | Top-of-doc blockquote with KME/ZT content AND inline callout near `#link-zt-to-intune` |
| Account types subsection (D-13) | `01-managed-google-play.md` | `## Account types` (or `### Account types`) section present |
| Inline Entra reminder (D-13) | `01-managed-google-play.md` | One-line blockquote at account-selection step |
| concept-only guard | `01-android-prerequisites.md` | No numbered portal steps; no "In Intune admin center" H4 headings |

### Wave 0 Gaps

The following do not exist yet and must be created:
- [ ] `docs/admin-setup-android/` directory — Phase 35 creates this
- [ ] `docs/android-lifecycle/01-android-prerequisites.md` — Phase 35, Wave 1
- [ ] `docs/admin-setup-android/00-overview.md` — Phase 35, Wave 1
- [ ] `docs/admin-setup-android/01-managed-google-play.md` — Phase 35, Wave 2
- [ ] `docs/admin-setup-android/02-zero-touch-portal.md` — Phase 35, Wave 2
- [ ] Phase 34 deliverables must be present before Wave 2 can begin (especially `docs/_templates/admin-template-android.md`)

---

## Source Confidence by Deliverable

### `01-android-prerequisites.md` (AEPREQ-01)

| Claim | Source | Confidence |
|-------|--------|------------|
| Tri-portal surface (Intune + MGP + ZT portal) | MS Learn connect-managed-google-play + ref-corporate-methods (2026-04-16) | HIGH |
| GMS modes require MGP binding; AOSP does not | MS Learn enrollment guide (2024-04-23) | HIGH |
| ZTE additionally requires ZT portal | MS Learn ref-corporate-methods (2025-12-04) | HIGH |
| Android 12+ IMEI/serial removed from personally-owned WP corporate identifiers | MS Learn add-corporate-identifiers (2025-04-11) | HIGH |
| Asset tag still works on Android 12+ | MS Learn add-corporate-identifiers (2025-04-11) | HIGH |

### `00-overview.md` (AEPREQ-02)

| Claim | Source | Confidence |
|-------|--------|------------|
| Mermaid flowchart + path-split prerequisites pattern | docs/admin-setup-ios/00-overview.md (structural template, direct inspection) | HIGH |
| Five mode branches (COBO / BYOD WP / Dedicated / ZTE / AOSP) | MS Learn enrollment guide + Phase 34 CONTEXT | HIGH |
| COBO/BYOD WP/Dedicated depend on MGP; ZTE depends on MGP + ZT portal; AOSP depends on neither | MS Learn enrollment guide + FEATURES.md research | HIGH |
| `endpoint.microsoft.com` portal note | MS Learn connect-managed-google-play (link is `go.microsoft.com/fwlink/?linkid=2109431`) | HIGH |

### `01-managed-google-play.md` (AEPREQ-03)

| Claim | Source | Confidence |
|-------|--------|------------|
| Binding steps (exact portal path) | MS Learn connect-managed-google-play (2025-11-11; git 2026-04-16) | HIGH |
| Entra account preferred since August 2024 | MS Learn connect-managed-google-play "As of August 2024" note | HIGH |
| Four auto-provisioned apps (exact names and package IDs) | MS Learn connect-managed-google-play | HIGH |
| Consumer Gmail binding continues to work | MS Learn connect-managed-google-play "Current tenants who have already associated a Gmail account will continue to be supported" | HIGH |
| Google Workspace account fails | PITFALLS.md (2026-04-19) citing MS Learn and community | HIGH |
| Disconnect disables all AE device management | MS Learn connect-managed-google-play Disconnect section | HIGH |
| GMS enrollment tokens: up to 65 years | MS Learn setup-fully-managed + setup-dedicated (2025-05-08; git 2026-04-16) | HIGH |
| 90-day maximum claim: AOSP-specific only, NOT applicable to GMS tokens | MS Learn setup-fully-managed + setup-dedicated (no 90-day mentioned) | HIGH (absence verified) |
| Data sharing terms: Microsoft sends user/device info to Google | MS Learn connect-managed-google-play step 5 | HIGH |
| Browser security zone requirement (portal.azure.com / play.google.com / enterprise.google.com) | MS Learn connect-managed-google-play Tip | HIGH |

### `02-zero-touch-portal.md` (AEPREQ-04)

| Claim | Source | Confidence |
|-------|--------|------------|
| ZT portal URL: `enterprise.google.com/android/zero-touch/customers` | STACK.md research + MS Learn ref-corporate-methods | HIGH |
| ZT portal requires Google account login (cannot deep-link unauthenticated) | Verified redirect to accounts.google.com (WebFetch 2026-04-21) | HIGH |
| Portal sidebar: Configurations / Devices / Users / Resellers / Customer details | Google AE Help answer/7514005 (fetched 2026-04-21) | HIGH |
| Account creation: `accounts.google.com/signupwithoutgmail` using corporate email | Google AE Help answer/7514005 | HIGH |
| Reseller requirement: devices must be from authorized reseller; self-registration not supported | MS Learn ref-corporate-methods + Google AE Help answer/7514005 | HIGH |
| DPC extras JSON: four-field schema with exact field names and values | MS Learn ref-corporate-methods (2025-12-04; git 2026-04-16) | HIGH |
| DPC package: `com.google.android.apps.work.clouddpc` | MS Learn ref-corporate-methods | HIGH |
| Signature checksum: `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` | MS Learn ref-corporate-methods | HIGH (verify at execute time — fixed value but check for updates) |
| Iframe method creates Fully Managed default; Dedicated/COPE requires direct portal | MS Learn ref-corporate-methods Caution note | HIGH |
| KME/ZT mutual exclusion: device enrolls via KME if both configured | Google AE Help answer/7514005 + Samsung Knox docs | HIGH |
| Network dependency: device needs internet at first boot | Google AE Help answer/7514005 | HIGH |
| Single-org-to-account-link constraint | PITFALLS.md research (citing Google docs) | MEDIUM — not re-verified against current Google developers docs in this session |
| Devices deregistered from ZT cannot be re-registered without reseller | Google AE Help answer/7514005 | HIGH |
| ZT portal navigation steps (exact menu items) | Google AE Help answer/7514005 + MS Learn ref-corporate-methods iframe steps | MEDIUM — portal UI cannot be live-verified without authenticated access; D-27 requires executor re-verification |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Single-org-to-account-link constraint (one ZT account per org; unlinking makes account unrecoverable) | `02-zero-touch-portal.md` | Low — this is a documented Google constraint cited in PITFALLS.md research; risk is primarily that phrasing may not match current Google documentation exactly |
| A2 | ZT portal sidebar sections (Configurations / Devices / Users / Resellers / Customer details) have not been redesigned since Google AE Help was written | `02-zero-touch-portal.md` portal navigation prose | MEDIUM — portal has redesigned before; executor must re-verify per D-27; wrong section names cause admin confusion |
| A3 | The DPC extras JSON signature checksum value `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` remains current | `02-zero-touch-portal.md` DPC extras JSON | MEDIUM — fixed checksum value; if CloudDPC app is re-signed, this value would change; executor should verify against current MS Learn at write time |

---

## Open Questions

1. **Phase 34 completion timing**
   - What we know: Phase 34 is currently executing; `docs/_templates/admin-template-android.md` does not yet exist in the filesystem
   - What's unclear: Will Phase 34 be complete before Phase 35 planning runs, or will planning proceed with the template not yet available?
   - Recommendation: Wave 2 of Phase 35 (admin guides) must gate on Phase 34 admin template existence. Wave 1 (prerequisites doc + overview) can begin without the template.

2. **`endpoint.microsoft.com` vs `intune.microsoft.com` — exact failure mode**
   - What we know: MS Learn uses `go.microsoft.com/fwlink/?linkid=2109431` as the admin center link. The CONTEXT D-15 concern is documented but the exact failure mode (redirect loop vs no failure at all) is unclear from current MS Learn documentation alone. The browser security zone tip is the documented mitigation.
   - What's unclear: Does using `intune.microsoft.com` directly actually cause binding failure, or is this a historical concern that may no longer apply?
   - Recommendation: Document the preferred URL (`endpoint.microsoft.com`) and the browser security zone tip. Do not overstate the failure risk without current evidence; phrase as "If you encounter redirect issues during binding, ensure the three domains are in the same browser security zone."

3. **AOSP path prerequisites: Intune Plan 1 vs Plan 2/Suite**
   - What we know: STACK.md research notes that specialized AOSP devices may require Intune Plan 2 or Suite
   - What's unclear: Whether the `00-overview.md` AOSP-path prerequisites checklist should mention Plan 2/Suite as a potential requirement, or whether this is an AOSP stub (Phase 39) concern
   - Recommendation: The AOSP-path prerequisites checklist in `00-overview.md` should note "Verify licensing per device type — specialized AR/VR devices may require Intune Plan 2 or Suite" as a checklist item, with a link to Phase 39 AOSP stub.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 35 is documentation-only. No external tools, runtimes, databases, or CLI utilities required beyond text editor and git.

---

## Project Constraints (from CLAUDE.md)

The project is a Windows Autopilot Troubleshooter & Improvement Suite with three tiers: PowerShell, Python FastAPI backend, TypeScript React frontend. However, Phase 35 is part of the documentation suite (`docs/`) which follows v1.3-established documentation conventions, not the application code conventions. CLAUDE.md conventions relevant to Phase 35:

- Never commit `.env` file or credentials
- Security notes: all docs are public-facing guidance documents; no credentials in docs
- The `docs/` directory is not part of the PowerShell/Python/TypeScript application code — documentation phases (Phase 34–42) follow the established documentation patterns from `docs/_templates/`, `docs/admin-setup-ios/`, etc.

No application code constraints from CLAUDE.md apply to Phase 35 documentation authoring.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact on Phase 35 |
|--------------|------------------|--------------|---------------------|
| Gmail account required for MGP binding | Entra account preferred | August 2024 | D-13 account types table; "Entra preferred" as primary recommendation |
| SafetyNet attestation for compliance | Play Integrity Verdict | January 2025 (SafetyNet turned off) | No direct impact on Phase 35 (compliance is Phase 36+); mention exclusion in overview only if needed |
| Custom OMA-URI for BYOD Work Profile | AMAPI-based policy | April 2025 | No direct impact on Phase 35 (BYOD is Phase 37) |
| Dedicated/COBO enrollment tokens: historical 90-day community-documented maximum | Tokens: up to 65 years in the future | Updated in MS Learn (current) | Enrollment token 90-day claim is DEBUNKED for GMS tokens — do not include |
| `intune.microsoft.com` admin center URL | `endpoint.microsoft.com` | Admin center rebranding | D-15 requirement: use `endpoint.microsoft.com` throughout; document the Portal Navigation Note |
| afw#setup = DPC identifier (legacy terminology) | DPC identifier (`afw#setup`) — same thing, Google's preferred term is "DPC identifier" | AMAPI era | Phase 35 uses "DPC identifier (afw#setup)" per Phase 34 CONTEXT established convention |

---

## Sources

### Primary (HIGH confidence)
- MS Learn: `connect-managed-google-play` — fetched 2026-04-21 (updated 2025-11-11; git 2026-04-16) — MGP binding mechanics, Entra account preference, four auto-provisioned apps, disconnect consequences, browser security zone tip
- MS Learn: `ref-corporate-methods` — fetched 2026-04-21 (updated 2025-12-04; git 2026-04-16) — DPC extras JSON schema, ZT portal configuration, iframe vs direct portal methods, CA exclusion note
- MS Learn: `setup-fully-managed` — fetched 2026-04-21 (updated 2025-05-08; git 2026-04-16) — COBO enrollment profile, token types, token expiry (up to 65 years)
- MS Learn: `setup-dedicated` — fetched 2026-04-21 (updated 2025-05-08; git 2026-04-16) — Dedicated enrollment profile, token types, token expiry (up to 65 years)
- MS Learn: `add-corporate-identifiers` — (updated 2025-04-11; per prior research fetch 2026-04-19) — Android 12+ IMEI/serial removal for personally-owned WP
- Google AE Help: `answer/7514005` — fetched 2026-04-21 — ZT portal navigation, account creation, reseller requirements, KME/ZT mutual exclusion note, network requirements
- Direct filesystem inspection: `docs/admin-setup-ios/00-overview.md` — structural template for `00-overview.md` mermaid + prerequisites pattern
- Phase 34 CONTEXT.md + Phase 35 CONTEXT.md — locked decisions, structural requirements

### Secondary (MEDIUM confidence)
- Google AE Help (community portal): ZT portal sidebar sections (Configurations/Devices/Users/Resellers/Customer details) — Google-authoritative but UI may have been updated since documentation was written
- STACK.md research (2026-04-19) — consolidated portal URLs, token behavior, frontmatter conventions — verified against MS Learn at research time

### Tertiary (LOW confidence)
- Community sources for 90-day enrollment token maximum — SUPERSEDED by HIGH confidence MS Learn verification showing 65-year maximum for GMS tokens; 90-day confirmed as AOSP-specific only

---

## Metadata

**Confidence breakdown:**
- MGP binding mechanics: HIGH — verified against MS Learn 2026-04-16
- DPC extras JSON schema: HIGH — exact values from MS Learn ref-corporate-methods 2025-12-04
- ZT portal structure: HIGH (authoritative source) / MEDIUM (UI cannot be live-verified without authentication)
- Android 12+ corporate identifiers: HIGH — MS Learn 2025-04-11
- Enrollment token 90-day claim: RESOLVED — 90-day is AOSP-specific; GMS tokens = 65 years (HIGH confidence)
- ZT portal UI navigation steps: MEDIUM — executor must re-verify per D-27
- Single-org-to-account-link constraint: MEDIUM — cited in research but not re-verified in this session

**Research date:** 2026-04-21
**Valid until:** 2026-06-21 (60 days — Android portal UIs move quickly; ZT portal UI especially)
**Critical re-verify at execute time:** DPC extras JSON signature checksum; ZT portal sidebar section names and navigation paths

---

## RESEARCH COMPLETE
