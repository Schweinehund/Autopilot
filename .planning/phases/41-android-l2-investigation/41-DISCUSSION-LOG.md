# Phase 41: Android L2 Investigation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-23
**Phase:** 41-android-l2-investigation
**Areas discussed:** GA1 Log collection tiering, GA2 Runbook 19 enrollment scope, GA3 adb confidence strategy, GA4 Runbook 21 compliance axis + SafetyNet callout
**Decision method:** Adversarial review (Finder / Adversary / Referee scored pattern)

---

## Session Flow

1. User invoked `/gsd-discuss-phase 41 --chain` (interactive discuss → auto plan+execute pipeline)
2. Claude analyzed Phase 41 scope, loaded Phase 31 (iOS L2) + Phase 40 (Android L1) + Phase 34-39 Android foundations as LOCKED precedent set
3. Presented 4 gray areas in `AskUserQuestion` multiSelect
4. User selected all 4 AND explicitly requested `/adversarial-review` for per-area winner recommendation
5. Claude invoked the adversarial-review skill with 16 candidate options + sub-variants across 4 gray areas
6. Finder agent returned 106 flaws (25 CRIT / 43 MED / 38 LOW = 503 gross points)
7. Adversary agent returned 18 disproves (targeting biggest-value over-reaches)
8. Referee agent adjudicated 106 flaws with 17 interpretation rulings; returned per-option final scores + winners
9. Claude presented per-area winners to user in `AskUserQuestion`
10. User selected "Adopt all 4 winners"
11. Claude wrote CONTEXT.md (D-01 through D-34) + this DISCUSSION-LOG

---

## Gray Area 1: Log collection method tiering + tool-landscape preamble

**Target file:** `docs/l2-runbooks/18-android-log-collection.md`

### Candidate Options Presented

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Tier 1 Company Portal → Tier 2 Microsoft Intune app → Tier 3 adb logcat (friction-ordered Phase 31 D-01 mirror) | |
| 1B | Tier 1 Microsoft Intune app → Tier 2 Company Portal → Tier 3 adb logcat (post-AMAPI Intune-app-primary) | |
| 1C | Parallel presentation (no tiering); decision matrix leads | |
| **1D** | **Mode-first tiering: BYOD→Intune app primary post-AMAPI (or Company Portal pre-AMAPI), COBO/Dedicated/ZTE→Intune app primary, all→adb logcat last** | ✓ |

### Sub-Decision: Preamble Variant

| Option | Description | Selected |
|--------|-------------|----------|
| **(a)** | **iOS D-02 analog: "no Intune admin center Download Diagnostics per-device bundle for Android"** | ✓ |
| (b) | Trust-boundary framing (user-self / agent / USB-privileged) | |
| (c) | Combined (a) + (b) | |
| (d) | Neither; decision matrix speaks for itself | |

### Sub-Decision: USB-Debugging Disabled Note

| Option | Description | Selected |
|--------|-------------|----------|
| **Include** | **Explicit callout in Section 3 (adb logcat): "Device-owner policy on COBO/Dedicated/ZTE may disable USB debugging; adb tier unreachable → escalate Microsoft Support for log retrieval"** | ✓ |
| Omit | Leave to readers to discover | |

### Adversarial Review Scoring (GA1)

Finder flaws per option (post-Referee adjudication; weighted score = 5×CRIT + 2×MED + 1×LOW):

| Option | CRIT | MED | LOW | Score |
|--------|------|-----|-----|-------|
| 1A | 0 | 3 | 1 | 7 |
| 1B | 1 | 2 | 1 | 10 |
| 1C | 1 | 2 | 1 | 10 |
| **1D** | **0** | **3** | **1** | **7** (winner via tiebreak) |

Preamble variant scores: (a) 1 | (b) 3 | (c) 2 | (d) 7 → **(a) wins**
USB-debug scores: Include 1 | Omit 7 → **Include wins**

### Winner Rationale (from Referee)

Option 1D wins GA1 because Android's collection-tool landscape is heterogeneous by enrollment mode in a way iOS (Phase 31 D-01) is not: Company Portal is the BYOD primary post-AMAPI-legacy, while Microsoft Intune app is the COBO/Dedicated/ZTE primary, and adb is a BYOD-centric optional tool requiring USB debugging. Mode-first tiering models this reality directly rather than forcing a friction-ordered single hierarchy (1A) that misrepresents which tool is "Tier 1" for device-owner-mode devices, a parallel per-mode flow (1B) that explodes maintenance surface, or an untiered flat list (1C) that abandons the Phase 31 D-01 tiered-flow precedent locked for L2 log-collection structure. The accompanying Preamble variant (a) mirrors the Phase 31 D-02 "no iOS analog to mdmdiagnosticstool.exe" framing with an Android-parallel "no single Intune admin center Download Diagnostics for Android" tool-landscape note, and the USB-debug inclusion closes an operational gap for BYOD adb usage that omission would leave to readers to discover mid-investigation.

### Tiebreak Resolution (1A vs 1D)

Both scored 7. Tiebreaker: 1D correctly models heterogeneous primary-tool-by-mode (aligns with Referee Ruling #4 on AMAPI scope reality). 1A applies iOS friction-order to a platform with heterogeneous primary-tool-by-mode and misrepresents which tool is "Tier 1" for device-owner-mode devices. 1D wins the tiebreak.

---

## Gray Area 2: Runbook 19 enrollment investigation — scope + structure

**Target file:** `docs/l2-runbooks/19-android-enrollment-investigation.md`

### Candidate Options Presented

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | BYOD work-profile-only (ROADMAP SC#2 literal text match) | |
| **2B** | **Multi-mode with 5 patterns (work-profile-not-created BYOD / COBO-stuck / ZTE-device-claim / Dedicated-QR-fail / tenant-config-universal)** | ✓ |
| 2C | BYOD-primary + ZTE-secondary; COBO/Dedicated covered as generic principles only | |
| 2D | Hybrid Phase 31 D-07 B5 mirror (mode-agnostic Data Collection + per-mode Pattern A-E + Resolution) | |

### Sub-Decision: Depth Variant

| Option | Description | Selected |
|--------|-------------|----------|
| (a) | Step-numbered linear 191 lines (Phase 31 macOS 11 precedent) | |
| **(b)** | **Hybrid two-layer H2 220-280 lines (Phase 31 iOS 15 D-07 precedent)** | ✓ |
| (c) | Per-mode independent sections 600+ lines | |

### Adversarial Review Scoring (GA2)

| Option | CRIT | MED | LOW | Score |
|--------|------|-----|-----|-------|
| 2A | 1 | 2 | 1 | 10 |
| **2B** | **0** | **2** | **3** | **7** (winner via sub-option safety tiebreak) |
| 2C | 1 | 2 | 1 | 9 (with 2.C.4 FALSE POSITIVE) |
| 2D | 0 | 2 | 3 | 7 (tied with 2B; loses on sub-option CRIT risk in depth variant c) |

### Winner Rationale (from Referee)

Option 2B wins GA2 because it covers all six Phase 40 L1 placeholder references without the BYOD-only scoping gap that makes 2A unable to service runbooks 24/25/27 (`applies_to: all` / `applies_to: ZTE`), without the split-runbook maintenance cost of 2C, and with only a LOW-severity anchor-stability risk against Phase 39 D-17 targets — a risk already mitigated by Phase 40 D-18 runbook 27 precedent, which successfully cross-links the same anchors. The hybrid D-07 mirror of 2D is attractive but introduces sub-option risk (2Dc state-mutating remediation bleed = CRIT), whereas 2B's sub-options are all LOW-impact. Anchor verification at execute time neutralizes the one residual concern.

### Key Finder Flaws (adjudicated)

- **2.A.1 (CRIT, REAL):** BYOD-only mismatches v1.4 scope — COBO/Dedicated/ZTE not deferred, leaving 4 in-scope modes uncovered
- **2.A.2 (MED, REAL):** Phase 40 D-25 atomic placeholder resolution fails for L1 runbooks 24/25/27 if L2 is BYOD-only
- **2.B.1 (CRIT → LOW per Ruling #9):** Phase 39 D-17 anchor re-use is Phase 40 D-18 precedent; runbook 19 Pattern C reusing is mitigated
- **2.C.1 (CRIT, REAL):** "Generic principles only" cannot resolve COBO/Dedicated placeholder contracts
- **2.Dc.1 (CRIT, REAL):** 600+ line depth variant violates Phase 31 D-07 size norm + blocks 90-day review_by cadence

---

## Gray Area 3: adb command confidence labeling + command set

**Target:** Runbook 18 Section 3 (adb logcat) + any adb reference in runbooks 19/20/21

### Candidate Options Presented (Marker Placement)

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Blanket MEDIUM section-level (single marker in section header) | |
| **3B** | **Per-assertion confidence markers with section-level default for routine commands** | ✓ |
| 3C | Section-level MEDIUM default + per-command overrides for known HIGH/LOW | |
| 3D | Preamble-only scope warning; zero inline markers | |

### Sub-Decision: Command Set

| Option | Description | Selected |
|--------|-------------|----------|
| (a) | `adb logcat` only | |
| **(b)** | **`adb logcat` + `adb shell dumpsys device_policy` + `adb shell pm list packages` (core triad)** | ✓ |
| (c) | (b) + `adb bugreport` + `adb shell getprop ro.build.*` | |
| (d) | (c) + `adb shell am broadcast` + `adb shell pm grant-permissions` (state-mutating) | |

### Adversarial Review Scoring (GA3)

| Option | CRIT | MED | LOW | Score |
|--------|------|-----|-----|-------|
| 3A | 0 | 3 | 1 | 7 |
| **3B** | **0** | **2** | **2** | **6** (winner) |
| 3C | 0 | 3 | 1 | 7 |
| 3D | 2 | 1 | 1 | 13 |

Command set scores: (a) 3 | (b) 2 | (c) 3 | (d) 8 → **(b) wins**

### Winner Rationale (from Referee)

Option 3B wins GA3 because it satisfies SC#1's mechanical-audit intent (per Ruling #3: Phase 37 D-10/D-11 regex is designed for mechanical grep, which works best per-assertion) without the over-marked verbosity of 3D's pure-per-command approach, while still allowing section-level defaults to absorb routine commands without clutter — the "sweet spot" the Referee ruling explicitly endorses. Pure section-only placement (3A/3C) raises audit-mechanization risk to MEDIUM because human inheritance of section markers can't be verified by Phase 42's grep-based AEAUDIT-04. Command set (b) wins on the sub-decision because it stays strictly within the Phase 31-locked diagnostic scope; (d)'s `am broadcast` and `pm grant-permissions` are state-mutating and violate the diagnostic/remediation boundary established by Phase 24 macOS D-10 precedent (CRIT), while (c)'s bugreport PII footprint, though mitigable, is heavier than (b)'s minimal surface.

### Key Finder Flaws (adjudicated)

- **3.A.1 (CRIT → MED per Ruling #3):** Section-only raises audit-mechanization risk but is not a SC#1 literal violation
- **3.C.1 (CRIT → MED per Ruling #3):** Same — mixed scheme hard to grep but not outright violation
- **3.D.1 (CRIT, REAL):** Zero labels = direct SC#1 violation
- **3.Vd.1 (CRIT, REAL — Ruling #11):** State-mutating commands violate diagnostic/remediation boundary
- **3.Vc.1 (MED, REAL — Ruling #12):** bugreport PII risk mitigable but real

---

## Gray Area 4: Runbook 21 compliance — axis structure + SafetyNet callout

**Target file:** `docs/l2-runbooks/21-android-compliance-investigation.md`

### Candidate Options Presented (Axis Structure)

| Option | Description | Selected |
|--------|-------------|----------|
| **4A** | **Phase 31 D-14 hybrid axis mirror (⚙️ Config / ⏱️ Timing / 🐛 Defect top + Per-Cause A/B/C/D deep-dive mapping 1:1 to L1 runbook 25)** | ✓ |
| 4B | Play-Integrity-first (Cause A longest, B/C/D compact); SafetyNet inline Cause A with date + glossary link | |
| 4C | Attestation-separated (Part 1 Play Integrity + Part 2 Other B/C/D axis-grouped); SafetyNet in Part 1 | |
| 4D | L1 Cause A/B/C/D direct mirror (no axis, no separation); SafetyNet placement unspecified | |

### Sub-Decision: SafetyNet Callout Placement

| Option | Description | Selected |
|--------|-------------|----------|
| (a) | Preamble-only warning | |
| (b) | Cause A-section-only | |
| **(c)** | **Glossary-link-only (runbook body cross-links `_glossary-android.md#play-integrity`; ZERO literal "SafetyNet" token in runbook body)** | ✓ |
| (d) | All-three redundancy (preamble + Cause A + glossary link) | |
| (e) | None inline; rely on Phase 42 milestone audit grep | |

### Adversarial Review Scoring (GA4)

| Option | CRIT | MED | LOW | Score |
|--------|------|-----|-----|-------|
| **4A** | **0** | **0** | **4** | **4** (winner) |
| 4B | 2 | 1 | 1 | 13 (4.B.3 FALSE POSITIVE per Rulings #2/#16) |
| 4C | 1 | 2 | 1 | 10 |
| 4D | 2 | 1 | 1 | 13 |

SafetyNet callout scores: (a) 4 | (b) 7 | **(c) 0 (winner)** | (d) 7 | (e) 2

### Winner Rationale (from Referee)

Option 4A wins GA4 because it preserves the Phase 31 D-14 LOCKED hybrid axis (config/timing/defect) applied on top of L1 runbook 25's four causes, producing a 3×4 matrix that the Referee ruling #13 confirms is Phase 31 precedent working as intended rather than a depth flaw. Options 4B and 4D tie at the worst score: 4B because it proposes inline "SafetyNet" mentions that fail AEAUDIT-04's strict-token grep (Ruling #1, confirming Phase 40 D-17 rephrase precedent), and 4D because it drops the hybrid axis entirely and violates the locked Phase 31 D-14 precedent. SafetyNet callout (c) wins on the sub-decision because the Phase 40 team explicitly rephrased to avoid the literal "SafetyNet" token in L1 runbook 25 Cause A body, establishing that "Play Integrity (legacy API deprecated by Google in January 2025)" conveys the deprecation context without the banned token; variant (c) cross-links `[Play Integrity](../_glossary-android.md#play-integrity)` from the runbook body with zero inline "SafetyNet" occurrences, which is the only variant that survives strict AEAUDIT-04 grep with a meaningful inline deprecation signal, while remaining fully compliant with the shared-file guard (Ruling #2: linking to the glossary is not modifying it).

### Key Finder Flaws (adjudicated)

- **4.B.1 (CRIT, REAL — Ruling #1):** Inline "SafetyNet" in Cause A body fails strict AEAUDIT-04 grep per Phase 40 D-17 rephrase precedent (Adversary's "as compliance mechanism" disprove overruled)
- **4.B.2 (CRIT, REAL — Ruling #1):** Same — SC#4 literal enforced strictly per Phase 40 team choice
- **4.B.3 (CRIT → FALSE POSITIVE per Rulings #2/#16):** Glossary link is NOT glossary modification; Phase 40 L1 runbook 25 precedent
- **4.C.1 (CRIT, REAL — Ruling #1):** Part 1 body still subject to strict grep
- **4.D.1 (CRIT, REAL — Ruling #17):** Dropping Phase 31 D-14 hybrid axis = locked-precedent violation
- **4.Sb.1 (CRIT, REAL):** Cause-A-only with literal "SafetyNet" token in runbook body = direct violation
- **4.Sc.1 (CRIT → FALSE POSITIVE per Rulings #2/#16):** Glossary link is not modification
- **4.Sc.2 (LOW → FALSE POSITIVE):** Case-insensitive grep scope overreach; Phase 40 D-20 AEAUDIT-04 applies to runbook body literal tokens, not link targets
- **4.Sd.1 (CRIT, REAL):** All-three redundancy multiplies body occurrences

---

## Referee Interpretation Rulings (Applied Across All 106 Flaws)

The Referee issued 17 binding interpretation rulings that reframed ambiguous Finder flaws:

1. **AEAUDIT-04 SafetyNet rule = strict-token grep** (Phase 40 D-17 rephrase precedent sets the bar; Adversary's "as compliance mechanism" softening OVERRULED)
2. **Cross-linking ≠ modifying** — glossary link is not glossary modification (Phase 40 L1 runbook 25 precedent)
3. **SC#1 "any adb command" = per-assertion preferred but not strictly required** — section-level is MEDIUM audit-mechanization risk, not CRIT
4. **AMAPI migration scope = BYOD-only** — Finder flaw 1.A.1 downgraded to MEDIUM (not pure AMAPI issue, broader heterogeneity issue)
5. **Mode-first tiering brittle but correct** — Finder flaw 1.D.1 downgraded to MEDIUM
6. **Phase 31 D-01 tiered-flow strictly for iOS; Android adaptation acceptable** — Finder flaw 1.A.5 FALSE POSITIVE
7. **Phase 31 D-02 preamble pattern required** — dropping = CRIT precedent violation (1.Pd.1 confirmed)
8. **BYOD-only runbook 19 breaks Phase 40 D-25 atomic placeholder resolution** — 2.A.2 confirmed
9. **Phase 39 D-17 anchor re-use is Phase 40 D-18 precedent** — 2.B.1 downgraded to LOW
10. **Hybrid D-07 extension to Android is adaptation not violation** — 2.D.3 downgraded to LOW
11. **Diagnostic vs remediation boundary locked (Phase 24 D-10)** — 3.Vd.1 state-mutating adb CRIT confirmed
12. **Bugreport PII real but mitigable** — 3.Vc.1 MED confirmed
13. **Phase 31 D-14 hybrid axis 3×4 matrix is precedent working as intended** — 4.A.1 downgraded to LOW
14. **Multi-axis causes by design (Cause A spans config + defect)** — 4.A.2 downgraded to LOW
15. **Deprecation callout variants inline require Phase 40 D-17 rephrase** — SafetyNet inline variants (a/b/d) fail strict grep unless rephrased
16. **Glossary cross-link with anchor `#play-integrity` is Phase 40 precedent** — variant (c) fully compliant
17. **Phase 31 D-14 hybrid axis LOCKED** — dropping (4D) = CRIT precedent violation

---

## Final Winners Summary

| Gray Area | Winner | Score | Sub-Decision(s) |
|-----------|--------|-------|-----------------|
| GA1: Log collection tiering | **1D** (mode-first) | 7 | Preamble **(a)** score 1; USB-debug **INCLUDE** score 1 |
| GA2: Runbook 19 scope | **2B** (multi-mode 5 patterns) | 7 | Depth **(b)** hybrid two-layer 220-280 |
| GA3: adb confidence | **3B** (per-assertion + section default) | 6 | Command set **(b)** core triad |
| GA4: Compliance axis + SafetyNet | **4A** (hybrid axis + Per-Cause A/B/C/D) | 4 | SafetyNet **(c)** glossary-link-only |

---

## User Action

User answered `AskUserQuestion` "Adopt the adversarial-review winners as Phase 41 decisions?" with **"Adopt all 4 winners"** — confirmed by timestamp 2026-04-23 within session.

---

## Claude's Discretion (per CONTEXT.md <decisions>)

Areas where user did not constrain Claude — decided by Claude at plan/execute time:

- Exact section numbering within Runbook 18 Section 1/2/3 (D-05 order locked; subsection detail is Claude's)
- Exact Pattern A-E ordering in Runbook 19 (alphabetical or frequency-descending both acceptable)
- Exact wording of runbook 19 Pattern sub-sections (within D-07 scope)
- Exact Cause C / Cause A Pareto-expanded content in runbook 21 (D-20 ~50% allocation; distribution within)
- Exact MAM advisory wording in 00-index.md Android section (D-26 template)
- Exact Graph API READ-ONLY preamble wording (D-10 template)
- Per-runbook length within Phase 31 parallel ranges
- File-by-file judgment on admin-setup-android retrofit target specificity (D-30 generic vs pattern-specific)
- Exact filter-tag examples in `adb logcat` (D-24 plan-time research refinement)
- Whether `dumpsys device_policy` gets sub-section or inline code block (readability call)

## Deferred Ideas (per CONTEXT.md `<deferred>`)

- Android MAM-WE L2 runbooks → ADDTS-ANDROID-01 (v1.4.1+)
- Android AOSP L2 investigation runbooks → AEAOSPFULL-03 (v1.4.1)
- Knox Mobile Enrollment L2 runbooks → AEKNOX-03 (v1.4.1)
- Android bugreport integration → deferred until MS Support coordination patterns mature
- Android Graph API deep-dive runbook (ADDTS-ANDROID-02 equivalent) → v1.4.1+
- Android `docs/index.md` H2 section → Phase 42 AEAUDIT-02
- Android capability matrix → Phase 42 AEAUDIT-01
- `docs/common-issues.md` / `quick-ref-l1.md` / `quick-ref-l2.md` Android integration → post-v1.4 unification
- `_glossary-macos.md` Android see-also → Phase 42 AEAUDIT-03
- Runbook 19 Pattern C KME-side L2 deep-dive → AEKNOX-03 (v1.4.1)
- Additional adb commands (getprop, netstat, etc.) → deferred until compliance/enrollment research surfaces need
- Mermaid diagram in runbook 19 Pattern A-E disambiguation → Claude's plan-time discretion
- Automated CI link-check for Phase 41 placeholder-free content → post-v1.4 tooling

---

*Phase: 41-android-l2-investigation*
*Discussion gathered: 2026-04-23*
*Audit trail for software audits, compliance reviews, and decision-traceability verification.*
