# Phase 49: Linux Foundation — Taxonomy, Glossary, Version Matrix - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered and the adversarial-review evidence chain.

**Date:** 2026-04-26
**Phase:** 49-linux-foundation-taxonomy-glossary-version-matrix
**Areas discussed:** Whitelist + Out-of-Scope content scope, Version-breakpoint matrix shape, Glossary structure + collision audit, Reciprocal appends + validator depth
**Methodology:** Adversarial review (finder / adversary / referee scored pattern) per user request "for each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning"
**Tally:** Finder 608 raw → Adversary disproved ~30 (5 issues) → Referee adopted 3 of 5 disproves (~18 points removed; ~590 surviving issues across 36 of 38 retained)

---

## Gray Area 1 — Whitelist + Out-of-Scope content scope

### Sub-decision 1A — Format pattern for "Supported Management Surface" H2

| Option | Description | Selected |
|--------|-------------|----------|
| 1A.1 | Single locked H2 with bullet list of supported capabilities + a separate "Out of Scope for Linux via Intune" callout block below | |
| 1A.2 | Side-by-side comparison table (Capability \| Linux Status) with 3 statuses (Supported / Partial / Not supported) | ✓ |
| 1A.3 | Two parallel callout blocks (✅ Supported / 🚫 Not supported) under one H2 with explanatory paragraph | |

**Winner:** 1A.2 (3-status table)
**Referee reasoning:** PITFALL-2 (lines 50-52) explicitly warns against "Partial" without structural support and mandates explicit `Not supported — web-app CA only` cells; only a 3-status table provides the per-row slot for that string. Dispute 4 ruled REAL ISSUE — bullet lists (1A.1) cannot encode partial qualifiers structurally. Mirrors the PITFALL-2-mandated capability-matrix cell shape that Phase 50 LIN-13 must reuse, reducing rework.
**Rejected:** 1A.1 — fails PITFALL-2 partial-qualifier slot test; 1A.3 — emoji parallel callouts duplicate semantics across two callouts (Anti-Pattern 4 risk) and have no precedent in shipped Apple/Android glossary patterns.

### Sub-decision 1B — BYOD/corporate-owned caveat placement

| Option | Description | Selected |
|--------|-------------|----------|
| 1B.1 | As `> ⚠️ Known caveat` blockquote inside the whitelist H2 section | |
| 1B.2 | As separate H3 subsection under "Enrollment Constraints" H2 | ✓ |
| 1B.3 | As frontmatter-adjacent banner at top of doc (highest visibility) | |

**Winner:** 1B.2 (H3 under Enrollment Constraints)
**Referee reasoning:** Dispute 3 was REAL — the BYOD caveat is conceptually about the ownership/enrollment-constraint axis, not the capability whitelist. An H3 inside a dedicated "Enrollment Constraints" container preserves SC#1's "equally prominent" co-location while keeping the whitelist H2 capability-pure. Top-of-doc banner (1B.3) over-promotes a single caveat above the locked whitelist, which would dilute the PITFALL-7 framing established in Phase 34.
**Rejected:** 1B.1 — nests an enrollment-model caveat inside a capability whitelist (conceptual collision); 1B.3 — top-banner placement steals visual weight from the whitelist that PITFALL-1 says must dominate.

### Sub-decision 1C — Cross-platform mental-model bridge subsection

| Option | Description | Selected |
|--------|-------------|----------|
| 1C.1 | Include "For Admins Familiar with Android/Windows" subsection (Phase 34 D-03 precedent — explicit analog mapping with partial-mapping warning) | ✓ |
| 1C.2 | Skip the bridge — Linux is structurally too different to draw clean analogs | |
| 1C.3 | Include "Linux is NOT like X" callout listing what Linux lacks (CA / app delivery / profiles / ZTE) without trying to map analogs | |

**Winner:** 1C.1 (For Admins Familiar with... subsection)
**Referee reasoning:** Dispute 2 was FALSE POSITIVE — Phase 34 D-03 (`34-CONTEXT.md` line 28) is locked precedent for this exact pattern in a PITFALL-1-disciplined foundation doc, and it shipped at `docs/android-lifecycle/00-enrollment-overview.md` line 49 with the "mapping is partial" framing already proven. Skipping (1C.2) abandons the consistency that PITFALL-5 collision-audit work depends on; the negative-callout (1C.3) inverts a working positive pattern without precedent.
**Rejected:** 1C.2 — abandons established cross-platform-bridge precedent; 1C.3 — negative framing creates anti-pattern risk and has no shipped exemplar.

---

## Gray Area 2 — Version-breakpoint matrix shape

### Sub-decision 2A — Pivot orientation

| Option | Description | Selected |
|--------|-------------|----------|
| 2A.1 | Rows = Ubuntu version (3 rows: 20.04, 22.04, 24.04); Columns = Version \| GA Kernel \| HWE Kernel \| Support Status \| EOS Date | ✓ |
| 2A.2 | Rows = Ubuntu version × Kernel track (6 rows); Columns = Status \| Notable Breakpoints | |
| 2A.3 | Rows = Ubuntu version (3 rows); Columns = compound "GA Kernel" + "HWE Kernel" cells (per-track text within one cell) | |

**Winner:** 2A.1 (3 rows × 5 cols)
**Referee reasoning:** PITFALL-4 (lines 89-91) mandates axes: Ubuntu LTS version × kernel track (GA / HWE) × support status. SC#2 (`ROADMAP.md` line 170) names "GA vs HWE kernel track columns" plurality. A 3-row × 5-column matrix is the only orientation that gives each version a single row with explicit EOS-date column needed for the 20.04-dropped-2508 narrative.
**Rejected:** 2A.2 — explodes version+kernel into composite rows, losing the per-version anchor for cross-references; 2A.3 — collapses GA/HWE into a single cell, recreating the "Ubuntu LTS as homogeneous" anti-pattern PITFALL-4 line 96 explicitly warns against.

### Sub-decision 2B — Ubuntu 20.04 EOS treatment

| Option | Description | Selected |
|--------|-------------|----------|
| 2B.1 | Strikethrough row remains in matrix with "Dropped Intune 2508 — End-of-Support only" cell | |
| 2B.2 | Move 20.04 to a separate "End-of-Support Distros" H3 subsection below the matrix | |
| 2B.3 | Footnote-style asterisk on the matrix row + dedicated H3 subsection explaining the EOS lifecycle | ✓ |

**Winner:** 2B.3 (footnote + H3)
**Referee reasoning:** SC#2 explicitly says 20.04 is "dropped Intune 2508 August 2025, end-of-support only" — it must remain visible (admins on 20.04 hit this doc) but must not be presented as a current support row. A footnote in the matrix cell + an H3 subsection beneath gives both signals: the matrix stays clean (3 supported-only rows), and the dropped-version narrative gets a proper landing surface for admins searching "20.04."
**Rejected:** 2B.1 — strikethrough in a matrix row violates the visual semantics admins use to scan supported configurations and is screen-reader-hostile; 2B.2 — separate H3 only loses the inline cue at the matrix where admins look first.

### Sub-decision 2C — Identity Broker v2.0.2+ behavior placement

| Option | Description | Selected |
|--------|-------------|----------|
| 2C.1 | Separate "Non-version Breakpoints" H3 subsection in this matrix doc (Phase 34 D-32 precedent) | ✓ |
| 2C.2 | Standalone H2 "Agent Package Version Behaviors" — Identity Broker as headline entry | |
| 2C.3 | Defer to Phase 50 admin guide (LIN-05 scope is the Identity Broker pitfall callout) — only Ubuntu version drift in this matrix | |

**Winner:** 2C.1 (Non-version Breakpoints H3)
**Referee reasoning:** Identity Broker is genuinely a Linux-version-adjacent breakpoint (it cuts across all supported versions), and LIN-05 places it as a 1b FOLD pitfall callout in Phase 50. Including it as an H3 inside the version-matrix doc preserves the doc's "what changes admin behavior across versions" theme without inflating to a standalone H2. Deferring entirely (2C.3) breaks SC#2's intent of locking ALL breakpoints in the foundation phase.
**Rejected:** 2C.2 — standalone H2 elevates Identity Broker above peer breakpoints, distorting Phase 49 scope; 2C.3 — deferring loses the Phase 49 locking discipline and forces Phase 50 to re-author breakpoint context.

---

## Gray Area 3 — Glossary structure + collision audit

### Sub-decision 3A — Category structure

| Option | Description | Selected |
|--------|-------------|----------|
| 3A.1 | Mirror Phase 34's 5 categories adapted (Distro & Lifecycle / Agent & Service / Compliance & Encryption / Operations & Diagnostics / Cross-Platform Collisions) | ✓ |
| 3A.2 | 4 categories aligned to Linux specificity (Distro & OS / Agent & Identity / Compliance & Encryption / Cross-Platform Collisions) | |
| 3A.3 | 3 categories with cross-collision section absorbed into per-term entries (Distro & OS / Intune-on-Linux Components / Operations & Diagnostics) | |

**Winner:** 3A.1 (5 categories incl. Cross-Platform Collisions)
**Referee reasoning:** Dispute 1 was FALSE POSITIVE — macOS glossary already uses 4-5 content H2s (verified by `grep '^## '`: Enrollment / Device Management / App Distribution / App Protection (MAM) / Version History), so 5 categories is well within precedent; Phase 34 D-09 used 5 categories. PITFALL-5 (line 122) mandates a validator check for cross-glossary collisions; a dedicated "Cross-Platform Collisions" H2 gives that validator a single anchored container to assert against (4D.3 alignment). Coexists with per-term `> Cross-platform note:` blockquotes per Phase 34 D-10 (the "Collisions" H2 holds absent-concept callout-only entries, not Linux-native collision-risk terms).
**Rejected:** 3A.2 — 4 categories without a dedicated collisions H2 forces collision entries to scatter, weakening the validator's anchor; 3A.3 — per-term cross-platform notes work for established platforms but lose the PITFALL-5 audit anchor that Phase 49 needs because Linux is *new*.

### Sub-decision 3B — "Absent concept callout-only" entries

| Option | Description | Selected |
|--------|-------------|----------|
| 3B.1 | Comprehensive — 9 absent-callout entries (Supervision, DPC, Work Profile, COBO/COPE/WPCO, MGP, ZTE, VPP, Hardware Hash, ABM) | ✓ |
| 3B.2 | Targeted — 4 entries only (Supervision, DPC, Work Profile, MGP) | |
| 3B.3 | Single "Concepts NOT applicable to Linux" H2 list with one-line redirects per term | |

**Winner:** 3B.1 (9 entries)
**Referee reasoning:** SC#3 names 4 collision-risk terms (agent / compliance / enrollment / portal — these get full Linux definitions in their topical categories) but PITFALL-5 (line 114) names additional cross-platform collision risks (DPC, supervision-as-absent, work profile-as-absent, etc.). 9 entries gives full coverage of all PITFALL-5-named overloaded terms. 4 entries (3B.2) under-covers PITFALL-5 explicitly.
**Rejected:** 3B.2 — under-covers PITFALL-5 named risks; 3B.3 — single H2 list collapses category structure that 3A.1 / D-09 established and loses per-term anchor stability.

### Sub-decision 3C — Linux-native term scope

| Option | Description | Selected |
|--------|-------------|----------|
| 3C.1 | Comprehensive (~20 terms): dm-crypt, LUKS, HWE kernel, GA kernel, GNOME, deb, APT repository, packages.microsoft.com, intune-portal, intune-agent.timer, microsoft-identity-broker, journalctl, systemd, dpkg, /var/log paths, Identity Broker, Compliance Settings (4 categories), Web-app CA, MS Edge for Linux | ✓ |
| 3C.2 | Lean (~12 terms): dm-crypt+LUKS combined, HWE kernel, GNOME desktop, deb repository, intune-portal, intune-agent.timer, journalctl, systemd, packages.microsoft.com, Identity Broker v2.0.2+, Web-app CA, Settings Catalog | |
| 3C.3 | LIN-02 minimum (~9 terms): dm-crypt, LUKS, HWE kernel, GNOME desktop, deb repository, systemd service, intune-portal package, intune-agent.timer, journalctl | |

**Winner:** 3C.1 (~20 terms)
**Referee reasoning:** LIN-02 enumerates 9 minimum but Phase 50/51/52 (LIN-04, LIN-09, LIN-12) reference additional terms (settings catalog categories, dm-crypt+LUKS as compound, custom compliance scripts, dpkg, journalctl variants). ~20 covers downstream-phase reference needs without padding; ~12 (3C.2) just barely covers LIN-02 leaving Phase 50+ to amend. Phase 34 Android shipped ~25 entries and downstream phases consumed all of them — same shape recommended here.
**Rejected:** 3C.2 — combines dm-crypt+LUKS into one entry (literal LIN-02 wording violation); under-covers downstream phases; 3C.3 — bare LIN-02 minimum guarantees Phase 50+ amendment churn; omits PITFALL-3 (`packages.microsoft.com`) and PITFALL-2 (Web-app CA) anchor entries.

---

## Gray Area 4 — Reciprocal appends + validator depth

### Sub-decision 4A — SC#4 "all 4 existing platform glossaries" treatment

| Option | Description | Selected |
|--------|-------------|----------|
| 4A.1 | 3 glossaries (Windows/Android/Apple) — explicitly note in VERIFICATION.md that no separate `_glossary-ios.md` exists; SC#4 wording correction proposed at commit time | ✓ |
| 4A.2 | 3 glossaries + add a NEW thin `_glossary-ios.md` stub that redirects to `_glossary-macos.md` Apple glossary | |
| 4A.3 | 3 glossaries; in `_glossary-macos.md` add TWO reciprocal entries (one labeled iOS-section, one macOS-section) | |

**Winner:** 4A.1 (3 glossaries + SC correction)
**Referee reasoning:** SC#4 hedges "if it exists as a separate file" — and verification shows `_glossary-macos.md` is the unified Apple glossary (covers macOS AND iOS per the line 12 platform-coverage blockquote). There is no separate `_glossary-ios.md`; creating one (4A.2) violates the SC's own conditional and would require splitting the Apple glossary, a massive Phase 49 scope creep. The right move is to correct the SC count from 4 to 3 and add reciprocal entries to `_glossary.md`, `_glossary-macos.md`, and `_glossary-android.md`.
**Rejected:** 4A.2 — out-of-scope file creation contradicting Apple-glossary unification; 4A.3 — two reciprocal entries in one Apple glossary doesn't address Windows + Android separately and inflates append surface.

### Sub-decision 4B — Append location format

| Option | Description | Selected |
|--------|-------------|----------|
| 4B.1 | Single append to top platform-coverage blockquote in each glossary (mirror `_glossary-android.md` line 12 pattern) | ✓ |
| 4B.2 | Append to alphabetical index AND a separate "Cross-Platform Reference" entry under each existing collision term | |
| 4B.3 | Append a single new "## Linux Cross-References" H2 at the bottom of each glossary | |

**Winner:** 4B.1 (top platform-coverage blockquote)
**Referee reasoning:** All 3 existing glossaries already use a top platform-coverage blockquote (verified: `_glossary-macos.md` line 12, `_glossary-android.md` line 12, `_glossary.md` analogous) listing peer glossaries. Append-only contract per SC#4 ("one-line appends") is satisfied by adding a single sentence to the existing blockquote. Per-term entries (4B.2) violates append-only contract by touching every term; bottom H2 (4B.3) creates a new structural element where a one-line append suffices.
**Rejected:** 4B.2 — violates append-only contract by editing many entries; multi-site pin-coord hazard; 4B.3 — over-engineered for a one-line cross-reference; bottom-of-file reduces discoverability.

### Sub-decision 4C — Atomicity

| Option | Description | Selected |
|--------|-------------|----------|
| 4C.1 | ONE atomic commit (rescue-style per Phase 43 D-07): linux glossary + 3 appends + pin-coord refresh + lifecycle docs | |
| 4C.2 | TWO commits: (1) linux glossary + lifecycle docs + validator + ROADMAP/REQUIREMENTS edits; (2) 3 reciprocal appends + pin-coord refresh | ✓ |
| 4C.3 | THREE commits: (1) linux glossary + lifecycle docs; (2) 3 reciprocal appends; (3) pin-coord refresh + sidecar update | |

**Winner:** 4C.2 (TWO commits)
**Referee reasoning:** Phase 49 cleanly divides into two atomic units: (1) Linux foundation creation (00-enrollment-overview.md whitelist + 01-prerequisites.md matrix + _glossary-linux.md + check-phase-49.mjs + ROADMAP/REQUIREMENTS edits) and (2) Reciprocal cross-glossary appends (3 existing glossaries + pin-coord refresh in the same commit). Splitting these into two commits keeps each commit bisect-clean and isolates the append-only contract change from new-file authoring. ONE atomic commit (4C.1) bundles risk; THREE commits (4C.3) violates Phase 48 D-14 atomicity-contract — commit-2 lands while sidecar pin coordinates are stale → `--self-test` would FAIL post-Commit-2-pre-Commit-3.
**Rejected:** 4C.1 — too coarse; bundles append-only edits with new-file creation; 4C.3 — over-fragments and breaks Phase 48 D-14 same-commit-pin-refresh contract.

### Sub-decision 4D — `check-phase-49.mjs` validator depth

| Option | Description | Selected |
|--------|-------------|----------|
| 4D.1 | Frontmatter-only (validator just asserts files exist + frontmatter; C10 already covers `platform: Linux` + 60-day cycle) | |
| 4D.2 | Structural assertions: whitelist H2 + Out of Scope callout + ⚠️ Known caveat block + matrix shape + index/version-history sections + see-also strings | |
| 4D.3 | Structural assertions PLUS PITFALL-5 collision-audit verification (every term in `_glossary-linux.md` either does NOT collide OR carries a Cross-platform note blockquote) | ✓ |

**Winner:** 4D.3 (structural + PITFALL-5 collision audit)
**Referee reasoning:** PITFALL-5 line 122 explicitly mandates: "Add a validator check in the Linux phase validator (`check-phase-NN.mjs`) that ensures no term in `_glossary-linux.md` appears in another platform glossary without a cross-reference." This is a hard PREREQ baked into the pitfall's "How to avoid." 4D.1 (frontmatter-only) and 4D.2 (structural) both miss the explicitly-mandated collision check. The PITFALL-5 audit IS the validator's reason for existing in Phase 49.
**Rejected:** 4D.1 — frontmatter-only ignores PITFALL-5 mandate and SC#3 collision-audit verification; 4D.2 — structural assertions only catch shape, not collision-without-cross-reference (the actual risk).

---

## Adversarial-Review Disprove Adjudication (5 disputes)

The Adversary disproved 5 of the Finder's issues. The Referee adjudicated each based on independent file verification:

### Dispute 1: 3A.1 [MED] "macOS glossary uses 2 categories"
**Verdict:** FALSE POSITIVE (Adversary right) → Disprove ADOPTED
**Evidence:** `D:\claude\Autopilot\docs\_glossary-macos.md` H2 grep returns 6 H2s — Alphabetical Index (line 14), Enrollment (20), Device Management (54), App Distribution (82), App Protection (MAM) (99), Version History (111). That is 4 substantive categories + index + version history, not 2.
**Reasoning:** The Finder's claim is factually wrong; macOS glossary uses 4-5 content categories, so the 5-category 3A.1 proposal is well within precedent.

### Dispute 2: 1C.1 [CRIT] "Cross-platform analog subsections = PITFALL-1 violation by construction"
**Verdict:** FALSE POSITIVE (Adversary right) → Disprove ADOPTED
**Evidence:** `34-CONTEXT.md` D-03 (line 28) explicitly locks the "For Admins Familiar with iOS" subsection pattern with the partial-mapping warning, and `docs/android-lifecycle/00-enrollment-overview.md` line 49 implements it. The Android foundation (whitelist-disciplined) ships exactly this structure.
**Reasoning:** A locked, shipped Phase 34 precedent for the same pattern with explicit "mapping is partial" framing destroys the "violation by construction" claim — the pattern coexists with PITFALL-1 discipline.

### Dispute 3: 1B.1 [MED] "BYOD caveat conceptually NOT about Supported Management Surface"
**Verdict:** REAL ISSUE (Adversary wrong) → Disprove REJECTED
**Evidence:** `REQUIREMENTS.md` line 24 (LIN-01) bundles "supported feature surface (web-app CA only…) **and** a `> ⚠️ Known caveat` block surfacing the Microsoft Learn BYOD-vs-corporate-owned framing inconsistency." `ROADMAP.md` SC#1 line 169 places the caveat in the same SC as the whitelist H2, but as a separate prominent block — not nested inside the whitelist.
**Reasoning:** SC#1 reads as three coordinated artifacts ("equally prominent…callout block — and the BYOD/corporate-owned…caveat surfaced as a `> ⚠️ Known caveat` block"); placing the caveat as a blockquote *inside* the whitelist H2 (1B.1) conflates ownership-model framing with capability whitelist scope. Bundling at the requirement level does not mean nesting inside the whitelist H2.
**Effect:** Drove D-04 H3 placement under separate "Enrollment Constraints" H2 (1B.2 winner), not nesting inside whitelist H2 (1B.1).

### Dispute 4: 1A.1 [MED] "Bullet list does not natively encode 'Partial' qualifiers"
**Verdict:** REAL ISSUE (Adversary wrong) → Disprove REJECTED
**Evidence:** PITFALL-2 (lines 41-48) mandates a specific architectural callout block + an explicit capability matrix cell saying `Not supported — web-app CA only`; warning sign at line 52 specifically calls out "matrix CA row is blank or simply says 'Partial'." Bullet+callout (1A.1) loses the structural slot for status qualifiers.
**Reasoning:** PITFALL-2 risk is *not* symmetric — a 3-status table cell forces an explicit status string per capability ("Supported / Partial / Not supported"), whereas a flat bullet list under "Supported" cannot represent partial-with-asterisk states without breaking its own H2 invariant. The Adversary conflated phrasing risk with structural-slot risk.
**Effect:** Drove D-01 3-status table over 1A.1 bullet list.

### Dispute 5: 3C.2 [MED] "LIN-02 mentions GA kernel"
**Verdict:** FALSE POSITIVE (Adversary right) → Disprove ADOPTED
**Evidence:** `REQUIREMENTS.md` line 25 (LIN-02) lists exactly: "dm-crypt, LUKS, HWE kernel, GNOME desktop, deb repository, systemd service, `intune-portal` package, `intune-agent.timer`, `journalctl`" — GA kernel is NOT in the LIN-02 enumeration (only HWE).
**Reasoning:** The Finder's literal claim is wrong; PITFALL-4 mentions GA/HWE distinction at the version-matrix axis level (per SC#2), not the glossary-term level. Severity overstated and not a literal LIN-02 violation. (D-16 still adds GA kernel as a glossary entry for downstream PITFALL-4 understanding — not because LIN-02 mandates it.)

**Adopted disproves: 3 of 5** (Disputes 1, 2, 5). Disputes 3 and 4 stand as REAL ISSUES driving D-04 + D-01 winners respectively.

---

## Cross-decision integration callouts (Referee Part C)

- **Coupling alert 1 (D-01 × D-21):** A 3-status table (Supported / Partial / Not supported) becomes a structural assertion target for the validator. The validator MUST check that the Linux capability table has exactly the 3 status strings as a closed set (no "N/A," no blank, no "TBD") — this is the PITFALL-2 line 52 warning sign rendered as code. Document the canonical 3-string set in `check-phase-49.mjs` constants. Captured as D-02 + CDI-01.

- **Coupling alert 2 (D-11 × D-21):** The validator's collision-audit check must hardcode the H2 string `## Cross-Platform Collisions` (or accept it as a constant). If 3A.1's H2 wording drifts during authoring, the validator silently passes empty. Pin the H2 wording in both `_glossary-linux.md` template AND validator constants in the same commit (4C.2 commit-1). Captured as D-25 + CDI-02.

- **Coupling alert 3 (4A.1 × ROADMAP SC#4):** Winning 4A.1 requires a ROADMAP edit changing "All 4 existing platform glossaries" → "All 3 existing platform glossaries." This SC correction belongs in commit-1 of 4C.2 (foundation), not commit-2 (reciprocal appends), because the validator depends on the corrected count. Captured as D-18 + CDI-03.

## Downstream phase obligations (Referee Part C — for next-phase plan authors)

- **DPO-01 (Phase 50 LIN-05):** Identity Broker pitfall callout in `01-intune-linux-agent.md` MUST back-link to the Phase 49 `01-linux-prerequisites.md` Non-version Breakpoints H3 anchor (per D-09).
- **DPO-02 (Phase 50 LIN-13):** `linux-capability-matrix.md` inherits the 3-status canonical set (`Supported` / `Partial` / `Not supported`) per D-01 + CDI-01. No Phase 50 freedom to introduce a 4th status string.
- **DPO-03 (Phase 50 admin-setup-linux/00-overview.md):** MUST NOT duplicate the cross-platform bridge subsection from Phase 49 `00-enrollment-overview.md`. Phase 50 overview back-links to the Phase 49 anchor instead. Anti-Pattern 1 duplication guard per Phase 34 D-26.
- **DPO-04 (Phase 51-52 runbooks):** Reference the ~20 Linux-native glossary terms (per D-14) by anchor. Additional terms not in the Phase 49 ~20-term set are appended per the append-only contract — Phase 49 does NOT reserve term-coverage exclusivity.
- **DPO-05 (Phase 59 CLEAN-08):** Glossary normalization builds on Phase 49 reciprocal appends. Phase 59 owns the 5-platform reciprocal cross-reference normalization across Windows + macOS + iOS + Android + Linux glossaries; Phase 49 establishes the Linux side of the reciprocity.

---

## Claude's Discretion (CD-01 through CD-07 in CONTEXT.md)

- CD-01: Exact wording of the cross-platform bridge subsection within partial-mapping discipline of D-06
- CD-02: Optional Mermaid ownership × management-scope diagram (Phase 34 D-22 precedent)
- CD-03: Word target for `00-enrollment-overview.md` (~600-1000 estimated; Phase 34 D-07 used 800-1200)
- CD-04: Exact category names within the 5-category D-11 structure
- CD-05: Footnote rendering syntax for D-08 (GFM `[^1]` vs inline parenthetical)
- CD-06: Order of glossary entries within categories (alphabetical recommended)
- CD-07: Validator multi-line blockquote handling for D-23 collision-audit

---

## Deferred Ideas (captured in CONTEXT.md `<deferred>` section)

- Separate `_glossary-ios.md` file (4A.2 rejected; v1.6+ architecture decision if ever)
- `c5_collision_allowlist[]` sidecar array pre-creation (D-23 lazy YAGNI per Phase 48 D-15)
- PITFALL-5 collision-audit graduation/generalization to v1.5 harness check (Phase 60 consideration)
- Mermaid diagram (CD-02 author discretion)
- Pre-commit advisory hook glob extension to Linux pinned files (Phase 49 commit-2 or defer to Phase 50+)
- Linux Bash custom-compliance deep-dive guide (LIN-DEFER-01 — REQUIREMENTS.md line 95, v1.5.1)
- RHEL 9/10 Intune Linux client docs (RHEL-01 — REQUIREMENTS.md line 96, v1.6+)
- `/var/log/microsoft/intune/` file-based log path (LIN-12 Phase 52 scope with freshness caveat)
