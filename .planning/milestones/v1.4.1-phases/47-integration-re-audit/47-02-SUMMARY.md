---
phase: 47-integration-re-audit
plan: "02"
subsystem: validation-harness
tags: [harness-extension, sidecar-json, audit, C4, C6, C7, C9, AEINTEG-02]
dependency_graph:
  requires:
    - 47-01 (AEINTEG-01 surgical re-canonicalization — no shared files)
  provides:
    - Extended C4 regex (24 tokens) catches Knox/KME/per-OEM/COPE links in deferred files
    - Expanded C6 targets (6 AOSP-scoped files) for PITFALL-7 preservation check
    - Expanded C7 suffix list (11 forms) for 5-SKU Knox disambiguation
    - Extended C9 sidecar cope_banned_phrases[] (8 patterns) for Phase 46 D-31 banned set
  affects:
    - 47-04 (terminal re-audit reads updated harness + sidecar; must run after this plan lands)
tech_stack:
  added: []
  patterns:
    - Additive-only sidecar JSON extension (Phase 43 D-26)
    - Regex alternation expansion with fixed token list (no unbounded quantifiers — T-47-02-01 low risk)
    - Informational-first check scope expansion without severity promotion (Phase 42 D-29 / CONTEXT D-10)
key_files:
  created: []
  modified:
    - scripts/validation/v1.4.1-milestone-audit.mjs
    - scripts/validation/v1.4.1-audit-allowlist.json
decisions:
  - "CONTEXT D-07: paste C4/C6/C7 literals verbatim per locked token lists — no discretion"
  - "CONTEXT D-10: C6/C7/C9 stay informational-first; scope expanded but severity not promoted"
  - "CONTEXT D-31: cope_banned_phrases[] additive-only; 'removed' preserved even though not in Phase 46 D-31 named set"
  - "CONTEXT D-33: v1.4 harness frozen at 3c3a140 — only v1.4.1 versions edited"
metrics:
  duration_seconds: 169
  completed_date: "2026-04-25"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
  files_created: 0
---

# Phase 47 Plan 02: AEINTEG-02 Harness Extensions Summary

**One-liner:** Four-extension atomic close of AEINTEG-02 — C4 regex (8→24 tokens), C6 targets (1→6 AOSP files), C7 suffix list (5→11 Knox-SKU forms), C9 sidecar cope_banned_phrases[] (3→8 Phase-46-D-31 patterns).

## What Was Built

Closed AEINTEG-02 by applying four precisely-specified literal edits to the v1.4.1 audit harness and its sidecar JSON. All edits are scope expansions only — no severity promotions, no new checks, no C9 run() function body changes.

### Concrete Diff Summary

| Check | File | Change | Before | After |
|-------|------|--------|--------|-------|
| C4 regex | `v1.4.1-milestone-audit.mjs` line 228 | Token alternation expansion | 8 tokens (android..amapi) | 24 tokens (+knox|kme|kpe|realwear|zebra|pico|htc-vive-focus|meta-quest|cope-full-admin|aosp-realwear|aosp-zebra|aosp-pico|aosp-htc-vive-focus|aosp-meta-quest|aosp-oem-matrix) |
| C6 targets | `v1.4.1-milestone-audit.mjs` lines 293-300 | Array expansion + placeholder removal | 1 file (06-aosp-stub.md) + placeholder comment | 6 files (06 + 09-realwear + 10-zebra + 11-pico + 12-htc-vive-focus + 13-meta-quest); comment removed |
| C7 suffixes | `v1.4.1-milestone-audit.mjs` line 318 | Suffix regex alternation expansion | 5 forms (Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure) | 11 forms (+KPE|KME|KPE Standard|KPE Premium|on-device attestation|Mobile Enrollment Portal) |
| C9 sidecar | `v1.4.1-audit-allowlist.json` lines 31-40 | Array additive extension | 3 patterns (deprecated/end of life/removed) | 8 patterns (+EOL/no longer supported/obsolete/sunset/retired) |

### Harness Verbose Output Post-Edit

```
[1/8] C1: Zero SafetyNet as compliance mechanism ........ PASS
[2/8] C2: Zero supervision as Android mgmt term ......... PASS
[3/8] C3: AOSP stub word count within Phase 39 envelope . PASS (informational — Phase 39 self-certification; body 596 words vs envelope 600-900)
[4/8] C4: Zero Android links in deferred shared files ... PASS
[5/8] C5: last_verified frontmatter on all Android docs . PASS
[6/8] C6: PITFALL-7 preservation in AOSP + per-OEM docs . PASS (informational - 6/6 AOSP-scoped files preserve PITFALL-7 framing)
[7/8] C7: bare-"Knox" disambiguation check .............. PASS (informational - 99 bare "Knox" occurrence(s); promoted to blocking in v1.5)
[9/8] C9: COPE banned-phrase check ...................... PASS (informational - 4 COPE banned-phrase occurrence(s))

Summary: 8 passed, 0 failed, 0 skipped
```

Exit code: 0. 5 blocking PASS (C1-C5) + 3 informational PASS-by-design (C6/C7/C9).

**C6:** 6/6 AOSP-scoped files preserve PITFALL-7 framing — all five per-OEM admin guides (09-13) plus the AOSP stub (06) confirmed.

**C7:** 99 bare "Knox" occurrences with 11-form suffix list. The expanded suffix list (including KPE, KME, KPE Standard, KPE Premium, on-device attestation, Mobile Enrollment Portal) means legitimate Phase 44 D-01 5-SKU mentions are no longer counted as "bare."

**C9:** 4 COPE banned-phrase occurrences with 8-pattern set. Informational reporter format unchanged (hits-only count per CONTEXT D-11).

## AEINTEG-02 Closure Evidence

- C4 regex at line 228 contains all 24 D-07 tokens (grep check 5: 6 lines match — C4 line + C7 has knox/kme/kpe in suffix + per-OEM paths in C6 + targets array)
- C6 targets array at lines 293-300 contains exactly 6 file paths; placeholder comment "Phase 45 will add per-OEM files here" removed (grep check 6: 5 per-OEM paths confirmed)
- C7 suffix list at line 318 contains 11 forms including "Mobile Enrollment Portal" (grep check 7: confirmed)
- C9 sidecar `cope_banned_phrases[]` length = 8 (node parse check: confirmed)
- Harness exits 0 (check 1: confirmed)
- v1.4 frozen files untouched: `v1.4-milestone-audit.mjs` empty diff + `v1.4-audit-allowlist.json` empty diff (checks 3, 4: confirmed)

## Atomic Commits

| Task | Commit | Files | Description |
|------|--------|-------|-------------|
| Task 1 — Harness code edits | `342ceb2` | `v1.4.1-milestone-audit.mjs` | C4 regex (24 tokens), C6 targets (6 files), C7 suffix list (11 forms) |
| Task 2 — Sidecar extension | `613bba5` | `v1.4.1-audit-allowlist.json` | cope_banned_phrases[] 3→8 patterns (additive-only) |

## Verification of v1.4 Frozen Files

```
git diff --stat scripts/validation/v1.4-milestone-audit.mjs  → (empty — frozen at 3c3a140)
git diff --stat scripts/validation/v1.4-audit-allowlist.json → (empty — frozen v1.4 baseline)
```

Both frozen files are byte-identical to their pre-plan state. D-33 invariant preserved.

## Invariants Preserved

- **Phase 43 D-01/D-02 freeze:** `v1.4-milestone-audit.mjs` at commit `3c3a140` — zero diff
- **Phase 43 D-26 additive-only:** `cope_banned_phrases[]` append-only; `supervision_exemptions[]` and `safetynet_exemptions[]` untouched
- **CONTEXT D-10 + D-38 informational-first:** C6/C7/C9 remain `informational: true`; no severity promotions
- **CONTEXT D-09 C8 rejection:** No C8 check added
- **CONTEXT D-11 C9 reporter format:** Hits-only count unchanged; no file:line surfacing
- **Phase 42 D-25 no-shared-module:** File-reads-only contract honored; no new imports or shared modules
- **CONTEXT D-07 verbatim literals:** All three harness literals pasted exactly per locked token lists

## Deviations from Plan

None — plan executed exactly as written. All four edits applied verbatim per `<interfaces>` EDIT 1-4 AFTER blocks. No auto-fixes were needed.

## Known Stubs

None. Both files are functional validation infrastructure with no stub data paths.

## Threat Flags

None. No new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries introduced. T-47-02-03 mitigated: frozen predecessor `v1.4-milestone-audit.mjs` confirmed untouched.

## Self-Check: PASSED

- `scripts/validation/v1.4.1-milestone-audit.mjs` — FOUND (modified)
- `scripts/validation/v1.4.1-audit-allowlist.json` — FOUND (modified)
- Commit `342ceb2` — FOUND (git log confirmed)
- Commit `613bba5` — FOUND (git log confirmed)
- Harness exit 0 with 8/8 PASS — VERIFIED
- v1.4 frozen files empty diff — VERIFIED
- cope_banned_phrases.length = 8 — VERIFIED
- safetynet_exemptions.length = 4 (untouched) — VERIFIED
- supervision_exemptions.length = 18 (untouched) — VERIFIED
