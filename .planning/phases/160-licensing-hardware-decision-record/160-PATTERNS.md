# Phase 160: Licensing / Hardware Decision Record - Pattern Map

**Mapped:** 2026-09-12
**Files analyzed:** 8 (2 corpus documents, 2 planning-mutation targets, 4 phase artifacts)
**Analogs found:** 8 / 8

This is a documentation-corpus phase (per RESEARCH.md's own classification). There is no
application source code to pattern-match; "analogs" are prior corpus edits and prior plan
artifacts, all named in CONTEXT.md `<canonical_refs>`/`<code_context>`. Every excerpt below
was read directly from the repository at HEAD `ca3aac7a` this session — none paraphrased.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/recipes/06-walk-up-avd-kiosk-autologon.md` (Step 4 block + `:42` cell + See Also + Version History) | content/doc (STD-05 decision block) | transform (prose edit, in place) | Same file's own Step 2 (`:68-77`) and Step 3 (`:96-112`) decision blocks | exact — same document, same idiom, adjacent step |
| `docs/reference/licensing-matrix.md` (`:62` cell, new blockquote, Version History row) | content/doc (reference table + blockquote) | transform (cell edit + insert) | Phase 155 RCP-08's identical edit class to the same file, `155-04-SUMMARY.md` | exact — same file, same three-part edit shape (cell + blockquote + VH row), prior phase |
| `.planning/ROADMAP.md` (Phase 160 SC2 amendment) / `.planning/REQUIREMENTS.md` (LIC-02 amendment) | config/planning-doc | event-driven (annotate-and-supersede append) | `155-01-PLAN.md` (ROADMAP/REQUIREMENTS-editing plan, D-05 ordering amendment) | exact — same annotate-and-supersede mechanism, same file pair |
| `160-GATE-BASELINE.json` | config/artifact | batch (one-time snapshot) | `155-GATE-BASELINE.json` | exact — explicit precedent named in CONTEXT.md D-37 |
| `160-01-PLAN.md` / `160-02-PLAN.md` / `160-03-PLAN.md` frontmatter | config (plan frontmatter) | — | `159-05-PLAN.md` (`requirements: []` flip-control) and `155-01-PLAN.md` (wave/files_modified shape) | exact — both cited verbatim in CONTEXT.md D-35/D-39 |
| Fact-check dispatch (`160-FACTCHECK-RUBRIC.md`, `160-FACTCHECK-PACKET.md`, `160-FACTCHECK.md`) | service/utility (subprocess judge dispatch) | request-response (one-shot `claude -p`) | `156-03-PLAN.md`'s judge dispatch pattern; dispatch shape at `scripts/docs-style/_JUDGE-VERDICTS-batch10.json:13` | exact — same one-`claude -p`-per-packet idiom |
| `## See Also` additions (RE-237, two new external entries) | content/doc (link list) | — | Existing glossed external/relative entries in `docs/recipes/03-windows-11-multi-app-kiosk.md:321-328` and RE-237's own current See Also (`:293-300`) | exact — same file family, same em-dash-gloss convention |
| `160-EVIDENCE.md` needle list (handed to Phase 167) | doc/artifact (measurement record) | batch | Prior phase EVIDENCE-style measurement blocks inside `155-GATE-BASELINE.json`'s `counts_this_phase_changes` / `style_residual` sections | role-match — no direct `*-EVIDENCE.md` precedent read, but the measurement-record shape is the same as the JSON baseline's own count blocks |

## Pattern Assignments

### `docs/recipes/06-walk-up-avd-kiosk-autologon.md` — Step 4 STD-05 block (content, transform)

**Analog:** the file's own Step 2 decision block (lines 68-77) and Step 4's pre-existing table (lines 101-113).

**Structure to copy** (`docs/recipes/06-walk-up-avd-kiosk-autologon.md:68-77`, verbatim):
```
> **Ask the admin:** Do walk-up users share a local autologon account, or does each user sign in to Windows with their own Entra identity?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Local autologon account | Public-facing device; users may not hold their own Entra account; the only app is Windows App, which does its own Entra sign-in | Windows-level identity, Conditional Access at the console and FIDO2 at the sign-in screen are unavailable | Worked here — continue to [Step 3](#step-3-deploy-windows-app-with-auto-logoff) |
| Per-user Entra sign-in to Windows | Identified staff, FIDO2 keys at the console, Entra SSO carried into the session | Slower per sign-in; profile creation cost per user; not a walk-up experience | Not worked here — see the Shared PC branch of [RE-222](01-shared-windows-avd-client.md#step-5b-shared-pc-configuration) |

[prose paragraph]

> **What breaks if misconfigured:** Picking autologon and later needing per-user attribution at the Windows layer is a re-provision, not a policy edit.
```
This is the exact skeleton the new Step 4 block (bridge / lead-in / table / P1 / P2 / callout, per D-12) must follow — blank line between every element, Branch cells carrying real distinct links, callout closing the block. The existing Step-4 table at `:106-108` (target of the new block's insertion above it) already uses the identical `**[PILOT]**` in-cell marker convention the new MAK-arm cell must reuse (`:108`: `**[PILOT]** profile failed \`Class is not licensed for use\`…`).

**`:42` remedy cell rewrite target** — read at `docs/recipes/06-walk-up-avd-kiosk-autologon.md:42` (RCP-08-adjacent line, "Do this instead" cell); rewrite in place per D-10, keep `Class is not licensed for use` untouched.

**Do not touch:** RE-237:31 (byte-unchanged per D-13); the four kiosk blockquote lines are in the matrix, not this file.

---

### `docs/reference/licensing-matrix.md` — `:62` cell + new blockquote + Version History row (content, transform)

**Analog:** Phase 155 RCP-08's identical edit to this same file, recorded in `155-04-SUMMARY.md`.

**Precedent quote** (`.planning/milestones/v1.22-phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-04-SUMMARY.md`, Files Modified section):
```
`docs/reference/licensing-matrix.md` - RCP-08: incumbent Windows Subscription Activation row amended, new blockquote with the per-user-vs-per-device consequence and remedy reasoning, Version History row inserted newest-first; re-stamped
```
and the decision rationale in the same SUMMARY:
```
RCP-08 lands as an amendment, not a new row: the incumbent Windows Subscription Activation row already carries the subject (per-user subscription activation), and RCP-08's answer is not a licence SKU, so a new row's Minimum License cell would have no natural, honest value.
```
```
Version History insertion preserves the no-trailing-newline final byte: matched the file's exact final line as the Edit `old_string`, with the new row prepended in `new_string` — this is a text-level operation that cannot introduce a trailing newline, unlike a shell `>>` append.
```

**Current cell/blockquote text to edit around** (`docs/reference/licensing-matrix.md:62-76`, verbatim as read this session):
```
| Windows Subscription Activation (Pro→Enterprise) | Microsoft 365 E3, E5, or A3/A5 | NOT available in Business Premium or F-series; manual OS upgrade required without this. Also does not apply to a self-deploying, userless kiosk device—see the blockquote below |
...
> **Self-deploying kiosk consequence:** a per-user entitlement cannot license a device nobody signs into, so a self-deploying kiosk never triggers per-user Windows Subscription Activation.

> This needs a device-scoped activation path instead. A per-device volume key (MAK) is the reasoned option for an Entra-only, internet-only kiosk.

> Not pilot-tested—stated as reasoning from the licensing structure, not as an observation.

> See [Walk-Up AVD Kiosk (RE-237)](../recipes/06-walk-up-avd-kiosk-autologon.md) for the worked case.
```
The `:62` cell edit changes "see the blockquote below" to "see the following blockquote" per D-25; the new blockquote (186 chars, own run) is inserted as its own `>` paragraph between the "Not pilot-tested" line and the "See RE-237" line — copy the existing blockquote's tone/idiom ("Not pilot-tested—stated as reasoning…") exactly, do not invent a new marker convention.

**Insertion technique — match-and-prepend, never shell append** (`155-04-SUMMARY.md` quoted above): the file has no trailing newline (final byte `|`, confirmed again this session at 101 lines / matching CONTEXT.md's 6,428-byte / `7c` hex reading). Use the Edit tool's `old_string` = the existing final Version History line, `new_string` = new row + that line.

---

### `.planning/ROADMAP.md` / `.planning/REQUIREMENTS.md` — D-28 amendment (config, event-driven append)

**Analog:** `.planning/milestones/v1.22-phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-01-PLAN.md`, the annotate-and-supersede precedent for editing ROADMAP/REQUIREMENTS criterion text directly.

**Frontmatter shape to copy** (`155-01-PLAN.md:1-18`):
```yaml
---
phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/REQUIREMENTS.md
  - .planning/ROADMAP.md
  - .planning/STATE.md
  - scripts/validation/check-phase-135.mjs
  - .planning/phases/155-.../155-GATE-BASELINE.json
autonomous: true
requirements: [RCP-04, RCP-07]
```
**must_haves truth pattern to copy** (same file):
```
"The D-05 ordering amendment is recorded by annotate-and-supersede in BOTH `.planning/REQUIREMENTS.md` (RCP-04) and `.planning/ROADMAP.md` (Phase 155 Success Criterion 5) BEFORE any commit performs the flip-then-register ordering, so the phase never executes an ordering its own requirement text still forbids."
"`check-phase-54.mjs` is measured at 32 passed / 0 failed immediately BEFORE the REQUIREMENTS.md/ROADMAP.md edit and again immediately AFTER it, in the same task, because `check-phase-54.mjs:30` live-reads `.planning/REQUIREMENTS.md`, `V-54-21` is a negative assertion at `:347`, and `V-54-27` recursively walks all of `.planning/` (D-08)."
"RCP-04 ordering edge: the amendment text is additive. The superseded wording of RCP-04 and of ROADMAP Success Criterion 5 stays present in the file, verbatim, alongside the amendment block."
```
Apply the same shape to D-28: append `**[SUCCESS-CRITERION AMENDMENT, D-28]**` to ROADMAP Phase 160 SC2 and to REQUIREMENTS LIC-02, never delete/reword the original clause, and bracket the edit with `check-phase-54.mjs` before/after (32/0 baseline, per RESEARCH.md's own re-measurement this session).

---

### `160-GATE-BASELINE.json` (config/artifact, batch snapshot)

**Analog:** `155-GATE-BASELINE.json` (explicit precedent, CONTEXT.md D-37).

**Shape to mirror** (`.planning/milestones/v1.22-phases/155-.../155-GATE-BASELINE.json`, top-level keys):
```json
{
  "phase_baseline": {
    "sha": "...", "sha_short": "...", "branch": "...", "measured_at": "...",
    "path_note": "...",
    "structural_gate": { "c17-eee-contract": {...}, "check-nav-hub-links": {...}, "check-phase-54": {...}, ... },
    "conflict_marker_sweep": {...},
    "counts_this_phase_changes": {...},
    "style_residual": {...},
    "pin_residency": {...},
    "line_endings": {...}
  }
}
```
Copy the `structural_gate` sub-object shape (script/invocation/exitCode/tallyLine per validator) for `160`'s five named validators (check-phase-155, check-phase-156, check-phase-54, c17-eee-contract, check-nav-hub-links) plus the apex (check-phase-159), substituting this phase's own measured numbers (RESEARCH.md already re-measured all of them at HEAD `ca3aac7a`: 10/0, 10/0, 32/0, 237/0/0, 0/0/0, 117/0). Per D-37, this is a single pre-edit snapshot, never a re-run equality gate.

---

### `160-01/02/03-PLAN.md` frontmatter (config, plan mechanics)

**Analog:** `159-05-PLAN.md` for `requirements: []` flip control; `155-01-PLAN.md` for wave/`files_modified`/`depends_on` shape (see block above).

**`requirements: []` flip-control precedent** (`.planning/milestones/v1.22-phases/159-harn-harness-close/159-05-PLAN.md:1-13`, verbatim):
```yaml
---
phase: 159-harn-harness-close
plan: 05
type: execute
wave: 5
depends_on: ["159-04"]
files_modified:
  - scripts/validation/check-phase-154.mjs
  - scripts/validation/check-phase-155.mjs
  - scripts/validation/check-phase-156.mjs
  - .planning/phases/159-harn-harness-close/159-EVIDENCE.md
autonomous: true
requirements: []   # D-28: HARN-04 flips at 159-08 only; this plan declares none so no boundary flip can fire early
```
Copy exactly this idiom — an inline `#` comment naming which later plan/requirement actually flips — for `160-01`'s `requirements: []`.

**Judge-dispatch plan precedent** (`156-03-PLAN.md:1-40` — file resolves at `.planning/milestones/v1.22-phases/156-style-extension-full-landing-verification/156-03-PLAN.md`), relevant must_haves lines:
```
"The judge is a fresh claude -p operating-system process dispatched from an ordinary auto task, given only the committed prompt bytes and its own packet JSON; no human-action checkpoint is used for work a CLI can do (D-14, D-15)."
"The judge prompt is dispatched from the same bytes that are committed, so the binding between the recorded artifact and the actual dispatch is mechanical rather than asserted (D-19)."
```
Apply to 160-02/160-03's fact-check and hand-built judge-packet tasks: commit the rubric/packet files first, then dispatch `claude -p` against exactly those committed bytes (matches D-32/D-33's `160-FACTCHECK-RUBRIC.md` / `160-FACTCHECK-PACKET.md` mechanism).

---

### `## See Also` additions (RE-237, content/doc, link list)

**Analog:** `docs/recipes/03-windows-11-multi-app-kiosk.md:321-328`, verbatim:
```
## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md)—the full spec this recipe's decision block instantiates
- [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md)—full self-deploying field reference, TPM 2.0, and network prerequisites
- [ESP Policy](../admin-setup-apv1/03-esp-policy.md)—device-phase-only Enrollment Status Page configuration
- [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md)—the membership-rule syntax for the kiosk device group
- [APv1 vs APv2](../apv1-vs-apv2.md)—framework selection reference
- [Step 5a: Kiosk configuration](../recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration)—the single-app case, which this recipe does not work
```
RE-237's own current See Also (`docs/recipes/06-walk-up-avd-kiosk-autologon.md:293-300`) uses the same em-dash-gloss convention with a space around the dash rather than tight (`— the spec…`); D-40 records this as a deliberate keep (spaced em dash ×3 is out of scope for D-47's tight-dash canon on new prose, since See Also is "list furniture"). Append the two new external entries (IoT Enterprise licensing, AssignedAccess CSP) after the eight existing relative entries, matching this file's own spacing style, not the tight-dash style used in prose paragraphs.

---

## Shared Patterns

### STD-05 decision block — blank-line-separated elements, no adjacent `>` runs
**Source:** `docs/recipes/06-walk-up-avd-kiosk-autologon.md:68-77` (Step 2) and `:101-113` (Step 4's existing table)
**Apply to:** the new Step 4 block in RE-237
Every element (bridge / lead-in / table / P1 / P2 / callout) is separated by exactly one blank line so C17 assertion #12 (`scripts/validation/c17-eee-contract.mjs:387-409`) never joins two `>` lines from different elements into one over-200-char run. This is confirmed this session as the mechanism behind the 194-char callout's placement (D-12).

### `[PILOT]` in-cell marker
**Source:** `docs/recipes/06-walk-up-avd-kiosk-autologon.md:108`, verbatim: `**[PILOT]** profile failed \`Class is not licensed for use\` on an image reported as unactivated; device sat at the sign-in screen`
**Apply to:** the new MAK-arm "Consequence if wrong" cell (RE-237), never the matrix (D-26: matrix owns no `[PILOT]` claims, links to RE-237 instead).

### Version History insertion — match-and-prepend, never shell append
**Source:** `155-04-SUMMARY.md` Deviations/Decisions section (quoted above) and the matrix's own current final line, read this session:
```
| 2026-09-03 | Phase 155 RCP-08: self-deploying kiosk userless-device activation consequence documented in Feature-to-License Mapping | — |
```
**Apply to:** both RE-237's and the matrix's Version History row insertions. Use the Edit tool's `old_string`/`new_string` against this exact line (matrix) and RE-237's own single existing row (`docs/recipes/06-walk-up-avd-kiosk-autologon.md:307`, `| 2026-08-31 | Initial Draft — ... |`), never `>>`.

### Re-stamp `last_verified`/`review_by`
**Source:** `155-04-SUMMARY.md`: "re-stamped" (applied to all four files RCP-06/07/08 touched); `docs/_standards/EEE-SOP-standard.md:58` (review_by ≤ 90 days after last_verified).
**Apply to:** both RE-237 and the matrix frontmatter, to the execution date + 90 days (D-27).

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `160-FACTCHECK-RUBRIC.md` / `160-FACTCHECK-PACKET.md` (exact content) | doc/artifact | request-response | No prior phase committed a standalone rubric+packet pair as separate files before dispatch; content is fully pre-drafted in `160-DRAFTS.md` per D-33, not derived from a codebase analog. The dispatch *shape* analog is `scripts/docs-style/_JUDGE-VERDICTS-batch10.json:13`, already cited above. |
| `160-src-*.html` (fetched source bytes) | file-I/O | file-I/O | No prior phase artifact of this exact class was located; the `curl -sSL <url> -o <file>` command and flatten-before-grep technique are given directly in RESEARCH.md's Code Examples section, not from a codebase analog. |

## Metadata

**Analog search scope:** `docs/recipes/`, `docs/reference/`, `.planning/milestones/v1.22-phases/155-*/`, `.planning/milestones/v1.22-phases/156-*/`, `.planning/milestones/v1.22-phases/159-*/` — all scoped by CONTEXT.md `<canonical_refs>`/`<code_context>`; no independent codebase-wide search performed since the phase's own context already named every analog.
**Files scanned:** 8 read directly this session (2 corpus docs, 155-04-SUMMARY.md, 155-GATE-BASELINE.json, 155-01-PLAN.md, 159-05-PLAN.md, 156-03-PLAN.md, docs/recipes/03-windows-11-multi-app-kiosk.md's See Also block).
**Pattern extraction date:** 2026-09-12
