# Phase 83: Kerberos SSO Extension Guide - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-22
**Phase:** 83-kerberos-sso-extension-guide
**Areas discussed:** Primary framing, Guide structure, On-prem AD prerequisite depth, Diagnostics scope

**Method:** User selected all four gray areas and delegated the choice to `/adversarial-review` (standing preference for gray-area picks). A three-agent scored review ran per area: Finder (objects to every option), Adversary (disproves overstated objections), Referee (final ruling against verified files). Winners below are the Referee verdicts.

---

## Primary framing

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Standalone primary | On-prem-AD Kerberos as primary path, PSSO-coexistence secondary | |
| (b) PSSO-coexistence primary | Cloud/on-prem TGT via `usePlatformSSOTGT` as the spine, standalone as a note | ✓ |
| (c) Co-equal | Parallel treatment of both | |

**User's choice:** (b) — via adversarial review.
**Notes:** (a) and (c) eliminated by a confirmed scope CRIT — FEATURES anti-feature locks standalone-without-PSSO to "mention only as a note"; SUMMARY puts it out of v1.10 scope. Finder's CRIT against (b) ("over-elevates limited-preview Cloud Kerberos") ruled a **false positive**: PSSO-coexistence keys on the on-prem `usePlatformSSOTGT` TGT-sharing pattern, not Cloud Kerberos. Residual valid caveats carried forward: 14.6 floor pinned; standalone stays a note; Cloud Kerberos stays a limited-preview callout.

---

## Guide structure

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Mirror guide 07 exactly | Prerequisites → Known Silent Blockers → Steps → Verification → Config-Caused Failures → See Also | |
| (b) Custom for .mobileconfig (hybrid) | Custom Steps for Custom Template deployment; keep shared suite anchors | ✓ |

**User's choice:** (b) — via adversarial review.
**Notes:** (a) eliminated by a confirmed CRIT — guide 07 is a **Settings Catalog** guide, but KRB-01 mandates Custom Template/.mobileconfig (NOT Settings Catalog); mirroring imports the wrong deployment skeleton. Adversary verified the Finder's "#28 broken-link" objection was **factually false** (guide 07's Config-Caused-Failures table routes to `35-macos-sso-sign-in-failure.md`, not runbook #28). Adversary also disproved the "harness/anchor validator" and "omits silent-blockers" objections against (b) (new file has no validator baseline; guide 07's blockers are PSSO-specific). Resolved as a hybrid: custom Steps + retained shared anchors + K-2 disambiguation box.

---

## On-prem AD prerequisite depth

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Full AD/KDC/DNS-SRV walkthrough | Document on-prem AD setup in-guide | |
| (b) Bounded callout linking out | ≤1-paragraph "prerequisites you own" callout → Apple/Microsoft docs | ✓ |

**User's choice:** (b) — via adversarial review.
**Notes:** (a) eliminated by a confirmed **double CRIT** — direct K-4 over-documentation violation + audience (Intune admins) lacks AD-admin access; deep AD work is deferred KRBFUT-01 (v2). Finder's "too thin" objection against (b) ruled a **false positive**: K-4's prevention strategy *mandates* exactly one link-out callout, which **is** the KRB-01 prerequisite delivery. Carry-forward: still include Intune-admin-facing realm (ALL CAPS) + Hosts array + dependency note; no `nltest`/DC-diagnostic content.

---

## Diagnostics scope

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Lock now | Default `klist` + `app-sso platform -s`; `app-sso kerberos` only if plan-time verified | ✓ |
| (b) Leave to planner | Defer the whole diagnostics decision to research/planning | |

**User's choice:** (a) — via adversarial review.
**Notes:** (b) rejected — re-opens a HIGH-confidence resolved question and removes the guard against the banned `app-sso diagnose`. Finder's "cross-phase leak into Phase 85 runbook #28" objection ruled a **false positive**: RUN-01 lists `app-sso platform -s` / `klist` as runbook #28's own content — shared canonical commands are intended reuse. Carry-forward caveats: pin `klist` invocation (no version-variant flags, K-3); bind `tgt_ad`/`tgt_cloud` output interpretation; include cosmetic "Not signed in" note; `app-sso diagnose` prohibited.

## Claude's Discretion

- Exact section ordering within the custom Steps flow, callout wording, and table layouts — left to planner/executor, subject to the locked anchors and caveats.

## Deferred Ideas

- L2 Kerberos troubleshooting runbook (#28) — Phase 85 (RUN-01)
- macOS capability-matrix Kerberos rows — Phase 85
- Navigation-hub / `quick-ref-l2.md` Kerberos entries — Phase 87
- On-prem-AD-only (non-Entra) Kerberos realm deep-dive — KRBFUT-01 (v2)
- Standalone Kerberos-without-PSSO as a primary path — FEATURES anti-feature (note only)
