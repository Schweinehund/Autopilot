---
status: passed
phase: 52-linux-l2-investigation-runbooks-24-25
goal: L2 Desktop Engineering can investigate Linux Intune agent failures using confirmed log surfaces and service commands, with appropriate confidence caveats on file-based log paths
verified: 2026-04-27
verifier: gsd-verifier (independent)
requirements: [LIN-12]
---

# Phase 52 Verification

## Summary

Independent verification confirms Phase 52 PASSED. All 22 V-52-NN structural assertions pass against the live codebase, all 4 ROADMAP success criteria are satisfied with concrete grep evidence, the 1 LIN-NN requirement (LIN-12) has shipped deliverables traceable in REQUIREMENTS.md §Traceability line 154, and all spot-checked CONTEXT.md decisions (D-01 layered caveat / D-05 trap shape / D-08 L2-direct framing / D-09 L1 cross-link reference-only / D-13 single atomic commit / DPO-01 anchor inheritance / DPO-02 read-vs-write apt) hold in the actual files. No discrepancies found between the executor's self-authored per-plan SUMMARY.md claims and independent re-verification. Phase 52 closed.

## Validator Output (Live Re-Run)

### `check-phase-52.mjs`

```
[1/22] V-52-01: 24-linux-log-collection.md exists ............... PASS -- 16284 bytes
[2/22] V-52-02: 25-linux-agent-investigation.md exists .......... PASS -- 18129 bytes
[3/22] V-52-03: check-phase-52.mjs exists (self-referential) .... PASS -- 18876 bytes
[4/22] V-52-04: 00-index.md exists (append target) .............. PASS -- 19518 bytes
[5/22] V-52-05: both new content files have platform: Linux + audience: L2 + 60-day cycle PASS -- 2 files valid
[6/22] V-52-06: RB24 Decision Matrix Layer 1 — /var/log/microsoft/intune/ row has [LOW-MEDIUM token PASS -- Layer 1 matrix-cell confidence token present
[7/22] V-52-07: RB24 Layer 2 — > **Source confidence:** blockquote with LOW-MEDIUM token and /var/log/microsoft/intune/ proximity PASS -- Layer 2 blockquote with proximity to path
[8/22] V-52-08: RB24 Layer 3 — >=2 inline [LOW-MEDIUM, last_verified tokens at command-snippet level PASS -- 4 Layer 3 inline tokens
[9/22] V-52-09: RB24 PITFALL-3 negative — no `snap install` / `/var/snap/intune-portal/` / `snap container` PASS -- no forbidden snap-install strings
[10/22] V-52-10: RB24 SC#1 positive — journalctl + file paths covered PASS -- all 4 SC#1 literals present
[11/22] V-52-11: RB25 has 4 anchor-indexed Trap H2s ............. PASS -- 4 Trap H2 anchors locked
[12/22] V-52-12: RB25 Trap A SC#2 content — Ubuntu HWE / GA kernel / uname -r PASS -- Trap A SC#2 literals present
[13/22] V-52-13: RB25 Trap C SC#2 content — systemctl status intune-agent / systemctl enable --user --now intune-agent.timer PASS -- Trap C SC#2 literals present
[14/22] V-52-14: RB25 Trap B SC#2 content — snap and deb (delivery path detection) PASS -- Trap B snap-vs-deb literals present
[15/22] V-52-15: RB25 contains >=3 L1 cause-anchor cross-links from locked surface PASS -- 5 L1 cross-links present
[16/22] V-52-16: NEITHER runbook contains L1-only `> **Say to the user:**` blockquote (V-51-24 INVERTED) PASS -- L2 audience contract honored (no L1 narration pattern)
[17/22] V-52-17: NEITHER runbook contains sudo prefix on read-only commands (DPO-Phase52-01 / V-51-20 inheritance) PASS -- read-vs-write apt distinction honored
[18/22] V-52-18: each runbook has >=1 link to ../_glossary-linux.md#<anchor> PASS -- glossary anchor consumption confirmed
[19/22] V-52-19: 00-index.md has Linux L2 Runbooks H2 (positioned AFTER Android H2) + 2 entries PASS -- Linux L2 H2 + 2 entries; correct ordering
[20/22] V-52-20: NEITHER runbook structural text contains BYOD/COBO/COPE/Dedicated/ZTE/AOSP/COSU (PITFALL-1 regression) PASS -- no mode-axis tokens in structural text
[21/22] V-52-21: RB25 does NOT contain `Require device to be marked as compliant` (PITFALL-2 regression — Phase 51 V-51-19 inherited) PASS -- PITFALL-2 phrase absent
[22/22] V-52-22: NEITHER runbook contains TBD/TODO/FIXME/XXX/PLACEHOLDER outside Version History PASS -- no placeholder tokens

Summary: 22 passed, 0 failed, 0 skipped
```

### `v1.5-milestone-audit.mjs --verbose`

```
[1/12] C1: Zero SafetyNet as compliance mechanism ....... PASS
[2/12] C2: Zero supervision as Android mgmt term ........ PASS
[3/12] C3: AOSP stub word count within Phase 39 envelope PASS (informational -- Phase 39 self-certification; body 596 words vs envelope 600-900)
[4/12] C4: Zero Android links in deferred shared files .. PASS
[5/12] C5: last_verified frontmatter on all Android docs PASS
[6/12] C6: PITFALL-7 preservation in AOSP + per-OEM docs PASS
[7/12] C7: bare-"Knox" disambiguation check ............. PASS
[9/12] C9: COPE banned-phrase check ..................... PASS (informational)
[10/12] C10: Linux frontmatter (platform: Linux + 60d last_verified) PASS
[11/12] C11: Ops-domain anti-pattern regex .............. PASS (informational)
[12/12] C12: 4-platform comparison structural validation PASS (informational)
[13/12] C13: Broken-link automation (markdown-link-check) PASS (informational)

Summary: 12 passed, 0 failed, 0 skipped
```

### `regenerate-supervision-pins.mjs --self-test`

```
=== self-test: reproduce Phase 43 hand-authored new-pin set ===
Scanning: 32 Android doc paths
Classifier output: 17 Tier-1 stub-eligible lines, 1 Tier-2 suspected regressions
Phase 43 hand-authored Tier-1 new pins (sidecar - baseline): 9
Classifier Tier-1 new pins (classifier - baseline): 9

Pinned Tier-2 occurrences (classifier Tier-2 but explicitly pinned — known-legitimate):
  ~ docs/_glossary-android.md:76 — ### Supervision

Diff: identical
Un-pinned Tier-2 count: 0 (all supervision occurrences classified or explicitly pinned)
Self-test: PASS
```

All three validators exit 0. No regression introduced by Phase 52.

## Success Criteria Verification

### SC#1: Runbook 24 covers confirmed log surfaces + LOW-MEDIUM caveat blockquote — **VERIFIED**

SC#1 (ROADMAP:222): Runbook 24 covers confirmed log surfaces (`journalctl -u intune-agent`, `journalctl | grep intune-portal`, `/var/log/intune-update.log`, `/var/log/dpkg.log`) with a `> LOW-MEDIUM confidence` freshness caveat blockquote on `/var/log/microsoft/intune/` paths.

**V-52-10 PASS** — All 4 SC#1 literals present in `docs/l2-runbooks/24-linux-log-collection.md`:
- `journalctl -u intune-agent` (4 occurrences: Section 1.1 heading + code blocks)
- `journalctl | grep intune-portal` (1 occurrence: Section 1.2 code block)
- `/var/log/intune-update.log` (9 occurrences: Decision Matrix + Section 2.2)
- `/var/log/dpkg.log` (9 occurrences: Decision Matrix + Section 2.1)

**V-52-06 PASS** (Layer 1) — Decision Matrix row for `/var/log/microsoft/intune/` contains `[LOW-MEDIUM, last_verified 2026-04-27]` token in Confidence column (line 35).

**V-52-07 PASS** (Layer 2) — `> **Source confidence:**` blockquote at line 100 contains `LOW-MEDIUM confidence` and `/var/log/microsoft/intune/` within the nearest-occurrence window (nearest path reference is 2 lines away, well within the 40-line threshold).

**V-52-08 PASS** (Layer 3) — 4 per-line `[LOW-MEDIUM, last_verified 2026-04-27]` tokens at command-snippet level (lines 35, 124, 129, 131). Threshold ≥2 satisfied.

Three-layer freshness caveat surface confirmed intact per D-01 + CDI-Phase52-06.

### SC#2: Runbook 25 covers kernel/distro version traps + service commands — **VERIFIED**

SC#2 (ROADMAP:223): Runbook 25 covers kernel HWE/GA mismatch, `uname -r` identification, snap-vs-deb delivery confusion, `systemctl status intune-agent`, and `systemctl enable --user --now intune-agent.timer`.

**V-52-12 PASS** (Trap A SC#2 content) — Trap A body `## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}` contains:
- `Ubuntu HWE` (2 occurrences)
- `GA kernel` (5 occurrences)
- `uname -r` (11 occurrences: Investigation Steps code blocks + Verification)

**V-52-13 PASS** (Trap C SC#2 content) — Trap C body `## Trap C: Service-State User-Scope Confusion {#trap-c-service-state}` contains:
- `systemctl status intune-agent` (3 occurrences)
- `systemctl enable --user --now intune-agent.timer` (1 occurrence)

**V-52-14 PASS** (Trap B SC#2 content) — Trap B body `## Trap B: Snap-vs-Deb Delivery Path Confusion {#trap-b-delivery-path}` contains both `snap` and `deb` tokens confirming snap-vs-deb detection coverage.

**V-52-11 PASS** — All 4 literal anchor strings present with locked naming per D-06:
```
## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}
## Trap B: Snap-vs-Deb Delivery Path Confusion {#trap-b-delivery-path}
## Trap C: Service-State User-Scope Confusion {#trap-c-service-state}
## Trap D: Identity Broker v2.0.2+ Re-enrollment {#trap-d-identity-broker}
```

### SC#3: 00-index.md has Linux section appended (append-only) — **VERIFIED**

SC#3 (ROADMAP:224): `docs/l2-runbooks/00-index.md` has a `## Linux L2 Runbooks` H2 appended after the Android L2 section with entries for both Runbook 24 and Runbook 25.

**V-52-19 PASS** — Literal `## Linux L2 Runbooks` H2 present AND 2 runbook entries (24-linux-log-collection.md + 25-linux-agent-investigation.md) present AND Linux H2 byte-position is after Android H2 byte-position (Linux H2 at line 165, Android H2 at line 132 — ordering confirmed).

**Append-only contract** — `git diff --cached --stat` for `00-index.md` showed 23 insertions, 0 deletions. All pre-existing H2s intact at original line numbers. No `## Related Resources` or earlier content modified.

### SC#4: check-phase-52.mjs passes; both runbooks have platform: Linux frontmatter on 60-day cycle — **VERIFIED**

SC#4 (ROADMAP:225): `check-phase-52.mjs` passes (all 22 V-52-NN PASS); both runbooks carry `platform: Linux` + `audience: L2` + `last_verified: 2026-04-27` + `review_by: 2026-06-26` on 60-day cycle.

**V-52-03 PASS** — `scripts/validation/check-phase-52.mjs` exists (18876 bytes, self-referential existence check satisfied).

**V-52-05 PASS** (C10 contract per D-04) — Both new content files have all required frontmatter fields:

| File | platform | audience | last_verified | review_by |
|------|----------|----------|---------------|-----------|
| 24-linux-log-collection.md | Linux | L2 | 2026-04-27 | 2026-06-26 |
| 25-linux-agent-investigation.md | Linux | L2 | 2026-04-27 | 2026-06-26 |

Cycle delta: 2026-06-26 − 2026-04-27 = 60 days exactly (C10 gate satisfied). v1.5-milestone-audit.mjs C10 PASS confirmed.

## Phase 51 DPO Inheritance Verification

### DPO-01: L1 cause anchors consumed as reference-only deep-links — **VERIFIED**

Phase 51 DPO-01 mandates Phase 52 L2 runbooks consume Phase 51 L1 cause anchors as locked surfaces, not re-authored cause topology (CDI-Phase52-02 + CDI-Phase52-03 + D-09).

**V-52-15 PASS** — Runbook 25 contains 5 unique L1 cause-anchor cross-links from the locked surface (≥3 required):

| L1 Anchor | Occurrences | Placement |
|-----------|-------------|-----------|
| `30-linux-enrollment-failed.md#cause-a-package-install` | 3 | Context + Trap A Verification + Trap B Verification |
| `30-linux-enrollment-failed.md#cause-b-sign-in-failure` | 2 | Context + Trap D Verification |
| `30-linux-enrollment-failed.md#cause-c-enrollment-timeout` | 1 | Context |
| `33-linux-agent-service-failure.md` | 3 | Context + Trap C Entry + Related Resources |
| `31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure` | 1 | Context |

Cross-tier distinctness per CDI-Phase52-03 confirmed: Trap A/B/C/D bodies document L2 investigation tools (kernel version checks, binary path verification, systemctl disambiguation, dsreg) — not L1 user-facing symptoms (package install failure, sign-in failure, enrollment timeout, agent service failure). The L2 investigation surface is orthogonal to the L1 cause surface.

### DPO-02: read-vs-write apt distinction propagated to L2 — **VERIFIED**

Phase 51 DPO-02 mandates read-vs-write apt distinction propagates to L2: no `sudo` on `apt list`, `dpkg -l`, `systemctl --user`, `journalctl --user` except inside `### Resolution` sections for state-changing commands.

**V-52-17 PASS** — Neither runbook contains `sudo apt list`, `sudo dpkg -l`, `sudo systemctl --user`, or `sudo journalctl --user` outside `### Resolution` sections. Confirmed by the validator's section-boundary stripping logic.

Sample confirmation:
- `sudo systemctl restart intune-agent` (Trap C Resolution) — permitted (state-changing, inside `### Resolution`)
- `sudo journalctl -u microsoft-identity-device-broker` (Trap D Investigation Step 4) — permitted (system-scope journal read, not `--user` scope)
- `apt list --installed | grep intune-portal` (Trap B Investigation) — no sudo prefix (read-only; PASS)
- `dpkg -l intune-portal` (Trap A Investigation) — no sudo prefix (read-only; PASS)

## CONTEXT.md Spot Checks

| Decision | Check | Result |
|----------|-------|--------|
| **D-01** (3-layer LOW-MEDIUM caveat) | V-52-06 + V-52-07 + V-52-08 all PASS | **PASS** — Layer 1 (matrix-cell), Layer 2 (blockquote), Layer 3 (4 per-line tokens) all present in Runbook 24 |
| **D-05** (4 anchor-indexed Traps) | V-52-11 PASS: 4 literal anchors `{#trap-a-kernel-track}`, `{#trap-b-delivery-path}`, `{#trap-c-service-state}`, `{#trap-d-identity-broker}` | **PASS** — all 4 Trap H2 anchors locked per D-06 naming convention |
| **D-08** (L2-direct framing — no L1 narration) | V-52-16 PASS: `> **Say to the user:**` absent from both runbooks | **PASS** — 0 occurrences across RB24 + RB25; consistent with 0/23 in existing L2 corpus |
| **D-13** (single atomic commit) | `git log -1 --stat HEAD~0` shows 8 files in one commit (4 deliverables + 4 SUMMARY.md files) | **PASS** — commit `38e25e9` lands all Phase 52 outputs atomically; append-only assertion at 00-index.md is satisfied in the same commit as its validator |

## DPO-Phase52-NN Propagation Summary (for Phase 56+ plan authors)

The following downstream phase obligations were established during Phase 52 adversarial review. Phase 56+ plan authors MUST read this section before authoring plans that consume Phase 52 outputs.

**DPO-Phase52-01** — Phase 56 (DRIFT-07 Linux drift fold) inherits the read-vs-write apt distinction (Phase 51 DPO-02 cascade) and the freshness-caveat layered-defense pattern (D-01). Any new file-path claim in Phase 56 with a Microsoft Learn coverage gap MUST replicate the three-layer caveat surface: Layer 1 matrix-cell `[LOW-MEDIUM` confidence token + Layer 2 `> **Source confidence:**` blockquote + Layer 3 per-line inline tokens. No sudo on `apt list` / `dpkg -l` / `systemctl --user` / `journalctl --user` outside state-changing `### Resolution` H3 sections.

**DPO-Phase52-02** — Phase 58 (DEFER-08 4-platform capability comparison Linux row) consumes Runbook 24/25 anchor surface for ops/log columns. L2-tier columns must link to `24-linux-log-collection.md#section-1-journalctl` / `25-linux-agent-investigation.md#trap-a-kernel-track` per PITFALL-7 link-not-copy. Phase 58 plan author MUST treat Phase 52 Section/Trap anchors as immutable; renaming any anchor requires same-commit Phase 52 validator update (D-06 + D-12 brittleness contract).

**DPO-Phase52-03** — Phase 59 (CLEAN-08 hub navigation + Linux + Operations sections) consumes Phase 52 anchor surface. `docs/index.md` Linux H2 ops section + `docs/common-issues.md` Linux symptom routing + `docs/quick-ref-l2.md` Linux quick-reference must link to Runbook 24/25 anchors by stable name. Phase 59 plan author MUST run anchor inventory against Phase 52 outputs BEFORE authoring hub Linux ops sections (mirrors Phase 51 DPO-05 shape).

**DPO-Phase52-04** — Phase 60 (audit harness finalization) registers `check-phase-52.mjs` in `.github/workflows/audit-harness-v1.5-integrity.yml` per AUDIT-06 contract. C13 broken-link automation runs against Phase 52 cross-link surface (~6-8 cross-links per runbook: L1 cause anchors + glossary anchors + Phase 50 capability-matrix anchors + within-doc Trap/Section anchors). Phase 60 plan author runs C13 sweep against Phase 52 outputs as part of the v1.5 close audit.

**DPO-Phase52-05** — v1.5.1 (LIN-DEFER-01 Linux Bash custom-compliance deep-dive) inherits L2 actor-framing and read-vs-write apt distinction. The Bash deep-dive guide MUST use L2-direct framing (no `> **Say to the user:**`) per CDI-Phase52-05; user-context read-only discipline per Phase 51 DPO-06 + Phase 52 D-08. v1.5.1 plan author inherits Phase 51 GA-3B sub-rule + Phase 52 D-08 audience contract.

**DPO-Phase52-06** — Phase 52 internal: single-commit atomicity satisfied per D-13 + CDI-Phase52-04 + CDI-Phase52-07. Validator V-52-19 append-only assertion at `00-index.md` forced single-commit; PITFALL-12 motivation does not apply (append target is not in supervision sidecar). Goldilocks-rule per Phase 51 DPO-07 precedent. Commit `38e25e9` confirms.

**DPO-Phase52-07** — Phase 56 inherits the Phase 52 freshness-caveat layered-defense pattern (D-01 three-layer shape) for any new file-path claims. If Phase 56 documents `/var/log/microsoft/intune/` extensions for drift detection or adds any new Linux ops file-path with similar Microsoft Learn coverage gap, Phase 56 plan author MUST replicate the D-01 three-layer caveat surface per CDI-Phase52-06.

**DPO-Phase52-08** — Phase 58/59 Linux row CA cell inherits PITFALL-2 layered defense via Phase 51 DPO-04 cascade. Anti-regression chain: Phase 51 V-51-19 → Phase 52 V-52-21 → Phase 58 carry-forward. Phase 58 4-platform Linux CA cell MUST contain "web-app CA only — no device-level CA grant" verbatim AND link to `linux-capability-matrix.md#conditional-access` per CDI-Phase51-03. Phase 52 does NOT re-introduce CA topic in Runbook 24/25 (V-52-21 PASS evidences negative regression-guard holds).

## Atomic Commit Reference

### Commit Details

| Field | Value |
|-------|-------|
| Commit hash (full) | `38e25e9c50d650cd64fc441da90eec169b8ae142` |
| Commit hash (short) | `38e25e9` |
| Commit subject | `docs(52): linux L2 log-collection + agent-investigation runbooks 24-25 + check-phase-52 validator + 00-index append-only edit` |
| Files changed | 8 (4 deliverables + 4 SUMMARY.md files) |
| Insertions | 1535 (all additions; 0 deletions) |
| Closes | LIN-12, AUDIT-06 |

### Files Shipped

| File | Type | Deliverable |
|------|------|-------------|
| `docs/l2-runbooks/24-linux-log-collection.md` | new | LIN-12 part 1; SC#1; Decision-Matrix-with-method-sections; 3-layer LOW-MEDIUM caveat |
| `docs/l2-runbooks/25-linux-agent-investigation.md` | new | LIN-12 part 2; SC#2; anchor-indexed 4-Trap H2; L2-direct framing |
| `scripts/validation/check-phase-52.mjs` | new | AUDIT-06; 22 V-52-NN checks; file-reads-only |
| `docs/l2-runbooks/00-index.md` | modified | Linux L2 Runbooks H2 + When-to-Use table + L1 Escalation Mapping appended; append-only |
| `.planning/phases/52-.../52-01-SUMMARY.md` | new | Plan 01 summary (Runbook 24 authoring) |
| `.planning/phases/52-.../52-02-SUMMARY.md` | new | Plan 02 summary (Runbook 25 authoring) |
| `.planning/phases/52-.../52-03-SUMMARY.md` | new | Plan 03 summary (check-phase-52.mjs authoring) |
| `.planning/phases/52-.../52-04-SUMMARY.md` | new | Plan 04 summary (00-index.md append-only edit) |

## Conclusion

Phase 52 PASSED. All 22 V-52-NN structural assertions are satisfied. All 4 ROADMAP success criteria (SC#1-SC#4) have concrete grep evidence. LIN-12 requirement is traceable to `24-linux-log-collection.md + 25-linux-agent-investigation.md` per REQUIREMENTS.md §Traceability line 154. AUDIT-06 is satisfied by `check-phase-52.mjs`.

Phase 56 plan author may consume Phase 52 outputs as locked surfaces (Runbook 24 Section anchors + Runbook 25 Trap anchors). Phase 60 audit harness finalization should register `check-phase-52.mjs` in CI per DPO-Phase52-04. Phase 58/59 plan authors should read DPO-Phase52-02/03/08 before authoring Linux row content.

## VERIFICATION PASSED
