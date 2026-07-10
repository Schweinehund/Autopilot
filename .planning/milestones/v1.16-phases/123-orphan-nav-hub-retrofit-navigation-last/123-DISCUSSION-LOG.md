# Phase 123: Orphan Nav-Hub Retrofit (Navigation-Last) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-08
**Phase:** 123-orphan-nav-hub-retrofit-navigation-last
**Areas discussed:** Link-integrity rigor, Blockquote #12 reflow, Fork + registry order, Summary sourcing shape

**Method:** User selected all 4 gray areas and directed: "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning." Each area resolved via a Proponent → Adversary → Referee panel of three separate Opus agents grounded in the live repo (12 agents total). **3 of 4 Proponent recommendations were OVERRULED on grounded evidence.**

---

## GA-1 — Link/routing-table integrity verification rigor

| Option | Description | Selected |
|--------|-------------|----------|
| A — Automated file+anchor link-checker only | Crawl every link in the 4 hubs; assert file exists AND anchor slug resolves | ✓ |
| B — Adversarial per-hub manual re-derivation only | Agent re-derives each hub's routing table and checks each entry (122 D-01 style) | |
| C — Both | Automated existence gate + manual semantic spot-check on the 121/122-retrofitted subset | |

**Ruling:** A (HIGH). ⚖️ Proponent's C overruled.
**Notes:** Adversary proved via `git blame` that all 12 real broken links (11 `../` over-escapes in quick-ref-l2.md lines 316–373 + 1 dead anchor common-issues.md:360) are **pre-existing** (predate 121/122 by 2+ months) and existence-class — 100% automation-catchable. Manual layer's in-scope target (retrofit anchor-drift) yielded **zero** findings: glossary/index anchors all resolve. Referee added the pivotal ruling that SC2 is a *state assertion*, so the 12 pre-existing breaks MUST be fixed IN Phase 123 (separate git-blame-attributed commits), not deferred to 124; and specified the checker must honor `{#id}` (87 exist — memory "no {#id}" is false outside glossaries), double-hyphen slugs, and inbound-to-hub links.

---

## GA-2 — C17 #12 over-length callout reflow shape

| Option | Description | Selected |
|--------|-------------|----------|
| A — Split into separate blank-line-separated callout blocks | Word-preserving; each block independently ≤200c | ✓ (11 of 13) |
| B — Lead callout + demote overflow to prose | Keep ≤200c `>` lead, move trailing sentences to a paragraph | |
| C — Tighten wording in place | Editorially compress each callout to ≤200c | (FORBIDDEN) |
| (Adversary alt) — Full de-blockquote to bold-led paragraph | Drop `>`, keep `⚠️`+bold; D-05 option 2 | ✓ (2 ⚠️ callouts) |

**Ruling:** A-split for the 11 multi-sentence callouts + full de-blockquote for the 2 `⚠️` single-sentence ownership pointers (quick-ref-l2.md:320, :371). Reject C. HIGH. ⚖️ Proponent's "Option B" overruled.
**Notes:** C is FORBIDDEN by mandatory word-preserving policy (116-CONTEXT.md:137, carried to v1.16 at 121-CONTEXT.md:112). Proponent's "Option B" was mislabeled — the 2 ⚠️ callouts are single atomic sentences (no trailing sentences to demote), and A-split cuts them between subject-list and verb. Adversary's de-blockquote (D-05's second sanctioned move) is the clean word-preserving fix. Zero coupling with GA-1 (callouts have no heading slug).

---

## GA-3 — Retrofit fork strategy + #12 placement + registry order

| Option | Description | Selected |
|--------|-------------|----------|
| A — Extend `retrofit-reference.mjs` in place | Add 4 nav-hub paths to its allowlist | |
| B — New fork from `retrofit-structural.mjs` (Phase 121) | Proponent's pick — has v1.16 literal | |
| (Adversary alt) — New fork from `retrofit-mermaid-structural.mjs` (Phase 122, chain tip) | Also v1.16, PLUS both DEFER-121-07 fixes | ✓ |

**Ruling:** New fork from `retrofit-mermaid-structural.mjs` (Phase 122). HIGH (0.9). ⚖️ Proponent's fork-from-121 overruled.
**Notes:** Both 121 and 122 carry the v1.16 VH literal (Proponent's differentiator was void). The 122 tip is a strict superset — auto-filled VH date (closes DEFER-121-07-A), doc_id idempotency guard (closes DEFER-121-07-B), harmless mermaid-absence gate. All 122 router Sets + keyless-platform guard are inert on nav-hubs (`platform: all`). Fork-not-extend upheld (6th consecutive). #12 hand-applied (envelope-injection only). RE-218…221 path-alphabetical, all Approved; VH = PREPEND 3-col. Hazard: scope `--all` to `NAV_HUB_PATHS` or it noisily re-errors enrolled files.

---

## GA-4 — `## Summary` sourcing shape for nav-hubs

| Option | Description | Selected |
|--------|-------------|----------|
| A — Net-new ≥30-word scope Summary above existing intro | Strict D3-A; RE-142 exemplar shape | ✓ |
| B — Repurpose/lift existing intro or coverage blockquote | Fewer net-new words | |

**Ruling:** A confirmed (VERY HIGH). Decision STATUS = **foreclosed by lock** (D3-A/D-03 net-new is LOCKED), not a live pick. ✅ Upheld.
**Notes:** Adversary corrected the rejection basis: B is *physically feasible* (all 4 hubs carry a liftable "Platform coverage" blockquote), but rejected on LOCK + chunk-poison (those blockquotes hold the exact [APv1 vs APv2]/[Windows vs macOS] see-also links D-03 named as poison) — NOT on "no intro prose" or "26<30 words" (true but not load-bearing; recording them would let a future editor reopen B). Operative: net-new scope Summary as first H2 on all 4, retain intro/blockquote relocated below per D3-A (links survive for SC2), wording = author discretion.

---

## Claude's Discretion

- Exact prose of each net-new `## Summary` (≥30 words scope statement) — layout + sourcing rule fixed, sentences not.
- `common-issues.md:360` dead-anchor remediation (repoint vs. remove the macOS row) — content decision at fix-time.
- Plan/wave decomposition (fork run → hand #12 splits → Summary authoring → link-checker → pre-existing-rot fixes) — planner's call, sequential-on-main-tree.
- Whether the link-checker is a net-new `scripts/validation/` script or an extension of existing slug tooling — planner/researcher's call; the checker SPEC is fixed.

## Deferred Ideas

- Fold the GA-1 link-checker into C17 as a 14th assertion — future HARN lever, out of the v1.16 frozen-harness envelope.
- Descriptive-filename rename pass (Phase 124) will re-touch nav-hub targets; keep the link-checker re-runnable.
- Whole-class enrollment of `operations/`, `device-operations/`, `cross-platform/apple-business/` → v1.17+ (quick-ref-l2 links into existing-but-unenrolled `operations/` files).
