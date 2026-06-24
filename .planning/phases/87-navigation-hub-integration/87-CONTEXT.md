# Phase 87: Navigation Hub Integration - Context

**Gathered:** 2026-06-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire the already-shipped v1.10 content — guide 10 (`10-kerberos-sso-extension.md`, P83), guide 11 (`11-graph-api-platform-credential.md`, P84), L2 runbooks #28/#29 (P85), and the locked Kerberos diagnostics pair — into **5 navigation hubs**, satisfying the **navigation-last invariant**: no nav-hub link is committed until the content file it references is confirmed committed (REF-03). All four content surfaces are already committed and live, so the invariant is satisfiable now.

**In scope (the 5 hub files + their success criteria):**
1. `docs/index.md` — macOS Admin Setup table (guides 10/11) + Desktop Engineering L2 table (#28/#29) — **SC#1**
2. `docs/common-issues.md` — macOS Kerberos SSO extension escalation entry → L2 #28 — **SC#2**
3. `docs/quick-ref-l2.md` — macOS Kerberos diagnostic commands (`app-sso platform -s` + `klist`) — **SC#3**
4. `docs/l2-runbooks/00-index.md` — macOS ADE Runbooks rows #28/#29 with escalation mapping — **SC#4**
5. `docs/decision-trees/06-macos-triage.md` — Kerberos SSO extension leaf → L2 #28 — **SC#5**

Requirement: **REF-03**. Plans: 87-01 (index.md + common-issues.md), 87-02 (quick-ref-l2.md + 00-index.md + 06-macos-triage.md). Append-only; precedent is **Phase 81 SSOREF-04** (the same nav tables, version-history-logged).

**Out of scope (other phases / deferred):** authoring/editing any content files (done in P83–85); v1.10 harness lineage bump + check-phase-83..88 validators + CI workflow → **Phase 88**; any new L1 Kerberos/Graph runbook (none exists, P85 D-05 LOCKED); fabricating an L1 escalation source for #28/#29.
</domain>

<decisions>
## Implementation Decisions

All four gray areas were adjudicated via `/adversarial-review` (Finder → Adversary → Referee, opus) per the user's standing preference and the P83–86 precedent. The **Adversary overturned the Finder on 3 of 4 areas** by surfacing the macOS tables' own live conventions; the **Referee verified every contested fact against the live files** and confirmed the overturns. Full reasoning in `87-DISCUSSION-LOG.md`.

### D1 — index.md row granularity (SC#1) → HYBRID (option 1c)
The two macOS tables in `docs/index.md` have **different** locked link conventions — match each table's own grammar:
- **D-01 (Admin Setup table, lines 131–132):** Every macOS Admin Setup row points at `admin-setup-macos/00-overview.md` (the existing Platform SSO row bundles guides 07/08/09 behind that hub link). → **Enrich/extend the existing line-132 Platform SSO row** so its "When to Use" cell names guide 10 (Kerberos SSO Extension) and guide 11 (Graph API Platform Credential); **keep the link target on `00-overview.md`.** Do NOT add discrete per-guide deep-link rows to `10-…md`/`11-…md`. SC#1 "includes rows for guide 10 … and guide 11" is satisfied by the enriched summary row.
- **D-02 (Desktop Engineering L2 table, line 123):** Every macOS L2 symptom row points at the `l2-runbooks/00-index.md#macos-ade-runbooks` **anchor**, never a numbered runbook file (the #27 row at :123 is the precedent; the only numbered-file link is the log-collection guide at :120). → Add **two discrete rows** — "macOS Kerberos SSO Investigation" and "macOS Graph Credential Investigation" — each linking to `l2-runbooks/00-index.md#macos-ade-runbooks`.
- **Overrode the Finder (1a):** the iOS Admin Setup table *does* deep-link numbered guides (lines 165–167), but that is a different section; the macOS table's own convention governs macOS rows. SC#1 does NOT mandate discrete per-guide deep-links.

### D2 — 00-index.md escalation mapping (SC#4) → EXISTING ROWS + NO FABRICATED L1 ROW (option 2a)
- **D-03:** The #28/#29 When-to-Use rows **already exist** at `00-index.md:87-88` (shipped P85), satisfying the "rows" half of SC#4. **Add NO row** to the macOS L1 Escalation Mapping table (lines 90–100): P85 **D-05 LOCKED** that no L1 Kerberos/Graph runbook exists, so options 2b (Microsoft-Support row) and 2c (peer #27→#28 row) would fabricate a non-existent escalation source and break the table's `L1 source → L2` grammar. The L2-only reality is carried in the common-issues.md entry's prose (D-05 below), in the established "no L1 runbook — escalate to L2" style.
- Both Finder and Adversary agreed; Referee confirmed. (No new row in 00-index beyond what P85 already shipped — this SC is effectively a verify-and-confirm + carry the L2-only stance.)

### D3 — quick-ref-l2.md Kerberos diagnostics (SC#3) → klist ONLY + pointer (option 3c)
- **D-04:** `app-sso platform -s` is **already on the page** (line ~185, under `#### Platform SSO Attestation Command`); `klist` is **absent everywhere**. → Add a `#### Kerberos SSO Diagnostics` block (sibling to the existing PSSO Attestation block) containing **only the new `klist`** command (version-stable form, **NO `klist -v`** per P83 D-13) with a one-line note on reading the ticket cache, plus a pointer sentence to the existing `app-sso platform -s` block (interpret `tgt_ad` on-prem vs `tgt_cloud` Entra, per P83 D-12). **Do NOT re-state the `app-sso platform -s` fenced block** — duplication violates over-documentation discipline and splits the locked D-12 interpretation across two copies.
- **`app-sso diagnose` remains PROHIBITED** (P83 D-11). SC#3 "include `app-sso platform -s` AND `klist`" is met: app-sso is already present, klist is added — both Kerberos-contextualized.
- **Overrode the Finder (3a, new subsection re-stating app-sso).**

### D4 — common-issues entry + decision-tree leaf (SC#2 + SC#5) → 4a + 4d (RED leaf)
- **D-05 (common-issues.md, SC#2) → standalone entry (4a):** Add a new `### Kerberos SSO Extension Failure` symptom entry after the `### Platform SSO Sign-In Failure` entry (`:213-218`), matching the file's one-symptom-per-`###` grammar. Symptom: Kerberos TGT not acquired / realm/KDC unreachable / `usePlatformSSOTGT` integration failure. **L2-only** routing: an `L1:` line in the "no L1 runbook — escalate to L2" prose style (precedent: TPM `:64`, Hybrid Join `:87`) + an `L2:` link to `l2-runbooks/28-macos-kerberos-sso-investigation.md`. Folding under the PSSO entry (4b) was rejected — #28 is a different runbook than #27.
- **D-06 (06-macos-triage.md placement, SC#5) → sub-branch under MACSSO (4d):** Add the Kerberos leaf as a **third arm under the existing MACSSO diamond** (`:43-45`), NOT as a new MAC3 primary-symptom branch (4c). The tree deliberately funnels all SSO symptoms through MAC3 → MACSSO; at triage a user cannot distinguish Kerberos-extension from PSSO. Keeps within the documented 3-edge routing budget (MAC1→MAC3→MACSSO→leaf).
- **D-07 (06-macos-triage.md leaf color, SC#5) → RED `escalateL2`:** The new leaf MUST be classed **red `escalateL2`** (like `MACE1`), NOT green `resolved` like its MACSSO siblings MACR7/MACR8. Verified at `:56-60`: MACR7/8 are green *only because they route to L1* #35/#36; the legend (`:24-25`) is green = "follow the linked L1 runbook," red = "Escalate to L2." Since #28 is an **L2** runbook (no L1 Kerberos runbook exists, D-05), red is mandatory. Add a `click` to `../l2-runbooks/28-macos-kerberos-sso-investigation.md`, a matching Routing Verification row (`:67-77`), and a Version-History line.
- **Overrode the Finder on tree placement (4c→4d)**; upheld the Finder on leaf color (red) with the corrected rationale; both agents agreed on 4a.

### Claude's Discretion (planner/executor's call, within the decisions above)
- Exact "When to Use" cell wording for the enriched Admin Setup row and the two new L2 rows (D-01/D-02).
- Exact `klist` note wording and the Kerberos-pointer sentence phrasing (D-04).
- Exact symptom prose and L1/L2 bullet wording for the common-issues entry (D-05).
- Exact MACSSO third-arm edge label and the new leaf node ID/text (D-06/D-07), subject to the plan-time MACSSO-label item below.
- Per-plan commit granularity within the append-only / navigation-last constraints.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase contract & requirements
- `.planning/ROADMAP.md` §"Phase 87: Navigation Hub Integration" — Goal (navigation-last invariant) + SC#1–5 (lines 141–145) + plans 87-01/87-02. Each SC names the exact file and the exact rows/entries/commands required.
- `.planning/REQUIREMENTS.md` — **REF-03** (line 47): nav hubs integrate the new content navigation-last across all 5 files.
- `.planning/PROJECT.md` — v1.10 single-feature content milestone; **over-documentation discipline** (load-bearing for D-04); sequential-on-main-tree (no worktrees).

### Prior phase decisions (carried forward — do NOT re-ask)
- `.planning/phases/85-capability-matrix-l2-runbooks/85-CONTEXT.md` — **D-05 LOCKED**: no L1 Kerberos and no L1 Graph runbook exists; "from L1 escalation" routing blocks for #28/#29 are forbidden (governs D-03, D-05, D-07). Also records the #28/#29 00-index rows already shipped, and the `tgt_ad`/`tgt_cloud` interpretation (`:54`).
- `.planning/phases/83-kerberos-sso-extension-guide/83-CONTEXT.md` — **D-10/D-11/D-13 LOCKED**: `app-sso platform -s` + `klist` canonical pair; `app-sso diagnose` PROHIBITED; `klist` version-stable form (NO `-v`). **D-12**: `tgt_ad` (on-prem AD) vs `tgt_cloud` (Entra) output interpretation (governs D-04).

### Target nav-hub files (to edit)
- `docs/index.md` — macOS Admin Setup table (lines 125–132; enrich line-132 row → `00-overview.md`, D-01) + Desktop Engineering L2 table (lines 112–123; two discrete rows → `00-index.md#macos-ade-runbooks`, D-02). Version-history precedent: line 323 (Phase 81 SSOREF-04 appended Platform SSO nav rows).
- `docs/common-issues.md` — macOS ADE Failure Scenarios (lines 157–225); add `### Kerberos SSO Extension Failure` after `### Platform SSO Sign-In Failure` (`:213-218`); L1-line "no L1 runbook" precedents at `:64`/`:87` (D-05).
- `docs/quick-ref-l2.md` — macOS ADE Quick Reference (lines 132–198); existing `#### Platform SSO Attestation Command` with `app-sso platform -s` at `:180-188`/`:185`; add sibling `#### Kerberos SSO Diagnostics` with `klist` only (D-04).
- `docs/l2-runbooks/00-index.md` — macOS ADE Runbooks When-to-Use rows #28/#29 already at `:87-88`; macOS L1 Escalation Mapping table `:90-100` (add NO row, D-03); MAM-WE no-source note precedent `:135`/`:168`.
- `docs/decision-trees/06-macos-triage.md` — Mermaid tree (`:29-60`), MACSSO diamond `:43-45`, classDef `:56-60` (MACR7/8 = `resolved`/green, MACE1 = `escalateL2`/red), legend `:24-25`, Routing Verification table `:67-77`, 3-edge budget `:15`/`:65` (D-06/D-07).

### Content link targets (already committed — navigation-last satisfied)
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` (P83), `docs/admin-setup-macos/11-graph-api-platform-credential.md` (P84) — Admin Setup row references (via 00-overview).
- `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md`, `docs/l2-runbooks/29-macos-graph-credential-investigation.md` (P85) — L2 row + common-issues + tree leaf targets.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase 81 SSOREF-04 nav-edit precedent** — appended Platform SSO rows to the exact same macOS Admin Setup / L1 / L2 tables in `index.md` and added a Platform SSO leaf + Routing Verification rows to `06-macos-triage.md` (version-history at `index.md:323`, `06-macos-triage.md:106`). Direct template for every Phase 87 edit.
- **macOS L2 table #27 row** (`index.md:123`) — exact grammar/link-target model for the two new #28/#29 rows (D-02).
- **macOS Admin Setup Platform SSO row** (`index.md:132`) — exact grammar/link-target model for the enriched guide-10/11 row (D-01).
- **common-issues "no L1 runbook — escalate to L2" entries** (`:64` TPM, `:87` Hybrid Join) — L1-line style for the L2-only Kerberos entry (D-05).
- **MAM-WE no-source advisory note** (`00-index.md:135`/`:168`) — house pattern for documenting a deliberate escalation-mapping gap (informs D-03 stance).

### Established Patterns
- **Append-only nav edits + Version-History stamp** — every touched nav file carries a Version-History table; add a dated Phase 87 row to each.
- **Mermaid classDef discipline** in `06-macos-triage.md` — leaf color is determined by destination level (green=L1, red=L2), not by visual symmetry with siblings (D-07).
- **Anchor-link convention** — macOS L2 rows link to `00-index.md#macos-ade-runbooks`, not numbered files (D-02).

### Integration Points
- `index.md` macOS Admin Setup row (D-01) + two new L2 rows (D-02).
- `common-issues.md` macOS section new entry (D-05).
- `quick-ref-l2.md` macOS section new `#### Kerberos SSO Diagnostics` block (D-04).
- `06-macos-triage.md` MACSSO third arm + new red leaf + Routing Verification row (D-06/D-07).

</code_context>

<specifics>
## Specific Ideas

- **Plan-time verification items (from the Referee — carry into RESEARCH/PLAN/VERIFY):**
  1. **MACSSO diamond label vs Kerberos arm (D-06):** the live MACSSO question (`06-macos-triage.md:43`) is PSSO-registration-specific ("Did a 'Registration Required' notification ever appear?"). Adding a Kerberos arm cleanly may require broadening the diamond label or interposing a Kerberos-vs-PSSO discriminator — resolve WITHOUT breaking the 3-edge routing budget.
  2. **L2-index anchor slug (D-02):** confirm the live macOS heading anchor in `00-index.md` is exactly `#macos-ade-runbooks` at edit time (present at `:71`/`:86`).
  3. **klist form (D-04):** author the locked version-stable `klist` (plain `klist`, NO `-v`) per P83 D-13.
  4. **Frozen-surface guard:** verify no `check-phase` byte-unchanged baseline guard couples `index.md` or `06-macos-triage.md` before committing (none flagged for these two in P85, but Phase 87 is a distinct scope — confirm).
- **Diagnostics literals are LOCKED, do not re-derive:** `app-sso platform -s` (interpret `tgt_ad` vs `tgt_cloud`) + `klist` (no `-v`); `app-sso diagnose` never appears.

</specifics>

<deferred>
## Deferred Ideas

- **v1.10 harness lineage bump (Atom 1 + Atom 2), check-phase-83..88 validators, audit-harness-v1.10-integrity.yml, 3-axis terminal re-audit, milestone close** — all **Phase 88** (MUST be last).
- **Any new L1 Kerberos or L1 Graph runbook** — none exists; not in v1.10 scope (would be a new phase/milestone). Until one exists, #28/#29 stay L2-entry-only.
- **Fabricated escalation-mapping rows for #28/#29** — rejected (D-03); no L1 source exists to map from.

### Reviewed Todos (not folded)
None — `todo.match-phase` returned no matches for Phase 87.

</deferred>

---

*Phase: 87-navigation-hub-integration*
*Context gathered: 2026-06-23*
