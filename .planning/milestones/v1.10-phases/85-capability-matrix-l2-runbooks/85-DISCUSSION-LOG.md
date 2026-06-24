# Phase 85: Capability Matrix + L2 Runbooks - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-23
**Phase:** 85-capability-matrix-l2-runbooks
**Areas discussed:** Matrix row placement & scope, Runbook structure & track model, Graph runbook #29 depth, Glossary + 4-platform comparison shape
**Method:** All four areas adjudicated via `/adversarial-review` (Finder → Adversary → Referee, 3× Opus) at the user's request. Adversary attempted **0 overturns**; Referee confirmed **9/9 sub-decisions**.

---

## Area 1 — Matrix row placement & scope (REF-01, SC#2)

| Option | Description | Selected |
|--------|-------------|----------|
| 1a | Kerberos row(s) under the existing `## Authentication` H2 | ✓ |
| 1b | New `## SSO Extensions` H2 grouping Kerberos (+ Graph credential) | |
| Sub-A: per-feature rows | Match the existing PSSO per-feature table grammar | ✓ |
| Sub-A: consolidated row | Single Kerberos mega-cell | |
| Sub-B: Kerberos-only | Graph credential routed to glossary, not matrix | ✓ |
| Sub-B: include Graph rows | Add Graph Platform Credential rows to the matrix | |

**Choice:** 1a + per-feature rows + Kerberos-only.
**Notes:** `#authentication` is a live anchor cross-linked from `macos-capability-matrix.md:38/:82` and `4-platform-comparison.md:101`; the SC#1 pre-edit anchor-inventory convention discourages a new H2/anchor. The contested point (Sub-B): REF-01's "(+ Graph-managed Platform Credential) rows" parenthetical was probed hardest — Adversary and Referee both ruled the binding SCs govern (SC#2 names only a Kerberos row; SC#3 routes the Graph credential to the glossary "entry or see-also"). A Graph matrix row has no Windows parity cell and duplicates the existing `:111` Platform-Credential entry.

---

## Area 2 — Runbook structure & track model (RUN-01, RUN-02)

| Option | Description | Selected |
|--------|-------------|----------|
| 2a | Follow the `27-macos-sso-investigation.md` Track A/B + numbered-Steps template | ✓ |
| 2b | Lighter linear single-track flow | |
| Sub: L2-entry-only | No "from L1 escalation" routing block | ✓ |
| Sub: L1-routing block | Open with an L1-escalation triage block like #27 | |

**Choice:** 2a + L2-entry-only.
**Notes:** #27 is the adjacent in-suite L2 template; RUN-01/02 + SC#4/5 describe its exact step shape. The L1-routing sub-choice was decided empirically: `docs/l1-runbooks/` was enumerated and contains **no L1 Kerberos and no L1 Graph runbook** — only #35/#36 (both PSSO, both escalating to #27). An L1-routing block in #28/#29 would cite non-existent escalation sources. Nav/triage-tree wiring belongs to Phase 87.

---

## Area 3 — Graph runbook #29 depth (RUN-02)

| Option | Description | Selected |
|--------|-------------|----------|
| 3a | Include bulk-audit / enumerate-users-with-0-registrations examples | |
| 3b | Single-user enumerate/verify/delete + re-register + permission/role; defer bulk-audit | ✓ |

**Choice:** 3b.
**Notes:** Adversary probed whether deferring bulk-audit "further" orphans committed work (84-CONTEXT D-02 said it "belongs to Phase 85 RUN-02"). Resolved: neither SC#5 (`ROADMAP:98`) nor RUN-02 (`REQUIREMENTS:41`) names bulk-audit; the deferral pointer named the closest home but the authored contract scopes to single-credential operations. SC governs over the deferral pointer; bulk-audit is HIGH-complexity (84-CONTEXT:108) and over-documentation discipline forbids unrequired scope. A brief forward/out-of-scope note keeps it tracked.

---

## Area 4 — Glossary + 4-platform comparison shape (REF-02, SC#3)

| Option | Description | Selected |
|--------|-------------|----------|
| 4a | Standalone "Platform Credential (Graph API)" glossary term | |
| 4b | See-also-only (terms already exist); standalone stub = fallback only | ✓ |
| Sub-A | Update `## Single Sign-On` macOS cell → `#authentication` + atomic V-63-09 bump | ✓ |
| Sub-B | Add reciprocal Kerberos/Platform-Credential see-also to Windows `_glossary.md` | ✓ (yes) |

**Choice:** 4b + Sub-A + Sub-B (yes).
**Notes:** Both macOS terms SC#3 needs already exist (`_glossary-macos.md:142` Kerberos from P83; `:128` Platform-SSO→guide-11 see-also from P84) — Phase 85 macOS-glossary work is verify-not-recreate. 84-CONTEXT D-07 already rejected the standalone term as redundant. Sub-A: editing `4-platform-comparison.md` breaks the V-63-09 blob guard (`f25ff51a…`, `check-phase-63.mjs:230`) — MANDATORY atomic baseline bump. Sub-B: REF-02 literally mandates "(+ reciprocal `_glossary.md` see-also)"; host is the Windows Entra ID SSO term (`_glossary.md:158-162`).

---

## Claude's Discretion

- Exact per-feature Kerberos row labels/count under `## Authentication`.
- Track-A/Track-B split boundaries and step ordering within #28/#29.
- Callout wording; the exact reciprocal-see-also sentence and host term in `_glossary.md`.

## Deferred Ideas

- Graph-managed Platform Credential matrix rows (routed to glossary; not the matrix).
- Standalone "Platform Credential (Graph API)" glossary term (sanctioned fallback only).
- Bulk-audit / enumerate-users-with-0-registrations examples in #29 (forward-note only).
- "From L1 escalation" routing in #28/#29 + nav-hub / common-issues / quick-ref-l2 / decision-tree Kerberos entries → Phase 87.
- Legacy chain-FAIL conversion + new harness files → Phases 86 / 88.
