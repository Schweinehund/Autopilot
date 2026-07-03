# Phase 103: macOS 802.1X Admin-Setup (Wi-Fi + Wired) - Context

**Gathered:** 2026-06-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the **macOS** per-platform 802.1X admin-setup guide — the **second** of the five per-platform guides (Phases 102–106) that link into the Phase-101 foundation, and the first to **reuse the locked Phase-102 A3 Hybrid template**. Phase 103 delivers:

- `docs/admin-setup-8021x/04-macos.md` — macOS Wi-Fi + wired 802.1X Intune profiles for all three co-equal EAP methods (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS), satisfying **DOT1X-05**.
- A **local entry** added to the `docs/admin-setup-8021x/00-overview.md` platform-guide list (item 4 — the overview reserves "4–7. Platform guides (Phase 103–106) — entries added as each guide is authored"; Phase 102 added item 3 + narrowed the placeholder to 4–7).
- The **one-line scope banner** (per Phase 101 D-06) linking to the canonical scope callout in `02-cert-delivery-foundation.md`.

**In scope:** macOS Intune Wi-Fi + wired network profile configuration (Templates path); the **immutable deployment-channel decision** (User vs Device keychain — cannot be changed after assignment); the **no-auth-mode-selector** macOS fact (machine/pre-logon auth not exposed via Intune); the **network interface selector** for wired; the **wired SCEP-only / PKCS-not-supported** constraint; the **server-name field suppresses the dynamic trust dialog** behavior (A-04); the **disabling-validation = security-violation** macOS framing (A-05); EAP-TTLS inner-auth (PAP/CHAP/MS-CHAP/MS-CHAP v2); per-EAP-method config matrices in each connection subsection; SCEP/PKCS/PFX-Import cert delivery linked to `02-`.

**Out of scope (deferred to owning phases / out of milestone):**
- Per-platform iOS/iPadOS/Android/Linux guides → Phases 104–106.
- L1 triage + L2 investigation runbooks + decision tree → Phases 107–108.
- Capability-matrix 802.1X rows + global nav-hub wiring (`index.md`, quick-refs, etc.) → **Phase 109 (navigation-last)**. Only the *local* `00-overview.md` platform-list entry is in scope here.
- Shared concepts (cert-delivery ordering rule, EKU, server-name-validation theory, rogue-RADIUS rationale, EAP-method comparison) — **already homed in `01-`/`02-`; this guide links, never restates** (link-not-copy).
- RADIUS/NPS server config, PKI/CA build-out (ADCS/NDES), Certificate Connector install, switch/AP port config, MAB — out of milestone scope entirely.
- Windows-only mechanics (dot3svc, enforcement-staging, TEAP, KB5014754) — those belong to Phase 102 and have **no macOS equivalent**; do NOT clone them in.
- iOS-specific MAC-address-randomization / M-series-iPad wired framing → Phase 104.

</domain>

<decisions>
## Implementation Decisions

All nine sub-decisions across four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus) per the user's instruction to "use /adversarial-review to recommend the best one and provide your reasoning." The Referee's calibrated verdicts are locked below. **One of nine sub-decisions was a research-grounded overturn** of the Finder's initial pick (C-b04, callout → structural/implicit); the other eight were confirmed. See `103-DISCUSSION-LOG.md` for the full scored reasoning. **No locked pick violates a hard constraint** (co-equal EAP, link-not-copy, navigation-last, Intune client-side scope). The A3 Hybrid structure itself is inherited from Phase 102 D-01 and is NOT re-litigated here.

### Area A — Deployment-channel callout (User vs Device keychain; immutable after assignment)
**Placement → A-place-common** (MEDIUM)
- **D-01:** The deployment-channel decision is a **standalone WARNING callout + decision table** placed **at the top of the Common Profile Mechanics section, before the Wi-Fi and Wired subsections.** It is a *cross-cutting* mechanic (the channel applies identically to both connection types per STACK ~l.221) and a *pre-creation* decision (ROADMAP §103 Goal: "before any configuration steps"; SC1: "before profile creation and cannot be changed after assignment"). Homing it once in Common Mechanics honors link-not-copy and stays inside the locked A3 section order.
- **D-02:** **Decision table** maps cert type → channel: **user cert → User channel; device cert → Device channel** (SUMMARY ~l.137). State the immutability + remediation path explicitly: wrong channel = **delete the profile, create a new one, reassign** (STACK ~l.215). A dedicated top-level "Before You Begin" / "Preflight" section (A-place-preflight) was **rejected** — it invents a section absent from the locked Phase-102 template; a callout as the first content in Common Mechanics is already "first" without breaking the clone. Inline-per-connection (A-place-inline) was **rejected** as a link-not-copy violation (duplicates a shared concept).

**Weight → A-weight-warning** (HIGH)
- **D-03:** The callout is **WARNING, NOT DANGER.** Research prescribes "WARNING callout" verbatim (SUMMARY ~l.76, ~l.137, ~l.221). **DANGER is reserved in this corpus for the irrecoverable fleet-wide-lockout class** (the Windows enforcement-staging pitfall, B-02). The immutable-channel mistake is **serious-but-recoverable** (delete/recreate/reassign), the same severity tier as the Windows dot3svc WARNING. **macOS has no DANGER-class callout** in this guide — there is no dot3svc service dependency and no enforce-toggle lockout. Do NOT clone Windows' DANGER callout into `04-macos.md`.

### Area B — Common Mechanics content (macOS adaptation of the A3 template)
**Auth mode → B-authmode-note** (HIGH)
- **D-04:** Include an explicit **"No authentication-mode selector on macOS"** note in Common Mechanics. macOS authenticates **as the current user / device context only**; machine-level pre-logon auth is **NOT exposed** via Intune profiles (SUMMARY ~l.166, ~l.180). The deployment channel (User/Device keychain) is macOS's analog to the credential-context decision. Documenting the *absence* prevents Windows-trained admins (who know the prominent User/Machine/User-or-machine selector + its pitfall B-03) from hunting for a setting that does not exist. This is a per-platform **delta**, not a restated shared concept — link-not-copy is not triggered. B-authmode-omit was **rejected** (ignores l.180's explicit "document this" guidance).

**Server-name homing → B-servername-common** (HIGH)
- **D-05:** Home the **server-name field + server-validation behavior once in Common Mechanics** (it applies to both Wi-Fi + wired and all three EAP methods; STACK ~l.145–146 confirms both connection types expose "Certificate server names" + "Root certificate for server validation"). This mirrors the Windows template's single PerformServerValidation home in Common Mechanics (`03-windows.md` ~l.33–43). The macOS **dynamic-trust-dialog suppression** (A-04, PITFALLS ~l.94: "macOS wired … requires Certificate server names to bypass the dynamic trust window") is added as a **one-line wired delta** in the Wired subsection, NOT a whole-concept split (B-servername-split **rejected** — A-04 l.82 shows macOS *Wi-Fi* also fails without server trust, so the requirement is common).

### Area C — Wired subsection
**SCEP-only callout → C-scep-callout** (HIGH)
- **D-06:** The **wired SCEP-only / PKCS-not-supported** constraint is a **prominent standalone callout** in the Wired subsection. Research prescribes the form verbatim (SUMMARY ~l.179: "document the SCEP-only constraint **with a callout**; admins in PKCS-only shops need to know before attempting configuration"), it is a named success criterion (ROADMAP SC2), and the PKCS-on-wired gap is one of the two reasons macOS earns its own phase (SUMMARY ~l.219). C-scep-inline **rejected** — under-delivers against an SC-level, callout-prescribed constraint. **C-scep is the only macOS-specific "callout"-class item in Area C** that research explicitly demands — its presence does NOT justify a parallel B-04 callout (see D-08).

**Depth → C-depth-fullpeer** (HIGH)
- **D-07:** macOS wired gets **full peer treatment equal to Wi-Fi**, including a **complete per-EAP-method config matrix** in the Wired subsection. The locked A3 decision (Phase 102 D-01) mandates a per-EAP matrix "inside EACH connection subsection"; matrix collapse is reserved **only for gap platforms** (Android/Linux, Phase 102 D-01 template note), and macOS wired is classified a **"Full guide"** (SUMMARY ~l.175). The Windows template executed exactly this (full wired matrix, `03-windows.md` ~l.144–155). C-depth-compact **rejected** — collapsing the matrix violates the locked D-01 and the full-peer classification. (Note: the macOS wired matrix overlaps heavily with the Wi-Fi matrix; the overlap is acceptable — link-not-copy governs *cross-file* shared theory, not *intra-file* Wi-Fi/wired parity, and each connection is an independent Intune profile type.)

**Profile-type confusion (B-04) → C-b04-implicit** (HIGH — **research-grounded overturn**)
- **D-08:** B-04 (macOS Wi-Fi vs Wired profile-type confusion) is prevented **structurally, NOT with a blockquote callout.** PITFALLS Section F (~l.581) prescribes the prevention as **"Separate profile type guidance,"** and ~l.268 as "wired and Wi-Fi sections **must be distinct**" — the authors say "callout" precisely and discriminately for B-01/B-02/B-05/B-06/B-09 and C-scep, but **deliberately NOT for B-04.** The locked A3 template already delivers the mandated prevention by construction: separate `## Wi-Fi` and `## Wired` sections, each opening with its own distinct Intune nav path (`Templates > Wi-Fi` vs `Templates > Wired network`). The Windows deliverable carries **no B-04 callout**; adding a macOS-only one is callout inflation that breaks template parity.
- **D-09 (executor guardrail):** "Implicit" does **not** mean silent. A **single lightweight inline sentence** at the top of the Wired subsection is permitted and lightly advisable (e.g., "macOS Wi-Fi and wired 802.1X use separate Intune profile types and are configured independently") — the pitfall explicitly flags Windows-admin confusion. But **no `> **Label:**` blockquote callout** for B-04. The Finder's initial C-b04-callout pick was **overturned** by the Adversary and the overturn **upheld** by the Referee.

### Area D — Per-EAP-method matrix columns
**Inner-auth → D-inner-matrix** (HIGH)
- **D-10:** EAP-TTLS inner-auth is shown as an **"Inner method" row in the per-EAP-method matrix** (cloning the Windows matrix, `03-windows.md` ~l.75, ~l.153). Populate per the macOS option set: **EAP-TTLS = PAP / CHAP / MS-CHAP / MS-CHAP v2** (PITFALLS ~l.426), **PEAP = MS-CHAPv2**, **EAP-TLS = — (n/a)**. STACK Building Block 8 (~l.160–165) confirms macOS Wi-Fi + wired both support this set. D-inner-prose **rejected** — breaking the matrix scatters a config fact out of the config grid and diverges from the locked Windows clone + the at-a-glance co-equal-EAP comparison.

**Server-validation framing → D-serverval-secviolation** (HIGH)
- **D-11:** Frame **populating the RADIUS server name + referencing a trusted-root profile + enabling validation as a SECURITY requirement.** Surface the macOS-specific OS-behavior fact verbatim from A-05 (~l.107): **"On iOS/macOS, disabling server validation in a managed profile is flagged as a security violation."** Never show disabled-validation examples (PITFALLS C-02 prevention). D-serverval-neutral **rejected** — wastes a directly-sourced macOS-distinct fact and under-warns on a security control.
- **D-12 (link-not-copy boundary):** Surface the macOS-specific **symptom** (the **dynamic trust dialog** the user clicks through — ROADMAP SC3 — distinct from Windows' fully-silent blank-server-name regression) alongside the security framing, but **LINK** the underlying **rogue-RADIUS / credential-harvest rationale** to `01-eap-method-overview.md` (PEAP-MSCHAPv2 security note), `02-cert-delivery-foundation.md`, and `_glossary-network.md#server-name-validation` — do **NOT** restate the theory. Both the dynamic-trust-dialog symptom and the security framing describe the same control.

### Claude's Discretion
- Exact prose, callout phrasing, anchor wording, Mermaid/diagram use, and section ordering within `04-macos.md` — provided the locked decisions above and corpus conventions are honored (`> **Label:**` blockquote callouts; front-matter freshness stamps; plain GitHub auto-slug anchors with no `{#id}` overrides; double-hyphen trap).
- Exact phrasing of the per-EAP-method config matrices, the deployment-channel decision-table wording, and the optional one-line B-04 separateness sentence (D-09) within the locked structure.
- The wording of the WARNING deployment-channel callout (must convey: User vs Device keychain, immutable after assignment, cert-type→channel mapping, delete/recreate remediation path) per D-01/D-02/D-03.
- Whether the deployment-channel WARNING is literally the first subsection of Common Mechanics or immediately follows a one-line section intro — provided it precedes any configuration steps.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 103" — goal, 3 success criteria (SC1 Wi-Fi 3-EAP + deployment-channel-before-creation; SC2 wired interface selector + PKCS-not-supported/SCEP-only; SC3 server-name suppresses dynamic trust dialog + outer-identity/identity-privacy per EAP); dependency on Phase 101.
- `.planning/REQUIREMENTS.md` — **DOT1X-05** (macOS Wi-Fi + wired, 3 EAP methods, irreversible deployment-channel caveat, wired SCEP-only / PKCS-not-supported constraint).

### Phase 102 template (THE reusable per-platform pattern — clone its A3 structure)
- `.planning/phases/102-windows-802-1x-admin-setup-wi-fi-wired/102-CONTEXT.md` — locked **A3 Hybrid** structure (D-01: Common Mechanics → Wi-Fi → Wired, per-EAP matrix in each connection subsection), link-not-copy / co-equal-EAP / navigation-last applications, freshness-stamp conventions, and the gap-platform degradation note. **This is the structural blueprint for `04-macos.md`.**
- `docs/admin-setup-8021x/03-windows.md` — the actual Windows deliverable being mirrored: section order (Common Profile Mechanics → Wi-Fi → Wired → See Also → Change History), the `### In Intune admin center` compact subsections, the per-EAP-method **config matrix with an "Inner method" row** (~l.75, ~l.144–155), and the single Common-Mechanics home for server validation (~l.33–43). **Note: do NOT clone the Windows-only dot3svc / enforcement-staging DANGER / TEAP / KB5014754 sections — no macOS equivalent.**

### Phase 101 foundation (link targets — this guide LINKS, never restates)
- `docs/admin-setup-8021x/00-overview.md` — folder entry point; **receives the macOS platform-list entry (item 4)**; Mermaid setup-sequence + descriptive link-list house style; placeholder currently reads "4–7. Platform guides (Phase 103–106)".
- `docs/admin-setup-8021x/01-eap-method-overview.md` — co-equal EAP-method overview; **PEAP-MSCHAPv2 security note is the link target for D-12's rogue-RADIUS rationale.**
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert-delivery ordering rule, EKU = Client Authentication, RADIUS server-name validation, per-platform cert matrix (incl. macOS-wired PKCS gap), **canonical scope callout** (target of the one-line scope banner, D-06 from Phase 101).
- `docs/_glossary-network.md` — 802.1X/EAP/RADIUS/supplicant/SCEP/PKCS/server-name-validation terms; `#server-name-validation` anchor is a D-12 link target.

### Research (HIGH confidence — guide content is research-sourced; "no additional research needed" per SUMMARY ~l.225)
- `.planning/research/SUMMARY.md` §"Phase 103 — macOS Wi-Fi + Wired Admin-Setup" (~l.217–225); macOS profile facts (~l.29 deployment channel immutable, ~l.36 wired interface selector + PKCS-not-supported, ~l.42–52 cert-type support, ~l.76/137 WARNING callout + decision table, ~l.166/180 auth-mode NOT exposed, ~l.179 SCEP-only "with a callout"); Per-Platform Coverage-Reality Matrix (~l.151–175, macOS = "Full guide").
- `.planning/research/STACK.md` — macOS Wi-Fi/wired profile building blocks: Templates path; deployment channel User/Device immutable (~l.215); wired same-channel-as-Wi-Fi (~l.221); interface selector; "Certificate server names" + "Root certificate for server validation" on both connections (~l.145–146); inner-auth options (Building Block 8, ~l.160–165).
- `.planning/research/PITFALLS.md` — **A-04** RADIUS server cert trust / dynamic-trust-window (~l.79–98, basis for D-05 wired delta), **A-05** server-validation disabled = security violation (~l.102–116, basis for D-11/D-12), **B-04** macOS Wi-Fi/wired profile-type confusion (~l.253–268 + Section F ~l.581 "Separate profile type guidance", basis for D-08/D-09 **overturn**), **C-03** EAP-TTLS inner-auth macOS option set (~l.426–434, basis for D-10), **A-01** cert-delivery ordering.
- `.planning/research/ARCHITECTURE.md` — file layout; confirms `04-macos.md` as the single deliverable file + the shared-vs-per-platform link-not-copy boundary.

### House-style precedent
- `docs/admin-setup-macos/03-configuration-profiles.md` — feature/connection-first guide structure + `#### In Intune admin center` compact subsections (the A3 precedent, also cited by Phase 102).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase-102 deliverable (`03-windows.md`)**: the structural template to clone — section order, `### In Intune admin center` subsections, the per-EAP **config matrix with Inner-method row**, the single Common-Mechanics home for server validation, the front-matter freshness-stamp block, and the See-Also / Change-History footer pattern.
- **Foundation files (`00`/`01`/`02`)**: already authored; provide the EAP-comparison + cert-asymmetry **matrix patterns** to clone for the per-EAP-method config matrices, the canonical scope callout to link via the one-line banner, and the `01-` PEAP-MSCHAPv2 security note + `02-` cert theory as D-12 link targets.
- **`docs/admin-setup-macos/` (00–11)**: macOS house-style precedent for connection/feature-first structure, `> **Label:**` blockquote callout convention, and Intune-admin-center step formatting.

### Established Patterns
- **link-not-copy** — governs the whole guide: home shared concepts once / link to `01-`/`02-`; server-name once in Common Mechanics + wired delta (D-05); rogue-RADIUS rationale linked, not restated (D-12).
- **navigation-last** — capability-matrix rows + global nav-hub are **Phase 109**, not 103. Only the local `00-overview.md` item-4 entry is in scope.
- **co-equal EAP** — no "recommended default" method; the per-EAP-method matrix (D-10) enforces this by construction.
- **Freshness stamps** — file front-matter 90-day (`last_verified` + 90 = `review_by`). (No macOS-specific high-drift inline-stamped callout is mandated by research for this guide — unlike Windows' KB5014754 +180 — but the executor may apply the two-tier mechanism if a drift-prone fact warrants it.)
- **Anchor slugs** — plain GitHub auto-slugs, no `{#id}` overrides; double-hyphen trap.
- **Callout discipline** — the research is precise about which pitfalls earn `> **Label:**` blockquote callouts. For macOS, the explicit callout-class items are the **deployment-channel WARNING (D-01)** and the **SCEP-only wired callout (D-06)**; B-04 is structural (D-08), and there is **no DANGER callout** (D-03).

### Integration Points
- `docs/admin-setup-8021x/04-macos.md` — new file (does not exist yet).
- `docs/admin-setup-8021x/00-overview.md` — **edited** to add the macOS platform-list entry (item 4) + Mermaid/link wiring, and narrow the placeholder range from "4–7" to "5–7"; pre-existing file → edit must be harness-allowlisted (same pattern as Phase 102's item-3 edit and Phase 101's glossary see-also edits).

</code_context>

<specifics>
## Specific Ideas

- The **immutable deployment channel** (User vs Device keychain) is the signature macOS gotcha — it must be the **first, WARNING-level, decision-table content** before any config steps (D-01/D-02/D-03). Cert type drives the channel: user cert → User; device cert → Device. Wrong choice = full profile teardown.
- macOS has **no auth-mode selector** (the prominent Windows User/Machine/User-or-machine setting is absent) — document the absence so Windows-trained admins don't hunt for it (D-04).
- **macOS wired is a distinct Intune profile type** from Wi-Fi (B-04) — prevented by the distinct `## Wi-Fi` / `## Wired` sections with their own nav paths, optionally reinforced by one inline sentence; NOT a callout (D-08/D-09).
- **Wired = SCEP-only** for client cert (PKCS not supported) — prominent standalone callout (D-06); admins in PKCS-only shops must know before attempting wired config.
- **Server name suppresses the dynamic trust dialog** on macOS (A-04) — the macOS-specific symptom; pair with the security framing that **disabling validation is flagged as a security violation** (A-05/D-11), and link the rogue-RADIUS rationale rather than restating it (D-12).
- **EAP-TTLS inner-auth** on macOS = PAP / CHAP / MS-CHAP / MS-CHAP v2, shown in the per-EAP matrix Inner-method row (D-10).

</specifics>

<deferred>
## Deferred Ideas

- **DANGER-class callout / dot3svc / enforcement-staging / TEAP / KB5014754** — Windows-only (Phase 102); explicitly NOT cloned into `04-macos.md` (D-03, domain out-of-scope). No macOS equivalent exists.
- **iOS/iPadOS per-platform guide** (`05-ios.md`) — Phase 104; shares the macOS PKCS-not-supported-for-wired + SCEP-only-wired pattern but adds MAC-address-randomization, M-series-iPad wired use-case, and PEAP-inner-must-be-MS-CHAPv2 (B-05). This Phase's A3 clone is part of its template lineage.
- **Android/Linux gap-stub guides** — Phases 105–106; the A3 template degrades (Wired subsection collapses to a gap stub).
- **Capability-matrix 802.1X rows + global nav-hub wiring** — Phase 109 (navigation-last). Not Phase 103.
- **L1/L2 runbooks + decision tree** (macOS Console.app/wifi.log log sources, RADIUS rejects, server-trust failures, EAP negotiation) — Phases 107–108.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 103-macos-802-1x-admin-setup-wi-fi-wired*
*Context gathered: 2026-06-30*
