# Phase 101: 802.1X Foundation — Glossary, EAP Methods & Cert Delivery - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-29
**Phase:** 101-802-1x-foundation-glossary-eap-methods-cert-delivery
**Areas discussed:** 00-overview at-a-glance table, Cert-foundation matrix depth, Scope-callout reuse mechanism, Glossary terms + cross-links

**Decision method:** User selected all four gray areas and directed that each be resolved via `/adversarial-review` (their standing preference for gray-area picks). A three-agent Opus pipeline ran: Finder (catalogued 162 pts of weaknesses across all options) → Adversary (disproved 35 pts) → Referee (calibrated verdicts + declared one winner per area). User then locked all four Referee winners as-recommended.

---

## Area A — `00-overview.md` "at-a-glance" content

| Option | Description | Selected |
|--------|-------------|----------|
| A1 | Full abbreviated coverage matrix (platform × Wi-Fi × wired × EAP × cert) in 00-overview | |
| A2 | Thin navigation summary — one descriptive line per platform guide + wired-gap flag for Android/Linux; no matrix | ✓ |
| A3 | No table — prose + link list only; all tabular comparison deferred to Phase 109 | |

**User's choice:** A2 (Referee winner)
**Notes:** A1 eliminated — a platform×capability table IS the Phase-109 capability matrix landing early (navigation-last violation) + a second source that drifts. A3 falls *below* the verified house style (`admin-setup-macos/00-overview.md` carries a descriptive one-liner per guide). A2 delivers research-Q8 orientation while staying navigational. Constraint: the only permitted capability fact is the wired-availability flag for the gap platforms; no EAP/cert cells.

---

## Area B — Cert-delivery foundation matrix depth (`02-cert-delivery-foundation.md`)

| Option | Description | Selected |
|--------|-------------|----------|
| B1 | Full exhaustive per-platform cert matrix (SCEP/PKCS/PFX/root × 5 × Wi-Fi/wired), authoritative here | |
| B2 | Concepts + ordering only; one-line "see your guide" pointer (no matrix) | |
| B3 | Concise asymmetry matrix mapping exactly to DOT1X-03's enumerated cells; defer per-setting UI detail to guides | ✓ |

**User's choice:** B3 (Referee winner)
**Notes:** B2 eliminated — fails DOT1X-03, which mandates *the* per-platform cert matrix IN this file (option admitted under-delivery). B1 over-reaches into guide-level UI detail. Key adversary correction: a cert matrix here does NOT drift against Phase 109 — Phase 109 produces Network-Auth YES/NO/STUB rows, not a cert matrix; and foundation content is research-sourced (HIGH-confidence SUMMARY), not guide-sourced, so "authored before guides" is by design.

---

## Area C — Scope-callout reuse mechanism (SC4)

| Option | Description | Selected |
|--------|-------------|----------|
| C1 | Canonical scope section in 00-overview; per-platform guides link to it (link only) | |
| C2 | Copy-paste verbatim blockquote reproduced at the top of every guide | |
| C3 | Hybrid — canonical section once + one-line linking banner per guide | ✓ |

**User's choice:** C3 (Referee winner)
**Notes:** C2 eliminated — verbatim copy across 5+ guides violates link-not-copy (the cardinal convention). C1 under-mitigates the milestone's PRIMARY risk (RADIUS/NPS scope creep) and abandons deep-link readers who never see the boundary at point-of-use. C3 keeps a single source of truth AND gives per-guide prominence; a one-line banner is navigation, not content duplication. Exclusion list locked (RADIUS/NPS, PKI/CA build-out, Cert Connector, switch/AP config, MAB, CA network policies, non-co-equal EAP types).

---

## Area D — Glossary term set + cross-link strategy (`docs/_glossary-network.md`)

| Sub-decision | Options | Selected |
|--------------|---------|----------|
| Term set | D-terms-1 minimal (9) / **D-terms-2 expanded, curated** | D-terms-2 ✓ |
| Cross-link direction | **one-way (platform → network)** / bidirectional | one-way ✓ |
| iOS handling | banner in `_glossary-macos.md` (no `_glossary-ios.md`) | ✓ |

**User's choice:** D-terms-2 curated + one-way links + iOS-in-macOS (Referee winner)
**Notes:** Minimal-9 eliminated — fails SC1's 3-actor model (omits *authenticator* + *authentication server*) and leaves EKU unminted. Referee UPGRADED the authenticator omission to CRITICAL against SC1. Bidirectional eliminated — pre-empts Phase-109 cross-glossary nav wiring (navigation-last) and exceeds DOT1X-01's one-directional spec. Expansion curated to stay platform-neutral: *dynamic trust dialog* (Apple-specific) stays OUT, lives in `_glossary-macos.md`.

---

## Claude's Discretion

- Exact prose, callout phrasing, anchor wording, section ordering within each file (honoring locked decisions + corpus conventions).
- Anchor slugs: plain GitHub auto-slugs, no `{#id}` overrides, double-hyphen trap.

## Deferred Ideas

- **🔴 ROADMAP Phase 109 SC3 references nonexistent `_glossary-ios.md`** — must be reconciled at Phase 109 planning (correct the ROADMAP line; iOS banner goes in `_glossary-macos.md`). User chose "lock as recommended" rather than fixing the ROADMAP this session.
- Capability-matrix 802.1X rows + six nav-hub edits — Phase 109 (navigation-last).
- Per-platform cert UI detail, profile steps, gotchas — Phases 102–106.
