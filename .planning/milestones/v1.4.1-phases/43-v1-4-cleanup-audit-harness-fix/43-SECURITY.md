---
phase: 43
slug: v1-4-cleanup-audit-harness-fix
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-24
---

# Phase 43 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

Phase 43 introduces no application surface. Scope is limited to Node.js validation scripts (`scripts/validation/*.mjs`), JSON sidecars (`scripts/validation/*.json`), a GitHub Actions workflow (`.github/workflows/audit-harness-integrity.yml`), a bash pre-commit hook (`scripts/hooks/pre-commit.sh`), and documentation/metadata. No authentication, no session management, no access control, no network endpoints, no user input. ASVS V2/V3/V4/V6 are non-applicable; only V5 (Input Validation) applies.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Developer FS → harness/helper | Local Node.js process reads sidecar JSON + Markdown docs from the working tree | Trusted git-tracked content (sidecar JSON, Android docs) |
| GitHub Actions runner → repo | CI workflow checks out repo + runs harness | Repo contents + ephemeral runner secrets namespace (no secrets used by Phase 43 jobs) |
| Pre-commit hook → staged content | `node -e JSON.parse` validates both sidecars before commit | Staged JSON sidecars |
| Third-party GitHub Actions → workflow | `actions/checkout@v4`, `actions/setup-node@v4`, `actions/github-script@v7` execute in runner | Action code (pinned by major version) |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-43-01 | Tampering | scripts/validation/*.mjs + pre-commit.sh | mitigate | `JSON.parse` in try/catch with graceful-degradation to empty arrays; zero dynamic-code-execution primitives and zero shell-out primitives across all four files (verified by grep against the relevant token names) | closed |
| T-43-02 | Tampering | harness + helper | mitigate | Sidecar values accessed only via hardcoded string keys (`safetynet_exemptions`, `supervision_exemptions`, `cope_banned_phrases`); element-level checks use typed `===` comparisons (no dynamic key lookup, no proto-chain traversal) | closed |
| T-43-03 | Tampering | harness + helper | mitigate | All `readFile`/`readFileSync` calls receive hardcoded string literals or output of `walkMd()` which itself iterates a hardcoded root list; sidecar JSON values never flow to path arguments; paths resolved via `join(process.cwd(), relPath)` where `relPath` is trusted | closed |
| T-43-04 | DoS | harness + helper | mitigate | All regex literals bounded with word boundaries (`\b…\b`) or fixed character classes (e.g., `[^)]*` linear); no nested quantifiers (`(a+)+`, `(.*)*`) or catastrophic-backtracking patterns present | closed |
| T-43-05 | Tampering (upstream) | .github/workflows/audit-harness-integrity.yml | mitigate | All third-party actions pinned by major version: `actions/checkout@v4` (×4), `actions/setup-node@v4` (×3), `actions/github-script@v7` (×1); zero unpinned `uses:` references. SHA-pin hardening explicitly deferred to v1.5 milestone (documented in 43-RESEARCH.md §Security Domain). | closed |

*Status: open · closed*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|

No accepted risks. T-43-05's SHA-pin deferral is a planned hardening sweep (v1.5), not an accepted risk — major-version pinning satisfies Phase 43 baseline.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-24 | 5 | 5 | 0 | gsd-security-auditor (Sonnet) |

### Audit 2026-04-24 — Detail

Auditor verified each mitigation by reading the cited files directly:

- **D:/claude/Autopilot/scripts/validation/v1.4-milestone-audit.mjs** — JSON.parse at line 61; zero dynamic-code primitives.
- **D:/claude/Autopilot/scripts/validation/v1.4.1-milestone-audit.mjs** — JSON.parse at line 61; sidecar key access at L145/L172/L335; readFile calls receive hardcoded literals (L201, L222-225) or walkMd output (L90-111); regex literals all bounded.
- **D:/claude/Autopilot/scripts/validation/regenerate-supervision-pins.mjs** — JSON.parse at line 160; same path/regex/key-access discipline as harness.
- **D:/claude/Autopilot/scripts/hooks/pre-commit.sh** — uses `node -e "JSON.parse(...)"` only; no shell-injection vectors.
- **D:/claude/Autopilot/.github/workflows/audit-harness-integrity.yml** — every `uses:` reference pinned to a major version.

Result: SECURED. All 5 threats closed; 0 open.

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log (none)
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-24
