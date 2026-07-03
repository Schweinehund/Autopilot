# Phase 102: Windows 802.1X Admin-Setup (Wi-Fi + Wired) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-30
**Phase:** 102-windows-802-1x-admin-setup-wi-fi-wired
**Areas discussed:** Guide structure, dot3svc Remediation depth, KB5014754 callout (cadence + placement), Intune path + TEAP scope

**Resolution method:** User selected all four gray areas and instructed: *"For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."* Resolved via a three-agent adversarial review (Finder → Adversary → Referee, all Opus, scored opposing incentives), grounded against ROADMAP/REQUIREMENTS, the Phase-101 CONTEXT, the already-shipped `00`/`01`/`02` foundation files, and the research corpus (SUMMARY/STACK/PITFALLS/ARCHITECTURE). Finder confirmed-by-default; Adversary confirmed 4 picks and challenged the 2 MEDIUM picks; Referee verified both contested citations directly and ruled. Both challenges succeeded.

---

## Area A — Internal structure of `03-windows.md`

| Option | Description | Selected |
|--------|-------------|----------|
| A1 — Connection-type-first | Wi-Fi section (3 EAP) then Wired section (3 EAP); risks per-method repetition across both | |
| A2 — EAP-method-first | Top-level split by EAP method, each with Wi-Fi + Wired variants; reinforces co-equal EAP but scatters wired-only concerns | |
| A3 — Hybrid | Shared common-mechanics → Wi-Fi subsection → Wired subsection, each with a per-EAP matrix; wired-only pitfalls homed once | ✓ |

**Verdict:** A3 (Hybrid) — HIGH. Both agents agreed.
**Reasoning:** Homes dot3svc/enforcement/TEAP exactly once (link-not-copy), preserves co-equal EAP via per-method matrix, and is the best reusable template for Phases 103–106 (gap platforms collapse the Wired subsection to a stub). A2 rejected: scatters wired-only pitfalls across 3 sections and gives TEAP a top-level home that reads as a 4th co-equal method (co-equal-EAP + link-not-copy violation). Corpus precedent (`admin-setup-macos/03-configuration-profiles.md`) is feature/connection-first, not method-first.

---

## Area B — dot3svc Intune Remediation depth

| Option | Description | Selected |
|--------|-------------|----------|
| B1 — Full runnable script pair | Copy-paste `Detect-*.ps1` + `Remediate-*.ps1` + packaging steps | |
| B2 — Documented pattern + cmdlets | Detect→remediate approach + key cmdlets + Remediations UI path | ✓ |
| B3 — Pointer only | One callout naming the dependency + link to the Remediations feature | |

**Verdict:** B2 — HIGH. Both agents agreed.
**Reasoning:** SC2 / DOT1X-04 say "Remediation **pattern**," not production script. B2 delivers the detection signal (`sc query dot3svc`), the cmdlets (`Get-Service`/`Set-Service -StartupType Automatic`/`Start-Service`), and the UI path. B1 over-reaches the doc's altitude and creates a freshness liability (docs corpus, not the app's PowerShell tier). B3 under-delivers against a top-tier silent-failure pitfall (B-01 — profile "Succeeded" while port unauthenticated).

---

## Area C — KB5014754 strong-mapping callout: cadence

| Option | Description | Selected |
|--------|-------------|----------|
| C-cad-90 | Standard corpus 90-day `review_by` | |
| C-cad-180 | 180-day per research's "stable Windows callout" note; inline callout stamp distinct from file front-matter | ✓ |

**Verdict:** C-cad-180 — MEDIUM. **Adversary CHALLENGE succeeded** (overturned Finder's C-cad-90).
**Reasoning:** SUMMARY Q7 (~l.343) explicitly maps "stable Windows callouts → 180-day" and names KB5014754; the gate has enforced since 2025-02-11 (16+ months). PITFALLS E-03 mandates a per-callout inline stamp at "+90 or +180 depending on drift risk" — so the inline 180-day stamp and the file-level 90-day front-matter measure different things and do not conflict. File front-matter stays 90 (corpus-uniform); the inline KB callout is stamped 180. Held MEDIUM because Q7 itself flags interval as a discuss-phase confirm item.

## Area C — KB5014754 strong-mapping callout: placement

| Option | Description | Selected |
|--------|-------------|----------|
| C-place-inline | Inside the EAP-TLS certificate-config subsection | |
| C-place-callout | Standalone scoped "Hybrid Entra Joined" callout, cross-cutting both connection types | ✓ |

**Verdict:** C-place-callout — HIGH. Both agents agreed.
**Reasoning:** SID-in-SAN applies to HEJ only and to any EAP-TLS profile (Wi-Fi + wired). Under A3, EAP-TLS appears in both subsections, so inline would force duplication. A scoped "Hybrid Entra Joined" label is discoverable for affected admins and signals cloud-only admins it doesn't apply.

---

## Area D — Intune authoring path

| Option | Description | Selected |
|--------|-------------|----------|
| D-path-templates | Templates path only | |
| D-path-both | Templates primary + one-sentence Settings Catalog note | ✓ |

**Verdict:** D-path-both — MEDIUM. **Adversary CHALLENGE succeeded** (overturned Finder's D-path-templates).
**Reasoning:** STACK ~l.332 verbatim: "note both in docs, use Templates as primary." The Settings-Catalog note is Windows-scoped (STACK ~l.26: macOS/iOS use the dedicated template) so it does NOT propagate to Phases 103–106. **Binding guardrail: one sentence, not a second walkthrough** — that is what keeps drift contained and distinguishes it from "documenting two paths."

## Area D — TEAP scope

| Option | Description | Selected |
|--------|-------------|----------|
| D-teap-note | One-paragraph awareness note (Windows-wired-only, not co-equal) | ✓ |
| D-teap-section | Short wired-only TEAP config sub-section (Primary/Secondary EAP) | |

**Verdict:** D-teap-note — HIGH. Both agents agreed.
**Reasoning:** Locked by the co-equal-EAP constraint and the Phase-101 hand-off. The already-shipped `01-eap-method-overview.md` (l.154) promises exactly a one-paragraph note "in the Windows 802.1X guide (Phase 102)"; the `02-` canonical scope callout lists TEAP as "not a co-equal guide path." A full TEAP section would contradict a frozen foundation file and risk a 4th-method feel.

---

## Claude's Discretion
- Exact prose, callout phrasing, anchor wording, diagram use, and section ordering within `03-windows.md` (honoring corpus conventions).
- Phrasing of the per-EAP-method config matrices, the enforcement-staging DANGER callout (B-02), and the anonymous-outer-identity guidance (C-01).

## Deferred Ideas
- Settings Catalog full walkthrough — NOT authored (one-sentence note only, D-10 guardrail).
- Productionized dot3svc Remediation scripts in `src/powershell/` — out of scope; guide ships a pattern.
- Capability-matrix rows + global nav-hub wiring — Phase 109 (navigation-last).
- macOS/iOS/Android/Linux guides — Phases 103–106 (this Phase's A3 structure is their template).
- L1/L2 runbooks + decision tree — Phases 107–108.
