# Phase-100 Hand-Off: check-phase-99.mjs Needle Spec

> **Note:** This file is the Phase-100 executor's input for authoring `check-phase-99.mjs` as part of the indivisible Atom 2 commit (HARN-02). Phase 99 itself authors NO validator. Do not create `scripts/validation/check-phase-99.mjs` until Phase 100.

---

## Stable-Token Needle Inventory for Phase-100 Hand-Off

All tokens below are confirmed present verbatim by grep on 2026-06-29. [VERIFIED: codebase grep against the seven committed deliverable files]

### Runbook #37 Needles — `docs/l1-runbooks/37-macos-local-password-reset.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| N1 | File path `docs/l1-runbooks/37-macos-local-password-reset.md` exists | FOUND | New file created in Phase 99-01; confirmed via filesystem check |
| N2 | `audience: L1` | FOUND | Frontmatter line 5; mirrors #35/#36 exactly |
| N3 | `platform: macOS` | FOUND | Frontmatter line 6; mirrors #35/#36 exactly |
| N4 | `applies_to: ADE` | FOUND | Frontmatter line 4; mirrors #35/#36 exactly |
| N16 | `does NOT reset the independent local macOS password` | FOUND | SSPR clarification fragment at Steps preamble (line 26); inline-fact-plus-cross-link per D-03; stable substring of the longer clarification sentence |
| N17 | `](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration` | FOUND | Hand-off callout text at end of each recovery path; appears 3 times (Path A line 67, Path B line 105, Path C line 134) — Phase 100 must assert count >= 3 |
| N18 | `](36-macos-secure-enclave-key.md)` | FOUND | Hand-off link to #36 within #37 body; appears 4 times total (trigger paragraph line 15 + 3 path callouts) — stable marker confirming the hand-off seam exists; N17 is the more structurally-anchored form |

### 00-Index Needle — `docs/l1-runbooks/00-index.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| N5 | `](37-macos-local-password-reset.md)` | FOUND | macOS ADE Runbooks table row link (line 50); same file context as #35/#36 rows at lines 48-49 |

### docs/index.md Needle — `docs/index.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| N6 | `](l1-runbooks/37-macos-local-password-reset.md)` | FOUND | Inline link within the line-110 macOS Platform SSO Runbooks row; the row was extended — existing `[macOS Platform SSO Runbooks]` link text and `#macos-ade-runbooks` anchor preserved byte-identical |

### common-issues.md Needles — `docs/common-issues.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| N7 | `](l1-runbooks/37-macos-local-password-reset.md)` | FOUND | L1 bullet link within the "macOS Local Password: User Locked Out" H3 (line 246); H3 slug is `#macos-local-password-user-locked-out` |
| N8 | `](l2-runbooks/27-macos-sso-investigation.md)` | FOUND | L2 escalation link within the same H3 (line 247); the same L2 #27 that #36 routes to at 36:86 — confirms escalation wiring matches the documented pattern |

### quick-ref-l1.md Needles — `docs/quick-ref-l1.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| N9 | `](l1-runbooks/37-macos-local-password-reset.md)` | FOUND | Escalation trigger bullet (line 103): "User cannot log in — local password lost or unknown"; distinct trigger wording vs. existing #36 trigger at line 101 |
| N10 | `](l1-runbooks/37-macos-local-password-reset.md)` | FOUND | macOS Runbooks list bullet (line 119): "macOS Local Password Recovery — local password lost or unknown; locked out of Mac" |

### 06-macos-triage.md Needles — `docs/decision-trees/06-macos-triage.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| N11 | `MACR9` | FOUND | New MAC3 leaf node id in the Mermaid diagram (line 48); confirms the node was added |
| N12 | `click MACR9` | FOUND | Click target directive (line 60); confirms the node has a navigable link |
| N13 | `../l1-runbooks/37-macos-local-password-reset.md` | FOUND | Click target URL body (line 60); together with N12 forms the full click target `click MACR9 "../l1-runbooks/37-macos-local-password-reset.md"` |
| N14 | `Runbook 37` | FOUND | Routing-Verification table row (line 86): "Local password — locked out | Setup Assistant? Yes | Symptom: local password | Runbook 37" |

### #36 Reciprocal Cross-Link Needle — `docs/l1-runbooks/36-macos-secure-enclave-key.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| N15 | `](37-macos-local-password-reset.md)` | FOUND | Reciprocal cross-link line (line 15): one back-link line only; no restructuring of #36; same file as N5's `](37-macos-local-password-reset.md)` token — different file context; structurally-anchored match required (see precision notes below) |

---

## Needle Precision Notes for Phase 100

**N5 (`](37-macos-local-password-reset.md)`) vs N15 (`](37-macos-local-password-reset.md)`) — same token, different files:**
Both N5 (in `00-index.md`) and N15 (in `36-macos-secure-enclave-key.md`) use the identical literal string `](37-macos-local-password-reset.md)`. Phase 100 must needle each against its specific DELIVERABLE constant — do not use a cross-file search that could count N5's match as satisfying N15 or vice versa.

**N9 and N10 (`](l1-runbooks/37-macos-local-password-reset.md)`) — two occurrences in `quick-ref-l1.md`:**
Both tokens are present in `docs/quick-ref-l1.md`. A naïve `content.includes(...)` will return true if either is present, but a count-based assertion `(content.match(...) || []).length >= 2` is stronger and confirms both the escalation trigger bullet AND the runbook list bullet exist. Phase 100 may implement this as two structurally-anchored checks (assert the escalation-trigger context AND the runbook-list context independently) or as a count >= 2 assertion.

**N7 and N8 — H3 slug note:**
The containing H3 heading is `### macOS Local Password: User Locked Out`, producing GitHub slug `#macos-local-password-user-locked-out`. Phase 100 may optionally add a structural anchor assertion for this slug (e.g., require the heading text to contain `macOS Local Password: User Locked Out`) to confirm the H3 was not renamed. This is supplemental to N7/N8.

**N17 — count assertion:**
The hand-off text `](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration` must appear exactly 3 times in `37-macos-local-password-reset.md` — once per recovery path. Phase 100 should assert `count === 3`.

**N18 — N17 relationship:**
N18 (`](36-macos-secure-enclave-key.md)`) is a strict substring of N17. Do not assert N18 independently if N17 is already needled; use N17 (more specific) as the primary content needle. N18 is recorded here so Phase 100 knows the #37→#36 seam exists and how many times it appears (4 occurrences total: line 15 trigger paragraph + 3 path callouts).

**All needles are PRESENCE-only.** Phase 100 must NEVER assert freshness dates (`last_verified`, `review_by`, `2026-06-29`, `2026-09-29`, etc.) — those are time-bombs forbidden by the harness scope rules (Phase 97 D-02; v1.12-milestone-audit.mjs C5/C10/C11). No macOS doc is in any freshness-assertion scope.

**CRLF normalization:** apply `.replace(/\r\n/g, '\n')` before needle tests (Windows-safe, as in all existing validators).

---

## Existing Harness Coverage of Phase-99 Files (Must Stay Green)

| Check | Validator | What it asserts | Impact of Phase 99 edits |
|-------|-----------|----------------|--------------------------|
| (check for 00-index inbound link) | `scripts/validation/check-phase-81.mjs` or similar | Inbound link to `36-macos-secure-enclave-key.md` from hub files | Unaffected — Phase 99 adds to these files; existing link strings are byte-identical |
| (check for triage-tree click targets) | `scripts/validation/check-phase-81.mjs` or similar | `click MACR8 "../l1-runbooks/36-macos-secure-enclave-key.md"` in 06-macos-triage.md | Unaffected — MACR8 click target preserved byte-identical; MACR9 is a new addition |
| (presence check for existing runbooks) | Apex check-phase-100.mjs (chain) | All prior-phase deliverables present | Unaffected — all seven Phase-99 files are non-destructive additions |

Phase 99's additive edits (append-only rows, bullets, callouts, new leaf node) do not break any existing check. The only file with structural risk is `06-macos-triage.md` — confirmed that `click MACR8` at line 56 and `class MACR1,...,MACR6,MACR9 resolved` (MACR7/MACR8 on separate line 64) are both preserved byte-identical.

---

## Anchor-Stability Set (Phase-100 Link-Integrity Sweep Guards These)

The following anchors were preserved byte-identical by Phase 99 (existing inbound references must not break):

| Slug | Heading text (byte-identical) | Inbound from | Phase 99 impact |
|------|-------------------------------|--------------|----------------|
| `#macos-ade-runbooks` | `## macOS ADE Runbooks` | `docs/index.md` line 110 (`#macos-ade-runbooks`); `docs/quick-ref-l1.md` | Preserved — #37 row appended after existing rows; heading byte-unchanged |
| `#platform-sso--secure-enclave-key-loss` (or equivalent #36 H1) | H1 of `36-macos-secure-enclave-key.md` | `docs/decision-trees/06-macos-triage.md` line 56 (MACR8 click); `docs/quick-ref-l1.md` line 101/117; `docs/index.md` line 110 | Preserved — #36 received only one appended reciprocal-link line at line 15; no heading changes |

**New anchors added in Phase 99 (no existing inbound refs to guard):**
- `#macos-local-password-recovery-secure-enclave-psso-devices` — H1 of `docs/l1-runbooks/37-macos-local-password-reset.md` (Phase 99-01)
- `#macos-local-password-user-locked-out` — H3 in `docs/common-issues.md` (Phase 99-02)

---

## Phase-100 Structure Template for `check-phase-99.mjs`

Model: `check-phase-97.mjs` and `check-phase-98.mjs` (PRESENCE + CONTENT needles; NO chain; SELF dual-invariant).

```
CHAIN_PHASES = []            // lightweight — no chain; chain lives only in apex check-phase-100
CHAIN_SKIP = new Set([])

DELIVERABLE_37  = 'docs/l1-runbooks/37-macos-local-password-reset.md'
DELIVERABLE_36  = 'docs/l1-runbooks/36-macos-secure-enclave-key.md'
DELIVERABLE_00IDX = 'docs/l1-runbooks/00-index.md'
DELIVERABLE_IDX = 'docs/index.md'
DELIVERABLE_CI  = 'docs/common-issues.md'
DELIVERABLE_QR  = 'docs/quick-ref-l1.md'
DELIVERABLE_06  = 'docs/decision-trees/06-macos-triage.md'
```

**Assertion classes:**

| Check ID | Type | Target | Needle / Condition |
|----------|------|--------|--------------------|
| V-99-PRESENCE-37 | PRESENCE | DELIVERABLE_37 | file exists + non-empty (N1) |
| V-99-PRESENCE-36 | PRESENCE | DELIVERABLE_36 | file exists + non-empty |
| V-99-PRESENCE-00IDX | PRESENCE | DELIVERABLE_00IDX | file exists + non-empty |
| V-99-PRESENCE-IDX | PRESENCE | DELIVERABLE_IDX | file exists + non-empty |
| V-99-PRESENCE-CI | PRESENCE | DELIVERABLE_CI | file exists + non-empty |
| V-99-PRESENCE-QR | PRESENCE | DELIVERABLE_QR | file exists + non-empty |
| V-99-PRESENCE-06 | PRESENCE | DELIVERABLE_06 | file exists + non-empty |
| V-99-CONTENT-N2 | CONTENT | DELIVERABLE_37 | `audience: L1` |
| V-99-CONTENT-N3 | CONTENT | DELIVERABLE_37 | `platform: macOS` |
| V-99-CONTENT-N4 | CONTENT | DELIVERABLE_37 | `applies_to: ADE` |
| V-99-CONTENT-N16 | CONTENT | DELIVERABLE_37 | `does NOT reset the independent local macOS password` |
| V-99-CONTENT-N17 | CONTENT | DELIVERABLE_37 | `](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration` (count >= 3) |
| V-99-CONTENT-N5 | CONTENT | DELIVERABLE_00IDX | `](37-macos-local-password-reset.md)` |
| V-99-CONTENT-N6 | CONTENT | DELIVERABLE_IDX | `](l1-runbooks/37-macos-local-password-reset.md)` |
| V-99-CONTENT-N7 | CONTENT | DELIVERABLE_CI | `](l1-runbooks/37-macos-local-password-reset.md)` |
| V-99-CONTENT-N8 | CONTENT | DELIVERABLE_CI | `](l2-runbooks/27-macos-sso-investigation.md)` (in the macOS Local Password H3 context) |
| V-99-CONTENT-N9 | CONTENT | DELIVERABLE_QR | `](l1-runbooks/37-macos-local-password-reset.md)` (count >= 2, covering both N9 escalation-trigger and N10 runbook-list occurrences) |
| V-99-CONTENT-N11 | CONTENT | DELIVERABLE_06 | `MACR9` |
| V-99-CONTENT-N12 | CONTENT | DELIVERABLE_06 | `click MACR9` |
| V-99-CONTENT-N13 | CONTENT | DELIVERABLE_06 | `../l1-runbooks/37-macos-local-password-reset.md` |
| V-99-CONTENT-N14 | CONTENT | DELIVERABLE_06 | `Runbook 37` |
| V-99-CONTENT-N15 | CONTENT | DELIVERABLE_36 | `](37-macos-local-password-reset.md)` |
| V-99-SELF | SELF | in-file | CHAIN_PHASES excludes 99; CHAIN_SKIP.size === 0 |

**Total checks:** 7 PRESENCE + 15 CONTENT + 1 SELF = 23 checks.

**Notes on N9/N10 consolidation:** V-99-CONTENT-N9 covers both N9 and N10 with a count >= 2 assertion (both are `](l1-runbooks/37-macos-local-password-reset.md)` in `quick-ref-l1.md`). Phase 100 may split into two structurally-anchored checks if independent verification of the escalation-trigger context vs. the runbook-list context is desired; if so, total checks become 24.

**No freshness assertion** — never assert `last_verified` or `review_by` values (time-bomb; no macOS doc is in any freshness-assertion scope per v1.12-milestone-audit.mjs C5/C10/C11).

**No allowlist / sidecar** — hard-assert all presence and content checks.

**CRLF normalization:** apply `.replace(/\r\n/g, '\n')` before each needle test.

**Substring-caution for N8 in common-issues.md:** `](l2-runbooks/27-macos-sso-investigation.md)` appears in multiple existing H3 sections within common-issues.md (not only the new Phase-99 H3). Phase 100 may strengthen this to a structural anchor: assert the token appears in the region following `### macOS Local Password: User Locked Out`, e.g., by extracting the H3's content block before asserting N8. A simpler count-based assertion (count >= 2, since L2 #27 now appears in at least two macOS ADE H3 sections) is also acceptable.

---

*Phase: 99-new-runbook-navigation-wiring*
*Spec recorded: 2026-06-29*
*Validator authored: Phase 100 (HARN-02 Atom 2 — indivisible commit)*
