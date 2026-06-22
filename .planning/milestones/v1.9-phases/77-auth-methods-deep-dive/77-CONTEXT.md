# Phase 77: Auth Methods Deep-Dive - Context

**Gathered:** 2026-06-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the macOS Platform SSO **auth-method deep-dive / selection** guide and atomically wire it into corpus navigation. Two locked deliverables:

1. **`docs/admin-setup-macos/08-auth-methods-deep-dive.md`** — a deep-dive/selection REFERENCE for the architect & senior-admin audience (sibling to, but distinct in purpose from, the setup-TASK guide `07-platform-sso-setup.md`). Covers all three Platform SSO auth methods in depth (Secure Enclave key [Microsoft-recommended], Password sync, Smart card), a selection comparison table, the FileVault interaction, the dangerous-misconception set, and the advanced surfaces (Touch ID, passkey/FIDO2, NUAL). (PSSO-05, PSSO-06, PSSO-07, PSSO-08, PSSO-09, PSSO-10, PSSO-11)
2. **`docs/admin-setup-macos/00-overview.md`** — convert the Phase-76-deferred `` `08-auth-methods-deep-dive.md` `` code-span (line 47) to a **live markdown link**, **in the same commit that creates guide 08** (Phase-76 D-02 mandatory carry-over; C13 atomic link+target landing).

**Not in this phase:** legacy plug-in & migration `09-enterprise-sso-plugin-migration.md` (Phase 78); capability-matrix Authentication section + 5-platform comparison cells (Phase 79); L1/L2 runbooks (Phase 80); nav-hub integration into index/common-issues/quick-ref/decision-tree (Phase 81); v1.9 harness lineage bump (Phase 82). This phase authors guide 08 and converts the one 00-overview code-span only.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per the user's standing preference. Finder raised objections across 12 options (140 pts); Adversary disproved 15 (+44, zero wrong-disproves); Referee confirmed 3 CRITICALs, ruled 5 false positives, downgraded 1 CRITICAL→MEDIUM. The user accepted all four recommendations ("Lock all & chain to plan").

### A — Guide 08 document structure
- **D-01: Hybrid structure (Option A3).** Method-per-section body — comparison/selection table → `## Secure Enclave Key Method` → `## Password Sync Method` → `## Smart Card Method` → advanced sections — PLUS a corpus-compatible `## Configuration-Caused Failures` + `## See Also` tail. Rationale: rejected **A1** (CRITICAL — the flat corpus skeleton's single `## Steps` task-flow + generic Config-Caused-Failures table has nowhere to host the SC1 four-dimension selection table or three co-equal method deep-dives → SC1/SC2 unbuildable; same defect the Phase-76 referee used to reject A1 for guide 07); rejected **A2** (MEDIUM, downgraded from CRITICAL — dropping the `## Configuration-Caused Failures`/`## See Also` skeleton breaks the corpus convention the `06-config-failures.md` reverse-lookup hub relies on and that 76-CONTEXT line 88 cited as "drives A3 over A2"; the orphaning is *latent, not active* — see XC-1). A3 preserves corpus/nav integration while giving the SC1 table, the per-method deep-dives, and the locked guide-07 See-Also reference real homes. A3 is the direct analog of Phase-76's referee-blessed D-01 hybrid.
- **D-01a (new-file freedom):** Guide 08 is a NEW file → **no internal anchor-stability constraint** (76-CONTEXT lines 47/90). Internal heading names for the method sections, FileVault sub-section, and misconception box are at planner/executor discretion within the SC1–SC5 factual constraints. (Anchor stability still binds the EDIT to `00-overview.md` — body-level only.)

### C — FileVault interaction treatment
- **D-02: Both — dedicated sub-section + per-method callouts (Option C3).** A dedicated FileVault/Secure-Enclave interaction sub-section AND per-method cross-referenced callouts. Rationale: rejected **C2** (CRITICAL — omits the dedicated sub-section that research mandates in three places: DF-6 PITFALLS:170, CD-2 PITFALLS:485, and the Phase-Specific Warnings table PITFALLS:729; also weakens SC2/PSSO-06's FileVault-non-relationship requirement); rejected **C1** (loses per-method nuance — Password-sync: local password equals Entra password → one password unlocks FileVault+Entra; Secure Enclave: separate concerns, local password still required at cold boot — CD-3/PITFALLS:172). C3's only objection (intra-file anchor / duplication) was ruled a FALSE POSITIVE (new file + duplication-with-cross-ref is the blessed pattern). Mechanism: state each FileVault fact **once canonically** (FileVault uses the local password as disk key at cold boot; the SE key is parallel, not a replacement) in the Secure Enclave section per SC2/PSSO-06, and **cross-reference** (not restate) from the Password-sync section's single-password nuance and from the consolidated misconception box.

### D — Dangerous-misconceptions surfacing
- **D-03: Both — consolidated box + cross-referenced point-of-use callouts (Option D3).** A consolidated "Common Misconceptions" myth-vs-fact box (CD-3 table, PITFALLS:495–503) PLUS point-of-use hard-bordered callouts at each method. This is the direct analog of the Phase-76 D-03/C4 blockers pattern (76-CONTEXT:37). Rationale: the three named dangers — **FileVault does NOT use the SE key**; **MDM/recovery password reset destroys the SE key** (DF-2); **Touch ID no-password-fallback lockout** (PSSO-09) — are silent/dangerous-failure class requiring BOTH consolidated visibility AND point-of-use reinforcement. Rejected **D1** (box-only — loses point-of-use reinforcement, the Phase-76 #20 ruling); rejected **D2** (inline-only — loses the consolidated CD-3 myth/fact artifact and risks under-surfacing one of the three named dangers if an advanced section is skimmed). Each danger lives canonically in its method section (Touch-ID lockout in the SE→Touch-ID subsection; key-destruction in the SE section); the box links to them.

### B — Comparison/selection table
- **D-04: Decision-first placement + RESTRUCTURE to SC1's four dimensions (Option B1, restructure arm).** The comparison/selection table goes at the **top** of the doc, before the method deep-dives (SC1: "Admin can **use the comparison table to select**"). It is built to SC1's **exactly four** locked dimensions — **passwordless / phishing-resistant / hardware / macOS-version** — with **Secure Enclave clearly marked as Microsoft's recommendation** (and Smart card "Third choice", sourced SUMMARY:71). Rationale: B1's three objections (front-loads detail / couples-to-A1 / asserts-SE-before-justifying) were all ruled FALSE POSITIVES — decision-first IS the SC1 requirement; rejected **B2** (detail-first — inverts SC1's selection-first contract); rejected **B3-verbatim** (CRITICAL — the research draft table at SUMMARY:62–72 carries ~10 rows and does NOT match SC1's four locked dimensions; lifting verbatim mis-frames the SC1 selection contract).
- **D-04a (scope discipline):** Do NOT lift the SUMMARY draft table verbatim. Its extra rows — passkey-capable, local-password-synced, Settings-Catalog-key-value (duplicates guide-07 Step 3), macOS-13-vs-14 split (overlaps the Phase-79 capability matrix) — belong in the per-method deep-dive **bodies**, not the SC1 selection table. The selection table stays to the four dimensions.

### Claude's Discretion
- Exact prose wording of the guide, method deep-dives, comparison-table cells, callouts, and the misconception box — left to the researcher/planner/executor within the factual constraints above and SC1–SC5.
- Exact internal heading names/anchors for guide 08 (new file → no anchor-stability constraint).
- Whether individual fact-bearing lines get their own `last_verified`/`review_by` annotations per the 90-day PSSO cadence (DS-2) — apply where the researcher flags rapidly-changing facts (Company Portal version floors, macOS-version gates, Touch-ID CP 2504 / macOS 14.6).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 77: Auth Methods Deep-Dive" (~lines 448–462) — goal, depends-on (Phase 76), requirements (PSSO-05..11), the **Research flag** (Smart-card Entra-CBA `microsoft_docs_fetch` at plan time), and the five success criteria SC1–SC5
- `.planning/REQUIREMENTS.md` — PSSO-05 (line 26), PSSO-06 (27), PSSO-07 (28), PSSO-08 (29), PSSO-09 (30), PSSO-10 (31), PSSO-11 (32), plus PSSO-FUT-01 (line 70) and the deferred-key note (line 88), and the traceability table (PSSO-05..11 → Phase 77, lines 103–109)

### Research (⚠ OLD-NUMBERING TRAP — read carefully)
- **PITFALLS.md and SUMMARY.md use OLD phase numbering: their "Phase 76" IS this auth-method deep-dive (guide 08).** Per ROADMAP/REQUIREMENTS, guide 08 is **Phase 77**. Read the substance, not the heading. (Same trap 76-CONTEXT lines 60–61 flagged for guide 07.)
- `.planning/research/SUMMARY.md` — auth-method comparison draft table (~lines 60–74; line 71 = the RECOMMENDED/Second/Third ranking), the FileVault #1-misconception statement (~line 16), the Secure-Enclave non-negotiable fact anchors (~lines 76–83), the per-method deliverable bullets (~lines 91–107), and the 90-day fact list (~lines 182–188)
- `.planning/research/PITFALLS.md` — **DF-2** (MDM/recovery password reset destroys the SE key, re-register; severity HIGH), **DF-6** (FileVault cold-boot always needs local password; Touch ID unavailable at FileVault unlock; prescribes a dedicated FileVault+PSSO sub-section, line 170), **DF-11** (Smart card silent failure without Entra CBA pre-config; CBA callout opens the Smart-card section, line 292), **DF-12** (changing auth method triggers fleet-wide re-registration), **CD-2** (SE key vs Keychain vs FileVault key; mandates a dedicated "what the SE key is and is not" section, line 485), **CD-3** (passwordless myth/fact table, lines 495–503), **DS-2** (90-day review cadence), and the **Phase-Specific Warnings table** (~line 729 — prescribes BOTH a FileVault interaction sub-section AND per-method callouts)
- `.planning/research/ARCHITECTURE.md` — guide-08 placement and the three-SEPARATE-files single-responsibility split (~lines 304, 320–326); note the old-numbering "Phase 76/77" labels here too

### Sibling exemplars (read-only references for structure)
- `docs/admin-setup-macos/07-platform-sso-setup.md` — the Phase-76 sibling; guide 08's `## See Also` MUST link back to it (ROADMAP:451 depends-on). Reference for callout formatting, front-matter, and the corpus skeleton tail. NOTE: 07 is a setup-TASK guide; 08 is a deep-dive REFERENCE — do not clone its `## Steps` task-flow (that's the rejected A1).
- `docs/admin-setup-macos/02-enrollment-profile.md` — canonical corpus skeleton + `| Date | Change | Author |` Version-History exemplar (for the A3 `## Configuration-Caused Failures` + `## See Also` tail conventions)
- `docs/admin-setup-macos/06-config-failures.md` — the reverse-lookup hub. Currently links guides 01–05 only (no 07/08 row yet); the A3 `## Configuration-Caused Failures` tail keeps guide 08 hub-compatible for when Phase-78+ wires it.

### Files to create / edit (verified current state)
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — **CREATE** (new file; A3 hybrid structure; no internal anchor constraint)
- `docs/admin-setup-macos/00-overview.md` — convert the `` `08-auth-methods-deep-dive.md` `` code-span at **line 47** to a live markdown link per D-02 carry-over; add a Version-History row; do NOT touch existing headings (anchor stability)

### Glossary anchors to link (created in Phase 75)
- `docs/_glossary-macos.md` anchors `#platform-sso`, `#secure-enclave`, `#enterprise-sso-plug-in` and `docs/_glossary.md#entra-id-sso` — link targets for guide 08's See Also / inline definitions

### Prior-phase decisions this phase depends on
- `.planning/phases/76-platform-sso-admin-setup-guide/76-CONTEXT.md` — **D-02** (the 00-overview 08-code-span→live-link conversion is a MANDATORY Phase-77 task, atomic with guide-08 creation), the C13 15-entry allowlist trap (XC-2/D-02), the D-03 blockers cross-reference pattern (basis for D-03 here), and the hybrid-skeleton D-01 rationale (basis for D-01 here)
- `.planning/phases/75-glossary-lifecycle-foundation-stub-correction/75-CONTEXT.md` — XC-2 (C13 allowlist trap), glossary anchor contracts, PITFALL-6 anchor stability

### Audit harness (do not break — INHERITED v1.8, frozen)
- `scripts/validation/v1.8-milestone-audit.mjs` lines ~668–679 — **C13 BLOCKING broken-link gate**: `allowlist.length !== 15` hard-fail + exactly 6 `transient_external` / 9 `template_placeholder` category assertions. Neither category fits an internal not-yet-authored doc. The v1.9 harness does NOT exist until Phase 82; Phase 77 runs against this frozen v1.8 harness. **Referee verified: there is NO per-file structural validator and NO See-Also validator for `docs/admin-setup-macos/` in this harness, and `check-phase-77.mjs` does not exist** — so no structural gate forces A1; the only live gate is C13, kept green by the atomic D-02 link conversion.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`02-enrollment-profile.md` skeleton tail** — exemplar for guide 08's `## Configuration-Caused Failures` + `## See Also` + Version-History conventions (the A3 corpus-compatible tail).
- **Hard-bordered callout pattern** (Phases 62/63/64; reused in guide 07 D-03) — for the D-03 consolidated misconception box and the per-method point-of-use callouts.
- **Phase-76 D-02 deferred-link mechanism** — the code-span-now / live-link-when-target-exists pattern; reused here for the 00-overview line-47 conversion (target now exists in the guide-08 commit).
- **Phase-75 glossary anchors** (`#platform-sso`, `#secure-enclave`, `#enterprise-sso-plug-in`, `#entra-id-sso`) — link targets for guide 08's definitions/See-Also.
- **Guide 07 `## See Also`** — guide 08 links to 07's `#platform-sso`/`#secure-enclave` and the setup guide as the task companion.

### Established Patterns
- **A3 hybrid = corpus skeleton tail over a method-per-section body** — keeps `06-config-failures.md` reverse-lookup-hub compatibility (76-CONTEXT line 88 "drives A3 over A2") while serving the deep-dive/selection purpose.
- **Duplication-with-cross-reference** (76-CONTEXT D-03/C4) — the blessed mechanism for C3 (FileVault) and D3 (misconceptions): state each fact once canonically, cross-reference from point-of-use; do NOT restate verbatim.
- **C13 BLOCKING broken-link gate with fixed 15-entry allowlist** — no new internal broken links; the 00-overview live link must land atomically with guide 08 (drives D-02 carry-over).
- **Anchor stability (PITFALL-6)** — applies only to the EDITED `00-overview.md` (body-level code-span→link conversion is anchor-safe; touch no headings). Guide 08 is new → no internal anchor constraint.
- **90-day PSSO review cadence (DS-2)** — `last_verified`/`review_by` front matter on fact-bearing PSSO docs; apply to guide 08 and to rapidly-changing facts (CP 2504 / macOS 14.6 Touch-ID gates, version floors).

### Integration Points
- Guide 08 consumes Phase-75 glossary anchors and the Phase-76 guide-07 See-Also target; the 00-overview line-47 conversion is the navigation contract Phase 76 planted for this phase to complete.
- Guide 08's `## Configuration-Caused Failures` + `## See Also` tail are the hooks Phase 78 (guide 09 cross-link), Phase 79 (capability matrix), and Phase 81 (nav hubs) will extend.

</code_context>

<specifics>
## Specific Ideas

- **Comparison table (D-04):** four columns/dimensions only — passwordless | phishing-resistant | hardware | macOS-version — across the three methods; SE row marked "Recommended (Microsoft)"; Smart card "Third choice"; placed at the **top** of the doc as the selection instrument.
- **FileVault canonical statement (D-02):** "FileVault uses the local macOS account password as its disk encryption key at cold boot; the Secure Enclave PSSO key is a parallel mechanism, not a replacement — Touch ID / SSO operate only after the disk is unlocked." Stated once in the Secure Enclave section; cross-referenced elsewhere.
- **Misconception box (D-03):** myth-vs-fact two-column table seeding the three named dangers + CD-3 rows (e.g., "No password needed after enrollment" → CONDITIONALLY TRUE: only at the login window after disk unlock; cold boot needs the local password).
- **Smart-card section opener (DF-11):** hard prerequisite callout — "Entra ID CBA must be configured in the tenant first (separate Entra admin task)" — BEFORE any method detail; macOS 14+ gate; not-available-during-Setup-Assistant.
- **Touch-ID subsection (PSSO-09):** `enable_se_key_biometric_policy` [CP 2504] + `UserSecureEnclaveKeyBiometricPolicy` [macOS 14.6+]; the **no-password-fallback lockout** warning; admin-driven re-registration to enable.
- **NUAL (PSSO-11):** conceptual only — macOS 14+, Shared Device Keys, `com.apple.PlatformSSO.AccountShortName` mapping; the LOW-confidence `NewUserAuthorizationMode` key is **omitted** and tracked in `v1.9-DEFERRED-CLEANUP.md` (see Deferred).

</specifics>

<deferred>
## Deferred Ideas

- **`NewUserAuthorizationMode` exact privilege key (PSSO-11 / PSSO-FUT-01)** — LOW research confidence; **omit** from guide 08 and record in `v1.9-DEFERRED-CLEANUP.md` pending verification against the live Settings Catalog / Microsoft Learn. (Mandatory planner task — REQUIREMENTS lines 70, 88.)
- **Legacy Enterprise SSO plug-in & migration guide `09-...`** — Phase 78 (guide 08 may name it in See Also, but as a code-span/plain-text filename, NOT a live link, until Phase 78 creates it — same C13 mechanism as the 08 reference was in Phase 76).
- **Capability-matrix Authentication section + 5-platform comparison macOS cells (SSOREF-02)** — Phase 79. The auth-method comparison facts in guide 08 are the source those cells link to (link-not-copy).
- **L1/L2 runbooks** (sign-in failure #35, SE-key verification #36, L2 #27) — Phase 80; they reference guide 08's failure modes.
- **Nav-hub integration** (index / common-issues / quick-ref / decision-tree SSO leaf) — Phase 81.
- **v1.9 harness lineage bump** — Phase 82; until then guide 08 runs against the frozen v1.8 C13 gate.

</deferred>

---

*Phase: 77-auth-methods-deep-dive*
*Context gathered: 2026-06-21*
