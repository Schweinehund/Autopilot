# Phase 105: Android Enterprise 802.1X Admin-Setup (Wi-Fi + Wired Gap) - Context

**Gathered:** 2026-06-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the **Android Enterprise** per-platform 802.1X admin-setup guide — the **fourth** of the five per-platform guides (Phases 102–106) that link into the Phase-101 foundation, and the **FIRST GAP PLATFORM**. Android Enterprise has native Intune **Wi-Fi** 802.1X support but **zero native wired support** (no profile type, no OMA-URI workaround), so the **locked A3 Hybrid template** (Phase 102 D-01: Common Mechanics → Wi-Fi → Wired, per-EAP matrix in each connection subsection) **degrades** — the Wired subsection collapses to a one-paragraph gap stub. Phase 105 delivers:

- `docs/admin-setup-8021x/06-android.md` — Android Enterprise **Wi-Fi** 802.1X Intune profiles for all three co-equal EAP methods (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS) across the AE enrollment modes, plus a **Wired gap stub**, satisfying **DOT1X-07**.
- A **local entry** added to the `docs/admin-setup-8021x/00-overview.md` platform-guide list (item 6 — the overview placeholder currently reads "6–7. Platform guides (Phase 105–106)" after Phase 104 added item 5). This phase adds item 6 and narrows the placeholder to "7".
- The **one-line scope banner** (per Phase 101 D-06) linking to the canonical scope callout in `02-cert-delivery-foundation.md`.

**In scope:** Android Enterprise Intune **Wi-Fi** network profile configuration (Templates > Wi-Fi); the **enrollment-mode model** (COBO / COPE / COSU / BYOD personally-owned work profile — all share one Wi-Fi profile path, surfaced as a compact mode-applicability matrix); the **UPN-in-SAN deployment-failure** pitfall (B-06, BYOD-work-profile-scoped, "What breaks" WARNING); the **version-gated RADIUS server-name behavior** (Android 11+ field-required + Android 14+ ≤256-char / no-special-chars, one combined freshness-stamped WARNING with DNS-suffix mitigation); the **cert-access-approval** constraint for Device Owner modes (B-08, structural/inline); the **MAC-randomization control** ("Use device MAC" for NAC, Android 13+, plain-prose freshness-stamped note); the **EAP-TTLS inner-method** options (no plain CHAP on Android); the **Wired gap stub** (no native profile, no OMA-URI workaround, network-team-consult alternative); per-EAP-method Wi-Fi config matrix; SCEP/PKCS cert delivery linked to `02-`.

**Out of scope (deferred to owning phases / out of milestone):**
- Per-platform Linux guide → Phase 106 (the gap degrades further — neither Wi-Fi nor wired Intune profiles exist).
- **Android wired 802.1X mechanics** — there is no Intune path and no documented OMA-URI workaround; the guide documents the *gap*, never a workaround. Switch-side port-auth / MAB / VLAN config is out of milestone scope entirely.
- **Android AOSP-specific 802.1X depth** — a **one-line out-of-scope stub note only** (AOSP is a distinct no-GMS platform, absent from SC1; remains a v1.4 suite stub; no PKCS-Imported / no PFX-Import). Not a full mode treatment.
- L1 triage + L2 investigation runbooks + decision tree (Android log sources = Intune portal + ADB logcat) → Phases 107–108. ADB logcat filter strings are MEDIUM confidence — verify at Phase 108 plan time.
- Capability-matrix 802.1X rows + global nav-hub wiring (`index.md`, quick-refs, etc.) → **Phase 109 (navigation-last)**. Only the *local* `00-overview.md` item-6 entry is in scope here.
- Shared concepts (cert-delivery ordering rule, EKU, server-name-validation theory, rogue-RADIUS rationale, EAP-method comparison, identity-privacy/outer-identity theory) — **already homed in `01-`/`02-`; this guide links, never restates** (link-not-copy).
- RADIUS/NPS server config, PKI/CA build-out (ADCS/NDES), Certificate Connector install, switch/AP port config — out of milestone scope entirely.
- Android Device Administrator (DA) Wi-Fi — deprecated, no longer available for GMS devices; out of scope.
- Platform-specific mechanics from siblings (Windows dot3svc/TEAP/KB5014754; macOS deployment-channel keychain; iOS MAC-randomization label "Disable MAC address randomization: Yes" / M-series iPad wired) — **no Android equivalent; do NOT clone them in.** (Android uses its own control name "Use device MAC.")

</domain>

<decisions>
## Implementation Decisions

All 14 sub-decisions across four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus) per the user's standing instruction to "use /adversarial-review to recommend the best one and provide your reasoning" (same protocol as Phases 103 and 104). **The Finder scored 115/140; the Adversary mounted ZERO overturns (net 0), confirming all 14 and independently re-verifying the load-bearing C3 UPN-in-SAN scope against live Microsoft Learn; the Referee — explicitly NOT deferring to the Adversary's blanket concession — independently re-fetched the live MS Learn Android-Enterprise Wi-Fi-settings page and ruled 13 UPHELD + 1 REVISED.** The single revision is **C2's *home*** (the WARNING moves from an all-mode Common-Mechanics block into the Wi-Fi/BYOD-work-profile cert-auth context, to stay consistent with C3's BYOD scoping); its single-callout-plus-cross-ref *structure* stands. No locked pick violates a hard constraint (A3 template locked, link-not-copy, co-equal EAP, navigation-last, Intune client-side scope, 90-day freshness stamps, callout discipline). See `105-DISCUSSION-LOG.md` for the full scored reasoning. The A3 Hybrid structure itself is inherited from Phase 102 D-01 and is NOT re-litigated; only its **gap-platform degradation** is decided here.

### Area A — Wired gap-stub treatment (FIRST gap platform; sets the Linux precedent)
**A1 — Wired stays a top-level `## Wired` section, collapsed, gap-first** (HIGH)
- **D-01:** Keep a top-level `## Wired` H2 (cross-guide parallelism with Windows/macOS/iOS), collapsed to a gap stub that **leads with the gap statement** (bottom-line-up-front). SC3 (ROADMAP) names "the wired 802.1X **section**"; the locked A3 template note (102-CONTEXT `:36`) explicitly degrades the Android Wired *subsection* to a one-paragraph gap stub; `00-overview.md` already points readers to the Android guide for wired details. Demoting to a sub-note would break A3 parity and the overview pointer.

**A2 — Concise gap stub, NOT a bald sentence, NOT a full treatment** (MEDIUM → UPHELD with hard executor bound)
- **D-02:** The Wired section is **one paragraph of plain prose (HARD CAP: two short paragraphs, ~3–6 sentences total)** containing exactly the four A4 facts. **Executor bound (enforced):** **NO** sub-headings, **NO** table/matrix, **NO** per-EAP rows, **NO** callout. If it grows a second subsection, a config table, or per-EAP structure, it has overshot "gap stub." All five sources converge on *one paragraph that still names the alternative*: 102-CONTEXT `:36` ("one-paragraph gap stub"), REQUIREMENTS `:84` ("explicit gap stub **only**"), SUMMARY `:178` ("one-paragraph explanation **and what the alternative is**"), ROADMAP SC3 ("**brief** explanation of alternatives"). This was the flagged pick (the genuine Research-Q3 open question) — "concise section" does not overshoot **provided it stays at stub altitude**.

**A3 — Plain prose (bold lead), NOT a callout** (HIGH)
- **D-03:** Deliver the gap as a **plain-prose bold lead-in, NOT a `> **Label:**` blockquote.** Callout discipline binds: SUMMARY `:178` frames the Android/Linux wired gap as a "one-paragraph explanation" (prose) and `:179` reserves "callout" specifically for the *PKCS-not-supported* constraint — a deliberate prose-vs-callout contrast. There is **no Section F callout prescription** for the Android wired gap (B-06/07/08 are all Wi-Fi pitfalls). Same discipline as 103 D-08 / 104 D-02/D-05. Bold lead gives prominence without a blockquote. (Contrast Linux/Phase 106, whose gap **is** Section-F-prescribed and leads its whole guide — do not import that treatment here.)

**A4 — State exactly four things** (HIGH)
- **D-04:** The Wired stub states exactly: (1) **no native Intune wired-network profile type** exists for Android Enterprise; (2) **no documented OMA-URI workaround** (STACK `:37`/`:245` verbatim); (3) **alternative = consult the network/infrastructure team** for switch-side/non-Intune wired 802.1X (SUMMARY `:178`); (4) **Wi-Fi 802.1X IS fully supported** — point back to the Wi-Fi section (prevents the false impression Android has no 802.1X at all). Do **NOT** document switch port-auth / MAB / VLAN or invent a workaround (out of scope).

### Area B — Enrollment-mode model (NEW to Android — no prior platform had modes)
**B1 — Single Wi-Fi profile path + compact mode-applicability matrix** (HIGH)
- **D-05:** One Enterprise Wi-Fi configuration path + a **compact mode-applicability matrix** (COBO / COPE / COSU / BYOD-WP), **NOT per-mode subsections.** STACK `:23` is dispositive: all AE modes use the **same** Templates > Wi-Fi path; per-mode subsections would replicate the identical nav path + per-EAP matrix four times (link-not-copy / E-02 violation) and break the A3 single-`## Wi-Fi`-subsection template. **Executor note (live-verified):** the matrix must capture the real cross-tab deltas — **corporate-owned** (COBO/COPE/COSU) uses the field **"Radius server name"** and carries the Android 11+/14+ notes; the **personally-owned (BYOD-WP)** tab uses **"Certificate server names"** and carries the UPN-in-SAN deployment-failure note instead. Clone the iOS/macOS Wi-Fi per-EAP matrix once; add the mode-delta table beside it.

**B2 — AOSP = one-line out-of-scope stub note (not silence, not full coverage)** (MEDIUM)
- **D-06:** Cover **COBO/COPE/COSU/BYOD-WP in scope**; give **AOSP a one-line out-of-scope/stub note**. ROADMAP SC1 enumerates exactly the four AE modes and omits AOSP; REQUIREMENTS `:86` frames AOSP depth as out of scope ("confirm at plan time whether **a note suffices**" — default expectation is a note, not silence). AOSP is a distinct no-GMS platform; it shares the Wi-Fi path (live-confirmed) but lacks PKCS-Imported / PFX-Import (STACK `:78`). The one-liner aids discoverability and bounds scope without inviting full treatment.

**B3 — Both deltas as matrix rows; dedicated WARNING for UPN-in-SAN ONLY; cert-access inline** (HIGH)
- **D-07:** The mode matrix carries factual rows for **both** per-mode deltas — BYOD-WP → UPN-in-SAN, and Device-Owner (COBO/COSU/COPE) → cert-access-approval. **Only** UPN-in-SAN additionally earns the prescribed WARNING (see C1/C2); **cert-access (B-08) stays structural/inline — no callout.** This is the exact Section F split: B-06 `:583` = "SCEP cert SAN requirement **callout**"; B-08 `:585` = "Certificate access setting **documentation**" (NOT a callout). Same callout-vs-structural discipline as 104 D-05 ("model")/103 D-08 ("guidance"). The callout-vs-structural split is forced, not discretionary. **Cert-access content (B-08):** for Device Owner profiles set SCEP "Certificate access" to "Grant silently for specific apps" (Wi-Fi supplicant); note Device-Owner cert reporting/revocation limitation.

### Area C — UPN-in-SAN (B-06) — signature Android failure (profile DEPLOYMENT fails, not just auth)
**C1 — "What breaks" WARNING tier (not DANGER)** (HIGH)
- **D-08:** A standalone **"What breaks" WARNING blockquote.** Section F `:583` prescribes a callout; the failure class pins the tier: deployment-blocking but **reversible** (fix the SCEP SAN attribute, redeploy) and **not** a fleet-wide irrecoverable lockout — so DANGER is excluded (DANGER is reserved for the Windows-enforce / fleet-lockout class, 102 D-03/B-02). Mirrors the iOS B-05 PEAP "What breaks" WARNING (104 D-10) and macOS deployment-channel WARNING (103 D-03). Use the corpus's signature "What breaks" framing.

**C2 — ONE WARNING, homed IN the Wi-Fi/BYOD-WP cert-auth context, cross-ref'd, not duplicated** (REVISED by Referee — home corrected)
- **D-09:** **One** WARNING (not duplicated), cross-referenced — single-callout-plus-cross-ref per link-not-copy + the iOS B-05 single-home precedent (`05-ios.md:75` homed once, cross-ref'd from Wired `:134`). **HOME (Referee revision):** place the WARNING **in the Wi-Fi section, in the certificate-authentication context, explicitly scoped to the BYOD personally-owned work profile** — **NOT** in an all-mode Common-Mechanics / SCEP-cert block. Reasons: (1) C3 establishes BYOD-WP-specificity, so an all-mode Common-Mechanics home would mis-scope it to COBO/COPE/COSU — a direct internal contradiction; (2) live MS Learn homes the Note inside the Wi-Fi Enterprise settings under the *personally-owned work profile* tab; (3) 104 D-11 disqualifies mode/method-specific content from Common Mechanics; (4) the failure manifests as **Wi-Fi-profile** deployment failure, and on Android Wi-Fi is the whole substantive guide. **Executor: cross-ref TO the WARNING from the SCEP-cert pointer and the mode matrix — not the reverse.**

**C3 — BYOD personally-owned-work-profile-specific framing; PITFALLS B-06 "all enrollment types" is the outlier** (HIGH — live-re-verified by BOTH Adversary and Referee)
- **D-10:** Frame the hard deployment-failure as a **BYOD personally-owned-work-profile requirement** covering **both user and device certificates *within* that work-profile context** — do **NOT** generalize it to corporate-owned (COBO/COPE/COSU) modes. **Live MS Learn ground truth (Referee re-fetched `ref-wifi-settings-android-enterprise` in-session):** the deployment-failure Note sits structurally under the **"Enterprise (personally owned work profile)"** tab — verbatim "…required to include the UPN in the SAN for **user and device certificates**. If the UPN isn't present in the SAN, the Wi-Fi profile deployment fails" — and is **ABSENT from the Corporate-owned tab and ABSENT from the AOSP tab.** The "user and device certificates" phrase denotes cert *types within the BYOD work profile*, not enrollment types. **PITFALLS B-06's "all enrollment types … Fully Managed, COPE" (`:295`) is the inaccurate outlier and must NOT be followed on enrollment-type scope.** Corroborated 4× in the corpus (STACK `:123`, `:241`; SUMMARY `:50`, `:135`, `:170`) and the shipped `02-`:64 framing. **Plan-time re-verify:** source doc last updated 2025-06-17; Google/Android cert-SAN constraints drift — re-confirm the Note still sits under the personally-owned tab and carry a freshness stamp. *(Optional defensive add, kept OUTSIDE the failure claim: "as good practice, include the UPN in the SAN for any 802.1X cert regardless of mode" — but the **failure** assertion stays BYOD-scoped.)*

### Area D — Version-gated RADIUS callouts + MAC randomization (SC2: freshness-stamped)
**D1 — ONE combined version-gated RADIUS callout (Android 11+ row + 14+ row)** (MEDIUM)
- **D-11:** **One** combined version-gated callout covering both gates, presented as a mini version-matrix — NOT two separate callouts. Both gates govern the **same** "Radius server name" field (STACK `:149`; live MS Learn presents 11+ and 14+ as two sub-bullets of the same field), drift in lockstep on the same 90-day cadence, and SC2 bundles them in one criterion; `02-`:105–106 already presents them together. One callout = one freshness stamp + less callout inflation.

**D2 — WARNING tier for the version-gated RADIUS callout** (MEDIUM)
- **D-12:** **WARNING** tier. A-05 `:574` + B-07 `:584` frame the version-gate as connection-failure + security ("What breaks"; mandatory server-name validation). The Android-14+ behavior is a **silent** post-upgrade failure (profiles that worked on 11–13 fail silently on 14) and the 11+ gate blocks connection — connection-breaking + a rogue-RADIUS security tie pushes past a soft NOTE to WARNING, consistent with C1. **Executor note:** scope the 11+/14+ specifics to the corporate-owned/AOSP "Radius server name" field (live page); the general server-validation-as-security-requirement applies to all modes and is linked (not restated) from `02-`.

**D3 — MAC randomization (Android 13+) = plain-prose freshness-stamped Wi-Fi note, NOT a callout** (HIGH)
- **D-13:** A **prominent plain-prose note in the Wi-Fi subsection, freshness-stamped (Android 13+), NOT a callout** — exact 104 D-02 precedent (STACK building-block / FEATURES differentiator, absent from Section F → callout discipline forbids a blockquote). State the real control values verbatim — "Use device default / Use randomized MAC / **Use device MAC**" — and that **NAC environments must select "Use device MAC"** (STACK `:243`). **Executor: use Android's real control name "Use device MAC" — do NOT clone iOS's "Disable MAC address randomization: Yes."**

**D4 — DNS-suffix guidance inside the Android-14+ row; 90-day freshness on the combined callout** (HIGH)
- **D-14:** The **DNS-suffix-not-FQDN-list** guidance lives **inside the Android-14+ line** as the 256-char mitigation (live page nests it directly under the constraint; STACK `:240`, PITFALLS B-07 `:322–323`, `02-`:106). The combined version-gated callout carries an inline `last_verified` / `review_by` at **+90 days** — the Android-version-gated interval per Research Q7 (SUMMARY `:343`); siblings stamp `last_verified 2026-06-30 / review_by 2026-09-28`. (Contrast: 102 D-06's +180 was for the *stable* Windows KB5014754 gate — not applicable to fast-moving Android.) SC2 makes the stamps mandatory.

### Claude's Discretion
- Exact prose, callout phrasing/labels, anchor wording, section ordering within `06-android.md` — provided the locked decisions above and corpus conventions are honored (`> **Label:**` blockquote callouts; front-matter freshness stamps; plain GitHub auto-slug anchors with no `{#id}` overrides; double-hyphen trap).
- Exact phrasing of the per-EAP-method Wi-Fi config matrix, the mode-applicability matrix, the Wired gap-stub paragraph, the MAC-randomization note, the B-06 "What breaks" WARNING, and the combined version-gated RADIUS WARNING — within the locked structure and guardrails.
- The exact WARNING label/wording for B-06 (must convey: BYOD personally-owned-work-profile cert SAN must include the UPN for user AND device certs; symptom = Wi-Fi **profile deployment fails**, shown as "Error" in Intune; fix = add UPN to the SCEP SAN; do NOT generalize to corporate-owned modes).
- The exact WARNING label/wording for the combined version-gate (must convey: Android 11+ requires the RADIUS server-name field or devices may not connect; Android 14+ caps total server-name length ≤256 chars and disallows special characters, profiles silently fail on 14; use the DNS suffix not full FQDN lists).
- Exact placement order of the MAC-randomization note relative to the Wi-Fi per-EAP matrix — provided it is prominent and freshness-stamped.
- The EAP-TTLS inner-method row content (Android Wi-Fi inner options = PAP / MS-CHAP / MS-CHAP v2; **plain CHAP is NOT listed for Android** — STACK `:171`); PEAP inner = MS-CHAPv2; EAP-TLS = n/a.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 105" — goal, 3 success criteria (SC1 Wi-Fi 3-EAP across COBO/COPE/COSU/BYOD-WP + UPN-in-SAN prominently documented; SC2 Android 11+ server-name + Android 14+ 256-char/no-special-chars with freshness stamps; SC3 wired section states no native Intune wired profile + brief gap explanation of alternatives); dependency on Phase 101.
- `.planning/REQUIREMENTS.md` — **DOT1X-07** (Android Enterprise Wi-Fi, 3 EAP methods, UPN-in-SAN hard requirement, version-gated RADIUS server-name Android 11+/14+, no-native-wired-profile gap freshness-stamped); Out-of-Scope items `:81–86` (no MAB/switch config; AOSP depth = stub, "confirm whether a note suffices").

### Locked template (THE reusable per-platform pattern — clone the A3 structure, then DEGRADE for the gap)
- `.planning/phases/102-windows-802-1x-admin-setup-wi-fi-wired/102-CONTEXT.md` — locked **A3 Hybrid** structure (D-01: Common Mechanics → Wi-Fi → Wired, per-EAP matrix in each connection subsection) **and its gap-platform degradation note (`:36`: "Android collapses the Wired subsection to a one-paragraph gap stub")** — the load-bearing basis for D-01/D-02. Link-not-copy / co-equal-EAP / navigation-last / freshness-stamp conventions. **The structural blueprint for `06-android.md`.**
- `.planning/phases/104-ios-ipados-802-1x-admin-setup-wi-fi-wired/104-CONTEXT.md` — closest decision-style precedent: **B-05 "What breaks" WARNING (D-10/D-11 → basis for C1/C2 tier+single-home)**, **MAC-randomization plain-prose-not-callout (D-02 → basis for D3)**, callout-vs-structural discipline (D-02/D-05), Common-Mechanics disqualification test for mode/method-specific content (D-11 → basis for the C2 home revision), no-auth-mode-selector + server-validation-as-security-requirement framing (carried verbatim to Android).
- `.planning/phases/103-macos-802-1x-admin-setup-wi-fi-wired/103-CONTEXT.md` — the **D-08 callout-vs-structural overturn discipline** (real pitfall denied a callout because research prescribed structural/guidance) mirrored here in D-03/D-07; deployment-channel WARNING tiering precedent (D-03 → C1).
- `docs/admin-setup-8021x/05-ios.md` — the iOS deliverable; **B-05 WARNING homed once + cross-ref'd (`:75`, `:134`) — the single-callout-plus-cross-ref precedent for C2**; the MAC-randomization plain-prose note pattern (`:56–62`); the `## Wired` top-level H2 (`:99`); front-matter freshness-stamp block; See-Also / Change-History footer. **Do NOT clone iOS MAC label or M-series-iPad wired matrix.**
- `docs/admin-setup-8021x/04-macos.md` — the macOS deliverable; per-EAP Wi-Fi matrix with Inner-method row (`:75`), See-Also / Change-History footer, front-matter stamp block. **Do NOT clone macOS deployment-channel keychain mechanics — no Android equivalent.**

### Phase 101 foundation (link targets — this guide LINKS, never restates)
- `docs/admin-setup-8021x/00-overview.md` — folder entry point; **receives the Android platform-list entry (item 6)** + Mermaid/link wiring, and **narrows the placeholder from "6–7" to "7"** (current state at `:34`; the iOS item-5 + 6–7-narrowing change is logged at `:60`); Mermaid setup-sequence + descriptive link-list house style.
- `docs/admin-setup-8021x/01-eap-method-overview.md` — co-equal EAP-method overview; **PEAP-MSCHAPv2 security note + rogue-RADIUS rationale + identity-privacy/outer-identity link target** (for the server-validation framing carried to Android; C-03 identity-privacy on Android Wi-Fi links here).
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert-delivery **ordering rule (CRITICAL callout — LINK target)**, EKU = Client Authentication, RADIUS server-name validation, per-platform cert matrix, **canonical scope callout** (target of the one-line scope banner, D-06 from Phase 101); already carries the BYOD UPN-in-SAN framing at `:64` (consistent with D-10) and the Android 11+/14+ server-name notes at `:105–106` (consistent with D-11/D-14).
- `docs/_glossary-network.md` — 802.1X/EAP/RADIUS/supplicant/SCEP/PKCS/server-name-validation terms; `#server-name-validation` anchor is a server-validation-framing link target.

### Research (HIGH confidence — guide content is research-sourced)
- `.planning/research/SUMMARY.md` §"Phase 105 — Android Enterprise Wi-Fi + Wired Gap Stub" (`:233–238`); Per-Platform Coverage-Reality Matrix (`:151–180`: Android Wi-Fi native / wired NO; RADIUS server name "Required Android 11+; ≤256 chars Android 14+"; MAC "Configurable Android 13+"; reading-guide `:178` Android wired gap = "one-paragraph explanation + network-team consultation", `:179` reserves "callout" for PKCS, `:180` auth-mode "NOT exposed" on Android); UPN-in-SAN facts (`:50`, `:81`, `:135`, `:170`); **Research Q3** wired-gap prominence (`:330–331` — resolved by D-01/D-02); **Research Q7** freshness intervals (`:343` — 90-day for Android version-gated → D-14).
- `.planning/research/STACK.md` — AE profile path (`:23`: all modes share Templates>Wi-Fi); **no wired profile / no OMA-URI (`:37`, `:245` → D-04)**; AOSP cert-type gaps (`:78`); EAP-TLS UPN-in-SAN (`:119–123`); RADIUS server-name version gates (`:149`); **EAP-TTLS inner methods — no plain CHAP (`:168`, `:171`)**; PEAP (`:183`); Android Enterprise modes/tabs + UPN/MAC/no-wired detail (`:235–245`: `:239` 11+ field, `:240` 14+ char limit + DNS-suffix, `:241` BYOD-WP UPN-in-SAN scope, `:243` MAC "Use device MAC", `:245` no wired); cert types (`:334`); sources (`:349` Android-Enterprise Wi-Fi settings ref).
- `.planning/research/PITFALLS.md` — **B-06** UPN-in-SAN Wi-Fi-profile-deployment-failure (`:289–308`; note `:295` "all enrollment types" is the **inaccurate outlier** per D-10 live verification; target `:308`); **B-07** Android 14+ RADIUS name length (`:311–323` + Section F `:584` "version-gated callout with freshness stamp"); **B-08** cert-access approval for COBO/COSU/COPE Device Owner (`:326–`+ Section F `:585` "documentation" = NOT a callout → D-07); **A-05** server-validation-disabled (`:574` mandatory + Android-14 version-gate); **C-03** identity-privacy/outer-identity on Android Wi-Fi (`:444`). **Section F callout-prescription table (`:568–599`) — the authority for D-03/D-07 (wired gap + cert-access get NO callout) vs C1/D-12 (B-06 + version-gate get callouts).**
- `.planning/research/ARCHITECTURE.md` — file layout; confirms `06-android.md` as the single deliverable + the shared-vs-per-platform link-not-copy boundary.

### Live-verified fact (Adversary + Referee independently, 2026-06-30)
- Microsoft Learn — **Wi-Fi settings for Android Enterprise devices** (`https://learn.microsoft.com/en-us/intune/intune-service/configuration/wi-fi-settings-android-enterprise`; reference `ref-wifi-settings-android-enterprise`, doc updated 2025-06-17): the UPN-in-SAN **Wi-Fi-profile-deployment-failure Note sits under the "Enterprise (personally owned work profile)" tab** ("user and device certificates"; deployment fails if UPN absent) and is **ABSENT from the Corporate-owned and AOSP tabs.** Corporate-owned uses field "Radius server name" (Android 11+/14+ notes); personally-owned uses "Certificate server names". MAC randomization control = "Use device default / Use randomized MAC / Use device MAC" (Android 13+). **Validates D-05, D-10, D-11, D-13.** (Plan-time: re-confirm the Note still sits under the personally-owned tab and the version gates have not drifted.)

### House-style precedent
- `docs/admin-setup-macos/03-configuration-profiles.md` — feature/connection-first guide structure + `#### In Intune admin center` compact subsections (the A3 precedent; cited by Phases 102/103/104).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase-104 deliverable (`05-ios.md`)**: the **nearest** structural template — the `## Wired` top-level H2 (`:99`), the **single-callout-plus-cross-ref pattern** (B-05 WARNING `:75` + Wired cross-ref `:134` → C2), the **MAC-randomization plain-prose freshness-stamped note** (`:56–62` → D3), front-matter stamp block, See-Also / Change-History footer. **Strip the iOS-only MAC label and M-series-iPad wired matrix** (Android wired is a gap stub).
- **Phase-103/102 deliverables (`04-macos.md` / `03-windows.md`)**: per-EAP Wi-Fi matrix with Inner-method row (`:75`), `### In Intune admin center` compact subsections, single Common-Mechanics home for server validation. **Strip platform-only mechanics** (dot3svc/TEAP/KB5014754; deployment-channel keychain).
- **Foundation files (`00`/`01`/`02`)**: EAP-comparison + cert-asymmetry matrix patterns to clone for the per-EAP config matrix; canonical scope callout (one-line banner target); `02-` cert-ordering CRITICAL callout (LINK target); `01-` PEAP-MSCHAPv2 + identity-privacy link targets. `02-`:64 + `:105–106` already carry the BYOD-UPN-SAN + Android-11+/14+ framing — **link/reuse, do not contradict.**

### Established Patterns
- **A3 gap degradation** — the locked template (102 D-01) degrades cleanly for gap platforms: heading stays (`## Wired`), content collapses to a one-paragraph stub (102-CONTEXT `:36`). Android is the **first** application; Linux (106) degrades further.
- **link-not-copy** — home shared concepts once / link to `01-`/`02-`; cert-ordering, server-validation theory, rogue-RADIUS rationale, identity-privacy theory all linked, never restated.
- **navigation-last** — capability-matrix rows + global nav-hub are **Phase 109**, not 105. Only the local `00-overview.md` item-6 entry is in scope.
- **co-equal EAP** — no "recommended default" method; the per-EAP-method matrix enforces this by construction; the Inner-method row differentiates **factually, not preferentially** (Android: no plain CHAP for EAP-TTLS).
- **Freshness stamps** — file front-matter 90-day (`last_verified` + 90 = `review_by`). The **Android 13+ MAC note and the combined Android-11+/14+ version-gate callout each carry their own 90-day stamp** (version-gated drift-prone facts; D-13/D-14).
- **Anchor slugs** — plain GitHub auto-slugs, no `{#id}` overrides; double-hyphen trap.
- **Callout discipline** — the **only** research-prescribed callout-class items for Android are the **B-06 UPN-in-SAN "What breaks" WARNING (C1/D-09)** and the **combined version-gated RADIUS WARNING (D-12)**. The **wired gap (D-03)**, the **three-mode cert-access B-08 (D-07)**, and **MAC randomization (D-13)** are **structural/plain-prose, NOT callouts.** No DANGER callout.

### Integration Points
- `docs/admin-setup-8021x/06-android.md` — new file (does not exist yet).
- `docs/admin-setup-8021x/00-overview.md` — **edited** to add the Android platform-list entry (item 6) + Mermaid/link wiring, and narrow the placeholder range from "6–7" to "7"; pre-existing file → edit must be harness-allowlisted (same pattern as Phase 104's item-5 edit and Phase 103's item-4 edit).

</code_context>

<specifics>
## Specific Ideas

- **Wired = gap stub, gap-first.** Top-level `## Wired`, **one plain-prose paragraph** (hard cap two short paras, no callout/table/sub-headings): no native Intune wired profile, no OMA-URI workaround, consult your network team, Wi-Fi IS supported (D-01..D-04). First gap platform — sets the Linux precedent (but Linux's gap leads its whole guide and IS callout-prescribed; Android's is not).
- **Enrollment modes = one Wi-Fi path + a compact mode-applicability matrix** (COBO/COPE/COSU/BYOD-WP), capturing the live field-name delta (corporate-owned "Radius server name" vs BYOD-WP "Certificate server names"). **AOSP = one-line out-of-scope stub note only** (D-05/D-06).
- **UPN-in-SAN** is the signature Android gotcha — **Wi-Fi profile DEPLOYMENT fails** (not just auth) if the UPN is absent from the cert SAN. **One "What breaks" WARNING, homed in the Wi-Fi/BYOD-WP cert-auth context, scoped strictly to BYOD personally-owned work profile** (covers user + device certs within that context). **Do NOT generalize to corporate-owned — PITFALLS B-06 is wrong on this; verified against live MS Learn** (D-08/D-09/D-10).
- **Version-gated RADIUS** = **one combined WARNING** — Android 11+ (server-name field required or no connect) + Android 14+ (≤256 chars / no special chars, DNS-suffix mitigation), 90-day freshness-stamped (D-11/D-12/D-14).
- **MAC randomization** (Android 13+) = **plain-prose freshness-stamped Wi-Fi note**, NAC wants **"Use device MAC"** — Android's real control name, NOT iOS's "Disable MAC address randomization: Yes" (D-13).
- **Cert-access (B-08)** for Device Owner (COBO/COSU/COPE) = structural/inline ("Grant silently for specific apps"; note Device-Owner reporting/revocation limitation) — NOT a callout (D-07).
- **EAP-TTLS inner methods** on Android Wi-Fi = PAP / MS-CHAP / MS-CHAP v2 — **no plain CHAP** (STACK `:171`); PEAP = MS-CHAPv2; EAP-TLS = n/a.
- **Carried verbatim from siblings (apply to Android):** no-auth-mode-selector note (authenticates as current context only); server-name field + server-validation = security-requirement framing (linked from `02-`); identity-privacy/outer-identity field (linked from `01-`).

</specifics>

<deferred>
## Deferred Ideas

- **Linux gap-and-workaround guide** (`07-linux.md`) — Phase 106; the A3 template degrades further (no Wi-Fi AND no wired Intune profile; script/nmcli EAP-TLS workaround; the gap leads the whole guide and IS Section-F-callout-prescribed, unlike Android's wired stub).
- **Android AOSP 802.1X depth** — out of scope this milestone; a one-line stub note suffices here (D-06). Full AOSP treatment remains a v1.4 suite stub.
- **Android wired 802.1X workaround / switch-side config (MAB, port-auth, VLAN)** — out of milestone scope entirely; the guide documents the *gap*, not a workaround.
- **Capability-matrix 802.1X rows + global nav-hub wiring** — Phase 109 (navigation-last). Not Phase 105.
- **L1/L2 runbooks + decision tree** (Android log sources = Intune portal + **ADB logcat** — filter strings MEDIUM confidence, verify at Phase 108 plan time; RADIUS rejects; cert-chain/server-trust failures; EAP negotiation) — Phases 107–108. The Android diagnostic row feeds these, not this guide.
- **Sibling-only mechanics** (Windows dot3svc/TEAP/KB5014754; macOS deployment-channel keychain; iOS MAC label / M-series-iPad wired) — owned by Phases 102/103/104; no Android equivalent. Do NOT clone into `06-android.md`.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 105-android-enterprise-802-1x-admin-setup-wi-fi-wired-gap*
*Context gathered: 2026-06-30*
