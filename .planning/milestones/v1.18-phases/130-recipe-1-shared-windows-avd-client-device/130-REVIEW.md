---
phase: 130-recipe-1-shared-windows-avd-client-device
reviewed: 2026-07-17T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/admin-setup-apv1/08-self-deploying.md
  - docs/recipes/01-shared-windows-avd-client.md
findings:
  critical: 0
  warning: 1
  info: 4
  total: 5
status: issues_found
---

# Phase 130: Code Review Report

**Reviewed:** 2026-07-17
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Two documentation files reviewed adversarially for technical/factual correctness,
internal consistency, link integrity, and dangerous guidance:

- **RE-084 (`08-self-deploying.md`, MODIFIED)** — the Wi-Fi correction is clean.
  No residual "Wi-Fi unsupported" language survived (grep-confirmed at all sites),
  the fabricated pre-OOBE "cannot reach service" mechanism is gone, the
  Configuration-Caused Failures Wi-Fi row was removed as claimed, and the
  Ethernet-for-zero-touch guidance is preserved. The two-stage Wi-Fi story
  (OOBE Wi-Fi = supported-but-not-zero-touch) is internally coherent.

- **RE-222 (`01-shared-windows-avd-client.md`, CREATED)** — technically strong.
  The load-bearing polarity traps are recorded correctly: Local Storage
  "Disabled" → `RestrictLocalStorage=true` (restrict-framed CSP vs allow-framed
  GUI), and AccountModel guest-default (`0`) → empty-feed → must set Domain (`1`).
  DeletionPolicy 0/1/2 mapping, SharedPC/kiosk mutual-exclusion, device-context
  Required install ordering, and the interactive in-app feed sign-in for the
  kiosk autologon local account are all consistent.

**Link integrity:** all 15 relative `../` targets exist (verified on disk); all 5
in-doc `#anchor` links resolve to real heading slugs, including the double-hyphen
`wi-fi` slug trap in Step 7 (`#step-7-wired-vs-wi-fi-network-access-post-enrollment`).
No fabricated `*runbook*` links present.

One genuine executability/consistency defect (dynamic-group sequencing) and four
verify-before-publish Info items. No Critical findings. No dangerous guidance
(no inverted polarity, no silently-feed-breaking setting recommended).

Per the phase brief, the deliberate `[ASSUMED]` flags (session-reset node names,
AUMID discovery, offline Store license) and the deferred registry-row/nav wiring
(Phase 132) were treated as in-design and NOT flagged.

## Warnings

### WR-01: Dynamic device group is both a prerequisite and a Step-3 deliverable — linear execution of Step 1 is blocked

**File:** `docs/recipes/01-shared-windows-avd-client.md:33, 56, 63, 69-75`
**Issue:** The dynamic device group has contradictory provenance. Prerequisites
(L33) list it as something that must already be **"ready to receive the
self-deploying devices"** (implying it pre-exists), but **Step 3** (L69) walks
through **creating** it from scratch. Meanwhile Step 1.4 (L56) instructs the
admin to *"Assign the profile to the dynamic device group **created in Step 3**"*
and Step 2 (L63) targets *"the same dynamic device group"* — both **before**
Step 3 appears in the sequence. An admin executing linearly reaches Step 1.4 and
cannot assign a deployment profile to a group that does not yet exist; an admin
treating the group as a prerequisite finds Step 3 redundantly re-creates an
existing group (risking a duplicate). Either reading produces friction, and the
prerequisite-vs-Step-3 duplication is a direct internal contradiction.
**Fix:** Pick one model. Simplest: make group creation a true prerequisite and
demote Step 3 to a back-reference, OR reorder so the group is created first.
Concretely, move group creation ahead of profile/ESP assignment, e.g.:

```
### Step 1: Create the dynamic device group   (was Step 3)
### Step 2: Create the self-deploying deployment profile  (assign to the group from Step 1)
### Step 3: Configure the device-phase-only ESP           (assign to the same group)
```

and reword the Prerequisites bullet (L33) so it points to Step 1 rather than
asserting the group is already "ready." At minimum, fix the L56 forward-reference
so it does not tell the admin to assign to a not-yet-created object.

## Info

### IN-01: Kiosk maintenance CSP node asserted flatly while comparably uncertain nodes carry `[ASSUMED]`

**File:** `docs/recipes/01-shared-windows-avd-client.md:195`
**Issue:** Step 6 states the kiosk maintenance window maps to
`ApplicationManagement/ScheduleForceRestartForUpdateFailures` as a bare factual
assertion. This CSP-node claim is presented with more confidence than the
session-reset field names (L100) and AUMID discovery (L136), which the recipe
deliberately hedges with `[ASSUMED]`. If the node name is wrong, it is an
unflagged risk in an otherwise carefully confidence-flagged document.
**Fix:** Verify the exact CSP node backing the Kiosk template's "Specify
Maintenance Window for App Restarts" against Microsoft Learn, or add an
`[ASSUMED]` / verify-before-finalizing flag consistent with the recipe's own
surgical confidence-flag policy.

### IN-02: `Azure/WindowsAppKiosk` repo reference is unverified

**File:** `docs/recipes/01-shared-windows-avd-client.md:138`
**Issue:** The optional advanced pointer names a GitHub repo `Azure/WindowsAppKiosk`
as a "turnkey lockdown script." It is plain text (not a clickable link), so it is
not a broken-link defect, but a wrong repo path sends admins to a dead end.
**Fix:** Confirm the repo exists under that exact org/name before publishing; if
uncertain, soften to a search-directed pointer ("search Microsoft's Windows App
kiosk sample repos") rather than a hard path.

### IN-03: Self-referential / mis-targeted cross-reference in RE-084 Step 2

**File:** `docs/admin-setup-apv1/08-self-deploying.md:63`
**Issue:** The line *"See Step 2 above for the full prerequisite list"* sits
**inside** Step 2 (heading at L50), so "Step 2 above" is self-referential, and
the "full prerequisite list" actually lives in the **Prerequisites** section
(L28-35), not Step 2. The pointer both loops and points at the wrong section.
**Fix:** Change to "See the **Prerequisites** section above for the full list."

### IN-04: SharedPC inactive-account-threshold range `0–60` unverified

**File:** `docs/recipes/01-shared-windows-avd-client.md:188`
**Issue:** Step 5b states the Inactive account threshold accepts "0–60"
consecutive signed-out days. The DeletionPolicy 0/1/2 mapping and AccountModel
mapping around it are correct, but this specific numeric cap is asserted without
a confidence flag and could not be corroborated in this review (Microsoft Learn
MCP was unavailable in-session).
**Fix:** Confirm the GUI's documented min/max for the Inactive threshold field
against Microsoft Learn, or flag it as verify-before-finalizing like the
recipe's other tenant-specific values.

---

_Reviewed: 2026-07-17_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
