# Phase 66: Apple Business Validation Tooling Closure + Milestone Audit - Context

**Gathered:** 2026-05-24
**Status:** Ready for planning

<domain>
## Phase Boundary

The **terminal close-gate (Wave C)** of v1.6 Apple Business Delegated Governance — calibrates the v1.6 harness against the now-drafted Apple Business corpus (C11 keyword extension + C15 narrow staleness refinement + BASELINE_10 refresh + `c13_rotting_external` sidecar population), ships the per-phase validator chain finale (`check-phase-66.mjs`) plus the CI workflow `audit-harness-v1.6-integrity.yml`, runs an auditor-independent **terminal re-audit from a fresh git clone** (D-22 INTENT-satisfying alternative to worktree per platform constraints), and authors the two milestone-close artifacts (`v1.6-MILESTONE-AUDIT.md` + new `v1.6-DEFERRED-CLEANUP.md`). Closes 39/39 v1.6 requirements (AB-01..07 + OU-01..10 + DELEG-01..08 + ABNAV-01..07 + AUDIT-09..15) with PROJECT.md Active→Validated flips and STATE.md milestone-close recording.

**Deliverables (exactly):**
- **AUDIT-14 atomic harness commit** — `v1.6-milestone-audit.mjs` (C11 `windowKeywords` extended with 6 tokens at line 577; production-vs-synthetic regex 7 back-port at lines 725/854) + `v1.6-audit-allowlist.json` (`c13_rotting_external` populated from CI-1/CI-2/CI-3 candidates discovered during Phases 62-65) + `regenerate-supervision-pins.mjs` (BASELINE_10 freshness comment closing BASELINE_9 v1.5 carry-over) + `check-phase-66.mjs` (V-66-NN assertions + V-66-ABAUDIT-STALENESS) — landing in ONE indivisible commit; budget 5th reconciliation file (likely `check-phase-62.mjs` V-62-SIDECAR extension to validate `c13_rotting_external` shape) per Phase 65's 3→4 file growth precedent
- **C15 staleness audit (narrow refinement reading)** — walk all 24 ABAUDIT comments across 11 files; verify each comment's next line still triggers a C15 banned-phrase regex; remove any orphans (likely zero); add `V-66-ABAUDIT-STALENESS` to `check-phase-66.mjs` (auto-catches future drift); the back-port of regex 7's negative-lookahead exclusion from production (`v1.6-milestone-audit.mjs:725`) to the synthetic mirror (`:854`) folds into the same atomic commit
- **CI workflow** `.github/workflows/audit-harness-v1.6-integrity.yml` — Path-A copy from `audit-harness-v1.5-integrity.yml` with tight v1.6-scoped path-filter list (14 paths enumerated below) + 2 crons (weekly bitrot `0 8 * * 1` + new quarterly `0 8 1 1,4,7,10 *` for `c13_rotting_external` link-check) + new job `rotting-external-quarterly` gated by schedule `if:`; PR-blocking per D-A9; coexists with `audit-harness-integrity.yml` (v1.4) and `audit-harness-v1.5-integrity.yml` (v1.5) — do NOT modify older workflow files
- **Terminal re-audit from fresh git clone** — `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.6-audit-<rand>` spawned by a fresh `gsd-executor` sub-agent (zero context-carryover from Plans 66-01..N authors); runs `v1.6-milestone-audit.mjs` + `check-phase-62..66.mjs`; captures exit codes + summary lines; cleanup clone post-audit; CHAIN_SKIP {48,51,58,60,61} stay suppressed-as-justified on Windows host
- **`.planning/milestones/v1.6-MILESTONE-AUDIT.md`** — YAML frontmatter + mechanical_checks block following `v1.5-MILESTONE-AUDIT.md` template; `performed_by` documents both D-22 divergence-from-literal-mechanism AND satisfaction-of-intent (cites user's documented platform constraint); 39/39 requirements closed; 5/5 phases complete; cross-link to `v1.6-DEFERRED-CLEANUP.md`
- **`.planning/milestones/v1.6-DEFERRED-CLEANUP.md`** — NEW artifact (no v1.5 equivalent); lists CI-1 (~30 ABM URL refs) + CI-2 (2 VPP location token line refs at `admin-setup-ios/05-app-deployment.md:201` + `admin-setup-macos/04-app-deployment.md:148`) + CI-3 (Managed Apple ID corpus-wide refs) plus the CHAIN_SKIP-on-Windows-CRLF item per advisor finding
- **PROJECT.md traceability closure** — 39 v1.6 reqs (AB-01..07 + OU-01..10 + DELEG-01..08 + ABNAV-01..07 + AUDIT-09..15) flipped Active→Validated with closing commit SHAs; ROADMAP.md Progress table reflects 5/5 phases Complete; STATE.md milestone close recorded — preserves v1.4.1 / v1.5 milestone-close traceability discipline

**Out of scope (Phase 66 owns nothing else):** any new content authoring (Phases 62-65 already shipped 18 files + 5 hub appends + 3 canonical rebrand callouts + ios-capability-matrix.md +3 rows); any new C15 regex additions per D-02 NARROW reading; any worktree-based execution per `.planning/config.json:7` `use_worktrees:false`. **Out of scope (locked invariant):** Intune-side RBAC / profile authoring / compliance / enrollment profile assignment (REQUIREMENTS.md:89; D-A8). **Out of scope (v1.7+):** corpus-wide ABM URL sweep (CI-1), VPP-location-token surgical rename (CI-2), Managed-Apple-ID corpus-wide rename (CI-3), CHAIN_SKIP {48,51,58,60,61} resolution via CI-Linux job, multi-tenant Apple Business surfaces (Q2 scope-out), Apple Business Device API documentation (Apple has not yet published developer.apple.com landing), per-OU Conference Room Display deep-dive (Phase 63 deferral), Account Holder lockout dedicated recovery runbook (Phase 65 deferral).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via parallel `/adversarial-review`-style scoring (Finder argues FOR each option, Adversary argues AGAINST, Referee picks winner) dispatched via 4 parallel `gsd-advisor-researcher` agents. Each agent read the relevant ROADMAP/REQUIREMENTS/STATE sections + prior-phase CONTEXT/VERIFICATION + the harness/sidecar/CI source files directly. Scores in parentheses (lower = better, matching the v1.6 convention). All four recommendations user-approved without revision.

### D-01: AUDIT-14 atomic-commit scope — Option A: ONE atomic harness commit (score A=1 / B=5 / C=3)

**Decision:** All AUDIT-14 sub-actions land in ONE indivisible commit per the v1.5 Plan 60-08 / Phase 62-08 atomic-harness-commit precedent (`STATE.md:111-112`).

**Rationale:**
- **Contractual language is explicit.** `REQUIREMENTS.md:63` and `ROADMAP.md:239` both say "BASELINE_10 refreshes in an atomic harness commit (closes BASELINE_9 v1.5 carry-over per AUDIT-14 contract)" — not "atomic-style" or "as a logical unit." Following the contract IS the recommendation.
- **The V-62-SIDECAR cascade at Phase 65 is direct counter-evidence against splitting.** `65-VERIFICATION.md:255-261` documents that even a planned 3-file atomic commit had to grow to 4 files mid-execution because emptying `c16_missing_endpoint_exemptions` made `check-phase-62.mjs:288` fail with `expected 4 entries`, cascading CHAIN-62/63 RED into check-phase-64/65. AUDIT-14's surface (C11 keyword extension at `v1.6-milestone-audit.mjs:577` + C15 regex back-port + `c13_rotting_external` seed at `v1.6-audit-allowlist.json:79` + BASELINE_10 freshness in `regenerate-supervision-pins.mjs` + sidecar-shape validator updates) has the same cross-state dependency topology.
- **Per-action (Option B, score 5) reds the chain in 4 intermediate states** because the chain enforces shape-vs-content invariants ACROSS commits.
- **Two-commit split (Option C, score 3) reproduces V-62-SIDECAR cascade at smaller scale** — C11 keyword tokens reference prose patterns whose exemption posture lives in `c13_rotting_external`; splitting orphans them.

**File list (canonical AUDIT-14 atomic set):**
1. `scripts/validation/v1.6-milestone-audit.mjs` — C11 `windowKeywords` regex at line 577 extended with `apple-business-side|intune-side|integration-handshake|owned-by-apple-business|owned-by-intune|scope-boundary` (per ROADMAP:239 LOCKED token list); C15 production-vs-synthetic regex 7 back-port (line 854 catches up to line 725's negative-lookahead exclusion `personal|Apple\s+Business|scopes|ABM|account`) — keeps `--self-test` honest
2. `scripts/validation/v1.6-audit-allowlist.json` — populate `c13_rotting_external` (currently empty array at line 79) with rotting-reference candidates discovered during Phases 62-65 (CI-1/CI-2/CI-3 enumerated below in code_context); add `quarterly_audit: { cadence: "0 8 1 1,4,7,10 *", scope: "external-url-link-check" }` metadata field per ROADMAP:239 "configured with quarterly audit job"
3. `scripts/validation/regenerate-supervision-pins.mjs` — add BASELINE_10 refresh comment (mirroring BASELINE_9 freshness comments) recording Phase 66 line-position refresh closing the v1.5 carry-over per `STATE.md:138`
4. `scripts/validation/check-phase-66.mjs` — new V-66-NN assertions verifying (a) BASELINE_10 freshness comment present, (b) `c13_rotting_external` populated with quarterly_audit metadata, (c) C11 6 new tokens present in `windowKeywords`, (d) regex-7 synthetic-vs-production divergence resolved; PLUS V-66-ABAUDIT-STALENESS asserting all 24 ABAUDIT comments still have a banned-phrase match on their `next_line` (validator-as-deliverable per AUDIT-13)
5. **Probable 5th file (BUDGET FOR IT during dry-run):** `scripts/validation/check-phase-62.mjs` line 288 V-62-SIDECAR likely needs to extend to validate `c13_rotting_external` shape too, since AUDIT-14 changes the sidecar surface — discover via dry-run, add to atomic set before commit (mirrors Phase 65's 3→4 file growth at `65-VERIFICATION.md:255-261`)
6. **Co-location verification (no-op):** `v1.6-audit-allowlist.json` is already at `scripts/validation/` (confirmed); the "migration" sub-action is satisfied by existing state — record in commit message as "co-location confirmed at scripts/validation/, no move required"

**Pre-commit dry-run protocol (MANDATORY, before `git add`):**
1. Stage all candidate files in working tree (do NOT commit yet)
2. Run in sequence and require ALL green:
   - `node scripts/validation/v1.6-milestone-audit.mjs && echo OK`
   - `node scripts/validation/v1.6-milestone-audit.mjs --self-test` (extend the self-test block from `62-08-PLAN.md:270` with synthetic tests for new C11 tokens + regex-7 back-port)
   - `node scripts/validation/check-phase-62.mjs && echo OK` (V-62-SIDECAR is the canary)
   - `node scripts/validation/check-phase-63.mjs && node scripts/validation/check-phase-64.mjs && node scripts/validation/check-phase-65.mjs && node scripts/validation/check-phase-66.mjs && echo OK`
3. If any validator reds, add the reconciling file (likely a `check-phase-NN.mjs` assertion update with `[RECONCILED Phase 66]` label, mirroring the V-64-05 / V-62-SIDECAR convention) to the staged set; re-run from step 1
4. Only after fully green dry-run, proceed to `git add` + `git commit`

**Rollback semantics:** single `git revert <SHA>` restores Phase 65 close-gate baseline byte-identically. Commit message footer: `Reverts cleanly via: git revert <SHA>`.

### D-02: C15 banned-phrase refinement scope — Option A: Narrow staleness-audit only (score A=2 / B=9 / C=8)

**Decision:** Interpret "refined against drafted v1.6 corpus" (ROADMAP:239) NARROWLY — walk ABAUDIT exemptions and remove any orphans; add a `V-66-ABAUDIT-STALENESS` validator to bake the check into CI permanently. Do NOT add new C15 regexes. Include the regex-7 production-vs-synthetic back-port (the ONE actual harness change that survives adversarial scrutiny) in the D-01 atomic commit.

**Inventory:**
- Current C15 regex count: **8** at `scripts/validation/v1.6-milestone-audit.mjs:718-727` (production); 8 synthetic mirrors at `:847-856` — regex 7 production extends negative-lookahead with `personal|Apple\s+Business|scopes|ABM|account` (line 725) beyond synthetic (line 854) → BACK-PORT in D-01 commit
- ABAUDIT exemptions total: **24 across 11 files** (`docs/cross-platform/apple-business/00-overview.md`:3, `06-mdm-server-assignment.md`:1, `11-vpp-catalog-runbook.md`:2, `12-shared-ipad-passcode-reset.md`:2, `13-device-release-runbook.md`:2, `14-device-transfer-runbook.md`:3, `15-mdm-server-reassign-runbook.md`:1, `16-managed-apple-account-runbook.md`:1, `17-audit-log-scoping-runbook.md`:1, `18-cross-org-boundary-cheat-sheet.md`:**7** (the SOT host per Phase 64 D-08), `docs/admin-setup-macos/01-abm-configuration.md`:1)
- C15 scan scope (`appleBusinessDocPaths`, `v1.6-milestone-audit.mjs:93-124`): all of `docs/cross-platform/apple-business/**` + `_glossary-apple-business.md` + 2 admin-setup files. **L1 `34-*.md` and L2 `26-*.md` are NOT in C15 scope** by design (C15 guards Apple-Business-authored content, not L1/L2 surfaces that ROUTE to it)
- Confirmed pre-existing PASS state: `65-VERIFICATION.md:171` records `[15/15] C15 ... PASS` at Phase 65 close

**Rationale:**
- **Existing harness is empirically sufficient.** All 47 banned-phrase-shape Intune mentions in scope are either ABAUDIT-exempted or out-of-window. Phase 65 D-02 proved the trickiest case (L2 #26 Intune-scope leaf) is C15-safe without new regexes via intentional `Intune-scope path` / `Intune admin center operator` phrasings at `docs/l2-runbooks/26-apple-business-permission-denied.md:36,70,76,78`.
- **SC#1 sentence anchors the narrow reading.** ROADMAP:239 reads "C15 banned-phrase list refined against drafted v1.6 corpus **with allowlist exemptions confirmed living in 18-**." The second clause anchors interpretation toward staleness-audit. "Refined" is a quality verb, not a scope-expansion verb. Phase 64 D-08 (`64-CONTEXT.md:137`) locks 18- as the canonical allowlist host with line-pair-scoped budgeting.
- **Option B's regex additions would CAUSE the v1.7+ deferred-cleanup problem they appear to solve.** Adding regexes retroactively flags PASS content (`00-overview.md:29` and `02-ous-architecture.md:14` are immediate offenders for `Intune-side surface` extensions) — forcing new ABAUDITs outside 18-, violating Phase 64 D-08 + D-04 anti-redundancy.
- **Empirical regex-leak audit (advisor's offline test):** zero in-scope phrasings would currently trigger an unexempted match; all "miss" patterns (`Intune-scope path` etc.) are intentional L1/L2 disambiguation signposts, out of C15 scope by design.

**Operational steps:**
1. Walk every `ABAUDIT-\d+:` comment in scope (24 total across 11 files)
2. For each exemption, simulate the C15 check on the **next line only** against the 8 production regexes
3. If no regex matches the next line, the exemption is **orphaned** → remove the HTML comment (likely zero found)
4. Add `V-66-ABAUDIT-STALENESS` to `check-phase-66.mjs`: for every `ABAUDIT-NN` comment, the next line MUST trigger at least one C15 regex; if not, fail with `{file, line, ABAUDIT_NN}`
5. The synthetic-vs-production regex-7 back-port (line 854 catches up to line 725) folds into D-01's atomic commit since it touches `v1.6-milestone-audit.mjs`

**Acceptance criteria:**
- [ ] 24 ABAUDIT exemptions verified load-bearing (zero orphans) — or any orphans removed in a separate corpus-only commit BEFORE the D-01 atomic commit
- [ ] `V-66-ABAUDIT-STALENESS` validator added + green (lands in D-01 atomic commit via `check-phase-66.mjs`)
- [ ] Synthetic regex 7 (`v1.6-milestone-audit.mjs:854`) back-ported to match production (`:725`) — lands in D-01 atomic commit
- [ ] `v1.6-milestone-audit.mjs` C15 PASS preserved (15/15 maintained); record before/after exemption count in `v1.6-MILESTONE-AUDIT.md` close

### D-03: Terminal re-audit fresh-worktree mechanics — Option B: Fresh git clone in temp dir (score A=8 / B=3 / C=5 / D=6)

**Decision:** Run the terminal re-audit from a **fresh `git clone` into `$env:TEMP\v1.6-audit-<rand>`**, spawned by a fresh `gsd-executor` sub-agent with zero context-carryover from Plans 66-01..N authors. This is a deliberate divergence from D-22's literal `git worktree` mechanism, justified by user-documented platform constraints, while preserving D-22's INTENT in stricter form.

**Conflict reconciled:**
- **D-22 / v1.5 Phase 61 precedent** (`STATE.md:113,126` + `v1.5-MILESTONE-AUDIT.md` `performed_by`): "spawned distinct from content-phase author-agents," materialized as `gsd-executor agent worktree-agent-... fresh worktree spawn verified at execution start." ROADMAP:241 echoes the literal mechanism: "FRESH WORKTREE."
- **User memory** (`C:\Users\joanderson\.claude\projects\D--claude-Autopilot\memory\project_execphase_sequential.md`): worktree lifecycle unreliable on this Windows host; 40+ stale `.claude/worktrees/agent-*` accumulated; Phase 64 + Phase 65 chains landed green with `.planning/config.json` `use_worktrees:false` and sequential execution on main tree.
- **The intent of D-22** (per `65-CONTEXT.md:95` D-04b rationale): prevent "auditor grading content against assertions it wrote." The threat model is agent-context-carryover, not worktree-API-specific mechanics.

**Rationale:**
- **A fresh `git clone --no-hardlinks` is STRICTER physical isolation than `git worktree add`** (separate `.git/` directory vs shared) — satisfies D-22 INTENT more rigorously while bypassing the worktree-lifecycle hazard the user pre-documented.
- **Clone is unaffected by the worktree-lifecycle problem** — no manifest-tracked merge/cleanup dance, no `.claude/worktrees/agent-*` accretion. Throwaway with `Remove-Item -Recurse -Force`.
- **Fresh `gsd-executor` sub-agent** provides decision-independence (zero context from Plans 66-01..N authors) — defeats the `65-CONTEXT.md:95` "auditor grading its own assertions" threat at the logical layer.
- **Option A (worktree literal)** scores 8 — directly violates user memory + `.planning/config.json` `use_worktrees:false`; flipping the config back on during close-gate is unacceptable risk.
- **Option D (worktree-first with fallback)** scores 6 — "try worktree first" directly contradicts the user's standing constraint; performative compliance, not engineering.

**Mechanism (PowerShell on this Windows host):**
```powershell
$auditPath = "$env:TEMP\v1.6-audit-$(Get-Random)"
git clone --no-hardlinks D:\claude\Autopilot $auditPath
Set-Location $auditPath
node scripts/validation/v1.6-milestone-audit.mjs           # MUST exit 0
node scripts/validation/check-phase-62.mjs                  # MUST exit 0
node scripts/validation/check-phase-63.mjs                  # MUST exit 0
node scripts/validation/check-phase-64.mjs                  # MUST exit 0
node scripts/validation/check-phase-65.mjs                  # MUST exit 0
node scripts/validation/check-phase-66.mjs                  # MUST exit 0
# Capture all exit codes + summary lines into v1.6-MILESTONE-AUDIT.md
Set-Location D:\claude\Autopilot
Remove-Item -Recurse -Force $auditPath
```

**CHAIN_SKIP {48, 51, 58, 60, 61} handling:** these are pre-existing CRLF + archived-path failures documented as expected non-fatal at `check-phase-64.mjs:65-73`. The fresh-clone is still on Windows → CRLF behavior unchanged → CHAIN_SKIP must REMAIN active in `check-phase-62..66.mjs` for the audit to exit 0. The Section K:439 expectation that "Phase 66's fresh Linux worktree is expected to resolve" applies only to CI-Linux job; for this local Windows close-gate, CHAIN_SKIP stays. **Explicitly note in `v1.6-MILESTONE-AUDIT.md` `mechanical_checks.notes`** that CHAIN_SKIP entries remain present-and-justified; add the CI-Linux-resolution as a new deferred item in `v1.6-DEFERRED-CLEANUP.md`.

**`v1.6-MILESTONE-AUDIT.md` `performed_by` field draft:**
```yaml
performed_by: "Phase 66 Plan 66-NN — gsd-executor agent <agent-id> spawned fresh
  (no context carry-over from Plans 66-01..N content-author agents per D-22
  auditor-independence intent). Audit ran in fresh git clone at <temp-path>
  (separate .git/ — STRICTER physical isolation than v1.5 Phase 61 worktree
  precedent; divergence from D-22 literal `git worktree` mechanism justified by
  user-documented worktree-lifecycle fragility on this Windows host, codified
  in .planning/config.json `use_worktrees:false` and stable across Phase 64 +
  Phase 65 chains). Clone removed post-audit; CHAIN_SKIP {48,51,58,60,61}
  CRLF-related failures suppressed-as-expected per check-phase-64.mjs:65-73
  (Windows host; resolution deferred to v1.7 CI-Linux job per
  v1.6-DEFERRED-CLEANUP.md)."
```

### D-04: CI workflow trigger surface — Option A: Single workflow + quarterly cron added (score A=2 / B=3 / C=4 / D=5-eliminated)

**Decision:** Ship ONE workflow file `.github/workflows/audit-harness-v1.6-integrity.yml` as a Path-A copy from `audit-harness-v1.5-integrity.yml`, with a tight v1.6-scoped path-filter list + 2 schedule crons (weekly bitrot + new quarterly for `c13_rotting_external`). PR-blocking per D-A9. Coexists with `audit-harness-integrity.yml` (v1.4) and `audit-harness-v1.5-integrity.yml` (v1.5) — do NOT modify older files.

**Rationale:**
- **PR-blocking is correct.** D-A9 (STATE.md:93) and ROADMAP:241 ("fully-blocking mode") leave no room for Option D (advisory). v1.5 source uses default `continue-on-error: false` on all primary jobs (only `pin-helper-advisory` is advisory); v1.6 Path-A copy must preserve this disposition.
- **Quarterly cron belongs in SAME workflow.** AUDIT-14 (REQUIREMENTS.md:63) and ROADMAP:239 phrase as "new sidecar category `c13_rotting_external` configured with quarterly audit **job**" — singular job. AUDIT-13's literal "Path-A from v1.5" + the singular wording favor Option A over splitting workflows.
- **Tight path-filter over broad inheritance.** Option C broadens to all `docs/admin-setup-{ios,macos}/**` triggering v1.6 audit on hundreds of unrelated v1.0-v1.5 maintenance PRs — alarm-fatigue defeats blocking-gates. Weekly cron at `0 8 * * 1` is the safety net for path-filter misses (5-day worst-case drift window — operationally acceptable per v1.5 Phase 48+).

**Exact path-filter list for `pull_request.paths`:**
```yaml
- 'scripts/validation/v1.6-*'
- 'docs/cross-platform/apple-business/**'
- 'docs/l1-runbooks/34-apple-business-*.md'
- 'docs/l2-runbooks/26-apple-business-*.md'
- 'docs/admin-setup-ios/01-abm-configuration.md'
- 'docs/admin-setup-ios/02-abm-token.md'
- 'docs/admin-setup-macos/01-abm-configuration.md'
- 'docs/admin-setup-macos/02-abm-token.md'
- 'docs/reference/ios-capability-matrix.md'
- 'docs/operations/00-index.md'
- 'docs/common-issues.md'
- 'docs/quick-ref-l1.md'
- 'docs/quick-ref-l2.md'
- 'docs/index.md'
- '.github/workflows/audit-harness-v1.6-integrity.yml'
```

**Note on `02-abm-token.md`:** REQUIREMENTS.md AB-05 lists 3 canonical sites; including all 4 ABM-token files in the filter is harmless (over-inclusive filter just runs harness which passes for non-rebrand edits). Phase 66 planner may drop the unused file if confirmed.

**Note on hub-file inclusion:** v1.7+ Linux edits to `common-issues.md` will trigger v1.6 audit — that's DESIRABLE. C14/C15/C16 specifically guard the ABNAV-03..07 append-only contracts in these hub files (REQUIREMENTS.md:50-54). Any cross-milestone hub edit that accidentally clobbers a v1.6-added H2 section MUST fail merge.

**Cron entries:**
```yaml
schedule:
  - cron: '0 8 * * 1'        # Weekly bitrot: 08:00 UTC every Monday (Path-A from v1.5)
  - cron: '0 8 1 1,4,7,10 *' # Quarterly c13_rotting_external: 08:00 UTC on 1st of Jan/Apr/Jul/Oct
```

**Jobs (Path-A from v1.5 lines 23-309 unless changed):**
- `parse` (rename label "Parse v1.6 sidecar JSON"; swap path to `scripts/validation/v1.6-audit-allowlist.json`)
- `path-match` (rename label "Harness references v1.6 sidecar"; swap grep targets to v1.6 files)
- `harness-run` (swap script to `v1.6-milestone-audit.mjs`)
- `check-phase-62` through `check-phase-66` (5 new validator jobs replacing v1.5's 48-61 range; same graceful-degradation pattern at v1.5 lines 78-83)
- `pin-helper-advisory` (preserve verbatim from v1.5 lines 293-309 — `continue-on-error: true` stays; Phase 43 D-14 / Phase 48 D-22 precedent unchanged; this is the ONLY advisory job)
- **NEW** `rotting-external-quarterly` — `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'`; reads `c13_rotting_external` array; runs markdown-link-check against listed URLs; default `continue-on-error: false` so quarterly drift FAILS the scheduled run

**Coexistence pattern:** ADD as third parallel workflow file. The repo already runs parallel coexistence: `audit-harness-integrity.yml` (v1.4+v1.4.1, broad-filter `scripts/validation/**`), `audit-harness-v1.5-integrity.yml` (v1.5, tight linux-scoped). v1.6 adds with tight Apple-Business-scoped filter. Each PR triggers only workflows whose filters match. The v1.4 broad filter ALSO triggers v1.4 workflow on v1.6 validator edits — intentional cross-version safety net.

### Claude's Discretion (planner/researcher decides)

- **Exact CI-1/CI-2/CI-3 enumeration content** for `c13_rotting_external` population — enumerate the ~30 ABM URLs (CI-1), the 2 specific VPP-location-token line refs (CI-2: `admin-setup-ios/05-app-deployment.md:201` + `admin-setup-macos/04-app-deployment.md:148`), and the Managed-Apple-ID corpus-wide refs (CI-3) discovered during Phases 62-65; PITFALLS.md:615-668 has the source-of-truth scope
- **Exact synthetic regex-7 back-port text** (`v1.6-milestone-audit.mjs:854`) — copy the negative-lookahead extension `personal|Apple\s+Business|scopes|ABM|account` from production (line 725) verbatim
- **Plan wave structure for Phase 66** — recommend (W1) `check-phase-66.mjs` scaffold + V-66-ABAUDIT-STALENESS validator + ABAUDIT staleness walk → (W2) AUDIT-14 atomic harness commit (5+ files, pre-commit dry-run mandatory) → (W3) CI workflow + DEFERRED-CLEANUP.md → (W4) terminal re-audit from fresh clone via fresh `gsd-executor` sub-agent → (W5) MILESTONE-AUDIT.md + PROJECT.md/STATE.md/ROADMAP.md traceability closure
- **`v1.6-MILESTONE-AUDIT.md` body structure** — follow `v1.5-MILESTONE-AUDIT.md` template verbatim (YAML frontmatter + mechanical_checks + nyquist + deferred_items); the `deferred_items` block here should be a single line cross-linking to `v1.6-DEFERRED-CLEANUP.md` (the new artifact); preserve the v1.4.1+v1.5 closing-pattern
- **`v1.6-DEFERRED-CLEANUP.md` body structure** — recommend one section per CI-N candidate with file paths + line refs + trigger-to-sweep criteria; plus a section for the CHAIN_SKIP-on-Windows-CRLF deferred-CI-Linux item
- **Test ID numbering for `check-phase-66.mjs`** continues from `V-65-NN`; Path-A copy from `check-phase-65.mjs`; CHAIN_PHASES array does NOT include 66 (V-NN-SELF self-test pattern from `check-phase-65.mjs:151`)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before planning or implementing.**

### Project planning (LOCKED — read first)
- `.planning/PROJECT.md` — v1.6 milestone overview; 39 reqs Active→Validated flip target
- `.planning/REQUIREMENTS.md` — Phase 66 reqs **AUDIT-14** (line 63) + **AUDIT-15** (line 64); REQUIREMENTS.md:89 (Intune-side out of scope invariant); REQUIREMENTS.md:147-148 (coverage map: Phase 66 = 2 reqs)
- `.planning/ROADMAP.md` §234-244 — Phase 66 Goal + SC#1-5 + Wave-C close-gate (after Phase 65)
- `.planning/STATE.md` — D-A1..D-A10 (esp. D-A9 C14/C15/C16 blocking-from-start, D-A10 navigation-files-last); D-22 auditor-independence (`:113,126`); validator-as-deliverable pattern (`:103`); atomic-harness-commit precedent (`:111-112`); BASELINE_9 carry-over note (`:138`)
- `.planning/config.json:7` — `use_worktrees:false` (LOCKED user constraint reconciling with D-22 via D-03 above)

### Phase 62/63/64/65 decision precedents
- `.planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md` — D-01 file-anchor-stability + D-04 anti-redundancy/link-not-copy; atomic-harness-commit landing precedent
- `.planning/phases/62-apple-business-foundation-rebrand/62-08-PLAN.md` §445-470 — atomic-harness-commit recipe (pre-commit dry-run + post-commit `git log --name-only -1 HEAD` verification); §270 self-test extension pattern
- `.planning/phases/63-multi-ou-architecture-apple-admin-setup/63-CONTEXT.md` — CI-5 anti-proliferation precedent; per-OU CRD deep-dive deferral target (`v1.6-DEFERRED-CLEANUP.md`)
- `.planning/phases/64-apple-business-delegation-runbooks/64-CONTEXT.md` — **D-08 (18- as C15 ABAUDIT SOT host)** + line-pair budget; D-02 self-sufficient-callout + forward-link
- `.planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-CONTEXT.md` — **D-04b validator-as-deliverable + D-22 auditor-independence rationale** (`:89-96`); atomic-trio contract
- `.planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-VERIFICATION.md` — **§Atomic-Trio Reconciliation Record + §V-62-SIDECAR deviation note (`:255-261`)** — direct empirical evidence for D-01 atomic-by-design recommendation; §Section K (`:437-441`) Phase 66 Readiness Signal + CHAIN_SKIP rationale

### v1.5 close-gate precedent (Path-A source for MILESTONE-AUDIT.md + CI workflow)
- `.planning/milestones/v1.5-MILESTONE-AUDIT.md` — **template for `v1.6-MILESTONE-AUDIT.md`**; `performed_by` field at line 33 is the D-22 reference (auditor-independence narrative); YAML frontmatter + mechanical_checks + nyquist + deferred_items inline structure
- `.github/workflows/audit-harness-v1.5-integrity.yml` — **Path-A source for `audit-harness-v1.6-integrity.yml`** (310 lines: 3 triggers + jobs `parse`/`path-match`/`harness-run`/14 per-phase-checks/`pin-helper-advisory`); line 297 = the only `continue-on-error: true` (precedent-bound)
- `.github/workflows/audit-harness-integrity.yml` — v1.4 baseline (92 lines); broad-filter `scripts/validation/**` (coexistence precedent for adding v1.6 file alongside)

### v1.6 research (DEFERRED-CLEANUP source-of-truth)
- `.planning/research/PITFALLS.md` §CI-1 (`:617-636` — ~30 ABM URL refs, quarterly-cadence rationale, `c13_rotting_external` contract) + §CI-2 (`:640-660` — 2 VPP-location-token line refs at `admin-setup-ios/05-app-deployment.md:201` + `admin-setup-macos/04-app-deployment.md:148`) + §CI-3 (`:663-668` — Managed-Apple-ID corpus-wide refs); §"Doc-authoring contract" `:636` (DEFERRED-CLEANUP.md is the NEW artifact host)
- `.planning/research/SUMMARY.md:171,218` — Phase 66 deliverable list + Deferred Items (for DEFERRED-CLEANUP.md)

### Audit harness (the surfaces Phase 66 modifies)
- `scripts/validation/v1.6-milestone-audit.mjs` — **C11 `windowKeywords` regex at line 577** (extension target with 6 new tokens); **C15 banned-phrase regexes at lines 718-727** (production); **C15 synthetic mirror at lines 847-856** (regex 7 back-port target at line 854); **ABAUDIT line-pair exemption logic at lines 859-870**; appleBusinessDocPaths scope at lines 93-124; self-test framework at lines 813+
- `scripts/validation/v1.6-audit-allowlist.json:79` — `c13_rotting_external: []` (population target); existing `c16_missing_endpoint_exemptions: []` (Phase 65 emptied)
- `scripts/validation/check-phase-62.mjs:288` — V-62-SIDECAR assertion (asserted `c16.length === 0` after Phase 65 [RECONCILED]; likely needs extension for `c13_rotting_external` shape in D-01 atomic commit — Phase 65's 3→4 file growth precedent)
- `scripts/validation/check-phase-65.mjs` — **Path-A template for `check-phase-66.mjs`** (validator-as-deliverable chain continuation; V-NN-SELF self-test pattern at `:151`; subprocess-AUDIT pattern at `:316-331`)
- `scripts/validation/regenerate-supervision-pins.mjs` — **BASELINE_10 refresh comment target** (mirror BASELINE_9 freshness comments at lines 390/393/396)
- `scripts/validation/v1.5-audit-allowlist.json` + `scripts/validation/v1.4-audit-allowlist.json` + `scripts/validation/v1.4.1-audit-allowlist.json` — coexistence patterns (do NOT touch in Phase 66)

### ABAUDIT staleness walk targets (D-02 operational scope — 11 files / 24 comments)
- `docs/cross-platform/apple-business/00-overview.md` (3 ABAUDITs)
- `docs/cross-platform/apple-business/06-mdm-server-assignment.md` (1)
- `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` (2)
- `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` (2; ABAUDIT-06/07 at `:13,:116`)
- `docs/cross-platform/apple-business/13-device-release-runbook.md` (2)
- `docs/cross-platform/apple-business/14-device-transfer-runbook.md` (3)
- `docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md` (1)
- `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md` (1)
- `docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md` (1)
- `docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md` (**7** — ABAUDIT-17..23 at `:42-57`; SOT host per Phase 64 D-08)
- `docs/admin-setup-macos/01-abm-configuration.md` (1)

### CI rotting-reference enumeration sources (D-04 `c13_rotting_external` population)
- **CI-1 (~30 ABM URL refs):** `docs/admin-setup-ios/*` + `docs/admin-setup-macos/*` + `docs/_glossary-macos.md` (planner enumerate via `grep -rn "business\.apple\.com\|support\.apple\.com/guide/apple-business-manager"`)
- **CI-2 (2 specific lines):** `docs/admin-setup-ios/05-app-deployment.md:201` (line "VPP (Apps and Books) location token" in Renewal/Maintenance table) + `docs/admin-setup-macos/04-app-deployment.md:148` (line "VPP location token" in Renewal/Maintenance table)
- **CI-3 (pervasive corpus-wide):** `Managed Apple ID` refs across v1.0-v1.5 corpus (planner enumerate via `grep -rn "Managed Apple ID" docs/`)

### Existing context to read (Phase 66 dependencies — read before planning)
- `.planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-VERIFICATION.md` (Phase 65 close-gate evidence — Phase 66 reads this as the baseline to verify against)
- `.planning/phases/62-apple-business-foundation-rebrand/62-VERIFICATION.md` (Phase 62 close-gate evidence — atomic-harness-commit landing record)

### User constraints (MEMORY — read by Phase 66 executor)
- `C:\Users\joanderson\.claude\projects\D--claude-Autopilot\memory\project_execphase_sequential.md` — sequential-on-main-tree; worktree lifecycle unreliable; `use_worktrees:false` in config
- `C:\Users\joanderson\.claude\projects\D--claude-Autopilot\memory\feedback_effort_level.md` — max-thoroughness preference
- `C:\Users\joanderson\.claude\projects\D--claude-Autopilot\memory\feedback_adversarial_review_preference.md` — `/adversarial-review` for gray-area picks during discuss-phase (HONORED in this CONTEXT.md)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`scripts/validation/check-phase-65.mjs`** — Path-A copy source for `check-phase-66.mjs` (V-NN-SELF self-test pattern at `:151`; subprocess-AUDIT pattern at `:316-331`; CHAIN_PHASES array convention)
- **`scripts/validation/v1.6-milestone-audit.mjs`** — already ships at Phase 62; Phase 66 EXTENDS rather than authors (C11 line 577; C15 lines 718-727 + synthetic 847-856; ABAUDIT 859-870; appleBusinessDocPaths 93-124)
- **`scripts/validation/v1.6-audit-allowlist.json`** — `c13_rotting_external: []` placeholder already shipped at Phase 62 (line 79); Phase 66 POPULATES
- **`scripts/validation/regenerate-supervision-pins.mjs`** — BASELINE_9 freshness comment pattern at lines 390/393/396; Phase 66 mirrors for BASELINE_10
- **`.github/workflows/audit-harness-v1.5-integrity.yml`** — Path-A source for v1.6 workflow (310 lines; preserve job topology + only-advisory-job pattern at line 297)
- **`.planning/milestones/v1.5-MILESTONE-AUDIT.md`** — template for v1.6 MILESTONE-AUDIT.md (YAML frontmatter + mechanical_checks block + `performed_by` D-22 narrative + deferred_items inline)

### Established Patterns
- **Atomic-harness-commit (v1.5 Plan 60-08 / Phase 62-08 precedent)** — applied verbatim in D-01; pre-commit dry-run mandatory; budget for 5th reconciliation file per Phase 65's 3→4 growth at `65-VERIFICATION.md:255-261`
- **Validator-as-deliverable (v1.3+ pattern; STATE.md:103)** — `check-phase-66.mjs` ships in Phase 66's own atomic commit; runs CHAIN of `check-phase-{62..65}.mjs` via subprocess (`check-phase-64.mjs:316-331` pattern); does NOT include itself in CHAIN_PHASES (`check-phase-65.mjs:151` V-NN-SELF pattern)
- **Auditor-independence via fresh-context spawn (D-22; `65-CONTEXT.md:89-96`)** — INTENT = decision-independence + physical-isolation; satisfied here by fresh-clone-in-temp-dir + fresh-`gsd-executor`-subagent (D-03), STRICTER than worktree-mechanism
- **Path-A copy lineage (D-A9 / `STATE.md:80,103`)** — `v1.4-milestone-audit.mjs` → `v1.5-milestone-audit.mjs` → `v1.6-milestone-audit.mjs`; CI workflow lineage is parallel (each version adds workflow file, prior workflows preserved)
- **CHAIN_SKIP-on-Windows-CRLF (documented at `check-phase-64.mjs:65-73`)** — entries {48, 51, 58, 60, 61} are pre-existing non-fatal; remain suppressed in Phase 66's terminal re-audit (same Windows host); resolution deferred to v1.7 CI-Linux job per `v1.6-DEFERRED-CLEANUP.md`
- **C15 18- SOT host (Phase 64 D-08 / `64-CONTEXT.md:137`)** — all ABAUDIT exemptions stay in 18- per the contract; D-02 staleness audit preserves this — no exemptions migrated, no new exemptions added
- **Self-test framework extension** — `v1.6-milestone-audit.mjs --self-test` block already exists (line 813+); D-01 extends it with synthetic tests for new C11 tokens + regex-7 back-port

### Integration Points
- **Phase 65 → Phase 66 (Wave C close-gate):** Phase 65 atomic-trio at commit `8721a63` left validator chain green (28/0/5 + 15/0/0 confirmed at `65-VERIFICATION.md:117-122`); Phase 66 reads this as the baseline to verify against in the fresh-clone re-audit
- **Phase 62 → Phase 66 (atomic-harness-commit lineage):** Phase 62-08 landed `v1.6-milestone-audit.mjs` + sidecar + `check-phase-62.mjs` in ONE commit; Phase 66 extends via its own atomic commit (D-01)
- **Phase 66 → milestone close:** v1.6 ships when AUDIT-14 + AUDIT-15 close; STATE.md milestone close + PROJECT.md Active→Validated flips + ROADMAP.md Progress table 5/5
- **Phase 66 → v1.7 backlog:** `v1.6-DEFERRED-CLEANUP.md` lists CI-1/CI-2/CI-3 + CHAIN_SKIP-CRLF as v1.7 candidates; v1.7 milestone discuss-phase reads these as the v1.7 entry-phase context

### Operational gates Phase 66 must clear (pre-existing, must NOT regress)
- `v1.6-milestone-audit.mjs` exits 0 with `[14/15] C14: PASS`, `[15/15] C15: PASS`, `[16/15] C16: PASS` (current Phase 65 close state per `65-VERIFICATION.md:170-173`)
- All 4 chain validators exit 0: `check-phase-62.mjs` (29 PASS / 0 FAIL / 5 SKIPPED), `check-phase-63.mjs` (27/0/5), `check-phase-64.mjs` (24/0/5), `check-phase-65.mjs` (28/0/5) — per `65-VERIFICATION.md:119-122`
- C16 4-edge cross-link integrity triangle remains LIVE with 0 exemptions (`c16_missing_endpoint_exemptions: []` per Phase 65 atomic-trio at `8721a63`)
- Phase 65 V-NN-RECONCILED markers (V-64-05 [RECONCILED Phase 65] + V-62-SIDECAR [RECONCILED Phase 65]) MUST remain — Phase 66 may add V-NN [RECONCILED Phase 66] markers but MUST NOT roll back Phase 65's

</code_context>

<specifics>
## Specific Ideas

- **`c13_rotting_external` populated payload shape** (planner enumerates exact entries):
  ```json
  "c13_rotting_external": {
    "ci_1_abm_urls": [
      { "url": "https://support.apple.com/guide/apple-business-manager/...", "file": "docs/admin-setup-ios/...", "line": NN }
      // ~30 entries
    ],
    "ci_2_vpp_location_token": [
      { "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 201 },
      { "file": "docs/admin-setup-macos/04-app-deployment.md", "line": 148 }
    ],
    "ci_3_managed_apple_id": [
      // grep enumeration
    ],
    "quarterly_audit": {
      "cadence": "0 8 1 1,4,7,10 *",
      "scope": "external-url-link-check",
      "next_review": "2026-07-01"
    }
  }
  ```
- **`check-phase-66.mjs` V-66-NN assertion menu** (planner refines exact wording + Path-A from `check-phase-65.mjs`):
  - V-66-01: `v1.6-milestone-audit.mjs` `windowKeywords` regex contains all 6 LOCKED tokens (`apple-business-side` / `intune-side` / `integration-handshake` / `owned-by-apple-business` / `owned-by-intune` / `scope-boundary`)
  - V-66-02: `v1.6-audit-allowlist.json` `c13_rotting_external` is populated (object, not empty array) + carries `quarterly_audit` metadata
  - V-66-03: `regenerate-supervision-pins.mjs` contains BASELINE_10 freshness comment
  - V-66-04: `v1.6-milestone-audit.mjs:854` synthetic regex 7 matches `:725` production (negative-lookahead exclusion identical)
  - V-66-05: `.github/workflows/audit-harness-v1.6-integrity.yml` exists with both crons + `rotting-external-quarterly` job + tight v1.6 path-filter list
  - V-66-06: `.planning/milestones/v1.6-MILESTONE-AUDIT.md` exists with YAML frontmatter + `performed_by` field + score 39/39 + 5/5 phases
  - V-66-07: `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` exists with CI-1/CI-2/CI-3 sections + CHAIN_SKIP-CRLF section
  - V-66-ABAUDIT-STALENESS: every `ABAUDIT-\d+:` comment in scope has a banned-phrase regex match on next line (24 exemptions / 11 files)
  - V-66-AUDIT: subprocess `v1.6-milestone-audit.mjs` exits 0
  - V-66-CHAIN: subprocess `check-phase-{62..65}.mjs` exit 0 modulo documented CHAIN_SKIP
  - V-66-SELF: CHAIN_PHASES array does NOT include 66
- **Plan wave structure recommendation** (planner refines):
  - **Wave 1:** `check-phase-66.mjs` scaffold (V-66-NN assertions, V-66-AUDIT subprocess, V-66-SELF) + V-66-ABAUDIT-STALENESS validator + ABAUDIT staleness walk on the 24 exemptions (likely zero orphans; if any, removal commit before Wave 2)
  - **Wave 2:** AUDIT-14 atomic harness commit (5+ files: `v1.6-milestone-audit.mjs` C11+regex-7 / `v1.6-audit-allowlist.json` c13_rotting_external populated / `regenerate-supervision-pins.mjs` BASELINE_10 / `check-phase-66.mjs` V-66 assertions / probable V-62-SIDECAR extension) — mandatory pre-commit dry-run
  - **Wave 3:** CI workflow `audit-harness-v1.6-integrity.yml` (atomic Path-A copy + path-filter + quarterly cron + `rotting-external-quarterly` job) + `v1.6-DEFERRED-CLEANUP.md` (CI-1/CI-2/CI-3 enumerated + CHAIN_SKIP-CRLF deferred)
  - **Wave 4:** Terminal re-audit via fresh `gsd-executor` sub-agent in fresh `git clone` (capture all exit codes + summary lines into `v1.6-MILESTONE-AUDIT.md`; cleanup clone)
  - **Wave 5:** `v1.6-MILESTONE-AUDIT.md` finalize + PROJECT.md Active→Validated flips (39 reqs) + ROADMAP.md Progress table (5/5) + STATE.md milestone close + 66-VERIFICATION.md
- **`v1.6-MILESTONE-AUDIT.md` `performed_by` field** is the marquee documentation surface — see D-03 draft above; this is what reviewers read to validate D-22 INTENT satisfaction

</specifics>

<deferred>
## Deferred Ideas

- **CI-1 (~30 ABM URL refs corpus sweep)** → v1.7+ (tracked in `v1.6-DEFERRED-CLEANUP.md`; quarterly audit job at `0 8 1 1,4,7,10 *` flags drift; trigger-to-sweep = Apple drops legacy URL support OR v1.7 scope explicitly includes corpus sweep)
- **CI-2 (2 VPP-location-token surgical line renames)** → v1.7+ (tracked in `v1.6-DEFERRED-CLEANUP.md`; trigger-to-sweep = lower-effort surgical edit deferred to maintain Q5(b) no-corpus-sweep contract for v1.6)
- **CI-3 (Managed-Apple-ID corpus-wide rename)** → v1.7+ (tracked in `v1.6-DEFERRED-CLEANUP.md`; contingent on Microsoft Intune adopting the rebrand per REQUIREMENTS.md:74)
- **CHAIN_SKIP {48, 51, 58, 60, 61} resolution via CI-Linux job** → v1.7+ (new deferred item per D-03 advisor finding; documented at `check-phase-64.mjs:65-73` as CRLF + archived-path; resolution requires CI-Linux job; `65-VERIFICATION.md:439` Section K aspirational expectation honored here)
- **Worktree-lifecycle remediation on Windows** → out of v1.6 scope (user's standing constraint `use_worktrees:false` is durable per memory; not a v1.7 deliverable)
- **Multi-tenant Apple Business** + **Apple Business Device API documentation** + **per-OU CRD deep-dive** + **dedicated Account Holder lockout recovery runbook** → carried from Phases 63-65 deferrals to v1.7+

None of the above is scope creep into Phase 66 — they are v1.7+ items captured to ensure the `v1.6-DEFERRED-CLEANUP.md` artifact carries the complete handoff to v1.7.

</deferred>

---

*Phase: 66-apple-business-validation-tooling-closure-milestone-audit*
*Context gathered: 2026-05-24*
