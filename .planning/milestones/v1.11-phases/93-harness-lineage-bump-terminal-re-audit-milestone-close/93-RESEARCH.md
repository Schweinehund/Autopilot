# Phase 93: Harness Lineage Bump + Terminal Re-Audit + Milestone Close — Research

**Researched:** 2026-06-25
**Domain:** Path-A milestone-harness lineage authoring (9th bump v1.10→v1.11) + 3-axis terminal re-audit + milestone close
**Confidence:** HIGH (every claim below is a `git`/file:line/command-output citation against the live tree; D-01..D-04 are LOCKED in CONTEXT.md and not re-litigated here)

## Summary

Phase 93 is the 9th Path-A milestone harness in an established lineage. All four implementation
decisions (D-01..D-04) are LOCKED in `93-CONTEXT.md` (resolved via adversarial-review). This
research confirms the precedent's current state in the live tree and surfaces the exact constants,
SHAs, strings, and needles the planner must hardcode. **The single most important finding: the live
tree matches CONTEXT.md's entry-state assumptions exactly — V110 = `a3617e9` is the confirmed
single-commit close, check-phase-89..93 are all missing, frozen-at-close last entry is V19, BASELINE_14
is freshest, 7 audit-harness workflows exist (v1.11 is 8th), and the harness is currently BLIND to all
Phase-92 nav edges.** One deliberate divergence from the Phase 88 precedent is locked and explained
below (V110 pin rides Atom 2, not Atom 1; Atom 1 is 3 files not 4; 5 net-new validators not 6).

**Primary recommendation:** Author every artifact as a verbatim Path-A copy of the Phase 88 (v1.10)
precedent with v1.10→v1.11 relabels and the constants enumerated in the Planner Handoff section.
Nothing in this phase is designed from scratch.

## User Constraints (from CONTEXT.md — LOCKED, verbatim)

### Locked Decisions
- **D-01:** Validator content Option C — concentrate cross-link net in check-phase-92; 89/90/91 lightweight (V-NN-PRESENCE + V-NN-SELF only); 93 = chain-apex only (CHAIN_PHASES=[48..92], CHAIN_SKIP=Set([])); V-63-08/09 DEFER to check-phase-63 (no re-assert in 91); NO C17.
- **D-02:** Plan layout Option A — 4 plans / 5 commits. Plan 93-01 (CONVENTIONS commit + Atom 1 commit), Plan 93-02 (Atom 2 commit), Plan 93-03 (3-axis re-audit artifact commit), Plan 93-04 (close-gate commit). Sequential on main tree (`use_worktrees:false`).
- **D-03:** 3-axis re-audit Option A — 7-validator cross-OS-applicable set (v1.11-milestone-audit + check-phase-88 continuity + 5 net-new 89-93). Axis 1 fresh `git clone --no-hardlinks` + Axis 2 Linux GHA + Axis 3 same fresh sub-agent (one dispatch, two dimensions). Apex 93 count is **Linux-GHA sole-authoritative** (deep-nest timeout guaranteed at [48..92]).
- **D-04:** Close-gate Option A ×4 — ONE close-gate commit (7 files), SINGLE V110 entry (no V110_CLOSEGATE), NO Commit A. V110=`a3617e9` lands in **Atom 2** (divergence). DEFERRED-CLEANUP canonical `.planning/milestones/`. Cross-link (do NOT delete) the stray pre-close `.planning/v1.11-MILESTONE-AUDIT.md`. Working-tree cruft untouched.

### Claude's Discretion (plan-phase author decides)
- `93-CONVENTIONS.md` content (freshness/SHA matrix + locked strings, mirror 88-CONVENTIONS.md).
- Exact `$rand` charset + temp-dir cleanup assertions in Axis-1 recipe (recommend `[0-9a-z]` 8-char).
- V-92-CROSSLINK assertion form (recommend substring class-signature, CRLF-normalized).
- BASELINE_15 anchor (recommend a known-PAST SHA).
- Confirm V110=`a3617e9` on authoring day (done this session).

### Deferred Ideas (OUT OF SCOPE)
- C17 global category; re-asserting V-63-08/09 in check-phase-91; Commit A; second V110_CLOSEGATE entry; worktree execution; `docs/*` corpus edits; working-tree cruft cleanup in the close-gate; deletion of the stray pre-close `.planning/v1.11-MILESTONE-AUDIT.md` (deferred to `/gsd-complete-milestone`).

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-01 | `v1.11-milestone-audit.mjs` + `v1.11-audit-allowlist.json` Path-A from v1.10 (C1-C16) + BASELINE_15 (Atom 1, indivisible) | §1, §6 — Path-A source confirmed, self-test 9/9, BASELINE_14 freshest, c13/quarterly fields located |
| HARN-02 | check-phase-89..NN.mjs validators + frozen-at-close V110=`a3617e9` + 8th CI workflow (Atom 2, indivisible) | §2, §3, §4, §5, §7 — apex skeleton, lightweight shape, cross-link form, frozen-at-close shape, workflow structure all confirmed |
| HARN-03 | 3-axis re-audit (cross-OS EXACT MATCH) + v1.11-MILESTONE-AUDIT.md + v1.11-DEFERRED-CLEANUP.md + 4-doc traceability 15/15 | §8, §9, §10 — exact recipe, close-gate file set, deferred-cleanup skeleton, byte-unchanged gate confirmed |

---

## Target 1 — Path-A sources current state (HARN-01 / Atom 1)

### `scripts/validation/v1.10-milestone-audit.mjs`
- **File length:** 979 lines (`wc -l scripts/validation/v1.10-milestone-audit.mjs`). [VERIFIED]
- **C1–C16 structure confirmed.** Header comment at `v1.10-milestone-audit.mjs:2` reads: *"v1.10 Milestone Audit Harness (Path A copy of v1.9; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10; C1-C16 inherited verbatim)"*. C1 at `:249` (`name: 'C1: Zero SafetyNet as compliance mechanism'`); C16 at `:757` (`name: 'C16: 4-edge cross-link integrity triangle...'`). C16 is BLOCKING from Phase 62 D-A9 (`:16`, `:33`). [VERIFIED]
- **Self-test count = 9/9.** `node scripts/validation/v1.10-milestone-audit.mjs --self-test` → **"Self-test: 9 passed, 0 failed"** (exit 0). The 9 synthetic tests are at `:813–940` (Tests 1–2 C14, 3–4 C15, 5–6 C16, 7–9 parsePlatformValue). Header comment `:813`: *"Self-test mode (--self-test): 9 synthetic behavior tests for C14/C15/C16 + '+' separator"*. [VERIFIED: command output]
- **Default run = 15 PASS / 0 FAIL / 0 SKIP** (per 88-03-AUDIT-RESULTS.md:46 fresh-clone evidence). [CITED: 88-03-AUDIT-RESULTS.md:46]
- **Version-label strings that change v1.10→v1.11** (only 4 occurrences — same "4-line Path-A relabel" the v1.10-MILESTONE-AUDIT lineage section §2 describes):
  - `:2` — header lineage line: `v1.10` → `v1.11` AND extend the chain `... → v1.9 → v1.10` → `... → v1.10 → v1.11`; "Path A copy of v1.9" → "Path A copy of v1.10".
  - `:4` — `scripts/validation/v1.10-audit-allowlist.json` → `v1.11-audit-allowlist.json`; "Path-A from v1.9 ... per Phase 88 close-state" → "Path-A from v1.10 ... per Phase 93 close-state".
  - `:35` — Usage line: `node scripts/validation/v1.10-milestone-audit.mjs` → `v1.11-milestone-audit.mjs`.
  - `:79` — `const raw = readFile('scripts/validation/v1.10-audit-allowlist.json');` → `v1.11-audit-allowlist.json` (the sidecar-repoint line; this is the line the CI `path-match` job greps for). [VERIFIED]

### `scripts/validation/v1.10-audit-allowlist.json`
- **531 lines.** `phase` field at `:4` = `"88-harness-lineage-bump-terminal-re-audit-milestone-close"` → change to `"93-harness-lineage-bump-terminal-re-audit-milestone-close"`. `generated` `:3` = `"2026-06-24T00:00:00Z"` → bump to authoring day. [VERIFIED]
- **`c13_rotting_external` reset fields** (`:321–529`): `ci_1_abm_urls` (4 entries, `:322–355`), `ci_2_vpp_location_token` (`:356`), `ci_3_managed_apple_id` (`:448`), and the `quarterly_audit` block (`:523–528`). For v1.11 these are **carried forward** (the migration walkthrough adds `business.apple.com` references but the Path-A copy carries the existing population; the planner should confirm whether Phase 90's `02-mdm-migration-psso.md` introduces new ABM URLs needing addition — but D-01 keeps C1-C16 verbatim, so the safe default is verbatim carry). [VERIFIED]
- **`quarterly_audit` cadence keys** (`:523–528`): `cadence: "0 8 1 1,4,7,10 *"`, `scope`, `tool: "markdown-link-check"`, `next_review: "2027-01-01"`. Carry forward verbatim (bump `next_review` only if the planner chooses; not required by C-checks). [VERIFIED]
- **`c13_broken_link_allowlist`** held at exactly 15 entries (6 `transient_external` + 9 `template_placeholder`) — the C13 category-count check at `v1.10-milestone-audit.mjs:676` asserts `expect 6 transient_external, 9 template_placeholder`. **Carry verbatim — changing the count breaks C13.** [VERIFIED]
- **`c16_missing_endpoint_exemptions: []`** at `:530` — empty; carry verbatim. [VERIFIED]

**Atom 1 = exactly 3 files** (per CONTEXT.md D-02): `v1.11-milestone-audit.mjs` + `v1.11-audit-allowlist.json` + BASELINE_15 comment in `regenerate-supervision-pins.mjs`. **NOT 4** — the V110 pin does NOT ride Atom 1 (divergence; see §5 + Divergences). [CITED: 93-CONTEXT.md:60–67]

---

## Target 2 — `check-phase-88.mjs` skeleton (Path-A source for check-phase-93)

`scripts/validation/check-phase-88.mjs` (174 lines, full read). The chain-apex structure:

- **`HARNESS` const** (`:38`): `'scripts/validation/v1.10-milestone-audit.mjs'` → repoint to `v1.11-milestone-audit.mjs`.
- **`CHAIN_PHASES` declaration** (`:41`): explicit integer array `[48,49,...,87]` (40 entries, 48 through 87). For check-phase-93: extend to **[48..92]** (45 entries). [VERIFIED]
- **`CHAIN_SKIP`** (`:44`): `const CHAIN_SKIP = new Set([]);` — empty per Phase 68 `7b635ca` invariant. Carry verbatim. [VERIFIED]
- **V-88-AUDIT** (`:48–64`): heading-presence check on 88-VERIFICATION.md via `resolveArchivedPhasePath(...)` with archive-list `['v1.10-phases']`; SKIP-PASS until close-gate lands the VERIFICATION.md. For 93: target `93-VERIFICATION.md`, archive-list `['v1.11-phases']` (matches where the milestone archive will live). [VERIFIED]
- **CHECK_PHASE_NESTED=1 child-spawn block** (`:71–106`): `const NESTED = process.env.CHECK_PHASE_NESTED === '1';` at **:71**. The nested short-circuit returns a single SKIP line at **:78–80** (`if (NESTED) return { pass: true, skipped: true, detail: 'nested invocation...' }`). `isPeer = phaseNum >= 67` (`:85`) → 600s timeout for peers; child env sets `CHECK_PHASE_NESTED: '1'` (`:87`); `execFileSync('node', [path], {stdio:'pipe', timeout, ...})` at `:89`. **This is the D-03 load-bearing line: the apex returns a single `CHAIN-NN exits 0` line per child, never a cross-OS-diffable triplet** → confirms the 5 net-new validators each need STANDALONE cross-OS rows. [VERIFIED — cited at 93-CONTEXT.md:107 as `check-phase-88.mjs:78-80`]
- **V-88-AUDIT-HARNESS** (`:108–128`): subprocess-runs the HARNESS const, exits 0. Repoint to v1.11 harness. [VERIFIED]
- **V-88-SELF guard** (`:130–144`): dual-invariant — `if (CHAIN_PHASES.includes(88))` FAIL + `if (CHAIN_SKIP.size !== 0)` FAIL. For 93: assert 93 NOT in CHAIN_PHASES + CHAIN_SKIP empty. [VERIFIED]
- **Runner loop** (`:146–173`): `LABEL_WIDTH=60`, padLabel, `Result: N PASS, N FAIL, N SKIPPED`, `process.exit(failed>0?1:0)`. Verbatim. [VERIFIED]

---

## Target 3 — Lightweight validator shape (Path-A for check-phase-89/90/91)

`scripts/validation/check-phase-87.mjs` (98 lines, full read) is the canonical lightweight shape:

- **`CHAIN_PHASES = []`** (`:33`) — empty; chain lives ONLY in apex. [VERIFIED]
- **`CHAIN_SKIP = new Set([])`** (`:35`). [VERIFIED]
- **`DELIVERABLE` const** (`:38`): `'docs/index.md'` — single PRESENCE target. [VERIFIED]
- **V-87-PRESENCE** (`:42–52`): `readFile(DELIVERABLE)`; FAIL if null, FAIL if `.trim().length===0`, else PASS with byte count. [VERIFIED]
- **V-87-SELF** (`:54–68`): same dual-invariant as apex (`CHAIN_PHASES.includes(87)` + `CHAIN_SKIP.size`). [VERIFIED]
- **Each lightweight validator = exactly 2 checks (PRESENCE + SELF) → 2 PASS / 0 FAIL / 0 SKIP** (per 88-03 rows for 84-87, each `2/0/0`). [CITED: 88-03-AUDIT-RESULTS.md:49–52]
- Header `:6–7` literally cites *"LIGHTWEIGHT per Phase 88 D-01"* — for v1.11, cite "Phase 93 D-01" (which re-applies Phase 82 D-01). [VERIFIED]

**PRESENCE targets** (per CONTEXT.md D-01:47): check-phase-89 → `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`; check-phase-90 → `docs/l2-runbooks/30-macos-mdm-migration-failure.md`; check-phase-91 → `docs/_glossary-macos.md`. [CITED: 93-CONTEXT.md:47]

---

## Target 4 — Cross-link assertion FORM (check-phase-92 V-92-CROSSLINK-E1..E8)

### The FORM — `scripts/validation/check-phase-81.mjs` (119 lines, full read)
- **`{id, file, needle}` array** `SSO_EDGES` at `:45–54` (8 entries E1..E8). [VERIFIED]
- **CRLF-normalized read** — `readFile` at `:30–34` does `.replace(/\r\n/g,'\n')`; the loop comment `:67` notes *"readFile CRLF-normalizes"*. [VERIFIED]
- **Forward-slash substring** — `if (!c.includes(e.needle))` at `:69`; needles are forward-slash relative paths (Windows-safe). [VERIFIED]
- **Generated check IDs** `CROSSLINK-E1..E8` via `for (const e of SSO_EDGES)` at `:62–73`; static-grep comment block at `:59–61`. [VERIFIED]
- **NO allowlist / NO sidecar** — header `:8` *"Hard-assert all 8 (no allowlist / no sidecar — mirrors C16's empty c16_missing_endpoint_exemptions: [])"*. [VERIFIED]
- check-phase-81 ships **9 checks** (8 CROSSLINK + 1 SELF) → for cross-OS counting, check-phase-92 = **9 PASS / 0 FAIL / 0 SKIP** if all 8 edges present + SELF. [VERIFIED by structure]

### The 8 nav-edge needles for check-phase-92 (extracted from the live nav-hub files)

The `92-VERIFICATION.md` "Key Link Verification" table (L52–63) names the edges; below are the
**exact forward-slash needles grepped from the four committed nav-hub files** (these are what
check-phase-92 must assert). The harness is currently **BLIND** to all of these:
`grep -rln "01-psso-provisioning-walkthrough|02-mdm-migration-psso|30-macos-mdm-migration-failure" scripts/validation/` → **NONE** (confirms D-01's durable-net-to-add). [VERIFIED: command output]

| ID | file | needle (forward-slash substring) | live cite |
|----|------|----------------------------------|-----------|
| E1 | `docs/index.md` | `macos-lifecycle/01-psso-provisioning-walkthrough.md` | index.md:111,128 |
| E2 | `docs/index.md` | `macos-lifecycle/02-mdm-migration-psso.md` | index.md:112,129 |
| E3 | `docs/index.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` | index.md:130 |
| E4 | `docs/common-issues.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` | common-issues.md:232,240 |
| E5 | `docs/common-issues.md` | `l2-runbooks/27-macos-sso-investigation.md` | common-issues.md:238,239(table)/218,239 |
| E6 | `docs/quick-ref-l2.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` | quick-ref-l2.md:216,226 |
| E7 | `docs/quick-ref-l2.md` | `#platform-sso-attestation-command` | quick-ref-l2.md:214 (anchor cross-ref, link-not-copy) |
| E8 | `docs/decision-trees/06-macos-triage.md` | `../l2-runbooks/30-macos-mdm-migration-failure.md` | 06-macos-triage.md:58 (`click MACE3`) |

[VERIFIED: grep output of the four files] — NOTE: 92-VERIFICATION.md L52–63 lists 10 link rows; the
8-needle selection above is the planner's discretion (D-01 says "8 needles ... plan-phase confirms them
against 92-VERIFICATION.md"). The above set covers all 4 hub files + both the migration runbook (#30),
the SSO runbook (#27), and the anchor cross-ref (link-not-copy). The planner should confirm the exact
8 against `92-VERIFICATION.md:52–63` and may substitute `#key-terminal-commands` (quick-ref-l2.md:213)
for E7 if preferring a different anchor. **Recommendation:** use substring class-signature form
(CRLF-normalized, forward-slash) per CONTEXT.md discretion line 132, NOT line-pinned needles
(nav-hub line numbers will drift). [CITED: 93-CONTEXT.md:48,132]

---

## Target 5 — `frozen-at-close.mjs` (V110 entry shape)

`scripts/validation/_lib/frozen-at-close.mjs` (63 lines, full read):
- **Current last entry = V19** (`:28–30`): `V19: 'b29dca5', // Phase 82 Plan 82-04 — v1.9 milestone close-gate ... Single entry`. **No V110, no readAtV110Close** — confirms CONTEXT.md entry-state. [VERIFIED]
- **`MILESTONE_CLOSE_SHAS` object** `:17–34`: `{ V141, V15, V16, V17, V17_CLOSEGATE, V18, V19 }`. [VERIFIED]
- **`readAtClose(milestoneTag, relPath)`** export `:45–53`: `git show <SHA>:<path>`, CRLF-normalized. [VERIFIED]
- **Convenience exports** `:56–62`: `export const readAtV19Close = (p) => readAtClose('V19', p);` — this is the exact shape to mirror. [VERIFIED]

**Planner specifies for Atom 2:**
```js
  V110: 'a3617e9',  // Phase 88 Plan 88-04 — v1.10 milestone close-gate (docs(88-04); 4-doc traceability
                    // + v1.10 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.10 closed in ONE
                    // commit; atom == close-gate; no separate V110_CLOSEGATE).
```
…added after the V19 entry (`:30`), and:
```js
export const readAtV110Close      = (p) => readAtClose('V110',         p);
```
…added after the readAtV19Close export (`:62`). **No second V110_CLOSEGATE** (v1.10 closed in one
commit — D-04 sub-1). **This addition rides ATOM 2, not Atom 1** (the locked divergence). [CITED: 93-CONTEXT.md:113–114]

---

## Target 6 — BASELINE_15 (HARN-01)

`scripts/validation/regenerate-supervision-pins.mjs`:
- **BASELINE_14 is the current freshest** comment (`:439–445`): *"BASELINE_14 refreshed 2026-06-24 (Phase 88 Plan 88-01): closes BASELINE_13 v1.9 carry-over per HARN-01 contract ... verified against HEAD 2329791 (Phase 88 Wave-1 commit) ... Resolution path: BASELINE_15 will refresh at the next milestone close per the Path-A inheritance pattern (... -> v1.9 -> BASELINE_13 -> v1.10 -> BASELINE_14)."* [VERIFIED]
- The `BASELINE_9` array (the actual line-coord data) is at `:446` and is **NOT altered** — every refresh is comment-only (each comment block says *"BASELINE_9 entries above remain unchanged"*). [VERIFIED]
- **BASELINE_15 anchor = a known-PAST SHA** (mirrors BASELINE_14 anchoring to `2329791`, the Phase 88 Wave-1 CONVENTIONS commit). For Phase 93, anchor to the Plan 93-01 Wave-1 commit (the 93-CONVENTIONS.md commit) — that SHA is known-PAST at Atom 1 authoring time (Atom 1 is committed after the CONVENTIONS commit per D-02). Capture via `git rev-parse --short HEAD` at Atom-1 task time. **Do NOT anchor to the future Phase-93 close SHA.** [CITED: 93-CONTEXT.md:133]

**BASELINE_15 comment to append** (after `:445`):
```
// BASELINE_15 refreshed 2026-06-25 (Phase 93 Plan 93-01): closes BASELINE_14 v1.10 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 93 SC#1); v1.11 line positions
// verified against HEAD <93-01-CONVENTIONS-commit-SHA> (Phase 93 Wave-1 commit — 93-CONVENTIONS.md constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 93 does NOT alter the line-coord array;
// this comment records the audit-trail event ... remain valid for the v1.11 corpus. Resolution path:
// BASELINE_16 will refresh at the next milestone close per the Path-A inheritance pattern (... -> v1.10 -> BASELINE_14 -> v1.11 -> BASELINE_15).
```

---

## Target 7 — CI workflow Path-A (HARN-02)

`.github/workflows/audit-harness-v1.10-integrity.yml` (229 lines, full read). v1.11 copy is the **8th**
coexistence file (`ls .github/workflows/audit-harness*.yml | wc -l` = **7**). [VERIFIED]

Job structure (all repointed v1.10→v1.11):
- **Header `:1–11`** — comment says *"7th coexistence workflow"* + PRESERVES contract list (FETCH-DEPTH-01, LF-fidelity, D-A9 PR-blocking, timeout-30, CHAIN_TIMING_LINUX). For v1.11 → **8th**.
- **`name: Audit Harness v1.10 Integrity`** `:12` → `v1.11`.
- **`on.pull_request.paths`** `:16–22`: `scripts/validation/v1.10-*`, `check-phase-*.mjs`, the workflow file, `.planning/REQUIREMENTS.md`, `v1.10-MILESTONE-AUDIT.md`, `v1.10-DEFERRED-CLEANUP.md` → repoint all `v1.10`→`v1.11`.
- **2 crons** `:23–25`: weekly Monday `0 8 * * 1` + quarterly `0 8 1 1,4,7,10 *`. Carry verbatim.
- **`parse` job** `:29–46`: validates `v1.10-audit-allowlist.json` shape → repoint to v1.11.
- **`path-match` job** `:48–61`: `grep -q "scripts/validation/v1.10-audit-allowlist.json" scripts/validation/v1.10-milestone-audit.mjs` → repoint both to v1.11.
- **`harness-run` job** `:63–72`: `node scripts/validation/v1.10-milestone-audit.mjs --verbose` → v1.11.
- **`linux-chain-ubuntu-latest` job** `:74–92`: **`fetch-depth: 0`** (`:84`), **`core.autocrlf false`** (`:82`), **`continue-on-error: false`** (`:79`), **`timeout-minutes: 30`** (`:78`); runs apex `check-phase-88.mjs` (→ `check-phase-93.mjs`) with CHAIN_TIMING_LINUX `::notice`. [VERIFIED all 4 contract values]
- **Per-validator jobs** `:94–176`: one job each for check-phase-83,84,85,86,87,88 (`fetch-depth:0`, `timeout-minutes:15`, `continue-on-error:false`). For v1.11 → **add jobs check-phase-89, 90, 91, 92, 93** (and the chain apex job runs check-phase-93). The planner decides whether to keep 83-88 jobs (they are the prior milestone's; the v1.10 file kept only 83-88, i.e., its own milestone's validators) — **mirror v1.10: ship only the v1.11 validator jobs (89-93)**, with the linux-chain job running the apex check-phase-93.
- **`rotting-external-quarterly` job** `:178–210`: cron-only `if:` guard (`:182`) → SKIPs on workflow_dispatch (the D-03 negative control). Carry, repoint sidecar to v1.11.
- **`pin-helper-advisory` job** `:212–229`: `continue-on-error: true` (advisory). Carry verbatim.

---

## Target 8 — 3-axis re-audit recipe (HARN-03)

Source: `88-03-AUDIT-RESULTS.md` (162 lines, full read). This is the exact drop-in recipe.

### Axis-1 PowerShell recipe (Windows local, fresh clone)
- **Clone path:** `$env:TEMP\v1.10-audit-<rand8>` → for v1.11: `$env:TEMP\v1.11-audit-<rand8>`. [CITED: 88-03:7, frontmatter `clone_path_pattern`]
- **`$rand` charset:** `[0-9a-z]`, 8 chars (88-03:40 *"rand charset [0-9a-z], 8 chars"*). Real example used: `o7wk9rgf` (88-03:32). [VERIFIED]
- **Clone command:** `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.11-audit-<rand>` — auditor independence (own `.git/`), NOT a worktree (permitted under `use_worktrees:false`). [CITED: 88-03:32,139]
- **HEAD-match assert:** assert cloned HEAD == source HEAD (88-03:54 *"Clone HEAD match: PASS (8c28a7f... == 8c28a7f...)"*).
- **Run the fast non-apex validators + capture exit/PASS/FAIL/SKIP:** v1.10 ran the 5 non-apex (check-phase-83..87) + harness `--verbose` + `--self-test`. For v1.11 run the **6 fast non-apex** (check-phase-88 continuity + check-phase-89,90,91,92 net-new; harness `--verbose` + `--self-test`). **Do NOT run check-phase-93 apex from the Windows clone** (D-04 — Linux-GHA sole-authoritative). [CITED: 88-03:40,42]
- **Cleanup-assert (zero orphans):** `Remove-Item -Recurse -Force`; assert `Get-ChildItem $env:TEMP -Filter "v1.11-audit-*" -Directory` count == 0 (88-03:54,142). [VERIFIED]

### Axis-2 `gh workflow run` command
- `gh workflow run audit-harness-v1.10-integrity.yml --ref master` → for v1.11: `gh workflow run audit-harness-v1.11-integrity.yml --ref master` (88-03:34). Capture run URL + per-job conclusions + Linux chain timing. [VERIFIED]
- **Pre-flight 3-part gate** (88-03:143): `git log origin/master --oneline -1` (Atom 2 on origin) + `gh auth status` (authenticated) + `gh workflow list` (v1.11 workflow `state: active`). [VERIFIED]

### Cross-OS EXACT MATCH evidence format
8-row (v1.10) / **8-row for v1.11** table at 88-03:108–123, columns `# | Validator | Windows (Axis 1+3) | Linux (Axis 2 GHA) | Match`, format `PASS / FAIL / SKIP`. For v1.11 the **7-validator** set per D-03 produces a table of: v1.11-milestone-audit (`15/0/0`), check-phase-88 continuity (`42/0/1` baseline), check-phase-89/90/91/92 net-new (`2/0/0` each except 92 which is `9/0/0` — 8 CROSSLINK + 1 SELF), check-phase-93 apex (Linux-GHA sole-authoritative, ~`48/0/1`, capture at audit time). [VERIFIED structure; counts derived]

### CONFIRMED: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 ACTUALLY FIRED in v1.10
**Spurious-count evidence (88-03:85–96):**
- Windows warm-tree `check-phase-88.mjs` run 1: **41 PASS / 1 FAIL / 1 SKIP** — FAIL on V-88-CHAIN-66 (check-phase-66 subprocess output truncated at `[5/28]` boundary). [VERIFIED: 88-03:88]
- Windows warm-tree run 2: identical `41/1/1` truncation (reproducible). [88-03:89]
- `check-phase-66.mjs` standalone on Windows: **28 PASS / 0 FAIL / 0 SKIP** (exit 0, clean) — proves it is NOT a real failure. [88-03:90]
- Linux GHA apex: **42 PASS / 0 FAIL / 1 SKIP** — no truncation. [88-03:94]

This grounds D-03's Linux-GHA-sole-authoritative apex decision: at [48..87] the Windows apex was
already unreliable; Phase 93 is **[48..92]** (+5 deeper, depth-monotone) → the Windows apex is
**guaranteed** unreliable, so the apex count is Linux-GHA exclusively authoritative. Carry
WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 forward to `v1.11-DEFERRED-CLEANUP.md`, updating depth to [48..92].
[CITED: 88-03:85–96, 159; 93-CONTEXT.md:108]

---

## Target 9 — Close-gate structure (HARN-03)

Source: `88-04-PLAN.md` (189 lines, full read) + the live `v1.10-MILESTONE-AUDIT.md` / `v1.10-DEFERRED-CLEANUP.md`.

### v1.10 single close-gate commit file set (7 files) — `88-04-PLAN.md:7–14`
1. `.planning/milestones/v1.10-MILESTONE-AUDIT.md` (NEW)
2. `.planning/milestones/v1.10-DEFERRED-CLEANUP.md` (NEW)
3. `.planning/phases/88-.../88-VERIFICATION.md` (NEW)
4. `.planning/PROJECT.md` (traceability flip)
5. `.planning/ROADMAP.md` (traceability flip)
6. `.planning/STATE.md` (traceability flip)
7. `.planning/REQUIREMENTS.md` (traceability flip)

For v1.11: same 7-file shape → `v1.11-MILESTONE-AUDIT.md` + `v1.11-DEFERRED-CLEANUP.md` +
`93-VERIFICATION.md` + 4-doc flip. Commit message pattern (88-04:52):
`docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE`. [VERIFIED]

### 4-doc traceability flip mechanism — `88-04-PLAN.md:124–147`
- REQUIREMENTS.md: flip the 3 HARN reqs Pending→Validated + already-Complete reqs→Validated; update coverage to **15/15 Validated** (v1.11 has 15 total; v1.10 had 17). [VERIFIED via REQUIREMENTS.md:118–121]
- ROADMAP.md: mark Phase 93 complete (4/4 plans); HARN-01/02/03 Validated; Progress table row Complete.
- STATE.md: milestone status closed; progress 5/5 phases; 15/15 Validated.
- PROJECT.md: flip v1.11 milestone status to closed.
- `close_commit:` = literal `{phase_93_close_SHA}` placeholder (NO Commit A; recoverable via `git log --all --grep="93-04" --grep="close-gate" --all-match -1 --format=%H`). [CITED: 88-04:96; 93-CONTEXT.md:115]

### Stray pre-close `.planning/v1.11-MILESTONE-AUDIT.md` handling (D-04 sub-3 precedent)
- **What v1.10 did:** the close-gate (`a3617e9`) authored canonical `.planning/milestones/v1.10-MILESTONE-AUDIT.md` and did NOT touch the stray `.planning/v1.10-MILESTONE-AUDIT.md`. The stray was later DELETED by the **archive chore `3888555`** (`chore: archive v1.10 milestone files`), NOT by the close-gate. [VERIFIED: `git log --grep="close-gate" --grep="v1.10"` returns `3888555` as the archive chore; `a3617e9` is the close-gate]
- **Phase 93 mirrors this exactly:** close-gate authors canonical `.planning/milestones/v1.11-MILESTONE-AUDIT.md`, CROSS-LINKS the stray `.planning/v1.11-MILESTONE-AUDIT.md` (12/15) as evidence input, does NOT delete it. Deletion deferred to `/gsd-complete-milestone`. [CITED: 93-CONTEXT.md:122–123]

### `v1.10-MILESTONE-AUDIT.md` section skeleton (Path-A source) — live file headings
Frontmatter (`:1–93`): `milestone: v1.10`, `scores: {requirements: 17/17, phases: 6/6}`,
`harness:`, `allowlist:`, `atom_1_sha`, `atom_2_sha`, `audit_results_sha`, `close_commit: "{phase_88_close_SHA}"`,
`gha_workflow_run`, `cross_os_exact_match: true`. Body sections:
`## Executive Summary` · `## v1.10 Phase Closure Narrative` (per-phase `### Phase 83..88`) ·
`## Auditor-Independence Verification (3-axis stacking)` · `## Cross-OS PASS-Count EXACT MATCH` ·
`## Requirements Traceability — 3/3 HARN Closed` · `## Cumulative v1.10 Requirements Traceability — 17/17 Total` ·
`## Mechanical Checks Detail` · `## Audit Harness Lineage (phases 62→66→70→74→82→88, lineage v1.4→v1.10 — 8th entry)` ·
`## Cross-Phase Integration` · `## Deferred Items Summary` · `## Milestone Close`. [VERIFIED — grep output]
For v1.11: `milestone: v1.11`, `15/15`, `phases: 5/5`, lineage `62→66→70→74→82→88→93 ... v1.4→v1.11 — 9th entry`.

### `v1.10-DEFERRED-CLEANUP.md` section skeleton (Path-A source) — live file headings
`# v1.10 Deferred Cleanup — v1.11+ Backlog` · `# Part A — v1.10 New Deferrals`
(`## MTPSSO-01/02/03`, `## KRBFUT-01/02`, `## WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` carried) ·
`# Part B — Carried-Forward v1.8 Deferred Items (PRESERVED verbatim)` (ARCHIVE-UPSTREAM-01,
HELPER-SPAWN-STDERR-01, FROZEN-AWARE-ADOPTION-SWEEP-01, EXEC-FAIL-DETAIL-EXTRACTION-01, CI-3, etc.) ·
`## Cross-References`. [VERIFIED — grep output]
For v1.11 (per CONTEXT.md D-04 sub-2 + Deferred section): **Part A new items** = Intune
profile-based-enrollment config gap (Phase 90), Iru console device-deletion steps (Phase 90),
supervision-status-post-migration (Phase 90), + Phase 89 CR-01/WR-01/IN-01 residue; **CARRY verbatim**
all v1.10 items (MTPSSO/KRBFUT + Part B v1.8 carry-forwards) + WINDOWS-CLONE-DEEPNEST-TIMEOUT-01
(update depth → [48..92]); **DROP** resolved v1.11 reqs (PROV/MIG/RUN/REF/NAV — satisfied 89-92).
**No pre-existing `docs/v1.11-DEFERRED-CLEANUP.md`** (unlike v1.9) → no docs/ cross-link section.
[CITED: 93-CONTEXT.md:117–120]

---

## Target 10 — Predecessor byte-unchanged set (the close-gate HARD gate)

Source: `88-CONVENTIONS.md:262–306` enumerated **20 surfaces** for v1.10 (anchor `c8f4cf6`). For v1.11
this grows to **23 surfaces** (Phase 93 adds the v1.10 workflow + v1.10 harness + v1.10 sidecar to the
predecessor list). Confirmed counts in the live tree: 7 audit-harness workflows, 8 milestone-audit MJS,
8 allowlist JSON. [VERIFIED: `ls` counts]

**The 23 v1.11 frozen surfaces (byte-unchanged from pre-Phase-93 anchor through close-gate):**

**7 Workflow YAMLs:**
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base — `name: Audit Harness Integrity`, no version suffix) [VERIFIED header]
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml`
7. `.github/workflows/audit-harness-v1.10-integrity.yml` ← NEW to the frozen list this phase

**8 Milestone-Audit MJS:**
8–15. `v1.4`, `v1.4.1`, `v1.5`, `v1.6`, `v1.7`, `v1.8`, `v1.9`, `v1.10`-milestone-audit.mjs ← v1.10 NEW to list

**8 Sidecar JSON:**
16–23. `v1.4`, `v1.4.1`, `v1.5`, `v1.6`, `v1.7`, `v1.8`, `v1.9`, `v1.10`-audit-allowlist.json ← v1.10 NEW to list

**NOT in the invariant:** chain validators `check-phase-{48..92}.mjs` (CONTEXT.md:23,179). **Pre-Phase-93
anchor SHA = `9ef5efb`** (`docs(state): record phase 93 context session`, current HEAD —
`git rev-parse --short HEAD`). [VERIFIED] The planner should re-capture the anchor at Plan 93-01 task
time (it will be the commit immediately before the first Phase-93 commit). The HARD gate:
`git diff <pre-93-anchor> HEAD -- <23 surfaces>` returns EMPTY at close-gate commit time. [CITED: 88-CONVENTIONS.md:262–306; 93-CONTEXT.md:127]

---

## Divergences from CONTEXT.md assumptions

**None — all CONTEXT.md entry-state assumptions are CONFIRMED against the live tree.** Specifically verified:

| CONTEXT.md assumption (line) | Live-tree confirmation |
|------------------------------|------------------------|
| check-phase-89..93 ALL MISSING (:18) | `ls scripts/validation/` shows 80-88 only; no 89-93. CONFIRMED |
| frozen-at-close last entry = V19, no V110 (:19) | frozen-at-close.mjs:30 last entry V19; no V110/readAtV110Close. CONFIRMED |
| V110 SHA = `a3617e9`, single-commit close (:20) | `git show -s a3617e9` = `docs(88-04): ... v1.10 MILESTONE CLOSE`; following `3888555` is `chore: archive` (NOT the atom). CONFIRMED |
| BASELINE_14 freshest (:21) | regenerate-supervision-pins.mjs:439 BASELINE_14 (Phase 88); BASELINE_15 named as next. CONFIRMED |
| 7 audit-harness workflows; v1.11 is 8th (:22) | `ls audit-harness*.yml | wc -l` = 7. CONFIRMED |
| check-phase-88 CHAIN range = [48..87] (:189) | check-phase-88.mjs:41 explicit [48..87] (40 entries). CONFIRMED — for 93 extend to [48..92] |
| self-test count (implicit, "preserved") | `--self-test` → 9 passed, 0 failed. CONFIRMED (9/9) |
| harness blind to nav edges (:155) | grep validators for nav needles → NONE. CONFIRMED |
| WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 fired at [48..87] (:108) | 88-03:88 warm-tree `41/1/1` vs Linux `42/0/1`. CONFIRMED |

**The one locked-and-deliberate divergence from the Phase 88 precedent** (NOT a tree-vs-CONTEXT
discrepancy — this is intentional and documented in CONTEXT.md:14,113): in v1.9/v1.10 the
frozen-close-SHA pin (V19/V19-pattern) rode **Atom 1** (88-01-PLAN.md:11,18 — V19 in frozen-at-close
is an Atom-1 file). In **v1.11, the V110 pin rides ATOM 2** per ROADMAP SC#2 + HARN-02. Consequence:
**Atom 1 = exactly 3 files** (not 4): `v1.11-milestone-audit.mjs` + `v1.11-audit-allowlist.json` +
BASELINE_15. **Atom 2 = exactly 7 files**: check-phase-89,90,91,92,93 + frozen-at-close.mjs (V110) +
`audit-harness-v1.11-integrity.yml`. Still ordering-safe: `a3617e9` is known-PAST and check-phase-93
reads only PRIOR-milestone closes. Also: v1.11 ships **5 net-new validators** (89-93), whereas v1.10
shipped 6 (83-88) — because v1.11 has 5 content+harness phases (89-93) vs v1.10's 6 (83-88). [CITED: 93-CONTEXT.md:14,113; 88-01-PLAN.md:11,18]

---

## Planner Handoff — exact constants/strings/SHAs/needles to hardcode

**SHAs:**
- `V110 = 'a3617e9'` (full: `a3617e911c3c111cf1e2b873f6b9a4cc238ab8d8`) — v1.10 close-gate, Atom 2.
- Pre-Phase-93 anchor (current HEAD) = `9ef5efb` (re-capture at Plan 93-01 task time).
- BASELINE_15 anchor = the Plan 93-01 Wave-1 (93-CONVENTIONS) commit SHA (known-PAST; capture at Atom-1 task time).
- `close_commit: "{phase_93_close_SHA}"` (literal placeholder; recover via `git log --all --grep="93-04" --grep="close-gate" --all-match -1 --format=%H`).

**Counts / structural constants:**
- self-test = **9/9** (preserve verbatim; do not add tests).
- milestone-audit default = **15 PASS / 0 FAIL / 0 SKIP**.
- C13 category counts (DO NOT CHANGE): 6 `transient_external`, 9 `template_placeholder`; `c16_missing_endpoint_exemptions: []`.
- apex CHAIN_PHASES = **[48..92]** (45 entries); CHAIN_SKIP = `new Set([])`.
- Atom 1 = **3 files**; Atom 2 = **7 files**; close-gate = **7 files**; total **5 commits**.
- 7-validator cross-OS set: v1.11-milestone-audit, check-phase-88 (continuity), check-phase-89/90/91/92/93.
- Expected cross-OS counts: harness `15/0/0`; 88 `42/0/1`; 89/90/91 `2/0/0`; 92 `9/0/0` (8 CROSSLINK + SELF); 93 apex Linux-GHA sole-authoritative ~`48/0/1` (capture at audit time).
- 23 predecessor frozen surfaces (7 workflows + 8 milestone-audit MJS + 8 sidecar JSON; chain validators NOT included).
- coverage flip target: **15/15 Validated**; phases **5/5**.

**Strings (Path-A relabel sites):**
- milestone-audit version labels: lines 2, 4, 35, 79 (v1.10→v1.11; sidecar repoint at :79).
- workflow `name:` → `Audit Harness v1.11 Integrity`; "7th coexistence" → "8th".
- HARNESS const in apex → `'scripts/validation/v1.11-milestone-audit.mjs'`.
- commit messages: `docs(93-01): 93-CONVENTIONS.md — Phase 93 constants lock` / `feat(93-01): v1.11 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)` / `feat(93-02): v1.11 validators + V110 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)` / `docs(93-03): HARN-03 3-axis terminal re-audit results (artifact-only)` / `docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE`.
- lineage label: `phases 62→66→70→74→82→88→93, lineage v1.4→v1.11 — 9th entry`.

**PRESENCE targets (check-phase-89/90/91):**
- 89 → `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`
- 90 → `docs/l2-runbooks/30-macos-mdm-migration-failure.md`
- 91 → `docs/_glossary-macos.md`

**8 V-92-CROSSLINK needles** (confirm final 8 against 92-VERIFICATION.md:52–63; recommended set):
| ID | file | needle |
|----|------|--------|
| E1 | docs/index.md | `macos-lifecycle/01-psso-provisioning-walkthrough.md` |
| E2 | docs/index.md | `macos-lifecycle/02-mdm-migration-psso.md` |
| E3 | docs/index.md | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E4 | docs/common-issues.md | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E5 | docs/common-issues.md | `l2-runbooks/27-macos-sso-investigation.md` |
| E6 | docs/quick-ref-l2.md | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E7 | docs/quick-ref-l2.md | `#platform-sso-attestation-command` |
| E8 | docs/decision-trees/06-macos-triage.md | `../l2-runbooks/30-macos-mdm-migration-failure.md` |

**Axis-1 recipe constants:** clone `$env:TEMP\v1.11-audit-<rand8>`; `$rand` charset `[0-9a-z]` 8-char;
assert clone HEAD == source HEAD; run 6 fast non-apex (88,89,90,91,92 + harness --verbose + --self-test);
do NOT run check-phase-93 from Windows clone; `Remove-Item -Recurse -Force` + assert
`Get-ChildItem $env:TEMP -Filter "v1.11-audit-*" -Directory` count == 0.
**Axis-2:** `gh workflow run audit-harness-v1.11-integrity.yml --ref master`; pre-flight 3-part gate
(Atom 2 on origin/master + `gh auth status` + workflow `state: active`).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| (none) | — | — | All claims verified against the live tree via git/file:line/command output. The only discretionary item (exact 8 of the ~10 cross-link rows) is explicitly delegated to plan-phase by CONTEXT.md D-01 and flagged for confirmation against 92-VERIFICATION.md:52–63. |

## Sources

### Primary (HIGH confidence — all live-tree)
- `scripts/validation/check-phase-88.mjs`, `check-phase-87.mjs`, `check-phase-81.mjs` (full reads)
- `scripts/validation/_lib/frozen-at-close.mjs`, `regenerate-supervision-pins.mjs:432–446` (full / region reads)
- `scripts/validation/v1.10-milestone-audit.mjs` (grep + `--self-test` run + `:813–940` read)
- `scripts/validation/v1.10-audit-allowlist.json` (full read)
- `.github/workflows/audit-harness-v1.10-integrity.yml` (full read)
- `.planning/milestones/v1.10-phases/88-.../88-01-PLAN.md`, `88-03-AUDIT-RESULTS.md`, `88-04-PLAN.md`, `88-CONVENTIONS.md:262–306` (reads)
- `.planning/milestones/v1.10-MILESTONE-AUDIT.md`, `v1.10-DEFERRED-CLEANUP.md` (heading greps + lineage section read)
- `.planning/phases/92-navigation-hub-integration/92-VERIFICATION.md` (full read) + grep of the 4 nav-hub files
- `git log`/`git show`/`git rev-parse`/`ls`/`grep` command outputs (V110 confirm, frozen-surface counts, anchor SHA, harness-blindness)
- `93-CONTEXT.md`, `REQUIREMENTS.md`, `STATE.md` (full reads)

## Metadata
**Confidence breakdown:**
- Path-A sources / constants: HIGH — direct file:line + command output.
- Recipe / close-gate: HIGH — verbatim from the freshest (v1.10) precedent which executed successfully.
- 8 cross-link needles: HIGH on the needle strings (grepped live); MEDIUM on the exact 8-of-N selection (delegated to plan-phase per D-01).

**Research date:** 2026-06-25
**Valid until:** 2026-07-25 (stable tooling lineage; the only volatile value is the anchor SHA, re-captured at task time)
