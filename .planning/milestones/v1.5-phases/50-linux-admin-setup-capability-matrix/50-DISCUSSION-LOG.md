# Phase 50: Linux Admin Setup + Capability Matrix - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents. Decisions are captured in 50-CONTEXT.md — this log preserves the alternatives considered + adversarial-review evidence chain.

**Date:** 2026-04-27
**Phase:** 50-linux-admin-setup-capability-matrix
**Areas discussed:** 4 (Capability matrix structure / End-user enrollment embed shape / Cross-Platform Equivalences pairs / Commit atomicity strategy)
**Methodology:** 12-agent adversarial review (4 Finder + 4 Adversary + 4 Referee) across 3 parallel waves; 16 original candidate options + 1 referee-introduced (2E)

---

## Pre-discussion state recovery

Prior to gray area selection, surfaced a critical state issue: 30+ untracked `.claude/worktrees/agent-*` directories + staged deletion of all Phase 49 deliverables (despite Phase 49 closing successfully via commit `ed57ade`). The staged deletions were a frozen index from before Phase 49's worktree merges; HEAD had advanced via worktree merges but the index hadn't refreshed. Recovered via `git reset HEAD` + `git restore` on Phase 49 paths (non-destructive; preserved unstaged STATE.md timestamp edit). Phase 49 deliverables (whitelist H2, version matrix, Linux glossary, validator, reciprocal append edits, ROADMAP/REQUIREMENTS SC#4 corrections) all restored to working tree.

---

## Gray Area 1 — Capability matrix structure (`docs/reference/linux-capability-matrix.md`)

### Question
How should `linux-capability-matrix.md` (LIN-13) structure the comparison columns?

### Candidate options

| Option | Label | Description |
|--------|-------|-------------|
| 1A | 5-column comparison | Feature \| Windows \| macOS \| iOS \| Android \| Linux — extends ios-capability-matrix.md (3-col) to 5 |
| 1B | Linux-only 3-status | Capability \| Linux Status, inheriting Phase 49 closed set verbatim, + Cross-Platform Equivalences H2 below |
| 1C | Linux↔Windows bilateral | Feature \| Windows \| Linux — mirrors macos-capability-matrix.md 2-col + Cross-Platform Equivalences H2 |
| 1D | Two-view doc | H2-1 Linux 3-status whitelist + H2-2 5-column comparison + Cross-Platform Equivalences H2 |

### Wave-1 Finder raw scoring (lower = fewer weaknesses)
- 1A: 68 pts (4 CRITICAL: closed-set conflict, Phase 58 pre-emption, link-not-copy collision, PITFALL-1 row-count visualization)
- 1B: 19 pts (3 MEDIUM: LIN-13 "vs all 4" coverage gap, Phase 58 link underweighting, Phase 49 whitelist duplication)
- 1C: 34 pts (1 CRITICAL: closed-set column-scope conflict; 4 MEDIUM)
- 1D: 54 pts (3 CRITICAL: DPO-03 duplication, inherits 1A weaknesses, validator scoping ambiguity)

### Wave-2 Adversary disproves (16 weaknesses overturned, +76 gain)
Key disproves with evidence:
- **V-49-07 is Phase-49-scoped** (verified `check-phase-49.mjs` lines 126-149 anchor to `## Supported Management Surface` H2 in `00-enrollment-overview.md` only; Phase 50's `check-phase-50.mjs` handles LIN-13 with column-aware regex — trivial extension): 1A.1, 1C.1, 1D.3 all DISPROVED
- **Cross-Platform Equivalences H2 below main matrix is the established Android sibling pattern** (verified `android-capability-matrix.md` lines 76-92): 1A.6, 1B.4 DISPROVED
- **`platform: all` precedent** in macos-capability-matrix.md frontmatter: 1A.10, 1D.10 DISPROVED
- **PITFALL-1 row-count critique was applied asymmetrically** (only to 1A, not 1C which faces same risk): 1A.4 DISPROVED

### Wave-3 Referee FINAL verdict
**WINNER: 1C — Linux↔Windows bilateral + Cross-Platform Equivalences H2**

Adjusted scores (lower = better): 1C (15) < 1B (24) < 1A (41) < 1D (53)

CRITICAL referee finding both Finder and Adversary missed: **REQUIREMENTS.md traceability line 155 + ROADMAP line 119 LITERALLY use the word "bilateral"** for LIN-13. This is a SCOPE-LOCK violation, not a styling weakness. Disqualifies 1A (5-column), 1B (Linux-only), 1D (two-view) — 1C is the only option that satisfies the literal bilateral mandate. Referee added a 15-point CRIT scope-violation penalty against 1A/1B/1D.

Key sub-decisions locked in CONTEXT.md D-01 through D-06:
- 6 domain H2s with **CA elevated as its own H2** (resolves residual concern 1C.6 — gives PITFALL-2 callout a stable per-domain anchor)
- Frontmatter: `platform: Linux` (vs macOS `platform: all`) per AUDIT-02 C10 path-based scoping
- Linux column inherits 3-status closed set per DPO-02; Windows column uses prose like sibling matrices
- 10 H2s total: 6 domains + Cross-Platform Equivalences + Key Gaps Summary + See Also + Version History

---

## Gray Area 2 — End-user enrollment embed shape (LIN-03 + LIN-06 in `02-enrollment-profile.md`)

### Question
How should `02-enrollment-profile.md` structure the admin-configuration section vs the end-user-enrollment-steps section?

### Candidate options

| Option | Label | Description |
|--------|-------|-------------|
| 2A | Two peer H2s in same file | `## Admin Configuration` + `## End-User Enrollment Steps` |
| 2B | Nested H3 subsection | Admin H2s + final nested `### Validate End-User Flow` |
| 2C | Appendix peer H2 | Admin H2s + final peer `## Appendix: End-User Enrollment Walkthrough` |
| 2D | Two separate files | `02-enrollment-profile.md` (admin) + `02b-end-user-enrollment.md` |
| **2E** | **Split by audience-directory** | **Admin in `admin-setup-linux/02`; end-user in NEW `docs/end-user-guides/linux-intune-portal-enrollment.md` — Wave-3 Referee introduced** |

### Wave-1 Finder raw scoring (lower = better)
- 2A: 47 pts (audience: admin frontmatter violation; validator H2-list contract drift)
- 2B: 42 pts (LIN-06 demotion; SC#3 wording violation)
- 2C: 42 pts (Appendix framing demotion; unprecedented validator pattern)
- 2D: 67 pts (4 CRITICAL: REQUIREMENTS "embedded" violation; ROADMAP 6-file count violation; numbering violation; SC#3 hard-coded path)

### Wave-2 Adversary disproves (13 weaknesses overturned, +81 gain)
Key disproves:
- **iOS 08-user-enrollment.md is `audience: admin`** (NOT end-user) — Finder's iOS precedent for separate-end-user-files was fabricated: 2A.7, 2D.6 DISPROVED
- **`docs/end-user-guides/` directory exists** with `audience: end-user` (Android v1.4 ships `android-work-profile-setup.md`) — established precedent for end-user content, just NOT inside admin-setup-* directories: 2D.7 DISPROVED
- **`applies_to: both`** is shipped convention across 30+ files: 2A.4 DISPROVED
- **GFM H3 anchors are flat-named** (no H2 prefix): 2B.4 DISPROVED
- **Validator regex `\s*$` permits "## Appendix: ..."**: 2C.2 DISPROVED
- **ROADMAP SC#3 "or equivalent guide" exit clause** weakens 2D.4 hard-coded-path: 2D.4 DISPROVED

Adjusted scores after disproves: 2A (17) < 2C (21) < 2B (27) < 2D (52). 2A nominally wins by score — but 2A's #1 critical (audience contract violation) remains CONFIRMED.

### Wave-3 Referee FINAL verdict
**WINNER: Option 2E (referee-introduced) — split by audience-directory**

Justification: matches shipped Android v1.4 BYOD precedent (Phase 37 file `04-byod-work-profile.md` cross-links to `docs/end-user-guides/android-work-profile-setup.md`). 2E satisfies all constraints: preserves audience contract mechanically; preserves admin-setup-linux/ 6-file count; ROADMAP "or equivalent guide" exit clause was authored exactly for this case. Cost: small REQUIREMENTS.md LIN-06 + ROADMAP line 119 wording corrections (D-22 same-commit bundle per Phase 49 D-17/D-18 precedent).

Key sub-decisions locked in CONTEXT.md D-07 through D-11:
- Admin file `02-enrollment-profile.md` mirrors macOS analog H2 list: Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also (5 H2s; no end-user H2)
- End-user file `linux-intune-portal-enrollment.md` mirrors Android end-user precedent H2 list: 5 H2s
- Cross-link contract mandatory in both directions
- REQUIREMENTS.md LIN-06 line 148 + ROADMAP.md Phase 50 line 119 wording corrections in D-22 bundle
- Validator NEGATIVE-asserts admin file does NOT contain end-user H2s (2A/2B/2C drift regression guard)

---

## Gray Area 3 — Cross-Platform Equivalences pair count + content (`linux-capability-matrix.md`)

### Question
How many attributed pairs should `## Cross-Platform Equivalences` include, and which?

### Candidate options

| Option | Label | Description |
|--------|-------|-------------|
| 3A | 2 pairs (SC#4 minimum) | (1) intune-portal ≈ macOS LaunchDaemon; (2) Linux compliance check ≈ iOS MDM check-in |
| 3B | 3 pairs | Above + (3) Linux web-app CA ≈ iOS MAM-WE compliance-lite (per LIN-13 hint) |
| 3C | 4 pairs | Above + (4) Linux dm-crypt+LUKS ≈ Win BitLocker / macOS FileVault encryption-state-only |
| 3D | 5 pairs | Above + (5) Linux Bash custom compliance ≈ Win Intune Remediations PowerShell |

### Wave-1 Finder raw scoring (lower = better)
- 3A: 37 pts (2 CRITICAL Pair-1 attribution defects + missing LIN-13 hint)
- 3B: 62 pts (inherits 3A criticals + Pair 3 PITFALL-2 framing)
- 3C: 81 pts (inherits 3B + Pair 4 binary-pair violation + DRIFT-07 phase-creep + missing glossary anchors)
- 3D: 136 pts (inherits 3C + LIN-DEFER-01 violation + PITFALL-1 verdict-vs-execute violation)

### Wave-2 Adversary disproves (very conservative, +5 gain only)
Only safely disproved 3A.4 (count-comparison invalid given SC#4 says "at least 2"; Phase 34 Android precedent count was Phase-34-specific). All other Finder weaknesses cannot be safely disproved — Pair-1 architectural defects (W-CRIT-1/2/3) are real and structural.

### Wave-3 Referee FINAL verdict
**WINNER: 3B (3 pairs) WITH same-commit SC#4 ROADMAP correction**

Adjusted scores: 3B (62 with rephrased Pair 1) < 3A (72) < 3C (92) < 3D (112).

CRITICAL referee finding: SC#4 literal phrasing has 3 verified CRITICAL defects:
1. **W-CRIT-1:** "intune-portal service" mis-attributed — `_glossary-linux.md:86` says "intune-portal (package)"; the systemd-level analogs are `microsoft-identity-broker` (system-scope) + `intune-agent.timer` (user-scope)
2. **W-CRIT-2:** "macOS LaunchDaemon" has no H3 anchor in `_glossary-macos.md` (verified zero matches)
3. **W-CRIT-3:** LaunchDaemon is system-scope; user-scope macOS analog is **LaunchAgent** — but `intune-agent.timer` is user-scope (per `_glossary-linux.md:82`)

Phase 49 D-17/D-18/CDI-03 same-commit-SC#-correction precedent governs: SC#4 wording is corrected in the Phase 50 atomic commit (per D-22 bundle in CONTEXT.md). Pair 1 rephrased to: `Linux 'intune-portal' deb + 'microsoft-identity-broker' systemd unit ≈ macOS Microsoft Intune Company Portal app + IntuneMDMDaemon LaunchAgent`. All 6 anchor sources for the 3 paired rows already exist in `_glossary-linux.md` and `_glossary-macos.md` — zero glossary appends needed.

Key sub-decisions locked in CONTEXT.md D-12 through D-17.

---

## Gray Area 4 — Commit atomicity strategy

### Question
How should Phase 50's 7 content files + validator + 4 metadata corrections be partitioned into commits?

### Candidate options

| Option | Label | Description |
|--------|-------|-------------|
| 4A | ONE atomic commit | All deliverables + corrections together |
| 4B | TWO commits, content-vs-tooling | 6 admin guides / matrix + validator + CI |
| 4C | TWO commits, dependency-wave | LIN-05-anchor-consumers (00+01+02) / 03+04+05+matrix+validator+CI |
| 4D | THREE commits | admin guides / matrix / validator + CI |

### Wave-1 Finder raw scoring (lower = better)
- 4A: 13 pts (2 MED + 4 LOW; Phase 49 D-22 anti-1-commit precedent cited)
- 4B: 47 pts (3 CRITICAL AUDIT-06 violations)
- 4C: 52 pts (3 CRITICAL + DPO-01 fictional benefit)
- 4D: 57 pts (3 CRITICAL + Phase 49 D-22 explicit 3-commit rejection)

Pre-amble Finder finding: workflow file `audit-harness-v1.5-integrity.yml` already pre-registers `check-phase-50` job with lazy-skip pattern (lines 101-115). "CI registration" is essentially a no-op. Also: REQUIREMENTS.md AUDIT-06 line 87 names v1.4 workflow filename `audit-harness-integrity.yml` — latent contract drift.

### Wave-2 Adversary disproves (12 weaknesses overturned, +73 gain)
Key disproves with evidence:
- **Phase 49 D-22 anti-1-commit ruling was specific to "append-only edits to existing pinned glossaries" bundling** — Phase 50 has zero such edits, so precedent doesn't transfer: 4A.1 DISPROVED
- **Wave parallelization is orthogonal to commit atomicity** (Phase 49 commit-1 itself bundled 4 wave-parallel deliverables): 4A.2 DISPROVED
- **"CI red between commits" overstated** — lazy-skip + C10 = no actual CI red; validator absence is contract violation but NOT CI failure: 4B.2, 4C.2, 4D.2 DISPROVED
- **C13 broken-link is informational-first** per Phase 48 D-08 — "broken anchor refs cascades" claims overstated: 4B.5, 4C.6, 4D.7 DISPROVED
- **Validator + content-it-validates is COHERENT bisect granularity** (Phase 49 commit-1 had 6 concerns and was accepted): 4B.6, 4C.7 DISPROVED
- **Phase 49 D-22's 3-commit rejection was SPECIFICALLY about pin-coord refresh atomicity** (Phase 48 D-14) — Phase 50 has none, so precedent doesn't apply: 4D.4 DISPROVED
- **CI registration as standalone commit has nothing to do** (lazy-skip pre-registered): 4D.9 DISPROVED

Adjusted scores: 4A (2) << 4B (26) < 4C (32) < 4D (36). 4A wins decisively.

### Wave-3 Referee FINAL verdict
**WINNER: 4A — ONE atomic commit**

Adjusted scores: 4A (2) << 4B (26) < 4C (32) < 4D (36).

Phase 50 has all NEW files in scope (no append-only edits to existing pinned files), so Phase 49 D-22 anti-1-commit rationale ("bundles append-only edits with new-file authoring; revert-granularity loss") doesn't transfer. AUDIT-06's "validator alongside content" is satisfied automatically by 4A. The same-commit metadata bundle (D-22) — 2 ROADMAP edits + 2 REQUIREMENTS edits — is enabled by 4A's atomicity.

Key sub-decisions locked in CONTEXT.md D-18 through D-22:
- Single commit: 8 content files + validator + 4 metadata corrections
- Commit message subject: `docs(50): linux admin guides + capability matrix + check-phase-50 validator + roadmap/requirements corrections`
- D-22 metadata bundle: ROADMAP line 119 + ROADMAP line 188 (SC#4) + REQUIREMENTS line 148 (LIN-06 traceability) + REQUIREMENTS line 87 (AUDIT-06 workflow filename)
- Pre-commit gate: 8-step coverage validation per D-20

---

## Cross-decision integration summary

The 4 winning options interlock cleanly via D-22 atomicity bundle:
- **GA-1 1C bilateral matrix** forces **GA-3 3B 3-pair Equivalences placement** (Win|Linux 2-col matrix has limited horizontal coverage; Equivalences H2 is the canonical "vs all 4 platforms" mechanism per LIN-13)
- **GA-2 2E split-by-audience** + **GA-3 3B SC#4 correction** + **GA-4 latent AUDIT-06 drift** all require same-commit metadata edits (4 corrections total)
- **GA-4 4A atomicity** enables all 4 metadata corrections to land in one commit alongside content + validator (Phase 49 D-17/D-18/CDI-03 same-commit-SC#-correction precedent)

---

## Claude's Discretion (CD-rules)
Areas where Phase 50 plan author has flexibility within locked decisions — see CONTEXT.md `<decisions>` section CD-01 through CD-07.

## Deferred Ideas
See CONTEXT.md `<deferred>` section. Notable deferrals:
- 4th equivalence pair (Bash ≈ Intune Remediations) → v1.5.1 LIN-DEFER-01
- 5th equivalence pair (encryption: dm-crypt ≈ BitLocker / FileVault) → Phase 56 DRIFT-07
- BitLocker / FileVault / Intune Remediations / LaunchDaemon / LaunchAgent H3 glossary anchors → out of Phase 50 scope (would expand metadata bundle beyond 4 corrections)

---

*Discussion methodology: 12-agent adversarial review across 3 parallel waves. Wave-1 Finder raw scoring totaled 268 weakness points across 16 options; Wave-2 Adversary disproved 41 weaknesses (+235 gain); Wave-3 Referee added one option (2E), surfaced one scope-lock finding both prior agents missed (REQUIREMENTS line 155 "bilateral"), and identified one architectural correction precedent (Pair 1 rephrasing per Phase 49 D-17/D-18). Final lock: 1C / 2E / 3B-rephrased / 4A — interlocked via D-22 same-commit metadata bundle.*
