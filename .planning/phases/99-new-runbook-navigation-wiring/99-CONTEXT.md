# Phase 99: New Runbook + Navigation Wiring - Context

**Gathered:** 2026-06-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver **RUN-01**: a dedicated local-macOS-password-reset runbook for Secure-Enclave Platform-SSO (PSSO) devices, then wire it into the macOS navigation hubs. The runbook gives operators one authoritative source covering the three local-password recovery paths (escrowed FileVault recovery key / managed admin via macOS LAPS / Apple ID where allowed), the clarification that **SSPR resets the Entra password but NOT the independent local password** under Secure Enclave, and the **mandatory PSSO re-registration follow-up** (cross-linked to L1 #36).

**In scope:** authoring the new runbook file; the reciprocal cross-link line into L1 #36; navigation wiring into the macOS hubs (navigation-last).
**Out of scope:** any edits to guide 07 or guides 02/03; any substantive edit to L1 #36 beyond the reciprocal cross-link; authoring `check-phase-99.mjs` (Phase 100 owns all validators — this phase records a needle-spec hand-off only).

The *what* is locked by RUN-01 + the 4 ROADMAP success criteria. This phase resolved only the *how*, via `/adversarial-review` (Finder → Adversary → Referee, ground-truthed against the live corpus).

</domain>

<decisions>
## Implementation Decisions

All four decisions were resolved via `/adversarial-review`. The review surfaced 37 objections (152 pts); the Adversary disproved 16 with **0 wrong calls**; the Referee independently file-verified every contested point with **0 reversals**. The full Finder/Adversary/Referee trail is in DISCUSSION-LOG.md. **Three CRITICALs held** and are the load-bearing disqualifiers: GA1-B, GA2-B, GA2-C.

### D-01 (GA1): Runbook home & tier — NEW dedicated L1 runbook `docs/l1-runbooks/37-macos-local-password-reset.md`
- New L1 runbook at the next free number (**37**), filed in the **macOS ADE Runbooks** family alongside L1 #35/#36.
- **B (extend #36 in place) is DISQUALIFIED** — CRITICAL: violates the locked hard constraint that #36 is "minimally edited (reciprocal cross-link only)."
- **C (L2 runbook)** and **D (admin-setup guide section)** rejected as mis-tiered: the recovery actions (Company-Portal/Intune recovery-key retrieval, LAPS admin login, Apple-ID reset) are **L1-delegatable GUI/portal work** — same tier as L1 #34 Path A and L1 #36 (both `audience: L1`). Admin-setup guides are `audience: admin`, not a runbook surface, and the natural admin home (guide 07) is locked no-edit and already carries the local-password best-practice prose (07:77).
- **Title/slug:** mint a byte-stable plain-GitHub slug; if an em-dash title is used (e.g. "Platform SSO — Access Recovery"), avoid the double-hyphen slug trap. Frontmatter: `audience: L1`, `platform: macOS`, `applies_to: ADE` (mirror #36).

### D-02 (GA2): Boundary vs L1 #36 — new runbook owns access-recovery; hands off to #36 for PSSO re-registration; #36 gets a reciprocal back-link ONLY
- **#37 owns** "regain account access / reset-or-recover the local password" (the three recovery paths). **#36 owns** "restore/re-register Platform SSO" (the post-recovery Secure-Enclave-key re-registration).
- **Single hand-off point:** at the end of every recovery path, #37 cross-links to **L1 #36** for the mandatory PSSO re-registration. #36 receives **only** a reciprocal cross-link line (no restructuring).
- **B (duplicate #36's steps)** DISQUALIFIED — CRITICAL: violates cross-link-not-duplicate and creates version-drift on #36's macOS-14-vs-13 re-registration paths (36:49-53).
- **C (merge)** DISQUALIFIED — CRITICAL: would either rewrite #36 (violates locked minimal-edit) or orphan its inbound references.

### D-03 (GA3): Recovery-path structure — sequential per-path sections with a recommended primary
- **Structure: B** — one labeled section per recovery path (house prose-step style, like #35 "Root Cause N" / #34 "Path A primary + fallbacks"). Reject embedded mermaid (A — breaks house style, duplicates the triage tree) and single-linear-with-inline-branches (C — less scannable for 3 mutually-exclusive paths).
- **Primary path: escrowed FileVault recovery key** — auto-escrowed for every corporate-encrypted Mac (03:160), Company-Portal retrieval is the "primary/most reliable" channel (03:162,182). **LAPS** and **Apple ID** are secondary fallbacks.
- **Apple-ID gating:** present conditionally as "**where org policy allows**," with FileVault-key + LAPS as always-available fallbacks so the gated path can never become a dead-end.
- **SSPR clarification placement:** state the brief fact **inline** at the explanation/root-cause step **and cross-link to depth** (03 Local Password Policy / 08 auth deep-dive) — matching the existing inline-fact-plus-cross-link pattern at #35:32 and #36:34,45. NOT a standalone top callout; NOT cross-link-only.

### D-04 (GA4): Navigation wiring scope — 5 hubs IN, quick-ref-l2 OUT (navigation-last)
Hub edits are committed **only after** the runbook file is committed (locked navigation-last, mirrors v1.11 Phase 92).

| Hub | Verdict | Wiring |
|---|---|---|
| `docs/l1-runbooks/00-index.md` | **IN** | #37 row appended to the macOS ADE Runbooks table |
| `docs/index.md` | **IN** | extend the **line-110 macOS Platform SSO Runbooks row**; **DO NOT** touch the already-stale line-108 "(6 runbooks)" count (pre-existing debt, out of scope) |
| `docs/common-issues.md` | **IN** | new H3 under macOS ADE Failure Scenarios; escalates to **L2 #27** (the same investigation #36 routes to, 36:86) |
| `docs/quick-ref-l1.md` | **IN** | macOS runbook-list bullet + escalation trigger; distinct trigger wording vs #36 |
| `docs/decision-trees/06-macos-triage.md` | **IN** | new MAC3 leaf + click target + Routing-Verification row (routine — same pattern as Phase 81/87/92; ≤3-edge invariant preserved: MAC1=Yes → MAC3 → #37 = 2 edges) |
| `docs/quick-ref-l2.md` | **OUT** | L2-tier card (`audience: L2`); an L1 runbook is tier-inappropriate |

### Claude's Discretion
- Exact runbook section headings, prose wording, and the specific "Say to the user" L1 phrasing (follow #35/#36 voice).
- Exact common-issues H3 wording and quick-ref-l1 trigger phrasing (subject to D-03 distinct-trigger and slug-discipline constraints).
- The precise MAC3 leaf label/edge wording in the triage tree.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before planning or implementing.**

### Cross-link partner & boundary (D-02 — do NOT restructure; reciprocal link only)
- `docs/l1-runbooks/36-macos-secure-enclave-key.md` — the PSSO re-registration runbook #37 hands off to. Trigger already names "after a password reset / after using a FileVault recovery key" (36:13); re-registration paths macOS 14 Repair vs macOS 13 Company Portal (36:49-53); SE-key-destruction note (36:43-45); routes to L2 #27 (36:86). #37 cross-links INTO it; it gets only a reciprocal back-link line.

### L1 runbook conventions, numbering & structure (D-01, D-03)
- `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` — house structure (labeled "Root Cause N" sections; inline-fact + cross-link pattern at 35:32).
- `docs/l1-runbooks/00-index.md` — L1 index table format; macOS ADE Runbooks table (#35/#36 at 48-49); #34 L1-delegatable precedent (119). Next free number is **37**.

### Recovery-path source facts (D-03 — verified, do NOT re-research; cross-link for depth)
- `docs/admin-setup-macos/03-configuration-profiles.md` §FileVault (~129-180) — escrow auto-on for corporate-encrypted Macs (160); Company-Portal "primary/most reliable" retrieval (162,182); Corporate-only rotate/view, RBAC "Rotate FileVault key" (161); Local Password Policy section. **LOCKED no-edit** — cross-link only.
- `docs/admin-setup-macos/07-platform-sso-setup.md` §~61-79 — existing local-password best-practice + SSPR/recovery prose (07:77). **LOCKED no-edit** — cross-link only.
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — SE-key-destruction technical explanation (#36 cross-links here for depth).

### Navigation hubs to wire (D-04 — navigation-last)
- `docs/l1-runbooks/00-index.md` (macOS ADE Runbooks table) · `docs/index.md` (line-110 PSSO row) · `docs/common-issues.md` (macOS ADE Failure Scenarios) · `docs/quick-ref-l1.md` (macOS section) · `docs/decision-trees/06-macos-triage.md` (MAC3 branch). `docs/quick-ref-l2.md` is explicitly OUT.

### Harness / freshness / process precedent (honor the locked conventions)
- `.planning/phases/98-guide-07-comprehensive-pass/98-CONTEXT.md` — D-03 slug-stability discipline, D-04 file-level freshness convention, Phase-100 needle-spec hand-off pattern (authors no validator).
- `.planning/phases/97-enrollment-filevault-depth-formalization/97-CONTEXT.md` — D-01 file-level freshness (+3-month/same-day, no per-section pairs); D-02 validator deferral, presence-only needles on stable tokens, never dates.
- `.planning/ROADMAP.md` §"Phase 99" (success criteria) and §"Phase 100" (the indivisible validator/chain Atom 2 that consumes this phase's needle-spec).

</canonical_refs>

<code_context>
## Existing Doc-Corpus Insights

### Reusable Assets
- **L1 runbook template** (#35/#36): frontmatter (`last_verified`/`review_by`/`applies_to`/`audience`/`platform`), platform-gate blockquote, `## Prerequisites`, `## Steps` with "Say to the user" L1 phrasing, `## Escalation Criteria`, version-history footer. Mirror this for #37.
- **Inline-fact + cross-link pattern** (#35:32, #36:34/45): the established way to satisfy "clarify in the runbook" without duplicating conceptual depth — used for D-03's SSPR placement.
- **macOS ADE Runbooks table row format** (00-index:42-49) and the **index line-110 PSSO-row** grouping — direct templates for D-04 wiring.
- **Triage-leaf-addition routine** (06-macos-triage version history 111/112/114 = Phase 81/87/92): MAC3 leaf + click target + Routing-Verification row, ≤3-edge invariant.

### Established Patterns
- **Minimal-surgical / cross-link-not-duplicate / byte-stable slugs** (Phases 96/97/98) — the dominant stance; all four winners express it.
- **File-level freshness, +3-month/same-day invariant; no per-section pair-stamps** (96 D-03 / 97 D-01 / 98 D-04). New #37 gets a frontmatter stamp dated to the Phase-99 edit day; each touched hub re-stamps on its own edit day (per-file convention — cross-file date divergence is normal).
- **Navigation-last** (roadmap LOCKED): hubs edited only after #37 is committed.
- **Validators are a Phase-100 deliverable** (97 D-02 + project memory): Phase 99 authors no `check-phase-99.mjs`; records a needle-spec hand-off only.

### Integration Points
- #37 → L1 #36 (mandatory re-registration hand-off, the single seam).
- #37 → 03/07/08 admin guides (cross-link for conceptual depth; no edits to those files).
- 5 nav hubs → #37 (inbound discovery links, navigation-last).

</code_context>

<specifics>
## Specific Ideas

### Phase-100 needle-spec hand-off (record explicitly so Phase 100 doesn't re-discover)
Candidate **presence-only** stable tokens/anchors for the future `check-phase-99.mjs` (never needle dates):
- New runbook file path `docs/l1-runbooks/37-macos-local-password-reset.md` and its stable section headings.
- `00-index.md` macOS-ADE table row link `](37-macos-local-password-reset.md)`.
- `docs/index.md` line-110 PSSO-row extension link to #37.
- `common-issues.md` new H3 slug + its `](l1-runbooks/37-...)` link and the L2 #27 escalation link.
- `quick-ref-l1.md` macOS runbook-list bullet link to #37.
- `06-macos-triage.md` new MAC3 leaf node id + click-target link + Routing-Verification row.
- `36-macos-secure-enclave-key.md` reciprocal cross-link string to #37.

### Execution cautions surfaced by the adversarial review
- **Pre-login authoring (obj-7, execution-critical):** author all three recovery paths as **pre-login GUI** steps (FileVault pre-boot recovery-key screen / LAPS admin login / Apple-ID reset at login window). Confine any `app-sso platform -s` Terminal verification **strictly to the post-recovery #36 re-registration** — a locked-out user cannot open Terminal.
- **Seam + cost (obj-9/17):** foreground the when-to-use split (#37 = regain access; #36 = restore PSSO) and state explicitly that using the recovery key / any password reset **destroys the Secure Enclave binding** — which is precisely *why* the #36 re-registration follow-up is mandatory.
- **Do-not-break (obj-12):** preserve inbound refs to #36 at `06-macos-triage:45/56/81`, `quick-ref-l1:101/117`, `docs/index:110`.
- **Freshness timing:** `00-index.md` and `common-issues.md` are at `review_by: 2026-06-29` (due the authoring day) → touching re-stamps `last_verified: 2026-06-29` / `review_by: 2026-09-29`; `quick-ref-l1.md`/`docs/index.md` (`review_by: 2026-06-30`) re-stamp on touch.

</specifics>

<deferred>
## Deferred Ideas

- **Stale nav counts** — `docs/index.md:108` "(6 runbooks: …)" and `06-macos-triage.md:101` "All 6 macOS L1 runbooks" are already stale (8 macOS L1 runbooks exist) independent of #37. Pre-existing debt; **not** fixed in this phase (out of minimal-surgical scope). Note for a future corpus-accuracy pass.
- **`check-phase-99.mjs` validator + chain-apex extension** — owned by **Phase 100** (HARN-02, indivisible Atom 2). Phase 99 records only the needle-spec hand-off above.

</deferred>

---

*Phase: 99-new-runbook-navigation-wiring*
*Context gathered: 2026-06-29*
