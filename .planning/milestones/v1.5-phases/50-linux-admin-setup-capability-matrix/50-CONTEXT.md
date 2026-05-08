# Phase 50: Linux Admin Setup + Capability Matrix - Context

**Gathered:** 2026-04-27
**Status:** Ready for planning
**Methodology:** Adversarial review (12-agent: 4 Finder + 4 Adversary + 4 Referee across 3 parallel waves) on 4 gray areas covering 16 candidate options. Wave-1 Finder raw scoring identified the lowest-weakness option per area; Wave-2 Adversary disprove-stage flipped one ranking (GA-1) by uncovering the literal "bilateral" mandate at REQUIREMENTS.md line 155; Wave-3 Referee added a fifth option (2E) drawn from shipped Android v1.4 BYOD precedent and locked the Pair-1 architectural correction (W-CRIT-1/2/3) for same-commit ROADMAP edits.

<domain>
## Phase Boundary

Phase 50 delivers configuration-time documentation for Linux device management in Microsoft Intune (Ubuntu 22.04 LTS / 24.04 LTS) — from Intune Linux client install through compliance, app delivery, and Conditional Access — plus a Linux-centric Win|Linux bilateral capability matrix that quantifies the platform's narrowness with a Cross-Platform Equivalences section bridging to macOS / iOS / Android. Phase 49 (Linux Foundation) is the locked prerequisite: 3-status canonical set (DPO-02), Linux glossary ~21 H3-anchored native terms (DPO-04), Phase 49 cross-platform bridge subsection (DPO-03 anti-duplication), and the LIN-05 Identity Broker H3 anchor at `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints` (DPO-01).

Nine deliverables (5 active requirements: LIN-03, LIN-04, LIN-05, LIN-06, LIN-13):

1. `docs/admin-setup-linux/00-overview.md` — admin-setup overview with setup-sequence; back-links (NOT duplicates) to Phase 49 cross-platform bridge subsection per DPO-03
2. `docs/admin-setup-linux/01-intune-linux-agent.md` — Intune Linux client deb install from packages.microsoft.com; LIN-05 Identity Broker `> ⚠️ Known admin pitfall` callout back-linking to Phase 49 H3 anchor (DPO-01); PITFALL-3 deb-vs-Snap callout
3. `docs/admin-setup-linux/02-enrollment-profile.md` — admin-only enrollment configuration (P1+P2 licensing verification, optional CA scoping); cross-links to end-user file (per Android v1.4 BYOD precedent); `audience: admin`
4. `docs/admin-setup-linux/03-compliance-policy.md` — 4 settings-catalog categories (Allowed Distributions / Custom Compliance / Device Encryption / Password Policy); PITFALL-2 architectural callout in opening section ("device reports compliant" ≠ "CA grants access"; `Require device to be marked as compliant` grant unavailable on Linux)
5. `docs/admin-setup-linux/04-app-delivery.md` — opens with PITFALL-1 scope callout (script-based only; no Win32/MSIX/.pkg analog); concept-level overview only (Bash deep-dive deferred to v1.5.1 LIN-DEFER-01)
6. `docs/admin-setup-linux/05-conditional-access.md` — web-app CA via Edge 102.x+ ONLY; no device-level CA H2 section exists per PITFALL-2
7. `docs/end-user-guides/linux-intune-portal-enrollment.md` — NEW FILE; LIN-06 5-step end-user walkthrough (Edge 102.x+ install, intune-portal deb install, Intune sign-in, compliance remediation, Edge sign-in); `audience: end-user`; mirrors Android v1.4 BYOD precedent at `docs/end-user-guides/android-work-profile-setup.md`
8. `docs/reference/linux-capability-matrix.md` — Win|Linux bilateral matrix with 6 domain H2s (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access); Cross-Platform Equivalences H2 with 3 attributed pairs; Key Gaps Summary; See Also; Version History
9. `scripts/validation/check-phase-50.mjs` — frontmatter validation (C10 gate) + structural assertions for all 8 content files + 3-status closed-set Linux-column check + 3-pair Equivalences assertion + cross-link literal-string assertions

Plus 4 same-commit metadata corrections (D-22 atomicity bundle):
- ROADMAP.md Phase 50 line 119 wording: "embedded" → "in docs/end-user-guides/ (cross-linked)"
- ROADMAP.md Phase 50 SC#4 line 188: pair-1 attribution rephrased + count "≥2" → "≥3" + DRIFT-07/LIN-DEFER-01 deferral notes
- REQUIREMENTS.md LIN-06 line 148 traceability: file path updated to docs/end-user-guides/...
- REQUIREMENTS.md AUDIT-06 line 87 workflow filename: `audit-harness-integrity.yml` (frozen v1.4) → `audit-harness-v1.5-integrity.yml` (live registrar)

Phase 51 (L1 runbooks 30-33), Phase 52 (L2 runbooks 24-25), Phase 56 (DRIFT-07 cross-platform encryption drift), Phase 58 (CLEAN-05 4-platform comparison), Phase 59 (CLEAN-08 hub nav glossary normalization) consume these as locked references.

</domain>

<decisions>
## Implementation Decisions

### Capability matrix structure (Gray Area 1 — winner: 1C bilateral)

- **D-01:** **`docs/reference/linux-capability-matrix.md` is a Linux↔Windows BILATERAL matrix** with prose Windows column + 3-status closed-set Linux column, mirroring `docs/reference/macos-capability-matrix.md` (verified 2-col Win|macOS pattern). Rejects 1A (5-column comparison — pre-empts Phase 58's CLEAN-05 4-platform-capability-comparison.md per AUDIT-04 C12 link-not-copy contract; PITFALL-7 violation), 1B (Linux-only — fails REQUIREMENTS line 155 + ROADMAP line 119 literal "bilateral" SCOPE-LOCK), 1D (two-view — DPO-03-style Anti-Pattern 1 single-canonical-doc duplication of Phase 49 whitelist). The "bilateral" mandate is the binding scope-lock; Wave-2 Adversary surfaced this evidence (REQUIREMENTS line 155 verbatim: "linux-capability-matrix.md — bilateral; Cross-Platform Equivalences section; explicit Not supported cells"); Wave-3 Referee made it a 15-point CRIT scope-violation penalty against 1A/1B/1D.
- **D-02:** **6 domain H2s** (vs macOS 5 + folded CA): `## Enrollment` / `## Configuration` / `## App Deployment` / `## Compliance` / `## Software Updates` / `## Conditional Access`. Conditional Access is ELEVATED to its own H2 (NOT folded into Compliance like macos-capability-matrix.md) — resolves residual concern 1C.6 by giving PITFALL-2's mandatory architectural callout a stable per-domain anchor (`linux-capability-matrix.md#conditional-access`) that Phase 51 L1 runbook 32 (CA blocking web-app access) and Phase 58 4-platform comparison can deep-link to. The CA H2 row reads `Not supported — web-app CA only` per PITFALL-2 line 48 + Phase 49 V-49-08 inherited contract.
- **D-03:** **Frontmatter values:** `last_verified: 2026-04-27` / `review_by: 2026-06-26` (60-day cycle per Phase 34 D-14) / `applies_to: both` / `audience: admin` / `platform: Linux`. The `platform: Linux` value (vs macos-capability-matrix.md's `platform: all`) satisfies AUDIT-02 C10 blocking check requirement that all Linux files carry `platform: Linux` frontmatter for path-based scoping. Per CDI-Phase50-A from GA-1 Referee, this is the file-name-focal-platform pattern; macOS predates the v1.5 C10 convention.
- **D-04:** **Linux column 3-status closed-set inheritance from Phase 49 DPO-02.** Cells use canonical `Supported` / `Partial` / `Not supported` (with optional `— qualifier` suffix per V-49-08 pattern, e.g., `Not supported — web-app CA only`). Windows column uses prose like sibling matrices. `check-phase-50.mjs` extends V-49-07's column-aware regex pattern: V-49-07 reads `cells[1]` in the 2-column whitelist `| Capability | Linux Status |`; check-phase-50.mjs reads `cells[2]` in the 3-column matrix `| Feature | Windows | Linux |` (0-based after split-and-filter; column 0 = Feature, 1 = Windows, 2 = Linux). Adversary verified one-line addition feasibility. The 3-status set is a CONTRACT inherited from Phase 49 CDI-01; no 4th status string permitted in Phase 50.
- **D-05:** **Cross-Platform Equivalences H2 placement = below the 6 domain H2s, above Key Gaps Summary** — mirrors `docs/reference/android-capability-matrix.md` lines 76-92 verbatim architectural template (Adversary verified). Decoupled from main matrix shape; the bilateral 2-column matrix above and prose-attributed paired-row Equivalences below are the established sibling pattern.
- **D-06:** **Doc structure (10 H2s total):** `## Enrollment` → `## Configuration` → `## App Deployment` → `## Compliance` → `## Software Updates` → `## Conditional Access` → `## Cross-Platform Equivalences` → `## Key Gaps Summary` → `## See Also` → `## Version History` (mirroring android-capability-matrix.md ordering precedent).

### End-user enrollment embed shape (Gray Area 2 — winner: 2E split-by-audience-directory, referee-introduced)

- **D-07:** **LIN-03 (admin enrollment configuration) and LIN-06 (end-user enrollment steps) ship in TWO separate files in DIFFERENT directories.** Admin content stays in `docs/admin-setup-linux/02-enrollment-profile.md` with `audience: admin` (matches all 33+ shipped admin-setup-* files). End-user 5-step walkthrough lives in NEW `docs/end-user-guides/linux-intune-portal-enrollment.md` with `audience: end-user`. Mirrors shipped Android v1.4 Phase 37 BYOD precedent: `docs/admin-setup-android/04-byod-work-profile.md` (admin) cross-links to `docs/end-user-guides/android-work-profile-setup.md` (end-user) — Adversary verified existence and audience: end-user frontmatter on the Android file.
  - Rejects 2A (peer H2s — audience contract violation persists per CRIT 10 even after Adversary disproves; 33+ admin-setup-* file precedent is binding)
  - Rejects 2B (nested H3 — LIN-06 demotion to subsection fails REQUIREMENTS line 29's "step-by-step guide" walkthrough form)
  - Rejects 2C (Appendix H2 — semantic demotion of a Pillar 2 requirement to "secondary content")
  - Rejects 2D (02b-prefixed file in admin-setup-linux/ — violates 6-file count contract + numbering scheme)
- **D-08:** **Admin file H2 list (`02-enrollment-profile.md`) — 5 H2s mirroring macOS analog:** `## Prerequisites` / `## Steps` / `## Verification` / `## Configuration-Caused Failures` / `## See Also`. NO end-user H2 in the admin file. `check-phase-50.mjs` NEGATIVE-asserts that `## End-User Enrollment Steps`, `## Appendix:`, `## Validate End-User Flow` do NOT appear (prevents accidental 2A/2B/2C drift).
- **D-09:** **End-user file H2 list (`linux-intune-portal-enrollment.md`) — 5 H2s mirroring Android end-user precedent:** `## What is Linux Intune Enrollment?` (or equivalent intro) / `## Before you start` / `## Enroll your device` / `## Verify enrollment` / `## Get help`. Frontmatter: `audience: end-user`, `platform: Linux`, `applies_to: enrollment`, 60-day cycle.
- **D-10:** **Cross-link contract — both directions, mandatory.** Admin file contains near top: `> **For end users:** Personal-device or self-enrolling users follow [Linux Intune Portal Enrollment](../end-user-guides/linux-intune-portal-enrollment.md). This guide covers admin-side enrollment configuration only.` End-user file contains near top: `> **For administrators:** If you administer Intune and are configuring Linux enrollment policy, see [admin-setup-linux/02-enrollment-profile.md](../admin-setup-linux/02-enrollment-profile.md).` Validator asserts both literal cross-link strings present.
- **D-11:** **REQUIREMENTS.md LIN-06 line 148 + ROADMAP.md Phase 50 line 119 wording corrections land in same Phase 50 commit** (precedent: Phase 49 D-17/D-18/CDI-03 same-commit SC#4 wording correction for the "all 4" → "all 3" glossary count). Exact diffs in D-22 below.

### Cross-Platform Equivalences pair count + content (Gray Area 3 — winner: 3B with rephrased Pair 1 + same-commit SC#4 correction)

- **D-12:** **3 paired rows in `## Cross-Platform Equivalences`** — meets corrected SC#4 floor + LIN-13 line 36 mandate (web-app CA ≈ MAM-WE compliance-lite). Rejects 3A (2 pairs — drops LIN-13-mandated Pair 3, fails REQUIREMENTS line 36), 3C (4 pairs — Pair 4 binary-pair violation; collapses Win+macOS as one cross-platform side; pre-empts Phase 56 DRIFT-07 cross-platform encryption-drift content), 3D (5 pairs — Pair 5 violates LIN-DEFER-01 trim rationale + PITFALL-1 partial-mapping discipline; "Bash compliance verdict" ≠ "Intune Remediations detect+remediate execute action").
- **D-13:** **Pair 1 — REPHRASED** from SC#4 literal phrasing per W-CRIT-1/2/3 architectural defects:
  - Linux side: `Linux 'intune-portal' deb + 'microsoft-identity-broker' systemd unit`
  - macOS side: `macOS Microsoft Intune Company Portal app + IntuneMDMDaemon LaunchAgent`
  - Body explicitly distinguishes system-scope `microsoft-identity-broker` from user-scope `intune-agent.timer`
  - Anchors via `_glossary-linux.md#intune-portal-package`, `_glossary-linux.md#microsoft-identity-broker`, `_glossary-linux.md#intune-agenttimer`, `_glossary-macos.md#mam-we`
  - Why rephrased: SC#4 literal "intune-portal service ≈ macOS LaunchDaemon" carries 3 critical defects: (W-CRIT-1) "intune-portal" is a deb package not a service; (W-CRIT-2) `LaunchDaemon` has no H3 anchor in `_glossary-macos.md` (verified zero matches); (W-CRIT-3) LaunchDaemon is system-scope while `intune-agent.timer` is user-scope (per `_glossary-linux.md` line 82) — the correct user-scope macOS analog is `LaunchAgent`.
- **D-14:** **Pair 2 — KEEP STRUCTURAL FRAMING:** `Linux 'intune-agent.timer' user-scope check-in ≈ iOS APNs-triggered MDM check-in cycle`. Anchors via `_glossary-linux.md#intune-agenttimer` (Linux) and `_glossary-macos.md#apns` (iOS). Body MUST disclose timer-poll vs APNs-push transport-mechanism divergence per `_glossary-linux.md:84` cross-platform note. The mapping is structural ("device-side schedule on which compliance is re-evaluated"), not behavioral.
- **D-15:** **Pair 3 — REQUIRED by LIN-13:** `Linux web-app CA (Microsoft Edge for Linux 102.x+) ≈ iOS MAM-WE (Managed App Without Enrollment) — both 'compliance-lite' patterns`. Anchors via `_glossary-linux.md#web-app-ca` and `_glossary-macos.md#mam-we`. Body MUST disclose architectural divergence per `_glossary-linux.md:112` ("the mapping is structural, not behavioral") — Linux web-app CA is BROWSER-CHALLENGE; iOS MAM-WE is APP-LAYER selective-wipe. Both deliver org-data protection without device-level CA enforceability — that is the LIN-13-named common pattern, NOT behavioral parity.
- **D-16:** **No glossary append needed** — all 6 anchor targets exist (verified): `intune-portal-package` / `microsoft-identity-broker` / `intune-agenttimer` / `web-app-ca` (`_glossary-linux.md` lines 80, 86, 92, 108) + `mam-we` / `apns` (`_glossary-macos.md` lines 68 H3, 101 H3). The cleanest structural property of 3B vs 3C/3D: Phase 50 ships ZERO glossary edits, preserving append-only contract + PITFALL-12 sidecar pin-coordinate stability.
- **D-17:** **ROADMAP.md SC#4 same-commit correction.** Line 188 current literal text replaced. Exact diff:
  - **Before:** `4. \`docs/reference/linux-capability-matrix.md\` has explicit "Not supported" cells for CA device-level, app binary delivery, zero-touch enrollment, configuration profiles, and Hybrid Entra Join — includes a Cross-Platform Equivalences section with at least 2 attributed pairs (intune-portal service ≈ macOS LaunchDaemon; Linux compliance check ≈ iOS MDM check-in cycle)`
  - **After:** `4. \`docs/reference/linux-capability-matrix.md\` has explicit "Not supported" cells for CA device-level, app binary delivery, zero-touch enrollment, configuration profiles, and Hybrid Entra Join — includes a Cross-Platform Equivalences section with at least 3 attributed pairs (Linux \`intune-portal\` deb + \`microsoft-identity-broker\` systemd unit ≈ macOS Microsoft Intune Company Portal app + IntuneMDMDaemon LaunchAgent; Linux \`intune-agent.timer\` user-scope check-in ≈ iOS APNs-triggered MDM check-in cycle; Linux web-app CA ≈ iOS MAM-WE both as "compliance-lite" patterns per LIN-13). DRIFT-07 cross-platform encryption pairs (BitLocker / FileVault / dm-crypt) and Bash-vs-PowerShell remediation pairs are NOT authored here — encryption drift belongs to Phase 56 DRIFT-07; Bash deep-dive belongs to v1.5.1 LIN-DEFER-01.`
  - Precedent: Phase 49 D-17/D-18/CDI-03 — SC# wording correction shipped in commit-1 alongside content. `check-phase-50.mjs` depends on the corrected count ("≥3"), so SC#4 edit MUST land before validator's first run.

### Commit atomicity (Gray Area 4 — winner: 4A ONE atomic commit)

- **D-18:** **ONE atomic commit.** All 8 content files + validator + 4 metadata-correction edits ship together. Rejects 4B (content-vs-tooling split — AUDIT-06 "validator alongside content" violation), 4C (dependency-wave split — DPO-01 "satisfaction early" is a fictional benefit; Phase 49 anchor exists at Phase 50 startup, not contingent on internal commit ordering), 4D (3 commits — multi-boundary AUDIT-06 violation; Phase 48 D-14 atomicity precedent inverted). Phase 49 D-22 anti-1-commit ruling does NOT transfer because Phase 49 commit-2 was specifically "append-only edits to existing pinned glossaries" (which Phase 50 has none of); Adversary surfaced this asymmetric-precedent disprove and Wave-3 Referee confirmed.
- **D-19:** **Commit message subject:** `docs(50): linux admin guides + capability matrix + check-phase-50 validator + roadmap/requirements corrections`. Body enumerates 6 admin-setup-linux files + 1 end-user-guides file + 1 reference matrix + 1 validator + 4 metadata corrections. Cites Phase 49 D-17/D-18 same-commit-SC#-correction precedent.
- **D-20:** **Pre-commit coverage validations** (run before staging commit):
  1. `node scripts/validation/check-phase-50.mjs` exits 0 (all 22-26 V-50-NN checks pass)
  2. `node scripts/validation/v1.5-milestone-audit.mjs` exits 0 (C1-C12 PASS; C13 informational)
  3. `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 (regression-prevention)
  4. `markdown-link-check` against the 8 new content files (informational; not blocking per Phase 48 D-08 + REQUIREMENTS line 86)
  5. Verify all 8 content files contain `last_verified` + `review_by` frontmatter on 60-day cycle (C10 contract)
  6. Verify `linux-capability-matrix.md` Linux column cells contain ONLY canonical 3-status strings + qualifier suffixes
  7. Verify LIN-05 callout in `01-intune-linux-agent.md` resolves to existing Phase 49 anchor `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints`
  8. Verify cross-link literals: `02-enrollment-profile.md` contains `../end-user-guides/linux-intune-portal-enrollment.md` AND `linux-intune-portal-enrollment.md` contains `../admin-setup-linux/02-enrollment-profile.md`
- **D-21:** **REQUIREMENTS.md AUDIT-06 line 87 same-commit correction** — workflow filename drift. `audit-harness-integrity.yml` (frozen v1.4 file) → `audit-harness-v1.5-integrity.yml` (live registrar). Adversary surfaced this latent contract drift; Phase 49 D-17/D-18 precedent applies.
- **D-22:** **Same-commit edit bundle (4 metadata corrections):**
  1. `ROADMAP.md` line 119: `... linux-capability-matrix.md bilateral; end-user enrollment guide embedded` → `... linux-capability-matrix.md bilateral; end-user enrollment guide in docs/end-user-guides/ (cross-linked)`
  2. `ROADMAP.md` line 188 (SC#4): full diff per D-17 above
  3. `REQUIREMENTS.md` line 148 (LIN-06 traceability): `admin-setup-linux/02-enrollment-profile.md — end-user enrollment steps embedded in admin setup phase` → `docs/end-user-guides/linux-intune-portal-enrollment.md — authored during Phase 50 admin setup; cross-linked from admin-setup-linux/02-enrollment-profile.md`
  4. `REQUIREMENTS.md` line 87 (AUDIT-06): `.github/workflows/audit-harness-integrity.yml` → `.github/workflows/audit-harness-v1.5-integrity.yml`

### Validator (`check-phase-50.mjs`) scope and assertions

- **D-23:** **Validator-as-deliverable per AUDIT-06** — ships in same commit as content. Mirrors `check-phase-49.mjs` patterns (file-reads-only / no-shared-module per Phase 48 D-25; regex-based H2/H3 detection per Phase 49 D-26). Estimated 24-28 V-50-NN checks. Registered in `.github/workflows/audit-harness-v1.5-integrity.yml` (already pre-registered with lazy-skip per Phase 48 D-18 — Adversary verified lines 101-115).
- **D-24:** **Structural assertions** the validator MUST make:
  - **File existence:** all 8 content files at locked paths; admin-setup-linux/ directory contains EXACTLY 6 files (00-05); end-user-guides/ directory contains the new Linux file
  - **Frontmatter (C10 contract):** `platform: Linux` on all 8; 60-day `last_verified` / `review_by` cycle on all 8; `audience: admin` on 7 files; `audience: end-user` on `linux-intune-portal-enrollment.md`
  - **Admin-setup-linux/02 H2 pinned literal strings (D-08):** `## Prerequisites` / `## Steps` / `## Verification` / `## Configuration-Caused Failures` / `## See Also` — present and exhaustive
  - **Admin-setup-linux/02 NEGATIVE assertions:** does NOT contain `## End-User Enrollment Steps`, `## Appendix:`, `## Validate End-User Flow`, or any H2/H3 with `audience: end-user`-style content (regression guard against 2A/2B/2C drift)
  - **End-user-guides/linux-intune-portal-enrollment.md H2 pinned literals (D-09):** 5 strings per Android end-user precedent (exact strings finalized at authoring time; validator pins them)
  - **Cross-link literals (D-10):** both directions present
  - **linux-capability-matrix.md structural:** 6 domain H2s + Cross-Platform Equivalences H2 + Key Gaps Summary + See Also + Version History (10 H2s total); CA H2 row literal `Not supported — web-app CA only` (PITFALL-2 line 48 inheritance from Phase 49 V-49-08); 3-status closed-set Linux-column regex (column-aware extending V-49-07 pattern); ≥3 paired rows in Equivalences H2 (corrected SC#4 floor)
  - **LIN-05 callout:** `01-intune-linux-agent.md` contains literal back-link string to `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints` AND a `> ⚠️ Known admin pitfall` blockquote within 5 lines (DPO-01 contract)
  - **DPO-03 anti-duplication:** `00-overview.md` contains a back-link to Phase 49 `00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android` AND does NOT contain its own H2 with that title (regression guard)
  - **PITFALL-1 callout:** `04-app-delivery.md` opens with a `> 📋` or equivalent scope callout containing literal "script-based only" or "no Win32" phrasing
  - **PITFALL-2 callout:** `03-compliance-policy.md` opens with architectural callout containing literal `Require device to be marked as compliant` AND the words "not available" or "not supported" within the same callout block
  - **PITFALL-3 callout:** `01-intune-linux-agent.md` contains a deb-vs-Snap callout with literal "deprecated" or "preview" applied to Snap
- **D-25:** **Hardcoded H2 string assertions are pinned in the validator AND in CONTEXT.md.** If Phase 51+ wants to rename a Phase 50 H2, that requires same-commit validator update. CDI-Phase49-style brittleness trade-off the Referee accepts (Phase 49 D-25 precedent).

### Plan-level ordering and atomicity

- **D-26:** **Phase 50 plan order (single-commit atomicity per D-18):**
  1. **Authoring wave (parallel-safe):** All 8 content files + validator can be authored concurrently in worktrees. LIN-05 callout in `01-intune-linux-agent.md` consumes Phase 49 anchor (DPO-01 satisfied at Phase 50 startup — Adversary disprove of 4C confirmed).
  2. **Pre-commit gate:** Run all 8 pre-commit validations from D-20.
  3. **Single atomic commit:** All 8 content files + validator + 4 metadata-correction edits (ROADMAP × 2 + REQUIREMENTS × 2) per D-22 + commit message per D-19.
  4. **Post-commit verification:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose` → expect C1-C12 PASS, C13 informational PASS-or-noise. Run `node scripts/validation/check-phase-50.mjs` → expect all V-50-NN checks PASS.
  5. **VERIFICATION.md authored** (separate commit per Phase 49 close pattern) documenting validator pass + AUDIT-06 correction + DPO-01 inheritance verification + 5 SC# satisfaction proof + DPO-01..DPO-05 propagation summary for Phase 51+ plan authors.

### Claude's Discretion

- **CD-01:** Exact wording of `00-overview.md` back-link to Phase 49 cross-platform bridge subsection (DPO-03 mandates back-link not duplicate; the exact sentence and link-shape is author discretion). Reference: Phase 50 admin overview should NOT contain its own `## For Admins Familiar with Windows / macOS / Android` H2 — must back-link to `docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android` instead.
- **CD-02:** Mermaid diagram inclusion in `00-overview.md` setup-sequence — Phase 49 CD-02 deferred to Phase 50; macOS analog (`docs/admin-setup-macos/00-overview.md`) DOES include a Mermaid setup-sequence diagram. Author may include one for the 6-file setup sequence (00→01→02→{03,04,05} fan-out); recommended but not mandatory.
- **CD-03:** Exact prerequisites text in end-user file's `## Before you start` H2 (LIN-06 enumerates the 5 actions; the prerequisites preamble is end-user-friendly Author Discretion).
- **CD-04:** Whether `linux-capability-matrix.md` includes a `## Key Gaps Summary` H2 above `## See Also` (precedent: android-capability-matrix.md does include this; recommended for consistency).
- **CD-05:** Validator scope for end-user file H2 pinning. Recommended: pin all 5 H2 strings literally per D-09 mirroring Android end-user precedent. Author may rename one H2 if topical-fit improves AND validator pinning is updated same-commit.
- **CD-06:** Exact body prose for the 3 paired rows in Cross-Platform Equivalences H2 — D-13/D-14/D-15 specify attribution + anchor links + key disclosure points; the prose around them is Author Discretion within the partial-mapping discipline (PITFALL-1).
- **CD-07:** Whether `04-app-delivery.md` includes 1-2 minimal Bash example snippets vs concept-only overview. LIN-DEFER-01 defers Bash deep-dive to v1.5.1; Phase 50 should be concept-level + 1 minimal example AT MOST. Author Discretion within "PITFALL-1 whitelist-first framing" trim rationale.

### Cross-decision integration callouts (Referee Part C)

- **CDI-Phase50-01:** **D-01 × D-12 coupling — bilateral matrix shape forces Equivalences H2 placement.** A Win|Linux 2-column matrix has limited horizontal coverage; the Cross-Platform Equivalences H2 is the canonical mechanism for "vs all 4 platforms" coverage per LIN-13. Without 1C bilateral, GA-3's 3-pair count would be excessive; with 1C bilateral, 3 pairs becomes the natural completion.
- **CDI-Phase50-02:** **D-07 × D-11 × D-17 × D-21 × D-22 coupling — same-commit metadata bundle is enabled by D-18 atomicity.** GA-2 2E (2 wording corrections), GA-3 3B (1 SC#4 correction), GA-4 latent AUDIT-06 drift (1 workflow filename correction) all fold into the single Phase 50 atomic commit. Phase 49 D-17/D-18/CDI-03 same-commit-SC#-correction precedent governs all 4 corrections.
- **CDI-Phase50-03:** **3-status closed set (D-04) is validator-pinned — extends Phase 49 CDI-01.** Linux column cells in `linux-capability-matrix.md` and the Phase 49 whitelist H2 in `00-enrollment-overview.md` share the closed-set contract. If a 4th status string is ever needed, BOTH `check-phase-49.mjs` AND `check-phase-50.mjs` MUST update in the same commit.
- **CDI-Phase50-04:** **CA H2 elevation (D-02) creates anchor-stability contract for Phase 51+58.** `linux-capability-matrix.md#conditional-access` is the LOCKED anchor for Phase 51 L1 runbook 32 (CA blocking web-app access) and Phase 58 4-platform comparison Linux-row CA cells. Renaming this H2 in Phase 50+ requires same-commit Phase 51/58 updates.
- **CDI-Phase50-05:** **Pair 1 architectural correction (D-13) is precedent-grade.** SC#4 literal phrasing carried 3 W-CRIT defects (W-CRIT-1/2/3). Same-commit ROADMAP correction is the established mitigation pattern; downstream phases that consume the matrix's Equivalences H2 (Phase 58, v1.5.1) inherit the corrected attribution, NOT the SC#4 literal.

### Downstream phase obligations (Referee Part C — for next-phase plan authors)

- **DPO-01 (Phase 51 L1 runbook 30 cross-link target = end-user file, not admin file):** L1 Runbook 30 (`docs/l1-runbooks/30-linux-enrollment-failed.md`, LIN-08) deep-links the end-user enrollment STEPS section via `docs/end-user-guides/linux-intune-portal-enrollment.md#enroll-your-device` (or equivalent locked H2 anchor per D-09). Phase 51 plan author must reference the end-user-guides path, NOT `admin-setup-linux/02#some-anchor`.
- **DPO-02 (Phase 51 L1 runbook 32 cross-link target = matrix CA H2):** L1 Runbook 32 (CA blocking web-app access, LIN-10) deep-links `docs/reference/linux-capability-matrix.md#conditional-access` for the canonical "web-app CA only" assertion (PITFALL-2 routing discipline).
- **DPO-03 (Phase 56 DRIFT-07 owns encryption pairs; back-link only):** Phase 56 (`operations/drift-migration/04-tenant-migration-runbook.md` cross-platform encryption-drift section per REQUIREMENTS line 78) authors BitLocker / FileVault / dm-crypt cross-platform encryption-drift content. Phase 56 plan author MUST back-link to `linux-capability-matrix.md` BUT MUST NOT duplicate or contradict the 3 Phase-50-locked equivalence pairs (D-13/D-14/D-15). Encryption pair belongs to Phase 56 H2, not Phase 50 matrix.
- **DPO-04 (Phase 58 CLEAN-05 inherits 3-pair set as link source):** Phase 58 (`docs/reference/4-platform-capability-comparison.md`) Linux-column cells hyperlink INTO `linux-capability-matrix.md` H2 anchors (link-not-copy per AUDIT-04 C12). Phase 58 MUST NOT alter the 3 Phase-50-authored equivalence pairs; if Phase 58 needs OTHER non-Apple pairs (Linux↔Windows, Linux↔Android), they live as separate rows in Phase 58 — never overwrite Phase 50's authoritative 3-pair set. The 6 domain H2s + CA H2 elevation (D-02) are pinned anchor targets for Phase 58.
- **DPO-05 (Phase 59 CLEAN-08 hub nav adds symmetric admin + end-user references):** `docs/index.md` Linux H2 (Phase 59) MUST include both an Admin Setup sub-table row pointing at `docs/admin-setup-linux/` (6 files) AND an End-User Resources callout pointing at `docs/end-user-guides/linux-intune-portal-enrollment.md` — symmetric to Android's Phase 57 hub treatment of `docs/end-user-guides/android-work-profile-setup.md`.
- **DPO-06 (v1.5.1 LIN-DEFER-01 may add a 4th equivalence pair):** When the Bash custom-compliance deep-dive guide ships in v1.5.1, it MAY append a 4th pair to `linux-capability-matrix.md` Cross-Platform Equivalences (e.g., `Linux Bash custom compliance ≈ Windows Intune Remediations PowerShell`) — gated by `### Intune Remediations` H3 being added to `_glossary.md` AND the Bash deep-dive existing. Phase 50 ships the structural extensibility (Equivalences H2 with paired-row format); v1.5.1 may extend.
- **DPO-07 (Phase 50 anti-duplication vs Phase 49):** `00-overview.md` MUST NOT duplicate Phase 49 cross-platform bridge subsection (`docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android`) per DPO-03 inherited from Phase 49. Back-link only. `linux-capability-matrix.md` MUST NOT duplicate Phase 49 whitelist H2 (`#supported-management-surface`); the matrix EXTENDS the whitelist with the Win|Linux bilateral comparison + 6 domain H2s + 3-pair Equivalences but does not re-publish the whitelist verbatim.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before authoring or implementing.**

### Phase 50 success criteria + traceability (authoritative scope)

- `.planning/ROADMAP.md` §"Phase 50: Linux Admin Setup + Capability Matrix" (lines 180-196) — Goal, dependencies, requirements (LIN-03/04/05/06/13), 5 success criteria, methodology notes
- `.planning/ROADMAP.md` line 119 — Phase 50 file-list overview (target of D-22 wording correction "embedded" → "in docs/end-user-guides/")
- `.planning/ROADMAP.md` line 188 — SC#4 (target of D-17/D-22 same-commit correction; pair attribution rephrased + count "≥2" → "≥3")
- `.planning/ROADMAP.md` line 506 — append-only H2-block contract attribution (Phase 42 D-03)
- `.planning/REQUIREMENTS.md` §LIN-03 (line 26) — Linux Intune client enrollment configuration (admin)
- `.planning/REQUIREMENTS.md` §LIN-04 (line 27) — 4 settings-catalog compliance categories
- `.planning/REQUIREMENTS.md` §LIN-05 (line 28) — Identity Broker v2.0.2+ pitfall callout (1b FOLD)
- `.planning/REQUIREMENTS.md` §LIN-06 (line 29) — End-user enrollment 5-step walkthrough (target of D-22 traceability correction)
- `.planning/REQUIREMENTS.md` §LIN-13 (line 36) — Linux capability matrix bilateral + Cross-Platform Equivalences (web-app CA ↔ MAM-WE compliance-lite hint)
- `.planning/REQUIREMENTS.md` §LIN-DEFER-01 (line 95) — Bash deep-dive deferred to v1.5.1 (drives Pair 5 rejection in D-12)
- `.planning/REQUIREMENTS.md` §DRIFT-07 (line 78) — Phase 56 owns cross-platform encryption drift (drives Pair 4 rejection in D-12)
- `.planning/REQUIREMENTS.md` §AUDIT-06 (line 87) — Validator-as-deliverable + CI registration (target of D-21/D-22 workflow filename correction)
- `.planning/REQUIREMENTS.md` §"Traceability" line 148 (LIN-06 → Phase 50 02-enrollment-profile.md — target of D-22 path correction)
- `.planning/REQUIREMENTS.md` §"Traceability" line 155 (LIN-13 → Phase 50; literal "**bilateral**" word — drives D-01 GA-1 winner)

### Phase 49 foundation (Phase 50 directly consumes)

- `.planning/phases/49-linux-foundation-taxonomy-glossary-version-matrix/49-CONTEXT.md` — D-01 (3-status closed set) / D-02 (V-49-07 contract) / D-09 (LIN-05 anchor) / D-11 (5-category glossary) / D-14 (~21 native terms) / DPO-01 (Phase 50 back-link target) / DPO-02 (3-status inheritance) / DPO-03 (no bridge duplication) / DPO-04 (Phase 51-52 glossary anchor consumption) / CDI-01 (3-status validator-pinned)
- `.planning/phases/49-linux-foundation-taxonomy-glossary-version-matrix/49-VERIFICATION.md` — Phase 49 close gate; Phase 50 reads at startup. Whitelist literal dump (lines 12-36); version matrix (lines 38-56); collision audit (lines 58-93); reciprocal append verification (lines 95-101); validator output (lines 110-139); v1.5 milestone audit output (lines 141-160); DPO-01 through DPO-05 (lines 162-186)
- `docs/linux-lifecycle/00-enrollment-overview.md` — Phase 49 whitelist H2 (Phase 50 matrix extends, does not duplicate); cross-platform bridge subsection at `#for-admins-familiar-with-windows--macos--android` (DPO-03 anti-duplication target)
- `docs/linux-lifecycle/01-linux-prerequisites.md` — Phase 49 version matrix; Identity Broker H3 anchor at `#non-version-breakpoints` (DPO-01 LIN-05 callout back-link target)
- `docs/_glossary-linux.md` — Phase 49 glossary; Linux-side anchor sources for D-13/D-14/D-15 (intune-portal-package, microsoft-identity-broker, intune-agenttimer, web-app-ca; lines 80, 86, 92, 108)

### v1.5 research (authoritative for Linux scope, pitfalls, and tooling)

- `.planning/research/SUMMARY.md` lines 25-35 — Linux Intune client scope (Ubuntu 22.04/24.04 supported; Identity Broker v2.0.2+ behavior; web-app CA via Edge 102.x+)
- `.planning/research/SUMMARY.md` lines 65-75 — Pillar 2 Linux must-haves
- `.planning/research/SUMMARY.md` lines 165-175 — Phase 50 rationale + deliverables + pitfalls avoided (search "Phase 50")
- `.planning/research/SUMMARY.md` lines 250-285 — confidence ratings, open gaps
- `.planning/research/PITFALLS.md` §Pitfall 1 (lines 11-31) — Linux capability parity framing; partial-mapping discipline (drives D-13/D-14/D-15 paired-row attribution discipline; Pair 5 rejection)
- `.planning/research/PITFALLS.md` §Pitfall 2 (lines 33-56) — CA architectural callout mandate; literal `Not supported — web-app CA only` cell phrasing (line 48); drives D-02 CA H2 elevation + 03/05 architectural callouts
- `.planning/research/PITFALLS.md` §Pitfall 3 (lines 58-77) — Snap vs deb confusion; deb-only via packages.microsoft.com (drives 01-intune-linux-agent.md PITFALL-3 callout)
- `.planning/research/PITFALLS.md` §Pitfall 7 (lines 147-166) — DEFER-08 link-not-copy mandate (drives D-01 1A rejection + DPO-04 Phase 58 inheritance)
- `.planning/research/STACK.md` lines 1-100 — Linux Intune client tooling (intune-portal package, deb format, packages.microsoft.com, intune-agent.timer + microsoft-identity-broker systemd units; drives D-13 Pair 1 architectural correction)

### v1.4 Android admin-setup precedent (Phase 50 mirrors structurally)

- `docs/admin-setup-android/00-overview.md` — Phase 50 `00-overview.md` setup-sequence Mermaid analog (CD-02)
- `docs/admin-setup-android/04-byod-work-profile.md` — admin file with end-user-guides/ cross-link precedent (drives D-07 GA-2 2E winner; Phase 37 v1.4 implementation)
- `docs/admin-setup-android/03-fully-managed-cobo.md` — admin-setup with embedded provisioning method H3s (precedent for admin-with-end-user-flow patterns)
- `docs/end-user-guides/android-work-profile-setup.md` — Android end-user file precedent; Phase 37 v1.4 (drives D-09 H2 list mirroring)

### v1.4/v1.4.1 macOS / iOS analogs

- `docs/admin-setup-macos/00-overview.md` — admin-setup overview with Mermaid setup-sequence (CD-02 precedent)
- `docs/admin-setup-macos/02-enrollment-profile.md` — admin-only enrollment-profile analog (140 lines; drives D-08 H2 list: Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also)
- `docs/reference/macos-capability-matrix.md` — Win|macOS bilateral matrix precedent (PRIMARY structural template for D-01 1C); 5 H2 domains + Cross-Platform Equivalences; lines 22-87 cells
- `docs/reference/ios-capability-matrix.md` — 3-platform comparison (Win|macOS|iOS) — REJECTED as 1A precedent because it adds a focal-platform column not a 5-platform comparison
- `docs/reference/android-capability-matrix.md` — Cross-Platform Equivalences H2 placement precedent (lines 76-92); paired-row format with attribution (drives D-05/D-13/D-14/D-15)
- `docs/admin-setup-ios/07-device-enrollment.md` — verified `audience: admin` (Adversary corrected Finder's mischaracterization)
- `docs/admin-setup-ios/08-user-enrollment.md` — verified `audience: admin` (NOT end-user; drives 2D iOS-precedent disprove)

### v1.5 Phase 48 atomicity + harness contract precedent

- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-08 (C13 informational-first; drives Adversary disprove of "broken anchor refs cascades")
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-14 (pin-coord refresh atomicity; INVERSE precedent — drives 4A winner since Phase 50 has none)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-15 (YAGNI lazy-array-population; drives validator collision-allowlist deferral)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-18 (validator-as-deliverable + CI registration via lazy-skip pattern; drives D-23)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` D-25 (file-reads-only / no-shared-module; drives D-23 validator pattern)
- `scripts/validation/check-phase-49.mjs` — pattern exemplar for `check-phase-50.mjs` (V-49-07 column-aware regex extension target; lines 126-149 H2-string-anchored scope)
- `scripts/validation/v1.5-milestone-audit.mjs` — C10 blocking + C13 informational; Phase 50 files validated against both at commit time
- `.github/workflows/audit-harness-v1.5-integrity.yml` — already pre-registers `check-phase-50` job with lazy-skip (lines 101-115; verified by Wave-2 Adversary; "CI registration" is no-op for the YAML)

### v1.4 Phase 34 Android foundation (D-rule precedent chain)

- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-08 — mirror-discipline (drives D-01 macOS bilateral mirror)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-14 — 60-day `last_verified` cycle (drives D-03 frontmatter)
- `.planning/milestones/v1.4-phases/34-android-foundation/34-CONTEXT.md` D-26 — single-canonical-doc / Anti-Pattern 1 (drives D-01 1D rejection + DPO-07)

### Project-level context

- `.planning/PROJECT.md` §"Current Milestone: v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup" — full v1.5 scope
- `.planning/STATE.md` — current milestone state; v1.5 carry-forward patterns including PITFALL-7 whitelist-first lock for Linux (line 78)

### Downstream-phase dependencies (what Phase 50 unblocks)

- **Phase 51 (Linux L1 Triage + Runbooks 30-33)** consumes: 6 admin-setup-linux guides + capability matrix as locked references; LIN-05 callout in `01-intune-linux-agent.md` is canonical Identity Broker behavior anchor (DPO-01); end-user file at `docs/end-user-guides/linux-intune-portal-enrollment.md` for runbook 30 cross-link target (DPO-01 of THIS phase)
- **Phase 52 (Linux L2 Investigation Runbooks 24-25)** consumes: same admin-setup anchors + `check-phase-50.mjs` structural assertions as pattern reference for `check-phase-52.mjs`
- **Phase 56 (Drift Detection + Tenant Migration / DRIFT-07)** consumes: `linux-capability-matrix.md#cross-platform-equivalences` as back-link target only; owns the cross-platform encryption-drift section (BitLocker/FileVault/dm-crypt) per DPO-03 of THIS phase
- **Phase 58 (4-Platform Capability Comparison / CLEAN-05)** consumes: `linux-capability-matrix.md` 6 domain H2 anchors + 3-pair Cross-Platform Equivalences as link sources per AUDIT-04 C12 link-not-copy contract; the 3-pair set is the LOCKED FLOOR — Phase 58 may not alter (DPO-04 of THIS phase)
- **Phase 59 (Hub Navigation Integration / CLEAN-08)** consumes: both `docs/admin-setup-linux/` (6 files) AND `docs/end-user-guides/linux-intune-portal-enrollment.md` symmetric to Android Phase 57 treatment (DPO-05 of THIS phase)
- **Phase 60 (Audit Harness Finalization)** consumes: `check-phase-50.mjs` registered in `.github/workflows/audit-harness-v1.5-integrity.yml` (lazy-skip already in place); C12 promotion to blocking validates Phase 58 link-not-copy against `linux-capability-matrix.md` H2 anchors

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `scripts/validation/check-phase-49.mjs` — primary pattern exemplar for `check-phase-50.mjs`; V-49-07 column-aware regex (cell index 1) is direct ancestor of Linux-column 3-status assertion in D-04
- `scripts/validation/v1.5-milestone-audit.mjs` — C10 blocking + C13 informational; Phase 50 files validated against both at commit time
- `scripts/validation/regenerate-supervision-pins.mjs` — `--self-test` runs in pre-commit gate per D-20; no pin coordinates shift expected (Phase 50 has zero existing-file modifications, so PITFALL-12 surface is null)
- `.github/workflows/audit-harness-v1.5-integrity.yml` lines 101-115 — `check-phase-50` job already pre-registered with lazy-skip pattern (`if [ -f scripts/validation/check-phase-50.mjs ]`); D-23 satisfies AUDIT-06 CI-registration contract by file presence
- `docs/reference/macos-capability-matrix.md` — PRIMARY structural template for `linux-capability-matrix.md` (Win|macOS bilateral; 5 domains; cross-platform-style H2; drives D-01 + D-02 minus CA elevation)
- `docs/reference/android-capability-matrix.md` — secondary template; Cross-Platform Equivalences H2 below 5 domain tables; lines 76-92 paired-row format (drives D-05/D-13/D-14/D-15)
- `docs/admin-setup-macos/02-enrollment-profile.md` — D-08 H2 list direct mirror (Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also)
- `docs/admin-setup-android/04-byod-work-profile.md` — D-07 admin-with-end-user-cross-link precedent (Phase 37 v1.4)
- `docs/end-user-guides/android-work-profile-setup.md` — D-09 end-user H2 list mirror; `audience: end-user` precedent
- `docs/_glossary-linux.md` — Linux-side anchor sources for D-13/D-14/D-15 (lines 80, 86, 92, 108)
- `docs/_glossary-macos.md` — Apple-side anchor sources (`#mam-we`, `#apns`)
- `docs/linux-lifecycle/00-enrollment-overview.md` + `01-linux-prerequisites.md` — Phase 49 anchor targets for DPO-01 + DPO-03 back-links

### Established Patterns

- **Validator-as-deliverable (v1.3+ pattern, Phase 48 D-18):** `check-phase-50.mjs` ships in same commit as content; CI workflow pre-registered with lazy-skip
- **Atomicity-same-commit (Phase 42 D-20/D-22, Phase 43 D-07, Phase 48 D-14, Phase 49 D-22):** Phase 50 D-18 picks ONE-commit because the load-bearing reason for Phase 49's 2-commit split (pin-coord refresh atomicity per Phase 48 D-14) is absent in Phase 50 — Phase 50 has zero append-only edits to existing pinned files
- **Same-commit SC# correction (Phase 49 D-17/D-18/CDI-03):** D-17 + D-21 + D-22 fold 4 metadata corrections into the Phase 50 atomic commit — direct precedent
- **Mirror-discipline (Phase 34 D-08):** Linux files mirror sibling structural templates — admin-setup-linux mirrors admin-setup-macos; end-user-guides mirrors Android end-user precedent; capability-matrix mirrors macos-capability-matrix bilateral shape
- **3-status closed set (Phase 49 DPO-02 / CDI-01):** `Supported` / `Partial` / `Not supported` (with optional `— qualifier`) inherited by D-04; validator-pinned same-commit
- **PITFALL-7 whitelist-first (Phase 49 IS the lock):** Phase 50 matrix extends the whitelist with bilateral comparison; admin-setup files don't introduce capabilities outside Phase 49 whitelist
- **DPO-03 anti-duplication (Phase 49):** `00-overview.md` back-links to Phase 49 bridge; `linux-capability-matrix.md` extends but doesn't re-publish the whitelist
- **60-day `last_verified` cycle (Phase 34 D-14):** All 8 Phase 50 content files carry `last_verified` + `review_by` frontmatter on 60-day cycle
- **`platform: Linux` frontmatter (C10 blocking from Phase 48):** All 8 Phase 50 content files carry `platform: Linux`

### Integration Points

- **6 domain H2s + CA elevation in `linux-capability-matrix.md`** is the canonical Win|Linux bilateral comparison anchor; downstream Phase 51 L1 runbook 32 + Phase 56 DRIFT-07 + Phase 58 4-platform comparison cite back via per-domain anchor (most importantly `#conditional-access` for PITFALL-2 routing per DPO-02 of THIS phase)
- **Cross-Platform Equivalences H2 with 3 paired rows** is the canonical Linux↔Apple analogy layer for Phase 58 inheritance per AUDIT-04 C12 link-not-copy contract
- **End-user file at `docs/end-user-guides/linux-intune-portal-enrollment.md`** is the canonical end-user enrollment walkthrough; Phase 51 runbook 30 deep-links here; Phase 59 hub nav (`docs/index.md`) Linux H2 includes a symmetric End-User Resources callout
- **LIN-05 Identity Broker callout in `01-intune-linux-agent.md`** back-links to Phase 49 H3 anchor `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints` (DPO-01 inherited); Phase 50 owns the admin-action callout, Phase 49 owns the matrix-context anchor
- **`check-phase-50.mjs`** registered via lazy-skip in `.github/workflows/audit-harness-v1.5-integrity.yml`; CI runs on every PR + scheduled bitrot
- **Same-commit metadata bundle (D-22)** propagates ROADMAP.md + REQUIREMENTS.md edits with content + validator atomically — single revert restores entire pre-Phase-50 state

</code_context>

<specifics>
## Specific Ideas

- **12-agent adversarial review across 3 parallel waves** (4 Finder + 4 Adversary + 4 Referee) on 4 gray areas with 16 candidate options. Wave-1 Finder raw scoring totals: GA-1 1A=68/1B=19/1C=34/1D=54; GA-2 2A=47/2B=42/2C=42/2D=67; GA-3 3A=37/3B=62/3C=81/3D=136; GA-4 4A=13/4B=47/4C=52/4D=57. Wave-2 Adversary disprove totals (gain): GA-1 +76 (16 disproves); GA-2 +81 (13 disproves); GA-3 +5 (1 disprove, very conservative); GA-4 +73 (12 disproves). Wave-3 Referee final ranking (lower=better): GA-1 1C(15)<1B(24)<1A(41)<1D(53); GA-2 2E(referee-introduced)>2A(17)<2C(22)<2B(27)<2D(49); GA-3 3B(62 with rephrased Pair 1)<3A(72)<3C(92)<3D(112); GA-4 4A(2)<4B(26)<4C(32)<4D(36). Downstream agents should read 50-DISCUSSION-LOG.md alongside this CONTEXT to understand rejected alternatives + the specific evidence chain that locked each winner.

- **"REQUIREMENTS line 155 'bilateral' is a SCOPE-LOCK":** Wave-3 GA-1 Referee surfaced this CRITICAL finding both Finder and Adversary missed. REQUIREMENTS.md line 155 traceability row reads literally: `linux-capability-matrix.md — bilateral; Cross-Platform Equivalences section; explicit Not supported cells`. ROADMAP.md line 119 also uses "bilateral". This single literal word disqualifies 1A (5-column), 1B (Linux-only), and 1D (two-view) — leaving 1C (Linux↔Windows bilateral) as the only scope-lock-compliant option. Lesson for future referees: search the REQUIREMENTS traceability and ROADMAP file-list lines for binding adjective constraints, not just SC# bullets.

- **"2E was referee-introduced":** Wave-3 GA-2 Referee promoted a 5th option (split-by-audience-directory) that wasn't in the original 4 candidates. Justification: shipped Android v1.4 BYOD precedent at Phase 37 (`docs/admin-setup-android/04-byod-work-profile.md` cross-links to `docs/end-user-guides/android-work-profile-setup.md`) is a binding architectural precedent for "admin guide stays admin-audience; end-user content lives in end-user-guides/ with cross-link". Without 2E, ALL 4 original options had material weaknesses — 2A keeps audience contract violation; 2B/2C demote LIN-06 status; 2D violates 6-file count + numbering scheme. 2E satisfies all constraints with one cost: 2 small wording corrections in REQUIREMENTS.md + ROADMAP.md (D-22 bundle).

- **"Pair 1 architectural correction (D-13) is precedent-grade":** SC#4's literal phrasing (`intune-portal service ≈ macOS LaunchDaemon`) carried 3 verified CRITICAL defects: (W-CRIT-1) intune-portal is a deb package, not a service; the Linux-side analog is `microsoft-identity-broker` (system-scope) + `intune-agent.timer` (user-scope); (W-CRIT-2) `LaunchDaemon` has no H3 anchor in `_glossary-macos.md` (verified zero matches); (W-CRIT-3) LaunchDaemon is system-scope while `intune-agent.timer` is user-scope (per `_glossary-linux.md` line 82) — the correct user-scope macOS analog is `LaunchAgent`. Phase 49 D-17/D-18/CDI-03 same-commit-SC#-correction precedent is binding (Phase 49 corrected SC#4 from "all 4 existing platform glossaries" to "all 3" same-commit). D-17 ships the corrected pair attribution; downstream Phase 58 inherits the corrected version, NOT the SC#4 literal.

- **"AUDIT-06 workflow filename drift discovered during atomicity adversary":** Wave-2 GA-4 Adversary surfaced that REQUIREMENTS.md line 87 names `audit-harness-integrity.yml` (frozen v1.4 file) but the v1.5 file is `audit-harness-v1.5-integrity.yml` (live registrar with `check-phase-50` lazy-skip job already pre-registered at lines 101-115). Same Phase 49 D-17/D-18 precedent governs same-commit correction (D-21 + D-22).

- **"Phase 50 has ZERO append-only edits to existing pinned files":** This is the load-bearing fact that makes 4A (ONE atomic commit) the right call. Phase 49 D-22 chose 2-commit split because commit-2 was specifically reciprocal appends to existing pinned `_glossary-{platform}.md` files (PITFALL-12 pin-coord refresh required). Phase 50 has all NEW files in scope (6 admin-setup-linux + 1 end-user-guides + 1 reference matrix + 1 validator) — no existing-pinned-file modifications. Phase 49 D-22's 1-commit rejection rationale ("bundles append-only edits with new-file authoring") DOES NOT TRANSFER. Wave-2 GA-4 Adversary made this asymmetric-precedent argument; Wave-3 GA-4 Referee confirmed.

- **"Same-commit metadata bundle (D-22) is enabled by 4A atomicity":** GA-2 2E + GA-3 3B + GA-4 latent AUDIT-06 drift collectively require 4 metadata edits (2 in ROADMAP.md, 2 in REQUIREMENTS.md). Splitting Phase 50 into 2+ commits would force the question "which commit owns which metadata edit" — 4A's atomicity makes this question vanish. CDI-Phase50-02 captures this cross-decision integration.

- **"6 domain H2s with CA elevated":** The macOS sibling matrix has 5 domains (Enrollment / Configuration / App Deployment / Compliance / Software Updates) with CA folded into Compliance. Linux's CA architecture is DISTINCT and asymmetric (web-app CA only via Edge; no device-level CA grant) — elevating CA to its own H2 (D-02) gives PITFALL-2's mandatory architectural callout a stable per-domain anchor that L1 Runbook 32 and Phase 58 4-platform comparison can deep-link to. Resolves residual concern 1C.6 from GA-1 Finder.

- **"No glossary append needed":** D-16 — the 3 paired rows (D-13/D-14/D-15) reference 6 anchor sources that all already exist in `_glossary-linux.md` and `_glossary-macos.md`. Materially better than 3C/3D which would force Phase 50 to author H3 anchors for BitLocker / FileVault / Intune Remediations across 3 separate glossary files (violating Phase 50's scope and triggering DRIFT-07/LIN-DEFER-01 phase-creep).

</specifics>

<deferred>
## Deferred Ideas

- **4th equivalence pair (Linux Bash custom compliance ≈ Windows Intune Remediations PowerShell):** Per LIN-DEFER-01 deferred to v1.5.1; v1.5.1 plan author may append a 4th pair to `linux-capability-matrix.md` Cross-Platform Equivalences H2 — gated by (a) `### Intune Remediations` H3 being added to `_glossary.md` AND (b) Bash custom-compliance deep-dive guide existing. Phase 50 ships the structural extensibility; v1.5.1 may extend.

- **5th equivalence pair (encryption: dm-crypt+LUKS ≈ BitLocker / FileVault):** Per DRIFT-07 owned by Phase 56 cross-platform encryption-drift section. Phase 56 plan author back-links to `linux-capability-matrix.md` for LIN-13 inheritance but does NOT author a 4th pair in Phase 50's matrix. The encryption discussion belongs in `operations/drift-migration/04-tenant-migration-runbook.md` (Phase 56 deliverable per REQUIREMENTS line 78).

- **`### LaunchDaemon` / `### LaunchAgent` H3 anchors in `_glossary-macos.md`:** Pair 1 attribution (D-13) references "IntuneMDMDaemon LaunchAgent" without anchoring it as a glossary H3. If a glossary anchor is needed for Phase 58 inheritance or future analog work, Phase 56+ may add the H3 entries — out of Phase 50 scope (would expand the same-commit metadata bundle beyond the 4 corrections).

- **`### BitLocker` / `### FileVault` / `### Intune Remediations` H3 anchors in Windows / Apple glossaries:** Same rationale as above — out of Phase 50 scope; v1.5.1 LIN-DEFER-01 or Phase 56 DRIFT-07 may add when their own deliverables need them.

- **`### LaunchAgent` vs `### LaunchDaemon` cross-platform note in `_glossary-linux.md#intune-agenttimer`:** Phase 49 already includes a cross-platform note at `_glossary-linux.md:84`; could be expanded to explicitly call out user-scope vs system-scope macOS distinction. Out of Phase 50 scope (would modify Phase 49-pinned file).

- **Mermaid diagram in `00-overview.md`:** CD-02 Author Discretion. macOS analog includes one; recommended but not mandatory. Author may omit if 6-file setup-sequence is simpler than mermaid adds value.

- **Mermaid diagram in `linux-capability-matrix.md`:** Out of scope. The bilateral table + Equivalences H2 + Key Gaps Summary delivers the comparison without a diagram. android-capability-matrix.md does not include one.

- **`linux-capability-matrix.md` "Key Gaps Summary" H2 content:** CD-04 Author Discretion. Recommended for consistency with android-capability-matrix.md; content distills the most-significant Linux-vs-other-platform deltas into 5-7 prose paragraphs.

- **`docs/end-user-guides/linux-intune-portal-enrollment.md` screenshots:** Out of scope. v1.0-v1.4.1 docs are markdown-only / no embedded screenshots policy. End-user file describes UI flows in prose.

- **Frontmatter `applies_to:` for end-user file:** Tentatively `applies_to: enrollment`. If C10 check enforces `applies_to` as a closed set, validator may need extension; for now, follow precedent of `docs/end-user-guides/android-work-profile-setup.md` (verify its frontmatter at authoring time).

### Reviewed Todos (not folded)

*(No pending todos matched Phase 50 scope — `gsd-tools todo match-phase 50` returned 0 matches.)*

</deferred>

---

*Phase: 50-linux-admin-setup-capability-matrix*
*Context gathered: 2026-04-27*
*Adversarial review applied: 12 agents (4 Finder + 4 Adversary + 4 Referee) across 3 parallel waves on 4 gray areas covering 16 candidate options*
*Wave-1 Finder raw → Wave-2 Adversary disproves → Wave-3 Referee final verdicts; 5th option (2E) referee-introduced from shipped Android v1.4 BYOD precedent*
*Same-commit metadata bundle (D-22): 4 corrections in ROADMAP.md + REQUIREMENTS.md ship atomically with content per Phase 49 D-17/D-18/CDI-03 precedent*
