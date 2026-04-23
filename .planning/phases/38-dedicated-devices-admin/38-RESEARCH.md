# Phase 38: Dedicated Devices Admin — Research

**Researched:** 2026-04-22
**Domain:** Android Enterprise Dedicated (kiosk/COSU) device admin documentation
**Confidence:** HIGH (core stack and FRP table), MEDIUM (MHS exit-PIN error string dual-location nuance, token default expiry behavior)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01** — Persona callout in Key Concepts H2 + 4-row scenario comparison table + `### How to choose` routing paragraph.

**D-02** — Dedicated H2 `## Exit-kiosk PIN synchronization` + inline reminders at both affected settings.

**D-03** — Hybrid orientation paragraph cross-linking Phase 36 + Dedicated-specific deltas inline.

**D-04** — Dedicated-owned H2 `## Android 15 FRP and re-provisioning` covering 3-pathway behavior matrix + cross-link to Phase 36 EFRP config.

**D-05** — LOB Operations Owner = business stakeholder who defines locked app(s); NOT an Intune RBAC role.

**D-06** — Doc-shape lock: 14-section H2 order fixed (frontmatter → platform gate → platform note banner → Key Concepts → Scenarios → Prerequisites → Enrollment profile → Enrollment token → Provisioning method choice → Exit-kiosk PIN synchronization → Android 15 FRP and re-provisioning → What-breaks inline → Renewal/Maintenance → optional For L1 helpdesk agents).

**D-07** — Length envelope target: 3200-4200 words (per-section budget in CONTEXT.md).

**D-08** — 11 mandatory `<a id="...">` anchors: `#audience-and-stakeholders`, `#scenarios`, `#prerequisites`, `#enrollment-profile`, `#enrollment-token`, `#provisioning-method-choice`, `#exit-kiosk-pin-synchronization`, `#exit-kiosk-pin`, `#android-15-frp-reprovisioning`, `#what-breaks`, `#renewal-maintenance`.

**D-09** — Token expiry default + QR rotation discipline in D-03 deltas; MEDIUM-confidence marker if not HIGH-verifiable.

**D-10** — ARCH Q6 Platform note banner mandatory at top of doc (after platform gate, before Key Concepts H2).

**D-11** — KME/ZT Samsung mutual-exclusion one-liner in ZT provisioning callout, cross-linking Phase 35 `#kme-zt-mutual-exclusion`.

**D-12** — Source-confidence markers `[HIGH/MEDIUM/LOW: source, last_verified YYYY-MM-DD]` on: MHS exit-PIN synchronization (H2 canonical marker), verbatim Intune error string, Dedicated FRP 3-pathway behavior, Dedicated default token expiry (if not HIGH-verifiable).

**D-13** — SC5 disambiguation in BOTH scenarios table (User identity model column) AND `### How to choose` routing paragraph.

**D-14** — MHS scope explicit: multi-app + digital signage only; single-app kiosk does NOT use MHS.

**D-15** — Phase 39 ZT extension boundary acknowledged in Provisioning method choice ZT callout.

**D-16** — Research-flag verification protocol: 6 flags verified at plan time; executor re-verifies portal-UI assertions at execute time.

**D-17** — Shared-file modification guard: Phase 38 MUST NOT modify any existing file; only NEW file is `05-dedicated-devices.md`.

**D-18** — Frontmatter: `platform: Android`, `audience: admin`, `applies_to: Dedicated`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD`.

**D-19** — Version-tag discipline per PITFALL 1: every behavioral assertion carries inline version tag. SafetyNet never appears; Play Integrity only.

**D-20** — AEAUDIT-04 audit guards inheritance: zero "SafetyNet", zero "supervision" as Android management term, `last_verified` present, zero Android links in v1.0-v1.3 deferred shared files, source-confidence marker regex satisfied, anchor contract satisfied.

### Claude's Discretion

- Exact word counts within section ranges in D-07 (total target 3200-4200 words).
- Whether to include the optional `## For L1 helpdesk agents` H2 (D-06 step 14).
- Mermaid diagram inclusion.
- D-10 Platform note banner icon convention (⚠️ vs ℹ️).
- Whether D-04 Android 15 FRP H2 opens with the ⚠️ blockquote at top of section.
- Ordering of what-breaks callouts (severity-descending recommended).
- Exact phrasing of per-method constraint callouts in Provisioning method choice section.
- Whether to include a "Portal shorthand reminder" at the top of the doc.
- Whether to nominate sub-anchors for the 4 scenarios.

### Deferred Ideas (OUT OF SCOPE)

- Knox Mobile Enrollment (KME) full admin path — v1.4.1.
- Corporate-scale ZTE content — Phase 39.
- Dedicated L1 triage runbook — Phase 40.
- Dedicated L2 investigation content — Phase 41.
- OEMConfig integration for Dedicated.
- MHS app configuration policy template (JSON).
- Multi-app kiosk app ordering / icon layout customization.
- Lock Task Mode app development guidance.
- Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-reference — Phase 42.
- Cross-platform nav integration (index.md, common-issues.md, quick-refs) — post-v1.4.
- Dedicated FRP behavior matrix per OEM.
- Verbatim Intune error string catalog for Dedicated failures beyond the one MHS exit-PIN string.
- Intune admin center navigation screenshots.
- 4-platform comparison document — v1.5.
- Default token expiry follow-up note — candidate for v1.4.1 if behavioral change risk found.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEDED-01 | Intune admin can provision a Dedicated (kiosk/COSU) device with persona callout (Intune Admin + LOB Operations Owner), scenario overview (single-app / multi-app / digital signage / Entra shared device mode), enrollment profile, and MHS exit-PIN sync requirement documented | D-01 scenario table + D-03 hybrid enrollment-profile orientation + D-02 exit-PIN H2 all verified against MS Learn setup-dedicated (updated 2025-05-08) and MHS app config docs (updated 2026-04-21) |
| AEDED-02 | Intune admin can read a Managed Home Screen exit-PIN synchronization callout explaining that exit-kiosk PIN must match between device restrictions profile and Managed Home Screen app config or the user will hit a visible error | D-02 H2 + inline reminders; verbatim error string verified via Microsoft Q&A (community-sourced, MEDIUM confidence); two-location requirement confirmed in MS Learn MHS app config doc |
| AEDED-03 | Intune admin can read an Android 15 FRP callout in the Dedicated guide describing FRP behavior during factory-reset re-provisioning | D-04 3-pathway matrix; authoritative table verified in MS Learn ref-corporate-methods (updated 2025-12-04); FRP behavior for Dedicated row confirmed HIGH confidence from official source |

</phase_requirements>

---

## Summary

Phase 38 delivers `docs/admin-setup-android/05-dedicated-devices.md` — the Dedicated (kiosk/COSU) mode admin guide. It is the third mode-specific corporate-ownership admin guide in the v1.4 Android Enterprise milestone, extending Phase 36 COBO enrollment-profile mechanics. Structurally it is a hybrid-routing doc (D-01 through D-04 winner patterns from adversarial review): orientation paragraphs route to Phase 36 canonical mechanics for shared content; Dedicated-specific deltas are owned inline. The doc carries two landmark H2 sections not in Phase 36 — the MHS exit-PIN synchronization section (AEDED-02) and the Android 15 FRP re-provisioning section (AEDED-03) — plus the persona + scenario overview (AEDED-01).

**Six research flags** from CONTEXT.md D-16 were verified in this session. Results:

1. **MHS exit-PIN failure pattern** — MEDIUM confidence upheld. MS Learn `setup-dedicated` (updated 2025-05-08) does NOT document the exit-PIN dual-location requirement as a failure callout. The MS Learn MHS app config doc (updated 2026-04-21) documents the "Exit lock task mode password" setting in the MHS app configuration policy, and the device restrictions profile also has a "Leave kiosk mode code" field — but neither document explicitly calls out the mismatch failure. A Microsoft Q&A thread confirms the verbatim error string. MEDIUM-confidence marker required per D-12.

2. **Dedicated device default token expiry** — MEDIUM confidence: no default documented. MS Learn `setup-dedicated` requires the admin to enter a `Token expiration date` (up to 65 years). No "no expiry" option exists for Dedicated tokens (unlike COBO's "Default" token type which never expires). The field appears mandatory — implying Intune uses whatever date the admin enters, with no documented system-supplied default. Plan-time MEDIUM marker required per D-09 / D-12.

3. **Dedicated FRP 3-pathway behavior** — HIGH confidence from MS Learn. The `ref-corporate-methods` page (updated 2025-12-04) contains an authoritative table confirming: Dedicated (COSU) Settings reset = no FRP, Recovery/bootloader reset = FRP applies, Intune wipe = no FRP. This is verbatim from the source.

4. **Intune admin center Dedicated enrollment profile blade path** — MEDIUM confidence: path partially confirmed, UI layer may have changed. MS Learn `setup-dedicated` shows: Devices → Device onboarding → Enrollment → Android tab → Enrollment Profiles → Corporate-owned dedicated devices. STACK.md had "Devices > Enrollment > Android > Enrollment Profiles > Corporate-owned dedicated devices" — the "Device onboarding" intermediate step is a current unified-admin-center restructure. Executor must re-verify at execute time per D-16.

5. **MHS app package ID** — HIGH confidence. MS Learn MHS app config doc (updated 2026-04-21) confirms `com.microsoft.launcher.enterprise` in the JSON example at `"productId": "app:com.microsoft.launcher.enterprise"`.

6. **Verbatim Intune error string for MHS exit-PIN mismatch** — MEDIUM confidence: confirmed via Microsoft Q&A community thread. Verbatim string: "A PIN to exit kiosk mode has not been set by your IT admin". Note: the full displayed text appears to be "Set up PIN. A PIN to exit kiosk mode has not been set by your IT admin" — the "Set up PIN." may be a heading-level label, not part of the error body. MEDIUM-confidence marker required per D-12.

**Primary recommendation:** Write `05-dedicated-devices.md` using the Phase 36 structural analog with 4 Dedicated-specific additions: D-01 persona+scenarios, D-02 exit-PIN H2, D-03 enrollment-profile deltas (4 deltas: token type, MHS app, static device group, token expiry rotation), D-04 FRP re-provisioning H2. The FRP 3-pathway table is now HIGH confidence from MS Learn. Token expiry default remains MEDIUM — label accordingly per D-09.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Persona callout + scenario overview | Single Markdown doc | — | Documentation deliverable; no code tier |
| Enrollment profile creation | Intune admin center (portal) | — | Admin-side configuration; doc describes portal steps |
| MHS exit-PIN synchronization | Device restrictions policy + MHS app config policy | Both must match | Two-policy dependency is the core failure mode; doc owns the callout |
| Android 15 FRP re-provisioning behavior | Google/Android OS (device) | Intune wipe pathway | Behavior is OS-level; admin action is Intune policy assignment (EFRP) via Phase 36 cross-link |
| Kiosk lockdown (Lock Task Mode / MHS) | Android OS | Intune device restrictions profile | OS enforces; Intune pushes policy |
| Entra shared device mode | Microsoft Authenticator app + Entra ID | Intune enrollment token type | Token type selection at enrollment profile creation determines availability |

---

## Research Flag Verification Results

### Flag 1: MHS Exit-PIN Failure Pattern

**Status:** MEDIUM confidence — upheld.

**Finding:** The MS Learn `setup-dedicated` page (ms.date 2025-05-08, updated_at 2026-04-16) does NOT document the exit-PIN mismatch failure mode. The MS Learn MHS app configuration page (ms.date 2026-04-21) documents two related settings:

- In MHS app config policy: `Exit lock task mode password` — "Enter a 4-6-digit code to use to temporarily drop out of lock-task mode for troubleshooting." [VERIFIED: MS Learn configure-managed-home-screen, updated 2026-04-21]
- In device restrictions profile: `Leave kiosk mode code` / `Leave kiosk mode` — "Enter a 4-6 digit numeric PIN." [VERIFIED: device-restrictions-android-enterprise, ms.date 2026-04-21]

The MS Learn MHS doc states these policies "work together" but does NOT explicitly state that mismatch causes the error. Community sources (Microsoft Q&A 2182159, confirmed via search result) provide the verbatim error string.

**Verbatim error string (MEDIUM confidence — Microsoft Q&A community, not MS Learn authoritative):** "A PIN to exit kiosk mode has not been set by your IT admin" (displayed with "Set up PIN." as a preceding label).

**Confidence label required:** `[MEDIUM: MS Q&A community, last_verified 2026-04-22]` on the verbatim error string in D-02 H2. [CITED: learn.microsoft.com/en-us/answers/questions/2182159]

**Implication for D-02:** The H2 can state the dual-location requirement with HIGH confidence (MS Learn confirms two separate policies exist and must be configured together). The specific mismatch failure mode and verbatim error string are MEDIUM. Source-confidence markers per D-12 apply accordingly.

---

### Flag 2: Dedicated Device Default Token Expiry

**Status:** MEDIUM confidence — no documented "no expiry" default for Dedicated tokens.

**Finding:** Unlike COBO, the Dedicated enrollment profile token does NOT have a "Default (no expiry)" token type option. MS Learn `setup-dedicated` shows:

> "Token expiration date: Enter the date you want the token to expire, up to 65 years in the future."

This appears on both the Standard ("Corporate-owned dedicated device (default)") and Entra shared device mode token paths. The MS Learn page does not state what happens if the date field is left blank. No "never expires" option is documented for Dedicated tokens. [VERIFIED: MS Learn setup-dedicated, ms.date 2025-05-08, updated_at 2026-04-16]

**Practical implication:** Admins MUST set an expiry date. The practical upper limit is 65 years. For Dedicated tokens, the QR rotation discipline (D-09) is operationally important: any printed/laminated QR code will fail when the associated token expires. Document as: "Dedicated tokens require an expiry date (up to 65 years). Plan rotation cadence before printing or laminating QR artifacts." `[MEDIUM: no MS Learn statement on default; behavior inferred from UI field description, last_verified 2026-04-22]`

**Contrast with COBO:** Phase 36 COBO "Default" token type does not expire; Phase 36 "Staging" token type is configurable up to 65 years. Dedicated has no equivalent of the "never expires" Default COBO token.

---

### Flag 3: Dedicated FRP 3-Pathway Behavior

**Status:** HIGH confidence — authoritative table found in MS Learn.

**Finding:** MS Learn `ref-corporate-methods` (ms.date 2025-12-04, updated_at 2026-04-16) contains the following table (verbatim):

| Enrollment method | Settings > Factory data reset | Settings > Recovery/bootloader | Intune wipe |
|---|---|---|---|
| Corporate-owned devices with work profile (COPE) | ✅ factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |
| Fully managed (COBO) | ❌ no factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |
| **Dedicated (COSU)** | **❌ no factory reset protection** | **✅ factory reset protection** | **❌ no factory reset protection** |

[VERIFIED: MS Learn ref-corporate-methods, ms.date 2025-12-04, updated_at 2026-04-16]

**Key findings for D-04:**
- Settings > Factory data reset: NO FRP on Dedicated. Safe for routine re-provisioning. (Materially different from COPE.)
- Recovery/bootloader reset: FRP applies. EFRP pre-configuration required.
- Intune wipe: NO FRP. Cleanest pathway when device is online and Intune-managed.

**Confidence upgrade:** This was MEDIUM in FEATURES.md (community-sourced). It is now HIGH from MS Learn authoritative source. The D-04 section opening blockquote should use HIGH confidence marker: `[HIGH: MS Learn ref-corporate-methods, last_verified 2026-04-22]`

**Note for D-04:** The MS Learn page also states: "For corporate owned devices with a work profile running Android 15, you will need to re-enter the Google account associated with the configuration after any reset done via the Settings app." This applies to COPE (not Dedicated), confirming the Dedicated COSU row's "no FRP" for Settings reset is accurate and not gated by Android 15 for Dedicated devices.

---

### Flag 4: Intune Admin Center Dedicated Enrollment Profile Blade Path

**Status:** MEDIUM confidence — navigation restructured in current unified admin center.

**Current path from MS Learn setup-dedicated (updated_at 2026-04-16):**
1. Sign in to [Microsoft Intune admin center](https://go.microsoft.com/fwlink/?linkid=2109431)
2. **Devices** → **Device onboarding** → **Enrollment**
3. **Android** tab
4. **Enrollment Profiles** section → **Corporate-owned dedicated devices**
5. **Create profile**

**Token access path (verified same page):**
1. **Devices** → **Enrollment**
2. **Android** tab
3. **Enrollment Profiles** → **Corporate-owned dedicated devices**
4. Select profile → **Token**

**Navigation variance observed:** The "Create profile" flow goes through **Device onboarding**, while the "Access token" flow goes directly to **Devices → Enrollment**. This reflects the current unified admin center layout where **Device onboarding** is a subsection under Devices. Both paths are documented from the same MS Learn page (ms.date 2025-05-08).

**STACK.md discrepancy:** STACK.md line 74 had "Devices > Enrollment > Android > Enrollment Profiles > Corporate-owned dedicated devices" — the "Device onboarding" intermediate breadcrumb is now present in current MS Learn. This is the Intune console rename the D-16 protocol anticipated.

**Executor action required:** Re-verify the exact navigation at execute time. The URL shortcut `https://go.microsoft.com/fwlink/?linkid=2109431` is stable; the breadcrumb path may shift.

[CITED: MS Learn setup-dedicated, updated_at 2026-04-16]

---

### Flag 5: MHS App Package ID

**Status:** HIGH confidence.

**Finding:** MS Learn MHS app configuration page (ms.date 2026-04-21) confirms at the JSON data example:

```json
"productId": "app:com.microsoft.launcher.enterprise"
```

The package ID `com.microsoft.launcher.enterprise` is confirmed. [VERIFIED: MS Learn configure-managed-home-screen, ms.date 2026-04-21]

---

### Flag 6: Verbatim Intune Error String for MHS Exit-PIN Mismatch

**Status:** MEDIUM confidence — Microsoft Q&A community, not MS Learn authoritative.

**Finding:** Microsoft Q&A thread (ID 2182159, verified 2026-04-22) describes the error as:

> "Set up PIN. A PIN to exit kiosk mode has not been set by your IT admin"

The "Set up PIN." prefix appears to be a heading or dialog title; the body text is "A PIN to exit kiosk mode has not been set by your IT admin."

**MS Learn status:** Neither `setup-dedicated` nor the MHS app config doc contains this verbatim error string. The error occurs at device runtime, not in the admin portal.

**Confidence label for D-02 H2:** `[MEDIUM: MS Q&A community, last_verified 2026-04-22]`

**Action for D-02 body:** Include the verbatim error string as: "If the exit-kiosk PIN is set in only one policy, users see 'A PIN to exit kiosk mode has not been set by your IT admin' at exit attempt." with MEDIUM confidence marker.

---

## Standard Stack (Documentation Deliverable)

This phase produces one Markdown file. There is no software stack. The relevant "stack" is the documentation pattern stack carried from Phases 34-37.

### Documentation Stack

| Pattern | Version/Source | Purpose | Status |
|---------|---------------|---------|--------|
| Admin template | `docs/_templates/admin-template-android.md` (Phase 34) | Structural starting point for `05-dedicated-devices.md` | Retained; all three H4 portals kept (Dedicated supports ZTE) |
| Frontmatter schema | Phase 34 D-14 / Phase 35 D-18 / Phase 36 D-13 / Phase 37 D-15 | `platform`, `audience`, `applies_to`, `last_verified`, `review_by` | Single-string `applies_to: Dedicated` |
| Tri-portal H4 convention | Phase 34 D-16..D-22 | Three sub-sections: Intune admin center / MGP / Zero-Touch portal | All three retained for Dedicated (ZTE support confirmed) |
| Source-confidence markers | Phase 37 D-10/D-11 regex: `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` | MEDIUM-confidence assertions inline | 4 marker locations in Phase 38 (exit-PIN pattern, verbatim error string, FRP table now HIGH, token expiry MEDIUM) |
| HTML-id anchor scaffolding | Phase 36 D-10 (11 anchors in COBO) / Phase 37 D-12 | Stable downstream cross-reference targets | 11 mandatory anchors per D-08 |
| Hybrid routing pattern | Phase 36 D-01 / Phase 36 D-05 | Orientation paragraph → canonical cross-link + inline phase-specific deltas | Applied in D-03 (enrollment profile) and D-04 (FRP re-provisioning) |
| What-breaks inline callouts | Phase 34 D-12 / Phase 35 D-12 / Phase 36 D-11 | Per-setting consequence at point of admin decision | Applied to all configurable settings |
| 60-day review cycle | Phase 34 D-14 / Phase 35 D-18 / Phase 36 D-13 / Phase 37 D-15 | `review_by = last_verified + 60 days` | MHS exit-PIN pattern is highest-drift in Phase 38 |

### Key Source Documents (verified versions)

| Source | URL / Location | ms.date | Phase 38 Use |
|--------|---------------|---------|-------------|
| MS Learn setup-dedicated | learn.microsoft.com/.../setup-dedicated | 2025-05-08 (updated_at 2026-04-16) | Enrollment profile creation steps, token type descriptions, navigation path, device requirements |
| MS Learn ref-corporate-methods | learn.microsoft.com/.../ref-corporate-methods | 2025-12-04 (updated_at 2026-04-16) | Authoritative FRP 3-pathway table (HIGH confidence) |
| MS Learn configure-managed-home-screen | learn.microsoft.com/.../configure-managed-home-screen | 2026-04-21 (updated_at 2026-04-21) | MHS package ID, exit lock task mode password setting, two-policy relationship |
| Phase 36 COBO doc | `docs/admin-setup-android/03-fully-managed-cobo.md` | shipped 2026-04-21 | Cross-link targets: `#enrollment-profile`, `#enrollment-token`, `#android-15-frp`, `#configure-efrp`, `#provisioning-method-choice` |
| Phase 37 BYOD doc | `docs/admin-setup-android/04-byod-work-profile.md` | shipped 2026-04-22 | Source-confidence marker format reference |

---

## Architecture Patterns

### Document Structure (D-06 Shape Lock)

```
05-dedicated-devices.md
├── Frontmatter (platform/audience/applies_to/last_verified/review_by)
├── Platform gate blockquote (→ COBO, BYOD WP, glossary)
├── [Platform note banner: Dedicated ≠ iOS Shared iPad ≠ Windows Shared PC]
├── ## Key Concepts
│   ├── ### Audience and stakeholders [<a id="audience-and-stakeholders">]
│   └── ### Terminology (cross-platform callouts per D-19 + Phase 34 D-10 pattern)
├── ## Scenarios [<a id="scenarios">]
│   └── ### How to choose (SC5 disambiguation)
├── ## Prerequisites [<a id="prerequisites">]
├── ## Enrollment profile [<a id="enrollment-profile">]
│   └── [Hybrid orientation → Phase 36 canonical + Dedicated-specific deltas (4 deltas)]
├── ## Enrollment token [<a id="enrollment-token">]
├── ## Provisioning method choice [<a id="provisioning-method-choice">]
│   └── [QR / NFC / afw#setup / Zero-Touch — with KME/ZT callout + Phase 39 boundary]
├── ## Exit-kiosk PIN synchronization [<a id="exit-kiosk-pin-synchronization">]
│   └── [<a id="exit-kiosk-pin"> sub-anchor]
├── ## Android 15 FRP and re-provisioning [<a id="android-15-frp-reprovisioning">]
├── [## What-breaks inline per setting — not a standalone H2] [<a id="what-breaks">]
├── ## Renewal / Maintenance [<a id="renewal-maintenance">]
└── ## For L1 helpdesk agents (OPTIONAL — planner discretion)
```

### 4-Scenario Mapping to Intune Settings

Verified from FEATURES.md + STACK.md + MS Learn:

| Scenario | Locking style | Token type | User identity model | Intune kiosk mode setting |
|----------|--------------|-----------|---------------------|--------------------------|
| Single-app kiosk | Android Lock Task Mode (one app pinned) | Standard | No user identity | Device restrictions > Kiosk mode > Single-app |
| Multi-app kiosk (MHS) | Managed Home Screen launcher (`com.microsoft.launcher.enterprise`) | Standard | No user identity | Device restrictions > Kiosk mode > Multi-app + MHS app config policy |
| Digital signage (userless) | MHS or Lock Task Mode; screen-saver mode | Standard | No user identity | Device restrictions > Kiosk mode > Multi-app + MHS screensaver config |
| Entra shared device mode | MHS with sign-in enabled | "Corporate-owned dedicated device with Microsoft Entra ID shared mode" | Per-user Entra sign-in/sign-out | MHS app config > Enable sign in: True + Entra shared device mode token |

[VERIFIED: MS Learn setup-dedicated; MS Learn configure-managed-home-screen; FEATURES.md lines 234-256]

### MHS Two-Policy Architecture

The MHS exit-PIN requires configuration in TWO separate Intune policies:

1. **Device Restrictions profile** (Devices → Configuration → Create profile → Android Enterprise → Fully managed, dedicated, and corporate-owned work profile — Device restrictions):
   - Setting: **Leave kiosk mode** (Enable) + **Leave kiosk mode code** (4-6 digit numeric PIN)

2. **MHS App Configuration policy** (Apps → Configuration → Managed devices → Android → Managed Home Screen):
   - Setting: **Exit lock task mode password** (4-6 digit code)
   - JSON key: inferred from MHS doc structure (not a separate key named "exit_kiosk_pin" — the "Exit lock task mode password" field shown in the MHS config table)

Both must be set to the same value. Mismatch → runtime error on device. [VERIFIED: MS Learn configure-managed-home-screen, ms.date 2026-04-21 for MHS app config policy setting; MEDIUM for mismatch = error mapping per community Q&A]

### Phase 36 Anchor Stability (Verified by Grep)

All Phase 36 anchors required by Phase 38 are confirmed present in shipped `03-fully-managed-cobo.md`:

| Anchor | Line | Status |
|--------|------|--------|
| `#enrollment-profile` | 68 | VERIFIED |
| `#enrollment-token` | 99 | VERIFIED |
| `#provisioning-method-choice` | 127 | VERIFIED |
| `#android-15-frp` | 168 | VERIFIED |
| `#configure-efrp` | 177 | VERIFIED |
| `#cope-migration` | 57 | VERIFIED |
| `#what-breaks` | 197 | VERIFIED |
| `#renewal-maintenance` | 218 | VERIFIED |

### Phase 35 Anchor Stability (Verified by Grep)

All Phase 35 anchors required by Phase 38 are confirmed present in shipped docs:

| Anchor | File | Line | Status |
|--------|------|------|--------|
| `#bind-mgp` | 01-managed-google-play.md | 80 | VERIFIED |
| `#kme-zt-mutual-exclusion` | 02-zero-touch-portal.md | 119 | VERIFIED |
| `#link-zt-to-intune` | 02-zero-touch-portal.md | 56 | VERIFIED |
| `#dpc-extras-json` | 02-zero-touch-portal.md | 88 | VERIFIED |

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FRP 3-pathway table | Hand-written comparison matrix | Reference MS Learn `ref-corporate-methods` table verbatim + cite source | MS Learn owns the authoritative table; duplicating creates drift surface |
| EFRP config steps | Repeating EFRP configuration steps in Phase 38 | Cross-link Phase 36 `#configure-efrp` | Phase 36 D-05 "no pre-empting" guard; Phase 36 owns EFRP config canonical content |
| Provisioning method matrix | Embedding per-method version support table | Cross-link Phase 34 `02-provisioning-methods.md` (Dedicated filtered row) | Anti-Pattern 1 guard: matrices live in single canonical reference docs |
| Enrollment token mechanics | Describing token lifecycle, revoke/replace/export | Cross-link Phase 36 `#enrollment-token` for general mechanics | Phase 36 owns canonical token mechanics; Phase 38 owns only Dedicated-specific deltas |
| Glossary term definitions | Defining "Dedicated device", "COSU", "MHS", "Lock Task Mode", "Entra shared device mode" inline | Cross-link `_glossary-android.md` anchors per D-19 first-use rule | Phase 34 owns all Android glossary content |
| Android version matrix | Repeating version breakpoints | Cross-link Phase 34 `03-android-version-matrix.md#android-15-breakpoint` | Phase 34 owns version matrix narrative |

---

## Common Pitfalls

### Pitfall 1: MHS Exit-PIN Dual-Location Requirement (Top Repeated Escalation)

**What goes wrong:** Admin configures the exit kiosk PIN in the Device Restrictions profile but not in the MHS app configuration policy (or vice versa). At device runtime, when an admin presses the back button repeatedly to exit kiosk mode and enters the PIN, the device shows "A PIN to exit kiosk mode has not been set by your IT admin."

**Why it happens:** The exit-kiosk PIN requirement spans two separate Intune policies. The Device Restrictions profile controls Lock Task Mode behavior; the MHS app configuration policy controls the MHS launcher behavior. Both policies must be set to the same 4-6 digit PIN. Administrators who only configure one of the two policies create a silent misconfiguration that only surfaces at runtime.

**How to avoid:** D-02 H2 + inline reminders at both settings. Inline reminder at the Device Restrictions setting cross-links to `#exit-kiosk-pin-synchronization`; inline reminder at the MHS app config setting cross-links to same anchor.

**Warning signs:** Admin reports device shows "PIN not set" error even though PIN was configured.

[MEDIUM: MS Q&A community, last_verified 2026-04-22]

### Pitfall 2: Android 15 FRP Behavior for Dedicated vs COBO (Different Tables)

**What goes wrong:** Admin uses COBO FRP behavior assumptions for Dedicated devices. COBO: Settings reset = no FRP, Recovery = FRP applies, Intune wipe = no FRP (same as Dedicated for this row). However, COPE devices have FRP on Settings reset — and COBO/Dedicated do NOT have FRP on Settings reset. The cross-mode FRP table in `ref-corporate-methods` is the authoritative source.

**Why it happens:** Dedicated devices are often re-provisioned via Settings reset (the safest for routine kiosk re-use). Admins who incorrectly assume FRP applies to Settings reset on Dedicated may over-configure EFRP or follow wrong procedures.

**How to avoid:** D-04 H2 shows the 3-pathway breakdown explicitly; section-level version tag "Applies to Android 15+"; cross-link to Phase 36 `#configure-efrp` for EFRP config.

**Note:** The MS Learn `ref-corporate-methods` table DOES NOT have Android-15-specific framing for the Dedicated COSU row (unlike the COPE row which has an Android 15 note). The "no FRP on Settings reset" behavior for Dedicated appears to be baseline behavior, not an Android 15 change. The section-level "Applies to Android 15+" version tag in D-04 refers to the FRP hardening context (EFRP enforcement after recovery reset on Android 15 devices), not to the Settings-reset-no-FRP behavior.

[HIGH: MS Learn ref-corporate-methods, last_verified 2026-04-22]

### Pitfall 3: Token Expiry on Dedicated vs COBO (Different Default Semantics)

**What goes wrong:** Admin assumes Dedicated tokens work like COBO "Default" tokens (never expire). Dedicated tokens ALWAYS have an expiry date — there is no "never expires" option. Admins who set a short expiry (e.g., 1 year) and then print/laminate QR codes will have inoperative QR codes after expiry.

**Why it happens:** COBO has a distinct "Default (never expires)" token type; Dedicated has only one token type per scenario with a required expiry date. The distinction is not prominent in current admin UI.

**How to avoid:** D-09 QR rotation discipline in D-03 enrollment-profile deltas. What-breaks callout: "Token expiry rotation breaks any printed/laminated/posted QR enrollment artifacts. When rotating tokens, generate new QR + redistribute to all field locations."

[MEDIUM: no MS Learn statement on default; behavior inferred from UI field description, last_verified 2026-04-22]

### Pitfall 4: Audience Mismatch — Writing for MDM Admin Only (PITFALL 7)

**What goes wrong:** Dedicated doc jumps directly to Intune steps without persona callout or scenario overview. LOB Operations Owner (warehouse floor manager, retail ops lead, signage operations lead) cannot use the doc independently.

**How to avoid:** D-01 persona callout + scenario overview MANDATORY before any Intune steps per PITFALL 7 enforcement. Scenario table with 4 rows + routing paragraph distinguishes when each scenario applies.

### Pitfall 5: Wrong Token Type for Entra Shared Device Mode (SC5 Risk)

**What goes wrong:** Admin wants multi-shift sign-in (each shift worker signs in as themselves) but selects Standard token type and configures multi-app kiosk with MHS. Result: no per-user identity capability; all users share the same device account.

**How to avoid:** D-13 disambiguation in BOTH scenario table (User identity model column) AND `### How to choose` routing paragraph. Explicit phrasing: "Multi-app kiosk = curated app set on a device with no per-user identity. Entra shared device mode = curated app set on a device where multiple workers sign in/out with their own Entra credentials."

### Pitfall 6: MHS App Not Assigned as Required

**What goes wrong:** Multi-app kiosk scenario configured with a device restrictions profile for multi-app kiosk mode, but the Managed Home Screen app (`com.microsoft.launcher.enterprise`) is not assigned as Required to the device group. Device boots to standard Android launcher; no kiosk lockdown applied.

**How to avoid:** D-03 enrollment-profile delta for MHS app config requirement: "MHS app MUST be assigned as Required to the device group." What-breaks callout inline.

[VERIFIED: MS Learn setup-dedicated (apps must have Required assignment); FEATURES.md line 241]

### Pitfall 7: Static vs Dynamic Device Group (Token-Check Enrollment Failures)

**What goes wrong:** Admin uses a dynamic Entra device group for enrollment-time grouping with the Standard dedicated token. During burst provisioning (multiple devices enrolling simultaneously), dynamic group membership lags behind enrollment — token-check failures occur for devices not yet in the group.

**How to avoid:** D-03 enrollment-profile delta: "Static Entra device group required for enrollment-time grouping. Dynamic groups lag during burst provisioning." What-breaks callout inline. Note: the MS Learn page shows enrollment-time grouping under "Select **Search by group name**. Then find and select a **static** Microsoft Entra device group." [VERIFIED: MS Learn setup-dedicated, updated_at 2026-04-16]

---

## Code Examples

This is a documentation-only phase. The "code examples" are documentation pattern templates from Phase 36/37, applied in Phase 38.

### D-02 H2 Pattern (Exit-kiosk PIN synchronization)

```markdown
<a id="exit-kiosk-pin-synchronization"></a><a id="exit-kiosk-pin"></a>
## Exit-kiosk PIN synchronization

> ⚠️ **Multi-app kiosks and digital signage:** the exit-kiosk PIN MUST be configured
> identically in both the device restrictions profile AND the Managed Home Screen app
> configuration. Mismatch causes a visible error at kiosk exit attempt — the top
> repeated-escalation pattern for Dedicated devices.
> `[MEDIUM: MS Q&A community, last_verified YYYY-MM-DD]`

[~120 words body: explains two locations, failure mode, verbatim error string with MEDIUM marker, remediation]
```

### D-03 Orientation Paragraph Pattern

```markdown
<a id="enrollment-profile"></a>
## Enrollment profile

Dedicated profile creation follows the same Intune flow as Fully Managed (COBO) —
see [Phase 36 enrollment profile section](03-fully-managed-cobo.md#enrollment-profile)
for the canonical step-by-step (Devices → Device onboarding → Enrollment → Android tab
→ Enrollment Profiles → Corporate-owned dedicated devices). The Dedicated-specific
deltas below explain what differs.

[~280 words: 4 deltas inline]
```

### D-04 H2 Pattern (Android 15 FRP and re-provisioning)

```markdown
<a id="android-15-frp-reprovisioning"></a>
## Android 15 FRP and re-provisioning

> **Applies to Android 15+**
>
> ⚠️ Dedicated devices are typically re-provisioned (factory reset + re-enroll),
> not re-enrolled in place. On Android 15, FRP behavior depends on which reset
> pathway you use. `[HIGH: MS Learn ref-corporate-methods, last_verified YYYY-MM-DD]`

[3-pathway breakdown with what-breaks per pathway; closing cross-links to Phase 36 #configure-efrp and Phase 34 #android-15-breakpoint]
```

### Source-Confidence Marker Format (Phase 37 D-11 Regex)

```
[HIGH: MS Learn ref-corporate-methods, last_verified 2026-04-22]
[MEDIUM: MS Q&A community, last_verified 2026-04-22]
[MEDIUM: no MS Learn statement; behavior inferred, last_verified 2026-04-22]
```

Regex verified: `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact on Phase 38 |
|--------------|------------------|--------------|---------------------|
| COBO/Dedicated FRP community-sourced behavior | MS Learn `ref-corporate-methods` authoritative FRP table | 2025-12-04 (ms.date) | FRP 3-pathway claims now HIGH confidence, not MEDIUM |
| "SafetyNet" attestation | "Play Integrity" attestation | January 2025 (Google API sunset) | Phase 38 MUST NOT use "SafetyNet"; Phase 41 L2 investigation owns Play Integrity verdict |
| "COPE" (Corporate-Owned Personally-Enabled) | "WPCO" (Work Profile on Corporate-Owned) — still functional but not the forward path | Android 11 (NFC/afw#setup COPE paths removed) | Phase 36 owns COPE migration note; Phase 38 does not carry COPE content |
| Intune unified admin center navigation (`Devices > Enrollment`) | `Devices > Device onboarding > Enrollment` (intermediate breadcrumb added) | 2025-2026 admin center restructure | Executor must re-verify navigation at execute time per D-16 |
| MHS exit-PIN mismatch = undocumented failure | MHS doc acknowledges two-policy relationship; community confirms mismatch error | 2026-04-21 MHS doc update | MEDIUM confidence upheld; dual-location requirement is now documented in MS Learn even if mismatch error is community-sourced |

**No deprecated content:**
- MS Learn `setup-dedicated` updated_at 2026-04-16 — current, no deprecated items found.
- MS Learn `configure-managed-home-screen` ms.date 2026-04-21 — current. Android Device Administrator (DA) deprecation notice present but does not affect Dedicated (which uses Android Enterprise, not DA). DA deprecation notice is informational; Phase 38 doc targets Android Enterprise only.

---

## Runtime State Inventory

> Not applicable — this is a greenfield documentation phase. Phase 38 creates ONE new file (`docs/admin-setup-android/05-dedicated-devices.md`). No existing files are modified. No runtime state to migrate.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Dedicated token expiry default — no "never expires" option; field requires admin-set date | Flag 2 / D-09 | If Intune has a hidden "no expiry" default, the token rotation guidance is over-conservative (low-harm) but the MEDIUM confidence marker would be incorrect (should be HIGH). |
| A2 | MHS exit-PIN mismatch causes the verbatim error string "A PIN to exit kiosk mode has not been set by your IT admin" | Flag 6 / D-02 | If error string changed in a recent MHS app update, documentation would cite a stale verbatim string. Executor should verify by testing in a lab environment if possible. |
| A3 | Dedicated token navigation path: "Devices → Device onboarding → Enrollment → Android → Corporate-owned dedicated devices" | Flag 4 | Intune console renames frequently; executor must re-verify. Wrong navigation path blocks admin from finding the enrollment profile creation UI. |
| A4 | Single-app kiosk does NOT use MHS; uses Lock Task Mode directly | D-14 / FEATURES.md | If Microsoft changed MHS behavior to also apply to single-app kiosk, the D-14 scope exclusion would be incorrect. Low risk — MS Learn setup-dedicated confirms dedicated device app assignments as Required only. |

**Assumptions table is not empty:** 4 claims tagged ASSUMED. Items A1-A3 are the highest risk. A3 requires executor re-verification at execute time per D-16.

---

## Open Questions

1. **Does the Intune admin UI show "no expiry" as an option for Dedicated tokens?**
   - What we know: MS Learn setup-dedicated only documents an expiry date field (up to 65 years); no "never expires" option documented.
   - What's unclear: Whether the Intune admin center UI shows a "no expiry" option that is simply not documented in MS Learn.
   - Recommendation: Executor verify by navigating to Devices → Enrollment → Android → Corporate-owned dedicated devices → Create profile in the actual Intune tenant. If "no expiry" option exists, upgrade to HIGH confidence. If not, MEDIUM marker applies per D-09.

2. **Is the MHS exit-PIN error string present in the current MHS app version?**
   - What we know: Microsoft Q&A thread (2182159) confirmed the string "A PIN to exit kiosk mode has not been set by your IT admin" as of the thread date.
   - What's unclear: Whether recent MHS app updates changed the error string or made PIN configuration merge into a single location.
   - Recommendation: Executor verify by testing in a lab dedicated device with deliberate PIN mismatch if a test environment is available. Otherwise, MEDIUM marker remains; flagged for 60-day review cycle.

3. **Does the D-04 FRP table apply to ALL Dedicated devices or only Android 15 devices?**
   - What we know: The MS Learn ref-corporate-methods table does NOT have Android 15 specificity on the Dedicated COSU row (unlike the COPE row). The D-04 section opens with "Applies to Android 15+" per CONTEXT D-04 design.
   - What's unclear: Whether the Settings-reset-no-FRP behavior for Dedicated is baseline Android Enterprise behavior (not Android 15 specific) or only applies on Android 15.
   - Recommendation: The D-04 section-level version tag "Applies to Android 15+" should be qualified: the 3-pathway table applies to all Dedicated devices enrolled in Android Enterprise; the Android 15 significance is that recovery/bootloader reset FRP behavior intensified (EFRP pre-configuration is now essential). Frame it as: "On Android 15, FRP behavior depends on which reset pathway you use — and the recovery/bootloader path now requires EFRP pre-configuration." The Settings-reset-no-FRP behavior exists on pre-Android-15 Dedicated devices too; it is not an Android 15 change.

---

## Environment Availability

> SKIPPED — this is a documentation-only phase. No external tools, runtimes, or services are required beyond a text editor and git. All referenced anchors in Phase 35 and Phase 36 docs are verified present in the local repository.

---

## Validation Architecture

> `workflow.nyquist_validation` is absent in `.planning/config.json` — treated as enabled. However, this is a single-file documentation phase (no code). Validation is structural (anchor verification, word count, frontmatter schema, AEAUDIT-04 grep checks) rather than automated test execution.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — documentation validation via grep/manual audit |
| Config file | none |
| Quick run command | `grep -n '<a id="' docs/admin-setup-android/05-dedicated-devices.md` |
| Full suite command | Phase 42 milestone audit (AEAUDIT-04) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AEDED-01 | Persona callout (Intune Admin + LOB Ops Owner) + scenario table + enrollment profile present | Structural review | `grep -n "audience-and-stakeholders\|scenarios\|enrollment-profile" docs/admin-setup-android/05-dedicated-devices.md` | ❌ Wave 0 |
| AEDED-02 | Exit-kiosk PIN synchronization H2 with MEDIUM confidence marker | Structural review | `grep -n "exit-kiosk-pin-synchronization\|MEDIUM" docs/admin-setup-android/05-dedicated-devices.md` | ❌ Wave 0 |
| AEDED-03 | Android 15 FRP re-provisioning H2 with 3-pathway breakdown | Structural review | `grep -n "android-15-frp-reprovisioning" docs/admin-setup-android/05-dedicated-devices.md` | ❌ Wave 0 |
| AEAUDIT-04 | Zero "SafetyNet", zero "supervision" as Android management term, `last_verified` present | Automated grep audit | `grep -n "SafetyNet\|supervision" docs/admin-setup-android/05-dedicated-devices.md` (should return no results except in cross-ref notes) | ❌ Wave 0 |

### Wave 0 Gaps

- [ ] `docs/admin-setup-android/05-dedicated-devices.md` — covers AEDED-01, AEDED-02, AEDED-03 (entire Phase 38 deliverable; created in Wave 1)
- [ ] Anchor verification: `grep -n '<a id="' docs/admin-setup-android/05-dedicated-devices.md | wc -l` should return ≥ 11 (D-08 mandatory anchors)

---

## Security Domain

> `security_enforcement` is absent in `.planning/config.json` — treated as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | Partial | Entra shared device mode token type (Microsoft Authenticator); documented as admin-side policy choice, not implemented code |
| V3 Session Management | No | Documentation phase; no session management code |
| V4 Access Control | Partial | RBAC / scope tags in Intune (described as admin-side configuration guidance) |
| V5 Input Validation | No | Documentation phase; no user input |
| V6 Cryptography | No | Documentation phase; no crypto |

### Known Threat Patterns for Dedicated Device Admin Guide

| Pattern | STRIDE | Standard Mitigation (documented in Phase 38 guide) |
|---------|--------|---------------------|
| QR code interception | Information Disclosure | QR contains enrollment token in plaintext; treat as secret artifact; do not email or post publicly |
| Enrollment token exposure | Elevation of Privilege | Revoke token immediately if accidentally shared; rotation after accidental exposure |
| Unauthorized kiosk exit | Elevation of Privilege | Exit-kiosk PIN synchronization (D-02 H2); MEDIUM-confidence pin pattern documented |
| Device stolen post-reset without EFRP | Spoofing | Recovery reset without EFRP pre-config → device lockout OR unauthorized access; D-04 pathway 2 what-breaks callout |

### AEAUDIT-04 Security Guards

Phase 38 MUST satisfy all four AEAUDIT-04 checks:
1. Zero "SafetyNet" occurrences (replaced by Play Integrity per Google January 2025 deprecation)
2. Zero uses of "supervision" as an Android management term (iOS-specific; Android uses "fully managed")
3. `last_verified` frontmatter present
4. Zero Android links in deferred shared files (Phase 38 does NOT modify any v1.0-v1.3 shared files per D-17)

---

## Sources

### Primary (HIGH confidence)

- MS Learn `setup-dedicated` (learn.microsoft.com/.../setup-dedicated) — ms.date 2025-05-08, updated_at 2026-04-16. Enrollment profile creation steps, navigation path, token type descriptions, device requirements (Android 8.0+), apps-must-be-Required rule.
- MS Learn `ref-corporate-methods` (learn.microsoft.com/.../ref-corporate-methods) — ms.date 2025-12-04, updated_at 2026-04-16. Authoritative FRP 3-pathway table (COSU row: Settings reset = no FRP, Recovery/bootloader = FRP applies, Intune wipe = no FRP).
- MS Learn `configure-managed-home-screen` (learn.microsoft.com/.../configure-managed-home-screen) — ms.date 2026-04-21, updated_at 2026-04-21. MHS app package ID `com.microsoft.launcher.enterprise`, "Exit lock task mode password" setting documentation, two-policy architecture description.
- Phase 36 `docs/admin-setup-android/03-fully-managed-cobo.md` — shipped 2026-04-21. Anchor stability verified (8 anchors confirmed by grep): `#enrollment-profile` (L68), `#enrollment-token` (L99), `#provisioning-method-choice` (L127), `#android-15-frp` (L168), `#configure-efrp` (L177), `#cope-migration` (L57), `#what-breaks` (L197), `#renewal-maintenance` (L218).
- Phase 35 `docs/admin-setup-android/02-zero-touch-portal.md` — shipped 2026-04-22. `#kme-zt-mutual-exclusion` (L119), `#link-zt-to-intune` (L56), `#dpc-extras-json` (L88) — all verified.
- Phase 35 `docs/admin-setup-android/01-managed-google-play.md` — shipped 2026-04-22. `#bind-mgp` (L80) — verified.

### Secondary (MEDIUM confidence)

- MS Q&A thread 2182159 (learn.microsoft.com/en-us/answers/questions/2182159/) — Verbatim MHS exit-kiosk PIN error string: "A PIN to exit kiosk mode has not been set by your IT admin". Verified 2026-04-22. Community source with Microsoft platform, not authoritative documentation.
- FEATURES.md lines 216-266 — v1.4 Android Enterprise research (2026-04-19). Mode 4 Dedicated full coverage. HIGH confidence per MS Learn `setup-dedicated` (2025-05-08) and `ref-corporate-methods` (2025-12-04); MHS PIN failure pattern MEDIUM.

### Tertiary (LOW confidence)

- None — all critical claims in this research are either HIGH (MS Learn) or MEDIUM (community-sourced but corroborated).

---

## Metadata

**Confidence breakdown:**
- FRP 3-pathway behavior: HIGH — upgraded from MEDIUM; verbatim authoritative table in MS Learn `ref-corporate-methods` (2025-12-04).
- MHS exit-PIN failure pattern: MEDIUM — no MS Learn authoritative source for mismatch = error; community Q&A only.
- Verbatim MHS error string: MEDIUM — community Q&A, not MS Learn.
- MHS package ID: HIGH — MS Learn configure-managed-home-screen JSON example (2026-04-21).
- Token expiry default: MEDIUM — no documented "no expiry" option; field appears mandatory; cannot verify without live Intune tenant access.
- Admin center navigation path: MEDIUM — path verified from MS Learn but console renames frequently; executor must re-verify.
- Phase 35/36 anchor stability: HIGH — verified by grep against shipped files.
- Document structure patterns: HIGH — verified against Phase 36/37 shipped docs and Phase 34 template.

**Research date:** 2026-04-22
**Valid until:** 2026-06-21 (60-day review cycle; MHS exit-PIN MEDIUM claims are highest drift)

**Key confidence upgrade vs CANDIDATES/FEATURES.md:** FRP 3-pathway behavior upgraded from MEDIUM to HIGH. All other research flags maintained at same confidence level or unchanged. No new HIGH-confidence blockers discovered. Phase 38 is clear to plan.
