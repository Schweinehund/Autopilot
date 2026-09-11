# Requirements: v1.23 Walk-Up AVD Kiosk Class Follow-Through (L2 Triage, Host-Pool SSO, Licensing Standard) & Harness Close

**Defined:** 2026-09-10
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base. v1.23 turns the walk-up AVD kiosk pilot's carried observations and deferred follow-ups into corpus content an L2 engineer can act on, validated live on the pilot device.

**Milestone bar:** the kiosk class has an L2 triage runbook the hubs route to; its reference facts live in the corpus's reference surfaces with the right evidence labels; the host-pool SSO path, the licensing ruling, the vendored De-Bloat baseline and the ClickOnce outcome are recorded; the glossary carries the class's vocabulary; the `DEFER-121-07-A` record stops resurfacing; and both harness debts (`V122` back-anchor pin, v1.22 C17 frozen-aware residue) are discharged with the apex green at close and the result pushed and tagged.

**Scope origin.** Two backlog clusters from `.planning/milestones/v1.22-DEFERRED-CLEANUP.md`, owner-selected 2026-09-10: Part A's mandatory harness pair (`V122-PIN-DEFERRAL`, `C17-FROZEN-AWARE-RESIDUE-V22`) and Part C's two kiosk-class follow-up entries (`SEED-002` §B observed behaviours and §D deferred follow-ups). Research ran (`.planning/research/SUMMARY.md`, four dimensions, three quoted claims spot-checked against fetched Learn source bytes by the orchestrator).

**Owner rulings taken at milestone start (2026-09-10):**

1. **Pilot device and tenant are available.** Phases may include owner-run live checkpoints; observed behaviours are recorded as `[PILOT]`, never promoted to `[SOURCED]`.
2. **The licensing / hardware standard is undecided** — v1.23 authors the decision record and lands the ruling.
3. **New kiosk content lives in a numbered L2 runbook plus reference rows**, not inside the recipe alone, so the carried `HUB-WIRING-NON-BARRED-SURFACE` trigger is met (hubs route to the runbook, never to `docs/recipes` directly).
4. **De-Bloat is vendored with full GPL-3.0 compliance** (license text + attribution in `NOTICE`, modifications marked) — the existing MIT-shaped provenance pattern is extended, not reused as-is.
5. **Pillar B splits by content shape**: Credential Guard / CredSSP, Remote Help and CMG rows go into existing reference docs; the Windows App child-process table and the HP OEM inventory become RE-237 sections. **No new registry row.**
6. **Pillar C lands as an RE-237 delta step**, not a standalone admin-setup guide. **No new registry row.**

**Evidence labels.** `[MEASURED]` = a command was run against this repo and is named. `[SOURCED]` = a first-party page was fetched as source bytes with its visible `ms.date` recorded. `[PILOT]` = a behaviour observed on one HP device in one tenant during the 2026-08-27→30 build (RE-237's convention) — **not** `[SOURCED]`; the harness cannot validate it and no review may present it as first-party documentation. `[UNVERIFIED]` = could not be confirmed; **must not be written as fact in any deliverable**.

## v1.23 Requirements

Requirements for this milestone. Each maps to roadmap phases (Phase 160+).

### Triage — L2 kiosk block-dialog runbook (TRI)

`[MEASURED 2026-09-10]` `docs/l2-runbooks/` tops out at `33-8021x-radius-eap-investigation.md`; the new runbook is `34-`. `[SOURCED]` AppLocker event **8025** is the `Packaged app-Deployment` channel (the dialog-throwing class) and **8004** is the `EXE and DLL` channel (silent) — the two signatures the runbook must keep apart.

- [ ] **TRI-01**: An L2 engineer can open a new numbered runbook `docs/l2-runbooks/34-*.md` (EEE header block, `## Summary` first, actor-boundary and escalation-packet sections per the L2 convention) that triages the kiosk "blocked by your system administrator" dialog: AppLocker packaged-app event 8025 (dialog) versus 8004 / `RestrictRun` (silent, no dialog, does not log), attributed by sensor-timestamp correlation across a controlled reboot using the shipped `Detect-KioskAppBlocks-v6.ps1` sensor.
- [ ] **TRI-02**: The runbook states the autologon-account rotation rule — every Assigned Access configuration change or Autopilot Reset retires the current `kioskUser0`-style account and mints the next, the fresh profile re-runs first-logon seeds, so the first boot after a change is noisy and the second boot is the one to evaluate — **labelled `[PILOT]`**, because `[SOURCED]` Microsoft's Assigned Access pages do not document rotation-on-reconfiguration. The label survives the google-style pass and every review.
- [ ] **TRI-03**: The runbook is registered in `docs/_registry/RE-index.md` as row **238** and flipped Draft → Approved in the owner-ruled flip-then-register order, and **both** publish-bundle drift canaries move 237 → 238 in the same atom: `[MEASURED]` `scripts/pipeline/build-publish-bundle.mjs:524-527` and `scripts/pipeline/build-filename-map.mjs:274-286` (re-derive the lines at plan time; a one-canary bump is the recorded v1.18 mistake). The filename map is regenerated.
- [ ] **TRI-04**: The runbook is reachable from the L2 hub in `docs/index.md`, from `docs/quick-ref-l2.md`, and from the Windows triage decision tree (`docs/decision-trees/00-initial-triage.md` by naming symmetry — confirm the target at discuss-phase), with `check-nav-hub-links.mjs` at 0 and no hub link pointing at `docs/recipes` for this symptom. This discharges the carried `HUB-WIRING-NON-BARRED-SURFACE` trigger.

### Reference — kiosk-class reference rows (REF)

Per ruling 5, no new reference document and no registry row: `[MEASURED]` `docs/reference/licensing-matrix.md` is registered (RE-157, Approved) and takes cell-value edits; RE-237 takes new sections.

- [ ] **REF-01**: RE-237 carries a Windows App child-process allow-list table for multi-app mode — `windows365.exe`, `msedgewebview2.exe`, `msrdc.exe`, `crossdeviceresume.exe` — with each process's failure signature when omitted (missing WebView2 = blank sign-in page; missing `msrdc` = connection fails), cited to `Azure/WindowsAppKiosk` `ADVANCED_CUSTOMIZATIONS.md` at a pinned commit. `[SOURCED]` upstream `main` now flags `crossdeviceresume.exe` as possibly no longer required — the row records that as an upstream note, not as fact either way.
- [ ] **REF-02**: RE-237 carries the HP factory OEM/consumer package inventory that produced the dialog (`AD2F1837.*`, `aimgr`, `Microsoft.SecHealthUI` via the `SecurityHealth` Run value, `Microsoft.PowerAutomateDesktop`, `Microsoft.OutlookForWindows`, `Microsoft.BingSearch`, `Microsoft.MicrosoftStickyNotes`, `Microsoft.Office.ActionsServer`, per-user OneDrive startup tasks), the accepted residue (Realtek `RtkAudUService`, Widgets remnant) and the PROTECTED `MicrosoftEdgeUpdate` task — all `[PILOT]`, single-sourced against the pattern lists in the shipped `Remove-*` scripts so prose and script never disagree.
- [ ] **REF-03**: The corpus's remote-support surface carries a row for Intune Remote Help Windows **unattended control with remote sign-in**: `[SOURCED, remote-help/plan, ms.date 2026-08-13]` the permission is `Remote Help app - Windows unattended control remote sign-in` (custom role), targets must be physical, corporate-owned, Entra-joined or hybrid-joined x64 devices, and **Windows 365 / AVD session hosts are excluded as targets** — which is exactly why it fits the physical kiosk endpoint. The "August 2026 service release" framing stays `[UNVERIFIED]`; the row names the Learn page, not a release number.
- [ ] **REF-04**: The same surface carries the ConfigMgr Remote Control row: `[SOURCED, prerequisites-for-remote-control, ms.date 2022-03-18]` "you can't remote control a client that communicates with the site through a cloud management gateway (CMG)" — worded as the durable positive (Remote Help is the supported path for internet-only clients) with the negative cited.
- [ ] **REF-05**: `docs/reference/licensing-matrix.md` or the security/baseline reference (discuss-phase picks the file) carries the Credential Guard / CredSSP row: `[SOURCED, credential-guard/considerations-known-issues, ms.date 2026-04-23]` saved RDP credentials cannot be delegated when Credential Guard is on, the client-side message is misleading, and the documented fixes are Kerberos Constrained Delegation / Resource-Based KCD or AVD host-pool Entra SSO — **never disabling Credential Guard**. The exact client dialog string is `[PILOT]` (not on the Learn page) and is quoted only with that label.

### SSO — AVD host-pool Entra single sign-on (SSO)

Per ruling 6, an RE-237 delta. `[SOURCED, configure-single-sign-on, ms.date 2025-08-29]` SSO is five distinct tasks, not one RDP property.

- [ ] **SSO-01**: RE-237 gains a Step for host-pool Entra SSO structured as the five documented tasks: set the host-pool RDP property `enablerdsaadauth:i:1`; create the Kerberos server object when the session host is hybrid-joined **or** Entra-joined with on-prem AD DS reachable (both trigger clauses stated); enable RDP on the Windows Cloud Login service principal (`270efc09-cd0d-444b-a71f-39af4910ec45`, Graph PowerShell SDK ≥ 2.9.0); hide the consent prompt via `targetDeviceGroups` (max 10, cosmetic, not what makes SSO work); review Conditional Access for the auto-created Windows Cloud Login app. `screen mode id:i:2` is documented as an unrelated full-screen property, not part of SSO.
- [ ] **SSO-02**: RE-237's `## Configuration-Caused Failures` gains the two documented failure modes when the Kerberos object is required but missing — "the specific session doesn't exist" and "Single sign-on will be skipped" — quoted from the fetched page.
- [ ] **SSO-03**: The path is validated on the pilot device with a single-prompt sign-in observed and recorded as `[PILOT]` evidence in the recipe's Verification section; if the pilot tenant's topology makes a task inapplicable, the recipe says which and why rather than omitting it.

### Licensing — kiosk-class licensing / hardware standard (LIC)

`[SOURCED, Windows IoT Enterprise licensing, ms.date 2026-06-24]` Volume Licensing is an **upgrade** path from a qualifying OS; new IoT Enterprise devices are OEM-licensed at manufacture. "IoT Enterprise via a MAK key on stock hardware" is not a real path.

- [ ] **LIC-01**: A decision record (STD-05 admin decision-point block, blockquote + table, never a fence) lands in RE-237 comparing the **two** real arms — MAK volume-licensed Windows Enterprise on the current HP hardware versus OEM-licensed Windows IoT Enterprise hardware — with the consequence of each for Shell Launcher (`[SOURCED, assignedaccess-csp, ms.date 2025-03-12]` "The ShellLauncher node is not supported in Windows 10 Pro"; the `Class is not licensed for use` / `-2016281112` activation observation stays `[PILOT]`) and for the OEM-cleanup remediation class. The owner's ruling is recorded in the block with its date.
- [ ] **LIC-02**: `docs/reference/licensing-matrix.md` reflects the ruling as cell-value edits (structural edits are the known `V-58-22`/`V-58-23` pin hazard), consistent with the per-user-vs-per-device consequence RCP-08 landed in v1.22.

### Vendor — De-Bloat into the Kiosk Baseline (VND)

`[MEASURED]` `assets/recipes/06-walk-up-avd-kiosk/NOTICE` already names `RemoveBloat.ps1` as a recorded **GAP** with the vendoring method prescribed. `[SOURCED]` `andrew-s-taylor/public` is **GPL-3.0**; latest `De-Bloat/RemoveBloat.ps1` commit at research time `11918c5085b1be5ba25ace74c5cf3a52bfd37b26` (2026-09-03) — re-pin at plan time.

- [ ] **VND-01**: `RemoveBloat.ps1` is vendored under `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/` at a GitHub-API-confirmed commit SHA, with the full GPL-3.0 license text in the tree, attribution and the pinned SHA in `NOTICE`, and every local modification marked in-file — the GAP row in `NOTICE` is closed, not deleted.
- [ ] **VND-02**: The script is reviewed line-by-line for kiosk-account safety (nothing it removes is on the PROTECTED list — `MicrosoftEdgeUpdate` above all, since it services WebView2) and re-signed with the same Authenticode chain the Baseline package already uses; the review outcome and the pattern-list reconciliation against `Remove-KioskOemBloat.ps1` are recorded in the Baseline `README.md`.
- [ ] **VND-03**: The Baseline package invokes the vendored script in the documented order, RE-237 Step 8 names it, and the change is exercised once on the pilot device with the second-boot block-sensor reading recorded as `[PILOT]`.

### ClickOnce — STORIS SCiX kiosk investigation (CLK)

`[MEASURED]` `Trace-StorisEula.ps1` ships in `assets/recipes/06-walk-up-avd-kiosk/diagnostics/` and RE-237 states it is untested. STORIS SCiX has no public documentation — every claim is `[PILOT]`.

- [ ] **CLK-01**: The per-user ClickOnce install is attempted in the kiosk account through a wrapper on the pilot device, the EULA acceptance location is traced with the shipped diagnostic, and the result is recorded — a **documented negative** ("does not work in this device class because…") is a complete, valid outcome; a premature positive is not.
- [ ] **CLK-02**: The outcome lands in RE-237 as either a Step (positive) or a row in `## Unsupported and Anti-Feature Callouts` (negative), and `Trace-StorisEula.ps1`'s untested caveat is replaced by what was observed.

### Hygiene — riders (HYG)

- [ ] **HYG-01**: `docs/_glossary.md` gains the kiosk-class terms — Assigned Access (multi-app), Shell Launcher, autologon / kiosk account, `RestrictRun`, Credential Guard, CredSSP, Remote Help unattended control — each pointing at its binding guide, with the Alphabetical Index updated and glossary `last_verified`/`review_by` re-measured at plan time (the zero-margin hazard is live).
- [ ] **HYG-02**: The `DEFER-121-07-A` record stops resurfacing at milestone close. `[MEASURED 2026-09-10]` the nine documents were **already fixed** at commit `90310568` (2026-07-07, "fill YYYY-MM-DD VH-row placeholder in 9 retrofitted files"); what resurfaces is the nine-row table in `.planning/milestones/v1.16-phases/121-structural-retrofit-glossaries-lifecycle-end-user-guides/deferred-items.md`. `[MEASURED]` `parseDeferredTableItems` (gsd-core 1.12.0, `bin/lib/uat.cjs`) skips any row with a cell reading exactly `resolved`, so the fix is a `Status` column with `resolved` and a one-line resolution note citing `90310568` — then `gsd audit-open` (or the close-time artifact audit) reports **0** open items for the deferral. No corpus file changes.

### Harness — V122 pin, C17 residue and the 21st Path-A close (HARN)

`[MEASURED 2026-09-10]` the subject-line pair discriminator returns exactly one commit: `0399e715…` `docs(159-13): v1.22 MILESTONE CLOSE — single close-gate commit, 39/39 requirements Validated`. `[MEASURED]` `frozen-at-close.mjs` holds `V121` at line 198 and `V14` at line 216; `v1.22-milestone-audit.mjs` carries four live `existsSync(join(process.cwd(), p))` doc-path gates at lines 131, 144, 192, 243 (the CR-01 class), plus the standing-ruled live contract-presence guard at 855.

- [ ] **HARN-01**: `MILESTONE_CLOSE_SHAS.V122 = 0399e715` is inserted into `scripts/validation/_lib/frozen-at-close.mjs` strictly **before** the `V14` entry — never appended, because `V-140-V14PIN` regex-asserts that `V14` remains the object's last key. The SHA is re-recovered at plan time with the subject-line pair discriminator at count=1, regression-checked against V117–V121, and never the dual-token `--grep --all-match` form.
- [ ] **HARN-02**: `readAtV122Close` and `lsTreeAtV122Close` are added following the unbroken V18→V121 single-entry export pattern (seventh link in the V117→V122 chain).
- [ ] **HARN-03**: `C17-FROZEN-AWARE-RESIDUE-V22` is discharged — `v1.22-milestone-audit.mjs`'s C1–C16 reads and its C17 spawn are converted from live HEAD to the V122 snapshot via `withDocsAtClose`, **including** the four `existsSync` doc-path gates (converted to the frozen set, as `159-REVIEW-FIX.md` did for v1.21's harness), while the contract-presence guard stays live per the standing v1.21 Phase 153 D-11 ruling. Predecessor frozen surfaces stay byte-unchanged.
- [ ] **HARN-04**: The 21st Path-A audit-harness lineage bump lands — `v1.23-milestone-audit.mjs` forked from the frozen v1.22 blob with its sidecar and a fresh baseline, `check-phase-160..N` per content phase, the apex `check-phase-{last}` at `[48..last-1]+[30,31]` generated by arithmetic, and the **20th** CI workflow born `workflow_dispatch` + `fetch-depth: 0` (`[MEASURED]` 19 workflows today).
- [ ] **HARN-05**: A three-axis terminal re-audit is run at one shared commit — fresh clone, cross-OS Linux CI dispatch, and a fresh sub-agent — with the apex green and predecessor frozen surfaces byte-unchanged; the apex is re-measured **after** archival at `/gsd-complete-milestone` so archival drift is proven zero (fifth consecutive close if it holds).
- [ ] **HARN-06**: The milestone closes through a single close-gate commit, is tagged `v1.23` on the archival commit, and is pushed with `git push origin master v1.23`. `[MEASURED 2026-09-10]` `origin/master` is 0 ahead / 0 behind at start with tag `v1.22` on the remote — re-measure before the close.

## Validator Constraints on Requirement Text

**One live constraint governs this file's own bytes.** `check-phase-54.mjs` reads `.planning/REQUIREMENTS.md` at HEAD, is an apex chain member, and was `[MEASURED 2026-09-10]` **32 passed / 0 failed** immediately before this file was rewritten.

| Pin | Constraint on this file | Authoring rule |
|---|---|---|
| `V-54-21` | NEGATIVE — `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md` must contain **zero** references to the off-by-one compliance-policy filename that Phase 54 purged | Never name that file in either planning document. Refer to compliance policy by description only. |
| `V-54-32` | Atomicity coupling — `V-54-19` + `V-54-20` + `V-54-21` must all pass **together** | Re-run `check-phase-54.mjs` after any edit to this file or to the roadmap. |

**Constraints this milestone's deliverables inherit.** `V-54-11`'s negative on unqualified update-cadence tokens (inline code is stripped, so backticks are a legitimate escape); the four C11 operations patterns (write `Configuration Manager`, not the abbreviations); `V-58-22`/`V-58-23`'s capability-matrix anchors (cell-value edits over structural edits); `check-phase-131.mjs`/`check-phase-136.mjs` pin the `> **Ask the admin:**` decision prompts verbatim; `V-135-*` assertions pin RE-224 content and the RCP-06/07/08 cross-links in RE-237 — grep before editing any line a validator pins (memory: a later validator can pin an earlier one's exact call-site string). Every line number in this file is a convenience pointer, not an identity — locate by quoted text, then re-measure.

**The dominant hazard is fact-promotion in fresh prose.** Every content pillar is new authorship with no "before" state, so the diff-based meaning-preservation judge that caught 26 STRENGTHENED / 19 INVERTED hunks in v1.22 structurally cannot fire. Each content phase carries an explicit review step hunting for hedges promoted to `must`, `[PILOT]` claims rewritten as documented fact, and actor invention from passive→active rewrites.

## Future Requirements

Deferred, tracked, not in this roadmap:

- **Kiosk-class licensing outcome follow-through.** If LIC-01 rules for IoT Enterprise hardware, the Shell Launcher (`V2:AllAppsFullScreen`) branch returns and the OEM-cleanup class retires — a second kiosk-class milestone, not this one.
- **A kiosk-class Reference document** consolidating the REF rows (registry row, both canaries) if a second lockdown-class recipe ever needs the same rows — barred with `SHARED-TAXONOMY-DOC` until a third lockdown recipe lands.
- **`VERIFIER-SECRET-ECHO-CLASS` mechanical guard**, `AUDIT-RUNNER-REVIEW-158`, `SAFETYNET-DEAD-PINS-4`, `PROTECT-SEGMENT-BOUNDARY-SPLIT`, `WRAPPED-LOOKBEHIND-GUARD`, `NON-IDEMPOTENT-RULE-SETS`, `PHASE-158-CARRIED-RESIDUE` — tooling and style-sweep hygiene, carried in `v1.22-DEFERRED-CLEANUP.md` Part A.
- **The corpus-wide past-due `review_by` sweep** (217 of 271 at v1.22 scoping) and the `review_by`-vs-today validator it implies.
- All v1.21 Part B / Part C carry-forwards preserved verbatim in `v1.22-DEFERRED-CLEANUP.md`: MTPSSO / `PSSO-FUT-03`, KRBFUT-01/02, `CI-3`, AOSP-wired 802.1X / Cloud PKI, SEMM status, Windows 11 Pro hotpatch eligibility, CSP-partner registration, standalone Surface UEFI, `FENCE-AXIS-02`, `V-132-HUBSNOTWIRED-REGEX-BROKEN`, `RECIPE-OUTBOUND-LINK-COVERAGE`, `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, the ten unowned tooling rows, SharePoint content-approval / Azure AI Search / Graph auto-upload.

## Out of Scope

| Feature | Reason |
|---------|--------|
| A third lockdown recipe or a shared kiosk/dedicated taxonomy document (`SHARED-TAXONOMY-DOC`) | Trigger (third lockdown recipe) not met; v1.23 ships runbook + rows + recipe deltas, no new recipe |
| Editing the falsified cells at `patch-management/00-overview.md:57` and the two `co-management/03` claims | Standing owner do-not-edit rulings, unchanged |
| Disabling Credential Guard as a CredSSP workaround | `[SOURCED]` Microsoft's fix is KCD / RBKCD or Entra SSO; the corpus never documents a security-weakening workaround |
| Presenting the Remote Help "August 2026 service release" number as fact | `[UNVERIFIED]` — Learn pages document the mechanics without a release number |
| Re-litigating RE-222 / RE-224 reconciliations | Closed in v1.22 Phase 155 (six items discharged) |
| The upstream `Azure/WindowsAppKiosk` single-app drift | Recorded as an upstream note in REF-01; reconciling RE-222's single-app path is its own item |
| Graph auto-upload of the publish bundle | Would introduce the first `secrets.` reference in any workflow; explicitly out since v1.17 |

## Traceability

Which phases cover which requirements.

| Requirement | Phase | Status |
|-------------|-------|--------|
| TRI-01 | Phase 164 | Pending |
| TRI-02 | Phase 164 | Pending |
| TRI-03 | Phase 164 | Pending |
| TRI-04 | Phase 164 | Pending |
| REF-01 | Phase 165 | Pending |
| REF-02 | Phase 165 | Pending |
| REF-03 | Phase 165 | Pending |
| REF-04 | Phase 165 | Pending |
| REF-05 | Phase 165 | Pending |
| SSO-01 | Phase 166 | Pending |
| SSO-02 | Phase 166 | Pending |
| SSO-03 | Phase 166 | Pending |
| LIC-01 | Phase 160 | Pending |
| LIC-02 | Phase 160 | Pending |
| VND-01 | Phase 161 | Pending |
| VND-02 | Phase 161 | Pending |
| VND-03 | Phase 161 | Pending |
| CLK-01 | Phase 163 | Pending |
| CLK-02 | Phase 163 | Pending |
| HYG-01 | Phase 162 | Pending |
| HYG-02 | Phase 162 | Pending |
| HARN-01 | Phase 167 | Pending |
| HARN-02 | Phase 167 | Pending |
| HARN-03 | Phase 167 | Pending |
| HARN-04 | Phase 167 | Pending |
| HARN-05 | Phase 167 | Pending |
| HARN-06 | Phase 167 | Pending |

**Coverage:**
- v1.23 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0

---
*Requirements defined: 2026-09-10*
*Last updated: 2026-09-10 after roadmap creation — 27/27 requirements mapped across Phases 160-167, zero orphans*
