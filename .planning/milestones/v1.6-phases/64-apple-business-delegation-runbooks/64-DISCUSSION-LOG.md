# Phase 64: Apple Business Delegation Runbooks - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-22
**Phase:** 64-apple-business-delegation-runbooks
**Areas discussed:** Runbook template uniformity, Scope-boundary callout SOT, Required-permission precondition block, Destructive-action gating treatment
**Resolution method:** User requested all four gray areas resolved via `/adversarial-review` (Finder → Adversary → Referee, three independent Opus agents) with scored recommendations + reasoning. Matches the Phase 62/63 precedent and the user's standing adversarial-review-for-gray-areas preference.

---

## GA-1 — Runbook template uniformity

| Option | Description | Selected |
|--------|-------------|----------|
| A | Single fixed skeleton across all 8 (Frontmatter→Required Role/Permission→Prerequisites→Procedure→Verification→Rollback/Caveats→Scope-Boundary callout) | |
| B | Per-action bespoke structure, no enforced skeleton | |
| C | Hybrid — mandatory envelope (frontmatter + Required-Permission + Scope-Boundary + Verification) validator-enforced, body flexible per action | ✓ |

**Adversarial scores:** A=5 / B=9 / **C=2**. Finder C, Adversary CONFIRMED C, Referee +1.
**User's choice:** C (locked all).
**Notes:** C is the shipped house style (verified `06-`/`08-`: identical envelope, divergent bodies). Pure-A would force a Rollback H2 onto `17-` which has none; pure-B is validator-hostile. Envelope is greppable by `check-phase-64.mjs`; bodies are not.

---

## GA-2 — Scope-boundary callout source-of-truth

| Option | Description | Selected |
|--------|-------------|----------|
| A | `18-` is canonical SOT; each runbook callout is a short pointer link (D-04 link-not-copy) | |
| B | Each runbook carries full self-contained boundary prose | |
| C | Hybrid — standardized self-sufficient one-line callout per runbook + "full disambiguation → `18-`" link | ✓ |

**Adversarial scores:** A=6 / B=8 / **C=2**. Finder C, Adversary CONFIRMED C, Referee +1.
**User's choice:** C (locked all).
**Notes:** ROADMAP SC#5 ("every runbook carries an explicit scope-boundary callout") means A's bare pointer under-satisfies "carries." B is the D-04 anti-redundancy violation (8× drift + C15 surface). C matches `07-:128-132` precedent verbatim. `18-` stays the disambiguation-table SOT.

---

## GA-3 — Required-permission precondition block

| Option | Description | Selected |
|--------|-------------|----------|
| A | Name the specific permission only, cite `01-` SOT (minimal) | |
| B | Full block — permission + Sub-Org Admin bundle ref (`04-`) + OU-scope + OP-1/2/3 DENY reminders, every runbook | |
| C | Standardized "Required Role & Permission" block — `01-` permission + OU-scope always; `04-` bundle ref only where action needs it | ✓ |

**Adversarial scores:** A=6 / B=7 / **C=2**. Finder C, Adversary CONFIRMED C, Referee +1.
**User's choice:** C (locked all).
**Notes:** Differential citation verified — `06-` cites `04-` (permission is the bundle headline), `08-` omits it. B forces spurious `04-` cites into `13-/14-/17-` (over-delivery). A drops OU-scope + OP-1/2/3 point-of-use safety.

---

## GA-4 — Destructive-action gating treatment

| Option | Description | Selected |
|--------|-------------|----------|
| A | One standardized reusable "⛔ Destructive — L2 approval required" hard-bordered callout across all destructive paths | |
| B | Per-runbook bespoke inline warnings | |
| C | Hard-bordered callout for irreversible paths only (`12-` Path C) + lighter notes for reversible (`13-`/`14-`) | |
| **Refined-C** | Uniform HARD callout on ALL destructive paths; "⛔ L2 approval required" gate clause ONLY on `12-` Path C (EraseDevice); `13-`/`14-` get hard callouts with OP-6 / OP-5 bodies but NO L2 gate | ✓ |

**Adversarial scores:** Finder C=2 (A=4, B=9); Adversary OVERTURNED → A; Referee calibrated to **Refined-C** (rejected both pure-A and pure-C).
**User's choice:** Refined-C (locked all).
**Notes:** Finder's lighter-Note tier under-warns — OP-5 (transfer) + OP-6 (release) are BOTH HIGH severity (`09-:43-68` shows HIGH risks get hard callouts regardless of preventability). Adversary's uniform "L2-approval" callout over-gates — SC#1 attaches L2-approval to EXACTLY one path (EraseDevice); DELEG-03/04 + SC#2 impose no approval gate on release/transfer. Truth: uniform callout *strength*, path-specific *gate text*. Do not conflate "destructive warning" with "approval gate."

---

## Claude's Discretion

- Exact hard-bordered callout convention (first realized in Phase 64 — `11-` OP-9, `12-` OP-11; forward-referenced 5× in shipped docs but never realized).
- Exact rows for the `15-` OS-eligibility matrix and `14-` 4-cell impact matrix.
- `## Required Role & Permission` block layout (table vs prose).
- Sequential ABAUDIT comment numbering (continues from `ABAUDIT-04`).

## Cross-cutting fixes surfaced (recorded for the planner)

1. **C16 `admin_12 ↔ l1_34` edge** — PHANTOM-as-blocking (Finder over-ranked HIGHEST). Exemption sunsets Phase 65 (`sunset_phase: 64-65`); non-blocking for Phase 64; `12-` should NOT yet carry the `34-` back-link.
2. **C15 "Intune RBAC" in `12-` Path B** — REAL/blocking. Add `ABAUDIT-05` immediately before the banned line.
3. **OP-9 hard-bordered callout forward-refs** — exactly **2** (`02-`, `07-`), not 3 (Finder miscounted).
4. **CI-5** — L1-runbook cap only (Phase 65); imposes no Phase 64 count constraint.
5. **Compound `platform:` frontmatter** — REAL, no fix; use `+` separators.
6. **ABAUDIT exemption is line-pair-scoped** (NEW issue) — harness exempts only the single line after each comment; budget one `ABAUDIT-##` per banned line in `12-/16-/17-/18-` (cheat-sheet table = one per row). `00-overview.md:75` "line(s)" wording is a doc-vs-code mismatch.

## Deferred Ideas

- Per-OU CRD partitioning deep-dive + sub-OU nesting depth > 2 → v1.7+.
- L1 #34 + L2 #26 + hub-navigation integration → Phase 65 (NAVIGATION-LAST).
