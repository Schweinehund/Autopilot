# Phase 32: Navigation Integration & References - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 32-CONTEXT.md — this log preserves the 14 candidate options and the adversarial-review flaw trail that drove winner selection.

**Date:** 2026-04-17
**Phase:** 32-navigation-integration-references
**Areas discussed:** Capability Matrix (NAV-03), Glossary Extension (NAV-01), NAV-02 Routing (common-issues + index), NAV-02 Quick-Ref Content
**Decision method:** Adversarial review (Finder/Adversary/Referee) — full trail below.

---

## User Selection

User selected all 4 gray areas for discussion. User requested: *"For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."*

Adversarial review executed via Finder/Adversary/Referee pattern:
- **Finder** (Opus): surfaced 68 flaws across 14 candidates — 7 Critical / 39 Medium / 22 Low = 287 points
- **Adversary** (Opus): attempted 2 disproves (F-A3-03, F-C1-04) — low-risk disproves only; 64 flaws conceded as real
- **Referee** (Opus): ruled 66 REAL ISSUE + 2 FALSE POSITIVE (both Adversary disproves confirmed correct)

---

## Gray Area A: iOS Capability Matrix Scope & Structure (NAV-03)

**SC #3 literal:** "The iOS capability matrix (`reference/ios-capability-matrix.md`) documents feature parity gaps across iOS, macOS, and Windows in a scannable table format."

### Candidates

| Candidate | Description | Finder Flaws | Referee Confirmed Score |
|-----------|-------------|--------------|-------------------------|
| **A1** | Standalone trilateral (W/mac/iOS), 5 domains mirroring macOS matrix | 1C + 3M + 2L | 27 |
| **A2** | Standalone trilateral, 6 domains (add Supervision & Enrollment Model) | 1C + 2M + 1L | 21 |
| **A3** | Merge into renamed `apple-capability-matrix.md` (3-column) | 2C + 1M + 0L | 25 |
| **A4** | Standalone bilateral iOS vs macOS (Apple-only) | 1C + 2M + 0L | **20 (lowest)** |

### Key Flaws (selected)

- **F-A1-01** [CRITICAL, CONFIRMED]: A1 claims "mirrors proven macOS matrix structure" but existing macOS matrix is BILATERAL (2 columns: Windows | macOS), not trilateral. A1's structure (3 columns) mirrors rows but not columns — description pro is partially false. Evidence: `docs/reference/macos-capability-matrix.md:15,30,44,58,70`.
- **F-A2-04** [MEDIUM, CONFIRMED]: A2's proposed "DDM availability" row in 6th domain conflicts with DDM already in Configuration domain of macOS matrix (line 40). Duplication / dual-location conflict.
- **F-A3-01** [CRITICAL, CONFIRMED]: A3 renames file to `apple-capability-matrix.md` — violates SC #3 literal requirement for filename `reference/ios-capability-matrix.md`.
- **F-A3-02** [CRITICAL, CONFIRMED]: A3 rename is non-additive — violates SC #4 literal "all pre-existing links... remain valid after iOS sections are added".
- **F-A3-03** [MEDIUM, FALSE POSITIVE]: Finder claimed A3 undercounts reference cost at 40+ files; actual matrix is 9 occurrences / 6 files, matching A3's own enumeration. Finder conflated glossary-file stats (29 files / 76 occurrences — applies to B3) with matrix-file stats. **Adversary disprove correct.**
- **F-A4-01** [CRITICAL, CONFIRMED]: A4 bilateral drops Windows column — violates SC #3 literal "feature parity gaps across iOS, macOS, and Windows".

### Winner & Synthesis

**Referee literal winner:** A4 (20 points — lowest confirmed score).
**Carry-forward constraint:** A4 must address SC #3 literal mitigation ("consider adding a Windows comparison column"). Applying the mitigation transforms A4 structurally into A1.

**Phase 32 adopted decision (32-CONTEXT D-01 through D-10):**
- **Structural winner:** A1 (trilateral, 5 domains) — satisfies SC #3 literal without mitigation debt
- **Framing winner:** A4's Apple-parity emphasis — preserved in opening narrative preamble per D-06
- Rationale: SC #3 literal cannot be waived. A4's score advantage evaporates once Windows column is added (required by SC #3). A1's 27 points are mostly description-text flaws about pro/con phrasing, not structural issues with the candidate itself. Retaining A4's "Apple-parity framing" preserves A4's signal that iOS↔macOS comparison is the most informative axis for Apple-platform readers.

### Claude's Discretion Items for Plan-phase

- Exact opening narrative preamble wording (2-4 sentences)
- Exact row selections within 5 domains (D-05 provides starting list)
- Key Gaps Summary gap count (7-10 range, per macOS matrix precedent)

---

## Gray Area B: Glossary Extension Scope & Structure (NAV-01)

**SC #1 literal:** Glossary contains supervision, MAM-WE, APNs, account-driven user enrollment, VPP, jailbreak detection (6 terms).
**Locked:** Extends `_glossary-macos.md`, not new file (Phase 26 canonical_refs line 70).

### Candidates

| Candidate | Description | Finder Flaws | Referee Confirmed Score |
|-----------|-------------|--------------|-------------------------|
| **B1** | Keep filename + inline iOS terms into existing H2 sections + VPP update (6 terms) | 0C + 1M + 2L | **7 (lowest)** |
| **B2** | Keep filename + dedicated "iOS-Specific" H2 at end | 0C + 2M + 2L | 12 |
| **B3** | Rename to `_glossary-apple.md` + restructure | 3C + 1M + 0L | 35 |
| **B4** | B1 + extended terms (~11-12 total, adds DDM/ACME/Managed Apple ID/DEP/Company Portal) | 0C + 2M + 2L | 12 |

### Key Flaws (selected)

- **F-B1-04** [MEDIUM, CONFIRMED]: B1 placement plan routes "supervision + account-driven UE + MAM-WE → Enrollment section" — but MAM-WE is explicitly NOT enrollment per Phase 26 D-03 ("app-layer model with no device enrollment"). Contradicts locked prior. **Mitigated in 32-CONTEXT D-13:** MAM-WE gets NEW "App Protection (MAM)" H2, not Enrollment.
- **F-B1-02** [MEDIUM, CONFIRMED]: B1 con claims "Enrollment section has ABM first" — factually wrong (Enrollment has ADE first at line 22; ABM is in Device Management at line 44). Con based on false premise.
- **F-B3-01** [CRITICAL, CONFIRMED]: B3 rename violates SC #4 literal — 76 references across 29 files would break without mass update.
- **F-B3-03** [CRITICAL, CONFIRMED]: B3 contradicts Phase 26 CONTEXT line 70 locked language ("_glossary-macos.md ... iOS terms ... will be added here per Phase 32 NAV-01").
- **F-B4-01** [MEDIUM, CONFIRMED]: B4 extended-term scope creep beyond SC #1's explicit 6-term list.
- **F-B4-04** [MEDIUM, CONFIRMED]: B4's "DEP (legacy name)" duplicates existing ADE entry (line 24) which already says "Formerly known as DEP".

### Winner

**Decisive B1** — 7 points vs 12/12/35 for alternatives. Zero critical flaws.

**Carry-forward mitigations (captured in 32-CONTEXT):**
- D-13: MAM-WE placed in NEW "App Protection (MAM)" H2, NOT Enrollment (resolves F-B1-04)
- D-16: Per-term platform-scope flag via opening sentence prose (addresses B1 "platform-origin not visually flagged")
- D-12: Exact 6-term scope — no B4-style extensions (rejects DDM/ACME/DEP/Managed Apple ID/Company Portal)

---

## Gray Area C: NAV-02 Routing (common-issues.md + index.md)

**Locked:** Phase 25 D-01/D-02 hybrid approach; additive injection per SC #4.

### Candidates

| Candidate | Description | Finder Flaws | Referee Confirmed Score |
|-----------|-------------|--------------|-------------------------|
| **C1** | Mirror macOS section structure exactly (flat symptom-based) | 0C + 1M + 2L | **7 (tie)** |
| **C2** | Path-segmented (4 paths per subsection) | 1C + 3M + 1L | 26 |
| **C3** | Hybrid role-first + path-aware disambiguation notes | 0C + 2M + 1L | 11 |
| **C4** | C1 with MAM-WE deferred entirely from common-issues | 0C + 1M + 2L | **7 (tie)** |

### Key Flaws (selected)

- **F-C1-01** [MEDIUM, CONFIRMED]: C1's proposed 6 categories mix symptom-naming and cause-naming ("APNs expired" is cause-name, not symptom-name). macOS section uses symptom names ("Device Not Appearing", "Setup Assistant Stuck"). **Mitigated in 32-CONTEXT D-22:** All 6 iOS categories use symptom-descriptive names.
- **F-C1-04** [LOW, FALSE POSITIVE]: Finder claimed C1's "1:1 match with 6 iOS L1 runbooks" is false because Phase 30 D-31 defers MAM-WE L1. But Phase 30 CONTEXT line 12 lists exactly 6 shipped L1 runbooks (16-21) matching C1's 6 categories; MAM-WE is separately handled. **Adversary disprove correct.**
- **F-C2-03** [MEDIUM, CONFIRMED]: C2 path-segmented explicitly violates Phase 25 D-01/D-02 locked hybrid precedent.
- **F-C4-03** [MEDIUM, CONFIRMED]: C4 silent MAM-WE omission creates visibility gap for 1 of 4 iOS paths.

### Winner & Tiebreak

**C1 wins tie vs C4** — both score 7 confirmed points, zero critical flaws. Tiebreaker: C4's silent MAM-WE omission creates reader-harm (app-protection troubleshooting has no entry point in common-issues.md); C1's explicit single-entry + ADDTS-01 advisory provides visibility without creating a dead-end runbook link.

**Carry-forward in 32-CONTEXT:**
- D-21: MAM-WE entry at bottom of iOS section as explicit advisory block (not a symptom routing entry)
- D-22: 6 iOS symptom categories with symptom-descriptive names mirroring macOS style (not C1's original cause-based examples)
- D-26: index.md iOS section mirrors macOS's role-based L1/L2/Admin Setup structure

---

## Gray Area D: NAV-02 Quick-Ref Content

**Locked:** Phase 25 D-07/D-08 append-to-bottom pattern.

### Candidates

| Candidate | Description | Finder Flaws | Referee Confirmed Score |
|-----------|-------------|--------------|-------------------------|
| **D1** | Mirror macOS quick-ref structure, substitute iOS content | 0C + 1M + 3L | **8 (lowest)** |
| **D2** | Flow-heavy L2 with decision matrix as lead | 1C + 2M + 1L | 21 |
| **D3** | Per-path L1 Top Checks (ADE vs BYOD dual blocks) | 1C + 2M + 1L | 21 |
| **D4** | Minimal 5-10 line iOS block with links out | 1C + 2M + 1L | 21 |

### Key Flaws (selected)

- **F-D1-02/D1-03/D1-04** [MEDIUM, CONFIRMED]: D1 embeds portal paths + sysdiagnose triggers flagged by Phase 30 D-32 and Phase 31 D-30/D-31 research flags. **Mitigated in 32-CONTEXT D-32:** Inline research-flag footnotes referencing parent flags; execution-phase verifies against Microsoft Learn before finalizing.
- **F-D2-01** [CRITICAL, CONFIRMED]: D2 decision-matrix-lead breaks macOS-precedent content order (Phase 25 D-08 established content sequencing).
- **F-D3-01** [CRITICAL, CONFIRMED]: D3 per-path dual Top Checks blocks violates Phase 25 D-14 section-level platform separation (no platform section in existing quick-refs has sub-axis).
- **F-D4-01** [CRITICAL, CONFIRMED]: D4 minimal 5-10 line block fails quick-ref purpose (Phase 25 D-07/D-08 shipped substantive content, not link menus).

### Winner

**Decisive D1** — 8 points vs 21/21/21. Zero critical flaws.

**Carry-forward mitigations (captured in 32-CONTEXT):**
- D-32: Research-flag footnote pattern for all portal paths and sysdiagnose triggers
- D-30: L1 Top Checks count = 4 (matches macOS exactly; not 4-5)
- D-31: L2 iOS section adds 3 new content blocks (Diagnostic Data Collection table, Intune Portal Paths table, Sysdiagnose Trigger Reference table) — replaces macOS's Terminal Commands bash snippet

---

## Per-Candidate Flaw Tally

```
Gray Area A (Capability Matrix):
  A1: 1C + 3M + 2L = 27
  A2: 1C + 2M + 1L = 21
  A3: 2C + 1M + 0L = 25 (F-A3-03 excluded as FALSE POSITIVE)
  A4: 1C + 2M + 0L = 20 (winner by score, but SC #3 mitigation = A1)

Gray Area B (Glossary):
  B1: 0C + 1M + 2L = 7  (winner — decisive)
  B2: 0C + 2M + 2L = 12
  B3: 3C + 1M + 0L = 35
  B4: 0C + 2M + 2L = 12

Gray Area C (NAV-02 Routing):
  C1: 0C + 1M + 2L = 7  (winner — tiebreak over C4)
  C2: 1C + 3M + 1L = 26
  C3: 0C + 2M + 1L = 11
  C4: 0C + 1M + 2L = 7  (tied, lost tiebreak on MAM-WE visibility)

Gray Area D (NAV-02 Quick-Ref):
  D1: 0C + 1M + 3L = 8  (winner — decisive)
  D2: 1C + 2M + 1L = 21
  D3: 1C + 2M + 1L = 21
  D4: 1C + 2M + 1L = 21
```

**Total flaws:** 68 (7 Critical / 39 Medium / 22 Low)
**Total Finder score:** 287
**Adversary disproves attempted:** 2 (F-A3-03 + F-C1-04)
**Adversary disprove success rate:** 2/2 (100%) — both ruled FALSE POSITIVE by Referee
**Adversary net score:** +6 (earned 5 + 1 for two MEDIUM/LOW disproves; zero wrong calls = zero penalty)
**Referee Real Issues:** 66
**Referee False Positives:** 2

---

## Claude's Discretion (all areas)

Items the planner decides at execution time:
- Exact wording of cross-reference banners (one-line format fixed per Phase 25 D-06)
- Exact alphabetical ordering of iOS terms within glossary H2 sections (default: alphabetical for Alphabetical Index symmetry)
- Exact Escalation Triggers bullet count for quick-ref-l1 iOS section (3-5 range, matches macOS precedent)
- Same-name anchor collision resolution in common-issues.md (likely `ios-` prefix per L1 runbook naming)
- Key Gaps Summary numbered gaps for capability matrix (7-10 range)
- Whether to render capability matrix Apple-parity framing as preamble paragraph or opening narrative box

---

## Deferred Ideas (captured in 32-CONTEXT <deferred> section)

- Glossary rename to `_glossary-apple.md` (B3 rejected)
- 6th Supervision domain in matrix (A2 rejected)
- Path-segmented navigation (C2 rejected)
- Bilateral iOS vs macOS matrix (A4 rejected structurally, framing preserved)
- Extended glossary terms (B4 rejected: DDM/ACME/Managed Apple ID/DEP/Company Portal)
- MAM-WE L1/L2 runbooks (ADDTS-01)
- iOS Graph API deep-dive reference (ADDTS-02)
- Shared iPad specifics (SIPAD-01)
- Android coverage (PLAT-01)
- Apple School Manager coverage (PLAT-02)
- Expanded sysdiagnose per-iOS-version matrix
- Automated link-check CI
- Localization

---

*Adversarial review trail preserved. 14 candidates × 4 gray areas → 68 Finder flaws → 2 Adversary disproves (both correct) → 66 Referee REAL ISSUE rulings → 4 winners selected with mitigation constraints carried into 32-CONTEXT.md decisions D-01 through D-42.*
