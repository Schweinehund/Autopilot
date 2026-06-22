---
phase: 80-l1-l2-runbooks
plan: "01"
subsystem: docs/l1-runbooks
tags: [l1-runbook, macos, platform-sso, secure-enclave, psso]
dependency_graph:
  requires: [docs/admin-setup-macos/07-platform-sso-setup.md, docs/admin-setup-macos/08-auth-methods-deep-dive.md, docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md, docs/decision-trees/06-macos-triage.md]
  provides: [docs/l1-runbooks/35-macos-sso-sign-in-failure.md, docs/l1-runbooks/36-macos-secure-enclave-key.md]
  affects: [docs/l2-runbooks/27-macos-sso-investigation.md]
tech_stack:
  added: []
  patterns: [L1-macOS-runbook-template, Say-to-the-user-Terminal-walkthrough, link-not-copy, in-phase-escalation-edge]
key_files:
  created:
    - docs/l1-runbooks/35-macos-sso-sign-in-failure.md
    - docs/l1-runbooks/36-macos-secure-enclave-key.md
  modified: []
decisions:
  - "A1/D-01: N/A for this plan (L1 runbooks only; L2 #27 is Plan 02)"
  - "B1/D-02: Footer links to existing 06-macos-triage.md; SSO leaf deferred to Phase 81"
  - "C1/D-03: Both runbooks open with guided app-sso platform -s Terminal walkthrough"
  - "D2/D-04: #35 and #36 are strictly independent; no cross-links"
metrics:
  duration: "12min"
  completed: "2026-06-21"
  tasks: 2
  files: 2
---

# Phase 80 Plan 01: macOS Platform SSO L1 Runbooks Summary

Two L1 Service Desk runbooks for macOS Platform SSO failures — `35-macos-sso-sign-in-failure.md` triages four root causes of missing registration notifications using `app-sso platform -s` first, and `36-macos-secure-enclave-key.md` guides recovery after Secure Enclave key loss from password reset or FileVault recovery key use.

## Tasks Completed

| Task | Name | Commit | Files Created |
|------|------|--------|---------------|
| 1 | Create L1 #35 — macOS Platform SSO Sign-In Failure (SSORUN-01) | c068f5f | docs/l1-runbooks/35-macos-sso-sign-in-failure.md |
| 2 | Create L1 #36 — macOS Platform SSO Secure Enclave Key Loss (SSORUN-02) | 86b5b5b | docs/l1-runbooks/36-macos-secure-enclave-key.md |

## Verification Results

Both automated verify commands printed PASS:

```
# Task 1 verify
test -f docs/l1-runbooks/35-macos-sso-sign-in-failure.md && grep -q 'app-sso platform -s' ... && echo PASS
→ PASS

# Task 2 verify
test -f docs/l1-runbooks/36-macos-secure-enclave-key.md && grep -q 'app-sso platform -s' ... && echo PASS
→ PASS
```

All acceptance criteria satisfied:
- Both files have correct frontmatter (`audience: L1`, `platform: macOS`, `applies_to: ADE`, `last_verified: 2026-06-21`, `review_by: 2026-09-21`)
- Both contain `app-sso platform -s` in a fenced bash block inside a "Say to the user" Terminal walkthrough as Step 1
- `35-macos-sso-sign-in-failure.md` documents all four root causes: old Company Portal (<5.2404.0), Error 10002 legacy SSO extension conflict, mistyped `{{DEVICEREGISTRATION}}` token, dismissed notification — with macOS 14 Repair path and macOS 13 CP re-register for root cause 4
- `36-macos-secure-enclave-key.md` documents SE key loss causes, conservative prose for loss signal, link-not-copy to guide 08, macOS 14 Repair path + macOS 13 Company Portal deregister/re-register, FileVault-still-works note
- Both escalate to `../l2-runbooks/27-macos-sso-investigation.md` (in-phase edge E5, D-02a)
- Both carry verbatim footer `[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)` (B1)
- Neither contains `security find-certificate` or `app-sso diagnose`
- Neither cross-references the other (D-04/D2 strict independence)
- Neither duplicates tables from guides 07/08/09 (link-not-copy)

## Decisions Made

- **C1/D-03 honored:** Both runbooks open with a guided "Say to the user" Terminal walkthrough for `app-sso platform -s`. Command is verbatim in a fenced `bash` block. User is asked to report the full JSON output.
- **B1/D-02 honored:** Back-to-triage footer points to the existing `06-macos-triage.md` tree. SSO leaf addition is deferred to Phase 81. In-phase escalation edges (E5) to `27-macos-sso-investigation.md` are present in both runbooks.
- **D2/D-04 honored:** No cross-link between `35-…` and `36-…`. Both runbooks are strictly independent.
- **Pitfall 5 honored:** No fabricated `app-sso platform -s` failure-state JSON field names. Prose describes healthy state as documented in guide 07 (`Device Registration: REGISTERED` and `User Registration: REGISTERED`) and instructs L1 to collect the full output for any other state.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. Both runbooks are fully wired to existing artifacts:
- `../l2-runbooks/27-macos-sso-investigation.md` (target created in Phase 80 Plan 02)
- `../decision-trees/06-macos-triage.md` (existing file — SSO leaf deferred to Phase 81, intentional per D-02/B1)
- `../admin-setup-macos/07-platform-sso-setup.md`, `08-auth-methods-deep-dive.md`, `09-enterprise-sso-plugin-migration.md` (link-not-copy to existing Phase 76/77/78 deliverables)

Note: the link from both runbooks to `27-macos-sso-investigation.md` will resolve once Plan 02 creates that file within this same phase.

## Threat Flags

None — documentation-only deliverable per threat model in plan. `app-sso platform -s` is a read-only Apple OS binary invoked by the end user; no new attack surface.

## Self-Check: PASSED

Files exist:
- `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` — FOUND
- `docs/l1-runbooks/36-macos-secure-enclave-key.md` — FOUND

Commits exist:
- `c068f5f` — FOUND (feat(80-01): create L1 #35 macOS Platform SSO Sign-In Failure runbook)
- `86b5b5b` — FOUND (feat(80-01): create L1 #36 macOS Platform SSO Secure Enclave Key Loss runbook)
