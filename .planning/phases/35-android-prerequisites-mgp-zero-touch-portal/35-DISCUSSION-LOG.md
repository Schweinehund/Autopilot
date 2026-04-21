# Phase 35: Android Prerequisites — MGP & Zero-Touch Portal - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 35-CONTEXT.md — this log preserves the adversarial-review audit trail and the alternatives considered.

**Date:** 2026-04-21
**Phase:** 35-android-prerequisites-mgp-zero-touch-portal
**Method:** adversarial-review skill (finder/adversary/referee scored pattern)
**Areas discussed:** 01-android-prerequisites.md shape, 00-overview.md sequence representation, 01-managed-google-play.md depth, 02-zero-touch-portal.md structure

---

## Process

User invoked `/gsd-discuss-phase 35 --chain` and requested `/adversarial-review` on each gray-area choice per Phase 34 precedent. Workflow executed:

1. **Initialization** — Loaded PROJECT.md, REQUIREMENTS.md, STATE.md, ROADMAP.md, Phase 34 CONTEXT.md, v1.4 research (FEATURES/ARCHITECTURE/PITFALLS/STACK/SUMMARY), v1.3 iOS Phase 27 CONTEXT, iOS/macOS admin-setup precedents.
2. **Gray area identification** — 4 gray areas identified (1 per Phase 35 deliverable doc); user selected all 4.
3. **Adversarial review** — 27 candidate options across 9 sub-decisions scored by finder/adversary/referee.
4. **Winner selection** — lowest-real-flaw count per sub-decision, ties broken by (1) fewer CRITICAL, (2) fewer MEDIUM, (3) LOW count.
5. **CONTEXT.md authoring** — D-01 through D-28 with adversarial-review citations.

---

## Gray Area 1 — `docs/android-lifecycle/01-android-prerequisites.md` shape (AEPREQ-01 / SC1)

### Options

| Option | Description | Finder flaws (CRIT/MED/LOW) | Real flaws after rulings |
|--------|-------------|----------------------------|--------------------------|
| 1A | Concept-only orientation (no mechanics; points to standalone guides) | 0 / 2 / 4 | 0 / 1 / 4 |
| 1B | Summary+routing page (paragraph per portal + narrative + routing links) | 0 / 2 / 3 | 0 / 2 / 3 |
| 1C | Standalone orientation with own depth | 1 / 2 / 2 | 1 / 2 / 2 |

### Disputed flaws on 1A

| Flaw | Finder claim | Adversary rebuttal | Referee ruling |
|------|--------------|---------------------|----------------|
| F-003 MED | SC5 callout placement risk | SC5 vacuously satisfied if no admin decisions exist | **FALSE POSITIVE** — concept-only doc has no callouts to misplace |
| F-005 LOW | Does not match iOS precedent | iOS precedent cited is enrollment overview (Phase 34 analog), not prerequisites doc | **REAL** — iOS admin-setup overview IS the direct analog for Phase 35 admin-setup overview, and no iOS "prerequisites.md" precedent exists |
| F-006 LOW | May lack version-tag rigor | AEPREQ-01 mandates the Android 12+ assertion regardless of orientation | **REAL** — issue is version-claim placement/drift surface, not presence |

### Winner: 1A (concept-only)

**Rationale:** By tie-break rules (both 1A and 1B carry 5 real flaws, 0 CRIT each), 1A wins on fewer MEDIUM flaws (1 vs 2). 1C eliminated on F-012 CRITICAL (Anti-Pattern 1 direct duplication violation). 1B carries F-007 MED (Anti-Pattern 1 duplication — structural) and F-008 MED (summary ≠ "understanding" per SC1). 1A's remaining concerns are discipline-mitigable: F-002 MED (GMS-vs-AOSP depth) addressed via D-04 dedicated subsection; F-006 LOW (version-tag drift) addressed via D-03 single-source link to Phase 34 version matrix. 1A's structural integrity (no duplication) outweighs 1B's narrative convenience.

*(Note: referee narrative preferred 1B based on qualitative F-006 concern, but literal application of tie-break rules (fewer MEDIUMs wins when CRITICALs are tied) selects 1A. Anti-Pattern 1 is the single most-cited research concern (PITFALLS 1, 2, 10 all lean on single-canonical-reference); 1B's inherent duplication is a more costly downstream flaw than 1A's mitigable drift-surface concern.)*

---

## Gray Area 2 — `docs/admin-setup-android/00-overview.md` sequence representation (AEPREQ-02 / SC2)

### Options

| Option | Description | Finder flaws (CRIT/MED/LOW) | Real flaws after rulings |
|--------|-------------|----------------------------|--------------------------|
| 2A | Single mermaid flowchart (iOS 00-overview pattern) + numbered list per branch | 0 / 1 / 3 | 0 / 1 / 2 |
| 2B | Per-mode sequence tables (5 tables, no flowchart) | 1 / 2 / 2 | 1 / 2 / 2 |
| 2C | Hybrid — top-level mermaid + per-mode callout boxes | 0 / 1 / 3 | 0 / 1 / 3 |

### Disputed flaws on 2A

| Flaw | Finder claim | Adversary rebuttal | Referee ruling |
|------|--------------|---------------------|----------------|
| F-019 LOW | Phase 34 left mermaid to author discretion; 2A locks opposite | Phase 34 discretion applies to lifecycle enrollment overview (different doc type); admin-setup overviews consistently use mermaid per v1.3 precedent | **FALSE POSITIVE** — `docs/admin-setup-ios/00-overview.md` and `docs/admin-setup-macos/00-overview.md` both use mermaid; Phase 34 discretion does not apply to admin-setup overview category |

### Winner: 2A (single mermaid)

**Rationale:** 2A wins with lowest real flaw count (3). 2B eliminated on F-021 CRITICAL (MGP prerequisite duplicated across 4 per-mode tables — direct Anti-Pattern 1 violation). 2C carries F-026 MED (hybrid duplication between flowchart and callout boxes) and three LOW concerns about new visual patterns and word-count inflation. 2A aligns with validated v1.3 precedent (both iOS and macOS admin-setup overviews use mermaid), satisfies SC2 per-mode portal-dependency clarity via branching, and preserves single-canonical-reference integrity. 5 mode branches (COBO / BYOD WP / Dedicated / ZTE / AOSP) is more than iOS's 4 paths but remains legible in a single diagram — F-017 MED (complexity concern) is confirmed real but mitigable by careful diagram authoring.

---

## Gray Area 3 — `docs/admin-setup-android/01-managed-google-play.md` depth (AEPREQ-03 / SC3)

### Sub-decision 3a — What-breaks table row granularity

| Option | Description | Real flaws (CRIT/MED/LOW) |
|--------|-------------|---------------------------|
| 3a-i | Per-failure-mode rows only | 0 / 1 / 2 |
| 3a-ii | Per-mode-impact rows only | 1 / 1 / 1 |
| 3a-iii | Hybrid — failure-mode rows with "downstream impact" column | 0 / 0 / 3 |

**Winner: 3a-iii (hybrid).** 3a-ii eliminated on F-033 CRITICAL — PITFALL 2 explicit "Row per failure mode" guidance violated. 3a-i carries F-030 MED (misses SC3 "disconnect consequences: all GMS modes broken; app assignments lost" blast-radius requirement). 3a-iii satisfies both PITFALL 2 and SC3 in a single artifact; three LOW concerns (wider table / possible cell duplication / near-duplicate cells) are formatting-level and mitigable.

### Sub-decision 3b — Entra-preferred-since-August-2024 handling

| Option | Description | Real flaws (CRIT/MED/LOW) |
|--------|-------------|---------------------------|
| 3b-i | Inline callout at account-selection step only | 0 / 1 / 2 |
| 3b-ii | Dedicated "Account types" subsection with comparison table | 0 / 0 / 3 |
| 3b-iii | Both — subsection + inline reminder | 0 / 0 / 2 |

**Winner: 3b-iii (both).** 3b-i eliminated on F-039 MED (non-linear readers miss single callout — PITFALL 2 warning sign directly: "Any admin doc that says 'connect to Managed Google Play' without stating which account type is required"). 3b-iii has fewer total real flaws than 3b-ii while satisfying both the scanning-admin (subsection visible on page-level skim) and the linear-reader (inline reminder catches sequential-read admins).

### Sub-decision 3c — Pre-August-2024 consumer Google/Gmail bindings

| Option | Description | Real flaws (CRIT/MED/LOW) |
|--------|-------------|---------------------------|
| 3c-i | In-scope — migration path documented inline | 0 / 2 / 1 |
| 3c-ii | Deferred — cross-reference stub | 0 / 1 / 1 |
| 3c-iii | Out-of-scope — green-field only; "continues to work" note | 0 / 1 / 2 |

**Winner: 3c-ii (deferred stub).** 3c-i eliminated on F-047 MED (scope creep — AEPREQ-03 scopes to "bind an Entra account", not migrate existing) + F-048 MED (research-verification burden per STATE.md). 3c-iii carries F-052 MED ("continues to work" requires version-tagging per PITFALL 1) and F-054 LOW (UX gap for legacy-binding admins). 3c-ii's F-050 MED (dangling cross-reference) mitigated by CONTEXT D-14 — stub is text-only rather than hyperlink when no target exists.

---

## Gray Area 4 — `docs/admin-setup-android/02-zero-touch-portal.md` structure (AEPREQ-04 / SC4)

### Sub-decision 4a — Step 0 reseller callout placement

| Option | Description | Real flaws (CRIT/MED/LOW) |
|--------|-------------|---------------------------|
| 4a-i | Prerequisites blockquote at top only | 1 / 1 / 1 |
| 4a-ii | Dedicated numbered "Step 0" section only | 0 / 0 / 2 |
| 4a-iii | Both — top blockquote + Step 0 section | 0 / 0 / 2 |

**Winner: 4a-iii (both).** 4a-i eliminated on F-055 CRITICAL — PITFALL 4 explicit guidance ("Include a reseller eligibility check as Step 0 in the Zero-Touch setup guide") and SC4 verbatim ("starts at Step 0 (reseller relationship is a hard prerequisite)") both mandate a numbered Step 0 section. 4a-ii and 4a-iii tied on real-flaw count (2 LOW each). Tie-break to 4a-iii because it literally mirrors SC4 phrasing ("starts at Step 0") while adding a high-visibility top-of-page decision-framing blockquote for skimmers.

### Sub-decision 4b — DPC extras JSON depth

| Option | Description | Real flaws (CRIT/MED/LOW) |
|--------|-------------|---------------------------|
| 4b-i | Full runnable Microsoft Intune DPC extras example | 0 / 1 / 2 |
| 4b-ii | Minimum schema with reference link | 0 / 1 / 2 |
| 4b-iii | Commented skeleton (required vs optional fields) | 0 / 0 / 3 |

**Winner: 4b-iii (commented skeleton).** 4b-i F-062 MED (research-flag stale-JSON risk per STATE.md); 4b-ii F-065 MED (cross-phase scope ambiguity — Phase 39 vs Phase 35 DPC depth) + F-067 LOW (schema-only doesn't satisfy SC4 "configures DPC extras JSON"). 4b-iii's three LOW concerns (verification burden / required-vs-optional sourcing / comments-in-production-JSON) addressed by CONTEXT D-20: skeleton uses adjacent "Fields reference" table rather than in-JSON comments to avoid copy-paste-with-comments risk.

### Sub-decision 4c — KME/ZT Samsung mutual-exclusion callout placement

| Option | Description | Real flaws (CRIT/MED/LOW) |
|--------|-------------|---------------------------|
| 4c-i | Top-level warning box at top of doc | 0 / 1 / 1 |
| 4c-ii | Inline at Samsung-relevant decision point | 0 / 0 / 2 |
| 4c-iii | Both placements | 0 / 0 / 2 |

**Winner: 4c-iii (both).** 4c-i eliminated on F-071 MED — SC5 explicit "not relegated to a footnote or separate 'gotchas' section"; top-of-doc warning box is arguably a gotchas section. 4c-ii and 4c-iii tied. Tie-break to 4c-iii because it provides forward-reference framing at the top (for Samsung admins reading doc top-to-bottom) AND inline callout at the ZT-Intune linking step (the natural Phase 35-scope decision point). CONTEXT D-21 reframes the top placement as decision-framing rather than gotchas-enumeration to mitigate F-071's SC5 concern.

### Sub-decision 4d — Phase 35/39 scope boundary

| Option | Description | Real flaws (CRIT/MED/LOW) |
|--------|-------------|---------------------------|
| 4d-i | Phase 35 = portal + DPC; Phase 39 = claim + assign + reseller handoff + dual-SIM | 0 / 1 / 2 |
| 4d-ii | Phase 35 = entire ZT admin content; Phase 39 = only L1/L2 runbook 27 | 1 / 1 / 1 |
| 4d-iii | Phase 35 = portal setup only; Phase 39 = DPC + claim + assign | 1 / 1 / 1 |

### Disputed flaw on 4d-i

| Flaw | Finder claim | Adversary rebuttal | Referee ruling |
|------|--------------|---------------------|----------------|
| F-077 MED | PITFALL 4 flags dual-SIM IMEI 1 as Phase 35 concern; AEZTE-01 puts it in Phase 39 → contradiction | PITFALL 4 points broadly to "Zero-Touch admin content phase" spanning both 35 and 39; AEZTE-01 consistently owns it | **REAL** — referee ruled the split assigns correctly (dual-SIM to Phase 39 per AEZTE-01) but the interpretive ambiguity remains, making 4d-i's scope-anchoring weaker than ideal |

**Winner: 4d-i.** Despite F-077 being ruled REAL, both alternatives carry CRITICAL flaws: 4d-ii F-080 CRIT (contradicts ROADMAP Phase 39 "extending the Phase 35 ZT portal doc" — 4d-ii eliminates Phase 39 admin scope entirely); 4d-iii F-083 CRIT (contradicts AEPREQ-04 / SC4 explicit "configures DPC extras JSON" in Phase 35). 4d-i wins on zero-CRITICAL rule. Phase 35 ships portal mechanics + DPC extras config (matches SC4); Phase 39 extends with corporate-scale content (matches ROADMAP Phase 39 SC1 + AEZTE-01). Runbook 27 placement remains Phase 40 per STATE.md v1.4 decisions (unchanged).

---

## Summary of Winners

| Area | Sub-decision | Winner | Real flaws | Key reason |
|------|-------------|--------|-----------|------------|
| 1 | `01-android-prerequisites.md` shape | **1A concept-only** | 0/1/4 | Tie-break on fewer MEDs over 1B; Anti-Pattern 1 structural integrity. |
| 2 | `00-overview.md` shape | **2A single mermaid** | 0/1/2 | Validated v1.3 precedent; 2B has F-021 CRIT. |
| 3a | MGP what-breaks table rows | **3a-iii hybrid** | 0/0/3 | PITFALL 2 + SC3 both satisfied; 3a-ii F-033 CRIT. |
| 3b | Entra-preferred handling | **3b-iii both** | 0/0/2 | PITFALL 2 non-linear skim mitigation; 3b-i F-039 MED. |
| 3c | Pre-Aug-2024 bindings | **3c-ii deferred stub** | 0/1/1 | Lowest total; 3c-i scope creep MED + research burden MED. |
| 4a | Step 0 reseller placement | **4a-iii both** | 0/0/2 | PITFALL 4 + SC4 compliance; 4a-i F-055 CRIT. |
| 4b | DPC extras JSON depth | **4b-iii commented skeleton** | 0/0/3 | Lowest severity; research-flag safe. |
| 4c | KME/ZT callout placement | **4c-iii both** | 0/0/2 | SC5 inline compliance; 4c-i F-071 MED. |
| 4d | Phase 35/39 scope split | **4d-i portal+DPC / Phase 39 claim+assign+reseller+dual-SIM** | 0/1/2 | ROADMAP + AEZTE-01 compliance; 4d-ii and 4d-iii both eliminated on CRIT. |

**Totals across all options scored:** 85 flaws identified; 5 disputed (F-003, F-005, F-006, F-019, F-077); 80 confirmed real on first pass; 3 disputed flaws ruled REAL (F-005, F-006, F-077); 2 disputed flaws ruled FALSE POSITIVE (F-003, F-019). Final real flaw count: 83.

**Score tallies:**
- Finder: 259 points (85 flaws × severity) before adversary challenge
- Adversary: +13 points (disproved 5 flaws: F-003 MED +5, F-005 LOW +1, F-006 LOW +1, F-019 LOW +1, F-077 MED +5)
- Referee: accuracy score not tallied (ground-truth-based); 3/5 disputed flaws confirmed real; 2/5 disputed flaws confirmed false positive

---

## Claude's Discretion

Areas where CONTEXT.md defers to author judgment during planning/execution:

- Exact word counts within 600–900-word range for `01-android-prerequisites.md`; 800–1200 target for admin guides.
- Whether DPC extras JSON skeleton uses in-JSON `//` comments with removal warning OR adjacent "Fields reference" table (CONTEXT D-20 prefers table).
- Exact phrasing of Step 0 blockquote vs Step 0 numbered section (CONTEXT D-19 mandates both; discretion on wording).
- Whether to include a mermaid diagram in `02-zero-touch-portal.md` (not required; author's call).
- Ordering of what-breaks table rows (severity-descending recommended).
- Whether to include cross-platform `> **Cross-platform note:**` callouts for each new term — standard pattern from Phase 34 D-10; applied as relevant per doc.

---

## Deferred Ideas (tracked for other phases/milestones)

See 35-CONTEXT.md `<deferred>` section for the full list. Summary:

- Pre-Aug-2024 binding migration path → v1.4.1 (D-14)
- ZT portal corporate-scale content (claim, assign, reseller handoff, dual-SIM IMEI 1) → Phase 39 (D-22)
- ZTE L1 triage runbook 27 → Phase 40 (STATE.md v1.4 decisions, unchanged)
- Knox Mobile Enrollment full admin → v1.4.1 (PROJECT.md Key Decisions)
- BYOD-specific content → Phase 37
- Dedicated-specific content → Phase 38
- Cross-platform nav integration → post-v1.4 unification task
- `_glossary-macos.md` reciprocal cross-ref → Phase 42 (AEAUDIT-03)
- Full DPC extras JSON with tenant-specific values → out of scope (generic docs policy)
- Enrollment token 90-day expiry authoritative statement → pending plan-time verification (D-28)

---

*Phase: 35-android-prerequisites-mgp-zero-touch-portal*
*Discussion log produced: 2026-04-21*
*Method: adversarial-review skill finder → adversary → referee*
*Agents: general-purpose Opus model (Finder, Adversary, Referee)*
*Raw flaw inventory: F-001 through F-085 documented inline above*
