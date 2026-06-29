# Phase 96: Surgical Conflict Fixes - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-28
**Phase:** 96-surgical-conflict-fixes
**Areas discussed:** Correction style, VPP glossary-term cleanup, Freshness stamps, Glossary Iru depth

**Method:** User selected all four gray areas and directed that each be resolved via `/adversarial-review`
(scored Finder → Adversary → Referee, ground-truth-verified against the live files and validator set).
Scoring trail: Finder surfaced 37 considerations (score 168); Adversary disproved/downgraded 8 incl. 2 inflated
CRITICALs (score +50/110); Referee ruled per option with ground-truth verification. User locked all four as recommended.

---

## Correction style (D-01)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Inline prose rewrite | Rewrite the false-premise sentence; rely on the already-correct note at line 326 | ✓ |
| (b) Add clarifying callout | Add a `> Note:` callout at 309/319 explaining PKG/LOB-only | |

**User's choice:** (a) inline rewrite
**Notes:** Adversary/Referee confirmed line 326 already carries the explanatory note → a second callout would triplicate it. Line 319's "recommended = VPP" premise needs a real rewrite, not a word-swap; line 309 carries the same false claim and is also fixed.

---

## VPP glossary-term cleanup (D-02)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Remove orphaned row + inline link | Delete VPP quick-ref row (~411) and inline `[VPP]` link (309) in guide 00 | ✓ |
| (b) Re-scope the row | Point the row at some remaining legitimate VPP use | |
| (c) Leave defined generically | Keep the row with a generic / blanked stage cell | |

**User's choice:** (a) remove
**Notes:** Re-scope has no valid target post-fix; leave-generic keeps a false "First Appears: Stage 6." Guardrails: never touch the glossary `#vpp` definition (heavy inbound links); keep the See-Also prose at line 382. No validator asserts the row.

---

## Freshness stamps (D-03)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Bump now | Set last_verified/review_by on edited files to 06-28/09-28 | ✓ |
| (b) Defer to Phase 97 | Leave stamps untouched; Phase 97 owns freshness formalization | |

**User's choice:** (a) bump now (edited files only)
**Notes:** Adversary verified repo convention bumps last_verified on scoped edits (glossary Phases 75 & 91). Preserve the +3-month/same-day invariant (06-28→09-28) and add a version-history row. Guide 02 not edited → untouched.

---

## Glossary Iru depth (D-04)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Minimal 3-URL (as replacement) | Replace the false "URL unchanged" sentence with a concise 3-URL role statement | ✓ |
| (b) Fuller verification-note rewrite | Import guide 02's dated HTTP-200/login-gated caveats into the entry | |

**User's choice:** (a) minimal 3-URL replacement
**Notes:** "URL unchanged: support.kandji.io" is now false and must be replaced (append-only would self-contradict). Dated caveats already live in guide 02 (single source of truth) — keep the glossary durable. Body-only edit; bare `### Kandji-Iru` heading/slug preserved.

---

## Claude's Discretion

- Exact wording of the rewritten sentences (D-01, D-04) left to planner/executor, provided locked success criteria and CONTEXT.md implementation notes are met.

## Deferred Ideas

- Full freshness formalization + harness coverage across guides 02/03 → Phase 97.
- Guide 07 VPP conflict + troubleshooting depth → Phase 98.
