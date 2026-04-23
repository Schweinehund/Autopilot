---
phase: 40
slug: android-l1-triage-runbooks
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-23
---

# Phase 40 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Phase 40 is documentation-only — validation is mechanical grep/diff-based audit
> (no pytest/jest). Sampling rate maps to task commits and wave merges.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual checklist + grep-based audit (documentation phase — no test runner) |
| **Config file** | None |
| **Quick run command** | `grep -ri "safetynet\|supervised\|supervision" docs/l1-runbooks/2*-android-*.md docs/decision-trees/08-android-triage.md 2>/dev/null; echo "$? expected: 1 (no matches)"` |
| **Full suite command** | Run the 14-item checklist in the "Full Validation Checklist" section at phase completion |
| **Estimated runtime** | ~60 seconds (14 grep/diff commands) |

---

## Sampling Rate

- **After every task commit:** Run quick SafetyNet grep on the specific runbook file modified
- **After every plan wave:** Run checklist items 1-3 (SafetyNet audit, supervision audit, applies_to uniformity)
- **Before `/gsd-verify-work`:** Full 14-item checklist must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 40-01-* | 01 | 1 | AEL1-01 | T-40-01 (append-only invariant) | Triage tree routes all ~17 paths to runbook or L2 in ≤2 steps | structure | `grep -c "^| [A-Z]" docs/decision-trees/08-android-triage.md` → ≥ 17 rows in Routing Verification | ❌ W0 | ⬜ pending |
| 40-02-* | 02 | 1 | AEL1-02 | T-40-02 (actor-boundary discipline) | Runbook 22 has D-10 sectioned H2s + D-12 escalation packet | structure | `grep -c "^## Admin Action Required\|^## Escalation Criteria\|^## L1 Triage Steps\|^## Symptom" docs/l1-runbooks/22-android-enrollment-blocked.md` → = 4 | ❌ W0 | ⬜ pending |
| 40-03-* | 03 | 1 | AEL1-03 | T-40-03 (mode-scope frontmatter) | Runbook 23 applies_to: BYOD | frontmatter | `grep "^applies_to:" docs/l1-runbooks/23-android-work-profile-not-created.md` → value = "BYOD" | ❌ W0 | ⬜ pending |
| 40-04-* | 04 | 1 | AEL1-04 | T-40-02 | Runbook 24 has D-10 sections | structure | `grep -c "^## Admin Action Required\|^## Escalation Criteria\|^## L1 Triage Steps\|^## Symptom" docs/l1-runbooks/24-android-device-not-enrolled.md` → = 4 | ❌ W0 | ⬜ pending |
| 40-05-* | 05 | 1 | AEL1-05 | T-40-04 (Play Integrity only) | Runbook 25 has 4 sub-H2 causes + zero SafetyNet | structure + audit | `grep -c "^## Cause [A-D]:" docs/l1-runbooks/25-android-compliance-blocked.md` → = 4; `grep -i "safetynet" docs/l1-runbooks/25-android-compliance-blocked.md` → 0 matches | ❌ W0 | ⬜ pending |
| 40-06-* | 06 | 1 | AEL1-06 | T-40-02 | Runbook 26 has D-10 sections | structure | `grep -c "^## Admin Action Required\|^## Escalation Criteria\|^## L1 Triage Steps\|^## Symptom" docs/l1-runbooks/26-android-mgp-app-not-installed.md` → = 4 | ❌ W0 | ⬜ pending |
| 40-07-* | 07 | 1 | AEL1-07 | T-40-05 (Phase 39 anchor stability) | Runbook 27 has 4 sub-H2 L1 causes; cross-links to Phase 39 anchors intact | structure + anchor-stability | `grep -c "^## Cause [A-D]:" docs/l1-runbooks/27-android-zte-enrollment-failed.md` → = 4; `grep -c "#reseller-upload-handoff\|#device-claim-workflow\|#profile-assignment\|#kme-zt-device-claim\|#configuration-must-be-assigned" docs/l1-runbooks/27-android-zte-enrollment-failed.md` → ≥ 5 | ❌ W0 | ⬜ pending |
| 40-08-* | 08 | 2 | AEL1-08 | T-40-06 (append-only index) | 00-index.md has Android section; existing sections untouched | diff-based | `git diff docs/l1-runbooks/00-index.md` shows only additions (no deletions/modifications in lines 1-82) | ❌ W0 | ⬜ pending |
| 40-09-* | 09 | 2 | — | T-40-07 (cross-phase retrofit contract) | 3 admin files' Phase 40 forward-promises resolved in single atomic commit | diff-based + grep | `grep -r "Phase 40" docs/admin-setup-android/03-fully-managed-cobo.md docs/admin-setup-android/04-byod-work-profile.md docs/admin-setup-android/05-dedicated-devices.md` → 0 matches (or legitimate non-placeholder uses only) | ❌ W0 | ⬜ pending |
| 40-10-* | 10 | 2 | — | T-40-08 (00-initial-triage append-only) | Android banner added; Mermaid graph unchanged | diff-based | `git diff docs/decision-trees/00-initial-triage.md` shows Android banner + list entry + footer entry + last_verified bump + Version History row ONLY; zero Mermaid modifications | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Task IDs will be finalized at plan-phase time; above mapping assumes 1 plan per Phase 40 deliverable (10 plans total). Planner may consolidate where efficient.*

---

## Wave 0 Requirements

Phase 40 creates all new files — all validation targets are Wave 0 gaps:

- [ ] `docs/decision-trees/08-android-triage.md` — does not exist yet
- [ ] `docs/l1-runbooks/22-android-enrollment-blocked.md` — does not exist yet
- [ ] `docs/l1-runbooks/23-android-work-profile-not-created.md` — does not exist yet
- [ ] `docs/l1-runbooks/24-android-device-not-enrolled.md` — does not exist yet
- [ ] `docs/l1-runbooks/25-android-compliance-blocked.md` — does not exist yet
- [ ] `docs/l1-runbooks/26-android-mgp-app-not-installed.md` — does not exist yet
- [ ] `docs/l1-runbooks/27-android-zte-enrollment-failed.md` — does not exist yet

Grep-based validation commands above run after these files are created during execution.

---

## Full Validation Checklist (Phase Gate)

Complete checklist the plan-checker, executor, and Phase 42 milestone audit use:

1. **SafetyNet-absent audit:** `grep -ri "safetynet" docs/l1-runbooks/2[2-7]-android-*.md docs/decision-trees/08-android-triage.md` → must return zero matches. (D-20 audit anchor.)

2. **Supervision-absent audit:** `grep -i "supervision\|supervised" docs/l1-runbooks/2[2-7]-android-*.md docs/decision-trees/08-android-triage.md` → must return zero matches (AEAUDIT-04; D-06).

3. **applies_to single-string uniformity:** All 6 runbook frontmatters have `applies_to:` as single string. Runbook 23 = `BYOD`; runbook 27 = `ZTE`; runbooks 22/24/25/26 = `all` (D-07..D-12).

4. **last_verified frontmatter uniformity:** All 6 runbooks + 08-android-triage.md have `last_verified: 2026-04-23` (or Phase 40 ship date) frontmatter; `review_by` = `last_verified + 60d` per Phase 34 D-14. All 3 retrofitted admin files + 00-initial-triage.md have bumped `last_verified`.

5. **Anchor stability — 00-index.md:** The new `## Android L1 Runbooks` H2 creates anchor `#android-l1-runbooks`. D-21 retrofit links in the 3 admin files target this anchor.

6. **Anchor stability — Phase 39 cross-links in runbook 27:** `02-zero-touch-portal.md` still has anchors `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#kme-zt-device-claim`, `#configuration-must-be-assigned` (LOCKED per Phase 39 D-17).

7. **Append-only invariant — 00-index.md:** `git diff docs/l1-runbooks/00-index.md` shows zero deletions/modifications in lines 1-82 (existing APv1/APv2/macOS/iOS sections); only additions after line 82.

8. **Append-only invariant — 00-initial-triage.md:** Mermaid graph block unchanged. Only Android banner line, Scenario Trees list entry, See Also entry, `last_verified` bump, and Version History row are new.

9. **Retrofit completeness — 3 admin files:** All 6 exact text instances enumerated in D-21 resolved. `grep -r "Phase 40" docs/admin-setup-android/03-fully-managed-cobo.md docs/admin-setup-android/04-byod-work-profile.md docs/admin-setup-android/05-dedicated-devices.md` → zero matches (or only legitimate non-placeholder uses).

10. **Routing table completeness — 08-android-triage.md:** Routing Verification table enumerates all ~17 paths from CONTEXT.md specifics section. Count ≥ 17 rows.

11. **L2 placeholder convention uniformity:** All 6 runbooks contain D-25 exact wording `"Android L2 investigation runbooks (Phase 41) will live in docs/l2-runbooks/"`. `grep -l "Phase 41" docs/l1-runbooks/2[2-7]-android-*.md` → 6 files.

12. **l1-template.md extension:** `grep "Android" docs/_templates/l1-template.md` → shows `Android` in platform enum line (D-24 / Phase 30 D-24 pattern).

13. **No shared-file contamination (PITFALL 9/11):** `git diff docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md docs/index.md docs/_glossary.md docs/_glossary-macos.md` → empty (zero changes).

14. **Retrofit atomic commit:** `git log --oneline docs/admin-setup-android/` → retrofit commit message matches D-22 pattern: `docs(40): resolve Android L1 runbook placeholders in admin-setup-android`.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Triage tree Mermaid renders correctly in GitHub/GitLab flavored markdown | AEL1-01 | Mermaid rendering is a visual property no grep can verify | Open `docs/decision-trees/08-android-triage.md` in GitHub rendered view; confirm all 6 mode branches render, green terminal nodes link to runbooks 22-27, red escalate nodes show correctly |
| L1 agent can actually route an Android ticket using triage tree in ≤ 2 decision steps | AEL1-01 SC #1 | Path-navigation is cognitive, not textual | Phase-gate manual walk-through: read 3 fabricated tickets ("my phone won't connect to work", "work apps never installed", "corporate kiosk won't enroll") and follow the tree; each reaches a runbook in ≤ 2 diamonds |
| Plain-English disambiguator aliases in D-13/D-14 sub-questions match real user phrasings | AEL1-02, AEL1-04 | Phrase realism is judgment-based | Spot-check 3 aliases against recent-2026 Reddit r/Intune / r/sysadmin posts or Microsoft Q&A threads |
| ZT portal UI click-path specifics in runbook 27 reflect current 2026 portal layout | AEL1-07 | Live portal only accessible to an admin | Execute-time verification: an Intune admin with ZT customer access loads each `<!-- verify UI at execute time -->` comment and confirms current screen matches prose |

---

## State of the Art References

| Old Approach | Current Approach | When Changed | Impact on Phase 40 |
|--------------|------------------|--------------|--------------------|
| SafetyNet attestation | Play Integrity API (three-tier ladder) | January 2025 (Google deprecated) | Zero SafetyNet references in any Phase 40 artifact; AEAUDIT-04 hard rule; audit checklist items 1 + 11 |
| Company Portal as BYOD management app | Microsoft Intune app (post-AMAPI) | April 2025 (AMAPI migration) | Runbook 23 references Microsoft Intune app as primary post-AMAPI |
| Android 13+ strong integrity: any hardware | Hardware-backed security + security patch ≤ 12 months | September 30, 2025 enforcement | Runbook 25 Cause A notes 2025 change |
| ZT portal: select identifier type for search | Any identifier (IMEI/MEID/serial) without type selection | Early 2026 redesign | Runbook 27 Cause A simplified — no type selection |

---

## Validation Sign-Off

- [ ] Plans inherit this validation map (every plan's `must_haves` list references applicable checklist items)
- [ ] Sampling continuity: every task has at least one grep/diff acceptance criterion
- [ ] Wave 0 covers all MISSING files (7 new files listed above)
- [ ] No watch-mode flags (N/A for docs-only phase)
- [ ] Feedback latency < 60s (14 grep/diff commands, single-shot)
- [ ] `nyquist_compliant: true` set in frontmatter at phase completion

**Approval:** pending
