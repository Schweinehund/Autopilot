# Phase 84: Graph API Doc + NUAL Key Table - Context

**Gathered:** 2026-06-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver two things plus their cross-links: (1) a **new** Graph-API operations doc `docs/admin-setup-macos/11-graph-api-platform-credential.md` for programmatic management of macOS Secure Enclave Platform Credentials — the GA `platformCredentialAuthenticationMethod` resource (Graph **v1.0**, not beta), **List / Get / Delete** only (no Create/Update — credentials are device-initiated), key properties, a permissions matrix (read vs delete; delegated vs application; national-cloud), the mandatory destructive-Delete `[!WARNING]` callout, and a leaver/offboarding automation pattern; and (2) a **surgical edit** to guide 08's NUAL section replacing the v1.9 deferred-item blockquote with the verified MDM payload key literals.

**In scope:** New guide 11 (hybrid suite-anchored + operations-reference shape); guide 08 NUAL table consolidation with verified key literals; `00-overview.md` guide-11 node (Mermaid + numbered list); `_glossary-macos.md` Platform-Credential-term extension + see-also. Requirements GRAPH-01, GRAPH-02, NUAL-01. Closes PSSO-FUT-01 and PSSO-FUT-02.

**Out of scope (other phases / deferred):** Bulk-audit / enumerate-users-with-0-registrations reporting examples → **Phase 85 RUN-02** (L2 runbook #29 enumerate/verify); macOS capability-matrix Graph-credential rows → **Phase 85 REF-01**; reciprocal `_glossary.md` (Windows glossary) see-also + 4-platform comparison cell updates → **Phase 85 REF-02**; navigation-hub / quick-ref-l2 integration → **Phase 87**; Create/Update operations (do not exist — device-initiated only); scripting credential *creation* (FEATURES anti-feature).
</domain>

<decisions>
## Implementation Decisions

All four gray areas were adjudicated via `/adversarial-review` (Finder → Adversary → Referee, Opus). Three Finder winners survived unchallenged; the Adversary disproved exactly one sub-decision (HTTP vs SDK lead), upheld by the Referee. Per-area reasoning and disproved objections are recorded in `84-DISCUSSION-LOG.md`.

### Graph doc shape (Area 1)
- **D-01:** Guide 11 uses a **hybrid** structure (option 1c) — keep the mandatory shared suite anchors (frontmatter, Platform-gate header, `## Prerequisites`, `## Verification`, `## See Also`, version-history table; opening disambiguation box where useful) but the **body is operations-reference-shaped**: resource reference → List/Get/Delete operations → permissions matrix → `[!WARNING]` callout → automation pattern. Mirrors how Phase 83 guide 10 adapted its body (D-05/D-07) to a non-Settings-Catalog deliverable. **Rejected:** 1a (forces a Settings-Catalog/config-guide body onto a Graph API — same error D-05 rejected); 1b (no-anchors API reference — drops the `## See Also`/`[!WARNING]` slots SC#5 + G-2 require and breaks the cross-link harness).

### Automation depth + primary surface (Area 2)
- **D-02:** Automation depth is **middle** (option 2c) — include the **leaver/offboarding pattern** (FEATURES' "most common automation use case": get user credentials → confirm → delete) with a **mandatory dry-run/confirmation step** (SC#2 + PITFALLS G-2). **Do NOT** include bulk-audit / enumerate-users-with-0-registrations examples — that is HIGH-complexity and belongs to Phase 85 RUN-02 (runbook #29). A one-line forward cross-link to #29 is acceptable.
- **D-03:** **HTTP is the primary/canonical surface; the PowerShell SDK (`Microsoft.Graph.Identity.SignIns`) is a required co-equal companion** for each operation. *(This OVERTURNS the Finder's SDK-primary suggestion.)* Rationale: SC#1 lists "HTTP **and** PowerShell SDK examples" co-equal with HTTP named first; GRAPH-01 introduces the SDK with "and" (additive coverage, not lead); the canonical, Microsoft-Learn-verifiable endpoints (G-1) are written as HTTP. The dry-run requirement is dual-track (G-2 accepts `-WhatIf` **or** a `--dry-run`/review loop), so SDK-native `-WhatIf` does not elevate the SDK to primary. **Both surfaces are still mandatory** per GRAPH-01 — neither may be dropped.

### NUAL key presentation (Area 3)
- **D-04:** Replace guide 08's existing NUAL Settings-Catalog table with **one consolidated table** (option 3c) carrying: display name + verified MDM plist key literal + type/values + the one-time-vs-persistent dimension. **Rejected:** 3a pure additive column (leaves the existing `New User Authorization Mode` enum cell at `08-auth-methods-deep-dive.md:275` factually wrong — it omits `Temporary`); 3b separate second table (trips PITFALLS N-2 two-table redundancy).
- **D-05:** The consolidated table MUST: use verified literals `NewUserAuthorizationMode` (one-time; **Standard/Admin/Groups/Temporary**) and `UserAuthorizationMode` (persistent; Standard/Admin/Groups); **correct the existing line-275 cell to include `Temporary`**; surface the `EnableCreateUserAtLogin` prerequisite (with the existing `UseSharedDeviceKeys=Enabled` dependency); surface the **one-time-vs-persistent behavioral asymmetry** (e.g., the day-1-Admin-then-Standard example); and note that **`Temporary` is defined in the Apple schema but is NOT surfaced in the Intune Settings Catalog UI**.
- **D-06:** **Remove** the v1.9 deferred-item blockquote at `08-auth-methods-deep-dive.md:278-286` (do not append to it). This closes PSSO-FUT-01 (SC#4). It is a **surgical edit** — do not rewrite the `## New User At Login Window` section prose (PITFALLS N-2).

### Glossary integration (Area 4)
- **D-07:** **Extend the existing Platform SSO / Secure Enclave Platform Credential glossary term with a reciprocal see-also pointer to guide 11** (option 4b) — matches the glossary's D-15 reciprocal-`> See also:` convention (`_glossary-macos.md` lines 128/140/146/158). **Rejected:** 4a new standalone "Platform Credential Graph API" term (partly redundant — the credential is already defined under the Platform SSO and Secure Enclave terms; enlarges the REF-02 surface for marginal value). Confidence MED-HIGH — 4a remains defensible under SC#5's either/or; if planning finds the see-also host awkward, a short dedicated stub is an acceptable fallback.

### Endpoint reconciliation (MANDATORY — feeds Plan 84-01)
- **D-08:** 🔴 **The research contradicts itself on the DELETE URL.** `PITFALLS.md:201` (and prose at :224) writes `.../authentication/platformCredentialAuthenticationMethod/{id}`, but `PITFALLS.md:198-200` (GET) and `FEATURES.md:153-156` use `.../authentication/platformCredentialMethods/{methodId}`. The **navigation property is `platformCredentialMethods`**; `platformCredentialAuthenticationMethod` is the *resource type*, NOT the URL segment. **The doc MUST use the `platformCredentialMethods` form for ALL operations including DELETE** — e.g. `DELETE https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods/{methodId}`. Do NOT propagate the stale `PITFALLS.md:201/224` wording. **Plan 84-01 MUST reconcile the exact path AND confirm v1.0-not-beta against live Microsoft Learn before drafting** (PITFALLS G-1 verification guard).
- **D-09:** Least-privilege Graph **delete** scope resolved at plan time (PITFALLS G-3) — confirm `UserAuthenticationMethod.ReadWrite.All` (delete) vs the correct read scope against the live permissions reference; distinguish delegated vs application and note national-cloud availability (GRAPH-02, SC#1).

### Claude's Discretion
- Exact section ordering within the operations body, callout wording, table column layout, and which guide-10 anchors to carry vs drop are left to the planner/executor, subject to the suite anchors in D-01 and the must-surface items in D-05.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & scope
- `.planning/ROADMAP.md` — Phase 84 section (goal, success criteria 1–5, plans 84-01/02/03); also Phase 85 (bulk-audit/enumerate → RUN-02 runbook #29; matrix → REF-01; glossary reciprocity → REF-02 — NOT this phase) and Phase 87 (nav hub — NOT this phase)
- `.planning/REQUIREMENTS.md` — GRAPH-01, GRAPH-02 (in scope), NUAL-01 (in scope); RUN-02 / REF-01 / REF-02 (Phase 85, out of scope here)
- `.planning/PROJECT.md` — v1.10 milestone goal; single-feature content milestone + over-documentation discipline; sequential-on-main-tree (no worktrees)

### Research (v1.10 — all HIGH confidence for Graph & NUAL)
- `.planning/research/PITFALLS.md` §G-1 (resource is **GA on `/v1.0/`, not beta** — verify URL prefix; endpoints lines 197–201 — note the :201/:224 DELETE inconsistency per D-08), §G-2 (mandatory `> [!WARNING]` for destructive DELETE + dry-run/confirmation in automation — HARD requirement, line ~239), §G-3 (correct least-privilege read-vs-delete scope; permission table line ~264), §N-1/§N-2 (NUAL surgical-edit discipline; do NOT add a redundant second table or rewrite the section)
- `.planning/research/FEATURES.md` — Surface 2 Graph (resource = single Secure Enclave Platform Credential registration, line ~141; endpoint shapes lines 143/153–156; credential lifecycle + Delete severs Entra binding / does NOT erase device SE key, line ~164; leaver pattern = "most common automation use case" line ~211; bulk-audit = HIGH complexity line ~212; SDK cmdlets lines ~201–202); Surface 3 NUAL (verified literals + asymmetry line ~237/255; `Temporary` note line ~282)

### Existing docs to create / edit / cross-link (full paths)
- `docs/admin-setup-macos/11-graph-api-platform-credential.md` — **NEW FILE** (this phase's primary deliverable; hybrid shape per D-01)
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` §"New User At Login Window (NUAL)" (lines ~260–287) — consolidate the NUAL table (D-04/D-05), **correct the line-275 enum cell** to add `Temporary`, **remove the deferred blockquote at lines 278–286** (D-06); no other NUAL prose changes
- `docs/admin-setup-macos/00-overview.md` — extend Mermaid diagram + numbered list with a guide 11 node (SC#5); follow the Phase 83 guide-10 node precedent (lines ~52, ~76)
- `docs/_glossary-macos.md` — extend the Platform SSO / Secure Enclave Platform Credential term with a reciprocal `> See also:` to guide 11 (D-07); reuse the D-15 see-also convention (lines 128/140/146/158)
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` — **structural reference** for the hybrid suite-anchor set (Platform-gate, "What this guide is NOT", `## Prerequisites`, `## Verification`, `## See Also`, version-history table); shipped Phase 83
- `docs/admin-setup-macos/07-platform-sso-setup.md` — structural reference only (do NOT mirror its Settings-Catalog body — guide 11 is a Graph API doc)
- `.planning/phases/83-kerberos-sso-extension-guide/83-CONTEXT.md` — prior decisions D-05/D-07 (hybrid doc shape + keep shared anchors precedent)

### External authoritative sources (verify at plan time — D-08/D-09)
- Microsoft Learn — `platformCredentialAuthenticationMethod` resource (v1.0): `https://learn.microsoft.com/en-us/graph/api/resources/platformcredentialauthenticationmethod?view=graph-rest-1.0`
- Microsoft Learn — list permissions: `https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-list?view=graph-rest-1.0`
- Microsoft Learn — delete permissions: `https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-delete?view=graph-rest-1.0`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Guide 07/08/09/10 suite format**: Platform-gate header, `last_verified`/`review_by`/`applies_to`/`audience`/`platform` frontmatter, `## Prerequisites`, `## Verification`, `## See Also`, version-history table — reuse the mandatory anchors for guide 11 (D-01).
- **Guide 10 hybrid precedent** (shipped Phase 83): anchors + a custom non-Settings-Catalog body — the direct template for guide 11's shape.
- **Suite `> [!WARNING]` / `> [!CAUTION]` blockquote convention** for destructive operations (used in `03-esp-policy.md`, `win32-app-packaging.md`) — reuse for the Delete callout (D-01, G-2).

### Established Patterns
- **Glossary reciprocal `> See also:`** appended inside existing term blockquotes (D-15 convention; `_glossary-macos.md` lines 128/140/146/158) — the pattern for D-07.
- **`00-overview.md` guide-node addition** (Mermaid + numbered list), as Phase 83 did for guide 10 (lines ~52/~76).
- **Surgical single-section edits** to existing guides (Phase 83 KRB-04 guide-09 one-sentence replacement) — the model for the NUAL edit's blast-radius discipline (D-06).

### Integration Points
- `00-overview.md` Mermaid flow + numbered list (new guide 11 node).
- `_glossary-macos.md` (extend existing term + see-also).
- Guide 08 NUAL table (in-place consolidation) — the one cross-doc edit outside the new file.

</code_context>

<specifics>
## Specific Ideas

- Graph resource is the GA `platformCredentialAuthenticationMethod` (**v1.0**), representing a single Secure Enclave Platform Credential registration; key properties to document: `id`, `displayName`, `createdDateTime`, `keyStrength`, `platform`.
- Operations limited to **List / Get / Delete** — explicitly note there is no Create/Update (credentials are device-initiated via Company Portal registration).
- The Delete `[!WARNING]` must state: Delete **severs the Entra binding and forces PSSO re-registration**, and **does NOT remote-erase the device Secure Enclave key** (the hardware key persists; only the Entra-side record is removed).
- NUAL verified literals: `NewUserAuthorizationMode` (one-time; Standard/Admin/Groups/**Temporary**), `UserAuthorizationMode` (persistent; Standard/Admin/Groups), `EnableCreateUserAtLogin` prerequisite; `Temporary` exists in Apple schema but not the Intune UI.

</specifics>

<deferred>
## Deferred Ideas

- **Bulk-audit / enumerate-users-with-0-registrations reporting examples** — Phase 85 RUN-02 (L2 runbook #29 enumerate/verify). HIGH complexity; guide 11 forward-links to it but does not author the examples.
- **macOS capability-matrix Graph-credential rows** — Phase 85 REF-01.
- **Reciprocal `_glossary.md` (Windows glossary) see-also + 4-platform comparison cell updates** — Phase 85 REF-02.
- **Navigation-hub / `quick-ref-l2.md` Graph-credential entries** — Phase 87.
- **Create/Update Graph operations** — do not exist (device-initiated only); never document as available.
- **Scripting credential *creation*** — FEATURES anti-feature; never elevate.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 84-graph-api-doc-nual-key-table*
*Context gathered: 2026-06-23*
