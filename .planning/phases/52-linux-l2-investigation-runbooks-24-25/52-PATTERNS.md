# Phase 52: Linux L2 Investigation Runbooks 24–25 - Pattern Map

**Mapped:** 2026-04-27
**Files analyzed:** 4 (2 new content files, 1 new validator, 1 append-only edit)
**Analogs found:** 4 / 4

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/l2-runbooks/24-linux-log-collection.md` | runbook (log-collection guide) | request-response | `docs/l2-runbooks/18-android-log-collection.md` | exact (same role, same decision-matrix-with-method-sections shape) |
| `docs/l2-runbooks/25-linux-agent-investigation.md` | runbook (investigation) | request-response | `docs/l1-runbooks/25-android-compliance-blocked.md` | exact (same anchor-indexed H2-per-cause shape); secondary: `docs/l2-runbooks/19-android-enrollment-investigation.md` for "From L1 escalation?" block |
| `docs/l2-runbooks/00-index.md` | index (append-only edit) | — | existing `## Android L2 Runbooks` H2 in `docs/l2-runbooks/00-index.md` | exact (same H2 + introductory blockquote + When-to-Use table shape) |
| `scripts/validation/check-phase-52.mjs` | validator | batch | `scripts/validation/check-phase-51.mjs` | exact (same file-reads-only, regex-based, 25-check pattern) |

---

## Pattern Assignments

### `docs/l2-runbooks/24-linux-log-collection.md` (runbook, log-collection guide)

**Primary analog:** `docs/l2-runbooks/18-android-log-collection.md`

---

#### Frontmatter — copy verbatim, swap tokens

**From analog** (`18-android-log-collection.md` lines 1–7):
```yaml
---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L2
platform: Android
---
```

**Adapt for Linux (D-04):** replace `platform: Android` with `platform: Linux`; set `last_verified` to plan-execution date; set `review_by` to `last_verified + 60d`.

---

#### Platform gate blockquote — copy shape, swap content

**From analog** (`18-android-log-collection.md` line 9):
```markdown
> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
```

**Adapt for Linux:** replace `Android Enterprise` with `Linux Intune client`; cross-links route to the same `00-index.md` but the Linux section anchor is `#linux-l2-runbooks`.

---

#### H1 title — swap name

**From analog** (`18-android-log-collection.md` line 11):
```markdown
# Android Log Collection Guide
```

**Adapt for Linux:** `# Linux Log Collection Guide`

---

#### `## Context` H2 — copy shape, swap content

**From analog** (`18-android-log-collection.md` lines 13–19):

The Context H2 opens with the role of the guide (prerequisite for investigation runbooks), then names the cross-references (which L2 runbooks consume this guide), and closes with an "From L1 escalation?" routing line that redirects to the Decision Matrix.

**Adapt for Linux:** reference Runbook 25 (`25-linux-agent-investigation.md`) as the sole investigation runbook this guide is prerequisite for. Reference the 4 L1 escalation sources: `30-linux-enrollment-failed.md`, `31-linux-compliance-non-compliant.md`, `32-linux-ca-blocking-web-access.md`, `33-linux-agent-service-failure.md`. Replace Android fragmentation framing with Linux single-primary-surface framing (journalctl is canonical; no 3-method fragmentation).

---

#### `## Tool Landscape` H2 — copy blockquote shape (line 22–23), swap content

**From analog** (`18-android-log-collection.md` lines 21–23):
```markdown
## Tool Landscape

> **Tool landscape:** There is **no single Intune admin center per-device Download Diagnostics bundle for Android** (contrast with Phase 31 iOS MDM diagnostic report and Phase 24 macOS IntuneMacODC). Android diagnostic data is fragmented across three methods — Company Portal logs, Microsoft Intune app logs, and adb logcat — each yielding different data scope on different trust boundaries. The decision matrix below selects the method by enrollment mode first, data-scope need second.
```

**Adapt for Linux (D-03):** replace Android fragmentation framing with Linux single-surface framing:
```markdown
## Tool Landscape

> **Tool landscape:** Linux Intune client (`intune-portal`) has a **single confirmed primary log surface: `journalctl`** (systemd journal). Unlike Android (3-method fragmentation) or macOS (IntuneMacODC zip), Linux has no Intune admin center per-device diagnostic download. The decision matrix below routes by data scope need; there is no enrollment-mode axis (Linux has one supported delivery mode: deb from packages.microsoft.com).
```

---

#### `## Decision Matrix` H2 — copy table shape with Confidence column (Layer 1 of D-01)

**From analog** (`18-android-log-collection.md` lines 25–34, focusing on line 31 column pattern):

The analog table has columns: `Method | Primary Tool (by mode) | Who Triggers | Data Scope | L2 Access Path | Physical Requirements | Confidence | Typical Latency`.

The Confidence column contains per-row tokens in the form `[HIGH, last_verified 2026-04-23]` and `[MEDIUM, last_verified 2026-04-23]`.

**Linux Decision Matrix column set (D-03):** `Method | Who Triggers | Data Scope | Access Path | Physical Requirements | Confidence (Layer 1) | Typical Latency`

**Copy verbatim confidence token pattern** from analog line 31:
```
[HIGH, last_verified 2026-04-23]
```

**Adapt for Linux rows:**
- Section 1 (`journalctl`) row: `[HIGH, last_verified <date>]`
- Section 2 file paths (`/var/log/intune-update.log`, `/var/log/dpkg.log`) rows: `[HIGH, last_verified <date>]`
- Section 2 file path (`/var/log/microsoft/intune/`) row (D-01 Layer 1): `[LOW-MEDIUM, last_verified <date>]`
- Section 3 (`dpkg`/`apt` package-state) row: `[HIGH, last_verified <date>]`

---

#### `## Method Selection` H2 — copy shape, remove mode-axis content

**From analog** (`18-android-log-collection.md` lines 36–46):

The analog Method Selection H2 opens with a mode-axis routing paragraph, then provides a per-mode bullet list. Linux has NO enrollment-mode axis (V-52-20 negative regression-guard: no BYOD/COBO/COPE/Dedicated/ZTE/AOSP/COSU tokens).

**Adapt for Linux:** Replace mode-axis routing with data-scope routing (linear narrative: "collect journalctl first; add file paths only if journalctl is insufficient; add package-state queries when delivery-path confusion is suspected").

---

#### `## Section 1: journalctl` — copy section header shape from analog, new body

**From analog** (`18-android-log-collection.md` line 48):
```markdown
## Section 1: Company Portal Logs
```

**Adapt:** `## Section 1: journalctl` (HIGH confidence; no blockquote caveat needed — HIGH is default).

Section body: numbered investigation steps with fenced code blocks. SC#1 mandates (V-52-10) these literal strings appear:
- `journalctl -u intune-agent`
- `journalctl | grep intune-portal`

---

#### `## Section 2: File-based paths` — copy section header + Layer 2 blockquote shape

**From analog** (`18-android-log-collection.md` lines 120–128):

The analog Section 3 (`adb logcat`) opens with two blockquotes before the prerequisites list:
```markdown
> **Device-owner-mode constraint:** On fully-managed (COBO), dedicated (COSU), and ZTE-enrolled devices, Android Enterprise device owner policy may disable USB debugging ... [MEDIUM, last_verified 2026-04-23]

> **Source confidence:** Commands in this section are sourced from Android Developer documentation and community troubleshooting guides; Microsoft Learn does not comprehensively document adb for Intune-managed Android. Section-level default confidence is **MEDIUM** unless overridden per-command. Verify command availability against current Android Developer docs at `review_by` cadence.
```

**Copy verbatim shape of the `> **Source confidence:**` blockquote** (line 126 analog). This is the D-01 Layer 2 pattern. Apply to Section 2 opening.

**Linux Section 2 Layer 2 blockquote (D-01, CD-01):**
```markdown
> **Source confidence:** `/var/log/microsoft/intune/` paths are LOW-MEDIUM confidence — Microsoft Learn does not document this path for Ubuntu intune-portal. `journalctl` is the confirmed primary surface. Verify file-path presence at `review_by` cadence.
```

SC#1 mandates (V-52-10) these literal strings appear in Section 2:
- `/var/log/intune-update.log`
- `/var/log/dpkg.log`

---

#### `## Section 2` per-command confidence tokens — copy Layer 3 pattern (D-01)

**From analog** (`18-android-log-collection.md` lines 137–149):

The analog uses per-tag inline confidence tokens:
```markdown
### 3.1 adb logcat `[HIGH, last_verified 2026-04-23]`
...
Per-tag filter examples (`[MEDIUM, last_verified 2026-04-23]` — tags verified against AOSP documentation but tag visibility on OEM-customized ROMs varies):
```

**Copy verbatim per-command inline token pattern** as D-01 Layer 3. In Runbook 24 Section 2, every per-command reference to `/var/log/microsoft/intune/` paths carries an inline `[LOW-MEDIUM, last_verified <date>]` token. V-52-08 requires ≥2 such tokens.

Example pattern (adapt file path):
```markdown
### 2.3 /var/log/microsoft/intune/ directory `[LOW-MEDIUM, last_verified <date>]`

Check for log files in this directory — path is LOW-MEDIUM confidence (not documented by Microsoft Learn for Ubuntu intune-portal): `[LOW-MEDIUM, last_verified <date>]`
```

---

#### PITFALL-3 negative space (V-52-09)

Section 2 or Section 3 MAY use `snap list 2>/dev/null | grep -i intune` as a DETECTION command (checking whether snap is erroneously present), but MUST NOT contain:
- `snap install`
- `/var/snap/intune-portal/`
- `snap container`

These are the V-52-09 forbidden strings.

---

#### `## Common Artifacts Cross-Reference` H2 — copy table shape

**From analog** (`18-android-log-collection.md` lines 182–191):
```markdown
## Common Artifacts Cross-Reference

Use this table to see which investigation runbook consumes each artifact — it is both a collection map and a routing hint.

| Artifact | Collection Method | Used by |
|----------|-------------------|---------|
| Company Portal logs ... | Section 1 / Section 2 | [19-android-enrollment-investigation.md](...) ... |
```

**Adapt for Linux:** 3 rows mapping `journalctl` output / file-path output / package-state output to Runbook 25 traps. Cross-link to Phase 51 L1 cause anchors per D-09 (DPO-01 inheritance).

---

#### `## Related Resources` and `## Version History` — copy shape verbatim

**From analog** (`18-android-log-collection.md` lines 193–204):

```markdown
## Related Resources

- [L2 Runbook Index](00-index.md#android-l2-runbooks) — Android L2 runbook set
...

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Initial version ... | -- |
```

**Adapt for Linux:** change all Android references to Linux; anchor `00-index.md#linux-l2-runbooks`. Version History row uses plan-execution date.

---

### `docs/l2-runbooks/25-linux-agent-investigation.md` (runbook, investigation)

**Primary analog:** `docs/l1-runbooks/25-android-compliance-blocked.md`
**Secondary analog:** `docs/l2-runbooks/19-android-enrollment-investigation.md` (for "From L1 escalation?" block)

---

#### Frontmatter — same shape as Runbook 24

**From analog** (`25-android-compliance-blocked.md` lines 1–7):
```yaml
---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L1
platform: Android
---
```

**Adapt for Linux (D-04):** `audience: L2` (NOT L1 — this is an L2 runbook); `platform: Linux`; 60-day cycle.

---

#### Platform gate blockquote — copy shape from 18-android-log-collection.md line 9

Same `> **Platform gate:**` shape as Runbook 24. Content routes to `00-index.md#linux-l2-runbooks`.

---

#### H1 title

```markdown
# Linux Agent Investigation
```

---

#### Preamble + "From L1 escalation?" block — copy from 19-android-enrollment-investigation.md lines 19–25

**From secondary analog** (`19-android-enrollment-investigation.md` lines 19–24):
```markdown
**From L1 escalation?** L1 runbook 22 (enrollment blocked) / 23 (work profile not created) / 24 (device not enrolled) / 27 (ZTE enrollment failed) has escalated. L1 collected: serial number, user UPN, mode (Fully managed / Work profile / Dedicated / ZTE), and device-side symptoms. Skip to the Pattern section matching L1's observation:
- L1 22 → Pattern E (Enrollment Restriction)
- L1 23 → Pattern A (Work Profile Not Created)
- L1 24 → start at Data Collection Step 1-4 to narrow mode; then Pattern B / D as identified
- L1 27 → Pattern C (ZTE Device Claim Failure)
- No L1 escalation: begin at Data Collection Step 1
```

**Adapt for Linux (D-09, CD-04):**
```markdown
**From L1 escalation?** One of the Phase 51 Linux L1 runbooks has routed here. L1 collected: serial number, user UPN, distro+kernel version (`lsb_release -a` output), `dpkg -l intune-portal` output, and device-side symptom description.

- L1 [30-linux-enrollment-failed.md#cause-a-package-install](../l1-runbooks/30-linux-enrollment-failed.md#cause-a-package-install) → Trap A (kernel-track mismatch causes deb install failure)
- L1 [30-linux-enrollment-failed.md#cause-b-sign-in-failure](../l1-runbooks/30-linux-enrollment-failed.md#cause-b-sign-in-failure) → Trap D (Identity Broker v2.0.2+ re-enrollment)
- L1 [30-linux-enrollment-failed.md#cause-c-enrollment-timeout](../l1-runbooks/30-linux-enrollment-failed.md#cause-c-enrollment-timeout) → Trap C (service-state user-scope)
- L1 [33-linux-agent-service-failure.md](../l1-runbooks/33-linux-agent-service-failure.md) → Trap C (primary L2 escalation target from Runbook 33)
- No L1 escalation: begin at Trap A and work through independently
```

This satisfies V-52-15 (≥3 L1 cross-link literals from the locked surface set).

---

#### `## How to Use This Runbook` H2 — copy verbatim framing from 25-android-compliance-blocked.md line 35

**From primary analog** (`25-android-compliance-blocked.md` line 35):
```markdown
Check the cause that matches your observation. Causes are independently diagnosable — you do not need to rule out prior causes.
```

**Adapt for Linux:** replace "cause" with "trap" and update the bullet list to the 4 trap names with anchor links:
```markdown
Check the trap that matches your observation. Traps are independently diagnosable — you do not need to rule out prior traps.

- [Trap A: Ubuntu HWE vs GA Kernel Mismatch](#trap-a-kernel-track)
- [Trap B: Snap-vs-Deb Delivery Path Confusion](#trap-b-delivery-path)
- [Trap C: Service-State User-Scope Confusion](#trap-c-service-state)
- [Trap D: Identity Broker v2.0.2+ Re-enrollment](#trap-d-identity-broker)
```

---

#### Trap H2 headers — literal strings locked by D-05/D-06/V-52-11

**Copy verbatim from CONTEXT.md D-05** (these are validator-pinned strings):
```markdown
## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}

## Trap B: Snap-vs-Deb Delivery Path Confusion {#trap-b-delivery-path}

## Trap C: Service-State User-Scope Confusion {#trap-c-service-state}

## Trap D: Identity Broker v2.0.2+ Re-enrollment {#trap-d-identity-broker}
```

---

#### Per-Trap body shape — copy from 25-android-compliance-blocked.md lines 48–93 (Cause A body)

**From primary analog** (`25-android-compliance-blocked.md` lines 48–93):

The per-Cause body shape:
```
**Entry condition:** [observable signal paragraph]

### Symptom

- bullet list of observable P-09 / UI signals

### L1 Triage Steps   ← L1-only; Phase 52 uses ### Investigation Steps

1. > **Say to the user:** ...   ← L1-only; FORBIDDEN in Phase 52 (V-52-16)
2. Open [admin UI step] ...
3. Check [field]

### Admin Action Required   ← Phase 52 uses ### Resolution

**Ask the admin to:**
- ...

**Verify:**
- ...

### Escalation (within Cause X)   ← Phase 52 uses ### Verification
```

**Adapt for Phase 52 L2 (D-05, D-08):**

Each `## Trap X:` H2 contains in this order:
1. `**Entry condition:**` paragraph (observable signal — mirrors analog line 52)
2. `### Symptom` H3 (bullet list)
3. `### Investigation Steps` H3 (numbered list with fenced code blocks; NO `> **Say to the user:**`)
4. `### Resolution` H3
5. `### Verification` H3

The `> **Say to the user:**` pattern from the analog is FORBIDDEN (V-52-16, D-08). Use `> **Note:**` or `> **Source confidence:**` callouts where appropriate.

---

#### Trap A body — SC#2 mandatory content (V-52-12)

V-52-12 requires Trap A body contains:
- literal `Ubuntu HWE`
- literal `GA kernel`
- literal `uname -r`

Investigation Steps pattern (numbered, code-fenced):
```markdown
### Investigation Steps

1. Collect kernel version from the device:
   ```bash
   uname -r
   ```
2. Collect distro version:
   ```bash
   lsb_release -rs
   ```
3. Cross-reference against the [Linux version-track matrix](../linux-lifecycle/01-linux-prerequisites.md):
   - Ubuntu 22.04 + GA kernel → `uname -r` returns `5.15.x-xxx-generic`
   - Ubuntu 22.04 + HWE kernel → `uname -r` returns `6.8.x-xxx-generic`
   - Ubuntu 24.04 + GA kernel → `uname -r` returns `6.8.x-xxx-generic`
   - Ubuntu 24.04 + HWE kernel → `uname -r` returns `6.11.x-xxx-generic`
4. Confirm package version compatibility:
   ```bash
   dpkg -l intune-portal | grep -A1 intune-portal
   ```
```

---

#### Trap B body — SC#2 mandatory content (V-52-14)

V-52-14 requires Trap B body contains:
- literal `snap`
- literal `deb`

Investigation Steps pattern:
```markdown
### Investigation Steps

1. Confirm deb installation:
   ```bash
   apt list --installed | grep intune-portal
   dpkg -l intune-portal
   ```
2. Check for erroneous snap installation:
   ```bash
   snap list 2>/dev/null | grep -i intune
   ```
3. Confirm binary path (deb vs snap):
   ```bash
   which intune-portal 2>/dev/null
   readlink -f $(which intune-portal 2>/dev/null) 2>/dev/null
   ```
```

---

#### Trap C body — SC#2 mandatory content (V-52-13)

V-52-13 requires Trap C body contains:
- literal `systemctl status intune-agent`
- literal `systemctl enable --user --now intune-agent.timer`

Investigation Steps pattern:
```markdown
### Investigation Steps

1. Check agent service status:
   ```bash
   systemctl status intune-agent
   ```
2. Check user-scope timer:
   ```bash
   systemctl --user status intune-agent.timer
   systemctl --user is-active intune-agent.timer
   systemctl --user is-enabled intune-agent.timer
   ```
3. Collect user-scope timer journal:
   ```bash
   journalctl --user -u intune-agent.timer --since "1 hour ago" --no-pager
   ```

### Resolution

If timer is inactive and not enabled:
```bash
systemctl enable --user --now intune-agent.timer
```
```

---

#### Trap D body — Identity Broker content (V-52-21 constraint)

V-52-21 requires Trap D body does NOT contain literal `Require device to be marked as compliant`.

Investigation Steps pattern (RESEARCH Area 5):
```markdown
### Investigation Steps

1. Confirm Identity Broker version crossed v2.0.2 threshold:
   ```bash
   dpkg -l microsoft-identity-broker
   ```
2. Check current device state via dsreg:
   ```bash
   dsreg --status
   ```
3. Check user-scope broker for re-enrollment events:
   ```bash
   journalctl --user -u microsoft-identity-broker --since "1 week ago" --no-pager | grep -iE "register|enroll|device.id|re-register"
   ```
4. Check system-scope broker for device registration events:
   ```bash
   sudo journalctl -u microsoft-identity-device-broker --since "1 week ago" --no-pager | grep -iE "register|enroll|device.id"
   ```
```

Cross-link to Phase 50 LIN-05 via `_glossary-linux.md#microsoft-identity-broker` (CD-07). Do NOT use phrase `Require device to be marked as compliant`.

---

#### Read-vs-write boundary (DPO-02, V-52-17)

Throughout both runbooks, apply this rule from Phase 51 D-13:
- `sudo apt list` → FORBIDDEN (read-only command; `apt list --installed` needs no sudo)
- `sudo dpkg -l` → FORBIDDEN
- `sudo systemctl --user` → FORBIDDEN (`--user` scope requires no sudo)
- `sudo journalctl --user` → FORBIDDEN
- `sudo journalctl -u microsoft-identity-device-broker` → ALLOWED (system-scope journal may need sudo on some Ubuntu installs)
- `sudo journalctl --system` → ALLOWED
- `sudo systemctl restart` → ALLOWED (state-changing)
- `systemctl enable --user --now intune-agent.timer` → NO sudo (user-scope enable)

Sudo-prefixed state-changing commands must appear ONLY inside `### Resolution` H3 sections, not in `### Investigation Steps`.

---

#### Glossary anchor consumption (V-52-18)

Both runbooks must contain ≥1 link each to `../_glossary-linux.md#<anchor>`. Candidates from CONTEXT canonical_refs:
- Runbook 24: `[journalctl](../_glossary-linux.md#journalctl)`, `[systemd](../_glossary-linux.md#systemd)`, `[dpkg](../_glossary-linux.md#dpkg)`, `[apt](../_glossary-linux.md#apt)`, `[intune-portal](../_glossary-linux.md#intune-portal)`
- Runbook 25: `[intune-portal](../_glossary-linux.md#intune-portal)`, `[microsoft-identity-broker](../_glossary-linux.md#microsoft-identity-broker)`, `[intune-agent.timer](../_glossary-linux.md#intune-agent.timer)`, `[LUKS](../_glossary-linux.md#luks)`

Pattern (copy from V-51-23 analog check `/../_glossary-linux\.md#[a-z0-9-]+`):
```markdown
See [journalctl](../_glossary-linux.md#journalctl) for the systemd logging tool used as the primary log surface.
```

---

### `docs/l2-runbooks/00-index.md` (append-only edit)

**Analog:** existing `## Android L2 Runbooks` H2 in `docs/l2-runbooks/00-index.md` (lines 132–163)

---

#### Append position

Append AFTER the last line of the `## Android L2 Runbooks` section (currently at line 163 in the file, before `## Related Resources`). V-52-19 asserts:
- Literal H2 `## Linux L2 Runbooks` is present
- 2 runbook entries (24 and 25) are present
- The new H2 byte-position is AFTER the `## Android L2 Runbooks` H2 byte-position

---

#### H2 + introductory block shape — copy from analog lines 132–138

**From analog** (`00-index.md` lines 132–138):
```markdown
## Android L2 Runbooks

> **Version gate:** The runbooks below cover Android Enterprise through Microsoft Intune (GMS modes: BYOD Work Profile, Fully Managed COBO, Dedicated COSU, Zero-Touch Enrollment). AOSP is out of scope — v1.4.1.
> For iOS L2 runbooks, see above. For macOS ADE runbooks, see above. For Windows Autopilot runbooks, see the tables above.

The [Android Log Collection Guide](18-android-log-collection.md) is a **prerequisite for all Android L2 investigation runbooks** -- select a method via the mode-first decision matrix in that guide (Company Portal logs / Microsoft Intune app logs / adb logcat) before beginning any investigation.
```

**Adapt for Linux:**
```markdown
## Linux L2 Runbooks

> **Version gate:** The runbooks below cover Linux Intune client (`intune-portal`) through Microsoft Intune (Ubuntu 22.04 LTS and 24.04 LTS; deb delivery from packages.microsoft.com).
> For Android L2 runbooks, see above. For iOS L2 runbooks, see above. For macOS ADE runbooks, see above.

The [Linux Log Collection Guide](24-linux-log-collection.md) is a **prerequisite for all Linux L2 investigation runbooks** -- collect journalctl output and package-state queries before beginning any investigation.
```

---

#### `### When to Use` table — copy shape from analog lines 139–147

**From analog** (`00-index.md` lines 139–147):
```markdown
### When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [Android Log Collection Guide](18-android-log-collection.md) | Before starting any Android L2 investigation -- choose Company Portal logs, Microsoft Intune app logs, or adb logcat per the decision matrix | None |
| [Android Enrollment Investigation](19-android-enrollment-investigation.md) | Work profile not created, COBO enrollment stuck, ZTE device claim failure, Dedicated QR failure, or enrollment restriction blocking | [Android Log Collection](18-android-log-collection.md) |
...
```

**Adapt for Linux (2-row table):**
```markdown
### When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [Linux Log Collection Guide](24-linux-log-collection.md) | Before starting any Linux L2 investigation -- collect journalctl output, file-based log paths, and package-state queries | None |
| [Linux Agent Investigation](25-linux-agent-investigation.md) | intune-portal not enrolling, agent service not running, HWE kernel mismatch, snap vs deb delivery confusion, or Identity Broker re-enrollment | [Linux Log Collection](24-linux-log-collection.md) |
```

---

#### `### Linux L1 Escalation Mapping` table — copy shape from analog lines 148–158

**From analog** (`00-index.md` lines 148–158):
```markdown
### Android L1 Escalation Mapping

| L1 Runbook Source | L2 Runbook |
|-------------------|------------|
| [L1 22: Android Enrollment Blocked](...) | [Android Enrollment Investigation](...) Pattern E + see-also ... |
```

**Adapt for Linux:**
```markdown
### Linux L1 Escalation Mapping

| L1 Runbook Source | L2 Runbook |
|-------------------|------------|
| [L1 30: Linux Enrollment Failed](../l1-runbooks/30-linux-enrollment-failed.md) | [Linux Agent Investigation](25-linux-agent-investigation.md) Trap A (kernel) or Trap D (Identity Broker) based on cause |
| [L1 31: Linux Compliance Non-Compliant](../l1-runbooks/31-linux-compliance-non-compliant.md) | [Linux Log Collection Guide](24-linux-log-collection.md) Section 2 (file paths) for custom-compliance log reading |
| [L1 33: Linux Agent Service Failure](../l1-runbooks/33-linux-agent-service-failure.md) | [Linux Agent Investigation](25-linux-agent-investigation.md) Trap C (service-state user-scope) |
```

---

#### Version History row

Append a new row to the existing `## Version History` table:
```markdown
| 2026-04-27 | Added Linux L2 runbook section (runbooks 24–25 + Linux L1 escalation mapping) | -- |
```

---

### `scripts/validation/check-phase-52.mjs` (validator, batch)

**Primary analog:** `scripts/validation/check-phase-51.mjs`

---

#### File header + shebang + imports — copy verbatim, change comment

**From analog** (`check-phase-51.mjs` lines 1–9):
```javascript
#!/usr/bin/env node
// Phase 51 static validation harness
// Source of truth: .planning/phases/51-linux-l1-triage-runbooks-30-33/51-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 25 checks (V-51-01 through V-51-25)

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

**Adapt for Phase 52:**
```javascript
#!/usr/bin/env node
// Phase 52 static validation harness
// Source of truth: .planning/phases/52-linux-l2-investigation-runbooks-24-25/52-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 22 checks (V-52-01 through V-52-22)

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

---

#### CLI flags + readFile helper — copy verbatim

**From analog** (`check-phase-51.mjs` lines 11–18):
```javascript
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}
```

Copy this block verbatim — no changes needed.

---

#### Pinned file path constants — copy shape, update paths

**From analog** (`check-phase-51.mjs` lines 20–32):
```javascript
// CDI-02: Pinned H2 strings — Phase 52+ renaming requires same-commit validator update.
const TREE = "docs/decision-trees/09-linux-triage.md";
const RB30 = "docs/l1-runbooks/30-linux-enrollment-failed.md";
...
const NEW_FILES = [TREE, RB30, RB31, RB32, RB33];
const RUNBOOKS = [RB30, RB31, RB32, RB33];
const ALL_CONTENT_FILES = [TREE, ...RUNBOOKS];
```

**Adapt for Phase 52 (D-12 — hardcoded anchor strings):**
```javascript
// D-12: Pinned anchor strings — Phase 56+ renaming requires same-commit validator update.
const RB24 = "docs/l2-runbooks/24-linux-log-collection.md";
const RB25 = "docs/l2-runbooks/25-linux-agent-investigation.md";
const VALIDATOR = "scripts/validation/check-phase-52.mjs";
const INDEX = "docs/l2-runbooks/00-index.md";

const NEW_CONTENT_FILES = [RB24, RB25];
const APPEND_TARGET = INDEX;
```

---

#### Checks array — copy shape with `id`, `name`, `run()` per check

**From analog** (`check-phase-51.mjs` lines 34–384):

Each check follows this shape:
```javascript
{
  id: N, name: "V-51-NN: description",
  run() {
    const c = readFile(FILE);
    if (c === null) return { pass: false, detail: "File missing: " + FILE };
    if (!REGEX.test(c)) return { pass: false, detail: "Pattern not found: ..." };
    return { pass: true, detail: "..." };
  }
},
```

**Phase 52 checks by V-52-NN (D-10 full enumeration):**

**V-52-01..04 (File existence)** — copy from V-51-01..04 shape exactly:
```javascript
{
  id: 1, name: "V-52-01: 24-linux-log-collection.md exists",
  run() {
    const c = readFile(RB24);
    if (c === null) return { pass: false, detail: "File missing: " + RB24 };
    return { pass: true, detail: c.length + " bytes" };
  }
},
```
Repeat for V-52-02 (RB25), V-52-03 (VALIDATOR self-referential), V-52-04 (INDEX).

**V-52-05 (Frontmatter C10)** — copy from V-51-05 shape (lines 72–99), change `audience: L1` to `audience: L2`, loop over `NEW_CONTENT_FILES`:
```javascript
// Key change: audience: L2 (not L1)
if (!/^audience: L2\s*$/m.test(fm)) issues.push("audience: L2 missing");
if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
```

**V-52-06 (Layer 1 confidence token in Decision Matrix)** — regex to detect `[LOW-MEDIUM` in any table row referencing `/var/log/microsoft/intune/`:
```javascript
// Block-scoped extraction: find table section, then check for LOW-MEDIUM token near /var/log/microsoft/intune/
const c = readFile(RB24);
const tableSection = c.match(/## Decision Matrix([\s\S]*?)## /);
if (!tableSection) return { pass: false, detail: "Decision Matrix H2 not found" };
const inTable = tableSection[1].includes("/var/log/microsoft/intune/") && tableSection[1].includes("[LOW-MEDIUM");
```

**V-52-07 (Layer 2 blockquote)** — copy from V-51-09 shape (two-token proximity check):
```javascript
const c = readFile(RB24);
if (!c.includes("> **Source confidence:**")) return { pass: false, detail: "Layer 2 blockquote > **Source confidence:** missing" };
if (!c.includes("LOW-MEDIUM confidence")) return { pass: false, detail: "LOW-MEDIUM confidence token missing" };
if (!c.includes("/var/log/microsoft/intune/")) return { pass: false, detail: "/var/log/microsoft/intune/ path missing" };
```

**V-52-08 (Layer 3 per-line tokens)** — count occurrences of `[LOW-MEDIUM, last_verified`:
```javascript
const tokens = (c.match(/\[LOW-MEDIUM, last_verified/g) || []).length;
if (tokens < 2) return { pass: false, detail: "Need >=2 [LOW-MEDIUM, last_verified tokens; found " + tokens };
```

**V-52-09 (PITFALL-3 negative)** — copy forbidden string pattern:
```javascript
const forbidden = ["snap install", "/var/snap/intune-portal/", "snap container"];
const found = forbidden.filter(s => c.includes(s));
if (found.length > 0) return { pass: false, detail: "PITFALL-3 violation: " + found.join(", ") };
```

**V-52-10 (SC#1 positive coverage)** — literal string check:
```javascript
const required = ["journalctl -u intune-agent", "journalctl | grep intune-portal", "/var/log/intune-update.log", "/var/log/dpkg.log"];
const missing = required.filter(s => !c.includes(s));
if (missing.length > 0) return { pass: false, detail: "SC#1 coverage missing: " + missing.join(", ") };
```

**V-52-11 (Trap H2 anchors)** — copy from V-51-12 shape (regex per anchor):
```javascript
const required = [
  /^## Trap A: [^\n]*\{#trap-a-kernel-track\}\s*$/m,
  /^## Trap B: [^\n]*\{#trap-b-delivery-path\}\s*$/m,
  /^## Trap C: [^\n]*\{#trap-c-service-state\}\s*$/m,
  /^## Trap D: [^\n]*\{#trap-d-identity-broker\}\s*$/m
];
```

**V-52-12 (SC#2 Trap A kernel content)**:
```javascript
// Extract Trap A H2 body (from Trap A H2 to next H2)
const trapA = c.match(/## Trap A:[\s\S]*?(?=^## |\Z)/m);
const body = trapA ? trapA[0] : "";
const missing = [];
if (!body.includes("Ubuntu HWE")) missing.push("Ubuntu HWE");
if (!body.includes("GA kernel")) missing.push("GA kernel");
if (!body.includes("uname -r")) missing.push("uname -r");
```

**V-52-13 (SC#2 Trap C service-state content)**:
```javascript
const trapC = c.match(/## Trap C:[\s\S]*?(?=^## |\Z)/m);
const body = trapC ? trapC[0] : "";
if (!body.includes("systemctl status intune-agent")) ...
if (!body.includes("systemctl enable --user --now intune-agent.timer")) ...
```

**V-52-14 (SC#2 Trap B snap-vs-deb)**:
```javascript
const trapB = c.match(/## Trap B:[\s\S]*?(?=^## |\Z)/m);
const body = trapB ? trapB[0] : "";
if (!/\bsnap\b/i.test(body)) ...
if (!/\bdeb\b/i.test(body)) ...
```

**V-52-15 (L1 cross-link coverage)** — copy from V-51-16/17 shape (literal string includes):
```javascript
const required = [
  "30-linux-enrollment-failed.md#cause-a-package-install",
  "30-linux-enrollment-failed.md#cause-b-sign-in-failure",
  "33-linux-agent-service-failure.md"
];
const missing = required.filter(s => !c.includes(s));
if (missing.length > 0) return { pass: false, detail: "L1 cross-link missing: " + missing.join(", ") };
```

**V-52-16 (L2 audience-contract negative regression-guard)** — INVERSE of V-51-24:
```javascript
// V-51-24 was POSITIVE (must contain); V-52-16 is NEGATIVE (must NOT contain) — per CDI-Phase52-05
for (const f of NEW_CONTENT_FILES) {
  const c = readFile(f);
  if (/> \*\*Say to the user:\*\*/.test(c)) failures.push(f + ": L1-only pattern '> **Say to the user:**' found in L2 runbook");
}
```

**V-52-17 (read-vs-write apt regex)** — copy from V-51-20 shape (lines 282–306), adapt for L2 runbooks (both NEW_CONTENT_FILES; scope is both `### Investigation Steps` AND full file for sudo-apt-list/dpkg-l/systemctl-user/journalctl-user):
```javascript
const forbidden = [
  /\bsudo\s+apt\s+list\b/,
  /\bsudo\s+dpkg\s+-l\b/,
  /\bsudo\s+systemctl\s+--user\b/,
  /\bsudo\s+journalctl\s+--user\b/
];
```

**V-52-18 (glossary anchor consumption)** — copy from V-51-23 shape:
```javascript
for (const f of NEW_CONTENT_FILES) {
  const c = readFile(f);
  if (!/\.\.\/_glossary-linux\.md#[a-z0-9-]+/.test(c)) failures.push(f + ": no _glossary-linux.md anchor link found");
}
```

**V-52-19 (00-index.md append-only assertion)** — copy from V-51-21 shape (byte-position ordering + entry presence):
```javascript
const c = readFile(INDEX);
if (!/^## Linux L2 Runbooks\s*$/m.test(c)) return { pass: false, detail: "## Linux L2 Runbooks H2 not found" };
const linuxIdx = c.indexOf("## Linux L2 Runbooks");
const androidIdx = c.indexOf("## Android L2 Runbooks");
if (androidIdx === -1) return { pass: false, detail: "## Android L2 Runbooks not found (regression)" };
if (linuxIdx <= androidIdx) return { pass: false, detail: "Append-only ordering violated: Linux H2 must appear AFTER Android H2" };
const required = [
  /24-linux-log-collection\.md/,
  /25-linux-agent-investigation\.md/
];
```

**V-52-20 (mode-axis token regression-guard)** — copy from V-51-07 shape, full-file scope (not just Mermaid):
```javascript
const forbidden = [/\bBYOD\b/, /\bCOBO\b/, /\bCOPE\b/, /\bDedicated\b/, /\bZTE\b/, /\bAOSP\b/, /\bCOSU\b/];
// Apply to structural text (exclude Version History tables as false-positive surface)
```

**V-52-21 (PITFALL-2 negative regression-guard)** — copy from V-51-19 shape:
```javascript
// Check Runbook 25 only (Trap D Identity Broker section)
if (c.includes("Require device to be marked as compliant")) {
  return { pass: false, detail: "PITFALL-2 violation: literal 'Require device to be marked as compliant' present" };
}
```

**V-52-22 (TBD/TODO scan)** — copy from V-51-25 shape verbatim:
```javascript
for (const f of NEW_CONTENT_FILES) {
  const c = readFile(f);
  if (/\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/.test(c)) failures.push(f + ": placeholder token found");
}
```

---

#### Runner + output + exit — copy verbatim from analog lines 387–412

```javascript
const LABEL_WIDTH = 64;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + " ";
  return s + " " + ".".repeat(LABEL_WIDTH - s.length) + " ";
}

let passed = 0, failed = 0, skipped = 0;

for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: "Unexpected error: " + e.message }; }
  const prefix = "[" + check.id + "/" + checks.length + "] " + check.name;
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + "SKIPPED -- " + (result.detail || "") + "\n");
  } else if (result.pass) {
    passed++;
    process.stdout.write(padLabel(prefix) + "PASS" + (VERBOSE && result.detail ? " -- " + result.detail : "") + "\n");
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + "FAIL -- " + result.detail + "\n");
  }
}

process.stdout.write("\nSummary: " + passed + " passed, " + failed + " failed, " + skipped + " skipped\n");
process.exit(failed > 0 ? 1 : 0);
```

Copy this block verbatim — no changes needed.

---

## Shared Patterns

### Frontmatter C10 contract
**Source:** `docs/l2-runbooks/18-android-log-collection.md` lines 1–7
**Apply to:** Both new content files (V-52-05)
- `platform: Linux` (not Android)
- `audience: L2` (not L1)
- `last_verified: <plan-execution-date>`
- `review_by: <last_verified + 60 days>`
- `applies_to: all`

### `> **Platform gate:**` blockquote
**Source:** `docs/l2-runbooks/18-android-log-collection.md` line 9
**Apply to:** Both new content files (D-03)
Shape: one-line blockquote naming the platform + cross-links to other platform L2 sections.

### `> **Source confidence:**` blockquote (Layer 2 caveat)
**Source:** `docs/l2-runbooks/18-android-log-collection.md` line 126
**Apply to:** Runbook 24 Section 2 (D-01 Layer 2); optionally Runbook 25 Trap D
Format: `> **Source confidence:** [explanation of LOW-MEDIUM confidence + canonical alternative + cadence instruction]`

### Per-line inline confidence token (Layer 3 caveat)
**Source:** `docs/l2-runbooks/18-android-log-collection.md` lines 137–149 (e.g., `` `[HIGH, last_verified 2026-04-23]` ``)
**Apply to:** Runbook 24 Section 2 per-command references to `/var/log/microsoft/intune/` (D-01 Layer 3; V-52-08 requires ≥2)

### Anchor-indexed H2 per trap/cause shape
**Source:** `docs/l1-runbooks/25-android-compliance-blocked.md` lines 33–44 (anchor index) + lines 48–93 (Cause A body)
**Apply to:** Runbook 25 (D-05); verbatim "Causes are independently diagnosable" framing adapted to "Traps are independently diagnosable"

### "From L1 escalation?" reference block
**Source:** `docs/l2-runbooks/19-android-enrollment-investigation.md` lines 19–25
**Apply to:** Runbook 25 preamble or per-Trap entry (CD-04; V-52-15 requires ≥3 L1 cross-link literals)

### No `> **Say to the user:**` in L2 runbooks
**Source:** V-52-16 negative regression-guard (inverse of V-51-24)
**Apply to:** Both new content files
Evidence: 0 occurrences across all 23 existing L2 runbooks (`docs/l2-runbooks/01..23-*.md`).

### Read-vs-write apt/systemctl boundary
**Source:** `scripts/validation/check-phase-51.mjs` lines 282–306 (V-51-20 check body)
**Apply to:** Both new content files (DPO-02 inheritance; V-52-17)
Rule: `sudo apt list`, `sudo dpkg -l`, `sudo systemctl --user`, `sudo journalctl --user` are FORBIDDEN. Sudo-prefixed state-changing commands live ONLY inside `### Resolution` H3 sections.

### Validator file-reads-only pattern
**Source:** `scripts/validation/check-phase-51.mjs` lines 14–18 (`readFile` helper) + lines 393–412 (runner + exit)
**Apply to:** `scripts/validation/check-phase-52.mjs`
Pattern: `join(process.cwd(), relPath)` + `existsSync` guard + `readFileSync` — no shell exec, no external deps.

---

## No Analog Found

All 4 Phase 52 deliverables have close analogs. No files require falling back to RESEARCH.md patterns for structure.

However, these content surfaces have no codebase analog and must be authored from RESEARCH.md + CONTEXT.md canonical refs:

| Surface | Why no codebase analog |
|---------|----------------------|
| HWE/GA kernel-track version table (Trap A body) | First Linux L2 runbook; no prior kernel-track investigation pattern in the L2 corpus |
| Identity Broker dual-scope service explanation (Trap D body) | First runbook documenting `microsoft-identity-broker` (user) vs `microsoft-identity-device-broker` (system) split |
| `/var/log/microsoft/intune/` LOW-MEDIUM caveat specific text | Specific to Linux Intune client; Android/iOS/macOS analogs use HIGH or MEDIUM — no prior LOW-MEDIUM on a file path claimed as L2-investigation surface |

For these surfaces, use RESEARCH.md Areas 2, 3, and 5 as the content source.

---

## Metadata

**Analog search scope:** `docs/l2-runbooks/`, `docs/l1-runbooks/`, `scripts/validation/`
**Files read:** 6 analog files (`18-android-log-collection.md`, `25-android-compliance-blocked.md`, `19-android-enrollment-investigation.md`, `00-index.md`, `check-phase-51.mjs` full), plus both CONTEXT.md and RESEARCH.md
**Pattern extraction date:** 2026-04-27
