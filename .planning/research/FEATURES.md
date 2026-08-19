# Feature Research

**Domain:** Enterprise update / patch governance documentation for Intune-managed fleets (Windows, macOS, iOS/iPadOS, Android, Linux) — OS, application, driver, firmware and BIOS
**Researched:** 2026-08-18
**Confidence:** HIGH on Windows mechanics (all first-party, fetched this session, `ms.date` recorded per page); MEDIUM on cross-platform generalisation claims (inference from the existing corpus plus first-party Windows sources); LOW on HP / Lenovo BIOS tooling (no first-party page fetched — see Gaps)

> **Scope note.** This is a **documentation** milestone. "Feature" throughout means *a thing the documentation covers*, not software to build. Every table-stakes and differentiator row is phrased so it can become a "Reader can X" / "Admin can X" requirement.

**Claim labelling used throughout:** `[SOURCED]` = URL + fetch date below; `[SOURCED, search-summary]` = the wording reached this file through a search summary, **not** a full page fetch; `[MEASURED]` = command run against this repo (see the measurement block in Sources for the exact command and date); `[PREMISE]` = inference, not verified. No claim is smoothed between tiers.

> **Quotation guarantee (corrected 2026-08-19).** The original text of this line claimed *"every quoted string is verbatim from a page fetched in this session"*. That was **false**: B-5, AF-6 and X-3 carried wording that reached this file via search summaries of `configure-driver-update-policy` and `configure-hotpatch`, both of which the Sources table itself declares search-summary-only. The honest guarantee is: **every quoted string is verbatim from the page named beside it, and every quote whose page was not fully fetched is labelled `[SOURCED, search-summary]`.** Quotes added or re-verified in the 2026-08-19 adversarial-review pass are marked `[SOURCED, re-fetched 2026-08-19]`.

---

## 1. The Enterprise Update Plan as a Deliverable (answers Q1)

### 1.1 Section inventory

`[PREMISE — synthesised from the mechanisms sourced in §2 plus the program-level considerations the corpus already carries at `patch-management/00-overview.md:158-197`]`
There is no first-party "here is the section list of an enterprise update plan" document; Microsoft ships mechanism docs, not plan templates. The inventory below is therefore an opinionated synthesis. Most sections are defensible because **they map to a decision a specific Intune surface forces you to make**.

> **Corrected 2026-08-19.** The original wording stated that test as absolute ("each section maps to…") and then violated it in its own table: **row 1** has no forcing surface at all (`—`), and **rows 13 and 15** point at other sections of this document rather than at an Intune surface. Three of fifteen rows are therefore **program-level**, not surface-forced. They still belong in the plan — a plan with no scope statement, no rollback section and no comms section is worse, not better — but they are justified by operational necessity, not by a policy blade. The table below labels them explicitly.

| # | Section | The decision it records | Forced by which surface |
|---|---------|-------------------------|-------------------------|
| 1 | Scope and platform inventory | Which platforms/estates the plan governs | *Program-level — no forcing surface* |
| 2 | Roles and approval gates | Who approves a ring promotion, who can expedite | Manual driver approval; expedite policy creation |
| 3 | Ring / cohort topology | Named cohorts, membership rule, population intent | WUfB update rings, Autopatch groups, or **both** — an Autopatch group is a container that *includes* update-ring policies (see D-1) |
| 4 | Cadence and deferral windows | Days of deferral per cohort per update class | Update-ring deferral; **separate** driver-policy deferral |
| 5 | Deadlines and grace periods | When enforcement replaces choice | Deadline (2–30d) + grace (0–7d) |
| 6 | Maintenance windows / active hours / restart UX | When a reboot may land | Active hours, notification level, restart deadline |
| 7 | Driver and firmware approval cadence | Auto vs manual, and the approval date | Driver update policy; Autopatch Automatic/Manual mode |
| 8 | Application update policy | Channel per app family; patch mechanism per app | M365 Apps channel; EAC auto-update vs supersedence |
| 9 | Firmware/BIOS governance | Which OEMs get which surface; password custody | DFCI profile; Dell BIOS configuration policy |
| 10 | Emergency / expedite path | Trigger criteria, approver, restart-deadline value | Expedite policy (0/1/2 day restart deadline) |
| 11 | Exception and exclusion handling | Which devices are out, why, and review date | Compliance-policy exclusion (corpus-recommended layer) |
| 12 | Pilot cohort selection | How pilot devices are chosen and refreshed | Ring 0 / Test group membership |
| 13 | Rollback and recovery | Per-mechanism recovery, including where none exists | *Program-level* — synthesised from the per-mechanism absences in §5.3, not from one blade |
| 14 | Compliance reporting and SLA | The metric, its latency, and the target | Windows Update reports; per-platform compliance state |
| 15 | Communications | Platform-aware user messaging | *Program-level* — already covered at `00-overview.md:176-181` |

### 1.2 What separates a plan that works from a policy document that gets ignored

`[PREMISE]`, but each point is anchored to a `[SOURCED]` mechanism so it is falsifiable:

1. **It names the mechanism, not the intention.** "Patch within 14 days" is unenforceable prose. "Ring 2: quality deferral 7d, deadline 7d, grace 2d" is a policy blade you can screenshot. The corpus already makes this distinction well (deferral vs enforcement vs attestation, `00-overview.md:96-137`); the plan must inherit it.
2. **It states where enforcement does not exist.** A plan that implies Linux OS updates are enforceable through Intune is wrong: Intune has no Linux OS-update policy `[SOURCED]`. A plan that implies drivers can be rolled back by policy is wrong `[SOURCED]`. Plans get ignored when operators discover the first such lie.
3. **It separates the four independent cadences.** Quality, feature, driver/firmware, and app updates each have their **own** deferral surface on Windows. The single highest-value correction this milestone can ship: the quality-update deferral **does not** apply to drivers, while the quality-update deadline and grace period **do** `[SOURCED]`. A plan with one "deferral" column is structurally wrong.
4. **The exception register has a review date and an owner.** Exceptions without expiry become the fleet.
5. **The emergency path is pre-authorised.** If expediting requires a change-advisory board, it is not an emergency path.
6. **It is rehearsed at the rollback step, not the rollout step.** See §5.3.

---

## 2. Feature Landscape

### 2.1 Table Stakes (readers assume these exist)

Missing any of these leaves the update-plan documentation feeling incomplete or, worse, misleading.

#### Pillar A — Firmware / BIOS governance

| Feature (what the doc covers) | Why expected | Complexity | Notes |
|---|---|---|---|
| **A-1. Two Intune-native BIOS surfaces exist** | An admin arriving at "manage BIOS from Intune" must first learn there are two disjoint answers, not one | LOW | `[SOURCED]` Intune ships **DFCI** *and* a separate **"BIOS configuration and other settings"** template. Atomic requirement: *Reader can name both surfaces and state that they are disjoint.* (Split from the original composite A-1 on 2026-08-19; the OEM-routing half is now A-9) |
| **A-9. Which OEM each BIOS surface serves, and the hard Dell prerequisite** | The routing decision, and the brownfield blocker that stops it dead | MEDIUM | `[SOURCED]` the BIOS-configuration template's supported-OEM field reads *"Currently, only Dell is supported."* A first-party comparison table exists — link it, do not re-derive. **Hard prerequisite, previously missing:** *"Make sure the devices don't have an existing BIOS password configured. This feature requires that Intune have the BIOS password."* — the most common brownfield blocker on this whole pillar; a fleet that already has a BIOS password set cannot be onboarded without clearing it first. Atomic requirement: *Reader can route an OEM to the correct surface and check the no-existing-password prerequisite before starting.* |
| **A-2. DFCI OEM support list + the registration prerequisite** | Determines whether DFCI is available at all | LOW | `[SOURCED]` OEMs listed: *"Acer. Asus. Dynabook. Fujitsu. Microsoft Surface. Panasonic. VAIO. Samsung. NEC."* — **no Dell, HP or Lenovo** *as of this list*; the page's very next line is *"Other OEMs are pending."*, so "no Dell/HP/Lenovo" is a **snapshot, not a settled fact** — date the claim in the doc and cite the pending sentence beside it. Also: *"Devices manually registered for Windows Autopilot (such as by importing from a CSV file) aren't allowed to use DFCI."* ⚠ **Three** lists disagree, not two: `autopilot/dfci-management` (nine OEMs); the comparison table in `configure-bios-windows` (omits VAIO/Samsung/NEC); and the Project Mu page that `configure-dfci-windows` Prerequisites links as *"the manufacturers that support DFCI"*. Document the discrepancy, cite all three, pick none silently |
| **A-3. The DFCI retirement / recovery sequence (the "irreversible unenrol trap")** | This is the single destructive mistake in the whole pillar | MEDIUM | `[SOURCED]` *"Deleting the DFCI profile, or removing a device from the group assigned to the profile doesn't remove DFCI settings or re-enable the UEFI (BIOS) menus."* And: *"If you wipe a device, and delete the Windows Autopilot record before unlocking the UEFI (BIOS) menus, the menus remain locked. Intune can't send profile updates to unlock it."* Recovery: *"open the UEFI (BIOS) menu, and refresh management from network"*. **Reuse and Retire are different sequences and must not be collapsed** `[SOURCED, re-fetched 2026-08-19]`: for **Reuse**, *"If you plan to reset Windows to repurpose the device, then wipe the device. Do **not** remove the Windows Autopilot device record."*; for **Retire**, unlock the menus via the profile first, then *"Once the device is wiped, delete the Windows Autopilot record."* The same page also warns *"Configuring and assigning DFCI profiles can lock the device beyond repair"* |
| **A-4. BIOS password authentication and custody model (Dell path)** | "What happens when the BIOS password is lost" is the question the pillar exists to answer | MEDIUM | `[SOURCED]` Intune generates a unique per-device password. **Retrieval has TWO options with very different blast radius, and the original row documented only the narrow one:** Option 1 is per-device via Graph **beta** `hardwarePasswordDetails` behind a custom RBAC **Read Bios Password** permission (which itself requires the **Intune Role Administrator** Entra role to create); **Option 2 returns passwords for all devices and needs only the Intune Administrator Entra role.** Passwords also remain readable **after** a device is removed from Intune management. Treat the custody model as "any Intune Administrator can read every BIOS password in the tenant, including for retired devices" unless Option 2 is deliberately constrained. *"If the Intune subscription for your tenant ends, then there's no way to read or retrieve BIOS passwords. In this situation, your only option is to contact your OEM."* Also: *"Unenrolling the device from Intune doesn't remove the BIOS password"* |
| **A-5. DFCI category-vs-granular setting conflict loop** | A configuration mistake that produces a permanent non-compliance oscillation | LOW | `[SOURCED]` first-party describes the loop and the fix (configure the category **or** the granular settings, never both) |
| **A-6. Per-OEM capability matrix** | OWNER-RULED deliverable; the corpus precedent is `reference/aosp-oem-matrix.md` | MEDIUM | Rows should be *capabilities*, columns OEMs; the honest cells for HP/Lenovo are "no Intune-native policy surface" |
| **A-7. Secure Boot / TPM positioning statement** | Readers arrive expecting BIOS governance to own these | LOW | `[MEASURED, re-run 2026-08-19]` corpus already owns TPM at `docs/decision-trees/03-tpm-attestation.md`; `TPM 2.0` = **31 occurrences / 12 files**; `Secure Boot` = 4 / 2. **Cross-link, do not re-author.** Scope this to "which of these DFCI can and cannot set" |
| **A-8. The per-OEM delivery shapes (Dell Command, HP, Lenovo) — and there are two shapes, not one** | OWNER-RULED first-class per-OEM guides | HIGH | `[SOURCED]` for Dell: the OEM Win32 app *"Acts as an agent that reads the configuration file you create, and reads the BIOS passwords of the devices"* and *"Must be installed on all devices before you assign the Intune BIOS configuration policy."* Same page's hard prerequisite: *"Make sure the devices don't have an existing BIOS password configured."* **HP is a different shape and is now IN SCOPE by owner ruling:** `[SOURCED, vendor doc — search-summary level, 2026-08-19]` **HP Connect for Microsoft Endpoint Manager** (`connect.admin.hp.com`) is a cloud console that publishes BIOS setting/update policies to Intune device groups and has Intune execute them as proactive remediations — **no per-device agent install**, Entra ID group consent, and HP Sure Admin certificate/key-pair (passwordless) authentication rather than a stored password. That is a **vendor connector**, not the Dell Win32-agent shape, so the pillar needs both delivery shapes documented. Lenovo: **Lenovo CDRT** publishes Think BIOS Config Tool guides at `docs.lenovocdrt.com`. **Guardrail: Intune-delivery-shaped, link-not-copy** |

#### Pillar B — Driver updates

| Feature | Why expected | Complexity | Notes |
|---|---|---|---|
| **B-1. Manual vs automatic approval workflow** | The core of the pillar | LOW | `[SOURCED]` Automatic = approve recommended drivers after a deferral; Manual = *"no drivers are installed in your environment without your explicit approval"* |
| **B-2. Driver deployment rings — and the deferral/deadline asymmetry** | The most consequential correction available | MEDIUM | `[SOURCED]` verbatim: *"The deferral period set for Quality Updates within the update ring policy does not apply to drivers that are approved using the Driver Update Policy."* and *"The Quality Update deadline and grace period settings apply to drivers."* Rings are built from **multiple driver policies with different deferrals**. **Scoping note that was missing from this milestone's self-declared highest-value correction** `[SOURCED]`: *"The deferral period only applies to **automatically approved** driver and firmware updates. An admin must specify the date to start offering a driver with any manual approval."* — so the asymmetry itself only bites in Automatic mode |
| **B-3. One driver policy per device (and approved-always-wins)** | Prevents a silent cross-policy override | LOW | `[SOURCED]` *"Because the status of approved always wins, the driver installs on the device despite any other status for that update that is set in any other policy."* |
| **B-4. No driver rollback — stated as a hard limitation** | Table stakes precisely *because* it is absent | LOW | `[SOURCED]` *"No. Windows Update client policies don't currently support driver rollback."* Mitigation named by Microsoft: use deployment rings to limit blast radius; manual removal via PowerShell |
| **B-5. The "driver regression blocked ring promotion" workflow** | The scenario admins actually hit | MEDIUM | `[SOURCED, search-summary]` composite — these two quotes come from `configure-driver-update-policy`, which the Sources table declares search-summary-only; **re-fetch before quoting them in shipped documentation**: pause the same update in the *other* policies; pause is **best effort** — *"If it can't halt the installation, the update completes its installation."* Once **Approved**, a driver *"can never be Declined,"* only paused |
| **B-6. Recommended vs Other drivers** | The classification the approval UI is built around | LOW | `[SOURCED]` Atomic requirement: *Reader can explain why a driver appears under Recommended vs Other and what that implies for approval.* (Split from the original composite B-6 on 2026-08-19) |
| **B-10. Extension and Plug-and-Play drivers are outside policy control** | Explains "drivers installed that didn't pass through a policy" | LOW | `[SOURCED]` extension drivers are unmanaged by Autopatch; PnP installs the latest driver on first detection and is manageable only thereafter. Atomic requirement: *Reader can name the two driver classes a driver policy does not gate.* |
| **B-7. Autopatch Automatic↔Manual mode switch is destructive** | A data-loss trap with no undo | LOW | `[SOURCED]` *"You'll lose any approvals, paused drivers, and declined drivers previously made for those groups and/or deployment rings"* |
| **B-8. Driver policies do not support assignment filters** | Blocks a common targeting design | LOW | `[SOURCED]` stated verbatim in the FAQ. Atomic requirement: *Reader can state that driver-policy targeting is group-based only.* (Split from the original composite B-8 on 2026-08-19) |
| **B-11. Driver policies do not apply during Windows Autopilot — but critical drivers still land** | The highest-value Class-1 pitfall available on an Autopilot corpus adding a driver pillar | LOW | `[SOURCED]` `driver-updates-faq` (`ms.date` 2026-01-06), verbatim: *"Can I apply driver update policies during Windows Autopilot? **No.** Driver updates aren't supported during Windows Autopilot at this time."* and *"Windows applies critical updates during Windows Autopilot. These updates may include critical driver updates that have not yet been approved by an admin."* Both halves are needed: the policy does not run, **and** unapproved critical drivers can still install |
| **B-9. Retain the dual-scan-source flap + its three mitigations** | Explicit milestone constraint | LOW | `[MEASURED]` currently at `patch-management/01-windows-wufb-rings.md:170-196`. **Retained, not replaced** |

#### Pillar C — Application update management

| Feature | Why expected | Complexity | Notes |
|---|---|---|---|
| **C-1. Superseding a Win32 app vs patching it — the conceptual split** | This *is* the missing half of `app-lifecycle/` | MEDIUM | `[SOURCED]` supersedence = author a new app + relationship; EAC auto-update = *"You don't need to create a new app or configure a supersedence relationship for each update."* Guided update supersedence is the review-before-apply middle path |
| **C-2. Enterprise App Catalog auto-update + its licensing *and cloud* gates** | Determines whether any of this is reachable | LOW | `[SOURCED]` *"This feature requires a subscription in addition to Microsoft Intune Plan 1 or Plan 2."* Purchasable standalone or in the Intune Suite. Auto-update requires a **Required** assignment; Available-assigned apps keep the old workflow. **Cloud requirement, previously omitted** `[SOURCED, re-fetched 2026-08-19]`: the page's Prerequisites list **Public cloud** plus the sovereign environments **U.S. Government Community Cloud (GCC) High** and **U.S. Department of Defense (DoD)** only — a reachability gate as hard as the licence |
| **C-3. EAC auto-update limitations — all eight, stated as first-class content** | These invalidate a naive "just turn on auto-update" plan | MEDIUM | `[SOURCED, re-fetched 2026-08-19]` the page carries **eight** limitation headings; the original row listed five and dropped the three that matter most for incident response. Verbatim: *"No rollback or automatic uninstall remediation"*; **"Malicious version revocation"** — *"If Microsoft detects a malicious app version in the Enterprise App Catalog, Microsoft removes the app from the catalog and posts a notification in the Microsoft Intune admin center. **You're still responsible for identifying impacted devices and taking remediation action.**"*; *"Catalog cache lag"* (up to one hour on revocation); *"No rollout rings or phased deployment"*; **"Reporting reflects latest state only"** (no per-device version history); **"Version changes during device processing"**; *"Not supported as a blocking app in ESP or Autopilot device preparation"*; *"Conflicts with other app types"*. **State the positive too, or the guidance inverts:** catalog apps *can* be blocking apps — *"Using Windows Autopilot, you can select blocking apps from the Enterprise App Catalog in the Enrollment Status Page (ESP) and the Device Preparation Page (DPP) profiles"* — it is only the **auto-update** ones that cannot |
| **C-4. M365 Apps update channels — the three channels and their per-device rule** | Currency-critical, and the channel choice is decision D-5 | MEDIUM | `[SOURCED]` three primary channels: Current, Monthly Enterprise, Semi-Annual Enterprise. Default channel = Current Channel. One channel per device — *"if you're installing Microsoft 365 Apps, Project, and Visio on the same device, they all must use the same update channel."* (Split from the original composite C-4 on 2026-08-19; the unification half is now C-8) |
| **C-8. The July 2026 SAEC unification — announced, but NOT confirmed landed** | The original row asserted this had "already landed relative to today" and that assertion does not survive checking | MEDIUM | ⚠ **Corrected 2026-08-19.** `overview-update-channels` (`ms.date` 2026-05-27, `updated_at` 2026-06-23, re-fetched 2026-08-19) still reads in the **future tense**: *"Beginning July 2026, Semi-Annual Enterprise Channel **will** begin receiving monthly feature and security updates. Rollback to prior feature releases with security updates will be available for 2 months."* — and the page's **own comparison table has not been updated**: Feature updates for SAEC still reads *"Twice a year (in January and July), on the second Tuesday of the month"* and Support duration still reads *"Eight months (Beginning July 2025; previously fourteen months)"*. Neither "landed" nor "upcoming" is safe. **Document both**: the announced end state (1-month feature support + 2-month rollback = 3-month effective window) *and* the fact that the first-party page was not updated after July 2026. Re-check at plan time |
| **C-5. Windows Autopatch guide — enrolment, ring rotation, app updates, reporting** | OWNER-RULED full guide | HIGH | `[MEASURED, re-run 2026-08-19]` `Autopatch` already appears **162× across 9 files** (144 case-sensitive) — this is a **delta**, not a greenfield guide. The original 177/12 figure was contaminated by `docs/graphify-out/cache/semantic/*.json`; the *conclusion* (delta, not greenfield) and the P2/MEDIUM/HIGH rating are unchanged. Co-management prerequisite already at `operations/co-management/03-cocmgmt-migration-paths.md`. ⚠ **Miscategorised — corrected 2026-08-19:** C-5 sits under Pillar C (application update management) but three of its four topics (enrolment, ring rotation, reporting) are **OS servicing**, not app patching; only "app updates" belongs to Pillar C. Treat C-5 as a cross-pillar deliverable owned by the Windows/OS-servicing surface with a Pillar C section, or the requirement inherits the wrong anti-duplication rule |
| **C-6. EAC does not use winget** | Kills a very common assumption | LOW | `[SOURCED]` *"No. Enterprise App Catalog apps are directly installed by the Intune management extension (IME)."* `[MEASURED, re-run 2026-08-19]` `WinGet` = 2 occurrences / 2 files corpus-wide (unchanged after the `--include=*.md` re-run) |
| **C-7. Catalog-availability SLOs are objectives, not agreements** | Sets patch-latency expectations honestly | LOW | `[SOURCED]` 80–90% within 24h of ingestion; manual-validation path within 7 days; *"Unlike Service Level Agreements (SLAs), SLOs are guidelines, not guarantees"* |

#### Pillar D — Linux update delivery

| Feature | Why expected | Complexity | Notes |
|---|---|---|---|
| **D-1. Honest statement: Intune has no Linux OS-update policy** | The whole point of the guide | LOW | `[SOURCED]` the Linux deployment guide's steps are prerequisites → planning → **compliance policies** → enrolment. No update or patch policy appears anywhere in it |
| **D-2. `unattended-upgrades` delivered via Intune Linux platform scripts** | The only actual delivery mechanism | MEDIUM | ⚠ **Re-sourced 2026-08-19.** The original row attributed the Bash-only claim to `deployment-guide-platform-linux`, which contains nothing supporting it. The claim is **true** but belongs to a different page: `device-configuration/templates/configure-custom-settings-linux` (`ms.date` 2025-01-09, `updated_at` 2026-07-01), verbatim *"**Execution Script**: Select the file picker to upload an existing Bash script. Only add `.sh` files."* Same page supplies the two facts that make this row a hazard rather than a recipe: **execution context** — *"**Root**: The script always runs (with or without users logged in) at the device level"* — and **execution frequency** — *"Select how frequently the script is executed. The default is **Every 15 minutes**."* There is **no documented run-time cap** on this surface. A root-context `apt upgrade` on a 15-minute default frequency, fleet-wide, is the single most important Linux pitfall in this milestone and must be called out in the guide. `[MEASURED]` `unattended-upgrades` = 1 occurrence corpus-wide |
| **D-3. Reboot-required handling** | `unattended-upgrades` does not reboot by itself | MEDIUM | `[PREMISE]` — mechanism (`/var/run/reboot-required`) not verified against a first-party Intune page; verify before authoring |
| **D-4. Compliance-policy + Conditional Access as the *only* enforceable Linux lever** | Converts "unenforceable" into a usable posture | MEDIUM | `[SOURCED]` compliance can gate on *"Linux distribution type, version, device encryption, or password complexity"*, with custom Bash compliance scripts, and CA blocks non-compliant devices in Edge. This is **attestation**, not enforcement — map it onto the corpus triad |
| **D-5. Supported-distro currency correction** | Blocks the guide from shipping stale on day one | LOW | `[SOURCED]` *"Ubuntu LTS, version 26.04 and 24.04 LTS / RedHat Enterprise Linux 9 / RedHat Enterprise Linux 10"*. `[MEASURED, re-run 2026-08-19]` corpus says `Ubuntu 22.04` **64× across 25 files**, `Ubuntu 20.04` 11×, `Ubuntu 24.04` 15×, `Ubuntu 26.04` **0×**. ⚠ Note the **intra-Microsoft conflict** the supported list has with itself: `configure-custom-settings-linux` Prerequisites still say *"Linux Ubuntu Desktop, **RedHat Enterprise Linux 8**, or RedHat Enterprise Linux 9"* while `ref-supported-platforms` says RHEL **9/10** — cite both, do not flatten. ⚠ This is a corpus-wide dependency, not a Pillar-D-local one; owner-ruled scope is **25 markdown files + 1 SVG** (`docs/diagrams/decision-tree-09-linux-triage.svg`, which needs regeneration) |

#### Pillar E — Corpus freshness and correction

`[MEASURED, run 2026-08-19]` **Added 2026-08-19.** §2 previously carried rows for pillars A, B, C, D, F and X only — **Pillar E had zero `E-*` rows**, so the milestone's freshness/correction pillar generated no requirements at all while §6 and §7 both treated it as the gate on everything else. These rows close that gap.

**Scope ruling (owner, 2026-08-19):** Pillar E covers **the five `docs/operations/patch-management/` files plus whatever else v1.21 modifies**. The corpus-wide past-due population — `[MEASURED, 2026-08-19]` **217 of the 271 files that carry both dates are past their `review_by`**, worst **71 days** (282 markdown files total; the 11 without both dates are templates and sentinels) — goes to **BACKLOG**, not to this milestone.

| Feature (what the doc covers) | Why expected | Complexity | Notes |
|---|---|---|---|
| **E-1. Re-verification of the five `patch-management/` docs** | Gates B, D and F; stale hubs propagate staleness into every new guide that links them | LOW | `[MEASURED, 2026-08-19]` all five carry `last_verified: 2026-04-28` / `review_by: 2026-06-27` — **53 days past due**. ⚠ **Hard constraint the corpus's own +90-day refresh convention does not carry:** `V-54-07` (`scripts/validation/check-phase-54.mjs:116`) caps `review_by − last_verified` at **≤ 60 days** for exactly these five files. Re-stamping them at +90 fails the validator |
| **E-2. Correct the Autopatch/WUfB mutual-exclusivity claim in `00-overview.md`** | It is false, it is stated three times, and it is load-bearing for decision D-1 | MEDIUM | `[MEASURED, 2026-08-19]` the false claim appears **three times**, all inside the `## Ring Terminology` section of `00-overview.md`: `:67` (*"mutually exclusive concepts; they cannot coexist on the same device"*), `:76-77` (*"Autopatch is mutually exclusive with WUfB deployment rings"*) and `:86-89` (*"The mutual-exclusion property … is a frequent source of admin confusion"*). A content correction, not a date bump. See D-1 in §5.2 for the first-party refutation. ⚠ That block is pinned by **both** `V-54-09` and `V-54-10`; edit with the validator open |
| **E-3. Correct the driver-policy independence claim in `00-overview.md`** | Half of it is true and half is false; deleting the whole thing would delete a true statement | LOW | `[MEASURED, 2026-08-19]` `00-overview.md:82-84` says driver/firmware updates *"are NOT gated by WUfB deployment rings or Autopatch rings — they are an independent policy surface that admins approve per-update"*. The **independence half is first-party correct**: *"Driver update policies can be used independently **or** as part of Windows Autopatch."* The **"not gated by rings" half is wrong** — the Quality Update deadline and grace period do apply to drivers (B-2). Correct the second clause only |
| **E-4. Ubuntu 22.04 → 24.04 / 26.04 currency sweep** | The corpus's stated distro floor is no longer on the first-party supported list | MEDIUM | `[MEASURED, 2026-08-19]` `Ubuntu 22.04` = 64 occurrences across **25 markdown files**, plus **1 SVG** (`docs/diagrams/decision-tree-09-linux-triage.svg`) that needs regeneration. Owner-ruled **in scope** for v1.21. See D-5 |
| **E-5. Freshness re-stamp of every file v1.21 otherwise modifies** | A milestone that edits a file and leaves its `last_verified` stale manufactures new debt | LOW | The second half of the owner scope ruling. Mechanical, but it must be a named requirement or it will be skipped at close |
| **E-6. State that freshness is a procedural guarantee, not an automated one** | Readers and planners both assume a validator is watching; none is | LOW | `[MEASURED, 2026-08-19]` **no validator compares `review_by` to the current date** — `grep -rn "Date.now()\|new Date()" scripts/validation/` returns only a timestamp emitter and two elapsed-timers. The `≤ 60`/`+90` rules constrain the *interval between the two stamps*, never the *distance from today*. That is why 217 files are past due with a green harness. Record it, and route the 217 to BACKLOG with the measurement attached |

#### Pillar F — The plan artifact itself

| Feature | Why expected | Complexity | Notes |
|---|---|---|---|
| **F-1. Ring/cohort topology with membership rule** | Section 3 of §1.1 | MEDIUM | Generic branch criteria only — see Anti-Feature AF-6 |
| **F-2. Deadline + grace per cohort** | Section 5 | LOW | `[SOURCED]` deadline 2–30 days, grace 0–7 days |
| **F-3. Expedite path with pre-authorised trigger and restart-deadline choice** | Section 10 — see §3 | MEDIUM | `[SOURCED]` restart deadline is 0, 1 or 2 days only |
| **F-4. Exception / exclusion register** | Section 11 | LOW | `[MEASURED, re-verified 2026-08-19]` corpus already recommends the compliance-policy layer at `00-overview.md:188-192` — inherit, don't re-decide |
| **F-5. Pilot cohort selection criteria** | Section 12 | LOW | Hardware-diversity criterion is load-bearing: `[SOURCED]` *"the drivers offered may vary between rings depending on the variety of device hardware in an organization"* |
| **F-6. `## Rollback/Recovery` section** | The milestone's flagship differentiator — and its doc-class basis was overstated | HIGH | ⚠ **Corrected 2026-08-19.** The original `[MEASURED]` claim *"all four existing recipes carry `## Rollback/Recovery`"* is **FALSE**. `grep -rn "^## Rollback" docs/recipes/*.md` returns exactly two hits: `03-windows-11-multi-app-kiosk.md:275` and `04-android-dedicated-mhs-multi-app.md:273`. Recipes 01 and 02 have **no** such section. `[MEASURED, re-run 2026-08-19]` **Which of the two possible readings is true is now settled:** `docs/_templates/recipe-template.md` has no `## Rollback/Recovery` heading at all — its section list is Summary → Prerequisites → Unsupported and Anti-Feature Callouts → Steps → Verification → Configuration-Caused Failures → See Also. **The doc class does not mandate the section**; it is a tracked *template divergence*, recorded at `.planning/milestones/v1.19-DEFERRED-CLEANUP.md:208-214` as **2-of-4** with the explicit trigger *"a third recipe needs the `## Rollback/Recovery` slot."* v1.21's Pillar F recipe is that third recipe, so **this milestone fires the trigger** and should either promote the section into the template or record why it stays a divergence. Recipes 01/02 are not non-compliant. This is the hardest section to write honestly — see §5.3 |
| **F-7. Compliance reporting + SLA with per-platform latency caveat** | Section 14 | MEDIUM | `[MEASURED]` corpus already states the data models are not parity-aligned (`00-overview.md:182-187`) |
| **F-8. Roles and approval gates** | Section 2 | LOW | Anchor to real gates: manual driver approval, expedite creation, DFCI retirement |

### 2.2 Differentiators (valuable, not assumed)

| Feature | Value proposition | Complexity | Notes |
|---|---|---|---|
| **X-1. Cross-platform "which concepts actually generalise" table** | Directly prevents Pillar F from pretending the platforms are alike; see §4 | MEDIUM | Highest-leverage single artifact in the milestone `[PREMISE]` |
| **X-2. Reconcile `ios-capability-matrix.md` against `patch-management/00-overview.md`** | Fixes a **measured internal contradiction** | LOW | `[MEASURED]` `ios-capability-matrix.md:106` asserts *"Update ring management \| Yes (Windows Update for Business) \| Yes (DDM managed software update on macOS 14+) \| Yes (DDM ... on iOS 17+)"* while `00-overview.md:93-94` states the other three platforms *"do not use ring **terminology**"*. ⚠ **Downgraded 2026-08-19.** The original *"Both cannot stand"* overstates the conflict: `00-overview` is a claim about **terminology**, while `ios-capability-matrix.md:106` uses "Update ring management" as a capability **row label** whose cells answer via DDM. The two are reconcilable by **relabelling one row** (e.g. "Staged-rollout management"), not by a doctrinal ruling. It is a cheap tidy-up, **not a gate on Pillar F** — do not sequence the recipe behind it |
| **X-3. Hotpatch — enabled by default, configured at two levels, and Arm64-capable** | The original row was wrong on three counts and fed a recipe decision block | MEDIUM | `[SOURCED, re-fetched 2026-08-19]` `configure-hotpatch` (`ms.date` 2026-01-13, `updated_at` 2026-04-29). **(1) Not x64-only.** *"This requirement only applies to Arm 64 CPU devices when using hotpatch updates"* — Arm64 **is** supported provided CHPE is disabled: set `HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management` DWORD `HotPatchRestrictions=1` and restart, once. *"There are no plans to support hotpatch updates on Arm64 devices with CHPE enabled."* **(2) Not opt-in.** *"Hotpatch security updates are enabled by default for all eligible devices in Microsoft Intune."* **(3) Two configuration levels, not one.** A **tenant default** at *Tenant administration > Windows Autopatch > Tenant management > Tenant settings*, toggle *"When available, apply updates without restarting the device (ˈhotpatchˉ)"* to Allow or Block — which *"is only applied to devices that aren't members of a quality update policy"* — **and** a per-policy setting in a **Windows quality update policy**, which wins where assigned. VBS is required; ineligible devices silently receive the LCU instead. The section is titled *"Hotpatch on Windows 11 **Enterprise** or Windows Server 2025"* — the edition constraint is real, and Windows 365 Enterprise satisfies it |
| **X-4. DFCI readiness discovery via Graph** | Turns "is this device DFCI-capable?" into a query | LOW | `[SOURCED]` `managedDevice/deviceFirmwareConfigurationInterfaceManaged` |
| **X-5. WinGet as a distinct third-party patching mechanism** | The gap EAC leaves | MEDIUM | Genuinely distinct from EAC `[SOURCED]`. But it is a *scripted* pattern with no Intune policy surface — scope tightly or defer |
| **X-6. Ubuntu Pro / Livepatch** | Kernel patching without reboot on Linux | MEDIUM | `[MEASURED]` `livepatch` = **0** occurrences corpus-wide. Requires an Ubuntu Pro entitlement — a licensing dependency outside Intune. Differentiator, not table stakes |
| **X-7. Firmware delivered via Windows Update vs OEM catalog** | Answers "do I still need Dell Command Update?" | MEDIUM | `[SOURCED]` *"Updates that are published to Windows Update have a requirement to use a Windows mechanism that enables securely updating the firmware or driver without requiring the BIOS/UEFI to be unlocked."* And OEM-tool availability may **lag** Windows Update |
| **X-8. Expedite worked example (the Test-1 / Test-2 walkthrough)** | Makes the deferral interaction concrete | LOW | `[SOURCED]` first-party worked example exists — adapt, cite, do not invent a parallel one |
| **X-9. Per-mechanism "where rollback does not exist" summary table** | The single most re-read table in a real plan | MEDIUM | Synthesises B-4, C-3, C-4, A-3 |

### 2.3 Anti-Features (explicitly OUT of scope)

Each row carries reasoning designed to survive re-litigation, because these land in PROJECT.md's Out of Scope permanently.

| Anti-feature | Why it gets requested | Why it is problematic here | What to do instead |
|---|---|---|---|
| **AF-1. WSUS / SCCM server-side build-out** | Dual-scan is already discussed, so "just explain WSUS too" feels natural | Violates the standing **Intune client-side-only** constraint; it is a different product's admin surface with no L1/L2 audience in this corpus; and the corpus already routes co-management through `operations/co-management/` | Keep the three **client-side** dual-scan mitigations already at `01-windows-wufb-rings.md:181-196`; cross-link the workload-slider guide for everything else |
| **AF-2. Third-party patch-management products (PatchMyPC, Ivanti, ManageEngine, …)** | "Everyone uses one" | Vendor-comparison content ages fastest of any content type, cannot be verified from first-party docs, and this corpus has no commercial-evaluation doc class. **The distinguishing test vs AF-4:** is the vendor tool the *only* way to reach the capability through Intune? Dell Command **is** (`[SOURCED]` the Dell BIOS policy literally cannot function without the OEM Win32 agent). PatchMyPC is **not** — EAC covers the same ground natively `[SOURCED]` | Document EAC + guided supersedence + hand-packaged Win32 supersedence as the three in-scope mechanisms; state that third-party suites exist and are out of scope |
| **AF-3. ~~RADIUS-style server infrastructure~~ — STRUCK 2026-08-19** | *(It was carried over from the 802.1X pillar's scoping conversation.)* | ⚠ **This row should not ship.** Its own justification concedes *"zero relationship to update governance"* — which makes it a **procedural** anti-feature (a note about a past scoping conversation) rather than a domain one. Anti-features land in PROJECT.md's Out of Scope permanently; a row that rules out something nobody would place in this domain adds noise and invites the reader to wonder what else was arbitrarily excluded. ID retained so AF-4…AF-10 do not renumber | Drop it. If the 802.1X precedent needs preserving, it belongs in that pillar's own scoping record, not here |
| **AF-4. Vendor BIOS *infrastructure* Intune cannot reach** (HP Sure Admin key-management back end, Lenovo cloud consoles, the Dell Command server side beyond the `.cctk` artifact) | The per-OEM guides are OWNER-RULED first-class, so depth pressure is real | The owner's own guardrail: these must stay **Intune-delivery-shaped and link-not-copy**, and must not become rewritten Dell/HP/Lenovo manuals. Vendor back ends also change without notice and are unverifiable from Microsoft sources | Document the **Intune-side delivery shape** (produce artifact with OEM tool → deploy OEM Win32 agent → assign policy/script → verify) and link out for the vendor console itself |
| **AF-5. OEM firmware update servers / repositories** (Dell Repository Manager, HP Image Assistant, Lenovo Update Retriever) | "Our OEM has a catalog" | These are a parallel **non-Intune** delivery channel. `[SOURCED]` firmware published to Windows Update already carries a mechanism that works without unlocking the BIOS, and may be available *before* the vendor tool | Document the Windows Update / driver-policy path as the supported one; note the availability-lag caveat (X-7) |
| **AF-6. Tenant-specific ring sizes, dates and device counts** | A prescriptive recipe seems to demand concrete numbers | Violates the standing **generic, not tenant-specific** constraint, and any specific "Ring 1 = 5% on day 3" is unverifiable and instantly wrong for the next reader | Give **decision blocks with branch criteria** and the first-party *ranges* (deferral 0–30d quality / 0–365d feature; deadline 2–30d; grace 0–7d; driver deferral 0–30d; expedite restart 0–2d) — all `[SOURCED]` |
| **AF-7. A single unified fleet-wide "patch day"** | Operationally tidy | Already settled against in-corpus: forcing one *"usually creates unnecessary deferral on the platform with the fastest native cadence"* (`00-overview.md:164-169` — line anchor corrected 2026-08-19; AF-8's `182-187` and F-4's `188-192` were re-verified and are correct) | Reference the existing cadence-alignment guidance; do not re-litigate |
| **AF-8. A unified cross-platform patch dashboard specification** | Executives want one number | Already settled against in-corpus at `00-overview.md:182-187` — the data models are not parity-aligned. Also the corpus ships **no configuration artifacts of any kind** | Document the lowest-common-denominator metric ("is the device at or above target patch level?") and the per-platform latency caveats |
| **AF-9. Manual driver packaging / `.inf` sideloading / driver injection into images** | Habit from imaging-era practice | Out of band from every Intune surface documented here; `[SOURCED]` driver policies only surface *"driver updates that are currently published to Windows Update"* | State the boundary explicitly in the driver guide's Unsupported callout |
| **AF-10. Building or specifying an approval-workflow tool** | Section 2 of the plan names approval gates | This is a documentation milestone; a workflow tool is software | Document the gate as a decision point with a named role |

**Deliberately NOT ruled out — flagged for owner decision, not assessed as anti-features:**
- **Windows 10 ESU mechanics.** `[SOURCED]` *"On October 14, 2025, Windows 10 reached end of support and won't receive quality and feature updates. Windows 10 is an allowed version in Intune."* `[PREMISE]` a 2026 enterprise update plan plausibly still needs an ESU paragraph. Routed to Future Consideration (§4 of MVP), not to Out of Scope.

---

## 3. Emergency / Expedited Patching (answers Q3)

All `[SOURCED]` from `configure-expedite-policy` (`ms.date` 2026-03-31), fetched 2026-08-18.

**What it is.** *"Expedited updates install as soon as possible, bypassing deferral settings and normal deployment timing, without requiring you to pause or modify your existing monthly update policies."* One update per policy, selected from a dropdown, identified by **release date** so one policy spans multiple Windows versions.

**How it interacts with rings — the precise rule.** *"While expedite update policies will override an update deferral for the update version that's specified in the policy, they don't override deferrals that are in place for any other update version."* This asymmetry produces the counter-intuitive behaviour Microsoft itself illustrates: a device may install a **newer** update than the policy names, if no active deferral blocks that newer update. *"In some scenarios, Windows Update might install a newer update than the one specified in the expedite policy."*

**Restart behaviour is its own control**, not the ring's grace period: *"select the number of days before it's enforced"*, values 0, 1 or 2 days. *"A setting of 0 days means that as soon as the device installs the update, the user is notified about the restart and has limited time to save their work."*

**When it is the right tool.** *"You might use an expedite policy to quickly mitigate a critical security vulnerability when your standard update process wouldn't deploy the update soon enough."* And explicitly not for routine servicing: *"Expedite policies don't affect how future quality updates are deployed."*

**Prerequisites that bite.** Update Health Tools are **required below 24H2** and must **not** be installed on 24H2+ (first-party PowerShell detection snippet provided). Pre-release/Insider builds are unsupported. Four legacy GPOs (`CorpWuURL`, `AutoUpdateCfg`, `DeferFeatureUpdates`, `Disable Dual Scan`) must be at Not configured.

**Deletion is not uninstall.** *"Deleting a policy removes it from Intune but doesn't uninstall the update if it has already completed installation. Windows Update will attempt to cancel any in-progress installations, but successful cancellation of an in-progress installation can't be guaranteed."* — this belongs in `## Rollback/Recovery`, not in the happy path.

**Requirement-shaped implication:** the plan's emergency section needs *three* documented values, not one — the eligible update classes (security B / OOB / non-security D, Win11-only for D releases), the restart-deadline choice, and the pre-authorised approver.

---

## 4. Cross-Platform Coherence (answers Q4)

### 4.1 Concepts that genuinely generalise

| Concept | Why it generalises | Confidence |
|---|---|---|
| **Deferral / enforcement / attestation triad** | Already the corpus's own organising model and it holds for Linux too (Linux = attestation-only) | HIGH `[MEASURED corpus + SOURCED Linux]` |
| **Pilot-then-broad cohorting** | A practice, not a mechanism — expressible on any platform via group membership | HIGH `[PREMISE]` |
| **A deadline instant** | Windows deadline and macOS/iOS DDM `TargetLocalDateTime` both express "by when" as a policy primitive | MEDIUM `[MEASURED corpus]` — ⚠ **Android removed from this row 2026-08-19.** The original wording generalised over Android via "Play Integrity compliance date". **Play Integrity is an attestation *verdict*, not a deadline primitive** — nothing in it lets an admin set "by when". The October 31 2026 date the corpus attaches to it is a **program milestone**, not a per-update deadline, and is separately **UNVERIFIED** (no first-party source fetched). Android reaches "by when" only through the compliance/CA gate, i.e. the same lever as Linux |
| **Exception handling at the compliance layer** | Corpus already argues this is the most uniform layer | HIGH `[MEASURED corpus]` |
| **"At or above target patch level" as the common metric** | The only cross-platform-comparable number | MEDIUM `[MEASURED corpus]` |

### 4.2 Windows-only fictions when applied elsewhere

| Windows concept | Why it does not travel | Evidence |
|---|---|---|
| **"Ring"** | The corpus already states the other three platforms do not use ring *terminology*; Linux has none either | `[MEASURED]` `00-overview.md:93-94` — `ios-capability-matrix.md:106` uses "Update ring management" as a **row label** answered via DDM, which is a labelling clash rather than a doctrinal contradiction; see X-2 |
| **"Expedite"** | A named Intune policy type with dropdown-selected updates. `[PREMISE]` DDM has no expedite primitive — the nearest equivalent is a near-term `TargetLocalDateTime`. The corpus's *"Yes (DDM emergency update)"* cells need first-party verification before they are carried into Pillar F | `[MEASURED]` `ios-capability-matrix.md:109` |
| **"Driver / firmware update policy"** | Windows-only in its entirety. macOS/iOS firmware ships inside the OS update; Android OEM firmware is LifeGuard / KSP (already in corpus) | `[SOURCED]` policy is a Windows blade; `[MEASURED]` corpus already covers Zebra/Samsung |
| **"Grace period"** | Windows's deadline **plus** grace is a two-stage construct. `[PREMISE]` iOS DDM's target date is a single instant with no equivalent second stage | — |
| **"Update channel"** | An M365 Apps servicing branch with a defined rollback window. Superficially resembles Managed Google Play tracks, but a channel governs a *device's* servicing branch while an MGP track governs an *app's* release stream. Do not unify | `[SOURCED]` channel semantics; `[MEASURED]` MGP tracks already in `app-lifecycle/04` |
| **"Rollback"** | Wildly non-uniform: M365 Apps has explicit rollback windows (MEC 3 months, SAEC 2 months from July 2026) `[SOURCED]`; Windows drivers have **none** `[SOURCED]`; EAC auto-update has **none** `[SOURCED]`; `[PREMISE]` iOS/Android have no OS downgrade path at all | — |
| **"Maintenance window / active hours"** | A WUfB client-side construct. `[PREMISE]` no admin-set equivalent primitive on macOS/iOS | — |

**Requirement-shaped implication for Pillar F:** the recipe must carry a **platform-applicability marker per decision point**, and at least three of its decision points are Windows-only. A single flat "enterprise update plan" with implicitly-universal steps would be the failure mode this section exists to prevent.

---

## 5. The Update-Plan Recipe as a Prescriptive Artifact (answers Q6)

### 5.1 Recipe doc-class shape (structure MEASURED from `docs/recipes/03-…`)

`## Summary` → `## Prerequisites` → `## Unsupported and Anti-Feature Callouts` → `## Steps` (with `> **Ask the admin:**` decision blocks and `> **What breaks if misconfigured:**` closers) → `## Verification` → `## Rollback/Recovery` → `## Configuration-Caused Failures` → `## See Also`.
`[MEASURED, re-run 2026-08-19]` decision-block counts across the four shipped recipes (`grep -c "Ask the admin"`): 4, 4, 1, 5. ⚠ The section list above is the **shipped-recipe** shape, not the template shape: `docs/_templates/recipe-template.md` carries no `## Rollback/Recovery` heading, and only recipes 03 and 04 have one — see F-6.

### 5.2 Decision points and realistic branches

| # | `Ask the admin` | Branches | Consequence-if-wrong | Reversibility |
|---|---|---|---|---|
| **D-1** | Service-managed or tenant-managed Windows topology? | Autopatch groups (service-rotated cohorts, with update-ring policies **inside** them) \| standalone WUfB update rings you author and rotate yourself | ⚠ **Rewritten 2026-08-19 — the previous version of this block was false.** It read *"Mutually exclusive; enabling Autopatch detaches devices from WUfB rings"* and was labelled `[MEASURED corpus]`, i.e. sourced to corpus prose that two other research files independently falsify. First-party, verbatim: *"An Autopatch group is a logical container or unit that groups several Microsoft Entra groups, **and software update policies, such as Update rings policy for Windows 10 and later**, feature updates for Windows 10 and later policies, driver update policies, Microsoft 365 App update policies, and Microsoft Edge update policies."* Autopatch **contains** update-ring policies; it does not exclude them. The real consequence of choosing Autopatch is **loss of direct authorship**: the service creates and manages the ring policies, so hand-edits to them are overwritten, and any pre-existing ring assignment is superseded by the Autopatch-created one | Reversible, disruptive — `[SOURCED, re-fetched 2026-08-19]` `windows-autopatch/deploy/windows-autopatch-groups-overview` |
| **D-2** | Hotpatch: leave the default on, or Block it? | **Leave the tenant default (Allow) in place** \| Block at the tenant level \| override per-cohort in a Windows quality update policy | ⚠ **Rewritten 2026-08-19 — both original branches were wrong.** The block framed hotpatch as an opt-in choice between "hotpatch-enabled policy" and "standard rings", and gated it on "24H2 + **x64** + VBS". First-party: *"Hotpatch security updates are **enabled by default** for all eligible devices in Microsoft Intune"*, so the real decision is whether to **leave it on**, not whether to turn it on; and Arm64 **is** supported once CHPE is disabled (`HotPatchRestrictions=1`, one-time, restart required) — it is not an x64-only feature. What remains true: **VBS is required**, the edition constraint is Windows 11 **Enterprise** (Windows 365 Enterprise qualifies), and **ineligible devices silently receive the LCU instead**, which does require a restart. Note the two-level precedence: the tenant toggle applies only to devices **not** in a quality update policy | Reversible — `[SOURCED, re-fetched 2026-08-19]` `configure-hotpatch`, `ms.date` 2026-01-13 |
| **D-3** | Driver approval mode? | Automatic + per-ring deferral \| Manual + approval dates | Switching modes in Autopatch **destroys all approvals, pauses and declines** | **Destructive** `[SOURCED]` |
| **D-4** | Which BIOS/firmware surface? | DFCI (supported OEM + OEM/CSP Autopilot registration — note Dell, HP and Lenovo are **not** on the DFCI OEM list, which is exactly why the other branches exist) \| Dell BIOS configuration policy (+ Dell Command agent + Intune-held password, **and the devices must not already have a BIOS password set**: *"Make sure the devices don't have an existing BIOS password configured. This feature requires that Intune have the BIOS password."*) \| vendor connector or Win32 tool (HP Connect / HP Sure Admin, Lenovo Think BIOS Config — no native Intune policy surface) \| none | Wrong branch is unrecoverable at retirement time (A-3, A-4) | **Effectively irreversible** `[SOURCED]` |
| **D-5** | M365 Apps channel? | Current \| Monthly Enterprise \| Semi-Annual Enterprise | One channel per device; changing channel can remove features users depend on | Reversible within the rollback window only `[SOURCED]` |
| **D-6** | App patch mechanism? | EAC auto-update (add-on licence, Required assignment) \| EAC guided supersedence \| hand-packaged Win32 supersedence | Auto-update has no rings and no rollback; mixing mechanisms on one app causes a version race | Reversible `[SOURCED]` |
| **D-7** | Enforcement primitive per non-Windows platform? | Deferral \| DDM enforcement \| attestation gate | Choosing "deferral" on Apple's forward path picks a deprecated primitive | Reversible `[MEASURED corpus]` |
| **D-8** | Linux posture? | Shell-script `unattended-upgrades` (unenforceable) \| compliance policy + CA gate (enforceable by access denial) \| explicitly out of the update plan | Claiming enforcement you do not have | Reversible `[SOURCED]` |
| **D-9** | Where do exceptions live? | Compliance-policy exclusion \| update-policy exclusion | Update-layer exclusions fragment per platform | Reversible `[MEASURED corpus]` |

### 5.3 What `## Rollback/Recovery` must actually contain

This is the section most likely to be written dishonestly, because for four of these mechanisms the truthful answer is "you cannot".

| Mechanism | Recovery | Confidence |
|---|---|---|
| Expedite policy | Deleting the policy does **not** uninstall an installed update; in-progress cancellation is best-effort | `[SOURCED]` |
| **Hotpatch update** *(added 2026-08-19)* | *"Automatic rollback of a hotpatch update isn't supported but you can uninstall them."* Uninstall path: remove the hotpatch, install the latest LCU — and *"Uninstalling a hotpatch update is quick, however, it requires a device restart"*, which is the exact disruption hotpatch was adopted to avoid | `[SOURCED, re-fetched 2026-08-19]` |
| Driver update | **No policy rollback.** Pause in remaining policies (best-effort) + manual removal, e.g. PowerShell | `[SOURCED]` |
| Autopatch driver mode switch | No recovery — approvals/pauses/declines are lost with the replaced policies | `[SOURCED]` |
| DFCI | Unlock the UEFI menus **before** wipe; delete the Autopilot record **last**. If already stuck: open the UEFI menu and *"refresh management from network"* | `[SOURCED]` |
| Dell BIOS password | Set *Disable per-device BIOS password protection* = **Yes** and let the policy apply **before** unenrolling; unenrolling does not remove it; tenant subscription end = contact the OEM | `[SOURCED]` |
| M365 Apps channel | Rollback windows only, and **the default channel has none**: the first-party comparison table's *Rollback support* row reads Current Channel = **"Not applicable"**, Monthly Enterprise = "Three months", Semi-Annual Enterprise = "Two months". Since Current Channel is the **default** for Microsoft 365 Apps for enterprise, the out-of-the-box posture for most fleets is *no application rollback at all* — the single most consequential omission from the original version of this table *(added 2026-08-19)* | `[SOURCED]` |
| EAC auto-update | No rollback and no automatic uninstall remediation — manual Uninstall intent or remediation script | `[SOURCED]` |
| Linux `unattended-upgrades` | `[PREMISE]` distro-native (`apt` pin / snapshot); no Intune-side recovery exists |  |

---

## 6. Feature Dependencies

```
[Pillar E — E-1..E-6: re-verify the 5 patch-management docs + correct their false claims]
    └──gates──> [Pillar B — driver guide promotion]
    └──gates──> [Pillar D — Linux update delivery]
    └──gates──> [Pillar F — the recipe]
                     ^
[Pillar A — BIOS/firmware] ──feeds decision D-4──┤
[Pillar B — drivers]       ──feeds decision D-3──┤
[Pillar C — app patching]  ──feeds decisions D-5/D-6──┘

[patch-management/00-overview.md 4-col comparison table]
    └──must extend to 5 cols──> [Pillar D]

[app-lifecycle/01-windows-win32-msix-scale.md — supersedence chains]
    └──Pillar C must delta, not re-author──> [C-1]

[co-management/02 + 03 — workload sliders, Autopatch prereqs]
    └──prerequisite cross-links──> [C-5, B-9]

[decision-trees/03-tpm-attestation.md — TPM/BIOS entry point]
    └──cross-link target──> [A-7]

[ios-capability-matrix.md:106,109]  ──ROW-LABEL CLASH WITH──  [00-overview.md:93-94]
    └──cheap relabel, NOT a gate──> [X-1 / Pillar F platform-applicability markers]

[Ubuntu 22.04 × 64 across 25 files]  ──CONFLICTS WITH──  [Intune supported: 26.04 / 24.04 / RHEL 9 / RHEL 10]
    └──corpus-wide scope decision required at roadmap──> [Pillar D]
```

### Dependency notes

- **Pillar E gates B, D and F, not just itself.** `[MEASURED, re-run 2026-08-19]` all five `patch-management/` files carry `last_verified: 2026-04-28` / `review_by: 2026-06-27` — **53 days past due** as of 2026-08-19 (the original "52" was computed against 2026-08-18). Authoring new guides that link into stale ones propagates the staleness. Re-verify first — and note the `≤ 60`-day `V-54-07` cap on the re-stamp (E-1), not the corpus's usual +90.
- **X-2 is a tidy-up, not a gate.** *(Downgraded 2026-08-19.)* The two statements are a row-label clash, not a contradiction: `00-overview` denies the *terminology*, `ios-capability-matrix` uses "Update ring management" as a capability row answered via DDM. Relabel one row; do not sequence Pillar F behind it.
- **The Ubuntu currency conflict is bigger than Pillar D — and it is now scoped in.** `[MEASURED, re-run 2026-08-19]` **64 occurrences across 25 markdown files** plus **1 SVG** vs a first-party supported list that no longer names 22.04. Owner-ruled: option (b), the sweep, is **IN SCOPE for v1.21** and lands as **E-4**. The SVG (`docs/diagrams/decision-tree-09-linux-triage.svg`) needs a regeneration task, not a text edit.
- **A-8's `[LOW]` rating reflected a non-attempt, not an absence.** *(Corrected 2026-08-19.)* Dell is fully sourced; HP and Lenovo were rated LOW because no vendor page was fetched — but Lenovo CDRT (`docs.lenovocdrt.com`) and HP's Sure Admin guides plus **HP Connect for Microsoft Endpoint Manager** (`connect.admin.hp.com`) are all readily available. **HP Connect is now IN SCOPE by owner ruling**, and it changes HP's delivery shape from a Win32-packaged script to a **vendor connector with Entra-integrated, certificate-based authentication and no per-device agent** — which means A-8 is two delivery shapes, not one. Fetch the vendor docs at plan time rather than degrading to matrix rows.
- **C-5 is a delta.** `[MEASURED, re-run 2026-08-19]` `Autopatch` = **162 occurrences / 9 files** (144 case-sensitive). Scope it as "what the corpus does not yet say about Autopatch", exactly as v1.19 scoped its recipes — and re-file it: three of its four topics are OS servicing, not application update management (see C-5's note).
- **New glossary terminology is confirmed needed.** `[MEASURED]` `docs/_glossary.md` has **no** `###` entry matching ring / Autopatch / driver / firmware / update. DFCI = 0 occurrences corpus-wide; `livepatch` = 0; `Known Issue Rollback` = 0; `safeguard hold` = 0; `BIOS password` = 0; `Delivery Optimization` = 1; `Expedite` = 1 (in `ios-capability-matrix.md` only). `[MEASURED, re-run 2026-08-19 with `--include=*.md --exclude-dir=graphify-out`]` — all of these zero/one counts are unchanged by the re-run. ⚠ Glossary edits interact with the recorded zero-margin freshness hazard — re-measure at plan time.

---

## 7. MVP Definition

### Launch With (v1.21 core)

- [ ] **E-1 … E-6 Pillar E** — re-verify the five `patch-management/` docs (E-1, ≤ 60-day cap), correct the two false claims they carry (E-2 mutual exclusivity, E-3 driver ring-gating), the Ubuntu sweep (E-4, 25 md + 1 SVG), re-stamp everything v1.21 touches (E-5), and record that freshness is unpoliced (E-6). Gates everything else
- [ ] **B-1 … B-9 driver guide** — the single highest-density set of correctable misconceptions, and the deferral/deadline asymmetry (B-2) is the milestone's best individual finding
- [ ] **A-1 … A-5 + A-9 DFCI + Dell BIOS core** — surfaces, OEM routing and the no-existing-BIOS-password prerequisite (A-9), the Reuse-vs-Retire sequences, password custody including the tenant-wide Option 2, the conflict loop
- [ ] **C-1 … C-4, C-6, C-8 app patching core** — supersede-vs-patch, EAC auto-update + all eight limits + licensing **and cloud** gates, M365 channels (C-4) and the un-landed July 2026 unification stated honestly (C-8)
- [ ] **D-1, D-2, D-4, D-5 Linux guide** — honest capability statement, shell-script delivery, compliance/CA as the real lever, distro currency
- [ ] **§3 expedite content** — folded into the Windows guide *and* referenced by F-3
- [ ] **B-10, B-11 driver-policy boundaries** — split out of the old composite B-6/B-8; B-11 (no driver policies during Autopilot, but critical drivers still land) is the highest-value pitfall on an Autopilot corpus
- [ ] **X-2 matrix relabel** — small; a tidy-up, **not** a gate on F (downgraded 2026-08-19)
- [ ] **Pillar F recipe** with D-1 … D-9 decision blocks and the honest §5.3 Rollback/Recovery

> **Six table-stakes rows are deliberately NOT in Launch With** *(recorded 2026-08-19 — the original §7 omitted them silently).* **A-6** per-OEM matrix (needs A-1/A-5 vocabulary first), **A-7** Secure Boot/TPM positioning (cross-link only; the corpus already owns TPM), **A-8** HP/Lenovo guides (now unblocked by the HP Connect ruling but still needs a vendor-doc fetch pass), **C-5** Autopatch guide (HIGH cost, and it needs re-filing off Pillar C), **C-7** catalog SLOs (one paragraph, rides with C-2), **D-3** Linux reboot-required handling (still `[PREMISE]` — no Intune-side source). Each is table stakes; each has a stated reason for the deferral. If a reason lapses at plan time, the row moves up.

### Add After Validation

- [ ] **A-6 per-OEM capability matrix** — add once A-1…A-5 fix the vocabulary the matrix rows need
- [ ] **A-8 HP / Lenovo guides** — trigger: first-party-equivalent vendor documentation verified at plan time
- [ ] **X-1 full cross-platform generalisation table** — trigger: X-2 reconciled
- [ ] **X-3 hotpatch re-verification** — trigger: Pillar E establishes the current hotpatch default state
- [ ] **X-7 WU-vs-OEM-catalog firmware comparison**
- [ ] **X-9 consolidated "no rollback here" table**

### Future Consideration

- [ ] **X-5 WinGet patching** — defer: scripted pattern, no policy surface, and EAC covers the mainstream case
- [ ] **X-6 Ubuntu Pro / Livepatch** — defer: licensing dependency outside Intune
- [ ] **Windows 10 ESU** — defer: owner decision, and the corpus is Windows-11-shaped
- [ ] **Corpus-wide Ubuntu version sweep** — defer to its own milestone unless the roadmap scopes it in deliberately

---

## 8. Feature Prioritization Matrix

| Feature | User value | Cost | Priority |
|---|---|---|---|
| B-2 driver deferral/deadline asymmetry | HIGH | LOW | P1 |
| B-4 no driver rollback | HIGH | LOW | P1 |
| A-3 DFCI retirement trap | HIGH | LOW | P1 |
| A-4 BIOS password custody | HIGH | MEDIUM | P1 |
| C-4 M365 channels + July 2026 unification | HIGH | MEDIUM | P1 |
| C-3 EAC auto-update limitations | HIGH | LOW | P1 |
| D-1 Linux "no update policy" statement | HIGH | LOW | P1 |
| D-5 distro currency correction | HIGH | LOW | P1 |
| §3 expedite semantics | HIGH | MEDIUM | P1 |
| F-6 honest Rollback/Recovery | HIGH | HIGH | P1 |
| X-2 matrix row relabel (downgraded: tidy-up, not a gate) | MEDIUM | LOW | P2 |
| E-1 five-doc re-verification (≤ 60-day cap) | HIGH | LOW | P1 |
| E-2 mutual-exclusivity correction in `00-overview.md` | HIGH | LOW | P1 |
| E-3 driver ring-gating half-correction | HIGH | LOW | P1 |
| E-4 Ubuntu 22.04 sweep (25 md + 1 SVG) | MEDIUM | MEDIUM | P2 |
| E-5 re-stamp of everything v1.21 touches | MEDIUM | LOW | P1 |
| E-6 "freshness is unpoliced" statement + 217-file BACKLOG hand-off | MEDIUM | LOW | P2 |
| A-1/A-2/A-9 two surfaces + OEM lists + Dell password prerequisite | HIGH | MEDIUM | P1 |
| B-11 no driver policies during Autopilot (critical drivers still land) | HIGH | LOW | P1 |
| C-8 July 2026 SAEC unification stated as un-landed | HIGH | LOW | P1 |
| C-1 supersede vs patch | HIGH | MEDIUM | P1 |
| C-5 Autopatch guide | MEDIUM | HIGH | P2 |
| A-6 per-OEM matrix | MEDIUM | MEDIUM | P2 |
| X-1 generalisation table | HIGH | MEDIUM | P2 |
| X-3 hotpatch (re-verified 2026-08-19 — now `[SOURCED]`, not search-summary) | MEDIUM | LOW | P2 |
| B-10 extension / PnP drivers outside policy control | MEDIUM | LOW | P2 |
| B-7 Autopatch mode-switch destruction | MEDIUM | LOW | P2 |
| A-8 HP/Lenovo guides | MEDIUM | HIGH | P2 |
| X-9 no-rollback summary table | MEDIUM | LOW | P2 |
| X-5 WinGet | LOW | MEDIUM | P3 |
| X-6 Livepatch | LOW | MEDIUM | P3 |
| Windows 10 ESU | LOW | MEDIUM | P3 |

---

## 9. Reference Plan Shapes Considered

| Aspect | Microsoft first-party docs | This corpus's Device Recipe class | Our approach |
|---|---|---|---|
| Organising axis | Per-mechanism ("how to configure X") | Per-outcome, linear steps with decision blocks | Recipe for the plan; per-mechanism operations guides underneath |
| Decision handling | Prose "you might want to…" | `> **Ask the admin:**` block + `> **What breaks if misconfigured:**` | Nine explicit decision points (§5.2), each with a reversibility rating |
| Failure content | Scattered across FAQ pages | Dedicated `## Configuration-Caused Failures` | Harvest the FAQ material into that section rather than the happy path |
| Rollback | Rarely stated; absence is implicit | **Not** mandated by the template — a tracked divergence carried by 2 of the 4 shipped recipes *(corrected 2026-08-19; see F-6)* | State absence explicitly per mechanism (§5.3) — the differentiator, and v1.21 is the third recipe, which fires the divergence trigger |
| Cross-platform | Siloed per platform | Comparison table in the hub | Add Linux as a 5th column + platform-applicability markers per decision point |

---

## 10. Gaps and Currency Flags

**Could not verify — do not present as fact:**
- **HP Sure Admin / HP BIOS Configuration Utility / Lenovo Think BIOS Config — detailed mechanics.** `[LOW]` ⚠ **Reclassified 2026-08-19:** this was a *non-attempt*, not an absence. Vendor documentation exists and is public — **HP Connect for Microsoft Endpoint Manager** (`connect.admin.hp.com`, user guide PDF) and **Lenovo CDRT** (`docs.lenovocdrt.com`). A search-summary pass on 2026-08-19 established HP Connect's delivery shape (cloud console → Intune device groups → proactive remediations; Entra consent; Sure Admin certificate auth; no per-device agent). Full vendor-doc fetches are still owed at plan time; nothing beyond the delivery shape should be asserted before then.
- **Linux reboot-required handling (D-3)** — mechanism not confirmed against any Intune-side source. `[PREMISE]`
- **DDM "emergency update" as an expedite equivalent** — the corpus asserts it; no Apple source was fetched. `[PREMISE]`
- ~~**Hotpatch "Windows 11 Enterprise 24H2+ default from May 2026"**~~ — **RESOLVED 2026-08-19.** `configure-hotpatch` was fully fetched (`ms.date` 2026-01-13, `updated_at` 2026-04-29). Hotpatch **is** enabled by default for eligible devices; it is **not** x64-only (Arm64 works with CHPE disabled); and it is configured at two levels (tenant default + quality update policy). X-3 and decision D-2 are rewritten accordingly and are now `[SOURCED]`. The corpus's "default May 2026" wording should still be replaced — not because the default is wrong, but because a bare date will re-rot.

**Known first-party inconsistency (cite both, do not pick silently):** the DFCI supported-OEM list differs between `autopilot/dfci-management` (Acer, Asus, Dynabook, Fujitsu, Surface, Panasonic, VAIO, Samsung, NEC) and the comparison table in `configure-bios-windows` (Surface, Acer, Asus, Dynabook, Fujitsu, Panasonic).

**Known corpus-internal contradiction:** `ios-capability-matrix.md:106` vs `patch-management/00-overview.md:92-94` on whether non-Windows platforms have "rings". `[MEASURED]`

**Currency — corrected 2026-08-19.** Two claims in the original version of this paragraph were wrong.

1. **"Every page below was fetched"** is contradicted by the Sources table's own last row, which declares three pages **search-summary only**. Two of those three (`configure-hotpatch`, `enterprise-app-management`-adjacent material) were fully fetched on 2026-08-19; `configure-driver-update-policy` and `update-enterprise-supersedence` remain search-summary-level and every quote drawn from them is now labelled `[SOURCED, search-summary]`.
2. **The oldest page is not the Linux guide.** The oldest source in the table is `configure-bios-windows`, **`ms.date` 2024-06-06** — more than two years stale, and it is the **sole** source for three load-bearing claims: the *"Currently, only Dell is supported"* restriction, the entire BIOS-password custody model (A-4), and the HP/Lenovo negative. A single stale page carrying that much of Pillar A is the pillar's biggest currency risk; re-fetch it first at plan time. (The Linux platform guide, `ms.date` 2024-11-04 / `updated_at` 2026-07-01, is second-oldest and its supported-distro list is still the freshest available first-party statement — though it conflicts with `configure-custom-settings-linux`, which still names RHEL 8; see D-5.)

---

## Sources

All fetched 2026-08-18. Confidence tier for first-party vendor documentation retrieved via built-in WebSearch/WebFetch: **MEDIUM** per the classify-confidence seam (`--provider websearch`); raised to **HIGH** only where a full page was fetched and quoted verbatim.

| Source | `ms.date` | Used for |
|---|---|---|
| [Expedite Policies for Windows Quality Updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-expedite-policy) | 2026-03-31 | §3 entirely; F-3; §5.3 |
| [DFCI Management (Autopilot)](https://learn.microsoft.com/en-us/autopilot/dfci-management) | 2025-03-25 | A-2 OEM list; registration prerequisite; X-4 |
| [Update Windows BIOS features using DFCI MDM policies](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows) | 2026-06-23 | A-1, A-3, A-5; §5.3 DFCI row |
| [Update Windows BIOS using configuration MDM policy](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) | 2024-06-06 | A-1 Dell-only; A-4 password custody; A-8; the DFCI-vs-BIOS-config comparison table |
| [FAQ: Windows Driver Update Policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) | 2026-01-06 | B-2, B-3, B-4, B-5, B-6, B-8; X-7 |
| [Manage driver and firmware updates (Autopatch)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates) | 2025-03-31 | B-1, B-6, B-7; F-5 |
| [Microsoft Intune Enterprise Application Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) | 2026-06-03 | C-1, C-2, C-3, C-6, C-7; Windows 10 EOS |
| [Overview of update channels for Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) | 2026-05-27 | C-4; §5.3 M365 rollback windows |
| [Deployment guide for Linux device management](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-linux) | 2024-11-04 (updated 2026-07-01) | D-1, D-2, D-4, D-5 |
| [Hotpatch with Windows quality updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-hotpatch) — **fully fetched 2026-08-19** (was search-summary only) | 2026-01-13 (updated 2026-04-29) | X-3 rewritten; decision D-2 rewritten; §5.3 hotpatch row |
| [Add custom settings to Linux devices](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-custom-settings-linux) — **added 2026-08-19** | 2025-01-09 (updated 2026-07-01) | D-2 re-sourced (`.sh` only, Root context, 15-minute default, no run-time cap); the RHEL-8-vs-9/10 conflict in D-5 |
| [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) — **added 2026-08-19** | — | Decision D-1 rewritten; E-2 (the containment quote that falsifies mutual exclusivity) |
| [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) — **vendor, not Microsoft; search-summary level, 2026-08-19** | — | A-8 HP delivery shape |
| Search-summary only — **not** a full fetch: [Configure driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy), [Guided update supersedence](https://learn.microsoft.com/en-us/intune/app-management/deployment/update-enterprise-supersedence) | — | B-5 quotes (labelled `[SOURCED, search-summary]`); AF-6 ranges; B-1 and C-1 corroboration |

**In-repo measurements — ALL RE-RUN 2026-08-19 against `D:/claude/Autopilot`.**

⚠ **The 2026-08-18 figures were contaminated.** They were taken with a bare `grep -ril`/`grep -rio` over `docs/`, which walks `docs/graphify-out/cache/semantic/*.json` — a generated knowledge-graph cache, not documentation. Every term count in this file has been re-run with the corpus restricted to markdown:

```
grep -ril --include=*.md --exclude-dir=graphify-out -- "<term>" docs/   # files
grep -rio --include=*.md --exclude-dir=graphify-out -- "<term>" docs/   # hits
```

`find docs -name '*.md' | wc -l` → **282** (unchanged; `graphify-out` contains no markdown, so only the *grep* counts were affected).

| Term | 2026-08-18 (contaminated) | 2026-08-19 (corrected) |
|---|---|---|
| `Autopatch` | 177 hits / 12 files | **162 hits / 9 files** (144 case-sensitive) |
| `TPM 2.0` | 34 hits / 15 files | **31 hits / 12 files** |
| `Ubuntu 22.04` | 65 hits / — | **64 hits / 25 files** |
| `Secure Boot` | 4 / 2 files | 4 / 2 files (unchanged) |
| `Enterprise App Catalog` | 7 / 6 files | 7 / 6 files (unchanged) |
| `WinGet` | 2 / 2 files | 2 / 2 files (unchanged) |
| `Ubuntu 24.04` / `20.04` / `26.04` | 15 / 11 / 0 | 15 / 11 / 0 (unchanged) |
| `DFCI`, `livepatch`, `BIOS password`, `Known Issue Rollback`, `safeguard hold`, `driver rollback`, `Sure Admin`, `Think BIOS`, `Monthly Enterprise` | 0 each | **0 each (unchanged)** |
| `UEFI` | 2 | 2 (unchanged) |
| `Expedite` / `expedited` | 1 each | 1 each, both in `reference/ios-capability-matrix.md` (unchanged) |
| `unattended-upgrades` | 1 | 1 (unchanged) |
| `Delivery Optimization` | 1 | 1 (unchanged) |

No conclusion in this file changes as a result of the re-run: C-5 is still a delta rather than a greenfield guide, A-7 still says cross-link rather than re-author, and D-5 is still a corpus-wide currency conflict.

**Other measurements re-run 2026-08-19:** recipe decision-block counts (`grep -c "Ask the admin" docs/recipes/*.md`) → **4 / 4 / 1 / 5** (unchanged). `grep -rn "^## Rollback" docs/recipes/*.md` → **2 hits** (`03-…:275`, `04-…:273`) — see F-6. `docs/_templates/recipe-template.md` headings → Summary, Prerequisites, Unsupported and Anti-Feature Callouts, Steps, Verification, Configuration-Caused Failures, See Also (**no** Rollback/Recovery). All five `docs/operations/patch-management/*.md` → `last_verified: 2026-04-28` / `review_by: 2026-06-27` (**53 days past due**). `grep -rn "Date.now()\|new Date()" scripts/validation/` → a timestamp emitter and two elapsed-timers only, i.e. **no validator compares `review_by` to today** (E-6).

---

## Corrections Applied (2026-08-19, adversarial review)

Every row below corresponds to a ruling in the v1.21 referee findings. Facts were re-verified against
first-party pages (re-fetched 2026-08-19) or re-measured against the repo at HEAD; **no source was
invented**, and where a claim could not be re-sourced the label was downgraded rather than dressed up.

| Finding | What changed |
|---|---|
| **5, 6** | The header's guarantee that *"every quoted string is verbatim from a page fetched in this session"* was **false** and is replaced with an honest one plus a new `[SOURCED, search-summary]` tier. B-5's two quotes and AF-6's ranges, which came from the search-summary-only `configure-driver-update-policy`, are relabelled. **Sub-claim not applied:** the alleged "by" insertion at A-2 was re-checked against the live page — `dfci-management` reads *"such as by importing from a CSV file"*, so the quote **is** verbatim and was left alone. (The rulings' own Finding 60 quotes it the same way.) |
| **28** | Every term count re-run with `--include=*.md --exclude-dir=graphify-out`; the old figures were contaminated by `docs/graphify-out/cache/semantic/*.json`. `Autopatch` 177/12 → **162 hits / 9 files** (144 case-sensitive); `TPM 2.0` 34/15 → **31/12**; `Ubuntu 22.04` 65 → **64 hits / 25 files**. All other counts re-run and confirmed unchanged. Updated at A-7, C-5, C-6, D-5, the §6 graph, three §6 dependency notes, and the Sources measurement block (now a before/after table with the exact command). C-5's "delta not greenfield" conclusion and its P2/MEDIUM/HIGH rating survive unchanged, as ruled. |
| **41** | **Autopatch/WUfB mutual exclusivity is FALSE.** Removed from §1.1 row 3 and **decision block D-1 rewritten**, not annotated. D-1 now carries the first-party containment quote (*"An Autopatch group is a logical container … **and software update policies, such as Update rings policy for Windows 10 and later**…"*, `windows-autopatch-groups-overview`) and reframes the real consequence as **loss of direct authorship**. The corpus repair is now requirement **E-2** (three occurrences: `00-overview.md:67`, `:76-77`, `:84-86`). |
| **43, 44** | **X-3 and decision block D-2 rewritten** against a full fetch of `configure-hotpatch` (`ms.date` 2026-01-13). Hotpatch is **not x64-only** — Arm64 is supported with CHPE disabled (`HotPatchRestrictions=1`); it is **enabled by default** for eligible devices; and it has **two** configuration levels (tenant toggle at *Tenant administration > Windows Autopatch > Tenant management*, plus the per-policy setting that wins where assigned). D-2's branches are now Allow/Block/override rather than the false opt-in pair. |
| **49** | **F-6's `[MEASURED]` claim was false** — `grep -rn "^## Rollback" docs/recipes/*.md` returns 2, not 4. Resolved which reading is true: `docs/_templates/recipe-template.md` has **no** such heading, so the doc class does **not** mandate the section; it is a tracked template divergence recorded at `v1.19-DEFERRED-CLEANUP.md:208-214` as 2-of-4 with the trigger *"a third recipe needs the slot"*. v1.21's recipe **fires that trigger**. Recipes 01/02 are not non-compliant. §9's Rollback row corrected to match. |
| **50** | **C-4 split; the unification claim is now C-8** and is stated as *announced but NOT confirmed landed*. `overview-update-channels` (re-fetched 2026-08-19) still reads *"will begin receiving"* and its own comparison table still says Feature updates *"Twice a year (in January and July)"* / Support *"Eight months"*. Both the announced end state and the un-updated table are now documented. |
| **52** | **D-2 (Pillar D) re-sourced.** The Bash-only claim was attributed to `deployment-guide-platform-linux`, which does not support it. Correct source is `configure-custom-settings-linux` (*"Only add `.sh` files"*), re-fetched 2026-08-19 — which also supplied the two facts that turn this row into a hazard callout: **Root** execution context and an **Every 15 minutes** default frequency, with **no documented run-time cap**. |
| **63, 64** | Dell's hard prerequisite — *"Make sure the devices don't have an existing BIOS password configured…"* — added to **A-9** (new), **A-8** and decision **D-4**. **A-4** rewritten to state both retrieval options: Option 2 returns passwords for **all** devices and needs only the **Intune Administrator** Entra role, and passwords stay readable after a device leaves Intune management. |
| **65** | **B-2** now carries the scoping note it was missing: *"The deferral period only applies to **automatically approved** driver and firmware updates…"* |
| **66, 67** | **C-3 rewritten** with all **eight** first-party limitation headings (re-fetched 2026-08-19), including **Malicious version revocation** (*"You're still responsible for identifying impacted devices and taking remediation action"*), plus the EAC **positive** so the guidance does not invert. **§5.3** gains a **hotpatch** row (*"Automatic rollback … isn't supported but you can uninstall them"*, uninstall requires a restart) and the M365 row now leads with **Current Channel's rollback = "Not applicable"** — the default channel has none. |
| **71** | **X-2 downgraded from a gate to a tidy-up.** *"Both cannot stand"* overstated a **row-label clash**: `00-overview` denies ring *terminology*; `ios-capability-matrix.md:106` uses "Update ring management" as a capability row answered via DDM. Reconcilable by relabelling one row. Propagated to §4.2, the §6 graph, the §6 dependency note, §7 and §8 (P1 → P2). |
| **74-78, 92, 93** | Four non-atomic rows split, appending IDs so nothing renumbers: **A-1 → A-1 + A-9**, **B-6 → B-6 + B-10**, **B-8 → B-8 + B-11**, **C-4 → C-4 + C-8**. **AF-3 (RADIUS) struck** as a procedural anti-feature with no domain relationship (ID retained so AF-4…AF-10 keep their numbers). **C-2** gains the EAC cloud requirement (Public / GCC High / DoD only). **A-2** no longer states "no Dell, HP or Lenovo" as settled — the source's next line is *"Other OEMs are pending."* — and now records **three** conflicting OEM lists, not two. **A-3** now separates **Reuse** (*"Do **not** remove the Windows Autopilot device record"*) from **Retire**. **§7** records the **six** table-stakes rows it omits (A-6, A-7, A-8, C-5, C-7, D-3) with a reason each. |
| **92 (structural)** | **Pillar E added to §2** — it previously had **zero** `E-*` rows while §6 and §7 both treated it as the gate on everything else. Six rows **E-1 … E-6**, scoped per the owner ruling to the five `patch-management/` files plus whatever else v1.21 modifies. E-1 records the **≤ 60-day `V-54-07` cap** (not the corpus's usual +90). E-6 records that **no validator compares `review_by` to the current date**, and routes the corpus-wide **217-of-271 past-due** population to **BACKLOG**. §7 and §8 updated to carry the E rows. |
| **94** | **A-8's `[LOW]` reclassified as a non-attempt.** **HP Connect for Microsoft Endpoint Manager** is now IN SCOPE by owner ruling and changes HP's delivery shape to a **vendor connector** — cloud console publishing BIOS policies to Intune device groups as proactive remediations, Entra consent, Sure Admin certificate auth, **no per-device agent** — so A-8 is two delivery shapes, not one. Lenovo CDRT (`docs.lenovocdrt.com`) named. Labelled `[SOURCED, vendor doc — search-summary level]`; full fetches still owed at plan time. |
| **109-114** | **§1.1**'s defensibility test no longer claims to be absolute — rows 1, 13 and 15 are labelled *program-level* rather than surface-forced. **C-5** flagged as miscategorised under Pillar C (three of its four topics are OS servicing). **§4.1** drops Android from the "deadline instant" row — Play Integrity is an attestation **verdict**, and the Oct-31-2026 date is a program milestone and separately **UNVERIFIED**. **§10**'s "oldest page" corrected to `configure-bios-windows` **`ms.date` 2024-06-06**, with a note that it is the sole source for three load-bearing Pillar A claims. **§10**'s blanket fetch guarantee corrected against its own table. **AF-7** line anchor `163-169` → `164-169`; AF-8's `182-187` and F-4's `188-192` re-verified as correct. |

**False positives honoured (not corrected):** Findings 3, 11 and 36 were ruled non-defects and no change
was made on their account. **Not re-opened:** the `V120` terminal-close pin, the `PITFALL-2`/`PITFALL-4`
fabrication claim, the `V-54-15` Apple pin, and the `EEE-SOP-standard.md:325` "hard constraint".

---
*Feature research for: enterprise update, driver and firmware/BIOS governance documentation (v1.21)*
*Researched: 2026-08-18; corrected 2026-08-19 (adversarial review — see Corrections Applied)*
