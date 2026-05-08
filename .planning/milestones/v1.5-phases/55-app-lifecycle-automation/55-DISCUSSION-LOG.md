# Phase 55: App Lifecycle Automation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered and adversarial-review adjudication trail.

**Date:** 2026-04-28
**Phase:** 55-app-lifecycle-automation
**Areas discussed:** Win32 file architecture, 00-overview cross-platform comparison axes, iOS VPP comparison shape, Android MGP + Zebra OEMConfig framing
**Methodology:** Adversarial review per user direction ("for each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning") — Finder / Adversary / Referee scored pattern, 3 sequential waves, 12 parallel agents total (4 per wave).

---

## Gray Area Selection

User selected ALL 4 gray areas via AskUserQuestion multiSelect, plus added direction to use /adversarial-review for per-area winner selection with reasoning.

| Option | Selected | User notes |
|--------|----------|------------|
| Win32 file architecture | ✓ | (per user multi-select) |
| Cross-platform comparison axes | ✓ | (per user multi-select) |
| iOS VPP comparison shape | ✓ | (per user multi-select) |
| Android MGP + Zebra OEMConfig | ✓ | "for each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning" |

---

## Gray Area 1: Win32 file H2 architecture (APP-01/02/03 fold inside `01-windows-win32-msix-scale.md`)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Three top-level H2s in document order (`## Supersedence` → `## Dependency Graphs` → `## ContentPrepTool Packaging`); MSIX = brief routing sub-section under packaging | ✓ (Adversarial-Review winner) |
| 1B | Combined `## Lifecycle automation` mega-H2 with sub-H3s (Supersedence / Dependency / Packaging); MSIX as sibling substantive H2 | |
| 1C | Combined `## App Versioning` H2 (supersedence + dependency together) + `## Packaging Pipeline` H2 (ContentPrepTool); MSIX = scope-disclaimer note in 00-overview only | |
| 1D | ContentPrepTool foundation H2 first → combined supersedence+dependency versioning H2 → dedicated MSIX H2 sub-section | |

**User's choice:** 1A via adversarial-review adjudication. Surviving-defect arithmetic: 1A=4 / 1B=37 / 1C=31 / 1D=38. Decisive factor: REQ APP-02 + SC#2 verbatim "discrete H2 alongside" — only 1A literally satisfies both "discrete H2" (rules out 1B's H3 demotion) and "alongside" (rules out 1C/1D combining).

**Adversarial-review highlights:**
- Finder enumerated 30 defects (135 points). Adversary disproved 8 (32 points). Referee adopted 8 disproves.
- Adversary's load-bearing disproves: F-1B-04 / F-1C-04 (claimed Phase 54 sibling has 4 H2s — actual count 7); F-1A-06 (chain depth 10 ≠ count 100; orthogonal dimensions); F-1D-03 / F-1D-04 (no REQ wording mandates H2 ordering).
- Referee escalated PITFALL-10 callout placement to LOW from MED (real but minor authoring-contract gap).

---

## Gray Area 2: 00-overview.md cross-platform comparison axes + cross-cutting concept H2

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Comparison table only (5 rows × 4 platforms); no separate concept H2 | |
| 2B | Comparison table + `## App-lifecycle terminology` H2 (defines supersedence/dependency/replace/update/sideload across platforms — Phase 54 PITFALL-9 ring-disambiguation analog) | ✓ (Adversarial-Review winner) |
| 2C | Comparison table + `## Required vs Available assignment semantics` H2 (cross-platform Required-assignment behavior delta — surfaces PITFALL-10 boundary at hub level) | |
| 2D | Expanded 7-row comparison table (adds detection method + OEM-specific exception rows) + `## Packaging vs Distribution vs Lifecycle` concept H2 | |

**User's choice:** 2B via adversarial-review adjudication. Surviving-defect arithmetic: 2A=25 / 2B=10 / 2C=35 / 2D=25. Decisive factor: F-2B-02 "5 platform glossaries already define" CRIT was **factually false** — file-system verification confirms only 4 glossaries exist (no `_glossary-ios.md`; iOS folded into macOS per LIN-02), and none define supersedence/dependency/sideload as glossary terms.

**Adversarial-review highlights:**
- Finder enumerated 27 defects (155 points). Adversary disproved 13 (69 points). Referee adopted 13 disproves.
- Adversary's load-bearing disproves: F-2B-02 (file-verified factually false); F-2D-01 (280-340 lines projected is WITHIN 200-350 cap, not breach); F-2B-01 (Phase 54 deferral-vs-enforcement IS terminology-shaped + prescriptive — refutes Wikipedia-ism claim).
- Referee SUSTAINED F-2C-01/02/03 CRIT triple (PITFALL-10 mis-attribution + no cross-platform Required-vs-Available analog + SC#1 callout location collision); F-2D-02/03 CRIT pair (detection-method + OEM-specific row imports per-platform substantive content into 00-overview).
- Surviving 2B defects (F-2B-03 + F-2B-04 MED) drove D-02 anti-scope-creep guidance: cross-platform terminology must use cross-platform-only concept tokens (forbidden anchor topics: "supersedence" Win32-only / "Replace vs Update" Win32-only / "sideload" Android-only / "reclamation" iOS-only).

---

## Gray Area 3: iOS VPP device-vs-user licensing comparison shape (APP-06 inside `03-ios-vpp-licensing.md`)

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | 2-column comparison table only (rows: license source / Apple ID requirement / supervised silent install / reclamation on retire-wipe / reclamation on remove-app / BYOD applicability) | ✓ (Adversarial-Review winner) |
| 3B | Comparison table + decision-flow Mermaid (when each model applies based on enrollment mode × supervision) | |
| 3C | Decision matrix only (BYOD/Corporate × Supervised/Unsupervised → recommended licensing model + license-reclamation cell); no separate comparison table | |
| 3D | Inline contrast prose with bullet differentiation; no table, no diagram; mostly narrative | |

**User's choice:** 3A via adversarial-review adjudication. Surviving-defect arithmetic: 3A=17 / 3B=27 / 3C=36 / 3D=36. Decisive factor: license reclamation is **verified net-new** in Phase 55 (no "reclaim/reclamation" anywhere in v1.3 admin-setup-ios) — 3A's 2-column attribute table with reclamation rows discharges both SC#4 conjuncts (distinguish AND reclamation) cleanly while preserving Phase 54 iOS-sibling zero-Mermaid pattern parity.

**Adversarial-review highlights:**
- Finder enumerated 22 defects (126 points). Adversary disproved 2 partial (2 points). Referee adopted 2 partial disproves + downgraded 2 severities.
- Adversary's load-bearing disproves: F-3A-01 (Finder said v1.3 table is "13 attributes × 2 columns" — actual is 12 × 4); F-3D-03 (Finder said line 22 is device-vs-user — actual is managed/unmanaged; device-vs-user is lines 24-28).
- Referee SUSTAINED F-3B-01 CRIT (zero Mermaid in Phase 54 iOS sibling — pattern parity break for 3B); F-3C-01/02 CRIT pair (paragraph-blob cells + distinguish-conjunct buried at cell-text level for 3C); F-3D-01/02 CRIT pair (scan-time distinguish failure + multiline-regex prose pin violates Phase 54 LOCKED line-anchored pattern for 3D).
- Open question resolved by referee: Mermaid forbidden in 03-ios-vpp-licensing.md (D-09); Mermaid permitted at plan-author discretion in 00-overview + 01-windows + 02-macos + 04-android.

---

## Gray Area 4: Android MGP + Zebra OEMConfig file architecture (APP-07 + APP-08 fold inside `04-android-mgp-lifecycle.md`)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | `## MGP private-app publishing` H2 + dedicated `## Zebra OEMConfig (NOT via MGP)` H2 with mutual-exclusion blockquote at top of file | |
| 4B | Single `## App lifecycle architecture` H2 with sub-H3s (`### MGP path` + `### Zebra OEMConfig APK side-load path`) | |
| 4C | Sequenced: scope-disambiguation H2 first → `## MGP private-app publishing` H2 → `## Zebra OEMConfig APK side-load` H2 (could include verbose filename like `04-android-mgp-and-oemconfig-lifecycle.md`) | |
| 4D | Primary `## MGP private-app publishing` H2 + minimal `## Zebra OEMConfig` H2 stub (substantive content stays in v1.4.1 admin guide) | |
| **4C-prime** (hybrid) | **Filename `04-android-mgp-lifecycle.md` retained verbatim + peer H2s (MGP substantive + Zebra OEMConfig with operational-summary + 3-bullet operate list + cross-link to Phase 45 admin guide). Mirrors Phase 54 sibling lines 134/184 pattern.** | ✓ (Adversarial-Review hybrid winner) |

**User's choice:** 4C-prime hybrid via adversarial-review adjudication + referee hybrid recommendation. Surviving-defect arithmetic: 4A=12 / 4B=25 / 4C=8 / 4D=11. Decisive factor: 4D-pure-stub fails SC#5 "operate" verb (HIGH-escalated F-4D-01); 4A-substantive-Zebra duplicates Phase 45 admin guide 24,518 bytes (HIGH-escalated F-4A-02 SSoT violation); 4B sub-H3 demotion fails Phase 54 sibling peer-H2 precedent (CRIT F-4B-01); 4C-pure has verbose filename. 4C-prime hybrid combines 4D's SSoT preservation with 4C's peer-H2 conjunction discharge plus filename-convention parity.

**Adversarial-review highlights:**
- Finder enumerated 16 defects (57 points). Adversary disproved 2 (6 points). Referee adopted 2 disproves + escalated 2 severities (F-4A-02 MED→HIGH; F-4D-01 MED→HIGH).
- Adversary's load-bearing facts (file-system-verified): `10-aosp-zebra.md` exists at 24,518 bytes with line 56 "NOT Managed Google Play" disclaimer verbatim; Phase 54 sibling `04-android-patch-delivery.md` peer H2s at lines 134 (Zebra LifeGuard) + 162 (Samsung KSP) — establishes peer-H2 precedent; line 184 cross-link to Phase 45 Knox guide — establishes peer-H2-plus-cross-link template.
- Referee escalated F-4D-01 to HIGH because SC#5 verb "operate" demands operability; pure cross-link stub fails.
- Referee proposed 4C-prime hybrid as final disposition: "satisfies SC#5 'operate' verb without duplicating Phase 45's 24,518-byte OEMConfig surface, mirrors Phase 54 sibling's peer-H2 + cross-link shape (lines 134 + 184), and preserves Phase 45 SSoT."

---

## Adversarial-Review Score Summary

| Gray Area | Total Finder Points | Adversary Earned | Referee-Adjusted Surviving Points | Winner |
|-----------|---------------------|------------------|------------------------------------|--------|
| GA-1 Win32 architecture | 135 (1A=23, 1B=37, 1C=33, 1D=42) | +32 (8 disproves) | 1A=4 / 1B=37 / 1C=31 / 1D=38 | **1A** |
| GA-2 00-overview shape | 155 (2A=31, 2B=36, 2C=41, 2D=47) | +69 (13 disproves) | 2A=25 / 2B=10 / 2C=35 / 2D=25 | **2B** |
| GA-3 iOS VPP shape | 126 (3A=22, 3B=27, 3C=36, 3D=41) | +2 (2 partial disproves) | 3A=17 / 3B=27 / 3C=36 / 3D=36 | **3A** |
| GA-4 Android MGP+Zebra | 57 (4A=12, 4B=25, 4C=12, 4D=8) | +6 (2 disproves) | 4A=12 / 4B=25 / 4C=8 / 4D=11 | **4C-prime hybrid** |

**Per-area winners drove CONTEXT.md decisions:**
- D-01..03 (00-overview shape) ← GA-2 winner 2B
- D-04..06 (Win32 file architecture) ← GA-1 winner 1A
- D-07..09 (iOS VPP shape + Mermaid forbidden) ← GA-3 winner 3A
- D-10..12 (Android MGP + Zebra) ← GA-4 winner 4C-prime hybrid
- D-13..14 (cross-platform routing) ← Phase 54 D-04 inheritance (already locked)
- D-15..16 (no hard-deadlines + Installomator confidence callout) ← deduced from REQ traceability + APP-05 verbatim
- D-17..21 (validator + atomicity) ← Phase 54 D-17/18/20/21 inheritance
- D-22 (plan decomposition) ← deduced from no-retrofit obligations (7 plans vs Phase 54's 9)

## Claude's Discretion

CD-01..11 — see CONTEXT.md decisions section for full enumeration. Plan-author discretion preserved on:
- Frontmatter `platform:` value for 00-overview (cross-platform vs comma-string)
- Per-platform sub-bullet wording in `> **Platform applicability:**` blockquote
- Comparison table column count + 6th-row addition
- Mermaid use in 00-overview / Win32 / macOS / Android files (forbidden ONLY in iOS VPP file per D-09)
- Cross-platform terminology concept H2 framing (lifecycle states vs assignment intents vs packaging-vs-distribution-vs-lifecycle layered concepts)
- Installomator/Intuneomator callout exact wording (token form locked per D-16; phrasing flexible)
- iOS VPP comparison table row labels (e.g., "Reclamation grace period" vs "Reclamation latency")
- Android Zebra operate-the-lifecycle 3-bullet exact text (update / revoke / troubleshoot tokens locked; phrasing flexible)
- 00-overview audience field (admin vs admin,L2)
- AMAPI 2024 framing exact phrasing (year + token literals locked; sentence wording flexible)

## Deferred Ideas

- **MSIX substantive content** — Phase 55 ships routing-only sub-section; substantive MSIX lifecycle is out-of-scope (STACK.md:234 verbatim "MSIX apps do NOT support supersedence")
- **Linux app-lifecycle coverage** — locked out by Phase 49 PITFALL-1 whitelist (script-based only)
- **Substantive OEMConfig content in Phase 55 file** — Phase 45 admin guide remains SSoT (10-aosp-zebra.md 24,518 bytes); Phase 55 ships operational summary + cross-link only
- **Win32ContentPrepTool version-pin verification at plan-time** — SUMMARY.md cites v1.8.7; plan author for 55-02 verifies current GA at execution time
- **AMAPI 2024 substantive lifecycle content** — Phase 55 ships AMAPI as soft historical context inline; substantive AMAPI lifecycle is out-of-scope

## Cross-Reference

Full decision rationale + cross-decision integration callouts (CDI-Phase55-01..08) + downstream phase obligations (DPO-Phase55-01..06): see `55-CONTEXT.md`.
