---
phase: 91-glossary-capability-matrix
verified: 2026-06-24T23:30:00Z
status: passed
score: 14/14
overrides_applied: 0
re_verification: false
---

# Phase 91: Glossary + Capability Matrix Verification Report

**Phase Goal:** The macOS glossary captures the new MDM-migration terminology, the capability matrix documents in-place migration coverage, and all harness blob-hash coupling constraints are satisfied atomically.
**Verified:** 2026-06-24T23:30:00Z
**Status:** passed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 10 inbound anchors from guide-02 lines 541-550 resolve to a heading in `_glossary-macos.md` (9 newly minted + `#platform-sso` pre-existing) | VERIFIED | All 9 headings confirmed present: `### MDM Migration`, `### Assign Device Management`, `### Deadline`, `### Kandji-Iru`, `### Delete Device Record`, `### FileVault Recovery Key`, `### Activation Lock Bypass`, `### Profile-Based Enrollment`, `### ACME`, `### app-sso`; `### Platform SSO` was pre-existing and untouched |
| 2 | `### Kandji-Iru` heading slugifies to single-hyphen `#kandji-iru` (NOT `#kandji--iru`) | VERIFIED | `grep -n '### Kandji-Iru' docs/_glossary-macos.md` → line 112: `### Kandji-Iru`; no `### Kandji / Iru` present; GitHub slug algorithm on bare dash = single-hyphen confirmed |
| 3 | No new `## Migration` H2 anywhere in the glossary family; all 9 entries attach to existing H2s | VERIFIED | `grep '## Migration' docs/_glossary-macos.md` → no matches; entries attach to `## Device Management` (7 entries), `## Enrollment` (2 entries), `## Authentication` (1 entry) |
| 4 | `_glossary.md#tenant-migration` has a reciprocal `> See also:` link to `_glossary-macos.md#mdm-migration` | VERIFIED | Line 125: `> See also: [MDM Migration](_glossary-macos.md#mdm-migration) (macOS -- wipe-free in-place re-enrollment on macOS 26+, distinct from Windows tenant migration which requires a full device reset).` |
| 5 | No glossary text asserts same-tenant Secure Enclave key survival; PSSO re-registration described as always required post-migration | VERIFIED | `grep -ni "key surviv\|enclave surviv\|same.tenant.*key"` → no matches. PSSO re-registration always required appears in both `### MDM Migration` (line 96) and `### Profile-Based Enrollment` (line 60) entries |
| 6 | A pre-edit anchor-inventory artifact exists committed in its own commit BEFORE any edit to `macos-capability-matrix.md` or `4-platform-capability-comparison.md` | VERIFIED | `.planning/phases/91-glossary-capability-matrix/91-ANCHOR-INVENTORY.md` exists. Commit `40a4cdd` (unix 1782360032, 23:00:32) precedes matrix-edit commit `7039630` (unix 1782360421, 23:07:01). `git show --name-only 40a4cdd` lists ONLY `91-ANCHOR-INVENTORY.md` — no matrix or validator files |
| 7 | The recorded pre-edit blob hashes match V-63-08 (`73f16378...`) and V-63-09 (`2314ede7...`) | VERIFIED | `91-ANCHOR-INVENTORY.md` records File 1 hash `73f16378197223378a8507a6751c763902de58db` and File 2 hash `2314ede7be54efbea1d4a4a787068310869a5896`, both matching the V-63-08/V-63-09 pre-edit baselines |
| 8 | `macos-capability-matrix.md` has one new row under `## Enrollment` with Windows cell `n/a` and macOS cell carrying all coverage facts (OS-26 ABM migration + Deadline + pre-26 wipe fallback + PSSO re-registration always required) | VERIFIED | Line 27: `\| macOS 26 in-place ABM migration \| n/a \| Supported (profile-based re-enrollment, wipe-free; PSSO re-registration always required post-migration; pre-macOS-26 devices use wipe-and-re-enroll fallback) — see [MDM Migration Walkthrough](...) \|` |
| 9 | `4-platform-capability-comparison.md` has one dedicated migration row under `## Enrollment`; macOS cell links to `macos-capability-matrix.md#enrollment`; all non-macOS cells are `n/a — [matrix](...#enrollment)` | VERIFIED | Line 33: `\| macOS 26 in-place ABM migration \| n/a — [matrix](linux-capability-matrix.md#enrollment) \| Supported — [matrix](macos-capability-matrix.md#enrollment) \| n/a — [matrix](ios-capability-matrix.md#enrollment) \| n/a — [matrix](android-capability-matrix.md#enrollment) \| n/a — [matrix](linux-capability-matrix.md#enrollment) \|` |
| 10 | The atomic commit that edits `macos-capability-matrix.md` also updates V-63-08 `const BASELINE` in `check-phase-63.mjs` in the SAME commit | VERIFIED | `git show --name-only 7039630` lists exactly: `docs/reference/4-platform-capability-comparison.md`, `docs/reference/macos-capability-matrix.md`, `scripts/validation/check-phase-63.mjs` — all three in one commit |
| 11 | `node scripts/validation/check-phase-63.mjs` exits 0 with V-63-08 PASS and V-63-09 PASS | VERIFIED | `[8/32] V-63-08: ... PASS`, `[9/32] V-63-09: ... PASS`, `Result: 32 PASS, 0 FAIL, 0 SKIPPED` |
| 12 | `git hash-object` of each pinned file equals its in-validator BASELINE | VERIFIED | `git hash-object docs/reference/macos-capability-matrix.md` → `732588a57fd762c294400a4f6fd9a065c974216c` = V-63-08 `const BASELINE`; `git hash-object docs/reference/4-platform-capability-comparison.md` → `8dc79613922450a00c9a6bb40279a1e65a44390a` = V-63-09 `const BASELINE` |
| 13 | No same-tenant Secure Enclave key-survival claim in either matrix; PSSO re-registration documented as ALWAYS required | VERIFIED | `grep -ni "key surviv\|enclave surviv\|same.tenant.*key"` on both matrix files → no matches. Matrix macOS cell explicitly states "PSSO re-registration always required post-migration" |
| 14 | Both "Kandji" and "Iru" surfaced in the glossary entry | VERIFIED | `### Kandji-Iru` entry line 114: "macOS MDM platform rebranded from Kandji to Iru in October 2025. Both names refer to the same product; this documentation uses 'Kandji/Iru' throughout... The support portal URL is unchanged: support.kandji.io." |

**Score:** 14/14 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/_glossary-macos.md` | 9 new `###` entries + Alphabetical Index updates + Version History row; contains `### Kandji-Iru` | VERIFIED | All 9 entries present under correct H2s; index updated with all 10 display names in alpha order; Version History row appended dated 2026-06-24; frontmatter `last_verified: 2026-06-24`, `review_by: 2026-09-24` |
| `docs/_glossary.md` | Reciprocal `> See also:` on `### Tenant migration` + Version History row; contains `_glossary-macos.md#mdm-migration` | VERIFIED | Line 125 contains bare `> See also:` blockquote pointing to `_glossary-macos.md#mdm-migration`; Version History row at line 246; existing prose and `device-operations/04-tenant-migration.md` link unchanged |
| `.planning/phases/91-glossary-capability-matrix/91-ANCHOR-INVENTORY.md` | Pre-edit anchor-stability surface; contains `## File 1: docs/reference/macos-capability-matrix.md` | VERIFIED | File exists; contains `## File 1` and `## File 2` sections with pre-edit SHA + blob hash + verbatim H2 lists + permitted-edits scope for both pinned files |
| `docs/reference/macos-capability-matrix.md` | macOS 26 in-place ABM migration row under `## Enrollment`; contains `macOS 26 in-place ABM migration` | VERIFIED | Row at line 27 under `## Enrollment`; Windows cell = `n/a`; macOS cell carries all required coverage facts |
| `docs/reference/4-platform-capability-comparison.md` | Dedicated migration row under `## Enrollment`; link-not-copy to matrix; contains `macOS 26 in-place ABM migration` | VERIFIED | Row at line 33; macOS cell links to `macos-capability-matrix.md#enrollment`; all non-macOS cells use `n/a — [matrix](...#enrollment)` form |
| `scripts/validation/check-phase-63.mjs` | Updated V-63-08 + V-63-09 BASELINE blob hashes; contains `const BASELINE` | VERIFIED | V-63-08 `const BASELINE = '732588a57fd762c294400a4f6fd9a065c974216c'`; V-63-09 `const BASELINE = '8dc79613922450a00c9a6bb40279a1e65a44390a'`; updated in same atomic commit as content edits |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `docs/macos-lifecycle/02-mdm-migration-psso.md` lines 541-550 | `docs/_glossary-macos.md` headings | inbound anchor links `#assign-device-management`, `#deadline`, `#filevault-recovery-key`, `#activation-lock-bypass`, `#acme`, `#profile-based-enrollment`, `#kandji-iru`, `#platform-sso`, `#app-sso`, `#delete-device-record` | WIRED | All 9 newly-minted headings produce slugs matching the guide-02 anchor targets; `#platform-sso` was pre-existing |
| `docs/_glossary.md#tenant-migration` | `docs/_glossary-macos.md#mdm-migration` | `> See also:` blockquote line | WIRED | Line 125 of `_glossary.md` contains the bare `> See also:` blockquote with `_glossary-macos.md#mdm-migration` |
| `docs/reference/4-platform-capability-comparison.md` (macOS cell) | `docs/reference/macos-capability-matrix.md#enrollment` | `[matrix](macos-capability-matrix.md#enrollment)` link | WIRED | Line 33 macOS cell: `Supported — [matrix](macos-capability-matrix.md#enrollment)` — targets stable pre-existing `## Enrollment` anchor |
| `scripts/validation/check-phase-63.mjs` V-63-08 BASELINE | post-edit `git hash-object docs/reference/macos-capability-matrix.md` | same-commit atomic BASELINE update | WIRED | `git hash-object` = `732588a5...` = V-63-08 `const BASELINE`; both in commit `7039630` |
| `scripts/validation/check-phase-63.mjs` V-63-09 BASELINE | post-edit `git hash-object docs/reference/4-platform-capability-comparison.md` | same-commit atomic BASELINE update | WIRED | `git hash-object` = `8dc79613...` = V-63-09 `const BASELINE`; both in commit `7039630` |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| check-phase-63.mjs exits 0, V-63-08 PASS, V-63-09 PASS | `node scripts/validation/check-phase-63.mjs` | `[8/32] V-63-08: ... PASS`, `[9/32] V-63-09: ... PASS`, `Result: 32 PASS, 0 FAIL, 0 SKIPPED`, exit 0 | PASS |
| `git hash-object` of `macos-capability-matrix.md` matches V-63-08 BASELINE | `git hash-object docs/reference/macos-capability-matrix.md` | `732588a57fd762c294400a4f6fd9a065c974216c` (matches `const BASELINE`) | PASS |
| `git hash-object` of `4-platform-capability-comparison.md` matches V-63-09 BASELINE | `git hash-object docs/reference/4-platform-capability-comparison.md` | `8dc79613922450a00c9a6bb40279a1e65a44390a` (matches `const BASELINE`) | PASS |
| Inventory commit precedes matrix-edit commit and touches only the inventory file | `git show --name-only 40a4cdd` + timestamp comparison | `40a4cdd` (23:00:32) < `7039630` (23:07:01); only `.planning/phases/91-glossary-capability-matrix/91-ANCHOR-INVENTORY.md` listed | PASS |
| Atomic commit lists exactly 3 files (no split) | `git show --name-only 7039630` | `docs/reference/4-platform-capability-comparison.md`, `docs/reference/macos-capability-matrix.md`, `scripts/validation/check-phase-63.mjs` | PASS |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|---------|
| REF-01 | 91-01-PLAN.md | `_glossary-macos.md` + reciprocal `_glossary.md` see-also gain MDM Migration, Assign Device Management, Deadline entries, plus Kandji→Iru rebrand note | SATISFIED | All 4 named items plus 6 additional dead-anchor entries minted (D-06 scope expansion); reciprocal see-also wired; both files' version history and freshness stamps updated |
| REF-02 | 91-02-PLAN.md, 91-03-PLAN.md | `macos-capability-matrix.md` migration row under pre-edit anchor-inventory convention, atomic V-63-08 pin; `4-platform-capability-comparison.md` link-not-copy, atomic V-63-09 pin | SATISFIED | Pre-edit inventory committed first (ordering verified); matrix rows appended; blob hashes pinned in single atomic commit; validator green |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (none) | — | No TBD/FIXME/XXX/TODO/PLACEHOLDER markers found in any phase-modified file | — | — |

Anti-pattern scan ran across: `docs/_glossary-macos.md`, `docs/_glossary.md`, `docs/reference/macos-capability-matrix.md`, `docs/reference/4-platform-capability-comparison.md`, `scripts/validation/check-phase-63.mjs`. Zero matches.

---

### Human Verification Required

None. All must-haves are mechanically verifiable and verified. The phase is documentation-only with no UI, no real-time behavior, and no external service integration.

---

### Gaps Summary

No gaps. All 14 must-haves verified against the actual codebase. Phase goal achieved.

---

## Detailed Verification Notes

### REF-01: Glossary — Anchor Fidelity Deep-Check

The load-bearing slug landmine (`### Kandji-Iru` vs `### Kandji / Iru`) was verified directly: heading at line 112 is `### Kandji-Iru` (bare hyphen). GitHub's slug algorithm for a bare hyphen heading produces `#kandji-iru` (single hyphen), matching guide-02 line 547's committed anchor target `..._glossary-macos.md#kandji-iru`. The double-hyphen hazard (`### Kandji / Iru` → `#kandji--iru`) is absent.

Similarly, `### app-sso` at line 202 produces slug `#app-sso`, matching guide-02 line 549's target `..._glossary-macos.md#app-sso`. The forbidden form `### app-sso platform -s` is absent.

Guide-02 lines 541-550 were read directly. All 10 anchor targets map as follows:

| Guide-02 anchor | Glossary heading | Slug result | Match |
|-----------------|-----------------|-------------|-------|
| `#assign-device-management` | `### Assign Device Management` (L100) | `#assign-device-management` | MATCH |
| `#deadline` | `### Deadline` (L106) | `#deadline` | MATCH |
| `#filevault-recovery-key` | `### FileVault Recovery Key` (L124) | `#filevault-recovery-key` | MATCH |
| `#activation-lock-bypass` | `### Activation Lock Bypass` (L130) | `#activation-lock-bypass` | MATCH |
| `#acme` | `### ACME` (L64) | `#acme` | MATCH |
| `#profile-based-enrollment` | `### Profile-Based Enrollment` (L58) | `#profile-based-enrollment` | MATCH |
| `#kandji-iru` | `### Kandji-Iru` (L112) | `#kandji-iru` | MATCH (single hyphen) |
| `#platform-sso` | `### Platform SSO` (L177, pre-existing) | `#platform-sso` | MATCH (untouched) |
| `#app-sso` | `### app-sso` (L202) | `#app-sso` | MATCH |
| `#delete-device-record` | `### Delete Device Record` (L118) | `#delete-device-record` | MATCH |

Additionally, `#mdm-migration` from REF-01: `### MDM Migration` (L94) → `#mdm-migration`. MATCH.

### REF-01: Alphabetical Index

Index at line 17 contains all 10 new display names in correct alpha order:
- ACME (before ADE) ✓
- Activation Lock Bypass (before ADE) ✓
- app-sso (before APNs) ✓
- Assign Device Management (before Await Configuration) ✓
- Deadline (after ADE, before Delete) ✓
- Delete Device Record (after Deadline) ✓
- FileVault Recovery Key (after Enterprise SSO Plug-in) ✓
- Kandji-Iru (after Kerberos SSO Extension) ✓ (Note: Kerberos before Kandji — verified K-a < K-e alphabetically)
- MDM Migration (after MAM-WE) ✓
- Profile-Based Enrollment (after Platform SSO) ✓

### REF-02: Atomicity Invariant

The critical atomicity constraint (D-05, locked) is satisfied: commit `7039630` contains exactly `docs/reference/macos-capability-matrix.md`, `docs/reference/4-platform-capability-comparison.md`, and `scripts/validation/check-phase-63.mjs` — no split across commits. The PITFALL-2 (split commit = red HEAD at intermediate boundary) is avoided.

### REF-02: Ordering Invariant

Inventory commit `40a4cdd` (timestamp 1782360032) precedes matrix-edit commit `7039630` (timestamp 1782360421) — ordering invariant satisfied per PITFALL-5. The inventory commit touches ONLY `91-ANCHOR-INVENTORY.md`; the matrix files and validator are not staged in it.

### Factual Landmine Check

- No same-tenant Secure Enclave key-survival claim: confirmed absent from `_glossary-macos.md`, `macos-capability-matrix.md`, `4-platform-capability-comparison.md`.
- PSSO re-registration documented as ALWAYS required: explicitly stated in `### MDM Migration` entry ("PSSO re-registration is always required post-migration regardless of path"), in `### Profile-Based Enrollment` ("PSSO re-registration is always required after migration"), and in the matrix macOS cell ("PSSO re-registration always required post-migration").
- Both "Kandji" and "Iru" surfaced: `### Kandji-Iru` heading, body prose names both, October 2025 rebrand date, support portal URL `support.kandji.io` — all present.

---

_Verified: 2026-06-24T23:30:00Z_
_Verifier: Claude (gsd-verifier)_
