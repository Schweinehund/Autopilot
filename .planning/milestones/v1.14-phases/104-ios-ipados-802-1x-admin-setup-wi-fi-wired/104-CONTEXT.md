# Phase 104: iOS/iPadOS 802.1X Admin-Setup (Wi-Fi + Wired) - Context

**Gathered:** 2026-06-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the **iOS/iPadOS** per-platform 802.1X admin-setup guide — the **third** of the five per-platform guides (Phases 102–106) that link into the Phase-101 foundation, reusing the **locked A3 Hybrid template** (Phase 102 D-01, executed for Windows in `03-windows.md` and macOS in `04-macos.md`). Phase 104 delivers:

- `docs/admin-setup-8021x/05-ios.md` — iOS/iPadOS Wi-Fi + wired 802.1X Intune profiles for all three co-equal EAP methods (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS), satisfying **DOT1X-06**.
- A **local entry** added to the `docs/admin-setup-8021x/00-overview.md` platform-guide list (item 5 — the overview placeholder currently reads "5–7. Platform guides (Phase 104–106)"; Phase 103 added item 4 + narrowed the placeholder to 5–7). This phase adds item 5 and narrows the placeholder to "6–7".
- The **one-line scope banner** (per Phase 101 D-06) linking to the canonical scope callout in `02-cert-delivery-foundation.md`.

**In scope:** iOS/iPadOS Intune Wi-Fi + wired network profile configuration (Templates path); the **MAC-address-randomization control** ("Disable MAC address randomization: Yes" for NAC environments, iOS 14+); the **three-separate-profiles model** (trusted root + SCEP/PKCS client cert + Wi-Fi/Wired — no combined `.mobileconfig`, no Apple Configurator); the **M-series iPad wired use case** (USB Ethernet, shared-use scenarios); the **wired SCEP-only / PKCS-not-supported** constraint; the **PEAP-inner-auth-must-be-MS-CHAPv2** pitfall (B-05); the **no-auth-mode-selector** iOS fact; the **server-name field + server-validation-as-security-requirement** framing (disabling validation = security violation on iOS); per-EAP-method config matrices (with Inner-method row) in each connection subsection; SCEP/PKCS/PFX-Import cert delivery linked to `02-`.

**Out of scope (deferred to owning phases / out of milestone):**
- Per-platform Android/Linux guides → Phases 105–106.
- L1 triage + L2 investigation runbooks + decision tree → Phases 107–108.
- Capability-matrix 802.1X rows + global nav-hub wiring (`index.md`, quick-refs, etc.) → **Phase 109 (navigation-last)**. Only the *local* `00-overview.md` item-5 entry is in scope here.
- Shared concepts (cert-delivery ordering rule, EKU, server-name-validation theory, rogue-RADIUS rationale, EAP-method comparison) — **already homed in `01-`/`02-`; this guide links, never restates** (link-not-copy).
- RADIUS/NPS server config, PKI/CA build-out (ADCS/NDES), Certificate Connector install, switch/AP port config, MAB — out of milestone scope entirely.
- Windows-only mechanics (dot3svc, enforcement-staging, TEAP, KB5014754) and macOS-only mechanics (deployment-channel User/Device keychain immutability) — those belong to Phases 102/103 and have **no iOS equivalent**; do NOT clone them in.
- iOS/iPadOS ABM "Assign Device Management" + Deadline migration → Phase 110 (Pillar C), separate milestone surface.

</domain>

<decisions>
## Implementation Decisions

All twelve sub-decisions across four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus) per the user's standing instruction to "use /adversarial-review to recommend the best one and provide your reasoning" (same protocol as Phase 103). **The Finder scored 110/120; the Adversary conceded all 12 (mounting no defensible overturn, and verifying the A4 MAC-randomization label against live Microsoft Learn); the Referee independently upheld all 12 — explicitly NOT deferring to the Adversary's blanket concession — and re-verified the load-bearing MAC-randomization fact against live MS Learn (`ref-wifi-settings-apple`, ios-ipados pivot, 2026-06-30).** No overturns. No locked pick violates a hard constraint (A3 template locked, link-not-copy, co-equal EAP, navigation-last, Intune client-side scope, 90-day freshness stamps, callout discipline). See `104-DISCUSSION-LOG.md` for the full scored reasoning. The A3 Hybrid structure itself is inherited from Phase 102 D-01 and is NOT re-litigated here.

### Area A — MAC-address randomization (NEW to iOS; no Windows/macOS analog)
**Placement → Wi-Fi subsection ONLY** (HIGH)
- **D-01:** The MAC-randomization control lives in the **Wi-Fi subsection only**, NOT in Common Mechanics. It is a per-Wi-Fi-profile setting (STACK ~l.225–226; confirmed against live MS Learn — the macOS equivalent is still *in development*); the iOS wired profile binds to "Any Ethernet" with no MAC control (STACK ~l.230). Common Mechanics is reserved for settings that apply to **both** connection types (`03-windows.md`:17, `04-macos.md`:17), so a Wi-Fi-only control does not belong there.

**Weight → plain prose note, NOT a WARNING callout** (HIGH)
- **D-02:** MAC randomization is documented as a **prominent plain-prose note in the Wi-Fi subsection — NOT a `> **Label:**` blockquote callout.** It is **not a PITFALLS-numbered pitfall** (it is a STACK building block / FEATURES differentiator: SUMMARY ~l.78, ~l.169, ~l.229) and is **absent from the Section F callout-prescription table** (~l.568–599). Callout discipline binds: every blockquote in this corpus maps to an explicit research callout prescription, and MAC randomization has none. The failure mode is **intermittent + reversible + NAC-conditional** — not the irrecoverable/fleet-lockout class that earns WARNING/DANGER. This directly parallels the Phase-103 D-08 discipline (a real pitfall denied a callout because research prescribed structural/guidance). **Executor guardrail: "plain note" ≠ buried — it must be prominent prose, lead with the SC1 phrasing (D-04), and carry the iOS-14+ freshness stamp (E-03).**

**Scoping → explicitly Wi-Fi-only; wired uses physical NIC MAC** (HIGH)
- **D-03:** State explicitly that **MAC randomization is a Wi-Fi-only concern and does not apply to wired** — iOS wired 802.1X over a USB-Ethernet adapter presents the adapter's **physical MAC** (STACK ~l.230–231; live MS Learn). This per-platform delta prevents a reader of the full-peer wired section (D-08) from hunting for a randomization toggle that does not exist there. Reinforces D-01.

**Phrasing → "Disable MAC address randomization: Yes"** (HIGH)
- **D-04:** Canonical phrasing is **"Disable MAC address randomization: Yes"** (ROADMAP SC1 verbatim; SUMMARY ~l.229). Live MS Learn confirms the real Intune control is a single dropdown **"Disable MAC address randomization"** where **Yes = forces the device to present its actual Wi-Fi MAC** (for NAC). The STACK ~l.226 alternative — "set MAC randomization to 'Yes' (forces actual MAC)" — describes a **non-existent, internally contradictory** setting (Yes-to-randomization cannot force the hardware MAC) and must **NOT** be reproduced. **Executor guardrail: keep any "verify exact UI label in current Intune" hedge LIGHT (verification ethos) — the label was confirmed accurate as of 2026-06-30; do not weaken the instruction.**

### Area B — Three-separate-profiles model / E-07 (.mobileconfig confusion)
**Form → structural prose, NO callout/Mermaid** (HIGH)
- **D-05:** The three-separate-profiles model is conveyed **structurally in prose — no `> **Label:**` blockquote callout and no Mermaid sequence.** E-07's Section F prescription term is a **"three-separate-profiles documentation model"** (PITFALLS ~l.598) — "model," deliberately NOT "callout" (the corpus says "callout" precisely for B-05/B-06). A blockquote would restate the cert-delivery-ordering rule already homed as a **CRITICAL callout** in `02-cert-delivery-foundation.md`:37–45 — callout inflation + link-not-copy tension. A Mermaid diagram is redundant with existing diagrams (`00-overview.md`:18–22, `01-`:25–39). Same discipline as Phase-103 D-08. **Executor guardrail: structural ≠ silent — state the three-profiles fact explicitly in prose.**

**Placement → Common Mechanics** (HIGH)
- **D-06:** Home the three-profiles framing in **Common Mechanics.** Cert delivery (trusted root → SCEP/PKCS client cert → network profile) precedes and applies to **both** Wi-Fi and Wired, so it is genuinely cross-cutting — exactly the test the locked A3 template uses to home content in Common Mechanics (Phase 102 D-01/D-03; Phase 103 D-05). The guide intro is already occupied by the prerequisites block + one-line scope banner.

**link-not-copy boundary → LINK ordering to `02-`; state only the iOS delta** (HIGH)
- **D-07:** **LINK** the cert-delivery-ordering rule to `02-cert-delivery-foundation.md` (homed there as a CRITICAL callout; `03-`/`04-` both link, never restate). State **only the iOS-specific delta**: **three distinct Intune profiles (trusted root + SCEP/PKCS client cert + Wi-Fi/Wired); no combined `.mobileconfig`; no Apple Configurator — this suite is Intune-managed-fleet only.** E-07 ~l.560 explicitly mandates excluding the Apple Configurator / manual `.mobileconfig` path.

### Area C — M-series iPad wired depth
**Depth → full-peer wired matrix (clone macOS D-07)** (HIGH)
- **D-08:** iOS wired gets **full peer treatment equal to Wi-Fi**, including a **complete per-EAP-method config matrix** in the Wired subsection. SUMMARY classifies iOS wired as **"Full guide" / "YES (GA, M-series iPad)"** (~l.154, ~l.175); the locked A3 decision (Phase 102 D-01) mandates a per-EAP matrix "inside EACH connection subsection," and **matrix collapse is reserved ONLY for gap platforms (Android/Linux)**. macOS D-07 set the exact precedent (`04-macos.md`:124–137). A compact section would violate locked D-01 and the "Full guide" classification.

**Use-case framing → early "When to use this" paragraph** (HIGH)
- **D-09:** Add a brief **"When to use this" use-case paragraph at the top of the Wired subsection** — **M-series iPads with a USB-Ethernet adapter, for multi-iPad shared-use scenarios** (STACK ~l.231; ROADMAP SC2 / DOT1X-06 framing). This is the exact resolution of **Research Q4** (SUMMARY ~l.333–334): full-peer matrix (D-08) **plus** a use-case framing paragraph for the narrower hardware applicability. D-08 and D-09 are **complementary, not competing**. A short intro paragraph inside the Wired subsection does NOT invent a new top-level section (unlike the rejected Phase-103 "Preflight").

### Area D — PEAP inner-auth must be MS-CHAPv2 (B-05)
**Form → standalone "What breaks" WARNING callout** (HIGH)
- **D-10:** The PEAP-inner-auth constraint is a **standalone "What breaks" WARNING blockquote callout.** B-05 carries one of the most explicit callout prescriptions in the corpus, stated **twice**: PITFALLS ~l.281 ("Document this constraint explicitly … as a platform-specific **'What breaks' callout**") and Section F ~l.582. This is exactly the research-prescribed pitfall the callout-discipline constraint protects. WARNING tier fits (auth break, reversible, not fleet-lockout). The callout **coexists** with the matrix Inner-method row (D-12) — prominence + completeness. Incorporate the "What breaks" framing.

**Placement → Wi-Fi PEAP context, NOT Common Mechanics** (MEDIUM)
- **D-11:** Place the prominent callout in the **Wi-Fi PEAP context**, NOT Common Mechanics. The corpus's Common Mechanics holds **method-agnostic** settings (auth mode, server validation, identity privacy); PEAP-inner is **method-specific** (PEAP only), so it fails the "regardless of method" test and is disqualified from Common Mechanics. B-05 is research-framed as Wi-Fi/SSID-specific (~l.274, ~l.286). **Executor guardrail (closes the only real gap): iOS wired ALSO supports PEAP (STACK ~l.233), so the wired matrix's PEAP Inner-method cell MUST read MS-CHAPv2 (enforced by D-12), and a one-line wired cross-reference to the Wi-Fi PEAP "What breaks" callout is advisable so a wired-only reader is not blindsided.**

**Per-EAP matrix nuance → differentiate inner methods per EAP** (HIGH)
- **D-12:** The per-EAP **Inner-method row** differentiates by method: **EAP-TLS = — (n/a, cert-only); PEAP = MS-CHAPv2 only (not PAP); EAP-TTLS (Wi-Fi) = PAP / CHAP / MS-CHAP / MS-CHAP v2.** Sourced from STACK Building Block 8 (~l.166) + PITFALLS B-05 ~l.281. Clones the locked Windows (`03-windows.md`:75) and macOS (`04-macos.md`:75) matrix rows. **Executor guardrail: the iOS WIRED EAP-TTLS inner-method cell MUST be hedged, NOT cloned from Wi-Fi** — STACK ~l.167 states iOS wired-zone TTLS inner methods are "not explicitly documented (Username/Password option exists)." Unlike macOS (where wired TTLS = all four is documented), iOS wired TTLS must read cautiously (e.g., "Username/Password; specific inner options not explicitly documented in the iOS wired zone — verify in console"). PEAP = MS-CHAPv2 holds in **both** connection matrices.

### Claude's Discretion
- Exact prose, callout phrasing/labels, anchor wording, section ordering within `05-ios.md` — provided the locked decisions above and corpus conventions are honored (`> **Label:**` blockquote callouts; front-matter freshness stamps; plain GitHub auto-slug anchors with no `{#id}` overrides; double-hyphen trap).
- Exact phrasing of the per-EAP-method config matrices, the three-profiles prose, the MAC-randomization note, the "When to use this" wired use-case paragraph, and the B-05 "What breaks" callout — within the locked structure and guardrails.
- The exact WARNING label/wording for the B-05 callout (must convey: iOS PEAP inner auth MUST be MS-CHAPv2, PAP fails on iOS unlike Windows/macOS, symptom = "Authentication Failed").
- Whether the MAC-randomization note precedes or follows the Wi-Fi per-EAP matrix — provided it is prominent and freshness-stamped.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 104" — goal, 3 success criteria (SC1 Wi-Fi 3-EAP + "Disable MAC address randomization: Yes" for NAC, iOS 14+, freshness-stamped; SC2 wired M-series iPad + USB Ethernet + SCEP-only / PKCS-not-supported callout; SC3 PEAP inner = MS-CHAPv2 + three separate Intune profiles required); dependency on Phase 101.
- `.planning/REQUIREMENTS.md` — **DOT1X-06** (iOS/iPadOS Wi-Fi + wired, 3 EAP methods, MAC-randomization handling for NAC iOS 14+, wired GA on M-series iPad, wired SCEP-only constraint, PEAP inner-auth = MS-CHAPv2).

### Locked template (THE reusable per-platform pattern — clone its A3 structure)
- `.planning/phases/102-windows-802-1x-admin-setup-wi-fi-wired/102-CONTEXT.md` — locked **A3 Hybrid** structure (D-01: Common Mechanics → Wi-Fi → Wired, per-EAP matrix in each connection subsection), link-not-copy / co-equal-EAP / navigation-last applications, freshness-stamp conventions, gap-platform degradation note. **The structural blueprint for `05-ios.md`.**
- `.planning/phases/103-macos-802-1x-admin-setup-wi-fi-wired/103-CONTEXT.md` — closest decision-style precedent (D-01..D-12): server-name homing in Common Mechanics (D-05), no-auth-mode-selector note (D-04 — applies to iOS too, SUMMARY ~l.180), wired SCEP-only callout (D-06 — mirrors iOS exactly), server-validation-as-security-violation framing (D-11/D-12 — verbatim applies to iOS, PITFALLS ~l.107), EAP-TTLS inner-auth matrix row (D-10), and the **D-08 callout-vs-structural overturn discipline** mirrored here in D-02/D-05.
- `docs/admin-setup-8021x/04-macos.md` — the macOS deliverable; **full-peer wired matrix precedent (D-08 here clones `:124–137`)**, the per-EAP matrix Inner-method row (`:75`), the SCEP-only wired callout pattern, the See-Also / Change-History footer, front-matter freshness-stamp block. **Do NOT clone the macOS-only deployment-channel WARNING / User-Device-keychain mechanics — no iOS equivalent.**
- `docs/admin-setup-8021x/03-windows.md` — Windows deliverable; section order, `### In Intune admin center` compact subsections, the per-EAP config matrix with Inner-method row (`:75`, `:144–155`), the single Common-Mechanics home for server validation (`:33–43`). **Do NOT clone Windows-only dot3svc / enforcement-staging DANGER / TEAP / KB5014754.**

### Phase 101 foundation (link targets — this guide LINKS, never restates)
- `docs/admin-setup-8021x/00-overview.md` — folder entry point; **receives the iOS platform-list entry (item 5)** + Mermaid/link wiring, and **narrows the placeholder from "5–7" to "6–7"** (current state at `:30–32`; the macOS item-4 + 5–7-narrowing change is logged at `:57`); Mermaid setup-sequence + descriptive link-list house style.
- `docs/admin-setup-8021x/01-eap-method-overview.md` — co-equal EAP-method overview; **PEAP-MSCHAPv2 security note + rogue-RADIUS rationale link target** (for the server-validation framing carried from 103 D-12).
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert-delivery **ordering rule (CRITICAL callout at `:37–45` — D-07 LINK target)**, EKU = Client Authentication, RADIUS server-name validation, per-platform cert matrix (incl. iOS-wired PKCS gap), **canonical scope callout** (target of the one-line scope banner, D-06 from Phase 101).
- `docs/_glossary-network.md` — 802.1X/EAP/RADIUS/supplicant/SCEP/PKCS/server-name-validation terms; `#server-name-validation` anchor is a server-validation-framing link target.

### Research (HIGH confidence — guide content is research-sourced)
- `.planning/research/SUMMARY.md` §"Phase 104 — iOS/iPadOS Wi-Fi + Wired Admin-Setup" (~l.225–230); iOS profile facts (~l.30 Wi-Fi MAC-randomization control iOS 14+; ~l.37 wired GA M-series iPad + USB Ethernet + PKCS-not-supported/SCEP-only; ~l.42–45 cert-type support; ~l.77–78 MAC-randomization differentiator; ~l.135 cert-SAN port-warning context; ~l.180 auth-mode NOT exposed); Per-Platform Coverage-Reality Matrix (~l.151–180, iOS = "Full guide", MAC randomization "Disable-able in Wi-Fi profile iOS 14+ — required for NAC"); **Research Q4** (~l.333–334, iOS wired depth resolution → full-peer + use-case paragraph).
- `.planning/research/STACK.md` — iOS Wi-Fi/wired profile building blocks: Templates > Wi-Fi (~l.22) + Templates > Wired network (~l.36); wired GA status (~l.40); per-EAP support matrices (~l.46, ~l.59); iOS Wi-Fi/wired EAP-TLS cert (~l.109–117, PKCS NOT supported wired ~l.116); "Certificate server names" + "Root certificate for server validation" on both connections (~l.147–148); **inner-auth options Building Block 8 (~l.166 Wi-Fi TTLS = 4 methods; ~l.167 wired TTLS NOT explicitly documented — D-12 hedge)**; cert-profile support (~l.181–182, wired SCEP only); **MAC-randomization detail (~l.223–226 — note the contradictory alternative phrasing flagged in D-04)**; M-series iPad use case (~l.231); iOS difficulty/notes (~l.320); iOS wired cert SCEP-only (~l.336); sources (~l.346–347, Apple Wi-Fi + wired settings reference pages).
- `.planning/research/PITFALLS.md` — **B-05** iOS PEAP inner auth MUST be MS-CHAPv2 (~l.272–288 + Section F ~l.582 "'What breaks' callout" — basis for D-10/D-11/D-12), **E-07** iOS `.mobileconfig` payload confusion / three-separate-profiles model (~l.554–562 + Section F ~l.598 "documentation model" — basis for D-05/D-06/D-07), **A-04** server-cert trust / silent-fail on iOS (~l.82, ~l.93), **A-05** disabling server validation = security violation on iOS/macOS (~l.107), **A-01** cert-delivery ordering (~l.129–135), identity-privacy/outer-identity (~l.444), per-platform symptom/diagnostic map (~l.460 iOS row). **Callout-prescription table Section F (~l.568–599) — the authority for D-02/D-05 (MAC randomization + three-profiles get NO callout) vs D-10 (B-05 gets a callout).**
- `.planning/research/ARCHITECTURE.md` — file layout; confirms `05-ios.md` as the single deliverable file + the shared-vs-per-platform link-not-copy boundary.

### Live-verified fact (Referee, 2026-06-30)
- Microsoft Learn — Wi-Fi settings for Apple devices, iOS/iPadOS pivot (`https://learn.microsoft.com/en-us/intune/intune-service/configuration/wifi-settings-ios`; reference page `ref-wifi-settings-apple`): confirms the **"Disable MAC address randomization"** dropdown (Not configured / **Yes** = forces actual Wi-Fi MAC for NAC / No), iOS/iPadOS 14.0+. **Validates D-01, D-03, D-04.** (Plan-time: re-confirm exact label if the doc has drifted past the 2026-06-30 check.)

### House-style precedent
- `docs/admin-setup-macos/03-configuration-profiles.md` — feature/connection-first guide structure + `#### In Intune admin center` compact subsections (the A3 precedent; also cited by Phases 102/103). iOS shares the Apple-platform Intune profile UX vocabulary.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase-103 deliverable (`04-macos.md`)**: the **nearest** structural template to clone — full-peer wired matrix (`:124–137`, the D-08 model), per-EAP Inner-method row (`:75`), SCEP-only wired callout pattern, server-validation security framing, front-matter freshness-stamp block, See-Also / Change-History footer. **Strip the macOS-only deployment-channel mechanics** (no iOS equivalent).
- **Phase-102 deliverable (`03-windows.md`)**: the original A3 execution — section order, `### In Intune admin center` subsections, single Common-Mechanics home for server validation. **Strip Windows-only dot3svc/TEAP/KB5014754.**
- **Foundation files (`00`/`01`/`02`)**: provide the EAP-comparison + cert-asymmetry matrix patterns to clone for the per-EAP config matrices, the canonical scope callout (one-line banner target), the `02-` cert-ordering CRITICAL callout (D-07 LINK target), and the `01-` PEAP-MSCHAPv2 security note (server-validation-framing link target).
- **`docs/admin-setup-macos/` (00–11)**: Apple-platform house-style precedent for connection/feature-first structure, `> **Label:**` blockquote callout convention, Intune-admin-center step formatting.

### Established Patterns
- **link-not-copy** — home shared concepts once / link to `01-`/`02-`; server-name once in Common Mechanics (carry 103 D-05); cert-ordering linked not restated (D-07); rogue-RADIUS rationale + server-validation theory linked (carry 103 D-12).
- **navigation-last** — capability-matrix rows + global nav-hub are **Phase 109**, not 104. Only the local `00-overview.md` item-5 entry is in scope.
- **co-equal EAP** — no "recommended default" method; the per-EAP-method matrix (D-12) enforces this by construction; D-12 differentiates inner-auth **factually, not preferentially**.
- **Freshness stamps** — file front-matter 90-day (`last_verified` + 90 = `review_by`). The **iOS-14+ MAC-randomization note carries its own freshness stamp** (D-02 / E-03; version-gated drift-prone fact).
- **Anchor slugs** — plain GitHub auto-slugs, no `{#id}` overrides; double-hyphen trap.
- **Callout discipline** — research is precise about which pitfalls earn `> **Label:**` blockquotes. For iOS the **only** research-prescribed callout-class items are the **B-05 PEAP "What breaks" WARNING (D-10)** and the **wired SCEP-only callout (carried from 103 D-06)**. MAC randomization (D-02) and the three-profiles model (D-05) are **structural/prose**, NOT callouts. There is **no DANGER callout** and **no macOS-style deployment-channel WARNING**.

### Integration Points
- `docs/admin-setup-8021x/05-ios.md` — new file (does not exist yet).
- `docs/admin-setup-8021x/00-overview.md` — **edited** to add the iOS platform-list entry (item 5) + Mermaid/link wiring, and narrow the placeholder range from "5–7" to "6–7"; pre-existing file → edit must be harness-allowlisted (same pattern as Phase 103's item-4 edit and Phase 102's item-3 edit).

</code_context>

<specifics>
## Specific Ideas

- **MAC randomization** is the signature iOS gotcha — but a **plain prominent prose note in the Wi-Fi subsection**, freshness-stamped (iOS 14+), leading with "Disable MAC address randomization: Yes" (D-01/D-02/D-04). NOT a callout. State that wired is unaffected (uses the physical USB-Ethernet MAC, D-03).
- **Three separate Intune profiles** (trusted root + SCEP/PKCS client cert + Wi-Fi/Wired) — stated in **prose in Common Mechanics**; link the cert-ordering rule to `02-`; explicitly exclude combined `.mobileconfig` / Apple Configurator (D-05/D-06/D-07).
- **M-series iPad wired** = full-peer matrix (clone macOS) **plus** an early "When to use this" use-case paragraph (USB Ethernet, multi-iPad shared-use) (D-08/D-09).
- **PEAP inner-auth = MS-CHAPv2** on iOS (PAP fails, unlike Windows/macOS) — **standalone "What breaks" WARNING callout in the Wi-Fi PEAP context** (D-10/D-11), with the matrix Inner-method row carrying it in both connection subsections.
- **Per-EAP Inner-method row differentiates**: EAP-TLS = n/a; PEAP = MS-CHAPv2; EAP-TTLS Wi-Fi = PAP/CHAP/MS-CHAP/MS-CHAPv2 — but the **iOS wired TTLS cell is hedged** (not documented like macOS; STACK ~l.167) (D-12).
- **Carried from 103 (apply verbatim to iOS):** no-auth-mode-selector note (iOS authenticates as current context only); server-name field + server-validation = security-requirement framing (disabling = security violation on iOS); wired SCEP-only / PKCS-not-supported callout.

</specifics>

<deferred>
## Deferred Ideas

- **macOS-only deployment-channel (User/Device keychain) mechanics** — Phase 103; no iOS equivalent. Do NOT clone into `05-ios.md`.
- **Windows-only DANGER callout / dot3svc / enforcement-staging / TEAP / KB5014754** — Phase 102; no iOS equivalent.
- **Android/Linux gap-stub guides** (`06-`, `07-`) — Phases 105–106; the A3 template degrades (Wired subsection collapses to a gap stub). Android adds UPN-in-SAN + version-gated RADIUS; Linux is a shell-script/nmcli workaround.
- **Capability-matrix 802.1X rows + global nav-hub wiring** — Phase 109 (navigation-last). Not Phase 104.
- **L1/L2 runbooks + decision tree** (iOS log sources = Intune portal + device Settings; RADIUS rejects; server-trust failures; EAP negotiation) — Phases 107–108. The iOS diagnostic row (PITFALLS ~l.460) feeds these, not this guide.
- **iOS/iPadOS ABM "Assign Device Management" + Deadline migration** — Phase 110 (Pillar C), separate milestone surface; needs plan-time research on current iOS 26 ABM UI path.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 104-ios-ipados-802-1x-admin-setup-wi-fi-wired*
*Context gathered: 2026-06-30*
