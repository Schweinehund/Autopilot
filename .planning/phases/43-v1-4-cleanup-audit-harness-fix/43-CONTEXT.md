# Phase 43: v1.4 Cleanup & Audit Harness Fix - Context

**Gathered:** 2026-04-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Ship a stable audit-harness + allow-list + 60-day-freshness + AOSP-stub baseline so Phases 44 (Knox ME) / 45 (per-OEM AOSP) / 46 (COPE full admin) can land on clean tooling. **No new Android content in this phase** — it is pure tooling, metadata normalization, and content-migration preparation. Phase 43 MUST land before 44/45/46.

Four requirements: AEAUDIT-02 (allow-list pins ~10 → ~37), AEAUDIT-03 (60-day freshness normalization on L2 runbooks 18-21 + template), AEAUDIT-04 (AOSP stub trim + content migration), AEAUDIT-05 (harness sidecar-path blocker + v1.4.1 harness version + `regenerate-supervision-pins.mjs`).

</domain>

<decisions>
## Implementation Decisions

### Harness versioning + sidecar location (Path A — copy + version-pin)

- **D-01:** Ship a new harness file `scripts/validation/v1.4.1-milestone-audit.mjs` as a copy of `v1.4-milestone-audit.mjs`. v1.4 harness stays FROZEN in place — do NOT delete, do NOT archive into `.planning/milestones/v1.4-phases/`. Breaking the v1.4 audit path breaks every historical reference to commit `3c3a140a72181f6f0bbcd96c0d203f640b5864dd` recorded in `.planning/milestones/v1.4-MILESTONE-AUDIT.md`.
- **D-02:** Add a freeze-marker header comment to `scripts/validation/v1.4-milestone-audit.mjs`: `// FROZEN at commit 3c3a140 — see v1.4.1-milestone-audit.mjs for active harness`. v1.5+ may revisit deletion after two milestones of precedent.
- **D-03:** Move the allow-list sidecar from its now-deleted archive location (`.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json`) to the persistent path `scripts/validation/v1.4-audit-allowlist.json`. Update v1.4 harness line 57 in the SAME commit. Recover JSON content from git history (last committed at commit `e5e45db`).
- **D-04:** Author a net-new `scripts/validation/v1.4.1-audit-allowlist.json` for Knox / per-OEM AOSP / COPE exemptions expected in Phases 44-46. Start with v1.4 pins copied + any new bridge-prose pins discovered during Phase 43's allow-list-expansion work.
- **D-05:** Reject Option B (in-place extension) and Option C (parameterize-by-config-file). B fails the reproducibility-anchor constraint the moment C6/C7/C9 land. C violates YAGNI — plugin architecture is v1.6+ territory after three milestones of precedent.
- **D-06:** v1.4.1 harness includes the informational-first new checks per Phase 42 D-29 precedent — C6 (PITFALL-7 preservation), C7 (bare-`Knox` disambiguation), C9 (COPE banned-phrase). All default to informational-first in v1.4.1, promoted to blocking in v1.5.
- **D-07:** Atomicity contract — THREE separate commits, in strict order. Splitting lets a future `git bisect` distinguish "sidecar path bug" from "v1.4.1 scaffolding" from "CI enforcement":
  1. **Rescue commit:** move sidecar JSON to new path + update v1.4 harness line 57 (pure restoration — unblocks v1.4 audit replay)
  2. **Scaffold commit:** copy harness to `v1.4.1-milestone-audit.mjs` + author `v1.4.1-audit-allowlist.json` skeleton + add frozen-header comment
  3. **CI commit:** add GitHub Action + pre-commit hook integrity tests
- **D-08:** CI enforcement — both pre-commit hook AND GitHub Action, different strictness:
  - Pre-commit: fast JSON-parse check on both sidecars (catches typos before push)
  - GitHub Action on PR: full assertion — `parses AND supervision_exemptions.length > 0 AND path matches harness line 57`
  - Scheduled weekly run: catches bitrot from deleted paths (the exact class of bug this phase fixes)

### `regenerate-supervision-pins.mjs` scope (Option C — seeded-template emitter)

- **D-09:** Ship the helper as a seeded-template emitter, NOT a full-auto regenerator and NOT diff-reporter-only. Full-auto (A) would violate Phase 34 D-03 / Phase 42 D-12 writing rules by auto-pinning bare `supervision` occurrences. Diff-reporter-only (B) is equivalent labor to hand-editing per downstream phase.
- **D-10:** Two output modes:
  - `--report` (advisory): reads sidecar, compares to current file state, emits human-readable "lines that moved: N. New occurrences needing review: M. Stale pins: K." Does NOT write.
  - `--emit-stubs`: finds un-pinned legitimate occurrences, emits JSON fragments with `{file, line, reason: "TODO: <snippet>"}` for human reason-filling.
- **D-11:** Two-tier discrimination for what goes to stubs vs. suspected-regression report:
  - **Tier 1 (stub-eligible):** occurrence line OR two preceding lines contain `\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b`, OR occurrence is inside an HTML comment block.
  - **Tier 2 (suspected regression):** bare occurrences failing Tier 1. Emitted to a SEPARATE `suspected-regressions.txt` report file. NOT the stub file. Human must explicitly promote a suspected regression to a pin with written justification — the helper NEVER auto-pins Tier 2.
- **D-12:** Phase 43 hand-authors the ~37 pins for the seeded v1.4-audit-allowlist.json (careful first pass sets the quality bar). THEN runs the helper as a self-test asserting reproduction of Phase 43's hand-authored set. Dogfooding avoids the failure mode where a classifier bug becomes load-bearing before being validated.
- **D-13:** Helper location: `scripts/validation/regenerate-supervision-pins.mjs` — co-located with harness + sidecars. Ship alongside a short `scripts/validation/README-supervision-pins.md` documenting usage, two-tier discrimination, and why the helper never auto-pins.
- **D-14:** Execution model: manual invocation + CI advisory check (warn, don't fail). CI runs `--report` mode, comments on PR. Pre-commit is too aggressive for a docs repo where line shifts are expected mid-phase. A hard CI failure would block legitimate authoring work.
- **D-15:** Phase 43 CI addition: GitHub Action `advisory` step invoking `--report` and posting PR comment. Never fails build.

### AOSP stub content-migration boundary (Option B — prep shell in `.planning/`)

- **D-16:** Migration target: `.planning/phases/45-*/PHASE-45-AOSP-SOURCE.md` (planning-space input artifact). Phase 45 consumes it, reshapes per-OEM, ships final content to `docs/admin-setup-android/09-aosp-realwear.md` etc. Rejected Option A (trim-and-discard — wastes authorship work) and Option C (thin production shells — risks shipping half-migrated content that can't credibly carry PITFALL-7 caveat).
- **D-17:** Migration scope is RealWear deep content ONLY — step-by-step, tables, detail paragraphs. Explicitly kept IN the stub:
  - Deferred-content table (Phase 39 lock; collapsed in Phase 45 via AEAOSPFULL-09, not 43)
  - 9-H2 whitelist structure (Phase 39 structural lock)
  - 8-OEM enumeration (DigiLens, HTC, Lenovo, Meta, PICO, RealWear, Vuzix, Zebra)
  - Non-version breakpoint prose (framing, not depth)
  - PITFALL-7 "not supported under AOSP" framing (Phase 39 D-17 locked)
- **D-18:** Stub target = **~700 words** (strict cap). 900 is the envelope ceiling; landing at 900 guarantees re-drift on next edit. 700 gives ~200 words headroom for AEAOSPFULL-09's Phase 45 collapse edits without triggering another envelope gate.
- **D-19:** Trimmed stub does NOT forward-link into the prep shell. References "Phase 45 will expand per-OEM" as prose only. Keeps `.planning/` invisible to readers and avoids dangling link if Phase 45 slips.
- **D-20:** Prep-shell lifecycle — Phase 45 DELETES `PHASE-45-AOSP-SOURCE.md` in its final commit once `09-aosp-realwear.md` lands. Standard `.planning/` input-artifact pattern — consumed and removed, not archived in-place.
- **D-21:** Phase 43 closes DEFER-04 by re-running `/gsd-validate-phase 39` AFTER the stub trim lands. The envelope violation was the sole open item on that deferral; closing it in Phase 43 prevents a zombie deferral bleeding into v1.5.

### Freshness normalization + template handling (A1 + B3 — metadata-only + belt-and-suspenders)

- **D-22:** L2 runbooks 18-21 retro-dating is METADATA-ONLY. Keep `last_verified: 2026-04-23` (factually correct authoring date); shift `review_by: 2026-07-22 → 2026-06-22` (+60d from 2026-04-23, Phase 34 D-14 Android rule). No re-verify ritual — content authored 1-day-ago is categorically fresh per the 60-day policy; ritual re-verification produces fake audit signal.
- **D-23:** Explicit "metadata-only shift, no re-verify" clause in Phase 43 PLAN.md so future auditors understand the decision.
- **D-24:** Template hardening — BOTH scope-filter AND sentinel (belt-and-suspenders, ~10 lines of code for durable protection):
  - **Scope-filter:** `androidDocPaths()` in v1.4.1 harness excludes any path segment matching `^_.*`. Future-proofs against `_drafts/`, `_archive/`, `_partials/` without further harness edits.
  - **Sentinel:** replace template's `last_verified: YYYY-MM-DD` with `last_verified: 1970-01-01 # TEMPLATE-SENTINEL`. Harness sentinel-aware parse branch treats `1970-01-01` as "template, skip". Preserves author visibility of the placeholder field.
  - Update template's HTML-comment rule block to mention the sentinel semantics.
- **D-25:** Cross-template cascade is EXPLICITLY Android-scoped for Phase 43. iOS / macOS / Windows admin templates carry the same `YYYY-MM-DD` pattern but:
  - They are covered defensively by the global `_*`-prefix scope-filter (defensive infrastructure, not content editing — respects milestone boundary)
  - Sentinel adoption for those templates routed to v1.5 backlog (see Deferred Ideas)
- **D-26:** Harness scope-filter is strictly additive (exclude `_*` dirs); it does NOT touch the existing enumeration of `docs/android-lifecycle/**`, `docs/admin-setup-android/**`, L1 runbooks 22-27, L2 runbooks 18-21, or end-user android-* guides.

### Plan-level ordering constraints

- **D-27:** Phase 43 plan order is dictated by the atomicity-contract commit sequence and downstream-phase unblocking:
  1. **Rescue commit** first (D-07.1) — unblocks v1.4 audit replay from any branch
  2. **Scaffold commit** (D-07.2) — establishes v1.4.1 harness skeleton
  3. **Allow-list expansion** — hand-author ~37 pins into v1.4-audit-allowlist.json
  4. **regenerate-supervision-pins.mjs** authoring + self-test validating reproduction of the hand-authored pins
  5. **L2 runbook 18-21 metadata shifts** + template sentinel edit
  6. **Harness scope-filter + sentinel-aware parse** added to v1.4.1 harness (not v1.4)
  7. **AOSP stub trim** to ~700 words + extract deep content to `.planning/phases/45-*/PHASE-45-AOSP-SOURCE.md`
  8. **CI integrity tests** (D-07.3) — GitHub Action + pre-commit hook
  9. **`/gsd-validate-phase 39`** re-run closing DEFER-04
  10. Optional terminal sanity: run v1.4 harness and v1.4.1 harness both — expect v1.4 PASS (now that sidecar loads) and v1.4.1 informational-clean.

### Claude's Discretion

- Exact CI workflow YAML structure (`.github/workflows/audit-harness-integrity.yml` shape)
- Pre-commit hook mechanism (Husky vs. manual `.git/hooks/pre-commit` contribution vs. lefthook) — pick what aligns with existing repo tooling conventions, or ask if none exists
- Exact text of freeze-marker header comment (D-02) as long as it names `3c3a140` and points to v1.4.1 harness
- Internal structure of `PHASE-45-AOSP-SOURCE.md` (lossless extract form — bullet list, table dump, or preserved section hierarchy — Phase 45 planner/researcher will reshape anyway)
- Exact shape of the `suspected-regressions.txt` report (D-11.Tier-2) — plain-text or JSON — as long as promotion to pin requires explicit human action

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### v1.4 audit artifacts (authoritative source-of-truth for what Phase 43 must fix)

- `.planning/milestones/v1.4-MILESTONE-AUDIT.md` — Full audit report; `tech_debt:` section line-by-line enumerates the 27 C2 pin gaps, 5 C5 freshness violations, and DEFER-01..DEFER-04 scopes this phase closes
- `.planning/REQUIREMENTS.md` §AEAUDIT-02..05 — Literal success-criteria text for each requirement
- `.planning/ROADMAP.md` §"Phase 43: v1.4 Cleanup & Audit Harness Fix" (lines 101-122) — Goal, 5 success criteria, and "Context risks to encode" block

### v1.4 audit harness (code Phase 43 modifies)

- `scripts/validation/v1.4-milestone-audit.mjs` — v1.4 harness; line 57 has the broken sidecar path; lines 75-114 hold `androidDocPaths()` enumeration
- `scripts/validation/check-phase-30.mjs` — original `walkMd()` pattern (v1.4 harness inherits verbatim lines 21-38)
- `scripts/validation/check-phase-31.mjs` — original `parseInventory()` graceful-degradation pattern (v1.4 harness inherits for sidecar parse)

### Allow-list sidecar (in git history; not on disk)

- Git commit `e5e45db` path `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` — Source JSON to rescue. Contains 4 SafetyNet exemptions + 9 initial supervision exemptions. Phase 43 expands supervision_exemptions[] to ~37 pins.

### Locked decisions from v1.4 phases

- Phase 34 §CONTEXT D-03 — Android docs reference iOS Supervision as bridge analog only; bare `supervision` in Android doc body is a content regression
- Phase 34 §CONTEXT D-14 — Android docs use 60-day `review_by - last_verified` cycle (NOT iOS/macOS 90-day)
- Phase 39 §CONTEXT D-17 — PITFALL-7 "not supported under AOSP" framing is LOCKED; every per-OEM "supported" assertion must pair with AOSP baseline caveat
- Phase 39 §VERIFICATION — AOSP stub 9-H2 whitelist + 8-OEM enumeration + 600-900 word envelope (the envelope is what Phase 43 AOSP trim re-gates)
- Phase 42 §CONTEXT D-12 — supervision-term writing rule; HTML-comment anti-pattern callouts ("MUST appear only as an iOS-attributed reference") are legitimate and must be pin-able
- Phase 42 §CONTEXT D-20 / D-22 — shared-file invariants (append-only; atomic same-commit retrofit)
- Phase 42 §CONTEXT D-25..D-31 — harness contract (file-reads-only, graceful-degradation parse, 5-check design). Phase 43's new checks MUST follow the same contract.
- Phase 42 §CONTEXT D-29 — new checks (C6/C7/C9) default informational-first; promoted to blocking in v1.5

### Files Phase 43 edits (on-disk baseline verified 2026-04-24)

- `docs/admin-setup-android/06-aosp-stub.md` — 1197 words on disk (authoritative measurement; audit reported 1089 but drifted further)
- `docs/l2-runbooks/18-android-log-collection.md` — `last_verified: 2026-04-23, review_by: 2026-07-22`
- `docs/l2-runbooks/19-android-enrollment-investigation.md` — same
- `docs/l2-runbooks/20-android-app-install-investigation.md` — same
- `docs/l2-runbooks/21-android-compliance-investigation.md` — same
- `docs/_templates/admin-template-android.md` — `last_verified: YYYY-MM-DD` placeholder
- `docs/_glossary-android.md` — supervision exemption targets at lines 15, 45, 63 (authoritative pin coordinates for allow-list expansion)
- `docs/reference/android-capability-matrix.md` — supervision exemption targets at lines 74, 76, 77, 79, 83, 84

### Project-level context

- `.planning/PROJECT.md` §"Current Milestone: v1.4.1 Android Enterprise Completion & v1.4 Cleanup" — full v1.4.1 scope statement
- `.planning/STATE.md` — v1.4.1 milestone decisions recap; Phase 43 sequencing constraint (MUST land first); file-versioning path-A confirmation

### Downstream-phase dependencies (what Phase 43 unblocks)

- Phase 44 (Knox) depends on: stable v1.4.1 harness; template normalized; v1.4.1-audit-allowlist.json skeleton ready for Knox pins
- Phase 45 (per-OEM AOSP) depends on: `PHASE-45-AOSP-SOURCE.md` prep shell containing RealWear deep content
- Phase 46 (COPE) depends on: freshness template + allow-list baseline stable; harness C9 banned-phrase check informational-first
- Phase 47 (integration + re-audit) depends on: v1.4.1 harness sidecar-parameterized via sidecar JSON so C9 banned-phrase list updates don't require harness code edits

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/validation/v1.4-milestone-audit.mjs` — entire harness including `walkMd()`, `parseAllowlist()`, `relNormalize()`, `androidDocPaths()`, and the 5 check functions. v1.4.1 harness is a direct copy + additive changes only (per D-01). Do NOT refactor shared utility functions out; Phase 42 D-25 locks file-reads-only / no-shared-module contract.
- `scripts/validation/check-phase-30.mjs` + `check-phase-31.mjs` — pattern exemplars for file-reads-only JSON+markdown validators. Use as style reference for `regenerate-supervision-pins.mjs` if needed.

### Established Patterns
- **Harness contract (Phase 42 D-25..D-31):** single-file, file-reads-only, graceful-degradation parse, 5-check design, JSON sidecar with `{file, line, reason}` shape. v1.4.1 additions must follow.
- **Writing-rule discipline (Phase 34 D-03, Phase 42 D-12):** "supervision" is an iOS concept; Android docs reference it as cross-platform bridge prose only. Allow-list pins exempt legitimate references; bare occurrences are regressions.
- **Atomicity-same-commit (Phase 42 D-20/D-22):** shared-file retrofits and their forward-referenced content land in the same commit. Phase 43's atomicity contract (D-07) applies this to harness+sidecar moves.
- **`.planning/` input-artifact lifecycle:** planning-space artifacts consumed by downstream phases are deleted in the consuming phase's final commit (not archived in-place) — Phase 43 D-20 applies this to `PHASE-45-AOSP-SOURCE.md`.
- **Template source-of-truth pattern:** `docs/_templates/admin-template-*.md` files are authoritative for new doc authoring; their frontmatter placeholders must be harness-skippable without masking real content drift. Sentinel + scope-filter is the durable pattern (D-24).

### Integration Points
- Harness invocation: run from repo root via `node scripts/validation/v1.4.1-milestone-audit.mjs [--verbose]`. Exits 0 on all-PASS, 1 on any-FAIL. v1.4 harness retains same contract at its frozen path.
- CI integration points: `.github/workflows/` (whatever exists; if empty, create `audit-harness-integrity.yml`); pre-commit hook mechanism (Husky / lefthook / native — Claude's discretion per D-claudes-discretion; check repo tooling first).
- Allow-list JSON is the integration surface between Phase 43 authoring and all downstream phases (44/45/46/47 add pins as they ship new content). JSON schema is `{ schema_version, generated, phase, safetynet_exemptions[], supervision_exemptions[] }` per v1.4 e5e45db template.
- `/gsd-validate-phase 39` workflow closes DEFER-04 — runs after AOSP stub trim as terminal Phase 43 step (D-21).

</code_context>

<specifics>
## Specific Ideas

- **Adversarial review lens:** All 4 gray areas were resolved via parallel finder/adversary/referee reviewers; each winner scored 8/10. Phase 43's decisions therefore carry explicit "what breaks" counter-analysis per D-01..D-26. Downstream planner should read DISCUSSION-LOG.md alongside this CONTEXT to understand why alternatives were rejected.
- **"YAGNI now, plugin architecture at v1.6" discipline:** Option C for harness versioning (parameterize-by-config-file) is right answer for v1.6+ after three milestones of precedent earn the abstraction. Phase 43 consciously picks concrete-duplication over premature-abstraction.
- **"Never auto-pin supervision" rule:** Codified in D-11 two-tier discrimination. Violating this rule is a worse failure than mild pin-drift because it masks real content regressions. This rule should survive any future helper refactor.
- **"Reproducibility-anchor frozen at 3c3a140":** Codified in D-01, D-02. The v1.4 audit's recorded commit SHA is a durable artifact; Phase 43 treats it as a physical constant. Any proposal in Phase 44+ that modifies `v1.4-milestone-audit.mjs` must be rejected at plan time.
- **"Prep-shell lifecycle":** D-20 establishes the pattern for Phase 45 to follow — consume `.planning/` input artifact, then delete in final commit. This pattern generalizes; v1.5+ cross-phase content migrations can cite D-20 as precedent.

</specifics>

<deferred>
## Deferred Ideas

- **iOS / macOS / Windows admin template sentinels (cross-template cascade):** `admin-template-ios.md`, `admin-template-macos.md`, `admin-template.md` carry the same `YYYY-MM-DD` placeholder pattern. Phase 43 covers them defensively via the `_*`-prefix scope-filter but does not normalize their frontmatter to sentinel. Route to v1.5 milestone as a cross-template hygiene item (estimate: 3 template edits + harness sentinel-check verified against all 4 templates).
- **Plugin-architecture harness refactor:** Option C from Area 1 (parameterize-by-config harness with check-plugin registry). Earned at v1.6+ once v1.4, v1.4.1, v1.5 harnesses show three milestones of concrete duplication to justify the abstraction. Backlog note: "See Phase 43 CONTEXT D-05 for rationale."
- **Full-auto `regenerate-supervision-pins.mjs`:** Option A from Area 2. Revisit if the two-tier discrimination proves reliable across v1.4.1 / v1.5 / v1.6 ship cycles and a human reviewer never rejects a stub suggestion. Backlog note: "Earned trust over 3+ milestones before removing human-in-the-loop."
- **Thin production shells for per-OEM AOSP guides (Option C Area 3):** Revisit if the prep-shell pattern (D-16..D-20) produces friction in Phase 45. Currently no evidence it will; this is a parking-lot idea only.
- **Hard-CI blocking on supervision pin drift:** Option upgrade from D-14 advisory → blocking. Revisit once v1.4.1 ships and the helper's false-positive rate is known. If false-positive rate is near-zero over 3 months, promote CI advisory → blocking in v1.5.

### Reviewed Todos (not folded)
*(No pending todos matched Phase 43 scope.)*

</deferred>

---

*Phase: 43-v1-4-cleanup-audit-harness-fix*
*Context gathered: 2026-04-24*
