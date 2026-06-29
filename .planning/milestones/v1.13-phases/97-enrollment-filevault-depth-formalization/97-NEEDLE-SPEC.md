# Phase-100 Hand-Off: check-phase-97.mjs Needle Spec

> **Note:** This file is the Phase-100 executor's input for authoring `check-phase-97.mjs` as part of the indivisible Atom 2 commit (HARN-02). Phase 97 itself authors NO validator (D-02 LOCKED). Do not create `scripts/validation/check-phase-97.mjs` until Phase 100.

---

## Stable-Token Needle Inventory for Phase-100 Hand-Off (D-03)

All tokens below are confirmed present verbatim by grep on 2026-06-28. [VERIFIED: codebase grep]

### Guide 02 Needles (DEP-01) — `docs/admin-setup-macos/02-enrollment-profile.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| DEP01-N1 | `Non Platform SSO Accounts` | FOUND | Line 76, inside backtick span in callout |
| DEP01-N2 | `Restrict editing` | FOUND | Line 87, in settings table row |
| DEP01-N3 | `Prefill account info` | FOUND | Line 84, in settings table row |
| DEP01-N4 | `{{partialUPN}}` | FOUND | Lines 72, 85, 95, 102 |
| DEP01-N5 | `{{username}}` | FOUND | Lines 86, 95, 102 |

**UPN-via-Full-Name note presence:** Confirmed at line 102 — the note covers both `{{username}}` for full-name display and `{{partialUPN}}` for short name. No separate needle needed beyond DEP01-N4 and DEP01-N5, which together pin the note's substance.

### Guide 03 Needles (DEP-02) — `docs/admin-setup-macos/03-configuration-profiles.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| DEP02-N1 | `FileVault Options` | FOUND | Line 144, sub-payload heading |
| DEP02-N2 | `Recovery Key Escrow` | FOUND | Line 152, sub-payload heading |
| DEP02-N3 | `Defer` | FOUND | Lines 138-141 (multiple); use `\| Defer \|` for exact table-row match or bare `Defer` (ubiquitous) |
| DEP02-N4 | `dontAllowFDEDisable` | FOUND | Line 148, Apple key name in backtick |
| DEP02-N5 | `DestroyFVKeyOnStandby` | FOUND | Line 150, Apple key name in backtick |
| DEP02-N6 | `Recovery Key Rotation In Months` | FOUND | Line 142, settings table row |
| DEP02-N7 | `Local Password Policy` | FOUND | Line 98, section heading `## Local Password Policy (Passcode)` |
| DEP02-N8 | `-2016341107` | FOUND | Line 189, error code in escrow verification section |

**Needle precision notes for Phase 100:**
- DEP02-N3 (`Defer`): the word appears many times. Use `| Defer |` (with surrounding pipe-space) to target the specific settings-table row, or `Defer = Enabled` to target the recommended-baseline sentence. Either is stable; `| Defer |` is more structurally anchored.
- DEP02-N7 (`Local Password Policy`): `## Local Password Policy (Passcode)` is the full heading. The needle `Local Password Policy` will match as a substring of this heading — that is sufficient. Alternatively use the full heading string.
- DEP01-N1 (`Non Platform SSO Accounts`): appears inside `` **`Non Platform SSO Accounts`** `` in the callout at line 76. The literal characters `Non Platform SSO Accounts` are present without backticks or markup in the string.
- DEP02-N8 (`-2016341107`): the dash is a standard ASCII hyphen-minus (U+002D, 0x2d). In shell grep, use `grep -F -- "-2016341107"` (note the `--` separator) to prevent the leading dash from being parsed as a flag. In the JavaScript validator, `content.includes('-2016341107')` works without special handling.

**Existing guide-03 needle (check-phase-81 E7):** `](07-platform-sso-setup.md)` — already asserted by `check-phase-81.mjs` E7. Phase 97 needles must not duplicate or conflict with E7. None of the DEP-02 tokens above overlap with E7.

**Guide-02 coverage:** Guide 02 is WHOLLY UNCOVERED by any existing chain validator. All five DEP01 needles are net-new coverage.

---

## Phase-100 Needle-Spec Hand-Off

> This section is the machine-readable spec that the Phase-100 `check-phase-97.mjs` author must consume. Do not re-derive this list at Phase 100 time — read it here.

### `check-phase-97.mjs` Structure Template

Model: `check-phase-94.mjs` (PRESENCE + content needles; NO chain; SELF dual-invariant).

```
CHAIN_PHASES = []            // lightweight — no chain; chain lives only in apex check-phase-100
CHAIN_SKIP = new Set([])

DELIVERABLE_02 = 'docs/admin-setup-macos/02-enrollment-profile.md'
DELIVERABLE_03 = 'docs/admin-setup-macos/03-configuration-profiles.md'
```

**Assertion classes (mirroring check-phase-94 pattern):**

| Check ID | Type | Target | Needle / Condition |
|----------|------|--------|--------------------|
| V-97-PRESENCE-02 | PRESENCE | DELIVERABLE_02 | file exists + non-empty |
| V-97-PRESENCE-03 | PRESENCE | DELIVERABLE_03 | file exists + non-empty |
| V-97-CONTENT-DEP01-N1 | CONTENT | DELIVERABLE_02 | `Non Platform SSO Accounts` |
| V-97-CONTENT-DEP01-N2 | CONTENT | DELIVERABLE_02 | `Restrict editing` |
| V-97-CONTENT-DEP01-N3 | CONTENT | DELIVERABLE_02 | `Prefill account info` |
| V-97-CONTENT-DEP01-N4 | CONTENT | DELIVERABLE_02 | `{{partialUPN}}` |
| V-97-CONTENT-DEP01-N5 | CONTENT | DELIVERABLE_02 | `{{username}}` |
| V-97-CONTENT-DEP02-N1 | CONTENT | DELIVERABLE_03 | `FileVault Options` |
| V-97-CONTENT-DEP02-N2 | CONTENT | DELIVERABLE_03 | `Recovery Key Escrow` |
| V-97-CONTENT-DEP02-N3 | CONTENT | DELIVERABLE_03 | `| Defer |` |
| V-97-CONTENT-DEP02-N4 | CONTENT | DELIVERABLE_03 | `dontAllowFDEDisable` |
| V-97-CONTENT-DEP02-N5 | CONTENT | DELIVERABLE_03 | `DestroyFVKeyOnStandby` |
| V-97-CONTENT-DEP02-N6 | CONTENT | DELIVERABLE_03 | `Recovery Key Rotation In Months` |
| V-97-CONTENT-DEP02-N7 | CONTENT | DELIVERABLE_03 | `Local Password Policy` |
| V-97-CONTENT-DEP02-N8 | CONTENT | DELIVERABLE_03 | `-2016341107` |
| V-97-SELF | SELF | in-file | CHAIN_PHASES excludes 97; CHAIN_SKIP.size === 0 |

**Total checks:** 2 PRESENCE + 13 CONTENT + 1 SELF = 16 checks.

**No freshness assertion** — never assert `last_verified` or `review_by` values (time-bomb; no macOS doc is in any freshness-assertion scope per v1.12-milestone-audit.mjs C5/C10/C11).

**No allowlist / sidecar** — hard-assert all 15 content+presence checks (mirrors C16 empty `c16_missing_endpoint_exemptions: []` precedent from check-phase-94).

**CRLF normalization:** apply `.replace(/\r\n/g, '\n')` before needle test (Windows-safe, as in all existing validators).

---

*Phase: 97-enrollment-filevault-depth-formalization*
*Spec recorded: 2026-06-28*
*Validator authored: Phase 100 (HARN-02 Atom 2 — indivisible commit)*
