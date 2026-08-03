# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- 🚧 **v1.19 Device Configuration Recipes #3 & #4 (Windows Multi-App Kiosk + Android Dedicated)** — Phases 135-138 (in progress)
- ✅ **v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure** — Phases 129-134 (shipped 2026-07-20)
- ✅ **v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)** — Phases 126-128 (shipped 2026-07-11)
- ✅ **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** — Phases 120-125 (shipped 2026-07-10)
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** — Phases 113-119 (shipped 2026-07-06)
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** — Phases 101-112 (shipped 2026-07-02)
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** — Phases 96-100 (shipped 2026-06-29)
- ✅ **v1.12 macOS MDM-Migration Verification Closure** — Phases 94-95 (shipped 2026-06-26)
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** — Phases 89-93 (shipped 2026-06-26)
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** — Phases 83-88 (shipped 2026-06-24)
- ✅ **v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation** — Phases 75-82 (shipped 2026-06-22)
- ✅ **v1.8 Tooling Debt Closure + Chain-Resilience Hardening** — Phases 71-74 (shipped 2026-06-08)
- ✅ **v1.7 Deferred Backlog Closure + Validator Chain Hardening** — Phases 67-70 (shipped 2026-05-29)
- ✅ **v1.6 Apple Business Delegated Governance & Multi-Org Operations** — Phases 62-66 (shipped 2026-05-25)
- ✅ **v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup** — Phases 48-61 (shipped 2026-05-07)
- ✅ **v1.4.1 Android Enterprise Completion & v1.4 Cleanup** — Phases 43-47 (shipped 2026-04-25)
- ✅ **v1.4 Android Enterprise Enrollment Documentation** — Phases 34-42 (shipped 2026-04-24)
- ✅ **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-33 (shipped 2026-04-19)
- ✅ **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (shipped 2026-04-15)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)

## Phases

- [x] **Phase 135: Recipe #3 — Windows 11 Multi-App Kiosk** - Custom OMA-URI / hand-authored AssignedAccess XML recipe, cross-linking recipe 01's single-app case without touching it (completed 2026-08-02)
- [ ] **Phase 136: Recipe #4 — Android Dedicated MHS Multi-App** - Anchor spot-verification + MHS app-configuration recipe filling the `## Steps`/Verification/Anti-Feature gap in `05-dedicated-devices.md`
- [ ] **Phase 137: Integration & Navigation-Last Close** - Both recipes registered, published, and discoverable
- [ ] **Phase 138: V118 Pin + 17th Path-A Lineage Bump + Terminal Close** - Mandatory harness lineage bump + 3-axis re-audit + close-gate (BLOCKED on owner's PIPE-02 push)

<details>
<summary>✅ v1.0–v1.18 (Phases 1-134) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure** (Phases 129-134) — SHIPPED 2026-07-20 — `.planning/milestones/v1.18-ROADMAP.md`
- ✅ **v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)** (Phases 126-128) — SHIPPED 2026-07-11 — `.planning/milestones/v1.17-ROADMAP.md`
- ✅ **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** (Phases 120-125) — SHIPPED 2026-07-10 — `.planning/milestones/v1.16-ROADMAP.md`
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** (Phases 113-119) — SHIPPED 2026-07-06 — `.planning/milestones/v1.15-ROADMAP.md`
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** (Phases 101-112) — SHIPPED 2026-07-02 — `.planning/milestones/v1.14-ROADMAP.md`
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** (Phases 96-100) — SHIPPED 2026-06-29 — `.planning/milestones/v1.13-ROADMAP.md`
- ✅ **v1.12 macOS MDM-Migration Verification Closure** (Phases 94-95) — SHIPPED 2026-06-26 — `.planning/milestones/v1.12-ROADMAP.md`
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ v1.0–v1.10 (Phases 1-88) — see milestone entries and `.planning/milestones/`

</details>

## Phase Details

### Phase 135: Recipe #3 — Windows 11 Multi-App Kiosk

**Goal**: An Intune admin can follow a linear happy-path recipe from zero to a working, verified Windows 11 multi-app kiosk delivered through the AssignedAccess CSP `Configuration` node — the only first-party mechanism, since the Templates GUI's "Multi app kiosk" option is Windows-10-only.
**Depends on**: Nothing (first phase of v1.19)
**Requirements**: KIOSK-01, KIOSK-02, KIOSK-03, KIOSK-04, KIOSK-05, HYG-05
**Success Criteria** (what must be TRUE):

  1. `docs/recipes/03-*.md` walks a linear happy path: Autopilot enrollment → kiosk account → apps pre-installed → `AssignedAccessConfiguration` XML authored → pushed via an Intune Custom profile (OMA-URI) to `./Vendor/MSFT/AssignedAccess/Configuration` → verification, with the single-app case as a one-line cross-link to `docs/recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration` and zero edits to that file.
  2. The worked XML field set is bounded and schema-valid (`AllAppsList`/`AllowedApps`, `Taskbar`/`ShowTaskbar`, minimal `v5:StartPins` with the Windows 11 22H2 floor stated), with `BreakoutSequence`, managed folders, and `v5:TaskbarLayout` excluded on correctness grounds and a 3-row namespace/version-floor table present.
  3. The recipe embeds the kiosk account model decision block and an anti-feature table covering CA/MFA hard-breaking sign-in, the Windows-11-wrong-GUI trap, group-`Configs`-requires-`AllAppList`, nested `UserGroup`, hardcoded AUMIDs, `Configuration` silently superseding `KioskModeApp`, SharedPC layering, and `AssignedAccess/Status` (not deliverable as a verification mechanism).
  4. A `## Rollback/Recovery` section exists between `## Verification` and `## Configuration-Caused Failures`, documented as a named divergence from the recipe template, bounded to first-party facts (Settings self-service removal ≠ rollback, un-blockable shortcuts, Autopilot Reset caveat).
  5. Verification is admin-executable end-to-end: restricted Start menu with only allow-listed apps, a non-allow-listed app failing to launch, a secondary app flow completing without an app-blocked error, and a clean `AssignedAccess > Operational` event log — with `AppNotFound` named as a prerequisite symptom, not a status check.
  6. `docs/_standards/EEE-SOP-standard.md`'s fenced-content rationale at `:462`/`:496-497` is corrected to state the true mechanism (fenced content is indexed but as poorly-retrieving non-prose runs), resolving the self-contradiction at `:415`, with the normative D-03/D-04 rules untouched.

**Plans**: 2/2 plans complete

- [x] `135-01-PLAN.md` — wave 1. HYG-05's three fenced-content-rationale sites in `EEE-SOP-standard.md` (incl. the additive `:538-539` site) + the dated v1.19 `## Version History` row; the four D8.2 `Operational`-precondition appends and the three named requirement/research corrections; and the RE-224 file identity — sentinel-free frontmatter, EEE block, H1 and Summary, proving C17 goes 232 → 233 files at 0 violations.
- [x] `135-02-PLAN.md` — wave 2, `depends_on: 135-01`. Authors the recipe body: Scope banner, Prerequisites, the anti-feature table, `## Steps` (account-model Case-1 block, two-scope step, the single column-0 `xml` payload fence plus the field-decomposition and 3-row namespace tables, the custom-OMA-URI delivery step), `## Verification`, the named `## Rollback/Recovery` divergence, `## Configuration-Caused Failures` and `## See Also`.

**Discuss-phase flags**: RE-224 XML presentation format (DOMINANT — column-0 fence vs. field-decomposition table; must be ruled before Steps-section drafting); `## Rollback/Recovery` template-divergence disposition; E2's verification mechanism (event log vs. observable-behavior-only); Windows enrollment-path fork (self-deploying vs. user-driven); per-branch Windows edition floors; first-lander precedent (this phase sets the delta-vs-anchor convention Phase 136 inherits, since v1.19 has no foundation phase).

**Hard constraints**: Zero edits to `docs/recipes/01-shared-windows-avd-client.md` — `check-phase-130.mjs:64,67` pins its Step 5a/5b headings as literal strings against live HEAD inside every apex chain; `A-LOCK-1`/v1.18 ROADMAP SC2 bars trimming the bodies. The Plan-1 mechanism gate at `PROJECT.md:17` is already discharged by `.planning/research/STACK.md:13-16` (GATE 1 CONFIRMED) — this phase records the discharge and re-cites fresh at authoring time; it does not re-litigate the gate and gets no dedicated gate plan.

### Phase 136: Recipe #4 — Android Dedicated, MHS Multi-App

**Goal**: An Intune admin can follow a linear happy-path recipe from zero to a working MHS multi-app dedicated device, with the `## Steps`/Verification/Anti-Feature scaffold that `05-dedicated-devices.md` structurally lacks, authored strictly as a delta cross-linking everything the anchor already owns.
**Depends on**: Nothing structurally (different platform than Phase 135, zero cross-dependency); sequenced after Phase 135 per `use_worktrees:false` sequential-on-main-tree execution and the first-lander precedent set there
**Requirements**: MHS-01, MHS-02, MHS-03, MHS-04, MHS-05, HYG-06
**Success Criteria** (what must be TRUE):

  1. `docs/recipes/04-*.md` supplies the missing `## Steps`/`## Verification`/Unsupported-and-Anti-Feature scaffold plus an inlined, recipe-scoped MHS app-deployment step with a concrete click-path, while enrollment-profile deltas, token types, provisioning methods, Knox/Zero-Touch exclusion, exit-PIN sync, and Android 15 FRP are cross-linked (never re-authored) from `05-dedicated-devices.md`.
  2. The Case-1 decision block is the irreversible token-type choice (Standard vs. Entra SDM, SDM as a routing cross-link only), and a second fork covers the four-way provisioning method with its CRITICAL Knox/Zero-Touch mutual exclusion; the exit-PIN sync requirement ships `[MEDIUM: MS Q&A community]` with only the date refreshed.
  3. A Case-2 sign-in-mode block covers `enable_mhs_signin` FALSE (worked default) / TRUE+Other / TRUE+Entra ID, anchored on the documented Entra-ID default and its real first-party negative, with any `[ASSUMED]` note shipped as a split blockquote per the `01:101`/`01:103` idiom.
  4. Exit-lock-task hardening (max-attempts + retry-delay) is physically separated from the sign-in section, carries the silent no-op dependency verbatim as a `What breaks if misconfigured` callout, states no unit for the retry-delay integer, and demotes `Enable easy access debug menu` to a Verification line.
  5. The recipe leads with its unsupported/anti-feature set documented with reasons — Notification-windows=Disable phrased conditionally, folders trimmed to the uncontradicted user-capability half, plus exposed system navigation, per-identity personalization on a sign-in-disabled device, and unavailable Wi-Fi/first-time-Enterprise-network actions.
  6. `05-dedicated-devices.md`'s specific cross-linked facts (token-type semantics, MHS Required-assignment, exit-PIN two-policy locations) are spot-verified against current Microsoft Learn before authoring depends on them, with any drift landing as a named correction (v1.18 HYG-04 pattern) or the no-op recorded explicitly.

**Plans**: 1/2 plans executed

- [x] 136-01-PLAN.md
- [ ] 136-02-PLAN.md

- [ ] `136-01-PLAN.md` — wave 1. HYG-06 spot-verification of the three SC6 clusters plus the PLUS list against current Microsoft Learn, with a NO-DRIFT/DRIFT branch taken and the no-op recorded explicitly; the two surviving Plan-1-gated conditionals closed (the `exit_lock_task_mode_code` fence-key branch with both conflicting live Learn statements quoted, and the `max_number_of_attempts_for_session_PIN` sibling closure); four flagged `v1.19-DEFERRED-CLEANUP.md` contributions drafted so no deferral leaves the phase without a landing spot; and the RE-225 file-identity shell, proving full-corpus C17 goes 233 → 234 at 0 violations between waves.
- [ ] `136-02-PLAN.md` — wave 2, `depends_on: 136-01`. Authors the recipe body: Scope banner, Prerequisites with the `This recipe is NOT` opener, the 9-10-row anti-feature table, six `### Step` sections carrying five STD-05 decision blocks (1 Case-1 token type, 2 Case-2 provisioning/sign-in, 2 Case-3), the inlined MHS and app-deployment click-paths, the single column-0 ```` ```json ```` fence in the confirmed `kind`/`productId`/`managedProperty` envelope plus its decomposition table, the exit-PIN cross-link with one marked host sentence and the hardening delta, then `## Verification` (7 lines), the named `## Rollback/Recovery` divergence, `## Configuration-Caused Failures` and `## See Also`.

If Plan 1 surfaces material drift, it is handled as a named requirement in the v1.18 HYG-04 pattern — no third plan is pre-allocated.

**Discuss-phase flags**: RE-225 fork taxonomy ("Case-1b" vs. "Case-2" naming — pick one); C17 `#11` row budget (do surviving anti-feature rows merge into one table and cross the >25-data-row threshold); shared conceptual anchor (kiosk/dedicated taxonomy — where it can live given the pin minefield, folding into `4-platform-capability-comparison.md` ruled out regardless); first-lander precedent (inherited from Phase 135's landing).

**Hard constraints**: Zero line-shifting edits to `docs/_glossary-android.md` and `docs/reference/android-capability-matrix.md` (365 and 139 pin coordinates across 16 frozen sidecars). If unavoidable, a scoped CARVE-1 option (a) coordinate re-pin is the named budgeted contingency — never option (b), never discovered mid-execution.

### Phase 137: Integration & Navigation-Last Close

**Goal**: Both recipes are registered, published, and discoverable — the doc-class integration is proven end-to-end on real content, and the WR-01 defect class (table-without-quick-nav-bullet) is closed proactively.
**Depends on**: Phase 135 AND Phase 136 (both recipes must be content-complete and C17-clean first — navigation-last discipline; CLOSE-AFTER-CONTENT)
**Requirements**: CLASS-05, CLASS-06
**Success Criteria** (what must be TRUE):

  1. Both recipes carry RE-NNN registry rows in `docs/_registry/RE-index.md` (IDs read from the registry at plan time, starting after RE-223), flip to `Status: Approved`, and enter the publish set via a regenerated (never hand-edited) `filename-map.md`.
  2. `build-filename-map.mjs --self-test`'s row-count drift-canary is bumped 223 → 225 in the SAME commit as the filename-map regeneration.
  3. `docs/index.md` gains both the Device Configuration Recipes table rows AND the prose quick-nav bullet near line 38, landed in the same commit (closing the WR-01/Phase-132 defect pattern via a validator needle asserting both).
  4. The troubleshooting-hub disposition (`common-issues.md`/`quick-ref-l1.md`/`quick-ref-l2.md` staying not-wired to `docs/recipes`) is an explicit recorded ruling, not a silent carry-forward — reassessed given kiosk-lockout and MHS exit-PIN lockout are materially more L1-adjacent than AVD/iPad were.
  5. Full-corpus C17 exits 0; link-checker exits 0/0.

**Plans**: TBD

**Discuss-phase flags**: None dominant — `V-132-HUBSNOTWIRED` re-confirmation is a named ruling task, not an open design question.

**Hard constraints**: The WR-01 defect class (index.md table lands without the line-38 quick-nav bullet) recurred once already (Phase 132) — both surfaces land in the same commit, verified by a new validator needle rather than relying on code review.

### Phase 138: V118 Pin + 17th Path-A Lineage Bump + Terminal Close

**Goal**: The milestone closes with the mandatory back-anchor pin, the 17th harness lineage bump, and a 3-axis re-audit — the sole deliverable cluster of this phase, per project convention.
**Depends on**: Phase 137 (all content + integration work complete and green before the closing lineage bump + re-audit; mirrors Phase 100/112/119/125/128/134 exactly — harness close never batches with content). Additionally BLOCKED on the owner's PIPE-02 push landing on `origin/master` — a hard go/no-go precondition, not a soft assumption.
**Requirements**: HARN-14, HARN-15, HARN-16
**Success Criteria** (what must be TRUE):

  1. `_lib/frozen-at-close.mjs` gains the **V118** entry (v1.18 close-gate SHA `7af8a147` positively confirmed reachable post-push via dual-token grep, SUBJECT LINE verified per the v1.17 false-positive caveat) + `readAtV118Close` export — only after the owner's plain push (no rebase/squash/force) has landed.
  2. `v1.19-milestone-audit.mjs` (Path-A from v1.18, C1-C17 inherited) + `v1.19-audit-allowlist.json` + BASELINE_23 + `check-phase-135..138.mjs` validators (apex extends `[48..137]`, independently derived, not copied from Phase 134) + the 16th CI coexistence workflow all exist and pass; predecessor frozen surfaces are byte-unchanged, `CHAIN_SKIP` empty, full predecessor chain run BEFORE the close-gate is authored.
  3. A 3-axis terminal re-audit (fresh `git clone --no-hardlinks` + cross-OS Linux GHA authoritative for both chain validators + fresh zero-context reproduction) achieves cross-OS PASS/FAIL/SKIP EXACT MATCH, and the publish bundle regenerates `--version=v1.19` under the `publish-bundle-gate.cjs` Stop-hook with both new recipes pandoc-convertible and `guard-docx.mjs`-clean.
  4. A single close-gate commit flips all 17 v1.19 requirements to Validated across PROJECT/ROADMAP/STATE/REQUIREMENTS, alongside `v1.19-MILESTONE-AUDIT.md` and `v1.19-DEFERRED-CLEANUP.md`.

**Plans**: TBD

**Discuss-phase flags**: None (closing cluster; consumes prior decisions).

**Hard constraints**: BLOCKED on the owner's PIPE-02 push — the v1.18 close-gate SHA `7af8a147` is on no remote, so the mandatory V118 pin has no valid target until it lands; record this as a hard go/no-go gate, not an assumption. V119 pin (freezing the v1.19 corpus) is explicitly OUT OF SCOPE — back-anchor circularity, the successor milestone's job.

## Progress

| Milestone | Phases | Status | Shipped |
|-----------|--------|--------|---------|
| v1.0 Autopilot Documentation & Troubleshooting Guides | 1-10 | ✅ Shipped | 2026-04-10 |
| v1.1 APv2 Documentation & Admin Setup Guides | 11-19 | ✅ Shipped | 2026-04-13 |
| v1.2 Cross-Platform Provisioning & Operational Gaps | 20-25 | ✅ Shipped | 2026-04-15 |
| v1.3 iOS/iPadOS Provisioning Documentation | 26-33 | ✅ Shipped | 2026-04-19 |
| v1.4 Android Enterprise Enrollment Documentation | 34-42 | ✅ Shipped | 2026-04-24 |
| v1.4.1 Android Enterprise Completion & v1.4 Cleanup | 43-47 | ✅ Shipped | 2026-04-25 |
| v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup | 48-61 | ✅ Shipped | 2026-05-07 |
| v1.6 Apple Business Delegated Governance & Multi-Org Operations | 62-66 | ✅ Shipped | 2026-05-25 |
| v1.7 Deferred Backlog Closure + Validator Chain Hardening | 67-70 | ✅ Shipped | 2026-05-29 |
| v1.8 Tooling Debt Closure + Chain-Resilience Hardening | 71-74 | ✅ Shipped | 2026-06-08 |
| v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation | 75-82 | ✅ Shipped | 2026-06-22 |
| v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL | 83-88 | ✅ Shipped | 2026-06-24 |
| v1.11 macOS PSSO End-to-End Provisioning & MDM Migration | 89-93 | ✅ Shipped | 2026-06-26 |
| v1.12 macOS MDM-Migration Verification Closure | 94-95 | ✅ Shipped | 2026-06-26 |
| v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth | 96-100 | ✅ Shipped | 2026-06-29 |
| v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure | 101-112 | ✅ Shipped | 2026-07-02 |
| v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1) | 113-119 | ✅ Shipped | 2026-07-06 |
| v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing | 120-125 | ✅ Shipped | 2026-07-10 |
| v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation) | 126-128 | ✅ Shipped | 2026-07-11 |
| v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure | 129-134 | ✅ Shipped | 2026-07-20 |
| v1.19 Device Configuration Recipes #3 & #4 (Windows Multi-App Kiosk + Android Dedicated) | 135-138 | 🚧 In progress | - |

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 135. Recipe #3 — Windows 11 Multi-App Kiosk | 0/2 | Not started | - |
| 136. Recipe #4 — Android Dedicated MHS Multi-App | 0/2 | Not started | - |
| 137. Integration & Navigation-Last Close | 0/TBD | Not started | - |
| 138. V118 Pin + 17th Path-A Lineage Bump + Terminal Close | 0/TBD | Not started | - |
