# Phase 110: Pillar B + C — Corpus Fixes + MDM Migration Walkthroughs - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-01
**Phase:** 110-pillar-b-c-corpus-fixes-mdm-migration-walkthroughs
**Areas discussed:** iOS walkthrough home & template, iOS migration path coverage, Jamf/Mosyle addendum structure, Corpus-fix precision (FIX-01/02/03)

**Method:** The user selected all four gray areas and instructed: *"For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning"* (standing convention). Resolution ran a three-agent scored adversarial review (Finder → Adversary → Referee, all Opus, opposing incentives). Finder scored **38/40**; Adversary landed **one calibrated overturn** (D2: B→A, +10) and **declined the FIX-03 "edit both blocks" bait** (would have been −20); Referee **re-verified every load-bearing anchor and upheld all six final positions**. User then chose **"Lock all 6 & chain"**.

---

## D1 — iOS walkthrough home & template (MIGF-01 placement)

| Option | Description | Selected |
|--------|-------------|----------|
| A | New standalone `docs/ios-lifecycle/02-mdm-migration.md` mirroring the macOS stage template (parallel `02-` numbering) | ✓ |
| B | Append an "MDM Migration" H2 into an existing ios-lifecycle file | |
| C | Add iOS as a track/section inside the macOS `02-mdm-migration-psso.md` | |

**Adjudication:** Finder A (HIGH) → Adversary CONFIRM → Referee A. `ios-lifecycle/` holds `00-` + `01-` parallel to `macos-lifecycle/`; macOS migration is a dedicated `02-` file; `01-ade-lifecycle.md:15` self-declares the macOS-sibling parallel. B breaks one-topic-per-file; C is `platform: macOS`-gated + FileVault/PSSO-centric (all N/A for iOS) and collides with the D3 addendum.

---

## D2 — iOS migration path coverage (MIGF-01 scope)

| Option | Description | Selected |
|--------|-------------|----------|
| A | In-place "Assign Device Management + Deadline" path ONLY; pre-26 wipe = substantive pointer to `01-ade-lifecycle.md` | ✓ |
| B | BOTH in-place + wipe-and-re-enroll tracks (parallel to macOS B1+B2) | |
| C | Wipe-and-re-enroll only | |

**Adjudication:** Finder **B** (MED-HIGH, self-flagged as the gray call) → Adversary **OVERTURN → A** (+10) → Referee **A** (upheld). Both sides agreed the tech fact (iOS/iPadOS 26+ = wipe-free in-place via non-dismissible full-screen deadline prompt; pre-26 = wipe required; FileVault Key Rotation + PSSO Re-Registration N/A for iOS — web-verified across Apple, Ivanti, Addigy, SimpleMDM, Miradore, Microsoft). Dispute was purely *depth*. A won on three grounds: (1) MIGF-01/SC4 literally scope only the in-place path; (2) link-not-copy — iOS wipe = plain ADE re-enroll already in guide 01, and the macOS file itself thins its own wipe path to a guide-01 handoff (`:505`); (3) iOS has no FileVault/PSSO, so a wipe "track" has zero platform-specific substance (macOS B2 only earned stages from FileVault/PSSO complications). C is factually wrong (ignores the 26+ wipe-free path that is the requirement's core).

**Notes:** Pre-26 pointer must be substantive (wipe statement + Activation Lock consideration + guide-01 handoff), not a bare one-liner.

---

## D3 — Jamf/Mosyle addendum structure + depth (MIGF-02)

| Option | Description | Selected |
|--------|-------------|----------|
| A | One combined `## Appendix` with two H3s (Jamf Pro, Mosyle); conceptual-action + hedged framing | ✓ |
| B | Two separate appendices, one per vendor | |
| C | Interleave Jamf/Mosyle alongside Kandji/Iru inside Stage 2 | |

**Adjudication:** Finder A (HIGH) → Adversary CONFIRM → Referee A. MIGF-02 says "as **an addendum**" (singular) → one section (rejects B); the file is authored around Kandji/Iru as the single source MDM so interleaving shatters the narrative (rejects C). Depth = conceptual + "verify labels on your authoring day" hedging (Jamf/Mosyle consoles unverifiable; matches Stage 2's Kandji/Iru hedge discipline). Flagged: keep headings slug-clean (`### Jamf Pro` / `### Mosyle`, no ` / ` → avoid `jamf-pro--mosyle` double-hyphen trap).

---

## D4 — Corpus-fix precision (FIX-01/02/03)

**All three ROADMAP/REQUIREMENTS anchors confirmed STALE (Phase-109 drift).** Finder HIGH on all three → Adversary CONFIRM all three (declined the FIX-03 "both blocks" bait) → Referee upheld all three.

| Fix | Real live anchor (cited → actual) | Ruling |
|-----|-----------------------------------|--------|
| FIX-01 | `index.md:108` → **`:110`** | 6 → 9 (macOS-specific only; exclude cross-platform 802.1X #38-41); count/enumeration **reword**, no new ref rows (`:112` already refs #35/#36/#37) |
| FIX-02 | `quick-ref-l1.md:101` → **`:106`** | reword #36 from "Escalate L2 via #36 first" → "**Use [#36] runbook** first; escalate if re-registration fails" (match siblings #35/#37) |
| FIX-03 | `common-issues.md:242-247` → **User-Locked-Out block ~`:249-254`** | insert #36 bullet between #37 `:253` and L2 #27 `:254`; do NOT edit the Post-Migration block (cited range is the wrong block) |

**Notes:** FIX-03 was the trap — the cited `:242-247` range points at the "Platform SSO Re-Registration Failure (Post-Migration)" block, which contains neither #37 nor a local-password step; the requirement's semantic text ("intermediate between L1 #37 and L2 #27") is authoritative and matches only the "macOS Local Password: User Locked Out" block.

---

## Claude's Discretion

- D1: exact filename suffix; frontmatter freshness values.
- D2: in-place stage count; Activation Lock as own stage vs release sub-step; depth of the forced-restart-vs-full-screen-lock contrast.
- D3: full vs lighter three-part vendor sub-structure; confidence-callout wording; See Also wiring (navigation-last).
- D4: exact enumeration/link-text/callout phrasing per fix; optional FIX-01 see-also to the 802.1X L1 section (likely unnecessary).

## Deferred Ideas

- Full iOS wipe-and-re-enroll *track* (Finder's Option B) — rejected as over-build vs literal MIGF-01 scope.
- Windows / Android / Linux MDM-migration walkthroughs — not requested by any v1.14 requirement.
- Reconciling the macOS migration file's pre-callout-vocab `> **Important:**` usages to the locked callout set — corpus-hygiene nit, out of Phase 110 scope.
