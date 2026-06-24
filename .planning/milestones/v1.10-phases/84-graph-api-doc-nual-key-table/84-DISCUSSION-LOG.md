# Phase 84: Graph API Doc + NUAL Key Table - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-23
**Phase:** 84-graph-api-doc-nual-key-table
**Areas discussed:** Graph doc shape, Automation depth (+ HTTP/SDK lead), NUAL key table, Glossary integration
**Method:** User selected all 4 areas and directed adjudication via `/adversarial-review` (Finder → Adversary → Referee, Opus). Finder self-score 170; Adversary +8 (one successful disprove); Referee delivered final calibrated verdicts. User then chose "Lock all & continue".

---

## Area 1 — Graph doc shape (`11-graph-api-platform-credential.md`)

| Option | Description | Selected |
|--------|-------------|----------|
| 1a | Suite-anchored guide format — reuse all guide-10 anchors (incl. Configuration-Caused Failures + Settings-Catalog-style body) | |
| 1b | API-reference shape — resource → operations → permissions matrix, minimal narrative, no setup-guide anchors | |
| 1c | Hybrid — keep mandatory shared anchors (frontmatter, Platform-gate, Prerequisites, Verification, See Also, version table) but operations-reference body | ✓ |

**User's choice:** 1c (via adversarial review — Finder won, Adversary confirmed, Referee HIGH).
**Notes:** Matches Phase 83 D-05/D-07 hybrid precedent that guide 10 shipped. 1a rejected: forces a Settings-Catalog/config body onto a Graph API (the error D-05 rejected). 1b disproved (CRITICAL): drops the `## See Also`/`[!WARNING]` anchors SC#5 + PITFALLS G-2 require and breaks the cross-link harness.

---

## Area 2 — Automation example depth + primary surface

| Option | Description | Selected |
|--------|-------------|----------|
| 2a | Minimal — single dry-run (`-WhatIf`) Delete snippet only | |
| 2b | Fuller — leaver pattern + bulk-audit (enumerate users with 0 registrations) | |
| 2c | Middle — leaver/offboarding pattern with mandatory dry-run; no bulk-audit | ✓ |

**User's choice:** 2c (Finder won, Adversary confirmed, Referee HIGH).
**Notes:** 2a under-delivers the leaver pattern FEATURES calls the "most common automation use case." 2b's bulk-audit is HIGH complexity and duplicates Phase 85 RUN-02 (runbook #29) — scope balloon rejected.

### Sub-question — HTTP vs PowerShell SDK as primary lead

| Option | Description | Selected |
|--------|-------------|----------|
| PowerShell SDK primary | Lead with `Microsoft.Graph.Identity.SignIns` cmdlets; HTTP secondary | |
| HTTP primary | Lead with raw Graph REST (canonical/verifiable); SDK co-equal companion | ✓ |

**User's choice:** HTTP primary, SDK co-equal companion.
**Notes:** ⚠️ This OVERTURNS the Finder's SDK-primary suggestion. The Adversary disproved it (+8): no artifact establishes a primary/secondary ordering; SC#1 lists "HTTP **and** PowerShell SDK" co-equal with HTTP named first; GRAPH-01 introduces the SDK with "and" (additive); canonical Microsoft-Learn-verifiable endpoints (G-1) are written as HTTP; and the dry-run requirement is dual-track (G-2 accepts `-WhatIf` OR `--dry-run`), so SDK-native `-WhatIf` does not elevate the SDK. Referee upheld HIGH. Both surfaces remain mandatory (GRAPH-01).

---

## Area 3 — NUAL key presentation in guide 08 (replacing the deferred blockquote)

| Option | Description | Selected |
|--------|-------------|----------|
| 3a | Extend existing 3-row table with an added "MDM plist key" column (pure additive) | |
| 3b | Add a separate dedicated verified-key-literal table below the existing one | |
| 3c | Replace with one consolidated table (display name + plist key + type/values + one-time-vs-persistent) | ✓ |

**User's choice:** 3c (Finder won, Adversary confirmed, Referee HIGH).
**Notes:** Decisive evidence: `08-auth-methods-deep-dive.md:275` currently shows `New User Authorization Mode | Enum (Standard / Admin / Groups)` — it OMITS `Temporary`, which the LOCKED literals require. A pure additive 3a leaves that factual error; 3b's second table trips PITFALLS N-2 (two-table redundancy, CRITICAL). 3c corrects the cell + carries all four SC#3 must-surface items in one table. Deferred blockquote (lines 278–286) must be removed, not appended to (SC#4, closes PSSO-FUT-01).

---

## Area 4 — Glossary integration (SC#5 either/or)

| Option | Description | Selected |
|--------|-------------|----------|
| 4a | New dedicated "Platform Credential Graph API" glossary term | |
| 4b | Extend the existing Platform SSO / Secure Enclave Platform Credential term with a see-also to guide 11 | ✓ |

**User's choice:** 4b (Finder won, Adversary confirmed, Referee MED-HIGH).
**Notes:** Matches the glossary's D-15 reciprocal-`> See also:` convention (lines 128/140/146/158). The credential is already defined under the Platform SSO + Secure Enclave terms, so a new standalone term (4a) would be partly redundant. Closest call of the four — 4a remains defensible under SC#5's either/or; a short dedicated stub is an acceptable fallback if the see-also host proves awkward at plan time.

---

## Claude's Discretion

- Exact section ordering within the operations body, callout wording, table column layout, and which guide-10 anchors to carry vs drop — left to planner/executor, subject to the suite anchors (D-01) and must-surface items (D-05).

## Deferred Ideas

- Bulk-audit / enumerate-users-with-0-registrations reporting → Phase 85 RUN-02 (runbook #29).
- macOS capability-matrix Graph-credential rows → Phase 85 REF-01.
- Reciprocal `_glossary.md` (Windows) see-also + 4-platform comparison cell updates → Phase 85 REF-02.
- Navigation-hub / `quick-ref-l2.md` entries → Phase 87.
- Create/Update Graph operations (do not exist — device-initiated only); scripting credential *creation* (FEATURES anti-feature).

## Cross-cutting action item surfaced during review (feeds Plan 84-01)

🔴 **Endpoint inconsistency in research:** `PITFALLS.md:201`/`:224` writes the DELETE path as `.../platformCredentialAuthenticationMethod/{id}`, but `PITFALLS.md:198-200` (GET) and `FEATURES.md:153-156` use `.../platformCredentialMethods/{methodId}`. The navigation property is `platformCredentialMethods` (the `...AuthenticationMethod` form is the resource TYPE, not the URL segment). The doc must use `platformCredentialMethods` for ALL operations including DELETE; 84-01 must reconcile against live Microsoft Learn before drafting (G-1 guard) and confirm v1.0-not-beta.
