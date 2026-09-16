# Phase 161: Vendor De-Bloat into the Kiosk Baseline - Context

**Gathered:** 2026-09-16 (discussion ran 2026-09-15 → 2026-09-16)
**Status:** Ready for planning

<domain>
## Phase Boundary

Andrew Taylor's `RemoveBloat.ps1` (`andrew-s-taylor/public`, `De-Bloat/RemoveBloat.ps1`, GPL-3.0) is vendored verbatim into the Kiosk Baseline package source at `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/` at a GitHub-API-confirmed commit, with the GPL-3.0 text beside it, attribution and the pinned identity in `NOTICE`, a kiosk-account-safety review and a pattern-list reconciliation in the Baseline `README.md`, the Baseline's PSADT install order changed to run it first, RE-237 Step 8 (`docs/recipes/06-walk-up-avd-kiosk-autologon.md`) recording the ruling, and one owner-run pilot checkpoint whose second-boot sensor reading lands as `[PILOT]`. Requirements VND-01, VND-02, VND-03. ROADMAP SC2 and SC3 and REQUIREMENTS VND-02 and VND-03 receive a `[SUCCESS-CRITERION AMENDMENT, D-27]` in this phase's first plan. No new document, no registry row, no canary bump, no edit to the two EEE removal scripts (byte-pinned by `check-phase-155`), no change to the daily remediation packages, no sensor fix (Phase 164's), no leaf validator (`check-phase-161.mjs` is Phase 167's per HARN-04).

</domain>

<decisions>
## Implementation Decisions

Fifty-seven decisions were resolved across three `/adversarial-review` rounds (Finder → Adversary → Referee, Opus, fresh context, told to re-measure everything): round 1 34 issues / 22 real; round 2 43 / 35 real; round 3 41 / 12 real + 15 partial. Every count below was re-measured by a Referee at HEAD `cdc496be`. Locked source text lives in `161-DRAFTS.md` (D-55, D-56). Twelve decisions are owner rulings, marked `[OWNER-RULED 2026-09-15]`.

### Vendoring shape (Area A)

- **D-01:** **`RemoveBloat.ps1` is vendored verbatim at the commit `commits?path=De-Bloat/RemoveBloat.ps1` returns first at plan time** (today `11918c5085b1be5ba25ace74c5cf3a52bfd37b26`, 2026-09-03); zero in-file modifications, so SC1's "every local modification is marked in-file" is discharged over an empty set, and the upstream Authenticode block (lines 4229-4405) is retained in-repo and replaced at assembly (A1, A7). — **Reversibility:** costly — every re-pin re-runs D-09 and D-13 and re-records D-06.
- **D-02:** **The file lands at `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1`**, the folder `$adtSession.DirFiles` reads (A2).
- **D-03:** **GPL-3.0 text lands verbatim at `Files/LICENSE.GPL-3.0.txt`** (SHA256 `3972dc9744f6499f0f9b2dbf76696f2ae7ad8af9b23dde66d6af86c9dfb36986`, 35,149 bytes) so it travels inside the `.intunewin`; the §0 "convey" and §5 aggregation readings are recorded as the repository's reading, not legal advice (A3, A4.4).
- **D-04:** **No in-file notice is added, because there is none upstream to preserve** (`grep -cniE 'copyright|GNU|GPL|licen'` = 0 across 4,405 lines); attribution lives in the NOTICE entry (D-51) and the README `## Attribution and license` section, and the NOTICE header gains the one-sentence third-party-license note (A4).
- **D-05:** **The NOTICE GAP paragraph is closed by a dated `CLOSED 2026-09-DD (v1.23 Phase 161)` paragraph appended in place at column 0**, under the `Not vendored: RemoveBloat.ps1` paragraph (lines 332-342), and the `Plan 161 vendoring` section is inserted immediately before `Plan 155-05 wiring` (line 362). Historical paragraphs stay byte-unchanged with exactly one named exception: the `Plan 155-05 wiring` paragraph at lines 371-376 states "the three artifacts named in the recipe but not committed here" and calls `RemoveBloat.ps1` "still an open 'Ask the admin' decision in RE-237 Step 8, not vendored" — three statements this phase falsifies with no pointer, because the D-05 insertion sits above them. A dated `SUPERSEDED IN PART` paragraph (E-N4, VERBATIM) is appended after line 378 at column 0; the original words are retained, so the diff is still insertions only. Justification is the `Post-vendoring correction` precedent (lines 295-314), not "chronological by construction" (A5, H2).
- **D-06:** **Identity is recorded in NOTICE as commit SHA, git blob SHA-1, SHA256 of the LF blob, byte count, retrieval date and the upstream-declared script version** (`Version: 5.6.4` at line 20 of the script); two independent raw fetches are compared, the proof command is `git show HEAD:<path> | sha256sum`, and `.gitattributes` `* text=auto eol=lf` is a measured no-op on both LF upstream files (today 179,789 bytes, SHA256 `bf0f4bd01991bb1becf5e33a24ad410c3781281afe3c1774cbf3225a17d24e99`) (A6, A8).
- **D-07:** **[OWNER-RULED 2026-09-15] The OOBE-gated block is accepted and recorded, not neutered.** The block at lines 4097-4196 (Chrome force-uninstall, Office consumer removal, unconditional Office Deployment Tool download from `officecdn.microsoft.com`, blocking `/configure -Wait`) is gated by `$IsOOBEComplete -eq 0`, so it runs on every ESP device-setup pass; README's fetch table and NOTICE name it with its gate and trigger, the pilot measures its cost, and the silent-failure hazard under `$ErrorActionPreference = 'silentlycontinue'` (line 232) is stated (A9).
- **D-08:** **The size precedent is recorded, not amended** — RE-237 line 238 and NOTICE line 101 state 1.6 MB repo-wide with no qualifier; the script becomes the largest tracked file outside `.planning/` (the current largest is `scripts/docs-style/_JUDGE-VERDICTS.json` at 160,165 bytes) and the NOTICE entry says so plainly (A10).

### Kiosk-safety review (Area B)

- **D-09:** **The review lands in the Baseline README `## Kiosk-safety review`** as an explicit PROTECTED list (MicrosoftEdgeUpdate tasks and executable; Edge and WebView2; `MicrosoftCorporationII.Windows365`; `Microsoft.Windows.AssignedAccessLockApp`; `Microsoft.AAD.BrokerPlugin`; Intune Management Extension; ConfigMgr client; `Microsoft.CompanyPortal`; Quick Assist; the sensor's SVCUI agents; `RtkAudUService`), a class table with referee-measured line ranges including the Edge finding (`Microsoft.MicrosoftEdge.Stable` is on `$Bloatware` at line 444 and survives only because line 332 whitelists it), the other-OEM and third-party Win32 row, the policy-write row (lines 1775-1780) and the measured-inert row (lines 579-617 HKCR paths with no `New-PSDrive`; lines 3800-3817 bookmark loop), and five negative controls (Edge.Stable = 2; edgeupdate = 0; Windows365 = 0; one AssignedAccess `$NonRemovable` entry; New-PSDrive = 0), plus a second fresh-context `claude -p` confirmation pass (B1, H3).
- **D-10:** **[OWNER-RULED 2026-09-15] `-customwhitelist` is empty.** De-Bloat removes HP Wolf Security (5 entries), HP Sure Run Module, HP Sure Recover, HP Client Security Manager and HP Security Update Service; the README carries the brittleness caveat for any future whitelist (line 2225 exact-string match; line 2198 is version-baked) (B2).
- **D-11:** **`-AllowStartMenuReset false` is passed**, which removes the `start2.bin` fetch and skips lines 1640-1723 on both the Win10 and Win11 branches (B3).
- **D-12:** **`-TasksToRemove` and `-custombloatlist` are omitted, and `-custombloatlist` carries a standing prohibition** on this device class because line 519 strips matching entries from `$appstoignore` (B4).
- **D-13:** **Reconciliation is the README `## Pattern-list reconciliation`, 15 rows** (7 removed by `$Bloatware`; 2 kept by the upstream whitelist; 5 unlisted; 1 HP publisher partial with 8 named entries plus line 427); the EEE scripts do not change (B5).
- **D-14:** **`MicrosoftWindows.CrossDevice` removal is accepted**; RE-237's `crossdeviceresume.exe` allow-list entry is not edited here, and a note goes to Phase 165 REF-01 (B6).
- **D-15:** **Registry, hive, service and task verdicts are split three ways** — removals and disables (desirable), policy writes (lines 1775-1780, an unmanaged write into the Intune-owned Edge key, stated), and measured-inert code (recorded as no-ops) (B7).
- **D-16:** **The `$intunecomplete` guard gates nothing**; the line-4097 gate is OOBE state, and the transcript literal (`Still in OOBE, continue` or `Intune detected, skipping removal of apps`) identifies the branch on the pilot (B8).
- **D-17:** **`RealtekSemiconductorCorp.HPAudioControl` (AppX) removal is accepted and `RtkAudUService` is untouched by both scripts**, both stated so REF-02's residue row stays consistent (B9).
- **D-18:** **`reg unload HKU\temphive 2>&1 | Out-Null` runs in the PSADT Install loop after the De-Bloat entry**, because De-Bloat mounts the Default hive three times (lines 1250, 1417, 1529) and never checks its unloads, and `Remove-KioskRunTasks.ps1` line 52 mounts the same file next (B10).
- **D-19:** **[OWNER-RULED 2026-09-15] Quick Assist removal is accepted and recorded as a measured exception** (line 479) with the RE-237 line-48 cross-reference and a note to Phase 165 REF-03/REF-04 (B11).

### Baseline wiring, signing and failure policy (Area C)

- **D-20:** **The PSADT functions file gains an ordered bundled-scripts list** (`$script:BundledScripts`, entries of `@{File;Args}`; De-Bloat first with `-AllowStartMenuReset false`; no `-customwhitelist`; a prohibition comment on `-custombloatlist`), both loops iterate it, `Start-ADTProcess … -PassThru -ErrorAction SilentlyContinue`, the D-18 unload line, `AppVersion` and `AppScriptVersion` `1.1.0`, and `AppScriptDate` = execution date. Two comment surfaces are amended, not one: the file header (lines 1-16 — three scripts plus license, "one source" rescoped to the two EEE scripts, five fetch paths named) and the in-function Install comment at lines 58-60, whose "Invoke the SAME scripts the drift remediations use. Each is defensive (SilentlyContinue) and exits 0" both go false for the vendored script (C1).
- **D-21:** **The fail-loud policy is kept and the 70002 gate is made reachable by `-ErrorAction SilentlyContinue`** (PSADT 4.1.7's `Start-ADTProcess` otherwise throws on a non-zero exit and the frontend closes the session with 60001); the README adds the 60001 sentence and no fail-open branch exists (C2).
- **D-22:** **[OWNER-RULED 2026-09-15] The ESP time budget is measured on the pilot with no timeout.** De-Bloat's own `Total Script Duration` line and the PSADT timestamps are recorded and the owner rules at the checkpoint; if the ruling is that the runtime is unacceptable, the ruling is recorded and a follow-up plan handles the change — 161-04 never reverts in-plan (C3).
- **D-23:** **Detection is `1.1.0-01` and the README Versioning section gains the re-pin procedure** (new `commits?path=` SHA → re-run D-09 and D-13 → re-verify Edge.Stable = 2 and the line-2198 literal → NOTICE + AppVersion) (C4).
- **D-24:** **[OWNER-RULED 2026-09-15] Signing is a README assembly step for all three `Files\` scripts** using the `Set-AuthenticodeSignature -TimestampServer -HashAlgorithm SHA256` thumbprint idiom from `Build-WindowsAppPackage.ps1` lines 88-90; checkpoint evidence is `Status` ×3 and one distinct thumbprint, counts only, and signed bytes are never committed (C5).
- **D-25:** **README is the single review home**, section order `## Why` → `## Attribution and license` → `## Assemble (…)` → `## Intune Win32 app` → `## Versioning` → `## Known runtime fetch paths and their triggers` → `## Kiosk-safety review` → `## Pattern-list reconciliation` → `## Validation (pilot)`. README prose is not corpus (no C17 or google-style mandate) but keeps the corpus voice and every `[PILOT]` marker. The `## Assemble` H2 literal changes with the ONE-source rescope, so its replacement is drafted VERBATIM as E-B1 and pinned with `grep -cFx`; no H2 literal is left to the executor (C6, H1).
- **D-26:** **De-Bloat goes into the Baseline only**; `remediations/` is untouched and V-155-ASSETPAIR stays green (C7).
- **D-27:** **[OWNER-RULED 2026-09-15] A `[SUCCESS-CRITERION AMENDMENT, D-27]` note is appended to ROADMAP SC2 and REQUIREMENTS VND-02 and to ROADMAP SC3 and REQUIREMENTS VND-03.** The signing clause is rescoped to a README-recorded step plus `[PILOT]` checkpoint evidence with a decline stated; the pilot-reading clause is rescoped to "recorded when the checkpoint runs, decline stated on both surfaces, STATE carries 'VND-03 pilot run owed' to Phase 163". SC1/VND-01 are not amended, and the four strings are VERBATIM in `161-DRAFTS.md` (C8, E1, E3, O-3). — **Reversibility:** reversible — a second appended note supersedes it, exactly as 160-CONTEXT.md D-28 rates the identical decision; the idiom never deletes original words, which is a property of the record, not an undo cost.

### RE-237 edits and the pilot checkpoint (Area D)

- **D-28:** **The ruling is recorded inside the Step 8 STD-05 block in the Step 4 idiom.** The lead-in and three-column table stay (lead-in count 5); Row 1 "Recorded as" becomes E-R1, Row 2 "When to choose" becomes E-R2 in its measured or unchanged variant, one prose paragraph after the table records the ruling with its date (E-R3), and Step 8 item 1 plus its README parenthetical are corrected (E-R6). **[OWNER-RULED 2026-09-15, O-1]** the whitelist clause names no packages and makes no pilot claim. Every new string in `docs/` uses the tight em dash — RE-237 carries 74 U+2014 and zero ASCII ` -- `, and all six recipe files measure ASCII ` -- ` = 0, so the ASCII rule of D-38 is scoped to `.planning/` and never reaches this file; `administrator` stays 10 and no new blockquote is added (D1, O-1).
- **D-29:** **Asset Provenance gains the vendored-verbatim sentence and loses one artifact.** Paragraph 2 names the commit, GPL-3.0 and the license path; paragraph 3's "Three artifacts" becomes "Two artifacts" with only the `RemoveBloat.ps1` sentence cut; `Deploy-WindowsApp.ps1` is preserved verbatim (V-155-CONTENT's seventh needle, a whole-file `includes`; count 4) and `## Asset Provenance` occurs exactly once (D2).
- **D-30:** **The `[PILOT]` reading is one fact on three surfaces** — the full allowlisted record in `161-EVIDENCE.md`, a short record in README `## Validation (pilot)`, and a one- or two-sentence summary in the Step 8 ruling paragraph (D3, G2, G4).
- **D-31:** **[OWNER-RULED 2026-09-15] The checkpoint is the 160-02 Task 1 idiom inside 161-04** (`checkpoint:human-action`, `autonomous: false`), with `decline` a resume signal recorded as `DECLINED` plus date; on decline VND-02 and VND-03 still flip at 161-04's boundary, Step 8 and README state "not yet exercised", and STATE carries "VND-03 pilot run owed" to Phase 163. Unlike 160's read-only analogue, this gate is device-mutating, so the task carries `<reversibility rating="costly">` naming the undo cost — revert the wiring commit and run one further Autopilot Reset, the cycle the functions file's own header documents (D4, G5, O-2, O-3).
- **D-32:** **The checkpoint asks one further yes/no, recorded as a single token** — "Is the measured De-Bloat runtime acceptable for the ESP budget?" The token is recorded as a labelled disposition line, never as an eighth allowlisted item, so D-46's "No eighth item" criterion keeps 160's scoping to the recorded allowlisted record. **[OWNER-RULED 2026-09-16]** Default if the owner says nothing is `NOT RULED`, carried forward with the VND-03 note. A `no` reverts nothing in 161-04, is recorded in EVIDENCE and STATE as "Owner ruled the De-Bloat runtime unacceptable on `<date>`; follow-up plan required", and VND-02/VND-03 still flip, because the vendoring, review and wiring exist and the ruling is about deployment (J7, C3).
- **D-33:** **Fact-promotion review runs over the new RE-237 prose.** `161-FACTCHECK-RUBRIC.md` is 160's five classes unchanged (a copy, not a reference; class 2 fail-closed on "a cited pre-edit RE-237 line or the checkpoint record in `161-EVIDENCE.md`"); the packet is the new paragraph, two changed cells, two Provenance sentences, the Version History row and their sources; the cap is three rounds per fragment, and at the cap the residual is recorded as a named open finding, stated on the surface, and the flip proceeds. The packet checklist carries the round-1 rule verbatim — nothing in new prose asserts as conditional a behaviour the review table measured as unconditional, the ODT fetch above all (D6, H4, H8).
- **D-34:** **`last_verified` is re-stamped to the execution date and `review_by` to +90 days**, with the Version History row newest-first in two columns (D7).
- **D-35:** **[OWNER-RULED 2026-09-15, O-2] Four sequential plans run on master** — 161-01 amendment tracer (`requirements: []`), 161-02 vendoring (`[VND-01]`), 161-03 review (`requirements: []`), 161-04 wiring plus RE-237 plus checkpoint (`[VND-02, VND-03]`, `autonomous: false`). A requirement is declared in the plan where its last conjunct is settled, because `requirements.mark-complete` fires from frontmatter at every plan boundary. 161-01 bootstraps `161-EVIDENCE.md` with its own sections and declares it in `files_modified`; every later plan appends, which is what makes the `depends_on` chain real rather than reflexive. The leaf `check-phase-161.mjs` is Phase 167's and needles travel via `161-EVIDENCE.md` (D8, E2).
- **D-36:** **A pre-commit scrub scan runs before the vendored bytes are committed** — employer name by character-class split, and GUID shape with `(?i)` — against a pre-declared set of all ten distinct upstream GUIDs: `1527c705-…`, `c5e2524a-…`, `E2A4F912-…`, `F46D4000-…` (`$NonRemovable`, lines 352-355); `BFA794E4-…` (line 818); `0DB7E03F-…` (lines 900, 901); `2cc5ca98-…` (lines 966, 976, 1487, 1599); `6468C4A5-…` (InstallShield, lines 2286, 2290); `0a5aa116-…` (line 2910); `2B51C83A-…` (line 3594) — fifteen occurrences in all. `assets/` holds two distinct GUIDs today, so D-48's tree-wide review expects exactly twelve afterwards and every one is accounted for (D9).
- **D-37:** **The pilot run captures only the SC3 items plus runtime** — no Shell Launcher re-test, no slmgr reading, no STORIS attempt (D10).

### Amendment mechanics (Area E)

- **D-38:** **The four amendment strings are the round-2 Referee texts with `D-27` substituted**, appended end-of-line with one leading space, each file's own antecedent quoted byte-exact; the ground is the assembly-time signing idiom quoted from `Build-WindowsAppPackage.ps1` under `.PARAMETER CodeSigningCertThumbprint` (SC2/VND-02) and the Phase 160 decline path quoted from `160-02-SUMMARY.md` under `key-decisions` (SC3/VND-03); ASCII `--` is correct here and only here, because these two files are `.planning/` surfaces where it is the measured convention; corroboration appears in the ROADMAP long form and the REQUIREMENTS short form, scratch-validated `check-phase-54` 32/0 both sides (E3).
- **D-39:** **161-01 brackets the appends with a `check-phase-54` 32/0 gate before and after, in the same task**, with the recorded reason that `check-phase-61` and `check-phase-70` read these files frozen and `check-phase-66` only in an error string; `roadmap get-phase 161` returns 3 criteria; the `- [ ] **VND-0[23]**:` start anchors stay intact; `grep -oF 'D-NN' … | wc -l` = 0 after substitution; `SUCCESS-CRITERION AMENDMENT` goes 1 → 3 in each file; and `161-GATE-BASELINE.json` carries all four 160 sections (`structural_gate`, `style_residual`, `pin_residency`, `line_endings`), the delta being three new `pin_residency` rows and two `line_endings` entries. No `docs/` or `assets/` byte is touched in 161-01 (E4).
- **D-40:** **Universal anti-pattern 15 is carved out for D-27's criterion-text amendment, as its own decision.** The rule bans direct Write/Edit to STATE.md and ROADMAP.md for mutations; the `gsd-tools roadmap` and `requirements` subcommands mutate progress and checkboxes only and none touches criterion or bullet text, and 155-01 and 160-01 both used direct `Edit` for this class. No `mark-complete` dry run is attempted, because `cmdRequirementsMarkComplete` takes no dry-run parameter and a real call inside 161-01 would flip VND-02/03 before the content lands. The anchor grep is the check, because the checkbox regex at `milestone.cjs` line 168 is bullet-start-anchored and structurally immune to an end-of-line append (160-CONTEXT.md D-39 analogue).
- **D-41:** **The amendment's ground is a ruling, and the measurement is demoted to corroboration** that is true both before and after 161-02 (E5, E6).

### Phase 167 needle handover and gates (Area F)

- **D-42:** **`161-EVIDENCE.md` `## Needle list handed to Phase 167 (HARN-04)` is the 40-row table in `161-DRAFTS.md`** with one re-measure command per row, `-F` or anchored `-E`, house form `grep -oE|-oF … | wc -l`. Two row values are carried corrected: row 32 `ruled 2026-09-10` expects 2, because E-R1 is VERBATIM-locked and carries the literal (1 at RE-237 line 108 today plus 1 in the new cell); row 33 `Deploy-WindowsApp.ps1` expects 4. `## Asset Provenance` is a validator statement, not a needle; the `administrator` and `sign into` rows are validator duplicates carried only because 160-EVIDENCE and D8 mandate it; no anchors, line numbers, run counts or byte sizes are pinned; date literals are pinned as literal-presence needles; and 160's self-contradicting preamble is not repeated (F1, F5).
- **D-43:** **The leaf reads live HEAD; freezing is Phase 167 HARN-03's** (F2).
- **D-44:** **The pre-wave gate bracket is 160's set plus two additions, and the post-wave bracket adds three link targets.** Pre-wave: `check-phase-54`, `c17-eee-contract`, `check-nav-hub-links`, `check-phase-155`, `check-phase-156`, apex `check-phase-159` with wall-clock, `claude auth status` plus a PONG probe, root `npm test` compare-not-count, clean `git status`, plus `git check-attr -a` on both vendored paths (measured today `text: auto`, `eol: lf`) and the statement that `check-phase-155` enumerates no directory. Post-wave: the same set plus all three new RE-237 link targets resolving — `Files/RemoveBloat.ps1`, `Files/LICENSE.GPL-3.0.txt` and the extensionless `[NOTICE](../../assets/recipes/06-walk-up-avd-kiosk/NOTICE)`, which is RE-237's first extensionless target and its first `NOTICE` mention. The basis is `resolveLinkTarget` plus `existsSync` at `check-nav-hub-links.mjs` line 290, which is presence-only and accepts directories (F3).
- **D-45:** **Each plan re-measures its own needles at its landing commit into EVIDENCE, and 161-04 re-confirms all rows** and records `test ! -e scripts/validation/check-phase-161.mjs` (F4).

### Pilot record and scrub (Area G)

- **D-46:** **The checkpoint records exactly seven allowlisted items** (date plus detection value; redacted sensor output; the nine-line `Debloat.log` checklist, eight file literals plus the composed `Total Script Duration:` line; the three exit-code lines plus the session code extracted by grep; the WARN count by grep; `Status` ×3 plus the distinct-thumbprint count; the same-cert attestation) with the named exclusions (hostname and asset tag; any SID form; tenant and Intune device ID; employer; thumbprint, Subject and Issuer; non-kiosk account names and profile paths; the pilot user) and the 160-form acceptance criteria scoped to the recorded record: "No eighth item appears in the recorded allowlisted record", "No `S-1-` sequence other than `<SID>`", "No `C:\Users\` segment other than kioskUser<n>, Public or Default", ≤ 2,000 chars, "record or DECLINED, either is a pass". The exclusion list names what PSADT 4.1.7 actually emits in its log header (logged-on user list and session dump with NTAccount, SID, UserName, DomainName, SessionName, ClientName, profile paths). `Computer Name is [{0}]` exists nowhere in PSADT 4.1.7 and `envComputerNameFQDN` has no consumer, so any plan text asserting that citation is unsupported and must not be written (G1).
- **D-47:** **The Step 8 `[PILOT]` summary carries a marker per observation clause**, not per sentence: date; second boot after Autopilot Reset with Baseline 1.1.0; counts and categories; De-Bloat minutes; which OOBE-branch literal appeared; at most two sentences of prose. RE-237 already carries in-cell `**[PILOT]**` markers (lines 43, 47, 50, 298-305), so the Row 2 measured cell carries its own in-cell marker too (G2).
- **D-48:** **Redaction runs before any write and verification after every write.** G3-R is in-process before any write (`S-1-[0-9]+(-[0-9]+)+` → `<SID>`, covering local, domain and Entra `S-1-12-1` forms; non-kiosk `C:\Users\…` → `C:\Users\<USER>`; counts only recorded), because the sensor's RUN and RUN1 lines emit the kiosk SID (`Detect-KioskAppBlocks-v6.ps1` lines 113 and 123; the guard at line 111 is dead). G3-V runs after every write in 161-04 over `161-EVIDENCE.md`, `161-04-SUMMARY.md`, `161-DRAFTS.md`, README and RE-237 (SID → 0; employer → 0; 40-hex → 0; `CN=` → 0; GUID count reviewed with `(?i)` against D-36's ten-value set, expecting twelve distinct tree-wide). No hostname needle exists, because it cannot be derived in-process without the secret entering the session; a surviving hit widens the regex twice at most, then degrades to counts-and-categories with the degradation stated (G3, G7).
- **D-49:** **The checkpoint task text states the redaction pass**, runs after 161-04's PSADT commit so the owner assembles from HEAD, and runs before the `[PILOT]` sentence is written; paste is allowed (G5, G6).
- **D-50:** **Sensor v6 defects are recorded in `161-EVIDENCE.md` and handed to Phase 164, not fixed here** — the dead line-111 guard, the line-113 and line-123 SID emission, the unguarded RUN1 loop and the line-87 SRP-RULE path emission (D-26 keeps `remediations/` untouched; a fix forces a NOTICE re-hash) (G8).

### Review artifacts (Area H)

- **D-51:** **The NOTICE `Plan 161 vendoring` entry is the field list in `161-DRAFTS.md`** (origin plus upstream version; pinned SHA plus blob SHA-1; retrieval date plus two-fetch compare; license plus path; "Local modifications: NONE"; upstream signature block retained and replaced; invocation; five fetch paths with triggers; the ten pre-declared GUIDs; SHA256; bytes), together with the `LICENSE.GPL-3.0.txt` entry and the post-161 re-hash lines for the functions file and README; the header amendment appends to the single line `scope for this phase (v1.22 Phase 155); the absence below is not an oversight.` and hard-wraps at ≤ 78 columns (H2).
- **D-52:** **The second `claude -p` review pass reads the script chunked**, its packet being the README review section plus the script; the five negative controls are requested as counts and their expected values stay in the plan, never in the prompt; pass is zero omitted PROTECTED hits and zero omitted classes; the cap is three rounds; and the residual is recorded as a named open finding while the flip proceeds (H3).
- **D-53:** **Meaning preservation for the two changed cells and the Provenance paragraph uses one hand-built before/after packet** via `git show <pre-edit sha>:path`, judged in a fresh `claude -p` with PRESERVED required and the intended "Three → Two artifacts" delta named; `judge-packets.py` emits nothing for zero-modal lines. One packet may take more than one process, as 160's Task 5 did (H5).
- **D-54:** **`check.py --no-headings` and `sweep3.py docs/recipes` run per directory with `_CONTENT-PINS.txt`, before and after, as records** with 160's blind spots stated — sweep3 skips `|` lines and never tests em dashes, so D-28's tight-em-dash compliance is a hand ruling with no instrument (H6).
- **D-55:** **`161-DRAFTS.md` holds every VERBATIM-LOCKED string in fenced blocks**, with one scratchpad context bundle per plan naming paths and never inlining the script; the bundle is not a scan surface (H7).
- **D-56:** **CONTEXT, DISCUSSION-LOG and DRAFTS are committed together and `161-DRAFTS.md` is the planner's and executor's source text**, a recorded three-file deviation from the discuss-phase workflow's literal two-file commit; the binding chain is `<canonical_refs>` here → plan-phase's mandatory `<read_first>` rule → the executor reads it before touching anything (160-CONTEXT.md D-38 analogue).
- **D-57:** **The evidence and fact-check file set is fixed, in 160's task-headed shape.** `161-EVIDENCE.md` carries nine sections named by task in the `## Task N (161-0M): …` form, 161-01 owning the first two and 161-04 owning the last four; `161-FACTCHECK-RUBRIC.md`, `161-FACTCHECK-PACKET.md` and `161-JUDGE-PACKET.md` are named by role; and one `161-FACTCHECK.md` spans 161-03 and 161-04, a recorded deviation from 160's per-plan fact-check record, costless because 161-04 already declares `depends_on: ["161-03"]`. Dispatch strings are logged verbatim per process; no dispatch quotes an expected count for a needle it is asking about, with D-52's five controls requested as counts and the expectations held in the plan. The cap is stated in 160's two-bound terms: three rounds per fragment, eight processes total (L1-L4).

### Claude's Discretion

- Exact README prose outside the locked H2 literals and the locked review-section shape.
- NOTICE wording outside the locked lines (E-N1's field values; E-N2, E-N3 and E-N4 are locked).
- PSADT log-entry wording outside E-P1.
- SUMMARY structure, and the order of EVIDENCE subsections within a plan.
- Estimate tokens per plan (the DRAFTS frontmatters carry starting values).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Source text and rulings (this phase)
- `.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-DRAFTS.md` — every VERBATIM-LOCKED string (the four amendment strings, the NOTICE block, CLOSED and SUPERSEDED paragraphs, the header amendment, the PSADT code and comments, the RE-237 cells and paragraph, the checkpoint task, the four plan frontmatters and task lists), the FACTS + SHAPE elements with their placeholders, the 40-row needle table, the seven-item allowlist and the redaction regexes, the EVIDENCE section list. **Source of truth; every editing task's `<read_first>` names it.**
- `.planning/REQUIREMENTS.md` — VND-01 (line 63), VND-02 (line 64), VND-03 (line 65) with their antecedent bytes; the evidence-label rule (line 19); owner ruling 4 (line 16); REF-02 (line 39, the pilot inventory Phase 165 lands); the D-28 amendment idiom (line 57).
- `.planning/ROADMAP.md` — Phase 161 (lines 97-108; SC2 at 105 and SC3 at 106 receive the amendment); Phase 160 SC2 (line 79, the landed idiom); Phase 164 (lines 136-148, owns the sensor); Phase 167 SC3 (leaf ownership).

### Standards and conventions
- `docs/_standards/EEE-SOP-standard.md` §"Admin Decision-Point Block Format (STD-05)" and §"Prose Style Authoring Standard" — the Step 8 block is an STD-05 block; new RE-237 prose is Google style Option 1 `--no-headings`.
- `.claude/skills/google-style/SKILL.md` and `check.py` (tracked copy); `.claude/skills/google-style-verify/SKILL.md` — pairing is mandatory only for bulk rewrites, not this phase.
- `assets/recipes/06-walk-up-avd-kiosk/NOTICE` — the asset-entry field idiom (Origin / Pinned SHA / Retrieval date / SHA256 / Bytes), the `Post-vendoring correction` idiom (lines 295-314), Ruling 1 and its Rule 2 scope extension (lines 141-174), the GAP paragraph (lines 332-342), the GUID finding precedent (lines 344-360), `Plan 155-05 wiring` (line 362; lines 371-376 superseded in part).

### Prior decisions this phase builds on
- `.planning/phases/160-licensing-hardware-decision-record/160-CONTEXT.md` — D-18 (OEM-cleanup class stays), D-28 and its `reversible` rating, D-30 (read-only checkpoint, `decline` as resume), D-31 (leaves are close-phase-authored), D-38 (three-file commit), D-39 (anti-pattern-15 carve-out).
- `.planning/phases/160-licensing-hardware-decision-record/160-DRAFTS.md` — lock-scope header (line 6), §FINAL AMENDMENT TEXT (line 169) and its seven properties, §Area J plan split (line 217), §Area K rubric (line 430).
- `.planning/phases/160-licensing-hardware-decision-record/160-01-PLAN.md`, `160-02-PLAN.md` (checkpoint task lines 181-216), `160-03-PLAN.md` (shared-`files_modified` dependency comment) — the plan idioms the four 161 plans mirror.
- `.planning/phases/160-licensing-hardware-decision-record/160-GATE-BASELINE.json` — the four-section baseline shape (`structural_gate`, `style_residual`, `pin_residency`, `line_endings`).
- `.planning/phases/160-licensing-hardware-decision-record/160-EVIDENCE.md` — task-headed sections, the excluded-identifier needle check (lines 60-66), the Phase 167 needle list (lines 240-275).
- `.planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK-RUBRIC.md` — copied to `161-FACTCHECK-RUBRIC.md` with the title and the class-2 record-file name changed.
- `.planning/phases/160-licensing-hardware-decision-record/160-02-SUMMARY.md` — `key-decisions` (the decline path quoted by the SC3/VND-03 amendments; the three fact-check rounds and two judge dispatches).
- `.planning/milestones/v1.22-phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-CONTEXT.md` — D-27 (no fabricated assets), D-34 (NOTICE convention; repository LICENSE out of scope), D-47 (tight em-dash canon for new prose).
- `.planning/research/PITFALLS.md` Pitfall 6 (lines 118-133) and `.planning/research/STACK.md` line 31 — the GPL-3.0 finding and the pin.

### Validators and instruments that bound the edits
- `scripts/validation/check-phase-54.mjs` — V-54-21 negative literal, V-54-27 recursive `.planning/` walk, V-54-30 placeholder purge (PATCH_FILES only), V-54-32 atomicity; baseline 32/0.
- `scripts/validation/check-phase-155.mjs` — V-155-PROVENANCE (`## Asset Provenance` exactly once), V-155-CONTENT (seven needles; `Deploy-WindowsApp.ps1` at RE-237 line 240), V-155-NOTICE (presence), V-155-ASSETPAIR (the two EEE pairs byte-identical; enumerates no directory).
- `scripts/validation/check-phase-156.mjs` — V-156-ADMIN-4 (RE-237 `administrator` == 10), V-156-SIGNINTO (`sign into` == 0 corpus-wide).
- `scripts/validation/c17-eee-contract.mjs` assertion 12 (≤ 200 chars per contiguous `>` run; RE-237 max 197 today).
- `scripts/validation/check-nav-hub-links.mjs` — `resolveLinkTarget` plus `existsSync` at line 290 (presence-only, no extension filter, accepts directories).
- `~/.claude/gsd-core/bin/lib/milestone.cjs` line 168 (the `mark-complete` checkbox regex) and `bin/lib/decisions.cjs` lines 36, 57, 186 (the D-NN bullet grammar this file follows).
- `scripts/docs-style/sweep3.py`, `_CONTENT-PINS.txt`, `check.py`, `judge-packets.py`, `_JUDGE-VERDICTS-batch10.json` line 13 (the `claude -p` dispatch shape).

### Assets this phase edits or reads
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1` (lines 1-16 header, 25-28 session block, 46-68 loops, 58-60 comment).
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md` (H2s at lines 3, 9, 15, 23, 28).
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskOemBloat.ps1` (15 patterns, byte-pinned) and `Files/Remove-KioskRunTasks.ps1` (line 20 PROTECTED comment; line 52 hive mount).
- `assets/recipes/06-walk-up-avd-kiosk/remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1` (emit sites; lines 87, 110-123).
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Build-WindowsAppPackage.ps1` (line 21 `.PARAMETER CodeSigningCertThumbprint`; lines 86-93 the sign idiom).
- `docs/recipes/06-walk-up-avd-kiosk-autologon.md` (RE-237: Step 4 block lines 100-116 as the idiom; Step 8 lines 207-225; Asset Provenance 234-243; Version History 321-326; frontmatter stamps lines 7-8).

### External sources (re-fetch at plan and execution time)
- `https://api.github.com/repos/andrew-s-taylor/public/commits?path=De-Bloat/RemoveBloat.ps1&per_page=1` — the pin; `…/contents/De-Bloat/RemoveBloat.ps1?ref=<sha>` — the blob SHA-1; `https://raw.githubusercontent.com/andrew-s-taylor/public/<sha>/De-Bloat/RemoveBloat.ps1` and `…/<sha>/LICENSE` — the bytes (fetch twice, compare). Repo license per `…/repos/andrew-s-taylor/public/license` is `GPL-3.0`.
- PSAppDeployToolkit 4.1.7 at `C:\Users\joanderson\OneDrive\Documents\PowerShell\Modules\PSAppDeployToolkit\4.1.7` — `Start-ADTProcess` `-PassThru` and `-SuccessExitCodes` help; `Frontend/v4/Invoke-AppDeployToolkit.ps1` lines 292 and 345-357 (the 60001 path).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Build-WindowsAppPackage.ps1` lines 86-93 — the only in-repo Authenticode signing idiom (cert by thumbprint parameter, `-TimestampServer`, `-HashAlgorithm SHA256`, `throw` on invalid); D-24 documents it, never commits its output.
- `160-01-PLAN.md` plus `160-GATE-BASELINE.json` — the tracer-plan and four-section baseline shape 161-01 mirrors; `160-02-PLAN.md` Task 1 — the `checkpoint:human-action` allowlist idiom 161-04 mirrors with a `costly` rating.
- `160-FACTCHECK-RUBRIC.md` — copied verbatim with two edits; `160-FACTCHECK.md` — the dispatch-log shape.
- RE-237 Step 4 (lines 100-116) — the "ruling recorded in the STD-05 block with its date" idiom Step 8 reuses; in-cell `**[PILOT]**` markers at lines 43, 47, 50, 298-305.
- NOTICE's `Post-vendoring correction` block (lines 295-314) with retro pointers at lines 276 and 292 — the in-place dated-correction idiom D-05 follows.

### Established Patterns
- `requirements: []` with an inline rationale comment as flip control; a requirement is declared where its last conjunct is settled.
- Annotate-and-supersede for planning documents; a `[SUCCESS-CRITERION AMENDMENT, D-NN]` note is appended end-of-line, quotes each file's own antecedent, and is `reversible`.
- Content leaves are authored by the harness-close phase (15/15 in v1.22); needles travel via EVIDENCE.
- Task-headed EVIDENCE sections; every `claude -p` process logged with its literal dispatch string; caps stated as rounds-per-fragment plus processes-total.
- `.gitattributes` `* text=auto eol=lf`; both upstream files are LF, so blob == worktree == upstream.
- Direct-`Edit` carve-out from universal anti-pattern 15 for criterion text, as its own numbered decision.

### Integration Points
- `KioskBaseline-Invoke-AppDeployToolkit-functions.ps1` — `$script:BundledScripts` below `$script:RegKey` (line 40); the two loops at lines 46-68; comment at 58-60; `AppVersion` line 24, `AppScriptVersion` line 28, `AppScriptDate` line 29.
- Baseline `README.md` — H2 at line 9 replaced by E-B1; four new H2s inserted per D-25; `## Validation (pilot)` at line 28 extended.
- `NOTICE` — header lines 9-10 (E-N3); the GAP paragraph lines 332-342 (E-N2 appended); new section before line 362 (E-N1); supersede after line 378 (E-N4); re-hash lines for the functions file and README.
- RE-237 — line 211 (E-R6), line 219 (E-R1), line 220 (E-R2), a new paragraph after the table and before the callout at line 222 with one blank line each side (E-R3), lines 238-240 (E-R4), line 324 region (E-R5 newest-first), lines 7-8 (stamps).
- `.planning/ROADMAP.md` lines 105-106 and `.planning/REQUIREMENTS.md` lines 64-65 (E-A1..A4 appended).
- Phase 167 consumes `161-EVIDENCE.md`'s needle list; Phase 164 consumes its sensor-defect section; Phase 163 receives any carried pilot run; Phase 165 receives the CrossDevice and Quick Assist notes.

### Measured hazards (re-measure at plan time)
- Upstream pin unchanged since research: `11918c50…` (2026-09-03), 179,789 bytes, 4,405 lines, LF, SHA256 `bf0f4bd0…`; LICENSE 35,149 bytes, SHA256 `3972dc97…`. Signature block at lines 4229-4405. Ten distinct GUIDs (fifteen occurrences).
- The `$IsOOBEComplete` gate at line 4097 runs the Office/Chrome/ODT block during ESP; `$intunecomplete` is read only inside a log string; five runtime fetch paths, one unconditional in ESP.
- `Microsoft.MicrosoftEdge.Stable` on `$Bloatware` line 444, protected only by the whitelist at line 332; `-custombloatlist` at lines 511-521 both arms and disarms.
- PSADT 4.1.7 `Start-ADTProcess` returns no object on a non-zero exit without `-ErrorAction SilentlyContinue`; the frontend exits 60001, so the shipped 70002 gate has never been reachable.
- Sensor v6 emits the kiosk SID in RUN/RUN1 lines (lines 113, 123; dead guard at 111); SRP-RULE emits a path (line 87); the sensor prints no hostname.
- RE-237 today: `administrator` 10, `Ask the admin` lead-ins 5, `What breaks` callouts 9, `## Asset Provenance` 1, `Deploy-WindowsApp.ps1` 4, `ruled 2026-09-10` 1, 74 U+2014 and 0 ASCII ` -- `, 27 `>` runs with max 197, CRLF worktree (LF blob), `last_verified: 2026-09-14`, `review_by: 2026-12-13`, 326 lines.
- NOTICE SHA256 records for the functions file (`fcd83293…`) and README (`44e6c618…`) go stale and are re-recorded; `check-phase-155` pins only the two EEE pairs and NOTICE presence.
- Largest tracked file 1,701,557 bytes (a `.planning/` artifact); largest outside `.planning/` 160,165 bytes.
- `SUCCESS-CRITERION AMENDMENT` count 1 per governance file today; `D-27` is already a live amendment label in three archived files, which is the norm, and each string names Phase 161.
- Apex `check-phase-159` 117/0 in ~2 minutes; `check-phase-54` 32/0; `check-phase-155` 10/0; `check-phase-156` 10/0; c17 237 files / 0; nav-hub 0/0.

</code_context>

<specifics>
## Specific Ideas

- The owner's standing instruction for this phase's discussion, given three times: grill every area and score every question with a Finder → Adversary → Referee round before any pick is presented; present only owner-only calls plus one accept-all. Twelve owner rulings resulted (D-07, D-10, D-19, D-22, D-24, D-27, D-28 O-1, D-31, D-32 default, D-35 O-2, O-3 Phase 163, and the O-1 follow-through that the whitelist clause makes no pilot claim).
- The owner accepts a documented-negative pilot outcome: `decline` is a resume signal, the absence is stated, never assumed, and the run is carried to Phase 163.
- Every new `docs/` string uses the tight em dash; every `.planning/` amendment string uses ASCII `--`.
- The verbatim-vendoring proof the owner wants is one command: `git show HEAD:<path> | sha256sum` equal to the upstream blob.

</specifics>

<deferred>
## Deferred Ideas

- **A `Build-KioskBaselinePackage.ps1` assembly script** — only if the owner later wants reproducible assembly (C5 option (b), declined).
- **Fixing sensor v6** — Phase 164, which owns the sensor under TRI-01; the dead line-111 guard, the SID emission at lines 113 and 123, the unguarded RUN1 loop and the SRP-RULE path emission at line 87; a fix forces a NOTICE re-hash plus a remediation redeploy (D-50).
- **160-REVIEW WR-01 and WR-02** — deferred to `/gsd-code-review 160 --fix`; `/gsd-secure-phase 160` is still owed.
- **Phase 165 notes** — `crossdeviceresume.exe` allow-list entry becomes inert once De-Bloat removes `MicrosoftWindows.CrossDevice` (D-14); Quick Assist is removed while RE-237 line 48 names it as a viewing path (D-19).
- **A repository-level LICENSE file** — 155 D-34, still out of scope.
- **Neutering the OOBE-gated block by a marked in-file edit** — declined at A9; revisit only if the pilot runtime ruling is `no`.

</deferred>

---

*Phase: 161-vendor-de-bloat-into-the-kiosk-baseline*
*Context gathered: 2026-09-16*
