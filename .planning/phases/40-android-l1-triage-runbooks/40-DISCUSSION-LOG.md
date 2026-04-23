# Phase 40: Android L1 Triage & Runbooks - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `40-CONTEXT.md` — this log preserves the alternatives considered
> and the adversarial review verdicts that selected the winners.

**Date:** 2026-04-23
**Phase:** 40-android-l1-triage-runbooks
**Method:** Adversarial review (Finder / Adversary / Referee scored pattern), 4 parallel agents, one per gray area
**Scoring:** weighted total = 5×CRIT + 2×MED + 1×LOW (post-Referee rulings)
**Winner selection:** lowest weighted score; tiebreak 1 — lowest CRIT count; tiebreak 2 — most aligned with Phase 30 iOS + Phase 34 Android LOCKED precedent
**Gray areas discussed:** GA1 Triage Tree Root Structure, GA2 Runbook-to-Mode Scope Matrix, GA3 Multi-Cause Runbook Structure (25, 27), GA4 Cross-File Touch Scope

---

## GA1: Triage Tree Root Structure

### Options evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Single 5-way mode-gate at root (Fully managed / Work profile / Dedicated / ZTE / AOSP / Unknown) → symptom sub-diamond per branch → runbook or L2 | |
| 1B | Two-axis root — ownership (personal vs corporate) → mode sub-gate on corporate branch; personal branch routes to BYOD Work Profile | |
| 1C | Visibility-first root ("visible in Intune?") matching iOS Phase 30 pattern, with mode inferred downstream from attempt | |
| 1D | Compound plain-language mode+ownership gate with 6 labeled options folding ownership into mode label | ✓ |

### Flaw analysis (post-Referee)

| Option | CRIT | MED | LOW | Score |
|--------|------|-----|-----|-------|
| 1A | 0 | 2 | 2 | 4 |
| 1B | 2 | 2 | 1 | 15 |
| 1C | 2 | 1 | 1 | 13 |
| 1D | 0 | 1 | 2 | 4 |

### Winner: 1D (Score 4; tiebreak 2 vs 1A on Phase 34 D-01/D-04 alignment)

### Key flaws — Finder / Adversary / Referee trail

| # | FINDER | ADVERSARY | REFEREE |
|---|--------|-----------|---------|
| F1 | **1B-CRIT**: Ownership-first root inverts ROADMAP SC #1 ("mode BEFORE symptom") — ownership ≠ mode; corporate-owned work-profile (COPE/WPCO) devices cannot be routed by ownership axis | "Ownership is a higher-order mode filter; mode still asked second, preserving SC #1" | **CONFIRMED REAL.** SC #1 text is explicit: "asks enrollment mode (fully managed, work profile, dedicated, ZTE) BEFORE it asks symptom." COPE/WPCO (Phase 36 SC #2) is corporate-owned work profile, breaking any 2-axis ownership-then-mode routing. |
| F2 | **1B-CRIT**: BYOD-only personal branch omits AOSP (can be personal specialty hardware) and omits ZTE-on-personal-device edge cases — lossy partition | "AOSP is corporate-only per Phase 39" | **CONFIRMED REAL.** Even if AOSP fits corporate, the 2-axis design forces routing decisions before mode is known — PITFALL 7 framing ("Other OEMs not supported under AOSP") cannot be delivered without first surfacing AOSP as explicit branch. |
| F3 | **1C-CRIT**: Visibility-first root directly violates ROADMAP SC #1 — visibility is a symptom-adjacent observation, not a mode question | Cites Phase 30 D-01 "hybrid visibility-first" precedent; argues mode can be treated orthogonal | **CONFIRMED REAL.** Phase 30 D-01 was locked for iOS BECAUSE iOS modes do not fundamentally differ in root-cause taxonomy; ROADMAP Phase 40 SC #1 explicitly states "Android failure root causes differ fundamentally by mode" — deliberate deviation FROM iOS precedent, not inheritance. |
| F4 | **1C-CRIT**: Visibility question is mode-dependent on Android — work-profile devices appear under "Personal" view; dedicated may not appear until kiosk provisioning completes; L1 cannot answer "visible?" without knowing mode first | "L1 uses 'All devices' filter" | **CONFIRMED REAL.** Phase 34 D-01 5-column mode-comparison table makes portal-surface differences explicit. Asking visibility first creates false-negative triage. |
| F5 | **1A-MED**: 5-way root diamond visually dense in Mermaid (6 branches including Unknown); may exceed L1 cognitive load | "Phase 30 iOS IOS2 has 6 branches verbatim — 6-way fanout is precedented" | **FALSE POSITIVE.** IOS2 has 6 branches at lines 36-41 of 07-ios-triage.md. 6-way fanout is inside precedent. |
| F6 | **1A-MED**: Technical mode names (COBO, COSU) may not match ticket language L1 receives | "1A could add parentheticals" | **CONFIRMED REAL**, but mitigated in 1D which folds the mitigation into the option. |
| F7 | **1D-MED**: Plain-language labels risk semantic drift from Phase 34 D-04 canonical terms; may trigger AEAUDIT-04 "supervision" audit false-positive if language creeps | "1D's D-06 explicitly preserves canonical labels; parentheticals are disambiguators only" | **CONFIRMED REAL** (drift risk exists) but D-06 mitigation documented — score 1 MED. |
| F8 | **1D-LOW**: Six-option root is 1 more than Phase 30 iOS root fanout (which is 2 at IOS1) | "Phase 30's 2-way IOS1 is not comparable node — IOS2's 6-way fanout is the precedent" | **CONFIRMED REAL** LOW stylistic deviation only; node budget not violated. |
| F9 | **1A-LOW**: "Unknown" branch naming ambiguous vs iOS "Other / unclear" | "1A could rename to match iOS" | **CONFIRMED REAL** LOW; rename trivially. |
| F10 | **1B-MED**: 2-axis design forces deeper tree (3 decision steps for corporate branch) exceeding Phase 30 2-step budget | "1B could collapse" | **CONFIRMED REAL.** Phase 30 locked 2-step budget per IOS1→IOS2/IOS3→terminal. |
| F11 | **1C-MED**: Phase 30 visibility-first worked because iOS has single dominant symptom taxonomy; Android 4-mode fragmentation makes "What attempted?" sub-question explode to 20+ branches | "1C could cluster" | **CONFIRMED REAL.** Cluster-by-attempt collapses information content, defeating triage purpose. |
| F12 | **1D-LOW**: "Specialty hardware (AOSP — RealWear)" label may become stale if Phase 39 OEM matrix expands in v1.4.1 | "1D could use 'AOSP / specialty OEM' generically" | **CONFIRMED REAL** LOW; trivial rename to "Specialty hardware (AOSP)" without RealWear specifier — already captured in D-01 final wording. |

**User's choice:** Adopt Winner 1D (confirmed via AskUserQuestion after adversarial review: "Adopt all 4, write CONTEXT.md").
**Notes:** `AND` Mermaid-prefix grep-verified clean — no collision with TRD / MAC / IOS.

---

## GA2: Runbook-to-Mode Scope Matrix

### Options evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Narrow per-runbook `applies_to` (22=all, 23=BYOD, 24=all, 25=all, 26=all, 27=ZTE) + explicit symptom sub-questions in triage tree to disambiguate 22-vs-24 and 23-vs-24 | ✓ |
| 2B | Uniform `applies_to: all` on all 6 runbooks + inline "## Applies to" body callout listing real mode coverage | |
| 2C | Hybrid — `applies_to` matches dominant mode, body "Mode scope" callout explains other-mode nuance, triage tree uses mode-first gate only | |
| 2D | Multi-value array `applies_to` (e.g. `[COBO, BYOD, Dedicated, ZTE]`) | |

### Flaw analysis (post-Referee)

| Option | CRIT | MED | LOW | Score |
|--------|------|-----|-----|-------|
| 2A | 0 | 1 | 1 | 2 |
| 2B | 1 | 2 | 1 | 10 |
| 2C | 1 | 2 | 1 | 10 |
| 2D | 2 | 1 | 0 | 12 |

### Winner: 2A (Score 2)

### Key flaws — Finder / Adversary / Referee trail

| # | FINDER | ADVERSARY | REFEREE |
|---|--------|-----------|---------|
| F1 | **2D-CRIT**: Array `applies_to` violates single-string convention — Phase 36 D-13, 37 D-15, 38 D-18, 39 D-16 all lock single-string. Array breaks 4 locked decisions simultaneously. | "Array is more precise — audit tooling could be updated." | **CONFIRMED REAL.** 4 LOCKED precedents override precision gains. AEAUDIT-04 is grep-based per Phase 39 D-17. |
| F2 | **2D-CRIT**: Breaks AEAUDIT-04 grep — Phase 42 audit greps frontmatter mechanically; `applies_to: [A,B]` vs `applies_to: A` string parsing diverges. | "Audit could be extended with YAML parser." | **CONFIRMED REAL.** Phase 42 SC #4 lists mechanical checks; schema drift creates audit-tooling debt mid-milestone. |
| F3 | **2B-CRIT**: Violates per-runbook narrow-scoping precedent — Phase 30 D-25 explicitly sets runbook 17 to `applies_to: ADE` (narrow), Phase 39 D-16 sets AOSP stub to `applies_to: AOSP`. Uniform `all` erases this precedent. | "Body callout is more discoverable for L1 than frontmatter." | **CONFIRMED REAL.** Precedent is locked; L1 may not read frontmatter but authoring/audit tooling does. |
| F4 | **2B-MED**: Body callout = shadow matrix — six "## Applies to" callouts enumerating mode coverage is de-facto distributed matrix, Anti-Pattern 1 (Phase 34 D-26) applies. | "It's a callout, not a matrix — one line per runbook." | **CONFIRMED REAL.** Six synchronized single-line scope statements ARE a matrix, just distributed; drift risk real. |
| F5 | **2C-CRIT**: Runbook 23 under-scopes — `applies_to: BYOD` as "dominant" but body says "Dedicated Work-Profile-on-Dedicated not covered" — contradiction. | "Hybrid captures nuance frontmatter can't." | **CONFIRMED REAL.** Per ROADMAP SC #2, runbook 23 IS BYOD-only (COPE deferred, Dedicated has no WP); no nuance to capture. 2C invents a problem. |
| F6 | **2C-MED**: Body callout duplicates frontmatter — "Mode scope" callout + `applies_to:` = two sources of truth; drift risk per Anti-Pattern 1 spirit. | "Frontmatter is machine-readable; body is human-readable — complementary." | **CONFIRMED REAL.** iOS runbook 16 (shipped) has NO body mode-scope callout — only Platform gate banner. Introducing one for Android diverges from sibling-platform precedent. |
| F7 | **2A-MED**: Symptom sub-questions require authoring judgment — exact wording is Claude-at-research-time; variability risk. | "Phase 30 D-specifics reserved 'Claude's discretion' for intra-runbook sub-questions; runbook 18/20 disambiguation precedent." | **FALSE POSITIVE.** Phase 30 allows this pattern (runbook 18 vs 20 uses same mechanism). Downgrade to LOW. |
| F8 | **2A-MED**: Triage tree node budget risk — adding two sub-questions could exceed AEL1-01 mode-first 5-node budget. | "Node budget is per-path not per-tree; SC #1 says 'within 5 decision nodes' per L1 path — mode gate + symptom gate + disambig = 3 nodes still under 5." | **FALSE POSITIVE.** Per-path node budget; 2A is well within it. |
| F9 | **2B-MED**: Loses mode-specific routing precision in frontmatter — downstream tooling (Phase 42 AEAUDIT, future mode-filtered indices) can't filter runbook 27 as ZTE-specific if frontmatter says `all`. | "Tooling can read body callout." | **CONFIRMED REAL.** Phase 39 D-17 anchor stability contract treats frontmatter as machine-readable contract. Uniform `all` degrades contract surface. |
| F10 | **2A-LOW**: "enrollment restriction" phrasing may be unfamiliar to L1; sub-question needs plain-English gloss. | "Phrase is Microsoft-documented; Phase 29 D-08 establishes the anchor." | **CONFIRMED REAL** but LOW. Mitigation: include plain-English aliases ("or 'this device cannot enroll' / 'enrollment blocked'") in sub-question wording — captured in D-13. |

**User's choice:** Adopt Winner 2A.
**Notes:** Frontmatter schema stays single-string; AEAUDIT-04 grep-based audit tooling preserved cleanly.

---

## GA3: Multi-Cause Runbook Structure (Runbooks 25, 27)

### Options evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Both 25 AND 27 use Phase 30 D-28 iOS-runbook-21 pattern (sub-H2 per cause + "How to Use" mini-nav) | ✓ |
| 3B | Both 25 AND 27 use single linear flow with inline branching inside L1 Triage Steps | |
| 3C | Asymmetric — 25 uses multi-H2 (parallel causes); 27 uses single linear flow (sequential rule-out) | |
| 3D | Single-flow entry runbooks + separate per-cause sub-runbooks (8+ total files) | |

### Flaw analysis (post-Referee)

| Option | CRIT | MED | LOW | Score |
|--------|------|-----|-----|-------|
| 3A | 0 | 2 | 1 | 5 |
| 3B | 1 | 3 | 1 | 12 |
| 3C | 0 | 3 | 1 | 7 |
| 3D | 2 | 2 | 1 | 13 |

### Winner: 3A (Score 5)

### Key flaws — Finder / Adversary / Referee trail

| # | FINDER | ADVERSARY | REFEREE |
|---|--------|-----------|---------|
| F1 | **3A-LOW** (length): 25 at ~220 lines, 27 at ~240 lines exceeds sibling runbook norm (100-140 lines for 22/24/26). | "iOS runbook 21 shipped at 193 lines; Phase 30 D-10 explicitly budgeted 180+ for multi-cause." | **LOW** (not MED) — precedent already normalizes length for this class. |
| F2 | **3B-CRIT** (scannability): "Go to step 7 if X" routing in numbered steps unreadable under L1 time pressure; duplicate-context problem when two causes need same prereq. | "Some single-flow L1 runbooks exist (macOS 10)." | **CRIT upheld.** macOS 10 is single-cause; no shipped multi-cause L1 runbook uses linear flow, and D-28 explicitly pointed compliance-blocked class at macOS 11's sectioned layout. |
| F3 | **3C-MED** (asymmetry): "27 is sequential" simplifies reality — Cause D (KME/ZT) is Samsung-signal-gated, not rule-out-gated by Causes A/B/C. | "Reseller upload IS a strict prerequisite for all other causes." | **MED upheld.** Reseller upload is prereq but L1 still observes distinct signals for C and D independently; forced sequence obscures this. |
| F4 | **3C-MED** (authoring cost): Two different structures across 25/27 = two audit rules, two templates, diverging maintenance. | "Phase 30 had no such issue with runbook 21." | **MED upheld.** Phase 40 audits 6 runbooks; uniformity matters more here than in Phase 30's 6-runbook set. |
| F5 | **3D-CRIT** (scope): ROADMAP line 92 + SC #2 lock runbook count at 6. 3D adds 4-8 sub-runbooks. | — (no defense; scope is locked). | **CRIT upheld.** Rejected prima facie. |
| F6 | **3D-CRIT** (duplication): Prereq / Escalation / Platform-gate banner duplicated across each sub-runbook = Anti-Pattern 1. | "Could share via include." | **CRIT upheld.** No include mechanism in docs stack; duplication would be literal. |
| F7 | **3A-LOW** (SafetyNet leak risk): Cause A authors might inadvertently write "SafetyNet / Play Integrity" as historical note. | "AEAUDIT-04 audit catches this." | **LOW** — covered by explicit audit-anchor decision (D-20), but worth flagging in CONTEXT.md. |
| F8 | **3B-MED** (tighter-step authoring cost): Linear-flow with branch-routing requires careful step numbering invariants; every cause-branch must reconverge or dead-end explicitly. | "Authors are disciplined." | **MED upheld.** Authoring difficulty produces audit pressure downstream. |
| F9 | **3A-MED-downgrade-to-LOW** (stylistic mismatch): 25 and 27 will look structurally different from 22/24/26 single-cause siblings. | "iOS runbook 21 already looks different from 16/17/18/19/20 — the difference reflects underlying failure shape." | **LOW** — accurate but acceptable; overruled as non-issue. |
| F10 | **3C-MED** ("configuration-must-be-assigned" ordering): 3C claims strict sequence but Phase 39 D-03 D-17 pitfall lives under own anchor (`#configuration-must-be-assigned`) — Phase 39 architecture already models it as parallel-addressable. | "Anchors are reference targets, not causal models." | **MED upheld.** Anchor architecture is single source of truth for "is this cause independently enterable"; 3C's sequential framing contradicts it. |

**User's choice:** Adopt Winner 3A.
**Notes:** iOS runbook 21 (193 lines) is the shipped length precedent for multi-cause; Phase 40 runbooks 25/27 inherit it directly.

---

## GA4: Cross-File Touch Scope

### Options evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Full Phase 40 scope — retrofit 6 placeholders (3 admin files) + add Android banner to 00-initial-triage.md + establish "Android L2 runbooks (Phase 41)" placeholder convention in runbooks 22-27 | ✓ |
| 4B | Retrofit + L2 placeholder now; defer 00-initial-triage.md banner to Phase 42 | |
| 4C | Banner + L2 placeholder now; defer 3-admin-file retrofit to Phase 42 | |
| 4D | Minimal — defer all three cross-file touches to Phase 42 | |

### Flaw analysis (post-Referee)

| Option | CRIT | MED | LOW | Score |
|--------|------|-----|-----|-------|
| 4A | 0 | 1 | 2 | 4 |
| 4B | 1 | 2 | 1 | 10 |
| 4C | 2 | 2 | 1 | 15 |
| 4D | 3 | 2 | 1 | 20 |

### Winner: 4A (Score 4)

### Key flaws — Finder / Adversary / Referee trail

| # | FINDER | ADVERSARY | REFEREE |
|---|--------|-----------|---------|
| F1 | **4A-MED**: Phase 40 commit graph broadens from "8 new files + 1 append" to include 1 retrofit commit + banner commit. | "Phase 30 shipped exactly this shape (10 runbooks + index append + retrofit + banner in single phase) and was successfully delivered." | Valid **MED** — commit-graph broadening real but precedented; keep as MED. |
| F2 | **4A-LOW**: Plan enumeration overhead — per Phase 30 D-17, retrofit rows need pre-enumeration in PLAN.md. | "6 rows vs iOS's 71 — marginal overhead." | **LOW** stands. |
| F3 | **4A-LOW**: Banner frontmatter treatment (applies_to) may confuse readers. | "D-05 explicitly locked `applies_to: APv1` stays." | **LOW**. |
| F4 | **4B-CRIT**: Shipping runbooks and triage tree without banner on 00-initial-triage.md means canonical L1 entry point has no Android routing — breaks AEL1 routability. | "Phase 42 AEAUDIT-02 covers `docs/index.md` — triage tree is nav hub for L1." | **Sustained CRIT** — AEAUDIT-02's scope is `docs/index.md` stub (Phase 42 LOCKED fact), NOT 00-initial-triage.md. Deferring leaves 08-android-triage.md unreachable from canonical L1 entry point between ship-of-40 and ship-of-42. |
| F5 | **4B-MED**: Fragments banner work across phases — Phase 30 precedent (D-04) added banner in same phase as tree. | "Minor pattern deviation." | **MED** — precedent is explicit. |
| F6 | **4B-MED**: Phase 42 audit phase becomes authoring phase (banner wording decision, Scenario Trees entry wording). | — | **MED**. |
| F7 | **4C-CRIT**: Violates Phase 28 D-22 / Phase 29 D-13-style forward-promise contract explicitly invoked by Phase 30 D-16. Placeholder text `"Phase 40 triage tree (when shipped)"` is a contract Phase 40 is the resolution milestone. | "No explicit forward-promise decision recorded in Phase 34/36/37/38 CONTEXTs naming Phase 40 as resolver." | **Sustained CRIT** — placeholder text itself names Phase 40; Phase 30 D-16 rationale ("Leaving placeholders after [the phase] delivers the runbooks breaks the forward-promise") applies verbatim. |
| F8 | **4C-CRIT**: Phase 42 AEAUDIT-04 is mechanical-audit scope (grep checks, scope-guards). Absorbing 3-file retrofit into Phase 42 converts mechanical-audit into substantive authoring — blurs phase boundary discipline. | — | **Sustained CRIT**. |
| F9 | **4C-MED**: Creates Anti-Pattern 1 risk — if Phase 42 re-reads admin files, duplicates placeholder-resolution logic. | — | **MED**. |
| F10 | **4D-CRIT×3**: All three 4B/4C critical flaws compound. Runbooks without L2 placeholders either (a) omit Escalation Criteria content (unshippable per SC #2 "explicit L2 escalation point"), or (b) use inconsistent ad-hoc prose across 6 runbooks (no convention → Phase 41 retrofit can't grep-find them). | — | **3×CRIT sustained**. |
| F11 | **4D-MED**: Phase 42's explicit scope (AEAUDIT-01..04) does not name retrofit/banner/L2-placeholder — forcing them in would require adding new AEAUDIT-05 requirement, scope creep. | — | **MED**. |

**User's choice:** Adopt Winner 4A.
**Notes:** Retrofit targets 6 forward-promise text instances in 3 admin files; grep-verified at review time. Single atomic commit per Phase 30 D-20 pattern.

---

## Claude's Discretion

Areas where authoring detail is delegated to Claude at plan / research / execution time (constrained by captured decisions):

- Exact Mermaid styling within D-02 node-ID convention
- Exact symptom sub-diamond wording within D-13 / D-14 plain-English alias list (may expand at research time)
- Runbook 25 "How to Use This Runbook" nav format (bulleted list vs compact decision tree)
- Exact runbook length within sibling norms (22/24/26 ~100-140; 23 ~120-160; 25 ~200-240; 26 ~120-160; 27 ~180-220)
- Exact "Say to the user" wording per runbook (Phase 30 D-14 restrains application to status-communication)
- Cross-link ordering and "Related Resources" section content at each runbook's bottom
- Whether to include an "AOSP L1 Note" advisory in the Android index section (recommended per D-03; exact placement author's call)

## Deferred Ideas (from full flaw trail)

The following ideas surfaced during adversarial review but belong in other phases or future milestones:

- **AOSP L1 triage content** — v1.4.1 (Phase 39 AEAOSP-01 scope guard)
- **Knox Mobile Enrollment L1 runbook** — v1.4.1 (AEKNOX-02)
- **MAM-WE-specific L1 runbooks** — future milestone
- **Android L2 investigation content** — Phase 41
- **`docs/index.md` Android H2 section** — Phase 42 AEAUDIT-02
- **Android capability matrix** — Phase 42 AEAUDIT-01
- **Cross-platform nav integration (common-issues, quick-refs)** — post-v1.4 unification task
- **`_glossary-macos.md` Android see-also** — Phase 42 AEAUDIT-03
- **Automated SafetyNet-absent CI check** — post-v1.4 tooling
- **iOS/macOS APNs runbook parity** — deferred from Phase 30; not Phase 40 scope

---

*Phase: 40-android-l1-triage-runbooks*
*Log generated: 2026-04-23*
*Method: Adversarial review (Finder/Adversary/Referee scored pattern), 4 parallel agents*
*User confirmation: "Adopt all 4, write CONTEXT.md" (AskUserQuestion response post-review)*
