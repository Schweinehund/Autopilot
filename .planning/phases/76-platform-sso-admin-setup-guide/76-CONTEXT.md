# Phase 76: Platform SSO Admin Setup Guide - Context

**Gathered:** 2026-06-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the macOS Platform SSO admin setup guide and wire it into corpus navigation. Three locked deliverables:

1. **`docs/admin-setup-macos/07-platform-sso-setup.md`** — the end-to-end Intune/Entra Platform SSO setup guide covering the `com.apple.extensiblesso` Settings Catalog payload, key identifiers (extension `com.microsoft.CompanyPortalMac.ssoextension`, Team ID `UBF8T346G9`, registration token literal `{{DEVICEREGISTRATION}}`), Entra device-registration prerequisites, **user**-group assignment, Company Portal install prerequisite, the registration flow with `app-sso platform -s` verification, the mixed-fleet dual-field config (PSSO-02), the three silent bootstrapping blockers (PSSO-03), and the advanced/optional ADE-during-Setup path (PSSO-12). (PSSO-01, PSSO-02, PSSO-03, PSSO-12)
2. **`docs/admin-setup-macos/00-overview.md`** — Mermaid diagram + numbered bullet list extended so an admin can discover guides 07, 08, and 09 (SC5 / SSOREF-03).
3. **`docs/admin-setup-macos/03-configuration-profiles.md`** — convert the Phase-75 deferred `` `07-platform-sso-setup.md` `` code-span (§Extensible SSO) to a live markdown link, **in the same commit that creates guide 07** (Phase-75 D-06 mandatory carry-over).

**Not in this phase:** auth-method deep-dive `08-auth-methods-deep-dive.md` and method *selection* content/PSSO-05 (Phase 77); legacy plug-in & migration `09-...` (Phase 78); capability-matrix updates (Phase 79); runbooks (Phase 80); nav-hub integration into index/common-issues/quick-ref (Phase 81); v1.9 harness lineage bump (Phase 82). This phase authors guide 07 and surfaces 07/08/09 in the local overview only.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per the user's standing preference. Finder raised 37 objections (5 CRITICAL); Adversary disproved 8; Referee adjudicated and selected the option carrying the fewest/least-severe REAL objections while keeping all of SC1–SC5 satisfiable. The user accepted all four recommendations ("Lock all & chain to plan").

### A — Guide 07 document structure
- **D-01: Hybrid structure (Option A3).** Keep the corpus outer skeleton shared by guides 01–06 — `## Prerequisites` / `## Steps` / `## Verification` / `## Configuration-Caused Failures` / `## See Also` (per `02-enrollment-profile.md`) — but use PSSO-specific Steps inside. Rationale: rejected **A2** (CRIT — a freeform PSSO task-flow discards the shared skeleton, orphaning the `06-config-failures.md` reverse-lookup hub and the per-file structural validators, and tends to order the DF-3 blockers *after* the Settings Catalog payload); rejected **A1 verbatim** (its generic Configuration-Caused-Failures table cannot host the SC1 registration *flow* or the SC2 dual-field *config* table). A3 preserves corpus/nav integration while giving the SC1 flow and SC2 table a real home.
- **D-01a (resolves the one live A3 objection #9):** the three bootstrapping blockers (D-03) live in an **upfront** callout, NOT buried inside the Steps — so DF-3's "before any Settings Catalog steps" ordering holds. The C-area decision (D-03) governs this.
- **D-01b:** `app-sso platform -s` (device-side) goes in the `## Verification` section alongside Intune-portal checks — corpus Verification sections already mix device-side (`defaults read`, System Settings > Profiles) and portal checks, so this is consistent (Finder objection #10 ruled FALSE POSITIVE).

### B — Overview 07/08/09 surfacing under the C13 broken-link gate
- **D-02: Link 07 live; reference 08/09 as code-span / plain-text; represent all three as Mermaid nodes (Option B1).** This is the identical, referee-blessed mechanism from Phase-75 D-06. Rationale: rejected **B2** (CRIT — live-linking 08/09 now creates broken internal links that break the *frozen* v1.8 C13 gate, which hard-asserts `allowlist.length === 15` with only `transient_external`/`template_placeholder` categories — neither fits an internal not-yet-authored doc); rejected **B3** (CRIT — omitting 08/09 makes SC5 literally unbuildable; SC5 and SSOREF-03 both name 07, 08, **and** 09). Mechanism:
  - **Mermaid nodes** for 07, 08, 09 are safe regardless — Mermaid node labels are NOT markdown link targets, so C13 never validates them (Finder objection #11 ruled FALSE POSITIVE).
  - **Bullet list:** 07 becomes a live markdown link (its file exists post-Phase-76); 08/09 appear as inline code-span / plain-text filenames (e.g., `` `08-auth-methods-deep-dive.md` (next phase) ``) so C13 sees no broken link and the 15-entry allowlist stays untouched.
  - **Phases 77/78** convert the 08/09 code-spans to live links in the same commits that create those files (atomic link+target landing — same pattern guide 07 uses here).
- **D-02a (accepted minor trade-off):** B1 breaks the existing strict node↔bullet-link parity (today all 6 nodes map 1:1 to live-link bullets). Accepted as a LOW cost — the alternative (B3) fails a locked success criterion outright.

### C — PSSO-03 bootstrapping blockers placement
- **D-03: Upfront callout naming all three blockers + cross-referenced point-of-use inline (Option C4).** The three blockers — remove legacy **per-user MFA** (silently blocks Password sync, DF-3), **exclude new-enrollment devices from strict CA "compliant device" gating** during the bootstrap window (DF-9), and **exempt PSSO/Microsoft login endpoints from TLS break-and-inspect** (DF-10) — are all silent failures. Rationale: rejected **C2** (MED — inline-per-step places the MFA blocker with/after a Settings Catalog step, violating DF-3's "before any Settings Catalog steps" mandate); rejected **C3** (MED — a symptom→cause→fix table mis-frames a *pre-deploy* prerequisite as *post-failure* troubleshooting, and duplicates the Config-Caused-Failures slot); rejected **C1** (loses point-of-use reinforcement for silent failures, #20). C4 satisfies both the SC3 "resolve before deploying" set-framing (upfront, all three named together) AND point-of-use reminders at the steps where each bites. The inline half is a point-of-use **cross-reference**, NOT an entry in the Configuration-Caused-Failures table (Finder objection #26 ruled FALSE POSITIVE).
- Bordered/hard-bordered callout formatting is an established corpus pattern (Phases 62/63/64), so the upfront callout may use it (Finder objection #19 ruled FALSE POSITIVE).

### D — PSSO-12 ADE advanced path + PSSO-02 dual-field
- **D-04: Bordered "Advanced / Optional" ADE subsection at the guide end (post-enrollment = documented default) + dual-field shown as a side-by-side table in the Settings Catalog step (Option D1).** Rationale: rejected **D2** (CRIT — an appendix *file* breaks the locked 07/08/09-only macOS-admin file set and adds a new C13 link target; also buries the silent DF-13 dynamic-group ADE failure); rejected **D3** (MED — an inline aside conflates the advanced ADE path with the default post-enrollment flow, violating SC4/VR-5 and risking the DS-1 callout-type error; dual-field inline-only under-serves VR-4). D1 keeps ADE clearly separated/optional per PSSO-12 (D4=B) and presents the macOS-13-vs-14+ dual-field config as the VR-4-prescribed side-by-side table to prevent Error 10001.
- **D-04a (content-correctness obligation, DS-1):** the **main** PSSO section must carry **no** supervised-only callout; the **ADE-during-Setup subsection** carries an **ADE-only** callout (distinct from the suite's supervised-only callout). The ADE subsection content: macOS 26 + Company Portal 5.2604.0 prerequisites, static-groups-only constraint, Smart-card-excluded note, wipe-to-fix recovery, and an achievable "update-to-macOS-26-first" prerequisite branch.

### Claude's Discretion
- Exact prose wording of the guide, callouts, table cells, and step instructions — left to the researcher/planner/executor within the factual constraints above and the success criteria.
- Whether individual fact-bearing lines (beyond the ADE subsection, which is mandatory) get their own `last_verified`/`review_by` annotations per the 90-day PSSO cadence — apply where the researcher flags rapidly-changing facts (e.g., Company Portal version floors, macOS-version gates).
- Exact number and naming of `### Step N` subheadings inside guide 07 (new file → no anchor-stability constraint on its own internal headings).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 76: Platform SSO Admin Setup Guide" (lines ~426-437) — goal, depends-on (Phase 75), requirements (PSSO-01/02/03/12), and the five success criteria SC1–SC5
- `.planning/REQUIREMENTS.md` — PSSO-01 (line 22), PSSO-02 (line 23), PSSO-03 (line 24), PSSO-12 (line 33), SSOREF-03 (line 52), and the traceability table (PSSO-01/02/03/12 → Phase 76)

### Research (⚠ NUMBERING MISMATCH — read carefully)
- `.planning/research/SUMMARY.md` §**"Phase 75 — Foundation: Glossary, Lifecycle Extensions, Admin Setup Core"** (lines ~196-207) — this OLD-numbering section is where `07-platform-sso-setup.md` is actually researched/specced. ROADMAP later split that into ROADMAP-75 (glossary foundation) + ROADMAP-76 (this guide). Do NOT look for a "Phase 76" heading in SUMMARY for guide-07 research — it is under "Phase 75 — Foundation." Also read the pitfalls list (lines ~175-188) and the `last_verified`/`review_by` fact list (lines ~182-188).
- `.planning/research/PITFALLS.md` — DF-3 (per-user MFA silent block; "before any Settings Catalog steps"), DF-4 (Error 10001 mixed-fleet dual-field), DF-9 (CA bootstrap exclusion), DF-10 (TLS break-and-inspect exemption), DF-12 (changing auth method triggers fleet-wide re-registration), DF-13 (dynamic-group ADE silent failure, wipe-to-fix), DS-1 (supervised-only vs ADE-only callout rule), DS-2 (90-day review cadence), VR-4 (dual-field side-by-side table prescription), VR-5 (don't conflate default vs ADE-during-Setup flow)

### Prior-phase decisions this phase depends on
- `.planning/phases/75-glossary-lifecycle-foundation-stub-correction/75-CONTEXT.md` — **D-06** (mandatory Phase-76 task: convert the `07-platform-sso-setup.md` code-span to a live link in the same commit that creates the file), **XC-2** (the C13 15-entry allowlist trap — root of the B-area decision), **PITFALL-6** (anchor stability), and the glossary anchor contracts (`#platform-sso`, `#secure-enclave`, `#enterprise-sso-plug-in`, `#entra-id-sso`) that guide 07 should link to

### Files to create / edit (verified current state)
- `docs/admin-setup-macos/07-platform-sso-setup.md` — **CREATE** (new file; hybrid corpus skeleton per D-01)
- `docs/admin-setup-macos/00-overview.md` — Mermaid diagram (lines ~19-28) + numbered bullet list (lines ~30-41) extended for 07/08/09 per D-02; add a Version-History row (table at lines ~58-60)
- `docs/admin-setup-macos/03-configuration-profiles.md` §"## Extensible SSO" — convert the deferred `07-platform-sso-setup.md` code-span (line ~168) to a live markdown link per D-06; do NOT touch the repeated `#### In Intune admin center` subheadings (anchor stability); add a Version-History row
- `docs/admin-setup-macos/02-enrollment-profile.md` — read-only **reference exemplar** for the corpus skeleton (Prerequisites → Steps → Verification → Configuration-Caused Failures → See Also) and front-matter/Version-History conventions

### Audit harness (do not break — INHERITED v1.8, frozen)
- `scripts/validation/v1.8-milestone-audit.mjs` lines ~668-679 — C13 BLOCKING broken-link gate: `allowlist.length !== 15` hard-fail + exactly `6 transient_external` / `9 template_placeholder` category assertions. The v1.9 harness does NOT exist until Phase 82; Phase 76 runs against this frozen v1.8 harness. The B1 decision (D-02) and the atomic D-06 link conversion exist specifically to keep this green.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`02-enrollment-profile.md` skeleton** — canonical sibling template for guide 07's outer structure (Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also), front-matter block, and `| Date | Change | Author |` Version-History table.
- **Hard-bordered callout pattern** (Phases 62/63/64 — e.g., "Account Holder — DO NOT delegate") — reusable for the D-03 upfront blockers callout and the D-04 ADE Advanced/Optional border.
- **Phase-75 D-06 deferred-link mechanism** — the code-span-now / live-link-when-target-exists pattern is reused twice here: for the 03-stub conversion (07 target now exists) and for the 00-overview 08/09 references (targets exist in Phases 77/78).
- **Glossary anchors created in Phase 75** (`#platform-sso`, `#secure-enclave`, `#enterprise-sso-plug-in`, `#entra-id-sso`) — link targets guide 07 should reference in its See Also / inline definitions.

### Established Patterns
- **Corpus skeleton + `06-config-failures.md` reverse-lookup hub** — guide 07 must carry `## Verification` and `## Configuration-Caused Failures` sections so inbound reverse-lookup links resolve (drives A3 over A2).
- **DF-3 ordering invariant** — silent bootstrapping blockers must appear BEFORE any Settings Catalog steps (drives C4 upfront + D-01a).
- **Anchor stability (PITFALL-6)** — for the EDITED files (00-overview, 03-config-profiles): adding bullet/Mermaid entries and converting a code-span to a link is body-level and anchor-safe; do not add/remove/rename/reorder existing headings. Guide 07 is new → no internal anchor constraint.
- **C13 BLOCKING broken-link gate with fixed 15-entry allowlist** — no new internal broken links; live links must land atomically with their targets (drives D-02 and D-06).
- **90-day PSSO review cadence** — `last_verified`/`review_by` front matter on fact-bearing PSSO docs; ADE subsection mandatory (`2026-06-20` / `2026-09-20`).

### Integration Points
- Guide 07 is the convergence point for Phase-75 foundation (glossary anchors, corrected 03-stub) and the link source for Phases 77 (guide 08 See-Also) and 78 (guide 09).
- The 00-overview Mermaid/bullet edits and the 03-stub link conversion are the navigation contracts later phases extend (08/09 code-span → live link in 77/78).

</code_context>

<specifics>
## Specific Ideas

- **00-overview 08/09 reference literal form (D-02):** code-span filename + parenthetical, e.g. `` `08-auth-methods-deep-dive.md` (added in a later documentation phase) `` — NOT a markdown link, so C13 stays green.
- **Dual-field presentation (D-04 / VR-4):** side-by-side table with columns for the deprecated macOS-13 `Authentication Method` field path AND the macOS-14+ `Platform SSO > Authentication Method` field path, both in one policy, with the Error-10001 consequence called out.
- **DS-1 callout discipline (D-04a):** main PSSO section = no supervised-only callout; ADE-during-Setup subsection = ADE-only callout (distinct strings).
- **`app-sso platform -s`** is the post-deployment registration verification command (SC1) — goes in `## Verification`.

</specifics>

<deferred>
## Deferred Ideas

- **Convert 00-overview 08/09 code-spans to live markdown links** — Phases 77 (guide 08) and 78 (guide 09), each in the commit that creates the respective file (same atomic pattern as guide 07 here).
- **Auth-method *selection* / comparison content (PSSO-05)** — Phase 77 / `08-auth-methods-deep-dive.md`. Guide 07 may reference method names but does not own the selection decision matrix.
- **Capability-matrix Authentication section + 5-platform comparison cells (SSOREF-02)** — Phase 79.
- **Nav-hub integration into index.md / common-issues.md / quick-ref (SSOREF-04)** — Phase 81.
- **v1.9 harness lineage bump** (so future internal forward-links could be allowlisted differently) — Phase 82. Until then, the B1 code-span mechanism is the only C13-safe way to reference not-yet-authored docs.

</deferred>

---

*Phase: 76-platform-sso-admin-setup-guide*
*Context gathered: 2026-06-21*
