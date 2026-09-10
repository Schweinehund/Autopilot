# Project Research Summary

**Project:** Windows Autopilot & macOS Provisioning Documentation Suite — v1.23 Walk-Up AVD Kiosk Class Follow-Through (L2 Triage, Host-Pool SSO, Licensing Standard) & Harness Close
**Domain:** Documentation corpus with a self-validating harness and a .docx publish pipeline (not a runtime application) — Windows Autopilot/Intune/AVD kiosk-class device documentation
**Researched:** 2026-09-10
**Confidence:** MEDIUM-HIGH

## Executive Summary

v1.23 is not a software build — it is eight pillars (A–H) of documentation work that turn RE-237's pilot observations into durable corpus content, then close the harness. Six pillars (A, B, D, E, F, G) are well-bounded: they extend existing files (`docs/reference/licensing-matrix.md`, `docs/_glossary.md`, `assets/recipes/06-walk-up-avd-kiosk/`) or add one new, clearly-scoped file (`docs/l2-runbooks/34-*.md`). Two pillars (B's reference-doc shape, C's RE-237-delta-vs-standalone-guide choice) are explicitly deferred to discuss-phase by PROJECT.md itself. Pillar H (harness close) is mechanically well-understood from three prior milestones' precedent (`V122` pin before `V14`, `C17-FROZEN-AWARE-RESIDUE-V22` conversion including the CR-01 `existsSync` class, 21st Path-A lineage bump) and must land strictly last, its own phase, never batched with content.

The dominant risk this milestone is fact-promotion: every content pillar is brand-new prose rather than a rewrite, so the corpus's diff-based meaning-preservation judge has no "before" state and cannot fire. Research also corrects PROJECT.md's own framing: AVD SSO is five distinct Microsoft-documented tasks, and the Kerberos-server-object trigger fires for hybrid-joined OR Entra-joined-with-on-prem-AD, not "hybrid only"; "IoT Enterprise via MAK" is not a real path — IoT Enterprise needs OEM-licensed hardware or a Volume License upgrade of an already-qualifying OS; the De-Bloat script Pillar E vendors is GPLv3, not MIT-shaped like the existing pattern; and the ConfigMgr-Remote-Control-never-over-CMG claim IS now confirmed `[SOURCED]` against the dedicated prerequisites page (superseding an earlier "no citation found" note).

Recommended approach: sequence registry-independent pure-modify pillars (D, E, F, G) first, then registry-affecting content (A, then B/C per their discuss-phase shape), treating any registry-row insert and both publish-bundle canary bumps as one atomic commit re-derived fresh. Run the corpus-wide validation sweep once all content lands. Execute Pillar H strictly last.

## Key Findings

### Recommended Stack

Core surfaces to cite: `AssignedAccess` CSP (ShellLauncher = Enterprise/Education/IoT Enterprise only, not Pro); AppLocker 8025 (packaged-app dialog) vs 8004 (silent RestrictRun) signature split; AVD RDP `enablerdsaadauth:i:1`, Kerberos Server object, `targetDeviceGroups` (Graph SDK ≥2.9.0), auto-created "Windows Cloud Login" CA app — five distinct tasks, not one bundle; `screen mode id:i:2` is unrelated to SSO; Credential Guard/CredSSP blocking saved-credential RDP (fix = KCD or AVD SSO, never disabling Credential Guard); ConfigMgr Remote Control never over CMG (now `[SOURCED]`, `ms.date: 2022-03-18`); Intune Remote Help unattended control (custom-role-only permission, physical Entra-(hybrid-)joined x64 device, excludes AVD/W365 as targets — release-number framing stays `[UNVERIFIED]`).

Vendored: `andrew-s-taylor/public/De-Bloat/RemoveBloat.ps1` is GPL-3.0 (not MIT-shaped like the existing vendoring precedent) — pin at a GitHub-API-confirmed commit but resolve license-bundling separately. `Azure/WindowsAppKiosk`'s upstream now flags `crossdeviceresume.exe` as possibly obsolete. STORIS SCiX has no public documentation — all claims `[PILOT]`.

### Expected Features

Table stakes: EEE frontmatter, correct `doc_type`, registry row + both canary bumps same commit, hub wiring that never points at `docs/recipes` directly, `[PILOT]` labeling discipline, `google-style` Option 1 `--no-headings`, decision content as blockquote+table never a fence.

Differentiators by pillar: **A** L2 triage runbook (AL8025 vs RestrictRun, sensor attribution, `kioskUser0`→`kioskUser1` rotation staying `[PILOT]`); **B** child-process failure table, HP OEM inventory + accepted residue, Remote Help row, CMG row, Credential Guard/CredSSP row; **C** AVD SSO five-task structure; **D** licensing/hardware decision record; **E** De-Bloat vendoring (GPL-3.0 review needed); **F** STORIS ClickOnce investigation (documented negative is a valid outcome); **G** glossary + 9 `DEFER-121-07-A` date fills; **H** harness close.

Anti-features: hub links straight to `docs/recipes`; presenting `[PILOT]` as Microsoft-documented; chasing AL8025 residue to zero; a third lockdown recipe or `SHARED-TAXONOMY-DOC` edits (barred); duplicating tables across files; vendoring without a pinned SHA; decision content as Mermaid/fence; forcing Pillar F to a premature positive outcome.

### Architecture Approach

Four-layer pipeline: content → registry (237 rows) → validation (per-phase checks → apex → milestone-audit → nav-link checker → frozen-at-close pins) → publish (two independent hardcoded-count canaries that must move together). D, E, F, G are pure modifies with zero registry/canary touch. A is a definite new file with three mandatory hub edits. B and C each have two valid landing shapes deferred to discuss-phase; research recommends splitting B by content shape and defaulting C to an RE-237 delta (lower friction). Build order: registry-independent content first, then registry-affecting content (row before canary bump, same atom), then a corpus-wide validation sweep, then harness close strictly last — H.2's frozen-corpus conversion must see the complete v1.23 corpus exactly once before freezing.

### Critical Pitfalls

1. **No "before" state for meaning-preservation judging on new prose** — write the hedged form first; add an explicit review pass hunting for fact-promotion, at authoring time, every content pillar.
2. **Pilot observation promoted to sourced mechanism without citation** — the CredSSP client-side error text and the `kioskUser0`→`kioskUser1` rotation rule have no first-party citation; preserve RE-237's existing `[PILOT]` labels, never "upgrade" them.
3. **AVD SSO five-task conflation, Kerberos-object trigger undercounted** — `targetDeviceGroups` is cosmetic; the Kerberos-object requirement also applies to Entra-joined-with-on-prem-AD; `screen mode id:i:2` is unrelated to SSO.
4. **"IoT Enterprise via MAK" is not a real path** — treat MAK-Enterprise and IoT-Enterprise-OEM-hardware as two distinct arms.
5. **GPLv3 vendoring doesn't fit the existing MIT-shaped pattern** — flag for owner ruling before Pillar E's first commit.
6. **Registry/canary/status-flip ordering trap** — flip-then-register, both canary sites bumped together, re-derived fresh every time.
7. **Harness-close ordering mistakes** — `V122` strictly before `V14`; own final phase; convert the `existsSync` doc-path gates (CR-01 class) too.

## Implications for Roadmap

Suggested phase structure (numbering starts at 160):

### Phase 160: Licensing/Hardware Decision Record (Pillar D)
**Rationale:** Pure modify, zero registry risk, but gates Pillar B's OEM-content scope and RE-237's Step 4 fork.
**Delivers:** Ruled section in `licensing-matrix.md` + RE-237 update stating the MAK-Enterprise vs IoT-Enterprise-OEM-hardware distinction correctly.
**Addresses:** FEATURES.md Pillar D. **Avoids:** Pitfall 4/5 (IoT-via-MAK assumption).

### Phase 161: Vendor De-Bloat into the Kiosk Baseline (Pillar E)
**Rationale:** Assets-only, no docs/registry touch, but a real GPLv3 legal decision that should resolve early.
**Delivers:** Pinned-commit `RemoveBloat.ps1` + resolved license-bundling approach + `NOTICE` entry.
**Uses:** STACK.md's GitHub-API pin pattern. **Avoids:** Pitfall 6 (GPLv3-vs-MIT vendoring gap).

### Phase 162: Riders — Glossary + DEFER-121-07-A Cleanup (Pillar G)
**Rationale:** Cheap, pure modify, independent of every other pillar, removes a recurring close-time irritant.
**Delivers:** New glossary H3 entries + the 9-file Version-History date fill in one commit.
**Addresses:** FEATURES.md Pillar G.

### Phase 163: STORIS ClickOnce Investigation (Pillar F)
**Rationale:** Highest uncertainty; sequence after low-risk pure-modify pillars so a negative outcome doesn't block momentum.
**Delivers:** New RE-237 step or documented negative, using `Trace-StorisEula.ps1`.
**Addresses:** FEATURES.md Pillar F. **Avoids:** Shipping an untested diagnostic as prescriptive (Technical Debt table).

### Phase 164: L2 Kiosk Block-Dialog Triage Runbook (Pillar A)
**Rationale:** First registry-affecting pillar; needs cross-links to Pillar B's tables for real value; HUB-WIRING is the defining mechanical requirement.
**Delivers:** `docs/l2-runbooks/34-*.md`, wired into L2 index/quick-ref-l2/Windows triage tree, registry row + both canary bumps same commit.
**Implements:** ARCHITECTURE.md's Pillar A table. **Avoids:** Anti-Pattern 2 (hub→recipes link); Pitfall 7 (split canary commit).

### Phase 165: Kiosk-Class Reference Rows (Pillar B)
**Rationale:** Depends on discuss-phase shape decision; sequence after A so the runbook's cross-links have a stable target.
**Delivers:** Child-process table, HP OEM inventory + residue, Remote Help row, CMG row (`[SOURCED]`), Credential Guard/CredSSP row.
**Addresses:** FEATURES.md Pillar B. **Avoids:** Pitfall 2 (CredSSP string/rotation-rule promotion).

### Phase 166: AVD Host-Pool Entra SSO (Pillar C)
**Rationale:** Depends on discuss-phase shape decision; sequence after B since SSO is the structural fix for B's Credential Guard row.
**Delivers:** SSO content structured around Microsoft's five documented tasks, both Kerberos-trigger clauses stated in full.
**Uses:** STACK.md's `enablerdsaadauth`/Kerberos/`targetDeviceGroups` citations. **Avoids:** Pitfall 3 (five-task conflation).

### Phase 167: Harness Close (Pillar H)
**Rationale:** Must be strictly last, own phase; H.2 must see the complete, final corpus exactly once.
**Delivers:** `V122` pin before `V14`, `readAtV122Close`/`lsTreeAtV122Close`, converted `v1.22-milestone-audit.mjs` (incl. CR-01 class), forked `v1.23-milestone-audit.mjs` + sidecar + `check-phase-160..16N.mjs` + apex `[48..N-1]+[30,31]` + 20th CI workflow, predecessor-surfaces census.
**Implements:** ARCHITECTURE.md's H.1–H.4. **Avoids:** Pitfall 8 / Anti-Pattern 1.

### Phase Ordering Rationale

- Pure-modify pillars (D, E, G, F) first — no ordering dependency on each other, no discuss-phase blocker.
- D first among these because its ruling determines B's long-term scope.
- A before B because B's tables are meant to be cross-linked by A's runbook.
- C after B because C is the documented fix for B's Credential Guard/CredSSP row.
- H always last — hard technical dependency, not just convention.

### Research Flags

Needs deeper research at plan time: **Phase 165** (re-verify the exact CMG quote at plan time; Remote Help licensing/role-scoping is real admin work); **Phase 166** (discuss-phase shape undecided; five-task structuring is non-trivial); **Phase 167** (precedented but every step needs perturbation-testing against the apex, not just reading).

Standard patterns, skip research-phase: **Phase 160** (facts already sourced, this is a writing/ruling task); **Phase 161** (pin pattern already established, only GPLv3 needs an owner ruling); **Phase 162** (fully scoped file list already enumerated); **Phase 163** (existing script, existing "documented negative" precedent); **Phase 164** (hub-wiring shape fully precedented by runbooks 01-05/RE-068).

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Nearly every claim `[SOURCED]` to a fetched Learn page's `ms.date`; two items explicitly `[UNVERIFIED]` (Remote Help release number, `screen mode id:i:2` placement). |
| Features | MEDIUM | Mix of `[SOURCED]`, `[PILOT]`, and `[ASSUMED]` structural inferences (e.g., exact triage-tree landing file). |
| Architecture | HIGH (repo-measured) for existing mechanics; MEDIUM for the two undecided landing sites deferred to discuss-phase. |
| Pitfalls | MEDIUM-HIGH | Harness/process pitfalls `[MEASURED]` directly; two technical claims (CredSSP string, rotation rule) explicitly `[UNVERIFIED]`. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- Pillar A's exact triage-tree landing file is `[ASSUMED]` by naming symmetry only — resolve at discuss-phase.
- Pillar B's and Pillar C's landing shapes are explicitly deferred to discuss-phase — carry both supported options into the roadmap rather than pre-resolving.
- GPLv3 license-bundling approach for Pillar E needs an owner ruling before the first commit.
- The CredSSP error string and the `kioskUser0`→`kioskUser1` rotation rule must ship `[PILOT]`/`[UNVERIFIED]`, never as a Microsoft quote.
- Registry row count and canary line numbers will have moved since this research pass — re-derive fresh at each registry-affecting phase.
- STORIS SCiX outcome is genuinely open; treat "documented negative" as a valid, complete close condition for Pillar F.

## Sources

### Primary (HIGH confidence)
- learn.microsoft.com Windows/Intune/AVD/Credential Guard/IoT Enterprise/ClickOnce/Remote Help pages, all fetched as source bytes with visible `ms.date` (assignedaccess-csp 2025-03-12; shell-launcher 2025-03-07; assigned-access/policy-settings 2025-02-25; assigned-access/recommendations 2025-03-07; configure-single-sign-on 2025-08-29; credential-guard/considerations-known-issues 2026-04-23; remote-control/prerequisites-for-remote-control 2022-03-18; remote-help/plan and start-session 2026-08-13; iot-enterprise/licensing 2026-06-24; clickonce-security-and-deployment 2026-04-28).
- raw.githubusercontent.com/andrew-s-taylor/public LICENSE (GPL-3.0), Azure/WindowsAppKiosk ADVANCED_CUSTOMIZATIONS.md and README.md (current main), api.github.com commit-pin lookups.
- Repo-measured: docs/_registry/RE-index.md, build-publish-bundle.mjs, build-filename-map.mjs, frozen-at-close.mjs, v1.21/v1.22-milestone-audit.mjs, check-phase-140/159.mjs, check-nav-hub-links.mjs, RE-237, NOTICE, PROJECT.md, v1.22-DEFERRED-CLEANUP.md, 155-CONTEXT.md, 159-REVIEW(-FIX).md.

### Secondary (MEDIUM confidence)
- system32.eventsentry.com AppLocker 8025 reference and Splunk AppLocker blog (corroborate, don't independently confirm, the 8025/RestrictRun split).
- manage-clients-internet and cloud-management-gateway-faq Learn pages (fetched, silent on Remote Control specifically; superseded for citation by the dedicated prerequisites page).

### Tertiary (LOW confidence)
- TechCommunity blog on Remote Help unattended control (fetch returned title-only) — the "August 2026 service release" framing stays `[UNVERIFIED]`, corroborated only by secondary sources (Redmondmag, Petri, windowsreport.com).

---
*Research completed: 2026-09-10*
*Ready for roadmap: yes*
