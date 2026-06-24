# Phase 85: Capability Matrix + L2 Runbooks - Context

**Gathered:** 2026-06-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver three things plus their cross-links: (1) a **Kerberos SSO Extension row** in `docs/reference/macos-capability-matrix.md` (under the existing `## Authentication` H2), preceded by a **committed pre-edit anchor-inventory artifact** and committed **atomically with the `check-phase-63.mjs` V-63-08 blob-hash baseline update**; (2) two **new L2 runbooks** — `28-macos-kerberos-sso-investigation.md` (ticket-acquisition triage, realm/KDC reachability, TGT verification, log collection) and `29-macos-graph-credential-investigation.md` (single-user enumerate/verify/delete, delete-and-re-register, permission/role troubleshooting) — both following the existing `27-macos-sso-investigation.md` Track + numbered-Steps template; and (3) the **glossary + 4-platform-comparison cross-links** left open by Phases 83–84 (link-not-copy `4-platform-capability-comparison.md` macOS SSO cell + reciprocal Windows `_glossary.md` see-also).

**In scope:** Pre-edit anchor inventory (SC#1); Kerberos row under `## Authentication` (REF-01, SC#2) + atomic V-63-08 bump; runbooks #28 + #29 (RUN-01, RUN-02, SC#4, SC#5); `00-index.md` macOS-ADE-Runbooks rows for #28/#29; `4-platform-capability-comparison.md` macOS SSO cell update (REF-02, SC#3) + atomic V-63-09 bump; reciprocal Windows `_glossary.md` see-also (REF-02). Requirements REF-01, REF-02, RUN-01, RUN-02.

**Out of scope (other phases / deferred):** Graph-managed Platform Credential **matrix rows** (routed to glossary per SC#3, not the matrix); a standalone "Platform Credential (Graph API)" glossary term (redundant — terms already exist, P84 D-07); bulk-audit / enumerate-users-with-0-registrations reporting examples in #29 (HIGH complexity — forward-note only); a "from L1 escalation" routing block in #28/#29 (no L1 Kerberos/Graph runbook exists); navigation-hub / common-issues / quick-ref-l2 / decision-tree Kerberos wiring → **Phase 87**; legacy chain-FAIL conversion → **Phase 86**; new harness files → **Phase 88**.
</domain>

<decisions>
## Implementation Decisions

All four gray areas were adjudicated via `/adversarial-review` (Finder → Adversary → Referee, Opus). The Adversary attempted **0 overturns** (probed Area 1 Sub-B and Area 2 Sub hardest); the Referee independently confirmed **9/9 sub-decisions**. Every pick is grounded in the project's own success criteria and prior locked decisions rather than generic best practice. Per-area reasoning is recorded in `85-DISCUSSION-LOG.md`.

### Matrix row placement & scope (Area 1)
- **D-01:** Add the Kerberos row(s) **under the existing `## Authentication` H2** (option 1a) — NOT a new `## SSO Extensions` H2. Rationale: `#authentication` is a live anchor already cross-linked from `macos-capability-matrix.md:38/:82` and `4-platform-capability-comparison.md:101`; the SC#1 pre-edit anchor-inventory convention exists to discourage gratuitous new anchors; Kerberos SSO is an authentication capability. SC#2 explicitly sanctions the `## Authentication` placement.
- **D-02:** Use **per-feature rows** matching the existing PSSO table grammar (`macos-capability-matrix.md:106-112` — Auth methods, Hardware gate, version floor, NUAL, Passkey/FIDO2, Hybrid Entra join). A single consolidated Kerberos mega-cell would break the `| Feature | Windows | macOS |` column grammar. Let the macOS 14.6 PSSO-TGT floor (KRB-02) and the Credential-vs-Redirect distinction surface as discrete rows with guide-10 links.
- **D-03:** **Kerberos-only in the matrix** — the Graph-managed Platform Credential is routed to the **glossary** (Area 4), NOT to matrix rows. *(This resolves the one genuinely contestable point.)* REF-01's parenthetical "(+ Graph-managed Platform Credential) rows" is the looser phrasing; the binding success criteria govern — SC#2 names only "a Kerberos SSO Extension row" and SC#3 explicitly routes the Graph credential to `_glossary-macos.md` as an "entry **or see-also**." The matrix is a Windows-vs-macOS **feature-parity** doc; a Graph API management surface has no Windows parity cell and would duplicate the existing `:111` Platform-Credential entry.

### Runbook structure & track model (Area 2)
- **D-04:** Both #28 and #29 **follow the `27-macos-sso-investigation.md` template** (option 2a) — Platform-gate header, `## Context`, Track(s) with numbered `### Step N`, Microsoft Support Escalation Packet, Related Resources, Version History. RUN-01/RUN-02 and SC#4/SC#5 enumerate exactly this step shape. #28 naturally bifurcates Track-A/Track-B like #27 (ticket-acquisition/TGT-not-issued vs PSSO-TGT-integration via `usePlatformSSOTGT`); #29's enumerate→verify→delete→re-register is a numbered-Step flow.
- **D-05:** **L2-entry-only — NO "from L1 escalation" routing block.** *(Verified empirically.)* `docs/l1-runbooks/` contains no L1 Kerberos and no L1 Graph runbook; the only macOS SSO L1 runbooks are #35 (sign-in failure) and #36 (SE-key loss), both escalating to L2 **#27** (`00-index.md:97-98`). An L1-routing block in #28/#29 would cite non-existent escalation sources. Keep the standard `## Context` opener (with a "no L1 escalation: begin at Step 1" line, as #27:24 does) and cross-link the adjacent #27/#35/#36 for shared-symptom tickets. **Nav-hub/triage-tree wiring is Phase 87 — do not pre-wire it here.**

### Graph runbook #29 depth (Area 3)
- **D-06:** Keep #29 to the **SC#5-named single-user workflow** (option 3b): enumerate/verify/delete + delete-and-re-register + permission/role troubleshooting (the GRAPH-02 least-privilege read-vs-delete distinction, delegated vs application, national-cloud). **Defer bulk-audit / enumerate-users-with-0-registrations** as a brief out-of-scope/forward note — NOT a full section. Rationale: neither SC#5 (`ROADMAP.md:98`) nor RUN-02 (`REQUIREMENTS.md:41`) names bulk-audit; 84-CONTEXT.md:108 flags it HIGH-complexity; over-documentation discipline forbids authoring scope no success criterion requires. The Phase-84 "belongs to RUN-02" pointer (84-CONTEXT D-02) named the closest home, but the authored RUN-02/SC#5 contract scopes to single-credential operations — **SC governs over the deferral pointer.**

### Glossary + 4-platform comparison (Area 4)
- **D-07:** **See-also-only** for the macOS glossary (option 4b) — do NOT author a standalone "Platform Credential (Graph API)" term (redundant per 84-CONTEXT D-07; the credential is already defined under Platform SSO and Secure Enclave). **Both macOS terms SC#3 needs already exist:** the Kerberos SSO Extension term (`_glossary-macos.md:142`, shipped P83) and the Platform-SSO-term see-also to guide 11 (`_glossary-macos.md:128`, shipped P84). Phase 85 macOS-glossary work is **verify-not-recreate** — confirm presence; do not duplicate terms (over-documentation violation).
- **D-08:** Update the `## Single Sign-On` H2 **macOS cell** in `4-platform-capability-comparison.md` (`:97-103`; current macOS cell at `:101` already targets `macos-capability-matrix.md#authentication`) **link-not-copy** to reference the new Kerberos capability at `#authentication` — no per-cell prose duplication. **MANDATORY:** this edit changes the file's git blob and breaks the **V-63-09** guard — bump its baseline (`f25ff51a…`, `check-phase-63.mjs:230`) in the **same atomic commit**.
- **D-09:** **Add reciprocal Kerberos + Platform-Credential see-also to the Windows `_glossary.md`** (REF-02 mandates "(+ reciprocal `_glossary.md` see-also)"). Host: extend the `## Security` → Entra ID SSO term (`_glossary.md:158-162`), which already carries a reciprocal macOS-Enterprise-SSO-plugin see-also — the established pattern.

### Claude's Discretion
- Exact per-feature Kerberos row labels/count under `## Authentication`; Track-A/Track-B split boundaries and step ordering within #28/#29; callout wording; the exact reciprocal-see-also sentence and whether it extends an existing Windows term or adds a sibling line — left to planner/executor, subject to the decisions above and the locked constraints.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & scope
- `.planning/ROADMAP.md` — Phase 85 section (goal; Success Criteria 1–5 at lines 94–98; plans 85-01/02/03 at 104–106). Also Phase 86 (Chain Health Pass — handles only PRE-EXISTING legacy FAILs, NOT new ones we introduce here) and Phase 87 (nav-hub / triage-tree wiring — NOT this phase).
- `.planning/REQUIREMENTS.md` — REF-01 (line 45), REF-02 (line 46), RUN-01 (line 40), RUN-02 (line 41). Exact wording is load-bearing (D-03, D-06).
- `.planning/PROJECT.md` — v1.10 single-feature content milestone; over-documentation discipline; sequential-on-main-tree (no worktrees).

### Prior phase decisions (carried forward — do NOT re-ask)
- `.planning/phases/83-kerberos-sso-extension-guide/83-CONTEXT.md` — **D-10/D-11/D-13 diagnostics LOCKED**: `app-sso platform -s` + `klist` canonical pair; `app-sso diagnose` PROHIBITED; `app-sso kerberos` plan-time-verify only; pin `klist` to a version-stable form (no `klist -v`). **D-12**: `tgt_ad` (on-prem) vs `tgt_cloud` (Entra) output interpretation; cosmetic "Not signed in" menu-bar note.
- `.planning/phases/84-graph-api-doc-nual-key-table/84-CONTEXT.md` — **D-02** (leaver/offboarding pattern with dry-run; bulk-audit deferred HIGH-complexity), **D-07** (see-also over standalone glossary term; standalone stub = acceptable fallback only), **D-08** (Graph nav property is `platformCredentialMethods`, v1.0 not beta; Delete severs Entra binding, does NOT erase the SE key; `[!WARNING]` mandatory; least-priv `UserAuthenticationMethod.ReadWrite.All` for delete). Deferred-ideas section routes matrix/glossary/comparison work into this phase.

### Files to create / edit / cross-link (full paths)
- `docs/reference/macos-capability-matrix.md` — pre-edit anchor inventory (SC#1) **then** add Kerberos row(s) under `## Authentication` (`:100-112`); links to guide 10. **Triggers V-63-08.**
- `docs/reference/4-platform-capability-comparison.md` §`## Single Sign-On` (`:97-103`, macOS cell `:101`) — link-not-copy macOS-cell update (D-08). **Triggers V-63-09.**
- `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` — **NEW FILE** (RUN-01, SC#4).
- `docs/l2-runbooks/29-macos-graph-credential-investigation.md` — **NEW FILE** (RUN-02, SC#5).
- `docs/l2-runbooks/27-macos-sso-investigation.md` — **structural template** for #28/#29 (Track A/B + numbered Steps; note its L1-routing block at `:19-24` is NOT replicated — D-05).
- `docs/l2-runbooks/00-index.md` — extend the macOS ADE Runbooks table + (no L1-escalation rows for #28/#29; see D-05).
- `docs/_glossary-macos.md` — **verify-not-recreate**: Kerberos term `:142`, Platform-SSO→guide-11 see-also `:128` already exist (D-07).
- `docs/_glossary.md` §`## Security` Entra ID SSO term (`:158-162`) — add reciprocal Kerberos/Platform-Credential see-also (D-09, REF-02).
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` — link target for the matrix Kerberos row + #28 (shipped P83).
- `docs/admin-setup-macos/11-graph-api-platform-credential.md` — link target for #29 (forward-link from guide 11 already placed P84; #29 should reciprocally link back).

### Harness (MANDATORY — atomic hash discipline)
- `scripts/validation/check-phase-63.mjs` — **V-63-08** (`macos-capability-matrix.md` byte-unchanged guard, baseline `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716`, `:202-221`) and **V-63-09** (`4-platform-capability-comparison.md` byte-unchanged guard, baseline `f25ff51a14b7feac46611c4c0511ed5c074ce03f`, `:223-242`). Baselines are computed via `git hash-object <file>`. Bump each baseline **in the same commit as the edit to its file**, per-file (see Specific Ideas).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`27-macos-sso-investigation.md` runbook anatomy** — Platform-gate header, `## Context`, Track A/Track B, numbered `### Step N`, Microsoft Support Escalation Packet, Related Resources, Version History; Step 1 is already an `app-sso platform -s`-centered diagnostic with a "do not interpret single JSON fields in isolation" guard and an anti-`app-sso diagnose` note. Direct template for #28/#29 (D-04).
- **`## Authentication` per-feature table** (`macos-capability-matrix.md:106-112`) — the row grammar Kerberos rows must match (D-02).
- **`4-platform-capability-comparison.md` `## Single Sign-On` link-not-copy cell** (`:101` → `#authentication`) — the pattern for D-08.
- **Reciprocal glossary see-also convention** — `_glossary-macos.md` `> See also:` blockquotes (D-15 convention, P83/P84) and the Windows `_glossary.md:162` reciprocal pattern (D-09).

### Established Patterns
- **Pre-edit anchor-inventory artifact** before matrix edits (SC#1) — record all `## ` headings + anchor IDs, commit as an artifact, THEN edit.
- **Atomic blob-hash baseline bump** — `git hash-object` the edited file, update the matching BASELINE constant, commit edit+baseline together (V-63-08 for the matrix, V-63-09 for the comparison).
- **macOS L2 runbook 00-index integration** — add table rows under "macOS ADE Runbooks" with prerequisite = macOS Log Collection (`10-macos-log-collection.md`).

### Integration Points
- `00-index.md` macOS ADE Runbooks table (new #28/#29 rows).
- `4-platform-capability-comparison.md` `## Single Sign-On` macOS cell.
- `_glossary.md` Windows Entra ID SSO term (reciprocal see-also).
- `check-phase-63.mjs` V-63-08 + V-63-09 baselines (atomic with their file edits).

</code_context>

<specifics>
## Specific Ideas

- **Dual hash bump is PER-FILE, not both-always:** bump V-63-08 only if `macos-capability-matrix.md` changed; bump V-63-09 only if `4-platform-capability-comparison.md` changed. Do NOT bump a baseline whose file was not edited. SC#2 explicitly couples V-63-08 to the matrix commit; **V-63-09 is the easy-to-miss coupling** (the comparison-doc edit), and a missed V-63-09 bump introduces a NEW chain FAIL that Phase 86 does NOT cover (86 handles only pre-existing legacy FAILs).
- **#28 diagnostics** reuse the locked pair verbatim: `app-sso platform -s` (interpret `tgt_ad` vs `tgt_cloud`) + `klist` (version-stable form); cosmetic "Not signed in" note so a working PSSO-TGT deployment isn't misread as failed. NO `app-sso diagnose`.
- **#29 Graph URLs** must use the `platformCredentialMethods` nav property (v1.0) — e.g. `GET/DELETE https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods/{methodId}`; never the stale `platformCredentialAuthenticationMethod` URL segment. Delete `[!WARNING]`: severs Entra binding + forces PSSO re-registration; does NOT remote-erase the device Secure Enclave key.
- **Area 4 is largely verify-only** for the macOS glossary — both required terms already exist. Avoid creating a duplicate term.

</specifics>

<deferred>
## Deferred Ideas

- **Graph-managed Platform Credential matrix rows** — NOT added; routed to glossary per SC#3 (D-03). If a future milestone wants a dedicated Graph-management comparison surface, that is a new phase.
- **Standalone "Platform Credential (Graph API)" glossary term** — rejected as redundant (D-07, 84-CONTEXT D-07); the see-also stub remains the sanctioned fallback only if a planner finds the see-also host awkward.
- **Bulk-audit / enumerate-users-with-0-registrations examples in #29** — forward-note only; HIGH complexity, not in SC#5/RUN-02 (D-06).
- **"From L1 escalation" routing in #28/#29** — no L1 Kerberos/Graph runbook exists; nav/triage wiring is Phase 87 (D-05).
- **Navigation-hub / common-issues / quick-ref-l2 / decision-tree Kerberos entries** — Phase 87.
- **Legacy chain-FAIL conversion + new harness files** — Phases 86 / 88.

### Reviewed Todos (not folded)
None — `todo.match-phase` returned no matches for Phase 85.

</deferred>

---

*Phase: 85-capability-matrix-l2-runbooks*
*Context gathered: 2026-06-23*
