---
phase: 85-capability-matrix-l2-runbooks
verified: 2026-06-23T18:30:00Z
status: passed
score: 6/6
overrides_applied: 0
---

# Phase 85: Capability Matrix L2 Runbooks — Verification Report

**Phase Goal:** The macOS capability matrix documents Kerberos SSO Extension support, two new L2 runbooks give engineers structured investigation paths, and the harness V-63-08 blob-hash baseline remains consistent with the matrix file.
**Verified:** 2026-06-23T18:30:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | 85-ANCHOR-INVENTORY.md committed BEFORE matrix edit | VERIFIED | Commit 959ce9a (13:13:26) precedes commit 87a6092 (13:16:32); ANCHOR-INVENTORY staged alone in 959ce9a |
| 2 | macos-capability-matrix.md contains Kerberos SSO Extension row under existing `## Authentication` H2 (not a new SSO Extensions H2) with guide-10 link; V-63-08 BASELINE matches post-edit hash; `node check-phase-63.mjs` reports V-63-08 PASS | VERIFIED | Lines 113-114 contain `AppSSOKerberos.KerberosExtension` and `usePlatformSSOTGT` under `## Authentication`; blob hash `73f163...` matches V-63-08 BASELINE at check-phase-63.mjs line 209; harness reports `[8/32] V-63-08 ... PASS` |
| 3 | `_glossary-macos.md` unchanged (D-07); `_glossary.md` Entra ID SSO see-also extended with reciprocal Kerberos + Platform-Credential pointers; `4-platform-capability-comparison.md` macOS SSO cell updated link-not-copy; V-63-09 BASELINE matches post-edit comparison-doc hash; V-63-09 PASS | VERIFIED | Last commit on `_glossary-macos.md` is c96a24a (Phase 84); `_glossary.md` line 162 carries all three semicolon-separated see-also entries; comparison doc line 101 contains "Kerberos SSO Extension" + `macos-capability-matrix.md#authentication` link; blob hash `2314ede7...` matches V-63-09 BASELINE at line 230; harness reports `[9/32] V-63-09 ... PASS` |
| 4 | `28-macos-kerberos-sso-investigation.md` exists with ticket-acquisition triage (Track A), realm/KDC reachability, TGT verification via `app-sso platform -s` + `klist`, log collection; NO `app-sso diagnose`, NO `klist -v`, NO "From L1 escalation" routing block | VERIFIED | File exists (190 lines); Track A Steps 1-3 cover all SC#4 elements; grep for prohibited strings returns 0 matches; contains no-L1-escalation sentinel sentence |
| 5 | `29-macos-graph-credential-investigation.md` exists with enumerate/verify/delete+re-register (with `[!WARNING]`), permission/role troubleshooting; Graph URLs use `platformCredentialMethods` nav property; bulk-audit deferred as forward note only | VERIFIED | File exists (191 lines); Steps 1-5 cover all SC#5 elements; 6 occurrences of `platformCredentialMethods`; 3 occurrences of `[!WARNING]`; bulk-audit deferred in Context section only; 0 occurrences of prohibited `platformCredentialAuthenticationMethod/` URL path segment |
| 6 | `00-index.md` macOS ADE Runbooks When-to-Use table has rows for #28 and #29; macOS L1 Escalation Mapping table NOT modified | VERIFIED | Lines 87-88 of 00-index.md contain rows for runbooks 28 and 29; git diff confirms only 2 lines added, L1 Escalation Mapping table byte-unchanged |

**Score:** 6/6 truths verified

### Minor Artifact Discrepancy (Non-Blocking)

The `85-ANCHOR-INVENTORY.md` incorrectly lists 10 H2 anchors including `122:## Version History`. The actual pre-edit file (confirmed via `git show 45b4865`) had only 9 H2 anchors — the Version History section is a bare table under `---` below `## See Also`, not an H2 heading. This inaccuracy is in the inventory document only; all functional deliverables (matrix edit, harness baseline, permitted-edit discipline) were correctly executed and verified. Not a blocker.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.planning/phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md` | Pre-edit anchor inventory (SC#1) | VERIFIED | Exists; committed in standalone commit 959ce9a before matrix edit at 87a6092; contains pre-edit blob hash `e91f28c...`; records all H2 anchors (note: 9 actual H2s, inventory claims 10 — non-blocking inaccuracy) |
| `docs/reference/macos-capability-matrix.md` | Kerberos SSO Extension row(s) under `## Authentication` | VERIFIED | Lines 113-114 contain `AppSSOKerberos.KerberosExtension` and `usePlatformSSOTGT`; Windows cells are `n/a — not covered in this matrix`; macOS cells link to guide 10 |
| `scripts/validation/check-phase-63.mjs` | V-63-08 BASELINE = post-edit matrix hash; V-63-09 BASELINE = post-edit comparison-doc hash | VERIFIED | Line 209 BASELINE = `73f16378197223378a8507a6751c763902de58db`; line 230 BASELINE = `2314ede7be54efbea1d4a4a787068310869a5896`; `git hash-object` confirms both match current files |
| `docs/reference/4-platform-capability-comparison.md` | macOS SSO cell references Kerberos link-not-copy at `#authentication` | VERIFIED | Line 101 contains "Kerberos SSO Extension" and `macos-capability-matrix.md#authentication` link |
| `docs/_glossary.md` | Reciprocal Kerberos + Platform Credential see-also on Entra ID SSO term | VERIFIED | Line 162 carries all three pointers on single `> See also:` blockquote line, ending with period |
| `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` | L2 Kerberos SSO runbook (RUN-01, SC#4); min 60 lines | VERIFIED | 190 lines; 9 occurrences of `app-sso platform -s`; 6 occurrences of `klist`; 4 links to guide 10 |
| `docs/l2-runbooks/29-macos-graph-credential-investigation.md` | L2 Graph Platform Credential runbook (RUN-02, SC#5); min 60 lines | VERIFIED | 191 lines; 6 occurrences of `platformCredentialMethods`; 3 `[!WARNING]` blocks; 7 links to guide 11 |
| `docs/l2-runbooks/00-index.md` | macOS ADE Runbooks table rows for #28 and #29 | VERIFIED | Rows present at lines 87-88; macOS L1 Escalation Mapping table unchanged |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `macos-capability-matrix.md` | `docs/admin-setup-macos/10-kerberos-sso-extension.md` | Markdown link in new macOS cells | VERIFIED | Lines 113-114 contain `../admin-setup-macos/10-kerberos-sso-extension.md` |
| `check-phase-63.mjs` | `macos-capability-matrix.md` | V-63-08 git hash-object baseline guard | VERIFIED | Line 209 `const BASELINE = '73f16378197223378a8507a6751c763902de58db'` matches live blob hash |
| `_glossary.md` | `_glossary-macos.md#kerberos-sso-extension` | Reciprocal see-also pointer on Entra ID SSO term | VERIFIED | Line 162 contains `_glossary-macos.md#kerberos-sso-extension` |
| `4-platform-capability-comparison.md` | `macos-capability-matrix.md#authentication` | macOS SSO cell link-not-copy | VERIFIED | Line 101 contains `macos-capability-matrix.md#authentication` |
| `check-phase-63.mjs` | `4-platform-capability-comparison.md` | V-63-09 git hash-object baseline guard | VERIFIED | Line 230 `const BASELINE = '2314ede7be54efbea1d4a4a787068310869a5896'` matches live blob hash |
| `28-macos-kerberos-sso-investigation.md` | `docs/admin-setup-macos/10-kerberos-sso-extension.md` | Related Resources / Context link to Kerberos guide | VERIFIED | 4 occurrences of `10-kerberos-sso-extension.md` in runbook 28 |
| `29-macos-graph-credential-investigation.md` | `docs/admin-setup-macos/11-graph-api-platform-credential.md` | link-not-copy reference to guide 11 permissions | VERIFIED | 7 occurrences of `11-graph-api-platform-credential.md` in runbook 29 |
| `00-index.md` | `29-macos-graph-credential-investigation.md` | When-to-Use table row | VERIFIED | Line 88 of 00-index.md contains `29-macos-graph-credential-investigation.md` |

### Data-Flow Trace (Level 4)

Not applicable — phase is documentation-only. No components render dynamic data. All artifacts are static markdown files.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| V-63-08 reports PASS | `node scripts/validation/check-phase-63.mjs` (filter V-63-08) | `[8/32] V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 73f16378197223378a8507a6751c763902de58db PASS` | PASS |
| V-63-09 reports PASS | `node scripts/validation/check-phase-63.mjs` (filter V-63-09) | `[9/32] V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob 2314ede7be54efbea1d4a4a787068310869a5896 PASS` | PASS |
| Overall harness result | `node scripts/validation/check-phase-63.mjs` | `27 PASS, 5 FAIL, 0 SKIPPED` | PASS (5 FAILs are pre-existing legacy CHAIN FAILs for phases 58-62; per verification brief, these are Phase 86 scope, not Phase 85 regressions) |
| Kerberos rows under correct H2 | grep on matrix | Lines 113-114 appear between `## Authentication` (line 100) and `## See Also` (line 116) | PASS |
| No `## SSO Extensions` H2 introduced | grep on matrix | No matches | PASS |

### Probe Execution

Not applicable — no probe scripts declared for this phase. The harness run in Behavioral Spot-Checks above serves the equivalent verification role per the blocking gate tasks in Plans 85-01 and 85-02.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| REF-01 | 85-01 | `macos-capability-matrix.md` gains Kerberos SSO Extension rows under pre-edit anchor-inventory convention, committed atomically with V-63-08 baseline update | SATISFIED | Matrix contains rows; anchor inventory committed first (959ce9a); V-63-08 PASS confirmed |
| REF-02 | 85-02 | `_glossary-macos.md` confirmed present; reciprocal `_glossary.md` see-also added; `4-platform-capability-comparison.md` macOS cells updated link-not-copy | SATISFIED | _glossary-macos.md unchanged (c96a24a last); _glossary.md line 162 extended; comparison doc line 101 updated; V-63-09 PASS confirmed |
| RUN-01 | 85-03 | L2 engineer can investigate Kerberos SSO extension failures via new runbook #28 | SATISFIED | File exists (190 lines); all SC#4 elements present; locked diagnostics enforced; prohibited strings absent |
| RUN-02 | 85-03 | L2 engineer can investigate Graph-side Platform Credential issues via new runbook #29 | SATISFIED | File exists (191 lines); all SC#5 elements present; `platformCredentialMethods` nav property throughout; DELETE `[!WARNING]` present; link-not-copy to guide 11 |

### Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| `85-ANCHOR-INVENTORY.md` | Claims `122:## Version History` as 10th H2 anchor; pre-edit file had only 9 H2 anchors (bare table, not H2) | Info | No functional impact — inventory's purpose (pre-edit state recording before edits) was fulfilled; all permitted-edit disciplines correctly applied |

No debt markers (TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER) found in any phase-modified file.

**Forbidden string scan for runbook 28:**
- `app-sso diagnose`: 0 occurrences (PASS)
- `klist -v`: 0 occurrences (PASS)
- `From L1 escalation`: 0 occurrences (PASS)

**Forbidden string scan for runbook 29:**
- `platformCredentialAuthenticationMethod/` (as URL path): 0 occurrences (PASS)
- `From L1 escalation`: 0 occurrences (PASS)

**Glossary non-recreation (D-07):**
- Last commit on `_glossary-macos.md`: c96a24a (Phase 84) — confirmed NOT touched in Phase 85 (PASS)

### Human Verification Required

None. All phase deliverables are documentation artifacts verifiable programmatically via file content inspection and harness execution.

### Gaps Summary

No gaps. All 6 observable truths verified. The harness confirms V-63-08 PASS and V-63-09 PASS. Both L2 runbooks exist with all required content and prohibited content absent. The 00-index.md When-to-Use table correctly extended; L1 Escalation Mapping untouched. Requirements REF-01, REF-02, RUN-01, RUN-02 all satisfied.

The 5 harness FAILs reported (`CHAIN-58` through `CHAIN-62`) are pre-existing legacy chain FAILs for phases 58-62 that were already failing before Phase 85 began. The verification brief explicitly designates these as Phase 86 scope. Phase 85 reduced total failures from 7 to 5 (fixed V-63-08 and V-63-09).

---

_Verified: 2026-06-23T18:30:00Z_
_Verifier: Claude (gsd-verifier)_
