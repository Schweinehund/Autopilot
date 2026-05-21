# Phase 62 Pre-Edit Anchor Inventory

**Captured:** 2026-05-21 (BEFORE any Phase 62 edits to existing files)
**Files inventoried:** 3 existing files receiving surgical edits in Phase 62
**Purpose:** PITFALL-6 anchor-stability surface — compare pre/post to verify zero anchor shift

## File 1: docs/_glossary-macos.md

**Pre-edit git SHA (last commit touching file):** `27bafaf701ab3e06c183e36ccd12e3ca94463a73`
**Receiving:** 1 reciprocal banner line (top, after existing reciprocity blockquote) + 1 inline see-also at ABM entry (~line 67)

### Alphabetical Index Anchors (line 16)

Pre-edit index line (verbatim):
```
[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Setup Assistant](#setup-assistant) | [Supervision](#supervision) | [VPP](#vpp)
```

Full H2/H3 anchor list (verbatim):

H2 anchors:
- `14:## Alphabetical Index`
- `20:## Enrollment`
- `59:## Device Management`
- `88:## App Distribution`
- `106:## App Protection (MAM)`
- `119:## Version History`

H3 anchors:
- `22:### Account-Driven User Enrollment`
- `29:### ADE`
- `36:### Await Configuration`
- `43:### Setup Assistant`
- `50:### Supervision`
- `61:### ABM`
- `68:### ABM Token`
- `74:### APNs`
- `80:### Jailbreak Detection`
- `90:### VPP`
- `108:### MAM-WE`

**Permitted edits per Plan 62-07:**
- Banner line INSERTED after existing reciprocity blockquote (after line 10, before line 12 `# Apple Provisioning Glossary`)
- Inline see-also APPENDED to existing `> See also:` block at ABM entry (line ~66, after `> See also: [ABM (Apple Business Manager)](_glossary-linux.md#abm-apple-business-manager) (Linux).`)
- Zero H2/H3 headings renamed
- Zero existing prose modified

## File 2: docs/admin-setup-macos/01-abm-configuration.md

**Pre-edit git SHA:** `350562f49d9b101407736042bad679e68aa6d6f7`
**Receiving:** Rebrand callout #2 INSERTED between existing Platform-gate blockquote (lines 9-11) and H1 (line 13)

H2 anchors:
- `17:## Prerequisites`
- `28:## Steps`
- `100:## Token Sync Mechanics`
- `110:## Verification`
- `118:## Configuration-Caused Failures`
- `128:## Renewal / Maintenance`
- `136:## See Also`

H3 anchors:
- `30:### Step 1: Download Intune Public Key`
- `42:### Step 2: Create MDM Server and Download Server Token`
- `55:### Step 3: Upload Server Token to Intune`
- `67:### Step 4: Assign Devices to MDM Server`
- `88:### Step 5: Set Default Enrollment Profile`

**Permitted edits per Plan 62-07:**
- Rebrand callout blockquote INSERTED between Platform-gate blockquote and H1
- Frontmatter `last_verified` updated to 2026-05-21 (60-day clock reset upon touch)
- Zero existing headings renamed
- Zero existing prose modified

## File 3: docs/admin-setup-ios/02-abm-token.md

**Pre-edit git SHA:** `72aabc2e4d5d8b57d3b278db8e92d07a813a88e4`
**Receiving:** Rebrand callout #3 INSERTED between existing Platform-gate blockquote (lines 9-12) and H1

H2 anchors:
- `18:## Prerequisites`
- `29:## How iOS ADE Token Setup Differs from macOS`
- `40:## Steps`
- `68:## Token Sync Mechanics`
- `76:## Token Limits`
- `84:## Verification`
- `92:## Configuration-Caused Failures`
- `102:## Renewal / Maintenance`
- `109:## See Also`

H3 anchors:
- `42:### Step 1: Download the Intune public key certificate`
- `48:### Step 2: Create MDM server and download server token in ABM`
- `54:### Step 3: Upload server token to Intune`
- `60:### Step 4: Assign devices to MDM server in ABM`

**Permitted edits per Plan 62-07:**
- Rebrand callout blockquote INSERTED between Platform-gate blockquote and H1
- Frontmatter `last_verified` updated to 2026-05-21
- Zero existing headings renamed
- Zero existing prose modified

## Post-Edit Verification Checklist (Plan 62-08 + post-Plan-62-07 manual check)

- [ ] `_glossary-macos.md` alphabetical index line unchanged byte-for-byte (compare line 16 area pre/post)
- [ ] All `_glossary-macos.md` H3 anchors present with zero slug changes (`grep -nE "^### " <file>` output matches pre-edit list)
- [ ] `01-abm-configuration.md` all pre-edit H2/H3 anchors present post-edit
- [ ] `02-abm-token.md` all pre-edit H2/H3 anchors present post-edit
- [ ] `git diff --word-diff` against pre-edit SHAs shows ONLY additions in heading regions (no `-` lines on headings)

## Note on the 4 banner-line glossary edits (not anchor-inventoried separately)

`_glossary.md`, `_glossary-android.md`, `_glossary-linux.md`: each receives exactly one banner-line insertion at the top (after existing reciprocity block, before H1). No anchor inventory needed for these — the banner-line edit is structurally identical to the `_glossary-macos.md` banner-line edit and uses the same insertion-point pattern. Post-edit verification: `grep -cE "_glossary-apple-business\.md" <file>` returns >=1 in each.
