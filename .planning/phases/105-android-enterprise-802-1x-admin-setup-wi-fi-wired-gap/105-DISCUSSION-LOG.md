# Phase 105: Android Enterprise 802.1X Admin-Setup (Wi-Fi + Wired Gap) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-30
**Phase:** 105-android-enterprise-802-1x-admin-setup-wi-fi-wired-gap
**Areas discussed:** Wired gap-stub treatment, Enrollment-mode model, UPN-in-SAN callout (B-06), Version-gated RADIUS callouts

---

## Resolution method

The user selected all four gray areas and instructed: *"For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning"* — the same standing protocol used for Phases 103 and 104. A three-agent adversarial review (Finder → Adversary → Referee, all Opus) resolved the 14 sub-decisions.

| Agent | Result |
|-------|--------|
| **Finder** | Recommended one best option per sub-decision; scored **115/140**. Re-fetched live MS Learn to settle the C3 factual tension. |
| **Adversary** | Mounted **ZERO defensible overturns (net 0)**; confirmed all 14. Independently re-verified C3 against live MS Learn (would have lost 20 had it overturned). Flagged A2 + C2 for the Referee. |
| **Referee** | Did **NOT** defer to the Adversary's blanket concession. Independently re-fetched the live MS Learn Android-Enterprise Wi-Fi-settings page for C3. Ruled **13 UPHELD + 1 REVISED** (C2 home corrected). |

No locked pick violates a hard constraint (A3 template locked, link-not-copy, co-equal EAP, navigation-last, Intune client-side scope, 90-day freshness stamps, callout discipline).

---

## Area A — Wired gap-stub treatment

| Sub-decision | Options considered | Selected (Referee) |
|--------------|--------------------|--------------------|
| **A1 Structure** | (a) Top-level `## Wired` section, collapsed, gap-first ✓ / (b) demote to a sub-note | **(a)** UPHELD (HIGH) |
| **A2 Depth** (Research Q3) | (a) one-paragraph gap stub ✓ / (b) full section with explanation + alternatives | **concise stub** UPHELD with **hard executor bound**: 1 para (cap 2 short), no sub-headings/table/callout |
| **A3 Form** | plain prose bold lead ✓ / `> **Label:**` callout | **plain prose** UPHELD (HIGH) — no Section F prescription for the Android wired gap |
| **A4 Content** | exactly 4 facts ✓ / more | **4 facts** UPHELD (HIGH): no native profile; no OMA-URI workaround; network-team-consult; Wi-Fi IS supported |

**Notes:** A2 was the flagged-vulnerable pick (the genuine Research-Q3 open question). The Referee upheld "concise section" only because it does not overshoot one-paragraph **stub altitude** — and pinned an exact executor bound to enforce that. Android's wired gap is plain prose because it is NOT Section-F-callout-prescribed; contrast Linux (Phase 106), whose gap IS prescribed and leads its whole guide.

---

## Area B — Enrollment-mode model (NEW to Android)

| Sub-decision | Options considered | Selected (Referee) |
|--------------|--------------------|--------------------|
| **B1 Presentation** | single Wi-Fi path + compact mode matrix ✓ / per-mode subsections | **single path + matrix** UPHELD (HIGH) — STACK `:23` all modes share the path |
| **B2 AOSP scope** | one-line out-of-scope stub note ✓ / full coverage / total silence | **one-line stub note** UPHELD (MED) — REQUIREMENTS `:86` "confirm whether a note suffices"; SC1 omits AOSP |
| **B3 Mode-delta homing** | both deltas as matrix rows + WARNING for UPN-in-SAN only; cert-access inline ✓ | **both rows + UPN WARNING only** UPHELD (HIGH) — Section F: B-06=callout, B-08=documentation |

**Notes:** Live MS Learn confirmed the matrix must capture the corporate-owned ("Radius server name") vs personally-owned ("Certificate server names") field-name delta.

---

## Area C — UPN-in-SAN callout (B-06)

| Sub-decision | Options considered | Selected (Referee) |
|--------------|--------------------|--------------------|
| **C1 Tier** | "What breaks" WARNING ✓ / CRITICAL / DANGER | **WARNING** UPHELD (HIGH) — reversible deployment failure, not fleet lockout |
| **C2 Home + structure** | single callout + cross-ref ✓ (structure); **home: Common-Mechanics → REVISED to Wi-Fi/BYOD-WP cert-auth context** | **single+cross-ref UPHELD; HOME REVISED** to Wi-Fi/BYOD-WP context |
| **C3 Scope framing** | BYOD personally-owned-work-profile-specific ✓ / "all enrollment types" | **BYOD-WP-specific** UPHELD (HIGH) — live MS Learn re-verified by BOTH Adversary and Referee |

**Notes:** **C2 is the one revision.** The Finder homed the WARNING at an all-mode Common-Mechanics/SCEP block; the Referee moved it INTO the Wi-Fi/BYOD-work-profile cert-auth context to avoid contradicting C3's BYOD scoping (an all-mode home would mis-imply it applies to COBO/COPE/COSU). Cross-ref TO it from the SCEP pointer and mode matrix — not the reverse. **C3 is the load-bearing factual call:** the live `ref-wifi-settings-android-enterprise` page places the deployment-failure Note under the **"Enterprise (personally owned work profile)"** tab only — ABSENT from corporate-owned and AOSP tabs. PITFALLS B-06's "all enrollment types … Fully Managed, COPE" is the **inaccurate outlier** and must not be followed on enrollment scope. Plan-time re-verify (doc last updated 2025-06-17; cert-SAN constraints drift).

---

## Area D — Version-gated RADIUS callouts

| Sub-decision | Options considered | Selected (Referee) |
|--------------|--------------------|--------------------|
| **D1 Consolidation** | one combined version-gated callout ✓ / two separate | **combined** UPHELD (MED) — same RADIUS server-name field, lockstep drift |
| **D2 Tier** | WARNING ✓ / NOTE | **WARNING** UPHELD (MED) — A-05 "What breaks"/mandatory; silent Android-14 failure |
| **D3 MAC randomization** | plain-prose freshness-stamped Wi-Fi note ✓ / callout | **plain prose** UPHELD (HIGH) — 104 D-02 precedent; use control name **"Use device MAC"** for NAC |
| **D4 DNS-suffix + freshness** | DNS-suffix inside the 14+ line; 90-day stamp ✓ | UPHELD (HIGH) — SUMMARY Q7 `:343` 90-day for Android version-gated |

**Notes:** D3 must use Android's real control name "Use device MAC" — NOT cloned from iOS's "Disable MAC address randomization: Yes."

---

## Claude's Discretion

- Exact prose, callout phrasing/labels, anchor wording, section ordering within `06-android.md` (honoring locked decisions + corpus conventions).
- Exact phrasing of the per-EAP Wi-Fi config matrix, the mode-applicability matrix, the Wired gap-stub paragraph, the MAC note, the B-06 WARNING, and the combined version-gate WARNING.
- Exact WARNING labels/wording for B-06 and the version-gate (must convey the locked facts/symptoms/scope in CONTEXT.md).
- Placement order of the MAC note relative to the Wi-Fi per-EAP matrix.
- EAP-TTLS inner-method row content (PAP/MS-CHAP/MS-CHAPv2 — no plain CHAP on Android).

## Deferred Ideas

- Linux gap-and-workaround guide (`07-linux.md`) — Phase 106.
- Android AOSP 802.1X depth — out of scope; one-line stub note here.
- Android wired workaround / switch-side config (MAB, port-auth, VLAN) — out of milestone scope.
- Capability-matrix 802.1X rows + global nav-hub wiring — Phase 109 (navigation-last).
- L1/L2 runbooks + decision tree (Android = Intune portal + ADB logcat, filters MEDIUM-confidence) — Phases 107–108.
- Sibling-only mechanics (Windows dot3svc/TEAP/KB5014754; macOS deployment-channel keychain; iOS MAC label / M-series-iPad wired) — owned by 102/103/104; no Android equivalent.
