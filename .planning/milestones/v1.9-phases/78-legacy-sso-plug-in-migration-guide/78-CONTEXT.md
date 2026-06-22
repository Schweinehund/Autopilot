# Phase 78: Legacy SSO Plug-in & Migration Guide - Context

**Gathered:** 2026-06-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the macOS legacy Enterprise SSO plug-in + migration guide and atomically wire it into corpus navigation. One new deliverable plus two atomic edits:

1. **`docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md`** — a migration/decision REFERENCE for the **mixed-fleet admin** audience (admins with existing Microsoft Enterprise SSO plug-in / SSO app extension deployments who must decide whether and how to move to Platform SSO). Covers: the four-term product-name disambiguation (SSOMIG-01 / SC1 — the highest-risk documentation error), a when-to-use-which decision matrix (SSOMIG-01), the staged legacy→PSSO migration sequence with the Error 10002 dual-profile warning (SSOMIG-02 / SC2), what breaks during migration, the **mandatory** rollback procedure (SSOMIG-03 / SC3), and a bounded Kerberos SSO extension coexistence note (SSOMIG-04 / SC4).
2. **`docs/admin-setup-macos/08-auth-methods-deep-dive.md`** — convert the guide-09 code-span at **line 327** (inside `## See Also`) to a **live markdown link**, in the same commit that creates guide 09 (C13 atomic link+target landing).
3. **`docs/admin-setup-macos/00-overview.md`** — convert the guide-09 code-span at **line 49** (numbered list "9. `09-...md` (added in a later documentation phase)") to a **live markdown link**, same commit (Phase-77 D-02 precedent; C13 atomic landing).

**Not in this phase:** capability-matrix Authentication section + 5-platform comparison macOS cells (Phase 79); L1/L2 runbooks (Phase 80); nav-hub integration into index/common-issues/quick-ref/decision-tree (Phase 81); v1.9 harness lineage bump (Phase 82); the **full Kerberos SSO extension deep-dive** (deferred — PSSO-FUT-04; this phase ships only the coexistence cross-reference note per SSOMIG-04).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per the user's standing preference. Finder raised 52 objections (195 pts, 7 CRITICAL); Adversary disproved 18 (+62, zero wrong-disproves); Referee ruled all 18 contested flaws FALSE POSITIVE, confirmed every rejection of the losing options, and locked four winners. The user accepted all four ("Lock all & chain to plan").

### A — Document structure (WINNER: A1, Pure A3 hybrid)
- **D-01: A3 hybrid skeleton** — custom body over the corpus tail (`## Configuration-Caused Failures` + `## See Also` + `| Date | Change | Author |` Version-History), the direct analog of the Phase-76/77 referee-blessed A3. Body section order:
  1. **Opening disambiguation table** — the four-term product-name hierarchy (Microsoft Enterprise SSO plug-in [umbrella] vs Platform SSO [Settings Catalog] vs SSO app extension [Device Features legacy] vs Kerberos SSO extension [separate Apple-native]) — SC1, surfaced FIRST because terminology confusion is the #1 documentation risk (SUMMARY:16, PITFALLS AXIS-3 451–463).
  2. **When-to-use-which decision matrix** (Area B / D-03).
  3. **Staged migration sequence** — pilot→validate→unassign, with the Error 10002 dual-profile warning (SC2 / DF-5).
  4. **What breaks during migration** (Chrome native-messaging host, Edge profile sign-in, macOS 12/13 silent failure, profile-conflict window).
  5. **Mandatory rollback** (Area C / D-05).
  6. **Kerberos SSO extension coexistence note** (Area D / D-07).
  7. Corpus tail.
- **D-01a (new-file freedom):** Guide 09 is a NEW file → no internal anchor-stability constraint; section heading names are at planner/executor discretion within the SC1–SC4 constraints. (Anchor stability binds only the EDITED files 08 and 00-overview — body-level, touch no headings.)
- **Rejected A3** (clone guide-07 `## Steps` task-flow — CRITICAL: no home for the disambiguation table or decision matrix; same defect that sank A1 for guides 07/08). **Rejected A4** (drop corpus tail — CRITICAL: breaks `06-config-failures.md:15` reverse-lookup-hub compatibility; the latent-orphan defect 77 flagged for its A2).
- **D-01b (A1↔C1 interlock — neutralizes the only residual flaw A1-f1):** Rollback sits at body position 5 (after migration), which is SAFE *because* C1 front-loads the one rollback-adjacent fact that has pre-migration consequence — the compliance-script swap (see D-06). The destructive rollback PROCEDURE stays in section 5; the pre-migration script-swap WARNING is surfaced up front.

### B — Decision matrix shape (WINNER: B4, scoped scenario-row matrix + inline guide-08 link)
- **D-03: Scenario-row "when-to-use-which" matrix**, scoped strictly to the **migrate / keep-legacy / coexist** decision axis. Rows = fleet scenarios (e.g., macOS 10.15–12 legacy-only · modern cloud-managed · on-prem AD/Kerberos need · hybrid-Entra-join fleet); columns = the recommended path. Decision-first, matching the mixed-fleet admin's actual question (SSOMIG-01 / SC1).
- **D-03a (link-not-copy boundary — neutralizes B4-f2):** State an explicit inline link-not-copy boundary to **guide 08** for auth-method selection. Do NOT add auth-method capability columns (passwordless / phishing-resistant / hardware / version) — those are guide 08's canonical four-dimension table (77 D-04); the matrix routes the *migrate/keep/coexist* decision only and links to 08 for method choice.
- **D-03b (routing-facet rows — neutralizes B1-f3 / B4-f1):** The macOS-version row and the on-prem-AD/Kerberos row are *routing decision facets* that point-reference guides 07 (setup version gate) and the Kerberos note (D-07) — not restatements of those facts.
- **D-03c (disambiguate "coexist" — B4-f3):** "Coexist" in a column value means **cross-segment** coexistence (legacy-OS segment + PSSO segment running side-by-side during transition — supported), NOT **same-device** coexistence (legacy profile + PSSO profile on one device → Error 10002, forbidden, DF-5). The matrix must make this explicit so it does not contradict the SC2 Error 10002 warning.
- **Rejected B2** (capability-comparison grid — CRITICAL: near-clone of guide 08's selection table; collides with the Phase 79 capability matrix; violates link-not-copy). **Rejected B3** (prose-only — loses the "matrix" SSOMIG-01 explicitly requires; omits the coexist path).

### C — Rollback treatment (WINNER: C1, dedicated section + hard-bordered callout + up-front prerequisite)
- **D-05: Dedicated `## Rollback` section** carrying a **hard-bordered destructive-action callout** with all three SC3 elements: (1) WPJ-key removal from the Secure Enclave is **destructive**; (2) the **CA-blocked-until-re-registered** impact window; (3) the `security find-certificate` → `app-sso platform -s` compliance-script swap. Rollback is mandatory and discoverable as its own section (MG-3 "mandatory, not deferrable", PITFALLS:579).
- **D-06: Up-front pre-migration compliance-script prerequisite** — ALSO surface the compliance-script swap as a prerequisite callout BEFORE the migration sequence, because a stale Keychain-based compliance check (`security find-certificate`) produces false negatives the moment migration starts (VR-3 / MG-2, PITFALLS:385–395, 555–562), affecting compliance dashboards during a *successful* migration, not only at rollback. This is the A1↔C1 interlock (D-01b).
- **D-06a (link-not-copy — neutralizes C1-f3):** State the `security find-certificate` → `app-sso platform -s` swap command **once canonically** in the up-front prerequisite callout; the `## Rollback` section **cross-references** it (does NOT restate the command). The destructive WPJ-removal and CA-blocked-window facts live canonically in the rollback callout.
- **D-06b (recency annotation — C1-f2 context):** VR-3 (WPJ→Secure Enclave storage migration, ~Q3/Aug 2025) is MEDIUM-confidence research; apply a `last_verified` / `review_by` annotation per the DS-2 90-day cadence to the compliance-script and WPJ-storage facts.
- **Rejected C2** (end-of-doc plain callout — CRITICAL: compliance-script note buried in rollback-only → successful-migration admin never sees the pre-migration false-negative warning → fails SC3; plain callout under-weights a destructive action). **Rejected C3** (fold inline as terminal "if it fails" step — CRITICAL: demotes a mandatory destructive procedure to a conditional afterthought; no `## Rollback` to find). **Rejected C4** (numbered step under-surfaces vs callout).

### D — Nav-wiring + Kerberos note (WINNER: D1, atomic dual conversion + reciprocal See Also + bounded Kerberos subsection)
- **D-07: Atomically convert BOTH existing code-spans to live links in the guide-09 commit** — `00-overview.md:49` and `08-auth-methods-deep-dive.md:327` — using the proven Phase-77 C13 atomic link+target-landing mechanism (the link and its target file land in one commit; body-level edits only, touch no headings). This honors the C13 BLOCKING broken-link gate (frozen v1.8 harness, 15-entry allowlist) rather than fighting it.
- **D-07a: Reciprocal `## See Also`** in guide 09 → guides 07 and 08 (07 is the depends-on per ROADMAP:469; 08 already references 09) + glossary `docs/_glossary-macos.md#enterprise-sso-plug-in` (anchor VERIFIED to exist at `_glossary-macos.md:17,128`).
- **D-08: Bounded `### Kerberos SSO Extension (Coexistence)` subsection** (body section 6) delivering EXACTLY the SC4 trio and nothing more: (1) distinct **Apple-native** extension; (2) **separate Extension Identifiers** (MG-4: a shared identifier causes override); (3) **coexists** with PSSO — plus one explicit cross-reference to the deferred **PSSO-FUT-04** deep-dive (out of v1.9 scope). No payload walkthrough, no configuration detail.
- **D-08a (00-overview consistency — neutralizes D1-f5):** When converting `00-overview.md:49`, keep the existing Mermaid node `I` (`9. Enterprise SSO Plugin Migration`) and the prose description consistent with guide 09's actual title; touch no headings.
- **Rejected D2** (convert only 08:327, defer 00-overview — strands a nav edge; Phase 81 is append-only so it is the wrong deferral target). **Rejected D3** (one-line See Also Kerberos entry — too thin for SC4's three assertions). **Rejected D4** (hard-bordered callout for Kerberos — misuses the destructive-action severity convention for an out-of-scope informational note).

### Claude's Discretion
- Exact prose wording of the guide, the disambiguation table cells, the decision-matrix scenario rows/cells, the migration steps, the rollback callout, and the Kerberos note — left to researcher/planner/executor within the factual constraints above and SC1–SC4.
- Exact internal heading names/anchors for guide 09 (new file → no anchor-stability constraint).
- Which migration "what-breaks" items get their own `last_verified`/`review_by` annotations under the DS-2 90-day cadence (Company Portal version floors, Chrome native-messaging host, macOS-version gates).
- Whether the disambiguation appears as a table vs a labeled definition list (SC1 requires the four-term hierarchy be explicit; format is discretion).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 78: Legacy SSO Plug-in & Migration Guide" (~lines 466–477) — goal, depends-on (Phase 76: `07-platform-sso-setup.md` must exist; guide 09 See-Also links to 07), requirements (SSOMIG-01..04), and the four success criteria SC1–SC4
- `.planning/REQUIREMENTS.md` — SSOMIG-01 (line 37), SSOMIG-02 (38), SSOMIG-03 (39), SSOMIG-04 (40); the deferred **PSSO-FUT-04** Kerberos deep-dive (line 73); the out-of-scope table (lines 86–89); traceability (SSOMIG-01..04 → Phase 78, lines 111–114)

### Research (⚠ OLD-NUMBERING TRAP — read carefully)
- **PITFALLS.md / SUMMARY.md / ARCHITECTURE.md use OLD phase numbering: their "Phase 77" IS this migration guide (guide 09).** Per ROADMAP/REQUIREMENTS, guide 09 is **Phase 78**. Read the substance, not the heading.
- `.planning/research/SUMMARY.md` — the #1-risk disambiguation statement (~line 16), legacy-plug-in + migration deliverable bullets (~97–98), the guide-09 file mapping (~124), the migration failure-mode list (~162–179, esp. MG-3 line 179 "rollback section is mandatory, not deferrable"), and the Phase-"77" migration-guide rationale (~224–230)
- `.planning/research/PITFALLS.md` — **DF-5** (Error 10002 dual-profile coexistence, line ~131), **VR-3** (WPJ cert storage moved to Secure Enclave ~Q3 2025; `security find-certificate` false negatives → use `app-sso platform -s`, line ~385), **MG-1** (migration ordering / 48-hour 10002 monitor, ~540), **MG-2** (legacy Keychain compliance checks break post-migration, ~555), **MG-3** (rollback leaves users CA-blocked — mandatory rollback procedure, ~569), **MG-4** (Kerberos separate Extension Identifiers), the **AXIS-3 disambiguation cheat-sheet** (~443–463), and Entra-registered-vs-joined (~528–532)
- `.planning/research/FEATURES.md` — §3.2 Kerberos SSO extension (separate concern, ~222–229), §3.4 legacy→PSSO migration (Error 10002, staged sequence, Chrome native-messaging, ~253–272), the anti-pattern table (dual-profile / per-user-MFA / hybrid-join NOT SUPPORTED, ~327–334)
- `.planning/research/ARCHITECTURE.md` — guide-09 placement + the 3-files-not-1 single-responsibility rationale (mixed-fleet audience distinct from setup/architect audiences, ~209–211, ~423–426); the file-naming + cross-link map (~25, 77–80, 223, 274)

### Files to create / edit (verified current state)
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` — **CREATE** (new file; A3 hybrid structure per D-01; no internal anchor constraint)
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — **EDIT** line 327 (inside `## See Also`): convert the `` `09-...md` `` code-span to a live link per D-07; body-level edit, touch no headings; add a Version-History row
- `docs/admin-setup-macos/00-overview.md` — **EDIT** line 49: convert the `` `09-...md` `` code-span in the numbered list to a live link per D-07/D-08a; keep Mermaid node `I` + prose consistent; touch no headings; add a Version-History row

### Sibling exemplars (read-only references for structure)
- `docs/admin-setup-macos/07-platform-sso-setup.md` — the setup-TASK sibling; guide 09's `## See Also` MUST link back to it (depends-on ROADMAP:469). Note: 07 places `### Known Silent Blockers — Resolve Before Deployment` (lines ~25–37) BEFORE its `## Steps` — the exemplar for D-06's up-front pre-migration prerequisite-before-sequence pattern. Error 10002 already lives canonically in 07's `## Configuration-Caused Failures` (~line 136).
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — the Phase-77 deep-dive sibling; reference for the A3 hybrid tail, the `| Misconfiguration | Portal | Symptom | Runbook |` Config-Caused-Failures table shape (hosts non-runbook rows with `--` cells, ~308–316), hard-bordered callout formatting, the misconception box, and front-matter. Guide 09's decision matrix must LINK to 08 (not copy its auth-method selection table).
- `docs/admin-setup-macos/02-enrollment-profile.md` — canonical corpus skeleton + Version-History exemplar
- `docs/admin-setup-macos/06-config-failures.md` — the reverse-lookup hub (currently links guides 01–05 only); guide 09's `## Configuration-Caused Failures` tail keeps it hub-compatible for when Phase 81 wires it (drives the A4 rejection)

### Glossary anchors (created in Phase 75)
- `docs/_glossary-macos.md#enterprise-sso-plug-in` (VERIFIED present at `_glossary-macos.md:17,128`), `#platform-sso`, `#secure-enclave` — See-Also / inline-definition targets for guide 09

### Prior-phase decisions this phase depends on
- `.planning/phases/77-auth-methods-deep-dive/77-CONTEXT.md` — the A3 hybrid D-01 rationale (basis for D-01 here); D-02 (the code-span→live-link atomic-conversion precedent — guide 08 was the deferred-link target in Phase 76, now reciprocated); the C13 15-entry allowlist trap (XC-2); the duplication-with-cross-reference / link-not-copy pattern (basis for D-03a, D-06a); the D-03 consolidated-box + point-of-use callout pattern; D-04 (guide 08's four-dimension selection table = the canonical auth-method-selection artifact this phase must link, not copy)
- `.planning/phases/76-platform-sso-admin-setup-guide/76-CONTEXT.md` — the hybrid-skeleton D-01 origin and the C13 allowlist trap

### Audit harness (do not break — INHERITED v1.8, frozen until Phase 82)
- `scripts/validation/v1.8-milestone-audit.mjs` — **C13 BLOCKING broken-link gate**: frozen 15-entry allowlist (6 `transient_external` + 9 `template_placeholder`); neither category fits an internal not-yet-authored doc link, so any internal link must land atomically with its target. The v1.9 harness does NOT exist until Phase 82; Phase 78 runs against this frozen v1.8 harness. The two code-span→live-link conversions (D-07) MUST land in the same commit as guide 09.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`02-enrollment-profile.md` / guide-08 skeleton tail** — exemplar for guide 09's A3 corpus tail (`## Configuration-Caused Failures` + `## See Also` + Version-History).
- **Guide 08's Config-Caused-Failures table** (`| Misconfiguration | Portal | Symptom | Runbook |`, hosts `--` runbook cells) — the shape guide 09's migration-failure rows (Error 10002, Chrome native-messaging, Edge profile sign-in, macOS 12 silent failure) map onto.
- **Hard-bordered callout pattern** (Phases 62–64; guide 07 `### Known Silent Blockers`; guide 08 destructive-action callouts) — for the D-05 rollback destructive callout and the D-06 up-front compliance prerequisite.
- **Guide 07 `### Known Silent Blockers — Resolve Before Deployment` placed before `## Steps`** — the structural precedent for D-06 (prerequisite-before-sequence) that also neutralizes the C4-f3 "renumbers SC2" objection (a pre-flight item precedes the locked sequence without renumbering it).
- **Phase-77 D-02 atomic code-span→live-link mechanism** — reused here for both D-07 conversions (targets now land in the guide-09 commit).
- **Phase-75 glossary anchors** (`#enterprise-sso-plug-in`, `#platform-sso`, `#secure-enclave`) — See-Also/definition targets.

### Established Patterns
- **A3 hybrid = corpus skeleton tail over a custom body** — keeps `06-config-failures.md` reverse-lookup-hub compatibility while serving the mixed-fleet migration/decision purpose.
- **Duplication-with-cross-reference / link-not-copy** (76/77 D-02/D-03) — the blessed mechanism for D-03a (matrix → guide 08), D-06a (compliance-script swap stated once, cross-referenced from rollback), and the Error-10002 fact (canonical in the migration section, referenced in the tail table).
- **C13 atomic link+target landing** — no new internal broken links; both code-span conversions must land in the guide-09 commit.
- **Anchor stability (PITFALL-6)** — applies only to the EDITED files (08, 00-overview); body-level code-span→link conversion is anchor-safe; touch no headings. Guide 09 is new → no internal anchor constraint.
- **DS-2 90-day PSSO review cadence** — `last_verified`/`review_by` front matter on guide 09 and on rapidly-changing facts (VR-3 WPJ storage, Company Portal floors, macOS-version gates).

### Integration Points
- Guide 09 consumes Phase-75 glossary anchors and the Phase-76 guide-07 See-Also target; the two code-span conversions complete navigation edges Phases 76/77 planted.
- Guide 09's `## Configuration-Caused Failures` + `## See Also` tail are the hooks Phase 79 (capability matrix), Phase 80 (runbooks), and Phase 81 (nav hubs) will extend.

</code_context>

<specifics>
## Specific Ideas

- **Disambiguation table (SC1 / D-01 section 1):** four-term hierarchy stated explicitly at the very top — "Microsoft Enterprise SSO plug-in for Apple devices" (umbrella, Company Portal-provided, includes BOTH PSSO and the legacy SSO app extension) · "Platform SSO" (Settings Catalog modern path) · "SSO app extension" (Device Features legacy path) · "Kerberos SSO extension" (separate Apple-native, on-prem AD Kerberos only). Writing "configure the Enterprise SSO plug-in" when meaning "configure Platform SSO" is the named trap (PITFALLS:461).
- **Decision matrix (D-03):** scenario rows → migrate / keep-legacy / coexist; inline "for auth-method selection see guide 08" link-not-copy boundary; "coexist" = cross-segment, not same-device (Error 10002).
- **Staged migration sequence (SC2):** assign PSSO to pilot → validate (confirm Error 10001/10002 absent, `app-sso platform -s`) → THEN unassign the legacy SSO app extension profile; explicit warning that BOTH assigned simultaneously → Error 10002 stops both. Minimize the profile-conflict window (MG-1: monitor 48h).
- **What breaks during migration:** Chrome SSO loss until `com.microsoft.browsercore.json` native-messaging host present (reinstall/copy Company Portal); Edge profile sign-in requirement; macOS 12-and-earlier silent failure; the transient profile-conflict 10002 window.
- **Rollback callout (D-05/D-06):** hard-bordered, three elements — destructive WPJ-key removal from Secure Enclave · CA-blocked-until-re-registered window · compliance-script swap (`security find-certificate` → `app-sso platform -s`, stated canonically up front, cross-referenced here).
- **Kerberos note (D-08):** bounded `###` subsection — distinct Apple-native extension · separate Extension Identifiers (shared id → override, MG-4) · coexists with PSSO · full deep-dive deferred to PSSO-FUT-04.

</specifics>

<deferred>
## Deferred Ideas

- **Full Kerberos SSO extension deep-dive (PSSO-FUT-04)** — Phase 78 ships only the SSOMIG-04 coexistence cross-reference note (D-08); the dedicated configuration/payload guide is deferred. Record/keep in `v1.9-DEFERRED-CLEANUP.md`.
- **Capability-matrix Authentication section + 5-platform comparison macOS cells (SSOREF-02)** — Phase 79. Guide 09's decision facts are a source those cells link to (link-not-copy); guide 09 must NOT pre-build the capability matrix.
- **L1/L2 runbooks** (sign-in failure #35, SE-key verification #36, L2 #27) — Phase 80; they reference guide 09's migration/rollback failure modes (MG-2 Keychain-compliance note flagged for the L2 runbook).
- **Nav-hub integration** (index / common-issues / quick-ref / decision-tree SSO leaf, `06-config-failures.md` hub rows for 07/08/09) — Phase 81 (append-only). Guide 09's tail is built hub-compatible now.
- **v1.9 harness lineage bump** — Phase 82; until then guide 09 runs against the frozen v1.8 C13 gate.
- **Per-user-MFA → CA-MFA migration prerequisite** (DF-3) — primarily a guide-07/08 Password-sync concern; mention in guide 09 only if it bears on the migration decision, do not re-document.

### Reviewed Todos (not folded)
None — no pending todos matched this phase's scope.

</deferred>

---

*Phase: 78-legacy-sso-plug-in-migration-guide*
*Context gathered: 2026-06-21*
