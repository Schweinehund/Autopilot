---
phase: 55
plan: 04
subsystem: documentation/operations/app-lifecycle
tags: [ios, vpp, licensing, reclamation, app-lifecycle, phase-55, doc-only]
requires:
  - .planning/phases/55-app-lifecycle-automation/55-CONTEXT.md (D-07 / D-08 / D-09 / D-13 / D-19 / CD-07)
  - .planning/phases/55-app-lifecycle-automation/55-RESEARCH.md (§7 Microsoft Learn vpp-apps-ios verbatim facts)
  - .planning/phases/55-app-lifecycle-automation/55-VALIDATION.md (V-55-04 / 07 / 18 / 19 / 20 / 21 / 26 / 27 / 30 / 31)
  - docs/operations/patch-management/03-ios-update-lifecycle.md (Phase 54 zero-Mermaid iOS sibling pattern parity source)
  - docs/admin-setup-ios/05-app-deployment.md (v1.3 cross-link target — anti-duplication mitigation)
  - docs/admin-setup-ios/08-user-enrollment.md (v1.3 BYOD User Enrollment cross-link)
  - docs/admin-setup-ios/09-mam-app-protection.md (v1.3 MAM cross-link)
provides:
  - docs/operations/app-lifecycle/03-ios-vpp-licensing.md (iOS-specific VPP Device-vs-User licensing comparison + 3-step reclamation workflow + Decision Support; APP-06)
affects: []
tech_stack:
  added: []
  patterns:
    - 2-column VPP attribute comparison table (D-07 3A winner)
    - Microsoft Learn 3-step manual reclamation workflow narrative (RESEARCH §7 correction)
    - Platform applicability blockquote at TOP routing back to 00-overview + 3 sibling per-platform files (D-13 + V-55-26)
    - Zero Mermaid (Phase 54 iOS sibling parity per D-09 + CDI-Phase55-06)
    - Cross-link to v1.3 admin-setup-ios for full 4-column app-type matrix (D-07 anti-duplication mitigation)
    - BYOD/Corporate × Supervised/Unsupervised dimensions encoded as value-cell qualifiers (D-08 reuse from v1.3 cross-reference)
key_files:
  created:
    - docs/operations/app-lifecycle/03-ios-vpp-licensing.md (155 lines)
  modified: []
decisions:
  - "Encoded the Microsoft Learn 3-step reclamation workflow as a dedicated `## Reclamation Workflow` H2 sub-section beneath the comparison table (RESEARCH §7 plan-author resolution option (a)). Rationale: the workflow is operationally load-bearing and benefits from numbered-list visual hierarchy; embedding into table cells would either truncate the steps or bloat row heights past readability."
  - "Added a 7th row (License migration) covering the user→device migration constraint (silent migration with Required intent) and the device→user migration block (CD-07 plan-author discretion). Rationale: the one-way migration limit is a Microsoft Learn verbatim constraint that affects model-selection planning and naturally fits the Decision Support narrative."
  - "Encoded BYOD/Corporate × Supervised/Unsupervised dimensions as value-cell qualifiers in the Supervised silent install row (e.g., 'Yes (supervised) / Partial (unsupervised)'), with cross-reference to admin-setup-ios/05-app-deployment.md lines 36-43 for the full 6-row silent-install boundary table — per D-08 anti-duplication mitigation. Rationale: re-encoding the full 6-row matrix would duplicate the v1.3 SSoT and violate D-08."
  - "Added cross-platform note + auto-reclaim path callout as blockquote sub-sections under Reclamation Workflow. Rationale: the macOS 30-day grace period asymmetry and the Entra-deletion auto-reclaim exception are Microsoft Learn verbatim facts that admins need at decision-time; placing them as blockquotes aids scanability without disrupting the 3-step numbered list."
metrics:
  duration: ~12 minutes
  completed: 2026-04-28
phase_55_atomic_commit: deferred (per CONTEXT D-21; atomic commit owned by 55-07)
---

# Phase 55 Plan 04: iOS VPP Licensing (APP-06) Summary

Authored `docs/operations/app-lifecycle/03-ios-vpp-licensing.md` — the iOS-specific VPP licensing reference covering Device-vs-User licensing comparison + 3-step manual reclamation workflow (Microsoft Learn corrected vs REQ oversimplification) + Decision Support guidance, per CONTEXT D-07 3A 2-column VPP attribute table winner with reclamation rows added net-new vs v1.3.

## File Authored

- **Path:** `docs/operations/app-lifecycle/03-ios-vpp-licensing.md`
- **Line count:** 155
- **Scope:** APP-06 (VPP Device-Licensed vs User-Licensed; reclamation behavior)

## Sections Authored (in order)

1. **Frontmatter** — `last_verified: 2026-04-28`, `review_by: 2026-06-27`, `applies_to: all`, `audience: admin`, `platform: iOS` (D-19 single-string platform; CD-10 default audience; 60-day cycle per CDI-Phase55-02)
2. **Platform applicability blockquote at TOP** (immediately after frontmatter, before H1) routing back to 00-overview + 3 sibling per-platform files using verbatim `> **Platform applicability:**` token (D-13 + V-55-26; mirrors Phase 54 `03-ios-update-lifecycle.md:9-14` token discipline)
3. **H1 + intro paragraph** — `# iOS VPP Licensing: Device vs User + Reclamation Behavior` + intro cross-linking to 00-overview hub + v1.3 admin-setup-ios/05-app-deployment.md for the broader 4-column app-type matrix
4. **`## VPP Licensing Models`** — 2-column comparison table with column headers `VPP Device-Licensed | VPP User-Licensed` covering 7 attribute rows: License source / Apple ID requirement / Supervised silent install / Reclamation on retire/wipe / Reclamation on remove app / BYOD applicability / License migration (CD-07 plan-author 7th row addition for one-way migration constraint)
5. **`## Reclamation Workflow`** — Microsoft Learn 3-step manual workflow encoded as numbered list (remove assignment → change intent to Uninstall → Revoke license action) + cross-platform note blockquote (macOS 30-day grace vs iOS no-grace asymmetry) + auto-reclaim path blockquote (Entra-deletion exception)
6. **`## Decision Support: Device-Licensed vs User-Licensed`** — 3-bullet decision-support narrative: Pick Device-Licensed when... / Pick User-Licensed when... / Avoid mixing within a single app assignment (covering the device→user migration block)
7. **`## Related Resources`** — 5 internal cross-links (00-overview hub + 3 v1.3 admin-setup-ios siblings + Phase 54 patch-management iOS sibling)
8. **`## External References`** — 5 external authority links (Microsoft Learn `vpp-apps-ios` canonical + `manage-volume-purchased-apps` sub-section + Apple Business Manager + Apple School Manager + Operations Documentation Index cross-reference)

## Validator V-55-NN Assertions Satisfied

| V-NN | Assertion | Status | Evidence |
|------|-----------|--------|----------|
| V-55-04 | File exists | PASS | `test -f docs/operations/app-lifecycle/03-ios-vpp-licensing.md` returns 0 |
| V-55-07 | Frontmatter: `platform: iOS`, `audience` non-empty, 60-day cycle | PASS | `grep -c "platform: iOS"` returns 1; `audience: admin` present; `last_verified: 2026-04-28` + `review_by: 2026-06-27` (60 days) |
| V-55-18 | 2-column VPP comparison table with `VPP Device-Licensed` AND `VPP User-Licensed` column headers | PASS | Table header at line 41: `\| Attribute \| VPP Device-Licensed \| VPP User-Licensed \|` |
| V-55-19 conjunct A | `retire/wipe` AND `device license` in reclamation context | PASS | "Reclamation on retire/wipe" row contains both literals; "device license" appears 3+ times in row |
| V-55-19 conjunct B | `remove app` AND `user license` in reclamation context | PASS | "Reclamation on remove app" row contains both literals; row label itself contains both |
| V-55-20 NEGATIVE | ZERO Mermaid code blocks | PASS | `grep -c "\`\`\`mermaid"` returns 0 |
| V-55-21 | Literal cross-link `../../admin-setup-ios/05-app-deployment.md` | PASS | `grep -c` returns 5 occurrences (intro + 3 supervised-silent-install row callouts + Decision Support + Related Resources) |
| V-55-26 | `> **Platform applicability:**` blockquote within first 50 lines of body | PASS | Body line 1 = blockquote (frontmatter stripped) |
| V-55-27 NEGATIVE | NO bare `> **Platform:**` token | PASS | `grep -c "^> \*\*Platform:\*\*$"` returns 0 |
| V-55-30 NEGATIVE | NO TBD/TODO/FIXME/XXX/PLACEHOLDER | PASS | `grep -nE "\b(TBD\|TODO\|FIXME\|XXX\|PLACEHOLDER)\b"` empty (exit 1) |
| V-55-31 | SC#5 multi-platform frontmatter | PASS | `applies_to: all` + `platform: iOS` (single-string per D-19) |

## Cross-Links Used

| From → To | Path | Purpose |
|-----------|------|---------|
| 03-ios-vpp-licensing.md → 00-overview.md | `00-overview.md` | Platform applicability blockquote back-link to cross-platform hub |
| 03-ios-vpp-licensing.md → 01-windows-win32-msix-scale.md | `01-windows-win32-msix-scale.md` | Platform routing (Windows sibling) |
| 03-ios-vpp-licensing.md → 02-macos-pkg-dmg-pipeline.md | `02-macos-pkg-dmg-pipeline.md` | Platform routing (macOS sibling) |
| 03-ios-vpp-licensing.md → 04-android-mgp-lifecycle.md | `04-android-mgp-lifecycle.md` | Platform routing (Android sibling) |
| 03-ios-vpp-licensing.md → admin-setup-ios/05-app-deployment.md | `../../admin-setup-ios/05-app-deployment.md` | V-55-21 anti-duplication mitigation; full 4-column app-type matrix + 6-row silent-install boundary table (D-07 + D-08); 5 occurrences |
| 03-ios-vpp-licensing.md → admin-setup-ios/08-user-enrollment.md | `../../admin-setup-ios/08-user-enrollment.md` | BYOD User Enrollment with Managed Apple Accounts (D-08 cross-reference) |
| 03-ios-vpp-licensing.md → admin-setup-ios/09-mam-app-protection.md | `../../admin-setup-ios/09-mam-app-protection.md` | App Protection Policies for BYOD (D-08 cross-reference) |
| 03-ios-vpp-licensing.md → patch-management/03-ios-update-lifecycle.md | `../patch-management/03-ios-update-lifecycle.md` | Phase 54 sibling ops-domain (DDM update enforcement for the same iOS platform) |
| 03-ios-vpp-licensing.md → operations/00-index.md | `../00-index.md` | Cross-reference only (Phase 55 does NOT amend per V-55-28 NEGATIVE regression-guard) |

External cross-links (Microsoft Learn `vpp-apps-ios` canonical + `manage-volume-purchased-apps` sub-section + Apple Business Manager + Apple School Manager) are documented in the file's External References section.

## Reclamation Workflow Encoding Choice (RESEARCH §7 + 55-VALIDATION.md Manual-Only Verifications row 4)

**Choice: Option (a) — dedicated `## Reclamation Workflow` H2 sub-section beneath the comparison table.**

Rationale: the 3-step manual workflow (remove assignment → change intent to Uninstall → Revoke license) is operationally load-bearing — admins reading the doc need to execute these steps in sequence. Numbered-list visual hierarchy is the natural format. Embedding into table cells would either truncate the steps to single-line summaries (losing the navigation paths to Intune > Apps > Apple VPP tokens) or bloat row heights past readability. The H2 sub-section also provides anchor real estate for two adjacent blockquote callouts (cross-platform note on macOS 30-day grace; auto-reclaim path on Entra deletion) that would otherwise have nowhere to land.

The 2-column comparison table retains 2 reclamation rows (one per scenario: retire/wipe and remove-app) that contain the V-55-19 literal-token coverage; those rows reference the H2 sub-section via "see § Reclamation Workflow" prose. This split satisfies V-55-19 (conjuncts A + B) while preserving the full Microsoft Learn workflow accuracy — solving the REQ-oversimplification problem flagged in RESEARCH §7.

## 7th Row Choice (CD-07 Plan-Author Discretion)

**Added: License migration row.**

The plan-author-discretionary 7th row (beyond the 6 required for V-55-18 row-count satisfaction) covers the one-way migration constraint surfaced verbatim in Microsoft Learn `vpp-apps-ios`:

> "Apps can migrate silently from user to device licenses only when using **Required** assignment type. Apps can't migrate from device to user licenses for any assignment type."

Rationale: the migration block is a Microsoft Learn-verified constraint that materially affects model-selection planning (you cannot un-do a device-licensing choice without reclaiming every license). It naturally feeds the Decision Support § "Avoid mixing within a single app assignment" bullet, which expands the constraint into actionable guidance. Alternative 7th rows considered (and rejected): "Reclamation grace period" was redundant with the cross-platform note blockquote already present; "ABM revocation behavior" was out-of-scope per Phase 45 SSoT separation.

## Phase 55 D-07 / D-08 / D-09 / D-13 / D-19 Compliance Audit

- **D-07 (3A 2-column VPP attribute table + reclamation rows):** Comparison table at `## VPP Licensing Models` H2 has exactly 2 data columns (`VPP Device-Licensed | VPP User-Licensed`) + 1 attribute column. Reclamation rows present (Reclamation on retire/wipe, Reclamation on remove app). Net-new vs v1.3 confirmed (zero `reclaim` token in `docs/admin-setup-ios/`).
- **D-08 (BYOD/Corporate × Supervised/Unsupervised reused from v1.3):** Encoded as value-cell qualifiers in the Supervised silent install row (e.g., "Yes (supervised) / Partial (unsupervised)") with explicit cross-link to admin-setup-ios/05-app-deployment.md lines 36-43 for the full 6-row silent-install boundary table. NOT a separate sub-matrix. User Enrollment as third state covered in BYOD applicability row prose with cross-links to 08-user-enrollment.md and 09-mam-app-protection.md.
- **D-09 (Mermaid forbidden):** `grep -c "\`\`\`mermaid"` returns 0. V-55-20 NEGATIVE regression-guard satisfied. Phase 54 iOS sibling pattern parity preserved.
- **D-13 (cross-platform inline blockquote):** Verbatim `> **Platform applicability:**` token at body line 1 (after frontmatter strip), routing to 00-overview + 3 sibling per-platform files. V-55-26 satisfied.
- **D-19 (single-string `platform: iOS`):** Frontmatter line 6: `platform: iOS` (not `[iOS]`, not `[ios, ipados]`). V-55-31 satisfied.

## NO COMMIT — Atomic Commit Deferred to 55-07

Per CONTEXT D-21 + CDI-Phase55-05, this plan does NOT create a git commit. Phase 55 uses single-atomic-commit pattern; 55-07 author owns the atomic commit covering all 5 markdown files + 1 validator script (6 files total). No `git add` / `git commit` executed; no STATE.md / ROADMAP.md / REQUIREMENTS.md modifications made by this plan.

## Self-Check: PASSED

**Files verified:**
- FOUND: `docs/operations/app-lifecycle/03-ios-vpp-licensing.md` (155 lines)

**Validator literal-token coverage verified:**
- `platform: iOS` count=1 ✓
- `> **Platform applicability:**` count=1 ✓
- `VPP Device-Licensed` AND `VPP User-Licensed` headers present ✓
- `retire/wipe` + `device license` reclamation row present ✓
- `remove app` + `user license` reclamation row present ✓
- ` ```mermaid ` count=0 (V-55-20 NEGATIVE) ✓
- `../../admin-setup-ios/05-app-deployment.md` count=5 ✓
- `> **Platform:**` bare token count=0 (V-55-27 NEGATIVE) ✓
- TBD/TODO/FIXME/XXX/PLACEHOLDER count=0 (V-55-30 NEGATIVE) ✓

**Commits verified:**
- N/A — no commits made; atomic commit deferred to 55-07 per CONTEXT D-21
