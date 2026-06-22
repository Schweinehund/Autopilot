# Phase 82: Harness Lineage Bump + Terminal Re-Audit + Milestone Close — Research

**Researched:** 2026-06-22
**Domain:** Mechanical Path-A harness lineage bump (v1.8 → v1.9) + 3-axis terminal re-audit + milestone close
**Confidence:** HIGH — every claim below is grounded in actual file contents read this session and verified via `git`/`diff`. No training-knowledge guesses.

## Summary

This is a **HIGHLY MECHANICAL Path-A phase**. All four implementation decisions (D-01..D-04) are already locked in `82-CONTEXT.md` via adversarial review. This research does NOT re-decide them — it **verifies the exact structure of every Path-A source file** so the planner can write concrete, drop-in task instructions, and **flags every place the real source diverges from CONTEXT.md's assumptions**.

The headline finding: the v1.7→v1.8 milestone-audit transition changed **exactly 4 lines** (a pure relabel + sidecar repoint, same 979-line count). The same 4-line edit set applies v1.8→v1.9. All entry-state claims in CONTEXT.md are verified true: `frozen-at-close.mjs` has no V18; `check-phase-75..82.mjs` are all missing; V18 SHA = `2bd79d8` confirmed; predecessor frozen surfaces are byte-unchanged at HEAD; the 8 SSO-E edges are enumerated with exact source-file/anchor/link strings.

**Primary recommendation:** Plan the 4 atoms exactly as D-02 lays them out. For each Path-A copy, the planner should pin the *exact* source line numbers and the *exact* string substitutions documented below — there is no design freedom left, only precise transcription. Three real divergences from CONTEXT.md require planner attention (see `## Divergences`).

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions (D-01..D-04 — adversarial-review resolved; do NOT contradict)

- **D-01:** The 8 SSO-E1..E8 cross-link edges become **blocking `V-81-CROSSLINK-*` assertions inside net-new `check-phase-81.mjs`** — NOT a global C17. `v1.9-milestone-audit.mjs` stays a pristine verbatim Path-A copy (C1–C16, self-test 9/9). Hard-assert all 8 edges (no allowlist/sidecar — mirrors C16's empty `c16_missing_endpoint_exemptions: []`). CRLF-normalizing read + forward-slash substring check.
- **D-02:** **4 plans, 5 commits.** No dedicated scaffold plan (v1.9 has no VPP-01 corpus work). Plan 82-01 (conventions Wave-1 + Atom-1 Wave-2 = 2 commits); 82-02 (Atom 2, 1 commit); 82-03 (3-axis re-audit, artifact-only, 1 commit); 82-04 (close-gate, 1 commit).
- **D-03:** Exact Phase-74 replication, **full net-new cross-OS-applicable set = 10 validators** (`v1.9-milestone-audit.mjs` + `check-phase-74.mjs` continuity row + 8 net-new `check-phase-75..82.mjs`). ONE fresh sub-agent serves Axis 1 + Axis 3. Hard ordering gate: Atom 2 pushed to `origin/master` before Axis 2 dispatch. Carry `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` forward.
- **D-04:** ONE close-gate commit. **No Commit A. Single `V18` entry** (not V18 + V18_CLOSEGATE). V18 = `2bd79d8`. `readAtV18Close` convenience export. 4 PSSO-FUT items → `v1.9-DEFERRED-CLEANUP.md` (canonical `.planning/milestones/` artifact; cross-link the pre-existing `docs/v1.9-DEFERRED-CLEANUP.md`, do NOT delete it).

### Claude's Discretion (plan-phase author decides)
- `82-CONVENTIONS.md` content (freshness/SHA matrix + locked strings, mirror `74-CONVENTIONS.md`).
- Exact `$rand` charset (recommend `[0-9a-z]` 8-char) + temp-dir cleanup assertions in Axis-1 recipe.
- V-81-CROSSLINK assertion form (recommend substring class-signature, CRLF-normalized — confirm the 8 needles below).
- BASELINE_13 anchor (recommend known-PAST SHA, not the future close SHA).
- 9 vs 10 in cross-OS set (recommend 10 — include `check-phase-74.mjs` continuity row).

### Deferred Ideas (OUT OF SCOPE for Phase 82)
- Global blocking C17 category; chicken-and-egg Commit A; a second `V18_CLOSEGATE` entry; worktree-based execution; any `docs/*` corpus edits (tooling-only phase); re-opening v1.8 deferred stubs; Phase-77 Entra CBA / Phase-80 `app-sso diagnose` flags (resolved in-phase, not deferrals).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description (from REQUIREMENTS.md:57-60) | Research Support |
|----|------------------------------------------|------------------|
| SSOHARN-01 | `v1.9-milestone-audit.mjs` + `v1.9-audit-allowlist.json` Path-A copies (C1-C16 inherited) + BASELINE_13 in `regenerate-supervision-pins.mjs` (Atom 1, indivisible) | §Q1 (4-line edit set), §Q4 (allowlist), §Q6 (BASELINE), §Q5 (V18 in same atom) |
| SSOHARN-02 | Per-phase `check-phase-75..82.mjs` validators + `_lib/frozen-at-close.mjs` V18 entry + `readAtV18Close` (Atom 2, indivisible) | §Q2 (apex + non-apex templates), §Q3 (V-81-CROSSLINK), §Q5 (V18 entry) |
| SSOHARN-03 | `audit-harness-v1.9-integrity.yml` 6th coexistence workflow (predecessors byte-unchanged) | §Q7 (YAML job structure) |
| SSOHARN-04 | 3-axis terminal re-audit + `v1.9-MILESTONE-AUDIT.md` + `v1.9-DEFERRED-CLEANUP.md` + 4-doc traceability (27/27) | §Q9 (recipe), §Q8 (skeletons), §Q10 (predecessor diff) |

**Cumulative traceability:** REQUIREMENTS.md shows 23 v1.9 reqs `Complete` (PSSO/SSOMIG/SSORUN/SSOREF) + 4 SSOHARN `Pending` = **27 total**. The close-gate flips the 4 SSOHARN to Validated → 27/27.
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Milestone-audit harness (C1-C16) | Validation tooling (Node ESM) | — | Pure `fs.readFileSync` static analysis; no runtime services |
| Per-phase validators (check-phase-NN) | Validation tooling (Node ESM) | Git (frozen reads via `git show`) | Chain-replay + frozen-at-close milestone state assertions |
| CI coexistence workflow | GitHub Actions (Linux) | Node 20 | Cross-OS parity surface; Linux LF fidelity |
| Frozen-close SHA registry | `_lib/frozen-at-close.mjs` (Node ESM) | Git | Centralized `git show <SHA>:<path>` readers |
| 3-axis re-audit | Sub-agent (PowerShell, Windows) + GitHub Actions (Linux) | Git clone | Auditor independence: filesystem + OS + context |
| Milestone close docs | `.planning/milestones/` Markdown | 4-doc traceability | Audit record + requirement flip |

---

## Q1 — `v1.8-milestone-audit.mjs` → `v1.9-milestone-audit.mjs` (Path-A source) [VERIFIED]

**File:** `scripts/validation/v1.8-milestone-audit.mjs` — 979 lines, read in full.

### C-categories present (D-01 confirmed: C1–C16, NO C17)
The `checks` array (line 246) contains **15 entries** with IDs: **1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16**. **There is no C8** in the lineage — the runner prints `[id/checks.length]` so it reads `[16/15]` for the last check (15 checks, max id 16). The planner must NOT add a 16th check / C17; the verbatim copy keeps exactly these 15.

### Self-test (`--self-test`) structure — 9/9 PRESERVED
Lines 813–940. `if (SELF_TEST)` block runs **9 synthetic `selfAssert` tests** (Test 1–9):
- Test 1–2: C14 token-set membership (`c14Synth`)
- Test 3–4: C15 Intune-delegation banned-phrase + ABAUDIT exemption (`c15Synth`)
- Test 5–6: C16 endpoint exemption + sunset_phase (`c16Synth`)
- Test 7–9: `parsePlatformValue` compound / unknown-atom / single-atom

Final line 938: `'\nSelf-test: ' + selfPassed + ' passed, ' + selfFailed + ' failed\n'`. The 9/9 is **carried verbatim** — no v1.8/v1.9 string appears inside any self-test (they are content-agnostic synthetic fixtures). Nothing to change in the self-test block.

### EXACT lines carrying the version string — verified by `diff v1.7 vs v1.8`
The v1.7→v1.8 transition changed **exactly 4 lines** and nothing else (line count identical: 979 → 979). The same 4 edits apply v1.8→v1.9:

| Line | v1.8 current (the string to change) | v1.9 target |
|------|--------------------------------------|-------------|
| **2** | `// v1.8 Milestone Audit Harness (Path A copy of v1.7; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8; C1-C16 inherited verbatim)` | `// v1.9 Milestone Audit Harness (Path A copy of v1.8; lineage … → v1.8 → v1.9; C1-C16 inherited verbatim)` |
| **4** | `// Sidecar allow-list: scripts/validation/v1.8-audit-allowlist.json (v1.8 Path-A from v1.7 with c13_rotting_external reset for v1.8 per Phase 74 VPP-01 close-state)` | `…v1.9-audit-allowlist.json (v1.9 Path-A from v1.8 … per Phase 82 close-state)` |
| **35** | `// Usage: node scripts/validation/v1.8-milestone-audit.mjs [--verbose] [--self-test]` | `…v1.9-milestone-audit.mjs…` |
| **79** | `const raw = readFile('scripts/validation/v1.8-audit-allowlist.json');` | `…v1.9-audit-allowlist.json` **(load-bearing — this is the functional sidecar repoint)** |

**DIVERGENCE-1 (minor, flag for planner):** CONTEXT.md / canonical_refs say "Frozen-predecessor reproducibility anchor" comment changes. The actual v1.7→v1.8 diff did **NOT** touch line 5 (`// Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close`). It stayed pointing at v1.6/Phase 66 across the whole lineage. The planner may optionally bump line 5 to `v1.8-milestone-audit.mjs pinned at Phase 74 close` for hygiene, but Path-A fidelity says leave it (it was never bumped before). Line 90 (`appleBusinessDocPaths: … Apple Business v1.6 docs`) likewise was never bumped — leave it. **Only lines 2, 4, 35, 79 are load-bearing.** Anything more is a deviation from the proven 4-line template.

---

## Q2 — `check-phase-74.mjs` → `check-phase-82.mjs` (chain-apex) + non-apex template [VERIFIED]

### Chain-apex source: `check-phase-74.mjs` (222 lines, read in full)

**Constants to change for `check-phase-82.mjs`:**
- Line 41: `const HARNESS = 'scripts/validation/v1.8-milestone-audit.mjs';` → `v1.9-milestone-audit.mjs`
- Line 47: `const CHAIN_PHASES = [48,…,73];` → `[48,49,…,80,81]` (add 74,75,76,77,78,79,80,81; the array literally lists every integer 48..81)
- Line 50: `const CHAIN_SKIP = new Set([]);` → **unchanged, stays empty `new Set([])`** (D-03 / SC#2)

**`CHECK_PHASE_NESTED=1` child-spawn behavior (lines 124–159):**
- `const NESTED = process.env.CHECK_PHASE_NESTED === '1';` (line 124)
- For each CHAIN phase: if NESTED → returns `{pass:true, skipped:true}` (short-circuit, no recursive expansion). Otherwise spawns `node check-phase-NN.mjs` with `env: { ...process.env, CHECK_PHASE_NESTED: '1' }`.
- `isPeer = phaseNum >= 67` → peer validators get **600000ms** timeout, legacy <67 get **300000ms** (line 138–139). For check-phase-82, phases 75..81 are all peers (≥67) → 600s each.
- **This is the D-03 "standalone-row load-bearing" wedge:** a nested child surfaces only as `CHAIN-NN exits 0`, never a standalone PASS/FAIL/SKIP triplet.

**`_lib/frozen-at-close.mjs` consumption:** `check-phase-74.mjs` does **NOT** import `_lib/frozen-at-close.mjs` — its only frozen-ish read is the `HARNESS` subprocess and `CHAIN-NN` subprocesses. It uses inline `readFile` (CRLF-normalized) + `execFileSync('node', …)`. So check-phase-82 inherits the same: **no frozen-close import needed in the apex itself.** (The V18 entry is consumed only by validators that assert prior-milestone state — see DIVERGENCE-2.)

**Assertion classes in check-phase-74 (DIVERGENCE-2, IMPORTANT):**
- `V-74-VPP-01a` (lines 58–75) and `V-74-VPP-01b` (lines 83–103) are **VPP-01-specific** (v1.8 corpus-rename proof: `02-macos-pkg-dmg-pipeline.md` content-token count + sidecar `ci_2_vpp_location_token` resolved-key count). **v1.9 has NO corpus rename** → these two assertions have **no v1.9 equivalent**. The planner must decide what (if anything) replaces them in check-phase-82. Options: (a) drop them entirely (apex carries only AUDIT + CHAIN + AUDIT-HARNESS + SELF), or (b) repurpose the slot. **Recommendation:** drop the VPP assertions; the apex's job is chain-replay + harness-byte-unchanged + self-guard. This is a real authoring decision the Path-A copy cannot mechanically resolve.
- `V-74-AUDIT` (lines 106–117): heading-presence on `74-VERIFICATION.md`, SKIP-PASS until authored → repoint to `82-VERIFICATION.md` + `/Phase 82/i`.
- `V-74-CHAIN-{48..73}` → `V-82-CHAIN-{48..81}` (auto-generated from CHAIN_PHASES; 34 subprocesses).
- `V-74-AUDIT-HARNESS` (lines 162–181): `v1.8-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)` → repoint HARNESS const to `v1.9-milestone-audit.mjs`. Label says "predecessor-byte-unchanged" but for v1.9 the harness is NEW, not a predecessor — adjust wording.
- `V-74-SELF` (lines 184–192): asserts `CHAIN_PHASES` excludes 74 → assert excludes 82. (Note: check-phase-74's SELF only checks `CHAIN_PHASES.includes(74)`; check-phase-71's SELF *also* checks `CHAIN_SKIP.size !== 0` — the richer form. Recommend the planner use check-phase-71's SELF shape for 82, which enforces both invariants.)
- Console banner line 202 + runner loop lines 194–221: relabel `check-phase-74 -- Phase 74 …` → `check-phase-82 -- Phase 82 …`.

### Non-apex template: `check-phase-71.mjs` (290 lines, read in full)
**This is the clean template for the 7 net-new NON-apex validators (75..80, and the structural shell of 81).** Structure:
- Imports: `readFileSync, existsSync` (fs), `join` (path), `execFileSync` (child_process), `process`. CRLF-normalizing `readFile` (lines 35–39).
- `const HARNESS = 'scripts/validation/v1.7-milestone-audit.mjs';` → for 75..81 use `v1.9-milestone-audit.mjs`.
- `const CHAIN_PHASES = [48,…,70];` → each net-new validator's CHAIN_PHASES extends to its own predecessor (check-phase-75 → [48..74], …, check-phase-81 → [48..80]). **NOTE:** A non-apex validator in v1.8 (71/72/73) carried the FULL chain too — they are NOT lightweight. If the planner wants 75..80 to be *lightweight* (phase-deliverable assertions + SELF only, no chain), that's a divergence from the 71/72/73 precedent and must be a conscious decision. **Recommendation:** mirror 71's full structure (phase assertions + CHAIN + AUDIT + SELF) for fidelity, OR make 75..81 lightweight non-chain validators and let ONLY check-phase-82 carry the chain. The advisor's cross-OS recipe runs each standalone and diffs counts, so either works — but the count must be deterministic cross-OS. **Flag this as an open planning decision (see Open Questions).**
- Phase-deliverable assertions (V-71-FIX-01, etc., lines 78–182): for net-new 75..81 these become V-NN-* assertions specific to what each phase shipped. **For most of 75..80 there is no obvious deliverable to assert** (they shipped docs/corpus, which the milestone-audit C-checks already cover). The realistic shape: 75..80 carry a minimal SELF + CHAIN guard; 81 carries the V-81-CROSSLINK-* assertions (Q3).
- `V-71-CHAIN-NN` loop (lines 184–222), `V-71-AUDIT` (224–244), `V-71-SELF` (246–260) — **SELF checks BOTH `CHAIN_PHASES.includes(71)` AND `CHAIN_SKIP.size !== 0`** (the richer/preferred guard form).
- Runner loop lines 262–289 (identical pad/print pattern to apex).

---

## Q3 — `check-phase-81.mjs` V-81-CROSSLINK-* (D-01) + the 8 SSO-E needles [VERIFIED]

**Source for the 8 edges:** `.planning/phases/81-nav-hub-integration/81-CROSSLINK-CLOSURE.md` (read in full). All 8 edges confirmed PRESENT with file:line evidence. The exact **(source file → needle substring)** pairs for a substring-class V-81-CROSSLINK assertion (forward-slash, CRLF-normalized read):

| Edge | Source file (read this) | Substring needle to assert present |
|------|--------------------------|------------------------------------|
| E1 | `docs/admin-setup-macos/07-platform-sso-setup.md` | `../_glossary-macos.md#platform-sso` |
| E2 | `docs/_glossary-macos.md` | `admin-setup-macos/07-platform-sso-setup.md` |
| E3 | `docs/admin-setup-macos/07-platform-sso-setup.md` | `../reference/macos-capability-matrix.md#authentication` |
| E4 | `docs/reference/macos-capability-matrix.md` | `../admin-setup-macos/07-platform-sso-setup.md` |
| E5 | `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` | `../l2-runbooks/27-macos-sso-investigation.md` |
| E6 | `docs/l2-runbooks/27-macos-sso-investigation.md` | `../l1-runbooks/35-macos-sso-sign-in-failure.md` |
| E7 | `docs/admin-setup-macos/03-configuration-profiles.md` | `07-platform-sso-setup.md` (same-dir relative link) |
| E8 | `docs/macos-lifecycle/00-ade-lifecycle.md` | `../admin-setup-macos/07-platform-sso-setup.md` |

**NOTE on E7 needle:** `07-platform-sso-setup.md` is a substring of the E1/E3 source filename too, but E7's source file (`03-configuration-profiles.md`) is distinct, so per-file scoping keeps it unambiguous. E4 and E8 share the identical needle `../admin-setup-macos/07-platform-sso-setup.md` but live in different source files — fine.

**Assertion pattern to mirror:** `V-67-03/04` in `check-phase-67.mjs` (lines 117–159, read in full). V-67-03 reads N files, counts substring occurrences, asserts `>= threshold`; V-67-04 reads the sidecar JSON, asserts array length + per-entry key. The V-81-CROSSLINK assertion is structurally simpler — it asserts presence (not count) of one needle per source file. **C16's empty `c16_missing_endpoint_exemptions: []` (allowlist line 530) is the D-01-cited model** for "hard-assert, no sidecar."

**Drop-in pseudocode for V-81-CROSSLINK (mirrors V-67-03 read + C16 hard-assert):**
```javascript
// === V-81-CROSSLINK-01..08: 8 SSO-E edges hard-asserted (D-01; no allowlist) ===
const SSO_EDGES = [
  { id: 'E1', file: 'docs/admin-setup-macos/07-platform-sso-setup.md',     needle: '../_glossary-macos.md#platform-sso' },
  { id: 'E2', file: 'docs/_glossary-macos.md',                              needle: 'admin-setup-macos/07-platform-sso-setup.md' },
  { id: 'E3', file: 'docs/admin-setup-macos/07-platform-sso-setup.md',     needle: '../reference/macos-capability-matrix.md#authentication' },
  { id: 'E4', file: 'docs/reference/macos-capability-matrix.md',           needle: '../admin-setup-macos/07-platform-sso-setup.md' },
  { id: 'E5', file: 'docs/l1-runbooks/35-macos-sso-sign-in-failure.md',    needle: '../l2-runbooks/27-macos-sso-investigation.md' },
  { id: 'E6', file: 'docs/l2-runbooks/27-macos-sso-investigation.md',      needle: '../l1-runbooks/35-macos-sso-sign-in-failure.md' },
  { id: 'E7', file: 'docs/admin-setup-macos/03-configuration-profiles.md', needle: '07-platform-sso-setup.md' },
  { id: 'E8', file: 'docs/macos-lifecycle/00-ade-lifecycle.md',            needle: '../admin-setup-macos/07-platform-sso-setup.md' },
];
for (const e of SSO_EDGES) {
  checks.push({
    id: `CROSSLINK-${e.id}`,
    name: `V-81-CROSSLINK-${e.id}: ${e.file} contains SSO edge needle ${e.needle}`,
    run() {
      const c = readFile(e.file);              // readFile already CRLF-normalizes (.replace(/\r\n/g,'\n'))
      if (c === null) return { pass: false, detail: e.file + ' missing' };
      if (!c.includes(e.needle)) return { pass: false, detail: `${e.id} needle absent: ${e.needle}` };
      return { pass: true, detail: `${e.id} edge present` };
    }
  });
}
```
The existing `readFile` helper in check-phase-71/74 already does `.replace(/\r\n/g, '\n')`, so forward-slash needles are Windows-safe (no backslash hazard). This satisfies D-01's "CRLF-normalizing read + forward-slash substring, cross-OS-safe."

---

## Q4 — `v1.8-audit-allowlist.json` → `v1.9-audit-allowlist.json` (Path-A source) [VERIFIED]

**File:** `scripts/validation/v1.8-audit-allowlist.json` (531 lines, read in full). Top-level keys:
`schema_version` (`"1.1"`), `generated`, `phase`, `safetynet_exemptions`, `supervision_exemptions`, `cope_banned_phrases`, `c7_knox_allowlist`, `c9_exemptions`, `c11_ops_exemptions` (`[]`), `c13_broken_link_allowlist` (15 entries: 6 transient_external + 9 template_placeholder — **C13 asserts this exact count**), `c13_rotting_external`, `c16_missing_endpoint_exemptions` (`[]`).

**`c13_rotting_external` sub-structure:**
- `ci_1_abm_urls` — 4 entries, each `last_revalidated: "2026-05-26"`.
- `ci_2_vpp_location_token` — **10 entries** (6 v1.7-resolved `resolved_2026_05_26: true` + 4 Phase-74-resolved `resolved_2026_06_08: true`).
- `ci_3_managed_apple_id` — file/count tracking (deferred CI-3).
- `quarterly_audit` — `{ cadence: "0 8 1 1,4,7,10 *", scope, tool: "markdown-link-check", next_review: "2026-07-01" }`.

**What changes v1.8→v1.9 — verified by `diff v1.7 vs v1.8`:** the substantive diff was **only** `generated` (timestamp) and `phase` (label). The array reformat (single-line → pretty-printed) was cosmetic. All `c13_rotting_external` content carried forward; the v1.8 additions were the Phase-74 VPP resolutions.

For v1.9 (tooling-only, **no corpus rename**):
- `generated`: → a 2026-06 v1.9 timestamp.
- `phase`: → `"82-harness-lineage-bump-terminal-re-audit-milestone-close"`.
- `c13_rotting_external`: **carries forward verbatim** — there is no v1.9 VPP-style sweep adding new resolved entries. ("c13 reset for v1.9" in CONTEXT.md means the label/timestamp refresh + carry-forward, NOT a content wipe.)
- `quarterly_audit.next_review`: optionally bump (recommend `2026-07-01` → `2026-10-01` to reflect the quarterly cadence at v1.9 close; planner's discretion).
- `c13_broken_link_allowlist`: **must stay exactly 6 + 9 = 15** (C13 in the harness hard-asserts these counts at lines 670–677). Do not add/remove entries.

**DIVERGENCE-3 (flag):** v1.9 ships **new macOS SSO docs** (guides 07/08/09, runbooks 35/36/27, glossary section). If any of these contain a literal `SafetyNet`, bare `supervision`, COPE banned-phrase, or broken internal link, the C1/C2/C9/C13 checks (which scope `androidDocPaths()` / `docs/**`) could trip. **C11 scopes ALL `docs/**/*.md`** (line 580), and **C13's allowlist-count assertion is corpus-agnostic** — but C5 (Android frontmatter) and C1/C2 scope only `androidDocPaths()`, so macOS SSO docs are out of their scope. The planner should add a Wave-1 verification task: run `v1.8-milestone-audit.mjs` at current HEAD and confirm 15/15 PASS *before* the Path-A copy, so the v1.9 copy inherits a known-green corpus. (This is also the Q10 invariant check.)

---

## Q5 — `_lib/frozen-at-close.mjs`: V18 entry + `readAtV18Close` [VERIFIED]

**File:** `scripts/validation/_lib/frozen-at-close.mjs` (55 lines, read in full). **Confirmed: NO V18 today.**

`MILESTONE_CLOSE_SHAS` (lines 17–28) currently: `V141:'5c976ec'`, `V15:'ba2cbc0'`, `V16:'9d8877c'`, `V17:'aa6de68'`, `V17_CLOSEGATE:'4df3a16'`. Convenience exports (lines 50–54): `readAtV141Close`, `readAtV15Close`, `readAtV16Close`, `readAtV17Close`, `readAtV17CloseGate`.

**V18 SHA verified:** `git log -1 2bd79d8` → `2bd79d89440c6bd7b1f749dafcb29ed309e58295` = `docs(74-05): Phase 74 close-gate — v1.8 MILESTONE-AUDIT + DEFERRED-CLEANUP finalize + 4-doc traceability + v1.8 MILESTONE CLOSE`. **Matches CONTEXT.md exactly.** It is a known-PAST SHA (no chicken-and-egg).

**Drop-in edits (Atom 1):**
```javascript
// add to MILESTONE_CLOSE_SHAS object (after V17_CLOSEGATE line):
  V18:  '2bd79d8',  // Phase 74 Plan 74-05 — v1.8 milestone close-gate (docs(74-05); 4-doc traceability
                    // + v1.8 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize). Single entry per D-04
                    // (v1.8 closed in ONE commit; no separate V18_CLOSEGATE needed).
// add to convenience exports (after readAtV17CloseGate line):
export const readAtV18Close       = (p) => readAtClose('V18',          p);
```
Per D-04: **single `V18` entry, NOT V18 + V18_CLOSEGATE** (the V17/V17_CLOSEGATE split existed only because v1.7 closed in two commits; v1.8 closed in one, so V18 == close-gate). The 7-char short SHA `2bd79d8` matches the abbreviation style used for V15/V16/V17. `readAtClose` (line 39) does `git show <sha>:<path>` with CRLF normalization — V18 works identically.

**No Commit A (D-04 verified):** check-phase-82 (Path-A from check-phase-74) reads no future close SHA; it reads prior-milestone state only if it imports `readAtV18Close`. Since check-phase-74 does NOT import `_lib/frozen-at-close.mjs` at all, check-phase-82 need not either — but if any net-new validator asserts v1.8-close corpus state, it uses `readAtV18Close`. The V18 SHA already exists in history, so there is no placeholder to substitute.

---

## Q6 — `regenerate-supervision-pins.mjs`: BASELINE_12 → BASELINE_13 freshness comment [VERIFIED]

**File:** `scripts/validation/regenerate-supervision-pins.mjs`. The BASELINE comment region (lines 392–431) is a **stack of audit-trail comments**; the actual const array is named `BASELINE_9` (line 432) and is NOT renamed each milestone — only a new comment block is appended.

**BASELINE_12 region (lines 424–431, current tail):**
```javascript
// BASELINE_12 refreshed 2026-06-08 (Phase 74 Plan 74-02): closes BASELINE_11 v1.7 carry-over
// per HARNESS-09 contract (REQUIREMENTS.md + ROADMAP.md Phase 74 SC#1); v1.8 line positions verified
// against HEAD {atom_1_sha} (Phase 73 close-gate baseline + Phase 74 Plan 74-01 chain green).
// BASELINE_9 entries above remain unchanged -- Phase 74 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 74
// close and remain valid for the v1.8 corpus. Resolution path: BASELINE_13 will refresh at
// v1.9 close per the Path-A inheritance pattern (v1.4.1 -> BASELINE_8 -> v1.5 -> BASELINE_9
// -> v1.6 -> BASELINE_10 -> v1.7 -> BASELINE_11 -> v1.8 -> BASELINE_12).
```

**DIVERGENCE-4 (important precedent):** BASELINE_12 anchors to a **literal unfilled placeholder** `against HEAD {atom_1_sha}` — the Phase-74 atom-1 SHA was never substituted into this comment. So the "known-PAST SHA" anchor is a *documented audit-trail event*, and the prior milestone left the placeholder literal. **D-discretion recommends BASELINE_13 anchor to a real known-PAST SHA** (e.g., the Phase-81 close SHA or current HEAD `3007960`), NOT the future Phase-82 close SHA. Mirroring the past pattern, the planner may either (a) write a real SHA (cleaner — recommended), or (b) follow the literal-placeholder precedent. Either is Path-A-consistent; a real past SHA is strictly better.

**BASELINE_13 drop-in (append after line 431):**
```javascript
// BASELINE_13 refreshed 2026-06-22 (Phase 82 Plan 82-01): closes BASELINE_12 v1.8 carry-over
// per SSOHARN-01 contract (REQUIREMENTS.md:57 + ROADMAP.md Phase 82 SC#1); v1.9 line positions
// verified against HEAD 3007960 (Phase 81 close baseline + Phase 82 chain green).
// BASELINE_9 entries above remain unchanged -- Phase 82 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 82
// close and remain valid for the v1.9 corpus. Resolution path: BASELINE_14 will refresh at the
// next milestone close per the Path-A inheritance pattern (… -> v1.8 -> BASELINE_12 -> v1.9 -> BASELINE_13).
```
The `BASELINE_9` const array (line 432+) is **NOT touched** — v1.9 ships no Android-glossary line shifts (tooling-only, macOS SSO docs are out of `androidDocPaths()` scope). Comment-only change.

---

## Q7 — `audit-harness-v1.8-integrity.yml` → `audit-harness-v1.9-integrity.yml` (6th coexistence) [VERIFIED]

**File:** `.github/workflows/audit-harness-v1.8-integrity.yml` (201 lines, read in full). **Job DAG:**
`parse` → `path-match` → `harness-run` → fan-out to: `linux-chain-ubuntu-latest` (apex), `check-phase-71`, `check-phase-72`, `check-phase-73`, `check-phase-74`, `rotting-external-quarterly`, `pin-helper-advisory`.

**Inherited invariants (all confirmed present):**
- `name: Audit Harness v1.8 Integrity` (line 12) → `v1.9`.
- `on.pull_request.paths` (lines 16–22): `v1.8-*`, `check-phase-*.mjs`, the yml self-path, `REQUIREMENTS.md`, `v1.8-MILESTONE-AUDIT.md`, `v1.8-DEFERRED-CLEANUP.md` → repoint all `v1.8` → `v1.9`.
- `on.schedule` — **2 crons** (line 24 weekly `0 8 * * 1`; line 25 quarterly `0 8 1 1,4,7,10 *`). `workflow_dispatch` (line 26). Carry both crons.
- `linux-chain-ubuntu-latest` (lines 74–92): `timeout-minutes: 30`, `continue-on-error: false`, `git config --global core.autocrlf false` BEFORE checkout, `actions/checkout@v4 with fetch-depth: 0`, runs `check-phase-74.mjs --verbose` + `CHAIN_TIMING_LINUX` `::notice`. → repoint to `check-phase-82.mjs`.
- Per-validator jobs (lines 94–148): one job each for 71/72/73/74, each `timeout-minutes: 15`, `continue-on-error: false`, `fetch-depth: 0`, node 20. → **v1.9 ships 8 jobs: check-phase-75 through check-phase-82** (replacing the 71-74 set).
- `rotting-external-quarterly` (lines 150–182): `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'` — **this is the negative control** (SKIPs on workflow_dispatch). Installs `markdown-link-check@3.14.2` (pinned). Reads `v1.8-audit-allowlist.json` → repoint to `v1.9`.
- `pin-helper-advisory` (lines 184–200): `continue-on-error: true`, runs `regenerate-supervision-pins.mjs --report` + `--self-test`. **No version string** — carries forward unchanged.

**DIVERGENCE-5 (terminology, flag):** CONTEXT.md / additional_context referred to a `negative-control` job. The v1.8 file has **no job literally named "negative-control"** — the negative control IS `rotting-external-quarterly` (its cron-gated SKIP on dispatch is the negative-control evidence per the 74-04 audit-results). Planner should not author a separate "negative-control" job; reuse the quarterly job's skip behavior.

**Parse/path-match jobs (lines 29–61):** both reference `v1.8-audit-allowlist.json` / `v1.8-milestone-audit.mjs` in inline `node -e` / `grep` → repoint to v1.9. The `harness-run` job (lines 63–72) runs `v1.8-milestone-audit.mjs --verbose` → repoint.

**6th-coexistence confirmation:** `ls .github/workflows/audit-harness*.yml` → `audit-harness-integrity.yml` (v1.4, base — no suffix), `v1.5`, `v1.6`, `v1.7`, `v1.8`. v1.9 is the **6th**. Zero edits to the 5 predecessors (Q10 invariant). (Note: v1.4.1 shares the base `audit-harness-integrity.yml` — there is no separate v1.4.1 workflow file.)

---

## Q8 — `v1.8-MILESTONE-AUDIT.md` + `v1.8-DEFERRED-CLEANUP.md` skeletons [VERIFIED]

### `v1.8-MILESTONE-AUDIT.md` section skeleton (headings extracted)
```
# v1.8 Milestone Audit — Tooling Debt Closure + Chain-Resilience Hardening
## Executive Summary
## v1.8 Four-Pillar Closure Narrative
  ### Pillar A/B/C/D — (Phase 71/72/73/74)
## Auditor-Independence Verification (3-axis stacking — inherited from v1.7 Wave 4 precedent)
## Cross-OS PASS-Count EXACT MATCH (Axis 1 vs Axis 2)
## Methodology Highlights
## Discoveries Surfaced During Execution
  ### (VPP-01 correction; HARNESS-10 coexistence-count; quarterly_audit key; WINDOWS-CLONE-DEEPNEST-TIMEOUT-01)
## Mechanical Checks Detail (Command Verification)
## Requirements Traceability — 7/7 Pillar-D v1.8 Requirements Closed
## Cumulative v1.8 Requirements Traceability — 12/12 Total
## Cross-Phase Integration (4/4 Pillar Flows Clean)
## Deferred Items Summary
## v1.8 Audit Harness Lineage Phase 71→74
## Milestone Close
  ### Post-close hand-off to `/gsd-complete-milestone`
```
**For v1.9 adaptation:** v1.9 is NOT a "four-pillar" milestone — it is a content milestone (8 content phases 75–81 + close-gate 82). The planner adapts: `## v1.9 Phase Closure Narrative` (Phases 75–81 content + Phase 82 harness), `## Requirements Traceability — 4/4 SSOHARN Closed`, `## Cumulative v1.9 Requirements Traceability — 27/27 Total`. The 3-axis Auditor-Independence + Cross-OS EXACT MATCH sections import from `82-03-AUDIT-RESULTS.md` (Q9). The "byte-unchanged predecessor diff" empty-output block (audit line 337) is the Q10 evidence.

### `v1.8-DEFERRED-CLEANUP.md` skeleton — carried-forward sections to PRESERVE
```
# v1.8 Deferred Cleanup — v1.9+ Backlog
## ARCHIVE-UPSTREAM-01  (upstream PR regex fix)
## CHAIN-DEGRADED-AT-HEAD-01
## v1.1 line 164 `Edit N --` token-class (NEW DISCOVERY flag)
## HELPER-SPAWN-STDERR-01
## FROZEN-AWARE-ADOPTION-SWEEP-01
## EXEC-FAIL-DETAIL-EXTRACTION-01
## CI-3: Managed Apple ID Corpus Rename
## Multi-tenant Apple Business surfaces
## Apple Business Device API documentation
## Per-OU Conference Room Display deep-dive
## Account Holder lockout dedicated recovery runbook
## Apple School Manager (ASM) education-specific surfaces
## WINDOWS-CLONE-DEEPNEST-TIMEOUT-01  ← already present in v1.8; CARRY FORWARD (D-03)
## Cross-References
```
**For `v1.9-DEFERRED-CLEANUP.md` (Path-A):** PRESERVE all carried v1.8 sections above (they remain unresolved/indefinite) + **ADD 4 new PSSO-FUT sections**:
- **FUT-01** `NewUserAuthorizationMode` key verification — source Phase 77 (PSSO-11 / D3=B); trigger: verify MDM plist key vs Settings Catalog schema.
- **FUT-02** Graph API Platform Credential — source v1.9 scoping (REQ 71,85); trigger: programmatic demand / Graph GA.
- **FUT-03** Multi-tenant PSSO — source v1.9 scoping (REQ 72,84); trigger: multi-tenant deployment demand.
- **FUT-04** Kerberos deep-dive — source Phase 78 (SSOMIG-04); trigger: Kerberos config demand → new guide 10.
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 carries forward (still unresolved; chain now deeper [48..81]).
- **Cross-link** the pre-existing `docs/v1.9-DEFERRED-CLEANUP.md` (PSSO-FUT-01 only, from Phase 77 `bba11f6`) in `## Cross-References` — **do NOT delete or overwrite it** (D-04 discovery). The `.planning/milestones/` artifact is the canonical one.

Result: ~14–16 sections (12 carried v1.8 + 4 new PSSO-FUT, some may merge) — matches CONTEXT.md's ~14–16 estimate.

---

## Q9 — 3-axis re-audit recipe (D-03) [VERIFIED]

**Source:** `74-04-AUDIT-RESULTS.md` (113 lines) + `phase82-D03-advisor.md` Axis-1 PowerShell skeleton (read in full).

### Artifact frontmatter shape (from 74-04)
```yaml
phase: 82-harness-lineage-bump-terminal-re-audit-milestone-close
plan: 03
requirement: SSOHARN-04
audit_method: 3-axis terminal re-audit (D-03 fresh-clone + fresh sub-agent + cross-OS Linux GHA)
source_head_sha: <full HEAD SHA at audit time>
clone_path_pattern: "$env:TEMP\\v1.9-audit-<rand8>"
gha_workflow_run_url: <run URL>
gha_conclusion: success
cross_os_exact_match: true
atom_1_sha: <82-01 Atom-1 SHA>
atom_2_sha: <82-02 Atom-2 SHA>
date: 2026-06-22
```

### Cross-OS-applicable set = 10 (D-03 LOCKED)
`v1.9-milestone-audit.mjs` (row 1, `--self-test` folded in) + `check-phase-74.mjs` (row 2, prior-apex continuity) + `check-phase-75..82.mjs` (rows 3–10, net-new). **Exclusions:** `pin-helper-advisory` (CI-only advisory), `rotting-external-quarterly` (cron-only SKIP = negative control), harness `--self-test` (folded into row 1), inherited chain 48..73 (covered transitively by apex).

### Axis-1 PowerShell recipe skeleton (drop-in, from D03 advisor)
```powershell
$rand = -join ((48..57)+(97..122) | Get-Random -Count 8 | ForEach-Object {[char]$_})   # [0-9a-z] 8-char
$auditPath = Join-Path $env:TEMP "v1.9-audit-$rand"
$mainHeadSha = (git -C "D:\claude\Autopilot" rev-parse HEAD).Trim()
git clone --no-hardlinks "D:\claude\Autopilot" $auditPath                 # NOT a worktree (use_worktrees:false OK)
$cloneHeadSha = (git -C $auditPath rev-parse HEAD).Trim()
if ($mainHeadSha -ne $cloneHeadSha) { throw "HEAD mismatch: $mainHeadSha != $cloneHeadSha" }
Push-Location $auditPath
$validators = @(
  "scripts/validation/v1.9-milestone-audit.mjs", "scripts/validation/check-phase-74.mjs",
  "scripts/validation/check-phase-75.mjs","check-phase-76.mjs","check-phase-77.mjs",
  "check-phase-78.mjs","check-phase-79.mjs","check-phase-80.mjs","check-phase-81.mjs",
  "scripts/validation/check-phase-82.mjs"          # apex LAST (cold-clone timeout risk)
)
# run each: $out = & node $v 2>&1; $code = $LASTEXITCODE; parse "Result: N PASS / M FAIL / K SKIP"
Pop-Location
Remove-Item -Recurse -Force $auditPath
$orphans = @(Get-ChildItem $env:TEMP -Filter "v1.9-audit-*" -Directory -ErrorAction SilentlyContinue).Count
if ($orphans -ne 0) { throw "Orphan temp clones remain: $orphans" }
```

### Axis-2 cross-OS gh command
```bash
gh workflow run audit-harness-v1.9-integrity.yml --ref master
gh run list --workflow=audit-harness-v1.9-integrity.yml --limit 1
gh run view <RUN_ID>
```

### HARD ordering gate (Atom 2 pushed before Axis 2 — checkpoint:human-verify)
```bash
git log origin/master --oneline -1                          # must show Atom-2 SHA
gh auth status                                              # Schweinehund, active:true
gh workflow list | grep audit-harness-v1.9                 # state: active
```
If absent from origin/master, the workflow's check-phase-75..82 jobs **FAIL (not skip)** — `node: cannot find module`. Phase 74 precedent: Atom 2 `407ba89` pushed before dispatch.

### WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 carry-forward (WORSE at Phase 82)
Phase 74's cold-clone apex (`check-phase-74`, chain [48..73]) spuriously truncated at the deepest legacy guard (`check-phase-66` has no NESTED short-circuit → O(n²) cold-subprocess cascade near the 300s timeout). **check-phase-82's chain [48..81] is +8 deeper → strictly worse.** Mitigation (Phase 74's adopted resolution): take the **9 non-apex validator counts from the standalone runs** (fast, clean), and treat the **apex EXACT-MATCH source as warm-main-tree value cross-checked against Linux GHA** (the GHA apex job runs on a warm checkout, fetch-depth:0 — authoritative). Do NOT rely on a cold-clone apex count.

### Cross-OS EXACT MATCH table format (from 74-04)
Per validator: `PASS / FAIL / SKIP` Windows column vs Linux column, FAIL=0 across the board, `✅ EXACT` per row. 10 rows for v1.9. Excluded rows listed with reasons below the table.

---

## Q10 — Predecessor-byte-unchanged invariant [VERIFIED]

**Frozen surfaces (all confirmed present at HEAD `3007960`):**
- Workflow YAMLs (5): `audit-harness-integrity.yml` (v1.4 base), `audit-harness-v1.5-integrity.yml`, `v1.6`, `v1.7`, `v1.8`.
- Milestone-audit MJS (6): `v1.4`, `v1.4.1`, `v1.5`, `v1.6`, `v1.7`, `v1.8`-milestone-audit.mjs.
- Sidecar JSONs (6): `v1.4`, `v1.4.1`, `v1.5`, `v1.6`, `v1.7`, `v1.8`-audit-allowlist.json.
- (Chain validators `check-phase-{48..81}.mjs` are NOT in the invariant.)

**The hard-gate command (verified to work, exit 0 / empty on HEAD-vs-HEAD test):**
```bash
git diff <pre-Phase-82-SHA> HEAD -- \
  '.github/workflows/audit-harness-integrity.yml' \
  '.github/workflows/audit-harness-v1.5-integrity.yml' \
  '.github/workflows/audit-harness-v1.6-integrity.yml' \
  '.github/workflows/audit-harness-v1.7-integrity.yml' \
  '.github/workflows/audit-harness-v1.8-integrity.yml' \
  'scripts/validation/v1.4-milestone-audit.mjs' \
  'scripts/validation/v1.4.1-milestone-audit.mjs' \
  'scripts/validation/v1.5-milestone-audit.mjs' \
  'scripts/validation/v1.6-milestone-audit.mjs' \
  'scripts/validation/v1.7-milestone-audit.mjs' \
  'scripts/validation/v1.8-milestone-audit.mjs' \
  'scripts/validation/v1.4-audit-allowlist.json' \
  'scripts/validation/v1.4.1-audit-allowlist.json' \
  'scripts/validation/v1.5-audit-allowlist.json' \
  'scripts/validation/v1.6-audit-allowlist.json' \
  'scripts/validation/v1.7-audit-allowlist.json' \
  'scripts/validation/v1.8-audit-allowlist.json'
# empty output == invariant holds
```
**Pre-Phase-82 anchor SHA = `3007960`** (`docs(state): record phase 82 context session`) — the current HEAD, suitable as `<pre-Phase-82-SHA>` for the close-gate diff.

**Close-gate literal-placeholder recovery (D-04):** the close commit's `{phase_82_close_SHA}` self-reference is recoverable via:
```bash
git log --all --grep="82-04" --grep="close-gate" --all-match -1 --format=%H
```

---

## Divergences (real risks the planner must resolve)

| # | Divergence | Where | Resolution for planner |
|---|------------|-------|------------------------|
| 1 | Milestone-audit "frozen-predecessor anchor" comment (line 5) + "Apple Business v1.6 docs" (line 90) were **never bumped** in prior lineage hops. CONTEXT implies they change. | Q1 | Path-A fidelity = leave them. Only **4 lines (2, 4, 35, 79)** are load-bearing. Document this so the plan-checker doesn't flag the un-bumped comment as an error. |
| 2 | `check-phase-74.mjs` carries **VPP-01-specific** `V-74-VPP-01a/b` assertions. v1.9 has **NO corpus rename** → no v1.9 equivalent. | Q2 | The apex Path-A copy cannot mechanically keep these. **Decide:** drop the 2 VPP assertions in check-phase-82 (recommended), so the apex = AUDIT + CHAIN(48..81) + AUDIT-HARNESS + SELF only. |
| 3 | "c13 reset for v1.9" — the real v1.7→v1.8 diff shows c13_rotting_external **carried forward**; only `generated`/`phase` changed. | Q4 | "Reset" = label/timestamp refresh + carry-forward, **not** a content wipe. Keep `c13_broken_link_allowlist` at exactly 15 (C13 hard-asserts 6+9). |
| 4 | BASELINE_12 anchors to a **literal unfilled** `{atom_1_sha}` placeholder. | Q6 | Recommend BASELINE_13 use a **real known-PAST SHA** (`3007960` or Phase-81 close), strictly better than the placeholder precedent. |
| 5 | No job literally named "negative-control" exists in the v1.8 YAML. | Q7 | The negative control IS `rotting-external-quarterly` (cron-gated SKIP on dispatch). Do not author a new job. |
| 6 | Non-apex validators 71/72/73 carry the **FULL chain** + phase-deliverable assertions; net-new 75..80 have **no obvious deliverable to assert** (they shipped docs). | Q2 | Decide: (a) mirror 71's full chain+SELF for 75..81, or (b) make 75..80 lightweight (SELF + minimal assertion, no chain), with only 81 carrying V-81-CROSSLINK and only 82 carrying the chain. Either is cross-OS-deterministic. **Flag as open decision.** |

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Version-string edits in milestone-audit | Manual hunt-and-replace across the file | The verified 4-line edit set (lines 2, 4, 35, 79) | The v1.7→v1.8 diff proves these are the ONLY load-bearing lines; touching more is a deviation |
| Frozen milestone reads | New `git show` wrappers | `readAtV18Close` from `_lib/frozen-at-close.mjs` | RETRO-02 centralized this; CRLF-normalized, hardened stdio |
| CRLF-safe cross-link check | Custom path-normalizer | Existing `readFile` (`.replace(/\r\n/g,'\n')`) + forward-slash needle | Already Windows-safe; no backslash hazard |
| Cold-clone apex count | Re-run apex on cold clone | Warm-tree apex value × Linux GHA cross-check | WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 makes cold-clone apex unreliable |
| Negative-control CI job | A new job | `rotting-external-quarterly` cron-gated SKIP | Its dispatch SKIP IS the negative control |

---

## Common Pitfalls

### Pitfall 1: Bumping more than 4 lines in milestone-audit
**What goes wrong:** Touching comment lines 5/90 or self-test strings inflates the diff and breaks Path-A "verbatim C1-C16" fidelity. **Avoid:** edit only lines 2, 4, 35, 79. **Warning sign:** `diff v1.8 v1.9` shows >4 changed lines (excluding the sidecar JSON).

### Pitfall 2: Adding a C17 / 16th check
**What goes wrong:** D-01 explicitly routes the 8 edges to check-phase-81, NOT a new C-category. Adding C17 breaks self-test 9/9 and the verbatim lineage. **Avoid:** the 8 edges live ONLY in check-phase-81 as V-81-CROSSLINK-*.

### Pitfall 3: Dispatching Axis 2 before Atom 2 is on origin/master
**What goes wrong:** the v1.9 workflow's check-phase-75..82 jobs FAIL (`cannot find module`) — red run, false negative. **Avoid:** the 3-part blocking pre-flight gate (checkpoint:human-verify).

### Pitfall 4: Two V18 entries
**What goes wrong:** a `V18_CLOSEGATE` export is dead/misleading (v1.8 closed in ONE commit, atom == close-gate). **Avoid:** single `V18` entry per D-04.

### Pitfall 5: Deleting `docs/v1.9-DEFERRED-CLEANUP.md`
**What goes wrong:** Phase 77 (`bba11f6`) already shipped that file (PSSO-FUT-01). Overwriting/deleting it loses Phase-77 content. **Avoid:** author the canonical `.planning/milestones/` artifact + cross-link the docs/ file.

---

## Validation Architecture

> nyquist_validation: the validators ARE the test framework for this phase.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node ESM validators (`scripts/validation/*.mjs`) + GitHub Actions |
| Config file | none — validators are self-contained `node` scripts |
| Quick run command | `node scripts/validation/v1.9-milestone-audit.mjs --self-test` (9/9) |
| Per-validator | `node scripts/validation/check-phase-NN.mjs` |
| Full apex | `node scripts/validation/check-phase-82.mjs --verbose` (chain 48..81) |
| Cross-OS | `gh workflow run audit-harness-v1.9-integrity.yml --ref master` |

### Phase Requirements → Test Map
| Req | Behavior | Test | Command |
|-----|----------|------|---------|
| SSOHARN-01 | Harness 15/15 + self-test 9/9 | unit | `node scripts/validation/v1.9-milestone-audit.mjs --verbose && … --self-test` |
| SSOHARN-01 | V18 + readAtV18Close exist | unit | `node -e "import('./scripts/validation/_lib/frozen-at-close.mjs').then(m=>console.log(m.readAtV18Close))"` |
| SSOHARN-02 | check-phase-82 apex green, CHAIN_PHASES=[48..81], CHAIN_SKIP=∅ | integration | `node scripts/validation/check-phase-82.mjs --verbose` |
| SSOHARN-02 | V-81-CROSSLINK 8/8 | unit | `node scripts/validation/check-phase-81.mjs` |
| SSOHARN-03 | 6th workflow valid, predecessors byte-unchanged | integration | the Q10 `git diff` (empty) + `gh workflow run …` |
| SSOHARN-04 | cross-OS EXACT MATCH 10/10 | e2e | Axis-1 PowerShell + Axis-2 GHA |

### Wave 0 Gaps
- [ ] `scripts/validation/v1.9-milestone-audit.mjs` — net-new (Atom 1)
- [ ] `scripts/validation/v1.9-audit-allowlist.json` — net-new (Atom 1)
- [ ] `scripts/validation/check-phase-75..82.mjs` — 8 net-new (Atom 2)
- [ ] `.github/workflows/audit-harness-v1.9-integrity.yml` — net-new (Atom 2)
- [ ] Wave-1 precondition: confirm `v1.8-milestone-audit.mjs` is 15/15 PASS at HEAD before Path-A copy (inherit a green corpus)

---

## Security Domain

> `security_enforcement` default-enabled. This phase touches no auth/crypto/input surfaces — it is validation tooling + Markdown docs.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V5 Input Validation | partial | Validators use `execFileSync` (arg-array, not shell-string) — no injection; JSON parsed with try/catch degradation |
| V6 Cryptography | no | — |
| V2/V3/V4 (authn/session/access) | no | — |

**Threat note:** the only external command surfaces are `git show`/`git clone`/`node` via `execFileSync` (arg-array form, no shell interpolation — safe) and the CI `markdown-link-check@3.14.2` (pinned). No new external packages are installed by this phase → `## Package Legitimacy Audit` is N/A (no `npm install` in any Phase-82 task; `markdown-link-check@3.14.2` is pre-existing in the inherited workflow).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| node | all validators | ✓ (assumed — repo runs Node ESM validators throughout v1.4–v1.8) | 20 (CI pins node 20) | — |
| git | frozen reads, Axis-1 clone, Q10 diff | ✓ (repo is git) | — | — |
| gh CLI | Axis-2 dispatch | needs `gh auth status` = active (Schweinehund) | — | blocks Axis 2 — checkpoint:human-verify gate |
| PowerShell | Axis-1 recipe | ✓ (Windows host) | — | — |
| markdown-link-check | CI quarterly job only | CI-installed (`@3.14.2`) | 3.14.2 | not run locally |

**Blocking:** `gh` auth must be active before Axis 2 — handled by the D-03 ordering-gate checkpoint.

---

## State of the Art

| Old Approach | Current Approach | When | Impact |
|--------------|------------------|------|--------|
| Inline `readRequirementsAtV15Close()` per validator | Centralized `_lib/frozen-at-close.mjs` (RETRO-02, `a85da77`) | Phase 73 | V18 added centrally; no per-validator placeholder substitution |
| Two-commit close (v1.7: V17 + V17_CLOSEGATE) | Single-commit close (v1.8: V18 only) | Phase 74 | D-04: one V18 entry, no Commit A |
| Cold-clone apex re-run for counts | Warm-tree apex × Linux GHA | Phase 74 discovery | WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 mitigation |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `node` is available on the host at v20-compatible version | Environment | LOW — entire v1.4–v1.8 lineage runs Node validators; if absent, ALL validators fail uniformly (caught immediately) |
| A2 | macOS SSO docs (guides 07/08/09, runbooks 35/36/27) contain no `SafetyNet`/bare-`supervision`/COPE/broken-link that would trip C1/C2/C9/C13 | Q4 / DIVERGENCE-3 | LOW-MED — mitigated by the Wave-1 "run v1.8 harness at HEAD, confirm 15/15" precondition task; if it trips, the corpus needs a fix BEFORE the Path-A copy |
| A3 | `quarterly_audit.next_review` bump is cosmetic (planner discretion) | Q4 | LOW — no validator asserts this value |

**No package installs, no compliance/retention/security-standard claims** — the assumptions above are operational only.

---

## Open Questions

1. **check-phase-82 apex — what replaces V-74-VPP-01a/b?**
   - Known: v1.9 has no corpus rename; the 2 VPP assertions have no v1.9 analog.
   - Unclear: drop entirely vs repurpose.
   - Recommendation: **drop** — apex = AUDIT + CHAIN(48..81) + AUDIT-HARNESS + SELF. (DIVERGENCE-2.)

2. **Net-new 75..80 — full-chain or lightweight?**
   - Known: 71/72/73 precedent carried full chain + deliverable assertions; 75..80 have no obvious code deliverable to assert.
   - Unclear: mirror 71 (full chain each) vs lightweight (SELF + minimal, chain only in 82).
   - Recommendation: lightweight 75..80 (SELF + a phase-presence assertion), V-81-CROSSLINK in 81, full chain only in apex 82 — minimizes O(n²) cold-clone cost and keeps counts deterministic. **Planner decides.** (DIVERGENCE-6.)

3. **BASELINE_13 anchor SHA** — recommend `3007960` (current HEAD / Phase-81 close baseline), a real known-PAST SHA. (DIVERGENCE-4.)

---

## Sources

### Primary (HIGH — read in full this session)
- `scripts/validation/v1.8-milestone-audit.mjs` (979 lines) — C1-C16, self-test 9/9, version-string lines
- `scripts/validation/check-phase-74.mjs` (222) — chain-apex template, NESTED behavior
- `scripts/validation/check-phase-71.mjs` (290) — non-apex template, richer SELF guard
- `scripts/validation/check-phase-67.mjs` (lines 1-60, 100-169) — frozen-read helpers, V-67-03/04 pattern
- `scripts/validation/v1.8-audit-allowlist.json` (531) — full sidecar structure
- `scripts/validation/_lib/frozen-at-close.mjs` (55) — MILESTONE_CLOSE_SHAS, no V18, readAtClose
- `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE region lines 389-461)
- `.github/workflows/audit-harness-v1.8-integrity.yml` (201) — job DAG, invariants
- `.planning/phases/81-nav-hub-integration/81-CROSSLINK-CLOSURE.md` (141) — 8 SSO-E edges
- `.planning/milestones/v1.8-phases/74-…/74-04-AUDIT-RESULTS.md` (113) — 3-axis recipe + EXACT MATCH format
- `.planning/milestones/v1.8-MILESTONE-AUDIT.md` (headings) + `v1.8-DEFERRED-CLEANUP.md` (headings)
- `.claude/tmp/phase82-D03-advisor.md` (221) — Axis-1 recipe, ordering gate, exclusions
- `82-CONTEXT.md`, `REQUIREMENTS.md`, `ROADMAP.md` (Phase 82 §545-557), `STATE.md`

### Verified via tool (git/diff)
- V18 SHA `2bd79d89440…` = `docs(74-05)` close-gate — `git log -1 2bd79d8`
- v1.7→v1.8 milestone-audit diff = exactly 4 lines (2,4,35,79); 979→979
- v1.7→v1.8 sidecar diff = `generated`+`phase` only (c13 carried forward)
- Predecessor-byte-unchanged diff command = exit 0 / empty (HEAD-vs-HEAD test)
- check-phase-75..82.mjs ALL MISSING; pre-Phase-82 HEAD = `3007960`

## Metadata

**Confidence breakdown:**
- Path-A edit specifics (Q1-Q7): HIGH — verified against actual file contents + git diffs.
- Divergences: HIGH — directly observed in source, not inferred.
- 3-axis recipe (Q9): HIGH — copied from proven Phase-74 artifact + locked D-03 advisor.
- Open decisions (apex VPP slot, 75..80 chain depth): MEDIUM — Path-A source diverges; planner must choose. Recommendations given.

**Research date:** 2026-06-22
**Valid until:** stable until Phase 82 execution (no fast-moving external deps; all internal-repo facts).

## RESEARCH COMPLETE

HIGH confidence — every Path-A edit is grounded in actual file contents and git diffs; the v1.7→v1.8 milestone-audit transition is verified to be exactly 4 lines, the V18 SHA `2bd79d8` and the 8 SSO-E needles are exact, and 6 real divergences from CONTEXT.md's assumptions are flagged for the planner to resolve (most consequentially: the apex VPP-assertion slot has no v1.9 analog, and "c13 reset" means label-refresh + carry-forward, not a content wipe).
