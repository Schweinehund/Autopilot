# Phase 108: L2 Runbooks #31-33 + Decision Tree #10 - Context

**Gathered:** 2026-06-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the corpus's **first cross-platform L2 investigation runbooks** — the deep-dive counterpart to Phase 107's cross-platform L1 triage runbooks — satisfying **DOT1X-10**. Every existing L2 runbook (#01-30) is single-platform; Phase 108 delivers three new runbooks that each span all five platforms (Windows / macOS / iOS / Android / Linux) via a per-platform diagnostic-signal map:

- `docs/l2-runbooks/31-8021x-log-collection.md` — **#31 802.1X log collection**: per-platform log sources (Windows Event Viewer WLAN-AutoConfig/Dot3Svc channels, macOS Console.app/wifi.log, iOS Intune portal, Android `adb logcat` 802.1X filters, Linux `journalctl` wpa_supplicant); serves as the **shared prerequisite for #32 and #33**. [SC1]
- `docs/l2-runbooks/32-8021x-cert-investigation.md` — **#32 certificate-chain investigation**: validate the cert chain, check SCEP profile deployment status per platform, identify EKU / SAN / expiry issues. [SC2]
- `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` — **#33 RADIUS/EAP investigation**: what to request from the RADIUS/NPS team (NOT NPS config steps), diagnose EAP-method mismatch and server-name-validation failures per platform. [SC3]

Exact filenames above are Claude's-discretion suggestions honoring the corpus `NN-{topic}.md` L2 style (cross-platform → no platform prefix, `8021x-` topic prefix mirroring the P107 L1 runbooks) — finalize at plan time. **L2 = deep collect + INTERPRET** (contrast L1's read-only "name-the-signal" boundary from P107 D-05).

**Also in scope — Decision Tree #10 L2-link wiring:** wire the live L2 escalation links (#31/#32/#33) into `docs/decision-trees/10-8021x-triage.md` once #31-33 are committed. The tree was authored in Phase 107 (P107 D-04) and already carries a self-note that these links "will be wired in Phase 108" (`docs/decision-trees/10-8021x-triage.md:77`). This is navigation-last-compliant because the targets are born and committed within this phase before the links commit.

**In scope:** the 3 cross-platform L2 runbook files (#31/#32/#33); compound multi-platform L2 frontmatter; the hybrid internal structure (shared investigation-flow prose + per-platform deep-dive subsections); L2-depth per-platform commands + interpretation; the RADIUS-team **request checklist** (ask-side only) plus per-platform EAP-mismatch + server-name-validation diagnosis subsections in #33; link-not-copy into `01-`/`02-` foundation + `_glossary-network.md` for cert-ordering/EKU/server-name-validation/EAP theory and into the existing per-platform L2 log-collection runbooks (#01/#10/#14/#18/#24) for the general diagnostic-package step; wiring the decision-tree #10 live L2 links after #31-33 commit.

**Out of scope (deferred to owning phases / out of milestone):**
- **All global navigation wiring** — capability-matrix Network-Authentication rows and the six nav hubs (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `l1-runbooks/00-index.md`, `l2-runbooks/00-index.md`) → **Phase 109 (navigation-last)** (DOT1X-11). Note: the decision **tree** is NOT in Phase 109's six-hub list (`ROADMAP.md:257`), which is why its L2 links belong to Phase 108.
- **Restating foundation theory** — cert-delivery ordering rule, EKU, server-name-validation concept, EAP-method comparison — already homed in `01-`/`02-`/`_glossary-network.md`; runbooks LINK, never restate (link-not-copy).
- **Restating the general device diagnostic-package collection** — already homed in #01/#10/#14/#18/#24; #31 LINKS it and self-contains only the net-new 802.1X-specific signal/filter set.
- **RADIUS/NPS server config, NPS policy build-out, PKI/CA build-out, switch/AP port config** — out of milestone scope entirely (Intune client-side only). #33 documents the *request to the RADIUS team*, never NPS configuration.
- **Refreshing past-due link targets** — #01 (`review_by: 2026-06-19`) and #24 (`review_by: 2026-06-26`) are past-due as of 2026-06-30; linking to them is valid, refreshing them is out of Phase 108 scope (planner: be aware).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a **three-agent adversarial review (Finder → Adversary → Referee, Opus)** per the user's standing instruction. The **Finder scored 55** across four ref-anchored picks (all HIGH); the **Adversary mounted ZERO overturns and ZERO confidence downgrades** (banking 0 rather than risk a wrongful −2x overturn), verifying every Finder anchor with zero line drift; the **Referee independently re-verified all load-bearing anchors against the live files, confirmed exact ROADMAP line numbers, and agreed on all four with no changes.** Unanimous convergence. See `108-DISCUSSION-LOG.md` for the full scored reasoning. No locked pick violates a hard constraint (link-not-copy, navigation-last, callout vocabulary, co-equal-EAP, Intune-client-side-only, anchor-slug discipline, freshness stamps).

### Area 1 — Runbook internal structure & L2 depth (the load-bearing decision)
**D-01 — Structure = C (hybrid): shared investigation-flow prose + per-platform deep-dive SUBSECTIONS** (HIGH)
- The per-platform axis is **triple-mandated**: `ROADMAP.md:242` (SC1: "documents the **per-platform log sources** …"), `:243` (SC2: SCEP status "**per platform**"), `:244` (SC3: "EAP method mismatch and server-name validation failures **per platform**"), all anchored to the Goal's "**per-platform diagnostic-signal map**" (`:237`). A shared *map/methodology* (prose) with *per-platform leaves* (subsections) is the hybrid shape verbatim. **Rejected B** (shared prose + compact per-platform TABLE — the P107 L1 "1C" pattern): the L1 table was calibrated for read-only "name the signal" depth (`107-CONTEXT.md:35,50`); L2 is deep collect + INTERPRET and a table cell cannot hold multi-step command sequences plus interpretation. **Rejected pure A** (5 parallel per-platform subsections with no shared flow): 5×-restates the genuinely shared investigation methodology (platform-agnostic cert-chain logic in #32, the shared RADIUS-team ask in #33), creating link-not-copy pressure — the L2 analog of the case D-01 rejected at L1 (`107-CONTEXT.md:36`).
- **Precedent (acknowledged as a weak analog):** every multi-method L2 runbook already uses this hybrid shape — `24-linux-log-collection.md` (shared Tool-Landscape/Decision-Matrix prose → deep numbered per-method Sections), `14-ios-log-collection.md`, `27-macos-sso-investigation.md:13-24` (shared Context + routing → deep Track A/B). **Caveat:** these precedent files are all *single-platform* (they diverge by method/failure-class, not by platform), so precedent alone is weak — but the three literal SC "per platform" clauses independently force the per-platform axis, so the pick does not rest on the precedent.

### Area 2 — #31 vs the five existing per-platform L2 log-collection runbooks
**D-02 — #31 = C (hybrid): LINK the general diagnostic-package step to #01/#10/#14/#18/#24; SELF-CONTAIN the net-new 802.1X-specific signal/filter set** (HIGH)
- **Verified load-bearing fact:** the 802.1X sources SC1 names (`ROADMAP.md:242`: WLAN-AutoConfig/Dot3Svc channels, `wpa_supplicant` filters, 802.1X `adb logcat` filters) are **net-new — none of the five existing runbooks contain them** (spot-checked: #01 covers only MDM/AAD/provisioning event logs; #24 targets `intune-agent`/`microsoft-identity-broker`, not `wpa_supplicant`; #14 has no 802.1X surface). So the 802.1X set has nowhere to link and **must be self-contained**; the general device diagnostic package IS homed in the five and **must be linked** (link-not-copy). That split = C. **Rejected B** (fully self-contained): would restate the mdmdiagnosticstool cab / IntuneMacODC zip / iOS/Android/Linux general collection already homed elsewhere — **violates the link-not-copy hard constraint** (`01-log-collection.md:19`, `18-android-log-collection.md:81`, `02-cert-delivery-foundation.md:119`, `00-index.md:17`). **Rejected A** (link + "adds only" overlay framing): correct on the link side but understates SC1's "**serves as the prerequisite for #32 and #33**" clause — #31 must stand as a complete self-contained 802.1X entry point; A-vs-C is near-identical in behavior but C states both obligations explicitly.

### Area 3 — Decision-tree #10 L2-link wiring seam
**D-03 — Tree wiring = A: Phase 108 wires the live L2 links (#31/#32/#33) into `10-8021x-triage.md` once those files are committed** (HIGH)
- **Doubly anchored:** the locked predecessor decision **D-04** (`107-CONTEXT.md:46`: "Phase 108 **only wires the tree's L2-escalation leaves once #31-33 exist**") + the tree's **own committed self-note** (`docs/decision-trees/10-8021x-triage.md:77`: "Live links to L2 Log Collection #31 and L2 investigation runbooks #32 and #33 **will be wired in Phase 108**"). Navigation-last (`ROADMAP.md:259`) is an **ordering** rule ("committed after the content files they reference are confirmed committed"), NOT a phase-assignment rule — within Phase 108, #31-33 commit first, then the tree links, fully compliant. Phase 109's six-hub nav list (`ROADMAP.md:257`) **does not include the decision tree**, so the tree's internal L2 links are not Phase 109's scope. **Rejected B** (defer tree links to Phase 109): contradicts both explicit anchors and forces a wasteful **double-touch** (edit the tree in P108 to fix the stale note, then again in P109 to add links). The P107 D-06/D-08 nav defers applied only because targets did not yet exist in Phase 107 — that condition is resolved in Phase 108.
- **Executor ordering constraint:** the tree-link-wiring commit MUST come after the #31-33 file commits within this phase (navigation-last within-phase).

### Area 4 — #33 RADIUS/EAP framing
**D-04 — #33 framing = C (hybrid): RADIUS-team request checklist + per-platform EAP-method-mismatch + per-platform server-name-validation diagnosis subsections** (HIGH)
- **Anchor:** SC3 (`ROADMAP.md:244`) is a literal **three-clause enumeration** — "documents what information to request from the RADIUS/NPS team (**not NPS configuration steps**) **and how to diagnose EAP method mismatch** **and server-name validation failures per platform**." Option C maps 1:1: (1) request checklist, (2) per-platform EAP-mismatch subsections, (3) per-platform server-name-validation subsections. **Rejected A** (checklist only): drops SC3 clauses 2 and 3 — under-delivers the success criterion. **Rejected B** (prose narrative): buries the actionable inter-team ask behind prose (a checklist is the natural scannable form) and forgoes the per-platform subsection depth SC3's "per platform" + D-01 require.
- **Diagnosis halves link foundation (link-not-copy):** server-name-validation diagnosis links `02-cert-delivery-foundation.md:98-106` (RADIUS server-name-validation field); EAP-mismatch diagnosis links `01-eap-method-overview.md:121,129` (inner method must match RADIUS policy). Co-equal-EAP preserved — EAP-mismatch diagnosis matches the client profile to the RADIUS policy, it does not rank methods (`01-eap-method-overview.md:17`).
- **Planner guardrail:** the "request checklist" must stay on the *ask-the-NPS-team* side and never drift into documenting NPS configuration (SC3:244 parenthetical + `REQUIREMENTS.md:80` Out-of-Scope). Client-side server-name/trusted-root validation IS in scope (`REQUIREMENTS.md:80`).

### Claude's Discretion
- Exact runbook filenames (suggested `31-8021x-log-collection.md` / `32-8021x-cert-investigation.md` / `33-8021x-radius-eap-investigation.md`), prose, section ordering, callout phrasing/labels — within the hybrid structure (D-01), the link/self-contain split (D-02), and the SC3 three-part shape (D-04), and holding corpus conventions (`> **Label:**` blockquote callouts; NOTE/WARNING/DANGER/CRITICAL vocabulary only — no `IMPORTANT`; front-matter 90-day freshness stamps; plain-GitHub auto-slug anchors, no `{#id}` overrides; double-hyphen trap).
- Exact shape of the shared investigation-flow prose vs where per-platform subsections begin in each runbook, and the exact per-platform command sequences (subject to the "log filters verified at plan time" mandate — see canonical refs).
- Exact node-label wording of the tree's newly-live L2 links and whether #31 is surfaced as a shared prerequisite banner vs inline (provided the routing map from P107 D-07 holds: #38→#32; #39/#41→#33; #40→#33 primary + #32 cross-ref; #31 = shared prerequisite).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

> **Line-number note:** the current `ROADMAP.md` has drifted from earlier phase refs — Phase 108 title is at `:235`, SC1/SC2/SC3 at `:242`/`:243`/`:244`, Goal at `:237`, Phase 109 nav-hub list at `:257`, navigation-last invariant at `:259` (verified by all three review agents, 2026-06-30). The `107-CONTEXT.md` internal ROADMAP line refs (`:213`,`:226-228`,`:241`,`:243`) are stale by ~30 lines but its *textual* decisions (D-01/D-04/D-06/D-08) are intact.

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 108" (`:235`,`:237`,`:242-244`) — Goal (`:237`: three cross-platform L2 runbooks anchored to a per-platform diagnostic-signal map), **SC1** (`:242`: #31 log collection = named per-platform sources + prerequisite for #32/#33), **SC2** (`:243`: #32 cert-chain / SCEP status per platform / EKU-SAN-expiry), **SC3** (`:244`: #33 = request-to-RADIUS-team [not NPS config] + per-platform EAP-mismatch + server-name-validation diagnosis).
- `.planning/ROADMAP.md` §"Phase 109" (`:257`,`:259`) — **navigation-last invariant** (`:259`, ordering rule) and the **six nav hubs** (`:257`: `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `l1-runbooks/00-index.md`, `l2-runbooks/00-index.md`) deferred to Phase 109. **The decision tree `10-8021x-triage.md` is NOT in this list** → its L2 links are a Phase-108 deliverable (D-03).
- `.planning/REQUIREMENTS.md` — **DOT1X-10** (L2 #31-33 + per-platform diagnostic-signal map, **"log filters verified at plan time"**); **DOT1X-11** (nav-last hubs); **Out-of-Scope table** (`:80`: RADIUS/NPS server-side build-out out of scope; "Intune **client-side** config only"; "Client-side server-name/trusted-root validation IS in scope") — the D-04 guardrail.

### Predecessor decisions (Phase 107 L1 — direct parent)
- `.planning/phases/107-l1-runbooks-38-41-802-1x-triage/107-CONTEXT.md` — **D-04** (`:46`: "Phase 108 only wires the tree's L2-escalation leaves once #31-33 exist") = the D-03 anchor; **D-01** (`:35-36`: L1 "1C" structure + why pure per-platform-subsections was rejected at L1) = D-01 contrast; **D-05** (`:49-59`: the L1 read-only "name-the-signal" depth boundary — L2 crosses it into collect+interpret); **D-07** (`:65-66`: symptom→L2 routing map #38→#32, #39/#41→#33, #40→#33+#32, #31=prerequisite) = the tree-link targets; **D-06/D-08** (`:62-69`: navigation-last, deferred nav to P109); callout/anchor/freshness conventions census.

### L2 runbook house style (clone structure)
- `docs/l2-runbooks/27-macos-sso-investigation.md` — the deep single-platform L2 investigation template: shared Context + "Before starting: collect a package per [Log Collection Guide]" link (`:17`) + "From L1 escalation?" routing prose (`:13-24`) → deep Track A/B subsections. The D-01 hybrid-shape precedent (weak analog: single-platform, diverges by failure-class not platform). **Nit (do NOT act on):** `:51` uses an out-of-vocab `> **Important:**` callout — pre-existing Phase-80-era corpus nit, out of Phase 108 scope.
- `docs/l2-runbooks/01-log-collection.md` — the "gather everything first" prerequisite pattern + the universal link-not-copy opener (`:19`: "All other L2 runbooks open with: 'Before starting: collect a diagnostic package per [Log Collection Guide]…'"). Covers only MDM/AAD/provisioning logs — **no 802.1X signals** (the D-02 net-new fact). `review_by: 2026-06-19` (past-due; link valid, refresh out of scope).
- `docs/l2-runbooks/{10-macos,14-ios,18-android,24-linux}-log-collection.md` — the four other per-platform L2 log-collection runbooks #31 LINKS for the general package (D-02). `24-linux:81`-style "reference, don't duplicate"; #18-android:81 "Do NOT duplicate admin-setup content here — reference it." #24 `review_by: 2026-06-26` (past-due; link valid, refresh out of scope). Verified: none contain the 802.1X-specific signal set.
- `docs/l2-runbooks/00-index.md` — L2 numbering + platform-grouped section structure; the link-not-copy opener convention (`:17`). **Edited in Phase 109, NOT here** (it is one of the six deferred hubs).

### Decision tree (wire live L2 links after #31-33 commit)
- `docs/decision-trees/10-8021x-triage.md` — authored in Phase 107; the L2-escalation leaf (`:35`,`:77`) currently carries the prose note "(Live links … will be wired in Phase 108.)". Phase 108 replaces that forward-ref with live links to #31/#32/#33 once those files are committed (D-03). Honor the Mermaid house style already in the file (Legend, `classDef`, `click` directives, Escalation-Data + Routing-Verification tables).

### Foundation (link targets — runbooks LINK, never restate)
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert-delivery ordering rule (CRITICAL callout), EKU = Client Authentication, **server-name validation** (`:98-106`, "RADIUS Server-Name Validation" / "Always populate the 'Certificate server names' field") — link target for #32 (SCEP/EKU/SAN) and #33's server-name-validation diagnosis; per-platform link-not-copy directive (`:119`).
- `docs/admin-setup-8021x/01-eap-method-overview.md` — co-equal EAP-method overview (`:17`: "co-equal paths. No method is ranked or recommended as a default"); inner-method-must-match-RADIUS-policy (`:121`,`:129`) — link target for #33's EAP-mismatch diagnosis.
- `docs/_glossary-network.md` — 802.1X / EAP / EAPOL / RADIUS / supplicant / server-name-validation term anchors (link target for all three runbooks).

### Live-verify at plan time (DOT1X-10 "verified at plan time")
- **Exact per-platform diagnostic-signal / log-filter strings** — Windows Event Viewer channel names (WLAN-AutoConfig / Dot3Svc), the macOS Console.app/`wifi.log` predicate + any read-only command, the Linux `journalctl` wpa_supplicant/NetworkManager filter, the Android `adb logcat` 802.1X filter, and the iOS Intune-portal signal path. These drive the D-01 per-platform subsections and must be **literal-verified against current Microsoft Learn + platform supplicant docs at plan time**, not paraphrased from memory (mandated by DOT1X-10).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`docs/l2-runbooks/27-macos-sso-investigation.md`** — nearest structural template: clone the shared-Context + "Before starting" prerequisite link + "From L1 escalation?" routing prose → deep subsection skeleton (adapt Track A/B → per-platform subsections).
- **`docs/l2-runbooks/{01,10,14,18,24}-*log-collection.md`** — link targets for #31's general diagnostic-package step (D-02 link-not-copy). Do NOT restate their collection procedures.
- **`docs/l2-runbooks/24-linux-log-collection.md` / `14-ios-log-collection.md`** — clone the shared-overview-prose → deep-numbered-Sections hybrid rhythm (D-01), stripping the single-platform assumption.
- **Foundation `01-`/`02-`/`_glossary-network.md`** — link targets for cert-ordering, EKU, SAN, server-name-validation, EAP theory (link-not-copy).
- **`docs/decision-trees/10-8021x-triage.md`** — existing Mermaid scaffold; Phase 108 only swaps its forward-ref note for live L2 links.

### Established Patterns
- **Hybrid structure** (D-01) — shared investigation-flow prose + per-platform deep-dive subsections; three SC "per platform" clauses force the axis.
- **Link-not-copy** (D-02) — link the general package + foundation theory; self-contain only the net-new 802.1X-specific set.
- **L2 = collect + interpret** — crosses the L1 read-only boundary (P107 D-05); real per-platform commands with interpretation guidance.
- **Navigation-last within-phase** (D-03) — tree-link-wiring commit ordered after #31-33 commits.
- **RADIUS request-checklist, ask-side only** (D-04) — never NPS config.
- **Callout vocabulary** — NOTE/WARNING/DANGER/CRITICAL only; **Freshness stamps** — front-matter 90-day (`last_verified` + 90 = `review_by`); **Anchor slugs** — plain GitHub auto-slugs, no `{#id}`, double-hyphen trap; **Compound multi-platform frontmatter** — extend the `+`-joined token (P107 D-02 precedent) + `audience: L2`.

### Integration Points
- `docs/l2-runbooks/31-…md` … `33-…md` — **new files** (do not exist yet; L2 index currently ends at #30).
- `docs/decision-trees/10-8021x-triage.md` — **edited** (forward-ref note → live L2 links, after #31-33 commit).
- `docs/l2-runbooks/00-index.md` — **NOT edited in Phase 108** (deferred to Phase 109, one of the six nav hubs).

</code_context>

<specifics>
## Specific Ideas

- **Three cross-platform L2 runbooks, hybrid structure** (D-01): shared investigation-flow prose → per-platform deep-dive subsections carrying real commands + interpretation. #31 log collection (prerequisite), #32 cert-chain investigation, #33 RADIUS/EAP investigation.
- **#31 links the general diagnostic package, self-contains the net-new 802.1X signal set** (D-02) — the named sources (WLAN-AutoConfig/Dot3Svc, wpa_supplicant, 802.1X adb logcat) exist nowhere else in the corpus.
- **Decision tree #10 gets its live L2 links in Phase 108** (D-03), commit-ordered after #31-33 — honoring the tree's own "will be wired in Phase 108" note and P107 D-04.
- **#33 = RADIUS-team request checklist + per-platform EAP-mismatch + server-name-validation diagnosis subsections** (D-04), strictly ask-side (no NPS config).
- **Per-platform log-filter strings are live-verified at plan time** (DOT1X-10) — the researcher/planner's job, not paraphrased here.
- **L1→L2 routing map carried from P107 D-07**: #38→#32; #39/#41→#33; #40→#33 primary + #32 cross-ref; #31 = shared prerequisite for all.

</specifics>

<deferred>
## Deferred Ideas

- **All global navigation wiring** — capability-matrix Network-Authentication rows + the six nav hubs (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `l1-runbooks/00-index.md`, `l2-runbooks/00-index.md`) → **Phase 109 (navigation-last)** (DOT1X-11). (The decision **tree** is the one exception wired in Phase 108 — D-03.)
- **Foundation theory restatement** — cert-ordering, EKU, SAN, server-name-validation, EAP comparison → already homed in `01-`/`02-`/`_glossary-network.md`; link, never restate.
- **General device diagnostic-package collection restatement** — homed in #01/#10/#14/#18/#24; #31 links it (D-02).
- **RADIUS/NPS server config, NPS policy / PKI/CA build-out, switch/AP port config** — out of milestone scope entirely; #33 documents the request to the RADIUS team only.
- **Refreshing past-due link targets** — #01 (`review_by: 2026-06-19`) and #24 (`review_by: 2026-06-26`) freshness refresh → out of Phase 108 scope (linking to them remains valid).
- **Pre-existing corpus nit** — `27-macos-sso-investigation.md:51` out-of-vocab `> **Important:**` callout (Phase-80-era) → not a Phase 108 deliverable; capture for a future corpus-nit sweep.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 108-l2-runbooks-31-33-decision-tree-10*
*Context gathered: 2026-06-30*
