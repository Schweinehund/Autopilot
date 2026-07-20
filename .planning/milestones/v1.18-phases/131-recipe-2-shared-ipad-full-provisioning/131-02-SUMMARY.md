---
phase: 131-recipe-2-shared-ipad-full-provisioning
plan: 02
subsystem: docs/recipes
tags: [ios, shared-ipad, intune, layered-config, std-05, eee-corpus, c17]
dependency-graph:
  requires: [docs/recipes/02-shared-ipad-full-provisioning.md (front half, 131-01), docs/admin-setup-ios/04-configuration-profiles.md, docs/admin-setup-ios/05-app-deployment.md, docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md, docs/_standards/EEE-SOP-standard.md]
  provides: [docs/recipes/02-shared-ipad-full-provisioning.md (complete file — layered config, Verification, Configuration-Caused Failures, See Also)]
  affects: [Phase 132 (navigation-last wiring — docs/index.md, RE-index.md, filename-map)]
tech-stack:
  added: []
  patterns: [device-baseline + user-overlay LAYERING (distinct from Recipe #1's non-converging branches), STD-05 Case-1 boolean as if/then prose (D-04 rule 3), blank-line-split blockquotes for C17 #12, link-not-copy cross-linking]
key-files:
  created: []
  modified:
    - docs/recipes/02-shared-ipad-full-provisioning.md
    - .planning/REQUIREMENTS.md
decisions:
  - "Carried T-2 verbatim: ALL apps (device-licensed VPP/LOB) assigned Required to the device group only — no per-role app assignment to user groups anywhere in the file; per-role differentiation is Home Screen Layout + show/hide-apps allow-list only"
  - "Carried T-3 verbatim: the conflict-warning callout uses the three first-party phrases 'can't be pre-determined' / 'first setting assigned' / 'chosen by the operating system', word-split across 5 blank-line-separated blockquote paragraphs to stay under C17 #12's 200-char cap; 'last-writer' does not appear anywhere in the file"
  - "Guest decision block (B3) recorded the real inverted 'Block Shared iPad temporary sessions' setting (guest-enabled = Block No/Not configured) as plain prose outside the blockquote (only the one-sentence 'Ask the admin' lead-in is a blockquote line), per D-01/D-04 rule 3 and to keep the run short for C17 #12"
  - "Named the enrollment-profile 'Require Shared iPad temporary session only' third mode (B4) as a distinct, out-of-scope mode on a different surface than the Block toggle, per Pitfall 4/Pitfall 6 guidance — no exact Settings Catalog breadcrumb asserted for the Block setting beyond 'an iOS/iPadOS device restrictions profile'"
  - "Chose the Nurse/Clinician healthcare vertical for the worked example (Claude's Discretion) with synthetic but internally consistent Dock/allow-list app sets across the two roles"
  - "Verification is a single flat on-device '- [ ]' checklist (no bold pseudo-heading branch groups, since this recipe layers rather than branches) — no Company Portal item, no Intune user-status-report item, per C5"
metrics:
  duration: ~25min
  completed: 2026-07-18
---

# Phase 131 Plan 02: Shared iPad Layered-Config, Verification & Closing Sections Summary

Completed `docs/recipes/02-shared-ipad-full-provisioning.md` (RE-223) by appending Steps 4-7 (the
trimmed applicability reference table, the guest/temporary-session decision block, the device-group
baseline, and the per-role Nurse/Clinician user-group overlay with the verbatim conflict-warning
callout), then closing with on-device Verification, Configuration-Caused Failures, and See Also.
Both C17 self-test and the full-corpus `--verbose` run exit 0 (232 files, 0 violations).

## What Was Built

**Task 1 — Layered-config steps (IPAD-03, IPAD-01)** (commit `09c53ac4`)

- **Step 4 (applicability boundary, C1):** a 5-row trimmed table (Home screen layout,
  Block Shared iPad temporary sessions, other device restrictions, Wi-Fi/VPN/Certificate, Email —
  with an inline ⚠ pointing back to the anti-feature table for Email, T-5) linking RE-110 for the
  full matrix.
- **Step 5 (guest/temporary-session decision, B3/B4):** a one-sentence `> **Ask the admin:**`
  blockquote lead-in, then plain prose (outside the blockquote, so no C17 #12 risk at all) stating
  the real inverted "Block Shared iPad temporary sessions" polarity, a caution against asserting an
  exact Settings Catalog breadcrumb (Pitfall 6), the out-of-scope "Require Shared iPad temporary
  session only" third mode (B4) on a separate enrollment-profile surface, and that guest sessions
  receive device-group assignments only.
- **Step 6 (device-group baseline, C2/C3):** Wi-Fi assigned to the device group with a two-paragraph
  blockquote stating platform-forced placement (Not applicable to user groups) is a constraint, not
  a preference; all apps Required to the device group only (T-2) with a what-breaks callout; common
  device restrictions carried from Step 5.
- **Step 7 (per-role user-group overlay, C2/C4):** Nurse/Clinician worked example as one contiguous
  table (Home Screen Dock + show/hide allow-list per role), framed as per-signed-in-role (not
  per-physical-user persistence), explicitly not overstating Home Screen Layout as user-only. The
  conflict-warning callout carries T-3's three verbatim phrases across 5 blank-line-separated
  blockquote paragraphs, each well under the 200-char cap.

**Task 2 — Verification, Configuration-Caused Failures, See Also, C17 green gate (IPAD-01
completion)** (commit `500bb1e8`)

- **Verification:** single flat `- [ ]` checklist — ADE Supervised/Shared-iPad/no-user-affinity
  state, apps present before sign-in, common Wi-Fi connects for every role, per-role layout/app-set
  checks for Nurse and Clinician, and a guest-session check confirming no overlay applies. Explicit
  prose states no Company Portal check and no Intune user-status-report check apply (C5).
- **Configuration-Caused Failures:** 4-row table — VPP wrong-intent/wrong-licensing, email profile
  assignment error (T-5), guest Block-toggle wrong polarity, and the device/user same-setting
  conflict (links back to Step 7's conflict warning) — each row linking its step.
- **See Also:** links the STD-05 spec plus all five owner docs (RE-109, RE-110, RE-111, OU-06,
  OU-07).
- Ran `node scripts/validation/c17-eee-contract.mjs --self-test` (4/4 passed) and the full-corpus
  `--verbose` run (232 files checked, 0 violations) after each task — both green.

## Verification

- `node scripts/validation/c17-eee-contract.mjs --self-test` — exits 0 (4/4 sub-tests pass), run
  after both tasks.
- `node scripts/validation/c17-eee-contract.mjs --verbose` (full corpus) — 232 files checked, 0
  files with violations, 0 total violations. Includes the new recipe file.
- File is 287 lines total (well above the plan's 180-line minimum artifact floor).
- All task-level automated `<verify>` checks passed: the three verbatim T-3 phrases present,
  "last-writer" absent, "Block Shared iPad temporary sessions" present; `## Verification`,
  `## Configuration-Caused Failures`, `## See Also` all present; no fenced code block anywhere in
  the body.
- `.planning/REQUIREMENTS.md` updated via `gsd-sdk query requirements.mark-complete IPAD-01 IPAD-02
  IPAD-03` — all four IPAD-01..04 traceability rows now read Complete.

## Deviations from Plan

None — plan executed exactly as written. Both traps in this plan's scope (T-2, T-3) were carried
per the locked CONTEXT.md wording; T-1/T-4/T-5/T-6 were 131-01's scope and already carried there.

## Known Stubs

None. The recipe is complete end-to-end per the plan's stated scope (Steps 1-7, Verification,
Configuration-Caused Failures, See Also) — no remaining placeholder content.

## Threat Flags

None. Docs-only change; no new network endpoints, auth paths, or trust boundaries introduced beyond
what the plan's `<threat_model>` already scoped (content-accuracy risk on the layered-config worked
example, mitigated by the first-party-verified fact base and this plan's trap-specific acceptance
criteria).

## Self-Check: PASSED

- FOUND: docs/recipes/02-shared-ipad-full-provisioning.md
- FOUND: 09c53ac4 (feat(131-02): author layered-config steps for Shared iPad recipe)
- FOUND: 500bb1e8 (feat(131-02): close Shared iPad recipe with Verification, Configuration-Caused Failures, See Also)
