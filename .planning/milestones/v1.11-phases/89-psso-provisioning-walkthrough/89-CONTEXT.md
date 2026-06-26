# Phase 89: PSSO Provisioning Walkthrough - Context

**Gathered:** 2026-06-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a single consolidated operator walkthrough — `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — that threads a Mac from enrollment profile to a fully PSSO-registered end user, covering **both** delivery paths:
- **A1 — standard post-enrollment** (all supported macOS): enrollment profile → PSSO Settings Catalog policy → Company Portal (5.2404.0+ VPP) → ADE Setup Assistant → Await Configuration → desktop + "Registration Required" → user completes MFA (WPJ Secure Enclave key written) → verify.
- **A2 — ADE-during-Setup-Assistant zero-click** (macOS 26+ hard gate): diverges at Company Portal (5.2604.0 **LOB**, not VPP) + three-policy same-static-group rule + `EnableRegistrationDuringSetup`; PSSO registers **inside Setup Assistant, no desktop notification**.

This phase authors the new scenario doc + reciprocal "See Also" edits into guides 00/07/02 (content-phase edits). It does **not** touch top-level navigation hubs (Phase 92) and does **not** duplicate guide 00/02/07 reference content (link-not-copy). New capabilities (migration, glossary, nav, harness) belong to Phases 90–93.

</domain>

<decisions>
## Implementation Decisions

All four authoring gray areas were resolved via `/adversarial-review` (Finder/Adversary/Referee, three Opus agents). 45 flaws raised → 6 disproved → 39 confirmed real. Winners are mutually coherent and compose cleanly.

### D1 — Per-stage anatomy
- **D-01 (WINNER 1C — Hybrid):** Each stage uses guide-00's 4-block anatomy (**What the Admin Sees / What Happens / Behind the Scenes / Watch Out For**) PLUS an added **"What the User Sees"** block and a **"How to Verify"** block at user-facing/registration stages.
  - *Rationale:* Satisfies PROV-01's mandated "admin sees / user sees / how to verify" triad **and** guide-00 consistency simultaneously — the only option that does both. 1A disqualified (two criticals: omits the triad; no home for PROV-03 gates). 1B drops the "What Happens" procedural spine + the L2 "Behind the Scenes" layer that `audience: all` needs.
  - *Execution rule:* Define ONE explicit written rule for which stages receive the extra two blocks — tie it to the D3 "registration state changes" stage set so the template is regular, not ad hoc. Keep "Behind the Scenes" link-heavy (cross-ref 00/07/02) to respect link-not-copy.

### D2 — Two-path layout
- **D-02 (WINNER 2A — Single shared spine + delimited macOS-26 divergence callout):** One shared stage spine for the common path, with a clearly-delimited **multi-stage** macOS-26+ divergence callout beginning at the Company Portal stage **and extending downstream** wherever A2 differs.
  - *Rationale:* 2B disqualified (critical: mass-duplicates ~7 of 8 shared stages — worst case under OS-26 drift; strains "single consolidated"). 2C disqualified (critical: manufactures empty "same as Standard" cells at every non-diverging stage; forces 26+ readers to scan past Standard content, defeating the opening selector). 2A's flaws are all addressable within its own definition.
  - *Execution rule:* The divergence callout is **multi-stage, not a single CP-anchored note**. It must cover: (a) CP **5.2604.0 LOB** floor vs VPP, (b) the **three-policy same-Assigned-static-user-group** rule (most-prominent callout — highest-risk misconfig), (c) `EnableRegistrationDuringSetup`, (d) **SmartCard exclusion**, (e) **wipe-only misconfiguration recovery**, (f) that **A2 reaches full REGISTERED inside Setup Assistant with no desktop notification** — relocate A2's final verification gate accordingly. A2 is **single-point divergence (CP onward), not pervasive** — do not scatter A2 deltas across early shared stages.

### D3 — Verification gate strategy
- **D-03 (WINNER 3C — Gates at registration stages + per-path final):** Place `app-sso platform -s` gates at the stages where registration state actually changes (= the applicable registration stages per PROV-03), plus a **final confirmation gate per path**.
  - *Rationale:* 3B disqualified (critical: single end gate violates PROV-03 "at each applicable stage"). 3A invents **unsourced** partial-state CLI output (the research SUMMARY documents only the full `Device Registration: REGISTERED` + `User Registration: REGISTERED` end state) and breaks for A2's single-shot in-Setup-Assistant registration. 3C maps exactly onto PROV-03's "applicable stage" language.
  - *Execution rule:* **Never fabricate partial `app-sso platform -s` output** — only the full end-state is sourced; each gate checks the state appropriate to that transition. Label each gate explicitly Device-Registration vs User-Registration. The per-path final gate must be present for **both** A1 (at desktop) and A2 (inside Setup Assistant), asserting both REGISTERED lines. Keep the userless "never registers" note as a **doc-level scope callout**, not a gate.

### D4 — Orientation / opening structure
- **D-04 (WINNER 4C — Selector-first, compact orientation):** The doc **opens with the path-divergence selector/table** (first content after frontmatter), followed by a **compact Prerequisites** section and a **Stage Summary Table**; "how to use" reduced to a one-liner.
  - *Rationale:* 4A disqualified (critical: places How-to-Use/Prereqs/Summary BEFORE the selector → violates PROV-03's "opens with a path-divergence selector"). 4B drops the Stage Summary Table (guide-00 convention) and leaves A2's hard-gate preconditions homeless. 4C is the only option that opens with the selector yet retains both the Summary Table and a Prereqs home.
  - *Execution rule:* Selector/divergence table is literally the first content element after frontmatter. The compact Prerequisites must enumerate every A2 hard-gate precondition (CP 5.2604.0 LOB, `EnableRegistrationDuringSetup`, three-policy same-static-group, SmartCard exclusion) and **link (not copy)** guide-00's ADE prereqs. Give the single Stage Summary Table a **Path column or A1/A2-split rows** to resolve merge/split ambiguity. Preserve a brief L1/L2/Admin role line even within the one-liner how-to-use.

### Composition (how the four winners wire together)
4C opens with the selector → 2A runs one shared spine → 3C defines the registration stages → 1C attaches "What the User Sees / How to Verify" exactly at those 3C stages. Wire the D3 stage set to the D1 block-placement rule so the template stays regular.

### Claude's Discretion
- Exact wording/phrasing of stages, callout admonition style, and table column choices — within the structural decisions above.
- Sibling consistency: match guide-00's frontmatter shape, "See Also" structure, and Glossary Quick Reference / Version History footers so guide 01 reads as a true sibling.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & research (read first)
- `.planning/REQUIREMENTS.md` — PROV-01..04 are the LOCKED requirements for this phase (both paths, selector-opens-doc, app-sso gates, link-not-copy, userless callout, three-policy callout, freshness stamps, L1 #35/#36 + L2 #27 cross-links, reciprocal See Also).
- `.planning/research/SUMMARY.md` — authoritative facts table (OS gates, CP version floors, three-policy rule, SmartCard exclusion, wipe-only recovery, `app-sso platform -s` end-state), ordered stages A1 (8 stages) / A2, and pitfalls with owning phase. **HIGH-confidence facts the doc MUST cite.**

### Sibling guide to mirror (structure + conventions)
- `docs/macos-lifecycle/00-ade-lifecycle.md` — per-stage 4-block anatomy, "How to Use This Guide" / Prerequisites / Stage Summary Table opening, See Also, Glossary Quick Reference, Version History. The new doc reads as a sibling of this file.

### Link-not-copy cross-link targets (do NOT duplicate their content inline)
- `docs/admin-setup-macos/02-enrollment-profile.md` — enrollment profile reference (link only); **reciprocal See Also added here this phase.**
- `docs/admin-setup-macos/07-platform-sso-setup.md` — PSSO Settings Catalog policy reference (link only); **reciprocal See Also added here this phase.**
- `docs/macos-lifecycle/00-ade-lifecycle.md` — ADE lifecycle reference (link only); **reciprocal See Also added here this phase.**

### Failure-escalation cross-links (placed at the PSSO registration stage, no inline triage)
- `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` — L1 #35.
- `docs/l1-runbooks/36-macos-secure-enclave-key.md` — L1 #36.
- `docs/l2-runbooks/27-macos-sso-investigation.md` — L2 #27.

### Freshness stamps (macOS-26-gated sections)
- Stamp `last_verified: 2026-06-24` / `review_by: 2026-09-24` on every OS-26-gated section (the A2 divergence callout). Verify ADE-during-SA GA + CP 5.2604.0 LOB floor on authoring day (research flag, not a blocker).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/macos-lifecycle/00-ade-lifecycle.md`: the structural template — clone its frontmatter, 4-block stage anatomy, Stage Summary Table, See Also, Glossary Quick Reference, and Version History footer shapes.
- Existing guides 02/07 and L1 #35/#36 + L2 #27 already exist and are confirmed at their paths — cross-links are link-only.

### Established Patterns
- **Link-not-copy** for scenario/journey docs in `docs/macos-lifecycle/` (vs `admin-setup-macos/` per-setting reference).
- **`audience: all`** frontmatter for multi-role scenario docs (per research ARCHITECTURE).
- **Reciprocal See Also** into existing content files is a content-phase edit (NOT navigation-last) — only the 4 top-level nav hubs are navigation-last (Phase 92).
- **Freshness stamps** on high-drift OS-26-gated sections.

### Integration Points
- New file slots as `01-` in `docs/macos-lifecycle/` (next after `00-ade-lifecycle.md`).
- Bidirectional handoff junction with the Phase 90 migration walkthrough (`02-mdm-migration-psso.md`) at the PSSO re-registration / "Registration Required" stage — Phase 90 will add the reciprocal link; this phase authors the destination.

</code_context>

<specifics>
## Specific Ideas

- A2 divergence callout must be the **most prominent** structural element for the three-policy same-static-group rule (research pitfall #4 — highest-risk misconfiguration; dynamic groups and device groups both break it; recovery = wipe).
- The `app-sso platform -s` verification output cited must be the **full end-state only** (`Device Registration: REGISTERED` / `User Registration: REGISTERED`) — no invented intermediate strings.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. (Migration, glossary/matrix, navigation hubs, and harness lineage are already scoped to Phases 90–93 respectively.)

</deferred>

---

*Phase: 89-psso-provisioning-walkthrough*
*Context gathered: 2026-06-24*
