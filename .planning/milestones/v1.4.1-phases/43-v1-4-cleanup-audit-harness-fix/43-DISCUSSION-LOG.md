# Phase 43: v1.4 Cleanup & Audit Harness Fix - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered and the adversarial-review reasoning that rejected them.

**Date:** 2026-04-24
**Phase:** 43-v1-4-cleanup-audit-harness-fix
**Areas discussed:** Harness versioning + sidecar location; `regenerate-supervision-pins.mjs` scope; AOSP stub content-migration boundary; Freshness + template handling
**Discussion method:** Per user instruction, each area evaluated via `/adversarial-review` (finder / adversary / referee pattern) spawned in parallel. Each reviewer returned a scored recommendation.

---

## Area 1: Harness versioning + sidecar location

| Option | Description | Selected |
|--------|-------------|----------|
| A — Path A (copy + version-pin) | Copy `v1.4-milestone-audit.mjs` → `v1.4.1-milestone-audit.mjs`. Move sidecar to `scripts/validation/`. v1.4 harness stays frozen as reproducibility artifact. ROADMAP-aligned. | ✓ |
| B — In-place extension | Single harness with `--milestone` flag. DRY but loses `3c3a140` reproducibility anchor the moment new checks land. | |
| C — Parameterize by config | Single harness reads per-milestone config JSON. Most abstract; requires plugin refactor. | |

**User's choice:** Option A (adversarial-review recommendation; user accepted all 4 as-is)

**Referee's scored verdict:** 8/10 — A preserves the recorded `commit: 3c3a140` reproducibility anchor without contortion; matches ROADMAP's literal path pin; minimal drift risk because the harness is tiny and file-reads-only per D-25.

**Adversary's strongest counter (rejected):** Code duplication rot — two harness files diverge over time; three copies by v1.5; sidecar-path constant drifts; "frozen" v1.4 copy can rot through Node runtime or dependency bumps, making reproducibility guarantee partially theatrical.

**Why counter is rejected:** Mitigated by harness tininess and file-reads-only contract (no external deps). Option B violates `3c3a140` anchor constraint by construction the moment C6/C7/C9 land. Option C violates YAGNI — plugin architecture is v1.6+ territory after three milestones of concrete precedent.

**Sub-decisions locked:**
1. Old `v1.4-milestone-audit.mjs` left in place, frozen with header comment — NOT archived to `.planning/milestones/v1.4-phases/` (that breaks historical refs). Revisit deletion at v1.5+.
2. Three-commit atomicity split: (i) rescue (sidecar move + line-57 update), (ii) scaffold (v1.4.1 harness + skeleton), (iii) CI (integrity tests). Splitting supports future `git bisect` to distinguish failure modes.
3. CI both: pre-commit (fast JSON-parse) + GitHub Action on PR (parse + non-empty + path-match) + scheduled weekly run (catches bitrot).

**Notes:** All 4 adversarial-review agents produced 8/10 scores — none surfaced a failure mode strong enough to overturn the finder's pick. User accepted without override.

---

## Area 2: `regenerate-supervision-pins.mjs` scope

| Option | Description | Selected |
|--------|-------------|----------|
| A — Full-auto regenerator | Scan + classify + rewrite sidecar automatically. Fastest. Risk: may auto-pin regressions. | |
| B — Diff-reporter (advisory) | Report lines-moved / new-occurrences / stale-pins. Human hand-edits. Zero-trust. | |
| C — Seeded-template emitter | Auto-detect line shifts; emit TODO JSON stubs for human reason-filling; two-tier discrimination. | ✓ |

**User's choice:** Option C

**Referee's scored verdict:** 8/10 — preserves auditable-reason specificity per Phase 42 D-26 (human writes the reason, not regex); line-shift detection fully automated (the bulk of mechanical work); genuinely new occurrences still need human attention (protects against masking).

**Adversary's strongest counter (rejected):** C still costs per-phase labor; if Phase 44/45/46 each add 5-10 new refs, humans still hand-edit ~30 pins/phase. "Emit TODO stubs" invites copy-paste-without-reading fatigue — C silently degrades into A-with-extra-steps if reviewers fill reasons reflexively.

**Why counter is rejected:** A's heuristic classifier directly violates Phase 34 D-03 locked constraint — bare `supervision` is a regression, and proximity regex has false positives (paragraph mentioning iOS 3 lines up, then regressing — A would pin it, masking the bug Phase 42 D-12 explicitly forbids masking). A's failure mode is SILENT; C's failure mode is LOUD (TODO stub fails schema or review). Fatigue argument applies equally to both but A's consequences are worse.

**Sub-decisions locked:**
1. Phase 43 hand-authors the ~37 pins first (sets quality bar), then runs helper as self-test validating reproduction. Dogfooding avoids classifier-bug-becomes-load-bearing failure.
2. Helper location: `scripts/validation/` (co-located with harness + sidecars).
3. Execution model: manual + CI advisory (warn, don't fail). Pre-commit too aggressive for doc repo.
4. Two-tier discrimination:
   - Tier 1 (stub-eligible): occurrence line OR 2 preceding lines match `\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b` OR inside HTML comment
   - Tier 2 (suspected regression): bare occurrences failing Tier 1 → separate `suspected-regressions.txt` report, NEVER auto-pinned. Human must explicitly promote with written justification.

**Notes:** Two-tier rule codifies the "never auto-pin supervision" discipline that D-03 + D-12 imply. This is the most-load-bearing rule in the helper's design.

---

## Area 3: AOSP stub content-migration boundary

| Option | Description | Selected |
|--------|-------------|----------|
| A — Trim-only | Delete deep content; Phase 45 re-authors from scratch. Wastes authorship. | |
| B — Prep shell in `.planning/` | Extract deep content to `.planning/phases/45-*/PHASE-45-AOSP-SOURCE.md`. AEAUDIT-04 literal match. | ✓ |
| C — Thin production shells | Create `docs/admin-setup-android/09-13-*.md` shells; RealWear filled, others stubs. Risks shipping half-migrated content. | |

**User's choice:** Option B

**Referee's scored verdict:** 8/10 — AEAUDIT-04 literal ("prep shell for Phase 45 consumption") textually names Option B; preserves authorship work losslessly; keeps half-migrated content out of `docs/`.

**Adversary's strongest counter (rejected):** B violates D-22 invariant risk — if trimmed stub forward-links to deep content, links now point into `.planning/` (not user-facing) OR dangle until Phase 45 lands. Prep-shell in `.planning/phases/45-*/` is novel artifact class; planner/researcher agents may not recognize as authoritative input; sits outside any validation gate between Phase 43 and Phase 45. If Phase 45 slips, work rots unreviewed.

**Why counter is rejected:** A loses on sunk-authorship grounds (~300 words of vetted RealWear prose discarded, re-researched under schedule pressure). C loses hard on D-17 (thin shells can't credibly carry PITFALL-7 caveat; risk asserting per-OEM "supported" framing prematurely) and D-22 (five new shared-file commits without forward content IS the invariant violation). B's counter is mitigable: trimmed stub does not forward-link into prep shell — references "Phase 45 will expand" as prose only. Prep-shell rot risk bounded to one milestone; AEAOSPFULL-09 forces Phase 45 consumption.

**Sub-decisions locked:**
1. DEFER-04 closes in Phase 43: re-run `/gsd-validate-phase 39` as last act after trim lands. Leaving the gate open while fixing the envelope violation creates zombie deferral.
2. Migration scope: RealWear deep content ONLY (step-by-step, tables, detail paragraphs). Keep deferred-content table, 9-H2 whitelist, 8-OEM enumeration, non-version breakpoint prose IN the stub — those are Phase 39 lock and collapse in Phase 45's AEAOSPFULL-09, not 43.
3. Prep-shell lifecycle: Phase 45 deletes `PHASE-45-AOSP-SOURCE.md` in its final commit once `09-aosp-realwear.md` lands. Standard `.planning/` input-artifact pattern.
4. Word-count target: **700 words** (strict cap). 900 is envelope ceiling, not target; landing at 900 guarantees re-drift. 700 gives ~200 words headroom for Phase 45 collapse edits.

**Notes:** On-disk measurement (2026-04-24): `wc -w docs/admin-setup-android/06-aosp-stub.md` = 1197 words. Audit reported 1089; file has drifted further since audit. Target trim is ~500 words of deletion.

---

## Area 4: Freshness + template handling

| Option (Problem 1 — retro-dating) | Description | Selected |
|--------|-------------|----------|
| A1 — Metadata-only shift | Keep `last_verified: 2026-04-23`, only shift `review_by` to 2026-06-22. No re-verify ritual. | ✓ |
| A2 — Re-verify now | Set `last_verified` to today; requires content confirmation. Adds verification work to Phase 43 scope. | |

| Option (Problem 2 — template) | Description | Selected |
|--------|-------------|----------|
| B1 — Scope-filter only | Exclude `_templates/` from C5 scope. Simplest. | |
| B2 — Sentinel only | Normalize placeholder to harness-aware sentinel. Fragile for un-audited templates. | |
| B3 — Both | Scope-filter + sentinel. Belt-and-suspenders (~10 lines for durable protection). | ✓ |

**User's choice:** A1 + B3

**Referee's scored verdict:** 8/10 — authoring date 2026-04-23 is factually correct; content was verified against MS Learn during Phase 34 execution 1 day ago; only the derived `review_by` drifted. Belt-and-suspenders on templates because `YYYY-MM-DD` pattern exists in all 4 admin templates (iOS / macOS / Android / base), not just Android.

**Adversary's strongest counter (rejected):** A1 is "metadata hygiene theatre" — if 60-day rule exists because Android evolves fast, accepting 1-day-old `last_verified` without re-check misses the point. B3 expands Phase 43 scope into iOS/macOS/Windows template territory, violating "Android-scoped milestone boundary."

**Why counter is rejected:** A2 forces Claude or human to re-verify content literally authored yesterday — wasteful ritual polluting audit trails with false re-verification events. 60-day rule is a staleness CEILING, not a minimum; day-1 content is categorically fresh. On B3: sentinel-only (B2) is fragile across not-yet-audited templates; scope-filter-only (B1) lets future template author ship malformed literal into production. Scope concern mitigated by applying sentinel to Android template ONLY (milestone boundary respected) while scope-filter covers `_templates/` globally (defensive infrastructure, not content editing — not a boundary violation).

**Sub-decisions locked:**
1. Metadata-only shift. No re-verify ritual. Explicit clause in PLAN.md so future auditors understand the decision.
2. iOS/macOS/Windows templates carry same pattern — covered defensively by global `_*`-prefix scope-filter; sentinel adoption routed to v1.5 backlog.
3. Scope-filter excludes ALL `_*`-prefixed path segments (future-proofs `_drafts/`, `_archive/`, `_partials/`).
4. Strictly Android-scoped for Phase 43 content edits. Scope-filter is defensive infrastructure; sentinel edit is Android-only.

**Notes:** `wc` verification of L2 runbooks 18-21 on disk confirmed all 4 carry `last_verified: 2026-04-23, review_by: 2026-07-22` (90-day). Retro-shift is trivial frontmatter edit, zero content changes.

---

## Claude's Discretion

Areas where the user explicitly accepted Claude's judgment for plan/implementation time (per CONTEXT D-claudes-discretion section):

- Exact CI workflow YAML structure (`.github/workflows/audit-harness-integrity.yml` shape)
- Pre-commit hook mechanism (Husky / lefthook / native — check repo tooling first, ask if none exists)
- Exact text of freeze-marker header comment (as long as it names `3c3a140` and points to v1.4.1 harness)
- Internal structure of `PHASE-45-AOSP-SOURCE.md` (lossless extract form — Phase 45 will reshape anyway)
- Exact shape of `suspected-regressions.txt` report (plain-text or JSON — as long as promotion to pin requires explicit human action)

---

## Deferred Ideas

Surfaced during discussion; not in Phase 43 scope:

- iOS / macOS / Windows admin template sentinel cascade → v1.5 cross-template hygiene
- Plugin-architecture harness refactor → v1.6+ after 3 milestones of concrete duplication
- Full-auto `regenerate-supervision-pins.mjs` → revisit after 3+ milestones of two-tier discipline proving reliable
- Thin production shells for per-OEM AOSP guides → parking-lot only; revisit if prep-shell pattern produces friction in Phase 45
- Hard-CI blocking on supervision pin drift → v1.5 candidate once helper false-positive rate is known from v1.4.1 ship

---

*Discussion method: 4 parallel `general-purpose` Agent spawns each instructed to run finder/adversary/referee cycle with structured output. All 4 returned 8/10 scored recommendations; user accepted without override.*
