---
phase: 91-glossary-capability-matrix
plan: "01"
subsystem: docs/glossary
tags: [glossary, macos, mdm-migration, anchors, cross-reference]
dependency_graph:
  requires: [Phase 90 — docs/macos-lifecycle/02-mdm-migration-psso.md must exist]
  provides: [9 dead inbound anchors from guide-02 lines 541-550 now resolve; reciprocal see-also in _glossary.md]
  affects: [docs/_glossary-macos.md, docs/_glossary.md]
tech_stack:
  added: []
  patterns: [glossary entry anatomy, negative Windows-equivalent callout, bare See-also blockquote]
key_files:
  created: []
  modified:
    - docs/_glossary-macos.md
    - docs/_glossary.md
decisions:
  - "D-01: Kandji/Iru entry uses bare ### Kandji-Iru heading (single dash) — slugifies to #kandji-iru, not #kandji--iru (double hyphen from space-slash-space)"
  - "D-02: Migration-flow terms use explicit-negative Windows-equivalent callout; FileVault Recovery Key uses affirmative BitLocker parallel"
  - "D-06: All 9 dead inbound anchors minted (not just REF-01's 3)"
  - "app-sso entry uses bare ### app-sso heading — not '### app-sso platform -s' which would slug to #app-sso-platform--s"
metrics:
  duration: ~8m
  completed: 2026-06-24
  tasks_completed: 2
  files_modified: 2
---

# Phase 91 Plan 01: Mint 9 Glossary Entries + Reciprocal See-Also Summary

**One-liner:** Minted 9 dead-anchor glossary entries in `_glossary-macos.md` (MDM Migration, Assign Device Management, Deadline, Kandji-Iru, Delete Device Record, FileVault Recovery Key, Activation Lock Bypass, Profile-Based Enrollment, ACME, app-sso) and added reciprocal `> See also:` in `_glossary.md#tenant-migration`.

## What Was Built

### Task 1: `docs/_glossary-macos.md` — 9 new `###` entries + index + stamps

**Commit:** `84af848`

All 9 currently-dead inbound anchors from guide-02 (`02-mdm-migration-psso.md`) lines 541–550 now resolve to headings in `_glossary-macos.md`:

| Guide-02 anchor target | Heading minted | H2 placement |
|------------------------|----------------|--------------|
| `#mdm-migration` | `### MDM Migration` | `## Device Management` |
| `#assign-device-management` | `### Assign Device Management` | `## Device Management` |
| `#deadline` | `### Deadline` | `## Device Management` |
| `#kandji-iru` | `### Kandji-Iru` | `## Device Management` |
| `#delete-device-record` | `### Delete Device Record` | `## Device Management` |
| `#filevault-recovery-key` | `### FileVault Recovery Key` | `## Device Management` |
| `#activation-lock-bypass` | `### Activation Lock Bypass` | `## Device Management` |
| `#profile-based-enrollment` | `### Profile-Based Enrollment` | `## Enrollment` |
| `#acme` | `### ACME` | `## Enrollment` |
| `#app-sso` | `### app-sso` | `## Authentication` |

(`#platform-sso` already resolved — untouched per D-06.)

**Alphabetical Index (line 17):** Updated with all 10 new display names inserted in alpha order.

**Frontmatter:** `last_verified: 2026-06-24`, `review_by: 2026-09-24`

**Version History:** Row appended dated 2026-06-24.

### Task 2: `docs/_glossary.md` — reciprocal `> See also:` on `### Tenant migration`

**Commit:** `04746d3`

Added bare `> See also:` blockquote directly after the `### Tenant migration` prose, pointing to `_glossary-macos.md#mdm-migration` and noting the macOS wipe-free vs Windows full-reset distinction. Existing prose and `device-operations/04-tenant-migration.md` link are unchanged. Version History row appended. Frontmatter updated to `last_verified: 2026-06-24`, `review_by: 2026-09-24`.

## Verification Results

### Automated checks (from plan Task 1 `<verify>`):

```
grep -q '### Kandji-Iru'              ✓ PASS
! grep -q '### Kandji / Iru'          ✓ PASS (anti-pattern absent)
grep -q '### app-sso'                 ✓ PASS
! grep -q '### app-sso platform'      ✓ PASS (anti-pattern absent)
! grep -q '## Migration'              ✓ PASS (no new H2)
All 8 other required headings         ✓ PASS
```

### Automated checks (from plan Task 2 `<verify>`):
```
grep -q '_glossary-macos.md#mdm-migration'  ✓ PASS
grep -q '### Tenant migration'              ✓ PASS
```

### Manual slug verification (per RESEARCH.md Q2 table):

| Heading | Expected slug | Verified |
|---------|--------------|----------|
| `### MDM Migration` | `#mdm-migration` | ✓ (lowercase, spaces→hyphens) |
| `### Assign Device Management` | `#assign-device-management` | ✓ |
| `### Deadline` | `#deadline` | ✓ |
| `### Kandji-Iru` | `#kandji-iru` | ✓ (bare dash — NOT double-hyphen) |
| `### Delete Device Record` | `#delete-device-record` | ✓ |
| `### FileVault Recovery Key` | `#filevault-recovery-key` | ✓ (GitHub lowercases F,V) |
| `### Activation Lock Bypass` | `#activation-lock-bypass` | ✓ |
| `### Profile-Based Enrollment` | `#profile-based-enrollment` | ✓ (existing hyphen preserved) |
| `### ACME` | `#acme` | ✓ (GitHub lowercases all-caps) |
| `### app-sso` | `#app-sso` | ✓ (bare — no 'platform -s' suffix) |

### No same-tenant key-survival assertion:
`grep -i "key surviv\|enclave surviv\|same.tenant.*key"` → no matches. ✓

## Deviations from Plan

None — plan executed exactly as written.

The D-06 scope decision to mint all 9 dead anchors (not just REF-01's 3) was already incorporated into the plan; all 9 were minted as specified.

`{#id}` anchor-override syntax confirmed NOT supported in this repo (per RESEARCH Q1 finding, `### Kandji-Iru` bare heading used as planned).

## Known Stubs

None. All 9 entries have substantive body prose and Windows-equivalent callouts. No placeholders or TODOs remain.

## Threat Flags

None — docs-only change with no network surface, auth paths, or user input.

## Self-Check: PASSED

Files exist:
- `docs/_glossary-macos.md` ✓
- `docs/_glossary.md` ✓

Commits exist:
- `84af848` (Task 1) ✓
- `04746d3` (Task 2) ✓

All 9 minted headings present in `_glossary-macos.md` ✓
Reciprocal see-also present in `_glossary.md` ✓
No `## Migration` H2 added ✓
No same-tenant key-survival claim ✓
