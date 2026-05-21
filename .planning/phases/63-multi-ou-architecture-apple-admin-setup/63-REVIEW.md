---
phase: 63-multi-ou-architecture-apple-admin-setup
reviewed: 2026-05-21T00:00:00Z
depth: standard
files_reviewed: 11
files_reviewed_list:
  - docs/cross-platform/apple-business/02-ous-architecture.md
  - docs/cross-platform/apple-business/03-ous-vs-custom-roles.md
  - docs/cross-platform/apple-business/04-custom-role-authoring.md
  - docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md
  - docs/cross-platform/apple-business/06-mdm-server-assignment.md
  - docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md
  - docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md
  - docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md
  - docs/cross-platform/apple-business/10-apple-tv-lifecycle.md
  - docs/reference/ios-capability-matrix.md
  - scripts/validation/check-phase-63.mjs
findings:
  critical: 3
  warning: 5
  info: 3
  total: 11
status: issues_found
---

# Phase 63: Code Review Report

**Reviewed:** 2026-05-21
**Depth:** standard
**Files Reviewed:** 11
**Status:** issues_found

## Summary

Phase 63 delivers nine new or amended documentation files covering the Apple Business delegated-governance architecture (OUs, custom roles, sub-org admin onboarding, MDM server assignment, VPP token consolidation, Managed Apple Account provisioning, Shared iPad lifecycle, Apple TV lifecycle, iOS capability matrix) plus one Node.js validation script.

The validator (`check-phase-63.mjs`) runs cleanly (26 PASS, 5 SKIPPED, 0 FAIL) and all structural assertions hold. The documentation content is sound overall — the OP-1/OP-2/OP-3 safety guardrails are consistently applied, the C15 scope-boundary framing is respected across all eight Apple-side docs, and the training-data notices are properly placed.

However, three content-correctness defects rise to BLOCKER level: a dangling internal cross-reference in the onboarding procedure, a factual inconsistency between the iOS capability matrix and the Apple TV lifecycle doc, and a broken relative-path hyperlink to PITFALLS.md. Five additional quality issues are flagged as warnings.

---

## Critical Issues

### CR-01: Dangling internal cross-reference — "see note below" points to missing content

**File:** `docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md:83`
**Issue:** Step 1a of the manual account creation procedure instructs the admin to set the account type to "IT Administrator" and says "(see note below on role-at-creation vs. role-at-assignment)". No such note exists anywhere in the document. A reader who follows this parenthetical will find nothing.

Beyond the missing note, the instruction itself is operationally dangerous in its current form: if an admin creates the account with the IT Administrator account type, that account immediately has tenant-wide IT Administrator privileges. The subsequent custom role assignment in Step 2 becomes irrelevant because IT Administrator is already a top-level tenant-wide role. The guidance should specify either "leave as the default non-privileged type" or explain the role-at-creation flow explicitly. The "(see note below)" placeholder was never completed.

**Fix:** Either add the promised note below Step 6 explaining the role-at-creation vs. role-at-assignment distinction, or revise Step 5 to unambiguously instruct:

```markdown
5. Leave the account type as the **default** (do not assign IT Administrator at creation).
   The Sub-Org Admin role bundle with OU scoping is applied in Step 2–3. If you
   set IT Administrator here, the custom role in Step 2 is redundant — the account
   will already have tenant-wide admin privileges, which violates the minimum-viable
   delegation principle.
```

---

### CR-02: Factual inconsistency — ios-capability-matrix.md labels Apple TV management as "supervised ADE only" contradicting 10-apple-tv-lifecycle.md

**File:** `docs/reference/ios-capability-matrix.md:29`
**Issue:** The Enrollment table row for "Apple TV management" reads: `🔒 supervised ADE only (tvOS via Apple Business / Configurator; OU-scoped device pool)`. The "supervised ADE only" label implies ADE is the enrollment path, but `10-apple-tv-lifecycle.md` explicitly and prominently states that **retail Apple TVs do NOT qualify for ADE** — Configurator is the only supported supervised enrollment path for retail purchases.

The parenthetical `/ Configurator` does not rescue the label: "supervised ADE only" as a capability gate means ADE enrollment is required for the feature to work, which is incorrect for the Configurator-enrolled retail-TV use case. A reader of the capability matrix will incorrectly conclude that Apple TV management requires ADE (and therefore a business-channel purchase), when Configurator enrollment of retail devices is equally supported.

**Fix:** Revise the capability cell to accurately represent both enrollment paths:

```markdown
| Apple TV management | N/A | N/A | 🔒 supervised only — ADE path (business-channel purchase) or Configurator path (retail purchase); OU-scoped device pool; see 10-apple-tv-lifecycle.md |
```

---

### CR-03: Broken relative-path hyperlink to PITFALLS.md in Shared iPad doc

**File:** `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md:68`
**Issue:** The OP-12 callout links to PITFALLS.md using the relative path `../../.planning/research/PITFALLS.md`. Resolving that path from the file's location (`docs/cross-platform/apple-business/`) yields `docs/.planning/research/PITFALLS.md`, which does not exist. The actual file is at `.planning/research/PITFALLS.md` (project root). The path needs one additional `../` to reach the project root.

Verified: `PITFALLS.md` exists at `D:/claude/Autopilot/.planning/research/PITFALLS.md`. The link is off by one directory level.

**Fix:**
```markdown
> See also: [PITFALLS.md OP-12 — Find My activation lock (HIGH)](../../../.planning/research/PITFALLS.md)
```

---

## Warnings

### WR-01: Duplicate word at line boundary in 02-ous-architecture.md

**File:** `docs/cross-platform/apple-business/02-ous-architecture.md:101-102`
**Issue:** Lines 101–102 read: `"...are NOT automatically transferred when devices move between OUs. The\nThe Phase 63 admin-setup doc..."`. The word "The" appears at the end of line 101 and again at the start of line 102. The rendered output reads "...between OUs. The The Phase 63..." which is a visible prose defect.

**Fix:** Remove the trailing "The" from line 101:
```markdown
OU-scoped and are NOT automatically transferred when devices move between OUs.
The Phase 63 admin-setup doc `07-vpp-content-token-consolidation.md` (OU-05) covers
```

---

### WR-02: Delegation-path inconsistency between 06-mdm-server-assignment.md and 04-custom-role-authoring.md

**File:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md:40,50`
**Issue:** The OP-1 callout in `06-mdm-server-assignment.md` (line 40) and the permission summary table (line 50) state that sub-org admins should receive "Assign devices to MDM server" **"through the Device Enrollment Manager preset"**. However, `04-custom-role-authoring.md` (the canonical Sub-Org Admin bundle) grants "Assign devices to MDM server" as a **custom role permission** — not via the Device Enrollment Manager preset. In the recommended Combined topology, admins use the custom role bundle, not the preset.

This inconsistency will confuse a reader who reads 04- first (use the custom bundle) and then 06- (use the Device Enrollment Manager preset). The correct guidance for Combined-topology deployments is to use the custom role from 04-.

**Fix:** Revise 06-'s OP-1 callout and table to reflect topology-aware guidance:
```markdown
> "Assign devices to MDM server" via the canonical Sub-Org Admin custom role bundle
> (see 04-custom-role-authoring.md), NOT "Manage MDM Servers". In OUs-only topologies,
> the Device Enrollment Manager preset provides equivalent capability.
```
And update the table note in the "Assign devices to MDM server" row from "Yes — via Device Enrollment Manager preset" to "Yes — via Sub-Org Admin custom role bundle (Combined topology) or Device Enrollment Manager preset (OUs-only topology)".

---

### WR-03: Deprecated "ABM" term in 09-shared-ipad-lifecycle.md Stage 3

**File:** `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md:136`
**Issue:** Stage 3, manual provisioning path sub-header reads "**Manual (ABM web portal entry)**". All other references in this document correctly use "Apple Business portal" (the post-2026-04-14 rebrand). "ABM" (Apple Business Manager) is the pre-rebrand name and should not appear as the label for a current portal interaction step. The C14 rebrand-statement guard fires on this as deprecated terminology. The `review_by` date is 2026-07-20, so this will be caught at re-verification, but it is shipped with incorrect terminology.

**Fix:**
```markdown
1. **Manual (Apple Business portal entry)**
```

---

### WR-04: Missing phase-50 regression coverage in check-phase-63.mjs CHAIN_PHASES

**File:** `scripts/validation/check-phase-63.mjs:52`
**Issue:** `CHAIN_PHASES` omits phase 50 with the comment "Phase 50 stub excluded per check-phase-61.mjs precedent (stub validator; not full check)." However, `check-phase-50.mjs` currently runs 26 checks and exits 0 — it is not a stub. The "stub" characterization was accurate when check-phase-61.mjs was authored but is stale by Phase 63. As a result, the chain regression guard silently skips phase 50 even though that validator is fully operational and would catch regressions.

**Fix:** Add 50 to `CHAIN_PHASES` and update the comment to remove the stale stub characterization:
```javascript
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
// (remove the "Phase 50 stub excluded" comment)
```
Note: if phase 50 is added and `CHAIN_SKIP` exemption for it is not needed (it currently exits 0), no CHAIN_SKIP entry is required.

---

### WR-05: check-phase-63.mjs header comment overstates the number of structural assertions

**File:** `scripts/validation/check-phase-63.mjs:6`
**Issue:** The header comment claims "~18 V-63-NN structural assertions" but the code defines exactly 11 numbered assertions (V-63-01 through V-63-11) plus the ANCHOR-INVENTORY check. Total numbered/named static checks = 12, not 18. The discrepancy is 6 and will mislead maintainers reasoning about coverage.

**Fix:** Update the header comment:
```javascript
// 12 V-63-NN structural assertions per CONTEXT D-01..D-06 covering:
```

---

## Info

### IN-01: Phase 64 forward-reference hyperlinks resolve to non-existent files

**Files:** Multiple (`02-ous-architecture.md:13,138,140,142`, `06-mdm-server-assignment.md:110`, `07-vpp-content-token-consolidation.md:143`, `08-managed-apple-account-provisioning.md:136`, `10-apple-tv-lifecycle.md:238`)
**Issue:** Several Cross-References sections use markdown hyperlink syntax (`[filename](filename)`) for Phase 64 deliverables that do not yet exist (`15-mdm-server-reassign-runbook.md`, `16-managed-apple-account-runbook.md`, `17-audit-log-scoping-runbook.md`, `18-cross-org-boundary-cheat-sheet.md`, `11-vpp-catalog-runbook.md`). In rendered GitHub/portal views these produce 404 links. The in-body prose correctly marks them as "forthcoming" or "(Phase 64 deliverable)", but the hyperlinks are still live.

The most prominent case is `02-ous-architecture.md:13` in the platform-applicability banner (high-visibility location) where `18-cross-org-boundary-cheat-sheet.md` is hyperlinked with no "forthcoming" qualifier in the link text itself.

**Fix:** Either convert all Phase 64+ Cross-References hyperlinks to code-span prose (`\`15-mdm-server-reassign-runbook.md\`` (Phase 64 deliverable; forthcoming)) until the files exist, or add a tracking note that these will be replaced with live links when Phase 64 lands. For the banner-level link in 02- specifically, add "(Phase 64; forthcoming)" to the link text to set reader expectations.

---

### IN-02: V-63-10 C15 regex does not cover plural "scope tags" — gap in framing guard

**File:** `scripts/validation/check-phase-63.mjs:249`
**Issue:** The C15 banned-phrase regex is `/\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i`. The pattern `scope\s+tag` uses a singular `\b` word boundary that does NOT match the plural form "scope tags" (the `\b` between "tag" and "s" is absent). `02-ous-architecture.md:11` contains "Intune scope tags" (plural) which would not be caught by this regex. While `02-ous-architecture.md` is not in the eight-doc scope of V-63-10, future Apple-side docs that reference "scope tags" in plural would silently pass the guard.

**Fix:** Extend the alternation to handle both forms:
```javascript
const rx15 = /\bIntune\s+(RBAC|role|scope\s+tags?|admin\s+role)\b/i;
```

---

### IN-03: ios-capability-matrix.md frontmatter is from Phase 32 (last_verified: 2026-04-17), not updated for Phase 63 additions

**File:** `docs/reference/ios-capability-matrix.md:2-3`
**Issue:** The file's frontmatter shows `last_verified: 2026-04-17` and `review_by: 2026-07-16`. Phase 63 added three new rows to the Enrollment table (Apple TV management, Shared iPad sessions, Apple Business delegation surface). The frontmatter dates were not updated to reflect Phase 63 authorship, which means the re-verification cycle for the new rows tracks against the Phase 32 baseline date rather than Phase 63's 60-day window.

**Fix:** Update the frontmatter to reflect Phase 63 additions:
```yaml
last_verified: 2026-05-21
review_by: 2026-07-20
```

---

_Reviewed: 2026-05-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
