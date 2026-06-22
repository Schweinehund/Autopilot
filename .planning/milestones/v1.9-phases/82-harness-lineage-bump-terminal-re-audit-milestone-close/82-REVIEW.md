---
phase: 82-harness-lineage-bump-terminal-re-audit-milestone-close
reviewed: 2026-06-22T00:00:00Z
depth: standard
files_reviewed: 13
files_reviewed_list:
  - scripts/validation/v1.9-milestone-audit.mjs
  - scripts/validation/v1.9-audit-allowlist.json
  - scripts/validation/_lib/frozen-at-close.mjs
  - scripts/validation/regenerate-supervision-pins.mjs
  - scripts/validation/check-phase-75.mjs
  - scripts/validation/check-phase-76.mjs
  - scripts/validation/check-phase-77.mjs
  - scripts/validation/check-phase-78.mjs
  - scripts/validation/check-phase-79.mjs
  - scripts/validation/check-phase-80.mjs
  - scripts/validation/check-phase-81.mjs
  - scripts/validation/check-phase-82.mjs
  - .github/workflows/audit-harness-v1.9-integrity.yml
findings:
  critical: 0
  warning: 4
  info: 3
  total: 7
status: issues_found
---

# Phase 82: Code Review Report

**Reviewed:** 2026-06-22T00:00:00Z
**Depth:** standard
**Files Reviewed:** 13
**Status:** issues_found

## Summary

Reviewed the v1.9 audit-harness lineage bump: the milestone audit harness (C1-C16), its
JSON sidecar, the centralized frozen-at-close reader module, the supervision-pin advisory
helper, eight per-phase validators (75-82), and the GitHub Actions integrity workflow.

I executed every validator to confirm runtime behavior. All current checks PASS (harness 15/15,
self-test 9/9, check-phase-81 9/9, supervision-pins --self-test PASS), and the Path-A v1.8->v1.9
relabels are faithful. The highest-scrutiny areas requested were verified clean:

- **8 SSO-E cross-link needles (check-phase-81):** all 8 needles resolve against their source
  files; CRLF-safe forward-slash needles are correct. One edge (E7) has a robustness weakness
  (WR-01) but is not currently failing.
- **check-phase-82 chain-apex:** `CHAIN_PHASES=[48..81]` is complete (all 34 members present on
  disk and exit 0), `CHAIN_SKIP=new Set([])`, V-82-SELF guard correct, NESTED handling sound.
  No off-by-one.
- **frozen-at-close.mjs V18 entry:** SHA `2bd79d8` confirmed a valid commit; there is NO stray
  `V18_CLOSEGATE` key (the only textual occurrences are a comment explaining its intentional
  absence and the unrelated `V17_CLOSEGATE`).
- **Lightweight check-phase-75..80:** each asserts a real, non-empty headline deliverable plus
  the dual-invariant SELF guard — they are NOT silent always-pass shells.

No BLOCKER-class defects (no false-pass / false-fail in the gating logic as it stands). The
findings below are harness-integrity hardening (robustness against future content edits) and
CI supply-chain least-privilege items.

## Warnings

### WR-01: check-phase-81 E7 needle is a bare filename — false-passes on changelog/prose mentions

**File:** `scripts/validation/check-phase-81.mjs:52`
**Issue:** Seven of the eight SSO-E needles are path-qualified (e.g.
`../admin-setup-macos/07-platform-sso-setup.md`), so they only match an actual relative link.
E7's needle is the bare filename `07-platform-sso-setup.md`, which is the only non-path-qualified
needle. In the source file `docs/admin-setup-macos/03-configuration-profiles.md` that string
appears 3 times: once as the real navigational link (line 168) and twice in Version-History
changelog rows (lines 201-202) where it is rendered inside backticks as prose, not a link. I
verified that if the real link at line 168 were deleted, `c.includes('07-platform-sso-setup.md')`
would still match the two changelog mentions and E7 would FALSE-PASS — defeating the edge's
purpose (guaranteeing the live cross-link exists). For a validator that gates all future
milestones, an edge that passes on a stale changelog reference is a latent integrity hole.
**Fix:** Make the E7 needle link-shaped so prose/changelog mentions cannot satisfy it, e.g.
match the markdown link target form:
```js
{ id: 'E7', file: 'docs/admin-setup-macos/03-configuration-profiles.md', needle: '](07-platform-sso-setup.md)' },
```
(or a path-qualified target consistent with the file's actual link). This mirrors the
link-not-copy discipline already enforced by C12.

### WR-02: regenerate-supervision-pins.mjs reads the stale v1.7 sidecar, not v1.9

**File:** `scripts/validation/regenerate-supervision-pins.mjs:290,336,454,456`
**Issue:** This advisory pin-drift helper loads
`scripts/validation/v1.7-audit-allowlist.json` in all three modes (`--report`, `--emit-stubs`,
`--self-test`). Its purpose is to compare scanned supervision occurrences against the *current*
milestone's pinned set. At v1.9 it should read `v1.9-audit-allowlist.json`. The file's own
forward-pointer comments document the lineage-repoint obligation (line 415: "Phase 70 HARNESS-02
repoints parseAllowlist() to v1.7 sidecar..."; the BASELINE_13 comment block at lines 432-438
records that v1.9 is now current) yet the path was never bumped past v1.7 — a missed Path-A
relabel. Today this is masked because the v1.7 and v1.9 supervision arrays are byte-identical
(both 20 entries, verified), so `--self-test` still passes. It is latent: any future v1.9-only
supervision pin edit will silently not be reflected by this helper, and the CI
`pin-helper-advisory` job (workflow lines 240-256) will report drift against the wrong baseline.
**Fix:** Repoint the three reads (and the error string at line 456) to the v1.9 sidecar:
```js
const allow = parseAllowlist('scripts/validation/v1.9-audit-allowlist.json');
```

### WR-03: Integrity workflow grants no explicit least-privilege `permissions:` block

**File:** `.github/workflows/audit-harness-v1.9-integrity.yml:12-27`
**Issue:** The workflow defines no top-level or job-level `permissions:` key, so every job
inherits the repository's default `GITHUB_TOKEN` permission set. For repos left at the legacy
default that is read/write across scopes (`contents: write`, etc.). This workflow only checks
out the repo and runs read-only Node validators — it needs `contents: read` and nothing else.
Granting broad token scope to a PR-triggered, schedule-triggered, and `workflow_dispatch`
workflow that executes project code (`node scripts/validation/*.mjs`, `npm install -g`) widens
the blast radius if any executed script or transitive dependency is compromised.
**Fix:** Add a least-privilege top-level block:
```yaml
permissions:
  contents: read
```

### WR-04: First-party actions float on mutable `@v4` tags (supply-chain pinning)

**File:** `.github/workflows/audit-harness-v1.9-integrity.yml` (all `actions/checkout@v4` /
`actions/setup-node@v4` steps, e.g. lines 33-34, 68-69, 83-85)
**Issue:** `actions/checkout` and `actions/setup-node` are referenced by the mutable major-version
tag `@v4` rather than a pinned commit SHA. A compromised or force-moved tag would let an attacker
run arbitrary code in CI. Note this is partially mitigated — only first-party `actions/*` are
used, and the one npm dependency IS version-pinned (`markdown-link-check@3.14.2`, line 217) — so
severity is reduced versus third-party floating actions. Flagging for consistency with the
project's own pinning discipline applied to the npm tool.
**Fix:** Pin to full commit SHAs with a version comment, e.g.
`uses: actions/checkout@<40-char-sha> # v4.x`. (Acceptable to defer if a Dependabot/SHA-pin
policy is tracked elsewhere; this is consistent across all 6 coexistence workflows by design.)

## Info

### IN-01: check-phase-82 `isMissing` heuristic is broader than necessary (narrow false-skip surface)

**File:** `scripts/validation/check-phase-82.mjs:94-96,117-119`
**Issue:** Subprocess failures are reclassified as `skipped` (exit-0-equivalent) when
`stderr.includes('not found')` or `stderr.includes('Could not resolve')`. I verified that node's
missing-import errors (`ERR_MODULE_NOT_FOUND` / "Cannot find module") do NOT contain the lowercase
substring `not found`, and a normal validator FAIL exits 1 with output on stdout and empty stderr —
so the realistic false-skip surface is limited to a genuine `command not found` (status 127). Still,
a child validator that deliberately writes "...not found" to stderr while failing would be masked.
**Fix:** Tighten to the unambiguous shell-missing signal:
```js
const isMissing = err.code === 'ENOENT' || err.status === 127;
```
Dropping the free-text `stderr.includes(...)` clauses removes the masking vector without losing
the node-absent skip behavior.

### IN-02: C16 calls `parseAllowlist()` a second time instead of reusing module-level `ALLOWLIST`

**File:** `scripts/validation/v1.9-milestone-audit.mjs:763`
**Issue:** The module already computes `const ALLOWLIST = parseAllowlist()` at line 88, but the
C16 check re-invokes `parseAllowlist()` (a fresh file read + JSON.parse). Harmless functionally,
but inconsistent with every other check (C1, C2, C7, C9, C11, C13 all read the cached `ALLOWLIST`)
and an unnecessary second disk read.
**Fix:** Replace `const sidecar = parseAllowlist();` with `const sidecar = ALLOWLIST;`.

### IN-03: C7 Knox suffix window (50 chars from match start) can false-fail long qualifiers

**File:** `scripts/validation/v1.9-milestone-audit.mjs:467`
**Issue:** The disambiguation window is `c.slice(m.index, m.index + 50)`, which begins at "Knox"
(4 chars), leaving only ~46 chars for the SKU/qualifier suffix to appear. A legitimate qualifier
that sits more than ~46 characters after "Knox" would be counted as a bare occurrence (false-FAIL,
over-strict — not a false-pass). The current corpus passes, so this is informational. The bias is
toward strictness, which is acceptable for a gating check, but the fixed magic window is brittle if
phrasing changes.
**Fix:** None required now; if it ever false-fails, widen the window or anchor the suffix search to
the same sentence rather than a fixed char count.

---

_Reviewed: 2026-06-22T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
