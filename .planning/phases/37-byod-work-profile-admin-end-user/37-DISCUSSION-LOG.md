# Phase 37: BYOD Work Profile — Admin + End-User - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 37-CONTEXT.md — this log preserves the alternatives considered
> and the adversarial-review scoring for each.

**Date:** 2026-04-22
**Phase:** 37-byod-work-profile-admin-end-user
**Method:** Adversarial review (finder → adversary → referee), 2 rounds
**Total flaws evaluated:** 166 (Round 1: 48; Round 2: 118)
**Adversary disproves accepted:** 8 (Round 1: 4; Round 2: 4)
**Gray areas resolved:** 8 (4 per round)

---

## Round 1 — 4 Gray Areas

### Area 1: L2 runbook 19 scope ownership

The contradiction being resolved:
- ROADMAP Phase 37 entry (line 144) lists requirements AEBYOD-01/02/03 only
- REQUIREMENTS.md traceability table line 187 maps AEL2-02 → Phase 41
- STATE.md v1.4 decisions section (line 75) claims Phase 37 delivers runbook 19 "honoring DAG"
- research/SUMMARY.md Phase 37 section (lines 201-213) lists runbook 19 as deliverable
- ROADMAP Phase 41 depends-on clause (line 195) says "runbook 19 was introduced in BYOD phase — this phase expands"

| Option | Description | Finder flaws | Adversary flaws disproved | Final score |
|--------|-------------|--------------|---------------------------|-------------|
| 1A | Phase 37 owns runbook 19 (add AEL2-02 to Phase 37; update traceability) | 14 (3C/6M/5L) = 65 | F-A10 LOW disproved | 13 real flaws (3C/6M/4L) |
| **1B (winner)** | **Phase 41 owns runbook 19 per DAG; correct STATE/SUMMARY/ROADMAP** | 13 (3C/5M/5L) = 60 | **F-B02 CRIT disproved** | **12 real flaws (2C/5M/5L)** |
| 1C | Hybrid — Phase 37 ships skeleton; Phase 41 fills | 16 (3C/7M/6L) = 71 | 0 disproved | 16 real flaws (3C/7M/6L) |

**User's choice:** 1B
**Key evidence:** ARCHITECTURE.md Q8 prerequisite DAG (lines 442-450) explicitly places runbook 19 in "Phase 6 (L2 runbooks)" group alongside 18/20/21 — NOT in "Phase 4 (mode-specific admin guides)". 1B aligns with the DAG's own structure; STATE.md line 75's "honoring DAG" citation was backwards.
**Notes:** Correction of STATE.md line 75 + SUMMARY.md lines 201/208 + ROADMAP line 195 is required; recorded as D-02 in CONTEXT.md to be handled in plan-phase or execute-phase commit.

---

### Area 2: Privacy boundary table duplication strategy

Both docs required per SC1 (admin technical) and SC2 (end-user plain-language) to carry "what IT can/cannot see" content in different voice. Decision is how to avoid drift.

| Option | Description | Finder flaws | Adversary flaws disproved | Referee adjustments | Final score |
|--------|-------------|--------------|---------------------------|---------------------|-------------|
| **2A (winner)** | **Canonical table in admin + end-user plain-language summary; keyword-grep sync contract** | 11 (3C/4M/4L) = 54 | 0 | **F-2A01 CRIT→MED** (Anti-Pattern 1 over-extension) | **10 real flaws (2C/4M/4L)** |
| 2B | Two independent tables + content rule in PHASE-LEVEL.md | 11 (3C/4M/4L) = 54 | 0 | — | 11 (3C/4M/4L) |
| 2C | Canonical in admin + verbatim embedded copy in end-user + CI audit | 11 (4C/4M/3L) = 63 | 0 | — | 11 (4C/4M/3L) |
| 2D | Shared YAML/JSON data file + dual markdown rendering | 12 (4C/4M/4L) = 64 | 0 | — | 12 (4C/4M/4L) |

**User's choice:** 2A
**Notes:** F-2A01 Anti-Pattern 1 CRIT downgraded to MED because privacy-boundary has no upstream canonical reference doc — admin doc IS the SSOT for this content, not a duplicate. This is the same logic applied to F-6a-01 in Round 2.

---

### Area 3: AMAPI migration callout placement

PITFALL 8 line 229 "AMAPI migration impact must be the first callout in the enrollment path overview" + AEBYOD-03 covers custom OMA-URI removal + Wi-Fi cert-auth + management app change.

| Option | Description | Finder flaws | Adversary flaws disproved | Final score | CRIT count |
|--------|-------------|--------------|---------------------------|-------------|------------|
| 3A | Top-of-doc dedicated section BEFORE prerequisites | 11 (3C/5M/3L) = 58 | 0 | 11 | 3 CRIT |
| 3B | Top banner + per-setting inline callouts | 11 (3C/5M/3L) = 58 | F-3B09 LOW disproved | 10 | 3 CRIT |
| **3C (winner)** | **Hybrid — banner + H2 after Key Concepts + inline reminders at settings** | 11 (0C/6M/5L) = 35 | 0 | **11** | **0 CRIT (decisive)** |
| 3D | Dedicated section AFTER prereqs ("strict D-03 clone") | 11 (3C/5M/3L) = 58 | 0 | 11 | 3 CRIT |

**User's choice:** 3C
**Notes:** Lowest-CRIT wins. 3C is the only option without CRIT flaws. Phase 35 D-13 hybrid-placement pattern + Phase 36 D-03 after-overview placement combine into 3C's three-part structure.

---

### Area 4: End-user guide scope (4 sub-decisions × 3 options)

#### 4a — Enrollment method coverage

| Option | Description | Final score | CRIT count |
|--------|-------------|-------------|------------|
| 4a-i | Company Portal only | 37 | 2 (PITFALL 8 + SC4) |
| 4a-ii | Company Portal + web enrollment in full | 28 | 1 (research flag) |
| **4a-iii (winner)** | **Company Portal primary + web enrollment sidebar** | **18** | **0** |

#### 4b — Troubleshooting scope

| Option | Description | Final score | CRIT count |
|--------|-------------|-------------|------------|
| 4b-i | Zero troubleshooting, single helpdesk pointer | 23 | 1 (PITFALL 6) |
| **4b-ii (winner)** | **Top-5 error messages + helpdesk routing** | **14** | **0** |
| 4b-iii | Full user-side troubleshooting | 37 | 2 (Phase 40 scope + PITFALL 6 format) |

#### 4c — Visuals policy

| Option | Description | Final score | CRIT count |
|--------|-------------|-------------|------------|
| **4c-i (winner)** | **Text-first, no screenshots** | **18** | **0** |
| 4c-ii | Screenshots allowed for end-user tier only | 36 | 1 (binary-asset hygiene) |
| 4c-iii | ASCII / box-draw diagrams | 28 | 1 (accessibility) |

**Notes:** F-4c-i-06 (LOW — "PROJECT.md does not contain 'text-first'") accepted; policy actually lives in REQUIREMENTS.md Section 5. Referenced correctly in CONTEXT.md canonical refs.

#### 4d — Terminology discipline

| Option | Description | Final score | CRIT count |
|--------|-------------|-------------|------------|
| 4d-i | "BYOD Work Profile" throughout (no clarification) | 23 | 1 (PITFALLS line 83) |
| 4d-ii | "personally-owned work profile (BYOD)" throughout | 22 | 0 |
| **4d-iii (winner)** | **First-use parenthetical + shorthand thereafter** | **15** | **0** |

**Adversary disprove:** F-4d-iii-05 LOW disproved — PITFALLS line 68 is the Work Profile row of the Pitfall 3 collision table, NOT a BYOD row; BYOD is not listed as a cross-platform collision term.

---

## Round 2 — 4 Additional Gray Areas

### Area 5: End-user guide length + structure pattern

| Option | Description | Finder flaws | Adversary disproved | Final score |
|--------|-------------|--------------|---------------------|-------------|
| 5a-i | Short linear (700-1200 words) | 7 (2C/3M/2L) = 37 | 0 | 37 |
| 5a-ii | Mid-length FAQ (1500-2200 words) | 7 (2C/3M/2L) = 37 | 0 | 37 |
| 5a-iii | Long split-style (2000-2800 words) | 8 (3C/3M/2L) = 47 | 0 | 47 |
| **5a-iv (winner)** | **Linear-with-inset hybrid (800-1500 words)** | 8 (4M/4L) = 24 | **F-5aiv-01 MED disproved** | **19** |

**Adversary disprove:** F-5aiv-01 argued Phase 35 D-13 is inapplicable to end-user docs. Disproved because D-13 is a structural pattern (subsection + inline), not audience-specific — Phase 36 D-07 reuses it, confirming cross-tier applicability.

---

### Area 6: Data transfer controls granularity

| Option | Description | Finder flaws | Adversary disproved | Referee adjustments | Final score |
|--------|-------------|--------------|---------------------|---------------------|-------------|
| **6a (winner)** | **6-row direction table (clipboard/contacts/calendar × in/out) with HTML-id scaffolding** | 8 (2C/4M/2L) = 42 | **F-6a-07 LOW disproved** | **F-6a-01 CRIT→MED** (Anti-Pattern 1 same over-extension as F-2A01) | **36** |
| 6b | Prose grouped by data type | 8 (2C/4M/2L) = 42 | 0 | — | 42 |
| 6c | Reference-only to canonical (new upstream matrix required) | 7 (3C/3M/1L) = 46 | 0 | — | 46 |
| 6d | Hybrid 3×3 table + prose | 8 (2C/4M/2L) = 42 | 0 | — | 42 |

**Adversary disproves:**
- F-6a-07 LOW: Phase 36 03-fully-managed-cobo.md uses 11 explicit `<a id="...">` HTML-id anchor tags — HTML-id scaffolding IS the shipped Phase 36 precedent, not a new pattern.
**Referee adjustment:** F-6a-01 (Anti-Pattern 1 violation) downgraded CRIT→MED because data transfer controls have no upstream canonical reference doc (Phase 34 matrices are provisioning-method + version, not data-transfer). 6a's 6-row table IS the canonical form, not a duplicate — same reasoning as F-2A01 Round 1 downgrade.

---

### Area 7: Anchor-stability contract

| Option | Description | Finder flaws | Adversary disproved | Final score |
|--------|-------------|--------------|---------------------|-------------|
| 7a | Full 12-anchor verbatim lock (Phase 36 D-10 clone) | 8 (0C/5M/3L) = 28 | 0 | 28 |
| 7b | Planner discretion (no CONTEXT lock) | 7 (2C/4M/1L) = 41 | **F-7b-05 MED disproved** | 36 |
| **7c (winner)** | **Partial — 5 mandatory + secondary discretionary** | 7 (0C/5M/2L) = 27 | 0 | **27** |
| 7d | Minimal — only downstream-consumer anchors locked | 8 (2C/5M/1L) = 46 | **F-7d-03 MED disproved** | 41 |

**Adversary disproves:**
- F-7b-05 MED: "Sections locked, anchors free" IS coherent — anchor slugs can be decoupled from heading text via explicit `<a id="">` tags. Phase 36 03-fully-managed-cobo.md demonstrates this shipped.
- F-7d-03 MED: Phase 36 CONTEXT D-10 explicitly reserves anchors "for Phase 38/39/40/41 consumers" with per-consumer justification. Claim of "no explicit downstream-consumer justification" is counter-factual.

**Notes:** 7c mandatory-5 = `#key-concepts`, `#amapi-migration`, `#enrollment-restrictions`, `#work-profile-policy`, `#privacy-boundary`. Secondary anchors are planner discretion.

---

### Area 8: AMAPI version-gate mechanism

| Option | Description | Finder flaws | Adversary disproved | Final score |
|--------|-------------|--------------|---------------------|-------------|
| 8a | Compact "(post-April-2025)" scope phrase only | 8 (3C/3M/2L) = 47 | 0 | 47 |
| 8b | URL-cited inline (techcommunity blog 4370417 at every callout) | 8 (3C/3M/2L) = 47 | 0 | 47 |
| 8c | Row-level last_verified frontmatter / HTML-comment extension | 8 (3C/3M/2L) = 47 | 0 | 47 |
| **8d (winner)** | **Inline HIGH/MEDIUM/LOW markers with source + date** | 8 (4M/4L) = 24 | 0 | **24** |

**Notes:** 8a/8b/8c each fail SC4 literal compliance ("confidence marker AND last_verified date labeled" per assertion). 8d is the only option satisfying all three SC4 components. Reader-visible inline brackets (vs Phase 36's HTML-comment invisibility) are a deliberate advancement on Phase 36 D-17 precedent — SC4's "labeled" verb implies reader-visibility.

---

## Adversary Disproves Summary

| Flaw ID | Area | Severity | Adversary claim | Referee verdict | Score delta |
|---------|------|----------|-----------------|-----------------|-------------|
| F-A10 | 1A | LOW | ROADMAP line 195 language is coherent under 1A (not 1B) | ✓ DISPROVED | +1 |
| F-B02 | 1B | CRIT | ARCHITECTURE.md DAG actually supports 1B (not against it) | ✓ DISPROVED | +10 |
| F-3B09 | 3B | LOW | Phase 36 D-05 uses ⚠️ emoji already; text-first policy is about screenshots | ✓ DISPROVED | +1 |
| F-4d-iii-05 | 4d-iii | LOW | PITFALLS line 68 is Work Profile row, BYOD not in collision table | ✓ DISPROVED | +1 |
| F-5aiv-01 | 5a-iv | MED | Phase 35 D-13 is structural pattern, not audience-specific | ✓ DISPROVED | +5 |
| F-6a-07 | 6a | LOW | Phase 36 03-fully-managed-cobo.md uses 11 HTML-id anchors already | ✓ DISPROVED | +1 |
| F-7b-05 | 7b | MED | Section-name/anchor-slug decoupling is coherent and shipped | ✓ DISPROVED | +5 |
| F-7d-03 | 7d | MED | Phase 36 D-10 has per-consumer justification | ✓ DISPROVED | +5 |

**Total Adversary net gain:** +29 (2 CRIT + 3 MED + 4 LOW = 10+15+4, correction: 1 CRIT+3 MED+4 LOW = 10+15+4 = 29)

**Total Referee severity adjustments:** 2 CRIT→MED downgrades (F-2A01 and F-6a-01, both Anti-Pattern 1 over-extensions when no upstream canonical exists)

---

## Claude's Discretion

Areas where user said "you decide" or deferred:
- Exact word counts within D-14 length-target ranges (admin 3000-4000; end-user 800-1500)
- Web enrollment sidebar format in end-user doc: H3 inside `## Enroll your device` vs dedicated H2 (H3 preferred)
- End-user doc audience callout exact phrasing
- Admin doc mermaid diagram inclusion (neither Phase 35 nor 36 universally did)
- Admin sidebar `## For IT helpdesk agents` precise wording within D-09 SC2 guardrail
- D-05b data transfer table row ordering (severity-descending or admin-journey-order acceptable)
- Optional admin-doc `## For L1 helpdesk agents` H2 (D-12 item 14) inclusion
- End-user "If something goes wrong" top-5 list format (numbered / bulleted / sub-H3)
- Exact wording of D-10 inline confidence markers within D-11 regex

## Deferred Ideas (recorded in CONTEXT.md deferred section)

22 ideas tracked including: pre-AMAPI BYOD migration path (v1.4.1 candidate), Knox ME (v1.4.1), WPCO (v1.4.1), 4-platform comparison (v1.5), cross-platform nav (post-v1.4 unification task), and 17 more.

## Cross-Round Interlocks

- **1B + 4b-ii**: Phase 41 owns L2; end-user top-5 stays bounded → no cross-tier duplication
- **2A + 4c-i**: Canonical + summary renders cleanly text-first
- **3C + 4d-iii**: Banner + first-use parenthetical = unified voice convention
- **5a-iv + 6a**: Admin doc carries 6a's 6-row table; end-user doc carries plain-language privacy summary only (no data transfer table)
- **7c + 6a**: `#data-transfer-controls` umbrella is discretionary; row-level sub-anchors (`#clipboard-work-to-personal` etc.) are planner choice
- **8d + 3C**: Source-confidence markers apply to AMAPI H2 content + the 3 inline reminders at Wi-Fi/OMA-URI/mgmt-app sections
