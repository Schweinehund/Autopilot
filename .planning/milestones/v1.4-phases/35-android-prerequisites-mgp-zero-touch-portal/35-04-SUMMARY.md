---
phase: 35
plan: 04
subsystem: android-enterprise-documentation
tags: [android, zero-touch-portal, dpc-extras, reseller-gate, kme-zt-exclusion, phase-35, AEPREQ-04]
dependency-graph:
  requires:
    - phase-34-complete
    - docs/_templates/admin-template-android.md
    - docs/_glossary-android.md
    - docs/android-lifecycle/00-enrollment-overview.md
    - docs/android-lifecycle/02-provisioning-methods.md
  provides:
    - docs/admin-setup-android/02-zero-touch-portal.md
    - "anchor: #prerequisites"
    - "anchor: #step-0-reseller"
    - "anchor: #create-zt-account"
    - "anchor: #dpc-extras-json"
    - "anchor: #link-zt-to-intune"
    - "anchor: #kme-zt-mutual-exclusion"
    - "anchor: #renewal-maintenance"
  affects: []
tech-stack:
  added: []
  patterns:
    - tri-portal admin-guide pattern (H4 In Intune admin center / In Zero-Touch portal subsections)
    - dual-placement decision-framing (Step 0 reseller gate at top + numbered section; KME/ZT at top + inline)
    - external-party gate pattern (authorized reseller relationship as Step 0 hard prerequisite)
    - DPC extras JSON + adjacent Fields reference table (no in-JSON comments — D-20)
    - explicit <a id="..."></a> HTML anchors to pin D-23 reserved anchor contract
    - research-flag verification comments (<!-- verify UI at execute time -->) per D-27
    - 60-day review cycle frontmatter (applies_to: ZTE)
    - Phase 39 anchor namespace reservation (4 anchors reserved but not used)
key-files:
  created:
    - docs/admin-setup-android/02-zero-touch-portal.md
  modified: []
decisions:
  - D-19 applied: Step 0 reseller gate dual-placed — top-of-doc blockquote (decision-framing) + numbered ## Step 0 — Verify Reseller Relationship section (execution)
  - D-20 applied: DPC extras JSON verbatim 4-field schema from MS Learn ref-corporate-methods; adjacent 5-row Fields reference table; zero in-JSON // or /* */ comments; signature checksum re-verification note (Assumption A3)
  - D-21 applied: KME/ZT Samsung mutual-exclusion dual-placed — top-of-doc ⚠️ warning (decision-framing, not gotchas enumeration) + inline one-line callout within 15 lines of #link-zt-to-intune anchor
  - D-22 applied: Phase 35 scope only — portal account creation, ZT↔Intune linking, DPC extras JSON, Step 0 reseller gate, KME/ZT forward-reference, network-dependency note, single-org-to-account-link constraint; zero Phase 39 content (device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1, reseller-upload handoff — all forward-referenced only)
  - D-23 applied: seven Phase 35 reserved anchors established via explicit <a id="..."></a> tags; Phase 39 anchors (#device-claim-workflow, #profile-assignment, #dual-sim-imei-1, #reseller-upload-handoff) absent from output
  - D-24 applied: frontmatter applies_to: ZTE, platform: Android, audience: admin, 60-day review cycle (last_verified: 2026-04-21 → review_by: 2026-06-20)
  - D-25/D-27 applied: portal-UI-specific assertions (sidebar sections, Method A iframe breadcrumb, endpoint.microsoft.com URL, DPC signature checksum) flagged inline with <!-- verify UI at execute time --> comments citing source + fetch date
  - D-28 observed: zero 90-day enrollment token claim anywhere in file (per RESEARCH resolution — 90-day is AOSP-specific; GMS tokens = 65-year max)
metrics:
  duration: 35m
  completed: 2026-04-21
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
  word_count_body: 1190
  word_count_total: 1289
---

# Phase 35 Plan 04: Zero-Touch Portal Admin Guide Summary

Authored `docs/admin-setup-android/02-zero-touch-portal.md` — a 1190-word (body) admin guide covering Phase 35-scope Zero-Touch portal mechanics: Step 0 reseller gate dual-placement (D-19), verbatim DPC extras JSON from MS Learn with adjacent Fields reference table (D-20), KME/ZT Samsung mutual-exclusion dual-placement (D-21), ZT↔Intune linking via Methods A (iframe, COBO-only) and B (direct portal, any mode), and seven explicit D-23 reserved anchors pinned as `<a id>` tags. Phase 39 scope (device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1 registration, reseller-upload handoff) is forward-referenced only; the four Phase 39 anchors are absent from the output. Satisfies AEPREQ-04 and Phase 35 Success Criterion 4.

## What Was Delivered

### New file: `docs/admin-setup-android/02-zero-touch-portal.md`

Admin guide with the exact structure specified by the plan:

- **Frontmatter**: `last_verified: 2026-04-21`, `review_by: 2026-06-20` (60-day cycle), `platform: Android`, `applies_to: ZTE`, `audience: admin`
- **Platform gate** + **Reseller-prerequisite blockquote** + **⚠️ KME/ZT warning blockquote** (all within the first 40 body lines; top-of-doc decision-framing layer)
- **One-line Phase 35 scope framing paragraph** explicitly forward-referencing Phase 39 for corporate-scale content
- **HTML comment** documenting the intentional omission of `#### In Managed Google Play` (Android template's MGP subsection is not used here; MGP is a prerequisite covered in 01-managed-google-play.md)
- **Ten H2 sections** — seven of which carry explicit `<a id="…"></a>` anchors matching the D-23 reserved namespace:
  - `<a id="prerequisites"></a>` → `## Prerequisites` (5-checklist: MGP binding, reseller relationship, ZT Google account, Intune enrollment profile, Intune Plan 1+)
  - `<a id="step-0-reseller"></a>` → `## Step 0 — Verify Reseller Relationship` (reseller-eligibility checklist + "if not in place: STOP" options)
  - `<a id="create-zt-account"></a>` → `## Create Zero-Touch Portal Account` (3-step portal navigation with what-breaks callout for Gmail misuse + network-dependency note + single-org-to-account-link MEDIUM-confidence constraint)
  - `<a id="link-zt-to-intune"></a>` → `## Link Zero-Touch to Intune` (Methods A/B comparison table + inline Samsung KME callout + method-specific sub-steps with what-breaks callout for Method A wrong-mode risk)
  - `<a id="dpc-extras-json"></a>` → `## DPC Extras JSON Configuration` (verbatim JSON + 5-row Fields reference table + author-note prohibiting in-JSON comments)
  - `<a id="kme-zt-mutual-exclusion"></a>` → `## KME/ZT Mutual Exclusion (Samsung)` (mutual-exclusion behavior + Phase 35/39 scope boundary + v1.4.1 KME deferral)
  - `<a id="renewal-maintenance"></a>` → `## Renewal / Maintenance` (2-row table: ZT reseller contract + enrollment profile tokens)
- **Verification** and **See Also** sections (See Also cross-links MGP guide, Overview, Prerequisites doc, Enrollment Overview, Provisioning Methods, Android glossary with `#zero-touch-enrollment` anchor)
- **Changelog** table
- **Word count**: 1190 body words (strip frontmatter + changelog + HTML comments) — within the plan's 800–1200 target

## Decisions Applied (D-19 through D-25, D-27, D-28)

| Decision | How Applied | Evidence |
|---|---|---|
| D-19 Step 0 dual-placement | Top-of-doc `> **Reseller prerequisite:**` blockquote (lines 14) + numbered `## Step 0 — Verify Reseller Relationship` section (line 33). Blockquote is decision-framing; Step 0 section carries verification checklist + "if not in place: STOP" options. No verbatim text duplication. | `head -25 $F \| grep -ci reseller` = 2; `grep -cE "^## Step 0" $F` = 1 |
| D-20 DPC extras JSON | Verbatim 4-field JSON from MS Learn `ref-corporate-methods` (2026-04-16) with signature checksum `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` (subject to re-verification per A3). Adjacent 5-row Fields reference table within 30 lines of JSON block. Zero in-JSON `//` or `/* */` comments. | `grep -c '```json' $F` = 1; JSON block contains `com.google.android.apps.work.clouddpc` (3 occurrences); Fields table has 6 `\| Required \|` rows within 30 lines; `awk '/```json/{f=1;next} /```/{f=0} f' $F \| grep -c '^//'` = 0 |
| D-21 KME/ZT dual-placement | Top-of-doc `> ⚠️ **KME/ZT mutual exclusion (Samsung):**` blockquote framed as decision-framing ("choose KME or ZT, never both") + inline `> **Samsung admins:**` callout within 15 lines of `## Link Zero-Touch to Intune` anchor. Full device-claim-step callout deferred to Phase 39. | `head -40 $F \| grep -cE "KME.*mutual\|mutual.*KME"` = 1; within 15 lines of `#link-zt-to-intune`, blockquote contains "Samsung" + "KME" + "mutual" |
| D-22 Phase 35/39 scope split | Phase 35 owns portal setup, Step 0, ZT↔Intune linking, DPC extras JSON, KME/ZT forward-reference, network-dependency note, single-org-to-account-link. Phase 39 content (device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1, reseller-upload handoff, full KME/ZT device-claim callout) is forward-referenced via "Phase 39 scope" language only — zero substantive content for those. | `grep -c "Phase 39\|dual-SIM\|device claim" $F` = 4 |
| D-23 anchor namespace | Seven Phase 35 reserved anchors established via explicit `<a id="…"></a>` tags adjacent to each H2 heading. Phase 39 anchors (`#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff`) absent. | All 7 anchors verified present via `grep -q 'id="$a"'` sweep; `grep -cE "#device-claim-workflow\|#profile-assignment\|#dual-sim-imei-1\|#reseller-upload-handoff" $F` = 0 |
| D-24 frontmatter | `applies_to: ZTE`, `platform: Android`, `audience: admin`, `last_verified: 2026-04-21`, `review_by: 2026-06-20` (60-day delta) | All 5 keys present; delta = 60 days exact |
| D-25/D-27 research-flag verification | Portal-UI-specific assertions flagged with inline `<!-- verify UI at execute time -->` comments citing source + fetch date | 3 comments present: sidebar sections (Google AE Help answer/7514005, 2026-04-21), Method A iframe breadcrumb (MS Learn ref-corporate-methods, 2026-04-16), endpoint.microsoft.com URL, accounts.google.com/signupwithoutgmail |
| D-28 no 90-day claim | Zero instances of 90-day enrollment token claim anywhere in file (per RESEARCH resolution — 90-day is AOSP-specific; GMS tokens = 65-year max) | `grep -ci '90.day' $F` = 0 |

## Research-Flag Verification Results at Execute Time (D-27)

Per the plan's "Research-flag verification at execute time" requirement, the following assertions were reviewed at write time against the research artifacts cited in RESEARCH.md §Plan-Time Verification Protocol. Live portal re-verification was not possible (the Zero-Touch portal is authenticated-only and cannot be reached without Google account login; Intune admin center changes similarly require an active tenant). Per D-27, portal-UI-specific assertions carry inline `<!-- verify UI at execute time -->` comments to explicitly flag them for re-verification by future readers.

| Assertion | Source Cited Inline | Verification Notes at Execute Time |
|---|---|---|
| ZT portal sidebar sections: Configurations / Devices / Users / Resellers / Customer details | Google AE Help answer/7514005 (fetched 2026-04-21) | Carried over from RESEARCH.md source attribution. Inline `<!-- verify UI at execute time -->` comment retained. |
| Method A iframe breadcrumb: Devices > By platform > Android > Device onboarding > Enrollment > Bulk enrollment methods > Zero-touch enrollment | MS Learn `ref-corporate-methods` (2026-04-16) | Carried over from RESEARCH.md source attribution. Inline `<!-- verify UI at execute time -->` comment retained. |
| DPC signature checksum value `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` | MS Learn `ref-corporate-methods` (2026-04-16) | Value retained verbatim from RESEARCH.md Pattern 4 + plan `<interfaces>` block. Per Assumption A3, this value is fixed for the current CloudDPC app signing but would change silently if CloudDPC is re-signed. Fields reference table carries an explicit "verify current value at execute time" note pointing readers back to MS Learn `ref-corporate-methods`. |
| `endpoint.microsoft.com` as current Intune admin center portal URL | MS Learn `connect-managed-google-play` redirect chain (RESEARCH §Plan-Time Verification Protocol row 4 — resolved HIGH) | Inline `<!-- verify URL at execute time -->` comment retained for future reviewers. |
| `accounts.google.com/signupwithoutgmail` for corporate-email Google account creation | Google AE Help answer/7514005 (fetched 2026-04-21) | Carried over from RESEARCH.md source attribution. |

**Live re-verification not performed in this worktree agent session.** The worktree agent does not have portal access; these are inherited from the Wave 1 research. All portal-UI assertions carry the `<!-- verify UI at execute time -->` flag as documentation for future readers/reviewers to re-verify before publishing to admins.

## Anchor Contract Confirmed

Seven Phase 35 D-23 reserved anchors are live in `docs/admin-setup-android/02-zero-touch-portal.md`:

| Anchor | H2 Heading | Pinned Via |
|---|---|---|
| `#prerequisites` | `## Prerequisites` | Explicit `<a id="prerequisites"></a>` |
| `#step-0-reseller` | `## Step 0 — Verify Reseller Relationship` | Explicit `<a id="step-0-reseller"></a>` |
| `#create-zt-account` | `## Create Zero-Touch Portal Account` | Explicit `<a id="create-zt-account"></a>` |
| `#dpc-extras-json` | `## DPC Extras JSON Configuration` | Explicit `<a id="dpc-extras-json"></a>` |
| `#link-zt-to-intune` | `## Link Zero-Touch to Intune` | Explicit `<a id="link-zt-to-intune"></a>` |
| `#kme-zt-mutual-exclusion` | `## KME/ZT Mutual Exclusion (Samsung)` | Explicit `<a id="kme-zt-mutual-exclusion"></a>` |
| `#renewal-maintenance` | `## Renewal / Maintenance` | Explicit `<a id="renewal-maintenance"></a>` |

The four Phase 39 reserved anchors (`#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff`) are **absent** from the file — namespace reservation per D-23 honored.

## Phase 35/39 Scope Boundary Honored (D-22)

Phase 35 content written:
- Portal account creation (corporate-email Google account at `accounts.google.com/signupwithoutgmail`; sidebar section landmarks)
- ZT↔Intune linking (Methods A iframe-in-Intune for COBO-only; Method B direct-portal for any mode)
- DPC extras JSON configuration (verbatim 4-field skeleton + Fields reference table)
- Step 0 reseller gate (dual-placement)
- KME/ZT forward-reference (dual-placement; does not enumerate device-claim-step callout content)
- Network-dependency note (captive-portal / no-Google-service-access fall-through)
- Single-org-to-account-link constraint (MEDIUM confidence, Assumption A1)
- Renewal / Maintenance (ZT reseller contract + enrollment profile tokens)

Phase 39 content **not** written (forward-referenced only):
- Device-claim workflow (admin clicks to claim reseller-uploaded devices into configurations)
- Profile assignment at scale (assigning configurations to device sets)
- Dual-SIM IMEI 1 registration note (which IMEI to register for dual-SIM hardware)
- Reseller-upload handoff workflow (what the reseller does with the customer's ZT account ID)
- Full KME/ZT callout at the device-claim step (decision-point-level detail)
- Configuration-must-be-assigned gotcha (silent failure if the ZT configuration exists but is not assigned to device sets)

The Phase 39 anchor namespace (`#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff`) is reserved but not used in Phase 35's output.

## Acceptance Criteria Results

All per-task grep checks and applicable gate checks pass:

| Criterion | Target | Actual | Status |
|---|---|---|---|
| Plan `<verify>` automated block | `VERIFY_OK` | `VERIFY_OK` | PASS |
| 35-04-01 Top-of-page reseller blockquote (first 25 lines) | ≥ 1 | 2 | PASS |
| 35-04-02 Numbered Step 0 section | ≥ 1 | 1 | PASS |
| 35-04-03 DPC extras JSON code block | ≥ 1 | 1 | PASS |
| 35-04-04 DPC package `com.google.android.apps.work.clouddpc` | ≥ 1 | 3 | PASS |
| 35-04-05 EXTRA_ENROLLMENT_TOKEN / PROVISIONING_ADMIN_EXTRAS_BUNDLE | ≥ 1 | 4 | PASS |
| 35-04-06 Fields reference table "Required" column within 30 lines of JSON | Required column present | 6 `Required` rows within 30 lines | PASS |
| 35-04-07 Top-of-doc KME/mutual blockquote (first 40 lines) | ≥ 1 | 1 | PASS |
| 35-04-08 Inline KME/Samsung callout within 15 lines of `#link-zt-to-intune` anchor | blockquote containing Samsung + (KME or mutual) | 1 (Samsung + KME + mutual all present) | PASS |
| 35-04-09 Phase 39 forward-reference present | ≥ 1 | 4 | PASS |
| 35-04-10 Phase 39 anchors NOT used | = 0 | 0 | PASS |
| 35-all-01 Supervision guard (AEAUDIT-04) | = 0 | 0 | PASS |
| 35-all-02 `platform: Android` frontmatter | = 1 | 1 | PASS |
| 35-all-03 `last_verified` + `review_by`, 60-day delta | delta = 60 days exact | 60 days (2026-04-21 → 2026-06-20) | PASS |
| 35-all-05 SafetyNet guard | = 0 | 0 | PASS |
| 35-all-06 Deferred-file links (`common-issues`, `quick-ref-l1`, `quick-ref-l2`) | = 0 | 0 | PASS |
| 35-all-07 Anchor integrity (7 reserved anchors resolve) | 7 of 7 | 7 of 7 (explicit `<a id>`) | PASS |
| 35-all-08 Cross-reference integrity (intra-phase + external) | all resolve | `01-managed-google-play.md` and `00-overview.md` are authored in parallel-wave worktrees (expected to merge). All other cross-references (Phase 34 deliverables, Android glossary, iOS/macOS overviews) verified present | PASS (parallel-wave forward refs) |
| `applies_to: ZTE` (D-24) | literal match | `applies_to: ZTE` | PASS |
| DPC extras JSON block contains NO `//` comment lines (D-20) | = 0 | 0 (verified via `awk '/```json/{f=1;next} /```/{f=0} f' \| grep -c '^//'`) | PASS |
| DPC signature checksum present verbatim | `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` | present | PASS |
| Top-of-doc KME/ZT warning is decision-framing (manual) | "choose KME or ZT, never both" | "For Samsung fleets, choose either Knox Mobile Enrollment (KME) or Zero-Touch Enrollment — never both" | PASS |
| Step 0 blockquote vs section differ (manual) | blockquote is decision-framing; section is execution | blockquote: reseller-is-hard-prereq framing; section: verification checklist + STOP options (no verbatim duplication) | PASS |
| Renewal/Maintenance 4-column table (D-20 Phase 34 mandatory) | present | `\| Component \| Renewal Period \| Consequence of Lapse \| Renewal Steps \|` with 2 data rows | PASS |
| Body word count 800–1200 | 800 ≤ WC ≤ 1200 | 1190 | PASS |
| No 90-day enrollment token claim (D-28) | = 0 | 0 | PASS |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 — Missing critical functionality] Added explicit `<a id>` HTML anchors to pin D-23 reserved namespace**

- **Found during:** Task 1 post-authoring anchor verification (after the first draft used only H2 headings).
- **Issue:** D-23 specifies seven stable anchors (`#prerequisites`, `#step-0-reseller`, `#create-zt-account`, `#dpc-extras-json`, `#link-zt-to-intune`, `#kme-zt-mutual-exclusion`, `#renewal-maintenance`). The natural H2-heading GitHub auto-slugs diverge from six of these: `## Step 0 — Verify Reseller Relationship` auto-slugs to `#step-0--verify-reseller-relationship` (double-dash from em-dash), `## Create Zero-Touch Portal Account` auto-slugs to `#create-zero-touch-portal-account`, `## Link Zero-Touch to Intune` auto-slugs to `#link-zero-touch-to-intune`, `## DPC Extras JSON Configuration` auto-slugs to `#dpc-extras-json-configuration`, `## KME/ZT Mutual Exclusion (Samsung)` auto-slugs to `#kme-zt-mutual-exclusion-samsung`, `## Renewal / Maintenance` auto-slugs to `#renewal--maintenance` (double-dash from slash). Only `#prerequisites` naturally resolves.
- **Why this is Rule 2 (critical-functionality), not Rule 4 (architectural):** The D-23 anchor namespace is a stability contract consumed by downstream Phase 36–42 plans and Phase 39 (which extends this same file). Acceptance criterion 35-all-07 requires "every anchor in CONTEXT D-05/D-11/D-17/D-23 resolves." If the natural auto-slugs were allowed to stand, the D-23 contract would silently diverge — a missing-critical-functionality bug. The precedent was already set by Phase 35 Plan 01's Wave 1 SUMMARY, which encountered a similar situation with `#android-12-corporate-identifiers` and applied the same additive `<a id>` pattern.
- **Why NOT Rule 4:** Purely additive HTML tags. No existing content modified. No H2 headings renamed. The pattern is standard markdown (supported by GitHub, VS Code preview, and most static-site generators). Zero impact on ROADMAP/REQUIREMENTS/PLAN.
- **Fix applied:** Added `<a id="…"></a>` tags on the line immediately above each of the seven H2 headings. All seven D-23 reserved anchors now resolve deterministically regardless of heading-text auto-slug behavior.
- **Files modified:** `docs/admin-setup-android/02-zero-touch-portal.md` (same commit as the main Task 1 commit — the two changes form a single indivisible unit of anchor-contract compliance, matching Plan 01's precedent).
- **Commit:** `8bb2621`

**2. [Rule 1 — Auto-fix for body-length overage] Trimmed prose to hit body word count ≤ 1200**

- **Found during:** Task 1 post-authoring word-count verification (first draft body was 1502 words — 302 over target).
- **Issue:** Acceptance criterion "Word count in body (excluding frontmatter and changelog) is between 800 and 1200 words" was violated. First draft replicated the plan's `<action>` spec verbatim, which itself exceeded the target due to bracketed verbose cross-portal notes, long "What breaks" callouts, and redundant prose qualifiers.
- **Fix applied:** Iterative prose-only trimming (tables, JSON block, Fields reference rows, and HTML comments preserved intact): platform-gate blockquote condensed to single-line cross-links; Step 0 checklist items shortened; Create-ZT-account numbered steps condensed; "What breaks" callouts tightened (preserving Symptom/Recovery structure); KME/ZT section prose shortened; table cells trimmed; Renewal/Maintenance table cells condensed. Final body word count: 1190 (within target). All required content preserved — JSON verbatim, Fields table complete, dual-placements intact, Phase 39 forward-reference present, all D-23 anchors in place.
- **Files modified:** Same file, same commit.
- **Commit:** `8bb2621`

### Authentication Gates

None.

### Blockers

None.

## Known Stubs

None in the Phase 35 sense. Forward-references to `docs/admin-setup-android/01-managed-google-play.md` (Wave 2 Plan 03 — authored in parallel worktree) and `docs/admin-setup-android/00-overview.md` (Wave 1 Plan 02 — authored in parallel worktree) are dangling in this isolated worktree by design — the orchestrator merges the parallel-wave output before overall Phase 35 verify runs. The `#zero-touch-enrollment` anchor in `docs/_glossary-android.md` (Phase 34 deliverable) was verified present. The four Phase 39 anchors (`#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff`) are intentionally NOT used here — namespace reservation per D-23.

## Threat Flags

No new security-relevant surface. This is a documentation-only deliverable; no code, no API endpoints, no data flow, no trust boundaries introduced. All threat-model mitigations from the plan's `<threat_model>` are documentation-level and have been applied:

- T-35-04-01 (Spoofing — admin skips reseller): mitigated by D-19 dual-placement (top blockquote + numbered Step 0)
- T-35-04-02 (Tampering — Samsung KME+ZT silent enrollment via KME): mitigated by D-21 dual-placement (top ⚠️ + inline callout)
- T-35-04-03 (Repudiation — Method A wrong-mode for Dedicated/COPE): mitigated by Methods A/B limitation table + explicit "do NOT use for Dedicated or COPE" + what-breaks callout on Method A Step 4
- T-35-04-04 (Information Disclosure — stale DPC signature checksum): mitigated by Fields reference table "verify current value at execute time" note + `last_verified: 2026-04-21` frontmatter
- T-35-04-05 (DoS — Phase 39 anchor collision): mitigated by D-23 namespace reservation + acceptance test 35-04-10 (zero matches for Phase 39 anchors)
- T-35-04-06 (EoP — in-JSON comments break parsing): mitigated by D-20 prohibition + zero `//` / `/* */` comments in JSON block + explicit author note
- T-35-04-07 (EoP — Gmail-backed ZT account → account loss): mitigated by explicit "corporate email (NOT Gmail)" guidance + what-breaks callout + single-org-to-account-link constraint note

## Executor Assumptions

- **Date for `last_verified` / `review_by`:** Used 2026-04-21 (today) for `last_verified`; 2026-06-20 (exact 60-day delta) for `review_by`, matching the Phase 35 60-day cycle.
- **Body word-count interpretation:** Acceptance criterion says "body (excluding frontmatter and changelog) is between 800 and 1200 words." Interpreted as: strip frontmatter delimited by `---` markers, strip from `## Changelog` to end, strip HTML comments, `wc -w` on remainder. Achieved 1190 words with this interpretation.
- **`applies_to: ZTE`:** Applied literally per D-24. This is a single-mode admin guide (ZTE), not a GMS-modes guide.
- **Forward-reference to parallel-wave files:** `01-managed-google-play.md` (Plan 03 — parallel Wave 2 worktree) and `00-overview.md` (Plan 02 — parallel Wave 1 worktree) are referenced but not present in this worktree. The orchestrator merges parallel-wave output before phase-level verify; dangling links are expected and acceptable per parallel-execution semantics.
- **HTML `<a id>` precedent:** Followed the Phase 35 Plan 01 precedent (which added `<a id="android-12-corporate-identifiers"></a>` to the version matrix as a Rule 2 fix for the same root cause: D-XX anchor contract vs GitHub auto-slug divergence). No new pattern invented.

## Commits

- `8bb2621` feat(35-04): author 02-zero-touch-portal.md ZT portal admin guide

## Self-Check: PASSED

Verification confirmed:

- FOUND: `docs/admin-setup-android/02-zero-touch-portal.md` (body 1190 words, 7 D-23 anchors present via explicit `<a id>` tags)
- FOUND: commit `8bb2621` in `git log`
- PASSED: plan `<verify>` automated command output `VERIFY_OK`
- PASSED: all 35-04-01 through 35-04-10 grep checks (10 of 10)
- PASSED: all applicable 35-all-XX gate checks (35-all-01, 35-all-02, 35-all-03, 35-all-05, 35-all-06, 35-all-07; 35-all-08 cross-reference integrity verified for all non-parallel-wave targets)
- PASSED: D-20 no-in-JSON-comments guard (0 matches for `^//` inside JSON block)
- PASSED: D-28 no-90-day-token-claim guard (0 matches for `90.day`)
- PASSED: frontmatter compliance (`platform: Android`, `applies_to: ZTE`, `audience: admin`, 60-day delta)
- PASSED: Phase 39 anchor namespace reservation (4 of 4 Phase 39 anchors absent from output)
- PASSED: Phase 35/39 scope boundary (no device-claim workflow / profile-assignment / dual-SIM IMEI 1 / reseller-upload handoff content; forward-reference only)
- PASSED: PITFALL 11 guard (no v1.0–v1.3 shared files modified — only new file created)
- PASSED: AEAUDIT-04 guard (0 "supervision"/"supervised" in file)
