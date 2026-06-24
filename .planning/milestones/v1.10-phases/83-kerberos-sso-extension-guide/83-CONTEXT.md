# Phase 83: Kerberos SSO Extension Guide - Context

**Gathered:** 2026-06-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Author a new Intune admin-setup guide `docs/admin-setup-macos/10-kerberos-sso-extension.md` teaching Intune admins to configure the Apple Kerberos SSO extension (`com.apple.AppSSOKerberos.KerberosExtension`, Type Credential) via the Intune Custom Template (.mobileconfig) path, integrated with Platform SSO TGT sharing — plus surgical cross-link edits to guide `09`, `00-overview.md`, and `_glossary-macos.md`.

**In scope:** New guide 10 (PSSO-coexistence framing, .mobileconfig deployment, realm/KDC prerequisites as a bounded callout, PSSO+Kerberos TGT integration, diagnostics); guide 09 one-sentence forward-link replacement; `00-overview.md` Mermaid + bullet node for guide 10; glossary Kerberos SSO Extension entry. Requirements KRB-01..04.

**Out of scope (other phases / deferred):** L2 Kerberos troubleshooting runbook (#28) → **Phase 85**; capability-matrix Kerberos rows → **Phase 85**; navigation-hub / quick-ref-l2 integration → **Phase 87**; on-prem-AD-only (non-Entra) Kerberos realm deep-dive → **KRBFUT-01 (v2)**; standalone Kerberos-without-PSSO as a primary configuration path (FEATURES anti-feature — note only).
</domain>

<decisions>
## Implementation Decisions

All four gray areas were adjudicated via `/adversarial-review` (Finder → Adversary → Referee, Opus). Winners are mutually consistent and within v1.10 scope locks. Per-area reasoning and the disproved objections are recorded in `83-DISCUSSION-LOG.md`.

### Primary framing (Area 1)
- **D-01:** Guide 10 is framed **PSSO-coexistence-primary** — the on-prem-AD-Kerberos-running-alongside-Platform-SSO pattern (shared TGT via `usePlatformSSOTGT` / `custom_tgt_setting`) is the spine. Standalone-without-PSSO and co-equal framings were rejected (confirmed scope CRIT: FEATURES anti-feature "mention standalone only as a note"; SUMMARY "standalone out of v1.10 scope").
- **D-02:** Standalone-without-PSSO appears **only as a brief note**, never as a co-equal configuration path.
- **D-03:** Pin the **macOS 14.6 floor** for PSSO-integrated Kerberos TGT sharing — do not let the standalone macOS 10.15+ floor surface as the primary version statement.
- **D-04:** Cloud Kerberos / Azure Files stays a **limited-preview callout** (not GA, not the primary path). The "PSSO-coexistence primary" decision keys on the on-prem `usePlatformSSOTGT` pattern — NOT on Cloud Kerberos (the Finder's coupling objection was ruled a false positive).

### Guide structure (Area 2)
- **D-05:** Use a **custom structure adapted for the Custom-Template/.mobileconfig deployment** — a hybrid. Mirroring guide 07 exactly was rejected (confirmed CRIT: guide 07 is a Settings-Catalog-shaped doc; KRB-01 mandates Custom Template/.mobileconfig, NOT Settings Catalog).
- **D-06:** The **Steps** section is custom (`.mobileconfig` Custom Template upload: realm, Hosts array, `Type: Credential` payload) — NOT the Settings-Catalog picker flow.
- **D-07:** **Keep the shared suite anchors** for cross-doc consistency and downstream validators: Platform-gate header, `## Prerequisites`, `## Verification`, `## See Also`, and the version-history table. Include the K-2-mandated opening disambiguation box ("What this guide is NOT" — distinct from Platform SSO and the Microsoft Enterprise SSO plug-in), which guide 07 has no native slot for.

### On-prem AD prerequisite depth (Area 3)
- **D-08:** Use a **bounded "prerequisites you own" callout** (≤1 paragraph) linking out to Apple's Kerberos SSO Extension guide + Microsoft's Kerberos-PSSO guide for AD-side realm/KDC/SRV setup. Full AD/KDC/DNS-SRV walkthrough was rejected (confirmed double CRIT: K-4 over-documentation + audience lacks AD-admin access; deep AD work = deferred KRBFUT-01). The bounded callout **is** the KRB-01 prerequisite delivery (the "too thin" objection was ruled a false positive — K-4's prevention strategy mandates exactly one link-out callout).
- **D-09:** Still satisfy KRB-01 in-scope, Intune-admin-facing payload values: realm name (**ALL CAPS**), `Hosts` array shape, and the on-prem-AD dependency note. No `nltest`, no DC-diagnostic, no OU/forest content (K-4 warning signs).

### Diagnostics scope (Area 4)
- **D-10:** **Lock the diagnostic command set now.** Default to **`klist` + `app-sso platform -s`** as the canonical pair. Leave-to-planner was rejected (re-opens a HIGH-confidence resolved question; drops the guard against the banned `app-sso diagnose`). Naming the same commands here and in runbook #28 (Phase 85) is intended reuse per RUN-01 — not a cross-phase leak (ruled a false positive).
- **D-11:** **Pin the `klist` invocation** to a version-stable form — no macOS-version-variant flags (avoid unguarded `klist -v`) per K-3.
- **D-12:** **Bind the output interpretation:** `app-sso platform -s` reports `tgt_ad` (on-prem) vs `tgt_cloud` (Entra) ticket paths — document what each signals. Include the cosmetic **"Not signed in"** menu-bar note so L1/L2 don't misread a working PSSO-TGT deployment as failed.
- **D-13:** **`app-sso diagnose` is PROHIBITED** (UNVERIFIED, banned since v1.9 Phase 80). The standalone `app-sso kerberos` subcommand may be added **only** after plan-time verification against a live macOS 14.6+ binary (MEDIUM confidence); the guide ships without it by default.

### Claude's Discretion
- Exact section ordering within the custom Steps flow, callout wording, and table layouts are left to the planner/executor, subject to the anchors in D-07 and the caveats above.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & scope
- `.planning/ROADMAP.md` — Phase 83 section (goal, success criteria 1–5, plans 83-01/02/03); also Phase 85 (L2 runbook #28 + matrix — NOT this phase) and Phase 87 (nav hub — NOT this phase)
- `.planning/REQUIREMENTS.md` — KRB-01..04 (in scope), RUN-01 (runbook #28, Phase 85), KRBFUT-01 (v2 deferred), out-of-scope table
- `.planning/PROJECT.md` — v1.10 milestone goal + key context (single-feature content milestone; sequential-on-main-tree)

### Research (v1.10 — all HIGH confidence for Kerberos)
- `.planning/research/PITFALLS.md` §K-1 (exact extension identifier `com.apple.AppSSOKerberos.KerberosExtension` — source from Apple docs, not memory), §K-2 (three-way disambiguation table — Kerberos ext vs PSSO vs Enterprise SSO plug-in), §K-3 (diagnostics: `app-sso platform -s` + `klist`; `app-sso diagnose` banned; `app-sso kerberos` plan-time-verify), §K-4 (on-prem AD over-documentation guard — one callout only), §K-5 (Redirect-vs-Credential payload trap)
- `.planning/research/FEATURES.md` — Kerberos table-stakes (line ~111 AD dependency LOW complexity; line ~114 tgt_ad/tgt_cloud output interpretation; line ~132 standalone anti-feature) + dependency ordering (guide 10 assumes guide 07 / PSSO already configured)
- `.planning/research/SUMMARY.md` — scope locks (line ~58 standalone out of scope; line ~57 Cloud Kerberos limited-preview), diagnostics resolution (lines ~210/233)

### Existing docs to edit / cross-link (full paths)
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` — **NEW FILE** (this phase's primary deliverable)
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` §"Kerberos SSO Extension (Coexistence)" (~line 140) — replace the deferred-item sentence (`...deferred to a future documentation phase — see PSSO-FUT-04`) with a live forward link to guide 10; no other prose in guide 09 changes (KRB-04)
- `docs/admin-setup-macos/00-overview.md` — extend Mermaid diagram + bullet list with a guide 10 node (KRB-04)
- `docs/_glossary-macos.md` — add a Kerberos SSO Extension entry
- `docs/admin-setup-macos/07-platform-sso-setup.md` — structural reference ONLY (Settings-Catalog template; do NOT mirror its deployment Steps — KRB-01 requires Custom Template). Its Configuration-Caused-Failures table routes to `35-macos-sso-sign-in-failure.md`, not runbook #28.
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — structural reference for suite anchors/format consistency

### External authoritative sources (for the bounded AD callout — D-08)
- Apple Developer Docs — ExtensibleSingleSignOnKerberos: `https://developer.apple.com/documentation/devicemanagement/extensiblesinglesignonkerberos`
- Microsoft Learn — Enable Kerberos SSO in Platform SSO: `https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration` (plist sample confirms `ExtensionIdentifier` = `com.apple.AppSSOKerberos.KerberosExtension`)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Guide 07/08/09 suite format**: Platform-gate header, `last_verified`/`review_by`/`applies_to`/`audience`/`platform` frontmatter, `## See Also`, version-history table — reuse for guide 10 (D-07).
- **Guide 09 §"Kerberos SSO Extension (Coexistence)"** (~lines 140–148): already establishes the additive-to-PSSO framing and the separate-Extension-Identifier requirement — guide 10 must be consistent with it (and replaces its closing deferred-note sentence per KRB-04).

### Established Patterns
- **Three-way SSO disambiguation** (guide 09 Product-Name Disambiguation + Decision Matrix): guide 10's opening disambiguation box should mirror this style (K-2).
- **Custom Template (.mobileconfig) vs Settings Catalog distinction**: the suite already warns about Settings-Catalog-vs-Device-Features confusion in guide 09 §"Key functional difference" — guide 10 extends this to the .mobileconfig path.

### Integration Points
- `00-overview.md` Mermaid flow + bullet list (new guide 10 node).
- `_glossary-macos.md` (new term + see-also).
- Guide 09 forward-link (single-sentence surgical replacement — KRB-04).

</code_context>

<specifics>
## Specific Ideas

- Extension identity must be the **exact literal** `com.apple.AppSSOKerberos.KerberosExtension`, Type **Credential** (not Redirect), Team ID `apple` — sourced from Apple docs, not memory (K-1). Include a side-by-side Extension-Identifier comparison table vs the Microsoft PSSO identifier `com.microsoft.CompanyPortalMac.ssoextension` (K-1 prevention).
- PSSO+Kerberos TGT integration section: `usePlatformSSOTGT`, `custom_tgt_setting` (Company Portal 2508+ gate), macOS 14.6 floor, cosmetic "Not signed in" note, Azure Files Cloud-Kerberos limited-preview callout.

</specifics>

<deferred>
## Deferred Ideas

- **L2 Kerberos troubleshooting runbook (#28)** — Phase 85 (RUN-01). Guide 10's diagnostics section feeds it but does not author it.
- **macOS capability-matrix Kerberos rows** — Phase 85.
- **Navigation-hub / `quick-ref-l2.md` Kerberos entries** — Phase 87.
- **On-prem-AD-only (non-Entra) Kerberos realm deep-dive** — KRBFUT-01 (v2). Out of v1.10 scope.
- **Standalone Kerberos-without-PSSO as a primary path** — FEATURES anti-feature; kept as a note only, never elevated.

</deferred>

---

*Phase: 83-kerberos-sso-extension-guide*
*Context gathered: 2026-06-22*
