---
phase: 56
slug: drift-detection-tenant-migration
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-29
---

# Phase 56 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Phase 56 is documentation-only (5 markdown files + 1 Node.js validator script + 1 commit) — no application code, no test framework install. Validation = `check-phase-56.mjs` + `v1.5-milestone-audit.mjs` + markdown-link-check + supervision-pin self-test.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js 20+ (file-reads-only regex-based validator pattern per Phase 48 D-25 + Phase 54/55 cascading inheritance) |
| **Config file** | `scripts/validation/v1.5-audit-allowlist.json` (sidecar; existing — no new entries required at Phase 56 ship per CDI-Phase56-03 YAGNI inheritance) |
| **Quick run command** | `node scripts/validation/check-phase-56.mjs` |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~3-8 seconds (Phase 55 sibling check-phase-55.mjs runs in <5s; v1.5-milestone-audit.mjs runs in ~15s including markdown-link-check) |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-56.mjs` (file-reads-only; no side effects)
- **After every plan wave:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose` (C1-C12 PASS expected; C13 informational)
- **Before pre-commit gate:** Full suite must be green: `check-phase-56.mjs` + `v1.5-milestone-audit.mjs` + `regenerate-supervision-pins.mjs --self-test` + `markdown-link-check` against 5 new files
- **Max feedback latency:** ~15 seconds for the heaviest single check (v1.5-milestone-audit.mjs with C13 markdown-link-check enabled)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 56-01-01 | 01 | 1 | DRIFT-03 | — | n/a | structural | `grep -E '^\| .* \| .* \| .* \| .* \| .* \|' docs/operations/drift-migration/00-overview.md` (cross-platform comparison table 4-platform columns) | ❌ W0 | ⬜ pending |
| 56-01-02 | 01 | 1 | DRIFT-03 | — | n/a | structural | `grep -n '^## Drift terminology' docs/operations/drift-migration/00-overview.md` (concept H2) | ❌ W0 | ⬜ pending |
| 56-01-03 | 01 | 1 | DRIFT-03 | — | n/a | structural | `grep -nE '^> \*\*Platform applicability:\*\*' docs/operations/drift-migration/00-overview.md` (line ~9 cross-platform blockquote) | ❌ W0 | ⬜ pending |
| 56-01-04 | 01 | 1 | DRIFT-03 | — | n/a | structural | `grep -E '(policy conflict\|app install regression\|profile revocation\|jailbreak detection\|OS downgrade\|Play Integrity verdict)' docs/operations/drift-migration/00-overview.md` (6 cross-platform signal tokens) | ❌ W0 | ⬜ pending |
| 56-01-05 | 01 | 1 | DRIFT-03 | — | n/a | NEGATIVE | `! grep -E '(supersedence\|Win32ContentPrepTool\|BitLocker re-key\|ABM token\|MGP re-binding\|exit 1\|exit 0\|Log Analytics\|Quest On Demand Migration)' docs/operations/drift-migration/00-overview.md` (anti-scope-creep firewall — V-56-11) | ❌ W0 | ⬜ pending |
| 56-02-01 | 02 | 1 | DRIFT-01 | — | n/a | structural | `grep -E 'Devices > Manage devices > Scripts and remediations > Remediation scripts' docs/operations/drift-migration/01-windows-drift-detection.md` (V-56-12 portal path literal) | ❌ W0 | ⬜ pending |
| 56-02-02 | 02 | 1 | DRIFT-01 | — | n/a | structural | `grep -E '(No issues detected\|Issues fixed\|Error)' docs/operations/drift-migration/01-windows-drift-detection.md` (V-56-13 status report literals) | ❌ W0 | ⬜ pending |
| 56-02-03 | 02 | 1 | DRIFT-02 | — | n/a | structural | `grep -nE '^## Canonical script-authoring pattern' docs/operations/drift-migration/01-windows-drift-detection.md` (V-56-14 fold H2) | ❌ W0 | ⬜ pending |
| 56-02-04 | 02 | 1 | DRIFT-02 | — | n/a | structural | `grep -E '(exit 1.*exit 0\|exit 0.*exit 1)' docs/operations/drift-migration/01-windows-drift-detection.md` (exit code semantics literals) | ❌ W0 | ⬜ pending |
| 56-02-05 | 02 | 1 | DRIFT-02 | — | n/a | structural | `grep -E 'Log Analytics' docs/operations/drift-migration/01-windows-drift-detection.md` (V-56-14 Log Analytics surface reference) | ❌ W0 | ⬜ pending |
| 56-02-06 | 02 | 1 | DRIFT-01 | — | n/a | structural | `grep -E '\\.\\./\\.\\./reference/drift-detection\\.md' docs/operations/drift-migration/01-windows-drift-detection.md` (V-56-25 cross-link to v1.2 doc) | ❌ W0 | ⬜ pending |
| 56-03-01 | 03 | 1 | n/a (slot reserved) | — | n/a | structural | `grep -nE '^> \*\*Platform applicability:\*\*' docs/operations/drift-migration/02-macos-drift-detection.md` (line ~9 cross-platform blockquote) | ❌ W0 | ⬜ pending |
| 56-03-02 | 03 | 1 | n/a | — | n/a | structural | `grep -E '^platform: macOS' docs/operations/drift-migration/02-macos-drift-detection.md` (frontmatter platform tag) | ❌ W0 | ⬜ pending |
| 56-04-01 | 04 | 1 | n/a (slot reserved) | — | n/a | structural | `grep -nE '^> \*\*Platform applicability:\*\*' docs/operations/drift-migration/03-ios-android-drift-detection.md` (line ~9 cross-platform blockquote) | ❌ W0 | ⬜ pending |
| 56-04-02 | 04 | 1 | n/a | — | n/a | structural | `grep -E '^platform: iOS,Android' docs/operations/drift-migration/03-ios-android-drift-detection.md` (frontmatter multi-platform comma-string) | ❌ W0 | ⬜ pending |
| 56-05-01 | 05 | 1 | DRIFT-04 | — | n/a | structural | `grep -E '^confidence: MEDIUM' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-08 frontmatter MEDIUM) | ❌ W0 | ⬜ pending |
| 56-05-02 | 05 | 1 | DRIFT-04 | — | n/a | structural | `grep -E '> ⚠️.*MEDIUM confidence' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-24 inline blockquote) | ❌ W0 | ⬜ pending |
| 56-05-03 | 05 | 1 | DRIFT-04 | — | n/a | structural | `grep -E '(source-tenant escrow\|PowerShell scheduled-task)' docs/operations/drift-migration/04-tenant-migration-runbook.md` (BitLocker option (a) literal) | ❌ W0 | ⬜ pending |
| 56-05-04 | 05 | 1 | DRIFT-04 | — | n/a | structural | `grep -E '(decrypt.*re-encrypt\|re-encrypt.*decrypt)' docs/operations/drift-migration/04-tenant-migration-runbook.md` (BitLocker option (b) literal) | ❌ W0 | ⬜ pending |
| 56-05-05 | 05 | 1 | DRIFT-04 | — | n/a | structural | `grep -E 'Quest On Demand Migration' docs/operations/drift-migration/04-tenant-migration-runbook.md` (BitLocker option (c) literal — single mention per D-13) | ❌ W0 | ⬜ pending |
| 56-05-06 | 05 | 1 | DRIFT-04 | — | n/a | structural | `grep -E '> ⚠️.*[Dd]ata-risk' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-NN data-risk callout for option (b)) | ❌ W0 | ⬜ pending |
| 56-05-07 | 05 | 1 | DRIFT-04 | — | n/a | structural | `grep -E '(deregistration.*re-registration\|re-registration.*deregistration)' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-17 Autopilot dereg/re-reg sequence) | ❌ W0 | ⬜ pending |
| 56-05-08 | 05 | 1 | DRIFT-05 | — | n/a | structural | `grep -nE '^## macOS / iOS tenant migration' docs/operations/drift-migration/04-tenant-migration-runbook.md` (or split H2 per CD plan-author) | ❌ W0 | ⬜ pending |
| 56-05-09 | 05 | 1 | DRIFT-05 | — | n/a | structural | `grep -E '(ABM token.*release.*re-assign\|release.*re-assign.*ABM token)' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-18 ABM token re-issue sequence) | ❌ W0 | ⬜ pending |
| 56-05-10 | 05 | 1 | DRIFT-05 | — | n/a | structural | `grep -E 'Await-Configuration' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-18 ADE behavior literal) | ❌ W0 | ⬜ pending |
| 56-05-11 | 05 | 1 | DRIFT-05 | — | n/a | structural | `grep -E '(wipe.*re-enrollment\|re-enrollment.*wipe)' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-19 in-use device path) | ❌ W0 | ⬜ pending |
| 56-05-12 | 05 | 1 | DRIFT-06 | — | n/a | structural | `grep -nE '^## Android tenant migration' docs/operations/drift-migration/04-tenant-migration-runbook.md` | ❌ W0 | ⬜ pending |
| 56-05-13 | 05 | 1 | DRIFT-06 | — | n/a | structural | `grep -E '(disconnect.*bind new.*re-approve.*re-provision\|disconnect.*bind.*re-approve.*re-provision)' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-20 MGP re-binding sequence) | ❌ W0 | ⬜ pending |
| 56-05-14 | 05 | 1 | DRIFT-06 | — | n/a | structural | `grep -E '(factory reset.*work profile re-creation\|work profile re-creation.*factory reset)' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-21 per-ownership-mode literals) | ❌ W0 | ⬜ pending |
| 56-05-15 | 05 | 1 | DRIFT-06 | — | n/a | structural | `grep -E 'ZT portal re-upload' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-21 ZT portal cross-tenant re-upload literal) | ❌ W0 | ⬜ pending |
| 56-05-16 | 05 | 1 | DRIFT-07 | — | n/a | structural | `grep -nE '^## Cross-platform encryption drift' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-22 fold H2 literal — SC#5 mandate) | ❌ W0 | ⬜ pending |
| 56-05-17 | 05 | 1 | DRIFT-07 | — | n/a | structural | `grep -E '(BitLocker\|FileVault\|iOS device-level\|iOS encryption\|dm-crypt)' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-23 4-platform encryption coverage) | ❌ W0 | ⬜ pending |
| 56-05-18 | 05 | 1 | DRIFT-04 | — | n/a | structural | `grep -E '\\.\\./\\.\\./device-operations/04-tenant-migration\\.md' docs/operations/drift-migration/04-tenant-migration-runbook.md` (V-56-26 cross-link to v1.2 doc) | ❌ W0 | ⬜ pending |
| 56-06-01 | 06 | 2 | n/a (validator) | — | n/a | meta | `node scripts/validation/check-phase-56.mjs` (exits 0; all 28-32 V-56-NN PASS) | ❌ W0 | ⬜ pending |
| 56-07-01 | 07 | 3 | all | — | n/a | gate | `node scripts/validation/check-phase-56.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/regenerate-supervision-pins.mjs --self-test` (atomic pre-commit gate) | ❌ W0 | ⬜ pending |
| 56-07-02 | 07 | 3 | all | — | n/a | gate | `git log --name-only HEAD~1 \| grep -E '(operations/drift-migration/.*\\.md\|check-phase-56\\.mjs)' \| wc -l` (single atomic commit covers 5 + 1 = 6 files) | ❌ W0 | ⬜ pending |
| 56-07-03 | 07 | 3 | all | — | n/a | gate | All 5 new files contain `> **Platform applicability:**` blockquote at line ~9 (V-56-27 inheritance) | ❌ W0 | ⬜ pending |
| 56-07-04 | 07 | 3 | all | — | n/a | NEGATIVE | `! grep -rnE '^> \*\*Platform:\*\*' docs/operations/drift-migration/` (V-56-28 bare-Platform NEGATIVE regression-guard) | ❌ W0 | ⬜ pending |
| 56-07-05 | 07 | 3 | all | — | n/a | NEGATIVE | `! grep -E '^## (Drift Detection\|Tenant Migration)' docs/operations/00-index.md` (V-56-29 ops/00-index.md NOT amended) | ❌ W0 | ⬜ pending |
| 56-07-06 | 07 | 3 | all | — | n/a | NEGATIVE | `! ls docs/operations/drift-migration/05-cross-platform-encryption-drift.md 2>/dev/null` (V-56-30 fold-discipline — no sibling encryption file) | ❌ W0 | ⬜ pending |
| 56-07-07 | 07 | 3 | all | — | n/a | structural | `ls docs/reference/drift-detection.md docs/device-operations/04-tenant-migration.md` (V-56-31 v1.2 anti-deletion regression-guard) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `scripts/validation/check-phase-55.mjs` exists — Phase 56 inherits this template pattern verbatim per CONTEXT D-19 (file-reads-only, regex-based, no shared module dependencies, ~600-700 lines projected)
- [x] `scripts/validation/v1.5-milestone-audit.mjs` exists with C1-C13 checks — Phase 56 outputs validated against existing harness (no new C-check additions per CDI-Phase56-04)
- [x] `scripts/validation/v1.5-audit-allowlist.json` sidecar exists — no new entries required at Phase 56 ship per CDI-Phase56-03 YAGNI inheritance
- [x] `scripts/validation/regenerate-supervision-pins.mjs --self-test` operational (verified at v1.5 close per Phase 48 D-15 + Phase 55 close)
- [x] `markdown-link-check` configuration `.mlc-config.json` exists from Phase 48 D-08
- [x] Phase 53 created `docs/operations/00-index.md` — Phase 56 cross-references it (does NOT amend per V-56-29 NEGATIVE regression-guard)
- [x] Phase 55 closed (commit aecf014) — Phase 56 dependency from ROADMAP line 308 satisfied (Phase 53 prerequisite indirectly satisfied via Phase 55)
- [x] v1.2 docs `docs/reference/drift-detection.md` and `docs/device-operations/04-tenant-migration.md` exist (V-56-31 anti-deletion regression-guard preconditions)
- [ ] No new framework install required — Phase 56 is documentation-only

*Existing infrastructure covers all Phase 56 verification needs. No Wave 0 framework setup required.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Microsoft Graph `exportJobs` report-name list verification | DRIFT-01 (Graph deep-dive callout) | Microsoft Learn report-name list shifts independently of project release cadence; automated check would require live HTTP fetch (out of scope per Phase 48 D-08 markdown-link-check internal-only configuration) | Plan-author 56-02 verifies https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports-export-graph-available-reports for current GA report-name list at execution time; updates RESEARCH.md report-name pin if shifted from `DeviceNonCompliance, NonCompliantDevicesAndSettings, ConfigurationPolicyAggregate, SettingComplianceAggReport`. Reference RESEARCH §1 |
| Apple OS 26 ABM device-migration API documentation | DRIFT-05 | OS 26 path is recent (2025-2026); not yet in stable Microsoft Learn — verify plan-time | Plan-author 56-05 verifies current Apple Business Manager 2026 UI path; documents legacy "release → re-assign + wipe + re-enroll" path as BASELINE; OS 26 path mentioned with explicit version gate as inline `> 📌 OS 26+ note` callout. Reference RESEARCH §3 |
| Quest On Demand Migration product currency | DRIFT-04 | Third-party product status changes with vendor cadence; Quest tooling URL may shift | Plan-author 56-05 verifies Quest On Demand Migration is current product name (post-Dell/Quest mergers); confirms tenant-to-tenant device migration capability scope. Single mention only per CONTEXT D-13. Reference RESEARCH §2 |
| MGP "disconnect from source" Google Admin / Intune Connector flow | DRIFT-06 | Google Admin / MGP UI workflow may shift; verify at plan-time | Plan-author 56-05 verifies current 2026 Managed Google Play disconnect-and-rebind workflow including app re-approval requirement. Reference RESEARCH §3 |
| BitLocker option (a) `BackupToAAD-BitLockerKeyProtector` caveat | DRIFT-04 | `BackupToAAD-BitLockerKeyProtector` only escrows IF a new key protector is created and encryption re-triggered — must document verbatim to prevent silent-failure pattern | Plan-author 56-05 includes verbatim caveat in option (a) prose. Reference RESEARCH §2 |

---

## Validation Sign-Off

- [ ] All 38 tasks have automated verify commands or Wave 0 dependencies — pending plan author confirmation
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify — verified by table inspection
- [ ] Wave 0 covers all MISSING references — N/A (Phase 56 is documentation; no framework install needed)
- [ ] No watch-mode flags — verified (all commands are one-shot Node.js executions)
- [ ] Feedback latency < 15s — verified (Phase 55 sibling check-phase-55.mjs runs in <5s; full milestone audit ~15s)
- [ ] `nyquist_compliant: true` set in frontmatter — pending validator-as-deliverable (56-06) ship
- [ ] Plan-author resolution items (Manual-Only Verifications table) addressed at execution time

**Approval:** pending
