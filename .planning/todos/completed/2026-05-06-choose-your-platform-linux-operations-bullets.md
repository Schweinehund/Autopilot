---
created: 2026-05-06T11:32:07.978Z
title: Add Linux + Operations bullets to docs/index.md "Choose Your Platform" jump-link list
area: docs
files:
  - docs/index.md:16-22
source: gsd-verifier informational observation at Phase 59 close
phase_origin: 59
target_phase: 61 (gap closure) or v1.6 cleanup
---

## Problem

The "Choose Your Platform" jump-link list at `docs/index.md` lines 16-22 is incomplete after Phase 59. It currently lists 5 bullets:

- Windows Autopilot
- macOS Provisioning
- iOS/iPadOS Provisioning
- Android Enterprise Provisioning
- Cross-Platform References

But Phase 59 added two new H2 sections to the hub that are NOT represented in the jump-link list:

1. `## Linux Provisioning` (added by Plan 59-02 at line 199; Service Desk L1 / Desktop Engineering L2 / Admin Setup sub-tables)
2. `## Operations` (added by Plan 59-04 at line 231; Co-Management / Patch & Update Management / App Lifecycle Automation / Compliance Drift Detection + Tenant Migration sub-H3s)

Hub admins can scroll to find both sections and the H2 anchors resolve correctly (`#linux-provisioning` and `#operations`), but the jump-link convenience pattern at the top of the page is incomplete relative to the body content.

**Why this slipped Phase 59 scope:** No D-NN decision in `59-CONTEXT.md` mandated updating the Choose Your Platform list. SC#1 (ROADMAP:373) is satisfied by the H2 sections existing — the jump-link list is a UX convenience layer, not a verbatim SC obligation. V-59-NN assertions in `check-phase-59.mjs` test for H2 presence, not jump-link parity. The gsd-verifier flagged this as informational at Phase 59 close (commit `f7b13eb`).

## Solution

Append 2 bullets to the existing list at `docs/index.md:21-22` (after the Android Enterprise bullet, before Cross-Platform References):

```markdown
- [Linux Provisioning](#linux-provisioning) -- Linux device provisioning via Microsoft Intune Linux client (Ubuntu 22.04 / 24.04 LTS, intune-portal package, web-app conditional access)
- [Operations](#operations) -- Cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration)
```

Also update the platform-coverage blockquote at `docs/index.md:9` from `Windows Autopilot..., macOS ADE, and iOS/iPadOS provisioning` to mention Linux + Operations as appropriate.

**Routing options:**
- **Phase 61 gap closure** — `/gsd-plan-phase 61` is in scope for "Gap Closure + Terminal Re-Audit + Milestone Close"; this is a natural fit and lands inside v1.5 milestone close.
- **v1.6 cleanup phase** — defer to next milestone if Phase 61 scope is already locked.

Either path requires a 1-task plan (~5 minutes execution). Append-only contract honored (existing 5 bullets preserved byte-identical; new bullets appended). No validator update needed (Phase 59 V-59-NN assertions don't test jump-link list).

## Verification post-fix

After the bullet additions:
- `grep -c "linux-provisioning" docs/index.md` returns ≥ 2 (jump-link + H2 anchor target)
- `grep -c "#operations" docs/index.md` returns ≥ 2
- `node scripts/validation/check-phase-59.mjs --verbose` exits 0 (V-59-NN assertions remain green; no regression)
- `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0
