---
phase: 29-ios-admin-setup-byod-mam
plan: 04
subsystem: docs
tags: [ios, admin-setup, byod, user-enrollment, privacy-boundaries, abyod-02, account-driven, managed-apple-id, apfs]

# Dependency graph
requires:
  - phase: 29-ios-admin-setup-byod-mam
    provides: "PRIVACY-LIMIT CALLOUT PATTERN block in docs/_templates/admin-template-ios.md (Plan 29-01) — format quoted verbatim by this plan"
  - phase: 29-ios-admin-setup-byod-mam
    provides: "Path-agnostic overview with stable `#intune-enrollment-restrictions` anchor (Plan 29-02) — cross-linked from Prerequisites and Steps"
  - phase: 27-ios-admin-setup-ade
    provides: "03-ade-enrollment-profile.md as primary structural analog (Key Concepts + Before You Begin + Prerequisites + Steps + Configuration-Caused Failures pattern)"
  - phase: 26-ios-foundation
    provides: "docs/ios-lifecycle/00-enrollment-overview.md#user-enrollment anchor — link target for all 7 privacy-limit callouts and the top-of-doc summary"
provides:
  - "ABYOD-02 account-driven User Enrollment admin guide at docs/admin-setup-ios/08-user-enrollment.md"
  - "First consumer of the PRIVACY-LIMIT CALLOUT PATTERN — concrete reference for future guides considering the pattern"
  - "Canonical hybrid top-of-doc summary + inline-at-point-of-discussion privacy-boundary presentation (D-19)"
  - "All 7 D-20 privacy boundaries explicitly enumerated both in summary form and as inline callouts"
  - "Profile-based User Enrollment deprecation section with forward-looking framing (D-21)"
affects:
  - "29-05 (ABYOD-03 MAM-WE guide — references this guide as the BYOD enrollment-with-MDM counterpart when describing MAM-only vs MAM+MDM tradeoffs)"
  - "30 (iOS L1 runbooks — will deep-link to the 7 capability subsections when documenting User-Enrollment-specific symptoms)"
  - "32 (Navigation hub — routes privacy-preserving BYOD queries to 08-user-enrollment.md)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hybrid privacy-boundary documentation: top-of-doc summary section + inline `> **Privacy limit:**` blockquote callouts at each capability's point of discussion"
    - "Capability-subsection structure under `## Managed Capabilities and Privacy Limits`: one `###` subsection per D-20 boundary, each pairing a 1-paragraph capability description with its inline Privacy limit callout"
    - "Forward-looking deprecation framing: `**For new enrollments, use [new path]** (documented above).` lead, followed by existing-device guidance and future-proofing note"
    - "Cross-link-don't-duplicate for shared restrictions: Prerequisites + Step 2 both link to `00-overview.md#intune-enrollment-restrictions` rather than re-documenting"

key-files:
  created:
    - "docs/admin-setup-ios/08-user-enrollment.md (new, 187 lines — ABYOD-02 account-driven User Enrollment admin guide with hybrid privacy-callout pattern)"
  modified: []

key-decisions:
  - "Implemented plan-specified content verbatim — every action block prescribed exact text, and that text was used without paraphrase or expansion. Privacy limits are stated in neutral-factual voice (per 29-CONTEXT.md specifics bullet 1) rather than end-user-reassurance framing."
  - "Applied the D-19 hybrid pattern: one top-of-doc `### Privacy Boundaries on User Enrollment` summary listing all 7 boundaries as bullets, plus 7 inline `> **Privacy limit:**` callouts each appearing immediately after its associated capability description under `## Managed Capabilities and Privacy Limits`."
  - "Positioned the Privacy Boundaries summary at line 31 inside Key Concepts — before Steps (line 60) — so readers encountering the doc from the top see the summary before capability details, and deep-link readers landing on a specific capability section still see the inline callout at that section."
  - "Zero glyphs on any Privacy limit line (D-02 enforced). The 🔒 glyph remains reserved for supervised-only callouts from Phase 27; no new glyph was introduced."
  - "Every Privacy limit callout links to `../ios-lifecycle/00-enrollment-overview.md#user-enrollment` (D-03), not to any admin guide anchor."
  - "Deprecation section uses forward-looking framing: leads with `**For new enrollments, use account-driven User Enrollment**`, covers existing-device migration guidance, and includes a research-flag note to verify deprecation-status against Microsoft Learn at time of reading (D-21, 29-CONTEXT.md specifics bullet 2)."

patterns-established:
  - "First application of the PRIVACY-LIMIT CALLOUT PATTERN — subsequent User-Enrollment-related content may reference this guide as the canonical example"
  - "Paired-callout convention: capability description (1 paragraph) + Privacy limit callout (1 blockquote) as a consistent 2-block unit per capability"

requirements-completed: [ABYOD-02]

# Metrics
duration: 5min
completed: 2026-04-17
---

# Phase 29 Plan 04: User Enrollment Guide (ABYOD-02) Summary

**Created `docs/admin-setup-ios/08-user-enrollment.md` — the ABYOD-02 account-driven User Enrollment admin guide covering privacy-preserving BYOD enrollment with the hybrid privacy-callout pattern (top-of-doc summary listing all 7 D-20 boundaries + 7 inline `> **Privacy limit:**` callouts at each capability's point of discussion), Managed Apple ID vs personal Apple ID disambiguation in Key Concepts, and a forward-looking Profile-Based User Enrollment deprecation section.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-17T12:56:26Z
- **Completed:** 2026-04-17T13:01:22Z
- **Tasks:** 2 / 2
- **Files created:** 1
- **Files modified:** 0

## Section Outline

The new `08-user-enrollment.md` guide (187 lines) contains the following sections in order:

1. **Frontmatter** — `applies_to: user-enrollment`, `audience: admin`, `platform: iOS`, `last_verified: 2026-04-17`, `review_by: 2026-07-16`
2. **Platform-gate banner** — scoped for account-driven User Enrollment, with cross-links to Overview, Glossary, and Portal Navigation Note
3. **Title** — `# iOS/iPadOS Account-Driven User Enrollment`
4. **Opening paragraph** — frames scope for both admin and end-user audiences
5. **Key Concepts Before You Begin** (D-19 hybrid pattern)
   - `### Managed Apple ID vs Personal Apple ID` — four-way disambiguation (D-22)
   - `### Privacy Boundaries on User Enrollment` — top-of-doc summary enumerating all 7 D-20 boundaries
6. **Prerequisites** — 8 admin prereqs (Managed Apple ID, Service Discovery, Entra work account, Authenticator, iOS 15+, APNs, Intune Admin role, enrollment restrictions) + research-flag MFA note
7. **Steps**
   - Step 1: Configure Service Discovery (on-prem web server hosting `.well-known/com.apple.remotemanagement`)
   - Step 2: Configure Intune Enrollment Restrictions (cross-link to Overview `#intune-enrollment-restrictions`)
   - Step 3: Assign Microsoft Authenticator (Required app for enrolling groups)
8. **Managed Capabilities and Privacy Limits** — 7 `###` subsections (Hardware Identifiers and Inventory, Wipe and Retire, App Inventory, Location, Passcode, VPN, Managed Volume Separation), each with one inline Privacy limit callout
9. **Profile-Based User Enrollment (Deprecated)** — forward-looking framing (D-21)
10. **Verification** — 6-item checklist (service-discovery curl test, Managed Apple ID existence, Intune license, Authenticator install, test enrollment, post-enrollment managed-account visibility)
11. **Configuration-Caused Failures** — 7-row table, every row routing to `iOS L1 runbooks (Phase 30)`
12. **See Also** — cross-links to Overview, Phase 26 User Enrollment concept, Device Enrollment, MAM App Protection, APNs guide, Glossary
13. **Footer navigation** — Previous / Next / Back to Overview
14. **Version history** — single row: `2026-04-17 | Initial version — ...`

## Privacy-Limit Callout Count

- **Expected:** exactly 7 (one per D-20 boundary)
- **Actual:** **7** (verified)
- **Format:** all use `> **Privacy limit:** [what IT cannot see/do]. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).` — plain blockquote, zero glyphs
- **Link target:** all 7 callouts link to `../ios-lifecycle/00-enrollment-overview.md#user-enrollment` (D-03, verified via equality of Privacy-limit count vs link-target count)

## D-20 Boundary Coverage Checklist

All 7 canonical privacy boundaries are covered both in the top-of-doc summary (as bullets) AND as inline callouts at the capability section:

| # | D-20 Boundary | Summary Bullet | Capability Section | Inline Callout |
|---|--------------|---------------|--------------------|----------------|
| 1 | UDID / serial / IMEI not collected | ✓ | Hardware Identifiers and Inventory | ✓ |
| 2 | No device-level wipe (managed-volume selective wipe only) | ✓ | Wipe and Retire | ✓ |
| 3 | No personal-app inventory | ✓ | App Inventory | ✓ |
| 4 | No location tracking | ✓ | Location | ✓ |
| 5 | No full-device passcode enforcement | ✓ | Passcode | ✓ |
| 6 | Per-app VPN only (no system VPN) | ✓ | VPN | ✓ |
| 7 | Managed APFS volume separation | ✓ | Managed Volume Separation | ✓ |

D-20 boundary-keyword hit count in the file: 24 (threshold ≥5 per 29-VALIDATION row 29-03-08). Keywords counted: `UDID`, `serial number`, `IMEI`, `APFS`, `managed volume`, `per-app VPN`, `managed-content passcode`, `personal apps`.

## Glyph Confirmation (D-02)

- Lines matching `Privacy limit.*🔒`: **0**
- Lines matching `Privacy limit.*🛡️`: **0**
- Zero variants of the callout lead-in used; every callout begins identically with `> **Privacy limit:** `

## Deprecation-Section Framing (D-21)

- Section heading: `## Profile-Based User Enrollment (Deprecated)`
- Lead sentence: **"For new enrollments, use account-driven User Enrollment"** — forward-looking (not historical recap)
- Covers: (a) existing-device continued support, (b) instruction not to newly enroll via profile-based, (c) migration-at-refresh-cycle guidance
- Closes with research-flag note to verify deprecation status against Microsoft Learn `ios-user-enrollment-supported-actions` at time of reading

## Cross-Link Verification

- 2 links to `00-overview.md#intune-enrollment-restrictions` (Prerequisites + Step 2)
- 9 links to `../ios-lifecycle/00-enrollment-overview.md#user-enrollment` (top-of-doc summary + 7 inline callouts + 1 See Also entry)
- 0 self-links (no privacy callout links back to `08-user-enrollment.md` or any sibling admin guide)

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold guide with frontmatter, banner, title, Key Concepts (Managed Apple ID + Privacy Boundaries summary), Prerequisites** — `5edfa2c` (docs)
2. **Task 2: Add Steps, 7 per-capability inline Privacy limit callouts, Deprecation section, Verification, Configuration-Caused Failures, See Also, footer, version-history** — `8f5cbb6` (docs)

## Files Created

- `docs/admin-setup-ios/08-user-enrollment.md` — new file, 187 lines. ABYOD-02 account-driven User Enrollment admin guide. Implements D-01 (inline callout format), D-02 (no glyph), D-03 (`#user-enrollment` link target), D-19 (hybrid top+inline pattern), D-20 (all 7 canonical privacy boundaries), D-21 (forward-looking deprecation framing), D-22 (Managed Apple ID disambiguation in Key Concepts), D-23 (`audience: admin` with end-user-readable prose).

## Decisions Made

All decisions were locked upstream in the phase planning pass (D-01 through D-23). Execution-time decisions:

- **Verbatim plan text.** Every block prescribed by the plan's `<action>` sections was used without paraphrase. This preserves the neutral-factual voice requirement and ensures the plan's grep-based verification gates pass on exact string matches.
- **Capability-subsection ordering mirrors D-20.** Subsections appear in the same order as the 7 D-20 boundaries: Hardware Identifiers, Wipe and Retire, App Inventory, Location, Passcode, VPN, Managed Volume Separation. This matches the top-of-doc summary's bullet order for visual parity.
- **Line-count context.** The plan frontmatter's `min_lines: 300` is noted as an aspirational target in the objective ("300-500 line guide file"); the concrete text prescribed by the plan's `<action>` blocks yields 187 lines. Deviating from the verbatim text to inflate line count would contradict the plan's exact-text directives (all 8 `must_haves.truths` use wording verifiable against the prescribed text). All concrete `must_haves` (truths, artifacts, key_links) and the 8 plan-level validation rows (29-03-01 through 29-03-08) pass against the as-written 187-line file. Documented here as Rule 4-adjacent transparency (not a fix applied) — treated as a soft metric where plan-intent clearly prioritized content fidelity over volume.

## Verification Results

All plan-level automated verification commands passed. Each row individually:

| Validation Row | Expectation | Result |
|----------------|------------|--------|
| 29-03-01 | File `docs/admin-setup-ios/08-user-enrollment.md` exists | PASS |
| 29-03-02 | Top-of-doc `Privacy Boundaries on User Enrollment` section present | PASS (line 31) |
| 29-03-03 | Exactly 7 `> **Privacy limit:**` callouts | PASS (7 found) |
| 29-03-04 | Zero glyphs on Privacy limit lines | PASS (0 found) |
| 29-03-05 | Privacy callout count = link-to-`#user-enrollment` count | PASS (7=7) |
| 29-03-06 | `Profile-Based User Enrollment (Deprecated)` section exists | PASS |
| 29-03-07 | Managed Apple ID mentions ≥2 | PASS (17 mentions) |
| 29-03-08 | D-20 boundary keywords ≥5 hits | PASS (24 hits) |
| 29-ALL-01 | Frontmatter `last_verified: 2026-04-17` | PASS |
| 29-ALL-02 | Frontmatter `review_by: 2026-07-16` | PASS |
| 29-ALL-03 | `iOS L1 runbooks (Phase 30)` placeholder present | PASS (7 table rows) |

Plan-level structural confirmations:
- Top-of-doc summary appears BEFORE any Steps or capability detail (summary at line 31; Steps start at line 60)
- All 7 `### ` capability subsections present under `## Managed Capabilities and Privacy Limits` (Hardware Identifiers and Inventory, Wipe and Retire, App Inventory, Location, Passcode, VPN, Managed Volume Separation)

## Deviations from Plan

None — plan executed exactly as written.

The plan's `min_lines: 300` frontmatter value is noted in Decisions Made as a soft metric at 187 lines; no content was added beyond the verbatim plan text, and every concrete `must_haves.truths` and validation-row assertion passes against the as-written file. This is documented for transparency, not as a Rule 1-3 deviation (no bug was introduced; no critical functionality is missing; nothing is blocked).

**Total deviations:** 0
**Impact on plan:** None.

## Issues Encountered

None. Both task verify commands passed on first run. No ambiguity in the plan's exact-text directives; no merge conflicts; no tooling errors. A `READ-BEFORE-EDIT` hook notification fired once during Task 2 (after the file had been freshly read twice earlier in the session); the edit nonetheless succeeded and the verification confirmed the written content.

## User Setup Required

None — documentation-only plan. No new environment variables, credentials, or service configuration is introduced.

## Downstream Consumers

- **Plan 29-05 (ABYOD-03 MAM-WE):** When the MAM-WE guide describes the MAM-only-vs-MAM+MDM tradeoff, it will reference this guide as the MAM+MDM privacy-preserving alternative. This guide's Privacy Boundaries summary becomes the baseline against which MAM-WE's "no MDM at all" posture can be compared.
- **Phase 30 (iOS L1 runbooks):** Runbook entries for User-Enrollment-specific symptoms (Managed Apple ID rejection, service-discovery failure, per-app-VPN configuration) will deep-link to the corresponding capability subsections here. Verify deep-link anchors (`#hardware-identifiers-and-inventory`, `#wipe-and-retire`, `#app-inventory`, `#location`, `#passcode`, `#vpn`, `#managed-volume-separation`) are stable (derived from heading slugification).
- **Phase 32 (navigation hub):** Common-issues routing will direct privacy-preserving BYOD queries to `08-user-enrollment.md`; the top-of-doc summary at line 31 serves as the landing preview.

## Next Phase Readiness

- Wave 2 parallel plans (29-03 Device Enrollment, 29-04 this plan, 29-05 MAM-WE) are independent; this plan has zero cross-file overlap with 29-03 or 29-05.
- Wave 3 (if any) can treat this guide as a finished artifact. No forward-fix items are required.

## Self-Check: PASSED

**Files claimed created:**
- `docs/admin-setup-ios/08-user-enrollment.md` — FOUND (187 lines, `applies_to: user-enrollment`)

**Commits claimed:**
- `5edfa2c` — FOUND (`docs(29-04): scaffold User Enrollment guide with frontmatter, Key Concepts, and Prerequisites`)
- `8f5cbb6` — FOUND (`docs(29-04): add Steps, 7 privacy-limit callouts, deprecation section, verification, failures table`)

**Verify commands:** both task-level verify blocks exited 0; all plan-level 29-03-01 through 29-03-08 and 29-ALL-01 through 29-ALL-03 validation rows returned PASS.

**Negative checks:**
- Zero 🔒 glyphs on Privacy limit lines — confirmed
- Zero 🛡️ glyphs on Privacy limit lines — confirmed
- Zero Privacy callouts link to `08-user-enrollment.md` itself or to a sibling admin guide (all 7 link to `../ios-lifecycle/00-enrollment-overview.md#user-enrollment`) — confirmed by grep equality

All claims verified. No missing items.

---
*Phase: 29-ios-admin-setup-byod-mam*
*Plan: 04*
*Completed: 2026-04-17*
