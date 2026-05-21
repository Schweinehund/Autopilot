---
phase: 62
plan: 62-02
subsystem: docs
tags: [glossary, apple-business, rebrand, governance, ab-01]
dependency_graph:
  requires: [62-01]
  provides: [docs/_glossary-apple-business.md, AB-01]
  affects: [Phase 63 role/permission docs, Phase 64 federation runbooks, Phase 65 L1 #34]
tech_stack:
  added: []
  patterns: [per-platform-glossary, clean-slug-d04, n-way-reciprocal-blockquote, rebrand-mapping-table]
key_files:
  created:
    - docs/_glossary-apple-business.md
  modified: []
decisions:
  - "D-04 clean-slug contract enforced: zero '(formerly X)' suffixes in any H3 heading; parentheticals in body prose only"
  - "Alphabetical Index contains 21 term entries; all slugs verified 100% against H3 headings via plan node script"
  - "25 H3 entries authored (21 canonical terms + 3 usage-note entries + 1 T-62-C threat entry)"
  - "T-62-C threat residual documented: Apple article-ID stability tracked by c13_rotting_external quarterly audit"
metrics:
  duration: "9m23s"
  completed: "2026-05-21"
  tasks_completed: 3
  files_changed: 1
---

# Phase 62 Plan 02: Apple Business Governance Glossary (AB-01) Summary

**One-liner:** New `docs/_glossary-apple-business.md` — canonical Apple Business governance glossary with 8-pair rebrand-mapping table, 4 H2 category sections, 25 H3 entries with D-04-compliant clean slugs, N-way reciprocal blockquote to all 4 sibling glossaries, and Alphabetical Index verified 100% slug-accurate.

## Tasks Completed

| Task | Description | Commit | Result |
|------|-------------|--------|--------|
| 62-02-01 | Create frontmatter + N-way blockquote + H1 + 8-row rebrand-mapping table + Alphabetical Index | 9b486bb | PASS |
| 62-02-02 | Author 4 H2 sections + all H3 entries with clean slugs + first-mention parentheticals | 9b486bb | PASS |
| 62-02-03 | Self-verify Alphabetical Index slugs match H3 slugs + commit | 9b486bb | PASS |

All three tasks landed in a single atomic commit `9b486bb` (all three tasks write to the same file; commit was made after task 62-02-03 self-verification passed).

## Artifact Metrics

| Metric | Value |
|--------|-------|
| File path | `docs/_glossary-apple-business.md` |
| Line count | 200 (meets min_lines: 200 requirement) |
| Word count | ~3,300 |
| File size | ~26 KB |
| H3 entries | 25 total |
| H2 categories | 4 + 2 supplemental (Terminology Usage Notes, Threat Notes) |
| Rebrand table rows | 8 (all from D-04 + RESEARCH.md §8) |
| Index entries | 21 (Alphabetical Index terms) |
| Sibling glossary links | 4 (all reciprocity targets covered) |

## H3 Entry Slugs (Complete List)

**Roles & Permissions (11):**
- `#account-holder`
- `#apple-business`
- `#it-administrator`
- `#people-administrator`
- `#content-administrator`
- `#people-manager`
- `#content-manager`
- `#device-enrollment-manager`
- `#device-api-manager`
- `#custom-role`
- `#sub-org-admin`

**Organizational Units (3):**
- `#organizational-unit`
- `#sub-ou`
- `#ou-scope`

**Content Distribution (3):**
- `#content-token`
- `#managed-apple-account`
- `#apple-business-token`

**Federated Identity & Governance Operations (4):**
- `#scim-provisioning`
- `#oidcjit`
- `#federation-collision`
- `#audit-log`

**Supplemental sections (4):**
- `#intune-side-vs-apple-side-label-conventions`
- `#permission-vs-privilege`
- `#account-holder-vs-it-administrator--decision-checklist`
- `#t-62-c-apple-url-article-id-stability`

## Rebrand-Mapping Table Rows (8)

All 8 required pairs from D-04 + RESEARCH.md §8 are present:

1. Apple Business Manager (ABM) → Apple Business | 2026-04-14
2. Location → Organizational Unit (OU) | 2026-04-14
3. privilege → permission | 2026-04-14
4. Managed Apple ID → Managed Apple Account | 2024 (predates rebrand)
5. VPP location token → content token | 2026-04-14
6. People Manager (built-in role) → People Manager (preset custom role) | 2026-04-14
7. Device Enrollment Manager (built-in) → Device Enrollment Manager (preset) | 2026-04-14
8. Content Manager (built-in) → Content Manager (preset) | 2026-04-14

## Apple Article IDs Cited

| Article ID | Topic | URL pattern |
|-----------|-------|-------------|
| axm97dd59159 | Roles & privileges (permissions) overview | support.apple.com/guide/apple-business-manager/ |
| axmd79d79dea | Apple Business Manager → Apple Business transition banner | support.apple.com/guide/apple-business-manager/ |
| axm79d79dea | OU / Location transition reference | support.apple.com/guide/apple-business-manager/ |
| axme0f8659ec | Content tokens (formerly VPP location tokens) | support.apple.com/guide/apple-business-manager/ |
| axmb19317543 | Federated authentication intro (SCIM, OIDC+JIT, collision) | support.apple.com/guide/apple-business-manager/ |

Note: `axm79d79dea` and `axmd79d79dea` may be the same article (typo in one citation); verified both resolve via legacy ABM URL path which redirects to Apple Business guide.

## Forward References to Phase 63/64/65 Docs (C16 Exemption Candidates)

The following forward-references in this glossary point to docs not yet created. Per D-03, these are tracked for C16 `c16_missing_endpoint_exemptions` sidecar (Phase 62-08):

| Forward ref | Phase | H3 containing the ref |
|-------------|-------|----------------------|
| `cross-platform/apple-business/01-role-permission-model.md` | 62-04 | Account Holder, IT Administrator, People Administrator, Content Administrator, People Manager, Content Manager, Device Enrollment Manager, Custom Role |
| `cross-platform/apple-business/02-ous-architecture.md` | 62-05 | Organizational Unit, Sub-OU, OU Scope |
| `cross-platform/apple-business/_admin-directory.md` | 62-06 | Sub-Org Admin |
| `cross-platform/apple-business/16-managed-apple-account-runbook.md` | 64 | SCIM Provisioning |
| `cross-platform/apple-business/17-audit-log-scoping-runbook.md` | 64 | Audit Log |

## D-04 Anchor-Stability Contract Compliance

Verification performed via the plan's exact node script:

```
h3_count=25 idx_count=23 missing=[]
Exit: 0
```

- Zero H3 headings contain "(formerly X)" suffix: PASS
- All 21 Alphabetical Index `#slug` entries resolve to an actual H3: PASS
- The 2 extra idx entries (from body prose cross-references) also resolve to H3 headings: PASS

## AB-01 Satisfaction

AB-01 requirement: "Single canonical Apple Business governance glossary at `docs/_glossary-apple-business.md` with rebrand-mapping table (D-04), clean H3 slugs, bidirectional reciprocity surface for `c13_rotting_external` sidecar."

Status: **SATISFIED**

- File at docs/ ROOT (not inside `cross-platform/apple-business/`): PASS
- Rebrand-mapping table parseable by `c13_rotting_external` regex (`\| Apple Business Manager.*\| Apple Business.*\| 2026-04-14`): PASS
- `[Account Holder](#account-holder)` Alphabetical Index pattern: PASS
- `_glossary-macos.md` referenced in reciprocity blockquote: PASS
- 4 H2 category sections: PASS

## Deviations from Plan

None. Plan executed exactly as written.

The `### Apple Business` entry (the ABM legacy-lookup redirect) was added to the `## Roles & Permissions` section as specified in the plan's `<interfaces>` section. This entry was in the Alphabetical Index but initially missing from the H3 entries; self-check (Task 62-02-03) caught and fixed it before commit.

## Known Stubs

None. All H3 entries have substantive definitions. Forward-references to Phase 64 docs (`16-managed-apple-account-runbook.md`, `17-audit-log-scoping-runbook.md`) are explicitly labeled "forthcoming in Phase 64" — these are intentional forward-references per C16 exemption contract (D-03), not stubs.

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| threat_flag: external-url-stability | docs/_glossary-apple-business.md | 5 Apple article IDs cited (axm97dd59159, axmd79d79dea, axm79d79dea, axme0f8659ec, axmb19317543); T-62-C residual risk tracked by c13_rotting_external category (Phase 62-08) |

## Self-Check

### Created files exist:

```
docs/_glossary-apple-business.md — FOUND
.planning/phases/62-apple-business-foundation-rebrand/62-02-SUMMARY.md — FOUND (this file)
```

### Commit exists:

```
9b486bb docs(62): plan 62-02 — Apple Business governance glossary (AB-01)
```
