# Phase 97: Deferred Items

## Pre-existing chain failure: check-phase-66

**Discovered during:** Phase 97 chain regression gate check
**Scope:** OUT OF SCOPE for Phase 97 — pre-existing failure

**Description:** `node scripts/validation/check-phase-95.mjs` reports `49 PASS, 1 FAIL` — the 1 FAIL is `V-95-CHAIN-66` (check-phase-66.mjs exits non-0).

**Why this is pre-existing (not a Phase 97 regression):**
- `grep -n "enrollment-profile\|configuration-profiles\|REQUIREMENTS" scripts/validation/check-phase-66.mjs` returns no matches — check-phase-66 does not reference any Phase 97-modified file.
- check-phase-66 tests v1.6 audit-harness infrastructure files: `v1.6-milestone-audit.mjs` (V-66-01, V-66-04, V-66-ABAUDIT-STALENESS), `v1.6-audit-allowlist.json` (V-66-02), `regenerate-supervision-pins.mjs` (V-66-03), `.github/workflows/audit-harness-v1.6-integrity.yml` (V-66-05), `.planning/milestones/v1.6-MILESTONE-AUDIT.md` (V-66-06), `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (V-66-07), and ABAUDIT comment count (V-66-ABAUDIT-STALENESS).
- Phase 97 modified: `docs/admin-setup-macos/02-enrollment-profile.md` (version-history row), `docs/admin-setup-macos/03-configuration-profiles.md` (version-history row), `.planning/REQUIREMENTS.md` (checkbox flips), and created `.planning/phases/97-enrollment-filevault-depth-formalization/97-NEEDLE-SPEC.md`. None of these overlap with check-phase-66's targets.
- `v1.6-DEFERRED-CLEANUP.md` lines 97/106 document pre-existing v1.6-era CRLF + archive-path validator failures in the check-phase-62..66 range.

**Recommendation:** Investigate and fix at Phase 100 (harness lineage bump phase) if the check-phase-66 failure is not already catalogued in v1.13-DEFERRED-CLEANUP.md.

**Chain regression for Phase 97 purposes:** NO regression. Chains 48-65 (PASS), 67-94 (PASS), v1.12-milestone-audit (PASS), SELF (PASS). check-phase-81 E7 anchor verified directly (9/9 PASS).
