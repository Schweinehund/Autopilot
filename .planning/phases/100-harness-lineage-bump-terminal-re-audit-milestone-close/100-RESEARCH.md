# Phase 100: Harness Lineage Bump + Terminal Re-Audit + Milestone Close — Research

**Researched:** 2026-06-29
**Domain:** Audit harness tooling / validator chain / milestone close
**Confidence:** HIGH — all claims sourced from the live codebase and locked CONTEXT.md decisions

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 (GA1):** check-phase-96 needles derived inline from 96-CONTEXT + committed edits. NO retroactive 96-NEEDLE-SPEC.md. Refinements: needle ACC-01 at lines 309/319 (NOT pre-existing line-326 phrase); add unique ACC-04 token at runbook 15:30; needle GLOS-01 three URLs; assert bare `### Kandji-Iru` heading intact; assert removed VPP Glossary Terms Used row stays removed; do NOT needle `#vpp` definition.
- **D-02 (GA2):** v1.13-DEFERRED-CLEANUP.md scope — DROP GLOSSARY-IRU-URL-FRESHNESS-01 (resolved GLOS-01 Phase 96) + WR-02 (fixed Phase 99 `5d6ee80`); CARRY WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 + MTPSSO-01/02/03 / PSSO-FUT-03 + KRBFUT-01/02 + all still-open v1.12 items verbatim; ADD docs/index.md:108 stale-count + WR-01 (quick-ref-l1.md:101) + IN-01 (common-issues.md:242-247). WR-01 and IN-01 are docs-content fixes out of Phase-100 tooling/close-only scope.
- **D-03 (GA3):** CHAIN_SKIP = new Set([]) — never add entries (V-SELF hard-assert). GA3-C (force-green via CHAIN_SKIP) DISQUALIFIED. Chain is NOT RED; no fresh chain-health re-pass needed. CHAIN_PHASES=[48..99] in check-phase-100 (NOT [48..100] — roadmap shorthand is milestone range; [48..N-1] invariant). Linux GHA authoritative for BOTH chain validators; WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..99] carries forward.
- **D-04 (GA4):** Windows Axis-1 runs leaf validators only (v1.13-audit + check-phase-96..99 non-chain). GA4-B (bounded-concurrency rewrite) rejected — bloats Atom 2. GA4-C (drop Windows axis) rejected — regresses to 2-axis. check-phase-66 timeout = 60s external-`timeout` artifact; standalone 28/0/0; document in MILESTONE-AUDIT with prior-misclassification caveat; do NOT fix.

### Claude's Discretion
- Exact stable-token strings for each check-phase-96 needle (subject to D-01 land-not-preexisting + uniqueness + guardrail rules).
- Precise V112 SHA (resolved below — see §Frozen-at-Close V-Pin Ladder).
- BASELINE_17 value (location and format resolved below).
- DEFERRED-CLEANUP prose/section structure (mirror v1.12).

### Deferred Ideas (OUT OF SCOPE)
- Resolution of WR-01 / IN-01 / docs/index.md:108 — docs-content fixes, route to v1.13-DEFERRED-CLEANUP only.
- O(n²) chain-runner subprocess-caching remediation for WINDOWS-CLONE-DEEPNEST-TIMEOUT-01.
- Multi-tenant PSSO (MTPSSO/PSSO-FUT-03), KRBFUT-01/02 resolution.
- ANY docs/* corpus edit.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-01 | v1.13-milestone-audit.mjs + v1.13-audit-allowlist.json + BASELINE_17 comment — one indivisible Atom 1 commit | §Atom 1 Delta Map |
| HARN-02 | check-phase-96..100.mjs + frozen-at-close.mjs V112 pin + audit-harness-v1.13-integrity.yml — one indivisible Atom 2 commit | §Atom 2 Contents |
| HARN-03 | 3-axis terminal re-audit (fresh clone + cross-OS GHA + fresh sub-agent; cross-OS EXACT MATCH) + milestone close (14/14 Validated) | §3-Axis Re-Audit + §Close-Gate |

</phase_requirements>

---

## Summary

Phase 100 is the 11th Path-A audit-harness lineage bump and the v1.13 milestone close gate. All four HOW decisions are locked via adversarial review. The phase delivers three indivisible units: Atom 1 (harness relabel + sidecar + BASELINE_17 freshness comment), Atom 2 (five per-phase validators + V112 frozen pin + 10th CI coexistence workflow), and a single close-gate commit that authors the milestone artifacts and flips 14/14 requirements to Validated.

The work is tooling-only. No `docs/*` corpus edits. Predecessors v1.4–v1.12 stay byte-unchanged. The chain at depth [48..99] (52 entries) is FULLY GREEN on Linux GHA — the WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 is an honest-accounting known non-blocker documented in DEFERRED-CLEANUP and the MILESTONE-AUDIT with the prior-misclassification caveat.

**Primary recommendation:** Copy check-phase-95.mjs as the apex template; copy v1.12-milestone-audit.mjs with 4-line relabel; copy v1.12-audit-allowlist.json repointed to phase 100; append V112 entry to frozen-at-close.mjs; clone the v1.12 CI workflow with v1.13 substitutions and five new per-phase validator jobs; author five lightweight content/presence validators (96–99) plus the chain-apex (100). Follow v1.12 Phase 95 exactly.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Harness lineage (Atom 1) | `scripts/validation/` | `scripts/validation/regenerate-supervision-pins.mjs` | Audit script + sidecar live in validation/; BASELINE comment lives in regenerate-supervision-pins.mjs |
| Per-phase validators (Atom 2) | `scripts/validation/check-phase-NN.mjs` | `scripts/validation/_lib/` | Validators own chain logic; frozen-at-close._lib centralizes SHA reads |
| CI coexistence (Atom 2) | `.github/workflows/audit-harness-v1.13-integrity.yml` | — | 10th parallel workflow; path-filter scoped to v1.13 surfaces |
| V112 frozen pin (Atom 2) | `scripts/validation/_lib/frozen-at-close.mjs` | — | Centralized milestone-close SHA ladder |
| Terminal re-audit (HARN-03) | Executor agent + GHA | Windows fresh-clone Axis 1 | Axis 2 (Linux GHA) authoritative for both chain validators |
| Close-gate artifacts | `.planning/milestones/` | `.planning/{PROJECT,ROADMAP,STATE,REQUIREMENTS}.md` | Milestone docs + 4-doc traceability flip in one commit |

---

## Atom 1 Delta Map (HARN-01) [VERIFIED: codebase read]

### Files to Create/Modify

| File | Action | What Changes |
|------|--------|--------------|
| `scripts/validation/v1.13-milestone-audit.mjs` | CREATE | 4-line relabel of v1.12 (lines 2/4/35/79); C1-C16 verbatim |
| `scripts/validation/v1.13-audit-allowlist.json` | CREATE | Path-A copy of v1.12 sidecar; repoint `phase` field to 100 |
| `scripts/validation/regenerate-supervision-pins.mjs` | EDIT | Insert BASELINE_17 comment block after line 459 |

### Exact 4-Line Relabel for v1.13-milestone-audit.mjs

Source: `scripts/validation/v1.12-milestone-audit.mjs` [VERIFIED: codebase read]

| Line | v1.12 content | v1.13 replacement |
|------|--------------|-------------------|
| 2 | `// v1.12 Milestone Audit Harness (Path A copy of v1.11; lineage v1.4 → ... → v1.12; C1-C16 inherited verbatim)` | `// v1.13 Milestone Audit Harness (Path A copy of v1.12; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → v1.12 → v1.13; C1-C16 inherited verbatim)` |
| 4 | `// Sidecar allow-list: scripts/validation/v1.12-audit-allowlist.json (v1.12 Path-A from v1.11 with c13_rotting_external carried for v1.12 per Phase 95 close-state)` | `// Sidecar allow-list: scripts/validation/v1.13-audit-allowlist.json (v1.13 Path-A from v1.12 with c13_rotting_external carried for v1.13 per Phase 100 close-state)` |
| 35 | `// Usage: node scripts/validation/v1.12-milestone-audit.mjs [--verbose] [--self-test]` | `// Usage: node scripts/validation/v1.13-milestone-audit.mjs [--verbose] [--self-test]` |
| 79 | `const raw = readFile('scripts/validation/v1.12-audit-allowlist.json');` | `const raw = readFile('scripts/validation/v1.13-audit-allowlist.json');` |

Everything else in v1.12-milestone-audit.mjs is **verbatim** (C1-C16, self-test 9/9, runner loop, helpers). No C17 — Phase 100 has no corpus rename, so content verification stays in per-phase validators per the locked Path-A doctrine.

### v1.13-audit-allowlist.json Structure

Path-A copy of `v1.12-audit-allowlist.json`. Change:
- `"schema_version"`: bump if needed (carry v1.12 value)
- `"generated"`: update to authoring date
- `"phase"`: change to `100`
- All arrays (`supervision_exemptions`, `c13_broken_link_allowlist` at exactly 15 entries, `cope_banned_phrases`, `c7_knox_allowlist`, `c9_exemptions`, `c11_ops_exemptions`, `c13_rotting_external`, `c16_missing_endpoint_exemptions: []`): carry verbatim from v1.12 [VERIFIED: node inspection of v1.12 sidecar]

The CI `path-match` job verifies that `v1.13-milestone-audit.mjs` references `v1.13-audit-allowlist.json` — both strings must match.

### BASELINE_17 Comment Block

**Location:** `scripts/validation/regenerate-supervision-pins.mjs` — insert immediately after line 459 (the existing BASELINE_16 forward-pointer line) and before `const BASELINE_9 = [`.  [VERIFIED: codebase read lines 452-463]

**Format** (mirror BASELINE_16 at lines 453-459 exactly):

```js
// BASELINE_17 refreshed 2026-06-29 (Phase 100 Plan 100-01): closes BASELINE_16 v1.12 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 100 SC#1); v1.13 line positions
// verified against HEAD <HEAD-SHA-at-Atom-1> (Phase 100 Wave-1 commit — Atom 1 constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 100 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 100
// close and remain valid for the v1.13 corpus. Resolution path: BASELINE_18 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.12 -> BASELINE_16 -> v1.13 -> BASELINE_17).
```

The `<HEAD-SHA-at-Atom-1>` placeholder is filled with the actual git HEAD short SHA at Atom 1 commit time. The executor must verify that BASELINE_9 line coordinates are still valid against the v1.13 corpus (check-phase-86 established the frozen-aware conversion at v1.9; no v1.13 phase touches `_glossary-android.md`).

---

## Atom 2 Contents (HARN-02) [VERIFIED: codebase read]

### Files in Atom 2 (indivisible single commit)

| File | Action |
|------|--------|
| `scripts/validation/check-phase-96.mjs` | CREATE — Phase 96 corpus validator |
| `scripts/validation/check-phase-97.mjs` | CREATE — Phase 97 corpus validator |
| `scripts/validation/check-phase-98.mjs` | CREATE — Phase 98 corpus validator |
| `scripts/validation/check-phase-99.mjs` | CREATE — Phase 99 corpus validator |
| `scripts/validation/check-phase-100.mjs` | CREATE — v1.13 chain-apex validator |
| `scripts/validation/_lib/frozen-at-close.mjs` | EDIT — add V112 entry + readAtV112Close export |
| `.github/workflows/audit-harness-v1.13-integrity.yml` | CREATE — 10th CI coexistence workflow |

### Frozen-at-Close V-Pin Ladder — V112 Entry

**Location:** `scripts/validation/_lib/frozen-at-close.mjs` — append to `MILESTONE_CLOSE_SHAS` object after V111. [VERIFIED: codebase read]

**V112 SHA:** `12f2c7b` (short) — full SHA `12f2c7bab511dffb5b3c9dc3e642a4360ef06065` [VERIFIED: `git log --grep="close-gate" --grep="v1.12" --all-match -1 --oneline`]

**Commit message confirmed:** `docs(95-04): Phase 95 close-gate — v1.12 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.12 MILESTONE CLOSE`

**Entry to add to MILESTONE_CLOSE_SHAS:**

```js
V112: '12f2c7b',  // Phase 95 Plan 95-04 close-gate — v1.12 milestone close-gate (docs(95-04);
                  // 4-doc traceability + v1.12 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize).
                  // Single entry (v1.12 closed in ONE commit; atom == close-gate;
                  // no separate V112_CLOSEGATE).
```

**Convenience export to add** (after the existing `readAtV111Close` line):

```js
export const readAtV112Close = (p) => readAtClose('V112', p);
```

**Existing V111 entry for reference** (confirm not modified):

```js
V111: '919b23b',  // Phase 93 Plan 93-04 — v1.11 milestone close-gate ...
```

### check-phase-95.mjs Template Analysis (chain-apex skeleton) [VERIFIED: codebase read]

The apex validator for check-phase-100 mirrors check-phase-95.mjs exactly. Key structural elements:

```js
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';

const HARNESS = 'scripts/validation/v1.13-milestone-audit.mjs';  // CHANGE: v1.12 → v1.13

// CHAIN_PHASES = [48..99] (NOT [48..100] — roadmap shorthand; [48..N-1] invariant)
// 52 entries: integers 48 through 99 inclusive
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
                      67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
                      86,87,88,89,90,91,92,93,94,95,96,97,98,99];

// LOCKED INVARIANT: never add entries to CHAIN_SKIP (V-SELF asserts size === 0)
const CHAIN_SKIP = new Set([]);
```

**V-100-SELF dual-invariant** (critical — same as V-95-SELF at check-phase-95.mjs:130-143):

```js
// V-100-SELF: 100 NOT in CHAIN_PHASES AND CHAIN_SKIP empty
if (CHAIN_PHASES.includes(100)) {
  return { pass: false, detail: 'CHAIN_PHASES includes 100 -- self-reference regression' };
}
if (CHAIN_SKIP.size !== 0) {
  return { pass: false, detail: 'CHAIN_SKIP non-empty ... Phase 68 7b635ca empty-Set invariant violated' };
}
```

**V-100-AUDIT check** (SKIP-PASS until close-gate plan lands 100-VERIFICATION.md):

```js
const verifPath = resolveArchivedPhasePath(
  '100-harness-lineage-bump-terminal-re-audit-milestone-close/100-VERIFICATION.md',
  ['v1.13-phases']
);
```

**V-100-CHAIN-NN runner** (NESTED-aware optimization, verbatim from check-phase-95.mjs:70-106):
- `CHECK_PHASE_NESTED=1` environment variable skips recursive chain expansion
- `isPeer` threshold: `phaseNum >= 67` (600 000 ms timeout for peer validators; 300 000 ms for others)
- `execFileSync` call with `stdio: 'pipe'`, `cwd: process.cwd()`, `env: subEnv`

**V-100-AUDIT-HARNESS** (repoint HARNESS to v1.13-milestone-audit.mjs):

```js
execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
```

**Assertion classes for check-phase-100:**

| ID | Type | What it checks |
|----|------|----------------|
| V-100-AUDIT | AUDIT | 100-VERIFICATION.md exists with "Phase 100" heading (SKIP-PASS until close-gate) |
| V-100-CHAIN-{48..99} | CHAIN | 52 subprocess checks — each check-phase-N.mjs exits 0 |
| V-100-AUDIT-HARNESS | AUDIT-HARNESS | v1.13-milestone-audit.mjs exits 0 |
| V-100-SELF | SELF | CHAIN_PHASES excludes 100; CHAIN_SKIP is empty Set |

**Total checks in check-phase-100:** 1 AUDIT + 52 CHAIN + 1 AUDIT-HARNESS + 1 SELF = **55 checks**

### Per-Phase Validators (check-phase-96..99) — Template Pattern

All four lightweight validators follow the `check-phase-94.mjs` template (PRESENCE + CONTENT needles; NO chain; SELF dual-invariant). [VERIFIED: 97-NEEDLE-SPEC.md, 98-NEEDLE-SPEC.md, 99-NEEDLE-SPEC.md]

**Common skeleton:**

```js
const CHAIN_PHASES = [];           // lightweight — no chain; chain lives only in apex
const CHAIN_SKIP = new Set([]);    // empty per invariant

// V-NN-SELF:
// assert !CHAIN_PHASES.includes(NN) AND CHAIN_SKIP.size === 0
```

**CRLF normalization required:** `.replace(/\r\n/g, '\n')` before all needle tests.
**No freshness assertions:** never assert `last_verified`, `review_by`, or date strings (time-bombs; no macOS doc in any freshness-assertion scope per C5/C10/C11).
**No sidecar/allowlist:** hard-assert all checks.

---

## Phase-100 Validator Token Section

### check-phase-96.mjs — Derived Inline per D-01 [VERIFIED: codebase grep + 96-CONTEXT.md]

Phase 96 shipped before the needle-spec hand-off convention. No 96-NEEDLE-SPEC.md exists. Tokens derived from 96-CONTEXT.md + committed file content.

**Deliverables:**
- `DELIVERABLE_00` = `docs/macos-lifecycle/00-ade-lifecycle.md`
- `DELIVERABLE_15` = `docs/l1-runbooks/15-macos-company-portal-sign-in.md`
- `DELIVERABLE_GLOS` = `docs/_glossary-macos.md`

**Assertion table:**

| Check ID | Type | Target | Needle / Condition | Notes |
|----------|------|--------|--------------------|-------|
| V-96-PRESENCE-00 | PRESENCE | DELIVERABLE_00 | file exists + non-empty | |
| V-96-PRESENCE-15 | PRESENCE | DELIVERABLE_15 | file exists + non-empty | |
| V-96-PRESENCE-GLOS | PRESENCE | DELIVERABLE_GLOS | file exists + non-empty | |
| V-96-ACC01-N1 | CONTENT | DELIVERABLE_00 | `via the Intune Management Extension (IME), not VPP licensing` | ACC-01 What-Happens landing ~line 309; NOT the pre-existing line-326 phrase |
| V-96-ACC01-N2 | CONTENT | DELIVERABLE_00 | `line-of-business (LOB) app, or as an unmanaged macOS PKG app` | ACC-01 Behind-the-Scenes ~line 319 |
| V-96-ACC02 | CONTENT | DELIVERABLE_00 | `static user group and delivered before the device reaches the Entra credential screen` | ACC-02 ~line 252; avoids pre-existing "static" uses elsewhere |
| V-96-ACC04 | CONTENT | DELIVERABLE_15 | `Required assignment for this user's group` | ACC-04 ~line 30; unique to corrected remediation sentence |
| V-96-GLOS01-N1 | CONTENT | DELIVERABLE_GLOS | `support.iru.io` | GLOS-01 three-URL statement ~line 114 |
| V-96-GLOS01-N2 | CONTENT | DELIVERABLE_GLOS | `support.kandji.io` | GLOS-01 three-URL statement ~line 114 |
| V-96-GLOS01-N3 | CONTENT | DELIVERABLE_GLOS | `docs.iru.com` | GLOS-01 three-URL statement ~line 114 |
| V-96-SLUG-GUARD | CONTENT | DELIVERABLE_GLOS | `### Kandji-Iru` | D-04 slug guardrail: bare heading intact (`#kandji-iru` slug must not drift) |
| V-96-VPP-ROW-GONE | NEGATIVE | DELIVERABLE_00 | `| VPP |` ABSENT from file | D-02 guardrail: removed local VPP "Glossary Terms Used" row stays removed; assert `!content.includes('| VPP |')` |
| V-96-SELF | SELF | in-file | CHAIN_PHASES excludes 96; CHAIN_SKIP.size === 0 | |

**Total checks:** 3 PRESENCE + 8 CONTENT + 1 NEGATIVE + 1 SELF = **13 checks**

**Critical guardrails (from D-01):**
- Do NOT needle `never distributed via Apple VPP` (line 326 — pre-existing, would false-green against pre-96 bytes)
- Do NOT needle the `#vpp` definition in the glossary (~line 146) — ~15 inbound links; never touched
- The `### Kandji-Iru` heading slug MUST remain `#kandji-iru` (double-hyphen/slash landmine documented in memory `reference_glossary_anchor_slugs.md`)

**VPP-row-gone implementation note:** `| VPP |` as a pipe-delimited table cell is absent from guide 00 post-Phase-96 (version history at line 418 confirms "removed orphaned VPP glossary quick-ref row (line 411)"). A simple `content.includes('| VPP |')` returns false — safe negative assertion. [VERIFIED: grep of guide 00 shows no `| VPP |` matches]

### check-phase-97.mjs [VERIFIED: 97-NEEDLE-SPEC.md — all tokens confirmed present 2026-06-28]

Full spec in `.planning/phases/97-enrollment-filevault-depth-formalization/97-NEEDLE-SPEC.md`.

**Total checks:** 16 (2 PRESENCE + 13 CONTENT + 1 SELF)

**Key tokens:**
- Guide 02 (`docs/admin-setup-macos/02-enrollment-profile.md`): `Non Platform SSO Accounts`, `Restrict editing`, `Prefill account info`, `{{partialUPN}}`, `{{username}}`
- Guide 03 (`docs/admin-setup-macos/03-configuration-profiles.md`): `FileVault Options`, `Recovery Key Escrow`, `| Defer |` (pipe-anchored), `dontAllowFDEDisable`, `DestroyFVKeyOnStandby`, `Recovery Key Rotation In Months`, `Local Password Policy`, `-2016341107`

**Precision note for DEP02-N3:** Use `| Defer |` (with surrounding pipe-space) not bare `Defer` (ubiquitous). For DEP02-N8, `content.includes('-2016341107')` works in JS without special handling (leading dash only an issue in shell grep).

### check-phase-98.mjs [VERIFIED: 98-NEEDLE-SPEC.md — all tokens confirmed present 2026-06-29]

Full spec in `.planning/phases/98-guide-07-comprehensive-pass/98-NEEDLE-SPEC.md`.

**Total checks:** 14 (1 PRESENCE + 12 CONTENT + 1 SELF)

**Deliverable:** `docs/admin-setup-macos/07-platform-sso-setup.md`

**Key tokens:** `com.microsoft.CompanyPortalMac.ssoextension`, `Enable Registration During Setup`, `5.2604.0`, `com.microsoft.CompanyPortalMac` (with negative lookahead `/com\.microsoft\.CompanyPortalMac(?!\.ssoextension)/`), `Non Platform SSO Accounts`, `AccountShortName`, `Configuration-Caused Failures`, `ADE Path Prerequisites`, `Registration Approach: Decision and Alternatives`, `End-User Sign-In Experience (Secure Enclave)`, `Setup-Assistant SSO-Extension Diagnostic Tree`, `Extension Identifier typo`

**Critical substring-caution for N4:** `com.microsoft.CompanyPortalMac` is a strict substring of `com.microsoft.CompanyPortalMac.ssoextension`. Use `/com\.microsoft\.CompanyPortalMac(?!\.ssoextension)/` (negative lookahead) to avoid false matches on N1 lines.

### check-phase-99.mjs [VERIFIED: 99-NEEDLE-SPEC.md — all tokens confirmed present 2026-06-29]

Full spec in `.planning/phases/99-new-runbook-navigation-wiring/99-NEEDLE-SPEC.md`.

**Total checks:** 23 (7 PRESENCE + 15 CONTENT + 1 SELF) — may expand to 24 if N9/N10 split into structurally-anchored checks.

**Deliverables (7 files):**
- `docs/l1-runbooks/37-macos-local-password-reset.md` (new runbook)
- `docs/l1-runbooks/36-macos-secure-enclave-key.md` (reciprocal cross-link)
- `docs/l1-runbooks/00-index.md`
- `docs/index.md`
- `docs/common-issues.md`
- `docs/quick-ref-l1.md`
- `docs/decision-trees/06-macos-triage.md`

**Key tokens:** `audience: L1`, `platform: macOS`, `applies_to: ADE`, `does NOT reset the independent local macOS password`, `](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration` (count === 3), `MACR9`, `click MACR9`, `../l1-runbooks/37-macos-local-password-reset.md`, `Runbook 37`, plus link tokens in hub files.

**Critical count assertions:** N17 must appear exactly 3 times in runbook 37; `](l1-runbooks/37-macos-local-password-reset.md)` must appear >= 2 times in quick-ref-l1.md.

**Do NOT re-touch `docs/decision-trees/06-macos-triage.md`:** WR-02 was fixed in Phase 99 commit `5d6ee80`. The check-phase-99 validator wraps (asserts) the committed content — it does not edit it.

---

## CI Workflow — 10th Coexistence File (HARN-02) [VERIFIED: audit-harness-v1.12-integrity.yml read]

### File to Create

`.github/workflows/audit-harness-v1.13-integrity.yml`

### Template: clone from audit-harness-v1.12-integrity.yml with these substitutions

| v1.12 value | v1.13 replacement |
|-------------|-------------------|
| `name: Audit Harness v1.12 Integrity` | `name: Audit Harness v1.13 Integrity` |
| `v1.12-*` (path filter) | `v1.13-*` |
| `audit-harness-v1.12-integrity.yml` (path filter + references) | `audit-harness-v1.13-integrity.yml` |
| `v1.12-audit-allowlist.json` (parse job) | `v1.13-audit-allowlist.json` |
| `v1.12-milestone-audit.mjs` (path-match + harness-run) | `v1.13-milestone-audit.mjs` |
| `check-phase-95.mjs` (linux-chain job) | `check-phase-100.mjs` (apex) |
| `check-phase-94` job | `check-phase-96` job |
| `check-phase-95` job | `check-phase-97`, `check-phase-98`, `check-phase-99`, `check-phase-100` jobs |
| `# Phase 95 HARN-02: 9th coexistence workflow` (header) | `# Phase 100 HARN-02: 10th coexistence workflow` |

### Path Filters (trigger)

```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.13-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.13-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.13-MILESTONE-AUDIT.md'
      - '.planning/milestones/v1.13-DEFERRED-CLEANUP.md'
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external
  workflow_dispatch:
```

### Inherited Invariants (MUST NOT change from v1.12)

- `linux-chain-ubuntu-latest`: `fetch-depth: 0` (FETCH-DEPTH-01 contract)
- `linux-chain-ubuntu-latest`: `git config --global core.autocrlf false` (LF-fidelity contract)
- `linux-chain-ubuntu-latest`: `continue-on-error: false` (D-A9 PR-blocking contract)
- `linux-chain-ubuntu-latest`: `timeout-minutes: 30`
- `::notice title=CHAIN_TIMING_LINUX::` emission in linux-chain job
- `rotting-external-quarterly`: `if: github.event_name == 'schedule' && ...` condition (correct quarterly scoping)
- `pin-helper-advisory`: `continue-on-error: true` (advisory only, never blocks)
- `markdown-link-check@3.14.2` pinned version

### New Jobs for v1.13 (replacing check-phase-94 + check-phase-95)

```yaml
check-phase-96:
  name: check-phase-96 validator
  runs-on: ubuntu-latest
  needs: harness-run
  timeout-minutes: 15
  continue-on-error: false
  steps:
    - uses: actions/checkout@v4
      with: { fetch-depth: 0 }
    - uses: actions/setup-node@v4
      with: { node-version: '20' }
    - name: Run check-phase-96.mjs
      run: node scripts/validation/check-phase-96.mjs

# Repeat pattern for check-phase-97, 98, 99, 100
```

### Predecessor byte-unchanged invariant

All v1.4/v1.4.1/v1.5/v1.6/v1.7/v1.8/v1.9/v1.10/v1.11/v1.12 workflow YAMLs (9 files) + milestone-audit MJS (10) + sidecar JSONs (10) must be BYTE-UNCHANGED at Atom 2 commit. Verify via: `git diff <pre-Atom-1-commit> HEAD -- <all predecessor surfaces>` returns EMPTY.

---

## 3-Axis Terminal Re-Audit (HARN-03) [VERIFIED: v1.12-MILESTONE-AUDIT.md read]

### Axis 1 — Windows Fresh Clone

```powershell
git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.13-audit-<8-char-rand>
# HEAD-match assertion: $cloneHeadSha -eq $mainHeadSha
# Run LEAF validators only (v1.13-milestone-audit.mjs + check-phase-96..99.mjs)
# Chain validators NOT run on Windows (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01)
# Remove-Item -Recurse -Force $auditPath  (zero orphan temp dirs)
```

**Chain validators excluded from Axis 1:** check-phase-100.mjs (apex, CHAIN_PHASES=[48..99]) cascades O(n²) on cold Windows clone — same D-03 corrected OS split as v1.12. At depth [48..99] (52 entries) this is GUARANTEED unreliable on Windows.

**Leaf validators on Windows Axis 1 (non-chain):**
1. `v1.13-milestone-audit.mjs` (C1-C16 harness)
2. `check-phase-96.mjs` (13 checks — PRESENCE+CONTENT, no chain)
3. `check-phase-97.mjs` (16 checks — PRESENCE+CONTENT, no chain)
4. `check-phase-98.mjs` (14 checks — PRESENCE+CONTENT, no chain)
5. `check-phase-99.mjs` (23 checks — PRESENCE+CONTENT, no chain)

### Axis 2 — Cross-OS Linux GHA

```bash
gh workflow run audit-harness-v1.13-integrity.yml --ref master
# Confirm Atom 2 is on origin/master BEFORE dispatch
# All jobs must succeed: parse, path-match, harness-run, linux-chain-ubuntu-latest,
#   check-phase-96..100, rotting-external-quarterly (skip on workflow_dispatch — negative control),
#   pin-helper-advisory
```

**Linux GHA is authoritative for BOTH chain validators** (D-03 corrected OS split):
- `check-phase-95.mjs` (continuity from v1.12, CHAIN [48..94]) — still in chain; runs via apex
- `check-phase-100.mjs` (apex, CHAIN [48..99]) — Linux sole-authoritative
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..99] (52 entries, +5 deeper than v1.12's [48..94])

### Axis 3 — Fresh Zero-Context Sub-Agent

Same fresh-clone sub-agent covers physical + logical isolation per D-03 ruling (one dispatch = one agent; distinct from Plan 100-01/100-02 author-agents).

### Cross-OS EXACT MATCH Table Format

Based on v1.12 precedent (5-row set including the continuity chain):

| # | Validator | Windows (Axis 1/3, fresh clone) | Linux (Axis 2, GHA) | Match |
|---|-----------|----------------------------------|---------------------|-------|
| 1 | `v1.13-milestone-audit.mjs` | NN / 0 / 0 | NN / 0 / 0 | EXACT MATCH |
| 2 | `check-phase-96.mjs` (13 checks) | NN / 0 / 0 | NN / 0 / 0 | EXACT MATCH |
| 3 | `check-phase-97.mjs` (16 checks) | NN / 0 / 0 | NN / 0 / 0 | EXACT MATCH |
| 4 | `check-phase-98.mjs` (14 checks) | NN / 0 / 0 | NN / 0 / 0 | EXACT MATCH |
| 5 | `check-phase-99.mjs` (23 checks) | NN / 0 / 0 | NN / 0 / 0 | EXACT MATCH |
| 6 | `check-phase-95.mjs` (continuity [48..94]) | Windows N/A — cascades (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) | NN / 0 / 1 | Linux sole-authoritative |
| 7 | `check-phase-100.mjs` (apex [48..99]) | Windows N/A — cascades (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) | NN / 0 / 1 | Linux sole-authoritative |

(Format: PASS / FAIL / SKIP)

The SKIP in rows 6-7 is the V-95-AUDIT / V-100-AUDIT SKIP-PASS (these resolve to PASS once 100-VERIFICATION.md is authored at close-gate).

### check-phase-66 Deep-Nest Non-Blocker

[VERIFIED: 100-CONTEXT.md D-04 + v1.12-DEFERRED-CLEANUP.md]

- `check-phase-66.mjs` standalone: **28/0/0** (exits 0)
- In chain run on cold Windows: the 60s external `timeout` utility kills the process (exit 124), generating apparent failure
- Internal subprocess budget: 300 000 ms (not 60s)
- This is NOT a real failure — it is the `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` O(n²) cascade artifact
- **Do NOT fix** — document in MILESTONE-AUDIT with prior-misclassification caveat (Phase 97 deferred-items mis-read this cascade as a genuine check-phase-66 failure)
- On Linux GHA: check-phase-66 exits 0 within the chain run (PASS)

---

## Close-Gate Commit (HARN-03)

### Single Commit Protocol (NO Commit A)

Phase 100 uses the single-commit close protocol (same as v1.12 Phase 95 and v1.11 Phase 93). No artifact forward-references the close SHA. BASELINE_17 anchors to a known-PAST SHA at Atom 1 authoring time. The literal `{phase_100_close_SHA}` placeholder in the MILESTONE-AUDIT frontmatter is recoverable via:

```bash
git log --all --grep="100" --grep="close-gate" --all-match -1 --format=%H
```

### Documents Authored in Close-Gate Commit

1. `.planning/milestones/v1.13-MILESTONE-AUDIT.md`
2. `.planning/milestones/v1.13-DEFERRED-CLEANUP.md`

### 4-Doc Traceability Closure (14/14 Validated)

Update ALL four tracking documents in the same close-gate commit:

| Document | What changes |
|----------|-------------|
| `.planning/REQUIREMENTS.md` | Flip HARN-01, HARN-02, HARN-03 checkboxes from `[ ]` to `[x]`; update Traceability table status |
| `.planning/ROADMAP.md` | Mark Phase 100 as `[x]` complete; update v1.13 milestone as ✅ SHIPPED |
| `.planning/STATE.md` | Update progress: 5/5 completed_phases, milestone status to shipped |
| `.planning/PROJECT.md` | Add v1.13 milestone entry; record Phase 100 close |

All 14 requirements must be Validated (ACC-01/02/03/04 + TS-01/02/03 + DEP-01/02/03 + RUN-01 + GLOS-01 + HARN-01/02/03 = 14).

---

## v1.13-DEFERRED-CLEANUP.md Carry/Drop/Add Set (D-02) [VERIFIED: 100-CONTEXT.md + v1.12-DEFERRED-CLEANUP.md]

### DROP (record Closed in MILESTONE-AUDIT, do NOT carry)

| Item | Why Dropped |
|------|-------------|
| `GLOSSARY-IRU-URL-FRESHNESS-01` | Resolved by GLOS-01 (Phase 96 commit `b70d028`; glossary:114 now carries 3-URL roles). The quarterly URL-liveness cadence is deliberately NOT in the durable glossary (Phase 96 D-04) — NOT an unmet closure criterion. |
| `WR-02` (if it was in v1.12 DEFERRED-CLEANUP) | Fixed in Phase 99 `5d6ee80`. Record Closed. Do NOT re-touch `06-macos-triage.md`. |

### CARRY VERBATIM (do NOT mask via deletion)

| Item | Source | Notes |
|------|--------|-------|
| `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` | v1.12-DEFERRED-CLEANUP.md §WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 | NOW AT DEPTH [48..99] (+5 from v1.12's [48..94]); update depth annotation; D-03 corrected: BOTH chain validators Linux-authoritative |
| `MTPSSO-01/02/03` | v1.12-DEFERRED-CLEANUP Part B | verbatim |
| `PSSO-FUT-03` | v1.12-DEFERRED-CLEANUP (multi-tenant PSSO) | verbatim |
| `KRBFUT-01/02` | v1.12-DEFERRED-CLEANUP Part B | verbatim |
| `MIGFUT-01/02` | v1.12-DEFERRED-CLEANUP Part B | verbatim |
| `CI-3` (Managed Apple ID rename) | v1.12-DEFERRED-CLEANUP Part C | verbatim |
| All Part C v1.8 deferred items | v1.12-DEFERRED-CLEANUP Part C | verbatim (ARCHIVE-UPSTREAM-01, v1.1 line 164, HELPER-SPAWN-STDERR-01, FROZEN-AWARE-ADOPTION-SWEEP-01, EXEC-FAIL-DETAIL-EXTRACTION-01, multi-tenant Apple Business surfaces, Apple Business Device API, Per-OU CRD, Account Holder lockout, ASM) |

### ADD (new v1.13 deferrals)

| Item ID | File:Line | Description | Out-of-Scope Reason |
|---------|-----------|-------------|---------------------|
| `docs/index.md:108` stale-count | `docs/index.md:108` | "(6 runbooks…)" stale — 8 macOS L1 runbooks now exist. Cite `:108`, NOT `06-macos-triage.md:100/101` (Finder mis-citation) | docs-content fix |
| `WR-01` | `docs/quick-ref-l1.md:101` | Reads "Escalate L2 via [Secure Enclave Key Loss]…", mislabeling L1 #36 as an L2 escalation target | docs-content fix |
| `IN-01` | `docs/common-issues.md:242-247` | Locked-out entry goes L1 #37 → L2 #27 without surfacing L1 #36 mandatory-re-registration intermediate | docs-content fix |

---

## Atom Indivisibility + File Ownership Map

| File | Atom | Indivisible constraint |
|------|------|----------------------|
| `scripts/validation/v1.13-milestone-audit.mjs` | **Atom 1** | Must ship with sidecar + BASELINE_17 in same commit |
| `scripts/validation/v1.13-audit-allowlist.json` | **Atom 1** | Must ship with audit script in same commit |
| `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_17 comment) | **Atom 1** | Must ship with audit script in same commit |
| `scripts/validation/check-phase-96.mjs` | **Atom 2** | Must ship with all 5 validators + frozen-pin + CI in same commit |
| `scripts/validation/check-phase-97.mjs` | **Atom 2** | Same |
| `scripts/validation/check-phase-98.mjs` | **Atom 2** | Same |
| `scripts/validation/check-phase-99.mjs` | **Atom 2** | Same |
| `scripts/validation/check-phase-100.mjs` | **Atom 2** | Same |
| `scripts/validation/_lib/frozen-at-close.mjs` | **Atom 2** | V112 pin must be in same commit as check-phase-100 that reads prior pins |
| `.github/workflows/audit-harness-v1.13-integrity.yml` | **Atom 2** | Same |
| `.planning/milestones/v1.13-MILESTONE-AUDIT.md` | **Close-gate** | Single commit (NO Commit A) |
| `.planning/milestones/v1.13-DEFERRED-CLEANUP.md` | **Close-gate** | Same |
| `.planning/REQUIREMENTS.md` (14/14 flip) | **Close-gate** | Same |
| `.planning/ROADMAP.md` (milestone shipped) | **Close-gate** | Same |
| `.planning/STATE.md` (progress update) | **Close-gate** | Same |
| `.planning/PROJECT.md` (milestone entry) | **Close-gate** | Same |

**Predecessors v1.4–v1.12 BYTE-UNCHANGED** at ALL commits. Never edit v1.4–v1.12 harness files, CI workflows, or sidecar JSONs. check-phase-96..99 WRAP committed content (do not edit docs/ corpus).

---

## Common Pitfalls

### Pitfall 1: [48..100] Self-Reference
**What goes wrong:** Authoring `CHAIN_PHASES = [48,...,100]` in check-phase-100.mjs — includes phase 100 itself.
**Why it happens:** The roadmap and STATE.md use "[48..100]" as the milestone range shorthand.
**How to avoid:** The [48..N-1] invariant gives `[48..99]` for phase-100 apex. V-100-SELF will FAIL immediately if 100 is in the array.

### Pitfall 2: CHAIN_SKIP Non-Empty
**What goes wrong:** Adding any phase number to `CHAIN_SKIP` to avoid a chain failure.
**Why it happens:** Temptation to silence WINDOWS-CLONE-DEEPNEST-TIMEOUT-01.
**How to avoid:** V-SELF hard-asserts `CHAIN_SKIP.size === 0`. Any non-empty set trips V-100-SELF FAIL. This was the GA3-C CRITICAL self-disqualifier.

### Pitfall 3: Needling the Pre-Existing Line 326 Phrase
**What goes wrong:** Using `never distributed via Apple VPP` as an ACC-01 needle in check-phase-96.
**Why it happens:** Line 326 already says "Company Portal is never distributed via Apple VPP / Apps and Books."
**How to avoid:** This phrase pre-dates Phase 96 — it would false-green against pre-96 bytes. Use the Phase-96-specific landing strings at lines 309/319 instead.

### Pitfall 4: Missing N4 Substring Caution in check-phase-98
**What goes wrong:** `content.includes('com.microsoft.CompanyPortalMac')` matches on `.ssoextension` lines, masking a missing bundle-ID-only occurrence.
**How to avoid:** Use `/com\.microsoft\.CompanyPortalMac(?!\.ssoextension)/` negative lookahead.

### Pitfall 5: Authoring 96-NEEDLE-SPEC.md
**What goes wrong:** Creating a retroactive `96-NEEDLE-SPEC.md` file.
**Why it happens:** Phases 97-99 each have one; 96 looks like an exception to fill.
**How to avoid:** D-01 LOCKED — no retroactive needle spec. Phase 96 shipped before the convention. Needles are derived inline in check-phase-96.mjs.

### Pitfall 6: Missing Atom V112 Pin Before Validators
**What goes wrong:** Committing check-phase-100 (which reads frozen-at-close.mjs) without the V112 entry in the same commit.
**How to avoid:** V112 entry + check-phase-100 must be in the same Atom 2 commit. The `readAtV112Close` export is also needed if any new validator calls it.

### Pitfall 7: Running Chain Validators on Windows Axis-1
**What goes wrong:** Running check-phase-95.mjs or check-phase-100.mjs on Windows fresh clone — both cascade.
**How to avoid:** Only run leaf validators (v1.13-audit + check-phase-96..99) on Windows Axis-1. Chain validators are Linux GHA sole-authoritative per D-03.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `node` (v20) | All validators | ✓ | v20 (GHA pinned) | — |
| `git` | frozen-at-close.mjs (git show) | ✓ | any | — |
| `gh` CLI | Axis 2 GHA dispatch | ✓ (Schweinehund, active) | — | manual GHA dispatch |
| `--no-hardlinks` clone | Axis 1 | ✓ (Windows git supports) | — | — |

**Missing dependencies with no fallback:** None.

---

## Validation Architecture

> nyquist_validation is not explicitly set in .planning/config.json — check not performed. Phase 100 is tooling-only; the validators themselves ARE the validation net. Self-validation is covered by V-100-SELF + V-100-AUDIT-HARNESS running the harness internally.

The phase's own output (check-phase-100.mjs + CI workflow) serves as the validation layer. No separate test framework applies. The 3-axis terminal re-audit IS the phase's integration test.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | V-96-VPP-ROW-GONE: `| VPP |` is absent from guide 00 | check-phase-96 tokens | If VPP still appears in a pipe-delimited table row, negative assertion would incorrectly PASS (false negative). Verify with grep before authoring. [PARTIALLY VERIFIED: version history at guide 00 line 418 confirms removal] |
| A2 | check-phase-95.mjs CHAIN exits 47/0/1 (continuity) on Linux GHA within v1.13 chain — same as v1.12 | Cross-OS table | If a prior-phase validator regressed, chain count changes. Run Axis 2 GHA to confirm. |
| A3 | BASELINE_9 line coordinates are still valid for v1.13 corpus (no v1.13 phase touched `_glossary-android.md`) | BASELINE_17 | If any v1.13 edit accidentally drifted android glossary line coords, BASELINE_17 would encode stale positions. Verify via grep at Atom 1 authoring time. [LOW RISK — all v1.13 phases target macOS-only files] |

**All critical claims verified:** V112 SHA, check-phase-95 structure, frozen-at-close.mjs V-pin format, BASELINE_16 format, CI workflow structure, needle tokens (97/98/99), allowlist sidecar structure, CHAIN_PHASES [48..N-1] invariant.

---

## Open Questions (RESOLVED)

1. **PSSO-FUT-03 location in v1.12-DEFERRED-CLEANUP**
   - What we know: 100-CONTEXT.md D-02 lists "MTPSSO-01/02/03 / PSSO-FUT-03" as items to carry. The v1.12 DEFERRED-CLEANUP contains MTPSSO-01/02/03 explicitly. PSSO-FUT-03 may be the same as MTPSSO-03 or a separate entry.
   - RESOLVED: At close-gate authoring time (plan 100-04 T1), check v1.12-DEFERRED-CLEANUP for PSSO-FUT-03 explicitly; if absent, carry it as a new notation referencing the multi-tenant PSSO deferral. Implemented in the 100-04 T1 carry-list.

2. **check-phase-99 N9/N10 split decision**
   - What we know: 99-NEEDLE-SPEC.md allows either a consolidated count >= 2 assertion or two structurally-anchored checks for quick-ref-l1.md occurrences.
   - RESOLVED: Use count >= 2 (simpler, per spec guidance). Implemented verbatim in 100-02 T2.

---

## Sources

### Primary (HIGH confidence — codebase reads)
- `scripts/validation/check-phase-95.mjs` — chain-apex template (CHAIN_PHASES, CHAIN_SKIP, V-SELF, AUDIT-HARNESS, runner loop)
- `scripts/validation/v1.12-milestone-audit.mjs` — C1-C16 source, 4-line relabel pattern
- `scripts/validation/_lib/frozen-at-close.mjs` — V-pin ladder format, V111='919b23b' precedent
- `.github/workflows/audit-harness-v1.12-integrity.yml` — CI workflow template
- `.planning/milestones/v1.12-MILESTONE-AUDIT.md` — cross-OS table format, audit narrative, lineage entry
- `.planning/milestones/v1.12-DEFERRED-CLEANUP.md` — carry/drop/add doctrine, WINDOWS-CLONE-DEEPNEST text
- `.planning/phases/97-enrollment-filevault-depth-formalization/97-NEEDLE-SPEC.md`
- `.planning/phases/98-guide-07-comprehensive-pass/98-NEEDLE-SPEC.md`
- `.planning/phases/99-new-runbook-navigation-wiring/99-NEEDLE-SPEC.md`
- `scripts/validation/regenerate-supervision-pins.mjs` lines 452-460 — BASELINE_16 format
- `git log --grep="close-gate" --grep="v1.12" --all-match -1` — V112 SHA = `12f2c7b`
- `git log --grep="close-gate" --grep="v1.12" --all-match -1 --format="%H %s"` — full SHA confirmation

### Secondary (HIGH confidence — locked CONTEXT.md decisions)
- `.planning/phases/100-harness-lineage-bump-terminal-re-audit-milestone-close/100-CONTEXT.md` — all four decisions (D-01..D-04), canonical refs, execution cautions

### Tertiary (MEDIUM — grep-verified committed content)
- `docs/macos-lifecycle/00-ade-lifecycle.md` lines 305-320, 246-255 — ACC-01/ACC-02 needle content
- `docs/l1-runbooks/15-macos-company-portal-sign-in.md` line 30 — ACC-04 needle content
- `docs/_glossary-macos.md` lines 110-120 — GLOS-01 needle content + `### Kandji-Iru` heading
- `node` inspection of `v1.12-audit-allowlist.json` — sidecar key structure and supervision_exemptions count

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all validator files read directly; no external dependencies
- Architecture: HIGH — locked decisions + codebase-verified template structures
- Pitfalls: HIGH — derived from adversarial-review findings (23 objections, 7 disproved by Adversary)

**Research date:** 2026-06-29
**Valid until:** Indefinite (internal harness work, no external dependencies to go stale)
