# Phase 148: Application Update Management & WinGet Routing - Context

**Gathered:** 2026-08-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Two new guides are authored: `docs/operations/patch-management/07-windows-autopatch.md` (APP-01,
APP-02) and `docs/operations/patch-management/08-windows-app-updates.md` (APP-03..APP-06).
`00-overview.md` is touched for the **fourth and last** time — routing bullets and Related Resources
entries only. `co-management/03-cocmgmt-migration-paths.md` is **cross-linked and never edited**.

**Not this phase:** the firmware/BIOS domain (149-150); Recipe #5 (151); **any registry row,
filename-map row, canary bump, ops-index row or nav-hub wiring** (152, one atomic commit); the harness
close (153). No edits to `01-windows-wufb-rings.md` (sealed by Phase 146), to `co-management/**`, to
`docs/operations/app-lifecycle/**`, to `docs/admin-setup-apv2/**`, or to any `docs/reference/` matrix.

</domain>

<decisions>
## Implementation Decisions

Produced by `/grill-me` (65 sub-questions expanded from the 8 selected gray areas) then adjudicated by
`/adversarial-review` (5 parallel Finders -> Adversary -> Referee). 765 raw points, **97 issues after
dedup, 7 disproved, 90 confirmed** — 20 CRITICAL / 50 MEDIUM / 20 LOW. The Referee upheld 4 of the
Adversary's 5 disproofs, found a 5th the Adversary under-claimed, and surfaced **three defects all six
prior agents missed** (D-63, D-42, D-58).

The draft's own self-assessment was badly calibrated: **two of the three decisions it flagged as
riskiest were among its safest**, and its real failure — three requirements with no decisions at all —
went unflagged. Treat confident phrasing in any inherited artifact as a signal to re-measure.

**Every coordinate below was re-measured at HEAD `534073f4` by at least two independent agents. Re-measure
again at plan time — never transcribe.** Phase 146's coordinates went stale *inside Phase 146 itself*;
Phase 147's callouts census (147 D-25) went stale *the instant Phase 147 shipped* (D-24 below).

### HEAD baselines — carry into the PLAN

Re-run three times independently at `534073f4`: `check-phase-54` **32/0/0** · `check-phase-53` **26/0/0**
· `check-phase-59` **36/0/0** · `v1.20-milestone-audit` **16/0** · `check-nav-hub-links` **0/0** ·
`c17-eee-contract` **234/0** · `build-filename-map --self-test` **8/0** · `build-publish-bundle
--self-test` **15/0** · apex `check-phase-144` **101/0/0** (~20s).

- **D-01:** `[MEASURED]` **both canaries live at `scripts/pipeline/`, not `scripts/`.** A wrong path
  exits `MODULE_NOT_FOUND`, which reads as a failure and is not one. `check-phase-144` is the apex —
  `ls scripts/validation/check-phase-14*` stops at 144; Phases 145-147 authored no validator, and
  per-phase validators for this milestone are deferred to HARN-04.

### Owner rulings

- **D-02:** **[OWNER-RULED 2026-08-23]** **`## Setting the Channel from Intune` is fetched,
  non-blocking, and dropped on failure.** A real governing-document conflict exists and must be stated
  rather than silently resolved: `REQUIREMENTS.md:140` defers the Intune-side Microsoft 365 Apps update
  policy surface **beyond v1.21** under `## Future Requirements`, while `ROADMAP.md:152` names it under
  Phase 148's Research flag. Research attempts the fetch; if it succeeds the H2 ships, if it fails the
  H2 is **dropped and the absence stated**, and the phase proceeds. The draft's "BLOCKS the phase"
  grading is withdrawn — an item deferred past the milestone cannot block the phase.
  — **Reversibility:** reversible — a later phase can add the section additively once the surface is
  documented first-party.
- **D-03:** **[OWNER-RULED 2026-08-23]** **`00-overview.md:57`'s falsified hotpatch cell is left
  alone and filed as a v1.22 backlog item.** The cell reads `Hotpatch (Win 11 Ent 24H2+ default May
  2026) + VBS prereq`; the May-2026 cutover is unsupported by the current first-party articles. It is
  **not** corrected here: no APP-0N requirement and no Success Criterion covers it, the correction
  belongs to **FIX-07** which is `- [x]` complete at `REQUIREMENTS.md:28`, and `[MEASURED]`
  `145-CONTEXT.md` D-09 measured the identical strip behaviour while D-17's atom list gives
  `00-overview.md` = FIX-01+02+03+04+06+10 — **FIX-07 deliberately absent**, sitting instead in the
  `01-windows-wufb-rings.md` atom. Phase 145 knew the cell was strippable and excluded it on purpose.
  The backlog entry carries its evidence so it is owned rather than forgotten.
- **D-04:** **[OWNER-RULED 2026-08-23]** **`windows-autopatch-hotpatch-updates` joins the fetch list;
  Windows 11 Pro stays flagged unconfirmed.** The page is the **sole** first-party source for the
  hotpatch license list APP-02 needs, and `PITFALLS.md` C1-9 records **two agents each "re-fetching and
  verifying" that exact sentence and reaching opposite conclusions**, one on a stale revision. Re-fetch
  and reject any copy carrying the stale tells `Build 26100.2033` or `an x64 (AMD/Intel) CPU` — neither
  is on the current page. STACK §C-2's `UNVERIFIED` plan-time task (does a Pro device with an eligible
  license get hotpatch or the LCU?) is **not** resolved here; `07` mirrors what `01:144-145` already
  ships — flagged unconfirmed, not settled either way.

### Falsified rows in the draft — do NOT inherit these

Recorded so a planner reading any earlier artifact does not re-import them.

- **D-05:** `[REVERSED]` **`01#ring-terminology` is a phantom anchor.** `[MEASURED]` `01`'s complete
  anchor set is four ids — `:29 wufb-deployment-rings`, `:66 autopatch-disambiguation`, `:119 hotpatch`,
  `:170 driver-firmware-policy`. `ring-terminology` lives at **`00-overview.md:66`**. A live probe took
  `check-nav-hub-links` from `0/0` to **1 corpus-link failure** (`anchor not found`), and
  `check-phase-54.mjs:11` carries a comment stating where that H2 lives. Phase 146 sealed `01`, so the
  anchor can never be created.
  — **Reversibility:** one-way if shipped — the link checker has no baseline, allowlist or ratchet.
- **D-06:** `[REVERSED]` **nothing in the corpus links into any `01` anchor.** `[MEASURED]`
  `grep -rn "#hotpatch" docs/` = **0**; `grep -rn "01-windows-wufb-rings.md#" docs/` = **0**. The draft's
  "`06` already links into it" is fabricated. `07` establishes the corpus's **first** inbound `01`
  anchor link, so verify it in the plan's acceptance criteria rather than assuming a proven pattern.
- **D-07:** `[CORRECTED]` **the hotpatch coordinates.** The license list is `01:142-146`, not
  `:139-142` (which carries zero license text); "treat it as unconfirmed" is `:144-145`, not `:141-144`.
- **D-08:** `[CORRECTED]` **`05-linux-update-delivery.md` is 484 lines, not ~380** (`06` = 792), and
  carries 13 pipe-lines total. Any sizing argument built on the smaller figure is void.
- **D-09:** `[CORRECTED]` **`Autopatch` = 166 occurrences across 10 files**; the widely-quoted 143 is a
  matching-**line** count. `FEATURES.md:100` uses the occurrence convention. The conclusion — a delta,
  not a greenfield guide — is unaffected.
- **D-10:** `[CORRECTED]` **`check-phase-54.mjs` is the only validator that *pins* `00-overview.md`; it
  is not the only one that *reads* it.** `v1.20-milestone-audit.mjs:585` walks live `docs/` (C11 and C17
  both reach the file) and `check-nav-hub-links` scans every relative link in it. 147 D-66 is easy to
  over-generalise.
- **D-11:** `[CORRECTED]` **`policy-csp-desktopappinstaller` is not "the oldest source in the Pillar-C
  set."** STACK §C-1 cites `waas-manage-updates-wufb` at `ms.date 2024-05-16`; the `winget configure`
  page is `2024-11-21`. Re-fetch it anyway (D-45); drop the false comparative.
- **D-12:** `[CORRECTED]` **`docs/admin-setup-apv2/**` is pinned by zero validators.**
  `grep -rn "admin-setup-apv2" scripts/validation/*.mjs` = **0**. `02-etg-device-group.md` *is*
  C17-enrolled (`doc_id: RE-089, status: Approved`), which is the real constraint. The do-not-edit ruling
  (D-38) stands on other grounds.
- **D-13:** `[CORRECTED]` **`V-54-08` cannot be broken by a new table data row.** `[MEASURED]`
  `check-phase-54.mjs:127-144` tests only the header row and a transposed form, presence-only. A one-line
  data row probed 32/0/0; a *wrapped* data row also 32/0/0; only a **wrapped header row** fails, and it
  fails **loudly** (`V-54-08 FAIL`, 31/1). 147 D-34's real rule is the one that binds — see D-52.

### `07-windows-autopatch.md` — shape and content

- **D-14:** **`07` is a delta, not a greenfield guide.** It owns what nothing else owns: enrollment
  mechanics, the `Test`/`Last` model, the Autopatch **app-update** workloads, the containment position,
  and the Autopatch-specific reporting surfaces. Ring topology stays in `01`, prerequisites stay in
  `co-management/03`, drivers stay in `06`.
- **D-15:** `[NEW]` **The H2 skeleton — ten H2s, eight own-line anchors, matching `05` and `06`
  exactly.** `[MEASURED]` both siblings are 10 H2s / 8 anchors / 0 code fences.

  ```
  ## What Windows Autopatch Is and Is Not             APP-01 (honest scoping statement)
  ## Enrollment and Prerequisites                     APP-01 (service prereqs; cross-links co-mgmt/03)
  ## Autopatch Groups and the Test / Last Model       APP-01 (containment, 15 rings, 300 groups)
  ## Autopatch and Windows Update Client Policies     APP-01 (the corrected containment position)
  ## Update Workloads and Service Objectives          APP-01 (95% / 90% MEC / Edge Stable / Teams)
  ## Autopatch and Hotpatch                           APP-02 (both license lists, side by side)
  ## Reporting and Communications                     APP-01 (Autopatch-specific surfaces only)
  ## Unsupported and Anti-Feature Callouts            APP-01/02
  ## Related Resources
  ## External References
  ```

- **D-16:** `[NEW — nobody caught this until the Referee's fresh read]` **American spelling in every
  heading and every line of body prose.** `[MEASURED]` `Enrollment`/`enrollment` = **5481** occurrences
  in `docs/`; `Enrolment`/`enrolment` = **5**; British-spelled headings corpus-wide = **0**.
  `grep -rc "licence" docs/` = **0**. 146 D-39 already ruled on exactly this and gave the reason: **an H2
  becomes a GitHub slug that inbound links must match byte-for-byte, and `check-nav-hub-links` hard-fails
  an anchor miss** — in the file whose anchor ids Phase 151 consumes. Write `## Enrollment and
  Prerequisites`, `license`, `behavior`, `organization`. Carry a runnable
  `grep -rn "enrolment\|licence\|behaviour" docs/operations/patch-management/07*.md 08*.md` in the PLAN's
  acceptance criteria.
  — **Reversibility:** one-way once Phase 151 links the slug.
- **D-17:** **APP-02 carries BOTH license lists, side by side, in `07`.** This is not a regrettable
  duplication — `ROADMAP.md:147` SC#2 and `REQUIREMENTS.md:61` **mandate** it: *"both licence lists are
  shown differing, with the VDA inclusion on one side and Windows 365 Enterprise on the other."* The
  difference **is** the deliverable. `[CORRECTED]` the draft's framing (an "accepted inconsistency" under
  147 D-49) is a category error — D-49 accepted an **omission caused by a scope lock**, not authored
  duplication. Do not cite it here.
- **D-18:** **APP-02's barred conclusion gets a positive statement, not just a negative.** Write
  *"an Autopatch entitlement is necessary but not sufficient for hotpatch"*. `[MEASURED]` no validator
  parses any of this (`grep -rn "Source:" scripts/` = 0), so per 147 D-68 it needs a runnable grep in the
  PLAN — see D-56.
- **D-19:** **`07` cross-links `01-windows-wufb-rings.md#hotpatch` and `#autopatch-disambiguation`;
  it edits `01` not at all.** `[MEASURED]` `#autopatch-disambiguation` (`01:66`) is **the anchor APP-01
  and SC#1 name by function**, and the draft never identified it (`disambiguation` appeared zero times).
  Both anchors exist and are stable; `01` is sealed by Phase 146.
- **D-20:** **`07` writes the containment model positively and does not restate Phase 145's
  correction.** `[MEASURED]` `00-overview.md` and `01` are clean of mutual-exclusivity claims at HEAD
  (FIX-02 cleared all five sites: three in `00-overview.md`'s `## Ring Terminology`, plus `01:77` and
  `co-management/03:25`). Use the containment quote — an Autopatch group *contains* `Update rings policy
  for Windows 10 and later` — as the load-bearing citation. This section is what Phase 151 SC#2 consumes
  (D-60).
- **D-21:** **`07` owns the Autopatch *service* prerequisites `co-management/03` has never carried** —
  Entra ID P1/P2, corporate-owned-only with Windows BYOD blocked at registration, the 28-day check-in,
  diagnostic-data levels, the LTSC quality-updates-only restriction, app-only auth, and the
  no-user-based-Entra-groups rule. `03` owns the **workload-slider** chain and is cross-linked at
  `03:33 #autopatch-prerequisites`. `[MEASURED]` `03:64-80` is already a full Pre-Enablement Checklist,
  so state the precedence rule explicitly in `07`'s prose: `03` for the slider prerequisites, `07` for
  the service prerequisites.
- **D-22:** **`07`'s Reporting section covers only Autopatch-specific surfaces** — the Hotpatch quality
  update report, Autopatch alerts and remediation, the Autopatch groups membership report, enhanced
  Windows quality and feature update reports, device alerts, Intune reports, and Message center as the
  communications channel. It links `06:455 #driver-update-reporting` for drivers. `[MEASURED]` `06:456`'s
  `## Reporting` is scoped to driver policies; the surfaces are disjoint by workload.
- **D-23:** `[CORRECTED]` **Autopatch's GCC High / DoD exclusion needs a source before it may be
  stated.** `[MEASURED]` the claim sits at `PITFALLS.md:436` in an unquoted summary paragraph with **no
  URL and no `ms.date`**, and `:448` files it under *"Gaps to close"*; STACK §C-1 does not mention it.
  Either it is discharged by the D-04 fetch, or it ships as a documented silence. **The draft's
  instruction to "flag in CONTEXT so code review does not surface it as a defect" is withdrawn** — there
  is nothing to reconcile (Autopatch is a service, Enterprise App Management is an add-on; different
  products), and pre-silencing review is the wrong lever. `146` shipped **two Criticals that only code
  review caught**, which the validators structurally cannot see.
- **D-24:** `[CORRECTED, and it went stale inside Phase 147]` **`## Unsupported and Anti-Feature
  Callouts` now exists in SEVEN files, TWO of them under `docs/operations/`.** 147 D-25's "six files,
  `06:664` the only ops instance" was true when written and false the instant Phase 147 shipped
  `05:382`. The literal is still the pinned corpus form (`grep -rnE "^## .*(Limitation|Absence)" docs/`
  = 0) — use it verbatim in both new files. Only the evidence changed.

### `08-windows-app-updates.md` — shape and content

- **D-25:** `[NEW]` **The H2 skeleton — ten H2s, eight own-line anchors.** This maps §6's four
  prescribed subsections one-for-one and honours §6's own routing-subsection title.

  ```
  ## Choosing a Windows App Update Mechanism                      APP-03/04/05 (the 4-step hierarchy)
  ## Microsoft 365 Apps Update Channels                           APP-03 (6 channels + 3 constraints)
  ## Setting the Channel from Intune                              APP-03 (CONDITIONAL — D-02)
  ## Enterprise App Management                                    APP-04 (gates, SLOs, ESP/DPP positive)
  ## Microsoft Store Apps                                         APP-05 (the split, ARM64, preview)
  ## Enterprise App Management, Store Apps and WinGet — Routing   APP-05 (the negative + reconciliation)
  ## Controlling WinGet on Managed Devices                        APP-06 (hardening, not patching)
  ## Unsupported and Anti-Feature Callouts                        APP-04/05 (all eight limitations)
  ## Related Resources
  ## External References
  ```

  If D-02's fetch fails, `## Setting the Channel from Intune` is dropped -> 9 H2s / 7 anchors, and the
  absence is stated in `## Microsoft 365 Apps Update Channels`.
- **D-26:** `[NEW — the draft had ZERO decisions for APP-03]` **The channels section delivers all ten
  clauses of `REQUIREMENTS.md:62`.** Six channels — Current (**the default**, rollback *"Not
  applicable"*), Current Preview, Monthly Enterprise, Semi-Annual Enterprise, **Semi-Annual Enterprise
  Preview**, and **Beta (not supported — test environments only)** — plus the three structural
  constraints: **one channel per device**, **device-scoped rather than user-following**, and **Teams and
  OneDrive explicitly outside these channels**. `[MEASURED]` the draft mentioned `Teams`, `OneDrive`,
  `Beta`, `device-scoped` and `Current Preview` **zero times each**. Source: `STACK.md` §C-3. Note
  `PerpetualVL2021` is a seventh row in §C-3 that APP-03 does not name — mention or omit, but do not
  silently drop it without a decision.
- **D-27:** **The post-July-2026 Semi-Annual cadence ships as a documented conflict, not as a fact.**
  `[MEASURED]` STACK §C-3 recorded the source page as **internally inconsistent with itself** on
  2026-08-19: the top-of-page notice and the SAEC section are future-tense about a July-2026 change,
  while the page's own comparison table still describes the old twice-yearly behaviour. Write the
  announcement with its date **and its verbatim tense**, note that the comparison table was not revised,
  and state that neither "the change landed" nor "the change is upcoming" is supportable from the page.
- **D-28:** `[NEW — the draft had ZERO decisions for APP-04's gates]` **Enterprise App Management's five
  reachability gates are stated as hard as its license** (`REQUIREMENTS.md:63`): an add-on subscription
  (standalone **or** Intune Suite), **Windows Win32 (exe/msi) only**, **Microsoft-hosted and
  IME-installed**, **Public / GCC High / DoD clouds only**, and **auto-update requiring a `Required`
  assignment**. The published SLOs ride here too (80-90% within 24h of ingestion; manual-validation
  <= 7 days; expedited goal 48h) because APP-05 contrasts against them (D-31).
- **D-29:** `[NEW — CRITICAL sourcing correction]` **The eight EAM limitations are cited from
  `FEATURES.md:97`, NEVER from `STACK.md` §C-4.** `[MEASURED]` §C-4's bullet list is **twelve** bullets
  and **omits** one of the canonical eight — *"Version changes during device processing"*, which
  `grep -rn` finds at **exactly one place in the entire planning tree**, `FEATURES.md:97`. A planner
  following the draft's citation ships **seven of eight** and fails SC#3 silently. The eight:
  no rollback / no automatic uninstall remediation · **malicious version revocation** (the admin remains
  responsible for identifying impacted devices) · catalog cache lag up to one hour · no rollout rings or
  phased deployment · reporting reflects latest state only · **version changes during device
  processing** · not supported as a blocking app in ESP / Autopilot device preparation · conflicts with
  other app types targeting the same app.
- **D-30:** **APP-04's ESP/DPP positive is written as a trade-off and does NOT live under the callouts
  H2.** `[MEASURED]` `STACK.md:406`'s *Benefits* section states catalog apps **are** supported as ESP and
  DPP blocking apps; only **auto-update** ones are not. Filing a positive under an H2 whose title asserts
  the prohibition inverts it. It belongs in `## Enterprise App Management`, phrased as `STACK.md:408`
  directs — *"say it as a choice"*. Cross-link `docs/reference/win32-app-packaging.md` and
  `docs/admin-setup-apv1/03-esp-policy.md`, which already own blocking-app configuration.
- **D-31:** `[NEW — the draft had ZERO decisions for APP-05's split]` **The Microsoft Store app (new)
  section delivers the full update-model split.** UWP apps kept current **by the Store, with or without
  an Intune assignment**; **Win32 Store apps kept current by Intune and therefore requiring an
  assignment**; Win32 Store apps **currently in preview**; **ARM64 installers unsupported**; paid apps
  unsupported; the two-core-processor floor; and the suppression asymmetry (the Store auto-update block
  CSP stops UWP updates but **not** Win32 ones — for those, only removing the assignment stops it).
  Source: `WINGET-GAP.md` §1.3's five-row table and §1.5's four constraints — `[MEASURED]` **neither
  section was cited by any draft recommendation**.
- **D-32:** **The published-cadence absence is itself a deliverable, and it is contrasted.** `[MEASURED]`
  `WINGET-GAP.md:104-108` records `SOURCED (absence)`: the page states *that* apps are kept up to date
  and gives **no cadence, no check interval, no schedule, no SLO and no version pinning**, and nothing on
  `deploy-windows` or the EAM page supplies one. SC#4 requires this absence be stated **and contrasted
  against the published ones** — so it sits beside D-28's EAM SLOs. Do not invent a number and do not
  borrow the IME's or EAM's.

### The `08` <-> `app-lifecycle/` seam

- **D-33:** `[REVERSED — the draft's seam was falsified by all three corpus files it cited]` **The seam
  is object-model versus update-governance, not install-versus-currency.** The draft proposed
  *"`app-lifecycle/` owns getting an app on a device and replacing it by hand; `08` owns keeping an app
  current without a human."* Three measurements kill it:
  1. `[MEASURED]` `app-lifecycle/00-overview.md:73-79` already publishes **`update`** as a lifecycle
     state — *"`update` (a newer version replaces the installed version)"*, and *"All four platforms
     expose `install` and `update`"*. The seam re-assigns a concept the corpus already assigned, in a
     file D-35 forbids editing.
  2. `[MEASURED]` `app-lifecycle/01:63` documents Available-assigned supersedence **auto-updating on the
     IME check-in timer (8-16 hours)** — unattended, no human. The seam cuts *through* `01#supersedence`.
  3. `[MEASURED]` `STACK.md:381` — EAM auto-update *"detects a newer catalog version and updates targeted
     devices with **no new app object and no supersedence relationship**."*
  **The corrected seam:** `app-lifecycle/` owns the **object model** (app types, packaging, supersedence
  graphs, dependency chains, ContentPrepTool); `08` owns **update governance** (which mechanism, what
  cadence, what it cannot do).
- **D-34:** `[REVERSED]` **`08` links `app-lifecycle/01#supersedence` ONLY where supersedence is
  genuinely the mechanism** — the Win32 fallback tier of the four-step hierarchy — and states
  **explicitly that EAM auto-update is not supersedence**. The draft's rule ("every EAM auto-update
  sentence links `#supersedence`") sends the reader to the exact mechanism Microsoft says EAM does not
  use. `FEATURES.md:94`'s C-1 (*"the missing half of `app-lifecycle/`"*) is discharged by this
  conceptual split plus the hierarchy, per `FEATURES.md:280`'s delta-not-re-author instruction.
- **D-35:** **No edits to `docs/operations/app-lifecycle/**`.** Inbound links are Phase 152's. `08`
  links out; nothing links in until 152. `[MEASURED]` `app-lifecycle/00-overview.md` is
  `last_verified: 2026-04-28 / review_by: 2026-06-27` — past due, and `FEATURES.md:283` warns that
  authoring new guides linking into stale ones propagates staleness. Accepted knowingly; the file is
  outside the blast radius and the whole past-due population is parked (D-58).
- **D-36:** **`08`'s intro states why it lives in `patch-management/` rather than `app-lifecycle/`** —
  it is the update-governance view of applications, the sibling of `01`-`07`, not the deployment view.
  Without that sentence a reader who knows `app-lifecycle/` exists assumes one of the two is stale.

### The `07` <-> `08` seam — the real one

- **D-37:** `[NEW — the draft invented a fake cross-file conflict and missed this one]` **Autopatch
  pins the Microsoft 365 Apps channel, and that conditions everything `08` says about channel choice.**
  `[MEASURED]` `STACK.md:294` — Autopatch *"aims to keep at least **90%** of eligible devices on a
  supported version of the **Monthly Enterprise Channel (MEC)**"*; `STACK.md:282` — an Autopatch group is
  a container that includes **Microsoft 365 App update policies** and **Microsoft Edge update policies**.
  So an Autopatch-enrolled fleet is steered to MEC, which directly constrains APP-03's "one channel per
  device". **`Microsoft Edge` appears zero times in the draft** and was unallocated between the two
  files. Ruling: `07`'s `## Update Workloads and Service Objectives` owns Autopatch's Edge and Teams
  coverage; `08`'s channels section states the Autopatch-enrolled condition and links `07`.
  `FEATURES.md:100` predicted exactly this cross-pillar collision.

### WinGet — routing, reconciliation and hardening

- **D-38:** **The WinGet material is FOUR subsections mapped to `WINGET-GAP.md` §6, not two.**
  `[CORRECTED]` the draft's "two H2s out of roughly eight" rested on a denominator error — APP-01 and
  APP-02 live in `07`, so `08` holds **four** requirements and APP-05+APP-06 is **half of `08`**, not a
  third of the phase. And §6's *"One or two"* at `:308` counts **requirement IDs**, not H2s. §6's four
  subsections map one-for-one onto D-25's `## Choosing...`, `## Microsoft Store Apps`,
  `## ... — Routing` and `## Controlling WinGet...`.
- **D-39:** **The verbatim FAQ negative ships with its anti-fabrication guardrail recorded.**
  `WINGET-GAP.md:222-226`: the FAQ question *"Does Enterprise App Management use **Winget**?"* is
  answered *"No. Enterprise App Catalog apps are directly installed by the Intune management extension
  (IME)."* — and the guardrail is verbatim: **"Do not extend it, do not paraphrase it into something
  stronger, and do not attach a date or a rationale Microsoft did not give."** That is the strongest
  anti-fabrication instruction in the evidence base and the draft never recorded it.
- **D-40:** `[NEW]` **The "three different things" clause gets a decision.** APP-05 requires that the
  name WinGet be shown attaching to three genuinely different things: the **Microsoft Store app (new)**
  Intune app type (a patching surface); **App Installer / `winget.exe`**, the OS component (not a
  patching surface, only a Group-Policy-shaped on/off surface); and **`winget configure`** / WinGet
  Configuration (developer machine setup, out of scope). One sentence for `winget configure` plus its
  kill-switch row; `[MEASURED]` its page is `ms.service: dev-environment`, `ms.date 2024-11-21`, never
  mentions Intune or MDM, and documents partial success as designed behaviour.
- **D-41:** `[NEW — owned by nobody in the draft, and it is the most Autopilot-relevant WinGet fact]`
  **The SYSTEM-context root cause is documented, first-party.** `WINGET-GAP.md:156`: WinGet is a
  per-user-registered MSIX package whose availability is gated on an interactive first sign-in and an
  asynchronous Store registration — so *"Every context where Intune runs code with no signed-in user —
  **Autopilot / device-preparation ESP**, a Win32 app or platform script in **System** context, a
  device-context remediation — is a context where WinGet may not be registered and resolvable."* On an
  Autopilot corpus this is the reason the device-preparation lines cannot stand unqualified (D-43).
  `[MEASURED]` the page's `## Administrator considerations` covers only elevation and UAC and says
  **nothing** about SYSTEM or unattended execution — `SOURCED (absence)`.
- **D-42:** `[NEW — nobody caught this; the two decisions contradict each other]`
  **`SourceAutoUpdateInterval` is BOTH a table row and a bold sub-label expansion.** The draft's Q2.5
  enumerated it as one of six retained rows while Q2.6 said *"headline it ... not a table cell"* — both
  `[MEASURED]`-labelled, in the same area. It is the one row `REQUIREMENTS.md:65` names by name, and it
  is the clean disqualifier: the index *"is not updated in the background"* and refreshes only when **a
  user invokes a command**. Row in the table, expansion beneath it.
- **D-43:** **The WinGet reconciliation is explicit, and it names three corpus sites, not two.**
  `[MEASURED]` the two `winget` hits are real and both accurate —
  `docs/admin-setup-apv2/02-etg-device-group.md:129` and `03-device-preparation-policy.md:141`. But a
  **third** site states the conflation in the corpus's own Reference voice and the `winget` grep misses
  it: `docs/reference/macos-capability-matrix.md:70` — `| Microsoft Store integration | Yes (Windows
  Package Manager) | ... |`, and "Windows Package Manager" **is** WinGet. Also
  `docs/recipes/01-shared-windows-avd-client.md:81` uses **Microsoft Store app (new)**, the app type `08`
  governs. The reconciling sentence, per `WINGET-GAP.md:123`, keeps its **device-preparation** scope:
  *"Where the Autopilot device-preparation documentation says only Microsoft Store apps that support
  WinGet are supported, that is a device-preparation eligibility filter on the Intune **Microsoft Store
  app (new)** app type — not a statement that the WinGet CLI is an Intune-managed patching surface."*
- **D-44:** **The reconciliation lives in `## Enterprise App Management, Store Apps and WinGet —
  Routing`, and none of the three named sites is edited.** `[MEASURED]` the apv2 files are accurate and
  outside the blast radius; `macos-capability-matrix.md` is outside it too and no APP-0N clause reaches
  it. **Accepted gap, recorded:** `02:129`'s bare *"Microsoft Store (WinGet)"* stands unchanged and
  unlinked, so the correction is reachable only by a reader who already found `08`. The inbound wiring
  and the third-site sweep are handed to Phase 152 and the backlog respectively (D-61, D-64).
- **D-45:** **The `DesktopAppInstaller` table ships six rows plus a link-not-copy pointer.**
  `EnableAppInstaller` · `EnableWindowsPackageManagerCommandLineInterfaces` ·
  **`EnableWindowsPackageManagerConfiguration`** (D-40's kill switch — the draft's six-row list omitted
  the row its own adjacent decision required) · `EnableMicrosoftStoreSource` · `EnableDefaultSource` ·
  `SourceAutoUpdateInterval`. `[MEASURED]` §2.4 lists 15; transcribing a Microsoft reference page is what
  §5's link-not-copy guardrail excludes. **Plus:** one sentence naming private WinGet REST sources as out
  of scope (`WINGET-GAP.md:291` rules a sentence correct and a section not), noting
  `EnableAdditionalSources` / `EnableAllowedSources` can point at one that Intune cannot see; and the
  compliance-scripting registry key `Software\Policies\Microsoft\Windows\AppInstaller` as inline code
  (`WINGET-GAP.md:210` — the one operationally actionable artifact in §2.4).
- **D-46:** **The settings-catalog trap is the closing item of the hardening H2, written as a
  consequence.** `[MEASURED]` `WINGET-GAP.md:126,129` — the two policies Microsoft **recommends enabling**
  inside its own Store-app deployment article (`EnableAppInstaller`, `EnableMicrosoftStoreSource`) are
  flagged *"Not built in; use a custom configuration profile"*, i.e. **not in the settings catalog**. So
  an admin hardening Windows can silently degrade a supported Intune app type using a lever Intune never
  surfaces. That sentence is why APP-06 exists.
- **D-47:** **Community WinGet tooling and third-party patch products are named as a category, in one
  sentence each, with no project named.** `[MEASURED]` verified consistent with Phase 146 precedent: `06`
  names **zero** OEM vendors, and `PatchMyPC|Chocolatey|Ninite|Scappman|Robopack|TechDirect|Dell
  Command|HP Connect` = **0 hits** in `docs/`. `[CORRECTED]` the basis is `WINGET-GAP.md:286`'s scope
  rule, which is labelled `PREMISE`, not a measurement.
- **D-48:** **The four-step hierarchy renders as a decision list, not a code fence.** `[MEASURED]`
  `WINGET-GAP.md:271-276` supplies it inside a fence; all seven `docs/operations/patch-management/` files
  carry **zero** fences.

### `co-management/03` — cross-link only

- **D-49:** **[REVERSED — the draft's most emphatic scope-growing decision, killed five independent
  ways]** **`co-management/03-cocmgmt-migration-paths.md` is cross-linked and NEVER edited.** Each of
  these is sufficient on its own:
  1. `[MEASURED]` `REQUIREMENTS.md:129` — the draft's sole cited authority — **says the opposite**. It
     records *FIX-01's* sweep (Phase **145**, commit `d6cc29bc`) reaching a file *"which the architecture
     research had ruled 'cross-link only, do not re-author.'"* A past incursion restating a standing
     prohibition, read as future licence.
  2. `REQUIREMENTS.md:60` (APP-01) closes with *"re-authoring neither"*; `ROADMAP.md:146` SC#1 requires
     *"prerequisite literals intact"*; `ROADMAP.md:151` names `03` **only as a constraint to respect**.
  3. `[MEASURED]` the three-workload claim lives at **six sites across three files** — `03:36-37`,
     `03:39-47`, `03:50-52`, `03:54-58`, plus `co-management/00-overview.md:118-131` (an entire H2) and
     `co-management/02:28/:64/:144-146`. Correcting only `03` reproduces exactly the multi-site error
     `PITFALLS.md` C1-8 exists to warn about, while `co-management/00:130` routes readers straight into
     the corrected anchor past uncorrected text.
  4. `[MEASURED]` extending the fix to `02` breaks **`146-CONTEXT.md` D-72, `[OWNER-RULED 2026-08-19]`**:
     *"Cross-link only, do not edit. No v1.21 phase owns this file"* — six live `check-phase-53` pins.
  5. `[MEASURED]` the proposed evidence-line shape is barred by the decisions the draft cited in its
     favour: `145-CONTEXT.md` D-05 — *"Corrections landing in `co-management/03` ... carry no evidence
     line"*; D-01 — *"Do not invent an inline parenthetical"*; and 147 D-08, cited as support, actually
     **withdrew** an invented shape and concluded *"145 D-01 governs."*
  — **Reversibility:** n/a — the decision is to not act.
- **D-50:** **The two-versus-three workload question IS a real conflict, and it goes to research as a
  question, not to the corpus as an edit.** `[CORRECTED]` the disproof that "at minimum is a floor, so
  there is no conflict" fails: `03:54-58` attributes to `windows-autopatch-prerequisites`
  (`ms.date 2026-02-26`) the claim that it *"specifies all three workloads including Windows Update
  Policies"*, while `STACK.md` §C-1 cites **the same page at the same date** and its prerequisites table
  has **no Office Click-to-Run row at all**. Same page, two incompatible readings — a checkable
  disagreement, not a grammar quibble. The answerable question is narrow: **is Office Click-to-Run Apps a
  documented Autopatch prerequisite?** `07` states whatever the fetch establishes, in its own voice,
  without touching `03`. If the answer is three, `STACK.md` §C-1 is amended (a research ledger, not
  corpus) per the 147 D-17 instrument.
- **D-51:** **`03`'s frontmatter is not re-stamped, and its stale license parenthetical is not fixed
  here.** `[MEASURED]` `03` is `last_verified: 2026-04-27 / review_by: 2026-06-26` — exactly 60 days,
  compliant, and 57+ days past due. `check-phase-53.mjs:98-105` tests only `days > 60`; **no validator
  compares `review_by` to today**, so the past-due figure carries zero gate consequence. Phase 145
  corrected `03` at `d6cc29bc` and did **not** re-stamp. `REQUIREMENTS.md:139` parks the whole past-due
  population (**217 of 271 files**) under `## Future Requirements`, trigger = a dedicated corpus-hygiene
  milestone. Two live defects in `03` are recorded to the backlog rather than fixed: the pre-April-2025
  license parenthetical at `03:76-78` (which excludes Business Premium and Education A3/A5 —
  `STACK.md:256-262`), and the planning-ledger citation at `03:55` (D-64).

### `00-overview.md` — touch 4 of 4

- **D-52:** **Four edit sites, all additive: two routing bullets and two Related Resources entries.**
  Routing bullets go after the `01` Windows bullet in the order `07`, `08`; Related Resources entries go
  after `06`, keeping Windows entries contiguous. `[MEASURED]` both lists are currently ordered
  `01, 06, 02, 03, 04, 05` — the routing list is platform-ordered with `06` second, and Related Resources
  is non-numeric, so the insertion point is a judgement call. **One physical line per bullet and per
  entry** — see D-53.
- **D-53:** `[NEW — measured, and the draft named neither hazard]` **Two `V-54-29` leaks, both silent
  until the validator runs.**
  1. **The description leak.** `check-phase-54.mjs:499-509` strips frontmatter, table rows, fenced code,
     `[text](url)` and inline code — but **not the em-dash description after a link**. Every existing
     Related Resources entry carries one, and `07`'s natural description mentions Hotpatch. A probe of
     exactly that measured **`V-54-29` FAIL, 31/1**; the Hotpatch-free variant of the same four
     insertions measured **32/0/0**. **`Hotpatch`, `VBS` and `MEETS_STRONG_INTEGRITY` are barred from
     every `00-overview.md` insertion — in prose, in link text and in descriptions.**
  2. **The wrapped-link leak.** The strip is `/\[.*?\]\(.*?\)/g` and `.` does not cross newlines, so a
     link wrapped across two physical lines leaks its text into body prose. `[MEASURED]` a one-line entry
     probed 32/0/0; the identical text wrapped after "and" probed **31/1**. `00-overview.md` wraps prose
     at ~95 columns, so wrapping is the natural author move.
  — **Reversibility:** reversible, but invisible on inspection — only the validator sees it.
- **D-54:** **No new comparison-table row, and no change to the platform-applicability blockquote.**
  `[CORRECTED]` the reason is editorial, not mechanical: `V-54-08` is presence-only and a data row cannot
  fail it (D-13). The real rule is 147 D-34's — **every table row and every link stays on one physical
  line** — plus `147-VERIFICATION.md:23`'s measured *"max 403 chars, unwrapped"*. The table is
  concept-keyed on OS-update concepts across five platforms; an application row would be Windows-only in
  four of five cells. `[MEASURED]` `V-54-26` pins the literal `> **Platform applicability:**` inside the
  first 50 body lines and 147 D-36 measured a reworded lead-in failing at 31/1 — `07` and `08` are
  Windows surfaces, not platforms, so the blockquote's platform enumeration does not change.
- **D-55:** **Conditional frontmatter re-stamp, computed by arithmetic.** `[MEASURED]`
  `00-overview.md` is `last_verified: 2026-08-21 / review_by: 2026-10-20` — exactly 60 days, **zero
  slack** under `V-54-07`'s `> 60` test. If the execution date differs from `last_verified`, re-stamp
  **and** recompute `review_by = last_verified + 60` in the same commit; if it matches, deliberate no-op
  — do not manufacture a diff. **Never advance one stamp without the other:** `V-54-07` has no lower
  bound, so advancing `last_verified` past `review_by` drives the interval negative and **silently
  passes**, while advancing `review_by` alone fails loudly at 61 days.
- **D-56:** `[MEASURED]` **line endings, resolved now rather than at plan time.** `git ls-files --eol
  docs/operations/patch-management/`: index LF throughout; worktree **`00`-`04` CRLF**, **`05` and `06`
  LF**. `07` and `08` are born LF like their nearest siblings. `00-overview.md` is CRLF, so **verify
  every string replacement matched — a zero-match is silent.**
- **D-57:** `[CORRECTED]` **`00-overview.md:48-49` carries "(file numbers 01 through 05)" and it does
  not change** — it describes the five *per-platform* files, and `06`/`07`/`08` are not per-platform.
  But `[MEASURED]` `five` occurs at **seven** sites (`:42, :43, :49, :62, :182, :188, :198`), and
  `:182-183` — *"Each of the five guides routes back to this overview via its own Platform applicability
  blockquote"* — becomes contestable once `07`/`08` carry mirrored blockquotes. Build the full site map
  before editing, as 147 D-37 did before flipping four to five.

### The research pass

- **D-58:** **A bounded fetch list of nine, with a stated failure policy for every item.** `[CORRECTED]`
  the draft graded four of eight and left (e)-(h) with no consequence-on-failure.

  | # | Target | On failure |
  |---|---|---|
  | (a) | Intune-side **Microsoft 365 Apps update policy** surface (settings-catalog / Cloud Policy path, exact setting names) — never fetched by anyone | **Drop the H2, state the absence, proceed** (D-02) |
  | (b) | `overview-update-channels` — post-July-2026 SAEC state | Ship the documented conflict (D-27) |
  | (c) | `add-microsoft-store` — have Win32 Store apps left preview? | **Blocks the SC clause**, not a sentence — SC#4 and `REQUIREMENTS.md:64` both require *"in preview"*; escalate |
  | (d) | `windows-autopatch-prerequisites` — is Office Click-to-Run a documented prerequisite? (D-50) | `07` states the documented position and notes the divergence |
  | (e) | `enterprise-app-management` — the verbatim FAQ negative + the SLOs | **Blocks APP-04's negative**; escalate |
  | (f) | `policy-csp-desktopappinstaller` — APP-06's entire CSP surface | **Blocks APP-06**; escalate |
  | (g) | Settings-catalog leaf names for `AllowAppStoreAutoUpdate` / `DisableStoreOriginatedApps` | Cite the CSP name instead; non-blocking |
  | (h) | winget-cli issue **#5752** — still open and unanswered? | Non-blocking; `WINGET-GAP.md:319` records a reply would change §2.2's framing but not its conclusion |
  | (i) | **`windows-autopatch-hotpatch-updates`** — APP-02's license list (D-04) | **Blocks APP-02**; escalate |

  Ships as a **documented silence** regardless: the Store-app cadence (D-32); any claim that the Store
  app type is implemented on the WinGet client or `msstore` source (`UNVERIFIED` — never assert);
  `Repair-WinGetPackageManager -AllUsers` as a supported SYSTEM path (documented for Windows Sandbox
  only — never assert).
- **D-59:** `[CORRECTED — the draft prescribed a method already measured to fail on its own list]`
  **Retrieval is `curl` + tag-strip + literal grep for Microsoft Learn, not `gh api`.** 147 D-07's
  `gh api` precedent is **Canonical-specific**. `[MEASURED]` `146-RESEARCH.md:99` established that
  `MicrosoftDocs/windows-itpro-docs` is **not publicly readable on any branch** (`main`/`live`/`public`
  all 404) — and item (f) lives there; `memdocs` **is** readable but the naive path guess 404s, so read
  `<meta name="original_content_git_url">` first. `147-VERIFICATION.md:150` records the method that
  worked: *"`curl` + tag-strip + literal grep, 8 pages"*, `:85` *"Zero fabrications"*. Record
  `ms.date` **and** `updated_at` beside every quote so a stale read is detectable rather than confident.
- **D-60:** `[NEW]` **Items (a) and (g) have a known-failing retrieval path and need a contingency
  written down.** `[MEASURED]` `145-VERIFICATION.md:99`: an Intune settings-catalog reference table
  *"could not be independently verified via `curl` because that page renders its settings table
  client-side via JavaScript."* (a) and (g) are that exact artifact class. Do not treat a JS-rendered
  failure as evidence of absence.
- **D-61:** `[NEW]` **Same-page decoys and stale revisions, both classes.** `[MEASURED]`
  `add-microsoft-store` mentions WinGet **only as policy carve-outs**, so a naive grep for `winget` on
  that page returns hits that invite exactly the conclusion APP-05 bars. And `PITFALLS.md` C1-9 documents
  a **stale revision** of the hotpatch page carrying `Build 26100.2033` and *"an x64 (AMD/Intel) CPU"*,
  neither on the current page. **Pin every quote by its surrounding heading, never by grep hit**, and
  treat those two tokens as a stale-revision tell (D-04).
- **D-62:** **The verifier re-fetches and diffs, and the PLAN says so.** `[MEASURED]` 145's verifier
  fetched 7 live URLs with zero fabrications; 146 recorded `pages_fetched: 8`,
  `verbatim_strings_diffed: 36`; 147 recorded 8 pages, zero fabrications. `[MEASURED]` no validator
  parses evidence lines (`grep -rn "Source:" scripts/` = 0) — the verifier is the only gate that can
  catch a fabricated quote.

### Sourcing and the evidence-line contract

- **D-63:** `[NEW — nobody caught that the contract itself was missing]` **`07` and `08` follow `06`'s
  evidence-line pattern.** `[MEASURED]` 145 D-05 scoped evidence lines to "the five patch-management
  documents only", yet `06` — the sixth — ships **64** `**Source:**` lines and `05` ships **11**; all 93
  corpus-wide are line-start and standalone. The contract: **one standalone, line-start
  `**Source:** [Article title](url) (updated YYYY-MM-DD)` paragraph per corrected or quoted claim**,
  placed *after* the claim, never inside the leading blockquote (145 D-07), never an inline parenthetical
  (145 D-01).
- **D-64:** `[NEW]` **The SCOPE rule is as load-bearing as the shape.** 147 D-21: *"own paragraph,
  standalone, after the claim. One Source line may cover one blockquote of contiguous quotes from one
  page; **it may never span claims from different pages.**"* `146-REVIEW.md` WR-01 found a Source line
  scoped to a whole mitigation list *"lending first-party authority to an unsourced claim"*. This phase
  carries the milestone's heaviest multi-page quote load — eight EAM limitations, six channels, three
  SLOs, six CSP rows and the FAQ negative across six-plus Learn pages.

### Commits, waves and gates

- **D-65:** **Three plans, three commits, three waves — strictly sequential.** (1) author `07`;
  (2) author `08`; (3) `00-overview.md`'s four edit sites plus the conditional re-stamp. `[MEASURED]`
  146 ran 3 sequential waves and 147 ran 2; project convention is `use_worktrees: false` with sequential
  execution on the main tree. Plan 2 follows plan 1 because `07` links `08`; plan 3 is last because
  `[MEASURED]` **four dangling links measured 4 corpus-link failures and took the apex to 100 PASS /
  1 FAIL** via `V-144-CHAIN-143 -> V-143-CORPUSRUN` (147 D-48 measured one link = one failure; this
  phase lands four).
- **D-66:** `[NEW]` **Plan the remediation round in.** `[MEASURED]` **neither predecessor finished in
  the number of plans it started with** — Phase 146 has 3 PLAN files but 18 commits including `146-04`
  (four commits) and `146-05`; Phase 147 needed `02b21244` (CR-01/02/03 + WR-01/02) and `87567990`
  (WR-10) after two clean plans. `REQUIREMENTS.md:133` names `00-overview.md` *"the likeliest source of
  a mid-execution remediation round"*.
- **D-67:** **Nine gates (D-01's baselines), apex once before plan 1 and once after plan 3.**
  `[MEASURED]` the apex costs ~20s, so per-plan runs are effectively free — run it more often than the
  two mandatory points.
- **D-68:** `[NEW — the honest statement the draft never made]` **The nine gates assert almost nothing
  about this phase's deliverable.** `[MEASURED]` `PATCH_FILES = [OV, WIN, MAC, IOS, AND_]`
  (`check-phase-54.mjs:35`), so `07`/`08` sit outside `V-54-07` (frontmatter + 60-day cycle), `V-54-26`,
  **`V-54-30` (the TBD/TODO/FIXME/PLACEHOLDER ban)** and `V-54-31`; outside C17 (enrolled iff `doc_id`);
  outside the registry. `grep -rn "patch-management" scripts/validation/*.mjs` returns **one** hit
  outside `check-phase-54` (`check-phase-57.mjs:31`, pinning `04-android-patch-delivery.md`, which this
  phase does not touch). **The only live gates on the two new files are `V-54-27`, `check-nav-hub-links`'
  target-existence arm, and C11 via `v1.20-milestone-audit.mjs:585`'s live `walkMd('docs')`.** All nine
  read green whether the new files are correct, wrong, or largely empty. The acceptance criteria carry
  the weight — see D-69.
- **D-69:** **Every prose negative in this document carries a runnable grep in the PLAN's acceptance
  criteria.** 147 D-68: *"**Every** prose negative ... must carry a runnable grep."* The set here:
  D-16 (American spelling), D-18 (the barred APP-02 conclusion), D-34 (EAM is not supersedence),
  D-47 (no product named), D-48 + D-70 (no code fences), D-53 (no `Hotpatch`/`VBS` in any
  `00-overview.md` insertion), D-58's two never-assert rules, and D-72 (`Configuration Manager`, never
  `SCCM`). `146-REVIEW.md` WR-06 found a CONTEXT prose rule broken **four times** inside `06`'s own
  prose, invisible to seven green gates.
- **D-70:** **Frontmatter and structure for both new files.** `platform: Windows`, `applies_to: all`,
  `audience: admin`, `last_verified` = the actual execution date, `review_by` = that plus 60 **by
  arithmetic** — `[CORRECTED]` "mirror `06` exactly" would import `06`'s stale `2026-08-20/2026-10-19`
  stamps; mirror its *field set*, compute the dates (147 D-62). **No `doc_id`** — Phase 152 SC#3 makes
  non-enrollment permanent for `docs/operations/`. Zero code fences. A `> **Platform applicability:**`
  blockquote in each, **full lexicon only** — `V-54-27` is a corpus-wide negative on a line-start
  `> **Platform:**` walking `docs/` **and** `.planning/`, so it binds this file and every PLAN file too.
  One own-line `<a id="..."></a>` per H2 except `## Related Resources` and `## External References` —
  **8 anchors per file, 16 total** (15 if D-02's H2 drops).
- **D-71:** **H1s: `# Windows Autopatch` and `# Windows Application Updates`.** `[MEASURED]` the registry
  holds 225 rows with zero duplicate Titles and no collision with either name; re-check at plan time
  against the planned 149/150/151 Titles. Note 147 D-70's quieter hazard: a *resolvable* Title collision
  silently renames the whole colliding group's `.docx` outputs.
- **D-72:** **C11 discipline in all new prose.** `[MEASURED]` the four fallback patterns are
  `\bSystem Center\b`, `\bSCCM\b[^.]*\bIntune\b`, `\bAutopatch rings\b`, `\bSafetyNet\b[^.]*\bcompliance\b`,
  and the live source `ALLOWLIST.c11_ops_patterns` is **not defined in the sidecar today**, so the
  fallback is what runs. Write **singular `Autopatch ring`** (the pattern is plural-only) and
  **`Configuration Manager`**, never `SCCM` or `System Center` — then no pattern fires and no ±200-char
  keyword window needs maintaining. **Verify by running the audit, never by reading the keyword list.**
  `V-54-11`'s bare-`ring` negative binds `01` only (147 D-66), but write qualified rings anyway.

### Contracts handed forward

- **D-73:** **To Phase 152:** registry rows and filename-map rows for `07` and `08`; both canary bumps;
  ops-index rows; all inbound nav-hub wiring; the `app-lifecycle/` return links (D-35); the inbound link
  from the apv2 device-preparation files to `08`'s reconciliation (D-44). `[CORRECTED]` **hand forward
  the rule, not a number.** `REQUIREMENTS.md:98` (INT-03) requires the canary target be **computed from
  the registry after the rows land** with `grep -c "^| RE-"` and **never hard-coded from a document
  count**. `[MEASURED]` **zero** of the 225 rows point anywhere inside `docs/operations/` — including
  `05` and `06` — so Phase 152 lands rows for 05, 06, 07, 08 plus 149's overview, 150's three OEM guides
  and matrix, and 151's recipe: roughly 235, not 227. The ops-index Patch region goes 5 -> 9
  (`ROADMAP.md:76`), which is the milestone total across 05/06/07/08, not this phase's contribution.
  `[MEASURED]` the two canaries count **different sets** — `build-filename-map.mjs:283` counts all rows,
  `build-publish-bundle.mjs:520-523` filters `status === 'Approved'` — equal at 225 today only because
  every row is Approved.
- **D-74:** **To Phase 151 (Recipe #5):** the 16 anchor ids; the corrected Autopatch-versus-standalone-
  rings **containment position** authored in `07` (Phase 151 SC#2 requires the recipe be written on the
  corrected positions, and `07` is the only place they are authored); the Microsoft 365 Apps channel
  table including **Current as the default with rollback "Not applicable"** (RCP-04 needs it for the
  Rollback/Recovery catalogue of absences); the EAM no-rings / no-rollback pair; hotpatch uninstall
  requiring the very restart hotpatch exists to avoid; and **RCP-04's "no Autopatch mode-switch
  recovery"** (`REQUIREMENTS.md:91`) — 148 is the only phase authoring Autopatch content.
  `[CORRECTED]` the M365 channel table is **not** handed forward as unowned work: 148 owns APP-03.
- **D-75:** **Accepted inconsistencies, recorded so the verifier and code review do not surface them as
  new defects** (147 D-49's instrument): `[MEASURED]` `01:219-232`'s Related Resources lists
  `00, 02, 03, 04, 06, co-management/02, co-management/03` and `01` is sealed — **the Windows landing
  page will never point at `07` or `08`**, though it does point at `06`. And `00-overview.md:12-13`'s
  Windows routing blockquote line stays *true* but will not mention the two new guides. Both are
  incomplete rather than wrong; neither is owned by any v1.21 phase.
- **D-76:** If execution spans midnight, all files take the date of **commit 1** (146 D-70, 147 D-72).

### Claude's Discretion

Prose wording throughout. The exact H2 names except `## Unsupported and Anti-Feature Callouts` (D-24,
the pinned corpus literal) and the four §6-mapped WinGet subsection names (D-38). Which article titles
are chosen for `**Source:**` lines. The insertion point for the `07`/`08` Related Resources entries
within the Windows-contiguous block (D-52). The order of edits within each commit. Whether
`PerpetualVL2021` is mentioned or omitted in D-26, provided the choice is deliberate. The exact phrasing
of the seam statements in D-33, D-36 and D-37, provided each names the file it defers to.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing artifacts
- `.planning/ROADMAP.md` §Phase 148 — goal, **four** Success Criteria, blast radius, research flag; also
  §Phase 151 SC#2 and §Phase 152 for the hand-offs, and `:76` for the ops-index 5->9 figure
- `.planning/REQUIREMENTS.md` — APP-01..APP-06 read **clause by clause**; the "Validator Constraints on
  Requirement Text" table; `:98` (INT-03, compute the canary from the registry); `:139-140`
  (`## Future Requirements` — the parked past-due population and the deferred M365-Apps-Intune surface)
- `.planning/STATE.md` — the Phase 148 dependency block and its hard constraints
- `.planning/PROJECT.md` — v1.21 Pillar C

### Prior phase context (all four are load-bearing here)
- `.planning/phases/147-linux-update-delivery/147-CONTEXT.md` — D-06 (bounded-fetch shape), D-07/D-08
  (sourcing), **D-21 (the Source-line SCOPE rule)**, D-25 (the callouts literal — census now stale, see
  D-24), D-34 (one physical line per row), D-36, D-48 (dangling-link behaviour), D-49 (the
  accepted-inconsistency instrument), D-62 (frontmatter arithmetic), **D-68 (every prose negative needs
  a grep)**, D-69/D-73 (the anchor contract this phase consumes)
- `.planning/phases/146-windows-driver-firmware-update-depth/146-CONTEXT.md` — **D-39 (American
  spelling, and why: the H2 becomes a slug)**, D-59 (conditional re-stamp), D-66 (anchors as forward
  contract), **D-72 `[OWNER-RULED]` (`co-management/02` cross-link only, do not edit)`**
- `.planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-CONTEXT.md` — **D-01
  (evidence-line convention)**, D-05 (`co-management/03` corrections carry no evidence line), D-07,
  **D-08 (superseded claims attributed to the corpus, never to Microsoft)**, **D-09 + D-17 (the
  `00-overview.md` atom, with FIX-07 deliberately excluded)**
- `.planning/phases/146-*/146-REVIEW.md` — WR-01 (Source-line scope), WR-06 (a CONTEXT rule broken four
  times, invisible to seven gates)
- `.planning/phases/146-*/146-RESEARCH.md` `:97-101` — **`windows-itpro-docs` is not publicly readable;
  read `<meta name="original_content_git_url">` for memdocs**
- `.planning/phases/147-*/147-VERIFICATION.md` `:85, :150` — the curl + tag-strip method, 8 pages, zero
  fabrications
- `.planning/phases/145-*/145-VERIFICATION.md` `:99` — settings-catalog tables render client-side

### Research
- `.planning/research/WINGET-GAP.md` — **§1.3 and §1.5 (the Store-app split and its four constraints —
  cited by nothing in the draft)**, §1.6 (the device-prep filter), **§2.2 (the SYSTEM-context root
  cause)**, §2.4 (the 15-setting CSP table, `SourceAutoUpdateInterval`, the registry key), §3 (the
  verbatim FAQ negative at `:222-226` **and its guardrail**), §4 (the four-step hierarchy), §5 (the
  exclusions), §6 (the four prescribed subsections), §7 (the gap table)
- `.planning/research/STACK.md` §C-1..§C-4 — Autopatch licensing and prerequisites, the ring model,
  **`:282` and `:294` (the Autopatch->MEC pin and the Edge/Teams workloads)**, §C-2 (hotpatch, and the
  `UNVERIFIED` Windows-11-Pro plan-time task), §C-3 (the six channels + the SAEC inconsistency), §C-4
  (EAM — **but NOT for the eight limitations, see `FEATURES.md:97`**)
- `.planning/research/FEATURES.md` — **`:97` (C-3, the ONLY place the canonical eight EAM limitations
  are enumerated)**, `:94` + `:280` (C-1, the delta-not-re-author instruction), `:100` (C-5's
  cross-pillar miscategorisation, which predicted D-37)
- `.planning/research/PITFALLS.md` — C1-8 (the multi-site correction lesson), **C1-9 (the hotpatch
  license list, and the two-agents-opposite-conclusions incident)**, `:867` (never bump a stamp without
  per-claim evidence), `:868`, Class-2 Pitfalls 1, 2, 5

### Validators that gate this phase
- `scripts/validation/check-phase-54.mjs` — `V-54-07` (frontmatter, no lower bound), `V-54-08`
  (presence-only header row), `V-54-09`, `V-54-11` (binds `01` only), `V-54-26`, **`V-54-27`
  (corpus-wide, walks `docs/` **and** `.planning/`)**, **`V-54-29` `:499-509` (the strip order and its
  two leaks)**, `V-54-30` (does NOT reach `07`/`08`), `V-54-31`
- `scripts/validation/check-phase-53.mjs` — `V-53-06` (interval only), `V-53-20` (`:314-327`, four
  conditions including `/prerequisite/i`), `V-53-21`, `V-53-22`, `V-53-24`; baseline 26/0/0
- `scripts/validation/v1.20-milestone-audit.mjs` — **C11 at `:568-571` (four fallback patterns) and
  `:585` (live `walkMd('docs')` — the one audit that reaches the new files)**
- `scripts/validation/check-nav-hub-links.mjs` — target existence and anchor resolution, **no baseline,
  allowlist or ratchet**
- `scripts/validation/c17-eee-contract.mjs` `:523-537` — enrollment gate (`doc_id` only)
- `scripts/validation/check-phase-59.mjs` — `V-59-14` frozen; `V-59-02/13/34` live
- `scripts/validation/check-phase-144.mjs` — the apex; `V-144-CHAIN-143 -> V-143-CORPUSRUN` is how a
  dangling link reaches it
- `scripts/pipeline/build-filename-map.mjs` `:283` and `scripts/pipeline/build-publish-bundle.mjs`
  `:520-523` — the two canaries, counting different sets

### Edit targets
- `docs/operations/patch-management/07-windows-autopatch.md` — new
- `docs/operations/patch-management/08-windows-app-updates.md` — new
- `docs/operations/patch-management/00-overview.md` — four additive edit sites + conditional re-stamp

### Corpus cross-linked, never edited
- `docs/operations/patch-management/01-windows-wufb-rings.md` — `#hotpatch` (`:119`),
  `#autopatch-disambiguation` (`:66`); sealed by Phase 146
- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` — `#driver-update-reporting`
  (`:455`); the structural precedent (10 H2s / 8 anchors / 0 fences / 64 Source lines)
- `docs/operations/patch-management/05-linux-update-delivery.md` — 8 anchors, recorded in five Phase-147
  artifacts as a Phase-148 cross-link contract; link if the content warrants it, but Linux has no
  application-update analogue
- `docs/operations/co-management/03-cocmgmt-migration-paths.md` — `#autopatch-prerequisites` (`:33`)
- `docs/operations/app-lifecycle/00-overview.md` `:73-79` (the lifecycle-state taxonomy) and
  `01-windows-win32-msix-scale.md` `#supersedence` (`:30`), `:63` (auto-update on IME check-in)
- `docs/reference/win32-app-packaging.md`, `docs/admin-setup-apv1/03-esp-policy.md` — blocking-app
  configuration (D-30)
- `docs/admin-setup-apv2/02-etg-device-group.md` `:129`, `03-device-preparation-policy.md` `:141`,
  `docs/reference/macos-capability-matrix.md` `:70` — the three reconciliation sites (D-43)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `06-windows-driver-firmware-updates.md` — the closest structural precedent: a patch-management sibling
  **outside `PATCH_FILES`**, `platform: Windows`, `applies_to: all`, `audience: admin`, 60-day cycle,
  10 H2s, 8 own-line anchors, no `doc_id`, no Version History, zero code fences, 64 standalone
  `**Source:**` lines
- `05-linux-update-delivery.md` — the most recent sibling; 484 lines, 10 H2s, 8 anchors, and the second
  `docs/operations/` instance of the callouts H2
- `02-macos-update-enforcement.md:27` — the citation shape for a source with a missing date field

### Established Patterns
- Evidence lines are a `>` blockquote plus a **standalone, line-start `**Source:**` paragraph** after
  the claim, carrying URL and date; all 93 in the corpus follow this
- Absences live under `## Unsupported and Anti-Feature Callouts` with **bold sub-labels**, no new
  `PITFALL-N` identifiers (the namespace is a per-milestone research ledger)
- Content phases author documents; registry rows, filename-map rows, canaries, ops-index rows and
  navigation are the close phase's single atomic commit
- American spelling in every heading and every line of prose — H2s become slugs the link checker
  matches byte-for-byte

### Integration Points
- `00-overview.md`'s routing list and Related Resources — four additive, single-physical-line insertions
- `01#hotpatch` and `01#autopatch-disambiguation` — the corpus's **first** inbound links to `01`
- The 16 new anchor ids become the cross-link contract Phase 151's Recipe #5 consumes and cannot author
  for itself

</code_context>

<specifics>
## Specific Ideas

The owner ruled three gray areas directly, and the through-line is **scope discipline over local
correctness**: a falsified claim in `00-overview.md:57` is left standing because no requirement owns it
and Phase 145 excluded it deliberately (D-03); a genuinely conflicted H2 is fetched but never allowed to
block the phase (D-02); and a named `UNVERIFIED` plan-time task is carried forward flagged rather than
force-resolved (D-04). Where the corpus is wrong and this phase does not own the fix, the ruling is to
**record it with its evidence in the backlog**, not to reach outside the blast radius.

The counterpart lesson from the review itself: the draft's confidence was inversely correlated with its
accuracy. The two decisions it flagged loudest were among its safest, while three requirements with no
decisions at all went unflagged — and a fresh read found three more defects that six prior agents,
all hunting, had missed.

</specifics>

<deferred>
## Deferred Ideas

- **`00-overview.md:57`'s falsified hotpatch cell** — `Hotpatch (Win 11 Ent 24H2+ default May 2026)`.
  Owner-ruled to the v1.22 backlog (D-03) with its evidence: no APP-0N requirement or SC covers it,
  FIX-07 is complete, and `145-CONTEXT.md` D-17 shows the exclusion was deliberate. A corpus-hygiene
  milestone or a FIX-07 amendment is the right instrument.
- **The Windows 11 Pro hotpatch eligibility question** — `STACK.md` §C-2's `UNVERIFIED` plan-time task.
  Carried forward flagged (D-04); no phase owns it.
- **`co-management/03:76-78`'s pre-April-2025 Autopatch license parenthetical** — excludes Microsoft 365
  Business Premium and Education A3/A5, both currently eligible per `STACK.md:256-262`. Not fixed here
  (D-49, D-51).
- **`co-management/03:55`'s planning-ledger citation** — *"(REQUIREMENTS.md COMG-05 wording is
  incomplete)"* inside a shipped corpus document. Escapes FIX-11's grep by omitting the path prefix but
  is the same defect class `PITFALLS.md:868` bans.
- **The three-workload claim in `co-management/00-overview.md:118-131` and `02:28/:64/:144-146`** — if
  D-50's research establishes two, these become live falsehoods in files no v1.21 phase owns
  (`146-CONTEXT.md` D-72 covers `02`).
- **`docs/reference/macos-capability-matrix.md:70`** — *"Microsoft Store integration | Yes (Windows
  Package Manager)"*, the WinGet conflation asserted in a Reference doc's own voice. Outside this
  phase's blast radius; needs a scoped sweep (D-43).
- **`docs/operations/00-index.md:32`** — still reads *"4-platform comparison hub"* after Phase 147 made
  it five, and Phase 152 will take that region to nine rows under it. INT-04 scopes 152 to *adding*
  rows, not correcting descriptions. Unowned by every phase in the milestone.
- **The corpus-wide past-due population** — 217 of 271 files, parked at `REQUIREMENTS.md:139` with a
  corpus-hygiene-milestone trigger. `co-management/03` (57+ days) and `app-lifecycle/00-overview.md`
  (56+ days) are both in it.
- **`docs/_glossary-windows` terminology** — Autopatch groups, update channels, Enterprise App Catalog,
  Microsoft Store app (new). No v1.21 requirement covers glossary additions; the same unassigned gap
  Phase 147 recorded for its own terminology.

</deferred>

---

*Phase: 148-Application Update Management & WinGet Routing*
*Context gathered: 2026-08-23*
