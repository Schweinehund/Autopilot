---
phase: 96-surgical-conflict-fixes
verified: 2026-06-28T00:00:00Z
status: passed
score: 4/4 must-haves verified
overrides_applied: 0
re_verification: null
gaps: []
deferred: []
human_verification: []
---

# Phase 96: Surgical Conflict Fixes — Verification Report

**Phase Goal:** The three verified factual conflicts in shipped docs are corrected and the Iru glossary URL is updated — readers no longer encounter the VPP-on-macOS-Company-Portal error, the device-vs-user-group contradiction in guide 00, the wrong remediation in L1 runbook 15, or the stale Iru URL.
**Verified:** 2026-06-28
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `00-ade-lifecycle.md` no longer describes Company Portal as VPP/Apps-and-Books deployable at Stage-4/Stage-6 (~lines 309/319/411); Stage-4-vs-Stage-6 self-contradiction removed | VERIFIED | "recommended deployment method is through VPP" = 0 matches; "can be deployed via [VPP]" = 0 matches; VPP Stage-6 quick-ref row = 0 matches; line 309 now reads PKG/LOB via IME; line 319 now reads PKG/LOB as macOS method; line 326 "iOS/iPadOS only" exemplar untouched |
| 2 | `00-ade-lifecycle.md` (~line 250) states SSO-extension policy is assigned to a static user group (not device group) | VERIFIED | "static user group" present at line 250; "static device group" = 0 matches |
| 3 | `15-macos-company-portal-sign-in.md` (~line 30) step-4 remediation directs user-affinity devices to a user-group assignment (not device group) | VERIFIED | "for this user's group" present at line 30; "to the user group" present at line 30; "for this device's group" = 0 matches; "to the device group" = 0 matches |
| 4 | `_glossary-macos.md` Kandji-Iru entry lists all three URLs with durable roles; "URL is unchanged" sentence gone; `### Kandji-Iru` heading intact | VERIFIED | "support.iru.io" present; "support.kandji.io" present; "docs.iru.com" present; "URL is unchanged" = 0 matches; "### Kandji-Iru" heading present at line 112 |

**Score:** 4/4 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/macos-lifecycle/00-ade-lifecycle.md` | Stage-6 PKG/LOB prose; no VPP quick-ref row; Stage-4 user group; stamps 2026-06-28/2026-09-28; Phase 96 version-history row | VERIFIED | All edits confirmed in file. `last_verified: 2026-06-28`, `review_by: 2026-09-28`. Version-history row "2026-06-28 | Phase 96 (ACC-01, ACC-02)..." present. |
| `docs/l1-runbooks/15-macos-company-portal-sign-in.md` | Step-4 user-group phrasing (both occurrences); stamps 2026-06-28/2026-09-28; Phase 96 version-history row | VERIFIED | Both phrases corrected. `last_verified: 2026-06-28`, `review_by: 2026-09-28`. Version-history row "2026-06-28 | Phase 96 (ACC-04)..." present. |
| `docs/_glossary-macos.md` | 3-URL Kandji-Iru role statement; "URL is unchanged" gone; `### Kandji-Iru` heading intact; `### VPP` untouched; stamps 2026-06-28/2026-09-28; Phase 96 version-history row | VERIFIED | All three URLs present. Stale sentence absent. Heading intact. VPP definition untouched. Stamps correct. Version-history row present. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `00-ade-lifecycle.md` Stage-6 lines 309/319 | line 326 exemplar ("never via VPP … iOS/iPadOS only") | consistent PKG/LOB-never-VPP framing | VERIFIED | Lines 309 and 319 now use PKG/LOB/IME phrasing matching the exemplar at line 326; exemplar untouched |
| `00-ade-lifecycle.md` Stage-4 line 250 | SSO-extension user-affinity model | "must be assigned to a static user group" | VERIFIED | Line 250 confirmed: "...must be assigned to a static user group and delivered before the device reaches the Entra credential screen..." |
| `15-macos-company-portal-sign-in.md` step 4 | User-affinity scope (preamble line ~13) | user-affinity registration requires user-targeted app assignment | VERIFIED | "for this user's group" and "to the user group" both present at line 30 |
| `_glossary-macos.md` Kandji-Iru entry | `02-mdm-migration-psso.md` line 553 3-URL summary | consistent role descriptions, caveat-free | VERIFIED | All three URLs present with matching roles; no dated caveats (0 matches for "HTTP 200", "verified 2026-06-26") |

---

### Guardrail Verification

| Guardrail | Expected | Status | Evidence |
|-----------|----------|--------|---------|
| `### VPP` definition in `_glossary-macos.md` | Present and untouched | VERIFIED | `### VPP` present at line 146; full definition intact |
| `docs/macos-lifecycle/02-mdm-migration-psso.md` | NOT modified by Phase 96 | VERIFIED | `git log` shows last commit to this file is `acdbdeb` (Phase 94 work); no Phase 96 commit touches it |
| `00-ade-lifecycle.md` line 326 exemplar ("iOS/iPadOS only") | Present and untouched | VERIFIED | "iOS/iPadOS only" = 1 match; line 326 text confirmed intact |
| `00-ade-lifecycle.md` line 382 See-Also ("VPP terminology with Windows equivalents") | Present and untouched | VERIFIED | "VPP terminology with Windows equivalents" = 1 match |
| All three edited files carry `last_verified: 2026-06-28` / `review_by: 2026-09-28` | +3-month invariant preserved | VERIFIED | All three frontmatters confirmed |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|---------|
| ACC-01 | 96-01-PLAN.md | `00-ade-lifecycle.md` describes Company Portal as PKG/LOB only, never VPP/Apps-and-Books; Stage-6 lines ~309/319 corrected; Stage-4-vs-Stage-6 self-contradiction removed | SATISFIED | Lines 309/319 rewritten; VPP quick-ref row removed; exemplar at 326 intact |
| ACC-02 | 96-01-PLAN.md | `00-ade-lifecycle.md` (~line 250) assigns SSO-extension policy to static user group (corrects "static device group") | SATISFIED | "static user group" at line 250; "static device group" = 0 matches |
| ACC-04 | 96-02-PLAN.md | `15-macos-company-portal-sign-in.md` (~line 30) corrects remediation to user-group assignment | SATISFIED | Both occurrences corrected at line 30 |
| GLOS-01 | 96-03-PLAN.md | `_glossary-macos.md` Iru/Kandji entry reflects 3-URL reality | SATISFIED | All three URLs present; stale sentence absent; heading/anchor intact |

No orphaned requirements: REQUIREMENTS.md traceability table maps ACC-01, ACC-02, ACC-04, GLOS-01 all to Phase 96 as Complete. The remaining requirements (ACC-03, TS-01..03, DEP-01..03, RUN-01, HARN-01..03) belong to Phases 97-100 and are out of scope for this phase.

---

### Commit Verification

| Plan | Commit | Description | Files |
|------|--------|-------------|-------|
| 96-01 Task 1 | `38c3850` | Stage-6 VPP→PKG/LOB rewrite + orphaned VPP row removal | `docs/macos-lifecycle/00-ade-lifecycle.md` |
| 96-01 Task 2 | `7756f16` | Stage-4 device→user group + stamps + version-history row | `docs/macos-lifecycle/00-ade-lifecycle.md` |
| 96-02 Task 1 | `5c6c2f0` | Runbook step-4 device→user group + stamps + version-history row | `docs/l1-runbooks/15-macos-company-portal-sign-in.md` |
| 96-03 Task 1 | `b70d028` | Kandji-Iru 3-URL replacement + stamps + version-history row | `docs/_glossary-macos.md` |

All four commits verified in `git log` with correct author, date (2026-06-28), and file scope.

---

### Anti-Patterns Found

No debt markers (TBD, FIXME, XXX), placeholder text, or stub patterns found in any of the three modified files.

---

### Behavioral Spot-Checks

Step 7b: SKIPPED — documentation-only phase; no runnable entry points to test.

### Probe Execution

Step 7c: SKIPPED — no probe scripts declared or applicable for a documentation-only phase.

---

### Human Verification Required

None. All success criteria are verifiable programmatically via grep against the live Markdown files.

---

## Summary

Phase 96 goal is fully achieved. All four ROADMAP Success Criteria are TRUE in the live codebase:

1. Guide 00 (`00-ade-lifecycle.md`) no longer contains VPP deployment claims for macOS Company Portal at Stage 6. Lines 309 and 319 now correctly describe PKG/LOB deployment via Intune with silent installation attributed to the Intune Management Extension. The orphaned VPP Glossary Quick Reference row is gone. Line 326 exemplar ("never distributed via Apple VPP / Apps and Books — iOS/iPadOS only") is untouched.

2. Guide 00 line 250 now reads "must be assigned to a static user group" — the "static device group" string is completely absent.

3. L1 runbook 15 step 4 now reads "for this user's group" and "to the user group" — both device-group phrases are completely absent.

4. The glossary Kandji-Iru entry now lists all three URLs with durable roles ("support.iru.io is the primary rebrand target; support.kandji.io is the legacy redirect / Iru-branded knowledge base; docs.iru.com is the authoritative public documentation source"). The stale "URL is unchanged" sentence is gone. The `### Kandji-Iru` heading is intact. The `### VPP` definition is untouched.

Guardrails held: guide 02 was not touched; VPP glossary definition preserved; line 326 exemplar and line 382 See-Also preserved; all three modified files carry `last_verified: 2026-06-28` / `review_by: 2026-09-28` with the +3-month invariant intact.

Requirements ACC-01, ACC-02, ACC-04, GLOS-01 are all marked Complete in REQUIREMENTS.md and confirmed satisfied in the live files.

---

_Verified: 2026-06-28_
_Verifier: Claude (gsd-verifier)_
