# Phase-100 Hand-Off: check-phase-98.mjs Needle Spec

> **Note:** This file is the Phase-100 executor's input for authoring `check-phase-98.mjs` as part of the indivisible Atom 2 commit (HARN-02). Phase 98 itself authors NO validator (D-04 LOCKED). Do not create `scripts/validation/check-phase-98.mjs` until Phase 100.

---

## Stable-Token Needle Inventory for Phase-100 Hand-Off

All tokens below are confirmed present verbatim by grep on 2026-06-29. [VERIFIED: codebase grep]

### Guide 07 Needles (ACC-03 + TS-01/02/03 + DEP-03) — `docs/admin-setup-macos/07-platform-sso-setup.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| DEP03-N1 | `com.microsoft.CompanyPortalMac.ssoextension` | FOUND | Lines 148, 234, 252, 256, 263, 282 — Extension Identifier correct value (TS-01 typo anchor); 6 occurrences |
| DEP03-N2 | `Enable Registration During Setup` | FOUND | Lines 25, 286, 396 — setting name in Registration Approach + TS-03 A1-bisect + Advanced section; 10 total occurrences |
| DEP03-N3 | `5.2604.0` | FOUND | Lines 37, 127, 278, 380 — A2 Company Portal version floor; 8 occurrences |
| DEP03-N4 | `com.microsoft.CompanyPortalMac` | FOUND | Lines 257, 289, 386 (and others) — Company Portal app bundle ID (Included apps list, ADE Prerequisites table); present as substring of .ssoextension token — see precision note below |
| DEP03-N5 | `Non Platform SSO Accounts` | FOUND | Lines 159, 186, 339 — setting name; 7 occurrences |
| DEP03-N6 | `AccountShortName` | FOUND | Lines 65, 153, 181, 182 — token name in settings table and Account Name mapping; 6 occurrences |
| DEP03-N7 | `Configuration-Caused Failures` | FOUND | Line 223 — H2 section heading (TS-01 home) |
| DEP03-N8 | `ADE Path Prerequisites` | FOUND | Lines 375, 289 — sub-heading and anchor reference (TS-02 augmentation target); 3 occurrences |
| DEP03-N9 | `Registration Approach: Decision and Alternatives` | FOUND | Lines 17, 335 — H2 section heading and internal anchor ref; 4 occurrences |
| DEP03-N10 | `End-User Sign-In Experience (Secure Enclave)` | FOUND | Lines 52, 63 — H2 section heading and internal prose ref; 2 occurrences |
| DEP03-N11 | `Setup-Assistant SSO-Extension Diagnostic Tree` | FOUND | Line 271 — TS-03 H2 heading (new in Phase 98-02) |
| DEP03-N12 | `Extension Identifier typo` | FOUND | Lines 236, 250 — TS-01 H3 deep-dive heading text (new in Phase 98-02); 3 occurrences |

---

## Needle Precision Notes for Phase 100

**DEP03-N4 (`com.microsoft.CompanyPortalMac`) vs DEP03-N1 (`com.microsoft.CompanyPortalMac.ssoextension`) — substring caution:**
`com.microsoft.CompanyPortalMac` is a strict substring of `com.microsoft.CompanyPortalMac.ssoextension`. A naïve `content.includes('com.microsoft.CompanyPortalMac')` will match on any line containing either value. Phase 100 must use a structurally-anchored match to avoid double-counting:
- Preferred: match the `| Company Portal Included apps |` table row context, e.g. look for `com.microsoft.CompanyPortalMac` in the ADE Path Prerequisites table region specifically, OR
- Use a regex that requires the token does NOT continue with `.ssoextension`, e.g. `/com\.microsoft\.CompanyPortalMac(?!\.ssoextension)/` (negative lookahead in JS).

**DEP03-N7 (`Configuration-Caused Failures`):** This appears in the H2 heading (`## Configuration-Caused Failures`) and is a unique literal — one occurrence. No precision concern.

**DEP03-N8 (`ADE Path Prerequisites`):** Appears in the `### ADE Path Prerequisites` sub-heading and in the anchor reference `[ADE Path Prerequisites](#ade-path-prerequisites)`. The literal string is stable and uniquely identifying.

**DEP03-N11 (`Setup-Assistant SSO-Extension Diagnostic Tree`):** Appears only in the TS-03 H2 heading introduced in Phase 98-02. Unique and stable.

**DEP03-N12 (`Extension Identifier typo`):** Appears in the TS-01 H3 heading (`### Extension Identifier typo — looping Setup-Assistant sign-in`) and in adjacent prose. For a structurally-anchored match, prefer the full heading string.

**All needles are PRESENCE-only.** Phase 100 must NEVER assert freshness dates (`last_verified`, `review_by`, `2026-06-29`, etc.) — those are time-bombs forbidden by the harness scope rules (Phase 97 D-02; v1.12-milestone-audit.mjs C5/C10/C11). No macOS doc is in any freshness-assertion scope.

---

## Existing Harness Coverage of Guide 07 (Must Stay Green)

| Check | Validator | What it asserts | Impact of Phase 98 edits |
|-------|-----------|----------------|--------------------------|
| V-76-PRESENCE | `scripts/validation/check-phase-76.mjs` | Guide 07 exists and is non-empty (presence-only; restructuring is safe) | Unaffected — file remains non-empty |
| E7 | `scripts/validation/check-phase-81.mjs` | Inbound link string `](07-platform-sso-setup.md)` from guide 03 (path-level, not internal anchors) | Unaffected — Phase 98 edits internal content only; the file path is unchanged |

Phase 98 restructuring and content additions do not break either existing check.

---

## Anchor-Stability Set (Phase-100 Link-Integrity Sweep Guards These)

The following slugs carry inbound cross-file anchors and were preserved byte-identical throughout Phase 98 (D-03 LOCKED):

| Slug | Heading text (byte-identical) | Inbound from | Internal refs |
|------|-------------------------------|--------------|---------------|
| `#advanced--optional-ade-during-setup-assistant` | `## Advanced / Optional: ADE-during-Setup-Assistant` | guide 01: lines 394, 408 | guide 07: lines 25, 40, 127, 253 |
| `#end-user-sign-in-experience-secure-enclave` | `## End-User Sign-In Experience (Secure Enclave)` | guide 02: line 102; guide 03: line 104 | — |
| `#registration-approach-decision-and-alternatives` | `## Registration Approach: Decision and Alternatives` | guide 07: line 335 (internal) | — |
| `#configuration-caused-failures` | `## Configuration-Caused Failures` | — (no external) | — |

**New anchors added in Phase 98 (not guarded — no existing inbound refs):**
- `#setup-assistant-sso-extension-diagnostic-tree` (TS-03 H2, Phase 98-02)
- `#extension-identifier-typo--looping-setup-assistant-sign-in` (TS-01 H3, Phase 98-02)

---

## Phase-100 Structure Template for `check-phase-98.mjs`

Model: `check-phase-94.mjs` (PRESENCE + content needles; NO chain; SELF dual-invariant), same pattern as `check-phase-97.mjs`.

```
CHAIN_PHASES = []            // lightweight — no chain; chain lives only in apex check-phase-100
CHAIN_SKIP = new Set([])

DELIVERABLE_07 = 'docs/admin-setup-macos/07-platform-sso-setup.md'
```

**Assertion classes:**

| Check ID | Type | Target | Needle / Condition |
|----------|------|--------|--------------------|
| V-98-PRESENCE | PRESENCE | DELIVERABLE_07 | file exists + non-empty |
| V-98-CONTENT-N1 | CONTENT | DELIVERABLE_07 | `com.microsoft.CompanyPortalMac.ssoextension` |
| V-98-CONTENT-N2 | CONTENT | DELIVERABLE_07 | `Enable Registration During Setup` |
| V-98-CONTENT-N3 | CONTENT | DELIVERABLE_07 | `5.2604.0` |
| V-98-CONTENT-N4 | CONTENT | DELIVERABLE_07 | `com.microsoft.CompanyPortalMac` (anchored — see substring caution above) |
| V-98-CONTENT-N5 | CONTENT | DELIVERABLE_07 | `Non Platform SSO Accounts` |
| V-98-CONTENT-N6 | CONTENT | DELIVERABLE_07 | `AccountShortName` |
| V-98-CONTENT-N7 | CONTENT | DELIVERABLE_07 | `Configuration-Caused Failures` |
| V-98-CONTENT-N8 | CONTENT | DELIVERABLE_07 | `ADE Path Prerequisites` |
| V-98-CONTENT-N9 | CONTENT | DELIVERABLE_07 | `Registration Approach: Decision and Alternatives` |
| V-98-CONTENT-N10 | CONTENT | DELIVERABLE_07 | `End-User Sign-In Experience (Secure Enclave)` |
| V-98-CONTENT-N11 | CONTENT | DELIVERABLE_07 | `Setup-Assistant SSO-Extension Diagnostic Tree` |
| V-98-CONTENT-N12 | CONTENT | DELIVERABLE_07 | `Extension Identifier typo` |
| V-98-SELF | SELF | in-file | CHAIN_PHASES excludes 98; CHAIN_SKIP.size === 0 |

**Total checks:** 1 PRESENCE + 12 CONTENT + 1 SELF = 14 checks.

**No freshness assertion** — never assert `last_verified` or `review_by` values (time-bomb; no macOS doc is in any freshness-assertion scope per v1.12-milestone-audit.mjs C5/C10/C11).

**No allowlist / sidecar** — hard-assert all 13 content+presence checks (mirrors C16 empty `c16_missing_endpoint_exemptions: []` precedent from check-phase-94).

**CRLF normalization:** apply `.replace(/\r\n/g, '\n')` before needle test (Windows-safe, as in all existing validators).

**Substring-caution implementation for N4:** Use `/com\.microsoft\.CompanyPortalMac(?!\.ssoextension)/` in JavaScript (or equivalent structural anchor) to avoid false positive from the `.ssoextension` lines.

---

*Phase: 98-guide-07-comprehensive-pass*
*Spec recorded: 2026-06-29*
*Validator authored: Phase 100 (HARN-02 Atom 2 — indivisible commit)*
