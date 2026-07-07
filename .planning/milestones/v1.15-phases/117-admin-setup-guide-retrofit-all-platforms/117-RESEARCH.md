# Phase 117: Admin-Setup Guide Retrofit (all platforms) - Research

**Researched:** 2026-07-05
**Domain:** Markdown documentation retrofit (EEE SOP standard) + Node.js built-in mechanical tooling + a locked custom harness validator (C17)
**Confidence:** HIGH (every claim below is either read directly from the checked-in source of truth — `c17-eee-contract.mjs`, `retrofit-runbook.mjs`, `EEE-SOP-standard.md`, the four admin templates, `RE-index.md` — or produced by executing a Node script against the live `docs/admin-setup-*/` corpus in this session. No external library/API research was required; this is a 100% in-repo, node-builtins-only domain.)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 — Phase granularity:** ONE Phase 117 carved into multiple batched **plans** — NOT split into per-platform roadmap sub-phases. (Protects `REQUIREMENTS.md:13` 1-req-1-phase rule and the Phase-119 HARN-03 `CHAIN_PHASES=[48..118]` / `frozen-at-close.mjs` V114 SHA-pin `7d922a7` from a renumber cascade.)
- **D-02 — Batch grouping & size:** Carve the 57 enrolled files into **~6 size-balanced, platform-homogeneous plans** (one D1 label per plan where filename ranges allow); split large dirs on natural filename/topic seams (e.g. android core `00-08` | AOSP-OEM `09-13`; macOS core `00-06` | SSO `07-11`). **802.1X stays ONE cohesive plan** (`02,03,04,05,06,07` — `00/01` are mermaid-deferred) because `03-07` depend on the shared `00/01/02` foundations; its multi-label heterogeneity is not a #9 correctness risk (only reviewer-eyeballing is mildly harder).
- **D-03 — Guide Summary lead: per-platform-template-matched (3A′, OVERTURNED from generic 3A by Adversary).** Each `## Summary` lead is authored to the Summary prescription of the platform template that governs the file, keyed by frontmatter `platform`:
  - **Windows** (apv1, apv2, `8021x/03-windows`) → generic `admin-template.md:41`: state the Autopilot framework (APv1/APv2/both), the platform, and the required admin role/permissions.
  - **Android** (admin-setup-android, `8021x/06-android`) → `admin-template-android.md:50`: state the Android Enterprise enrollment mode (COBO/BYOD/Dedicated/AOSP), whether Managed Google Play and/or Zero-Touch portal access is required, and the Intune admin role.
  - **iOS** (admin-setup-ios, `8021x/05-ios`) → `admin-template-ios.md:42`: state the enrollment method/feature (ADE/supervised/APNs), the required ABM + Intune admin roles, and any supervised-device prerequisite.
  - **macOS** (admin-setup-macos, `8021x/04-macos`) → `admin-template-macos.md:42`: state the enrollment method/feature (ADE/MDM profile/Platform SSO), the required ABM + Intune admin roles, and any macOS version prerequisite.
  - **Linux** (admin-setup-linux, `8021x/07-linux`) and **`all`** (`8021x/02`) → generic scope-lead shape (platform + task scope + required admin role), **omitting** the APv1/APv2 framework clause.
  - Every Summary ≥30 words (C17 #5); reformat-only — summarize existing Prerequisites/RBAC content, do not add new claims.
- **D-04 — Owner value: uniform `Intune Admin Lead`** for all 57 enrolled files. `owner` is frontmatter-only, never in the block (C17 #8 only asserts presence/non-empty; never evaluated against block text). This deliberately diverges from the platform templates' `reviewer` comment roles (Android/iOS/macOS Platform Lead) — `owner` ≠ `reviewer`, neither is rendered; record this in the plan so it is not later flagged as an inconsistency.
- **D-05 — Mermaid carve-out:** 9 files hard-fail C17 #1 (top-level `\`\`\`mermaid` fence, no allowlist) — **carved out, left un-enrolled (no EEE keys), deferred to v1.16.** Enrolled scope = 66 − 9 = **57 files**. The 9: `apv1/00-overview.md` (RE-076), `apv1/01-hardware-hash-upload.md` (RE-077), `apv2/00-overview.md` (RE-087), `android/00-overview.md` (RE-092), `ios/00-overview.md` (RE-106), `macos/00-overview.md` (RE-116), `linux/00-overview.md` (RE-128), `8021x/00-overview.md` (RE-134), `8021x/01-eap-method-overview.md` (RE-135).
- **D-GC-01 — #12 blockquote workload is 66/66 files, not 52 (grounding correction, re-verified independently in this research — see below).** Gate relocation alone does NOT clear #12; every over-limit group needs a word-preserving structural split (Transform A: sentence-boundary split into blank-line-separated blockquotes) or a de-blockquote to a bold-led paragraph (Transform B). Trims/rewords are FORBIDDEN.
- **Authoring notes (locked, do not reinvent):** platform inference for the 16 keyless files (apv1 11 + apv2 5) → inject `platform: Windows`; gate relocation keys on structural position (first pre-H1 blockquote), never on the literal string; block field-set/order = `Platform · Doc Type · Doc ID · Status`, `·` separator, `owner` NEVER in the block; `Status: Approved` for the 57; `Last Reviewed` = existing `last_verified` verbatim + the `v1.15 EEE reformat — content not re-reviewed` Version-History row; registry `RE-index.md` Status flips `Pending → Approved` for the 57 (the 9 stay `Pending`).

### Claude's Discretion (resolve at plan time)

- Exact plan count and precise file-to-plan assignment within the D-02 size-balanced homogeneous scheme (target ~6 plans; platform-homogeneous; split heavy dirs on natural filename seams).
- Exact shape/name of the mechanical retrofit helper — reuse/guard `scripts/pipeline/retrofit-runbook.mjs` with care (known defects) or fork/fix a guide variant.
- The exact ≥30-word Summary prose per guide (reformat-only, per-platform-template lead).

### Deferred Ideas (OUT OF SCOPE)

- The 9 mermaid-bearing admin-setup files → v1.16 (D-05).
- Phase 118 (RETRO-03) — reference-doc retrofit + table remediation, including reference-class Guides (`RE-153/154/155`) and end-user Guides (`RE-175/176`).
- Phase 119 — frozen-surface re-baseline + 13th Path-A lineage bump + close.
- v1.16 — orphan docs + structural classes + end-user Guides + the parked Mermaid decision.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RETRO-02 | All admin-setup guides (Windows/macOS/iOS/Android/Linux/802.1X, all platforms) retrofitted to EEE (header block + Summary-first + normalized Platform label + Status: Approved) | This document verifies the exact C17 assertion mechanics the retrofit must satisfy (Code Examples / Common Pitfalls), quantifies the #12 blockquote workload per file (Architecture Patterns table), confirms a **new, previously-undocumented data-loss defect** in the 116 helper script that would silently drop real content from 3 confirmed admin-setup files if reused unmodified (Common Pitfalls #1), and provides a concrete per-directory batch-effort table for D-02 plan sizing (Architecture Patterns). |

</phase_requirements>

## Summary

This phase is a pure mechanical+hand-authoring reformat of 57 Markdown files (66 minus 9 mermaid-deferred) against a fully-specified, already-built target: `docs/_standards/EEE-SOP-standard.md` defines the format, `docs/_templates/admin-template{,-android,-ios,-macos}.md` define the four per-platform target shapes, `docs/_registry/RE-index.md` supplies the `RE-076`…`RE-141` Doc IDs, and `scripts/validation/c17-eee-contract.mjs` (already live, immutable, HARN-01/Phase-115-complete) is the single source of pass/fail truth. Nothing in this phase requires external research — every fact needed to plan it precisely is either already written into the repo or was verified in this session by running the actual validator logic against the actual corpus.

Three things materially change the plan shape versus the Phase-116 precedent it is modeled on. **First**, this research independently re-executed the C17 assertion #12 (blockquote ≤200-char) logic against all 66 admin-setup files and reproduces the CONTEXT.md D-GC-01 numbers exactly (370 total over-limit groups across 66 files, `ios/04-configuration-profiles.md` = 30 groups, `macos/07-platform-sso-setup.md` = 1,892-char worst offender) — confirming D-GC-01 is accurate and giving a full per-file effort table for batch planning (below). **Second**, this research discovered — by testing the actual pre-H1 span structure of every file — that the 116 helper script `retrofit-runbook.mjs`'s gate-detection logic (which captures only the *first* contiguous `/^>/` run before the H1) has a **confirmed, concrete, silent-content-loss defect on this corpus**: `admin-setup-ios/02-abm-token.md` and `admin-setup-macos/01-abm-configuration.md` each carry a *second*, separate pre-H1 blockquote (a substantive "Rebrand notice" about the ABM→Apple Business name change) that the unmodified script would delete outright, and five AOSP android files (`09`–`13`) carry pre-H1 HTML authoring-instruction comments that would also be dropped. **Third**, none of the 66 admin-setup files has an existing `## Version History` section (versus 74/75 in the runbook corpus) — the retrofit helper's "create new section" code path, not its "prepend to existing" path, is the one that will actually run for every single file.

**Primary recommendation:** Fork a new `scripts/pipeline/retrofit-guide.mjs` (do not reuse `retrofit-runbook.mjs` in place) that (a) generalizes gate relocation to **whole-pre-H1-span relocation** (not just the first blockquote run) to fix the confirmed data-loss defect, (b) targets the `docs/admin-setup-*/` path allowlist with `doc_type: Guide` and the uniform `owner: Intune Admin Lead`, (c) always creates a new `## Version History` section, and (d) emits the same `[FILL-IN]` Summary placeholder pattern so hand-authoring and per-file C17 verification proceed exactly as in Phase 116.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Doc ID assignment (`RE-NNN`) | Registry (`docs/_registry/RE-index.md`) | Pipeline Script | Registry is the sole authoritative join source by path; the script only reads it, never invents IDs |
| EEE frontmatter + block-line injection | Pipeline Script (`scripts/pipeline/retrofit-guide.mjs`, forked) | Documentation Corpus | Mechanical, deterministic per-file transform; no judgment required |
| Pre-H1 span relocation (gate + any secondary blockquotes/comments) | Pipeline Script | Documentation Corpus | Structural-position detection, not string matching; must capture the ENTIRE pre-H1 span, not just the first blockquote run (Common Pitfalls #1) |
| `## Summary` prose (≥30 words, per-platform-template lead) | Documentation Corpus (hand-authored) | — | Judgment-bound; script emits `[FILL-IN]` placeholder only, per D-03 |
| `owner` value | Pipeline Script (uniform constant) | Documentation Corpus | Uniform `Intune Admin Lead` per D-04 — no per-file judgment |
| #12 blockquote-group compliance (word-preserving splits) | Documentation Corpus (hand-authored) | Validation Harness (measurement) | Requires per-instance judgment (Transform A vs. B); harness only measures, never fixes |
| Structural pass/fail gate (13 assertions) | Validation Harness (`c17-eee-contract.mjs`) | — | Immutable per Phase-115 D-04; never edited during content phases |
| Registry lifecycle (`Pending → Approved`) | Registry | — | Manual table edit per batch, after C17 exit 0 for that batch's files |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js | v24.17.0 `[VERIFIED: node --version, executed this session]` | Runtime for the mechanical retrofit helper and the C17 validator | Repo convention: `scripts/pipeline/` and `scripts/validation/` are node-builtins-only (`node:fs`, `node:path`, `node:process`) — zero npm dependencies, per the explicit code comment in every existing script in both directories |

**No external packages are installed or required by this phase.** The entire retrofit is Markdown text transformation using Node built-in modules only, matching the established `scripts/pipeline/` idiom (`convert.ps1`, `guard-docx.mjs`, `retrofit-runbook.mjs` all follow this rule).

### Supporting

None — this phase has no supporting-library needs beyond Node built-ins.

### Alternatives Considered

Not applicable — no library selection decision exists in this phase.

**Installation:** None required (Node.js already present and verified at v24.17.0).

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages (no `npm install`, no `pip install`, no `cargo add`). All tooling is Node.js built-in modules (`node:fs`, `node:path`, `node:process`) mirroring every existing script in `scripts/pipeline/` and `scripts/validation/`. The Package Legitimacy Gate protocol is a no-op here; no `slopcheck` run was needed or performed.

## Architecture Patterns

### System Architecture Diagram

```
docs/_registry/RE-index.md (RE-076..RE-141, Path→DocID join)
          │
          ▼
scripts/pipeline/retrofit-guide.mjs  (forked from retrofit-runbook.mjs — NEW for Phase 117)
  ├─ reads docs/admin-setup-*/*.md (57 enrolled targets; 9 mermaid files skipped)
  ├─ injects: doc_id (registry join) · status: Approved · owner: Intune Admin Lead ·
  │           doc_type: Guide · platform: Windows (injected for the 16 keyless apv1/apv2 files)
  ├─ emits EEE block line: **Platform:** X · **Doc Type:** Guide · **Doc ID:** RE-NNN · **Status:** Approved
  ├─ relocates the ENTIRE pre-H1 span (gate blockquote + any 2nd blockquote + HTML
  │   comments, in original order) to immediately after "## Summary" placeholder
  ├─ creates a NEW "## Version History" section (all 66 files currently lack one)
  └─ writes [FILL-IN: >=30 words, per-platform-template Summary lead] placeholder
          │
          ▼
Hand-authoring pass (per file, per batch plan)
  ├─ Replace [FILL-IN] Summary with real ≥30-word prose (D-03 per-platform-template lead)
  ├─ Fix every C17 #12 over-limit blockquote group (Transform A sentence-split or
  │   Transform B de-blockquote — see Common Pitfalls #2/#3 for which shape needs which)
  └─ Fill Version-History row date at commit time
          │
          ▼
node scripts/validation/c17-eee-contract.mjs   (immutable gate, Phase-115 HARN-01)
  ├─ Enrollment = opt-in by doc_id-key presence (lines 519-533) — batches independently
  │   mergeable; the 9 mermaid files stay un-enrolled by staying keyless
  └─ Exit 0 required before batch merge / phase close (SC4)
          │
          ▼
docs/_registry/RE-index.md  Status column: Pending → Approved  (57 files; 9 stay Pending)
```

### Recommended Project Structure

No new directories are created. Only these existing locations are touched:

```
scripts/pipeline/
└── retrofit-guide.mjs          # NEW — forked from retrofit-runbook.mjs (D-03 discretion)

docs/admin-setup-{apv1,apv2,android,ios,macos,linux,8021x}/
└── *.md                        # 57 enrolled files modified in place; 9 mermaid files untouched

docs/_registry/
└── RE-index.md                 # Status column: Pending → Approved for the 57
```

### Pattern 1: Whole-Pre-H1-Span Relocation (supersedes 116's "first blockquote run only")

**What:** Capture *everything* between the header-block insertion point and the first H1 — not just the first contiguous `/^>/` run — and relocate that entire span, in original relative order, to immediately after the `## Summary` placeholder.

**When to use:** Every one of the 57 enrolled files, because 3 confirmed files in this corpus (see Common Pitfalls #1) have pre-H1 content beyond a single gate blockquote that `retrofit-runbook.mjs`'s narrower "first run only" logic would silently discard.

**Example (concrete, from `admin-setup-ios/02-abm-token.md`, verified this session):**
```markdown
<!-- BEFORE (raw file, lines 9-19) -->
> **Platform gate:** This guide covers iOS/iPadOS ADE token configuration via Apple Business Manager and Intune.
> For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

> **Rebrand notice (2026-04-14):** Apple Business Manager (ABM) became **Apple Business** on
> 2026-04-14. This guide retains the legacy "ABM" terminology for portal-navigation continuity
> but uses the new "Apple Business" framing in cross-references. See the [Apple Business
> Governance Glossary](../_glossary-apple-business.md) for the full rebrand-mapping table.

# ABM/ADE Token Configuration for iOS/iPadOS
```
```markdown
<!-- AFTER (target shape — BOTH blockquotes preserved, in order, after Summary) -->
**Platform:** iOS · **Doc Type:** Guide · **Doc ID:** RE-108 · **Status:** Approved

# ABM/ADE Token Configuration for iOS/iPadOS

## Summary

[FILL-IN: >=30 words, per-platform-template (iOS) Summary lead]

> **Platform gate:** This guide covers iOS/iPadOS ADE token configuration via Apple Business Manager and Intune.
> For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

> **Rebrand notice (2026-04-14):** Apple Business Manager (ABM) became **Apple Business** on
> 2026-04-14. This guide retains the legacy "ABM" terminology for portal-navigation continuity
> but uses the new "Apple Business" framing in cross-references. See the [Apple Business
> Governance Glossary](../_glossary-apple-business.md) for the full rebrand-mapping table.

## Prerequisites
...
```
Both blockquotes independently satisfy #12 already (each ≤200 chars per-group when measured separately — verify per file); the fix here is about **not losing the second one**, not about splitting it.

### Pattern 2: Transform B (de-blockquote) for structured multi-paragraph WARNING/DANGER/NOTE callouts with embedded code

**What:** Convert an entire structured callout box — one that uses **bare `>` continuation lines** (a lone `>` with nothing after it) to create visual paragraph breaks *within* the blockquote, and/or embeds a fenced code block *inside* the blockquote (`> \`\`\`powershell`) — into an un-blockquoted, bold-led section. This removes the whole box from C17 #12's scanning universe while preserving every word, list item, and code line verbatim.

**When to use:** Files with a small number of *very large* single-group violations, not many small ones — the dominant shape in `admin-setup-8021x/03-windows.md` (measured worst group = 1,868 chars, spanning body lines 105-138: a `dot3svc` service-dependency WARNING containing prose + a `Get-Service`/`Set-Service` PowerShell snippet + a Remediations deployment paragraph, all under one blockquote because the intervening lines are bare `>` not truly blank lines) and in `macos/07-platform-sso-setup.md` (1,892-char worst group).

**Critical mechanical discovery (verified this session, not previously documented):** C17's `inCodeFence` mask (lines 150-176 of `c17-eee-contract.mjs`) only recognizes a fence marker (` ``` ` or `~~~`) when it is the **first character of the line**. A blockquoted code fence — `> \`\`\`powershell` — does **not** match `/^(\`{3,}|~{3,})/` (the line starts with `>`, not a backtick), so **the validator's code-fence detector never activates inside a blockquote**. This means every line of an embedded code sample inside a WARNING/DANGER box counts fully toward the #12 character total — it is not masked the way a top-level fenced code block would be. Confirming this explains why files with embedded PowerShell inside blockquote callouts (`8021x/03-windows.md`) produce the largest single-group violations in the corpus.

**Example (structural, from the confirmed 1,868-char group):**
```markdown
<!-- BEFORE: one ~34-line blockquote group (bare `>` lines don't break it; the
     `> \`\`\`powershell` fence is invisible to inCodeFence) -->
> **WARNING -- dot3svc (Wired AutoConfig) service dependency:**
>
> The Wired AutoConfig service (`dot3svc`) must be running for Windows 802.1X wired
> authentication to engage. ...
>
> **Detect:** Run `sc query dot3svc` and look for `STATE: STOPPED`; ...
>
> **Remediate:** Set the service to automatic startup and start it:
>
> ```powershell
> Set-Service -Name dot3svc -StartupType Automatic
> Start-Service -Name dot3svc
> ```
>
> **Detection pattern for Intune Remediations:** ...
```
```markdown
<!-- AFTER: de-blockquoted — a normal bold-led admonition; the code fence is now a
     REAL top-level fence (masked from any future #12 scan); zero words changed -->
**WARNING -- dot3svc (Wired AutoConfig) service dependency:**

The Wired AutoConfig service (`dot3svc`) must be running for Windows 802.1X wired
authentication to engage. ...

**Detect:** Run `sc query dot3svc` and look for `STATE: STOPPED`; ...

**Remediate:** Set the service to automatic startup and start it:

```powershell
Set-Service -Name dot3svc -StartupType Automatic
Start-Service -Name dot3svc
```

**Detection pattern for Intune Remediations:** ...
```

### Pattern 3: Transform A (sentence-boundary split) for single-paragraph prose callouts

**What:** Split one long continuous-prose blockquote (no bare-`>` paragraph breaks, no embedded code — just one very long sentence-chain) into multiple blockquotes separated by a truly blank line (zero characters), at clause/sentence boundaries.

**When to use:** The macOS `07-platform-sso-setup.md` 1,892-char worst-offender group is this shape — a single "Key distinction" callout that is one long multi-sentence paragraph, not a multi-section WARNING box. Also the dominant shape in `ios/04-configuration-profiles.md` (30 separate over-limit groups, each a short "what breaks"-style callout ~1-2 sentences over 200 chars — volume-driven effort, not complexity-driven).

**Example (pattern, mirrors the 116 D-05/Transform-A convention exactly):**
```markdown
> Multi-sentence blockquote. First sentence here explaining the constraint.

> Second sentence in a new group, still part of the same logical callout.
```
The blank line between groups MUST be a truly empty line (zero characters) — an empty `>` line (just the character `>`, no trailing space or text) does **not** split the group; C17's `/^>/` test still matches it and the group continues (verified directly against `c17-eee-contract.mjs:390,393`).

### Anti-Patterns to Avoid

- **Reusing `retrofit-runbook.mjs`'s gate-detection unmodified:** it captures only the first contiguous `/^>/` run before the H1 (`retrofit-runbook.mjs:279-287`) and discards everything else in the pre-H1 span via the `bodyLines.slice(firstH1Idx + 1)` cut (`retrofit-runbook.mjs:290`). Confirmed silent-content-loss on `ios/02-abm-token.md`, `macos/01-abm-configuration.md` (each: 2 pre-H1 blockquotes), and `android/09,10,11,12,13` (pre-H1 HTML comments). See Common Pitfalls #1.
- **Trimming or rewording an over-200-char blockquote to fit:** forbidden by the reformat-only envelope (`REQUIREMENTS.md:75-76`) — only structural splits (Transform A) or de-blockquoting (Transform B) are permitted. If a single atomic sentence genuinely cannot be split without changing a word, escalate to the content owner rather than trim (D-GC-01 / 116 D-05 precedent).
- **Matching gate relocation on the literal string "Version gate" / "Platform gate" / "Scope":** match by structural position (first content in the pre-H1 span) only — literal-string matching breaks the moment a file uses a different callout label (which several 8021x and android files already do — "Scope:", "Prerequisites:", "Platform note:").
- **Copy-pasting `last_verified: 1970-01-01` (TEMPLATE-SENTINEL) into a retrofitted file:** this silently disables C17 #9 and #12 for that file (`c17-eee-contract.mjs:135-137`), producing a false-green result while the file still carries over-limit blockquotes. None of the 66 admin-setup files currently carry the sentinel — verified this session — so this is a write-time guard requirement for the new script, not a pre-existing condition to fix.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Doc ID lookup | Hand-transcribing `RE-NNN` per file | `buildDocIdMap()` join-on-path against `RE-index.md` (verbatim reusable from `retrofit-runbook.mjs:122-132`) | C17 #9 is an unforgiving exact-match; any hand-typo fails the gate silently until run |
| Platform-label normalization | A second, divergent D1 map in the new script | Copy `D1_MAP` verbatim from `c17-eee-contract.mjs:26-47` (already done once, correctly, in `retrofit-runbook.mjs:44-65`) | Any divergence between the script's map and the validator's map causes C17 #9/#10 to fail unpredictably — this is the single most-repeated warning across Phases 114/115/116 |
| #12 over-limit detection | A new ad-hoc blockquote scanner | The exact logic at `c17-eee-contract.mjs:387-405` (copy verbatim as the pre/post measurement tool, exactly as 116-PATTERNS.md Artifact Class 3 did) | Any deviation (e.g., not excluding code-fenced lines, or splitting on `> ` instead of `>`) produces a measurement that doesn't match what the actual gate checks, wasting a full hand-authoring pass |
| Frontmatter parsing | A YAML library | The existing multiline-regex pattern `/^---\n([\s\S]*?)\n---/m` (`c17-eee-contract.mjs:122`, `retrofit-runbook.mjs:209`) | All 7 templates begin with an HTML comment before the frontmatter; `content.startsWith('---')` fails on every one of them (documented Pitfall 1 in the C17 header comment) |

**Key insight:** every mechanical piece of this phase — Doc ID join, D1 normalization, #12 measurement, frontmatter parsing — was already built correctly once in Phase 115/116 and is directly copy-pasteable. The only genuinely new code this phase needs is (a) the path allowlist for `admin-setup-*/`, (b) the uniform-owner constant, (c) `doc_type: Guide`, and (d) the whole-pre-H1-span capture fix (Pattern 1 above). Everything else is verbatim reuse.

## Common Pitfalls

### Pitfall 1: Reusing the 116 helper's narrow gate-capture silently deletes real content (CONFIRMED on 3 file-shapes in this corpus)

**What goes wrong:** `retrofit-runbook.mjs` captures only the *first* contiguous blockquote run before the H1 and discards all other pre-H1 content when it reassembles the file body.

**Why it happens:** The detection loop (`retrofit-runbook.mjs:278-287`) breaks as soon as it finds and closes the first `/^>/` run; the reassembly (`retrofit-runbook.mjs:290,311-332`) only re-inserts `gateLines` (that one run) plus everything *after* the original H1 — anything between the end of that first run and the H1 itself (a second blockquote, or a plain HTML comment) is never referenced again and is dropped.

**Confirmed instances (verified this session by scripted structural scan of all 66 files' pre-H1 spans):**
- `admin-setup-ios/02-abm-token.md` — 2 separate pre-H1 blockquotes (gate + a substantive "Rebrand notice" about ABM→Apple Business terminology).
- `admin-setup-macos/01-abm-configuration.md` — same 2-blockquote pattern (identical Rebrand-notice callout).
- `admin-setup-android/09-aosp-realwear.md`, `10-aosp-zebra.md`, `11-aosp-pico.md`, `12-aosp-htc-vive-focus.md`, `13-aosp-meta-quest.md` — pre-H1 HTML authoring comments (4-8 non-blank lines) explaining why the MGP/Zero-Touch subsections are intentionally omitted for AOSP.

**How to avoid:** Capture the entire span from the end of frontmatter (or from just after the header-block insertion point) to the start of the first H1 as one unit, and relocate that whole unit — preserving internal blank lines and ordering — to after the `## Summary` placeholder (see Architecture Patterns Pattern 1).

**Warning signs:** If the retrofit script's dry-run reports "gate-relocated=Y" but the resulting file is shorter (character count) than `frontmatter+block+H1+Summary+placeholder+[everything after original H1]` should produce, content was dropped. Diff the pre-H1 span byte-for-byte against the post-Summary relocated span as a per-file completion check for these 7 confirmed files at minimum.

### Pitfall 2: Bare `>` lines inside a blockquote look like paragraph breaks but do NOT split the #12 group

**What goes wrong:** A human (or a naive splitting script) sees a `>` line with nothing else on it inside a long callout and assumes it separates two independent blockquotes for #12 purposes. It does not — C17's #12 scanner (`c17-eee-contract.mjs:388-405`) treats any line matching `/^>/` as part of the same contiguous run, including a bare `>`. Only a **truly empty line** (zero characters, no `>` at all) breaks the group.

**Why it happens:** Several admin-setup WARNING/DANGER/NOTE callouts (notably in `8021x/03-windows.md`, several macOS SSO files) use bare `>` lines purely for Markdown-rendering paragraph breaks *within* a single blockquote — this is intentional authoring style, not a #12-group boundary.

**How to avoid:** When applying Transform A (sentence-split), replace the bare `>` separator with a genuine blank line at the chosen split point — this simultaneously creates the visual break AND the #12 group boundary. When applying Transform B (de-blockquote), this distinction disappears entirely (no blockquote markers remain).

**Warning signs:** Running the #12 measurement one-liner before and after a supposed "split" and seeing the character count unchanged.

### Pitfall 3: Blockquoted code fences are invisible to C17's code-fence mask

**What goes wrong:** A fenced code block written as `> \`\`\`powershell` / `> Set-Service ...` / `> \`\`\`` inside a callout is NOT recognized as a code fence by `c17-eee-contract.mjs`'s `inCodeFence` detector, because that detector only matches a fence marker at the start of the line (`/^(\`{3,}|~{3,})/`) — a line starting with `>` never matches. Every character of that embedded code sample counts toward the #12 total.

**Why it happens:** This is a genuine validator behavior, not a bug to be worked around in the validator (C17 is immutable per Phase-115 D-04) — it must be worked around in the *content* shape instead.

**How to avoid:** For callouts with embedded code samples that need to shrink below 200 chars per group, de-blockquote the entire callout (Transform B) rather than attempting to keep the code fenced inside a shortened blockquote — once de-blockquoted, the fence becomes a real top-level fence and both the code AND any future prose around it are correctly masked from #12.

**Warning signs:** A file where the #12 measurement reports a single group length in the 900-1900+ char range that, on inspection, contains a `\`\`\`` fence — this is the signature of this pitfall.

### Pitfall 4: All 66 admin-setup files lack a `## Version History` section (unlike 74/75 runbooks in Phase 116)

**What goes wrong:** A helper script forked from `retrofit-runbook.mjs` that assumes the "prepend to existing table" code path is the common case (true for L1/L2 — only 1 of 75 files lacked the section) will instead exercise the "create new section at end of file" path (`insertVersionHistoryRow`'s `vhIdx === -1` branch) for literally every one of the 57 target files this phase.

**Why it happens:** Admin-setup guides were never given a Version History convention prior to this retrofit — verified by grepping all 66 files for `^## Version History`, zero matches.

**How to avoid:** Test the "create new section" path thoroughly (it is the ONLY path this phase exercises) rather than the "prepend" path; do not assume the 116 test-coverage ratio (mostly-prepend, rarely-create) carries over.

**Warning signs:** None expected if this is planned for up front — flagged here purely so the plan doesn't under-test the "create" branch on the (false) assumption it's a rare edge case.

## Code Examples

### Exact C17 assertion line-ranges verified against the live validator (cross-checked against CONTEXT.md's citations — all confirmed correct)

```javascript
// Source: scripts/validation/c17-eee-contract.mjs (read verbatim this session)

// #1 — no top-level mermaid fence (lines 201-209); hard-fails the 9 carved-out files
const hasMermaid = bodyLines.some((l, i) => !inCodeFence[i] && /^```mermaid/.test(l));
if (hasMermaid) { violations.push({ assertion: 1, detail: 'Mermaid code fence found (```mermaid)' }); }

// #5 — Summary >=30 words (line 262)
if (wordCount < 30) { violations.push({ assertion: 5, detail: `## Summary has ${wordCount} word(s), need ≥30` }); }

// #8 — required frontmatter keys present incl. owner (lines 282-293; owner check at 287)
if (!ownerMatch || !ownerMatch[1]) missing.push('owner');

// #9 — block<->frontmatter exact match, incl. D1-normalized Platform field (lines 298-329)
if (parsedFields[0].value !== platformLabel) { violations.push({ assertion: 9, ... }); }

// #10 — platform resolves in D1_MAP, hard failure, no fallback (lines 331-339)
if (platformRaw === undefined) { violations.push({ assertion: 10, detail: 'platform key is absent...' }); }
else if (!platformRaw || !(platformRaw in D1_MAP)) { violations.push({ assertion: 10, detail: `platform: "${platformRaw}" is not in the D1 map...` }); }

// #12 — every top-level blockquote GROUP <=200 chars, joined with a single space (lines 387-405)
const bqText = bqLines.join(' ');
if (bqText.length > 200) { violations.push({ assertion: 12, detail: `Blockquote exceeds 200 chars (${bqText.length} chars)` }); }
```
`[VERIFIED: scripts/validation/c17-eee-contract.mjs, read + executed via --self-test this session]`

### D1 map coverage — clean for the entire admin-setup corpus (verified by grep, not assumed)

```
# Raw platform: values found across all 66 admin-setup files (grep -H "^platform:" this session):
all, windows, macos, ios, android, linux   (802.1X dir, lowercase)
Android, iOS, macOS, Linux                 (per-platform dirs, proper case)
# absent entirely: apv1 (11 files), apv2 (5 files) — 16 keyless files requiring platform: Windows injection
```
All 10 distinct raw values above are present in `D1_MAP` (`c17-eee-contract.mjs:26-47`). No unmapped value exists in this corpus. `[VERIFIED: grep -H "^platform:" docs/admin-setup-*/*.md, executed this session]`

### #12 violation reproduction — this research's independent measurement matches CONTEXT.md D-GC-01 exactly

Running the exact `c17-eee-contract.mjs:387-405` logic (Node one-liner, this session) against all 66 non-sentinel admin-setup files produced **370 total over-limit blockquote groups across all 66 files** — an exact match to D-GC-01's claim. Selected confirmations:

| File | Over-limit groups | Max group length |
|------|-------------------|-------------------|
| `ios/04-configuration-profiles.md` | **30** | 580 |
| `android/05-dedicated-devices.md` | 18 | 1,080 |
| `android/08-cope-full-admin.md` | 16 | 982 |
| `macos/03-configuration-profiles.md` | 16 | 634 |
| `macos/07-platform-sso-setup.md` | 11 | **1,892 (corpus worst)** |
| `8021x/03-windows.md` | 3 | 1,868 |
| `apv1/05` through `apv2/02` | 1 each | exactly 237 (the shared "Version gate" boilerplate text) |

`[VERIFIED: Node one-liner reproducing c17-eee-contract.mjs:387-405, executed against docs/admin-setup-*/*.md this session]`

### Full per-file #12 effort table (for D-02 batch-size balancing — Claude's Discretion input)

```
8021x/00-overview.md            2 groups (max 309)   [mermaid-deferred, NOT enrolled]
8021x/01-eap-method-overview.md 2 groups (max 586)   [mermaid-deferred, NOT enrolled]
8021x/02-cert-delivery-foundation.md  4 groups (max 966)
8021x/03-windows.md             3 groups (max 1868)
8021x/04-macos.md               2 groups (max 912)
8021x/05-ios.md                 2 groups (max 843)
8021x/06-android.md             2 groups (max 1072)
8021x/07-linux.md               5 groups (max 949)
  -> 8021X ENROLLED PLAN (02,03,04,05,06,07): 18 groups total, but 2 files (03,07-linux) carry
     near-1000-1900-char single groups requiring careful Transform-B de-blockquoting

android/00-overview.md          1 group (max 479)    [mermaid-deferred, NOT enrolled]
android/01-managed-google-play.md    2 groups (max 520)
android/02-zero-touch-portal.md      8 groups (max 425)
android/03-fully-managed-cobo.md    13 groups (max 664)
android/04-byod-work-profile.md     12 groups (max 798)
android/05-dedicated-devices.md     18 groups (max 1080)
android/06-aosp-stub.md              2 groups (max 383)
android/07-knox-mobile-enrollment.md 5 groups (max 474)
android/08-cope-full-admin.md       16 groups (max 982)
  -> ANDROID CORE (01-08): 76 groups total -- HEAVY plan
android/09-aosp-realwear.md          1 group  (max 508)
android/10-aosp-zebra.md             3 groups (max 575)
android/11-aosp-pico.md              3 groups (max 643)
android/12-aosp-htc-vive-focus.md    2 groups (max 535)
android/13-aosp-meta-quest.md        3 groups (max 623)
  -> ANDROID AOSP-OEM (09-13): 12 groups total -- LIGHT plan (but all 5 files need the
     Pattern-1 pre-H1-HTML-comment-preservation fix)

apv1/00-overview.md              2 groups (max 427)   [mermaid-deferred, NOT enrolled]
apv1/01-hardware-hash-upload.md  8 groups (max 362)   [mermaid-deferred, NOT enrolled]
apv1/02-deployment-profile.md    2 groups (max 310)
apv1/03-esp-policy.md            3 groups (max 417)
apv1/04-dynamic-groups.md        6 groups (max 402)
apv1/05-deployment-modes-overview.md  1 group (max 237)
apv1/06-user-driven.md           4 groups (max 274)
apv1/07-pre-provisioning.md      3 groups (max 290)
apv1/08-self-deploying.md        6 groups (max 279)
apv1/09-intune-connector-ad.md   7 groups (max 527)
apv1/10-config-failures.md       1 group  (max 237)
apv2/00-overview.md              1 group (max 237)    [mermaid-deferred, NOT enrolled]
apv2/01-prerequisites-rbac.md    1 group (max 237)
apv2/02-etg-device-group.md      1 group (max 237)
apv2/03-device-preparation-policy.md  2 groups (max 332)
apv2/04-corporate-identifiers.md      2 groups (max 417)
  -> WINDOWS PLAN (apv1 02-10 + apv2 01-04, 13 files): 39 groups total -- MEDIUM plan,
     mostly small/uniform (the 237-char "Version gate" boilerplate repeats 4x verbatim)

ios/00-overview.md               1 group (max 357)    [mermaid-deferred, NOT enrolled]
ios/01-apns-certificate.md       5 groups (max 441)
ios/02-abm-token.md              4 groups (max 427)   [ALSO the Pitfall-1 2-blockquote case]
ios/03-ade-enrollment-profile.md 11 groups (max 437)
ios/04-configuration-profiles.md 30 groups (max 580)
ios/05-app-deployment.md        11 groups (max 428)
ios/06-compliance-policy.md     10 groups (max 702)
ios/07-device-enrollment.md      1 group (max 402)
ios/08-user-enrollment.md        9 groups (max 508)
ios/09-mam-app-protection.md     5 groups (max 595)
  -> iOS PLAN (01-09, 9 files): 86 groups total -- HEAVIEST single plan by group-count
     (dominated by 04's 30 groups)

linux/00-overview.md             2 groups (max 578)   [mermaid-deferred, NOT enrolled]
linux/01-intune-linux-agent.md   3 groups (max 1158)
linux/02-enrollment-profile.md   4 groups (max 524)
linux/03-compliance-policy.md    7 groups (max 743)
linux/04-app-delivery.md         3 groups (max 554)
linux/05-conditional-access.md   2 groups (max 605)
  -> LINUX PLAN (01-05, 5 files): 19 groups total -- LIGHT plan, but 01's 1,158-char
     group needs Transform B (installer/config code sample likely embedded)

macos/00-overview.md             1 group (max 283)    [mermaid-deferred, NOT enrolled]
macos/01-abm-configuration.md   11 groups (max 437)   [ALSO the Pitfall-1 2-blockquote case]
macos/02-enrollment-profile.md  13 groups (max 1458)
macos/03-configuration-profiles.md  16 groups (max 634)
macos/04-app-deployment.md       9 groups (max 474)
macos/05-compliance-policy.md    8 groups (max 592)
macos/06-config-failures.md      1 group (max 283)
  -> MACOS CORE (01-06, 6 files): 58 groups total -- MEDIUM-HEAVY plan
macos/07-platform-sso-setup.md  11 groups (max 1892)  <- corpus-worst single group
macos/08-auth-methods-deep-dive.md  10 groups (max 1043)
macos/09-enterprise-sso-plugin-migration.md  5 groups (max 1392)
macos/10-kerberos-sso-extension.md  12 groups (max 892)
macos/11-graph-api-platform-credential.md  4 groups (max 462)
  -> MACOS SSO (07-11, 5 files): 42 groups total -- HEAVY plan (fewer files, but the
     largest single-group violations in the entire corpus concentrate here)
```
`[VERIFIED: Node script executed this session against git-tracked docs/admin-setup-*/*.md]`

### Recommended plan structure (Claude's Discretion input — not locked)

| # | Plan | Files | D1 label(s) | #12 groups | Relative effort |
|---|------|-------|-------------|-----------|------------------|
| 0 | Author/fork `retrofit-guide.mjs` + self-test | — | — | — | Prerequisite (mirrors 116-01) |
| 1 | Windows (apv1 `02-10` + apv2 `01-04`) | 13 | Windows | 39 | Medium (uniform, low variance) |
| 2 | Android core `01-08` | 8 | Android | 76 | Heavy |
| 3 | Android AOSP-OEM `09-13` | 5 | Android | 12 | Light (but Pitfall-1 fix applies to all 5) |
| 4 | iOS `01-09` | 9 | iOS | 86 | Heaviest by group-count |
| 5 | macOS core `01-06` | 6 | macOS | 58 | Medium-heavy |
| 6 | macOS SSO `07-11` | 5 | macOS | 42 | Heavy (largest single groups in corpus) |
| 7 | Linux `01-05` | 5 | Linux | 19 | Light |
| 8 | 802.1X `02,03,04,05,06,07` (cohesive, per D-02 mandate) | 6 | Windows/macOS/iOS/Android/Linux/All (heterogeneous, locked as one plan) | 18 | Light-medium, but structurally the trickiest (Transform B code-embedded WARNING boxes) |

9 total plans (1 helper + 8 batches) — slightly above the CONTEXT.md D-02 "~6" ballpark, but this is the direct, unavoidable consequence of CONTEXT.md's own explicit instructions to split android and macOS into 2 seams each while keeping 802.1X as 1 cohesive plan (6 D1-homogeneous groupings + 2 mandated splits = 8, plus the helper-authoring plan mirrors 116-01's precedent of giving the script its own plan). This table is a starting recommendation for the planner, not a locked decision — Claude's Discretion per CONTEXT.md still governs final plan count and boundaries.

## State of the Art

Not applicable in the conventional sense (no external framework/library evolution to track). The relevant "state of the art" is entirely internal to this repository's own v1.15 milestone:

| Old Approach (pre-v1.15) | Current Approach (this phase) | When Changed | Impact |
|---------------------------|-------------------------------|---------------|--------|
| Admin-setup guides have no `## Version History` section at all | Every retrofitted guide gets one created (not prepended — see Pitfall 4) | This phase | The helper script's "create" code path, rarely exercised in Phase 116, is the ONLY path exercised here |
| Gate blockquote relocation = "first `/^>/` run before H1" (Phase 116 implementation) | Must generalize to "entire pre-H1 span" (this phase) | This phase (grounding correction from this research) | Fixes a confirmed silent-content-loss defect on 7 files that Phase 116's narrower runbook corpus never exercised (no L1/L2 runbook has a 2nd pre-H1 blockquote or a pre-H1 HTML comment) |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The exact ≥30-word per-platform-template Summary prose wording is not prescribed beyond the template's bracketed instructions — the planner/executor must hand-author it per D-03's per-platform lead requirement | User Constraints / Architecture Patterns | Low — this is explicitly Claude's Discretion per CONTEXT.md, not a research gap |
| A2 | The recommended 9-plan structure (Code Examples table) is a reasonable balance of D-02's "~6 plans" ballpark against its own android/macOS split mandate | Code Examples | Low — explicitly presented as a non-locked recommendation; planner may merge/split further |

**No `[ASSUMED]`-tagged factual claims exist in this research.** Every technical claim about C17 behavior, the D1 map, the #12 workload, the retrofit-helper defect, and the corpus structure was either read directly from checked-in source files or produced by executing verification scripts against the live repository in this session (tagged `[VERIFIED: ...]` inline above). This is an entirely in-repo domain with no external library or API research surface.

## Open Questions

1. **Should the new `retrofit-guide.mjs` be a true fork (separate file) or should `retrofit-runbook.mjs` be generalized into a shared parameterized helper?**
   - What we know: CONTEXT.md leaves this as Claude's Discretion; the two scripts would share ~80% of their code (D1_MAP, readFile, walkMd, relNormalize, insertVersionHistoryRow, frontmatter parsing) verbatim.
   - What's unclear: whether a shared/parameterized helper risks re-breaking the now-frozen, already-shipped `retrofit-runbook.mjs` (Phase 116 is DONE and its output is already merged/approved) if a shared refactor introduces a regression.
   - Recommendation: fork (create a new standalone `retrofit-guide.mjs`) rather than refactor the existing script in place — this fully protects the completed Phase 116 deliverable from any accidental regression, at the cost of ~20% code duplication that is explicitly acceptable per the `scripts/pipeline/` convention (each script in that directory is already self-contained with its own verbatim-copied D1_MAP, per the explicit "NEVER diverge" comment convention observed in both existing scripts).

2. **Does the whole-pre-H1-span relocation fix (Pattern 1) need to handle a pre-H1 span with NO blockquote at all (only HTML comments, as in the 5 AOSP android files)?**
   - What we know: those 5 files have a real gate blockquote (a single, unbroken run) PLUS trailing HTML comments before H1 — not comments-only.
   - What's unclear: whether any of the 57 enrolled files could have zero blockquote and only comments (this session's scan found none, but the scan was structural-shape-based, not exhaustive of every possible future edit before plan execution).
   - Recommendation: implement Pattern 1 as "capture the whole span regardless of shape" (not "capture blockquote, then separately handle comments") so no edge case is possible — this is a strictly more general and equally simple fix.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Mechanical retrofit script + C17 validator | ✓ | v24.17.0 | — |
| `scripts/validation/c17-eee-contract.mjs` | Per-file/per-batch gate | ✓ (already live, self-test passes 4/4) | Phase-115 HARN-01, immutable | — |
| `docs/_registry/RE-index.md` | Doc ID join | ✓ | RE-076..RE-141 rows present, all `Status: Pending` | — |
| `docs/_templates/admin-template{,-android,-ios,-macos}.md` | D-03 per-platform Summary lead prescriptions | ✓ | All 4 present and read this session | — |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None.

## Validation Architecture

Skipped — `.planning/config.json` sets `workflow.nyquist_validation: false` explicitly.

## Security Domain

`.planning/config.json` does not set `security_enforcement` (absent = enabled per protocol), so this section is included for completeness. This phase has effectively no security surface: it is a pure Markdown-to-Markdown text reformat with no authentication, session handling, network calls, or user input processing. The one relevant control is defensive coding in the mechanical retrofit script itself.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth surface in this phase |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Yes (narrow) | The retrofit script's own guards — path allowlist (only `docs/admin-setup-*/`), TEMPLATE-SENTINEL refusal, doc_id-must-resolve-in-registry, platform-must-resolve-in-D1_MAP — mirror `retrofit-runbook.mjs`'s existing 4 guards (lines 197-238) and should be carried into the forked script unchanged; these prevent the script from silently writing into the wrong directory or emitting an unmapped-platform / unresolved-doc_id block that C17 would then hard-fail on anyway |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

Not applicable — no injection, auth, or crypto surface exists in a Markdown-reformat-only phase operating on a trusted, git-tracked corpus with no external/untrusted input.

## Sources

### Primary (HIGH confidence — read verbatim or executed this session)

- `scripts/validation/c17-eee-contract.mjs` — read in full (587 lines); `--self-test` executed (4/4 pass)
- `scripts/pipeline/retrofit-runbook.mjs` — read in full (561 lines) — source of the confirmed Pitfall-1 defect analysis
- `docs/_standards/EEE-SOP-standard.md` — read in full (416 lines) — D1 map, block format, Doc Type taxonomy, D2 semantics, C17 needle-spec cross-reference table
- `docs/_templates/admin-template.md`, `admin-template-android.md`, `admin-template-ios.md`, `admin-template-macos.md` — all four read in full
- `docs/_registry/RE-index.md` — `RE-076`..`RE-141` rows read (grep), header/format read
- `.planning/phases/117-admin-setup-guide-retrofit-all-platforms/117-CONTEXT.md` — full adversarial-review-produced context, read in full
- `.planning/phases/116-l1-l2-runbook-retrofit-75-docs/116-CONTEXT.md` and `116-PATTERNS.md` — direct precedent, read in full
- `.planning/REQUIREMENTS.md`, `.planning/STATE.md` — read in full
- Direct corpus verification executed this session: `grep -rl '\`\`\`mermaid' docs/admin-setup-*/`, `grep -rL "^platform:" docs/admin-setup-*/*.md`, `grep -H "^platform:" docs/admin-setup-*/*.md`, `grep -rl "^## Summary"`/`"^doc_id:"`/`"^## Version History"` (all files, all 66), and a Node script reproducing the exact `c17-eee-contract.mjs:387-405` #12-measurement logic against all 66 files (370 total over-limit groups — exact match to CONTEXT.md D-GC-01), plus a second Node script scanning every file's pre-H1 span structure (confirmed the 7 files affected by the Pitfall-1 defect)

### Secondary (MEDIUM confidence)

None — no external sources were needed for this phase.

### Tertiary (LOW confidence)

None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Node.js built-ins only, version verified by direct execution, zero external packages
- Architecture: HIGH — every pattern is either the already-shipped Phase-116 precedent or a fix directly derived from executing the actual validator/corpus this session
- Pitfalls: HIGH — all four pitfalls are either read verbatim from validator source or confirmed by direct scripted verification against the live corpus (not inferred or assumed)

**Research date:** 2026-07-05
**Valid until:** Effectively indefinite for the C17/EEE-standard mechanics (immutable per Phase-115 D-04; the standard itself is Phase-114-locked) — but re-verify the #12 per-file counts and the Pitfall-1 file list if any admin-setup file is edited between this research and plan execution (30-day nominal validity for the corpus-state-dependent tables).
