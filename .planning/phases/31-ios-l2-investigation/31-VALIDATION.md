---
phase: 31
slug: ios-l2-investigation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-17
---

# Phase 31 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. This is a documentation-only phase; "tests" are grep/structural checks + link-graph audits that enforce SC #1–#4 literal satisfaction and the D-22/D-23 retrofit contract. Mirrors the Phase 30 30-01 `check-phase-30.mjs` scaffold pattern.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js grep/structural checks via a self-contained harness script. Optional markdown-lint pass under `npx markdownlint docs/l2-runbooks/1[4-7]-*.md`. |
| **Config file** | None — harness is self-contained (reads CONTEXT decisions inline). |
| **Quick run command** | `node .planning/phases/31-ios-l2-investigation/check-phase-31.mjs --quick` |
| **Full suite command** | `node .planning/phases/31-ios-l2-investigation/check-phase-31.mjs --full` |
| **Estimated runtime** | Quick ~3 s; Full ~15 s |

---

## Sampling Rate

- **After every task commit:** Run `node check-phase-31.mjs --quick` (preamble + frontmatter + platform-gate-banner + D-22 placeholder-scan checks).
- **After every plan wave:** Run `node check-phase-31.mjs --full` (all Requirement → Test Map rows below, including link-graph audit and D-23 prose-diff check).
- **Before `/gsd-verify-work`:** Full suite must be green AND `grep -rn "Phase 31" docs/l1-runbooks docs/decision-trees/07-ios-triage.md docs/ios-lifecycle/01-ade-lifecycle.md docs/admin-setup-ios/06-compliance-policy.md` returns 0 matches.
- **Max feedback latency:** 15 seconds (full suite).

---

## Per-Task Verification Map

| Check ID | Source | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|----------|--------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| V-31-01 | SC #2 / L2TS-01 / D-02 | 1 | L2TS-01 | — | N/A (no auth surface) | grep | `grep -q "no iOS equivalent to .*mdmdiagnosticstool.*\.exe" docs/l2-runbooks/14-ios-log-collection.md` | ❌ W0 | ⬜ pending |
| V-31-02 | SC #1 / L2TS-01 / D-03 | 1 | L2TS-01 | — | N/A | structural | `grep -c "^| Method " docs/l2-runbooks/14-ios-log-collection.md` expects ≥1 (matrix header); then grep each of: "MDM diagnostic report", "Company Portal", "sysdiagnose" → all ≥1 | ❌ W0 | ⬜ pending |
| V-31-03 | D-05 / D-30 research | 1 | L2TS-01 | — | N/A | structural | `grep -E "(volume .*side button|top button|Sleep/Wake)" docs/l2-runbooks/14-ios-log-collection.md` expects ≥1 per-device-type trigger block | ❌ W0 | ⬜ pending |
| V-31-04 | V7/V8 sysdiagnose PII callout | 1 | L2TS-01 | T-31-01 Information disclosure (sysdiagnose PII) | Runbook warns L2 that sysdiagnose contains PII and must follow org data-handling before ticket attachment | grep | `grep -qiE "(PII\|private data\|redact).*(sysdiagnose\|data-handling)" docs/l2-runbooks/14-ios-log-collection.md` | ❌ W0 | ⬜ pending |
| V-31-05 | V8 Company Portal data-residency callout | 1 | L2TS-01 | T-31-02 Data egress to MS backend | Tier 2 section states logs leave tenant control and are stored by Microsoft for ticket handling | grep | `grep -qiE "(Microsoft (backend\|support infrastructure)\|leaves tenant)" docs/l2-runbooks/14-ios-log-collection.md` | ❌ W0 | ⬜ pending |
| V-31-06 | SC #3 / L2TS-02 / D-07 | 2 | L2TS-02 | — | N/A | structural | `grep -E "^### Pattern [ABCD]:" docs/l2-runbooks/15-ios-ade-token-profile.md` expects exactly 4 matches (A, B, C, D) | ❌ W0 | ⬜ pending |
| V-31-07 | SC #3 | 2 | L2TS-02 | — | N/A | structural | Each Pattern A/B/C/D section contains both an "indicator" substring and a "Resolution" substring within its body (Bash loop: for each pattern, extract body, grep both) | ❌ W0 | ⬜ pending |
| V-31-08 | SC #3 / D-07 investigation structure | 2 | L2TS-02 | — | N/A | structural | `grep -E "^## Investigation — Data Collection\|^## Analysis — Match Against Known Failure Patterns\|^## Resolution" docs/l2-runbooks/15-ios-ade-token-profile.md` expects 3 matches | ❌ W0 | ⬜ pending |
| V-31-09 | D-09 Graph API preamble + D-33 research | 2 | L2TS-02 | T-31-03 Over-privileged Graph scope for L2 | Preamble names the GET endpoint, the `DeviceManagementServiceConfig.Read.All` scope, the READ-ONLY boundary, AND cites ADDTS-02 as the write-operation future runbook | grep | `grep -qE "depOnboardingSettings\|DeviceManagementServiceConfig\.Read\.All\|READ-ONLY\|ADDTS-02" docs/l2-runbooks/15-ios-ade-token-profile.md` — 4 sub-checks, each must pass | ❌ W0 | ⬜ pending |
| V-31-10 | D-10 triple-portal prerequisite | 2 | L2TS-02 | V4 Access Control | Prerequisites section lists ABM + Intune + Entra read access with role names | grep | `grep -qiE "(ABM\|Apple Business Manager).*(Intune).*(Entra\|Azure AD)" docs/l2-runbooks/15-ios-ade-token-profile.md` (or multi-line) | ❌ W0 | ⬜ pending |
| V-31-11 | SC #4 / L2TS-02 / D-12 | 2 | L2TS-02 | — | N/A | structural | Runbook 16 contains all three class markers — `grep -cE "(⚙️\|\\[CONFIG ERROR\\])" expects ≥2`, same for `(⏱️\|\\[TIMING\\])` and `(🐛\|\\[DEFECT\\])`; confirm three-class disambiguation | ❌ W0 | ⬜ pending |
| V-31-12 | SC #4 / D-12 escalation checklist | 2 | L2TS-02 | — | N/A | structural | Runbook 16 "genuine defect" class has a Microsoft-Support escalation block within 20 lines containing a data-collection checklist (≥3 bullet list items) | ❌ W0 | ⬜ pending |
| V-31-13 | D-13 MAM-WE out-of-scope reference | 2 | L2TS-02 | — | N/A | grep | `grep -q "MAM advisory" docs/l2-runbooks/16-ios-app-install.md` AND the advisory link points to `00-index.md#mam-we-investigation-advisory` | ❌ W0 | ⬜ pending |
| V-31-14 | SC #4 / D-14 hybrid axis | 3 | L2TS-02 | — | N/A | structural | Runbook 17 has both top-level H2 sections — `grep -E "^## Investigation by Axis\|^## Per-Cause Deep-Dive" docs/l2-runbooks/17-ios-compliance-ca-timing.md` expects 2 matches | ❌ W0 | ⬜ pending |
| V-31-15 | D-14 axis + cause sub-headings | 3 | L2TS-02 | — | N/A | structural | `grep -E "### Configuration Errors\|### Timing Issues\|### Genuine Defects" expects 3 matches under Investigation-by-Axis; `grep -E "### Cause [ABC]:" expects 3 matches under Per-Cause Deep-Dive` | ❌ W0 | ⬜ pending |
| V-31-16 | D-16 "Not evaluated" terminal state | 3 | L2TS-02 | — | N/A | structural | Runbook 17 has a sub-section (heading level 3 or 4) titled matching `Not evaluated` AND it references APNs + escalation data checklist | ❌ W0 | ⬜ pending |
| V-31-17 | D-17 L1 handoff block | 3 | L2TS-02 | — | N/A | grep | `grep -q "From L1 escalation" docs/l2-runbooks/17-ios-compliance-ca-timing.md` AND the block mentions Cause A / B / C | ❌ W0 | ⬜ pending |
| V-31-18 | D-20 index section | 4 | L2TS-01 + L2TS-02 | — | N/A | structural | `awk 'NR>97 && /^## iOS L2 Runbooks/' docs/l2-runbooks/00-index.md` expects 1 match at line > 97 | existing | ⬜ pending |
| V-31-19 | D-20 "When to Use" table + L1 Escalation Mapping table + MAM advisory | 4 | L2TS-01 + L2TS-02 | — | N/A | structural | Under the `## iOS L2 Runbooks` section: exactly 3 sub-H3s (`### When to Use`, `### iOS L1 Escalation Mapping`, `### MAM-WE Investigation Advisory`); "When to Use" table has 4 data rows (one per runbook); Escalation Mapping has 6 data rows (one per iOS L1 runbook 16-21) | existing | ⬜ pending |
| V-31-20 | D-21 MAM advisory → ADDTS-01 citation | 4 | L2TS-01 + L2TS-02 | — | N/A | grep | `grep -q "ADDTS-01" docs/l2-runbooks/00-index.md` (advisory block references the future milestone ID) | existing | ⬜ pending |
| V-31-21 | D-22 placeholder retrofit complete | 5 | — (cross-phase contract) | — | N/A | **link-graph audit** | `grep -rn "Phase 31" docs/l1-runbooks docs/decision-trees/07-ios-triage.md docs/ios-lifecycle/01-ade-lifecycle.md docs/admin-setup-ios/06-compliance-policy.md` expects **0 matches** post-execution | existing | ⬜ pending |
| V-31-22 | D-22 target specificity | 5 | — | — | N/A | regex | Every L1-runbook 16-21 footer link that was a placeholder now matches `l2-runbooks/1[4-7]-.*\.md` (a specific 14-17 runbook), NOT a bare `00-index.md`; triage-tree lines 44 + 94 MAY link to `00-index.md#ios-l2-runbooks` anchor (generic routing) | existing | ⬜ pending |
| V-31-23 | D-23 prose rewrite at line 182 | 5 | — | — | N/A | structural | `sed -n '182p' docs/admin-setup-ios/06-compliance-policy.md` diff-matches `.planning/phases/31-ios-l2-investigation/expected-d23.txt` (Wave 0 captures the expected verbatim text) | existing | ⬜ pending |
| V-31-24 | D-25 Version History entries on retrofit targets | 5 | — | — | N/A | structural | Each of the 9 retrofit files has a NEW Version History row containing the phrase "Resolved Phase 31 L2 cross-references" | existing | ⬜ pending |
| V-31-25 | D-27 L2 template enum extension | 1 | — | — | N/A | grep | `grep -qE "^platform: Windows \| macOS \| iOS \| all$" docs/_templates/l2-template.md` | existing | ⬜ pending |
| V-31-26 | D-28 frontmatter on each new runbook | 1-3 | — | — | N/A | grep | For each file in `docs/l2-runbooks/1[4-7]-*.md`: `grep -q "^platform: iOS$"`, `grep -q "^audience: L2$"`, `grep -q "^last_verified: " `, `grep -q "^review_by: "` (4 sub-checks per file × 4 files = 16 sub-checks) | ❌ W0 | ⬜ pending |
| V-31-27 | D-28 applies_to per-file mapping | 1-3 | — | — | N/A | grep | `14-` → `applies_to: all`; `15-` → `applies_to: ADE`; `16-` → `applies_to: all`; `17-` → `applies_to: all` | ❌ W0 | ⬜ pending |
| V-31-28 | D-29 platform gate banner per new runbook | 1-3 | — | — | N/A | structural | Exact banner text (from Phase 30 D-26) appears in each of the 4 new runbooks within first 30 lines post-frontmatter | ❌ W0 | ⬜ pending |
| V-31-29 | Runbook length bounds | 1-3 | — | — | N/A | structural | `wc -l` returns within ±15% of targets — 14:~160-180; 15:~220-280; 16:~190-210; 17:~220-250 | ❌ W0 | ⬜ pending |
| V-31-30 | Cross-reference anchor integrity | 4 | — | — | N/A | link-graph | All `../admin-setup-ios/**.md#anchor` and `../l2-runbooks/**.md#anchor` links across the 4 new runbooks + retrofitted files resolve to real anchors (harness extracts headings from each target file and cross-checks) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Sampling continuity check:** No 3 consecutive waves without at least one automated check. Wave 0 creates the harness; Wave 1 checks V-31-01..V-31-05 + V-31-25..V-31-29 (14-log-collection + template); Wave 2 checks V-31-06..V-31-13 (15 and 16); Wave 3 checks V-31-14..V-31-17 (17-compliance); Wave 4 checks V-31-18..V-31-20 + V-31-30 (00-index + link-graph); Wave 5 checks V-31-21..V-31-24 (D-22 retrofit).

---

## Wave 0 Requirements

- [ ] `.planning/phases/31-ios-l2-investigation/check-phase-31.mjs` — validation harness implementing all V-31-01..V-31-30 checks above. Mirrors Phase 30 30-01 scaffold structure; CRLF normalization + multi-cause Symptom handling per Phase 30 `ca40eb9` commit fixes.
- [ ] `.planning/phases/31-ios-l2-investigation/expected-d23.txt` — verbatim D-23 prose rewrite text (from CONTEXT.md D-23 template) used for V-31-23 diff check.
- [ ] `.planning/phases/31-ios-l2-investigation/placeholder-inventory.json` — snapshot of the 13 D-22 line anchors captured at Wave 0 run-time (re-verifies against research-reported no-drift state); if drift detected, flag planner to re-enumerate per D-26 before Wave 1.
- [ ] Link-graph audit subroutine (inside `check-phase-31.mjs`) — parses markdown link targets in the 4 new runbooks + retrofitted files, validates anchor existence in target files, enforces D-22 target-specificity rule (no bare `00-index.md` for L1 runbook escalation links).
- [ ] Pre-flight re-verify check — before Wave 1 starts, re-run `grep -n "Phase 31" …` across the 9 retrofit targets; compare to `placeholder-inventory.json`; if line numbers shifted, emit a non-zero warning directing the executor to re-enumerate.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Runbook 14 "reads well for L2 arriving from Windows experience" | SC #2 intent | Reader experience is subjective; grep confirms preamble exists but cannot confirm the preamble is _effectively placed_. | L2 engineer reads the runbook preamble + first section header; confirms tool-landscape summary is understood within 30 seconds without further explanation. |
| Pattern A-D internal content matches field reality | SC #3 intent | The indicators-to-check and resolution-steps are technically correct in research but field engineers should spot-check Pattern D (wrong MDM server / tenant migration) which is the rarest of the four. | Assigned reviewer (one L2 engineer + one Desktop Engineering lead) review runbook 15 Patterns A-D; confirm indicators match internal field incidents; sign off in Phase 31 verification log. |
| Runbook 17 Pareto weight balance | D-15 | "Pareto emphasis" (50% of runbook to CA timing + Default posture, 10-line compact for jailbreak/OS/passcode/restricted-apps) is a content-proportion judgment not trivially gre­ppable. | Manual review — CA timing + Default posture sub-sections total line count is within 40–60% of runbook 17 total lines (wc -l based spot check; tolerance band documented in verification log). |
| Emoji policy consistency with existing L1/L2 runbooks | D-12 Open Question 2 | Requires grepping existing L1/L2 runbooks for emoji presence; judgment call if inconsistent. | Planner/executor runs `grep -rE "(⚙️\|⏱️\|🐛)" docs/l1-runbooks/ docs/l2-runbooks/` at plan-time; if emoji appear in any existing runbook, iOS runbook 16 uses emoji; otherwise uses text markers `[CONFIG] / [TIMING] / [DEFECT]`. Decision recorded in plan before Wave 2 begins. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify rows above OR a Wave 0 dependency
- [ ] Sampling continuity: no 3 consecutive waves without automated verify (see continuity check above)
- [ ] Wave 0 covers all MISSING references (validation harness, expected-d23.txt, placeholder-inventory, link-graph subroutine)
- [ ] No watch-mode flags (harness is single-shot, CI-compatible)
- [ ] Feedback latency < 15 s
- [ ] `nyquist_compliant: true` set in frontmatter once Wave 0 completes and all rows green post-Wave 5
- [ ] Manual-Only verifications scheduled (L2 spot-check reviewer assigned; Pareto weight spot check; emoji policy audit at plan time)

**Approval:** pending
