---
phase: 151-recipe-5-the-enterprise-update-plan
plan: 03
subsystem: docs
tags: [device-recipe, std-05, dfci, dell-bios, hp-connect, lenovo-tbct, m365-apps-channels, enterprise-app-management, reversibility-marker]

# Dependency graph
requires:
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-01 — docs/recipes/05-enterprise-update-plan.md created uncommitted at the locked eight-H2 skeleton, the Case 1 block anatomy, the restatement Source form, and the Prerequisites Dell BIOS-password entitlement gate that Step 4b cross-references"
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-02 — Steps 2 and 3 and the recipe's single Destructive rating; the class table-separator style and the 182-character blockquote high-water mark this plan had to author under"
  - phase: 149-firmware-bios-governance
    provides: "docs/operations/firmware-bios/00-overview.md, 01-windows-dfci.md, 02-dell-bios-configuration.md, 03-hp-bios-configuration.md, 04-lenovo-bios-configuration.md and docs/reference/firmware-oem-matrix.md — the custody routing, the DFCI OEM-list divergence, the Dell no-pre-existing-password blocker, the HP cloud-vault and Lenovo customer-held custody statements, and the Key Gaps enumeration"
  - phase: 147-linux-update-delivery
    provides: "docs/operations/patch-management/08-windows-app-updates.md — the six-channel comparison table with its Rollback-support row, the settings-catalog channel surface, and the Enterprise App Management reachability gates"
provides:
  - "docs/recipes/05-enterprise-update-plan.md Step 4 — the BIOS and firmware surface as a four-row Case 1 block carrying the recipe's single Effectively irreversible rating, with all four sibling branch bodies"
  - "Steps 4a, 4b, 4c and 4d — four sibling H3 branch bodies, each with a full Intune click-path, a named secret custody and a reconvergence sentence to Step 5; 4d is a substantive none body carrying the DFCI-unavailable-not-declined fact"
  - "docs/recipes/05-enterprise-update-plan.md Step 5 — the Microsoft 365 Apps update channel as a three-row Case 2 block rated at the recommended branch, with Current Channel's Not applicable rollback cell stated in full and attributed as inference"
  - "docs/recipes/05-enterprise-update-plan.md Step 6 — the application patch mechanism as a three-row Case 2 block with the no-rings / no-rollback and version-race consequences"
  - "The anchors decision-bios-firmware-surface, decision-m365-apps-channel and decision-app-patch-mechanism, and the sixth and last Windows-only marker"
affects: [151-04, 151-05, 152-integration-registry-navigation, 153-validator-harness]

# Actuals (#2632) — estimateTokens scale (chars/4 over the realized diff), not a harness token count.
actuals:
  tokens: 8070
  tasks: 3
  commits: 0

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Four-branch Case 1 block — one Step heading plus four sibling H3 branch bodies (a/b/c/d), each closing with the same one-line reconvergence sentence to the next Step"
    - "Per-branch custody clause — every BIOS branch body names who holds the secret in one clause before it names a console, so a reader evaluates custody before choosing"
    - "Recommended-branch rating (D-11) — the reversibility rating is stated in prose as a claim about the recommended branch, and the worse branch's consequence is written out in the same Step rather than allowed to raise the rating"

key-files:
  created: []
  modified:
    - docs/recipes/05-enterprise-update-plan.md

key-decisions:
  - "Step 4 carries the recipe's single Effectively irreversible rating, justified in the recipe's own prose against retirement rather than day-to-day operation: the custody chosen decides whether a device can be de-provisioned at all, and in all three custody models losing the management plane loses the secret"
  - "Step 5 is rated at the branch the plan recommends (Monthly Enterprise Channel, three-month rollback window), and the rating's scope is stated explicitly in prose so it does not read as a claim about Current Channel — which keeps RCP-02's count of one Effectively irreversible literally true while stating the default channel's absent rollback in full"
  - "The Dell Command Update versus Autopatch driver-policy conflict is one clause in Step 4b, named as unadjudicated, routed to 02-dell-bios-configuration.md and never to 06-windows-driver-firmware-updates.md, which carries zero Dell Command content"
  - "Enterprise App Management's reachability gates are stated as FIVE — the count guide 08 itself enumerates — not the eight the plan's read_first prose implied"
  - "Click-paths that the corpus does not verify to leaf-blade depth route to the nearest verified spine and tell the reader in the same numbered step to confirm the current blade, continuing the discipline Plans 01 and 02 established"

patterns-established:
  - "The none branch is authored as a real body: it states why the option exists (a capability absence, not a declined option), what the fleet gives up, what it keeps, and why the branch should still be recorded rather than left blank"
  - "A documented silence is written as a documented silence — HP's and Lenovo's absent key-loss recovery paths are named as undocumented rather than as impossible"

requirements-completed: [RCP-02]

coverage:
  - id: D1
    description: "Step 4 exists as a Case 1 block — the anchor decision-bios-firmware-surface, a single-line Ask-the-admin lead-in, the byte-exact Windows-only / Effectively-irreversible marker line, and a four-column Option/When to choose/Consequence if wrong/Branch table with exactly four option rows"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '<a id=\"decision-bios-firmware-surface\"' -> 1; 'Reversibility:** Effectively irreversible$' -> 1; Step 4 region grep -c '^|' -> 6 with 'Consequence if wrong' present"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-144.mjs -> 101 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
    human_judgment: false
  - id: D2
    description: "Effectively irreversible lands exactly once in the whole recipe, on Step 4, and Plan 02's single Destructive rating is undisturbed"
    requirement: "RCP-02"
    verification:
      - kind: other
        ref: "grep -c 'Reversibility:** Effectively irreversible$' -> 1; grep -c 'Reversibility:** Destructive$' -> 1; enum totals Reversible=2, Reversible — disruptive=2, Destructive=1, Effectively irreversible=1"
        status: pass
    human_judgment: false
  - id: D3
    description: "The Effectively irreversible rating's justification — that the wrong branch is unrecoverable at retirement time because losing the management plane loses the secret in all three custody models — is stated in the recipe's own prose and in every Consequence-if-wrong cell, not deferred to a link"
    requirement: "RCP-02"
    verification: []
    human_judgment: true
    rationale: "T-151-02's mitigation is that a reader who never follows a link still understands why the branch cannot be undone. A grep can prove the rating string is present; whether the retirement paragraph correctly separates the DFCI unlock-order failure from the Dell subscription-end failure and from the HP/Lenovo key-loss failure is a human read against three different guides."
  - id: D4
    description: "Step 4 carries four sibling H3 branch bodies as prose step sequences with full Intune click-paths, a named secret custody per branch and a reconvergence sentence to Step 5, and all four Branch-cell links resolve"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '^### Step 4[abcd]:' -> 4; grep -c '^### Step ' -> 14; grep -c '```' -> 0"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-nav-hub-links.mjs -> 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total — no failure names #step-4a-, #step-4b-, #step-4c- or #step-4d-"
        status: pass
    human_judgment: false
  - id: D5
    description: "Step 4d is a substantive none body (459 words) stating that DFCI is UNAVAILABLE on Dell, HP and Lenovo rather than declined, what the fleet gives up and what it keeps"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "Step 4d..Step 5 range: wc -w -> 459 (floor 60); grep -ci 'dfci' -> 2; the single new 'declined' occurrence is line 340, 'DFCI is unavailable on Dell, HP and Lenovo, not declined'"
        status: pass
    human_judgment: false
  - id: D6
    description: "Step 4b leads with the hard Dell blocker (devices must not already have a BIOS password), cross-references the Prerequisites gate rather than restating it, and names the DCU-versus-Autopatch conflict in one clause routed to the Dell guide"
    requirement: "RCP-02"
    verification:
      - kind: other
        ref: "Step 4b range: grep -ci 'BIOS password' -> 3; grep -c '02-dell-bios-configuration.md' -> 5; grep -c '06-windows-driver-firmware-updates.md' -> 0"
        status: pass
    human_judgment: true
    rationale: "T-151-04's mitigation is that the conflict is named without being adjudicated. The negative grep proves the wrong target is absent; whether the clause reads as an unadjudicated conflict rather than as tacit guidance is a semantic property only a human can confirm."
  - id: D7
    description: "Step 5 exists as a three-row Case 2 block rated at the recommended branch, with Current Channel's default status and its Not applicable rollback cell stated in full inside the Step and attributed as this corpus's inference, plus the one-channel-per-device constraint and the first-party Windows-only ground"
    requirement: "RCP-02"
    verification:
      - kind: other
        ref: "grep -c '<a id=\"decision-m365-apps-channel\"' -> 1; marker-line grep -> 2 (Steps 1 and 5); Step 5 region grep -c '^|' -> 5, 'Consequence if wrong' -> 0, 'Not applicable' -> 3, 'default' -> 5; 'setting-the-channel-from-intune' -> 1"
        status: pass
    human_judgment: true
    rationale: "D-46 compliance is semantic: that the source's Not applicable cell was not silently upgraded into a stronger claim. No grep distinguishes an attributed inference from an unattributed one — a human must read the paragraph."
  - id: D8
    description: "Step 6 exists as a three-row Case 2 block with the no-rings / no-rollback / no-automatic-uninstall-remediation consequence, the version-race consequence in the recipe's own prose, and the reachability-gate framing without inverting the Enterprise App Catalog positive"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '<a id=\"decision-app-patch-mechanism\"' -> 1; Step 6 region grep -c '^|' -> 5, grep -ci 'version race' -> 2; grep -c 'enterprise-app-management' -> 5; grep -c '^### Step 6[ab]:' -> 0"
        status: pass
    human_judgment: true
    rationale: "The plan's own prohibition is that the guidance must not invert — the catalog positive belongs in the When-to-choose cell and not only in the limitations. A count of 'version race' does not establish that the positive survived; a human must read the three When-to-choose cells."
  - id: D9
    description: "Six Windows-only markers, six anchors, fourteen Step headings, eight H2s unchanged, no code fence, no C11 anti-pattern literal, no numeric-prefix link shorthand, and no contiguous top-level blockquote run above 200 characters"
    requirement: "RCP-03"
    verification:
      - kind: other
        ref: "'^**Applies to:** Windows-only' -> 6; '<a id=' -> 6; '^### Step ' -> 14; '^## ' -> 8; '```' -> 0; 'Autopatch rings'/'SCCM'/'System Center' -> 0/0/0; numeric-prefix regex -> 0; node blockquote measurer -> 183"
        status: pass
      - kind: integration
        ref: "node scripts/validation/c17-eee-contract.mjs -> 236 files checked, 0 with violations; node scripts/validation/v1.20-milestone-audit.mjs -> exit 0, 16 passed, 0 failed"
        status: pass
    human_judgment: false
  - id: D10
    description: "No commit was made by this plan; docs/recipes/05-enterprise-update-plan.md is still untracked and no other file under docs/ was touched"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "git status --porcelain docs/ -> '?? docs/recipes/05-enterprise-update-plan.md' only, at every measurement point; git log --oneline -1 unchanged from 3ee55b44 through all three tasks"
        status: pass
    human_judgment: false

# Metrics
duration: 7 min
completed: 2026-08-26
status: complete
---

# Phase 151 Plan 03: BIOS Surface, Microsoft 365 Apps Channel and Application Patch Mechanism Summary

**Steps 4, 5 and 6 authored into the uncommitted recipe — the BIOS and firmware surface as a four-row Case 1 block carrying the artifact's single `Effectively irreversible` rating with all four branch bodies including a substantive "none" body, the Microsoft 365 Apps channel rated at the recommended branch so the default channel's absent rollback is stated in full without raising a second irreversible rating, and the application patch mechanism with its no-rings / no-rollback and version-race consequences.**

## Performance

- **Duration:** 7 min
- **Started:** 2026-08-26T13:45:06Z
- **Completed:** 2026-08-26T13:52:17Z
- **Tasks:** 3
- **Files modified:** 1 (`docs/recipes/05-enterprise-update-plan.md`, left uncommitted)

## Accomplishments

- **Step 4 — BIOS and firmware surface** authored as a Case 1 block: the anchor `decision-bios-firmware-surface`, a single-line `> **Ask the admin:**` lead-in, the byte-exact marker line `**Applies to:** Windows-only · **Reversibility:** Effectively irreversible`, a mandatory blank line, and a four-column `| Option | When to choose | Consequence if wrong | Branch |` table with exactly four option rows — DFCI, the Dell BIOS configuration policy, the vendor connector or Win32 tool, and none. Each Branch cell links to its sibling H3 by heading slug.
- **The `Effectively irreversible` rating is justified in the recipe's own prose, against retirement.** A dedicated paragraph states that the custody chosen at this Step decides whether a device can be de-provisioned at all, and that in all three custody models losing the management plane loses the secret — a DFCI device released in the wrong order keeps its locked UEFI menus through the wipe, the reinstall and the handover; a Dell device whose tenant subscription has ended has no Intune-side password retrieval left; an HP or Lenovo device whose key material is gone has no vendor-documented way back. The same consequence is carried in all four Consequence-if-wrong cells.
- **All four branch bodies authored as prose step sequences**, six numbered steps each, each with a full Intune click-path, each naming that vendor's **secret custody** in one clause, and each closing with the same one-line reconvergence sentence to Step 5.
- **Step 4a (DFCI)** leads with the two disqualifying gates in the order that actually disqualifies a fleet: the manufacturer list first (Dell, HP and Lenovo are on none of the three lists Microsoft publishes), then the registration channel — *exactly two of the four Autopilot registration channels this corpus tracks* confer the external attestation DFCI requires, and the online PowerShell variant is not one of them. It names the custody as the absence of a secret (public key cryptography, no local UEFI password), links `#bricking-irreversible` without re-authoring the bricking treatment, and writes the three-step retirement order into the reader's runbook while the profile still exists.
- **Step 4b (Dell)** leads with the hard blocker — devices must **not** already have a BIOS password configured, because the feature requires that Intune hold the password — and cross-references the `## Prerequisites` entitlement gate Plan 01 authored rather than restating it a second time. It names the custody (Intune holds the secret, inside your tenant), carries the verified partner-portal click-path, states the agent-before-policy ordering, and records the exit path: removing the password later is documented and non-destructive, unenrolling does **not** remove it, and what ends retrieval is the end of the subscription.
- **The DCU-versus-Autopatch conflict is one clause, unadjudicated, routed correctly.** Step 4b's final numbered step names Dell Command Update as an update client rather than a configuration tool, states that running it alongside an Intune or Autopatch driver policy is a genuine conflict *that no first-party page adjudicates*, and explicitly declines to pick a side. It routes to `../operations/firmware-bios/02-dell-bios-configuration.md`. `06-windows-driver-firmware-updates.md` appears **zero** times in the Step 4b range.
- **Step 4c (vendor connector or Win32 tool)** keeps the two vendors distinct rather than merging them: HP Connect is a **vendor connector, not a Win32 agent** and installs nothing on the device, with the secret in HP's own cloud vault outside the tenant; Lenovo has no native Intune policy surface and the secret is yours, as an encrypted configuration file or a private key in your own key vault. It carries the one genuinely verified HP path in the corpus — **Reports > Endpoint Analytics > Proactive Remediation**, where HP Connect's script packages land — together with HP's own latency warning, so an empty list on assignment day reads as unreported rather than failed.
- **Step 4d (none) is a real body, 459 words.** It states that **DFCI is unavailable on Dell, HP and Lenovo, not declined** — none of the three appears on any of the three published manufacturer lists, so there is no profile to assign and no licensing, firmware or configuration change that makes one apply — and says outright that this absence is why the vendor branches exist at all. It then states what the fleet gives up (nothing enforces boot order, port state or the UEFI menu lock), what it keeps (no secret is created so none can be lost; every other update surface stays governed), and why the branch should be recorded explicitly rather than left blank.
- **Step 5 — Microsoft 365 Apps update channel** authored as a Case 2 block: `**Applies to:** Windows-only · **Reversibility:** Reversible — disruptive`, a three-column `| Option | When to choose | Recorded as |` table with exactly three option rows, no fourth column and no branch bodies.
- **D-11's recommended-branch rule is stated in the Step, not just applied to it.** A paragraph says outright that the rating is assigned at Monthly Enterprise Channel and its three-month window and is *not* a claim about every branch — and that the branch which is not reversible is the default one. `Effectively irreversible` therefore stays at exactly one occurrence in the whole recipe while nothing is softened.
- **Current Channel's absent rollback is stated in full inside Step 5.** All three Rollback-support values are restated with the source's own wording preserved — **Not applicable** for Current Channel, **Three months** for Monthly Enterprise, **Two months** for Semi-Annual Enterprise — Current Channel is named as the default for Microsoft 365 Apps for enterprise and the subscription Project and Visio desktop apps, and the stronger reading is attributed explicitly as this corpus's inference drawn from those two words rather than as a first-party statement.
- **Step 5's Windows-only ground is first-party rather than asserted**: the channels overview states that update channels are device-specific and apply only to installations of Microsoft 365 Apps on devices running Windows, and that the channel does not follow the user from device to device. The one-channel-per-device constraint and its span across every subscription product on the device are stated, along with the real consequence — moving to a slower channel can take back features users have built work around. The post-July-2026 Semi-Annual cadence divergence is named as an unresolved documentation conflict and routed to guide 08 rather than resolved.
- **Step 6 — application patch mechanism** authored as a Case 2 block carrying `**Applies to:** Windows-only · **Reversibility:** Reversible` — the sixth and last Windows-only marker — with three option rows: Enterprise App Catalog auto-update, Enterprise App Catalog guided supersedence, and hand-packaged Win32 supersedence.
- **Step 6 states both halves without inverting either.** The Enterprise App Catalog positive is in the When-to-choose cell (least work per application; Microsoft keeps the version current), and the trade is stated immediately after: an add-on subscription in addition to Intune Plan 1 or Plan 2, a **Required** assignment (an Available assignment stays on the existing workflow), **no rings and no rollback**, and no automatic uninstall remediation. **Mixing mechanisms on one app causes a version race** is written in the recipe's own prose as the consequence of getting the decision wrong, with the mechanism spelled out — two deciders, and the installed version becomes a function of timing.
- **Sixteen per-claim `**Source:**` evidence lines** added, each covering one page only, in the restatement form Plan 01 established.

## Task Commits

**None. All three tasks committed no content, by design (D-52).**

`docs/recipes/05-enterprise-update-plan.md` remains **untracked in the working tree** for Plan 04 to expand and Plan 05 to land as Commit B. `git log --oneline -1` reads `3ee55b44` before Task 1 and after Task 3 — unchanged.

**Plan metadata:** committed separately, `.planning/` paths only, staged explicitly. Nothing under `docs/` was staged at any point.

## Files Created/Modified

- `docs/recipes/05-enterprise-update-plan.md` (modified, **UNCOMMITTED**) — 283 lines to **520 lines**, 62,551 characters. 237 added lines, all inside `## Steps`, between Step 3b's breaks-callout and `## Verification`.

## Requested Records

### The `check-nav-hub-links` failure list after each task

**Empty at every measurement point.** The verdict line after Task 1, Task 2 and Task 3 is identical:

```
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
```

The plan permitted an enumerated intermediate red confined to fragments Plans 04 and 05 still create. **None materialized**, for the third consecutive plan and for the same reason: no forward link to a not-yet-authored section was authored. Every reconvergence sentence names Step 5 in plain prose without a link, matching Plan 01's treatment of Step 10 and Plan 02's treatment of Step 4.

All the intra-recipe link targets this plan added resolve against content that already exists:

| Link added | Target | Resolves against |
|---|---|---|
| `#step-4a-dfci` | Step 4's Branch cell | `### Step 4a: DFCI` |
| `#step-4b-dell-bios-configuration-policy` | Step 4's Branch cell | `### Step 4b: Dell BIOS configuration policy` |
| `#step-4c-vendor-connector-or-win32-tool` | Step 4's Branch cell | `### Step 4c: Vendor connector or Win32 tool` |
| `#step-4d-no-bios-management` | Step 4's Branch cell | `### Step 4d: No BIOS management` |
| `#prerequisites` | Step 4b's cross-reference | the `## Prerequisites` heading slug |
| `#rollbackrecovery` | Step 5's cross-reference | the `## Rollback/Recovery` heading slug (the `/` is stripped by `githubSlug`, verified by reading `check-nav-hub-links.mjs:121-126` before authoring the link) |

### Longest contiguous top-level blockquote run

Measured with the plan's own node one-liner, over the whole file, at every point.

| Point | Longest run | Which |
|---|---|---|
| Plan 02 handoff (baseline) | 182 | Step 2's `> See:` line |
| Task 1, first draft | **190** | Step 4's breaks-callout |
| Task 1, after trim | 182 | Step 2's `> See:` line (unchanged) |
| After Task 2 | **183** | Step 5's `> See:` line |
| After Task 3 (final) | **183** | Step 5's `> See:` line |

Step 4's breaks-callout measured **190** on first authoring — 10 characters of headroom against the 200-character C17 cap, and above the shipped class maximum of 193 in spirit if not in fact. It was reworded down before the gate run rather than shipped at that margin (see Decision 5). Step 6's `> See:` line measures 156 and its breaks-callout 176. **Headroom at the end of this plan is 17 characters.**

### Running Step-heading, anchor and marker counts

| Point | `^### Step ` | `<a id=` | `^**Applies to:**` | `**Reversibility:**` |
|---|---|---|---|---|
| Plan 02 handoff | 7 | 3 | 3 | 3 |
| After Task 1 | 12 | 4 | 4 | 4 |
| After Task 2 | 13 | 5 | 5 | 5 |
| After Task 3 | **14** | **6** | **6** | **6** |
| Contract on the finished recipe | 18 | 10 | 9 | 9 |

`grep -c '^**Applies to:** Windows-only'` returns **6** — all six Windows-only decisions are now authored, satisfying D-17's count exactly and clearing RCP-03's floor of three with a margin of three. Plan 04's four remaining Steps carry `macOS, iOS and Android`, `Linux-only`, `All platforms` and (on Step 10) no marker at all.

### Running counts of the four Reversibility enum values

All anchored to end-of-line.

| Enum value | Plan 02 handoff | After Task 1 | After Task 3 | Contract on the finished recipe |
|---|---|---|---|---|
| `Reversible` | 1 | 1 | **2** | 5 |
| `Reversible — disruptive` | 1 | 1 | **2** | 2 |
| `Destructive` | 1 | **1** | **1** | **1** |
| `Effectively irreversible` | 0 | **1** | **1** | **1** |
| Total `**Reversibility:**` lines | 3 | 4 | **6** | 9 |

**Both RCP-02 named ratings have now landed, each exactly once**, on Steps 3 and 4 respectively. `Reversible — disruptive` has reached its final contracted count of 2 (Steps 1 and 5); Plan 04 adds the three remaining `Reversible` ratings.

### Current file line count against D-33's budget

**520 lines**, against D-33's 600-700 line budget for the finished artifact. Plan 04 adds four Steps (7, 8, 9 and the free-value 10) and Plan 05 completes `## Verification` (1 of 10 checks today), `## Rollback/Recovery` (1 of 9 mechanisms), `## Configuration-Caused Failures` (1 data row) and `## See Also`. The remaining work is roughly 130-180 lines, which lands the artifact inside the budget rather than over it.

### Confirmation that no commit was made

- `git log --oneline -1` returned `3ee55b44 docs(151-02): complete hotpatch posture and driver approval mode plan` before Task 1 and after Task 3's gate run.
- `git status --porcelain docs/` returns exactly one line at every point: `?? docs/recipes/05-enterprise-update-plan.md`.
- No `git add`, `git commit`, `git stash`, `git clean`, `git reset` or `git checkout` was run against any path under `docs/` at any point in this plan. No wildcard staging was used anywhere.
- The only commit this plan makes is the `.planning/`-only metadata commit that carries this SUMMARY.

## Gate Verdicts (verbatim)

Each gate was run as its own invocation from `D:/claude/Autopilot`.

| Gate | After Task 1 | After Task 2 | After Task 3 (final) |
|---|---|---|---|
| `node scripts/validation/check-phase-144.mjs` | not re-run (no committed change) | not re-run | `Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)` |
| `node scripts/validation/c17-eee-contract.mjs` | `236 files checked, 0 with violations, 0 total violations` | `236 files checked, 0 with violations, 0 total violations` | `236 files checked, 0 with violations, 0 total violations` |
| `node scripts/validation/v1.20-milestone-audit.mjs` | `16 passed, 0 failed, 0 skipped` (exit 0) | not re-run | `16 passed, 0 failed, 0 skipped` (exit 0) |
| `node scripts/validation/check-nav-hub-links.mjs` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` |

All thirteen C17 assertion counters read `0` at every point: `#1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0`.

## Decisions Made

1. **The `Effectively irreversible` rating is anchored to retirement in prose, not left implicit in the table.** FEATURES row D-4 gives the consequence as "wrong branch is unrecoverable at retirement time" without saying why, and the reason differs per branch. Rather than restate the phrase, Step 4 carries a paragraph that unifies the three custody models under one sentence — *losing the management plane loses the secret* — which is the Dell guide's own formulation and is true of DFCI's Autopilot record and of HP's and Lenovo's key material as well. This is what makes the rating legible to a reader who follows no link (T-151-02).

2. **Step 4b's Prerequisites cross-reference is a link to the gate, not a second copy of it.** D-35 requires the hard blocker to be *in the branch body* and simultaneously requires it not to be restated twice. The resolution shipped states the blocker in one sentence in the branch body — which is what a reader following the branch actually needs — and then names the `## Prerequisites` entry as the place it is recorded as an entitlement gate, saying outright that it "is stated there once and is not restated here". The substance appears once as a gate and once as a step instruction, which is the distinction the two sections exist to draw.

3. **The DCU conflict is the last numbered step in Step 4b, not a floating aside.** Putting it inside the ordered sequence, at the point after the policy exists, means it reads as an operational check rather than as guidance, which is what "unadjudicated" requires. The clause names it as a conflict "that no first-party page adjudicates" and says "this plan does not pick a side" — both explicit, so the absence of a recommendation is legible rather than looking like an oversight. Note that the Dell guide's own See Also line claims the conflict "is adjudicated at" guide 06; `[MEASURED]` `grep -c -i 'dell' docs/operations/patch-management/06-windows-driver-firmware-updates.md` returns **0**, so that claim is false and D-64 is correct. This recipe routes to the Dell guide and does not propagate the false routing. The Dell guide's own line is a pre-existing defect outside this plan's scope and is recorded below.

4. **Enterprise App Management's gates ship as FIVE, not eight.** The plan's `<read_first>` prose for Task 3 says "all eight of its first-party limitations live there". `[MEASURED]` guide 08's `#enterprise-app-management` section opens with the literal sentence *"Five reachability gates apply together"* and then enumerates exactly five: licensing, application types, hosting and installation, cloud environments, and assignment intent. Step 6 restates the guide's own count. Writing "eight" would have asserted a count the linked section contradicts on its first line — a `[MEASURED]`-versus-`[PREMISE]` failure of exactly the kind this milestone has been burned by.

5. **Step 4's breaks-callout was reworded before the gate run rather than shipped at 190 characters.** The first draft measured 190 against a 200-character hard cap, leaving 10 characters — above the shipped class maximum of 193 in risk terms, and the kind of margin that makes a later single-word edit anywhere in the run a gate failure. It was cut to 172, leaving the file's high-water mark where Plan 02 left it. Plan 02's hand-forward explicitly asked for this measurement; the measurement is worth nothing if a marginal result is accepted rather than acted on.

6. **Three click-paths route to a verified spine and tell the reader to confirm the leaf blade.** `[MEASURED]` the corpus records no blade path for the DFCI profile, for the Dell BIOS configuration Templates policy, or for the Microsoft 365 Apps settings-catalog policy — the guides carry surface names and role requirements, not navigation. Steps 4a, 4b and 5 therefore route to `**Intune admin center** > **Devices**` and say in the same numbered step to confirm the current blade, with the same explicit framing Plan 02 used: this plan fixes the decision and the policy object, not the admin center's blade layout. Where the corpus *does* verify a path it ships verbatim — Dell's `Devices > Manage devices > Partner portals > Dell Management Portal > Connect now` and HP's `Reports > Endpoint Analytics > Proactive Remediation`.

7. **Step 6 names the Microsoft Store as a fourth path in prose rather than as a fourth table row.** FEATURES row D-6 gives three branches and the acceptance criteria count three option rows, but guide 08's routing order has four entries and a reader whose application is in the Store would be mis-served by a three-row table presented as exhaustive. The boundary is stated in prose with the routing link, so the table stays at three rows and the guidance stays true.

8. **`#rollbackrecovery` was verified against the slugifier before being written.** `## Rollback/Recovery` contains a `/`, which the double-hyphen slug trap (verified gate fact 11) makes worth checking rather than assuming. `check-nav-hub-links.mjs:121-126` strips every character outside `[a-z0-9 _-]` before replacing spaces, so the slash is removed entirely and the slug is `rollbackrecovery`, not `rollback-recovery`. The link resolves; the checker confirms it.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] All three table row-count acceptance criteria are off by one against the shipped separator style**

- **Found during:** Tasks 1, 2 and 3 (acceptance-criteria verification)
- **Issue:** The criteria read `... | grep -c '^| '` returns `6` for Step 4 (header, separator, four option rows) and `5` for Steps 5 and 6 (header, separator, three option rows). That arithmetic counts the separator row, but the shipped recipe-class separator — `|---|---|---|` — does not start with `| `. This is the identical defect Plan 02 recorded and the executor prompt's carry-forward rule 4 predicted in advance.
- **Fix:** No content change. The class separator style was kept. The property each criterion grades — one header, one separator, four (respectively three) option rows — is proved with `grep -c '^|'`, which returns exactly the criterion's stated value.
- **Files modified:** none
- **Verification:** Step 4 range `grep -c '^|'` returns **6** (`^| ` returns 5); Step 5 range returns **5** (`^| ` returns 4); Step 6 range returns **5** (`^| ` returns 4). The column-shape half of each criterion passes exactly as written: `Consequence if wrong` occurs 1 time in the Step 4 range and 0 times in the Step 5 range.
- **Committed in:** n/a (correction of record only)

**2. [Rule 1 - Bug] The `declined` acceptance criterion is falsified by Step 3, which Plan 02 already shipped**

- **Found during:** Task 1 (acceptance-criteria verification)
- **Issue:** The criterion states that if `grep -ci 'declined'` returns a hit, "that hit must be inside Step 4d and must be part of the not-declined framing". `grep -ci 'declined'` returns **5**. Four of the five are pre-existing and entirely legitimate: Step 3 and its branch bodies use *Declined* as the name of an Intune driver approval status (lines 197, 198, 203, 245 — "paused drivers and declined drivers", "once an update is *Approved* it can never be *Declined*"). The criterion was written as though Step 4d would be the only occurrence in the file.
- **Fix:** No content change — the four Step 3 occurrences are the correct product terminology and removing them would falsify Step 3. The criterion's real requirement was verified against the Step 4d range specifically.
- **Files modified:** none
- **Verification:** The single occurrence this plan added is line 340, inside Step 4d: *"**DFCI is unavailable on Dell, HP and Lenovo, not declined.**"* — the not-declined framing exactly as D-30 requires. No occurrence anywhere in the file asserts that a vendor declined DFCI.
- **Committed in:** n/a (correction of record only)

**3. [Rule 1 - Bug] The plan's `<read_first>` count of Enterprise App Management limitations contradicts the guide it points at**

- **Found during:** Task 3 (reading `08-windows-app-updates.md#enterprise-app-management`)
- **Issue:** The plan's Task 3 `<read_first>` says "all eight of its first-party limitations live there". The section's own opening sentence reads *"Five reachability gates apply together"* and enumerates five. Writing "eight" into the recipe would have asserted a count the linked section contradicts on its first line.
- **Fix:** Step 6 states **five**, matching the guide. The five are named inline (subscription, application types, Microsoft-hosted storage reachability, cloud environments, assignment intent) so the count is checkable by the reader, and the link carries the full treatment.
- **Files modified:** `docs/recipes/05-enterprise-update-plan.md`
- **Verification:** `sed -n '/<a id="enterprise-app-management"/,/<a id="microsoft-store-apps"/p' docs/operations/patch-management/08-windows-app-updates.md | grep -c 'Five reachability gates apply together'` returns 1.
- **Committed in:** n/a (uncommitted by design, D-52)

**4. [Rule 2 - Missing Critical] Step 4's breaks-callout shipped at 190 characters and was cut**

- **Found during:** Task 1 (blockquote measurement)
- **Issue:** The first draft's `> **What breaks if misconfigured:**` run measured 190 against the hard 200-character C17 cap. It passed, but it would have made the file's high-water mark 190 and left Plans 04 and 05 with 10 characters of headroom on a file they both still edit.
- **Fix:** Reworded to 172 characters with no loss of content — both the admin-visible and user-visible symptoms are still named. The file's high-water mark stayed at Plan 02's 182 until Step 5's `> See:` line raised it to 183.
- **Files modified:** `docs/recipes/05-enterprise-update-plan.md`
- **Verification:** The node blockquote measurer returns **183** over the whole file, at line 425 (Step 5's `> See:` line). Step 4's callout is no longer the maximum.
- **Committed in:** n/a (uncommitted by design, D-52)

### Deliberate Scope Choices (not defects)

**5. No forward link to Step 5 was authored.** All four Step 4 branch bodies reconverge with `Continue to Step 5, which decides the update channel for the Microsoft 365 Apps installed on these same devices.` — plain prose, no link, matching Plans 01 and 02. D-31 requires a reconvergence sentence, not a reconvergence link. The link checker consequently stays at 0/0 through this wave instead of entering the permitted enumerated-red state.

**6. Step 6 names a fourth application surface in prose.** See Decision 7. The table stays at exactly three option rows as the plan specifies; the Microsoft Store path and the WinGet non-path are named in a prose paragraph with the routing link, so a three-row table is not presented as an exhaustive account of Windows application patching.

**7. Sixteen `**Source:**` lines ship.** Eight in Step 4 and its branch bodies (the retirement consequence, the custody routing, the DFCI OEM list twice, the Dell BIOS custody, the Dell agent prerequisites, HP's delivery model, Lenovo's delivery model), four in Step 5 and four in Step 6. Each covers one page only. Two Dell and one HP and one Lenovo source line carry the vendor's own date label (`Last Modified`, `Version 1.2.0, published`) rather than `updated`, because that is how the source page states it and how the corpus guide restates it — fidelity to the source's own label was preferred over a uniform template word.

---

**Total deviations:** 4 auto-fixed (3 criterion/count corrections, 1 measured margin cut) plus 3 recorded scope choices.
**Impact on plan:** None on scope. Deviations 1 and 2 are arithmetic and scoping errors in the acceptance criteria rather than defects in the artifact, and both are discharged with a corrected command. Deviation 3 corrects a count in the plan's own input prose against the guide it cites — a correction that strengthens the artifact's accuracy against the source it links. Deviation 4 is a margin decision the previous plan's hand-forward explicitly asked for. Steps 4, 5 and 6 are exactly what the plan specified.

## Issues Encountered

- **The Dell BIOS guide's own See Also line carries a false routing claim.** `docs/operations/firmware-bios/02-dell-bios-configuration.md:267-270` states that running Dell Command Update alongside Intune driver policies "is a real conflict this corpus already adjudicates at" `06-windows-driver-firmware-updates.md#unsupported-callouts`. `[MEASURED]` `grep -c -i 'dell' docs/operations/patch-management/06-windows-driver-firmware-updates.md` returns **0** — that guide contains no Dell content of any kind, so it adjudicates nothing about Dell Command Update. This is the exact defect D-64 was written to stop this recipe from inheriting, and this recipe does not inherit it. **The defect in the Dell guide itself is out of scope for this plan** (this phase edits no operations guide, and linking into one is not editing it). It is recorded here as a deferred item for a future firmware-bios maintenance phase; no validator can see it, because both the source and target files exist and the anchor resolves.
- **Pre-existing working-tree dirt was not swept into any commit.** `.planning/config.json`, `.planning/jira/mapping.json` and the untracked `.agents/`, `.obsidian/`, `e1`, `e2`, `ee`, `skills-lock.json`, `.planning/milestone.lock`, `.planning/research/PER-OEM-BIOS-GAP.md` and three stray `*-PATTERNS.md` files were all present before this plan started and remain untouched. The metadata commit staged explicit `.planning/` paths only.
- **The corpus records no blade for three of this plan's five click-path destinations.** Resolved as Decision 6 rather than by inventing locations.

## Known Stubs

`docs/recipes/05-enterprise-update-plan.md` remains **intentionally incomplete** — this is the phase design, not a defect. The state after this plan:

| Stub | Location | Resolved by |
|---|---|---|
| `## Steps` carries 6 of 10 Steps and 8 of 8 branch bodies | lines 71-495 | Plan 04 (Steps 7, 8, 9, 10) |
| No Verification entry for Steps 2 through 6 | `## Verification`, 1 of 10 checks | Plan 05 (D-37) |
| No Rollback/Recovery entry for hotpatch uninstall, driver updates, the Autopatch driver mode switch, DFCI, the Dell BIOS password or Enterprise App Catalog auto-update | `## Rollback/Recovery`, 1 of 9 mechanisms | Plan 05 (D-41, D-42) |
| No Configuration-Caused Failures row for Steps 2 through 6 | 1 data row | Plans 04, 05 |
| `<a id=` count is 6 of the contracted 10 | n/a | Plan 04 |
| `**Reversibility:**` count is 6 of the contracted 9 | n/a | Plan 04 |
| `## See Also` carries 3 of the class-measured 5-6 entries | lines 516-520 | Plan 05 (D-66) |
| No registry row for `RE-227`, no filename-map row, no canary bump, no index entry | n/a | **Phase 152** (INT-01/INT-04) |

The file is left uncommitted precisely so this incomplete state never enters git history (D-52). One `stub` entry was appended to `.planning/WINDOWS.md` covering the unauthored Steps and partial sections.

## Threat Flags

None. No file created or modified in this plan introduces a network endpoint, an auth path, a file-access pattern or a schema change. The honest threat surface is what the published recipe tells an administrator to do:

- **T-151-02** (recommending a BIOS or firmware branch that cannot be undone at retirement) — mitigated. Rated `Effectively irreversible`; the retirement consequence is in the recipe's own prose and in all four Consequence-if-wrong cells; the "none" branch is a 459-word body carrying the DFCI-unavailable-not-declined fact; the Dell branch leads with the no-pre-existing-BIOS-password blocker; each of the four branches names its secret custody in one clause before it names a console.
- **T-151-01** (overstating Microsoft 365 Apps rollback) — mitigated. The source's `Not applicable` cell is preserved with its own wording, all three channels' rollback windows are restated, and the stronger reading is attributed explicitly as this corpus's inference drawn from those two words.
- **T-151-06** (a vendor branch routing to a credential-custody path without naming who holds the secret) — mitigated. Step 4a names the absence of a secret; 4b names Intune; 4c names HP's cloud vault and Lenovo's customer-held key material separately rather than merging them; 4d names that no secret is created at all.
- **T-151-04** (adjudicating the DCU-versus-Autopatch conflict) — mitigated, and reinforced: the false adjudication claim in the Dell guide's own See Also line was found and deliberately not propagated. `06-windows-driver-firmware-updates.md` occurs 0 times in the Step 4b range.
- **T-151-SC** (package-manager installs) — accepted, not applicable. No install command was run.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Ready for 151-04.** The uncommitted recipe carries Steps 1, 1a, 1b, 2, 3, 3a, 3b, 4, 4a, 4b, 4c, 4d, 5 and 6 — every Windows-only decision in the plan. Plan 04 appends Steps 7, 8, 9 and the free-value Step 10, and must not commit.
- **All eight branch bodies now exist.** D-29's count is discharged in full: Step 1 has two, Step 3 has two, Step 4 has four. Plan 04's four Steps are all Case 2 or Case 3 and add no branch bodies, so `grep -c '^### Step '` goes from 14 to 18 by Step headings alone.
- **Both RCP-02 named ratings have landed, each exactly once.** `RCP-02` is marked Complete because Plan 03 is the last of the three plans declaring it. **One caveat for the verifier:** RCP-02's full contract also requires that exactly **nine** ratings exist on the finished recipe, and only six exist today — Plan 04 adds the last three. The two named ratings are countable now; the total is not. Re-run `grep -c '**Reversibility:**'` after Plan 04 rather than treating the Complete flag as settling it.
- **The commit contract is intact.** Commit A (`285a65d5`) still holds exactly two files. Commit B is Plan 05's. HEAD is unchanged by this plan's content work.
- **All four gates are at their measured baselines.** Apex 101/0/0, C17 236/0, milestone audit exit 0, link checker 0/0.
- **Blocker for the next executor:** the per-task commit default must stay overridden. Any executor that commits `docs/recipes/05-enterprise-update-plan.md` before Plan 05 destroys the D-52 design.
- **Hand-forward for Plan 04:** blockquote headroom is **17 characters** — Step 5's `> See:` line sits at 183. Measure every new run with the node one-liner and cut anything above 185 rather than accepting it, as this plan did at Step 4.
- **Hand-forward for Plan 04:** the file is at **520 lines** against D-33's 600-700 budget. Four Steps remain plus Plan 05's four section completions; roughly 130-180 lines of headroom.
- **Hand-forward for Plan 05 (D-42):** `## Rollback/Recovery` now owes entries for DFCI (unlock before wipe, delete the Autopilot record last; if already stuck, refresh management from the UEFI menu) and for the Dell BIOS password (set *Disable per-device BIOS password protection* to Yes and let the policy apply **before** unenrolling; subscription end means contacting the OEM) and for Enterprise App Catalog auto-update (no rollback, no automatic uninstall remediation). Steps 4 and 6 state the consequences but do not author the recovery mechanisms.
- **Deferred defect for a future firmware-bios phase:** `02-dell-bios-configuration.md:267-270` claims guide 06 adjudicates the Dell Command Update conflict; guide 06 contains zero Dell content. Out of scope here; see Issues Encountered.

## Self-Check: PASSED

**Modified files exist on disk:**

- `docs/recipes/05-enterprise-update-plan.md` — FOUND (520 lines, 62,551 characters, LF-terminated, untracked as designed)
- `.planning/phases/151-recipe-5-the-enterprise-update-plan/151-03-SUMMARY.md` — FOUND

**Commits:**

- No content commit exists or should exist. `git log --oneline -1` = `3ee55b44`, unchanged across all three tasks.
- The `.planning/`-only metadata commit carrying this SUMMARY is the sole commit made by this plan.

**All plan `<verification>` commands re-run and logged** in the Gate Verdicts table above. Every task acceptance criterion was executed; the three criteria that did not return their stated values are documented as Deviations 1, 2 and 3, each with the corrected command and the proof that the property being graded holds.

---
*Phase: 151-recipe-5-the-enterprise-update-plan*
*Completed: 2026-08-26*
