# Phase 92: Navigation Hub Integration - Pattern Map

**Mapped:** 2026-06-25
**Files analyzed:** 4 nav-hub files (modified); 0 new files created
**Analogs found:** 4 / 4 (all within-file — each file contains its own analog row/block/entry)

---

## File Classification

| Modified File | Addition Role | Data Flow | Closest Analog (within-file) | Match Quality |
|---------------|---------------|-----------|------------------------------|---------------|
| `docs/index.md` | nav table rows (L1 + L2) | request-response (nav hub → content) | Existing `00-ade-lifecycle.md` rows at lines 106 (L1) and 116 (L2) | exact |
| `docs/common-issues.md` | symptom-index entries (`###` subsections) | request-response (symptom → runbook) | `### Kerberos SSO Extension Failure` block at lines 220–225 | exact |
| `docs/quick-ref-l2.md` | `####` diagnostic block + runbook bullet | request-response (quick-ref → commands/runbook) | `#### Platform SSO Attestation Command` (lines 180–188) + `#### Kerberos SSO Diagnostics` (lines 190–198) + runbook bullet format (lines 202–207) | exact |
| `docs/decision-trees/06-macos-triage.md` | mermaid escalate leaf + prose amendments | event-driven (triage routing) | `MACE2` Kerberos escalate leaf (lines 46, 56, 62) + Routing Verification row format (lines 79–80) + Version History row format (lines 108–110) | exact |

---

## Pattern Assignments

### `docs/index.md` — nav table rows (D-01)

**Analog:** The `00-ade-lifecycle.md` rows (lines 106 and 116) — these are the only role-neutral lifecycle walkthrough rows in the macOS tables and are the direct precedent for adding `01` and `02` to both the L1 and L2 tables.

**Exact analog rows to clone format from:**

L1 table analog (line 106):
```markdown
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | Understand the 7-stage macOS enrollment pipeline from ABM registration through desktop |
```

L2 table analog (line 116):
```markdown
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | End-to-end enrollment stages with behind-the-scenes technical detail |
```

**L2 runbook-row analog** (lines 121–125 — nearest runbook-link rows to copy label style from):
```markdown
| [macOS Platform SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | PSSO registration failure or Password-sync failure investigation (runbook #27) |
| [macOS Kerberos SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure (runbook #28) |
| [macOS Graph Credential Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission errors (runbook #29) |
```

**Insertion points:**
- L1 table: append after line 110 (after the last L1 row, before blank line 111)
- L2 table: append after line 125 (after the last L2 row `macOS Graph Credential Investigation`, before blank line 126)
- Admin Setup table (line 127+): NOT modified per D-01

**New rows to add — copy `| [Label](path) | When to Use |` format exactly:**

L1 append (after line 110):
```markdown
| [macOS PSSO Provisioning Walkthrough](macos-lifecycle/01-psso-provisioning-walkthrough.md) | Walk through a Mac from enrollment to PSSO-registered end user — both standard post-enrollment (A1) and ADE-during-Setup-Assistant macOS 26+ (A2) paths |
| [macOS MDM Migration Walkthrough (Kandji/Iru → Intune)](macos-lifecycle/02-mdm-migration-psso.md) | Walk through B1 wipe-free in-place migration (macOS 26+) or B2 wipe-and-re-enroll (macOS 25 or earlier) from Kandji/Iru to Intune |
```

L2 append (after line 125):
```markdown
| [macOS PSSO Provisioning Walkthrough](macos-lifecycle/01-psso-provisioning-walkthrough.md) | Walk through a Mac from enrollment to PSSO-registered end user — both standard post-enrollment (A1) and ADE-during-Setup-Assistant macOS 26+ (A2) paths |
| [macOS MDM Migration Walkthrough (Kandji/Iru → Intune)](macos-lifecycle/02-mdm-migration-psso.md) | Walk through B1 wipe-free in-place migration (macOS 26+) or B2 wipe-and-re-enroll (macOS 25 or earlier) from Kandji/Iru to Intune |
| [macOS MDM Migration Failure Runbook](l2-runbooks/30-macos-mdm-migration-failure.md) | Investigate migration failures — Track A: deadline lockout (non-dismissible full-screen prompt, ABM admin recovery), Track B: profile-not-delivered / enrollment-failed (leftover Kandji/Iru agent), Track C: PSSO re-registration stuck |
```

**Anti-rename rule:** Do NOT modify the existing `00-ade-lifecycle.md` rows at lines 106 or 116. They are the placement precedent, not edit targets.

---

### `docs/common-issues.md` — symptom-index entries (D-02)

**Analog:** `### Kerberos SSO Extension Failure` block at lines 220–225 — verbatim template for the `###` heading + symptom sentence + `**L1:** No L1 runbook — escalate to L2` line + `**L2:**` bullet format.

**Exact analog block to replicate structure from (lines 220–225):**
```markdown
### Kerberos SSO Extension Failure

Kerberos TGT not acquired, realm or KDC unreachable, or `usePlatformSSOTGT` PSSO-TGT integration failing.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md)
```

**Insertion point:** Append after line 225 (after the Kerberos `**L2:**` link), before the blank line 226 and `## iOS/iPadOS Failure Scenarios` at line 227.

**Two new blocks to insert (copy `###` + symptom-sentence + bullet format exactly from analog):**
```markdown

### MDM Migration Failure (Kandji/Iru → Intune)

Device stuck on a non-dismissible full-screen migration prompt at or after the ABM deadline, or migration completed but Intune shows the device as not enrolled, or configuration profiles are not delivered.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md)

### Platform SSO Re-Registration Failure (Post-Migration)

Platform SSO "Registration Required" notification has not appeared after MDM migration, or registration was initiated but is not completing. PSSO re-registration is always required after MDM migration — MDM unenrollment = IdP unregistration; the Secure Enclave key is re-created on re-enrollment.

- **L2:** [macOS Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)
- **L2:** [macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md) — Track C: PSSO re-registration stuck
```

**Verbatim constraint:** The `**L1:** No L1 runbook — escalate to L2` line (line 224) must be copied character-for-character into the first new block. No paraphrase.

**No-assert constraint:** The second block must NOT claim same-tenant Secure Enclave key survival. The phrase "always required" is the authoritative wording.

**Boundary check:** Verify `## iOS/iPadOS Failure Scenarios` is at line 227 before inserting. Both new blocks go inside the `## macOS ADE Failure Scenarios` section (opened at line 157).

**Name-collision guard:** The `(Kandji/Iru → Intune)` qualifier distinguishes the new heading from the Windows `### Migration Issues` at line 138. No additional disambiguation needed.

---

### `docs/quick-ref-l2.md` — `####` diagnostic block + runbook bullet (D-03)

**Analog 1 — `####` block structure:** `#### Platform SSO Attestation Command` (lines 180–188) and `#### Kerberos SSO Diagnostics` (lines 190–198) — both are `####` siblings under the macOS H2; copy heading level, intro sentence, `bash` code block, and cross-reference prose format exactly.

**Exact analog blocks to replicate structure from:**

`#### Platform SSO Attestation Command` (lines 180–188):
```markdown
#### Platform SSO Attestation Command

Verify PSSO registration state -- run on the affected Mac:

```bash
app-sso platform -s
```

Expected healthy output includes both `Device Registration: REGISTERED` and `User Registration: REGISTERED` with SSO tokens listed. See [07-platform-sso-setup.md — Verification](admin-setup-macos/07-platform-sso-setup.md) for the full expected output format.
```

`#### Kerberos SSO Diagnostics` (lines 190–198):
```markdown
#### Kerberos SSO Diagnostics

Verify Kerberos ticket cache -- run on the affected Mac:

```bash
klist
```

Healthy output shows a TGT with a future expiry for the configured realm. An empty cache or "No credentials cache found" indicates TGT acquisition failure. For PSSO-TGT integration context (`tgt_ad` on-prem vs `tgt_cloud` Entra), see the [Platform SSO Attestation Command](#platform-sso-attestation-command) block above.
```

**Analog 2 — runbook bullet format:** Lines 202–207 (the six existing bullets in `### macOS Investigation Runbooks`):
```markdown
- [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) -- prerequisite for all macOS investigations
- [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)
- [App Install Failure Diagnosis](l2-runbooks/12-macos-app-install.md)
- [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md)
- [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) -- PSSO registration failure and Password-sync failure investigation
- [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md) -- Kerberos TGT not acquired, realm/KDC reachability, and PSSO-TGT integration investigation
```

**Insertion point 1 (new `####` block):** Insert after line 198 (after the Kerberos SSO Diagnostics prose), before the blank line 199 and `### macOS Investigation Runbooks` at line 200.

**New `####` block to insert:**
```markdown

#### MDM Migration Diagnostics

Diagnose Kandji/Iru → Intune migration failures on the affected Mac:

```bash
# Check if Kandji (Iru) agent directory is still present (Track B root cause)
ls /Library/Kandji/

# Verify macOS version meets the macOS 26+ gate for B1 in-place migration
sw_vers -productVersion
```

For enrollment status, cross-reference:
- [`profiles status -type enrollment`](#key-terminal-commands) — already in Key Terminal Commands above; checks MDM enrollment state and stale Kandji/Iru MDM certificates
- [`app-sso platform -s`](#platform-sso-attestation-command) — already in Platform SSO Attestation Command above; verifies PSSO re-registration state post-migration

See [L2 #30 macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md) for Track A/B/C investigation steps.
```

**Insertion point 2 (runbook bullet):** Append after line 207 (after the last existing runbook bullet `Kerberos SSO Investigation`), before blank line 208.

**New runbook bullet to append:**
```markdown
- [macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md) -- Track A: deadline lockout, Track B: profile-not-delivered / enrollment-failed, Track C: PSSO re-registration stuck
```

**Link-not-copy constraint:** Do NOT restate `app-sso platform -s` or `profiles status -type enrollment` in code blocks. Cross-reference by anchor only. Do NOT add `profiles list` — `profiles show` exists at line 152.

**Internal anchor reference:** `#platform-sso-attestation-command` resolves from the plain-GitHub slug of `#### Platform SSO Attestation Command` at line 180. `#key-terminal-commands` resolves from `### Key Terminal Commands` at line 146. Both are confirmed in-file headings.

---

### `docs/decision-trees/06-macos-triage.md` — mermaid escalate leaf + prose amendments (D-04)

**Analog — MACE2 escalate leaf pattern (lines 46, 56, 62):**

Node declaration (line 46):
```
    MACSSO -->|"Kerberos TGT<br/>not acquired"| MACE2(["Escalate to L2:<br/>Kerberos SSO Investigation"])
```

Click directive (line 56):
```
    click MACE2 "../l2-runbooks/28-macos-kerberos-sso-investigation.md"
```

Class registration (line 62):
```
    class MACE1,MACE2 escalateL2
```

**Analog — Routing Verification `→` Step-2 convention (lines 79–80):**
```markdown
| Platform SSO — Secure Enclave key error | Setup Assistant? Yes | Symptom: Platform SSO → key error | Runbook 36 |
| Kerberos SSO — TGT not acquired | Setup Assistant? Yes | Symptom: Platform SSO → Kerberos TGT | L2 escalation (#28) |
```

**Analog — Version History row format (lines 108–110):**
```markdown
| 2026-06-24 | Phase 87 (REF-03): added Kerberos SSO third arm under MACSSO (MACE2 → L2 #28) + 1 Routing Verification row | -- |
| 2026-04-14 | Initial version | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): added Platform SSO sub-decision leaf (MACSSO -> #35/#36) + 2 Routing Verification rows | -- |
```

**Three sub-edits required (D-04 mandatory — all in same atomic commit):**

**Sub-edit A — Insert MAC3 branch + MACE3 node after line 46** (before blank line 47, after the last MACSSO arm):
```
    MAC3 -->|"MDM migration /<br/>non-dismissible<br/>migration prompt"| MACE3(["Escalate to L2:<br/>MDM Migration Failure"])
```

**Sub-edit B — Insert click directive after line 56** (after the last existing `click MACE2` directive, before blank line 57):
```
    click MACE3 "../l2-runbooks/30-macos-mdm-migration-failure.md"
```

**Sub-edit C — Amend `class … escalateL2` line (line 62):** change:
```
    class MACE1,MACE2 escalateL2
```
to:
```
    class MACE1,MACE2,MACE3 escalateL2
```

**MAC1 "How to Check" amendment (line 86) — MANDATORY (sleeper flaw 4.2):**

Current cell text (line 86):
```
Ask the user: "Are you at the macOS desktop with a Finder menu bar?" If yes, Setup Assistant completed. If the device shows the Apple logo, a spinning globe, the Remote Management screen ("Your Mac is being configured"), or any Setup Assistant welcome/sign-in screen, it did not complete.
```

Amended cell text (append exception clause to the existing sentence):
```
Ask the user: "Are you at the macOS desktop with a Finder menu bar?" If yes, Setup Assistant completed. If the device shows the Apple logo, a spinning globe, the Remote Management screen ("Your Mac is being configured"), or any Setup Assistant welcome/sign-in screen, it did not complete. **Exception:** A device showing a full-screen Kandji/Iru → Intune MDM migration deadline prompt is NOT in OOBE — it is in migration deadline enforcement and routes as MAC1 = Yes → MDM migration leaf (MACE3).
```

**Routing Verification table — append after line 80** (after the Kerberos row, the 10th current row):
```markdown
| MDM migration — deadline prompt | Setup Assistant? Yes | Symptom: MDM migration / non-dismissible migration prompt | L2 escalation (#30) |
```

Note: No `→` Step-2 expression needed here. MACE3 has no sub-decision node — it is a direct edge from MAC3 to terminal (2 edges from root; within the ≤3-edge invariant). The Step-2 column carries a direct symptom label.

**Version History table — prepend as new top data row** (after the header row, before the current 2026-06-24 row at line 108):
```markdown
| 2026-06-25 | Phase 92 (NAV-01): added MDM migration leaf (MACE3 → L2 #30) off MAC3; MAC1 "How to Check" disambiguation note for deadline-lockout routing; 1 Routing Verification row | -- |
```

---

## Shared Patterns

### Link-not-copy (applies to all four files)

**Source pattern established in:** Phase 90 CONTEXT.md (link-not-copy ethos); reinforced by D-03 (3A) decision.
**Apply to:** quick-ref-l2.md new `####` block; all nav-table rows; all `**L2:**` bullets in common-issues.md.
**Rule:** Hub edits link to content files; they never duplicate content from those files. The quick-ref block cross-references the existing `app-sso platform -s` and `profiles status -type enrollment` commands by anchor (`#platform-sso-attestation-command`, `#key-terminal-commands`) rather than restating the command text.

### Both-names label convention (applies to index.md + common-issues.md)

**Source:** D-01 execution rule: "Labels surface both Kandji + Iru."
**Apply to:** Every link label that references the source MDM vendor (index.md rows, common-issues.md `###` headings, quick-ref bullet, triage tree branch label).
**Pattern:** Use `Kandji/Iru → Intune` (slash separator, right arrow, no spaces around slash). Do NOT use "Kandji" alone.

### Deadline-lockout presentation vocabulary (applies to common-issues.md + decision-trees/06-macos-triage.md)

**Source:** D-02 execution rule + D-04 sleeper flaw 4.2 fix.
**Apply to:** common-issues.md first new `###` symptom sentence; 06-macos-triage.md MAC3 branch label and MAC1 "How to Check" exception clause.
**Rule:** Describe the device by its screen presentation ("full-screen non-dismissible migration prompt" / "non-dismissible full-screen deadline prompt"), NOT as a "primary symptom" implying Finder desktop presence. The device is in deadline enforcement, not OOBE.

### Single atomic commit shape (D-05)

**Apply to:** All four hub files committed together after D-05 pre-commit verification:
```bash
git cat-file -e HEAD:docs/macos-lifecycle/01-psso-provisioning-walkthrough.md
git cat-file -e HEAD:docs/macos-lifecycle/02-mdm-migration-psso.md
git cat-file -e HEAD:docs/l2-runbooks/30-macos-mdm-migration-failure.md
git cat-file -e HEAD:docs/l2-runbooks/27-macos-sso-investigation.md
```
Then stage and commit all four hub files together:
```bash
git add docs/index.md docs/common-issues.md docs/quick-ref-l2.md docs/decision-trees/06-macos-triage.md
```

---

## No Analog Found

None. All four hub files contain their own within-file analogs (the existing row/block/entry that the new addition must mirror). Every addition is a structural clone of an existing sibling, not an invention.

---

## Metadata

**Analog search scope:** Within each of the four hub files (`docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, `docs/decision-trees/06-macos-triage.md`). No cross-file analog search required — each file is self-analogous for its own addition.
**Files scanned:** 4 hub files (targeted reads); 0 content files modified.
**Pattern extraction date:** 2026-06-25
**Research source HEAD:** `37b05fe` (from RESEARCH.md; re-verify line numbers if any intervening commit touches any hub file before plan execution).
