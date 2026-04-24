#!/usr/bin/env bash
# Pre-commit hook: fast JSON-parse check on audit allow-list sidecars.
# Install (manual, per-developer): cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
# Rationale: catches typos in sidecar JSON before push (Phase 43 D-08 pre-commit tier).

set -e

SIDECARS=(
  "scripts/validation/v1.4-audit-allowlist.json"
  "scripts/validation/v1.4.1-audit-allowlist.json"
)

for sidecar in "${SIDECARS[@]}"; do
  if [ -f "$sidecar" ]; then
    # Use node (portable across Windows Git Bash + macOS + Linux) instead of jq (not universally installed).
    if ! node -e "JSON.parse(require('fs').readFileSync('$sidecar', 'utf8'))" 2>/dev/null; then
      echo "FAIL: $sidecar is not valid JSON" >&2
      exit 1
    fi
  fi
done

echo "pre-commit: audit allow-list JSON parse OK"
exit 0
