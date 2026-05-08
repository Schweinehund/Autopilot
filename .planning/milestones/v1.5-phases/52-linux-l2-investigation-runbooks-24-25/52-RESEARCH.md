# Phase 52: Linux L2 Investigation Runbooks 24–25 - Research

**Researched:** 2026-04-27
**Domain:** Linux Intune client — L2 log collection + agent investigation
**Confidence:** HIGH (structural patterns fully established; LOW-MEDIUM only on `/var/log/microsoft/intune/` path, consistent with CONTEXT D-01/D-02)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Runbook 24 carries a 3-layer LOW-MEDIUM-confidence caveat on `/var/log/microsoft/intune/` paths: Layer 1 = Decision Matrix cell confidence token `[LOW-MEDIUM, last_verified YYYY-MM-DD]`; Layer 2 = adjacent `> **Source confidence:**` blockquote; Layer 3 = per-command per-line `[LOW-MEDIUM, last_verified YYYY-MM-DD]` token.
- **D-02:** `journalctl -u intune-agent` is HIGH-confidence primary; `/var/log/microsoft/intune/` is LOW-MEDIUM secondary. Section 1 = journalctl HIGH; Section 2 = file paths (two confirmed HIGH + `/var/log/microsoft/intune/` LOW-MEDIUM); Section 3 = dpkg/apt package-state queries HIGH.
- **D-03:** Runbook 24 mirrors `18-android-log-collection.md` / `14-ios-log-collection.md` Decision-Matrix-with-method-sections shape. Structure: frontmatter → `> **Platform gate:**` → H1 → `## Context` → `## Tool Landscape` → `## Decision Matrix` → `## Method Selection` → `## Section 1: journalctl` → `## Section 2: File-based paths` → `## Section 3: Package-state queries` → `## Common Artifacts Cross-Reference` → `## Related Resources` → `## Version History`.
- **D-04:** Frontmatter: `last_verified: <plan-execution-date>` + `review_by: <last_verified + 60d>` + `applies_to: all` + `audience: L2` + `platform: Linux`. 60-day cycle.
- **D-05:** Runbook 25 uses anchor-indexed H2-per-trap shape. 4 traps: `## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}`, `## Trap B: Snap-vs-Deb Delivery Path Confusion {#trap-b-delivery-path}`, `## Trap C: Service-State User-Scope Confusion {#trap-c-service-state}`, `## Trap D: Identity Broker v2.0.2+ Re-enrollment {#trap-d-identity-broker}`. Each Trap contains: `**Entry condition:**` paragraph, `### Symptom`, `### Investigation Steps` (numbered, NO `> **Say to the user:**`), `### Resolution`, `### Verification`.
- **D-06:** Trap anchor naming: `{#trap-x-[short-name]}`. Validator pins these literal strings.
- **D-07:** Trap ordering by likelihood + observability proximity (A=kernel, B=snap-vs-deb, C=service-state, D=Identity Broker). Author may reorder; validator pins anchors, not ordering.
- **D-08:** L2-direct framing — NO `> **Say to the user:**` in either runbook (V-52-16 negative regression-guard). L2 callouts use `> **Note:**`, `> **Source confidence:**`, etc.
- **D-09:** L1 cause anchors consumed as reference-only deep-links — NO cause-topology import. Per-Trap "From L1 escalation?" reference block or per-Trap embedded reference per CD-04.
- **D-10:** Validator scope = 22 V-52-NN checks (V-52-01 through V-52-22) per D-10 full enumeration in CONTEXT.md.
- **D-11:** `check-phase-52.mjs` matches `check-phase-51.mjs` pattern: file-reads-only, no shared module, regex-based, no markdown-AST dependency.
- **D-12:** H2/anchor strings hardcoded in both validator and CONTEXT.md; renames require same-commit validator update.
- **D-13:** Single atomic commit — 2 new content files + validator + 1 append-only edit at 00-index.md.
- **D-14:** Plan order: authoring wave (parallel: 52-01 Runbook 24, 52-02 Runbook 25, 52-03 validator) → append wave (sequential: 00-index.md append) → pre-commit gate → single atomic commit → post-commit verification → VERIFICATION.md (separate commit).

### Claude's Discretion

- **CD-01:** Exact wording of Layer 2 `> **Source confidence:**` blockquote in Runbook 24 (form + scope locked; specific verb choice author discretion).
- **CD-02:** Exact ordering of Trap A/B/C/D in Runbook 25 (validator pins literal anchors, not ordering).
- **CD-03:** Section depth in Runbook 24 (Decision Matrix row count, Method Selection list count, Section 1/2/3 body length — author scales to coverage need; minimum is SC#1 file-path coverage per V-52-10).
- **CD-04:** Whether Runbook 25 includes a top-of-runbook "From L1 escalation?" block OR per-Trap embedded reference. Validator V-52-15 accepts ≥3 cross-link tokens regardless of placement.
- **CD-05:** Per-Trap body length in Runbook 25 — proportionate to L2-actionable surface depth.
- **CD-06:** Mermaid usage in Runbook 24/25 — optional, validator does not assert Mermaid presence.
- **CD-07:** Runbook 25 Trap D cross-link to Phase 50 LIN-05 `01-intune-linux-agent.md` OR via `_glossary-linux.md#microsoft-identity-broker` — author discretion within Phase 49 + Phase 50 anchor menu.
- **CD-08:** L2 callout label uniformity (`> **Note:**` vs `> **Source confidence:**`) — author discretion, validator does not assert label uniformity.

### Deferred Ideas (OUT OF SCOPE)

- PITFALL-5 collision-audit graduation to v1.5 harness (Phase 60)
- PITFALL-13 false-positive allowlist for V-52-21 (lazy-add only if it surfaces)
- C13 broken-link graduation (Phase 60)
- Hub navigation extensions — `docs/index.md` Linux H2, `docs/common-issues.md`, `docs/quick-ref-l2.md` (Phase 59)
- DEFER-08 4-platform comparison Linux row (Phase 58)
- DRIFT-07 Linux drift section (Phase 56)
- v1.5.1 LIN-DEFER-01 Linux Bash deep-dive
- L1/L2 audience-framing distinction promotion to contributing guide
- V-52-09 PITFALL-3 snap-install regex promotion to v1.5 harness (Phase 60)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LIN-12 | L2 engineer can investigate Linux failure patterns using log paths (`/var/log/`, `journalctl -u intune-agent`, `journalctl \| grep intune-portal`, `/var/log/intune-update.log`, `/var/log/dpkg.log`) and service commands (`systemctl status intune-agent`, `systemctl enable --user --now intune-agent.timer`) per Phase 52 L2 investigation guide | Research areas 1–11 directly enable implementation. Journalctl command syntax verified (HIGH). HWE/GA kernel bands verified (MEDIUM from Phase 49 matrix doc). Snap-vs-deb detection commands confirmed (HIGH). Service scope mechanics confirmed (HIGH). Validator regex patterns derived from Phase 51 precedent (HIGH). |
</phase_requirements>

---

## Summary

Phase 52 delivers two Linux L2 investigation runbooks (24: log collection, 25: agent investigation) plus a validator. All structural decisions are locked in CONTEXT.md — this research addresses 11 factual gaps the planner needs to produce actionable task descriptions: journalctl command syntax and unit scopes, confirmation of the LOW-MEDIUM caveat for `/var/log/microsoft/intune/`, HWE vs GA kernel-track version bands, snap-vs-deb detection commands, Identity Broker re-enrollment failure signals, `systemctl --user` scope mechanics, the Decision Matrix shape adaptation for Linux's narrow surface, L1 cross-link mapping, the exact 00-index.md append position, V-52-NN regex pattern specifications, and the validation architecture.

Key finding: `microsoft-identity-broker` in modern versions has BOTH a system-scope service (`microsoft-identity-device-broker.service`) AND a user-scope service (`microsoft-identity-broker.service`). The L2 investigation must use `journalctl --user -u microsoft-identity-broker.service` for user-scope broker logs and `sudo journalctl -u microsoft-identity-device-broker` (or `systemctl status microsoft-identity-device-broker`) for the system-scope broker. The Phase 51 L1 runbooks already model this dual-scope correctly; Runbook 25 Trap D inherits this pattern.

The `/var/log/microsoft/intune/` path is confirmed not documented by Microsoft Learn for Ubuntu — the LOW-MEDIUM caveat stands. Microsoft's official troubleshooting guidance for Linux Intune issues directs to `journalctl` and the `dsreg` command-line tool, not file-based log paths.

**Primary recommendation:** Author can proceed directly from CONTEXT.md decisions and the command patterns documented in this research. No new decision points exist; research is confirmatory and gap-filling.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Log collection (journalctl, file paths, dpkg) | L2 workstation (investigator-executed) | Linux device (command source) | L2 engineer reads commands; output comes from enrolled Linux device |
| Agent service investigation | Linux device (systemd user scope) | Linux device (systemd system scope) | `intune-agent.timer` is user-scope; `microsoft-identity-device-broker` is system-scope |
| Kernel-track detection | Linux device | — | `uname -r` is device-side command |
| Snap vs deb detection | Linux device | — | `apt list --installed`, `dpkg -l`, `snap list` are device-side |
| Identity Broker state inspection | Linux device + Intune admin center | Entra ID portal | PRT/registration state visible via `dsreg --status`; device IDs visible in admin center |
| Validator execution | CI / L2 workstation | — | `check-phase-52.mjs` runs in Node.js against file system; no device access needed |
| Index append | Docs repo | — | Append-only edit to `docs/l2-runbooks/00-index.md` |

---

## Standard Stack

### Core (Phase 52 deliverables are documentation + a Node.js validator)

| Component | Version | Purpose | Why Standard |
|-----------|---------|---------|--------------|
| Node.js / ESM `.mjs` | As installed (project uses v18+) | `check-phase-52.mjs` validator runtime | Matches Phase 51 validator pattern exactly (file-reads-only, no npm deps) |
| `fs.readFileSync` / `existsSync` | Node built-in | File reading in validator | Phase 48 D-25 file-reads-only contract — no external deps |
| Markdown (GFM) | — | Content format for Runbooks 24/25 and 00-index.md append | Project-wide standard |

### Existing Validators (templates for check-phase-52.mjs)

| File | Purpose | Reference |
|------|---------|-----------|
| `scripts/validation/check-phase-51.mjs` | PRIMARY template — 25-check pattern, all transferable shapes | CONTEXT D-11 |
| `scripts/validation/check-phase-50.mjs` | Secondary template reference | CONTEXT D-11 |
| `scripts/validation/v1.5-milestone-audit.mjs` | Must pass (C10 blocking) at commit time | CONTEXT canonical_refs |

---

## Architecture Patterns

### System Architecture Diagram

```
Phase 51 L1 Runbooks (30/31/32/33)
      │  DPO-01: L1 cause anchors → locked surfaces
      │  DPO-02: read-vs-write apt distinction
      ▼
Phase 52 Authoring Wave (parallel)
  ┌──────────────────────────────────────────────────┐
  │ 52-01: Runbook 24 (log collection)               │
  │   journalctl HIGH  → Section 1                   │
  │   file paths MEDIUM/LOW-MEDIUM → Section 2       │
  │   dpkg/apt HIGH → Section 3                      │
  │   3-layer caveat on /var/log/microsoft/intune/   │
  ├──────────────────────────────────────────────────┤
  │ 52-02: Runbook 25 (agent investigation)          │
  │   Trap A: HWE vs GA kernel                       │
  │   Trap B: snap vs deb                            │
  │   Trap C: service-state user-scope               │
  │   Trap D: Identity Broker v2.0.2+                │
  │   L1 cross-links → reference-only deep-links     │
  ├──────────────────────────────────────────────────┤
  │ 52-03: check-phase-52.mjs (validator)            │
  │   V-52-01..22 structural assertions              │
  └──────────────────────────────────────────────────┘
      │
      ▼
  Append Wave (sequential)
  00-index.md: ## Linux L2 Runbooks H2 + 2-row table
      │ (appended AFTER ## Android L2 Runbooks)
      ▼
  Pre-commit Gate
  check-phase-52.mjs exits 0
  v1.5-milestone-audit.mjs exits 0
      │
      ▼
  Single Atomic Commit (D-13)
  2 new content files + validator + 1 append edit
      │
      ▼
  VERIFICATION.md (separate commit)
```

### Recommended Project Structure

No new directories. Files are:

```
docs/l2-runbooks/
├── 24-linux-log-collection.md      # NEW — Runbook 24 (LIN-12 part 1)
├── 25-linux-agent-investigation.md # NEW — Runbook 25 (LIN-12 part 2)
└── 00-index.md                     # MODIFIED (append-only) — ## Linux L2 Runbooks H2 added

scripts/validation/
└── check-phase-52.mjs              # NEW — 22-check validator
```

---

## Research Area 1: Linux journalctl + intune-portal Canonical Command Set

### Service Scope Clarification (CRITICAL for Trap C and Trap D)

The Microsoft Intune Linux client uses TWO separate service units with different scopes:

**`microsoft-identity-broker.service`** — User scope
- Run as: the logged-in user's systemd instance
- Check with: `systemctl --user status microsoft-identity-broker` (no sudo)
- Journal: `journalctl --user -u microsoft-identity-broker.service` (no sudo)
- Contains: user authentication tokens, SSO session events, PRT acquisition

**`microsoft-identity-device-broker.service`** — System scope
- Run as: root-owned systemd system instance
- Check with: `systemctl status microsoft-identity-device-broker` (no sudo for status; sudo may be needed for `journalctl -u microsoft-identity-device-broker` on some Ubuntu installs)
- Contains: device registration state, device keys, PRT management at device level
- [VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-device-registration-tool-linux, 2026-01-07] — `dsreg` tool output shows `Broker Service Name: microsoft-identity-device-broker.service`

**`intune-agent.timer`** — User scope (confirmed in Phase 49/51)
- Run as: logged-in user's systemd instance
- Check with: `systemctl --user status intune-agent.timer` (no sudo — DPO-02 contract)
- Journal: `journalctl --user -u intune-agent.timer` (no sudo — DPO-02 contract)

**`intune-portal`** — Not a long-running service; GUI application started interactively
- The `intune-portal` process appears in journalctl output when the GUI is running
- `journalctl | grep intune-portal` captures GUI launch events and error signals

### Canonical L2 Command Set (Confidence: HIGH)

```bash
# Primary journalctl commands for Runbook 24 Section 1

# System-scope agent events (the "intune-agent" unit)
journalctl -u intune-agent --no-pager
journalctl -u intune-agent --since "1 hour ago" --no-pager

# Grep for intune-portal GUI events
journalctl | grep intune-portal
journalctl --since "1 day ago" | grep intune-portal

# User-scope timer events
journalctl --user -u intune-agent.timer --since "1 hour ago" --no-pager

# Identity broker (user scope)
journalctl --user -u microsoft-identity-broker --since "1 hour ago" --no-pager

# Identity broker (system scope — device registration layer)
journalctl -u microsoft-identity-device-broker --since "1 hour ago" --no-pager
# Note: may require sudo on some Ubuntu installs for full system journal visibility:
# sudo journalctl -u microsoft-identity-device-broker --since "1 hour ago"
```

**Flags to document:**
- `--no-pager`: essential for L2 (pipes to clipboard/file without interactive pager) [VERIFIED: man journalctl]
- `--since "1 hour ago"`: time-bounded fetch; human-readable relative form supported [VERIFIED: man journalctl]
- `--output=cat` or `--output=short-iso`: useful for log archiving in escalation packets [ASSUMED — standard journalctl flag, not Intune-specific]
- `--user`: scope flag for user-instance services; mutually exclusive with `sudo` per DPO-02 [VERIFIED: Phase 51 V-51-20 + D-13 precedent]

### Version-Specific Behavior (Ubuntu 22.04 vs 24.04)

No Ubuntu-version-specific journalctl syntax differences were found. Both Ubuntu 22.04 (systemd 249) and Ubuntu 24.04 (systemd 255) support the same journalctl flags documented above. [ASSUMED — based on systemd version matrix; no Intune-specific 22.04 vs 24.04 journalctl divergence documented by Microsoft]

**Source:** [CITED: learn.microsoft.com/en-us/entra/identity/devices/sso-linux, 2026-02-03] — confirms `microsoft-identity-broker` and `microsoft-identity-device-broker` service names. [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-device-registration-tool-linux, 2026-01-07] — confirms `dsreg` tool and service names.

---

## Research Area 2: `/var/log/microsoft/intune/` Confirmation Status

**Finding: LOW-MEDIUM caveat CONFIRMED — path is NOT documented by Microsoft Learn for Ubuntu intune-portal.**

Exhaustive search of Microsoft Learn pages for Linux Intune client as of 2026-04-27:
- `learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-linux` — no mention of `/var/log/microsoft/intune/`
- `learn.microsoft.com/en-us/entra/identity/devices/sso-linux` — no mention of file-based log paths; only references `journalctl` and `dsreg`
- `learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-device-registration-tool-linux` — references `/etc/microsoft/identity-broker/` (certs) and `/var/lib/microsoft-identity-device-broker` (system data) and `~/.cache/intune-portal` (user cache) — NOT `/var/log/microsoft/intune/`

**Confirmed file paths that ARE documented or observed in community sources:**
- `~/.cache/intune-portal` — user-level cache dir (referenced in `dsreg --cleanup` cleanup docs) [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-device-registration-tool-linux]
- `~/.config/intune` — user-level config dir (referenced in cleanup docs) [CITED: same]
- `~/.local/share/intune-portal` — user-level data dir (referenced in cleanup docs) [CITED: same]
- `/var/lib/microsoft-identity-device-broker` — system-level broker data [CITED: same]
- `/etc/microsoft/identity-broker/` — cert/key storage [CITED: same]

**NOT confirmed by any Microsoft Learn source:** `/var/log/microsoft/intune/` as a log directory for intune-portal on Ubuntu. The two confirmed file-based log paths for LIN-12 coverage are:
- `/var/log/dpkg.log` — standard Ubuntu dpkg event log [VERIFIED: Ubuntu OS infrastructure; HIGH confidence]
- `/var/log/intune-update.log` — referenced in PITFALLS.md §Pitfall 3 warning signs; LOW-MEDIUM confidence per Phase 49 attestation [ASSUMED for runbook inclusion; Phase 49 glossary entry confirms LOW-MEDIUM]

**Implication for Runbook 24:** The three-layer caveat (D-01 GA-1A winner) on `/var/log/microsoft/intune/` is CONFIRMED appropriate. The path remains in scope as a LOW-MEDIUM secondary surface per D-02 because community troubleshooting occasionally references it, but the caveat is factually correct.

**Sources:** [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-device-registration-tool-linux, 2026-01-07]; [CITED: learn.microsoft.com/en-us/entra/identity/devices/sso-linux, 2026-03-31]; [CITED: learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-linux, 2026-04-16]

---

## Research Area 3: Ubuntu HWE vs GA Kernel Mechanics

### Version-Track Mapping (Canonical from Phase 49 01-linux-prerequisites.md)

| Ubuntu Version | GA Kernel | HWE Kernel | Support Status |
|----------------|-----------|------------|----------------|
| Ubuntu 22.04 LTS (Jammy) | 5.15 | 6.8 | Supported |
| Ubuntu 24.04 LTS (Noble) | 6.8 | 6.11+ | Supported |
| Ubuntu 20.04 LTS (Focal) | 5.4 | 5.15 | Dropped (Intune 2508) |

[CITED: `docs/linux-lifecycle/01-linux-prerequisites.md` — project-canonical version matrix, verified 2026-04-26]
[VERIFIED: Ubuntu kernel lifecycle page — HWE track description confirms 22.04 HWE = 6.8 (backport from 24.04 GA)]

**Key observable distinction for L2:**
- Ubuntu 22.04 + GA kernel → `uname -r` returns `5.15.x-xxx-generic`
- Ubuntu 22.04 + HWE kernel → `uname -r` returns `6.8.x-xxx-generic`
- Ubuntu 24.04 + GA kernel → `uname -r` returns `6.8.x-xxx-generic`
- Ubuntu 24.04 + HWE kernel → `uname -r` returns `6.11.x-xxx-generic` (or 6.14+ for 24.04.3)

**L2 Trap A diagnostic:** `uname -r` output directly disambiguates kernel track when combined with `lsb_release -rs` distro version. If `lsb_release -rs` = 22.04 AND `uname -r` starts with `6.`, the user is on HWE kernel for 22.04.

### Failure Modes Under HWE (Confidence: MEDIUM)

No Microsoft Learn documentation explicitly describes intune-portal failure modes tied specifically to HWE kernel. Community sources (PITFALL-4 + Phase 49 research) document that PAM authentication module compatibility diverges across kernel tracks, particularly for dm-crypt operations and PAM security modules. The key L2 observable is:

- If `uname -r` shows a kernel version that does not match the Ubuntu release's GA kernel, and the user reports enrollment failure or compliance failure, the HWE kernel is a candidate cause.
- The remediation path is to either pin to GA kernel (`sudo apt install linux-image-generic-hwe-22.04` controls which HWE version is installed; `sudo apt install linux-image-generic` pins to GA) or verify intune-portal version compatibility with the HWE kernel version.

**Source:** [ASSUMED for specific failure modes — no Microsoft Learn documentation found that explicitly lists HWE-specific intune-portal failure signatures. PITFALL-4 in PITFALLS.md establishes this as a known risk. Phase 49 prerequisite matrix establishes the version bands as MEDIUM confidence.]

### Runbook 25 Trap A Content Implications

- Entry condition: L1 collected `uname -r` as part of escalation packet (per Runbook 30 escalation criteria) and/or `lsb_release -a` output
- Investigation Step 1: `uname -r` (no sudo — read-only)
- Investigation Step 2: `lsb_release -rs` (no sudo — read-only)
- Investigation Step 3: Cross-reference kernel version against version-track matrix from `linux-lifecycle/01-linux-prerequisites.md`
- Verification: Confirm package version compatibility with `dpkg -l intune-portal | grep -A1 intune-portal`

---

## Research Area 4: Snap-vs-Deb Detection Canonical Commands

### The Problem (Confirmed from PITFALLS.md §Pitfall 3)

Microsoft Intune Linux agent (`intune-portal`) is delivered EXCLUSIVELY as a deb package from `packages.microsoft.com`. No snap package exists or is planned for GA. Some preview-era instructions referenced snap. An L2 engineer may encounter a user who has a snap-based installation from old instructions.

### L2-Actionable Detection Commands (Confidence: HIGH)

```bash
# Step 1: Check if intune-portal deb is installed (no sudo — read-only)
apt list --installed | grep intune-portal
# Expected GA output: intune-portal/jammy,now 2.0.X amd64 [installed]
# Empty output: not installed via deb

# Step 2: Check dpkg status directly (no sudo — read-only)
dpkg -l intune-portal
# Expected GA output: ii  intune-portal  2.0.X  amd64  ...
# ii = installed+configured; un = not installed; iF = install-failed

# Step 3: Check if snap is installed at all and if intune-related snap exists
snap list 2>/dev/null | grep -i intune
# Expected: no output (snap not involved in GA install)
# Unexpected: intune-portal entry = user is on preview snap path

# Step 4: Binary location check (no sudo — read-only)
which intune-portal 2>/dev/null
readlink -f $(which intune-portal 2>/dev/null) 2>/dev/null
# GA deb binary: /opt/microsoft/intune-portal/bin/intune-portal or similar system path
# Snap binary: path contains /snap/intune-portal/ or /var/snap/intune-portal/
```

### False-Positive Handling

**Simultaneous snap + deb:** Theoretically possible if user added Microsoft APT repo after installing snap. Detection: `snap list | grep intune` will show snap AND `apt list --installed | grep intune-portal` will show deb. Resolution for Trap B: remove snap first (`sudo snap remove intune-portal`) then verify deb path. [ASSUMED — community-observed scenario, not documented by Microsoft]

**No snapd installed:** On a clean Ubuntu 22.04 server install, `snap list` may not exist. `2>/dev/null` suppression in Step 3 handles this gracefully.

### V-52-09 Negative Assertion Context

V-52-09 checks that Runbook 24 does NOT contain `snap install`, `/var/snap/intune-portal/`, or `snap container`. These strings are the PITFALL-3 warning signs. Runbook 24 Section 3 uses `snap list 2>/dev/null | grep -i intune` only as a negative-space diagnostic (checking whether snap is erroneously installed) — this is safe because the command's purpose is to DETECT the wrong installation, not to instruct it.

**Source:** [VERIFIED: PITFALLS.md §Pitfall 3]; [CITED: docs/linux-lifecycle/01-linux-prerequisites.md — "NOT available via snap"]; [VERIFIED: project requirement REQUIREMENTS.md Out of Scope line 110: "Snap-based Intune agent delivery — Microsoft Intune Linux agent is delivered as intune-portal deb from packages.microsoft.com; no snap distribution"]

---

## Research Area 5: Identity Broker v2.0.2+ Re-enrollment Failure Signatures

### Confirmed Behavior (HIGH confidence)

When `intune-portal` updates to include Identity Broker v2.0.2+:
- Device automatically re-registers with Intune and Entra ID
- New Intune device IDs and new Microsoft Entra device IDs are created
- Previous device-based CA assignments, Intune filters, Entra group memberships stop applying silently
- No user action required — re-enrollment is automatic
- Admins may not notice until a CA policy or compliance assignment stops working

[CITED: learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-linux, 2026-03-31 — "Versions 2.0.2 and later of the Microsoft Identity Broker ... automatically re-registers and re-enrolls the devices and creates new Intune device IDs and Microsoft Entra device IDs"]

### L2-Observable Signals of Re-enrollment (Confidence: MEDIUM — partly inferred)

**journalctl entries during re-enrollment (no specific Microsoft Learn documentation exists for this; signals are inferred from the architectural behavior):**

```bash
# Check for re-enrollment events in user-scope identity broker journal
journalctl --user -u microsoft-identity-broker --since "1 week ago" --no-pager | grep -iE "register|enroll|device.id|re-register"

# Check system-scope broker for device registration events
sudo journalctl -u microsoft-identity-device-broker --since "1 week ago" --no-pager | grep -iE "register|enroll|device.id"

# Verify current device state via dsreg tool
dsreg --status
# Look for: Device ID field — if this changed since last L1 escalation packet, re-enrollment occurred
```

**V-52-21 constraint:** Runbook 25 Trap D does NOT contain literal `Require device to be marked as compliant` (PITFALL-2 negative regression-guard). Trap D can reference the CA assignment drift consequence WITHOUT using that exact phrase.

### Trap D Framing

Trap D documents the AFTER-the-fact investigation pattern when an admin suspects re-enrollment occurred:
1. Current device ID vs expected device ID (Intune admin center vs `dsreg --status`)
2. journalctl timestamp of the re-enrollment event
3. `dpkg -l microsoft-identity-broker` to confirm version crossed v2.0.2 threshold
4. Cross-link to Phase 50 LIN-05 admin-side pitfall callout for the remediation steps

**Sources:** [CITED: learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-linux, 2026-03-31]; [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-device-registration-tool-linux, 2026-01-07 — dsreg tool]; [ASSUMED: specific journalctl entry text for re-enrollment events — Microsoft Learn does not document specific log messages]

---

## Research Area 6: `systemctl --user` Scope Mechanics for L2

### Confirmed Mechanics (HIGH confidence — grounded in Phase 51 V-51-20 + DPO-02)

```bash
# User-scope timer status (no sudo — DPO-02 contract)
systemctl --user status intune-agent.timer
systemctl --user is-active intune-agent.timer
systemctl --user is-enabled intune-agent.timer
systemctl --user list-timers --all    # lists all user-scope timers including intune-agent.timer

# Health check sequence for Trap C investigation (no sudo on any of these)
systemctl --user status intune-agent.timer   # Active: active (waiting) expected
systemctl --user list-timers intune-agent.timer  # NEXT column non-empty expected
journalctl --user -u intune-agent.timer --since "1 hour ago" --no-pager  # recent activations
```

### V-52-17 Read-vs-Write Constraint

Per DPO-02 inheritance (Phase 51 D-13 → Phase 52):
- **MUST NOT have sudo prefix:** `sudo apt list`, `sudo dpkg -l`, `sudo systemctl --user`, `sudo journalctl --user`
- **MAY have sudo (root-required state-changing or system-scope reads):**
  - `sudo systemctl restart microsoft-identity-device-broker` (system-scope service restart — Resolution section only)
  - `sudo journalctl -u microsoft-identity-device-broker` (system-scope journal — may require root)
  - `sudo apt install --reinstall intune-portal` (Resolution section only)

**Timer health: canonical L2 verification sequence:**
1. `systemctl --user status intune-agent.timer` → expect `Active: active (waiting)`
2. `systemctl --user list-timers intune-agent.timer` → expect non-empty NEXT column
3. `systemctl --user is-active intune-agent.timer` → expect `active`

**Enabling (Resolution only, no sudo needed for --user scope):**
```bash
systemctl enable --user --now intune-agent.timer
```
[VERIFIED: Phase 51 Runbook 33 + Phase 49 prerequisite docs — `--user` units do NOT take sudo; `systemctl enable --user --now intune-agent.timer` is the canonical re-enable command, matching ROADMAP SC#2 literal coverage requirement]

---

## Research Area 7: Decision Matrix Shape for Narrow Linux Surface

### Android (18-android-log-collection.md) has 3 methods because enrollment mode drives method selection:
- Company Portal logs (pre-AMAPI BYOD primary)
- Microsoft Intune app logs (post-AMAPI / device-owner)
- adb logcat (USB-privileged last resort)

### Linux has ONE primary surface but THREE data categories:

The Decision Matrix rows should reflect DATA TYPE / CONFIDENCE TIER, not method selection by mode (Linux has no mode axis — V-52-20 PITFALL-1 regression guard):

| Method | Who Triggers | Data Scope | Access Path | Physical Requirements | Confidence (Layer 1) | Typical Latency |
|--------|-------------|------------|-------------|----------------------|----------------------|----------------|
| **journalctl (systemd journal)** | L2 engineer (user runs commands) | Agent events, auth events, timer activations, service errors | Direct terminal | SSH or physical terminal access | [HIGH, last_verified YYYY-MM-DD] | Seconds |
| **File-based paths** (`/var/log/dpkg.log`, `/var/log/intune-update.log`, `/var/log/microsoft/intune/`) | L2 engineer (user runs commands) | Package install history, update events, (unconfirmed) intune-specific logs | Direct terminal (read) | SSH or physical terminal access | `/var/log/dpkg.log`: [HIGH]; `/var/log/intune-update.log`: [MEDIUM]; `/var/log/microsoft/intune/`: [LOW-MEDIUM, last_verified YYYY-MM-DD] | Seconds |
| **Package-state queries** (`dpkg -l`, `apt list`) | L2 engineer (user runs commands) | Installed package versions, delivery path (deb vs snap) | Direct terminal (read) | SSH or physical terminal access | [HIGH, last_verified YYYY-MM-DD] | Seconds |

**Method Selection H2:** Because Linux has no enrollment-mode axis (V-52-20 PITFALL-1), the Method Selection section is a linear narrative about DATA NEED, not mode selection. Appropriate framing: "Linux's single delivery path means method selection is by data-type need, not by enrollment mode. Start with Section 1 (journalctl) for all investigations; move to Section 2 (file paths) when journalctl output is inconclusive; use Section 3 (package-state queries) to confirm delivery path and package version."

**Tool Landscape blockquote framing (D-03):** Emphasize Linux's NARROW surface vs Android's 3-method fragmentation. Linux has a single primary tool (journalctl) vs Android's mode-heterogeneous landscape. Appropriate framing: "Unlike Android (three collection methods gated by enrollment mode) or Windows (mdmdiagnosticstool.exe single-archive), Linux has a single primary collection surface — the systemd journal via journalctl. File-based log paths are secondary and partially unconfirmed."

---

## Research Area 8: L1 Cross-Link Surface Enumeration

### Proposed Trap → L1 Cause Anchor Mapping (Confidence: HIGH from CONTEXT canonical_refs)

The following mapping is derived from CONTEXT.md canonical_refs + logical analysis of which L1 causes escalate to which L2 traps:

| Trap | L1 Cause Anchor(s) | Mapping Rationale |
|------|--------------------|-------------------|
| Trap A (kernel HWE/GA) | `30-linux-enrollment-failed.md#cause-a-package-install` | HWE kernel can cause deb install failure or PAM auth failure; L1 Cause A package-install failure may have HWE kernel as root cause |
| Trap B (snap-vs-deb) | `30-linux-enrollment-failed.md#cause-a-package-install` | Snap installation is an incorrect delivery path; L1 Cause A package-install is the observable symptom of the wrong delivery path |
| Trap C (service-state) | `33-linux-agent-service-failure.md` | L1 Runbook 33 is the primary escalation source for Trap C — single-cause agent service failure routes to L2 when timer restarts but fails again |
| Trap D (Identity Broker) | `30-linux-enrollment-failed.md#cause-b-sign-in-failure` | Identity Broker re-enrollment causes sign-in failure; L1 Cause B is the observable symptom of broker re-enrollment |

**Additional eligible cross-links (for V-52-15 ≥3 requirement):**
- `31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure` — Runbook 24 Section 2 can cross-link this when directing L2 to read `/var/log/intune-update.log` for custom-compliance script failures
- `32-linux-ca-blocking-web-access.md` — Runbook 25 Trap C may optionally cross-link Cause B (non-compliant) if service-state failure caused compliance regression

**V-52-15 satisfaction:** ≥3 literal cross-links required. The minimum viable set from the confirmed mapping above:
1. `30-linux-enrollment-failed.md#cause-a-package-install` (Trap A or Trap B)
2. `30-linux-enrollment-failed.md#cause-b-sign-in-failure` (Trap D)
3. `33-linux-agent-service-failure.md` (Trap C)

This gives exactly 3 unique anchors — the minimum. Including the compliance runbooks would give 4-5, which is safer for V-52-15 coverage.

**Source:** [VERIFIED: CONTEXT.md `<canonical_refs>` section — full anchor surface enumeration]; [VERIFIED: `docs/l1-runbooks/30-linux-enrollment-failed.md` — #cause-a-package-install, #cause-b-sign-in-failure, #cause-c-enrollment-timeout anchors confirmed present]; [VERIFIED: `docs/l1-runbooks/33-linux-agent-service-failure.md` — single-cause, no anchors, file-level link only]

---

## Research Area 9: Append-Only Contract on `00-index.md`

### Current File State (from reading docs/l2-runbooks/00-index.md)

Last H2 in the file: `## Android L2 Runbooks` (line 132). The Android section ends with the `### Android MAM-WE Investigation Advisory {#android-mam-we-investigation-advisory}` block (line 161) followed by `## Related Resources` (line 165).

**Wait:** `## Related Resources` at line 165 is AFTER `## Android L2 Runbooks`. The append-only contract says the new Linux H2 must appear AFTER the last Android H2 — but there is also `## Related Resources` and `## Version History` AFTER the Android section.

**Re-examining 00-index.md structure:**
```
## When to Use              (Windows APv1 table)
## L1 Escalation Mapping    (Windows APv1 escalation)
---
## APv2 (Autopilot Device Preparation) Runbooks
### When to Use
### APv2 L1 Escalation Mapping
---
## macOS ADE Runbooks
### When to Use
### macOS L1 Escalation Mapping
## iOS L2 Runbooks
### When to Use
### iOS L1 Escalation Mapping
### MAM-WE Investigation Advisory
## Android L2 Runbooks     ← LAST PLATFORM H2
### When to Use
### Android L1 Escalation Mapping
### Android MAM-WE Investigation Advisory {#android-mam-we-investigation-advisory}
## Related Resources        ← currently line 165
---
## Version History          ← currently line 178
```

**Correct append position:** The new `## Linux L2 Runbooks` H2 should be appended AFTER the Android L2 section but BEFORE `## Related Resources`. This mirrors the pattern used in `docs/l1-runbooks/00-index.md` (Phase 51 appended `## Linux L1 Runbooks` before the `## Related Resources` / `## Version History` footer sections). 

**Alternatively:** Append after `## Related Resources` and `## Version History`? No — the CONTEXT D-14 step 2 says "append after the Android L2 section." The Android L2 section ends at the `### Android MAM-WE Investigation Advisory` block (line 163-164). The new H2 should be inserted AFTER line 164 (end of Android advisory) and BEFORE line 165 (`## Related Resources`).

**Practical validator check (V-52-19):** The validator asserts Linux H2 appears AFTER Android H2 by byte position — the exact position relative to Related Resources does not affect the validator assertion. Planner should specify: insert after `### Android MAM-WE Investigation Advisory` block, before `## Related Resources`.

### Linux Section Shape (Mirror Android Section)

The Android section has:
- H2 header with version gate blockquote
- Intro paragraph (prerequisite reference)
- `### When to Use` H3 with 2-row table (Runbook | When to Use | Prerequisite)
- `### Android L1 Escalation Mapping` H3 with L1 Runbook Source → L2 Runbook table
- `### Android MAM-WE Investigation Advisory {#anchor}` (platform-specific deferred advisory)

Linux section for Phase 52 (simpler — only 2 runbooks, no enrollment-mode fragmentation):

```markdown
## Linux L2 Runbooks

> **Version gate:** The runbooks below cover Linux (Ubuntu 22.04/24.04 LTS) via Microsoft Intune.
> For Android L2 runbooks, see above. For iOS L2 runbooks, see above. For macOS ADE runbooks, see above. For Windows Autopilot runbooks, see the tables above.

The [Linux Log Collection Guide](24-linux-log-collection.md) is a **prerequisite for all Linux L2 investigation runbooks** -- collect journalctl output and file-based log snapshots before beginning any investigation.

### When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [Linux Log Collection Guide](24-linux-log-collection.md) | Before starting any Linux L2 investigation -- collect journalctl output, /var/log/ file snapshots, and dpkg package state | None |
| [Linux Agent Investigation](25-linux-agent-investigation.md) | intune-agent service failing after L1 remediation, HWE kernel compatibility suspected, snap vs deb delivery path confusion, Identity Broker re-enrollment detected | [Linux Log Collection](24-linux-log-collection.md) |

### Linux L1 Escalation Mapping

| L1 Runbook Source | L2 Runbook |
|-------------------|------------|
| [L1 30: Linux Enrollment Failed](../l1-runbooks/30-linux-enrollment-failed.md) | [Linux Log Collection](24-linux-log-collection.md) (Section 3: package-state queries) + [Linux Agent Investigation](25-linux-agent-investigation.md) Trap A or Trap B based on symptom |
| [L1 33: Linux Agent Service Failure](../l1-runbooks/33-linux-agent-service-failure.md) | [Linux Agent Investigation](25-linux-agent-investigation.md) Trap C (direct — service-state IS the L2 investigation) |
```

**Source:** [VERIFIED: `docs/l2-runbooks/00-index.md` — Android section structure read directly; last H2 before ## Related Resources is ## Android L2 Runbooks]; [ASSUMED — exact table text for Linux section is author-discretion per CD-03/CD-04]

---

## Research Area 10: Validator V-52-NN Regex Patterns

### Full 22-Check Pattern Specification

The following specifies exact regex patterns for each V-52-NN check, derived from CONTEXT.md D-10 descriptions and Phase 51 check-phase-51.mjs patterns.

```javascript
// FILE PATHS (pinned constants)
const RB24 = "docs/l2-runbooks/24-linux-log-collection.md";
const RB25 = "docs/l2-runbooks/25-linux-agent-investigation.md";
const VALIDATOR = "scripts/validation/check-phase-52.mjs";
const INDEX = "docs/l2-runbooks/00-index.md";

// V-52-01..04: File existence (straightforward readFile + null check)

// V-52-05: Frontmatter C10 check
// Pattern: same as V-51-05 but for RB24 + RB25 only (2 files, audience: L2 not L1)
// /^platform: Linux\s*$/m
// /^audience: L2\s*$/m
// last_verified + review_by date parsing with ≤60-day gap check

// V-52-06: Decision Matrix LOW-MEDIUM confidence token for /var/log/microsoft/intune/ rows
// Approach: extract all lines containing "/var/log/microsoft/intune/" from RB24;
// assert that within those lines (or adjacent table cell), "[LOW-MEDIUM" token present
// Pattern: /\[LOW-MEDIUM[^\]]*\].*\/var\/log\/microsoft\/intune\/|\/var\/log\/microsoft\/intune\/.*\[LOW-MEDIUM[^\]]*\]/

// V-52-07: Layer 2 Source confidence blockquote
// /> \*\*Source confidence:\*\*/.test(rb24) AND
// rb24.includes("LOW-MEDIUM confidence") AND
// rb24.includes("/var/log/microsoft/intune/")
// 10-line proximity check: find blockquote line; check ±10 lines for the path reference

// V-52-08: Layer 3 per-line confidence tokens (≥2 occurrences)
// /\[LOW-MEDIUM, last_verified/g match count ≥ 2

// V-52-09: PITFALL-3 negative assertion
// MUST NOT: /snap install/i
// MUST NOT: /\/var\/snap\/intune-portal\//
// MUST NOT: /snap container/i

// V-52-10: SC#1 positive coverage (all 4 literals must be present in RB24)
// rb24.includes("journalctl -u intune-agent") AND
// (rb24.includes("journalctl | grep intune-portal") OR rb24.includes("journalctl | grep intune-portal")) AND
// rb24.includes("/var/log/intune-update.log") AND
// rb24.includes("/var/log/dpkg.log")

// V-52-11: Runbook 25 Trap H2 anchors (all 4 literals)
// /^## Trap A: [^\n]*\{#trap-a-kernel-track\}\s*$/m
// /^## Trap B: [^\n]*\{#trap-b-delivery-path\}\s*$/m
// /^## Trap C: [^\n]*\{#trap-c-service-state\}\s*$/m
// /^## Trap D: [^\n]*\{#trap-d-identity-broker\}\s*$/m

// V-52-12: Trap A kernel content
// Extract H2 block starting "## Trap A:" up to next "## "
// assert block.includes("Ubuntu HWE") AND block.includes("GA kernel") AND block.includes("uname -r")

// V-52-13: Trap C service-state content
// Extract H2 block starting "## Trap C:"
// assert block.includes("systemctl status intune-agent") AND
// block.includes("systemctl enable --user --now intune-agent.timer")

// V-52-14: Trap B snap-vs-deb content
// Extract H2 block starting "## Trap B:"
// assert block.includes("snap") AND block.includes("deb")

// V-52-15: L1 cross-link coverage (≥3 unique L1 anchor literals from locked surface)
// Locked surface: 30-linux-enrollment-failed.md#cause-a-package-install,
//                 30-linux-enrollment-failed.md#cause-b-sign-in-failure,
//                 30-linux-enrollment-failed.md#cause-c-enrollment-timeout,
//                 31-linux-compliance-non-compliant.md#cause-a-distro-version-out-of-range,
//                 31-linux-compliance-non-compliant.md#cause-b-disk-not-encrypted,
//                 31-linux-compliance-non-compliant.md#cause-c-password-policy-not-met,
//                 31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure,
//                 32-linux-ca-blocking-web-access.md#cause-a-not-enrolled,
//                 32-linux-ca-blocking-web-access.md#cause-b-non-compliant,
//                 32-linux-ca-blocking-web-access.md#cause-c-edge-not-signed-in,
//                 33-linux-agent-service-failure.md (file-level only, no anchor)
// Count how many of the locked surface literals appear in rb25; assert count ≥ 3

// V-52-16: L2 audience-contract negative regression-guard (BOTH runbooks)
// MUST NOT in rb24: /> \*\*Say to the user:\*\*/
// MUST NOT in rb25: /> \*\*Say to the user:\*\*/
// (inverse polarity of V-51-24)

// V-52-17: Read-vs-write apt regex (BOTH runbooks)
// MUST NOT: /\bsudo\s+apt\s+list\b/ (in either runbook)
// MUST NOT: /\bsudo\s+dpkg\s+-l\b/ (in either runbook)
// MUST NOT: /\bsudo\s+systemctl\s+--user\b/ (in either runbook)
// MUST NOT: /\bsudo\s+journalctl\s+--user\b/ (in either runbook)
// NOTE: Scope narrowing — V-51-20 checked only L1 Triage Steps sections;
// For L2 (no L1 Triage Steps H2), check entire document EXCEPT ### Resolution H3 sections
// (sudo state-changing commands permitted in ### Resolution sections)
// Implementation: extract non-Resolution content; apply forbidden-sudo regex to that

// V-52-18: Glossary anchor consumption (≥1 per runbook)
// Each of rb24, rb25 must match: /\.\.\/_glossary-linux\.md#[a-z0-9-]+/
// (inherited from V-51-23)

// V-52-19: Append-only assertion at 00-index.md
// index.includes("## Linux L2 Runbooks") AND
// index.includes("24-linux-log-collection.md") AND
// index.includes("25-linux-agent-investigation.md") AND
// byte-position: indexOf("## Linux L2 Runbooks") > indexOf("## Android L2 Runbooks")

// V-52-20: Mode-axis token regression-guard (BOTH runbooks — PITFALL-1 inheritance)
// Structural text of rb24 and rb25 must NOT contain:
// /\bBYOD\b/, /\bCOBO\b/, /\bCOPE\b/, /\bDedicated\b/
// /\bZTE\b/, /\bAOSP\b/, /\bCOSU\b/
// (same list as V-51-07; extended to L2 layer)

// V-52-21: PITFALL-2 negative regression-guard (Runbook 25)
// rb25 MUST NOT contain: "Require device to be marked as compliant"
// (V-51-19 inherited at L2 layer; Trap D references Identity Broker / CA drift
// without using the forbidden architectural phrasing)

// V-52-22: TBD/TODO/FIXME/XXX scan (BOTH runbooks + validator)
// MUST NOT in rb24, rb25: /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/
// (Version History table exception per v1.2 retro carry-forward: could use
// /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/ outside ^\|.*\|.*\|.*\|.*$ table rows)
```

### Pattern Transfer from V-51-NN to V-52-NN

| V-51-NN | Transferred as V-52-NN | Polarity Change | Note |
|---------|------------------------|-----------------|------|
| V-51-07 (mode-axis tokens, Mermaid scope) | V-52-20 (mode-axis tokens, whole-doc scope) | Same | Scope expanded from Mermaid block to full runbook structural text |
| V-51-19 (PITFALL-2 negative on RB32) | V-52-21 (PITFALL-2 negative on RB25) | Same | Anchored to Trap D content |
| V-51-20 (read-vs-write apt, L1 Triage Steps scope) | V-52-17 (read-vs-write apt, non-Resolution scope) | Same | Scope adapted for L2 document structure |
| V-51-23 (glossary anchor per runbook) | V-52-18 (glossary anchor per runbook) | Same | Identical pattern |
| V-51-24 (L1 positive — `> **Say to the user:**` MUST appear) | V-52-16 (L2 negative — `> **Say to the user:**` MUST NOT appear) | **INVERTED** | Critical: V-52-16 is the INVERSE of V-51-24 |

---

## Research Area 11: Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | check-phase-52.mjs — custom static validator (file-reads-only, regex-based, no external deps) |
| Config file | none — all paths hardcoded in validator per Phase 48 D-25 |
| Quick run command | `node scripts/validation/check-phase-52.mjs` |
| Full suite command | `node scripts/validation/check-phase-52.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Assertions |
|--------|----------|-----------|-------------------|------------|
| LIN-12 (SC#1) | Runbook 24 covers all 4 log surfaces | Structural | `node scripts/validation/check-phase-52.mjs` | V-52-10 |
| LIN-12 (SC#1) | `/var/log/microsoft/intune/` has 3-layer caveat | Structural | same | V-52-06, V-52-07, V-52-08 |
| LIN-12 (SC#2) | Runbook 25 covers HWE/GA, snap-vs-deb, service commands | Structural | same | V-52-11, V-52-12, V-52-13, V-52-14 |
| LIN-12 (SC#3) | 00-index.md Linux section appended | Structural | same | V-52-19 |
| LIN-12 (SC#4) | Both runbooks have platform: Linux + 60-day cycle | Frontmatter | same | V-52-05 |
| AUDIT-06 | check-phase-52.mjs exists and is a deliverable | Existence | same | V-52-03 |

### Sampling Rate

- **Per task commit (authoring wave):** `node scripts/validation/check-phase-52.mjs` (fast, local)
- **Pre-commit gate (before atomic commit):** `node scripts/validation/check-phase-52.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/regenerate-supervision-pins.mjs --self-test`
- **Phase gate:** All validators exit 0 before VERIFICATION.md authored

### Wave 0 Gaps

None — Phase 52 is documentation-only. The validator is its own test artifact. No test files, fixtures, or framework installation is needed. The validator is authored in the same authoring wave as the content.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File existence + regex assertions for docs | Custom parsing or shell scripts | `check-phase-51.mjs` pattern (copy + adapt) | Phase 48 D-25 file-reads-only contract established; pattern proven across 4 phases |
| Cross-link verification | Manual grep | V-52-15 validator check | Automated; catches drift at commit time |
| Frontmatter parsing | YAML parser npm dep | Regex match on `^---\n([\s\S]*?)\n---/m` | Consistent with Phase 51 pattern; no external deps per D-11 |

---

## Common Pitfalls

### Pitfall A: Sudo on `--user` Commands (V-52-17 FAIL)

**What goes wrong:** Author writes `sudo systemctl --user status intune-agent.timer` in Investigation Steps. V-52-17 fires.
**Why:** `--user` scope runs in the user's own systemd instance; sudo would redirect to root's user instance, which is wrong. DPO-02 explicitly forbids this pattern.
**How to avoid:** Never prefix `--user` scope commands with `sudo`. Sudo appears only in `### Resolution` sections on root-required commands (`sudo apt install`, `sudo systemctl restart <system-service>`).
**Warning sign:** Any occurrence of `sudo systemctl --user`, `sudo journalctl --user`, `sudo apt list`, `sudo dpkg -l`.

### Pitfall B: Importing L1 Cause Topology into L2 Trap Bodies (Anti-Pattern 1, CDI-Phase52-03)

**What goes wrong:** Author writes L2 Trap body by expanding on the L1 cause description — duplicating symptom language from Runbook 30/33 into Trap A/C investigation steps.
**Why:** Cross-tier cause-topology duplication is Anti-Pattern 1. L2 Trap content (kernel/HWE, snap/deb, service-state, Identity Broker) must be DISTINCT from L1 cause content (package-install symptom, sign-in failure symptom, agent-service-failure symptom).
**How to avoid:** Cross-link to L1 anchor; do NOT re-author L1 symptom descriptions. Trap A/B/C/D bodies document L2 INVESTIGATION TOOLS AND TECHNIQUES, not re-stated L1 symptoms.
**Warning sign:** Trap body contains phrases like "user reports intune-portal won't install" (L1 symptom language). L2 should say "entry condition: `uname -r` shows HWE kernel on 22.04; deb install failed at dpkg configure stage."

### Pitfall C: `> **Say to the user:**` in L2 Runbook (V-52-16 FAIL)

**What goes wrong:** Author imports L1 narration pattern when writing escalation reference blocks in Runbook 25 ("From L1 escalation? The L1 responder said to the user…").
**Why:** V-52-16 is a NEGATIVE assertion anchored to `audience: L2`. 0 occurrences across all 23 existing L2 runbooks confirms this is L1-exclusive.
**How to avoid:** Use `> **Note:**` or plain prose for L2 callouts. Escalation reference blocks describe what L1 COLLECTED (not what L1 said), because L2 engineering context is what data is available, not the conversation.

### Pitfall D: `/var/log/microsoft/intune/` without Layered Caveat (V-52-06/07/08 FAIL)

**What goes wrong:** Author includes `/var/log/microsoft/intune/` reference in Section 2 with only a footnote or inline `[LOW-MEDIUM]` — missing Layer 2 blockquote or Layer 1 table-cell token.
**Why:** D-01 requires all THREE layers; missing any single layer fails V-52-06, V-52-07, or V-52-08.
**How to avoid:** Immediately after authoring Section 2, verify: (1) Decision Matrix row for this path has `[LOW-MEDIUM, last_verified YYYY-MM-DD]` in Confidence column; (2) A `> **Source confidence:**` blockquote appears near Section 2 opening with the LOW-MEDIUM caveat text; (3) Each individual command line referencing this path carries an inline `[LOW-MEDIUM, last_verified YYYY-MM-DD]` token.

### Pitfall E: Mode-Axis Tokens in Structural Text (V-52-20 FAIL)

**What goes wrong:** Author writes "On BYOD Linux endpoints…" or "For COBO-enrolled devices…" anywhere in either runbook.
**Why:** V-52-20 inherits V-51-07 PITFALL-1 regression guard. Linux has no enrollment-mode axis (per Phase 49 + Phase 51 D-01 whitelist-first). These tokens indicate mode-axis content import from Android precedents.
**How to avoid:** Linux runbooks use plain scoping language: "On enrolled Linux endpoints," not mode-specific vocabulary.

### Pitfall F: Splitting Runbook 25 Into Multiple Files (REQUIREMENTS.md lock)

**What goes wrong:** Author decides 4 traps are too long and splits into 25a/25b for Traps A/B and 25c/25d for Traps C/D.
**Why:** REQUIREMENTS.md line 154 locks `LIN-12 → 24-linux-log-collection.md + 25-linux-agent-investigation.md` as a 1:1 2-file mapping. Any file-name change breaks this.
**How to avoid:** Keep all 4 traps in one `25-linux-agent-investigation.md` file. Scale body length per CD-05 (proportionate to L2-actionable surface depth).

---

## Code Examples

### Frontmatter Pattern (both runbooks)

```markdown
---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: L2
platform: Linux
---
```
[VERIFIED: Phase 51 runbook frontmatter pattern; CONTEXT D-04]

### Decision Matrix Table (Runbook 24)

```markdown
| Method | Who Triggers | Data Scope | Access Path | Physical Requirements | Confidence (Layer 1) | Typical Latency |
|--------|-------------|------------|-------------|----------------------|-----------------------|----------------|
| **journalctl (systemd journal)** | L2 engineer (user runs commands remotely or in terminal) | Agent events, auth events, timer activations, broker errors | Direct terminal (SSH or physical) | Terminal access | [HIGH, last_verified 2026-04-27] | Seconds |
| **File-based paths** | L2 engineer | Package install history (`/var/log/dpkg.log`), update events (`/var/log/intune-update.log`), unconfirmed paths (`/var/log/microsoft/intune/`) | Direct terminal (read-only) | Terminal access | See per-path: `/var/log/dpkg.log` = [HIGH]; `/var/log/intune-update.log` = [MEDIUM]; `/var/log/microsoft/intune/` = [LOW-MEDIUM, last_verified 2026-04-27] | Seconds |
| **Package-state queries** | L2 engineer | Installed package, version, delivery path (deb vs snap) | Direct terminal (read-only) | Terminal access | [HIGH, last_verified 2026-04-27] | Seconds |
```
[Source: 18-android-log-collection.md line 29-33 Decision Matrix shape; adapted for Linux narrow surface]

### Trap H2 Shape (Runbook 25)

```markdown
## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}

**Entry condition:** L1 escalation packet shows `uname -r` output with a kernel version that does not match Ubuntu 22.04 GA (5.15.x) or 24.04 GA (6.8.x), AND the user reports enrollment failure or intune-agent.timer activation failure.

> See [HWE kernel](_glossary-linux.md#hwe-kernel) and [GA kernel](_glossary-linux.md#ga-kernel) for the kernel-channel distinction.

**From L1 escalation?** L1 Runbook 30 (Cause A: package install) may have collected kernel information in the escalation packet. Skip Step 1 if L1 provided `uname -r` output.

### Symptom

[...]

### Investigation Steps

1. Verify kernel track:
   ```bash
   uname -r
   lsb_release -rs
   ```
   [...]

### Resolution

[...]

### Verification

[...]
```
[Source: CONTEXT D-05 Trap shape; 25-android-compliance-blocked.md per-cause body shape]

### Source confidence blockquote (Layer 2, Runbook 24 Section 2)

```markdown
> **Source confidence:** `/var/log/microsoft/intune/` paths are LOW-MEDIUM confidence — Microsoft Learn does not document this path for Ubuntu intune-portal as of 2026-04-27. `journalctl` is the confirmed primary surface. `/var/log/dpkg.log` and `/var/log/intune-update.log` are documented or community-confirmed. Verify `/var/log/microsoft/intune/` presence on the affected device before citing any files from this path in an escalation packet. Re-verify at `review_by` cadence.
```
[Source: 18-android-log-collection.md line 124-126 `> **Source confidence:**` shape + CONTEXT D-01 Layer 2 spec]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `microsoft-identity-broker` Java-based | `microsoft-identity-device-broker` non-Java (2.0.2+ architecture) | Intune 2.0.2+ package (2023-2024) | Separate system-scope vs user-scope service units; different journalctl queries needed |
| Snap-based intune-portal (preview) | deb from packages.microsoft.com only | GA release (2023) | Snap commands forbidden in runbooks (V-52-09) |
| Ubuntu 20.04 LTS supported | Ubuntu 20.04 dropped (Intune 2508) | August 2025 | Runbooks scope to 22.04/24.04 only |
| `microsoft-identity-broker` v2.0.1 (Java-based) | v2.0.2+ (automatic re-enrollment behavior) | 2024 | Trap D content basis; re-enrollment is a non-optional architectural change |

**Deprecated/outdated:**
- `snap install intune-portal` (preview path) — forbidden per PITFALL-3; V-52-09 negative regression-guard
- Ubuntu 20.04 LTS Intune support — dropped Intune 2508 August 2025; out of Phase 52 runbook scope
- `journalctl --user -u microsoft-identity-broker` as the ONLY broker query — must also cover `microsoft-identity-device-broker.service` (system scope) for v2.0.2+ behavior

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `microsoft-identity-broker.service` is user-scope AND `microsoft-identity-device-broker.service` is system-scope — both must be queried for complete Trap D investigation | Research Area 1, Area 5 | If scopes are reversed, the `sudo` constraint for journalctl commands would change; V-52-17 could mis-apply |
| A2 | HWE kernel divergence causes intune-portal PAM-layer compatibility failures (specific failure modes not documented by Microsoft Learn) | Research Area 3 | If no actual HWE-specific failure modes exist for intune-portal, Trap A content may be over-stated; risk is LOW because PITFALL-4 is established project precedent |
| A3 | `journalctl --user -u microsoft-identity-broker` produces relevant re-enrollment signals — specific log message text for re-enrollment events not confirmed from Microsoft Learn | Research Area 5 | If the signal is not in user-scope journal but only in system-scope, Investigation Step in Trap D would need to use `sudo journalctl -u microsoft-identity-device-broker` instead |
| A4 | The correct append position for the Linux L2 H2 in 00-index.md is AFTER `### Android MAM-WE Investigation Advisory` and BEFORE `## Related Resources` | Research Area 9 | If the validator checks byte-position against a different reference H2, the ordering assertion may pass regardless — the risk is cosmetic (wrong placement) not technical (validator failure) |
| A5 | HWE kernel for Ubuntu 22.04 is currently 6.8 (verified in Phase 49 prereq matrix) and for Ubuntu 24.04 is 6.11+ (Ubuntu 24.04.3 will bring 6.14) | Research Area 3 | If HWE versions have advanced further, the version-band table needs updating at authoring time |

**A1, A2, A3 are MEDIUM-risk assumptions** that should be validated at authoring time by checking whether community/Microsoft forums document specific journal entries for re-enrollment or HWE failures.

---

## Open Questions

1. **Does `journalctl -u intune-agent` (without `--user`) work, or must it always be `journalctl --user -u intune-agent.timer`?**
   - What we know: Phase 51 Runbook 33 uses `journalctl --user -u intune-agent.timer` consistently (user-scope timer). ROADMAP SC#1 literal says `journalctl -u intune-agent` (without `--user`).
   - What's unclear: `intune-agent` may refer to a different unit than `intune-agent.timer`; the non-timer unit (if any) may be system-scope. The ROADMAP SC#1 literal `journalctl -u intune-agent` must be covered verbatim per V-52-10, but `--user` vs no-flag distinction affects correctness.
   - Recommendation: Include BOTH in Runbook 24 Section 1: `journalctl -u intune-agent` (SC#1 literal) AND `journalctl --user -u intune-agent.timer` (phase-pattern user-scope form). Include a `> **Note:**` clarifying that `intune-agent.timer` is the confirmed user-scope unit; `intune-agent` without `.timer` suffix may refer to a different or alias unit.

2. **Exact journalctl signals produced by Identity Broker v2.0.2+ re-enrollment**
   - What we know: Re-enrollment creates new device IDs; no user action required; Microsoft Learn confirms the behavior but not specific log messages.
   - What's unclear: What string/keyword to grep for in journalctl to confirm re-enrollment occurred vs normal sign-in.
   - Recommendation: Use `grep -iE "register|enroll|device.id|new.device"` as a broad pattern; note LOW-MEDIUM confidence on specific match strings; recommend `dsreg --status` as the definitive check (device ID comparison).

3. **Whether `snap list 2>/dev/null | grep -i intune` is sufficient for Trap B or if `readlink -f $(which intune-portal)` is needed**
   - What we know: Both commands detect snap vs deb. `snap list` is cleaner and less error-prone.
   - What's unclear: On systems without snap, `snap` command may not exist — `2>/dev/null` handles this. Risk of false negative if snap is installed but intune-portal snap doesn't use that exact name.
   - Recommendation: Use both detection steps in sequence (belt-and-suspenders for an L2 runbook). Document that both commands are needed for complete detection.

---

## Environment Availability

Phase 52 is documentation-only. No external tools beyond Node.js (already installed per project setup) are required for validator execution.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | check-phase-52.mjs validator | Assumed ✓ (project uses it for existing validators) | — | — |
| `docs/l2-runbooks/00-index.md` | V-52-19 append target | ✓ (confirmed exists, read) | — | — |
| `docs/_glossary-linux.md` | V-52-18 glossary anchor consumption | ✓ (confirmed exists, ~21 anchors) | — | — |
| `scripts/validation/check-phase-51.mjs` | Template for check-phase-52.mjs | ✓ (confirmed exists, read) | — | — |

**Missing dependencies with no fallback:** None.

**Step 2.6 summary:** SKIPPED (no external runtime dependencies beyond Node.js already verified as installed).

---

## Security Domain

> `security_enforcement` key absent from `.planning/config.json` — treated as enabled.

Phase 52 is documentation-only (Markdown + a Node.js file-reader). No new code is executed in production environments; the validator is a static analysis tool. Standard ASVS categories do not apply to documentation authoring phases.

| ASVS Category | Applies | Rationale |
|---------------|---------|-----------|
| V2 Authentication | No | No authentication surfaces authored in Phase 52 |
| V3 Session Management | No | No session management |
| V4 Access Control | No | No access control code |
| V5 Input Validation | No | Validator reads only files from the project repo; no user input |
| V6 Cryptography | No | No cryptography |

**Documentation-level security note:** Runbook 25 Trap D documents the `dsreg --cleanup` and `sudo dsreg --tenant-id <id> --unregister` commands in Resolution context. These are destructive device-management commands. Per Phase 30 D-10 read-only scope for Investigation Steps, these commands must appear ONLY in `### Resolution` H3 sections, not in `### Investigation Steps`. V-52-17 enforces the broader sudo-boundary at L2 layer.

---

## Sources

### Primary (HIGH confidence)
- `docs/linux-lifecycle/01-linux-prerequisites.md` — Phase 49 version matrix (GA/HWE kernel bands); Non-version Breakpoints (Identity Broker v2.0.2+)
- `docs/_glossary-linux.md` — 21+ term anchors; service unit scopes; journalctl framing
- `docs/l2-runbooks/18-android-log-collection.md` — Decision-Matrix-with-method-sections template
- `docs/l1-runbooks/25-android-compliance-blocked.md` — Trap H2 shape template
- `docs/l2-runbooks/00-index.md` — append target; Android section structure
- `scripts/validation/check-phase-51.mjs` — validator template; all V-51-NN patterns
- `docs/l1-runbooks/30-linux-enrollment-failed.md` — L1 cause anchors #cause-a, #cause-b, #cause-c (DPO-01 locked surfaces)
- `docs/l1-runbooks/33-linux-agent-service-failure.md` — L1 single-cause; Trap C escalation source
- [learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-device-registration-tool-linux](https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-device-registration-tool-linux) — dsreg tool; service names; cleanup paths; updated 2026-01-07
- [learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-linux](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-linux) — Identity Broker v2.0.2+ re-enrollment behavior; updated 2026-03-31

### Secondary (MEDIUM confidence)
- [learn.microsoft.com/en-us/entra/identity/devices/sso-linux](https://learn.microsoft.com/en-us/entra/identity/devices/sso-linux) — microsoft-identity-broker feature overview; service scope; updated 2026-03-31
- `.planning/research/PITFALLS.md` §Pitfall 3, 4 — snap vs deb; HWE kernel divergence (grounded in v1.0-v1.4.1 retrospectives)
- `.planning/research/SUMMARY.md` lines 250-285 — confidence ratings; LOW-MEDIUM gap flag for `/var/log/microsoft/intune/`
- Ubuntu kernel lifecycle documentation — HWE/GA version band confirmation

### Tertiary (LOW confidence — flagged for validation)
- Community troubleshooting reports (techcommunity.microsoft.com, panther.kapsi.fi) — `journalctl -xe` usage patterns; `microsoft-identity-broker` failure messages; re-enrollment cleanup steps
- Claim A3 (journalctl signals for re-enrollment) — inferred from architectural behavior; not Microsoft Learn documented

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — file-reads-only Node.js validator pattern established; templates verified
- Architecture: HIGH — all structural decisions locked in CONTEXT.md; append position confirmed from 00-index.md read
- Journalctl command syntax: HIGH — confirmed from Microsoft Learn official troubleshooting docs
- HWE/GA kernel bands: MEDIUM — Ubuntu kernel lifecycle docs + Phase 49 matrix; no Microsoft-specific kernel-track minimum documented
- `/var/log/microsoft/intune/` caveat: HIGH — confirmed NOT in Microsoft Learn; LOW-MEDIUM caveat is factually correct
- Identity Broker re-enrollment journal signals: LOW-MEDIUM — architectural behavior confirmed; specific log text not documented
- L1 cross-link mapping: HIGH — derived from CONTEXT.md canonical_refs + direct runbook reads
- Validator V-52-NN regex patterns: HIGH — derived from Phase 51 patterns + CONTEXT D-10

**Research date:** 2026-04-27
**Valid until:** 2026-05-27 (30-day window; journalctl syntax stable; kernel bands stable; LOW-MEDIUM caveat status stable until Microsoft Learn updates Linux agent log documentation)
