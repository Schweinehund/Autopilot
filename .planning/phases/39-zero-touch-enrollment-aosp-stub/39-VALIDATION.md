---
phase: 39
slug: zero-touch-enrollment-aosp-stub
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-23
---

# Phase 39 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> This is a **documentation phase** — no traditional test framework. Validation is grep-based mechanical checks + structural audits. See `39-RESEARCH.md` §Validation Architecture for the authoritative source (lines 740-798).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Bash + grep + wc + git (no test runner) — matches Phase 35/36/37/38 precedent |
| **Config file** | None — checks are ad-hoc per-task grep commands specified per row of the Per-Task Verification Map |
| **Quick run command** | Targeted grep against the file modified by the current task (see Per-Task map below) |
| **Full suite command** | Sequential execution of all grep checks in §Per-Task Verification Map |
| **Estimated runtime** | ~10 seconds (grep across 2 small markdown files + git diff) |

---

## Sampling Rate

- **After every task commit:** Run targeted grep against the file(s) modified by that task. Anchor-integrity spot-check for any doc modified.
- **After every plan wave:** File-existence check on the 2 deliverables (appended ZT portal + new AOSP stub); frontmatter presence + 60-day `review_by` check; AEAUDIT-04 "supervision" and "SafetyNet" guards; PITFALL 9/11 shared-file guard (git diff).
- **Before `/gsd-verify-work`:** All grep checks pass. Zero "supervision" occurrences in Phase 39 docs. Zero SafetyNet references. Zero modifications to v1.0-v1.3 shared files. All 9 D-17 anchors resolve. AOSP stub passes H2 whitelist mechanical check.
- **Max feedback latency:** 10 seconds.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 39-01-01 | 01 | 1 | AEZTE-01 (D-01) | — | `## Corporate-Scale Operations` H2 present in ZT portal doc at position 7 | grep | `grep -cE '^## Corporate-Scale Operations' docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 39-01-02 | 01 | 1 | AEZTE-01 (D-01) | — | All 6 H3 sub-sections under the H2 | grep | `grep -cE '^### (Reseller-Upload Handoff Workflow\|Device Claim Workflow\|Profile Assignment at Scale\|Dual-SIM IMEI 1 Registration\|KME/ZT Mutual Exclusion.+Device Claim\|Configuration Must Be Assigned)' docs/admin-setup-android/02-zero-touch-portal.md` = 6 | ❌ W0 | ⬜ pending |
| 39-01-03 | 01 | 1 | AEZTE-01 (D-17 anchors) | — | 6 Phase 39 anchors present in ZT portal doc | grep | `grep -cE 'id="(reseller-upload-handoff\|device-claim-workflow\|profile-assignment\|dual-sim-imei-1\|kme-zt-device-claim\|configuration-must-be-assigned)"' docs/admin-setup-android/02-zero-touch-portal.md` = 6 | ❌ W0 | ⬜ pending |
| 39-01-04 | 01 | 1 | AEZTE-01 (D-22 append-only) | — | Phase 35 H2 order preserved at positions 1-6 and 8+ | structural | `grep -n '^## ' docs/admin-setup-android/02-zero-touch-portal.md` returns existing Phase 35 H2s in original order with `## Corporate-Scale Operations` inserted at position 7 only (after `## KME/ZT Mutual Exclusion`, before `## Verification`) | ❌ W0 | ⬜ pending |
| 39-01-05 | 01 | 1 | AEZTE-01 (D-05 marker) | — | Dual-SIM MEDIUM-confidence source marker present per Phase 37 D-11 regex | grep | `grep -E '\[(HIGH\|MEDIUM\|LOW)(: [A-Za-z ,]+)?(, last_verified [0-9]{4}-[0-9]{2}-[0-9]{2})?\]' docs/admin-setup-android/02-zero-touch-portal.md` returns ≥ 1 marker within 20 lines of `#dual-sim-imei-1` anchor | ❌ W0 | ⬜ pending |
| 39-01-06 | 01 | 1 | AEZTE-01 (D-04) | — | Google canonical cross-link for device-claim workflow | grep | `grep -cE 'support\.google\.com/work/android' docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 within the `## Corporate-Scale Operations` H2 block | ❌ W0 | ⬜ pending |
| 39-01-07 | 01 | 1 | AEZTE-01 (D-03) | — | Configuration Must Be Assigned cross-link back to Phase 35 `#dpc-extras-json` | grep | `grep -cE '#dpc-extras-json' docs/admin-setup-android/02-zero-touch-portal.md` ≥ 2 (Phase 35 had ≥1; Phase 39 adds ≥1 more from `### Configuration Must Be Assigned`) | ❌ W0 | ⬜ pending |
| 39-01-08 | 01 | 1 | AEZTE-01 (D-06) | — | KME/ZT at device-claim H3 cross-links Phase 35 `#kme-zt-mutual-exclusion` | grep | `grep -cE '#kme-zt-mutual-exclusion' docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 in the context of `### KME/ZT Mutual Exclusion — At Device Claim` H3 | ❌ W0 | ⬜ pending |
| 39-01-09 | 01 | 1 | AEZTE-01 (D-01) | — | Verification section append-only update references device-claim testing | grep | `grep -cE 'device.claim\|#device-claim-workflow' docs/admin-setup-android/02-zero-touch-portal.md` ≥ 2 (one in H3, one in Verification update) | ❌ W0 | ⬜ pending |
| 39-01-10 | 01 | 1 | AEZTE-01 (D-16) | — | ZT portal doc frontmatter `last_verified` updated to 2026-04-23 or later | grep | `grep -E '^last_verified: 2026-0[4-9]-[0-9]{2}' docs/admin-setup-android/02-zero-touch-portal.md` returns match ≥ 2026-04-23 | ❌ W0 | ⬜ pending |
| 39-01-11 | 01 | 1 | AEZTE-01 (D-16) | — | ZT portal doc frontmatter `review_by` within 60 days of `last_verified` | structural | Extract both dates from frontmatter; assert `review_by - last_verified` ≤ 60 days | ❌ W0 | ⬜ pending |
| 39-01-12 | 01 | 1 | AEZTE-01 (Changelog) | — | Changelog row added for Phase 39 extension | grep | `grep -c '2026-04-.*Phase 39' docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 39-02-01 | 02 | 1 | AEAOSP-01 | — | New file `06-aosp-stub.md` exists with frontmatter `applies_to: AOSP` | grep + file-existence | `grep -c '^applies_to: AOSP' docs/admin-setup-android/06-aosp-stub.md` = 1 | ❌ W0 | ⬜ pending |
| 39-02-02 | 02 | 1 | AEAOSP-01 (D-11 H2 whitelist) | — | Exactly 9 H2 headings matching whitelist names in order | grep + structural | `grep -E '^## ' docs/admin-setup-android/06-aosp-stub.md` returns exactly: `## Scope and Status`, `## What AOSP Is`, `## When to Use AOSP`, `## Supported OEMs`, `## Enrollment Constraints`, `## Prerequisites and Licensing`, `## Deferred Content`, `## See Also`, `## Changelog` in that order | ❌ W0 | ⬜ pending |
| 39-02-03 | 02 | 1 | AEAOSP-01 (D-12) | — | `## Deferred Content` H2 has NO version suffix | grep | `grep -cE '^## Deferred Content( \(v1\.4\.[0-9]\))?$' docs/admin-setup-android/06-aosp-stub.md` with match having no parentheses = 1 | ❌ W0 | ⬜ pending |
| 39-02-04 | 02 | 1 | AEAOSP-01 (D-07) | — | RealWear-spotlight H3 + Other AOSP OEMs H3 present | grep | `grep -cE '^### (RealWear.+confirmed GA\|Other AOSP-Supported OEMs)' docs/admin-setup-android/06-aosp-stub.md` = 2 | ❌ W0 | ⬜ pending |
| 39-02-05 | 02 | 1 | AEAOSP-01 (D-09) | — | All 8 MS Learn OEMs enumerated (DigiLens, HTC, Lenovo, Meta, PICO, RealWear, Vuzix, Zebra) | grep | `grep -ciE 'digilens\|htc\|lenovo\|meta\|pico\|realwear\|vuzix\|zebra' docs/admin-setup-android/06-aosp-stub.md` ≥ 8 unique OEM names | ❌ W0 | ⬜ pending |
| 39-02-06 | 02 | 1 | AEAOSP-01 (D-10 PITFALL 7) | — | PITFALL-7-mandated "not supported under AOSP" framing present | grep | `grep -cE 'fully managed instead\|not supported under AOSP' docs/admin-setup-android/06-aosp-stub.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 39-02-07 | 02 | 1 | AEAOSP-01 (D-13) | — | Wi-Fi credential embedding explicit content in `## Enrollment Constraints` | grep | `grep -cE 'Wi-Fi credential' docs/admin-setup-android/06-aosp-stub.md` ≥ 1 within the Enrollment Constraints H2 | ❌ W0 | ⬜ pending |
| 39-02-08 | 02 | 1 | AEAOSP-01 (D-13) | — | QR-only enrollment assertion | grep | `grep -cE 'QR.?only\|QR code only' docs/admin-setup-android/06-aosp-stub.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 39-02-09 | 02 | 1 | AEAOSP-01 (D-13) | — | One-device-at-a-time assertion | grep | `grep -cE 'one.device.at.a.time\|one device per' docs/admin-setup-android/06-aosp-stub.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 39-02-10 | 02 | 1 | AEAOSP-01 (D-11 + PITFALL 12) | — | Word-count within envelope 600-900 | structural | `wc -w docs/admin-setup-android/06-aosp-stub.md` excluding frontmatter/See Also/Changelog returns 600-900 | ❌ W0 | ⬜ pending |
| 39-02-11 | 02 | 1 | AEAOSP-01 (D-21) | — | Platform note banner present (ARCH Q6 per Phase 38 D-10 pattern) | grep | `grep -cE 'Platform note' docs/admin-setup-android/06-aosp-stub.md` ≥ 1 within first 30 lines of body (after frontmatter + platform-gate) | ❌ W0 | ⬜ pending |
| 39-02-12 | 02 | 1 | AEAOSP-01 (SC2) | — | Scope callout "stub in v1.4; full coverage v1.4.1" present BEFORE any content | grep + structural | Within first 40 lines of body (after frontmatter + platform-gate), a blockquote or callout containing both "stub" and "v1.4.1" is present | ❌ W0 | ⬜ pending |
| 39-02-13 | 02 | 1 | AEAOSP-01 (D-07) | — | Deferred-content table present in `## Deferred Content` H2 | grep + structural | Within `## Deferred Content` H2, a pipe-table with ≥ 3 rows pointing to v1.4.1 targets | ❌ W0 | ⬜ pending |
| 39-02-14 | 02 | 1 | AEAOSP-01 (D-11) | — | HTML-comment subtractive-deletion pattern for MGP + ZT portal H4 sub-sections | grep | `grep -cE '<!-- .*intentionally omitted' docs/admin-setup-android/06-aosp-stub.md` ≥ 2 (one for MGP H4, one for ZT portal H4) | ❌ W0 | ⬜ pending |
| 39-02-15 | 02 | 1 | AEAOSP-01 (D-14) | — | Intune Plan 2/Suite licensing in `## Prerequisites and Licensing` (with MEDIUM marker if unverified) | grep | `grep -cE 'Intune Plan [12]\|Intune Suite' docs/admin-setup-android/06-aosp-stub.md` ≥ 1; if MEDIUM marker present, matches Phase 37 D-11 regex | ❌ W0 | ⬜ pending |
| 39-02-16 | 02 | 1 | AEAOSP-01 (D-16) | — | AOSP stub frontmatter present with all required fields | grep | `grep -cE '^(platform: Android\|audience: admin\|applies_to: AOSP\|last_verified:\|review_by:)' docs/admin-setup-android/06-aosp-stub.md` = 5 | ❌ W0 | ⬜ pending |
| 39-02-17 | 02 | 1 | AEAOSP-01 (D-16) | — | AOSP stub `review_by` within 60 days of `last_verified` | structural | Extract both dates; assert `review_by - last_verified` ≤ 60 days | ❌ W0 | ⬜ pending |
| 39-all-01 | all | gate | AEAUDIT-04 | — | Zero "supervision" as Android management term in Phase 39 docs | grep | `grep -in "supervis" docs/admin-setup-android/02-zero-touch-portal.md docs/admin-setup-android/06-aosp-stub.md` returns zero matches OR only matches in explicit cross-platform-note blockquotes | ❌ gate | ⬜ pending |
| 39-all-02 | all | gate | AEAUDIT-04 | — | Zero SafetyNet references in Phase 39 docs (Play Integrity only) | grep | `grep -cin 'safetynet' docs/admin-setup-android/02-zero-touch-portal.md docs/admin-setup-android/06-aosp-stub.md` = 0 | ❌ gate | ⬜ pending |
| 39-all-03 | all | gate | PITFALL 9/11 (D-18) | — | Zero modifications to v1.0-v1.3 shared files across Phase 39 commits | git | `git diff --name-only <phase 39 base> HEAD -- docs/_glossary.md docs/_glossary-macos.md docs/_glossary-android.md docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md docs/admin-setup-ios/ docs/admin-setup-macos/ docs/l1-runbooks/ docs/l2-runbooks/ docs/end-user-guides/` returns empty | ❌ gate | ⬜ pending |
| 39-all-04 | all | gate | Anchor stability (D-17) | — | All 9 D-17 locked anchors resolve | structural | Every anchor in D-17 list (`#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#kme-zt-device-claim`, `#configuration-must-be-assigned`, `#realwear-confirmed-ga`, `#other-aosp-supported-oems`, `#deferred-content`) resolves to an `<a id="...">` scaffold in the corresponding file | ❌ gate | ⬜ pending |
| 39-all-05 | all | gate | — | — | Anchor-in-template check: Phase 35 anchors NOT modified | grep | `grep -cE 'id="(prerequisites\|step-0-reseller\|create-zt-account\|dpc-extras-json\|link-zt-to-intune\|kme-zt-mutual-exclusion\|renewal-maintenance)"' docs/admin-setup-android/02-zero-touch-portal.md` = 7 (all 7 Phase 35 anchors still present after Phase 39 append) | ❌ gate | ⬜ pending |
| 39-all-06 | all | gate | — | — | No deferred-file links in Phase 39 docs | grep | `grep -cE '(common-issues\|quick-ref-l1\|quick-ref-l2)\.md' docs/admin-setup-android/02-zero-touch-portal.md docs/admin-setup-android/06-aosp-stub.md` = 0 as link targets | ❌ gate | ⬜ pending |
| 39-all-07 | all | gate | — | — | Cross-reference integrity — all intra-phase links resolve | structural | Every `../android-lifecycle/` or `01-managed-google-play.md#...` or `02-zero-touch-portal.md#...` link in Phase 39 docs resolves to an existing anchor | ❌ gate | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky · W0 = depends on Wave 0 file creation · gate = phase-gate check*

---

## Wave 0 Requirements

Phase 39 has TWO distinct deliverables that do NOT yet exist in their Phase 39 form:

- [ ] `docs/admin-setup-android/02-zero-touch-portal.md` ALREADY EXISTS (Phase 35 shipped). Phase 39 APPENDS `## Corporate-Scale Operations` H2 block at position 7 — 39-01 W1 creates.
- [ ] `docs/admin-setup-android/06-aosp-stub.md` does NOT exist yet — 39-02 W1 creates.

**Pre-Wave-1 prerequisites:**
- Phase 34 deliverables merged (verified — `_templates/admin-template-android.md`, `_glossary-android.md`, provisioning-method matrix, version matrix all shipped)
- Phase 35 deliverables merged (verified — `02-zero-touch-portal.md` Phase-35-scope content shipped; reserved Phase 39 anchors not yet in file per Phase 35 35-01-10)
- 39-RESEARCH.md authored (verified 2026-04-23)
- 39-VALIDATION.md authored (THIS FILE)

**Framework install:** None — bash + coreutils + git already in place; identical to Phase 35/36/37/38 validation harness.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `## Corporate-Scale Operations` H2 block reads as coherent admin narrative (not 6 disconnected H3s) | AEZTE-01 (D-01) | Narrative coherence beyond grep | Read the H2 block end-to-end; confirm reseller → device-claim → profile-assignment → dual-SIM → KME/ZT → config-assignment reads as a connected admin journey for an Intune admin deploying ZTE at corporate scale. |
| Device-claim workflow decision points are specific enough to guide admin action without portal screen-by-screen | AEZTE-01 (D-04) | Decision-quality check — grep confirms Google link present, not that decision prose is actionable | Read `### Device Claim Workflow` H3; confirm admin can identify (a) which devices to claim, (b) which configuration to assign, (c) per-device vs bulk assignment choice — from the prose alone. |
| PITFALL-7 "not supported under AOSP" framing reads as guidance, not punt | AEAOSP-01 (D-10) | Tone check — grep catches the text but not the framing intent | Read `### Other AOSP-Supported OEMs` H3; confirm phrasing is "If GMS is present, use Android Enterprise fully managed instead" guidance form, NOT "we don't know, consult MS Learn" punt form. |
| AOSP stub scope callout prevents misreading as full coverage | AEAOSP-01 (SC2) | Semantic check — grep confirms text presence, not prominence | Read `## Scope and Status` section; confirm the "stub in v1.4; full coverage v1.4.1" assertion is visually prominent (top of body; blockquote or heading) and no admin reading the doc could mistake it for complete coverage. |
| RealWear-spotlight H3 content is HIGH-confidence sourced | AEAOSP-01 (D-07) | Source-confidence check — grep confirms text, not source accuracy | Read `### RealWear (confirmed GA)` H3; confirm device models (HMT-1, HMT-1Z1, Navigator 500), AR/VR headset usage context, and Wi-Fi credential embedding requirement match current MS Learn aosp-supported-devices page at execute time. |
| Phase 39 did NOT introduce inline inserts into Phase 35-owned H2 sections | AEZTE-01 (D-22 append-only) | Structural check beyond grep | `git diff <phase 39 base> HEAD -- docs/admin-setup-android/02-zero-touch-portal.md` shows ONLY: (a) the appended `## Corporate-Scale Operations` block, (b) a single-line update to the existing Verification placeholder, (c) one new Changelog row, (d) frontmatter `last_verified` + `review_by` refresh. No other content modified. |
| Appended H2 block fits naturally in Phase 35's doc flow | AEZTE-01 (D-01) | Readability continuity | Read the entire `02-zero-touch-portal.md` top-to-bottom after Phase 39 append; confirm transitions from `## KME/ZT Mutual Exclusion` → `## Corporate-Scale Operations` → `## Verification` read as a continuous admin guide. |
| Deferred-content table columns serve v1.4.1 planners | AEAOSP-01 (D-12) | Deferred-content utility check | Read `## Deferred Content` table; confirm each row lists Topic (what), Current state in v1.4 (what exists now), Target (v1.4.1 or later), Rationale (why deferred) — enough for v1.4.1 planner to use the table as their scoping input. |

---

## Validation Sign-Off

- [x] All tasks have automated grep verify or Wave 0 dependencies (35 total rows in Per-Task + Manual-Only table)
- [x] Sampling continuity: no 3 consecutive tasks without automated verify (every plan wave has per-task grep map)
- [x] Wave 0 covers all MISSING references (2 deliverable files)
- [x] No watch-mode flags (not applicable — no test runner)
- [x] Feedback latency < 10s
- [x] `nyquist_compliant: true` set in frontmatter after planner confirmation

**Approval:** confirmed 2026-04-23 — planner has confirmed alignment of the 35-row Per-Task + Manual-Only verification map with `39-01-PLAN.md` (tasks 39-01-01..39-01-12 + phase-gate rows 39-all-01/02/03/05/06/07) and `39-02-PLAN.md` (tasks 39-02-01..39-02-17 + phase-gate rows 39-all-02/03/04/06/07). `nyquist_compliant: true` set.
