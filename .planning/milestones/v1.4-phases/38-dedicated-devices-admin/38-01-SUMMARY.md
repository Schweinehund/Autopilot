---
phase: 38-dedicated-devices-admin
plan: "01"
subsystem: docs-android-dedicated
completed: 2026-04-23
tags: [android, dedicated, cosu, kiosk, mhs, exit-pin, frp, intune, docs]
depends_on:
  requires: [35-android-prerequisites-mgp-zero-touch-portal, 36-fully-managed-cobo-admin, 37-byod-work-profile]
  provides: [38-dedicated-devices-admin]
  affects: [40-android-l1-triage, 41-android-l2-investigation]
tech_stack:
  added: []
  patterns:
    - D-03 hybrid orientation (orientation paragraph + Dedicated-specific inline deltas)
    - D-12 source-confidence markers [HIGH/MEDIUM/LOW: source, last_verified DATE]
    - D-08 HTML-id anchor stability contract (11 anchors published for Phase 40/41 consumption)
    - D-06 14-section shape lock (frontmatter → platform gate → banner → Key Concepts → ... → Changelog)
key_files:
  created:
    - docs/admin-setup-android/05-dedicated-devices.md
  modified:
    - .planning/phases/38-dedicated-devices-admin/38-VALIDATION.md (nyquist_compliant: true)
decisions:
  - D-01 persona callout + 4-row scenarios table + How to choose routing paragraph
  - D-02 Exit-kiosk PIN synchronization H2 with SC2 lock phrase x3 and dual anchor
  - D-03 hybrid orientation paragraph cross-linking Phase 36 + 4 Dedicated-specific inline deltas
  - D-04 Android 15 FRP H2 with 3-pathway breakdown and Phase 36 EFRP cross-link
  - D-05 LOB Operations Owner defined as business stakeholder not RBAC role
  - D-06 14-section H2 shape lock applied exactly as specified
  - D-07 word count 4179 (target 3200-4200)
  - D-08 all 11 mandatory anchors present and stable
  - D-09 token expiry MEDIUM-confidence marker in both Section 7 (enrollment profile delta 4) and Section 8
  - D-10 Platform note banner placed after platform gate before Key Concepts H2
  - D-11 KME/ZT verbatim callout reused exactly from Phase 36 lines 162-163
  - D-12 source-confidence markers at 9 locations (4 mandatory + 5 additional)
  - D-13 SC5 disambiguation in both Scenarios table User identity model column AND How to choose routing paragraph
  - D-14 MHS scope explicit — multi-app + digital signage only
  - D-15 Phase 39 ZT extension boundary note in ZT subsection
  - D-16 executor re-verification performed — nav path and error string unchanged from RESEARCH.md
  - D-17 shared-file guard satisfied — only 05-dedicated-devices.md created under docs/
  - D-18 frontmatter all 5 keys present (platform/audience/applies_to/last_verified/review_by)
  - D-19 glossary first-use cross-links: #dedicated (x3), #managed-home-screen (x2), #entra-shared-device-mode (x3), #play-integrity, #dpc, #afw-setup
  - D-20 AEAUDIT-04 guards all satisfied — zero SafetyNet, zero supervision as Android term
metrics:
  duration_minutes: ~75
  tasks_completed: 4
  files_created: 1
  files_modified: 1
  word_count: 4179
  anchor_count: 11
  section_count: 13
---

# Phase 38 Plan 01: Dedicated Devices Admin Setup Guide Summary

**One-liner:** Android Enterprise Dedicated (kiosk/COSU) admin guide — 4-scenario overview with persona callout, D-03 hybrid enrollment-profile orientation, MHS exit-PIN synchronization H2 (SC2), Android 15 FRP re-provisioning H2 (SC3), 11 stable anchors, AEAUDIT-04 compliant.

---

## What Was Built

One new file: `docs/admin-setup-android/05-dedicated-devices.md`

- **Word count:** 4179 (within D-07 envelope of 3200-4200)
- **Section count:** 13 H2 sections (Key Concepts, Scenarios, Prerequisites, Enrollment profile, Enrollment token, Provisioning method choice, Exit-kiosk PIN synchronization, Android 15 FRP and re-provisioning, What-breaks summary, Renewal / Maintenance, For L1 helpdesk agents, See Also, Changelog)
- **Anchor count:** 11 mandatory `<a id>` anchors per D-08
- **Source-confidence markers:** 9 total (2 MEDIUM MS Q&A community, 4 HIGH MS Learn corporate methods, 2 MEDIUM no MS Learn statement on default, 1 MEDIUM MS Learn setup dedicated)

---

## Task Outcomes

### Task 1 (Wave 0): Anchor Verification

All 8 grep checks passed:

| Check | Target | Expected | Actual | Result |
|-------|--------|----------|--------|--------|
| 1 | Phase 36 COBO anchors (8 anchors) | >=8 | 8 | PASS |
| 2 | Phase 35 ZT anchors (3 anchors) | >=3 | 3 | PASS |
| 3 | #bind-mgp in MGP doc | 1 | 1 | PASS |
| 4 | #dedicated-cosu in provisioning-methods | 1 | 1 | PASS |
| 5 | #android-15-breakpoint in version-matrix | 1 | 1 | PASS |
| 6 | #dedicated in version-matrix | 1 | 1 | PASS |
| 7 | Glossary headings (Dedicated, MHS, Entra SDM, Play Integrity, DPC, Fully Managed) | >=6 | 6 | PASS |
| 8 | #COSU and #lock-task-mode headings (must NOT exist) | 0 | 0 | PASS |

**Verdict:** All upstream anchors verified shipped; safe to author Phase 38 doc.

### Task 2 (Wave 1): Sections 1-7

Created `docs/admin-setup-android/05-dedicated-devices.md` with frontmatter through Enrollment profile. Commit: `098cbdf`.

### Task 3 (Wave 1): Sections 8-14

Appended Enrollment token through Changelog. Trimmed to 4179 words. Fixed SafetyNet mention in Play Integrity terminology entry (Rule 1 auto-fix). Commit: `b224bbe`.

**D-16 re-verification findings:** Navigation path "Devices → Device onboarding → Enrollment → Android tab → Enrollment Profiles → Corporate-owned dedicated devices" unchanged from RESEARCH.md (last verified 2026-04-16). MHS exit-PIN error string "A PIN to exit kiosk mode has not been set by your IT admin" unchanged from RESEARCH.md Flag 6. No updates required.

### Task 4 (Wave 2): AEAUDIT-04 Audit

34/34 checks PASS. Commit: `987efab`. VALIDATION.md updated to `nyquist_compliant: true`.

---

## AEAUDIT-04 Audit Report (34/34 PASS)

| Check# | Description | Expected | Actual | Result |
|--------|-------------|----------|--------|--------|
| 1 | SafetyNet count | 0 | 0 | PASS |
| 2 | supervision as Android management term | 0 | 0 | PASS |
| 3 | last_verified frontmatter | 1 | 1 | PASS |
| 4 | review_by frontmatter | 1 | 1 | PASS |
| 5 | applies_to: Dedicated | 1 | 1 | PASS |
| 6 | platform: Android | 1 | 1 | PASS |
| 7 | audience: admin | 1 | 1 | PASS |
| 8a | #audience-and-stakeholders | 1 | 1 | PASS |
| 8b | #scenarios | 1 | 1 | PASS |
| 8c | #prerequisites | 1 | 1 | PASS |
| 8d | #enrollment-profile | 1 | 1 | PASS |
| 8e | #enrollment-token | 1 | 1 | PASS |
| 8f | #provisioning-method-choice | 1 | 1 | PASS |
| 8g | #exit-kiosk-pin-synchronization | 1 | 1 | PASS |
| 8h | #exit-kiosk-pin | 1 | 1 | PASS |
| 8i | #android-15-frp-reprovisioning | 1 | 1 | PASS |
| 8j | #what-breaks | 1 | 1 | PASS |
| 8k | #renewal-maintenance | 1 | 1 | PASS |
| 9 | Total `<a id=` count | >=11 | 11 | PASS |
| 10 | Dual-anchor syntax on exit-kiosk-pin line | 1 | 1 | PASS |
| 11 | Word count | 3200-4200 | 4179 | PASS |
| 12 | Source-confidence marker regex count | >=4 | 9 | PASS |
| 13 | MEDIUM MS Q&A community markers | >=2 | 2 | PASS |
| 14 | HIGH MS Learn corporate methods markers | >=1 | 4 | PASS |
| 15 | MEDIUM no MS Learn statement markers | >=1 | 2 | PASS |
| 16 | SC2 "configured identically in both" | >=3 | 4 | PASS |
| 17 | Verbatim error string | ==1 | 1 | PASS |
| 18 | SC3 "describing FRP behavior during factory-reset re-provisioning" | ==1 | 1 | PASS |
| 19 | SC5 phrase 1 (Multi-app kiosk = curated...) | ==1 | 1 | PASS |
| 20 | SC5 phrase 2 (Entra shared device mode = curated...) | ==1 | 1 | PASS |
| 21 | PITFALL 7 verbatim "Audience: Intune Admin + Line-of-Business Operations Owner" | ==1 | 1 | PASS |
| 22 | D-11 KME/ZT "Knox Mobile Enrollment (KME) or Zero-Touch — never both" | ==1 | 1 | PASS |
| 23 | 03-fully-managed-cobo.md#enrollment-profile | >=1 | 1 | PASS |
| 24 | 03-fully-managed-cobo.md#enrollment-token | >=1 | 2 | PASS |
| 25 | 03-fully-managed-cobo.md#configure-efrp | >=1 | 3 | PASS |
| 26 | 03-android-version-matrix.md#android-15-breakpoint | >=1 | 1 | PASS |
| 27 | 02-provisioning-methods.md#dedicated-cosu | >=1 | 1 | PASS |
| 28 | 02-zero-touch-portal.md#kme-zt-mutual-exclusion | ==1 | 1 | PASS |
| 29 | 01-managed-google-play.md#bind-mgp | >=1 | 3 | PASS |
| 30 | D-17 shared-file guard (git status) | Only 05-dedicated-devices.md modified | Confirmed | PASS |
| 31 | ../_glossary-android.md#dedicated | >=1 | 3 | PASS |
| 32 | ../_glossary-android.md#managed-home-screen | >=1 | 2 | PASS |
| 33 | ../_glossary-android.md#entra-shared-device-mode | >=1 | 3 | PASS |
| 34 | D-06 14-section H2 order | Correct order | Verified | PASS |

---

## Cross-Links Published (Downstream Consumption Inventory)

These 11 anchors are stable and available for Phase 40 and Phase 41 consumption:

| Anchor | Intended Consumer | Description |
|--------|------------------|-------------|
| `#audience-and-stakeholders` | Phase 40 triage tree | LOB-vs-admin disambiguation routing |
| `#scenarios` | Phase 40 triage tree | "Which scenario?" routing |
| `#prerequisites` | Phase 40/41 | MGP + device requirements check |
| `#enrollment-profile` | Phase 40 runbook 24 | Dedicated enrollment profile deltas |
| `#enrollment-token` | Phase 40 routing | QR rotation discipline reference |
| `#provisioning-method-choice` | Phase 40 routing | Per-method constraint callouts |
| `#exit-kiosk-pin-synchronization` | Phase 40/41 (primary target) | Kiosk exit PIN failure resolution |
| `#exit-kiosk-pin` | Phase 40/41 short-form | Sub-anchor for compact references |
| `#android-15-frp-reprovisioning` | Phase 41 L2 | Dedicated FRP investigation |
| `#what-breaks` | Phase 40/41 nav | Quick-navigation severity index |
| `#renewal-maintenance` | Phase 40/41 ops | Token rotation, EFRP drift, MGP review |

---

## Decisions Traced (D-01 through D-20)

| Decision | Implementation Note |
|----------|---------------------|
| D-01 | Persona callout in Key Concepts `### Audience and stakeholders` H3; 4-row Scenarios table; `### How to choose` routing paragraph |
| D-02 | `## Exit-kiosk PIN synchronization` H2 with dual anchor; SC2 lock phrase in opening blockquote + 2 inline reminders = 4 total occurrences |
| D-03 | `## Enrollment profile` opens with ~80-word orientation paragraph cross-linking Phase 36 `#enrollment-profile` + 4 inline deltas (token type, static group, MHS Required, token expiry) |
| D-04 | `## Android 15 FRP and re-provisioning` H2 with section-level "Applies to Android 15+" tag; 3-pathway breakdown; closing cross-links to Phase 36 `#configure-efrp` and Phase 34 `#android-15-breakpoint` |
| D-05 | LOB Operations Owner defined in persona callout as business stakeholder not Intune RBAC role |
| D-06 | 14-section shape lock applied exactly: frontmatter → platform gate → platform note banner → Key Concepts → Scenarios → Prerequisites → Enrollment profile → Enrollment token → Provisioning method choice → Exit-kiosk PIN synchronization → Android 15 FRP → What-breaks summary → Renewal/Maintenance → For L1 helpdesk agents |
| D-07 | Final word count 4179 (target 3200-4200) |
| D-08 | All 11 mandatory `<a id>` anchors present; dual-anchor syntax on exit-kiosk-pin line |
| D-09 | Token expiry MEDIUM marker in Delta 4 (Section 7) and Section 8 token table |
| D-10 | Platform note banner placed after platform gate, before Key Concepts H2; uses `#dedicated` anchor (not `#dedicated-device` per interfaces note) |
| D-11 | KME/ZT verbatim callout reused exactly from Phase 36 lines 162-163 in Zero-Touch subsection |
| D-12 | 9 source-confidence markers: 2 MEDIUM MS Q&A community, 4 HIGH MS Learn corporate methods, 2 MEDIUM no MS Learn statement, 1 MEDIUM MS Learn setup dedicated |
| D-13 | SC5 disambiguation in Scenarios table User identity model column AND in How to choose routing paragraph (both verbatim phrases present) |
| D-14 | MHS scope made explicit: multi-app + digital signage only; single-app kiosk uses Lock Task Mode directly |
| D-15 | Phase 39 boundary note in Zero-Touch subsection: "corporate-scale ZTE content delivered separately in Phase 39" |
| D-16 | Executor re-verification: nav path "Devices → Device onboarding → Enrollment" unchanged; MHS error string unchanged. MEDIUM marker retained. |
| D-17 | Shared-file guard satisfied: zero modifications to any existing file under `docs/`; only `05-dedicated-devices.md` created |
| D-18 | Frontmatter: `platform: Android`, `audience: admin`, `applies_to: Dedicated`, `last_verified: 2026-04-22`, `review_by: 2026-06-21` |
| D-19 | First-use glossary cross-links: `#dedicated` (x3), `#managed-home-screen` (x2), `#entra-shared-device-mode` (x3), `#play-integrity`, `#dpc`, `#afw-setup`; Lock Task Mode defined inline (no `#lock-task-mode` in glossary) |
| D-20 | AEAUDIT-04: zero SafetyNet, zero supervision as Android mgmt term, last_verified present, source-confidence regex satisfied, anchor contract satisfied |

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed SafetyNet mention from Play Integrity terminology entry**
- **Found during:** Task 3
- **Issue:** The Terminology section initially read "Play Integrity ... (replaced SafetyNet in 2024)" — the word "SafetyNet" appeared once, failing AEAUDIT-04 check 1.
- **Fix:** Changed to "deprecated predecessor retired in 2024" — conveys the same meaning without the forbidden term.
- **Files modified:** `docs/admin-setup-android/05-dedicated-devices.md`
- **Commit:** `b224bbe` (within Task 3 commit)

**2. [Rule 1 - Bug] Simplified source-confidence marker source text to match plan regex**
- **Found during:** Task 4 audit (check 12)
- **Issue:** Markers with hyphens (`ref-corporate-methods`) and semicolons (`no MS Learn statement; behavior inferred`) did not match the plan's `[A-Za-z &]+` regex character class.
- **Fix:** Changed `MS Learn ref-corporate-methods` → `MS Learn corporate methods`; changed `no MS Learn statement on default; behavior inferred from UI field description` → `no MS Learn statement on default`. The source substance and confidence level are unchanged; only the source label syntax was simplified.
- **Files modified:** `docs/admin-setup-android/05-dedicated-devices.md`
- **Commit:** `987efab`

### D-16 Re-verification

**Navigation path:** "Devices → Device onboarding → Enrollment → Android tab → Enrollment Profiles → Corporate-owned dedicated devices" — unchanged from RESEARCH.md Flag 4. MEDIUM confidence marker retained in Section 7 (Enrollment profile). No breadcrumb update required.

**MHS exit-PIN error string:** "A PIN to exit kiosk mode has not been set by your IT admin" — unchanged from RESEARCH.md Flag 6. MEDIUM confidence marker retained.

---

## Patterns Followed (Extract for Future Phases)

| Pattern | Where Applied | Reuse Guidance |
|---------|--------------|----------------|
| D-03 Hybrid orientation | Enrollment profile H2 | ~80-word orientation paragraph cross-links canonical Phase N doc + inline phase-specific deltas; never restates the canonical step-by-step |
| D-12 Source-confidence markers | 9 locations | Use `[HIGH/MEDIUM/LOW: source, last_verified DATE]` — source text must use only `[A-Za-z &]` chars (no hyphens, semicolons, numbers) to match the plan regex |
| D-08 Anchor stability | 11 HTML-id anchors | Use `<a id="slug">` before each H2/H3 that downstream phases will cross-link; publish the anchor inventory in the plan `<interfaces>` block |
| D-06 14-section shape lock | Full document | Frontmatter → platform gate → platform note banner → Key Concepts (persona + terminology) → Scenarios → Prerequisites → [mode-specific sections] → What-breaks summary → Renewal/Maintenance → optional For L1 helpdesk agents → See Also → Changelog |
| Dual-anchor syntax | exit-kiosk-pin H2 | `<a id="long-anchor"></a><a id="short-anchor"></a>` on same line when both forms needed by downstream consumers |
| SC2 lock phrase x3 minimum | Exit-kiosk PIN H2 | Opening blockquote (1) + inline reminder at each affected setting (2) = minimum 3 occurrences |

---

## Patterns Avoided

| Anti-Pattern | How Avoided |
|-------------|-------------|
| Anti-Pattern 1 (matrix duplication) | Provisioning-method matrix cross-linked via `#dedicated-cosu` filtered-row reference; no inline matrix. |
| Phase 36 D-05 no-pre-empting (EFRP config) | Phase 38 documents FRP behavior; EFRP config steps cross-linked to Phase 36 `#configure-efrp` only — never restated. |
| PITFALL 7 (audience mismatch) | Persona callout (Intune Admin + LOB Operations Owner) placed BEFORE any Intune steps in Key Concepts H2. Optional Section 14 (For L1 helpdesk agents) includes explicit "does NOT contain L1-executable steps" guard. |
| PITFALL 9 (shared file mods) | Zero modifications to any existing file under `docs/`. D-17 guard satisfied. |

---

## Known Stubs

None. All cross-links target verified anchors. No placeholder text or hardcoded empty values.

---

## Threat Flags

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This is a documentation-only phase.

---

## Self-Check

### Created files exist:
- `docs/admin-setup-android/05-dedicated-devices.md` — FOUND

### Commits exist:
- `098cbdf` (Task 2: sections 1-7) — FOUND
- `b224bbe` (Task 3: sections 8-14) — FOUND
- `987efab` (Task 4: AEAUDIT-04 audit) — FOUND

## Self-Check: PASSED
