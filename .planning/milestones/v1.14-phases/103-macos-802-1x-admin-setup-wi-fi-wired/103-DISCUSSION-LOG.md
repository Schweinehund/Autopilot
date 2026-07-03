# Phase 103: macOS 802.1X Admin-Setup (Wi-Fi + Wired) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-30
**Phase:** 103-macos-802-1x-admin-setup-wi-fi-wired
**Areas discussed:** Channel callout, Common mechanics, Wired specifics, EAP matrix

**Method:** User selected all four gray areas and instructed: *"For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."* All nine sub-decisions were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus). The A3 Hybrid structure is inherited from Phase 102 (D-01) and was NOT re-litigated. Finder picks were confirmed 8/9; **C-b04 was overturned** (Adversary) and the **overturn upheld** (Referee).

---

## Area A — Deployment-channel callout

### A-place (placement)

| Option | Description | Selected |
|--------|-------------|----------|
| A-place-common | Standalone WARNING callout + decision table at top of Common Mechanics, before Wi-Fi/Wired | ✓ |
| A-place-preflight | Dedicated "Before You Begin" section above Common Mechanics (first content) | |
| A-place-inline | Repeated inline in each connection subsection | |

**Referee verdict:** A-place-common (MEDIUM). Channel is cross-cutting (STACK ~l.221) → home once in Common Mechanics; satisfies Goal's "before any configuration steps" without inventing a non-template "Preflight" section. Inline rejected as link-not-copy violation.

### A-weight (severity)

| Option | Description | Selected |
|--------|-------------|----------|
| A-weight-warning | WARNING callout | ✓ |
| A-weight-danger | DANGER callout | |

**Referee verdict:** A-weight-warning (HIGH). Research-verbatim "WARNING callout" ×3 (SUMMARY ~l.76/137/221). DANGER reserved for the irrecoverable fleet-lockout class (Windows enforcement-staging B-02); channel mistake is recoverable (delete/recreate/reassign). macOS has no DANGER-class callout.

**Notes:** Key macOS-vs-Windows deviation — severity is graded by remediation path, not annoyance.

---

## Area B — Common Mechanics content (macOS adaptation)

### B-authmode (absent auth-mode selector)

| Option | Description | Selected |
|--------|-------------|----------|
| B-authmode-note | Explicit "no auth-mode selector on macOS" contrast note (channel replaces it) | ✓ |
| B-authmode-omit | Omit auth-mode entirely | |

**Referee verdict:** B-authmode-note (HIGH). macOS auth mode "NOT exposed" (SUMMARY ~l.166/180); document the absence so Windows-trained admins don't hunt for it. A per-platform delta, not a restated shared concept.

### B-servername (server-name homing)

| Option | Description | Selected |
|--------|-------------|----------|
| B-servername-common | Home server-name + validation once in Common Mechanics; wired delta only | ✓ |
| B-servername-split | Split per-connection (A-04 wired dynamic-trust-window) | |

**Referee verdict:** B-servername-common (HIGH). Both Wi-Fi + wired expose the fields (STACK ~l.145–146); mirrors Windows template. A-04 dynamic-trust-window is a one-line wired delta, not a whole-concept split.

---

## Area C — Wired subsection

### C-scep (SCEP-only callout prominence)

| Option | Description | Selected |
|--------|-------------|----------|
| C-scep-callout | Prominent standalone SCEP-only / PKCS-gap callout | ✓ |
| C-scep-inline | Brief inline note in the wired cert step | |

**Referee verdict:** C-scep-callout (HIGH). Research-explicit "document...with a callout" (SUMMARY ~l.179); named success criterion (SC2). The contrast case proving the authors say "callout" when they mean it.

### C-depth (wired treatment depth)

| Option | Description | Selected |
|--------|-------------|----------|
| C-depth-fullpeer | Full peer treatment incl. complete per-EAP wired matrix | ✓ |
| C-depth-compact | Lean on Wi-Fi, note only deltas | |

**Referee verdict:** C-depth-fullpeer (HIGH). Locked D-01 mandates a per-EAP matrix in each connection subsection; collapse reserved for gap platforms; macOS wired is a "Full guide" (SUMMARY ~l.175).

### C-b04 (profile-type confusion) — **OVERTURNED**

| Option | Description | Selected |
|--------|-------------|----------|
| C-b04-callout | Explicit blockquote callout: Wi-Fi + Wired are separate profile types | |
| C-b04-implicit | Distinct sections (+ optional one inline sentence); no blockquote callout | ✓ |

**Finder's initial pick:** C-b04-callout (MED, self-flagged as most contestable).
**Adversary:** OVERTURN → C-b04-implicit. **Referee:** overturn UPHELD (HIGH).
**Referee verdict:** PITFALLS Section F (~l.581) prescribes "**Separate profile type guidance**," never "callout" — the authors use "callout" precisely for B-01/B-02/B-05/B-06/B-09 and C-scep but deliberately not for B-04. The locked A3 distinct `## Wi-Fi` / `## Wired` sections (each with its own `Templates > Wi-Fi` vs `Templates > Wired network` nav path) already satisfy the prevention; a macOS-only callout is inflation breaking Windows-template parity. One lightweight inline sentence is permitted; no blockquote.

---

## Area D — Per-EAP-method matrix columns

### D-inner (EAP-TTLS inner-auth)

| Option | Description | Selected |
|--------|-------------|----------|
| D-inner-matrix | Inner-auth (PAP/CHAP/MS-CHAP/MS-CHAP v2) as a matrix Inner-method row | ✓ |
| D-inner-prose | Inner-auth in prose under EAP-TTLS only | |

**Referee verdict:** D-inner-matrix (HIGH). Windows matrix already has an Inner-method row (`03-windows.md` ~l.75/153); macOS has identical PAP/CHAP/MS-CHAP/MS-CHAPv2 options (STACK ~l.160–165, PITFALLS ~l.426). Clone the row.

### D-serverval (server-validation framing)

| Option | Description | Selected |
|--------|-------------|----------|
| D-serverval-secviolation | Frame "disabling validation = security violation on macOS" (A-05) | ✓ |
| D-serverval-neutral | Neutral "populate names + reference trusted root" | |

**Referee verdict:** D-serverval-secviolation (HIGH). A-05 ~l.107 verbatim "flagged as a security violation"; C-02 "Security callout; never show disabled examples." Surface the macOS symptom (dynamic trust dialog) but LINK the rogue-RADIUS rationale to `01-`/`02-`/glossary (link-not-copy) — do not restate the theory.

---

## Claude's Discretion

- Exact prose, callout phrasing, anchor wording, Mermaid/diagram use, and section ordering within `04-macos.md`.
- Exact phrasing of the per-EAP-method config matrices, the deployment-channel decision-table wording, and the optional one-line B-04 separateness sentence.
- Whether the deployment-channel WARNING is literally the first subsection of Common Mechanics or follows a one-line section intro (must precede any config steps).

## Deferred Ideas

- Windows-only mechanics (DANGER callout, dot3svc, enforcement-staging, TEAP, KB5014754) — not cloned into macOS; no equivalent.
- iOS/iPadOS guide (`05-ios.md`) — Phase 104 (shares PKCS-not-supported-for-wired + SCEP-only-wired; adds MAC randomization, M-series iPad, PEAP-inner-MS-CHAPv2).
- Android/Linux gap-stub guides — Phases 105–106.
- Capability-matrix rows + global nav-hub — Phase 109 (navigation-last).
- L1/L2 runbooks + decision tree — Phases 107–108.
