# Phase 146: Windows Driver & Firmware Update Depth - Research

**Researched:** 2026-08-19
**Domain:** Intune Windows driver/firmware update policy — first-party sourcing for a new operations guide
**Confidence:** HIGH — every quote in the bank below was fetched this session; six of eight pages were retrieved as **source markdown bytes** from `raw.githubusercontent.com/MicrosoftDocs/memdocs`, not through a summarizing fetcher

## Summary

The bounded re-fetch mandated by CONTEXT D-47..D-53 **succeeded on every named target**, and it resolved more than it was asked to. `configure-driver-update-policy` was fetched in full (rendered page **and** its GitHub source markdown), confirming DRV-03's once-Approved-never-Declined constraint verbatim and the driver deferral 0–30 day range verbatim. `driver-updates-faq` was re-opened at source-byte level, yielding the **complete six-step ConfigMgr co-existence procedure with zero elisions**, the previously-unrecorded step-3 policy link target (`/windows/deployment/update/wufb-wsus`), and the Windows-10-vs-11 note and undefined-state warning verbatim.

Both of D-52's unsourced claims are now sourced. **B-10** (Extension / Plug-and-Play drivers) lives in `driver-updates-faq`, not on an unnamed page — the FEATURES Sources table simply never credited it. **DRV-01's `reporting`** has a dedicated first-party page, `monitor-driver-updates`, which the FEATURES Sources table does not list at all; it supplies three named reports, a six-status priority ranking and a six-month retention rule. AF-6's full range set was sourced to `ref-update-ring-settings`, another page absent from the Sources table.

Three sourcing **corrections** matter for the plan. (1) FEATURES **misattributes B-5's "pause is best effort" quote** — it is on `driver-updates-faq`, not `configure-driver-update-policy`; the phrase does not appear anywhere on the page FEATURES named. (2) `01:177`'s *"automatic firmware delivery for OEM-published catalogs"* — a sentence inside the movable block — is **contradicted by first-party text**: firmware updates land on the *Other drivers* list, and other-list updates always require explicit approval, even under an automatic-approval policy. It must not be carried into `06` unchanged. (3) The FAQ carries a **CHID-targeting exception** that appears nowhere in this repo's research and is high-value Unsupported-callout content.

**Primary recommendation:** author `06` from the eight-page quote bank in §2, treat §3's per-requirement inventory as the content contract, correct the firmware-auto-delivery claim rather than moving it, and keep the strings `SCCM` and `System Center` **out of `06` entirely** — first-party sources say *Configuration Manager*, which fires no C11 pattern at all and is a stronger defence than keyword-riding.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

All 72 decisions D-01..D-72 in `146-CONTEXT.md` are locked and are **not** re-litigated here. The ones this research operates under, restated so the planner sees them beside the findings:

- **D-01/D-02/D-03/D-04** — `06` **is** validated. `v1.20-milestone-audit.mjs:585` runs C11 over a live `walkMd('docs')` and is an apex chain member. Four patterns: `\bSystem Center\b`, `\bSCCM\b[^.]*\bIntune\b`, `\bAutopatch rings\b`, `\bSafetyNet\b[^.]*\bcompliance\b`. Escape is a ±200-char allowlisted keyword. `co-existence` is **not** an allowlisted keyword; `co-management` is.
- **D-05** — `V-54-27` walks `docs/` **and** `.planning/` for a line-start `> **Platform:**`. It binds this file. Use the full lexicon `> **Platform applicability:**`.
- **D-06/D-07** — `01:186-191` is frozen; every retained line in `01:168-214` lands byte-identical. No re-wrap, no re-flow, no `SCCM co-management` substitution, no removing the Workload Slider Migration link.
- **D-09/D-10/D-14** — the measured stub anatomy. Re-measured this session; see §5.1.
- **D-11** — the H2 string stays byte-identical: `## Driver and Firmware Update Policy`.
- **D-16** — no `ring`/`rings` token in any **added byte** to `01`, including link targets and `**Source:**` URLs. Backtick any `ring`-bearing slug.
- **D-24** — `01:200`'s `**Mitigation options (pick one):**` → `**Mitigation options:**`, plus a fourth item pointing at `06`'s co-existence section.
- **D-25** — mitigation 3 (`DisableDualScan = 1`) re-labelled deprecated **in place, with a `**Source:**` line**.
- **D-32/D-33/D-34/D-35/D-36** — filename `06-windows-driver-firmware-updates.md`; no `doc_id`, no C17 enrollment; five sibling frontmatter fields only; no forward links to `05-`, `07-`, `08-` or the firmware/BIOS guides.
- **D-37** — the H2 skeleton (10 headings, American spelling on `Behavior`).
- **D-38/D-41** — `## Unsupported and Anti-Feature Callouts`; absences as **bold sub-labels**, no new `PITFALL-N` identifiers.
- **D-42** — DRV-04 is first in the callouts section **and** gets a one-line warning near the top. Both halves always together.
- **D-43** — verbatim quotes are **never re-qualified**; the guide's own prose qualifies every `ring`; do not coin `driver deployment ring`.
- **D-44** — FIX-04's naming rule carries into `06`: **Windows Update client policies** in prose, `WUfB deployment` compound retained.
- **D-45** — AF-9's Unsupported callout is in scope.
- **D-50** — `[OWNER-RULED]` if the re-fetch fails, the phase blocks and escalates. **It did not fail** — see §4.
- **D-53** — every first-party quote ships as a `>` blockquote with a `**Source:**` line carrying the URL and the observed date; the verifier re-fetches and diffs.
- **D-61/D-62/D-63** — three commits, this order, these gates; commit 1 is the riskiest; carry the HEAD baselines.
- **D-64/D-65** — no registry row, no filename-map row, no canary bump, no ops-index row, no `## Version History`.
- **D-71** — state Windows-version applicability in one sentence.

### Claude's Discretion

Prose wording throughout; the exact article titles chosen for `**Source:**` lines; the precise H2 name satisfying D-04's keyword constraint; the wording of the fourth mitigation item (D-24); the order of edits within each commit. **All byte offsets, line numbers and hit maps are to be re-measured at plan time, never transcribed.**

### Deferred Ideas (OUT OF SCOPE)

`co-management/02-windows-workload-sliders.md` (cross-link only, do not edit); the `update-enterprise-supersedence` re-fetch (unowned); `REQUIREMENTS.md`'s `V-54-18` row clarification; a `review_by < today` freshness gate; `## Version History` in `docs/operations/`; C17 enrollment of the ~20 legacy operations documents; an automated gate for `http(s)` link targets.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description (from `REQUIREMENTS.md:41-47`) | Research Support |
|----|-------------|------------------|
| DRV-01 | Dedicated guide documenting the policy as its own surface — approval modes, approval workflow, OEM-published catalog behaviour, reporting | **Fully sourced.** Approval modes Q7/Q8/Q17; workflow Q9–Q16; OEM catalog Q19–Q23; reporting Q24–Q27 (a page the Sources table never listed) |
| DRV-02 | Deferral/deadline asymmetry verbatim-sourced + the automatically-approved scoping note | **Fully sourced verbatim.** Q1, Q2, Q3 — all three from `driver-updates-faq` source YAML |
| DRV-03 | No driver rollback, Microsoft's named mitigations, once-Approved-never-Declined | **Fully sourced verbatim.** Q4 (rollback + PowerShell + deployment rings), Q5 (never Declined), Q6 (pause is best effort), Q28 (policy page's own rollback sentence) |
| DRV-04 | No driver policies during Autopilot **and** unapproved critical drivers still install | **Fully sourced verbatim, both halves.** Q29, Q30 |
| DRV-05 | Automatic↔Manual switch destructive; approved-always-wins; no assignment filters; Extension and PnP excluded | **Fully sourced verbatim.** Q31 (destructive), Q32 (approved wins), Q33 (no filters), Q34/Q35 (Extension), Q36 (PnP) — D-52's B-10 gap **closed** |
| DRV-06 | ConfigMgr co-existence procedure + the undefined-and-unpredictable warning | **Fully sourced verbatim, zero elisions.** Q37–Q44, incl. the step-3 link target and the real GPO name from `wufb-wsus` |
| DRV-07 | Stub-and-move in `01`, retaining anchor / disambiguation / entire dual-scan section | In-repo, re-measured §5.1. No external sourcing required |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

`./CLAUDE.md` is a codebase guide for the Autopilot troubleshooting suite (PowerShell / FastAPI / React). **No directive in it constrains this phase** — Phase 146 writes only Markdown under `docs/operations/patch-management/` and `.planning/`, touching no source module, no API endpoint and no test suite. The one carry-over that does apply is its security note *"Never commit `.env` file or any credentials"*, which is vacuous here. No CLAUDE.md directive conflicts with any locked decision.

`.planning/config.json` sets `workflow.nyquist_validation: false` `[VERIFIED: .planning/config.json:8]`, so the Validation Architecture section is omitted. There are **no external packages** in this phase, so the Package Legitimacy Audit and Environment Availability sections are omitted; the only tool dependency is `node` for the four validators named in D-63, all already present and green at HEAD.

---

## 1. Sourcing Ledger

**Method.** Every page was fetched twice where possible: the rendered Learn page (for `ms.date` / `updated_at` metadata, which only the rendered page carries) **and** the GitHub source markdown at `raw.githubusercontent.com/MicrosoftDocs/memdocs/main/...` (for byte-exact prose). Where the source repo was unreachable, quotes were verified by grepping the **raw HTML bytes**, not the tag-stripped text, so no summarizer stood between the source and this file. This is `[DIRECT]` per `REQUIREMENTS.md:12`, never `[RELAYED]`.

| # | Page | `ms.date` | `updated_at` | Status | What it sources |
|---|------|-----------|--------------|--------|-----------------|
| S1 | [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) | **2026-01-13** | 2026-04-24 | **FETCHED IN FULL** — rendered (HTTP 200, 80,680 B) **and** source markdown (HTTP 200, 29,935 B) | The D-47 target. DRV-03's never-Declined constraint; driver deferral 0–30d; approval-mode mechanics; Other-drivers/firmware behaviour; CHID exception; pause semantics; no-inventory statement |
| S2 | [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) | **2026-01-06** | 2026-04-09 | **RE-OPENED IN FULL** — source YAML (HTTP 200, 15,955 B), read end to end | The D-28/D-49 target. **All six ConfigMgr steps unelided**, the step-3 link target, the Win10/11 note, the undefined-state warning; the deferral/deadline asymmetry; Autopilot; rollback; Extension/PnP; assignment filters; approved-always-wins; pause-is-best-effort; X-7 |
| S3 | [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) | **2026-01-14** | 2026-04-09 | FETCHED IN FULL — source markdown (3,643 B) + its **seven prerequisite include files** | The policy-surface framing; the four-stage Intune→Autopatch→Windows Update→reporting architecture; **prerequisites** (editions, licensing, cloud scope, telemetry, RBAC) |
| S4 | [Reports for Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates) | **2026-01-12** | 2026-04-29 | FETCHED IN FULL — source markdown (8,211 B) | **DRV-01's `reporting` gap, closed.** Three named reports, the six-status priority ranking, the failure-report field list, the six-month retention rule. **Not in the FEATURES Sources table** |
| S5 | [Update rings policy settings](https://learn.microsoft.com/en-us/intune/device-updates/windows/ref-update-ring-settings) | **2026-01-12** | 2026-04-09 | FETCHED IN FULL — source markdown | **AF-6's full range set**, first-party: quality deferral 0–30, feature deferral 0–365, deadlines 2–30, grace 0–7. Also the `Windows drivers` Allow/Block ring setting. **Not in the FEATURES Sources table** |
| S6 | [Use Windows Update client policies and WSUS together (`wufb-wsus`)](https://learn.microsoft.com/en-us/windows/deployment/update/wufb-wsus) | **2025-04-01** | 2025-10-02 | FETCHED IN FULL — rendered page; quotes verified against raw HTML | The D-49 scan-source target. The **real GPO name**, the GPO path, the four CSP nodes, the dual-scan-no-longer-supported statement |
| S7 | [Manage driver and firmware updates (Autopatch)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates) | **2025-03-31** | 2025-06-04 | FETCHED IN FULL — rendered page; quotes verified against raw HTML | B-1 Manual-mode quote; **B-7 destructive switch**; F-5 rings-vary; Autopatch does not manage extension drivers |
| S8 | [Windows Autopatch FAQ](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-faq) | **2026-05-28** | 2026-05-28 | FETCHED IN FULL — rendered page; quote verified against raw HTML (JSON-LD block) | The D-25/D-49 target. The dual-scan-deprecated quote for `01`'s mitigation-3 `**Source:**` line. `ms.date 2026-05-28` **confirmed** |

**Query trail (the D-51 / 145-D-27 discipline).**

1. Probed `raw.githubusercontent.com/MicrosoftDocs/memdocs/main/memdocs/intune/...` — **404**. The `memdocs/` path prefix in the URL is wrong; the repo root is the doc root.
2. Fetched the rendered `configure-driver-update-policy` page and read its `<meta name="original_content_git_url">` and its footer `github.com/MicrosoftDocs/...` link, which gave the true path `MicrosoftDocs/memdocs/blob/main/intune/device-updates/windows/configure-driver-update-policy.md`. `ms.date` and `updated_at` read from `<meta>` at the same time.
3. Re-probed raw with the corrected path — **200**. Repeated for `monitor-driver-updates` and `manage-driver-updates`. `driver-updates-faq` 404'd as `.md` because it is a **YamlMime:FAQ `.yml`**; the footer link disclosed the extension and it fetched 200.
4. Listed the whole doc folder via `api.github.com/repos/MicrosoftDocs/memdocs/contents/intune/device-updates/windows` (22 entries) rather than guessing filenames — that is how `ref-update-ring-settings.md` was found for AF-6, a page nobody had named.
5. `MicrosoftDocs/windows-itpro-docs` is **not publicly readable** on any branch (`main`/`live`/`public` all 404, API returns nothing), so S6/S7/S8 were taken from the rendered pages and every quote was then re-grepped against the **raw HTML** to prove the tag-strip introduced nothing.

**Provenance note for the planner.** Learn source markdown uses **U+2019 (`’`) curly apostrophes** in several of the quotes below (Q11, Q19, Q31). A `**Source:**`-cited blockquote that silently ASCII-folds them is no longer verbatim, and D-53's verifier diffs the quoted strings. Decide once at plan time whether the corpus normalizes; each affected quote is flagged.

---

## 2. Verbatim Quote Bank

**This is the section the guide is built from.** Every string below was read this session from the page named beside it. Nothing here is reconstructed, paraphrased or recalled.

Tier key: `[SOURCED, fetched 2026-08-19 — source markdown]` = read from the doc repo's own bytes (highest fidelity). `[SOURCED, fetched 2026-08-19 — rendered]` = read from the rendered page, quote re-verified against raw HTML.

### 2.1 Deferral and deadline (DRV-02)

| # | Quote | Source | Tier |
|---|-------|--------|------|
| **Q1** | "The deferral period set for Quality Updates within the update ring policy does not apply to drivers that are approved using the Driver Update Policy. Instead, use the deferral setting in the Driver policy to set a deferral.  In fact, using multiple driver policies with different deferral settings to create driver deployment rings is highly recommended. Remember to only assign a device to one driver policy." | S2 `driver-updates-faq.yml:50` | source markdown |
| **Q2** | "The deferral period only applies to automatically approved driver and firmware updates. An admin must specify the date to start offering a driver with any manual approval." | S2 `:52` (a `> [!NOTE]` block) | source markdown |
| **Q3** | "The Quality Update deadline and grace period settings apply to drivers." | S2 `:41` | source markdown |
| **Q3b** | "The deadline calculation for both quality and feature updates is based off the time the client's update scan initially discovered the update." | S2 `:47` | source markdown |
| **Q3c** | "**Make updates available after (days)**: This setting is a deferral period that delays when Windows Update begins to deploy and install the new recommended update that was automatically added to the policy with a status of *Approved*. The delay supports from zero to 30 days and starts from the day the update is added to the policy, not from the date the update was made available or published by the OEM." | S1 `configure-driver-update-policy.md:82` | source markdown |

⚠ **Q1 contains the bare literal `driver deployment rings`.** D-43(c) bars *coining* that phrase in the guide's own prose; D-43(a) requires verbatim quotes never be re-qualified. Both hold simultaneously: ship Q1 **inside a blockquote**, and never repeat the phrase outside one.

**AF-6 ranges, now first-party** (S5 `ref-update-ring-settings.md`, all `[SOURCED, fetched 2026-08-19 — source markdown]`):

| Setting | Verbatim range | Line |
|---|---|---|
| Quality update deferral | "Specify the number of days from 0 to 30 for which quality updates are deferred." | `:49` |
| Feature update deferral | "Specify the number of days from 0 to 365 for which feature updates are deferred." | `:62` |
| Deadline for feature updates | "Specifies the number of days a user has before feature updates are installed on their devices automatically (2-30)." | `:208` |
| Deadline for quality updates | "Specifies the number of days a user has before quality updates are installed on their devices automatically (2-30)." | `:209` |
| Grace period | "Specifies a minimum number of days after deadline until restarts occur automatically (0-7)." | `:210` |
| Driver deferral | see Q3c — "zero to 30 days" | S1 `:82` |

AF-6's standing **"generic, not tenant-specific"** constraint carries: give ranges and branch criteria, never "Ring 1 = 5% on day 3".

### 2.2 Rollback absence and the Approved/Declined constraint (DRV-03)

| # | Quote | Source | Tier |
|---|-------|--------|------|
| **Q4** | "No. Windows Update client policies don't currently support driver rollback. While rollback could be scripted, there are too many potential variables to provide a useful sample script for doing so. If you must remove a driver, consider manual methods like PowerShell.<br>To help avoid issues that require rolling back a driver from large numbers of devices, use *deployment rings* to limit driver installation to small initial groups of devices. This approach allows time to evaluate the success or compatibility of a driver before broadly deploying it across your organization." | S2 `:141-142` | source markdown |
| **Q5** | "After an update is *Approved*, it can never be *Declined*, but you can *Pause* it indefinitely." | S1 `:218` | source markdown |
| **Q6** | "Pause is a best effort, and when an update is paused, Windows Autopatch removes the approval. However, devices won't know that an update is paused until it's next scan for updates." … "If a device scans for updates and discovers an update is paused and that the device is in the process of downloading, installing, or waiting to restart, then Windows Update on the device attempts a \"best effort\" to remove that driver update from being installed. **If it can't halt the installation, the update completes its installation.**" | S2 `:128-130` | source markdown |
| **Q28** | "Pausing an update doesn't roll back a completed installation of the update but can stop an active install of an update that is currently underway." | S1 `:249` | source markdown |
| **Q28b** | "Keep in mind that policies for Windows driver updates don't support options to remove or roll-back driver updates." | S1 `:93` | source markdown |
| **Q28c** | "If you use policies with automatic approval, plan to monitor the policy for early signs of problems. If a driver update problem is identified in an early deployment ring, you can then pause that same update in your other policies." | S2 `:144` | source markdown |

🔴 **Correction of record — FEATURES B-5 misattributes its own source.** `FEATURES.md:83` states both B-5 quotes "come from `configure-driver-update-policy`". **Q6's "If it can't halt the installation…" does not appear anywhere on `configure-driver-update-policy`** `[MEASURED — case-insensitive grep for `halt` over the full 29,935-byte source markdown returns 0 hits]`. It is on `driver-updates-faq`. **Q5 is** on `configure-driver-update-policy`, at `:218`. The two halves of B-5 come from two different pages. Cite them separately or the `**Source:**` line ships a false attribution.

The four status values and the complete transition rules (S1 `:214-218`, source markdown) — useful as the guide's approval-workflow spine:

> - Only new driver updates can be assigned the status *Needs review*. However, a new recommended update that is added to a policy set for Automatic approval is added as *Approved*.
> - A driver update that *Needs review* can be *Approved* or *Declined*.
> - An *Approved* update can be *Paused*.
> - A *Paused* update can be *Approved*.
> - After an update is *Approved*, it can never be *Declined*, but you can *Pause* it indefinitely.

### 2.3 Approval modes and workflow (DRV-01)

| # | Quote | Source | Tier |
|---|-------|--------|------|
| **Q7** | "When you use Manual mode, no drivers are installed in your environment without your explicit approval." | S7 (Modes table, Manual row) | rendered |
| **Q8** | "Automatic mode (default) is recommended for organizations with standard Original Equipment Manufacturer (OEM) devices where no recent driver or hardware issues occurred due to Windows Updates." | S7 (Modes table, Automatic row) | rendered |
| **Q9** | "Manually approve and deploy driver updates: With this option, each new driver update that is added to the policy has its status set to *Needs review*. An admin must edit the policy to change the status of each individual update to *Approved* before that update can deploy to applicable devices." | S1 `:76` | source markdown |
| **Q10** | "Automatically approve all recommended driver updates: With this option, all new recommended driver updates that are added to the policy are added with a status of *Approved* and begin to install on applicable devices without having to be reviewed or approved by an admin." | S1 `:80` | source markdown |
| **Q11** | "After a policy is created, you won't be able to edit the policy to change the approval type. If the approval type is automatic, you can edit the value for *Make updates available after (days)*." | S1 `:87` (a `> [!TIP]`) | source markdown |
| **Q12** | "New updates that aren't a recommended driver update are added to the *other drivers* list of the policy and have their status set *Needs review*. These updates must be manually approved before they can be deployed to a device." | S1 `:108` | source markdown |
| **Q13** | "Windows Update will only install a driver update on a device if the updates version is newer than the version of the driver that's currently on the device. So, there's no risk of a policy installing an older version of a driver and downgrading a device's driver version." | S1 (Approved status `[!TIP]`) | source markdown |
| **Q14** | "Any time a driver update's status is manually changed to *Approved*, the availability of that update (which is when Windows Update begins to deploy it to devices) is defined by the date you assign for *Make available in Windows Update*." | S1 (Approved status `[!IMPORTANT]`) | source markdown |
| **Q15** | "You can only select up to 100 drivers at a time." — bulk actions | S1 (Bulk driver updates `[!NOTE]`) | source markdown |
| **Q16** | "You can't mix actions. For example, you can't Pause and Approve a set in one action. You must go through each action separately." | S1 (Bulk driver updates `[!NOTE]`) | source markdown |
| **Q17** | "In Microsoft Intune, Windows driver updates are managed through **driver update policies**, which provide a dedicated policy surface for reviewing, approving, and deploying driver updates to managed devices." | S3 `:13` | source markdown |
| **Q18** | "Client‑side install behavior—such as restarts and user notifications—continues to be governed by standard Windows Update policy settings." | S3 `:13` (note: contains U+2011 non-breaking hyphen in "Client‑side") | source markdown |

The four-stage architecture, S3 `:33-36`, is the cleanest available framing for `## What This Policy Does`:

> 1. **Microsoft Intune** provides device identity, assignment, and driver update approval information. Intune sends policy settings, approved drivers, and pause commands to Windows Autopatch.
> 2. **Windows Autopatch** uses this information to configure Windows Update behavior for managed devices and to coordinate driver update deployment.
> 3. **Windows Update** evaluates device and hardware information to determine which driver updates are applicable, and installs only approved updates during regular update scans.
> 4. **Reporting data** collected during update operations is sent through Windows Autopatch and surfaced in Intune reporting.

### 2.4 OEM catalog and firmware delivery (DRV-01, X-7)

| # | Quote | Source | Tier |
|---|-------|--------|------|
| **Q19** | "Windows driver update policies don't enforce Computer Hardware ID (CHID) targeting defined by OEMs, even when those drivers are listed as recommended. As a result, managed devices can receive newer recommended driver versions instead of CHID-targeted drivers." | S1 `:37` (a `> [!NOTE]`) — **contains U+2019 in `don’t`** | source markdown |
| **Q20** | "**Recommended drivers**: Recommended drivers are the best match for the 'required' driver updates that Windows Update can identify for a device. To be a recommended update, the OEM or driver publisher must mark the update as required and the update must be the most recent update version marked as required." | S1 (driver list section) | source markdown |
| **Q21** | "**Other drivers**: Other driver updates are updates that are available from the original equipment manufacturer (OEM) aside from the current recommended driver update." … "These updates can include: … Firmware updates … Optional driver updates, or updates that the OEM doesn't intend to be installed on all devices by default" | S1 (driver list section) | source markdown |
| **Q22** | "Updates that are published to Windows Update have a requirement to use a Windows mechanism that enables securely updating the firmware or driver without requiring the BIOS/UEFI to be unlocked." | S2 `:147` | source markdown |
| **Q23** | "The possibility of a delay depends on the vendor or OEM who determines the availability of their updates. Because driver updates are digitally signed by the same portal before they're published to Windows Updates, driver updates might become available through Windows Update before they become available via the vendors tools." | S2 `:150` | source markdown |
| **Q23b** | "Any driver updates that are currently published to Windows Update and applicable to one or more devices in the policy are available through driver update policies." | S2 `:18` | source markdown |
| **Q23c** | "Do driver update policies update drivers for plug-in devices? — Yes, if the driver updates are published to Windows Update by the OEM vendor." | S2 `:22-24` | source markdown |

🔴 **Correction of record — `01:177`'s firmware claim is contradicted.** `01:176-178` reads *"Driver and firmware policies have their own approval cadence (**manual driver approval; automatic firmware delivery for OEM-published catalogs**) that is decoupled from any quality/feature update deferral on a WUfB deployment ring."* That parenthetical sits **inside the movable block** (D-09: `:171-178`) and is on its way into `06`. First-party text says the opposite: Q21 puts **firmware updates on the *Other drivers* list**, and Q12 says other-list updates *"must be manually approved before they can be deployed to a device"* — **even in an automatic-approval policy**. Automatic approval reaches only *recommended* drivers (Q10). The truthful replacement is: *automatic approval covers recommended driver updates; firmware updates arrive on the Other drivers list and always require explicit approval.* Do not carry the sentence across unchanged. This is exactly the FIX-pillar failure mode — a wrong claim relocated rather than corrected.

### 2.5 Reporting (DRV-01) — D-52's second gap, closed

All from S4 `monitor-driver-updates.md`, `[SOURCED, fetched 2026-08-19 — source markdown]`.

| # | Quote | Line |
|---|-------|------|
| **Q24** | "The data in the Intune reports for Windows Driver update policies is used only for these reports and doesn't appear in other Intune reports. The following reports are available: Windows Driver updates summary / Windows Driver updates report / Windows Driver update failures" | `:20-24` |
| **Q25** | "However, each device is only represented once in a single status column, based on the worst status across all of the updates that apply to that device." | `:38` |
| **Q26** | "Intune ranks the following statuses in order of priority, from best (Success) to worst (NeedsReview): **Success** … **In progress** … **Paused** … **Error** … **Cancelled** … **NeedsReview**" | `:40-47` |
| **Q26b** | "This report doesn't support drilling in for more details about devices, driver updates, or policy details." — the summary report | `:51` |
| **Q27** | "Reporting data for driver updates remains available until the end of a data retention period is reached. This period is six months since the last time an event for the update is received." | `:111` |
| **Q27b** | Failure-report fields: "Device Name / Driver Name / Driver Class / Alert Message / Deployment Error Code / UPN / Intune Device ID" | `:99-105` |
| **Q27c** | "**Last Scan Time**: This column provides insight into when a device last checked for updates. This can help explain why approved updates haven't installed." | `:86` |

Admin-center navigation, verbatim: summary and driver reports at **Reports > Windows Updates**; the failures report at **Devices > Monitor > Driver update policies with alerts** (S4 `:34, :59-60, :94`).

### 2.6 Destructive mode switch, targeting and unmanaged classes (DRV-05)

| # | Quote | Source | Tier |
|---|-------|--------|------|
| **Q31** | "If you switch between Automatic and Manual modes, new policies are generated to **replace old policies**. **You’ll lose any approvals, paused drivers, and declined drivers previously made for those groups and/or deployment rings**." | S7 (an `[!IMPORTANT]`) — **U+2019 in `You’ll`**; the bolding is the source's own | rendered, re-verified against raw HTML |
| **Q32** | "Because the status of *approved* always wins, the driver installs on the device despite any other status for that update that is set in any other policy." | S2 `:38` | source markdown |
| **Q32b** | "While the use of multiple policies per device is supported, we don't recommend doing so. Instead, we recommend adding devices to a single policy to avoid confusion about whether a driver for a device is or isn't approved." | S2 `:36` | source markdown |
| **Q33** | "No. Driver Updates aren't currently supported with assignment filters." | S2 `:33` | source markdown |
| **Q34** | "These are likely *extension* drivers, which are \"sub drivers\" that a main driver can reference to be installed when the main driver is installed or updated. Extension drivers show up in the installed drivers or update history on the device, but aren't directly manageable. Because extension drivers don't function without base drivers, it's safe to allow them to install." | S2 `:134` | source markdown |
| **Q35** | "Windows Autopatch doesn't manage extension drivers. They're easily identified by the term 'extension' in the name." | S7 (Other-drivers note) | rendered, re-verified |
| **Q36** | "Plug and Play can also install drivers automatically. When Windows detects new hardware or software (such as a mouse, keyboard, or webcam) without an existing driver, it installs the latest driver to ensure the component functions immediately. After the initial installation, any future updates to these drivers will require approval." | S2 `:136` | source markdown |
| **Q36b** | "The driver list isn't a record of the driver versions currently installed on devices assigned to the policy. … **Intune doesn't collect an inventory of installed drivers.**" | S1 `:147` | source markdown |

**D-52's B-10 is closed.** Extension and Plug-and-Play drivers are sourced to `driver-updates-faq` (Q34, Q36) with Autopatch-side corroboration (Q35). The FEATURES Sources table's failure was one of *crediting*, not of fetching — the FAQ was always the source; its `Used for` cell just never listed B-10.

### 2.7 Autopilot (DRV-04)

| # | Quote | Source | Tier |
|---|-------|--------|------|
| **Q29** | "Can I apply driver update policies during Windows Autopilot? — No. Driver updates aren't supported during Windows Autopilot at this time." | S2 `:60-62` | source markdown |
| **Q30** | "Windows applies critical updates during Windows Autopilot. These updates may include critical driver updates that have not yet been approved by an admin." | S2 `:64` (a `> [!NOTE]`) | source markdown |

Both halves confirmed at source-byte level. D-42's pairing rule has the evidence it needs.

### 2.8 Configuration Manager co-existence (DRV-06) — D-28's elisions, closed

All from S2 `driver-updates-faq.yml:65-97`, the answer to *"How do I use driver management if I'm currently using Configuration Manager for updates?"*. **This is the complete, unelided procedure. Nothing below is reconstructed.**

| # | Element | Verbatim |
|---|---------|----------|
| **Q37** | Preamble | "You can continue to use Configuration Manager for updates other than Drivers, or start to move other update types to cloud management in Intune one at a time. To do this, first, enable [cloud attach] or co-management in your Configuration Manager hierarchy to enroll your managed devices in Intune." |
| **Q38** | The preferred path | "The recommended and preferred path to embrace cloud based updates is to move the [Windows Update] workload to Intune. If your organization isn't ready for this, you can use the Driver and Firmware management capability in Intune without moving the workload by completing the following steps:" |
| **Q39** | The Win10/Win11 `[!NOTE]` (D-29) | "The following procedure is supported for Windows 11 devices. For Windows 10 devices, we recommend moving the Windows Update workload in the Configuration Manager co-management settings to Intune. Alternatively, configure the Windows Update workload to the Pilot setting and specify a collection containing the in-scope Windows 10 managed devices." |
| **Q40** | Step 1 | "Leave the [Windows Update] workload set to Configuration Manager." |
| **Q41** | **Step 2 — the elision closed** | "Configure your driver policies in Intune to enroll devices and get them ready for management **as detailed at [Manage policy for Windows Driver updates with Microsoft Intune]**." |
| **Q42** | **Step 3 — the elision closed, link target recovered** | "Configure a domain-based group policy to configure **Windows Update** as the source for **Driver Updates** using the [Specify source for specific classes of Windows Updates policy]." — **link target: `/windows/deployment/update/wufb-wsus`** |
| **Q43** | The warning (D-31) | "Because Configuration Manager uses a local group policy to configure the update source policy, using Intune or a CSP to attempt to configure these same settings result in an undefined and unpredictable device state." |
| **Q44** | Step 4 | "Enable [data collection] in Intune for devices that you wish to deploy drivers and firmware to." |

**Steps 5 and 6 — quoted, not paraphrased (D-30).** The corpus's "prerequisites for Windows Update reports" gloss is **not** the source's wording; the source's own wording is:

| # | Element | Verbatim |
|---|---------|----------|
| **Q45** | Step 5 (optional) | "[Optional] Enforce allowing diagnostic data submission using a policy. Diagnostic data submission to Microsoft enables the use of [Windows Update reports for Microsoft Intune]." |
| **Q45b** | Step 5's `[!NOTE]` | "By default, diagnostic data submission to Microsoft is allowed on Windows devices. Disabling diagnostic data collection prevents the use of Windows Update reports for Microsoft Intune from reporting any update information for your managed devices." … "Configure the **Allow Diagnostic data** setting to **Optional** or **Required** using a domain-based group policy or Intune." |
| **Q46** | Step 6 (optional) | "[Optional] Enable device name collection in diagnostic data." |
| **Q46b** | Step 6's `[!NOTE]` — **an additional trap the corpus never recorded** | "Using Intune to configure any of the diagnostic data settings mentioned earlier requires that you move the [Device Configuration] co-management workload to Intune." |
| **Q47** | The closing constraint (D-17 cleared this for verbatim shipping) | "Using Update Ring policies in Intune for Quality or Feature Updates requires you to move the **Windows Update** workload to Intune." |
| **Q47b** | Feature-update extension | "You can move Feature update management to the cloud in Intune by configuring a [Feature update] policy in Intune and setting the **Feature Updates** setting to **Windows Update** using the [Specify source for specific classes of Windows Updates policy] group policy." |

**D-30 resolved.** The draft's "get empty reporting" was an inference beyond the source and Q45's actual wording is *"Diagnostic data submission to Microsoft enables the use of Windows Update reports for Microsoft Intune"*. Additive-vs-duplicative against step 4 is now answerable: **step 4 is `data collection` (the driver-policy prerequisite, an Intune tenant setting); step 5 is `Allow Diagnostic data` on the device (a GPO/Intune device setting).** They are different settings at different layers — **additive, not duplicative**.

**Q46b is a genuinely new finding.** Steps 5 and 6 tell an admin to configure diagnostic-data settings, and the note then says doing so *from Intune* requires moving the **Device Configuration** workload. On a fleet that has deliberately left everything on Configuration Manager, the optional steps carry a co-management-workload prerequisite the corpus has never documented. Worth a bold sub-label.

**The step-3 policy, from its own page (S6 `wufb-wsus`), `[SOURCED, fetched 2026-08-19 — rendered]`:**

| # | Element | Verbatim |
|---|---------|----------|
| **Q48** | What it does | "The Windows update scan source policy enables you to choose what types of updates to get from either WSUS or Windows Update client policies." |
| **Q49** | The four classes | "The specify scan source policy enables you to specify whether your device gets the following Windows update types form WSUS or from Windows Update: Feature updates / Windows quality updates / **Driver and firmware updates** / Updates for other Microsoft products" *(the `form` typo is the source's)* |
| **Q50** | Dual-scan status | "The policy Do not allow update deferral policies to cause scans against Windows Update, also known as Dual Scan, is no longer supported on Windows 11 and on Windows 10 it's replaced by the new Windows scan source policy and isn't recommended for use. If you configure both on Windows 10, you won't get updates from Windows Update." |
| **Q51** | **The real GPO name and path** | Group Policy: "Specify source service for specific classes of Windows Updates" — Path: `Computer Configuration\Administrative Templates\Windows Components\Windows Update\Manage updates offered from Windows Server Update Service\` |
| **Q52** | The CSP nodes | `Update/SetPolicyDrivenUpdateSourceForDriverUpdates`, `…ForFeatureUpdates`, `…ForOtherUpdates`, `…ForQualityUpdates` |
| **Q53** | Transition framing | "We recommend using this policy on your transition from fully on-premises managed environment to a cloud supported one. Whether you move only drivers to the cloud today or drivers and quality updates and then later move your other workloads, taking a step-by-step approach might ease the transition." |

⚠ **The FAQ and the policy's own page name the GPO differently.** The FAQ's link text is *"Specify source for specific classes of Windows Updates policy"* (Q42); the target page calls the setting *"Specify source **service** for specific classes of Windows Updates"* (Q51). REQUIREMENTS DRV-06 uses the FAQ's spelling. Ship **both**, attributed: the FAQ's phrasing in the quoted step, the GPO's own name where the guide tells an admin what to look for in the Group Policy editor. Silently picking one produces a guide that does not match the console.

**Q53 is load-bearing for D-53's `**Source:**` lines and D-16.** `wufb-wsus`'s URL contains no `ring` token, so it is safe to add to `01` unbackticked. Verify at plan time — D-16's rule is about **added bytes**, and it is cheap to backtick regardless.

### 2.9 The `01` mitigation-3 deprecation source (D-25)

| # | Quote | Source | Tier |
|---|-------|--------|------|
| **Q54** | "Dual Scan for Windows has been deprecated and replaced with the [scan source policy]. Windows Autopatch supports the scan source policy if the feature updates and Windows quality updates workloads are configured for Windows Update. If feature and Windows updates are configured for WSUS, it could cause disruptions to the service and your release schedules." | S8, under *"Does Windows Autopatch support Dual Scan for Windows Update?"* | rendered, re-verified against raw JSON-LD |

`ms.date 2026-05-28` **confirmed** — D-25's citation is correct as written. The embedded link target is `/windows/deployment/update/wufb-wsus`, the same page as Q42's. Q50 gives a second, non-Autopatch-scoped statement of the same deprecation and is the better citation for a reader who is not on Autopatch.

### 2.10 Prerequisites, scope and limits (DRV-01 supporting)

All from S3's include files, `[SOURCED, fetched 2026-08-19 — source markdown]`, `ms.date 2026-01-08` (tenant include `2026-01-14`).

| # | Element | Verbatim |
|---|---------|----------|
| **Q55** | Editions | "This feature supports the following Windows editions: Pro / Pro Education / Enterprise / Education" — plus "Windows Enterprise LTSC (Long Term Service Channel) isn't supported. Use update ring policies instead." |
| **Q56** | Licensing | "To use this feature, the following licenses are required: Microsoft Intune Plan 1 / A Windows license that includes the [Autopatch entitlement]." |
| **Q57** | **Cloud scope** | "This feature is supported in the following cloud environments: Public cloud / Government Community Cloud (GCC)" — i.e. **GCC High and DoD are absent** |
| **Q58** | Device requirements | "This policy type supports devices that are: Managed by Intune / Microsoft Entra joined / Microsoft Entra hybrid joined" … "Telemetry must be turned on, with a minimum setting of **Required**." … "The *Microsoft Account Sign-In Assistant* service (`wlidsvc`) must be enabled and running." |
| **Q59** | RBAC to manage | "To manage this feature, use an account with at least one of the following roles: [Policy and Profile manager] / [Custom role] that includes: The **Device configurations** permissions **Assign**,**Create**,**Delete**,**View Reports**,**Update**, and **Read**" |
| **Q60** | RBAC to view reports | "To view the reports for this feature, use an account with at least one of the following roles: [Endpoint Security Manager] / [Read Only Operator] / [Help Desk Operator] / [Custom role] with the **Managed devices**/**View Reports** permission." |
| **Q61** | Not-blocked prerequisite | "Windows update ring policy: Ensure the *Windows driver* setting is set to *Allow*." … "Settings catalog policy: In the *Windows Update client policies* category, ensure that *Exclude WU Drivers in Quality Update* is set to *Allow Windows Update drivers*." (S1 `:16-20`) |
| **Q62** | Inventory latency | "it can take up to 24 hours for all healthy devices to check in. After this, Intune needs to process the results of the scan to provide the inventory of available driver updates." (S2 `:125`) |
| **Q63** | UX settings do apply | "Yes, user experience settings such as automatic update behavior, active hours, notifications, and so on, are applied for driver updates as well." (S2 `:56`) |

**Q61 is directly relevant to `01`.** The existing mitigation 2 at `01:204-206` says *"Set the WUfB driver/firmware policy to 'Block automatic driver delivery'"*. The first-party lever with that effect is the **update ring** `Windows drivers` setting (S5 `:34-38`: "**Allow** - To include Windows Update drivers during updates. **Block** - To prevent scanning for drivers.", CSP `ExcludeWUDriversInQualityUpdate`) — a **ring** setting, not a driver-policy setting. `01:204-206` is inside the frozen zone (D-07) and must not be re-worded, but `06` can state the mechanism correctly.

**Q63 pairs with Q18** and is the honest answer to "does anything from my update ring reach drivers?" — **user-experience settings do; the quality deferral does not (Q1); the deadline and grace period do (Q3).** That triad is the whole of `## Deferral and Deadline Behavior`.

---

## 3. Per-Requirement Content Inventory

Mapped onto D-37's H2 skeleton. Every claim listed has a quote behind it unless marked ⚠.

### DRV-01 — the guide exists and covers four things

| Skeleton H2 | Claims that must ship | Quotes | Gap |
|---|---|---|---|
| `## What This Policy Does` | Dedicated policy surface, distinct from quality/feature; the four-stage Intune→Autopatch→Windows Update→reporting flow; client-side install behaviour stays with Windows Update client policies; only drivers published to Windows Update are in scope; Intune keeps no installed-driver inventory | Q17, Q18, S3 `:33-36`, Q23b, Q36b | none |
| `## Approval Modes` | Automatic (recommended default, recommended drivers only) vs Manual (nothing installs without explicit approval); **approval type is immutable after creation**; Other-drivers always need manual approval in both modes; recommended-vs-other classification | Q7, Q8, Q9, Q10, Q11, Q12, Q20, Q21 | none |
| `## The Approval Workflow` | The four statuses and the full transition rule set; approved-always-wins; one policy per device; `Make available in Windows Update` date semantics; no downgrade; bulk actions (100 cap, no mixed actions); pause is best effort; once Approved never Declined | Q5, Q6, Q9, Q13, Q14, Q15, Q16, Q32, Q32b, S1 `:214-218` | none |
| `## OEM Catalog and Firmware Delivery` | Firmware rides the driver policy via *Other drivers*; recommended requires the OEM to mark it required; the Windows-Update-publishing security mechanism; the vendor-tool lag; plug-in devices; **CHID targeting is not enforced** | Q19, Q20, Q21, Q22, Q23, Q23b, Q23c | ⚠ see §5.2 |
| `## Reporting` | Three named reports and where they live; worst-status-wins collapsing; the six-status priority order; the summary report cannot drill in; six-month retention; failure-report fields; Last Scan Time as the diagnostic column | Q24, Q25, Q26, Q26b, Q27, Q27b, Q27c | none — **D-52's gap closed** |

### DRV-02 — the deferral/deadline asymmetry

Verbatim-sourced three ways: **the ring quality deferral does not apply** (Q1), **the deadline and grace period do** (Q3, Q3b), **and the scoping note rides with it** (Q2). The driver policy's own deferral is 0–30 days from the day the update is added to the policy, not from OEM publication (Q3c). The AF-6 range table in §2.1 supplies the ring-side numbers first-party for the first time. Add Q63 (user-experience settings **do** apply) to make the boundary complete rather than a bare negative. **No gap.**

### DRV-03 — the rollback absence

Three components, all verbatim: the absence itself and Microsoft's two named mitigations (Q4 — deployment rings to limit blast radius, PowerShell for manual removal); the once-Approved-never-Declined constraint (Q5); and what pause actually does (Q6, Q28). Q28b is a second, independent statement of the absence on a different page — cite it, because a single-page claim is the fragile kind. Q28c is Microsoft's own cross-policy pause guidance and is the operational answer to "a regression blocked my ring promotion". **No gap.** D-46 is satisfied by Q6 landing in `## The Approval Workflow`.

### DRV-04 — Autopilot

Both halves verbatim (Q29, Q30) from source bytes. D-42 places this first in the callouts and repeats one line near the top. **No gap.** This is the only DRV requirement whose entire content is two sentences — resist padding it; its value is its bluntness.

### DRV-05 — the destructive switch and the excluded classes

Four claims: the Automatic↔Manual switch replaces policies and destroys approvals/paused/declined (Q31); approved-always-wins across policies (Q32, Q32b); no assignment-filter support (Q33); Extension and Plug-and-Play drivers outside policy control (Q34, Q35, Q36). Q36b (no installed-driver inventory) belongs here too — it is why an admin cannot audit their way out of the previous four. **No gap; D-52's B-10 closed.**

⚠ **Scope note the planner must not blur.** Q31 is on the **Autopatch** page and is scoped to *"those groups and/or deployment rings"* — Autopatch-managed driver profiles. Q33 and Q34/Q36 are on the **Intune driver-policy** FAQ. DRV-05 packages them as one requirement; the guide should keep them attributed to their own surfaces rather than implying one page said all four.

### DRV-06 — Configuration Manager co-existence

The complete procedure is in §2.8: preamble, the preferred-path framing, the Windows-11 scoping note, six steps (four required, two optional), the undefined-state warning, the step-3 link target, the closing Update-Ring constraint, plus the policy's own page for the real GPO name, path and CSP nodes. **Every D-28 elision is closed and nothing was reconstructed.** Two findings beyond the requirement's text: Q46b's Device-Configuration-workload prerequisite on the optional steps, and the FAQ-vs-GPO naming divergence flagged after Q53. **No gap.**

### DRV-07 — the stub-and-move

In-repo only; §5.1 carries the re-measured coordinates. No external sourcing required.

---

## 4. Unresolved / Blocked

**Nothing is blocked. D-50's block-and-escalate branch does not fire.**

| Item | Status |
|---|---|
| `configure-driver-update-policy` re-fetch (D-47, the D-50 trigger) | ✅ **SUCCEEDED.** Rendered HTTP 200 (80,680 B) and source markdown HTTP 200 (29,935 B). `ms.date 2026-01-13`, `updated_at 2026-04-24`. DRV-03's never-Declined constraint confirmed verbatim at source `:218`. **The phase is not blocked and does not escalate.** |
| `driver-updates-faq` re-open (D-28, D-49) | ✅ **SUCCEEDED**, source YAML, all elisions closed |
| B-10 unsourced (D-52) | ✅ **CLOSED** — `driver-updates-faq` (Q34, Q36) + Autopatch corroboration (Q35) |
| DRV-01 `reporting` unsourced (D-52) | ✅ **CLOSED** — `monitor-driver-updates`, a page absent from the FEATURES Sources table |
| Autopatch FAQ + `wufb-wsus` as DRV-06's real sources (D-49) | ✅ **CONFIRMED**, both fetched, both `ms.date` recorded |
| AF-6 ranges (D-47) | ✅ **UPGRADED** from search-summary to first-party via `ref-update-ring-settings` |

**Genuine residue — items that could not be resolved, stated plainly rather than filled:**

| # | Item | Why unresolved | Disposition |
|---|---|---|---|
| U-1 | `MicrosoftDocs/windows-itpro-docs` source markdown | Repo is not publicly readable on any branch (`main`/`live`/`public` all 404; the GitHub API returns nothing). S6/S7/S8 quotes are therefore rendered-page-derived, **re-verified against raw HTML bytes** but not against doc-repo bytes | Acceptable. Label them `— rendered` in `**Source:**` provenance if the corpus tracks it; otherwise no action. Affects Q7, Q8, Q31, Q35, Q48–Q54 |
| U-2 | Whether the corpus ASCII-folds U+2019 / U+2011 in blockquoted first-party text | No existing convention found; not a question research can answer | **Planner must rule once.** Affects Q11, Q19, Q31 (U+2019) and Q18 (U+2011 in "Client‑side"). D-53's verifier diffs the strings, so an unruled fold is a late failure |
| U-3 | `01:177`'s *"automatic firmware delivery for OEM-published catalogs"* | Not unresolved — **resolved against the claim.** No first-party page supports it; Q12+Q21 contradict it | Correct during the move (§2.4). Do not carry the sentence |
| U-4 | The FAQ-vs-GPO name divergence for the scan-source policy | Both spellings are first-party and current; there is no third page adjudicating | Ship both, attributed (§2.8) |
| U-5 | `update-enterprise-supersedence` | Still search-summary-only. D-48 places it out of scope for 146 with no forward assignment | Unowned research-ledger item. Untouched by this pass |

---

## 5. Plan-Enabling Notes

### 5.1 Re-measured in-repo coordinates (HEAD `b37e63e2`)

`[VERIFIED: docs/operations/patch-management/01-windows-wufb-rings.md — read this session]`. **D-09's map is exact; re-verify at plan time per Claude's-Discretion, but the drift the review warned about is not present today.**

| Block | Line(s) | Verbatim opening | Disposition |
|---|---|---|---|
| Anchor | `:168` | `<a id="driver-firmware-policy"></a>` | RETAIN byte-identical |
| H2 | `:169` | `## Driver and Firmware Update Policy` | RETAIN byte-identical (D-11) |
| Blank | `:170` | — | — |
| Movable substance | `:171-178` (**8 lines**) | `:171` `Driver and firmware updates are configured **separately** from quality and feature update policy.` | MOVE to `06` — with the `:177` firmware correction (§2.4) |
| Blank | `:179` | — | — |
| Disambiguation | `:180-184` (**5 lines**) | `:180` `**This is NOT a ring** — neither a WUfB deployment ring nor an Autopatch ring. Treating` | RETAIN byte-identical |
| Blank | `:185` | — | — |
| Dual-scan section | `:186-213` | `:186` `**Dual-scan source conflict pitfall:** When SCCM co-management still controls the Windows Update` | RETAIN byte-identical — **D-06 frozen zone** |
| Blank | `:214` | — | — |
| Next H2 | `:215` | `## Related Resources` | — |

File is **231 lines** — D-09's figure confirmed. D-24's edit sites confirmed: `**Mitigation options (pick one):**` is at `:200`; mitigation item 3 runs `:207-210`; the fourth item appends after `:210`. Both sit **inside** the frozen zone, so append/substitute-in-place only.

`00-overview.md` D-55 sites confirmed: the driver bullet is `:84-88`, `:89` is blank and `:90` is a `**Source:**` line (with two more at `:92`, `:94`) — appending at `:90` would orphan a Phase-145 citation exactly as D-55 warns. The routing bullet is `:153-154`. The Related-Resources description is `:211-213`, and it does currently claim `01` carries *"the driver/firmware update policy surface"*, which the move falsifies.

### 5.2 Section-fill assessment for the two thin H2s

**`## Reporting` — no longer thin. Fill: comfortable.** D-37 flagged it "[no B-row exists]" and D-52 called it unsourced. `monitor-driver-updates` is a dedicated first-party page that supplies seven quotable elements (Q24–Q27c): three named reports with their admin-center paths, a worst-status-wins collapsing rule that is genuinely counter-intuitive and will save a reader a support call, an explicit six-status priority ordering, a stated drill-in limitation, a six-month retention rule, and the failure-report field list. That is more than enough for a substantive section, and the retention rule and the worst-status rule are the kind of content that justifies the guide existing.

**`## OEM Catalog and Firmware Delivery` — thin but viable, and better than X-7 alone.** X-7 supplies two of the seven quotes (Q22, Q23). The re-fetch added five more: how *recommended* status is conferred by the OEM (Q20), that firmware rides the *Other drivers* list (Q21), that only Windows-Update-published drivers are in scope (Q23b), that plug-in devices are covered when the OEM publishes (Q23c), and the **CHID exception** (Q19), which is the single most valuable new claim this pass produced and which appears in no research file in this repo. **Recommendation: the section is viable and should be built around the honest shape of the answer** — *the OEM catalog reaches you through Windows Update, firmware arrives as an Other driver requiring explicit approval, Windows Update may beat the vendor's own tool, and the policy will not honour the OEM's CHID targeting.* What the section **cannot** do is describe an OEM-catalog *integration* surface, because there is none; AF-5's Dell Repository Manager / HP Image Assistant / Lenovo Update Retriever are a parallel non-Intune channel and belong in the Unsupported callout beside AF-9, not here.

**`## Unsupported and Anti-Feature Callouts` is the fullest section, not the thinnest** — DRV-04 (Q29, Q30), the rollback absence (Q4, Q28b), no assignment filters (Q33), Extension/PnP (Q34–Q36), no installed-driver inventory (Q36b), CHID not enforced (Q19), LTSC unsupported (Q55), GCC-High/DoD absent (Q57), AF-9's manual packaging boundary (Q23b), and the immutable approval type (Q11). Ten bold sub-labels are available; D-41's no-new-`PITFALL-N` rule keeps them cheap.

### 5.3 Windows-version applicability (D-71) — sourced

`[SOURCED, fetched 2026-08-19]` The **policy surface is not Windows-11-only**:
- S7 `:204`: "You can manage driver and firmware profiles for **Windows 10 and later** devices."
- S4 `:11`: "These reports are applicable to **Windows 10 and Windows 11**."
- S3's platform include scopes by **edition** (Pro / Pro Education / Enterprise / Education, LTSC excluded — Q55), not by OS version.

**Only the Configuration Manager co-existence procedure carries the Windows-11 restriction** (Q39, verbatim: *"The following procedure is supported for Windows 11 devices"*), with a named Windows 10 alternative in the same note. D-71's one-sentence instruction is fully supported, and the Windows 10 fallback should ride with it since Q39 supplies it verbatim.

`applies_to: all` in frontmatter is correct and uniform with the five siblings (D-34); this is a **body-prose** statement, not a frontmatter one.

### 5.4 C11: the cheaper defence than keyword-riding (informs D-04)

D-04 requires the ConfigMgr H2 be named so an allowlisted keyword rides within ±200 chars of **every** C11 hit in the section. There is a strictly simpler route that sits inside Claude's Discretion:

**Do not fire the pattern.** C11's two relevant patterns are `\bSystem Center\b` and `\bSCCM\b[^.]*\bIntune\b`. **Every first-party source fetched this session says "Configuration Manager"** — the strings `SCCM` and `System Center` appear in none of Q37–Q47. A `06` that uses the first-party product name throughout matches neither pattern, so there is no hit to keep green and no ±200-char window to maintain across future edits. This is also the D-44-consistent choice (current product names in prose).

Belt-and-braces, still recommended: name the H2 so `co-management` rides anyway — e.g. something containing *"Configuration Manager co-management"* — because Q37's own preamble uses the phrase *"cloud attach or co-management"* verbatim, so the keyword arrives naturally in the section's first sentence rather than being planted. **Then do what D-04 says and verify by running the audit, never by reading the keyword list.** Expect `16/0`.

Note the asymmetry with `01`: `01:186` and `:191` **do** carry live `SCCM` hits and are frozen (D-06). `06` starting clean is not inconsistent with `01` staying as it is — one is frozen text, the other is new text.

### 5.5 `**Source:**` line inventory — D-54's "the move is thin in lines but not in sourcing work"

`[VERIFIED: docs/operations/patch-management/01-windows-wufb-rings.md:168-214 — read this session]` **zero** `**Source:**` lines exist in the moved range; the file's citations sit at `:38`, `:74`, `:99`, `:165`, `:166`. Every claim landing in `06` needs an evidence line authored from scratch. The bank above supplies **eight distinct pages** to cite. Minimum viable citation set, one per skeleton H2:

| H2 | Primary `**Source:**` | Secondary |
|---|---|---|
| What This Policy Does | S3 `manage-driver-updates` | S1 |
| Approval Modes | S1 `configure-driver-update-policy` | S7 |
| The Approval Workflow | S1 | S2 |
| Deferral and Deadline Behavior | S2 `driver-updates-faq` | S5 `ref-update-ring-settings` |
| OEM Catalog and Firmware Delivery | S2 | S1 |
| Reporting | S4 `monitor-driver-updates` | — |
| Configuration Manager co-existence | S2 | S6 `wufb-wsus` |
| Unsupported and Anti-Feature Callouts | S2 | S1, S3 includes, S7 |

Citation shape per the precedent at `docs/admin-setup-macos/10-kerberos-sso-extension.md:156`: `**Source:** [title](url) (updated YYYY-MM-DD)`. The **`updated_at`** column in §1 is the value that goes in `(updated …)` — that is what the siblings use (`01:165-166` cite `updated 2026-06-02` / `updated 2026-04-29`, both `updated_at` values, not `ms.date`). D-53 asks for "the `ms.date` observed at fetch time"; §1 records **both** for all eight pages, so either ruling is executable without a re-fetch.

⚠ **One live inaccuracy in a sibling.** `00-overview.md:94` cites `manage-driver-updates` and `driver-updates-faq` as *"both updated 2026-04-09"*. `[SOURCED]` `driver-updates-faq` is `updated_at 2026-04-09` ✅; `manage-driver-updates` is `updated_at 2026-04-09` ✅ — **the line is correct.** Recorded because it looked wrong against `ms.date` (2026-01-14) and a later agent will make the same check; the divergence is `ms.date` vs `updated_at`, not an error.

### 5.6 Baselines to carry into the PLAN (D-63)

Carry unchanged from CONTEXT and re-run once before commit 1 and once after commit 3: apex `check-phase-144` **101/0/0**, `v1.20-milestone-audit` **16/0**, `c17-eee-contract` **234/0**, `check-nav-hub-links` **0/0**, `check-phase-54` **32/0/0**, `build-publish-bundle --self-test` **15/0**, `build-filename-map --self-test` **8/0**. Per-commit gate is `check-phase-54.mjs` **plus** `v1.20-milestone-audit.mjs` (D-08) — `check-phase-54` alone is measurably blind to the C11 failure mode.

### 5.7 Anti-patterns for this specific phase

- **Relocating a wrong claim.** `01:177`'s firmware sentence is inside the movable block and reads plausibly. Moving it unchanged ships a first-party-contradicted claim into a brand-new guide in a milestone whose whole Pillar E exists to stop exactly that.
- **Citing B-5 to one page.** Its two halves are on two pages (§2.2). A single `**Source:**` line under both quotes is a fabricated attribution even though both quotes are real.
- **Reconstructing the elided steps.** They no longer need reconstructing — §2.8 has all six verbatim. If any future agent finds itself paraphrasing step 2 or 3, it has lost this file and should re-fetch, not recall.
- **Flattening the FAQ/GPO name divergence** (§2.8, U-4) — an admin searching the Group Policy editor for the FAQ's phrasing will not find it.
- **Treating `wufb-wsus` as a Windows-10-only page.** Q50's dual-scan statement is version-split, but the scan-source policy itself applies to "Window 10, version 2004 and above and Windows 11" (S6, the source's own typo).

---

## Assumptions Log

Claims in this file that are **not** backed by a page fetched this session or a file read this session.

| # | Claim | Section | Risk if Wrong |
|---|---|---|---|
| A1 | The corpus's `**Source:**` convention takes `updated_at` rather than `ms.date` in the `(updated …)` parenthetical | §5.5 | Low. Inferred from two sibling lines at `01:165-166` matching the `updated_at` values of their cited pages. §1 records both dates for all eight pages, so either ruling is executable |
| A2 | Firmware updates *always* require explicit approval because they appear on the *Other drivers* list | §2.4, §3 | Medium. Q12 and Q21 are both verbatim; the conjunction is a one-step inference, not a quoted sentence. **The guide should state the two sourced facts and let the reader draw the conclusion**, rather than quoting a sentence Microsoft did not write. This is the difference between correcting `01:177` and replacing it with a second unsourced claim |
| A3 | Naming the product "Configuration Manager" throughout `06` avoids C11 entirely | §5.4 | Low, and cheap to falsify — D-04 already mandates verifying by running the audit. The pattern literals are `[VERIFIED: 146-CONTEXT.md D-02]` and the absence of `SCCM`/`System Center` from Q37–Q47 is `[VERIFIED]` by reading the fetched sources |

Everything else in this file is `[SOURCED, fetched 2026-08-19]`, `[VERIFIED: <file> — read this session]` or `[MEASURED]` with the command named.

## Open Questions

**Both questions were RESOLVED by the orchestrator on 2026-08-19 before planning. Neither is open. This section is retained as the decision record.**

1. **U+2019 / U+2011 normalization in blockquoted first-party text** *(carried from U-2)* — **(RESOLVED)**
   - What we knew: at least four bank quotes carry non-ASCII typography from the source (Q11, Q18, Q19, Q31). D-53's verifier re-fetches and **diffs the quoted strings**.
   - The research recorded "no convention was found." **`[MEASURED 2026-08-19]` that was a false negative — the convention exists and is lopsided.** Distinct non-ASCII codepoint usage across `docs/**/*.md`:

     | Codepoint | Files |
     |---|---|
     | `—` U+2014 em dash | **278** |
     | `→` U+2192 | 103 |
     | `–` U+2013 / `§` / `≤` / `≥` / `×` | 133 / 94 / 44 / 34 / 25 |
     | **`’` U+2019 curly apostrophe** | **0** |
     | **`‑` U+2011 non-breaking hyphen** | **0** |

     Existing blockquotes carrying first-party-style quoted text use the straight ASCII `'`
     (e.g. `docs/admin-setup-8021x/03-windows.md:189`, `admin-setup-android/04-byod-work-profile.md:53`).
     278-files-to-0 is a convention, not an absence of one. **No validator anywhere in `scripts/`
     tests for non-ASCII**, so this is an editorial rule, not a gated one.
   - **RESOLUTION — fold exactly two codepoints, normalize both sides of the diff:**
     - `U+2019 → '` and `U+2011 → -` in every quoted string. **No other codepoint is folded** —
       em dashes, en dashes, arrows, `§`, `≤`, `≥` and `×` ship byte-verbatim from the source, as
       the corpus already does 6,455 times.
     - **D-53's verifier contract is amended to normalize both sides before diffing** (apply the
       same two-codepoint fold to the re-fetched page text, then compare). This is what keeps the
       fold from becoming the late verifier failure U-2 warned about: a normalized comparison is
       still a real comparison.
     - The PLAN states this rule once and the guide applies it uniformly.
   - Why not ship them verbatim: it would introduce the corpus's first two occurrences of both
     codepoints, against a 278/0 and 103/0 measured split, for no reader benefit.

2. **Whether the fourth mitigation item in `01` (D-24) names the co-existence section by anchor or by heading text** — **(RESOLVED)**
   - **RESOLUTION — by anchor**, adopting the research's own recommendation. `06`'s H2 anchor ids
     are Phase 148's cross-link contract (D-66), an own-line `<a id="..."></a>` is stable against
     the heading-text churn D-04 may still force on the co-existence H2, and it is `ring`-token-free
     either way. Verify with `check-phase-54` (**32/0/0**) and `v1.20-milestone-audit` (**16/0**)
     after the edit.

## Sources

### Primary (HIGH confidence — full page fetched this session, quoted verbatim)

- `learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy` — rendered + source markdown. `ms.date 2026-01-13` / `updated_at 2026-04-24`
- `learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq` — source YAML. `ms.date 2026-01-06` / `updated_at 2026-04-09`
- `learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates` (+ seven prerequisite includes) — source markdown. `ms.date 2026-01-14` / `updated_at 2026-04-09`
- `learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates` — source markdown. `ms.date 2026-01-12` / `updated_at 2026-04-29`
- `learn.microsoft.com/en-us/intune/device-updates/windows/ref-update-ring-settings` — source markdown. `ms.date 2026-01-12` / `updated_at 2026-04-09`
- `learn.microsoft.com/en-us/windows/deployment/update/wufb-wsus` — rendered, quotes re-verified against raw HTML. `ms.date 2025-04-01` / `updated_at 2025-10-02`
- `learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates` — rendered, re-verified. `ms.date 2025-03-31` / `updated_at 2025-06-04`
- `learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-faq` — rendered, re-verified. `ms.date 2026-05-28` / `updated_at 2026-05-28`

### In-repo (read this session)

- `.planning/phases/146-windows-driver-firmware-update-depth/146-CONTEXT.md` — all 72 decisions
- `.planning/REQUIREMENTS.md` — DRV-01..DRV-07 (`:41-47`), the Validator Constraints table, `:128`'s C11 row
- `.planning/research/FEATURES.md` — B-1..B-11, X-7, AF-5, AF-6, AF-9, F-5, the Sources table `:405-430`, the corrected quotation guarantee `:11`
- `.planning/research/PITFALLS.md` — C1-6 (`:296-345`), C1-7
- `docs/operations/patch-management/01-windows-wufb-rings.md` — `:165-215`
- `docs/operations/patch-management/00-overview.md` — `:84-95`, `:150-157`, `:209-215`
- `scripts/validation/check-phase-54.mjs` — `V-54-27` at `:437-470`
- `.planning/config.json` — `workflow.nyquist_validation: false` at `:8`

### Not used

No secondary or tertiary sources. **Nothing in this file rests on a WebSearch result, a search summary, or training memory.**

## Metadata

**Confidence breakdown:**

- **Quote bank: HIGH** — 60+ quotes, all fetched this session; six of eight pages read as doc-repo source bytes, the other two re-verified against raw HTML. Zero `[SOURCED, search-summary]` claims remain in Phase 146's content set.
- **Per-requirement coverage: HIGH** — all seven DRV requirements have sourced content behind every clause. No DRV clause is unsourced.
- **In-repo coordinates: HIGH** — every line number re-measured this session against HEAD `b37e63e2` and matches D-09/D-24/D-55.
- **Inferences: flagged, not smoothed** — three, all in the Assumptions Log; A2 is the only one that could reach shipped prose and it carries an explicit authoring instruction.

**Research date:** 2026-08-19
**Valid until:** 2026-09-18 (30 days). The two oldest pages are S6 (`updated_at 2025-10-02`) and S7 (`updated_at 2025-06-04`); S7 is the source for Q31, DRV-05's headline destructive-switch quote, and is the single quote most worth re-confirming at verification time.
