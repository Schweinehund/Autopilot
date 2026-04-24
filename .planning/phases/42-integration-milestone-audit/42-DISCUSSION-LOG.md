# Phase 42: Integration & Milestone Audit — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 42-CONTEXT.md — this log preserves the alternatives considered
> and the adversarial-review reasoning that selected winners.

**Date:** 2026-04-24
**Phase:** 42-integration-milestone-audit
**Method:** adversarial-review skill — 12 subagents in 3 parallel waves (Finder × 4 → Adversary × 4 → Referee × 4)
**Areas discussed:** Capability matrix design / Stub-doc scope shape / Audit mechanism & artifact / Gap-handling policy

---

## User-Selected Areas

User multi-selected all 4 gray areas presented and requested `/adversarial-review` per sub-choice:

| Area | User selection |
|------|----------------|
| Capability matrix design (shape × domains) | ✓ Selected |
| Stub-doc scope shape (index.md depth + glossary see-also placement) | ✓ Selected |
| Audit mechanism & artifact (execution + regex scope) | ✓ Selected |
| Gap-handling policy | ✓ Selected |

User note: "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."

---

## Area 1: Capability Matrix Design

### Candidates evaluated

| Shape | Domains | Description |
|-------|---------|-------------|
| S-A Trilateral-extend | D-A iOS-5 | 4-col Win\|macOS\|iOS\|Android table, 5 iOS-parity domains |
| S-A Trilateral-extend | D-B iOS-5 + Provisioning | 4-col table, 6 domains |
| S-A Trilateral-extend | D-C Android-native 4 | 4-col table, Android-reshaped domains |
| S-B Android-mode-first | D-A iOS-5 | 5-mode rows × iOS-5 domains, no cross-platform columns |
| S-B Android-mode-first | D-B iOS-5 + Provisioning | 5-mode rows × 6 domains |
| S-B Android-mode-first | D-C Android-native 4 | 5-mode rows × Android-reshaped domains |
| **S-C Hybrid** | **D-A iOS-5** | **Mode-first primary + Cross-Platform Equivalences H2 with 3 paired rows; iOS-5 domains** ✓ |
| S-C Hybrid | D-B iOS-5 + Provisioning | Mode-first primary + paired rows; 6 domains |
| S-C Hybrid | D-C Android-native 4 | Mode-first primary + paired rows; Android-reshaped domains |

### Finder flaw enumeration (total 430)

| Combination | Score | Key flaws |
|-------------|-------|-----------|
| S-A+D-A | 56 | 4 CRITICAL — monolithic column, pre-empts v1.5 AECOMPARE-01, fails SC#1 paired, AEAUDIT-04 supervision risk |
| S-A+D-B | 61 | 5 CRITICAL — above + Provisioning duplicates 02-provisioning-methods.md |
| S-A+D-C | 55 | 5 CRITICAL — above + domain-reshape semantic mismatch |
| S-B+D-A | 31 | 2 CRITICAL — fails SC#1 columns literal, AEAUDIT-01 column missing |
| S-B+D-B | 36 | 3 CRITICAL — duplicates canonical matrices |
| S-B+D-C | 36 | 3 CRITICAL — duplicates 02-provisioning + 00-enrollment-overview |
| **S-C+D-A** | **21** | **4 MEDIUM + 1 LOW — lowest** |
| S-C+D-B | 26 | 1 CRITICAL — D-B duplicates provisioning matrix |
| S-C+D-C | 31 | 2 CRITICAL — D-C duplicates two canonical docs |
| Shape cross-cutting | 36 | Anchor stability + AEAUDIT-01/SC#1 wording conflict |
| Domain cross-cutting | 41 | AOSP-scope guard + D-A Android-surface omission |

### Adversary verdicts (total +20.5 earned)

| Finder flaw | Verdict | Reasoning |
|-------------|---------|-----------|
| AEAUDIT-01 "column" vs SC#1 "columns" divergence | CONFIRMED | Verified in REQUIREMENTS.md:92 and ROADMAP:240 |
| D-A omits Android load-bearing domains | CONFIRMED | Sibling matrices confirm 5-domain spine; tri-portal/Play Integrity/AMAPI/MHS absent |
| D-B Provisioning domain duplicates 02-provisioning-methods.md | CONFIRMED | Phase 34 D-26 Anti-Pattern 1 explicit |
| D-C breaks sibling-matrix contract | CONFIRMED | 5-domain spine shared by ios and macos matrices |
| "mode-vs-type terminology" MEDIUM | **DISPROVED** | Platforms use their own terms consistently |
| "For Admins Familiar with iOS already exists" MEDIUM | **DISPROVED** | Different directory/purpose |
| "review_by cadence mismatch" LOW | **DISPROVED** | Phase 34 D-14 locks 60-day Android INTENTIONALLY |
| "Key Gaps Summary reuse" MEDIUM | **DISPROVED** | Tail pattern orthogonal to domain choice |
| "KME/AOSP deferral guard" MEDIUM | MITIGATED→LOW | 02-provisioning-methods.md already has inheritable deferral pattern |
| "AOSP-stub-scope guard" CRITICAL | MITIGATED→MEDIUM | AEAUDIT-04 owns word-count; matrix just references row |

### Referee final verdict

**Winner: S-C + D-A** — Hybrid Android-mode-first + iOS-5 domains + separate Cross-Platform Equivalences H2 with 3 paired rows.

**Novel issues surfaced by Referee (not in Finder report):**
- **F-22 CRITICAL**: ROADMAP internal inconsistency — Phase 42 goal line 236 enumerates 2 pairs, SC#1 line 240 enumerates 3 pairs. SC#1 is binding (most specific acceptance test). → CONTEXT D-07.
- **F-23 MEDIUM**: `ios-capability-matrix.md` is itself Windows|macOS|iOS trilateral. Extending to 4-platform would directly pre-empt v1.5 AECOMPARE-01 — strengthens S-A rejection.
- **F-24 MEDIUM**: `ios-capability-matrix.md` uses `🔒` glyph convention. Adopt parallel `🔒 COBO-only` / `🔒 FM/DO-only` for mode-restricted Android capabilities.

**Reasoning:**
- S-A is dead on arrival (4-platform pre-emption, mode-granularity loss)
- S-B fails SC#1 literal "columns" test (narrative bridge is not a structural column)
- S-C satisfies both AEAUDIT-01 (cross-platform structure) and SC#1 (3 paired rows) without creating a 4-platform quad-table
- D-B/D-C duplicate canonical docs; D-A preserves sibling spine; Android-specific surfaces slot INTO D-A's 5 domains (Play Integrity→Compliance, AMAPI→App Deployment, MHS→App Deployment Dedicated row, tri-portal→Enrollment)
- AEAUDIT-04 supervision risk is a writing-rule (D-12 HTML-comment guard + platform-attributed headers), not a design-killer

---

## Area 2: Stub-Doc Scope Shape

### Candidates evaluated

**docs/index.md Android stub depth:**
- I-A True-minimal (1 bullet + H2 with 2 links)
- I-B Shallow-parity (mirror macOS/iOS with L1/L2/Admin subsections)
- I-C Banner-stub (1 bullet + H2 + banner callout + 2 links)

**docs/_glossary-macos.md see-also placement:**
- G-A Banner-extend (append sentence to existing line-10 continuation blockquote)
- G-B New blockquote after banner
- G-C Bottom See-Also H2 section

### Finder flaw enumeration (total 105)

| Candidate | Score | Key flaws |
|-----------|-------|-----------|
| **I-A** | 3 | 3 LOW — discoverability, asymmetry, maintenance |
| I-B | 31 | 2 CRITICAL — pre-empts unification, violates stub intent |
| I-C | 9 | 1 MEDIUM + 4 LOW — banner conflict, v1.4.1 text, deadweight, noise, date ages |
| **G-A** | 17 | 1 CRITICAL semantic, 1 MEDIUM pattern inconsistency, 2 LOW |
| G-B | 12 | 2 MEDIUM + 2 LOW — stacks blockquotes, symmetry violation |
| G-C | 16 | 3 MEDIUM + 1 LOW — violates "no other modifications", discoverability dead zone |
| Cross-cutting | 17 | Cross-Platform References table omits _glossary-android.md; _glossary.md orphan edge |

### Adversary verdicts (total +5 earned)

| Finder flaw | Verdict | Reasoning |
|-------------|---------|-----------|
| I-B 2 CRITICALs (pre-empts unification + violates stub intent) | CONFIRMED | PROJECT.md line 144 explicit deferral; AEAUDIT-02 "stub" wording |
| I-C LOW "v1.4.1 not in PROJECT.md" | **DISPROVED** | PROJECT.md:142 + REQUIREMENTS.md:101-117 extensively reference v1.4.1 |
| G-A CRITICAL semantic modification | MITIGATED | 1-line requirement is interpretable; sentence-append IS 1 line |
| G-A MEDIUM pattern inconsistency vs _glossary.md | **DISPROVED on Referee re-read** | _glossary.md:11 IS continuation-pattern → G-A actually MATCHES it |
| G-C MEDIUM "no other modifications" | MITIGATED | Interpretable; H2-addition is structural but 1-line by content |
| Cross-cut: Cross-Platform References table missing _glossary-android.md | CONFIRMED | index.md:171 lists _glossary-macos.md; absence is silent discoverability hole |

### Referee final verdict

**Winners: I-A + G-A.**

**Cross-cutting decisions:**
- **(a) Cross-Platform References table:** ADD `_glossary-android.md` row — strictly additive, not a Windows/macOS/iOS section edit, satisfies AEAUDIT-02 discoverability intent. Locked as D-19 step 3.
- **(b) `_glossary.md` orphan edge:** DEFER — AEAUDIT-03 literal scope names only `_glossary-macos.md`. Log as follow-up finding in audit doc tech_debt section.

**Novel issues surfaced by Referee:**
- docs/index.md:9 platform-coverage banner + line 14 H1 narrative omit Android. Strict reading: leave, AENAVUNIFY-04 owns.

**Reasoning:**
- I-A wins because AEAUDIT-02 literal text is "Android stub section". I-B upgrades "stub" to "section" and swallows AENAVUNIFY-04 scope
- G-A wins because `_glossary-macos.md:9-10` is a 2-line continuation blockquote; appending inside continues the established pattern that `_glossary-android.md:11` and `_glossary.md:9-11` both use
- G-C buries the cross-ref at file end; G-B fragments the banner; G-A is symmetric with Android-side's own banner pattern
- Cross-Platform References table addition honors strict AEAUDIT-02 ("existing Windows/macOS/iOS sections untouched") because the shared table is neither a platform section nor modifying existing rows

---

## Area 3: Audit Mechanism & Supervision-Regex Scope

### Candidates evaluated

**Execution:**
- E-A Manual-audit doc only (v1.3 precedent, no script)
- E-B Scripted checks + audit doc (committed Node/shell script)
- E-C PLAN.md gated greps (distribute checks across plan verification steps)

**Supervision regex:**
- R-A Strict (any "supervision" match in Android-scoped files = violation)
- R-B Contextual whitelist regex (exempt lines matching iOS-context patterns)
- R-C Path-based exclusion (strict in mode-specific docs; lenient in cross-platform bridge docs)

### Finder flaw enumeration (total 236)

| Candidate | Score | Key flaws |
|-----------|-------|-----------|
| E-A | 26 | 1 CRITICAL — non-reproducible v1.4.1 re-audit |
| **E-B** | 36 | 2 CRITICAL — .ps1 vs .sh portability + scripts/ scope creep |
| E-C | 31 | 2 CRITICAL — capstone-becomes-work-phase + Phase 39 double-bookkeeping |
| R-A | 40 | 3 CRITICAL — false-positives on 3 sets of shipped text |
| **R-B** | 36 | 2 CRITICAL — permissive false-negative + untestable whitelist drift |
| R-C | 41 | 3 CRITICAL — false-negatives + no mechanical "callout block" definition |
| Cross-cutting | 66 | 4 SafetyNet literals shipped; AOSP envelope violation; 2 Android docs outside globs; locked allow-list unhandled |

### Adversary verdicts (total +42 earned — biggest disprove score)

| Finder flaw | Verdict | Reasoning |
|-------------|---------|-----------|
| **E-B CRITICAL portability (.ps1 vs .sh)** | **DISPROVED** | `scripts/validation/check-phase-30.mjs` and `check-phase-31.mjs` are Node ESM cross-platform — no double-maintenance |
| **E-B CRITICAL scope creep in scripts/** | **DISPROVED** | `scripts/validation/` is established phase-harness convention, NOT production tooling |
| E-B MEDIUM no committed script precedent | **DISPROVED** | Phase 30/31 harnesses ARE v1.3 phase artifacts |
| R-A 3 CRITICAL false-positives | CONFIRMED | Verified at 00-enrollment-overview.md:51/53/83 + 03-fully-managed-cobo.md:35 + _glossary-android.md §Supervision |
| R-B CRITICAL permissive false-negative | CONFIRMED | "iOS" anywhere lets full line pass even if Android violation follows |
| 4 shipped SafetyNet tokens | CONFIRMED | _glossary-android.md:138,150 + 03-android-version-matrix.md:85,87 |
| AOSP 1197 words vs envelope | CONFIRMED (Finder misstated envelope as 500-1200; actual is 600-900; body ~1089-1159 exceeds) | |

### Referee final verdict

**Winners: E-B + R-B with committed file:line allow-list sidecar.**

**Cross-cutting decisions:**
- **(a) SafetyNet semantic-vs-literal:** SEMANTIC zero — all 4 shipped tokens are deprecation-context ("successor to SafetyNet…"). C1 check: pass if every match has ≥1 of `/successor|turned off|deprecated|Play Integrity/` within ±200 chars OR file:line in allow-list.
- **(b) AOSP envelope 600-900 vs 1197/1089-1159:** Phase 42 does NOT re-gate. Phase 39 self-certified; Phase 42 records drift as tech debt and recommends `/gsd-validate-phase 39` in v1.4.1. Matches v1.3 handling of 6/7 PARTIAL phases.
- **(c) 2 Android docs outside globs:** EXTEND scope to include `docs/decision-trees/08-android-triage.md` and `docs/end-user-guides/android-*.md`.

**Novel issues surfaced by Referee:**
- `_glossary-android.md:134` "supervised MDM profile" cross-platform note — missed by Adversary; added to supervision allow-list.
- `_glossary-android.md:148` Changelog row naming "supervision as callout-only" historical context — added to supervision allow-list.

**Reasoning:**
- Adversary decisively killed E-B's CRITICALs by pointing to existing Node cross-platform harness precedent → E-B becomes lowest-flaw option
- R-A's 5+ shipped-text false-positives are fatal (flags iOS-bridge narrative that AEBASE-02 requires)
- R-C's directory-coarseness failure mode is real (admin-setup-android/ contains both legitimate and illegitimate "supervision" uses)
- R-B with pinned `file:line` allow-list trades un-tested whitelist regex drift for explicit committed exemptions (JSON sidecar pattern borrowed from Phase 31 `parseInventory()`)
- Phase 42 as capstone MUST NOT re-execute Phase 39 verification (D-29 principle); records drift but defers fix

---

## Area 4: Gap-Handling Policy

### Candidates evaluated

- P-A Read-only-audit + spawn Phase 43 ON DEMAND
- P-B Inline-fix bundled in Phase 42 (threshold-based)
- P-C Audit-and-plan-only (Phase 43 pre-created if any gap)
- P-D Pre-emptive integration pass + audit (fix anything broken inline)

### Finder flaw enumeration (total 138)

| Candidate | Score | Key flaws |
|-----------|-------|-----------|
| **P-A** | 12 | 2 MEDIUM + 2 LOW — slow planning cycle, v1.4-complete ambiguity |
| P-B | 41 | 2 CRITICAL — unbounded scope (v1.3 I-2 = 71 fixes from 1 finding), GSD discipline violation |
| P-C | 21 | 4 MEDIUM — wasteful pre-create, over-triggers, split-brain, worse signaling |
| P-D | 41 | 2 CRITICAL — self-certifying audit, unbounded integration scope |
| Cross-cutting | 23 | Checkbox-flip protocol, v1.2 validation-gap vs content-gap, 37/37 drift |

### Adversary verdicts (total +3 earned — weakest disprove)

Almost all Finder flaws CONFIRMED by direct evidence:
- Phase 33 seeded REACTIVELY commit 2993b49 same day as v1.3 audit
- v1.0 ran 3 audit iterations with Phases 8/9/10 all REACTIVE
- v1.1 shipped with `status: tech_debt` (no gap phase)
- v1.2 shipped via `/gsd-complete-milestone` (no gap phase)
- All Phases 34-41 have VERIFICATION.md (P-A won't immediately trigger)
- 71 placeholders was ONE finding (I-2) that expanded — blows P-B/P-D bounds
- 4 AEAUDIT reqs still `[ ]` Pending in REQUIREMENTS.md

MITIGATED:
- P-A "ritualistic when clean" LOW — P-A is on-demand, not always-create (clarification win)
- P-B v1.3 precedent alignment MEDIUM — 4 plans arithmetic contestable but unbounded-scope concern stands

### Referee final verdict

**Winner: P-A + subagent-independence + explicit flip protocol.**

**Cross-cutting decisions:**
- **(a) Checkbox flip protocol:** Separate dedicated plan step. AEAUDIT-01/02/03 flip when content VERIFICATION.md SATISFIED. AEAUDIT-04 flips ONLY when audit exits `passed` (or `tech_debt` with explicit user acceptance). Atomic commit mirrors v1.3 commit 48ad757.
- **(b) Validation-gap vs content-gap:** Separate classification tagged per finding (`kind: validation-gap | content-gap | integration-gap`).
- **(c) Deferral criteria:** 4-part objective test (D-05 in CONTEXT).
- **(d) Auditor independence:** Subagent for audit run, distinct from AEAUDIT-01/02/03 content authors.

**Novel issues surfaced by Referee:**
- **ROADMAP line 246-253 has copy-paste bug** — Phase 42 "Plans" section lists `41-0X-PLAN.md` entries. Planner MUST fix before execution. → CONTEXT D-06.
- Phase 42 plan count `0/TBD` (line 301) needs explicit count after planning.

**Reasoning:**
- P-A is the ONLY candidate consistent with all 4 prior milestone precedents
- P-B and P-D fail on unbounded-scope (71-placeholder explosion from v1.3 is the refuting data point)
- P-C wastes Phase 43 machinery if audit passes clean; zero historical pre-allocation precedent
- On-demand Phase 43 spawn is FAST (v1.3 Phase 33 seeded same-day as audit, commit 2993b49)

---

## Summary Table — All Winners

| Area | Decision | CONTEXT.md ID |
|------|----------|---------------|
| Matrix shape | S-C Hybrid | D-08 |
| Matrix domains | D-A iOS-5 verbatim | D-09 |
| Matrix mode rows | COBO/BYOD/Dedicated/ZTE/AOSP (AOSP stub-ref only) | D-10 |
| Cross-Platform Equivalences paired rows | 3 pairs — iOS Supervision/Fully Managed, ADE/ZT, UE/Work Profile | D-11 |
| AEAUDIT-01 vs SC#1 resolution | SC#1 binding (3 pairs) | D-07 |
| AEAUDIT-04 supervision writing rule | Platform-attributed headers + HTML comment guard | D-12 |
| Matrix deferral footers | KME v1.4.1 + AOSP v1.4.1 + 4-platform v1.5 | D-14 |
| Matrix review cadence | 60-day (Phase 34 D-14) | D-16 |
| Index.md depth | I-A True-minimal + Cross-Platform References row add | D-19 |
| Glossary-macos see-also | G-A Banner-extend (line-10 append) | D-23 |
| _glossary.md orphan edge | Deferred (out of AEAUDIT-03 scope) | deferred |
| Audit execution | E-B Node harness at scripts/validation/v1.4-milestone-audit.mjs | D-25 |
| Supervision regex | R-B with committed file:line allow-list sidecar | D-28 |
| SafetyNet check | Semantic-zero with 4 pinned exemptions | D-27 |
| AOSP envelope | Informational only (tech debt, no re-gate) | D-29 |
| Path glob scope | Extended to decision-trees/08 + end-user-guides/android-* | D-31 |
| Gap-handling policy | P-A read-only + on-demand Phase 43 | D-01 |
| Auditor independence | Subagent distinct from content authors | D-02 |
| Checkbox flip | Dedicated atomic plan (AEAUDIT-04 flips last) | D-03 |
| Finding classification | validation-gap / content-gap / integration-gap | D-04 |
| Deferral criteria | 4-part objective test | D-05 |
| ROADMAP pre-flight | Fix Plans table copy-paste bug (lines 246-253) | D-06 |

## Claude's Discretion (author choice)

- Exact prose tone and lead-paragraph length for capability matrix
- Exact Key Gaps Summary item count (iOS 8, macOS 7 — parity target)
- Exact visual layout of paired cross-platform rows (table vs stacked blockquotes)
- Node harness internal helper-module structure
- Allow-list JSON internal field names (top-level keys `safetynet_exemptions` + `supervision_exemptions` are contract)
- Mermaid/diagrams inclusion in capability matrix

## Deferred Ideas (not folded into Phase 42 scope)

See `42-CONTEXT.md <deferred>` section for full enumeration.

Key items:
- AENAVUNIFY-04 full cross-platform nav integration (post-v1.4)
- AECOMPARE-01 4-platform comparison doc (v1.5)
- Knox ME, full AOSP, COPE full (v1.4.1)
- `_glossary.md` orphan edge reciprocal link (follow-up)
- AOSP word-count tech debt (recommend `/gsd-validate-phase 39` in v1.4.1)
