# Phase 42: Integration & Milestone Audit - Context

**Gathered:** 2026-04-24
**Status:** Ready for planning
**Method:** Adversarial review (finder → adversary → referee) across 4 gray areas, 12 sub-agents, 3 parallel waves

<domain>
## Phase Boundary

Phase 42 delivers four capstone artifacts that close v1.4 Android Enterprise enrollment documentation:

1. `docs/reference/android-capability-matrix.md` — Android mode × feature matrix with a dedicated cross-platform equivalences section (AEAUDIT-01)
2. `docs/index.md` — minimal Android stub (one Choose-Your-Platform bullet + new H2 with 2 links + Cross-Platform References table row) (AEAUDIT-02)
3. `docs/_glossary-macos.md` — single-line reciprocal see-also pointing to `_glossary-android.md`, appended to the existing line-10 banner blockquote (AEAUDIT-03)
4. `.planning/milestones/v1.4-MILESTONE-AUDIT.md` produced via a Node harness at `scripts/validation/v1.4-milestone-audit.mjs` running 5 mechanical checks against a committed allow-list sidecar (AEAUDIT-04)

**Out of scope (explicitly deferred, do not re-open in Phase 42):**
- Full cross-platform nav integration (backport Android into `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md` banner/H1 narrative) → post-v1.4 unification task (AENAVUNIFY-04)
- 4-platform (Windows|macOS|iOS|Android) capability comparison document → v1.5 (AECOMPARE-01)
- Knox Mobile Enrollment, full AOSP admin content, full COPE admin path → v1.4.1
- Re-gating of Phase 39 AOSP stub word-count (Phase 39 self-certified; Phase 42 records drift as tech debt only)
- `docs/_glossary.md` (Windows) → `_glossary-android.md` reciprocal link (AEAUDIT-03 names only `_glossary-macos.md`)

</domain>

<decisions>
## Implementation Decisions

### Cross-cutting contracts (apply to all plans)

- **D-01:** **Gap-handling policy = read-only-audit + on-demand Phase 43** (P-A). If audit exits `status: passed`, milestone ships on Phase 42 close via `/gsd-complete-milestone 1.4`. If audit finds gaps, user invokes `/gsd-plan-milestone-gaps` to spawn Phase 43 reactively (v1.3 Phase 33 precedent, same-day seeding). No Phase 43 pre-allocation.
- **D-02:** **Auditor independence required.** The Phase 42 audit-run plan MUST spawn a subagent distinct from the authors of AEAUDIT-01/02/03 content plans (names recorded in `performed_by` frontmatter of the audit doc, v1.3 precedent). Phase 43 (if spawned) similarly spawns fresh subagents for fixes vs. re-audit.
- **D-03:** **Checkbox flip protocol.** AEAUDIT-01/02/03 flip `[ ]` → `[x]` in REQUIREMENTS.md when their content VERIFICATION.md scores SATISFIED. AEAUDIT-04 flips `[x]` ONLY when `v1.4-MILESTONE-AUDIT.md` exits with `status: passed` or `status: tech_debt` (latter requires explicit user acceptance). A dedicated plan (`42-0N-PLAN.md — REQUIREMENTS.md traceability sync`) flips the checkboxes in a single atomic commit, mirroring v1.3 commit 48ad757.
- **D-04:** **Finding classification.** Every audit finding tagged `kind: validation-gap | content-gap | integration-gap`. Validation-gaps route through `/gsd-validate-phase`; content-gaps through authored retrofit plans; integration-gaps through atomic single-plan fixes.
- **D-05:** **Deferral criteria (4-part objective test).** A finding is `v1.4.1-deferred` when ALL FOUR hold: (i) not affecting any `[x]` Complete requirement's core SC; (ii) severity ≤ WARNING; (iii) fix estimated > 1 plan OR depends on out-of-scope capability; (iv) explicit user acceptance recorded in audit frontmatter `deferred_items`. Otherwise `phase-43-fix`.
- **D-06:** **ROADMAP pre-flight fix.** ROADMAP.md Phase 42 section (lines 246-253) has a copy-paste bug listing `41-0X-PLAN.md` entries instead of `42-0X-PLAN.md` entries. Plans table must be rewritten to reflect Phase 42's actual plan roster before execution. Plan count in progress table (line 301) flips from `0/TBD` to explicit count.
- **D-07:** **SC#1 cross-platform wording governs over AEAUDIT-01.** REQUIREMENTS.md line 92 (AEAUDIT-01) says "column" singular with 2 pair examples and "etc."; ROADMAP line 240 (Phase 42 SC#1) says "columns" plural with 3 explicit pairs. SC#1 is the binding acceptance test (most specific, most recent). Capability matrix ships 3 paired cross-platform rows.

### Android Capability Matrix (AEAUDIT-01 / SC#1)

- **D-08:** **Shape = S-C Hybrid.** Primary content is an Android-mode-first matrix; a separate H2 "Cross-Platform Equivalences" section carries 3 paired comparison rows per SC#1.
- **D-09:** **Domains = D-A iOS-5 verbatim** (Enrollment / Configuration / App Deployment / Compliance / Software Updates), in this order, matching `docs/reference/ios-capability-matrix.md` and `docs/reference/macos-capability-matrix.md` sibling-spine. Android-specific surfaces slot INTO these 5 domains:
  - Play Integrity → Compliance (replaces iOS jailbreak analog; flag mode-differentiation: Basic / Basic+Device / Strong integrity)
  - AMAPI migration (April 2025) → App Deployment footnote with deferral-footer pattern
  - Managed Home Screen (MHS) → App Deployment (Dedicated row)
  - Tri-portal (Intune + MGP + Zero-Touch portal) → Enrollment cells reference portal requirement
- **D-10:** **Primary-matrix rows (D-22/D-23/D-26).** Exactly 5 mode rows in this order: COBO (Fully Managed) / BYOD (Work Profile) / Dedicated (COSU) / ZTE (Zero-Touch) / AOSP (stub reference). AOSP row is stub-reference only — cells contain "AOSP stub — see [stub file link]" with zero feature expansion.
- **D-11:** **Cross-Platform Equivalences H2 — exactly 3 paired rows in this order:**
  1. iOS Supervision ↔ Android Fully Managed (COBO)
  2. Apple ADE ↔ Google Zero-Touch Enrollment (ZTE)
  3. iOS User Enrollment (Account-Driven) ↔ Android Work Profile (BYOD)
  Each row structurally has left-column (Apple) and right-column (Android); paired table shape structurally satisfies SC#1 "columns" plural.
- **D-12:** **AEAUDIT-04 supervision-term writing rule.** The word "supervision" / "supervised" appears ONLY as iOS-attributed reference in the Cross-Platform Equivalences section. Headers: "iOS Supervision (ADE)" and "Android Fully Managed (COBO)" — explicit platform attribution on each side. Prepend HTML comment at section head: `<!-- AEAUDIT-04: "supervision" in this section MUST be iOS-attributed only. -->`
- **D-13:** **Anti-Pattern 1 guard (D-26 carry-forward).** Cells link to `02-provisioning-methods.md` for method support, link to `03-android-version-matrix.md` for version gates, link to `00-enrollment-overview.md` for narrative bridging. No grids duplicated from canonical source.
- **D-14:** **Deferral footers (mandatory).** End of doc carries three footer blocks: (a) Knox Mobile Enrollment deferred to v1.4.1; (b) Full AOSP coverage deferred to v1.4.1; (c) 4-platform Windows|macOS|iOS|Android unified comparison deferred to v1.5 (AECOMPARE-01) — **explicitly state the 3 paired rows are NOT a 4-platform comparison** to preempt AECOMPARE-01 encroachment.
- **D-15:** **Section ordering (locked):** (1) Frontmatter → (2) `# Intune: Android Capability Matrix — Modes by Feature` → (3) Lead paragraph naming 5 modes and pointing to cross-platform section → (4-8) 5 domain H2s (Enrollment/Configuration/App Deployment/Compliance/Software Updates) → (9) H2 Cross-Platform Equivalences → (10) H2 Key Gaps Summary (Android-specific parity with iOS/macOS 7-8 gap tails) → (11) H2 See Also (sibling matrices, overview, provisioning, version matrix) → (12) Deferral footers block.
- **D-16:** **Frontmatter contract.** `platform: Android`, `audience: admin`, `applies_to: both`, `last_verified: YYYY-MM-DD`, `review_by: last_verified + 60 days` (per Phase 34 D-14; NOT the 90-day cycle used by iOS/macOS matrices).
- **D-17:** **Anchor lock (planner-enforced).** Downstream phases and runbooks cross-link via: `#enrollment`, `#configuration`, `#app-deployment`, `#compliance`, `#software-updates`, `#cross-platform-equivalences`, `#key-gaps-summary`, `#see-also`. Renames forbidden after Phase 42 commit.
- **D-18:** **Visual grammar.** Reuse `ios-capability-matrix.md`'s `🔒` glyph convention as `🔒 COBO-only` / `🔒 FM/DO-only` for mode-restricted capabilities.

### docs/index.md Android Stub (AEAUDIT-02 / SC#2) — I-A True-Minimal

- **D-19:** **Stub depth = I-A.** Exactly three additions, zero edits to existing Windows/macOS/iOS sections:
  1. **One bullet in Choose Your Platform list** (after the existing `iOS/iPadOS Provisioning` bullet, before the `Cross-Platform References` bullet):
     ```
     - [Android Enterprise Provisioning](#android-enterprise-provisioning) -- Android device provisioning via Intune (Zero-Touch, Fully Managed, Work Profile, Dedicated, AOSP stub)
     ```
  2. **One new H2 section** placed AFTER the iOS/iPadOS Provisioning section's closing `---`, BEFORE the `## Cross-Platform References` H2. Exact body — 1 paragraph with exactly 2 links and a closing `---`:
     ```markdown
     ## Android Enterprise Provisioning

     Troubleshooting, investigation, and setup guides for Android Enterprise provisioning through Microsoft Intune. For terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md). For enrollment paths, see the [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md).

     ---
     ```
     No L1/L2/Admin subsections. No tables. No banner callout. AENAVUNIFY-04 owns the full parity H2.
  3. **One new row in the Cross-Platform References table** (inserted between the existing `_glossary-macos.md` row and the `Windows vs macOS` row):
     ```
     | [Android Enterprise Provisioning Glossary](_glossary-android.md) | Android Enterprise terminology (Work Profile, COBO, COPE, Zero-Touch, DPC, Managed Google Play) |
     ```
- **D-20:** **AEAUDIT-02 "existing sections untouched" interpretation.** The Cross-Platform References table is NOT a Windows/macOS/iOS platform section — it's a shared cross-platform resource table. Adding a row is strictly additive, does not mutate existing rows, and does not pre-empt AENAVUNIFY-04's platform-H2 parity work. In-scope for AEAUDIT-02.
- **D-21:** **Version History row** (append-only): `| 2026-04-24 | Phase 42: added Android Provisioning stub H2, Choose-Your-Platform bullet, Android Glossary cross-reference entry (AEAUDIT-02) | -- |`.
- **D-22:** **Lines that MUST NOT be modified in docs/index.md:**
  - Lines 1-7 (frontmatter) — `last_verified` may bump to 2026-04-24; other fields untouched
  - Line 9-10 (platform-coverage banner) — AENAVUNIFY-04 owns
  - Line 14 (H1 narrative) — AENAVUNIFY-04 owns
  - Lines 25-92 (Windows Autopilot section) — UNTOUCHED
  - Lines 95-126 (macOS Provisioning section) — UNTOUCHED
  - Lines 130-162 (iOS/iPadOS Provisioning section) — UNTOUCHED
  - Existing Cross-Platform References rows — UNTOUCHED (only one new row inserted)

### docs/_glossary-macos.md See-also (AEAUDIT-03 / SC#3) — G-A Banner-Extend

- **D-23:** **Exactly one sentence appended to the existing line-10 continuation blockquote.** Change line 10 from:
  ```
  > For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).
  ```
  to:
  ```
  > For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).
  ```
  **Rationale:** Matches `_glossary-android.md:11` multi-sibling continuation-banner pattern (one blockquote points at both sibling glossaries in a single continuation line). "1-line" in AEAUDIT-03 is interpreted as "one added sentence on the existing continuation line" — preserves 2-line blockquote structure, no new line inserted, line count unchanged.
- **D-24:** **Lines that MUST NOT be modified in docs/_glossary-macos.md:**
  - Lines 1-7 (frontmatter) — `last_verified` may bump to 2026-04-24; other fields untouched
  - Line 9 (first banner line — "This glossary covers Apple-platform…") — UNTOUCHED
  - Line 11 onward (all term content, category headings, version history) — UNTOUCHED
  - Version History row may be appended (Phase 42 provenance row) — counts as provenance, not content modification.

### Audit Mechanism + Mechanical Checks (AEAUDIT-04 / SC#4 / SC#5) — E-B Scripted + R-B Contextual Allow-list

- **D-25:** **Execution mechanism = E-B.** Node harness at `scripts/validation/v1.4-milestone-audit.mjs` (ESM, cross-platform, mirroring `scripts/validation/check-phase-30.mjs` and `check-phase-31.mjs` conventions). Stdout assertion format matching precedent:
  ```
  [1/5] C1: Zero SafetyNet as compliance mechanism .......... PASS
  [2/5] C2: Zero supervision as Android mgmt term ........... PASS
  [3/5] C3: AOSP stub word count within Phase 39 envelope ... PASS (informational — Phase 39 self-certification)
  [4/5] C4: Zero Android links in deferred shared files ..... PASS
  [5/5] C5: last_verified frontmatter on all Android docs ... PASS

  Summary: 5 passed, 0 failed, 0 skipped
  ```
  Exit 0 on all pass; exit 1 on any fail. `--verbose` prints per-file detail on PASS as well.
- **D-26:** **Sidecar allow-list.** `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` — committed JSON with pinned `file:line` exemptions for SafetyNet historical-context and supervision iOS-bridge prose. JSON shape matches Phase 31 `parseInventory()` precedent.
- **D-27:** **Check C1 — SafetyNet semantic zero.**
  - Scope glob: all Android doc paths (see D-31)
  - Regex: `/SafetyNet/g`
  - Pass if: 0 matches OR every match has ≥1 of `/successor|turned off|deprecated|Play Integrity/i` within ±200 chars OR `{file, line}` appears in `allowlist.safetynet_exemptions[]`
  - Pinned exemptions (4): `docs/_glossary-android.md:138`, `docs/_glossary-android.md:150`, `docs/android-lifecycle/03-android-version-matrix.md:85`, `docs/android-lifecycle/03-android-version-matrix.md:87`
- **D-28:** **Check C2 — supervision semantic zero.**
  - Scope glob: all Android doc paths
  - Regex: `/\bsupervis(ion|ed|ory)\b/gi`
  - Pass if: every match's `{file, line}` appears in `allowlist.supervision_exemptions[]`
  - Pinned exemptions (10): `_glossary-android.md:65, 67, 134, 148`; `android-lifecycle/00-enrollment-overview.md:51, 53, 83`; `admin-setup-android/03-fully-managed-cobo.md:35`; `l2-runbooks/20-android-app-install-investigation.md:21`; `l2-runbooks/21-android-compliance-investigation.md` (scan at authoring; pin any hits). Plan 42-0N-PLAN responsible for final enumeration must re-scan at authoring time and pin exhaustively.
- **D-29:** **Check C3 — AOSP word-count INFORMATIONAL ONLY.** Computes body word count (excluding frontmatter `---...---`, `## See Also`, `## Changelog`). Reports drift from Phase 39 envelope 600-900. Always PASS in Phase 42; emits tech-debt note into audit doc if body outside envelope. **Phase 42 does NOT re-gate Phase 39 self-certification** (matches v1.3 handling of 6/7 PARTIAL phases). Current stub at 1197 total / ~1089-1159 body → recommend `/gsd-validate-phase 39` in v1.4.1.
- **D-30:** **Check C4 — deferred-file Android-link guard.**
  - Targets: `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`
  - Regex scoped to markdown link targets only: `/\]\([^)]*(android|aosp|byod-work-profile|zero-touch|managed-google-play|play-integrity|managed-home-screen|amapi)[^)]*\)/i`
  - Pass if: 0 matches. No allow-list — this is the v1.4 deferred-file guard.
- **D-31:** **Check C5 — last_verified freshness + scope expansion.** Target globs explicitly enumerated (EXTENDED per cross-cutting finding: decision-trees/ and end-user-guides/ are in-scope):
  - `docs/_glossary-android.md`
  - `docs/android-lifecycle/**/*.md`
  - `docs/admin-setup-android/**/*.md`
  - `docs/decision-trees/08-android-triage.md` (if exists at audit time)
  - `docs/end-user-guides/android-*.md`
  - `docs/l1-runbooks/22-android-*.md`, `23-*`, `24-*`, `25-*`, `26-*`, `27-*`
  - `docs/l2-runbooks/18-android-*.md`, `19-*`, `20-*`, `21-*`
  - `docs/reference/android-capability-matrix.md` (activates after AEAUDIT-01 lands)
  - `docs/_templates/admin-template-android.md`

  Per-file assertions: frontmatter present (`^---\n...\n---`); `last_verified: YYYY-MM-DD` (ISO-8601, not "TBD"/null); `review_by: YYYY-MM-DD`; `review_by - last_verified ≤ 60 days` (matches Phase 39 39-01-11 structural check; Phase 34 D-14 locks 60-day cycle for Android).

- **D-32:** **Audit doc shape.** `.planning/milestones/v1.4-MILESTONE-AUDIT.md` inheriting v1.3-MILESTONE-AUDIT.md YAML frontmatter pattern:
  ```yaml
  milestone: v1.4
  milestone_name: Android Enterprise Enrollment Documentation
  audited: <ISO timestamp>
  status: passed | gaps_found | tech_debt
  scores:
    requirements: 37/37
    phases: 9/9
    integration: <N>/<N>_flows_clean
    flows: <N>/<N>
    nyquist: <summary>
  mechanical_checks:
    harness: scripts/validation/v1.4-milestone-audit.mjs
    allowlist: .planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json
    last_run: <ISO>
    commit: <sha>
    results:
      C1_safetynet_semantic: passed
      C2_supervision_semantic: passed
      C3_aosp_wordcount: informational (body N words vs Phase 39 envelope 600-900 — tech debt, recommend /gsd-validate-phase 39)
      C4_deferred_file_guard: passed
      C5_last_verified_freshness: passed
  performed_by: "<subagent identity>"
  deferred_items: [ ... ]
  ```
  Body: Executive Summary → Requirements Coverage table → Phase-Level Status → Integration Findings → Mechanical Checks Summary → Tech Debt → Recommended Next Steps → Deferred Items.

### Claude's Discretion
- Exact prose tone and length of the capability matrix lead paragraph (parallels iOS/macOS lead-paragraph shape, audience-mixed)
- Exact wording of each of the 3 cross-platform equivalence paired rows (as long as D-12 writing rule is honored)
- Exact Key Gaps Summary item count and phrasing (iOS has 8, macOS has 7 — author chooses parity target)
- Exact visual layout of the paired cross-platform rows (table vs stacked blockquotes — both satisfy SC#1 structurally)
- Node harness internal implementation details (single file vs helper module import) as long as stdout assertion format matches precedent
- Allow-list JSON schema internal fields (but top-level keys `safetynet_exemptions` and `supervision_exemptions` are contract)
- Plan count and wave structure — recommended ≥7 plans (see D-33)

### Folded Todos
None — `gsd-tools todo match-phase 42` returned zero matches.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements, Roadmap, Project
- `.planning/REQUIREMENTS.md` — AEAUDIT-01 (line 92), AEAUDIT-02 (line 93), AEAUDIT-03 (line 94), AEAUDIT-04 (line 95); traceability table lines 191-194 (currently `[ ]` Pending)
- `.planning/ROADMAP.md` — Phase 42 goal line 236, SC#1–SC#5 lines 240-244 (SC#1 governs over AEAUDIT-01 per D-07); Phase 42 Plans table lines 246-253 HAS COPY-PASTE BUG to fix per D-06
- `.planning/PROJECT.md` — v1.4 scope decisions, cross-platform nav deferral (line 144), 4-platform comparison deferral (line 146), Knox/AOSP/COPE v1.4.1 deferrals (line 142)
- `.planning/STATE.md` — milestone state, Phase 41 completion flag

### Structural Precedents (PRIMARY templates)
- `docs/reference/ios-capability-matrix.md` — **PRIMARY structural template** for capability matrix (5-domain Apple-family spine, trilateral Windows|macOS|iOS column count, 🔒 glyph convention, 8-item Key Gaps Summary tail)
- `docs/reference/macos-capability-matrix.md` — 5-domain bilateral precedent (7-item Key Gaps Summary tail)
- `docs/_glossary-macos.md` lines 9-10 — existing 2-line continuation-banner blockquote; D-23 extends line 10 only
- `docs/_glossary-android.md:11` — multi-sibling continuation-banner pattern (the structural precedent D-23 matches)
- `docs/_glossary.md:9-11` — Windows glossary 3-line continuation banner (confirms continuation pattern is precedent, not exception)
- `docs/index.md` — stub insertion target; cross-platform-references table at lines 168-183

### Milestone Audit Precedents
- `.planning/milestones/v1.3-MILESTONE-AUDIT.md` — **PRIMARY audit-doc template** (YAML frontmatter with `scores`, `gaps_closed`, `re_audit_resolution`, `tech_debt`, `nyquist` sub-keys; markdown body with Executive Summary / Requirements Coverage table / Phase-Level Status / Integration Findings)
- `.planning/milestones/v1.2-MILESTONE-AUDIT.md` — `gaps_found` precedent resolved via `/gsd-complete-milestone 1.2` (no gap-closure phase — deferral exit path for D-05 tier-4 findings)
- `.planning/milestones/v1.1-MILESTONE-AUDIT.md` — tech_debt-status ship precedent (deferral exit path)
- `.planning/milestones/v1.0-MILESTONE-AUDIT.md` — multi-iteration audit precedent (3 audits, Phases 8/9/10 all REACTIVE — validates D-01 on-demand spawn)

### Script Harness Precedents (for D-25 Node script)
- `scripts/validation/check-phase-30.mjs` — **PRIMARY harness template** (338 lines, cross-platform Node ESM, stdout assertion format at lines 312-337)
- `scripts/validation/check-phase-31.mjs` — secondary harness (149 lines); `parseInventory()` sidecar JSON pattern informs D-26 allow-list shape

### Phase 34 Locked Decisions (carry-forward authority)
- `.planning/phases/34-android-foundation/34-CONTEXT.md` — D-03 (iOS supervision analog narrative wording, AEAUDIT-04 scope), D-14/D-33 (60-day review_by cycle for Android), D-15 (reciprocal _glossary-macos link deferred TO Phase 42 = scope of D-23), D-22/D-23/D-26 (5 mode rows canonical, Anti-Pattern 1 guard = scope of D-13)

### Phase 39 AOSP Stub Envelope
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-VALIDATION.md` — row 39-02-10 Phase 39 self-certification of 600-900 body envelope (scope of D-29 informational check)
- `docs/admin-setup-android/06-aosp-stub.md` — current stub (1197 total / ~1089-1159 body)

### Phase 40/41 SafetyNet Rephrase Decisions
- `.planning/phases/40-android-l1-triage-runbooks/40-CONTEXT.md` — D-17 (SafetyNet callout rephrase rule)
- `.planning/phases/41-android-l2-investigation/41-CONTEXT.md` — D-18 (Cause A Play Integrity phrasing; zero literal SafetyNet body tokens)

### Phase 33 v1.3 Gap-Closure (reactive pattern template)
- `.planning/phases/33-v1-3-gap-closure/` — 4-plan structure (anchor fix + placeholder retrofit + re-audit + VERIFICATION synthesis). **Template for Phase 43 shape if spawned.** Specifically: Plan 33-01 anchor fix, Plan 33-02 placeholder retrofit (executed pre-authored 30-09), Plan 33-03 re-audit, Plan 33-04 VERIFICATION synthesis + REQUIREMENTS.md bulk flip.

### Android Content Scope (targets of all 5 mechanical checks)
**Directly owned by Phase 42:**
- `docs/reference/android-capability-matrix.md` (NEW, AEAUDIT-01)

**Foundation docs (from Phases 34-35):**
- `docs/_glossary-android.md`, `docs/android-lifecycle/00-enrollment-overview.md`, `docs/android-lifecycle/01-android-prerequisites.md`, `docs/android-lifecycle/02-provisioning-methods.md`, `docs/android-lifecycle/03-android-version-matrix.md`, `docs/_templates/admin-template-android.md`
- `docs/admin-setup-android/00-overview.md`, `docs/admin-setup-android/01-managed-google-play.md`, `docs/admin-setup-android/02-zero-touch-portal.md`

**Mode docs (from Phases 36-39):**
- `docs/admin-setup-android/03-fully-managed-cobo.md`, `docs/admin-setup-android/04-byod-work-profile.md`, `docs/admin-setup-android/05-dedicated-devices.md`, `docs/admin-setup-android/06-aosp-stub.md`

**L1/L2 runbooks (from Phases 40-41):**
- `docs/l1-runbooks/22-android-enrollment-blocked.md` through `27-android-zte-enrollment-failed.md`
- `docs/l2-runbooks/18-android-log-collection.md` through `21-android-compliance-investigation.md`

**Additional Android content (per D-31 scope expansion):**
- `docs/decision-trees/08-android-triage.md` (if exists)
- `docs/end-user-guides/android-*.md`

### Adversarial-Review Artifact
- `.planning/phases/42-integration-milestone-audit/42-DISCUSSION-LOG.md` — 12-agent adversarial-review audit trail across 4 gray areas (finder → adversary → referee × 4 areas, 3 parallel waves)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **ios-capability-matrix.md** — 5-domain structure, trilateral Windows|macOS|iOS columns, `🔒` glyph for supervised-only capabilities, 8-item Key Gaps Summary tail with numbered bullets. Direct structural template for D-A domains.
- **macos-capability-matrix.md** — 5-domain bilateral precedent (Windows|macOS) with 7-item Key Gaps Summary. Confirms sibling-matrix contract.
- **_glossary-android.md:11 banner** — multi-sibling continuation-banner pattern (one blockquote points at BOTH Windows and Apple glossaries in continuation lines). Template for D-23 banner-extend.
- **_glossary-macos.md:9-10 banner** — 2-line continuation blockquote; `last_verified: 2026-04-17`, `review_by: 2026-07-16` (90-day Apple-platform cycle). Target for D-23 append.
- **_glossary.md:9-11 banner** — 3-line continuation blockquote. Confirms `_glossary-macos.md:10` continuation insertion is precedent-aligned.
- **v1.3-MILESTONE-AUDIT.md** — YAML frontmatter structure with `scores:`, `gaps_closed:`, `tech_debt:`, `nyquist:`, `re_audit_resolution:`. Direct template for D-32 v1.4 audit doc shape.
- **check-phase-30.mjs** (338 lines) + **check-phase-31.mjs** (149 lines) — Node ESM harness pattern with stdout assertion format, sidecar JSON inventory. Direct template for D-25 Node script and D-26 allow-list.

### Established Patterns
- **60-day Android review cycle** (Phase 34 D-14) — Android docs are faster-moving than iOS/macOS (which use 90-day). D-16 enforces this on capability matrix frontmatter; D-31 enforces repo-wide.
- **Filtered-row cross-reference pattern** (D-26 Anti-Pattern 1) — downstream docs link to canonical tables by anchor, never embed grids. D-13 enforces on capability matrix.
- **Platform-attributed cross-references** (Phase 34 D-03) — cross-platform callouts cite the "iOS/macOS/Windows" source platform explicitly in the wording itself. D-12 enforces on Cross-Platform Equivalences section wording.
- **Subagent-executed audit** (v1.3 Phase 33 Plan 33-04 "gsd-executor agent ad0e9e8b" precedent) — milestone audit is run by a subagent, not inline. D-02 enforces.
- **Atomic REQUIREMENTS.md traceability commit** (v1.3 commit 48ad757 bulk-flipped 15 `[ ]` → `[x]`) — D-03 enforces for AEAUDIT-01/02/03/04 flips in a single plan.

### Integration Points
- **docs/index.md** receives: 1 bullet in Choose-Your-Platform list, 1 new H2 section (between iOS section and Cross-Platform References), 1 new row in Cross-Platform References table, optional `last_verified` bump, 1 Version History row. Nothing else mutable.
- **docs/_glossary-macos.md** receives: line 10 extension (append sentence inside existing blockquote), optional `last_verified` bump, optional Version History row. Nothing else mutable.
- **docs/reference/android-capability-matrix.md** is NEW. No existing content to integrate. Anchors locked per D-17.
- **scripts/validation/** receives: new `v1.4-milestone-audit.mjs` harness file. Mirrors existing Phase 30/31 harness naming convention.
- **.planning/phases/42-integration-milestone-audit/** receives: `v1.4-audit-allowlist.json` sidecar (new).
- **.planning/milestones/** receives: `v1.4-MILESTONE-AUDIT.md` (new).
- **REQUIREMENTS.md** receives: 4 checkbox flips (AEAUDIT-01/02/03/04) in a single atomic commit per D-03. No other edits.
- **ROADMAP.md** receives: Phase 42 Plans table rewrite per D-06 (fix copy-paste bug); Phase 42 `[x]` flip; progress table line 301 plan-count update.

### Anti-Patterns to Avoid in Phase 42
- Duplicating any canonical content from `02-provisioning-methods.md` or `03-android-version-matrix.md` into the capability matrix (D-13 guard inherits D-26 Anti-Pattern 1 rule)
- Letting the Cross-Platform Equivalences section grow beyond 3 paired rows (D-11 — pre-empts v1.5 AECOMPARE-01 if it grows)
- Writing "supervision" as an Android management term anywhere in new content (D-12 — AEAUDIT-04 violation trigger)
- Touching any of the documented "must not modify" lines in `docs/index.md` (D-22) or `docs/_glossary-macos.md` (D-24)
- Re-gating Phase 39 AOSP word-count in Phase 42 (D-29 — Phase 42 records drift, not fails on it)
- Running the audit with the same subagent that authored AEAUDIT-01/02/03 content (D-02 — independence violation)
- Fixing audit findings inline in Phase 42 (D-01 — audit is read-only, fixes go to Phase 43)

</code_context>

<specifics>
## Specific Ideas

### Cross-Platform Equivalences section — exact pair framing (D-11 / D-12)

Each paired row's left column is Apple, right column is Android. Platform names always attributed:

**Row 1 — Identity parity:**
- Apple column header: "iOS Supervision (ADE-enrolled)"
- Android column header: "Android Fully Managed (COBO / DPC owner)"
- Row body: feature-gate set that iOS supervision unlocks maps to what COBO/DO-mode unlocks; call out partial mapping (iOS supervision is a device-state; Android Fully Managed is an ownership mode).

**Row 2 — Zero-touch enrollment parity:**
- Apple column header: "Apple Automated Device Enrollment (ADE) via ABM"
- Android column header: "Google Zero-Touch Enrollment via ZT portal"
- Row body: hardware-vendor-chain enrollment, pre-provisioning at factory, reseller relationship prerequisite (ZT) vs ABM token (ADE).

**Row 3 — BYOD privacy-partition parity:**
- Apple column header: "iOS Account-Driven User Enrollment (BYOD iOS 15+)"
- Android column header: "Android Work Profile (BYOD, Company Portal enrollment)"
- Row body: privacy-preserving BYOD with corporate-identity separation; work container; selective wipe of work data only.

### HTML-comment guard at section head

```markdown
## Cross-Platform Equivalences

<!-- AEAUDIT-04: "supervision" in this section MUST appear only as an iOS-attributed
     reference. Android management states are "Fully Managed" / "Work Profile" /
     "Dedicated" / "ZTE" — never "supervised". Each paired row MUST attribute the
     platform in the column header (e.g., "iOS Supervision" not "Supervision"). -->
```

### Deferral footer pattern (D-14) — exact wording

```markdown
---

### Deferred: Knox Mobile Enrollment row

Knox Mobile Enrollment (KME) is a Samsung-specific zero-touch enrollment path
mutually exclusive with Google Zero-Touch on Samsung hardware. KME coverage —
including a provisioning-method row and capability mapping — is deferred to v1.4.1
per PROJECT.md Key Decisions. See [Knox Mobile Enrollment deferral note](../android-lifecycle/02-provisioning-methods.md#knox-mobile-enrollment).

### Deferred: Full AOSP capability mapping

AOSP (Android Open Source Project) devices — RealWear, Zebra, Pico, HTC VIVE
Focus, Meta Quest — appear in this matrix as a single stub-reference row.
Per-OEM capability mapping and feature-by-feature expansion are deferred to
v1.4.1. See [AOSP stub](../admin-setup-android/06-aosp-stub.md).

### Deferred: 4-platform unified capability comparison

This matrix is Android-centric with a bounded 3-row Cross-Platform Equivalences
section. A unified Windows|macOS|iOS|Android 4-platform feature comparison doc
is deferred to v1.5 (AECOMPARE-01). The paired rows in this matrix are NOT a
4-platform comparison — they are mode-level feature parity assertions between
Apple and Android, constrained to the 3 SC#1-named pairs.
```

### Allow-list sidecar JSON shape (D-26)

```json
{
  "schema_version": "1.0",
  "generated": "2026-04-24T00:00:00Z",
  "phase": "42-integration-milestone-audit",
  "safetynet_exemptions": [
    {"file": "docs/_glossary-android.md", "line": 138, "reason": "deprecation-context prose naming SafetyNet as Play Integrity predecessor"},
    {"file": "docs/_glossary-android.md", "line": 150, "reason": "changelog row naming SafetyNet→Play Integrity 2025 transition"},
    {"file": "docs/android-lifecycle/03-android-version-matrix.md", "line": 85, "reason": "Non-version Breakpoints section header naming deprecation event"},
    {"file": "docs/android-lifecycle/03-android-version-matrix.md", "line": 87, "reason": "Non-version Breakpoints section body describing deprecation event"}
  ],
  "supervision_exemptions": [
    {"file": "docs/_glossary-android.md", "line": 65, "reason": "§Supervision H3 disambiguation entry"},
    {"file": "docs/_glossary-android.md", "line": 67, "reason": "Supervision cross-platform note blockquote body"},
    {"file": "docs/_glossary-android.md", "line": 134, "reason": "supervised MDM profile cross-platform callout"},
    {"file": "docs/_glossary-android.md", "line": 148, "reason": "Changelog row naming supervision-as-callout-only Phase 34 decision"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 51, "reason": "Phase 34 D-03 locked For-Admins-Familiar-with-iOS narrative — iOS Supervision analog"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 53, "reason": "Phase 34 D-03 locked narrative — supervision-is-not-an-Android-term bridge"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 83, "reason": "See Also section supervision cross-link"},
    {"file": "docs/admin-setup-android/03-fully-managed-cobo.md", "line": 35, "reason": "Cross-platform note blockquote — iOS Supervision analog in COBO context"},
    {"file": "docs/l2-runbooks/20-android-app-install-investigation.md", "line": 21, "reason": "Unlike iOS where supervision state... — cross-platform contrast prose"}
  ]
}
```

The Phase 42 audit plan responsible for enumeration MUST re-scan the supervision allow-list at authoring time (content may shift between now and Phase 42 execution). `docs/l2-runbooks/21-android-compliance-investigation.md` is flagged for fresh scan; pin any hits discovered.

### Phase 43 spawn protocol (D-01 / D-04 / D-05)

If audit exits `status: gaps_found`, user invokes `/gsd-plan-milestone-gaps`. That command produces Phase 43 plans following v1.3 Phase 33 shape:
- One plan per distinct finding, classified by `kind`
- Integration-gaps → atomic single-plan fixes (v1.3 Plan 33-01 pattern)
- Content-gaps → authored retrofit plans (v1.3 Plan 33-02 pattern, may execute pre-authored plans from Phase 42 discovery)
- Validation-gaps → `/gsd-validate-phase <N>` wrapper plans
- Final plan → re-audit subagent run + `v1.4-MILESTONE-AUDIT.md` `re_audit_resolution` frontmatter update (v1.3 Plan 33-03/33-04 pattern)

If all findings meet D-05 deferral criteria, user may invoke `/gsd-complete-milestone 1.4` with `status: tech_debt` (v1.1/v1.2 pattern). AEAUDIT-04 flips `[x]` with `verification_note: "accepted tech debt per <date>"` annotation.

</specifics>

<deferred>
## Deferred Ideas

Items that surfaced during discussion but belong in other phases, future milestones, or tech-debt queues:

- **Full cross-platform navigation integration** (`docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` Android additions; full `docs/index.md` Android H2 with L1/L2/Admin subsections; banner/H1 narrative Android mentions) — AENAVUNIFY-04 post-v1.4 unification task. Phase 42 stub is intentionally minimal; Phase 42 does NOT touch these files beyond the 3 surgical additions in D-19 and D-23.
- **4-platform unified capability comparison document** — AECOMPARE-01, v1.5. The 3-paired-row Cross-Platform Equivalences section in D-11 is explicitly NOT a 4-platform comparison and must be footer-labeled as such (D-14).
- **Knox Mobile Enrollment row in capability matrix** — v1.4.1. Phase 42 matrix carries deferral footer only (D-14).
- **Full AOSP per-OEM capability mapping** — v1.4.1. AOSP row in Phase 42 matrix is stub-reference only (D-10).
- **`docs/_glossary.md` (Windows) reciprocal see-also to `_glossary-android.md`** — orphan edge NOT closed in Phase 42. AEAUDIT-03 literal scope names only `_glossary-macos.md`. Follow-up candidates: AEAUDIT-03b supplementary plan, AENAVUNIFY-04 bundle, or explicit v1.4.1 glossary-symmetry plan. Record in audit doc tech_debt section.
- **AOSP stub body word-count drift** (1197 total / ~1089-1159 body vs Phase 39's 600-900 envelope) — recorded as tech debt in Phase 42 audit. Recommend `/gsd-validate-phase 39` in v1.4.1 to re-gate. Phase 42 does NOT re-gate (D-29).
- **`last_verified` freshness beyond 60-day cadence** — if C5 (D-31) finds docs with `review_by - last_verified > 60 days`, these are audit findings. If severity ≤ WARNING and fix > 1 plan, they may route to D-05 deferral (v1.4.1 re-verification pass).
- **COPE full admin path** — v1.4.1, not v1.4.
- **Phase 42 ROADMAP entry Plans table rewrite** (D-06 copy-paste bug fix) — executed during Phase 42 planning, not deferred, but flagged as a planner pre-flight obligation.
- **Mermaid / diagrams in capability matrix** — Claude's discretion; not required by any SC. iOS matrix has none; macOS has none. Android may or may not benefit. Author's call.

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 42` returned zero matches.

</deferred>

---

*Phase: 42-integration-milestone-audit*
*Context gathered: 2026-04-24*
*Method: adversarial-review skill across 4 gray areas — 12 subagents in 3 parallel waves (Finder × 4 → Adversary × 4 → Referee × 4) — 116 flaws evaluated, 98 real, winners selected on lowest-real-flaw basis*
