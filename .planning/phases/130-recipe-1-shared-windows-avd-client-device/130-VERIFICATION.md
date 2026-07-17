---
phase: 130-recipe-1-shared-windows-avd-client-device
verified: 2026-07-17T20:04:01Z
status: passed
score: 11/11 must-haves verified
overrides_applied: 0
---

# Phase 130: Recipe #1 — Shared Windows AVD-Client Device Verification Report

**Phase Goal:** An Intune admin can follow a complete recipe to provision a self-deploying, Entra-joined shared Windows device running Windows App as an AVD client, covering both major configuration forks and the highest-cost pitfalls.
**Verified:** 2026-07-17T20:04:01Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (ROADMAP Success Criteria SC1-SC5 + PLAN must_haves)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| SC1 | Recipe walks linear happy path: self-deploying profile → device-phase ESP → dynamic group → Windows App (Store, Required, device-context) → feed/workspace subscription → verification, no forward references | ✓ VERIFIED | `docs/recipes/01-shared-windows-avd-client.md` Steps 1-4 (dynamic group L50, deployment profile L60, ESP L69, Windows App L78) are in dependency-safe order — Step 1 creates the group Steps 2/3/4 all reference. Confirmed by code-review WR-01 fix commit `28a3c965` ("reorder recipe so dynamic device group is created before it's referenced") and by reading the delivered file: Step 1 group → Step 2 profile assigned to Step-1 group → Step 3 ESP assigned to same group → Step 4 Windows App assigned to same group. Feed-subscription fact stated inline at L89. `## Verification` H2 present at L206. |
| SC2 | Kiosk (Assigned Access) and Shared PC (SharedPC CSP) branches both worked as complete step-by-step paths under one `## Steps` H2, with Shell-Launcher/Assigned-Access mutual-exclusion stated | ✓ VERIFIED | `### Step 5a: Kiosk configuration` (L114) and `### Step 5b: Shared PC configuration` (L145), both non-converging, both fully worked (GUI paths, CSP tables, callouts). Mutual-exclusion statement at L123: "a device cannot set both `KioskModeApp` and `ShellLauncher` at the same time." |
| SC3 | Four highest-cost anti-features called out explicitly (hybrid Entra join, APv2/Device Preparation, Wi-Fi at OOBE, retired MSRDC) | ✓ VERIFIED | `## Unsupported and Anti-Feature Callouts` table (L39-46) has exactly 4 body rows in the specified order; `grep -c` confirms 4 rows, MSRDC date `2026-03-27` appears exactly once, Wi-Fi row Feature cell contains both "supported" and "anti-pattern". |
| SC4 | Session-hygiene/patch-cadence decision points documented (session-reset, InactiveThreshold, kiosk-tuned update ring); wired-vs-Wi-Fi cross-links 802.1X corpus without duplicating it | ✓ VERIFIED | Session-reset STD-05 decision block Step 4 (L93-103, `[ASSUMED]`-flagged field names); `InactiveThreshold` nested under DeletionPolicy=2 arm only, Step 5b (L187-189, 0-60 day bound stated); Step 6 (L191-198) states both branches' distinct update-ring CSPs (`MaintenanceStartTime` vs `ScheduleForceRestartForUpdateFailures`); Step 7 (L200-204) links `admin-setup-8021x/03-windows.md` + `00-overview.md`, states "This recipe never configures 802.1X directly" — no inlined 802.1X config found. |
| SC5 | RE-084's "Wi-Fi unsupported for self-deploying" claim independently re-verified and corrected, `last_verified` updated | ✓ VERIFIED | `docs/admin-setup-apv1/08-self-deploying.md` frontmatter `last_verified: 2026-07-17`, `review_by: 2026-10-15`. Grep for stale claims (`Wi-Fi is NOT supported`, `pre-authentication stage`, `cannot reach the Autopilot`) returns zero matches. Version-History row dated 2026-07-17 documents the HYG-04 correction. First-party verification evidence (two Learn URLs + quotes) recorded in 130-01-SUMMARY.md. |
| T1 (130-01) | RE-084 states Wi-Fi is SUPPORTED (not zero-touch) at every former stale site; fabricated pre-auth mechanism removed; Ethernet-recommended guidance preserved | ✓ VERIFIED | All 6 sites (L31/55/61/63/69, L108-row-removed) confirmed by direct read + grep; Ethernet-recommended language present at L31/55/63/69. |
| T2 (130-01) | C17 self-test and full-corpus exit 0 with edited RE-084 | ✓ VERIFIED | Ran independently: self-test 4/4 passed; full-corpus 231 files, 0 violations. |
| T3 (130-02) | `docs/recipes/01-shared-windows-avd-client.md` exists, carries `doc_id: RE-222`, C17-enrolled and green, ≥150 lines | ✓ VERIFIED | File exists, 242 lines, frontmatter `doc_id: RE-222`, `status: Draft`. C17 full-corpus run (231 files incl. this one) reports 0 violations. |
| T4 (130-02) | Every in-doc `#fragment` link resolves against the file's own GitHub-exact slugified headings (D-LOCK-3 double-hyphen trap) | ✓ VERIFIED | Ran the anchor-resolution gate independently (mirrors `check-nav-hub-links.mjs` slugify logic): 17 headings found, all `#fragment` links resolve, zero unresolved anchors, including the `step-7-wired-vs-wi-fi-network-access-post-enrollment` double-hyphen-trap-prone slug. |
| T5 (130-02) | `## Unsupported and Anti-Feature Callouts` carries exactly 4 rows, Wi-Fi row qualified | ✓ VERIFIED | Confirmed by direct read + grep count = 4 rows in locked order. |
| T6 (130-02) | Configuration-Caused Failures routes only to in-recipe anchors or existing refs — no fabricated runbook links | ✓ VERIFIED | 6 rows, all Runbook cells route to `#step-4-...`, `#step-5a-...`, `#step-5b-...`, or `../admin-setup-apv1/04-dynamic-groups.md`; `grep -iE '\]\([^)]*runbook[^)]*\)'` returns zero matches. |

**Score:** 11/11 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/admin-setup-apv1/08-self-deploying.md` | Corrected Wi-Fi-at-OOBE framing, HYG-04 | ✓ VERIFIED | 131 lines; all 6 sites corrected; frontmatter dates bumped; Version-History row appended; contains "supported" adjacent to Wi-Fi in two-stage framing. |
| `docs/recipes/01-shared-windows-avd-client.md` | Shared Windows AVD-client provisioning recipe, RE-222 | ✓ VERIFIED | 242 lines (≥150 min); contains `## Unsupported and Anti-Feature Callouts`; all 7 H2 sections of the D-06 skeleton present exactly (Summary, Prerequisites, Unsupported and Anti-Feature Callouts, Steps, Verification, Configuration-Caused Failures, See Also); no extra H2s. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| Recipe Prerequisites + anti-feature Wi-Fi row | `docs/admin-setup-apv1/08-self-deploying.md` (corrected RE-084) | relative markdown link | ✓ WIRED | Links present at L33, L43, L46; corrected content confirmed non-restated (no stray "supported"/"unsupported" near Wi-Fi outside the anti-feature table cell). |
| Recipe Step 1 | `docs/admin-setup-apv1/04-dynamic-groups.md` (RE-080) | link, ZTDId string not re-inlined | ✓ WIRED | Link at L58; `grep -c devicePhysicalIDs` = 0 confirms no re-inlined membership rule. |
| Recipe Step 7 (AVD-05 fork) | `docs/admin-setup-8021x/03-windows.md` + `00-overview.md` | boolean if/then cross-link | ✓ WIRED | Both links present at L204 and See Also (L241-242); no inline 802.1X CSP config found in the recipe body. |
| Step 5 decision-table Branch cells | `#step-5a-kiosk-configuration` / `#step-5b-shared-pc-configuration` | in-doc anchor | ✓ WIRED | Confirmed by independent anchor-resolution gate run (17 headings, all resolve, including these two). |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| AVD-01 | 130-02 | Linear happy-path recipe spine | ✓ SATISFIED | Steps 1-4 + Verification, ordered dependency-safe; REQUIREMENTS.md marks Complete. |
| AVD-02 | 130-02 | Kiosk vs. Shared PC dominant fork, both worked fully, mutual-exclusion stated | ✓ SATISFIED | Step 5a/5b both present and non-converging; mutual-exclusion statement L123. |
| AVD-03 | 130-02 | 4 anti-feature callouts | ✓ SATISFIED | Table confirmed exactly 4 rows, locked order. |
| AVD-04 | 130-02 | Session hygiene / patch cadence decision points | ✓ SATISFIED | Session-reset (Step 4), InactiveThreshold (Step 5b), update ring (Step 6) all present. |
| AVD-05 | 130-02 | Wired-vs-Wi-Fi cross-links 802.1X corpus | ✓ SATISFIED | Step 7 boolean if/then, links only, no inline 802.1X config. |
| HYG-04 | 130-01 | RE-084 Wi-Fi claim re-verified/corrected | ✓ SATISFIED | 6 sites corrected, fabricated mechanism removed, freshness stamps + changelog updated. |

No orphaned requirements — REQUIREMENTS.md traceability table (lines 99-108) maps all six IDs to Phase 130 as Complete, matching what both plans' frontmatter `requirements:` fields declared (130-01: HYG-04; 130-02: AVD-01..05).

### Probe / Tooling Execution

| Check | Command | Result | Status |
|-------|---------|--------|--------|
| C17 self-test | `node scripts/validation/c17-eee-contract.mjs --self-test` | "Self-test: 4 passed, 0 failed" | PASS |
| C17 full-corpus | `node scripts/validation/c17-eee-contract.mjs --verbose` | "231 files checked, 0 with violations, 0 total violations" (all 13 assertions =0) | PASS |
| Anchor-resolution gate (independent re-run) | inline `node -e` mirroring `check-nav-hub-links.mjs` slugify | "in-doc anchors OK: 17 headings, all #fragment links resolve" | PASS |
| Stale Wi-Fi claim grep | `grep -nE 'NOT supported.*Wi-Fi\|...pre-authentication stage\|cannot reach the Autopilot'` on RE-084 | zero matches | PASS |
| Debt-marker scan | `grep -nE 'TBD\|FIXME\|XXX\|TODO\|HACK\|PLACEHOLDER'` on both files | zero matches | PASS |
| Commit existence | `git log` for all 5 claimed commit hashes | all 5 found (b4dcfd3f, 54856ffe, aaeb4582, 5889c01a, d352c2e6) plus WR-01 fix commit 28a3c965 | PASS |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `docs/recipes/01-shared-windows-avd-client.md` | L195 | Kiosk maintenance CSP node (`ApplicationManagement/ScheduleForceRestartForUpdateFailures`) asserted flatly, without an `[ASSUMED]` flag comparable to sibling session-reset/AUMID claims (code-review IN-01, unresolved) | ℹ️ Info | Does not block SC4 (the decision point is documented); a confidence-flag consistency nit, not a missing artifact. |
| `docs/recipes/01-shared-windows-avd-client.md` | L138 | `Azure/WindowsAppKiosk` repo path unverified as an optional advanced pointer (code-review IN-02, unresolved) | ℹ️ Info | Plain text, not a clickable broken link; low impact, does not block goal achievement. |
| `docs/admin-setup-apv1/08-self-deploying.md` | L63 | "See Step 2 above for the full prerequisite list" is self-referential (the line sits inside Step 2 itself) and the full prerequisite list actually lives in the Prerequisites section, not Step 2 (code-review IN-03, unresolved) | ℹ️ Info | Minor cross-reference wording defect predating this phase's scope of the specific sentence; does not block HYG-04 (the Wi-Fi claim itself is correctly framed). |
| `docs/recipes/01-shared-windows-avd-client.md` | L188-189 | SharedPC inactive-threshold "0-60 day" range asserted without confidence flag, unverified against Microsoft Learn per code-review (IN-04, unresolved) | ℹ️ Info | Does not block SC4 (InactiveThreshold decision point is documented and nested correctly); a numeric-detail confidence gap. |

None of these are Critical or Warning-level per the phase's own adversarial code review (`130-REVIEW.md`), which classified them as Info. The one Warning-level finding (WR-01, dynamic-group sequencing) was fixed in commit `28a3c965` and independently re-confirmed above (Step 1 now creates the group before any step references it). `130-REVIEW.md`'s frontmatter (`status: issues_found`) was not updated after the WR-01 fix commit landed, but the fix is present and verifiable directly in the delivered file — this is a stale review-doc metadata artifact, not evidence the phase goal is unmet.

### Human Verification Required

None. This is a documentation-only phase; the deliberately deferred `[ASSUMED]` author-time-verify flags (session-reset Settings Catalog field names, exact Windows App AUMID, offline-license inference, console-not-RDP caveat) are an intentional, surgical confidence-flag policy stated explicitly in the recipe and 130-02-SUMMARY.md — not gaps requiring human sign-off before this phase can be considered complete. The Phase-132 registry-row/status-flip and `docs/index.md` nav wiring are explicitly out of scope for Phase 130 (CLASS-03, deferred by design). The absence of a dedicated AVD troubleshooting runbook is flagged in the SUMMARY as a candidate future phase, not a Phase-130 gap.

### Gaps Summary

No gaps. All 5 ROADMAP success criteria and all 11 PLAN-frontmatter must-have truths are verified directly against the delivered files (not merely against SUMMARY.md claims). All 6 requirement IDs (AVD-01 through AVD-05, HYG-04) are satisfied and traced in REQUIREMENTS.md with no orphans. C17 self-test (4/4) and full-corpus (231 files, 0 violations) both pass on independent re-run. The in-doc anchor-resolution gate was independently re-run (not merely trusted from SUMMARY) and confirms 17/17 headings resolve with zero unresolved `#fragment` links. The one Warning-level code-review finding (WR-01) was fixed and independently confirmed fixed in the current file content. Four Info-level code-review findings remain open but are cosmetic/confidence-flag consistency items that do not block any of SC1-SC5 or any of the 6 requirement IDs.

---

_Verified: 2026-07-17T20:04:01Z_
_Verifier: Claude (gsd-verifier)_
