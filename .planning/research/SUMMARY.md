# Project Research Summary

**Project:** Windows Autopilot & macOS Provisioning Documentation Suite — v1.18 "Device Configuration Recipes" (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure
**Domain:** Intune/Entra/Apple device-configuration documentation (EEE-conformant Markdown → .docx corpus) — a new "Device Recipe" doc-class shape plus two new content recipes, alongside a separately-scoped validator-tooling-debt pillar
**Researched:** 2026-07-16
**Confidence:** HIGH — all four research files are grounded in directly-fetched Microsoft Learn / Apple Support pages and direct repo reads; a small number of items are explicitly flagged MEDIUM/LOW and called out below.

## Executive Summary

This milestone adds two new provisioning walkthroughs — a self-deploying Entra-joined shared Windows device that runs Windows App as an Azure Virtual Desktop client, and a fully-provisioned Shared iPad — under a brand-new "Device Recipe" doc class. Both recipes are well-supported by first-party Microsoft/Apple documentation (HIGH confidence throughout), and the doc-class integration itself is a pure content-plane change: the existing registry-driven pipeline (`RE-index.md` → `filename-map.md` → publish-bundle) needs zero code changes, `doc_type: Guide` already fits (no new taxonomy value), and `docs/recipes/` as a new top-level directory follows the corpus's own `decision-trees/`/`*-lifecycle/` precedent. The dominant technical risk in both recipes is scope conflation: Recipe #1 must not bleed AVD session-host rules (no Autopilot/ESP, ADMX limits) into the client-endpoint device it actually documents, and must not scope-creep into FSLogix/session-host territory the milestone explicitly excludes; Recipe #2 must not silently promise compliance-policy/Conditional-Access/email-profile support that Apple's Shared iPad platform simply does not have.

The research surfaced four load-bearing conflicts the roadmap/requirements must resolve explicitly rather than let a content-authoring phase discover them late: (1) the milestone brief lists "compliance policy" as a Recipe #2 ingredient, but Shared iPad has compliance policies, Conditional Access, app protection, and email profiles all explicitly unsupported per Microsoft Learn — the recipe's compliance section must document that gap, not implement working compliance gating; (2) doc_type must be Guide, never a new Recipe taxonomy value — C17 won't catch this silently-wrong choice (it only checks presence, not the enum), so it needs a written D-02 standard ruling locked before either recipe's content phase starts; (3) the AVD AutoSubscription feed-URL CSP is documented in most community sources as user-context (./User/Vendor/MSFT/...), which directly collides with Recipe #1's "device-context targeting for everything" table-stakes rule for a no-primary-user device — this is a genuine open technical question, not just a documentation nit, and needs a phase-time spot-check against policy-csp-remotedesktop before the recipe asserts either way; (4) the corpus's existing 08-self-deploying.md (RE-084) states Wi-Fi is unsupported for self-deploying OOBE, but current Microsoft Learn says Wi-Fi is supported (with two extra prompts) — Recipe #1 must independently re-verify rather than copy RE-084 verbatim, and the stale claim should be flagged as a separate RE-084 correction backlog item rather than silently patched as a side effect.

The recommended approach is: lock the doc-class standard and template first (including the decision-point block format, which must be designed against C17 assertion #12's 200-character blockquote cap from day one, not discovered after drafting), then author the two recipes in parallel (they have no cross-dependency), then close with mandatory C17-gate + registry + filename-map + navigation-last integration steps — each of which has a known "looks done but isn't" failure mode documented in PITFALLS.md. The chain-validator debt pillar (V117 pin, 16th Path-A lineage bump, frozen-surface adoption sweep) is a structurally separate work-stream that happens to share scripts/validation/ with the new recipe validators; PITFALLS.md flags real risk of accidentally touching frozen pre-v1.18 sidecar files via copy-paste habit, so roadmap phase sequencing should keep these two work-streams in clearly separated phases even if interleaved in number order.

## Key Findings

### Recommended Stack

The two recipes rest entirely on first-party, version-gated Microsoft/Apple features rather than new code libraries (this is a documentation project). Recipe #1's spine is Windows Autopilot self-deploying mode (Entra-join only, TPM 2.0 + physical hardware mandatory) plus the SharedPC CSP (Settings Catalog "Shared PC" category, EnableSharedPCModeWithOneDriveSync gated to Windows 11 22H2+) plus Windows App (Store ID 9N1F85V9T8BN, the mandatory successor to the legacy Remote Desktop/MSRDC client retired 2026-03-27) plus the RemoteDesktop/AutoSubscription policy CSP for feed auto-discovery. Recipe #2's spine is the ADE enrollment profile's Shared iPad toggle (Supervised = Yes, no user affinity, iPadOS 13.3+/32GB minimum per Microsoft's own floor) plus Managed Apple Account via federated Entra sign-in plus device-licensed, Required-only VPP app assignment.

**Core technologies:**
- Windows Autopilot self-deploying (APv1 only — APv2/Device Preparation has no self-deploying path) — zero/low-touch provisioning of the physical shared kiosk device
- SharedPC CSP / Settings Catalog "Shared PC" — multi-user account lifecycle (single-session enforcement, cache/delete policy) for both Entra and on-prem AD accounts identically
- Windows App (Store app, not Win32/MSRDC) — the AVD client itself; Store deployment gets auto-update and matches Microsoft's current distribution guidance
- RemoteDesktop/AutoSubscription CSP — auto-feeds the AVD workspace URL per signed-in Entra user (device-vs-user CSP scope is an open verification item — see Gaps)
- ADE enrollment profile Shared iPad toggle + Managed Apple Account federation — the entire Shared iPad provisioning spine; changing this on an already-enrolled device forces a factory wipe

### Expected Features

**Must have (table stakes):**
- Recipe #1: APv1 self-deploying, Entra-join-only, TPM 2.0 + wired Ethernet realism, device-phase-only ESP, Windows App as Store app assigned Required/device-context, feed-URL configuration, explicit "assumes AVD host pools/session hosts/FSLogix already exist" scope boundary
- Recipe #1: explicit anti-feature callouts (hybrid join, APv2, Wi-Fi-at-OOBE-as-a-hard-block, legacy MSRDC) — cheap to write, highest cost to omit
- Recipe #2: Supervised + ADE + no-user-affinity + Shared iPad = Yes, >=32GB storage, Managed Apple Account federation as a gating prerequisite (not a mid-recipe step), device-licensed Required-only VPP apps, correct device-vs-user profile-applicability split
- Recipe #2: explicit unsupported-feature callouts (compliance policy/CA/app protection/email profiles/user-licensed VPP/"Available" assignment) — MS Learn flags all of these as silent-failure traps

**Should have (differentiators):**
- Recipe #1: kiosk-vs-shared-desktop admin decision point (Assigned Access/multi-app kiosk vs. SharedPC full desktop — mutually exclusive, must be a forced binary choice); 802.1X Wi-Fi cross-link for post-enrollment wireless operation (reuses existing v1.14 corpus)
- Recipe #2: per-role layered configuration (device-group baseline + user-group overlays), temporary/guest-session decision point, storage-quota (QuotaSize, iPadOS 17+) sizing guidance

**Defer (v2+):**
- Recipe #1: full kiosk-lockdown implementation depth (only GitHub-reference-sourced, MEDIUM confidence), Shared PC as a fully-worked alternative path, Windows 365 Boot as a sibling recipe, multi-workspace subscription scenarios
- Recipe #2: SCIM/OIDC+JIT automated account-provisioning depth (already owned by existing OU-06 doc), bulk Graph/PowerShell automation layer beyond the manual admin-center walkthrough

### Architecture Approach

The doc-class integration is entirely data-plane: a new docs/recipes/ top-level directory (following the decision-trees//*-lifecycle/ "new shape -> new directory" precedent, not nested inside admin-setup-apv1/ or admin-setup-ios/), doc_type: Guide (the closed 4-value taxonomy already covers this shape, per the same D-02 reasoning that classified *-lifecycle/* as Guide in v1.16), and registry rows that flow automatically through the existing generic build-filename-map.mjs/build-publish-bundle.mjs scripts with no code changes. The only genuinely new artifact is the admin decision-point block format, which must compose a short "Ask the admin:" blockquote lead-in (kept under C17's 200-char cap) with a Question/Options/Recorded-As decision table for anything with more than one option — never a code fence (breaks the corpus's body-text-only indexing invariant).

**Major components:**
1. EEE-SOP-standard.md amendment — new D-02 ruling (docs/recipes/* -> Guide) + resolved decision-point block spec, must land before the template
2. docs/_templates/recipe-template.md — built from admin-template.md's skeleton (Prerequisites -> Steps with "What breaks if misconfigured" callouts -> Verification -> Configuration-Caused Failures -> See Also) plus the decision-point block pattern and TEMPLATE-SENTINEL scaffold discipline
3. docs/_registry/RE-index.md rows (RE-222/223[/224]) — Draft -> Approved gate, drives the entire downstream pipeline
4. Navigation-last wiring — docs/index.md only (recipes are provisioning Guides, not troubleshooting Runbooks, so they do NOT get rows in common-issues.md/quick-ref-*)

### Critical Pitfalls

1. Recipe #1 conflates the AVD client endpoint with the AVD session host — Microsoft's multi-session-with-Intune doc (no Autopilot/ESP support, ADMX-limited) targets a different Intune-managed object than this recipe's client device; open Recipe #1 with an explicit scope banner disambiguating the two.
2. Self-deploying's Wi-Fi-unsupported claim is stale — the corpus's own RE-084 says Wi-Fi is not supported at OOBE; current Microsoft Learn says it is (with 2 extra prompts). Recipe #1 must independently re-verify, not copy RE-084 verbatim.
3. doc_type: Recipe would silently pass C17 but violate the locked 4-value taxonomy — C17 only checks presence, not the enum, so this mistake goes undetected by automation; lock Guide in the template/standard before content authoring starts.
4. Decision-point blockquotes will blow the 200-char C17 #12 cap on first draft if rendered like the existing "What breaks if misconfigured" idiom with real explanatory prose — design the format's length discipline before drafting, not after (this is the exact historical retrofit-tax pattern already paid once in this corpus).
5. Shared iPad app-licensing/compliance assumptions inherited from 1:1 iPad habits fail silently — user-licensed VPP, "Available" assignment, compliance policy/CA, and email profiles are all unsupported on Shared iPad with no useful console error; Recipe #2 must state this explicitly rather than let an admin discover it via a non-installing app.

## Implications for Roadmap

Based on research, suggested phase structure (dependency-ordered per ARCHITECTURE.md's "Suggested Build Order," cross-checked against PITFALLS.md's phase-mapping table):

### Phase A: Device Recipe doc-class foundation
**Rationale:** Both recipes and their C17 self-test fixtures need a citable standard ruling and a locked template before content authoring — retrofitting the template after the gray area resolves is more expensive than deciding first.
**Delivers:** EEE-SOP-standard.md D-02 amendment (docs/recipes/* -> Guide), resolved admin decision-point block format (routed through /gsd-discuss-phase + /adversarial-review per PROJECT.md — explicitly not resolved by research), docs/_templates/recipe-template.md with TEMPLATE-SENTINEL, registry ID reservation (RE-222/223[/224], Status: Draft).
**Addresses:** Doc-class integration requirement; decision-point block feature.
**Avoids:** Pitfall #7 (doc_type: Recipe taxonomy violation), Pitfall #8 (C17 #12 blockquote overflow discovered late).

### Phase B: Recipe #1 — Shared Windows AVD-client device
**Rationale:** No dependency on Recipe #2; can run in parallel with Phase C once Phase A's template lands.
**Delivers:** docs/recipes/01-windows-avd-shared-device.md — self-deploying profile -> ESP device phase -> Entra join -> Windows App device-context install -> feed-URL configuration -> kiosk-vs-shared-desktop decision point -> verification (including an interactive end-user Windows App sign-in check).
**Addresses:** Recipe #1 table stakes + kiosk/shared-desktop decision point + anti-feature callouts from FEATURES.md.
**Avoids:** Pitfalls #1 (session-host conflation), #2 (stale Wi-Fi claim), #3 (VM/vTPM confusion), #4 (single-app kiosk failure), #5 (no-primary-user AVD entitlement gap), #6 (FSLogix scope-creep).

### Phase C: Recipe #2 — Shared iPad full provisioning
**Rationale:** No dependency on Recipe #1; parallelizable with Phase B.
**Delivers:** docs/recipes/02-shared-ipad-full-provisioning.md — ADE profile Shared iPad toggle -> Managed Apple Account federation (linked, not re-derived) -> device-group Required VPP apps -> device/user profile split -> temporary-session decision point -> compliance/CA/email non-support callout -> home screen layout -> verification.
**Addresses:** Recipe #2 table stakes + temporary-session decision point + unsupported-feature callouts.
**Avoids:** Pitfalls #9 (duplicating existing OU-07 lifecycle doc instead of linking), #10 (VPP user-licensed/Available trap), #11 (1:1-iPad-assumption cluster: CP/CA/email/passcode), #12 (storage/federation as Prerequisites not Steps), #13 (temporary-session policy gap).

### Phase D: Integration & navigation-last close
**Rationale:** Must follow both content phases (needs stable content to gate C17/registry-status-flip), and navigation wiring is explicitly a project convention to do last, never mid-content.
**Delivers:** C17 gate pass on both new files, registry Draft -> Approved flip (owner-gated), filename-map.md regeneration (never hand-edited), docs/index.md nav section, decision-tree cross-links, check-nav-hub-links.mjs green.
**Addresses:** Publish-pipeline integration.
**Avoids:** Pitfall #14 (filename-map drift), Pitfall #16 (navigation-last skipped because "it's just two docs").

### Phase E (separately scoped, per PROJECT.md): Chain-validator debt closure
**Rationale:** Structurally independent of the two content recipes; research (Pitfall #15) flags real risk of this pillar's scripts/validation/ work colliding with new recipe validators via copy-paste habit if interleaved carelessly.
**Delivers:** V117 pin + readAtV117Close, 16th Path-A lineage bump (v1.18-milestone-audit.mjs, v1.18-audit-allowlist.json, BASELINE_22), check-phase-129..NN.mjs validators, 15th CI coexistence workflow, 3-axis terminal re-audit, FROZEN-AWARE-ADOPTION-SWEEP-01 + O(n^2) chain-runner remediation (per PROJECT.md's already-scoped tooling-debt items).
**Addresses:** Milestone's mandatory-close requirements (not covered by this content research — carried from PROJECT.md).
**Avoids:** Pitfall #15 (accidental frozen-surface edits).

### Phase Ordering Rationale

- Phase A must precede B/C: both recipes inherit the template's decision-point format and doc_type ruling; changing either after content lands means retrofitting two files instead of designing once.
- Phases B and C have zero mutual dependency and should be authored in parallel or either order — architecture research explicitly confirms this.
- Phase D must follow B and C: registry-status-flip and nav wiring are terminal, content-gated steps by convention (navigation-last discipline), not something to interleave mid-authoring.
- Phase E should be sequenced as its own isolated set of phases rather than interleaved step-by-step with B/C, purely to keep the frozen-surface blast radius clean — PITFALLS.md's #15 is explicit that this is a real, not hypothetical, risk given both work-streams touch scripts/validation/.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase B (Recipe #1):** the RemoteDesktop/AutoSubscription device-vs-user CSP scope conflict is unresolved (MEDIUM confidence in STACK.md, explicitly flagged as a genuine phase-time verification item in FEATURES.md) — needs a direct fetch of policy-csp-remotedesktop before the recipe asserts device-context-only targeting works for feed discovery. Also needs re-verification of the MSRDC retirement date (2026-03-27, currently only MEDIUM/community-corroborated) against a first-party Microsoft retirement notice.
- **Phase B (Recipe #1):** kiosk-lockdown implementation depth (Assigned Access packaging, auto-logoff behaviors) is sourced only from the Azure/WindowsAppKiosk GitHub reference, not a first-party how-to — treat as MEDIUM confidence pending a dedicated verification pass if the roadmap pulls this into v1 scope rather than deferring it.
- **Phase C (Recipe #2):** the "maximum resident users" Settings Catalog exposure path (discrete toggle vs. custom OMA-URI-equivalent) needs a live-verification spot-check against the corpus's existing 2026-05-21 [CITED: training; needs live verification] OU-07 doc.

Phases with standard patterns (skip research-phase):
- **Phase A:** doc-class integration is fully grounded in direct repo reads with zero external unknowns — no additional research needed, only the discuss-phase gray area (decision-point block shape) which is a design decision, not a research gap.
- **Phase D:** the registry -> filename-map -> publish-bundle pipeline is unchanged, generic, and already proven across every prior milestone — standard mechanical execution.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Nearly every claim fetched directly from Microsoft Learn / Apple Support; only the AutoSubscription CSP scope and the Azure/WindowsAppKiosk reference-repo details are MEDIUM |
| Features | HIGH | Cross-checked against both first-party docs and the existing corpus's own docs (RE-084, OU-06/OU-07, existing app-deployment/compliance guides); MEDIUM confidence isolated to the same AutoSubscription scope question and MSRDC retirement date |
| Architecture | HIGH | Every claim grounded in direct local-repo reads (EEE-SOP-standard.md, c17-eee-contract.mjs, RE-index.md, templates, pipeline scripts) — no external/web sourcing was needed or used |
| Pitfalls | HIGH | Microsoft Learn verified for all product-behavior claims, repo-verified for all doc-integration claims; MEDIUM only on community-sourced Windows App kiosk failure reports and the AVD per-user-licensing commentary |

**Overall confidence:** HIGH

### Gaps to Address

- **AVD AutoSubscription device-vs-user CSP scope:** most community sources document this as user-context (./User/Vendor/MSFT/...), which conflicts with Recipe #1's device-context-only table stakes for a no-primary-user device. Resolve via a direct fetch of policy-csp-remotedesktop during Phase B planning, and design the recipe's Verification step to explicitly re-apply-per-sign-in-check regardless of which scope wins.
- **Compliance policy vs. milestone brief:** PROJECT.md's v1.18 footer lists "compliance" as a Recipe #2 ingredient, but Microsoft Learn is unambiguous that compliance policies/CA/app protection are unsupported on Shared iPad. This must be resolved explicitly in REQUIREMENTS.md — the recipe's compliance section should document the gap and rely on device-restriction profiles instead, not attempt to implement working compliance-driven access gating.
- **RE-084 stale Wi-Fi claim:** the existing self-deploying admin guide's "Wi-Fi is NOT supported" statement is out of date relative to current Microsoft Learn. Decide during requirements/discuss-phase whether correcting RE-084 is in-scope for this milestone or tracked as a separate backlog item — do not let Recipe #1 silently fix it as a side effect without a REQ line.
- **Decision-point block format:** explicitly named a discuss-phase gray area in PROJECT.md; research provides a grounded option space (blockquote-lead-in + decision-table composite) but does not resolve it. Must be locked in Phase A before Recipe #1/#2 content authoring.
- **Max resident/cached users per Shared iPad:** Apple does not publish a hard maximum and the exact Intune Settings Catalog exposure is unverified against a live page since the corpus's own OU-07 doc's 2026-05-21 citation — needs a phase-time check.
- **Frozen-surface adjacency risk (Pitfall #15):** the chain-validator debt pillar and the new recipe validators share scripts/validation/; roadmap phase sequencing should keep these separated explicitly, not rely on author discipline alone.

## Sources

### Primary (HIGH confidence)
- Microsoft Learn — autopilot/self-deploying, windows/client-management/mdm/sharedpc-csp, windows/configuration/shared-pc/set-up-shared-or-guest-pc, intune/device-configuration/templates/ref-shared-device-settings-windows, intune/intune-service/fundamentals/azure-virtual-desktop, windows-app/whats-new, windows-app/get-started-connect-devices-desktops-apps, windows/configuration/kiosk/, windows-365/enterprise/install-windows-365-app-intune, intune/solutions/azure-virtual-desktop-multi-session
- Apple Support — guide/deployment/shared-ipad-overview-dep9a34c2ba2/web, guide/deployment/prepare-shared-ipad-dep6fa9dd532/web, guide/business/federated-authentication-microsoft-entra-axm8c1cac980/web
- Microsoft Learn — intune/device-enrollment/apple/shared-ipad, intune/intune-service/enrollment/device-enrollment-shared-ipad, intune/intune-service/enrollment/device-enrollment-shared-ios
- Repo (direct reads) — docs/_standards/EEE-SOP-standard.md, scripts/validation/c17-eee-contract.mjs, docs/_registry/RE-index.md, docs/_templates/*.md, scripts/pipeline/build-filename-map.mjs, docs/index.md, docs/admin-setup-apv1/08-self-deploying.md (RE-084), docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md, .planning/PROJECT.md

### Secondary (MEDIUM confidence)
- RemoteDesktop Policy CSP (policy-csp-remotedesktop) — device-vs-user AutoSubscription scope corroborated by two independent community walkthroughs (Rozemuller, LetsConfigMgr), not fully first-party confirmed
- Azure/WindowsAppKiosk GitHub repo (Microsoft org) — kiosk packaging, autologon, session-reset behaviors; Microsoft-authored reference tooling, not a Learn how-to page
- Windows App / MSRDC retirement date (2026-03-27) — cross-corroborated across multiple independent secondary sources (Zoho, Starwind, 4sysops, 9to5azure), not yet re-confirmed against a single first-party retirement-notice page
- "Manage shared devices for frontline workers" (Entra Shared Device Mode is iOS/Android only, not Windows) — WebSearch-summarized, recommend a direct-fetch spot-check given how consequential this scope-narrowing finding is

### Tertiary (LOW confidence)
- AVD/Windows 365 per-user licensing model commentary (Redress Compliance, TechTarget, Bridgeall) — general market commentary, not a primary Microsoft billing source; verify against azure/virtual-desktop/licensing before Recipe #1 finalizes any SKU-specific claim

---
*Research completed: 2026-07-16*
*Ready for roadmap: yes*
