# Project Research Summary

**Project:** Windows Autopilot Troubleshooter & Improvement Suite — Intune/Entra documentation corpus
**Milestone:** v1.21 Enterprise Update, Driver & Firmware/BIOS Governance (Phase 145+)
**Domain:** Documentation milestone (day-2 operations corpus), not application software
**Researched:** 2026-08-18 / 2026-08-19; all six source files corrected under a five-Finder / Adversary / Referee adversarial review on 2026-08-19
**Confidence:** MIXED — see the per-area table. Evidence labels are load-bearing and are preserved throughout.

**Synthesized from:** `STACK.md`, `FEATURES.md`, `ARCHITECTURE.md`, `PITFALLS.md` (all four carry a `## Corrections Applied (2026-08-19, adversarial review)` audit trail), plus the two gap-fill passes `WINGET-GAP.md` and `PER-OEM-BIOS-GAP.md`.

## How to read the evidence labels

They are not decoration. This milestone's research produced two fabricated citations and one fabricated clause *inside* a verbatim quotation, all caught by the review. Do not flatten these when writing requirements.

| Label | Means |
|---|---|
| **MEASURED** | A command run against this repo at HEAD `a2edcd02` (or, where stated, a live HTTP probe). |
| **SOURCED** | A page fetched, with its own `ms.date` / `updated_at` / published date recorded. |
| **SOURCED (absence)** | The page was fetched and the claim is *not on it*. A documented silence. |
| **SOURCED, search-summary** | The wording reached the file through a search summary, not a full fetch. Re-fetch before quoting. |
| **PREMISE** | Inference. A hypothesis for planning, never a documentable fact. |
| **UNVERIFIED** | Verification was attempted and failed. Must not ship as fact. |
| **[DIRECT]** | Raw bytes retrieved and read by the researcher (curl + browser UA, or own PDF text extraction). Safe to quote. |
| **[RELAYED]** | The string came back through a summarising fetcher. Safe as an unquoted claim; **re-verify before quoting**. |

> **Why `[DIRECT]` vs `[RELAYED]` exists.** Two agents in this milestone each "re-fetched and verified" the same Hotpatch licence sentence and reached **opposite** conclusions, because one received a stale page revision. The dispute was resolved in STACK.md's favour by an orchestrator re-fetch (the current page says **`Microsoft 365 F3`**; PITFALLS.md's block was a stale revision carrying `Build 26100.2033` and `an x64 (AMD/Intel) CPU`, neither of which the current page states). Cite `ms.date`/`updated_at` beside every licence-level quote so a stale read is detectable rather than merely confident.

---

## Executive Summary

v1.21 is a **content + tooling** documentation milestone that adds a net-new firmware/BIOS governance domain, promotes driver-update content into a real guide, closes the Windows application-patching gap, closes the four-vs-five platform gap with a Linux update-delivery guide, ships a fifth Device Recipe, and discharges two harness debts (the `V120` back-anchor pin and the C17 frozen-aware residue). The single most consequential research finding is that **Pillar E is a CORRECTION pillar, not a freshness pillar**: five load-bearing assertions in `docs/operations/patch-management/` are now contradicted by current first-party documentation, and a bumped `last_verified` over an unverified claim would launder a guess into a verified fact. That reframing changes what Pillar E must produce — per-claim evidence lines citing sources dated *after* the event, not date stamps.

The recommended approach is settled by owner ruling on the two questions that shaped everything else. New `docs/operations/**` documents get **registry rows + filename-map rows and no `doc_id`** — reachable through the `.docx` publish bundle, SharePoint and Copilot Studio, but not C17-gated, and with the 20 legacy ops docs left un-retrofitted. And `check-phase-59.mjs` is **converted to frozen reads**, which turns `V-59-14`'s `patchRows !== 5` equality back into "Phase 59 shipped five rows" instead of "nobody may ever add a patch-management guide". Together those two rulings shrink the milestone's true C17 surface to **two** files (recipe 05 and `docs/reference/firmware-oem-matrix.md`) while keeping the flagship content reachable, and unblock Pillar D. Everything else follows a build order whose real dependencies are content cross-links, not validators: correction first (145), then the smallest-delta content pillars, then the largest net-new domain, then the recipe that synthesises them all, then a nav/registry integration phase, then the harness close.

The dominant risks are mechanical rather than editorial. `check-phase-54.mjs` carries **32 live-HEAD assertions** — including verbatim-pinned blockquotes and a negative bare-`ring` scan — on exactly the five files this milestone rewrites, and several of those pins protect text that research has now shown to be **wrong**. That collision is the milestone's defining tension and it is resolvable: every pin can be satisfied *and* the truth told, because the pins are literal-presence tests, not claim-endorsement tests (the two worked patterns are in section C below). The remaining risks are a nav-hub link (`docs/_glossary-linux.md:157`) that re-breaks the apex the moment v1.21's own research is archived — silently, *after* the close-gate apex is measured green — and the two publish-bundle canaries, which count different sets and must be computed from the registry rather than from a document count.

---

## A. Key Findings by Pillar

### Pillar A — Firmware / BIOS governance (NET-NEW, greenfield)

**Established.** `DFCI`, `SEMM`, `Sure Admin`, `Dell Command`, `HP Connect`, `Think BIOS`, `hardwarePassword` all measure **0 occurrences** corpus-wide (MEASURED, `--include=*.md --exclude-dir=graphify-out`). This is pure new authoring, the cheapest shape — no retrofit, no reconciliation.

- **Intune ships TWO disjoint native BIOS surfaces**, and the v1.21 scoping named only one. `SOURCED / FIRST-PARTY`: **DFCI** (UEFI CSP, per-setting reporting, certificate trust chain) *and* **BIOS configuration and other settings** (a Templates policy, `.cctk` config file, 2 MB limit, **Dell only** — *"Currently, only Dell is supported."*). Both must be named, and named as disjoint.
- **DFCI OEM support is a three-way documented conflict.** `SOURCED`: **nine** OEMs on `autopilot/dfci-management` (`ms.date` 2025-03-25, `updated_at` 2026-04-14) — Acer, Asus, Dynabook, Fujitsu, Microsoft Surface, Panasonic, VAIO, Samsung, NEC — followed by *"Other OEMs are pending."*; **six** on `configure-bios-windows`'s comparison table (two years staler); **one** on Project Mu (undated). Cite the nine, keep the pending sentence, caveat the other two. Do **not** write "the six" and do **not** write "most business OEMs".
- **Dell, HP and Lenovo are on none of those lists.** That is the entire reason per-OEM guides exist. Present DFCI as *unavailable* on a Latitude, not as an option declined.
- **PER-OEM-BIOS-GAP's headline correction to the scoping: this is a three-way ARCHITECTURE split, not a three-way tool split.** The discriminator is **who holds the BIOS secret and where the policy object lives**: Dell means Intune holds it (Graph `hardwarePasswordDetails`), and Dell Management Portal is reachable from `Devices > Manage devices > Partner portals`; HP means **HP's cloud vault, outside your tenant**; Lenovo means **you hold it** (encrypted INI, or Azure Key Vault). Lenovo is the only vendor where the signing key can live in infrastructure under your own RBAC, logging and rotation.
- **The inverted-prerequisite pair is the highest-value cross-vendor sentence found.** Dell's native template **requires no pre-existing BIOS password** (*"Make sure the devices don't have an existing BIOS password configured. This feature requires that Intune have the BIOS password."*); Lenovo TBCT V2 **cannot bootstrap an initial supervisor password remotely** and therefore requires one already set at imaging/OOBE. Dell wants a virgin BIOS; Lenovo needs a provisioned one.
- **CORRECTION TO CARRY — `STACK.md` §A-8 attaches the wrong model list to the wrong tool.** §A-8's Think BIOS Config Tool row records "certificate signing supported on ThinkPad 2022+, ThinkCentre 2020+, ThinkStation 2020+". That model list belongs to **Lenovo BIOS Certificate Tool V2 (LBCT V2)**, not to TBCT. **Think BIOS Config Tool V2 does NOT support ThinkCentre** — `SOURCED [RELAYED]`, verbatim: *"This solution currently does not support ThinkCentre desktop products due to incompatible WMI BIOS Interface implementation."* The two statements are both first-party and both correct: the BIOS *certificate* capability exists on ThinkCentre 2020+, but the *settings-configuration tool* cannot drive ThinkCentre's WMI interface (`PREMISE` for that reconciliation — neither page states it explicitly). **Consequence: a mixed ThinkPad + ThinkCentre fleet cannot use one tool for BIOS settings.** This is a hard fork the guide must not paper over.
- **Password custody is wider than the corpus will assume.** Two retrieval options: per-device via a custom RBAC **Read Bios Password** role (whose *creation* requires the **Intune Role Administrator** built-in role), or **all devices at once** with only the Entra **Intune Administrator** role. Passwords stay readable after a device leaves Intune management. Minimum role to author the policy at all: **Policy and Profile manager**.
- **Losing the management plane loses the secret, in both Dell and HP.** Dell: Intune subscription ends, so there is no way to read or retrieve BIOS passwords and the only option is the OEM. HP: account deactivation starts a **30-day countdown**, then *"all policies and secrets created by the organization in HP Connect will be permanently deleted"* — and orphaned Proactive Remediation scripts keep running in Intune and must be removed by hand. Correct order in both cases: de-provision the fleet **first**.
- **HP Connect is IN SCOPE by owner ruling and is now covered** — `PER-OEM-BIOS-GAP.md` closed STACK's zero-coverage gap with 57 pages of first-party `[DIRECT]` extraction. It is a **vendor connector**, not a Win32 agent shape: cloud console publishing policies to Intune device groups as **Proactive Remediations** named `HPConnectForMEM-<device group name>`, Entra Global-Administrator consent, HP Sure Admin certificate/key-pair auth, **no per-device agent**. Its one procedural source is a **User Guide v1.2.0 dated 2022-09-27** — a current product with 2022 documentation (see section E).
- **DFCI's own bricking surface is documented and quotable.** The `configure-bios-windows` opening Warning, verbatim: BIOS configuration changes can impact device functionality *"including the ability to boot or access Bitlocker encrypted drives"*. DFCI's retire and reuse sequences differ and must not be collapsed; deleting the profile or the group assignment does **not** remove settings.

**Deliverable shape.** Six ops-class guides at `docs/operations/firmware-bios/` (`00-overview`, DFCI, Surface UEFI, Dell, HP, Lenovo) plus one **enrolled** `docs/reference/firmware-oem-matrix.md`. Structure all three per-OEM guides identically — Delivery / Authentication / Scope / Prerequisites / Recovery — so the matrix is a genuine transposition rather than a second artefact that drifts. Lead each with the secret-custody question, not the tool. Guardrail: Intune-delivery-shaped, link-not-copy; no BIOS token tables, no CMSL cmdlet syntax reference, no per-model matrices.

**Genuinely unknown.** Lenovo lost-supervisor-password recovery (`UNVERIFIED`); Lenovo lost-certificate-private-key recovery (`SOURCED (absence)` — the page was fetched and is silent); whether HP offers any Endorsement-Key-loss escape hatch (`PREMISE` that there is none); SEMM's current status (`UNVERIFIED / NONE` — do **not** ship a "SEMM vs DFCI" routing table); whether HP Connect appears under Intune `Partner portals` as Dell does.

### Pillar B — Windows driver + firmware updates

**Established, all `SOURCED / FIRST-PARTY`.**

- **The deferral/deadline asymmetry is the milestone's best individual finding.** Verbatim: *"The deferral period set for Quality Updates within the update ring policy does not apply to drivers that are approved using the Driver Update Policy."* and *"The Quality Update deadline and grace period settings apply to drivers."* Scoping note that must ride with it: *"The deferral period only applies to **automatically approved** driver and firmware updates."*
- **No driver rollback.** *"No. Windows Update client policies don't currently support driver rollback."* Microsoft's named mitigations: deployment rings to limit blast radius; manual removal via PowerShell. Once **Approved**, a driver can never be **Declined** — only paused, and pause is best-effort.
- **Driver policies do not apply during Autopilot — but critical drivers still land.** *"Can I apply driver update policies during Windows Autopilot? **No.**"* plus *"Windows applies critical updates during Windows Autopilot. These updates may include critical driver updates that have not yet been approved by an admin."* Both halves are needed. On an Autopilot corpus this is the highest-value Class-1 pitfall available.
- **The Automatic-to-Manual mode switch is destructive** — new policies replace the old ones and you lose all approvals, paused drivers and declined drivers.
- Approved-always-wins across policies; driver policies **do not support assignment filters** (group targeting only); **Extension** and **Plug-and-Play** drivers are outside policy control.
- **Licensing:** Intune Plan 1 **and** a Windows licence carrying the Autopatch entitlement. **LTSC not supported.** Entra joined or hybrid joined; telemetry at least Required; `wlidsvc` running; Public cloud and GCC.
- **The ConfigMgr co-existence procedure is in scope and was missing from the first draft.** Four steps: leave the WU workload on ConfigMgr, configure Intune driver policies, set the domain GPO *Specify source for specific classes of Windows Updates*, enable data collection — with the warning that using Intune/CSP for the same settings *"result in an undefined and unpredictable device state."* This is the modern replacement for `DisableDualScan`; the earlier claim that mitigation 1 is "the only Autopatch-compatible answer" is **withdrawn**.

**Deliverable shape.** Promote to `docs/operations/patch-management/06-windows-driver-firmware-updates.md`, leaving a shortened stub H2 in `01-windows-wufb-rings.md` that retains the anchor, the "this is NOT a ring" disambiguation and the **whole dual-scan section** (`V-54-13` requires both the driver/firmware H2 and the literal `dual-scan` to survive in that file). MEASURED: the `driver-firmware-policy` anchor has **zero inbound links** from any document — keep it anyway, it is free.

**Genuinely unknown.** Whether the three legacy dual-scan mitigations remain individually current (`PREMISE`); two B-row quotes still sit at `SOURCED, search-summary` from `configure-driver-update-policy` and must be re-fetched before shipping.

### Pillar C — Autopatch, M365 Apps, Enterprise App Management, WinGet

**Established.**

- **Autopatch rings are `Test` and `Last`.** `SOURCED`: both are automatically present, **cannot be removed or renamed**, one Entra group assignment each; **up to 15 rings per group**, **up to 300 groups per tenant**; at least two rings required. "Test, First, Fast, Broad" is falsified legacy naming.
- **Autopatch and update rings are not mutually exclusive** — an Autopatch group *"is a logical container or unit that groups several Microsoft Entra groups, **and software update policies, such as Update rings policy for Windows 10 and later**…"*. That containment sentence is the load-bearing citation; `waas-manage-updates-wufb`'s *"designed to work with your existing Windows Update client policies"* is corroboration. The real consequence of choosing Autopatch is **loss of direct authorship**, not exclusion.
- **April 2025 restructuring:** feature activation removed; everything except *submitting support requests to the Service Engineering Team* is available at Business Premium / A3+ / E3+ / F3.
- **Hotpatch, re-fetched 2026-08-19 and now `[SOURCED]`:** *"Hotpatch security updates are **enabled by default** for all eligible devices in Microsoft Intune."* Configured at **two** levels — a tenant default (which applies only to devices **not** in a quality update policy) and a per-policy setting that wins where assigned. **Arm64 is supported** with CHPE disabled (`HotPatchRestrictions=1`, one-time, restart); it is not x64-only. VBS required. Cadence: baseline (restart) in January/April/July/October, hotpatch in the other eight months. Ineligible devices silently receive the LCU.
- **Autopatch entitlement is NECESSARY BUT NOT SUFFICIENT for Hotpatch.** The two licence lists differ: Autopatch includes Windows 10/11 Enterprise E3/E5 **VDA**, which the hotpatch list omits; the hotpatch list adds **Windows 365 Enterprise**. Do not write "if you have Autopatch you have Hotpatch".
- **M365 Apps channels:** Current (default, **rollback = "Not applicable"**), Current Preview, Monthly Enterprise (3-month support, 3-month rollback), Semi-Annual Enterprise (8 months since July 2025, 2-month rollback), SAEC Preview, Beta (**not supported**). One channel per device; device-specific, not user-following; Teams and OneDrive sit outside these channels.
- **Enterprise App Management:** add-on subscription on top of Intune Plan 1/2, standalone SKU **or** Intune Suite. Windows Win32 (exe and msi) only, Microsoft-hosted, IME-installed. Clouds: Public, GCC High, DoD only — a reachability gate as hard as the licence. Auto-update requires a **Required** assignment. **Eight** documented limitations, including *"Malicious version revocation"* — *"You're still responsible for identifying impacted devices and taking remediation action."* — and a one-hour catalog cache lag. **State the positive or the guidance inverts:** catalog apps **can** be ESP/DPP blocking apps; it is only the *auto-update* ones that cannot.
- **WinGet — the honest answer is a well-sourced negative, and `WINGET-GAP.md` supplies it.** Microsoft's own FAQ, verbatim and complete: *"Does Enterprise App Management use **Winget**? / No. Enterprise App Catalog apps are directly installed by the Intune management extension (IME)."* The name attaches to three different things and only one is a patching surface:
  - **Microsoft Store app (new)** — a real Intune app type, included in base Intune, and it **does** auto-update. But the update model **splits**: UWP apps are kept up to date *by the Store* and stay current with or without an Intune assignment; **Win32 Store apps are kept up to date by Intune and therefore require an assignment**, and are unaffected by the Store's auto-update block policy. Win32 Store apps are **in preview**; ARM64 installers are not supported. **No cadence, interval, SLO or version pinning is published** — `SOURCED (absence)`, and that absence is itself the finding, because EAM *does* publish SLOs (80-90% within 24h, manual-validation within 7 days, 48h expedited goal).
  - **`winget.exe` / App Installer** — an OS component delivered and updated by the Microsoft Store, i.e. its own version is outside the control plane you are documenting. It is a **per-user-registered MSIX gated on interactive first sign-in**, which disqualifies every SYSTEM/no-user context Intune runs code in. Microsoft documents the blocking mechanism and documents **no** SYSTEM path (`SOURCED (absence)`). The winget-cli enterprise-support issue **#5752** is open and unanswered.
  - **`winget configure`** — scoped by Microsoft to *"the desired state of the development environment"* under `ms.service: dev-environment`, never mentions Intune or MDM, and **partial success is designed behaviour**. Exclude.
  - **The one genuinely Intune-shaped WinGet surface is control, not patching:** the `DesktopAppInstaller` policy CSP (15 settings, device scope, **ADMX-backed, custom OMA-URI only**). Its best row for a governance guide is `SourceAutoUpdateInterval` — the index *"is not updated in the background"* and refreshes only when a user invokes a command. And the trap: the two `DesktopAppInstaller` policies Microsoft *recommends keeping enabled* inside its own Store-app article are **not in the settings catalog** (*"Not built in; use a custom configuration profile."*), so an admin hardening Windows can silently degrade a supported Intune app type using a lever Intune never surfaces.

**Deliverable shape.** `07-windows-autopatch.md` (owns enrolment mechanics, the Test/Last model, Autopatch app updates, reporting; **cross-links** `co-management/03` for prerequisites and `01-windows-wufb-rings.md#autopatch-disambiguation` — re-authors neither) and `08-windows-app-updates.md` (M365 channels plus EAM plus a roughly four-subsection WinGet routing/hardening section sized at one or two requirements).

**Genuinely unknown.** The Intune-side M365 Apps update policy surface — the settings-catalog / Cloud Policy path and the exact channel and deadline setting names — was **never fetched** (`UNVERIFIED`); the post-July-2026 SAEC live cadence (see section B); whether Win32 Store apps have exited preview; whether the Store app type is implemented on the WinGet client or `msstore` source (`UNVERIFIED` — the guide must not assert it).

### Pillar D — Linux update delivery

**Established.** `SOURCED`: **Intune has no native Linux update policy.** The entire mechanism is a Bash platform script (`Devices > Manage devices > Scripts and remediations > Platform scripts > Linux`, *"Only add `.sh` files"*), and the enforceable lever is a compliance policy plus Conditional Access — attestation, not enforcement, which maps onto the corpus's own deferral / enforcement / attestation triad.

- **The single most important Linux pitfall in this milestone**, and it was originally attributed to the wrong Intune surface: **Execution context `Root`** (*"always runs (with or without users logged in) at the device level"*) on the **default `Every 15 minutes` execution frequency**, with **no documented run-time cap on that surface**. A root `apt upgrade` ninety-six times a day, fleet-wide: contending `dpkg` locks, unmeasured mirror load, and a fleet reporting "patched" while running the old kernel. (The 5-minute cap belongs to *custom compliance discovery scripts*, a different page and a different surface — the earlier systemd hand-off mandate built on it is deleted.)
- **Supported distros:** Ubuntu 24.04 and 26.04 LTS, RHEL 9, RHEL 10. **Ubuntu 22.04 is no longer listed.**
- **Intra-Microsoft conflict, recorded not flattened:** `configure-custom-settings-linux`'s Prerequisites still say *"Linux Ubuntu Desktop, **RedHat Enterprise Linux 8**, or RedHat Enterprise Linux 9"* while `ref-supported-platforms` lists RHEL 9/10. Both pages carry `updated_at` 2026-07-01, so this is not a staleness gradient. Treat `ref-supported-platforms` as authoritative (it is the page the other defers to) and state the discrepancy.
- **`unattended-upgrades` default is FOUR enabled origins**, not security-only: base release, `-security`, ESM apps-security, ESM infra-security, with `-updates`/`-proposed`/`-backports` commented out. Reboot-required detection: `/var/run/reboot-required`.
- **Ubuntu Pro / Livepatch is a Canonical-side entitlement entirely outside Intune's control plane** — Intune can only verify its state via a custom compliance script. All figures are `THIRD-PARTY`; re-verify before shipping numbers.

**Deliverable shape.** `docs/operations/patch-management/05-linux-update-delivery.md`. Nothing pins the existing four platform files in a way a fifth breaks — MEASURED across `PATCH_FILES`, the `V-54-08` regex (executed against both synthetic header rows), `V-59-11/13/16`, and a `readdirSync` sweep. The one genuine blocker was `V-59-14`, and it is RULED (frozen-read conversion, phase 145).

**Genuinely unknown.** Intune Linux platform-script hard limits — max script size, timeout, per-device script count are **not stated on the article** (`UNVERIFIED`); reboot-required handling as an Intune-side documented mechanism (`PREMISE`).

### Pillar E — Corpus correction (see section B for the full enumeration)

**Established.** This pillar's population is owner-scoped to **the five `docs/operations/patch-management/` files plus whatever else v1.21 modifies**. The corpus-wide past-due population — MEASURED, **217 of the 271 files carrying both dates are past their `review_by`**, worst 71 days — goes to **BACKLOG**.

Two structural facts the requirements author needs:

- **No validator compares `review_by` to the current date.** MEASURED: `grep -rn "Date.now()\|new Date()" scripts/validation/` returns a timestamp emitter and two elapsed-timers. Every rule constrains the *interval between the two stamps*, never the *distance from today*. That is how 217 files sit past due with a green harness. Freshness here is a **procedural guarantee, not an automated one** — record that, and it is why Pillar E needs an evidence-producing success criterion rather than a date-bump criterion.
- **The five patch-management files are capped at 60 days or fewer, not the corpus's usual +90.** `V-54-07`, `check-phase-54.mjs:116`. For an authoring date of 2026-08-19 the correct pair is `last_verified: 2026-08-19` / `review_by: 2026-10-18`. Applying the +90 default to those five is a one-character, silent apex break. The same 60-day rule binds `app-lifecycle/` (`V-55-07`), `co-management/` (`check-phase-53.mjs:102`) and `drift-migration/` (`check-phase-56.mjs:115`).

### Pillar F — Recipe #5, the prescriptive artifact

**Established.** The recipe is a *synthesis* artifact — ring topology, deadlines, driver/firmware approval cadence, app-update channels — so it must be written after the pillars that author each of those.

- **Nine decision points** (`D-1` through `D-9`) with reversibility ratings, of which the two most consequential were **rewritten** under review: D-1 (Autopatch vs standalone rings — the old "mutually exclusive" framing was false) and D-2 (hotpatch — the old opt-in / x64-only framing was wrong on three counts). D-3 is rated **Destructive**, D-4 **Effectively irreversible**.
- **At least three decision points are Windows-only**, so the recipe needs a platform-applicability marker per decision point. A flat plan with implicitly-universal steps is the exact failure mode.
- **The `## Rollback/Recovery` doc-class basis was overstated and is now settled.** MEASURED: `grep -rn "^## Rollback" docs/recipes/*.md` returns **2** hits (recipes 03 and 04), and `docs/_templates/recipe-template.md` has **no such heading at all**. The doc class does **not** mandate the section — it is a tracked template divergence recorded at `v1.19-DEFERRED-CLEANUP.md:208-214` as 2-of-4, with the explicit trigger *"a third recipe needs the `## Rollback/Recovery` slot."* **v1.21's recipe fires that trigger.** Recipes 01/02 are not non-compliant. The milestone must either promote the section into the template or record why it stays a divergence.
- The truthful `## Rollback/Recovery` content is largely a list of absences: no driver rollback; no EAC auto-update rollback; no Autopatch mode-switch recovery; expedite deletion does not uninstall; hotpatch has no automatic rollback (uninstall is possible but **requires a restart**, the exact disruption hotpatch was adopted to avoid); Current Channel — the **default** for M365 Apps for enterprise — has **no rollback at all**.

### Pillars G + H — Harness close

**Established.**

- **`V120` pin placement is a trap.** PROJECT.md says "Append `MILESTONE_CLOSE_SHAS.V120`". Taken literally that **reddens `check-phase-140`**, which is inside the apex chain: `V-140-V14PIN` requires `V14: '0b3be9ab'` to be the **last** entry. Both branches were proved by executing the actual assertion — append means FAIL, insert before `V14` means PASS. Correct instruction: insert `V120: '246fa3dd',` after the `V119` block and **before** `V14`.
- **SHA recovery, honest correction of record:** the subject-line discriminator returns count=1, giving `246fa3dd`. The naive dual-token `--grep --all-match` form *also* returns exactly 1 here — the V118/V119 trap does **not** manifest for v1.20. Use the subject-line form anyway (it is the ratified method); do not record a v1.20 false-positive that did not occur.
- **Pillar H's five C17 blocks are *functionally* identical, not byte-identical.** `git hash-object` over the block yields **two** hashes: v1.15 alone, v1.16 through v1.19 matching. The delta is exactly two comment lines; executable code is identical. A plan that diffs the five expecting zero delta will stall.
- **The lazy conversion is a `cwd` swap, not a code change.** `c17-eee-contract.mjs` touches nothing outside `docs/` relative to `process.cwd()` in non-self-test mode, so materialising the frozen `docs/` tree into a temp dir and spawning the live contract with `cwd: tmpdir` converts leg 2 while leaving the contract **byte-unchanged**. That matters because it is CARVE Category 3 and `check-phase-115.mjs:95-103` already pins properties of it. Leave the `existsSync` guard (leg 1) alone — "does the validator exist" is correctly a live question.
- **Pillar H is justified on correctness, not volume.** The earlier "roughly 10 new documents across five harnesses" argument was about five times inflated: under the ops-doc ruling the new documents are not C17-visible. v1.21's actual new C17 surface is **two** files. Five audits that claim to be frozen and are not is a defect at n=1.
- **`v1.20-milestone-audit.mjs` is a potential SIXTH convertible C17 site** once `V120` lands (its C17 check exists at `:816`). Whether it is in scope is an open question.

---

## B. Corrections to the shipped corpus

**Pillar E is a CORRECTION pillar.** Every row below is a place the shipped corpus is now known to be factually wrong or unverifiable, paired with the validator constraint that governs how it may be repaired. A date bump over any of these launders a guess.

| # | Wrong claim, and where | Correct position | Validator constraint on the repair |
|---|---|---|---|
| **E-a** | **Autopatch rings "Test, First, Fast, Broad"** — MEASURED, 4 hits in 2 files: `01-windows-wufb-rings.md:64`, `:69`, `:99`, and `co-management/03-cocmgmt-migration-paths.md:25`. `00-overview.md:76` also carries them, rendered `(Test, First, Fast, Broad rings)`. | Default rings are **Test** and **Last**; cannot be removed or renamed; up to 15 rings per group, 300 groups per tenant. | **A repair sweep must key on `First` + `Fast` + `Broad`, not on the comma-and string**, or it misses both `00-overview.md:76` and the co-management file. `01-windows-wufb-rings.md` edits run the `V-54-11` bare-`ring` gauntlet. `co-management/03` is pinned by `V-53-20` (Autopatch prerequisite literals) and `V-53-21` (a NEGATIVE — that file must **not** contain a platform-applicability blockquote). |
| **E-b** | **WUfB / Autopatch "mutual exclusivity"** — MEASURED, stated **three times**, all inside the `## Ring Terminology` section of `00-overview.md`: `:67`, `:76-77`, `:86-89`. Plus the ring-authoring sentence at `co-management/03-cocmgmt-migration-paths.md:25`, and the disambiguation at `01-windows-wufb-rings.md:77`. | **False.** An Autopatch group is a container that *includes* **Update rings policy for Windows 10 and later** among the policies it creates and assigns. The real consequence is loss of direct authorship, and the real pitfall is *admin-owned* ring policies overlapping *Autopatch-owned* ones. | **Three constraints on the same twelve lines.** `V-54-09` requires the `## Ring Terminology` H2 plus a WUfB-deployment-ring and an Autopatch-ring token within about 10 lines. `V-54-10` requires deferral-vs-enforcement prose. **And the C11 ops anti-pattern regex**: `00-overview.md:78` matches `\bAutopatch rings\b` and is kept green **solely** by the `mutually`/`exclusive` pair at `:76-77`. **Substitute another allowlisted keyword into `:76-87` FIRST, then remove `mutually exclusive` / `mutual-exclusion` — in that order, in the same commit.** The allowlist includes `disambiguation`, `co-management`, `migration`, `transition`, `PITFALL-9`. Note `01-windows-wufb-rings.md:77` is the *safe* one — independently green via its own `PITFALL-9` literal. |
| **E-c** | **"Driver and firmware updates are NOT gated by WUfB deployment rings or Autopatch rings — they are an independent policy surface"**, `00-overview.md:80-84`. | **Half wrong.** *"Not gated by rings"* is **false** — approval mode and the 0-30 day deferral are set **per deployment ring**, and the Quality Update **deadline and grace period do apply to drivers**. *"Independent policy surface"* is **TRUE first-party text**: *"Driver update policies can be used independently **or** as part of Windows Autopatch."* | **Split the sentence; do not strike it.** Deleting the independence clause replaces one wrong statement with another. Same `V-54-09` / `V-54-10` / C11 window as E-b. |
| **E-d** | **"Windows Update for Business" used as the product name throughout.** MEASURED: **0 files** in the corpus use the current name. | Renamed to **Windows Update client policies**. `WUfB` survives only in **Windows Update for Business reports**, which retained the old name. | `V-54-11` polices every `ring`/`rings` token in `01-windows-wufb-rings.md`; the whitelisted proximity prefixes include `WUfB deployment`, so a rename sweep must keep a qualifying prefix within about 40 characters of every surviving token. The **filename** `01-windows-wufb-rings.md` is immutable (`V-54-01..05`). |
| **E-e** | **"Apple OS 26 removes the legacy MDM software-update commands"** — the `**[HARD-DEADLINE]**` cell in `00-overview.md` and the verbatim blockquote in `02-macos-update-enforcement.md`. | **Directionally right, version wrong.** Two-stage truth: **deprecated with the 26 releases; non-functional in all 27.0 operating systems** (iOS/iPadOS/macOS/tvOS/visionOS/watchOS 27), per Apple's WWDC26 device-management page published 2026-06-08. Intune's own article carries a deprecation banner and says support will end, **with no date given**. | **`V-54-14..17` pin the verbatim blockquote plus five tokens, a `## Deadlines & Cutover Dates` H2, at least 2 inline `[HARD-DEADLINE` reminders (5 total), and DDM-only literal coverage.** "Just correct the version" is a validator-breaking edit. See section C for the worked pattern that satisfies both. |
| **E-f** | **Apple key/identifier claims.** The corpus's DDM key names are wrong as Intune display strings, and `OfferPrograms` is mis-categorised. | Intune's settings-catalog names are **Delay in Days**, **Install Time**, **Details URL**, **Target Build Version**, **Target Date Time**, **Target OS Version**; `TargetLocalDateTime` is the raw Apple key, not the Intune label. **`OfferPrograms` is a real first-party Apple key** — but it lives in the **`Beta`** dictionary of Software Update Settings (beta-programme enrolment), **not** update enforcement. MEASURED: 3 files / 5 hits. **Re-categorise those five hits; do NOT delete them as fabricated.** | The `OfferPrograms` retraction was itself retracted — the original "absence" was measured against a page never fetched, and the real Intune surface enumerates **no** keys at all, so the negative proved nothing. `V-54-18..20` pin the iOS DDM unsupervised-retraction literals plus two files outside `patch-management/`. |
| **E-g** | **Ubuntu 22.04 as the stated distro floor.** MEASURED: **64 occurrences across 25 markdown files**, plus **1 SVG** (`docs/diagrams/decision-tree-09-linux-triage.svg`) needing regeneration. `Ubuntu 26.04` = 0. | Ubuntu 24.04 and 26.04 LTS; RHEL 9 and 10. Carry the RHEL-8-vs-9/10 intra-Microsoft conflict wherever a supported-version list appears. | Owner-ruled **IN SCOPE**: 25 md + 1 SVG. The SVG is a **regeneration task**, not a text edit. Any of those 25 files that is enrolled must stay C17-green; any that carries both date stamps must be re-stamped under its own cycle rule (60 vs 90). |
| **E-h** | **Hotpatch "default-on from May 2026" + "April 2026 opt-out toggle"**, `01-windows-wufb-rings.md:106-140`, on a file whose `last_verified: 2026-04-28` **predates the dates it asserts**. | **The current articles do not support the corpus's attribution.** `windows-autopatch-hotpatch-updates` (`ms.date` 2026-05-28) documents no default-on flip and no opt-out toggle; `configure-hotpatch` (`ms.date` 2026-01-13, `updated_at` 2026-04-29) says hotpatch **is** enabled by default for eligible devices, configured at two levels. Neither carries the corpus's May-2026-cutover or April-2026-toggle framing. **VBS is confirmed and stricter than the corpus states.** Arm64 **is** supported with CHPE disabled. | **`V-54-12` hard-pins the tokens `default`, `May 2026`, `VBS`, and (`opt-out` OR `April 2026`) in that file.** The claim cannot be quietly dropped. See section C for the attribution pattern that retains all four literals while telling the truth. Do **not** move this work into `00-overview.md` — `V-54-29` is a NEGATIVE barring `Hotpatch`, `VBS` and `MEETS_STRONG_INTEGRITY` from that file's body prose. |
| **E-i** | **Windows 11 Pro exclusion for Hotpatch.** | **Do NOT delete it.** The earlier instruction to strike it was **retracted** — its premise ("Windows 365 Enterprise is not Enterprise edition") is wrong, and the page carries an H2 titled *"Hotpatch on Windows 11 Enterprise or Windows Server 2025"*. The page states a **licence list**, never an edition verdict. Restate as licence-list-plus-observed-Enterprise-framing and flag Pro as unconfirmed. `UNVERIFIED`. | Same `V-54-12` window. |
| **E-j** | **Android "fleet compliance deadline October 31 2026"**, `04-android-patch-delivery.md:89-92`. | The **verdict label** `MEETS_STRONG_INTEGRITY` is correct, and the May-2025 Google / Sept-2025 Intune enforcement dates are corroborated. **The October 31 2026 date is UNVERIFIED** and could not be found on the page it is attributed to, nor by three targeted searches including a literal-string search. Also: the 12-month requirement is a **condition of `MEETS_STRONG_INTEGRITY`**, not a general Android 13+ requirement, and it requires **all partitions** — an OS partition patch **and** a vendor partition patch. | **`V-54-22..25` pin the verbatim `Hard deadline (Oct 31 2026)` blockquote plus cascade dates, `Android 13+`, `12 months`, at least 2 inline reminders (4 total), and Zebra LifeGuard + Samsung KSP coverage.** "Just correct the date" is validator-breaking. Either source it first-party before restating, or rewrite the *surrounding* prose as "OEM patch-age enforcement is continuous; audit now" while retaining the pinned literals. |
| **E-k** | **`ios-capability-matrix.md:106` vs `00-overview.md:93-94`** — whether non-Windows platforms have "rings". | **Downgraded from a contradiction to a row-label clash.** `00-overview` denies the *terminology*; `ios-capability-matrix` uses "Update ring management" as a capability **row label** answered via DDM. Reconcilable by relabelling one row (e.g. "Staged-rollout management"). **A tidy-up, not a gate on Pillar F** — do not sequence the recipe behind it. | `V-58-22` / `V-58-23` preserve named anchors and five H2 literals across the capability matrices. **Prefer cell-value edits over structural edits** — line-shifting edits to `android-capability-matrix.md` are the known Phase-139 pin hazard. |
| **E-l** | **`docs/_glossary-linux.md:157`** — a real markdown link `[PITFALL-2](../.planning/research/PITFALLS.md)` into an ephemeral planning path. | MEASURED: **11** total `.planning/` references in the corpus; **8** are the PITFALLS subset (`_glossary-apple-business.md` x6, `l2-runbooks/25-linux-agent-investigation.md` x1, `_glossary-linux.md` x1). **Only the glossary-linux one is a link**, and it is the one the checker follows. Re-pointing at the archived copy **does not work** — `.planning/milestones/v1.19-research/PITFALLS.md` has a *different* Pitfall 2/4, and `.planning/milestones/v1.6-research/` does not exist. **Inlining the substance is the only viable fix.** | This took `check-nav-hub-links.mjs` then `check-phase-143` then the **apex** red at HEAD (100 PASS / 1 FAIL). Writing v1.21's own research greened it again — **a manufactured false green**. It re-breaks the moment v1.21's research is archived at close, *after* the close-gate apex has been measured. Phase-145 deliverable, with success criterion `grep -rn "\.planning/research/\|\.planning/phases/" docs/` returning 0. |

---

## C. Validator constraints on requirement text

This is the highest-value section for the requirements author. Every pin below is **live** — the validator reads HEAD, and `check-phase-54.mjs` is an apex chain member currently at **32/32 green**. A pin is a **literal-presence test, not a claim-endorsement test**: that is what makes it possible to satisfy the pin and tell the truth simultaneously.

| Pin | Location | Pinned literal / assertion | Authoring pattern that satisfies BOTH pin and truth |
|---|---|---|---|
| `V-54-07` | `check-phase-54.mjs:88-120`, throw at `:116` | Per-file `platform:` regex — `00-overview.md` gets `cross-platform` **or** `Windows, macOS, iOS, Android`; the other four get exactly one platform name. `audience:` non-empty. **`review_by` minus `last_verified` at most 60 days.** | Do **not** re-label `00-overview.md`'s `platform:` to add Linux — use `cross-platform`, which is already permitted and is truthful for a five-platform doc. Compute the date pair by arithmetic: authoring 2026-08-19 gives `review_by: 2026-10-18`. Never the corpus's +90 default on these five. |
| `V-54-09` | `:145` | `## Ring Terminology` H2 in `00-overview.md`, with a WUfB-deployment-ring token and an Autopatch-ring token within about 10 lines. | Keep the H2 and both tokens; **rewrite only the claim between them**. The section can say Autopatch groups *contain* update-ring policies and still carry both tokens in proximity. |
| `V-54-11` | `:173-213` | NEGATIVE — every word-boundary `ring`/`rings` token in `01-windows-wufb-rings.md` (outside frontmatter, fences, inline code, anchors, headings) must be preceded within about 40 chars by `WUfB deployment` / `Autopatch` / `Update` / `deployment`. Exemptions: `Ring Terminology`; `NOT a ring` / `not a ring` with a qualifier in the next 80 chars. | **The easiest assertion in the repo to break.** "ring promotion", "the ring", "both rings" all fail. Write "Autopatch ring promotion", "the update ring", "both deployment rings". Make `node scripts/validation/check-phase-54.mjs` a pre-commit gate on every plan touching this file — it runs in well under a second. |
| `V-54-12` | `:214-228` | `## Hotpatch` H2 plus the literals `default`, `May 2026`, `VBS`, and (`opt-out` OR `April 2026`). | **Worked example — the attribution pattern. See below.** |
| `V-54-13` | `:229-242` | `01-windows-wufb-rings.md` must contain an H2 matching a driver-plus-firmware regex **and** the literal `dual-scan` somewhere in the file. | Pillar B's promotion is a **stub-and-move**, never a clean deletion. Leave a shortened H2 with the same shape, the "this is NOT a ring" disambiguation, and the **entire dual-scan section**. A clean promotion takes this red. |
| `V-54-15` (with `14/16/17`) | macOS three-layer block | The **verbatim** `Hard deadline (Apple OS 26)` blockquote plus five tokens; a `## Deadlines & Cutover Dates` H2; at least 2 inline `[HARD-DEADLINE` reminders (5 total); DDM-only literal coverage. | **Worked example — the two-stage-truth pattern. See below.** |
| `V-54-18`, `V-54-19`, `V-54-21` | iOS block and planning artefacts | DDM unsupervised-retraction literals; the `docs/admin-setup-ios/07-device-enrollment.md:35` retrofit; the `docs/admin-setup-ios/04-configuration-profiles.md` forward-link. **These reach outside `patch-management/`.** | Any iOS correction must carry the two `admin-setup-ios/` files with it. `V-54-32` couples `19` + `20` + `21` — they must pass **together**; a split commit landing one without the others fails. |
| `V-54-21` | `:347-362` (and `V-54-32` at `:560+`) | `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md` must contain **zero** occurrences of the literal formed by `05-compliance-` + `policy.md`. Both files are read **live**. | **Write the name split, everywhere it is discussed**, exactly as this line does. This is the named `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01` exposure, and it fires from the planning artefacts, not the corpus. Pillar D's `05-` prefix discussion is where a careless paste arms it. |
| `V-54-27` | `:437-479` (plus `V-55-27`, `V-56-28`) | NEGATIVE, corpus-wide **three times** — zero line-start bare-`Platform:` blockquote tokens across a recursive `.md` walk of **`docs/` AND `.planning/`**. | Binds every CONTEXT / PLAN / RESEARCH / REQUIREMENTS file v1.21 writes. Always use the `Platform applicability` blockquote form. |
| `V-54-28` | | `docs/operations/00-index.md` must **NOT** contain a `## Patch Management` H2. | v1.21 will want to wire update content into the ops index. Use any other heading text. |
| `V-54-29` | `:494` | NEGATIVE — `00-overview.md` **body prose** (tables, fences, links, inline code stripped) must not contain `Hotpatch`, `VBS` or `MEETS_STRONG_INTEGRITY`. | **Pillar E is the pillar most likely to trip this.** Do the Hotpatch correction in `01-windows-wufb-rings.md` (where `V-54-12` *requires* it) and keep it out of `00-`. A "what's new in v1.21" paragraph in the overview trips it. |
| `V-54-30`, `V-54-31`, `V-54-01..06` | | No `TBD`/`TODO`/`FIXME`/`XXX`/`PLACEHOLDER` outside `## Version History` or `## Changelog`; duplicate platform-frontmatter assertion; the five filenames **immutable**; and `V-54-06` pins **`scripts/validation/check-phase-54.mjs` itself** as a path. | Draft placeholders must not be committed even transiently. Any Pillar-H sweep that renames or relocates `check-phase-54.mjs` fails `V-54-06` before anything else. |
| `V-58-22`, `V-58-23` | `check-phase-58.mjs:365-399` | Named anchors plus five H2 literals preserved across the per-platform capability matrices. | Prefer **cell-value edits over structural edits**. Line-shifting edits to `android-capability-matrix.md` are the known Phase-139 pin hazard. |
| `V-59-14` | `check-phase-59.mjs:446-473`, counter at `:85-87` | **Three** equalities: `patchRows !== 5`, `appRows !== 5`, `driftRows !== 5`, over `docs/operations/00-index.md`, live-read. `countDataRows` counts only rows whose first cell opens with a markdown link. | **RULED: convert to frozen reads** (`readAtV15Close`). The file already imports `readAtV15Close, readAtV116Close` at `:14` and already uses `readAtV15Close(INDEX_MD)` at `:315`; Phase 128 `066a9068` did this across 8 validators / 14 checks; no `check-phase-*.mjs` pins its content. Lands **phase 145**. B/C/D take the Patch region from 5 to 9. |
| `V-53-20`, `V-53-21` | `check-phase-53.mjs:314`, `:328` | `V-53-20` pins Autopatch prerequisite literals in `co-management/03-cocmgmt-migration-paths.md`. `V-53-21` is a **NEGATIVE**: that file must **not** contain a platform-applicability blockquote. | Pillar C **cross-links** that file; it must not trim the prerequisite section to "see the new guide", and must not add the standard ops-domain applicability blockquote. `check-phase-53.mjs:102` also imposes a **60-day** cycle on that directory. |
| **filename-map canary** | `build-filename-map.mjs:282-283` | `rows.length === 225` — counts **all** parsed registry rows. | Bump to the value read from `grep -c "^\| RE-" docs/_registry/RE-index.md` **after** the rows land. |
| **publish-bundle canary** | `build-publish-bundle.mjs:519, 522` | `rows.length === 225` — counts **`Status: Approved` rows only**. | **Measure this one separately.** The two are equal today only because every row is Approved; if any v1.21 row lands non-Approved they diverge. This is the canary that sat RED for a full milestone. Bump both **in the same commit**. |

**Canary target: `227 + N`, computed, never counted.** 225 today, plus recipe 05, plus `docs/reference/firmware-oem-matrix.md` gives **227**, then `+ N` ops-doc registry rows. At current pillar scope `N = 10`, giving 237 — but **10 is a scope estimate and must not become the literal.** Read the literal out of the registry after the rows land. Hard-coding a number derived from a document count is precisely how the Approved-row canary sat red for a milestone. MEASURED: no `check-phase-*.mjs` pins `225`, so the canaries are the only enforcement.

### Worked example 1 — the Apple "two-stage truth" (retains `Apple OS 26`)

`V-54-15` pins the `Hard deadline (Apple OS 26)` blockquote verbatim, and the corpus's version claim is wrong. Both are satisfiable because the pin tests for the **string**, not for the assertion's correctness. The pattern:

- **Retain the pinned blockquote and its five tokens byte-for-byte.** It becomes the *deprecation* stage, which is true — the legacy surface **was** deprecated with the 26 releases.
- **Add the second stage as adjacent prose, outside the pinned blockquote**: legacy software update management **no longer functions in all 27.0 operating systems** (iOS 27, iPadOS 27, macOS 27, tvOS 27, visionOS 27, watchOS 27), per Apple's device-management updates page published 2026-06-08. Apple names *categories* — software update commands, software update queries, recommended cadence settings, and restrictions like deferrals and Background Security Improvements — **not** individual command names.
- **Retarget the `**[HARD-DEADLINE]**` cell in `00-overview.md`'s comparison table at OS 27**, not OS 26. That cell is not the pinned literal; the blockquote in `02-macos-update-enforcement.md` is.
- **Do not quote `com.apple.SoftwareUpdate`, `forceDelayedSoftwareUpdates`, `ScheduleOSUpdate`, `OSUpdateStatus` or `AvailableOSUpdates` as Apple's own strings** — none was sourced first-party. Route them to a migration-table row naming the old key and its DDM replacement.

Net effect: `V-54-14..17` stay green, the reader gets the accurate two-stage cliff, and no unsourced identifier ships.

### Worked example 2 — the hotpatch attribution pattern (retains `May 2026`, `VBS`, `default`, `opt-out`)

`V-54-12` pins `default`, `May 2026`, `VBS`, and (`opt-out` OR `April 2026`). The corpus asserts a May-2026 default-on cutover and an April-2026 opt-out toggle that the current article does not support — and the file's own `last_verified: 2026-04-28` **predates the dates it asserts**. The pattern:

- **State what the corpus asserted, as an attributed historical claim**, retaining every pinned literal: *"This guide previously recorded a **May 2026** default-on cutover for hotpatch and an **opt-out** toggle added in the Intune admin center in April 2026."*
- **State the current documented position beside it, with its page date**: the current article (`ms.date` 2026-05-28) documents no such cutover and no such toggle; `configure-hotpatch` (`ms.date` 2026-01-13, `updated_at` 2026-04-29) states hotpatch **is enabled by default for eligible devices**, configured at a tenant level (applying only to devices not in a quality update policy) and at a per-policy level that wins where assigned.
- **Keep `VBS` doing real work** — it is confirmed and *stricter* than the corpus states: required for the installer to function, enabled via the `VirtualizationBasedTechnology` CSP, verifiable at *System Information > System summary > Virtualization-based security = Running*, with a dedicated Autopatch alert for VBS not running.
- **Add the uncaptured Arm64 prerequisite** (CHPE disabled: `DisableCHPE` CSP or `HotPatchRestrictions=1`, one-time, restart) and **drop the x64-only framing**.
- **Do not delete the Windows 11 Pro constraint** (E-i), and **do not move any of this into `00-overview.md`** (`V-54-29`).

The generalisable rule: **when a pinned literal encodes a claim research has falsified, convert the claim into an attributed statement about what the corpus said, and place the correction beside it.** The literal survives; the reader is not misled; the audit trail is legible.

---

## D. Implications for the Roadmap

### Two hard sequencing constraints

1. **The harness-close cluster (Pillars G + H) is always the FINAL phase and never batches with content.** Also true by dependency: the close validator must chain `[48..N-1]`, which cannot be authored until the last content phase number is fixed (`check-phase-144.mjs:116` carries the `[48..N-1]` invariant). Batching G/H with content is the "pre-close scramble folded into an unrelated content milestone" that CARVE-1's routing barred verbatim.
2. **All registry rows + filename-map regeneration + BOTH canary bumps land in ONE phase, one commit** — or both `--self-test` canaries sit red across three phases. Content phases author documents; they do **not** touch `docs/_registry/RE-index.md`. `filename-map.md` is **regenerated** by `node scripts/pipeline/build-filename-map.mjs`, never hand-edited.

### Suggested build order

#### Phase 145 — Correction + validator gate + the archival-drift fix (Pillar E)
**Rationale:** every other content phase edits at least one of the five past-due `patch-management/` docs. Correcting first means one dated re-stamp per file instead of five phases each re-touching frontmatter and each independently risking the 60-day trap. It also front-loads the two hard external deadlines and the un-verifiable Hotpatch claims, which downstream phases would otherwise copy forward stale.
**Delivers (explicit, so a generated roadmap cannot drop them):** (1) `review_by = last_verified + at most 60d` on all five patch-management docs, plus the E-a through E-k content corrections; (2) convert `V-59-14`'s ops-index read in `check-phase-59.mjs` to `readAtV15Close`; (3) **fix `docs/_glossary-linux.md:157`** by inlining the substance so no `docs/`-to-`.planning/` link remains.
**What breaks if deferred:** (2) means Pillar D lands a red apex child. (3) means v1.21's own research archival re-reddens `check-phase-143` and the apex **after** the close-gate apex is measured green. Nobody re-runs the apex after archival.

#### Phase 146 — Driver/firmware update depth (Pillar B)
**Rationale:** smallest content delta, and the only pillar that edits `01-windows-wufb-rings.md` — the file with the two most hostile live assertions (`V-54-11` bare-ring, `V-54-13` H2 plus dual-scan). Do that surgery once, early, in isolation, with the apex as the gate.
**What breaks if moved:** if B lands after C, both phases edit that file and the bare-ring negative must be cleared twice.

#### Phase 147 — Linux update delivery (Pillar D)
**Rationale:** one file, independent of A/B/C content, and unblocked by 145's frozen-read conversion.
**Note the corrected dependency:** the real edge is **145 to 152**, not 145 to 147 — the `V-59-14` equality counts rows in `docs/operations/00-index.md`, and every ops-index edit lands in the integration phase. Authoring `05-linux-update-delivery.md` in 147 reddens nothing. 145 to 147 survives only as a soft preference.

#### Phase 148 — Application update management + the WinGet section (Pillar C)
**Rationale:** larger than B/D, and it cross-links `co-management/03` (`V-53-20`, `V-53-21`, 60-day cycle) and `01-windows-wufb-rings.md#autopatch-disambiguation`, both stable only after 146.
**Note:** the WinGet research gap is now **closed** by `WINGET-GAP.md`. The earlier "open this phase with a research pass" instruction can be downgraded to a re-verification checklist (Win32 Store apps still in preview? winget-cli #5752 still unanswered? exact settings-catalog leaf names for the two built-in Store CSPs?).

#### Phases 149-150 — Firmware/BIOS domain (Pillar A)
**Rationale:** the largest net-new surface and the only content pillar with **zero** existing corpus to conflict with. Genuinely independent of B/C/D, so it can be scheduled where the remaining budget is known. Likely split: 149 = DFCI + Surface UEFI + `00-overview`; 150 = the three per-OEM guides + the `reference/` matrix.
**Critical:** the matrix is **authored** here (C17 conformance is a 149-150 deliverable) but **its registry row is NOT** — landing it here leaves both canaries red across three phases.

#### Phase 151 — Recipe #5 (Pillar F)
**Rationale:** a synthesis artifact. Every one of ring topology, deadlines, driver/firmware cadence and app channels is authored in 146-150. Writing it earlier means writing it twice, and its cross-links would point at files that do not exist, taking `check-nav-hub-links.mjs` red with no allowlist to hide behind.

#### Phase 152 — Integration, registry & navigation-last close
**Rationale:** nav-last discipline. **One atomic unit, one commit:** all 12 registry rows at `Status: Approved`, filename-map regeneration, both canary bumps. Then hub edits — `docs/index.md` (recipes table row, quick-nav bullet **fragment appended to the single existing line**, Operations H3), `docs/operations/00-index.md` (Patch row, a Firmware H2 that is **not** `## Patch Management`, Version History row) — then the successor leaf validators, then the explicit hubs-not-wired ruling, then full-corpus C17 and link-checker green.
**Traps:** `V-137-BULLET` requires **exactly one** matching quick-nav line — never split it (the WR-01 Phase-132 defect pattern). `recipes/05-` is enforced by **nothing** today: `check-phase-132.mjs`'s generic arm never fires (hub files live inside `docs/`, so real links read `recipes/…`), and the successor leaf must add `HUB_LITERAL_05` additively — **never edit the frozen validator**.

#### Phase 153 — Harness close (Pillars G + H)
**Rationale:** hard constraint (1). Optional split into three **plans**, not phases: Atom 1 = `V120` pin (inserted **before** the `V14` entry) + `v1.20-milestone-audit.mjs` conversion + `v1.21-milestone-audit.mjs` Path-A copy + sidecar + BASELINE; Atom 2 = the five-harness C17 `cwd`-swap conversion; Atom 3 = `check-phase-145..153.mjs` + apex + the 18th workflow (born with `fetch-depth: 0`) + publish bundle `--version=v1.21`.

### Which dependencies are real, and which were falsifiable

| Claimed dependency | Verdict |
|---|---|
| 145 to 147 (Pillar D blocked by the validator conversion) | **Falsifiable and falsified.** The real edge is 145 to 152. Soft preference only. |
| 146 to 148 (Autopatch guide cross-links the promoted driver guide and the disambiguation anchor) | **Real.** |
| 146/147/148/149-150 to 151 (recipe cites all four) | **Real** — `check-nav-hub-links.mjs` has no baseline, allowlist, ratchet or expected-failure list. |
| all content to 152 (nav-last) | **Real.** Wiring a hub to a document that does not exist is immediate red. |
| 152 to 153 (apex `CHAIN_END` is `N-1`) | **Real.** |
| "Pillar E gates B, D and F" | **Real but soft** — stale hubs propagate staleness into every guide that links them. A quality dependency, not a validator one. |
| "X-2 (capability-matrix relabel) gates Pillar F" | **Falsified.** Downgraded to a row-label tidy-up. Do not sequence the recipe behind it. |
| "The recipe template mandates `## Rollback/Recovery`" | **Falsified.** The template has no such heading; it is a tracked 2-of-4 divergence whose trigger v1.21 fires. |
| "Pillar H is urgent because v1.21 adds about 10 C17-visible documents" | **Falsified** (about five times inflated). Under the ops-doc ruling the new documents are not C17-visible; the real surface is two files. Pillar H is justified on correctness. |
| "The glossary zero-margin hazard flips six workflows red" | **Narrowed.** Only `v1.20-milestone-audit.mjs` reads live, so a metadata edit is visible to **one** workflow. "Six" belongs to **C17** — six harnesses spawn `c17-eee-contract.mjs` against live HEAD, so one C17 violation in one new document reds six workflows. That is triggered by **content**, not metadata. |

### Blast-radius facts a roadmap must carry

- **`docs/operations/patch-management/00-overview.md` is the single most constrained file in v1.21** — touched by Pillars B, C, D **and** E, and carrying `V-54-07/08/09/10/29` on a live-HEAD apex chain member. The `V-54-08` 4-platform regex survives *appending* a Linux column (verified by executing the regex against both synthetic header rows) but not a 5-platform rewrite that drops one of the four literals.
- **A green-except-one CI run sheet is not evidence.** Every job in the C17-bearing workflows is `needs: harness-run` (6-10 dependent jobs each), so a harness failure produces **one visible red plus a fan-out of silent SKIPs**. The v1.20 workflow says so in its own header. Read SKIPs as gaps.
- **`c11_ops_patterns` is absent from the v1.20 sidecar**, so the hardcoded four-pattern fallback is unconditionally live and the "configurable pattern list" is not a real escape hatch. `c11_ops_exemptions` is empty.
- **Prefer singular `Autopatch ring`** — the C11 pattern is plural-only.

### Research flags

**Phases needing deeper research at plan time:**
- **149-150 (Pillar A)** — the three recovery gaps `U-1` (Lenovo lost supervisor password), `U-2` (Lenovo lost certificate private key), `U-3` (HP Endorsement Key loss). Recovery is the most-used content in these guides; shipping them as gaps would undercut the guides' purpose. Also `U-6` (is HP Connect under Intune `Partner portals`?) and `U-8` (does a post-2022 HP Connect user guide exist?).
- **148 (Pillar C)** — the Intune-side M365 Apps update policy surface was never fetched; the post-July-2026 SAEC live cadence; whether Win32 Store apps have left preview.
- **145 (Pillar E)** — the two `UNVERIFIED` hard-deadline dates (Android 2026-10-31; Apple's Intune end-of-support date, which is not published) each need a first-party citation or a rewrite.

**Phases with established patterns (skip a research pass):**
- **146 (Pillar B)** — fully first-party sourced, including the ConfigMgr co-existence procedure.
- **147 (Pillar D)** — the surface is small and fully documented, including its documented silences.
- **152 (integration)** — the registry / filename-map / canary / nav-last mechanics are a well-worn repo pattern with named precedents.
- **153 (G + H)** — Phase 128 `066a9068` is the ratified conversion precedent; the `V120` placement branch was proved by execution.

---

## E. Open Questions and Unowned Scope

Consolidated across all six files, duplicates merged. **None may be written as fact.**

### The six new open questions the STACK corrections opened

| # | Question | Status |
|---|---|---|
| OQ-a | **Is Windows 11 Pro offered Hotpatch?** The page states a licence list, never an edition verdict, and carries an H2 titled *"Hotpatch on Windows 11 Enterprise or Windows Server 2025"*. The instruction to delete the corpus's Pro exclusion is **retracted** until this is answered. | `UNVERIFIED` |
| OQ-b | **The literal identifier `com.apple.configuration.softwareupdate.settings`.** The configuration is documented first-party; the exact string was not found verbatim on any page fetched. Read `apple/device-management`'s `declarative/declarations/configurations/softwareupdate.settings.yaml`. | `UNVERIFIED` |
| OQ-c | **`com.apple.SoftwareUpdate` and `forceDelayedSoftwareUpdates` as Apple's own strings.** Used in a routing table but never sourced. Apple's page names categories, not keys. Source or drop before either appears in a shipped migration table. | `UNVERIFIED` / `PREMISE` |
| OQ-d | **RHEL 8 on Linux platform scripts.** `configure-custom-settings-linux` Prerequisites still name it; `ref-supported-platforms` lists only RHEL 9/10; both `updated_at` 2026-07-01. Decide what the corpus states and how it presents the conflict. | Both sides `SOURCED` |
| OQ-e | **HP Connect for Microsoft Endpoint Manager.** Now largely answered by `PER-OEM-BIOS-GAP.md`, but the residue is real — see the 2022-documentation split below. | Partially closed |
| OQ-f | **Post-July-2026 SAEC cadence.** See below. | `UNVERIFIED` |

### The three Apple identifiers now labelled UNVERIFIED

1. **`com.apple.configuration.softwareupdate.enforcement.specific`** — re-sourced correctly to Apple's Software Update Settings page (`dep0578d8b8a`, published 2024-09-25). The **original attribution to the WWDC26 deployment page was a mis-attribution — that page does not contain the string.** Do not cite the WWDC26 page for it.
2. **`com.apple.configuration.softwareupdate.settings`** — the configuration exists and is `SOURCED`; the **literal identifier string is `UNVERIFIED`** (OQ-b).
3. **`com.apple.SoftwareUpdate` / `forceDelayedSoftwareUpdates`** — `UNVERIFIED` as Apple's own wording (OQ-c).

Plus the command names `ScheduleOSUpdate`, `OSUpdateStatus`, `AvailableOSUpdates`, which appeared **only in third-party search results**. Do not present them as Apple's list.

### The Android October 2026 date

**Not found on the page it is attributed to.** `MEETS_STRONG_INTEGRITY` is a current, correctly-named `deviceIntegrity` verdict (`developer.android.com/google/play/integrity/verdicts`, last updated 2026-05-01), and the May-2025 Google and 2025-09-30 Intune enforcement dates are corroborated — but **no October 31 2026 deadline appears on that page**, and three targeted searches including a literal-string search returned nothing. It is currently both a hard-deadline cell **and** a verbatim-pinned blockquote (`V-54-23`). At 73 days out as of 2026-08-19 it may fire before v1.21 ships. Either produce a first-party Google citation at plan time, or rewrite the surrounding prose as continuous patch-age enforcement while retaining the pinned literals.

### The M365 SAEC July 2026 change

**Announced, but Microsoft's own comparison table was never updated.** As of 2026-08-19 `overview-update-channels` (`ms.date` 2026-05-27, `updated_at` 2026-06-23) is **internally inconsistent**: the top-of-page Important and the SAEC section both read in the **future tense** (*"Beginning July 2026, Semi-Annual Enterprise Channel **will** begin receiving monthly feature and security updates"*), while the same page's comparison table still reads *"Twice a year (in January and July), on the second Tuesday of the month"* / *"Eight months (Beginning July 2025; previously fourteen months)"* / *"Two months"*. Neither "the change landed" nor "the change is upcoming" is supportable from it. **Write the announcement with its date and its verbatim tense, note that the page's own table was not updated, and treat the live cadence as `UNVERIFIED`.** Do not write it as a countdown — that month has passed.

### Lenovo's total silence on password / key recovery

The single largest remaining gap in Pillar A, and it is service-desk-critical. Lenovo's certificate-based BIOS authentication page **was fetched and does not address** private-key loss, reverting to password authentication, or hard prerequisites — a documented absence, not an un-attempted fetch. And **no first-party Lenovo statement on lost-supervisor-password recovery was located**, unlike Dell's Master Password Lockout article. The industry-standard expectation (not recoverable; system-board replacement) **was not sourced and must not be shipped as fact.** Candidate sources: `docs.lenovocdrt.com/guides/lbct/` sub-pages (Getting Started Guide, Module Cmdlet Reference — neither fetched), and Lenovo Support's BIOS password KB. Ship this as an explicit *"not documented by the vendor — escalate to Lenovo Support"* statement rather than omitting the Recovery H2.

### HP Connect's current-product / 2022-documentation split

HP's live Client Management Solutions page (fetched 2026-08-19) lists HP Connect as a **current** offering — *"Remotely configure, secure, and update the BIOS of HP PCs managed with HP Connect"* — with **no tool marked deprecated, retired or superseded**, and HP's own Sure Admin walkthrough (footer 2026) names HP Connect as the Intune option. But **every procedural claim rests on a User Guide v1.2.0 dated 2022-09-27**, written before the Endpoint Manager to Intune rename. Verdict: **CURRENT PRODUCT, STALE DOCS.** Related: HP BCU is **v4.0.33.1 from 8 Dec 2022** with a page footer reading *Last Updated: 12/19/2019* — **stale but NOT formally deprecated**. Recommend CMSL as the scripting path and mention BCU as legacy; **do not write "BCU is deprecated"**, HP has not said that.

### Other unowned scope carried forward

- **SEMM's current status** (`UNVERIFIED / NONE`) — no "SEMM vs DFCI, use X when Y" table may ship on this research.
- **HP Sure Admin key-provisioning mechanics** — partially closed by `[DIRECT]` extraction in `PER-OEM-BIOS-GAP.md`; the Sure Admin whitepaper (TLS failure) and the CID-font-encoded user guide PDF were **not obtained**.
- **Intune Linux platform-script hard limits** — max script size, timeout, max scripts per device: not on the page.
- **Ubuntu Pro / Livepatch numbers** — `THIRD-PARTY` only; re-verify against Canonical.
- **DCU vs Autopatch driver-policy conflict** — no first-party adjudication found. **Flag as a gray area for discuss-phase, not as guidance.** Related: do **not** recommend Dell Client Device Manager yet — Dell's own current recommendation is DCU, and recommending DCDM early is the same class of error as recommending a deprecated tool.
- **Graph `hardwarePasswordDetails` vs `hardwarePasswordInfo`** and the 2404/2405/2406 version numbers — the Graph beta reference 404'd; the numbers came only via search summary.
- **`Repair-WinGetPackageManager -AllUsers` as a supported SYSTEM bootstrap** — `UNVERIFIED`; Microsoft documents it only for Windows Sandbox.
- **OQ-3 (from ARCHITECTURE):** is `v1.20-milestone-audit.mjs`'s C17 leg a sixth Pillar-H site? **OQ-4:** does the recipe template gain a `## Rollback/Recovery` H2? **OQ-5:** firmware/BIOS domain naming and file numbering (cosmetic until a `check-phase-<N>.mjs` pins the literals). **OQ-6:** which glossary receives DFCI / Hotpatch / Autopatch ring / `unattended-upgrades` / update channel — a seventh glossary is almost certainly wrong, but a new H2 in `_glossary.md` is a structural change to a heavily-pinned enrolled file.
- **The one required pre-plan verification:** run `node scripts/pipeline/build-publish-bundle.mjs` end to end with a single scratch registry + filename-map row pointing at an unenrolled `docs/operations/` file, and confirm the `.docx` lands in the bundle and the CSV manifest. The ops-doc ruling rests on the registry being the sole publish gate; that is a *reading* of the pipeline, and this milestone's evidence discipline says a reading is not a measurement. **Thirty seconds now, or a mid-milestone re-implementation.**
- **Not verified in ARCHITECTURE:** whether any GitHub Actions workflow beyond the 17 named enforces anything relevant (filenames read, not YAML bodies); the runtime cost of the `git archive` C17 conversion (note `check-phase-60.mjs` re-runs the v1.5 harness under a **60 000 ms** timeout pinned byte-exact by `V-140-SUBPROCBUDGET`); whether the glossary zero-margin hazard is genuinely discharged (the falsifying experiment — edit a glossary date, re-run the six workflows — was not run).

### Unresolved conflicts, named on both sides

| Conflict | Side A | Side B | Status |
|---|---|---|---|
| DFCI OEM list | `autopilot/dfci-management` — **nine** | `configure-bios-windows` — **six**; Project Mu — **one** | **Unresolved by Microsoft.** Cite the nine, caveat the others. |
| Linux supported distros | `ref-supported-platforms` — Ubuntu 24.04/26.04, RHEL 9/10 | `configure-custom-settings-linux` — RHEL **8**/9, no Ubuntu versions | **Unresolved.** Both `updated_at` 2026-07-01. Treat A as authoritative; state the discrepancy. |
| SAEC cadence | The page's own announcement text (future tense) | The same page's own comparison table (pre-change values) | **Internally inconsistent.** Document both. |
| Hotpatch licence SKU | STACK.md — **`Microsoft 365 F3`** | PITFALLS.md — "Windows 11 Enterprise F3" | **RESOLVED in STACK's favour** by orchestrator re-fetch. PITFALLS quoted a stale revision. |
| Lenovo ThinkCentre | TBCT V2 — **not supported** | LBCT V2 — ThinkCentre 2020+ supported | **Both correct.** Different capabilities. Reconciliation is `PREMISE`. |
| The network-boot setting name | Surface guide's Note — carries a leading `Disable` | Intune settings reference — the unprefixed display name | **Genuine page divergence.** Quote whichever page you cite. |

---

## Confidence Assessment

| Area | Confidence | Notes |
|---|---|---|
| **Stack** | **MIXED — HIGH on Intune-native surfaces, LOW on vendor tooling** | Every Intune surface is `SOURCED / FIRST-PARTY` with a recorded `ms.date`/`updated_at`. The seam tiers `webfetch`/`websearch` at LOW by **transport**, not page authority — that verdict is recorded but is not a reason to discount a dated Learn page. Vendor tooling was `[LOW]` in the original pass because of **non-attempts**, not unavailability, and `PER-OEM-BIOS-GAP.md` subsequently raised most of it. |
| **Features** | **HIGH on Windows mechanics, MEDIUM on cross-platform generalisation, MEDIUM on vendor shape** | All Windows rows first-party. Two rows remain `SOURCED, search-summary` and must be re-fetched before quoting. The file's original blanket "everything was fetched" guarantee was **false** and has been replaced with a per-quote guarantee plus a search-summary tier. |
| **Architecture** | **HIGH on structure and enforcement, MEDIUM on build-order sequencing** | Every enforcement claim is a command executed against HEAD `a2edcd02`, including regexes executed against synthetic inputs and the `V-140-V14PIN` branch proof. Sequencing is dependency-derived inference (`PREMISE`), and one ordering edge in the first draft was falsifiable and false. |
| **Pitfalls** | **HIGH on Class 2 (repo-mechanical), MEDIUM-HIGH on Class 1 (subject-matter)** | Class 2 is all measured with output quoted. Class 1 carries three items whose only corroboration is third-party MDM vendors (Apple OS 26) or is missing entirely (Android Oct 2026). The file shipped one **fabricated clause inside a verbatim quotation**, caught and restored. |
| **WinGet gap-fill** | **HIGH** | Seven first-party Learn pages fetched with dates; the load-bearing findings are a verbatim FAQ answer and four documented absences. Community-practice material is explicitly quarantined as `THIRD-PARTY`. |
| **Per-OEM BIOS gap-fill** | **MIXED — HIGH for HP/Dell, LOW for Lenovo recovery** | HP Connect and HP SPM/Sure Admin are `[DIRECT]` from self-extracted first-party sources; Dell is multiple 2026-dated KBs; Lenovo delivery is HIGH but **Lenovo recovery is LOW** (vendor pages explicitly silent), and the updates-vs-configuration conflict has **no first-party adjudication**. |

**Overall confidence: MEDIUM-HIGH.** The repo-mechanical surface — where this milestone's real risk lives — is near-fully measured. The subject-matter surface is strong on Windows and Linux, adequate on Apple with three named identifier gaps, and weakest on two dated external deadlines and Lenovo's recovery paths. Every weakness above is named, labelled, and routed to a plan-time task.

---

## F. Sources

Consolidated and deduplicated across all six research files. `[DIRECT]` / `[RELAYED]` markers are preserved for the per-OEM sources — they mark which quotes were read as raw bytes versus relayed through a summarising fetcher, and they exist because two agents in this milestone "re-fetched and verified" the same licence sentence and reached opposite conclusions, one having received a stale revision.

### Microsoft Learn — FIRST-PARTY

| URL | `ms.date` / `updated_at` | Used for |
|---|---|---|
| `/autopilot/dfci-management` | 2025-03-25 / 2026-04-14 | The **nine-OEM** DFCI list plus *"Other OEMs are pending."*; registration prerequisite; the Windows 11 24H2 Professional DFCI known issue (KB5046740 plus OOBE workaround); Graph `deviceFirmwareConfigurationInterfaceManaged` |
| `/intune/device-configuration/templates/configure-dfci-windows` | 2026-06-23 / 2026-07-01 | DFCI prerequisites, profile path, reuse-vs-retire sequences, recovery, the lock-beyond-repair warning |
| `/intune/device-configuration/templates/ref-dfci-settings-windows` | 2026-06-23 / 2026-07-01 | The complete DFCI settings surface; the **UEFI CSP** string; the three interaction traps |
| `/intune/device-configuration/templates/configure-bios-windows` | **2024-06-06** / 2026-07-01 | **BIOS configuration and other settings**; the BitLocker-boot warning; Dell-only restriction; password custody and RBAC; the DFCI-vs-BIOS-config comparison table. **The oldest source in the set and the sole source for three load-bearing Pillar A claims — re-fetch first at plan time.** |
| `/surface/surface-manage-dfci-guide` | 2026-07-14 | Surface eligible-model list (incl. `Laptop 3 (Intel processors only)`), per-setting support gaps, DFCI removal |
| `/intune/device-updates/windows/manage-driver-updates` | 2026-01-14 / 2026-04-09 | Driver policy prerequisites, licensing, architecture, the independence sentence |
| `/intune/device-updates/windows/driver-updates-faq` | 2026-01-06 / 2026-04-09 | No-rollback answer; the Autopilot answer; the ConfigMgr co-existence procedure; deferral scoping |
| `/intune/device-updates/windows/configure-driver-update-policy` | — | **SEARCH-SUMMARY ONLY.** B-5's two quotes and AF-6's ranges. Re-fetch before quoting. |
| `/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates` | 2025-03-31 / 2025-06-04 | Approval modes, deferrals, Recommended vs Other, mode-switch data loss |
| `/windows/deployment/windows-autopatch/overview/windows-autopatch-overview` | 2026-07-13 / 2026-07-21 | April 2025 restructuring, entitlement tiers, workloads, reporting |
| `/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites` | 2026-02-26 / 2026-05-14 | Licences, identity, co-management workloads, editions, LTSC |
| `/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview` | 2025-06-17 / 2026-06-19 | **The containment quote that falsifies mutual exclusivity**; Test/Last; 15 rings per group, 300 groups per tenant |
| `/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates` | 2026-05-28 / 2026-06-02 | **The authoritative hotpatch licence list (`Microsoft 365 F3`)**; VBS; CHPE; cadence; rollback |
| `/intune/device-updates/windows/configure-hotpatch` | 2026-01-13 / 2026-04-29 | Enabled-by-default; the two configuration levels; Arm64 with CHPE disabled |
| `/windows/deployment/update/waas-manage-updates-wufb` | 2024-05-16 / 2025-10-02 | The **Windows Update client policies** rename; deferral maxima; the Autopatch cooperation sentence |
| `/intune/device-updates/windows/configure-expedite-policy` | 2026-03-31 | Expedite semantics, restart deadline 0/1/2, prerequisites, deletion-is-not-uninstall |
| `/microsoft-365-apps/updates/overview-update-channels` | 2026-05-27 / 2026-06-23 | Channels, support durations, rollback windows, the **un-landed July 2026 SAEC unification** |
| `/intune/app-management/deployment/enterprise-app-management` | 2026-06-03 / 2026-06-24 | EAM licensing, clouds, auto-update, the **eight** limitations, the WinGet negative, the ESP/DPP positive, SLOs |
| `/intune/app-management/deployment/add-microsoft-store` | 2026-06-25 / 2026-07-27 | **Microsoft Store app (new)**: portal path, IME prerequisite, the UWP-vs-Win32 update split, `DesktopAppInstaller` recommendations, ARM64 exclusion, Win32 preview |
| `/intune/app-management/deployment/deploy-windows` | 2025-10-02 / 2026-04-16 | Windows app-type table; **absence** of any WinGet mention |
| `/intune/app-management/deployment/update-enterprise-supersedence` | — | **SEARCH-SUMMARY ONLY.** Guided update supersedence corroboration. |
| `/windows/package-manager/winget/` | 2026-07-19 / 2026-07-21 | What WinGet is; App Installer delivered by the Store; the per-user-registration / first-sign-in constraint; `Repair-WinGetPackageManager` |
| `/windows/package-manager/configuration/` | 2024-11-21 / 2025-07-24 | `winget configure` scoped to dev environments; partial-failure by design |
| `/windows/client-management/mdm/policy-csp-desktopappinstaller` | 2025-03-12 / 2025-03-12 | The 15-setting CSP; ADMX-backed to custom OMA-URI; `SourceAutoUpdateInterval` not updated in the background |
| `/intune/device-configuration/templates/configure-custom-settings-linux` | 2025-01-09 / 2026-07-01 | `.sh` only; **Root context**; **Every 15 minutes** default; no run-time cap; the RHEL 8 prerequisite text |
| `/intune/device-security/compliance/create-custom-script` | 2025-09-04 / 2026-07-15 | The **compliance-discovery** limits (Linux 5 min, 1 MB) — a **different surface** from platform scripts |
| `/intune/fundamentals/ref-supported-platforms` | 2025-10-14 / 2026-07-01 | Linux, Apple and Windows platform floors; the un-flattened Apple Supported vs Allowed-to-enroll tiers |
| `/intune/device-configuration/settings-catalog/ref-apple-settings` | 2024-11-13 / 2026-07-01 | The Intune Apple DDM surface — **enumerates no keys**, delegating all definitions to Apple |
| `/intune/device-updates/apple/` | 2026-02-24 / 2026-05-21 | DDM settings-catalog display names, version floors, enforcement behaviour |
| `/intune/device-updates/apple/deprecated-mdm-policies-ios` | 2025-10-15 / 2026-06-22 | The deprecation banner (**no end-of-support date given**), supervised scope, legacy schedule types |
| `/autopilot/device-preparation/tutorial/user-driven/entra-join-autopilot-policy` | 2025-06-11 / 2026-06-22 | *"only Microsoft Store apps that support WinGet are supported"*; System-context requirement during OOBE |
| `/autopilot/device-preparation/requirements` | 2025-06-11 / 2026-06-22 | Checked for a WinGet app-type statement — **ABSENT** |
| `techcommunity.microsoft.com/.../4435130` | — | Google May-2025 and Intune 2025-09-30 strong-integrity enforcement |

**Live HTTP probe (MEASURED 2026-08-19, `curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}"`):** two old `/intune/intune-service/...` paths are **live 301 redirects** (DFCI config; driver-updates-overview) and four are genuine **404s**. The original "all return HTTP 404" was reproducibly false. **Consequence: a link-checker testing only for HTTP 200 passes the two redirects — any v1.21 link audit must flag 3xx as well as 4xx.**

### Apple — FIRST-PARTY

- `support.apple.com/guide/deployment/device-management-updates-depd638aa061/web` — published **2026-06-08** — legacy software update management non-functional in all **27.0** OSes, by category. **Re-checked: does NOT contain either `com.apple.configuration.softwareupdate.*` identifier.**
- `.../software-update-declarative-configuration-depca14ecd4d/web` — published 2024-09-25 — payload keys `TargetOSVersion`, `TargetBuildVersion`, `TargetLocalDateTime`, `DetailsURL`
- `.../software-update-settings-declarative-dep0578d8b8a/web` — published 2024-09-25 — `AutomaticActions`, `RapidSecurityResponse`, `Deferrals`, `Notifications`, and the **`Beta` dictionary containing `ProgramEnrollment`, `OfferPrograms`, `RequireProgram`**; carries the enforcement-specific identifier verbatim
- `.../software-updates-depc4c80847a/web` — published 2026-07-30 — DDM framing
- **NOT fetched, named for the plan-time task:** `github.com/apple/device-management`, `declarative/declarations/configurations/softwareupdate.settings.yaml` — first-party home of the literal identifier. `UNVERIFIED`
- `developer.apple.com/documentation/devicemanagement/softwareupdateenforcementspecific` — fetched, returned **title only** (JS-rendered). Unusable.

### Google — FIRST-PARTY

- `developer.android.com/google/play/integrity/verdicts` — last updated **2026-05-01** — the four verdict labels and the verbatim `MEETS_STRONG_INTEGRITY` definition including the all-partitions requirement. **No October 31 2026 date appears on this page.**

### Canonical — FIRST-PARTY

- `ubuntu.com/server/docs/how-to/software/automatic-updates/` — **no date exposed** — `unattended-upgrades` paths, the **four default enabled origins**, `/var/run/reboot-required`

### Vendor — Dell (all `SOURCED [RELAYED]`)

- KB 000214308 — Dell Command \| Endpoint Configure for Microsoft Intune — **18 May 2026** — DCECMI v2.0.4
- `dell.com/support/manuals/.../using-graph-apis-to-retrieve-the-dell-bios-password-manually` — no date — the three Graph permissions; current plus previous 15 passwords
- KB 000356434 — Connect Dell Management Portal to Intune — **23 May 2026** — the `Partner portals` entry point; data-custody statement
- KB 000447089 — Deploy Dell Command Update via Dell Management Portal — **24 May 2026**
- KB 000178000 — Dell Command \| Configure — **06 May 2026** — v5.2.2
- `dell.com/support/manuals/.../configure-settings-using-microsoft-intune` (DCU ADMX/GPO) — **no date** — Imported Administrative templates path only
- KB 000140298 — lost BIOS password / Master Password Lockout — **01 May 2026**
- KB 000180749 — unauthorized BIOS password reset tools — **25 Nov 2024**
- KB 000206452, KB 000187573 — BIOS-password update failures; password not exported

### Vendor — HP

- **`connect.admin.hp.com/static/HPConnectUserGuide.pdf`** — **User Guide v1.2.0, 2022-09-27** — `[DIRECT]`, own PDF text-layer extraction. Delivery as Proactive Remediations, `HPConnectForMEM-<group>` naming, the two mutually exclusive auth models, HP-cloud secret custody, the LAK-fallback trap, the 30-day deactivation fuse, licensing and consent. **Whitespace-normalised; `[sic]` retained where the source is ungrammatical.**
- `developers.hp.com/.../secure-bios-hp-sure-admin-and-cmsl` — *Upd 9/10/2024* — `[DIRECT]` via **curl + browser UA** (403 to WebFetch)
- `developers.hp.com/.../hp-sure-admin-step-step` — footer **2026** — `[DIRECT]` — names HP Connect as the Intune option
- `developers.hp.com/.../securing-hp-bios-sure-admin-and-cmsl` — no date — `[DIRECT]` — the SPM three-key hierarchy, provisioning order, anti-replay, `Get-HPSecurePlatformState`
- `hp.com/us-en/solutions/client-management-solutions.html` — no date — `[RELAYED]` — HP Connect listed as **current**, nothing marked deprecated
- `ftp.ext.hp.com/pub/caps-softpaq/cmit/HP_BCU.html` — v4.0.33.1 **8 Dec 2022**, footer *Last Updated 12/19/2019* — `[RELAYED]` — stale, **not** formally deprecated

### Vendor — Lenovo

- `docs.lenovocdrt.com/guides/tbct_v2/` — **6 April 2026** — `[RELAYED]` — TBCT V2 GUI v2.0.3 / module v1.0.3; **the ThinkCentre exclusion**; Intune artefact generation
- `blog.lenovocdrt.com/changing-the-bios-supervisor-password-with-intune-and-the-think-bios-config-tool-v2/` — **16 April 2026** — `[RELAYED]` — Win32 path, exit 3010
- `blog.lenovocdrt.com/introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2/` — **4 November 2025** — `[RELAYED]` — `Lenovo.BIOS.Config`, Graph upload, **Azure Key Vault signing**
- `docs.lenovocdrt.com/guides/lbct/` — no date, module 2.1.2 — `[RELAYED]` — **the ThinkPad 2022+ / ThinkCentre 2020+ / ThinkStation 2020+ list belongs HERE, not to TBCT**
- `docs.lenovocdrt.com/ref/bios/settings/thinkpad/certbasedbiosauth/` — **no date** — `[RELAYED]` — certificate reset from the BIOS menu; **explicitly silent on private-key loss**
- `docs.lenovocdrt.com/ref/bios/bios_guide/` — Lenovo BIOS/UEFI deployment guide

### Community / third-party — quarantined, do not cite as fact

- `github.com/microsoft/winget-cli` issue **#5752** (opened 2025-09-26, **open and unanswered** at fetch) — quoted **as a user's claims**, not as Microsoft statements. Its evidential value is that the request exists and is unanswered.
- WinGet SYSTEM-context community wrappers — existence confirmed via search; **no specific project or technique is cited**.
- Ivanti / Addigy / Scudra / SimpleMDM — the **only** corroboration for the Apple OS 26 deprecation. **No Apple first-party citation for the corpus's exact framing was obtained.**
- Dell DCECMI acronym expansion; HP BCU/CMSL/Sure Admin role summaries; Ubuntu Pro / Livepatch figures; Apple legacy command names — all `THIRD-PARTY`, all requiring re-verification.
- 4sysops "Manage Linux with Microsoft Intune" — **superseded**; its 5-minute cap and Ubuntu 20.04+ / RHEL 8-9 list were both applied to the wrong surface and are two LTS generations stale. **Do not re-cite.**

### Failed fetches, recorded for honesty

`h20195.www2.hp.com` Sure Admin whitepaper — TLS failure, not obtained. `kaas.hpcloud.hp.com` Sure Admin User Guide PDF — CID-font-encoded, text unrecoverable (metadata 2012-2016, likely the wrong document anyway). HP Connect guide Appendices C/D/E — images, no text layer. `docs.lenovocdrt.com/guides/tbct/thinkbiosconfig/` — 404 (the V1 path; V2 lives at `/guides/tbct_v2/`). Microsoft Graph `hardwarePasswordDetail` beta reference — 404. `derflounder.wordpress.com` — 403. `developers.hp.com` — 403 to WebFetch but **HTTP 200 to curl with a browser UA**; resolved.

### In-repo measurements

All re-run **2026-08-19** at HEAD `a2edcd02` with the corpus restricted to markdown (`--include=*.md --exclude-dir=graphify-out`). **The 2026-08-18 figures were contaminated** by `docs/graphify-out/cache/semantic/*.json`, a generated knowledge-graph cache: `Autopatch` 177/12 became **162 hits / 9 files**; `TPM 2.0` 34/15 became **31/12**; `Ubuntu 22.04` 65 became **64 hits / 25 files**. All other counts re-run and unchanged. `find docs -name '*.md' | wc -l` gives **282**. No conclusion changed as a result of the re-run.

---
*Research synthesized: 2026-08-19, from six files each carrying a 2026-08-19 adversarial-review audit trail.*
*Ready for requirements and roadmap: yes.*
