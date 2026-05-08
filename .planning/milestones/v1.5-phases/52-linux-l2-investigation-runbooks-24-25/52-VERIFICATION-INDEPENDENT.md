---
status: passed
phase: 52-linux-l2-investigation-runbooks-24-25
verified: 2026-04-27
verifier: gsd-verifier (independent re-verification)
requirements: [LIN-12]
---

# Phase 52: Independent Verification Re-Run

**Phase Goal:** L2 Desktop Engineering can investigate Linux Intune agent failures using confirmed log surfaces and service commands, with appropriate confidence caveats on file-based log paths
**Verified:** 2026-04-27
**Status:** PASSED
**Verifier:** gsd-verifier (independent — separate from executor's self-authored 52-VERIFICATION.md)

This report re-runs all checks from scratch against the live committed codebase. It does not rely on the executor's 52-VERIFICATION.md for any evidence — every claim below is independently obtained.

---

## 1. Validator Re-Run Output (Literal)

### `node scripts/validation/check-phase-52.mjs`

```
[1/22] V-52-01: 24-linux-log-collection.md exists ............... PASS
[2/22] V-52-02: 25-linux-agent-investigation.md exists .......... PASS
[3/22] V-52-03: check-phase-52.mjs exists (self-referential) .... PASS
[4/22] V-52-04: 00-index.md exists (append target) .............. PASS
[5/22] V-52-05: both new content files have platform: Linux + audience: L2 + 60-day cycle PASS
[6/22] V-52-06: RB24 Decision Matrix Layer 1 — /var/log/microsoft/intune/ row has [LOW-MEDIUM token PASS
[7/22] V-52-07: RB24 Layer 2 — > **Source confidence:** blockquote with LOW-MEDIUM token and /var/log/microsoft/intune/ proximity PASS
[8/22] V-52-08: RB24 Layer 3 — >=2 inline [LOW-MEDIUM, last_verified tokens at command-snippet level PASS
[9/22] V-52-09: RB24 PITFALL-3 negative — no `snap install` / `/var/snap/intune-portal/` / `snap container` PASS
[10/22] V-52-10: RB24 SC#1 positive — journalctl + file paths covered PASS
[11/22] V-52-11: RB25 has 4 anchor-indexed Trap H2s ............. PASS
[12/22] V-52-12: RB25 Trap A SC#2 content — Ubuntu HWE / GA kernel / uname -r PASS
[13/22] V-52-13: RB25 Trap C SC#2 content — systemctl status intune-agent / systemctl enable --user --now intune-agent.timer PASS
[14/22] V-52-14: RB25 Trap B SC#2 content — snap and deb (delivery path detection) PASS
[15/22] V-52-15: RB25 contains >=3 L1 cause-anchor cross-links from locked surface PASS
[16/22] V-52-16: NEITHER runbook contains L1-only `> **Say to the user:**` blockquote (V-51-24 INVERTED) PASS
[17/22] V-52-17: NEITHER runbook contains sudo prefix on read-only commands (DPO-Phase52-01 / V-51-20 inheritance) PASS
[18/22] V-52-18: each runbook has >=1 link to ../_glossary-linux.md#<anchor> PASS
[19/22] V-52-19: 00-index.md has Linux L2 Runbooks H2 (positioned AFTER Android H2) + 2 entries PASS
[20/22] V-52-20: NEITHER runbook structural text contains BYOD/COBO/COPE/Dedicated/ZTE/AOSP/COSU (PITFALL-1 regression) PASS
[21/22] V-52-21: RB25 does NOT contain `Require device to be marked as compliant` (PITFALL-2 regression — Phase 51 V-51-19 inherited) PASS
[22/22] V-52-22: NEITHER runbook contains TBD/TODO/FIXME/XXX/PLACEHOLDER outside Version History PASS

Summary: 22 passed, 0 failed, 0 skipped
```

Exit code: 0

### `node scripts/validation/v1.5-milestone-audit.mjs --verbose`

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

Exit code: 0

### `node scripts/validation/regenerate-supervision-pins.mjs --self-test`

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

Exit code: 0

All three validators exit 0. No regression introduced by Phase 52.

---

## 2. Success Criteria Coverage Table (Independent grep counts)

### SC#1 — Runbook 24 confirmed log surfaces + LOW-MEDIUM caveat blockquote

| Literal | Independent grep count | Location |
|---------|----------------------|----------|
| `journalctl -u intune-agent` | 4 | Sections 1.1 heading + code blocks |
| `journalctl \| grep intune-portal` | 1 | Section 1.2 code block |
| `/var/log/intune-update.log` | 9 | Decision Matrix + Section 2.2 |
| `/var/log/dpkg.log` | 9 | Decision Matrix + Section 2.1 |
| `LOW-MEDIUM confidence` (anywhere) | 5 | Tool Landscape blockquote, Decision Matrix row, Method Selection, Section 2 header, Section 2.3 prose |
| `> **Source confidence:**` blockquote (literal) | 1 | Line 100 of RB24 |
| `[LOW-MEDIUM, last_verified` tokens (Layer 3) | 4 | Lines 35, 124, 129, 131 — threshold >=2 satisfied |

**SC#1 verdict: VERIFIED.** The `> LOW-MEDIUM confidence` blockquote required by ROADMAP:222 is present as `> **Source confidence:** ... LOW-MEDIUM confidence`. The blockquote is at line 100 of RB24, within Section 2 (file-based paths), which is precisely where it is load-bearing — immediately before the `/var/log/microsoft/intune/` subsection. The caveat is also visible at the Tool Landscape level (line 28) and in the Decision Matrix (line 35), making it discoverable before an L2 engineer reads deep into Section 2.

### SC#2 — Runbook 25 kernel/distro traps + service commands

| Literal | Independent grep count | Trap |
|---------|----------------------|------|
| `Ubuntu HWE` | 2 | Trap A body |
| `GA kernel` | 5 | Trap A body |
| `uname -r` | 11 | Trap A body (Investigation Steps + Verification) |
| `snap` (Trap B body) | 19 | Trap B body |
| `deb` (Trap B body) | 15 | Trap B body |
| `systemctl status intune-agent` | 3 | Trap C body |
| `systemctl enable --user --now intune-agent.timer` | 1 | Trap C Resolution |

**SC#2 verdict: VERIFIED.** All 5 verbatim SC#2 tokens (HWE/GA kernel, `uname -r`, snap-vs-deb, `systemctl status intune-agent`, `systemctl enable --user --now intune-agent.timer`) are present in the correct Trap H2 bodies.

### SC#3 — 00-index.md Linux section appended (append-only)

Independent check: `grep -n "## Android L2 Runbooks\|## Linux L2 Runbooks" docs/l2-runbooks/00-index.md`

```
132:## Android L2 Runbooks
165:## Linux L2 Runbooks
```

Android H2 at line 132; Linux H2 at line 165. Ordering confirmed. Two runbook entries (24 + 25) verified in the When to Use table. Append-only confirmed: `git show 38e25e9 -- docs/l2-runbooks/00-index.md` shows 23 insertions, 0 deletions in that file.

**SC#3 verdict: VERIFIED.**

### SC#4 — check-phase-52.mjs passes; both runbooks carry C10 frontmatter on 60-day cycle

Frontmatter confirmed by direct file read:

| File | platform | audience | last_verified | review_by | Cycle delta |
|------|----------|----------|---------------|-----------|-------------|
| 24-linux-log-collection.md | Linux | L2 | 2026-04-27 | 2026-06-26 | 60 days |
| 25-linux-agent-investigation.md | Linux | L2 | 2026-04-27 | 2026-06-26 | 60 days |

Validator exit 0 with 22/22 PASS confirmed above.

**SC#4 verdict: VERIFIED.**

---

## 3. Goal-Backward Assessment

**Question:** Can a hypothetical L2 engineer actually diagnose Linux Intune agent failures using only what's documented?

**Finding: YES.** Structural evidence:

1. **Entry conditions are precise and observable.** Each Trap H2 in RB25 opens with a `**Entry condition:**` paragraph specifying exactly which signal from the L1 escalation packet matches that trap (e.g., Trap A: "`uname -r` output with a kernel version that does not match the Ubuntu release's GA kernel band"; Trap C: "user reports `intune-agent` is 'not running'"). An L2 engineer with an L1 packet can select the correct trap without reading others.

2. **Traps are independently diagnosable.** RB25 line 30 states this explicitly: "Traps are independently diagnosable — you do not need to rule out prior traps." The "How to Use This Runbook" section provides a direct anchor-linked table of contents. An L2 engineer can jump to Trap C without reading Trap A. Each trap has its own entry condition, investigation steps, resolution, and verification — no shared state between traps.

3. **Caveat structure is load-bearing and visible.** The LOW-MEDIUM caveat for `/var/log/microsoft/intune/` appears at three layers across four locations in RB24: the Tool Landscape blockquote (line 28, visible before the Decision Matrix), the Decision Matrix row (line 35, visible at method-selection time), the Source confidence blockquote (line 100, at the top of Section 2 before the subsection), and per-command inline tokens (lines 129, 131). An L2 engineer cannot reach the `/var/log/microsoft/intune/` commands without passing through at least two caveat instances. The caveat is not buried.

4. **LIN-12 requirement fully satisfied.** REQUIREMENTS.md line 35 lists exactly the log paths and service commands that LIN-12 requires; REQUIREMENTS.md line 154 maps LIN-12 to `24-linux-log-collection.md + 25-linux-agent-investigation.md`. All listed paths and commands are present in the committed files with independent grep confirmation.

---

## 4. CONTEXT.md Decision Spot-Checks (6 decisions)

| Decision | What was checked | Independent finding |
|----------|-----------------|-------------------|
| **D-01** (3-layer LOW-MEDIUM caveat) | grep for `[LOW-MEDIUM` in Decision Matrix (Layer 1); `> **Source confidence:**` blockquote (Layer 2); `[LOW-MEDIUM, last_verified` per-line tokens (Layer 3) | HONORED. Layer 1: 1 matrix-cell occurrence at line 35 in `/var/log/microsoft/intune/` row. Layer 2: 1 blockquote at line 100. Layer 3: 4 per-line tokens at lines 35, 124, 129, 131. All three layers present. |
| **D-05** (4 Trap H2 anchors with literal strings) | grep for `^## Trap ` in RB25 | HONORED. Exact literals: `## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}` (line 37), `## Trap B: Snap-vs-Deb Delivery Path Confusion {#trap-b-delivery-path}` (line 105), `## Trap C: Service-State User-Scope Confusion {#trap-c-service-state}` (line 170), `## Trap D: Identity Broker v2.0.2+ Re-enrollment {#trap-d-identity-broker}` (line 254). All 4 anchor strings match D-06 naming convention exactly. |
| **D-08** (no `> **Say to the user:**` blockquote in L2 runbooks) | `grep -c "Say to the user"` on both RB24 and RB25 | HONORED. RB24: 0 occurrences. RB25: 0 occurrences. L2 audience contract intact. |
| **D-09** (reference-only L1 cross-links, no cause-topology import) | grep for L1 anchors in RB25; grep for L1-style `## Cause` headers | HONORED. 5 unique L1 cause-anchor cross-links present (lines 21-25 of RB25 context block). Zero `## Cause X:` H2 headers in RB25. L2 Trap bodies contain investigation commands and techniques, not duplicated L1 symptom descriptions. RB25 line 17 explicitly documents cross-tier distinctness. |
| **D-13** (single atomic commit at 38e25e9) | `git log --oneline --stat 38e25e9 -1` | HONORED. Commit `38e25e9c50d650cd64fc441da90eec169b8ae142` contains 8 files changed, 1535 insertions(+), 0 deletions. All 4 deliverables (RB24 + RB25 + validator + 00-index.md append) landed in one commit. The commit message documents the D-13 atomicity rationale explicitly. |
| **V-52-21 inheritance** (PITFALL-2 phrase `Require device to be marked as compliant` absent from RB25) | `grep -c "Require device to be marked as compliant" docs/l2-runbooks/25-linux-agent-investigation.md` | HONORED. Count: 0. The Phase 51 V-51-19 anti-regression guard transfers correctly to Phase 52 — Runbook 25 does not re-introduce device-level CA framing. |

All 6 spot-checked decisions are honored in the actual files.

---

## 5. Discrepancy Summary

**No discrepancies found between executor's self-report (52-VERIFICATION.md) and independent re-verification.**

The executor's claimed validator output matches the live re-run output line-for-line. The executor's grep counts (V-52-10: 4 journalctl occurrences; V-52-08: 4 Layer 3 tokens; V-52-12: 2 Ubuntu HWE, 5 GA kernel, 11 uname -r; V-52-13: 3 systemctl status, 1 enable; V-52-15: 5 L1 cross-links; V-52-19: Android H2 at 132, Linux H2 at 165) all match the independently obtained counts above. The commit hash `38e25e9`, file count (8), and insertion count (1535) all match git history exactly. LIN-12 checkbox status [x] and traceability line 154 in REQUIREMENTS.md both confirmed independently.

---

## 6. Final Verdict

**PASSED**

- 22/22 V-52-NN structural assertions: PASS (live re-run)
- 4/4 ROADMAP success criteria: VERIFIED (independent grep)
- 1/1 LIN-NN requirement (LIN-12): SATISFIED (REQUIREMENTS.md lines 35 + 154 confirmed)
- 6/6 CONTEXT.md decisions spot-checked: HONORED
- 3/3 milestone validators exit 0
- Goal-backward assessment: L2 engineer can independently diagnose Linux Intune agent failures using the committed runbooks, with caveat structure visible at multiple layers before reaching file-based path commands

Phase 52 is closed.

---

_Independently verified: 2026-04-27_
_Verifier: gsd-verifier (independent re-verification — separate from executor's 52-VERIFICATION.md)_
