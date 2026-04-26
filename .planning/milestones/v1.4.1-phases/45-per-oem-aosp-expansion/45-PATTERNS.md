# Phase 45: Per-OEM AOSP Expansion — Pattern Map

**Mapped:** 2026-04-25
**Files analyzed:** 14 (5 NEW admin docs + 1 NEW reference matrix + 2 NEW runbooks + 6 atomic same-commit retrofits)
**Analogs found:** 14 / 14 (100% coverage; all sibling-shipped within Phases 34-44)
**Method:** Read-only sibling extraction; CONTEXT.md adversarial-review winners (1B/2B/3B/4A) + RESEARCH.md HIGH-confidence per-OEM data already lock structural choices, so this map focuses on per-file analog pinning + concrete excerpt extraction at line-precision for the planner.

---

## File Classification

| New / Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------------|------|-----------|----------------|---------------|
| `docs/admin-setup-android/09-aosp-realwear.md` (NEW) | admin-doc | step-numbered procedure + add-on H2 | `docs/admin-setup-android/07-knox-mobile-enrollment.md` (Phase 44) | exact (step-numbered H2/H3 + 4th-portal coexistence overlay) |
| `docs/admin-setup-android/10-aosp-zebra.md` (NEW) | admin-doc | step-numbered procedure + add-on H2 (OEMConfig APK push) | `docs/admin-setup-android/07-knox-mobile-enrollment.md` + `02-zero-touch-portal.md` (DPC JSON H2 precedent) | exact + role-match |
| `docs/admin-setup-android/11-aosp-pico.md` (NEW) | admin-doc | step-numbered procedure + OPTIONAL add-on H2 | `docs/admin-setup-android/07-knox-mobile-enrollment.md` + `03-fully-managed-cobo.md` (sibling parity) | exact |
| `docs/admin-setup-android/12-aosp-htc-vive-focus.md` (NEW) | admin-doc | step-numbered procedure (no add-on H2) | `docs/admin-setup-android/03-fully-managed-cobo.md` (cleanest 11-H2 sibling without add-ons) | exact |
| `docs/admin-setup-android/13-aosp-meta-quest.md` (NEW) | admin-doc | step-numbered procedure + 2 REQUIRED add-on H2s + plan-time-volatility callout | `docs/admin-setup-android/07-knox-mobile-enrollment.md` (4th-portal overlay narrative — most analogous to Meta-for-Work fourth portal) | exact (4-portal pattern) |
| `docs/reference/aosp-oem-matrix.md` (NEW) | reference-matrix | OEM-row × capability-column tables grouped under capability H2s + footnote-for-volatility | `docs/reference/android-capability-matrix.md` (5 H2 sub-tables; sibling) + `docs/reference/ios-capability-matrix.md` + `docs/reference/macos-capability-matrix.md` | exact (multi-sub-table-under-capability-H2 shape verified across 3 sibling matrices) |
| `docs/l1-runbooks/29-android-aosp-enrollment-failed.md` (NEW) | l1-runbook | OEM-scoped Causes A-E + aggregate Escalation Criteria H2 | `docs/l1-runbooks/28-android-knox-enrollment-failed.md` (Phase 44 OEM-scoped sibling) + `docs/l1-runbooks/27-android-zte-enrollment-failed.md` (aggregate Escalation Criteria H2 sibling) | exact |
| `docs/l2-runbooks/23-android-aosp-investigation.md` (NEW) | l2-runbook | per-OEM Pattern A-E + per-Pattern Microsoft Support escalation packet | `docs/l2-runbooks/22-android-knox-investigation.md` (Phase 44 Pattern A-E sibling) | exact |
| `docs/admin-setup-android/06-aosp-stub.md` (MODIFY) | admin-doc-stub-collapse | subtractive table removal + 9-H2 whitelist preservation | self (the file itself; preserves Phase 39 D-11 9-H2 whitelist + PITFALL-7 + 8-OEM enumeration) | preservation (no analog needed; in-place edit) |
| `docs/reference/android-capability-matrix.md` (MODIFY) | reference-matrix-anchor-fill | append-only anchor target rewrite at lines 121-127 | `docs/reference/android-capability-matrix.md:113-118` (Knox row anchor — same-doc sibling pattern from Phase 44) | exact (same-doc precedent) |
| `docs/decision-trees/08-android-triage.md` (MODIFY) | decision-tree | single Mermaid edge swap + single Routing Verification table row update | `docs/decision-trees/08-android-triage.md` lines 31-37 + 100 (in-place edit; ANDR27 click-target sibling at line 68) | exact (same-doc precedent) |
| `docs/android-lifecycle/02-provisioning-methods.md` (MODIFY) | reference-matrix | additive AOSP row enrichment + Knox-style append-only H2 (90-day token note) | `docs/android-lifecycle/02-provisioning-methods.md:50-55` (Knox section additive H2 from Phase 44) | exact (same-doc precedent) |
| `docs/l1-runbooks/00-index.md` (MODIFY) | index | append-only table-row addition for Runbook 29 | `docs/l1-runbooks/00-index.md:64-77` (Android section from Phase 40 + AOSP-Note removal pattern) | exact (same-doc precedent) |
| `docs/_glossary-android.md` (MODIFY) | glossary | additive alphabetical-index entry + new H2 entry under Provisioning Methods category | `docs/_glossary-android.md` Knox/KME/KPE entries appended Phase 44 (lines 90-106) | exact (same-doc precedent) |
| `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` (DELETE) | source-handoff | Phase 43 D-20 lifecycle deletion in final commit | n/a — Phase 43 D-20 lifecycle contract specifies deletion in Phase 45 final commit | exact (Phase 43 → Phase 45 contract) |

---

## Pattern Assignments

### Per-OEM Admin Docs (09-13) — Wave 1 (5 plans in parallel)

**Primary analog:** `docs/admin-setup-android/07-knox-mobile-enrollment.md` (Phase 44, shipped 2026-04-25, 230 lines).
**Secondary analog (sibling-parity verification):** `docs/admin-setup-android/03-fully-managed-cobo.md` (250 lines), `05-dedicated-devices.md` (289 lines), `02-zero-touch-portal.md` (236 lines).

#### Frontmatter pattern (D-27 LOCKED + Phase 34 D-14 60-day cycle)

**Source:** `07-knox-mobile-enrollment.md:1-7`
```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---
```
- `applies_to: AOSP` is single-string per Phase 37 D-15 (sibling 07 uses `KME`; `AOSP` is the natural mode-string here per CONTEXT Claude's Discretion).
- `review_by` = `last_verified` + 60d. **Special-case for `13-aosp-meta-quest.md`:** the 30-day re-verify trigger per D-10 lives INSIDE `## Renewal / Maintenance` H2 prose; the frontmatter `review_by` stays at +60d to preserve audit harness C5 freshness check uniformity.

#### 11-H2 Skeleton pattern (D-01 LOCKED)

**Source:** synthesized from `07-knox-mobile-enrollment.md` (steps 0-6 = 7 step-H2s) + `03-fully-managed-cobo.md:218` (`## Renewal / Maintenance`) + `03-fully-managed-cobo.md:197` (`## What Breaks Summary`) + `07:202` (`## What Breaks Summary` sibling).

**Verbatim H2 sequence (per CONTEXT D-01 + RESEARCH §"Pattern 1"):**
```markdown
# Configure {OEM} AOSP Devices in Intune

## Scope and Status                    {# H2 #1: PITFALL-7 framing inline at top}
## Hardware Scope                       {# H2 #2: models + firmware mins}
## Prerequisites and Licensing          {# H2 #3}
## Enrollment Method                    {# H2 #4}
## Provisioning Steps                   {# H2 #5: step-numbered H3 children}
### Step 0 — {prerequisite step}       {# wait gates / B2B onboarding / Meta-for-Work approval}
### Step 1 — Create AOSP enrollment profile in Intune
### Step 2 — {OEM-specific token / Wi-Fi config}
### Step 3 — {device-side QR scan / OEMConfig push / etc.}
{add-on H2s here per D-02; OPTIONAL for Pico; 2 REQUIRED for Meta Quest}
## Verification                         {# H2 #6}
## Common Failures                      {# H2 #7: anchor target for runbook 29 cross-links}
## Renewal / Maintenance                {# H2 #8: 60-day cycle; Meta = +30-day re-verify}
## What Breaks Summary                  {# H2 #9: severity-descending table}
## See Also                             {# H2 #10: cross-links to siblings}
## Changelog                            {# H2 #11: version-history rows}
```

#### Universal banner contract (D-03)

**Source:** `07-knox-mobile-enrollment.md:11-12` + `06-aosp-stub.md:11-13`
```markdown
> **Platform gate:** {OEM} AOSP device management — {one-line OEM-distinctive scope}. {Cross-platform sibling links}
> **Platform note:** AOSP management is a distinct surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE) — no GMS, no FCM push, no Managed Google Play. See [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).
```
**Position:** BEFORE H1 (sibling pattern verified at `07:11-12`, `02:11-12`, `03:9-13`, `05:9-14`, `06:11-13`).

#### Anchor scaffolding contract (D-05)

**Source:** `07-knox-mobile-enrollment.md` uses `<a id="prerequisites"></a>` (line 18), `<a id="step-0-b2b-approval"></a>` (line 27), `<a id="renewal-maintenance"></a>` (line 193), `<a id="what-breaks"></a>` (line 202), `<a id="kme-zt-mutual-exclusion"></a>` (line 173).

**Required anchors per file (D-05 LOCKED):**
- `<a id="prerequisites"></a>` (above `## Prerequisites and Licensing`)
- `<a id="provisioning-steps"></a>` (above `## Provisioning Steps`)
- `<a id="verification"></a>` (above `## Verification`)
- `<a id="common-failures"></a>` (above `## Common Failures` — REQUIRED for runbook 29 cross-link landing per D-21)
- `<a id="renewal-maintenance"></a>` (above `## Renewal / Maintenance`)
- `<a id="what-breaks-summary"></a>` (above `## What Breaks Summary`)
- Per-OEM add-on anchors:
  - `09-aosp-realwear.md`: `<a id="wi-fi-qr-embedding"></a>`
  - `10-aosp-zebra.md`: `<a id="oemconfig-apk-push"></a>`
  - `11-aosp-pico.md`: `<a id="pico-business-suite-coexistence"></a>`
  - `13-aosp-meta-quest.md`: `<a id="meta-for-work-portal-setup"></a>` AND `<a id="meta-horizon-subscription-status"></a>`
  - `12-aosp-htc-vive-focus.md`: NO add-on anchors (D-02 NO add-on H2s)

#### Step 0 wait-gate H2 pattern (D-09 — Meta-for-Work approval gate; sibling reuse from Phase 44 D-02)

**Source:** `07-knox-mobile-enrollment.md:27-42`
```markdown
<a id="step-0-b2b-approval"></a>
## Step 0 — Samsung Knox Portal B2B account approval (1-2 business days)

Submit your Samsung Knox B2B account application TODAY (Day 0). Samsung approval typically takes 1-2 business days, and Knox Admin Portal access is gated behind approval.

**Submit your B2B account:**

1. Navigate to the [Samsung Knox Portal](https://www.samsungknox.com/...) and select **Get started** → **Apply for a B2B account**. <!-- verify UI at execute time -->
2. Submit the corporate-email-bound application; expect 1-2 business days for approval.
3. While waiting, productively use the wait window:
   - Read the rest of this guide (Steps 1-N) to align on Knox profile, EMM choice, and DPC JSON.
   - Identify the Samsung devices in scope: serial numbers, IMEI 1, manufacturer (Samsung), model.
   ...

> **What breaks if misconfigured:** Submitting B2B late delays the entire enrollment cycle by 1-2 business days at the moment devices are needed. Recovery: submit on Day 0; if Samsung approval is delayed beyond 2 business days, contact Samsung Knox B2B support with the application ID. Symptom appears in: Knox Admin Portal sign-in returns "Account pending approval".
```
**Apply to:** `13-aosp-meta-quest.md` `### Step 0 — Meta for Work account approval (<latency>)` H3 INSIDE `## Provisioning Steps` (D-09 specifies H3 not H2 to fit the 11-H2 contract).
**Apply IF:** plan-time researcher confirmed Meta Business approval/onboarding latency exists (RESEARCH.md §2 confirmed HMS infrastructure is operational; check vendor onboarding latency separately at plan time).

#### Inline `> What breaks if misconfigured` blockquote pattern

**Source:** `07-knox-mobile-enrollment.md:42, 56, 70, 75, 92, 105, 119, 145, 158` (9 instances per doc) + `03-fully-managed-cobo.md:55, 79, 89, 93, 119, 121, 123` (similar density).
```markdown
   > **What breaks if misconfigured:** {What goes wrong}. Recovery: {recovery action}. Symptom appears in: {portal/UI surface where symptom manifests}.
```
**Apply at:** every action point inside `## Provisioning Steps` H3 children. Sibling density: ~1 blockquote per H3 step. Indented as a continuation of the preceding numbered list item (4-space indent).

#### `## Common Failures` H2 internal structure (D-21 — runbook cross-link landing target)

**Source:** Per CONTEXT Claude's Discretion: "table vs bullets vs sub-H3s — author's call; runbook 29 / 23 cross-links land at H2 anchor regardless." No verbatim sibling; the closest analog is `07-knox-mobile-enrollment.md:202-213` `## What Breaks Summary` table format. Authors should mirror that severity-descending table OR use sub-H3s per failure-mode if RESEARCH.md provides 3+ distinct OEM-specific failure modes (e.g., Zebra OEMConfig version drift, RealWear staging-Wi-Fi PSK-only constraint).

#### `## Renewal / Maintenance` H2 (D-01 #8)

**Source:** `07-knox-mobile-enrollment.md:193-200`
```markdown
<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| Samsung Knox B2B account | Account-perpetual once approved; access tied to corporate email | Knox Admin Portal sign-in fails | Re-apply via Samsung Knox B2B portal; 1-2 business day approval |
| KME profile staging-token | Configurable per Intune enrollment profile | New KME enrollments fail; previously enrolled devices unaffected | Regenerate enrollment token in Intune admin center; update Custom JSON Data field in Knox Admin Portal profile |
| KPE Premium licensing | Free since Samsung 2024-03-21; Intune Plan 1+ supplies transparently | None expected at this time | Verify Plan 1+ activation via Knox Admin Portal device row license column |
```
**Apply to all 5 admin docs.** For `13-aosp-meta-quest.md`, ADD a row for the 30-day Meta Horizon re-verify trigger per D-10:
```markdown
| Meta Horizon Managed Services wind-down assertion | 30-day re-verify (special case per D-10; standard 60-day applies elsewhere in this doc) | Outdated guidance on commercial-SKU sales / HMS free-tier transition / 2030-01-04 maintenance-mode end | Re-fetch [meta.com/blog/an-update-on-meta-for-work](https://www.meta.com/blog/an-update-on-meta-for-work); verify dates have not shifted; update `## Scope and Status` callout accordingly |
```

#### `## What Breaks Summary` H2 — severity-descending table (D-01 #9)

**Source:** `07-knox-mobile-enrollment.md:202-213`
```markdown
<a id="what-breaks"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| B2B account not submitted on Day 0 | [Step 0](#step-0-b2b-approval) | CRITICAL |
| KME profile EMM not set to Microsoft Intune | [Step 2](#step-2-emm-profile) | HIGH |
| ... | ... | ... |
```
**Anchor (D-05):** `<a id="what-breaks-summary"></a>` (note: sibling 07 uses `<a id="what-breaks"></a>` — Phase 45 plans should standardize on `what-breaks-summary` per D-05 explicit anchor list).

#### `## Changelog` H2 (D-01 #11)

**Source:** `07-knox-mobile-enrollment.md:226-230`
```markdown
## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 scope) — {OEM-distinctive content summary; PITFALL-7 framing preserved; 11-H2 sibling parity per D-01; per-OEM REQUIRED add-on per D-02; ...} | -- |
```

#### HTML-comment patterns (Phase 34 D-17 + Phase 39 D-07 inheritance)

**Subtractive deletion (D-29 inheritance):** `06-aosp-stub.md:15-19`
```markdown
<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no Google Mobile Services). -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at a time. -->
```
**Apply to:** ALL 5 per-OEM AOSP admin docs near the top (between banner blockquotes and H1, OR between H1 and `## Scope and Status`). RESEARCH.md anti-pattern §"MGP cross-link from any AOSP doc" reinforces this.

**Verify-UI-at-execute-time:** `07:34, 51, 65, 114, 154`
```markdown
1. Navigate to {URL}. <!-- verify UI at execute time -->
```
**Apply at:** every portal navigation step in `### Step N — ...` H3 children.

#### PITFALL-7 framing per-claim discipline (D-04 + D-23)

**Source:** `06-aosp-stub.md:23, 64`
```markdown
> ⚠️ **Stub in v1.4; full AOSP admin coverage planned for v1.4.1.** ...
...
**Per-OEM mechanics for non-RealWear OEMs deferred to v1.4.1. If GMS is present, use Android Enterprise fully managed — these OEMs are not supported under AOSP when GMS is available.**
```
**Apply at:** every per-OEM "supported under AOSP" assertion in `## Scope and Status` and `## Hardware Scope`. Pair inline with: "supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead." (RESEARCH.md anti-pattern §"PITFALL-7 framing erosion" verbatim.)

#### Source-confidence marker pattern (D-28)

**Source:** `06-aosp-stub.md:49, 78` + `02-zero-touch-portal.md:52, 65, 165`
```markdown
`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]`
`[MEDIUM: research inference, last_verified 2026-04-23]`
```
**Regex (Phase 37 D-11 / Phase 39 D-20 inheritance):** `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`
**Apply at:** end of any per-OEM "supported under AOSP" assertion or vendor-licensing claim where source classification matters. RESEARCH.md §1 already pins per-OEM marker confidence — planner should propagate verbatim.

#### Per-OEM REQUIRED add-on H2 patterns (D-02)

**`09-aosp-realwear.md` — `## Wi-Fi QR Embedding Walkthrough` add-on H2 (REQUIRED):**
- Position: between H2 #5 `## Provisioning Steps` and H2 #6 `## Verification`.
- Anchor: `<a id="wi-fi-qr-embedding"></a>`.
- Internal structure: 5 numbered items + 2 failure modes per `PHASE-45-AOSP-SOURCE.md` outline (RESEARCH.md §"Reusable Assets" confirms).
- Critical content per RESEARCH.md §1 RealWear: "**WPA-PSK, WPA2-PSK, WPA3 ONLY — NOT EAP-PEAP, NOT EAP-TLS**" — verbatim emphasis required (anti-pattern §"Wi-Fi EAP claims for RealWear").

**`10-aosp-zebra.md` — `## OEMConfig APK Push (Intune)` add-on H2 (REQUIRED):**
- Position: between H2 #5 and H2 #6.
- Anchor: `<a id="oemconfig-apk-push"></a>`.
- Critical content per RESEARCH.md §1 Zebra: TWO OEMConfig apps disambiguated — "Zebra OEMConfig Powered by MX" (Android 13+ AND Android 11; new app; single-profile recommended) vs "Legacy Zebra OEMConfig" (Android 11 and earlier; multi-profile). Both deployed as APK via Intune (NOT Managed Google Play). StageNow XML-export-to-MDM workflow OPTIONAL.
- Anti-pattern §"OEMConfig profile authoring": "Don't hand-roll MX schema XML; use StageNow Export to MDM workflow OR direct OEMConfig profile in Intune."

**`11-aosp-pico.md` — `## Pico Business Suite Coexistence` add-on H2 (OPTIONAL):**
- Position: between H2 #5 and H2 #6.
- Anchor: `<a id="pico-business-suite-coexistence"></a>`.
- Verbatim "OPTIONAL" per AEAOSPFULL-03 wording.
- Critical content per RESEARCH.md §1 Pico: SDK $50-$150/year/device per community sources (MEDIUM marker required); cross-link to `business.picoxr.com` for current pricing. Mid-2025 license-term changes per STATE.md.

**`12-aosp-htc-vive-focus.md` — NO add-on H2s** (preserves "simplest of AR/VR OEMs" per AEAOSPFULL-04 verbatim framing). Critical content per RESEARCH.md §1 HTC: in-device QR scan UI path verbatim `Settings > Advanced > MDM setup > QR code` (per vive.com support).

**`13-aosp-meta-quest.md` — `## Meta for Work Portal Setup` AND `## Meta Horizon Subscription Status` add-on H2s (BOTH REQUIRED REGARDLESS of HMS alive-status per D-08 LOCKED):**
- Positions: both between H2 #5 and H2 #6.
- Anchors: `<a id="meta-for-work-portal-setup"></a>` and `<a id="meta-horizon-subscription-status"></a>`.
- Critical content per RESEARCH.md §2 (D-06 plan-time gate RESOLVED HIGH-confidence "ALIVE in transformed form"):
  - 4-portal pattern PRESERVED (Intune + Meta for Work; MGP/ZT N/A) per D-08 LOCKED.
  - `## Meta Horizon Subscription Status` content: "As of Feb 20, 2026, Meta no longer sells commercial Quest SKUs. HMS becomes free for managing consumer Quest 3 / Quest 3s through ManageXR or direct deployment. HMS infrastructure enters maintenance mode through Jan 4, 2030. Net-new fleets MAY use Intune-direct AOSP enrollment instead of HMS for vendor-independent management." (RESEARCH.md §2 verbatim recommended framing.)
  - Source marker: `[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]`.

#### Meta Quest plan-time wind-down callout pattern (D-07 + D-08 ROADMAP SC#3)

**Source:** `06-aosp-stub.md:23` (⚠️ blockquote scope-and-status callout pattern)
```markdown
> ⚠️ **{Headline}.** {Body content with explicit date and re-verification trigger}.
```
**Apply to `13-aosp-meta-quest.md` `## Scope and Status` H2** as MANDATORY ⚠️ blockquote per RESEARCH.md §2 D-07 Branch 2 ALIVE-in-transformed-form resolution:
```markdown
> ⚠️ **Meta Horizon Managed Services wind-down — Feb 20, 2026 transition.** As of February 20, 2026, Meta no longer sells commercial Quest SKUs and HMS subscriptions are FREE through January 4, 2030 (maintenance mode). The 4-portal pattern (Intune + Meta for Work) remains operational; net-new fleets may use Intune-direct AOSP enrollment as a vendor-independent fallback. Re-verify the wind-down assertion every 30 days (next: 2026-05-25). See [Meta Horizon Subscription Status](#meta-horizon-subscription-status) below.
```

---

### Reference Matrix `aosp-oem-matrix.md` — Wave 2 (1 plan)

**Primary analog:** `docs/reference/android-capability-matrix.md` (143 lines, 5 H2 sub-tables).
**Secondary analog (sibling-shape verification):** `docs/reference/ios-capability-matrix.md` (107 lines, 5 H2 sub-tables); `docs/reference/macos-capability-matrix.md` (101 lines, 5 H2 sub-tables).

#### Frontmatter pattern

**Source:** `android-capability-matrix.md:1-7`
```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---
```
- `applies_to: AOSP` per CONTEXT D-27.
- `audience: admin` per D-27 + sibling matrix convention.

#### File skeleton (D-11 + D-13 LOCKED)

**Source:** synthesized from `android-capability-matrix.md` H2 layout (5 sub-tables under named-capability H2s).
```markdown
# Intune: AOSP OEM Matrix — RealWear / Zebra / Pico / HTC / Meta Quest

{1-paragraph preamble; mirrors android-capability-matrix.md:11 paragraph: positional intro + sibling cross-links}

## Scope                                  {# D-13: PITFALL-7 framing once at top}

> ⚠️ **AOSP scope reminder:** Devices listed in this matrix are supported under AOSP because they have no GMS. If GMS is present on a target device, use Android Enterprise fully managed instead — these OEMs are not supported under AOSP when GMS is available. (Phase 39 PITFALL-7 framing.)

## Hardware Scope                         {# D-11 #1: OEM × device-models + min firmware}

| OEM | Models | Minimum Firmware | Type |
|-----|--------|------------------|------|
| RealWear | HMT-1 / HMT-1Z1 / Navigator 500 | HMT-1 11.2; HMT-1Z1 11.2; Nav 500 1.1 | AR/VR Headset |
| Zebra | WS50 | 11-49-15.00 | Wearable Scanner |
| Pico | PICO 4 Enterprise / Neo3 Pro/Eye | PUI 5.6.0 / PUI 4.8.19 | AR/VR Headset |
| HTC | Vive Focus 3 / XR Elite / Focus Vision | 5.2-5.0.999.624 / 4.0-1.0.999.350 / 7.0.999.159 | AR/VR Headset |
| Meta | Quest 2 / 3 / 3s / Pro | v49 / v59 / v71 / v49 [^meta-volatility] | AR/VR Headset |

## Enrollment Method and Wi-Fi Embedding  {# D-11 #2: OEM × QR-only/OEMConfig + Wi-Fi REQUIRED|OPTIONAL}

| OEM | Enrollment Method | Wi-Fi Embedding |
|-----|-------------------|-----------------|
| RealWear | QR-only AOSP | REQUIRED (WPA/WPA2-PSK/WPA3 only — NOT EAP) |
| Zebra | QR-only AOSP + OEMConfig APK push | OPTIONAL |
| Pico | QR-only AOSP | OPTIONAL |
| HTC | QR-only AOSP (Settings > Advanced > MDM setup > QR code) | OPTIONAL |
| Meta Quest | QR-only AOSP + Meta for Work portal [^meta-volatility] | OPTIONAL |

## Vendor Portals and Licensing           {# D-11 #3: OEM × vendor-portal + Intune Plan tier}

| OEM | Vendor Portal | Intune Plan Tier |
|-----|---------------|------------------|
| RealWear | RealWear Cloud (OPTIONAL) | Plan 2 OR Suite |
| Zebra | None (StageNow OPTIONAL) | Plan 1 |
| Pico | PICO Business Suite (OPTIONAL) | Plan 2 OR Suite |
| HTC | None | Plan 2 OR Suite |
| Meta Quest | Meta for Work / Meta Horizon Managed Services [^meta-volatility] | Plan 2 OR Suite |

## Intune AOSP Mode                       {# D-11 #4: OEM × user-associated|userless support}

| OEM | User-Associated | Userless |
|-----|-----------------|----------|
| RealWear | Yes | Yes |
| Zebra | Yes | Yes |
| Pico | Yes | Yes |
| HTC | Yes | Yes |
| Meta Quest | Yes | Yes |

[^meta-volatility]: As of February 20, 2026, Meta no longer sells commercial Quest SKUs. HMS subscriptions are free through January 4, 2030 (maintenance mode). 4-portal pattern remains; Intune-direct AOSP enrollment is the vendor-independent fallback. See [13-aosp-meta-quest.md#meta-horizon-subscription-status](../admin-setup-android/13-aosp-meta-quest.md#meta-horizon-subscription-status). Plan-time re-verification gate: [meta.com/blog/an-update-on-meta-for-work](https://www.meta.com/blog/an-update-on-meta-for-work).

## See Also

- [AOSP Stub](../admin-setup-android/06-aosp-stub.md)
- [Android Capability Matrix](android-capability-matrix.md)
- {per-OEM admin doc cross-links 09-13}

## Source Attribution                     {# D-15: per-OEM source-confidence pins outside tables}

- RealWear: `[HIGH: MS Learn AOSP supported devices + support.realwear.com, last_verified 2026-04-25]`
- Zebra: `[HIGH: MS Learn oemconfig-zebra-android-devices + techdocs.zebra.com, last_verified 2026-04-25]`
- Pico: `[HIGH: MS Learn + business.picoxr.com, last_verified 2026-04-25]` (license tier MEDIUM per RESEARCH.md §1)
- HTC: `[HIGH: MS Learn + vive.com support, last_verified 2026-04-25]`
- Meta Quest: `[HIGH: MS Learn + meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`

## Version History                        {# Sibling convention; NOT "Changelog" per D-16}

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 scope) — 4 H2 sub-tables (Hardware Scope / Enrollment Method and Wi-Fi Embedding / Vendor Portals and Licensing / Intune AOSP Mode); 5-OEM rows; Meta-row footnote for Feb 20 2026 wind-down volatility per D-14; Source Attribution H2 per D-15; cell-value rules literal-strings only per D-16 (no `+` notation) | -- |
```

#### Cell-value discipline (D-16 LOCKED)

**Verbatim values allowed:** `Yes` / `No` / `REQUIRED` / `OPTIONAL` / `N/A` / `Plan 1` / `Plan 2` / `Suite`. **NO `+` notation.** **Footnotes for exceptions** (`[^meta-volatility]`); never inline-prose-Notes column (D-08 carry-forward; sibling matrix convention verified).

#### Single ⚠️ scope blockquote (D-13)

**Source:** `06-aosp-stub.md:23` precedent + `android-capability-matrix.md:74-77` HTML-comment scope guard analog. Place ONCE at top of file under `## Scope` H2; do NOT repeat across the 4 sub-tables (PITFALL 12 scope-creep avoidance per CONTEXT D-13).

#### `## Version History` H2 NOT `## Changelog`

**Source:** Sibling matrix convention verified at `android-capability-matrix.md:139`, `ios-capability-matrix.md:103`, `macos-capability-matrix.md:99`. Per CONTEXT D-16 trailing paragraph mandate.

---

### L1 Runbook 29 — Wave 3 Plan A (1 plan)

**Primary analog:** `docs/l1-runbooks/28-android-knox-enrollment-failed.md` (Phase 44, 234 lines, OEM-scoped Causes A-D + Cause E escalate-only).
**Secondary analog (aggregate-Escalation-Criteria H2 sibling):** `docs/l1-runbooks/27-android-zte-enrollment-failed.md` (244 lines).

#### Frontmatter pattern (D-27)

**Source:** `28-android-knox-enrollment-failed.md:1-7`
```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: AOSP
audience: L1
platform: Android
---
```

#### Platform-gate banner blockquote

**Source:** `28-android-knox-enrollment-failed.md:9`
```markdown
> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
```

#### Title + 1-paragraph scope summary

**Source:** `28-android-knox-enrollment-failed.md:11-17`
```markdown
# Android AOSP Enrollment Failed

L1 runbook for AOSP enrollment failures across the 5 supported OEMs (RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest): device was expected to enroll automatically via AOSP QR-based provisioning but did not — device booted to consumer setup, looped back to first-time setup, or never arrived in Intune. Five OEM-scoped L1-diagnosable causes (Causes A-E).

**Applies to AOSP only.** For Knox Mobile Enrollment failures (Samsung) see runbook [28 KME](28-android-knox-enrollment-failed.md). For non-Samsung corporate Zero-Touch enrollment failures see runbook [27 ZTE](27-android-zte-enrollment-failed.md). For non-corporate enrollment failures see ([22](22-android-enrollment-blocked.md) / [23](23-android-work-profile-not-created.md) / [24](24-android-device-not-enrolled.md) / [25](25-android-compliance-blocked.md) / [26](26-android-mgp-app-not-installed.md)).

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR29 branch.
```

#### `## Prerequisites` H2 with portal shorthand

**Source:** `28-android-knox-enrollment-failed.md:19-28`
```markdown
## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) — L1 read-only
- Device serial number, IMEI, or manufacturer identifier
- Confirmation that device is one of the 5 AOSP-supported OEMs (RealWear / Zebra / Pico / HTC / Meta)
- Portal shorthand used in this runbook:
   - **P-INTUNE** = Intune admin center Devices / Tenant admin blades
   - **P-RWCLOUD** = RealWear Cloud admin portal — **admin-only**; OPTIONAL coexistence per `09-aosp-realwear.md`
   - **P-MFW** = Meta for Work portal — **admin-only**; REQUIRED for Meta Quest fleets per `13-aosp-meta-quest.md`

> **L1 scope note:** Vendor portals (RealWear Cloud, Meta for Work) are admin-only. L1 observes Intune-side symptoms (device absence / enrollment state) and hands the packet to the admin for vendor-portal actions. All vendor-portal click paths in this runbook are within `## Admin Action Required` sections.
```

#### `## How to Use This Runbook` H2 + OEM-identification step (D-20 — DELIBERATE DEPARTURE FROM SIBLING)

**Source pattern:** `28-android-knox-enrollment-failed.md:30-39` + `27-android-zte-enrollment-failed.md:30-39`
**Departure rationale (REQUIRED in 45-PLAN.md per D-22):** AOSP scope spans 5 OEMs whereas ZTE/KME scope spans one provisioning-method-per-runbook. The OEM-identification step is necessary to route to the correct Cause within this single runbook.

```markdown
## How to Use This Runbook

**First, identify the device OEM** (RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest) — typically visible on device chassis or in Settings > About — then jump to the matching Cause. Causes are OEM-scoped (one Cause per OEM).

Check the cause that matches the OEM you identified. Causes are independently diagnosable — you do not need to rule out other-OEM causes.

- [Cause A: RealWear enrollment failed](#cause-a-realwear)
- [Cause B: Zebra WS50 enrollment failed](#cause-b-zebra)
- [Cause C: Pico enrollment failed](#cause-c-pico)
- [Cause D: HTC VIVE Focus enrollment failed](#cause-d-htc)
- [Cause E: Meta Quest enrollment failed](#cause-e-meta-quest)

If the OEM is not in this list (DigiLens, Lenovo, Vuzix), or if all OEM-Cause checks pass, see [Escalation Criteria](#escalation-criteria) below.
```

#### Per-Cause D-10 sectioned actor-boundary template

**Source:** `28-android-knox-enrollment-failed.md:43-78` (Cause A complete template)
```markdown
## Cause A: {OEM} enrollment failed {#cause-a-{oem-slug}}

**Entry condition:** {OEM-specific entry condition — e.g., "Admin reports the {OEM} device serial is NOT visible in {vendor portal} OR the device QR scan returned an error at first boot."}

### Symptom

- User reports the {OEM-device-class} went through "normal" Setup Wizard instead of automatic enrollment.
- Device does NOT appear in Intune after expected enrollment window (typically within 15 minutes of first power-on with internet).
- {OEM-specific admin observable, e.g., "Admin reports {vendor portal} sign-in shows ..."}

### L1 Triage Steps

1. > **Say to the user:** "{User-facing scripted line specific to OEM}."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1, model (e.g., {OEM model example}), Android OS version if known.

### Admin Action Required

**Ask the admin to:**

- {OEM-specific admin action 1, with cross-link to admin doc anchor — e.g., `[admin doc Step 0](../admin-setup-android/09-aosp-realwear.md#step-0-...)` or `[admin doc Common Failures](../admin-setup-android/09-aosp-realwear.md#common-failures)` per D-21}.
- {OEM-specific admin action 2}.

**Verify:**

- After admin action: {OEM-specific verification — e.g., "device appears in {vendor portal} Devices view within 24 hours."}.
- After user factory-resets device: device initiates AOSP enrollment flow and arrives in Intune within ~15 minutes.

**If admin confirms admin actions complete AND enrollment still fails:** Route to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause A)

- {OEM-specific escalation criteria 1}
- {OEM-specific escalation criteria 2}
```

**Apply identically (verbatim template) to Causes B (Zebra), C (Pico), D (HTC), E (Meta Quest).** Per RESEARCH.md §1 per-OEM data, Cause E (Meta Quest) cross-links to `13-aosp-meta-quest.md#meta-horizon-subscription-status` for subscription-related failures (D-17 explicit).

#### Aggregate `## Escalation Criteria` H2 (D-17 — mirrors sibling 27 + 28)

**Source:** `28-android-knox-enrollment-failed.md:190-225` (35 lines) + `27-android-zte-enrollment-failed.md:206-234` (28 lines).
```markdown
## Escalation Criteria

(Overall — applies across all five OEM-scoped L1-diagnosable causes A-E.)

Escalate to L2. See [Android AOSP Investigation](../l2-runbooks/23-android-aosp-investigation.md) for per-OEM Pattern A-E investigation and [Android Log Collection Guide](../l2-runbooks/18-android-log-collection.md).

Escalate to L2 if:

- Cause A (RealWear): {Escalation criterion}
- Cause B (Zebra): {Escalation criterion}
- Cause C (Pico): {Escalation criterion}
- Cause D (HTC): {Escalation criterion}
- Cause E (Meta Quest): {Escalation criterion — likely subscription-status edge case OR HMS-wind-down transition state}

**Before escalating, collect:**

- Device serial number + IMEI 1 (or MEID for CDMA)
- Device manufacturer (one of: RealWear / Zebra / Pico / HTC / Meta), model, firmware / Android version
- Which OEM-scoped Cause (A/B/C/D/E) closest matches observation
- {Per-Cause data-collection items — mirror 28:213-223 structure}
- Number of devices affected (single device vs fleet — shape-of-problem signal)
- Timestamp of most recent failed enrollment attempt
```

#### Trailing back-link + Version History

**Source:** `28-android-knox-enrollment-failed.md:227-234`
```markdown
[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 scope) — 5 OEM-scoped Causes A-E (RealWear / Zebra / Pico / HTC / Meta Quest) + aggregate `## Escalation Criteria` H2 per D-17. Closes Phase 40 ANDE1 escalation stub via D-19 triage tree edit. In-runbook OEM-identification step per D-20 (deliberate departure from sibling no-pre-Cause-routing precedent — see plan rationale). | -- |
```

#### Sibling-departure rationale (D-22 — REQUIRED in 45-PLAN.md)

Two explicit departure rationales must be captured in 45-PLAN.md task spec:
1. **5-OEM Cause partitioning vs sibling 4-failure-class precedent** — defuses F-4A-CRIT-01 (downgraded MED).
2. **In-runbook OEM-identification step (`## How to Use This Runbook`) vs sibling no-pre-Cause-routing precedent** — defuses F-4A-CRIT-03 (downgraded MED).

---

### L2 Runbook 23 — Wave 3 Plan B (1 plan)

**Primary analog:** `docs/l2-runbooks/22-android-knox-investigation.md` (Phase 44, 305 lines, Pattern A-E + per-Pattern Microsoft Support escalation packet).

#### Frontmatter pattern (D-27)

**Source:** `22-android-knox-investigation.md:1-7`
```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: AOSP
audience: L2
platform: Android
---
```

#### Title + Context H2

**Source:** `22-android-knox-investigation.md:11-17`
```markdown
# Android AOSP Enrollment Investigation

## Context

This runbook covers AOSP enrollment failure investigation across the 5 specialty-hardware OEMs supported on AOSP in Intune (RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest). KME / Knox-managed Samsung enrollment is out of scope (see [22-android-knox-investigation.md](22-android-knox-investigation.md)). DigiLens / Lenovo / Vuzix per-OEM coverage is deferred to v1.5.

Before starting: collect a diagnostic package per the [Android Log Collection Guide](18-android-log-collection.md). Per-OEM admin actions reference [09-aosp-realwear.md](../admin-setup-android/09-aosp-realwear.md), [10-aosp-zebra.md](../admin-setup-android/10-aosp-zebra.md), [11-aosp-pico.md](../admin-setup-android/11-aosp-pico.md), [12-aosp-htc-vive-focus.md](../admin-setup-android/12-aosp-htc-vive-focus.md), [13-aosp-meta-quest.md](../admin-setup-android/13-aosp-meta-quest.md).
```

#### L1→L2 Pattern routing block (D-18 — 1:1 OEM-scoped Cause→Pattern)

**Source:** `22-android-knox-investigation.md:19-26`
```markdown
**From L1 escalation?** [L1 runbook 29 (AOSP enrollment failed)](../l1-runbooks/29-android-aosp-enrollment-failed.md) has escalated. L1 collected: serial number, OEM (RealWear / Zebra / Pico / HTC / Meta), observed Cause. Skip to the Pattern matching L1's Cause:

- L1 29 Cause A (RealWear) → [Pattern A](#pattern-a-realwear)
- L1 29 Cause B (Zebra) → [Pattern B](#pattern-b-zebra)
- L1 29 Cause C (Pico) → [Pattern C](#pattern-c-pico)
- L1 29 Cause D (HTC) → [Pattern D](#pattern-d-htc)
- L1 29 Cause E (Meta Quest) → [Pattern E](#pattern-e-meta-quest)
- No L1 escalation: begin at Investigation Data Collection Step 1
```

#### Graph API READ-ONLY scope blockquote

**Source:** `22-android-knox-investigation.md:28`
```markdown
> **Graph API scope:** Where this runbook references the Microsoft Graph API, usage is strictly READ-ONLY (GET requests). No modifications. No token regeneration. No DPC extras JSON mutation.
```

#### `## Investigation — Data Collection (mode-agnostic)` Steps 1-N

**Source:** `22-android-knox-investigation.md:30-107` (Steps 1-4)
**Apply:** mirror 4-step structure (Intune admin center registration state → Vendor portal device state → Profile + token sync → Device-side enrollment state). For AOSP, vendor portals vary per OEM (RealWear Cloud, Meta for Work, none for HTC/Zebra/Pico-without-Business-Suite); the planner authors per-OEM Step 2 variations within the mode-agnostic 4-step shell.

#### Per-Pattern structure (D-18 LOCKED)

**Source:** `22-android-knox-investigation.md:113-141` (Pattern A complete template)
```markdown
### Pattern A: {OEM} enrollment failure {#pattern-a-{oem-slug}}

**Typical class:** ⚙️ Config Error / ⏱️ Timing / etc. — match per-OEM-specific failure class

**Symptom:** {OEM-specific observable symptom}

**Known Indicators:**

- {Indicator 1}
- {Indicator 2}
- {Indicator 3}

**Resolution Steps:**

1. {Step 1 with admin doc cross-link, e.g., `[09-aosp-realwear.md#wi-fi-qr-embedding](../admin-setup-android/09-aosp-realwear.md#wi-fi-qr-embedding)`}
2. {Step 2}
3. {Step 3}

**Microsoft Support escalation packet (D-09 / D-18):**

- **Token sync status:** Intune-side enrollment-profile staging-token Active state + last token-rotation timestamp (Intune admin center screenshot).
- **Profile assignment state:** {Per-OEM analog: vendor-portal screenshot OR "N/A — vendor portal not used for {OEM}" per Pattern}.
- **Enrollment profile GUID:** Intune admin center URL fragment for the AOSP enrollment profile (Graph API READ-ONLY GET if URL not directly visible: `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`).
```

**Apply identically to Patterns A (RealWear), B (Zebra), C (Pico), D (HTC), E (Meta Quest).** RESEARCH.md §1 provides per-OEM Resolution Steps content; Pattern E (Meta Quest) Resolution Steps must cross-reference HMS subscription-status edge case per RESEARCH.md §2.

#### Play Integrity Verdict Reference (D-18 — Play Integrity 3-tier ONLY; ZERO SafetyNet)

**Source:** `22-android-knox-investigation.md:256-264`
```markdown
## Play Integrity Verdict Reference (AOSP-relevant)

AOSP L2 investigation references Play Integrity 3-tier verdicts ONLY:

- **Basic integrity** — device hardware/OS not detected as compromised.
- **Basic + Device integrity** — adds basic device-recognition signal.
- **Strong integrity** — requires hardware-backed boot attestation from device TEE.

Use the 3-tier verdict as the canonical attribution surface — do not reference legacy attestation token formats. **Do NOT reference SafetyNet** (deprecated and turned off January 2025).
```

**Anti-pattern (RESEARCH.md §"Anti-Patterns"):** Zero SafetyNet token references. Sibling `22-android-knox-investigation.md:256-264` is verbatim template.

#### `## Resolution`, `## Related Resources`, `## Version History` H2s

**Source:** `22-android-knox-investigation.md:266-305`
**Apply:** mirror sibling structure verbatim; substitute KME-specific cross-links with AOSP-specific cross-links (5 per-OEM admin docs + L1 runbook 29 + glossary entries for OEMConfig / AOSP-specific terms).

---

### Atomic Wave 4 Retrofits — 6 in-place edits + 1 file deletion

#### Retrofit 1: `06-aosp-stub.md` Deferred Content Table COLLAPSE (AEAOSPFULL-09)

**Operation:** REMOVE the entire `## Deferred Content` H2 + 8-row table (lines 80-91); preserve everything else.
**Preservation contract (D-24 LOCKED):**
- 9-H2 whitelist preserved (Phase 39 D-11): `## Scope and Status` (line 21), `## What AOSP Is` (line 27), `## When to Use AOSP` (line 31), `## Supported OEMs` (line 40), `### RealWear (confirmed GA)` (line 45 H3 sub), `### Other AOSP-Supported OEMs` (line 51 H3 sub), `## Enrollment Constraints` (line 66), `## Prerequisites and Licensing` (line 74), `## See Also` (line 93), `## Changelog` (line 103).
- ⚠️ blockquote scope-and-status callout PRESERVED (line 23): `> ⚠️ **Stub in v1.4; full AOSP admin coverage planned for v1.4.1.**`. The "v1.4.1 coverage planned" framing should be REVISED in this same retrofit to reflect Phase 45 ship; suggested replacement: `> **AOSP per-OEM coverage SHIPPED in v1.4.1 (Phase 45).** See [aosp-oem-matrix.md](../reference/aosp-oem-matrix.md) for the cross-OEM capability matrix and per-OEM admin guides 09-13.`
- 8-OEM enumeration in `## Supported OEMs` PRESERVED (lines 41-65). Add cross-links to new admin docs 09-13 in the RealWear / HTC / Pico / Meta / Zebra entries (sibling pattern: `06-aosp-stub.md:47` already has "Per-OEM enrollment mechanics ... are deferred to Phase 45" — replace with "Per-OEM enrollment mechanics: see [09-aosp-realwear.md](09-aosp-realwear.md)").
- HTML-comment subtractive deletions (lines 15-19) PRESERVED.
- Platform note + Platform gate banners PRESERVED.

**Add `## Changelog` row:**
```markdown
| 2026-04-25 | Phase 45 AEAOSPFULL-09: Deferred Content table COLLAPSED — per-OEM coverage NOW SHIPPED in 09-13 admin docs + aosp-oem-matrix.md + L1 runbook 29 + L2 runbook 23. PITFALL-7 framing + 9-H2 whitelist + 8-OEM enumeration + Platform note PRESERVED per D-24 LOCKED. | -- |
```

#### Retrofit 2: `android-capability-matrix.md:121-127` Anchor Fill (AEAOSPFULL-09 verbatim "link to")

**Operation:** EDIT lines 120-127 (the `<a id="deferred-full-aosp-capability-mapping"></a>` block) — replace deferral prose with cross-link to new `aosp-oem-matrix.md`.

**Source (current state):** `android-capability-matrix.md:120-127`
```markdown
<a id="deferred-full-aosp-capability-mapping"></a>
### Deferred: Full AOSP capability mapping

AOSP (Android Open Source Project) devices — RealWear, Zebra, Pico, HTC VIVE
Focus, Meta Quest — appear in this matrix as a single stub-reference row.
Per-OEM capability mapping and feature-by-feature expansion are deferred to
v1.4.1. See [AOSP stub](../admin-setup-android/06-aosp-stub.md).
```

**Target (post-retrofit):**
```markdown
<a id="deferred-full-aosp-capability-mapping"></a>
### AOSP per-OEM capability mapping

AOSP (Android Open Source Project) devices — RealWear, Zebra, Pico, HTC VIVE
Focus, Meta Quest — appear in this matrix as a single AOSP column. Per-OEM
capability mapping (5-OEM × 4-capability-H2 sub-tables) is documented in
[AOSP OEM Matrix](aosp-oem-matrix.md). See also [AOSP stub](../admin-setup-android/06-aosp-stub.md).
```

**Sibling precedent:** Phase 44 anchor-fill pattern at `android-capability-matrix.md:113-118` (Knox row added by Phase 44). Same in-place transform shape.

**Update `## Version History` (line 143-144):**
```markdown
| 2026-04-25 | Phase 45 AEAOSPFULL-09: `#deferred-full-aosp-capability-mapping` anchor fill — replaced "deferred to v1.4.1" prose with cross-link to new `aosp-oem-matrix.md` per AEAOSPFULL-09 verbatim "link to" wording. Anchor preserved for backward-compat. | -- |
```

#### Retrofit 3: `08-android-triage.md` Mermaid + Routing Verification Edit (D-19)

**Operation 1 — Mermaid edge swap at line 37:**

**Source (current):** `08-android-triage.md:37`
```mermaid
AND1 -->|"Specialty hardware<br/>(AOSP)"| ANDE1(["Escalate L2 —<br/>AOSP L1 troubleshooting<br/>out of scope in v1.4"])
```

**Target:**
```mermaid
AND1 -->|"Specialty hardware<br/>(AOSP)"| ANDR29(["See: AOSP Enrollment Failed<br/>(Runbook 29)"])
```

**Operation 2 — Add click line near line 68:**
```mermaid
click ANDR29 "../l1-runbooks/29-android-aosp-enrollment-failed.md"
```

**Operation 3 — Update classDef list at line 72:**
```diff
-class ANDR22,ANDR23,ANDR24,ANDR25,ANDR26,ANDR27 resolved
+class ANDR22,ANDR23,ANDR24,ANDR25,ANDR26,ANDR27,ANDR29 resolved
```

**Operation 4 — Remove ANDE1 from escalateL2 classDef at line 73:**
```diff
-class ANDE1,ANDE2,ANDE3 escalateL2
+class ANDE2,ANDE3 escalateL2
```

**Operation 5 — Remove the ANDE1 explanatory blockquote at line 76** (no longer needed since ANDE1 no longer exists):
```diff
-> For AOSP tickets (ANDE1): collect device OEM / model, serial number, ticket context. See [AOSP stub](../admin-setup-android/06-aosp-stub.md) for scope context. AOSP L1 troubleshooting is out of scope in v1.4; AOSP L1 content is planned for v1.4.1.
```

**Operation 6 — Routing Verification table single-row update at line 100:**

**Source (current):**
```markdown
| AOSP all paths | Specialty hardware (AOSP) | (any) | Escalate ANDE1 (L2 out-of-scope v1.4) |
```

**Target:**
```markdown
| AOSP all paths | Specialty hardware (AOSP) | (any) | Runbook 29 |
```

**Operation 7 — Escalation Data table line 121 — REMOVE the AOSP row** (no longer escalation; now runbook-routed):
```diff
-| AOSP — out of scope v1.4 (ANDE1) | Device OEM / model, serial number, User UPN, ticket context, AOSP enrollment method attempted. Route to L2. |
```

**Operation 8 — `## Related Resources` line 131 — UPDATE AOSP Stub cross-link to use new context wording:**
```diff
-- [AOSP Stub](../admin-setup-android/06-aosp-stub.md) — AOSP scope context (ANDE1 escalations)
+- [AOSP Stub](../admin-setup-android/06-aosp-stub.md) — AOSP scope context
+- [L1 Runbook 29: AOSP Enrollment Failed](../l1-runbooks/29-android-aosp-enrollment-failed.md) — AOSP failure routing
```

**Single-target preservation (Phase 40 D-05 LOCK + ROADMAP SC#4 verbatim):** All AOSP routing now flows through ANDR29; no multi-terminal nodes; "single click target" preserved per CONTEXT D-19.

#### Retrofit 4: `02-provisioning-methods.md` Additive Edits (AEAOSPFULL-09 SC#5)

**Operation 1 — Update line 29 AOSP row Notes column** to mention 90-day token ceiling + per-OEM firmware reference:

**Source (current):**
```markdown
| <a id="aosp"></a>AOSP | ✗ | ✓ (Android 10+, one device at a time, Wi-Fi credentials embedded in QR for RealWear-class OEMs) | ✗ | ✗ | OEM firmware-specific; full per-OEM coverage in Phase 45 — see Phase 39 AOSP stub. |
```

**Target:**
```markdown
| <a id="aosp"></a>AOSP | ✗ | ✓ (Android 10+, one device at a time, Wi-Fi credentials embedded in QR for RealWear-class OEMs) | ✗ | ✗ | OEM firmware-specific — see [AOSP OEM Matrix](../reference/aosp-oem-matrix.md#hardware-scope) for per-OEM minimum firmware (RealWear / Zebra / Pico / HTC / Meta Quest). Token ceiling: userless = 90 days max; user-associated = up to 65 years (asymmetry per MS Learn). |
```

**Operation 2 — Add new H2 `## AOSP Token Expiry Asymmetry` (sibling pattern: `## Knox Mobile Enrollment` at line 51 — additive H2 from Phase 44):**

```markdown
<a id="aosp-token-expiry"></a>
## AOSP Token Expiry Asymmetry

AOSP enrollment tokens follow a different expiry model than COBO/Dedicated Android Enterprise tokens:

- **Userless AOSP tokens — 90 days maximum.** Per MS Learn AOSP corporate-userless guidance, userless AOSP enrollment tokens have a hard 90-day ceiling. Plan rotation BEFORE the 90-day mark to prevent enrollment-flow break for net-new device deliveries.
- **User-associated AOSP tokens — up to 65 years** (same ceiling as COBO/Dedicated staging tokens per Phase 36).

Both ceilings must be considered separately when planning AOSP fleet enrollment cadence. The 90-day ceiling is shorter than any GMS-mode token ceiling and represents a unique operational constraint of userless AOSP. See [AOSP OEM Matrix](../reference/aosp-oem-matrix.md#intune-aosp-mode) for per-OEM mode-support.

`[HIGH: MS Learn aosp-corporate-userless + setup-aosp-corporate-userless, last_verified 2026-04-25]`
```

**Operation 3 — Update `## See Also` (line 57-61) to add AOSP OEM matrix cross-link:**
```markdown
- [AOSP OEM Matrix](../reference/aosp-oem-matrix.md) — per-OEM AOSP capability mapping (Phase 45)
```

#### Retrofit 5: `l1-runbooks/00-index.md` Append-Only Android Section Update

**Operation 1 — Add Runbook 29 row in Android L1 Runbooks table at line 76:**
```markdown
| [29: Android AOSP Enrollment Failed](29-android-aosp-enrollment-failed.md) | AOSP enrollment did not initiate or stalled across 5 OEMs (RealWear / Zebra / Pico / HTC / Meta Quest) | AOSP only |
```

**Operation 2 — REMOVE the "AOSP Note" blockquote at line 77** (no longer applies):
```diff
-> **AOSP Note:** No L1 runbook exists for AOSP (specialty hardware) failures — escalate to L2. AOSP L1 coverage is planned for v1.4.1. See [Android Triage](../decision-trees/08-android-triage.md) node ANDE1 for the escalation data checklist.
```

**Operation 3 — Update `## Version History` table line 104:**
```markdown
| 2026-04-25 | Phase 45 AEAOSPFULL-09: Added Runbook 29 (Android AOSP Enrollment Failed) to Android L1 Runbooks section; removed AOSP-out-of-scope note (ANDE1 retired per D-19) | -- |
```

**Sibling precedent:** Phase 40 / Phase 44 append-only Android section updates (line 104: "Added Android L1 Runbooks section (runbooks 22-27)").

#### Retrofit 6: `_glossary-android.md` Additive Entries

**Operation 1 — Add `OEMConfig` to alphabetical index at line 15:**
```diff
-...| [Managed Google Play](#managed-google-play) | [Managed Home Screen](#managed-home-screen) | [Play Integrity](#play-integrity) | ...
+...| [Managed Google Play](#managed-google-play) | [Managed Home Screen](#managed-home-screen) | [OEMConfig](#oemconfig) | [Play Integrity](#play-integrity) | ...
```

**Operation 2 — Add `### OEMConfig` H3 entry under `## Compliance & Attestation` H2 (or under `## Provisioning Methods` if more category-fit; sibling Knox H3 placement was Provisioning Methods — line 90):**

```markdown
### OEMConfig

OEMConfig is Google's Android Enterprise mechanism for OEM-specific device-policy delivery via OEM-published Managed Configurations apps in Managed Google Play. For AOSP devices (no GMS / no MGP), Microsoft Intune supports OEMConfig via APK push: the OEM publishes their OEMConfig app as a downloadable APK (e.g., Zebra's "Zebra OEMConfig Powered by MX" for Android 13+ AND 11; "Legacy Zebra OEMConfig" for Android 11 and earlier), the admin uploads the APK as an Intune line-of-business app, and the device receives the OEMConfig profile via the AOSP enrollment + APK install flow. OEMConfig profile schemas are OEM-controlled (Zebra MX 13.5 / 14.2; other OEMs vary).

> **Cross-platform note:** OEMConfig is Android-specific. No Apple, Windows, or pure-AOSP-without-OEM-collaboration equivalent. The OEMConfig delivery path differs by GMS-availability: GMS-mode Android Enterprise uses Managed Google Play; AOSP uses APK push via Intune line-of-business app upload.
```

**Optional — Add `### Meta Horizon Managed Services` entry IF it has not already been introduced from Phase 45 admin docs:** Author's call per CONTEXT Claude's Discretion.

**Operation 3 — Update `## Version History` table (line 165):**
```markdown
| 2026-04-25 | Phase 45 AEAOSPFULL-09: 1 new alphabetical-index entry (OEMConfig) + 1 new H3 under {appropriate category H2}; cross-link FROM Knox/Zebra entries TO new OEMConfig entry. | — |
```

**Sibling precedent:** Phase 44 line 166: "Phase 44 (AEKNOX-06): 3 new Provisioning Methods H2 entries (Knox / KME / KPE) + 3 new alphabetical-index entries between Fully Managed and Managed Google Play".

#### Retrofit 7: `PHASE-45-AOSP-SOURCE.md` DELETION

**Operation:** Delete file in Phase 45 final commit per Phase 43 D-20 lifecycle contract (CONTEXT D-29 + ROADMAP / Phase 43 inheritance).
**No analog needed.** Lifecycle handoff: Phase 43 → Phase 45 contract specifies deletion in Phase 45 final commit.

---

## Shared Patterns

### Authentication / Authorization

**N/A — Phase 45 is documentation-only.** No API surface; no auth flows; no authorization patterns. RESEARCH.md §"Project Constraints" verbatim: "Phase 45 carries no API surface, no auth flows, no input-validation surface — `security_enforcement` not applicable as defined for code-bearing phases."

### Error Handling — Inline `> What breaks if misconfigured` blockquote

**Source:** `07-knox-mobile-enrollment.md:42, 56, 70, 75, 92, 105, 119, 145, 158` (9 instances per doc) + `03-fully-managed-cobo.md:55, 79, 89, 93, 119, 121, 123` (similar density).

**Apply to:** every action point inside `## Provisioning Steps` H3 children across all 5 admin docs (09-13).

**Verbatim shape:**
```markdown
   > **What breaks if misconfigured:** {What goes wrong}. Recovery: {recovery action}. Symptom appears in: {portal/UI surface where symptom manifests}.
```

### Validation — Source-confidence marker

**Source:** Phase 37 D-11 / Phase 39 D-20 / D-28 inheritance.
```markdown
`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`
`[MEDIUM: vendor-side inference, last_verified 2026-04-25]`
```
**Regex:** `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`
**Apply to:** every per-OEM "supported under AOSP" assertion + every license-tier claim + every wind-down/version-volatility claim. RESEARCH.md §1 already pins per-OEM markers; planner propagates verbatim.

### Cross-link discipline (D-21 LOCKED)

**Source:** `28-android-knox-enrollment-failed.md:64, 138` cross-link convention to admin doc anchors.
**Convention:** `[admin doc Step X](../admin-setup-android/{NN}-...md#step-x-...)` or `[admin doc Common Failures](../admin-setup-android/{NN}-...md#common-failures)`.
**Apply to:** L1 runbook 29 Cause→admin-doc cross-links (5 OEMs); L2 runbook 23 Pattern→admin-doc cross-links (5 OEMs).
**Wave dependency (per CONTEXT D-30):** Wave 1 admin docs MUST emit stable `<a id="common-failures"></a>` (D-05) BEFORE Wave 3 runbooks 29 + 23 land cross-links.

### PITFALL-7 framing carry-forward (D-23 + D-04)

**Source:** Phase 39 D-10 inheritance + STATE.md "PITFALL-7 erosion (Phase 45)" Blocker.
**Apply to:** every per-OEM "supported under AOSP" assertion across 09-13, `aosp-oem-matrix.md`, runbook 29, runbook 23. Pair inline:
> "supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead."

### HTML-comment subtractive-deletion pattern (D-29 inheritance from Phase 34 D-17)

**Source:** `06-aosp-stub.md:15-19`
**Apply to:** ALL 5 per-OEM AOSP admin docs (09-13) — top of file, suppress MGP and ZT H4 subsections that don't apply to AOSP.

### Verify-UI-at-execute-time HTML comment (Phase 39 D-07)

**Source:** `02-zero-touch-portal.md:48, 50, 72, 73` + `07-knox-mobile-enrollment.md:34, 51, 65, 114, 154`.
**Apply at:** every portal-navigation step that mentions a specific UI breadcrumb path subject to admin-center UI drift.

### 60-day Android freshness rule (D-26 carry-forward from Phase 34 D-14)

**Apply to:** all NEW Phase 45 docs (09-13, `aosp-oem-matrix.md`, runbook 29, runbook 23) — frontmatter `last_verified: 2026-04-25` + `review_by: 2026-06-24`.
**Special-case (D-10):** `13-aosp-meta-quest.md` `## Renewal / Maintenance` body documents a 30-day re-verify trigger for the Meta Horizon assertion specifically (next forward re-verify: 2026-05-25). Frontmatter `review_by` STILL 60d (+= 2026-06-24) for audit harness C5 uniformity.

### `> ⚠️` emoji-bearing blockquote callout pattern

**Source:** `02-zero-touch-portal.md:16` (KME/ZT mutex), `07-knox-mobile-enrollment.md:14, 127, 162, 171` (mutex / anti-paste / mutex-cross / Android 15 FRP), `06-aosp-stub.md:23` (scope callout).
**Apply to:**
- `13-aosp-meta-quest.md` `## Scope and Status`: ⚠️ Meta Horizon Feb 20, 2026 wind-down callout (D-08 MANDATORY).
- `aosp-oem-matrix.md` `## Scope` H2: ⚠️ AOSP scope reminder (D-13).
- Other ⚠️ callouts: author's call per OEM-distinctive risk (RealWear EAP-not-supported, Zebra Android-12-not-supported, etc.).

---

## Anti-Patterns to Avoid (RESEARCH.md §"Anti-Patterns" — verbatim source for planner enforcement)

| Anti-Pattern | Detection / Risk | Apply Constraint |
|--------------|------------------|------------------|
| Inline-prose Notes column in matrix tables | Phase 39 D-08 carry-forward; D-12 explicit ban | `aosp-oem-matrix.md` — footnotes only for exceptions |
| PITFALL-7 framing erosion | Common erosion: "RealWear is GA on Intune AOSP" without "use AE fully managed instead if GMS is present" | All admin docs 09-13 + matrix + runbooks |
| MGP cross-link from any AOSP doc | AOSP has no GMS / no MGP | All 5 admin docs — use HTML-comment subtractive-deletion instead |
| SafetyNet token references in L2 runbook 23 | D-18 explicit ban; Play Integrity 3-tier verdicts only | L2 runbook 23 |
| Multi-OEM cross-links per Cause in runbook 29 | F-4B-MED-03 disqualified; D-17 4A-winner OEM-scoping prevents | L1 runbook 29 — one Cause = one OEM admin doc cross-link |
| Cross-platform analog assertions ("AOSP equivalent of iOS Supervised Mode") | Out of scope per CONTEXT line 40-41 | All 5 admin docs + matrix + runbooks |
| Wi-Fi EAP claims for RealWear | RealWear staging Wi-Fi REQUIRES WPA/WPA2-PSK or WPA3 only | `09-aosp-realwear.md` `## Wi-Fi QR Embedding Walkthrough` MUST state "NOT EAP" verbatim |
| Confusing userless 90-day token with user-associated 65-year token | MS Learn explicitly differentiates | `02-provisioning-methods.md` Wave 4 — both ceilings surfaced distinctly per AEAOSPFULL-09 SC#5 |
| Pasting MGP-style or ZT-style provisioning JSON into AOSP | Not relevant; AOSP enrollment is QR-only with token, not JSON | No anti-paste callout needed for AOSP per se |

---

## Files With No Analog

**None.** All 14 Phase 45 files (8 NEW + 6 MODIFY) have direct sibling analogs in Phases 34-44. The PHASE-45-AOSP-SOURCE.md DELETION is a lifecycle-contract operation (no analog needed).

The CONTEXT.md adversarial-review winners (1B / 2B / 3B / 4A) plus RESEARCH.md HIGH-confidence per-OEM data already lock structural choices; this map's job is to pin per-file analog citations + concrete excerpts so the planner can author task specs that cite specific line ranges.

---

## Wave-Sequenced Pattern Dependency Graph

Per CONTEXT D-30:

```
Wave 1 (parallel, 5 plans): admin docs 09-13
   │ MUST emit stable `<a id="common-failures"></a>` anchors per D-05
   ▼
Wave 2 (parallel, 2 plans):
   - aosp-oem-matrix.md   ← reads OEM data from Wave 1
   - 06-aosp-stub.md collapse ← independent of admin-doc waves
   │
   ▼
Wave 3 (parallel, 2 plans):
   - L1 runbook 29   ← cross-links Wave 1 #common-failures + Step anchors
   - L2 runbook 23   ← cross-links Wave 1 #common-failures + Pattern anchors
   │
   ▼
Wave 4 (atomic same-commit, 1 plan):
   - 08-android-triage.md (ANDE1 → ANDR29 single click)   ← needs runbook 29 to exist
   - android-capability-matrix.md:121-127 anchor fill     ← needs aosp-oem-matrix.md to exist
   - 02-provisioning-methods.md (90-day token + AOSP firmware)  ← needs aosp-oem-matrix.md anchors
   - l1-runbooks/00-index.md (Android section append for 29)    ← needs runbook 29
   - _glossary-android.md (additive AOSP terms)            ← independent
   - PHASE-45-AOSP-SOURCE.md DELETED                       ← Phase 43 D-20 lifecycle contract
```

**Wave-dependency rationale captured in 45-PLAN.md task specs:** Wave 1 anchors gate Wave 3 cross-links; Wave 2 matrix gates Wave 4 retrofits 2 + 4; Wave 3 runbooks gate Wave 4 retrofits 3 + 5.

---

## Metadata

**Analog search scope:**
- `docs/admin-setup-android/` (admin docs 02, 03, 05, 06, 07)
- `docs/reference/` (capability matrices: android, ios, macos)
- `docs/l1-runbooks/` (27, 28, 00-index)
- `docs/l2-runbooks/` (22)
- `docs/decision-trees/` (08)
- `docs/android-lifecycle/` (02-provisioning-methods)
- `docs/_glossary-android.md`

**Files scanned:** 14 sibling files + 2 input artifacts (CONTEXT.md, RESEARCH.md) + 1 source-handoff artifact (PHASE-45-AOSP-SOURCE.md identified but not opened — deferred to plan-time per Wave 1 Plan 01 owner).

**Pattern extraction date:** 2026-04-25

**Sibling-shipped recency:** all primary analogs shipped within Phases 34-44 (most recent 2026-04-25 — Phase 44 KME admin doc + L1 28 + L2 22). Pattern recency is current; no legacy-pattern risk.
