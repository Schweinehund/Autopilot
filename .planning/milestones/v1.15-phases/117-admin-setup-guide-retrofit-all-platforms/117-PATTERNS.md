# Phase 117: Admin-Setup Guide Retrofit (all platforms) — Pattern Map

**Mapped:** 2026-07-05
**Files analyzed:** 3 artifact classes (57 enrolled guides + 1 new helper script + 1 registry) across 7 dirs / 6 platform families
**Analogs found:** 3 / 3

---

## File Classification

| New/Modified Artifact | Role | Data Flow | Closest Analog | Match Quality |
|------------------------|------|-----------|-----------------|---------------|
| `docs/admin-setup-apv1/{02..10}.md` (10 files, Windows) | documentation (guide) | transform (reformat) | `docs/_templates/admin-template.md` | exact |
| `docs/admin-setup-apv2/{01..04}.md` (4 files, Windows) | documentation (guide) | transform (reformat) | `docs/_templates/admin-template.md` | exact |
| `docs/admin-setup-android/{01..13}.md` (13 files) | documentation (guide) | transform (reformat) | `docs/_templates/admin-template-android.md` | exact |
| `docs/admin-setup-ios/{01..09}.md` (9 files) | documentation (guide) | transform (reformat) | `docs/_templates/admin-template-ios.md` | exact |
| `docs/admin-setup-macos/{01..11}.md` (11 files) | documentation (guide) | transform (reformat) | `docs/_templates/admin-template-macos.md` | exact |
| `docs/admin-setup-linux/{01..05}.md` (5 files) | documentation (guide) | transform (reformat) | `docs/_templates/admin-template.md` (generic, no Linux-specific template exists) | role-match |
| `docs/admin-setup-8021x/{02,03,04,05,06,07}.md` (6 files, heterogeneous) | documentation (guide) | transform (reformat) | per-file platform template (03→generic, 04→macos, 05→ios, 06→android, 02/07→generic) | exact-per-file |
| `scripts/pipeline/retrofit-guide.mjs` (NEW) | utility (transform script) | batch transform, file-I/O | `scripts/pipeline/retrofit-runbook.mjs` (Phase 116) | role-match, fork-not-reuse (confirmed defect) |
| `docs/_registry/RE-index.md` (Status column, RE-076..RE-141 rows except the 9 mermaid-deferred) | config / registry | CRUD (row edits) | `docs/_registry/RE-index.md` itself (Phase 116 precedent: same file, same edit shape) | self-update |

**9 files NOT enrolled this phase** (mermaid-deferred, D-05 — leave keyless, do not touch): `apv1/00-overview.md`, `apv1/01-hardware-hash-upload.md`, `apv2/00-overview.md`, `android/00-overview.md`, `ios/00-overview.md`, `macos/00-overview.md`, `linux/00-overview.md`, `8021x/00-overview.md`, `8021x/01-eap-method-overview.md`.

---

## Critical Structural Note: One Shared Recipe, Per-Platform Summary Template

Every one of the 57 files gets the **same mechanical transform** (Artifact Class 2 below) and the **same target shape** (Artifact Class 1). The only per-file variation is:

- Which of the 4 Summary-prescription templates governs the hand-authored `## Summary` prose (keyed by frontmatter `platform`, per D-03/3A′ — see the per-platform template excerpts below)
- Whether `platform:` must be injected (`apv1`/`apv2` = 16 keyless files → inject `Windows`; all others already carry `platform:`)
- The `#12` blockquote-fix effort per file (Transform A sentence-split vs. Transform B de-blockquote — see RESEARCH.md Architecture Patterns 2/3)
- Whether the file needs the **whole-pre-H1-span fix** (Pattern 1 below) rather than 116's narrower first-blockquote-only capture — this applies to **all 57 files** as the correctness baseline (only 7 of them will actually exercise the multi-span case, but the helper must implement it universally, not conditionally)

`owner` is uniform (`Intune Admin Lead`, D-04) and `doc_type: Guide` is uniform for all 57 — no per-file variation there.

---

## Pattern Assignments

### Artifact Class 1: Retrofitted Admin-Setup Guide Shape

**Primary analogs:** the four platform templates — `docs/_templates/admin-template.md` (Windows/Linux/generic), `docs/_templates/admin-template-android.md`, `docs/_templates/admin-template-ios.md`, `docs/_templates/admin-template-macos.md`
**Secondary analog (already-retrofitted, Approved, EEE-conformant real file):** `docs/l1-runbooks/01-device-not-registered.md` (Phase 116 output — proves the exact post-retrofit shape a validator-passing file takes, including gate-after-Summary placement)

#### Current (pre-retrofit) admin-setup file shape — verified this session

`docs/admin-setup-apv1/02-deployment-profile.md` (lines 1-14, a plain single-gate-blockquote Windows file, no `platform:` key):

```markdown
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Deployment Profile Configuration

The Autopilot deployment profile controls how the device behaves during OOBE...
```

**Confirms:** no `doc_id`/`status`/`owner`/`doc_type`/`platform` keys yet (pre-enrollment); no `## Summary`; the gate blockquote is the sole pre-H1 span content; no `## Version History` anywhere in the file (D-GC-01/Pitfall 4).

#### Frontmatter key set pattern (`admin-template.md` lines 23-33)

```yaml
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: all
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: admin
---
```

**Retrofit rule:** Inject `doc_id`, `status`, `owner`, `doc_type` at the top (new keys). Retain `last_verified`, `review_by`, `applies_to`/`audience` verbatim from the existing file. Inject `platform: Windows` ONLY for the 16 keyless apv1/apv2 files (all other 41 files already carry `platform:`). Set:
- `doc_id:` from registry path join (`RE-index.md`, never hand-transcribe)
- `status: Approved` (all 57 — live retrofitted guides, per D-04/authoring notes)
- `owner: Intune Admin Lead` (uniform, all 57, D-04 — diverges deliberately from the per-platform template `Reviewer:` comment role; record this, don't "fix" it)
- `doc_type: Guide` (uniform)

#### EEE block line pattern — 4 platform-specific examples (verbatim template lines)

```markdown
<!-- admin-template.md:35 (generic/Windows/Linux) -->
**Platform:** All Platforms · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft

<!-- admin-template-android.md:44 -->
**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft

<!-- admin-template-ios.md:36 -->
**Platform:** iOS · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft

<!-- admin-template-macos.md:36 -->
**Platform:** macOS · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft
```

**Concrete real-file retrofit target** (RE-108, `admin-setup-ios/02-abm-token.md`):

```markdown
**Platform:** iOS · **Doc Type:** Guide · **Doc ID:** RE-108 · **Status:** Approved
```

**Retrofit rule:** Replace the placeholder with the actual D1 label (from `D1_MAP`, joined off the file's own `platform:` value — apv1/apv2 files use the injected `Windows`), the real `RE-NNN` (registry join by path), `Status: Approved`. Field order fixed: `Platform · Doc Type · Doc ID · Status`; `·` = U+00B7 middle-dot; `owner` NEVER appears in the block (Phase-114 D-01/D-05, C17 #7).

#### Body order pattern — proven-passing real file (`docs/l1-runbooks/01-device-not-registered.md` lines 1-24)

```markdown
---
doc_id: RE-002
status: Approved
owner: L1 Team Lead
doc_type: Runbook
platform: Windows
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** RE-002 · **Status:** Approved

# Device Not Registered in Autopilot

## Summary

This runbook covers read-only L1 diagnostic steps only — ... [≥30 words] ...

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

Use this runbook when a device is not found in the [Autopilot](../_glossary.md#autopilot) portal. ...

## Prerequisites
...
```

**Retrofit rule for admin-setup (D-03/3A′ shape):** identical skeleton — blank → block line → blank → H1 → blank → `## Summary` → blank → `[FILL-IN]`/hand-authored ≥30-word prose (per-platform-template lead, NOT the L1/L2 safety-banner lead — admin-config guides aren't diagnostic-read-only) → blank → the **entire pre-H1 span** (gate blockquote + any 2nd blockquote + HTML comments, in original order — see Pattern 1 below) → blank → rest of body.

#### `## Summary` per-platform-template lead prescriptions (D-03/3A′ — exact template wording to key off)

```markdown
<!-- Windows: admin-template.md:41 -->
[2–3 sentences ... Minimum 30 words. State which Autopilot framework (APv1, APv2, or both)
this guide covers, the platform it applies to, and the admin role or permissions required
to follow the steps.]

<!-- Android: admin-template-android.md:50 -->
[... Minimum 30 words. State which Android Enterprise enrollment mode this guide covers
(e.g., COBO, BYOD Work Profile, Dedicated, AOSP), whether it requires Managed Google Play
and/or Zero-Touch portal access, and the Intune admin role required.]

<!-- iOS: admin-template-ios.md:42 -->
[... Minimum 30 words. State which enrollment method or feature this guide covers (e.g.,
ADE, supervised enrollment, APNs), the Apple Business Manager and Intune admin roles
required, and any supervised-device prerequisites.]

<!-- macOS: admin-template-macos.md:42 -->
[... Minimum 30 words. State which enrollment method or feature this guide covers (e.g.,
ADE, MDM profile, Platform SSO), the Apple Business Manager and Intune admin roles
required, and any macOS version prerequisites.]
```

**Retrofit rule:** Linux + `all`/802.1X-generic files use the Windows/generic shape MINUS the APv1/APv2-framework clause (CONTEXT.md D-03). Every Summary ≥30 words (C17 #5); summarize existing Prerequisites/RBAC content only — no new claims (reformat-only envelope).

#### Version-History row pattern (identical to 116, all 57 files use the CREATE path — Pitfall 4)

```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-05 | v1.15 EEE reformat — content not re-reviewed | — |
```

**Retrofit rule:** Unlike Phase 116 (74/75 files had an existing section to prepend into), **zero of the 66 admin-setup files have a `## Version History` section** — every one of the 57 enrolled files exercises the "create new section at end of file" code path. Date = actual retrofit commit date (fill at authoring/commit time, not a fixed string). `—` is an em-dash.

---

### Artifact Class 2: Mechanical Retrofit Helper Script (`scripts/pipeline/retrofit-guide.mjs`, NEW — forked from `retrofit-runbook.mjs`)

**Primary analog:** `scripts/pipeline/retrofit-runbook.mjs` (Phase 116, 561 lines, read in full) — reuse ~80% verbatim (D1_MAP, `readFile`, `walkMd`, `relNormalize`, `buildDocIdMap`, `insertVersionHistoryRow`, frontmatter regex, argv/--dry-run/--all/--self-test CLI shape, guard structure)
**Secondary analog:** `scripts/validation/c17-eee-contract.mjs` (the live gate whose exact assertion logic the helper's guards and any measurement tooling must mirror)

**Decision (per RESEARCH.md Open Question 1 + this phase's discretion):** **fork, don't refactor-in-place.** `retrofit-runbook.mjs` is a completed, shipped Phase-116 deliverable; a shared/parameterized refactor risks regressing it. Create a new standalone `scripts/pipeline/retrofit-guide.mjs` with its own verbatim-copied `D1_MAP` etc., matching the existing `scripts/pipeline/` convention (each script already is self-contained).

#### What to reuse verbatim from `retrofit-runbook.mjs`

| Element | Source lines | Change needed |
|---|---|---|
| Shebang + node-builtins-only import block | `retrofit-runbook.mjs:1-31` | None — copy verbatim |
| `D1_MAP` constant | `retrofit-runbook.mjs:44-65` | None — copy verbatim, NEVER diverge (C17 #9/#10 depend on exact match) |
| `padLabel`, `readFile` (CRLF normalize), `walkMd`, `relNormalize` | `retrofit-runbook.mjs:72-113` | None — copy verbatim |
| `buildDocIdMap` (registry join on Path column) | `retrofit-runbook.mjs:122-132` | None — copy verbatim; registry format identical (`RE-index.md`) |
| `insertVersionHistoryRow` | `retrofit-runbook.mjs:141-179` | None — copy verbatim; the `vhIdx === -1` (create) branch is the ONLY branch exercised this phase (Pitfall 4) — test it thoroughly |
| Frontmatter parse regex `/^---\n([\s\S]*?)\n---/m` | `retrofit-runbook.mjs:209` | None — copy verbatim |
| TEMPLATE-SENTINEL guard (`last_verified === '1970-01-01'`) | `retrofit-runbook.mjs:215-220` | None — copy verbatim |
| Doc-ID-unresolved guard | `retrofit-runbook.mjs:222-226` | None — copy verbatim |
| Platform-injection + D1_MAP guard | `retrofit-runbook.mjs:228-238` | None — copy verbatim (logic identical; just the injected value differs per file type, always `Windows` here too) |
| EEE block-line assembly | `retrofit-runbook.mjs:297-303` | Change `Runbook` literal to `Guide` |
| `[FILL-IN]` Summary placeholder | `retrofit-runbook.mjs:306` | Change banner text: `[FILL-IN: >=30 words, per-platform-template (PLATFORM) Summary lead]` — no tier/safety-banner wording (that's L1/L2-specific, not applicable to admin guides) |
| Self-test harness shape (5 sub-tests: registry parse, platform-injection, D1_MAP resolution, sentinel guard, path-allowlist) | `retrofit-runbook.mjs:352-477` | Change fixture platform value + path-allowlist fixture paths to `docs/admin-setup-*/` |
| Main runner (`--dry-run`, `--all`, per-file PASS/ERROR/WRITTEN output, exit codes) | `retrofit-runbook.mjs:482-558` | Change `--all` target dirs to the 7 `docs/admin-setup-*/` dirs (with the 9 mermaid files EXCLUDED from the file list — see guard changes below) |

#### What MUST change (the fork's actual new code)

**1. Path allowlist guard** (`retrofit-runbook.mjs:196-199` is the analog to modify):

```javascript
// retrofit-runbook.mjs's existing guard (analog to fork FROM):
if (!rel.startsWith('docs/l1-runbooks/') && !rel.startsWith('docs/l2-runbooks/')) {
  return { ok: false, rel, error: 'PATH-ALLOWLIST: path not in docs/l1-runbooks/ or docs/l2-runbooks/' };
}
```

Fork this to an allowlist of the 7 `docs/admin-setup-*/` directories (`admin-setup-apv1`, `admin-setup-apv2`, `admin-setup-android`, `admin-setup-ios`, `admin-setup-macos`, `admin-setup-linux`, `admin-setup-8021x`), and additionally hard-exclude the 9 mermaid-deferred filenames (RE-076/077/087/092/106/116/128/134/135's paths) — either as an explicit skip-list check in the guard, or by never including them in the `--all` target enumeration. Fail closed (ERROR, not silent skip) if invoked directly against one of the 9 by explicit path argument, so the script itself enforces D-05.

**2. Owner constant** — uniform, not per-tier (unlike 116's `isL1 ? 'L1 Team Lead' : 'L2 Desktop Lead'` at `retrofit-runbook.mjs:241-242`):

```javascript
// retrofit-runbook.mjs (Phase 116 per-tier owner — the pattern to REPLACE):
const isL1 = rel.startsWith('docs/l1-runbooks/');
const owner = isL1 ? 'L1 Team Lead' : 'L2 Desktop Lead';

// retrofit-guide.mjs (Phase 117 — uniform owner, D-04):
const owner = 'Intune Admin Lead';
```

**3. `doc_type` literal** — change `'Runbook'` to `'Guide'` in the new-frontmatter assembly (`retrofit-runbook.mjs:249`) and the block-line assembly (`retrofit-runbook.mjs:301`).

**4. Pattern 1 fix — whole-pre-H1-span relocation (the confirmed, load-bearing defect fix; supersedes `retrofit-runbook.mjs:276-288`'s first-blockquote-run-only capture):**

```javascript
// retrofit-runbook.mjs's ORIGINAL (narrower) gate-detection logic — the CONFIRMED-DEFECTIVE
// code to NOT reuse unmodified (retrofit-runbook.mjs:278-288):
let gateStart = -1, gateEnd = -1;
for (let i = 0; i < firstH1Idx; i++) {
  if (/^>/.test(bodyLines[i])) {
    gateStart = i;
    let j = i;
    while (j < bodyLines.length && /^>/.test(bodyLines[j])) j++;
    gateEnd = j;
    break;   // <-- BUG: stops after the FIRST blockquote run; anything else
             //     in the pre-H1 span (a 2nd blockquote, HTML comments) is
             //     silently dropped by the bodyLines.slice(firstH1Idx + 1) cut.
  }
}
const gateLines = (gateStart !== -1) ? bodyLines.slice(gateStart, gateEnd) : [];
```

**Fix for `retrofit-guide.mjs` — capture the ENTIRE span from end-of-frontmatter to firstH1Idx, not just the first `/^>/` run:**

```javascript
// Fixed: capture everything between the frontmatter close and the first H1,
// regardless of shape (blockquote runs, HTML comments, blank lines) — preserves
// internal ordering and blank-line structure exactly as authored.
const preH1Span = bodyLines.slice(0, firstH1Idx);
// (Then: trim only genuinely-leading/trailing blank lines from preH1Span before
// re-emitting after ## Summary + [FILL-IN], to avoid doubled blank lines.)
```

**Confirmed real-file cases this fixes** (verified in RESEARCH.md this session, and independently confirmed by reading the raw files in this pattern-mapping pass):
- `admin-setup-ios/02-abm-token.md` (RE-108) — TWO pre-H1 blockquotes: the `**Platform gate:**` (4 lines) AND a separate `**Rebrand notice (2026-04-14):**` callout (4 lines) about ABM→Apple Business terminology. Read verbatim this session (lines 9-17):
  ```markdown
  > **Platform gate:** This guide covers iOS/iPadOS ADE token configuration via Apple Business Manager and Intune.
  > For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).
  > For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
  > Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

  > **Rebrand notice (2026-04-14):** Apple Business Manager (ABM) became **Apple Business** on
  > 2026-04-14. This guide retains the legacy "ABM" terminology for portal-navigation continuity
  > but uses the new "Apple Business" framing in cross-references. See the [Apple Business
  > Governance Glossary](../_glossary-apple-business.md) for the full rebrand-mapping table.
  ```
  The unmodified `retrofit-runbook.mjs` logic would capture ONLY the first blockquote (`gateEnd` stops at the blank line after line 12) and silently discard the entire Rebrand-notice paragraph.
- `admin-setup-macos/01-abm-configuration.md` (RE-117) — same 2-blockquote shape (identical Rebrand-notice callout pattern).
- `admin-setup-android/09-aosp-realwear.md` (RE-101) and siblings `10/11/12/13-aosp-*.md` — verified this session: a single gate-blockquote run (2 lines: `**Platform gate:**` + `**Platform note:**`) followed by TWO separate pre-H1 HTML comments explaining AOSP's intentional MGP/Zero-Touch omission:
  ```markdown
  > **Platform gate:** RealWear AOSP device management ...
  > **Platform note:** AOSP management is a distinct surface from Android Enterprise ...

  <!-- The #### In Managed Google Play subsection is intentionally omitted.
       AOSP does not use Managed Google Play (no Google Mobile Services). -->

  <!-- The #### In Zero-Touch portal subsection is intentionally omitted.
       AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at a time. -->
  ```
  The original narrower logic's `break` after the first blockquote run would drop BOTH HTML comments. (Note: these two comments are themselves ≤200 chars each and NOT HTML — they don't need #12 splitting since #12 only scans `/^>/` lines — but they MUST be preserved for authoring-instruction continuity, hence Pattern 1.)

#### Self-test additions for the fork (beyond the 5 inherited sub-tests)

Add a 6th self-test sub-test proving the whole-pre-H1-span fix against a synthetic 2-blockquote + trailing-comment fixture, asserting the relocated span byte-length equals the original span byte-length (no content dropped) — this directly operationalizes the Pitfall-1 "Warning sign" check from RESEARCH.md (diff pre-H1 span byte-for-byte against post-Summary relocated span).

---

### Artifact Class 3: Registry Status Flip + #12 Completion Measurement

**Primary analog:** Phase 116's `RE-index.md` Status column edit pattern (same file, same lifecycle) + `c17-eee-contract.mjs:387-405` (assertion #12 exact logic, reused as the pre/post measurement tool exactly as 116-PATTERNS.md Artifact Class 3 did)

#### Registry row shape to flip (verbatim, `docs/_registry/RE-index.md` lines 92-157)

```markdown
| RE-078 | docs/admin-setup-apv1/02-deployment-profile.md | Deployment Profile Configuration | Guide | Pending |
```

**Retrofit rule:** Flip the trailing `Pending` → `Approved` for each of the 57 enrolled rows (`RE-078..RE-086` skip `RE-076/077`; `RE-088..RE-091` skip `RE-087`; `RE-093..RE-105` skip `RE-092`; `RE-107..RE-115` skip `RE-106`; `RE-117..RE-127` skip `RE-116`; `RE-129..RE-133` skip `RE-128`; `RE-136..RE-141` skip `RE-134/135`), after that batch's files pass C17 exit 0. Leave the 9 mermaid-deferred rows `Pending` (do NOT touch). This is a manual table edit, exactly as Phase 116 — the retrofit script does not auto-update the registry.

#### #12 measurement logic — reuse verbatim (`c17-eee-contract.mjs:387-405`, identical to 116-PATTERNS.md Artifact Class 3)

```javascript
if (!isTemplate) {
  let i = 0;
  while (i < bodyLines.length) {
    if (!inCodeFence[i] && /^>/.test(bodyLines[i])) {
      const bqLines = [];
      while (i < bodyLines.length && !inCodeFence[i] && /^>/.test(bodyLines[i])) {
        bqLines.push(bodyLines[i].replace(/^>\s?/, ''));
        i++;
      }
      const bqText = bqLines.join(' ');
      if (bqText.length > 200) {
        violations.push({ assertion: 12, detail: `Blockquote exceeds 200 chars (${bqText.length} chars)` });
      }
    } else {
      i++;
    }
  }
}
```

**Key invariants (identical to 116):** only lines whose first character is `>` count; strip one `> ` prefix per line; join consecutive lines with a single space; a truly empty line (zero chars) splits a group — a bare `>` line does NOT (RESEARCH.md Pitfall 2); lines inside code fences are excluded — but a blockquoted fence (`> \`\`\`powershell`) is NOT recognized as a fence by `inCodeFence` (RESEARCH.md Pitfall 3, confirmed this session) so its content still counts toward #12.

#### C17 enrollment scan (`c17-eee-contract.mjs:519-533`) — same mechanism as Phase 116

```javascript
const allMdPaths = walkMd('docs');
const enrolledFiles = [];
for (const absPath of allMdPaths) {
  const relPath = relNormalize(absPath);
  const raw = readFile(relPath);
  if (!raw) continue;
  const fm2 = raw.match(/^---\n([\s\S]*?)\n---/m);
  if (!fm2) continue;
  const hasDocId = fm2[1].match(/^doc_id:\s*(.+?)\s*(#.*)?$/m);
  if (!hasDocId) continue;
  if (!relPath.startsWith('docs/')) continue;
  enrolledFiles.push(relPath);
}
```

**Implication:** enrollment is opt-in by `doc_id:` key presence — batches are independently mergeable, and the 9 carved-out files stay invisible to C17 by staying keyless (D-05). Author the two-part per-phase SC per batch, exactly as Phase-115 D-02 / 116-PATTERNS.md Artifact Class 4:

```
SC-[batch]-ENROLL: All [N] files in this batch carry doc_id, status, owner, doc_type keys
  (enrollment precheck returns zero lines for this batch's file range; the 9 mermaid-deferred
  files are EXCLUDED from this batch's scope entirely, not just expected-fail)
SC-[batch]-C17:    node scripts/validation/c17-eee-contract.mjs exits 0 with zero violations
  for all [N] files in this batch (inspect per-file output for the batch paths)
```

---

## Shared Patterns

### Platform Injection Guard (16 files — apv1 + apv2 keyless Windows files)

**Source:** CONTEXT.md Authoring Notes / RESEARCH.md D1-map verification
**Apply to:** `admin-setup-apv1/{02..10}.md` (9 enrolled; `00/01` mermaid-deferred) and `admin-setup-apv2/{01..04}.md` (4 enrolled; `00` mermaid-deferred) = 13 enrolled keyless files needing `platform: Windows` injection (16 total keyless minus the 3 that are also mermaid-deferred: apv1/00, apv1/01, apv2/00)

Verified this session: `docs/admin-setup-apv1/02-deployment-profile.md` frontmatter has `last_verified`/`review_by`/`applies_to`/`audience` but no `platform:` key — confirms the keyless pattern.

```bash
grep -rL "^platform:" docs/admin-setup-apv1/ docs/admin-setup-apv2/
```

### Whole-Pre-H1-Span Relocation (all 57 files — supersedes 116's first-run-only)

**Source:** RESEARCH.md Architecture Patterns 1 / Common Pitfalls 1 (this phase's grounding correction over the 116 precedent)
**Apply to:** All 57 enrolled files as the baseline implementation (only 7 confirmed files actually have >1 span element, but the helper must be written generally, never conditionally on "is this one of the 7")

Match by structural position (everything between end-of-frontmatter and the first H1), never by literal string or blockquote-count assumption. See Artifact Class 2 Pattern 1 excerpts above for the two confirmed real-file cases.

### #12 Word-Preserving Blockquote Split Rule (66/66 files carry ≥1 violation — D-GC-01)

**Source:** CONTEXT.md D-GC-01 / RESEARCH.md Architecture Patterns 2 + 3, Common Pitfalls 2 + 3
**Apply to:** every over-limit group in all 57 enrolled files (370 total groups corpus-wide per RESEARCH.md's independent re-verification)

Two allowed transforms, identical vocabulary to 116 D-05:

**Transform A** (sentence-boundary split — for single-paragraph prose callouts, e.g. the 237-char "Version gate" boilerplate repeated 4x in apv1/apv2, and `ios/04-configuration-profiles.md`'s 30 small groups):
```markdown
> Multi-sentence blockquote. First sentence here explaining the constraint.

> Second sentence in a new group, still part of the same logical callout.
```
Blank line MUST be truly empty (zero chars) — a bare `>` line does not split the group (Pitfall 2).

**Transform B** (de-blockquote — for structured multi-paragraph WARNING/DANGER boxes with embedded code, e.g. `8021x/03-windows.md`'s 1,868-char `dot3svc` group and `macos/07-platform-sso-setup.md`'s 1,892-char corpus-worst group):
```markdown
**WARNING -- dot3svc (Wired AutoConfig) service dependency:**

The Wired AutoConfig service (`dot3svc`) must be running for Windows 802.1X wired
authentication to engage. ...

**Remediate:** Set the service to automatic startup and start it:

```powershell
Set-Service -Name dot3svc -StartupType Automatic
Start-Service -Name dot3svc
```
```
De-blockquoting converts an embedded `> \`\`\`powershell` fence into a REAL top-level fence, which IS masked by `inCodeFence` (Pitfall 3) — this is the only way to shrink a code-bearing callout below 200 chars without trimming/rewording (forbidden by reformat-only envelope).

**Forbidden:** trimming, rewording, removing words or links. Escalate unsplittable single-sentence over-200-char blockquotes to the content owner (116 D-05 precedent).

### D1_MAP Exact Match Requirement (all 57 files)

**Source:** `c17-eee-contract.mjs:26-47` / C17 assertion #9/#10
**Apply to:** All files — block line Platform field must equal `D1_MAP[frontmatter_platform]` exactly; unmapped = hard failure, no fallback

D1 map coverage is clean for the entire admin-setup corpus (verified by grep, this session and RESEARCH.md): `all, windows, macos, ios, android, linux` (802.1X, lowercase) + `Android, iOS, macOS, Linux` (per-platform dirs, proper case) — all 10 raw values resolve; no unmapped value exists.

### Template-Sentinel False-Pass Guard

**Source:** RESEARCH.md Common Pitfalls (referencing `c17-eee-contract.mjs:135-137`)
**Apply to:** All retrofitted files

None of the 66 admin-setup files currently carry `last_verified: 1970-01-01` (verified this session) — this is a write-time guard requirement for the new script (copy the `retrofit-runbook.mjs:215-220` guard verbatim), not a pre-existing condition to fix.

### Registry Status Update (Pending → Approved)

**Source:** Phase 116 precedent / `docs/_registry/RE-index.md`
**Apply to:** Each of the 57 files as its batch passes C17; the 9 mermaid-deferred rows stay `Pending`

Manual table edit per batch after C17 exit 0 for that batch's files — the retrofit script does not touch the registry.

---

## No Analog Found

None — all three artifact classes have strong, directly-reusable analogs already in the codebase (the four admin templates + the 116 helper script + the 116 registry-edit precedent + a real already-Approved retrofitted file to prove the target shape).

---

## Metadata

**Analog search scope:** `docs/_templates/` (all 4 admin templates), `scripts/pipeline/` (retrofit-runbook.mjs), `scripts/validation/` (c17-eee-contract.mjs), `docs/_registry/` (RE-index.md), `docs/l1-runbooks/` (proven-passing real retrofitted file), `docs/admin-setup-*/` (raw pre-retrofit corpus, 3 representative files read: apv1/02, ios/02-abm-token, android/09-aosp-realwear)
**Files scanned:** 9 (4 templates, retrofit-runbook.mjs, c17-eee-contract.mjs, RE-index.md, l1-runbooks/01-device-not-registered.md, plus 3 raw admin-setup corpus files)
**Pattern extraction date:** 2026-07-05
