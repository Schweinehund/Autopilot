# Phase 136: Recipe #4 — Android Dedicated, MHS Multi-App - Pattern Map

**Mapped:** 2026-08-03
**Files analyzed:** 1 (single deliverable, authored in two waves)
**Analogs found:** 1 / 1 (dominant analog + 4 secondary source docs, all resolved)

**Note on shape:** This is a documentation repo. There is exactly one new file:
`docs/recipes/04-android-dedicated-mhs-multi-app.md` (doc_id RE-225). Plan 1 ships a
sentinel-free C17-clean shell of it (frontmatter + EEE line + H1 + Summary only); Plan 2
authors the body. "Analogs" below are document-structure precedents, not code modules —
each pattern is a literal excerpt to mirror, not a library to import.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/recipes/04-android-dedicated-mhs-multi-app.md` (Plan 1: shell) | doc / EEE-SOP recipe shell | file-I/O (static content) | `docs/recipes/03-windows-11-multi-app-kiosk.md` @ commit `ef155268` (its own shell commit) | exact |
| `docs/recipes/04-android-dedicated-mhs-multi-app.md` (Plan 2: body) | doc / EEE-SOP recipe body | file-I/O (static content) | `docs/recipes/03-windows-11-multi-app-kiosk.md` (current, full) | exact (dominant), role-match on 3 secondary docs |
| `v1.19-DEFERRED-CLEANUP.md` entries (conditional, D4.7-gated) | doc / cleanup log | append-only | `135-02-SUMMARY.md:193-196` pattern | role-match |
| Research-file correction (conditional, D1.1/D8.2-gated) | doc / research correction | in-place edit | `457adc25` commit pattern (cited, not re-read) | role-match |

## Pattern Assignments

### Plan 1 — `docs/recipes/04-android-dedicated-mhs-multi-app.md` (sentinel-free shell)

**Analog:** `docs/recipes/03-windows-11-multi-app-kiosk.md`, exact shape shipped at commit `ef155268` (19 lines, RE-224's Phase-135 Plan-1 shell — read via `git show ef155268`, not the live file, since the live file has since grown to the full body).

**Full shell excerpt to mirror (frontmatter + EEE line + H1 + Summary, all fields substituted for RE-225):**
```markdown
---
doc_id: RE-224
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-30
review_by: 2026-10-28
applies_to: Windows 11 multi-app kiosk (restricted user experience via the AssignedAccess CSP Configuration node, delivered by an Intune custom OMA-URI profile)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-224 · **Status:** Draft

# Windows 11 Multi-App Kiosk: Assigned Access Provisioning

## Summary

Following this recipe yields a Windows 11 device locked to a restricted user experience — a bounded, multi-app allow-list and Start layout — delivered through the AssignedAccess CSP `Configuration` node via an Intune custom OMA-URI profile, with no Templates GUI path available. It covers Windows 11 22H2 or later on Pro, Enterprise, Education, or IoT Enterprise editions and requires the Intune Administrator role to author the configuration profile and assign it to a device group.
```

**Substitutions for RE-225 (per D4.4):** `doc_id: RE-225`, `platform: Android`, `applies_to:` a one-line MHS/Dedicated end-state description, `last_verified`/`review_by` set to authoring date + 90 days (never the `1970-01-01 # TEMPLATE-SENTINEL` value — that only appears in the un-instantiated template). Same field order, same EEE header-line format (`**Platform:** X · **Doc Type:** Guide · **Doc ID:** RE-NNN · **Status:** Draft`), same H1 pattern (concrete end-state, colon-subtitle), same Summary shape (opens "Following this recipe yields…", ≥30 words per C17 `#5`, states platform/version floor and the RBAC role required).

**Template rules governing this shell** (`docs/_templates/recipe-template.md:5-19,33-45`):
```
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

# [Recipe Title -- concrete device end-state]

## Summary

Following this recipe yields [a concrete, named end-state ...]. [1-2 more sentences ...
Minimum 30 words total -- C17 #5 fires on templates.]
```
`doc_type: Guide` is mandatory (`:13-14`, closed 4-value enum). `platform` must resolve against the D1 Platform Normalization Map in `EEE-SOP-standard.md`.

---

### Plan 2 — `docs/recipes/04-android-dedicated-mhs-multi-app.md` (full body)

**Dominant analog:** `docs/recipes/03-windows-11-multi-app-kiosk.md` (current, full text read above — all line numbers below refer to that read).

#### Scope banner (multi-run split blockquote)

`03:21-25` (already three separate `>`-prefixed paragraphs, each its own blank-line-separated run):
```markdown
> **Scope:** Covers the Windows 11 **restricted user experience** — a defined list of apps behind a tailored Start menu and Taskbar.

> The single-app case, which Microsoft names a **kiosk experience**, is a different profile type and is not worked here.

> Assumes the device is already Autopilot-registered, that every allow-listed app already exists as an Intune app, and that the Entra group naming the kiosk users already exists.
```
The split-blockquote idiom itself (why/when to split rather than truncate) is authoritatively at `docs/recipes/01-shared-windows-avd-client.md:25` (single-run Scope, contrast case) and the multi-run technique is demonstrated by 03's three-paragraph Scope above — CONTEXT's cited `01:101`/`01:103` coordinates are the `[ASSUMED]` note split, reproduced below.

#### `[ASSUMED]` split-run idiom

`docs/recipes/01-shared-windows-avd-client.md:101,103`:
```markdown
> **[ASSUMED]:** These three field names are carried from the requirements list, not a fetched Learn page.

> Verify the exact Settings Catalog field names against your own tenant (search "Windows App" or "reset") before finalizing this policy.
```
Two separate column-0 `>` runs, blank-line separated — never one long blockquote. RE-225 uses this exact shape for every `[ASSUMED]` note (D1.9, D3.9).

#### Prerequisites — "This recipe is NOT" opener

`03:29`:
```markdown
- **This recipe is NOT:** the single-app kiosk experience (one UWP app or Microsoft Edge running full-screen — see the anti-feature table below), Shell Launcher (a shell replacement, and not supported on Pro), Shared PC mode, or Entra "Shared device mode" (SDM/Global Sign-Out is iOS/Android-only).
```
D4.8 names RE-225's own term list (Entra shared device mode, single-app kiosk / Lock Task Mode, digital signage/screensaver, Windows multi-app kiosk) — same bolded-lead-in, comma-separated, parenthetical-reason-per-term shape.

#### Anti-feature table (3-column shape, representative row)

`03:41-56` header + one representative row:
```markdown
## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| The Intune **Templates** > **Kiosk** > **Multi app kiosk** option on a Windows 11 target | Microsoft documents Intune's multi-app kiosk template for Windows 10 devices. The path **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Platform: Windows 10 and later** > **Templates** > **Kiosk** > **Select a kiosk mode** > **Multi app kiosk** stays clickable against a Windows 11 device, which is what makes it a trap | Use the custom OMA-URI profile this recipe builds |
```
Template's minimal form (`recipe-template.md:98-102`) shows only the header + one placeholder row — 03 is the worked precedent for row density (12 rows) and tone (each cell a full sentence naming the mechanism, not a fragment). D2.2's Knox/ZT row and D3.1's 9-10-row budget both target this exact table.

#### STD-05 decision blocks — Case 1 / Case 2 / Case 3 shapes

**Case 1 (branching)** — `03:76-79` (also `recipe-template.md:65-68` worked example, identical shape):
```markdown
> **Ask the admin:** Which identities sign in to this kiosk — an Entra group of named users, or a local account that signs in automatically?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Entra group named inside the configuration file | Any allow-listed app requires user authentication, or sign-ins must be attributable to a person | Authenticated apps cannot sign anyone in, so the kiosk cannot do the job it was built for | Worked here — continue to [Step 3](#step-3-pre-install-the-allow-listed-apps) |
| Local account with automatic sign-in | The device is public-facing, needs no authenticated app, and needs no per-person attribution | Domain resources reachable by any domain account become reachable from an unattended public device | Not worked here — see the autologon row under [Unsupported and Anti-Feature Callouts](#unsupported-and-anti-feature-callouts) |
```

**Case 2 (enumerable, no procedure fork)** — `01:93-100` (Windows App reset-behavior block):
```markdown
> **Ask the admin:** When should Windows App reset cached session state between users on this shared device?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| Reset on app close only | Users are trained to close Windows App between sessions | `ResetAppOnCloseOnly` |
| Reset after each connection ends | Users may leave Windows App open; reset on remote-session disconnect | `ResetAppAfterConnection` |
| Reset after an idle period | Device sits unattended between users; reset after a timeout | `ResetAppOnIdle` |
```
Also `recipe-template.md:70-78` (illustrative synthetic Case-2 example, same `| Option | When to choose | Recorded as |` header).

**Case 3 (free-value prompt, no table)** — `recipe-template.md:80-85`:
```markdown
**Example 3 -- Free-value prompt (Case 3, no table needed):**

> **Ask the admin:** What naming prefix should new device objects use?

The supplied prefix is applied verbatim to every device name generated by this recipe --
routing or recording prose like this line lives OUTSIDE the blockquote, never inside it.
```
D2.8's `grid_size`/`managed_folders` prompts use this exact shape — one `>` lead-in, then plain-prose routing/recording text immediately below, never inside the blockquote.

**Two decision blocks in one step (precedent for D2.9's 5-blocks-in-6-steps):**
`docs/recipes/01-shared-windows-avd-client.md:93,107` — Step 4 carries both the "reset cached session state" Case-2 block (`:93-101`) and the kiosk-vs-Shared-PC Case-1 block (`:107-112`) in immediate sequence, no intervening H3.
`docs/recipes/02-shared-ipad-full-provisioning.md:102,107,120` — three "Ask the admin" blocks inside a single numbered step 3 (sizing fields), back to back, each with its own table or plain-prose-value instruction.

#### `### Step N` shape + `What breaks if misconfigured` callout

`03:60-70` (Step 1, full):
```markdown
### Step 1: Enroll the device with self-deploying Autopilot

1. Create the dynamic device group that the deployment profile, the ESP policy, the app assignments, and the kiosk configuration profile all target — see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md).
2. Create a self-deploying deployment profile assigned to that group — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md).
3. Create a device-phase-only Enrollment Status Page policy assigned to the same group — see [ESP Policy](../admin-setup-apv1/03-esp-policy.md).

Self-deploying mode has no user affinity, so only the device phase of ESP runs and there is no user phase to configure.

Self-deploying enrollment and an interactive Entra sign-in are compatible, and the combination already ships in this corpus. Microsoft's first documented self-deploying outcome is that the device remains at the sign-on screen, where any member of the organization can sign in by specifying their Microsoft Entra credentials — which is the account model [Step 2](#step-2-choose-the-kiosk-account-model) works.

> **What breaks if misconfigured:** If the dynamic device group rule does not match the device, nothing in this recipe reaches it — no deployment profile, no ESP, no apps, no configuration.
```
Callout is always: numbered click-list or prose first, one-clause bold-lead-in `> **What breaks if misconfigured:**` column-0 blockquote last in the step, optionally split into further `>` runs beneath (`03:70` is single-run; `01:85-87` and `02:88-98` show the multi-run form for longer consequences). `recipe-template.md:112-113` is the template's own worked instance, which additionally carries a `> See: [Troubleshooting Runbook Title](...)` line inside the same callout — this is D3.8's precedent, cited for RE-225's runbook-link compliance.

#### Column-0 fence + decomposition-table pairing

`docs/admin-setup-android/02-zero-touch-portal.md:104-138` (full section, including the shared-anti-paste-block HTML-comment idiom which is NOT part of the pattern to copy — only the fence + table matter here):
```markdown
Paste the JSON below into the ZT portal configuration. Replace `YourEnrollmentToken` with the token exported from your Intune enrollment profile.

```json
{
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
    "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
  ...
}
```

**Fields reference:**

| Field | Required | Source | Purpose |
|---|---|---|---|
| `...PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME` | Required | Google ZT spec | DPC receiver class — fixed for Intune (CloudDPC) |
```
(Fence markers shown escaped above to avoid breaking this document's own rendering; ship them unescaped, column 0, in the recipe.) The lead-in sentence *"Paste the JSON below…"* is the `02:106`-only idiom (07 uses a different lead-in per CONTEXT D1.2 — do not borrow 07's lead-in wording). RE-225's decomposition table instead uses recipe 03's 4-column header shape (below), per D1.8.

**Decomposition table header + non-payload row precedent** — `03:179-199` (header row + 3 representative rows, incl. the two "not in the worked payload" idiom rows CONTEXT cites at `:190`/`:196`/`:197`):
```markdown
| # | Field | What it is | Decision-relevant semantics |
|---|---|---|---|
| 10 | File Explorer namespace restrictions | **Not in the worked payload** | Folder browsing is locked down by default in a restricted user experience; that node is the only way to open Downloads or removable drives back up, and it requires declaring the `rs5` namespace (and `v3` for removable drives) |
| 17 | `applyOnce` (JSON) | Apply-pins-once switch | Windows 11 24H2 with KB5062660 only; ignored on earlier Windows 11. **Omitted here, and absence gives the reapply-every-login behaviour a kiosk wants.** |
```
RE-225's header is `| # | Setting / JSON key | Configuration designer label | What it does | Worked value |` per D1.8 (5 columns, not 4 — `#` column ruled IN for parity, plus the label column 03 doesn't need since XML has no GUI designer). The "Not in the worked payload" / reader-facing-explanation-of-omission idiom (D0.2) carries over verbatim in spirit.

#### `## Verification` `- [ ]` idiom

`03:256-273` (excerpt, grouped-by-phase form):
```markdown
## Verification

**Admin at the console, before the first kiosk sign-in:**

- [ ] The `AssignedAccess > Operational` channel is enabled — in Event Viewer open **Applications and Services Logs** > **Microsoft** > **Windows** > **AssignedAccess** > **Operational**, right-click **Operational**, and select **Enable Log**. It is disabled by default, so do this before the first kiosk sign-in: for some failures events are captured only once, and logging enabled after an issue occurs may not capture them.
- [ ] The profile arrived on the device: the key `HKLM\Software\Microsoft\Windows\AssignedAccessCsp` is present. This is device-scope and readable without the kiosk account signing in, which is what separates *the policy never arrived* from *the policy arrived but the signing-in identity is not in the configuration's scope*.
```
Every line is `- [ ]` + a bold-free observable check, often with a full sentence of context after an em-dash. D4.6's 7-line checklist (6 positive checks + the debug-menu line) follows this exact density and tone; both deliberately-break-it checks demote out of this section per D4.6.

#### `## Rollback/Recovery` (position + bold-pseudo-heading shape)

`03:275-306` (full section — this is the sole corpus instance CONTEXT cites; reproduce structure, not content):
```markdown
## Rollback/Recovery

Removing the Assigned Access configuration is not the same as returning the device to its prior state.

**Exiting a running session (temporary):**

- Alt+F4, Alt+Tab, Alt+Shift+Tab and Ctrl+Alt+Del are not blocked for a restricted-user-experience account. ...

**Removing the configuration (permanent):**

- Unassign or delete the Intune policy that carries the configuration. ...
- **Removal is not rollback.** Deleting the Assigned Access configuration removes the policy settings associated with the users, but it cannot revert all the changes ...

**Reimaging and re-enrollment:**

- Autopilot Reset retains provisioning packages and MDM enrollment and re-applies the lockdown, so unassign the policy before resetting rather than after.
```
Shape: one lead sentence stating the section's own scope-limiting premise, then N `**Bold pseudo-heading:**` groups each followed by a plain `-` bullet list (not `- [ ]`), zero self-narration of precedent (per `135-CONTEXT.md:140` D6.3, D2.2). **Position: between `## Verification` and `## Configuration-Caused Failures`** (D4.3) — this is the file-order placement, confirmed by the current file's H2 sequence (`Verification` at line 256, `Rollback/Recovery` at 275, `Configuration-Caused Failures` at 307).

#### `## Configuration-Caused Failures` (3-column, in-recipe routing)

`03:307-319` (header + 2 representative rows, one routed to a Step anchor, one to an external doc):
```markdown
## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Backslashes doubled inside an XML attribute such as `App/@DesktopAppPath` | The path never resolves, so the app is effectively not allow-listed even though the payload looks right | [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| The `AssignedAccess > Operational` channel left disabled, then read as clean | An empty channel reads as a pass and hides the real parse or apply error — a guaranteed false pass | [Verification](#verification) |
```
D3.4's routing discipline: prefer a real L1/L2 runbook link (`docs/l1-runbooks/00-index.md:88-89` rows 27/28, `docs/l2-runbooks/00-index.md:168-169` rows 19/20) where the symptom genuinely fits; otherwise the `03:311→#step-5` in-recipe-anchor idiom shown above.

#### `## See Also`

`03:321-328` (full section):
```markdown
## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md) — the full spec this recipe's decision block instantiates
- [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) — full self-deploying field reference, TPM 2.0, and network prerequisites
- [ESP Policy](../admin-setup-apv1/03-esp-policy.md) — device-phase-only Enrollment Status Page configuration
- [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) — the membership-rule syntax for the kiosk device group
- [APv1 vs APv2](../apv1-vs-apv2.md) — framework selection reference
- [Step 5a: Kiosk configuration](../recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration) — the single-app case, which this recipe does not work
```
Every entry: `[Link Text](path)` + em-dash + one-sentence rationale. Last entry is a section-anchor (not a whole-doc) link — precedent for D4.9's own section-anchor entries. First entry is always the STD-05 spec link.

#### Indented-callout escape hazard (T-7 — DO NOT reproduce)

`docs/recipes/02-shared-ipad-full-provisioning.md:88,94,102,107,120` — all five callouts/lead-ins in this file are indented 3 spaces inside a numbered-list item, e.g.:
```markdown
   > **What breaks if misconfigured:** Sending a Shared-iPad-enabled policy to an unsupported device — an iPhone, or an iPad on iPadOS 13.3 or earlier — triggers a wipe.
```
This is cited as a **negative** pattern: D3.9 rules RE-225 ships every blockquote at column 0 (matching 01/03, not 02), specifically because indentation silently escapes C17 `#12`'s `^>`-anchored 200-char cap. Do not indent any RE-225 callout even when it sits inside a numbered step's sub-item, as 02 does.

## Shared Patterns

### EEE-SOP decision-block format (STD-05)
**Source:** `docs/_standards/EEE-SOP-standard.md:455-545` (not re-read in full this pass — line numbers per CONTEXT `<canonical_refs>`; `:470` lead-in mandate, `:476-482` the three Case definitions, `:496-498` decision-content scope, `:502-522` D-04/D-05).
**Apply to:** All 5 decision blocks (D2.1, D2.5, D2.8) and every `[ASSUMED]`/`[MEDIUM]` marker (D1.9).

### C17 EEE-contract validator (the gate, not a source to imitate)
**Source:** `scripts/validation/c17-eee-contract.mjs` — `#10` (`:334-341`, unmapped `platform` hard-fails), `#11` (`:344-372`, header counts as data row + prose-summary anti-pattern), `#12` (`:388-407`, column-0-anchored 200-char blockquote cap, mask regex at `:158`, **not** `:150`).
**Apply to:** Every table (D3.2 prose-summary requirement), every blockquote (D3.9 column-0 + split-run discipline), the frontmatter `platform` field (D4.4).

### Recipe-template.md skeleton
**Source:** `docs/_templates/recipe-template.md` — 7 canonical H2s (`Summary` implicit, then `Prerequisites :92`, `Unsupported and Anti-Feature Callouts :98`, `Steps :104`, `Verification :124`, `Configuration-Caused Failures :129`, `See Also :136`). RE-225 ships 8 (D4.3 inserts `Rollback/Recovery` between Verification and Configuration-Caused Failures — the same divergence 03 already made).
**Apply to:** Overall document skeleton, frontmatter field set, "This recipe is NOT" opener, "every configurable setting needs a What-breaks callout" rule (`:26`), imperative-voice steps rule (`:27`), full-portal-path rule (`:28`).

### `[ASSUMED]` / `[MEDIUM]` marker discipline
**Source:** `docs/recipes/01-shared-windows-avd-client.md:101,103,129,131,133,135` (four worked `[ASSUMED]` instances, all split-run, all column-0) + `.planning/research/PITFALLS.md:310` (`[MEDIUM]` inline/table-row-legal, `[ASSUMED]` split-blockquote-only).
**Apply to:** D1.5's exit-PIN-key caveat callout (Finding 2), D1.7's host sentence `[MEDIUM: MS Q&A community]` tag, D2.10's Pitfall-20 marker carry-forward from the anchor's `[MEDIUM]`-tagged Delta block.

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| The MHS JSON envelope's `kind`/`productId`/`managedProperty` wrapper shape | payload artifact | file-I/O | No prior recipe or admin-setup-android doc uses this envelope; the two existing Android JSON fences (`02-zero-touch-portal.md`, `07-knox-mobile-enrollment.md`) are flat DPC-extras objects, structurally different. Use RESEARCH.md Finding 5's verbatim Microsoft-sourced example instead — it is the only correct source for this shape. |
| `v1.19-DEFERRED-CLEANUP.md` (the file itself) | cleanup log | append-only | File does not exist yet in this milestone — Phase 138/HARN-16 creates it. `136-01-SUMMARY.md` carries flagged contributions per the `135-02-SUMMARY.md:193` pattern (an entry inside a SUMMARY, not a standalone file this phase writes). |

## Metadata

**Analog search scope:** `docs/recipes/`, `docs/_templates/`, `docs/admin-setup-android/`, `docs/_standards/EEE-SOP-standard.md`, `docs/l1-runbooks/00-index.md`, `docs/l2-runbooks/00-index.md`, prior-phase SUMMARY/CONTEXT files under `.planning/phases/135-*` and `.planning/milestones/v1.18-phases/129-*`.
**Files scanned:** 3 full recipes (01, 02, 03), 1 template, 2 Android admin-setup JSON-fence sections, 1 anchor doc (referenced, not re-read — already fully covered in CONTEXT/RESEARCH), Phase-135 shell commit `ef155268`.
**Pattern extraction date:** 2026-08-03
