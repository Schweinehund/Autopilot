# Phase 104: iOS/iPadOS 802.1X Admin-Setup (Wi-Fi + Wired) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-30
**Phase:** 104-ios-ipados-802-1x-admin-setup-wi-fi-wired
**Areas discussed:** MAC randomization, Three-separate-profiles (E-07), M-series iPad wired depth, PEAP=MS-CHAPv2 (B-05)

**Resolution method:** Per the user's standing instruction ("For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning"), all 12 sub-decisions were resolved via a three-agent adversarial review (Finder → Adversary → Referee, all Opus), the same protocol used for Phase 103.

- **Finder** (scored 110/120): picked the research-best option for all 12 sub-decisions with cited evidence; self-flagged A2 and D2 as the two genuine MEDIUM gray areas.
- **Adversary** (scored 0): conceded all 12 — found no defensible overturn; the 2× wrong-challenge penalty made conceding the score-maximizing play. Independently verified the A4 MAC-randomization label against live Microsoft Learn.
- **Referee** (all 12 UPHELD, 0 overturns): did NOT rubber-stamp the Adversary's blanket concession; re-verified each pick against evidence and re-checked the load-bearing MAC-randomization fact against live MS Learn (`ref-wifi-settings-apple`, ios-ipados pivot, 2026-06-30). Attached binding executor guardrails to A2, A4, B1, D2, D3.

---

## Area A — MAC-address randomization

| Sub-decision | Options | Selected |
|--------------|---------|----------|
| A1 Placement | Wi-Fi subsection only ✓ / Common Mechanics | Wi-Fi only |
| A2 Weight | WARNING blockquote callout / Plain prose note ✓ | Plain prose note (+ iOS-14+ freshness stamp) |
| A3 Scoping | Wi-Fi-only (wired uses physical NIC MAC) ✓ / cross-cutting | Wi-Fi-only |
| A4 Phrasing | "Disable MAC address randomization: Yes" ✓ / STACK l.226 "set MAC randomization=Yes" alternative | SC1 phrasing |

**Verdict (Referee, HIGH/HIGH/HIGH/HIGH):** MAC randomization is a Wi-Fi-profile-only setting (live MS Learn + STACK l.225–226); wired = "Any Ethernet", no MAC control. It is NOT a PITFALLS-numbered pitfall and is absent from the Section F callout-prescription table, so callout discipline forbids a WARNING blockquote — plain prominent prose + freshness stamp instead (parallels 103 D-08). The STACK l.226 alternative phrasing describes a non-existent, internally contradictory setting and must not be reproduced; live MS Learn confirms the real control is a single "Disable MAC address randomization" dropdown (Yes = forces actual MAC for NAC).
**Notes:** A2 was the hardest-scrutiny MEDIUM; survived because no research callout prescription exists and the failure is intermittent/reversible/NAC-conditional. A4's "contradictory alternative" claim was confirmed (not overreach) against the live setting definition.

---

## Area B — Three-separate-profiles model / E-07 (.mobileconfig confusion)

| Sub-decision | Options | Selected |
|--------------|---------|----------|
| B1 Form | Standalone callout (+optional Mermaid) / Structural prose only ✓ | Structural prose |
| B2 Placement | Common Mechanics ✓ / Guide intro | Common Mechanics |
| B3 link-not-copy | Restate ordering model / LINK ordering to 02-, state iOS delta only ✓ | Link + iOS delta only |

**Verdict (Referee, HIGH/HIGH/HIGH):** E-07's Section F prescription term is "documentation model" (l.598), deliberately NOT "callout" (contrast B-05). A blockquote would restate the 02- CRITICAL cert-ordering callout — callout inflation + link-not-copy tension (same discipline as 103 D-08). Cert delivery precedes both Wi-Fi and wired → cross-cutting → Common Mechanics. Link the ordering rule to 02-; state only the iOS delta (3 distinct profiles; no combined .mobileconfig; no Apple Configurator — E-07 l.560 mandates excluding it).
**Notes:** Structural ≠ silent — the three-profiles fact must be stated explicitly in prose (executor guardrail).

---

## Area C — M-series iPad wired depth (Research Q4)

| Sub-decision | Options | Selected |
|--------------|---------|----------|
| C1 Depth | Full-peer wired matrix (clone macOS D-07) ✓ / Compact section | Full peer |
| C2 Use-case framing | Early "When to use this" paragraph ✓ / None | Use-case paragraph |

**Verdict (Referee, HIGH/HIGH):** iOS wired is classified "Full guide" / "YES (GA, M-series iPad)" (SUMMARY l.154, l.175); matrix collapse is reserved for gap platforms (Android/Linux) only — full-peer matrix per locked A3 D-01 + macOS D-07 precedent. C1 and C2 are complementary, not competing: this is the exact resolution of Research Q4 (SUMMARY l.333–334) — full peer depth PLUS a use-case framing paragraph (M-series iPad + USB Ethernet, multi-iPad shared-use) for the narrower hardware applicability.
**Notes:** A short intro paragraph inside the Wired subsection does not invent a new top-level section (unlike the rejected 103 "Preflight").

---

## Area D — PEAP inner-auth must be MS-CHAPv2 / B-05

| Sub-decision | Options | Selected |
|--------------|---------|----------|
| D1 Form | Standalone "What breaks" WARNING callout ✓ / Matrix-row note only | Standalone callout |
| D2 Placement | Wi-Fi PEAP context ✓ / Common Mechanics | Wi-Fi PEAP context |
| D3 Matrix nuance | Differentiate inner methods per EAP ✓ / uniform | Differentiate (+ hedge iOS wired-TTLS cell) |

**Verdict (Referee, HIGH/MEDIUM/HIGH):** B-05 explicitly prescribes a "What breaks" callout twice (PITFALLS l.281, l.582) — a research-prescribed pitfall, so it earns a WARNING blockquote (callout discipline satisfied — contrast the structural-only A2/B1). PEAP-inner is method-specific (PEAP only), so it fails the method-agnostic test for Common Mechanics → Wi-Fi PEAP context. The Inner-method row differentiates: EAP-TLS = n/a; PEAP = MS-CHAPv2-only; EAP-TTLS(Wi-Fi) = PAP/CHAP/MS-CHAP/MS-CHAPv2 (STACK Building Block 8 l.166).
**Notes:** D2 was the second hardest-scrutiny MEDIUM. Executor guardrails: iOS wired ALSO supports PEAP (STACK l.233) so the wired matrix PEAP cell MUST read MS-CHAPv2 + a one-line wired cross-reference to the Wi-Fi PEAP callout is advisable; the iOS wired-TTLS inner-method cell MUST be hedged (STACK l.167 — not documented like macOS), not cloned from the confident Wi-Fi cell.

---

## Claude's Discretion

- Exact prose, callout phrasing/labels, anchor wording, Mermaid/diagram use, and section ordering within `05-ios.md`, honoring the locked decisions and corpus conventions.
- Exact phrasing of the per-EAP config matrices, the three-profiles prose, the MAC-randomization note, the "When to use this" wired use-case paragraph, and the B-05 "What breaks" callout label/wording.
- Whether the MAC-randomization note precedes or follows the Wi-Fi per-EAP matrix (must be prominent + freshness-stamped).

## Deferred Ideas

- macOS-only deployment-channel mechanics (Phase 103); Windows-only DANGER/dot3svc/TEAP/KB5014754 (Phase 102) — no iOS equivalent, not cloned.
- Android/Linux gap-stub guides (Phases 105–106); capability-matrix rows + nav-hub (Phase 109); L1/L2 runbooks + decision tree (Phases 107–108); iOS ABM Deadline migration (Phase 110).
