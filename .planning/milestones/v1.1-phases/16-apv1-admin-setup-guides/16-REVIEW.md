---
status: issues_found
phase: 16-apv1-admin-setup-guides
depth: standard
files_reviewed: 11
findings:
  critical: 0
  warning: 5
  info: 1
  total: 6
---

# Phase 16 Review: APv1 Admin Setup Guides

Reviewed all 11 files in `docs/admin-setup-apv1/`. All relative links resolve to existing files. Frontmatter is consistent across all 11 files. Version gate blockquote present in all files. Navigation chain correct (00->01->02->03->04->05->06->07->08->09->10->00).

## Warnings

### WR-1: Wrong runbook for "Hide change account options" in deployment profile

- File: `docs/admin-setup-apv1/02-deployment-profile.md`
- Issue: Links to `03-profile-not-assigned.md` but the failure (setting silently ignored without branding) is an OOBE behavior problem, not profile assignment.
- Fix: Change to `[OOBE Failure](../l1-runbooks/05-oobe-failure.md)`

### WR-2: Wrong runbook for "Device name template > 15 chars" in deployment profile

- File: `docs/admin-setup-apv1/02-deployment-profile.md` and `docs/admin-setup-apv1/10-config-failures.md`
- Issue: Links to `03-profile-not-assigned.md` but symptom is "enrollment fails" which is an OOBE failure.
- Fix: Change to `[OOBE Failure](../l1-runbooks/05-oobe-failure.md)` in both files.

### WR-3: Missing "OEM registration" row in consolidated config failures

- File: `docs/admin-setup-apv1/10-config-failures.md`
- Issue: `01-hardware-hash-upload.md` has a "Missing OEM registration" row absent from the consolidated table.
- Fix: Add row to Hardware Hash Upload Failures section.

### WR-4: Missing "Convert all devices" row in consolidated config failures

- File: `docs/admin-setup-apv1/10-config-failures.md`
- Issue: `02-deployment-profile.md` has a "Convert all devices = Yes" row absent from the consolidated table.
- Fix: Add row to Deployment Profile Failures section.

### WR-5: Missing "IE Enhanced Security" row in consolidated config failures

- File: `docs/admin-setup-apv1/10-config-failures.md`
- Issue: `09-intune-connector-ad.md` has an "IE Enhanced Security Config" row absent from the consolidated table.
- Fix: Add row to Intune Connector Failures section.

## Info

### IR-1: No Configuration-Caused Failures section in modes overview

- File: `docs/admin-setup-apv1/05-deployment-modes-overview.md`
- Issue: Intentional per D-08 -- this is a comparison/index page, not a configuration page.
- Fix: No action needed (documented as intentional).
