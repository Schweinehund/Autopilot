# Git Hooks — Audit Harness Integrity

## pre-commit.sh

Fast JSON-parse check on `scripts/validation/v1.4-audit-allowlist.json` and `scripts/validation/v1.4.1-audit-allowlist.json` before each commit.

Runtime: ~100ms (single `node -e` invocation per sidecar).

## Install (one-time per clone)

```bash
cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit   # Git Bash on Windows honors this
```

On PowerShell / cmd (Windows without Git Bash):
```powershell
Copy-Item scripts\hooks\pre-commit.sh .git\hooks\pre-commit
# No chmod needed on NTFS — git respects the hook if a Bash interpreter is on PATH
```

After install, every `git commit` runs the hook. To bypass in an emergency: `git commit --no-verify`.

## Rationale

Phase 43 D-08 tiered enforcement:

- **Pre-commit tier (this hook):** catches typos locally before push (fast — ~100ms)
- **CI tier (`.github/workflows/audit-harness-integrity.yml`):** parse + non-empty + path-match + harness-run
- **Scheduled weekly tier:** catches bitrot from deleted paths (the exact class of bug Phase 43 fixes)

Both tiers run the same parse check so a developer who installs the hook gets fast local feedback; the CI tier is the enforcing gate.

## Why Not Husky / lefthook / pre-commit-framework?

Per RESEARCH §8 "minimum-surface principle":

- Repo is polyglot (PowerShell + Python + Node/TS) with no existing JS dev-tooling dependency on pre-commit frameworks
- Adding Husky as a dep for a single hook violates "smallest surface that does the job"
- Pre-commit hook logic is ~10 lines of shell — native + Git-Bash-on-Windows compat
- Zero new `package.json` dependencies

If the hook inventory grows past ~3 hooks or needs language-specific chains, revisit with Husky or lefthook in a future milestone.

## Uninstall

```bash
rm .git/hooks/pre-commit
```

Hooks in `.git/hooks/` are per-clone and never checked into version control, so uninstall is local-only.
