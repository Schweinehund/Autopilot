# Phase 47: Integration & Re-Audit - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `47-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-04-25
**Phase:** 47-integration-re-audit
**Areas discussed:** GA1 atomic-rebuild semantics; GA2 harness extension scope; GA3 re-audit closure artifact; GA4 wave structure × DEFER closure
**Method:** /adversarial-review skill (finder / adversary / referee) per user directive

---

## Process

User invoked `/gsd-discuss-phase 47 --chain` and selected all 4 gray areas with directive: "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."

Adversarial review pipeline:
1. **Finder** (Opus) enumerated 79 issues across 4 GAs / 12 options. Severity-weighted score: 17 CRITICAL × 10 + 41 MEDIUM × 5 + 21 LOW × 1 = **396 pts**.
2. **Adversary** (Opus) disproved 20 issues for **141 pts** (10 CRIT + 11 MEDIUM + 1 LOW), citing locked decisions across Phase 42 D-29, Phase 43 D-06, Phase 44 D-03/D-05, Phase 45 D-19/D-25, Phase 46 D-20/D-22/D-23, plus ROADMAP SC#1/SC#3/SC#4 verbatim text.
3. **Referee** (Opus) confirmed 18 of 20 Adversary disproves, picked winner per GA based on net surviving-issue weight.

Surviving Finder issues encoded as guard rails in `47-CONTEXT.md` D-decisions (D-04 hotspot scope fix; D-11 C9 reporter format defer; D-16 DEFER-numbering reconciliation rule; D-19 temporal-narrative fix; etc.).

---

## GA1 — AEINTEG-01 atomic-rebuild semantics

| Option | Description | Net Weight (post-adversarial) | Selected |
|--------|-------------|-------------------------------|----------|
| A | Verification-only pass; zero edits unless drift detected | 30 (2 CRIT + 2 MED + 1 LOW after A5 disproved) | |
| B | Single-author rebuild from scratch (Phase 42 Wave 1 mirror verbatim) | 35 (2 CRIT + 3 MED + 1 LOW after B3/B4 disproved) | |
| **C** | Surgical re-canonicalization at 3 SC#1 hotspots (matrix column-ordering / Mermaid leaves / glossary line 15) | 10 (2 MED after C1/C2/C4/C6 disproved) | ✓ |

**User's choice:** Option C (Recommended) — confirm.

**Notes:** Adversary disproved C1 (SC#1 names hotspots verbatim; bare-Knox is C7 audit-reporting scope, not content scope), C2 (Phase 46 D-22 ZERO new paired rows for COPE; D-34 reconciled in Wave 2), C4 (Plan 45-10 already shipped lines 121-127 via append-only; Option C scope is the SC#1-named three only), C6 (Phase 46 D-20 + Phase 44 D-05 already locked column / branch placements). Surviving C3 (verb-strength mismatch fair) + C5 (pin shifts real but managed) encoded as D-04/D-06 guard rails.

---

## GA2 — AEINTEG-02 harness extension scope

| Option | Description | Net Weight (post-adversarial) | Selected |
|--------|-------------|-------------------------------|----------|
| A | Narrow: C4 regex + C6 targets only | 21 (4 MED + 1 LOW; A1-A5 all confirmed) | |
| **B** | Full: A + C7 suffix calibration + C9 sidecar tuning | 12 (3 MED + 2 LOW after B1/B3 disproved) | ✓ |
| C | Broader: B + new C8 anti-paste-block marker drift detection | 41 (3 CRIT + 2 MED + 1 LOW; all confirmed) | |

**User's choice:** Option B (Recommended) — confirm.

**Notes:** Adversary disproved B1 ("no harness code edits for COPE phrases" rule applied to BANNED-PHRASE LIST sidecar JSON only, not all C9 implementation; C7 suffix-list tuning is exactly what AEINTEG-02 SC#2 enumerates) and B3 (C6/C7/C9 informational-first per D-29 always PASS by design; tuning banned-phrase list cannot retroactively flip Phase 46 informational PASS to FAIL). Option C eliminated on 3 CRITs — C8 not in SC#2 enumeration; Phase 44 line 170 alternation; Phase 43 D-06 only enumerated C6/C7/C9 in v1.4.1 informational-first scope. C8 routed to v1.5 backlog (CONTEXT Deferred Ideas).

---

## GA3 — AEINTEG-03 re-audit closure artifact

| Option | Description | Net Weight (post-adversarial) | Selected |
|--------|-------------|-------------------------------|----------|
| **A** | Append re_audit_resolution: to v1.4-MILESTONE-AUDIT.md as YAML sibling child keys + flip status: tech_debt → passed | 6 (1 MED + 1 LOW after A1/A2/A4 disproved) | ✓ |
| B | New v1.4.1-MILESTONE-AUDIT.md only; skip v1.4 status flip | 32 (2 CRIT + 2 MED + 2 LOW; all confirmed) | |
| C | Both: append v1.4 + author new v1.4.1 doc | 16 (3 MED + 1 LOW after C1/C2 disproved) | |

**User's choice:** Option A (Recommended) — confirm.

**Notes:** Adversary disproved A1 (ROADMAP SC#3 mandates appending to v1.4 doc; no SC requires separate v1.4.1 doc; "audit-corpus gap" is fictional — v1.4 doc with appended block IS the canonical v1.4.1 closure record per Phase 43 Plan 09 precedent), A2 (existing re_audit_resolution YAML mapping has DEFER-04 as child key; adding sibling child keys is standard YAML mapping syntax), A4 (harness CODE frozen at 3c3a140; audit DOC metadata at that timestamp can be updated when doc closes — Phase 43 Plan 09 already updated metadata for DEFER-04 without violating freeze). Option B eliminated on 2 CRITs — direct SC#3 violation + PROJECT.md narrative break. Option C eliminated on cost (C3-C5 doubles author effort + no corpus precedent for x.y point-release audit docs). Surviving A3/A5 encoded as D-16/D-19 guard rails.

---

## GA4 — Phase 47 wave structure × DEFER-01..06 closure surfacing

### Wave structure axis

| Option | Description | Net Weight (post-adversarial) | Selected |
|--------|-------------|-------------------------------|----------|
| W1 | Single mega-plan (Phase 46 single-plan pattern) | 11 (2 MED + 1 LOW after W1.1/W1.2 disproved) | |
| W2 | Two-wave (Wave 1 = AEINTEG-01+02; Wave 2 = AEINTEG-03+04) | 6 (1 MED + 1 LOW after W2.1 disproved) | |
| **W3** | Four-plan (one per AEINTEG req with AEINTEG-03 LAST) | 6 (1 MED + 1 LOW after W3.1/W3.2/W3.4 disproved) | ✓ |

### DEFER closure axis

| Option | Description | Net Weight (post-adversarial) | Selected |
|--------|-------------|-------------------------------|----------|
| **D1** | Append "Closed Deferred Items" subsection to PROJECT.md Context | 11 (2 MED + 1 LOW; D1.1-D1.3 all confirmed) | ✓ |
| D2 | Inline annotation per DEFER reference location | 11 (2 MED + 1 LOW; D2.1-D2.3 all confirmed) | |
| D3 | Delete entirely (no longer relevant post-flip) | 26 (2 CRIT + 1 MED + 1 LOW; all confirmed) | |

**User's choice:** W3 × D1 (Recommended) — confirm.

**Notes:**
- W3 wave structure: Adversary disproved W3.1 (SC#1 "single integration wave" applies to AEINTEG-01 deliverable bundle, not entire phase; AEINTEG-02/03/04 each have separate SCs), W3.2 ("LAST plan (not interleaved)" applies to AEINTEG-03 specifically; 4-plan structure honors this with AEINTEG-03 as Plan 47-04), W3.4 (atomicity is per-deliverable not cross-phase). W1 and W2 had higher cost on confirmed survivors. W3 produces clearest plan-by-plan ownership: 47-01 = AEINTEG-01 atomic re-canonicalization; 47-02 = AEINTEG-02 harness extensions; 47-03 = AEINTEG-04 PROJECT.md closure; 47-04 = AEINTEG-03 terminal re-audit (LAST per ROADMAP L205).
- D1 vs D2: tied at weight 11 in raw scoring. D1 picked because it concentrates closure information in one subsection (cleaner audit reading) and avoids D2.2's verb-tense mismatch (target-feature → closed-feature inside an "in scope" block). D3 eliminated on 2 CRITs — destroys audit trail; ROADMAP SC#4 verbatim "DEFER-01..06 closed in Context notes" mandates retention with closure annotation.

---

## Cross-cutting Implementer Guard Rails (from referee notes)

1. Plan 47-04 strictly LAST; never co-mit with Plans 47-01..03 (D-29).
2. C4 regex token list maintained as single string literal in harness file (no new sidecar — additive-only contract).
3. C7 suffix list extended to match Phase 44 D-01 5-SKU table verbatim (D-07).
4. Plan 47-04 pre-flight: verify harness 8/8 PASS post-Plan-47-03 commit; auditor-independence via fresh worktree (D-32).
5. Pre-flight all v1.4.1 docs at re-audit time: `last_verified` ≤ 60 days (Phase 34 D-14 / D-35).
6. DEFER-07 (AENAVUNIFY-04) and DEFER-08 (AECOMPARE-01) remain explicitly deferred to v1.5; PROJECT.md "Deferrals (tracked for v1.5)" block stays unchanged (D-39).
7. Cross-doc DEFER numbering: PROJECT.md DEFER-01..06 ≠ v1.4 audit DEFER-01..10. Each `re_audit_resolution:` child key cites BOTH numbering schemes (D-16); audit-doc numbering canonical, PROJECT.md numbering aliases.

## Claude's Discretion

- Exact "Closed Deferred Items" bullet prose (D-20)
- `resolution_plan` field shape (single ID vs. range string) (D-14)
- Whether to add `notes:` field per closure key (D-14)
- Plan 47-04 commit message wording for status flip (D-12)
- Pin-helper `--self-test` cadence (per plan or terminal-only) (D-31)

## Deferred Ideas

C8 anti-paste-block marker drift detection (Phase 44 D-03 byte-identity check); C9 reporter format upgrade (file:line surfacing); v1.4.1-MILESTONE-AUDIT.md dedicated doc (no x.y precedent yet); C7 50-char window tuning; plugin-architecture harness refactor (v1.6+); cross-template sentinel adoption (iOS/macOS/Windows). All routed to v1.5+ backlog per CONTEXT Deferred Ideas section.
