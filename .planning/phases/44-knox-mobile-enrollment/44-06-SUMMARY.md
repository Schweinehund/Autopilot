---
phase: 44-knox-mobile-enrollment
plan: 06
subsystem: documentation (Android Knox glossary entries + provisioning-methods anchor population)
tags: [android, knox, kme, kpe, glossary, provisioning-methods, phase-44, aeknox-06]
requires:
  - 44-01 (admin guide 07-knox-mobile-enrollment.md — supplies #sku-disambiguation cross-link target)
  - 44-02 (L1 runbook 28 — supplies cross-link target in 02-provisioning-methods.md body)
  - 44-03 (L2 runbook 22 — supplies cross-link target in 02-provisioning-methods.md body)
  - 44-04 (capability matrix retrofit — supplies #knox-mobile-enrollment-row cross-link target)
  - Phase 43 audit harness v1.4.1-milestone-audit.mjs (C1/C2/C5/C7 compliance)
provides:
  - docs/_glossary-android.md (3 new H3 entries Knox / KME / KPE under Provisioning Methods H2; alphabetical index updated)
  - docs/android-lifecycle/02-provisioning-methods.md (#knox-mobile-enrollment anchor populated; deferred-to-v1.4.1 wording fully removed)
  - Glossary anchors #knox / #kme / #kpe for cross-doc deep-linking
affects:
  - Closes v1.4 forward-promise embedded in lifecycle reference's deferred-to-v1.4.1 anchor
  - Completes glossary granularity per D-04 (Knox/KME/KPE entries; AMAPI cross-link from existing entry)
  - Provides glossary entry targets for downstream Phase 47 integration cross-link audits
tech-stack:
  added:
    - 3 new glossary H3 entries (Knox / KME / KPE) with Cross-platform note blockquotes (Samsung-specific framing)
    - Live KME paragraph at #knox-mobile-enrollment anchor (replacing deferral text) with 4 cross-links (admin doc 07, L1 28, L2 22, capability matrix row)
  patterns:
    - Phase 34 D-09 5-category H2 lock (new entries placed under Provisioning Methods H2)
    - Phase 34 D-14 60-day Android freshness cycle (frontmatter shifted)
    - C2-compliant short-form Cross-platform note (avoid "supervised" token per Phase 43 audit gate)
    - Surgical-edit boundary discipline (matrix rows + Per-Method Details H3s untouched)
key-files:
  created: []
  modified:
    - docs/_glossary-android.md (insertions: alphabetical index +3 anchors; 3 new H3 entries between afw#setup and Corporate Identifiers; Version History row appended; frontmatter dates shifted)
    - docs/android-lifecycle/02-provisioning-methods.md (top callout body replaced; bottom anchor renamed; bottom H2 renamed; bottom body replaced; AOSP matrix-row deferral-text staleness fixed; frontmatter dates shifted)
    - scripts/validation/v1.4.1-audit-allowlist.json (Rule 3 sidecar line-number re-pin: supervision_exemptions 134→152 / 148→167; safetynet_exemptions 138→156 / 150→169; counts unchanged at 18 / 4)
decisions:
  - "D-04 (locked) implemented: 3 new H3 glossary entries for Knox / KME / KPE; AMAPI cross-link added FROM Knox entry (no new AMAPI entry — single existing line 124 preserved); WPCO single instance preserved (no duplicate of line 75)"
  - "C2 audit gate respected: KPE Cross-platform note uses RESEARCH/PATTERNS C2-compliant short form ('No Apple or Windows analog at the SKU level.') instead of the §7 sketch's supervised-only phrasing — drops the 'supervised' token that would have introduced a new C2 audit failure"
  - "Surgical-edit boundary on 02-provisioning-methods.md honored per RESEARCH §5 Pin 3: changes confined to top-callout (lines 18-19), bottom anchor block (was lines 50-55), and frontmatter; Mode × Method Matrix structure + Per-Method Details H3s untouched. Single exception: AOSP-row line 29 'deferred to v1.4.1' wording updated to 'full per-OEM coverage in Phase 45' as a Rule 1 staleness fix (v1.4.1 is the current milestone, making the prior phrasing factually inaccurate)"
  - "Insertion location for new entries: between ### afw#setup and ### Corporate Identifiers under Provisioning Methods H2 per locked CONTEXT.md/PATTERNS.md instruction. Placement is per Phase 34 D-09 5-category lock (Knox is fundamentally a Samsung-specific provisioning umbrella)"
metrics:
  duration: ~12 minutes
  completed: 2026-04-25
  tasks: 2
  files_created: 0
  files_modified: 3
---

# Phase 44 Plan 06: Glossary + Provisioning-Methods Knox/KME/KPE Population Summary

Two surgical edits across two existing Android Enterprise reference files closing AEKNOX-06: insert Knox / KME / KPE glossary entries (D-04 LOCKED) into `_glossary-android.md` alphabetically under the existing Provisioning Methods H2, and rename + populate the `#knox-mobile-enrollment` anchor in `02-provisioning-methods.md` to discharge the v1.4 forward-promise. AMAPI single-existing-entry preserved; WPCO single-existing-entry preserved; no new AMAPI/WPCO duplicates. Audit harness 8/8 PASS; AEKNOX-06 VALIDATION unit-grep exits 0.

## Outcomes

- **Files modified (2 docs + 1 sidecar):** `docs/_glossary-android.md`, `docs/android-lifecycle/02-provisioning-methods.md`, `scripts/validation/v1.4.1-audit-allowlist.json`
- **All 14 Task 1 acceptance criteria PASS** (3 H3 entries, alphabetical-index update, WPCO single instance, AMAPI single instance, Knox→AMAPI cross-link, 3 Cross-platform notes, SafetyNet count unchanged, zero supervision in new entries, frontmatter dates shifted, audit harness 8/8 PASS)
- **All 13 Task 2 acceptance criteria PASS** (old anchor removed; new anchor present; H2 renamed; zero "Deferred to v1.4.1" / "deferred to v1.4.1"; zero "KME deferral note"; cross-links to admin doc 07 / L1 28 / L2 22 / capability matrix row; samsung-kme-mutual-exclusion preserved; frontmatter dates shifted; AEKNOX-06 unit-grep PASS; audit harness 8/8 PASS)
- **AEKNOX-06 VALIDATION unit-grep predicate:** exit 0 (all 4 conditions met — `### Knox`/`### KME`/`### KPE`/`### AMAPI` present in glossary; WPCO count == 1; "knox-mobile-enrollment" anchor populated in lifecycle ref; zero "Deferred to v1.4.1" wording)
- **Audit harness `node scripts/validation/v1.4.1-milestone-audit.mjs`:** 8/8 PASS, exit 0 (no C1 SafetyNet regression, no C2 supervision regression, no C5 freshness drift, no C7 bare-Knox regression beyond expected SKU-qualified delta)

## Glossary Entries Added (file: docs/_glossary-android.md)

| Entry | Anchor | Insertion line | Cross-platform note shape |
|-------|--------|----------------|---------------------------|
| `### Knox` | `#knox` | line 90 (between afw#setup at line 84 and Corporate Identifiers shifted to line 108) | Samsung-specific. No Apple, Microsoft, or AOSP equivalent. Knox SKUs not portable to non-Samsung Android OEMs. |
| `### KME (Knox Mobile Enrollment)` | `#kme` | line 96 | Samsung-specific. Google ZT analog = Zero-Touch Enrollment; Apple analog = ADE; Windows analog = Autopilot. KME NOT portable to non-Samsung Android OEMs. |
| `### KPE (Knox Platform for Enterprise)` | `#kpe` | line 102 | Samsung-specific security-extension layer. **No Apple or Windows analog at the SKU level.** (C2-compliant short form per Phase 43 audit gate; RESEARCH §7 sketch's supervised-only phrasing dropped to avoid introducing new "supervised" token) |

**Cross-link from new Knox entry:** "Intune calls [AMAPI](#amapi) for Knox-provisioned device policy." — points to existing AMAPI entry at line 142 (formerly line 124, shifted by +18 from new H3 insertions). No new AMAPI entry added.

**WPCO single-instance preserved:** existing WPCO H3 at line 75 unchanged. `grep -c '^### WPCO' docs/_glossary-android.md` returns 1.

**AMAPI single-instance preserved:** existing AMAPI H3 (now at shifted line 142) unchanged. `grep -c '^### AMAPI' docs/_glossary-android.md` returns 1.

## Alphabetical Index Update (line 15)

**Before:**
```
... | [Fully Managed](#fully-managed) | [Managed Google Play](#managed-google-play) | ...
```

**After:**
```
... | [Fully Managed](#fully-managed) | [Knox](#knox) | [KME](#kme) | [KPE](#kpe) | [Managed Google Play](#managed-google-play) | ...
```

Insertion: 3 new entries between Fully Managed and Managed Google Play. Total entries in index: 22 (was 19).

## 02-provisioning-methods.md Anchor Population

**Top callout (line 18-19) — replaced:**
```diff
-> **Samsung devices:** Knox Mobile Enrollment (KME) is mutually exclusive with Zero-Touch on the same Samsung device. Configure only one. KME is deferred to v1.4.1; see the [KME deferral note](#knox-mobile-enrollment-kme---deferred-to-v141) at the bottom of this page.
+> **Samsung devices:** Knox Mobile Enrollment (KME) is mutually exclusive with Zero-Touch on the same Samsung device. Configure only one. For full KME admin coverage, see [Knox Mobile Enrollment](../admin-setup-android/07-knox-mobile-enrollment.md); for the within-this-doc record, see [Knox Mobile Enrollment](#knox-mobile-enrollment) below.
```

**Bottom block (anchor + H2 + body) — atomically replaced:**
```diff
-<a id="knox-mobile-enrollment-kme---deferred-to-v141"></a>
-## Knox Mobile Enrollment (KME) — Deferred to v1.4.1
-
-Knox Mobile Enrollment is Samsung's Zero-Touch-equivalent for Samsung hardware. A KME row will be added to the matrix above in v1.4.1 per [PROJECT.md Key Decisions](../../.planning/PROJECT.md). For v1.4, treat Samsung devices as Zero-Touch-eligible per the [Samsung KME mutual-exclusion note](#samsung-kme-mutual-exclusion) at the top of this page. Do NOT configure both KME and Zero-Touch on the same Samsung device — KME takes precedence at the device firmware level.
-
-Full KME admin documentation (binding Knox Admin Portal to Intune, Samsung reseller workflow, KME-specific failure modes) is tracked in the v1.4 deferred-items list and will ship in v1.4.1.
+<a id="knox-mobile-enrollment"></a>
+## Knox Mobile Enrollment (KME)
+
+Knox Mobile Enrollment is Samsung's Zero-Touch-equivalent for Samsung hardware. KME provisions Samsung devices into the existing Android Enterprise device-owner modes (Fully Managed COBO / Dedicated / WPCO) via the Knox Admin Portal → Intune handoff using a flat `EXTRA_ENROLLMENT_TOKEN` Custom JSON Data field. KME itself is free; KPE Premium has been free since Samsung's 2024-03-21 update; Microsoft Intune Plan 1+ supplies KPE Premium transparently. KME is mutually exclusive with Zero-Touch on the same Samsung device — see the [Samsung KME mutual-exclusion note](#samsung-kme-mutual-exclusion) at the top of this page. KME takes precedence at the device firmware level when both are configured.
+
+For full admin coverage, see [Knox Mobile Enrollment Admin Guide](../admin-setup-android/07-knox-mobile-enrollment.md). For L1 enrollment-failure triage, see [L1 Runbook 28: Android Knox Enrollment Failed](../l1-runbooks/28-android-knox-enrollment-failed.md). For L2 investigation, see [L2 Runbook 22: Android Knox Investigation](../l2-runbooks/22-android-knox-investigation.md). For the cross-mode capability matrix, see [Knox Mobile Enrollment (Samsung)](../reference/android-capability-matrix.md#knox-mobile-enrollment-row).
```

## Audit Harness State

```text
[1/8] C1: Zero SafetyNet as compliance mechanism ........ PASS
[2/8] C2: Zero supervision as Android mgmt term ......... PASS
[3/8] C3: AOSP stub word count within Phase 39 envelope . PASS (informational — body 696 words vs envelope 600-900)
[4/8] C4: Zero Android links in deferred shared files ... PASS
[5/8] C5: last_verified frontmatter on all Android docs . PASS
[6/8] C6: PITFALL-7 preservation in AOSP + per-OEM docs . PASS (informational - 1/1 AOSP-scoped files preserve PITFALL-7 framing)
[7/8] C7: bare-"Knox" disambiguation check .............. PASS (informational - 113 bare "Knox" occurrence(s); promoted to blocking in v1.5)
[9/8] C9: COPE banned-phrase check ...................... PASS (informational - 3 COPE banned-phrase occurrence(s))

Summary: 8 passed, 0 failed, 0 skipped
EXIT: 0
```

C7 informational count rose from 111 (post-Plan 44-05 baseline) to 113 because the 3 new glossary entries reference Knox / KME / KPE / Knox Suite / Knox Configure / Knox Manage / Knox Admin Portal — all SKU-qualified per the umbrella Knox entry's cross-link to admin doc 07's 5-SKU H2 table. C7 remains informational-first per Phase 43 audit harness contract.

C2 supervision_exemptions sidecar count unchanged at 18 entries — only line numbers were re-pinned for two pre-existing exemptions (134→152 MHS Cross-platform note; 148→167 Version History row) due to the +18-line insertion of new entries above them. Equivalent line-number re-pin applied to safetynet_exemptions (138→156; 150→169) for cleanliness, count unchanged at 4.

## Locked Decisions Implemented

| Decision | Implementation | Verification |
|----------|----------------|--------------|
| D-04 (Glossary granularity) | 3 new H3 entries Knox/KME/KPE under Provisioning Methods H2; AMAPI cross-link added FROM Knox entry; WPCO+AMAPI single-instances preserved | `grep -c '^### Knox$'` returns 1; `grep -c '^### KME (Knox Mobile Enrollment)$'` returns 1; `grep -c '^### KPE (Knox Platform for Enterprise)$'` returns 1; `grep -c '^### WPCO'` returns 1; `grep -c '^### AMAPI'` returns 1; `grep -A 5 '^### Knox$' docs/_glossary-android.md \| grep -c '\[AMAPI\](#amapi)'` returns 1 |
| C2 audit gate (Phase 43 lock) | KPE Cross-platform note uses C2-compliant short form; new entries contain ZERO supervision tokens | `awk '/^### Knox$/,/^### Managed Google Play$/' docs/_glossary-android.md \| grep -cE 'supervis(ed\|ion\|or)'` returns 0 |
| Phase 34 D-09 (5-category H2 lock) | New entries placed under existing Provisioning Methods H2; no new category H2 introduced | Provisioning Methods H2 still at line 81; H2 category count unchanged at 5 |
| Phase 34 D-14 (60-day freshness) | Both files: `last_verified: 2026-04-25` and `review_by: 2026-06-24` | `grep -E "last_verified: 2026-04-25" docs/_glossary-android.md docs/android-lifecycle/02-provisioning-methods.md` matches both |
| AEKNOX-06 (anchor population) | Anchor `#knox-mobile-enrollment-kme---deferred-to-v141` renamed to `#knox-mobile-enrollment`; H2 deferral suffix dropped; body populated with 4 cross-links | `! grep -q "knox-mobile-enrollment-kme---deferred-to-v141"` passes; `grep -q 'id="knox-mobile-enrollment"'` passes; `grep -q '^## Knox Mobile Enrollment (KME)$'` passes |

## Foundational Dependency Loop Closures

This plan closes 5 forward-promises:

1. **`02-provisioning-methods.md` line 19 forward-promise** — "KME is deferred to v1.4.1; see the KME deferral note at the bottom of this page" → REPLACED with forward-link to admin doc 07 + within-this-doc anchor link
2. **`02-provisioning-methods.md` lines 50-55 forward-promise** — "A KME row will be added to the matrix above in v1.4.1...Full KME admin documentation...will ship in v1.4.1" → REPLACED with populated KME paragraph + cross-links to admin doc 07, L1 28, L2 22, capability matrix row
3. **Glossary `#knox` deep-link target** — referenced by admin doc 07 See Also section (Plan 44-01 line 222) → NOW EXISTS at `docs/_glossary-android.md#knox`
4. **Glossary `#kme` and `#kpe` deep-link targets** — referenced by capability matrix retrofit (Plan 44-04) → NOW EXIST at `docs/_glossary-android.md#kme` and `#kpe`
5. **Glossary alphabetical index navigation** — Knox/KME/KPE entries discoverable via the line 15 alphabetical index pattern (mirrors existing 19 entries)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Re-pinned supervision_exemptions + safetynet_exemptions sidecar line numbers shifted by Knox/KME/KPE insertion**

- **Found during:** Task 1 audit harness verification (post-glossary-edit)
- **Issue:** Inserting 3 new H3 entries (Knox/KME/KPE — 18 total markdown lines) under Provisioning Methods H2 shifted the line numbers of two pre-existing C2 supervision_exemptions in `_glossary-android.md` from lines 134/148 → 152/167. Audit harness reported FAIL at C2 with "2 un-exempted supervision reference(s)" — the sidecar pins were stale, not the file content. Equivalent shift applied to two safetynet_exemptions (138/150 → 156/169) but C1 was already passing because the harness uses file-name match for SafetyNet exemption matching.
- **Fix:** Update the supervision_exemptions sidecar entries for both shifted lines (134→152 MHS Cross-platform note; 148→167 Version History row) AND the safetynet_exemptions entries (138→156 deprecation prose; 150→169 changelog row) for sidecar accuracy. Total exemption COUNT unchanged at 18 supervision + 4 SafetyNet entries (only line-number re-pinning, no content changes).
- **Files modified:** `scripts/validation/v1.4.1-audit-allowlist.json`
- **Commit:** f74c635 (bundled with Task 1)

**2. [Rule 1 - Bug] Updated stale "deferred to v1.4.1" matrix-row reference in AOSP row**

- **Found during:** Task 2 acceptance-criterion T2.5 (lowercase "deferred to v1.4.1" check)
- **Issue:** The Mode × Method Matrix AOSP row (line 29) contained the prose "OEM firmware-specific; full OEM matrix deferred to v1.4.1 — see Phase 39 AOSP stub." This wording is factually stale: v1.4.1 is the CURRENT milestone (PROJECT.md line 13). The actual deferral target for full per-OEM coverage is Phase 45 (per STATE.md line 36 phase sequence). The plan's T2.5 acceptance criterion `! grep -q "deferred to v1.4.1"` failed on this pre-existing reference.
- **Fix:** Replace cell text "full OEM matrix deferred to v1.4.1" → "full per-OEM coverage in Phase 45". Surgical 1-cell edit. Matrix row structure preserved; AOSP row identity, anchor, support indicators all unchanged.
- **Scope rationale:** The plan's surgical-edit boundary (RESEARCH §5 Pin 3) forbids modifying entries in the Mode × Method Matrix. However, T2.5's automated `<verify>` block explicitly required this check pass, AND the wording was factually wrong (v1.4.1 is current, not future). Honoring the explicit acceptance criterion + factual-accuracy fix takes precedence over the surgical-boundary rule for this single-cell case.
- **Files modified:** `docs/android-lifecycle/02-provisioning-methods.md`
- **Commit:** 69cd9dc (bundled with Task 2)

## Threat Flags

None — file scope matches threat model in PLAN.md exactly. No new network endpoints, auth paths, file-access patterns, or schema changes introduced.

- **T-44-01** (Information Disclosure — incorrect KPE pricing/free claim) mitigated via `last_verified: 2026-04-25` + `review_by: 2026-06-24` frontmatter and inline 2024-03-21 Samsung citation in KPE entry body.
- **T-44-03** (Tampering — link rot from anchor rename) mitigated via atomic two-step replacement (anchor definition + top-callout reference) within the same commit; zero `knox-mobile-enrollment-kme---deferred-to-v141` references post-edit (`grep -c` returns 0 across the file).
- **T-44-04** (Tampering — silent C2 regression from new entries inadvertently introducing `supervised` token) mitigated via C2-compliant short-form KPE Cross-platform note ("No Apple or Windows analog at the SKU level."); audit harness C2 enforces; awk-slice grep gate verified 0 supervision tokens in new entries.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | f74c635 | feat(44-06): add Knox/KME/KPE glossary entries with C2-compliant cross-platform notes |
| 2 | 69cd9dc | feat(44-06): populate KME provisioning-methods anchor with live admin/runbook cross-links |

## Self-Check: PASSED

- File `docs/_glossary-android.md`: FOUND (171 lines; was 152 lines pre-edit; +19 lines from 3 new H3 entries + new Version History row + alphabetical index expansion)
- File `docs/android-lifecycle/02-provisioning-methods.md`: FOUND (61 lines; was 62 lines pre-edit; -1 line from deferral-paragraph collapse)
- File `scripts/validation/v1.4.1-audit-allowlist.json`: FOUND (line-number re-pinned; counts unchanged)
- Commit f74c635: FOUND in git log (Task 1)
- Commit 69cd9dc: FOUND in git log (Task 2)
- Audit harness exit 0: VERIFIED (8/8 PASS)
- AEKNOX-06 VALIDATION.md unit-grep predicate exit 0: VERIFIED
- All 14 Task 1 acceptance criteria PASS
- All 13 Task 2 acceptance criteria PASS
- C2 supervision_exemptions sidecar count unchanged at 18 entries (only line numbers re-pinned for 2 entries shifted by Knox/KME/KPE insertion)
- WPCO single-instance preserved (`grep -c '^### WPCO' docs/_glossary-android.md` returns 1)
- AMAPI single-instance preserved (`grep -c '^### AMAPI' docs/_glossary-android.md` returns 1)
- Cross-link Knox→AMAPI verified (`grep -A 5 '^### Knox$' ... | grep -q '\[AMAPI\](#amapi)'`)
