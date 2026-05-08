# Phase 49: Linux Foundation — Taxonomy, Glossary, Version Matrix - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning
**Methodology:** Adversarial review (finder / adversary / referee scored pattern) ran on 13 sub-decisions across 4 gray areas. Finder 608 raw → Adversary disproved ~30 across 5 issues → Referee adopted 3 of 5 (~18 points removed; ~590 points retained across 36 surviving issues). All 13 sub-decisions resolved with explicit winners + integration callouts + downstream-phase obligations.

<domain>
## Phase Boundary

Phase 49 is the FOUNDATION GATE that locks the Linux management surface BEFORE any Linux admin guides (Phase 50), L1 runbooks (Phase 51), or L2 runbooks (Phase 52) are authored. Mirrors Phase 34 Android foundation precedent. PITFALL-7 whitelist-first pattern is a hard PREREQ — no downstream Linux content phase begins until Phase 49 VERIFICATION.md documents whitelist content + matrix rows + collision audit results.

Five deliverables (2 requirements: LIN-01, LIN-02; 5 success criteria from ROADMAP §Phase 49 lines 168-173):

1. `docs/linux-lifecycle/00-enrollment-overview.md` — locked "Supported Management Surface" H2 + equally prominent "Out of Scope for Linux via Intune" callout + BYOD/corporate-owned `> ⚠️ Known caveat` block surfacing the Microsoft Learn enrollment-framing inconsistency (1c FOLD per LIN-01)
2. `docs/linux-lifecycle/01-linux-prerequisites.md` — Ubuntu version-breakpoint matrix (20.04 dropped Intune 2508 / 22.04 LTS / 24.04 LTS) × GA vs HWE kernel track columns
3. `docs/_glossary-linux.md` — Linux-specific terms + cross-collision audit covering all PITFALL-5 named at-risk terms (agent, compliance, enrollment, portal) plus structural collision-risk terms (Supervision, DPC, Work Profile, MGP, COBO/COPE/WPCO, ZTE, VPP, Hardware Hash, ABM)
4. Reciprocal Linux see-also appends in 3 existing glossaries: `docs/_glossary.md` (Windows Autopilot), `docs/_glossary-android.md` (Android Enterprise), `docs/_glossary-macos.md` (Apple — covers both macOS and iOS; no separate `_glossary-ios.md` exists per SC#4 hedge "if it exists as a separate file")
5. `scripts/validation/check-phase-49.mjs` — frontmatter validation + structural assertions + PITFALL-5 collision-audit verification per the validator-as-deliverable contract (AUDIT-06 / Phase 48 D-18) and the explicit PITFALL-5 line 122 mandate

Phase 50–52 (Linux content) and Phase 59 (CLEAN-08 glossary normalization) consume these as locked references. Breaking a contract here causes rework across at least 4 downstream phases.

</domain>

<decisions>
## Implementation Decisions

### Whitelist + Out-of-Scope content scope (Gray Area 1)

- **D-01:** **Whitelist H2 framing = 3-status capability TABLE** (Capability | Linux Status) with exactly 3 status strings: `Supported` / `Partial` / `Not supported`. Cells use locked phrasing; for Linux CA the cell reads `Not supported — web-app CA only` per PITFALL-2 line 48 mandate. Reject 1A.1 (bullet list) — Adversary tried to disprove the "bullets can't structurally encode partial qualifiers" issue but Referee ruled REAL ISSUE: PITFALL-2 risk is asymmetric (bullets force inline parentheticals; tables provide a structural slot). Reject 1A.3 (emoji parallel callouts) — no precedent in shipped Apple/Android glossaries; emoji renders inconsistently across viewers; weakens SC#1 "equally prominent" peer-H2 contract by collapsing both blocks into one H2.
- **D-02:** **3-status string set is closed and validator-enforced.** Validator (D-26) asserts the table contains exactly the 3 canonical strings — no `N/A`, no blank cells, no `TBD`, no `Partial — ...` qualifiers without the locked cell phrasing. PITFALL-2 line 52 explicitly warns "matrix CA row is blank or simply says 'Partial'" as a warning sign — closing the string set in code prevents drift. The 3-status set becomes a CONTRACT for `linux-capability-matrix.md` (LIN-13 Phase 50) per cross-decision integration coupling alert.
- **D-03:** **"Out of Scope for Linux via Intune" callout is a peer H2 to the whitelist**, not nested. SC#1 (ROADMAP line 169) requires "equally prominent" callout; nesting both inside one H2 weakens prominence parity. Both H2s appear immediately under the document's `> **Platform gate:**` blockquote header (Phase 34 D-08 mirror precedent of `00-enrollment-overview.md` line 11).
- **D-04:** **BYOD/corporate-owned caveat = H3 subsection under a dedicated "Enrollment Constraints" H2**, NOT a blockquote inside the whitelist H2 (1B.1 rejected) and NOT a top-of-doc banner (1B.3 rejected). Referee retained the [MED] issue that the caveat is conceptually about ownership-model framing, not capability-whitelist scope (Dispute 3 = REAL ISSUE). H3 placement preserves SC#1 "equally prominent" co-location while keeping the whitelist H2 capability-pure. The caveat itself uses the LIN-01-mandated `> ⚠️ Known caveat` blockquote shape inside the H3 container.
- **D-05:** **Cross-platform mental-model bridge = "For Admins Familiar with Windows / macOS / Android" subsection** (1C.1 winner). Mirrors Phase 34 D-03 LOCKED precedent at `34-CONTEXT.md` line 28 + shipped `docs/android-lifecycle/00-enrollment-overview.md` line 49. Adversarial review Dispute 2 was FALSE POSITIVE — PITFALL-1 prohibits feature-by-feature parity writing, not bridge subsections that explicitly carry "the mapping is partial" framing. Bridge subsection includes the partial-mapping warning template per Phase 34 D-03 wording.
- **D-06:** **Bridge subsection scoping discipline:** Each cross-platform analog is qualified with explicit "the mapping is partial" framing AND a deflection to the whitelist for what Linux actually supports. Forbidden patterns: "Linux CA is similar to iOS CA" (PITFALL-2 bait); "Linux app delivery works like Win32" (PITFALL-1 framing). Required pattern: "[Concept] on Linux behaves like [closest platform analog] in [narrow respect], but [specific divergence]; see Supported Management Surface for the canonical Linux scope." Phase 50 admin-setup-linux/00-overview.md MUST NOT duplicate this bridge — it back-links to the Phase 49 anchor (downstream obligation per Phase 50 plan dependency).

### Version-breakpoint matrix shape (Gray Area 2)

- **D-07:** **Pivot orientation = 3 rows × 5 columns**: rows per Ubuntu LTS version (20.04, 22.04, 24.04); columns = `Version | GA Kernel | HWE Kernel | Support Status | EOS Date`. PITFALL-4 (lines 89-91) mandates axes Ubuntu version × kernel track × support status; SC#2 (ROADMAP line 170) names "GA vs HWE kernel track columns" plurality. Reject 2A.2 (6-row Version × Kernel grid) — Anti-Pattern 1 row-duplication; weakens per-version anchor for downstream filtered-row cross-references. Reject 2A.3 (compound cells) — collapses GA/HWE into one cell, recreating the "Ubuntu LTS as homogeneous" anti-pattern PITFALL-4 line 96 explicitly warns against; weakens anchor stability per Phase 34 CONTEXT lines 148-150.
- **D-08:** **Ubuntu 20.04 EOS treatment = footnote-marked row in matrix + dedicated H3 subsection "Ubuntu 20.04 — End-of-Support" below the matrix.** Matrix cell carries a footnote marker (`Dropped Intune 2508 [^1]`) keeping the dropped row visible (admins on 20.04 search the matrix first), while the H3 subsection holds the dropped-version narrative without polluting the supported-version rows. Reject 2B.1 (strikethrough in matrix row) — non-standard signaling, screen-reader-hostile, no precedent in `03-android-version-matrix.md`. Reject 2B.2 (separate H3 only) — admins scanning matrix miss 20.04 entirely; SC#2 explicitly enumerates 20.04.
- **D-09:** **Identity Broker v2.0.2+ re-enrollment behavior = "Non-version Breakpoints" H3 subsection in the matrix doc** (Phase 34 D-32 precedent). Identity Broker is genuinely a Linux-version-adjacent breakpoint (cuts across all supported Ubuntu versions). H3 placement preserves SC#2 boundaries and gives Phase 50 LIN-05's `> ⚠️ Known admin pitfall` callout in `01-intune-linux-agent.md` an anchor to back-link to. Reject 2C.2 (standalone H2) — SC#2 scope drift; competes with LIN-05 Phase 50 ownership per REQUIREMENTS line 28 + traceability line 147 (Shared Write Hotspot Ownership pattern). Reject 2C.3 (defer entirely) — breaks Phase 49's locking discipline and forces Phase 50 to re-author breakpoint context. Phase 49 owns the H3; Phase 50 owns the detailed pitfall callout.
- **D-10:** **EOS Date column carries `last_verified`-anchored content but uses pinned-event labels** ("Intune 2508 — August 2025") not bare dates that drift. The 60-day `last_verified` cycle (Phase 34 D-14) covers re-validation. STACK.md does not specify exact GA/HWE minimum kernel versions for `intune-portal`; cells populated from STACK.md HIGH-confidence rows; cells requiring live verification carry inline `[verify-on-current-Ubuntu]` markers per STACK.md research-flags pattern.

### Glossary structure + collision audit (Gray Area 3)

- **D-11:** **Glossary uses 5 H2 categories**: `Distro & Lifecycle` / `Agent & Service` / `Compliance & Encryption` / `Operations & Diagnostics` / `Cross-Platform Collisions`. Adversarial-review Dispute 1 was FALSE POSITIVE — `_glossary-macos.md` actually has 5 H2 categories (Enrollment / Device Management / App Distribution / App Protection (MAM) / Version History) per `grep '^## '` verification. Phase 34 D-09 5-category precedent extends; mirror-discipline (Phase 34 D-08) is satisfied. Reject 3A.2 (4 categories) — drops a structural category without precedent. Reject 3A.3 (3 categories with cross-collisions absorbed per-term) — loses the dedicated PITFALL-5 audit anchor (D-26 validator anchor target).
- **D-12:** **"Cross-Platform Collisions" category coexists with per-term `> Cross-platform note:` blockquotes** — these are NOT mutually exclusive. Per Phase 34 D-10, every collision-risk term carries a `> **Cross-platform note:**` blockquote AFTER the definition (Anti-Pattern 4 guard). The "Cross-Platform Collisions" H2 contains the absent-concept callout-only entries (Phase 34 D-11 Supervision-pattern terms — concepts that exist on other platforms but DON'T exist on Linux). Linux-native collision-risk terms (e.g., the term "agent" with a Linux meaning that differs from Android/iOS "agent") live in their topical category (Agent & Service) and carry the per-term blockquote. The H2 is reserved for "concept does not apply to Linux" entries.
- **D-13:** **Absent-concept callout entries = 9 terms** (3B.1 winner): Supervision, DPC, Work Profile, COBO/COPE/WPCO (combined entry), MGP (Managed Google Play), ZTE (Zero-Touch Enrollment), VPP (Apple Volume Purchase Program), Hardware Hash, ABM (Apple Business Manager). Covers all PITFALL-5 named at-risk terms (agent, compliance, enrollment, portal — these get full Linux definitions in their topical categories per D-12) PLUS the additional cross-platform terms PITFALL-5 lines 109-118 names as collision risks. Reject 3B.2 (4 entries) — under-covers PITFALL-5 named risks and PITFALL-5 line 114's broader risk surface. Reject 3B.3 (single H2 list) — loses per-term anchor stability (Phase 50/51/52 cross-references need `_glossary-linux.md#dpc` etc.).
- **D-14:** **Linux-native term scope = ~20 terms** (3C.1 winner) covering both LIN-02's literal 9 + 11 additional terms downstream Phases 50-52 cross-reference. Term list anchor: dm-crypt, LUKS, HWE kernel, GA kernel, GNOME desktop, deb (package format), APT repository, packages.microsoft.com, intune-portal (package), intune-agent.timer (systemd unit), microsoft-identity-broker (systemd service), journalctl, systemd, dpkg, /var/log/intune-update.log, /var/log/dpkg.log, Identity Broker (concept; v2.0.2+ behavior detail lives in D-09 matrix H3 + Phase 50 LIN-05), Web-app CA (PITFALL-2 anchor), Linux compliance settings (4 categories — pointer entry, content lives in Phase 50 LIN-04), MS Edge for Linux. Reject 3C.2 (~12 lean) — combines dm-crypt+LUKS into one entry, literal LIN-02 wording violation; under-covers downstream cross-reference needs. Reject 3C.3 (LIN-02 minimum ~9) — guarantees Phase 50+ amendment churn; omits PITFALL-3 (`packages.microsoft.com`) and PITFALL-2 (Web-app CA) anchor entries that downstream runbooks need.
- **D-15:** **Identity Broker as a glossary term carries the concept definition** (what it is, why it matters); the v2.0.2+ re-enrollment BEHAVIOR detail lives in two pinned locations: (a) the Phase 49 matrix doc Non-version Breakpoints H3 (per D-09) and (b) the Phase 50 LIN-05 `> ⚠️ Known admin pitfall` callout in `01-intune-linux-agent.md`. Glossary entry back-links to both. This avoids the AOSP-stub-trim-hazard (PITFALL-1 line 20) of split authoritative content while preserving glossary discoverability.
- **D-16:** **"GA kernel" gets its own glossary entry as the disambiguation pair to "HWE kernel"** — PITFALL-4 (lines 84-91) hinges on GA-vs-HWE kernel track distinction; HWE alone in the glossary leaves a half-pair that downstream runbooks (LIN-12 Phase 52 L2 investigation runbook 25 covers kernel-track verification) must define inline. Even though LIN-02 only literally enumerates "HWE kernel," the GA kernel entry is needed for PITFALL-4 understanding. Adversarial Dispute 5 (FALSE POSITIVE) confirmed LIN-02 doesn't literally require GA kernel — but downstream cross-reference need does.

### Reciprocal appends + validator depth (Gray Area 4)

- **D-17:** **SC#4 "all 4 existing platform glossaries" wording is corrected to "all 3"** (4A.1 winner). Verified state: only `_glossary.md`, `_glossary-android.md`, and `_glossary-macos.md` exist; `_glossary-macos.md` line 12 self-titles as "Apple Provisioning Glossary" covering both iOS and macOS — no separate `_glossary-ios.md` exists. SC#4 hedge "if it exists as a separate file" anticipates this. Reject 4A.2 (create stub `_glossary-ios.md`) — REQUIREMENTS-out-of-scope file creation; PITFALL-12 pin-coordinate hazard from new file in alphabetical position; reverses v1.3 unified-Apple-glossary architecture decision. Reject 4A.3 (two reciprocal entries in Apple glossary) — append-only contract violation surface inflation; structural inconsistency with Apple-glossary unification.
- **D-18:** **ROADMAP.md SC#4 + REQUIREMENTS.md LIN-02 traceability row both updated to "3 existing platform glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`; iOS terminology lives inside `_glossary-macos.md`)"** in Phase 49 commit-1 (foundation). Validator depends on the corrected count; ROADMAP+REQUIREMENTS edits land BEFORE the validator runs at end-of-phase. Coordination friction with Phase 48 D-09 SC#1 wording-correction (also pending) — Phase 49 plan author resolves any merge conflict at commit time.
- **D-19:** **Reciprocal append location = top platform-coverage blockquote in each of the 3 existing glossaries** (4B.1 winner). Each glossary already has this blockquote (verified: `_glossary-macos.md` line 12, `_glossary-android.md` line 12, `_glossary.md` analogous). Append a single sentence: "For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md)." Reject 4B.2 (per-term Cross-Platform Reference entries) — modifies many existing per-term entries, append-only contract violation, multi-site pin-coord hazard. Reject 4B.3 (new bottom H2) — over-engineered for a one-line cross-reference.
- **D-20:** **Append-only contract clarification for D-19**: The "append" semantic is satisfied by adding a single sentence to a multi-sentence blockquote at a fixed top-of-file location. Phase 42 D-03 / ROADMAP line 506 append-only contract prohibits INSERTING above existing entries; D-19 adds a sentence WITHIN an existing blockquote without displacing any content below. PITFALL-12 pin-coordinate hazard remains — adding a sentence to a single-line blockquote may shift to multi-line and shift subsequent line numbers. Mitigation: D-22 atomic commit-2 includes `regenerate-supervision-pins.mjs --report` + sidecar pin-coord refresh in the same commit (per locked constraint).
- **D-21:** **`check-phase-49.mjs` validator depth = structural assertions PLUS PITFALL-5 collision-audit verification** (4D.3 winner). PITFALL-5 line 122 explicitly mandates "Add a validator check in the Linux phase validator (`check-phase-NN.mjs`) that ensures no term in `_glossary-linux.md` appears in another platform glossary without a cross-reference." This is the validator's reason for existing in Phase 49. Reject 4D.1 (frontmatter-only) — trivializes validator-as-deliverable contract; misses PITFALL-7 whitelist-first VERIFICATION.md gating. Reject 4D.2 (structural only) — leaves PITFALL-5-mandated check unimplemented.
- **D-22:** **Atomicity = TWO commits** (4C.2 winner): **Commit-1 (foundation + validator)** ships `00-enrollment-overview.md` + `01-linux-prerequisites.md` + `_glossary-linux.md` + `check-phase-49.mjs` + ROADMAP.md SC#4 wording correction + REQUIREMENTS.md LIN-02 traceability correction; **Commit-2 (reciprocal appends + pin refresh)** ships the 3 reciprocal one-line appends to existing glossaries + `regenerate-supervision-pins.mjs --report` + `v1.5-audit-allowlist.json` pin-coord refresh per PITFALL-12 locked constraint. Reject 4C.1 (ONE atomic commit) — bundles append-only edits with new-file authoring; over-coarse; revert-granularity loss. Reject 4C.3 (THREE commits) — between commit-2 (appends) and commit-3 (pin refresh) `--self-test` would FAIL; atomicity-contract violation per Phase 48 D-14 explicit precedent ("pin-coord refresh + sidecar update is supposed to land in the SAME commit as the pinned-file modification"). Two-commit split keeps each commit bisect-clean while honoring Phase 48 D-14 atomicity.
- **D-23:** **Validator collision-audit implementation specifics** (D-21 detail): `check-phase-49.mjs` (a) parses `_glossary-linux.md` and extracts H3-anchored term entries (excludes alphabetical-index, version-history, cross-platform-collisions H2 children which are intentionally absent-concept entries); (b) parses each of the 3 existing glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`) and extracts H3-anchored term entries; (c) for each Linux term, asserts EITHER (i) it does NOT appear in any other glossary, OR (ii) it carries a `> **Cross-platform note:**` blockquote on the line(s) immediately following its H3 referencing the colliding glossary. Term-extraction heuristic = H3 only (ignores boldfaced inline mentions, alphabetical-index entries). False-positive allowlist = none in Phase 49 (lazy-add per Phase 48 D-15 YAGNI principle); first-collision false-positive triggers an `c5_collision_allowlist[]` array addition to `v1.5-audit-allowlist.json` in the triggering phase's commit.
- **D-24:** **Validator structural assertion list** (D-21 detail): `check-phase-49.mjs` asserts (a) `00-enrollment-overview.md` contains H2 `## Supported Management Surface` AND H2 `## Out of Scope for Linux via Intune` AND H2 `## Enrollment Constraints` containing H3 `### BYOD vs Corporate-Owned Caveat` with `> ⚠️ Known caveat` blockquote; (b) `01-linux-prerequisites.md` contains a 3-row × 5-column matrix with header row exactly matching `| Version | GA Kernel | HWE Kernel | Support Status | EOS Date |`, AND H3 `### Ubuntu 20.04 — End-of-Support`, AND H3 `### Non-version Breakpoints`; (c) `_glossary-linux.md` contains H2 `## Alphabetical Index`, H2 `## Cross-Platform Collisions`, H2 `## Version History`, AND the 5 content categories per D-11; (d) each of the 3 existing glossaries contains the literal string `[Linux Provisioning Glossary](_glossary-linux.md)`.
- **D-25:** **Hardcoded H2 string assertions are pinned in the validator AND in CONTEXT.md.** If Phase 50+ wants to rename a Phase 49 H2, that requires a same-commit validator update. This is the brittleness trade-off the Referee accepted — Phase 50/51/52 plan authors are aware via this CONTEXT and per cross-decision integration coupling alert (Coupling alert 2 in Referee report).
- **D-26:** **Validator implementation pattern matches `check-phase-30.mjs` / `check-phase-31.mjs`** (Phase 48 CONTEXT line 149) inline file-reads-only / no-shared-module per Phase 48 D-25 contract. Markdown parsing is regex-based (heading detection via `^## ` / `^### `; blockquote detection via `^> `; cross-platform-note detection via `^> \*\*Cross-platform note:\*\*`). Avoids markdown-AST dependency; aligns with the harness's no-shared-module discipline.

### Plan-level ordering constraints

- **D-27:** **Phase 49 plan order driven by D-22 two-commit atomicity + Phase 48 D-23 atomicity-contract precedent + Phase 50 dependency:**
  1. **Commit-1 (foundation + validator atomic):** `00-enrollment-overview.md` (whitelist H2 + Out-of-Scope H2 + Enrollment Constraints H2 + cross-platform bridge subsection) + `01-linux-prerequisites.md` (matrix + EOS H3 + Non-version Breakpoints H3) + `_glossary-linux.md` (5 categories + ~20 native terms + 9 absent-concept entries + ~13 collision-risk per-term `> Cross-platform note:` blockquotes per D-12) + `check-phase-49.mjs` (D-23 + D-24 + D-26) + ROADMAP.md SC#4 wording correction (D-18) + REQUIREMENTS.md LIN-02 traceability correction (D-18). Run `node scripts/validation/check-phase-49.mjs` → expect PASS. Run `node scripts/validation/v1.5-milestone-audit.mjs` → expect PASS (C10 frontmatter check passes; C13 informational broken-link check passes; new files have no pre-existing breakage).
  2. **Commit-2 (reciprocal appends + pin refresh atomic):** Append "For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md)." to `_glossary.md` top blockquote + same sentence to `_glossary-android.md` line 12 blockquote + same sentence to `_glossary-macos.md` line 12 blockquote. Run `node scripts/validation/regenerate-supervision-pins.mjs --report` → if any pin coordinates shift, refresh `v1.5-audit-allowlist.json` in same commit. Run `node scripts/validation/regenerate-supervision-pins.mjs --self-test` → expect exit 0. Run `node scripts/validation/check-phase-49.mjs` → expect PASS (validator now sees all 3 reciprocal append strings; collision audit passes against updated existing glossaries).
  3. **Terminal sanity (post-commit-2):** `node scripts/validation/v1.5-milestone-audit.mjs --verbose` → expect 8/9+ PASS (all blocking checks PASS; C9/C11/C12/C13 informational PASS or noise within accepted tolerance per Phase 48 D-06 + D-08).
  4. **VERIFICATION.md authored** documenting whitelist H2 content (literal text), version matrix rows (literal table dump), collision audit results (terms scanned + collision-vs-no-collision verdicts) — per ROADMAP §Phase 49 line 178 "VERIFICATION.md documents whitelist H2 content, version matrix rows, and collision audit results BEFORE Phase 50 begins." VERIFICATION.md is the gate Phase 50 reads to confirm Phase 49 closed.

### Claude's Discretion

- **CD-01:** Exact wording of the cross-platform bridge subsection (1C.1) within the partial-mapping discipline of D-06 — author may write 2-4 paragraphs covering Windows / macOS / Android admin perspectives as long as each carries the explicit "the mapping is partial" framing per Phase 34 D-03 precedent.
- **CD-02:** Mermaid diagram inclusion in `00-enrollment-overview.md` — Phase 34 D-22 "Claude's Discretion" allowed Mermaid for ownership × management-scope decisions. Linux has fewer axes (single ownership model + capability whitelist); a Mermaid is optional. If included, it should NOT visually compete with the whitelist H2.
- **CD-03:** Word target for `00-enrollment-overview.md` — Phase 34 D-07 used 800-1200 words for the Android equivalent. Linux likely lands at 600-1000 due to narrower capability surface. No hard cap; readability over length.
- **CD-04:** Exact category names within the 5-category D-11 structure — `Distro & Lifecycle` / `Agent & Service` / `Compliance & Encryption` / `Operations & Diagnostics` / `Cross-Platform Collisions` is the recommended set; author may rename one category if topical-fit improves and validator constants (D-24) are updated in the same commit.
- **CD-05:** Footnote rendering syntax for D-08 (Ubuntu 20.04 footnote marker) — GitHub-flavored Markdown `[^1]` vs inline parenthetical. If `[^1]` renders unreliably on the project's chosen viewer, fall back to inline `(see Ubuntu 20.04 — End-of-Support below)` parenthetical. Validator (D-24) should accept either pattern.
- **CD-06:** Order of glossary entries within categories — alphabetical within each category recommended (Phase 34 D-08 mirror-macOS pattern); author may deviate if topical clustering serves readability AND alphabetical index at top (D-24 structural assertion) covers findability.
- **CD-07:** Whether the validator's collision-audit (D-23) catches multi-line blockquotes (some `> Cross-platform note:` blockquotes may span 3-5 lines). Implementation choice: regex-based "look ahead 5 lines after H3 for `^> \*\*Cross-platform note:\*\*`" is acceptable.

### Cross-decision integration callouts (Referee Part C)

- **CDI-01:** **D-01 × D-21 coupling — 3-status table contract is validator-enforced.** The 3 canonical status strings (`Supported` / `Partial` / `Not supported`) are constants in `check-phase-49.mjs`. Drift in cell strings → validator FAIL. Document the canonical 3-string set as a CONTRACT inherited by `linux-capability-matrix.md` (LIN-13 Phase 50). Phase 50 plan dependency: LIN-13 reuses the 3-string set; no Phase 50 freedom to introduce a 4th status.
- **CDI-02:** **D-11 × D-21 coupling — "Cross-Platform Collisions" H2 string is validator-pinned.** Validator hardcodes the H2 string `## Cross-Platform Collisions`. Pin the H2 wording in BOTH the `_glossary-linux.md` template AND `check-phase-49.mjs` constants. Same-commit pinning rule applies if Phase 50+ wants to rename.
- **CDI-03:** **D-17 × ROADMAP/REQUIREMENTS — SC#4 + LIN-02 traceability corrections land in commit-1, not commit-2.** Validator depends on the corrected count; ROADMAP + REQUIREMENTS edits MUST land before the validator's first run at end-of-phase. Coordination with Phase 48 D-09's pending SC#1 correction handled at commit time.

### Downstream phase obligations (Referee Part C — for next-phase plan authors)

- **DPO-01:** **Phase 50 LIN-05 (Identity Broker pitfall callout in `01-intune-linux-agent.md`) MUST back-link to the Phase 49 `01-linux-prerequisites.md` Non-version Breakpoints H3 anchor** (per D-09). Add to Phase 50 plan dependencies.
- **DPO-02:** **Phase 50 LIN-13 (`linux-capability-matrix.md`) inherits the 3-status canonical set** (`Supported` / `Partial` / `Not supported`) per D-01 + CDI-01. No Phase 50 freedom to introduce a 4th status string. Document as a hard-pinned dependency in Phase 50 plan.
- **DPO-03:** **Phase 50 `admin-setup-linux/00-overview.md` MUST NOT duplicate the cross-platform bridge subsection** from Phase 49 `00-enrollment-overview.md`. Phase 50 overview back-links to the Phase 49 anchor instead. Anti-Pattern 1 duplication guard per Phase 34 D-26.
- **DPO-04:** **Phase 51-52 runbooks reference the ~20 Linux-native glossary terms** (per D-14) by anchor (`_glossary-linux.md#term-anchor`). If a runbook needs an additional term not in the Phase 49 ~20-term set, the runbook author appends to `_glossary-linux.md` per the append-only contract — Phase 49 does NOT reserve term-coverage exclusivity.
- **DPO-05:** **Phase 59 CLEAN-08 (glossary normalization) builds on Phase 49 reciprocal appends.** Phase 59 owns the 5-platform reciprocal cross-reference normalization across Windows + macOS + iOS + Android + Linux glossaries; Phase 49 establishes the Linux side of the reciprocity. Phase 59 should expect Phase 49's commit-2 reciprocal appends to already exist and add any additional cross-references identified at v1.5 close.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before authoring or implementing.**

### Phase 49 success criteria + traceability (authoritative scope)

- `.planning/ROADMAP.md` §"Phase 49: Linux Foundation — Taxonomy, Glossary, Version Matrix" (lines 164-178) — Goal, dependencies, requirements (LIN-01, LIN-02), 5 success criteria, methodology notes
- `.planning/ROADMAP.md` line 506 — append-only H2-block contract attribution (Phase 42 D-03)
- `.planning/REQUIREMENTS.md` §LIN-01 (line 24) — Linux taxonomy + distro framework + BYOD/corp-owned caveat (1c FOLD)
- `.planning/REQUIREMENTS.md` §LIN-02 (line 25) — Linux glossary + 9 enumerated terms + reciprocal see-also requirement
- `.planning/REQUIREMENTS.md` §"Traceability" lines 143-144 — LIN-01 → Phase 49 + LIN-02 → Phase 49 phase mapping
- `.planning/REQUIREMENTS.md` §"Out of Scope" lines 104-117 — explicit exclusions including Snap delivery, RHEL/non-Ubuntu, headless Linux

### v1.5 research (authoritative for Linux scope, pitfalls, and tooling)

- `.planning/research/SUMMARY.md` lines 25-35 — Linux Intune client scope (Ubuntu 22.04/24.04 supported; 20.04 dropped Intune 2508; Identity Broker v2.0.2+ re-enrollment behavior; web-app CA only via Edge 102.x+)
- `.planning/research/SUMMARY.md` lines 65-75 — Pillar 2 Linux must-haves
- `.planning/research/SUMMARY.md` lines 159-165 — Phase 49 rationale + deliverables + pitfalls avoided
- `.planning/research/SUMMARY.md` lines 250-285 — confidence ratings, open gaps, BYOD/corp-owned framing inconsistency
- `.planning/research/PITFALLS.md` §Pitfall 1 (lines 11-31) — Linux capability parity framing; PITFALL-7 whitelist-first pattern (avoidance)
- `.planning/research/PITFALLS.md` §Pitfall 2 (lines 33-56) — CA bait; mandatory architectural callout; "Not supported — web-app CA only" cell phrasing requirement (line 48); warning sign re. blank/Partial CA cell (line 52)
- `.planning/research/PITFALLS.md` §Pitfall 3 (lines 58-77) — Snap vs deb confusion; deb-only via packages.microsoft.com; `last_verified` discipline
- `.planning/research/PITFALLS.md` §Pitfall 4 (lines 79-99) — distro version creep; Ubuntu × kernel-track × support-status matrix axes mandate; HWE vs GA disambiguation
- `.planning/research/PITFALLS.md` §Pitfall 5 (lines 101-122) — glossary collision; named at-risk terms (agent / compliance / enrollment / portal); validator-check mandate (line 122) — directly drives D-21 + D-23
- `.planning/research/PITFALLS.md` §Pitfall 12 (lines 258-276) — sidecar pin coordinate stability; PITFALL-12 IS the failure mode D-22 commit-2 mitigates via `regenerate-supervision-pins.mjs --report`
- `.planning/research/PITFALLS.md` §Pitfall 13 (lines 278-297) — ops-domain anti-pattern false-positive risk; Ubuntu 20.04 EOL callout flagged as known false-positive candidate (line 281) — relevant to D-08 EOS treatment
- `.planning/research/STACK.md` lines 1-100 — Linux Intune client tooling (intune-portal package, deb format, packages.microsoft.com, Ubuntu version table, GNOME requirement, Identity Broker v2.0.2+ behavior, intune-agent.timer + microsoft-identity-broker systemd units, journalctl diagnostic surface, log paths)

### v1.4 Phase 34 Android foundation precedent (D-rule citations throughout decisions)

- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-03 (line 28) — "For Admins Familiar with iOS" subsection precedent (drives D-05 + D-06)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-07 (line 32) — 800-1200 word target for enrollment overview (drives CD-03)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-08 (line 35) — mirror `_glossary-macos.md` structure (drives D-11)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-09 (line 36) — 5-category glossary precedent (drives D-11)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-10 (line 37) — per-term `> Cross-platform note:` blockquote AFTER definition (Anti-Pattern 4 guard) — drives D-12
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-11 (line 38) — Supervision absent-concept callout precedent (drives D-13)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-13 (line 40) — Version History section pattern (drives glossary structure)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-14 (line 41) — 60-day `last_verified` cycle (drives all Phase 49 frontmatter)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-26 (line 63) — single-canonical-matrix discipline / Anti-Pattern 1 (drives DPO-03)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-29 (line 68) — breakpoints-only matrix orientation precedent (drives D-07)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-31 (line 70) — `min_android_version` frontmatter prohibition / inline-version drift guard (drives D-10)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-32 (line 71) — "Non-version Breakpoints" subsection precedent (drives D-09)

### v1.5 Phase 48 atomicity + harness contract precedent

- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-07 / D-23 — atomicity-contract rescue-style commit precedent (drives D-22 + D-27)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-14 — pin-coord refresh + sidecar update + BASELINE_9 in ONE atomic commit precedent (drives D-22 commit-2 atomicity)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-15 — YAGNI lazy-array-population precedent (drives D-23 collision-allowlist deferral)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-18 — `check-phase-NN.mjs` validator-as-deliverable contract + CI registration (drives D-21)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-25 — file-reads-only / no-shared-module contract (drives D-26)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` lines 90-91 — Shared Write Hotspot Ownership pattern (drives D-09 LIN-05 ownership reasoning)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` line 149 — `check-phase-30.mjs` / `check-phase-31.mjs` validator pattern exemplars (drives D-26)

### Existing Linux/cross-platform glossaries (append targets + structural templates)

- `docs/_glossary.md` (Windows Autopilot Glossary) — top platform-coverage blockquote append target per D-19
- `docs/_glossary-macos.md` (Apple Provisioning Glossary — covers macOS AND iOS) — line 12 platform-coverage blockquote append target; PRIMARY structural template per Phase 34 D-08; verified 5 H2 categories (drives D-11)
- `docs/_glossary-android.md` (Android Enterprise Provisioning Glossary) — line 12 platform-coverage blockquote append target; precedent for cross-platform `> Cross-platform note:` blockquote pattern; v1.4.1 sidecar has 18 supervision_exemptions pinned (PITFALL-12 surface area for D-22 commit-2)
- `docs/_templates/admin-template-android.md` (Phase 34 D-16 admin template) — pattern reference for any future admin-template-linux.md (Phase 50 scope)

### Existing Android lifecycle docs (precedent shape Phase 49 mirrors)

- `docs/android-lifecycle/00-enrollment-overview.md` line 11 — `> **Platform gate:**` blockquote precedent (drives D-04 placement near top); line 49 — "For Admins Familiar with iOS" subsection precedent (verifies D-03 / D-05)
- `docs/android-lifecycle/01-android-prerequisites.md` — structural template for `01-linux-prerequisites.md`
- `docs/android-lifecycle/03-android-version-matrix.md` — Phase 34 D-29 breakpoints-only orientation precedent; 3-column matrix shape (verifies D-07 trade-offs); Version Breakpoint Details H2 + Non-version Breakpoints H3 patterns (drives D-09)
- `docs/admin-setup-android/00-overview.md` — for awareness only; Phase 50 admin-setup-linux/00-overview.md mirrors this AND back-links to Phase 49 (DPO-03)

### v1.4 / v1.4.1 frozen harness + sidecar (PITFALL-12 surface area)

- `scripts/validation/v1.5-milestone-audit.mjs` (when Phase 48 ships it) — C10 blocking check Linux frontmatter; Phase 49 files MUST satisfy
- `scripts/validation/v1.5-audit-allowlist.json` (when Phase 48 ships it) — sidecar; D-22 commit-2 may add `c5_collision_allowlist[]` array LAZILY if first collision false-positive surfaces (per D-23 + Phase 48 D-15 YAGNI)
- `scripts/validation/regenerate-supervision-pins.mjs` — `--report` mode invoked in D-22 commit-2 before pinned-file modifications; `--self-test` invoked post-commit-2 to verify pin coordinates intact
- `scripts/validation/check-phase-30.mjs` + `scripts/validation/check-phase-31.mjs` — pattern exemplars for `check-phase-49.mjs` (drives D-26)

### Project-level context

- `.planning/PROJECT.md` §"Current Milestone: v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup" — full v1.5 scope
- `.planning/STATE.md` — current milestone state; v1.5 carry-forward patterns (lines 64-83) including PITFALL-7 whitelist-first lock for Linux (line 78); Phase 49 dependency in v1.5 dependency summary (lines 96-100)

### Downstream-phase dependencies (what Phase 49 unblocks)

- **Phase 50 (Linux Admin Setup + Capability Matrix)** depends on: Phase 49 VERIFICATION.md complete; whitelist H2 anchored for cross-reference; `_glossary-linux.md` ~20 terms anchored for runbook cross-references; LIN-05 Identity Broker callout back-links to Phase 49 D-09 H3 anchor (DPO-01); `linux-capability-matrix.md` inherits 3-status canonical set (DPO-02)
- **Phase 51 (Linux L1 Triage + Runbooks 30-33)** depends on: `_glossary-linux.md` term anchors per DPO-04; whitelist-disciplined Linux content shape established
- **Phase 52 (Linux L2 Investigation Runbooks 24-25)** depends on: `_glossary-linux.md` `microsoft-identity-broker` + `intune-agent.timer` + `journalctl` term anchors; PITFALL-4 GA/HWE kernel disambiguation pair anchored
- **Phase 59 (Hub Navigation Integration)** depends on: Phase 49 commit-2 reciprocal appends already exist; CLEAN-08 5-platform glossary normalization builds on Phase 49 Linux-side reciprocity (DPO-05)
- **Phase 60 (Audit Harness Finalization)** depends on: `check-phase-49.mjs` registered in `audit-harness-v1.5-integrity.yml`; PITFALL-5 collision-audit graduation/promotion considered if cross-glossary check generalizes beyond Phase 49

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `scripts/validation/v1.5-milestone-audit.mjs` (when Phase 48 ships it) — C10 blocking + C13 informational; Phase 49 files validated against both at commit time
- `scripts/validation/v1.5-audit-allowlist.json` (when Phase 48 ships it) — sidecar; lazy-add `c5_collision_allowlist[]` per D-23 if first false-positive surfaces
- `scripts/validation/regenerate-supervision-pins.mjs` — `--report` + `--self-test` modes used in D-22 commit-2
- `scripts/validation/check-phase-30.mjs` + `check-phase-31.mjs` — file-reads-only validator pattern exemplars (per Phase 48 D-25); style reference for `check-phase-49.mjs`
- `docs/_glossary-macos.md` — PRIMARY structural template per Phase 34 D-08; 5 H2 categories verified
- `docs/_glossary-android.md` — secondary template; Cross-platform note blockquote pattern per Phase 34 D-10
- `docs/_glossary.md` — Windows Autopilot append target
- `docs/android-lifecycle/00-enrollment-overview.md` — structural template for `00-enrollment-overview.md` (whitelist H2 + cross-platform bridge subsection precedent)
- `docs/android-lifecycle/03-android-version-matrix.md` — structural template for `01-linux-prerequisites.md` matrix shape

### Established Patterns

- **Path A versioning lineage (Phase 43 D-01..D-08):** v1.5 harness is FROZEN-marker-disciplined; Phase 49 docs validated against v1.5 harness without harness modification
- **Append-only H2-block contract (Phase 42 D-03 / ROADMAP line 506):** D-19 + D-22 commit-2 honor by appending sentence WITHIN existing top blockquote (not displacing content below); D-20 clarifies semantic
- **Atomicity-same-commit (Phase 42 D-20/D-22, Phase 43 D-07, Phase 48 D-14):** D-22 two-commit split; commit-2 includes pin-coord refresh atomically with pinned-file modifications
- **Validator-as-deliverable (v1.3+ pattern, Phase 48 D-18):** `check-phase-49.mjs` ships in commit-1; CI workflow registers per Phase 48 D-18
- **Per-term `> Cross-platform note:` blockquote AFTER definition (Phase 34 D-10, Anti-Pattern 4 guard):** D-12 honors; collision-risk terms in topical categories carry the per-term blockquote
- **Absent-concept callout-only entry pattern (Phase 34 D-11 Supervision precedent):** D-13 extends to 9 entries in dedicated "Cross-Platform Collisions" H2 (D-11 + D-12 distinguish topical-category placement from absent-callout placement)
- **`> ⚠️ Known caveat` blockquote shape (LIN-01 mandate):** D-04 honors literal LIN-01 wording; H3-containerized within "Enrollment Constraints" per D-04
- **60-day `last_verified` cycle (Phase 34 D-14):** All Phase 49 files carry `last_verified` + `review_by` frontmatter on 60-day cycle
- **`platform: Linux` frontmatter (C10 blocking from Phase 48):** All 3 new Linux content files (00-enrollment-overview.md, 01-linux-prerequisites.md, _glossary-linux.md) carry `platform: Linux`
- **PITFALL-7 whitelist-first lock (Phase 49 IS the lock):** No stub H2 sections for capabilities that don't exist on Linux; whitelist defines full scope; Out-of-Scope callout enumerates explicit exclusions

### Integration Points

- **Whitelist H2 + Out-of-Scope H2 in `00-enrollment-overview.md`** is the canonical Linux capability boundary; downstream Phases 50-58 cite back via anchor (`docs/linux-lifecycle/00-enrollment-overview.md#supported-management-surface` + `#out-of-scope-for-linux-via-intune`)
- **Version-breakpoint matrix in `01-linux-prerequisites.md`** is the canonical Ubuntu version × kernel-track table; downstream Phase 50 `02-enrollment-profile.md` (LIN-06 end-user enrollment) + Phase 52 L2 runbook 25 (kernel-version verification) cite back via anchor
- **`_glossary-linux.md` term anchors** (e.g., `#dm-crypt`, `#hwe-kernel`, `#intune-portal-package`, `#web-app-ca`) are the canonical terminology layer for all downstream Linux content (Phases 50-52, 59)
- **Reciprocal append strings in 3 existing glossaries** are the bilateral cross-reference layer; Phase 59 CLEAN-08 5-platform normalization builds on these
- **`check-phase-49.mjs`** is registered in `.github/workflows/audit-harness-v1.5-integrity.yml` (Phase 48 D-18 lazy-skip pattern); CI runs the validator on every PR + scheduled bitrot
- **VERIFICATION.md** is the gate Phase 50 plan author reads to confirm Phase 49 closed; literal whitelist text + literal matrix dump + collision audit results documented

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review traceability:** All 4 gray areas resolved via finder/adversary/referee. Finder scored 608 raw points across 38 options; Adversary disproved ~30 across 5 issues; Referee adopted 3 of 5 disproves (~18 points removed). The 2 disproves Referee REJECTED retained as REAL ISSUES are: (1) Dispute 3 = BYOD caveat conceptually NOT about Supported Management Surface (drove D-04 H3 placement under separate "Enrollment Constraints" H2, not nesting inside whitelist H2 per 1B.1); (2) Dispute 4 = bullet list cannot structurally encode "Partial" qualifier (drove D-01 3-status table over 1A.1 bullet list). The 3 disproves Referee ADOPTED enabled: 3A.1 5-category structure (macOS verified 5 H2 categories, not 2 as Finder claimed); 1C.1 cross-platform bridge subsection (Phase 34 D-03 explicitly precedents the pattern); 3C.2 GA-kernel-not-LIN-02-mandated (literal LIN-02 wording verified). Downstream planner should read DISCUSSION-LOG.md alongside this CONTEXT to understand rejected alternatives + the specific evidence chain that locked each winner.

- **"PITFALL-5 line 122 IS the validator":** D-21 + D-23 implement the explicit PITFALL-5 line 122 mandate verbatim ("Add a validator check in the Linux phase validator (`check-phase-NN.mjs`) that ensures no term in `_glossary-linux.md` appears in another platform glossary without a cross-reference"). This is not Claude-discretion validator scope — it's a research-mandated check. Frontmatter-only validator (4D.1) was rejected as a literal PITFALL-5 violation.

- **"Mirror-discipline = mirror MACOS, not ANDROID":** Phase 34 D-08 mandates mirror of `_glossary-macos.md` (the precedent template for Apple platform), NOT `_glossary-android.md` (which itself mirrors macOS). Verified by reading `_glossary-macos.md` shows 5 H2 categories (Enrollment / Device Management / App Distribution / App Protection (MAM) / Version History). Phase 49 5-category structure (D-11) is mirror-compliant; the macOS categories are adapted to Linux topical fit (Distro & Lifecycle / Agent & Service / Compliance & Encryption / Operations & Diagnostics / Cross-Platform Collisions) per Phase 34 D-09 5-category-extension precedent.

- **"Cross-Platform Collisions H2 is for ABSENT concepts only":** D-11 + D-12 distinguish two collision treatments: (a) Linux-native terms whose meaning differs from same-named cross-platform terms (e.g., "agent" with a Linux-specific definition that differs from Android/iOS "agent") live in their topical category and carry per-term `> Cross-platform note:` blockquote per Phase 34 D-10; (b) cross-platform concepts that simply DON'T EXIST on Linux (e.g., DPC, MGP, ZTE, ABM) get absent-concept callout-only entries in the dedicated "Cross-Platform Collisions" H2 per Phase 34 D-11 Supervision-pattern. Both treatments coexist; neither violates Anti-Pattern 4.

- **"3-status table strings are CONTRACTS for Phase 50":** D-01 3-status table strings (`Supported` / `Partial` / `Not supported`) are validator-enforced (D-02 + D-21 + D-24) AND inherited by Phase 50 LIN-13 `linux-capability-matrix.md` per CDI-01 + DPO-02. Phase 50 plan author has NO freedom to introduce a 4th status string. PITFALL-2 line 52 warning sign (blank/Partial CA cell) is satisfied by closing the string set in code.

- **"For-Admins-Familiar bridge is partial-mapping disciplined":** D-05 + D-06 establish the bridge subsection per Phase 34 D-03 precedent BUT with explicit forbidden patterns ("Linux CA is similar to iOS CA" — PITFALL-2 bait; "Linux app delivery works like Win32" — PITFALL-1 framing). Required pattern: "[Concept] on Linux behaves like [closest analog] in [narrow respect], but [specific divergence]; see Supported Management Surface for canonical Linux scope." Bridge is NOT a feature-by-feature parity claim.

- **"Identity Broker is split-author across Phase 49 + Phase 50":** D-09 + D-15 + DPO-01 establish that the Identity Broker CONCEPT lives in `_glossary-linux.md` (Phase 49); the v2.0.2+ re-enrollment BEHAVIOR lives in two pinned locations: (a) Phase 49 `01-linux-prerequisites.md` Non-version Breakpoints H3 (matrix-doc context) and (b) Phase 50 `01-intune-linux-agent.md` LIN-05 `> ⚠️ Known admin pitfall` callout (admin-action context). Phase 50 LIN-05 callout back-links to Phase 49 H3 anchor. AOSP-stub-trim hazard (PITFALL-1 line 20) avoided by clear authoritative-content boundaries.

- **"SC#4 wording correction is a Phase 49 commit-1 obligation":** D-17 + D-18 + CDI-03 establish that ROADMAP.md SC#4 "all 4 existing platform glossaries" is corrected to "all 3" in Phase 49 commit-1 (foundation). Coordination friction with Phase 48 D-09 SC#1 wording-correction (also pending) handled at commit time. Validator (D-21 + D-23 + D-24) depends on the corrected count — edits MUST land before validator's first run.

- **"Two-commit atomicity is the Goldilocks choice":** D-22 ONE atomic commit (4C.1) bundles too much risk; THREE commits (4C.3) violates Phase 48 D-14 atomicity-contract (commit-2 lands while pin coords stale → `--self-test` FAIL); TWO commits (4C.2) keeps each commit bisect-clean while honoring per-commit pin-coord-refresh constraint. Commit-1 = foundation + validator + ROADMAP/REQUIREMENTS edits; Commit-2 = reciprocal appends + pin-coord refresh in same commit.

- **"~20 native terms over LIN-02 minimum 9":** D-14 ~20 vs 3C.3 minimum-9. Phase 34 Android shipped ~25 entries; downstream Phases 35-42 consumed all of them. Lean-9 (3C.3) guarantees Phase 50+ amendment churn for missing PITFALL-3 (`packages.microsoft.com`) and PITFALL-2 (`Web-app CA`) anchors. ~20 covers downstream needs without padding (validated against PITFALL-2 + PITFALL-3 + PITFALL-4 anchor requirements + Phase 52 LIN-12 runbook reference needs).

</specifics>

<deferred>
## Deferred Ideas

- **`_glossary-ios.md` separate file:** Adversarial-review (4A.2) rejected as REQUIREMENTS-out-of-scope file creation reversing v1.3 unified-Apple-glossary architecture. If iOS terminology depth ever justifies separate Apple-platform glossaries, that's a v1.6+ architecture decision driven by content volume, not Phase 49 scope.

- **`c5_collision_allowlist[]` sidecar array (D-23):** Pre-creation in Phase 49 commit-1 was rejected per Phase 48 D-15 YAGNI principle. First-collision false-positive triggers lazy addition to `v1.5-audit-allowlist.json` in the triggering phase's commit. Backlog: if Phase 50/51/52 hit ≥3 false positives, formalize the sidecar key in `v1.5-audit-allowlist.json` schema.

- **PITFALL-5 collision-audit graduation/generalization:** Phase 49 ships the cross-glossary collision check inline in `check-phase-49.mjs`. If Phases 50-58 also benefit from cross-glossary checks (e.g., Phase 53 ops-domain terms colliding with Linux glossary), Phase 60 (audit-harness finalization) considers promoting the check to a v1.5 harness check (e.g., C14) — out of Phase 49 scope.

- **Mermaid ownership × management-scope diagram (CD-02):** Phase 34 D-22 included a Mermaid for Android. Linux has fewer axes (single ownership model + capability whitelist); Mermaid is optional and at Claude's discretion. If included and admins find it valuable, Phase 50 admin-setup-linux/00-overview.md may inherit; otherwise, scope Mermaid as Phase-49-only or skip entirely.

- **Pre-commit advisory hook for Linux pinned files:** Phase 48 D-21 introduced pre-commit advisory for Android pinned files; Phase 49 commit-2 modifies `_glossary-android.md` (already pinned) AND introduces `_glossary-linux.md` (newly pinned). Pre-commit hook should auto-extend to cover the Linux pinned-file glob — Phase 49 plan author updates the hook glob in commit-2 (or defers to Phase 50+ if hook scope-extension is non-trivial).

- **Linux Bash custom-compliance deep-dive guide (LIN-DEFER-01):** Per REQUIREMENTS.md line 95 already deferred to v1.5.1; brief reference in Phase 50 LIN-04 compliance-policy guide; standalone deep-dive ships separately.

- **RHEL 9/10 Intune Linux client docs (RHEL-01):** Per REQUIREMENTS.md line 96 already deferred to v1.6+; Microsoft Intune Linux client supports RHEL 9/10 but PROJECT.md scopes v1.5 to Ubuntu LTS only.

- **`/var/log/microsoft/intune/` file-based log path:** Per STACK.md line 76 + SUMMARY.md line 282 — Microsoft Learn does not document this path for `intune-portal` on Ubuntu (vs RHEL with MDE). Phase 49 glossary entry for `journalctl` is the confirmed primary diagnostic surface; file-based path is LOW-MEDIUM confidence and properly scoped to Phase 52 L2 runbook 24 with freshness caveat per LIN-12 + ROADMAP §Phase 52 SC#1. Not a Phase 49 concern.

### Reviewed Todos (not folded)

*(No pending todos matched Phase 49 scope — `todo match-phase 49` returned 0 matches.)*

</deferred>

---

*Phase: 49-linux-foundation-taxonomy-glossary-version-matrix*
*Context gathered: 2026-04-26*
*Adversarial review applied: finder/adversary/referee on 13 sub-decisions across 4 gray areas*
*Finder 608 raw → Adversary disproved ~30 (5 issues) → Referee adopted 3 of 5 (~18 points removed; ~590 surviving issues across 36 of 38 retained)*
