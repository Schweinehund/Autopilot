# Phase 144 — Measurement Ledger

Opened by Plan 01, Task 2. Later plans in this phase append rows/sections rather than replacing
this file.

## Plan 01 — Category 11 amendment: authorization proof

**Method:** the six new validators, sidecar, and three pipeline paths do not exist on disk yet
(this is a pattern-level proof, not a gate run against real files — creating any of them here
would violate the D-09 amendment-before-edit rule). Extracted the `carve-allowlist` fenced block
from the amended `.planning/milestones/v1.20-CARVE.md`, stripped `#` comment and blank lines, and
tested each of the ten candidate paths for exact string equality against the stripped line set —
the same matching semantics `carve-gate.mjs`'s `globToRegExp` produces for a wildcard-free glob
(`^literal$`, i.e. plain equality).

| # | Candidate path | Matching allowlist entry | Result |
|---|-----------------|---------------------------|--------|
| 1 | `scripts/validation/check-phase-139.mjs` | `scripts/validation/check-phase-139.mjs` | MATCH |
| 2 | `scripts/validation/check-phase-140.mjs` | `scripts/validation/check-phase-140.mjs` | MATCH |
| 3 | `scripts/validation/check-phase-141.mjs` | `scripts/validation/check-phase-141.mjs` | MATCH |
| 4 | `scripts/validation/check-phase-142.mjs` | `scripts/validation/check-phase-142.mjs` | MATCH |
| 5 | `scripts/validation/check-phase-143.mjs` | `scripts/validation/check-phase-143.mjs` | MATCH |
| 6 | `scripts/validation/check-phase-144.mjs` | `scripts/validation/check-phase-144.mjs` | MATCH |
| 7 | `scripts/validation/v1.20-audit-allowlist.json` | `scripts/validation/v1.20-audit-allowlist.json` | MATCH |
| 8 | `scripts/pipeline/build-publish-bundle.mjs` | `scripts/pipeline/build-publish-bundle.mjs` | MATCH |
| 9 | `scripts/pipeline/build-filename-map.mjs` | `scripts/pipeline/build-filename-map.mjs` | MATCH |
| 10 | `scripts/pipeline/filename-map.md` | `scripts/pipeline/filename-map.md` | MATCH |

**Result: 10/10 matched.** Each entry is a bare literal (zero `*`, `?`, `[` characters), so the
match is plain string equality, not glob expansion.

## `carve-gate.mjs` triple at HEAD (post-amendment)

```
carve-gate: base=a7bda73e23efc5e3f9607c3fef37abf8ec4030aa in-scope=106 on-list=106 off-list=0
carve-gate PASS: 106 in-scope path(s), all on-list
```

- in-scope = 106
- on-list = 106
- off-list = 0
- exit code = 0

## Single-file-commit proof (Task 1)

Commit `febd06d4` (`docs(144-01): pre-authorize the closing cluster's new tooling surface`):

- `git show --name-only --format= HEAD | wc -l` → `1` (only `.planning/milestones/v1.20-CARVE.md`)
- `git diff HEAD~1 --numstat -- .planning/milestones/v1.20-CARVE.md` → `21  0  .planning/milestones/v1.20-CARVE.md` (0 deletions, append-only)
- `git show --name-only HEAD | grep -c "v1.20-CARVE.md"` → `1` (the path string appears exactly once — the file-list line — never in the message prose, per D-33)
- `git status --porcelain --untracked-files=all -- scripts .github` → empty (no `scripts/` or `.github/` path created or modified)

## Conclusion

All ten candidate paths are proven on-list by exact match against the amended allowlist. The
amendment commit is single-file, append-only, and does not quote the CARVE path in its message
prose. `carve-gate.mjs` reports `off-list=0`, exit `0`. Every `scripts/` path Phase 144's later
plans create or edit is pre-authorized.
