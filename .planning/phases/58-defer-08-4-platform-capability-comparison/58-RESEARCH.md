# Phase 58: DEFER-08 4-Platform Capability Comparison — Research

**Researched:** 2026-04-30
**Domain:** cross-platform capability documentation (Markdown reference doc + sibling matrix retrofits + validator)
**Confidence:** HIGH (all findings verified against in-repo files; no external/web research required — phase is documentation surgery against an existing 4-matrix corpus)
**Scope:** This research is a verification + implementation-detail pass on top of the 20 D-NN decisions LOCKED in `58-CONTEXT.md` via the 4-gray-area Finder/Adversary/Referee scored adversarial review (2026-04-30). It does NOT re-litigate decisions; it surfaces file-level details, anchor literals, validator templates, and risk-flags the planner needs to translate locked decisions into executable plans.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions (D-01 .. D-20)

All 20 D-NN decisions in `58-CONTEXT.md` are LOCKED via 4-gray-area scored adversarial review. Summary by decision-area (full text in `58-CONTEXT.md` `<decisions>` block):

- **GA-1 (cell shape + link granularity + CA H2 retrofit)** — D-01 verdict-word + markdown-link cell shape (1B); D-02 5-state verdict vocabulary lock (`Supported | Partial | Not supported | Mode-dependent | n/a`); D-03 H2-section anchor link granularity (G2); **D-04 MANDATORY tier-2 Conditional Access H2 retrofit** into macOS / iOS / Android matrices (~15-30 lines per matrix; mirror Linux matrix `## Conditional Access` H2 lines 59-66 structure).
- **GA-2 (multi-mode handling)** — D-05 `Mode-dependent — [matrix](path#anchor)` for divergent-mode platforms (mainly Android); D-06 best-mode (2B) and most-restricted-mode (2C) and stacked sub-rows (2D) all rejected; **D-07 citation correction**: cross-platform routing pattern inheritance is **Phase 56 §D-14**, NOT §D-08 (D-08 is encryption coverage).
- **GA-3 (Windows column source)** — D-08 Windows cells link to `linux-capability-matrix.md#<h2>` as canonical Windows source; D-09 plan-author discretion for ≤3 rows where APv1 vs APv2 dominates the Win-side story (footnote-prose link to `apv1-vs-apv2.md` IN ADDITION to the primary linux-matrix link); D-10 comparison doc intro acknowledgment of asymmetric source choice + v1.6+ deferral path; D-11 filename retained as `4-platform-capability-comparison.md` (legacy DEFER-08 / AECOMPARE-01 token); doc title and intro use "5-platform" wording.
- **GA-4 (cross-ref pattern + Android footer treatment)** — D-12 macOS / iOS / Android matrix intros each receive a single sentence inserted into existing intro paragraph (5C) cross-referencing the new comparison doc; D-13 Linux matrix already has the cross-reference (lines 70 + 112) — Phase 58 closes the `(when shipped)` hedge atomically; **D-14 Android footer F3 treatment** — body under `<a id="deferred-4-platform-unified-capability-comparison">` (lines 132-139) is REMOVED, anchor `<a id>` is PRESERVED, body is REPLACED with single-line forward-link prose to `4-platform-capability-comparison.md` (Phase 45 AEAOSPFULL-09 precedent inheritance — anchor-preservation when stub body retargeted).
- **Cross-cutting** — D-15 pre-edit anchor inventory mandatory (Phase 57 D-32 inheritance) — produce `58-ANCHOR-INVENTORY.md`; D-16 atomic-commit interpretation = plan-series level (per-plan commits acceptable; Phase 57 DPO-Phase57-06 inheritance); D-17 C12 validator scope = link-presence only (`/\[.+\]\(.+\)/`); **D-18 validator-as-deliverable** — `scripts/validation/check-phase-58.mjs` ships in same plan-series as content (~24-28 V-58-NN structural assertions); D-19 `last_verified` 45-day cycle for new comparison doc (locked by SC#5; shorter than per-platform 60-day cycle); D-20 `58-VERIFICATION.md` produced before downstream phases consume.

### Claude's Discretion (verified at plan-time per this RESEARCH.md)

- Specific phrasing of the 5C intro cross-reference sentence (D-12) — recommended literal in CONTEXT.md §specifics; minor wording variation per matrix acceptable.
- Order of plans within Phase 58 (D-16) — plan-author discretion; can interleave or fold parallel waves.
- Specific row/feature granularity within each H2 of the comparison doc (mirror linux-matrix taxonomy when in doubt).
- Which 1-3 rows (if any) carry the optional D-09 footnote-prose link to `apv1-vs-apv2.md` — recommended candidates surfaced in §APv1/APv2 footnote-discretion below.
- Cross-Platform Equivalences supplemental H2 in comparison doc — plan-author discretion; ROADMAP SC#1 locks 6 domain H2s only.

### Deferred Ideas (OUT OF SCOPE)

- Dedicated `windows-capability-matrix.md` — deferred to v1.6+; Phase 58 explicitly documents the deferral path in the comparison doc intro (D-10).
- Cross-Platform Equivalences supplemental H2 — discretion (NOT a locked deliverable).
- Verdict vocabulary expansion to 6+ states — defer to v1.6+ retro if 5-state vocabulary insufficient.
- `apv1-vs-apv2.md` promotion to `docs/reference/` — out of Phase 58 scope.
- `docs/index.md` modifications — Phase 59 owns hub navigation integration.
- C13 broken-link automation promotion — Phase 60 owns.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CLEAN-05 | Admin managing a mixed Win+macOS+iOS+Android+Linux fleet can read a single 5-platform capability comparison reference doc with axes (enrollment, identity/Entra join, app delivery, compliance depth, conditional access scope, monitoring/reporting, patching/updates) — link-not-copy structural reference, no per-cell duplication of platform-specific matrices (closes DEFER-08 / AECOMPARE-01) | 6-H2 lock (ROADMAP SC#1) supersedes the REQUIREMENTS 7-axis enumeration — see §H2 anchor-slug audit + §row taxonomy. PITFALL-7 link-not-copy contract enforced by C12 + V-58-NN. Filename retention per D-11 preserves traceability; doc title/intro use "5-platform" wording. |
| AUDIT-04 (cross-cut) | C12 promotion from informational → blocking once `4-platform-capability-comparison.md` exists (Phase 58 owns this promotion at close, NOT Phase 60) | C12 implementation at `scripts/validation/v1.5-milestone-audit.mjs:505-542` already has the promotion-by-file-existence pre-gate baked in (lines 515-517 — file absent = informational PASS; file present = structural validation runs). See §C12 promotion mechanics. |
| AUDIT-06 (cross-cut) | Each new v1.5 phase ships a `check-phase-NN.mjs` validator alongside content | D-18 lock; ~24-28 V-58-NN structural assertions (smaller than Phase 56's 32 because Phase 58 is doc-authoring + 5 file edits, not 5 new content files; larger than Phase 57's 26 because it adds CA H2 retrofit assertions × 3). See §validator scope. |
| PITFALL-7 (cross-cut) | Link-not-copy whitelist-first pattern is hard architectural rule | D-01 verdict-word + link cell shape; D-17 C12 regex `/\[.+\]\(.+\)/` enforces mechanically; SC#2 enforces by human review. See §verdict vocabulary regex pin. |
| PITFALL-15 (cross-cut) | GFM anchor case-sensitivity hazard | D-03 H2-anchor granularity (NOT row-level — would require manual `<a id>` injection in source matrices = scope creep + GFM case-sensitivity risk). See §GFM H2 anchor slug audit. |
| PITFALL-6 (cross-cut) | Pre-edit anchor inventory mandatory before cross-doc anchor write | D-15 lock; `58-ANCHOR-INVENTORY.md` artifact required before any comparison-doc cell authoring or matrix intro edit. See §pre-edit anchor inventory artifact. |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

This phase is documentation-only. CLAUDE.md scope (PowerShell modules, Python FastAPI backend, TypeScript React frontend, Microsoft Graph API integration, .env handling) does NOT apply to Phase 58 deliverables — Phase 58 touches only:

1. `docs/reference/4-platform-capability-comparison.md` (NEW)
2. `docs/reference/macos-capability-matrix.md` (intro 5C edit + CA H2 retrofit)
3. `docs/reference/ios-capability-matrix.md` (intro 5C edit + CA H2 retrofit)
4. `docs/reference/android-capability-matrix.md` (intro 5C edit + CA H2 retrofit + footer F3 treatment)
5. `docs/reference/linux-capability-matrix.md` (lines 70 + 112 hedge removal only)
6. `scripts/validation/check-phase-58.mjs` (NEW)
7. `scripts/validation/v1.5-milestone-audit.mjs` (C12 promotion at close — informational → blocking)

The "Security Notes" CLAUDE.md section (no commit `.env`, no commit credentials, certificate-based auth for production Azure AD) is preserved by default — Phase 58 touches no credential or backend code.

## Summary

Phase 58 is a **documentation-surgery phase** with 6 substantive deliverables: a new 5-platform reference doc, 3 sibling-matrix CA H2 retrofits, 3 sibling-matrix intro cross-reference edits, an Android footer F3 treatment, a 2-line Linux matrix hedge removal, and a Phase 58 validator. The phase consumes existing capability-matrix surface (link-not-copy), produces no new platform-specific content beyond the 3 retrofitted CA H2s, and closes the C12 informational → blocking promotion at phase close.

The 20 D-NN decisions in CONTEXT.md adjudicated all architectural ambiguity. This research surfaces the **implementation-level details** the planner needs:

1. **GFM H2 anchor slugs are deterministic and stable** for the 6 H2s across all 5 matrices — verified in §H2 anchor-slug audit. Plain-ASCII H2 names with hyphenated 2-word forms slug predictably.
2. **CA H2 retrofit content scope is well-bounded** — Linux matrix lines 59-66 supply a verbatim 4-row template (Device-based CA / Web-app CA via Edge / MAM / Risk-based CA). Per-platform substitutions surveyed in §CA H2 retrofit content scope.
3. **Comparison doc row taxonomy ~6-12 rows per H2** — extracted from existing matrix row sets in §row taxonomy. Recommended unified row sets per H2 surveyed.
4. **APv1/APv2 footnote-discretion candidates** — 3 rows surface naturally: Hybrid Entra Join, Pre-Provisioning (White Glove), Win10 support (§APv1/APv2 candidates).
5. **30-row Windows column anchor inventory** maps cleanly to `linux-capability-matrix.md` H2 anchors (§Windows column anchor inventory).
6. **Android footer F3 mechanics** match Phase 45 AEAOSPFULL-09 precedent verbatim (§Android footer mechanics).
7. **Validator-as-deliverable scope = ~26 V-58-NN assertions** — full template surveyed in §validator scope.
8. **C12 promotion is single-edit** — remove the `informational: true` flag at line 508 of `v1.5-milestone-audit.mjs` once comparison doc exists (§C12 promotion mechanics).
9. **Atomic-commit landing strategy** — recommend progressive-landing per-plan commits (Phase 56/57 model), 6-7 plans, NOT single-atomic-commit (Phase 54/55 model). Volume + risk profile favors progressive (§atomic-commit landing strategy).
10. **Pre-edit anchor inventory artifact format** — direct template from `57-ANCHOR-INVENTORY.md` adapts cleanly (§pre-edit anchor inventory artifact).

**Primary recommendation:** Plan-author should structure Phase 58 as **6 plans + close gate** following Phase 57's progressive-landing pattern. Plan order: pre-edit anchor inventory (mandatory PITFALL-6 baseline) → CA H2 retrofit × 3 sibling matrices (parallelizable; disjoint files) → comparison doc authoring (single new file) → 3 sibling intro cross-ref edits + Linux hedge removal + Android footer F3 (low-risk surface edits; can fold into one plan or split) → validator + C12 promotion → close gate (`58-VERIFICATION.md` + STATE.md + ROADMAP.md). The 30-anchor link inventory should be authored AFTER the 3 CA H2 retrofits land so that all 30 link targets resolve at comparison-doc-authoring time.

## Architectural Responsibility Map

Phase 58 is documentation-only. Capability ownership maps to documentation tier, not application architecture tier.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| 5-platform comparison reference doc | docs/reference/ | — | Cross-platform reference is the canonical `docs/reference/` subdomain (sibling to `linux-capability-matrix.md`, `macos-capability-matrix.md`, `ios-capability-matrix.md`, `android-capability-matrix.md`). PITFALL-7 link-not-copy contract enforces this is a structural reference, not duplicated content. |
| Conditional Access H2 retrofit (3 matrices) | docs/reference/ | — | CA H2 lives at the per-platform matrix level (matching Linux matrix `## Conditional Access` precedent at line 59); the comparison doc does NOT own CA verdict prose — it owns CA-row link-cells targeting the per-platform matrix CA H2s. |
| Intro cross-reference (3 sibling matrices) | docs/reference/ | — | Single-sentence-paragraph-edit pattern (D-12 5C); Phase 56 D-14 blockquote pattern is operations-domain only — NOT applied to reference-domain. |
| Android footer treatment (F3) | docs/reference/ | — | `android-capability-matrix.md` lines 132-139; anchor preservation parallels Phase 45 AEAOSPFULL-09 anchor-preservation precedent (`#deferred-full-aosp-capability-mapping`). |
| Linux matrix hedge removal | docs/reference/ | — | Lines 70 + 112 of `linux-capability-matrix.md`; pure prose-edit surface (no anchor changes). |
| Validator (`check-phase-58.mjs`) | scripts/validation/ | — | File-reads-only / regex-based / no-shared-module per Phase 48 D-25 + Phase 49-57 D-NN lineage. |
| C12 promotion at phase close | scripts/validation/ | — | `v1.5-milestone-audit.mjs` lines 505-542 already has the file-existence pre-gate baked in; promotion is single-edit removal of `informational: true` flag. |

**Why this matters for planning:** plan-author must NOT route any deliverable to `docs/operations/` (would violate Phase 58 ROADMAP scope), to `docs/end-user-guides/` (irrelevant — admin-targeted), to `docs/decision-trees/` (irrelevant — symptom-routing not capability comparison), or to `docs/index.md` (Phase 59 ownership). Reference-domain locality is the entire architectural surface.

## Standard Stack

This is a documentation-only phase. No software libraries are introduced. Tooling stack:

### Core

| Tool / Format | Version | Purpose | Why Standard |
|---------------|---------|---------|--------------|
| GitHub-Flavored Markdown (GFM) | rendered by GitHub.com | Capability matrix tables + comparison doc tables | Project-wide convention; all 4 existing capability matrices use GFM pipe tables |
| YAML frontmatter | embedded in `.md` | `last_verified` / `review_by` / `applies_to` / `audience` / `platform` keys | Project-wide convention since Phase 1; consumed by C13 broken-link harness, regenerate-supervision-pins.mjs, and validator gates |
| Node.js | 22.x (verified `v22.20.0` on local) | Validator runtime (`check-phase-58.mjs`) | Phase 48 D-25 lineage — file-reads-only / no-shared-module / regex-based; same engine as `v1.5-milestone-audit.mjs` |
| ESM modules (`.mjs`) | Node 22 native | Validator file extension | Project-wide convention since Phase 30 — matches `check-phase-30.mjs..check-phase-57.mjs` lineage |

### Supporting

| Tool / Function | Purpose | When to Use |
|-----------------|---------|-------------|
| `fs.readFileSync` | File read for validator | All V-NN-NN assertions; no `glob` / no shared module per Phase 48 D-25 |
| `existsSync` | File-existence check | V-58-01..04 file-existence assertions |
| Regex literal-pin | Anchor / token literal validation | All structural assertions; pinned per D-33 inheritance |
| `--verbose` arg flag | Optional verbose detail per check | Inherited from Phase 48 D-25 + Phase 49-57 lineage |

### Alternatives Considered (and rejected)

| Instead of | Could Use | Why Rejected |
|------------|-----------|--------------|
| Pure regex parsing | AST-based markdown parser (`remark`, `unified`, `mdast`) | Phase 48 D-25 / Phase 49-57 lineage — no shared module, no AST dependency. AST-based parsing requires npm install; CI-runner cold-start cost; out of scope for v1.5 |
| Single atomic commit | Progressive-landing per-plan commits | See §atomic-commit landing strategy — Phase 58 has 6 substantive deliverables across 6 files; progressive aligns with Phase 56/57 risk profile. NOT a locked decision (D-16 plan-author discretion); recommendation only. |
| Row-level anchor links (G3) | H2-section anchor links (G2) | D-03 LOCKED — G3 would require manual `<a id>` injection in source matrices (scope creep) and incurs PITFALL-15 GFM case-sensitivity risk |
| Verdict-only cells (1A) | Verdict + link cells (1B) | D-01 LOCKED — 1A would fail PITFALL-7 link-not-copy SC#2 ("no raw copied content") because verdicts without links cannot route to source matrix |

**No `npm install` required.** Validator is plain Node 22 ESM with `node:fs` / `node:path` / `node:process` only.

**Version verification:** Node version `v22.20.0` verified on local machine (Bash: `node --version`). No package.json / npm dependencies introduced — Phase 48 D-25 file-reads-only contract preserved.

## GFM H2 Anchor Slug Audit (PITFALL-15 mitigation, critical research question 1)

GitHub-Flavored Markdown auto-generates anchor IDs from H2 literal text using the rules: lowercase, replace spaces with hyphens, strip non-alphanumeric (except hyphens). Verified for the 6 locked H2s:

| H2 Literal | GFM Anchor Slug | Stability Assessment |
|------------|-----------------|----------------------|
| `## Enrollment` | `#enrollment` | HIGH — single ASCII word; deterministic |
| `## Configuration` | `#configuration` | HIGH — single ASCII word; deterministic |
| `## App Deployment` | `#app-deployment` | HIGH — 2 ASCII words space→hyphen; deterministic |
| `## Compliance` | `#compliance` | HIGH — single ASCII word; deterministic |
| `## Software Updates` | `#software-updates` | HIGH — 2 ASCII words space→hyphen; deterministic |
| `## Conditional Access` | `#conditional-access` | HIGH — 2 ASCII words space→hyphen; deterministic |

**Verified across all 4 existing matrices (Linux only currently has Conditional Access; macOS/iOS/Android need retrofit per D-04):**

```
$ grep -n "^## " docs/reference/linux-capability-matrix.md docs/reference/macos-capability-matrix.md docs/reference/ios-capability-matrix.md docs/reference/android-capability-matrix.md
```

Output (already executed during research):

- `linux-capability-matrix.md:15:## Enrollment` — slug `#enrollment`
- `linux-capability-matrix.md:24:## Configuration` — slug `#configuration`
- `linux-capability-matrix.md:33:## App Deployment` — slug `#app-deployment`
- `linux-capability-matrix.md:42:## Compliance` — slug `#compliance`
- `linux-capability-matrix.md:51:## Software Updates` — slug `#software-updates`
- `linux-capability-matrix.md:59:## Conditional Access` — slug `#conditional-access`
- `macos-capability-matrix.md:13:## Enrollment` — slug `#enrollment`
- `macos-capability-matrix.md:28:## Configuration` — slug `#configuration`
- `macos-capability-matrix.md:42:## App Deployment` — slug `#app-deployment`
- `macos-capability-matrix.md:56:## Compliance` — slug `#compliance`
- `macos-capability-matrix.md:68:## Software Updates` — slug `#software-updates`
- `macos-capability-matrix.md:78:## Key Gaps Summary` (CA H2 missing — D-04 retrofit target)
- `ios-capability-matrix.md:13:## Enrollment` — slug `#enrollment`
- `ios-capability-matrix.md:30:## Configuration` — slug `#configuration`
- `ios-capability-matrix.md:44:## App Deployment` — slug `#app-deployment`
- `ios-capability-matrix.md:57:## Compliance` — slug `#compliance`
- `ios-capability-matrix.md:70:## Software Updates` — slug `#software-updates`
- `ios-capability-matrix.md:80:## Key Gaps Summary` (CA H2 missing — D-04 retrofit target)
- `android-capability-matrix.md:14:## Enrollment` — slug `#enrollment`
- `android-capability-matrix.md:31:## Configuration` — slug `#configuration`
- `android-capability-matrix.md:44:## App Deployment` — slug `#app-deployment`
- `android-capability-matrix.md:56:## Compliance` — slug `#compliance`
- `android-capability-matrix.md:67:## Software Updates` — slug `#software-updates`
- `android-capability-matrix.md:76:## Cross-Platform Equivalences` (CA H2 missing — D-04 retrofit target)

**5 critical anchor-stability findings:**

1. **All 6 anchor slugs are PITFALL-15-safe** — no capital letters in source H2s; lowercase slug derivation is deterministic. C13 broken-link harness will resolve all 6.
2. **Existing 5 H2 anchors in macOS/iOS/Android matrices are PRE-PHASE-58 STABLE** — Phase 58 retrofits ADD a CA H2 (does not modify existing 5 H2s); existing inbound links remain intact. Append-only contract verified.
3. **CA H2 placement order recommendation:** insert AFTER `## Software Updates` and BEFORE `## Key Gaps Summary` in macOS / iOS matrices, and AFTER `## Software Updates` and BEFORE `## Cross-Platform Equivalences` in Android matrix. This mirrors Linux matrix line 59 placement (`## Conditional Access` between `## Software Updates` at line 51 and `## Cross-Platform Equivalences` at line 68). Validator pin (V-58-NN) recommended.
4. **No anchor collisions detected** — `## Enrollment` does not conflict with any other section (e.g., no `### Enrollment` sub-H3 elsewhere in any of the 5 files at Phase 58 baseline; verified by grep).
5. **GFM resolves these slugs identically across the GitHub.com renderer + VS Code preview + markdown-link-check** — no rendererdivergence concern.

**Risk flag:** if the planner or executor accidentally introduces a Title-Case or Camel-Case H2 variant (e.g., `## App-Deployment` with literal hyphen, or `## Software_Updates` with underscore), GFM slug derivation will diverge and break inbound links. **Mitigation:** validator V-58-NN should pin literal H2 strings via regex `/^## App Deployment$/m` (and equivalents) — same discipline as Phase 57 V-57-25 NEGATIVE iOS H2 anchor stability regression-guard.

## Conditional Access H2 Retrofit Content Scope (D-04, critical research question 2)

The Linux matrix `## Conditional Access` H2 (lines 59-66) provides a 4-row template:

```markdown
## Conditional Access

| Feature | Windows | Linux |
|---------|---------|-------|
| Device-based CA (`Require device to be marked as compliant`) | Supported | Not supported — web-app CA only |
| Web-app CA via Edge | Supported | Supported (Microsoft Edge for Linux 102.x+) |
| MAM (Managed App without enrollment) | n/a (Windows uses Intune client) | Not supported (no Intune SDK for Linux apps; closest analog is web-app CA via Edge — see [Cross-Platform Equivalences](#cross-platform-equivalences)) |
| Risk-based CA | Supported (Entra ID Protection signals) | Partial — risk evaluation works for the user/session but does not factor Linux device state |
```

**Per-platform CA H2 retrofit content recommendations (~15-30 lines per matrix):**

### macOS CA H2 retrofit content outline

Insert after `## Software Updates` (current line 68-end-of-section, ~line 77) and before `## Key Gaps Summary` (current line 78). Recommended content (mirroring Linux matrix template, with macOS-specific verdicts):

```markdown
## Conditional Access

| Feature | Windows | macOS |
|---------|---------|-------|
| Device-based CA (`Require device to be marked as compliant`) | Supported | Supported (compliance evaluation requires user affinity — see [Compliance](#compliance)) |
| Web-app CA via Edge | Supported | Supported (Microsoft Edge / Safari with Single Sign-On Extension) |
| Per-app CA (MAM) | n/a (Windows uses Intune client) | Limited (MAM-WE is iOS-primary; macOS uses configuration profiles + DeviceID surface) |
| App-based CA / Approved Client App | Supported | Supported (via configuration profile + native MDM enrollment) |
| Risk-based CA | Supported (Entra ID Protection signals) | Supported (Entra ID Protection signals; macOS device state factored when user-affinity is present) |
```

**Notes on macOS-specific content:**

- "Userless macOS device compliance" gap (line 65 in current macos-capability-matrix.md) means CA grant control via compliance is conditional on user-affinity presence. This is a known constraint — surface it inline.
- macOS uses Apple Push Notification + DeviceID surface for device identity in CA flows; not necessary to call out unless plan-author judges it adds value.
- Platform SSO (macOS 14+) is configuration-domain not CA-domain — do NOT route to this H2.

### iOS CA H2 retrofit content outline

Insert after `## Software Updates` (current line 70-end-of-section, ~line 79) and before `## Key Gaps Summary` (current line 80). Recommended content:

```markdown
## Conditional Access

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| Device-based CA (`Require device to be marked as compliant`) | Supported | Supported | Supported (supervised attestation strengthens device-state signal; unsupervised devices use jailbreak detection — see [Compliance](#compliance)) |
| Web-app CA via Edge / Safari | Supported | Supported | Supported (Microsoft Edge / Safari with Apple Single Sign-On extension) |
| Per-app CA (MAM-WE) | n/a (Windows uses Intune client) | Limited | Supported (MAM-WE — Managed App Without Enrollment; selective-wipe + per-app PIN; works on devices NOT enrolled in Intune MDM) |
| App-based CA / Approved Client App | Supported | Supported | Supported (Microsoft Authenticator / Outlook / Edge family; per-app token broker) |
| Risk-based CA | Supported (Entra ID Protection signals) | Supported | Supported (Entra ID Protection user-risk signals; iOS device-risk signals via Microsoft Defender for Endpoint — see [Compliance](#compliance)) |
```

**Notes on iOS-specific content:**

- iOS is the strongest CA-attestation platform across all 5 — supervised attestation gates device-based CA confidence.
- MAM-WE is iOS-primary (the canonical analog for org-data protection without device enrollment); call out explicitly.
- Account-Driven User Enrollment (BYOD iOS 15+) preserves device-based CA for the work container.

### Android CA H2 retrofit content outline

Insert after `## Software Updates` (current line 67-end-of-section, ~line 75) and before `## Cross-Platform Equivalences` (current line 76). Recommended content (Android is mode-aware — multi-mode columns):

```markdown
## Conditional Access

| Feature | COBO (Fully Managed) | COPE (WPCO) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|-------------|---------------------|------------------|------------------|------|
| Device-based CA (`Require device to be marked as compliant`) | Supported (Play Integrity attestation; full device-wide compliance signal) | Supported (Play Integrity on work-profile + device-owner side) | Supported (Play Integrity on work-profile only) | Supported (typically not user-CA-bearing — kiosk fleets) | Supported (post-handoff; matches COBO) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (Play Integrity not available on non-GMS hardware) |
| Web-app CA via Edge / Chrome | Supported | Supported | Supported | Supported | Supported (post-handoff) | AOSP stub |
| Per-app CA (MAM) | Supported (Microsoft Intune app DPC + per-app policies) | Supported (work-profile-scoped) | Supported (work-profile-scoped; MAM-WE pattern available for non-enrolled BYOD) | Limited (kiosk fleets typically not MAM-targeted) | Supported (post-handoff) | AOSP stub |
| App-based CA / Approved Client App | Supported | Supported | Supported | Supported | Supported (post-handoff) | AOSP stub |
| Risk-based CA | Supported (Entra ID Protection + Microsoft Defender for Endpoint signals) | Supported | Supported | Supported | Supported (post-handoff) | AOSP stub |
```

**Notes on Android-specific content:**

- Android is the only multi-mode platform; per-mode columns mirror existing Android matrix structure (5 GMS modes + AOSP).
- Reference Phase 54 SSoT for Play Integrity (`docs/operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation`) — DO NOT duplicate verdict-meaning content (PITFALL-7 firewall, same discipline as Phase 57 V-57-21).
- Android mode-divergence is the primary driver for D-05 `Mode-dependent — see matrix` link cells in the comparison doc.
- COPE rows for "Per-app CA" and "Risk-based CA" share verdicts with COBO; plan-author may consolidate or keep verbose per matrix style.

**Key implementation guidance for plan-author:**

- The CA H2 is **the only H2 retrofitted** (5 existing H2s unchanged — append-only contract).
- Mirror the **column count of the host matrix**: macOS = 3 columns (Feature / Windows / macOS), iOS = 4 columns (+iOS), Android = 7 columns (+5 modes + AOSP), Linux = 3 columns (already exists).
- All cells in the new CA H2 retrofit MUST follow the host matrix's existing prose style — do NOT introduce new verdict tokens (the 5-state vocabulary D-02 lock is for the comparison doc, NOT for per-platform matrices which use richer prose).
- Validator V-58-NN should pin the literal `## Conditional Access` H2 in all 4 matrices (Linux + 3 retrofitted) post-Phase-58.

## Comparison Doc Row-Level Taxonomy (critical research question 3)

Each H2 in the comparison doc has rows. ROADMAP SC#1 locks the 6 H2s but NOT the row count per H2. Plan-author derives rows from existing matrix taxonomies. Recommended unified row sets per H2 (~6-12 rows; avoid >12 due to markdown table cell width concerns at 5 platform columns):

### Enrollment (recommended ~10 rows)

Source taxonomy fusion (Linux matrix lines 17-22; macOS matrix lines 15-26; iOS matrix lines 15-28; Android matrix lines 16-27):

1. Zero-touch / autopilot enrollment method
2. Hardware identity / token model
3. Enrollment types / modes available
4. User affinity / userless enrollment
5. Pre-provisioning (White Glove / equivalent)
6. Hybrid Entra Join / domain join
7. Enrollment Status Page (ESP / equivalent)
8. Re-enrollment behavior (blocking screen)
9. BYOD enrollment path
10. Factory-reset / re-provisioning behavior (Android EFRP, etc.)

### Configuration (recommended ~8 rows)

Source taxonomy fusion (Linux matrix lines 26-31; macOS matrix lines 30-40; iOS matrix lines 33-42; Android matrix lines 34-42):

1. MDM configuration profile mechanism
2. Settings Catalog availability + breadth
3. Custom configuration via scripts / policies
4. Declarative Device Management (DDM) applicability
5. Restriction profile breadth
6. Certificate deployment (SCEP / PKCS / ACME)
7. Security baselines availability
8. Hardware / firmware configuration policies

### App Deployment (recommended ~9 rows)

Source taxonomy fusion (Linux matrix lines 35-40; macOS matrix lines 44-54; iOS matrix lines 47-55; Android matrix lines 47-54):

1. Primary app packaging formats
2. Binary package delivery (Win32 / DMG / PKG / IPA / etc.)
3. Script-based delivery
4. Microsoft Store / VPP integration
5. LOB / sideloaded app delivery path
6. Silent install capability
7. App supersedence + dependency graphs
8. App-config (managed configurations / app-config) targeting
9. Apps removed on retirement / unenrollment

### Compliance (recommended ~9 rows)

Source taxonomy fusion (Linux matrix lines 44-49; macOS matrix lines 58-66; iOS matrix lines 59-68; Android matrix lines 58-65):

1. Compliance settings catalog scope (extensive / limited / 4-category narrow)
2. Custom compliance scripts (PowerShell / Shell / Bash)
3. Disk encryption check (BitLocker / FileVault / per-platform)
4. Password / passcode complexity policy
5. Hardware attestation (TPM / T2 / Play Integrity / supervised)
6. Jailbreak / root detection
7. Userless device compliance support
8. Default compliance posture (newly enrolled, not-yet-evaluated)
9. CA grant target (compliance enforcement vs detect-only)

### Software Updates (recommended ~7 rows)

Source taxonomy fusion (Linux matrix lines 53-57; macOS matrix lines 70-76; iOS matrix lines 72-78; Android matrix lines 69-74):

1. Update management mechanism (WUfB / DDM / MDM policy / system update policy / unmanaged)
2. Force OS version / forced update enforcement
3. Update deferral duration
4. Update deadline enforcement
5. Emergency / critical update override (Expedited)
6. Driver / firmware update management
7. Update status reporting

### Conditional Access (recommended ~5 rows)

Mirror Linux matrix lines 59-66 (the only existing CA H2 — D-04 retrofits 3 siblings):

1. Device-based CA (`Require device to be marked as compliant`)
2. Web-app CA via Edge / Safari / Chrome
3. Per-app CA (MAM / MAM-WE / managed app)
4. App-based CA / Approved Client App
5. Risk-based CA (Entra ID Protection)

**Total cell count estimate:** 6 H2s × (~5-10 rows) × 5 platform columns = **150-300 cells**. At ~50% cell-fill rate (some N/A combinations) = **75-150 link-bearing cells**. Validator V-58-NN must scan all rows for link-not-copy compliance per D-17.

**Risk flag:** if plan-author exceeds 12 rows in any H2, GitHub markdown pipe-table rendering at 5 columns may become unreadable at 1024px viewport. **Mitigation:** keep H2s ≤12 rows; if natural taxonomy exceeds 12, split into sub-tables under H3 sub-headings.

## Verdict Vocabulary Regex Pin (D-02, PITFALL-7 mitigation)

D-02 locks the 5-state verdict vocabulary: `Supported | Partial | Not supported | Mode-dependent | n/a`.

**Recommended validator regex (V-58-NN):**

```javascript
const VERDICT_RE = /^(Supported|Partial|Not supported|Mode-dependent|n\/a)\b/;
```

**Per-cell scan pattern (within tableLines):**

```javascript
for (const cell of cells) {
  const trimmed = cell.trim();
  if (!trimmed) continue; // empty cell OK
  // Cell shape: "Verdict — [link text](path#anchor)" OR "n/a" OR "—"
  if (trimmed === '—' || trimmed === 'n/a') continue; // shorthand OK
  // Otherwise must start with one of 5 verdicts AND contain a markdown link
  if (!VERDICT_RE.test(trimmed)) {
    return { pass: false, detail: `Cell ${cellIdx} starts with non-verdict token: ${trimmed.slice(0,60)}` };
  }
  if (!/\[.+\]\(.+\)/.test(trimmed)) {
    return { pass: false, detail: `Cell ${cellIdx} verdict-prefix present but link missing: ${trimmed.slice(0,60)}` };
  }
}
```

**Note on em-dash separator:** the D-01 cell shape example uses `—` (U+2014 EM DASH) between verdict and link. Validator MUST treat em-dash as the separator literal (not en-dash `–` U+2013, not double-hyphen `--`). Pin literal in regex if strict matching desired.

**Existing C12 regex** (`v1.5-milestone-audit.mjs:532`) already enforces link presence (`/\[.+\]\(.+\)/`) — Phase 58 V-58-NN extends this with verdict-vocabulary lock. C12 itself does NOT pin verdict vocabulary (per D-17 lock — C12 is link-presence only).

## Windows Column APv1/APv2 Footnote-Discretion Candidates (D-09, critical research question 4)

D-09 grants plan-author discretion to add footnote-prose links to `apv1-vs-apv2.md` for ≤3 rows where APv1 vs APv2 divergence dominates the Windows-side story. Surveyed `docs/apv1-vs-apv2.md:14-37` (Feature Comparison table, 22 rows):

**3 rows where APv1/APv2 divergence is most dramatic and Windows-cell needs richer story:**

### Row candidate 1: Hybrid Entra Join (Enrollment H2)

- **APv1 verdict:** Supported (with Entra Connect; AAD-joined dual-state) — `apv1-vs-apv2.md:22` literal "Yes"
- **APv2 verdict:** Not supported — `apv1-vs-apv2.md:22` literal "No"
- **Footnote-discretion case:** STRONG — Hybrid Entra Join is APv1-exclusive. The single Windows cell ("Supported") in Hybrid-Entra-Join row obscures this. Recommended footnote-link: `Supported (APv1 only — see [APv1 vs APv2](apv1-vs-apv2.md))`.
- **Source-anchor target:** `apv1-vs-apv2.md` table row at line 22 (anchor: `apv1-vs-apv2.md#feature-comparison`)

### Row candidate 2: Pre-Provisioning (White Glove) (Enrollment H2)

- **APv1 verdict:** Supported (White Glove) — `apv1-vs-apv2.md:20` literal "Yes"
- **APv2 verdict:** Not supported — `apv1-vs-apv2.md:20` literal "No"
- **Footnote-discretion case:** STRONG — Pre-Provisioning is APv1-exclusive. Recommended footnote-link: `Supported (APv1 only — see [APv1 vs APv2](apv1-vs-apv2.md))`.
- **Source-anchor target:** `apv1-vs-apv2.md` table row at line 20

### Row candidate 3: Windows 10 Support (Enrollment H2 or "Minimum OS Version" if such row exists)

- **APv1 verdict:** Supported — `apv1-vs-apv2.md:23` literal "Yes"
- **APv2 verdict:** Not supported (Windows 11 22H2+ only) — `apv1-vs-apv2.md:23` literal "No (Windows 11 only, 22H2+)"
- **Footnote-discretion case:** STRONG — Win10-only deployments must use APv1. Recommended footnote-link: `Supported on Windows 10 (APv1 only); APv2 requires Windows 11 22H2+ — see [APv1 vs APv2](apv1-vs-apv2.md)`.
- **Source-anchor target:** `apv1-vs-apv2.md` table row at line 23

**Other candidate rows (lower priority — plan-author may skip):**

- Self-deploying mode (Enrollment) — APv1-only at `apv1-vs-apv2.md:21`
- Autopilot Reset (Configuration or Enrollment) — APv1-only at `apv1-vs-apv2.md:32`
- HoloLens / Teams Meeting Room (Enrollment scope edge case) — APv1-only at `apv1-vs-apv2.md:33-34`
- Win32 + LOB apps in same deployment (App Deployment) — APv2-only at `apv1-vs-apv2.md:28`
- Near real-time monitoring (Software Updates / Compliance signaling) — APv2-only at `apv1-vs-apv2.md:29`
- Max apps during OOBE: 100 vs 25 (App Deployment) — divergent at `apv1-vs-apv2.md:30`

**Plan-author discretion bound:** D-09 caps at ≤3 rows. The 3 candidates above (Hybrid Entra Join + Pre-Provisioning + Win10 support) are highest-value; recommend planning to include all 3 unless plan-author judges otherwise.

**Implementation pattern for Windows footnote-link cells:**

```markdown
| Hybrid Entra Join | Supported — [matrix](linux-capability-matrix.md#enrollment) ([APv1 only](../apv1-vs-apv2.md)) | n/a | n/a | n/a | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
```

The primary link MUST be `linux-capability-matrix.md#<h2>` per D-08; the footnote-prose link to `apv1-vs-apv2.md` is ADDITIVE in parentheses. NOT a replacement.

**Path note:** `apv1-vs-apv2.md` lives at `docs/apv1-vs-apv2.md` (NOT `docs/reference/`). The comparison doc lives at `docs/reference/4-platform-capability-comparison.md`. Relative link from comparison doc: `../apv1-vs-apv2.md`. Verified directly.

## Linux Matrix Windows Column Anchor Inventory (critical research question 5)

D-08 mandates all Windows cells in the comparison doc link to `linux-capability-matrix.md#<h2>` as canonical Windows source. Mapping table for all 5 platform columns × 6 H2s = 30 cells (some cells are N/A; some are aggregated):

### Comparison doc cell → source matrix anchor mapping

| H2 | Windows column target | macOS column target | iOS column target | Android column target | Linux column target |
|----|----------------------|---------------------|-------------------|----------------------|---------------------|
| Enrollment | `linux-capability-matrix.md#enrollment` | `macos-capability-matrix.md#enrollment` | `ios-capability-matrix.md#enrollment` | `android-capability-matrix.md#enrollment` | `linux-capability-matrix.md#enrollment` |
| Configuration | `linux-capability-matrix.md#configuration` | `macos-capability-matrix.md#configuration` | `ios-capability-matrix.md#configuration` | `android-capability-matrix.md#configuration` | `linux-capability-matrix.md#configuration` |
| App Deployment | `linux-capability-matrix.md#app-deployment` | `macos-capability-matrix.md#app-deployment` | `ios-capability-matrix.md#app-deployment` | `android-capability-matrix.md#app-deployment` | `linux-capability-matrix.md#app-deployment` |
| Compliance | `linux-capability-matrix.md#compliance` | `macos-capability-matrix.md#compliance` | `ios-capability-matrix.md#compliance` | `android-capability-matrix.md#compliance` | `linux-capability-matrix.md#compliance` |
| Software Updates | `linux-capability-matrix.md#software-updates` | `macos-capability-matrix.md#software-updates` | `ios-capability-matrix.md#software-updates` | `android-capability-matrix.md#software-updates` | `linux-capability-matrix.md#software-updates` |
| Conditional Access | `linux-capability-matrix.md#conditional-access` | `macos-capability-matrix.md#conditional-access` (NEW — D-04 retrofit) | `ios-capability-matrix.md#conditional-access` (NEW — D-04 retrofit) | `android-capability-matrix.md#conditional-access` (NEW — D-04 retrofit) | `linux-capability-matrix.md#conditional-access` |

**Note:** Windows column AND Linux column both target `linux-capability-matrix.md#<h2>`. This is by design (D-08) — `linux-capability-matrix.md` is bilateral Windows|Linux. The "Windows column" in linux-matrix is the canonical Windows-bilateral source per D-08; the "Linux column" in linux-matrix is the canonical Linux source. Same file, same H2, same anchor — different columns within the table.

**6 retrofitted CA anchor stability:** Phase 58 deliverables MUST land in this order to avoid broken-link transients:

1. **First** — CA H2 retrofit in macos / ios / android matrices (3 plans — disjoint files, parallelizable)
2. **Second** — comparison doc authoring (consumes the 3 new CA anchors AND the existing 24 anchors)
3. **Third** — sibling-matrix intro cross-ref edits + Linux hedge removal + Android footer F3 (low-risk surface edits)
4. **Fourth** — validator + C12 promotion

Same-plan-series atomicity (D-16) accommodates this ordering even with progressive-landing.

**Risk flag:** during research, the macOS / iOS / Android intros currently link the comparison doc as if it exists (Linux matrix line 70 + 112 use `(when shipped)` hedge). If plan-author authors the comparison doc BEFORE retrofitting CA H2s, the comparison doc's CA cells targeting `macos-capability-matrix.md#conditional-access` will broken-link until the retrofit lands. **Mitigation:** plan ordering above (CA retrofit first, comparison doc second).

**Anchor count summary for `58-ANCHOR-INVENTORY.md` artifact:**

| Anchor Set | Count | Status |
|------------|-------|--------|
| Pre-Phase-58 stable H2 anchors (5 H2s × 4 matrices) | 20 | Already-stable (no Phase 58 modification) |
| Existing CA H2 anchor (Linux only) | 1 | Already-stable |
| New CA H2 anchors (macOS, iOS, Android — D-04 retrofit) | 3 | NEW — Phase 58 plans 58-NN authored |
| Android footer compat-shim anchor (`#deferred-4-platform-unified-capability-comparison`) | 1 | PRESERVED (D-14 F3) |
| Phase 45 AEAOSPFULL-09 precedent anchor (`#deferred-full-aosp-capability-mapping`) | 1 | PRESERVED (NOT touched by Phase 58 — already-stable) |
| **Total anchor literals tracked** | **26** | — |

This count fits cleanly into a `58-ANCHOR-INVENTORY.md` artifact mirroring `57-ANCHOR-INVENTORY.md` format.

## Android Footer F3 Mechanics (D-14, critical research question 6)

Verified `docs/reference/android-capability-matrix.md` lines 132-139 and Phase 45 AEAOSPFULL-09 precedent at lines 124-130 (both blocks read directly during research).

### Current text (lines 132-139, PRE-Phase-58)

```markdown
<a id="deferred-4-platform-unified-capability-comparison"></a>
### Deferred: 4-platform unified capability comparison

This matrix is Android-centric with a bounded 3-row Cross-Platform Equivalences
section. A unified Windows|macOS|iOS|Android 4-platform feature comparison doc
is deferred to v1.5 (AECOMPARE-01). The paired rows in this matrix are NOT a
4-platform comparison — they are mode-level feature parity assertions between
Apple and Android, constrained to the 3 SC#1-named pairs.
```

### Phase 45 AEAOSPFULL-09 precedent (lines 124-130, MODEL for F3 replacement)

```markdown
<a id="deferred-full-aosp-capability-mapping"></a>
### AOSP per-OEM capability mapping

AOSP (Android Open Source Project) devices — RealWear, Zebra, Pico, HTC VIVE
Focus, Meta Quest — appear in this matrix as a single AOSP column. Per-OEM
capability mapping (5-OEM × 4-capability-H2 sub-tables) is documented in
[AOSP OEM Matrix](aosp-oem-matrix.md). See also [AOSP stub](../admin-setup-android/06-aosp-stub.md).
```

### Recommended F3-replacement text (POST-Phase-58)

```markdown
<a id="deferred-4-platform-unified-capability-comparison"></a>
### 4-platform unified capability comparison

For a side-by-side comparison of Android Enterprise capabilities against Windows, macOS, iOS, and Linux across all 6 capability domains (Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access), see [4-Platform Capability Comparison](4-platform-capability-comparison.md).
```

**Key F3 disciplines (from D-14):**

1. **Anchor PRESERVED** — `<a id="deferred-4-platform-unified-capability-comparison"></a>` literal MUST remain unchanged. Validator V-58-NN pins this string.
2. **H3 heading text MAY change** — current `### Deferred: 4-platform unified capability comparison` is a "Deferred:" prefix that becomes inaccurate post-Phase-58. Phase 45 AEAOSPFULL-09 precedent (line 125) shows the heading was updated from "Deferred: full AOSP capability mapping" to "AOSP per-OEM capability mapping" (verified at the version-history note on line 147). Recommend dropping `Deferred:` prefix to match Phase 45 pattern. Plan-author discretion: heading text NOT pinned by D-14 (only anchor + body-replacement).
3. **Body REPLACED with single-line forward-link prose** — D-14 specifies "single-line forward-link prose pointing to `4-platform-capability-comparison.md`". The 7-line body block becomes 1-2 sentences with a markdown link.
4. **No "deferred" or "v1.5" wording in new body** — the body is now an active forward-link, not a deferral notice.

### Validator V-58-NN assertions for Android footer F3

```javascript
// V-58-NN: Android footer anchor preserved
const ANDROID_MATRIX = "docs/reference/android-capability-matrix.md";
const c = readFile(ANDROID_MATRIX);
if (!c.includes('<a id="deferred-4-platform-unified-capability-comparison"></a>')) {
  return { pass: false, detail: 'Android footer anchor "#deferred-4-platform-unified-capability-comparison" missing — D-14 anchor-preservation contract violated' };
}

// V-58-NN: Android footer body retargeted (forward-link present, "Deferred:" prefix on H3 dropped or body-prose-rewritten)
const footerBlock = c.slice(c.indexOf('<a id="deferred-4-platform-unified-capability-comparison"></a>'));
if (!footerBlock.includes('4-platform-capability-comparison.md')) {
  return { pass: false, detail: 'Android footer block missing forward-link to 4-platform-capability-comparison.md (D-14 F3 violation)' };
}
// NEGATIVE: body should NOT contain "deferred to v1.5" or "AECOMPARE-01" wording (active forward-link, not deferral)
if (/deferred to v1\.5|AECOMPARE-01/.test(footerBlock.slice(0, 800))) {
  return { pass: false, detail: 'Android footer body still contains pre-Phase-58 deferral wording — F3 body-replacement incomplete' };
}
```

**Risk flag:** if executor accidentally deletes the `<a id>` line (instead of preserving it), all inbound links to `#deferred-4-platform-unified-capability-comparison` break. **Mitigation:** validator V-58-NN POSITIVE assertion on the literal anchor string.

## Validator-as-Deliverable Scope (D-18, critical research question 7)

D-18 estimates ~24-28 V-58-NN structural assertions. Surveyed `check-phase-50.mjs..check-phase-57.mjs` for V-NN-NN structural assertion patterns (Phase 56 = 32 assertions; Phase 57 = 26 assertions). Recommend **26 V-58-NN assertions** for Phase 58:

### V-58-01..04 — File existence (4 assertions)

```javascript
// V-58-01: docs/reference/4-platform-capability-comparison.md exists
// V-58-02: docs/reference/macos-capability-matrix.md still exists
// V-58-03: docs/reference/ios-capability-matrix.md still exists
// V-58-04: docs/reference/android-capability-matrix.md AND docs/reference/linux-capability-matrix.md still exist
```

### V-58-05..10 — Comparison doc structure (6 assertions)

```javascript
// V-58-05: Comparison doc contains all 6 H2 literals (## Enrollment, ## Configuration, ## App Deployment, ## Compliance, ## Software Updates, ## Conditional Access)
// V-58-06: Comparison doc contains all 5 platform column tokens (Windows, macOS, iOS, Android, Linux)
// V-58-07: Comparison doc every non-empty cell contains markdown hyperlink (regex /\[.+\]\(.+\)/) — link-not-copy contract per D-17 + PITFALL-7
// V-58-08: Comparison doc verdict-vocabulary lock — every link-bearing cell starts with one of 5 LOCKED verdicts (Supported|Partial|Not supported|Mode-dependent|n/a)
// V-58-09: Comparison doc intro contains Windows-source-acknowledgment literal (D-10) — searches for "Windows column" + "linux-capability-matrix.md" within first 30 lines post-frontmatter
// V-58-10: Comparison doc frontmatter has last_verified (45-day cycle per D-19), review_by (last_verified + 45 days), platform key, audience: admin
```

### V-58-11..13 — 3 sibling matrix CA H2 retrofit (3 assertions)

```javascript
// V-58-11: macos-capability-matrix.md contains "## Conditional Access" H2 literal (NEW — D-04 retrofit)
// V-58-12: ios-capability-matrix.md contains "## Conditional Access" H2 literal (NEW — D-04 retrofit)
// V-58-13: android-capability-matrix.md contains "## Conditional Access" H2 literal (NEW — D-04 retrofit)
```

### V-58-14..16 — 3 sibling matrix intro cross-ref present (3 assertions)

```javascript
// V-58-14: macos-capability-matrix.md intro paragraph contains link "4-platform-capability-comparison.md" within first 30 lines
// V-58-15: ios-capability-matrix.md intro paragraph contains link "4-platform-capability-comparison.md" within first 30 lines
// V-58-16: android-capability-matrix.md intro paragraph contains link "4-platform-capability-comparison.md" within first 30 lines
```

### V-58-17..19 — Android footer F3 mechanics (3 assertions)

```javascript
// V-58-17: android-capability-matrix.md preserves anchor "<a id=\"deferred-4-platform-unified-capability-comparison\"></a>" (D-14 anchor-preservation)
// V-58-18: android-capability-matrix.md footer block contains forward-link "4-platform-capability-comparison.md" within 800 chars after the preserved anchor
// V-58-19: NEGATIVE — android-capability-matrix.md footer block does NOT contain "deferred to v1.5" or "AECOMPARE-01" deferral wording (F3 body-replacement contract)
```

### V-58-20..21 — Linux matrix hedge removal (2 assertions)

```javascript
// V-58-20: linux-capability-matrix.md does NOT contain "(when shipped)" literal anywhere (D-13 hedge removal)
// V-58-21: linux-capability-matrix.md still contains "4-platform-capability-comparison.md" link references (lines 70 + 112 prose may be rewritten but link-target preserved)
```

### V-58-22..23 — Phase 45 AEAOSPFULL-09 precedent anchor regression-guard (2 assertions)

```javascript
// V-58-22: NEGATIVE — android-capability-matrix.md preserves Phase 45 anchor "<a id=\"deferred-full-aosp-capability-mapping\"></a>" UNCHANGED (anchor stability — Phase 58 must not touch this)
// V-58-23: NEGATIVE — Phase 32 iOS-matrix structure / Phase 50 Linux-matrix structure / Phase 42 Android-matrix non-CA H2 structure preserved (5 existing H2 literals unchanged in macOS/iOS/Android — append-only contract on H2 level)
```

### V-58-24 — TBD/TODO scan (1 assertion, lineage Phase 53-57)

```javascript
// V-58-24: NEGATIVE — no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in 5 reference files outside Version History
```

### V-58-25..26 — C12 promotion + comparison doc filename retention (2 assertions)

```javascript
// V-58-25: scripts/validation/v1.5-milestone-audit.mjs C12 has promoted from informational to blocking (informational: true flag at line 508 removed) — see §C12 promotion mechanics
// V-58-26: docs/reference/4-platform-capability-comparison.md filename retained (NOT renamed to 5-platform-...) per D-11 traceability lineage
```

**Total: 26 V-58-NN structural assertions.** Plan-author may add 2-3 more if plan structure surfaces additional regression-guards. Cap: 28 (D-18 upper bound).

**Validator implementation pattern:** copy `check-phase-57.mjs` template verbatim; replace pinned literals with Phase 58 anchors / files; preserve `sliceH2Region()` helper for region-scoped assertions; preserve `--verbose` flag handling; preserve `process.exit(failed > 0 ? 1 : 0)` exit code contract.

**Validator size estimate:** ~500-600 lines (Phase 57's check-phase-57.mjs is 565 lines for 26 V-NN-NN; Phase 56 is ~700 lines for 32 V-NN-NN). Phase 58 should land at ~550 lines.

## C12 Promotion Mechanics (AUDIT-04, critical research question 8)

Verified `scripts/validation/v1.5-milestone-audit.mjs:505-542` (full block read during research).

### Current C12 state (PRE-Phase-58)

```javascript
{
  id: 12,
  name: 'C12: 4-platform comparison structural validation',
  informational: true,                                           // ← LINE 508 — current informational flag
  // AUDIT-04: INFORMATIONAL-FIRST. File-existence pre-gate. Promotes to blocking once
  // docs/reference/4-platform-capability-comparison.md exists (Phase 58+).
  // Link-not-copy: every non-empty data cell must contain a markdown hyperlink.
  run() {
    const targetFile = 'docs/reference/4-platform-capability-comparison.md';
    const content = readFile(targetFile);
    if (!content) {
      // File doesn't exist yet (Phase 48-57) -- informational PASS (pre-gate)
      return { pass: true, detail: '(informational)' };
    }
    // File exists (Phase 58+) -- validate structure:
    const platforms = ['Windows', 'macOS', 'iOS', 'Android', 'Linux'];
    const missingPlatforms = platforms.filter(p => !content.includes(p));
    if (missingPlatforms.length > 0) {
      return { pass: false, detail: 'Missing platform columns: ' + missingPlatforms.join(', ') };
    }
    // Link-not-copy check: table rows with non-empty cells must contain [text](link)
    const tableLines = content.split('\n').filter(l => /^\|/.test(l) && !/^\|[-: ]+\|/.test(l));
    const emptyCells = [];
    for (const line of tableLines) {
      const cells = line.split('|').slice(1, -1);
      for (const cell of cells) {
        const trimmed = cell.trim();
        if (trimmed && trimmed !== '—' && trimmed !== 'N/A' && !/\[.+\]\(.+\)/.test(trimmed)) {
          emptyCells.push(trimmed.slice(0, 40));
        }
      }
    }
    if (emptyCells.length > 0) {
      return { pass: false, detail: emptyCells.length + ' cell(s) missing hyperlinks (link-not-copy violation)' };
    }
    return { pass: true, detail: '(informational)' };
  }
}
```

### Single-line patch for C12 promotion (POST-Phase-58)

The promotion is a **one-line removal** at line 508:

**Before (current):**
```javascript
    informational: true,
```

**After (Phase 58 close):**
```javascript
    // informational flag removed at Phase 58 close (AUDIT-04 promotion: informational → blocking once 4-platform-capability-comparison.md exists)
```

OR even simpler — just delete the line. The `informational: true` flag is the sole gate; absence of the flag = blocking by default per the harness runner pattern.

### Side-effect: line 540 detail string

Note line 540: `return { pass: true, detail: '(informational)' };` — this string in the success-path detail field is informational-stylized. Plan-author may optionally update to `return { pass: true, detail: '5 platform columns + all cells link-bearing' };` for clearer post-promotion semantics. NOT required for promotion mechanics.

### Verification: post-promotion C12 behavior

After Phase 58 close (file exists, all cells link-bearing):

- `node scripts/validation/v1.5-milestone-audit.mjs` runs C12 in blocking mode
- C12 checks file existence → passes (file exists)
- C12 checks 5 platform columns present → passes (verified by V-58-06 mirror)
- C12 checks every non-empty cell has hyperlink → passes (verified by V-58-07 mirror)
- Audit harness exits 0 with C12 in PASS state

**Critical:** C12 promotion MUST land in the SAME plan as comparison doc + retrofit deliverables (D-16 plan-series atomicity). If C12 is promoted before the comparison doc lands, C12 will fail (file missing). If C12 is promoted after the comparison doc lands but before the 3 CA retrofits, C12 will pass C12-internal checks but Phase 58 will be in a half-shipped state. **Mitigation:** validator V-58-25 asserts C12 promotion AFTER the file exists — same atomic close commit.

### Phase 60 implications

Phase 60 was previously expected to own the C12 promotion (per ROADMAP entry "AUDIT-04 — 48 (scaffold) → 60 (promote to blocking)"). CONTEXT.md D-18 EXPLICITLY OVERRIDES this — C12 promotion now lands at Phase 58 close, NOT Phase 60. ROADMAP line 130 cross-reference to Phase 60 is informational; Phase 58 owns the actual edit.

**Phase 60 will need to update C12 scope per ROADMAP line 382-383** — "C12 (4-platform comparison structural validation) is blocking — file exists from Phase 58; check scope updated to verify 5 platform columns (including Linux column) + 6 domain H2 anchors". The Phase 60 update is structural-scope expansion (add 6 H2 anchor pin checks); the Phase 58 update is informational → blocking flag removal. Two distinct edits.

## Atomic-Commit Landing Strategy (D-16, critical research question 9)

D-16 grants plan-author discretion on commit atomicity at plan-series level. Surveyed Wave B sibling phase commit patterns:

| Phase | Commit Pattern | Plans | Rationale |
|-------|---------------|-------|-----------|
| Phase 54 (Patch Update Mgmt) | Single atomic commit `aecf014`-style | 9 plans | Append-only H2 contract; D-21 atomicity |
| Phase 55 (App Lifecycle) | Single atomic commit `aecf014` | 7 deliverables (5 content + validator + win32-app-packaging.md edit) | D-21 single atomic; lower complexity |
| Phase 56 (Drift / Tenant Migration) | Progressive-landing 6-7 per-plan commits `d0654d2..3540f4b` + close `aecf014`-style | 6 per-plan commits | Higher write-volume, MEDIUM-confidence framing risk required progressive validation |
| Phase 57 (DEFER-07 Android Nav) | Progressive-landing 8 per-plan commits `1dee562..20dff5d` | 8 plans | Hub-nav surgical retrofit; cross-doc anchor risk required progressive validation |

### Recommendation for Phase 58: Progressive-landing per-plan commits (Phase 56/57 model)

**Rationale:**

1. **Volume:** Phase 58 has 6 substantive deliverables (new comparison doc + 3 CA retrofits + 3 intro cross-refs + Android footer + Linux hedge + validator + C12 promotion). Volume comparable to Phase 57 (8 plans).
2. **Risk profile:** Pre-edit anchor inventory (D-15) + 3 sibling matrix retrofits + new file authoring + footer-anchor-preservation discipline (D-14) all carry per-plan validation needs. Progressive landing allows post-plan validator runs to catch defects early.
3. **Comparison-doc dependency on retrofitted anchors:** plan ordering MUST be (a) CA retrofit first → (b) comparison doc second → (c) intro cross-ref third → (d) validator fourth → (e) C12 promotion fifth → (f) close gate sixth. Progressive landing makes this ordering visible in commit history.
4. **Phase 57 inheritance:** D-16 cites "Phase 57 DPO-Phase57-06 inheritance" explicitly — atomic-commit interpretation reconciled at plan-series level. Phase 56 progressive-landing also matches.
5. **Sequential-executor-on-master mode:** if `/gsd-execute-phase` runs sequentially (not parallel worktrees), each plan can land its own commit cleanly; parallel-worktree mode can still rebase to single atomic if executor prefers.

### Recommended plan structure (~6 plans + close gate)

| Plan | Scope | Files Touched | Commit |
|------|-------|---------------|--------|
| 58-01 | Pre-edit anchor inventory (PITFALL-6 + D-15 baseline) | `58-ANCHOR-INVENTORY.md` (NEW) — phase-dir artifact only | docs(58): pre-edit anchor inventory baseline |
| 58-02 | macOS + iOS + Android CA H2 retrofit (D-04) — parallelizable across 3 disjoint files OR fold into one plan | `macos-capability-matrix.md`, `ios-capability-matrix.md`, `android-capability-matrix.md` | docs(58): retrofit Conditional Access H2 into 3 sibling matrices |
| 58-03 | New 4-platform-capability-comparison.md (D-01..11) — comparison doc authoring (~75-150 link-bearing cells) | `docs/reference/4-platform-capability-comparison.md` (NEW) | docs(58): 5-platform capability comparison reference doc |
| 58-04 | Sibling matrix intro cross-ref (D-12) + Linux matrix hedge removal (D-13) + Android footer F3 (D-14) — fold into one plan (low-risk surface edits across 4 files) | `macos-capability-matrix.md`, `ios-capability-matrix.md`, `android-capability-matrix.md`, `linux-capability-matrix.md` | docs(58): cross-ref + Linux hedge removal + Android footer F3 |
| 58-05 | Validator (D-18) `check-phase-58.mjs` — 26 V-58-NN assertions | `scripts/validation/check-phase-58.mjs` (NEW) | docs(58): check-phase-58 validator (26 V-58-NN) |
| 58-06 | C12 promotion (AUDIT-04) — informational → blocking | `scripts/validation/v1.5-milestone-audit.mjs` | docs(58): promote C12 to blocking (Phase 58 file ships) |
| 58-07 | Close gate — `58-VERIFICATION.md` + STATE.md + ROADMAP.md updates | `.planning/STATE.md`, `.planning/ROADMAP.md`, `58-VERIFICATION.md` (NEW) | docs(58): VERIFICATION + close |

**Plan-author may consolidate** 58-04 + 58-05 + 58-06 into fewer plans if executor parallelism warrants. NOT a strict requirement — D-16 plan-author discretion.

**Plan-author may also choose single atomic commit** (Phase 54/55 model) — if executor prefers single commit, all 6 deliverables can land in one commit per CDI-Phase58-NN reconciliation. The plan-series-level atomicity of D-16 explicitly accommodates either pattern.

## Pre-Edit Anchor Inventory Artifact Format (D-15, critical research question 10)

D-15 mandates `58-ANCHOR-INVENTORY.md` artifact before any cross-doc cell authoring or matrix intro edit. Direct template inheritance from `57-ANCHOR-INVENTORY.md`.

### Recommended `58-ANCHOR-INVENTORY.md` structure (mirroring 57-ANCHOR-INVENTORY.md)

```markdown
# Phase 58 Pre-Edit Anchor Inventory

**Captured:** YYYY-MM-DDTHH:MM:SSZ
**Pre-edit baseline HEAD:** <git rev-parse HEAD output>
**Purpose:** PITFALL-6 + D-15 baseline for append-only contract verification across 5 reference files.
**Owner:** Plan 58-01 (per recommended plan ordering — pre-edit MANDATORY before any docs/reference/*.md edit).

This artifact captures the pre-edit anchor reference map for the 4 capability matrices Phase 58 modifies + any inbound references to the new comparison-doc filename. After all Phase 58 plans land, a post-edit re-grep should produce zero NEW broken-anchor references vs this baseline.

## Pre-retrofit anchor literals (BASELINE — 24 anchors expected)

5 H2 anchors per matrix × 4 matrices = 20 (Linux already has 6 H2s; macOS/iOS/Android have 5 H2s pre-retrofit). Plus Linux CA H2 = 21. Plus Phase 45 AEAOSPFULL-09 anchor + current pre-Phase-58 deferred-4-platform anchor = 23. Plus Android Cross-Platform Equivalences anchor = 24.

| File | Line | H2 / Anchor literal | GFM-derived slug |
|------|------|---------------------|------------------|
| docs/reference/linux-capability-matrix.md | 15 | `## Enrollment` | `#enrollment` |
| docs/reference/linux-capability-matrix.md | 24 | `## Configuration` | `#configuration` |
| docs/reference/linux-capability-matrix.md | 33 | `## App Deployment` | `#app-deployment` |
| docs/reference/linux-capability-matrix.md | 42 | `## Compliance` | `#compliance` |
| docs/reference/linux-capability-matrix.md | 51 | `## Software Updates` | `#software-updates` |
| docs/reference/linux-capability-matrix.md | 59 | `## Conditional Access` | `#conditional-access` |
| docs/reference/macos-capability-matrix.md | 13 | `## Enrollment` | `#enrollment` |
| docs/reference/macos-capability-matrix.md | 28 | `## Configuration` | `#configuration` |
| docs/reference/macos-capability-matrix.md | 42 | `## App Deployment` | `#app-deployment` |
| docs/reference/macos-capability-matrix.md | 56 | `## Compliance` | `#compliance` |
| docs/reference/macos-capability-matrix.md | 68 | `## Software Updates` | `#software-updates` |
| docs/reference/ios-capability-matrix.md | 13 | `## Enrollment` | `#enrollment` |
| docs/reference/ios-capability-matrix.md | 30 | `## Configuration` | `#configuration` |
| docs/reference/ios-capability-matrix.md | 44 | `## App Deployment` | `#app-deployment` |
| docs/reference/ios-capability-matrix.md | 57 | `## Compliance` | `#compliance` |
| docs/reference/ios-capability-matrix.md | 70 | `## Software Updates` | `#software-updates` |
| docs/reference/android-capability-matrix.md | 14 | `## Enrollment` | `#enrollment` |
| docs/reference/android-capability-matrix.md | 31 | `## Configuration` | `#configuration` |
| docs/reference/android-capability-matrix.md | 44 | `## App Deployment` | `#app-deployment` |
| docs/reference/android-capability-matrix.md | 56 | `## Compliance` | `#compliance` |
| docs/reference/android-capability-matrix.md | 67 | `## Software Updates` | `#software-updates` |
| docs/reference/android-capability-matrix.md | 76 | `## Cross-Platform Equivalences` | `#cross-platform-equivalences` |
| docs/reference/android-capability-matrix.md | 124 | `<a id="deferred-full-aosp-capability-mapping"></a>` (Phase 45 precedent — preserve) | `#deferred-full-aosp-capability-mapping` |
| docs/reference/android-capability-matrix.md | 132 | `<a id="deferred-4-platform-unified-capability-comparison"></a>` (D-14 F3 — preserve) | `#deferred-4-platform-unified-capability-comparison` |

## Post-retrofit anchor literals (POST-Phase-58 EXPECTED — 27 anchors)

Add 3 new CA H2 anchors (D-04 retrofit):

| File | New H2 line (estimated) | H2 / Anchor literal | GFM-derived slug |
|------|------------------------|---------------------|------------------|
| docs/reference/macos-capability-matrix.md | ~78 (after `## Software Updates` body, before `## Key Gaps Summary`) | `## Conditional Access` | `#conditional-access` |
| docs/reference/ios-capability-matrix.md | ~80 (after `## Software Updates` body, before `## Key Gaps Summary`) | `## Conditional Access` | `#conditional-access` |
| docs/reference/android-capability-matrix.md | ~76 (after `## Software Updates` body, before `## Cross-Platform Equivalences`) | `## Conditional Access` | `#conditional-access` |

## Inbound references to comparison-doc filename (PRE-Phase-58 EXPECTED — 2 references)

```
$ grep -rn "4-platform-capability-comparison.md" docs/
docs/reference/linux-capability-matrix.md:70:  See Phase 58's [4-Platform Capability Comparison](4-platform-capability-comparison.md) (when shipped) for that.
docs/reference/linux-capability-matrix.md:112: - [4-Platform Capability Comparison](4-platform-capability-comparison.md) — when Phase 58 ships
```

Both references resolve once Phase 58 plan 58-03 authors the file. The `(when shipped)` hedge on line 70 + line 112 prose is rewritten by plan 58-04 (D-13).

## Inbound references to deferred-4-platform-unified-capability-comparison anchor (PRE-Phase-58)

```
$ grep -rn "deferred-4-platform-unified-capability-comparison" docs/
docs/reference/android-capability-matrix.md:82:see the [4-platform deferral footer](#deferred-4-platform-unified-capability-comparison) below.
docs/reference/android-capability-matrix.md:132:<a id="deferred-4-platform-unified-capability-comparison"></a>
```

Anchor preservation per D-14 ensures both references remain stable post-Phase-58.

## Verification command (re-run post-edit, expect 27-anchor pre+post combined output)

```
grep -nE "^## (Enrollment|Configuration|App Deployment|Compliance|Software Updates|Conditional Access|Cross-Platform Equivalences)" docs/reference/{linux,macos,ios,android}-capability-matrix.md
```

```
grep -n '<a id="' docs/reference/android-capability-matrix.md
```

## Summary Counts

| Pattern | Pre-Phase-58 Count | Post-Phase-58 Expected | Delta |
|---------|-------------------|------------------------|-------|
| `## Enrollment` H2 | 4 (one per matrix) | 4 | 0 |
| `## Configuration` H2 | 4 | 4 | 0 |
| `## App Deployment` H2 | 4 | 4 | 0 |
| `## Compliance` H2 | 4 | 4 | 0 |
| `## Software Updates` H2 | 4 | 4 | 0 |
| `## Conditional Access` H2 | 1 (Linux only) | 4 (Linux + 3 retrofitted) | +3 |
| `## Cross-Platform Equivalences` H2 | 2 (Linux + Android) | 2 | 0 |
| `<a id="deferred-..." anchors | 2 (both in Android matrix) | 2 (preserved) | 0 |
| `4-platform-capability-comparison.md` filename references | 2 | ~5+ (Linux + 3 retrofitted matrix intros + Android footer) | +3 to +N |
```

**This baseline is auditable and persists for `58-VERIFICATION.md` cross-check at Phase 58 close.**

## Architecture Patterns

### System Architecture Diagram

```
                                                     ┌──────────────────────────────────┐
                                                     │ docs/reference/                  │
                                                     │ 4-platform-capability-comparison │
                                                     │ .md (NEW — Phase 58)             │
                                                     │                                  │
                                                     │ 6 H2 sections × 5 platform cols  │
                                                     │ ~75-150 link-bearing cells       │
                                                     │ Frontmatter: last_verified 45-day │
                                                     │              cycle (D-19)        │
                                                     └─────────────────┬────────────────┘
                                                                       │
                                                                       │ Each cell links to
                                                                       │ source matrix H2 anchor
                                                                       │ (link-not-copy contract)
                                                                       │
                              ┌────────────────────────────────────────┼────────────────────────────────────────┐
                              ▼                                        ▼                                        ▼
              ┌─────────────────────────────┐         ┌────────────────────────────┐         ┌──────────────────────────────┐
              │ linux-capability-matrix.md  │         │ macos-capability-matrix.md │         │ ios-capability-matrix.md     │
              │                             │         │                            │         │                              │
              │ 6 H2s already present       │         │ 5 H2s + ## CA NEW (D-04)   │         │ 5 H2s + ## CA NEW (D-04)     │
              │ Win column = bilateral src  │         │ Intro 5C edit (D-12)       │         │ Intro 5C edit (D-12)         │
              │   (per D-08 Win source)     │         │                            │         │                              │
              │ Lines 70+112 hedge removal  │         │                            │         │                              │
              │   (D-13)                    │         │                            │         │                              │
              └─────────────────────────────┘         └────────────────────────────┘         └──────────────────────────────┘
                              ▲                                        ▲                                        ▲
                              │                                        │                                        │
                              │ Win column also targets here           │                                        │
                              │ (per D-08 — Linux matrix is bilateral) │                                        │
                              │                                        │                                        │
                              └─────────────────┬──────────────────────┴────────────────────┬───────────────────┘
                                                │                                           │
                                                │                                           │
                                                ▼                                           ▼
                              ┌──────────────────────────────────┐         ┌────────────────────────────────────┐
                              │ android-capability-matrix.md     │         │ docs/apv1-vs-apv2.md (footnote-     │
                              │                                  │         │ discretion target — D-09)          │
                              │ 5 H2s + ## CA NEW (D-04)         │         │                                    │
                              │ + Cross-Platform Equivalences H2 │         │ ≤3 rows (Hybrid Entra Join,        │
                              │ Intro 5C edit (D-12)             │         │ Pre-Provisioning, Win10) carry      │
                              │ Footer F3 — anchor preserved     │         │ ADDITIVE footnote-prose link        │
                              │ + body retargeted to forward-link│         │ alongside primary linux-matrix link │
                              │ (D-14 anchor preservation)       │         │                                    │
                              └──────────────────────────────────┘         └────────────────────────────────────┘

                              ┌──────────────────────────────────────────────────────────────┐
                              │ scripts/validation/                                           │
                              │   ├── check-phase-58.mjs (NEW — D-18)                         │
                              │   │     26 V-58-NN structural assertions                       │
                              │   │     File-reads-only / no-shared-module / regex-based       │
                              │   │     Same Node 22 pattern as check-phase-50..57.mjs         │
                              │   │                                                            │
                              │   └── v1.5-milestone-audit.mjs (MODIFIED — AUDIT-04)           │
                              │         C12 informational: true flag REMOVED at Phase 58 close │
                              │         (single-line patch at line 508 of validator)           │
                              └──────────────────────────────────────────────────────────────┘

  Plan ordering (D-16 plan-series-level atomicity):
    58-01 Pre-edit anchor inventory artifact (PITFALL-6 baseline)
       │
       ▼
    58-02 CA H2 retrofit × 3 sibling matrices  ──parallelizable──→  Disjoint files, can land same plan or split
       │
       ▼
    58-03 Comparison doc authoring (consumes 24 existing + 3 retrofitted anchors)
       │
       ▼
    58-04 Sibling intro cross-refs + Linux hedge removal + Android footer F3
       │
       ▼
    58-05 check-phase-58.mjs validator + V-58-25 C12-promotion regression-guard
       │
       ▼
    58-06 C12 informational → blocking promotion at v1.5-milestone-audit.mjs:508
       │
       ▼
    58-07 Close gate — 58-VERIFICATION.md + STATE.md + ROADMAP.md + commit
```

### Recommended Plan Decomposition (Phase 56/57 progressive-landing model)

```
.planning/phases/58-defer-08-4-platform-capability-comparison/
├── 58-CONTEXT.md (already exists — 20 D-NN locked)
├── 58-DISCUSSION-LOG.md (already exists)
├── 58-RESEARCH.md (this file — newly authored)
├── 58-ANCHOR-INVENTORY.md (NEW — plan 58-01 produces)
├── 58-01-PLAN.md  (Pre-edit anchor inventory — D-15 + PITFALL-6)
├── 58-02-PLAN.md  (CA H2 retrofit × 3 — D-04)
├── 58-03-PLAN.md  (Comparison doc — D-01..11)
├── 58-04-PLAN.md  (Cross-ref + hedge removal + Android F3 — D-12, D-13, D-14)
├── 58-05-PLAN.md  (check-phase-58.mjs — D-18)
├── 58-06-PLAN.md  (C12 promotion — AUDIT-04)
├── 58-07-PLAN.md  (Close gate — D-20 VERIFICATION.md + STATE/ROADMAP)
└── 58-NN-SUMMARY.md (per-plan summaries; created by gsd-execute-phase)
```

### Pattern 1: Sibling-matrix CA H2 retrofit (D-04 mandatory tier-2)

**What:** Insert a new `## Conditional Access` H2 + table into 3 existing capability matrices (macOS, iOS, Android) without modifying any other content.
**When to use:** Phase 58 mandatory tier-2 retrofit per D-04 (rejected tier-1 link-Compliance-with-acknowledgment because it was misleading-by-construction).
**Example placement (macOS matrix):**

```markdown
[lines 68-77 unchanged: ## Software Updates section + table]

## Conditional Access

| Feature | Windows | macOS |
|---------|---------|-------|
| Device-based CA (`Require device to be marked as compliant`) | Supported | Supported (compliance evaluation requires user affinity — see [Compliance](#compliance)) |
| ...

[line 78+ unchanged: ## Key Gaps Summary onwards]
```

### Pattern 2: Single-sentence intro cross-reference (D-12 5C)

**What:** Insert a single sentence into the existing intro paragraph of macOS / iOS / Android matrices cross-referencing the new comparison doc.
**When to use:** Phase 58 sibling-matrix updates per D-12 (rejected blockquote pattern 5B because operations-domain only; rejected new H2 5D because structurally additive).
**Example (macOS matrix line 11 — current intro paragraph):**

Current:
```markdown
This document compares Intune management capabilities between Windows and macOS across five operational domains. This is a feature parity analysis, not a terminology comparison -- for concept mapping between platforms, see [Windows vs macOS Concept Comparison](../windows-vs-macos.md). For macOS admin setup guides, see [macOS Admin Setup Overview](../admin-setup-macos/00-overview.md).
```

Phase-58 edit (recommended insertion at end of paragraph):
```markdown
This document compares Intune management capabilities between Windows and macOS across five operational domains. This is a feature parity analysis, not a terminology comparison -- for concept mapping between platforms, see [Windows vs macOS Concept Comparison](../windows-vs-macos.md). For macOS admin setup guides, see [macOS Admin Setup Overview](../admin-setup-macos/00-overview.md). For a side-by-side comparison of macOS capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md).
```

(Substitute `{platform}` per matrix: `macOS` for macOS matrix, `iOS` for iOS matrix, `Android` for Android matrix.)

Note: the recommended literal in CONTEXT.md §specifics is "For a side-by-side comparison of {platform} capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md)." Plan-author may also vary the wording; minor variation acceptable per D-12 discretion.

Also: the macOS matrix description currently says "five operational domains" (line 11). Plan-author should NOT change this number to "six" even after CA H2 retrofit — the intro paragraph describes the BILATERAL macOS|Windows scope (5 H2s pre-Phase-58) AND if Phase 58 plan author judges "six" more accurate post-retrofit, this is an additional minor edit to consider. Recommend: leave "five" as is (the Conditional Access H2 is auxiliary; the 5 main domains remain).

### Pattern 3: Android footer F3 anchor preservation (D-14)

**What:** Replace the body of an existing `<a id>` block while preserving the anchor as a compat shim.
**When to use:** Phase 58 Android footer F3 per D-14 (Phase 45 AEAOSPFULL-09 inheritance).
**Example transformation:** see §Android footer F3 mechanics above.

### Pattern 4: Linux matrix hedge removal (D-13)

**What:** Single-line prose edit to remove `(when shipped)` and `— when Phase 58 ships` hedge wording.
**When to use:** Phase 58 plan 58-04 — closes hedge atomically once comparison doc lands.
**Lines affected (verified):**

- `linux-capability-matrix.md:70`: current text `... see Phase 58's [4-Platform Capability Comparison](4-platform-capability-comparison.md) (when shipped) for that.` → strike `(when shipped) ` token
- `linux-capability-matrix.md:112`: current text `- [4-Platform Capability Comparison](4-platform-capability-comparison.md) — when Phase 58 ships` → strike ` — when Phase 58 ships` token (or rewrite to `- [4-Platform Capability Comparison](4-platform-capability-comparison.md) — 5-platform side-by-side reference`)

### Anti-Patterns to Avoid

- **Hand-rolling row-level anchors via `<a id>` injection:** D-03 LOCKED at G2 H2-anchor granularity; G3 row-anchor was rejected for PITFALL-15 hazard + scope creep. Do NOT add `<a id="enrollment-method-row">` etc. to source matrices.
- **Duplicating verdict-meaning prose in comparison doc cells:** PITFALL-7 link-not-copy contract; D-01 cell shape allows verdict + link only. Do NOT inline 1-line caveats in cells (1C variant rejected).
- **Renaming the comparison doc filename:** D-11 LOCKED at `4-platform-capability-comparison.md`. Doc TITLE and INTRO use "5-platform" wording; only the FILENAME retains "4-platform" token for traceability lineage.
- **Single atomic commit when progressive-landing fits the risk profile:** Phase 56/57 demonstrate progressive-landing for high-anchor-risk phases. Phase 58 fits that profile.
- **Promoting C12 BEFORE the comparison doc lands:** C12 promotion logic at line 515-517 is file-existence-gated; if the file is missing, C12 returns informational PASS regardless of the flag. But if the validator file change lands first (in a separate plan) and the comparison doc never lands, C12 silently masks the gap. **Mitigation:** plan ordering keeps C12 promotion in the close-gate plan, AFTER all content lands.
- **Modifying the Phase 45 AEAOSPFULL-09 anchor:** `<a id="deferred-full-aosp-capability-mapping"></a>` at android-matrix line 124 is OUT OF PHASE 58 SCOPE. V-58-22 NEGATIVE regression-guards.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cross-platform capability data structure | Custom JSON/YAML capability registry | Markdown tables in `.md` files | Project-wide convention; all 4 existing capability matrices are markdown; consumed by humans + GFM rendering + audit harness regex; no programmatic consumers |
| Row-level anchor scheme for cell-link granularity | `<a id="capability-row-N">` injection in source matrices | H2-section anchor links (D-03 G2) | Rejected G3 in adversarial review — manual `<a id>` injection is scope creep; PITFALL-15 case-sensitivity hazard |
| Verdict vocabulary expansion | New verdict tokens beyond 5-state | `Supported \| Partial \| Not supported \| Mode-dependent \| n/a` (D-02) | Locked vocabulary; existing matrix prose tokens already use these 5 (linux:65 "Not supported", linux:19 "Supported", linux:31 "Partial", android:75 "N/A", Phase 56 D-14 "Mode-dependent" analog) |
| Cross-platform routing blockquote in comparison doc intro | `> **Platform applicability:**` blockquote | Plain paragraph intro + Windows-source acknowledgment (D-10) | Phase 56 D-14 is operations-domain only; `docs/reference/` capability matrices use plain paragraph intros |
| Inline footnote-prose in comparison doc cells | Footnote markdown `[^1]` syntax in cells | Optional ADDITIVE markdown link in parentheses (D-09) | GitHub markdown footnotes are post-table; inline parenthetical link is more discoverable; per D-09 ≤3 rows |
| Validator framework / npm package | `markdownlint`, `remark`, `mdast`, `unified` | File-reads-only / regex-based per Phase 48 D-25 | No npm install; no shared module; CI cold-start cost; consistency with check-phase-50..57.mjs lineage |
| Manual GFM slug computation | String manipulation library | Trust GFM auto-slug derivation (verified deterministic for all 6 H2s) | All 6 H2 names are plain-ASCII 1-2-word lowercase-after-slug; deterministic |
| Markdown table rendering / cell-width balancing | Custom table-formatter | Plain GFM pipe tables; cap rows at ≤12 per H2 | GFM renders pipe tables natively; row-cap mitigates 5-column readability concerns |

**Key insight:** Phase 58 is **all about restraint**. The phase consumes existing matrix surface; the only NEW content is (a) the comparison doc structure shell (rows + cells with verdicts + links), (b) the 3 retrofitted CA H2 tables (~15-30 lines each), (c) ~5 lines of intro cross-ref edits, (d) ~7 lines of Android footer F3 replacement, (e) the validator + C12 promotion. Total NEW prose is bounded; total DERIVED structure (link assertions, anchor references) is the bulk of the work.

## Common Pitfalls

### Pitfall 1: GFM anchor case-sensitivity drift (PITFALL-15)

**What goes wrong:** Author capitalizes an H2 letter or introduces underscore/hyphen variation; GFM slug derivation diverges; comparison doc links break.
**Why it happens:** Manual H2 authoring without slug-discipline; copy-paste from non-GFM source.
**How to avoid:** Validator V-58-NN regex-pin literal `^## App Deployment$` (and all 6 H2s); same discipline as Phase 57 V-57-25 NEGATIVE iOS H2 anchor stability.
**Warning signs:** Pre-edit anchor inventory contains lowercase/hyphenated slug; post-edit grep returns capitalized/underscored variant.

### Pitfall 2: Cell prose-length drift breaking PITFALL-7 / SC#2 (link-not-copy)

**What goes wrong:** Author drops verdict word and inlines 1-line caveat in cell; SC#2 ("no raw copied content") fails human review.
**Why it happens:** Plan-author tries to convey nuance not captured by 5-state vocabulary; D-05 `Mode-dependent — see matrix` doesn't feel sufficient.
**How to avoid:** Strict adherence to D-01 cell shape (verdict + link); D-05 `Mode-dependent — see matrix` for divergent-mode platforms; if more nuance needed, plan-author adds D-09 footnote-prose link (capped at ≤3 rows).
**Warning signs:** Cell length >100 chars; cell contains commas/semicolons (multi-clause prose); cell contains parenthetical caveat without `apv1-vs-apv2.md` link.

### Pitfall 3: Comparison doc filename rename to "5-platform-..."

**What goes wrong:** Plan-author or executor judges that "5-platform" is more accurate than "4-platform" filename; renames file; breaks D-11 traceability lineage; breaks Linux matrix lines 70 + 112 + Android footer F3 forward-link references.
**Why it happens:** Cognitive dissonance — doc covers 5 platforms, filename says "4-platform".
**How to avoid:** D-11 LOCKED — filename retained; doc TITLE and INTRO use "5-platform" wording; validator V-58-26 asserts filename literal.
**Warning signs:** Plan PR contains `git mv 4-platform-capability-comparison.md 5-platform-...md`; filename appears anywhere as `5-platform-capability-comparison.md`.

### Pitfall 4: Android footer anchor accidentally deleted

**What goes wrong:** Executor sees Android footer block with stale "deferred to v1.5" wording, deletes the entire `<a id="deferred-4-platform-unified-capability-comparison">` block (anchor + body); breaks inbound links from `android-capability-matrix.md:82` ("4-platform deferral footer") and any external/internal references.
**Why it happens:** F3 instructions say "remove body"; executor over-interprets as "remove block".
**How to avoid:** D-14 LOCKED on anchor preservation; validator V-58-17 POSITIVE assertion on literal anchor string; pre-edit anchor inventory captures both line 82 reference AND line 132 anchor before edit.
**Warning signs:** Post-edit grep on `deferred-4-platform-unified-capability-comparison` returns 0 or 1 (should return 2 — line 82 reference + line 132 anchor).

### Pitfall 5: C12 promotion lands BEFORE comparison doc

**What goes wrong:** Plan-author ships C12 informational → blocking edit in plan 58-NN before comparison doc exists; C12 file-existence pre-gate (line 515-517) returns informational PASS regardless; on next milestone audit run, C12 silently appears as "blocking + PASS" with no validation.
**Why it happens:** Plan ordering not enforced; executor ships validator change first.
**How to avoid:** Plan 58-06 (C12 promotion) MUST run AFTER plan 58-03 (comparison doc) lands. Validator V-58-25 asserts both file-exists AND informational-flag-removed.
**Warning signs:** Audit harness shows C12 as `(informational)` despite blocking promotion intent; comparison doc is missing from `docs/reference/`.

### Pitfall 6: macOS / iOS matrix intro paragraph "five operational domains" wording becomes inaccurate post-CA-retrofit

**What goes wrong:** Post-CA-retrofit, macOS / iOS matrices have 6 main H2s (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access). The intro paragraph still says "five operational domains" (verified at macos-capability-matrix.md:11 and ios-capability-matrix.md:11). C13 broken-link harness will not catch this; only human readers will.
**Why it happens:** D-12 5C focuses on cross-ref insertion; doesn't speak to "five vs six" rewording.
**How to avoid:** Plan-author 58-04 should consider updating "five" → "six" in macOS / iOS intro paragraphs as part of the cross-ref edit. Optional. NOT required by D-12 strict reading.
**Warning signs:** Reader of post-Phase-58 macOS matrix sees H2 count mismatch with intro prose.

### Pitfall 7: Linux matrix line 11 intro paragraph not updated

**What goes wrong:** Linux matrix intro paragraph at line 11 already references the (when-shipped) comparison doc; once shipped, the intro paragraph is fine — no change needed. But if plan-author treats Linux matrix the same as macOS/iOS/Android (D-12 5C edit), they may incorrectly add a duplicate intro cross-ref sentence.
**Why it happens:** Symmetry instinct — "all 4 sibling matrices get the 5C edit".
**How to avoid:** D-13 LOCKED — Linux matrix already has the cross-reference (lines 70 + 112). Phase 58 only closes the `(when shipped)` hedge; do NOT add a 4th intro cross-ref sentence.
**Warning signs:** Linux matrix has 2 intro paragraphs after Phase 58, not 1.

### Pitfall 8: Frontmatter `last_verified` date mismatched against commit date

**What goes wrong:** Plan-author writes `last_verified: 2026-04-30` in comparison doc frontmatter but commits on 2026-05-01; validator passes (45-day cycle still valid) but harness `last_verified vs file-mtime` heuristics may flag.
**Why it happens:** Plan authored on day N, committed on day N+1; default-time `last_verified: ${TODAY}` is templated.
**How to avoid:** Plan-author 58-03 should set `last_verified` to the actual commit date, not the authoring date. Validator V-58-10 asserts presence + 45-day cycle (review_by = last_verified + 45 days).
**Warning signs:** `review_by - last_verified ≠ 45 days`.

## Code Examples

Verified patterns from in-repo source files:

### Comparison doc frontmatter template (D-19 45-day cycle)

```yaml
---
last_verified: 2026-04-30           # Replace with actual commit date
review_by: 2026-06-14               # last_verified + 45 days (D-19 cycle; SHORTER than per-platform 60-day)
applies_to: both                    # Win + non-Win admins both consume this doc
audience: admin                     # Cross-platform admin reference
platform: cross-platform            # NEW frontmatter value (existing values: Linux, all, Android, iOS, etc.)
---
```

Pattern lineage: `linux-capability-matrix.md:1-7` (60-day cycle, `platform: Linux`); D-19 narrows to 45-day for cross-platform doc.

### Comparison doc intro template (D-10 Windows-source acknowledgment)

```markdown
# Intune: 5-Platform Capability Comparison

This document provides a side-by-side comparison of Intune management capabilities across five platforms — Windows (Autopilot v1, Autopilot v2, manual enrollment), macOS (ADE), iOS/iPadOS (ADE / Device Enrollment / Account-Driven UE / MAM-WE), Android Enterprise (COBO / COPE / BYOD / Dedicated / ZTE / AOSP), and Linux (Ubuntu 22.04 / 24.04 LTS) — across six operational domains: Enrollment, Configuration, App Deployment, Compliance, Software Updates, and Conditional Access.

This is a structural reference: every non-empty cell links to the source per-platform capability matrix section, NOT duplicated content. For per-platform capability deep-dives, see the per-platform matrices linked from each cell.

> **Windows column sourcing note:** Windows column links target the Windows column of `linux-capability-matrix.md` (the existing Windows-bilateral capability source). A dedicated `windows-capability-matrix.md` is deferred to v1.6+. For Windows-internal APv1 vs APv2 framework comparison, see [APv1 vs APv2](../apv1-vs-apv2.md).

## Enrollment
[table with 5 columns × ~10 rows; cells are verdict + link]

## Configuration
[table with 5 columns × ~8 rows]

[etc. for all 6 H2s]
```

### Comparison doc cell shape examples (D-01)

```markdown
| Zero-touch enrollment | Supported — [matrix](linux-capability-matrix.md#enrollment) ([APv1 only — White Glove](../apv1-vs-apv2.md)) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
```

| Zero-touch enrollment | Win | macOS | iOS | Android | Linux |
|----------------------|-----|-------|-----|---------|-------|
| Cell content example | `Supported — [matrix](linux-capability-matrix.md#enrollment) ([APv1 only — White Glove](../apv1-vs-apv2.md))` | `Supported — [matrix](macos-capability-matrix.md#enrollment)` | `Supported — [matrix](ios-capability-matrix.md#enrollment)` | `Mode-dependent — [matrix](android-capability-matrix.md#enrollment)` | `Not supported — [matrix](linux-capability-matrix.md#enrollment)` |

### Validator slice + assert pattern (from check-phase-57.mjs:34-42)

```javascript
function sliceH2Region(content, h2Literal) {
  const re = new RegExp("^" + h2Literal.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m");
  const m = content.match(re);
  if (!m) return null;
  const idx = content.indexOf(m[0]);
  const after = content.slice(idx + m[0].length);
  const nextH2 = after.search(/^## /m);
  return nextH2 > 0 ? content.slice(idx, idx + m[0].length + nextH2) : content.slice(idx);
}

// Phase 58 V-58-08 example — verdict-vocabulary lock
{
  id: 8,
  name: "V-58-08: comparison doc verdict vocabulary lock (5-state)",
  run() {
    const c = readFile(COMPARISON_DOC);
    if (!c) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
    const tableLines = c.split('\n').filter(l => /^\|/.test(l) && !/^\|[-: ]+\|/.test(l));
    const violations = [];
    const VERDICT_RE = /^(Supported|Partial|Not supported|Mode-dependent|n\/a)\b/;
    for (const line of tableLines) {
      const cells = line.split('|').slice(1, -1);
      for (let i = 0; i < cells.length; i++) {
        const trimmed = cells[i].trim();
        if (!trimmed || trimmed === '—' || trimmed === 'n/a' || trimmed === 'N/A') continue;
        // Skip header row cells (no verdict expected; column names like "Feature", "Windows", etc.)
        if (/^(Feature|Windows|macOS|iOS|Android|Linux)$/.test(trimmed)) continue;
        if (!VERDICT_RE.test(trimmed)) {
          violations.push(`Cell ${i}: '${trimmed.slice(0, 60)}' — non-verdict prefix`);
        }
      }
    }
    if (violations.length > 0) return { pass: false, detail: violations.slice(0, 5).join(' | ') + (violations.length > 5 ? ` ... (${violations.length} total)` : '') };
    return { pass: true, detail: `${tableLines.length} table rows scanned; verdict vocabulary clean` };
  }
}
```

### C12 promotion patch (single-line edit at v1.5-milestone-audit.mjs:508)

```diff
   {
     id: 12,
     name: 'C12: 4-platform comparison structural validation',
-    informational: true,
     // AUDIT-04: INFORMATIONAL-FIRST. File-existence pre-gate. Promotes to blocking once
-    // docs/reference/4-platform-capability-comparison.md exists (Phase 58+).
+    // docs/reference/4-platform-capability-comparison.md exists (Phase 58+ — promoted to blocking 2026-04-30).
     // Link-not-copy: every non-empty data cell must contain a markdown hyperlink.
     run() {
```

(Replace `2026-04-30` with the actual Phase 58 close date.)

## State of the Art

| Old Approach (pre-Phase-58) | Current Approach (post-Phase-58) | When Changed | Impact |
|------------------------------|----------------------------------|--------------|--------|
| 4 sibling capability matrices with bilateral comparisons; no unified cross-platform reference | 5-platform unified comparison doc + 3 retrofitted CA H2s + 4 sibling intros cross-ref | Phase 58 close (2026-04-30 target) | Admin managing mixed Win+macOS+iOS+Android+Linux fleet has single-doc landing; per-platform matrix links remain authoritative |
| Linux matrix line 70 + 112 carry `(when shipped)` hedge | Hedge removed; comparison doc shipped | Phase 58 plan 58-04 | Cross-references resolve cleanly |
| `## Conditional Access` H2 in Linux matrix only | `## Conditional Access` H2 in all 4 capability matrices (Linux + 3 retrofitted) | Phase 58 plan 58-02 | Comparison-doc CA cells have stable link targets in all 4 sibling matrices |
| C12 audit harness check informational-only | C12 promoted to blocking | Phase 58 close (single-line patch at line 508) | Mechanical link-not-copy enforcement at every milestone audit run |
| Android footer at lines 132-139 reads "deferred to v1.5 (AECOMPARE-01)" | Android footer body retargeted to forward-link `4-platform-capability-comparison.md`; anchor preserved | Phase 58 plan 58-04 (D-14 F3) | Inbound links to legacy anchor remain stable; "deferred" wording obsolete |
| Phase 60 expected to own C12 promotion | Phase 58 owns C12 promotion (D-18) | Phase 58 close | Phase 60 scope narrows to `last_verified` cycle promotion + C13 promotion only |

**Deprecated/outdated (post-Phase-58):**

- `(when shipped)` hedge in Linux matrix lines 70 + 112 — removed by D-13.
- "Deferred to v1.5 (AECOMPARE-01)" body in Android footer — replaced by D-14 F3.
- C12 informational-only audit — promoted to blocking by D-18.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | GFM auto-slug for `## Conditional Access` deterministically equals `#conditional-access` across GitHub.com renderer + VS Code preview + markdown-link-check | §GFM H2 anchor slug audit | Comparison doc CA cells would broken-link; but ALL 6 H2 slugs are plain-ASCII 1-2-word lowercase pattern — verified deterministic by GFM spec [VERIFIED: GFM spec via observed Linux matrix + similar matrices in repo all using lowercase auto-slug consistently] |
| A2 | macOS matrix CA H2 retrofit row count of ~5 rows is appropriate scope (~15-30 lines per matrix per CONTEXT D-04) | §CA H2 retrofit content scope | If actual scope diverges (e.g., need ~10 rows for iOS supervised-attestation richness), plan-author may exceed 30-line budget; minor — D-04 says "~15-30 lines" as estimate, not pin |
| A3 | Plan structure recommendation (6 plans + close gate) follows Phase 56/57 progressive-landing model | §atomic-commit landing strategy | Plan-author may prefer single-atomic-commit (Phase 54/55 model); D-16 grants discretion. Recommendation only |
| A4 | Plan ordering with CA H2 retrofit FIRST avoids broken-link transients during comparison doc authoring | §Windows column anchor inventory | If plan-author orders comparison doc first, comparison doc CA cells targeting macos/ios/android `#conditional-access` will broken-link until retrofit lands. Mitigation in plan ordering |
| A5 | 26 V-58-NN structural assertions is appropriate scope (D-18 says ~24-28) | §validator scope | If plan-author derives more or fewer assertions during plan authoring, NUMBER is flexible per D-18 lower/upper bounds |
| A6 | C12 promotion is a single-line edit (line 508 `informational: true` removal) | §C12 promotion mechanics | [VERIFIED: read v1.5-milestone-audit.mjs:505-542 directly during research]. Risk only if upstream audit-harness pattern changes; very low |
| A7 | APv1/APv2 footnote-discretion candidates are Hybrid Entra Join + Pre-Provisioning + Win10 support | §APv1/APv2 footnote-discretion candidates | Plan-author may select different rows; D-09 caps at ≤3 but does NOT lock specific rows. Recommendation only |
| A8 | Android footer F3 H3 heading text may drop "Deferred:" prefix per Phase 45 AEAOSPFULL-09 precedent | §Android footer F3 mechanics | D-14 specifies anchor preservation + body replacement; H3 heading text is NOT pinned by D-14. [VERIFIED: read android-capability-matrix.md:124 (Phase 45 precedent dropped "Deferred:" prefix)] |
| A9 | Comparison doc total cell count is ~75-150 link-bearing cells | §comparison doc row taxonomy | Estimate only; actual count depends on plan-author row choices per H2 |
| A10 | Phase 58 atomic-commit interpretation = plan-series level allows progressive-landing per Phase 57 DPO-Phase57-06 inheritance | §atomic-commit landing strategy | [CITED: 58-CONTEXT.md D-16 explicit lock]. No risk |
| A11 | macOS / iOS matrix intro "five operational domains" wording optional-update post-CA-retrofit | Pitfall 6 | Reader-facing minor inconsistency only; not a broken-link or validator failure. Plan-author discretion |
| A12 | Validator implementation copies `check-phase-57.mjs` template verbatim | §validator scope | [VERIFIED: read check-phase-57.mjs directly during research]. Pattern stable across Phase 50-57 lineage |
| A13 | Linux matrix line 11 intro does NOT need 5C cross-ref edit (already has comparison doc reference at line 70 + 112) | Pitfall 7 | [CITED: D-13 explicit lock — "Linux matrix already has the cross-reference"]. No risk |
| A14 | macOS / iOS matrix intros currently say "across five operational domains" / "across 5 domains" | §CA H2 retrofit content scope | [VERIFIED: read macos-capability-matrix.md:11 and ios-capability-matrix.md:11 directly during research] |
| A15 | comparison doc frontmatter `platform: cross-platform` is a NEW frontmatter value (existing matrices use `Linux`, `all`, `Android`, etc.) | §code examples | [VERIFIED: read 4 matrix frontmatters directly]. New value is forward-compatible with C-check expansion in Phase 60+ |

**If this table seems large:** all assumptions are flagged for plan-author review. Most are recommendations with explicit fallback paths (e.g., A2/A3/A5/A7 — plan-author discretion areas). A1/A6/A12/A13/A14 are VERIFIED claims with cited sources — included for completeness.

## Open Questions

1. **Should comparison doc include a Cross-Platform Equivalences supplemental H2?**
   - What we know: Linux matrix has one (lines 71-93); Android matrix has one (line 76); iOS / macOS matrices do not.
   - What's unclear: ROADMAP SC#1 locks the 6 domain H2s but does NOT prohibit a 7th supplemental H2. CONTEXT.md lists this as Claude's discretion / deferred-discretionary.
   - Recommendation: **OMIT in initial Phase 58 ship**. The 6 domain H2s with link-bearing cells already capture cross-platform equivalences via the rows themselves. Adding a 7th H2 increases scope and risks duplicate-content (PITFALL-7 violation if the H2 paraphrases the linux + android equivalences). If plan-author judges it adds value, can be added later as v1.6+ enhancement.

2. **Should macOS / iOS matrix intro "five operational domains" wording update to "six" post-CA-retrofit?**
   - What we know: D-12 5C edit is single-sentence cross-ref addition; doesn't speak to existing intro-paragraph integer wording.
   - What's unclear: Whether plan-author should fold this into the same intro edit or leave as-is.
   - Recommendation: Plan-author 58-04 includes "six" rewording as part of the intro edit — minor, single-token edit, improves accuracy. Validator V-58-NN does NOT pin this token (intro prose is flexible).

3. **Should the comparison doc include APv1 / APv2 column splits OR remain single Windows column?**
   - What we know: D-08 mandates single Windows column targeting linux-matrix Win-bilateral source; D-09 grants ≤3 rows footnote-discretion to apv1-vs-apv2.md. CONTEXT explicitly rejects 4F (split target paths).
   - What's unclear: Nothing — D-08 + D-09 lock this.
   - Resolution: Single Windows column. Done.

4. **How does Phase 58 interact with Phase 60 C12 scope expansion?**
   - What we know: ROADMAP line 382-383 says Phase 60 updates C12 scope to "verify 5 platform columns (including Linux column) + 6 domain H2 anchors"; D-18 promotes C12 to blocking at Phase 58 close.
   - What's unclear: Whether Phase 58 also does the "6 domain H2 anchor" check expansion, or leaves that for Phase 60.
   - Recommendation: Phase 58 does ONLY the informational → blocking flag removal (per D-18 "C12 promotion lands in Phase 58 close"). Phase 60 does the regex/scope expansion (adds 6 H2 anchor pin checks to C12). Two distinct edits, two distinct phases. Validator V-58-25 asserts only the flag removal; Phase 60 will own a future C12-scope-expansion validator.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Validator runtime (`check-phase-58.mjs`) + audit harness (`v1.5-milestone-audit.mjs`) | ✓ | v22.20.0 (verified `node --version`) | — |
| `git` | Pre-edit anchor inventory baseline (`git rev-parse HEAD`) | ✓ | (assumed; gitStatus shows current branch master) | — |
| `grep` (Bash environment) | Pre-edit anchor inventory artifact authoring | ✓ | (assumed; environment confirms bash available) | — |
| GitHub-Flavored Markdown renderer | Final-render verification (NOT required by validator) | ✓ | github.com or VS Code preview | — |
| markdown-link-check | C13 broken-link harness (informational; not blocking pre-Phase-60) | ✓ | (assumed; v1.5-milestone-audit.mjs:543-559 references) | — |
| `npm` / `npm install` | NOT required (Phase 48 D-25 file-reads-only contract) | n/a | — | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

## Validation Architecture

> Per `.planning/config.json`, `workflow.nyquist_validation` is not set explicitly. Treating as enabled per default behavior.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Custom file-reads-only / regex-based / no-shared-module Node.js validator pattern (Phase 48 D-25 lineage) |
| Config file | none — see plan 58-05 (validator authoring) |
| Quick run command | `node scripts/validation/check-phase-58.mjs` |
| Full suite command | `node scripts/validation/check-phase-58.mjs --verbose && node scripts/validation/v1.5-milestone-audit.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| CLEAN-05 | 5-platform comparison doc exists with 6 H2s × 5 columns | smoke | `node scripts/validation/check-phase-58.mjs` (V-58-01..10) | ❌ Wave 0 (plan 58-05 creates) |
| CLEAN-05 / SC#1 | All 6 H2 sections present | smoke | `grep -c "^## " docs/reference/4-platform-capability-comparison.md` (expect ≥7 incl Version History) | ❌ Wave 0 |
| CLEAN-05 / SC#1 | All 5 platform tokens present (Windows, macOS, iOS, Android, Linux) | smoke | C12 in `v1.5-milestone-audit.mjs` (already implemented at line 520-524) | ✅ exists |
| CLEAN-05 / SC#2 | Every non-empty cell contains hyperlink | smoke | C12 in `v1.5-milestone-audit.mjs:526-538` (already implemented) | ✅ exists |
| CLEAN-05 / SC#2 | Verdict vocabulary lock (5-state) | smoke | `node scripts/validation/check-phase-58.mjs` V-58-08 | ❌ Wave 0 |
| CLEAN-05 / SC#3 | macOS / iOS / Android matrix intros cross-ref comparison doc | smoke | V-58-14..16 | ❌ Wave 0 |
| CLEAN-05 / SC#3 | Android footer body removed + anchor preserved + forward-link present | smoke | V-58-17..19 | ❌ Wave 0 |
| CLEAN-05 / SC#4 | Linux matrix cross-references comparison doc (already exists from Phase 50; verified post-hedge-removal) | smoke | V-58-20..21 | ❌ Wave 0 |
| CLEAN-05 / SC#5 | Comparison doc has `last_verified` 45-day cycle frontmatter | smoke | V-58-10 | ❌ Wave 0 |
| AUDIT-04 | C12 promoted to blocking | smoke | V-58-25 (asserts informational flag removed) | ❌ Wave 0 |
| AUDIT-06 | check-phase-58.mjs ships in same plan-series as content | smoke | `ls scripts/validation/check-phase-58.mjs` (file existence after plan 58-05) | ❌ Wave 0 |
| PITFALL-7 | Link-not-copy contract enforced | smoke | C12 (mechanical) + V-58-07 (per-cell scan) + SC#2 human review | partially (C12 exists; V-58-07 in Wave 0) |
| PITFALL-15 | GFM anchor case-sensitivity not violated | smoke | V-58-NN regex-pin literal H2 strings | ❌ Wave 0 |
| PITFALL-6 | Pre-edit anchor inventory captured before edits | manual + grep | Pre-edit grep + post-edit grep diff vs `58-ANCHOR-INVENTORY.md` | ❌ Wave 0 (plan 58-01) |

### Sampling Rate

- **Per task commit:** `node scripts/validation/check-phase-58.mjs --verbose`
- **Per wave merge:** `node scripts/validation/check-phase-58.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose`
- **Phase gate (close):** Full suite + `regenerate-supervision-pins.mjs --self-test` + manual SC#1..5 review against `58-VERIFICATION.md`

### Wave 0 Gaps

- [ ] `scripts/validation/check-phase-58.mjs` — covers CLEAN-05, AUDIT-04, AUDIT-06, PITFALL-7, PITFALL-15 (plan 58-05 creates)
- [ ] `.planning/phases/58-defer-08-4-platform-capability-comparison/58-ANCHOR-INVENTORY.md` — covers PITFALL-6 baseline (plan 58-01 creates)
- [ ] `docs/reference/4-platform-capability-comparison.md` — primary deliverable (plan 58-03 creates)
- [ ] CA H2 retrofit content (3 sibling matrices) — D-04 deliverable (plan 58-02 creates)
- [ ] C12 promotion patch in `v1.5-milestone-audit.mjs:508` (plan 58-06 creates)
- [ ] `58-VERIFICATION.md` — close-gate artifact (plan 58-07 creates)

**Framework install:** none — plain Node 22 ESM with `node:fs` / `node:path` / `node:process`. No npm install.

## Sources

### Primary (HIGH confidence)

- `D:/claude/Autopilot/.planning/phases/58-defer-08-4-platform-capability-comparison/58-CONTEXT.md` — 20 D-NN locked decisions [VERIFIED: read directly]
- `D:/claude/Autopilot/.planning/STATE.md` — Phase 58 ready state, progress 9/14 [VERIFIED: read directly]
- `D:/claude/Autopilot/.planning/REQUIREMENTS.md` — CLEAN-05, AUDIT-04, AUDIT-06 [VERIFIED: read directly via grep]
- `D:/claude/Autopilot/.planning/ROADMAP.md` — Phase 58 SC#1..5, Phase 59-60 dependencies [VERIFIED: read directly lines 346-400]
- `D:/claude/Autopilot/docs/reference/linux-capability-matrix.md` — primary Windows column source per D-08; line 70 + 112 hedge targets; CA H2 lines 59-66 template [VERIFIED: read directly all 119 lines]
- `D:/claude/Autopilot/docs/reference/macos-capability-matrix.md` — CA H2 retrofit target; intro 5C edit target [VERIFIED: read directly all 102 lines]
- `D:/claude/Autopilot/docs/reference/ios-capability-matrix.md` — CA H2 retrofit target; intro 5C edit target [VERIFIED: read directly all 108 lines]
- `D:/claude/Autopilot/docs/reference/android-capability-matrix.md` — CA H2 retrofit target; intro 5C edit target; footer F3 target lines 132-139; Phase 45 AEAOSPFULL-09 precedent at lines 124-130 [VERIFIED: read directly all 149 lines]
- `D:/claude/Autopilot/docs/apv1-vs-apv2.md` — D-09 footnote-discretion target [VERIFIED: read directly first 67 lines]
- `D:/claude/Autopilot/scripts/validation/v1.5-milestone-audit.mjs` lines 505-542 — C12 implementation reference [VERIFIED: read directly]
- `D:/claude/Autopilot/scripts/validation/check-phase-57.mjs` — validator template (565 lines, 26 V-57-NN) [VERIFIED: read directly all 565 lines]
- `D:/claude/Autopilot/scripts/validation/check-phase-56.mjs` — earlier validator template (32 V-56-NN; first 80 lines) [VERIFIED: read directly]
- `D:/claude/Autopilot/.planning/phases/57-defer-07-android-nav-unification/57-CONTEXT.md` — D-32 pre-edit anchor inventory pattern; DPO-Phase57-06 atomic-commit interpretation [VERIFIED: read directly first 200 lines]
- `D:/claude/Autopilot/.planning/phases/57-defer-07-android-nav-unification/57-ANCHOR-INVENTORY.md` — direct template for `58-ANCHOR-INVENTORY.md` [VERIFIED: read directly all 142 lines]
- `D:/claude/Autopilot/.planning/phases/57-defer-07-android-nav-unification/57-RESEARCH.md` — RESEARCH.md format precedent [VERIFIED: read directly first 100 lines]
- `D:/claude/Autopilot/.planning/phases/57-defer-07-android-nav-unification/57-07-SUMMARY.md` — close-gate plan structure precedent [VERIFIED: read directly first 50 lines]
- `D:/claude/Autopilot/.planning/phases/56-drift-detection-tenant-migration/56-CONTEXT.md` §D-14 — cross-platform routing pattern (operations-domain only — D-07 corrects the citation) [VERIFIED: read directly lines 75-95]
- `D:/claude/Autopilot/CLAUDE.md` — project instructions (documentation-only phase scope confirmation) [VERIFIED: read in system context]

### Secondary (MEDIUM confidence)

- GFM auto-slug derivation rules — applied to all 6 H2 literals; deterministic for plain-ASCII names [VERIFIED via observed behavior in 4 existing matrices using lowercase-hyphen pattern]

### Tertiary (LOW confidence)

- None — Phase 58 is a documentation-only retrofit with all primary sources in-repo.

## Metadata

**Confidence breakdown:**

- Standard stack (Node 22 ESM validator, GFM markdown): HIGH — Phase 48-57 lineage, in-repo verified
- Architecture (link-not-copy + sibling-matrix retrofit + footer-anchor preservation): HIGH — all 20 D-NN decisions adversarial-reviewed; in-repo file evidence
- Pitfalls (8 listed): HIGH — derived from in-repo PITFALL definitions + Phase 56-57 precedent
- GFM anchor slugs (6 H2s): HIGH — deterministic for plain-ASCII; verified in 4 existing matrices
- CA H2 retrofit content scope: MEDIUM-HIGH — Linux matrix template mirrored; per-platform substitutions are best-fit recommendations subject to plan-author refinement
- Comparison doc row taxonomy (~6-12 rows per H2): MEDIUM — derived from existing matrix taxonomies; row counts are recommendations, not pinned by D-01..20
- APv1/APv2 footnote candidates (3 rows): HIGH — apv1-vs-apv2.md verified; 3 rows surveyed against Win cells in linux-matrix
- Validator scope (26 V-58-NN): HIGH — directly modeled on check-phase-57.mjs (26 V-57-NN); fits D-18 estimate (24-28)
- C12 promotion mechanics (single-line patch): HIGH — read v1.5-milestone-audit.mjs:505-542 directly
- Atomic-commit landing strategy (progressive-landing): MEDIUM — D-16 grants discretion; Phase 56/57 model is recommended, NOT locked
- Pre-edit anchor inventory artifact format: HIGH — direct template from 57-ANCHOR-INVENTORY.md

**Research date:** 2026-04-30
**Valid until:** 2026-05-30 (30 days for stable in-repo source surface; if Phase 56-57 anchors change before plan execution, refresh anchor inventory)

---

*Phase: 58-defer-08-4-platform-capability-comparison*
*Researched: 2026-04-30*
*Confidence: HIGH (all findings verified in-repo; 15 assumptions logged)*
