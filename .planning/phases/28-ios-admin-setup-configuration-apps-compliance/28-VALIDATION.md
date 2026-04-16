---
phase: 28
slug: ios-admin-setup-configuration-apps-compliance
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-16
---

# Phase 28 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> This is a DOCUMENTATION phase — all three plans produce markdown files only. Validation focuses on structural and content checks (grep-verifiable) rather than runtime tests.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | grep / file-exists / link-validator (markdown documentation phase) |
| **Config file** | none — built-in shell tools |
| **Quick run command** | `bash scripts/validate-docs-phase-28.sh` (if created, otherwise inline grep checks in each plan) |
| **Full suite command** | `bash scripts/validate-docs-phase-28.sh && markdown-link-check docs/admin-setup-ios/*.md` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Re-run the task's `<acceptance_criteria>` grep commands
- **After every plan wave:** Run full guide-level structural checks (headings, required sections, callout counts)
- **Before `/gsd-verify-work`:** All links validated, all supervised-only callouts counted match the supervised-only setting list from RESEARCH.md
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

*Populated by the planner as plans are written. Each task gets a row with its grep-verifiable acceptance criteria mapped to the requirement it addresses.*

| Task ID | Plan | Wave | Requirement | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------------|-----------|-------------------|-------------|--------|
| 28-01-01 | 01 | 1 | ACFG-01 | N/A — documentation | structural | `test -f docs/admin-setup-ios/04-configuration-profiles.md` | ❌ W0 | ⬜ pending |
| 28-02-01 | 02 | 1 | ACFG-02 | N/A — documentation | structural | `test -f docs/admin-setup-ios/05-app-deployment.md` | ❌ W0 | ⬜ pending |
| 28-03-01 | 03 | 1 | ACFG-03 | N/A — documentation | structural | `test -f docs/admin-setup-ios/06-compliance-policy.md` | ❌ W0 | ⬜ pending |

*Planner will expand this table with one row per task across all three plans.*

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] No new test files — documentation phase uses grep-based acceptance criteria embedded in each task
- [ ] Verify `docs/admin-setup-ios/` directory exists (created in Phase 27) — pre-requisite check only

*All validation happens via acceptance_criteria grep commands in each task.*

---

## Success Criteria Evidence Map

Maps phase success criteria (from ROADMAP.md) to the grep / structural checks that prove them.

| SC# | Success Criterion | Validation Command | Passing Condition |
|-----|-------------------|--------------------|-----------------|
| 1 | Every supervised-only setting has 🔒 callout linking to #supervision anchor | `grep -c '🔒 \*\*Supervised only:\*\*' docs/admin-setup-ios/04-configuration-profiles.md` | Count ≥ count of supervised-only categories from RESEARCH.md matrix |
| 1 | All 🔒 callouts link to the enrollment overview supervision anchor | `grep -c '../ios-lifecycle/00-enrollment-overview.md#supervision' docs/admin-setup-ios/04-configuration-profiles.md` | Equal to 🔒 callout count |
| 2 | App deployment guide distinguishes VPP device-licensed vs user-licensed | `grep -E 'VPP Device-Licensed.*VPP User-Licensed' docs/admin-setup-ios/05-app-deployment.md` | Comparison table present with both columns |
| 2 | Silent install marked as supervised-only in VPP sections | `grep -A 2 '## .*VPP' docs/admin-setup-ios/05-app-deployment.md \| grep '🔒 \*\*Supervised only:\*\* Silent install'` | At least 1 match |
| 2 | Managed app status verification path documented | `grep -iE 'managed app.*status\|Intune admin center.*install' docs/admin-setup-ios/05-app-deployment.md` | At least 1 match |
| 3 | Compliance guide covers OS version, jailbreak, passcode | `for s in 'OS version' 'Jailbroken' 'Passcode'; do grep -l "$s" docs/admin-setup-ios/06-compliance-policy.md; done` | All 3 match |
| 3 | Conditional Access timing section present | `grep -c '## Compliance Evaluation Timing and Conditional Access' docs/admin-setup-ios/06-compliance-policy.md` | Equal to 1 |
| 3 | Default compliance posture toggle explained | `grep -iE 'Mark devices with no compliance policy assigned' docs/admin-setup-ios/06-compliance-policy.md` | At least 1 match |
| 4 | CA state during enrollment→first-evaluation window determinable from compliance guide ALONE | `grep -E 'grace period\|first compliance evaluation\|default compliance posture' docs/admin-setup-ios/06-compliance-policy.md` | All 3 terms present within the CA timing section |
| all | All cross-references resolve | `markdown-link-check docs/admin-setup-ios/04-configuration-profiles.md docs/admin-setup-ios/05-app-deployment.md docs/admin-setup-ios/06-compliance-policy.md` | Exit 0 |

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Readability — admin can determine supervised vs unsupervised at a glance | ACFG-01 SC #1 | Requires human judgment of information design | Ask non-iOS-expert admin to locate 3 supervised-only settings in the guide; they should find each within ≤30 seconds |
| Conceptual clarity of VPP licensing distinction | ACFG-02 SC #2 | Requires human comprehension check | Read "Key Concepts Before You Begin" section, then locate the comparison table; reader should be able to paraphrase the Apple Account requirement difference |
| CA timing sequence understanding from compliance guide alone | ACFG-03 SC #4 | Requires the reader to grasp the sequence without reading reference docs | Without referring to reference/compliance-timing.md, ask reader to explain what happens to a device's CA access in the first 15 minutes after enrollment completes |

---

## Validation Sign-Off

- [ ] All tasks have `<acceptance_criteria>` with grep-verifiable conditions
- [ ] Sampling continuity: every plan's final task verifies the guide file exists with required structural sections
- [ ] Wave 0 covers all MISSING references (none — documentation phase)
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter after plans populate the per-task verification map

**Approval:** pending
