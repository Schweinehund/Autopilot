---
phase: 64-apple-business-delegation-runbooks
reviewed: 2026-05-22T00:00:00Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - docs/cross-platform/apple-business/11-vpp-catalog-runbook.md
  - docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
  - docs/cross-platform/apple-business/13-device-release-runbook.md
  - docs/cross-platform/apple-business/14-device-transfer-runbook.md
  - docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md
  - docs/cross-platform/apple-business/16-managed-apple-account-runbook.md
  - docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md
  - docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md
  - scripts/validation/check-phase-64.mjs
findings:
  critical: 1
  warning: 3
  info: 3
  total: 7
status: issues_found
---

# Phase 64: Code Review Report

**Reviewed:** 2026-05-22
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Eight Apple Business delegation runbooks (11-18) and one Node.js ESM validator
(`check-phase-64.mjs`) were reviewed. The runbooks are generally well-structured,
correctly scope Apple Business vs. Intune responsibilities, and faithfully apply
the OP-1/OP-2/OP-3 constraint patterns from the earlier corpus. The C15 framing guard
exemption system (ABAUDIT comments) is correctly threaded throughout.

One critical operational error was found in `12-shared-ipad-passcode-reset.md`: the
Path C gate condition requires "Path B has been attempted and failed", but Path B is
explicitly documented in the same file as targeting the wrong credential layer for
the Shared iPad partition passcode problem. This creates a dangerous trap where an
admin issues a useless MDM ClearPasscode command before erasing a device. Three
warnings concern: a missing `[ASSUMED]` marker on the OIDC scope names in `16-`,
an ambiguous OP-6 pre-release checklist item that could mislead, and an out-of-order
ABAUDIT comment numbering in `18-` that risks future maintenance errors. Three info
items cover cosmetic validator issues and minor documentation gaps.

---

## Critical Issues

### CR-01: Path C gate requires "Path B attempted and failed" — Path B is wrong-layer for this scenario

**File:** `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md:146`

**Issue:** The OP-11 hard-bordered callout lists three conditions that must all be true
before Path C (EraseDevice) is used. Condition 2 is:

> "Path B (MDM ClearPasscode) has been attempted and failed"

But the body of Path B (lines 100-127) explicitly states:

> "Path B does NOT reset the per-user Shared iPad partition passcode."
> "it will NOT resolve a Shared iPad partition passcode problem — it targets the wrong credential layer."

The runbook also correctly documents that MDM ClearPasscode resets the device-level
screen lock — not the partition passcode. Requiring an admin to "attempt Path B first"
for a partition passcode problem therefore:

1. Instructs them to issue an MDM ClearPasscode command that does nothing for the
   actual problem (the partition passcode is unaffected).
2. After ClearPasscode completes without error (it will "succeed" at clearing the
   device-level lock), the admin must interpret this as "Path B failed" — but the
   MDM action technically succeeded, just on the wrong credential. The semantics of
   "failed" are ambiguous.
3. Creates a path where a working MDM command (ClearPasscode) is issued unnecessarily
   to a Shared iPad, potentially clearing a device-level passcode that IT policy set
   intentionally.

The gate condition directly contradicts the anti-feature warning in the same document.
An admin following the OP-11 gate literally will be misled into issuing a wrong-layer
MDM command before the destructive EraseDevice.

**Fix:** Remove the "Path B attempted and failed" gate condition. It is operationally
wrong for the Shared iPad partition passcode use case. Replace with a condition that
reflects why Path A might be unavailable. Corrected callout condition 2:

```markdown
> Only use Path C when:
> - Path A (Apple Business UI) is unavailable (portal outage, account lockout, or
>   the target user's Managed Apple Account cannot be located) AND
> - Path B (MDM ClearPasscode) is NOT applicable — it targets the device-level
>   screen lock, not the per-user partition passcode (see Path B anti-feature
>   warning above) AND
> - Data loss on all Shared iPad user partitions has been explicitly accepted by the
>   device owner and an L2 admin has approved the action.
```

---

## Warnings

### WR-01: OIDC scopes `ssf.manage` and `ssf.read` are unverified and non-standard — missing `[ASSUMED]` marker

**File:** `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md:193`

**Issue:** Step 3 of the Path C OIDC configuration procedure instructs an IT
administrator to grant Entra application scopes `ssf.manage` and `ssf.read`:

> "grant the required scopes: `ssf.manage` and `ssf.read`"

The scope names `ssf.manage` and `ssf.read` are not standard Microsoft Graph or
Apple-published OIDC scope names. The `ssf` prefix does not correspond to a
well-known Microsoft Identity Platform resource. Apple's published documentation
for OIDC federation with Microsoft Entra ID (reference axm8c1cac980 cited in the
doc) does not use these scope names. The actual required Entra application
permissions for Apple Business OIDC federation involve Microsoft Entra directory
permissions, not `ssf.*` scopes.

The same unverified scopes are repeated in the Verification table at line 319.

While the broader training-data notice at the top of the file covers step sequences
generally, specific technical claims like OAuth scope names need explicit
`[ASSUMED]` or `[CITED: training; needs live verification]` markers — especially
for a step that would fail silently if the wrong scopes are configured (the OIDC
integration would not work, but the Entra app registration would accept any scope
name without error).

An IT administrator following this step literally and configuring `ssf.manage` /
`ssf.read` in Entra may end up with a non-functional OIDC federation with no clear
error from Entra.

**Fix:** Add explicit uncertainty markers to the scope names and add a note directing
to the authoritative Apple Support document for verification:

```markdown
| 3 | In Microsoft Entra ID, register the Apple Business OIDC application and grant
the required scopes | IT administrator | `[ASSUMED — scope names need live
verification against Apple Support axm8c1cac980; configured scopes may differ
from training-data knowledge; verify against the live Apple Business OIDC setup
guide before deployment]` |
```

Also update line 319 in the Verification table to carry the same `[ASSUMED]` marker
rather than stating the scope names as fact.

---

### WR-02: OP-6 pre-release checklist item "no other admin's MDM scope covers this device" is operationally ambiguous

**File:** `docs/cross-platform/apple-business/13-device-release-runbook.md:93-94`

**Issue:** The OP-6 pre-release checklist contains the item:

> "No other admin's MDM scope covers this device (coordinate first)"

In Apple Business, "MDM scope" is not a user-visible concept in the same way it is
in Intune. What an admin can check is: which MDM server the device is assigned to,
and which OU the device is in. The checklist item as written is ambiguous about:

1. Whether "MDM scope" refers to the Apple Business OU assignment, the MDM server
   assignment, or Intune RBAC scope tags (Intune-side, not checkable in Apple Business).
2. How to "coordinate" — there is no Apple Business mechanism to see which other admins
   have access to a device; OU membership determines this implicitly.

An admin executing the checklist may not know what to check or who to coordinate with.

**Fix:** Replace the ambiguous item with a concrete, checkable action:

```markdown
> - [ ] Confirmed with the tenant IT administrator that no other OU or cross-OU
>       operation (transfer, MDM server reassignment) is in-flight for this device
>       (check Apple Business Activity log for recent device events by serial number)
```

---

### WR-03: ABAUDIT comment numbering is non-sequential in `18-cross-org-boundary-cheat-sheet.md` — maintenance trap

**File:** `docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md:42-56`

**Issue:** The ABAUDIT exemption comments in file 18 are numbered out of sequential
order. The sequence is: ABAUDIT-17, ABAUDIT-18, ABAUDIT-19, ABAUDIT-20,
**ABAUDIT-23**, ABAUDIT-21, ABAUDIT-22. The jump from 20 to 23 and then back to
21, 22 means:

1. The version history entry says "ABAUDIT-17..ABAUDIT-22 exemptions" — this omits
   ABAUDIT-23, which is actually present in the file but not mentioned in the history.
2. A future editor searching for ABAUDIT-23 in the sequence would not find it where
   expected (between 20 and 24), making it easy to accidentally delete when renumbering
   or to miss when auditing which content lines are exempted.
3. The V-64-10 validator's allowlist logic relies on the ABAUDIT comment immediately
   preceding the exempted line (`i` and `i+1`). If a maintainer notices the gap and
   tries to "fix" the numbering by renumbering ABAUDIT-23 to ABAUDIT-21 and shifting
   21/22 to 22/23, the content lines are not affected — but the renumbering creates
   a confusing diff and audit trail gap.

The validator passes because it only checks for the `<!-- ABAUDIT-\d+: -->` pattern,
not for sequential ordering. This is a correctness latent defect in the documentation
maintenance model, not the validator.

**Fix:** Renumber ABAUDIT-23 at line 52 to ABAUDIT-21b or insert it logically after
ABAUDIT-20 as ABAUDIT-20a to preserve sequence, then update the version history entry
to list all ABAUDIT numbers present. Alternatively, leave the numbering as-is and
update the version history to explicitly list: "ABAUDIT-17, 18, 19, 20, 21, 22, 23".

---

## Info

### IN-01: `check-phase-64.mjs` `padLabel` function — label padding has no visible effect for any real check

**File:** `scripts/validation/check-phase-64.mjs:344-348`

**Issue:** The `padLabel` function is intended to right-pad check label strings with
dots to a fixed width of 60 characters so PASS/FAIL/SKIPPED tokens are column-aligned.
However, all `prefix` strings constructed at line 355 follow the pattern
`[checkId/N] <long check name>` where the check name alone is typically 50-90 characters
before counting the `[id/N]` prefix. Every real prefix string exceeds 60 characters,
so the condition `s.length >= LABEL_WIDTH` is always true and the function always
returns `s + ' '` — no dot-padding ever fires. The output is functional but
unformatted.

**Fix:** Either remove `padLabel` and use direct string concatenation with a single
space separator, or increase `LABEL_WIDTH` to a value that would actually produce
alignment (e.g., 120). The current value of 60 is a dead code path for all inputs
in this script.

---

### IN-02: `16-managed-apple-account-runbook.md` `platform:` frontmatter lists only `ios+macos` — Shared iPad (iPadOS) omitted

**File:** `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md:6`

**Issue:** The frontmatter declares `platform: ios+macos`. The runbook body explicitly
covers Managed Apple Accounts for **Shared iPad** deployments (line 220, line 336
cross-reference to `12-shared-ipad-passcode-reset.md`, and the SCIM-vs-OIDC table
notes "Shared iPad pre-staging required"). Shared iPad runs iPadOS. While iOS and
iPadOS are closely related, the other runbooks in this phase that cover Shared iPad
scenarios declare `platform: ios+ipados+macos+tvos` (e.g., file 12) or at minimum
`ios+macos+shared-ipad` (file 12 frontmatter).

An admin filtering the documentation directory by `platform: ipados` would not find
this runbook, potentially missing the critical SCIM requirement for Shared iPad
pre-staging (line 220).

**Fix:** Update frontmatter to `platform: ios+ipados+macos` to accurately reflect
that iPadOS (Shared iPad) accounts are in scope.

---

### IN-03: `17-audit-log-scoping-runbook.md` cross-references omit `14-device-transfer-runbook.md` from the "Author-Scope vs Target-Scope" section's local callout — only in Cross-References footer

**File:** `docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md:119`

**Issue:** The "Ghost Device" example in section "Author-Scope vs Target-Scope" (line
92-105) describes a cross-OU transfer as the canonical scenario for audit visibility
gaps. The OU-A admin best-practice note at line 118 says:

> "See [14-device-transfer-runbook.md](14-device-transfer-runbook.md) for the
> cross-OU transfer pre-checklist..."

This inline forward-link is correct. However, the note references the pre-checklist
as including "notifying the device user and confirming enrollment profile compatibility"
— but file 14's pre-checklist (lines 108-119) does include device-user notification,
it does NOT include "notifying the OU-B admin directly" (which is what line 118 of
file 17 is actually recommending). The forward-link is slightly misleading: it implies
the pre-checklist already handles OU-B notification, but that's a recommendation in
file 17 that is not in file 14's checklist.

**Fix:** Make the best-practice note self-contained rather than delegating to file 14
for the OU-B notification guidance:

```markdown
> **Note (OU-A admin best practice):** When performing cross-OU transfers, notify the
> OU-B admin directly and document the transfer reason in a ticket or change record.
> The Apple Business audit log alone is insufficient for OU-B's visibility. For the
> full pre-transfer checklist (VPP, enrollment profile, device-user notification),
> see [14-device-transfer-runbook.md](14-device-transfer-runbook.md).
```

---

_Reviewed: 2026-05-22_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
