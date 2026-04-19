---
phase: 29-ios-admin-setup-byod-mam
verified: 2026-04-17T14:00:00Z
status: human_needed
score: 11/11 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Privacy-callout prose voice — neutral-factual, not alarmist"
    expected: "Every `> **Privacy limit:**` line in 08-user-enrollment.md reads as a factual statement with no 'IT cannot spy', 'Don't worry', 'beware', 'warning', or end-user-reassurance framing"
    why_human: "Prose voice and tone cannot be grepped; reader judgement needed"
  - test: "Capabilities table scannability test for 07-device-enrollment.md"
    expected: "A reader locates 3 arbitrary capabilities (e.g., app deployment modes, OS update enforcement, silent install) in under 30 seconds each"
    why_human: "UX / scannability judgement cannot be automated"
  - test: "MAM-WE standalone-ness reader test"
    expected: "Reading 09-mam-app-protection.md without following any cross-link, every core concept (MAM-WE definition, SDK requirement, three-level framework, dual-targeting, selective wipe scope) is comprehensible in isolation — no unexplained MDM terminology"
    why_human: "Reading-flow judgement cannot be automated"
  - test: "Mermaid diagram rendering + semantic check (00-overview.md)"
    expected: "When rendered, the diagram communicates 'choose your path' with BYOD/MAM-WE branches clearly parallel to (not downstream of) the ADE chain; four CHOOSE branches visually equal"
    why_human: "Visual comprehension of rendered diagram cannot be grepped; only the absence of forbidden edges can be automated"
---

# Phase 29: iOS Admin Setup — BYOD & MAM Verification Report

**Phase Goal:** An admin or user can understand and configure all non-ADE iOS enrollment paths — Company Portal device enrollment, account-driven user enrollment, and MAM without enrollment — with explicit documentation of what IT cannot see or control on personally-owned devices.
**Verified:** 2026-04-17T14:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (Roadmap Success Criteria + Plan Must-Haves)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | SC#1: Device enrollment guide covers Company Portal AND web-based flows for personal/corporate devices without ABM, including capabilities available without supervision | VERIFIED | `07-device-enrollment.md` lines 46-55 (Flow 1 vs Flow 2 concept), lines 112-159 (Flow 1 + Flow 2 per-flow sections), lines 18-42 (Capabilities Available Without Supervision table, 17 rows, 11 Yes/6 No) — 27 occurrences of "web-based/company portal" far exceeds the ≥4 threshold |
| 2 | SC#2: User enrollment guide describes what IT can/cannot see or do on personally-owned device — privacy limits stated as explicit callouts, not buried in prose | VERIFIED | `08-user-enrollment.md` — hybrid pattern: top-of-doc Privacy Boundaries summary (lines 31-43) + exactly 7 inline `> **Privacy limit:**` callouts (lines 100, 106, 112, 118, 124, 130, 136), one per D-20 boundary; all 7 link to `../ios-lifecycle/00-enrollment-overview.md#user-enrollment` |
| 3 | SC#3: MAM-WE guide is standalone — does not require reading any MDM enrollment guide | VERIFIED | `09-mam-app-protection.md` line 18 explicit standalone framing: "you do not need to read any MDM enrollment guide first"; Key Concepts (lines 20-59) defines MAM-WE, SDK requirement, three-level framework, dual-targeting in-doc; See Also MDM links framed "not required to use MAM-WE" (line 344) |
| 4 | SC#4: Reader can determine from MAM-WE guide alone that it does NOT require MDM enrollment AND wipe scope is managed app data only | VERIFIED | Opening paragraphs (lines 16-18) explicitly state device is not enrolled; Prerequisites (line 69): "MAM-WE does **not** require an APNs certificate, ABM token, or MDM enrollment profile. The device is never enrolled in Intune MDM."; Selective Wipe section (line 150): verbatim contrast "Unlike MDM device wipe (which resets the device to factory state), MAM-WE selective wipe removes only managed app data and corporate accounts." |
| 5 | Template has PRIVACY-LIMIT CALLOUT PATTERN block mirroring existing SUPERVISED-ONLY PATTERN; plain-blockquote, `#user-enrollment` link target, scoped to 08 only; existing SUPERVISED-ONLY block unchanged | VERIFIED | `docs/_templates/admin-template-ios.md` lines 38-49 contain new block; lines 30-36 preserve SUPERVISED-ONLY block byte-identical per git diff in Summary |
| 6 | Overview is path-agnostic (`applies_to: all`), title not "Corporate ADE…", Mermaid branching (CHOOSE node + 4 branches, no ADE-chain → BYOD edges), shared Intune Enrollment Restrictions `##` section with `#intune-enrollment-restrictions` anchor, dual-tier Prerequisites (ADE-Path + BYOD-Path), Portal Navigation Note preserved | VERIFIED | `00-overview.md` frontmatter line 4 (`applies_to: all`), title line 13 (`# iOS/iPadOS Admin Setup`), Mermaid lines 19-31 (flowchart TD + CHOOSE with 4 branches — 4 `CHOOSE -->` edges, zero `C --> G/H/I` forbidden edges), `## Intune Enrollment Restrictions` line 82 with 4 subsections (Platform Filtering, Personal vs Corporate Ownership Flag, Per-User Device Limits, Enrollment-Type Blocking), Prerequisites split into `### ADE-Path Prerequisites` and `### BYOD-Path Prerequisites`, Portal Navigation Note intact at line 74 |
| 7 | 07 guide: Capabilities Available Without Supervision table at top (scannability), no Privacy-limit callouts (ABYOD-02-scoped), Personal vs Corporate ownership section with wipe/retire effects, Phase 30 runbook placeholder in Config-Caused Failures | VERIFIED | Capabilities table at line 18 (before `## Steps` at line 108); 0 occurrences of `Privacy limit:`; `## Personal vs Corporate Ownership` at line 180 with 6-row effects table, identifier-upload and unenrollment/wipe subsections; 12 `iOS L1 runbooks (Phase 30)` occurrences in Configuration-Caused Failures + triage paragraph |
| 8 | 08 guide: exactly 7 inline Privacy-limit callouts (one per D-20 boundary), zero glyphs, all link to `#user-enrollment`; Managed Apple ID vs personal Apple ID disambiguation in Key Concepts; profile-based UE deprecation section with forward-looking framing | VERIFIED | 7 `^> \*\*Privacy limit:\*\*` matches; 0 glyph matches on those lines; 7 link-target matches = 7 callouts; Managed Apple ID mentioned 17 times; `## Profile-Based User Enrollment (Deprecated)` at line 138 with lead "**For new enrollments, use account-driven User Enrollment**" (forward-looking, not historical) |
| 9 | 09 guide: three-level framework (summary + Level 2/3 detail with What Breaks callouts), dedicated Selective Wipe section positioned before policy-level detail, iOS-Specific Behaviors section, zero Android references, dual-targeting with decision guidance | VERIFIED | Three-level summary table at line 75 (Level 1/2/3 columns); Selective Wipe section at line 148 (before Level 2 at line 186 and Level 3 at line 218); 5 `What breaks if misconfigured` matches (4 callouts + 1 prose reference, exceeds ≥2); iOS-Specific Behaviors at line 251 with 7 subsections (App SDK, Keyboard, Clipboard, Managed Open In, iOS-Version-Dependent, Privacy Features, App Config); 0 `android` matches case-insensitive; 7 `enrolled/unenrolled` adjacency matches (exceeds ≥2) |
| 10 | All three new guides use standard frontmatter (`last_verified: 2026-04-17`, `review_by: 2026-07-16`) and Phase 30 placeholder in Config-Caused Failures | VERIFIED | `last_verified: 2026-04-17` appears once in each of 07/08/09 (3 total); `review_by: 2026-07-16` appears once in each (3 total); `iOS L1 runbooks (Phase 30)`: 12 in 07, 7 in 08, 7 in 09 (26 total, well exceeds ≥3) |
| 11 | All relative cross-references resolve (`../_glossary-macos.md`, `../ios-lifecycle/00-enrollment-overview.md`, sibling `0X-*.md` links) | VERIFIED | Ran 29-ALL-04 link-check across 07/08/09/00 relative links — no broken links reported |

**Score:** 11/11 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/_templates/admin-template-ios.md` | Modified — PRIVACY-LIMIT CALLOUT PATTERN comment block added; SUPERVISED-ONLY preserved | VERIFIED | 114 lines total; new block at lines 38-49; SUPERVISED-ONLY block intact at lines 30-36 |
| `docs/admin-setup-ios/00-overview.md` | Rewritten for all paths | VERIFIED | 128 lines; `applies_to: all`, branching Mermaid with 4 CHOOSE branches and no forbidden edges, shared Intune Enrollment Restrictions section with stable anchor, dual-tier Prereqs, Portal Nav Note preserved, 3 new routing entries (slots 7/8/9), version-history row prepended |
| `docs/admin-setup-ios/07-device-enrollment.md` | New — ABYOD-01 | VERIFIED | 280 lines (meets `min_lines: 280`); exceeds min_lines — capabilities table at top (17 rows), both flows documented, ownership section, 12 Phase 30 placeholders, zero Privacy-limit callouts (D-18) |
| `docs/admin-setup-ios/08-user-enrollment.md` | New — ABYOD-02 | VERIFIED FUNCTIONALLY (line count deviation noted) | 187 lines (below plan's `min_lines: 300` target, but all 7 D-20 boundaries covered as bullets + inline callouts, all concrete must-haves satisfied per 29-04-SUMMARY disclosure — plan executor chose content-fidelity over volume when verbatim plan text yielded 187 lines) |
| `docs/admin-setup-ios/09-mam-app-protection.md` | New — ABYOD-03 | VERIFIED | 356 lines (meets `min_lines: 350`); three-level framework summary + Level 2/3 detail, Selective Wipe before policy detail, iOS-Specific Behaviors (7 subsections), zero Android, zero Privacy-limit callouts (template scope rule enforced) |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `docs/_templates/admin-template-ios.md` | `docs/ios-lifecycle/00-enrollment-overview.md#user-enrollment` | pattern example link | WIRED | Link text in new block, line 48 |
| `docs/admin-setup-ios/00-overview.md` | `07-device-enrollment.md` | Mermaid diagram `G[7. Device Enrollment]` + routing item 7 | WIRED | Mermaid node G, routing entry line 45 |
| `docs/admin-setup-ios/00-overview.md` | `08-user-enrollment.md` | Mermaid `H[8. User Enrollment]` + routing item 8 | WIRED | Mermaid node H, routing entry line 47 |
| `docs/admin-setup-ios/00-overview.md` | `09-mam-app-protection.md` | Mermaid `I[9. MAM App Protection]` + routing item 9 | WIRED | Mermaid node I, routing entry line 49 |
| 07 / 08 guides | `00-overview.md#intune-enrollment-restrictions` | Cross-link in body (D-15) | WIRED | 2 occurrences in 07 (Key Concepts + Prerequisites); 2 occurrences in 08 (Prerequisites + Step 2); target anchor exists at overview line 82 |
| 08 guide (all 7 callouts + summary + See Also) | `../ios-lifecycle/00-enrollment-overview.md#user-enrollment` | Privacy-limit callout link (D-03) | WIRED | 9 occurrences total (7 inline callouts + 1 summary-link + 1 See Also); target anchor exists in enrollment-overview.md |
| 07 guide | `03-ade-enrollment-profile.md` | Contrast prose (D-04), no callout glyph | WIRED | 6 occurrences as "ADE-only capability — see [ADE Enrollment Profile](03-ade-enrollment-profile.md)" pattern in Capabilities Notes column + ownership reclassification + See Also |
| 09 guide | `03-ade-enrollment-profile.md` | Contrast for ADE-only capabilities (D-04) | PARTIAL | Plan's key_link specified one contrast sentence; 09 contains the verbatim "Unlike MDM device wipe" contrast sentence (line 150) but does not link to 03 specifically — 09 links to 07 and 08 in See Also as optional MDM context. Intent of key_link (D-04 contrast) satisfied via MDM-wipe contrast sentence; specific 03 link absent but this matches D-24 standalone-ness pressure. Not a gap. |

### Data-Flow Trace (Level 4)

Not applicable — this is a documentation-only phase. Deliverables are markdown files; there are no dynamic data sources to trace. Content verification at Levels 1-3 (exists, substantive, wired) is equivalent to data-flow verification here.

### Behavioral Spot-Checks

No runnable entry points produced by this phase. SKIPPED with reason: documentation-only phase. All checks are structural/content greps covered in the artifact verification above.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| ABYOD-01 | 29-01, 29-02, 29-03 | Device enrollment guide covers Company Portal and web-based enrollment for personal/corporate devices without ABM | SATISFIED | `07-device-enrollment.md` delivers both flows, capabilities-without-supervision table, personal vs corporate ownership; SC#1 mapped directly |
| ABYOD-02 | 29-01, 29-02, 29-04 | User enrollment guide covers account-driven enrollment (BYOD privacy-preserving) with explicit limitation callouts on what IT cannot see or do | SATISFIED | `08-user-enrollment.md` delivers hybrid privacy-callout pattern — top-of-doc summary (all 7 D-20 boundaries) + 7 inline `> **Privacy limit:**` callouts at each capability, all linking to `#user-enrollment`; Managed Apple ID disambiguation; profile-based UE deprecation; SC#2 mapped directly |
| ABYOD-03 | 29-01, 29-02, 29-05 | App protection policies guide covers MAM-WE three-level data protection framework, targeting (enrolled vs unenrolled), iOS-specific behaviors, and selective wipe | SATISFIED | `09-mam-app-protection.md` delivers standalone guide with three-level framework (summary + L2/L3 detail), dual-targeting with decision guidance, dedicated Selective Wipe section, iOS-Specific Behaviors (7 subsections); zero Android, zero Privacy-limit callouts; SC#3 and SC#4 both mapped directly |

All three requirement IDs from the phase are covered. No orphaned requirements — REQUIREMENTS.md Phase 29 row maps exactly ABYOD-01/02/03, all appear in plan frontmatter (29-01/02 carry all three because they produce shared infrastructure consumed by all three guides).

### Anti-Patterns Found

Anti-pattern scan across modified files returned no new findings beyond those already identified in `29-REVIEW.md` (3 Warnings, 5 Info items — all narrowly scoped, none D-constraint-violating or security-critical). Per reviewer instruction, REVIEW items are treated as already identified and not re-flagged here. Notable context:

- **WR-01 (Setup Assistant terminology in 08)**: 6 occurrences of "Setup Assistant" describing account-driven UE flow. Technically inaccurate (UE runs in Settings app, not Setup Assistant); fixes suggested in REVIEW. Does NOT block goal achievement because: (a) the overall flow, privacy boundaries, and outcomes are described correctly; (b) admin reading the guide still learns what IT can/cannot do on the device. Treated as accuracy refinement.
- **WR-02 (iOS Settings path `Accounts & Passwords`)**: 1 occurrence; path removed in iOS 13+. Verification step will fail literally but the high-level verification intent is preserved. Treated as accuracy refinement.
- **WR-03 (web-enrollment URL `discovery.svc`)**: 1 occurrence in 07. Likely wrong endpoint (discovery service vs user-facing URL). Research-flag language softens impact; does not block goal achievement.
- **IN-01 through IN-05**: Minor consistency and clarity items; none affect must-haves.

Recommend routing the 3 Warnings to gap-closure planning if tighter technical accuracy is desired before milestone sign-off; not required for Phase 29 goal achievement.

### Human Verification Required

Four manual checks are required to close the verification loop because the items cannot be grep-verified:

1. **Privacy-callout prose voice — neutral-factual, not alarmist**

   **Test:** Read every `> **Privacy limit:**` line in `docs/admin-setup-ios/08-user-enrollment.md` (7 total at lines 100, 106, 112, 118, 124, 130, 136)
   **Expected:** Each is a factual statement with no "IT cannot spy", "Don't worry", "beware", "warning", or end-user-reassurance framing
   **Why human:** Prose voice and tone cannot be grepped; 29-VALIDATION.md Manual row 1

2. **Capabilities table scannability test for 07-device-enrollment.md**

   **Test:** Time-boxed reader test: locate 3 arbitrary capabilities in the Capabilities Available Without Supervision table (e.g., "app deployment modes", "OS update enforcement", "silent install")
   **Expected:** Each found in under 30 seconds
   **Why human:** UX / scannability judgement; 29-VALIDATION.md Manual row 3

3. **MAM-WE standalone-ness reader test**

   **Test:** Read `docs/admin-setup-ios/09-mam-app-protection.md` without following any cross-link
   **Expected:** Every core concept (MAM-WE definition, SDK requirement, three-level framework, dual-targeting, selective wipe scope) is comprehensible in isolation — no unexplained MDM terminology
   **Why human:** Reading-flow judgement; 29-VALIDATION.md Manual row 2 and 29-04-07 row

4. **Mermaid diagram rendering + semantic check (00-overview.md)**

   **Test:** Render the Mermaid block (lines 19-31) in a markdown viewer
   **Expected:** Diagram communicates "choose your path" — the four CHOOSE branches (Corporate ADE, BYOD w/o ABM, Privacy-preserving BYOD, App-layer only) are visually parallel, not downstream of ADE prereqs
   **Why human:** Visual comprehension of rendered output; 29-01-03 validation row and 29-VALIDATION.md Manual row 4

### Gaps Summary

**No blocking gaps.** All automated structural/content validation (29-TPL-01, 29-01-01 through 29-04-08, 29-ALL-01/02/03/04) passes at thresholds specified in 29-VALIDATION.md. All must-have truths have concrete evidence in the codebase. All three requirements (ABYOD-01/02/03) are satisfied with mapped implementation evidence.

**Deviations noted but not blocking:**

- `08-user-enrollment.md` is 187 lines against a plan-frontmatter `min_lines: 300` target (plan 29-04). The plan executor disclosed this in 29-04-SUMMARY as a deliberate content-fidelity decision — plan's `<action>` blocks prescribed exact text totalling 187 lines; inflating beyond verbatim would contradict the exact-text directives that all 8 must-have truths are verified against. All concrete D-constraints (D-01 through D-03, D-19 through D-23) and all 29-03-* validation rows pass against the as-written file. The `min_lines` floor is acknowledged as a soft metric by the executor; the hard must-have contract is satisfied.

- `07-device-enrollment.md` and `09-mam-app-protection.md` both meet or exceed their plan `min_lines` (280 = 280; 356 ≥ 350).

- REVIEW.md flagged 3 Warning items (WR-01/02/03 — technical accuracy) and 5 Info items. Per verifier instructions these are treated as already-identified and not re-flagged. They do not block goal achievement; they are accuracy-polish items for a future gap-closure pass or Phase 32 docs-hygiene sweep if tighter accuracy is desired.

**Status is `human_needed` rather than `passed`** because four items require human judgement (prose voice, scannability UX, reading-flow comprehension, and Mermaid visual rendering) per the decision tree in the verification workflow. Automated checks all pass; the outstanding items are the validation strategy's explicitly-marked manual rows.

---

_Verified: 2026-04-17T14:00:00Z_
_Verifier: Claude (gsd-verifier)_
