# Phase 148: Application Update Management & WinGet Routing - Research

**Researched:** 2026-08-23
**Measured at HEAD:** `a161a43c`
**Domain:** Microsoft first-party documentation for Windows Autopatch, Microsoft 365 Apps update
channels, Intune Enterprise App Management, the Microsoft Store app (new) type, and the
`DesktopAppInstaller` policy CSP — plus the in-repo validator surface that gates two new
`docs/operations/patch-management/` guides.
**Confidence:** HIGH on every clause of APP-01..APP-06 (all fetched live this session); MEDIUM only
where a Microsoft page contradicts itself and the honest output is the conflict, not an answer.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

The full decision set is `148-CONTEXT.md` D-01..D-76 and it is **authoritative over this file**. Where
this research contradicts a CONTEXT decision, that is flagged explicitly in
[Corrections to CONTEXT.md](#corrections-to-contextmd) below; nothing else here overrides CONTEXT.

The decisions that constrain research scope directly, copied verbatim in substance:

- **D-02 [OWNER-RULED 2026-08-23]** — `## Setting the Channel from Intune` is fetched, non-blocking,
  and dropped on failure. "Research attempts the fetch; if it succeeds the H2 ships, if it fails the
  H2 is **dropped and the absence stated**, and the phase proceeds."
- **D-03 [OWNER-RULED 2026-08-23]** — `00-overview.md:57`'s falsified hotpatch cell is left alone and
  filed as a v1.22 backlog item.
- **D-04 [OWNER-RULED 2026-08-23]** — `windows-autopatch-hotpatch-updates` joins the fetch list;
  Windows 11 Pro stays flagged unconfirmed. "Re-fetch and reject any copy carrying the stale tells
  `Build 26100.2033` or `an x64 (AMD/Intel) CPU`."
- **D-49 [REVERSED]** — `co-management/03-cocmgmt-migration-paths.md` is cross-linked and **NEVER
  edited**.
- **D-50** — "The two-versus-three workload question IS a real conflict, and it goes to research as a
  question, not to the corpus as an edit. … The answerable question is narrow: **is Office
  Click-to-Run Apps a documented Autopatch prerequisite?** `07` states whatever the fetch establishes,
  in its own voice, without touching `03`."
- **D-58** — the bounded fetch list of nine, with a stated failure policy for every item.
- **D-59** — "Retrieval is `curl` + tag-strip + literal grep for Microsoft Learn, not `gh api`. …
  Record `ms.date` **and** `updated_at` beside every quote."
- **D-61** — "Pin every quote by its surrounding heading, never by grep hit."
- **D-16** — American spelling in every heading and every line of body prose.
- **D-39** — the verbatim FAQ negative ships with its guardrail: "**Do not extend it, do not paraphrase
  it into something stronger, and do not attach a date or a rationale Microsoft did not give.**"
- **D-63 / D-64** — one standalone, line-start `**Source:** [Article title](url) (updated YYYY-MM-DD)`
  paragraph per corrected or quoted claim, placed *after* the claim; **a Source line may never span
  claims from different pages**.
- **D-69** — every prose negative carries a runnable grep in the PLAN's acceptance criteria.

### Claude's Discretion

Copied verbatim from CONTEXT.md:

> Prose wording throughout. The exact H2 names except `## Unsupported and Anti-Feature Callouts` (D-24,
> the pinned corpus literal) and the four §6-mapped WinGet subsection names (D-38). Which article titles
> are chosen for `**Source:**` lines. The insertion point for the `07`/`08` Related Resources entries
> within the Windows-contiguous block (D-52). The order of edits within each commit. Whether
> `PerpetualVL2021` is mentioned or omitted in D-26, provided the choice is deliberate. The exact phrasing
> of the seam statements in D-33, D-36 and D-37, provided each names the file it defers to.

### Deferred Ideas (OUT OF SCOPE)

Copied verbatim in substance from CONTEXT.md `<deferred>`:

- `00-overview.md:57`'s falsified hotpatch cell — owner-ruled to the v1.22 backlog (D-03).
- The Windows 11 Pro hotpatch eligibility question — carried forward flagged (D-04); no phase owns it.
- `co-management/03:76-78`'s pre-April-2025 Autopatch license parenthetical (D-49, D-51).
- `co-management/03:55`'s planning-ledger citation.
- The three-workload claim in `co-management/00-overview.md:118-131` and `02:28/:64/:144-146`.
- `docs/reference/macos-capability-matrix.md:70`'s WinGet conflation (D-43).
- `docs/operations/00-index.md:32`'s stale "4-platform comparison hub".
- The corpus-wide past-due population — 217 of 271 files.
- `docs/_glossary-windows` terminology additions.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description (condensed from `REQUIREMENTS.md`) | Research Support |
|----|-------------|------------------|
| APP-01 | `07-windows-autopatch.md` documents enrollment mechanics, `Test`/`Last`, Autopatch app updates and reporting; cross-links `co-management/03` and the disambiguation anchor, re-authoring neither | §Autopatch quote bank — the `windows-autopatch-prerequisites` licence/entitlement/workload block re-fetched live 2026-08-23; the containment position and workload SLOs carried from `STACK.md` §C-1 (not re-fetched — see the PREMISE ledger) |
| APP-02 | Autopatch entitlement necessary but not sufficient for Hotpatch; the two licence lists genuinely differ (Autopatch adds **VDA**, hotpatch adds **Windows 365 Enterprise**) | **Both lists re-fetched verbatim this session** from two different pages; the divergence is confirmed by direct comparison, and the D-04 stale-revision tells are absent |
| APP-03 | M365 Apps channels — Current (default, rollback "Not applicable"), Current Preview, Monthly Enterprise, SAEC, SAEC Preview, Beta (not supported); one channel per device, device-scoped, Teams and OneDrive outside | **Every clause verified verbatim** on `overview-update-channels` this session, plus a second independent six-channel enumeration on the Intune settings-catalog article |
| APP-04 | Enterprise App Management gates as hard as its licence; **all eight** limitations including malicious-version revocation; **and the positive** that catalog apps can be ESP/DPP blocking apps | **The eight limitations are exactly eight H4 headings** on the live page — extracted structurally this session, which is stronger evidence than either research ledger. SLOs, gates, FAQ negative and the Autopilot positive all verified verbatim |
| APP-05 | WinGet as routing and hardening; EAM explicitly not WinGet-based; the Store-app split (UWP/Win32, preview, ARM64 unsupported); the **absence** of any published cadence stated and contrasted | Store split, preview status, ARM64 and the suppression asymmetry all verified verbatim; **the cadence absence re-measured this session as a zero-hit grep on the live page** |
| APP-06 | `DesktopAppInstaller` CSP as control-not-patching, `SourceAutoUpdateInterval`, and the trap that Microsoft's two recommended policies are not in the settings catalog | CSP page re-fetched: **15 settings**, all six D-45 rows present; `SourceAutoUpdateInterval` and the registry key verbatim; **the "Not built in; use a custom configuration profile." trap verified verbatim on both policy rows** |

</phase_requirements>

---

## Summary

The three unknowns the ROADMAP flagged are all resolved, and one of them resolved *better* than the
phase assumed. **(1)** The Intune-side Microsoft 365 Apps update policy surface is documented — and
Microsoft has moved it: the article's canonical URL and its git source both now sit under
`device-configuration/settings-catalog/`, it was retitled *"Set the Microsoft 365 apps update channel
using the **settings catalog** in Microsoft Intune"*, and a companion page states plainly that the
Settings Catalog exposes **more** settings than the Administrative Templates profile type. So D-02's
conditional H2 **ships**; there is no absence to state. **(2)** The post-July-2026 Semi-Annual cadence
is still not answerable from Microsoft's own pages: both `overview-update-channels` and a dedicated
unification article remain future-tense about a date that passed seven weeks ago, and the comparison
table on the first still describes the old twice-yearly behaviour. D-27's ruling — ship the documented
conflict — stands, and now has a second first-party source and a concrete anchor (Version 2606,
`MC1274325`, and SAEC Version 2508 supported through **September 8, 2026**). **(3)** Win32 Store apps
are **still in preview** and ARM64 installers are **still unsupported**; SC#4's clause is safe, and the
"no published cadence" absence re-measured as a literal zero-hit grep.

Two Microsoft pages are internally inconsistent with themselves, and this phase must ship both
conflicts rather than resolve them. The SAEC one is already known. The second is new and answers D-50:
`windows-autopatch-prerequisites` **names exactly two** co-management workloads by name (Windows Update
policies, Device configuration) and then refers to *"the three workloads that Windows Autopatch
requires"* without ever naming a third. `Office` and `Click-to-Run` each occur **zero times** on that
page. So the narrow question D-50 posed has a clean answer — **Office Click-to-Run Apps is not a
documented Autopatch prerequisite on that page** — and `co-management/03:54-58`'s claim that the page
*"specifies all three workloads"* is falsified in its specific wording while `STACK.md` §C-1's two-workload
table row is correct.

The gates assert almost nothing (D-68 is confirmed by reading `check-phase-54.mjs:35` — `PATCH_FILES`
does not include the new files), and all nine baselines are green at `a161a43c`. The real risk in this
phase is not a red validator; it is a fabricated or mis-scoped quote. This file therefore ships a
**verbatim quote bank** keyed by requirement, every entry fetched this session with its `ms.date` and
its rendered `Last updated on` date recorded, so the author can copy rather than recall and the
verifier can diff rather than trust.

**Primary recommendation:** author both guides from the quote bank in §Verbatim Quote Bank, ship the
D-02 H2 (the fetch succeeded), and write the two internal-inconsistency findings — SAEC cadence and
the Autopatch workload count — as documented conflicts with both sides quoted, never as resolved facts.

---

## Corrections to CONTEXT.md

Three CONTEXT rows are superseded by live measurement. None reverses a decision; each changes what the
decision resolves to.

| # | CONTEXT row | What the fetch established | Effect on the plan |
|---|---|---|---|
| R-1 | **D-02 / D-58 (a)** — "never fetched by anyone"; failure policy = drop the H2 and state the absence | **The fetch succeeded.** Canonical article `intune/device-configuration/settings-catalog/update-office`, `ms.date 2026-04-30`, H1 *"Set the Microsoft 365 apps update channel using the settings catalog in Microsoft Intune"* | **`## Setting the Channel from Intune` SHIPS.** D-25's skeleton stays at **10 H2s / 8 anchors** for `08`; the 9-H2 fallback is dead. **16 anchors total across the two files, not 15.** |
| R-2 | **D-58 (h)** — winget-cli issue #5752 "still open and unanswered?" | Still **open**; **7 comments**, including a reply from `denelon`, a repo **COLLABORATOR**, on 2025-09-27. `WINGET-GAP.md` §2.2's *"no maintainer reply at fetch time"* is now stale | The "unanswered" framing must not be written. Recommendation: **do not cite the issue in the corpus at all** — it is third-party, D-47 bars naming projects, and the first-party `SOURCED (absence)` on `winget/index.md` carries the same conclusion without the dependency |
| R-3 | **D-50** — framed as "same page, two incompatible readings" between `03:54-58` and `STACK.md` §C-1 | The page **contradicts itself**, not just its two readers: it names two workloads and then says "three workloads". `Office` = 0 hits, `Click-to-Run` = 0 hits | `07` states the documented position (**two named**), notes that the page's own ConfigMgr section refers to three without naming the third, and does **not** assert Office Click-to-Run is or is not a prerequisite. `STACK.md` §C-1 needs no amendment; the 147 D-17 instrument is not fired |

---

## MEASURED / PREMISE ledger

Per `reference_measured_vs_premise_rows`: a reproducible-looking count is not evidence a premise is
true. Rows below are split by what was actually done **this session**.

### MEASURED — verified this session, 2026-08-23

**Live web (curl + tag-strip + literal grep, 12 pages; zero rendered-summary reliance):**

| Fact | Page | `ms.date` | `Last updated on` |
|---|---|---|---|
| Six M365 Apps channels; Current is the default; rollback "Not applicable"; one channel per device; device-specific; Teams/OneDrive outside; Beta not supported; `PerpetualVL2021` | `microsoft-365-apps/updates/overview-update-channels` | 2026-05-27 | 2026-05-27 |
| SAEC page still internally inconsistent (announcement future-tense; comparison table unrevised) | same | 2026-05-27 | 2026-05-27 |
| Channel unification article exists; still future-tense; Version 2606; `MC1274325`; 2508 supported through 2026-09-08 | `microsoft-365-apps/updates/unified-update-channels` | 2026-06-18 | 2026-07-15 |
| Intune surface = **settings catalog**; settings `Update Channel`, `Target Version`; role floor `Policy and Profile Manager`; six channel CDN GUIDs | `intune/device-configuration/settings-catalog/update-office` | 2026-04-30 | 2026-04-30 |
| Both Intune profile types work; "The Settings Catalog has more settings available"; full ODT↔GP setting-name map | `microsoft-365-apps/updates/configure-update-settings-microsoft-365-apps` | 2024-05-20 | 2026-06-23 |
| Intune **Administrative Templates** route with setting `Update Channel (2.0)`; `Office Automatic Updates 2.0` scheduled task; the channel-flipping trap | `microsoft-365-apps/updates/change-update-channels` | 2026-07-18 | 2026-07-18 |
| Win32 Store apps **still in preview**; ARM64 unsupported; UWP/Win32 split; two-core floor; paid apps unsupported; suppression asymmetry; **the two `DesktopAppInstaller` policies flagged "Not built in; use a custom configuration profile."**; settings-catalog leaf names for `DisableStoreOriginatedApps` and `AllowAppStoreAutoUpdate` | `intune/app-management/deployment/add-microsoft-store` | 2026-06-25 | 2026-06-25 |
| **No cadence published for Store apps** — `cadence\|interval\|hours\|schedule\|SLO\|how often\|frequen\|check for update` = **0 hits** on the whole page | same | 2026-06-25 | 2026-06-25 |
| EAM: the eight limitations are **exactly eight H4 headings**; gates; SLOs; FAQ negative; Autopilot ESP/DPP positive; standalone-or-Suite; Win32 exe/msi | `intune/app-management/deployment/enterprise-app-management` | 2026-06-03 | 2026-06-24 |
| Hotpatch licence list verbatim; **`26100.2033` = 0 hits, `x64 (AMD` = 0 hits** (D-04 stale tells absent); `Windows 11 Pro`/`Professional` = 0 hits | `windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates` | 2026-05-28 | 2026-06-02 |
| Autopatch licence list verbatim; **two** workloads named, "three workloads" referenced; `Office` = 0, `Click-to-Run` = 0 | `windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites` | 2026-02-26 | 2026-02-27 |
| `DesktopAppInstaller` CSP has **15** settings; all six D-45 rows present; `SourceAutoUpdateInterval` verbatim; registry key `Software\Policies\Microsoft\Windows\AppInstaller` | `windows/client-management/mdm/policy-csp-desktopappinstaller` | 2025-03-12 | 2025-03-12 |
| WinGet first-sign-in / per-user MSIX registration sentence unchanged; `## Administrator considerations` still covers only elevation and UAC | `windows/package-manager/winget/` | 2026-07-19 | 2026-07-19 |
| winget-cli issue **#5752** open, 7 comments, COLLABORATOR reply 2025-09-27 | `api.github.com/repos/microsoft/winget-cli/issues/5752` | — | 2026-03-20 |

**In-repo (files opened with `Read`/`sed` this session, at `a161a43c`):**

| Fact | Source of truth |
|---|---|
| `check-phase-54` **32/0/0** · `check-phase-53` **26/0/0** · `check-phase-59` **36/0/0** · `check-nav-hub-links` **0/0** · `c17-eee-contract` **234 files / 0 violations** · `v1.20-milestone-audit` **16/0** · apex `check-phase-144` **101 PASS / 0 FAIL / 0 SKIPPED** | executed |
| `PATCH_FILES = [OV, WIN, MAC, IOS, AND_];` — `07`/`08` are outside it (D-68 confirmed) | `scripts/validation/check-phase-54.mjs:35` |
| `V-54-29` strip chain, verbatim: `.replace(/^---\n[\s\S]*?\n---\n/, '')` · `.replace(/^\|.*\|.*$/gm, '')` · <code>.replace(/```[\s\S]*?```/g, '')</code> · `.replace(/\[.*?\]\(.*?\)/g, '')` · ``.replace(/`[^`\n]*`/g, '')`` — and `const banned = ["Hotpatch", "VBS", "MEETS_STRONG_INTEGRITY"];`. **No em-dash description strip, and `.` does not cross newlines** — both D-53 leaks confirmed by reading the code | `scripts/validation/check-phase-54.mjs:498-507` |
| C11 fallback patterns, verbatim: `'\\bSystem Center\\b'`, `'\\bSCCM\\b[^.]*\\bIntune\\b'`, `'\\bAutopatch rings\\b'`, `'\\bSafetyNet\\b[^.]*\\bcompliance\\b'` | `scripts/validation/v1.20-milestone-audit.mjs:572-577` |
| `c11_ops_patterns` is **absent** from the sidecar (keys are `schema_version, generated, phase, safetynet_exemptions, supervision_exemptions, cope_banned_phrases, c7_knox_allowlist, c9_exemptions, c11_ops_exemptions, c13_broken_link_allowlist, c13_rotting_external, c16_missing_endpoint_exemptions`) and `c11_ops_exemptions` is `[]` → **the fallback runs** (D-72 confirmed) | `scripts/validation/v1.20-audit-allowlist.json` |
| `01-windows-wufb-rings.md` has exactly **four** anchors: `:29 wufb-deployment-rings`, `:66 autopatch-disambiguation`, `:119 hotpatch`, `:170 driver-firmware-policy`. `ring-terminology` is at `00-overview.md:66` (D-05 confirmed) | grep `<a id=` |
| `#hotpatch` = **0** and `01-windows-wufb-rings.md#` = **0** corpus-wide — `07` establishes the first inbound `01` anchor link (D-06 confirmed) | grep |
| `05` = 484 lines / 10 H2 / 8 anchors / **0 fences** / 11 `**Source:**`; `06` = 792 lines / 10 H2 / 8 anchors / **0 fences** / 64 `**Source:**`. All seven `patch-management` files have **0** code fences (D-08, D-15, D-48, D-63 confirmed) | wc/grep |
| `## Unsupported and Anti-Feature Callouts` in **7 files**, **2** under `docs/operations/` (`05:382`, `06:664`) — D-24 confirmed, census unchanged | `grep -rn "^## Unsupported and Anti-Feature Callouts" docs/` |
| Worktree EOL: `00`-`04` **CRLF**, `05`/`06` **LF**; index LF throughout (D-56 confirmed) | `git ls-files --eol` |
| `00-overview.md` frontmatter: `last_verified: 2026-08-21` / `review_by: 2026-10-20` — exactly 60 days, zero slack (D-55 confirmed) | file head |
| `co-management/03`: `last_verified: 2026-04-27` / `review_by: 2026-06-26`; `<a id="autopatch-prerequisites"></a>` at `:33` (D-21, D-51 confirmed) | file |
| `06`: `<a id="driver-update-reporting"></a>` at `:455`, `## Reporting` at `:456` (D-22 confirmed) | file |
| Registry: **225** rows, **0** duplicate Titles, **0** rows pointing inside `docs/operations/`, **0** rows whose Title contains `Autopatch`/`Application Update`/`Windows App` (D-71, D-73 confirmed) | `docs/_registry/RE-index.md` |
| Canaries: `rows.length === 225,` at `build-filename-map.mjs:283` (all rows) and `'(a) Approved selection yields exactly 225 rows'` at `build-publish-bundle.mjs:520-523` (Approved only) — different sets, equal today (D-73 confirmed) | both files |
| The three D-43 reconciliation sites exist verbatim: `admin-setup-apv2/02-etg-device-group.md:129` *"Microsoft Store (WinGet)"*, `03-device-preparation-policy.md:141` *"Microsoft Store (WinGet only)"*, `reference/macos-capability-matrix.md:70` *"Yes (Windows Package Manager)"*. Corpus-wide `winget` (case-insensitive) = **2 hits**, both in apv2 | grep |
| `docs/recipes/01-shared-windows-avd-client.md:81` — `2. **App type**: **Microsoft Store app (new)** > **Select**.` (D-43 confirmed) | file |
| `co-management/03:54-58` reads *"The current Microsoft Learn Autopatch prerequisites page (updated 2026-02-26) specifies all three workloads including **Windows Update Policies**."* — the claim R-3 falsifies | file |
| `.planning/config.json` has `"nyquist_validation": false` → the Validation Architecture section is omitted from this file by contract | file |

### PREMISE — carried from CONTEXT.md / research ledgers, NOT re-verified this session

Label these clearly if they reach the corpus; each needs its own fetch before it is quoted.

- Autopatch **ring model** details — `Test`/`Last` cannot be removed or renamed, at least two rings,
  up to 15 rings per group, up to 300 groups per tenant, Dynamic/Assigned distribution.
  Source: `STACK.md` §C-1, citing `windows-autopatch-groups-overview` (`ms.date 2025-06-17`). **Not
  re-fetched.** This is APP-01's core content and D-14 makes it `07`'s own material — **fetch
  `windows-autopatch-groups-overview` in Plan 1 before writing this section.**
- The **containment sentence** (an Autopatch group is a container that includes `Update rings policy
  for Windows 10 and later`) — same page, same status. D-20 makes it the load-bearing citation and
  D-74 hands it to Phase 151. **Fetch it.**
- The **workload service objectives** — 95% quality / 90% MEC / Edge Stable / Teams standard channel.
  Source: `STACK.md` §C-1 citing `windows-autopatch-overview` (`ms.date 2026-07-13`). **Not
  re-fetched.** D-37 makes the MEC figure structurally load-bearing for the `07`↔`08` seam. **Fetch it.**
- The **April 2025 feature-activation removal** and the tiered entitlement table. The entitlement table
  *was* seen this session on `windows-autopatch-prerequisites` (Business Premium / A3+ / E3+ / F3
  columns, `Releases`/`Update rings`/`Quality updates`/`Feature updates` rows all ✔️), but the
  "April 2025" date and the support-request exclusivity were **not** re-verified.
- The **Autopatch reporting surface list** (Hotpatch quality update report, Autopatch alerts and
  remediation, Autopatch groups membership report, Message center). Source: `STACK.md` §C-1. **Not
  re-fetched.** APP-01 requires it. **Fetch it.**
- The **Autopilot device-preparation** quote *"The PowerShell script should also be configured to run in
  the **System** context…"* and *"**Microsoft Store** - only Microsoft Store apps that support WinGet
  are supported."* Source: `WINGET-GAP.md` §1.6 / §2.2. **Not re-fetched**, and D-43 makes the second
  one the anchor of the whole reconciliation. **Fetch it.**
- The **`winget configure`** page facts (`ms.service: dev-environment`, `ms.date 2024-11-21`, partial
  success by design, no Intune/MDM mention). Source: `WINGET-GAP.md` §2.3. **Not re-fetched.** D-40
  needs only one sentence plus a kill-switch row, so this is low-cost either way.
- The **remaining nine** `DesktopAppInstaller` setting descriptions. The 15 heading names were verified;
  the per-setting prose for the five rows other than `SourceAutoUpdateInterval` was **not** re-read.
  D-45 ships six rows — **re-read the five before quoting any of their text.**

---

## The three ROADMAP-flagged unknowns — resolved

### Unknown 1 — the Intune-side Microsoft 365 Apps update policy surface — **RESOLVED, and the H2 ships**

**Answer: the Settings Catalog. Microsoft moved the article into `settings-catalog/` and retitled it
around the settings catalog; the Administrative Templates route still works and is still documented,
and one page says outright that the Settings Catalog carries more settings.**

Three first-party pages, all fetched 2026-08-23, and they form a coherent (if slug-confusing) picture.

**(a) The current, recommended surface — Settings Catalog.**

Canonical URL `https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/update-office`
(`ms.date 2026-04-30`, `Last updated on 2026-04-30`). Git source:
`MicrosoftDocs/memdocs-pr/blob/live/intune/device-configuration/settings-catalog/update-office.md`.

> **The decoy to avoid.** The URL the corpus would naturally reach for —
> `.../intune/intune-service/configuration/administrative-templates-update-office` — still returns 200
> but **redirects** to the canonical settings-catalog path, and
> `change-update-channels` still links it under its **old** title *"Use Update Channel and Target
> Version settings to update Microsoft 365 with Microsoft Intune Administrative Templates"*. Cite the
> canonical URL. I verified the canonical page's stripped body is **byte-identical** to the redirected
> one, so this is a rename, not two articles. (I also probed a plausible-looking
> `settings-catalog-update-office` slug; it does **not** serve this article. Do not guess Learn slugs.)

Verbatim, in heading order:

- H1: *"Set the Microsoft 365 apps update channel using the settings catalog in Microsoft Intune"*
- Intro: *"In Intune, use the settings catalog to update Microsoft 365 apps on your Windows devices,
  including setting the update channel."*
- Role floor: *"To configure the settings catalog policy, at a minimum, sign in to the Intune admin
  center with the **Policy and Profile Manager** role."*
- Under *Set the Microsoft 365 update channel in the Intune settings catalog*: *"In your settings
  catalog policy, search for **Update Channel**, and select it. Close the settings picker."* and *"Set
  the **Update Channel** to **Enabled** and select the channel name."*
- Under *Step 1: Force the Office version to update*: *"In your settings catalog policy, search for the
  **Target Version** setting, and close the settings picker."*
- Verification path (Intune ADMX namespace): `Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\Providers\<Provider ID>\default\Device\office16v2~Policy~L_MicrosoftOfficemachine~L_Updates`,
  value `L_UpdatePath`.
- Verification path (Office side): `Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\ClickToRun\Configuration`,
  keys `UpdateChannel` and `CDNBaseUrl`.
- *"This registry key updates when the Task Scheduler > **Office Automatic Updates 2.0** runs, or when a
  user signs into the device. … Depending on your triggers, it can take at least a day and more before
  the `UpdateChannel` registry key updates."*
- The page lists six channel CDN GUIDs — **an independent second enumeration of APP-03's six channels**:
  Current `492350f6-…`, Current (preview) `64256afe-…`, Monthly Enterprise `55336b82-…`, Semi-Annual
  Enterprise `7ffbc6bf-…`, Semi-Annual Enterprise (preview) `b8f9b850-…`, Beta `5440fd1f-…`.

*Observed but not interpreted:* the same page uses `office16v2~Policy~…` in the Update Channel
verification step and `office16~Policy~…` (no `v2`) in the Target Version step. Do not reproduce both
namespaces as if the difference were explained; the page does not explain it. If a namespace is
quoted at all, quote one, cite the step it came from, and say no more.

**(b) The relationship between the two Intune profile types.**

`https://learn.microsoft.com/en-us/microsoft-365-apps/updates/configure-update-settings-microsoft-365-apps`
(`ms.date 2024-05-20`, `Last updated on 2026-06-23`), verbatim:

> *"The Administrative Template for Office imported into Intune is the same as the one used in an
> on-premises environment. You can use an Intune configuration profile to configure the update settings
> for Microsoft 365 Apps. There are two ways to create in Intune such a configuration profile: using an
> "Administrative templates" profile type or the Settings Catalog. **The Settings Catalog has more
> settings available than the "Administrative templates" profile type.**"*

That page also carries the full setting-name map an admin sees. Verbatim rows:

| Update setting | Office Deployment Tool setting | Group Policy setting (on-premises or Intune) |
|---|---|---|
| Set updates to occur automatically | `Enabled` | Enable automatic updates |
| Specify a location to look for updates | `UpdatePath` | Update path |
| Specify the version of Microsoft 365 Apps to update to | `TargetVersion` | Target version |
| Set a deadline by when updates have to be applied | `Deadline` | **Update deadline** |
| Hide update notifications from users | *"You can't configure this setting by using the Office Deployment Tool."* | Hide update notifications |
| Hide the option to enable or disable Office automatic updates | *(same)* | Hide options to enable or disable updates |
| Set deferral periods for Office automatic updates | *(same)* | Delay downloading and installing updates for Office |

Also verbatim from that page: *"In most cases, you use either the Office Deployment Tool or Group
Policy, not both, to configure update settings. If you do use both to configure a setting, the Group
Policy setting overrides the setting configured by the Office Deployment Tool."* and the on-premises GP
path `Computer Configuration\Policies\Administrative Templates\Microsoft Office 2016 (Machine)\Updates`.

**(c) The Administrative Templates route, still documented and still current.**

`https://learn.microsoft.com/en-us/microsoft-365-apps/updates/change-update-channels`
(`ms.date 2026-07-18` — the freshest page in the set), verbatim under
*"Change the update channel with Microsoft Intune Administrative Templates"*:

> *"Use administrative templates for Windows 10 and newer in Microsoft Intune to enable the setting
> **Update Channel (2.0)** and select the new channel. The policy setting is under `Computer
> Configuration\Microsoft Office 2016 (Machine)\Updates`."*

Note the setting name differs from the settings-catalog one: **`Update Channel (2.0)`** here versus
**`Update Channel`** in the settings catalog. Do not collapse them.

Two operationally sharp facts from the same page, both worth a callout:

> *"Before you begin, make sure the scheduled task "**Office Automatic Updates 2.0**" is enabled on the
> client devices. This task, which updates the assigned channel, is a required part of managing updates
> for Microsoft 365 Apps, whether you use Group Policy, the Office Deployment Tool, Configuration
> Manager, or Microsoft Intune."*

> *"If you are deploying Microsoft 365 Apps with Intune using the **Microsoft 365 Apps for Windows 10
> and later** app, the channel you select will be re-evaluated and enforced during policy refresh. It is
> recommended that any update channel policies in your environment match the channel selection for your
> app assignment. If the channels do not match, this will cause **unexpected channel flipping** when all
> of the following circumstances apply:"* — deploying via the *Microsoft 365 Apps for Windows 10 and
> later* app, the app configured using the **Configuration designer**, and the app assigned as
> **required**.

The channel-flipping trap is the single best piece of content in this section: it is Autopilot-adjacent,
it is a real misconfiguration an admin will hit, and it is first-party. Recommend it leads the H2.

**Planner instruction.** D-02's fetch **succeeded**. Ship `## Setting the Channel from Intune` with all
three surfaces named and dated, the settings-catalog one presented as current, the channel-flipping
trap called out, and a `**Source:**` line per page (never one spanning the three — D-64).

> **Note the governing-document conflict D-02 recorded is still real and still unresolved by this
> research.** `REQUIREMENTS.md:139-140` parks this surface under `## Future Requirements`; `ROADMAP.md:152`
> names it under Phase 148. The owner ruled the fetch non-blocking either way and the fetch succeeded,
> so the H2 ships — but the parked `## Future Requirements` bullet is now stale and no phase owns
> striking it. Record it in the backlog rather than editing `REQUIREMENTS.md` outside this phase's blast
> radius.

**D-60's JS-rendering contingency did not fire.** `145-VERIFICATION.md:99` warned that Intune
settings-catalog reference tables render client-side. That is true of the *settings reference* tables,
but this article is prose plus static tables and `curl` read it fine. The contingency is retained for
item (g) below — which also did not need it.

---

### Unknown 2 — post-July-2026 Semi-Annual Enterprise Channel cadence — **UNRESOLVABLE FROM MICROSOFT'S PAGES; SHIP THE CONFLICT**

**Answer: neither "the change landed" nor "the change is upcoming" is supportable. Both pages remain
future-tense about a date that passed on 2026-07-14, and the comparison table on the primary page still
describes the old behaviour. D-27's ruling stands unchanged and is now double-sourced.**

**Page 1 — `overview-update-channels`** (`ms.date 2026-05-27`, `Last updated on 2026-05-27`).
Both sides, verbatim, pinned by their surrounding heading per D-61:

*Top-of-page Important notice (before the first H2):*

> *"Update Channel Changes Coming July 2026"*
> *"Microsoft is making significant changes to update channels beginning July 2026."*
> *"Semi-Annual Enterprise Channel will receive feature and security updates monthly, on the same basis
> as Monthly Enterprise Channel"*

*Under `## Semi-Annual Enterprise Channel overview`:*

> *"Beginning July 2026, Semi-Annual Enterprise Channel **will** begin receiving monthly feature and
> security updates. Rollback to prior feature releases with security updates **will be** available for 2
> months."*

*Under `### Support duration for Semi-Annual Enterprise Channel`:*

> *"Any given version of Semi-Annual Enterprise Channel is supported for 8 months. Semi-Annual
> Enterprise Channel versions will continue to release in January and July using the most recent
> available fork. There is no longer a commitment to a specific fork ahead of time."*
> *"Beginning July 2026, feature releases for Semi-Annual Enterprise Channel **will be** supported for 1
> month. A 2-month rollback period **will be** available, allowing devices to revert to the previous
> feature release with security updates, resulting in an effective 3-month support window."*

*Under `### Feature updates for Semi-Annual Enterprise Channel`:*

> *"New, or updated, features are released in Semi-Annual Enterprise Channel **twice a year, on the
> second Tuesday in January and July**. New features aren't added to Semi-Annual Enterprise Channel at
> any other time."*

*In the `## Comparison of the update channels for Microsoft 365 Apps` table, Semi-Annual Enterprise
Channel column:* `Feature updates` = *"Twice a year (in January and July), on the second Tuesday of the
month"*; `Support duration for a given version` = *"Eight months (Beginning July 2025; previously
fourteen months)"*; `Rollback support` = *"Two months"*.

So the page carries a monthly-cadence announcement and a twice-yearly description simultaneously, in
four places, on 2026-08-23.

**Page 2 — `unified-update-channels`** (`ms.date 2026-06-18`, **`Last updated on 2026-07-15`**). This
article did not exist in `STACK.md` §C-3's record and is the better citation for the announcement
itself. Verbatim:

> *"The information in this article applies to: **MC1274325** Upcoming change: Microsoft 365 Apps SAEC
> and MEC will unify"*
> *"Beginning with the **Version 2606** update release in July 2026, Microsoft **will unify** Semi-Annual
> Enterprise Channel and Monthly Enterprise Channel into a single enterprise-focused channel for
> Microsoft 365 Apps."*
> *"Devices currently configured for Semi-Annual Enterprise Channel receive the same feature and security
> updates as devices on Monthly Enterprise Channel, beginning with the Version 2606 update release."*
> *"After Version 2606 or later is installed, devices show as Monthly Enterprise Channel in Microsoft 365
> Apps experiences, including the File > Account backstage view."*
> *"Depending on the management tool, reporting for Microsoft 365 Apps may show as Semi-Annual Enterprise
> Channel or Monthly Enterprise Channel after Version 2606 is installed. **Devices with build numbers
> higher than 20131.20000 have successfully installed Version 2606.**"*
> *"Existing supported update policies continue to be respected. No policy migration or admin action is
> required for the July update to apply."*
> *"Can our organization stay on Semi-Annual Enterprise Channel until September?" — "Yes. If your
> organization needs more time to prepare, Semi-Annual Enterprise Channel **Version 2508 is supported
> through September 8, 2026**. To stay on Version 2508 after the July release, you must configure your
> update management tools to prevent devices from receiving Version 2606."*

This page was **updated on 2026-07-15** — one day after the second Tuesday of July 2026 — and is still
written in the future tense. That is a stronger observation than "the page has not been revised": it was
revised, *after* the stated cutover, and left future-tense.

**Planner instruction — write it exactly this way:**

1. State the announcement with **its own date and its own tense**, attributed to `unified-update-channels`
   and its message-center ID `MC1274325`. Do not convert `will unify` to `unified`.
2. State that the `overview-update-channels` comparison table and its Feature-updates section **still
   describe the twice-yearly behaviour**, quoting both.
3. State plainly that **neither reading is supportable from Microsoft's pages as of 2026-08-23**, and
   that the corpus is describing the documentation's state, not the service's.
4. Give the reader the one **checkable** discriminator Microsoft did publish: *"Devices with build
   numbers higher than 20131.20000 have successfully installed Version 2606."* An admin can answer the
   question on their own fleet even though the docs cannot.
5. Include the `Version 2508 supported through September 8, 2026` escape hatch — it is the only dated,
   actionable, unambiguous fact in the whole area.
6. Per `145-CONTEXT.md` D-08, attribute the twice-yearly description to **the page**, never to Microsoft
   as a present-tense claim about the service.

Do **not** write a countdown, a deadline table row, or a "the change has landed" sentence. Two Source
lines, one per page (D-64).

---

### Unknown 3 — have Win32 Store apps left preview? — **NO. SC#4's clause is safe.**

**Answer: still in preview, stated twice on the page; ARM64 still unsupported; no cadence or SLO
published — re-measured as a zero-hit grep.**

`https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store`
(`ms.date 2026-06-25`, `Last updated on 2026-06-25`). Fetched via the `store-apps-microsoft` alias,
which redirects here; git source `memdocs-pr/blob/live/intune/app-management/deployment/add-microsoft-store.md`.

*Under the `## Add Microsoft Store Apps to Microsoft Intune` intro Important block:*

> *"Win32 store apps are supported (in preview)"*

*Under `### Microsoft Store Win32 apps`:*

> *"Win32 apps that are in the Microsoft Store are **currently in preview**. Not all Win32 apps will be
> available or searchable. The Win32 apps that are in preview will be identifiable with Win32 and a
> banner."*

*Under `## Unsupported functionality for Microsoft Store apps`:*

> *"Microsoft Store apps don't support the following features:"*
> *"Any app that has an **ARM64** installer isn't supported."*

Note: the unsupported list has **exactly one** bullet. Do not write "among the unsupported features" as
if there were several.

**The cadence absence — re-measured, not inherited.**
`grep -i "cadence\|interval\|hours\|schedule\|SLO\|how often\|frequen\|within 24\|check for update"`
over the entire stripped page returns **0 matches**. The page says *that* apps are kept up to date and
never says *when*. This is a `SOURCED (absence)` in the strongest available form and it is what SC#4
requires be stated **and contrasted** against EAM's published SLOs (which are quoted below and are
themselves explicitly *"guidelines, not guarantees"*).

**The split, verbatim, both halves:**

> *"**UWP apps are kept up to date by the Store.** The UWP app will stay up to date with or without
> Intune assignment once it is installed, unless the Store policy is set to block auto-update."*

> *"**Microsoft Store Win32 apps are kept up to date by Intune**, therefore in order for the app to be
> updated it must be assigned in Intune. **App updates are not affected by the Store's update
> policies.**"*

**The suppression asymmetry, verbatim:**

> *"Doesn't affect the Microsoft Store's ability to automatically update UWP apps. As long as the **Turn
> off Automatic Download and Install of updates** (`AllowAppStoreAutoUpdate` CSP) policy isn't enabled,
> the Microsoft Store automatically updates UWP apps."*

> *"For Win32 Store apps, if **Turn off Automatic Download and Install of updates** is set, then the
> Win32 apps with an active Intune assignment are still automatically updated."*

**Two further constraints, verbatim:**

> *"Client devices must support **at least two core processors** to successfully install and run
> Microsoft Store apps."*

> *"The app is a **paid app**, which is not supported."* (one of three listed reasons an app doesn't
> appear when searching within Intune)

---

## Secondary verifications

### The eight Enterprise App Management limitations — **exact, and better sourced than either ledger**

`https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management`
(`ms.date 2026-06-03`, `Last updated on 2026-06-24`). Extracted **structurally** — every `<h4>` under
the `<h3>` *"Limitations and known issues"* — so the count is a property of the page, not of a reader.

There are **exactly eight**, in this order:

| # | Heading (verbatim) | Anchor id |
|---|---|---|
| 1 | No rollback or automatic uninstall remediation | `no-rollback-or-automatic-uninstall-remediation` |
| 2 | Malicious version revocation | `malicious-version-revocation` |
| 3 | Catalog cache lag | `catalog-cache-lag` |
| 4 | No rollout rings or phased deployment | `no-rollout-rings-or-phased-deployment` |
| 5 | Reporting reflects latest state only | `reporting-reflects-latest-state-only` |
| 6 | Version changes during device processing | `version-changes-during-device-processing` |
| 7 | Not supported as a blocking app in ESP or Autopilot device preparation | `not-supported-as-a-blocking-app-in-esp-or-autopilot-device-preparation` |
| 8 | Conflicts with other app types | `conflicts-with-other-app-types` |

**D-29 is correct and is now confirmed at the source.** `FEATURES.md:97` matches the live page; `STACK.md`
§C-4's twelve-bullet list is a *superset* that folds several FAQ facts into the limitation list and, as
D-29 warned, does not carry *"Version changes during device processing"* as its own item. **Prefer the
live page's eight headings over either ledger** — they are the definition of "all eight", and using them
as the guide's own bold sub-labels makes SC#3 mechanically checkable.

Bodies of the two that APP-04 names explicitly, verbatim:

> **Malicious version revocation** — *"If Microsoft detects a malicious app version in the Enterprise App
> Catalog, Microsoft removes the app from the catalog and posts a notification in the Microsoft Intune
> admin center. **You're still responsible for identifying impacted devices and taking remediation
> action.**"*

> **Catalog cache lag** — *"Enterprise App Catalog data is cached for up to one hour, so the catalog might
> show an outdated version during that window. If a version is revoked because of a security issue,
> devices can remain exposed for up to one hour before the updated catalog state is reflected."*

### The `DesktopAppInstaller` settings-catalog trap — **live, verbatim, on both rows**

Same Store-apps page, under *"Common Store policy settings and their impact on Microsoft Store apps"*.
Both rows verbatim (the *Intune* column is the third column; the value quoted is that cell):

| Policy heading | CSP | Intune column |
|---|---|---|
| **Enable App Installer Microsoft Store Source policy** — *"Recommended values: Not configured or Enabled. To prevent end users from blocking or turning off this feature, set the value to Enabled."* | `DesktopAppInstaller/EnableMicrosoftStoreSource` | *"**Not built in; use a custom configuration profile.**"* |
| **Enable App Installer policy** — *"Recommended values: Not configured or Enabled. To prevent end users from blocking or turning off this feature, set the value to Enabled."* | `DesktopAppInstaller/EnableAppInstaller` | *"**Not built in; use a custom configuration profile.**"* |

Both also carry Group policy = `Administrative Templates > Windows Components > Desktop App Installer`.
**D-46 is confirmed exactly**: Microsoft recommends enabling two policies, in its own Store-app
deployment article, that Intune does not surface in the settings catalog.

**This also discharges D-58 item (g) without needing the JS-rendered settings-catalog reference.** The
same table gives the settings-catalog leaf names directly:

| CSP | Settings Catalog leaf (verbatim) |
|---|---|
| `ApplicationManagement/DisableStoreOriginatedApps` | `Microsoft App Store > Disable Store Originated Apps` |
| `ApplicationManagement/AllowAppStoreAutoUpdate` | `Microsoft App Store > Allow apps from the Microsoft app store to auto update` |
| `ADMX_WindowsStore/RemoveWindowsStore_1`, `_2` | `Windows Components > Store > Turn off the Store Application` |

One more verbatim carve-out from that section, which belongs in the routing H2 because it is exactly the
kind of sentence that seeds the WinGet conflation:

> *"The Windows Package Manager command-line tool `winget.exe` is **not affected by** this policy."*
> (of **Turn off the Store application**)

> *"Using the **Only display the private store within the Microsoft Store app** policy
> (`RequirePrivateStoreOnly` CSP) is still valid. This policy: Blocks end user access to the Microsoft
> Store. **Allows the Windows Package Manager `winget` command line interface (CLI) access to the
> Microsoft Store.** So, it's not the preferred choice to prevent end user access to the Microsoft
> Store."*

**D-61's decoy warning is confirmed live:** every `winget` mention on this page is a policy carve-out
saying `winget.exe` **escapes** Store lockdown. A naive grep for `winget` on this page returns exactly
the hits that invite the conclusion APP-05 bars.

### Hotpatch and Autopatch licence lists — the APP-02 deliverable, both sides re-fetched

**Autopatch** — `windows-autopatch-prerequisites`, under `## Licenses and entitlements`, verbatim:

> *"Windows Autopatch is available to the following licenses:"*
> - *Microsoft 365 Business Premium (for more information on available licenses, see Microsoft 365 licensing)*
> - *Windows 10/11 Education A3 or A5 (included in Microsoft 365 A3 or A5)*
> - *Windows 10/11 Enterprise E3 or E5 (included in Microsoft 365 F3, E3, or E5)*
> - ***Windows 10/11 Enterprise E3 or E5 VDA***
>
> *"For more details on licensing requirements for hotpatching, see Hotpatch prerequisites."*

**Hotpatch** — `windows-autopatch-hotpatch-updates`, under `## Prerequisites`, verbatim:

> *"One of the eligible licenses: Windows 11 Enterprise E3 or E5, **Microsoft 365 F3**, Windows 11
> Education A3 or A5, Microsoft 365 Business Premium, or **Windows 365 Enterprise**"*

**The difference is the deliverable, and it survives direct comparison.** Autopatch's list carries
**Windows 10/11 Enterprise E3 or E5 VDA**, which the hotpatch list omits; the hotpatch list carries
**Windows 365 Enterprise**, which the Autopatch list omits. The hotpatch list is also
**Windows 11-only** where Autopatch's is Windows 10/11. Three genuine differences, not one.

**D-04's stale-revision tells are absent.** `26100.2033` = 0 hits; `x64 (AMD` = 0 hits. The copy read
this session is current. `PITFALLS.md` C1-9's incident cannot recur on this revision.

**D-04's Windows 11 Pro flag stands.** `Windows 11 Pro` = 0 hits and `Professional` = 0 hits on the
hotpatch page. The page names an H2 *"Hotpatch on Windows 11 Enterprise or Windows Server 2025"* and
states the prerequisite as a **licence list**, never an edition list. It neither supports nor refutes
Pro eligibility. Write it flagged unconfirmed, mirroring `01:144-145`, exactly as D-04 directs.
`STACK.md` §C-2's `UNVERIFIED` plan-time task is **not** discharged.

### D-50 — is Office Click-to-Run a documented Autopatch prerequisite? — **NOT ON THAT PAGE**

`windows-autopatch-prerequisites` (`ms.date 2026-02-26`, `Last updated on 2026-02-27`). Measured:
`Office` = **0 occurrences**; `Click-to-Run` = **0 occurrences**.

The page names workloads in exactly two places, and they disagree with each other on the count.

*In the general prerequisites table, Device management row:*

> *"At a minimum, the **Windows Update** and **Device configuration** workloads must be set to Pilot
> Intune or Intune."*

*Under `## Configuration Manager co-management requirements`:*

> *"Must have the following co-management workloads enabled and set to either Intune or Pilot Intune:
> **Windows Update policies workload** / **Device configuration workload**"*
> *"If you're using Pilot Intune, in the Staging tab, the device must be in the collections that
> correspond to **the three workloads that Windows Autopatch requires**."*
> *"If you selected Intune for one workload and Pilot Intune for the other two workloads, your devices
> only need to be in the two Pilot Intune collections."*

The "co-management requirements for Windows Autopatch" link on that page is a **self-bookmark** to the
section above — there is no second page to consult. So the third workload is referenced and never named
anywhere in Microsoft's Autopatch prerequisites documentation.

**Planner instruction.** `07` states the documented position in its own voice: **two workloads are
named** — Windows Update policies and Device configuration — and the page's own ConfigMgr section refers
to three without naming the third. Do **not** assert that Office Click-to-Run Apps is a prerequisite,
and do **not** assert that it is not. Do **not** touch `co-management/03` (D-49). File `03:54-58`'s
falsified wording to the backlog with this measurement attached. `STACK.md` §C-1 needs no amendment —
its two-workload table row matches the page — so the 147 D-17 amendment instrument is not fired.

### Item (h) — winget-cli #5752 — **stale framing, recommend dropping the citation**

Open; created 2025-09-26; **7 comments**; last activity 2026-03-20. The second comment is from
`denelon`, `author_association: COLLABORATOR`. `WINGET-GAP.md` §2.2's *"with **no maintainer reply** at
fetch time"* is no longer true, and §2.2's evidential argument (*"its evidential value is that the
request exists and is unanswered"*) no longer holds in that form.

Recommendation: **do not cite the issue in `08` at all.** It is third-party, D-47 bars naming projects,
and the first-party `SOURCED (absence)` on `winget/index.md` — verified fresh below — carries D-41's
whole conclusion without it.

### D-41's SYSTEM-context root cause — re-verified, and the page is fresher than the ledger

`https://learn.microsoft.com/en-us/windows/package-manager/winget/` (`ms.date 2026-07-19`,
`Last updated on 2026-07-19` — newer than `WINGET-GAP.md`'s read). The sentence is unchanged:

> *"The WinGet command line tool is only supported on Windows 10 version 1809 (build 17763) or later.
> **WinGet will not be available until you have logged into Windows as a user for the first time,
> triggering Microsoft Store to register the Windows Package Manager as part of an asynchronous
> process.** If you have recently logged in as a user for the first time and find that WinGet is not yet
> available, you can open PowerShell and enter the following command to request this WinGet
> registration: `Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe`."*

And the framing sentence, which is new relative to the ledger and worth having:

> *"WinGet the Windows Package Manager is available on Windows 11, modern versions of Windows 10, and
> Windows Server 2025 as a part of the **App Installer**. The App Installer is a System Component
> delivered and updated by the Microsoft store on Windows Desktop versions, and via Updates on Windows
> Server 2025."*

`## Administrator considerations` re-read in full: it covers elevation behaviour with and without
administrator privileges and nothing else. `SOURCED (absence)` for SYSTEM / service context /
unattended execution **confirmed by reading the section**, not by grep alone.

### `SourceAutoUpdateInterval` — verbatim, with its ADMX mapping

`policy-csp-desktopappinstaller` (`ms.date 2025-03-12`, `Last updated on 2025-03-12`). The page carries
**15** settings; all six D-45 rows are present. `SourceAutoUpdateInterval`, verbatim:

> *"This policy controls the auto-update interval for package-based sources. The default source for
> Windows Package Manager is configured such that an index of the packages is cached on the local
> machine. The index is downloaded when a user invokes a command, and the interval has passed."*
> *"The default source for Windows Package Manager is configured such that an index of the packages is
> cached on the local machine. The index is downloaded **when a user invokes a command**, and the
> interval has passed (**the index is not updated in the background**). This setting has no impact on
> REST-based sources."*

ADMX mapping, verbatim: Friendly Name *"Set App Installer Source Auto Update Interval In Minutes"*;
Location `Computer Configuration`; Path `Windows Components > Desktop App Installer`; Registry Key Name
`Software\Policies\Microsoft\Windows\AppInstaller`; ADMX File Name `DesktopAppInstaller.admx`.
Scope: ✅ Device / ❌ User. Applicable OS: *"Windows 11, version 22H2 [10.0.22621] and later"*.
Editions: Pro / Enterprise / Education / IoT Enterprise / IoT Enterprise LTSC. The page also flags:
*"This is an ADMX-backed policy and requires SyncML format for configuration."*

**D-11 is confirmed and strengthened.** At `2025-03-12` this page is **newer** than
`waas-manage-updates-wufb` (`2024-05-16`) and newer than the `winget configure` page (`2024-11-21`). It
is not the oldest source in the Pillar-C set. Drop the false comparative.

---

## Verbatim Quote Bank

Everything below was read from source bytes this session. Copy, do not recall. Each block names the page
it came from so a `**Source:**` line can be scoped to one page (D-64).

### For `07-windows-autopatch.md`

`windows-autopatch-prerequisites` — `ms.date 2026-02-26`, updated 2026-02-27:

- The licence list (four bullets, above), including **Windows 10/11 Enterprise E3 or E5 VDA**.
- *"At a minimum, the Windows Update and Device configuration workloads must be set to Pilot Intune or Intune."*
- *"Devices must be managed by either Intune or Configuration Manager co-management. **Devices only managed by Configuration Manager aren't supported.**"*
- *"Windows Autopatch supports registering Windows 10 and Windows 11 Long-Term Servicing Channel (LTSC) devices … The service only supports managing the **Windows quality updates workload** for devices currently serviced by the LTSC. Windows Update client policies and Windows Autopatch **don't offer Windows feature updates** for devices that are part of the LTSC."*
- *"Configuration Manager must be cloud-attached with Intune (co-management)"*
- The feature-entitlement matrix columns: `Business Premium` / `A3+` / `E3+` / `F3`, with `Releases`, `Update rings`, `Quality updates`, `Feature updates` all ✔️ across all four.

`windows-autopatch-hotpatch-updates` — `ms.date 2026-05-28`, updated 2026-06-02:

- The eligible-licence sentence (above), including **Windows 365 Enterprise**.
- H2 title verbatim: *"Hotpatch on Windows 11 Enterprise or Windows Server 2025"*.
- *"Hotpatch updates are also available on Windows Server and Windows 365."*

### For `08-windows-app-updates.md` — channels (APP-03)

`overview-update-channels` — `ms.date 2026-05-27`:

- *"The default update channel for Microsoft 365 Apps for enterprise and Microsoft 365 Apps for business is **Current Channel**. This channel is also the default for the subscription versions of the Project and Visio desktop apps."*
- *"Each subscription product is configured with a default update channel. If you don't specify the update channel when you install the product by itself on a device, the product is configured to use the default update channel."*
- *"**Update channels are device-specific** and apply only to installations of Microsoft 365 Apps on devices running Windows. The choice of an update channel for a device **isn't a setting that follows the user from device to device**."*
- *"Also, **you can only configure one update channel for a device**. For example, if you're installing Microsoft 365 Apps, Project, and Visio on the same device, they all must use the same update channel. You can't have a mix of update channels on the same device."*
- *"**OneDrive and Microsoft Teams have their own update cadences that are separate from these update channels.**"*
- *"**Beta Channel**, which was previously named Insider (and sometimes referred to as Insider Fast), provides access to new features even before they're available in Current Channel (Preview). But, **Beta Channel is not supported** so should only be used in test environments and by a small group of select users, such as IT staff or application developers."*
- *"If you're deploying volume licensed versions of Office such as Office Long Term Service Channel (LTSC) Professional Plus 2021 or Office LTSC Standard 2021, you need to use a different update channel: **PerpetualVL2021**."*
- *"There's no dedicated preview channel for Monthly Enterprise Channel, like there is for Current Channel and for Semi-Annual Enterprise Channel."*
- Comparison table, **Current Channel** column: `Rollback support` = *"**Not applicable**"*; `Support duration for a given version` = *"Until the next version is released with new features, which is usually about one month"*.
- Comparison table, **Monthly Enterprise Channel** column: `Feature updates` = *"Once a month, on the second Tuesday of the month"*; `Support duration` = *"Three months"*; `Rollback support` = *"Three months"*.
- *"Monthly Enterprise Channel supports up to three months of rollback. This extended rollback window provides greater flexibility to revert to a known build with the latest security fixes in case of issues."*
- SAEC recommended use: *"Choose Semi-Annual Enterprise Channel **only for non-interactive devices** and those running specialized or business-critical workloads that require extensive testing before new Microsoft 365 Apps features are implemented."*
- Current Channel (Preview): *"In general, a new version of Current Channel (Preview) with new features is released **at least a week or more** before that new version is released to Current Channel."*
- SAEC (Preview): *"We can then address these concerns in the **four months** before the version's release on Semi-Annual Enterprise Channel."*

> **PerpetualVL2021 note for D-26.** The page carries it as a real, named channel with its own
> destination article. Discretion allows mention or omission — but if omitted, omit it *silently in the
> table* while the prose says the channel list covers subscription Microsoft 365 Apps, so the reader is
> not led to believe the enumeration is exhaustive across all Office SKUs.

### For `08` — Enterprise App Management (APP-04)

`enterprise-app-management` — `ms.date 2026-06-03`, updated 2026-06-24:

- Intro: *"The Enterprise App Catalog is a collection of prepared Microsoft and non-Microsoft applications. These apps are **Win32 apps that are prepared as Win32 apps and hosted by Microsoft**."*
- `## Prerequisites` > Cloud requirements: *"Public cloud"*, *"Sovereign cloud environments: U.S. Government Community Cloud (GCC) High / U.S. Department of Defense (DoD)"*.
- Licensing requirements: *"This feature **requires a subscription in addition to Microsoft Intune Plan 1 or Plan 2**."*
- FAQ: *"Can Enterprise App Management be purchased standalone?" — "Yes. Enterprise App Management can be purchased as a **standalone SKU or as part of the Microsoft Intune Suite**."*
- Device platform requirements: *"The Enterprise App Catalog is available for **Windows apps**."*
- FAQ: *"What app installer types are in the Enterprise App Catalog?" — "The apps currently provided in the Enterprise application catalog are **Windows Win32 applications (exe and msi)**."*
- FAQ: *"Where are the devices downloading the app content from?" — "Microsoft hosts the applications in Microsoft storage accessible through `*.manage.microsoft.com`."*
- Auto-update scope: *"**Auto-update applies to apps with a Required assignment.** Apps assigned as Available for enrolled devices continue to use the existing update workflow."* / *"Supported on Windows 10 and Windows 11 devices."*
- **The FAQ negative, verbatim and complete** — *"Does Enterprise App Management use Winget?"* / *"**No. Enterprise App Catalog apps are directly installed by the Intune management extension (IME).**"*
- **The Autopilot positive** — *"**Windows Autopilot integration**: Enterprise App Catalog apps are supported with Windows Autopilot. Microsoft Intune Enterprise App Management enables IT admins to easily manage applications from the Enterprise App Catalog. Using Windows Autopilot, **you can select blocking apps from the Enterprise App Catalog in the Enrollment Status Page (ESP) and the Device Preparation Page (DPP) profiles.** This feature allows you to update apps more easily without needing to update those profiles with the latest versions."*
- The eight limitation headings and the two bodies quoted above.
- **The SLOs**, verbatim: *"Service Level Objectives (SLOs) define target timelines for making app updates available in the Enterprise App Catalog between when Microsoft receives them to when they're made available in the Enterprise App Catalog. **Unlike Service Level Agreements (SLAs), SLOs are guidelines, not guarantees**"* / *"The SLO measurement window starts at **ingestion**, the point when the app update is first received from the data source and logged in the EAM system."* / *"Target: **80–90% of app updates are processed and available in the Intune portal within 24 hours of ingestion**."* / *"Updates requiring manual testing and approval are completed **within seven days**."* / *"High-usage or critical apps that fail automated validation are prioritized for expedited processing (**goal of 48 hours**.)"*
- The security disclaimer: *"Microsoft doesn't assert compliance, authorization, authenticity, or integrity for apps distributed via Intune. Customers are responsible for ensuring that apps meet their requirements."*
- *"Intune doesn't perform a license check on Enterprise App Catalog apps."*
- *"Enterprise application management doesn't support the addition of applications that are behind a paywall or sign in screen."*
- *"Configuration Manager doesn't directly support Enterprise App Management apps. However, co-managed clients can get Enterprise App Catalog apps when targeted from Microsoft Intune."*
- *"At this time, Intune provides no running application detection."*

> **The SLO framing matters for SC#4's contrast.** EAM's numbers are explicitly *"guidelines, not
> guarantees"*, and the catalog-**addition** process carries an even harder disclaimer: *"Microsoft
> doesn't offer or assume any Service Level Agreement (SLA) or timeline regarding adding an app to the
> Enterprise App Catalog."* Contrast the Store type's **total absence** against EAM's **published but
> non-binding** objectives. Do not describe EAM's SLOs as guarantees; the page forbids it.

> **A trade-off, not a prohibition (D-30).** The `Benefits` section says catalog apps **can** be ESP and
> DPP blocking apps; limitation 7 says an **auto-update** catalog app cannot. Both are on the same page,
> and writing only the negative inverts the guidance. Per D-30 this positive lives under
> `## Enterprise App Management`, not under the callouts H2.

### For `08` — Store apps and WinGet (APP-05, APP-06)

All quoted above, in the Unknown-3 and Secondary sections. The four that carry the most weight:

1. *"UWP apps are kept up to date by the Store. The UWP app will stay up to date **with or without Intune assignment** once it is installed…"*
2. *"Microsoft Store Win32 apps are kept up to date by Intune, therefore **in order for the app to be updated it must be assigned in Intune**. App updates are not affected by the Store's update policies."*
3. *"Win32 apps that are in the Microsoft Store are **currently in preview**."* / *"Any app that has an ARM64 installer isn't supported."*
4. *"Not built in; use a custom configuration profile."* — on **both** `DesktopAppInstaller` rows Microsoft recommends enabling.

Plus D-39's guardrail applied to the FAQ negative: ship it verbatim, **do not extend it, do not
paraphrase it into something stronger, and do not attach a date or a rationale Microsoft did not give.**

---

## Architectural Responsibility Map

This is a documentation phase; the "tiers" are corpus domains. Each row states which file owns the
capability and which file it defers to, so the planner can sanity-check that no section re-authors
another domain's material.

| Capability | Owner (this phase) | Defers to | Rationale |
|---|---|---|---|
| Ring topology, WUfB deferral/deadline concepts | — | `01-windows-wufb-rings.md` (sealed) | D-14; `01` sealed by Phase 146 |
| Autopatch↔WUfB disambiguation | — | `01#autopatch-disambiguation` (`01:66`) | D-19; the anchor APP-01 and SC#1 name by function |
| Hotpatch mechanics and cadence | — | `01#hotpatch` (`01:119`) | D-19 |
| Autopatch **service** prerequisites (Entra P1/P2, corporate-only, 28-day check-in, diagnostic data, LTSC, app-only auth, no user-based groups) | **`07`** | — | D-21; `co-management/03` has never carried these |
| Autopatch **workload-slider** prerequisites | — | `co-management/03#autopatch-prerequisites` (`03:33`) | D-21, D-49; cross-link only, never edited |
| Autopatch enrollment, `Test`/`Last`, containment, workloads, reporting | **`07`** | — | D-14, D-20, D-22 |
| Hotpatch **licence list** (both sides, side by side) | **`07`** | — | D-17; the difference is the deliverable |
| Driver/firmware reporting | — | `06#driver-update-reporting` (`06:455`) | D-22; surfaces are disjoint by workload |
| Autopatch's Edge and Teams coverage | **`07`** | — | D-37 |
| M365 Apps channel choice, and the Autopatch-enrolled MEC condition | **`08`** (states the condition, links `07`) | `07` for the Autopatch side | D-37 |
| App **object model** — app types, packaging, supersedence graphs, dependency chains, ContentPrepTool | — | `docs/operations/app-lifecycle/**` | D-33 (corrected seam); no edits, D-35 |
| App **update governance** — which mechanism, what cadence, what it cannot do | **`08`** | — | D-33, D-36 |
| Win32 supersedence as an update mechanism | **`08`** links `app-lifecycle/01#supersedence` **only in the Win32 fallback tier** | `app-lifecycle/01` | D-34; and `08` states explicitly that EAM auto-update is **not** supersedence |
| ESP/DPP blocking-app **configuration** | — | `docs/reference/win32-app-packaging.md`, `docs/admin-setup-apv1/03-esp-policy.md` | D-30 |
| The device-preparation WinGet eligibility filter | **`08`** reconciles, in the routing H2 | the three apv2/reference sites, unedited | D-43, D-44 |
| Registry rows, filename-map, canaries, ops-index, nav-hub wiring | — | **Phase 152** | D-73 |
| The corrected containment position, channel table, EAM pairs for Recipe #5 | **`07`/`08` author it** | Phase 151 consumes | D-74 |

---

## Standard Stack

No packages are installed by this phase. The "stack" is the existing repo toolchain, all already
present and all exercised green this session.

### Core

| Tool | Version | Purpose | Why standard |
|---|---|---|---|
| Node.js (repo-local `.mjs` validators) | as installed | Runs `scripts/validation/*.mjs` | Every gate in this repo is a plain `.mjs` script run with `node` |
| `git` | as installed | Line-ending inspection via `git ls-files --eol`; commits | D-56 depends on it |
| `curl` + a local tag-strip + `grep` | system | First-party doc retrieval | D-59; `147-VERIFICATION.md:150` records this as the method that worked with zero fabrications |

### Alternatives considered

| Instead of | Could use | Tradeoff |
|---|---|---|
| `curl` + tag-strip | `WebFetch` / rendered summary | **Rejected.** `reference_canonical_source_bytes_not_webfetch` — the same URL returned contradictory summaries twice in one session on this project |
| `curl` + tag-strip | `gh api` on the docs repo | **Rejected and measured.** `windows-itpro-docs` is not publicly readable (146 D-59); and this session confirmed **all** the relevant `original_content_git_url` values point at `-pr` (private) repos — `memdocs-pr`, `windows-docs-pr`, `windows-dev-docs-pr`, `OfficeDocs-DeployOffice-pr`. I probed `OfficeDocs-DeployOffice` on `live`/`main`/`public`/`master`: **all four 404**. There is no raw-markdown path for any page this phase needs |

**Installation:** none. `npm install` is not run by this phase.

---

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages in any ecosystem. It authors two Markdown
files and makes four additive edits to a third. No `package.json`, `requirements.txt` or `Cargo.toml` is
touched, and the Standard Stack above contains only tools already present in the repo and on the host.

**Packages removed due to `[SLOP]` verdict:** none.
**Packages flagged as suspicious `[SUS]`:** none.

---

## Architecture Patterns

### Recommended file structure

```
docs/operations/patch-management/
├── 00-overview.md                        # 4 additive edit sites + conditional re-stamp (touch 4 of 4)
├── 01-windows-wufb-rings.md              # SEALED — cross-link #hotpatch and #autopatch-disambiguation
├── 05-linux-update-delivery.md           # sibling precedent: 484 lines, 10 H2, 8 anchors, 0 fences
├── 06-windows-driver-firmware-updates.md # closest precedent: 792 lines, 10 H2, 8 anchors, 0 fences, 64 Source lines
├── 07-windows-autopatch.md               # NEW — 10 H2, 8 anchors, 0 fences
└── 08-windows-app-updates.md             # NEW — 10 H2, 8 anchors, 0 fences (D-02's H2 SHIPS)
```

### Pattern 1 — the sibling shape

`05` and `06` are both **10 H2s / 8 own-line anchors / 0 code fences**, measured this session. `07` and
`08` mirror that field set exactly. The two un-anchored H2s are `## Related Resources` and
`## External References` (D-70).

Frontmatter field set, mirrored from `06` but with the dates **computed by arithmetic**, never copied
(D-70 — copying would import `06`'s stale `2026-08-20/2026-10-19`):

```yaml
---
last_verified: <execution date of commit 1>
review_by: <that date + 60, computed>
applies_to: all
audience: admin
platform: Windows
---
```

**No `doc_id`** — Phase 152 SC#3 makes non-enrollment permanent for `docs/operations/`. Verified: `c17`
enrolls on `doc_id` presence only, and 0 of the 225 registry rows point inside `docs/operations/`.

### Pattern 2 — the evidence-line contract

One standalone, line-start paragraph after the claim:

```markdown
> *"the verbatim quote"*

**Source:** [Article title](https://learn.microsoft.com/...) (updated 2026-06-24)
```

Measured this session: `06` ships **64** such lines, `05` ships **11**. Never inside the leading
blockquote (145 D-07), never an inline parenthetical (145 D-01), and — the rule that broke in
`146-REVIEW.md` WR-01 — **never spanning claims from different pages** (147 D-21 / D-64).

This phase carries the heaviest multi-page quote load in the milestone: eight EAM limitation headings,
six channels, three SLOs, six CSP rows, two licence lists, the FAQ negative and two documented conflicts,
across **eleven** Learn pages. Budget one Source line per page per claim cluster, and check the scope of
each one individually.

### Pattern 3 — the platform-applicability blockquote

`V-54-27` is a corpus-wide negative on a line-start `> **Platform:**` walking **both** `docs/` and
`.planning/` — verified by reading `check-phase-54.mjs:437-449`. It therefore binds every PLAN file too,
not just the two new guides. Use the full lexicon form (`> **Platform applicability:**`), never the bare
one, in the guides *and* in the plans.

### Anti-patterns to avoid

- **Wrapping a link or a table row across two physical lines in `00-overview.md`.** The `V-54-29` strip
  is `/\[.*?\]\(.*?\)/g` and `.` does not cross newlines — a wrapped link leaks its text into what the
  validator treats as body prose (D-53, code read this session). One physical line per bullet, per entry
  and per row.
- **Putting `Hotpatch`, `VBS` or `MEETS_STRONG_INTEGRITY` anywhere in a `00-overview.md` insertion** —
  including in an em-dash description after a link, which the strip does **not** remove. `07`'s natural
  Related Resources description mentions Hotpatch; it must not.
- **Filing the EAM ESP/DPP positive under `## Unsupported and Anti-Feature Callouts`** — an H2 whose
  title asserts the prohibition inverts a statement that is a trade-off (D-30).
- **Linking `app-lifecycle/01#supersedence` from an EAM auto-update sentence** — Microsoft says EAM
  auto-update uses *"no new app object and no supersedence relationship"*. That link sends the reader to
  the exact mechanism the page rules out (D-34).
- **Using a code fence for the four-step hierarchy.** All seven `patch-management` files have **zero**
  fences, measured this session (D-48). `WINGET-GAP.md:271-276` supplies the hierarchy inside a fence;
  render it as a decision list.
- **British spelling in a heading.** The H2 becomes a GitHub slug Phase 151 links byte-for-byte, and
  `check-nav-hub-links` has no baseline, allowlist or ratchet (D-16, 146 D-39). Note the requirement text
  itself uses `licence` — the *guide* must write `license`.
- **Writing `SCCM` or `System Center`.** The C11 fallback runs (sidecar has no `c11_ops_patterns`,
  verified). Write `Configuration Manager` and singular `Autopatch ring`; then no pattern fires.

---

## Don't Hand-Roll

| Problem | Don't build | Use instead | Why |
|---|---|---|---|
| Getting a Learn page's true content | A `WebFetch` summary | `curl` + tag-strip + literal grep, then quote from the bytes | Same URL, contradictory answers, twice in one session on this project |
| Finding a Learn article after a rename | Guessing a slug | Fetch the old slug, read `<link rel="canonical">` and `<meta name="original_content_git_url">` | The M365-Apps-in-Intune article moved into `settings-catalog/`; a plausible-looking `settings-catalog-update-office` guess returns a different page |
| Detecting a stale page revision | Trusting `ms.date` alone | Record `ms.date` **and** the rendered `Last updated on` | `configure-update-settings-microsoft-365-apps` is `ms.date 2024-05-20` but was updated 2026-06-23 — a 25-month gap that `ms.date` alone would misreport |
| Counting "the eight limitations" | Transcribing a ledger's bullet list | Extract the `<h4>` set under the `<h3>` | `STACK.md` §C-4 has twelve bullets and folds the canonical eighth into another item; the page's headings are the definition |
| Deciding whether an anchor exists | Recalling a coordinate | `grep '<a id=' <file>` | `01#ring-terminology` is a phantom; the real anchor is in `00-overview.md` |
| Verifying a prose negative | Reading the prose | A runnable grep in the PLAN's acceptance criteria | `146-REVIEW.md` WR-06 found a CONTEXT prose rule broken **four times** inside `06`'s own prose, invisible to seven green gates |
| Computing a `review_by` | Copying a sibling's stamp | Arithmetic on the execution date | `06`'s stamps are already stale; copying imports the staleness (D-70) |
| Computing a canary target | A document count | `grep -c "^| RE-"` against the registry, after the rows land | `REQUIREMENTS.md:98` (INT-03); the two canaries count different sets |

**Key insight:** every rework incident recorded in this project's memory traces to *asserting a value
that was not read this session*. The corpus has no validator that can catch a fabricated quote (D-62:
`grep -rn "Source:" scripts/` = 0). The verifier's re-fetch is the only gate. Write from the quote bank.

---

## Common Pitfalls

### Pitfall 1 — a same-page decoy grep

**What goes wrong:** grepping `winget` on `add-microsoft-store` returns three hits, and every one of them
is a *carve-out saying `winget.exe` escapes Store lockdown*. An author skimming hits concludes the Store
app type is WinGet-based — the exact conclusion APP-05 bars.
**Why:** the page discusses WinGet only as a policy exception, never as a delivery mechanism.
**Avoid:** pin every quote by its surrounding heading, never by grep hit (D-61). All three hits sit under
*"Common Store policy settings and their impact on Microsoft Store apps"* or the `RequirePrivateStoreOnly`
Tip — none under any update or delivery heading.
**Warning sign:** a draft sentence that says "Store apps are delivered via WinGet" with a Source line
pointing at `add-microsoft-store`. That page never says it. `UNVERIFIED` — never assert (D-58).

### Pitfall 2 — a URL that 200s but is not the article

**What goes wrong:** Learn returns HTTP 200 for slugs that do not serve the article you want, so a `curl`
exit code proves nothing.
**Why:** SPA shell responses and silent redirects.
**Avoid:** verify the fetched page's **H1** and `<link rel="canonical">` match what you expect before
quoting. I did this for the settings-catalog article and confirmed the redirected and canonical bodies
are byte-identical; a plausible-looking sibling slug I invented served something else.
**Warning sign:** a citation whose URL you constructed rather than followed.

### Pitfall 3 — a page that contradicts itself

**What goes wrong:** you quote one half and ship a false claim with a real citation.
**Why:** Microsoft ships announcements ahead of a revision pass. **Two** pages in this phase's set do it:
`overview-update-channels` (SAEC cadence) and `windows-autopatch-prerequisites` (two workloads named,
three referenced).
**Avoid:** when a page disagrees with itself, quote **both** sides with their headings and say the page
does not settle it. Never pick a side.
**Warning sign:** a `**Source:**` line under a confident, resolved-sounding sentence about either topic.

### Pitfall 4 — a validator leak invisible on inspection

**What goes wrong:** a `00-overview.md` insertion looks fine and takes `check-phase-54` to 31/1.
**Why:** `V-54-29`'s strip removes `[text](url)` with a non-newline-crossing regex and does not remove an
em-dash description at all — both confirmed by reading `check-phase-54.mjs:498-507` this session.
**Avoid:** one physical line per insertion; no `Hotpatch`/`VBS`/`MEETS_STRONG_INTEGRITY` in any
insertion, including link text and descriptions.
**Warning sign:** none. Only the validator sees it. Run `check-phase-54` before the commit, not after.

### Pitfall 5 — a silent zero-match string replacement

**What goes wrong:** a `sed`/replace against `00-overview.md` matches nothing and reports success.
**Why:** the file's worktree copy is **CRLF** while `05`/`06` are LF (measured). A pattern anchored with
`$` or containing a literal `\n` misses.
**Avoid:** verify every replacement matched — count before and after (`reference_phase146_execution_traps`).

### Pitfall 6 — a coordinate that goes stale inside its own phase

**What goes wrong:** a line number cited in Plan 1 is wrong by Plan 3.
**Why:** Phase 146's coordinates went stale two commits later; Phase 147's callouts census went stale the
instant it shipped.
**Avoid:** locate by quoted text, then re-measure. Every line number in this file is a convenience
pointer measured at `a161a43c`, not an identity.

### Pitfall 7 — a Source line that spans pages

**What goes wrong:** one `**Source:**` paragraph sits under a list whose items come from three articles,
lending first-party authority to whichever ones are unsourced.
**Why:** it reads tidier. `146-REVIEW.md` WR-01 caught exactly this.
**Avoid:** one Source line covers one contiguous quote block from one page. This phase quotes eleven
pages; expect a lot of Source lines and do not consolidate them.

---

## Project Constraints (from CLAUDE.md)

`./CLAUDE.md` describes a three-tier PowerShell/FastAPI/React application. **Phase 148 touches none of
those tiers.** It authors Markdown under `docs/` and runs existing `.mjs` validators. The CLAUDE.md
directives that transfer are the security ones, and they are satisfied vacuously:

| CLAUDE.md directive | Applies here? | Disposition |
|---|---|---|
| Never commit `.env` or any credentials | Yes | No credentials are involved; the guides quote public documentation only |
| Audit-log all administrative actions | No | No code executes administrative actions in this phase |
| Validate all user inputs in API endpoints | No | No API surface is touched |
| Use `-ShouldProcess` on remediation functions | No | No PowerShell is authored |
| Testing strategy (Pester / pytest / Vitest) | No | The repo's actual gate for `docs/` is the `scripts/validation/*.mjs` chain, which this phase runs; `.planning/config.json` sets `nyquist_validation: false` |
| Project structure (`src/`, `tests/`, `docs/`) | Partially | Only `docs/` is touched, plus `.planning/` artifacts |

One CLAUDE.md convention **does** bind the content: the "Required Network Endpoints" and "Critical
Registry Paths" sections show this project documents endpoints and registry paths as inline code. `08`
follows that for `Software\Policies\Microsoft\Windows\AppInstaller` and
`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\ClickToRun\Configuration` — inline code, not a fence
(D-45, D-48).

---

## State of the Art

| Old position | Current position | When it changed | Impact on this phase |
|---|---|---|---|
| The Intune M365 Apps update surface is Administrative Templates | It is the **Settings Catalog**; the article moved to `device-configuration/settings-catalog/` and was retitled; Admin Templates still documented and still works | Article `ms.date 2026-04-30` | D-02's H2 ships; name the settings catalog first |
| SAEC gets features twice a year, January and July | **Announced** to unify with Monthly Enterprise from Version 2606 / July 2026 — but Microsoft's pages still describe both behaviours | Announced `MC1274325`; unification article `ms.date 2026-06-18`, updated 2026-07-15 | Ship the conflict (D-27) |
| SAEC support duration fourteen months | Eight months since July 2025; **announced** to become 1 month + 2-month rollback = effective 3-month window | Table row dates the July-2025 change; the 1-month figure is announcement-only | Quote the table row as current, the 1-month figure as announced |
| Microsoft Store for Business and Education | Retired; replaced by the **Microsoft Store app (new)** Intune app type | Referenced on `add-microsoft-store` | The app type `08` governs |
| Autopatch feature activation with a feature gate | Removed April 2025; tiered entitlement, only support requests are E3+/F3-exclusive | `STACK.md` §C-1 — **PREMISE, re-fetch before quoting the date** | APP-01 |

**Deprecated / do not write:**

- *"Hotpatch defaults on for Windows 11 Enterprise 24H2+ from May 2026"* — unsupported by the current
  page. Owner-ruled out of scope here (D-03); the `00-overview.md:57` cell stays and goes to the backlog.
- *"Enterprise App Management is WinGet-based"* — Microsoft's own FAQ says no.
- *"winget-cli #5752 is unanswered"* — a COLLABORATOR replied 2025-09-27 (R-2).
- *"`Repair-WinGetPackageManager -AllUsers` is a supported SYSTEM path"* — documented for Windows Sandbox
  only. `UNVERIFIED`; never assert (D-58).
- *"The Store app type is implemented on the WinGet client or the `msstore` source"* — `UNVERIFIED`;
  never assert (D-58).

---

## Environment Availability

| Dependency | Required by | Available | Version / evidence | Fallback |
|---|---|---|---|---|
| `node` | all nine gates | ✓ | all nine executed green this session | — |
| `git` | `git ls-files --eol`, commits | ✓ | EOL measurement succeeded | — |
| `curl` | first-party retrieval (D-59) | ✓ | 12 pages fetched | — |
| `python` | tag-strip helper | ✓ | 3.13 | any `sed`-based tag strip |
| Network to `learn.microsoft.com` | the fetch list | ✓ | 200 on every target | — |
| Network to `api.github.com` | item (h) only | ✓ | issue JSON retrieved | non-blocking either way |
| `raw.githubusercontent.com` markdown source | preferred retrieval | **✗** | every relevant `original_content_git_url` points at a `-pr` (private) repo; all four `OfficeDocs-DeployOffice` branch guesses 404 | **HTML + tag-strip is the only path.** Used throughout; recorded so no plan budgets time for a raw-markdown route that does not exist |

**Missing dependencies with no fallback:** none.
**Missing dependencies with fallback:** raw Learn markdown — fallback is the HTML tag-strip, already the
project's ratified method (`147-VERIFICATION.md:150`, zero fabrications).

---

## Security Domain

`.planning/config.json` does not set `security_enforcement`, so it is treated as enabled. This phase
produces **no executable code, no network surface, no data handling and no credential path**. It writes
three Markdown files.

| ASVS category | Applies | Standard control |
|---|---|---|
| V2 Authentication | no | no auth code authored |
| V3 Session Management | no | no sessions |
| V4 Access Control | no | no access-control code |
| V5 Input Validation | no | no inputs processed at runtime |
| V6 Cryptography | no | no cryptography |

| Pattern | STRIDE | Mitigation |
|---|---|---|
| **Documentation-induced misconfiguration** — an admin hardens Windows using the two `DesktopAppInstaller` policies and silently degrades a supported Intune app type | Denial of Service (availability of app updates) | This is not a threat to the repo; it is the **content** APP-06 exists to deliver. Documenting it *is* the mitigation (D-46) |
| **Fabricated first-party claim reaching a shipped corpus** | Tampering (integrity of the corpus) | The quote bank above, plus D-62's verifier re-fetch-and-diff — the only gate that can catch it, since `grep -rn "Source:" scripts/` = 0 |

No credential, secret or endpoint is added by this phase.

---

## Open Questions

Every item below carries an explicit disposition. None is left open for the planner to resolve.

1. **Is the Intune-side Microsoft 365 Apps update policy surface documented, and where?**
   **(RESOLVED: the Settings Catalog.** Canonical article
   `learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/update-office`, `ms.date
   2026-04-30`, H1 *"Set the Microsoft 365 apps update channel using the settings catalog in Microsoft
   Intune"*; settings **`Update Channel`** and **`Target Version`**; role floor **Policy and Profile
   Manager**. The Administrative Templates route also remains documented with setting **`Update Channel
   (2.0)`**, and `configure-update-settings-microsoft-365-apps` states the Settings Catalog carries more
   settings. **D-02's conditional H2 SHIPS; `08` is 10 H2s / 8 anchors; 16 anchors total.)**

2. **What is the post-July-2026 Semi-Annual Enterprise Channel cadence?**
   **(RESOLVED as unresolvable from Microsoft's pages, which is the required answer.** Both
   `overview-update-channels` (`ms.date 2026-05-27`) and `unified-update-channels` (`ms.date 2026-06-18`,
   updated **2026-07-15**, i.e. *after* the cutover) remain future-tense; the comparison table and the
   Feature-updates section still describe twice-yearly releases. **Write the documented conflict per
   D-27**, quoting both sides with their headings, plus the checkable discriminator *"Devices with build
   numbers higher than 20131.20000 have successfully installed Version 2606"* and the dated escape hatch
   *"Version 2508 is supported through September 8, 2026"*. Never write a countdown.)**

3. **Have Win32 Store apps left preview, and has a cadence been published?**
   **(RESOLVED: no and no.** `add-microsoft-store`, `ms.date 2026-06-25`, states *"Win32 store apps are
   supported (in preview)"* and *"Win32 apps that are in the Microsoft Store are currently in preview."*
   ARM64 remains the sole entry in `## Unsupported functionality for Microsoft Store apps`. A grep for
   `cadence|interval|hours|schedule|SLO|how often|frequen|check for update` over the whole page returns
   **0 matches**. SC#4's clause is safe; the absence is real and re-measured.)**

4. **Is Office Click-to-Run Apps a documented Autopatch prerequisite (D-50)?**
   **(RESOLVED: not on `windows-autopatch-prerequisites`.** `Office` = 0 occurrences, `Click-to-Run` = 0
   occurrences. The page names **two** workloads (Windows Update policies, Device configuration) and then
   refers to *"the three workloads that Windows Autopatch requires"* without naming a third; the
   "co-management requirements for Windows Autopatch" link is a self-bookmark to that same section.
   `07` states this documented position in its own voice and asserts nothing about the unnamed third.
   `co-management/03:54-58`'s wording is falsified and goes to the backlog, unedited (D-49).
   `STACK.md` §C-1 needs no amendment.)**

5. **Are the eight Enterprise App Management limitations still the eight?**
   **(RESOLVED: yes, exactly eight, extracted as the `<h4>` set under `<h3> Limitations and known
   issues`.** Names and anchor ids are tabulated above. `FEATURES.md:97` matches; `STACK.md` §C-4's
   twelve-bullet list is a superset that folds the canonical eighth elsewhere, exactly as D-29 warned.
   **Cite the live page's headings, not either ledger.)**

6. **Are the two `DesktopAppInstaller` policies still absent from the settings catalog?**
   **(RESOLVED: yes.** Both `DesktopAppInstaller/EnableMicrosoftStoreSource` and
   `DesktopAppInstaller/EnableAppInstaller` carry the Intune-column value *"Not built in; use a custom
   configuration profile."* on `add-microsoft-store` (`ms.date 2026-06-25`), each under a heading whose
   own Recommended-values line says to set them to **Enabled**. D-46 confirmed verbatim. **This also
   discharges D-58 item (g)** — the same table gives the settings-catalog leaf names for
   `DisableStoreOriginatedApps` and `AllowAppStoreAutoUpdate` directly, so D-60's JS-rendering
   contingency never had to fire.)**

7. **Is winget-cli issue #5752 still open and unanswered (D-58 item h)?**
   **(RESOLVED: open, but answered.** 7 comments; `denelon`, `author_association: COLLABORATOR`, replied
   2025-09-27; last activity 2026-03-20. `WINGET-GAP.md` §2.2's "no maintainer reply" is stale.
   **Recommendation: do not cite the issue in the corpus at all** — third-party, D-47 bars naming
   projects, and the first-party `SOURCED (absence)` on `winget/index.md` (re-verified fresh at
   `ms.date 2026-07-19`) carries D-41's conclusion without it.)**

8. **Is the D-04 hotpatch page copy current, and does it settle Windows 11 Pro?**
   **(RESOLVED: current, and no.** `26100.2033` = 0 hits and `x64 (AMD` = 0 hits — both `PITFALLS.md`
   C1-9 stale-revision tells absent. `Windows 11 Pro` and `Professional` both = 0 hits, so the page
   neither supports nor refutes Pro eligibility. **Write it flagged unconfirmed, mirroring `01:144-145`,
   exactly as D-04 directs. `STACK.md` §C-2's `UNVERIFIED` plan-time task is NOT discharged** and stays
   in the backlog.)**

9. **Which Autopatch facts still need a fetch before they can be quoted?**
   **(RESOLVED with a named list, not a gap.** The PREMISE ledger above names six: the ring-model
   details and the containment sentence (`windows-autopatch-groups-overview`), the workload service
   objectives and the reporting-surface list (`windows-autopatch-overview`), the April-2025 activation
   removal, and the device-preparation SYSTEM-context and Store-app-eligibility quotes
   (`03-device-preparation-policy` tutorial). **Plan 1 fetches these before writing the sections that
   need them.** They were out of this pass's D-58 bounded scope; they are in-scope, named, and cheap.)**

---

## Sources

All fetched 2026-08-23 via `curl` + tag-strip + literal grep (D-59). `ms.date` from the page's own
`<meta>`; `updated` from the rendered `Last updated on` footer.

### Primary — first-party, quoted verbatim in this file (HIGH)

- `https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels` — `ms.date 2026-05-27`, updated 2026-05-27 — six channels, defaults, structural constraints, the SAEC conflict
- `https://learn.microsoft.com/en-us/microsoft-365-apps/updates/unified-update-channels` — `ms.date 2026-06-18`, updated **2026-07-15** — `MC1274325`, Version 2606, build 20131.20000, 2508 through 2026-09-08
- `https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/update-office` — `ms.date 2026-04-30`, updated 2026-04-30 — **canonical**; the settings-catalog surface, `Update Channel`, `Target Version`, the six channel GUIDs
- `https://learn.microsoft.com/en-us/microsoft-365-apps/updates/configure-update-settings-microsoft-365-apps` — `ms.date 2024-05-20`, updated 2026-06-23 — both Intune profile types, the full setting-name map
- `https://learn.microsoft.com/en-us/microsoft-365-apps/updates/change-update-channels` — `ms.date 2026-07-18`, updated 2026-07-18 — Administrative Templates route, `Update Channel (2.0)`, `Office Automatic Updates 2.0`, the channel-flipping trap
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store` — `ms.date 2026-06-25`, updated 2026-06-25 — preview status, ARM64, the UWP/Win32 split, the suppression asymmetry, the settings-catalog trap, the WinGet carve-outs
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management` — `ms.date 2026-06-03`, updated 2026-06-24 — gates, the eight limitations, SLOs, the FAQ negative, the Autopilot positive
- `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates` — `ms.date 2026-05-28`, updated 2026-06-02 — the hotpatch licence list; stale tells absent
- `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites` — `ms.date 2026-02-26`, updated 2026-02-27 — the Autopatch licence list, entitlement tiers, the two-versus-three workload inconsistency
- `https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-desktopappinstaller` — `ms.date 2025-03-12`, updated 2025-03-12 — 15 settings, `SourceAutoUpdateInterval`, the registry key
- `https://learn.microsoft.com/en-us/windows/package-manager/winget/` — `ms.date 2026-07-19`, updated 2026-07-19 — the SYSTEM-context root cause; `## Administrator considerations` absence

### Secondary — third-party, recorded but recommended against citing in the corpus (LOW for corpus use)

- `https://api.github.com/repos/microsoft/winget-cli/issues/5752` — state `open`, 7 comments, COLLABORATOR reply 2025-09-27, last activity 2026-03-20

### In-repo — read this session at `a161a43c` (HIGH)

`scripts/validation/check-phase-54.mjs` (`:35`, `:437-449`, `:498-507`) ·
`scripts/validation/v1.20-milestone-audit.mjs` (`:560-590`) ·
`scripts/validation/v1.20-audit-allowlist.json` ·
`scripts/pipeline/build-filename-map.mjs:283` · `scripts/pipeline/build-publish-bundle.mjs:518-525` ·
`docs/_registry/RE-index.md` · `docs/operations/patch-management/00-overview.md`,
`01-windows-wufb-rings.md`, `05-linux-update-delivery.md`, `06-windows-driver-firmware-updates.md` ·
`docs/operations/co-management/03-cocmgmt-migration-paths.md` ·
`docs/admin-setup-apv2/02-etg-device-group.md`, `03-device-preparation-policy.md` ·
`docs/reference/macos-capability-matrix.md` · `docs/recipes/01-shared-windows-avd-client.md` ·
`.planning/config.json`

### Research ledgers — consulted, and treated as PREMISE unless re-measured

`.planning/research/STACK.md` §C-1..§C-4 · `.planning/research/WINGET-GAP.md` §1-§7 ·
`.planning/research/FEATURES.md` · `.planning/research/PITFALLS.md`

---

## Assumptions Log

| # | Claim | Section | Risk if wrong |
|---|---|---|---|
| A1 | The `office16v2~` versus `office16~` ADMX-namespace difference on the settings-catalog article is a documentation artifact, not two distinct policy surfaces | Unknown 1 | Low — mitigated by the instruction to quote only one namespace and attribute it to its step. **Do not explain the difference in the guide.** |
| A2 | The third co-management workload Microsoft's Autopatch page references without naming is not identifiable from that page | D-50 | Low — this is what "documented silence" means. The risk is an author *filling* it from general co-management docs, which the instruction forbids |
| A3 | The 12 pages fetched are the complete set needed for APP-02..APP-06; the six PREMISE items are the complete set still outstanding for APP-01 | PREMISE ledger | Medium — an APP-01 clause could need a seventh fetch. Mitigation: Plan 1's first task is the named fetch list, run before authoring |
| A4 | Microsoft will not revise `overview-update-channels` or `unified-update-channels` between this research and execution | Unknown 2 | Medium — if either is revised, the documented conflict evaporates and the guide's framing becomes wrong. **Mitigation: D-62's verifier re-fetch will catch it; the PLAN must name these two pages explicitly in the verifier's diff list** |
| A5 | `add-microsoft-store` will not exit preview between research and execution | Unknown 3 | Medium — SC#4 and `REQUIREMENTS.md:64` both require *"in preview"*. Same mitigation: name it in the verifier's re-fetch list |
| A6 | HEAD will still be `a161a43c`-equivalent for gate baselines at plan time | MEASURED ledger | Low — but CONTEXT's own instruction is to re-measure, never transcribe. The planner re-runs the nine gates regardless |

---

## Metadata

**Confidence breakdown:**

- **The three ROADMAP unknowns:** HIGH — all three resolved from source bytes this session, with the
  canonical URL verified against `<link rel="canonical">` and a byte-identical body comparison for the
  one that moved.
- **APP-02..APP-06 quote bank:** HIGH — every quote read from the page it is attributed to, `ms.date`
  and rendered update date recorded for each.
- **APP-01 content:** MEDIUM — the licence list, entitlement tiers and workload rows were re-fetched;
  the ring model, containment sentence, service objectives and reporting surfaces were **not** and are
  labelled PREMISE with a named fetch list.
- **In-repo coordinates and validator behaviour:** HIGH — code read, not grepped for; all nine gates
  executed.
- **Corrections R-1/R-2/R-3:** HIGH — each rests on a measurement reproducible from the commands in this
  file.
- **The two documented conflicts:** HIGH that the conflicts exist as described; the underlying service
  behaviour is deliberately left `UNVERIFIED`, which is the required output.

**Research date:** 2026-08-23
**Valid until:** 2026-09-22 (30 days) — with two exceptions that should be re-checked at execution
regardless of elapsed time: `overview-update-channels` / `unified-update-channels` (a revision would
dissolve the SAEC conflict) and `add-microsoft-store` (a preview exit would break an SC clause).

---

## Plan-Time Fetch Addendum (Plan 148-01)

Fetched 2026-08-23 via `curl` + a local Python tag-strip + literal `grep`, per D-59. Every URL below
was verified by comparing its `<link rel="canonical">` against the intended target before any quote
was taken; no page was reached by guessing a slug. All six PREMISE items from the MEASURED / PREMISE
ledger above are resolved here, before any section of `07` quotes them (Task 1 precondition for
Tasks 2-4).

### Item 1 — Autopatch group ring-model details

**URL:** `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview`
**ms.date:** 2025-06-17
**Last updated on:** 2025-06-17 (the rendered footer badge matches `ms.date` exactly on this page;
note that `01-windows-wufb-rings.md:76` cites this same URL as "updated 2026-06-19" — that figure
comes from a different meta field, `og:updated_time`/`updated_at`, not the rendered "Last updated on"
badge measured here. `01` is sealed and not touched by this plan; this addendum records the value
this session's method actually produced.)
**Canonical verified:** yes — `<link rel="canonical">` matches the URL above; H1 is "Windows Autopatch
groups".

- Heading: **Key benefits** (table row "Having a flexible number of deployments") — *"Autopatch
  groups give you the flexibility of having the right number of deployment rings that work within
  your organization. You can set up to 15 deployment rings per Autopatch group."*
- Heading: **Test and Last deployment rings** — *"Both the Test and Last deployment rings are default
  deployment rings that are automatically present in an Autopatch group. These default deployment
  rings provide the recommended minimum number of deployment rings that an Autopatch group should
  have."* / *"Both the Test and Last deployment rings can't be removed or renamed from Autopatch
  groups. Autopatch groups don't support the use of one single deployment ring as part of its
  deployment ring composition because you need at least two deployment rings for their gradual
  rollout."* — this establishes the minimum ring count as **two** (stated as a consequence of the
  Test/Last pair being irremovable, not as a standalone "minimum: 2" figure).
- Heading: **Maximum number of Autopatch groups** — *"Windows Autopatch supports up to 300 Autopatch
  groups in your tenant. Each Autopatch group supports up to 15 deployment rings."*
- Heading: **Autopatch group deployment rings** — *"There are two types of deployment ring group
  distribution in Autopatch groups"*: **Dynamic** — *"You can use one or more device-based Microsoft
  Entra groups, either dynamic query-based or assigned to use in your deployment ring
  composition."* — and **Assigned** — *"You can use one single device-based Microsoft Entra group,
  either dynamic query-based, or assigned to use in your deployment ring composition."* Also: *"The
  combination of Dynamic and Assigned device distribution is not supported for the Test and Last
  deployment ring in Autopatch groups."*

### Item 2 — The containment sentence

**URL:** same as Item 1 (`windows-autopatch-groups-overview`), **ms.date** 2025-06-17, **Last updated
on** 2025-06-17 (see the note under Item 1).

- Heading: **What are Windows Autopatch groups?** — *"An Autopatch group is a logical container or
  unit that groups several Microsoft Entra groups, and software update policies, such as Update rings
  policy for Windows 10 and later, feature updates for Windows 10 and later policies, driver update
  policies, Microsoft 365 App update policies, and Microsoft Edge update policies."* This is the
  load-bearing citation for `07`'s corrected containment position and the quote Phase 151 SC#2
  consumes.

### Item 3 — Workload service objectives

**URL:** `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview`
**ms.date:** 2026-07-13
**Last updated on:** 2026-07-13 (rendered badge matches `ms.date`; matches the value already recorded
in the MEASURED table above).
**Canonical verified:** yes — H1 is "What is Windows Autopatch?".

- Heading: **Windows quality updates** — *"Windows Autopatch: Aims to keep at least 95% of Up to Date
  devices on the latest quality update. For more information, see Windows quality update Service
  Level Objective."*
- Heading: **Microsoft 365 Apps for enterprise updates** — *"Windows Autopatch aims to keep at least
  90% of eligible devices on a supported version of the Monthly Enterprise Channel (MEC)."*
- Heading: **Microsoft Edge updates** — *"Windows Autopatch configures eligible devices to benefit
  from Microsoft Edge's progressive rollouts on the Stable channel."*
- Heading: **Microsoft Teams updates** — *"Windows Autopatch allows eligible devices to benefit from
  the standard automatic update channel."*

### Item 4 — The Autopatch reporting surface list

**URL:** same as Item 3 (`windows-autopatch-overview`), **ms.date** 2026-07-13, **Last updated on**
2026-07-13.

- Heading: **Hotpatch quality update report** (Features and capabilities table) — *"Hotpatch quality
  update report provides a per policy level view of the current update statuses for all devices that
  receive Hotpatch updates."*
- Heading: **Enhanced Windows quality and feature update reports and device alerts** — *"Using
  Windows quality and feature update reports, you can monitor and remediate managed devices that are
  Not up to Date and resolve any device alerts to bring managed devices back into compliance."*
- Heading: **Communications** — *"To stay informed of upcoming changes, including new and changed
  features, planned maintenance, release and status communications, or other important announcements,
  navigate to Microsoft 365 admin center > Message center."* — this is the communications channel.
- Heading: **Autopatch groups membership report** — cross-referenced from `windows-autopatch-groups-overview`
  (Item 1's page), under **Prerequisites**: *"Autopatch groups register devices on your behalf, and
  device readiness states are determined based on the registration state and if any applicable alerts
  are targeting the device. For more information, see the Autopatch groups membership report."* This
  names the report but does not quote its own page; the report's own detail page was not fetched this
  session and is not needed for the single-sentence citation `07`'s Reporting section uses.
- **Not found:** a report or page named "Autopatch alerts and remediation" (the exact phrase carried
  in `STACK.md` §C-1) does not appear verbatim on either page fetched this session. The closest
  first-party surface is the "device alerts" clause quoted above, under Enhanced Windows quality and
  feature update reports. `07` cites what was found — device alerts as part of the enhanced quality/
  feature reports — and does not assert a separately named "Autopatch alerts and remediation" report
  exists as its own surface.

### Item 5 — The April 2025 feature-activation removal and the tiered entitlement table

**URL:** `windows-autopatch-overview` (Item 3's page), **ms.date** 2026-07-13, **Last updated on**
2026-07-13.

- Heading: top-of-page **Important** note (before the first H2) — *"In April 2025, Windows Autopatch
  removed feature activation and made Windows Autopatch features available to Business Premium and
  A3+ licenses. These changes are rolling out over the next several weeks."* **Found on a first-party
  page** — the April 2025 date is confirmed and may be carried forward.

**URL:** `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites`
(re-confirmed; same page already in the Verbatim Quote Bank), **ms.date** 2026-02-26, **Last updated
on** 2026-02-27 (matches the value already recorded above).

- Heading: **Feature entitlement** — the tiered matrix re-confirmed exactly as recorded in the
  Verbatim Quote Bank: `Business Premium` / `A3+` / `E3+` / `F3` columns; `Releases`, `Update rings`,
  `Quality updates`, `Feature updates`, `Driver and firmware updates` (Windows 10 and later update
  policy management table) all ✔️ across all four columns; `Autopatch groups`, `New feature and
  change management communications`, `Release schedule and status communications` (Tenant management
  table) all ✔️ across all four; `Support requests` is ❌ for Business Premium and A3+, ✔️ for E3+ and
  F3 only; `Intune Reports`, `Quality updates`, `Feature updates`, `Device readiness` (Reporting table)
  all ✔️ across all four columns.

### Item 6 — The Autopilot device-preparation quotes

**URL:** `https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-assign-apps-scripts`
**ms.date:** 2026-01-30
**Last updated on:** 2026-01-30 (rendered badge matches `ms.date`).
**Canonical verified:** yes — H1 is "Windows Autopilot device preparation user-driven Microsoft Entra
join: Assign applications and PowerShell scripts to device group". Reached from
`https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues` (already cited in the
corpus) via the public `MicrosoftDocs/memdocs` GitHub repository's directory listing
(`autopilot/device-preparation/tutorial/user-driven/`) rather than a guessed slug — the device-
preparation tree lives in `memdocs` (public), not the `-pr` (private) repos the rest of this phase's
pages sit in, and the live Learn page's own canonical link confirmed the same URL and byte content.

- Heading: **Assign applications and PowerShell scripts to device group** — *"Any applications
  installed or PowerShell scripts that run during a Windows Autopilot device preparation deployment
  should be configured to install in the **System** context since the applications are installed and
  the PowerShell scripts ran during OOBE when no user is signed in."*
- Heading: **Applications** (sub-heading of the same section) — *"[Microsoft Store](/intune/app-management/deployment/add-microsoft-store)
  - only Microsoft Store apps that support WinGet are supported."*

### Retrieval summary

All six items were retrieved successfully; none hit a client-side-rendering retrieval failure (D-60).
No stale-revision tell (`Build 26100.2033`, `an x64 (AMD/Intel) CPU`) appears in any page fetched this
session. `git status --porcelain` after this task shows only this file modified — no file under
`docs/` has changed.
