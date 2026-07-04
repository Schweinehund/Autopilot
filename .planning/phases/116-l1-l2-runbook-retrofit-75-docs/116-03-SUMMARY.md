---
phase: 116-l1-l2-runbook-retrofit-75-docs
plan: "03"
subsystem: docs/l1-runbooks
tags: [eee-retrofit, macos-l1, d05-blockquote, state-changing-banner, c17-green]
dependency_graph:
  requires: [116-01, 116-02]
  provides: [116-04, 116-05, 116-06, 116-07, 116-08]
  affects: [docs/l1-runbooks, docs/_registry/RE-index.md]
tech_stack:
  added: []
  patterns: [transform-A-sentence-split, transform-B-deblockquote, tailored-safety-banner, d05-em-dash-clause-split]
key_files:
  created: []
  modified:
    - docs/l1-runbooks/10-macos-device-not-appearing.md
    - docs/l1-runbooks/11-macos-setup-assistant-failed.md
    - docs/l1-runbooks/12-macos-profile-not-applied.md
    - docs/l1-runbooks/13-macos-app-not-installed.md
    - docs/l1-runbooks/14-macos-compliance-access-blocked.md
    - docs/l1-runbooks/15-macos-company-portal-sign-in.md
    - docs/l1-runbooks/35-macos-sso-sign-in-failure.md
    - docs/l1-runbooks/36-macos-secure-enclave-key.md
    - docs/l1-runbooks/37-macos-local-password-reset.md
    - docs/_registry/RE-index.md
decisions:
  - "Tasks 1+2 committed together — helper writes a [FILL-IN] placeholder that represents an invalid intermediate state; combining the mechanical transform and Summary prose into one commit mirrors the 116-01 pattern and produces no behavioral difference"
  - "RE-037 Path B and Path C 'After completing' notes (S1 ~216-218c) split at em-dash clause boundary into 4 groups — the em-dash is a valid clause boundary per D-05; all words preserved; groups each <=200c"
  - "RE-038 line 125 'Say to the user' pre-check blockquote (246c) converted via Transform B (de-blockquote) — preserves the complete user script text as a bold-led paragraph, removing it from C17 #12 universe"
  - "RE-037 line 25 'If the user cannot log in' callout (274c, single sentence) converted via Transform B — single atomic sentence cannot be split at sentence boundary; de-blockquote is the word-preserving resolution"
metrics:
  duration_minutes: 12
  completed_date: "2026-07-04"
  tasks_completed: 3
  files_created: 0
  files_modified: 10
---

# Phase 116 Plan 03: macOS L1 Cluster EEE Retrofit — Summary

**One-liner:** EEE retrofit of 9 macOS L1 runbooks (RE-011..RE-016, RE-036..RE-038) including tailored state-changing safety banners for RE-037 (Secure Enclave key re-registration) and RE-038 (FileVault/LAPS/Apple-ID password recovery), with word-preserving D-05 blockquote splits and C17 green.

## What Was Built

Retrofitted 9 macOS L1 runbooks to the EEE standard (D3-A structure, EEE block line, Summary with tier banner, gate blockquote relocated, Version-History row) plus registry Status updates. This batch includes two state-changing runbooks whose default L1 "read-only" banner would have been factually false and harmful if recited by Copilot.

**Files modified (9 runbooks + registry):**

| File | RE-ID | Platform | Banner Type |
|------|-------|----------|-------------|
| 10-macos-device-not-appearing.md | RE-011 | macOS | L1 read-only |
| 11-macos-setup-assistant-failed.md | RE-012 | macOS | L1 read-only |
| 12-macos-profile-not-applied.md | RE-013 | macOS | L1 read-only |
| 13-macos-app-not-installed.md | RE-014 | macOS | L1 read-only |
| 14-macos-compliance-access-blocked.md | RE-015 | macOS | L1 read-only |
| 15-macos-company-portal-sign-in.md | RE-016 | macOS | L1 read-only |
| 35-macos-sso-sign-in-failure.md | RE-036 | macOS | L1 read-only |
| 36-macos-secure-enclave-key.md | RE-037 | macOS | TAILORED (Secure Enclave NOT read-only) |
| 37-macos-local-password-reset.md | RE-038 | macOS | TAILORED (FileVault/LAPS/Apple-ID NOT read-only) |
| docs/_registry/RE-index.md | — | — | RE-011..016, RE-036..038 → Approved |

**D-05 blockquote fixes (5 over-limit groups resolved):**

| File | Line | Chars | Fix Applied |
|------|------|-------|-------------|
| 36-macos-secure-enclave-key.md | 25 | 274c | Transform B (single-sentence cross-ref callout de-blockquoted) |
| 37-macos-local-password-reset.md | 77 | 450c | Transform A (3 groups: sentence boundaries after S1 ≈195c, S2 ≈78c, S3 ≈177c) |
| 37-macos-local-password-reset.md | 115 | 473c | Transform A (4 groups: em-dash split + 2 sentence boundaries; S1-B ≈218c → ≈174c) |
| 37-macos-local-password-reset.md | 125 | 246c | Transform B (Say-to-user pre-check callout de-blockquoted) |
| 37-macos-local-password-reset.md | 144 | 459c | Transform A (4 groups: em-dash split + 2 sentence boundaries; S1-C ≈202c → ≈158c) |

## Verification Results

```
D-05 measurement:
  Total over-limit groups: 0  (was 5 before fixes)

Enrollment precheck (all 9 files):
  No INCOMPLETE lines — all 4 EEE keys present

C17 validation:
  C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0
  C17 summary: 27 files checked, 0 with violations, 0 total violations
  Exit code: 0

Registry (RE-index.md):
  RE-011..RE-016: Status = Approved
  RE-036..RE-038: Status = Approved

Tailored banners (T-116-02 mitigation):
  RE-037: contains "NOT" + "Secure Enclave" — no false read-only claim
  RE-038: contains "NOT" + "FileVault" — no false read-only claim
  RE-036: contains "read-only L1 diagnostic steps only" (correct — SSO sign-in failure is read-only)
```

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Tasks 1+2 | fe84c69 | feat(116-03): EEE retrofit macOS L1 batch (RE-011..016, RE-036..038) |
| Task 3 | 29b9321 | fix(116-03): D-05 blockquote compliance, C17 exit 0, registry Approved |

## Deviations from Plan

### Tasks 1+2 Committed Together

**Found during:** Task 1 execution
**Issue:** The retrofit helper writes a `[FILL-IN: >=30 words, opens with the tier scope/safety banner]` placeholder for `## Summary`. Committing the mechanical transform before the Summary prose would produce 9 files with a literal `[FILL-IN]` placeholder in the Summary section — a state that would fail C17 assertion #5 (≥30 words) and would never be the intended final state.
**Fix:** Combined Tasks 1+2 into a single commit (fe84c69) that includes both the helper-written structure and the hand-authored Summary prose. This mirrors the 116-01 precedent (inline --self-test). Tasks 1 and 2 acceptance criteria are fully satisfied by this commit.
**Behavioral impact:** None — identical to the two-commit plan outcome; no reviewer-visible intermediate state is lost.

### D-05 Em-Dash Clause Split (Tasks 1+3 intersection)

**Found during:** Task 3 D-05 measurement
**Issue:** "After completing Path B" and "After completing Path C" notes in RE-038 each contain a first sentence (S1) that is a single atomic sentence over 200c (≈216c and ≈202c respectively). S1 has the form "…destroys the Secure Enclave key binding that Platform SSO uses for Entra authentication — this is expected macOS behavior, not a bug." The em-dash creates a clause boundary.
**Fix:** Split at the em-dash keeping it at the end of Group 1 (e.g., "…Entra authentication —") and starting Group 2 with the clause continuation ("this is expected macOS behavior, not a bug."). All words preserved. Each resulting group ≤200c. D-05 measurement confirmed 0 over-limit groups after fix.
**Files modified:** docs/l1-runbooks/37-macos-local-password-reset.md (lines 115, 144)

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. All changes are Markdown content edits.

T-116-01 (write-path tampering): mitigated — helper path allowlist enforced, C17 gate passed before registry flip.
T-116-02 (false read-only banner for state-changing runbooks): mitigated — RE-037 and RE-038 carry tailored banners confirmed via grep; false "read-only L1 diagnostic steps only" claim absent from both files.
T-116-03 (D-05 content loss during splits): mitigated — all 5 blockquotes fixed via word-preserving Transform A or Transform B; D-05 measurement confirms 0 over-limit groups; no words removed.

## Self-Check

### Files Modified

- docs/l1-runbooks/10-macos-device-not-appearing.md ... FOUND
- docs/l1-runbooks/11-macos-setup-assistant-failed.md ... FOUND
- docs/l1-runbooks/12-macos-profile-not-applied.md ... FOUND
- docs/l1-runbooks/13-macos-app-not-installed.md ... FOUND
- docs/l1-runbooks/14-macos-compliance-access-blocked.md ... FOUND
- docs/l1-runbooks/15-macos-company-portal-sign-in.md ... FOUND
- docs/l1-runbooks/35-macos-sso-sign-in-failure.md ... FOUND
- docs/l1-runbooks/36-macos-secure-enclave-key.md ... FOUND
- docs/l1-runbooks/37-macos-local-password-reset.md ... FOUND
- docs/_registry/RE-index.md ... FOUND

### Commits

- fe84c69 ... FOUND
- 29b9321 ... FOUND
