# Phase 90: MDM Migration Walkthrough + L2 Runbook #30 - Context

**Gathered:** 2026-06-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the consolidated Kandji/Iru → Intune MDM-migration scenario doc and its failure runbook, covering **both** migration paths:
- **B1 — macOS-26 in-place (9 stages, wipe-free):** fleet assessment (OS gate) → Intune readiness (ADE token, PSSO policy, CA exclusion, TLS exemptions) → secret retrieval from Kandji/Iru (FileVault keys / Activation Lock bypass — BEFORE deletion) → Kandji/Iru source-side release (Delete Device Record; agent removes profiles ~15 min) → ABM "Assign Device Management" → set Deadline (1–90 days) → user notification window → deadline enforcement (non-dismissible full-screen) → post-migration profile-based enrollment + FileVault key rotation → mandatory PSSO re-registration → verify.
- **B2 — pre-macOS-26 fallback (5 stages, wipe-required):** OS gate → secret retrieval → retire/wipe in Kandji/Iru → ADE re-enroll via Intune → standard PSSO path from scratch (hands to guide `01`). `profiles renew` is **NOT** a no-wipe shortcut for ADE devices.

Deliverables: `docs/macos-lifecycle/02-mdm-migration-psso.md` (B1+B2 walkthrough), `docs/l2-runbooks/30-macos-mdm-migration-failure.md` (three failure tracks), `docs/l2-runbooks/00-index.md` row for #30 (content-phase internal hub edit), and a reciprocal "See Also" appended to `27-macos-sso-investigation.md`.

This phase does **not** touch top-level navigation hubs (Phase 92), does **not** duplicate guide 00/01/02/07 or L2 #27 reference content (link-not-copy), and does **not** add glossary/capability-matrix entries (Phase 91). PSSO re-registration is documented as **ALWAYS required** post-migration (Apple authoritative); the same-tenant key-survival hypothesis (LOW confidence) MUST NOT appear in the docs.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via `/adversarial-review` (Finder/Adversary/Referee, three Opus agents). ~30 flaws raised → 5 LOW disproved → 4 CRITICAL disqualifiers + all MEDIUMs confirmed. Winners **1B, 2A, 3A, 4A** are mutually coherent and compose cleanly.

### D1 — B1/B2 path layout
- **D-01 (WINNER 1B — Shared pre-flight, then hard-fork into two distinct tracks):** Stages 1–2 shared (OS-gate selector + readiness/secret-retrieval common to both paths). After the OS-26 gate the doc **hard-forks**: B1 continues its 9-stage in-place track; B2 is its own short retire/wipe/re-enroll track that ends by **link-not-copy handoff to guide `01`**'s standard provisioning path. Selector-first opening routes the reader to their fork.
  - *Rationale:* **1A disqualified (CRITICAL)** — the Phase-89 single-shared-spine model worked because A1/A2 shared 6 of 8 stages and diverged at one late point; B1/B2 share only 2 of 9 stages then fork into an entirely different procedure, so a single spine + "B2 callout" misrepresents control flow and forces conditional "if-B1/if-B2" prose across 7 stages. **1C disqualified (2× MEDIUM)** — two fully self-contained walkthroughs duplicate the shared OS-gate + secret-retrieval pre-flight (two-copy drift, worst for the MEDIUM-confidence Iru steps). 1B has zero surviving flaws.
  - *Execution rule:* Reuse the locked **Stage Summary Table with a "Path" column** (sibling `01` already uses `| … | Path |`) — values B1/B2/Both. Keep the shared pre-flight authored once. B2's terminus is a clean link-not-copy handoff into guide `01` (do NOT re-document fresh provisioning). Selector/divergence table is the first content after frontmatter.

### D2 — 01↔02 PSSO re-registration handoff boundary
- **D-02 (WINNER 2A — 02 documents only migration-delta re-registration + final gate; UX delegated link-not-copy to 01):** A thin "post-migration PSSO re-registration" stage in `02` covers **only** the migration-specific facts (genuine unenroll → IdP unregistration; ACME cert reissue; new-tenant Secure Enclave key re-creation; why "Registration Required" appears after migration) **plus** the `app-sso platform -s` final verification gate. The actual user-facing MFA/registration UX is delegated **link-not-copy** to guide `01`'s registration stage via a bidirectional junction anchor.
  - *Rationale:* **2B disqualified (2× CRITICAL)** — fully inlining `01`'s 4-block registration anatomy duplicates a sibling macos-lifecycle scenario doc (link-not-copy violation) and forks the `app-sso platform -s` gate into two drift-prone copies; it also downgrades the MIG-04-mandated junction anchor to a weak "See Also". 2C is functionally 2A with slightly more explicit wording (no structural benefit; its LOW survives as a wash). 2A is the minimal-duplication reading of MIG-04.
  - *Execution rule:* Place the **mandatory-re-registration rationale AND the verification gate inside `02`** (not delegated to `01`). The gate asserts the full end-state only (`Device Registration: REGISTERED` / `User Registration: REGISTERED`) — **never fabricate partial `app-sso platform -s` output**. The 01↔02 cross-link is **bidirectional** at the shared PSSO-registration handoff junction.

### D3 — L2 #30 runbook structure
- **D-03 (WINNER 3A — Mirror L2 #27: Context preamble + three parallel Track A/B/C, no top router):** Open with a Context preamble (with the same in-preamble routing prose #27 uses), then three parallel tracks — **Track A: deadline lockout** (non-dismissible full-screen) + ABM admin recovery; **Track B: profile-not-delivered / enrollment-failed** (leftover source-MDM agent diagnostic); **Track C: PSSO re-registration stuck**. Track C **link-not-copies** to L2 #27 (no duplicated registration-investigation steps).
  - *Rationale:* **3C disqualified (CRITICAL)** — inlining #27's registration-investigation steps into the PSSO track duplicates the authoritative sibling L2 runbook (link-not-copy violation) and risks contradicting #27's explicit caution against over-interpreting `app-sso platform -s` JSON. 3B's standalone top-router table is defensible but adds a structure #27 doesn't have, and its justifying LOW was disproved (#27 already routes inside its Context preamble). 3A keeps the L2 corpus consistent.
  - *Execution rule:* Mirror #27's section shape (Context preamble + routing prose + parallel tracks + Microsoft Support Escalation Packet + Related Resources + Version History). **Log-collection prerequisite cross-links L2 #10.** Track C links to L2 #27 rather than re-documenting it. ABM admin-recovery steps are MEDIUM confidence — state confidence/verify-in-portal rather than asserting exact recovery clicks as fact.

### D4 — Kandji/Iru source-side steps (depth + placement)
- **D-04 (WINNER 4A — Vendor-neutral conceptual steps in the walkthrough + "verify current Iru labels" freshness note):** Source-side release steps are stated **conceptually** (retrieve FileVault keys / Activation Lock bypass secrets → Delete Device Record → agent auto-removes profiles ~15 min) with **both "Kandji" and "Iru" names surfaced** and an explicit "verify current Iru console labels (Oct-2025 rebrand)" note. The steps live in the **walkthrough (`02`)** shared secret-retrieval/source-release stage (the D-01 stage 1–2 pre-flight); L2 #30 **cross-links** rather than re-documents them.
  - *Rationale:* **4B disqualified (2× MEDIUM)** — exact Kandji+Iru click-paths bake MEDIUM-confidence, unverified (portal unfetchable during research) navigation into freshness-stamped content that will go stale before the 90-day review. **4C disqualified (2× MEDIUM)** — housing normal-path source-side procedure in the L2 **failure** runbook overloads RUN-01's three-failure-track charter, splits the walkthrough narrative, and only relocates (does not mitigate) the Iru drift. 4A calibrates depth to the MEDIUM confidence.
  - *Execution rule:* **Secret retrieval BEFORE deletion** is mandatory and explicit (MIG-03). Surface both names on first mention (e.g., "Kandji (rebranded **Iru**, Oct 2025; support portal URL unchanged at support.kandji.io)"). Keep steps conceptual/vendor-neutral; do not assert exact Iru UI labels as verified fact.

### Composition (how the four winners wire together)
1B's shared secret-retrieval/source-release stage **hosts** 4A's conceptual Kandji/Iru content (4A fills the stage 1B structures — no duplication). B1's terminal stage hands into 2A's thin migration-delta re-registration block (→ link-not-copy to guide `01` for UX). B2's terminal stage **independently** hands into guide `01`'s full provisioning path — a **structurally distinct** junction from B1's re-registration junction (fresh-provision vs re-registration-delta), so no anchor collision or compounding duplication. 3A's L2 #30 sits downstream: its Track C link-not-copies to #27 (registration investigation) while the walkthrough's 2A handoff link-not-copies to guide `01` (registration UX) — clean "how to do it" (`01`) vs "how to investigate when stuck" (#30→#27) separation. Every handoff is link-not-copy.

### Plan-time research flags (NOT blockers — resolve during gsd-plan-phase research)
- **HIGH:** Does Intune require explicit profile-based-enrollment configuration to receive OS-26-migrated macOS devices (beyond ADE token assignment)? Apple says the migrated result is profile-based enrollment, not ADE re-enrollment — confirm the Intune-side config implication before authoring the B1 "post-migration policy delivery" stage.
- **MEDIUM:** Current Iru console device-deletion / Delete-Device-Record steps post-rebrand (portal not fetchable during research) — verify on authoring day; keep conceptual per D-04 if still unverifiable.
- **MEDIUM:** Supervision status preserved through OS-26 in-place migration (pilot-device verification before stating as fact).
- **MEDIUM:** ABM admin-recovery exact steps for a deadline-lockout device (Track A) — MEDIUM confidence in research.
- **LOW:** ABM exact button label ("Assign Device Management" vs "Re-assign…") — verify in portal on authoring day.
- Confirm macOS 26 GA status + the non-dismissible deadline lock behavior (Apple Support + Intune OS-26 migration blog) when stamping the macOS-26-gated section.

### Claude's Discretion
- Exact stage wording/phrasing, callout admonition style, table column choices — within the structural decisions above.
- Recommended deadline-window guidance (pilot one device first; set the deadline only after the Intune enrollment profile is confirmed ready) — present the 1–90 day range with a recommendation, phrasing at discretion.
- Sibling consistency: match guide `00`/`01`'s frontmatter shape, "See Also" structure, Glossary Quick Reference, and Version History footers so `02` reads as a true sibling.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & research (read first)
- `.planning/REQUIREMENTS.md` — MIG-01..04 + RUN-01 are the LOCKED requirements for this phase (consolidated migration walkthrough, ABM "Assign Device Management" + Deadline mechanics, OS≥26-vs-OS<26 selector, pre-26 wipe fallback + `profiles renew`-is-not-a-shortcut, Kandji/Iru source-side steps with both names, mandatory PSSO re-registration + `app-sso platform -s` + bidirectional 01-link, L2 #30 three tracks + L2 #10 log-collection + 00-index row).
- `.planning/research/SUMMARY.md` — authoritative facts table (OS-26 hard gate, "Assign Device Management" feature name, Deadline 1–90 day range, non-dismissible lock, profile-based post-migration enrollment, ACME reissue, PSSO-re-reg-ALWAYS-required, Kandji→Iru Oct-2025 rebrand) + ordered stage lists B1 (9 stages) / B2 (5 stages) + pitfalls with owning phase + the HIGH/MEDIUM/LOW open research gaps. **HIGH-confidence facts the docs MUST cite; same-tenant key-survival (LOW) MUST NOT appear.**
- `.planning/research/PITFALLS.md`, `.planning/research/ARCHITECTURE.md`, `.planning/research/STACK.md`, `.planning/research/FEATURES.md` — supporting research detail.

### Sibling docs to mirror (structure + conventions)
- `docs/macos-lifecycle/00-ade-lifecycle.md` — per-stage 4-block anatomy, "How to Use This Guide" / Prerequisites / Stage Summary Table opening, See Also, Glossary Quick Reference, Version History.
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — **direct sibling** authored in Phase 89: selector-first opening, **Stage Summary Table with a "Path" column**, 4-block + "What the User Sees"/"How to Verify" anatomy, `app-sso platform -s` gate placement, footers. `02` reads as a sibling of this file and is the link-not-copy target for the post-migration re-registration UX (D-02) and B2's fresh-provision handoff (D-01).
- `docs/l2-runbooks/27-macos-sso-investigation.md` — **L2 sibling**: Context preamble + in-preamble routing + parallel Track A/B + log-collection + Microsoft Support Escalation Packet + Related Resources + Version History. L2 #30 mirrors this shape (D-03); **reciprocal See Also appended here this phase.**

### Link-not-copy cross-link targets (do NOT duplicate their content inline)
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — registration UX (D-02) + B2 fresh-provision path (D-01); bidirectional anchor.
- `docs/admin-setup-macos/02-enrollment-profile.md` — enrollment profile reference (link only).
- `docs/admin-setup-macos/07-platform-sso-setup.md` — PSSO Settings Catalog policy reference (link only).
- `docs/l2-runbooks/27-macos-sso-investigation.md` — registration-failure investigation (Track C of #30 links here, no inline copy).
- `docs/l2-runbooks/10-*.md` — macOS log-collection prerequisite cross-linked from L2 #30 (resolve exact #10 filename at plan time).

### Index / reciprocal-edit targets (content-phase edits — allowed this phase)
- `docs/l2-runbooks/00-index.md` — add a row for L2 #30 in the macOS ADE Runbooks table (internal hub; NOT a top-level nav hub).
- `docs/l2-runbooks/27-macos-sso-investigation.md` — reciprocal "See Also" → L2 #30.

### Freshness stamps (macOS-26-gated sections)
- Stamp `last_verified: 2026-06-24` / `review_by: 2026-09-24` on every OS-26-gated section (B1 in-place path, "Assign Device Management" + Deadline mechanics). Verify macOS 26 GA + non-dismissible lock behavior + ABM button label on authoring day (research flag, not a blocker).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`: the structural template — clone its frontmatter, selector-first opening, **Path-column Stage Summary Table**, 4-block stage anatomy, See Also, Glossary Quick Reference, Version History footer shapes.
- `docs/l2-runbooks/27-macos-sso-investigation.md`: the L2 runbook template — clone its Context preamble + routing + parallel-track shape + Escalation Packet + Related Resources + Version History.
- Guides 02/07, L1 #35/#36, L2 #27/#10 already exist at their paths — cross-links are link-only.

### Established Patterns
- **Link-not-copy** for `docs/macos-lifecycle/` scenario/journey docs and sibling L2 runbooks (vs `admin-setup-macos/` per-setting reference).
- **Selector-first opening** + compact Prerequisites + Stage Summary Table (Path column) for two-path scenario docs.
- **`app-sso platform -s` gates** at registration-state-change stages + per-path final; full end-state only, never fabricated partial output.
- **Reciprocal See Also + internal-hub index edits** are content-phase edits (NOT navigation-last) — only the 4 top-level nav hubs are navigation-last (Phase 92).
- **Freshness stamps** on high-drift OS-26-gated sections.

### Integration Points
- New walkthrough slots as `02-` in `docs/macos-lifecycle/` (after `00-ade-lifecycle.md` and `01-psso-provisioning-walkthrough.md`).
- New L2 runbook slots as `30-` in `docs/l2-runbooks/` (next in global sequence after #29).
- Bidirectional handoff junction with the Phase 89 provisioning walkthrough (`01`) at the post-migration PSSO re-registration / "Registration Required" stage — Phase 89 authored the destination; this phase adds the reciprocal link and the migration-delta source.

</code_context>

<specifics>
## Specific Ideas

- B1 and B2 share **only** the OS-gate + secret-retrieval pre-flight (2 stages) — author it once, then hard-fork (D-01). Do not force a single spine.
- Both Kandji **and** Iru names must be surfaced (MIG-03); Iru console steps stay conceptual/vendor-neutral with a verify-on-authoring-day note (MEDIUM confidence).
- `profiles renew` is explicitly NOT a no-wipe shortcut for ADE-enrolled devices — state this in the B2 fallback (MIG-02).
- PSSO re-registration is ALWAYS required post-migration; the same-tenant key-survival hypothesis (LOW confidence) MUST NOT appear in the docs.
- The `app-sso platform -s` output cited must be the full end-state only — no invented intermediate strings.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. (Glossary/capability-matrix integration is Phase 91; navigation-hub wiring is Phase 92; harness lineage bump + milestone close is Phase 93.)

</deferred>

---

*Phase: 90-mdm-migration-walkthrough-l2-runbook-30*
*Context gathered: 2026-06-24*
