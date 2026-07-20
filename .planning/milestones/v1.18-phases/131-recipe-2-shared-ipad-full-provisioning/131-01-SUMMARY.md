---
phase: 131-recipe-2-shared-ipad-full-provisioning
plan: 01
subsystem: docs/recipes
tags: [ios, shared-ipad, intune, ade-enrollment, vpp, eee-corpus, c17]
dependency-graph:
  requires: [docs/_templates/recipe-template.md, docs/recipes/01-shared-windows-avd-client.md, docs/admin-setup-ios/03-ade-enrollment-profile.md, docs/admin-setup-ios/05-app-deployment.md, docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md]
  provides: [docs/recipes/02-shared-ipad-full-provisioning.md (front half through VPP step)]
  affects: [131-02 (completes the file: layered config, applicability tables, home-screen layout, Verification, Configuration-Caused Failures, See Also)]
tech-stack:
  added: []
  patterns: [STD-05 composite decision blocks (Case-2 enum, Case-3 bounded), link-not-copy cross-linking, blank-line-split blockquotes for C17 #12]
key-files:
  created:
    - docs/recipes/02-shared-ipad-full-provisioning.md
  modified: []
decisions:
  - "Followed CONTEXT.md T-1..T-6 traps verbatim: cached users rendered as a real settable Case-3 field (T-1); wipe trigger and factory-reset-to-apply kept as two distinct facts (T-6); Entra shared-device-mode vs Shared iPad stated correctly inline, not inheriting RE-109 line 83's conflation (T-4); Email listed as unsupported despite the applicability table (T-5)"
  - "Split every multi-fact blockquote across blank-line-separated `>` paragraphs (passcode note, wipe warning, Entra distinction, VPP what-breaks callout) to stay under C17 assertion #12's 200-char contiguous-run cap"
  - "Avoided the literal substring '8-digit' entirely (not just as a corrected claim) since the plan's automated verify greps for its absence case-insensitively"
metrics:
  duration: ~35min
  completed: 2026-07-18
---

# Phase 131 Plan 01: Shared iPad Recipe Front Half + ADE/Sizing/Sign-In/VPP Steps Summary

Authored `docs/recipes/02-shared-ipad-full-provisioning.md` (RE-223) through the VPP step: frontmatter,
Summary, specialized Scope banner, Prerequisites, the 7-row all-unsupported anti-feature table with a
dedicated eight-alphanumeric-character passcode note, then Steps 1-3 (ADE enrollment policy with the
Shared-iPad toggle values table and co-located sizing cluster, federated Managed Apple Account sign-in,
and device-licensed Required VPP apps to the device group).

## What Was Built

**Task 1 — Frontmatter through anti-feature table + passcode note** (commit `6e2d32dc`)

- `docs/recipes/02-shared-ipad-full-provisioning.md` created: `doc_id: RE-223`, `status: Draft`,
  `owner: Intune Admin Lead`, `doc_type: Guide`, `platform: ios+shared-ipad` (pre-existing D1-map
  compound value, renders "iOS + Shared iPad").
- EEE block line matches frontmatter exactly (assertion #9 requirement): `Platform` / `Doc Type` /
  `Doc ID` / `Status` in that order.
- `## Summary` — 64 words, states the concrete end-state (verified, fully-provisioned Shared iPad),
  platform (supervised iPadOS), and admin role/permissions.
- `> **Scope:**` banner specialized per the H-LOCK-1 precedent: named-user-only, split across three
  blank-line-separated blockquote paragraphs (excludes the guest-only third mode; excludes
  compliance/CA/app-protection/email, documented below as unsupported).
- `## Prerequisites`: eligibility floor iPadOS 13.4+/32GB (no "64 GB recommended" claim — the 64GB
  figure appears only in the cached-users ceiling later), RBAC, ADE/ABM token + Supervised devices,
  and a one-sentence pointer to OU-06 for federated-identity setup (never re-authored here).
- `## Unsupported and Anti-Feature Callouts`: exactly 7 rows (compliance, app-based CA, device-based
  CA, app protection, email — T-5, Company Portal, "Available"/user-licensed VPP), sourced verbatim
  from 131-RESEARCH.md, not re-derived.
- Dedicated passcode note (not a table row, not a decision block): "eight alphanumeric characters"
  present; the literal substring "8-digit" is absent from the entire file (verified by grep).

**Task 2 — Steps 1-3** (commit `400660a4`)

- **Step 1 (ADE enrollment policy):** Shared-iPad toggle values table (Enable Shared iPad / Enroll
  without user affinity / Supervised=Yes / Shared iPad=Yes); explicitly excludes "Await final
  configuration" with the reason (unavailable in this combination), linking RE-109's
  `#await-final-configuration` anchor. Wipe warning kept as two distinct facts (T-6): unsupported-device
  targeting vs. factory-reset-to-apply-a-change — never merged into "any change wipes." Entra
  shared-device-mode vs. Shared iPad distinction stated correctly inline (T-4), explicitly noting
  RE-109's User Affinity row does not describe this toggle.
  - Sizing cluster co-located at this same step (D5, no dedicated "Sizing" H2): Maximum cached users
    as a real settable Case-3 bounded field (≤24 on 32/64GB, T-1, sizing prose outside the
    blockquote); screen-lock timeout as a Case-2 enum table (0/60/300/900/3600/14400 seconds,
    iPadOS 13.0+); session inactivity as a Case-3 bounded field (min 30, 0/blank=never, iPadOS
    14.5+); QuotaSize/OnlineAuthenticationGracePeriod as an advanced plan-time-verify pointer only
    (D4), never a "Recorded as" block, noting the ResidentUsers/QuotaSize either-or relationship and
    the distinct grace-period units (days vs. seconds vs. minutes).
- **Step 2 (federated sign-in):** one sentence, links OU-06, does not re-author its provisioning
  matrix (A2).
- **Step 3 (VPP apps):** owns inline the only working Shared-iPad triple — device-licensed, Required,
  device group — with a what-breaks callout (Available/user-licensed/user-group all leave the app
  absent) and a link to RE-111's device-centric verification view (not Company Portal, which is
  unsupported here).

## Verification

- `node scripts/validation/c17-eee-contract.mjs --self-test` — exits 0 (4/4 sub-tests pass), run
  after both tasks.
- `node scripts/validation/c17-eee-contract.mjs --verbose` (full corpus, informal spot-check beyond
  this plan's required gate) — zero violations reported against the new file. Full-corpus green
  including this file is the plan-131-02 closing assertion per the plan's `<verification>` section;
  this plan's own gate is the `--self-test` command only.
- All task-level automated `<verify>` grep checks passed (doc_id, header presence, "eight
  alphanumeric" present, "8-digit" absent, "Enroll without user affinity", "Await final
  configuration", "14400", "device-licensed").

## Deviations from Plan

None — plan executed exactly as written. All 6 requirement-inversion traps (T-1, T-4, T-5, T-6
explicitly; T-2/T-3 are plan-131-02 scope for the layered-config worked example) were carried
per the locked CONTEXT.md wording, not the original (inverted) requirement wording.

## Known Stubs

None. The file is intentionally incomplete per the plan's own scope (through the VPP step only) —
`## Steps` continues in 131-02 with the layered-config worked example, applicability tables,
home-screen layout, `## Verification`, `## Configuration-Caused Failures`, and `## See Also`. This
is the plan's stated scope boundary, not an unintentional stub.

## Threat Flags

None. Docs-only change; no new network endpoints, auth paths, or trust boundaries introduced beyond
what the plan's `<threat_model>` already scoped (content-accuracy risk, mitigated by the
first-party-verified fact base cited in 131-CONTEXT.md/131-RESEARCH.md).

## Self-Check: PASSED

- FOUND: docs/recipes/02-shared-ipad-full-provisioning.md
- FOUND: 6e2d32dc (feat(131-01): create Shared iPad recipe frontmatter, scope, prerequisites, anti-feature table)
- FOUND: 400660a4 (feat(131-01): author ADE enrollment, sizing cluster, federated sign-in, and VPP steps)
