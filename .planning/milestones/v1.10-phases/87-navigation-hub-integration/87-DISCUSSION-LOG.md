# Phase 87: Navigation Hub Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-23
**Phase:** 87-navigation-hub-integration
**Areas discussed:** index.md row granularity, 00-index escalation mapping, quick-ref Kerberos block, common-issues + tree leaf
**Method:** All four areas adjudicated via `/adversarial-review` (Finder → Adversary → Referee, opus), per the user's standing preference and the P83–86 precedent. The user selected all four areas and explicitly delegated the per-area pick to adversarial-review with reasoning. The Adversary overturned the Finder on 3 of 4 areas by surfacing the macOS tables' own live conventions; the Referee verified every contested fact against the live files and confirmed the rulings. The user reviewed the final rulings and chose "Lock & continue."

---

## Area 1 — index.md row granularity (SC#1)

| Option | Description | Selected |
|--------|-------------|----------|
| 1a | Discrete deep-link rows pointing directly at 10-/11- guide files and 28-/29- runbook files | |
| 1b | Extend existing summary-row descriptions only (still pointing at 00-overview / 00-index) | |
| 1c | Hybrid — Admin Setup enriched summary row → 00-overview; L2 discrete rows → 00-index anchor | ✓ |

**Ruling:** 1c. **Notes:** Finder initially picked 1a. Adversary overturned → 1c after verifying that ALL macOS Admin Setup rows point at `admin-setup-macos/00-overview.md` (index.md:131-132) and ALL macOS L2 symptom rows point at the `00-index.md#macos-ade-runbooks` anchor (index.md:123, #27), never numbered files. Referee confirmed: iOS deep-links numbered guides (165-167) but that's a different section; the macOS table's own convention governs. SC#1 "includes rows for" is satisfied by the enriched summary row + two discrete anchor-linked L2 rows.

---

## Area 2 — 00-index.md escalation mapping (SC#4)

| Option | Description | Selected |
|--------|-------------|----------|
| 2a | Existing When-to-Use rows satisfy "rows" + add no-L1-source note (MAM-WE style) | ✓ |
| 2b | Add a Microsoft-Support terminal escalation mapping row | |
| 2c | Add a peer/cross-runbook mapping row (#27 → #28) | |

**Ruling:** 2a. **Notes:** Both Finder and Adversary agreed; Referee confirmed (overturning would have cost the Adversary -20). The #28/#29 When-to-Use rows already exist (00-index.md:87-88, shipped P85). P85 D-05 LOCKS that no L1 Kerberos/Graph runbook exists — 2b/2c would fabricate a non-existent escalation source and break the L1-Escalation-Mapping table's `L1 source → L2` grammar. Add no row; carry the L2-only stance in the common-issues entry prose.

---

## Area 3 — quick-ref-l2.md Kerberos diagnostics (SC#3)

| Option | Description | Selected |
|--------|-------------|----------|
| 3a | New ### Kerberos SSO Diagnostics subsection re-stating app-sso platform -s + klist | |
| 3b | Extend the existing #### Platform SSO Attestation Command block | |
| 3c | Add only klist (app-sso platform -s already present) + a Kerberos pointer | ✓ |

**Ruling:** 3c. **Notes:** Finder picked 3a. Adversary overturned → 3c (Finder's weakest pick): `app-sso platform -s` already appears at quick-ref-l2.md:185; `klist` is absent everywhere. Re-stating app-sso duplicates content (over-documentation discipline) and splits the locked P83 D-12 `tgt_ad`/`tgt_cloud` interpretation across two copies. Referee confirmed: add a `#### Kerberos SSO Diagnostics` block with klist only (version-stable, no `-v`) + a pointer to the existing app-sso block. `app-sso diagnose` stays PROHIBITED.

---

## Area 4 — common-issues entry + decision-tree leaf (SC#2, SC#5)

| Option | Description | Selected |
|--------|-------------|----------|
| 4a | Standalone ### Kerberos SSO Extension Failure entry (L2-only → #28) | ✓ |
| 4b | Sub-bullet under existing ### Platform SSO Sign-In Failure | |
| 4c | New MAC3 primary-symptom branch → red L2-escalation leaf → #28 | |
| 4d | Kerberos leaf as a sub-branch (third arm) under the existing MACSSO diamond | ✓ |

**Ruling:** 4a (common-issues) + 4d (tree placement) + RED `escalateL2` leaf color. **Notes:** Finder picked 4a + 4c. Both agents agreed on 4a (standalone entry matches the file's one-symptom-per-section grammar; L2-only, no L1 line per D-05). Adversary overturned tree placement 4c → 4d: the tree funnels ALL SSO symptoms through MAC3 → MACSSO, and a user can't distinguish Kerberos-extension from PSSO at triage. Referee confirmed 4d AND ruled the leaf MUST be RED `escalateL2` (not green like siblings MACR7/8) — verified at 06-macos-triage.md:56-60 that MACR7/8 are green only because they route to L1 #35/#36; #28 is L2, and the legend (:24-25) mandates red for L2 escalation. Stays within the 3-edge routing budget (MAC1→MAC3→MACSSO→leaf).

---

## Claude's Discretion

- Exact "When to Use" cell wording (enriched Admin Setup row + two L2 rows).
- Exact `klist` note and Kerberos-pointer sentence wording.
- Exact symptom prose + L1/L2 bullet wording for the common-issues entry.
- Exact MACSSO third-arm edge label + new leaf node ID/text.
- Per-plan commit granularity within append-only / navigation-last constraints.

## Deferred Ideas

- v1.10 harness lineage bump + check-phase-83..88 validators + CI workflow + 3-axis re-audit + milestone close → **Phase 88**.
- Any new L1 Kerberos/Graph runbook — none exists; not in v1.10 scope.
- Fabricated escalation-mapping rows for #28/#29 — rejected (no L1 source exists).

## Plan-time verification items (carry forward)

1. MACSSO diamond label vs Kerberos third arm — may need a broadened label / discriminator without breaking the 3-edge budget.
2. Confirm L2-index anchor slug is exactly `#macos-ade-runbooks` at edit time.
3. Author locked version-stable `klist` (no `-v`).
4. Verify no `check-phase` byte-unchanged baseline guard couples `index.md` / `06-macos-triage.md` before committing.
