---
phase: 41
slug: android-l2-investigation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-23
---

# Phase 41 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Documentation phase: verification is mechanical grep + anchor-check + diff-based shared-file guard, not unit tests.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Mechanical grep + link-check + git diff (no test runner — documentation phase) |
| **Config file** | None — verification is PLAN.md enumeration + post-execution grep commands |
| **Quick run command** | `grep -i "safetynet" docs/l2-runbooks/18-android-log-collection.md docs/l2-runbooks/19-android-enrollment-investigation.md docs/l2-runbooks/20-android-app-install-investigation.md docs/l2-runbooks/21-android-compliance-investigation.md` (must return 0 matches — D-18 / AEAUDIT-04) |
| **Full suite command** | `grep -n "Phase 41" docs/l1-runbooks/22-*.md docs/l1-runbooks/23-*.md docs/l1-runbooks/24-*.md docs/l1-runbooks/25-*.md docs/l1-runbooks/26-*.md docs/l1-runbooks/27-*.md docs/android-lifecycle/03-android-version-matrix.md docs/admin-setup-android/03-fully-managed-cobo.md docs/admin-setup-android/04-byod-work-profile.md docs/admin-setup-android/05-dedicated-devices.md` (must return 0 matches — D-30 placeholder resolution complete) |
| **Estimated runtime** | ~5 seconds (grep across docs/ tree) |

---

## Sampling Rate

- **After every task commit:** Run `grep -i "safetynet" <newly-authored-runbook>` (zero-tolerance D-18 SafetyNet token guard)
- **After every plan wave:** Run the full D-30 placeholder grep + shared-file-guard diff (D-34)
- **Before `/gsd-verify-work`:** Full suite must be green; all 5 AEL2 requirements verified
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Req ID | Plan | Wave | Behavior | Verification Type | Automated Command | Status |
|--------|------|------|----------|-------------------|-------------------|--------|
| AEL2-05 (template + index) | 41-01 | 0 | L2 template platform enum includes `Android`; 00-index.md has `## Android L2 Runbooks` section appended | Grep | `grep -E "platform:.*Android" docs/_templates/l2-template.md && grep -q "## Android L2 Runbooks" docs/l2-runbooks/00-index.md` | ⬜ pending |
| AEL2-05 (index append-only) | 41-01 | 0 | Windows/APv2/macOS/iOS L2 sections unmodified | Diff | `git diff HEAD~1 docs/l2-runbooks/00-index.md` — changes only after iOS section (line ~131) | ⬜ pending |
| AEL2-01 (3-method log collection) | 41-02 | 1 | Runbook 18 has Section 1/2/3 for Company Portal logs / Microsoft Intune app logs / adb logcat | Grep | `grep -c "^## Section [123]" docs/l2-runbooks/18-android-log-collection.md` — must be 3 | ⬜ pending |
| AEL2-01 (confidence labels) | 41-02 | 1 | adb commands have per-assertion confidence markers matching Phase 37 regex | Grep | `grep -nE "\[(HIGH\|MEDIUM\|LOW)(: [A-Za-z ]+)?(, last_verified [0-9]{4}-[0-9]{2}-[0-9]{2})?\]" docs/l2-runbooks/18-android-log-collection.md` — must have ≥ 3 matches in Section 3 | ⬜ pending |
| AEL2-01 (mode-first tiering D-01) | 41-02 | 1 | Runbook 18 has `## Method Selection by Enrollment Mode` block with per-mode primary tool | Grep | `grep -q "Method Selection by Enrollment Mode\|Primary Tool.*by mode" docs/l2-runbooks/18-android-log-collection.md` | ⬜ pending |
| AEL2-01 (tool-landscape preamble D-02) | 41-02 | 1 | Preamble states "no single Intune admin center Download Diagnostics per-device bundle for Android" (or near-equivalent) | Grep | `grep -i "no.*Intune.*admin.*center.*Download Diagnostics\|no.*MDM enrollment bundle" docs/l2-runbooks/18-android-log-collection.md` | ⬜ pending |
| AEL2-01 (USB-debug callout D-04) | 41-02 | 1 | Section 3 has device-owner-mode constraint callout | Grep | `grep -i "USB debugging.*policy\|device owner.*disable.*USB" docs/l2-runbooks/18-android-log-collection.md` | ⬜ pending |
| AEL2-02 (5 patterns D-07) | 41-03 | 1 | Runbook 19 has Pattern A/B/C/D/E anchors matching D-07 naming | Grep | `grep -cE "^### Pattern [A-E]:" docs/l2-runbooks/19-android-enrollment-investigation.md` — must be 5 | ⬜ pending |
| AEL2-02 (escalation packet D-09) | 41-03 | 1 | Each Pattern Resolution has token sync + profile assignment + enrollment GUID fields | Grep | `grep -c "token sync\|profile assignment\|enrollment profile GUID" docs/l2-runbooks/19-android-enrollment-investigation.md` — must be ≥ 15 (5 patterns × 3 fields) | ⬜ pending |
| AEL2-02 (Phase 39 ZTE anchors) | 41-03 | 1 | Pattern C cross-links resolve to Phase 39 D-17 LOCKED anchors | Link check | `grep -oE "02-zero-touch-portal\.md#[a-z-]+" docs/l2-runbooks/19-android-enrollment-investigation.md` — anchors must include `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#configuration-must-be-assigned`, `#kme-zt-device-claim` | ⬜ pending |
| AEL2-02 (Phase 37 BYOD anchors) | 41-03 | 1 | Pattern A cross-links resolve to Phase 37 BYOD anchors at lines 84/103/148 | Link check | `grep -oE "04-byod-work-profile\.md#[a-z-]+" docs/l2-runbooks/19-android-enrollment-investigation.md` — anchors must include `#enrollment-restrictions`, `#work-profile-policy`, `#privacy-boundary` | ⬜ pending |
| AEL2-02 (Graph READ-ONLY D-10) | 41-03 | 1 | Runbook 19 has Graph API READ-ONLY scope preamble | Grep | `grep -i "Graph API scope.*READ-ONLY\|READ-ONLY.*Graph" docs/l2-runbooks/19-android-enrollment-investigation.md` | ⬜ pending |
| AEL2-03 (3-class disambiguation D-14) | 41-04 | 1 | Runbook 20 uses ⚙️/⏱️/🐛 markers per failure pattern | Grep | `grep -cE "⚙️\|⏱️\|🐛" docs/l2-runbooks/20-android-app-install-investigation.md` — must be ≥ 6 (multiple patterns × 3-class) | ⬜ pending |
| AEL2-03 (MAM-WE exclusion D-15) | 41-04 | 1 | Runbook 20 references MAM advisory in 00-index.md | Grep | `grep -i "MAM-WE Advisory\|MAM advisory" docs/l2-runbooks/20-android-app-install-investigation.md` | ⬜ pending |
| AEL2-04 (ZERO SafetyNet D-18) | 41-05 | 1 | Runbook 21 body contains ZERO literal "SafetyNet" token (case-insensitive) | Grep | `grep -i "safetynet" docs/l2-runbooks/21-android-compliance-investigation.md` — must return 0 matches | ⬜ pending |
| AEL2-04 (hybrid axis D-16) | 41-05 | 1 | Runbook 21 has `## Investigation by Axis` H2 with Config/Timing/Defect H3s AND `## Per-Cause Deep-Dive` with 4 sub-H3s | Grep | `grep -cE "^### Configuration Errors\|^### Timing Issues\|^### Genuine Defects" docs/l2-runbooks/21-android-compliance-investigation.md` — must be 3; `grep -cE "^### Cause [ABCD]:" docs/l2-runbooks/21-android-compliance-investigation.md` — must be 4 | ⬜ pending |
| AEL2-04 (Play Integrity D-19) | 41-05 | 1 | Cause A uses canonical 3-tier ladder labels | Grep | `grep -cE "Basic integrity\|Basic.*Device integrity\|Strong integrity.*hardware-backed" docs/l2-runbooks/21-android-compliance-investigation.md` — must be ≥ 3 (one per tier) | ⬜ pending |
| AEL2-04 (L1 handoff D-17) | 41-05 | 1 | Per-Cause anchors match L1 runbook 25 exactly | Link check | `grep -oE "#cause-[a-d]-[a-z-]+" docs/l2-runbooks/21-android-compliance-investigation.md` — must include `#cause-a-play-integrity-verdict-failure`, `#cause-b-os-version-policy-mismatch`, `#cause-c-ca-timing-gap`, `#cause-d-passcode-encryption-policy-mismatch` | ⬜ pending |
| D-27 (template enum) | 41-01 | 0 | L2 template platform enum now includes `Android` | Grep | `grep -E "platform:.*\bAndroid\b" docs/_templates/l2-template.md` | ⬜ pending |
| D-28 (4-platform banner) | 41-02..05 | 1 | Each new runbook has platform-gate banner with all 4 platform refs | Grep | `for f in docs/l2-runbooks/{18,19,20,21}-android-*.md; do grep -c "Platform gate\|Windows L2 Runbooks\|macOS ADE Runbooks\|iOS L2 Runbooks" "$f"; done` — each must be ≥ 4 | ⬜ pending |
| D-29 (frontmatter schema) | 41-02..05 | 1 | Each runbook has `audience: L2`, `platform: Android`, `applies_to: all`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (90 days later) | Grep | `for f in docs/l2-runbooks/{18,19,20,21}-android-*.md; do grep -cE "^(audience\|platform\|applies_to\|last_verified\|review_by):" "$f"; done` — each must be ≥ 5 | ⬜ pending |
| D-30 (10 placeholders resolved) | 41-06/07/08 | 2 | Zero "Phase 41" placeholder references remain in 10 retrofit targets | Grep | `grep -n "Phase 41" docs/l1-runbooks/22-*.md docs/l1-runbooks/23-*.md docs/l1-runbooks/24-*.md docs/l1-runbooks/25-*.md docs/l1-runbooks/26-*.md docs/l1-runbooks/27-*.md docs/android-lifecycle/03-android-version-matrix.md docs/admin-setup-android/03-fully-managed-cobo.md docs/admin-setup-android/04-byod-work-profile.md docs/admin-setup-android/05-dedicated-devices.md` — must return 0 | ⬜ pending |
| D-32 (last_verified bump) | 41-06/07/08 | 2 | All retrofit files show updated `last_verified` on retrofit commit day | Grep | `grep "last_verified" docs/l1-runbooks/22-*.md docs/l1-runbooks/23-*.md docs/l1-runbooks/24-*.md docs/l1-runbooks/25-*.md docs/l1-runbooks/26-*.md docs/l1-runbooks/27-*.md` — must show Phase 41 ship date | ⬜ pending |
| D-34 (shared-file guard) | all | all | Zero modifications to index.md, common-issues.md, quick-ref-*.md, _glossary*.md, admin-setup-ios/, admin-setup-macos/, end-user-guides/, decision-trees/, existing L2 runbooks 01-17 | Diff | `git diff HEAD~1 docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md docs/_glossary.md docs/_glossary-android.md docs/_glossary-macos.md docs/admin-setup-ios/ docs/admin-setup-macos/ docs/end-user-guides/ docs/decision-trees/ docs/l2-runbooks/01-*.md docs/l2-runbooks/02-*.md docs/l2-runbooks/03-*.md docs/l2-runbooks/04-*.md docs/l2-runbooks/05-*.md docs/l2-runbooks/06-*.md docs/l2-runbooks/07-*.md docs/l2-runbooks/08-*.md docs/l2-runbooks/10-*.md docs/l2-runbooks/11-*.md docs/l2-runbooks/12-*.md docs/l2-runbooks/13-*.md docs/l2-runbooks/14-*.md docs/l2-runbooks/15-*.md docs/l2-runbooks/16-*.md docs/l2-runbooks/17-*.md` — MUST be empty | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] L2 template platform enum updated (`platform: Windows | macOS | iOS | Android | all`) — 1-line edit to `docs/_templates/l2-template.md`
- [ ] `## Android L2 Runbooks` section appended to `docs/l2-runbooks/00-index.md` (after iOS section, line ~131) with `When to Use` table + `Android L1 Escalation Mapping` table + `Android MAM-WE Investigation Advisory` block
- [ ] No test framework installation required — this is a documentation phase; verification is grep-based

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| adb command output format verification on live Android 14/15 device | AEL2-01 | `dumpsys device_policy` output format drifts across Android 12/13/14/15; automated grep cannot verify a human operator can successfully run the command and parse the output on a current OEM/OS combo | L2 engineer runs `adb shell dumpsys device_policy` on an Intune-enrolled Android 14 or 15 device; verifies field names match runbook 18 Section 3 claims; logs date in Phase 41 `last_verified` bump commit |
| L2 handoff pattern works from L1 runbook 25 | AEL2-04 | Anchor `#cause-a-play-integrity-verdict-failure` etc. link integrity verified by grep, but actual L2-engineer comprehension of the handoff flow is a UX validation that requires a human L2 reader | L2 engineer reads L1 runbook 25 Cause A, clicks through to L2 runbook 21 Cause A Per-Cause Deep-Dive, confirms information flow is coherent; documents in verification report |
| Graph API READ-ONLY scope respected during investigation | AEL2-02 | Preamble presence verified by grep, but actual behavior (L2 engineer refrains from write ops) is human-judgment; mechanical audit cannot enforce | Manual review by L2 lead: sample 3 runbook-19-driven investigations; verify no write-Graph operations were invoked |
| MAM advisory is actually discoverable from 00-index.md | AEL2-03 + AEL2-05 | Grep verifies presence; human validates that an L2 engineer looking for MAM guidance finds the advisory via the index navigation path | L2 reader test: given a MAM-WE bug ticket, can the reader find the advisory in ≤ 2 clicks from `00-index.md`? |
| Current Microsoft Learn Android log collection UI matches runbook 18 claims | AEL2-01 + D-04 | UI drift risk over the 90-day `review_by` cycle; automated check cannot detect UI change | Each 90-day `review_by` cycle: Intune admin re-verifies Section 1 Company Portal log retrieval and Section 2 Microsoft Intune app log retrieval UI paths match current Intune admin center + device-side UI |

---

## Validation Sign-Off

- [ ] All 5 AEL2-* requirements have at least one automated grep/diff verification command
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers template + index prerequisite for downstream runbooks
- [ ] No watch-mode flags (grep is one-shot)
- [ ] Feedback latency < 10 seconds
- [ ] `nyquist_compliant: true` will be set after Wave 0 completion

**Approval:** pending
