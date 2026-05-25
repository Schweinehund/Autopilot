# Phase 65: Apple Business L1/L2 + Hub Navigation Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 65-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-22
**Phase:** 65-apple-business-l1-l2-hub-navigation-integration
**Areas discussed:** L1 #34 matrix treatment; L2 #26 7-leaf routing; Hub append depth; C16 triangle + check-phase-65.mjs placement
**Method:** Batched `/adversarial-review` (Finder → Adversary → Referee, three independent Opus agents reading shipped Phase 62/63/64 files + validators + research directly) per user-established pattern (mirrors Phase 64 precedent).

---

## Area 1 — L1 #34 (34-apple-business-shared-ipad-passcode-reset.md) treatment of the 3-path matrix

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Full reproduction of the complete 3-path matrix inside L1 #34 | 8 | |
| B | L1-scoped: Path A in full as the L1-executable procedure; Paths B/C as "escalate to L2" pointers + cross-link to canonical `12-` | 2 | ✓ |
| C | Thin link: minimal L1 runbook cross-linking to `12-` for the matrix content | 6 | |

**User's choice:** Option B (adversarial-review unanimous recommendation; user "Lock all as-is").
**Notes:** REQUIREMENTS.md:93 is a hard scope boundary, not a gray area — it requires L1 #34 to document Path A primary and Paths B/C in L2 #26. Option A would import the ABAUDIT-07-exempted "requires Intune RBAC" line (`12-:116-117`) into an L1 doc with no exemption infrastructure → C15 fail. SC#1's "3-path decision matrix with destructive paths gated by L2 approval" is satisfied by *presence + gating*, not reproduction. C16 (`v1.6-milestone-audit.mjs:778-798`) forces the cross-link anyway. L1 read-only convention (`30-:21`) forbids inlining destructive Path C.

---

## Area 2 — L2 #26 (26-apple-business-permission-denied.md) 7-leaf Mermaid tree leaf behavior

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | All 7 leaves terminate with inline remediation | 6 | |
| B | All 7 leaves route to an existing doc (11-18, 01-, 05-) | 7 | |
| C | Hybrid: Apple-Business leaves → existing runbook/admin doc; Intune-scope leaf → out-of-scope C15-safe boundary callout; Account-Holder-lockout → route to `01-role-permission-model.md:39-58` OP-2 callout | 2 | ✓ |

**User's choice:** Option C (adversarial-review unanimous recommendation).
**Notes:** Corpus precedent is hybrid (`docs/decision-trees/07-ios-triage.md` shows both route-via-`click` `:47-52` AND inline-terminating escalation leaves `:41-45`). Intune-scope leaf cannot inline Intune remediation (REQUIREMENTS:89 + D-A8 + C15 regexes at `v1.6-milestone-audit.mjs:847-856`). Pure-A duplicates `01-` SOT (D-04 anti-redundancy). Pure-B fails on the Intune-scope leaf (out-of-scope by invariant). **Adversary correction incorporated:** the Account-Holder-lockout leaf IS routable to OP-2 at `01-:39-58` (Finder's "unsatisfiable" leg was false) — but pure-B still fails on the Intune-scope leaf, so C still wins. Phantom citation `docs/decision-trees/15-ios-ade-token-profile.md:23,27` struck; precedent holds on `07-ios-triage.md` alone.

---

## Area 3 — Hub append content depth (common-issues.md + quick-ref-l1.md + quick-ref-l2.md)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Terse pointer rows everywhere (match minimal existing hub style) | 5 | |
| B | Richer quick-steps across all hub files | 7 | |
| C | Asymmetric: common-issues = symptom→runbook routing table; quick-ref-l1 = L1 passcode-reset quick-steps; quick-ref-l2 = permission-denied quick-triage | 2 | ✓ |

**User's choice:** Option C (adversarial-review unanimous recommendation).
**Notes:** Three hub files have distinct established voices — `common-issues.md:33-58` pure symptom→L1/L2 routing; `quick-ref-l1.md:14-33` task-checks + escalation; `quick-ref-l2.md:14-61` command/event-ID depth. Uniform-A under-serves quick-refs; uniform-B breaks common-issues' voice + duplicates runbooks (D-04). **Adversary correction incorporated:** the Finder's "asymmetry harder to validate" risk was overstated — C16 is substring-presence-only (`v1.6-milestone-audit.mjs:798`); asymmetry costs nothing. Slug `apple-business-quick-reference` (line 780) is load-bearing — the H2 title must slugify exactly to that.

---

## Area 4a — `12-` back-link form

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| Surgical | Surgical mid-doc edit to the "frozen" Phase 64 doc | 6 | |
| Append | Append-only extension of the existing `## Cross-References` tail at `12-:187-194` | 2 | ✓ |

**User's choice:** Append-only (adversarial-review unanimous recommendation).
**Notes:** The `## Cross-References` tail already exists at `12-:187-194` with entries to 01/09/18; appending a 4th bullet shifts NO headings/anchors (PITFALL-6 safe) and matches the doc's own established cross-ref idiom. The edit IS sanctioned by the Phase 62-08 locked removal contract (`62-08-PLAN:464-465`) — the ONE exception to D-A8 outside the 5 hub files. C16 substring `34-apple-business` (line 779) MUST appear in `12-` once the exemption is removed.

---

## Area 4b — `check-phase-65.mjs` placement

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| Ship-65 | Ships in this phase (validator-as-deliverable; chain continuation from 62/63/64) | 2 | ✓ |
| Defer-66 | Defer authoring to Phase 66 | 7 | |

**User's choice:** Ship in Phase 65 (adversarial-review unanimous recommendation).
**Notes:** Per-phase validator-as-deliverable proven by existing chain (check-phase-62.mjs, check-phase-63.mjs, check-phase-64.mjs each shipped in-phase; `STATE.md:103` codifies the pattern). D-22 auditor-independence (`STATE.md:113,126`) requires the Phase 66 terminal re-audit be spawned distinct from content-phase authors. ROADMAP:230,235 "check-phase-62..66.mjs ship as deliverables" is loose roadmap shorthand for the chain LINEAGE; Phase 66 SC#3 "all 5 chain validators PASS" is a RUN/CI assignment, not authoring. Phase 66 authors only `check-phase-66.mjs` + the CI workflow `.yml`.

---

## 🚨 Load-bearing finding — V-64-05 ↔ C16 ATOMIC RECONCILIATION REQUIRED

**Confirmed by adversarial review (Finder + Adversary + Referee independently verified):**
- `check-phase-64.mjs:135-145` V-64-05 asserts `12-` must **NOT** contain `34-apple-business` (correct at Phase 64 close).
- `v1.6-milestone-audit.mjs:779` C16 `admin_12` edge requires `12-` to **CONTAIN** `34-apple-business` once the exemption sunsets (sidecar `v1.6-audit-allowlist.json:82`, `sunset_phase: "64-65"`).
- These are directly contradictory against the final corpus. Once Phase 65 adds the back-link + removes the exemption, V-64-05 fails → ROADMAP:236 "all 5 chain validators PASS" becomes unsatisfiable.

**Required atomic planner action** (indivisible single commit):
1. Add the `34-apple-business` back-link to `12-`'s `## Cross-References` tail.
2. Remove the `admin_12` entry (and 3 other `"65"`-sunset exemptions: l1_34, common_issues#..., quick_ref_l1#...) from `v1.6-audit-allowlist.json`.
3. Flip or retire `check-phase-64.mjs:135-145` V-64-05 — convert the NEGATIVE assertion to a POSITIVE "MUST contain `34-apple-business`" assertion, or formally retire the test with a sunset note.

---

## Claude's Discretion (planner/researcher decides)

- Exact wording of the L2-scope-boundary callout for the Intune-scope leaf (must dodge or ABAUDIT-exempt C15 regexes 1 & 4 at `v1.6-milestone-audit.mjs:847,853`).
- Exact 7-leaf Mermaid tree structure (node ordering, branch decision text, `click` directive syntax). The 7 LEAF identities are LOCKED by DA-9; the tree shape is open.
- L1 #34 "Before escalating, collect:" pattern wording (mirror `30-:188-198`).
- Hub-file append positions (between last content H2 and any `## Version History` H2; PITFALL-6 pre-edit anchor inventory pins this).
- `check-phase-65.mjs` test ID numbering and assertion grain (Path-A copy from `check-phase-64.mjs`; do NOT duplicate C16 logic — V-NN-AUDIT subprocess pattern at `check-phase-64.mjs:316-331`).

## Deferred Ideas

- Dedicated "Account Holder lockout recovery" runbook → v1.7+ (Phase 65 routes to existing OP-2 callout).
- C11 keyword extension + C15 banned-phrase refinement → Phase 66.
- BASELINE_10 refresh, terminal re-audit, `v1.6-MILESTONE-AUDIT.md`, CI workflow, `check-phase-66.mjs` → Phase 66.
- Per-OU CRD partitioning deep-dive + sub-OU nesting > depth 2 → v1.7+.
- Inter-tenant patterns (multiple Apple Business accounts) → out of v1.6 scope.
