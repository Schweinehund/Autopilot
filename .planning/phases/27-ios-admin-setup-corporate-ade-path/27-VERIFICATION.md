---
phase: 27-ios-admin-setup-corporate-ade-path
verified: 2026-04-16T00:00:00Z
status: passed
score: 10/10 must-haves verified
re_verification: false
---

# Phase 27: iOS Admin Setup — Corporate ADE Path Verification Report

**Phase Goal:** An Intune admin can configure all three corporate ADE prerequisites — APNs certificate, ABM/ADE token, and ADE enrollment profile — using iOS-specific guides that cross-reference the macOS ABM guide for shared portal steps rather than duplicating them
**Verified:** 2026-04-16
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | An iOS admin template exists that adapts the macOS admin template for iOS-specific conventions | VERIFIED | `docs/_templates/admin-template-ios.md` exists with `platform: iOS`, supervised-only callout pattern in HTML comment, portal-only (no CLI), all structural sections from macOS template preserved |
| 2 | An overview page exists at `docs/admin-setup-ios/00-overview.md` that serves as the routing page for all three iOS admin setup guides | VERIFIED | File exists with Mermaid `graph LR` dependency chain, numbered guide list with all 3 links, prerequisites checklist, `## Portal Navigation Note` section |
| 3 | The overview page establishes the dependency chain (APNs → ABM Token → Enrollment Profile) visually and textually | VERIFIED | Mermaid diagram at line 20 renders APNs → ABM/ADE Token → ADE Enrollment Profile; numbered guide list describes dependency ordering |
| 4 | The portal navigation caveat (D-17) appears once in the overview and nowhere else as a full section | VERIFIED | `## Portal Navigation Note` section exists only in `00-overview.md`; individual guides reference back to it via `00-overview.md#portal-navigation-note` anchor in their platform gate blockquotes |
| 5 | An admin following the APNs certificate guide can create a new certificate and understands the renew-not-replace rule and cross-platform expiry impact | VERIFIED | `01-apns-certificate.md` covers 3-step creation, `## Renewal` with explicit "Always renew. Never create new." callout, cross-platform expiry warning covering iOS+iPadOS+macOS, 4 "What breaks if misconfigured" callouts |
| 6 | An admin following the ABM/ADE token guide can configure the iOS enrollment token using cross-references to the macOS ABM guide for shared portal steps, with only iOS-specific differences documented inline | VERIFIED | `02-abm-token.md` uses 4 step-level cross-reference links to `admin-setup-macos/01-abm-configuration.md` with explicit "iOS-specific difference" annotation per step (including "None" for Step 1 per D-07) |
| 7 | Neither guide duplicates macOS ABM portal click-paths | VERIFIED | `02-abm-token.md` contains no portal click-paths; all 4 steps redirect to macOS guide sections via anchor links |
| 8 | An admin following the ADE enrollment profile guide can configure supervised mode, select an authentication method, customize Setup Assistant panes, and enable locked enrollment | VERIFIED | `03-ade-enrollment-profile.md` covers all 4 areas: Key Concepts section (supervised mode + auth methods), enrollment settings table (6 settings), Setup Assistant panes table (28 rows), locked enrollment detail section |
| 9 | Every supervised-only setting uses the exact D-01 callout pattern linking to `ios-lifecycle/00-enrollment-overview.md#supervision` | VERIFIED | Exactly 2 supervised-only callouts in `03-ade-enrollment-profile.md` (supervised mode and locked enrollment), both use exact `> 🔒 **Supervised only:**` format with link to `../ios-lifecycle/00-enrollment-overview.md#supervision` |
| 10 | The supervised-only callout is placed immediately after each setting description, before configuration steps (D-04) | VERIFIED | Both callouts appear after the setting description paragraph and before the "What breaks if misconfigured" callout for that setting |

**Score:** 10/10 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/_templates/admin-template-ios.md` | iOS admin guide template with supervised-only callout pattern | VERIFIED | Contains `platform: iOS`, `<!-- SUPERVISED-ONLY CALLOUT PATTERN -->` HTML comment with exact D-01 format, "No Terminal/CLI steps" instruction, all structural sections |
| `docs/admin-setup-ios/00-overview.md` | Admin setup overview/index with prerequisites and dependency chain | VERIFIED | Contains `platform: iOS`, Mermaid `graph LR`, links to all 3 guides, `## Prerequisites`, `## Portal Navigation Note` (D-17), `## Cross-Platform References` |
| `docs/admin-setup-ios/01-apns-certificate.md` | APNs certificate creation, renewal, and cross-platform expiry impact guide | VERIFIED | Contains `platform: iOS`, `## Renewal`, "Always renew. Never create new.", cross-platform expiry warning, 5-row Configuration-Caused Failures table, `## Renewal / Maintenance` table |
| `docs/admin-setup-ios/02-abm-token.md` | ABM/ADE token guide with macOS cross-references and iOS-specific differences | VERIFIED | Contains `platform: iOS`, 4 step-level cross-reference links to macOS ABM guide, comparison table (device type filter, platform selection, 12h vs 24h sync, IMEI lookup), Apple School Manager mention |
| `docs/admin-setup-ios/03-ade-enrollment-profile.md` | ADE enrollment profile configuration guide with supervised-only callouts | VERIFIED | Contains `platform: iOS`, exactly 2 supervised-only callouts, 28-row Setup Assistant panes table, deprecated panes note, 30-day removal window note, no `## Renewal / Maintenance` section |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `docs/admin-setup-ios/00-overview.md` | `docs/admin-setup-ios/01-apns-certificate.md` | Markdown link in numbered guide list | VERIFIED | `[APNs Certificate](01-apns-certificate.md)` present at line 25 |
| `docs/admin-setup-ios/00-overview.md` | `docs/admin-setup-ios/02-abm-token.md` | Markdown link in numbered guide list | VERIFIED | `[ABM/ADE Token](02-abm-token.md)` present at line 27 |
| `docs/admin-setup-ios/00-overview.md` | `docs/admin-setup-ios/03-ade-enrollment-profile.md` | Markdown link in numbered guide list | VERIFIED | `[ADE Enrollment Profile](03-ade-enrollment-profile.md)` present at line 29 |
| `docs/admin-setup-ios/01-apns-certificate.md` | `docs/admin-setup-ios/00-overview.md` | See Also link | VERIFIED | `[iOS/iPadOS Admin Setup Overview](00-overview.md)` in See Also |
| `docs/admin-setup-ios/01-apns-certificate.md` | `docs/admin-setup-ios/02-abm-token.md` | Next step footer | VERIFIED | `*Next step: [ABM/ADE Token](02-abm-token.md)*` at line 121 |
| `docs/admin-setup-ios/02-abm-token.md` | `docs/admin-setup-macos/01-abm-configuration.md` | 4 step-level cross-reference links | VERIFIED | Links to `#step-1-download-intune-public-key`, `#step-2-create-mdm-server-and-download-server-token`, `#step-3-upload-server-token-to-intune`, `#step-4-assign-devices-to-mdm-server`; anchor text matches actual headings in target file |
| `docs/admin-setup-ios/03-ade-enrollment-profile.md` | `docs/ios-lifecycle/00-enrollment-overview.md#supervision` | Supervised-only callout links | VERIFIED | Both supervised-only callouts link to `../ios-lifecycle/00-enrollment-overview.md#supervision`; `## Supervision` heading confirmed at line 38 of target |
| `docs/admin-setup-ios/03-ade-enrollment-profile.md` | `docs/admin-setup-ios/02-abm-token.md` | Prerequisite link | VERIFIED | `(see [ABM/ADE Token Guide](02-abm-token.md))` at line 20 |
| `docs/admin-setup-ios/03-ade-enrollment-profile.md` | `docs/ios-lifecycle/01-ade-lifecycle.md` | See Also cross-reference | VERIFIED | `[iOS/iPadOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md)` in See Also |

### Anchor Validity Check

| Anchor | Target Heading | Status |
|--------|---------------|--------|
| `docs/ios-lifecycle/00-enrollment-overview.md#supervision` | `## Supervision` (line 38) | VALID |
| `docs/admin-setup-ios/00-overview.md#portal-navigation-note` | `## Portal Navigation Note` (line 41) | VALID |
| `docs/admin-setup-macos/01-abm-configuration.md#step-1-download-intune-public-key` | `### Step 1: Download Intune Public Key` (line 30) | VALID |
| `docs/admin-setup-macos/01-abm-configuration.md#step-2-create-mdm-server-and-download-server-token` | `### Step 2: Create MDM Server and Download Server Token` (line 42) | VALID |
| `docs/admin-setup-macos/01-abm-configuration.md#step-3-upload-server-token-to-intune` | `### Step 3: Upload Server Token to Intune` (line 55) | VALID |
| `docs/admin-setup-macos/01-abm-configuration.md#step-4-assign-devices-to-mdm-server` | `### Step 4: Assign Devices to MDM Server` (line 67) | VALID |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| ACORP-01 | 27-02-PLAN.md | APNs certificate guide covers creation, renewal, and cross-platform expiry impact warning | SATISFIED | `01-apns-certificate.md` covers 3-step creation, `## Renewal` with renew-not-replace rule, cross-platform expiry warning explicitly naming iOS+iPadOS+macOS, 5 "What breaks" callout scenarios |
| ACORP-02 | 27-02-PLAN.md | ABM/ADE token guide covers iOS token setup with cross-reference to macOS ABM guide for shared portal steps | SATISFIED | `02-abm-token.md` cross-references all 4 macOS ABM guide steps without duplicating click-paths; iOS-specific differences documented inline for each step including explicit "None" for Step 1 |
| ACORP-03 | 27-03-PLAN.md | ADE enrollment profile guide covers supervised mode, authentication methods, Setup Assistant customization, and locked enrollment with supervised-only callout pattern | SATISFIED | `03-ade-enrollment-profile.md` covers all 4 areas with exactly 2 D-01 supervised-only callouts placed per D-04 rules; auth methods table (modern auth recommended, Company Portal phased out, legacy not recommended); 28-row Setup Assistant panes table; locked enrollment detail with 30-day removal window |

No orphaned requirements — ACORP-01, ACORP-02, ACORP-03 are the only Phase 27 requirements in REQUIREMENTS.md (confirmed against Traceability table).

### Anti-Patterns Found

| File | Pattern | Severity | Assessment |
|------|---------|----------|------------|
| All 5 files | Configuration-Caused Failures tables reference "iOS L1 runbooks (Phase 30)" as plain text | Info | Intentional — Phase 30 runbooks do not exist yet. Consistent with macOS admin guide pattern which linked to runbooks only after they were created. Not a stub — the table rows have complete misconfiguration descriptions and symptoms. |
| `03-ade-enrollment-profile.md` | No `## Renewal / Maintenance` section | Info | Correct per template instructions — enrollment profiles have no renewable component. Omission is intentional per D-01 template rule. |

No blockers. No warnings. Info items are intentional design decisions documented in SUMMARYs.

### D-01 Through D-17 Decision Compliance

| Decision | Requirement | Status | Notes |
|----------|-------------|--------|-------|
| D-01 | Supervised-only callout exact blockquote format with lock emoji | HONORED | Both callouts in 03 use exact format |
| D-02 | Callout links to `ios-lifecycle/00-enrollment-overview.md#supervision` not enrollment profile guide | HONORED | Verified by grep — all 3 supervision links point to lifecycle overview |
| D-03 | Every supervised-only setting uses exact format, no variations | HONORED | Only 2 supervised-only settings in scope; both use exact format |
| D-04 | Callout immediately after setting description, before configuration steps | HONORED | Verified by reading file structure at lines 71-75 and 79-83 |
| D-05 | ABM cross-reference structure: context + link + iOS difference | HONORED | All 4 steps follow pattern |
| D-06 | iOS guide does not duplicate macOS portal click-paths | HONORED | No click-paths in 02-abm-token.md steps |
| D-07 | If no iOS difference, one sentence with link is sufficient | HONORED | Step 1 states "iOS-specific difference: None" explicitly |
| D-08 | APNs scope: creation, renewal, cross-platform expiry only | HONORED | No troubleshooting content in 01-apns-certificate.md |
| D-09 | Renew-not-replace is the critical "What breaks" callout | HONORED | Prominently placed in `## Renewal` with bold ALL, NEW, "Always renew. Never create new." |
| D-10 | No diagnostic/troubleshooting steps in APNs guide | HONORED | Guide is preventive only |
| D-11 | APNs shared cross-platform infrastructure stated explicitly | HONORED | Introductory paragraph of 01-apns-certificate.md states this in first sentence |
| D-12 | File structure matches planned layout | HONORED | All 4 files in correct locations |
| D-13 | Overview serves as routing page with prerequisites and links | HONORED | Prerequisites checklist + 3 guide links in 00-overview.md |
| D-14 | Ordering follows APNs → ABM Token → Enrollment Profile dependency chain | HONORED | Mermaid diagram and numbered list sequence |
| D-15 | Template created first (Plan 01) | HONORED | 27-01 created template; 27-02 and 27-03 reference it |
| D-16 | Template adaptations from macOS: platform: iOS, supervised-only callout, no CLI | HONORED | All adaptations verified in template file |
| D-17 | Enrollment profile guide documents concepts and outcomes, not click-paths | HONORED | Step 1 has navigation caveat note; no specific UI click-paths in profile creation steps |

### Human Verification Required

The following items require human review as they cannot be verified programmatically:

#### 1. Supervised-Only Callout Visual Prominence

**Test:** Read `03-ade-enrollment-profile.md` in a rendered Markdown viewer (GitHub, Obsidian, or equivalent)
**Expected:** The lock emoji blockquotes for supervised mode and locked enrollment stand out visually as gates before configuration steps; they read as warnings rather than footnotes
**Why human:** Rendering appearance and reading flow cannot be assessed by grep

#### 2. APNs Renew-Not-Replace Callout Severity

**Test:** Read the `## Renewal` section of `01-apns-certificate.md` in context
**Expected:** The "Always renew. Never create new." callout is the most visually prominent warning in the entire guide; an admin under time pressure would notice it before reaching the renewal steps
**Why human:** Relative visual weight and reading flow require human assessment

#### 3. ABM Token Cross-Reference Readability

**Test:** Read Steps 1-4 of `02-abm-token.md` as a first-time admin
**Expected:** The cross-reference pattern feels seamless — admin understands what they are cross-referencing before clicking; iOS-specific differences are clear and actionable
**Why human:** Reader experience and information density assessment require human judgment

---

## Gaps Summary

No gaps. All 10 observable truths verified. All 5 required artifacts exist and are substantive. All 9 key links verified including anchor validity. All 3 requirements (ACORP-01, ACORP-02, ACORP-03) satisfied. No anti-patterns that block the phase goal.

Phase goal achieved: An Intune admin can configure all three corporate ADE prerequisites using the created guides, which cross-reference the macOS ABM guide for shared portal steps without duplication.

---

*Verified: 2026-04-16*
*Verifier: Claude (gsd-verifier)*
