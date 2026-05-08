# Phase 49: Linux Foundation — Taxonomy, Glossary, Version Matrix — Research

**Researched:** 2026-04-26
**Status:** Complete — ready for planning
**Inputs:** 49-CONTEXT.md (27 locked decisions), .planning/research/SUMMARY+STACK+PITFALLS, Phase 34 Android foundation precedent, existing glossaries + lifecycle docs + validators

---

## 1. Implementation Approach Overview

Phase 49 decomposes into exactly two atomic commits per D-22 + D-27. All 5 deliverables, 1 validator, and 3 reciprocal appends land in this two-commit structure.

### Commit-1: Foundation + Validator (atomic)

Delivers all NEW files and mandatory metadata corrections in one commit:

| Deliverable | File path | Type |
|---|---|---|
| Enrollment overview | `docs/linux-lifecycle/00-enrollment-overview.md` | NEW |
| Prerequisites + matrix | `docs/linux-lifecycle/01-linux-prerequisites.md` | NEW |
| Linux glossary | `docs/_glossary-linux.md` | NEW |
| Phase 49 validator | `scripts/validation/check-phase-49.mjs` | NEW |
| ROADMAP SC#4 correction | `.planning/ROADMAP.md` line 172 | EDIT |
| REQUIREMENTS LIN-02 traceability | `.planning/REQUIREMENTS.md` line 144 | EDIT |

Commit-1 ends with these verification runs:
1. `node scripts/validation/check-phase-49.mjs` → expect PASS (validator checks new files only; reciprocal appends not yet present)
2. `node scripts/validation/v1.5-milestone-audit.mjs` → expect PASS (C10 frontmatter blocking check passes on all 3 new Linux files)

**Wait**: validator in commit-1 must NOT require the reciprocal append strings — it checks them ONLY after commit-2. Implementation: validator checks (a) structural assertions on 3 new files, (b) PITFALL-5 collision audit, (c) reciprocal append strings in 3 existing glossaries. Run check passes if reciprocal strings are absent with informational warning; run check FAILs only if structural assertions or collision audit fail. Alternatively: planner may separate the reciprocal-string check into a separate validator invocation (final validation after commit-2). Recommended: single validator with a `--skip-reciprocal` flag that commit-1 uses, and commit-2's final validation runs without the flag.

### Commit-2: Reciprocal Appends + Pin Refresh (atomic)

| Deliverable | File path | Type |
|---|---|---|
| Windows glossary append | `docs/_glossary.md` | EDIT (1 sentence) |
| Android glossary append | `docs/_glossary-android.md` | EDIT (1 sentence) |
| Apple glossary append | `docs/_glossary-macos.md` | EDIT (1 sentence) |
| Pin coordinate refresh | `scripts/validation/v1.5-audit-allowlist.json` | EDIT if needed |

Commit-2 sequence (must be in this order, all in single commit):
1. Edit 3 existing glossaries (append sentence to top blockquote)
2. Run `node scripts/validation/regenerate-supervision-pins.mjs --report` → inspect output for shifted coordinates
3. If any pin coordinates shifted: edit `v1.5-audit-allowlist.json` to update `supervision_exemptions[]` entries for any pinned file touched
4. Commit all changed files atomically
5. Post-commit: `node scripts/validation/regenerate-supervision-pins.mjs --self-test` → expect exit 0
6. Post-commit: `node scripts/validation/check-phase-49.mjs` → expect PASS (now sees all 3 reciprocal strings)

### Post-commit-2: Terminal Sanity

`node scripts/validation/v1.5-milestone-audit.mjs --verbose` → expect 8/9+ PASS (all blocking checks PASS; informational checks within tolerance)

### VERIFICATION.md (Phase 50 Gate)

After terminal sanity passes, author `VERIFICATION.md` in the phase directory containing:
- Literal whitelist H2 table dump (capability rows)
- Literal version matrix dump (3 Ubuntu rows × 5 columns)
- Collision audit results (terms scanned, collision-vs-no-collision verdicts per term)

This VERIFICATION.md is the gate Phase 50 plan author reads before beginning.

### Plan Unit Mapping

Given D-27 two-commit atomicity, Phase 49 likely needs 4–5 plan units:
- Plan 49-01: `00-enrollment-overview.md` (whitelist H2 + Out-of-Scope H2 + Enrollment Constraints H2 + cross-platform bridge)
- Plan 49-02: `01-linux-prerequisites.md` (Ubuntu matrix + EOS H3 + Non-version Breakpoints H3)
- Plan 49-03: `_glossary-linux.md` (5 categories + ~20 native terms + 9 absent-concept entries + collision blockquotes)
- Plan 49-04: `check-phase-49.mjs` + ROADMAP/REQUIREMENTS edits + Commit-1 verification
- Plan 49-05: Reciprocal appends + pin refresh + Commit-2 verification + VERIFICATION.md

Plans 49-01 through 49-03 can be authored concurrently (no inter-file dependency at authoring time). Plan 49-04 requires all three docs complete (validator checks them). Plan 49-05 requires 49-04 committed.

---

## 2. Per-Deliverable Implementation Detail

### 2A. `docs/linux-lifecycle/00-enrollment-overview.md`

**Frontmatter shape** (exact, per C10 blocking):
```yaml
---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: all
platform: Linux
---
```
`review_by` = `last_verified` + 60 days (Phase 34 D-14). Date arithmetic: 2026-04-26 + 60 = 2026-06-25.

**H1 → H2 → H3 hierarchy:**
```
# Linux Device Management Enrollment Overview

> **Platform gate:** [cross-reference blockquote + glossary link]

## Supported Management Surface
  [3-status capability table]

## Out of Scope for Linux via Intune
  [bulleted explicit exclusion list]

## Enrollment Constraints
  ### BYOD vs Corporate-Owned Caveat
    > ⚠️ Known caveat: [BYOD/corp-owned inconsistency block]

## For Admins Familiar with Windows / macOS / Android
  [cross-platform bridge paragraphs — 2-4 paragraphs, one per platform analog]

## See Also
```

**Content sources by section:**
- Platform gate blockquote: mirror `docs/android-lifecycle/00-enrollment-overview.md` line 11 pattern verbatim; substitute Linux file paths
- Supported Management Surface (D-01, D-02): STACK.md §1 "Compliance Settings Available on Linux" + "Conditional Access scope on Linux" + "App Delivery on Linux"; PITFALL-2 mandatory architectural callout for CA row
- Out of Scope (D-03): REQUIREMENTS.md §Out of Scope lines 104-117 + STACK.md "What NOT to Build" table; enumerate: non-Ubuntu distros, server/IoT/headless, app push via deb, config profiles, snap delivery, Hybrid Entra Join, hardware attestation, SCEP/PKCS
- Enrollment Constraints H2 + BYOD caveat H3 (D-04): SUMMARY.md line 285 "BYOD/corporate-owned enrollment inconsistency"; STACK.md §1 "Enrollment Type" paragraph; REQUIREMENTS.md LIN-01 literal `> ⚠️ Known caveat` wording
- Cross-platform bridge (D-05, D-06, CD-01): Phase 34 D-03 precedent; `docs/android-lifecycle/00-enrollment-overview.md` lines 49-54 shape

**Supported Management Surface table (D-01, D-02):**
The 3-status table MUST use exactly these 3 cell strings: `Supported` / `Partial` / `Not supported`. The CA row MUST read `Not supported — web-app CA only` (PITFALL-2 line 48 mandate). Suggested rows:

| Capability | Linux Status |
|---|---|
| Device enrollment (user-initiated) | Supported |
| Compliance policies (4 categories) | Partial |
| Conditional Access — device-level | Not supported — web-app CA only |
| App delivery — binary packages | Not supported |
| App delivery — Bash scripts | Supported |
| Configuration profiles | Not supported |
| Declarative Device Management (DDM) | Not supported |
| Zero-touch enrollment | Not supported |
| Hybrid Entra Join | Not supported |
| Certificate profiles (SCEP/PKCS) | Not supported |
| Per-app VPN | Not supported |
| OS update enforcement | Not supported |

Source confidence: HIGH (Microsoft Learn platform-guide-linux updated 2026-04-16 + ref-linux-settings updated 2026-04-16).

**Cross-platform bridge content guidance (CD-01, D-06):**
Each paragraph must carry the "the mapping is partial" framing AND deflect to the whitelist for canonical scope. Forbidden patterns (D-06): "Linux CA is similar to iOS CA" (PITFALL-2 bait); "Linux app delivery works like Win32" (PITFALL-1). Required pattern: "[Concept] on Linux behaves like [closest analog] in [narrow respect], but [specific divergence]; see [Supported Management Surface](#supported-management-surface) for the canonical Linux scope."

Draft framing (Claude's Discretion to write 2-4 paragraphs — these are suggested starting points):
- **For Windows admins:** Enrollment is user-initiated via `intune-portal` GUI (no Autopilot, no hardware-hash zero-touch); compliance reporting exists but the "Require device to be marked as compliant" CA grant is not available (web-app CA only); no Group Policy/MDM configuration profiles; app delivery via Bash scripts only (no Win32/MSI/MSIX analog).
- **For macOS admins:** No ADE/zero-touch; no Bootstrap Token; no SCEP certificate delivery; compliance is narrower (4 categories vs macOS full settings catalog); `intune-portal` is the enrollment agent (closest analog to Intune management extension `IntuneMDMDaemon`, but significantly narrower scope).
- **For Android admins:** No DPC concept; no Managed Google Play; no work profile container; no dedicated (COSU) mode; compliance exists but is not linked to device-level CA (web-app CA only via Edge, analogous in intent to browser-based access but structurally different from Android BYOD compliance → CA flow).

**Word count estimate (CD-03):** 600–1000 words total. Table contributes ~200 words (equivalent); bridge subsection ~200-350 words; callouts and navigation ~100-150 words.

**Cross-reference anchor targets** (downstream phases link to these):
- `#supported-management-surface` — Phase 50 LIN-13 capability matrix, Phase 51/52 runbooks cite this
- `#out-of-scope-for-linux-via-intune` — Phase 50 admin-setup-linux/00-overview.md back-links here per DPO-03
- `#enrollment-constraints` / `#byod-vs-corporate-owned-caveat` — LIN-01 traceability target

---

### 2B. `docs/linux-lifecycle/01-linux-prerequisites.md`

**Frontmatter shape:**
```yaml
---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: admin
platform: Linux
---
```

**H1 → H2 → H3 hierarchy:**
```
# Linux Intune Client Prerequisites

> **Platform gate:** [cross-reference blockquote]

## Supported Ubuntu Versions

  [3-row × 5-column matrix]
  [^1] footnote definition

  ### Ubuntu 20.04 — End-of-Support
    [EOS narrative]

  ### Non-version Breakpoints
    [Identity Broker v2.0.2+ re-enrollment behavior]

## Hardware and Software Prerequisites

## Licensing Prerequisites

## See Also
```

**Version matrix (D-07, D-08, D-10):**
The matrix MUST have this exact header row per D-24 validator assertion:
```
| Version | GA Kernel | HWE Kernel | Support Status | EOS Date |
```
Three Ubuntu version rows:

| Version | GA Kernel | HWE Kernel | Support Status | EOS Date |
|---|---|---|---|---|
| Ubuntu 24.04 LTS (Noble) | 6.8 [verify-on-current-Ubuntu] | 6.11+ [verify-on-current-Ubuntu] | Supported — x86_64 only | April 2029 (standard) |
| Ubuntu 22.04 LTS (Jammy) | 5.15 [verify-on-current-Ubuntu] | 6.8 [verify-on-current-Ubuntu] | Supported — x86_64 only | April 2027 (standard) |
| Ubuntu 20.04 LTS (Focal) | 5.4 | 5.15 | Dropped — Intune 2508 [^1] | April 2025 (standard) |

`[^1]` footnote: "Ubuntu 20.04 support was removed in the Intune 2508 service release (August 2025). Devices running Ubuntu 20.04 cannot enroll or maintain enrollment. See [Ubuntu 20.04 — End-of-Support](#ubuntu-2004--end-of-support) below."

Note: Exact GA/HWE minimum kernel versions for `intune-portal` are not explicitly documented in Microsoft Learn as of 2026-04. Cells marked `[verify-on-current-Ubuntu]` carry inline freshness markers per STACK.md research-flags pattern (D-10). The `EOS Date` column uses pinned-event labels ("Intune 2508 — August 2025") not bare dates per D-10.

Source confidence: Ubuntu versions HIGH (Microsoft Learn enroll-linux updated 2026-04-08); GA/HWE kernel versions MEDIUM (Ubuntu wiki; specific intune-portal kernel requirements not documented by Microsoft).

**Ubuntu 20.04 EOS H3 (D-08):**
Narrative content: dropped in Intune 2508 (August 2025), admins on 20.04 must upgrade to 22.04 or 24.04, include upgrade path pointer. Keep this narrative below the matrix (not replacing the matrix row) so admins scanning the matrix see the 20.04 row and get directed here.

**Non-version Breakpoints H3 (D-09):**
Identity Broker v2.0.2+ behavior: when `intune-portal` updates to include Identity Broker v2.0.2+, the device automatically re-registers — creating new Intune device IDs and new Entra device IDs. Admins must review device-based CA assignments, filters, and Entra group memberships that rely on device object IDs after this update. Phase 50 LIN-05 owns the `> ⚠️ Known admin pitfall` callout in `01-intune-linux-agent.md`; this H3 owns the matrix-context anchor that LIN-05 back-links to (DPO-01).

Source confidence: HIGH (Microsoft Learn Linux deployment guide 2026-03-31 per SUMMARY.md line 270).

**Downstream anchor targets:**
- `#non-version-breakpoints` — Phase 50 LIN-05 back-link target (DPO-01)
- `#ubuntu-2004--end-of-support` — footnote target from matrix

**Word count estimate:** 500–800 words.

---

### 2C. `docs/_glossary-linux.md`

**Frontmatter shape:**
```yaml
---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: all
platform: Linux
---
```

**Top platform-coverage blockquote (per D-19 append target pattern):**
```
> **Platform coverage:** This glossary covers Linux-specific terminology for Intune-managed Ubuntu LTS devices.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Apple-platform terminology, see the [Apple Provisioning Glossary](_glossary-macos.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).
```

Note: The Linux Provisioning Glossary link does NOT yet appear in other glossaries at commit-1 time — it is added by commit-2 reciprocal appends. The Linux glossary's own top blockquote references the 3 existing glossaries (cross-ref is one-directional at commit-1, bidirectional after commit-2).

**H1 → H2 → H3 hierarchy (D-11, D-24):**
```
# Linux Provisioning Glossary

## Alphabetical Index
  [alphabetical pipe-delimited list of all ~29 terms]

---

## Distro & Lifecycle
  ### dm-crypt
  ### GNOME desktop
  ### HWE kernel
  ### GA kernel
  ### Ubuntu LTS

## Agent & Service
  ### intune-portal (package)
  ### intune-agent.timer
  ### microsoft-identity-broker
  ### Identity Broker
  ### systemd
  ### dpkg
  ### APT repository
  ### packages.microsoft.com

## Compliance & Encryption
  ### LUKS
  ### Linux compliance settings
  ### Web-app CA
  ### MS Edge for Linux

## Operations & Diagnostics
  ### journalctl
  ### /var/log/dpkg.log
  ### /var/log/intune-update.log
  ### deb (package format)

## Cross-Platform Collisions
  ### Supervision
  ### DPC (Device Policy Controller)
  ### Work Profile
  ### COBO / COPE / WPCO
  ### Managed Google Play (MGP)
  ### Zero-Touch Enrollment (ZTE)
  ### VPP (Volume Purchase Program)
  ### Hardware Hash
  ### ABM (Apple Business Manager)

## Version History
```

**Total term count:** 20 native terms (D-14) + 9 absent-concept entries (D-13) = 29 H3 entries.

**Alphabetical Index** (D-24 validator assertion — H2 must exist):
All 29 terms listed alphabetically as pipe-delimited anchor links: `[ABM](#abm-apple-business-manager) | [APT repository](#apt-repository) | ...`

**Cross-Platform Collisions H2** (D-12, D-13):
Each of the 9 absent-concept entries uses the callout-only redirect pattern from Phase 34 D-11 (Android "Supervision" entry precedent). Shape:
```markdown
### [Term Name]

> **Linux note:** "[Term name]" is a [platform] management concept that does not apply to Linux device management in Intune. See [term anchor in other glossary] for the definition.
```

The H3 anchor gives downstream runbooks a stable `_glossary-linux.md#dpc` reference (DPO-04) even when the content is a redirect.

**Version History H2** (D-13 from Phase 34 D-13 precedent):
Records term additions by phase. Minimal at Phase 49 shiptime — just the Phase 49 initial population entry.

**Word count estimate:** 2500–3500 words (glossary size mirrors Android glossary which ships at ~3000 words per Phase 34).

---

### 2D. `scripts/validation/check-phase-49.mjs`

See Section 3 for full implementation detail.

---

### 2E. Reciprocal Appends (3 existing glossaries)

Each append adds exactly one sentence to the existing top platform-coverage blockquote, per D-19:

**`docs/_glossary.md`** — current blockquote ends at line 11. Append sentence: `For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).`

**`docs/_glossary-android.md`** — current blockquote is lines 12-13. Append sentence: `For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).`

**`docs/_glossary-macos.md`** — current blockquote is lines 9-10. Append sentence: `For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).`

The validator (D-24) checks for the literal string `[Linux Provisioning Glossary](_glossary-linux.md)` in each of these 3 files.

Pin coordinate risk (D-20, PITFALL-12): `_glossary-android.md` has 18 supervision_exemptions pins in `v1.5-audit-allowlist.json`. Adding a sentence to lines 12-13 shifts ALL subsequent pin coordinates up by 1. This is the primary pin-coordinate shift risk for commit-2.

---

## 3. `check-phase-49.mjs` Validator Implementation Detail

### File Identity

```
#!/usr/bin/env node
// Phase 49 static validation harness
// Source of truth: .planning/phases/49-linux-foundation-taxonomy-glossary-version-matrix/49-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; external tools via execFileSync with argv arrays (optional)
```

Pattern: identical to check-phase-30.mjs / check-phase-31.mjs (D-26). Uses `import { readFileSync, existsSync } from 'node:fs'`; no shared module; regex-based heading detection.

### Files the Validator Reads

| File | Purpose |
|---|---|
| `docs/linux-lifecycle/00-enrollment-overview.md` | Structural assertion (D-24a) |
| `docs/linux-lifecycle/01-linux-prerequisites.md` | Structural assertion (D-24b) |
| `docs/_glossary-linux.md` | Structural assertion (D-24c) + collision audit (D-23) |
| `docs/_glossary.md` | Reciprocal append check (D-24d) |
| `docs/_glossary-android.md` | Reciprocal append check (D-24d) + collision audit source |
| `docs/_glossary-macos.md` | Reciprocal append check (D-24d) + collision audit source |

### Check Inventory (suggested IDs V-49-01 through V-49-NN)

**Check V-49-01: `00-enrollment-overview.md` exists**
```javascript
existsSync(join(cwd, 'docs/linux-lifecycle/00-enrollment-overview.md'))
```

**Check V-49-02: `00-enrollment-overview.md` has H2 `## Supported Management Surface`**
```javascript
/^## Supported Management Surface\s*$/m.test(content)
```

**Check V-49-03: `00-enrollment-overview.md` has H2 `## Out of Scope for Linux via Intune`**
```javascript
/^## Out of Scope for Linux via Intune\s*$/m.test(content)
```

**Check V-49-04: `00-enrollment-overview.md` has H2 `## Enrollment Constraints`**
```javascript
/^## Enrollment Constraints\s*$/m.test(content)
```

**Check V-49-05: `00-enrollment-overview.md` has H3 `### BYOD vs Corporate-Owned Caveat`**
```javascript
/^### BYOD vs Corporate-Owned Caveat\s*$/m.test(content)
```

**Check V-49-06: `00-enrollment-overview.md` BYOD H3 contains `> ⚠️ Known caveat` blockquote**
```javascript
/^> ⚠️ Known caveat/m.test(content)
```

**Check V-49-07: Capability table 3-status closed set (D-02)**
Extract the Supported Management Surface table from `00-enrollment-overview.md` and assert every non-header, non-separator row cell in the "Linux Status" column contains one of exactly 3 canonical strings.
```javascript
// Parse table rows; for each row extract the 2nd pipe-delimited cell
// Assert every cell matches: /^(Supported|Partial|Not supported)/
// Accept "Not supported — web-app CA only" as a valid "Not supported" variant
const VALID_STATUS = /^(Supported|Partial|Not supported)/;
```
Implementation: split content on `\n`, find lines starting with `|` within the H2 block, skip header and separator rows, extract cell 2, test against `VALID_STATUS`.

**Check V-49-08: `01-linux-prerequisites.md` exists**

**Check V-49-09: `01-linux-prerequisites.md` has correct matrix header row (D-24b)**
```javascript
/\| Version \| GA Kernel \| HWE Kernel \| Support Status \| EOS Date \|/.test(content)
```

**Check V-49-10: `01-linux-prerequisites.md` matrix has exactly 3 version rows**
Count non-header, non-separator table rows in the matrix. Must equal 3.

**Check V-49-11: `01-linux-prerequisites.md` has H3 `### Ubuntu 20.04 — End-of-Support` (D-24b)**
```javascript
/^### Ubuntu 20\.04 — End-of-Support\s*$/m.test(content)
```

**Check V-49-12: `01-linux-prerequisites.md` has H3 `### Non-version Breakpoints` (D-24b)**
```javascript
/^### Non-version Breakpoints\s*$/m.test(content)
```

**Check V-49-13: `_glossary-linux.md` exists**

**Check V-49-14: `_glossary-linux.md` has H2 `## Alphabetical Index` (D-24c)**
```javascript
/^## Alphabetical Index\s*$/m.test(content)
```

**Check V-49-15: `_glossary-linux.md` has H2 `## Cross-Platform Collisions` (D-24c, CDI-02)**
```javascript
/^## Cross-Platform Collisions\s*$/m.test(content)
```

**Check V-49-16: `_glossary-linux.md` has H2 `## Version History` (D-24c)**
```javascript
/^## Version History\s*$/m.test(content)
```

**Check V-49-17: `_glossary-linux.md` has all 5 content category H2s (D-24c)**
Asserts presence of all 5 content category H2 strings:
```javascript
const CATEGORY_H2S = [
  /^## Distro & Lifecycle\s*$/m,
  /^## Agent & Service\s*$/m,
  /^## Compliance & Encryption\s*$/m,
  /^## Operations & Diagnostics\s*$/m,
  /^## Cross-Platform Collisions\s*$/m
];
```
Note: CD-04 allows category renaming IF validator constants are updated in the same commit.

**Check V-49-18: C10 frontmatter — `platform: Linux` on 3 new files**
For each of the 3 Linux files, extract frontmatter block (between `---` fences) and assert:
```javascript
/^platform: Linux\s*$/m.test(frontmatter)
/^last_verified: \d{4}-\d{2}-\d{2}\s*$/m.test(frontmatter)
/^review_by: \d{4}-\d{2}-\d{2}\s*$/m.test(frontmatter)
```
Also assert review_by − last_verified ≤ 60 days (date arithmetic).

**Check V-49-19: PITFALL-5 collision audit (D-21, D-23) — core check**

This is the validator's primary reason for existence. Algorithm (D-23):

```
1. Extract Linux-native term H3 anchors from _glossary-linux.md
   - Scope: H3 entries INSIDE the 4 topical categories (NOT inside Cross-Platform Collisions H2)
   - Heading regex: /^### (.+)\s*$/m
   - Restrict to lines between topical category H2 and Cross-Platform Collisions H2

2. For each Linux-native term (extracted as H3 heading text):
   a. Check if same H3 heading text appears in _glossary.md (Windows)
   b. Check if same H3 heading text appears in _glossary-android.md
   c. Check if same H3 heading text appears in _glossary-macos.md
   
3. For each collision found:
   a. Find the Linux term's H3 line in _glossary-linux.md
   b. Scan ahead up to 5 lines for a line matching: /^> \*\*Cross-platform note:\*\*/
   c. If cross-platform-note found: PASS (properly decorated)
   d. If NOT found: FAIL (collision without cross-reference)
   
4. Report: "Term '[name]' appears in [other glossary] without > **Cross-platform note:** blockquote"
```

Implementation detail (D-23, CD-07):
- Term extraction heuristic: H3 only (`^### ` prefix), heading text normalized to lowercase for comparison
- Multi-line blockquote handling: scan lines[H3_line_index + 1] through lines[H3_line_index + 5] for `/^> \*\*Cross-platform note:\*\*/`
- False-positive allowlist: none in Phase 49 per D-23 YAGNI. If first false positive surfaces, add `c5_collision_allowlist[]` array to `v1.5-audit-allowlist.json` lazily

**Check V-49-20: Reciprocal append in `_glossary.md` (D-24d)**
```javascript
content.includes('[Linux Provisioning Glossary](_glossary-linux.md)')
```

**Check V-49-21: Reciprocal append in `_glossary-android.md` (D-24d)**
```javascript
content.includes('[Linux Provisioning Glossary](_glossary-linux.md)')
```

**Check V-49-22: Reciprocal append in `_glossary-macos.md` (D-24d)**
```javascript
content.includes('[Linux Provisioning Glossary](_glossary-linux.md)')
```

### `--skip-reciprocal` Flag (commit-1 compatibility)

To allow commit-1 to pass validator (reciprocal appends don't exist yet):
```javascript
const SKIP_RECIPROCAL = argv.includes('--skip-reciprocal');
// Checks V-49-20 through V-49-22: only run if !SKIP_RECIPROCAL
```

### Exit Codes

- Exit 0: all required checks PASS (or SKIPPED if `--skip-reciprocal`)
- Exit 1: any required check FAILS

### Error Message Format

Following check-phase-31.mjs inline style:
```
[1/22] V-49-01: 00-enrollment-overview.md exists .............. PASS
[7/22] V-49-07: Capability table 3-status closed set .......... FAIL -- row 3: cell "Partial — future" violates closed status set
[19/22] V-49-19: PITFALL-5 collision audit .................... FAIL -- Term 'agent' appears in _glossary-android.md without > **Cross-platform note:** blockquote
```

---

## 4. Pin Coordinate Refresh Workflow

### Why Pin Coordinates Shift in Commit-2

The `v1.5-audit-allowlist.json` contains `supervision_exemptions[]` with `{file, line}` absolute-line-number pins. When commit-2 appends a sentence to `_glossary-android.md` lines 12-13, ALL subsequent lines in that file shift down by 1. The 18 supervision_exemptions pins for `docs/_glossary-android.md` in the allowlist will all become stale by exactly 1 line.

Current pins at risk (from `v1.5-audit-allowlist.json`):
- `docs/_glossary-android.md` line 76 → shifts to 77
- `docs/_glossary-android.md` line 78 → shifts to 79
- `docs/_glossary-android.md` line 172 → shifts to 173
- `docs/_glossary-android.md` line 188 → shifts to 189
- `docs/_glossary-android.md` line 16 → shifts to 17
- `docs/_glossary-android.md` line 46 → shifts to 47
- `docs/_glossary-android.md` line 66 → shifts to 67

Pins for other files (`docs/android-lifecycle/`, `docs/admin-setup-android/`, etc.) are NOT shifted by the glossary edit.

### Exact Command Sequence for Commit-2

```bash
# Step 1: Make the 3 reciprocal append edits to the existing glossaries

# Step 2: Run report mode to see current vs expected pin coordinates
node scripts/validation/regenerate-supervision-pins.mjs --report

# Step 3: Inspect report output. For _glossary-android.md, update all shifted
#         supervision_exemptions pins in v1.5-audit-allowlist.json:
#         Add 1 to every line number for entries with file: "docs/_glossary-android.md"
#         (Only needed if the appended sentence lands BEFORE any pinned line)

# Step 4: Add all changed files to commit
# (3 glossary edits + v1.5-audit-allowlist.json if pin coordinates shifted)

# Step 5: Commit atomically
git commit -m "feat(49): reciprocal append + pin coord refresh"

# Step 6: Post-commit self-test
node scripts/validation/regenerate-supervision-pins.mjs --self-test
# expect exit 0

# Step 7: Final validator run
node scripts/validation/check-phase-49.mjs
# expect exit 0 (now sees all 3 reciprocal strings)
```

### How to Detect Coordinate Shifts

`regenerate-supervision-pins.mjs --report` outputs current occurrence locations vs pinned locations. If the report shows "pin at line 76 does not match term 'Supervision' (found at line 77)" — that is a shifted pin. Update the allowlist entry from `"line": 76` to `"line": 77`.

Executor note: The `--report` mode is advisory and does not write. The executor reads the output and manually applies the line-number increments to the JSON sidecar. This is the same pattern Phase 48 D-14 used for atomicity.

---

## 5. Linux-Native Glossary Term Definitions

For each of the ~20 D-14 terms: canonical 1-2 sentence definition, cross-platform note content, source confidence, and live-verification commands where needed.

### dm-crypt

**Definition:** The Linux kernel's subsystem for transparent disk encryption, providing block-device encryption via the device mapper (dm) layer. Intune compliance on Linux uses dm-crypt presence to evaluate Device Encryption compliance, with `/boot` and `/boot/efi` excluded from the encryption requirement.

**Cross-platform note:** On Windows, the analog is BitLocker (drive-level encryption). On macOS, the analog is FileVault (full-disk XTS-AES encryption). Android uses the dm-crypt subsystem identically on some hardware, but Intune does not expose Android dm-crypt as a compliance signal — Android encryption is enforced at the OS level and not policy-configurable. Do not conflate.

**Source confidence:** HIGH (Microsoft Learn ref-linux-settings 2026-04-16)

### LUKS (Linux Unified Key Setup)

**Definition:** The standard disk encryption specification for Linux that provides passphrase and key management on top of dm-crypt. LUKS2 is the current version; Intune recognizes any dm-crypt subsystem encryption on Ubuntu as compliant with the Device Encryption policy regardless of LUKS version.

**Cross-platform note:** No direct equivalent on Windows or macOS — both use proprietary key-management schemes (BitLocker + TPM on Windows; FileVault + Secure Enclave on macOS). LUKS is open-specification and passphrase-driven; BitLocker/FileVault use platform hardware key stores.

**Source confidence:** HIGH (Microsoft Learn ref-linux-settings 2026-04-16; LUKS specification is public standard)

### HWE kernel

**Definition:** The Hardware Enablement (HWE) kernel track for Ubuntu LTS, which backports newer kernel releases from the latest Ubuntu release into the current LTS release approximately every 6 months. The HWE kernel enables support for newer hardware on LTS releases without waiting for the next major LTS upgrade.

**Cross-platform note:** No equivalent concept on Windows, macOS, or Android — those platforms manage OS and hardware support within the OS release cycle. The HWE vs GA kernel distinction is Linux-specific and matters for Intune agent compatibility and PAM module behavior. See [01-linux-prerequisites.md](linux-lifecycle/01-linux-prerequisites.md) for the GA vs HWE column in the Ubuntu version matrix.

**Source confidence:** HIGH (Ubuntu wiki; kernel track definitions are well-established)

**Live verification command:**
```bash
uname -r  # Shows current running kernel version
# HWE kernels show a minor version significantly newer than the LTS GA version
# Example: 6.8.0-52-generic on Ubuntu 22.04 LTS indicates HWE
```

### GA kernel

**Definition:** The General Availability (GA) kernel track for Ubuntu LTS — the stock kernel shipped with the initial LTS release that receives only security and critical bug fixes for the lifetime of the LTS. The GA kernel provides a stable, long-term-supported baseline that changes minimally between LTS point releases.

**Cross-platform note:** No equivalent concept on other platforms. Linux is the only Intune-managed platform where the kernel track (GA vs HWE) is a relevant admin consideration for compliance agent behavior. This is a disambiguation pair with [HWE kernel](#hwe-kernel).

**Source confidence:** HIGH (Ubuntu wiki; public canonical documentation)

### GNOME desktop

**Definition:** The default graphical desktop environment shipped with Ubuntu Desktop editions. The Intune Linux client (`intune-portal`) requires a GNOME graphical session — Ubuntu Server (headless) is not supported for Intune enrollment.

**Cross-platform note:** No equivalent concept on Windows, macOS, or Android — those platforms ship with a single canonical GUI. The GNOME requirement is Linux-specific and is the primary reason Ubuntu Server and headless Linux are out of scope for Intune.

**Source confidence:** HIGH (Microsoft Learn platform-guide-linux 2026-04-16)

### intune-portal (package)

**Definition:** The Debian package (`intune-portal`) delivered via APT from `packages.microsoft.com` that provides the Intune Linux client — a GNOME GUI application through which users enroll their Ubuntu device and maintain compliance. Install command: `sudo apt install intune-portal`. The package includes the background sync agent (`intune-agent.timer`) and the Identity Broker service (`microsoft-identity-broker`).

**Cross-platform note:** On Windows, the closest analog is the Company Portal app from the Microsoft Store. On macOS, the closest analog is the Intune management agent (installed alongside MDM enrollment). On Android, the closest analog is the Microsoft Intune app. All are MDM enrollment + compliance-monitoring surfaces, but Linux `intune-portal` has significantly narrower Intune management depth than any other platform's enrollment client.

**Source confidence:** HIGH (Microsoft Learn microsoft-intune-app-linux 2026-04-08)

**Live verification command:**
```bash
dpkg -l intune-portal  # Shows installed version
apt info intune-portal  # Shows available version from APT repo
```
Note: Microsoft Learn does not pin a specific `intune-portal` version number. Executor should run `apt info intune-portal` on Ubuntu 22.04/24.04 at plan time to record current version. Confidence for specific version number: MEDIUM (apt info output).

### intune-agent.timer

**Definition:** The systemd user timer unit (not a daemon service) that triggers periodic Intune check-ins on the enrolled Ubuntu device. The timer drives compliance evaluation submissions to Intune. Verify status with: `systemctl --user status intune-agent.timer`. Part of the `intune-portal` package.

**Cross-platform note:** On macOS, the functional analog is the `com.microsoft.intune.microsoftintune` LaunchDaemon that runs the Intune management extension. On Windows, the Intune Management Extension (IME) service performs the equivalent check-in polling. The Linux timer-based model is architecturally different — it is a user-session timer, not a system-level daemon, which means it requires an active user session to run (no headless/server operation).

**Source confidence:** MEDIUM (community troubleshooting sources; not explicitly documented in Microsoft Learn as of 2026-04)

**Live verification command:**
```bash
systemctl --user status intune-agent.timer
systemctl --user list-timers intune-agent.timer
```

### microsoft-identity-broker

**Definition:** The systemd service that handles Entra ID (Azure AD) device registration on the enrolled Ubuntu device, part of the `intune-portal` package. The Identity Broker is responsible for obtaining and maintaining the device's Entra device object. Version 2.0.2+ introduced a breaking architectural change from the prior Java-based broker; see [Non-version Breakpoints](linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints).

**Cross-platform note:** On macOS, the Entra device registration equivalent is the Microsoft Enterprise SSO plugin for macOS. On Windows, Entra registration is handled via dsregcmd / Workplace Join. On iOS/Android, the Microsoft Authenticator / Company Portal apps handle device registration tokens. The Linux microsoft-identity-broker is unique in the re-enrollment behavior triggered at v2.0.2+ upgrade.

**Source confidence:** MEDIUM for service name (community; not explicitly named in Microsoft Learn); HIGH for behavior (Microsoft Learn Linux deployment guide 2026-03-31)

### Identity Broker (concept)

**Definition:** The Entra ID identity management component embedded in the `intune-portal` package that authenticates the Linux device to the tenant and manages device registration state. The Identity Broker concept is distinct from the specific `microsoft-identity-broker` systemd service that implements it. As of v2.0.2+, the Identity Broker uses a new brokering architecture that creates new Intune and Entra device IDs on upgrade.

**Cross-platform note:** See [microsoft-identity-broker](#microsoft-identity-broker) for the specific service; see [Non-version Breakpoints](linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints) for the v2.0.2+ admin action required.

**Source confidence:** HIGH (Microsoft Learn Linux deployment guide 2026-03-31 per SUMMARY.md)

### systemd

**Definition:** The Linux init system and service manager used in Ubuntu (since Ubuntu 15.04). Intune-relevant systemd units include `intune-agent.timer` and `microsoft-identity-broker.service`. Diagnostic commands use `systemctl` for service state and `journalctl` for log inspection.

**Cross-platform note:** No equivalent management surface on Windows, macOS, or Android — those platforms use their own service management frameworks (Windows Services + PowerShell; macOS launchd; Android init). Phase 52 L2 runbooks reference systemd commands throughout.

**Source confidence:** HIGH (systemd is canonical Ubuntu infrastructure)

### journalctl

**Definition:** The systemd journal log viewer command for inspecting service and kernel log output on Ubuntu. Primary diagnostic surface for Intune Linux agent troubleshooting. Key invocations: `journalctl -u microsoft-identity-broker` for enrollment events; `journalctl | grep intune-agent` for check-in events. The systemd journal is the confirmed primary diagnostic surface for `intune-portal` — no dedicated `/var/log/microsoft/intune/` file path is documented by Microsoft for Ubuntu.

**Cross-platform note:** On Windows, the closest analogs are Event Viewer (`eventvwr`) and `Get-WinEvent` for MDM diagnostic events (particularly the `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` log). On macOS, the analogs are the Console app and `log stream --predicate 'subsystem == "com.microsoft.intune"'`. On Android, logcat is the journal equivalent. Linux `journalctl` is uniquely system-level and session-unified.

**Source confidence:** HIGH for journalctl as the primary surface; MEDIUM for specific filter patterns (community; not documented in Microsoft Learn)

**Live verification commands:**
```bash
journalctl -u microsoft-identity-broker   # Identity broker registration events
journalctl | grep intune-agent             # Intune check-in events
journalctl -u microsoft-identity-broker --since "24 hours ago"
```

### dpkg

**Definition:** The Debian package manager low-level tool for managing installed `.deb` packages on Ubuntu. Useful for verifying `intune-portal` installation and version: `dpkg -l intune-portal`. The package format underlying APT.

**Cross-platform note:** On Windows, the closest analog is the Windows Package Manager (`winget`) or MSI installer infrastructure. On macOS, the analog is the pkg installer format. Android uses APK packages. The deb/dpkg ecosystem is Linux-specific.

**Source confidence:** HIGH (canonical Debian/Ubuntu package management)

### APT repository

**Definition:** The Advanced Package Tool (APT) software repository system used by Ubuntu. Microsoft provides an APT repository at `packages.microsoft.com` from which `intune-portal`, Defender for Endpoint (MDE), and other Microsoft tools are distributed for Ubuntu. Admins configure this repository before installing `intune-portal`.

**Cross-platform note:** No equivalent on Windows (uses Intune-pushed Win32 packages + winget). On macOS, the analog for admin-managed software sources is the `/etc/mdm/` configuration or Homebrew for community tooling. Android uses Managed Google Play as the equivalent managed app distribution channel.

**Source confidence:** HIGH (Microsoft Learn microsoft-intune-app-linux 2026-04-08)

### packages.microsoft.com

**Definition:** Microsoft's official Linux package repository host. Used to configure the APT source for `intune-portal` and related Microsoft Linux packages (Microsoft Edge, Defender for Endpoint). URL format: `https://packages.microsoft.com/ubuntu/<version>/prod/`. Admins run the Microsoft-provided setup script (`https://go.microsoft.com/fwlink/?linkid=2358529`) to configure this repository before installing Intune components.

**Cross-platform note:** PITFALL-3 anchor entry — this is the deb-delivery path for the Intune Linux agent; Snap delivery does NOT exist for `intune-portal`. Downstream runbooks must cite this as the canonical delivery path.

**Source confidence:** HIGH (Microsoft Learn microsoft-intune-app-linux 2026-04-08)

### deb (package format)

**Definition:** The Debian binary package format (`.deb`) used by Ubuntu and other Debian-derived Linux distributions. `intune-portal` is distributed as a deb package from `packages.microsoft.com`. Installed via `apt` or `dpkg`. The only supported delivery format for the Intune Linux agent — no Snap, no AppImage, no Flatpak.

**Cross-platform note:** On Windows, the analogs are MSI and MSIX installer packages. On macOS, the analogs are PKG (installer) and DMG (disk image). On Android, the analog is APK. Intune does NOT push deb packages as an app delivery mechanism — only the agent itself is delivered as a deb; user apps must be installed via other means.

**Source confidence:** HIGH

### /var/log/dpkg.log

**Definition:** The APT/dpkg package installation log that records all package installs, upgrades, and removals. Useful for verifying when `intune-portal` was installed or updated and what version was installed.

**Source confidence:** HIGH (standard Ubuntu file path)

### /var/log/intune-update.log

**Definition:** A log file potentially written by the Intune Linux agent during package update operations. Confidence: LOW-MEDIUM — Microsoft Learn does not document this specific path for `intune-portal` on Ubuntu. Include with explicit freshness caveat. The journalctl surface is the confirmed primary diagnostic path; this file path should be included in Phase 52 L2 runbooks only with a `[verify-on-current-Ubuntu]` marker.

**Source confidence:** LOW-MEDIUM (inferred from common Intune Linux agent behavior; not confirmed in Microsoft Learn as of 2026-04)

### Linux compliance settings

**Definition (pointer entry):** The 4 compliance policy categories available in the Intune Settings Catalog for Linux: (1) Allowed Distributions, (2) Custom Compliance (Bash scripts), (3) Device Encryption (dm-crypt/LUKS), (4) Password Policy. This glossary entry is a pointer; detailed configuration guidance lives in Phase 50 LIN-04 (`admin-setup-linux/03-compliance-policy.md`).

**Cross-platform note:** Linux compliance has significantly fewer categories than Windows (hundreds), macOS (dozens), iOS (dozens), or Android (dozens). This narrowness is a fundamental characteristic of the Linux Intune surface, not a roadmap gap.

**Source confidence:** HIGH (Microsoft Learn ref-linux-settings 2026-04-16)

### Web-app CA (PITFALL-2 anchor)

**Definition:** The only supported Conditional Access mechanism for Linux devices in Intune — browser-based sign-in enforcement via Microsoft Edge 102.x+. Web-app CA requires the user to sign into Edge with their org account from a compliant enrolled device; the `Require device to be marked as compliant` grant in Entra Conditional Access is NOT available for Linux. A Linux device can report as compliant in Intune but cannot be used as a CA grant signal for native apps or non-browser access.

**Cross-platform note:** PITFALL-2 anchor entry. On Windows/macOS/iOS/Android, device-level CA (the "Require device to be marked as compliant" grant) is available. This grant is absent for Linux. Web-app-only CA on Linux is architecturally comparable to iOS MAM-WE in the "compliance-lite" pattern (per Phase 50 LIN-13 Cross-Platform Equivalences), but the mechanics differ.

**Source confidence:** HIGH (Microsoft Learn platform-guide-linux 2026-04-16)

### MS Edge for Linux

**Definition:** Microsoft Edge browser for Linux (deb package, version 102.x+ required), which is the only browser that supports the Intune compliance check-in for web-app Conditional Access on Linux. Users must sign into Edge with their organizational account from a compliant enrolled device to access CA-protected web applications.

**Cross-platform note:** On Windows, Edge is the Microsoft-recommended CA browser but other browsers can also satisfy CA requirements via MSAL. On macOS, Edge and Safari both work. On Android/iOS, Edge or the Intune Managed Browser are the CA-compliant browser options. Linux is unique in that Edge is the ONLY supported browser for web-app CA — no alternative browser supports the Linux CA check-in.

**Source confidence:** HIGH (Microsoft Learn platform-guide-linux 2026-04-16; Edge 102+ requirement documented)

---

## 6. Absent-Concept Callout Entries (D-13)

Each of the 9 entries lives in `## Cross-Platform Collisions` H2. Shape per Phase 34 D-11 Supervision-pattern:

```markdown
### [Term Name]

> **Linux note:** "[Term name]" is a [platform] management concept that does not apply to Linux device management in Intune. [One sentence why.] See [[Term in other glossary]](path-to-other-glossary#anchor) for the definition used in [platform] context.
```

| Term | Cross-platform anchor target | Redirect text |
|---|---|---|
| Supervision | `_glossary-macos.md#supervision` | iOS/iPadOS concept (permanent per-device management state). Linux does not have a "supervised" or "unsupervised" device state. |
| DPC (Device Policy Controller) | `_glossary-android.md#dpc` | Android Enterprise concept (the app that implements device policy, e.g., Company Portal acting as DPC). Linux uses no DPC; `intune-portal` is not a DPC. |
| Work Profile | `_glossary-android.md#work-profile` | Android Enterprise BYOD enrollment concept (containerized work data separated from personal side). Linux enrollment creates no container partition. |
| COBO / COPE / WPCO | `_glossary-android.md#cobo` and `#cope` and `#wpco` | Android Enterprise corporate-owned enrollment modes. Linux has no equivalent ownership-mode classifications; Linux is enrolled as either corporate-owned or BYOD with no structural difference. |
| Managed Google Play (MGP) | `_glossary-android.md#managed-google-play` | Android Enterprise app distribution platform. Linux apps are not delivered via MGP or any Intune-managed app store. |
| Zero-Touch Enrollment (ZTE) | `_glossary-android.md#zero-touch-enrollment` | Android Enterprise zero-touch provisioning channel. Linux has no zero-touch or automated enrollment; enrollment is always user-initiated. |
| VPP (Volume Purchase Program) | `_glossary-macos.md#vpp` | Apple's app licensing mechanism for iOS/macOS managed apps. Linux has no equivalent Intune-managed app licensing. |
| Hardware Hash | `_glossary.md#hardware-hash` | Windows Autopilot's device identity mechanism. Linux has no hardware hash registration concept. |
| ABM (Apple Business Manager) | `_glossary-macos.md#abm` | Apple's portal for device enrollment and app licensing. Linux has no equivalent Apple Business Manager enrollment flow. |

---

## 7. Cross-Platform Bridge Subsection Content (D-05/D-06)

The bridge subsection in `00-enrollment-overview.md` titled "## For Admins Familiar with Windows / macOS / Android" should cover 2-4 paragraphs, one conceptual cluster per origin platform. Each paragraph MUST:
1. Name the closest Linux analog for a key concept from the origin platform
2. Specify the narrow respect in which the mapping holds
3. Specify the explicit divergence
4. Redirect to the whitelist for canonical Linux scope

### Suggested paragraph framings (Claude's Discretion per CD-01 to write final text):

**Windows admin perspective:**
"For Windows admins, Linux enrollment resembles user-driven Autopilot enrollment in that both are identity-initiated and require an active user session — but the mapping is partial. There is no zero-touch or hardware-hash registration path; each Linux device must complete enrollment manually through `intune-portal`. Compliance policies exist on both platforms, but `Require device to be marked as compliant` as a Conditional Access grant is not available on Linux — only browser-based web-app CA via Microsoft Edge is supported. No Win32 app delivery, no configuration profiles, no Group Policy analog. See [Supported Management Surface](#supported-management-surface) for the canonical Linux scope."

**macOS admin perspective:**
"For macOS admins, the `intune-portal` deb package is functionally analogous to the Intune management agent installed during macOS ADE enrollment — both provide a background compliance-reporting service. But the mapping is partial: there is no ADE/ABM enrollment flow, no Bootstrap Token, no Settings Catalog configuration profiles, and no SCEP/PKCS certificate delivery on Linux. Compliance reporting exists in both cases, but the compliance settings surface is much narrower (4 categories on Linux vs. the full macOS Settings Catalog). See [Supported Management Surface](#supported-management-surface)."

**Android admin perspective:**
"For Android Enterprise admins, Linux enrollment shares the 'web-app CA via Microsoft Edge' model with Android BYOD Work Profile in a 'compliance-lite' CA posture. But the mapping is partial: there is no DPC, no Managed Google Play, no work profile container, and no zero-touch enrollment equivalent. Android BYOD Work Profile supports device-level CA with the 'Require device to be marked as compliant' grant — Linux does not. See [Supported Management Surface](#supported-management-surface)."

**Partial-mapping warning template (required per D-06, Phase 34 D-03):**
Each paragraph must close with or include the phrase "but the mapping is partial" and a redirect to the whitelist. No paragraph may claim a concept "works the same as" its analog — all cross-platform comparisons are explicitly partial.

---

## 8. GFM Compatibility Notes

### D-08 Footnote Rendering Syntax (CD-05)

GFM footnote syntax (`[^1]` reference + `[^1]: definition`) renders correctly on:
- GitHub web: YES — GitHub renders GFM footnotes natively as of 2022
- GitHub Pages (Jekyll): YES with default theme; may require `plugins: [jekyll-footnotes]` in `_config.yml` for some themes
- MkDocs: NO — MkDocs does not render GFM footnotes by default; requires `pymdownx.footnotes` extension
- IDE preview (VS Code, JetBrains): PARTIAL — VS Code Markdown preview does NOT render `[^1]` footnotes; rendered as literal text

**Recommendation (CD-05 fallback):** Since the project uses GitHub as the primary rendering target (consistent with v1.0-v1.4.1 pattern), `[^1]` syntax is acceptable. However, the validator (V-49-09/V-49-10) must NOT assert the presence of `[^1]` syntax — it must accept EITHER the footnote marker OR the inline parenthetical fallback per CD-05. Recommended validator behavior: check for `[^1]` OR `(see Ubuntu 20.04 — End-of-Support below)` as equivalent implementations.

**Concrete fallback wording if footnote fails:** Replace `Dropped — Intune 2508 [^1]` in the matrix cell with `Dropped — Intune 2508 (see Ubuntu 20.04 — End-of-Support below)`. The validator must accept both forms.

### GFM Anchor Case Sensitivity Rules (PITFALL-15 Awareness)

GFM auto-generates anchor IDs from heading text by:
1. Converting heading text to lowercase
2. Replacing spaces with hyphens
3. Removing non-alphanumeric characters (except hyphens)

**Consequences for Phase 49 anchor naming:**

| Heading text | GFM anchor | Fragile pattern |
|---|---|---|
| `## Supported Management Surface` | `#supported-management-surface` | SAFE — all lowercase, hyphens |
| `## Out of Scope for Linux via Intune` | `#out-of-scope-for-linux-via-intune` | SAFE |
| `## Cross-Platform Collisions` | `#cross-platform-collisions` | SAFE — capital 'P' in heading but lowercase in anchor |
| `### Ubuntu 20.04 — End-of-Support` | `#ubuntu-2004--end-of-support` | NOTE: em-dash becomes double-hyphen `--` in GFM |
| `### Non-version Breakpoints` | `#non-version-breakpoints` | SAFE |

**PITFALL-15 specific risk:** H2/H3 headings with capital letters create anchors with lowercase letters. Downstream phases that link to Phase 49 anchors MUST use the all-lowercase GFM anchor, not the original heading case. Example: `_glossary-linux.md#cross-platform-collisions` not `_glossary-linux.md#Cross-Platform-Collisions`. The Phase 49 validator should NOT check capital anchors in cross-references — that is C13's responsibility.

**Em-dash in heading:** `### Ubuntu 20.04 — End-of-Support` generates anchor `#ubuntu-2004--end-of-support`. The `—` (em-dash, U+2014) is stripped entirely; the flanking spaces become adjacent hyphens, creating a double-hyphen. DPO-04/runbooks that reference this anchor must use `#ubuntu-2004--end-of-support`.

### `<br>` Tag Rendering in Table Cells

Decision 2A.3 (compound cells) was rejected in CONTEXT.md, so `<br>` tags in table cells are not needed for Phase 49. Documenting for planner awareness: GFM renders `<br>` inside table cells on GitHub web but not in all markdown processors. Phase 49 uses 5-column table with single-value cells (no compound cells), so this is not a current risk.

---

## 9. Validation Architecture

**Note:** This section header `## Validation Architecture` is required by the VERIFICATION.md template generation workflow (step 5.5 trigger).

### Phase 49 Success Criteria → Measurable Test Conditions

| Success Criterion | Measurable Test | Runs In CI |
|---|---|---|
| SC#1: Whitelist H2 + equally prominent Out-of-Scope callout | V-49-02 + V-49-03 both PASS | Yes — check-phase-49.mjs |
| SC#1: BYOD caveat surfaced as `> ⚠️ Known caveat` | V-49-05 + V-49-06 both PASS | Yes — check-phase-49.mjs |
| SC#2: Version matrix with GA/HWE columns | V-49-09 PASS (header row match) | Yes — check-phase-49.mjs |
| SC#2: Three Ubuntu version rows (20.04/22.04/24.04) | V-49-10 PASS (row count = 3) | Yes — check-phase-49.mjs |
| SC#3: Linux glossary exists with collision audit complete | V-49-13 PASS + V-49-19 PASS | Yes — check-phase-49.mjs |
| SC#3: Each collision-risk term has Cross-platform note | V-49-19 (per-term collision scan) | Yes — check-phase-49.mjs |
| SC#4: 3 existing glossaries contain reciprocal link | V-49-20 + V-49-21 + V-49-22 PASS | Yes — check-phase-49.mjs |
| SC#5: All Phase 49 files have `platform: Linux` + 60d `last_verified` | V-49-18 PASS | Yes — check-phase-49.mjs + v1.5-milestone-audit.mjs C10 |
| C10 frontmatter blocking | C10 check in v1.5-milestone-audit.mjs | Yes — milestone harness |
| C13 broken-link informational | C13 check in v1.5-milestone-audit.mjs | Yes — informational |
| DPO-01: Phase 49 Non-version Breakpoints H3 exists as back-link target | V-49-12 PASS | Yes — check-phase-49.mjs |
| Pin coordinate integrity | regenerate-supervision-pins.mjs --self-test exit 0 | Yes (manual + CI) |

### Test Categories

**1. Structural validation (check-phase-49.mjs)**
22 discrete checks covering file existence, H2/H3 heading presence, matrix header row, row count, 3-status closed set, frontmatter fields, PITFALL-5 collision audit, and reciprocal append strings. Exit code 0 = PASS, 1 = FAIL.

**2. C10 frontmatter (v1.5-milestone-audit.mjs)**
Blocking check: all Linux docs must have `platform: Linux`, `last_verified`, `review_by` with 60-day cycle. Runs against all 3 Phase 49 files via `linuxDocPaths()` enumeration in the harness. FAIL → commit is not acceptable.

**3. C13 broken-link (markdown-link-check on new files)**
Informational check in Phase 49 (promotes to blocking at Phase 60). Checks that anchor links within and between Phase 49 new files resolve. Phase 49 creates 3 new files and 3 reciprocal append targets — C13 should verify: (a) `[Linux Provisioning Glossary](_glossary-linux.md)` in 3 existing glossaries resolves; (b) internal anchors in `00-enrollment-overview.md` and `01-linux-prerequisites.md` resolve (e.g., `#non-version-breakpoints`).

**4. Phase 50 LIN-05 back-link target integrity (Identity Broker anchor)**
The Non-version Breakpoints H3 anchor `01-linux-prerequisites.md#non-version-breakpoints` must exist for Phase 50 LIN-05 to back-link to. V-49-12 asserts the H3 exists. The actual cross-file link from Phase 50 is validated in check-phase-50.mjs (future), but Phase 49 guarantees the target exists.

**5. Reciprocal-append string presence (3 existing glossaries)**
V-49-20 through V-49-22 assert the literal string `[Linux Provisioning Glossary](_glossary-linux.md)` appears in each of the 3 existing glossaries. This is a string-presence check, not an anchor-resolution check (anchor resolution is C13's scope).

### Each Criterion Satisfied by ≥1 Measurable Test

All 5 ROADMAP success criteria map to at least one check that runs in CI. C10 provides an independent blocking check for frontmatter beyond what check-phase-49.mjs asserts. The combination of check-phase-49.mjs + v1.5-milestone-audit.mjs constitutes the complete Phase 49 test suite.

---

## 10. Risks + Mitigations

### Risk 1: Live-environment verification gaps (intune-portal version, kernel minimums)

**Specific gap:** Microsoft Learn does not pin a specific `intune-portal` version. The GA/HWE kernel minimum versions for intune-portal compatibility are not documented. The matrix cells require `[verify-on-current-Ubuntu]` markers.

**Mitigation:** 
- Use `[verify-on-current-Ubuntu]` inline markers in matrix cells where live verification is needed (D-10 STACK.md research-flags pattern)
- Executor runs `apt info intune-portal` on Ubuntu 22.04/24.04 at execution time and records the version
- Glossary entry for `intune-portal (package)` carries the source confidence rating and a note that version should be verified at `last_verified` date
- The 60-day `review_by` cycle ensures the matrix is refreshed before becoming stale

### Risk 2: Identity Broker v2.0.2+ behavior — live verification not available

**Specific gap:** SUMMARY.md rates Identity Broker v2.0.2+ re-enrollment behavior at HIGH confidence (Microsoft Learn Linux deployment guide 2026-03-31) but live-environment verification of the re-enrollment ID change is not feasible without a test Ubuntu enrollment.

**Mitigation:**
- Source the Non-version Breakpoints H3 content from Microsoft Learn (HIGH confidence)
- Add source URL and `last_verified: 2026-04-26` to the H3 content explicitly
- Use the `> ⚠️` callout shape for the admin action item (not a factual assertion)
- Phase 50 LIN-05 owns deeper verification at that phase's research time

### Risk 3: Pin-coordinate shifts during commit-2 reciprocal appends

**Specific risk:** Adding a sentence to the `_glossary-android.md` top blockquote (lines 12-13) shifts all 7 pinned lines in `v1.5-audit-allowlist.json` for that file by +1. If the pin refresh is not done atomically in the same commit, `--self-test` will fail.

**Mitigation (D-22, Phase 48 D-14):**
- Run `regenerate-supervision-pins.mjs --report` BEFORE committing commit-2
- Include `v1.5-audit-allowlist.json` in the commit-2 file set
- Run `--self-test` AFTER commit-2 and verify exit 0 before proceeding to terminal sanity
- The executor must not commit the reciprocal appends and the pin refresh in separate commits

### Risk 4: GFM footnote rendering inconsistency (D-08)

**Specific risk:** `[^1]` footnote syntax doesn't render in VS Code preview or MkDocs without extension. Authors may see broken rendering during development.

**Mitigation (CD-05):**
- Accept both `[^1]` and inline parenthetical fallback in the validator (V-49-09 accepts either pattern)
- Document the rendering behavior in the glossary itself if IDE rendering is a known issue
- GitHub web is the authoritative rendering target for this project; `[^1]` renders correctly there
- If multiple reviewers encounter rendering issues, switch to inline parenthetical before phase close

### Risk 5: Validator false positives on collision audit (D-23)

**Specific risk:** The PITFALL-5 collision audit may flag legitimate shared vocabulary that appears in multiple glossaries but does NOT represent a semantic collision (e.g., the word "agent" might appear as a glossary H3 in both Linux and Android glossaries with genuinely different meanings that are already cross-referenced).

**Mitigation (D-23, Phase 48 D-15 YAGNI):**
- Implement the collision audit with H3 heading text as the detection unit (not body text)
- The `> **Cross-platform note:**` blockquote within 5 lines satisfies the check even if a collision is detected
- If any H3 in the Linux glossary triggers a false-positive detection (term appears in another glossary but is an intentional legitimate collision with proper cross-reference), the check should PASS (cross-reference blockquote present)
- Only if a term has NO cross-reference blockquote does the check FAIL
- First false-positive that cannot be resolved by adding a cross-reference note → lazy-add `c5_collision_allowlist[]` to `v1.5-audit-allowlist.json`

### Risk 6: ROADMAP/REQUIREMENTS SC#4 wording correction merge conflict

**Specific risk:** Phase 48 D-09 also has a pending SC#1 wording correction to ROADMAP.md. If Phase 48 is still in progress when Phase 49 commit-1 lands, the ROADMAP.md edit in Phase 49 commit-1 may conflict.

**Mitigation (D-18, CDI-03):**
- Phase 49 depends on Phase 48 completion — Phase 49 should not begin until Phase 48's VERIFICATION.md is written
- At Phase 49 commit-1 time, check for any pending ROADMAP.md edits from Phase 48 and resolve conflicts
- The SC#4 correction (line 172: "all 4" → "all 3") is a localized change unlikely to conflict with Phase 48's SC#1 correction

### Risk 7: Cross-Platform Collisions H2 validator string pinned too rigidly

**Specific risk:** D-25 pins the H2 string `## Cross-Platform Collisions` in both the glossary AND the validator (CDI-02). If a future phase (50+) needs to rename this H2, it requires a same-commit validator update.

**Mitigation:**
- Document this brittleness tradeoff explicitly in a comment in `check-phase-49.mjs` near the H2 string constant
- The planner is aware per CONTEXT.md D-25 and Coupling alert 2 in Referee report
- Phase 50-52 plan authors receive this constraint via DPO-04 downstream-phase obligation

---

## 11. Source Confidence Ratings

| Claim | Confidence | Source |
|---|---|---|
| `intune-portal` is deb from packages.microsoft.com | HIGH | Microsoft Learn microsoft-intune-app-linux 2026-04-08 |
| Ubuntu 22.04 + 24.04 are supported pair | HIGH | Microsoft Learn enroll-linux 2026-04-08 |
| Ubuntu 20.04 dropped in Intune 2508 (August 2025) | HIGH | Microsoft Learn platform-guide-linux 2026-04-16 |
| 4 compliance categories (Allowed Distributions, Custom, Encryption, Password) | HIGH | Microsoft Learn ref-linux-settings 2026-04-16 |
| Web-app CA only via Edge 102.x+ | HIGH | Microsoft Learn platform-guide-linux 2026-04-16 |
| No app push / no config profiles / no ZTE on Linux | HIGH | Microsoft Learn platform-guide-linux 2026-04-16 |
| GNOME desktop required | HIGH | Microsoft Learn platform-guide-linux 2026-04-16 |
| Identity Broker v2.0.2+ re-enrollment creates new device IDs | HIGH | Microsoft Learn Linux deployment guide 2026-03-31 |
| intune-agent.timer systemd user timer | MEDIUM | Community troubleshooting; not in Microsoft Learn |
| microsoft-identity-broker service name | MEDIUM | Community troubleshooting; not explicitly in Microsoft Learn |
| Specific GA/HWE kernel versions per Ubuntu LTS | MEDIUM | Ubuntu wiki; not documented by Microsoft for intune-portal |
| `/var/log/intune-update.log` file path | LOW-MEDIUM | Inferred; not documented in Microsoft Learn |
| journalctl as primary diagnostic surface | HIGH | Consistent with all Linux Intune troubleshooting references |
| GFM `[^1]` footnote renders on GitHub web | HIGH | GitHub GFM footnote support documented (2022+) |
| GFM `[^1]` does NOT render in VS Code preview | HIGH | VS Code extension capability; community-verified |
| GFM anchor lowercases heading text | HIGH | GitHub documentation + practical verification |
| Em-dash in heading becomes `--` in anchor | HIGH | GFM specification behavior |
| pin coordinate shift = +1 per sentence added above pins | HIGH | Deterministic line-count arithmetic from v1.5-audit-allowlist.json |

---

*Researched: 2026-04-26*
*Phase 49: Linux Foundation — Taxonomy, Glossary, Version Matrix*
*Inputs: 49-CONTEXT.md (locked decisions), .planning/research/SUMMARY+STACK+PITFALLS, Phase 34 Android foundation precedent, existing glossaries + lifecycle docs + validators*
