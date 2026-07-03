# Phase 102: Windows 802.1X Admin-Setup (Wi-Fi + Wired) - Context

**Gathered:** 2026-06-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the **Windows** per-platform 802.1X admin-setup guide — the first of the five per-platform guides (Phases 102–106) that link into the Phase-101 foundation. Phase 102 delivers:

- `docs/admin-setup-8021x/03-windows.md` — Windows Wi-Fi + wired 802.1X Intune profiles for all three co-equal EAP methods (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS), satisfying **DOT1X-04**.
- A **local entry** added to the `docs/admin-setup-8021x/00-overview.md` platform-guide list (item 3 — the overview already reserves "3–7. Platform guides (Phase 102–106) — entries added as each guide is authored").
- The **one-line scope banner** (per Phase 101 D-06) linking to the canonical scope callout in `02-cert-delivery-foundation.md`.

**In scope:** Windows Intune Wi-Fi + wired network profile configuration; auth mode (User/Machine/User-or-machine); dot3svc service dependency + Remediation pattern; 802.1X enforcement-staging DANGER callout; `PerformServerValidation` security requirement; SCEP/PKCS/PFX-Import client-cert options (linking cert mechanics to `02-`); KB5014754 Hybrid Entra Joined strong-mapping callout; TEAP one-paragraph awareness note.

**Out of scope (deferred to owning phases / out of milestone):**
- Per-platform macOS/iOS/Android/Linux guides → Phases 103–106.
- L1 triage + L2 investigation runbooks + decision tree → Phases 107–108.
- Capability-matrix 802.1X rows + global nav-hub wiring (`index.md`, quick-refs, etc.) → **Phase 109 (navigation-last)**. Only the *local* `00-overview.md` platform-list entry is in scope here.
- Shared concepts (cert-delivery ordering rule, EKU, server-name-validation theory, EAP-method comparison) — **already homed in `01-`/`02-`; this guide links, never restates** (link-not-copy).
- RADIUS/NPS server config, PKI/CA build-out (ADCS/NDES), Certificate Connector install, switch/AP port config, MAB — out of milestone scope entirely.
- TEAP deep-dive / co-equal treatment; productionized standalone PowerShell scripts (those belong in the repo's `src/powershell/` tier, not this doc).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus) per the user's instruction to "use /adversarial-review to recommend the best one and provide your reasoning." The Referee's calibrated verdicts are locked below. Two of the six sub-decisions were research-grounded overturns of the Finder's initial pick (C-cadence, D-path); four were confirmed. See `102-DISCUSSION-LOG.md` for the full scored reasoning. **No locked pick violates a hard constraint** (co-equal EAP, link-not-copy, navigation-last, Intune client-side scope).

### Area A — Internal structure of `03-windows.md`  →  **A3: Hybrid** (HIGH)
- **D-01:** Structure the file as **shared "common profile mechanics" section → Wi-Fi subsection → Wired subsection**, with a **compact per-EAP-method config matrix** inside each connection subsection (three methods in one grid — preserves co-equal EAP by construction, mirrors the `01-` EAP-comparison and `02-` asymmetry matrices).
- **D-02:** **Wired-only concerns are homed exactly once, in the Wired subsection:** dot3svc service dependency, 802.1X enforcement-staging, TEAP awareness note. They are NOT repeated per-EAP-method.
- **D-03:** The "common mechanics" section links cert-delivery prerequisites to `02-` (does not restate ordering rule / EKU / server-name-validation theory); covers Windows auth mode and the `PerformServerValidation` requirement at guide altitude.
- **Template note (load-bearing for Phases 103–106):** This structure is the reusable per-platform template. For gap platforms it degrades cleanly — Android collapses the Wired subsection to a one-paragraph gap stub; Linux collapses to the nmcli/script note. EAP-method-first (A2) was **rejected** — it scatters wired-only pitfalls across three method sections and gives TEAP a top-level home that reads as a 4th co-equal method (violates co-equal-EAP + link-not-copy).

### Area B — dot3svc Intune Remediation depth  →  **B2: documented pattern + cmdlets** (HIGH)
- **D-04:** Document the **detect→remediate pattern**, not a productionized script. Include: the detection signal (`sc query dot3svc` → STATE: STOPPED / Manual startup), the load-bearing cmdlets (`Get-Service dot3svc`, `Set-Service -StartupType Automatic`, `Start-Service dot3svc`), and the **Intune Remediations UI path** for deploying detection + remediation.
- **D-05:** **Do NOT ship a full parameterized `Detect-*.ps1` / `Remediate-*.ps1` pair** with packaging steps. SC2 mandates a "pattern," not a production script; a shipped script over-reaches the doc's altitude and creates a freshness liability in a docs corpus. B3 (bare pointer) was **rejected** — it under-delivers against a top-tier silent-failure pitfall (profile reports "Succeeded" while the port never authenticates, pitfall B-01).

### Area C — KB5014754 strong-mapping callout: cadence + placement
**Cadence  →  C-cad-180** (MEDIUM, research-grounded overturn)
- **D-06:** **File-level front-matter `review_by` stays 90-day** (corpus-uniform: `last_verified` + 90). The **inline KB5014754 callout carries its OWN `last_verified`/`review_by` stamp set to +180 days** (drift-risk-appropriate per PITFALLS E-03's two-tier mechanism). The two stamps measure different things and do not conflict.
- **Rationale:** Research Q7 (`SUMMARY.md` ~l.343) explicitly maps "stable Windows callouts → 180-day"; KB5014754 has enforced since 2025-02-11 (the canonical stable Windows gate). E-03 mandates a per-callout inline stamp at "+90 or +180 depending on drift risk."

**Placement  →  C-place-callout** (HIGH)
- **D-07:** The KB5014754 / SID-in-SAN requirement is a **standalone, scoped "Hybrid Entra Joined" callout** (NOTE-style, labeled so cloud-only admins see at a glance it doesn't apply), NOT inline inside one EAP-TLS subsection. It cross-cuts both Wi-Fi + Wired (under A3, EAP-TLS appears in both connection subsections — inline would force duplication, a link-not-copy tension).
- **D-08:** Callout content: as of 2025-02-11, DCs enforce strong cert mapping (KB5014754); **Hybrid Entra Joined** devices doing EAP-TLS need the **SID included in the certificate SAN**; Intune SCEP/PKCS profiles can now include the SID; **cloud-only Entra Joined devices are unaffected.**

### Area D — Intune authoring path + TEAP scope
**Path  →  D-path-both** (MEDIUM, research-grounded overturn)
- **D-09:** Document the **Templates path as primary** (`Devices > Configuration > New policy > Windows 10 and later > Templates > Wi-Fi` / `Wired network`) **PLUS a single sentence** noting the Settings Catalog also exposes these settings and may offer more granular options.
- **D-10 (binding guardrail):** The Settings Catalog acknowledgment is **ONE sentence, NOT a second walkthrough.** Per STACK ~l.332 verbatim: "note both in docs, use Templates as primary." This note is **Windows-scoped** (STACK ~l.26: macOS/iOS use the dedicated template as the standard approach) so it does **NOT** propagate into the 103–106 template.

**TEAP  →  D-teap-note** (HIGH)
- **D-11:** TEAP gets a **one-paragraph awareness note** in the Wired subsection: TEAP exists, is **unique to Windows wired**, chains machine+user credentials (Primary/Secondary EAP) — but is **NOT given co-equal config steps**. A full TEAP config section is **rejected** (co-equal-EAP constraint; would contradict the already-shipped `01-eap-method-overview.md` l.154 which promises exactly a one-paragraph note here, and the `02-` canonical scope callout listing TEAP as "not a co-equal guide path").

### Claude's Discretion
- Exact prose, callout phrasing, anchor wording, Mermaid/diagram use, and section ordering within `03-windows.md` — provided the locked decisions above and corpus conventions are honored (`> **Label:**` blockquote callouts; front-matter freshness stamps; plain GitHub auto-slug anchors with no `{#id}` overrides; double-hyphen trap).
- Exact phrasing of the per-EAP-method config matrices and the Identity-privacy/anonymous-outer-identity guidance (pitfall C-01) within the locked A3 structure.
- The wording of the enforcement-staging DANGER callout (must convey: deploy "Do not enforce" first → switch to "Enforce" only after RADIUS reachability + cert pipeline confirmed; break-glass note) per pitfall B-02.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 102" — goal, 4 success criteria (SC1 Wi-Fi 3-EAP + auth mode; SC2 wired dot3svc + Remediation + enforcement DANGER; SC3 SCEP/PKCS/PFX + PerformServerValidation; SC4 KB5014754 strong mapping + freshness stamp); dependency on Phase 101.
- `.planning/REQUIREMENTS.md` — **DOT1X-04** (Windows Wi-Fi + wired, 3 EAP methods, dot3svc + Remediation pattern, PerformServerValidation, SCEP/PKCS/PFX-Import).

### Phase 101 foundation (link targets — this guide LINKS, never restates)
- `docs/admin-setup-8021x/00-overview.md` — folder entry point; **receives the Windows platform-list entry (item 3)**; Mermaid setup-sequence + descriptive link-list house style.
- `docs/admin-setup-8021x/01-eap-method-overview.md` — co-equal EAP-method overview; **l.154 promises the TEAP one-paragraph awareness note lands in this Windows guide** (D-11).
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert-delivery ordering rule, EKU = Client Authentication, RADIUS server-name validation, per-platform cert matrix, **canonical scope callout** (target of the one-line scope banner, D-06 from Phase 101) listing TEAP as "not a co-equal guide path."
- `.planning/phases/101-802-1x-foundation-glossary-eap-methods-cert-delivery/101-CONTEXT.md` — locked Phase-101 conventions (co-equal EAP, link-not-copy, navigation-last, freshness stamps, scope-banner template).

### Research (HIGH confidence — guide content is research-sourced)
- `.planning/research/SUMMARY.md` §"Phase 102 — Windows" (~l.209–215: key content + pitfalls to avoid) and **Q7 (~l.343: 90-day Android / 180-day stable Windows callout cadence — basis for D-06)**; Per-Platform Coverage-Reality Matrix (~l.151–175).
- `.planning/research/STACK.md` — Windows Wi-Fi/wired profile facts: Templates vs **Settings Catalog (~l.26, ~l.332 "note both, use Templates as primary" — basis for D-09/D-10)**; wired TEAP (~l.34/208); auth mode User/Machine/User-or-machine (~l.198/207); PFX Import for wired (~l.96); **KB5014754 strong mapping (~l.300)**.
- `.planning/research/PITFALLS.md` — **B-01** dot3svc (~l.192, basis for D-04/D-05), **B-02** enforcement-staging DANGER (~l.214), **B-03** auth-mode mismatch (~l.233), **A-01** ordering, **A-05/C-02** server validation / rogue-RADIUS, **C-01** anonymous outer identity (~l.382), **E-03** per-callout freshness-stamp two-tier mechanism (basis for D-06).
- `.planning/research/ARCHITECTURE.md` — HYBRID file layout; confirms `03-windows.md` as the single deliverable file (~l.53/128) + shared-vs-per-platform link-not-copy boundary (~l.82–113).

### House-style precedent
- `docs/admin-setup-macos/03-configuration-profiles.md` — feature/connection-first guide structure + `#### In Intune admin center` compact subsections (the A3 precedent).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Foundation files (`00`/`01`/`02`)**: already authored; provide the front-matter freshness-stamp block, the EAP-comparison + cert-asymmetry **matrix patterns** to clone for A3's per-EAP-method config matrices, and the canonical scope callout to link via the one-line banner.
- **Per-platform guide scaffold**: `docs/admin-setup-macos/` (00–11) provides the connection/feature-first guide structure, `> **Label:**` blockquote callout convention, and Intune-admin-center step formatting.
- **PowerShell tier exists** (`src/powershell/`) — but per D-05, the dot3svc Remediation stays a documented *pattern* in the guide; productionized scripts (if ever) belong in that tier, not embedded in markdown.

### Established Patterns
- **link-not-copy** — governs A3 (home shared concepts once, link to `01-`/`02-`), C-place-callout (state KB5014754 once, not duplicated per connection), D-10 (one-sentence Settings-Catalog note, not a second walkthrough).
- **navigation-last** — capability-matrix rows + global nav-hub are **Phase 109**, not 102. Only the local `00-overview.md` platform-list entry is in scope.
- **co-equal EAP** — no "recommended default" method; the per-EAP-method matrix (A3) and the TEAP-as-awareness-note (D-11) both enforce this.
- **Freshness stamps** — file front-matter 90-day (`last_verified` + 90 = `review_by`); **inline KB5014754 callout at +180** (D-06, two-tier per E-03).
- **Anchor slugs** — plain GitHub auto-slugs, no `{#id}` overrides; double-hyphen trap.

### Integration Points
- `docs/admin-setup-8021x/03-windows.md` — new file (does not exist yet).
- `docs/admin-setup-8021x/00-overview.md` — **edited** to add the Windows platform-list entry (item 3) + Mermaid/link wiring; pre-existing file → edit must be harness-allowlisted (same pattern as Phase 101's glossary see-also edits).

</code_context>

<specifics>
## Specific Ideas

- The **dot3svc silent-failure** is the signature Windows-wired pitfall: the wired profile reports "Succeeded" in Intune even when the service is stopped, so the dependency + Remediation pattern must be prominent (D-04).
- The **enforcement-staging DANGER callout** (B-02) is the second highest-consequence Windows-wired fact: "Enforce" before RADIUS/cert readiness can lock ALL wired devices out simultaneously (chicken-and-egg removal). Stage "Do not enforce" → "Enforce"; document break-glass.
- **PerformServerValidation = false + blank "Certificate server names"** is the silent security regression (A-05/C-02 rogue-RADIUS / NT-hash crack for PEAP-MSCHAPv2) — always populate server names + reference a trusted-root profile + enable validation.
- **Anonymous outer identity** (C-01) guidance applies to EAP-TLS Wi-Fi + wired Windows profiles (Identity privacy field) — Claude's discretion on exact phrasing, but include it.
- **Auth mode** is not surfaced prominently in the Intune UI (B-03): document User vs Machine vs User-or-machine with the pre-logon / Hybrid-join vs cloud-native Entra-joined decision guidance.

</specifics>

<deferred>
## Deferred Ideas

- **Settings Catalog full walkthrough** — explicitly NOT authored (D-10 guardrail: one-sentence note only). If a future need arises for a full Settings-Catalog procedure, that is a separate decision, not Phase 102.
- **Productionized dot3svc Remediation scripts** in `src/powershell/` — out of scope; the guide ships a *pattern* (D-05). Could be a future tooling task if the repo's script tier is extended to network-auth remediation.
- **Capability-matrix 802.1X rows + global nav-hub wiring** — Phase 109 (navigation-last). Not Phase 102.
- **macOS/iOS/Android/Linux per-platform guides** — Phases 103–106; this Phase's A3 structure is their template.
- **L1/L2 runbooks + decision tree** (dot3svc-first wired triage, RADIUS rejects, server-trust failures, EAP negotiation) — Phases 107–108.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 102-windows-802-1x-admin-setup-wi-fi-wired*
*Context gathered: 2026-06-30*
