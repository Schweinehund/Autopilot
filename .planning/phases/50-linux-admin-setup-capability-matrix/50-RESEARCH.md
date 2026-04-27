# Phase 50: Linux Admin Setup + Capability Matrix — Research

**Researched:** 2026-04-27
**Domain:** Microsoft Intune Linux client (Ubuntu 22.04/24.04 LTS) — admin setup guides, capability matrix, end-user enrollment, validator
**Confidence:** HIGH (primary domain; verified against prior v1.5 research corpus + live codebase inspection)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** `docs/reference/linux-capability-matrix.md` is a Linux↔Windows BILATERAL matrix (Win|Linux 2-col). Rejects 5-column, Linux-only, two-view options. SCOPE-LOCK from REQUIREMENTS line 155 "bilateral" mandate.

**D-02:** 6 domain H2s — `## Enrollment` / `## Configuration` / `## App Deployment` / `## Compliance` / `## Software Updates` / `## Conditional Access`. CA ELEVATED to its own H2 (not folded into Compliance). Gives PITFALL-2 a stable per-domain anchor (`#conditional-access`) for Phase 51 runbook 32 and Phase 58.

**D-03:** Frontmatter: `last_verified: 2026-04-27` / `review_by: 2026-06-26` / `applies_to: both` / `audience: admin` / `platform: Linux`.

**D-04:** Linux column uses 3-status closed set: `Supported` / `Partial` / `Not supported` (with optional `— qualifier` suffix). Windows column uses prose. `check-phase-50.mjs` extends V-49-07 column-aware regex from `cells[1]` (2-col whitelist) to `cells[2]` (3-col `| Feature | Windows | Linux |` table; 0-based after split-and-filter — col 0 = Feature, 1 = Windows, 2 = Linux).

**D-05:** Cross-Platform Equivalences H2 placement = below the 6 domain H2s, above Key Gaps Summary. Mirrors `android-capability-matrix.md` lines 76-92.

**D-06:** 10 H2s total: Enrollment → Configuration → App Deployment → Compliance → Software Updates → Conditional Access → Cross-Platform Equivalences → Key Gaps Summary → See Also → Version History.

**D-07:** LIN-03 (admin enrollment config) and LIN-06 (end-user enrollment steps) ship in TWO separate files in DIFFERENT directories. Admin: `docs/admin-setup-linux/02-enrollment-profile.md` (`audience: admin`). End-user: NEW `docs/end-user-guides/linux-intune-portal-enrollment.md` (`audience: end-user`). Mirrors Android Phase 37 BYOD precedent.

**D-08:** Admin file H2 list (02-enrollment-profile.md) — 5 H2s mirroring macOS analog: `## Prerequisites` / `## Steps` / `## Verification` / `## Configuration-Caused Failures` / `## See Also`. NO end-user H2 in admin file.

**D-09:** End-user file H2 list — 5 H2s mirroring Android end-user precedent: intro / `## Before you start` / `## Enroll your device` / `## Verify enrollment` / `## Get help`. Frontmatter: `audience: end-user`, `platform: Linux`, `applies_to: enrollment`, 60-day cycle.

**D-10:** Cross-link contract both directions, mandatory. Admin file contains: `> **For end users:** ... follow [Linux Intune Portal Enrollment](../end-user-guides/linux-intune-portal-enrollment.md). This guide covers admin-side enrollment configuration only.` End-user file contains: `> **For administrators:** ... see [admin-setup-linux/02-enrollment-profile.md](../admin-setup-linux/02-enrollment-profile.md).` Validator asserts both literal strings.

**D-11:** REQUIREMENTS.md LIN-06 line 148 + ROADMAP.md Phase 50 line 119 wording corrections land in same Phase 50 commit.

**D-12:** 3 paired rows in `## Cross-Platform Equivalences`.

**D-13:** Pair 1 REPHRASED: Linux `intune-portal` deb + `microsoft-identity-broker` systemd unit ≈ macOS Microsoft Intune Company Portal app + IntuneMDMDaemon LaunchAgent. Anchors: `_glossary-linux.md#intune-portal-package`, `_glossary-linux.md#microsoft-identity-broker`. Body distinguishes system-scope `microsoft-identity-broker` from user-scope `intune-agent.timer`.

**D-14:** Pair 2: Linux `intune-agent.timer` user-scope check-in ≈ iOS APNs-triggered MDM check-in cycle. Anchors: `_glossary-linux.md#intune-agenttimer`, `_glossary-macos.md#apns`. Body MUST disclose timer-poll vs APNs-push transport divergence.

**D-15:** Pair 3 (REQUIRED by LIN-13): Linux web-app CA (Microsoft Edge 102.x+) ≈ iOS MAM-WE — both "compliance-lite" patterns. Anchors: `_glossary-linux.md#web-app-ca`, `_glossary-macos.md#mam-we`. Body MUST disclose architectural divergence: browser-challenge vs app-layer selective-wipe.

**D-16:** No glossary append needed — all 6 anchor targets exist (verified by 49-VERIFICATION.md).

**D-17:** ROADMAP.md SC#4 same-commit correction. Pair-1 rephrased, count "≥2" → "≥3", DRIFT-07/LIN-DEFER-01 deferral notes added.

**D-18:** ONE atomic commit. All 8 content files + validator + 4 metadata-correction edits.

**D-19:** Commit message subject: `docs(50): linux admin guides + capability matrix + check-phase-50 validator + roadmap/requirements corrections`.

**D-20:** Pre-commit coverage validations (8 steps) before staging commit.

**D-21:** REQUIREMENTS.md AUDIT-06 line 87 same-commit correction: `audit-harness-integrity.yml` → `audit-harness-v1.5-integrity.yml`.

**D-22:** Same-commit edit bundle (4 corrections): ROADMAP line 119, ROADMAP line 188 (SC#4), REQUIREMENTS line 148 (LIN-06), REQUIREMENTS line 87 (AUDIT-06).

**D-23:** Validator-as-deliverable — `check-phase-50.mjs` ships in same commit. Mirrors `check-phase-49.mjs` file-reads-only / no-shared-module pattern. Estimated 24-28 V-50-NN checks. Already pre-registered in `.github/workflows/audit-harness-v1.5-integrity.yml` with lazy-skip (lines 101-115).

**D-24:** Structural assertions the validator MUST make (see CONTEXT.md D-24 for full list).

**D-25:** H2 string assertions are hardcoded in validator AND CONTEXT.md. Phase 51+ H2 rename requires same-commit validator update.

**D-26:** Plan order: authoring wave (parallel-safe) → pre-commit gate → single atomic commit → post-commit verification → VERIFICATION.md (separate commit).

### Claude's Discretion

- **CD-01:** Exact wording of `00-overview.md` back-link to Phase 49 cross-platform bridge subsection (must back-link, NOT duplicate).
- **CD-02:** Mermaid setup-sequence diagram in `00-overview.md` — recommended, not mandatory.
- **CD-03:** Exact prerequisites text in end-user file's `## Before you start` H2.
- **CD-04:** Whether `linux-capability-matrix.md` includes a `## Key Gaps Summary` H2 (recommended for consistency with android-capability-matrix.md precedent).
- **CD-05:** Validator scope for end-user file H2 pinning — recommended: pin all 5 H2 strings literally.
- **CD-06:** Exact body prose for the 3 paired rows in Cross-Platform Equivalences H2.
- **CD-07:** Whether `04-app-delivery.md` includes 1-2 minimal Bash example snippets vs concept-only overview. At most 1 minimal example per LIN-DEFER-01 trim discipline.

### Deferred Ideas (OUT OF SCOPE)

- 4th equivalence pair (Bash ≈ Intune Remediations PowerShell) → v1.5.1 LIN-DEFER-01
- 5th equivalence pair (encryption: dm-crypt ≈ BitLocker / FileVault) → Phase 56 DRIFT-07
- BitLocker / FileVault / Intune Remediations / LaunchDaemon / LaunchAgent H3 glossary anchors → out of Phase 50 scope
- Linux custom compliance Bash deep-dive → v1.5.1 LIN-DEFER-01
- RHEL / Rocky / Alma / Debian / SUSE / Fedora documentation → v1.6+
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LIN-03 | Admin can perform Linux Intune client enrollment configuration (verify Intune + Entra P1 licensing, create Linux compliance policy from settings catalog, optionally configure device-based CA policy scoped to Linux) following a Phase 50 admin setup guide | Architecture: `00-overview.md` + `02-enrollment-profile.md` (admin side); licensing prereqs verified from Microsoft Learn |
| LIN-04 | Admin can configure a Linux compliance policy across all 4 supported settings-catalog categories (Allowed Distributions / Custom Compliance / Device Encryption / Password Policy) — capability-narrowness framed via PITFALL-7-style callout | 4 compliance categories verified HIGH confidence from learn.microsoft.com/intune/device-security/compliance/ref-linux-settings; PITFALL-2 callout pattern specified |
| LIN-05 | Admin sees a `> ⚠️ Known admin pitfall` callout documenting Identity Broker v2.0.2+ automatic re-enrollment behavior and required admin action checklist | Behavior verified HIGH confidence (Phase 49 STACK.md; DPO-01 anchor exists at `01-linux-prerequisites.md#non-version-breakpoints`); back-link target locked |
| LIN-06 | End user can complete Linux device enrollment end-to-end on Ubuntu 22.04/24.04 LTS following step-by-step guide (install Edge 102.x+, install intune-portal deb, sign in, compliance remediation, access org resources via Edge) | D-07 2E architecture; end-user file at `docs/end-user-guides/linux-intune-portal-enrollment.md`; Android precedent is the structural template |
| LIN-13 | Admin can read a Linux capability matrix quantifying platform narrowness vs Windows — bilateral (Win\|Linux), Cross-Platform Equivalences section (web-app CA ↔ iOS MAM-WE compliance-lite), explicit "Not supported" cells | D-01 through D-17 lock all structural decisions; 3-pair content verified against glossary anchors |
</phase_requirements>

---

## Summary

Phase 50 ships 9 deliverables (8 content files + 1 validator) in one atomic commit. It is a documentation-only phase with no executable code beyond the `check-phase-50.mjs` validator. All 4 major structural decisions were locked by adversarial review in 50-CONTEXT.md D-01 through D-26 — the planner has no discretion on matrix shape, file architecture, commit strategy, or pair content. Planner discretion is limited to CD-01 through CD-07 items.

The primary research challenge for this phase was already resolved before the discussion phase: v1.5 research (SUMMARY.md, PITFALLS.md, STACK.md) produced HIGH-confidence findings on the Linux Intune client architecture, compliance categories, and CA constraints, all of which are now locked as CONTEXT.md decisions. Phase 49 delivered all prerequisite anchors (DPO-01 through DPO-05 verified in 49-VERIFICATION.md).

The validator (`check-phase-50.mjs`) is the most technically complex deliverable: it extends `check-phase-49.mjs`'s column-aware 3-status regex (V-49-07) to the Win|Linux bilateral table, adds 5 H2-string pinned assertions for the admin file, 5 H2-string pinned assertions for the end-user file, negative-assertion guards against 2A/2B/2C drift, cross-link literal-string assertions in both directions, PITFALL callout content assertions, and DPO-03 anti-duplication guards. Estimated 24-28 checks.

**Primary recommendation:** The plan should decompose into a parallel authoring wave (all 8 content files + validator authored concurrently in worktrees or sequentially by capability) followed by the 8-step pre-commit gate (D-20), then ONE atomic commit (D-18). No splitting by commit wave — D-18 is a locked decision.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Admin enrollment configuration | Documentation (admin-setup-linux/02) | Metadata corrections (ROADMAP/REQUIREMENTS) | Admin-facing; Intune portal steps; audience: admin |
| End-user enrollment walkthrough | Documentation (end-user-guides/) | Cross-link from admin file | Audience: end-user; separate directory per D-07 2E |
| Agent installation + pitfall callout | Documentation (admin-setup-linux/01) | Phase 49 anchor back-link (DPO-01) | LIN-05 is a callout in the agent guide |
| Compliance policy configuration | Documentation (admin-setup-linux/03) | PITFALL-2 CA callout | 4 settings-catalog categories; no executable code |
| App delivery concept | Documentation (admin-setup-linux/04) | PITFALL-1 scope callout | Script-based only; concept-level + 1 minimal example max |
| Conditional Access (web-app only) | Documentation (admin-setup-linux/05) | Matrix CA H2 anchor | No device-level CA; web-app CA via Edge 102.x+ |
| Capability matrix | Documentation (docs/reference/) | Downstream Phase 58 link target | Bilateral Win\|Linux; 6 domain H2s; 3-pair Equivalences |
| Structural validation | Validator (scripts/validation/check-phase-50.mjs) | CI workflow (lazy-skip pre-registered) | Asserts doc structure, frontmatter, cross-links, closed-set |
| Metadata corrections | Planning files (ROADMAP.md × 2, REQUIREMENTS.md × 2) | Same-commit atomicity (D-22 bundle) | 4 corrections ship with content; no standalone commit |

---

## Standard Stack

### Core
| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Node.js ESM | 20.x (CI) | Validator runtime | Established pattern (check-phase-49.mjs, check-phase-30.mjs, etc.) |
| `node:fs` (readFileSync, existsSync) | built-in | File-reads-only validator pattern | Phase 48 D-25: no shared module, no external tools |
| `node:path` (join) | built-in | Absolute path construction | Same as all prior check-phase-NN.mjs validators |
| `node:process` | built-in | Exit code + stdout output | Same pattern |

[VERIFIED: codebase inspection of check-phase-49.mjs lines 7-9]

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| `v1.5-milestone-audit.mjs` | C1-C12 blocking PASS gate; C13 informational | Run in pre-commit gate (D-20 step 2) |
| `regenerate-supervision-pins.mjs` | Pin coordinate self-test | D-20 step 3; Phase 50 has NO existing pinned files to modify, so pin drift risk is NULL |
| `markdown-link-check` | Informational link check | D-20 step 4; informational only (Phase 48 D-08 + REQUIREMENTS line 86) |

[VERIFIED: D-20 pre-commit gate list in 50-CONTEXT.md]

### Alternatives Considered (locked out by CONTEXT.md)
| Instead of | Could Use | Why Locked Out |
|------------|-----------|----------------|
| Win\|Linux bilateral matrix | 5-column or Linux-only | SCOPE-LOCK: REQUIREMENTS line 155 "bilateral"; D-01 |
| Separate end-user-guides/ file | Embedded H2 in admin file | audience contract violation; D-07 locks 2E |
| ONE atomic commit | Multi-commit waves | D-18 locks 4A; Phase 49 anti-1-commit precedent doesn't apply |

**Installation:** No new npm packages needed. All tooling inherited from Phase 48 setup.

---

## Architecture Patterns

### System Architecture Diagram

Data flow through Phase 50 deliverables:

```
Phase 49 Prerequisites (locked gate)
  ├── docs/linux-lifecycle/00-enrollment-overview.md
  │     └── #for-admins-familiar-with... → DPO-03 back-link target
  ├── docs/linux-lifecycle/01-linux-prerequisites.md
  │     └── #non-version-breakpoints → DPO-01 LIN-05 back-link target
  └── docs/_glossary-linux.md
        └── Anchor sources: #intune-portal-package, #microsoft-identity-broker,
            #intune-agenttimer, #web-app-ca

Phase 50 Authoring (all parallel-safe per D-26)
  ├── docs/admin-setup-linux/
  │     ├── 00-overview.md ──────────────► back-link to DPO-03 anchor
  │     ├── 01-intune-linux-agent.md ────► LIN-05 pitfall callout → DPO-01 anchor
  │     │                                   PITFALL-3 deb-vs-Snap callout
  │     ├── 02-enrollment-profile.md ────► admin enrollment config (LIN-03)
  │     │                                   cross-link → end-user-guides/ (D-10)
  │     ├── 03-compliance-policy.md ─────► 4 categories (LIN-04)
  │     │                                   PITFALL-2 callout at top
  │     ├── 04-app-delivery.md ──────────► PITFALL-1 scope callout; concept-only
  │     └── 05-conditional-access.md ────► web-app CA via Edge only
  │
  ├── docs/end-user-guides/
  │     └── linux-intune-portal-enrollment.md ─► LIN-06 5-step walkthrough
  │                                               cross-link → admin file (D-10)
  │
  ├── docs/reference/
  │     └── linux-capability-matrix.md ──► LIN-13 bilateral Win|Linux
  │           ├── 6 domain H2s (D-02)
  │           ├── ## Cross-Platform Equivalences (3 pairs D-13/14/15)
  │           └── ## Key Gaps Summary / See Also / Version History
  │
  └── scripts/validation/
        └── check-phase-50.mjs ──────────► 24-28 V-50-NN checks
              └── Registered in audit-harness-v1.5-integrity.yml (lazy-skip)

Pre-commit Gate (D-20 sequential)
  1. check-phase-50.mjs → exit 0
  2. v1.5-milestone-audit.mjs → C1-C12 PASS
  3. regenerate-supervision-pins.mjs --self-test → exit 0
  4-8. Additional verifications (cross-links, frontmatter, CA cell, LIN-05 anchor)

Single Atomic Commit (D-18/D-19)
  └── 8 content files + validator + 4 metadata corrections (D-22 bundle)

Post-commit Verification + VERIFICATION.md (separate commit)
```

[VERIFIED: 50-CONTEXT.md D-26 plan order]

### Recommended Project Structure

```
docs/
├── admin-setup-linux/        # 6 admin guide files (00-05)
│   ├── 00-overview.md        # setup-sequence + DPO-03 back-link; optional Mermaid (CD-02)
│   ├── 01-intune-linux-agent.md   # deb install; LIN-05 pitfall; PITFALL-3
│   ├── 02-enrollment-profile.md   # admin enrollment config; cross-link to end-user
│   ├── 03-compliance-policy.md    # 4 categories; PITFALL-2 callout
│   ├── 04-app-delivery.md         # PITFALL-1 scope callout; script-based only
│   └── 05-conditional-access.md   # web-app CA via Edge 102.x+ only
├── end-user-guides/
│   └── linux-intune-portal-enrollment.md   # NEW (D-07 2E); audience: end-user
└── reference/
    └── linux-capability-matrix.md  # Win|Linux bilateral; 6+4=10 H2s
scripts/validation/
└── check-phase-50.mjs              # 24-28 checks; file-reads-only pattern
```

[VERIFIED: 50-CONTEXT.md domain section + D-07/D-08/D-09/D-23]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Validator shared utilities | Custom utility module | Inline logic in check-phase-50.mjs | Phase 48 D-25 no-shared-module contract |
| 3-status set validation for Win\|Linux table | Custom cell-indexing | Extend V-49-07 regex to cell index 1 (Linux col) | One-line extension per Adversary disprove in DISCUSSION-LOG.md |
| H2 detection | Line-by-line parser | Regex `/^## ExactHeading\s*$/m.test(content)` | Established pattern; check-phase-49.mjs lines 82-85 |
| Frontmatter parsing | YAML library | Regex `.match(/^---\n([\s\S]*?)\n---/m)` | Phase 49 validator pattern; no npm packages needed |
| Cross-link assertion | Anchor resolution | Literal string `content.includes('literal-path-string')` | Phase 49 V-49-20 through V-49-22 precedent |

**Key insight:** The validator architecture is entirely file-reads-only (no execFileSync, no external tools). All assertions are either regex tests against file content or string inclusion checks.

---

## Runtime State Inventory

> Phase 50 is all-NEW-files with 4 existing metadata file corrections. No renamed strings, no refactored content. Runtime state inventory is not applicable.

**None — verified by**: Phase 50 delivers zero modifications to pinned files with existing supervision_exemptions in `v1.5-audit-allowlist.json`. The 4 metadata corrections (ROADMAP × 2, REQUIREMENTS × 2) are in `.planning/` directory files that are NOT under sidecar pin management. PITFALL-12 pin coordinate drift risk is NULL for this phase.

---

## Common Pitfalls

### Pitfall 1: Duplicating Phase 49 Bridge Subsection (DPO-03)
**What goes wrong:** `00-overview.md` contains its own `## For Admins Familiar with Windows / macOS / Android` H2 with full content.
**Why it happens:** The bridge subsection is useful context; authors naturally write it inline.
**How to avoid:** `00-overview.md` MUST back-link to `docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android` via a sentence + link, NOT recreate the content. Validator asserts: (a) back-link to Phase 49 anchor is present, (b) the H2 string `## For Admins Familiar with Windows / macOS / Android` does NOT appear in `00-overview.md`.
**Warning signs:** `00-overview.md` has a heading matching the Phase 49 bridge subsection heading.

[VERIFIED: 50-CONTEXT.md DPO-07 + D-24]

### Pitfall 2: Conflating Compliance Reporting with CA Enforcement (PITFALL-2)
**What goes wrong:** `03-compliance-policy.md` omits the CA architectural callout or buries it in a footnote. Admins configure compliance policies expecting device-level CA grants to work.
**Why it happens:** Windows/macOS/iOS/Android all connect compliance → CA grants. Linux does not.
**How to avoid:** Opening section of `03-compliance-policy.md` MUST contain a blockquote with literal text containing `Require device to be marked as compliant` AND "not available" or "not supported". Validator asserts this callout is present.
**Warning signs:** The compliance policy guide proceeds directly to settings configuration without a CA constraint preamble.

[VERIFIED: 50-CONTEXT.md D-24 + PITFALLS.md Pitfall 2 lines 33-56]

### Pitfall 3: Snap vs Deb in Agent Install Guide (PITFALL-3)
**What goes wrong:** `01-intune-linux-agent.md` references `snap install intune-portal` or describes snap confinement paths.
**Why it happens:** Microsoft shipped a Snap package during preview (2023); web search returns both paths.
**How to avoid:** `01-intune-linux-agent.md` MUST use `sudo apt install intune-portal` as the GA installation command. Include a callout with literal "deprecated" or "preview" applied to Snap. Validator asserts the deb-vs-Snap callout is present.
**Warning signs:** Any `snap install` instruction in the agent guide.

[VERIFIED: STACK.md lines 13-18; PITFALLS.md Pitfall 3 lines 60-77]

### Pitfall 4: Linux Column Drift in Capability Matrix (CDI-Phase50-03)
**What goes wrong:** A Phase 50 Linux column cell uses a 4th status string (e.g., "N/A", "Unsupported", "Unknown").
**Why it happens:** macOS and Android matrices use "N/A" cells; authors copy the pattern.
**How to avoid:** Linux column cells MUST only contain: `Supported`, `Partial`, or `Not supported` (with optional `— qualifier` suffix). The validator's column-aware regex (extending V-49-07 to cell index 1 in `| Feature | Windows | Linux |`) enforces this.
**Warning signs:** Any Linux column cell not starting with one of the 3 canonical strings.

[VERIFIED: 50-CONTEXT.md D-04 + CDI-Phase50-03]

### Pitfall 5: Wrong Pair 1 Attribution (W-CRIT-1/2/3 already corrected)
**What goes wrong:** A plan author drafts Pair 1 using the old SC#4 wording ("intune-portal service ≈ macOS LaunchDaemon").
**Why it happens:** ROADMAP SC#4 line 188 CURRENTLY contains the defective wording (pre-D-22 correction).
**How to avoid:** Use the D-13 rephrased Pair 1: `Linux 'intune-portal' deb + 'microsoft-identity-broker' systemd unit ≈ macOS Microsoft Intune Company Portal app + IntuneMDMDaemon LaunchAgent`. The same-commit ROADMAP correction (D-22) updates SC#4 alongside content — the plan must include both the correct pair prose AND the ROADMAP diff.
**Warning signs:** Any plan that uses "intune-portal service", "macOS LaunchDaemon", or "≈ macOS LaunchDaemon" in Pair 1 body.

[VERIFIED: 50-DISCUSSION-LOG.md Gray Area 3 Wave-3 + D-13/D-17]

### Pitfall 6: Missing Negative Assertions in Validator (2A/2B/2C Drift Guard)
**What goes wrong:** `check-phase-50.mjs` only asserts what SHOULD be present; does not assert what should NOT be present. A later edit adds end-user content to the admin file.
**Why it happens:** Negative assertions are non-obvious; positive assertions cover the intent.
**How to avoid:** Validator MUST include checks that `02-enrollment-profile.md` does NOT contain: `## End-User Enrollment Steps`, `## Appendix:`, `## Validate End-User Flow`. These are regression guards against the 2A/2B/2C patterns rejected by CONTEXT.md D-08.
**Warning signs:** Validator has no `FAIL` path for finding end-user H2 strings in the admin file.

[VERIFIED: 50-CONTEXT.md D-24]

### Pitfall 7: CA H2 Content Confusion (PITFALL-2 line 48 literal cell)
**What goes wrong:** The CA domain H2 in `linux-capability-matrix.md` has a Linux column cell that says only "Partial" or is blank.
**Why it happens:** Web-app CA EXISTS but is limited; authors reach for "Partial".
**How to avoid:** The CA row's Linux column cell MUST read `Not supported — web-app CA only` (em dash, exact phrasing per PITFALL-2 line 48 mandate and Phase 49 V-49-08 precedent). Validator asserts this literal string is present in the matrix file.
**Warning signs:** CA Linux column cell says "Partial" without the "— web-app CA only" qualifier.

[VERIFIED: 50-CONTEXT.md D-02 + D-24; 49-VERIFICATION.md V-49-08]

---

## Code Examples

Verified patterns from prior phase validators and CONTEXT.md:

### V-50 H2 Pinned Assertion Pattern (admin file)
```javascript
// Source: check-phase-49.mjs lines 80-86; extends to Phase 50
{
  id: N, name: "V-50-NN: 02-enrollment-profile.md H2 ## Prerequisites",
  run() {
    const content = readFile("docs/admin-setup-linux/02-enrollment-profile.md");
    if (content === null) return { pass: false, detail: "File does not exist" };
    if (/^## Prerequisites\s*$/m.test(content)) return { pass: true };
    return { pass: false, detail: "H2 '## Prerequisites' not found" };
  }
},
```

[VERIFIED: check-phase-49.mjs lines 80-86]

### V-50 Column-Aware Closed-Set Check (extends V-49-07)
```javascript
// Source: check-phase-49.mjs lines 126-149; extends to Win|Linux bilateral table
// V-49-07 checks cell index 1 in "| Capability | Linux Status |" (2-col; cells[1])
// V-50 extends to check cell index 1 in "| Feature | Windows | Linux |" (3-col; cells[2])
{
  id: N, name: "V-50-NN: linux-capability-matrix.md Linux column 3-status closed set",
  run() {
    const content = readFile("docs/reference/linux-capability-matrix.md");
    if (content === null) return { pass: false, detail: "File does not exist" };
    const VALID_STATUS = /^(Supported|Partial|Not supported)/;
    const lines = content.split('\n');
    let inMatrix = false;
    const violations = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Enter scope for each domain H2 (rows may span multiple H2 tables)
      if (/^## (Enrollment|Configuration|App Deployment|Compliance|Software Updates|Conditional Access)\s*$/.test(line)) { inMatrix = true; continue; }
      if (inMatrix && /^## /.test(line)) { inMatrix = false; continue; }
      if (!inMatrix || !/^\|/.test(line)) continue;
      if (/^\| Feature \| Windows \| Linux \|/.test(line)) continue; // header row
      if (/^\|[-| ]+\|/.test(line)) continue; // separator row
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length < 3) continue;
      const linuxCell = cells[2]; // index 2 = Linux column in | Feature | Windows | Linux |
      if (!VALID_STATUS.test(linuxCell)) violations.push("row: \"" + linuxCell.substring(0, 60) + "\"");
    }
    if (violations.length === 0) return { pass: true };
    return { pass: false, detail: violations.length + " Linux column cell(s) violate closed set: " + violations.slice(0, 3).join("; ") };
  }
},
```

[VERIFIED: check-phase-49.mjs V-49-07 lines 126-149; 50-CONTEXT.md D-04]

### V-50 Cross-Link Literal Assertion Pattern
```javascript
// Source: check-phase-49.mjs V-49-20 through V-49-22 (literal inclusion check)
// Extended to two-direction cross-link assertions (D-10)
{
  id: N, name: "V-50-NN: 02-enrollment-profile.md contains cross-link to end-user file (D-10)",
  run() {
    const content = readFile("docs/admin-setup-linux/02-enrollment-profile.md");
    if (content === null) return { pass: false, detail: "File does not exist" };
    if (content.includes('../end-user-guides/linux-intune-portal-enrollment.md'))
      return { pass: true };
    return { pass: false, detail: "Cross-link to end-user file not found (D-10)" };
  }
},
{
  id: N, name: "V-50-NN: linux-intune-portal-enrollment.md contains cross-link to admin file (D-10)",
  run() {
    const content = readFile("docs/end-user-guides/linux-intune-portal-enrollment.md");
    if (content === null) return { pass: false, detail: "File does not exist" };
    if (content.includes('../admin-setup-linux/02-enrollment-profile.md'))
      return { pass: true };
    return { pass: false, detail: "Cross-link to admin file not found (D-10)" };
  }
},
```

[VERIFIED: check-phase-49.mjs lines 308-334; 50-CONTEXT.md D-10/D-24]

### V-50 Negative Assertion Pattern (2A/2B/2C Drift Guard)
```javascript
// Source: 50-CONTEXT.md D-08/D-24 — negative guard
{
  id: N, name: "V-50-NN: 02-enrollment-profile.md does NOT contain end-user H2 (2A/2B/2C guard)",
  run() {
    const content = readFile("docs/admin-setup-linux/02-enrollment-profile.md");
    if (content === null) return { pass: false, detail: "File does not exist" };
    const forbidden = [
      /^## End-User Enrollment Steps\s*$/m,
      /^## Appendix:/m,
      /^## Validate End-User Flow\s*$/m
    ];
    const found = forbidden.filter(r => r.test(content)).map(r => r.source);
    if (found.length === 0) return { pass: true };
    return { pass: false, detail: "Forbidden end-user H2(s) found in admin file: " + found.join(", ") };
  }
},
```

[VERIFIED: 50-CONTEXT.md D-24]

### V-50 PITFALL-2 Callout Assertion
```javascript
// Source: 50-CONTEXT.md D-24; PITFALLS.md Pitfall 2 lines 41-48
{
  id: N, name: "V-50-NN: 03-compliance-policy.md PITFALL-2 CA constraint callout",
  run() {
    const content = readFile("docs/admin-setup-linux/03-compliance-policy.md");
    if (content === null) return { pass: false, detail: "File does not exist" };
    if (!content.includes('Require device to be marked as compliant'))
      return { pass: false, detail: "PITFALL-2: 'Require device to be marked as compliant' literal not found" };
    if (!/not available|not supported/i.test(content))
      return { pass: false, detail: "PITFALL-2: 'not available' or 'not supported' qualifier not found" };
    return { pass: true };
  }
},
```

[VERIFIED: 50-CONTEXT.md D-24]

### V-50 LIN-05 Pitfall Callout Assertion
```javascript
// Source: 50-CONTEXT.md D-24; DPO-01 from 49-VERIFICATION.md
{
  id: N, name: "V-50-NN: 01-intune-linux-agent.md LIN-05 pitfall back-link to Phase 49 anchor",
  run() {
    const content = readFile("docs/admin-setup-linux/01-intune-linux-agent.md");
    if (content === null) return { pass: false, detail: "File does not exist" };
    if (!content.includes('docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints'))
      return { pass: false, detail: "DPO-01: back-link to Phase 49 #non-version-breakpoints anchor not found" };
    // Check > ⚠️ Known admin pitfall blockquote within file
    if (!/^> ⚠️ \*\*Known admin pitfall/m.test(content))
      return { pass: false, detail: "LIN-05: '> ⚠️ Known admin pitfall' blockquote not found" };
    return { pass: true };
  }
},
```

[VERIFIED: 50-CONTEXT.md D-24; 49-VERIFICATION.md DPO-01]

### C10 Frontmatter Check (8 content files)
```javascript
// Source: check-phase-49.mjs V-49-18 lines 254-280; extended to 8 Phase 50 files
// audience check extended: 7 files must have audience: admin; 1 must have audience: end-user
{
  id: N, name: "V-50-NN: C10 frontmatter — platform: Linux + 60-day cycle on all 8 content files",
  run() {
    const adminFiles = [
      "docs/admin-setup-linux/00-overview.md",
      "docs/admin-setup-linux/01-intune-linux-agent.md",
      "docs/admin-setup-linux/02-enrollment-profile.md",
      "docs/admin-setup-linux/03-compliance-policy.md",
      "docs/admin-setup-linux/04-app-delivery.md",
      "docs/admin-setup-linux/05-conditional-access.md",
      "docs/reference/linux-capability-matrix.md",
    ];
    const endUserFile = "docs/end-user-guides/linux-intune-portal-enrollment.md";
    const failures = [];
    const allFiles = [...adminFiles, endUserFile];
    for (const f of allFiles) {
      const content = readFile(f);
      if (content === null) { failures.push(f + ": file missing"); continue; }
      const fmMatch = content.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
      if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
      const fm = fmMatch[1];
      const issues = [];
      if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
      const isEndUser = f === endUserFile;
      const expectedAudience = isEndUser ? "end-user" : "admin";
      if (!new RegExp('^audience: ' + expectedAudience + '\\s*$', 'm').test(fm))
        issues.push("audience: " + expectedAudience + " missing");
      const lvMatch = fm.match(/^last_verified: (\d{4}-\d{2}-\d{2})\s*$/m);
      const rbMatch = fm.match(/^review_by: (\d{4}-\d{2}-\d{2})\s*$/m);
      if (!lvMatch) issues.push("last_verified missing");
      if (!rbMatch) issues.push("review_by missing");
      if (lvMatch && rbMatch) {
        const days = (new Date(rbMatch[1]) - new Date(lvMatch[1])) / 86400000;
        if (days > 60) issues.push("review_by > 60 days");
      }
      if (issues.length > 0) failures.push(f + ": " + issues.join("; "));
    }
    if (failures.length === 0) return { pass: true, detail: "All 8 content files have valid frontmatter" };
    return { pass: false, detail: failures.join(" | ") };
  }
},
```

[VERIFIED: check-phase-49.mjs V-49-18; 50-CONTEXT.md D-03/D-09/D-24]

---

## Content Specifications

### 1. `00-overview.md` — Admin Setup Overview

**Role:** Entry point for admin-setup-linux/ 6-file guide. Provides setup sequence and DPO-03 back-link.

**Template analog:** `docs/admin-setup-macos/00-overview.md` (Mermaid setup-sequence + guide list; 6 files numbered 00-05)

**Key differences from macOS template:**
- `platform: Linux` (not `platform: macOS`)
- `applies_to: both` / `audience: admin`
- Setup sequence: 00-overview → 01-intune-linux-agent → 02-enrollment-profile → {03-compliance-policy, 04-app-delivery, 05-conditional-access} fan-out
- DPO-03 back-link sentence near top pointing to `docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android` (not a duplicate section)
- NO `## For Admins Familiar with...` H2 (validator negative-asserts this)
- Mermaid diagram optional (CD-02); recommended shape:

```
graph LR
  A[0. Overview] --> B[1. Agent<br/>Install]
  B --> C[2. Enrollment<br/>Profile]
  C --> D[3. Compliance<br/>Policy]
  C --> E[4. App<br/>Delivery]
  C --> F[5. Conditional<br/>Access]
```

**Validator checks:** File exists, DPO-03 back-link present, DPO-03 H2 NOT present, C10 frontmatter, TBD scan.

[VERIFIED: macOS analog at docs/admin-setup-macos/00-overview.md lines 1-54; 50-CONTEXT.md CD-02/D-24]

---

### 2. `01-intune-linux-agent.md` — Intune Linux Client Installation

**Role:** Covers deb package install from packages.microsoft.com. Contains:
- PITFALL-3 callout: deb-vs-Snap (deb is GA; Snap is deprecated/preview)
- LIN-05 `> ⚠️ Known admin pitfall` callout for Identity Broker v2.0.2+ re-enrollment behavior
- DPO-01 back-link to `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints`

**Install commands:**
```bash
# Add packages.microsoft.com repository (Ubuntu 22.04)
wget -q https://packages.microsoft.com/config/ubuntu/22.04/prod.list \
  -O /etc/apt/sources.list.d/microsoft-prod.list
wget -q https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor \
  > /etc/apt/trusted.gpg.d/microsoft.gpg
sudo apt update
sudo apt install intune-portal

# Install on Ubuntu 24.04 — substitute 24.04 in repository URL
```

**LIN-05 pitfall callout body (D-13/DPO-01):**
```
> ⚠️ **Known admin pitfall — Identity Broker v2.0.2+ automatic re-enrollment**
>
> When the `intune-portal` package updates to include Identity Broker v2.0.2+,
> the device automatically re-registers with Intune and Entra ID, creating NEW
> Intune device IDs and NEW Entra device object IDs.
>
> **Admin actions required after Identity Broker upgrade:**
> - Review device-based Conditional Access assignments and filters that reference device IDs
> - Review Entra dynamic device groups with device-ID-based membership rules
> - Verify Entra group memberships for devices that received the update
>
> For the version-breakpoint context, see
> [Non-version Breakpoints — Identity Broker v2.0.2+](../linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints).
```

**Diagnostic commands (MEDIUM confidence — not in Microsoft Learn; from STACK.md):**
```bash
# Check installed package version
dpkg -l intune-portal

# View identity broker service status
journalctl -xe --unit microsoft-identity-broker

# View Intune check-in timer
systemctl --user status intune-agent.timer
```

[VERIFIED: STACK.md lines 44-65; 49-VERIFICATION.md DPO-01; 50-CONTEXT.md D-24]

---

### 3. `02-enrollment-profile.md` — Enrollment Profile Admin Config

**Role:** Admin-side enrollment configuration. Mirrors macOS analog's 5 H2 structure (D-08).

**Template analog:** `docs/admin-setup-macos/02-enrollment-profile.md` — 5 H2s: Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also

**H2 structure (D-08 locked):**
1. `## Prerequisites` — Intune Plan 1+ license, Entra P1 license, devices on Ubuntu 22.04/24.04
2. `## Steps` — Create compliance policy, optionally configure CA policy scoped to Linux (web-app CA only)
3. `## Verification` — Device checklist showing enrollment state, policy assignment
4. `## Configuration-Caused Failures` — Common misconfig → symptom → resolution table
5. `## See Also` — Cross-links to compliance guide, CA guide, end-user file

**Cross-link to end-user file (D-10 mandatory):**
```markdown
> **For end users:** Personal-device or self-enrolling users follow
> [Linux Intune Portal Enrollment](../end-user-guides/linux-intune-portal-enrollment.md).
> This guide covers admin-side enrollment configuration only.
```

**Licensing prerequisites (HIGH confidence):**
- Microsoft Intune Plan 1 or Plan 2 (device license)
- Entra ID P1 (required for Conditional Access; optional if not using CA)
- No bulk enrollment; no DEM account support; no userless/kiosk mode; one-device-per-user

[VERIFIED: STACK.md lines 38-42; macOS template 02-enrollment-profile.md lines 17-23]

---

### 4. `03-compliance-policy.md` — Linux Compliance Policy

**Role:** Covers all 4 settings-catalog compliance categories. Opens with PITFALL-2 architectural callout.

**PITFALL-2 callout (MUST appear in opening section):**
```markdown
> **Linux CA constraint:** Intune compliance policies on Linux report device state to Intune
> but do NOT unlock the `Require device to be marked as compliant` grant in Entra Conditional
> Access. Only web-app CA (browser-based sign-in + compliant browser requirement) is available
> on Linux. See [admin-setup-linux/05-conditional-access.md](05-conditional-access.md) for
> the supported CA workflow.
```

**Template analog:** `docs/admin-setup-macos/05-compliance-policy.md` — opens with architectural callout ("Compliance vs Configuration" H2); format for the PITFALL-2 callout mirrors the macOS "No Intune security baselines" callout at lines 15-15.

**4 compliance categories (HIGH confidence from learn.microsoft.com/intune/device-security/compliance/ref-linux-settings updated 2026-04-16):**

| Category | Key Settings |
|----------|-------------|
| Allowed Distributions | Distro type (Ubuntu); min/max OS version |
| Custom Compliance | Bash script (exit code 0 = compliant; exit code 1 = non-compliant; JSON output for detail) |
| Device Encryption | dm-crypt presence check; `/boot` and `/boot/efi` excluded from encryption requirement |
| Password Policy | Min length, min uppercase, min lowercase, min symbols, min digits |

**Custom Compliance Bash script contract (MEDIUM confidence — Microsoft Learn compliance docs):**
```bash
#!/bin/bash
# Exit 0 = compliant; exit 1 = non-compliant
# Optionally write JSON to stdout for discovery values:
# {"Disk":"encrypted","PasswordAge":"30"}
if <condition>; then
  echo '{"Status":"compliant"}'
  exit 0
else
  echo '{"Status":"non-compliant","Detail":"disk not encrypted"}'
  exit 1
fi
```

**Device Encryption detection:** Intune checks dm-crypt subsystem presence via compliance policy evaluation. `/boot` and `/boot/efi` partitions are EXCLUDED — only the root volume encryption state is checked.

[VERIFIED: STACK.md lines 82-89; PITFALLS.md Pitfall 2 lines 40-48; macOS 05-compliance-policy.md lines 13-28]

---

### 5. `04-app-delivery.md` — App Delivery

**Role:** PITFALL-1 scope callout + concept-level overview. No deep Bash walkthrough (LIN-DEFER-01).

**PITFALL-1 opening callout (MUST appear near top):**
```markdown
> **Linux app delivery scope:** Intune does NOT deliver `.deb` packages, snap packages, or any
> binary installer format to Linux devices. There is no Win32, MSIX, `.pkg`, or APK analog for
> Linux. App delivery is **script-based only** — Bash shell scripts are assigned as device
> configuration and run on the device. Intune manages compliance (whether the app is present and
> correctly configured) but does not provide the app binary. See the
> [Supported Management Surface](../linux-lifecycle/00-enrollment-overview.md#supported-management-surface)
> for the canonical capability boundary.
```

**Content scope (CD-07 — at most 1 minimal Bash example):**
- Explain the admin workflow: write Bash detection/installation script → assign via Intune Scripts blade
- Note that the Bash deep-dive is deferred to v1.5.1 (LIN-DEFER-01)
- Optional 1 minimal example: `apt list --installed | grep -q "^app-name/"` as a detection pattern

[VERIFIED: PITFALLS.md Pitfall 1 lines 11-28; 50-CONTEXT.md CD-07]

---

### 6. `05-conditional-access.md` — Conditional Access

**Role:** Web-app CA via Edge 102.x+ ONLY. No device-level CA H2 section.

**Key content:**
- Web-app CA mechanism: When a user opens a web resource in Edge and CA policy requires a compliant browser + compliant device, Edge presents a sign-in challenge. The device must be enrolled and compliant in Intune.
- No native app CA: Native Linux apps cannot be protected by device-level CA.
- No `Require device to be marked as compliant` CA grant: Explicitly state this is NOT supported on Linux.
- Edge install on Ubuntu 22.04/24.04:
  ```bash
  # Add Microsoft Edge repository
  curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
  sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
  sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/microsoft.gpg] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list'
  sudo apt update && sudo apt install microsoft-edge-stable
  # Version 102.x+ required; current stable well above this floor
  ```

[VERIFIED: STACK.md lines 90-92; PITFALLS.md Pitfall 2; 50-CONTEXT.md D-02/D-24]

---

### 7. `linux-intune-portal-enrollment.md` — End-User Enrollment Guide

**Role:** LIN-06 5-step end-user walkthrough. NEW file. Audience: end-user.

**Template analog:** `docs/end-user-guides/android-work-profile-setup.md` — frontmatter, H2 structure, cross-link to admin file.

**Frontmatter:**
```yaml
---
last_verified: 2026-04-27
review_by: 2026-06-26
audience: end-user
platform: Linux
applies_to: enrollment
---
```

**H2 structure (D-09 locked — 5 H2s mirroring Android end-user precedent):**
1. `## What is Linux Intune Enrollment?` (or equivalent intro) — plain-language explanation
2. `## Before you start` — prerequisites: Ubuntu 22.04 or 24.04 LTS, GNOME desktop, organization credentials
3. `## Enroll your device` — 5 steps: install Edge → install intune-portal deb → sign in to Intune Portal → complete compliance remediation → sign into Edge with org account
4. `## Verify enrollment` — how to confirm enrollment state (intune-portal GUI, compliance status)
5. `## Get help` — L1 helpdesk contact + what to tell them

**Cross-link to admin file (D-10 mandatory):**
```markdown
> **For administrators:** If you administer Intune and are configuring Linux enrollment policy,
> see [admin-setup-linux/02-enrollment-profile.md](../admin-setup-linux/02-enrollment-profile.md).
```

**Step 3 Enroll your device body (LIN-06 5 actions):**
1. Install Microsoft Edge 102.x+: `sudo apt install microsoft-edge-stable`
2. Install intune-portal: `sudo apt install intune-portal` (from packages.microsoft.com)
3. Open intune-portal (GUI application), sign in with org account
4. Follow compliance remediation prompts (if device is non-compliant, intune-portal shows what needs fixing)
5. Open Edge, sign in with org account to access org resources

[VERIFIED: android-work-profile-setup.md lines 1-8; 50-CONTEXT.md D-07/D-09]

---

### 8. `linux-capability-matrix.md` — Win|Linux Bilateral Matrix

**Role:** LIN-13. Bilateral Win|Linux comparison. 10 H2s per D-06.

**Frontmatter:** `platform: Linux` / `audience: admin` / `applies_to: both` / 60-day cycle.

**Template analog:** `docs/reference/macos-capability-matrix.md` — 2-col Win|macOS table; 5 domain H2s + Key Gaps + See Also. Linux adds CA as its own H2 (D-02) and adds Cross-Platform Equivalences H2.

**6 Domain H2 cell content (selected key cells; HIGH confidence from Phase 49 whitelist):**

**## Enrollment**
| Feature | Windows | Linux |
|---------|---------|-------|
| Zero-touch enrollment | Autopilot (hardware hash to Intune) | Not supported |
| Hybrid Entra Join | Yes (APv1 + Intune Connector) | Not supported |
| Enrollment mechanism | User-driven, Pre-provisioned, Self-deploying | Supported — user-initiated via `intune-portal` only |
| Bulk enrollment | Yes (pre-provisioning, token-based) | Not supported |

**## Configuration**
| Feature | Windows | Linux |
|---------|---------|-------|
| Configuration profiles (settings catalog) | Yes — extensive | Not supported |
| DDM | No | Not supported |
| Custom compliance scripts | Yes (PowerShell) | Partial — Bash scripts only |

**## App Deployment**
| Feature | Windows | Linux |
|---------|---------|-------|
| Binary app delivery (Win32/MSI/MSIX) | Yes | Not supported |
| Script-based delivery | Yes (PowerShell) | Supported — Bash scripts only |

**## Compliance**
| Feature | Windows | Linux |
|---------|---------|-------|
| Compliance settings breadth | Extensive (Defender, BitLocker, firewall, etc.) | Partial — 4 settings-catalog categories |
| Hardware attestation (TPM) | Yes | Not supported |
| CA compliance grant | Yes (`Require device compliant`) | Not supported — web-app CA only |

**## Software Updates**
| Feature | Windows | Linux |
|---------|---------|-------|
| MDM-managed update enforcement | Yes (WUfB) | Not supported |
| OS update policy | Yes | Not supported |

**## Conditional Access**
| Feature | Windows | Linux |
|---------|---------|-------|
| Device-level CA grant | Yes | Not supported — web-app CA only |
| Web-app CA via Edge | Yes | Supported — Microsoft Edge 102.x+ required |
| Native app CA | Yes (MAM + CA) | Not supported |

**## Cross-Platform Equivalences (3 pairs, D-12 through D-15)**

Pair 1 (D-13 rephrased):
```
| Linux `intune-portal` deb + `microsoft-identity-broker` systemd unit | macOS Microsoft Intune Company Portal app + IntuneMDMDaemon LaunchAgent |
```
Body: `microsoft-identity-broker` is system-scope (handles Entra device registration); `intune-agent.timer` is user-scope (triggers periodic check-ins). The macOS side: Company Portal is the user-visible app; IntuneMDMDaemon is the system-scope LaunchAgent that handles MDM check-ins. The mapping is structural — both platforms have a user-visible enrollment app paired with a background daemon; the scope and mechanism differ.

Pair 2 (D-14):
```
| Linux `intune-agent.timer` user-scope check-in | iOS APNs-triggered MDM check-in cycle |
```
Body: Structural mapping only — both are the "device-side mechanism by which compliance is re-evaluated on a schedule." Linux uses a user-scope systemd timer (polling); iOS uses APNs push notifications (event-driven). Transport mechanism diverges fundamentally: timer-poll vs APNs-push.

Pair 3 (D-15, required by LIN-13):
```
| Linux web-app CA (Microsoft Edge 102.x+) | iOS MAM-WE (Managed App Without Enrollment) |
```
Body: Both are "compliance-lite" patterns that protect org data without requiring device-level CA enforceability. Linux web-app CA is a BROWSER-CHALLENGE mechanism (Edge verifies enrollment + compliance at sign-in). iOS MAM-WE is an APP-LAYER selective-wipe model (app-level policies without full MDM enrollment). The mapping is structural — both deliver org-data protection without device-level CA — but the architectural mechanism is entirely different.

[VERIFIED: 50-CONTEXT.md D-13/D-14/D-15; _glossary-linux.md anchor lines 80/86/92/108 per 50-CONTEXT.md D-16; _glossary-macos.md anchor lines 68/101 per 50-CONTEXT.md D-16]

---

### 9. `check-phase-50.mjs` — Phase 50 Validator

**Role:** AUDIT-06 validator-as-deliverable. File-reads-only, no shared module.

**Pattern source:** `check-phase-49.mjs` (direct ancestor per D-23).

**Estimated check count: 26 checks (V-50-01 through V-50-26)**

| Check ID | What it Checks | Decision |
|----------|---------------|----------|
| V-50-01 through V-50-07 | All 8 content files exist at locked paths | D-24 file-existence |
| V-50-08 | admin-setup-linux/ directory has EXACTLY 6 files (00-05) | D-24 |
| V-50-09 | 02-enrollment-profile.md has H2s: Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also | D-08 |
| V-50-10 | 02-enrollment-profile.md does NOT contain end-user H2s (2A/2B/2C guard) | D-08/D-24 |
| V-50-11 | linux-intune-portal-enrollment.md has 5 H2 strings per D-09 | D-09 |
| V-50-12 | Cross-link: admin file → end-user file | D-10 |
| V-50-13 | Cross-link: end-user file → admin file | D-10 |
| V-50-14 | linux-capability-matrix.md has 6 domain H2s + Cross-Platform Equivalences + Key Gaps Summary + See Also + Version History (10 H2s total) | D-06 |
| V-50-15 | CA domain H2 Linux column cell reads `Not supported — web-app CA only` | D-02/D-24 |
| V-50-16 | Linux column closed-set check (extends V-49-07) | D-04 |
| V-50-17 | ≥3 paired rows in Cross-Platform Equivalences H2 (corrected SC#4 floor) | D-12/D-17 |
| V-50-18 | 01-intune-linux-agent.md LIN-05 back-link to Phase 49 anchor | DPO-01 |
| V-50-19 | 01-intune-linux-agent.md `> ⚠️ Known admin pitfall` blockquote present | LIN-05/D-24 |
| V-50-20 | PITFALL-3 callout: 01-intune-linux-agent.md contains "deprecated" or "preview" applied to Snap | D-24 |
| V-50-21 | PITFALL-1 callout: 04-app-delivery.md contains "script-based only" or "no Win32" near top | D-24 |
| V-50-22 | PITFALL-2 callout: 03-compliance-policy.md contains `Require device to be marked as compliant` AND "not available"/"not supported" | D-24 |
| V-50-23 | DPO-03: 00-overview.md contains back-link to Phase 49 cross-platform bridge anchor | D-24/DPO-07 |
| V-50-24 | DPO-03 negative: 00-overview.md does NOT contain `## For Admins Familiar with Windows / macOS / Android` H2 | D-24/DPO-07 |
| V-50-25 | C10 frontmatter: platform: Linux + 60-day cycle + audience correctness on all 8 files | D-03/D-09/D-24 |
| V-50-26 | No TBD/TODO/PLACEHOLDER in any of the 8 content files | v1.2 retro discipline |

**Note:** Checks V-50-01 through V-50-07 may be combined into a single C10 file-existence check over the file list. Total count adjusts accordingly (24-28 per D-23 estimate).

[VERIFIED: 50-CONTEXT.md D-23/D-24; check-phase-49.mjs full file]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| intune-portal delivered via Snap | intune-portal delivered via deb (APT from packages.microsoft.com) | Preview→GA transition ~2023-2024 | All documentation must use apt install; Snap is deprecated/preview |
| Ubuntu 20.04 LTS supported | Ubuntu 20.04 LTS dropped | Intune 2508 — August 2025 | Only document 22.04 and 24.04 as supported |
| Identity Broker Java-based (pre-v2.0.2) | Identity Broker v2.0.2+ (architecture change) | Current intune-portal package | Triggers automatic re-enrollment; admin pitfall (LIN-05) |
| 3-column (Win\|macOS\|iOS\|Android) comparison | 2-column bilateral Win\|Linux for LIN-13 | Phase 50 decision | Per REQUIREMENTS line 155 "bilateral" mandate; Phase 58 owns 5-platform comparison |

**Deprecated/outdated:**
- Snap-based intune-portal installation — do not document
- Ubuntu 20.04 as a supported platform — document as end-of-support only (Phase 49 matrix)
- Device-level CA on Linux — document as "Not supported" explicitly (never was supported)

---

## Assumptions Log

> All claims in this research were verified against the v1.5 research corpus (SUMMARY.md, PITFALLS.md, STACK.md), locked CONTEXT.md decisions (D-01 through D-26), Phase 49 VERIFICATION.md, and direct codebase inspection. No claims rely solely on training data.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Identity Broker v2.0.2+ triggers automatic re-enrollment with new device IDs | Content Specifications §2 | Low — verified HIGH confidence from STACK.md lines 41-43 citing Microsoft Learn Linux deployment guide 2026-03-31 |
| A2 | Bash custom compliance exit code semantics (0 = compliant, 1 = non-compliant) | Content Specifications §4 | Medium — MEDIUM confidence source; executor should verify against current Microsoft Learn compliance/ref-linux-settings page |
| A3 | `/boot` and `/boot/efi` excluded from Device Encryption compliance check | Content Specifications §4 | Medium — MEDIUM confidence source; verify against current Microsoft Learn compliance settings page |
| A4 | Edge for Linux install command (packages.microsoft.com approach) | Content Specifications §6 | Low — GA delivery path; packages.microsoft.com is the standard Microsoft repository |
| A5 | intune-agent.timer is user-scope (not system-scope) | Code Examples §V-50 + D-13/D-14 | Low — verified against `_glossary-linux.md` line 82 per DISCUSSION-LOG.md W-CRIT-3 analysis |

**Claims A2 and A3** are tagged [ASSUMED] in the sense that the executor should do a spot-check against the current Microsoft Learn compliance settings reference page before writing the compliance guide body prose, as these details can change with Intune service releases.

---

## Open Questions (RESOLVED)

1. **Edge for Linux exact CA challenge mechanism**
   - What we know: Web-app CA via Edge 102.x+ is the supported mechanism; device must be enrolled and compliant
   - What's unclear: Exact browser-challenge flow (does Edge call an Entra endpoint to verify compliance at sign-in, or is the challenge triggered by the CA policy in the resource's app registration?)
   - **RESOLVED:** Document the observable admin-side behavior (CA policy with "Require compliant browser" grant + Linux device enrolled) rather than the internal mechanism. Cite Microsoft Learn platform-guide-linux for CA scope. Internal mechanism is out of scope for admin-facing documentation; the observable behavior is sufficient for the SC#2 PITFALL-2 architectural callout.

2. **intune-portal GUI screens for compliance remediation (end-user step 4)**
   - What we know: intune-portal is a GNOME GUI app; it shows enrollment and compliance state
   - What's unclear: Exact UI flow when device is non-compliant — are there actionable remediation buttons, or is it informational only?
   - **RESOLVED:** Write end-user step 4 as "intune-portal will show which compliance requirements are not met; resolve each (e.g., enable disk encryption, set a stronger password) and re-check." Keep it instructional rather than UI-screenshot-dependent. v1.0–v1.4.1 docs are markdown-only / no embedded screenshots policy applies; UI-screenshot dependency is out of scope.

3. **Custom Compliance JSON output schema**
   - What we know: Bash scripts can write JSON to stdout for discovery values; exit 0/1 for compliant/non-compliant
   - What's unclear: Whether the JSON key names in stdout are arbitrary or must match Intune settings names
   - **RESOLVED:** Write the Bash example with a generic `{"Status":"compliant"}` pattern and note that the exact schema is documented in Microsoft Learn custom compliance scripts reference (LIN-DEFER-01 scope). Keep the Phase 50 compliance guide at concept level for the Bash mechanism. Deep-dive (including JSON schema specifics) is explicitly deferred to v1.5.1 per LIN-DEFER-01.

---

## Environment Availability

> Phase 50 is documentation-only with no external service dependencies. The validator (`check-phase-50.mjs`) requires only Node.js 20.x, which is confirmed available in the CI environment (`.github/workflows/audit-harness-v1.5-integrity.yml` line 30: `node-version: '20'`).

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js 20.x | check-phase-50.mjs runtime | ✓ | 20 (CI) | — |
| `.github/workflows/audit-harness-v1.5-integrity.yml` | CI registration | ✓ | pre-registered with lazy-skip (lines 101-115) | — |
| `v1.5-milestone-audit.mjs` | Pre-commit gate step 2 | ✓ | shipped Phase 48 | — |
| `regenerate-supervision-pins.mjs` | Pre-commit gate step 3 | ✓ | shipped Phase 48; self-test exits 0 post Phase 49 | — |
| `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints` | LIN-05 callout back-link | ✓ | Phase 49 V-49-12 PASS | — |
| All 6 glossary anchors (D-13/D-14/D-15 pairs) | Cross-Platform Equivalences | ✓ | Phase 49 D-16 verified | — |

**Missing dependencies with no fallback:** None — all dependencies are available.

[VERIFIED: audit-harness-v1.5-integrity.yml lines 101-115; 49-VERIFICATION.md V-49-12; 50-CONTEXT.md D-16]

---

## Validation Architecture

> `workflow.nyquist_validation` is absent from `.planning/config.json` — treated as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | check-phase-50.mjs (Node.js ESM, file-reads-only pattern) |
| Config file | none — standalone validator, no config file |
| Quick run command | `node scripts/validation/check-phase-50.mjs` |
| Full suite command | `node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/check-phase-50.mjs` |

### Validation Dimensions

Phase 50 is documentation-content-only (no executable application code). The 8 validation dimensions below map to the structural integrity properties the phase must satisfy.

**Dimension 1 — Doc Structural Integrity (H2 pinning)**

Verifies that each content file has the exact H2 headings specified in locked decisions. An H2 missing or renamed breaks downstream cross-references (Phase 51 runbooks, Phase 58 comparison doc, Phase 59 hub nav).

| File | H2 Set | Decision |
|------|--------|----------|
| 02-enrollment-profile.md | Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also | D-08 |
| linux-intune-portal-enrollment.md | 5 H2s per D-09 | D-09 |
| linux-capability-matrix.md | 10 H2s per D-06 | D-06 |
| 00-overview.md through 05-conditional-access.md | File-exists + no forbidden H2s | D-24 |

Automated command: `node scripts/validation/check-phase-50.mjs` (V-50-09, V-50-11, V-50-14)

**Dimension 2 — Cross-Reference Correctness (cross-link literals)**

Verifies that the two mandatory cross-links (D-10) are present in BOTH directions. A missing cross-link means users following the wrong audience file won't be directed to the correct one.

| Source File | Literal String Required | Decision |
|------------|------------------------|----------|
| 02-enrollment-profile.md | `../end-user-guides/linux-intune-portal-enrollment.md` | D-10 |
| linux-intune-portal-enrollment.md | `../admin-setup-linux/02-enrollment-profile.md` | D-10 |

Automated command: `node scripts/validation/check-phase-50.mjs` (V-50-12, V-50-13)

**Dimension 3 — Frontmatter Compliance (C10 contract)**

Verifies `platform: Linux`, correct `audience` per file role, and 60-day `last_verified`/`review_by` cycle on all 8 content files. Required for the C10 blocking check in `v1.5-milestone-audit.mjs`.

Automated command: `node scripts/validation/check-phase-50.mjs` (V-50-25) + `node scripts/validation/v1.5-milestone-audit.mjs` (C10)

**Dimension 4 — Content Correctness (PITFALL callouts)**

Verifies that all 3 PITFALL callouts (PITFALL-1, PITFALL-2, PITFALL-3) are present and contain their required literal text. Missing callouts directly enable the failure modes that motivated them.

| File | Callout | Required Literal | Decision |
|------|---------|-----------------|----------|
| 04-app-delivery.md | PITFALL-1 scope | "script-based only" or "no Win32" | D-24 |
| 03-compliance-policy.md | PITFALL-2 CA constraint | `Require device to be marked as compliant` + "not available"/"not supported" | D-24 |
| 01-intune-linux-agent.md | PITFALL-3 deb-vs-Snap | "deprecated" or "preview" applied to Snap | D-24 |

Automated command: `node scripts/validation/check-phase-50.mjs` (V-50-20, V-50-21, V-50-22)

**Dimension 5 — Linux Column Closed-Set (3-status contract)**

Verifies that all Linux column cells in the 6-domain H2 tables of `linux-capability-matrix.md` use only `Supported`, `Partial`, or `Not supported` (with optional qualifier suffix). A 4th status string violates CDI-Phase50-03 and would break V-49-07's chain contract.

Automated command: `node scripts/validation/check-phase-50.mjs` (V-50-16)

**Dimension 6 — CA Cell Literal (PITFALL-2 inheritance)**

Verifies the exact cell phrasing `Not supported — web-app CA only` in the CA domain H2 Linux column. This is the Phase 49 V-49-08 precedent extended to Phase 50.

Automated command: `node scripts/validation/check-phase-50.mjs` (V-50-15)

**Dimension 7 — Anti-Duplication Guards (DPO-03 + 2A/2B/2C drift)**

Verifies that `00-overview.md` does NOT duplicate the Phase 49 bridge subsection H2, and that `02-enrollment-profile.md` does NOT contain end-user H2 strings. Negative assertions catch regression drift.

Automated command: `node scripts/validation/check-phase-50.mjs` (V-50-10, V-50-23, V-50-24)

**Dimension 8 — Audit Harness Compliance (v1.5-milestone-audit.mjs)**

Verifies the full Phase 50 commit passes the v1.5 milestone audit C1-C12 blocking checks with no new regressions. This is the integration gate before the final commit.

Automated command: `node scripts/validation/v1.5-milestone-audit.mjs --verbose`

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LIN-03 | Admin enrollment config guide (02-enrollment-profile.md) with 5 H2s + P1/P2 prereqs | Structural | `node scripts/validation/check-phase-50.mjs` V-50-09 | ❌ Wave 0 |
| LIN-04 | Compliance guide opens with PITFALL-2 callout; 4 categories covered | Content assertion | `node scripts/validation/check-phase-50.mjs` V-50-22 | ❌ Wave 0 |
| LIN-05 | LIN-05 pitfall callout in 01-intune-linux-agent.md with DPO-01 back-link | Content assertion | `node scripts/validation/check-phase-50.mjs` V-50-18, V-50-19 | ❌ Wave 0 |
| LIN-06 | End-user file exists with 5 H2s + cross-link to admin file | Structural | `node scripts/validation/check-phase-50.mjs` V-50-11, V-50-13 | ❌ Wave 0 |
| LIN-13 | Capability matrix bilateral Win\|Linux; 3-status closed set; ≥3 Equivalences pairs; CA cell literal | Structural + content | `node scripts/validation/check-phase-50.mjs` V-50-14 through V-50-17 | ❌ Wave 0 |
| AUDIT-06 | check-phase-50.mjs validator ships with content; CI registered | Execution | `node scripts/validation/check-phase-50.mjs` exits 0 | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `node scripts/validation/check-phase-50.mjs` (structural checks only)
- **Per wave merge:** `node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/check-phase-50.mjs`
- **Phase gate (pre-commit):** 8-step D-20 gate — all steps must pass before `git commit`

### Wave 0 Gaps

All Phase 50 content files are NEW. The validator (`check-phase-50.mjs`) is itself a Wave 0 deliverable. There are no existing test files to build upon.

- [ ] `scripts/validation/check-phase-50.mjs` — primary deliverable; covers all 8 content files; V-50-01 through V-50-26
- [ ] `docs/admin-setup-linux/00-overview.md` through `05-conditional-access.md` — 6 admin guide files
- [ ] `docs/end-user-guides/linux-intune-portal-enrollment.md` — end-user guide (NEW file)
- [ ] `docs/reference/linux-capability-matrix.md` — bilateral matrix (NEW file)
- [ ] 4 metadata corrections: ROADMAP line 119, ROADMAP line 188 (SC#4), REQUIREMENTS line 148 (LIN-06), REQUIREMENTS line 87 (AUDIT-06)

*(No pre-existing test infrastructure covers Phase 50 requirements — all Wave 0.)*

---

## Security Domain

> Phase 50 is documentation-only. No application code, no authentication flows, no data handling, no cryptographic operations. ASVS categories are not applicable to static documentation authoring. The security-relevant content of Phase 50 is:
>
> - PITFALL-2 callout prevents admins from misconfiguring CA policies (security architecture guidance)
> - PITFALL-3 callout ensures deb-only delivery path (supply chain hygiene documentation)
> - LIN-05 callout documents re-enrollment behavior that affects device-based CA assignment (identity security documentation)
>
> No ASVS controls apply to the Phase 50 artifact itself.

---

## Sources

### Primary (HIGH confidence)

- `check-phase-49.mjs` — direct ancestor for validator pattern (codebase inspection)
- `50-CONTEXT.md` — all 26 D-rules + 7 CD-rules + DPO-01 through DPO-07 (adversarial review output)
- `50-DISCUSSION-LOG.md` — W-CRIT-1/2/3 architectural corrections; 4 gray area verdicts
- `49-VERIFICATION.md` — Phase 49 close gate; DPO-01 through DPO-05; validator run output; all 6 pair anchors verified
- `49-PATTERNS.md` — concrete code excerpts for check-phase-49.mjs patterns
- `.planning/research/STACK.md` — intune-portal deb, systemd units, compliance categories, CA scope
- `.planning/research/PITFALLS.md` — Pitfall 1, 2, 3, 7, 12 — content specification drivers
- `docs/admin-setup-macos/00-overview.md`, `02-enrollment-profile.md`, `05-compliance-policy.md` — structural templates
- `docs/end-user-guides/android-work-profile-setup.md` — end-user file H2 template
- `docs/admin-setup-android/04-byod-work-profile.md` — admin-file-with-end-user-cross-link precedent
- `docs/reference/android-capability-matrix.md` lines 76-92 — Cross-Platform Equivalences H2 placement precedent
- `docs/reference/macos-capability-matrix.md` — bilateral Win|macOS matrix template
- `.github/workflows/audit-harness-v1.5-integrity.yml` lines 101-115 — check-phase-50 pre-registered
- `docs/linux-lifecycle/00-enrollment-overview.md` — Phase 49 whitelist + DPO-03 anchor target
- `docs/_glossary-linux.md` — anchor sources for all 3 equivalence pairs (lines 80, 86, 92, 108)
- `docs/_glossary-macos.md` — anchor sources for pairs 2 and 3 (lines 68, 101)

### Secondary (MEDIUM confidence)

- `https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-linux-settings` — 4 compliance categories (HIGH from SUMMARY.md confidence rating; included here as external reference)
- `https://learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux` — CA scope and general Linux surface
- `https://learn.microsoft.com/en-us/intune/intune-service/user-help/microsoft-intune-app-linux` — intune-portal install commands

### Tertiary (LOW confidence — flagged in Assumptions Log)

- Custom compliance Bash script JSON output schema — MEDIUM confidence; executor should verify against current Microsoft Learn compliance page
- intune-portal GUI compliance remediation flow — LOW confidence; Microsoft Learn does not document GUI screens in detail

---

## Metadata

**Confidence breakdown:**
- Standard stack (validator toolchain): HIGH — direct codebase inspection; all patterns from check-phase-49.mjs
- Architecture (file structure, H2 lists, cross-links): HIGH — locked decisions in 50-CONTEXT.md D-01 through D-26
- Content specifications (compliance categories, CA scope, pitfall callouts): HIGH — verified from v1.5 research corpus
- Cross-Platform Equivalences pair content: HIGH — D-13/D-14/D-15 locked; all 6 anchors verified in Phase 49
- Validator design (V-50-NN checks): HIGH — direct extension of check-phase-49.mjs patterns

**Research date:** 2026-04-27
**Valid until:** 2026-05-27 (30 days; documentation phase with locked content decisions)
