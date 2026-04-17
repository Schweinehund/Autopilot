# Phase 31: iOS L2 Investigation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered
> and the full adversarial-review trail.

**Date:** 2026-04-17
**Phase:** 31 — iOS L2 Investigation
**Areas discussed:** Log collection method ordering, ADE token/profile investigation scope, Compliance/CA timing investigation scope, Runbook count & grouping + MAM stub
**Decision method:** User-requested adversarial review (Finder/Adversary/Referee pattern) applied to each candidate option across all 4 gray areas

---

## Discussion Flow

1. **Initial presentation:** Claude identified the domain boundary, carried forward prior decisions from Phases 24/26/27/28/29/30, and presented 4 gray areas with 2-3 candidate options each.
2. **User selection:** All 4 gray areas selected for discussion, with the override instruction: "For each choice in each of the areas, use `/adversarial-review` to recommend the best one and provide your reasoning."
3. **Candidate enumeration:** Claude wrote `31-CANDIDATES.md` with 25+ candidate options across 4 gray areas (A1-A5, B1-B8, C1-C7, D1-D7) plus "Fixed" items carried from prior phases and decision drivers priority list.
4. **Finder phase:** Opus agent produced 90 flaws (14 CRITICAL / 47 MEDIUM / 29 LOW = 404 pts) across all candidates, including global missing-candidate findings.
5. **Adversary phase:** Opus agent attempted 11 disproves against the Finder report.
6. **Referee phase:** Opus agent ruled 10 disputes FALSE POSITIVE + 1 partial REAL ISSUE; produced winning-candidate recommendations per gray area.
7. **User confirmation:** User accepted all Referee recommendations and resolved 3 open questions.

---

## Gray Area 1: Log Collection Method Ordering

**Context:** iOS has no single comprehensive diagnostic tool. SC #1 demands method-to-data-type mapping. SC #2 demands explicit "no mdmdiagnosticstool.exe equivalent" framing.

| Option | Description | Finder Flaws | Referee Status | Selected |
|--------|-------------|--------------|----------------|----------|
| A1 | Lead with Company Portal upload | 2 CRITICAL + 2 MED + 1 LOW — contradicts SC #1 and Phase 24 D-11 | Losers confirmed | |
| A2 | Lead with MDM diagnostic report | 1 MED (disproved) + 2 LOW — survivable | Close runner-up | |
| A3 | Lead with Mac+cable sysdiagnose | 1 CRITICAL + 2 MED — hardware dependency makes unsurvivable | Losers confirmed | |
| A4 | Present 3 methods as equal peers | 2 MED (disproved) + 1 LOW — legitimate for iOS reality | Viable but no default | |
| A5 | Tiered flow (MDM → CP → sysdiagnose) | 2 MED + 2 LOW — hybrid respects iOS reality with default | Winner | ✓ |

**User's choice:** A5 (Tiered flow)

**Reasoning:** A5 honors SC #1 literal via method-to-data-type decision matrix at Tier transitions, satisfies SC #2 via tiered preamble, and matches Phase 24 D-11 spirit (lead with portal-accessible bundle = MDM diagnostic report) while respecting iOS's fragmented tool landscape. A2 ignores sysdiagnose depth; A3 excludes remote L2; A4 lacks default first step.

**Addenda:**
- Runbook preamble must include explicit "no iOS equivalent to mdmdiagnosticstool.exe" callout (SC #2 literal, D-02)
- Method-to-data-type decision matrix as first structural element (SC #1 literal, D-03)

---

## Gray Area 2: ADE Token / Profile Delivery Investigation

**Context:** SC #3 requires specific indicators (token sync, profile assignment, enrollment profile GUID) AND known failure patterns with resolution steps. ADDTS-02 defers Graph API token GUID extraction deep-dive runbook to future milestone.

### Count sub-decision (B1 vs B2)

| Option | Description | Finder Flaws | Referee Status | Selected |
|--------|-------------|--------------|----------------|----------|
| B1 | Single runbook combining token + profile | 1 MED (disproved) + 1 LOW — mirrors macOS 4-file pattern | Winner | ✓ |
| B2 | Split into two runbooks (token / profile) | 2 MED + 1 LOW — artificial boundary; breaks macOS structural parallel | Loser | |

**User's choice:** B1 (Single runbook)

### Structure sub-decision (B3 vs B4 vs B5)

| Option | Description | Finder Flaws | Referee Status | Selected |
|--------|-------------|--------------|----------------|----------|
| B3 | Per-indicator H2 | 1 MED + 1 LOW — satisfies only indicators, not patterns | Partial SC #3 satisfaction | |
| B4 | Per-failure-pattern H2 | 2 MED + 1 LOW — name collision with L1 runbook 21 Cause A/B/C | Rejected | |
| B5 | Hybrid (data-collection + failure-pattern layers) | 2 LOW — two-layer navigation | Winner | ✓ |

**User's choice:** B5 (Hybrid structure)

### GUID depth sub-decision (B6 vs B7 vs B8)

| Option | Description | Finder Flaws | Referee Status | Selected |
|--------|-------------|--------------|----------------|----------|
| B6 | Portal-only | 1 MED + 1 LOW — loses token rotation history indicator | Incomplete SC #3 | |
| B7 | Portal + read-only Graph API | 1 CRITICAL (DISPROVED by Referee) + 1 MED — ADDTS-02 is deferred deep-dive, not blanket Graph ban | Winner | ✓ |
| B8 | Portal + ADDTS-02 pointer | 2 LOW + 1 MED — placeholder to non-existent doc | Less pragmatic | |

**User's choice:** B7 (Portal + read-only Graph API)

**Reasoning (count + structure + GUID):** B1+B5+B7 combination is the only Pareto-consistent set satisfying SC #3's dual literal (indicators + patterns), matching Phase 24 macOS 4-file structural parallel, and preserving the ADDTS-02 scope boundary via read-only surgical Graph use.

**Addenda:**
- D-09 ADDTS-02 warning block: preamble placement only (user choice), no inline repetition
- D-10 ABM portal access requirement explicitly in Prerequisites section

---

## Gray Area 3: Compliance / CA Timing Investigation Scope

**Context:** SC #4 requires "distinguish between configuration errors, timing issues, and genuine defects requiring Microsoft support escalation." L1 runbook 21 has Cause A/B/C structure per Phase 30 D-28.

### Structure sub-decision (C1 vs C2 vs C3 vs C4)

| Option | Description | Finder Flaws | Referee Status | Selected |
|--------|-------------|--------------|----------------|----------|
| C1 | Mirror L1 runbook 21 A/B/C | 1 CRITICAL + 1 MED — L1 taxonomy doesn't 1:1 SC #4 three classes | Fails SC #4 literal | |
| C2 | Re-frame by SC #4 axis | 1 MED + 1 LOW — L1→L2 mental remapping required | Close runner-up | |
| C3 | Hybrid (SC #4 axes top + L1 cross-refs sub) | 1 LOW + 1 MED — complexity offset by dual coverage | Winner | ✓ |
| C4 | Symptom-driven tree | 2 MED — misrepresents macOS 13 structure; fails SC #4 literal | Rejected | |

**User's choice:** C3 (Hybrid)

### Coverage sub-decision (C5 vs C6 vs C7)

| Option | Description | Finder Flaws | Referee Status | Selected |
|--------|-------------|--------------|----------------|----------|
| C5 | Full 5-sub-topic coverage | 1 MED + 1 LOW — length bloats | Viable but heavy | |
| C6 | Core only (CA timing + Default posture) | 1 CRITICAL + 1 MED — violates SC #4 literal (excludes genuine-defect class) | Rejected | |
| C7 | Full coverage + Pareto emphasis | 1 LOW + 1 MED — balance subjective but viable | Winner | ✓ |

**User's choice:** C7 (Full coverage + Pareto emphasis)

**Reasoning (structure + coverage):** C3+C7 is the only combination satisfying both SC #4 literal (three-axis distinction) AND Phase 30 D-28 L1→L2 handoff coherence. C5 is length-heavy; C6 excludes genuine-defect class; C1/C4 fail SC #4 structurally.

**Addenda:**
- D-15 Pareto emphasis: CA timing + Default posture expanded; jailbreak / OS version / passcode / restricted apps compact with deep-links to `06-compliance-policy.md` anchors
- D-16 "Not evaluated" terminal-state cross-cutting sub-section with Microsoft Support escalation criteria

---

## Gray Area 4: Runbook Count & Grouping + MAM Stub

### Count sub-decision (D1 vs D2 vs D3 vs D4)

| Option | Description | Finder Flaws | Referee Status | Selected |
|--------|-------------|--------------|----------------|----------|
| D1 | 4 files (mirrors macOS) | 1 MED + 1 LOW — ADE bloat concern mitigated by macOS 217-line precedent | Winner | ✓ |
| D2 | 5 files (ADE split) | 1 MED + 1 LOW — breaks B1 count winner | Inconsistent with B1 | |
| D3 | 5 files (compliance split) | 1 MED (DISPROVED by Referee) + 1 LOW — inconsistent with C3 hybrid structure | Inconsistent | |
| D4 | 6 files (both splits) | 1 CRITICAL + 1 MED — max split breaks macOS parallel | Rejected | |

**User's choice:** D1 (4 files — 14-log / 15-ade / 16-app / 17-compliance)

### MAM handling sub-decision (D5 vs D6 vs D7)

| Option | Description | Finder Flaws | Referee Status | Selected |
|--------|-------------|--------------|----------------|----------|
| D5 | No MAM entry at all | 1 CRITICAL (partial REAL ISSUE ruling by Referee) + 1 MED — silent omission leaves orphaned escalation | Inferior to D6 | |
| D6 | 00-index.md advisory note | 1 LOW + 1 MED — location ambiguity resolved by D-21 | Winner | ✓ |
| D7 | Stub runbook | 1 CRITICAL + 1 MED — violates Phase 30 no-stub precedent | Rejected | |

**User's choice:** D6 (advisory note in 00-index.md only — D-21)

### Placeholder Mapping (from Finder F4-MISSING.2 critical gap)

**User's choice:** D-22 explicit mapping — each of the 6 iOS L1 runbooks + 5 triage-tree lines + 1 ADE lifecycle line + 1 compliance-policy prose maps to a specific 14-17 runbook target (no generic `00-index.md` links for L1 runbook escalation footers).

**User-confirmed open questions:**
- **Graph API warning placement:** preamble only (D-09)
- **MAM advisory placement:** 00-index.md only (D-21)
- **Numbering:** 14-17 (D-19; unfilled 09 slot stays unfilled)

---

## Claude's Discretion (per CONTEXT.md)

- Exact depth of Section 1/2/3 content in `14-ios-log-collection.md`
- Exact per-indicator sub-step ordering within `15-ios-ade-token-profile.md` data-collection section
- Exact Pattern A/B/C/D internal content within `15-ios-ade-token-profile.md` analysis section
- Exact "Resolution" section content per failure pattern in `15-ios-ade-token-profile.md`
- Exact Pareto weight balance in `17-ios-compliance-ca-timing.md` between expanded and compact sub-sections
- Exact wording of MAM advisory block in `00-index.md`
- Exact wording of the Graph API READ-ONLY warning preamble block
- Per-runbook length (targets: 14 ~160-180 / 15 ~220-280 / 16 ~190-210 / 17 ~220-250)
- Per-line decision on triage-tree terminal-node placeholder targets (D-26 per-line enumeration at plan time)
- Emoji vs text markers for three-class disambiguation in 16-app-install (⚙️/⏱️/🐛 vs `[CONFIG]/[TIMING]/[DEFECT]`)

---

## Deferred Ideas

- **iOS MAM-WE L2 runbooks** — ADDTS-01 future milestone
- **Graph API ADE token GUID deep-dive runbook** — ADDTS-02 future milestone
- **iOS/iPadOS sysdiagnose per-device-type cheat sheet** — Phase 32 NAV-03 or v1.4
- **Apple Configurator 2 manual enrollment L2 diagnostics** — out of scope per REQUIREMENTS
- **iOS capability matrix entries for L2 depth** — Phase 32 NAV-03
- **iOS L2 glossary cross-references** — Phase 32 NAV-01
- **Navigation hub edits (index.md / common-issues.md / quick-ref-l2.md)** — Phase 32 NAV-02
- **iOS localization / language-variant error message handling** — beyond v1.3
- **Shared iPad L2 specifics** — SIPAD-01 future milestone
- **Automated link-check CI for placeholder-free iOS content** — future tooling

---

## Adversarial Review Full Flaw Trail

**Finder total:** 404 points (14 CRITICAL + 47 MEDIUM + 29 LOW = 90 flaws).

**Adversary disproves attempted (11):**
1. GF-5 (MED) — scope item already acknowledged in Fixed section
2. F1-A2.1 (MED) — method table properly characterizes portal-only trigger
3. F1-A4.1 (MED) — Phase 24 D-11 doesn't govern iOS tool landscape
4. F1-A4.2 (MED) — "gather everything first" about collection-before-analysis, not single-tool ordering
5. F2-B1.1 (MED) — macOS 13 is 217 lines, no 192-line cap
6. F2-B7.1 (CRITICAL) — ADDTS-02 is deferred deep-dive runbook, not blanket Graph ban
7. F2-MISSING.1 (MED) — B7 IS the proposed missing candidate
8. F3-MISSING.1 (CRITICAL) — MAM deferral already in Fixed section line 15
9. F4-D3.1 (MED) — Phase 30 D-28 is L1 scope, not L2 split mandate
10. F4-D5.1 (CRITICAL) — D5 orphan concern overstated; 09-mam-app-protection.md has no Phase 31 placeholder
11. F4-MISSING.5 (MED) — ROADMAP line 154 scopes 00-initial-triage.md edit to Phase 30

**Referee rulings:**
- 10 FALSE POSITIVE (Adversary correct): GF-5, F1-A2.1, F1-A4.1, F1-A4.2, F2-B1.1, F2-B7.1, F2-MISSING.1, F3-MISSING.1, F4-D3.1, F4-MISSING.5
- 1 REAL ISSUE (Adversary partially wrong): F4-D5.1 — Finder's CRITICAL severity over-tagged, but the substantive concern (D5 silent omission leaves orphaned MAM escalation path) is real, shifting winner from D5 to D6.

**Referee score: 10/11 correct; Adversary earned +70 on 10 disproves and lost 0 on the 1 partial.**

**Confirmed critical flaws surviving adversarial review:**
- GF-1 — A1-A5 candidate list doesn't cover SC #2 framing as a candidate dimension (resolved via D-02 preamble rule)
- GF-2 — L1→L2 Escalation Mapping table not in candidate dimensions (resolved via D-20 table row)
- GF-3 — placeholder count incomplete in candidate file (resolved via D-22 explicit 13+ line enumeration)
- F1-A1.1, F1-A1.2, F1-A3.1 — A1 and A3 unsurvivable (confirmed by A5 winner selection)
- F3-C1.1, F3-C6.1 — C1 and C6 violate SC #4 literal (confirmed by C3+C7 winner selection)
- F4-D4.1, F4-D7.1 — D4 and D7 break Phase 24 and Phase 30 precedents (confirmed by D1+D6 winner selection)
- F4-MISSING.2 — L1→L2 placeholder per-runbook mapping missing from candidates (resolved via D-22 11-row mapping table)

---

*Full flaw enumeration and reasoning: see `31-CANDIDATES.md` (input) + Finder/Adversary/Referee agent outputs (captured during 2026-04-17 adversarial-review session).*
