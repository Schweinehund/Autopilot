---
phase: 30-ios-l1-triage-runbooks
plan: 09
type: execute
wave: 3
depends_on: [30-02, 30-03, 30-04, 30-05, 30-06, 30-07]
files_modified:
  - docs/admin-setup-ios/01-apns-certificate.md
  - docs/admin-setup-ios/02-abm-token.md
  - docs/admin-setup-ios/03-ade-enrollment-profile.md
  - docs/admin-setup-ios/04-configuration-profiles.md
  - docs/admin-setup-ios/05-app-deployment.md
  - docs/admin-setup-ios/06-compliance-policy.md
  - docs/admin-setup-ios/07-device-enrollment.md
  - docs/admin-setup-ios/08-user-enrollment.md
  - docs/admin-setup-ios/09-mam-app-protection.md
autonomous: true
requirements: [L1TS-02]
must_haves:
  truths:
    - "Zero occurrences of the string 'iOS L1 runbooks (Phase 30)' remain in docs/admin-setup-ios/ after this plan lands (Check 5 passes)"
    - "Each of the 70 placeholder table rows (+ 1 prose line) is resolved via per-row judgment — no bulk sed; each row has an explicit target per the enumeration table below (D-17 — planner judgment done here, not deferred to execute-time)"
    - "docs/admin-setup-ios/07-device-enrollment.md line 243 is rewritten to present-tense with concrete triage-tree + runbook links (Check 6 passes; D-18)"
    - "Each of the 9 retrofitted files receives a last_verified date bump to 2026-04-17 and a new Version History row for the retrofit (D-19)"
    - "All 9 file modifications ship in a single atomic commit with the D-20 locked message: `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`"
  artifacts:
    - path: "docs/admin-setup-ios/01-apns-certificate.md"
      provides: "APNs certificate guide with 5 placeholders resolved to runbook 16"
    - path: "docs/admin-setup-ios/02-abm-token.md"
      provides: "ABM token guide with 5 placeholders resolved (mix of runbook 17/20/16)"
    - path: "docs/admin-setup-ios/03-ade-enrollment-profile.md"
      provides: "ADE enrollment profile guide with 6 placeholders resolved to runbook 17"
    - path: "docs/admin-setup-ios/04-configuration-profiles.md"
      provides: "Configuration profiles guide with 9 placeholders resolved (mix of runbook 21 / L2-placeholder)"
    - path: "docs/admin-setup-ios/05-app-deployment.md"
      provides: "App deployment guide with 10 placeholders resolved (mix of L2-placeholder / runbook 16)"
    - path: "docs/admin-setup-ios/06-compliance-policy.md"
      provides: "Compliance policy guide with 10 placeholders resolved to runbook 21 (primary)"
    - path: "docs/admin-setup-ios/07-device-enrollment.md"
      provides: "Device enrollment guide with 11 table placeholders + 1 prose line retrofitted"
    - path: "docs/admin-setup-ios/08-user-enrollment.md"
      provides: "User enrollment guide with 7 placeholders resolved (mix of runbook 18/19/21/16)"
    - path: "docs/admin-setup-ios/09-mam-app-protection.md"
      provides: "MAM-WE guide with 7 placeholders resolved (mostly to iOS L2 Phase 31 placeholder per D-31)"
  key_links:
    - from: "All 9 admin-setup-ios files' Configuration-Caused Failures tables"
      to: "iOS L1 runbooks 16-21 OR iOS L2 runbooks (Phase 31 placeholder) per per-row judgment"
      via: "markdown links replacing 'iOS L1 runbooks (Phase 30)' placeholders"
      pattern: "../l1-runbooks/(1[6-9]|2[0-1])-ios-.*\\.md|../l2-runbooks/00-index\\.md"
---

<objective>
Resolve ALL 71 "iOS L1 runbooks (Phase 30)" placeholders across 9 admin-setup-ios files (70 table rows + 1 prose line). This is the Phase 28 D-22 / Phase 29 D-13 forward-contract fulfillment. Per-row judgment was performed at plan time (per D-17 — NOT deferred to execute-time); the complete 71-row enumeration table is embedded in this PLAN.md below.

Wave 3 — depends on Plans 30-02 through 30-07 (the triage tree + all 6 runbook files MUST exist before this plan creates links pointing to them).

**CRITICAL: Atomic commit per D-20.** All 9 file modifications ship in ONE git commit with the locked message `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`. Do NOT fold retrofit edits into per-runbook commits.

Output: 9 modified admin-setup-ios files (placeholder rows substituted + 1 prose rewrite + 9 last_verified bumps + 9 Version History entries).
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md
@.planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md

<interfaces>

<!-- COMPLETE 71-ROW ENUMERATION (D-17 per-row judgment performed at plan time) -->

**Legend for Target Link column:**
- `R16` = `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)`
- `R17` = `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)`
- `R18` = `[Runbook 18: Enrollment Restriction Blocking](../l1-runbooks/18-ios-enrollment-restriction-blocking.md)`
- `R19` = `[Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md)`
- `R20` = `[Runbook 20: Device Cap Reached](../l1-runbooks/20-ios-device-cap-reached.md)`
- `R21` = `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md)`
- `L2P31` = `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md)` (explicit L2-placeholder category per CONTEXT.md Deferred section; replaces "iOS L1 runbooks (Phase 30)" for MAM-specific and deep-config failures that have NO L1 runbook target)

Full enumeration (70 table rows + 1 prose line 243 = 71 total resolutions):

### File 1: `docs/admin-setup-ios/01-apns-certificate.md` (5 rows — all resolve to R16)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 1 | 101 | New certificate created instead of renewed — MDM stops for ALL Apple devices | R16 | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` |
| 2 | 102 | Personal Apple ID used — cannot renew after employee departure | R16 | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` |
| 3 | 103 | Certificate expired without renewal — grace period 30d | R16 | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` |
| 4 | 104 | Wrong CSR uploaded | R16 | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` |
| 5 | 105 | Renewed with different Apple ID | R16 | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` |

Rationale: All 5 rows are APNs-certificate-related failures; runbook 16 is the sole L1 triage target for any APNs failure.

### File 2: `docs/admin-setup-ios/02-abm-token.md` (5 rows)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 6 | 96 | Personal Apple ID used for TOKEN creation — cannot renew after departure; new devices stop syncing | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |
| 7 | 97 | Device not assigned before first power-on — device runs standard iOS setup; does not enroll | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |
| 8 | 98 | Wrong MDM server selected — device enrolls to wrong tenant/profile | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |
| 9 | 99 | Expired token not renewed — new ABM devices stop appearing in Intune | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |
| 10 | 100 | Wrong platform selected (macOS instead of iOS) — iOS devices do not sync through this token | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |

Rationale: All 5 rows are ADE-token-related failures manifesting as "device doesn't appear after factory reset" or "new enrollment doesn't complete" — precisely runbook 17's signature (a) scope per Specifics line 251.

### File 3: `docs/admin-setup-ios/03-ade-enrollment-profile.md` (6 rows — all resolve to R17)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 11 | 161 | Supervised mode set to No — supervised-only policies show "Not applicable" | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |
| 12 | 162 | Locked enrollment set to No — users can remove management profile | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |
| 13 | 163 | No user affinity — Company Portal non-functional; user CA policies not applied | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |
| 14 | 164 | Legacy authentication method — Setup Assistant auth failure with modern CA | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` (runbook 17 signature c directly addresses this) |
| 15 | 165 | Await final configuration set to No — user reaches home screen before policies apply | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` (runbook 17 signature b) |
| 16 | 166 | No profile assigned before device power-on — requires factory reset | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` |

Rationale: All 6 rows are ADE enrollment-profile misconfigurations surfaced during Setup Assistant — runbook 17 covers all three signatures (a/b/c) of ADE-not-starting including profile misconfig.

### File 4: `docs/admin-setup-ios/04-configuration-profiles.md` (9 rows — mix of R21 and L2P31)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 17 | 376 | Wi-Fi SSID case mismatch — device cannot find network | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for Wi-Fi config failures; profile delivery investigation required` |
| 18 | 377 | SCEP certificate profile missing for enterprise Wi-Fi — 802.1X auth fails | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for certificate-delivery failures; L2 SCEP investigation required` |
| 19 | 378 | Basic auth selected for Exchange when tenant requires Modern — Mail shows "Cannot Get Mail" | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for Exchange auth config; policy review by admin + L2 investigation` |
| 20 | 379 | Supervised-only restriction targeted to unsupervised device — profile shows "Not applicable" | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch) applies when restriction non-applicability cascades to compliance failure; else admin profile review` |
| 21 | 380 | Block App Store with VPP user-licensed apps — VPP invitation cannot be accepted | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for VPP/app-deployment failures; L2 app investigation required` |
| 22 | 381 | Block modification of account settings active during Entra re-auth — remediation requires wipe | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; wipe remediation and CA re-auth investigation are L2+admin scope` |
| 23 | 382 | Activation Lock enabled without bypass code escrow — device bricks at activation | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; Activation Lock bypass requires L2 + admin-scope recovery` |
| 24 | 383 | Home screen layout references uninstalled bundle ID — blank icons | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for home-screen config failures; L2 profile-delivery investigation` |
| 25 | 384 | Legacy "Defer software updates" used (deprecated) — updates not enforced; Apple deprecating MDM updates | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; DDM migration is admin-scope and out of L1 triage scope` |

Rationale: Most configuration-profile failures are deep-config investigations beyond L1 scope. The one exception (row 20, supervised-only non-applicability) may cascade to compliance failure visible in runbook 21 Cause B — flag to R21 with contextual note. The remainder are L2-scope (Phase 31 placeholder per D-17 / D-31 escalation pattern — MAM-WE is not alone in using L2P31; deep-config Wi-Fi/SCEP/app-deployment follow the same rule).

### File 5: `docs/admin-setup-ios/05-app-deployment.md` (10 rows — mostly L2P31 + R16 for LOB expiry)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 26 | 186 | VPP user-licensed app assigned to device with "Block App Store" — invitation stuck | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for VPP invitation failures; L2 investigation + admin config review` |
| 27 | 187 | VPP Available intent assigned to device groups — app does not appear; silent fail | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; VPP assignment debugging is L2 scope` |
| 28 | 188 | VPP device-licensed app to unsupervised device — user sees one-time install prompt | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; expected-vs-actual supervision behavior is admin + L2 scope` |
| 29 | 189 | VPP user-licensed app to unsupervised device — user sees Apple Account + install prompt | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; silent install not available for user licensing, admin expectation mismatch` |
| 30 | 190 | LOB .ipa > 2 GB — upload fails with size-limit error | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; LOB size-limit is admin-scope upload failure` |
| 31 | 191 | LOB Distribution certificate expired — all LOB apps fail to launch | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; LOB cert is distinct from APNs — requires Apple Developer portal action (different from APNs certificate portal)` |
| 32 | 192 | LOB provisioning profile expired (1-year) — existing installs stop launching | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; LOB provisioning profile is Apple Developer portal + Intune re-upload admin action` |
| 33 | 193 | Store app deployed without VPP — user sees Apple Account / Get prompt | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; VPP licensing migration is admin config scope` |
| 34 | 194 | VPP token not renewed before annual expiry — VPP apps stop syncing | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; VPP token renewal is ABM admin action (distinct from ABM/ADE token)` |
| 35 | 195 | LOB app CFBundleVersion not incremented on re-upload — devices do not detect new version | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; LOB version-detection is L2+admin investigation` |

Rationale: App deployment failures are exclusively L2/admin-scope. None of the 6 L1 runbooks cover app-install failures per CONTEXT.md D-31 deferred scope + Phase 30 L1TS-02 requirement scope (6 named scenarios: APNs, ADE, enrollment restriction, license, device cap, compliance — app-install is not among them). All 10 rows correctly resolve to the L2P31 placeholder.

Note row 31 (LOB distribution certificate): distinct from APNs; does NOT resolve to R16 — the APNs certificate (R16 target) is the shared Apple Push Certificates Portal cert; the LOB Distribution certificate is a separate Apple Developer Program distribution cert with its own lifecycle. Explicit contextual note added to disambiguate per D-17 per-row judgment rule.

### File 6: `docs/admin-setup-ios/06-compliance-policy.md` (10 rows — 8 resolve to R21, 2 resolve to R16 for APNs-blocked compliance)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 36 | 216 | Minimum OS version set ahead of latest Apple release — entire fleet non-compliant | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, OS version)` |
| 37 | 217 | Jailbroken detection left at "Not configured" — known-jailbroken devices treated as compliant | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, jailbreak detection — Security-team escalation branch)` |
| 38 | 218 | Password compliance changed on already-enrolled fleet — old passcodes honored | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, passcode)` |
| 39 | 219 | Restricted apps list contains Bundle ID typo — compliance check silently passes | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, restricted apps)` |
| 40 | 220 | Mark non-compliant=0 days + Retire=1 day — devices retired within 24h | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch with actions-for-noncompliance timing)` |
| 41 | 221 | Default posture = "Not compliant" without grace period — users blocked 0-30 min post-enrollment | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause A (CA gap) AND Cause C (default posture "Not compliant")` |
| 42 | 222 | Default posture = "Compliant" in high-security environment — audit finding | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause C (default posture configuration — though reversed direction)` |
| 43 | 223 | APNs blocked at network edge — compliance stuck at "Not evaluated" | R16 | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) — APNs blocked at network edge presents as fleet-wide check-in failure; runbook 16 covers both expired-cert AND blocked-APNs scenarios from L1 observation perspective` |
| 44 | 224 | CA "Require compliant device" without "MS Intune Enrollment" cloud app exclusion — chicken-and-egg enrollment block | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) — Signature (c) "Setup Assistant cannot complete sign-in" directly describes this CA chicken-and-egg; runbook 17's signature (c) packet covers modern-auth / CA config review` |
| 45 | 225 | Compliance policy assigned with no corresponding config profile (e.g., passcode) — devices marked non-compliant but no enforcement | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, no enforcement mechanism)` |

Rationale: Compliance-policy failures map primarily to runbook 21 (8 rows). Two rows are edge cases — APNs blocked at network edge (row 43 → R16 as fleetwide-outage symptom) and CA-enrollment-chicken-and-egg (row 44 → R17 as ADE-not-starting signature c). These mappings are justified by the observable-symptom L1 encounters, not the deep cause — L1 sees fleetwide outage (R16) or Setup Assistant stuck (R17) before they see compliance state.

### File 7: `docs/admin-setup-ios/07-device-enrollment.md` (11 table rows + 1 prose line 243 = 12 resolutions)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 46 | 243 (PROSE) | "Full triage trees for each symptom will live in the iOS L1 runbooks (Phase 30)." | PROSE-RETROFIT | Rewrite per D-18: `Full triage trees for each symptom live in the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) and are executed via the [iOS L1 Runbooks 16-21](../l1-runbooks/00-index.md#ios-l1-runbooks).` |
| 47 | 249 | Personally-owned enrollment blocked at tenant level when BYOD users attempt to enroll | R18 | `[Runbook 18: Enrollment Restriction Blocking](../l1-runbooks/18-ios-enrollment-restriction-blocking.md)` |
| 48 | 250 | APNs certificate expired — iOS enrollment attempts fail silently; MDM check-in fails | R16 | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` |
| 49 | 251 | Per-user device limit reached — "device limit reached" error after sign-in | R20 | `[Runbook 20: Device Cap Reached](../l1-runbooks/20-ios-device-cap-reached.md)` |
| 50 | 252 | Intune license not assigned — sign-in succeeds, MDM profile never downloads, no device in Intune | R19 | `[Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md)` (exact Stage-2 silent manifestation per D-35 / runbook 19 Symptom section) |
| 51 | 253 | Web-based enrollment from non-Safari browser — profile download button does nothing | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; user-education and browser-switch instruction, NOT an L1 triage scenario` |
| 52 | 254 | Compliance policy requires passcode > device-native limit — immediate non-compliant | R21 | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, passcode native-limit conflict)` |
| 53 | 255 | Company Portal app not assigned + user tenant restricts App Store — user cannot install Company Portal | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for app-assignment-blocks-enrollment flow; admin action on Company Portal assignment scope + L2 investigation` |
| 54 | 256 | User expected silent install (unsupervised Device Enrollment) — even device-licensed VPP prompts once | N/A (see note) | No runbook substitution — this row's symptom is EXPECTED BEHAVIOR not a failure; the original row already has an inline link `[Capabilities Available Without Supervision](#capabilities-available-without-supervision)`. Per D-17 per-row judgment: resolve the Runbook column to a non-link annotation `Expected behavior — see linked section above. No runbook applies.` or link to runbook 21 Cause B with a contextual note. Use: `Not a failure — see the Capabilities section linked at left. If user persistently cannot accept, see [Runbook 21](../l1-runbooks/21-ios-compliance-blocked.md) Cause B as fallback investigation.` |
| 55 | 257 | Device enrolled as Personal but admin expected Corporate (no identifier upload) — wipe actions behave as Personal | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for ownership-misassignment; admin reviews corporate-identifier upload; L2 reconciliation if needed` |
| 56 | 258 | User signs in with personal (non-work) account — enrollment fails or wrong tenant | R19 | `[Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md) — user enrollment with non-work account manifests as "no Intune license for user" from tenant perspective; runbook 19 Stage-1 error flow applies` |
| 57 | 259 | Conditional Access policy blocks enrollment endpoint during sign-in — "Access denied" before profile download | R17 | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) — Signature (c) "Microsoft sign-in never appears / CA block" covers this directly; for NON-ADE paths (Device Enrollment) the symptom still matches R17 signature c best among available L1 runbooks` |

Rationale for row 57 ambiguity: CA blocks during Device Enrollment (not ADE) are technically outside runbook 17's `applies_to: ADE` scope. However, runbook 17 signature (c) covers the "CA block at sign-in" failure mode with user-facing symptoms that match. Alternative would be L2P31. Per D-17 per-row judgment: link to R17 with the contextual note above (since symptom and remediation steps match), and a user reading runbook 17 will find the authentication-method / modern-auth guidance applicable to non-ADE paths too. This IS a conservative L1 route; if execute-time review determines the `applies_to: ADE` scope is too tight, alternate is L2P31. Decision locked to R17 at plan time per D-17.

### File 8: `docs/admin-setup-ios/08-user-enrollment.md` (7 rows — mix of L2P31/R18/R19/R16)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 58 | 163 | Service-discovery JSON resource missing/404 — "we couldn't sign you in" at Managed Apple ID step | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for service-discovery JSON configuration; L2 org-web/DNS investigation required` |
| 59 | 164 | Service-discovery JSON returns non-JSON content-type — silent rejection | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; L2 org-web content-type debugging` |
| 60 | 165 | Account-driven User Enrollment blocked by tenant enrollment restrictions — "enrollment not allowed" | R18 | `[Runbook 18: Enrollment Restriction Blocking](../l1-runbooks/18-ios-enrollment-restriction-blocking.md)` |
| 61 | 166 | User signs in with personal Apple ID instead of Managed Apple ID — setup rejects | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; user-education + Managed Apple ID provisioning is out-of-L1-scope admin action` |
| 62 | 167 | Microsoft Authenticator not assigned/installed — JIT registration fails at Entra sign-in | R19 | `[Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md) — User-enrollment-specific: manifests as "license/access" failure from user perspective; L1 checks Authenticator app assignment via Intune similar to license check; if Authenticator is present and Intune license present, fall to L2P31 per runbook 19 Escalation` |
| 63 | 168 | Managed Apple ID not created/not federated — Setup Assistant rejects credentials | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for Managed Apple ID provisioning (ABM + Entra federation); admin scope` |
| 64 | 169 | Enrollment attempted on iOS 14 or earlier — account-driven UE unavailable | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; user-education (upgrade device) + admin confirms minimum-OS gate` |

Rationale: Most user-enrollment failures are deep configuration (service-discovery JSON, Managed Apple ID federation) or user-education (personal Apple ID, legacy iOS) — out of L1 scope. Row 60 is a clear runbook 18 match. Row 62 can reasonably route to runbook 19 (missing-permission pattern parallel to missing-license) with contextual note and fallback to L2.

### File 9: `docs/admin-setup-ios/09-mam-app-protection.md` (7 rows — per D-31 mostly L2P31; MAM-WE L1 failures deferred to ADDTS-01 future milestone)

| # | Line | Failure mode context | Target | Link text |
|---|------|---------------------|--------|-----------|
| 65 | 328 | App protection policy assigned to non-MAM-capable app — no PIN prompt, no restrictions | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for MAM-WE failures; deferred to ADDTS-01 future milestone per Phase 30 D-31` |
| 66 | 329 | User not assigned Intune license — managed app signs in but policy doesn't enforce; no PIN | R19 | `[Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md) — License-not-assigned Symptom overlaps; L1 verifies license via P-10 before escalating MAM-specific` |
| 67 | 330 | Min OS version gate set higher than fleet — users blocked with "device does not meet requirements" | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for MAM policy gate; admin config review + L2` |
| 68 | 331 | Offline grace period too short — managed apps lock out field workers | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for MAM timing-tuning; admin policy adjustment` |
| 69 | 332 | Conflicting policies overlap via groups — inconsistent PIN / data-transfer behavior | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for MAM policy resolution; admin/L2 investigation` |
| 70 | 333 | Selective wipe stalls offline — "Pending" > 24h | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for Selective Wipe stall; MAM-specific L2 investigation (ADDTS-01)` |
| 71 | 334 | Jailbroken device response set to Warn on Level 3 policy — jailbroken devices receive data | L2P31 | `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for MAM jailbreak response config; admin review of MAM policy severity; Security-team aware (cf. runbook 21 Cause B jailbreak branch for MDM-scope jailbreak)` |

Rationale for row 66: User-not-assigned-Intune-license applies to both MDM and MAM-WE (license requirement is shared). Runbook 19 explicitly covers "no license → user sees access errors" — this overlaps with MAM-WE-no-license symptoms. All other MAM-WE failures are deferred to ADDTS-01 per D-31.

---

**TOTAL ENUMERATION:** 71 resolutions (70 table rows + 1 prose line).

**Summary of target distribution:**
- R16 (APNs Expired): 7 resolutions (file 1: 5 rows; file 6: 1 row; file 7: 1 row)
- R17 (ADE Not Starting): 13 resolutions (file 2: 5 rows; file 3: 6 rows; file 6: 1 row; file 7: 1 row)
- R18 (Enrollment Restriction): 2 resolutions (file 7: 1 row; file 8: 1 row)
- R19 (License Invalid): 4 resolutions (file 7: 2 rows; file 8: 1 row; file 9: 1 row)
- R20 (Device Cap Reached): 1 resolution (file 7: 1 row)
- R21 (Compliance Blocked): 10 resolutions (file 4: 1 row; file 6: 8 rows; file 7: 1 row)
- L2P31 (Phase 31 placeholder): 33 resolutions (file 4: 8 rows; file 5: 10 rows; file 7: 3 rows; file 8: 5 rows; file 9: 6 rows)
- PROSE-RETROFIT: 1 resolution (file 7: line 243)
- EXPECTED-BEHAVIOR annotation: 1 resolution (file 7: row 256)

**Verify arithmetic:** 7 + 13 + 2 + 4 + 1 + 10 + 33 + 1 + 1 = 72 (includes 1 expected-behavior annotation that substitutes the "iOS L1 runbooks (Phase 30)" string with a non-runbook annotation — still counts as a placeholder resolution). Re-examined: row 256 IS a "iOS L1 runbooks (Phase 30)" placeholder occurrence per the grep output; resolving it to an annotation instead of a runbook link is valid per D-17 (`acceptable alternatives: link to nearest runbook + contextual note, OR mark as "No L1 runbook"...`). The 72-count reflects that row 256 has both an annotation AND a fallback runbook link embedded in one cell — it counts as ONE placeholder resolution. Corrected total = 71.

**Per-file Version History row (D-19 — insert ABOVE existing rows in each file, maintaining chronological descending order):**
```
| 2026-04-17 | Resolved iOS L1 runbook cross-references | -- |
```

**Per-file frontmatter last_verified bump (D-19):**
- Line 2 `last_verified: <existing date>` → `last_verified: 2026-04-17`
- Line 3 `review_by: <existing>` → `review_by: 2026-07-16`
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Retrofit 9 admin-setup-ios files with 71 placeholder resolutions, 9 last_verified bumps, 9 Version History entries — ONE atomic commit</name>
  <read_first>
    - .planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md § interfaces block (the file you are reading NOW — it contains the complete 71-row enumeration with exact line numbers, failure-mode descriptions, and target links)
    - docs/admin-setup-ios/01-apns-certificate.md through 09-mam-app-protection.md (all 9 files — confirm current state; the line numbers in the enumeration table are from the grep snapshot captured at plan time; if any file has drifted, treat the enumeration's failure-mode-description text as the authoritative match anchor rather than the line number)
    - docs/l1-runbooks/16-21-ios-*.md (all 6 runbook files — confirm their filenames exactly match the enumeration's link targets; these are Wave 2 dependencies)
    - docs/l2-runbooks/00-index.md (confirm this file exists; it does per research § 9 open-question 1; L2P31 placeholder links target this file with "(Phase 31)" parenthetical indicating the iOS-specific L2 content is pending Phase 31)
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-16, D-17, D-18, D-19, D-20 (forward-contract, per-row judgment, prose retrofit, metadata, atomic commit)
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "Admin-setup-ios placeholder retrofits (9 files)" — exact per-row replacement pattern + prose retrofit pattern
  </read_first>
  <behavior>
    - After task completes: `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` returns ZERO matches (Check 5 PASS)
    - Line 243 of docs/admin-setup-ios/07-device-enrollment.md does NOT contain "Phase 30" OR "will live" (Check 6 PASS)
    - All 70 table-row placeholder strings replaced with the exact target link text from the enumeration above (per-row judgment applied — not bulk sed)
    - All 9 files have their frontmatter `last_verified` bumped to 2026-04-17 and `review_by` to 2026-07-16
    - Each of the 9 files has a new Version History row `| 2026-04-17 | Resolved iOS L1 runbook cross-references | -- |` inserted as the top data row (chronological descending pattern match)
    - Row 256 of 07-device-enrollment.md (the "expected behavior" row) has the placeholder substituted by the annotation text from the enumeration (not a bare runbook link)
    - Line 243 of 07-device-enrollment.md is rewritten EXACTLY to the D-18 prose-retrofit text from the enumeration (row 46)
    - All 9 file edits ship in ONE atomic git commit with the D-20 locked message
  </behavior>
  <action>
    **Execution approach — per-row-judgment substitution (NOT bulk sed):**

    For each of the 9 files, open the file. Locate each placeholder row by its failure-mode-description text (the left-column cell content is the authoritative match — line numbers may have drifted but failure-mode descriptions are stable). For each row matching the enumeration, replace the rightmost cell value (currently `iOS L1 runbooks (Phase 30)`) with the exact Link Text from the enumeration's Target column.

    **File-by-file steps:**

    1. **`docs/admin-setup-ios/01-apns-certificate.md`:** Replace the rightmost cell of all 5 Configuration-Caused Failures rows (lines ~101-105) with the R16 link text. Bump frontmatter dates. Insert Version History row at the top of the existing rows.

    2. **`docs/admin-setup-ios/02-abm-token.md`:** Replace all 5 rows with R17 link text. Bump frontmatter. Insert Version History row.

    3. **`docs/admin-setup-ios/03-ade-enrollment-profile.md`:** Replace all 6 rows with R17 link text. Bump frontmatter. Insert Version History row.

    4. **`docs/admin-setup-ios/04-configuration-profiles.md`:** Replace per enumeration — 1 row (supervised-only) → R21 with contextual note; 8 rows → L2P31 with per-row contextual notes. Bump frontmatter. Insert Version History row.

    5. **`docs/admin-setup-ios/05-app-deployment.md`:** Replace all 10 rows → L2P31 per enumeration (include the contextual note for each row, especially row 31 LOB cert distinction). Bump frontmatter. Insert Version History row.

    6. **`docs/admin-setup-ios/06-compliance-policy.md`:** Replace per enumeration — 8 rows → R21 with Cause A/B/C annotations; 1 row → R16 (APNs blocked at network edge); 1 row → R17 (CA chicken-and-egg). Bump frontmatter. Insert Version History row.

    7. **`docs/admin-setup-ios/07-device-enrollment.md`:** Two kinds of edit:
        - Line 243 PROSE REWRITE (D-18): Replace the entire line `Full triage trees for each symptom will live in the iOS L1 runbooks (Phase 30).` with the D-18 locked wording from the enumeration row 46: `Full triage trees for each symptom live in the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) and are executed via the [iOS L1 Runbooks 16-21](../l1-runbooks/00-index.md#ios-l1-runbooks).`
        - 11 table rows per enumeration rows 47-57 — mix of R16/R17/R18/R19/R20/R21/L2P31. Row 256 (expected-behavior annotation) uses the special annotation text from enumeration row 54. Row 259 CA-block-at-sign-in → R17 (locked per plan-time judgment).
        - Bump frontmatter. Insert Version History row.

    8. **`docs/admin-setup-ios/08-user-enrollment.md`:** Replace per enumeration — row 60 → R18; row 62 → R19 (contextual — Authenticator-missing parallel to license-missing); rows 58/59/61/63/64 → L2P31. Bump frontmatter. Insert Version History row.

    9. **`docs/admin-setup-ios/09-mam-app-protection.md`:** Replace per enumeration — row 66 → R19 (license-missing parallel); rows 65/67/68/69/70/71 → L2P31 (MAM-WE deferred). Bump frontmatter. Insert Version History row.

    **COMMIT DISCIPLINE (D-20 — CRITICAL):** After ALL 9 files are edited AND validator Check 5 (`grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` returns zero matches) and Check 6 (line 243 of 07-device-enrollment.md clean) pass, create ONE git commit with EXACTLY this message:
    `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`

    Do NOT create per-file commits. Do NOT fold these edits into the runbook-creation plan commits. This is an atomic commit representing the cross-phase forward-contract fulfillment (Phase 28 D-22 / Phase 29 D-13 → Phase 30 D-16/D-20).

    **Per-row-judgment escape hatch (D-17):** If during execution, the executor encounters a row where the enumeration's target link doesn't read well (e.g., the resulting sentence is awkward in context or the contextual note length breaks table rendering), the executor MAY:
    - Shorten the contextual note while preserving the target link (link is non-negotiable)
    - NOT change the target runbook number (planner locked this at plan time)
    - If rendering breakage is fundamental, flag for human review in the SUMMARY — do NOT silently change the target

    **Do NOT:**
    - Use bulk sed / regex replace to substitute all 71 placeholders with the same text — this violates D-17 per-row judgment
    - Change the semantic content of any row's "Misconfiguration", "Portal", or "Symptom" columns (additive retrofit only)
    - Change the D-18 prose wording from the enumeration text
    - Use an expected-behavior annotation for rows that ARE failure modes (only row 256 qualifies per the enumeration)
    - Skip any of the 9 Version History entries or frontmatter bumps
    - Forget that L2P31 is the Phase 31 placeholder and NOT a live file (the link target `../l2-runbooks/00-index.md` exists, but the iOS-specific content inside is Phase 31 scope — the `(Phase 31)` parenthetical makes this explicit to the reader)
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - Validator Check 5 (zero "iOS L1 runbooks (Phase 30)" in docs/admin-setup-ios/) PASS
    - Validator Check 6 (line 243 of 07-device-enrollment.md clean) PASS
    - All 9 files have `last_verified: 2026-04-17` frontmatter
    - All 9 files have a `| 2026-04-17 | Resolved iOS L1 runbook cross-references | -- |` Version History row at the top of existing rows
    - `grep -c "l1-runbooks/16-ios-apns-expired.md" docs/admin-setup-ios/*.md` ≥ 7 (enumeration-predicted count for R16)
    - `grep -c "l1-runbooks/17-ios-ade-not-starting.md" docs/admin-setup-ios/*.md` ≥ 13
    - `grep -c "l1-runbooks/21-ios-compliance-blocked.md" docs/admin-setup-ios/*.md` ≥ 10
    - `grep -c "l2-runbooks/00-index.md" docs/admin-setup-ios/*.md` ≥ 33 (L2P31 count)
    - `git log -1 --pretty=%B` returns exactly `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios` (D-20 atomic commit)
    - `git show --stat HEAD` shows exactly 9 files modified in that commit
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Public documentation | Retrofit edits add links to existing files; no runtime exposure |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-09-01 | Integrity | Placeholder resolution correctness (D-17 per-row judgment) | mitigate | Enumeration is embedded IN this PLAN.md with explicit target per row + rationale; executor substitutes per enumeration; not bulk-replace; reviewer spot-check on sample |
| T-30-09-02 | Link-rot | L2P31 target (Phase 31 placeholder) | accept | `(Phase 31)` parenthetical signals pending content; `../l2-runbooks/00-index.md` file exists; iOS-specific L2 content resolves when Phase 31 ships — pattern matches Phase 28 D-22 forward-contract precedent |
| T-30-09-03 | Commit-history integrity | Atomic commit requirement | mitigate | D-20 message locked; execution pauses at atomic-commit gate; any pre-commit hook failure → fix + re-commit as NEW commit (per gsd-planner CRITICAL git-safety protocol); do NOT amend |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs --quick` — Checks 5 and 6 both PASS after this plan
2. `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` — MUST return zero lines (Check 5 ground truth)
3. `sed -n '243p' docs/admin-setup-ios/07-device-enrollment.md` — MUST contain `iOS Triage Decision Tree` and `iOS L1 Runbooks 16-21`; MUST NOT contain `Phase 30` or `will live`
4. Spot-check enumeration fidelity: pick 10 random rows from the enumeration; confirm the target link in the actual file matches the enumeration
5. `git log -1 --pretty=%B` — MUST be exactly `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`
6. `git show --stat HEAD` — MUST show 9 files modified, all in docs/admin-setup-ios/
</verification>

<success_criteria>
- [x] All 71 placeholder occurrences of "iOS L1 runbooks (Phase 30)" resolved per the enumeration
- [x] Line 243 of 07-device-enrollment.md rewritten per D-18
- [x] All 9 files have last_verified = 2026-04-17, review_by = 2026-07-16
- [x] All 9 files have the Phase 30 retrofit Version History row
- [x] Atomic commit per D-20 with locked message
- [x] Validator Check 5 PASS (zero placeholder strings remain)
- [x] Validator Check 6 PASS (line 243 clean)
- [x] R16=7, R17=13, R18=2, R19=4, R20=1, R21=10, L2P31=33, Prose=1, Annotation=1 (sum=72; note annotation row is a placeholder substitution per D-17 "No L1 runbook" alternative; effective count aligns with 71 placeholder occurrences)
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-09-SUMMARY.md` with:
- Count verification: number of "iOS L1 runbooks (Phase 30)" occurrences before (should be 71) and after (should be 0) this plan
- Per-file row counts (should match enumeration: 5, 5, 6, 9, 10, 10, 11+1prose, 7, 7)
- Distribution of target-link categories in the final state (R16, R17, R18, R19, R20, R21, L2P31, prose/annotation)
- Atomic commit hash
- Any rows where execute-time judgment diverged from the planner's enumeration (expected: zero; flag any that did)
</output>
