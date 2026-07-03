# Phase 101: 802.1X Foundation — Glossary, EAP Methods & Cert Delivery - Context

**Gathered:** 2026-06-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the cross-platform **802.1X conceptual foundation** that all five per-platform admin-setup guides (Phases 102–106) link into — under the established link-not-copy convention. Phase 101 delivers exactly four new files plus see-also banners:

- `docs/_glossary-network.md` — new platform-neutral network-auth glossary (DOT1X-01)
- `docs/admin-setup-8021x/00-overview.md` — entry point for the new 802.1X folder
- `docs/admin-setup-8021x/01-eap-method-overview.md` — co-equal EAP-method overview (DOT1X-02)
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert-delivery ordering, EKU, server-name validation, per-platform cert matrix (DOT1X-03)
- See-also banners added into the existing platform glossaries pointing to `_glossary-network.md`

**In scope:** conceptual model (3-actor + EAPOL + RADIUS), co-equal EAP-method overview, cert-delivery foundation, reusable Intune-client-side-only scope-callout template.

**Out of scope (deferred to their owning phases):** per-platform Intune profile steps (Phases 102–106); L1/L2 runbooks + decision tree (107–108); **capability matrices + navigation-hub wiring (Phase 109 — navigation-last)**; RADIUS/NPS server config, PKI/CA build-out, switch/AP config, MAB (out of milestone scope entirely).
</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus). The Referee's calibrated winners are locked below. See `101-DISCUSSION-LOG.md` for the full scored reasoning.

### Area A — `00-overview.md` "at-a-glance" content  →  **A2: thin navigation summary**
- **D-01:** `00-overview.md` carries a **descriptive one-liner per platform guide** (house-style, matching the existing `docs/admin-setup-macos/00-overview.md` precedent), NOT a capability table.
- **D-02:** The ONLY capability fact permitted at the entry point is the **wired-availability flag for the gap platforms** (Android / Linux), phrased as scope orientation — e.g. "Wi-Fi only — no native wired profile → see guide". **No EAP-method cells, no cert-type cells.**
- **Rationale:** A full platform×{Wi-Fi,wired,EAP,cert} table *is* the Phase-109 capability matrix and would violate **navigation-last** + create a second source of truth that drifts. A2 delivers research-Q8 orientation while staying navigational.

### Area B — `02-cert-delivery-foundation.md` matrix depth  →  **B3: concise asymmetry matrix**
- **D-03:** The per-platform cert-delivery matrix contains **exactly DOT1X-03's enumerated cells**: macOS/iOS wired = SCEP-only / no PKCS; Windows wired adds PFX Import; Linux = no Intune cert delivery; plus trusted-root support per platform. Foundation altitude only — **exhaustive per-setting UI detail lives in the per-platform guides**, which link back here.
- **D-04:** The file MUST also carry: the hard ordering rule (**trusted-root profile → SCEP/PKCS client cert → 802.1X network profile**), EKU = **Client Authentication**, RADIUS **server-name validation**, and **Cloud PKI noted as an alternative** (not a guide).
- **D-05:** Add an explicit boundary note that exhaustive per-setting UI detail lives in per-platform guides (link-not-copy split).
- **Rationale:** B2 (concepts-only pointer) fails DOT1X-03's mandate that *the* matrix live in this file. B1 (exhaustive grid) over-reaches into guide-level detail. A cert matrix here does **not** drift against Phase 109 — Phase 109 produces Network-Auth YES/NO/STUB capability rows, not a cert matrix.

### Area C — scope-callout reuse mechanism  →  **C3: hybrid (canonical section + one-line linking banner)**
- **D-06:** The Intune-client-side-only scope callout is defined **once, canonically, in the foundation** (per SC4). Per-platform guides get a **one-line banner that links to it** (navigation, not copied content). Phase 101 delivers the canonical section + the banner *template*; actual banner placement in guides is a downstream Phase 102–106 action.
- **D-07:** The canonical scope callout enumerates this exact **exclusion list**: RADIUS/NPS server config; PKI/CA build-out (ADCS/NDES); Certificate Connector install; network switch/AP port config; MAB; Conditional Access network policies; non-co-equal EAP types (EAP-SIM / EAP-FAST / LEAP / TEAP-as-a-path).
- **Rationale:** C2 (verbatim copy in every guide) violates link-not-copy. C1 (link-only) under-mitigates the milestone's **primary risk** (RADIUS/NPS scope creep) and abandons deep-link readers. C3 keeps a single source of truth AND gives per-guide prominence.

### Area D — glossary term set + cross-link strategy  →  **D-terms-2 (curated) + one-way links + iOS-in-macOS**
- **D-08:** `_glossary-network.md` mints the **DOT1X-01 floor (9 terms)** — 802.1X, EAP, EAPOL, RADIUS, supplicant, SCEP, PKCS, trusted root, server-name validation — **plus** `authenticator`, `authentication server` (required by SC1's 3-actor model), `EKU` / Client Authentication (load-bearing for DOT1X-03), and `inner/outer identity` (PEAP / EAP-TTLS). The 9-term list is a **floor, not a ceiling**.
- **D-09:** **KEEP platform-specific terms OUT** of the neutral network glossary — `dynamic trust dialog` is Apple-specific and belongs in `_glossary-macos.md`; `NAC`/MAC-randomization specifics belong in per-platform guides. Curation bounded by the platform-neutral principle.
- **D-10:** See-also banners are **one-directional only** (existing platform glossaries → `_glossary-network.md`), matching DOT1X-01's spec. **No back-links** from the network glossary into platform glossaries — that is Phase-109 cross-glossary nav wiring (navigation-last).
- **D-11:** The **iOS see-also banner lands in `docs/_glossary-macos.md`** (which self-scopes "macOS and iOS/iPadOS"). Downstream agents must **NOT create or edit `_glossary-ios.md`** — it does not exist.

### Claude's Discretion
- Exact prose, callout phrasing, anchor wording, and section ordering within each file — provided the locked decisions above and the corpus conventions (callout blockquote style, Mermaid setup-sequence in overviews, alphabetical glossary index) are honored.
- Anchor slugs: plain GitHub auto-slugs, **no `{#id}` overrides**; mind the double-hyphen trap (`### EAP-TLS` → `#eap-tls`).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 101" — goal, 4 success criteria, dependency on Phase 100.
- `.planning/REQUIREMENTS.md` — **DOT1X-01** (glossary + 3-actor model), **DOT1X-02** (co-equal EAP overview), **DOT1X-03** (cert-delivery foundation: ordering, EKU, server-name validation, per-platform cert matrix, Cloud PKI alt).

### Research (HIGH confidence — foundation content is research-sourced, NOT guide-sourced)
- `.planning/research/SUMMARY.md` — **Per-Platform Coverage-Reality Matrix** (§ lines ~151–175) is the authoritative source for the B3 cert matrix and the A2 wired-gap flags; Open Scoping Questions Q1/Q7/Q8.
- `.planning/research/ARCHITECTURE.md` — HYBRID file layout + new-file inventory + build order.
- `.planning/research/FEATURES.md` — table-stakes vs differentiators vs anti-features.
- `.planning/research/PITFALLS.md` — pitfalls A-01 (ordering), A-05/C-02 (server validation), E-01/E-02/E-06 (scope callout, link-not-copy, co-equal EAP).
- `.planning/research/STACK.md` — per-platform Intune profile/setting facts.

### Existing corpus patterns to follow (link-not-copy + house style)
- `docs/_glossary-macos.md` — glossary front-matter (`last_verified`/`review_by`/`applies_to`/`audience`/`platform`), alphabetical index, see-also banner format; **self-scopes "macOS and iOS/iPadOS"** (proves no `_glossary-ios.md`).
- `docs/_glossary.md`, `docs/_glossary-android.md`, `docs/_glossary-linux.md` — the other existing platform glossaries that receive one-directional see-also banners.
- `docs/admin-setup-macos/00-overview.md` — the entry-point precedent for A2 (Mermaid setup-sequence + descriptive one-liner link list, no capability table).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Glossary scaffold**: existing `_glossary-*.md` files provide the exact front-matter block, alphabetical-index pattern, and `> See also:` / `> **Windows equivalent:**` blockquote banner format to clone for `_glossary-network.md`.
- **Overview scaffold**: `admin-setup-macos/00-overview.md` provides the Mermaid `graph LR` setup-sequence + "Platform gate" blockquote + descriptive link-list pattern for the A2 overview.
- **Callout convention**: corpus uses `> **Label:**` blockquote callouts (e.g. `> **Platform gate:**`, `> **Before You Deploy:**`) rather than `:::` admonitions — reuse for the C3 scope callout and the cert-ordering DANGER/WARNING blocks.

### Established Patterns
- **link-not-copy**: shared concepts live once; other docs link. Governs B3 (cert matrix homed in 02), C3 (scope text canonical in 02/00, banner links), D (platform-neutral terms only).
- **navigation-last**: capability matrices + nav-hub + cross-glossary wiring are **Phase 109**, not 101. Governs A2 (no capability table) and D-10 (one-way links only).
- **Freshness stamps**: 90-day cadence (`last_verified` + 90 = `review_by`), per-file front-matter (not per-cell). Apply to all four new files.
- **Glossary anchor slugs**: plain GitHub auto-slugs, no `{#id}` overrides; double-hyphen trap.

### Integration Points
- New `docs/admin-setup-8021x/` folder (does not exist yet) — first created in this phase.
- See-also banners edited INTO existing `_glossary{,-android,-linux,-macos}.md` — these are pre-existing files; edits must be allowlisted for the harness (same pattern as prior milestone glossary edits).

</code_context>

<specifics>
## Specific Ideas

- EAP methods (**EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS**) MUST be presented **co-equally** in `01-eap-method-overview.md` — no "recommended default" (scope constraint, pitfall E-06). Cover, per method: what authenticates, what the client requires, trust requirements, and when each is chosen.
- The cert-delivery **ordering rule** is the single most consequential fact in the doc set (violating it yields silent Intune "Succeeded" + live auth failure) — it must be prominent in `02-`.
- TEAP is **not** a co-equal path (Windows-wired-only awareness note, Phase 102) — do not give it co-equal treatment in `01-`.

</specifics>

<deferred>
## Deferred Ideas

- **🔴 ROADMAP Phase 109 SC3 `_glossary-ios.md` discrepancy (must reconcile before/at Phase 109):** `.planning/ROADMAP.md` Phase 109 SC3 lists `_glossary-ios.md` among the "existing platform glossaries" to wire — but that file **does not exist** (iOS terminology lives in `_glossary-macos.md`). Left un-reconciled per user choice ("lock as recommended"); flagged here so Phase 109 planning corrects the ROADMAP line and no agent attempts to create/edit `_glossary-ios.md`. Phase 101's iOS see-also banner lands in `_glossary-macos.md` (D-11).
- **Capability-matrix 802.1X rows + all six nav-hub edits** — Phase 109 (navigation-last). Not Phase 101.
- **Per-platform cert UI detail, profile steps, gotchas** — Phases 102–106.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery*
*Context gathered: 2026-06-29*
