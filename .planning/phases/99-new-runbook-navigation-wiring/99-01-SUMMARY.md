---
phase: 99-new-runbook-navigation-wiring
plan: "01"
subsystem: documentation
tags: [runbook, macos, psso, filevault, laps, apple-id, local-password]
dependency_graph:
  requires: []
  provides: [docs/l1-runbooks/37-macos-local-password-reset.md, "reciprocal-link in 36-macos-secure-enclave-key.md"]
  affects: [docs/l1-runbooks/36-macos-secure-enclave-key.md]
tech_stack:
  added: []
  patterns: [L1-runbook-skeleton (mirror #35/#36), inline-fact-plus-cross-link, navigation-last wave sequencing]
key_files:
  created: [docs/l1-runbooks/37-macos-local-password-reset.md]
  modified: [docs/l1-runbooks/36-macos-secure-enclave-key.md]
decisions:
  - "SSPR clarification placed inline within ## Steps intro paragraph (not standalone callout) per D-03"
  - "Five hand-off links to #36 authored (3 path-end cross-links + 2 inline references) — acceptance requires >=3"
  - "Recovery Path C Apple-ID pre-check added per RESEARCH Open Questions RESOLVED (confirm Apple ID association before proceeding)"
  - "H1 uses colon not em-dash to avoid double-hyphen GitHub slug"
metrics:
  duration: "4m"
  completed_date: "2026-06-29"
  tasks_completed: 2
  files_changed: 2
---

# Phase 99 Plan 01: Author L1 Runbook #37 + Reciprocal Back-Link in #36 Summary

**One-liner:** New L1 runbook `37-macos-local-password-reset.md` authoring three pre-login GUI recovery paths (FileVault key / LAPS admin / Apple ID) for Secure Enclave PSSO devices, with SSPR inline clarification and mandatory #36 hand-off; plus minimal reciprocal back-link in #36.

## What Was Built

### Task 1: New L1 runbook #37

**File:** `docs/l1-runbooks/37-macos-local-password-reset.md`  
**Commit:** 670e626

Full L1 runbook covering three pre-login GUI recovery paths for users locked out of Secure Enclave PSSO devices:

- **Recovery Path A — FileVault Recovery Key (Primary):** Admin retrieves key from Intune (Devices > Monitor > Recovery keys > Show Recovery Key) or user self-serves via Company Portal. User enters key at macOS login window "?" flow to reset local password.
- **Recovery Path B — macOS LAPS Managed Admin (Secondary):** Admin retrieves LAPS password from Intune (Devices > Local admin password). Technician logs in as managed admin at login window, resets end-user local password via Users & Groups, user logs back in.
- **Recovery Path C — Apple ID Reset (Where Org Policy Allows):** Pre-check for Apple ID association (ADE accounts may not have one). User triggers "?" > Reset using Apple ID flow at login window.

SSPR clarification placed inline at the start of the ## Steps section: "SSPR resets the Entra ID (cloud) password only and does NOT reset the independent local macOS password on Secure Enclave Platform SSO devices" — with cross-links to `07-platform-sso-setup.md#local-password-lifecycle-and-rotation` and `03-configuration-profiles.md#local-password-policy-passcode`.

Each path ends with an explicit statement that the recovery action destroys the Secure Enclave key binding (which is why PSSO re-registration is mandatory) and a hand-off link to `36-macos-secure-enclave-key.md`. Total hand-off count: 5 (3 path-end blockquotes + 2 inline `](36-macos-secure-enclave-key.md)` references in path headers).

No Terminal/CLI commands appear anywhere in the Steps section (obj-7 compliant). Escalation Criteria routes to L2 #27.

### Task 2: Reciprocal back-link in L1 #36

**File:** `docs/l1-runbooks/36-macos-secure-enclave-key.md`  
**Commit:** 44a92b3

Two surgical changes only:
1. Freshness re-stamp: `last_verified: 2026-06-29` / `review_by: 2026-09-29`
2. One blockquote line inserted after the trigger paragraph (before ## Prerequisites):
   `> **If the user cannot log in:** ... use [macOS Local Password Recovery (L1 #37)](37-macos-local-password-reset.md) first...`

Steps 1-4, re-registration paths (macOS 14 Repair / macOS 13 Company Portal at lines 51-53), heading slugs, and the L2 #27 escalation line are byte-stable.

## Verification Results

| Check | Result |
|-------|--------|
| `audience: L1` in #37 | PASS |
| `](36-macos-secure-enclave-key.md)` count >= 3 in #37 | PASS (5 occurrences) |
| No `app-sso` or `fdesetup` in #37 Steps | PASS (0 occurrences) |
| `27-macos-sso-investigation.md` in #37 | PASS |
| `](37-macos-local-password-reset.md)` in #36 | PASS |
| `review_by: 2026-09-29` in #36 | PASS |
| #36 git diff minimal (link + stamp only) | PASS (6 line delta) |

## Deviations from Plan

None — plan executed exactly as written.

Both tasks authored exactly per D-01/D-02/D-03/obj-7 constraints. [ASSUMED] gaps for LAPS and Apple ID login-window steps were authored from verified macOS knowledge as planned. The Apple ID pre-check note was added per the RESEARCH Open Questions RESOLVED answer.

## Known Stubs

None. All three recovery paths are authored as complete, self-contained procedures. The #36 hand-off cross-link points to the existing, complete re-registration runbook — no stub.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This is documentation-only. The T-99-01 (unsafe instruction) and T-99-02 (state drift) mitigations are confirmed by automated verification (zero `app-sso`/`fdesetup`/shell blocks; 5 #36 hand-off links each carrying the SE-destruction warning).

## Commits

| Task | File | Commit | Type |
|------|------|--------|------|
| Task 1: Author runbook #37 | docs/l1-runbooks/37-macos-local-password-reset.md | 670e626 | feat (new file, 165 lines) |
| Task 2: Reciprocal link in #36 | docs/l1-runbooks/36-macos-secure-enclave-key.md | 44a92b3 | fix (4 insertions, 2 deletions) |

## Phase-100 Needle-Spec Confirmation

This plan delivers the following stable tokens for `check-phase-99.mjs` (Phase 100 Atom 2):

- N1: File path `docs/l1-runbooks/37-macos-local-password-reset.md` exists — CONFIRMED
- N2: `audience: L1` in #37 — CONFIRMED
- N3: `platform: macOS` in #37 — CONFIRMED
- N4: `applies_to: ADE` in #37 — CONFIRMED
- N15: `](37-macos-local-password-reset.md)` in `36-macos-secure-enclave-key.md` — CONFIRMED
- N16: SSPR clarification text "SSPR resets the Entra ID (cloud) password only and does NOT reset the independent local macOS password" — CONFIRMED
- N17: `](36-macos-secure-enclave-key.md)` hand-off links in #37 body (5 occurrences) — CONFIRMED
- N18: `](36-macos-secure-enclave-key.md)` within #37 body — CONFIRMED

Tokens N5-N14 (hub wiring) are delivered by Plan 99-02.

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| `docs/l1-runbooks/37-macos-local-password-reset.md` exists | FOUND |
| `docs/l1-runbooks/36-macos-secure-enclave-key.md` exists | FOUND |
| Commit 670e626 exists | FOUND |
| Commit 44a92b3 exists | FOUND |
