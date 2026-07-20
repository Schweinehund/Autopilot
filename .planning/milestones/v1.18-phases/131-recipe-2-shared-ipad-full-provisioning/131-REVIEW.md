---
phase: 131-recipe-2-shared-ipad-full-provisioning
reviewed: 2026-07-17T00:00:00Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - docs/recipes/02-shared-ipad-full-provisioning.md
findings:
  critical: 2
  warning: 1
  info: 1
  total: 4
status: issues_found
---

# Phase 131: Code Review Report

**Reviewed:** 2026-07-17
**Depth:** standard
**Files Reviewed:** 1
**Status:** issues_found

## Summary

Reviewed `docs/recipes/02-shared-ipad-full-provisioning.md` (RE-223) against the phase's locked
decisions (`131-CONTEXT.md`) and first-party fact base (`131-RESEARCH.md`). All six
requirement-inversion traps (T-1 cached-users, T-2 device-group-only apps, T-3 verbatim
conflict-resolution phrasing, T-4 Entra shared-mode distinction, T-5 email unsupported, T-6 wipe
trigger) are correctly resolved in the recipe body — no regression to any of the original,
factually-inverted requirement wording was found. Passcode wording ("eight alphanumeric
characters") is correct. All cross-link targets (RE-109/110/111, OU-06/07,
`docs/_templates/recipe-template.md`, `docs/_standards/EEE-SOP-standard.md`) exist on disk, and
every internal/external anchor fragment used in the file resolves to a real heading in the target
document (spot-checked `#await-final-configuration`, `#step-2-configure-enrollment-settings`,
`#vpp-device-licensed`, `#2-device-centric-view`, plus all 5 internal `#step-N-...` self-links).
The fixed H2 skeleton, frontmatter, visible header-block field order, and anti-feature table
header are all followed exactly, and a live run of `node scripts/validation/c17-eee-contract.mjs`
confirms **0 violations across all 232 enrolled corpus files** (including this one) for the
tool's current implementation of all 13 assertions.

However, direct measurement of every contiguous blockquote run in the file (replicating the C17
`#12` algorithm exactly, not trusting the tool's report at face value) surfaced one blockquote
that is **323 characters** — over 1.6x the 200-char cap the phase's own locked decisions (C4, B2)
went out of their way to enforce elsewhere in this same document. It escapes the automated C17
gate only because it is indented under a numbered list item (the validator's `#12` check is
regex-anchored at column 0 and silently skips indented/nested blockquotes) — this is a real
content-quality regression that the gate currently has a blind spot for, not a false alarm. A
second issue was found in the Step 4 applicability table: it includes an Email row that directly
contradicts the table's own stated scope ("scoped only to the settings the worked example in
Steps 6–7 touches" — Email is never configured in Steps 6–7) and presents Email's device-group
column with no unsupported caveat, which could read as "Device-group Email assignment is fine on
Shared iPad," contradicting the anti-feature table's resolution that email profile assignment
errors on a Shared iPad device outright (T-5). One further item — leaked internal-review
meta-commentary in reader-facing prose — is flagged as a Warning-level clarity issue.

## Structural Findings (fallow)

None provided for this phase (no `<structural_findings>` block was supplied).

## Narrative Findings (AI reviewer)

## Critical Issues

### CR-01: Step 1's Entra/Shared-iPad distinction blockquote breaches the document's own 200-char blockquote-run discipline (and evades the C17 gate only by accident of indentation)

**File:** `docs/recipes/02-shared-ipad-full-provisioning.md:94`
**Issue:** The blockquote —

> **Entra shared device mode is not the Shared iPad feature.** [ADE Enrollment Profile](../admin-setup-ios/03-ade-enrollment-profile.md#step-2-configure-enrollment-settings) lists "Microsoft Entra shared mode" as a separate User Affinity enum value for general ADE fields — that row does not describe this Shared-iPad toggle.

measures **323 characters** when reduced the same way `scripts/validation/c17-eee-contract.mjs`
assertion #12 measures a contiguous top-level blockquote run (strip the `>` prefix, join
consecutive `>` lines with a space). That is well over the 200-char cap the phase's own locked
decisions treat as load-bearing: the *immediately preceding* callout in this same Step 1 (the
wipe-trigger/factory-reset note, lines 88/90/92) carries the exact same kind of multi-fact content
and was deliberately split into three separate blockquote runs (each under 175 chars) to respect
this limit — proving the author was actively applying the 200-char discipline to indented,
list-nested callouts elsewhere in this very step. Line 94 is the one instance where that
discipline was not applied.

This currently produces **zero** violations when `node scripts/validation/c17-eee-contract.mjs`
is run, but only because the blockquote is indented 3 spaces (a continuation of Step 1's numbered
list item 2), and the validator's #12 check uses `/^>/.test(bodyLines[i])`, which requires the
`>` to start at column 0. Indented/nested blockquotes are invisible to this regex — a validator
blind spot, not evidence the content is compliant. The C17 script is explicitly out of scope to
edit (`131-CONTEXT.md`: "DO NOT EDIT"), so the fix must be in the recipe content, mirroring the
pattern already used two blockquotes above it in the same step.

**Fix:** Split the sentence across multiple `>` lines separated by blank lines, the same way the
wipe-trigger note directly above it was split:
```markdown
> **Entra shared device mode is not the Shared iPad feature.**

> [ADE Enrollment Profile](../admin-setup-ios/03-ade-enrollment-profile.md#step-2-configure-enrollment-settings)
> lists "Microsoft Entra shared mode" as a separate User Affinity enum value for general ADE
> fields — that row does not describe this Shared-iPad toggle.
```
(Verify the resulting run lengths are each ≤200 chars using the same strip-and-join measurement
before finalizing wording.)

### CR-02: Step 4 applicability table's Email row contradicts its own stated scope and omits the unsupported caveat on the Device column

**File:** `docs/recipes/02-shared-ipad-full-provisioning.md:158-167`
**Issue:** The sentence immediately before the Step 4 table states: "This table is scoped only to
the settings the worked example in Steps 6–7 touches" (line 159). The worked example (Steps 6–7)
configures Wi-Fi, apps, device restrictions, and home-screen layout — **it never touches Email at
all**. Including an Email row directly contradicts the table's own stated scoping rule.

Worse, the row as written —

```
| Email | All settings | Device | User (⚠ unsupported here — see Unsupported and Anti-Feature Callouts above) |
```

— flags only the **User group** column as unsupported, leaving the **Device group** column
("Device") unmarked, as if device-group Email assignment is a viable option on Shared iPad. That
contradicts this recipe's own anti-feature table (line 53), which states email profile assignment
"An error occurs when you assign an email profile to a Shared iPad device" — a device-level error,
not a user-group-specific one — and contradicts T-5's locked resolution that Email is **NOT
supported** on Shared iPad, full stop, regardless of which group type it's assigned to. An admin
skimming only Step 4 (a plausible reading path, since it's presented as the practical
device-vs-user reference for this recipe's configuration) could reasonably conclude device-group
Email assignment is safe to attempt, and hit the documented error at configuration time.

**Fix:** Remove the Email row entirely (it is genuinely out of scope per the table's own stated
rule and per T-5), or, if kept for reader instructiveness, flag **both** columns as unsupported
with a single note, e.g.:
```markdown
| Email | All settings | Not supported on Shared iPad (⚠ see [Unsupported and Anti-Feature Callouts](#unsupported-and-anti-feature-callouts)) | Not supported on Shared iPad (⚠ see [Unsupported and Anti-Feature Callouts](#unsupported-and-anti-feature-callouts)) |
```

## Warnings

### WR-01: Leaked internal-review meta-commentary in reader-facing prose (cached-users field)

**File:** `docs/recipes/02-shared-ipad-full-provisioning.md:100-102`
**Issue:** "Enter a whole number up to 24 on a 32-GB or 64-GB device. A low number can delay a new
user's data appearing after their first sign-in; a high number risks running out of on-device
storage. **This is a real, settable enrollment-policy field, not prose-only planning guidance.**"

The final sentence only makes sense to someone who has read the phase's T-1 requirement-inversion
trap note (the original, incorrect requirement wording called this "planning guidance, not a
config field"). An Intune admin reading this Guide has no context for "not prose-only planning
guidance" — there is nothing in the recipe suggesting it *could* have been prose-only. This reads
as an artifact of the authoring/review process leaking into externally-published documentation,
not information the target audience needs.
**Fix:** Remove the trailing clause, or replace with reader-relevant content, e.g.: "Enter a whole
number up to 24 on a 32-GB or 64-GB device. A low number can delay a new user's data appearing
after their first sign-in; a high number risks running out of on-device storage."

## Info

### IN-01: Dense eligibility-floor parenthetical is harder to parse than necessary

**File:** `docs/recipes/02-shared-ipad-full-provisioning.md:33-36`
**Issue:** The Prerequisites bullet's parenthetical ("First-party text also says 'iPadOS 13.3 and
later' in the wipe-trigger context specifically — treat 13.4+ as the floor to plan for, and 13.3
as the narrower boundary for which devices trigger a wipe if targeted, covered at the
enrollment-policy step below.") correctly captures the real first-party 13.3-vs-13.4 inconsistency
(per `131-RESEARCH.md` Pitfall 5) but is dense enough that a first-time reader may need two passes
to separate "the floor to plan for" from "the wipe-trigger boundary." Not a factual error.
**Fix:** Optionally split into two sentences — one stating the 13.4+/32GB floor, a second
separately noting the 13.3 wipe-trigger nuance with its own forward-reference — for readability.
Low priority; author's discretion.

---

_Reviewed: 2026-07-17T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
