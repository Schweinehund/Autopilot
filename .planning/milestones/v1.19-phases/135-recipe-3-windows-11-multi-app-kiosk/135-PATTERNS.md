# Phase 135: Recipe #3 — Windows 11 Multi-App Kiosk - Pattern Map

**Mapped:** 2026-07-30
**Files analyzed:** 6 (1 create, 5 modify)
**Analogs found:** 6 / 6

This is a documentation corpus (Markdown), not an application codebase. "Analogs" are shipped
sibling Markdown documents; "patterns" are heading shapes, table headers, blockquote idioms, and
frontmatter blocks — not code.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/recipes/03-<slug>.md` | document (Guide, Device Recipe class) | linear procedure w/ decision points | `docs/recipes/01-shared-windows-avd-client.md` + `docs/recipes/02-shared-ipad-full-provisioning.md`, instantiating `docs/_templates/recipe-template.md` | exact (same doc class) |
| `docs/_standards/EEE-SOP-standard.md` (3 rationale sites + Version History row) | standard/reference doc, in-place edit | targeted rewrite of existing prose | itself (surrounding STD-05/STD-04 sections + existing Version History rows) | exact (same file) |
| `.planning/research/STACK.md` (append) | research artifact | one-line append, tagged `CORRECTED` | itself — existing `STACK.md:16`/`:72` already carry a prior `CORRECTED 2026-07-25` tag | exact |
| `.planning/research/FEATURES.md` (2 edits: `:44` hyphen, `:169` append) | research artifact | in-place word fix + append | itself | exact |
| `.planning/research/SUMMARY.md` (append) | research artifact | one-line append | itself | exact |

## Pattern Assignments

### `docs/recipes/03-<slug>.md` (new Device Recipe)

**Analogs:** `docs/recipes/01-shared-windows-avd-client.md` (RE-222, Approved) and
`docs/recipes/02-shared-ipad-full-provisioning.md`, both instantiating
`docs/_templates/recipe-template.md`.

**Frontmatter + EEE header block** (`01:1-13`, real values — copy this shape exactly):
```markdown
---
doc_id: RE-222
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-17
review_by: 2026-10-15
applies_to: Shared Windows AVD-client device (self-deploying, kiosk or Shared PC)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-222 · **Status:** Approved

# Shared Windows AVD-Client Device: Self-Deploying Provisioning
```
For RE-224: `doc_id: RE-224`, `status: Draft` (per D5.6/D5.7 — strip `TEMPLATE-SENTINEL` and set
real `last_verified`/`review_by` BEFORE any C17 `#9`/`#12` measurement), `platform: Windows`,
`owner: Intune Admin Lead`. Template's raw skeleton is at `docs/_templates/recipe-template.md:33-45`.

**H2 order actually shipped** (from recipe 01's grep, line numbers; this is the fixed H2 skeleton
— template lines in parens):
```
## Summary                                   (template :49)
## Prerequisites                             (template :92)
## Unsupported and Anti-Feature Callouts     (template :98)
## Steps                                     (template :104)
### Step N: <action>                          (repeat)
## Verification                              (template :124)
## Configuration-Caused Failures             (template :129)
## See Also                                  (template :136)
```
RE-224 diverges by inserting `## Rollback/Recovery` between `## Verification` and
`## Configuration-Caused Failures` (KIOSK-04, named non-inherited divergence — D2.1/D2.4).

**`## Summary` end-state statement idiom** (D-06, `01:19-23`):
```markdown
Following this recipe yields a self-deploying, Entra-joined shared Windows device that runs the
Windows App as its Azure Virtual Desktop client, provisioned end-to-end from zero through Intune.
It covers Windows 10/11 devices and requires the Intune Administrator role plus Entra ID Groups
permissions to create the deployment profile, Enrollment Status Page, dynamic device group, and
app assignment this recipe walks through.
```
One-sentence concrete end-state, then platform/role, minimum 30 words (C17 `#5`).

**`> **Scope:**` banner form** (single top-level blockquote, `01:25`):
```markdown
> **Scope:** Provisions the physical shared Windows device that runs the AVD client, not the Azure session hosts. Assumes host pools, session hosts, and FSLogix already exist.
```
Recipe 02's version (`02:25`): `> **Scope:** This recipe covers named-user Shared iPad provisioning only.`
Template's generic form (`recipe-template.md:89-90`) spans two physical lines but is one logical
blockquote. Watch C17 `#12`'s 200-char contiguous top-level `>` cap (D6.2 — recipe 01's own banner
is 175 chars; split into two blank-line-separated sub-200-char runs if RE-224's taxonomy sentence
pushes it over — the `01:101`/`01:103` idiom).

**`## Unsupported and Anti-Feature Callouts` table header** (`01:39-46`, exact header row + real
rows):
```markdown
## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Hybrid Microsoft Entra join | Self-deploying mode has no user affinity, and hybrid join cannot complete without one | Use Microsoft Entra joined only — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) |
```
This is exactly where D4.3's new autologon-arm anti-feature row and D4.5's app-provisioning-timing
row belong.

**Prerequisites bullet shape** (`01:27-37`) — opens with a `**This recipe is NOT:**` bullet
(H-LOCK-5, permissive), then RBAC/licensing bullets, then linked prior-configuration bullets:
```markdown
- **This recipe is NOT:** Entra "Shared device mode" (SDM/Global Sign-Out is iOS/Android-only), a RemoteApp-on-host-pool publishing guide, or a guide to Autopilot registration itself — see the linked references below for those.
- **RBAC:** Intune Administrator role (or an equivalent custom role covering device configuration profiles, app assignment, and enrollment configuration).
```
Use for D5.5's `**This recipe is NOT:**` opener (single-app kiosk, Shell Launcher, SharedPC, Entra
SDM) plus the TPM-attestation / Ethernet-at-OOBE bullets already shipped verbatim at `01:33-34`.

**`### Step N:` + `> **What breaks if misconfigured:**` idiom** (`01:78-85`, `intune-connector-ad.md:78-81`):
```markdown
### Step 4: Deploy Windows App (device-context)

...

> **What breaks if misconfigured:** Assigning Windows App as Available instead of Required, or to a user group instead of a device group, means it is not present before anyone signs in.
```
Second shipped form with the runbook link appended on its own line
(`09-intune-connector-ad.md:79-81`):
```markdown
> **What breaks if misconfigured:** Connector shows Active but the version is too old -- enrollment requests are silently rejected.

> Hybrid join fails with no clear error on the device side. Admin must check the connector version explicitly in the version column. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)
```
Use this for the OMA-URI Data-type gotcha and the profile-parse-error callouts.

**`## Verification` `- [ ]` idiom** (`01:206-223`, `02:262-269`):
```markdown
## Verification

- [ ] Device completed OOBE unattended (no manual credential entry during device deployment)
- [ ] Device is Entra joined (not hybrid) and enrolled in Intune
```
D3.2's split precondition (admin-console-before-first-sign-in vs. observable-behaviour-during/after)
maps to grouping checklist items under two implicit phases, same flat `- [ ]` list — no sub-headings
in either shipped recipe.

**`## Configuration-Caused Failures` table header** (`01:225-236` region header row):
```markdown
## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
```
Per D6.1(g): route only to in-recipe anchors or existing refs — no fabricated runbook links (no
Windows-kiosk runbook exists corpus-wide).

---

### STD-05 decision-block idiom (Case 1, D4.2)

**Shipped Case-1 block, verbatim, with the mandatory blank line before the table** (D-02;
`01:105-112`):
```markdown
### Step 5: Choose kiosk or Shared PC

> **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared desktop)?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Kiosk | Single-purpose fixed-app device | Users get full shell instead | [Step 5a](#step-5a-kiosk-configuration) |
| Shared PC | Multi-app shared desktop | Locked to one app unexpectedly | [Step 5b](#step-5b-shared-pc-configuration) |
```
One blank line separates the `> **Ask the admin:**` blockquote from the table — GFM lazy
continuation otherwise swallows the table into the blockquote and the table vanishes from the
`.docx` retrieval body (STD-05 D-02, `EEE-SOP-standard.md:484-490`).

**D4.2's variant: routing cross-link instead of a worked branch.** Model the `Branch` cell on the
existing autologon precedent — recipe 02 states a non-worked mode in place with its reason
(`02:194-198`, D4.3's cited idiom):
```markdown
A separate, out-of-scope third mode exists: the ADE enrollment-profile setting **Require Shared
iPad temporary session only** ... forces every session on the device to be a guest session ...
That mode lives on the enrollment profile, not this device-restrictions Block toggle, and
is not implemented by this named-user recipe.
```
Case-1 spec (normative rules) at `EEE-SOP-standard.md:468-511`; the D-07 worked example
fence at `:541-544` (a spec sample in an index-excluded standard — do NOT copy that fence form
into the live recipe, D-03 bars fenced decision content in enrolled recipes).

**Case-2 form for reference (NOT the shape to use here — D4.2 rules Case 1)**
(`recipe-template.md:70-78`): `| Option | When to choose | Recorded as |` — drops the consequence
column, wrong for a CRITICAL-rated decision.

---

### Payload-fence idiom (D1.1/D1.2/D1.7)

**Placeholder lead-in + column-0 fence** (`docs/admin-setup-macos/10-kerberos-sso-extension.md:90-96`):
```markdown
The following is the verified on-prem .mobileconfig plist, sourced verbatim from Microsoft Learn (updated 2026-06-15). Replace the placeholder `PayloadUUID` and `PayloadIdentifier` values with your own generated UUIDs before uploading to Intune.

```xml
<?xml version="1.0" encoding="UTF-8"?>
...
```
```
Followed by a **Critical values to verify** bullet list right after the fence (`:158-159`) — model
RE-224's `[YOUR-LOB-APP-AUMID]` / `[YOUR-ENTRA-GROUP-OBJECT-ID]` / GUID placeholder callout on this.

**Fence-immediately-after-a-numbered-click-list placement precedent**
(`docs/admin-setup-apv1/09-intune-connector-ad.md:83-95`):
```markdown
### Step 4: Configure OU for Computer Object Creation

By default, the connector's MSA can only create computer objects in the **Computers** container. To specify a custom OU:

1. Open `C:\Program Files\...\ODJConnectorEnrollmentWizard.exe.config`
2. Add the OU LDAP distinguished name to the `OrganizationalUnitsUsedForOfflineDomainJoin` key:

```xml
<appSettings>
  <add key="..." value="..." />
</appSettings>
```

For multiple OUs, ...
```
The fence sits directly after step 2's colon, inside the numbered list's own step, with prose
continuing after — exactly the placement D1.7 mandates for the `AssignedAccessConfiguration`
payload (fence immediately after the numbered click-list inside the Step that authors the XML, not
deferred to end of `## Steps`).

---

### `## Rollback/Recovery` section shape (D2.3/D2.5)

**Shipped shape — bold pseudo-heading + bullets, zero blockquotes**
(`docs/reference/apv1-apv2-migration.md:147-160`):
```markdown
## Rollback/Recovery

APv1-to-APv2 rollback is fleet-level, not device-level.

**To stop the migration before a category is moved:**
- Stop removing APv1 hardware hash registrations. New devices continue on APv1 automatically if the APv1 profile targets their group.
- No action is needed for unmigrated categories — they continue using APv1.

**For devices already moved to APv2:**
- There is no per-device "switch back to APv1" button.
- Rollback requires: Wipe device → Re-collect hardware hash → Re-import hash to Intune → Re-assign APv1 profile → User re-provisions via APv1.

**Timeline guidance:** Keep APv1 infrastructure ... active for at least 90 days after the last device category migrates.
```
NOTE: in this `docs/reference/` doc, `## Rollback/Recovery` sits **before** `## Verification` —
that ordering does NOT apply to RE-224 (D2.4 locks it between `## Verification` and
`## Configuration-Caused Failures`; the reference docs have a different H2 skeleton entirely). Copy
only the internal shape (bold lead sentence, bold pseudo-subheadings, plain bullets, no
blockquotes) — not the section's position.

---

### `## Version History` table shape (D7.6)

`docs/_standards/EEE-SOP-standard.md:610-616`, exact column shape and existing rows:
```markdown
## Version History

| Date | Change |
|------|--------|
| 2026-07-04 | Initial version — EEE SOP standard for Phase-1 corpus retrofit (v1.15); all sections authored including D1 normalization map (20 entries) and C17 needle-spec handoff |
| 2026-07-07 | v1.16 STD-04 — added Mermaid-in-Enrolled-Classes Policy ... |
| 2026-07-17 | v1.18 STD-05 — added Admin Decision-Point Block Format ... |
```
Append one new row dated 2026-07-30 (or the phase's authoring date), column-for-column matching:
`| YYYY-MM-DD | vX.Y HYG-05 — corrected the fenced-content rationale at :462, :496-497, :538-539 (fenced content IS indexed as non-prose runs; PIPE-02 never tested retrieval) |`.
Do NOT alter the `:616` row (check-phase-129's D-02 regex depends on it, per D7.6).

---

### HYG-05 target sites in `EEE-SOP-standard.md` (D7.1/D7.2)

The three sites to edit, quoted from this read (offsets `455-545`):
- `:462` — "...and the standing no-key-info-in-code-fences rule (fenced content is invisible to the Copilot Studio / SharePoint retrieval body text — see Grounding Notes above)."
- `:496-497` (inside D-03) — "Decision content is never placed inside a code fence in a live recipe — fenced content is invisible to the retrieval body text (see Grounding Notes)..."
- `:538-539` (inside D-07) — "...but the same fence in an enrolled recipe would silently hide the decision from retrieval."

D7.2's mandated replacement causal clause: *fenced content **is** indexed, but as non-prose runs
that retrieve poorly* — rewrite the causal clause only; leave D-03's normative sentence ("Decision
content is never placed inside a code fence in a live recipe") intact in force.

## Shared Patterns

### Frontmatter + EEE header block (all recipe docs)
**Source:** `docs/recipes/01-shared-windows-avd-client.md:1-13`
**Apply to:** `docs/recipes/03-<slug>.md`
```markdown
---
doc_id: RE-224
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: <authoring date>
review_by: <authoring date + 90 days>
applies_to: <specific scope>
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-224 · **Status:** Draft
```

### STD-05 D-01/D-02 decision-block format (all Case-1/2/3 decisions)
**Source:** `docs/_standards/EEE-SOP-standard.md:468-491`
**Apply to:** the account-model decision block in `03-<slug>.md`
- One-sentence `> **Ask the admin:**` lead-in only (no options/consequences inside the blockquote).
- Mandatory blank line before the table.
- Case 1 table: `| Option | When to choose | Consequence if wrong | Branch |`.

### `> **What breaks if misconfigured:**` callout (every configurable setting)
**Source:** `docs/recipes/01-shared-windows-avd-client.md:85`, `docs/admin-setup-apv1/09-intune-connector-ad.md:79-81`
**Apply to:** every Step in `03-<slug>.md`, including the fence's own lead-in for element-order facts (D1.12).

### Column-0 fence discipline (C17 `#1`/mask)
**Source:** `c17-eee-contract.mjs:150` (`^`-anchored mask); precedent `10-kerberos-sso-extension.md:94`, `09-intune-connector-ad.md:91`
**Apply to:** the `AssignedAccessConfiguration` fence and the OU-config fence pattern — column 0, no leading whitespace, ever.

## No Analog Found

None — all 6 files touched by this phase have a strong, same-role, recently-modified analog in the
corpus. Recipe 01/02 are the exact same doc class as the new file; `EEE-SOP-standard.md` and the
three research files are self-analogous (in-place edits following their own existing conventions).

## Metadata

**Analog search scope:** `docs/recipes/`, `docs/_templates/`, `docs/_standards/`, `docs/admin-setup-macos/`, `docs/admin-setup-apv1/`, `docs/reference/`
**Files read in full or targeted-range:** `docs/recipes/01-shared-windows-avd-client.md` (frontmatter, Steps 4-5b, Prerequisites, Verification headers), `docs/recipes/02-shared-ipad-full-provisioning.md` (H2 skeleton, Step 4 cross-link idiom), `docs/_templates/recipe-template.md` (full), `docs/_standards/EEE-SOP-standard.md` (STD-05 block :455-545, Version History :605-617), `docs/admin-setup-macos/10-kerberos-sso-extension.md:85-159`, `docs/admin-setup-apv1/09-intune-connector-ad.md:78-102`, `docs/reference/apv1-apv2-migration.md:140-169`
**Pattern extraction date:** 2026-07-30
