# Phase 78: Legacy SSO Plug-in & Migration Guide - Pattern Map

**Mapped:** 2026-06-21
**Files analyzed:** 3 (1 CREATE, 2 EDIT)
**Analogs found:** 3 / 3

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` | reference doc (A3 hybrid) | decision-reference | `docs/admin-setup-macos/08-auth-methods-deep-dive.md` + `docs/admin-setup-macos/07-platform-sso-setup.md` | exact (same corpus, same tail shape, same callout syntax) |
| `docs/admin-setup-macos/08-auth-methods-deep-dive.md` | nav-wiring edit | atomic code-span→live-link | `.planning/phases/77-auth-methods-deep-dive/77-01-PLAN.md` (D-02 precedent) | exact |
| `docs/admin-setup-macos/00-overview.md` | nav-wiring edit | atomic code-span→live-link | Phase-77 D-02 conversion of line 47 (same file, prior phase) | exact |

---

## Pattern Assignments

### `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` (CREATE — A3 hybrid reference)

**Primary analog:** `docs/admin-setup-macos/08-auth-methods-deep-dive.md`
**Secondary analog:** `docs/admin-setup-macos/07-platform-sso-setup.md`

---

#### Front-Matter Pattern

Copy from `08-auth-methods-deep-dive.md` lines 1–11:

```yaml
---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS Enterprise SSO plug-in migration to Platform SSO.
> For the Platform SSO setup walk-through, see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).
```

Rules:
- Five front-matter keys exactly: `last_verified`, `review_by`, `applies_to`, `audience`, `platform`.
- `review_by` = 90 days after `last_verified` (DS-2 cadence).
- The blockquote platform-gate follows immediately after the closing `---`, before the H1.
- Platform gate links live targets only (07 exists, glossary exists).

---

#### Known Silent Blockers / Pre-Migration Prerequisite Callout Pattern (D-06)

Structural precedent: `07-platform-sso-setup.md` lines 25–36 (placed BEFORE `## Steps`).

```markdown
### Known Silent Blockers — Resolve Before Deployment

> **Before You Deploy — Resolve These First:**
>
> The following issues cause Platform SSO registration to fail silently — no error is displayed,
> and the registration flow simply stalls or is blocked. Resolve all three before configuring the
> Settings Catalog policy.
>
> - **Remove legacy per-user MFA (DF-3):** ...
>
> - **Exclude newly-enrolled devices from strict CA "require compliant device" gating ... (DF-9):** ...
>
> - **Exempt PSSO / Microsoft login endpoints from TLS break-and-inspect (DF-10):** ...
```

For guide 09, the up-front D-06 prerequisite callout replicates this pattern but delivers the
compliance-script swap warning. Place BEFORE the migration sequence section (body section 3).
Title signals the specific danger:

```markdown
> **Before You Migrate — Update Compliance Scripts First:**
>
> From approximately August 2025, new Entra device registrations store the WPJ key in the
> Secure Enclave rather than the Login Keychain. `security find-certificate` returns false
> negatives for all PSSO-enrolled devices. Update compliance scripts to use
> `app-sso platform -s | grep "Device Registration"` BEFORE starting migration — false
> negatives during a successful migration look identical to a failed migration and may
> trigger an unnecessary rollback.
>
> _Section provenance — `last_verified: 2026-06-21` / `review_by: 2026-09-21`. VR-3:
> WPJ storage migration date sourced from Jamf Community + Microsoft apple-sso-plugin doc
> (updated 2026-06-15); re-verify at each 90-day review._
```

Rule: The `security find-certificate` → `app-sso platform -s` swap command is stated ONCE
canonically here; the `## Rollback` section cross-references this prerequisite callout by
anchor — it does NOT restate the command (D-06a link-not-copy).

---

#### Hard-Bordered Callout Syntax

Source: `07-platform-sso-setup.md` lines 27–35 and `08-auth-methods-deep-dive.md` lines 70–83,
89–106, 125–137.

Single-paragraph callout (guide-07 style):
```markdown
> **[Title — Signals Severity]:**
>
> [Body text.]
```

Multi-sub-item callout (guide-07 Known Silent Blockers style):
```markdown
> **[Title]:**
>
> [Intro sentence.]
>
> - **[Sub-item A]:** [Detail.]
>
> - **[Sub-item B]:** [Detail.]
>
> - **[Sub-item C]:** [Detail.]
```

For the D-05 mandatory rollback callout, all three SC3 elements appear inside ONE callout:
```markdown
> **Destructive Action — Rollback Removes the Secure Enclave WPJ Key:**
>
> - **WPJ key removal is destructive:** When the PSSO policy is removed, the Secure Enclave
>   WPJ key created during PSSO enrollment is removed. This cannot be undone without
>   re-enrolling in PSSO.
>
> - **CA-blocked-until-re-registered impact window:** After rollback, affected users have
>   no Entra device registration and cannot satisfy device-based Conditional Access until
>   they open Company Portal and complete a fresh legacy WPJ registration manually. This
>   is an active service outage for any user under device-based CA policies.
>
> - **Compliance-script swap:** See the [Before You Migrate](#before-you-migrate--update-compliance-scripts-first)
>   prerequisite callout above — `security find-certificate` returns false negatives; use
>   `app-sso platform -s` instead. Update scripts before starting rollback, not only
>   before migration.
```

Rule: Third bullet cross-references the D-06 prerequisite callout anchor; does NOT restate
the swap command.

---

#### DS-2 Section-Level Provenance Annotation Pattern

Source: `08-auth-methods-deep-dive.md` lines 109, 185, 254.

```markdown
> _Section provenance — `last_verified: 2026-06-21` / `review_by: 2026-09-21`. [Reason for
> annotation and what to re-verify.]_
```

Apply to: VR-3 compliance-script callout (MEDIUM confidence), what-breaks section (Chrome
native-messaging host, macOS-version gates, Company Portal version floors).

The `>` prefix is used when the annotation is INSIDE a callout blockquote (as seen in guide
07 line 154 and guide 08 line 109). Bare `_..._` is used for section-level annotations that
stand alone (guide 08 lines 185, 254).

---

#### Config-Caused-Failures Table Pattern

Source: `08-auth-methods-deep-dive.md` lines 311–316 (four-column shape, `--` for no-runbook cells).

```markdown
## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Legacy SSO app extension profile still assigned alongside Platform SSO Settings Catalog policy | Intune | Error 10002; both SSO profiles stop working; PSSO registration suppressed | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| PSSO profile assigned to macOS 12 or earlier devices without legacy profile retained | Intune | PSSO registration silently fails; no error displayed; users have no SSO | -- |
| Chrome native-messaging host JSON missing after Company Portal installation | Device | Chrome loses SSO after PSSO migration; other browsers and apps unaffected | -- |
| PSSO rolled back without completing legacy WPJ re-registration | Intune / Device | Users CA-blocked; cannot satisfy device-based CA policies until Company Portal WPJ registration completed | -- |
```

Rules:
- Four columns: `Misconfiguration | Portal | Symptom | Runbook` — match guide 08 exactly.
- No-runbook cells: `--` (double hyphen, NOT em-dash `—`). Guide 08 uses `--`; guide 09 follows guide 08 as the more recent exemplar.
- Phase-80 runbook filenames are CODE-SPANS (`` `35-macos-sso-sign-in-failure.md` ``), NOT live links — guide 80 is not yet authored; C13 mechanism requires code-spans for not-yet-authored internal targets.
- Guide 07 (line 138) uses em-dash `—` for the no-runbook cell. Guide 08 and guide 09 both use `--`. Follow guide 08.

---

#### See Also Section Pattern

Source: `08-auth-methods-deep-dive.md` lines 320–327 and `07-platform-sso-setup.md` lines 140–146.

```markdown
## See Also

- [Platform SSO Setup](07-platform-sso-setup.md) -- Settings Catalog policy creation, prerequisites, and verification
- [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) -- Authentication method selection and deep-dive
- [Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)
- [Platform SSO](../_glossary-macos.md#platform-sso)
- [Secure Enclave](../_glossary-macos.md#secure-enclave)
```

Rules for guide 09 (D-07a):
- MUST include: guide 07 (live link — exists), guide 08 (live link — exists), and three
  glossary anchors: `#enterprise-sso-plug-in` (verified at `_glossary-macos.md:136`),
  `#platform-sso` (line 123), `#secure-enclave` (line 130).
- Phase-80 runbook links: code-spans only, NOT live links.
- Separator `---` before Version-History table (matches all three sibling guides).

---

#### Version-History Table Pattern

Source: `08-auth-methods-deep-dive.md` lines 331–333, `07-platform-sso-setup.md` lines 196–198,
`00-overview.md` lines 67–71, `02-enrollment-profile.md` lines 137–140.

```markdown
---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Phase 78 (SSOMIG-01..04): initial Enterprise SSO plug-in migration guide | -- |
```

Rules:
- Three columns exactly: `Date | Change | Author`.
- Author field is always `--` (double hyphen). Verified across all four sibling files; never
  em-dash, never a name.
- Preceded by a `---` horizontal rule.
- Change description format: `Phase NN (REQ-ID..REQ-ID): description` — matches guides 07/08.
- Multiple rows are newest-first in `02-enrollment-profile.md` (two rows). Guide 09 starts
  with one row.

---

### `docs/admin-setup-macos/08-auth-methods-deep-dive.md` (EDIT — line 327 code-span → live link)

**Analog:** Phase-77 D-02 conversion of `00-overview.md:47` (same atomic-landing mechanism).

**Current line 327** (verified by direct read above):
```
- Legacy Enterprise SSO plug-in and migration guide: `09-enterprise-sso-plugin-migration.md` (Phase 78 -- not yet authored)
```

**Target line 327:**
```markdown
- [Legacy Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md)
```

Rules:
- Body-level edit only — touch no headings in this file.
- Remove the parenthetical `(Phase 78 -- not yet authored)` annotation — the link is live.
- Link text at planner/executor discretion; must clearly identify the guide-09 purpose.
- Also append one new Version-History row at the bottom of the `| Date | Change | Author |`
  table (currently at lines 331–333):

```markdown
| 2026-06-21 | Phase 78: converted guide-09 code-span to live link in ## See Also | -- |
```

**Verify command** (from RESEARCH.md `Code Examples` section):
```bash
grep -q "\[.*09-enterprise-sso-plugin-migration\.md\]" docs/admin-setup-macos/08-auth-methods-deep-dive.md \
  && ! grep -q '`09-enterprise-sso-plugin-migration\.md`' docs/admin-setup-macos/08-auth-methods-deep-dive.md \
  && echo "GUIDE08NAV_OK"
```

---

### `docs/admin-setup-macos/00-overview.md` (EDIT — line 49 code-span → live link)

**Analog:** Phase-77 conversion of line 47 in this same file (live link to guide 08 with description).

**Current line 49** (verified by direct read above):
```
9. `09-enterprise-sso-plugin-migration.md` (added in a later documentation phase)
```

**Target line 49:**
```markdown
9. **[Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md)** -- [description matching guide 09's actual H1 title and purpose]
```

Model from line 48 (guide 08 entry, same file — the direct structural precedent):
```
8. **[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)** -- Selection guide and deep-dive reference for all three Platform SSO authentication methods ...
```

Rules:
- Body-level edit only — touch no headings. The Mermaid diagram at lines 19–31 already shows
  node `I` as `[9. Enterprise SSO<br/>Migration]` — this is already correct; NO Mermaid edit
  needed (D-08a: verified by direct read, lines 19–31).
- The description text must be consistent with guide 09's actual H1. Executor reads guide 09's
  H1 after authoring it and uses that wording here.
- Also append one new Version-History row:

```markdown
| 2026-06-21 | Phase 78: converted guide-09 code-span to live link with description | -- |
```

**Verify command** (from RESEARCH.md `Code Examples` section):
```bash
grep -q "\[.*09-enterprise-sso-plugin-migration\.md\]" docs/admin-setup-macos/00-overview.md \
  && ! grep -qE '^9\. `09-enterprise-sso-plugin-migration\.md`' docs/admin-setup-macos/00-overview.md \
  && echo "OVERVIEW09_OK"
```

---

## Shared Patterns

### Atomic Commit Requirement (C13 Gate)

**Source:** `scripts/validation/v1.8-milestone-audit.mjs` (verified lines 659–679) +
`.planning/phases/77-auth-methods-deep-dive/77-01-PLAN.md` lines 234–236.

**Apply to:** All three files — they MUST land in ONE commit.

**Verification command:**
```bash
node scripts/validation/v1.8-milestone-audit.mjs
```
Expected: 15/15 checks pass. The C13 output line when passing:
```
{ pass: true, detail: '15-entry broken-link allowlist (6 transient_external + 9 template_placeholder) honored; full mlc sweep deferred to CI' }
```

**Atomic-commit file check** (from 77-01-PLAN.md line 235):
```bash
git diff HEAD --name-only
```
Must show all three changed files together in one commit:
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md`
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md`
- `docs/admin-setup-macos/00-overview.md`

**Why:** The C13 allowlist (15 entries: 6 `transient_external` + 9 `template_placeholder`)
does NOT include a category for "not-yet-authored internal doc." Any live link to
`09-enterprise-sso-plugin-migration.md` in a commit where that file does not exist will fail
C13. No allowlist surgery needed — just land target and links atomically.

---

### Link-not-Copy Pattern (D-03a / D-06a)

**Source:** 77-CONTEXT.md D-02/D-03 pattern + 78-CONTEXT.md D-06a; visible in
`08-auth-methods-deep-dive.md` throughout (cross-references FileVault section rather than
restating it).

**Apply to:** Three specific duplication-risk sites in guide 09:

1. **Decision matrix → guide 08:** The matrix must link to guide 08 for auth-method selection.
   Do NOT add `Passwordless | Phishing-resistant | Hardware | macOS-version` capability columns
   — those are guide 08's canonical four-dimension table. Matrix column value example:
   `Migrate to Platform SSO — see [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) for method selection.`

2. **Rollback section → D-06 prerequisite callout:** The `## Rollback` section cross-references
   the compliance-script prerequisite callout by anchor. Does NOT restate the
   `security find-certificate` → `app-sso platform -s` swap command.

3. **Config-Caused-Failures table → migration sequence:** Error 10002 row references the
   migration-sequence section for explanation; does NOT re-explain the dual-profile mechanism.

---

### Anchor-Stability Rule (Edited Files Only)

**Source:** 78-CONTEXT.md D-01a / RESEARCH.md Anchor Stability section.

**Apply to:** `08-auth-methods-deep-dive.md` and `00-overview.md` (the two EDIT targets).

- Make body-level changes only. Touch no headings in either file.
- Guide 09 is a NEW file — no internal anchor-stability constraint; heading names are at
  executor discretion within SC1–SC4 constraints.

---

### Code-Span vs Live-Link Rule for Not-Yet-Authored Targets

**Source:** C13 gate mechanics (RESEARCH.md `Mechanical Constraints` section); verified in
guide 08 lines 313, 315 and guide 07 lines 135, 136.

**Apply to:** Any reference to Phase-80 runbooks inside guide 09.

- Phase-80 runbook filenames (`35-macos-sso-sign-in-failure.md`, `36-macos-se-key-verification.md`)
  appear as CODE-SPANS (`` `35-macos-sso-sign-in-failure.md` ``), NOT live markdown links.
- Same pattern already in use in guide 08's C-C-F table (lines 313, 315) and guide 07 (lines 135–136).
- Glossary anchors that already exist (Phase 75): live links — verified present.
- Guide 07 and guide 08: live links — both files exist.

---

## No Analog Found

None. All three files have direct analogs in the existing corpus.

---

## Metadata

**Analog search scope:** `docs/admin-setup-macos/` (all sibling guides read)
**Files scanned:** `07-platform-sso-setup.md`, `08-auth-methods-deep-dive.md`,
  `02-enrollment-profile.md`, `00-overview.md`, `.planning/phases/77-auth-methods-deep-dive/77-01-PLAN.md`
**Pattern extraction date:** 2026-06-21

**Key verified facts (from direct corpus inspection):**
- `00-overview.md:49` current content: `` 9. `09-enterprise-sso-plugin-migration.md` (added in a later documentation phase) ``
- `08-auth-methods-deep-dive.md:327` current content: `` - Legacy Enterprise SSO plug-in and migration guide: `09-enterprise-sso-plugin-migration.md` (Phase 78 -- not yet authored) ``
- `00-overview.md` Mermaid node `I` (lines 19–31): already reads `[9. Enterprise SSO<br/>Migration]` — no Mermaid edit needed
- `00-overview.md` Version-History (lines 67–71): three rows, newest-last ordering (Phase 77 row at line 71)
- `08-auth-methods-deep-dive.md` Version-History (lines 331–333): one row, `--` Author field
- `07-platform-sso-setup.md` Version-History (lines 196–198): one row, `--` Author field
- `02-enrollment-profile.md` Version-History (lines 137–140): two rows, newest-first ordering
- Config-Caused-Failures table: guide 07 uses `—` (em-dash); guide 08 uses `--` (double hyphen) — guide 09 follows guide 08 (`--`)
- Glossary anchors verified present: `_glossary-macos.md#enterprise-sso-plug-in` (line 136), `#platform-sso` (line 123), `#secure-enclave` (line 130)
