---
phase: 37
slug: byod-work-profile-admin-end-user
status: wave-0-complete
nyquist_compliant: false
wave_0_complete: true
created: 2026-04-22
---

# Phase 37 — Validation Strategy

> Per-phase validation contract for documentation-phase content-quality audit. Phase 37 is a two-document, two-audience (tier-inverted) docs phase. Validation is grep-based, cross-reference-integrity-based, frontmatter-schema-based, and topic-parity-based across the two docs — NOT unit/integration test based. Extends Phase 36 validation precedent with sync-contract grep between admin and end-user docs (D-04) and SC2 admin-sidebar guardrail (D-09).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shell-based content audits (grep, wc, git diff) — no test framework needed for docs phase |
| **Config file** | None required — audit commands are ad-hoc inline in PLAN.md tasks and this file |
| **Quick run command** | `grep -ciE "safetynet\|supervision\|COPE deprecated" docs/admin-setup-android/04-byod-work-profile.md docs/end-user-guides/android-work-profile-setup.md` (must return 0 for each term) |
| **Full suite command** | See Dimensions 1-10 below — run all grep / wc / regex audits sequentially |
| **Estimated runtime** | ~10 seconds (all audits are grep/wc on two files) |

---

## Sampling Rate

- **After every task commit:** Dimensions 2, 3, 6, 8, 9 (fast grep-based — forbidden terms, confidence-marker regex, frontmatter, shared-file guard, SC2 admin-sidebar)
- **After every plan wave:** Full 10-dimension audit
- **Before `/gsd-verify-work`:** Full 10-dimension audit clean
- **Max feedback latency:** <15 seconds
- **Phase 42 milestone re-audit:** Dimensions 2 + 4 + 6 + 8 re-run by AEAUDIT-04 across all v1.4 Android docs

---

## Phase Requirements → Audit Map

| Req ID | Behavior | Audit Type | Automated Command | File Exists? | Status |
|--------|----------|-----------|-------------------|-------------|--------|
| AEBYOD-01 | Admin doc covers enrollment restrictions + work profile policy + data transfer controls + privacy boundary | content + grep | `grep -c -iE "^## " docs/admin-setup-android/04-byod-work-profile.md` ≥ 10 (per D-12); `grep -iE "enrollment restriction\|work profile policy\|data transfer\|privacy boundary" docs/admin-setup-android/04-byod-work-profile.md` matches all four | ⬜ pending | ⬜ pending |
| AEBYOD-02 | End-user doc covers Company Portal enrollment + "what IT can/cannot see" + plain-language + zero Intune portal step references | content + grep + D-09 guardrail | `grep -iE "Company Portal\|what your IT" docs/end-user-guides/android-work-profile-setup.md` matches; D-09 SC2 grep `grep -E "Devices >\|Apps >\|> Enrollment" docs/end-user-guides/android-work-profile-setup.md` returns 0 hits | ⬜ pending | ⬜ pending |
| AEBYOD-03 | AMAPI migration callout covers custom OMA-URI + Wi-Fi cert-auth + management app change | grep | `grep -iE "OMA.URI\|certificate.based\|Microsoft Intune app" docs/admin-setup-android/04-byod-work-profile.md` matches all three | ⬜ pending | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Content-Quality Audit Dimensions (10 total)

Each dimension has an automated command and a concrete pass criterion. These are the full-suite audits run at wave-merge and `/gsd-verify-work`.

### Dimension 1 — Mandatory-5 stable anchor presence (D-06)

- **Audit:** Grep for each of the 5 MANDATORY anchors in the admin doc.
- **Command:** `for anchor in key-concepts amapi-migration enrollment-restrictions work-profile-policy privacy-boundary; do grep -q "#$anchor\|id=\"$anchor\"" docs/admin-setup-android/04-byod-work-profile.md || echo "MISSING: $anchor"; done`
- **Pass:** Zero MISSING output. All 5 mandatory anchors present as markdown headings that slugify to these names, or as explicit `<a id="..."></a>` tags. Secondary anchors (`#prerequisites`, `#data-transfer-controls`, `#wifi-cert-auth`, `#management-app-change`, `#what-breaks`, `#renewal-maintenance`) are planner discretion — not audited here.

### Dimension 2 — No forbidden terminology (AEAUDIT-04)

- **Audit:** Grep for SafetyNet (must equal 0 across both docs) and for "supervision" as Android management term (must equal 0 outside cross-platform callout blockquotes).
- **Command:**
  - `grep -ciE "safetynet" docs/admin-setup-android/04-byod-work-profile.md docs/end-user-guides/android-work-profile-setup.md` must equal 0.
  - `grep -ciE "^supervision\b\|\bsupervision mode\b\|\bsupervised Android\b" docs/admin-setup-android/04-byod-work-profile.md docs/end-user-guides/android-work-profile-setup.md` must equal 0.
- **Pass:** Zero SafetyNet hits across both docs. "Supervision" only appears inside blockquotes framed as cross-platform contrast with iOS (if anywhere).

### Dimension 3 — Confidence-marker regex presence for AMAPI-affected assertions (D-10 / D-11)

- **Audit:** Every assertion in the `## AMAPI Migration` H2 section + the three inline reminders (Wi-Fi cert-auth, OMA-URI, management app change) + any other AMAPI-adjacent behavioral claim must carry an inline confidence marker matching the D-11 regex.
- **Command:**
  - `grep -cE '\[(HIGH\|MEDIUM\|LOW)(: [A-Za-z ]+)?(, last_verified [0-9]{4}-[0-9]{2}-[0-9]{2})?\]' docs/admin-setup-android/04-byod-work-profile.md` ≥ 6 (at minimum one marker per AMAPI impact: OMA-URI, Wi-Fi cert-auth, mgmt-app change × AMAPI H2 + inline = 6 minimum; actual count likely higher).
  - Spot-check: `grep -cE 'HIGH: MS Learn' docs/admin-setup-android/04-byod-work-profile.md` ≥ 1 (at least one HIGH: MS Learn marker).
  - Spot-check: `grep -cE 'MEDIUM: techcommunity' docs/admin-setup-android/04-byod-work-profile.md` ≥ 1 (at least one MEDIUM marker on techcommunity-sourced assertion — e.g., Wi-Fi username/password break claim).
- **Pass:** Minimum-6 count met; HIGH and MEDIUM markers both present.

### Dimension 4 — Version-tag presence on behavioral assertions (PITFALL 1)

- **Audit:** Manual read + grep heuristic for behavioral assertions mentioning Android version, Company Portal, Microsoft Intune app, Wi-Fi auth, clipboard/contacts/calendar direction without adjacent version tag.
- **Command (heuristic):** `grep -nE "(work profile\|BYOD\|Company Portal\|Microsoft Intune app\|Wi-Fi\|clipboard\|contacts\|calendar)" docs/admin-setup-android/04-byod-work-profile.md | grep -vE "Android [0-9]+\+?\|version-matrix\|03-android-version-matrix\|post-April-2025\|\[(HIGH\|MEDIUM\|LOW)"` — output should be empty or only match non-behavioral references (headings, glossary links).
- **Pass:** Reviewer confirms no unversioned behavioral assertions exist. Cross-links to Phase 34 version matrix count as version-tagged; D-10 confidence markers count as version-tagged.

### Dimension 5 — Cross-reference integrity

- **Audit:** For each outbound cross-link in both docs, verify the target anchor exists in the target file.
- **Command:** Extract all markdown links matching `\[.*\]\(.*\.md#.*\)` from both docs, then for each `file#anchor`, verify `grep -q "#$anchor\|id=\"$anchor\"" $file`.
- **Pass:** Every outbound cross-link resolves. Specifically required targets include:
  - `../_glossary-android.md#byod` (Phase 34 — D-06d first-use parenthetical cross-link target)
  - `../_glossary-android.md#work-profile` (Phase 34)
  - `../_glossary-android.md#managed-google-play` (Phase 34)
  - `../_glossary-android.md#amapi` (Phase 34)
  - `../_glossary-android.md#play-integrity` (Phase 34)
  - `../android-lifecycle/02-provisioning-methods.md` (Phase 34 — filtered-row cross-ref for BYOD provisioning)
  - `../android-lifecycle/03-android-version-matrix.md` (Phase 34 — BYOD minimum version lookup)
  - `01-managed-google-play.md#bind-mgp` (Phase 35 — MGP binding prereq)
  - `01-managed-google-play.md#disconnect-consequences` (Phase 35)
  - `03-fully-managed-cobo.md#fully-managed` or `#key-concepts` (Phase 36 — corporate-mode contrast for privacy boundary)

### Dimension 6 — Frontmatter schema compliance (D-15)

- **Audit:** Parse YAML frontmatter on both docs; verify keys and value types.
- **Command:** Extract YAML frontmatter between first two `---` delimiters and check:
  - Admin doc (`04-byod-work-profile.md`):
    - `platform: Android`
    - `audience: admin`
    - `applies_to: BYOD`
    - `last_verified: YYYY-MM-DD` (ISO date)
    - `review_by: YYYY-MM-DD` where date = `last_verified + 60 days`
  - End-user doc (`android-work-profile-setup.md`):
    - `platform: Android`
    - **`audience: end-user`** (NEW enum value introduced by this phase)
    - `applies_to: BYOD`
    - `last_verified: YYYY-MM-DD` (ISO date)
    - `review_by: YYYY-MM-DD` where date = `last_verified + 60 days`
- **Pass:** All keys present on both files; all values match spec. `audience: end-user` specifically verified (new enum).

### Dimension 7 — Length targets (D-14)

- **Audit:** Word count.
- **Commands:**
  - `wc -w docs/admin-setup-android/04-byod-work-profile.md` — admin doc target **3000-4000 words** (excluding frontmatter). Warn at 2900-2999 or 4001-4100; fail below 2900 or above 4100.
  - `wc -w docs/end-user-guides/android-work-profile-setup.md` — end-user doc target **800-1500 words**. Warn at 700-799 or 1501-1700; fail below 700 or above 1700.
- **Pass:** Both counts within respective target ranges.

### Dimension 8 — Shared-file modification guard (D-16)

- **Audit:** Verify phase diff adds exactly two new files and touches zero shared/v1.0-v1.3 files, zero Phase 34/35/36 admin-setup-android files (04- is new).
- **Command:** `git diff --name-only HEAD~<N> HEAD` (N = Phase 37 commit count). Check:
  - Exactly two files added: `docs/admin-setup-android/04-byod-work-profile.md` AND `docs/end-user-guides/android-work-profile-setup.md`
  - NEW directory: `docs/end-user-guides/` created
  - Zero modifications to: `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, `docs/_glossary-android.md`, any file under `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/admin-setup-android/00`/`01`/`02`/`03-*.md`, `docs/l1-runbooks/`, `docs/l2-runbooks/`, `docs/_templates/`, `docs/android-lifecycle/`
  - ALLOWED modifications (per D-02 correction task): `.planning/STATE.md` (line 75 correction), `.planning/research/SUMMARY.md` (line 201 + 208 corrections), `.planning/ROADMAP.md` (line 195 correction). These are NOT v1.0-v1.3 shared docs files — they are planning artifacts within `.planning/`.
- **Pass:** Both conditions satisfied.

### Dimension 9 — D-09 SC2 admin-sidebar guardrail (end-user doc)

- **Audit:** End-user doc `## For IT helpdesk agents` H2 MUST NOT contain Intune admin center navigation.
- **Command:** `grep -E "Devices >|Apps >|> Enrollment|Intune admin center|endpoint.microsoft.com|intune.microsoft.com" docs/end-user-guides/android-work-profile-setup.md`
- **Pass:** Returns zero hits. If end-user doc needs to reference admin-side content, it uses user-voice wording ("your IT team can verify...") without Intune portal step language.

### Dimension 10 — D-04 Privacy boundary topic parity sync (admin ↔ end-user)

- **Audit:** Both docs must contain the four load-bearing privacy-boundary topic keywords.
- **Commands:**
  - `grep -iE "work profile data" docs/admin-setup-android/04-byod-work-profile.md` ≥ 1 AND `grep -iE "work profile data\|work data\|work (apps\|stuff)" docs/end-user-guides/android-work-profile-setup.md` ≥ 1
  - `grep -iE "personal apps" docs/admin-setup-android/04-byod-work-profile.md` ≥ 1 AND `grep -iE "personal apps\|your apps\|your personal apps" docs/end-user-guides/android-work-profile-setup.md` ≥ 1
  - `grep -iE "personal data" docs/admin-setup-android/04-byod-work-profile.md` ≥ 1 AND `grep -iE "personal data\|your data\|personal (photos\|files\|messages)" docs/end-user-guides/android-work-profile-setup.md` ≥ 1
  - `grep -iE "device location\|location outside" docs/admin-setup-android/04-byod-work-profile.md` ≥ 1 AND `grep -iE "location\|where you are" docs/end-user-guides/android-work-profile-setup.md` ≥ 1
- **Pass:** All four topics present in BOTH docs. End-user doc may use user-voice synonyms ("your texts" for "personal SMS") as long as the topic maps.

---

## Wave 0 Requirements

Wave 0 = pre-authoring verification to ensure all upstream references exist before Phase 37 executor begins writing.

- [ ] **Upstream Phase 34 anchors verified** — 2026-04-22 plan-time re-check: `_glossary-android.md#byod`, `#work-profile`, `#managed-google-play`, `#amapi`, `#play-integrity` all exist (H3 auto-slug or explicit `<a id>`). Verified during research at commit hash TBD.
- [ ] **Upstream Phase 35 anchors verified** — `01-managed-google-play.md#bind-mgp` and `#disconnect-consequences` exist.
- [ ] **Upstream Phase 36 anchor verified** — `03-fully-managed-cobo.md#key-concepts` or similar exists for corporate-mode contrast cross-ref.
- [ ] **Phase 34 `02-provisioning-methods.md` filtered-row for BYOD** — row exists with Company Portal + web enrollment methods documented. Plan-time verification required.
- [ ] **Phase 34 `03-android-version-matrix.md` BYOD row** — row exists with BYOD minimum version (Android 5.1+ per FEATURES.md or 8.0+ practical; research-flag #1 resolves).
- [ ] **Research-flag plan-time re-verification** — all 6 research flags (D-17) + 3 support items verified against current Microsoft Learn / Google AE Help / techcommunity. Plan-time findings recorded with HIGH/MEDIUM/LOW confidence + last_verified date.
- [ ] **D-02 correction commit plan** — Phase 37 PLAN.md includes an explicit task to correct STATE.md line 75, SUMMARY.md lines 201+208, and ROADMAP.md line 195 in the same commit as the phase deliverables (or immediately adjacent).
- [ ] **No framework install needed** — pure shell audits across two markdown files.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Reading the BYOD admin guide end-to-end, an admin can configure enrollment restrictions, work profile policy, data transfer controls, and Wi-Fi policy post-AMAPI without needing external sources | AEBYOD-01 + AEBYOD-03 | Holistic narrative flow cannot be grep-checked | Reviewer reads the doc start-to-finish and confirms: (a) no gaps in the admin task flow, (b) each what-breaks callout is at the correct decision point, (c) cross-references to Phase 34/35 docs feel natural rather than forced, (d) AMAPI hybrid banner + H2 + inline reminders are coherent |
| Reading the end-user guide end-to-end, a personal-device user can enroll via Company Portal (primary path) and understand what IT can see without being overwhelmed or feeling IT jargon | AEBYOD-02 | Plain-language quality cannot be grep-checked | Reviewer reads the doc as a non-technical user; confirms: (a) no IT jargon (admin, tenant, Intune) outside the `## For IT helpdesk agents` sidebar, (b) privacy summary is reassuring not legalistic, (c) top-5 error section is scannable and actionable, (d) web enrollment sidebar is discoverable but does not confuse the primary path |
| Privacy boundary rows are factually current per Google AE Help and post-April-2025 Microsoft Learn | AEBYOD-01 SC1 + AEBYOD-02 SC2 | Content-current-against-upstream requires reviewer with access to current Google/MS sources | Compare both docs' privacy boundary content against current Google Android Enterprise Help + Microsoft Learn BYOD pages at plan/execute time; flag divergence |
| Web enrollment path content is accurate if sourced from techcommunity blog 4370417 | AEBYOD-03 + PITFALL 8 web enrollment guard | URL drift on Microsoft Community Hub is common; content drift on blog announcements is common | At plan/execute time, verify techcommunity blog 4370417 URL is still live and content still matches; apply MEDIUM confidence marker per D-10 |
| AMAPI Wi-Fi cert-auth "username/password breaks" assertion is still accurate | AEBYOD-03 | MS Learn and techcommunity blog disagree; conflict resolution requires reviewer with tenant-test access | If conflict unresolved at plan/execute time, carry MEDIUM confidence marker + explicit "Conflicts with MS Learn; verify against your tenant" note |
| Microsoft Intune app vs Company Portal role assignment is accurate at end-user-visible level | AEBYOD-03 + AEBYOD-02 | End-user experience depends on which app is installed first and which app delivers what; requires reviewer with current device-side test access | Executor or reviewer confirms at execute time by running through Company Portal vs Intune app enrollment flow on a test device; apply MEDIUM confidence marker if uncertainty remains |

---

## Validation Sign-Off

- [ ] All 3 requirements (AEBYOD-01/02/03) have automated audit commands in Phase Requirements → Audit Map
- [ ] Sampling continuity: audits run per-task-commit (dimensions 2/3/6/8/9) and per-wave (full 10 dimensions)
- [ ] Wave 0 covers all MISSING references (cross-reference verification pre-authoring + research-flag plan-time re-verification + D-02 correction planning)
- [ ] No watch-mode flags (n/a — no test framework)
- [ ] Feedback latency < 15s (all audits are grep/wc on two markdown files)
- [ ] `nyquist_compliant: true` set in frontmatter after Wave 1 authoring passes Wave-0 gate

---

## Wave 0 Execution Log

**Date:** 2026-04-22
**Executor:** claude-sonnet-4-6
**Status:** ALL CHECKS PASSED — proceeding to Wave 1 authoring

### STEP 1.1 — Phase 34 glossary anchor integrity (6 anchors)

| Anchor | Result | Line |
|--------|--------|------|
| #byod | PASS | line 21 (### BYOD auto-slug) |
| #work-profile | PASS | line 69 (### Work Profile auto-slug) |
| #managed-google-play | PASS | line 116 (### Managed Google Play auto-slug) |
| #amapi | PASS | line 124 (### AMAPI auto-slug) |
| #play-integrity | PASS | line 136 (### Play Integrity auto-slug) |
| #fully-managed | PASS | line 59 (### Fully Managed auto-slug) |

All 6 glossary anchors confirmed present via `grep -inE "^### (BYOD|Work Profile|Managed Google Play|AMAPI|Play Integrity|Fully Managed)$"`.

### STEP 1.2 — Phase 35 MGP anchor integrity (3 anchors)

| Anchor | Result |
|--------|--------|
| #bind-mgp | PASS (explicit `<a id="bind-mgp">`) |
| #account-types | PASS (H2 auto-slug) |
| #disconnect-consequences | PASS (H2 auto-slug) |

### STEP 1.3 — Phase 36 COBO anchor integrity

| Anchor | Result |
|--------|--------|
| 03-fully-managed-cobo.md#key-concepts | PASS (explicit `<a id="key-concepts">` at line 24) |

### STEP 1.4 — Phase 34 BYOD row integrity

| File | Result |
|------|--------|
| 03-android-version-matrix.md BYOD row | PASS |
| 02-provisioning-methods.md BYOD row | PASS |

### STEP 1.5 — Research-flag plan-time re-verification (D-17)

| RF | Topic | Confidence Assignment |
|----|-------|-----------------------|
| RF-1 | BYOD minimum version: Android 8+ practical, Android 10+ for AMAPI web enrollment path | HIGH (MS Learn) + MEDIUM (techcommunity 4370417 for 10+ web enrollment) |
| RF-2 | AMAPI web enrollment: opt-in Q1 2026 | MEDIUM (techcommunity blog 4370417, last_verified 2026-04-22) |
| RF-3 | Wi-Fi cert-auth: SCEP/PKCS, EAP-TLS; username/password breaks post-AMAPI | HIGH (EAP types per MS Learn) + MEDIUM (break assertion per techcommunity 4370417) |
| RF-4 | Management app: Microsoft Intune app post-AMAPI primary; Company Portal MAM-only; ADP hidden | MEDIUM (techcommunity blog 4370417) + HIGH (app names/IDs per MS Learn) |
| RF-5 | Admin center path: Devices > Enrollment > Android tab > Device platform restriction; 3 UI settings map to 6 D-05b rows | HIGH (admin center path per MS Learn) + MEDIUM (calendar-no-separate-toggle) |
| RF-6 | Entra MGP binding preferred August 2024+ | HIGH (MS Learn connect-managed-google-play) |
| RF-7 | Top-5 error messages: HIGH for #1 "Can't create work profile", MEDIUM for #2-5 | HIGH/#1 + MEDIUM/#2-5 |
| RF-8 | Privacy boundary rows: cannot-see rows (HIGH per Google AE Help + MS Learn) + can-see rows (HIGH per MS Learn MDM capabilities) | HIGH (both sides sourced from authoritative docs) |
| RF-9 | App terminology: HIGH names + MEDIUM post-AMAPI role split | HIGH (app names/IDs) + MEDIUM (post-AMAPI role distinction) |

### STEP 1.6 — D-02 correction target pre-verification

| Target | Line Found | Status |
|--------|-----------|--------|
| STATE.md BEFORE text "runbook 19 is delivered in Phase 37" | Line 75 (no drift) | PASS — target confirmed at correct line |
| research/SUMMARY.md BEFORE text "BYOD Work Profile - Admin + End-User + L2" | Line 201 (no drift) | PASS — target confirmed at correct line |
| research/SUMMARY.md BEFORE bullet "19-android-enrollment-investigation.md" | Line 208 (no drift) | PASS — target confirmed at correct line |
| ROADMAP.md BEFORE text "BYOD enrollment investigation runbook 19 was introduced" | Line 197 (NOTE: actual line is 197, not 195 as planned) | PASS — target found at line 197; Task 5 must target line 197 |

**DRIFT NOTE:** ROADMAP.md correction target is at line 197, not line 195 as stated in the plan. The Edit tool will use the verbatim BEFORE string (not line number), so no adjustment needed for execution.

### STEP 1.7 — Forbidden-path drift check (D-16)

| Check | Result |
|-------|--------|
| docs/end-user-guides/ does not yet exist | PASS (directory not yet created — expected) |
| docs/admin-setup-android/04-byod-work-profile.md does not yet exist | PASS (file not yet created — expected) |

### Wave 0 Summary

All 7 steps passed. No upstream anchor is missing. All 9 research flags have confidence assignments. D-02 correction targets confirmed at expected positions (ROADMAP.md target at line 197 — verbatim string match will handle regardless). No forbidden files exist yet. Proceeding to Wave 1 authoring (Tasks 2-5).

**Approval:** pending — Phase 37 executor to validate all 10 dimensions pass before `/gsd-verify-work` completes.
