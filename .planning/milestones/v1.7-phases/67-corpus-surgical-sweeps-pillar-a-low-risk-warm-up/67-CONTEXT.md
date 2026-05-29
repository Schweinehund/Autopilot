# Phase 67: Corpus Surgical Sweeps (Pillar A — Low-Risk Warm-Up) - Context

**Gathered:** 2026-05-26
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Pillar A corpus warm-up** entry phase of v1.7. Closes v1.6's CI-1 (4 `business.apple.com` URL refs across 4 files) and CI-2 (6 "VPP location token" occurrences across 2 files) per `v1.6-DEFERRED-CLEANUP.md` calibrated enumeration at HEAD `ad5c9c9`. Establishes the v1.7 pattern: atomic small edits + Version History rows + sidecar updates + chain validator re-runs. Sidecar `scripts/validation/v1.6-audit-allowlist.json` `c13_rotting_external` updated to post-sweep state; the post-sweep sidecar shape carries forward into `v1.7-audit-allowlist.json` at Phase 70 HARNESS-02.

**Deliverables (exactly):**
- **SWEEP-01** — Verify 4 `business.apple.com` URLs against live Apple state via `markdown-link-check@3.14.2` locally (same tool + same pin as `audit-harness-v1.6-integrity.yml:167` `rotting-external-quarterly` job). Branch A (URLs unchanged — expected case per Phase 66 calibration on 2026-05-25 + advisor's corroborating `curl -I https://business.apple.com` returning `HTTP/1.1 200 OK` on 2026-05-26 14:29:40 UTC): no corpus edits; sidecar gets per-entry `"last_revalidated": "2026-05-26"` annotation; quarterly cron continues monitoring. Branch B (URLs shifted): surgical update of affected line(s) + tail-table row appended + `last_verified: 2026-05-26` frontmatter bump.
- **SWEEP-02** — Surgically rename 6 "VPP location token" / "VPP (Apps and Books) location token" occurrences across 2 files (`admin-setup-ios/05-app-deployment.md` lines 71, 201; `admin-setup-macos/04-app-deployment.md` lines 45, 46, 113, 148) to canonical "content token" form per PITFALLS:657 first-mention-per-H2 convention. Full compound `"content token (formerly VPP location token; still labeled \"Apple VPP token\" in Intune)"` on first prose mention per H2; short `"content token"` in table cells; new `> **Note:** Apple calls this artifact a "content token" …` callout inserted above each `## Renewal / Maintenance` table (one per doc) per Phase 64 `11-vpp-catalog-runbook.md:35-39` precedent. Each of the 2 files gains a tail-table Version History row dated 2026-05-26.
- **Sidecar updates** — `scripts/validation/v1.6-audit-allowlist.json` `c13_rotting_external.ci_1_abm_urls` gets per-entry `last_revalidated:"2026-05-26"` (4 entries preserved — V-62-SIDECAR shape stable); `c13_rotting_external.ci_2_vpp_location_token` entries annotated `"resolved_2026_05_26": true` (ANNOTATE-not-remove — preserves 6-entry shape so Phase 70 has a clean Annotate→Reset transition when forking `v1.7-audit-allowlist.json`).
- **Glossary coordinating rows** — `_glossary-macos.md` `## Version History` (existing H2 at line 121) gains one row per requirement actually-executed (SWEEP-01 row only if Branch B; SWEEP-02 row mandatory).
- **PITFALL-6 anchor inventory** — Pre-edit anchor snapshot of `_glossary-macos.md` (only file in STATE.md:125 scope — "capability matrices, glossaries, hub files"); post-edit diff confirms zero anchor shift at or above line 121. Admin-setup-* files are NOT in PITFALL-6 scope (verified: zero incoming corpus links target lines >50 in any of the 3 admin-setup files Phase 67 may touch).
- **67-VERIFICATION.md** — captures `markdown-link-check` tool output (primary), corroborating curl HEAD evidence (secondary), chain validator exit codes, and SC#1-4 satisfaction checklist.
- **Chain validator re-runs** — `check-phase-{48..66}.mjs` exits with same status as v1.6 close (PASS modulo CHAIN_SKIP {48,51,58,60,61}); `v1.6-milestone-audit.mjs` exits 0 with C11/C15 still PASS (both validators are inert on the edited surface — C15 `appleBusinessDocPaths()` excludes both SWEEP-02 files; C11 banned-pattern regex doesn't match `content token` / `Apple VPP token` / `VPP location token`).
- **Traceability** — PROJECT.md SWEEP-01/SWEEP-02 Active→Validated flips with closing commit SHAs at Phase 67 close (the v1.7 milestone-close traceability sweep itself is Phase 70 HARNESS-06).

**Out of scope (Phase 67 owns nothing else):** CHAIN_SKIP {48,51,58,60,61} root-cause resolution (Phase 68 Pillar B), CI-Linux ubuntu-latest runner (Phase 69 Pillar C), v1.7 audit-harness lineage bump (Phase 70 Pillar D), CI-3 Managed Apple ID corpus-wide rename (DEFERRED to v1.8+ pending Intune portal rebrand adoption per REQUIREMENTS.md:65). **Out of scope (locked invariant):** any new content authoring; any edits to capability matrices (`macos-capability-matrix.md`, `ios-capability-matrix.md`, `4-platform-capability-comparison.md`) — C12 240-cell math + D-13/D-18 sibling-anchor-pin contract preserved; any edits to hub files (`docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/operations/00-index.md`, `docs/index.md`) — append-only contract honored by Phase 67 not touching them; any worktree-based execution (`use_worktrees:false` durable per `.planning/config.json:7` + memory `project_execphase_sequential.md`); any modification to older workflow files (`audit-harness-integrity.yml` v1.4 / `audit-harness-v1.5-integrity.yml` / `audit-harness-v1.6-integrity.yml`) per REQUIREMENTS.md:64.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via parallel `/adversarial-review`-style scoring (Finder argues FOR each option, Adversary argues AGAINST, Referee picks winner) dispatched as 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode. Each agent read the relevant ROADMAP/REQUIREMENTS/STATE sections + prior-phase CONTEXT/VERIFICATION + the harness/sidecar/CI source files directly. Scores in parentheses (lower = better, matching the v1.6 convention). All four recommendations user-approved without revision via single `Approve all 4` selection (header: "Approve").

### D-01: Version History handling — Option D (amended): per-file tail-table row + `last_verified` bump + glossary H2 row (score A=6 / B=5 / C=7 / **D=3**)

**Decision:** Each Phase 67 actually-edited file gets ONE new row appended to its existing tail-table (the unheaded `| Date | Change | Author |` table after the `---` separator — the MAJORITY-by-count corpus convention with ~81 files in this state). `last_verified:` frontmatter bumped to 2026-05-26 on each edited file. `_glossary-macos.md` gains one coordinating row per requirement actually-executed in its existing `## Version History` H2 table at line 121.

**No new `## Version History` H2 is promoted in admin-setup-* files.** Admin-setup docs are NOT in STATE.md:125 PITFALL-6 anchor-inventory scope ("capability matrices, glossaries, hub files"). Promoting unheaded → H2 (Options A or C) would manufacture 3 new anchor-pin obligations that Phase 68/69/70 inherit, with zero offsetting payoff: `grep` confirms ZERO incoming corpus links target lines >50 in any of the 3 admin-setup files Phase 67 may touch, AND C15 validator-strip-alignment argument FOR Option A collapses on inspection (`04-app-deployment.md` + `05-app-deployment.md` are NOT in `appleBusinessDocPaths()` per `v1.6-milestone-audit.mjs:93-124`; `01-abm-configuration.md`'s tail-table contains zero banned-phrase tokens). Phase 67 is Pillar A "Low-Risk Warm-Up" — corpus-convention convergence is a deferrable v1.8+ concern, not a Phase 67 obligation.

**Rationale:**
- **ROADMAP SC#1/SC#2 literal "Version History row" language fully satisfied** by appending a row to each edited file's existing tail-table + bumping frontmatter + adding a coordinating row in `_glossary-macos.md`'s H2 table. The literal "row" language is honored without promoting unheaded → H2; the absence of an H2 above the table does NOT prevent the appended row from BEING a version-history row in the most literal compositional sense.
- **Anti-regression invariants prefer LEAST-INVASIVE edit per STATE.md:121-130.** Option D = zero new H2 sections in admin-setup-*. Tail-table row appends shift only lines AFTER each file's last anchor-target. Zero anchor-shift risk for the admin-setup files by construction.
- **Strictly dominates Options A and C** on anchor-pin cost without losing the SC#2 literal-row reading that Option B sacrifices.
- **Option A (H2 promotion in all 3 files, score 6)** manufactures 3 anchor-pin obligations with no validator payoff (2 of 3 files are out of C15 scope; the third's tail-table is banned-phrase-clean).
- **Option B (frontmatter-only + glossary row, score 5)** sacrifices SC#2's "gains a Version History row" literal reading and creates asymmetry between glossary (real row) and admin-setup files (frontmatter only).
- **Option C (hybrid H2 only where SWEEP-02 touches, score 7)** creates a THIRD corpus convention (unheaded for SWEEP-01-only, H2-headed for SWEEP-02-touched) — worst-of-both.

**PITFALL-6 anchor inventory scope:** ONLY `_glossary-macos.md` (the sole file in STATE.md:125 scope). Capture pre-edit anchor list (heading slugs + line numbers) → post-edit confirm zero shifts at or above line 121 (the `## Version History` H2 sits below all inbound anchor targets — `#mam-we` at line 113 is the nearest preceding anchor; the H2 line position is anchor-stable since rows append INSIDE the existing table). Document inventory artifact as `67-ANCHOR-INVENTORY.md` per Phase 65 / Phase 66 precedent.

### D-02: SWEEP-01 URL verification mechanism — Option B: `markdown-link-check@3.14.2` local (score **B=2** / C=3 / A=5 / E=6 / D=9)

**Decision:** Run `markdown-link-check@3.14.2` (pinned identically to `.github/workflows/audit-harness-v1.6-integrity.yml:167` `rotting-external-quarterly` job) locally against the 4 entries in `c13_rotting_external.ci_1_abm_urls` at Plan 67-01 wave 1. Capture stdout + status codes into `67-VERIFICATION.md` as the primary evidence artifact. Advisor's `curl -I https://business.apple.com` corroborating evidence (2026-05-26 14:29:40 UTC, `HTTP/1.1 200 OK`, `Server: Apple`, no redirect, no rebrand-banner header) lands in `67-VERIFICATION.md` as SECONDARY artifact (HEAD-vs-GET tool divergence vs the cron's GET-based tool — corroborating, not primary).

**Rationale:**
- **Option B reproduces the cron tool byte-identically.** Same package + same pin = IS-equivalent to a hypothetical 2026-07-01 cron run, giving SC#1's "verified against live Apple URL state" the strongest replayable evidence available locally. Node 24 + npm 11 already present.
- **Option D (wait / manually trigger 2026-07-01 cron, score 9) is architecturally blocked, not just slow.** The `rotting-external-quarterly` job carries `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'` at `audit-harness-v1.6-integrity.yml:160` — `workflow_dispatch` does NOT match this guard, so manual trigger silently no-ops. Forcing it would require editing the workflow file, which is **prohibited by REQUIREMENTS.md:64** ("no modifications to older workflow files"). The "wait" half breaks the v1.7 ~1-week milestone target (PROJECT.md:32) by ~5 weeks.
- **Option A (manual browser, score 5)** is fast but not replayable — no machine-parseable artifact, no way to assert against the cron run later.
- **Option C (curl HEAD, score 3)** is light but diverges from the cron's GET-based `markdown-link-check` tool — used here as corroborating secondary evidence, not primary.
- **Option E (trust Phase 66 calibration, score 6)** defers verification entirely to the 2026-07-01 cron — leaves Phase 67 with no fresh evidence at close-gate; SC#1 reads "verified against live Apple URL state" not "trust prior calibration."

**Operational mechanism (one-time, in Plan 67-01 wave 1):**

```powershell
# Install pinned tool (one-shot)
npm install --no-save markdown-link-check@3.14.2

# Probe each URL (4 refs are all the same domain landing so probe once is sufficient; advisor probes per-entry for completeness)
node -e "require('markdown-link-check')('[ABM](https://business.apple.com)', { timeout: '10s' }, (err, results) => { console.log(JSON.stringify(results, null, 2)); process.exit(results[0].status === 'alive' ? 0 : 1); });"
```

Capture stdout into `67-VERIFICATION.md` under new `## SWEEP-01: ABM URL Live-State Verification (2026-05-26)` H2 with 4 subsections (mechanism / tool output / corroborating evidence / outcome).

**Sidecar update mode (post-verification):** Add per-entry `"last_revalidated": "2026-05-26"` to each of the 4 entries in `c13_rotting_external.ci_1_abm_urls`. 4-entry shape preserved → V-62-SIDECAR still PASS (validator only enforces shape, not entry annotations — verified at `scripts/validation/check-phase-66.mjs:85-112`).

**Pipeline-catch handling for the 2026-05-26 → 2026-07-01 window:** Cron continues to fire on `0 8 1 1,4,7,10 *` unchanged with `continue-on-error: false`. Any drift between Phase 67 verification (2026-05-26) and the next cron fire (2026-07-01) is caught by automated PR-blocking failure. No additional Phase 67 hedging needed.

### D-03: SWEEP-02 rename form per occurrence — Option 2: strict H2 + short form in tables + `> **Note:**` callout above each Renewal table (score **Opt2=18** / Opt4=20 / Opt1=23 / Opt3=24)

**Decision:** Full compound `"content token (formerly VPP location token; still labeled \"Apple VPP token\" in Intune)"` on first prose mention per H2 (not per H3). Short form `"content token"` in table cells. New `> **Note:**` callout block inserted above each `## Renewal / Maintenance` table (one per doc) per Phase 64 `11-vpp-catalog-runbook.md:35-39` exact precedent. Subsequent mentions in the same H2 use short form.

**Rationale:**
- **Phase 64 in-corpus precedent is decisive.** Phase 64 author NEVER used the full PITFALLS:657 17-word compound — they used short `(formerly VPP location tokens)` inline OR a separate `Label disambiguation:` callout/paragraph. `11-vpp-catalog-runbook.md:35-39` is an exact precedent for the Option 2 callout pattern. PITFALLS:657 was prescriptive guidance, not a locked verbatim string, and no validator asserts byte sequence. Phase 64 CONVENTIONS.md does not lock a content-token compound either.
- **Validator surface is inert for these edits.** C15 scope (`appleBusinessDocPaths()` at `v1.6-milestone-audit.mjs:93-124`) EXCLUDES both `docs/admin-setup-ios/05-app-deployment.md` and `docs/admin-setup-macos/04-app-deployment.md` — C15 cannot fire. C11 banned patterns (`System Center | SCCM…Intune | Autopatch rings | SafetyNet…compliance`) don't match `content token`, `Apple VPP token`, or `VPP location token`. C11 window keywords (`apple-business-side|intune-side|integration-handshake|…`) are only consulted if a banned pattern fires — irrelevant here. Both validators PASS unchanged.
- **Table readability vs. isolation-read safety trade-off resolved cleanly.** Strict-letter Opt 1/Opt 3 expand the Renewal/Maintenance Component cell ~5× (3 words → 17 words) — table wraps catastrophically. Opt 4 (glossary cross-link) eliminates inline disambiguation, leaving an admin who lands at `## Renewal / Maintenance` in isolation with only a hyperlink — exactly the L1-ticket risk PITFALLS CI-2 / OP-10 were authored to prevent. Opt 2 splits the load: full compound on first-prose-mention per H2 (honors the PITFALLS:657 rule); short form in tables; one-time OP-10 callout above each Renewal table delivers the Apple-vs-Intune label warning to isolation-readers without click-through.

**Concrete 6 edits + 2 callout block inserts + 2 Version History rows (download-and-execute by planner/executor; do NOT renegotiate text in plan-phase):**

| # | File:Line | Containing H2 | BEFORE | AFTER |
|---|---|---|---|---|
| 1 | `admin-setup-ios/05-app-deployment.md:71` | `## Prerequisites` (H3 `### VPP Prerequisites`) — first mention in H2 | `- VPP (Apps and Books) location token uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)` | `- Content token (formerly VPP location token; still labeled "Apple VPP token" in Intune) uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)` |
| 2a | `admin-setup-ios/05-app-deployment.md:198` (INSERT before line 199 H2-separator) | `## Renewal / Maintenance` callout above table | *(no callout)* | `> **Note:** Apple calls this artifact a "content token" (formerly "VPP location token"); Microsoft Intune labels it "Apple VPP token" under \`Tenant administration > Connectors and tokens > Apple VPP tokens\`. Same artifact, different vendor terminology.` + blank line above table |
| 2b | `admin-setup-ios/05-app-deployment.md:201` (now ~203 after callout insert) | `## Renewal / Maintenance` table cell | `\| VPP (Apps and Books) location token \| Annual (365 days) \| …` | `\| Content token \| Annual (365 days) \| …` (rest of row byte-identical) |
| 3 | `admin-setup-macos/04-app-deployment.md:45` | `## Prerequisites` (H3 `### VPP/Apps and Books Prerequisites`) — first mention in H2 | `- Apple Business Manager account with active VPP location token` | `- Apple Business Manager account with an active content token (formerly VPP location token; still labeled "Apple VPP token" in Intune)` |
| 4 | `admin-setup-macos/04-app-deployment.md:46` | `## Prerequisites` (same H2, subsequent mention) | `- VPP location token uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)` | `- Content token uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)` |
| 5 | `admin-setup-macos/04-app-deployment.md:113` | `## VPP / Apps and Books` — first mention in H2 | `2. Verify the VPP location token is active and synced.` | `2. Verify the content token (formerly VPP location token; still labeled "Apple VPP token" in Intune) is active and synced.` |
| 6a | `admin-setup-macos/04-app-deployment.md:145` (INSERT above table at ~146) | `## Renewal / Maintenance` callout above table | *(no callout)* | Same `> **Note:** …` callout as 2a |
| 6b | `admin-setup-macos/04-app-deployment.md:148` (now ~150 after callout insert) | `## Renewal / Maintenance` table cell | `\| VPP location token \| Annual (365 days) \| …` | `\| Content token \| Annual (365 days) \| …` |
| VH-iOS | iOS file tail-table | (existing unheaded Version History table) | *(no row)* | `\| 2026-05-26 \| Phase 67 (SWEEP-02): renamed "VPP (Apps and Books) location token" to "content token" per Apple 2026-04-14 rebrand (L71, L201); added Apple-vs-Intune label disambiguation callout above Renewal/Maintenance table; PITFALLS.md CI-2 closure \| -- \|` |
| VH-mac | macOS file tail-table | (existing unheaded Version History table) | *(no row)* | `\| 2026-05-26 \| Phase 67 (SWEEP-02): renamed "VPP location token" to "content token" per Apple 2026-04-14 rebrand (L45, L46, L113, L148); added Apple-vs-Intune label disambiguation callout above Renewal/Maintenance table; PITFALLS.md CI-2 closure \| -- \|` |

**Net surgical surface:** 6 line rewrites + 2 callout block inserts (each +2 lines) + 2 Version History rows (each +1 line) + frontmatter `last_verified: 2026-05-26` bump on both files = **8 line edits + 2 block inserts + 2 frontmatter bumps across 2 files**.

**Harness implications confirmed:** C11/C14/C15 all PASS unchanged on the 2 edited files (both files are outside `appleBusinessDocPaths()` C15 scope; C11 banned patterns don't match the new prose; C14 rebrand-callout 3-site check is unaffected since this is not a callout-site edit). Full chain `check-phase-{48..66}.mjs` exits with same status as Phase 66 close (PASS modulo CHAIN_SKIP {48,51,58,60,61}).

### D-04: Commit topology — Option E: per-requirement plan structure with atomic-within-plan commits (score **E=7** / C=8 / A=13 / D=15 / B=20)

**Decision:** 3 plans, 3-4 commits. Plan 67-01 = SWEEP-01 (branchable: Branch A zero-edits OR Branch B surgical update). Plan 67-02 = SWEEP-02 (atomic 6 renames + 2 callout inserts + 2 tail-table rows + sidecar annotation). Plan 67-03 = close-gate (chain validator re-runs + 67-VERIFICATION.md + traceability flips). Sidecar mode: ANNOTATE-not-remove for both `ci_1_abm_urls` (`last_revalidated:"2026-05-26"`) and `ci_2_vpp_location_token` (`resolved_2026_05_26:true`) — preserves array shape so Phase 70 HARNESS-02 has a clean Annotate→Reset transition when forking `v1.7-audit-allowlist.json`.

**Rationale:**
- **No active validator constrains the commit boundary.** `check-phase-66.mjs V-66-02` checks only sidecar SHAPE (`c13_rotting_external` is an object + `quarterly_audit.cadence == "0 8 1 1,4,7,10 *"`); it does NOT enforce entry counts. No validator anywhere in `scripts/validation/` consumes `ci_1_abm_urls`/`ci_2_vpp_location_token` contents. Commit granularity is a planning choice, not a contract — Option B (single atomic, score 20) buys zero chain-validator safety that Option E (per-plan, score 7) doesn't already have.
- **Per-plan boundary matches the v1.6 norm AND separates epistemic categories.** Phase 66 landed 5 plan-completion commits + 1 inner atomic-harness commit (`3a9a671`); Phase 65 landed 5+. Plan 67-03 captures validator-confirmed-they-passed which is a different artifact-class than the edits being validated (Phase 66-04 `489edca` deliberately separated audit-results-capture from audit-target-authoring).
- **Option E uniquely handles the SWEEP-01 zero-edits branch as first-class.** If Apple URLs are confirmed-current (most-likely outcome per quarterly cron going green at 2026-01-01 and 2026-04-01 + advisor's 2026-05-26 corroborating curl probe), Plan 67-01 commits a single-file sidecar `last_revalidated:"2026-05-26"` annotation rather than forcing an empty corpus-edit commit. Branch A degenerate first plan is supported architecturally.

**Recommended plan-and-commit layout:**

```
Plan 67-01 (SWEEP-01 — Branch A expected case)
  Wave 1: markdown-link-check@3.14.2 against 4 URLs → capture artifact in 67-VERIFICATION.md draft
  Wave 2 (Branch A — URLs unchanged):
    - Sidecar: add per-entry "last_revalidated":"2026-05-26" to c13_rotting_external.ci_1_abm_urls (all 4)
    - NO corpus edits
  Wave 2 (Branch B — any URL shifted):
    - Surgical update of affected line(s) on affected file(s)
    - Append tail-table row(s) to affected file(s)
    - Bump last_verified: 2026-05-26 on affected file(s)
    - Append coordinating row to _glossary-macos.md ## Version History H2 table
    - Sidecar: update affected entries
  Commit message (Branch A):
    docs(67-01): SWEEP-01 — 4 ABM URLs verified live + sidecar last_revalidated annotation (no corpus edits)
  Commit message (Branch B):
    docs(67-01): SWEEP-01 — surgical update {N} of 4 ABM URLs + Version History rows + sidecar refresh

Plan 67-02 (SWEEP-02 — atomic)
  Wave 1: PITFALL-6 anchor inventory for _glossary-macos.md (pre-edit snapshot → 67-ANCHOR-INVENTORY.md)
  Wave 2: Execute 6 line rewrites + 2 callout block inserts per D-03 table verbatim
  Wave 3: Append 2 tail-table Version History rows (iOS + macOS docs) + bump last_verified on both
  Wave 4: Append coordinating row to _glossary-macos.md ## Version History H2 table
  Wave 5: Sidecar — annotate each of 6 c13_rotting_external.ci_2_vpp_location_token entries with "resolved_2026_05_26": true
  Wave 6: Post-edit anchor inventory diff vs pre-edit → confirm zero shift ≥ line 121 in _glossary-macos.md
  Pre-commit dry-run (MANDATORY before git add):
    - node scripts/validation/v1.6-milestone-audit.mjs && echo OK     (C11/C15 PASS expected)
    - node scripts/validation/check-phase-62.mjs && echo OK            (V-62-SIDECAR shape)
    - node scripts/validation/check-phase-66.mjs && echo OK            (V-66-02 sidecar object shape)
  Commit message:
    docs(67-02): SWEEP-02 — VPP location token -> content token surgical rename (6 occurrences / 2 files) + sidecar resolved + 2 VH rows

Plan 67-03 (close-gate)
  Wave 1: Full chain re-run check-phase-{48..66}.mjs → expect same status as v1.6 close (PASS modulo CHAIN_SKIP {48,51,58,60,61})
  Wave 2: v1.6-milestone-audit.mjs → expect 15/15 PASS
  Wave 3: Author 67-VERIFICATION.md (markdown-link-check primary + curl HEAD secondary + SC#1-4 checklist + validator exit codes table)
  Wave 4: Traceability — PROJECT.md SWEEP-01 + SWEEP-02 Active→Validated flips with closing commit SHAs
  Commit message:
    docs(67-03): Phase 67 close-gate — chain validators green + 67-VERIFICATION.md + traceability flips
```

**Total commit count:** 3 (Branch A) or 3-4 (Branch B, depending on whether SWEEP-01 fits in one commit). NOT atomic across requirements. SWEEP-01 and SWEEP-02 are logically independent — a clean revert per requirement is the desired property.

**Rollback semantics:** `git revert <Plan 67-02 SHA>` cleanly restores v1.6-close corpus baseline for the 2 SWEEP-02 files including sidecar. `git revert <Plan 67-01 SHA>` (if Branch B) cleanly reverts SWEEP-01 corpus + sidecar changes.

### Claude's Discretion

- Markdown-link-check invocation form (per-URL probe vs single domain probe — the 4 refs are all the same domain landing `https://business.apple.com`; planner may probe once for efficiency, log all 4 entries in 67-VERIFICATION.md for traceability)
- Exact phrasing of the tail-table Version History row text for Branch A vs Branch B (template provided in D-03 table; planner may shorten for tighter column rendering provided the date + phase + "SWEEP-NN" + closure marker are preserved)
- Whether to land Plan 67-01 Branch A sidecar annotation as a single PowerShell `jq`-equivalent edit or as a structured file write (low-risk diff either way)
- Whether `67-ANCHOR-INVENTORY.md` Wave 6 post-edit diff lives inline in the same artifact or as a separate `67-ANCHOR-INVENTORY-POST.md` file (precedent split per Phase 65)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 67 contract docs
- `.planning/ROADMAP.md` §Phase 67 (lines 275-285) — Goal + Success Criteria #1-4
- `.planning/REQUIREMENTS.md` §Pillar A (lines 10-14) — SWEEP-01 + SWEEP-02 contracts + Traceability table (lines 79-80)
- `.planning/STATE.md` — anti-regression invariants (lines 121-130); PITFALL-6 scope (line 125); CHAIN_SKIP carry-over state (lines 142-143); BASELINE_10 → BASELINE_11 transition (line 142)
- `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` §CI-1 (lines 13-37) + §CI-2 (lines 40-58) — calibrated enumeration source of truth; Phase 66 calibration finding (4 URLs at HEAD `ad5c9c9`, not ~30 historical estimate)

### Source-of-truth research
- `.planning/research/PITFALLS.md` lines 617-636 — CI-1 ABM URL rotting reference rationale
- `.planning/research/PITFALLS.md` lines 640-660 — CI-2 VPP location token rotting reference rationale (line 657 is the first-mention-per-H2 convention guidance — prescriptive, NOT a locked verbatim string)
- `.planning/research/PITFALLS.md` lines 262-277 — Pitfall: Apple Business vs Intune label discrepancy (drives the OP-10 callout requirement)

### Sidecar + harness
- `scripts/validation/v1.6-audit-allowlist.json` — `c13_rotting_external.ci_1_abm_urls` (lines 80-85, 4 entries to annotate); `c13_rotting_external.ci_2_vpp_location_token` (lines 86-93, 6 entries to mark resolved); `quarterly_audit` metadata (lines 113-118 — DO NOT MODIFY)
- `scripts/validation/v1.6-milestone-audit.mjs:93-124` — `appleBusinessDocPaths()` C15 scope definition (confirms SWEEP-02 files are out of C15 scope)
- `scripts/validation/check-phase-62.mjs:277-279` — V-62-SIDECAR RECONCILED-Phase-65 (only validates `c16_missing_endpoint_exemptions == 0`; does NOT validate c13 shape)
- `scripts/validation/check-phase-66.mjs:85-112` — V-66-02 sidecar shape check (object + `quarterly_audit.cadence` literal; does NOT enforce entry counts)
- `.github/workflows/audit-harness-v1.6-integrity.yml:160` — cron `if:` guard preventing workflow_dispatch path; line 167 — `markdown-link-check@3.14.2` pin (DO NOT MODIFY — REQUIREMENTS.md:64 prohibits older workflow edits)

### Corpus precedents
- `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` lines 35-39 — exact Phase 64 precedent for the OP-10 callout pattern Option 2 reuses
- `docs/_glossary-apple-business.md` lines 113-115 — Phase 62 canonical "Content token" definition + Intune-side label preserved callout (the source for the compound form wording)
- `docs/_glossary-macos.md` line 121 — existing `## Version History` H2 (the only Phase 67 edited file with this section)

### Anti-regression precedents (read for context, not re-doing)
- `.planning/milestones/v1.6-phases/66-apple-business-validation-tooling-closure-milestone-audit/66-CONTEXT.md` — adversarial-review format template used here verbatim; D-01..D-04 scoring discipline
- `.planning/milestones/v1.6-phases/65-apple-business-l1-l2-hub-navigation-integration/65-CONTEXT.md` — PITFALL-6 pre-edit anchor inventory artifact precedent
- v1.6 atomic harness commit `3a9a671` (Phase 66-02) — atomic-commit precedent (NOT inherited by Phase 67; per D-04 the atomic pattern is reserved for Phase 70 harness lineage bump)

### Advisor dossiers (for planner deep-dive if needed)
- `.claude/tmp/phase67-D02-advisor.md` (D-02 full dossier)
- `.claude/tmp/phase67-D03-advisor.md` (D-03 full dossier with 6 concrete rewrites)
- `.claude/tmp/phase67-D04-advisor.md` (D-04 full dossier)
- (D-01 returned inline in agent transcript — synthesized into this CONTEXT.md decisions block)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`markdown-link-check@3.14.2`** — pinned tool already used by the cron job at `audit-harness-v1.6-integrity.yml:167`. Phase 67 D-02 reuses this exact pin locally. Node 24 + npm 11 already present in the dev environment.
- **Tail-table Version History convention** — ~81 corpus files (the MAJORITY-by-count) use an unheaded `| Date | Change | Author |` table after a `---` separator. Phase 67 inherits this pattern for the 3 admin-setup files it may edit. Distinct from the 52-file `## Version History` H2 convention (used by `_glossary-macos.md` and all v1.6 Phase 62-65 deliverables).
- **OP-10 callout pattern** — Phase 64 `11-vpp-catalog-runbook.md:35-39` provides the exact reusable `> **Note:** Apple calls this artifact a "content token" …` block format. Phase 67 D-03 inserts a copy above each `## Renewal / Maintenance` table in the 2 SWEEP-02 files.
- **PITFALL-6 anchor inventory artifact** — Phase 65 `65-ANCHOR-INVENTORY.md` + Phase 66 inventory pattern (pre-edit snapshot + post-edit diff). Phase 67 reuses for `_glossary-macos.md` only.

### Established Patterns
- **Atomic-within-plan commit discipline** — per-plan commit boundary preserved across Phase 65 (5 plans, 5+ commits) and Phase 66 (5 plans, 5+ commits modulo Phase 66-02 atomic-harness `3a9a671`). Phase 67 D-04 inherits.
- **ANNOTATE-not-remove sidecar mode** — preserves array shape so downstream validators that may grow entry-count assertions are unaffected. Forward-compatible with Phase 70 HARNESS-02 forking `v1.7-audit-allowlist.json` (the v1.7 sidecar will reset entries; v1.6 sidecar retains the annotated history).
- **Branchable plan structure (zero-edits-OR-surgical-update)** — new pattern for Phase 67 SWEEP-01 since the verification step's outcome determines whether corpus edits land. Documented for v1.7+ rotting-reference verification phases.
- **Verification artifact lives in 67-VERIFICATION.md** — captured by Plan 67-03 close-gate, NOT in commit messages. Validator exit codes + tool stdout + corroborating evidence + SC#1-4 checklist all aggregated in one artifact.

### Integration Points
- **Sidecar `c13_rotting_external`** — Phase 67's only cross-phase write surface. Phase 70 HARNESS-02 reads this state to fork `v1.7-audit-allowlist.json`. Annotate-not-remove mode preserves Phase 70's clean Annotate→Reset transition.
- **`_glossary-macos.md` ## Version History H2 table** — Phase 67 appends 1-2 coordinating rows. This is the only H2-bearing Version History edit. Other Phase 67 edits use the unheaded tail-table convention.
- **Chain validators check-phase-{48..66}.mjs** — Phase 67 close-gate re-runs the full chain. Expected status: same as v1.6 close (PASS modulo CHAIN_SKIP {48,51,58,60,61} — Phase 68 resolves the SKIP in Pillar B).
- **`v1.6-milestone-audit.mjs` C11/C15** — both inert on the Phase 67 edited surface (C15 scope exclusion + C11 banned-pattern miss). The "harness C11/C15 re-run shows no false positives" SC#2 clause is satisfied by construction.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (per user memory `feedback_adversarial_review_preference`). Phase 67 honored this — 4 parallel `gsd-advisor-researcher` agents dispatched in adversarial-review mode (Finder/Adversary/Referee scoring); all 4 picks user-approved without revision.
- **User maximum-effort preference** (per user memory `feedback_effort_level`) — every gray-area dossier produced concrete operational steps + acceptance criteria + anti-regression risk analysis; no high-level hand-waving.
- **Sequential-on-main-tree execution durable** (per user memory `project_execphase_sequential.md` + `.planning/config.json:7` `use_worktrees:false`). Plan 67-01/02/03 execute sequentially on the main tree. NO worktree experiments.
- **Phase 67 = Pillar A "Low-Risk Warm-Up"** (per ROADMAP:276). All decisions tilt toward minimum-blast-radius + maximum-revertibility. Atomic-across-requirements (Option B in D-04, score 20) was decisively rejected because it conflates edits-with-verification and inflates revert blast radius.
- **Today's date is 2026-05-26.** SWEEP-01 verification artifact bears this date. Frontmatter `last_verified:` bumps on actually-edited files use this date. Tail-table Version History row dates use this date.

</specifics>

<deferred>
## Deferred Ideas

### Already locked elsewhere (not new deferrals — recorded for downstream awareness)
- **CHAIN_SKIP {48, 51, 58, 60, 61} root-cause resolution** — Phase 68 Pillar B (CHAIN-01/02/03). Phase 67 close-gate chain re-run expects these SKIP entries to remain present-and-justified.
- **CI-Linux ubuntu-latest runner job** — Phase 69 Pillar C (CILINUX-01). Phase 67 makes no CI workflow modifications (REQUIREMENTS.md:64 prohibits older workflow edits).
- **v1.7 audit harness lineage bump** — Phase 70 Pillar D (HARNESS-01..06). Phase 67 sidecar annotations carry forward into `v1.7-audit-allowlist.json` Path-A copy + reset at Phase 70.
- **CI-3 Managed Apple ID corpus rename** (45 occurrences / 16 files) — DEFERRED to v1.8+ per REQUIREMENTS.md:65, contingent on Microsoft Intune adopting the rebrand portal-side. Trigger condition not met as of 2026-04-30 tutorial refresh per `STATE.md:144`.
- **Multi-tenant Apple Business surfaces** / **Apple Business Device API documentation** / **per-OU Conference Room Display deep-dive** / **Account Holder lockout standalone runbook** / **Apple School Manager (ASM)** — all carried forward in `v1.7-DEFERRED-CLEANUP.md` (authored at Phase 70 close per HARNESS-06).

### Discovered during Phase 67 discussion (new for v1.8+)
- **Corpus-wide tail-table → `## Version History` H2 convention convergence** — D-01 Option D leaves 81+ corpus files on the unheaded-tail-table convention. v1.8+ may sweep these to the H2 convention for consistency. Phase 67 is not the venue (Pillar A "Low-Risk Warm-Up" + STATE.md:122 anti-regression invariants prefer least-invasive edit).
- **Per-entry sidecar versioning** — Phase 67 introduces per-entry `last_revalidated` (ci_1) and `resolved_NN_NN_NN` (ci_2) annotations. v1.8+ may formalize this as a sidecar schema. v1.7 Phase 70 HARNESS-02 carries the annotations forward; schema formalization is not in v1.7 scope.

</deferred>

---

*Phase: 67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up*
*Context gathered: 2026-05-26*
