---
phase: 80-l1-l2-runbooks
verified: 2026-06-21T00:00:00Z
status: passed
score: 11/11 must-haves verified
overrides_applied: 0
re_verification: false
---

# Phase 80: L1/L2 Runbooks Verification Report

**Phase Goal:** L1 staff can triage Platform SSO sign-in failures and Secure Enclave key issues using dedicated runbooks that provide executable steps and clear escalation triggers; L2 engineers can conduct full PSSO registration-failure and password-sync-failure investigations using a structured L2 guide; all three runbooks are registered in the L1 and L2 index files.
**Verified:** 2026-06-21
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | L1 staff can triage "Registration Required not appearing" across four root causes using `35-macos-sso-sign-in-failure.md` | ✓ VERIFIED | File exists; Steps 3-6 cover RC1 (old CP), RC2 (Error 10002), RC3 (mistyped token), RC4 (dismissed notification); routing in Step 2 sends "Succeeded + no notification" → RC1 first, then RC3/4; Error 10002 → RC2 |
| 2 | L1 staff can verify SE key state and guide re-registration after password-reset key loss using `36-macos-secure-enclave-key.md` | ✓ VERIFIED | File exists; Steps 1-4 cover SE key verification, cause confirmation, version-branched re-registration (macOS 14 Repair / macOS 13 CP deregister), and post-repair verification |
| 3 | Both L1 runbooks use `app-sso platform -s` as the first triage/verification step via "Say to the user" guided Terminal pattern (C1/D-03) | ✓ VERIFIED | #35 Step 1 and #36 Step 1 both open with a "Say to the user" Terminal walkthrough; `app-sso platform -s` appears verbatim in a fenced `bash` block in each |
| 4 | Both L1 runbooks escalate to L2 #27 via a mandatory in-phase escalation link | ✓ VERIFIED | #35 line 98: `See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md)` · #36 line 86: same pattern |
| 5 | The two L1 runbooks are strictly independent — neither links to nor mentions the other (D2/D-04) | ✓ VERIFIED | Grep for `36-macos-secure-enclave-key` in #35 → 0 matches; grep for `35-macos-sso-sign-in-failure` in #36 → 0 matches |
| 6 | L2 engineers can investigate PSSO registration failures and Password-sync failures using two sequential linear tracks modeled on #19 (A1/D-01) | ✓ VERIFIED | `27-macos-sso-investigation.md` contains `## Track A: Registration Failure Investigation` before `## Track B: Password-Sync Failure Investigation`; two-track linear structure, no Mermaid router |
| 7 | L2 #27 documents sign-in logs, sysdiagnose+debug-logging procedure, TLS-inspection exclusion verification, per-user-MFA, and AD-bound-account checks (SSORUN-03) | ✓ VERIFIED | Track A Steps 1-5 cover: `app-sso platform -s` state (Step 1), Intune portal (Step 2), `sudo log config` + `sudo sysdiagnose` + `log stream` AppSSO procedure (Step 3), TLS exclusion with network-team handoff (Step 4), 15.0-15.2 loop (Step 5); Track B Steps 1-2 cover per-user MFA and AD-bound account |
| 8 | macOS 15.0-15.2 re-registration loop is version-gated as "fixed in 15.3"; `security find-certificate` absent (SC3) | ✓ VERIFIED | Step 5 contains blockquote with exact text "Fixed in macOS 15.3"; grep for `security find-certificate` in all three runbooks → 0 matches in each |
| 9 | `docs/l1-runbooks/00-index.md` contains new rows for #35 and #36 in the macOS ADE Runbooks table (SC4) | ✓ VERIFIED | Lines 48-49 of L1 index: row #35 linking `35-macos-sso-sign-in-failure.md`; row #36 linking `36-macos-secure-enclave-key.md`; both after #15 row, before `## iOS L1 Runbooks` |
| 10 | `docs/l2-runbooks/00-index.md` contains new row for #27 in the macOS ADE When-to-Use table (SC4) | ✓ VERIFIED | Line 86 of L2 index: row `[Platform SSO Investigation](27-macos-sso-investigation.md)` with prerequisite `[macOS Log Collection](10-macos-log-collection.md)` |
| 11 | `docs/l2-runbooks/00-index.md` macOS L1 Escalation Mapping maps L1 #35 and L1 #36 → L2 #27 (SC4) | ✓ VERIFIED | Lines 97-98 of L2 index: `[L1 35: Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md) → [Platform SSO Investigation](27-macos-sso-investigation.md)` and `[L1 36: ...]` → same target |

**Score:** 11/11 truths verified

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` | L1 runbook: 4 root causes, `app-sso platform -s` first, escalation to L2 #27 (SSORUN-01) | ✓ VERIFIED | 109 lines; substantive multi-step runbook with four distinct root-cause sections; `app-sso platform -s` in Step 1 bash block; escalation link to `27-macos-sso-investigation.md` present |
| `docs/l1-runbooks/36-macos-secure-enclave-key.md` | L1 runbook: SE key verification + recovery, escalation to L2 #27 (SSORUN-02) | ✓ VERIFIED | 97 lines; substantive multi-step runbook covering SE key verification, cause confirmation, version-branched recovery (macOS 14/13), post-repair verification; escalation link to `27-macos-sso-investigation.md` present |
| `docs/l2-runbooks/27-macos-sso-investigation.md` | L2 runbook: two-track investigation, sysdiagnose, TLS, MFA/AD-bound, 15.x version gate (SSORUN-03) | ✓ VERIFIED | 205 lines; two-track linear structure; full sysdiagnose procedure; TLS step with dual endpoint categories; per-user MFA and AD-bound checks; 15.0-15.2 version-gate callout; reciprocal back-refs to #35 and #36 |
| `docs/l1-runbooks/00-index.md` | L1 index rows for #35 and #36 in macOS ADE table | ✓ VERIFIED | Rows 48-49 present; after row #15; before `## iOS L1 Runbooks`; Version History row prepended (2026-06-21 "Phase 80 SSORUN-01/02") |
| `docs/l2-runbooks/00-index.md` | L2 index row for #27 + escalation-mapping rows L1 #35/#36 → L2 #27 | ✓ VERIFIED | When-to-Use row on line 86; two escalation-mapping rows on lines 97-98; Version History row prepended (2026-06-21 "Phase 80 SSORUN-03/SC4") |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `35-macos-sso-sign-in-failure.md` | `27-macos-sso-investigation.md` | Escalation Criteria "See" link (in-phase edge E5) | ✓ WIRED | Line 98: `See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md)` |
| `36-macos-secure-enclave-key.md` | `27-macos-sso-investigation.md` | Escalation Criteria "See" link (in-phase edge E5) | ✓ WIRED | Line 86: `See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md)` |
| `27-macos-sso-investigation.md` | `10-macos-log-collection.md` | Log-collection prerequisite opener (D-01b) | ✓ WIRED | Line 17: `[macOS Log Collection Guide](10-macos-log-collection.md)` in Context section |
| `27-macos-sso-investigation.md` | `35-macos-sso-sign-in-failure.md` | Related Resources reciprocal back-reference (E6) | ✓ WIRED | Line 191: `[L1 Runbook 35: macOS Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md)` |
| `27-macos-sso-investigation.md` | `36-macos-secure-enclave-key.md` | Related Resources reciprocal back-reference (E6) | ✓ WIRED | Line 192: `[L1 Runbook 36: macOS Platform SSO — Secure Enclave Key Loss](../l1-runbooks/36-macos-secure-enclave-key.md)` |
| `l2-runbooks/00-index.md` | `27-macos-sso-investigation.md` | macOS L1 Escalation Mapping rows (SC4) | ✓ WIRED | Lines 97-98 in L2 escalation-mapping table |

---

## Data-Flow Trace (Level 4)

Not applicable. This is a documentation-only phase; the artifacts are Markdown files with no dynamic data sources, state variables, or rendering pipeline.

---

## Behavioral Spot-Checks

Not applicable. No runnable entry points — documentation-only phase. All verified checks are content-based.

---

## Probe Execution

No probes declared. No conventional `scripts/*/tests/probe-*.sh` files referenced or applicable to this documentation phase.

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| SSORUN-01 | 80-01-PLAN.md | L1 runbook `35-macos-sso-sign-in-failure.md` — 4 root causes; `app-sso platform -s` first triage step | ✓ SATISFIED | File exists with all 4 root causes, verbatim `app-sso platform -s` in fenced bash block as Step 1, escalation to #27 |
| SSORUN-02 | 80-01-PLAN.md | L1 runbook `36-macos-secure-enclave-key.md` — SE key verification and loss-after-password-reset recovery | ✓ SATISFIED | File exists with SE key loss scenario, recovery path (macOS 14 Repair / macOS 13 CP), post-repair verification |
| SSORUN-03 | 80-02-PLAN.md | L2 runbook `27-macos-sso-investigation.md` — registration-failure + Password-sync investigation; sysdiagnose; TLS; MFA/AD-bound; 15.0-15.2 version-gated "fixed in 15.3" | ✓ SATISFIED | File exists with all required elements: two-track linear structure, sysdiagnose procedure, TLS Step 4, Track B per-user MFA + AD-bound checks, 15.0-15.2 callout with "Fixed in macOS 15.3" text |

No orphaned requirements. All three requirements (SSORUN-01/02/03) are claimed in the plans and verified in the deliverables. SSOREF-04 is correctly mapped to Phase 81 (Pending) — not a Phase 80 requirement.

---

## Locked CONTEXT Decision Verification

| Decision | Code | Status | Evidence |
|----------|------|--------|---------|
| L2 #27 two linear tracks (Registration-failure first, then Password-sync), no Mermaid router | A1 | ✓ HONORED | `## Track A: Registration Failure Investigation` (line 28) precedes `## Track B: Password-Sync Failure Investigation` (line 136); no Mermaid block anywhere in the file |
| No nav-hub/decision-tree edits — navigation-last boundary | B1 | ✓ HONORED | Neither `06-macos-triage.md`, `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, nor `quick-ref-l2.md` were modified; footer in both L1 runbooks links to existing `06-macos-triage.md` without adding an SSO leaf |
| Guided `app-sso platform -s` Terminal walkthrough in L1 | C1 | ✓ HONORED | Both #35 Step 1 and #36 Step 1 open with a "Say to the user" blockquote directing the user to open Terminal and run `app-sso platform -s` verbatim in a fenced bash block |
| `#35` and `#36` strictly independent (no cross-links, no disambiguation note) | D2 | ✓ HONORED | Grep confirms 0 mentions of `36-macos-secure-enclave-key` in #35 and 0 mentions of `35-macos-sso-sign-in-failure` in #36 |

---

## Banned String Verification

| String | #35 | #36 | #27 | Status |
|--------|-----|-----|-----|--------|
| `security find-certificate` | 0 occurrences | 0 occurrences | 0 occurrences | ✓ ABSENT (SC3 gate PASSED) |
| `app-sso diagnose` | 0 occurrences | 0 occurrences | 0 occurrences | ✓ ABSENT (research flag UNVERIFIED honored) |

Note: L2 #27 contains a prohibition note ("The `app-sso` binary does not have a `diagnose` subcommand in any verified Apple or Microsoft source") which does not contain the exact banned string `app-sso diagnose` — the SUMMARY documents this as an intentional rephrasing to avoid triggering the verify check while preserving the warning.

---

## Frontmatter Compliance

| Artifact | `audience` | `platform` | `applies_to` | `last_verified` | `review_by` | Status |
|----------|-----------|-----------|------------|----------------|------------|--------|
| `35-macos-sso-sign-in-failure.md` | L1 | macOS | ADE | 2026-06-21 | 2026-09-21 | ✓ COMPLIANT |
| `36-macos-secure-enclave-key.md` | L1 | macOS | ADE | 2026-06-21 | 2026-09-21 | ✓ COMPLIANT |
| `27-macos-sso-investigation.md` | L2 | macOS | ADE | 2026-06-21 | 2026-09-21 | ✓ COMPLIANT |

---

## Code Review Findings Resolution

The REVIEW.md identified 3 warnings and 3 info items. All 3 warnings were addressed in commit `885ca75` (fix(80): resolve code-review WR-01/02/03). Verification confirms:

**WR-01 (RC1 unreachable from Step 2 decision tree):** RESOLVED. #35 line 39 now reads: "check **Root Cause 1** (Company Portal version) first, then **Root Cause 3 or 4** below." RC1 is now reachable from Step 2 for the "Succeeded + no notification" branch.

**WR-02 (Track B entry condition contradicts routing block):** RESOLVED. L2 #27 line 23 routing now reads "Password-sync failures (registration shows REGISTERED but sign-in / token acquisition fails; per-user MFA or AD-bound account suspected) → Track B." Track B's own opening (line 138) reads "when the device and user registration state shows REGISTERED." These are now consistent — Track B is entered on REGISTERED state with sign-in failure, not "no REGISTERED state."

**WR-03 (TLS sourcing — Apple domains not in DF-10):** RESOLVED. L2 #27 line 117 now correctly scopes the DF-10 link to Microsoft identity endpoints only, and explicitly states "The Apple `app-site-association` domains are an additional Apple-platform requirement for the SSO extension (not enumerated in DF-10)."

Info items IN-01, IN-02, IN-03 are non-blocking and require no action in Phase 80.

---

## SC1-SC4 Compliance (ROADMAP Success Criteria)

**SC1 — `35-macos-sso-sign-in-failure.md`:** VERIFIED.
- Four root causes present: old Company Portal (<5.2404.0) [Step 3], Error 10002 legacy conflict [Step 4], mistyped `{{DEVICEREGISTRATION}}` token [Step 5], dismissed notification [Step 6].
- `app-sso platform -s` as first triage step: Step 1 is the Terminal walkthrough.
- Escalation to L2 #27: "See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md)" in Escalation Criteria.

**SC2 — `36-macos-secure-enclave-key.md`:** VERIFIED.
- SE key verification via `app-sso platform -s` in Step 1.
- Loss-after-password-reset re-registration recovery: Step 3 gives version-branched paths (macOS 14 Repair / macOS 13 CP deregister+re-register).
- Escalation to L2 #27 present in Escalation Criteria.

**SC3 — `27-macos-sso-investigation.md`:** VERIFIED.
- PSSO registration-failure (Track A) + Password-sync-failure (Track B) investigation structure present.
- Sign-in logs: Entra sign-in log screenshot in Microsoft Support Escalation Packet.
- Sysdiagnose: Track A Step 3 full procedure (`sudo log config ... --subsystem "com.apple.AppSSO"` → reproduce → `sudo sysdiagnose` → reset).
- TLS-inspection exclusion verification: Track A Step 4.
- Per-user-MFA check: Track B Step 1.
- AD-bound-account check: Track B Step 2 with `dscl . -read /Users/<username> OriginalNodeName`.
- macOS 15.0-15.2 re-registration loop version-gated "Fixed in macOS 15.3": Track A Step 5 blockquote.
- `security find-certificate`: ABSENT (0 occurrences confirmed).

**SC4 — Index Registration:** VERIFIED.
- L1 index rows: #35 and #36 present in macOS ADE Runbooks table.
- L2 index row: #27 present in macOS When-to-Use table with `10-macos-log-collection.md` prerequisite.
- L2 escalation-mapping: L1 #35 → L2 #27 and L1 #36 → L2 #27 both present.

---

## Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| None | — | — | — |

No `TBD`, `FIXME`, `XXX` debt markers found. No placeholder prose, stub returns, or hardcoded empty data. No nav-hub or Phase-81-owned artifact links in any of the three runbooks. No duplication of guide 07/08/09 tables (link-not-copy pattern honored throughout).

---

## Human Verification Required

No items require human verification for this documentation phase. All success criteria (SC1-SC4) are verifiable by reading the actual file content, which was done directly above. No UI flows, real-time behavior, or external service integrations are involved in this deliverable.

---

## Gaps Summary

No gaps identified. All 11 must-haves verified; all 5 artifacts substantive and wired; all 6 key links confirmed; SSORUN-01/02/03 requirements satisfied; code-review WR-01/02/03 resolved in commit `885ca75`; banned strings absent; locked decisions honored.

---

_Verified: 2026-06-21_
_Verifier: Claude (gsd-verifier)_
