---
phase: 63
plan: "04"
subsystem: apple-business-docs
tags: [apple-business, shared-ipad, apple-tv, lifecycle, ou-scoping]
dependency_graph:
  requires: [63-01, 63-02, 63-03]
  provides: [OU-07, OU-08, Wave-B-anchor-09, Wave-B-anchor-10]
  affects: [Phase 64 runbook authoring Wave B unlock]
tech_stack:
  added: []
  patterns:
    - Hard-bordered OP-12 callout (mandatory pre-deployment gate, not hedged)
    - Note-style OP-15 heuristic (LOW severity, not hard-bordered)
    - Configurator-only retail enrollment path documentation
    - Content-token OU-scoped app deployment lifecycle
    - Training-data-notice pattern on portal-label references
key_files:
  created:
    - docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md
    - docs/cross-platform/apple-business/10-apple-tv-lifecycle.md
  modified: []
decisions:
  - "OP-12 Find My disable documented as mandatory blocking pre-deployment gate — NOT hedged (D-04 HIGH severity decision)"
  - "OP-15 CRD heuristic delivered as Note-style callout; per-OU CRD deep-dive deferred to v1.7+ with tracking note (D-04 LOW severity decision)"
  - "## Which admin owns this pool? heading NOT placed in 09- (it lives in 05-sub-org-admin-onboarding.md per PLAN.md constraint)"
  - "PATTERNS.md §09- contained stale C16-anchor guidance; PLAN.md accepted as authoritative — anchor belongs in 05- only"
metrics:
  duration: "~15 minutes"
  completed: "2026-05-21"
  tasks_completed: 2
  tasks_total: 2
  files_created: 2
  files_modified: 0
---

# Phase 63 Plan 04: Shared iPad + Apple TV Lifecycle Docs Summary

**One-liner:** Shared iPad 5-stage lifecycle with mandatory OP-12 Find My disable gate + Apple TV Configurator-only retail enrollment path, content-token deployment, and OP-15 CRD shared-physical-space heuristic.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author 09-shared-ipad-lifecycle.md (OU-07) | 2339e54 | docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md |
| 2 | Author 10-apple-tv-lifecycle.md (OU-08) | b3adba9 | docs/cross-platform/apple-business/10-apple-tv-lifecycle.md |

## What Was Built

### 09-shared-ipad-lifecycle.md (OU-07)

Shared iPad lifecycle document covering five stages at full documented depth per D-04:

1. **Enrollment** — supervised ADE only; prerequisites including OU MDM server configuration
2. **Session Configuration** — MDM profile settings for multi-user mode (max sessions, timeout, domain restriction, guest disable)
3. **User Provisioning** — three paths: manual portal entry, SCIM (tenant-level op), OIDC+JIT (tenant-level op); per-OU account scope assignment
4. **Sign-in / Sign-out** — session residency model, eviction behavior, admin-forced sign-out via MDM Log Out User command
5. **Wipe / Re-provision** — MDM erase + ADE re-enrollment; pre-wipe checklist; decommission path

**OP-12 Find My disable:** Hard-bordered `> **Critical (OP-12):**` callout, modeled on `01-role-permission-model.md:39-58` OP-2 style. Documents both new-device (never activate with personal Apple ID) and previously-used device (verify Sign Out + Find My OFF) paths. Explicitly not hedged — labeled mandatory, pre-deployment, blocking gate.

### 10-apple-tv-lifecycle.md (OU-08)

Apple TV lifecycle document covering the full documented surface per D-04:

- **Configurator-only retail path** — explains why retail Apple TVs do not support ADE (serial number not pre-registered) and provides the 5-step Configurator enrollment workflow
- **OU assignment** — one OU per device, depth ≤ 2 per D-06, OU transfer procedure pointer
- **Content-token app deployment** — 3-step flow: verify token, purchase licenses via Apps and Books, assign via MDM; OU scope boundary documented
- **OP-15 CRD heuristic** — `> **Note:**` style (LOW severity, not hard-bordered). "Assign to the OU that owns the primary physical space" heuristic with explicit note that OU membership does not control AirPlay access
- **Per-OU CRD deep-dive deferral** — explicit v1.7+ deferral note with tracking reference to `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (logged at Phase 66 per plan)
- **Wipe/re-provision** — notes that retail Apple TV re-enrollment requires Configurator again (not automatic ADE re-enrollment)

## Deviations from Plan

### PATTERNS.md §09- C16 Anchor Conflict (ruled by PLAN.md)

**Found during:** Task 1 pre-read

**Issue:** `63-PATTERNS.md` §09-shared-ipad-lifecycle.md contained guidance stating that `## Which admin owns this pool?` is a "C16 MANDATORY anchor heading" that must appear in `09-`. However, `63-04-PLAN.md` explicitly states "Do NOT place the `## Which admin owns this pool?` heading here (it belongs in 05-)," the CONTEXT.md §interfaces repeats "NOTE: the C16 `## Which admin owns this pool?` anchor lives in 05-sub-org-admin-onboarding.md (Plan 63-02), NOT here," and the acceptance criteria verify the heading is ABSENT.

**Resolution:** PLAN.md accepted as authoritative (PATTERNS.md is pre-planning draft guidance; the PLAN.md overrides it when they conflict). The heading was NOT placed in `09-`. Verification of `05-sub-org-admin-onboarding.md` confirmed it already contains the `## Which admin owns this pool?` heading at line 177.

**Rule applied:** [Rule 1 - Conflict resolution — PLAN.md over PATTERNS.md draft guidance]

## Verification

### Task-Level Automated Checks

Both task `<verify>` commands exited 0:

- `09-shared-ipad-lifecycle.md`: contains `OP-12`, matches `/Find My/i`, matches `/mandatory|pre-deployment|blocking/i`, passes C15 (no Intune/Entra/Conditional Access/Azure AD)
- `10-apple-tv-lifecycle.md`: matches `/Configurator/i`, contains `Conference Room Display`, matches `/content token/i`, matches `/defer|v1.7/i`, passes C15

### Overall Audit Harness

`node scripts/validation/v1.6-milestone-audit.mjs` exited 0:
- 15 passed, 0 failed, 0 skipped
- C14 (rebrand-statement), C15 (Intune-delegation anti-pattern), C16 (4-edge cross-link triangle) — all PASS

## Known Stubs

None. All training-data-notice sections use `[CITED: training; needs live verification]` markers rather than stub patterns — these are explicit documentation of knowledge provenance, not placeholder stubs. The 60-day re-verification target (by 2026-07-20) applies.

## Threat Flags

None. Both files are static markdown documentation deliverables with no network endpoints, no executable code, and no auth paths introduced. OP-12 Find My disable gate is fully documented as mandatory (content integrity maintained).

## Self-Check: PASSED

- [x] `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md` — FOUND
- [x] `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md` — FOUND
- [x] Commit 2339e54 — VERIFIED (09- task commit)
- [x] Commit b3adba9 — VERIFIED (10- task commit)
- [x] OP-12 Find My callout present in 09- as hard-bordered Critical callout — VERIFIED
- [x] `## Which admin owns this pool?` NOT in 09- or 10- — VERIFIED
- [x] OP-15 CRD heuristic as Note-style in 10- — VERIFIED
- [x] Per-OU CRD deep-dive deferred with v1.7+ tracking note in 10- — VERIFIED
- [x] C15 clean on both files — VERIFIED (v1.6-milestone-audit.mjs exit 0)
- [x] `platform: ios+shared-ipad` frontmatter in 09- — VERIFIED
- [x] `platform: apple-tv` frontmatter in 10- — VERIFIED
