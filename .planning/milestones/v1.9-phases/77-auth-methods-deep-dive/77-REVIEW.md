---
phase: 77-auth-methods-deep-dive
reviewed: 2026-06-21T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - docs/admin-setup-macos/08-auth-methods-deep-dive.md
  - docs/v1.9-DEFERRED-CLEANUP.md
  - docs/admin-setup-macos/00-overview.md
findings:
  critical: 1
  warning: 2
  info: 2
  total: 5
status: issues_found
---

# Phase 77: Code Review Report

**Reviewed:** 2026-06-21T00:00:00Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Three files reviewed: guide 08 (auth methods deep-dive), v1.9-DEFERRED-CLEANUP.md, and 00-overview. The guide is structurally sound — the critical FileVault/cold-boot behavior is correctly stated in one canonical location and cross-referenced elsewhere without restating, the SE Key Destruction Warning is accurate, the Touch ID no-password-fallback lockout is clearly warned, Smart Card prerequisite ordering is correct, and the NewUserAuthorizationMode key literal is correctly omitted with PSSO-11/PSSO-FUT-01 tracking in the deferred cleanup file. Link integrity is good: guide 07 and glossary anchors (`#platform-sso`, `#secure-enclave`, `#enterprise-sso-plug-in`, `#entra-id-sso`) all resolve; guide 09 appears as a code-span, not a live link; 00-overview line 47 is a live link to the now-existing guide 08, line 49 is a code-span for guide 09.

One critical factual error was found in the comparison table: the "Hardware required" cell for Smart Card incorrectly reads "No -- external token," making the self-contradictory claim that no hardware is required while simultaneously noting an external token is needed. Two warnings cover: (1) a non-failure row in the Configuration-Caused Failures table that undermines the table's triage utility, and (2) `User Authorization Mode` in the NUAL table having no provenance annotation or deferral note for its own MDM key literal, while the parallel `New User Authorization Mode` row is properly covered by PSSO-FUT-01.

---

## Critical Issues

### CR-01: Comparison Table "Hardware required" Cell for Smart Card Is Self-Contradictory and Factually Wrong

**File:** `docs/admin-setup-macos/08-auth-methods-deep-dive.md:26`

**Issue:** The "Hardware required" row for Smart Card reads `No -- external token`. This is a factually wrong self-contradiction. A smart card and a card reader are physical hardware devices — hardware IS required. The intended distinction appears to be "no built-in chip required (unlike Secure Enclave which requires T2 or Apple Silicon)," but that meaning is not expressed. An admin reading "No" in the Hardware required cell for Smart Card will conclude Smart Card needs no specialized hardware and may under-spec a deployment (no card readers, no physical cards) or misread the table's intent entirely.

The `-- external token` qualifier appended after "No" does not save the statement — it directly contradicts the "No" claim within the same cell.

**Fix:** Change the Smart Card cell value from `No -- external token` to a phrase that correctly communicates the actual constraint:

```markdown
| **Hardware required** | Yes -- T2 Intel or Apple Silicon | No | Yes -- external smart card + reader (no built-in chip required) |
```

This makes the "No built-in chip" constraint explicit while truthfully stating that external hardware (card + reader) is required.

---

## Warnings

### WR-01: Configuration-Caused Failures Table Includes a Non-Failure Row, Undermining Triage Utility

**File:** `docs/admin-setup-macos/08-auth-methods-deep-dive.md:315`

**Issue:** The last row of the Configuration-Caused Failures table is:

> AAGUID `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` listed in FIDO2 policy without key restrictions configured | Entra | No functional impact (AAGUID ignored when key restrictions are disabled); admin confusion about why it has no effect | --

The symptom column explicitly states "No functional impact." A table titled "Configuration-Caused Failures" implies every row represents a failure mode requiring a decision. Including a harmless entry with no runbook and "no functional impact" degrades the table's triage utility: an admin scanning this table during an incident will pause on this row unnecessarily, and the table loses its implicit guarantee that every row represents an actionable misconfiguration.

**Fix:** Either remove this row entirely (the AAGUID guidance in the Passkey section at line 153 already says "only required when key restrictions are configured") or move it to a separate "Common Admin Confusions" callout. If it remains in the table, add a `NOTE` column prefix to distinguish informational rows from failure rows:

```markdown
| NOTE (no failure): AAGUID `7FD635B3-...` listed in FIDO2 policy without key restrictions enabled | Entra | No functional impact -- AAGUID is ignored; admin confusion only | -- |
```

### WR-02: NUAL Table "User Authorization Mode" Row Has No Deferral Note for Its Own MDM Key Literal

**File:** `docs/admin-setup-macos/08-auth-methods-deep-dive.md:276`

**Issue:** The NUAL Settings Catalog settings table (lines 272-276) has two enum-type rows:

- `New User Authorization Mode` — Enum (Standard / Admin / Groups)
- `User Authorization Mode` — Enum (Standard / Admin / Groups)

The deferred callout box immediately following (lines 278-284) and `v1.9-DEFERRED-CLEANUP.md` PSSO-FUT-01 explicitly track that the MDM plist key literal for `New User Authorization Mode` is unconfirmed and omitted. However, `User Authorization Mode` is a distinct MDM key (`UserAuthorizationMode` or similar) whose exact plist key literal is equally unconfirmed — yet it has no provenance annotation, no deferral note, and is not tracked in PSSO-FUT-01 or any other deferred entry.

This creates asymmetry: the guide rigorously defers `New User Authorization Mode` but silently treats `User Authorization Mode` as if its MDM key literal is known. A reader (or future author resolving PSSO-FUT-01) will not know to also verify the `User Authorization Mode` key literal.

**Fix:** Extend the deferred callout box to cover both rows:

```markdown
> **Deferred item -- MDM key literals for New User Authorization Mode and User Authorization Mode:**
>
> The Settings Catalog display names are "New User Authorization Mode" and "User Authorization Mode."
> The underlying MDM plist key names for both are unconfirmed from an authoritative Settings Catalog
> payload schema and are therefore omitted from this guide pending verification.
>
> See `v1.9-DEFERRED-CLEANUP.md` for tracking details (PSSO-11 / PSSO-FUT-01).
```

Also update `v1.9-DEFERRED-CLEANUP.md` PSSO-FUT-01 to explicitly name both keys needing verification.

---

## Info

### IN-01: Canonical FileVault Section Does Not Cross-Reference the macOS 15+ FileVaultPolicy Setting

**File:** `docs/admin-setup-macos/08-auth-methods-deep-dive.md:83-85`

**Issue:** The canonical `### FileVault and the Secure Enclave Key` section (lines 68-85) is declared as the canonical statement of the FileVault/PSSO relationship and other sections cross-reference it. The `macOS 15+ FileVaultPolicy` guidance for Password sync (line 191) is a meaningful extension of FileVault behavior — it enables Entra-side validation at the pre-boot screen for Password sync fleets on macOS 15+. An admin reading only the canonical section to understand FileVault/PSSO behavior would not discover this macOS 15+ variant.

The section ends at line 85 with: "This is the canonical statement of the FileVault/PSSO relationship. Other sections of this guide cross-reference this sub-section rather than restating these facts." This statement is accurate but creates a closed canonical framing that excludes the Password sync FileVaultPolicy nuance from discovery.

**Fix:** Add a one-line cross-reference at the end of the canonical FileVault section:

```markdown
> **macOS 15+ extension for Password sync:** For Password sync fleets on macOS 15+, see the
> [`FileVaultPolicy = AttemptAuthentication`](#sync-timing-and-common-failure-modes) setting,
> which enables Entra-side validation at the pre-boot screen.
```

### IN-02: 00-overview Front Matter `last_verified` Not Bumped After Phase 77 Content Update

**File:** `docs/admin-setup-macos/00-overview.md:3`

**Issue:** `last_verified: 2026-04-14` and `review_by: 2026-07-13` remain at the Phase 76 values. Phase 77 updated the 00-overview (changelog line: "Phase 77: converted `08-auth-methods-deep-dive.md` code-span to live link with description"), which is a content change. The `review_by` date of 2026-07-13 is in 23 days from the review date (2026-06-21), making it the soonest-expiring document in the corpus. If `last_verified` had been bumped to 2026-06-21 on the Phase 77 edit, `review_by` would extend to 2026-09-21, matching guide 08's cadence.

This is a housekeeping gap, not a content error, but it will trigger an early review cycle.

**Fix:** Update 00-overview front matter to reflect the Phase 77 touch:

```yaml
last_verified: 2026-06-21
review_by: 2026-09-21
```

---

_Reviewed: 2026-06-21T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
