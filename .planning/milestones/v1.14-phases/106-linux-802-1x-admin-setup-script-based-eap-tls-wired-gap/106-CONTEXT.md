# Phase 106: Linux 802.1X Admin-Setup (Script-Based EAP-TLS + Wired Gap) - Context

**Gathered:** 2026-06-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the **Linux (Ubuntu LTS)** per-platform 802.1X admin-setup guide — the **fifth and FINAL** of the five per-platform guides (Phases 102–106) that link into the Phase-101 foundation, and the **DEEPEST GAP PLATFORM**. Unlike Android (Phase 105 — native Intune **Wi-Fi**, wired-only gap), Linux has **ZERO native Intune surface**: no Wi-Fi profile type, no wired profile type, and **no certificate-delivery profiles** (no Trusted Root / SCEP / PKCS). The locked **A3 Hybrid** template (Phase 102 D-01) **degrades furthest** — there is no Intune profile path at all; the entire guide documents an **OS-level shell-script + `nmcli` (NetworkManager `802-1x`) EAP-TLS workaround**, with the **platform gap leading the whole guide** (the gap IS Section-F-callout-prescribed here — PITFALLS B-09 — in deliberate contrast to Android's plain-prose wired stub, 105 D-03). Phase 106 delivers:

- `docs/admin-setup-8021x/07-linux.md` — Linux **EAP-TLS-only** 802.1X via documented `nmcli 802-1x.*` connection-parameter steps + a reference parameter table, certificate delivery handled out-of-band, PEAP/EAP-TTLS marked out of scope, satisfying **DOT1X-08**.
- A **local entry** added to the `docs/admin-setup-8021x/00-overview.md` platform-guide list (**item 7** — the overview placeholder currently reads "7. Platform guide (Phase 106)" at `:36`, and the wired-availability note at `:38` already pre-frames Linux as "script-based EAP-TLS only via nmcli"). This phase fills item 7 with the live link and logs the Change-History row.
- The **one-line scope banner** (per Phase 101 D-06) linking to the canonical scope callout in `02-cert-delivery-foundation.md#canonical-scope-callout`.

**In scope:** Linux EAP-TLS 802.1X via `nmcli 802-1x.*` connection parameters (Wi-Fi **and** wired/ethernet — same mechanism); the **lead platform-constraint gap WARNING** (no native Intune Wi-Fi/wired/cert profiles; this is a shell-script workaround, not an Intune profile); the **separate MEDIUM-confidence freshness-stamped callout** (Linux Intune surface actively developing); **out-of-band certificate prerequisites** (client cert + private key + CA root pre-placed on device; nmcli params reference file paths); the **locked verification trio** (`nmcli connection show`, `ip addr show`, `journalctl -u NetworkManager`); the **Ubuntu 22.04 + 24.04 LTS** scoping note; the **one-sentence-each PEAP & EAP-TTLS out-of-scope** statements; the **co-equal-EAP reconciliation** (EAP-TLS-only is a *source-confidence/documentation-scope* limit, **not** a method preference, linked back to `01-`); the `## Wired` H2 (collapsed to point at the same nmcli via `type ethernet`).

**Out of scope (deferred to owning phases / out of milestone):**
- **PEAP-MSCHAPv2 and EAP-TTLS config mechanics on Linux** — technically possible via nmcli but **not documented in verifiable Microsoft/vendor sources for Intune-managed fleets** (Research Q5 → option b). **One sentence each** marking them out of scope; **NO** nmcli config detail for them (documenting steps would violate the locked one-sentence-each constraint).
- **RADIUS/NPS server config, PKI/CA build-out (ADCS/NDES), Certificate Connector, switch/AP port config, MAB, VLAN** — out of milestone scope entirely (E-01 server-side scope creep).
- **Inventing an OMA-URI custom profile** — **none exists for Linux** (STACK `:335`); the guide documents the gap + the OS-level nmcli workaround, never an Intune-profile workaround.
- L1 triage + L2 investigation runbooks + decision tree (Linux log source = `journalctl`; `wpa_supplicant` diagnostic variants belong to the **Phase 108 L2 diagnostic row**, PITFALLS `:462` — MEDIUM-confidence journalctl unit filters, verify at Phase 108 plan time) → Phases 107–108.
- Capability-matrix 802.1X rows + global nav-hub wiring (`index.md`, quick-refs, etc.) → **Phase 109 (navigation-last)**. Only the *local* `00-overview.md` item-7 entry is in scope here.
- Shared concepts (cert-delivery ordering rule, EKU, server-name-validation theory, rogue-RADIUS rationale, EAP-method comparison, identity-privacy/outer-identity theory) — **already homed in `01-`/`02-`; this guide links, never restates** (link-not-copy).
- **Sibling-only mechanics** — Windows dot3svc/TEAP/KB5014754; macOS deployment-channel keychain; iOS MAC-randomization label / M-series iPad wired; Android "Use device MAC" / UPN-in-SAN / enrollment modes — **no Linux equivalent; do NOT clone them in.**

</domain>

<decisions>
## Implementation Decisions

All 10 sub-decisions across four gray areas were resolved via a **three-agent adversarial review (Finder → Adversary → Referee, Opus)** per the user's standing instruction ("for each choice in each area, use /adversarial-review to recommend the best one and provide your reasoning" — same protocol as Phases 103/104/105). **The Finder scored ~147 with 10 ref-anchored picks; the Adversary confirmed 9 and mounted exactly ONE overturn (L1) with zero wrongful-overturn penalties; the Referee ruled 10/11 with the Adversary but on the single contested item produced an independent THIRD ruling** — rejecting both the Finder's pick (`IMPORTANT`) and the Adversary's counter (`CRITICAL`) after a first-hand grep of the suite's callout vocabulary, landing on `WARNING`. The Referee also independently verified the two load-bearing anchors: `102-CONTEXT.md:36` literally reads "Linux collapses to the nmcli/script note," and `SUMMARY.md:178` assigns "OS-level nmcli config for Linux" (vs "network team consultation for Android"). No locked pick violates a hard constraint (A3 template, link-not-copy, navigation-last, Intune client-side scope, 90-day freshness stamps, callout discipline, co-equal-EAP). See `106-DISCUSSION-LOG.md` for the full scored reasoning. The A3 Hybrid structure itself is inherited from Phase 102 D-01 and is NOT re-litigated; only its **deepest-gap degradation** is decided here.

### Area W — Wired treatment (Linux's "gap" is NOT Android's — nmcli covers both media)
**W1 — Hybrid: keep a top-level `## Wired` H2, collapsed to point at the SAME nmcli workaround via `type ethernet`** (HIGH)
- **D-01:** Keep the top-level `## Wired` H2 (cross-guide parallelism — every sibling ships one: `03-`/`04-`/`05-`/`06-:110`), but **collapse it to point at the same nmcli EAP-TLS workaround using `connection.type ethernet`** — NOT a dead-end Android-style gap stub. **Decisive anchor (Referee-verified):** `102-CONTEXT.md:36` literally says "Android collapses the Wired subsection to a one-paragraph gap stub; **Linux collapses to the nmcli/script note**." A bare gap stub would contradict that template note and `SUMMARY.md:178` ("OS-level nmcli config for Linux"). The unified gap leads the guide; the `## Wired` H2 then briefly notes the same nmcli path applies to wired with one changed property.

**W2 — Linux-wired alternative = "same nmcli, `type ethernet`" — NOT "consult your network team"** (HIGH)
- **D-02:** nmcli's `802-1x.*` properties are connection-type-agnostic — the identical EAP-TLS parameters apply to a `connection.type ethernet` profile. **Do NOT clone Android 105 D-04's "consult your network team" punt.** `SUMMARY.md:178` assigns the alternatives **asymmetrically**: "network team consultation for **Android**; OS-level nmcli config for **Linux**." B-09 `:365` ("Wired 802.1X for Linux follows a similar pattern"); STACK `:38` ("Same gap as Wi-Fi: shell scripts only"). **Executor note:** do NOT conflate in-scope device-supplicant config (nmcli, in scope) with out-of-scope switch-side port config (MAB/VLAN/port-auth — out of milestone scope; never document it).

### Area L — Lead gap callout + version scoping
**L1 — Lead platform-constraint callout tier = `WARNING`** (HIGH — Referee independent third ruling)
- **D-03:** The guide-leading gap callout is a **`> **WARNING:**` blockquote**. **Callout-vocabulary census (Referee grep of `docs/admin-setup-8021x/*.md`):** the suite uses **NOTE / WARNING / DANGER / CRITICAL only** — **`IMPORTANT` appears nowhere** (no `> **IMPORTANT`, no GFM `> [!IMPORTANT]`), so the Finder's `IMPORTANT` is out-of-vocabulary. `CRITICAL` (exactly one instance, `02-:37` cert-ordering) and `DANGER` (exactly one, `03-:124` enforcement-staging lockout) are **reserved for operational hazards that silently break auth or lock users off the network** — so the Adversary's `CRITICAL` mis-tiers a non-hazard. The L1 callout is a **platform-availability / scope statement** (nothing breaks), and **`WARNING` is the exact tier every sibling uses for its lead callout** (`03-:105` dot3svc, `04-:20` deployment channel, `05-:75` PEAP inner auth, `06-:79` BYOD UPN-in-SAN). SC1 (`ROADMAP:189`) requires this callout be **prominent** and that the guide **opens with** it.

**L2 — TWO separate callouts (SC1 gap-lead + SC3 MEDIUM-confidence freshness)** (HIGH)
- **D-04:** **Two** distinct callouts, not one combined. SC1 (`:189`) = the **HIGH-confidence settled gap fact** ("Intune provides no native Wi-Fi, wired, or cert-delivery profiles for Linux; this is a shell-script workaround") that **opens** the guide (STACK `:24`/`:38` "NOT SUPPORTED"). SC3 (`:191`) = a **separate forward-looking MEDIUM-confidence callout** ("the Linux Intune surface is actively developing") carrying the **90-day freshness stamp**, grouped with the PEAP/TTLS scope content. Merging would stamp a MEDIUM/expiring qualifier onto a HIGH-confidence present-tense fact and bury the freshness disclaimer. **The Android D-11 "combine into one" precedent does NOT transfer** — there both halves were the same confidence governing the same field; here they differ on both confidence and content.

**L3 — Name Ubuntu 22.04 + 24.04 explicitly, in an applies-to/prerequisites note** (MEDIUM)
- **D-05:** Name **both current LTS releases (22.04 + 24.04)** in a **prerequisites/applies-to note** — NOT the front-matter `platform:` field (a single token `linux`, cf. `06-:6`), NOT crammed into the lead gap callout (keep it focused on the profile-surface gap). **Anchor:** PITFALLS `:504` flags "Ubuntu 22.04 **vs** 24.04: Intune agent capabilities **differ**" and B-09 `:359` names "Ubuntu 22.04/24.04 LTS" as the in-scope surface — if agent capabilities differ by version, the versions must be named; generic "Ubuntu LTS" would erase the very delta `:504` flags. The nmcli mechanics are distro-agnostic; the **Intune agent-support** caveat is the Ubuntu-LTS-version-sensitive part. **Plan-time verify:** confirm 22.04/24.04 are still the intended fleet targets at authoring time.

### Area S — Script depth + certificate delivery
**S1 — nmcli `802-1x.*` command steps + a reference parameter table; NO full standalone runnable script** (HIGH)
- **D-06:** Deliver **discrete, followable `nmcli 802-1x.*` connection-parameter steps** (SC2 `:190` requires the operator can "follow the nmcli `802-1x.*` connection parameter steps for EAP-TLS") **plus a reference parameter table** documenting the key properties (`802-1x.eap`, `.identity`, `.client-cert`, `.private-key`, `.private-key-password-flags`, `.ca-cert`) — matching the established per-platform config-matrix house style (macOS/iOS/Android each carry one). **Do NOT ship a full sprawling copy-paste runnable Bash script** — the nmcli command sequence itself satisfies the ROADMAP `:184` "documented Bash script" phrasing (nmcli commands *are* the bash); a full productionized script over-reaches the doc's altitude, presents MEDIUM-confidence non-MS-Learn content as authoritative end-to-end, is harder to verify line-by-line, and invites E-01 scope creep (mirrors the `102` "documented pattern, not productionized script" precedent). End with the **locked verification trio**: `nmcli connection show`, `ip addr show`, `journalctl -u NetworkManager` (SC2).

**S2 — Separate, prominent out-of-band cert-prerequisites note; nmcli references file paths; NO inline private keys** (HIGH)
- **D-07:** Intune delivers **zero** cert profiles to Linux (STACK `:126-127`; coverage matrix Linux = "no Intune cert profiles") — part of SC1's "no cert-delivery profiles." Give the certificate prerequisite **standalone prominence**: a separate note stating the **client cert + private key + CA root must be pre-placed on the device out-of-band** (SUMMARY `:245`, B-09 `:365` "bundled in the script or managed out-of-band"); the `nmcli 802-1x.client-cert`/`.private-key`/`.ca-cert` parameters then **reference local file paths**. **Security: NEVER show inline private-key material** in published docs (house security: "never commit credentials"; least-privilege) — use placeholder file paths only.

**S3 — YES: MEDIUM-confidence "illustrative / validate before fleet deployment" disclaimer at the workaround lead-in** (HIGH)
- **D-08:** A short **"validate before fleet deployment / illustrative" disclaimer** at the **lead-in to the workaround section** (where the operator acts). Linux EAP-TLS-via-nmcli is **MEDIUM confidence** — sourced from keytos.io + nmcli docs, **NOT an official MS Learn guide** (SUMMARY `:308`/`:247`/`:155` "MEDIUM confidence — nmcli script only"; `:256` "for reference"). This content-level hedge is **distinct from** the SC3 platform-surface "actively developing" callout (D-04): S3 = "these commands may be environment-specific, test first"; SC3 = "the Intune surface itself may change." E-03 `:496-509` mandates freshness discipline on this drift-prone content.

### Area E — EAP scope framing (Linux is the ONLY platform breaking co-equal-EAP)
**E1 — Dedicated short scope note (one sentence each: PEAP, EAP-TTLS) at the EAP-TLS workaround head** (HIGH)
- **D-09:** A **dedicated short scope note** placed **after the gap lead / at the head of the EAP-TLS workaround** — NOT inside the lead callout (conflates the Intune-profile-surface gap with EAP-method coverage), NOT inline in the config steps (a reader scanning for "PEAP" won't find it). **One sentence each** for PEAP-MSCHAPv2 and EAP-TTLS (Research Q5 SUMMARY `:336-337` → option b; SC3 `:191` mandates "out of scope with a one-sentence explanation"; coverage matrix `:156` PEAP "LOW confidence", `:157` EAP-TTLS "OUT OF SCOPE"). **Do NOT document any PEAP/TTLS nmcli config detail** — one sentence each, no steps (locked constraint).

**E2 — Frame EAP-TLS-only as a source-confidence/documentation-scope limit (NOT a method preference) + link back to co-equal `01-`** (HIGH)
- **D-10:** Linux is the **only** platform narrowing to one EAP method, so the framing must **protect the locked co-equal-EAP hard constraint**. Frame EAP-TLS-only as a **source-confidence / documentation-scope boundary, NOT a recommendation**: e.g., "All three EAP methods remain co-equal (see [`01-eap-method-overview.md`](01-eap-method-overview.md)); this guide documents EAP-TLS only because it is the sole method with verifiable nmcli/vendor documentation for Intune-managed Linux fleets — a source-confidence scope boundary, not a preference." SC3's own stated reason is "not in verifiable Microsoft/vendor sources" (a source reason). The confidence gradient is purely documentation availability: EAP-TLS MEDIUM / PEAP LOW / EAP-TTLS out (coverage matrix `:155-157`). **Any framing that ranks/recommends EAP-TLS as "best for Linux" VIOLATES the locked co-equal constraint** (the `01-` no-default rule, carried verbatim across all siblings, e.g. `06-:52` "no method is ranked or recommended as a default").

### Claude's Discretion
- Exact prose, callout phrasing/labels, anchor wording, section ordering within `07-linux.md` — provided the locked decisions above and corpus conventions are honored (`> **Label:**` blockquote callouts; front-matter freshness stamps; plain GitHub auto-slug anchors with no `{#id}` overrides; double-hyphen trap).
- Exact phrasing of the nmcli command steps, the `802-1x.*` reference parameter table, the lead gap WARNING, the MEDIUM-confidence freshness callout, the out-of-band cert-prerequisites note, the validate-before-fleet disclaimer, and the PEAP/EAP-TTLS scope note — within the locked structure and guardrails.
- The exact `nmcli 802-1x.*` property set surfaced in the table (must cover at minimum: `eap=tls`, `identity`, `client-cert`, `private-key`, `private-key-password`/flags, `ca-cert`; plus the Wi-Fi `802-11-wireless-security.key-mgmt=wpa-eap` / SSID context) — **plan-time verify against current nmcli docs + the live Linux Intune surface.**
- Whether the `## Wired` H2 shows the one changed property inline (`connection.type ethernet`) or simply cross-refs the Wi-Fi nmcli steps — provided it does NOT become a second full config treatment (stub altitude: cross-guide parallel H2, points at the same workaround).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 106" (`:182–194`) — goal (`:184` Ubuntu LTS, Bash script + nmcli `802-1x` EAP-TLS workaround, no-native-profile reality leads, PEAP/EAP-TTLS out of scope), 3 success criteria (**SC1** `:189` prominent lead callout: no native Wi-Fi/wired/cert profiles + this is a shell-script workaround; **SC2** `:190` followable nmcli `802-1x.*` EAP-TLS steps + verify via `nmcli connection show` / `ip addr show` / `journalctl -u NetworkManager`; **SC3** `:191` PEAP-MSCHAPv2 + EAP-TTLS out of scope one-sentence-each + MEDIUM-confidence freshness-stamped "surface actively developing" callout); dependency on Phase 101.
- `.planning/REQUIREMENTS.md` — **DOT1X-08** (`:26`: Linux Ubuntu LTS via documented script/`nmcli` NetworkManager `802-1x` EAP-TLS workaround; no-native-Intune-Wi-Fi/wired/cert reality leads; PEAP/EAP-TTLS out of scope; MEDIUM-confidence callout, verify at plan time); traceability `:118`/`:147` (Phase 106 → DOT1X-08, 1 requirement).

### Locked template (THE reusable per-platform pattern — clone A3 structure, then DEGRADE furthest for the deepest gap)
- `.planning/phases/102-windows-802-1x-admin-setup-wi-fi-wired/102-CONTEXT.md` — locked **A3 Hybrid** structure (D-01: Common Mechanics → Wi-Fi → Wired, per-EAP matrix in each connection subsection) **and its gap-degradation note (`:36`: "Android collapses the Wired subsection to a one-paragraph gap stub; LINUX collapses to the nmcli/script note")** — the load-bearing basis for **W1/D-01** (Referee-verified verbatim). The "documented pattern, not productionized script" altitude precedent (basis for S1/D-06). Link-not-copy / co-equal-EAP / navigation-last / freshness-stamp conventions.
- `.planning/phases/105-android-enterprise-802-1x-admin-setup-wi-fi-wired-gap/105-CONTEXT.md` — the **immediately-prior gap platform**; gap-stub treatment A1–A4/D-01..D-04 and the **explicit Linux contrast (D-03: "Linux's gap IS Section-F-callout-prescribed and leads its whole guide, unlike Android's wired stub")**; the **Linux deferred-idea note (`:167`: "the A3 template degrades further; the gap leads the whole guide and IS Section-F-callout-prescribed")**; Android's "consult network team" wired alternative (D-04) — **the thing W2/D-02 deliberately does NOT clone for Linux.**
- `.planning/phases/103-macos-802-1x-admin-setup-wi-fi-wired/103-CONTEXT.md` — the **D-08 callout-vs-structural overturn discipline** (a real item denied/granted a callout per research prescription) — the adjudication style behind L1/D-03.
- `.planning/phases/104-ios-ipados-802-1x-admin-setup-wi-fi-wired/104-CONTEXT.md` — WARNING-tier discipline (D-10 "What breaks" WARNING) and single-home-plus-cross-ref pattern; basis for the L1 tier-discipline reasoning.

### Phase 101 foundation (link targets — this guide LINKS, never restates)
- `docs/admin-setup-8021x/00-overview.md` — folder entry point; **receives the Linux platform-list entry (item 7)** — current placeholder at `:36` ("7. Platform guide (Phase 106) — entry added when guide is authored"); the **wired-availability note at `:38` already pre-frames Linux** as "no native Intune Wi-Fi or wired profile — script-based EAP-TLS only via nmcli; see the Linux guide for details" (**link/reuse, do NOT contradict**); Change-History footer (`:55–63`) gets a new row. Mermaid setup-sequence + descriptive link-list house style.
- `docs/admin-setup-8021x/01-eap-method-overview.md` — co-equal EAP-method overview (no method ranked as default) — **the link target for E2/D-10's co-equal reconciliation.**
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert-delivery **ordering rule (CRITICAL callout `:37`)**, EKU = Client Authentication, RADIUS server-name validation, per-platform cert matrix (Linux = no Intune cert profiles), **canonical scope callout `#canonical-scope-callout`** (target of the one-line scope banner, D-06 from Phase 101).
- `docs/_glossary-network.md` — 802.1X/EAP/RADIUS/supplicant/SCEP/PKCS/server-name-validation terms (link target).

### Research (Linux = MEDIUM confidence — guide content is research-sourced; live-verify at plan time)
- `.planning/research/SUMMARY.md` §"Phase 106 — Linux Wi-Fi Admin-Setup (Script-Based) + Wired Gap Stub" (`:241–247`); Linux capability rows (`:32` no native Wi-Fi profile / shell+nmcli only / EAP-TLS MEDIUM / PEAP-TTLS LOW; `:39` no wired profile same gap; `:42–45` SCEP/PKCS/Trusted-root all NO for Linux); Per-Platform Coverage-Reality Matrix (`:151–180`: `:155` EAP-TLS "MEDIUM confidence — nmcli script only", `:156` PEAP LOW, `:157`/coverage EAP-TTLS out, `:171` outer-identity "Via nmcli script parameters", `:175` Linux wired "Gap stub — no native profile", **`:178` reading-guide: "network team consultation for Android; OS-level nmcli config for Linux"** — the W1/W2 anchor); **Research Q5** PEAP/EAP-TTLS exclusion (`:336–337` → option b, one sentence — E1/D-09); Linux-last sequencing rationale (`:297`); MEDIUM-confidence + live-verify flags (`:247`, `:308` "verify current Linux Intune management surface… if native profile support added since 2026-06-29, scope adjusts"); `:256` "for reference" framing (S3/D-08).
- `.planning/research/STACK.md` — Linux rows: **`:24` Wi-Fi NOT SUPPORTED** ("Shell scripts can configure NetworkManager/nmcli but not an MDM-delivered structured profile; no cert delivery via Intune"); **`:38` Wired NOT SUPPORTED** ("Same gap as Wi-Fi: shell scripts only" — W2 anchor); `:125–127` no Intune cert profile types / no client-cert delivery path (S2/D-07); `:150` Linux server-name row ("Not configurable via Intune; out-of-band configuration only"); **`:247–256` Linux detail + "Documentation approach for Linux"** (`:254` Linux Intune receives only compliance/apps/scripts/MDE; `:256` "explain Intune does not deliver 802.1X or cert profiles; network config out-of-band via NetworkManager/nmcli/wpa_supplicant; acknowledge the gap, note what IS possible for reference"); `:324` "Linux (simple but unusual): document the gap explicitly; no Intune profile; practical shell-script examples (not Intune profiles); cert out-of-band"; **`:335` no OMA-URI** ("Linux has no custom OMA-URI profile type; shell scripts are the only delivery mechanism").
- `.planning/research/PITFALLS.md` — **B-09 Linux limited Intune Wi-Fi surface (`:356–373`)** = the lead **"Platform constraint callout"** (Section F `:586`): `:359` Ubuntu 22.04/24.04 LTS surface, `:365` "802.1X via shell scripts NOT native Wi-Fi profile; certs bundled-in-script-or-managed-separately; **Wired 802.1X for Linux follows a similar pattern**; platform-scoped constraint not an Intune gap", `:373` MEDIUM confidence — verify against current MS Learn at authoring time; **E-01 server-side scope creep (`:472`)**; **E-03 missing freshness stamps (`:496–509`)** incl. **`:504` "Ubuntu 22.04 vs 24.04: Intune agent capabilities differ"** (L3/D-05 anchor); **`:462` Linux diagnostic row** (`journalctl -u wpa_supplicant` / `journalctl -u NetworkManager` / `/var/log/syslog` — the Phase 108 L2 row, NOT the admin-setup verification trio); Section F callout-prescription table (`:586` B-09 lead callout, `:592` E-01 scope callout, `:594` E-03 freshness, `:597` co-equal three-method template).
- `.planning/research/ARCHITECTURE.md` — file layout (`:109` `docs/admin-setup-8021x/07-linux.md` = single deliverable, depends on files 01–02); confirms the shared-vs-per-platform link-not-copy boundary.

### Sibling deliverables (house-style precedent — clone structure, strip platform-only mechanics)
- `docs/admin-setup-8021x/06-android.md` — immediately-prior gap deliverable; front-matter stamp block (`:1–7`, `platform: linux` single token), scope banner (`:14`), prerequisites pointers to `01-`/`02-` (`:9–10`), **lead WARNING tier (`:79`)**, co-equal no-default statement (`:52`), `## Wired` H2 (`:110`), See-Also / Change-History footer (`:116–128`). **Do NOT clone Android's enrollment modes, UPN-in-SAN, "Use device MAC", or "consult network team" wired punt.**
- `docs/admin-setup-8021x/05-ios.md` / `04-macos.md` / `03-windows.md` — per-EAP Wi-Fi config matrix house style (the reference-table precedent for S1/D-06); lead-callout WARNING tier (`05-:75`, `04-:20`, `03-:105`); CRITICAL/DANGER reserved for hazards (`02-:37` ordering, `03-:124` enforcement). **Strip sibling-only mechanics** (dot3svc/TEAP/KB5014754; deployment-channel keychain; MAC label / M-series-iPad wired).

### Live-verify at plan time (MEDIUM-confidence surface)
- **Microsoft Learn — Linux device management / network configuration surface** — re-confirm at authoring time that Intune still delivers **no** native Wi-Fi/wired/cert profiles to Linux (if native profile support shipped since the 2026-06-29 research date, S1/S2/E-series scope shifts). Re-confirm the `nmcli 802-1x.*` EAP-TLS parameter set against current nmcli/NetworkManager docs. Re-confirm 22.04 + 24.04 are the intended LTS targets.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase-106 sibling `06-android.md`**: the **nearest** structural template — front-matter stamp block, scope banner, `01-`/`02-` prerequisite pointers, **lead WARNING callout**, co-equal no-default statement, `## Wired` top-level H2, See-Also / Change-History footer. **Strip ALL Android-specific content** (enrollment modes, UPN-in-SAN, version-gated RADIUS, "Use device MAC", "consult network team" wired punt).
- **Sibling per-EAP config-matrix pattern (`03-`/`04-`/`05-`/`06-`)**: clone the **table shape** for the S1 `nmcli 802-1x.*` reference parameter table; but Linux's table is **nmcli properties** (not Intune profile fields) and **EAP-TLS only** (single column, not three co-equal methods).
- **Foundation files (`00`/`01`/`02`)**: `00-overview.md` item-7 placeholder (`:36`) + pre-framed wired note (`:38`) + Change-History (`:55–63`) — **edit, don't contradict**; `01-` co-equal overview (E2 link target); `02-` cert-ordering CRITICAL callout + canonical scope callout (link targets); `_glossary-network.md` term anchors.

### Established Patterns
- **A3 deepest-gap degradation** — the locked template (102 D-01) degrades furthest for Linux: no Intune profile path at all; the gap **leads the whole guide** and the `## Wired` H2 collapses to "the nmcli/script note" (102-CONTEXT `:36`, Referee-verified). Android (105) was the first gap; Linux degrades furthest.
- **link-not-copy** — home shared concepts once in `01-`/`02-`; cert-ordering, server-validation theory, rogue-RADIUS rationale, identity-privacy theory, EAP-method comparison all linked, never restated.
- **navigation-last** — capability-matrix rows + global nav-hub are **Phase 109**, not 106. Only the local `00-overview.md` item-7 entry is in scope.
- **Callout vocabulary (Referee-verified census of the 8021x suite)** — **NOTE / WARNING / DANGER / CRITICAL only**; `IMPORTANT` is NOT in the house style. `CRITICAL` (1×, `02-:37`) and `DANGER` (1×, `03-:124`) are reserved for auth-break/lockout **hazards**; **`WARNING` is the lead-callout tier** for every sibling. → L1/D-03.
- **Freshness stamps** — file front-matter 90-day (`last_verified` + 90 = `review_by`, siblings stamp `2026-06-30 / 2026-09-28`). The **SC3 "surface actively developing" callout carries its own 90-day stamp** (MEDIUM-confidence drift-prone surface; D-04/D-08).
- **Anchor slugs** — plain GitHub auto-slugs, no `{#id}` overrides; double-hyphen trap.
- **Callout discipline** — the **research-prescribed callout-class items for Linux** are the **B-09 lead platform-constraint WARNING (L1/D-03)** and the **SC3 MEDIUM-confidence freshness callout (L2/D-04)**. The **cert-prerequisites note (S2/D-07)**, the **validate-before-fleet disclaimer (S3/D-08)**, the **Ubuntu-version note (L3/D-05)**, and the **PEAP/TTLS scope note (E1/D-09)** are structural/plain-prose or short scope notes — calibrate callout-vs-prose at executor discretion, but do not inflate every one into a blockquote.

### Integration Points
- `docs/admin-setup-8021x/07-linux.md` — **new file** (does not exist yet).
- `docs/admin-setup-8021x/00-overview.md` — **edited** to fill item 7 with the live `07-linux.md` link + log the Change-History row; pre-existing file → edit must be harness-allowlisted (same pattern as Phase 105's item-6 edit, Phase 104's item-5 edit).

</code_context>

<specifics>
## Specific Ideas

- **The gap LEADS the guide, as a `WARNING` callout** (SC1) — no native Intune Wi-Fi/wired/cert profiles for Linux; this is an OS-level shell-script + nmcli workaround, NOT an Intune profile. `WARNING` tier (sibling-lead tier; not `IMPORTANT` (out-of-vocab) or `CRITICAL`/`DANGER` (hazard-reserved)). D-03.
- **A SEPARATE MEDIUM-confidence freshness-stamped callout** (SC3) — "the Linux Intune surface is actively developing"; 90-day stamp. Two callouts, not one. D-04.
- **Wired = same nmcli, `type ethernet`** — keep the `## Wired` H2 (cross-guide parallelism) collapsed to point at the same EAP-TLS workaround; Linux-wired alternative is OS-level nmcli (SUMMARY `:178`), **NOT** Android's "consult your network team." D-01/D-02.
- **Workaround content = followable `nmcli 802-1x.*` command steps + a reference parameter table** (eap=tls, identity, client-cert, private-key, private-key-password-flags, ca-cert; + Wi-Fi key-mgmt=wpa-eap/SSID) — NOT a full standalone runnable script. End with the locked verification trio. D-06.
- **Certificates are out-of-band** — a separate prominent note: client cert + private key + CA root pre-placed on the device; nmcli params reference **file paths**, never inline key material. D-07.
- **"Validate before fleet deployment" disclaimer** at the workaround lead-in — MEDIUM-confidence content (keytos.io + nmcli docs, not MS Learn). D-08.
- **PEAP & EAP-TTLS = one sentence each, out of scope** (Research Q5 option b), in a short scope note at the EAP-TLS workaround head — no nmcli config detail for them. D-09.
- **EAP-TLS-only is a source-confidence/documentation-scope limit, NOT a method preference** — link back to the co-equal `01-eap-method-overview.md`; do NOT imply EAP-TLS is "preferred" on Linux. D-10.
- **Ubuntu 22.04 + 24.04** named in an applies-to/prerequisites note (agent capabilities differ by version, PITFALLS `:504`). D-05.
- **Carried from siblings:** scope banner → `02-#canonical-scope-callout`; prerequisites pointers → `01-`/`02-`; front-matter 90-day stamp; See-Also / Change-History footer.

</specifics>

<deferred>
## Deferred Ideas

- **Linux PEAP / EAP-TTLS via nmcli** — technically possible but undocumented for Intune-managed fleets (LOW confidence / out of scope this milestone). One sentence each here; full treatment is not a planned suite item.
- **Switch-side / non-Intune wired 802.1X** (MAB, port-auth, VLAN, RADIUS/NPS config) — out of milestone scope entirely; the guide documents the device-supplicant nmcli path only, never switch config.
- **Inventing a Linux OMA-URI custom profile** — none exists (STACK `:335`); never document one.
- **Capability-matrix 802.1X rows + global nav-hub wiring** (`docs/index.md`, common-issues, quick-refs, l1/l2 indexes) — **Phase 109 (navigation-last)**. Only the local `00-overview.md` item-7 entry here.
- **L1/L2 runbooks + decision tree** (Linux log source = `journalctl`; `wpa_supplicant`/`NetworkManager` unit filters + `/var/log/syslog` — MEDIUM-confidence filter strings, verify at Phase 108 plan time; PITFALLS `:462`) — Phases 107–108. The Linux diagnostic row feeds these, not this guide.
- **Sibling-only mechanics** (Windows dot3svc/TEAP/KB5014754; macOS deployment-channel keychain; iOS MAC label / M-series-iPad wired; Android enrollment modes / UPN-in-SAN / "Use device MAC") — owned by Phases 102–105; no Linux equivalent. Do NOT clone into `07-linux.md`.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap*
*Context gathered: 2026-06-30*
