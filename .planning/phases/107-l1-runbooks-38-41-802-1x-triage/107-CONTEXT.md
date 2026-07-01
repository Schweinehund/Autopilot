# Phase 107: L1 Runbooks #38-41 (802.1X Triage) - Context

**Gathered:** 2026-06-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the **first fully cross-platform, symptom-primary L1 triage runbooks** in the corpus — four new 802.1X connection-failure runbooks plus a new routing decision tree — satisfying **DOT1X-09**. Every existing L1 runbook (#1-37) is single-platform; only #34 spans a partial set (apple-business, `platform: ios+macos+shared-ipad`). Phase 107 delivers:

- `docs/l1-runbooks/38-8021x-certificate-failure.md` — **#38 certificate failure** (verify cert-profile status in Intune, check the deployment-ordering constraint, identify the per-platform diagnostic signal). [SC1]
- `docs/l1-runbooks/39-8021x-radius-reject.md` — **#39 RADIUS reject**. [SC2]
- `docs/l1-runbooks/40-8021x-server-trust-failure.md` — **#40 server-trust / validation failure**. [SC2]
- `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` — **#41 EAP negotiation failure**. [SC2]
- `docs/decision-trees/10-8021x-triage.md` — **new decision tree**, symptom-primary root routing L1 to the correct runbook with per-platform leaves. [SC3]

Each runbook is symptom-primary and spans all five platforms (Windows / macOS / iOS / Android / Linux) via per-platform diagnostic leaves. L1 = **read-only triage + escalation only**; deep diagnostics (log collection, cert-chain investigation, RADIUS/EAP diagnosis) are **Phase 108 L2 #31-33** (DOT1X-10). Exact filenames above are Claude's-discretion suggestions honoring the corpus `NN-platform-symptom.md` style (here `NN-8021x-symptom.md`, no platform prefix because cross-platform) — finalize at plan time.

**In scope:** the 4 symptom-based L1 runbook files + the `10-8021x-triage.md` decision tree; compound multi-platform L1 frontmatter; the 1C internal structure (shared symptom + shared first-checks + compact per-platform diagnostic-signal table + per-platform escalation-divergence notes); the calibrated per-platform L1 depth rule (name-the-signal baseline; one user-run read-only command only where feasible); prose-only forward-references to L2 #31-33 with the symptom→L2 routing map baked in; link-not-copy into the `01-`/`02-` foundation for cert-ordering/EKU/server-name-validation theory.

**Out of scope (deferred to owning phases):**
- **L2 investigation runbooks #31-33** (log collection / cert-chain / RADIUS-EAP) + the verified per-platform log-filter strings → **Phase 108** (DOT1X-10).
- **All live navigation wiring** — the `docs/l1-runbooks/00-index.md` 802.1X section, capability-matrix Network-Authentication rows, and global nav-hub entries (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`) → **Phase 109 (navigation-last)** (DOT1X-11).
- **Restating foundation theory** — cert-delivery ordering rule, EKU, server-name-validation, EAP-method comparison, identity-privacy/outer-identity — already homed in `01-`/`02-`; runbooks LINK, never restate (link-not-copy).
- **RADIUS/NPS server config, PKI/CA build-out, switch/AP port config** — out of milestone scope entirely (Intune client-side only).

</domain>

<decisions>
## Implementation Decisions

All seven sub-decisions across four gray areas were resolved via a **three-agent adversarial review (Finder → Adversary → Referee, Opus)** per the user's standing instruction. The **Finder scored 55** across seven ref-anchored picks; the **Adversary confirmed six, mounted exactly ONE overturn (GA3, per-platform depth) and downgraded ONE confidence (GA4.3), with zero wrongful overturns**; the **Referee sided with the Adversary on both contested items** and verified every Finder anchor with **zero line-number drift**. See `107-DISCUSSION-LOG.md` for the full scored reasoning. No locked pick violates a hard constraint (link-not-copy, navigation-last, L1 read-only, node budget, callout vocabulary, co-equal-EAP, anchor-slug discipline).

### Area 1 — Runbook internal structure (the load-bearing decision)
**D-01 — Structure = 1C: shared symptom + shared first-checks → compact per-platform diagnostic-signal table → per-platform escalation-divergence notes** (HIGH)
- The load-bearing anchor is **SC2's literal four-part ordering** (`ROADMAP.md:213`: "each provide a **symptom description, first-check steps, per-platform diagnostic commands, and a clear escalation trigger**") — that enumeration IS the structure spec. **Rejected 1A** (five parallel per-platform subsections): over-splits the shared symptom/first-checks 5× (link-not-copy pressure) and produces very long files across 4 runbooks × 5 platforms. **Rejected 1B** (table-only): drops the symptom-description + first-check *prose narrative* SC2 mandates. **Note (Referee):** the #34 multi-platform runbook is a *weak* structural analog — it diverges by **path** (A/B/C), not by **platform** — so SC2:213's own ordering, not #34, is dispositive.

**D-02 — Frontmatter = compound multi-platform token + L1 stamp block** (HIGH)
- Front-matter: `platform: windows+macos+ios+android+linux` (extend the `+`-joined compound token) + `audience: L1` + `applies_to` + 90-day freshness pair (`last_verified` / `review_by`). **Anchor:** `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md:1-6` — verbatim precedent for a compound (`+`-delimited) multi-platform token on an L1 runbook (`platform: ios+macos+shared-ipad`).

### Area 2 — Decision-tree axis order + the Phase-107/108 seam
**D-03 — Tree axis = 2A: symptom-primary root → 4 branches → runbook; per-platform leaves live INSIDE the runbook** (HIGH)
- **Anchor:** `ROADMAP.md:214` (SC3): "Decision tree `docs/decision-trees/10-8021x-triage.md` **routes L1 by symptom** to the correct runbook **with per-platform leaves**" + Goal (`:207`) "per-platform **symptom** leaves." Symptom-primary root is mandated verbatim → **kills 2C** (platform-primary). Keeping the per-platform leaves inside the runbook (not the tree) keeps the tree at 4 symptom branches, well under the stated **~5-node / "within 2 decision steps" budget** (`09-linux-triage.md:15`,`:55`) → **kills 2B** (up to 20 in-tree leaves blows the budget). Sibling `09-linux-triage.md:30` confirms the flat symptom-primary shape ("What is the user's Linux Intune symptom?"). Honor the Mermaid house style: Legend, `classDef` (resolved/escalateL2/pitfallCallout), `click` directives, and the Routing-Verification table.

**D-04 — The decision tree `10-8021x-triage.md` IS a Phase-107 deliverable** (HIGH — seam resolved)
- "Decision Tree #10" appears in **both** P107 SC3 (`:214`) and the **P108 title** (`:219`, "+ Decision Tree #10"). **Adjudication:** the tree is authored in **Phase 107** — P107 **SC3** makes it a must-be-TRUE, P107 **Goal** (`:207`) names its per-platform symptom leaves, and **DOT1X-09** (`:30`) explicitly ties `10-8021x-triage.md` to the L1 requirement. **None of Phase 108's three SCs (`:226-228`) reference the tree** → the P108 title mention is a **stale label**, not a second owner. Phase 108 only wires the tree's L2-escalation leaves once #31-33 exist.

### Area 3 — L1/L2 depth boundary (per-platform calibrated) — KEY RULING (Adversary overturn)
**D-05 — Depth = per-platform-calibrated: "name the signal" is the baseline everywhere; a user-run read-only command ONLY where genuinely L1-feasible** (HIGH)
- Plain "one user-run read-only command per platform" is **physically impossible on iOS** (no device command exists — `ROADMAP.md:226` lists the iOS source as "iOS Intune portal") and **out-of-L1-scope on Android** (`adb logcat` needs a tethered PC + USB debugging — `REQUIREMENTS.md:31`, `ROADMAP.md:226`). **Anchor:** SC1 (`ROADMAP.md:212`, #38) says L1 must "**identify** the platform-specific event log or **diagnostic signal to examine**" — *signal-identification*, not command-execution. Preserve the **collect-don't-interpret** discipline (`35-macos-sso-sign-in-failure.md:34`: "do **not** attempt to interpret individual field values; collect the complete output"). SC2's "per-platform diagnostic commands" (`:213`) is satisfied where a command genuinely exists; where it doesn't, L1 names the signal / inspects the portal. Deep collection + interpretation is Phase 108 L2 (`ROADMAP.md:226-228`) → **rejected 3B** (over-reach). **Rejected 3C** (name-only, zero commands): under-delivers SC2 on the platforms where a read-only command is feasible.

**Final per-platform L1 depth rule (each runbook's per-platform table cells):**
| Platform | L1 stops at |
|----------|-------------|
| **Windows** | Name the WLAN-AutoConfig / Dot3Svc Event Viewer channel; open + collect output, do NOT interpret. |
| **macOS** | Name the signal + ONE user-runnable read-only command (`app-sso platform -s`-style, per `#35`); collect complete output, do NOT interpret. |
| **iOS** | **Intune-portal inspection only** — NO device command exists (`ROADMAP.md:226` "iOS Intune portal"); L1 reads portal status. |
| **Android** | Name the `adb logcat` 802.1X filter as an **escalation-collected** signal, NOT an L1 user action (tethered PC + USB debugging required); L1 names it, L2/escalation collects it. |
| **Linux** | Name the signal + ONE user-runnable read-only command (`journalctl --user` / `nmcli`, cf. `09-linux-triage.md:74`,`:82`); collect output, do NOT interpret. |

### Area 4 — Forward-references, routing map, index scope
**D-06 — Forward-refs to L2 #31-33 = 4A: prose references now; defer all live links (navigation-last)** (HIGH)
- L2 #31-33 do not exist until Phase 108; live cross-links would commit broken navigation. **Anchor:** `ROADMAP.md:243` (P109 SC4): "All navigation edits are committed **after** the content files they reference are confirmed committed (**navigation-last invariant**)." The corpus live-links to L2 only where the target already exists (`#35:98`→L2 #27; `#34:133`→L2 #26). → **Rejected 4B** (anticipatory relative links — broken-link + filename-drift risk) and **4C** (placeholder/TODO links — zero corpus precedent, commits deliberately-broken artifacts).

**D-07 — Symptom→L2 routing map (baked into runbook prose now)** (HIGH)
- `#38` certificate failure → **L2 #32** (cert-chain investigation). `#39` RADIUS reject → **L2 #33**. `#41` EAP negotiation → **L2 #33**. `#40` server-trust/validation → **L2 #33 primary + #32 cross-ref**. `#31` (log collection) = **shared log-collection prerequisite/entry for all four**. **Anchors:** `ROADMAP.md:228` (P108 SC3) assigns "**server-name validation failures per platform**" to #33 → #40's primary target is #33 (server-name validation is #40's core symptom), with #32 as a legitimate trusted-root-chain cross-ref (`02-cert-delivery-foundation.md:104` "Always reference a Trusted Certificate profile for RADIUS server validation"); `ROADMAP.md:227` (SC2) assigns cert-chain/SCEP/EKU/SAN to #32 → #38→#32; `ROADMAP.md:226` (SC1) "#31 serves as the **prerequisite for #32 and #33**."

**D-08 — `docs/l1-runbooks/00-index.md` 802.1X section = DEFER to Phase 109 (navigation-last), as a CONSCIOUS override** (MEDIUM)
- **Direction anchor:** `ROADMAP.md:241` (P109 SC2) explicitly names "`l1-runbooks/00-index.md`" among the six navigation hubs wired in Phase 109, governed by the navigation-last invariant (`:243`). **Why only MEDIUM (honest calibration, Adversary/Referee):** two independent contrary signals exist — `REQUIREMENTS.md:32` (DOT1X-11) **omits** the runbook indexes from its enumerated nav-hub list (lists only `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`), and `00-index.md:126-128` shows a **4× legacy "index-in-authoring-phase" precedent** (#34 Phase 65, #35/#36 Phase 80, #37 Phase 99). An explicit SC naming the exact file (`:241`) outranks precedent-by-analogy, so **defer stands** — but the planner must make this defer **consciously** and note it overrides the legacy habit, so a future reviewer does not mistake the P107 omission for an oversight.

### Claude's Discretion
- Exact prose, callout phrasing/labels, section ordering within each runbook and the tree — provided the locked decisions and corpus conventions hold (`> **Label:**` blockquote callouts; NOTE/WARNING/DANGER/CRITICAL vocabulary only — no `IMPORTANT`; front-matter 90-day freshness stamps; plain GitHub auto-slug anchors, no `{#id}` overrides; double-hyphen trap).
- Exact runbook filenames (suggested `38-8021x-certificate-failure.md` … `41-8021x-eap-negotiation-failure.md`) and the tree's exact node labels / Mermaid styling — within the 1C structure (D-01), 2A axis (D-03), and per-platform depth rule (D-05).
- The exact set and shape of the per-platform diagnostic-signal table columns (signal / first-check-or-command / escalation), provided it stays L1 read-only and does not restate foundation theory.
- Whether server-trust runbook #40 surfaces its #32 cross-ref inline in the escalation note or in a See-Also — provided #33 is named as primary (D-07).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 107" (`:207–215`) — Goal (`:207` per-platform symptom leaves, routing decision tree, escalation to L2), **SC1** (`:212`: #38 cert failure — verify cert-profile status in Intune, check deployment-ordering constraint, **identify** the platform-specific event log/**diagnostic signal**), **SC2** (`:213`: #39/#40/#41 each = symptom description + first-check steps + per-platform diagnostic commands + clear escalation trigger), **SC3** (`:214`: `10-8021x-triage.md` routes by symptom with per-platform leaves); dependency on Phase 106.
- `.planning/ROADMAP.md` §"Phase 108" (`:219`,`:226–228`) — the L2 owners this phase forward-refs (NOT authored here): **#31** log collection = prerequisite for #32/#33 (`:226`, incl. the per-platform diagnostic-source map: Windows event channels / macOS logs / **iOS Intune portal** / **Android `adb logcat`** / Linux journalctl); **#32** cert-chain investigation (`:227`); **#33** RADIUS/EAP + **server-name validation failures** (`:228`). **Note:** the "+ Decision Tree #10" in the P108 title (`:219`) is a **stale label** — the tree is a Phase-107 deliverable (D-04).
- `.planning/ROADMAP.md` §"Phase 109" (`:241`,`:243`) — **navigation-last invariant** (`:243`) and the six nav hubs (`:241`, incl. `l1-runbooks/00-index.md`) deferred to Phase 109; governs D-06 and D-08.
- `.planning/REQUIREMENTS.md` — **DOT1X-09** (`:30`: L1 runbooks #38-41 routed by `10-8021x-triage.md` with per-platform leaves), **DOT1X-10** (`:31`: L2 #31-33 + per-platform diagnostic-signal map, **"log filters verified at plan time"**), **DOT1X-11** (`:32`: navigation-last hubs — omits the runbook indexes); traceability (`:119`,`:148`: Phase 107 → DOT1X-09, 1 requirement).

### Runbook house style (clone structure; strip single-platform assumptions)
- `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` — the **only** multi-platform runbook: **compound frontmatter** (`:1-6`, `platform: ios+macos+shared-ipad`) — the D-02 precedent; the **L1 read-only scope note** (`:17`: "L1 Triage Steps … are read-only checks; state-changing commands appear ONLY in `### Admin Action Required` sections") — the D-05 boundary. **Caveat:** #34 diverges by *path* (A/B/C), NOT by platform — a weak structural analog for D-01 (SC2:213 is the real anchor).
- `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` — single-platform L1 house style (Prerequisites / Steps / "Say to the user" / Root Cause / **Escalation Criteria** / "Before escalating collect" / Version History); the **collect-don't-interpret** precedent (`:29-34`, `app-sso platform -s`) — the D-05 macOS command model; live-links to L2 only where target exists (`:98`→#27) — the D-06 precedent.
- `docs/l1-runbooks/00-index.md` — runbook numbering + **platform-grouped** section structure; version history (`:126-131`) showing the **4× legacy index-in-authoring-phase** precedent (D-08 contrary signal). **Edited in Phase 109, NOT here.**

### Decision-tree house style (Mermaid)
- `docs/decision-trees/09-linux-triage.md` — the nearest analog: **flat symptom-primary** shape (`:30` "What is the user's Linux Intune symptom?"), Legend + `classDef` (resolved/escalateL2/pitfallCallout) + `click` directives + **Routing-Verification table**; the **node budget** (`:15` "within 2 decision steps", `:55` "5-node budget") — the D-03 constraint; `journalctl`/`nmcli` as L1-surfaced checks (`:74`,`:82`) — the D-05 Linux model.
- `docs/decision-trees/00-initial-triage.md` — the root triage tree (2-axis mode→symptom precedent exists but is overridden here by SC3's explicit symptom-primary wording).

### Phase 101/102 foundation (link targets — runbooks LINK, never restate)
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert-delivery **ordering rule** (CRITICAL callout `:37`), EKU = Client Authentication, **server-name validation** as its own concept (`:98-104`, "Always reference a Trusted Certificate profile for RADIUS server validation") — the D-07 #40→#33/#32 basis; the canonical scope callout. #38's "deployment-ordering constraint" (SC1) LINKS here.
- `docs/admin-setup-8021x/01-eap-method-overview.md` — co-equal EAP-method overview (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS, no default) — link target for #41 EAP-negotiation context.
- `docs/admin-setup-8021x/03-windows.md` — the **dot3svc** detection signal already documented (`:103-118`, `sc query dot3svc` / `Get-Service`) — feeds the D-05 Windows signal (WLAN-AutoConfig / Dot3Svc).
- `docs/_glossary-network.md` — 802.1X / EAP / EAPOL / RADIUS / supplicant / server-name-validation term anchors (link target for all four runbooks + the tree).

### Carried conventions (from Phase 106 CONTEXT)
- `.planning/phases/106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap/106-CONTEXT.md` — **callout vocabulary census** (NOTE / WARNING / DANGER / CRITICAL only; `IMPORTANT` out-of-vocab; CRITICAL/DANGER reserved for auth-break/lockout hazards); link-not-copy; navigation-last; 90-day freshness stamps; plain-GitHub anchor slugs + double-hyphen trap; co-equal-EAP; the adversarial-review gray-area protocol reused here.

### Live-verify at plan time (DOT1X-10 "verified at plan time")
- **Exact per-platform diagnostic-signal strings** — Windows Event Viewer channel names (WLAN-AutoConfig / Dot3Svc), the macOS read-only command string, the Linux `journalctl` wpa_supplicant/NetworkManager filter, and the Android `adb logcat` 802.1X filter (named as escalation-collected). These strings drive D-05's per-platform table and must be **literal-verified against current Microsoft Learn + platform supplicant docs at plan time**, not paraphrased from memory.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`docs/l1-runbooks/34-...md`** — the nearest structural template for compound multi-platform frontmatter (`:1-6`) and the L1 read-only scope note (`:17`). Clone the frontmatter shape (extend the `+` token to 5 platforms); do NOT clone its A/B/C path structure (it diverges by path, not platform).
- **`docs/l1-runbooks/35-...md`** — clone the L1 runbook section skeleton (Prerequisites / Steps / Escalation Criteria / "Before escalating collect" / Version History) and the collect-don't-interpret command pattern.
- **`docs/decision-trees/09-linux-triage.md`** — clone the Mermaid scaffold (Legend, `classDef`, `click` directives, Routing-Verification table, node-budget discipline) for `10-8021x-triage.md`.
- **Foundation `01-`/`02-`/`_glossary-network.md`** — link targets for cert-ordering, EKU, server-name-validation, EAP theory (link-not-copy).

### Established Patterns
- **1C structure** (D-01) — shared symptom + first-checks + compact per-platform diagnostic table + per-platform escalation-divergence; the SC2:213 four-part ordering IS the spec.
- **Symptom-primary tree, leaves-in-runbook** (D-03) — keeps the tree under the 5-node/2-step budget (`09-linux:15`,`:55`).
- **L1 read-only, calibrated per platform** (D-05) — name-the-signal baseline; user-run command only where feasible (macOS/Linux/Windows); iOS=portal; Android=escalation-collected `adb logcat`.
- **Navigation-last** (D-06/D-08) — no live L2 links, no index section in Phase 107; both are Phase 109.
- **Callout vocabulary** — NOTE/WARNING/DANGER/CRITICAL only; CRITICAL/DANGER reserved for hazards.
- **Freshness stamps** — front-matter 90-day (`last_verified` + 90 = `review_by`).
- **Anchor slugs** — plain GitHub auto-slugs, no `{#id}` overrides; double-hyphen trap.

### Integration Points
- `docs/l1-runbooks/38-…md` … `41-…md` — **new files** (do not exist yet).
- `docs/decision-trees/10-8021x-triage.md` — **new file** (do not exist yet); its symptom leaves point at the four new runbooks; L2-escalation leaves reference #31-33 in prose (links wired Phase 108/109).
- `docs/l1-runbooks/00-index.md` — **NOT edited in Phase 107** (802.1X section deferred to Phase 109, D-08).

</code_context>

<specifics>
## Specific Ideas

- **Four runbooks, one symptom each, all five platforms via a per-platform diagnostic-signal table** — #38 cert failure (verify Intune cert-profile status + deployment-ordering constraint + identify signal), #39 RADIUS reject, #40 server-trust/validation, #41 EAP negotiation. Structure 1C (D-01).
- **Compound frontmatter** `platform: windows+macos+ios+android+linux` + `audience: L1` + `applies_to` + 90-day freshness (D-02).
- **Symptom-primary decision tree** `10-8021x-triage.md`: root = "What is the 802.1X symptom?" → 4 branches → the 4 runbooks; per-platform detail lives in the runbook, not the tree (D-03). Tree is authored in Phase 107 (D-04).
- **Per-platform L1 depth is calibrated, not uniform** (D-05): Windows/macOS/Linux get a named signal + one read-only command; iOS = Intune-portal inspection (no device command); Android = `adb logcat` named as escalation-collected. Always collect, never interpret.
- **Escalation is prose-only forward-refs to L2 #31-33** with the routing map baked in (D-06/D-07): #38→#32; #39/#41→#33; #40→#33 primary + #32 cross-ref; #31 = shared log-collection prerequisite. Live links deferred to Phase 108/109.
- **The 00-index.md 802.1X section is a conscious defer to Phase 109** (D-08) — note the override of the 4× legacy in-phase index habit so it doesn't read as an oversight.

</specifics>

<deferred>
## Deferred Ideas

- **L2 investigation runbooks #31-33** (log collection / cert-chain / RADIUS-EAP) + the **verified per-platform log-filter strings** (Windows event channels, macOS logs, Android `adb logcat`, Linux `journalctl` wpa_supplicant/NetworkManager) → **Phase 108** (DOT1X-10, "verified at plan time"). Phase 107 forward-refs these in prose only.
- **All live navigation wiring** — `docs/l1-runbooks/00-index.md` 802.1X section, capability-matrix Network-Authentication rows, and global nav-hub entries (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`) → **Phase 109 (navigation-last)** (DOT1X-11).
- **Foundation theory restatement** — cert-ordering, EKU, server-name-validation, EAP comparison, identity-privacy → already homed in `01-`/`02-`; link, never restate.
- **RADIUS/NPS server config, PKI/CA build-out, switch/AP port config (MAB/VLAN/port-auth)** — out of milestone scope entirely; runbooks triage the Intune client-side + device-supplicant symptom only.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 107-l1-runbooks-38-41-802-1x-triage*
*Context gathered: 2026-06-30*
