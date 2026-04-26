---
phase: 45
slug: per-oem-aosp-expansion
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-25
---

# Phase 45 — Validation Strategy

> Per-phase validation contract for documentation-only phase. Validation framework is the v1.4.1 audit harness (`scripts/validation/v1.4.1-milestone-audit.mjs`) plus targeted regex/grep checks against shipped markdown.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js audit harness (`v1.4.1-milestone-audit.mjs`) + grep-based markdown verification |
| **Config file** | `scripts/validation/v1.4-audit-allowlist.json` (sidecar; supervision pin allowlist) |
| **Quick run command** | `node scripts/validation/v1.4.1-milestone-audit.mjs` |
| **Full suite command** | `node scripts/validation/v1.4.1-milestone-audit.mjs && grep -RIn "PITFALL-7\|not supported under AOSP" docs/admin-setup-android/09-13*` |
| **Estimated runtime** | ~5-10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/v1.4.1-milestone-audit.mjs` (C1-C7 informational checks)
- **After every plan wave:** Re-run audit harness + per-OEM PITFALL-7 framing presence grep on the just-shipped files
- **Before `/gsd-verify-work`:** Full audit + manual link-resolution check across all shipped Phase 45 files
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 45-01-01 | 01 | 1 | AEAOSPFULL-01 | — / docs scope | PITFALL-7 framing inline; Wi-Fi-embed REQUIRED for RealWear; PSK-only auth (no EAP) | grep | `grep -c "supported under AOSP" docs/admin-setup-android/09-aosp-realwear.md` >= 1 | ✅ existing harness | ⬜ pending |
| 45-02-01 | 02 | 1 | AEAOSPFULL-02 | — / docs scope | OEMConfig-via-Intune-APK NOT MGP; Android 12 gap explicit | grep | `grep "OEMConfig" docs/admin-setup-android/10-aosp-zebra.md` && `grep "Android 12" docs/admin-setup-android/10-aosp-zebra.md` | ✅ existing | ⬜ pending |
| 45-03-01 | 03 | 1 | AEAOSPFULL-03 | — / docs scope | Pico Business Suite OPTIONAL coexistence; Enterprise SKU only | grep | `grep -i "optional" docs/admin-setup-android/11-aosp-pico.md` | ✅ existing | ⬜ pending |
| 45-04-01 | 04 | 1 | AEAOSPFULL-04 | — / docs scope | Direct-QR Intune flow; 3-model firmware floors | grep | `grep -E "Vive Focus 3\|XR Elite\|Focus Vision" docs/admin-setup-android/12-aosp-htc-vive-focus.md` | ✅ existing | ⬜ pending |
| 45-05-01 | 05 | 1 | AEAOSPFULL-05 | — / docs scope | 4-portal pattern; Meta Horizon "alive in transformed form" callout (D-06 RESEARCH outcome); Feb 20 2026 callout REQUIRED | grep | `grep "Feb 20, 2026\|February 20, 2026" docs/admin-setup-android/13-aosp-meta-quest.md` | ✅ existing | ⬜ pending |
| 45-06-01 | 06 | 2 | AEAOSPFULL-06 | — / docs scope | 4 H2 sub-tables; all 5 dimensions as named columns; NO prose-Notes column; `## Version History` H2 | grep | `grep -c "^## " docs/reference/aosp-oem-matrix.md` >= 6 (4 sub-tables + Scope + Source Attribution + Version History) | ✅ existing | ⬜ pending |
| 45-07-01 | 07 | 2 | AEAOSPFULL-09 (stub trim) | — / docs scope | 9-H2 whitelist preserved; deferred-content table COLLAPSED; PITFALL-7 framing PRESERVED | harness | `node scripts/validation/v1.4.1-milestone-audit.mjs` (C3 word-count + C6 PITFALL-7 informational) | ✅ existing | ⬜ pending |
| 45-08-01 | 08 | 3 | AEAOSPFULL-07 | — / docs scope | 5 OEM-scoped Causes A-E + aggregate Escalation Criteria H2; D-10 actor-boundary + D-12 escalation packet per Cause; in-runbook OEM-id step | grep | `grep -c "^## Cause [A-E]" docs/l1-runbooks/29-android-aosp-enrollment-failed.md` == 5 && `grep "How to Use This Runbook" docs/l1-runbooks/29-android-aosp-enrollment-failed.md` | ✅ existing | ⬜ pending |
| 45-09-01 | 09 | 3 | AEAOSPFULL-08 | — / docs scope | Per-OEM Pattern A-E (1:1 with L1 Causes); Play Integrity 3-tier verdicts only; ZERO SafetyNet tokens | harness | `node scripts/validation/v1.4.1-milestone-audit.mjs` (C1 SafetyNet check) + `grep -c "^## Pattern [A-E]" docs/l2-runbooks/23-android-aosp-investigation.md` == 5 | ✅ existing | ⬜ pending |
| 45-10-01 | 10 | 4 | AEAOSPFULL-09 (atomic retrofits) | — / docs scope | Triage tree ANDR29 single-target; capability matrix anchor link; 02-provisioning-methods.md userless 90-day + per-OEM firmware rows; L1 index Android section update; PHASE-45-AOSP-SOURCE.md DELETED | grep + harness | `grep "ANDR29" docs/decision-trees/08-android-triage.md` && `grep "aosp-oem-matrix.md" docs/reference/android-capability-matrix.md` && `! test -e .planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` | ✅ existing harness | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

This is a documentation-only phase. No new test infrastructure is required. Existing v1.4.1 audit harness (`scripts/validation/v1.4.1-milestone-audit.mjs`) covers all Phase 45 mechanical checks. Wave 0 reduces to:

- [x] `scripts/validation/v1.4.1-milestone-audit.mjs` — exists (Phase 43 deliverable)
- [x] `scripts/validation/v1.4-audit-allowlist.json` — exists (Phase 43 deliverable; supervision pins baseline)
- [x] `scripts/validation/regenerate-supervision-pins.mjs` — exists (Phase 43 helper; re-run after content lands if line shifts invalidate pin indexes)

**Existing infrastructure covers all phase requirements.**

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| PITFALL-7 framing per-claim discipline (every "supported" assertion paired with "not supported under AOSP if GMS available" caveat) | All 5 per-OEM admin docs (09-13), `aosp-oem-matrix.md`, runbook 29, runbook 23 | Phase 47 plans informational-first C6 regex check — until then, manual review per Phase 45 deliverable | Reviewer reads each per-OEM admin doc + matrix + runbooks; confirms each "supported under AOSP" assertion pairs with PITFALL-7 baseline caveat at point-of-claim |
| Sibling-pattern parity for 11-H2 admin doc skeleton | All 5 per-OEM admin docs (09-13) | H2 count + ordering check is grep-able but presence of `## Renewal / Maintenance`, `## What Breaks Summary`, etc. requires reviewer to confirm content adequacy | Reviewer compares 09-13 H2 sequence against 02/03/05/07 sibling pattern; confirms 11 H2s present in fixed order; per-OEM REQUIRED add-on H2s present per D-02 |
| `## Common Failures` H2 anchor convention for runbook 29/23 cross-link | L1 runbook 29 + L2 runbook 23 cross-links | D-21 cross-link convention requires admin guides 09-13 ship `## Common Failures` H2 BEFORE runbooks 29/23 cross-link land (Wave 3 dependency on Wave 1) | Wave-3 plan checker confirms each runbook 29 Cause cross-links to corresponding admin guide `## Common Failures` H2 anchor; confirms Wave 1 admin docs ship first |
| Meta Horizon "alive in transformed form" framing accuracy | `13-aosp-meta-quest.md` Scope and Status + `## Meta Horizon Subscription Status` H2 | D-06 plan-time RESEARCH outcome requires precise distinction between "commercial-SKU + paid-tier discontinuation" (HMS becomes free + maintenance through 2030-01-04) vs "HMS shutdown" (factually wrong) | Reviewer confirms doc framing matches RESEARCH.md §2 finding; no "discontinued" / "shutdown" / "wound down" language applied to HMS itself |
| Atomic same-commit retrofit (Wave 4) | All Wave 4 retrofit edits | Wave 4 must be a single commit covering triage tree + capability matrix anchor + provisioning methods + L1 index + glossary + PHASE-45-AOSP-SOURCE.md deletion | Reviewer confirms `git log -1 --name-status` shows all retrofit files in single commit; PHASE-45-AOSP-SOURCE.md deletion present in the same commit |
| L2 runbook 23 zero SafetyNet | `23-android-aosp-investigation.md` | Harness C1 SafetyNet check is automated, but reviewer should confirm Play Integrity 3-tier verdict structure follows Phase 41 D-XX pattern (Pattern bodies use Strong/Basic/Hardware-attested verdicts in stratified order) | Reviewer compares Pattern A-E body shape against `22-android-knox-investigation.md:113-254` pattern; confirms Play Integrity verdicts named correctly |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies (10/10 mapped above)
- [ ] Sampling continuity: every wave's terminal plan triggers full audit harness re-run
- [ ] Wave 0 covers all MISSING references (none — existing infrastructure suffices)
- [ ] No watch-mode flags (audit harness is non-interactive Node script)
- [ ] Feedback latency < 10s (harness ~5-10s)
- [ ] `nyquist_compliant: true` set in frontmatter (post-execution)

**Approval:** pending
