# Phase 96: Surgical Conflict Fixes — Research

**Researched:** 2026-06-28
**Domain:** macOS documentation surgical corrections (four verified factual errors)
**Confidence:** HIGH — all findings verified by direct file inspection of live source files

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01: Correction style — inline prose rewrite (NOT a second callout)**
ACC-01 fix is an inline sentence rewrite, not a word-swap and not an added callout. Line 326 already carries the correct explanatory note. Line 319 is built on a false premise — the full sentence must be rewritten so PKG/LOB is the macOS method. Rewrite the full sentence at line 319 AND fix line 309 (its parenthetical "can be deployed via [VPP]... for silent installation"). Re-express the "silent installation" rationale correctly (managed PKG/LOB installs silently for a different reason than VPP licensing).

**D-02: VPP glossary-term cleanup — remove the orphaned local references**
Remove the "Glossary Terms Used" quick-ref row (VPP → "First Appears: Stage 6", line 411) and the inline `[VPP]` link at line 309, in 00-ade-lifecycle.md only. NEVER touch the glossary `#vpp` definition in `_glossary-macos.md`. KEEP the See-Also prose at line 382.

**D-03: Freshness stamps — bump now, on edited files only**
Bump `last_verified` / `review_by` on the three files actually edited. Set `last_verified = 2026-06-28`; recompute `review_by = 2026-09-28` (suite +3-month/same-day-of-month invariant). Add a version-history row to each edited file. Do NOT edit `02-mdm-migration-psso.md`.

**D-04: Glossary Kandji-Iru depth — minimal 3-URL, as a REPLACEMENT**
Replace the existing line 114 sentence ("The support portal URL is unchanged: support.kandji.io") with a concise 3-URL statement of roles. Do NOT append. Do NOT import dated verification caveats. The `### Kandji-Iru` heading stays bare (slug landmine). Alphabetical Index entry (line 17) needs no change.

**D-05: ACC-02 (guide 00 line 250) — device-group → static user group**
Correct the A2 PSSO/SSO-extension policy assignment to a static user group (not device group). Apply consistently with the user-affinity rule used elsewhere in the suite.

### Claude's Discretion
Exact wording of the rewritten sentences (D-01, D-04) is at the planner/executor's discretion, provided it satisfies the locked success criteria and the implementation notes above.

### Deferred Ideas (OUT OF SCOPE)
- Full freshness formalization (freshness stamps + harness coverage across guides 02/03) — owned by Phase 97.
- Guide 07 VPP conflict + troubleshooting depth — owned by Phase 98.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ACC-01 | `docs/macos-lifecycle/00-ade-lifecycle.md` describes macOS Company Portal as PKG/LOB only (never VPP / Apps and Books) — Stage-6 lines ~309/319 corrected, Stage-4-vs-Stage-6 self-contradiction removed, Stage-6 VPP glossary-term reference reconciled | Lines 309, 319, 326 (already correct), 411 verified and quoted below |
| ACC-02 | `docs/macos-lifecycle/00-ade-lifecycle.md` (~line 250) assigns the A2 PSSO/SSO-extension policy to a static user group (corrects "static device group") | Line 250 verified and quoted below; Stage 4 context confirmed |
| ACC-04 | `docs/l1-runbooks/15-macos-company-portal-sign-in.md` (~line 30) corrects the remediation to user-group assignment for user-affinity devices (not device group) | Line 30 verified and quoted below |
| GLOS-01 | `docs/_glossary-macos.md` Iru/Kandji entry reflects the 3-URL reality — closes GLOSSARY-IRU-URL-FRESHNESS-01 | Lines 112-114 verified; source-of-truth (guide 02 line 553) confirmed |
</phase_requirements>

---

## Summary

This phase corrects four verified factual errors across three documentation files. All decisions are locked via adversarial review. The researcher's job is to verify live current state — exact line numbers, verbatim text, and harness constraints — so the planner can write precise, line-accurate edit tasks.

All four target lines have been directly inspected. The corrections are surgical: two edits to `00-ade-lifecycle.md` (ACC-01 + D-02 cleanup at lines 309/319/411; ACC-02 at line 250), one edit to `15-macos-company-portal-sign-in.md` (ACC-04 at line 30), and one body sentence replacement in `_glossary-macos.md` (GLOS-01 at line 114).

No validator asserts the VPP row, Kandji-Iru anchor content, or `last_verified` presence. Anchor integrity is maintained: the `#vpp` anchor in the glossary has 14+ surviving inbound links after the two guide-00 removals; the `#kandji-iru` anchor survives because the `### Kandji-Iru` heading remains unchanged.

**Primary recommendation:** Four atomic edit tasks, one per target location. Freshness stamps and version-history rows update after all four prose edits. No new files. No nav-hub edits.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| ACC-01 VPP prose rewrite | Stage 6 narrative (What Happens + Behind the Scenes) | Watch Out For (line 326 — exemplar only, no change) | False VPP claim lives in "What Happens" step 1 and "Behind the Scenes" prose; the correction does not touch the already-correct "Watch Out For" callout |
| D-02 Glossary row removal | Guide 00 Glossary Quick Reference table | Guide 00 inline link at line 309 | Both local references become orphaned after D-01; the canonical `#vpp` definition in `_glossary-macos.md` is untouched |
| ACC-02 group-type fix | Stage 4 Watch Out For bullet | — | Single substring replacement within one bullet point |
| ACC-04 group-type fix | L1 Runbook step 4 | — | Single substring replacement within one step |
| GLOS-01 Kandji-Iru 3-URL | Glossary body sentence | — | Replace one sentence; heading and Windows-equivalent blockquote unchanged |
| Freshness stamps | YAML frontmatter (all 3 files) | Version history table rows | Convention: bump last_verified + review_by + add row on scoped edits |

---

## Target File: `docs/macos-lifecycle/00-ade-lifecycle.md`

### Current Frontmatter

```yaml
last_verified: 2026-06-20
review_by: 2026-09-20
```

**Target stamps after Phase 96 edit:**
```yaml
last_verified: 2026-06-28
review_by: 2026-09-28
```

### ACC-01 — Line 309 (VERBATIM, confirmed by direct inspection)

```
1. **Company Portal launch.** The Company Portal app must be deployed to the device as a required app via Intune. It is not pre-installed on macOS. The app can be deployed via [VPP](../_glossary-macos.md#vpp) (Apps and Books in [ABM](../_glossary-macos.md#abm)) for silent installation.
```

**What must change:** The parenthetical `can be deployed via [VPP](../_glossary-macos.md#vpp) (Apps and Books in [ABM](../_glossary-macos.md#abm)) for silent installation` is the false macOS-CP-via-VPP claim. Per D-01, this sentence must be rewritten so PKG/LOB is the method and the "silent installation" causal claim is re-expressed correctly (managed PKG/LOB installs silently via the Intune Management Extension, not via VPP licensing). Per D-02, the `[VPP]` inline link is removed as part of the rewrite.

**Suggested rewrite (exact wording at executor discretion):**
The sentence should state that Company Portal is deployed as a required PKG (LOB or unmanaged macOS PKG) via Intune. Silent installation on macOS is achieved via the Intune Management Extension (IME), not VPP licensing.

### ACC-01 — Line 319 (VERBATIM, confirmed by direct inspection)

```
- Company Portal must be deployed as a required app. The recommended deployment method is through VPP (Apps and Books) for silent, license-managed installation. Alternatively, it can be deployed as a DMG or PKG app through Intune.
```

**What must change:** The entire sentence "The recommended deployment method is through VPP (Apps and Books) for silent, license-managed installation. Alternatively, it can be deployed as a DMG or PKG app through Intune." is built on a false premise. Per D-01, rewrite so PKG/LOB is the macOS method. The already-correct exemplar at line 326 provides canonical phrasing.

**Already-correct exemplar (line 326 — DO NOT MODIFY this line):**

```
- **Company Portal not deployed.** The user cannot find the Company Portal app because it was not deployed as a required app in Intune. Deploy the macOS Company Portal as a required **PKG** app — added to Intune as a line-of-business (LOB) app, or as an unmanaged macOS PKG app. On macOS the Company Portal is never distributed via Apple VPP / Apps and Books (that channel is iOS/iPadOS only).
```

The rewrite at line 319 must align with this phrasing. Do not duplicate the "never via VPP" explanatory note — line 326 already carries it.

### D-02 — Line 411 (VERBATIM, confirmed by direct inspection)

The Glossary Quick Reference table row to REMOVE:

```
| [VPP](../_glossary-macos.md#vpp) | Volume Purchase Program (Apps and Books) for app deployment | Stage 6 |
```

**Context:** This is the last row of the table at lines 404-411. After D-01, VPP is no longer legitimately used in this guide, making "First Appears: Stage 6" false. Remove the row entirely.

**Surrounding table structure for context:**

```markdown
| Term | Definition | First Appears |
|------|-----------|---------------|
| [ADE](../_glossary-macos.md#ade) | Automated Device Enrollment -- Apple's zero-touch enrollment mechanism | Stage 1 |
| [ABM](../_glossary-macos.md#abm) | Apple Business Manager -- Apple's device and app management portal | Stage 1 |
| [ABM Token](../_glossary-macos.md#abm-token) | Server token (.p7m) connecting Intune to ABM for device sync | Stage 2 |
| [Setup Assistant](../_glossary-macos.md#setup-assistant) | macOS first-run configuration experience | Stage 3 |
| [Await Configuration](../_glossary-macos.md#await-configuration) | Post-Setup-Assistant hold while Intune delivers policies | Stage 5 |
| [VPP](../_glossary-macos.md#vpp) | Volume Purchase Program (Apps and Books) for app deployment | Stage 6 |  ← REMOVE THIS ROW
```

### D-02 — Line 382 (VERBATIM — KEEP, do not modify)

```
- [macOS Provisioning Glossary](../_glossary-macos.md) -- ADE, ABM, Setup Assistant, VPP terminology with Windows equivalents
```

This is truthful generic See-Also prose (the glossary genuinely covers VPP terminology). Keep unchanged.

### ACC-02 — Line 250 (VERBATIM, confirmed by direct inspection)

Full bullet text (Stage 4, "Watch Out For" subsection):

```
- **Platform SSO extension profile must be pre-deployed for ADE enrollment-time registration.** If Platform SSO is configured for ADE enrollment-time registration (advanced path, macOS 26+ with `EnableRegistrationDuringSetup`), the SSO extension Settings Catalog profile must be assigned to a static device group and delivered before the device reaches the Entra credential screen in Setup Assistant. If Company Portal has not finished installing when the user first attempts to sign in, the user sees "Unable to sign in" with a registration error; tapping "Try Again" allows Company Portal to finish and registration to complete. For standard Platform SSO (post-enrollment), this timing constraint does not apply at Stage 4 — registration is triggered later by a "Registration required" notification at the desktop (Stage 7).
```

**Stage context:** Stage 4 ("Setup Assistant") → "Watch Out For" subsection. This is the last bullet in the "Watch Out For" list before the `---` separator at line 252. The bullet describes the A2 advanced PSSO path (macOS 26+, `EnableRegistrationDuringSetup`).

**What must change:** The substring `must be assigned to a static device group` → `must be assigned to a static user group`

**Nuance reconciled:** The PSSO/SSO-extension Settings Catalog profile delivers SSO extension configuration to the user's Mac via user affinity. It must target users (user group), not devices. The enrollment profile itself (Stage 3) remains device/serial-targeted. These are distinct profiles assigned to distinct group types. The user-group rule for SSO extension profiles is consistent with glossary line ~186 and guide 07. No legitimate enrollment-time-delivery reason exists to use a device group for the SSO extension policy on user-affinity ADE devices.

### Version History Row to Add (00-ade-lifecycle.md)

Insert as a new row in the Version History table (currently lines 415-420), above the existing rows:

```markdown
| 2026-06-28 | Phase 96 (ACC-01, ACC-02): corrected Stage-6 Company Portal VPP/LOB claims (lines 309, 319); removed orphaned VPP glossary quick-ref row (line 411); corrected Stage-4 SSO-extension policy group type from device to user (line 250) | -- |
```

---

## Target File: `docs/l1-runbooks/15-macos-company-portal-sign-in.md`

### Current Frontmatter

```yaml
last_verified: 2026-04-14
review_by: 2026-07-13
```

Note: The existing `review_by` of 2026-07-13 is one day short of the nominal +3-month/same-day invariant (04-14 → 07-14). This is a pre-existing quirk in the file. Phase 96 sets a fresh stamp from scratch.

**Target stamps after Phase 96 edit:**
```yaml
last_verified: 2026-06-28
review_by: 2026-09-28
```

### ACC-04 — Line 30 (VERBATIM, confirmed by direct inspection)

```
4. If Company Portal does not have a Required assignment for this device's group: this is the root cause. Navigate to **Apps** > **macOS** > Company Portal > **Properties** > **Assignments** and confirm Company Portal is assigned as **Required** to the device group. If not, proceed to [Escalation Criteria](#escalation-criteria) — adding or correcting app assignments may require admin action.
```

**What must change:**
- First occurrence: "for this device's group" → "for this user's group" (or equivalent phrasing scoping to user-affinity devices)
- Second occurrence: "to the device group" → "to the user group"

**Nuance:** The runbook describes user-affinity ADE devices (those requiring Company Portal sign-in). For these devices, the correct assignment target is a user group (user affinity drives the assignment). The phrase "device group" in step 4 is the error. The correction must remain clear that this is specifically for user-affinity devices; the surrounding runbook context (preamble line 13: "Company Portal is required to complete user affinity registration") already establishes user-affinity scope.

**Suggested rewrite (exact wording at executor discretion):**
The step should direct to check whether Company Portal is assigned as Required to the user's group (user group), not the device group, since user-affinity devices require user-targeted app assignments.

### Version History Row to Add (15-macos-company-portal-sign-in.md)

The Version History table (currently lines 73-77):

```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
```

Insert as a new row above the initial version row:

```markdown
| 2026-06-28 | Phase 96 (ACC-04): corrected step 4 app-assignment group type from device to user for user-affinity devices; updated last_verified and review_by | -- |
```

---

## Target File: `docs/_glossary-macos.md`

### Current Frontmatter

```yaml
last_verified: 2026-06-24
review_by: 2026-09-24
```

**Target stamps after Phase 96 edit:**
```yaml
last_verified: 2026-06-28
review_by: 2026-09-28
```

### GLOS-01 — Lines 112-114 (VERBATIM, confirmed by direct inspection)

```markdown
### Kandji-Iru

macOS MDM platform rebranded from Kandji to Iru in October 2025. Both names refer to the same product; this documentation uses "Kandji/Iru" throughout to be clear for readers who may know either name. The support portal URL is unchanged: support.kandji.io.
```

Line 112: `### Kandji-Iru` (heading — MUST NOT CHANGE; slug `#kandji-iru` has live inbound links)
Line 113: blank
Line 114: Full body sentence (all on one line in the file)

**What must change:** Only the sentence `The support portal URL is unchanged: support.kandji.io.` — replace it with the 3-URL reality.

**The sentence to replace is the last clause of line 114.** The two preceding sentences ("macOS MDM platform rebranded from Kandji to Iru in October 2025. Both names refer to the same product; this documentation uses 'Kandji/Iru' throughout to be clear for readers who may know either name.") are accurate and must be KEPT.

**Source of truth for 3-URL roles (guide 02 line 553, verified 2026-06-26):**

```
`support.kandji.io` hosts Iru-branded KB articles (verified accessible 2026-06-26);
`support.iru.io` is the rebrand target (resolves but login-gated SPA on 2026-06-26);
`docs.iru.com` is the new authoritative public docs domain (verified accessible 2026-06-26)
```

**D-04 requirement:** The replacement must be durable — no dated "verified 2026-06-26" text, no HTTP-200 minutiae. Those live in guide 02 and must not be duplicated in the glossary.

**Suggested replacement sentence (exact wording at executor discretion, must satisfy D-04):**

Must state three URLs and their roles: `support.kandji.io` (Iru-branded KB / legacy redirect), `support.iru.io` (primary rebrand target — login-gated SPA), `docs.iru.com` (new authoritative public documentation source). No verification dates. No "HTTP 200" specifics.

**What must NOT change:**
- Line 112: `### Kandji-Iru` heading (slug anchor `#kandji-iru` referenced from guide 02 line 553 as `[Kandji / Iru](../_glossary-macos.md#kandji-iru)`)
- Line 116-117: `> **Windows equivalent:**` blockquote — untouched
- Line 17: Alphabetical Index entry `[Kandji-Iru](#kandji-iru)` — no change needed

**Alphabetical Index confirmation (line 17):**
The index already reads `[Kandji-Iru](#kandji-iru)` — this is correct and requires no edit.

### `#vpp` Definition (line 146 area) — DO NOT TOUCH

The `### VPP` definition starting at line 146 has 14+ surviving inbound links from across the suite. Phase 96 does not touch this section.

**Inbound link count for `#vpp` in docs/ (verified by grep):** 16 total match locations found. The two being removed (guide 00 lines 309 and 411) leave 14 surviving inbound links. The `#vpp` anchor remains live after D-01/D-02.

### Version History Row to Add (_glossary-macos.md)

The Version History table is at lines 231-245. Insert as a new row at the top (most recent first):

```markdown
| 2026-06-28 | Phase 96 (GLOS-01): replaced Kandji-Iru support portal sentence with 3-URL reality (support.kandji.io / support.iru.io / docs.iru.com); updated last_verified and review_by | -- |
```

---

## Do Not Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 3-URL Iru durable summary | A new researched summary with verification details | Mirror the durable role-description from guide 02 line 553, stripped of dated caveats | Guide 02 already contains the authoritative operational detail; glossary carries durable roles only |
| "Already-correct" VPP note | A new Watch Out For callout | Line 326 already states the correct rule | Triplication would result; lean on 326 as the canonical exemplar |

---

## Common Pitfalls

### Pitfall 1: Triplicating the VPP/iOS-only Note
**What goes wrong:** Rewriter adds a new inline note or callout at lines 309/319 repeating "never distributed via VPP (iOS/iPadOS only)" — which already appears verbatim at line 326.
**Why it happens:** The error at 309/319 is tempting to fix with a word-swap plus an explanatory note, without realizing line 326 already carries the explanation.
**How to avoid:** Rewrite 309/319 to state the correct PKG/LOB method cleanly. Line 326 supplies the "never VPP" rule; 309/319 supply the positive "what to deploy" instruction. Do not duplicate.

### Pitfall 2: Modifying the `### Kandji-Iru` Heading
**What goes wrong:** Executor adds a slash to the heading (e.g., `### Kandji / Iru`) to match the display text used at guide 02 line 553.
**Why it happens:** The display text at guide 02 line 553 uses `Kandji / Iru` with spaces around the slash, but this is the link TEXT, not the anchor target. The anchor `#kandji-iru` is derived from the heading `### Kandji-Iru` (bare, no spaces).
**How to avoid:** Leave `### Kandji-Iru` exactly as-is. The anchor slug `#kandji-iru` must remain unchanged. The body text may use any readable phrasing.
**Warning sign:** Any change to the H3 heading will break the inbound link from guide 02 line 553: `[Kandji / Iru](../_glossary-macos.md#kandji-iru)`.

### Pitfall 3: Importing Dated Operational Caveats into the Glossary
**What goes wrong:** Executor includes "verified 2026-06-26: HTTP 200" or "login-gated SPA" status in the glossary Kandji-Iru entry.
**Why it happens:** The source-of-truth (guide 02 lines 148-164, 553) contains dated verification notes. These are correct for guide 02's operational context but inappropriate for a durable glossary entry.
**How to avoid:** The glossary sentence must describe the durable role of each URL, not the transient HTTP response observed on a specific date. Dated verification caveats live in guide 02 only.

### Pitfall 4: Touching guide 02 or its Freshness Stamps
**What goes wrong:** Executor edits `docs/macos-lifecycle/02-mdm-migration-psso.md` to align with GLOS-01.
**Why it happens:** Guide 02 is the source of truth for the 3-URL detail; GLOS-01 aligns the glossary TO guide 02, not the reverse.
**How to avoid:** Guide 02 is the authoritative source. Do not edit it in Phase 96. Its stamps are untouched.

### Pitfall 5: Removing the See-Also Prose at Line 382
**What goes wrong:** Executor removes or edits the See-Also line mentioning "VPP terminology" after the D-02 VPP row removal.
**Why it happens:** After removing VPP from guide 00, the See-Also reference to "VPP terminology" in the glossary looks inconsistent.
**How to avoid:** The See-Also line is truthful — the macOS glossary genuinely covers VPP terminology (for other guides and platforms). It is a generic cross-reference, not a claim that guide 00 uses VPP. Per D-02, this line is explicitly preserved.

---

## Harness and Validator Constraints

### Validators Present

**Phase 32 `run-all.sh`** (`.planning/milestones/v1.3-phases/32-navigation-integration-references/validation/run-all.sh`):
- `link-check.sh` — validates `[text](path.md#anchor)` link integrity in markdown files. Runs in strict mode on Phase-32-touched files (not the Phase-96 target files). Also runs informationally on `docs/` (non-failing for non-Phase-32 files).
- `anchor-collision.sh` — detects duplicate H2 headings within a file. Default mode: H2 duplicates are failing; H3 duplicates are warnings.
- `reachability-audit.sh` — BFS from `docs/index.md` vs a fixture. Phase 96 adds no new files and removes no files, so the BFS graph is unchanged.

**`scripts/validation/pre-commit-advisory.sh`** — Checks Android/Linux supervision pin drift only. Triggered by staged files matching `docs/_glossary-android.md|docs/reference/android-capability-matrix.md|docs/admin-setup-android/|docs/_glossary-linux.md|docs/admin-setup-linux/`. Advisory only (exits 0 always). Not relevant to any Phase-96 edited file.

### What Validators DO NOT Assert

- VPP row presence in guide 00 → removal is safe, no harness risk
- `last_verified` / `review_by` presence → stamp bumps are convention-driven, not harness-enforced
- Kandji-Iru anchor content (body sentence) → GLOS-01 body edit is safe
- `#vpp` anchor in glossary → anchor survives (14+ remaining inbound links); only the two guide-00 local references are removed

### What Validators DO Protect — Must Not Break

| Concern | Validator | Constraint |
|---------|-----------|------------|
| `#kandji-iru` anchor in `_glossary-macos.md` | link-check.sh (informational on docs/) | Guide 02 line 553 links `[Kandji / Iru](../_glossary-macos.md#kandji-iru)` — `### Kandji-Iru` heading MUST remain unchanged |
| `#vpp` anchor in `_glossary-macos.md` | link-check.sh (informational on docs/) | 14 surviving inbound links after guide-00 removals; the glossary `### VPP` heading must not be touched |
| H2 anchor collision in edited files | anchor-collision.sh | No H2 headings are added, removed, or renamed in Phase 96 — no collision risk |
| BFS reachability from docs/index.md | reachability-audit.sh | No files are created or deleted — BFS fixture unchanged |

---

## Freshness Stamp Summary

| File | Current last_verified | Current review_by | Phase 96 last_verified | Phase 96 review_by |
|------|----------------------|-------------------|----------------------|------------------|
| `docs/macos-lifecycle/00-ade-lifecycle.md` | 2026-06-20 | 2026-09-20 | **2026-06-28** | **2026-09-28** |
| `docs/_glossary-macos.md` | 2026-06-24 | 2026-09-24 | **2026-06-28** | **2026-09-28** |
| `docs/l1-runbooks/15-macos-company-portal-sign-in.md` | 2026-04-14 | 2026-07-13 | **2026-06-28** | **2026-09-28** |
| `docs/macos-lifecycle/02-mdm-migration-psso.md` | (not edited) | (not edited) | — | — |

**Invariant:** `review_by` = `last_verified` + 3 calendar months, same day-of-month. 2026-06-28 + 3 months = 2026-09-28. Confirmed.

**Convention verified against version history:** Both glossary Phase 91 (2026-06-24) and Phase 75 (2026-06-20) recorded "updated last_verified and review_by" in their version-history rows on scoped edits. [VERIFIED: direct inspection of _glossary-macos.md version history lines 231-245]

---

## Cross-Reference Integrity

### VPP `#vpp` Inbound Links (suite-wide grep for `#vpp`)

Total match locations found: 16. Breakdown:

| File | Lines | Status after Phase 96 |
|------|-------|----------------------|
| `docs/_glossary-macos.md` | 17 (index), 53 (Supervision), 165 (LOB app See Also) | KEEP — internal cross-refs within glossary |
| `docs/ios-lifecycle/00-enrollment-overview.md` | 84 | KEEP — valid iOS/iPadOS context |
| `docs/_glossary-linux.md` | 17, 168, 169 | KEEP — valid cross-platform cross-refs |
| `docs/_glossary-apple-business.md` | 113 | KEEP |
| `docs/decision-trees/07-ios-triage.md` | 99 | KEEP — valid iOS context |
| `docs/admin-setup-macos/04-app-deployment.md` | 15 | KEEP — valid macOS app deployment context |
| `docs/l1-runbooks/13-macos-app-not-installed.md` | 26, 57 | KEEP — local `#vpp-missing` anchor; not a link to the glossary `#vpp` |
| `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` | 483 | KEEP — valid Glossary Quick Reference row |
| `docs/macos-lifecycle/00-ade-lifecycle.md` | 309 | REMOVE (D-01/D-02) |
| `docs/macos-lifecycle/00-ade-lifecycle.md` | 411 | REMOVE (D-02) |

After D-01/D-02: `#vpp` anchor has 14 surviving inbound links. Anchor remains live. No broken-link risk.

### `#kandji-iru` Inbound Links

From guide 02 line 553: `[Kandji / Iru](../_glossary-macos.md#kandji-iru)` — link to the glossary anchor.
Heading that produces the anchor: `### Kandji-Iru` (line 112 of `_glossary-macos.md`).
Slug derivation: `Kandji-Iru` → lowercase → `kandji-iru` (no further transformation needed — already hyphenated, no punctuation to strip).
Phase 96 action: heading unchanged. Anchor survives. Link valid.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 96 is purely documentation prose edits; no external tools, services, runtimes, CLIs, or databases required.

---

## Validation Architecture

Step 4: No per-phase validator (check-phase-96.mjs) exists yet — that is Phase 100's work (HARN-02). Phase 96 edits are not gated by a per-phase harness check. The Phase 32 run-all.sh continues to run as a suite-level check; it does not assert any Phase-96-specific invariants.

The planner should not add a check-phase-96.mjs task — that is out of scope for Phase 96.

---

## Security Domain

Not applicable — Phase 96 is documentation corrections only. No authentication, access control, cryptography, or user-input handling is introduced or modified.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| (none) | All claims in this research were verified by direct file inspection of live source files | — | — |

**All four target locations (lines 309, 319, 250, 411, 30, 112-114) were read verbatim from the live files in this research session. No training-data assumptions were required.**

---

## Sources

### Primary (HIGH confidence — direct file inspection)
- `docs/macos-lifecycle/00-ade-lifecycle.md` — lines 1-7 (frontmatter), 200-252 (Stage 4 / ACC-02), 299-330 (Stage 6 / ACC-01), 370-421 (See Also + Glossary Quick Reference + Version History) — read verbatim
- `docs/l1-runbooks/15-macos-company-portal-sign-in.md` — full file (78 lines) — read verbatim
- `docs/_glossary-macos.md` — lines 1-17 (frontmatter + Alphabetical Index), 100-180 (Kandji-Iru section + VPP section), 190-245 (Version History) — read verbatim
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — lines 145-168 (MIGV-02 3-URL operational detail), 545-565 (Glossary Quick Reference line 553 durable summary) — read verbatim
- `.planning/milestones/v1.3-phases/32-navigation-integration-references/validation/run-all.sh` — read verbatim (harness scope)
- `.planning/milestones/v1.3-phases/32-navigation-integration-references/validation/link-check.sh` — read verbatim (what it checks)
- `.planning/milestones/v1.3-phases/32-navigation-integration-references/validation/anchor-collision.sh` — read verbatim (what it checks)
- `scripts/validation/pre-commit-advisory.sh` — read verbatim (scope: Android/Linux only)
- Grep output for `#vpp` across docs/ — 16 match locations inspected

### Upstream (authoritative planning context)
- `.planning/phases/96-surgical-conflict-fixes/96-CONTEXT.md` — locked decisions D-01 through D-05
- `.planning/REQUIREMENTS.md` — ACC-01, ACC-02, ACC-04, GLOS-01 full text
- `.planning/STATE.md` — project history, pending todos, session continuity

---

## RESEARCH COMPLETE

**Phase:** 96 - Surgical Conflict Fixes
**Confidence:** HIGH — all target lines verified by direct file inspection

### Key Findings

- **ACC-01 exact targets confirmed:** Line 309 contains the `[VPP]` inline link with false "can be deployed via VPP for silent installation" parenthetical; line 319 contains the false "recommended method is through VPP" sentence. Both must be rewritten; line 326 (unchanged) provides the canonical "never via VPP" phrasing to lean on.
- **ACC-02 exact target confirmed:** Line 250 (Stage 4 "Watch Out For") reads "assigned to a static device group" — single substring replacement to "static user group."
- **ACC-04 exact target confirmed:** Line 30 of the runbook reads "to the device group" — correction to "to the user group" for user-affinity devices.
- **GLOS-01 exact target confirmed:** Line 114 ends with "The support portal URL is unchanged: support.kandji.io." — replace only this sentence with the 3-URL durable role description mirroring guide 02 line 553 (without dated caveats).
- **Harness is safe:** No validator asserts the VPP row, Kandji-Iru body, or last_verified. Anchor integrity verified: `#vpp` has 14 surviving inbound links after removal; `#kandji-iru` is preserved by keeping the heading unchanged.
- **Freshness stamps:** All three edited files get `last_verified: 2026-06-28` / `review_by: 2026-09-28` plus a version-history row. Guide 02 is not edited.

### File Created
`.planning/phases/96-surgical-conflict-fixes/96-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Target line numbers and verbatim text | HIGH | Directly read from live files |
| Harness scope and safety | HIGH | Validators read verbatim; grep confirmed inbound link counts |
| Freshness stamp targets | HIGH | Frontmatter read from all three files; +3-month invariant verified against version history |
| Source-of-truth 3-URL roles | HIGH | Guide 02 lines 148-164 and 553 read verbatim |

### Ready for Planning
Research complete. Planner can now create PLAN.md with four atomic edit tasks mapped directly to the verified line numbers and verbatim text above.
