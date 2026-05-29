# Phase 67: Corpus Surgical Sweeps (Pillar A — Low-Risk Warm-Up) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-26
**Phase:** 67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up
**Areas discussed:** Version History handling, SWEEP-01 URL verification mechanism, SWEEP-02 rename form per occurrence, Commit topology

**Methodology:** User selected all 4 gray areas AND requested `/adversarial-review` recommend the best option with reasoning per pick (per user memory `feedback_adversarial_review_preference`). Four `gsd-advisor-researcher` agents dispatched in parallel in adversarial-review mode; each returned Finder/Adversary/Referee scoring with the format mirroring v1.6 Phase 66 D-01..D-04. All 4 picks user-approved without revision via single `Approve all 4` selection.

---

## Version History handling

| Option | Description | Selected |
|--------|-------------|----------|
| A — H2 promote all 3 admin-setup files | Add `## Version History` H2 + table to all 3 files that don't have one. Anchor implications: PITFALL-6 trigger across 3 files. | |
| B — Frontmatter-only bump + glossary row | Bump only `last_verified:` frontmatter on 3 docs + add row in `_glossary-macos.md`'s existing table. Zero new H2s, but loses SC#2 literal-row reading. | |
| C — Hybrid SWEEP-02-only H2 promote | Add `## Version History` H2 only to files SWEEP-02 substantively renames. Creates third corpus convention. | |
| **D — Per-file tail-table row + frontmatter + glossary H2 row** | Append row to each edited file's existing unheaded tail-table + bump `last_verified:` + add coordinating row in `_glossary-macos.md`'s H2 table. Zero new H2s. | ✓ |

**Scores (lower = better):** A=6 / B=5 / C=7 / **D=3**.

**Adversary key findings:**
- Option A's validator-strip-alignment argument collapses on inspection: `04-app-deployment.md` + `05-app-deployment.md` are NOT in `appleBusinessDocPaths()` per `v1.6-milestone-audit.mjs:93-124`; `01-abm-configuration.md`'s tail-table is banned-phrase-clean.
- Option B sacrifices SC#2's "gains a Version History row" literal reading and creates asymmetry between glossary and admin-setup files.
- Option C creates a third corpus convention (worst-of-both).

**User's choice:** Option D (advisor-recommended; user-approved).

**Notes:** PITFALL-6 anchor inventory scope per Option D = ONLY `_glossary-macos.md` (the sole file in STATE.md:125 scope — "capability matrices, glossaries, hub files"). Zero incoming corpus links target lines >50 in any of the 3 admin-setup files Phase 67 may touch, confirming Option D's anchor-stability argument.

---

## SWEEP-01 URL verification mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| A — Manual browser check now | Open `https://business.apple.com`, confirm 2xx, capture screenshot. Fast but not replayable. | |
| **B — `markdown-link-check@3.14.2` local** | Run the exact same tool + pin the cron uses. Reproduces cron behavior byte-identically; machine-parseable artifact. | ✓ |
| C — `curl -I` HEAD probe | Lightweight, scriptable, no node dependency. Diverges from cron's GET-based tool. | |
| D — Wait / manually trigger 2026-07-01 cron | Authoritative but blocks Phase 67 ~5 weeks; manual trigger architecturally blocked by `if:` guard. | |
| E — Trust Phase 66 calibration | Defer to next cron fire. Leaves Phase 67 with no fresh evidence at close-gate. | |

**Scores (lower = better):** **B=2** / C=3 / A=5 / E=6 / D=9.

**Adversary key findings:**
- Option D's "manually trigger" half is architecturally impossible: `audit-harness-v1.6-integrity.yml:160` carries `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'` — `workflow_dispatch` does NOT match this guard. Editing the workflow file is prohibited by REQUIREMENTS.md:64.
- Advisor's `curl -I https://business.apple.com` on 2026-05-26 14:29:40 UTC returned `HTTP/1.1 200 OK` — corroborating evidence (not primary) for the Phase 67 plan-time verification.

**User's choice:** Option B (advisor-recommended; user-approved).

**Notes:** Sidecar update mode: per-entry `"last_revalidated": "2026-05-26"` annotation on each of the 4 entries in `c13_rotting_external.ci_1_abm_urls`. Curl HEAD evidence lands in 67-VERIFICATION.md as SECONDARY artifact alongside primary `markdown-link-check` stdout.

---

## SWEEP-02 rename form per occurrence

| Option | Description | Selected |
|--------|-------------|----------|
| Opt 1 — Strict H2 + full compound in tables | One compound per H2 (line 45 macOS gets compound; line 46 short). Tables get full 17-word compound. | |
| **Opt 2 — Strict H2 + short form in tables + `> **Note:**` callout above each Renewal table** | Full compound on first-prose-mention per H2; short form in tables; Phase 64 OP-10 callout pattern reused. | ✓ |
| Opt 3 — H3 scope | Each H3 gets compound. Increases compound mentions where H3s nest under H2s. | |
| Opt 4 — Doc-level once + glossary cross-link | Single compound near top + every subsequent is "content token" + glossary link. Sacrifices isolation-read safety. | |

**Scores (lower = better):** **Opt2=18** / Opt4=20 / Opt1=23 / Opt3=24.

**Adversary key findings:**
- **Phase 64 in-corpus precedent is decisive.** Phase 64 author NEVER used the full PITFALLS:657 17-word compound — they used short `(formerly VPP location tokens)` inline OR a separate `Label disambiguation:` callout. `11-vpp-catalog-runbook.md:35-39` is an exact precedent for the Option 2 callout pattern. PITFALLS:657 was prescriptive guidance, not a locked verbatim string.
- **Validator surface is inert.** Both SWEEP-02 files are OUT of C15 scope (`appleBusinessDocPaths()`); C11 banned-pattern regex doesn't match `content token`/`Apple VPP token`/`VPP location token`.
- Opt 1's full compound in narrow Renewal/Maintenance Component table cells expands the column ~5× (3 words → 17 words) — table wraps catastrophically.
- Opt 4's glossary-cross-link approach leaves an admin landing at `## Renewal / Maintenance` in isolation with only a hyperlink — exactly the L1-ticket risk PITFALLS CI-2 / OP-10 were authored to prevent.

**User's choice:** Option 2 (advisor-recommended; user-approved).

**Notes:** Advisor provided concrete 6 line edits + 2 callout block inserts + 2 Version History rows verbatim in CONTEXT.md D-03 table. Downstream planner/executor executes verbatim — text NOT to be renegotiated at plan-phase.

---

## Commit topology

| Option | Description | Selected |
|--------|-------------|----------|
| A — One atomic per requirement | SWEEP-01 = 1 commit; SWEEP-02 = 1 commit. 2 commits total. | |
| B — One big atomic for entire Phase 67 | All 6 corpus edits + both sidecar updates + close-gate in ONE commit. Largest blast radius. | |
| C — Per-plan commits | Plan 67-01 = SWEEP-01 + sidecar; Plan 67-02 = SWEEP-02 + sidecar; Plan 67-03 = chain validators + 67-VERIFICATION.md. 3 commits. Matches v1.6 norm. | (fallback) |
| D — Per-file commits | Each touched corpus file = own commit. 6-7 commits. Maximum granularity. | |
| **E — Per-requirement plan structure with atomic-within-plan commits** | Same plan boundary as C; Plan 67-01 has Branch A (zero-edits) + Branch B (surgical update) supported architecturally. 3-4 commits. | ✓ |

**Scores (lower = better):** **E=7** / C=8 / A=13 / D=15 / B=20.

**Adversary key findings:**
- **No active validator constrains commit boundary.** `check-phase-66.mjs V-66-02` checks only sidecar shape (object + `quarterly_audit.cadence` literal); does NOT enforce entry counts. No validator anywhere consumes `ci_1`/`ci_2` contents. Granularity is a planning choice, not a contract.
- **Option B (single big atomic, score 20) buys zero chain-validator safety** that Option E doesn't already have. Conflates edits-with-verification (Phase 66-04 `489edca` deliberately separated audit-results-capture from audit-target-authoring as anti-precedent).
- **Option E uniquely handles SWEEP-01 zero-edits branch** as first-class. If Apple URLs are confirmed-current (most-likely outcome per quarterly cron going green at 2026-01-01 and 2026-04-01 + advisor's 2026-05-26 corroborating curl probe), Plan 67-01 commits a single-file sidecar `last_revalidated` annotation rather than forcing an empty corpus-edit commit.

**User's choice:** Option E (advisor-recommended; user-approved).

**Notes:** Sidecar mode is ANNOTATE-not-remove for both `ci_1_abm_urls` (`last_revalidated:"2026-05-26"`) and `ci_2_vpp_location_token` (`resolved_2026_05_26:true`) — preserves array shape so Phase 70 HARNESS-02 has a clean Annotate→Reset transition when forking `v1.7-audit-allowlist.json`. Total commit count: 3 (Branch A) or 3-4 (Branch B). NOT atomic across requirements — clean revert per requirement is the desired property.

---

## Claude's Discretion

- Markdown-link-check invocation form (per-URL probe vs single domain probe — the 4 refs are all `https://business.apple.com`; planner may probe once for efficiency, log all 4 entries in 67-VERIFICATION.md for traceability)
- Exact phrasing of tail-table Version History row text for Branch A vs Branch B
- Whether Plan 67-01 Branch A sidecar annotation lands as PowerShell `jq`-equivalent edit or structured file write
- Whether `67-ANCHOR-INVENTORY.md` Wave 6 post-edit diff lives inline or as a separate `67-ANCHOR-INVENTORY-POST.md` file (precedent split per Phase 65)

## Deferred Ideas

- **Corpus-wide tail-table → `## Version History` H2 convention convergence** — D-01 Option D leaves 81+ corpus files on the unheaded-tail-table convention. v1.8+ candidate for consistency sweep. Phase 67 not the venue (Pillar A "Low-Risk Warm-Up").
- **Per-entry sidecar versioning schema formalization** — Phase 67 introduces per-entry `last_revalidated` / `resolved_NN_NN_NN` annotations. v1.8+ may formalize as sidecar schema. v1.7 Phase 70 HARNESS-02 carries annotations forward; schema formalization not in v1.7 scope.
