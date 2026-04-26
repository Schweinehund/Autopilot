---
phase: 44
slug: knox-mobile-enrollment
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-25
---

# Phase 44 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Phase 44 ships documentation; validation runs the v1.4.1 milestone audit harness + 7 AEKNOX-NN unit-grep predicates per task.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js (`scripts/validation/v1.4.1-milestone-audit.mjs` — 5 mechanical + 3 informational checks) + per-task shell grep predicates |
| **Config file** | `scripts/validation/v1.4.1-audit-allowlist.json` (sidecar; new Knox content may require pin additions) |
| **Quick run command** | `node scripts/validation/v1.4.1-milestone-audit.mjs` |
| **Full suite command** | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/v1.4.1-milestone-audit.mjs` (runs in <5s; checks files written so far)
- **After every plan wave:** Run full suite + spot-check the AEKNOX-NN unit-grep commands for the requirements that wave touched
- **Before `/gsd-verify-work`:** Full suite must be green AND all 7 AEKNOX-NN unit-greps must pass
- **Max feedback latency:** ~10s for full suite

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 44-01-NN | 01 | 1 | AEKNOX-01 | T-44-01 (stale SKU pricing) | Knox admin doc exists with 5-SKU H2 + Step 0 H2 + DPC anti-paste marker + reciprocal mutex callout | unit | `test -f docs/admin-setup-android/07-knox-mobile-enrollment.md && grep -q "Knox SKU disambiguation (5 SKUs)" docs/admin-setup-android/07-knox-mobile-enrollment.md && grep -q "Step 0 — Samsung Knox Portal B2B account approval" docs/admin-setup-android/07-knox-mobile-enrollment.md && grep -q "AEKNOX-03-shared-anti-paste-block" docs/admin-setup-android/07-knox-mobile-enrollment.md` | ❌ Wave 0 | ⬜ pending |
| 44-02-NN | 02 | 2 | AEKNOX-02 | T-44-02 (Play Integrity verdict drift) | L1 runbook 28 with D-10 actor-boundary + Play Integrity refs + zero SafetyNet | unit | `test -f docs/l1-runbooks/28-android-knox-enrollment-failed.md && grep -qE "Cause A\|Cause B\|Cause C\|Cause D" docs/l1-runbooks/28-android-knox-enrollment-failed.md && grep -q "Admin Action Required" docs/l1-runbooks/28-android-knox-enrollment-failed.md && ! grep -q "SafetyNet" docs/l1-runbooks/28-android-knox-enrollment-failed.md` | ❌ Wave 0 | ⬜ pending |
| 44-03-NN | 03 | 2 | AEKNOX-03 | T-44-02 (Play Integrity verdict drift) | L2 runbook 22 with Pattern A-E + Microsoft Support escalation packet + Play Integrity 3-tier + zero SafetyNet | unit | `test -f docs/l2-runbooks/22-android-knox-investigation.md && grep -qE "Pattern A\|Pattern B\|Pattern C\|Pattern D\|Pattern E" docs/l2-runbooks/22-android-knox-investigation.md && grep -q "Microsoft Support escalation packet" docs/l2-runbooks/22-android-knox-investigation.md && grep -qE "Basic\|Strong integrity" docs/l2-runbooks/22-android-knox-investigation.md && ! grep -q "SafetyNet" docs/l2-runbooks/22-android-knox-investigation.md` | ❌ Wave 0 | ⬜ pending |
| 44-04-NN | 04 | 3 | AEKNOX-04 | — | Capability matrix anchor renamed + populated row | unit | `! grep -q "deferred-knox-mobile-enrollment-row" docs/reference/android-capability-matrix.md && grep -q 'knox-mobile-enrollment-row' docs/reference/android-capability-matrix.md` | ✅ Existing | ⬜ pending |
| 44-05-NN | 05 | 3 | AEKNOX-05 | — | Mermaid 6-branch + Setup Sequence has Knox item | unit | `grep -q "07-knox-mobile-enrollment.md" docs/admin-setup-android/00-overview.md && grep -qE "KME-Path Prerequisites\|Knox Mobile Enrollment" docs/admin-setup-android/00-overview.md` | ✅ Existing | ⬜ pending |
| 44-06-NN | 06 | 3 | AEKNOX-06 | T-44-03 (URL drift) | 4 glossary entries (Knox / KME / KPE; AMAPI cross-link from Knox) + provisioning-methods anchor populated; no WPCO duplicate | unit | `grep -qE '^### Knox$\|^### KME\|^### KPE\|^### AMAPI' docs/_glossary-android.md && test $(grep -cE '^### WPCO' docs/_glossary-android.md) -eq 1 && grep -q "knox-mobile-enrollment" docs/android-lifecycle/02-provisioning-methods.md && ! grep -q "Deferred to v1.4.1" docs/android-lifecycle/02-provisioning-methods.md` | ✅ Existing | ⬜ pending |
| 44-07-NN | 07 | 4 | AEKNOX-07 | — | ZT line 16 + COBO line 162 forward-link to 07-knox-mobile-enrollment.md; AEKNOX-03 anti-paste block in ZT doc | unit | `grep -A2 "KME/ZT mutual exclusion" docs/admin-setup-android/02-zero-touch-portal.md \| grep -q "07-knox-mobile-enrollment.md" && grep -A2 "Samsung admins" docs/admin-setup-android/03-fully-managed-cobo.md \| grep -q "07-knox-mobile-enrollment.md" && grep -q "AEKNOX-03-shared-anti-paste-block" docs/admin-setup-android/02-zero-touch-portal.md` | ✅ Existing | ⬜ pending |
| Phase end-state | — | 4 | All AEKNOX | — | All 8 audit-harness checks PASS (5 mandatory + 3 informational) | integration | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose; [ $? -eq 0 ]` | ✅ Existing | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/admin-setup-android/07-knox-mobile-enrollment.md` — created in Plan 01 (Wave 1)
- [ ] `docs/l1-runbooks/28-android-knox-enrollment-failed.md` — created in Plan 02 (Wave 2)
- [ ] `docs/l2-runbooks/22-android-knox-investigation.md` — created in Plan 03 (Wave 2)
- [x] `scripts/validation/v1.4.1-milestone-audit.mjs` — existing (Phase 43 deliverable)
- [x] `scripts/validation/v1.4.1-audit-allowlist.json` — existing; may need supervision pin additions if new Knox content references iOS-attributed bridge prose
- [x] `docs/reference/android-capability-matrix.md` — existing (anchor rename + row populate in Plan 04)
- [x] `docs/admin-setup-android/00-overview.md` — existing (Mermaid 6-branch update in Plan 05)
- [x] `docs/_glossary-android.md` — existing (4 new entries in Plan 06; WPCO already present at line 75)
- [x] `docs/admin-setup-android/02-zero-touch-portal.md` — existing (reciprocal pin retrofit in Plan 07)
- [x] `docs/admin-setup-android/03-fully-managed-cobo.md` — existing (reciprocal pin retrofit in Plan 07)

*Audit-harness framework already exists from Phase 43. No framework install needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 5-SKU disambiguation table accurately reflects Samsung Knox 2026 product page (KPE Standard vs Premium feature differences, Knox Suite bundle composition) | AEKNOX-01 | Samsung product page wording is editorial — grep can confirm presence but not factual accuracy | Open `https://docs.samsungknox.com/admin/knox-platform-for-enterprise/` and cross-check each KPE feature row in the table; verify "free baseline; Knox Suite gates advanced; Intune supplies KPE Premium transparently" framing matches Samsung's current pricing/bundling |
| Mermaid 6-branch chart renders correctly (6 visible branches with KME labeled "Knox (KME)") | AEKNOX-05 | Mermaid rendering is visual; grep confirms syntax presence but not visual integrity | Render `docs/admin-setup-android/00-overview.md` in GitHub or VS Code Mermaid preview; confirm 6 branches visible and Knox branch labeled per CONTEXT D-discretion recommendation |
| AEKNOX-03 shared anti-paste block has consistent text in BOTH KME and ZT docs (no drift) | AEKNOX-07 | Drift detection at content level requires diff-comparison logic beyond grep | `diff <(sed -n '/AEKNOX-03-shared-anti-paste-block/,/-->/p' docs/admin-setup-android/07-knox-mobile-enrollment.md) <(sed -n '/AEKNOX-03-shared-anti-paste-block/,/-->/p' docs/admin-setup-android/02-zero-touch-portal.md)` should return empty (identical blocks) |
| L1/L2 runbook prose flows readably (D-10 actor-boundary sections aren't mechanical-feeling) | AEKNOX-02, AEKNOX-03 | Prose quality is editorial judgment | Read both runbooks end-to-end; confirm sectioned structure doesn't fragment a single failure-mode investigation across actor-boundary jumps |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies (verification map populated; Wave 0 lists files-to-create)
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify (each plan has at least one task with grep-verifiable predicate)
- [ ] Wave 0 covers all MISSING references (3 net-new files: 07-knox / 28-runbook / 22-runbook; remaining 4 plans modify existing files)
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter (planner sets after task IDs are finalized)

**Approval:** pending (planner aligns task IDs with this map at plan-time; auditor flips status: verified after execute completes)
