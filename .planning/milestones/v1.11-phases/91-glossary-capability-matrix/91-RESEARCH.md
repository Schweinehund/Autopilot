# Phase 91: Glossary + Capability Matrix - Research

**Researched:** 2026-06-24
**Domain:** Markdown anchor/slug mechanics, glossary entry authoring, blob-hash atomicity
**Confidence:** HIGH

## Summary

This research answers six concrete execution-verification questions for Phase 91. All decisions are locked in CONTEXT.md; the planner needs ground-truth answers on anchor mechanics, slug tables, term definitions, artifact format, blob-hash edit procedures, and reciprocal see-also placement.

The highest-risk finding is Q1: this repo uses plain GitHub markdown rendering with no docs-site generator (no MkDocs, Docusaurus, or Jekyll). The `{#custom-id}` attribute syntax is NOT supported. The `### Kandji / Iru {#kandji-iru}` form will render the literal characters `{#kandji-iru}` as body text in the heading, not as an anchor override. The only safe path for the Kandji/Iru entry is the bare heading `### Kandji-Iru` (single dash, no slash), which the GitHub slug algorithm converts to `#kandji-iru` exactly.

All six blob-hash guards live exclusively in `check-phase-63.mjs` lines 209 and 230. No other validator holds these hashes. Both `const BASELINE` values are confirmed matching HEAD on 2026-06-24 (V-63-08 = `73f16378...`, V-63-09 = `2314ede7...`). The atomicity requirement is simple: content edit + hash update in one `git commit`.

**Primary recommendation:** Use `### Kandji-Iru` (no slash) as the heading for the Kandji/Iru glossary entry; it slugifies to `#kandji-iru`. For all 9 other minted headings, normal prose headings produce the required slug. Commit all matrix/comparison edits together with their `const BASELINE` updates in single atomic commits.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 (1C-modified):** New `###` term entries go under existing `## Device Management` H2. Kandji/Iru is its own standalone entry. The heading MUST slugify to `#kandji-iru`. Preference: (a) `{#kandji-iru}` override IF renderer supports it; (b) fallback `### Kandji-Iru`. Research MUST determine which path is valid.
- **D-02 (negative callout):** Do not assert a Windows equivalent for migration terms. Use explicit-negative form. `_glossary.md#tenant-migration` is the Windows analog but is wipe-only, not equivalent.
- **D-03 (2A — concise):** Deadline entry = one sentence + 1–90-day range stated once + cross-links to guide 02 and L2 #30. No inline lockout prose.
- **D-04 (3A — single row under `## Enrollment`):** One new row in the matrix's existing `## Enrollment` table. Windows cell = `n/a`. V-63-08 updated atomically.
- **D-05 (4C — dedicated row + ONE atomic commit):** One dedicated MDM-migration row in the 4-platform `## Enrollment` table; macOS cell = `Supported — [matrix](macos-capability-matrix.md#enrollment)`; all non-macOS cells = `n/a — [matrix](…#enrollment)`. V-63-09 updated atomically.
- **D-06 (expand scope — all 9 dead anchors):** Phase 91 mints glossary entries for ALL 9 currently-dead inbound anchors from guide 02 lines 541–550.

### Claude's Discretion

- Exact entry wording/phrasing and body prose
- Which existing H2 sub-grouping each of the 6 added terms reads most naturally under (Device Management vs Enrollment vs Authentication)
- Exact matrix/4-platform cell phrasing and the dedicated row label
- Sibling consistency: frontmatter freshness stamps, entry anatomy, Version History footer rows

### Deferred Ideas (OUT OF SCOPE)

- If renderer does NOT honor `{#id}`, capture as a repo-wide note (not actioned as a defect)
- Process note on Phase 90's forward dead-links pattern (not a formal escaped-defect report)

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| REF-01 | `_glossary-macos.md` (+ reciprocal `_glossary.md` see-also) gain MDM Migration, "Assign Device Management", Deadline, and Kandji→Iru rebrand note; D-06 expands to all 9 dead anchors | Q1 (anchor support), Q2 (slug table), Q3 (term definitions), Q6 (reciprocal see-also) |
| REF-02 | `macos-capability-matrix.md` gains MDM-migration row (pre-edit anchor inventory first, V-63-08 atomic); `4-platform-capability-comparison.md` updated link-not-copy (V-63-09 atomic) | Q4 (inventory artifact format), Q5 (blob-hash mechanics) |

</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Glossary anchor slug generation | Static renderer (GitHub) | — | No docs-site generator; GitHub markdown slugifies headings at render time |
| Blob-hash validation | Validator script (Node.js) | CI/GitHub Actions | check-phase-63.mjs runs git hash-object at test time |
| Cross-doc anchor linking | Authoring convention | — | Manual: author writes `#slug` based on heading text; no tooling auto-generates |

---

## Q1: `{#id}` Anchor-Override Support — DEFINITIVE ANSWER

### Finding

**The repo uses plain GitHub markdown rendering. `{#custom-id}` syntax is NOT supported.**

Evidence [VERIFIED: filesystem grep + repo structure]:

1. **No docs-site generator present.** Searched for `mkdocs.yml`, `docusaurus.config.*`, `_config.yml`, `.nojekyll`. None found anywhere in the repo. The root `package.json` is the autopilot app's harness package (no docs build script). The `.github/workflows/` directory contains only audit-harness CI workflows — zero pages-deploy or docs-build workflows.

2. **No `{#...}` usage anywhere in the corpus.** Grepped the entire `docs/` tree for `{#` and `#\{` — zero matches. No existing heading in any file uses the explicit anchor override pattern.

3. **The `cobo--cope--wpco` precedent is conclusive.** `_glossary-android.md` links to `_glossary-linux.md#cobo--cope--wpco` for the heading `### COBO / COPE / WPCO` — confirmed by reading both files. This proves the repo relies exclusively on GitHub's default slug algorithm (space-slash-space → double hyphen), with NO override in effect. If `{#id}` were supported by a processor, an existing `{#cobo-cope-wpco}` override would have been used for that heading.

### Conclusion

**Use the fallback heading `### Kandji-Iru` (bare, no slash).** [VERIFIED: filesystem grep]

- `### Kandji-Iru` slugifies to `#kandji-iru` under GitHub's algorithm (single word separation with single dash = single hyphen in slug).
- `### Kandji / Iru` slugifies to `#kandji--iru` (space-slash-space → double hyphen) — this would produce a permanently broken link to guide 02 line 547's `#kandji-iru`.
- `### Kandji / Iru {#kandji-iru}` — the `{#kandji-iru}` text renders literally in the heading as visible characters, does NOT set the anchor, and the slug of the full heading text `kandji--iru--kandji-iru` would be even worse.

**The entry body MUST still surface both names and the October 2025 rebrand.** Example anatomy:

```markdown
### Kandji-Iru

macOS MDM platform rebranded from Kandji to Iru in October 2025. Both names refer to the same product; this documentation uses "Kandji/Iru" throughout. The support portal URL is unchanged: support.kandji.io.

> **Windows equivalent:** No direct equivalent — macOS MDM platforms (Kandji/Iru, Jamf, Mosyle) have no Windows analog; Windows devices enroll directly into Intune without a third-party MDM intermediary.
```

---

## Q2: Slug Algorithm Confirmation — Complete Table for All 10 Targets

### GitHub Slug Algorithm Rules [VERIFIED: in-corpus precedent]

1. Convert to lowercase
2. Remove characters that are NOT alphanumeric, space, or hyphen
3. Replace spaces with hyphens
4. Multiple consecutive hyphens produced by removed characters (e.g., ` / `) are preserved as double hyphens

The `COBO / COPE / WPCO` → `cobo--cope--wpco` precedent confirms rule 4: space-slash-space becomes `--` (the slash is stripped, leaving two adjacent spaces which become two hyphens).

### Required Headings for the 10 Guide-02 Inbound Links

Guide 02 lines 541–550 (Glossary Quick Reference table) commit to these exact anchor targets:

| Guide-02 anchor target | Required heading text | Slug produced | Notes |
|------------------------|----------------------|---------------|-------|
| `#assign-device-management` | `### Assign Device Management` | `assign-device-management` | Straightforward — spaces → hyphens |
| `#deadline` | `### Deadline` | `deadline` | Single word |
| `#filevault-recovery-key` | `### FileVault Recovery Key` | `filevault-recovery-key` | GitHub lowercases F, V → `filevault`; spaces → hyphens |
| `#activation-lock-bypass` | `### Activation Lock Bypass` | `activation-lock-bypass` | Straightforward |
| `#acme` | `### ACME` | `acme` | GitHub lowercases all-caps |
| `#profile-based-enrollment` | `### Profile-Based Enrollment` | `profile-based-enrollment` | Existing hyphen preserved; space → hyphen |
| `#kandji-iru` | `### Kandji-Iru` | `kandji-iru` | MUST use bare dash, not slash — see Q1 |
| `#platform-sso` | Already resolves — `_glossary-macos.md#platform-sso` exists | — | DO NOTHING |
| `#app-sso` | `### app-sso platform -s` or `### app-sso` | Depends — see note | Note below |
| `#delete-device-record` | `### Delete Device Record` | `delete-device-record` | Straightforward |

**Note on `#app-sso`:** Guide 02 line 549 links to `_glossary-macos.md#app-sso`. The `### app-sso platform -s` heading would slugify to `#app-sso-platform--s` (the space before `-s` and the `-s` itself interact: lowercase-and-strip → `app-sso platform -s` → `app-sso-platform--s` because the space before `-` produces `app-sso-platform-` and then `-s` appends `-s` for `app-sso-platform--s`). The correct heading is simply `### app-sso` → slug `#app-sso`. The description text can explain `app-sso platform -s` as the specific subcommand.

**Verification rule:** Before committing, the planner task MUST verify each heading produces the right slug by checking `git hash-object` is not needed for headings — instead the executor must manually compare the heading text against the slug algorithm. The highest-risk heading is `### Kandji-Iru` (verify `#kandji-iru`, not `#kandji-iru` with double-hyphen). [VERIFIED: in-corpus algorithm from `cobo--cope--wpco` precedent]

---

## Q3: Content for the 6 Beyond-REF-01 Terms

All definitions are grounded in guide 02 (`docs/macos-lifecycle/02-mdm-migration-psso.md`) and L2 #30 usage. Cross-links are link-not-copy per D-03 principle. [VERIFIED: guide-02 file read]

### 1. `### FileVault Recovery Key` → `#filevault-recovery-key`

**Guide 02 first appears:** Stage 2 (line 148, 165, 470)

**Definition from guide 02:**
> "FileVault recovery keys are MDM-held cryptographic keys that allow decryption of the device's FileVault-encrypted startup disk. When the Kandji/Iru device record is deleted, the source MDM's copy of the key is destroyed." (guide 02 Stage 2 Behind the Scenes)

**Proposed entry:**

```markdown
### FileVault Recovery Key

MDM-held cryptographic key that allows decryption of a FileVault-encrypted Mac startup disk. Each MDM enrollment holds its own escrow copy; the key is permanently destroyed when the MDM device record is deleted. During Kandji/Iru-to-Intune migration, the source MDM copy is destroyed on Delete Device Record — retrieve it BEFORE deletion. See [Stage 2: Secret Retrieval](../macos-lifecycle/02-mdm-migration-psso.md#stage-2-intune-readiness-secret-retrieval-and-source-release).

> **Windows equivalent:** [BitLocker recovery key](https://learn.microsoft.com/en-us/mem/intune/protect/encrypt-devices) escrowed in Intune — conceptually analogous (MDM holds the decryption key); lifecycle differs (BitLocker key is not destroyed on device record deletion in most Intune configurations).
```

**Note:** The `> **Windows equivalent:**` for this term is an affirmative parallel (BitLocker recovery key), not a negative. Unlike the migration-flow terms (D-02's negative callout), this is a per-platform encryption-key term with a direct analog. [ASSUMED — planner should confirm whether to use positive or negative form here; D-02 applies to the migration concepts, not necessarily to all new terms]

### 2. `### Activation Lock Bypass` → `#activation-lock-bypass`

**Guide 02 first appears:** Stage 2 (line 150, 166, 471)

**Definition from guide 02:**
> "Activation Lock bypass codes are device-specific codes that allow an administrator to bypass Activation Lock if the supervising MDM is removed. These codes are generated when the device is supervised and are only available within 30 days of supervision." (guide 02 Stage 2 Behind the Scenes)

**Proposed entry:**

```markdown
### Activation Lock Bypass

Device-specific code enabling an administrator to bypass Activation Lock if the supervising MDM is removed. Generated at device supervision time; only available within 30 days of supervision. Permanently destroyed on Delete Device Record in the source MDM — retrieve before any device record deletion. See [Stage 2: Secret Retrieval](../macos-lifecycle/02-mdm-migration-psso.md#stage-2-intune-readiness-secret-retrieval-and-source-release).

> **Windows equivalent:** No direct equivalent. Activation Lock is an Apple-specific iCloud-linked device lock; Windows has no hardware-anchored device-lock mechanism requiring an MDM-held bypass code.
```

### 3. `### ACME` → `#acme`

**Guide 02 first appears:** Stage 7 (line 320, 331, 494)

**Definition from guide 02:**
> "An ACME certificate is issued as part of the re-enrollment (genuine re-enrollment always results in ACME reissuance on macOS 13.1+)" (guide 02 Stage 7 What Happens); "ACME certificate reissuance is a property of genuine re-enrollment. Profile-based enrollment on macOS 13.1+ always results in a new ACME certificate." (Stage 7 Behind the Scenes)

**Proposed entry:**

```markdown
### ACME

Automated Certificate Management Environment — certificate protocol used by Intune to issue device identity certificates during genuine MDM enrollment on macOS 13.1 and later. The ACME certificate is reissued on every genuine re-enrollment (including the macOS 26 in-place migration); it is NOT reissued on profile renewal or MDM refresh without a full unenroll/reenroll. See [Stage 7: Post-Migration Profile-Based Enrollment](../macos-lifecycle/02-mdm-migration-psso.md#stage-7-post-migration-profile-based-enrollment-b1-path).

> **Windows equivalent:** No direct equivalent — Windows Intune device certificates use SCEP/PKCS protocols; ACME is macOS-specific in the Intune context. SCEP and PKCS certificates serve the analogous device-identity function on Windows.
```

### 4. `### Profile-Based Enrollment` → `#profile-based-enrollment`

**Guide 02 first appears:** Stage 7 (line 320, 330, 494)

**Definition from guide 02:**
> "The Apple-described mechanism for OS-26 migration is 'unenrolls from an Automated Device Enrollment and reenrolls with profile-based enrollment.' From Intune's perspective, the device re-enrolls as a fresh ADE enrollment — no separate 'profile-based enrollment' configuration mode is required in Intune." (guide 02 Stage 7 Behind the Scenes)

**Proposed entry:**

```markdown
### Profile-Based Enrollment

The enrollment type resulting from the macOS 26 in-place migration (B1 path). Apple describes the B1 outcome as the device unenrolling from ADE and re-enrolling with profile-based enrollment. From Intune's perspective, no separate configuration is required — the existing ADE enrollment policy handles the migrated device's re-enrollment. The result is functionally equivalent to a fresh ADE enrollment, including ACME certificate issuance and PSSO Settings Catalog delivery. See [Stage 7](../macos-lifecycle/02-mdm-migration-psso.md#stage-7-post-migration-profile-based-enrollment-b1-path).

> **Windows equivalent:** No direct equivalent — this is a macOS-specific enrollment-type distinction. All Windows Autopilot enrollments are equivalent from Intune's management perspective regardless of the device's prior enrollment history.
```

### 5. `### app-sso` → `#app-sso`

**Guide 02 first appears:** Stage 9 (lines 406–413)

**Definition from guide 02:**
> "`app-sso platform -s`" used to verify PSSO registration state; confirms "Device Registration: REGISTERED" and "User Registration: REGISTERED". (guide 02 Stage 9 How to Verify)

**Proposed entry:**

```markdown
### app-sso

macOS built-in command-line tool for inspecting Platform SSO extension registration state. The subcommand `app-sso platform -s` returns the current Device Registration and User Registration status for the Entra ID SSO extension. Expected output after successful PSSO registration:

```
Device Registration: REGISTERED
User Registration: REGISTERED
```

Used as the authoritative PSSO verification gate at Stage 9 of MDM migration and at the final stage of any PSSO provisioning flow. See [Platform SSO](../_glossary-macos.md#platform-sso) for the full PSSO entry; see [Stage 9](../macos-lifecycle/02-mdm-migration-psso.md#stage-9-psso-re-registration-b1-path) for migration context.

> **Windows equivalent:** No direct equivalent. The closest Windows analog is the `dsregcmd /status` command, which returns Entra ID device join state and PRT status — conceptually similar verification function, different platform mechanism.
```

**Note:** The code block inside the glossary entry is appropriate here — `app-sso platform -s` output is load-bearing for operators. The `> See also:` line inside the blockquote should NOT reference `#platform-sso` separately from the entry body to avoid redundancy; the See Also cross-link in the entry body is sufficient.

### 6. `### Delete Device Record` → `#delete-device-record`

**Guide 02 first appears:** Stage 2 (lines 154–160, 167–174)

**Definition from guide 02:**
> "Delete Device Record action in the Kandji/Iru console for each device being migrated ... After deletion: the Kandji/Iru agent receives notification at its next check-in (~15 minutes) and automatically uninstalls itself, removing all installed profiles." (guide 02 Stage 2)

**Proposed entry:**

```markdown
### Delete Device Record

Kandji/Iru console action that removes a Mac from MDM management and permanently destroys all MDM-held secrets (FileVault recovery key and Activation Lock bypass code). After deletion, the Kandji/Iru agent (`/Library/Kandji/Kandji Agent.app`) receives an uninstall command at its next MDM check-in (~15 minutes) and removes itself. **Retrieve all secrets BEFORE performing this action — there is no recovery path after deletion.** See [Stage 2: Secret Retrieval](../macos-lifecycle/02-mdm-migration-psso.md#stage-2-intune-readiness-secret-retrieval-and-source-release).

> **Windows equivalent:** No direct equivalent. The conceptual parallel is removing a device from Intune ("Retire" or "Delete" in Intune admin center), which also removes MDM management, but Windows Intune does not hold an Activation Lock bypass code or equivalent hardware secret that is permanently destroyed on deletion.
```

### Windows-Equivalent Form for Migration-Flow Terms (D-02)

For `#assign-device-management`, `#deadline`, `#mdm-migration` (the main MDM Migration entry that REF-01 names but guide 02 does not link), the negative-callout form per D-02:

```
> **Windows equivalent:** No direct equivalent — Windows tenant-to-tenant migration requires deregistration from the source tenant, hardware-hash re-import to the target tenant, and a full device reset (NOT Autopilot Reset). In-place re-enrollment without a wipe is not available on Windows. See [Tenant migration](_glossary.md#tenant-migration).
```

---

## Q4: Pre-Edit Anchor-Inventory Artifact Format (Phase 85 Precedent)

### Location and Naming Convention [VERIFIED: filesystem read]

**Path:** `.planning/phases/{NN}-{phase-name}/{NN}-ANCHOR-INVENTORY.md`

For Phase 91, the artifact path is:
`.planning/phases/91-glossary-capability-matrix/91-ANCHOR-INVENTORY.md`

### Exact Format (from 85-ANCHOR-INVENTORY.md)

The format mirrors `63-ANCHOR-INVENTORY.md` exactly. Required sections:

```markdown
# Phase 91 Pre-Edit Anchor Inventory

**Captured:** {authoring-day} (BEFORE any Phase 91 edits to existing files)
**Files inventoried:** 2 existing files receiving new rows
**Purpose:** Pre-edit anchor-stability surface (SC#1 / PITFALL-6 / DA-4 convention)
**Mirrors format:** .planning/milestones/v1.6-phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md

---

## File 1: docs/reference/macos-capability-matrix.md

**Pre-edit git SHA (last commit touching file):** {git log -1 --format='%h' -- docs/reference/macos-capability-matrix.md}
**Pre-edit blob hash:** {git hash-object docs/reference/macos-capability-matrix.md}
**Receiving:** macOS 26 in-place migration row appended inside the `## Enrollment` table

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- `{line}:## Enrollment`
- `{line}:## Configuration`
- ... (all ## headings with line numbers)

H3 anchors: (none — H2-only file)

**Permitted edits per Plan 91-NN:**
- New data row APPENDED inside the Enrollment H2 table
- Zero H2/H3 headings renamed
- Zero existing prose modified
- `check-phase-63.mjs` V-63-08 BASELINE updated to post-edit hash in the same commit

---

## File 2: docs/reference/4-platform-capability-comparison.md

**Pre-edit git SHA (last commit touching file):** {git log -1 --format='%h' -- docs/reference/4-platform-capability-comparison.md}
**Pre-edit blob hash:** {git hash-object docs/reference/4-platform-capability-comparison.md}
**Receiving:** macOS 26 in-place migration row appended inside the `## Enrollment` table

### H2/H3 Anchor List (verbatim, pre-edit)
...
```

### Key Rules [VERIFIED: 85-ANCHOR-INVENTORY.md + 63-ANCHOR-INVENTORY.md]

1. The artifact is committed in a **separate commit BEFORE any matrix edit**. The Plan 85-01 task structure shows Task 1 = create+commit inventory, Task 2 = matrix edit + hash bump (two separate commits).
2. The `**Pre-edit blob hash:**` line records the `git hash-object` output at the moment of inventory capture — this is the hash that V-63-08/09 currently match. After the matrix edit, the new hash must be computed and written into `check-phase-63.mjs`.
3. The `**Permitted edits:**` section explicitly lists what the plan authorizes, so a reviewer can verify no unauthorized changes were made.
4. Phase 91 inventories **2 files** (macos-capability-matrix.md + 4-platform-capability-comparison.md), so the artifact has two `## File N:` sections.

### Current Pre-Edit State (confirmed 2026-06-24)

| File | Last commit SHA | Current blob hash | V-63-check |
|------|-----------------|-------------------|------------|
| `docs/reference/macos-capability-matrix.md` | `87a6092` | `73f16378197223378a8507a6751c763902de58db` | V-63-08 BASELINE matches |
| `docs/reference/4-platform-capability-comparison.md` | (from `check-phase-63.mjs` V-63-09) | `2314ede7be54efbea1d4a4a787068310869a5896` | V-63-09 BASELINE matches |

**Both hashes match HEAD on 2026-06-24.** [VERIFIED: `git hash-object` run in session]

**IMPORTANT:** The executor MUST re-run `git hash-object` on authoring day before recording these in the inventory artifact — if any intervening commit touches either file between now and plan execution, the hashes will have changed. The STATE.md already notes this check as a pending todo.

---

## Q5: Blob-Hash Atomicity Mechanics

### Where the Baselines Live [VERIFIED: check-phase-63.mjs read]

Both `const BASELINE` values are local constants in `scripts/validation/check-phase-63.mjs`:

- **V-63-08** (macos-capability-matrix.md): line **209**
  ```javascript
  const BASELINE = '73f16378197223378a8507a6751c763902de58db';
  ```
- **V-63-09** (4-platform-capability-comparison.md): line **230**
  ```javascript
  const BASELINE = '2314ede7be54efbea1d4a4a787068310869a5896';
  ```

### Other Validators That Reference These Hashes

Grepped all files in `scripts/validation/` for both hashes. **Only `check-phase-63.mjs` contains them.** [VERIFIED: grep of scripts/validation/]

The files `macos-capability-matrix.md` and `4-platform-capability-comparison.md` are also referenced by name (not by hash) in:
- `check-phase-81.mjs` (edge references by file path, not hash)
- `check-phase-58.mjs`, `check-phase-60.mjs`, `check-phase-79.mjs` (by file path, not hash)
- `v1.5-`, `v1.6-`, `v1.7-`, `v1.8-`, `v1.9-`, `v1.10-milestone-audit.mjs` (by file path, not hash)

**No other script contains the two blob hash strings.** Only `check-phase-63.mjs` needs to be updated.

### Exact Edit Procedure [VERIFIED: check-phase-63.mjs mechanics + 85-01-PLAN.md]

For the macos-capability-matrix.md edit (V-63-08):

```
Step 1: Edit docs/reference/macos-capability-matrix.md (add the new row)
Step 2: git hash-object docs/reference/macos-capability-matrix.md
        → prints the new blob hash (40-char hex)
Step 3: Edit scripts/validation/check-phase-63.mjs line 209:
        replace the old hash with the new hash in the const BASELINE string
Step 4: git add docs/reference/macos-capability-matrix.md scripts/validation/check-phase-63.mjs
Step 5: git commit  (single commit — both files staged together)
```

For the 4-platform-capability-comparison.md edit (V-63-09):

```
Step 1: Edit docs/reference/4-platform-capability-comparison.md (add the new row)
Step 2: git hash-object docs/reference/4-platform-capability-comparison.md
Step 3: Edit scripts/validation/check-phase-63.mjs line 230:
        replace const BASELINE with the new hash
Step 4: git add docs/reference/4-platform-capability-comparison.md scripts/validation/check-phase-63.mjs
Step 5: git commit
```

**Per D-05 execution rule (LOCKED):** if both matrix files are edited in the same plan wave, BOTH can be combined into a single atomic commit:

```
Stage both content edits + compute both new hashes + update both const BASELINE lines
git add docs/reference/macos-capability-matrix.md \
        docs/reference/4-platform-capability-comparison.md \
        scripts/validation/check-phase-63.mjs
git commit
```

`check-phase-63.mjs` appears only once in the staged file list regardless of how many `const BASELINE` lines were updated within it.

**Verification command (run after commit, before moving on):**
```bash
node scripts/validation/check-phase-63.mjs
```
V-63-08 and V-63-09 must both show `PASS` (not SKIPPED, not FAIL).

### Current Matrix H2 Anchor Table (for Inventory Artifact)

From reading `docs/reference/macos-capability-matrix.md` (current HEAD):

```
Line 13:  ## Enrollment
Line 28:  ## Configuration
Line 42:  ## App Deployment
Line 55:  ## Compliance   (approx — exact line may vary slightly; executor must confirm)
Line 67:  ## Software Updates
Line 79:  ## Conditional Access
Line 88:  ## Key Gaps Summary
Line 100: ## Authentication
Line 116: ## See Also
Line 126: ## Version History  (table header row, not a heading)
```

H3 anchors: none (H2-only file) — confirmed by reading the full file.

**New row insert point:** Inside the `## Enrollment` table (lines 15–27), appended as the last data row before the blank line preceding `## Configuration`.

### Current 4-Platform H2 Anchor Table

From reading `docs/reference/4-platform-capability-comparison.md` (current HEAD):

```
## Enrollment
## Configuration
## App Deployment
## Compliance
## Software Updates
## Conditional Access
## Single Sign-On
## See Also
## Version History
```

**New row insert point:** Inside the `## Enrollment` table, appended as the last data row (after the "Windows 10 support / minimum OS" row, line 32).

---

## Q6: Reciprocal `_glossary.md` See-Also

### Finding

**The natural reciprocal anchor in `_glossary.md` is `### Tenant migration` → `#tenant-migration`.** [VERIFIED: _glossary.md read]

The heading in `_glossary.md` is exactly `### Tenant migration` (lowercase "migration"), which slugifies to `#tenant-migration`. This is the entry D-02 references: "Windows tenant-to-tenant migration is a wipe + hardware-hash re-import + device reset, NOT Autopilot Reset."

Current entry text:
> The process of moving Autopilot-registered devices from one Microsoft tenant to another. Requires deregistration from source tenant, hardware hash re-import to target tenant, and device reset (NOT Autopilot Reset). See [Tenant Migration](device-operations/04-tenant-migration.md).

### Reciprocal Additions Required

Per REF-01, `_glossary.md` gains a `> See also:` line pointing to the new macOS migration terms. The established pattern (Phase 59 D-15, confirmed in _glossary-macos.md Version History) is to append `> See also:` lines **inside** the existing `> **Windows equivalent:**` blockquote. However, `_glossary.md#tenant-migration` has no existing `> **Windows equivalent:**` blockquote — it is a bare prose entry.

For the Windows glossary, the reciprocal pattern is a `> See also:` appended to the existing entry's blockquote OR added as a new blockquote if none exists. Inspect `_glossary.md` for other entries that have gained `See also:` lines — the pattern there may be a standalone `> See also:` blockquote appended after the prose.

**Recommended addition to `_glossary.md#tenant-migration`:**

```markdown
### Tenant migration

The process of moving Autopilot-registered devices from one Microsoft tenant to another. Requires deregistration from source tenant, hardware hash re-import to target tenant, and device reset (NOT Autopilot Reset). See [Tenant Migration](device-operations/04-tenant-migration.md).

> See also: [MDM Migration](_glossary-macos.md#mdm-migration) (macOS — wipe-free in-place re-enrollment on macOS 26+, distinct from Windows tenant migration which requires a full device reset).
```

### Other Windows Glossary Entries That May Need See-Also

The question is whether other `_glossary.md` entries (beyond `#tenant-migration`) should gain a `> See also:` pointing to any of the 9 new macOS terms. Assessment:

- `#tenant-migration` → definitely gains a See Also to `#mdm-migration` and/or `#assign-device-management`
- No other Windows glossary entry has an obvious reciprocal relationship to the migration-specific terms (FileVault recovery key, Activation Lock bypass, ACME, profile-based enrollment, app-sso, Delete Device Record) — these are macOS-specific operations with no Windows parallel.

**Conclusion:** Only `_glossary.md#tenant-migration` requires a `> See also:` addition. [ASSUMED — planner may find additional entries if `_glossary.md` has SCEP/PKCS certificate entries that would cross-link to `#acme`]

---

## Architecture Patterns

### Glossary Entry Anatomy (from `_glossary-macos.md`)

Established pattern (every entry in the file follows this):

```markdown
### Term Name

[Body: 2-4 sentences. Definition + scope + key behavior + cross-link-not-copy.]

> **Windows equivalent:** [Positive or negative-callout form]
> See also: [Cross-platform links inside blockquote if applicable]
```

**Alphabetical Index (line 17):** Every new `###` term must be added to the pipe-separated index at line 17 in alpha sort order. Current index ends with `[VPP](#vpp)`. New terms to insert in alpha order:

Current index entries: `ABM`, `ABM Token`, `Account-Driven User Enrollment`, `ADE`, `APNs`, `Await Configuration`, `Enterprise SSO Plug-in`, `Jailbreak Detection`, `Kerberos SSO Extension`, `MAM-WE`, `Platform SSO`, `Secure Enclave`, `Setup Assistant`, `Supervision`, `VPP`

New entries to add (alpha-sorted into the list):
- `ACME` (before `ADE`)
- `Activation Lock Bypass` (before `ADE`)
- `app-sso` (before `APNs`) — lowercase "app" sorts before uppercase in typical alpha, but the existing index uses title case; planner should decide whether to list as `app-sso` or `App-SSO`
- `Assign Device Management` (before `Await Configuration`)
- `Deadline` (between `ADE` and `Enterprise SSO Plug-in`)  
- `Delete Device Record` (between `Deadline` and `Enterprise SSO Plug-in`)
- `FileVault Recovery Key` (between `Enterprise SSO Plug-in` and `Jailbreak Detection`)
- `Kandji-Iru` (between `Kerberos SSO Extension` and `MAM-WE`)
- `MDM Migration` (between `MAM-WE` and `Platform SSO`)
- `Profile-Based Enrollment` (between `Platform SSO` and `Secure Enclave`)

### H2 Placement for the 9 New Terms

Per D-01, no new `## Migration` H2 is added. All entries attach to existing H2s. Suggested placement by semantic fit:

| Term | Existing H2 | Rationale |
|------|-------------|-----------|
| MDM Migration | `## Device Management` | Migration is a device management lifecycle event |
| Assign Device Management | `## Device Management` | ABM action; belongs with ABM entry |
| Deadline | `## Device Management` | Part of the migration management flow |
| Kandji-Iru | `## Device Management` | Third-party MDM platform; peer of ABM |
| Delete Device Record | `## Device Management` | Source-MDM console action |
| FileVault Recovery Key | `## Device Management` | MDM-held device secret managed by source MDM |
| Activation Lock Bypass | `## Device Management` | MDM-held device secret; peer of FileVault recovery key |
| Profile-Based Enrollment | `## Enrollment` | Enrollment type — natural fit under Enrollment H2 |
| ACME | `## Enrollment` | Certificate issued during enrollment |
| app-sso | `## Authentication` | CLI tool for PSSO authentication state |

This placement is Claude's discretion (CONTEXT.md); the planner may adjust if the executor or reviewer finds a more natural grouping.

### Matrix Row Format (D-04)

From reading `docs/reference/macos-capability-matrix.md` existing `## Enrollment` table style:

```markdown
| macOS 26 in-place ABM migration | n/a | Supported (profile-based re-enrollment, wipe-free; PSSO re-registration always required post-migration; pre-macOS-26 devices use wipe-and-re-enroll fallback) — see [MDM Migration Walkthrough](../macos-lifecycle/02-mdm-migration-psso.md) |
```

The cell must stay single-line (no `<br>` — zero HTML precedent per D-04 rationale). The macOS cell carries all coverage facts. Windows cell = `n/a`.

### 4-Platform Row Format (D-05)

From reading existing 4-platform `## Enrollment` rows (e.g., line 32):

```markdown
| macOS 26 in-place ABM migration | n/a — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | n/a — [matrix](ios-capability-matrix.md#enrollment) | n/a — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
```

Windows column links to `linux-capability-matrix.md#enrollment` per the file's declared architecture (line 13: "Windows column links target the Windows column of `linux-capability-matrix.md`"). macOS cell = `Supported — [matrix](macos-capability-matrix.md#enrollment)`. All other cells = `n/a — [matrix]({platform}-capability-matrix.md#enrollment)`.

---

## Common Pitfalls

### Pitfall 1: `### Kandji / Iru` Produces Double-Hyphen Slug
**What goes wrong:** Heading `### Kandji / Iru` slugifies to `#kandji--iru` (double hyphen), permanently mismatching guide 02's `#kandji-iru`.
**Why it happens:** GitHub slug algorithm: space + slash + space → strip slash → two spaces → two hyphens.
**How to avoid:** Use `### Kandji-Iru` (bare dash, no slash) as the heading. Surface both names and rebrand in the body text, not the heading.
**Warning signs:** After commit, run `grep -n "kandji" docs/_glossary-macos.md` and verify the heading reads `Kandji-Iru` not `Kandji / Iru`.

### Pitfall 2: Splitting Matrix + Hash-Update Across Two Commits
**What goes wrong:** Editing `macos-capability-matrix.md` in commit A and updating `check-phase-63.mjs` V-63-08 in commit B creates a red HEAD at commit A (V-63-08 FAIL).
**Why it happens:** V-63-08 runs `git hash-object` at test time and compares to `const BASELINE`. The content commit changes the hash; the old BASELINE no longer matches.
**How to avoid:** Stage both files in the same `git add` and commit together. Never split.
**Warning signs:** `node scripts/validation/check-phase-63.mjs` shows V-63-08 FAIL between the two commits.

### Pitfall 3: `{#kandji-iru}` Syntax Mistaken as Supported
**What goes wrong:** Writing `### Kandji / Iru {#kandji-iru}` in the file, expecting the anchor override. The literal string `{#kandji-iru}` appears in the rendered heading and the slug is something like `#kandji--iru--kandji-iru`.
**Why it happens:** No docs-site generator is present; this is plain GitHub rendering where `{#...}` is not processed as an anchor override.
**How to avoid:** Use `### Kandji-Iru` bare heading. Confirmed by: no `{#` patterns anywhere in the corpus, no generator config files present.

### Pitfall 4: Forgetting `#app-sso` Requires Short Heading
**What goes wrong:** Using `### app-sso platform -s` as the heading (copying the CLI invocation from guide 02's table). This slugifies to `#app-sso-platform--s` (the ` -s` flag adds `-s` after a space, producing a double-hyphen before `s`).
**Why it happens:** Guide 02 line 549 uses the full command form in the table's Term column, but the anchor target is `#app-sso`.
**How to avoid:** Heading must be `### app-sso`; the `platform -s` subcommand is explained in the body.

### Pitfall 5: Inventory Committed After Matrix Edit
**What goes wrong:** Creating `91-ANCHOR-INVENTORY.md` in the same commit as the matrix edit, or after it. The pre-edit SHA and blob hash recorded in the artifact are then stale/incorrect.
**Why it happens:** Ordering confusion.
**How to avoid:** First task = create + commit `91-ANCHOR-INVENTORY.md`. Second task = matrix edit + hash bump (separate commit). This mirrors Plan 85-01 Task 1 / Task 2 structure.

---

## Code Examples

### Computing New Blob Hash After Content Edit
```bash
# After editing docs/reference/macos-capability-matrix.md:
git hash-object docs/reference/macos-capability-matrix.md
# Output: new 40-char hex hash — paste into check-phase-63.mjs line 209 const BASELINE
```

### Getting Pre-Edit SHA for Inventory Artifact
```bash
git log -1 --format='%h' -- docs/reference/macos-capability-matrix.md
git log -1 --format='%h' -- docs/reference/4-platform-capability-comparison.md
```

### Validating After Edit
```bash
node scripts/validation/check-phase-63.mjs
# V-63-08 and V-63-09 must both show PASS
```

### Verifying Slug of a Heading (Manual Check)
GitHub slug algorithm in pseudo-code:
```
slug = heading_text
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')   # strip everything except word chars, spaces, hyphens
  .replace(/\s+/g, '-')       # spaces → hyphens
  .replace(/-+/g, '-')        # collapse only if they were originally separate spaces
```
Wait — the `cobo--cope--wpco` precedent disproves collapsing. The actual GitHub algorithm does NOT collapse consecutive hyphens produced by stripping punctuation-between-spaces. The slash is stripped, leaving a space on each side, and each space becomes a hyphen: `/ ` → strip slash → ` ` is two adjacent spaces → `--`. Use this rule.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `FileVault Recovery Key` entry warrants a positive Windows-equivalent callout (BitLocker recovery key), not the negative-callout form from D-02 | Q3 #1 | Planner could use negative form instead; either is valid, but positive is more informative |
| A2 | `_glossary.md` See-Also addition to `#tenant-migration` is the only Windows glossary entry needing reciprocal links | Q6 | If `_glossary.md` has SCEP/PKCS entries that logically cross-link to `#acme`, those may also need additions |
| A3 | H2 placement suggestions (Device Management vs Enrollment vs Authentication for the 9 new terms) | Architecture Patterns | Planner has discretion; these are suggestions, not mandates |
| A4 | The 4-platform comparison's Windows cell links to `linux-capability-matrix.md#enrollment` following the file's established pattern | Q5 / Architecture Patterns | Read from file lines 23–32; LOW risk of being wrong, but executor should verify the row format on authoring day |

**If this table has 4 entries:** Three are low-risk style choices (A1, A3, A4). A2 is low-risk (executor will read `_glossary.md` fully during execution and can add more if needed).

---

## Environment Availability

Step 2.6: No external service dependencies. This phase is documentation editing + in-repo script editing only.

Required tools (confirmed available):
- `git hash-object` — used to compute blob hashes; confirmed available (git is present in the working environment — bash tool used successfully throughout this session)
- `node scripts/validation/check-phase-63.mjs` — used to validate; confirmed available (Node.js present per existing validator usage in prior phases)

---

## Validation Architecture

Per `.planning/config.json` — nyquist_validation not explicitly false; treating as enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | check-phase-63.mjs (custom Node.js validator) |
| Config file | none — self-contained |
| Quick run command | `node scripts/validation/check-phase-63.mjs` |
| Full suite command | `node scripts/validation/check-phase-63.mjs` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| REF-02 | macos-capability-matrix.md blob hash matches updated V-63-08 BASELINE | unit (blob hash) | `node scripts/validation/check-phase-63.mjs` | V-63-08 must show PASS |
| REF-02 | 4-platform-capability-comparison.md blob hash matches updated V-63-09 BASELINE | unit (blob hash) | `node scripts/validation/check-phase-63.mjs` | V-63-09 must show PASS |
| REF-01 | All 9 minted glossary headings slugify to the committed link targets | manual slug verification | Manual heading-text inspection per Q2 table | No automated anchor-check tool exists; manual verify is the process |
| REF-01 | Alphabetical Index updated with all new terms | content check | `grep -n "\[ACME\]" docs/_glossary-macos.md` (one per new term) | Executor checks post-edit |

### Wave 0 Gaps
None — existing test infrastructure covers REF-02. REF-01 anchor validation is manual per Q2 table.

---

## Security Domain

This phase is documentation-only: no code execution paths, no auth, no data storage, no user input processing. ASVS categories do not apply.

---

## Sources

### Primary (HIGH confidence)
- `docs/_glossary-macos.md` — entry anatomy, existing H2 structure, alphabetical index format, Version History pattern, confirmed by file read
- `docs/macos-lifecycle/02-mdm-migration-psso.md` lines 148, 165, 320, 331, 406–416, 541–550 — term definitions and guide-02 usage context
- `scripts/validation/check-phase-63.mjs` lines 202–242 — V-63-08 and V-63-09 exact line numbers and const BASELINE structure
- `docs/reference/macos-capability-matrix.md` — current H2 anchor list, table format, Version History
- `docs/reference/4-platform-capability-comparison.md` — Enrollment table format, cell link pattern, non-macOS cell format
- `.planning/milestones/v1.10-phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md` — exact artifact format to replicate
- `.planning/milestones/v1.6-phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md` — canonical format origin
- `docs/_glossary-android.md` + `docs/_glossary-linux.md` — `COBO / COPE / WPCO` → `#cobo--cope--wpco` slug precedent (confirmed by file read)
- `docs/_glossary.md#tenant-migration` — confirmed heading text and entry content for reciprocal see-also
- Filesystem grep: zero `{#` patterns in corpus confirms no `{#id}` override usage

### Secondary (MEDIUM confidence)
- `.planning/milestones/v1.10-phases/85-capability-matrix-l2-runbooks/85-01-PLAN.md` — Task 1/Task 2 commit-ordering precedent for anchor inventory

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Anchor support (Q1): HIGH — direct filesystem evidence (no generator, no `{#` usage)
- Slug table (Q2): HIGH — derived from in-corpus precedent (`COBO / COPE / WPCO`)
- Term definitions (Q3): HIGH — direct quote and paraphrase from guide-02 file read
- Artifact format (Q4): HIGH — direct read of 85-ANCHOR-INVENTORY.md and 63-ANCHOR-INVENTORY.md
- Blob-hash mechanics (Q5): HIGH — direct read of check-phase-63.mjs lines 202–242; git hash-object confirmed
- Reciprocal see-also (Q6): HIGH (tenant-migration anchor) / ASSUMED (completeness of other entries)

**Research date:** 2026-06-24
**Valid until:** 2026-09-24 (90 days; stable documentation-format domain)
