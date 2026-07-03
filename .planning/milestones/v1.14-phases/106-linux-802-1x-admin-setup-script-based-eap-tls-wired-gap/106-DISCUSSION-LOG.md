# Phase 106: Linux 802.1X Admin-Setup (Script-Based EAP-TLS + Wired Gap) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-30
**Phase:** 106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap
**Areas discussed:** Wired treatment, Lead gap callout, Script depth + certs, EAP scope framing

**Method:** User selected all four gray areas and invoked the standing instruction — "for each choice in each area, use /adversarial-review to recommend the best one and provide your reasoning" (same protocol as Phases 103/104/105). All 10 sub-decisions were resolved via a three-agent scored adversarial review (Finder → Adversary → Referee, Opus). Finder scored ~147 with 10 ref-anchored picks; Adversary confirmed 9 and mounted exactly ONE overturn (L1) with zero wrongful-overturn penalties; Referee ruled 10/11 with the Adversary and produced an independent THIRD ruling on the single contested item (L1).

---

## Area W — Wired treatment

### W1 — Wired structure

| Option | Description | Selected |
|--------|-------------|----------|
| (a) A3 `## Wi-Fi` + `## Wired` split with a true Android-style gap stub | Clone Android's dead-end stub | |
| (b) Unified "no native profile → one nmcli workaround", wired as a bare `type ethernet` pointer (drop `## Wired` H2) | Single section, no H2 | |
| (c) Hybrid — unified gap lead + single workaround, KEEP a short `## Wired` H2 pointing to the same nmcli via `type ethernet` | Cross-guide parallel H2 collapsed to the nmcli note | ✓ |

**Adjudicated choice:** (c) hybrid — HIGH confidence. Finder pick → Adversary CONFIRMED → Referee upheld.
**Notes:** Referee verified `102-CONTEXT.md:36` literally reads "Linux collapses to the nmcli/script note" — the template explicitly anticipates a retained `## Wired` H2 collapsing to the nmcli note. (a) would contradict that note + SUMMARY `:178`; (b) breaks A3 cross-guide parallelism + the `00-overview.md:38` reader pointer.

### W2 — Wired alternative wording

| Option | Description | Selected |
|--------|-------------|----------|
| "consult your network team" (clone of Android 105 D-04) | Android's punt | |
| "same nmcli workaround, use connection type ethernet" | OS-level nmcli covers wired identically | ✓ |

**Adjudicated choice:** same nmcli, `type ethernet` — HIGH. Finder → Adversary CONFIRMED → Referee upheld.
**Notes:** `SUMMARY.md:178` assigns alternatives asymmetrically — "network team consultation for Android; OS-level nmcli config for Linux." Adversary flagged that the switch-side-port angle conflates out-of-scope switch config with in-scope device-supplicant config.

---

## Area L — Lead gap callout + version scoping

### L1 — Lead callout tier (THE contested item)

| Option | Description | Selected |
|--------|-------------|----------|
| IMPORTANT | Finder's pick — "read first" without a break signal | |
| CRITICAL | Adversary's overturn — most-prominent non-DANGER tier | |
| WARNING | Referee's third ruling — the sibling lead-callout tier | ✓ |
| NOTE / DANGER | Too soft / hazard-reserved | |

**Adjudicated choice:** WARNING — HIGH. Finder IMPORTANT → Adversary OVERTURNED to CRITICAL → **Referee REJECTED the overturn and ruled WARNING.**
**Notes:** Referee grep'd the full `docs/admin-setup-8021x/` callout census: vocabulary is NOTE/WARNING/DANGER/CRITICAL only — **IMPORTANT is absent** (Adversary right to kill it). But CRITICAL (1×, `02-:37` cert-ordering) and DANGER (1×, `03-:124` enforcement-staging) are **reserved for auth-break/lockout hazards**; the L1 callout is a platform-availability statement (nothing breaks). WARNING is the exact tier every sibling uses for its lead callout (`03-:105`, `04-:20`, `05-:75`, `06-:79`). Net: a better answer than either of the first two agents proposed.

### L2 — One vs two callouts

| Option | Description | Selected |
|--------|-------------|----------|
| ONE combined callout (gap + MEDIUM-confidence dev-surface + freshness) | Android D-11 "combine" style | |
| TWO separate callouts (SC1 HIGH gap lead + SC3 MEDIUM freshness) | Two distinct SCs, two confidence levels | ✓ |

**Adjudicated choice:** TWO callouts — HIGH. Finder → Adversary CONFIRMED → Referee upheld.
**Notes:** ROADMAP `:189` (gap lead) and `:191` (MEDIUM-confidence "actively developing" + freshness stamp) are distinct success criteria at different confidence levels. The Android D-11 "combine" precedent applied only to two gates of the same field — not transferable.

### L3 — Ubuntu LTS version scoping

| Option | Description | Selected |
|--------|-------------|----------|
| Generic "Ubuntu LTS" | Durable but erases the version delta | |
| Name 22.04 + 24.04 in an applies-to/prereq note | Preserves the agent-capability delta | ✓ |
| Single version | Under-scopes | |

**Adjudicated choice:** name 22.04 + 24.04 in a prereq note — MEDIUM. Finder → Adversary CONFIRMED → Referee upheld.
**Notes:** PITFALLS `:504` "Ubuntu 22.04 vs 24.04: Intune agent capabilities differ" — if capabilities differ by version, the versions must be named. Plan-time verify both LTS releases are the intended targets.

---

## Area S — Script depth + certificate delivery

### S1 — Workaround content shape

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Full copy-paste runnable Bash script | Over-commits MEDIUM-confidence content; E-01 risk | |
| (b) Discrete nmcli `802-1x.*` command steps | SC2 "follow the steps" | |
| (c) Reference parameter table | Fails SC2 alone | |
| b+c combined | Steps + reference table | ✓ |

**Adjudicated choice:** b+c — HIGH. Finder → Adversary CONFIRMED → Referee upheld.
**Notes:** SC2 `:190` requires followable nmcli steps + the verification trio; the parameter table matches sibling config-matrix house style. A full standalone script over-reaches the doc's altitude (mirrors the 102 "documented pattern, not productionized script" precedent) and invites E-01 scope creep.

### S2 — Certificate delivery handling

| Option | Description | Selected |
|--------|-------------|----------|
| Bundle cert + key + CA inline in the script as the prominent treatment | Security anti-pattern (inline private key) | |
| Separate prominent out-of-band cert-prerequisites note; nmcli refs file paths | Cert-gap visible; no inline keys | ✓ |

**Adjudicated choice:** separate out-of-band note, file-path refs — HIGH. Finder → Adversary CONFIRMED → Referee upheld.
**Notes:** Intune delivers zero cert profiles to Linux (STACK `:126-127`) — a distinct SC1 gap-fact deserving standalone prominence. Inline private-key material is a security anti-pattern; nmcli references file paths instead.

### S3 — MEDIUM-confidence disclaimer

| Option | Description | Selected |
|--------|-------------|----------|
| Omit the disclaimer | Presents unverified steps as production-ready | |
| YES — "illustrative / validate before fleet" at the workaround lead-in | Honest MEDIUM-confidence hedge | ✓ |

**Adjudicated choice:** YES, at workaround lead-in — HIGH. Finder → Adversary CONFIRMED → Referee upheld.
**Notes:** Linux EAP-TLS-via-nmcli is MEDIUM (keytos.io + nmcli docs, not MS Learn — SUMMARY `:308`/`:247`/`:155`). Distinct from the SC3 platform-surface "actively developing" callout: S3 = content hedge ("test first"); SC3 = surface-drift hedge.

---

## Area E — EAP scope framing

### E1 — PEAP/EAP-TTLS out-of-scope placement

| Option | Description | Selected |
|--------|-------------|----------|
| Inside the lead gap callout | Conflates profile-surface gap with EAP coverage | |
| A dedicated short scope note (one sentence each) at the EAP-TLS workaround head | Discoverable, beside E2 framing | ✓ |
| Inline in the EAP-TLS config steps | Low discoverability | |

**Adjudicated choice:** dedicated short scope note — HIGH. Finder → Adversary CONFIRMED → Referee upheld.
**Notes:** Research Q5 (SUMMARY `:336-337`) → option b, one sentence; SC3 `:191` mandates the out-of-scope one-sentence explanation. No PEAP/TTLS config detail (locked one-sentence-each constraint).

### E2 — Co-equal-EAP reconciliation

| Option | Description | Selected |
|--------|-------------|----------|
| Rank/recommend EAP-TLS as "best for Linux" | VIOLATES locked co-equal-EAP constraint | |
| Frame EAP-TLS-only as a source-confidence/doc-scope limit + link back to co-equal `01-` | Preserves co-equality, states scope honestly | ✓ |

**Adjudicated choice:** source-confidence/doc-scope framing + link to `01-` — HIGH. Finder → Adversary CONFIRMED → Referee upheld.
**Notes:** Linux is the ONLY platform narrowing to one EAP method. SC3's stated reason is "not in verifiable Microsoft/vendor sources" (a source reason). The confidence gradient is documentation availability only: EAP-TLS MEDIUM / PEAP LOW / EAP-TTLS out (coverage matrix `:155-157`). A preference framing would breach the `01-` no-default rule carried verbatim across all siblings.

---

## Claude's Discretion

- Exact prose, callout phrasing/labels, anchor wording, section ordering within `07-linux.md`.
- Exact phrasing of the nmcli command steps, the `802-1x.*` reference parameter table, the lead gap WARNING, the MEDIUM-confidence freshness callout, the out-of-band cert-prerequisites note, the validate-before-fleet disclaimer, and the PEAP/EAP-TTLS scope note.
- The exact `nmcli 802-1x.*` property set surfaced (min: eap=tls, identity, client-cert, private-key, private-key-password-flags, ca-cert; + Wi-Fi key-mgmt=wpa-eap/SSID) — plan-time verify against current nmcli docs + the live Linux Intune surface.
- Whether the `## Wired` H2 shows the changed property inline (`connection.type ethernet`) or cross-refs the Wi-Fi nmcli steps — provided it stays at stub altitude.

## Deferred Ideas

- Linux PEAP / EAP-TTLS via nmcli (LOW confidence / out of scope this milestone).
- Switch-side / non-Intune wired 802.1X (MAB, port-auth, VLAN, RADIUS/NPS) — out of milestone scope entirely.
- Inventing a Linux OMA-URI custom profile — none exists (STACK `:335`).
- Capability-matrix 802.1X rows + global nav-hub wiring — Phase 109 (navigation-last).
- L1/L2 runbooks + decision tree (Linux log source = journalctl; filter strings MEDIUM-confidence, verify Phase 108) — Phases 107–108.
- Sibling-only mechanics (Windows dot3svc/TEAP/KB5014754; macOS keychain channel; iOS MAC label / M-series-iPad wired; Android enrollment modes / UPN-in-SAN / "Use device MAC") — no Linux equivalent.

### Plan-time verify flags
1. Live MS Learn Linux Intune surface re-check — if native profile support shipped since 2026-06-29, S1/S2/E-series scope shifts.
2. Confirm 22.04 + 24.04 are still the target LTS releases.
3. Confirm no in-flight suite edit introduced `IMPORTANT` elsewhere (current state: WARNING is correct).
