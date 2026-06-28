# Phase 96: Surgical Conflict Fixes - Context

**Gathered:** 2026-06-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Correct four **verified factual errors** already shipped in the macOS docs suite. The *what* is locked by requirements ACC-01, ACC-02, ACC-04, GLOS-01 — this phase only resolves *how* the corrections are applied. Edits must be surgical: minimal, internally-consistent, no operational detail leaking into durable reference content, and **no scope bleed into Phase 97** (which owns enrollment/FileVault depth and freshness formalization).

Targets:
- `docs/macos-lifecycle/00-ade-lifecycle.md` — VPP→PKG/LOB (ACC-01) + device-group→user-group at ~line 250 (ACC-02)
- `docs/l1-runbooks/15-macos-company-portal-sign-in.md` — device-group→user-group remediation (ACC-04)
- `docs/_glossary-macos.md` — Kandji-Iru 3-URL reality (GLOS-01)

</domain>

<decisions>
## Implementation Decisions

All four HOW decisions were resolved via `/adversarial-review` (Finder → Adversary → Referee, ground-truth-verified against the live files and validator set). Recommendations locked by user.

### D-01: Correction style — inline prose rewrite (NOT a second callout)
- ACC-01 fix is an **inline sentence rewrite**, not a word-swap and not an added callout.
- **Rationale:** Line 326 ("Watch Out For") in guide 00 *already* carries the correct explanatory note ("Company Portal is never distributed via Apple VPP / Apps and Books — that channel is iOS/iPadOS only"). A second callout at 309/319 would triplicate the message. Line 319 is built on a false premise ("recommended deployment method is through VPP... Alternatively DMG/PKG") that a word-swap cannot salvage — the sentence must be rewritten so PKG/LOB is the macOS method.
- **Implementation note:** Rewrite the **full sentence at line 319** AND fix **line 309** (its parenthetical "can be deployed via [VPP] (Apps and Books in ABM) for silent installation" repeats the same false macOS-CP-via-VPP claim). Both must align with the already-correct line 326. Re-express the "silent installation" rationale correctly (managed PKG/LOB installs silently for a different reason than VPP licensing) — do not leave a dangling causal claim.

### D-02: VPP glossary-term cleanup — remove the orphaned local references
- **Remove** the "Glossary Terms Used" quick-ref row (VPP → "First Appears: Stage 6", ~line 411) and the inline `[VPP]` link at line 309, in `00-ade-lifecycle.md` only.
- **Rationale:** Re-scoping the row has no valid target (after D-01, VPP is no longer legitimately *used* in this guide); leaving it generic preserves a now-false "First Appears: Stage 6" assertion. Removal is the only internally-consistent option.
- **Implementation note (CRITICAL guardrails):**
  - **NEVER touch the glossary `#vpp` definition** in `_glossary-macos.md` — it has heavy suite-wide inbound links (~15). Only the *local* row + inline link in guide 00 are removed.
  - **KEEP** the See-Also prose at guide 00 line ~382 (it truthfully describes glossary coverage of VPP terminology — not an orphaned claim).
  - Removing the local row/link does **not** dangle the `#vpp` anchor (it survives via other inbound links). No validator asserts the VPP row, so removal carries no harness risk.

### D-03: Freshness stamps — bump now, on edited files only
- Bump `last_verified` / `review_by` on the files **actually edited in Phase 96**.
- **Rationale:** Repo convention already bumps `last_verified` on scoped additive edits (glossary Phases 75 & 91 both recorded "updated last_verified and review_by"). No validator asserts `last_verified`, so this is convention-driven; deferring would leave edited files stamp-stale against established practice. Adversary verified the convention against the version-history table.
- **Implementation note:**
  - Bump **only the two edited files**: `00-ade-lifecycle.md` (D-01 + D-02 + ACC-02) and `_glossary-macos.md` (D-04). The L1 runbook 15 (ACC-04) gets its stamp bumped too **if** it is edited — set `last_verified` to the edit date and recompute `review_by`.
  - Set `last_verified` = `2026-06-28`; **recompute `review_by` = 2026-09-28** to preserve the suite's **+3-month / same-day-of-month invariant** (e.g., 06-24→09-24). Never bump one without the other.
  - Add a **version-history row** to each edited file documenting the Phase 96 change.
  - **Do NOT edit `02-mdm-migration-psso.md`** — it already carries the Iru caveats; leave its stamps untouched.

### D-04: Glossary Kandji-Iru depth — minimal 3-URL, as a REPLACEMENT
- Replace the existing line 114 sentence ("The support portal URL is unchanged: support.kandji.io") with a **concise 3-URL statement** of roles. Do **not** append (append-only self-contradicts), and do **not** import dated verification caveats.
- **Rationale:** The "unchanged" sentence is now factually wrong. The dated operational caveats (HTTP-200 results, login-gating, authoring-day verification) already live in `02-mdm-migration-psso.md` (lines 148-164, 553) — duplicating them in a durable glossary entry rots fast and creates a second source of truth that drifts. The glossary's job is durable terminology.
- **Implementation note:** Replace the sentence with the three URLs and their roles — `support.kandji.io` (Iru-branded legacy KB / redirect), `support.iru.io` (rebrand target, login-gated SPA — primary), `docs.iru.com` (new authoritative public docs / documentation source) — mirroring the durable summary at guide 02 line 553 but **without** the dated "verified 2026-06-26 / HTTP 200" minutiae. **Body-only edit**: the `### Kandji-Iru` heading stays bare (slug landmine — `#kandji-iru` must not change), and the Alphabetical Index entry (line 17) needs no change.

### D-05: ACC-02 (guide 00 ~line 250) — device-group → static user group
- Per the locked success criterion, correct the A2 PSSO/SSO-extension policy assignment to a **static user group** (not device group). Apply consistently with the user-affinity rule used elsewhere in the suite (glossary line ~186; guide 07).
- **Note for researcher:** Verify the exact line 250 target. The line is a Stage-4 "Watch Out For" bullet about pre-Entra-screen SSO-extension delivery; reconcile the correction so it does not contradict any legitimate device-group-for-enrollment-time-delivery nuance. Adversary judged line 250 reconcilable with the user-group rule.

### Claude's Discretion
- Exact wording of the rewritten sentences (D-01, D-04) is at the planner/executor's discretion, provided it satisfies the locked success criteria and the implementation notes above.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & scope (locked)
- `.planning/ROADMAP.md` §"Phase 96: Surgical Conflict Fixes" — goal + 4 success criteria
- `.planning/REQUIREMENTS.md` — ACC-01, ACC-02, ACC-04, GLOS-01 (full text)

### Target files (the docs being corrected)
- `docs/macos-lifecycle/00-ade-lifecycle.md` — Stage 6 ~lines 309/319 (ACC-01 VPP claim), ~line 250 (ACC-02 device-group), ~line 411 "Glossary Terms Used" table (VPP row), line 326 (already-correct note), line ~382 (See-Also prose — keep)
- `docs/l1-runbooks/15-macos-company-portal-sign-in.md` — step 4 (~line 30) remediation device-group → user-group (ACC-04)
- `docs/_glossary-macos.md` — `### Kandji-Iru` entry (~line 112-114), `#vpp` definition (~line 146, DO NOT TOUCH), Alphabetical Index (line 17)

### Source of truth for the Iru 3-URL correction
- `docs/macos-lifecycle/02-mdm-migration-psso.md` §MIGV-02 (lines 148-164 and quick-ref line 553) — the verified 3-URL reality (support.kandji.io / support.iru.io / docs.iru.com). GLOS-01 must be consistent with this. **This file is NOT edited in Phase 96.**

### Cross-reference for VPP / user-group consistency
- `docs/_glossary-macos.md` `### LOB app` (~line 162) — independently confirms macOS Company Portal is "never distributed via Apple VPP"
- `docs/admin-setup-macos/07-platform-sso-setup.md` (user-group assignment rule) — consistency anchor for ACC-02/ACC-04

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Already-correct exemplar:** guide 00 line 326 ("Watch Out For") already states the VPP/iOS-only correction — reuse its phrasing as the canonical wording for D-01.
- **Durable-summary exemplar:** guide 02 line 553 quick-ref row gives the durable, caveat-free 3-URL summary to mirror for D-04.
- **Stamp convention:** version-history tables at the bottom of each doc + the +3-month/same-day `last_verified`→`review_by` invariant (D-03).

### Established Patterns
- **House caveat idiom** = "Watch Out For" / "What breaks if misconfigured" sections, not inline notes in "What Happens"/"Behind the Scenes" — supports the inline-rewrite + lean-on-326 decision (D-01).
- **Slug discipline:** display text may be slashed ("Kandji / Iru") while the anchor stays bare (`#kandji-iru`) — proven at guide 02 line 553. Honor on the D-04 body edit.

### Integration Points
- Validator set (verified by Adversary): Phase 32 `run-all.sh` (link-check / H2 anchor-collision / reachability BFS) + `pre-commit-advisory.sh` (Android/Linux pins only). **None assert the VPP row, `Kandji-Iru`, or `last_verified`** — so removals/edits here carry no harness-presence risk, but keep all anchors live.

</code_context>

<specifics>
## Specific Ideas

- All four picks emerged from `/adversarial-review`; the dominant principle is **"stay surgical"** — minimal internally-consistent edits, durable reference content kept free of dated operational detail, and a clean Phase-96/Phase-97 boundary.
- DISCUSSION-LOG.md captures the full Finder/Adversary/Referee scoring trail for audit.

</specifics>

<deferred>
## Deferred Ideas

- **Full freshness formalization** (freshness stamps + harness coverage across guides 02/03) — owned by **Phase 97**, not this phase. Phase 96 only bumps stamps on the files it edits.
- **Guide 07 VPP conflict + troubleshooting depth** — owned by **Phase 98**.

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 96-surgical-conflict-fixes*
*Context gathered: 2026-06-28*
