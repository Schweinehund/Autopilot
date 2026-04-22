---
phase: 37
created: 2026-04-22
---

# Phase 37 — Pattern Map

**Mapped:** 2026-04-22
**Files analyzed:** 5 (2 new docs + 3 planning-artifact corrections)
**Analogs found:** 4 / 5 (1 new-tier file has no direct precedent)

---

## File-to-Analog Table

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/admin-setup-android/04-byod-work-profile.md` | mode-specific admin guide | request-response (admin reads → configures portal) | `docs/admin-setup-android/03-fully-managed-cobo.md` | exact (sibling file, same directory, same phase family) |
| `docs/end-user-guides/android-work-profile-setup.md` | end-user self-enrollment guide | request-response (user reads → acts on device) | `docs/admin-setup-ios/08-user-enrollment.md` (structural only; audience diverges) | partial (BYOD/privacy-boundary concept match; admin-audience mismatch) |
| `.planning/STATE.md` | planning artifact | — | n/a (line correction) | exact (before/after diff below) |
| `.planning/research/SUMMARY.md` | planning artifact | — | n/a (line corrections) | exact (before/after diffs below) |
| `.planning/ROADMAP.md` | planning artifact | — | n/a (line correction) | exact (before/after diff below) |

---

## Per-File Analog Details

---

### 1. `docs/admin-setup-android/04-byod-work-profile.md` (NEW)

**Role:** Mode-specific Android Enterprise admin guide. 14 H2 sections (D-12 locked order). Target 3000–4000 words.

**Primary analog:** `docs/admin-setup-android/03-fully-managed-cobo.md` (Phase 36, shipped 2026-04-22)

**Secondary analog:** `docs/admin-setup-ios/08-user-enrollment.md` (iOS BYOD — privacy-boundary section shape)

**Tertiary analog:** `docs/admin-setup-android/01-managed-google-play.md` (Phase 35 — what-breaks table pattern, tri-portal sub-section structure)

---

#### Pattern excerpts from primary analog (`03-fully-managed-cobo.md`)

**Frontmatter pattern** (lines 1–7):
```yaml
---
last_verified: 2026-04-21
review_by: 2026-06-20
audience: admin
platform: Android
applies_to: COBO
---
```
Phase 37 adapts: `applies_to: BYOD`. All other keys identical.

**Platform-gate blockquote** (lines 9–12):
```markdown
> **Platform gate:** This guide covers Android Enterprise Fully Managed (COBO) enrollment through Microsoft Intune, including enrollment profile creation, enrollment token lifecycle, all four provisioning methods (QR code, NFC, `afw#setup`, Zero-Touch), the COPE migration note, Android 15 Factory Reset Protection + Enterprise FRP (EFRP) configuration, and Entra join behavior.
> For iOS/iPadOS admin setup, see [iOS Admin Guides](../admin-setup-ios/00-overview.md).
> For macOS admin setup, see [macOS Admin Guides](../admin-setup-macos/00-overview.md).
> For Android provisioning terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).
```
Phase 37 adapts: replace "Fully Managed (COBO)" with "BYOD (personally-owned) Work Profile". Drop the four provisioning methods list; add "enrollment restrictions, work profile policy, data transfer controls, privacy boundary table, and AMAPI migration callout (April 2025)." Per CONTEXT D-12, include a cross-link to COBO guide for the corporate-mode contrast.

**`<a id="...">` HTML-id anchor scaffolding** (confirmed 12 anchors across lines 24, 37, 44, 51, 57, 68, 99, 127, 168, 177, 197, 218):
```markdown
<a id="key-concepts"></a>
## Key Concepts

<a id="prerequisites"></a>
## Prerequisites

<a id="ca-exclusion-intune-app"></a>

<a id="cope-migration"></a>
## COPE Migration Note

<a id="enrollment-profile"></a>
## Enrollment profile creation

<a id="enrollment-token"></a>
## Enrollment token management

<a id="provisioning-method-choice"></a>
## Provisioning method choice

<a id="android-15-frp"></a>
## Android 15 FRP and EFRP

<a id="configure-efrp"></a>
### Configure EFRP in Intune

<a id="what-breaks"></a>
## What Breaks Summary

<a id="renewal-maintenance"></a>
## Renewal / Maintenance
```
Phase 37 MUST replicate this pattern for all 5 mandatory anchors (D-06) and all secondary anchors the planner nominates. The 12-anchor count in COBO is the precedent; Phase 37 will ship a similar density. Every H2 section in D-12 gets an explicit `<a id="...">` tag on the line immediately above the `##` heading.

**`## Key Concepts` H2 with H3 subsections** (lines 24–35):
```markdown
<a id="key-concepts"></a>
## Key Concepts

### Work profile is the entire device

On COBO (Fully Managed), the managed "work profile" is not a partition — it is the complete device scope. There is no personal app surface, no personal data, no user-controlled partition. Every app, setting, certificate, Wi-Fi profile, VPN, and restriction configured through Intune applies to the whole device. (Applies to Android 10.0+ per [03-android-version-matrix.md#cobo](../android-lifecycle/03-android-version-matrix.md#cobo).) See [Fully Managed](../_glossary-android.md#fully-managed) for the authoritative definition.

### Entra join behavior

...

> **Cross-platform note:** Android's Fully Managed is the closest analog to iOS Supervision on ADE-enrolled devices, but the mapping is partial...
```
Phase 37 adapts: `### Work profile is a personal partition` (BYOD inverse — work profile IS the isolated container, personal side is untouched). Include D-06d first-use parenthetical: "BYOD Work Profile (also known as 'personally-owned work profile' in Google terminology)". Glossary cross-link to `_glossary-android.md#byod`. Cross-platform note contrasting with iOS User Enrollment (partial — different mechanics). Use the same H2 → H3 subsection structure.

**`## COPE Migration Note` H2** (lines 57–66) — this is the primary structural precedent for Phase 37's `## AMAPI Migration (April 2025)` H2:
```markdown
<a id="cope-migration"></a>
## COPE Migration Note

If you have existing COPE (Corporate-Owned, Personally-Enabled) deployments, read this before creating a new COBO profile.

**Google recommends WPCO (Work Profile on Corporate-Owned).** WPCO is the forward-looking Google terminology...

<!-- MEDIUM confidence: locked phrasing above paraphrases Google's technical direction... last_verified: 2026-04-21. -->
```
Phase 37 adapts: `<a id="amapi-migration"></a>` / `## AMAPI Migration (April 2025)`. Body covers the three behavioral changes (custom OMA-URI removal, Wi-Fi cert-auth, management-app change) plus web enrollment opt-in. **CRITICAL DIVERGENCE:** Phase 36 uses `<!-- MEDIUM confidence: ... -->` HTML-comment markers (invisible in rendered output). Phase 37 D-10 advances to reader-visible inline brackets: `[MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]`. The HTML-comment pattern is NOT copied for confidence markers in Phase 37.

**MEDIUM-confidence HTML-comment pattern** (lines 53, 66, 191) — these are the Phase 36 precedent basis only:
```markdown
<!-- MEDIUM confidence: Entra CA UI navigation verified 2026-04-21; re-verify at execute time per CONTEXT D-16. -->
<!-- MEDIUM confidence: locked phrasing above paraphrases Google's technical direction... last_verified: 2026-04-21. -->
<!-- MEDIUM confidence: Intune admin center EFRP navigation path verified against Microsoft Learn 2026-04-21. -->
```
Phase 37 does NOT copy this pattern. Phase 37 D-10 replaces HTML-comment with inline reader-visible: `[MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]`. The HTML-comment excerpts above are shown here only to document the divergence clearly.

**`## Prerequisites` hard-prereqs checklist with `<a id>` inline** (lines 37–55):
```markdown
<a id="prerequisites"></a>
## Prerequisites

**Hard prerequisites:**

- [ ] **Microsoft Intune Plan 1+** with the Intune Administrator role...
- [ ] **Managed Google Play (MGP) binding complete** — see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp)...
- [ ] <a id="entra-join-prerequisite"></a>**Entra join enabled**...
- [ ] **Factory-reset or new device**...

**Tenant-conditional prerequisite:**

<a id="ca-exclusion-intune-app"></a>

- [ ] **Conditional Access exclusion...** Per Microsoft Learn (verified 2026-04-21)...
```
Phase 37 adapts: Drop "Factory-reset or new device" (BYOD is user's personal device). Drop `entra-join-prerequisite` inline anchor (COBO-specific). Add MGP binding reference to `#bind-mgp` + `#account-types` + `#disconnect-consequences`. Add "Personal device signed into Google account" prereq. Retain the `**Hard prerequisites:** / **Tenant-conditional prerequisite:**` split structure.

**`> **What breaks if misconfigured:**` inline callout pattern** (lines 55, 79, 89–93, 120–123, 138–139, 154, 163–164, 189):
```markdown
> **What breaks if misconfigured:** Missing Entra join → COBO enrollment fails at token generation with an opaque error surfaced in Intune admin center. Missing CA exclusion (when your tenant has a qualifying CA policy) → Chrome-tab sign-in fails during COBO device setup; admin sees an opaque "sign-in blocked" error on the device and correlating failures in Entra ID sign-in logs. Recovery: exclude the Microsoft Intune cloud app from the CA policy; retry the device setup from scratch.
```
Phase 37 replicates this exact format for all D-05b data-transfer-direction rows (6 "What breaks" cells) and all other configurable settings per PITFALL 2. The pattern: consequence → portal where symptom appears → recovery action.

**`## What Breaks Summary` table** (lines 197–216):
```markdown
<a id="what-breaks"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| Entra join not enabled | [Prerequisites](#prerequisites) | CRITICAL |
| CA exclusion missing (tenant-conditional) | [Prerequisites](#prerequisites) | HIGH (if CA policy applies) |
...
```
Phase 37 adapts this pattern for BYOD-specific misconfigurations. The column structure is identical.

**`## Renewal / Maintenance` table** (lines 218–229):
```markdown
<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|----------------|----------------------|---------------|
| MGP binding | No expiry while the bound Entra account remains active | New app approvals and app distribution stop for enrolled devices | Re-bind via Intune admin center — see [01-managed-google-play.md#disconnect-consequences](...) |
| Default enrollment token | Does not expire | Token-check failures only if the token is explicitly revoked | No scheduled rotation required; rotate only if the token is accidentally shared |
...
```
Phase 37 adapts: BYOD has no enrollment token (user-initiated, not token-distributed). Replace enrollment-token row with BYOD-specific maintenance items: enrollment restriction review cadence, work profile policy review, Wi-Fi cert SCEP/PKCS renewal, compliance policy review. MGP binding row is identical (same prereq).

**`## See Also` pattern** (lines 231–244):
```markdown
## See Also

- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Managed Google Play Binding](01-managed-google-play.md) — MGP binding prerequisite
- [Zero-Touch Portal Configuration](02-zero-touch-portal.md) — ...
- [Android Enterprise Prerequisites](../android-lifecycle/01-android-prerequisites.md)
- [Android Enterprise Enrollment Overview](../android-lifecycle/00-enrollment-overview.md)
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md)
- [Android Version Matrix](../android-lifecycle/03-android-version-matrix.md)
- [Android Enterprise Provisioning Glossary — Fully Managed](../_glossary-android.md#fully-managed)
...
```
Phase 37 adapts: Omit `02-zero-touch-portal.md` (BYOD does not use ZT portal — subtractive deletion). Retain all other lines. Add `docs/end-user-guides/android-work-profile-setup.md` link. Add glossary anchors `#byod`, `#work-profile`, `#amapi`, `#play-integrity`.

**`## Changelog` table** (lines 245–249):
```markdown
## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-21 | Initial version — COBO enrollment profile... | -- |
```
Phase 37 copies this table structure exactly. Author field remains `--`.

---

#### Pattern excerpts from secondary analog (`docs/admin-setup-ios/08-user-enrollment.md`)

**`## Key Concepts Before You Begin / Privacy Boundaries` subsection** (lines 19–43) — structural template for `## Privacy boundary` H2 in Phase 37 admin doc:
```markdown
### Privacy Boundaries on User Enrollment

Account-driven User Enrollment preserves end-user privacy by scoping Intune management to the managed APFS volume only. The following privacy boundaries apply to every device enrolled via account-driven User Enrollment, and each boundary is repeated as an inline callout at the relevant capability section below so deep-link readers... are not dependent on reading this summary.

- **Hardware identifiers are not collected.** Intune does not collect UDID, serial number, or IMEI from User Enrollment devices.
- **No device-level wipe is available.** The only wipe scope on User Enrollment is selective wipe of the managed APFS volume. The personal side of the device is untouched by any Intune action.
- **Personal apps and data are not inventoried.** Intune sees only managed apps inside the managed volume.
- **No location tracking.** MDM location commands are not available on User Enrollment.
...
```
Phase 37 adapts: Replace bullet-list format with D-03 table format (3 columns: "Data category | Admin CAN see | Admin CANNOT see | Why (privacy mechanism)"). The iOS 08 approach is a bullet list; Phase 37 D-03 is a canonical table per adversarial review winner. iOS 08 is used for **structural awareness** (topic coverage, ~230-word length calibration for ~7 rows) but NOT for format copying.

**`## Managed Capabilities and Privacy Limits` per-capability inline privacy callout** (lines 93–136):
```markdown
### Hardware Identifiers and Inventory

Intune identifies User-Enrollment-enrolled devices by the Managed Apple ID...

> **Privacy limit:** Intune does not collect UDID, serial number, or IMEI from account-driven User Enrollment devices...

### Wipe and Retire

> **Privacy limit:** System-wide device wipe is not available on account-driven User Enrollment...
```
Phase 37 admin doc does NOT replicate per-capability inline privacy callouts at each section (the iOS 08 pattern is for per-capability deep-link reads). Phase 37 consolidates the canonical privacy boundary in a single `## Privacy boundary` table per D-03.

---

#### ZT portal subtractive-deletion pattern (from `docs/_templates/admin-template-android.md`, lines 82–85)

```markdown
<!-- Include the "In Zero-Touch portal" subsection ONLY if the guide covers
     corporate Zero-Touch Enrollment, Fully Managed COBO via ZT, or Dedicated
     via ZT. Delete this entire subsection for BYOD Work Profile and AOSP
     admin guides (neither uses the Zero-Touch portal). -->
```
Phase 37 OMITS the `#### In Zero-Touch portal` H4 sub-section for every configuration step. The template's HTML-comment instruction names BYOD Work Profile explicitly. No ZT portal content appears anywhere in `04-byod-work-profile.md`.

---

#### Divergences from primary analog (`03-fully-managed-cobo.md`)

| Divergence | COBO Analog | Phase 37 BYOD |
|------------|-------------|---------------|
| ZT portal H4 sub-sections | Present (COBO uses ZT) | OMITTED via subtractive-deletion pattern |
| Migration note topic | COPE → WPCO direction | AMAPI April 2025: OMA-URI removal + Wi-Fi cert + mgmt app change |
| Confidence markers | HTML-comment `<!-- MEDIUM confidence: ... -->` (invisible in render) | Inline reader-visible `[MEDIUM: source, last_verified YYYY-MM-DD]` per D-10 |
| Enrollment flow structure | Admin creates enrollment profile + token; 4 provisioning methods | Admin configures enrollment restrictions + work profile policy; user initiates enrollment from device |
| `## Key Concepts` / H3 #1 | "Work profile is the entire device" | "Work profile is a personal partition" (BYOD inverse: partition isolates from personal side) |
| Privacy section | None (corporate device; no privacy boundary) | `## Privacy boundary` H2 with 7-row canonical table per D-03 |
| Data transfer section | None (COBO: entire device managed, no cross-profile transfers) | `## Data transfer controls` H2 with D-05b 6-row directional table |
| Wi-Fi section | None separate (Wi-Fi is part of device config profile) | `## Wi-Fi policy (certificate authentication)` H2 with AMAPI inline reminder |
| Management app section | None (Company Portal role unchanged in COBO) | `## Management app` H2 (Company Portal → Microsoft Intune app transition per D-05) |
| End-user tier | None (COBO is corporate; no end-user guide) | Phase 37 produces separate `docs/end-user-guides/android-work-profile-setup.md` |
| Length target | 2800–3800 words (shipped at 3684) | 3000–4000 words (larger: privacy table + data transfer table + AMAPI 3-part callout) |
| Section count | 11 H2 sections | 14 H2 sections (D-12 locked order) |
| AMAPI top banner | None | ≤50-word banner between platform gate and `## Key Concepts` per D-05 |

---

### 2. `docs/end-user-guides/android-work-profile-setup.md` (NEW — first file in new `docs/end-user-guides/` directory)

**Role:** End-user self-enrollment guide. NEW documentation tier. 8 H2 sections (D-13 locked order). Target 800–1500 words.

**Closest structural analog:** `docs/admin-setup-ios/08-user-enrollment.md` — structural awareness for BYOD/privacy-boundary concept coverage. Admin-audience document; Phase 37 must re-voice every section in plain-language end-user tone.

**No direct precedent:** There is no existing end-user-guides file in the repository. This is the first file in a new tier. The README.md is the only repo artifact that uses plain direct prose, but it is technical/admin-oriented and not a usable tone model.

---

#### Pattern excerpts usable from `docs/admin-setup-ios/08-user-enrollment.md` (structural analog only)

**Frontmatter — adapted for `audience: end-user`** (Phase 37 D-08 introduces this NEW enum value):
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: end-user
platform: Android
applies_to: BYOD
---
```
The `audience: admin` line in iOS 08 (line 6) is the closest existing frontmatter. Phase 37 changes `admin` → `end-user`. This is the first use of `audience: end-user` in the docs suite. All other keys follow the established frontmatter schema from Phase 34/35/36.

**Audience-routing blockquote at top of doc** — iOS 08 does not have one, but COBO (Phase 36 `03-fully-managed-cobo.md` lines 22–23) has an audience-routing "How to use" line in prose:
```markdown
**How to use:** Intune administrators read linearly. L1 Service Desk and L2 Desktop Engineering use the Phase 40 and Phase 41 runbooks (not this guide).
```
Phase 37 end-user doc replaces this with D-13's audience blockquote format:
```markdown
> **For personal-device users:** This guide is for personal-device users enrolling in BYOD Work Profile. If you administer Intune and are configuring BYOD policy, see [docs/admin-setup-android/04-byod-work-profile.md](../admin-setup-android/04-byod-work-profile.md).
```

**Privacy boundary section as plain-language summary** — iOS 08 "Privacy Boundaries on User Enrollment" (lines 33–43) provides the structural model for Phase 37 end-user `## What your IT team can and cannot see`:
```markdown
### Privacy Boundaries on User Enrollment

...

- **Hardware identifiers are not collected.** Intune does not collect UDID, serial number, or IMEI from User Enrollment devices.
- **No device-level wipe is available.** The only wipe scope on User Enrollment is selective wipe of the managed APFS volume...
- **Personal apps and data are not inventoried.** Intune sees only managed apps inside the managed volume...
```
Phase 37 end-user doc DIVERGES from this format in two ways:
1. Tone: iOS 08 is admin-audience — "Intune does not collect UDID". Phase 37 must re-voice: "Your IT team cannot see your personal photos, call history, or browser activity."
2. Format: Per D-03, the end-user summary is ≤150 words of plain-language prose OR a two-column ✓/✗ list (not iOS 08's bullet-per-capability format). The admin canonical table is in `04-byod-work-profile.md`; the end-user doc carries the plain-language mirror only.
3. D-04 sync contract: the end-user section MUST cover all four keyword-presence grep targets: `work profile data`, `personal apps`, `personal data`, `device location`.

**Steps pattern** — iOS 08 uses admin-step format with `#### In Intune admin center` subsections (lines 63–90). Phase 37 end-user doc must NOT use this format (D-09 guardrail: zero `Devices >` navigation). Phase 37 enrollment steps use plain numbered list:
```markdown
1. Open the **Google Play Store** on your personal device (the personal side of your phone).
2. Search for **Company Portal** and install it.
3. Open **Company Portal** and tap **Sign In** with your work email.
4. Follow the on-screen prompts to create a work profile.
```
No subsection headers. No portal navigation paths.

**Verification checklist** — iOS 08 "Verification" (lines 152–157) uses checkbox format. Phase 37 end-user doc does not need an admin verification checklist. No direct analog.

**Configuration-Caused Failures table** — iOS 08 lines 159–169 provide the structural idea, but Phase 37 end-user doc uses D-06b top-5 error message format instead:
```markdown
**Message you might see:** [quoted UI text].
**What this means:** [plain-language explanation].
**Tell your IT helpdesk:** [specific detail to report].
```
This is a re-voicing of the iOS 08 failure-table pattern into user-facing language. The iOS 08 "Runbook" column becomes "Tell your IT helpdesk."

---

#### New-tier precedent considerations (no existing end-user-guides/ file)

- **Directory creation:** `docs/end-user-guides/` does not exist. Phase 37 creates the directory by placing `android-work-profile-setup.md` inside it. No README or index file is required in Phase 37 (out of scope per D-16; cross-platform nav integration is post-v1.4).
- **Tone calibration:** No repo artifact uses plain-language end-user voice. The executor must write this doc in a distinctly different register from all existing docs. Key signals from D-06b/c/d: bold UI element names (`**Sign In**`, `**Company Portal**`), numbered steps for sequences, no portal navigation ("Devices >" must never appear), plain short sentences, "your IT team" not "the administrator".
- **Admin sidebar guardrail (D-09):** The `## For IT helpdesk agents` H2 at the end of the end-user doc looks like a mini-admin-doc section but MUST NOT contain portal navigation. The executor runs a grep self-check:
  ```bash
  grep -E "Devices >|Apps >|> Enrollment" docs/end-user-guides/android-work-profile-setup.md
  ```
  Zero hits required before commit.
- **D-04 sync contract grep:** Before commit, executor runs:
  ```bash
  grep -c "work profile data\|personal apps\|personal data\|device location" docs/end-user-guides/android-work-profile-setup.md
  ```
  All four keyword phrases must appear.

---

#### Divergences from structural analog (`docs/admin-setup-ios/08-user-enrollment.md`)

| Divergence | iOS 08 Analog | Phase 37 End-User Doc |
|------------|---------------|----------------------|
| Audience | Admin | End-user (`audience: end-user`) |
| Tone | Technical admin ("Intune does not collect UDID") | Plain user voice ("Your IT team cannot see your photos") |
| Steps format | `#### In Intune admin center` + numbered admin portal steps | Plain numbered steps for personal device actions only |
| Privacy section format | Bullet list per-capability with admin terminology | ≤150 words plain-language prose OR ✓/✗ two-column list (D-03) |
| Failure section | Admin-framed configuration-caused failures table | D-06b top-5 user-observable errors with helpdesk-routing format |
| Admin sidebar | None | `## For IT helpdesk agents` H2 (D-09 SC2 guardrail; no portal nav steps) |
| Audience callout | None (prose "How to use" in COBO) | Blockquote: `> **For personal-device users:** This guide...` |
| Frontmatter `audience` | `admin` | `end-user` (NEW enum value — first in docs suite) |
| Length | ~2670 words (admin guide) | 800–1500 words (user guide) |
| Web enrollment | Not applicable (iOS User Enrollment is a different concept) | D-06a `### Web enrollment (alternative)` H3 sidebar ≤150 words |

---

### 3–5. D-02 Planning Artifact Corrections

These three files require text corrections per CONTEXT.md D-02. The corrections must land in a single commit during plan-phase or execute-phase. The Phase 37 PLAN.md must include this correction as an explicit task.

---

#### 3. `.planning/STATE.md` — line 75 correction

**Before** (current text at line 75):
```
- L2 enrollment investigation runbook 19 is delivered in Phase 37 (BYOD) per REQUIREMENTS.md AEL2-02 pairing with BYOD work-profile enrollment failure; remaining L2 runbooks (18 log collection, 20 app install, 21 compliance) in Phase 41. This is a deliberate cross-phase split honoring research ARCHITECTURE.md dependency DAG.
```

**After** (replacement text):
```
- All four L2 investigation runbooks (18, 19, 20, 21) are delivered in Phase 41 per REQUIREMENTS.md AEL2-01..AEL2-05 traceability and ARCHITECTURE.md Q8 DAG Phase 6 L2 grouping. The earlier Phase 37 runbook 19 claim misaligned with the DAG's own structure; corrected 2026-04-22.
```

---

#### 4. `.planning/research/SUMMARY.md` — two corrections

**Correction 4a — line 201 section header:**

**Before:**
```
### Phase 37: BYOD Work Profile - Admin + End-User + L2
```

**After:**
```
### Phase 37: BYOD Work Profile - Admin + End-User
```

**Correction 4b — line 208 deliverable bullet removal:**

**Before** (lines 205–208):
```
**Delivers:**
- docs/admin-setup-android/04-byod-work-profile.md - enrollment restrictions, work profile policy, data transfer controls, privacy boundary table, AMAPI migration callout
- docs/end-user-guides/android-work-profile-setup.md - Company Portal install, work profile creation, what IT can/cannot see (plain language, no Intune portal steps)
- docs/l2-runbooks/19-android-enrollment-investigation.md - work profile failure investigation
```

**After** (remove the third bullet):
```
**Delivers:**
- docs/admin-setup-android/04-byod-work-profile.md - enrollment restrictions, work profile policy, data transfer controls, privacy boundary table, AMAPI migration callout
- docs/end-user-guides/android-work-profile-setup.md - Company Portal install, work profile creation, what IT can/cannot see (plain language, no Intune portal steps)
```

---

#### 5. `.planning/ROADMAP.md` — line 195 depends-on clause rewrite

**Before** (current text at line 195):
```
**Depends on**: Phase 40 (L1 runbooks exist; L2 investigation runbooks inherit L1 escalation framing); Phase 37 (BYOD enrollment investigation runbook 19 was introduced in BYOD phase — this phase expands with app-install + compliance runbooks)
```

**After** (replacement text):
```
**Depends on**: Phase 40 (L1 runbooks exist; L2 investigation runbooks inherit L1 escalation framing); Phase 37 (BYOD admin guide anchors `#enrollment-restrictions`, `#work-profile-policy`, `#privacy-boundary` are runbook 19 cross-reference targets)
```

---

## Shared Patterns

### Frontmatter schema

**Source:** All Phase 34–36 docs + `docs/_templates/admin-template-android.md`

**Apply to:** Both Phase 37 docs (admin doc and end-user doc)

```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin        # or end-user for the new-tier file
platform: Android
applies_to: BYOD
---
```

`review_by` = `last_verified` + 60 days (NOT 90 days per template comment line 4). Phase 37 D-15 is explicit on both `last_verified` and `review_by` being mandatory on both files.

---

### HTML-id anchor scaffolding

**Source:** `docs/admin-setup-android/03-fully-managed-cobo.md` (12 anchors shipped)

**Apply to:** `04-byod-work-profile.md` (admin doc)

Pattern: `<a id="anchor-name"></a>` on its own line immediately above the `##` or `###` heading. Never use auto-generated slug anchors; always explicit.

Mandatory anchors (D-06 locked): `key-concepts`, `amapi-migration`, `enrollment-restrictions`, `work-profile-policy`, `privacy-boundary`.

Secondary anchors (planner nominates): `prerequisites`, `data-transfer-controls`, `clipboard-work-to-personal`, `clipboard-personal-to-work`, `contacts-work-to-personal`, `contacts-personal-to-work`, `calendar-work-to-personal`, `calendar-personal-to-work`, `wifi-cert-auth`, `management-app-change`, `renewal-maintenance`.

---

### Inline confidence markers (D-10 — Phase 37 advancement)

**Source:** Phase 36 D-17 HTML-comment pattern (precedent basis) → Phase 37 D-10 advances to reader-visible inline

**Apply to:** All AMAPI-adjacent assertions in `04-byod-work-profile.md`; NOT to the end-user doc (plain-language doc should not contain technical source-citation markers)

Format regex (D-11): `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`

Examples:
- `[HIGH: MS Learn, last_verified 2026-04-22]`
- `[MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]`
- `[LOW: community, last_verified 2026-04-22]`

Apply to: every assertion in `## AMAPI Migration (April 2025)` + three inline reminders (Wi-Fi cert-auth, OMA-URI, management app change) + any AMAPI-adjacent behavioral claim elsewhere.

---

### `> **What breaks if misconfigured:**` callout

**Source:** `docs/admin-setup-android/03-fully-managed-cobo.md` (lines 55, 79, 89, 120, 138, 154, 163, 189) and `docs/admin-setup-android/01-managed-google-play.md`

**Apply to:** Every configurable setting in `04-byod-work-profile.md` (per PITFALL 2). Required structure:

```markdown
> **What breaks if misconfigured:** [consequence]. Symptom appears in: [portal/surface where failure is visible — often different from where misconfiguration was made]. Recovery: [specific fix step].
```

For D-05b 6-row data-transfer table, what-breaks goes in the table's last column, not a blockquote. Format within cell: one-sentence consequence.

---

### Cross-platform callout note

**Source:** `docs/admin-setup-android/03-fully-managed-cobo.md` (lines 35–36), `docs/_glossary-android.md` (lines 25–26)

**Apply to:** `## Key Concepts` subsection in `04-byod-work-profile.md`

Pattern:
```markdown
> **Cross-platform note:** [Android term] is the closest analog to [iOS/macOS/Windows term], but the mapping is partial — [key distinction]. See [_glossary-android.md#term](...) for the full cross-platform framing.
```

Phase 37 applies to: BYOD Work Profile (contrast with iOS User Enrollment — partial analog, different mechanics); Managed Google Play (contrast with Apple VPP + MDM); Microsoft Intune app (Android-specific post-AMAPI management app, no direct iOS analog).

---

### Top-of-doc AMAPI banner

**Source:** D-05 (no direct codebase analog; this is Phase 37-novel)

**Apply to:** `04-byod-work-profile.md` only — between the platform gate blockquote and `## Key Concepts`

Pattern (≤50 words, one paragraph):
```markdown
> ⚠️ This guide covers post-AMAPI-migration BYOD Work Profile (April 2025). See [## AMAPI Migration](#amapi-migration) for the three behavioral changes (custom OMA-URI removal, Wi-Fi certificate authentication requirement, management app change from Company Portal to Microsoft Intune app). Pre-April-2025 guidance does not apply.
```

---

### Glossary cross-link pattern

**Source:** Phase 34 D-10 cross-platform callout pattern; `docs/_glossary-android.md` anchors confirmed present: `#byod`, `#work-profile`, `#managed-google-play`, `#amapi`, `#play-integrity`, `#fully-managed`

**Apply to:** Both Phase 37 docs

Pattern (first-use of each Android term):
```markdown
See [BYOD](../_glossary-android.md#byod) for the authoritative definition.
```

D-06d first-use parenthetical: "BYOD Work Profile (also known as 'personally-owned work profile' in Google terminology)" — include on first appearance in each doc, then use shorthand.

---

### Anti-Pattern 1 reference-not-restate pattern

**Source:** `docs/admin-setup-android/03-fully-managed-cobo.md` (lines 43, 46, 130)

**Apply to:** All version-matrix and provisioning-method references in `04-byod-work-profile.md`

Pattern:
```markdown
(Applies to Android 10.0+ per [03-android-version-matrix.md#cobo](../android-lifecycle/03-android-version-matrix.md#cobo).) See [Fully Managed](../_glossary-android.md#fully-managed) for the authoritative definition.
```

Phase 37 adapts for BYOD:
```markdown
See [03-android-version-matrix.md#byod](../android-lifecycle/03-android-version-matrix.md#byod) for the full minimum-OS record.
```

Never state version numbers inline. Never restate MGP binding steps — reference `01-managed-google-play.md#bind-mgp`.

---

## Wave-0 Analog Verification Checklist

- [x] Phase 36 `docs/admin-setup-android/03-fully-managed-cobo.md` exists — confirmed by pattern-mapper (file read; 12 `<a id>` anchors confirmed; MEDIUM-conf HTML-comment markers at lines 53, 66, 191 confirmed; 3684-word length confirmed)
- [x] Phase 35 `docs/admin-setup-android/01-managed-google-play.md` exists — confirmed (file read; `#bind-mgp` confirmed present via section heading; `#account-types` confirmed)
- [x] Phase 34 `docs/_glossary-android.md` exists with required anchors — confirmed (file read; `#byod`, `#work-profile`, `#managed-google-play`, `#amapi`, `#play-integrity`, `#fully-managed` all confirmed via glossary index line 15)
- [x] iOS `docs/admin-setup-ios/08-user-enrollment.md` exists — confirmed (file read; privacy-boundaries section lines 33–43 extracted; ~179 words for that section)
- [x] `docs/_templates/admin-template-android.md` exists — confirmed (file read; ZT portal subtractive-deletion comment at lines 82–85 confirmed)
- [x] `.planning/STATE.md` line 75 correction target confirmed (current text read; before/after diff produced above)
- [x] `.planning/research/SUMMARY.md` lines 201/208 correction targets confirmed (current text read; before/after diffs produced above)
- [x] `.planning/ROADMAP.md` line 195 correction target confirmed (current text read; before/after diff produced above)

---

## Summary

Phase 37 inherits a strong pattern foundation from Phase 36 (`03-fully-managed-cobo.md`). The admin doc (`04-byod-work-profile.md`) should be treated as a structural sibling of the COBO guide with four significant additions (privacy boundary table, data transfer direction table, AMAPI three-part callout, Wi-Fi/management-app H2 sections) and one significant subtraction (ZT portal H4 sub-sections are omitted entirely via the template's named subtractive-deletion instruction). The 12 `<a id>` HTML-id anchors in the COBO doc set the expectation for anchor density; Phase 37 will ship a similar count with 5 mandatory locked anchors plus at least 6 row-level data-transfer anchors plus section-level secondary anchors. Every confidence marker in Phase 37 is reader-visible inline `[MEDIUM: ..., last_verified ...]` — the Phase 36 HTML-comment marker pattern is explicitly NOT copied, per D-10.

The end-user doc (`android-work-profile-setup.md`) is genuinely novel — no end-user-tier document exists in the repository. The iOS 08 admin-audience privacy-boundary section is the closest structural reference for topic coverage and approximate length (~200 words for the privacy section) but every sentence must be rewritten in plain user voice ("Your IT team cannot see..." rather than "Intune does not collect..."). The executor should treat D-07's 8-section shape as the template and resist the impulse to write in the L1-runbook administrative format that pervades all other docs in the suite. The D-09 SC2-guardrail grep is mandatory before commit.

The three planning-artifact corrections (STATE.md, SUMMARY.md, ROADMAP.md) are small text edits with exact before/after diffs provided. They must land in a single commit to keep the record internally consistent.

---

## PATTERN MAPPING COMPLETE
