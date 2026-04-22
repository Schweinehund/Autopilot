# Phase 37: BYOD Work Profile — Admin + End-User — Research

**Researched:** 2026-04-22
**Domain:** Android Enterprise BYOD Work Profile documentation — admin policy guide + end-user self-enrollment guide, post-AMAPI migration (April 2025)
**Confidence:** HIGH for core stack / MEDIUM for AMAPI web-enrollment specifics (opt-in phase, Q1 2026)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Phase 41 owns `docs/l2-runbooks/19-android-enrollment-investigation.md` in full. Phase 37 delivers only 2 files. Required correction of STATE.md line 75 + SUMMARY.md lines 201/208 + ROADMAP.md line 195 must be a task in PLAN.md.
- **D-02:** Required upstream artifact corrections listed in CONTEXT.md must land in a single commit during plan- or execute-phase.
- **D-03:** Canonical privacy boundary table in admin doc + plain-language summary (≤150 words or 2-col list) in end-user doc. Required rows: managed app inventory; device compliance state; work profile data; personal apps; personal data; personal call/SMS/browser history; device location outside work profile.
- **D-04:** Sync contract — Phase 42 audit greps for `work profile data`, `personal apps`, `personal data`, `device location` across both files.
- **D-05 (AMAPI callout structure):** Top banner (≤50 words) + dedicated `## AMAPI Migration (April 2025)` H2 (after Key Concepts, before Prerequisites) + inline reminders at Wi-Fi/OMA-URI/mgmt-app sections.
- **D-05b (data transfer table):** 6-row direction-specific table. Rows: clipboard work→personal; clipboard personal→work; contacts work→personal; contacts personal→work; calendar work→personal; calendar personal→work. Columns: Direction | Admin default | Recommended for BYOD | What breaks if misconfigured. Row-level `<a id="...">` anchors.
- **D-06 (mandatory anchors):** `#key-concepts`, `#amapi-migration`, `#enrollment-restrictions`, `#work-profile-policy`, `#privacy-boundary` — all mandatory and locked.
- **D-06a:** Company Portal primary path + web enrollment `### Web enrollment (alternative)` H3 sidebar (≤150 words) in end-user doc.
- **D-06b:** Top-5 error messages + helpdesk routing in `## If something goes wrong` section.
- **D-06c:** Text-first; no screenshots, no ASCII art, no emoji icons beyond ✓/✗.
- **D-06d:** "BYOD Work Profile (also known as 'personally-owned work profile' in Google terminology)" first use in each doc; shorthand thereafter.
- **D-07:** End-user guide shape: audience callout + overview + before you start + enrollment steps + privacy summary + if something goes wrong + admin sidebar. 800–1500 words.
- **D-08:** End-user frontmatter `audience: end-user` (NEW enum value).
- **D-09 (SC2 guardrail):** Admin sidebar in end-user doc MUST NOT contain Intune admin center navigation; executor runs grep self-check.
- **D-10:** Inline `[HIGH: MS Learn, last_verified 2026-04-22]` / `[MEDIUM: techcommunity, last_verified 2026-04-22]` markers on AMAPI-adjacent assertions.
- **D-11:** Regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` for Phase 42 audit.
- **D-12:** Admin doc shape — 14 H2 sections in locked order (frontmatter → platform gate → AMAPI banner → Key Concepts → AMAPI Migration → Prerequisites → Enrollment restrictions → Work profile policy → Data transfer controls → Privacy boundary → Wi-Fi policy → Management app → Renewal/Maintenance → For L1 helpdesk agents [optional]).
- **D-13:** End-user doc shape — 8 H2 sections in locked order.
- **D-14:** Admin doc 3000–4000 words; end-user doc 800–1500 words.
- **D-15:** Admin frontmatter: `audience: admin`; end-user: `audience: end-user`.
- **D-16:** Zero modifications to Phase 34/35/36 docs; zero modifications to v1.0–v1.3 shared files; zero modifications to `docs/android-lifecycle/`.
- **D-17..D-19:** Research-flag verification protocol; plan-time researcher verifies 6 flags; MEDIUM-confidence assertions carry inline markers.

### Claude's Discretion

- Exact word counts within D-14 ranges.
- Web enrollment sidebar placement: H3 within `## Enroll your device` vs `## Web enrollment (alternative)` H2.
- End-user audience callout exact phrasing.
- Whether admin doc includes a mermaid diagram of BYOD enrollment flow.
- Exact phrasing of `## For IT helpdesk agents` admin sidebar within D-09 guardrail.
- Ordering of rows within D-05b table.
- Whether admin doc includes optional `## For L1 helpdesk agents` H2 (D-12 item 14).
- Whether end-user "If something goes wrong" uses numbered list, bullets, or sub-H3.
- D-10 inline confidence marker prose surface within D-11 regex.

### Deferred Ideas (OUT OF SCOPE)

- L2 enrollment investigation runbook 19 (Phase 41).
- L1 runbook 23 "Work profile not created" (Phase 40).
- MGP binding mechanics (Phase 35).
- ZT portal mechanics (Phase 35).
- Provisioning-method matrix (Phase 34).
- Version matrix content (Phase 34).
- AOSP, Dedicated, COBO, ZTE mode content (Phases 36/38/39).
- Cross-platform nav integration: `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEBYOD-01 | Intune admin can configure BYOD Work Profile enrollment with enrollment restrictions, work profile policy, data transfer controls, and privacy boundary table | RF-1 minimum version, RF-5 policy blade navigation + 6 direction labels, RF-8 privacy boundary rows |
| AEBYOD-02 | End user can self-enroll via Company Portal with plain-language steps and "what IT can/cannot see" section — zero admin portal references | RF-2 web enrollment path, RF-4 management app end-user experience, RF-7 top-5 error messages |
| AEBYOD-03 | Admin can read AMAPI migration callout: OMA-URI removal, Wi-Fi cert-auth requirement, management app change | RF-2 AMAPI callout, RF-3 Wi-Fi cert specifics, RF-4 management app change, RF-9 terminology |
</phase_requirements>

---

## Summary

Phase 37 delivers two documentation files — an admin-side BYOD Work Profile policy guide and the first end-user self-enrollment guide in the documentation suite. The phase is uniquely shaped by three converging factors: the AMAPI migration (April 2025) changed the policy surface, the management app, and the enrollment method; the tier-inversion pattern (user-initiated enrollment) requires a dedicated end-user document rather than an admin-portal-first runbook; and the introduction of `docs/end-user-guides/` as a new documentation tier.

The six research flags mandated by D-17 have all been investigated. Key findings: (1) BYOD minimum version is Android 5.0 per Intune minimum, but practically Android 8+ is required, and the new AMAPI web enrollment path requires Android 10+; (2) web enrollment is available as opt-in as of Q1 2026 and will become the default for all new enrollments — it is documented in the TechCommunity blog but not yet as a standalone MS Learn article; (3) Wi-Fi certificate types for the personally-owned work profile are EAP-TLS, EAP-TTLS, and PEAP — username/password modes are still listed in the MS Learn Wi-Fi docs for personally-owned work profile BUT the TechCommunity AMAPI blog confirms they break on post-AMAPI devices; (4) post-AMAPI, the Microsoft Intune app replaces Company Portal as the primary management app, Android Device Policy installs hidden and enforces AMAPI policies, and Company Portal persists for MAM only; (5) the Intune admin center BYOD policy blade is confirmed at Devices > Enrollment > Android tab > Device platform restriction, and the data transfer settings are NOT 6 direction-specific rows but rather 3 settings with combined-direction semantics (D-05b's 6-row table design is a documentation choice that expands what Intune surfaces as 3 settings); (6) Entra-preferred MGP binding is confirmed current as of April 2026.

**Primary recommendation:** Write the admin doc to the D-12 14-section structure and source all AMAPI-affected assertions from the TechCommunity blog 4370417 (MEDIUM confidence marker) cross-referenced with the Phase 34 AMAPI glossary entry (VERIFIED). Apply D-10 inline markers throughout the AMAPI Migration H2 and all three inline reminder sections. For the data transfer table (D-05b), use the 3 existing Intune settings but expand to 6 logical rows by splitting clipboard and data-sharing settings into directional rows — making the documentation more precise than the Intune UI, which is an acceptable and defensible documentation choice (not a D-05b violation, since the intent is directional coverage, not 1:1 UI-label replication).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| BYOD enrollment restriction configuration | Intune admin center (backend policy) | — | Enrollment restriction is a tenant-level policy set in the Intune console before user interaction |
| Work profile policy (data transfer, clipboard) | Intune admin center (backend policy) | Device (enforcement) | Admin configures in Intune; Android OS enforces at profile boundary |
| Privacy boundary | OS-level (Android work profile partition) | Intune policy (what admin chooses to configure) | The CANNOT-see boundary is enforced by Android OS, not by admin policy choice |
| End-user enrollment flow | Personal device (user-initiated) | Intune backend (enrollment processing) | Tier-inversion: enrollment is user-side via Company Portal / web URL, not admin-portal-first |
| AMAPI policy enforcement | Android Device Policy (hidden app, device tier) | Intune backend (AMAPI commands) | AMAPI shifts enforcement from Company Portal DPC to Android Device Policy |
| Wi-Fi cert-auth | Intune admin center (SCEP/PKCS cert + Wi-Fi profile) | Device (WPA2 Enterprise auth) | Cert must be in the Intune policy, but authentication happens at device-to-AP level |
| Management app experience | Device (Microsoft Intune app, user-visible) | — | Post-AMAPI, Intune app is the user-facing management surface on the device |
| Privacy boundary canonical table | Documentation (admin guide) | Documentation (end-user guide plain-language) | Not a portal surface — a documentation artifact describing OS-enforced boundaries |

---

## Standard Stack

### Core (Phase 37 documentation targets)

| Target | What It Is | Source | Confidence |
|--------|-----------|--------|------------|
| `docs/admin-setup-android/04-byod-work-profile.md` | Admin BYOD policy guide (AEBYOD-01, AEBYOD-03) | Phase 37 deliverable | — |
| `docs/end-user-guides/android-work-profile-setup.md` | End-user enrollment guide (AEBYOD-02) | Phase 37 deliverable — NEW directory | — |
| Phase 36 precedent: `docs/admin-setup-android/03-fully-managed-cobo.md` | Structural precedent (11 HTML-id anchors, MEDIUM-conf markers, 3684 words) | [VERIFIED: file read, 2026-04-22] | HIGH |
| Phase 34 `docs/_glossary-android.md` | Cross-reference target (`#byod`, `#work-profile`, `#amapi`, `#managed-google-play`, `#play-integrity`, `#fully-managed`) | [VERIFIED: grep, 2026-04-22] | HIGH |
| Phase 35 `docs/admin-setup-android/01-managed-google-play.md` | MGP binding prerequisite — admin doc references `#bind-mgp`, `#account-types`, `#disconnect-consequences` | [VERIFIED: CONTEXT.md canonical refs, 2026-04-22] | HIGH |
| `docs/android-lifecycle/03-android-version-matrix.md` | BYOD version anchor `#byod` — authoritative minimum version source | [VERIFIED: file read, 2026-04-22] | HIGH |
| `docs/_templates/admin-template-android.md` | Admin template — ZT portal H4 OMITTED for BYOD via HTML-comment subtractive-deletion | [VERIFIED: file read, 2026-04-22] | HIGH |

### Supporting (referenced from the Phase 37 docs)

| Reference Target | What It Links To | Confidence |
|-----------------|-----------------|------------|
| Phase 36 `03-fully-managed-cobo.md` | Corporate-mode contrast for privacy boundary (fully managed = entire device vs BYOD = work profile partition only) | [VERIFIED: file exists + content confirmed, 2026-04-22] |
| Phase 34 `02-provisioning-methods.md` | BYOD row filtered-row link (Company Portal / web enrollment methods) | [VERIFIED: CONTEXT.md, 2026-04-22] |
| Phase 34 `00-enrollment-overview.md` | BYOD mode definition cross-reference | [VERIFIED: CONTEXT.md, 2026-04-22] |
| Intune admin center path for enrollment restrictions | Devices > Enrollment > Android tab > Device platform restriction | [VERIFIED: MS Learn setup-personal-work-profile, last_verified 2026-04-22] |
| TechCommunity blog 4370417 | AMAPI migration announcement — primary D-05 content source | [CITED: techcommunity.microsoft.com/blog/intunecustomersuccess/4370417] |

---

## Research Flag Findings

### RF-1: BYOD Android Minimum Version

**Finding:** Two-tier version story.

1. **Intune minimum OS:** Android 5.0 per REQUIREMENTS.md / FEATURES.md. Phase 34 `03-android-version-matrix.md` entry: `BYOD Work Profile | Android 5.0 (practical: Android 8+)`. [VERIFIED: file read, 2026-04-22]

2. **AMAPI path minimum:** The TechCommunity blog 4370417 states AMAPI enrollment "currently supports Android 10 and later" for personally owned work profile devices. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

3. **Practical current baseline:** Android 8+ is the practical Intune minimum for full policy support. Android 10+ is required for the new AMAPI enrollment path (web enrollment + Microsoft Intune app). Devices on Android 8-9 may continue using the legacy Company Portal path until mandatory AMAPI migration occurs.

**Recommendation for admin doc:** State `Android 8.0+ (practical minimum); Android 10+ required for AMAPI-path enrollment. See [03-android-version-matrix.md#byod](../android-lifecycle/03-android-version-matrix.md#byod) for the full minimum-OS record.` Do NOT restate the version number inline — reference the matrix per Anti-Pattern 1 guard. Apply `[MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]` to the Android 10+ AMAPI path assertion.

**Confidence:** HIGH for Android 5.0/8.0+ (MS Learn + version matrix). MEDIUM for Android 10+ AMAPI-path floor (TechCommunity blog only; MS Learn does not state this explicitly as of research date).

**Risk if wrong:** If the AMAPI path floor is lower than Android 10, the `## AMAPI Migration` section should not gate by Android version. Re-verify against MS Learn at execute time per D-18.

---

### RF-2: AMAPI Web Enrollment Path Documentation

**Finding:** Web enrollment exists and is documented, but is in opt-in phase as of Q1 2026 — not yet the default.

**Key facts:**

1. **What it is:** Web-based enrollment allows users to initiate BYOD work profile enrollment via a URL rather than installing Company Portal first. The TechCommunity blog describes three entry points: direct URL, productivity apps via conditional access redirect, or Company Portal. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

2. **URL format:** Jason Bayton's enrollment methods documentation describes the AMAPI BYOD enrollment URL format as `https://enterprise.google.com/android/enroll?et=<enrollmentToken>`. [MEDIUM: bayton.org/android/android-enterprise-provisioning-methods, last_verified 2026-04-22]

3. **Current status:** As of Q1 2026, web enrollment is available as an administrator opt-in. Mandatory migration for all tenants is planned but not yet dated ("advanced notice" promised). MS Learn BYOD enrollment docs (`setup-personal-work-profile`, updated 2026-04-16) still describe Company Portal as the primary enrollment method without mention of web enrollment. The TechCommunity blog 4370417 is currently the only authoritative source for web enrollment as first-class. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

4. **User flow for web enrollment:** User receives URL → browser opens enrollment page → authenticates with Entra credentials → work profile creation initiates at OS level → Microsoft Intune app installs automatically → Android Device Policy installs hidden. No manual app store search required. [MEDIUM: techcommunity blog 4370417 + bayton.org, last_verified 2026-04-22]

5. **PITFALL 8 compliance:** D-06a requires web enrollment to appear in the end-user doc (sidebar/H3). The "Company Portal is the only method" anti-pattern is explicitly identified in PITFALL 8 line 224. ✓ Research confirms both paths exist and must be documented.

**Recommendation for admin doc `## AMAPI Migration` section:** Include web enrollment availability as item (4) of the four AMAPI changes. State it is available as opt-in (Q1 2026) and will become mandatory with advance notice. Apply `[MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]` to all web enrollment assertions.

**Recommendation for end-user doc:** D-06a Company Portal primary path is correct for the majority of current deployments. Web enrollment sidebar (H3, ≤150 words) with framing "If your IT team has enabled web enrollment..." covers the post-AMAPI opt-in scenario without overstating its current prevalence.

**Confidence:** MEDIUM — TechCommunity blog is the primary source; MS Learn has not yet published a dedicated web enrollment article for Android BYOD.

**Plan-time re-verification:** Check `https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-work-profile-web-enrollment` at execute time — this URL returned 404 as of 2026-04-22, suggesting the dedicated article does not yet exist. Monitor TechCommunity blog 4370417 for updated timeline.

---

### RF-3: AMAPI Wi-Fi Certificate Authentication Specifics

**Finding:** Nuanced — the MS Learn Wi-Fi docs still show username/password as an option for personally owned work profile, but the AMAPI migration context clarifies that it breaks on post-AMAPI devices.

**Key facts from MS Learn Wi-Fi settings doc** (updated 2026-04-14, `ref-wifi-settings-android-enterprise`): [VERIFIED: MS Learn, last_verified 2026-04-22]

**For personally-owned work profile (BYOD), Enterprise Wi-Fi section:**

| EAP Type | Authentication Methods Available | Certificate Types |
|----------|----------------------------------|------------------|
| EAP-TLS | Derived credential OR Certificates (SCEP or PKCS) | SCEP, PKCS |
| EAP-TTLS | Username and Password (PAP/MS-CHAP/MS-CHAPv2) OR Certificates (SCEP or PKCS) | SCEP, PKCS |
| PEAP | Username and Password (MS-CHAPv2 or None) OR Certificates (SCEP or PKCS) | SCEP, PKCS |

**Critical note on username/password:** MS Learn still lists `Username and Password` as an EAP-TTLS and PEAP option for personally-owned work profile. However, the TechCommunity AMAPI migration blog states that devices using username/password Wi-Fi authentication "will lose access to corporate Wi-Fi until they sign in to the corporate Wi-Fi again" after migration. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

**Interpretation:** The MS Learn docs describe what Intune will *accept* as a policy configuration. The AMAPI migration blog describes what actually *works* on post-AMAPI enrolled devices. These are not contradictory — Intune may accept a username/password Wi-Fi profile, but post-AMAPI devices will fail to authenticate. The admin doc should document this gap explicitly.

**Certificate types supported:** EAP-TLS uses SCEP or PKCS client certificate. EAP-TTLS and PEAP with certificates also use SCEP or PKCS. Derived credential is available for EAP-TLS. [VERIFIED: MS Learn Wi-Fi settings, last_verified 2026-04-22]

**SAN requirement:** For user and device certificates on personally-owned work profile, the certificate's Subject Alternative Name (SAN) MUST include the user principal name (UPN). If UPN is absent from the SAN, the Wi-Fi profile deployment fails. [VERIFIED: MS Learn Wi-Fi settings, last_verified 2026-04-22]

**Recommendation for admin doc `## Wi-Fi policy (certificate authentication)` section:**
- State: "Post-AMAPI migration (April 2025), Wi-Fi profiles using username/password authentication (EAP-TTLS with PAP/MS-CHAP, or PEAP with MS-CHAPv2) are not reliable on BYOD work profile devices. Use certificate-based authentication: EAP-TLS with SCEP or PKCS client certificate is the recommended configuration." [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]
- Include SAN/UPN requirement as a callout (HIGH confidence from MS Learn).
- Supported cert types: SCEP or PKCS. Derived credential is available for EAP-TLS.
- Inline AMAPI reminder per D-05: `> See [#amapi-migration](#amapi-migration) — Wi-Fi username/password authentication is not reliable on post-April 2025 enrolled devices.`

**Confidence:** HIGH for EAP types and cert types (MS Learn). MEDIUM for the "username/password breaks" assertion (techcommunity blog).

---

### RF-4: Management App Change — End-User Experience

**Finding:** Three-app picture; Microsoft Intune app is the new primary management surface for BYOD.

**Key facts:**

| App | Role Post-AMAPI | Visible to User |
|-----|----------------|-----------------|
| **Microsoft Intune app** | Primary management UI: manage device, contact IT, collect logs | Yes — installs automatically during enrollment |
| **Company Portal** | MAM (app protection policies) only | Yes — remains installed for MAM |
| **Android Device Policy** | Enforces AMAPI policies at OS level | Hidden — installed but not visible in app list |

Source: [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]; app role description confirmed by MS Learn connect-managed-google-play (updated 2026-04-16): "Intune Company Portal — Used with Android Enterprise work profile scenarios on personal devices and Intune app protection policies." [VERIFIED: MS Learn connect-managed-google-play, last_verified 2026-04-22]

**Enrollment flow with AMAPI (web enrollment path):**
1. User accesses enrollment URL or receives conditional access redirect.
2. Browser opens enrollment page; user authenticates with Entra credentials.
3. Work profile creation initiates at OS level.
4. Microsoft Intune app installs automatically in work profile.
5. Android Device Policy installs in hidden state (user does not see it).
6. Company Portal also installs (for MAM purposes).
7. Work profile is active; work apps appear with briefcase badge.
[MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

**Enrollment flow (legacy Company Portal path — still current pre-AMAPI-opt-in):**
1. User opens Google Play Store on personal device (personal profile side).
2. Installs Company Portal (`com.microsoft.windowsintune.companyportal`).
3. Opens Company Portal, signs in with Entra work credentials.
4. On Company Access Setup screen, taps BEGIN.
5. Reviews privacy information, accepts terms.
6. Work profile creates; user taps Next.
7. Device registers; user signs in with work account if prompted.
8. Update device settings if required; taps DONE.
[VERIFIED: MS Learn user-help/enrollment/enroll-work-profile-android, last_verified 2026-04-22]

**Key nuances for end-user doc:**
- User will see both Company Portal AND Microsoft Intune app installed after enrollment. This can cause confusion — doc should clarify: "You may see two management apps: **Company Portal** (for work apps) and **Microsoft Intune** (for device management contact)."
- Android Device Policy is intentionally hidden. Users should NOT be instructed to interact with it.
- Post-enrollment, users manage their enrollment via the Microsoft Intune app, not Company Portal. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]
- Legacy Company Portal path produces Company Portal as the primary management UI (pre-AMAPI opt-in). Document the Company Portal path as primary, note Microsoft Intune app as the post-AMAPI management app.

**Recommendation for admin doc `## Management app` section:** Table showing old vs new management app, per D-10 format. Inline AMAPI reminder.

**Recommendation for end-user doc enrollment steps:** Use Company Portal path as primary (steps are from current MS Learn end-user docs, HIGH confidence). Add parenthetical clarification about the two apps post-enrollment.

**Confidence:** HIGH for Company Portal legacy path (MS Learn user-help docs). MEDIUM for Microsoft Intune app as post-AMAPI primary app (techcommunity blog + MGP connect docs cross-reference).

---

### RF-5: Intune Admin Center BYOD Policy Blade Navigation + Data Transfer Setting Labels

**Finding:** Navigation confirmed. Data transfer settings are NOT 6 direction-specific rows in the Intune UI — they are 3 settings. D-05b's 6-row table expands these 3 settings into directional rows for documentation precision.

**Admin center path for enrollment restrictions:** [VERIFIED: MS Learn setup-personal-work-profile, last_verified 2026-04-22]
```
Devices > Enrollment > Android tab > Device platform restriction
  → Android restrictions tab
  → Create restriction
  → Platform settings: Android Enterprise (work profile)
    → Platform: Allow/Block
    → Personally owned: Allow/Block
```

**Admin center path for work profile policy (device restrictions):** [ASSUMED — not explicitly verified in a single MS Learn page; navigation pattern consistent with device-restrictions-android-for-work]
```
Devices > Configuration > Create > Android Enterprise > Device restrictions > Personally owned work profile
```

**Exact UI setting labels for data transfer** (from `device-restrictions-android-for-work`, personally-owned tab): [VERIFIED: MS Learn, last_verified 2026-04-22]

| Intune UI Label | Intune Options | D-05b Row Mapping |
|----------------|---------------|-------------------|
| **Copy and paste between work and personal profiles** | Block / Not configured (default: allowed) | Clipboard work→personal AND clipboard personal→work (bidirectional single toggle) |
| **Data sharing between work and personal profiles** | Device default (work→personal blocked; personal→work allowed) / Apps in work profile can handle sharing request from personal profile / No restrictions on sharing | Contacts work→personal AND contacts personal→work AND calendar-adjacent data |
| **Display work contact caller-id in personal profile** | Block / Not configured (default: shows caller ID) | Contacts work→personal (caller ID sub-case) |
| **Search work contacts from personal profile** | Block / Not configured (default: allowed) | Contacts personal→work direction |
| **Contact sharing via Bluetooth** | Enable / Not configured | Contacts work→personal (Bluetooth sub-case) |

**Critical finding for D-05b table design:** There is no separate "calendar" data transfer setting in the Intune UI for personally-owned work profile. Calendar data is covered implicitly by the "Data sharing between work and personal profiles" setting. The D-05b 6-row table must note this for calendar rows: "Calendar data transfer is governed by the **Data sharing between work and personal profiles** setting. No separate calendar-direction toggle exists in the BYOD work profile policy."

**Recommended D-05b table approach:** Use all 6 rows as specified by D-05b but annotate the Intune UI label accurately:

| Direction | Intune Setting | Admin default | Recommended | What breaks |
|-----------|---------------|--------------|-------------|-------------|
| Clipboard: work → personal | "Copy and paste between work and personal profiles" (Block applies to both directions) | Not configured (allowed) | Block | Users cannot copy from work app to personal app |
| Clipboard: personal → work | (same setting — bidirectional) | Not configured (allowed) | Block | Users cannot paste personal content into work apps |
| Contacts: work → personal | "Display work contact caller-id in personal profile" + "Data sharing" setting | Not configured (caller ID shown) | Block caller ID; Block data sharing | Work contacts visible in personal apps if not blocked |
| Contacts: personal → work | "Search work contacts from personal profile" | Not configured (search allowed) | Admin discretion | Personal contacts may appear in work search results |
| Calendar: work → personal | "Data sharing between work and personal profiles" (governs calendar) | Device default (work→personal blocked) | Keep device default | Calendar events accessible from personal apps |
| Calendar: personal → work | (same data sharing setting) | Device default (personal→work allowed) | Admin discretion | Personal calendar may appear in work apps |

**Confidence:** HIGH for setting labels (MS Learn device-restrictions-android-for-work verified). MEDIUM for "no separate calendar toggle" (confirmed by thorough scan of personally-owned work profile settings — no calendar-specific row found). [VERIFIED: MS Learn device-restrictions-android-for-work, last_verified 2026-04-22]

---

### RF-6: Entra-Preferred MGP Binding — Still Current

**Finding:** CONFIRMED current. Entra account preference is explicitly documented in the current MS Learn MGP binding doc. [VERIFIED: MS Learn connect-managed-google-play (updated 2026-04-16), last_verified 2026-04-22]

**Current doc quote:** "As of August 2024, you can link your Microsoft Entra account to a Google account, instead of using an enterprise Gmail account. We recommend using your Microsoft Entra account to connect to Google Play."

**Additional detail:** Existing Gmail-bound tenants continue to be supported. The admin can optionally upgrade a Gmail-bound tenant to an Entra-linked tenant via the "Upgrade" button in the Intune admin center (Devices > Enrollment > Android > Managed Google Play). [VERIFIED: MS Learn connect-managed-google-play, last_verified 2026-04-22]

**Recommendation for admin doc Prerequisites section:** Reference Phase 35 `01-managed-google-play.md#account-types` (which carries the full binding table). The admin doc should state: "MGP binding must be complete. Use your Microsoft Entra account (preferred since August 2024). See [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp)." `[HIGH: MS Learn connect-managed-google-play, last_verified 2026-04-22]`

**Confidence:** HIGH. Multiple MS Learn sources confirm this.

---

### RF-7: Top-5 End-User-Observable Error Messages During BYOD Enrollment

**Finding:** MS Learn troubleshoot-android-enrollment (updated 2026-04-17) is sparse on user-visible error text — it focuses on admin-observable issues. End-user-visible error messages are primarily found in MS Learn user-help docs, Q&A forums, and PITFALL 6 context. Sourcing requires MEDIUM or LOW confidence for most items.

**Best available top-5 list** (compiled from MS Learn troubleshoot-android-enrollment + Q&A community + PITFALL 6):

1. **"Can't create work profile"** (user sees this in Company Portal or device settings)
   - **What this means:** The device already has a work profile, or the OEM doesn't support work profiles, or storage is insufficient.
   - **Helpdesk tell:** "Go to Settings > Passwords & Accounts > Work and check if a work profile already exists. If yes, remove it and retry. Tell your helpdesk the device make and model."
   - Source: [VERIFIED: MS Learn troubleshoot-android-enrollment, last_verified 2026-04-22]

2. **"Your device doesn't meet your organization's security requirements"** (compliance not met)
   - **What this means:** The device failed a compliance policy check — usually PIN not set, OS version too old, or Play Integrity verdict insufficient.
   - **Helpdesk tell:** "Screenshot the screen. Tell your helpdesk the error code if visible at the bottom."
   - Source: [MEDIUM: community reports + MS Learn compliance docs, last_verified 2026-04-22]

3. **"Enrollment is blocked"** or "This device is not allowed to enroll" (enrollment restriction hit)
   - **What this means:** The admin has blocked personal devices from enrolling, or the work profile enrollment is blocked in the enrollment restriction policy.
   - **Helpdesk tell:** "Your name, email address, and device model. You cannot complete enrollment without your IT team making a change."
   - Source: [MEDIUM: MS Learn setup-personal-work-profile + Q&A, last_verified 2026-04-22]

4. **"Sign in" prompt loop or "We couldn't sign you in"** (Conditional Access block or Edge sign-in diversion)
   - **What this means:** A CA policy is intercepting the enrollment sign-in, or Microsoft Edge prompted for sign-in and diverted the enrollment flow.
   - **Helpdesk tell:** "What app showed the error (Company Portal or Edge). Your username. Whether you could proceed past the screen."
   - Source: [VERIFIED: MS Learn troubleshoot-android-enrollment (Duo section) + CA context, last_verified 2026-04-22]

5. **"Waiting for your device to be set up" or enrollment stuck on "Installing required apps"**
   - **What this means:** App installation from Managed Google Play is taking longer than expected, or GMS connectivity is slow/blocked.
   - **Helpdesk tell:** "How long you've waited. Whether you're on corporate Wi-Fi or personal data. Your device model."
   - Source: [MEDIUM: MS Learn Q&A community reports, last_verified 2026-04-22]

**Caveat:** MS Learn does not provide a canonical "top 5 BYOD enrollment errors" list. These five are synthesized from the troubleshoot guide and community Q&A — items 2, 3, and 5 are MEDIUM confidence. The planner should note in PLAN.md that the executor should verify against current MS Learn troubleshoot-android-enrollment at execute time.

**Confidence for error list:** HIGH for item 1 (MS Learn explicit). MEDIUM for items 2–5.

---

### RF-8: Privacy Boundary Canonical Row Set

**Finding:** Well-sourced from Google Android Enterprise Help (authoritative for personal-partition privacy) and MS Learn BYOD features documentation.

**Admin CAN see/control (work profile and device level):** [VERIFIED: MS Learn FEATURES.md mode 3 + MS Learn MAM vs work profiles, last_verified 2026-04-22]

| Category | Admin CAN See | Mechanism |
|----------|--------------|-----------|
| Managed app inventory | Work profile apps only (not personal side) | Android OS restricts app inventory to managed profile |
| Device compliance state | Yes — full compliance evaluation | MDM compliance policy |
| Work profile data | Yes — work app data, configuration, certificates | MDM policy scope |
| Device hardware info | Model, OS version, serial number, IMEI (device-level — unlike iOS UE) | MDM device inventory |
| Enrollment status | Yes | MDM enrollment record |
| Remote work profile wipe | Yes — removes work profile only (leaves personal intact) | MDM action |
| Device-level PIN enforcement | Can require a PIN, cannot read the PIN | MDM compliance |

**Admin CANNOT see (personal profile, OS-enforced boundary):** [VERIFIED: Google Android Enterprise Help (support.google.com/work/android/answer/9563584) + MS Learn mode 3 BYOD, last_verified 2026-04-22]

| Category | Admin CANNOT See | Why |
|----------|-----------------|-----|
| Personal app list | Not visible | Android OS prevents cross-profile app inventory |
| Personal data (photos, documents) | Not accessible | Personal profile partition isolation |
| Personal call / SMS / browser history | Not accessible | Personal profile partition isolation |
| Device location (beyond work profile) | Cannot track via MDM | MDM location commands scoped to enrolled profile only |
| Personal contacts | Cannot inventory | Personal profile isolation |
| Personal calendar | Cannot see | Personal profile isolation |

**Post-April-2025 changes to privacy boundary:** No material changes to the personal-partition privacy model found. The AMAPI migration changed the management app and policy surface but did not expand admin visibility into the personal profile. [MEDIUM: research scan; no authoritative source explicitly confirms unchanged-post-AMAPI privacy model, last_verified 2026-04-22]

**Android 15 note:** Private space (Android 15) is treated as personal profile — Intune does not manage private space. [VERIFIED: MS Learn setup-personal-work-profile Limitations section, last_verified 2026-04-22]

**Recommendation:** Admin doc canonical table requires minimum 7 rows per D-03. Rows for managed app inventory, device compliance state, work profile data, personal apps, personal data, personal call/SMS/browser history, device location. D-04 sync contract requires 4 keyword-presence grep targets: `work profile data`, `personal apps`, `personal data`, `device location`.

**Confidence:** HIGH for personal-profile-cannot-see rows (Google AE Help + MS Learn BYOD mode). HIGH for can-see rows (MS Learn MDM capabilities).

---

### RF-9: Microsoft Intune App Terminology Standardization

**Finding:** Four apps are relevant; nomenclature is now clear and consistent across sources.

| App Name | Google Play ID | Role | Context |
|----------|---------------|------|---------|
| **Microsoft Intune** (also "Microsoft Intune app") | `com.microsoft.intune` | Primary management UI for BYOD post-AMAPI: device management, IT contact, log collection | Post-AMAPI primary |
| **Company Portal** (also "Intune Company Portal") | `com.microsoft.windowsintune.companyportal` | Legacy BYOD DPC (pre-AMAPI); post-AMAPI: MAM app protection policies only | MAM-only post-AMAPI |
| **Android Device Policy** | Google-managed | Enforces AMAPI policies; hidden from user app list; not user-interactive | Policy enforcement (hidden) |
| **Microsoft Authenticator** | `com.azure.authenticator` | MFA during enrollment; Entra shared device mode | Supporting |

Source: [VERIFIED: MS Learn connect-managed-google-play app list (updated 2026-04-16); MEDIUM: techcommunity blog 4370417 for post-AMAPI role distinction, last_verified 2026-04-22]

**Do NOT use:**
- "Intune Company Portal app" as a shorthand that implies device management post-AMAPI — Company Portal is MAM-only post-AMAPI.
- "Android Device Policy" as a user-visible app — it is hidden.
- "Microsoft Intune app" to refer to Company Portal — these are distinct apps.

**Correct usage in Phase 37 docs:**
- Admin doc `## Management app` section: "Prior to April 2025 AMAPI migration, Company Portal (`com.microsoft.windowsintune.companyportal`) was the primary BYOD management app. Post-AMAPI, the Microsoft Intune app (`com.microsoft.intune`) is the primary management surface. Company Portal remains installed for MAM purposes. Android Device Policy installs in hidden state and is not user-interactive." Apply `[MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]` to role-change assertions.
- End-user doc: "You will see two apps: **Company Portal** and **Microsoft Intune**. Use Company Portal to access work apps. Use **Microsoft Intune** if your IT team asks you to contact support or collect logs."

**Confidence:** HIGH for app names and Play IDs (MS Learn). MEDIUM for post-AMAPI role split (techcommunity blog).

---

## Architecture Patterns

### System Architecture Diagram

```
Personal Device (user-owned)
    |
    |--- [Personal profile: untouched by IT]
    |       - Personal apps, data, contacts, calendar, browser history
    |       - Photos, SMS, call logs
    |       - Device location (personal side)
    |
    |--- [Work profile: Intune-managed container]
    |       - Badged work apps (briefcase icon)
    |       - Work data (isolated from personal)
    |       - Microsoft Intune app (post-AMAPI: management UI)
    |       - Company Portal (MAM purposes)
    |       - Android Device Policy (hidden: AMAPI enforcement)
    |
    |--- [Device level: visible to IT]
            - Model, OS version, serial, IMEI
            - Compliance state
            - Enrollment status

Enrollment trigger (user-initiated — tier inversion):
  Option A (legacy/primary): Company Portal → Google Play → install → sign in → work profile creates
  Option B (web enrollment, Q1 2026 opt-in): URL → browser → Entra auth → work profile creates automatically

                    ↕ AMAPI commands
Microsoft Intune admin center
    |
    |--- Enrollment restrictions (block personal Android; allow BYOD work profile)
    |--- Work profile policy (data transfer, clipboard, contacts, display)
    |--- Data transfer controls (6 logical directions via 3 settings)
    |--- Privacy boundary (admin can only see/act on work profile side)
    |--- Wi-Fi policy (SCEP/PKCS cert → EAP-TLS recommended)
    |--- Compliance policy (device compliance evaluation)
    |
    |--- MGP binding (Phase 35 prerequisite)
            - Microsoft Intune app distributed automatically post-binding
            - Company Portal distributed automatically post-binding
            - Android Device Policy: Google-managed
```

### Recommended File Locations

```
docs/
├── admin-setup-android/
│   └── 04-byod-work-profile.md       # NEW (AEBYOD-01, AEBYOD-03)
└── end-user-guides/                  # NEW DIRECTORY
    └── android-work-profile-setup.md # NEW (AEBYOD-02)
```

### Anti-Patterns to Avoid

- **Anti-Pattern 1 (matrix duplication):** BYOD admin doc must NOT restate the provisioning-method matrix or version matrix inline. Use filtered-row link patterns: `see [03-android-version-matrix.md#byod](...)`.
- **Anti-Pattern 2 (Company Portal-only BYOD path):** PITFALL 8 warning sign — end-user doc must include web enrollment sidebar. Not documenting web enrollment violates the post-AMAPI guard.
- **Anti-Pattern 3 (tier-inversion collapse):** Do NOT write the end-user doc in L1 runbook format (Step 1: Navigate to Intune admin center...). End-user doc must use plain-language personal-device steps only.
- **Anti-Pattern 4 (SC2 Intune nav leak):** The `## For IT helpdesk agents` section in the end-user doc must not contain "Devices >" navigation steps. Grep self-check required per D-09.
- **Anti-Pattern 5 (supervision terminology):** Do not use "supervised" to describe BYOD Work Profile management. No Android analog to iOS supervision exists.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Version minimum tracking | Inline version numbers in admin doc | Link to `03-android-version-matrix.md#byod` | Anti-Pattern 1 — single-source of truth for version data |
| MGP binding instructions | Repeat MGP binding steps | Reference `01-managed-google-play.md#bind-mgp` | Anti-Pattern 1 — Phase 35 owns binding mechanics |
| Privacy boundary table rows | Invent privacy claims | Use RF-8 verified row set from Google AE Help + MS Learn | Privacy claims have legal weight; use only sourced rows |
| Wi-Fi policy configuration walkthrough | Build detailed Wi-Fi setup guide | Use inline callout referencing MS Learn Wi-Fi settings + `#amapi-migration` reminder | Wi-Fi settings surface is wide; admin doc states the requirement and links to MS Learn for full reference |
| AMAPI migration history | Original narrative | Reference techcommunity blog 4370417 | MEDIUM confidence on AMAPI specifics; source citation is required |

---

## Common Pitfalls

### Pitfall A: AMAPI Timeline Confusion

**What goes wrong:** Writing as if AMAPI migration is completed and mandatory for all tenants. As of 2026-04-22, AMAPI web enrollment is opt-in (Q1 2026), not mandatory. Legacy Company Portal enrollment is still the current default.

**Why it happens:** TechCommunity blog headline reads like a migration that already happened. Custom OMA-URI profiles DID end in April 2025. Web enrollment is still opt-in.

**How to avoid:** Distinguish two separate AMAPI events: (A) custom OMA-URI profile end-of-support (April 2025 — completed, mandatory) and (B) web enrollment / Microsoft Intune app as default (Q1 2026 opt-in — in progress). Both are part of the AMAPI migration but on different timelines.

**Marker guidance:** Apply `[MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]` to web enrollment and management app change assertions. Apply `[HIGH: MS Learn custom-profiles-ending, last_verified 2026-04-22]` to the OMA-URI removal assertion.

### Pitfall B: Calendar Direction Not a Separate Setting

**What goes wrong:** The D-05b 6-row table implies 6 separate Intune settings. Intune has no dedicated "calendar work→personal" setting. Calendar data falls under "Data sharing between work and personal profiles".

**How to avoid:** In the D-05b table, annotate calendar rows with: "Governed by the **Data sharing between work and personal profiles** setting (no separate calendar toggle in the BYOD work profile policy)." This preserves the D-05b 6-row structure (which is a documentation design choice for completeness) while being accurate about what's in the Intune UI.

### Pitfall C: Wi-Fi Username/Password Documentation

**What goes wrong:** MS Learn Wi-Fi docs show Username and Password as valid for EAP-TTLS and PEAP on personally-owned work profile. If the admin doc reflects only MS Learn without AMAPI context, it will describe a broken configuration as valid.

**How to avoid:** State: "While the Intune policy editor accepts username/password EAP-TTLS and PEAP profiles for BYOD, devices migrated to AMAPI (April 2025) may lose Wi-Fi access until reconnecting manually. Use certificate-based authentication (EAP-TLS with SCEP or PKCS) for reliable post-AMAPI operation. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]"

### Pitfall D: Two-App Confusion for End User

**What goes wrong:** End user receives a device with both Company Portal and Microsoft Intune app installed but doesn't understand which does what.

**How to avoid:** End-user doc enrollment steps should include a brief "After enrollment, you'll see two apps" explanation distinguishing their roles. Do not instruct users to interact with Android Device Policy.

### Pitfall E: Privacy Boundary Duplication vs Sync Contract

**What goes wrong:** D-03 requires the admin doc to carry the canonical table and the end-user doc to carry a plain-language summary. Writers either (a) byte-for-byte copy the admin table into the end-user doc (violates SC2 voice lock) or (b) make the end-user summary so brief it misses the D-04 sync contract keyword targets.

**How to avoid:** End-user summary must contain the four grep targets: `work profile data`, `personal apps`, `personal data`, `device location`. Use a simple two-column ✓/✗ list in plain language that hits all four.

### Pitfall F: ZT Portal Section Not Omitted

**What goes wrong:** Using the admin template without applying the subtractive-deletion HTML comment for the ZT portal H4 sub-section.

**How to avoid:** BYOD MUST omit the `#### In Zero-Touch portal` sub-section via HTML-comment marker. Phase 34 D-17 precedent. Verify template was copied, then check for ZT portal section removal.

---

## Runtime State Inventory

Step 2.5: SKIPPED — Phase 37 is a greenfield documentation phase (two new files, no renaming/refactoring).

---

## Environment Availability

Step 2.6: SKIPPED — Phase 37 is pure documentation authoring. No external tools, services, databases, or CLIs are required beyond standard markdown tooling.

---

## Validation Architecture

`workflow.nyquist_validation` key is absent from `.planning/config.json` — treating as enabled (absent = enabled).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | grep-based assertion (no test runner needed — pure documentation) |
| Config file | none |
| Quick run command | `grep -c "last_verified" docs/admin-setup-android/04-byod-work-profile.md` |
| Full suite command | bash verification script (Wave 2 per plan) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AEBYOD-01 | Admin doc exists at correct path | smoke | `test -f docs/admin-setup-android/04-byod-work-profile.md` | ❌ Wave 0 |
| AEBYOD-01 | Privacy boundary table contains minimum 7 rows | unit grep | `grep -c "Admin CAN" docs/admin-setup-android/04-byod-work-profile.md` | ❌ Wave 0 |
| AEBYOD-01 | Data transfer table has 6 rows | unit grep | `grep -c "work.*personal\|personal.*work" docs/admin-setup-android/04-byod-work-profile.md \| grep -v "^0$"` | ❌ Wave 0 |
| AEBYOD-01 | No "SafetyNet" in admin doc (AEAUDIT-04) | unit grep | `grep -i "SafetyNet" docs/admin-setup-android/04-byod-work-profile.md \| wc -l` == 0 | ❌ Wave 0 |
| AEBYOD-01 | No "supervision" as Android management term | unit grep | `grep -i "supervision" docs/admin-setup-android/04-byod-work-profile.md \| grep -v "cross-platform\|glossary"` == 0 | ❌ Wave 0 |
| AEBYOD-02 | End-user doc exists at correct path | smoke | `test -f docs/end-user-guides/android-work-profile-setup.md` | ❌ Wave 0 |
| AEBYOD-02 | No Intune admin center navigation in end-user doc `## For IT helpdesk agents` | unit grep | `grep -E "Devices >|Apps >|> Enrollment" docs/end-user-guides/android-work-profile-setup.md` == 0 | ❌ Wave 0 |
| AEBYOD-02 | Privacy sync contract: 4 keyword targets present | unit grep | `grep "work profile data\|personal apps\|personal data\|device location" docs/end-user-guides/android-work-profile-setup.md \| wc -l` >= 4 | ❌ Wave 0 |
| AEBYOD-02 | `audience: end-user` in end-user doc frontmatter | unit grep | `grep "audience: end-user" docs/end-user-guides/android-work-profile-setup.md` | ❌ Wave 0 |
| AEBYOD-03 | AMAPI Migration H2 present in admin doc | unit grep | `grep "## AMAPI Migration" docs/admin-setup-android/04-byod-work-profile.md` | ❌ Wave 0 |
| AEBYOD-03 | Confidence markers present (D-10 format) | unit grep | `grep -E "\[(HIGH\|MEDIUM\|LOW)" docs/admin-setup-android/04-byod-work-profile.md \| wc -l` > 0 | ❌ Wave 0 |
| AEBYOD-03 | Confidence marker format regex (D-11) | unit grep | `grep -E "\[(HIGH\|MEDIUM\|LOW)(: [A-Za-z ]+)?(, last_verified [0-9]{4}-[0-9]{2}-[0-9]{2})?\]" docs/admin-setup-android/04-byod-work-profile.md` | ❌ Wave 0 |
| AEBYOD-01/03 | No custom OMA-URI positive description (should reference removal) | unit grep | `grep -i "OMA-URI" docs/admin-setup-android/04-byod-work-profile.md` contains "removed\|no longer\|not supported" | ❌ Wave 0 |
| D-06 mandatory anchors | All 5 mandatory anchors present | unit grep | `grep -E "id=\"key-concepts\"\|id=\"amapi-migration\"\|id=\"enrollment-restrictions\"\|id=\"work-profile-policy\"\|id=\"privacy-boundary\"" docs/admin-setup-android/04-byod-work-profile.md \| wc -l` == 5 | ❌ Wave 0 |
| D-16 guard | No modifications to shared files | smoke | `git diff --name-only docs/admin-setup-android/03-*.md docs/android-lifecycle/ docs/common-issues.md docs/quick-ref*.md docs/index.md` == empty | ❌ Wave 2 |
| D-02 corrections | STATE.md line 75 corrected | unit grep | `grep "All four L2 investigation runbooks" .planning/STATE.md` | ❌ Wave 2 |
| D-02 corrections | SUMMARY.md section header corrected | unit grep | `grep "BYOD Work Profile - Admin + End-User$" .planning/research/SUMMARY.md` (no "+ L2") | ❌ Wave 2 |

### Sampling Rate
- **Per task commit:** `grep -i "SafetyNet\|supervision" docs/admin-setup-android/04-byod-work-profile.md docs/end-user-guides/android-work-profile-setup.md` must return 0 hits (excluding cross-platform explanatory callouts)
- **Per wave merge:** Run full grep suite above
- **Phase gate:** All assertions green before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `docs/end-user-guides/` directory — does not exist; must be created in Wave 0
- [ ] `docs/admin-setup-android/04-byod-work-profile.md` — does not exist; Wave 1 create
- [ ] `docs/end-user-guides/android-work-profile-setup.md` — does not exist; Wave 1 create
- [ ] Verification grep script — nominally inline in Wave 2 audit task; no separate test file needed

---

## Security Domain

`security_enforcement` key is absent from `.planning/config.json` — treating as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | yes (enrollment uses Entra credentials) | Entra MFA (not directly in these docs, but referenced as prerequisite context) |
| V3 Session Management | no (docs are static markdown) | — |
| V4 Access Control | yes (enrollment restrictions block/allow personal Android) | Intune enrollment restrictions policy (documented in admin doc) |
| V5 Input Validation | no (static documentation) | — |
| V6 Cryptography | yes (Wi-Fi cert-auth, SCEP/PKCS) | Certificate-based EAP-TLS (SCEP/PKCS) — documented in `## Wi-Fi policy` section |

### Known Threat Patterns for BYOD Work Profile

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Personal device used to exfiltrate work data via clipboard | Information Disclosure | Block clipboard work→personal via policy (D-05b row 1) |
| Personal app accessing work contacts via cross-profile search | Information Disclosure | Block "Search work contacts from personal profile" |
| Device with compromised personal partition accessing work apps | Tampering | Play Integrity compliance policy (Basic + Device integrity minimum) |
| Admin exceeding privacy boundary (attempting to see personal data) | Elevation of Privilege | Document CANNOT-see boundary explicitly in both docs; enforced by Android OS, not admin choice |
| Username/password Wi-Fi credential intercepted | Spoofing | EAP-TLS certificate-based auth (post-AMAPI requirement) |

---

## Cross-Phase Dependencies and Coordination

### Upstream Dependencies (Phase 37 consumes)

| Phase | Artifact | Consumed By | Anchor |
|-------|---------|------------|--------|
| Phase 34 | `docs/_glossary-android.md` | First-use cross-links in both Phase 37 docs | `#byod`, `#work-profile`, `#amapi`, `#managed-google-play`, `#play-integrity` |
| Phase 34 | `docs/android-lifecycle/03-android-version-matrix.md` | Admin doc Prerequisites — version reference | `#byod` |
| Phase 34 | `docs/_templates/admin-template-android.md` | Admin doc structural template (ZT portal OMITTED) | n/a (subtractive-deletion pattern) |
| Phase 35 | `docs/admin-setup-android/01-managed-google-play.md` | Admin doc Prerequisites — MGP binding reference | `#bind-mgp`, `#account-types`, `#disconnect-consequences` |
| Phase 35 | `docs/admin-setup-android/00-overview.md` | BYOD branch of the 5-mode flowchart points at Phase 37 doc | Phase 37 is the target |
| Phase 36 | `docs/admin-setup-android/03-fully-managed-cobo.md` | Privacy boundary corporate-mode contrast | `#fully-managed` conceptual reference |

### Downstream Dependencies (Phase 37 anchors consumed)

| Phase | Consumer | Phase 37 Anchor |
|-------|---------|-----------------|
| Phase 40 | L1 runbook 23 "Work profile not created" | `#enrollment-restrictions`, `#work-profile-policy` |
| Phase 40 | L1 decision tree 08-android-triage.md | `#amapi-migration` (for AMAPI-context routing) |
| Phase 41 | L2 runbook 19 android-enrollment-investigation.md | `#enrollment-restrictions`, `#work-profile-policy`, `#privacy-boundary` |
| Phase 42 | Milestone audit AEAUDIT-04 | All 5 mandatory anchors + `last_verified` frontmatter + no-SafetyNet + no-supervision greps |

**Anchor stability contract:** The 5 mandatory anchors (`#key-concepts`, `#amapi-migration`, `#enrollment-restrictions`, `#work-profile-policy`, `#privacy-boundary`) MUST NOT be renamed after Phase 37 ships. Renaming breaks Phase 40 and 41 cross-references.

### Artifact Corrections Required (D-02)

The following upstream artifacts require correction in a single commit during plan- or execute-phase:

1. **`.planning/STATE.md` line 75** — Remove "L2 enrollment investigation runbook 19 is delivered in Phase 37..." Replace with the corrected Phase 41 attribution per D-02.
2. **`.planning/research/SUMMARY.md` line 201** — Change section header from "Phase 37: BYOD Work Profile - Admin + End-User + L2" to "Phase 37: BYOD Work Profile - Admin + End-User".
3. **`.planning/research/SUMMARY.md` line 208** — Remove the runbook 19 bullet from the Delivers list.
4. **`.planning/ROADMAP.md` line 195** — Rewrite Phase 41 depends-on clause per D-02 exact replacement text.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | AMAPI web enrollment requires Android 10+; MS Learn states "currently supports Android 10 and later" per TechCommunity blog | RF-1 | If floor is lower, D-05 AMAPI Migration section should not version-gate Android 10 |
| A2 | Web enrollment URL format is `https://enterprise.google.com/android/enroll?et=<token>` — sourced from Jason Bayton, not official MS Learn | RF-2 | Admin doc should NOT print the URL directly; reference TechCommunity blog instead |
| A3 | Username/password Wi-Fi (EAP-TTLS/PEAP) "breaks" on post-AMAPI devices — from TechCommunity blog only; MS Learn Wi-Fi docs still list username/password as valid option | RF-3 | If the "breaks" assertion is overstated, the cert-auth requirement language should be softened to "strongly recommended" rather than "required" |
| A4 | Android Device Policy role as the hidden AMAPI policy enforcer — from TechCommunity blog | RF-4 | If Android Device Policy is visible or user-interactive post-AMAPI, end-user doc guidance needs update |
| A5 | No separate calendar direction toggle exists in BYOD work profile policy | RF-5 | If a calendar-specific setting was added in a recent Intune update (2025–2026), the D-05b table cell description needs correction at execute time |
| A6 | Privacy boundary unchanged post-AMAPI — no new admin visibility into personal profile | RF-8 | If AMAPI expanded any admin visibility, privacy boundary table needs revision |
| A7 | MS Learn dedicated web enrollment article (android-work-profile-web-enrollment) does not exist yet (returned 404) | RF-2 | If this article now exists, it is a HIGH-confidence source for web enrollment and should replace TechCommunity blog as primary |
| A8 | Admin center path for device restrictions is Devices > Configuration > Create > Android Enterprise > Device restrictions > Personally owned work profile | RF-5 | Intune UI has a history of navigation path changes; executor must verify at execute time |

**Note:** Items A1–A8 are all tagged [MEDIUM] or require execute-time re-verification per D-18.

---

## Open Questions

1. **Is there now a dedicated MS Learn article for Android BYOD web enrollment?**
   - What we know: As of 2026-04-22, the URL `learn.microsoft.com/en-us/intune/intune-service/enrollment/android-work-profile-web-enrollment` returns 404.
   - What's unclear: Whether a web enrollment article has been published after this research pass.
   - Recommendation: Executor checks the URL at execute time. If it exists, upgrade web enrollment assertions from MEDIUM to HIGH.

2. **Exact admin center navigation path for work profile policy device restrictions**
   - What we know: The setting labels are verified from the MS Learn device-restrictions-android-for-work article. The navigation path `Devices > Configuration > Create > Android Enterprise > Device restrictions` is [ASSUMED].
   - What's unclear: Whether the Intune UI has moved this under a different blade.
   - Recommendation: Executor verifies path at execute time per D-18. Apply `[MEDIUM: assumed navigation, last_verified YYYY-MM-DD]` until verified.

3. **Exact scope of "mandatory AMAPI migration" date**
   - What we know: Custom OMA-URI profiles ended April 2025 (completed). Web enrollment opt-in is Q1 2026. Mandatory web enrollment migration has no confirmed date ("advanced notice" promised).
   - What's unclear: Whether mandatory migration has been announced since the blog was published.
   - Recommendation: D-05 AMAPI Migration H2 should state "web enrollment is available as opt-in as of Q1 2026; mandatory migration timeline will be communicated with advance notice. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]"

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Company Portal as primary BYOD management app | Microsoft Intune app primary; Company Portal MAM-only | AMAPI migration (April 2025 OMA-URI end; Q1 2026 app switch) | End-user doc enrollment steps; admin `## Management app` section |
| Custom OMA-URI profiles for BYOD work profile | Standard Intune policies only (device restrictions, Wi-Fi, VPN profiles) | April 2025 (Intune 2504 release) | Admin doc must not document OMA-URI creation for BYOD |
| Username/password Wi-Fi (EAP-TTLS/PEAP) | Certificate-based auth (EAP-TLS SCEP/PKCS) | April 2025 (AMAPI migration) | Admin `## Wi-Fi policy` section; inline AMAPI reminder |
| Company Portal app installation as only enrollment path | Company Portal (legacy) + web enrollment URL (opt-in Q1 2026) | Q1 2026 | End-user doc web enrollment sidebar required |
| SafetyNet compliance attestation | Play Integrity API (three verdict levels) | January 2025 | BYOD admin doc compliance policy references must use Play Integrity |
| Android device administrator (DA) management | Android Enterprise work profile | Deprecated for GMS devices | BYOD doc should reference DA deprecation only as a "do not use" footnote |

**Deprecated/outdated:**
- SafetyNet: Deprecated January 2025; replaced by Play Integrity. Never reference in Phase 37 content.
- Custom OMA-URI profiles for BYOD: Ended April 2025. Admin doc should mention removal only in the AMAPI Migration H2.
- Company Portal as primary BYOD DPC: Post-AMAPI opt-in, Microsoft Intune app takes this role. Legacy path is still current for pre-opt-in tenants.

---

## Sources

### Primary (HIGH confidence)

- MS Learn: [setup-personal-work-profile](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-personal-work-profile) — enrollment restrictions navigation path, last updated 2026-04-16
- MS Learn: [user-help enroll-work-profile-android](https://learn.microsoft.com/en-us/intune/user-help/enrollment/enroll-work-profile-android) — Company Portal end-user enrollment steps, last updated 2026-04-08
- MS Learn: [ref-wifi-settings-android-enterprise](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-android-enterprise) — Wi-Fi EAP types and cert types for personally-owned work profile, last updated 2026-04-14
- MS Learn: [device-restrictions-android-for-work](https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-android-for-work) — exact data transfer setting labels, last updated (current)
- MS Learn: [connect-managed-google-play](https://learn.microsoft.com/en-us/intune/device-enrollment/android/connect-managed-google-play) — Entra account preference confirmed current, last updated 2026-04-16
- MS Learn: [guide (deployment guide enrollment android)](https://learn.microsoft.com/en-us/intune/device-enrollment/android/guide) — BYOD enrollment admin/end-user task overview, last updated 2026-04-16
- MS Learn: [troubleshoot-android-enrollment](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-android-enrollment) — error messages (Can't create work profile), last updated 2026-04-17
- MS Learn: [mam-vs-work-profiles-android](https://learn.microsoft.com/en-us/intune/app-management/protection/mam-vs-work-profiles-android) — Company Portal role in MAM, last updated 2026-04-17
- Google AE Help: [Work profiles](https://support.google.com/work/android/answer/9563584) — privacy boundary (admin cannot see personal apps/data), retrieved 2026-04-22
- Project internal: `docs/android-lifecycle/03-android-version-matrix.md` — BYOD minimum version `Android 5.0 (practical: Android 8+)`, AMAPI breakpoint documented, verified 2026-04-22
- Project internal: `docs/_glossary-android.md` — BYOD, AMAPI, DPC entries confirm role split, verified 2026-04-22

### Secondary (MEDIUM confidence)

- Microsoft Community Hub: [New policy implementation and web enrollment for Android personally owned work profile](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-policy-implementation-and-web-enrollment-for-android-personally-owned-work-p/4370417) — AMAPI migration details, web enrollment path, management app change, Wi-Fi username/password breakage, timeline (Q1 2026 opt-in)
- Microsoft Community Hub: [Intune ending support for custom profiles for personally owned work profile devices in April 2025](https://techcommunity.microsoft.com/blog/intunecustomersuccess/intune-ending-support-for-custom-profiles-for-personally-owned-work-profile-devi/4287414) — custom OMA-URI end-of-support date confirmed (April 2025 / Intune 2504 release)
- Jason Bayton: [Android Enterprise provisioning methods](https://bayton.org/android/android-enterprise-provisioning-methods/) — web enrollment URL format `enterprise.google.com/android/enroll?et=<token>`, enrollment link as optimal BYOD experience

### Tertiary (LOW confidence / needs validation)

- Error messages 2–5 in RF-7 top-5 list: synthesized from MS Learn Q&A community discussions; not from an official error catalog. Executor should validate against current end-user experience.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all Phase 34/35/36 artifacts verified; MS Learn enrollment paths verified
- Architecture patterns: HIGH — data transfer settings verified from MS Learn; management app roles from MEDIUM source (blog)
- AMAPI migration details: MEDIUM — TechCommunity blog is the primary source; MS Learn has not fully caught up with the AMAPI web enrollment path as of 2026-04-22
- Pitfalls: HIGH — PITFALL 6 (tier inversion), PITFALL 8 (AMAPI), PITFALL 9/11 (shared file guard) all well-documented in project research

**Research date:** 2026-04-22
**Valid until:** 2026-06-22 for stable claims (MS Learn enrollment paths). 2026-05-22 for AMAPI-adjacent claims (fast-moving; TechCommunity blog may be superseded by MS Learn articles). Re-verify A7 (web enrollment MS Learn URL) at execute time — most likely to have changed.

---

## RESEARCH COMPLETE
