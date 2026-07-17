# Phase 130: Recipe #1 — Shared Windows AVD-Client Device - Pattern Map

**Mapped:** 2026-07-17
**Files analyzed:** 2 (1 new, 1 modified)
**Analogs found:** 2 / 2 (multiple analogs per file — this is a documentation phase, not code)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog(s) | Match Quality |
|-------------------|------|-----------|--------------------|---------------|
| `docs/recipes/01-shared-windows-avd-client.md` | new Guide doc (recipe: end-to-end provisioning walkthrough w/ embedded decision points) | transform (Markdown authoring, C17-validated, non-converging branch structure) | `docs/_templates/recipe-template.md` (skeleton) + `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` (branch idiom) + `docs/admin-setup-apv1/04-dynamic-groups.md` (link-target callout idiom) + `docs/l2-runbooks/26-apple-business-permission-denied.md` (decision-table shape) + `docs/_standards/EEE-SOP-standard.md` STD-05 (D-01..D-07 spec, fenced worked example) | exact (template is the literal skeleton being instantiated; STD-05 D-07 is the literal decision-block spec) |
| `docs/admin-setup-apv1/08-self-deploying.md` (RE-084, HYG-04 edit) | existing Guide doc — in-place content correction (6 sites) + frontmatter freshness bump + changelog row | transform (targeted multi-site edit-in-place) | itself (pre-edit content is its own analog — the edit must preserve every surrounding structural idiom unchanged) | exact (self-precedent) |

No controller/service/component/route files — this phase is 100% Markdown documentation authoring/editing inside the EEE-SOP-governed corpus. No test files (verification = re-running `node scripts/validation/c17-eee-contract.mjs --self-test` and `--verbose`, not authoring a new test).

## Pattern Assignments

### `docs/recipes/01-shared-windows-avd-client.md` (new Guide, transform)

**Primary analog — skeleton:** `docs/_templates/recipe-template.md` (full 141 lines) — this file IS the fixed spine to instantiate wholesale (D-06 skeleton, per 129-CONTEXT).

**Frontmatter + EEE header block** (template lines 33–45, copy shape, fill real values):
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

**Platform:** All Platforms · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft
```
Per D-LOCK-1: `platform: Windows` (not `all`); `applies_to` should name the specific device/Intune scope this recipe delivers. Real `doc_id` resolved from `docs/_registry/RE-index.md` at authoring time (planner note — RESEARCH.md flags this as an open item, not resolved by this pattern map).

**Fixed H2 order** (template lines 47–140, the entire skeleton — copy heading order verbatim, do not add/remove H2s per D-LOCK-4):
```
# [Recipe Title]
## Summary
> **Scope:** ...
## Prerequisites
## Unsupported and Anti-Feature Callouts
## Steps
### Step N: ...
## Verification
## Configuration-Caused Failures
## See Also
```

**Summary opener idiom** (template lines 49–54, D-06 mandatory end-state sentence — copy shape, use the H-LOCK-1-adjacent wording from CONTEXT.md verbatim):
```markdown
## Summary

Following this recipe yields [a concrete, named end-state -- e.g., a self-deploying
Entra-joined shared Windows AVD-client device], provisioned end-to-end from zero through
Intune. [1-2 more sentences: target platform, admin role/permissions required. Minimum 30
words total -- C17 #5 fires on templates.]
```

**Scope banner idiom** (template lines 89–90 is the generic placeholder — H-LOCK-1 mandates specializing it; ship the CONTEXT.md-locked verbatim replacement, isolated blockquote run with blank lines both sides per H-LOCK-2/Pitfall 3):
```markdown
> **Scope:** Provisions the physical shared Windows device that runs the AVD client, not the Azure session hosts. Assumes host pools, session hosts, and FSLogix already exist.
```
(173 chars, C17 #12 PASS — do not append anything to this run; a second `>` line immediately after with no blank line would merge and could tip over 200.)

**Anti-feature table shape** (template lines 98–102, frozen header — copy verbatim, populate with E-LOCK-1's 4 locked rows in the locked order):
```markdown
## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| [Feature or configuration name] | [Why this combination is unsupported, or what silently breaks if attempted] | [The supported alternative, or "N/A -- no alternative exists"] |
```
This is a table (≤25 rows → C17 #11-exempt) — never a blockquote (E-LOCK-3, Wi-Fi row specifically must stay a cell, never promoted to a top-level blockquote, or it hard-fails #12 at >200 chars for a faithful statement).

**Per-step `> **What breaks if misconfigured:**` callout idiom** (template lines 106–116, copy verbatim structure; blank-line-chunked per D-02's mandatory-blank-line rule — this exact idiom is already production-proven in `docs/admin-setup-apv1/04-dynamic-groups.md` lines 50–52 and `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`'s callout paragraphs):
```markdown
### Step 1: [Configuration action]

1. Navigate to **Intune admin center** > [full portal path].
2. Select **[option]**.
3. Configure **[setting name]**: [value or instruction].

   > **What breaks if misconfigured:** [Specific downstream failure this causes. Include: what the admin will see, what the end user will see, and link to the troubleshooting runbook that covers this failure.]
   > See: [Troubleshooting Runbook Title](../l1-runbooks/relevant-runbook.md)

4. [Next action in this step].
```
Concrete production-proven instance to copy the two-paragraph blank-line split from — `docs/admin-setup-apv1/04-dynamic-groups.md` lines 50–52:
```markdown
> **What breaks if misconfigured:** Using the wrong attribute name or syntax results in an empty group. Admin sees 0 members.

> End user sees standard Windows OOBE instead of Autopilot. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)
```
Each blank line starts a new C17 #12 char-count run — this is how a conceptually-one callout stays under the 200-char cap without truncating meaning. Apply this exact split shape to the AVD-01..05 callouts, especially the multi-clause ones (kiosk mutual-exclusion, MSIX provisioning, offline-license caveat).

**Verification idiom** (template lines 124–127, `- [ ]` declarative end-state list — copy shape; production-proven instance in `docs/admin-setup-apv1/08-self-deploying.md` lines 96–100):
```markdown
## Verification

- [ ] Device completes OOBE without any user interaction
- [ ] Device appears in Intune as enrolled (no primary user assigned)
- [ ] Device is Entra joined (not hybrid)
```
Per D-LOCK-4/G-LOCK-1, this recipe needs a shared "confirm first" lead-in plus two **bold pseudo-heading** branch labels (never H3s) inside the single `## Verification` H2 — this is a structural DEVIATION from the flat template list, spec'd fully in CONTEXT.md G-LOCK-1..5 and RESEARCH.md Pattern 5 (reproduced there as ready-to-copy markdown).

**Configuration-Caused Failures table** (template lines 129–134, copy header verbatim; production-proven row-writing idiom in `docs/admin-setup-apv1/08-self-deploying.md` lines 104–110 and `docs/admin-setup-apv1/04-dynamic-groups.md` lines 103–109):
```markdown
## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| [Setting X set to wrong value] | [What admin or user sees] | [Link to runbook] |
```
G-LOCK-5 requires branch-prefixed Misconfiguration cells (`(Kiosk) …` / `(Shared PC) …`) and routes the "Runbook" column to in-recipe step anchors or existing linked docs (no AVD runbook exists — confirmed by RESEARCH.md glob) — never fabricate a link.

---

**Branch-structure analog:** `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — RECOMMENDED (not normative, per D-05) idiom for a shared spine → decision block → non-converging sibling branches. Concrete excerpts to model, not copy verbatim (subject matter differs):

**Non-reconvergence precedent** (lines 65 area — prose statement, and structurally the whole doc: Stage 1-6 shared spine → Branch decision → Stage 7A/8A (Path A1) and Stage 7B/8B (Path A2), which never rejoin):
> "The single diamond (`Branch` -- the psso decision node ...) is represented below; both branches terminate at distinct, non-converging terminals (Stage 8A for A1, Stage 8B for A2) -- there is no reconvergence."

**Link-not-copy idiom** (line 111 area — the walkthrough links out to the exhaustive reference rather than reproducing it):
```markdown
2. **Platform SSO Settings Catalog policy.** Create a Settings Catalog policy with the Platform SSO extension configured. See [Platform SSO Setup](../admin-setup-macos/07-platform-sso-setup.md) for every field and value — this walkthrough links to that reference rather than reproducing the Settings Catalog table.
```
This is the exact "inline the minimal actionable toggle, link the exhaustive reference" shape D-LOCK-5 mandates for AVD-01's RE-084/RE-080/ESP-doc links and AVD-05's 802.1X links.

**Requirements-summary table idiom** (lines 397–408, `A2 Requirements Summary` table — a flat `| Requirement | Value |` table condensing a branch's scattered requirements into one scannable block):
```markdown
**A2 Requirements Summary:**

| A2 Requirement | Value |
|----------------|-------|
| macOS version | macOS 26+ (hard gate — A2 does not function on earlier macOS) |
| Company Portal version | 5.2604.0+ (LOB app — NOT VPP) |
```
Directly reusable shape for Step 5b's SharedPC "Recorded-as" table (RESEARCH.md Pattern 4) — GUI Setting / GUI Value / CSP Node / Recorded As columns follow this same flat-table idiom.

**Bold pseudo-heading callout labels** (used throughout, e.g. "**Most prominent risk — three-policy same-Assigned-static-user-group rule:**") — the exact device G-LOCK-1 mandates for `**Kiosk branch:**` / `**Shared PC branch:**` inside Verification (bold text, never an H3).

---

**Decision-block spec analog:** `docs/_standards/EEE-SOP-standard.md` STD-05 section (lines 456–548) — this is the literal normative spec this recipe must instantiate live for the first time (E-PLANNER-NOTE: "first live instantiation... sets the de-facto precedent"). Copy the D-07 fenced worked example's shape as the actual live decision block at Step 5 (unfence it — D-03 explicitly says the fence is a spec-sample exception, never valid in a live indexed recipe):

```markdown
> **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared desktop)?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Kiosk | Single-purpose fixed-app device | Users get full shell instead | [Step 5a](#step-5a-kiosk-configuration) |
| Shared PC | Multi-app shared desktop | Locked to one app unexpectedly | [Step 5b](#step-5b-shared-pc-configuration) |
```
D-02 mandatory blank line before the table; D-04 rule 3 governs boolean decisions (AVD-05's wired-vs-Wi-Fi fork, and F-LOCK-5's Account-management gate) as if/then prose pairs, never a table+branch-heading pair, since they're not fully-worked forking procedures.

**Decision-table 3-column shape analog (Case-1-adjacent, pre-STD-05 production precedent):** `docs/l2-runbooks/26-apple-business-permission-denied.md` lines 45–53:
```markdown
## 7-Leaf Decision Tree

**Decision tree — identify the permission error type:**

| Scenario | Leaf | Resolution |
|----------|------|-----------|
| Role lacks permission | ABPDR1 | [Role & Permission Model](../cross-platform/apple-business/01-role-permission-model.md) |
| OU boundary violation | ABPDR2 | [OUs Architecture](../cross-platform/apple-business/02-ous-architecture.md) |
```
This is the pre-STD-05 corpus precedent STD-05's own spec text cites as one of its two source patterns (decision-table shape) — confirms the `| Category | Key | Link |`-style flat routing table is an established, C17-safe idiom; STD-05's Case-1/Case-2 tables are a refinement of this same shape with renamed columns.

---

**ZTDId link-not-copy analog:** `docs/admin-setup-apv1/04-dynamic-groups.md` lines 44–48 — the fenced membership-rule string AVD-01 Step 3 must LINK, never re-inline (D-LOCK-5):
```markdown
**ZTDId membership rule** (matches ALL Autopilot devices in the tenant):

```
(device.devicePhysicalIDs -any (_ -startsWith "[ZTDid]"))
```
```
The recipe's Step 3 should read approximately: "Create/confirm the dynamic device group — see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) for the ZTDId membership rule; do not recreate the rule here." (mirrors the PSSO walkthrough's link-not-copy sentence quoted above).

---

### `docs/admin-setup-apv1/08-self-deploying.md` (RE-084, HYG-04 in-place edit)

**Analog:** itself — full file already read (125 lines pre-edit). The edit must preserve every surrounding idiom (frontmatter shape, EEE header, prerequisite-bullet style, per-step callout blank-line-chunking, failures-table shape, Version History table) unchanged; only the 6 Wi-Fi claim sites + frontmatter dates + one new changelog row change.

**Frontmatter (lines 1–11) — the two fields HYG-04 bumps:**
```yaml
---
doc_id: RE-084
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---
```
Per C-LOCK-5: `last_verified: 2026-07-17`, `review_by:` advanced 90 days out from that (was already overdue at 2026-07-12). No other frontmatter key changes (C-LOCK-6(iii): no H1/`doc_id`/title change).

**Site 1 — Prerequisites bullet, line 31 (stale absolute claim + fabricated mechanism target):**
```markdown
- **Wired ethernet** mandatory -- network connection is required before any user input; Wi-Fi is NOT supported
```
Rewrite per C-LOCK-1/3/4: keep the Ethernet-recommended-for-zero-touch guidance, replace the "NOT supported" claim with the two-stage framing (Ethernet = zero-touch; Wi-Fi = supported, not zero-touch, requires manual language/keyboard/network join at OOBE) — this bullet is also H-LOCK-3's AVD-01 prerequisite link target, so its corrected wording is what the new recipe's Prerequisites row will point to.

**Site 2 — Step 1 prose, line 55 (undercounted by ROADMAP's "3 sites" — survives a minimal-touch fix per C-LOCK-2):**
```markdown
   - Join type: **Microsoft Entra joined** (hybrid is NOT available for self-deploying)
```
(Confirm at authoring time whether L55 is the exact hybrid-join line or a nearby Wi-Fi mention — re-grep line context before editing; C-LOCK-2 names L55 explicitly as one of the 6 sites needing correction, distinct from the hybrid-join fact which is NOT part of the Wi-Fi fix.)

**Sites 3–4 — Step 2, lines 61 and 63 (the two blockquote callouts carrying the fabricated mechanism, MUST stay under C17 #12's 200-char cap each, per C-LOCK-6(i)):**
```markdown
> **What breaks if misconfigured:** Using Wi-Fi instead of wired ethernet means the device cannot reach the Autopilot service before OOBE.

> No network connectivity is available at the pre-authentication stage. See: [Network Connectivity](../l1-runbooks/04-network-connectivity.md)
```
Both lines must be rewritten (C-LOCK-3: replace BOTH the absolute claim AND the fabricated mechanism — "no such stage exists"). Preserve the blank-line split between the two blockquote paragraphs (D-02's structural rule) so each stays its own independently-measured C17 #12 run — re-measure `.length` on each rewritten line at authoring time (Pitfall 3).

**Site 5 — line 69, Step 3 deployment-flow numbered step (survives a minimal-touch fix per C-LOCK-2):**
```markdown
1. Device powers on, connected to wired ethernet.
```
Confirm at authoring time whether this line needs a parenthetical Wi-Fi caveat or stays Ethernet-only prose (the deployment-flow narrative describes the recommended zero-touch path, which legitimately stays Ethernet-first per C-LOCK-4).

**Site 6 — line 108, Configuration-Caused Failures table row (downgrade from hard failure to nuance/caveat per C-LOCK-4):**
```markdown
| Wi-Fi used instead of wired ethernet | No network at pre-authentication stage | [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |
```
Sibling rows for shape reference (lines 104–110, copy table structure, only this one row's content changes... or the row folds into the Prerequisites section per C-LOCK-4's "or folds into the prerequisite" option):
```markdown
| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Hybrid join selected with self-deploying | Deployment fails; hybrid not supported | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
```

**Changelog table — the append-a-dated-row idiom (C-LOCK-5, HYG-04's "how a content correction is recorded"):**
Current state (lines 128–132, the file's existing single-row Version History table):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-05 | v1.15 EEE reformat — content not re-reviewed | — |
```
Append (do not replace) a new row for this correction. Sibling append-a-row idiom already production-proven in `docs/_standards/EEE-SOP-standard.md`'s own Version History table (lines 613–616) — same 3-column shape, newest row appended at the bottom, each row self-describing its milestone/phase and scope:
```markdown
| 2026-07-17 | v1.18 STD-05 — added Admin Decision-Point Block Format (D-01..D-07: ...); added Device Recipe documents D-02 Edge-case ruling row (`docs/recipes/*` → `Guide`) |
```
Model the new RE-084 row on this shape: `| 2026-07-17 | v1.18 HYG-04 — corrected stale Wi-Fi-unsupported claim (6 sites): Wi-Fi is supported for self-deploying but not zero-touch; removed fabricated "no network before OOBE" mechanism; Ethernet-recommended guidance preserved | — |` (RE-084's table has an `Author` column the STD-05 table doesn't — keep RE-084's own 3-column `Date | Change | Author` shape, author `—` matches the existing row's convention).

## Shared Patterns

### Blank-line-chunked blockquote idiom (C17 #12 safety rail)
**Source:** `docs/admin-setup-apv1/04-dynamic-groups.md` lines 50–52; `docs/admin-setup-apv1/08-self-deploying.md` lines 46, 57, 61/63 (multi-paragraph callouts, each paragraph its own blockquote run)
**Apply to:** every new callout in the recipe (AVD-01..05 "what breaks" callouts, Step 5 decision lead-in, AVD-05 boolean if/then prose) AND the rewritten RE-084 L61/L63 pair.
```markdown
> **What breaks if misconfigured:** [clause 1, ≤200 chars alone]

> [clause 2, ≤200 chars alone]. See: [link]
```
Each blank line starts a new C17 #12 char-count run — mandatory technique whenever a callout's full meaning would exceed 200 chars as one contiguous run.

### EEE visible header block (D-05 house style)
**Source:** `EEE-SOP-standard.md` lines 82–84 (spec); `docs/admin-setup-apv1/08-self-deploying.md` line 13 (live instance)
**Apply to:** the new recipe's header block
```markdown
**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft
```
Separator is `·` (U+00B7 middle-dot), not a pipe. Field order Platform → Doc Type → Doc ID → Status is what C17 #7 checks; block content must match frontmatter (C17 #9).

### Link-not-copy by ownership
**Source:** `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` line 111 ("this walkthrough links to that reference rather than reproducing the Settings Catalog table"); `docs/admin-setup-apv1/04-dynamic-groups.md` lines 44–48 (fenced ZTDId string, the thing being linked-not-copied)
**Apply to:** every AVD-01/03/05 reference to RE-084, RE-080, RE-177, ESP doc (`docs/admin-setup-apv1/03-esp-policy.md`), and all 802.1X content (`docs/admin-setup-8021x/03-windows.md` + `00-overview.md`).
Inline only the minimal actionable toggle; link the exhaustive reference. Never re-inline a fenced string another doc owns.

### Decision-table 3-column shape (STD-05 Case 1/2 tables)
**Source:** `docs/_standards/EEE-SOP-standard.md` STD-05 D-01/D-07 (lines 468–548, the normative spec + fenced worked example); pre-STD-05 corpus precedent `docs/l2-runbooks/26-apple-business-permission-denied.md` lines 45–53 (`Scenario | Leaf | Resolution`)
**Apply to:** Step 5's Kiosk-vs-SharedPC decision (Case 1: `Option | When to choose | Consequence if wrong | Branch`), Step 5b's DeletionPolicy enumerable (Case 2: `Option | When to choose | Recorded as`), and any other AVD-04 enumerable per F-LOCK-6.
D-02's mandatory blank line between lead-in blockquote and table applies to every instance — omitting it silently destroys the table via GFM lazy continuation.

### Frozen validator surface — never edit
**Source:** `scripts/validation/c17-eee-contract.mjs` (D-10, per CONTEXT.md "The gate" section)
**Apply to:** verification only — run `--self-test` (expect pass) and `--verbose` (expect the new recipe enrolled + RE-084's edit showing 0 violations) before/after authoring. DO NOT EDIT this file under any circumstance.

## No Analog Found

None — both files in scope have exact or multi-source analogs; the new recipe's structural spine, branch idiom, decision-block spec, and link-target callout shape are all drawn from already-shipped, C17-green corpus files; the RE-084 edit is self-precedented (its own pre-edit structure).

## Metadata

**Analog search scope:** `docs/_templates/recipe-template.md`, `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`, `docs/admin-setup-apv1/04-dynamic-groups.md`, `docs/admin-setup-apv1/08-self-deploying.md`, `docs/l2-runbooks/26-apple-business-permission-denied.md`, `docs/_standards/EEE-SOP-standard.md` (STD-05 section, lines 456–548), `docs/admin-setup-apv1/*` (glob, confirming ESP-doc link target `03-esp-policy.md`), `docs/admin-setup-8021x/*` (glob, confirming `03-windows.md`/`00-overview.md` link targets), `.planning/phases/129-device-recipe-doc-class-foundation/129-PATTERNS.md` (predecessor phase's own pattern map — reused directly where its excerpts already cover this phase's shared idioms)
**Files scanned:** 8 read directly (full or targeted ranges); 2 Glob sweeps
**Pattern extraction date:** 2026-07-17
