# Features Research — v1.11 macOS PSSO End-to-End Provisioning & MDM Migration

**Domain:** Documentation suite — macOS scenario/journey guides
**Researched:** 2026-06-24
**Confidence:** HIGH (Microsoft Learn + Apple Support authoritative sources; Kandji/Iru console steps MEDIUM — official deletion page confirms behavior but nuance on OS-26 path requires validation)

---

## Scope Restatement

"Features" in this context means: **what each walkthrough must contain** to be complete and operator-followable end-to-end. Each item below maps to content that must be written, verified, or cross-linked in the two new scenario guides and the new L2 runbook.

---

## Feature Landscape

### Table Stakes (Operators Expect These)

Features whose absence makes the walkthrough incomplete — an operator following the guide would get stuck.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Pillar A: Ordered stage list — standard post-enrollment PSSO path** | Without a stage list operators cannot navigate the journey | MEDIUM | 7 stages mirroring 00-ade-lifecycle.md structure; per-stage What-Admin-Sees / What-User-Sees / Verify sections |
| **Pillar A: Ordered stage list — ADE-during-Setup-Assistant (macOS 26+)** | Second delivery path; operators must know which path to follow | MEDIUM | Same per-stage structure; diverges from standard path at Stage 4; hard OS-26 gate must be surfaced prominently |
| **Pillar A: Path divergence table** | Operators need to choose between paths at the start | LOW | Side-by-side comparison of standard vs. ADE-during-SA paths (prerequisites, when PSSO registers, verification) |
| **Pillar A: Per-stage verification gates** | Without these, operators cannot confirm success before proceeding | MEDIUM | `app-sso platform -s` output (`Device Registration: REGISTERED`, `User Registration: REGISTERED`); Intune portal status "Succeeded"; System Settings > Privacy and Security > Profiles |
| **Pillar A: Cross-links to failure runbooks at each stage** | No inline triage; must route to L1 #35/#36 + L2 #27 at the right stage | LOW | Link-not-copy; existing runbooks already cover the failures |
| **Pillar B: Ordered stage list — OS-26 in-place migration path** | Core walkthrough content | HIGH | ~8 stages: assess fleet → Intune-side ready → source-side release (Kandji/Iru) → ABM "Assign Device Management" + set Deadline → user notification behavior → user migration trigger → post-migration policy delivery → PSSO re-registration + verify |
| **Pillar B: Ordered stage list — pre-OS-26 retire/wipe/re-enroll fallback** | Operators with mixed fleets need both paths | MEDIUM | ~5 stages: assess (OS version check) → retire/wipe in Kandji/Iru → factory reset → ADE re-enroll via Intune → PSSO from scratch |
| **Pillar B: Kandji/Iru source-side release steps** | Operators cannot migrate without releasing the device in the source MDM | MEDIUM | Kandji console: Devices > select device > Device Action Menu > Delete Device Record (type "DELETE" to confirm); device auto-removes profiles on next check-in (~15 min); pre-migration secret retrieval (FileVault recovery key, Activation Lock bypass code) is mandatory before deletion; Iru = Kandji 2026 rebrand — surface both names |
| **Pillar B: Deadline behavior documentation** | Operators must communicate the lockout timeline to users | MEDIUM | Notification cadence: daily → hourly at 24h → 60/30/10/1 min in final hour; post-deadline: Mac shows non-dismissible full-screen prompt; no Cancel option; deadline range 1–90 days |
| **Pillar B: Post-migration PSSO re-registration** | PSSO Secure Enclave keys are tenant-bound; migration to Intune destroys them | HIGH | PSSO registration does NOT survive MDM migration — the WPJ key is Secure-Enclave-bound to the previous MDM tenant; after migration, new Intune PSSO policy delivers "Registration Required" notification and user must re-register; verify with `app-sso platform -s` |
| **Pillar B: New L2 migration-failure runbook (#30)** | Operators escalating migration failures need an investigation path | HIGH | Three failure tracks: (1) Deadline lockout — device hit deadline without migrating (offline/missed notification); (2) Profile-not-delivered — device enrolled in Intune but PSSO/config profiles missing; (3) PSSO re-registration stuck — "Registration Required" not appearing or looping; numbered #30 (highest existing is #29-macos-graph-credential-investigation.md) |
| **Pillar B: Admin-side monitoring during migration** | Operators need to know what to watch in Intune + ABM during the migration window | MEDIUM | ABM device page "pending migration" notification panel; Intune Devices > macOS > filter by enrollment status; check compliance state post-enrollment; PSSO registration state via `app-sso platform -s` or Graph API `platformCredentialAuthenticationMethod` |

### Differentiators (Raises Quality)

Features not strictly required for completeness but that substantially raise operator usability.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Pre-migration readiness checklist** | Prevents the most common migration-day failures | LOW | Checklist items: confirm all devices on macOS 26+; verify ABM tokens for both source and destination MDMs; retrieve and store FileVault recovery keys + Activation Lock bypass codes from Kandji/Iru BEFORE deleting device records; confirm Intune ADE profile + PSSO policy + Company Portal LOB app (5.2604.0+) all assigned to the same static user groups; CA exclusion in place for bootstrapping window (DF-9); TLS break-and-inspect exempted for PSSO endpoints (DF-10) |
| **Side-by-side path comparison table (Pillar A)** | Lets operators select the right PSSO delivery path without reading full sections | LOW | Table: standard post-enrollment vs. ADE-during-SA — compare prerequisites, OS floor, Company Portal version required (5.2404.0 vs. 5.2604.0 LOB), when PSSO registers, user experience, failure recovery |
| **Deadline-window guidance with phased-rollout advice** | Operators with 500+ device fleets need to plan migration waves | LOW | Recommended 7–14 day window for pilot; 30-day for full fleet; note that ABM maximum is 90 days; suggest pilot group before broad assignment |
| **End-user communication template reference** | Operators need to tell users what to expect | LOW | Not a full template, but a "what to tell users" callout: expect a notification, click "Start Enrollment," process takes 2–5 min on Mac, must be on Wi-Fi, PSSO will require a one-time re-registration after migration |
| **`app-sso platform -s` output annotation** | Operators unfamiliar with the command need to read the output correctly | LOW | Annotated sample output showing REGISTERED vs. NOT REGISTERED states; note that `security find-certificate` returns false negatives for SE-stored keys — use `app-sso` not `security` |
| **Managed apps preservation callout** | Operators worry about app loss during migration | LOW | Confirm: managed app data preserved IF source MDM avoids sending remove-app commands; new MDM installs apps before `DeviceConfigured`; Activation Lock bypass from old MDM becomes invalid (new MDM reapplies if needed) |
| **FileVault key rotation note** | Security-conscious operators need to know this happens | LOW | Post-migration: Intune rotates the FileVault key automatically; old MDM key becomes invalid; operators should verify new key is escrowed in Intune before retiring old MDM access |
| **`last_verified` freshness stamps on OS-26 sections** | This is the highest-drift content in the suite | LOW | Per PROJECT.md: macOS 26 GA status, Company Portal 5.2604.0 version floor; each OS-26-gated section needs `last_verified: 2026-06-24` / `review_by: 2026-09-24` frontmatter or inline callout |

### Anti-Features (Explicitly OUT of Scope)

Features to deliberately exclude; documenting the exclusion prevents scope drift during authoring.

| Anti-Feature | Why Requested | Why Excluded | What to Do Instead |
|--------------|---------------|--------------|-------------------|
| **Multi-tenant PSSO configuration** | Operators managing multiple Entra tenants will ask about it | Deferred to its own architectural milestone (per PROJECT.md v1.10 context; net-new architecture, not journey-stitching) | Link to future milestone placeholder; do not inline |
| **On-premises Active Directory Kerberos setup** | Kerberos is adjacent to PSSO | Already documented in guide 10; this walkthrough is not a re-documentation of that setup | Cross-link to guide 10 at the stage where Kerberos becomes relevant (post-PSSO registration); link-not-copy |
| **Building Intune from scratch (ABM token, ADE token, APNs cert)** | New-to-Intune operators will ask about initial setup | Already documented in guides 01, 02; walkthroughs assume an operational Intune tenant | Link to guides 01/02 in the prerequisites section; do not re-document |
| **Re-documenting guide 07 Settings Catalog fields** | Operators may want all PSSO config in one place | Guide 07 is the authoritative source; duplicating creates drift | State prerequisites clearly ("guide 07 must be complete before starting") and link; do not copy the Settings Catalog table |
| **Inline troubleshooting / triage trees within the walkthrough** | Inline triage is convenient | Contradicts the project's layered-runbook architecture; inline triage in a walkthrough creates maintenance duplication | At each stage, add a "Failures at this stage → L1 #35/#36, L2 #27/30" footer; do not inline triage steps |
| **Smart Card PSSO path for ADE-during-Setup-Assistant** | Smart Card is a supported PSSO auth method | Smart Card is explicitly unsupported during Setup Assistant; attempting it causes failures | Note the exclusion explicitly in the ADE path prerequisites; route Smart Card users to the standard post-enrollment path |
| **Non-ADE (manual) enrollment migration** | Operators with Configurator-enrolled devices | Requires 30-day provisional period and has different constraints; would balloon scope | Note in scope section; route to Apple's manual Apple Configurator migration path documentation |
| **Shared iPad migration** | Shared iPad is a macOS/iPad deployment mode | Apple explicitly does not support Shared iPad in the OS-26 migration feature | Note the exclusion explicitly in the migration prerequisites |

---

## Feature Dependencies

```
[Pillar A: Standard post-enrollment PSSO path]
    └──requires──> [Guide 07 PSSO policy deployed on tenant] (link-not-copy)
    └──requires──> [Guide 02 enrollment profile with Await Config = Yes] (link-not-copy)
    └──requires──> [Guide 00 ADE lifecycle: Stages 1-7 complete] (link-not-copy)
    └──links to failure──> [L1 #35 Platform SSO Sign-In Failure]
    └──links to failure──> [L1 #36 Platform SSO Secure Enclave Key Loss]
    └──links to failure──> [L2 #27 Platform SSO Investigation]

[Pillar A: ADE-during-Setup-Assistant path (macOS 26+)]
    └──requires──> [Standard post-enrollment path documented first] (path divergence point)
    └──requires──> [Company Portal 5.2604.0 LOB app (NOT VPP)] (hard prerequisite)
    └──requires──> [Three-policy same-group rule: PSSO catalog + CP LOB + ADE enrollment profile]
    └──requires──> [macOS 26 hard OS gate]
    └──failure recovery──> [Wipe and re-enroll only — no in-place fix]

[Pillar B: OS-26 in-place migration path]
    └──requires──> [Pre-migration readiness checklist complete]
    └──requires──> [Kandji/Iru source-side release (delete device record)] (source-side step)
    └──requires──> [ABM "Assign Device Management" + Deadline set]
    └──requires──> [Intune ADE profile + PSSO policy ready BEFORE migration]
    └──results in──> [PSSO re-registration required post-migration]
    └──links to failure──> [L2 #30 MDM Migration Failure (NEW)]

[Pillar B: pre-OS-26 retire/wipe/re-enroll fallback]
    └──requires──> [OS version assessment first] (gate: < macOS 26 → this path)
    └──requires──> [Kandji/Iru retire/wipe action in source console]
    └──results in──> [Full ADE re-enroll → standard PSSO path from scratch]
    └──links to failure──> [Existing L2 #27 for PSSO failures post-re-enroll]

[L2 #30 MDM Migration Failure runbook (NEW)]
    └──requires──> [L2 macOS log collection (10-macos-log-collection.md) as prerequisite]
    └──receives escalation from──> [L1 if added; or direct L2 escalation via 00-index.md]
    └──references──> [L2 #27 for PSSO-specific sub-investigation after migration]
```

### Dependency Notes

- **ADE-during-SA path requires standard path documented first:** The ADE path is a variant; the divergence point (Stage 4) must reference the standard path clearly so operators don't apply ADE-during-SA setup to non-macOS-26 devices.
- **Post-migration PSSO re-registration is mandatory:** PSSO Secure Enclave keys are hardware-bound to the Entra device registration in the source MDM tenant's context. MDM migration creates a new device identity in Intune; the old WPJ key is not portable. This is confirmed by the known behavior that any MDM-driven password reset (which bypasses local auth) destroys the SE key — MDM migration is a superset of that event. The "Registration Required" notification will appear after the Intune PSSO policy delivers.
- **Kandji/Iru delete-before-ABM-reassign sequence matters:** Apple's ABM "Assign Device Management" reassignment does NOT automatically release the device from the source MDM. The source MDM must be unenrolled first (via device record deletion in Kandji/Iru, which triggers profile removal on next check-in) before the ABM reassignment takes effect cleanly. The window between Kandji deletion and Intune enrollment is a security-unmanaged gap — minimize it and pre-stage Intune enrollment profile.
- **Three-policy same-static-group rule for ADE-during-SA:** The Settings Catalog PSSO policy, Company Portal LOB app (5.2604.0+), and ADE enrollment profile MUST all target the same assigned (static) user groups. Dynamic groups and device groups both break this feature. This is a hard constraint from Microsoft Learn (confirmed 2026-06-23 doc update).

---

## Ordered Stage Lists (Operator-Followable Sequences)

### Walkthrough A1: Standard Post-Enrollment PSSO Path

Stage structure mirrors 00-ade-lifecycle.md (4-section per stage: What Admin Sees / What User Sees / Behind the Scenes / Verification Gate).

| Stage | Actor | Where | What Happens | Verification Gate |
|-------|-------|-------|--------------|-------------------|
| A1-S1: Enrollment profile configured | Admin | Intune admin center | ADE enrollment profile with User Affinity + Modern Auth + Await Config = Yes + Locked Enrollment = Yes assigned to device | Profile appears under token > Profiles; device row shows profile name — **Link to guide 02** |
| A1-S2: PSSO Settings Catalog policy deployed | Admin | Intune admin center | `com.apple.extensiblesso` policy with `{{DEVICEREGISTRATION}}` token assigned to user groups (NOT device groups) | Intune: policy Device status = Succeeded; System Settings > Profiles shows extensiblesso profile |
| A1-S3: Company Portal deployed (v5.2404.0+) | Admin | Intune admin center | Company Portal deployed as required VPP or LOB app | Company Portal app present on device, version ≥ 5.2404.0 |
| A1-S4: Device powers on / ADE Setup Assistant | Device + User | On device | Device contacts ADE endpoints; MDM enrollment profile installs silently; user completes Setup Assistant screens; Entra credential prompt appears (modern auth) | Device enrolled in Intune (Intune > Devices > macOS shows device); ADE token sync not required (already synced) — **failures → L1 #35/#36, L2 #27** |
| A1-S5: Await Configuration | Device | On device | "Awaiting final configuration" screen; Intune pushes PSSO Settings Catalog profile + other critical profiles | Profile delivery: Intune device config status = Succeeded for extensiblesso profile |
| A1-S6: Desktop reached; "Registration Required" notification | User | On device | User reaches desktop; macOS displays "Registration Required" notification in Notification Center (triggered by `{{DEVICEREGISTRATION}}` token) | Notification appears (may take up to 15 min after policy delivery); if no notification after 30 min → L2 #27 |
| A1-S7: User PSSO registration (interactive) | User | On device | User clicks notification; signs in with Entra credentials; completes MFA; WPJ Secure Enclave key written; device registered | `app-sso platform -s` output: `Device Registration: REGISTERED` + `User Registration: REGISTERED` — **failures → L1 #35/#36, L2 #27** |
| A1-S8: Final verification | Admin + User | Intune portal + device | Confirm Conditional Access access; check compliance; verify PSSO end-to-end SSO to Entra-protected apps | `app-sso platform -s` REGISTERED; Intune device compliance = Compliant; user can open Outlook/Teams without additional sign-in |

### Walkthrough A2: ADE-during-Setup-Assistant Path (macOS 26+ Only)

Diverges from A1 at Stage 3 (Company Portal version) and Stage 4 (PSSO registers IN Setup Assistant, not at desktop).

| Stage | Actor | Where | What Happens | Verification Gate |
|-------|-------|-------|--------------|-------------------|
| A2-S1: OS-26 gate check | Admin | Pre-flight | Confirm all target devices running macOS 26+; ADE-during-SA hard gates at macOS 26 — no earlier OS | Fleet OS version report in Intune (Devices > macOS > OS version column) |
| A2-S2: Company Portal LOB app (5.2604.0+ required) | Admin | Intune admin center | Add CP as LOB app (NOT VPP); assign to same static user groups as PSSO policy + enrollment profile | CP app status in Intune = Installed; version ≥ 5.2604.0 |
| A2-S3: PSSO Settings Catalog policy with `EnableRegistrationDuringSetup` | Admin | Intune admin center | Add `Platform SSO > Enable Registration During Setup = Enabled` to existing PSSO policy; if Password method also add `Enable Create First User During Setup = Enabled`; assign to same static user groups | Policy includes EnableRegistrationDuringSetup; assigned to same groups as CP LOB + ADE profile |
| A2-S4: ADE enrollment profile (three-policy same-group rule) | Admin | Intune admin center | Verify enrollment profile: User Affinity + Modern Auth + Await Config = Yes + Locked Enrollment = Yes; assigned to SAME static user groups as PSSO policy + CP LOB | All three policies (PSSO catalog, CP LOB, ADE profile) show same group membership |
| A2-S5: Device powers on / Setup Assistant with PSSO | Device + User | On device | ADE discovery; MDM profile installs; Company Portal installs during Setup Assistant (priority delivery); Entra credential prompt appears in Setup Assistant (first auth starts enrollment; second auth authenticates CP/SSO extension) | If "Unable to sign in" error appears: click "Try Again" repeatedly until CP finishes installing — this is expected transient behavior per Microsoft docs |
| A2-S6: PSSO registration completes IN Setup Assistant | Device + User | On device (Setup Assistant still active) | WPJ Secure Enclave key written; device Entra registration completed; user fully authenticated — all before desktop | Setup Assistant completes without "Registration Required" notification at desktop |
| A2-S7: Await Configuration + desktop | Device | On device | "Awaiting final configuration" holds device while remaining profiles deploy; then desktop loads | Intune device enrollment status = Enrolled; extensiblesso profile = Succeeded |
| A2-S8: Final verification | Admin + User | Intune portal + device | Confirm no "Registration Required" notification needed; verify Entra resources accessible immediately | `app-sso platform -s`: REGISTERED; user opens Teams/Outlook without additional sign-in prompt |

**Recovery for ADE-during-SA misconfiguration:** No in-place repair. Must unassign PSSO policy → disable EnableRegistrationDuringSetup → sync → wipe device → re-enroll with corrected configuration. Document this prominently.

### Walkthrough B1: OS-26 In-Place MDM Migration (Kandji/Iru → Intune)

| Stage | Actor | Where | What Happens | Verification Gate |
|-------|-------|-------|--------------|-------------------|
| B1-S1: Fleet assessment | Admin | Kandji/Iru console + Intune | Identify all devices on macOS 26+; devices on < macOS 26 → B2 path (retire/wipe/re-enroll); confirm ADE enrollment status for all target devices (in-place migration requires ADE) | All target devices: macOS 26+, ADE-enrolled, organization-owned |
| B1-S2: Intune readiness | Admin | Intune admin center | Confirm Intune has: valid ADE token, enrollment profile (User Affinity + Modern Auth + Await Config + Locked), PSSO Settings Catalog policy, Company Portal app deployed; create CA exclusion for migration window (DF-9); confirm TLS inspection exemptions (DF-10) | Intune enrollment profile exists and has a default assignment; PSSO policy targets correct user groups; CA exclusion active |
| B1-S3: Secret retrieval from Kandji/Iru (BEFORE deletion) | Admin | Kandji/Iru console | Export and store FileVault recovery keys for all migration targets; export Activation Lock bypass codes; store in secure vault (old MDM keys become invalid post-migration) | FileVault keys and AL bypass codes securely stored outside Kandji/Iru |
| B1-S4: Kandji/Iru source-side release | Admin | Kandji/Iru console (now branded as Iru) | For each device: Devices > select device > Device Action Menu (top-right) > Delete Device Record > type "DELETE" > confirm; device must be online — agent receives deletion notification at next check-in (up to 15 min) and auto-removes MDM profiles + Kandji agent + VPP apps | Device disappears from Kandji/Iru console; MDM profile removal confirmed (device System Settings > Profiles should no longer show Kandji profile after ~15 min) |
| B1-S5: ABM "Assign Device Management" + Deadline | Admin | Apple Business Manager (business.apple.com) | Devices > select device(s) > More (top-right of detail pane) > Assign Device Management > select Intune MDM server > click Add Deadline > set deadline date (1–90 days) > Continue > Confirm | ABM device page shows "pending migration" status; Intune ADE token sync may be needed (Intune > Enrollment > Apple > Enrollment program tokens > Sync) |
| B1-S6: User notification and voluntary migration window | User + Admin | On device (user) + ABM (admin monitoring) | User receives "Enrollment Required" notification; cadence: daily → hourly at T-24h → 60/30/10/1 min before deadline; user clicks notification > System Settings > Start Enrollment > Enroll > authenticate; process takes 2–5 min; Mac shows progress window | Admin: ABM pending-migration count decreasing; Intune: new device enrollments appearing in Devices > macOS |
| B1-S7: Deadline enforcement (if user has not migrated) | Device | On device | Mac shows non-dismissible full-screen prompt; no Cancel button; user must click "Enroll" to proceed; entry of local account password required to complete enrollment | Device enrolls in Intune; Kandji/Iru device record already deleted (source is clean) |
| B1-S8: Post-migration policy delivery | Device + Intune | On device + Intune portal | Intune pushes enrollment profile; Await Configuration screen ("Awaiting final configuration"); PSSO Settings Catalog policy, Company Portal app, other profiles delivered; old Kandji-era profiles removed; FileVault key rotated by Intune | Intune device status = Enrolled; compliance evaluating; extensiblesso profile = Succeeded; FileVault recovery key visible in Intune (Devices > [device] > Recovery keys) |
| B1-S9: PSSO re-registration (mandatory) | User + Admin | On device | "Registration Required" notification appears (triggered by Intune PSSO policy + `{{DEVICEREGISTRATION}}` token); user clicks > signs in with Entra credentials > completes MFA; new WPJ Secure Enclave key created against Intune/Entra tenant | `app-sso platform -s`: `Device Registration: REGISTERED` + `User Registration: REGISTERED`; Graph API `platformCredentialAuthenticationMethod` shows entry for user; Conditional Access device compliance = Compliant |

### Walkthrough B2: Pre-OS-26 Fallback (Retire/Wipe/Re-Enroll)

| Stage | Actor | Where | What Happens | Verification Gate |
|-------|-------|-------|--------------|-------------------|
| B2-S1: OS version gate | Admin | Kandji/Iru console | Identify devices running < macOS 26; these cannot use in-place migration | Device list filtered to macOS < 26 |
| B2-S2: Pre-wipe preparation | Admin | Kandji/Iru console | Export FileVault recovery keys; export AL bypass codes; communicate to user: device will be wiped, data on non-backed-up volumes will be lost | Secrets stored; user notified and has backed up personal data |
| B2-S3: Retire/wipe in Kandji/Iru | Admin | Kandji/Iru console | Devices > select device > Device Action Menu > select Wipe (erase device action); confirm; device receives erase command | Device begins factory reset; Kandji/Iru record shows wiped status |
| B2-S4: ADE re-enroll via Intune | Admin/Device | Intune + device | Device reboots into Setup Assistant; ADE discovery contacts ABM (ABM MDM server should already be set to Intune from B2 prep or pre-coordinated); standard ADE enrollment flow (A1-S4 through A1-S6) | Device enrolled in Intune; appears in Intune > Devices > macOS |
| B2-S5: PSSO registration (standard post-enrollment path) | User | On device | "Registration Required" notification appears; user completes PSSO registration (same as A1-S7) | `app-sso platform -s`: REGISTERED |

---

## MVP Definition

### In-Scope for v1.11 (Must Ship)

- [ ] Walkthrough A: Single consolidated scenario doc covering both standard post-enrollment path (A1) and ADE-during-Setup-Assistant path (A2) — ordered stages, per-stage structure, path-divergence table, verification gates, cross-links to existing guides 00/02/07 and L1/L2 runbooks
- [ ] Walkthrough B: Single consolidated scenario doc covering OS-26 in-place migration (B1) and pre-OS-26 fallback (B2) — ordered stages, Kandji/Iru source-side release steps, ABM "Assign Device Management" + Deadline, post-migration PSSO re-registration, cross-links to L2 #30
- [ ] L2 #30: New migration-failure runbook with three failure tracks (deadline lockout, profile-not-delivered, PSSO re-registration stuck); prerequisite: L2 #10 macOS log collection; 00-index.md entry added
- [ ] Glossary entries: MDM Migration, Assign Device Management, Deadline (enrollment), Kandji / Iru rebrand note
- [ ] Navigation integration: docs/index.md, common-issues.md, quick-ref-l2.md, decision-trees/06-macos-triage.md

### Defer to Future Milestones

- [ ] Multi-tenant PSSO: own architectural milestone (per v1.10 precedent)
- [ ] Smart Card PSSO during Setup Assistant: explicitly unsupported by Apple; no doc value until Apple enables it
- [ ] Non-ADE Configurator-enrolled device migration: different 30-day provisional period constraints; small audience

---

## Feature Prioritization Matrix

| Feature | Operator Value | Implementation Cost | Priority |
|---------|---------------|---------------------|----------|
| Walkthrough A ordered stages (both paths) | HIGH | MEDIUM | P1 |
| Walkthrough B ordered stages (OS-26 in-place) | HIGH | HIGH | P1 |
| Kandji/Iru source-side release steps | HIGH | LOW | P1 |
| Post-migration PSSO re-registration coverage | HIGH | MEDIUM | P1 |
| L2 #30 migration-failure runbook | HIGH | HIGH | P1 |
| Verification gates (`app-sso platform -s`) | HIGH | LOW | P1 |
| Path divergence table (A1 vs A2) | MEDIUM | LOW | P2 |
| Pre-migration readiness checklist | MEDIUM | LOW | P2 |
| Deadline-window guidance | MEDIUM | LOW | P2 |
| `last_verified` freshness stamps on OS-26 sections | MEDIUM | LOW | P2 |
| End-user communication callout | LOW | LOW | P3 |
| Managed-apps preservation callout | LOW | LOW | P3 |
| FileVault key rotation note | MEDIUM | LOW | P2 |
| Glossary + navigation integration | HIGH | LOW | P1 |

---

## Dependency Map to Existing Guides (Link-Not-Copy Targets)

| Stage Where Dependency Occurs | Link Target | What to Link |
|-------------------------------|-------------|--------------|
| A1-S1: Enrollment profile | `docs/admin-setup-macos/02-enrollment-profile.md` | Profile settings table; What-breaks callouts for User Affinity, Await Config, Locked Enrollment |
| A1-S2: PSSO policy | `docs/admin-setup-macos/07-platform-sso-setup.md` | Settings Catalog field table; Known Silent Blockers callout (DF-3, DF-9, DF-10); Verification section |
| A1-S3: Company Portal | Guide 07 Step 2 + `docs/admin-setup-macos/02-enrollment-profile.md` | Company Portal version floor; VPP deployment path |
| A1-S4–S7 failures | `docs/l1-runbooks/35-macos-sso-sign-in-failure.md`, `docs/l1-runbooks/36-macos-secure-enclave-key.md`, `docs/l2-runbooks/27-macos-sso-investigation.md` | "Failures at this stage" footer at each stage |
| A2-S3: ADE-during-SA PSSO | Guide 07 Advanced/Optional section | Three-policy rule; recovery procedure (wipe-only) |
| A1/A2 background: ADE lifecycle | `docs/macos-lifecycle/00-ade-lifecycle.md` | Stage 4 (Setup Assistant), Stage 5 (Await Configuration), Stage 6 (Company Portal sign-in) |
| B1-S4: Kandji/Iru console steps | `support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji` | External reference only; do not reproduce; note that Kandji rebranded as Iru in 2026 |
| B1-S9 / B2-S5: PSSO re-registration | Walkthrough A (A1-S6–S8 stages) | Cross-reference: "follow Walkthrough A stages A1-S6 through A1-S8 for PSSO re-registration" |
| All migration failures | `docs/l2-runbooks/30-macos-mdm-migration.md` (NEW) | "Failures at this stage → L2 #30" footer |
| B background: PSSO key behavior | `docs/macos-lifecycle/00-ade-lifecycle.md` Stage 7 "Watch Out For" (PSSO SE key destroyed by MDM password resets) | Link to existing callout for key-destruction behavior; migration is analogous |

---

## Confidence Assessment

| Area | Confidence | Basis |
|------|------------|-------|
| Standard post-enrollment PSSO stages (A1) | HIGH | Microsoft Learn (configure-platform-sso-macos, updated 2026-06-22); guide 07 authoritative source in repo; 00-ade-lifecycle.md stage structure |
| ADE-during-Setup-Assistant path (A2) | HIGH | Microsoft Learn (configure-platform-sso-during-enrollment, updated 2026-06-01); guide 07 Advanced section; confirmed macOS 26 hard gate + CP 5.2604.0 LOB requirement |
| OS-26 in-place migration stages (B1) | HIGH | Apple Support (dep4acb2aa44, official); Microsoft Tech Community blog (confirmed ABM "Assign Device Management" + Deadline mechanics); multiple corroborating MDM vendor analyses |
| Kandji/Iru source-side release steps | MEDIUM | Official Kandji support doc (deleting-a-device-record) confirms Delete Device Record as the only removal method; "Iru" rebrand confirmed at iru.com; OS-26-specific Kandji/Iru integration guidance not yet published in Kandji docs — verify at authoring time |
| PSSO does NOT survive MDM migration (re-registration mandatory) | MEDIUM-HIGH | Confirmed by: (a) WPJ key is Secure Enclave hardware-bound and tenant-specific; (b) existing guide 00-ade-lifecycle.md Stage 7 Watch Out For states MDM-driven password resets destroy SE key; (c) migration to new MDM is equivalent event; (d) Microsoft migration blog references PSSO context; NOT confirmed by a single explicit Microsoft statement "PSSO registration does not survive migration" — flag for authoring-time verification against the Tech Community blog full text |
| Deadline lockout behavior (B1-S7) | HIGH | Apple Support doc explicit: nondismissible full-screen on Mac; daily/hourly/minute escalation cadence; no Cancel after deadline |
| L2 #30 runbook number | HIGH | Existing highest is #29-macos-graph-credential-investigation.md; confirmed by glob of l2-runbooks/ |

---

## Sources

- [Configure Platform SSO for macOS devices — Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos) (updated 2026-06-22)
- [Add Platform SSO policy to ADE Profile on macOS devices — Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment) (updated 2026-06-01)
- [macOS Platform Single Sign-on (PSSO) overview — Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/devices/macos-psso)
- [Overview of Apple Automated Device Enrollment for macOS in Intune](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/overview-automated-enrollment-macos) (updated 2026-04-15)
- [Migrate managed devices to another device management service — Apple Support](https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web)
- [Apple making device migration to Microsoft Intune easy with upcoming OS 26 release — Microsoft Community Hub](https://techcommunity.microsoft.com/blog/intunecustomersuccess/apple-making-device-migration-to-microsoft-intune-easy-with-upcoming-os-26-relea/4439895) (full text not retrieved — ABM UI steps confirmed via multiple corroborating sources)
- [Deleting a Device Record and Uninstalling Kandji — Kandji Support](https://support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji)
- [Apple streamlines MDM migrations in iOS/macOS 26 — SimpleMDM](https://simplemdm.com/blog/apple-streamlines-mdm-migrations-in-ios-26-and-macos-26/)
- [macOS 26 User Driven MDM Migration — Step By Step — Drew Smith, Medium](https://medium.com/@drewsmith_6943/macos-26-user-driven-mdm-migration-step-by-step-82f7438d9aa6)
- [macOS, iOS and iPadOS 26: Seamless Apple Device Management Migration — Addigy](https://addigy.com/blog/os-26-device-management-migration/)
- Existing repo authoritative sources: `docs/macos-lifecycle/00-ade-lifecycle.md`, `docs/admin-setup-macos/07-platform-sso-setup.md`, `docs/admin-setup-macos/02-enrollment-profile.md`, `docs/l2-runbooks/00-index.md`

---

*Feature research for: v1.11 macOS PSSO End-to-End Provisioning & MDM Migration*
*Researched: 2026-06-24*
