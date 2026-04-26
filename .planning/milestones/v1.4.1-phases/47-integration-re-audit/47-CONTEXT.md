# Phase 47: Integration & Re-Audit - Context

**Gathered:** 2026-04-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Terminal phase of v1.4.1. Atomically integrate the append-only additions Phases 44/45/46 each shipped (Knox row + AOSP per-OEM rows + COPE column / KME branch + AOSP leaves / glossary alphabetical-index entries) into a re-canonicalized state across the three SC#1 hotspot files; ship the audit-harness check extensions enumerated in ROADMAP SC#2; run the terminal re-audit and flip `v1.4-MILESTONE-AUDIT.md` status `tech_debt → passed`; reflect closure of DEFER-01..06 in PROJECT.md.

Four requirements, all 1:1-mapped to AEINTEG-01..04.

**No new content** — all Android Enterprise content shipped through Phase 46. Phase 47 owns integration cleanup + harness scope-extension + audit closure + traceability flips. **No new harness blocking checks** — C6/C7/C9 stay informational-first per Phase 42 D-29 / Phase 43 D-06 / Phase 45 D-25 / Phase 46 D-31. **No v1.5 work** — DEFER-07 (AENAVUNIFY-04) and DEFER-08 (AECOMPARE-01) remain explicitly deferred to v1.5.

</domain>

<decisions>
## Implementation Decisions

### AEINTEG-01 — Atomic-rebuild scope (Option C: surgical re-canonicalization at SC#1 hotspots)

- **D-01:** AEINTEG-01 is a **surgical re-canonicalization at the three ROADMAP SC#1-named hotspots only** — `docs/_glossary-android.md` line 15 alphabetical index, `docs/reference/android-capability-matrix.md` column-ordering and cross-row coherence, and `docs/admin-setup-android/00-overview.md` Mermaid leaf ordering. Single atomic commit. Mirrors Phase 42 Wave 1 D-03 pattern (atomic same-commit merge of append-only additions into canonical order).
- **D-02:** Reject Option A (verification-only, zero edits). Adversarial Finder confirmed CRIT issues A1 (SC#1 verb "atomically rebuilt" cannot be satisfied by zero-edit verification) and A2 (Phase 46 D-30 / 46-CONTEXT line 282 explicitly delegates Mermaid extension to Phase 47 AEINTEG-01 atomic-rebuild scope).
- **D-03:** Reject Option B (rebuild from scratch). Adversarial Finder confirmed CRIT issues B1 (Phase 44 D-03 byte-identical paste between admin doc 07 line 93 and ZT line 93 would be invalidated; STATE.md line 91 confirms invariant shipped) and B2 (Phase 45 D-25 LOCKED append-only contract with terminal-end-state at commit 3400bff).
- **D-04:** Surgical-edit scope is FIXED at the three SC#1 hotspots. Out of scope: re-touching `android-capability-matrix.md:121-127` (already shipped by Phase 45 Plan 10 commit 3400bff per AEAOSPFULL-09), reordering shipped content beyond the named hotspots, reopening Phase 44 D-05 (KME branch ordering) or Phase 46 D-20 (COPE column at index 1) — all already shipped and locked.
- **D-05:** Re-canonicalization deliverables per file:
  - `_glossary-android.md`: re-sort line 15 alphabetical index across the post-Phase-46 entry set (Knox / KME / KPE / OEMConfig / Private Space / WPCO / etc.); verify alphabetical placement of all H3s under their parent H2 sections is consistent with the index ordering.
  - `android-capability-matrix.md`: verify column-order coherence across all 5 sub-tables (Enrollment / Configuration / App Deployment / Compliance / Software Updates) — same column index for COPE (index 1 per Phase 46 D-20), Knox column (per Phase 44 D-05), AOSP per-OEM matrix link (per Phase 45 AEAOSPFULL-09 / Plan 45-10); cross-row coherence (Cross-Platform Equivalences section structure preserved per Phase 46 D-22 ZERO-new-paired-rows lock).
  - `00-overview.md` Mermaid: verify 6-branch layout (Phase 44 D-05 KME branch shipped) + AOSP per-OEM leaf ordering (Phase 45 D-19 ANDR29 single-target preservation) is alphabetically consistent; Setup Sequence numbered list aligned with branch order.
- **D-06:** Allow-list sidecar `scripts/validation/v1.4.1-audit-allowlist.json` line-shift maintenance: any glossary line edit shifts pin coordinates per existing line-shift annotation pattern (cf. pins already carry "+N from Plan 45-10 baseline" / "+N from Phase 43 baseline" / "+N from Plan 46-02 Wave 2" annotations). Re-pin atomically in the same commit; re-run `regenerate-supervision-pins.mjs --self-test` as part of Plan 47-01 verification step.

### AEINTEG-02 — Harness extension scope (Option B: full extensions of all 4 informational-first checks)

- **D-07:** AEINTEG-02 ships **full extensions** of C4 (blocking) + C6/C7/C9 (informational-first per Phase 42 D-29 + Phase 43 D-06):
  - **C4 regex expansion** (line 228 of `v1.4.1-milestone-audit.mjs`): add Knox/KME/per-OEM/COPE token group `(android|aosp|byod-work-profile|zero-touch|managed-google-play|play-integrity|managed-home-screen|amapi|knox|kme|kpe|realwear|zebra|pico|htc-vive-focus|meta-quest|cope-full-admin|aosp-realwear|aosp-zebra|aosp-pico|aosp-htc-vive-focus|aosp-meta-quest|aosp-oem-matrix)`. Single token list maintained in harness file (no new sidecar — keeps additive-only contract per Phase 43 D-26).
  - **C6 target list expansion** (line 293-296 of `v1.4.1-milestone-audit.mjs`): add `09-aosp-realwear.md`, `10-aosp-zebra.md`, `11-aosp-pico.md`, `12-aosp-htc-vive-focus.md`, `13-aosp-meta-quest.md` to the targets array; remove the "Phase 45 will add per-OEM files here" placeholder comment.
  - **C7 suffix-list calibration** (line 314 of `v1.4.1-milestone-audit.mjs`): expand from `(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure)` to also recognize legitimate standalone forms from Phase 44 D-01 5-SKU table — add `KPE|KME|KPE Standard|KPE Premium|on-device attestation|Mobile Enrollment Portal` so legitimate Knox-SKU mentions don't inflate the bare-Knox count.
  - **C9 sidecar `cope_banned_phrases[]` tuning**: extend from current 3 patterns (deprecated / end of life / removed) to the full Phase 46 D-31 banned set (deprecated / end of life / EOL / no longer supported / obsolete / sunset / retired) as 7 regex patterns scoped by `\bCOPE\b[^.]*\b<phrase>\b`. Sidecar JSON edit only; harness code untouched per locked "no harness code edits for COPE phrases" rule.
- **D-08:** Reject Option A (narrow). Adversarial Finder confirmed MEDIUM issues A1-A5 — narrow scope leaves C7/C9 reporting unreliably (inflated bare-Knox counts; only 3 of 8 D-31 banned phrases pinned). Untuned informational checks deliver false-confidence audit signal.
- **D-09:** Reject Option C (broader, +C8). Adversarial Finder confirmed CRIT issues C1/C2/C3 — C8 (Phase 44 D-03 anti-paste-block marker drift detection) is NOT in ROADMAP SC#2 enumeration; Phase 44 line 170 routed C8 as "v1.5 backlog OR Phase 47" (alternation, not co-locked); Phase 43 D-06 enumerated only C6/C7/C9 in v1.4.1 informational-first scope. Adding C8 = scope creep into v1.5; routes to v1.5 backlog (see Deferred Ideas).
- **D-10:** All informational-first checks (C6/C7/C9) STAY informational-first in v1.4.1. No promotion to blocking. Promotion to blocking earned at v1.5+ after a milestone of false-positive-free signal per Phase 42 D-29 grace-period pattern.
- **D-11:** C9 reporter format remains hits-only count (`(informational - N COPE banned-phrase occurrence(s))`); file:line surfacing is a reporter-upgrade item routed to v1.5 backlog (avoids harness code edit beyond the SC#2-mandated regex/target/sidecar surface).

### AEINTEG-03 — Re-audit closure artifact (Option A: append-only to v1.4-MILESTONE-AUDIT.md)

- **D-12:** AEINTEG-03 ships as **single edit to `.planning/milestones/v1.4-MILESTONE-AUDIT.md`** — extend the existing `re_audit_resolution:` YAML mapping (lines 143-168, currently has DEFER-04 child key from Phase 43 plan 09) with sibling child keys for DEFER-01 / DEFER-02 / DEFER-03 / DEFER-05 / DEFER-06; flip frontmatter `status: tech_debt → passed`. Mirrors Phase 43 plan 09 DEFER-04 closure precedent verbatim.
- **D-13:** No separate `v1.4.1-MILESTONE-AUDIT.md` doc authored. Adversarial Finder confirmed C5 (no corpus precedent for x.y point-release audit docs — v1.0..v1.4 are all major versions) and Adversary disproved A1 (the "audit-corpus gap" claim is fabricated; ROADMAP SC#3 mandates appending to v1.4 doc, not authoring a separate v1.4.1 doc).
- **D-14:** Each closing child key under `re_audit_resolution:` records, at minimum: `resolution_milestone: "v1.4.1"`, `resolution_phase: "47-integration-re-audit"`, `resolution_plan: "<plan-id>"`, `resolution_commit: "<SHA>"`, `resolution_timestamp: "<ISO-8601>"`, `status: "resolved"`, `classification_change: "<original audit classification → resolved state>"`. Schema mirrors the DEFER-04 closure block (lines 143-168) verbatim.
- **D-15:** DEFER-04 already closed by Phase 43 plan 09 (commit `c782af6` per STATE.md line 81). Phase 47 does NOT re-touch the existing DEFER-04 child key — only appends new sibling keys.
- **D-16:** PROJECT.md DEFER-01..06 enumeration ≠ v1.4-MILESTONE-AUDIT.md DEFER-01..10 enumeration. Per cross-doc reconciliation: PROJECT.md DEFER-01..06 → v1.4 audit DEFER-01/02/03/04/08/09/10 (DEFER-01 audit allow-list = audit DEFER-01; DEFER-02 freshness = audit DEFER-02; DEFER-03 AOSP stub re-validation = audit DEFER-04 — already closed; DEFER-04 Knox = audit DEFER-08; DEFER-05 per-OEM AOSP = audit DEFER-09; DEFER-06 COPE = audit DEFER-10). Each closing key in `re_audit_resolution:` MUST cite both PROJECT.md numbering AND audit-doc numbering for cross-doc consistency. Audit-doc numbering is canonical; PROJECT.md numbering aliases per the milestone block.
- **D-17:** Re-audit run details: `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` from repo root post-Wave-1+2+3 commits; expect C1 SafetyNet PASS + C2 supervision PASS + C3 AOSP word count PASS + C4 deferred-file guard PASS (using expanded D-07 regex) + C5 freshness PASS (60-day cycle on all v1.4.1 docs); C6 / C7 / C9 informational PASS-by-design with new metric counts. Exit code 0 mandatory. Run from a fresh executor worktree per Phase 42 D-02 auditor-independence rule.
- **D-18:** v1.4 frontmatter status flip to `passed` is doc-level metadata extension only — does NOT violate Phase 43 D-01/D-02 harness-CODE freeze (the v1.4 harness `.mjs` file at commit 3c3a140 stays untouched; the v1.4 audit DOC is allowed metadata updates per Phase 43 plan 09 precedent).
- **D-19:** Adversarial Finder surviving issues A3 (DEFER-numbering reconciliation), A5 (temporal narrative `audited: 2026-04-24` + `status: passed` after v1.4.1 work) addressed by D-16 (cross-doc citation rule) and D-14 schema (resolution_timestamp records when closure happened, complementing the original `audited:` timestamp).

### AEINTEG-04 — PROJECT.md closure surfacing (Option D1: "Closed Deferred Items" subsection)

- **D-20:** AEINTEG-04 ships as **append "Closed Deferred Items" subsection to PROJECT.md Context section** enumerating DEFER-01..06 with closing phase + closing commit SHA per item. Subsection structure:
  ```markdown
  ## Closed Deferred Items (v1.4 → v1.4.1)

  - **DEFER-01** (Audit allow-list expansion) — closed Phase 43 commit `<SHA>` (AEAUDIT-02 + Plans 43-03/43-04)
  - **DEFER-02** (60-day freshness normalization) — closed Phase 43 commit `<SHA>` (AEAUDIT-03 + Plan 43-05)
  - **DEFER-03** (AOSP stub re-validation) — closed Phase 43 commit `<SHA>` (AEAUDIT-04 + Plans 43-07/43-09)
  - **DEFER-04** (Knox Mobile Enrollment) — closed Phase 44 commit `<SHA>` (AEKNOX-01..07 + Plans 44-01..44-07)
  - **DEFER-05** (Per-OEM AOSP Expansion) — closed Phase 45 commit `<SHA>` (AEAOSPFULL-01..09 + Plans 45-01..45-10)
  - **DEFER-06** (COPE Full Admin) — closed Phase 46 commit `<SHA>` (AECOPE-01..04 + Plans 46-01..46-02)
  ```
- **D-21:** Reject D2 (inline annotation). Adversarial Finder confirmed D2.1 (6 surgical edits across one section = high review surface, mismatched-SHA risk) and D2.2 (verb-tense mismatch — "DEFER-01 → closed Phase 43" inside an "in scope" header creates target-feature → closed-feature contradiction).
- **D-22:** Reject D3 (delete entirely). Adversarial Finder confirmed D3.1/D3.2 CRITs — destroys audit trail; ROADMAP SC#4 verbatim "DEFER-01..06 closed in Context notes" mandates retention with closure annotation, not removal.
- **D-23:** Active → Validated requirement flips: AEAUDIT-02..05 (4 reqs from Phase 43) + AEKNOX-01..07 (7 reqs from Phase 44) + AEAOSPFULL-01..09 (9 reqs from Phase 45) + AECOPE-01..04 (4 reqs from Phase 46) = 24 reqs move from PROJECT.md Active section to Validated section with `Phase N / v1.4.1 (REQ-ID)` format reference per existing Validated-row pattern. AEINTEG-01..04 themselves flip when Phase 47 ships (Plan 47-04 atomic same-commit with status flip).
- **D-24:** PROJECT.md "Last updated" footer line refresh records v1.4.1 milestone closure with all 28 reqs validated and DEFER-01..06 closed; format per existing footer convention: `*Last updated: 2026-04-25 — v1.4.1 shipped. v1.4 audit re-run with status: passed; all 28 reqs validated; DEFER-01..06 closed in Closed Deferred Items subsection. v1.4.1 ships Knox Mobile Enrollment + per-OEM AOSP expansion (RealWear/Zebra/Pico/HTC VIVE Focus/Meta Quest) + COPE Full Admin + audit harness 8/8 PASS via v1.4.1-milestone-audit.mjs.*`
- **D-25:** PROJECT.md Validated section preserves existing reqs (no deletion); v1.4.1 reqs append after existing entries (additive-only per Phase 42 D-22 shared-file invariant).
- **D-26:** Zero "deferred to v1.4.1" language remaining anywhere in `docs/` after Phase 47 ships (verified by Plan 47-04 grep terminal sanity check). Already-shipped retrofits closed this in Phases 43 (AOSP stub references), 44 (Knox callouts), 45 (per-OEM AOSP references), 46 (COPE Migration Note line 64). Phase 47 grep is verification, not authoring.
- **D-27:** Link-resolution check across `docs/admin-setup-android/**`, L1 runbooks 22-29, L2 runbooks 18-23, `_glossary-android.md`, `reference/android-capability-matrix.md`, `reference/aosp-oem-matrix.md` — all anchors resolve, all see-also bidirectional. Run via grep + manual spot-check in Plan 47-04 terminal sanity step.

### Phase-level decisions (wave structure: W3 four-plan)

- **D-28:** Phase 47 ships as **4 plans, 1 plan per AEINTEG requirement** (W3 winner). Plan ordering reflects dependency DAG:
  - **47-01:** AEINTEG-01 atomic re-canonicalization (3 SC#1 hotspots, single atomic commit)
  - **47-02:** AEINTEG-02 harness extensions (C4 regex + C6 targets + C7 suffix + C9 sidecar tuning, single commit; sidecar edit can be sub-step)
  - **47-03:** AEINTEG-04 PROJECT.md closure (Active→Validated 24-req flips + "Closed Deferred Items" subsection + footer refresh, single commit)
  - **47-04:** AEINTEG-03 terminal re-audit (run v1.4.1 harness 8/8 PASS verification → append re_audit_resolution to v1.4 audit doc → flip status tech_debt → passed, atomic same-commit). MUST be LAST plan per ROADMAP line 205 "terminal re-audit is LAST plan (not interleaved)".
- **D-29:** Plans 47-01/47-02/47-03 may execute serially or in parallel (no shared write hotspots — 47-01 touches `docs/`, 47-02 touches `scripts/validation/`, 47-03 touches `.planning/PROJECT.md`); Plan 47-04 strictly LAST after all three land. Plan-checker MUST verify this ordering invariant.
- **D-30:** Each of the 4 plans produces its own SUMMARY.md per `/gsd-execute-phase` convention. Phase 47 VERIFICATION.md composed by `/gsd-verify-work` after Plan 47-04 lands.
- **D-31:** Allow-list sidecar `v1.4.1-audit-allowlist.json` re-baselining per plan: Plan 47-01 (glossary edit) requires line-shift updates to existing supervision_exemptions[] pins (per existing pin-shift annotation pattern); Plan 47-02 (sidecar `cope_banned_phrases[]` tuning) is additive-only to the cope_banned_phrases[] array. Plan-checker verifies sidecar JSON parses post-edit (CI from Phase 43 Plan 08 already enforces this).
- **D-32:** Phase 47 enforces **auditor-independence** per Phase 42 D-02 — Plan 47-04 spawns a fresh executor worktree distinct from the Plan 47-01/02/03 content-author worktrees. The terminal re-audit is run from this fresh worktree pinned to the post-Plan-47-03 commit.

### Locked carry-forward decisions (D-33..D-40)

- **D-33:** v1.4 harness FROZEN at commit `3c3a140` (Phase 43 D-01/D-02). Phase 47 does NOT modify `scripts/validation/v1.4-milestone-audit.mjs`. Only the v1.4.1 harness `scripts/validation/v1.4.1-milestone-audit.mjs` is editable.
- **D-34:** v1.4.1 audit harness exit-0 contract (Phase 43 D-26): all 5 blocking checks (C1-C5) PASS + 3 informational checks (C6/C7/C9) PASS-by-design with metric counts. Exit code 0 mandatory at re-audit time.
- **D-35:** 60-day Android freshness rule (Phase 34 D-14) applies to all v1.4.1 docs (verified by C5; Plans 47-01/02/03 confirm `last_verified` ≤ 60 days at re-audit time).
- **D-36:** PITFALL-7 framing locked across AOSP per Phase 39 D-17 + Phase 45 D-23. Phase 47 surgical re-canonicalization in capability matrix MUST preserve every per-OEM "supported under AOSP" assertion paired with AOSP baseline caveat (informational C6 verifies).
- **D-37:** Append-only contract on shared files (Phase 45 D-25 + Phase 46 D-23) was the precondition for Phase 47's atomic rebuild ownership. Phase 47 surgical edits respect locked invariants from prior phases (Phase 44 D-03 byte-identity, Phase 44 D-05 KME branch, Phase 45 D-19 ANDR29 single-target, Phase 46 D-20 COPE column index 1, Phase 46 D-22 ZERO-new-paired-rows).
- **D-38:** No promotion to blocking for any informational check in v1.4.1 (Phase 42 D-29 grace-period). C8 anti-paste-block marker drift detection routed to v1.5 backlog per locked decision.
- **D-39:** v1.4.1 deferred items (DEFER-07 = AENAVUNIFY-04 cross-platform nav unification; DEFER-08 = AECOMPARE-01 4-platform comparison doc) remain explicitly deferred to v1.5. Phase 47 does NOT re-scope them. PROJECT.md "Deferrals (tracked for v1.5)" block stays unchanged.
- **D-40:** Reproducibility-anchor preservation: every closure entry in `re_audit_resolution:` (D-12) records the resolution commit SHA and timestamp; the v1.4 audit doc remains a reproducibility artifact for the original 2026-04-24 audit run AND a closure record for v1.4.1 cleanup.

### Claude's Discretion

- Exact prose of "Closed Deferred Items" subsection bullets per D-20 — full sentence shape vs. compact bullet shape is author's call as long as DEFER-XX + closing phase + commit SHA all present.
- Exact format of `resolution_plan` field under each `re_audit_resolution:` child key — single plan ID vs. plan-range string ("Plans 43-03/43-04") — author's call.
- Whether to add a `notes:` field under closure child keys for context (e.g., "DEFER-04 was the sole informational-severity tech-debt item; this closure eliminates would-be zombie deferral bleeding into v1.5") — Phase 43 plan 09 used this for DEFER-04; Phase 47 may use for any of DEFER-01/02/03/05/06 at author's discretion.
- Plan 47-04 specific commit message wording for the status flip — `docs(milestones): flip v1.4 audit status to passed (re_audit_resolution closes DEFER-01..06)` is the suggested form.
- Whether to run pin-helper `regenerate-supervision-pins.mjs --self-test` once per plan or only at terminal Plan 47-04 — at least once mandatory, more often is author's call.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 47 spec sources

- `.planning/ROADMAP.md` lines 194-205 — Phase 47 entry: goal, dependencies (44/45/46 → terminal), 5 success criteria (atomic rebuild / harness extensions / terminal re-audit / PROJECT.md closure / link-resolution), context risks
- `.planning/REQUIREMENTS.md` lines 48-53 — AEINTEG-01..04 verbatim (atomic unified rebuilds; audit harness check extensions; terminal re-audit; PROJECT.md traceability)
- `.planning/PROJECT.md` lines 144-163 — v1.4.1 milestone scope statement (DEFER-01..06 enumeration); lines 165-179 Out of Scope
- `.planning/STATE.md` lines 32-37 (phase sequencing); lines 109-115 (Research flags Phase 47); lines 117-130 (Blockers/Concerns including parallel merge conflicts mitigation pattern)

### Audit harness (code Phase 47 modifies)

- `scripts/validation/v1.4.1-milestone-audit.mjs` — v1.4.1 harness; Phase 47 edits C4 regex (line 228), C6 targets array (lines 293-296), C7 suffix list (line 314)
- `scripts/validation/v1.4.1-audit-allowlist.json` — sidecar; Phase 47 edits `cope_banned_phrases[]` (lines 31-35) + line-shift maintenance for supervision pins post-glossary edit
- `scripts/validation/v1.4-milestone-audit.mjs` — FROZEN at commit 3c3a140 (D-33); reference only, do NOT modify
- `scripts/validation/v1.4-audit-allowlist.json` — v1.4 frozen baseline; reference only
- `scripts/validation/regenerate-supervision-pins.mjs` — pin-helper from Phase 43 Plan 04; run `--self-test` post-Plan-47-01 to verify pin coordinates

### v1.4 audit doc (Phase 47 final-edit target)

- `.planning/milestones/v1.4-MILESTONE-AUDIT.md` — full audit report; Phase 47 appends `re_audit_resolution:` sibling child keys (lines 143-168 contain DEFER-04 closure precedent — schema model); flips frontmatter `status: tech_debt → passed` (line 5)
- `.planning/milestones/v1.3-MILESTONE-AUDIT.md` — v1.3 re_audit_resolution precedent (per STATE.md grep) — schema reference

### Locked decisions from prior v1.4 / v1.4.1 phases

- Phase 34 D-03 — Android docs reference iOS Supervision as bridge analog only; bare `supervision` is regression
- Phase 34 D-14 — 60-day Android freshness cycle (D-35 carry-forward)
- Phase 39 D-17 — PITFALL-7 "not supported under AOSP" framing locked (D-36 carry-forward)
- Phase 39 D-11 — AOSP stub 9-H2 whitelist + 8-OEM enumeration + 600-900 word envelope
- Phase 42 D-02 — auditor-independence (D-32 carry-forward)
- Phase 42 D-12 — supervision-term writing rule
- Phase 42 D-22 — append-only / atomic same-commit retrofit (precondition for Phase 47 atomic rebuild)
- Phase 42 D-25..D-31 — harness contract (file-reads-only, graceful-degradation parse, 5-check design)
- Phase 42 D-29 — informational-first grace period for new checks (D-10 / D-38 carry-forward)
- Phase 43 D-01/D-02 — v1.4 harness FROZEN at commit 3c3a140 (D-33 carry-forward)
- Phase 43 D-06 — v1.4.1 harness includes C6/C7/C9 informational-first scaffold (Phase 47 extends scope, not check count)
- Phase 43 D-26 — additive-only sidecar JSON contract (D-31 carry-forward)
- Phase 44 D-01 — 5-SKU disambiguation table (KME / KPE Standard / KPE Premium / Knox Suite / Knox Manage / Knox Configure) — C7 suffix-list source-of-truth
- Phase 44 D-03 — AEKNOX-03 anti-paste blockquote byte-identical between admin doc 07 line 93 and ZT line 93 (Phase 47 must NOT break)
- Phase 44 D-05 — Mermaid 5→6 branch with KME branch ordering (Phase 47 verifies, does NOT re-decide)
- Phase 45 D-19 — Triage tree single-target ANDR29 preservation (locked)
- Phase 45 D-23 — PITFALL-7 carry-forward + per-claim discipline; informational C6 (D-36 carry-forward)
- Phase 45 D-25 — append-only contract on shared files (precondition for Phase 47 atomic rebuild)
- Phase 46 D-20 — Capability matrix COPE column at index 1 (already shipped, locked)
- Phase 46 D-22 — Cross-Platform Equivalences ZERO new paired rows for COPE (locked)
- Phase 46 D-23 — atomic same-commit unified retrofits (Phase 46 Wave 2 5-file retrofit shipped commit ce5ffc0 / parent 4583c06)
- Phase 46 D-30 — shared-file modification guard
- Phase 46 D-31 — Banned-phrase discipline; sidecar JSON enforcement informational-first per Phase 43 D-29; full banned set: deprecated / end of life / EOL / no longer supported / obsolete / sunset / retired (Phase 47 D-07 C9 tuning source-of-truth)

### Phase artifacts referenced by closure (read for SHA + scope per AEINTEG-04 D-20)

- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-VERIFICATION.md` — closure record for AEAUDIT-02..05 + DEFER-04 (commit `c782af6` for plan 09; commit `5dd0862` for plan 07 stub trim)
- `.planning/phases/44-knox-mobile-enrollment/44-VERIFICATION.md` (or PLAN-SUMMARY) — AEKNOX-01..07 closure
- `.planning/phases/45-per-oem-aosp-expansion/45-VERIFICATION.md` — AEAOSPFULL-01..09 closure including commit `3400bff` for Plan 45-10 atomic retrofit
- `.planning/phases/46-cope-full-admin/46-VERIFICATION.md` (or 46-02-SUMMARY.md) — AECOPE-01..04 closure including commit `ce5ffc0` for Wave 2 atomic 5-file retrofit

### Files Phase 47 edits (on-disk baseline as of 2026-04-25)

- `docs/_glossary-android.md` — line 15 alphabetical index (post-Phase-46-Wave-2 state)
- `docs/reference/android-capability-matrix.md` — column-ordering coherence; lines 74-88 supervision pin region (already pinned in sidecar)
- `docs/admin-setup-android/00-overview.md` — Mermaid 6-branch + Setup Sequence (post-Phase-44 state)
- `scripts/validation/v1.4.1-milestone-audit.mjs` — C4/C6/C7 edits per D-07
- `scripts/validation/v1.4.1-audit-allowlist.json` — C9 sidecar `cope_banned_phrases[]` extension + line-shift pin updates
- `.planning/milestones/v1.4-MILESTONE-AUDIT.md` — `re_audit_resolution:` extension + status flip
- `.planning/PROJECT.md` — Active→Validated 24-req flips + "Closed Deferred Items" subsection + footer refresh

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `scripts/validation/v1.4.1-milestone-audit.mjs` — entire harness; C4/C6/C7/C9 are scaffolded (Phase 43 D-06). Phase 47 only edits regex literals + targets array + suffix list literal — no architectural changes. Per Phase 42 D-25 file-reads-only / no-shared-module contract preserved.
- `scripts/validation/v1.4.1-audit-allowlist.json` — sidecar JSON; `cope_banned_phrases[]` exists at lines 31-35. Phase 47 extends this array. Schema is `{ schema_version, generated, phase, safetynet_exemptions[], supervision_exemptions[], cope_banned_phrases[] }`.
- `scripts/validation/regenerate-supervision-pins.mjs` — Phase 43 Plan 04 helper; Phase 47 runs `--self-test` post-glossary-edit to verify supervision_exemptions[] reproduce hand-authored set.
- `scripts/validation/check-phase-30.mjs` + `check-phase-31.mjs` — pattern exemplars; do NOT modify.

### Established Patterns

- **Atomic same-commit retrofit (Phase 42 D-22 / Phase 44 D-03 / Phase 45 D-25 / Phase 46 D-23):** Phase 47 Plan 47-01 atomic rebuild + Plan 47-04 atomic re-audit closure both use this pattern.
- **`re_audit_resolution:` schema (Phase 43 plan 09 DEFER-04):** Schema for closure child keys: `resolution_milestone`, `resolution_phase`, `resolution_plan`, `resolution_commit_<artifact>`, `resolution_timestamp`, `pre_resolution_<state>`, `final_<state>`, `invariants_preserved[]`, `harness_evidence{}`, `mechanism`, `notes`. Phase 47 extends this for DEFER-01/02/03/05/06.
- **Sidecar additive-only contract (Phase 43 D-26):** v1.4.1-audit-allowlist.json edits append to existing arrays; line-shift updates to existing pins are allowed in same commit.
- **Auditor-independence (Phase 42 D-02):** Plan 47-04 worktree distinct from 47-01/02/03 worktrees.
- **Pin coordinate maintenance (sidecar pin-shift annotations):** Glossary edits in Plan 47-01 shift line coordinates of existing supervision_exemptions[] pins; update annotations in same commit.
- **PROJECT.md Validated section additive-only (Phase 42 D-22 shared-file invariant):** Plan 47-03 appends new validated entries; preserves existing v1.0/v1.1/v1.2/v1.3/v1.4 entries.
- **PROJECT.md footer pattern:** "Last updated: <date> — <one-paragraph status>" form. Plan 47-03 follows.

### Integration Points

- Audit harness invocation: `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` from repo root (Plan 47-04). Exit 0 mandatory.
- CI integration (Phase 43 Plan 08): `.github/workflows/audit-harness-integrity.yml` 4-job (parse / path-match / harness-run / pin-helper-advisory) + `scripts/hooks/pre-commit.sh`. Phase 47 changes flow through these.
- v1.4 audit doc YAML mapping: `re_audit_resolution:` parent key already exists; Phase 47 adds sibling child keys without modifying the existing DEFER-04 child key (D-15).
- PROJECT.md REQ table format: existing Validated entries follow `- ✓ <description> — Phase N / vX.Y (REQ-ID)`; Plan 47-03 mirrors.

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review provenance:** All 4 gray-area decisions (D-01..D-32) resolved via finder/adversary/referee adversarial review per /adversarial-review skill. Finder enumerated 79 issues / 396 pts; Adversary disproved 20 / 141 pts; Referee confirmed remainder + picked winners. Surviving issues encoded as guard rails in D-decisions (e.g., D-04 hotspot scope fix; D-11 C9 reporter format defer; D-19 temporal-narrative fix).
- **"Surgical, not rebuild" discipline (D-01..D-06):** Phase 47 AEINTEG-01 is a re-canonicalization at 3 named hotspots — NOT a rebuild that revisits Phase 44/45/46 locked decisions. This discipline survives any future "atomic rebuild" interpretation pressure in v1.5+ integration phases.
- **"Append-only-was-the-precondition" pattern (D-37):** Phase 45 D-25 + Phase 46 D-23 + Phase 44 D-03 append-only contracts EXIST specifically to enable Phase 47's atomic surgical-rebuild ownership. Future v1.5 integration phases inherit this pattern: parallel-content-phases use append-only on shared files, integration-phase owns atomic re-canonicalization in single-author commit.
- **"Sidecar-JSON parameterization vs. harness code edit" line (D-07 / D-11):** v1.4.1 harness ships C9 with sidecar-JSON-driven banned-phrase regex (sidecar edit only); C7 suffix list stays in harness code (single string literal at line 314 — code edit allowed within informational-first envelope). The "no harness code edits for COPE phrases" rule was specifically about the BANNED-PHRASE LIST, not all C9 implementation; this nuance is locked in D-07 and the locked-context note.
- **"Reproducibility-anchor frozen at 3c3a140" (D-33):** v1.4 harness CODE freeze; v1.4 audit DOC metadata extension allowed (per Phase 43 plan 09 DEFER-04 precedent). Phase 47 status flip on the doc does NOT violate the freeze.
- **DEFER-numbering reconciliation rule (D-16):** PROJECT.md DEFER-01..06 ≠ v1.4-MILESTONE-AUDIT.md DEFER-01..10. Cross-doc citation discipline: each `re_audit_resolution:` child key cites BOTH numbering schemes. Audit-doc numbering is canonical; PROJECT.md numbering aliases.

</specifics>

<deferred>
## Deferred Ideas

- **C8 anti-paste-block marker drift detection:** Phase 44 D-03 byte-identical paste invariant (admin doc 07 line 93 ↔ ZT line 93) currently has no harness check. Adding C8 in v1.4.1 = scope creep (D-09). Route to v1.5 backlog as informational-first check; promotion to blocking after one milestone of false-positive-free signal per D-29 grace-period pattern.
- **C9 reporter format upgrade:** Current C9 reports hits-only count without file:line surfacing (D-11). Reporter upgrade to emit file:line for COPE banned-phrase hits is a v1.5 backlog item — keeps v1.4.1 harness code edits within SC#2-mandated regex/target/sidecar surface.
- **`v1.4.1-MILESTONE-AUDIT.md` dedicated audit doc:** Adversarial Finder C5 confirmed no corpus precedent for x.y point-release audit docs (v1.0..v1.4 are all major versions). If future v1.X.Y point-release pattern emerges (e.g., v1.5.1, v1.6.1), reconsider authoring a dedicated doc per minor-release; v1.4.1 closes via append-to-v1.4-doc per D-12.
- **C7 50-character suffix-detection window:** Magic number at line 322 (`c.slice(m.index, m.index + 50)`); deferred Adversary issue B6. Window-tuning routed to v1.5 backlog after a milestone of false-positive observation.
- **Plugin-architecture harness refactor (Phase 43 Deferred Idea carry-forward):** Earned at v1.6+ once v1.4 / v1.4.1 / v1.5 harnesses show three milestones of concrete duplication. Backlog rationale: "See Phase 43 CONTEXT D-05".
- **Cross-template sentinel adoption (Phase 43 Deferred Idea carry-forward):** iOS / macOS / Windows admin templates carry same `YYYY-MM-DD` placeholder pattern. Phase 43 covered defensively via `_*`-prefix scope-filter; sentinel adoption routed to v1.5 cross-template hygiene item.
- **AENAVUNIFY-04 (DEFER-07) cross-platform nav unification + AECOMPARE-01 (DEFER-08) 4-platform comparison doc:** Both explicitly deferred to v1.5 per PROJECT.md. Phase 47 does NOT re-scope; PROJECT.md "Deferrals (tracked for v1.5)" block stays unchanged (D-39).

### Reviewed Todos (not folded)
*(No pending todos matched Phase 47 scope per `/gsd-tools todo match-phase 47`.)*

</deferred>

---

*Phase: 47-integration-re-audit*
*Context gathered: 2026-04-25*
