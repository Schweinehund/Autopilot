# Phase 129: Device Recipe Doc-Class Foundation - Pattern Map

**Mapped:** 2026-07-17
**Files analyzed:** 3 (2 modified, 1 new)
**Analogs found:** 3 / 3

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/_standards/EEE-SOP-standard.md` | config (governance standard) | transform (edit-in-place, additive) | itself — STD-04 section (v1.16 precedent for a new top-level policy section) | exact (self-precedent) |
| `docs/_templates/recipe-template.md` | template/config (structural scaffold) | transform (Markdown authoring, C17-validated) | `docs/_templates/admin-template.md` | exact (explicit D-06 base) |
| `.planning/research/ARCHITECTURE.md` | config (planning doc) | transform (one-line correction) | itself — surrounding fenced structure-tree block | exact (self-edit, no external analog needed) |

No controller/service/component/route files — this phase is 100% Markdown-authoring plus governance-standard editing. No test files (C17 is a pre-existing, unedited validator; verification = re-running `--self-test`/`--verbose`, not authoring a new test).

## Pattern Assignments

### `docs/_standards/EEE-SOP-standard.md` (config, transform — 3 additive edits)

**Analog:** itself, the STD-04 section (`## Mermaid-in-Enrolled-Classes Policy (STD-04)`, lines 398–448) — the v1.16 precedent for "add a new top-level policy section to this same file." STD-05 must mirror STD-04's shape exactly: title format, `---` divider bracketing, internal `### D-NN:` subsection numbering, Version-History row wording pattern.

**Edit 1 — D-02 ruling bullet** (insert after line 156, the last existing bullet in `### D-02 Edge-case rulings`, before the blank line at 157):

Sibling bullet format to copy verbatim (lines 154–156):
```markdown
- **Lifecycle documents** (`*-lifecycle/*`) → `Guide` (v1.16 D-07). Lifecycle docs walk a reader
  through an end-to-end procedural setup or migration journey; classifying them `Reference` would
  be definitionally wrong for content whose entire structure is a procedure.
```
New bullet shape (slim, one line per D-09 — do NOT put the multi-paragraph spec here):
```markdown
- **Device Recipe documents** (`docs/recipes/*`) → `Guide` (v1.18 STD-05). [one-sentence
  directory-precedence rationale — recipes are end-to-end procedural provisioning walkthroughs;
  full admin decision-point block spec lives in STD-05].
```

**Edit 2 — new STD-05 top-level section** (insert at line 451, immediately after the existing `---` divider at line 450, before the blank-then-`## C17 Enforcement Reference` header at 452; STD-05 gets its own closing `---` before that header resumes):

Divider + header pattern to copy exactly (verbatim context, lines 449–452 today):
```
449	(blank)
450	---
451	(blank)
452	## C17 Enforcement Reference (Needle-Spec for Phase 115)
```
STD-05 is inserted between 450 and 452 as: `\n---\n\n## Admin Decision-Point Block Format (STD-05)\n\n[content]\n\n---\n\n` — reusing STD-04's exact internal subsection idiom, e.g. (lines 404, 420, 427, 442 — the `### D-NN: Title` heading style):
```markdown
### D-01: Text-equivalent conversion, not a carve-out

[prose paragraph, no fence]
```
Per D-11, STD-05 also needs ONE compact **fenced** worked branching mini-example. The house-style precedent for "spec fences a live-content shape inside the Approved, non-sentinel standard" is STD-04 D-03's own reference pattern (lines 429–434, describing the `Scenario | Leaf | Resolution` shape) — copy the convention of naming the pattern in prose then showing a small fenced sample block, e.g.:
````markdown
```markdown
> **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared
> desktop)? This choice selects the branch for every step below.

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Kiosk | Single-purpose fixed-app device | Users get full shell instead | [Step 5a](#step-5a) |
| Shared PC | Multi-app shared desktop | Locked to one app unexpectedly | [Step 5b](#step-5b) |
```
````
(inCodeFence mask exempts this from #11/#12 — confirmed in RESEARCH.md C17 Mechanics section.)

**Edit 3 — Version-History row** (append after line 515, the file's last line; file currently ends at 516):

Exact sibling row format to copy (line 515, the STD-04 row):
```markdown
| 2026-07-07 | v1.16 STD-04 — added Mermaid-in-Enrolled-Classes Policy (D-01..D-04: text-equivalent conversion, C17 #1 unchanged, conversion shapes, honesty caveat); added 4 new D-02 Edge-case rulings (glossary, decision-tree, nav-hub, lifecycle) and the D-08 Non-MECE precedence rule; Doc Type Taxonomy 4-value table unchanged |
```
New row (per D-12: names both STD-05 and the D-02 ruling row; does NOT touch `last_verified` frontmatter at line 7, which stays `2026-07-04`):
```markdown
| 2026-07-17 | v1.18 STD-05 — added Admin Decision-Point Block Format (D-01..D-05: 3-case composite block, mandatory blank line, case-boundary rule, 3-rule branch floor + RECOMMENDED PSSO-idiom); added Device Recipe documents D-02 Edge-case ruling row (`docs/recipes/*` → `Guide`) |
```

**Error handling / safety pattern:** none applicable (Markdown, not code) — the equivalent guardrail is the frozen-surface rule: `scripts/validation/c17-eee-contract.mjs` is NEVER edited (D-10); verify via `node scripts/validation/c17-eee-contract.mjs --self-test` (expect 4/4 PASS) and `--verbose` (expect 230 files, 0 violations post-edit, up from the 229/0 pre-phase baseline) before/after.

---

### `docs/_templates/recipe-template.md` (template, transform)

**Analog:** `docs/_templates/admin-template.md` (full 90-line base, per locked D-06). Secondary idiom sources: `docs/_templates/l1-template.md` (Summary-banner phrasing idiom — how a template opens Summary with a mandatory declarative sentence before the descriptive placeholder) and `docs/_templates/reference-template.md` (worked-example-in-body idiom — HTML-comment-free inline "Example:" region showing instantiated content directly under a rule, used as the shape precedent for D-08's delete-marked worked-example region, adapted to HTML-comment wrapping per D-08's own requirement).

**Full base skeleton to copy verbatim, then modify** (`docs/_templates/admin-template.md` lines 1–90):
```markdown
<!-- ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any admin configuration guide.
     Rules:
     - Fill in last_verified and review_by dates at doc creation time (review_by = last_verified + 90 days)
     - The `1970-01-01 # TEMPLATE-SENTINEL` value on last_verified is a harness-skip sentinel —
       REPLACE with actual authoring date when copying this template
     ...
-->
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

**Platform:** All Platforms · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft

# [Admin Task Title]

## Summary

[2–3 sentences ... Minimum 30 words. ...]

> **Version gate:** [...]
> For [the other framework], see [link].
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

## Prerequisites
...
## Steps

### Step 1: [Configuration action]

1. Navigate to **Intune admin center** > [full portal path].
2. Select **[option]**.
3. Configure **[setting name]**: [value or instruction].

   > **What breaks if misconfigured:** [...]
   > See: [Troubleshooting Runbook Title](../l1-runbooks/relevant-runbook.md)

...
## Verification
## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| [Setting X set to wrong value] | [What admin or user sees] | [Link to runbook] |

## See Also
```

**Diffs required from the base (per locked D-06/D-07/D-08/D-13), all placement-locked AFTER `## Summary`:**

1. **Frontmatter:** `applies_to: [FILL-IN]` replaces the `APv1 | APv2 | both` pipe-list (generic — C17 never inspects this key's value, confirmed in RESEARCH.md). `doc_type: Guide` unchanged — already correct.
2. **`> **Version gate:**` blockquote → `> **Scope:**` blockquote** (≤200 chars even though the template is #12-sentinel-exempt — keep it compliant so copies into live recipes stay safe, per Pitfall 2).
3. **`## Summary` placeholder must open with the D-13 mandatory end-state sentence** — model the "banner-first" idiom on `l1-template.md`'s Summary placeholder (lines 38–40), which opens with a mandatory declarative safety-scope banner before the generic descriptive brackets:
   ```markdown
   [2–3 sentences: scope, audience (L1 service desk), and safety guardrail. Minimum 30 words.
   Open with the read-only scope banner: this runbook covers read-only diagnostic steps only —
   no registry edits, no PowerShell execution, no destructive actions. All remediation steps
   requiring elevated access or technical investigation must be escalated to L2.]
   ```
   Apply the same "banner sentence first, then descriptive bracket prose, then explicit word-count floor" shape for the recipe template's Summary, using the D-13/D-08 exact wording:
   ```markdown
   ## Summary

   Following this recipe yields [a concrete, named end-state — e.g., a self-deploying
   Entra-joined shared Windows AVD-client device], provisioned end-to-end from zero through
   Intune. [1–2 more sentences: target platform, admin role/permissions required. Minimum 30
   words total — C17 #5 fires on templates.]
   ```
4. **New required section: `## Unsupported and Anti-Feature Callouts`** (hard-required container, D-06) — copy the `## Configuration-Caused Failures` table shape from `admin-template.md` (lines 78–83) and relabel columns:
   ```markdown
   ## Unsupported and Anti-Feature Callouts

   | Feature | Why it's unsupported / what breaks | Do this instead |
   |---------|-------------------------------------|------------------|
   | [Feature name] | [Reason / failure mode] | [Supported alternative] |
   ```
5. **`### Step N: [action]` steps keep the exact `admin-template.md` per-step `> **What breaks if misconfigured:**` callout idiom verbatim** (lines 61–62) — no change needed, D-06 inherits wholesale.
6. **`## Decision Record` ledger is CUT** (D-07) — do not carry any such section from any other template; none of the 4 read templates have one anyway, so there is nothing to delete, only to avoid inventing.
7. **NEW: one HTML-comment-wrapped, delete-marked worked-example region immediately after the Summary placeholder area**, containing three examples (branching → enumerable → free-value, per D-08). Structural idiom to borrow: `reference-template.md`'s inline "Tables exceeding 25 rows" rule-then-`Example:`-then-instantiated-block pattern (lines 44–55) — state the rule/label, then show the actual worked content directly below it, no bracketed placeholder inside the example itself. Adapt into an HTML comment (per D-08, using `###`/bold labels only, NEVER `## `, to avoid tripping C17 #4 — comments are not fence-masked):
   ```markdown
   <!-- WORKED DECISION-POINT EXAMPLES (delete this whole comment block before publishing)

   **Example 1 — Branching decision (Case 1):**

   > **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared
   > desktop)? This choice selects the branch for every step below.

   | Option | When to choose | Consequence if wrong | Branch |
   |--------|-----------------|----------------------|--------|
   | Kiosk | Single-purpose fixed-app device | Users get full shell instead | [Step 5a](#step-5a-kiosk-configuration) |
   | Shared PC | Multi-app shared desktop | Locked to one app unexpectedly | [Step 5b](#step-5b-shared-pc-configuration) |

   **Example 2 — Enumerable-value decision (Case 2):**

   > **Ask the admin:** What retention period should apply to cached session data? This value
   > is recorded in the device configuration profile.

   | Option | When to choose | Recorded as |
   |--------|-----------------|-------------|
   | 1 day | High-turnover shared kiosks | `RetentionDays: 1` |
   | 7 days | Standard shared desktops | `RetentionDays: 7` |
   | 30 days | Low-turnover dedicated pools | `RetentionDays: 30` |

   **Example 3 — Free-value prompt (Case 3, no table needed):**

   > **Ask the admin:** What naming prefix should new device objects use? This value is applied
   > verbatim to every device name generated by this recipe.

   -->
   ```
   (D-08 flags: the enumerable example subject must NOT collide with any AVD-01..05/IPAD-01..04 field name — `RetentionDays` above is illustrative-only and synthetic; verify against ROADMAP Phase 130/131 field lists at plan time before finalizing wording.)
8. **`## See Also`** — unchanged shape from `admin-template.md` lines 85–89.

**Verification pattern:** `node scripts/validation/c17-eee-contract.mjs --verbose` must report the new file enrolled with 0 violations (opt-in by `doc_id` presence — no allowlist step). Confirm assertion #4 (Summary is first H2, nothing precedes it) and #5 (Summary ≥30 words) both pass given the added opener sentence.

---

### `.planning/research/ARCHITECTURE.md` (config, transform — one-line-family correction)

**Analog:** itself — the surrounding fenced "Recommended Project Structure" code block (lines 56–69 region). No external analog needed; this is a self-contained factual correction inside one fenced block.

**Current text to remove** (lines 58–61, per D-15/A1 — delete the whole `00-overview.md` structure-tree entry, not just the trailing clause, since D-14 independently rules no index doc exists in this phase):
```
├── recipes/                              # NEW top-level doc-class directory
│   ├── 00-overview.md                    # NEW — index page (mirrors l1-runbooks/00-index.md,
│   │                                      #   admin-setup-apv1/00-overview.md, device-operations/00-overview.md
│   │                                      #   convention: every doc-class directory has an 00-* index)
│   ├── 01-windows-avd-shared-device.md   # NEW — Recipe #1
│   └── 02-shared-ipad-full-provisioning.md # NEW — Recipe #2
```
**Corrected text** (collapse to two files, no index line):
```
├── recipes/                              # NEW top-level doc-class directory
│   ├── 01-windows-avd-shared-device.md   # NEW — Recipe #1
│   └── 02-shared-ipad-full-provisioning.md # NEW — Recipe #2
```

---

## Shared Patterns

### TEMPLATE-SENTINEL frontmatter convention
**Source:** `docs/_templates/admin-template.md` lines 24–33 (also identical in `l1-template.md` lines 23–32, `reference-template.md` lines 23–29)
**Apply to:** `recipe-template.md`
```yaml
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: all
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
applies_to: [FILL-IN]
audience: admin
---
```
`1970-01-01` is detected verbatim by the C17 script (`c17-eee-contract.mjs`) to skip assertions #9 and #12 only — all 11 other assertions still fire on this file.

### EEE visible header block (D-05 house style)
**Source:** `EEE-SOP-standard.md` lines 82–84 (spec); `admin-template.md` line 35 (instance)
**Apply to:** `recipe-template.md`
```markdown
**Platform:** [normalized-label] · **Doc Type:** [Runbook|Guide|RCA|Reference] · **Doc ID:** [RE-NNN] · **Status:** [Draft|Approved|Superseded]
```
Separator is `·` (U+00B7 middle-dot), not a pipe. Field order Platform → Doc Type is what C17 #7 checks.

### Blank-line-chunked blockquote idiom (D-02's mandatory blank line rule, already production-proven)
**Source:** `docs/admin-setup-apv1/04-dynamic-groups.md` lines 50–52 and `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` lines 72–76
**Apply to:** STD-05's spec text and every worked example in `recipe-template.md`
```markdown
> **What breaks if misconfigured:** Using the wrong attribute name or syntax results in an empty group. Admin sees 0 members.

> End user sees standard Windows OOBE instead of Autopilot. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)
```
Each blank line starts a new C17 #12 char-count run — this is how a conceptually-one callout stays under the 200-char cap without truncating meaning.

### Decision-table shapes (Pattern 2, the enumerable/branching table precedent)
**Source:** `docs/l2-runbooks/26-apple-business-permission-denied.md` lines 45–53 (`Scenario | Leaf | Resolution`) and `EEE-SOP-standard.md` D-03 (lines 429–434, describing the same shape as corpus law)
**Apply to:** STD-05's fenced worked example and the template's branching/enumerable examples — column-header naming per D-01's Case 1 (`Option | When to choose | Consequence if wrong | Branch`) and Case 2 (`Option | When to choose | Recorded as`).

### Frozen validator surface — never edit
**Source:** `scripts/validation/c17-eee-contract.mjs` (D-10, confirmed independently safe in RESEARCH.md's Frozen-Surface Check section)
**Apply to:** both edited/created files — no assertion changes, no allowlist entries needed (opt-in enrollment by `doc_id` presence handles the new template automatically).

## No Analog Found

None — all 3 files in scope have exact or self-precedent analogs; no gaps.

## Metadata

**Analog search scope:** `docs/_templates/` (all 7 templates), `docs/_standards/EEE-SOP-standard.md` (full 516 lines), `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`, `docs/admin-setup-apv1/04-dynamic-groups.md`, `docs/l2-runbooks/26-apple-business-permission-denied.md`, `.planning/research/ARCHITECTURE.md`
**Files scanned:** 8 read directly (full or targeted ranges), 0 additional Glob/Grep sweeps needed beyond RESEARCH.md's prior exhaustive line-number work
**Pattern extraction date:** 2026-07-17
