---
research_artifact: PITFALLS
milestone: v1.21
---

# Pitfalls Research

**Domain:** Enterprise update, driver and firmware/BIOS governance documentation, added to a mature 282-file Intune corpus guarded by a 17-workflow chain-validator harness
**Researched:** 2026-08-19 (brief specified 2026-08-18; the session clock rolled over mid-research — every date-relative figure below is computed against **2026-08-19** and says so)
**Confidence:** HIGH on Class 2 (every claim is a command I ran, output quoted); MEDIUM-HIGH on Class 1 (first-party Microsoft Learn where quoted; flagged individually where not)
**Revised:** 2026-08-19 — see [Corrections Applied](#corrections-applied-2026-08-19-adversarial-review) at the end of this file. Twenty-one corrections were applied after adversarial review, including one fabricated clause inside a verbatim quotation (C1-7), one hazard attributed to the wrong Intune surface (C1-13), and one struck plan-time recommendation (Class-2 Pitfall 7). **Read that section before treating any earlier copy of this file as current.**

## Evidence Labelling Convention

Every factual row carries one of:

- **[MEASURED]** — a command I ran in this session against this repo at HEAD `a2edcd02`, with the output shown.
- **[SOURCED]** — an external document I fetched, with URL and the page's own `ms.date` / `updated_at`.
- **[PREMISE]** — an inference. Not verified. Treated as a hypothesis to test at plan time, never as a fact.

A reproducible count does not make the assumption behind it true. Where a number is reproducible but the *premise* is unverified, the row says so explicitly.

---

## READ THIS FIRST — Three Corrections to the Brief's Own Premises

The research brief carried three premises that my measurements **falsify or narrow**. Planning off the brief's version would waste a phase.

### Correction 1 — The apex chain is RED at HEAD right now, and writing this very file greens it

**[MEASURED]** `node scripts/validation/check-phase-144.mjs` at HEAD:

```
[CHAIN-143/101] V-144-CHAIN-143: check-phase-143.mjs exits 0 (CHAIN regression-guard) FAIL
  [CORPUSRUN/9] V-143-CORPUSRUN: check-nav-hub-links.mjs corpus-wide run (no flags) exits 0 FAIL
Result: 100 PASS, 1 FAIL, 0 SKIPPED (total checks: 101)   [19.8s wall clock]
```

**[MEASURED]** `node scripts/validation/check-nav-hub-links.mjs`:

```
docs/_glossary-linux.md:157 -> [PITFALL-2](../.planning/research/PITFALLS.md)
  -- target file not found: .planning/research/PITFALLS.md
check-nav-hub-links summary: 0 hub-presence failure(s), 1 corpus-link failure(s), 1 total
```

**[MEASURED]** Why it went red between the v1.20 close and now:

```
$ git ls-tree -r --name-only 246fa3dd -- .planning/research
.planning/research/ARCHITECTURE.md
.planning/research/FEATURES.md
.planning/research/PITFALLS.md
.planning/research/STACK.md
.planning/research/SUMMARY.md
$ git ls-tree -r --name-only HEAD -- .planning/research
(empty)
$ git log --oneline -3
a2edcd02 chore(jira): create v1.21 epic RTS-806
b21ee88c docs: archive v1.19 project research to milestones/v1.19-research/
7105e065 docs: start milestone v1.21 ...
```

The v1.19-era research files sat in `.planning/research/` throughout v1.20 (so the apex was legitimately 101/0/0 at the close SHA `246fa3dd`). `/gsd-new-milestone` for v1.21 moved them to `.planning/milestones/v1.19-research/` at `b21ee88c`, two commits before HEAD — and a **corpus** document links into that per-milestone, archived path.

**The trap:** the moment I write this file, `check-nav-hub-links.mjs` goes green again and the apex returns to 101/0/0 — but `docs/_glossary-linux.md:157`'s "PITFALL-2 anchor" for Linux Conditional Access will then be pointing at a **v1.21 firmware/BIOS pitfalls document that contains no PITFALL-2**. The checker validates path resolution, not semantics. This is a manufactured false green, and it recurs at every future `/gsd-new-milestone`.

**[MEASURED]** It is not one link. `grep -rn "\.planning/" docs/ --include=*.md | wc -l` → **11** corpus references into `.planning/`. One is a markdown link (the Linux one, which the checker sees); the other ten are inline-code citations the checker cannot see. **Nine of the eleven are unstable**; the two Apple TV citations already point at a stable milestone-level path and need no repair:

| File:line | Cites | Now resolves to |
|---|---|---|
| `docs/_glossary-linux.md:157` | `[PITFALL-2](../.planning/research/PITFALLS.md)` | **404 at HEAD; this file after I write it** |
| `docs/l2-runbooks/25-linux-agent-investigation.md:93` | "PITFALL-4 in `.planning/research/PITFALLS.md`" | this file (no PITFALL-4) |
| `docs/_glossary-apple-business.md:54, 96, 136, 148, 164, 190` | OP-1/OP-2/OP-3/OP-7, CI-2/CI-3 in `.planning/research/PITFALLS.md` | this file (none of those IDs) |
| `docs/_glossary-apple-business.md:120` | `.planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md` | archived to `.planning/milestones/v1.6-phases/` |
| `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md:187, 241` | `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` | still valid (milestone-level path) |

**Prevention (actionable, do this in v1.21's first content phase):** repair the nine unstable citations by **inlining the substance** so they no longer cite a planning artifact at all.

**[MEASURED] Re-pointing at an archived path does not work here, so there is only one option, not two.** The obvious second option — link the archived, immutable copy — has no target:

- `.planning/milestones/v1.19-research/PITFALLS.md` exists but its `### Pitfall 2` / `### Pitfall 4` are *"The 'one-line cross-link' for single-app kiosk drifts…"* and *"Edition-floor claim is stated more restrictively…"*. The PITFALL-2/PITFALL-4 the corpus cites are the **Linux** ones — `Conditional Access Bait — Admins Expect Device-Level CA on Linux` and `Distro Version Creep — Ubuntu HWE vs GA Kernels and LTS EOL` — recoverable only from git history: `git show b736a3fc:.planning/research/PITFALLS.md` → `32:### Pitfall 2:`, `81:### Pitfall 4:`.
- `.planning/milestones/v1.6-research/` **does not exist** (`ls` → No such file or directory), and `grep -rln "OP-1\b" .planning/milestones/*-research/*.md` → no hits. The Apple-Business OP-1/OP-2/OP-3/OP-7/CI-2/CI-3 content survives only at `78be4743`.

Successive `/gsd-new-milestone` runs **overwrite** `.planning/research/*.md` rather than archiving every generation, so a research file's content is archived only if that milestone happened to be the last one before the archive ran. Milestone-level `.planning/milestones/vX.Y-*.md` paths *are* stable (the Apple TV ones prove it); `.planning/research/` and `.planning/phases/` are **not**. Add a phase success criterion: `grep -rn "\.planning/research/\|\.planning/phases/" docs/` returns 0.

**Warning sign:** `node scripts/validation/check-nav-hub-links.mjs` exits non-zero on a clean tree, or the apex reports `100 PASS, 1 FAIL` instead of `101 PASS, 0 FAIL`.

**Phase:** must be discharged in v1.21's **first** content phase, before any other corpus edit — otherwise every subsequent phase's verification runs against a red apex and cannot distinguish its own regressions.

---

### Correction 2 — The glossary freshness hazard is real but it is ONE workflow, not six. The "six workflows" number belongs to C17.

The brief said a one-day glossary metadata edit "flips six green workflows red". My measurement splits that claim in two.

**[MEASURED] The 90-day rule and the margin, computed today (2026-08-19):**

The `>90` test lives at `scripts/validation/v1.20-milestone-audit.mjs:410` (check C5, `androidDocPaths()`) and `:547` (check C10, `linuxDocPaths()`), identical shape:

```js
const diffDays = Math.round((rb - lv) / 86400000);
if (diffDays > 90) { violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>90)' }); }
```

`androidDocPaths()` includes `docs/_glossary-android.md` (`:159`); `linuxDocPaths()` includes `docs/_glossary-linux.md` (`:210`).

Front matter, read directly this session:

| File | `last_verified` | `review_by` | Cycle | Margin vs `>90` | `review_by` status @ 2026-08-19 |
|---|---|---|---|---|---|
| `docs/_glossary-android.md` (RE-179) | 2026-06-29 | 2026-09-27 | **90 d** | **0 days** | 39 days remaining |
| `docs/_glossary-linux.md` (RE-181) | 2026-06-29 | 2026-09-27 | **90 d** | **0 days** | 39 days remaining |
| `docs/_glossary.md` (RE-184) | 2026-06-29 | 2026-09-27 | 90 d | 0 days (not in scope of C5/C10) | 39 d remaining |
| `docs/_glossary-macos.md` (RE-182) | 2026-06-29 | 2026-09-27 | 90 d | 0 days (not in scope) | 39 d remaining |
| `docs/_glossary-network.md` (RE-183) | 2026-06-29 | 2026-09-27 | 90 d | 0 days (not in scope) | 39 d remaining |
| `docs/_glossary-apple-business.md` (RE-180) | 2026-05-21 | 2026-07-20 | 60 d | 30 days | **30 days PAST DUE** |

Arithmetic: 2026-06-29 → 2026-09-27 = 30 (to Jul 29) + 31 (to Aug 29) + 29 (to Sep 27) = **90**. `Math.round((rb-lv)/86400000) = 90`; `90 > 90` is `false` → PASS by exactly one day.

**[MEASURED] Corpus-wide cycle histogram** (271 of 282 docs carry both dates; `1970-01-01` sentinels excluded):

```
{"19":1, "48":1, "52":1, "60":98, "90":145, "92":25}   max cycle = 92
```

**25 docs already sit at 92 days.** They pass only because they are outside `androidDocPaths()`/`linuxDocPaths()`. Nineteen sit in the macOS content trees; **six sit outside them**, and the earlier draft of this row named only four:

```
docs/common-issues.md
docs/index.md
docs/l1-runbooks/00-index.md
docs/quick-ref-l1.md
docs/reference/4-platform-capability-comparison.md      <- omitted from the earlier enumeration
docs/reference/macos-capability-matrix.md               <- omitted from the earlier enumeration
```

**[PREMISE]** No live 90-day rule covers macOS/Windows docs; I confirmed no other `> 90` site exists in `scripts/` (`grep -rn "days > 90\|> 90"` returns only the v1.14–v1.20 harness sites), but I did not exhaustively prove that no *other* rule shape (e.g. a `>=` or a 45-day rule) covers them.

**[MEASURED] The 45-day comparison-doc rule is a FROZEN read, and the live file already violates it undetected.** `check-phase-58.mjs:212` computes `days !== 45` — but its input at `:200` is `readAtV15Close(COMPARISON_DOC)`, a read pinned at the v1.5 close SHA `ba2cbc0`, not live HEAD. The live `docs/reference/4-platform-capability-comparison.md` carries `last_verified: 2026-06-24` / `review_by: 2026-09-24` — a **92-day** cycle — and `V-58-10` passes anyway, because it never reads that file. This is the same file the enumeration above omitted, which is why the contradiction went unnoticed: it is simultaneously the most-cited comparison doc and the one no live rule touches. **Do not cite `check-phase-58.mjs:212` as a live guardrail for v1.21.**

**[MEASURED] Why it is only one workflow, not six:** `v1.14` through `v1.19` milestone-audit harnesses were converted to frozen-aware reads by SWEEP-05. Each imports `createFrozenCorpusReader` and its `readFile` is `FROZEN.get(relPath)` (e.g. `v1.14-milestone-audit.mjs:41,54,60`), and its `androidDocPaths()` uses `FROZEN.has(p)` not `existsSync` (`v1.19-milestone-audit.mjs`). **`v1.20-milestone-audit.mjs` has no frozen reader at all** — its `readFile` (`:53`) is a plain `readFileSync(join(process.cwd(), relPath))`. So a live glossary edit is visible to exactly one harness.

**[MEASURED]** Only `.github/workflows/audit-harness-v1.20-integrity.yml` runs `v1.20-milestone-audit.mjs` (`grep -ln "v1.20-milestone-audit" .github/workflows/*` → one hit).

**The in-workflow blast radius is NOT "three jobs red". It is one red plus a fan-out of silent SKIPs**, and the workflow says so in its own header (`:22-25`, verbatim):

> "every job in this file except frozen-read-probe declares `needs: harness-run` (directly or transitively via parse -> path-match -> harness-run), so a harness-run failure produces six silent SKIPS -- linux-chain-ubuntu-latest, check-phase-144, check-phase-139..143 -- rather than one visible red. A future evidence pass must read those skips as gaps, not as passes."

**[MEASURED]** `grep -c "needs: harness-run" .github/workflows/audit-harness-v1.20-integrity.yml` → **10**. The same structure holds in every C17-bearing workflow (v1.15 → 10, v1.16 → 9, v1.17 → 6, v1.18 → 9, v1.19 → 7, v1.20 → 10 dependent jobs). **A green-except-one run sheet is therefore not evidence that the other jobs passed** — read the SKIPs as gaps.

**[MEASURED] Where "six" actually belongs — C17:** `grep -l "c17-eee-contract" scripts/validation/v1.*-milestone-audit.mjs` → **6 files** (v1.15, v1.16, v1.17, v1.18, v1.19, v1.20). Every one of them spawns `c17-eee-contract.mjs` against **LIVE HEAD** — this is exactly the `C17-FROZEN-AWARE-RESIDUE-V15-V19` entry in `v1.20-DEFERRED-CLEANUP.md`. `v1.15-milestone-audit.mjs:830` says so in its own comment: *"spawn below intentionally stay LIVE-HEAD. c17-eee-contract.mjs is CARVE Category 3"*.

So: **one C17 violation in one new v1.21 document turns six workflows red simultaneously**, and inside each it fails `harness-run` and silently SKIPs the 6–10 jobs that depend on it. That is the real six-workflow blast radius, and it is triggered by *content*, not metadata.

**[MEASURED]** C17 is currently clean: `C17 summary: 234 files checked, 0 with violations, 0 total violations`.

**Prevention:** set every new/refreshed doc's pair to `last_verified: <authoring date>` / `review_by: <authoring date + 90>` computed by arithmetic, never hand-typed. For an authoring date of 2026-08-19 that is `review_by: 2026-11-17` (verified: `new Date('2026-08-19') + 90d → 2026-11-17`). And run `node scripts/validation/c17-eee-contract.mjs` before every commit that touches `docs/`.

> **CARVE-OUT — the +90 rule does NOT apply to the five `docs/operations/patch-management/` files.** `V-54-07` caps them at **≤ 60 days** (`check-phase-54.mjs:116`, `if (days > 60) issues.push(...)`), and refreshing exactly those five is Pillar E's whole job. **[MEASURED]** all five sit at `cycle=60` today. For an authoring date of 2026-08-19 the correct pair for these five is `review_by: 2026-10-18` (+60). Applying the +90 default to them is a one-commit apex break. The same carve-out is restated in Class-2 Pitfall 1.

---

### Correction 3 — `check-phase-54.mjs` is the dominant Class-2 risk, not the glossary

The brief flagged `check-phase-54.mjs` for its negative assertion on `REQUIREMENTS.md`/`ROADMAP.md`. That is real but minor. The far bigger fact: **`check-phase-54.mjs` is a frozen, fully live-HEAD validator that pins all five `docs/operations/patch-management/` files — the exact files v1.21 rewrites — with 32 assertions, and it is currently 32/32 green.**

**[MEASURED]** `node scripts/validation/check-phase-54.mjs` → `Summary: 32 passed, 0 failed, 0 skipped`. Its `readFile` (`:16-20`) is `readFileSync(join(process.cwd(), relPath))` — no freezing. It is a chain member of the apex (`V-144-CHAIN-54`).

**[MEASURED]** Only two validators reference `patch-management` at all: `check-phase-54.mjs` (9 refs) and `check-phase-57.mjs` (1 ref, `PHASE54_SSOT = docs/operations/patch-management/04-android-patch-delivery.md`).

The full constraint surface is enumerated as Class-2 Pitfall 1 below.

---

# CLASS 1 — Subject-Matter Pitfalls (what the documentation must warn about)

## Pitfall C1-1: DFCI is disqualified by two of the three registration paths this corpus teaches

**What goes wrong:** A team follows this corpus's own `docs/admin-setup-apv1/01-hardware-hash-upload.md` to register devices, then builds a DFCI programme on top. DFCI never enrols. The profile deploys, reports as assigned, and does nothing.

**[MEASURED] CSV is one example, not the rule, and the corpus teaches three paths — one of which qualifies.** Learn's wording is *"manually registered … (such as by importing from a CSV file)"* — **"such as"** makes CSV an illustration of the disqualifying class, not its definition. `docs/admin-setup-apv1/01-hardware-hash-upload.md` routes to three:

| Corpus path | Registration channel | DFCI eligible? |
|---|---|---|
| **Path 1 — OEM Delivery** (`:41`) | OEM uploads hashes directly to the tenant | **Yes** — this is the attested channel DFCI requires |
| **Path 2 — CSV Bulk Import** (`:57`) | Manual import via the Autopilot device list | **No** — manual registration |
| **Path 3 — `Get-WindowsAutopilotInfo`** (`:103`, incl. `-Online`) | Local capture / direct online upload by an admin | **No** — also manual registration, and unmentioned in every prior draft of this pitfall |

Path 3 is exactly as disqualifying as Path 2 and is the path a small pilot is most likely to take.

**Why it happens:** **[SOURCED]** `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows` (ms.date 2026-06-23, updated_at 2026-07-01), Prerequisites, verbatim:

> "You can't use DFCI with devices manually registered for Windows Autopilot, such as [imported from a csv file]. By design, DFCI management requires external attestation of the device's commercial acquisition through an OEM or a Microsoft CSP partner registration to Windows Autopilot."

And **[SOURCED]** `learn.microsoft.com/en-us/autopilot/dfci-management` (ms.date 2025-03-25, updated_at 2026-04-14):

> "Devices manually registered for Windows Autopilot (such as by importing from a CSV file) aren't allowed to use DFCI."

**The second disqualifier nobody reads: the OEM list.** **[SOURCED]** `learn.microsoft.com/en-us/autopilot/dfci-management` (ms.date 2025-03-25, updated_at 2026-04-14), H2 "OEMs that support DFCI", verbatim list: *Acer. Asus. Dynabook. Fujitsu. Microsoft Surface. Panasonic. VAIO. Samsung. NEC.* followed by *"Other OEMs are pending."* **Dell, HP and Lenovo are not on it** — which is precisely why C1-4's per-OEM vendor tooling (Dell Command, HP Sure Admin, Lenovo Think BIOS Config) exists at all. A reader who sees C1-1 and C1-4 side by side without this sentence concludes that DFCI works on Dell/HP/Lenovo provided the device was OEM-registered. It does not. **Route DFCI and per-OEM tooling as disjoint fleets, not as alternatives for the same device.**

**A third, dated blocker: Windows 11 24H2 Professional.** **[SOURCED]** same page, "## Known issues", verbatim:

> "**DFCI enrollment fails for Professional editions of Windows 11, version 24H2** — Date added: *October 9, 2024* Date updated: *February 11, 2025*
>
> DFCI can't currently be configured during the out-of-box experience (OOBE) on devices with Professional editions of Windows 11, version 24H2
>
> For devices that have already been provisioned and have Professional editions of Windows 11, version 24H2, install KB5046740 or later to enroll in DFCI. Devices with Professional editions of Windows 11, version 24H2 that have KB5046740 or later installed are automatically enrolled in DFCI after a reboot."

The documented OOBE workaround is: (1) during OOBE onboarding, upgrade the device to the Enterprise edition of Windows 11, version 24H2; (2) sync the device; (3) reboot to get it enrolled in DFCI. **This lands on exactly the build the Hotpatch pillar targets** (Windows 11 24H2), so a Pro-edition pilot fleet fails DFCI enrolment and Hotpatch eligibility for two unrelated reasons at once.

**How to avoid:** the DFCI guide's Prerequisites section must open with a three-part gate — (a) registration channel (OEM/CSP only; **both** manual paths disqualify), (b) OEM on the supported list (nine names, "other OEMs are pending"), (c) edition/build (Pro 24H2 needs KB5046740, or the OOBE Enterprise-upgrade sequence) — and must carry an explicit cross-link *back* to `docs/admin-setup-apv1/01-hardware-hash-upload.md` saying "if you registered via Path 2 or Path 3, DFCI is not available to you." A capability-matrix row per OEM is not sufficient on its own — the first blocker is the *registration channel*, not the hardware.

**Warning signs:** DFCI profile shows Succeeded in Intune but `managedDevice/deviceFirmwareConfigurationInterfaceManaged` returns false; UEFI menu still user-editable after three reboots; a Pro-edition 24H2 device that never triggers the extra OOBE reboot.

**Phase:** Pillar A (firmware/BIOS), first plan.

---

## Pitfall C1-2: DFCI retirement order is irreversible if you get it backwards

**What goes wrong:** Device is wiped and the Autopilot record deleted while the DFCI profile still locks the UEFI menus. The BIOS stays locked forever from Intune's side.

**Why it happens:** **[SOURCED]** same Intune page, "Reuse, retire, or recover the device", verbatim:

> **Retire:** "These steps unlock the device's UEFI (BIOS) menus. The values remain the same as the profile (**Enabled** or **Disabled**), and aren't set back to any default OS values. You're now ready to wipe the device. Once the device is wiped, delete the Windows Autopilot record."
>
> **Recover:** "If you wipe a device, and delete the Windows Autopilot record before unlocking the UEFI (BIOS) menus, the menus remain locked. Intune can't send profile updates to unlock it. To unlock the device, open the UEFI (BIOS) menu, and refresh management from network. Recovery unlocks the menus, but leaves all UEFI (BIOS) settings set to the values in the previous Intune DFCI profile."
>
> **Reuse:** "If you plan to reset Windows to repurpose the device, then wipe the device. Do **not** remove the Windows Autopilot device record."

Also verbatim, on deletion of the profile:

> "Deleting the DFCI profile, or removing a device from the group assigned to the profile doesn't remove DFCI settings or re-enable the UEFI (BIOS) menus."

And the page's own warning:

> "Configuring and assigning DFCI profiles can lock the device beyond repair. So, pay attention to the values you configure."

**How to avoid:** the DFCI guide ships an ordered, numbered **exit runbook** (set `Allow local user to change UEFI (BIOS) settings` → `Only not configured settings`; set all other settings → `Not configured`; save; confirm unlock on a canary; *then* wipe; *then* delete the Autopilot record) and a separate **recovery runbook** ("refresh management from network" from the UEFI menu, with the explicit caveat that settings retain their last-profile values, not defaults). Note that "delete the profile" is a common instinct and is exactly the wrong move.

**Warning signs:** a retirement ticket where the wipe was performed before a DFCI profile change; devices in the disposal queue whose UEFI menu prompts for a management refresh.

**Phase:** Pillar A. This is the single highest-consequence item in the milestone — it destroys hardware value.

---

## Pitfall C1-3: DFCI category-vs-granular settings oscillate forever

**What goes wrong:** Admin sets both `Radios (Bluetooth, Wi-Fi, NFC, etc.)` and the granular `Wi-Fi` setting. The device flips between compliant and non-compliant on every sync, indefinitely.

**Why it happens:** **[SOURCED]** same page, "Conflicts", verbatim:

> "In the first sync attempt, the granular setting is applied (Microphones) and the category setting is noncompliant (Microphones and Speakers). With every sync with the Intune service after the first sync, the following behavior happens in a loop: Intune applies the category setting… the granular setting becomes noncompliant. Intune applies the granular setting… the category setting becomes noncompliant."

**How to avoid:** the DFCI settings-surface section states the rule as an invariant — *configure the category **or** the granular settings, never both* — and reproduces the page's own worked example (leave `Radios` Not configured, `Wi-Fi` Enable, all other granular radios Disabled). Put it in a callout, not a table cell.

**Warning signs:** a DFCI profile whose compliance percentage never settles; alternating Succeeded/Error in the per-setting report.

**Phase:** Pillar A.

---

## Pitfall C1-4: Per-OEM BIOS tooling no-ops or bricks on a password/prerequisite it never mentions

**What goes wrong:** A Dell/HP/Lenovo BIOS-configuration package deploys through Intune Win32, exits 0, and changes nothing — or a BIOS flash fails because a password is set.

**Why it happens:** **[SOURCED]** (vendor community/KB tier, **not** first-party spec — confidence MEDIUM, verify before publishing):
- Dell: BIOS update tooling fails on machines with a BIOS admin password configured; the BIOS password is *not* included in an exported/imported Dell Command configuration, so a cloned config silently arrives with a blank password; if an HDD or System password is set you cannot set the Setup password.
  Sources: `dell.com/support/kbdoc/en-us/000206452`, `dell.com/support/kbdoc/en-us/000187573`.
- HP: Sure Admin's Enhanced BIOS Authentication Mode plus a **Local Access Key (LAK)** replaces password-at-POST with a QR-code challenge — losing the LAK certificate/private key is the lockout path, not losing a password.
  Source: `developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl`.
- Lenovo: if a Supervisor password is set and `Flash BIOS Updating by End-Users` is not at its Enabled default, the flash is blocked until the setting is switched via Think BIOS Config; Lenovo ships no Dell-Command-equivalent client utility, so settings are scripted (WMI/PowerShell).
  Sources: `docs.lenovocdrt.com/ref/bios/bios_guide/`, `forums.lenovo.com` Think BIOS Config threads.

**How to avoid:** every per-OEM guide carries a mandatory **"Prerequisites that make this silently no-op"** H2 covering (a) where the BIOS/Supervisor/Setup password lives and how it is supplied to the tool, (b) the key/certificate escrow requirement, (c) the exit code the tool returns when it did nothing. Intune Win32 detection rules must assert the *resulting BIOS state*, not the installer's exit code — an exit-0 detection rule is the mechanism by which a fleet-wide no-op reports 100% success.

**Warning signs:** Win32 app 100% Installed with 0% of devices showing the intended BIOS setting; a settings-drift report that never moves.

**Phase:** Pillar A, per-OEM plans. Hold the "link-not-copy, Intune-delivery-shaped" guardrail from `PROJECT.md` — the prerequisite/lockout section is the part that must be *ours*; the settings reference stays a link.

---

## Pitfall C1-5: Firmware/BIOS settings that silently gate later OS features

**What goes wrong:** A hardening baseline disables virtualization or changes Secure Boot state; months later Hotpatch, Credential Guard, or WDAC quietly stop working on a subset of the fleet, and the update programme is blamed.

**Why it happens:** **[MEASURED]** The corpus already asserts the VBS→Hotpatch dependency at `docs/operations/patch-management/01-windows-wufb-rings.md:117-119`: *"VBS (Virtualization-Based Security) enabled at firmware + OS level — Hotpatch requires VBS… without VBS the device falls back to the classic monthly cumulative-update + reboot path."* **[SOURCED]** The Autopatch FAQ (ms.date 2026-05-28) corroborates: *"Devices might be temporarily ineligible because the devices don't have Virtualization-based Security (VBS) enabled and running."* The gap is that no firmware doc exists to carry the *other* direction of that dependency.

**How to avoid:** the firmware/BIOS capability matrix carries an explicit **"OS features gated by this setting"** column (virtualization → VBS → Hotpatch/Credential Guard; Secure Boot → attestation and this corpus's existing `docs/decision-trees/03-tpm-attestation.md`; TPM → Autopilot attestation). Cross-link into `docs/error-codes/02-tpm-attestation.md` and `docs/l2-runbooks/03-tpm-attestation.md`, which already exist.

**Warning signs:** Hotpatch policy reporting a stable population of "ineligible" devices; attestation failures clustered by hardware model.

**Phase:** Pillar A, plus one cross-link plan into the existing TPM/attestation docs.

---

## Pitfall C1-6: The corpus's dual-scan account is substantively right but its recommended mitigation is deprecated

**What goes wrong:** A reader follows mitigation option 3 and sets `DisableDualScan = 1` in 2026. It is the legacy lever.

**[MEASURED]** The existing account at `docs/operations/patch-management/01-windows-wufb-rings.md:169-197` is accurate on mechanism and symptom, verbatim:

> "The Windows Update Agent receives both the SCCM-WSUS scan source (because the WU workload is still ConfigMgr-authoritative) AND the WUfB-cloud scan source (because the driver/firmware policy targets the device through Intune) … Symptom: drivers reported as 'Available' then 'Not applicable' then 'Available' in successive scan cycles."

Its three mitigations are: (1) move the WU workload slider to Pilot Intune/Intune, (2) set the driver policy to Block automatic driver delivery, (3) GPO `HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\DisableDualScan = 1`.

**[SOURCED]** Windows Autopatch FAQ (ms.date 2026-05-28), verbatim:

> "Dual Scan for Windows has been deprecated and replaced with the [scan source policy](/windows/deployment/update/wufb-wsus). Windows Autopatch supports the scan source policy if the feature updates and Windows quality updates workloads are configured for Windows Update. If feature and Windows updates are configured for WSUS, it could cause disruptions to the service and your release schedules."

**There is a supported fourth answer, and it is the modern replacement for `DisableDualScan`.** **[SOURCED]** `learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq` (ms.date 2026-01-06, updated_at 2026-04-09), *"How do I use driver management if I'm currently using Configuration Manager for updates?"*, verbatim:

> "The recommended and preferred path to embrace cloud based updates is to move the Windows Update workload to Intune. If your organization isn't ready for this, you can use the Driver and Firmware management capability in Intune without moving the workload by completing the following steps:"
>
> *Note:* "The following procedure is supported for Windows 11 devices. For Windows 10 devices, we recommend moving the Windows Update workload in the Configuration Manager co-management settings to Intune. Alternatively, configure the Windows Update workload to the Pilot setting and specify a collection containing the in-scope Windows 10 managed devices."
>
> "1. Leave the Windows Update workload set to Configuration Manager.
> 2. Configure your driver policies in Intune to enroll devices and get them ready for management…
> 3. Configure a domain-based group policy to configure **Windows Update** as the source for **Driver Updates** using the [Specify source for specific classes of Windows Updates policy]…
> 4. Enable data collection in Intune for devices that you wish to deploy drivers and firmware to."

Steps 5 and 6 (optional) cover enforcing diagnostic-data submission and device-name collection, both prerequisites for Windows Update reports.

And the warning that makes this a Class-1 pitfall rather than a recipe — verbatim, attached to step 3:

> "Because Configuration Manager uses a local group policy to configure the update source policy, using Intune or a CSP to attempt to configure these same settings result in an undefined and unpredictable device state."

Also verbatim from the same answer: *"Using Update Ring policies in Intune for Quality or Feature Updates requires you to move the **Windows Update** workload to Intune."*

**Verdict per the brief's instruction to verify rather than re-derive:** mechanism and symptom **CONFIRMED, keep verbatim**. Mitigation 1 (move the workload) **CONFIRMED as the recommended and preferred path** — but it is **not** "the only Autopatch-compatible answer": the four-step co-existence procedure above is first-party supported on Windows 11 and leaves the workload on ConfigMgr. Mitigation 3 is **STALE** — re-label it as the legacy/pre-scan-source lever, superseded by the per-classification scan source policy, which is the same `wufb-wsus` policy step 3 invokes.

**How to avoid:** amend in place, keep the existing prose (see Class-2 Pitfall 1 — `V-54-13` pins a `dual-scan` token in this file, so the phrase must survive the edit). Add the four-step procedure as a named co-existence path with the "undefined and unpredictable device state" warning in a callout, and state the Windows 10 exception explicitly — the procedure is Windows-11-only.

**Phase:** Pillar B (drivers) / the freshness re-verification pillar.

---

## Pitfall C1-7: Driver regressions cannot be rolled back, so ring promotion is the only control

**What goes wrong:** A recommended driver is auto-approved, breaks a device class fleet-wide, and there is no rollback lever.

**Why it happens:** **[SOURCED]** `learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq` (ms.date 2026-01-06, updated_at 2026-04-09), *"Can I use policy to roll back a driver update?"* — **fetched and quoted verbatim from the page this pass**:

> "No. Windows Update client policies don't currently support driver rollback. While rollback could be scripted, there are too many potential variables to provide a useful sample script for doing so. **If you must remove a driver, consider manual methods like PowerShell. To help avoid issues that require rolling back a driver from large numbers of devices, use** *deployment rings* to limit driver installation to small initial groups of devices. This approach allows time to evaluate the success or compatibility of a driver before broadly deploying it across your organization."

Two things follow, and an earlier draft of this file got both wrong. **(1)** The bridging clause is *"If you must remove a driver, consider manual methods like PowerShell. To help avoid issues that require rolling back a driver from large numbers of devices, use…"* — not "To help mitigate this limitation, use…". **(2)** The elided sentence is not filler: **the manual-recovery path this file recommends below is first-party, not our invention.** Learn names PowerShell explicitly. Cite it; do not present it as our own design.

Same page, on multiple policies: *"While the use of multiple policies per device is supported, we don't recommend doing so… Because the status of* approved *always wins, the driver installs on the device despite any other status for that update that is set in any other policy."*

**[SOURCED] Drivers do not participate in Autopilot at all — and something else does.** Same page, "Deployment scenarios", verbatim:

> "**Can I apply driver update policies during Windows Autopilot?** No. Driver updates aren't supported during Windows Autopilot at this time."
>
> *Note:* "Windows applies critical updates during Windows Autopilot. These updates may include critical driver updates that have not yet been approved by an admin."

In an Autopilot corpus adding a driver pillar this is the highest-value single answer on the page, and it was absent from every prior draft. It has two consequences that must be stated as a pair: an admin **cannot** stage drivers into provisioning via a driver update policy, **and** the device may nevertheless take an unapproved critical driver during OOBE. The approval gate is not a provisioning-time gate — a first-boot driver regression is not a policy failure and is not preventable by ring design.

**[MEASURED]** The existing corpus does not mention rollback at all: `grep -n "rollback\|roll back" docs/operations/patch-management/01-windows-wufb-rings.md` returns nothing in the driver section (the file's only driver-risk lever is the promotion gate at `:57-62`).

**How to avoid:** the driver guide states "there is no rollback" as a headline constraint, then derives the whole ring/approval design from it: manual approval for Pilot, automatic approval only after a Pilot soak, and the **first-party** manual recovery path — pause the policy, then remove the driver by manual methods, *"like PowerShell"* per Learn (`pnputil` per device class in practice) — quoted as Microsoft's instruction rather than presented as our recommendation. Stack-two-policies-on-one-device is also called out — one device, one driver policy, because *approved always wins*. Add an explicit **"drivers during Autopilot"** subsection carrying both halves of the FAQ answer above.

**Warning signs:** a driver policy with automatic approval enabled and no separate Pilot policy; a promotion gate that checks compliance percentage but not driver-regression incident count; a driver regression first observed on freshly provisioned devices (that is the unapproved-critical-driver path, not a policy leak).

**Phase:** Pillar B.

---

## Pitfall C1-8: The corpus's Autopatch "mutual exclusion" (PITFALL-9) is at best dated

**What goes wrong:** The doc tells a reader that WUfB deployment rings and Autopatch rings *cannot coexist on the same device*; the reader designs a migration around a hard cutover that the product no longer requires.

**[MEASURED]** `docs/operations/patch-management/01-windows-wufb-rings.md:77-83`, verbatim:

> "**PITFALL-9 mutual exclusion:** WUfB deployment rings and Autopatch rings are **mutually exclusive** — they cannot coexist on the same device. When a tenant enables Windows Autopatch, Autopatch … deployment ring OR an Autopatch ring — never both simultaneously."

**[SOURCED]** Autopatch FAQ (ms.date 2026-05-28) describes a different, coexisting model:

> "Microsoft Intune is dependent on Windows Autopatch deployment service for the following policies: 1. Quality update policies 2. Expedited update policies 3. Feature update policies 4. Driver update policies."
> "When there's an issue with an update, Windows Autopatch provides tools in Microsoft Intune to help you act to address it: Pause, resume, or roll back quality and feature updates using **update rings**. Pause or resume specific driver updates using **Windows Driver update policies**."
> "Windows Autopatch groups… automate the creation of multiple update policies based on your settings… with update policies you are required to manage all configuration and policy assignments yourself."

**[SOURCED]** `learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview` (ms.date 2025-06-17, updated_at 2026-06-19), "What are Windows Autopatch groups?", verbatim:

> "An Autopatch group is a logical container or unit that groups several Microsoft Entra groups, **and software update policies, such as Update rings policy for Windows 10 and later**, feature updates for Windows 10 and later policies, driver update policies, Microsoft 365 App update policies, and Microsoft Edge update policies."

This is the load-bearing refutation: an Autopatch group **contains** update-ring policy objects. Two things that stand in a containment relation cannot be mutually exclusive mechanisms.

And the FAQ (ms.date 2026-05-28), verbatim: *"Since Windows Autopatch groups create and manage update policies, the set of capabilities are the same. However, with update policies you are required to manage all configuration and policy assignments yourself."*

**Verdict:** the *operational advice* ("don't hand-assign a custom update ring to an Autopatch-managed device") survives. The *stated mechanism* ("cannot coexist", "never both simultaneously") is **false**, on the containment quote above.

**One argument used in an earlier draft is withdrawn as invalid.** That draft reasoned that the FAQ's *"Pause, resume, or roll back quality and feature updates using update rings"* instruction contradicts per-device exclusivity. It does not: those **are** the Autopatch-created ring objects — the FAQ says so four answers later (*"Since Windows Autopatch groups create and manage update policies…"*). An instruction to use the rings the service itself created is fully consistent with a claim that admin-authored rings can't coexist. The conclusion was right; that inference was not, and it was stated flatly while the weaker half carried `[PREMISE]`. Use the containment quote as the evidence, not the pause/resume instruction.

**[PREMISE]** I still found no first-party statement that the product ever hard-blocked coexistence; the corpus's claim may have been an over-strong rendering of the guidance from the start. That premise is not needed for the correction — the containment quote carries it.

**The correction is bigger than PITFALL-9, and the C11 exposure is in a different file than the obvious one.** **[MEASURED]** the false mutual-exclusivity claim appears **three** times in `docs/operations/patch-management/00-overview.md` — not once, and not only in `01-windows-wufb-rings.md`:

| Site | Text |
|---|---|
| `00-overview.md:67` | *"**Autopatch ring** are mutually exclusive concepts; they cannot coexist on the same device."* |
| `00-overview.md:76-77` | *"Autopatch is mutually exclusive with WUfB deployment rings; enabling Autopatch detaches devices from any pre-existing WUfB deployment ring assignment."* |
| `00-overview.md:84-86` | *"…are NOT gated by WUfB deployment rings or Autopatch rings…"* / *"The mutual-exclusion property of WUfB deployment rings and Autopatch rings is a frequent source of admin confusion…"* |
| `01-windows-wufb-rings.md:77` | the `PITFALL-9` blockquote (the site every prior draft named) |

**[MEASURED] The C11 collision is at `00-overview.md:78`, not `01-windows-wufb-rings.md:77`.** Of the twelve corpus lines matching a C11 ops pattern, exactly **one** is kept green *solely* by the literal `mutually exclusive`: `00-overview.md:78`'s `Autopatch rings`, whose only allowlisted keyword within ±200 chars is the `mutually` / `exclusive` pair at `:76-77`. `01-windows-wufb-rings.md:77` is independently green via its own `PITFALL-9` literal, which is also on the allowlist and which the rewrite keeps. **So the file that breaks C11 when "mutually exclusive" is deleted is `00-overview.md`, and a rewrite scoped to `01-windows-wufb-rings.md` will both miss two-thirds of the false claim and break the one line it was trying to protect.**

**How to avoid:** rewrite all four sites from a *mechanism* claim to a *design* claim: "Autopatch groups own the update-ring policy objects for their devices; hand-authored update rings targeting the same devices produce competing configuration and are unsupported." **Do this carefully:**

- `V-54-09` pins a `## Ring Terminology` H2 plus WUfB-ring and Autopatch-ring tokens within ~10 lines in `00-overview.md`, and `V-54-10` pins deferral-vs-enforcement prose in the same file — **`00-overview.md:70–83` sits under both simultaneously**, so the edit window is doubly constrained.
- `V-54-11` bans every unqualified `ring` token in `01-windows-wufb-rings.md`.
- C11 requires a disambiguation keyword within ±200 chars of every `Autopatch rings` occurrence — so at `00-overview.md:78`, substitute another allowlisted keyword (`disambiguation`, `co-management`, `successor`, `PITFALL-9`) **in the same paragraph** before removing `mutually exclusive`, not after.

See Class-2 Pitfall 1 and Class-2 Pitfall 2.

**Warning signs:** any v1.21 draft that repeats "mutually exclusive" without a citation dated after 2026-05-28.

**Phase:** Pillar C (Autopatch) — and it is a *correction*, so it must be planned as a correction with its own evidence line, not slipped into a new-content plan.

---

## Pitfall C1-9: Autopatch/Hotpatch licensing and eligibility are understated in the corpus

**[MEASURED]** `01-windows-wufb-rings.md:115-123` lists Hotpatch prerequisites as: Windows 11 **Enterprise** 24H2+, VBS enabled, "eligible processor", ring assignment.

**[SOURCED]** Autopatch FAQ (ms.date 2026-05-28), verbatim eligibility:

> "Windows 11 Enterprise E3 or E5, Windows 11 Enterprise F3, Windows 11 Education A3 or A5, Microsoft 365 Business Premium, or a Windows 365 Enterprise license. Additionally, devices must have the following… Windows 11, version 24H2 (Build 26100.2033 or later) and on the current baseline…; an x64 (AMD/Intel) CPU; Microsoft Intune for managing the deployment of hotpatch updates with a hotpatch-enabled Windows quality update policy; Virtualization-based Security (VBS) enabled."

and separately:

> "**Can I use hotpatch updates on Arm64 devices?** Yes, hotpatch updates are available for Arm64 devices" (with CHPE disabled).

> "There are no hotpatch updates for you to test in January, April, July, or October."

Autopatch itself: *"a cloud service included in Windows volume licensing"*; supports Entra hybrid-joined and Entra-joined, **not** on-prem-domain-joined-only; co-managed devices supported with additional ConfigMgr prerequisites; not supported in GCC High or DoD.

**[SOURCED, re-fetched by the orchestrator 2026-08-19] Licence-list conflict with STACK.md — RESOLVED IN STACK.md's FAVOUR. This file was wrong.** An earlier revision of this note claimed the opposite. Direct fetch of `learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates` (`ms.date` 2026-05-28, `updated_at` 2026-06-02) gives the current list verbatim:

> One of the eligible licenses: Windows 11 Enterprise E3 or E5, **Microsoft 365 F3**, Windows 11 Education A3 or A5, Microsoft 365 Business Premium, or Windows 365 Enterprise

**The block quoted above is a STALE REVISION of the page**, not a different page — it carries `Build 26100.2033 or later` and `an x64 (AMD/Intel) CPU`, neither of which the current page states, because Arm64 is now supported with CHPE disabled (`HotPatchRestrictions=1`). Do not carry the quoted block into any deliverable. The correct SKU is **Microsoft 365 F3**; the correct CPU statement is **not x64-only**; and the build-number floor should not be asserted without re-verification.

**Lesson for the requirements author:** two independent agents each "re-fetched and verified" this sentence and reached opposite conclusions, because one of them received a cached or superseded revision. For any claim an admin acts on — licence SKUs above all — cite the page's `ms.date`/`updated_at` alongside the quote, so a stale read is detectable rather than merely confident.

*(Note: `configure-hotpatch` carries **no** licence list of its own — it defers to "Quality update prerequisites" — so `windows-autopatch-hotpatch-updates` is the sole first-party source for this list.)*

**Gaps to close:** M365 Business Premium / Education / W365 eligibility (absent), the specific build floor `26100.2033`, the Arm64 answer (**RESOLVED 2026-08-19** — the x64-only eligibility line came from a stale revision and is gone from the current page; Arm64 **is** supported provided CHPE is disabled via `HotPatchRestrictions=1`, one-time, restart required. Document Arm64 as supported-with-a-prerequisite, not as an exclusion), the four baseline months with no hotpatch, the identity requirement, and the GCC High/DoD exclusion.

**Phase:** Pillar C.

---

## Pitfall C1-10: Two forward-looking claims in the corpus were written *before* the events they describe and have never been re-verified

**[MEASURED]** `01-windows-wufb-rings.md` front matter: `last_verified: 2026-04-28`. Its body asserts (`:125-141`):

> "**Default-on behavior (May 2026 onwards):** From May 2026, eligible Windows 11 Enterprise 24H2+ devices receive Hotpatch by default without admin intervention — the prior opt-in model is inverted."
> "**Opt-out toggle (April 2026 Intune admin center addition):** … The opt-out toggle landed in the Intune admin center in April 2026, one month ahead of the May 2026 default-on cutover."

Both were future/near-present at authoring time. **I could not corroborate either in the Autopatch FAQ at ms.date 2026-05-28**, which still frames hotpatch as an opt-in via a hotpatch-enabled quality update policy ("How do I enroll devices to receive hotpatch updates?"). **[PREMISE]** This does not prove the corpus is wrong — the FAQ may simply not restate a default-on flip — but it means the claim is **unverified after the fact**, and `V-54-12` *hard-pins* the tokens `default`, `May 2026`, `VBS`, and (`opt-out` OR `April 2026`) in this file, so the claim cannot be quietly dropped.

**How to avoid:** treat "claims written before the dated event they predict" as a first-class freshness category. The freshness pillar's success criterion should be *"every date-bearing forward claim in the five patch-management docs is either re-confirmed against a source dated after the event, or rewritten"* — not merely *"`last_verified` bumped"*. A bumped date over an unverified prediction is the worst outcome: it launders a guess into a verified fact.

**Warning signs:** any doc where `last_verified` predates a date asserted in its own body.

**Phase:** the freshness re-verification pillar, as a named, evidence-producing task.

---

## Pitfall C1-11: The Android 2026-10-31 deadline is 73 days out and its third stage is uncorroborated

**[MEASURED]** `docs/operations/patch-management/04-android-patch-delivery.md:89-92`, verbatim:

> "> ⚠️ **Hard deadline (Oct 31 2026):** MEETS_STRONG_INTEGRITY enforcement: Google enforced May 2025; Intune enforced September 30 2025; fleet compliance deadline October 31 2026. Android 13+ devices must have a security patch ≤12 months old. Devices not meeting this threshold will fail Intune compliance after Oct 31 2026."

**[SOURCED]** Corroborated: Google's May 2025 behavioural change and Intune's 2025-09-30 enforcement are both documented (`techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130`); the ≤12-month patch requirement on Android 13+ is confirmed by `developer.android.com/google/play/integrity/verdicts` (*"MEETS_STRONG_INTEGRITY… requires MEETS_DEVICE_INTEGRITY and security updates in the last year for all partitions"*).
**NOT corroborated:** the specific **October 31 2026 fleet-compliance deadline**. My searches surfaced the 2025 dates repeatedly and not this one.

**What breaks for an unprepared fleet:** any Android 13+ device whose OEM has stopped shipping security patches (or whose patch is >12 months old) stops returning `MEETS_STRONG_INTEGRITY`, fails the Intune compliance policy that requires it, and is then blocked by any Conditional Access grant requiring compliance — i.e. the device keeps working but loses corporate access. Migration path: audit patch age per model against OEM support windows (this corpus already covers Zebra LifeGuard OTA and Samsung KSP cadence at `:163` and `:194`), relax the compliance policy to `MEETS_DEVICE_INTEGRITY` for a documented exception population, or replace hardware.

**How to avoid:** the deadline is 73 days out as of 2026-08-19. Re-verify the Oct-31 claim against a first-party source **before** v1.21 restates it, and if it cannot be sourced, rewrite it as "OEM patch-age enforcement is continuous; audit now" rather than inventing a different date. Note `V-54-22/23/24` pin the three-layer deadline structure and the verbatim blockquote — see Class-2 Pitfall 1.

**Phase:** the freshness pillar, urgently (this deadline may fire before v1.21 ships).

---

## Pitfall C1-12: The Apple OS 26 legacy-MDM removal is a real cliff and the corpus's account is directionally right

**[MEASURED]** `docs/operations/patch-management/02-macos-update-enforcement.md`, verbatim:

> "> ⚠️ **Hard deadline (Apple OS 26):** forceDelayedSoftwareUpdates, com.apple.SoftwareUpdate payload, and ScheduleOSUpdate MDM command are deprecated AND removed with Apple OS 26. DDM 'Software Update Enforce Latest' in Intune Settings Catalog is the only forward-compatible enforcement path. Migration MUST land before Apple OS 26 release."

**[SOURCED, secondary — vendor blogs, not Apple]** Corroborated in substance: iOS/iPadOS/macOS 26 deprecate legacy software-update management (MDM commands, restrictions, the `com.apple.SoftwareUpdate` payload, MDM update queries), with full removal at the 2026 OS release; DDM is the forward path.
Sources: `hub.ivanti.com` (Apple deprecates legacy software update management in iOS/iPadOS and macOS 26), `scudra.ca/the-complete-ddm-migration-guide`, `addigy.com/blog/os-26-device-management-migration/`.

**What breaks:** update *enforcement* silently stops. Devices are not blocked and report no error — the deadline/deferral simply stops being applied, so a fleet drifts unpatched while the console still shows a policy assigned. That silence is the pitfall: there is no red state to alarm on.

**Also surfaced and not in the corpus [SOURCED, secondary]:** OS 26 adds **MDM-to-MDM migration** with a `Set deadline` option and support for removing/reinstalling non-removable MDM profiles without a wipe. Relevant to this corpus's existing `docs/l2-runbooks/30-macos-mdm-migration-failure.md` and `docs/operations/drift-migration/04-tenant-migration-runbook.md`.

**How to avoid:** the migration path is documented as a *detection* problem first (how do you prove enforcement is still happening?) and only then as a settings swap to DDM `Software Update Enforce Latest`. `V-54-14/15/16/17` pin the three-layer structure and the verbatim blockquote in this file — see Class-2 Pitfall 1.

**Phase:** the freshness pillar. Confidence MEDIUM — every source is a third-party MDM vendor. **Flag: no Apple first-party citation obtained.**

---

## Pitfall C1-13: A root-context `apt upgrade` runs every 15 minutes, fleet-wide, by default

**What goes wrong:** An Intune Linux platform script is written to run `apt upgrade`. It is set to **Root** execution context, because that is the only context in which a system upgrade can work. Nobody changes the **Execution frequency**, whose default is **Every 15 minutes**. Every managed Linux device now attempts a privileged package upgrade ninety-six times a day: overlapping `dpkg` runs contending for `/var/lib/dpkg/lock`, an unmeasured network and mirror load proportional to fleet size, and — because the device never reboots — a fleet that reports "patched" while running the old kernel.

**Why it happens:** **[SOURCED]** `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-custom-settings-linux` (ms.date 2025-01-09, updated_at 2026-07-01), "Configuration settings", verbatim:

> - "**Execution context**: Select the context the script is executed in. Your options:
>     - **User** (default): When a user signs in to the device, the script runs. If a user never signs into the device, or there isn't any user affinity, then the script doesn't run.
>     - **Root**: The script always runs (with or without users logged in) at the device level. The first time the script executes, the end user might have to consent. After they consent, it should continue to execute on its schedule."
> - "**Execution frequency**: Select how frequently the script is executed. The default is **Every 15 minutes**."
> - "**Execution retries**: If the script fails, enter how many times Intune should retry running the script. The default is **No retries**."

**The page documents no run-time cap at all.** The failure mode is not a timeout — it is unbounded repetition of a privileged operation on an interval nobody chose.

The three defaults compound: the *context* default (**User**) silently no-ops on a userless device, so the author switches to **Root**; the *frequency* default (**Every 15 minutes**) is then inherited unexamined; and the *retry* default (**No retries**) means a genuine failure is invisible rather than escalating. An author who fixes the first default and not the second has built the hazard.

**The 5-minute cap is real but belongs to a different surface — do not apply it here.** **[SOURCED]** `learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script` (ms.date 2025-09-04, updated_at 2026-07-15), "## Limits", verbatim:

> "To successfully return compliance data to Intune, your scripts must stay within the following limits:
> - Scripts can be no larger than 1 megabyte (MB) each.
> - Output generated by each script can be no larger than 1 MB.
> - Scripts must have a limited run time:
>     - On Linux, scripts must take five minutes or less to run.
>     - On macOS, scripts must take 10 minutes or less to run.
>     - On Windows, scripts must take 10 minutes or less to run."

and, from the same page's Linux section:

> "On Linux, discovery scripts run in the user's context. They can't check for system-level settings that require elevation. An example of this limitation is the `state/hash` of the `/etc/sudoers` file."

These are **custom compliance discovery scripts** — the read-only surface that reports settings back for a compliance policy. They are a different Intune feature from **platform scripts** (Devices > Scripts and remediations > Platform scripts), which is the surface that would run `apt upgrade`. An earlier draft of this file transplanted the discovery-script cap onto the platform-script surface and derived a systemd hand-off mandate from it. **That mandate mitigated a constraint that does not apply, and it displaced the constraint that does.** A systemd timer may still be good practice for other reasons — it is not a validator-grade requirement and must not be written as one.

The elevation limit does still bite, in its own lane: a compliance rule cannot read a root-owned patch-state file, so "is this device patched?" cannot be answered from a discovery script that needs elevation.

**On Ubuntu, the reboot never happens by itself.** **[SOURCED, secondary]** `unattended-upgrades` will **never** reboot unless `Unattended-Upgrade::Automatic-Reboot "true"` is set; Canonical documents the default as `false`. Source for that half: `ubuntu.com/server/docs/how-to/software/automatic-updates/`. **[CORRECTED 2026-08-21 — attribution defect, Phase 147 D-32]** The second half of the original claim — that `update-notifier-common` must also be installed, and is absent on minimal installs — was credited to that same Canonical page, which does **not** carry it: `update-notifier-common` occurs **zero** times there, and the page's only `update-notifier` hit is a same-prefix **decoy** describing the graphical postpone-prompt client, an unrelated feature. The claim is **not deleted** — it is recorded as carrying **no first-party source found in Phase 147's fetch pass**; `help.ubuntu.com/community/AutomaticSecurityUpdates` is a community wiki, not first-party. Treat it as a documented silence, never as a sourced prerequisite.

**[SOURCED] The supported-distro list is two LTS generations newer than the one an earlier draft carried.** That draft said "Ubuntu Desktop 20.04+ and RHEL 8/9", sourced to a 4sysops blog. First-party `learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms` (ms.date 2025-10-14, updated_at 2026-07-01), "### Linux", verbatim:

> - "Ubuntu Desktop 24.04 and 26.04 LTS with a GNOME graphical desktop environment
> - Ubuntu LTS, version 24.04 and 26.04
> - RedHat Enterprise Linux 9
> - RedHat Enterprise Linux 10"

**Note the intra-Microsoft conflict, and reproduce it rather than picking a side:** `configure-custom-settings-linux`'s own Prerequisites still read *"**Linux Ubuntu Desktop**, **RedHat Enterprise Linux 8**, or **RedHat Enterprise Linux 9**"* while linking to `ref-supported-platforms` for "a list of the supported versions" — which says RHEL **9/10**. RHEL 8 is named as supported on one page and absent from the other. This matters directly: this pitfall sits inside the guidance routed to Pillar D, the pillar whose job is the Ubuntu 22.04 currency sweep. **Shipping a stale distro list inside the currency correction is the specific self-inflicted failure to avoid.**

**[MEASURED]** The corpus has a Linux glossary and admin-setup tree (`docs/admin-setup-linux/`, 6 files) but `docs/operations/patch-management/` is 4-platform — there is no Linux patch-management doc. `PROJECT.md`'s own measured baseline says the same.

**How to avoid:** the Linux update doc must (a) state the **Execution frequency** default (`Every 15 minutes`) and require an explicit, justified value on every Root-context script — this is the single most important sentence in the Linux pillar; (b) state the Root-vs-User trade-off as a pair, so the author who needs Root sees the frequency consequence in the same breath; (c) never present a package-upgrade script as idempotent-by-default — make lock contention and concurrent-run behaviour an explicit design point; (d) state the `update-notifier-common` + `Automatic-Reboot` pair as a single mandatory prerequisite; (e) define the reboot-required detection signal (`/var/run/reboot-required`) and make it the compliance/custom-attribute source rather than package version; (f) keep the compliance-discovery-script limits (5 min on Linux, 1 MB script, 1 MB output, user-context/no-elevation) in the **compliance** section, clearly labelled as a different surface.

**Warning signs:** any Linux platform script with **Execution context: Root** whose **Execution frequency** was never changed from the default; a compliance rule that reads installed package version but never reads `/var/run/reboot-required`; a Linux doc quoting "five minutes" anywhere outside a compliance-discovery context; a distro list naming Ubuntu 20.04/22.04 or RHEL 8.

**Phase:** Pillar D (Linux).

---

## Pitfall C1-14: Update policy conflicts — the corpus has a reference doc that must not be duplicated

**[MEASURED]** `docs/reference/security-baseline-conflicts.md` exists (RE-registered, `last_verified: 2026-04-13`, `review_by: 2026-07-12`, cycle 90 d, **37 days past due** as of 2026-08-19).

**What goes wrong when v1.21 ignores it:** the update pillars each re-derive their own conflict story, producing three partial accounts and a retrieval problem in the SharePoint index (the same query returns four documents that disagree).

**[MEASURED] This file is not special — being past due is the corpus's normal state, and nothing enforces it.** Computed against 2026-08-19 over `docs/**/*.md`:

```
docs carrying both dates : 271
review_by already elapsed: 217   (~80% of the corpus)
worst overdue            : 71 d  (docs/apv1-vs-apv2.md)
the five patch-management files: 53 d overdue each, 60-day cycle
```

*(A fresh walk excluding `docs/graphify-out/` returns 216 of 270 — a one-file walk-scope delta in the 60-day bucket, not a disagreement.)*

**[MEASURED] No validator compares `review_by` to the current date.** `grep -rn "Date.now()\|new Date()" scripts/validation/` returns exactly three hits, none of them a freshness gate: `regenerate-supervision-pins.mjs:364` (a timestamp emitter) and `_lib/frozen-at-close.mjs:469,472` (an elapsed-time pair). Every date rule in the harness compares `review_by` to `last_verified` — a *cycle-length* test — and none compares either to *today*. **A doc can be a year past due and every workflow stays green.**

This reframes the whole freshness question. 217 past-due docs are not a v1.21 blocker and not a v1.21 workload: **route them to BACKLOG as a standing corpus-hygiene item.** Pillar E stays scoped to the five `patch-management/` files (53 d overdue, and the files v1.21 rewrites anyway) plus whatever else v1.21 modifies. Refreshing `security-baseline-conflicts.md` is in scope only because the update pillars link into it.

**How to avoid:** conflict *resolution semantics* stay in `security-baseline-conflicts.md` — the new update docs link to it and add only the update-specific rows. **[MEASURED]** No validator pins this file's content (`grep -rn "security-baseline-conflicts" scripts/` → no validator hits), so it is safe to edit.

**Phase:** the freshness pillar (five files) plus a link-only task in each update pillar; the 217-doc backlog is explicitly **out** of v1.21.

---

## Pitfall C1-15: Deadline/grace-period behaviour that surprises admins

**What goes wrong:** Admins report "the deadline didn't fire". Almost always one of: the device has not checked in (so no policy evaluation happened at all), active hours suppress the restart, the grace period restarts the clock, or a second update policy targets the same device.

**[MEASURED]** The corpus's existing account at `:44-62` covers deferral/deadline/grace and the promotion gate but frames deadline behaviour only from the policy side ("After the deadline elapses, the WUfB deployment ring policy can force-install pending updates and trigger a reboot"). There is no check-in/telemetry-lag treatment.

**How to avoid:** add a **"the deadline appears not to fire"** troubleshooting sequence ordered by frequency: (1) last check-in timestamp, (2) active hours window vs. deadline, (3) grace period value, (4) competing policy on the same device, (5) scan source (see C1-6). Order matters — this corpus's L1/L2 runbook convention is frequency-ordered. **[PREMISE]** that ordering is my judgement, not a measured incident distribution.

**Phase:** Pillar B/C, or a small L2 runbook addition.

---

# CLASS 2 — Repo-Mechanical Pitfalls (plan-time guardrails)

## Class-2 Pitfall 1: `check-phase-54.mjs` — 32 live-HEAD assertions on the five files v1.21 rewrites

**What goes wrong:** any of 32 assertions breaks the apex, six-plus workflows, and the phase's own verification.

**[MEASURED]** File is frozen (v1.5-era, `Source of truth: 54-CONTEXT.md`), reads live HEAD, currently 32/32. The pinned-path block is `:23-35` and has **twelve** constants, not five — the six beyond `PATCH_FILES` are the ones that reach outside `patch-management/` and are where the surprises live:

```js
const OV   = "docs/operations/patch-management/00-overview.md";
const WIN  = "docs/operations/patch-management/01-windows-wufb-rings.md";
const MAC  = "docs/operations/patch-management/02-macos-update-enforcement.md";
const IOS  = "docs/operations/patch-management/03-ios-update-lifecycle.md";
const AND_ = "docs/operations/patch-management/04-android-patch-delivery.md";
const RETROFIT_IOS = "docs/admin-setup-ios/07-device-enrollment.md";
const FORWARDLINK_IOS = "docs/admin-setup-ios/04-configuration-profiles.md";
const REQ  = ".planning/REQUIREMENTS.md";
const ROAD = ".planning/ROADMAP.md";
const OPS_INDEX = "docs/operations/00-index.md";
const VAL  = "scripts/validation/check-phase-54.mjs";

const PATCH_FILES = [OV, WIN, MAC, IOS, AND_];
```

*(Reproduced with the file's own alignment; an earlier draft normalised the whitespace, cited the range as `:22-34`, and showed only six of the twelve lines while presenting the fence as verbatim.)*

**The constraints v1.21 must honour, by assertion:**

| Assertion | Constraint on v1.21's edits |
|---|---|
| `V-54-01..05` | The five filenames are **immutable**. No rename, no split, no move. New content is new files alongside them. |
| `V-54-06` | *"check-phase-54.mjs exists (self-referential)"* — the validator asserts its own presence. **The validator file itself is a pinned path (`VAL`, `:33`).** Any Pillar-H sweep that renames, relocates or consolidates `scripts/validation/check-phase-54.mjs` fails this before it fails anything else. Omitted from the earlier draft of a table titled "the full constraint surface". |
| `V-54-07` | Each file's `platform:` must match an exact regex: `00-overview.md` → `cross-platform` **or** `Windows, macOS, iOS, Android`; the other four → exactly `Windows`/`macOS`/`iOS`/`Android`. **A 5-platform milestone cannot re-label `00-overview.md` `platform:` to include Linux** without breaking this. Also: `audience:` non-empty, and `review_by − last_verified` **must be ≤ 60 days** — not 90. All five sit at exactly 60 today. |
| `V-54-08` | `00-overview.md` must keep a 4-platform comparison table (Windows + macOS + iOS + Android). Adding a Linux column is fine; removing/restructuring the table is not. |
| `V-54-09` | `## Ring Terminology` H2 in `00-overview.md`, with a WUfB-deployment-ring and an Autopatch-ring token within ~10 lines. |
| `V-54-10` | `00-overview.md` keeps deferral-vs-enforcement distinguishing prose. |
| `V-54-11` | **In `01-windows-wufb-rings.md`, every `ring`/`rings` token outside headings, fences and anchors must be preceded within ~40 chars by `WUfB deployment`, `Autopatch`, `Update`, or `deployment`.** Exemptions: `Ring Terminology` (followed by "Terminology"), and `NOT a ring`/`not a ring` when a qualifier appears in the next 80 chars. This is the single easiest assertion to break — "ring promotion", "the ring", "both rings" all fail. |
| `V-54-12` | Hotpatch H2 plus tokens `default`, `May 2026`, `VBS`, and (`opt-out` OR `April 2026`) must survive. See C1-10 — you may not silently delete the unverified May-2026 claim. |
| `V-54-13` | A driver/firmware H2 **and** a `dual-scan` token must survive in `01-windows-wufb-rings.md`. See C1-6. |
| `V-54-14..17` | macOS three-layer hard-deadline structure: `[HARD-DEADLINE]` in the legacy-command table row, a `## Deadlines & Cutover Dates` H2, the **verbatim** blockquote `> ⚠️ **Hard deadline (Apple OS 26):**` plus 5 tokens, ≥2 inline `[HARD-DEADLINE` reminders (≥5 total), DDM-only literal coverage. |
| `V-54-18..20` | iOS DDM unsupervised-retraction literals; the `docs/admin-setup-ios/07-device-enrollment.md:35` retrofit; the `docs/admin-setup-ios/04-configuration-profiles.md` forward-link. **These reach outside `patch-management/`.** |
| `V-54-21` | `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md` must contain **zero** occurrences of the literal formed by `05-compliance-` + `policy.md`. v1.21's roadmap/requirements must never cite that filename — and both files are read **live**, so this fires from the planning artifacts, not the corpus. **This row is written split on purpose:** the assertion scans `.planning/`, and this research file is consumed while those two artifacts are being authored, so any draft that copy-pastes a whole-literal rendering into `REQUIREMENTS.md` or `ROADMAP.md` arms the trap it is warning about. Keep the split form everywhere the name is discussed. |
| `V-54-22..25` | Android three-layer deadline: `[HARD-DEADLINE]` in the `MEETS_STRONG_INTEGRITY` table row, `## Deadlines & Cutover Dates` H2, verbatim `> ⚠️ **Hard deadline (Oct 31 2026):**` + cascade dates + `Android 13+` + `12 months`, ≥2 inline reminders (≥4 total), Zebra LifeGuard + Samsung KSP coverage. See C1-11 — **the Oct-31 blockquote is pinned verbatim, so "just correct the date" is a validator-breaking edit.** |
| `V-54-26` | `> **Platform applicability:**` blockquote within the **first 50 body lines** of all five files. |
| `V-54-27` | **NEGATIVE, corpus-wide:** zero line-start `> **Platform:**` tokens across **`docs/` AND `.planning/`** recursive `.md` walk (fences and inline code stripped). This binds every planning artifact v1.21 writes, including CONTEXT/PLAN/RESEARCH files. |
| `V-54-28` | **`docs/operations/00-index.md` must NOT contain a `## Patch Management` H2.** v1.21 will want to wire new update content into the ops index — this exact heading is barred. Use any other heading text. |
| `V-54-29` | `00-overview.md` body prose (tables, fences, links, inline code stripped) must NOT contain `Hotpatch`, `VBS`, or `MEETS_STRONG_INTEGRITY`. A "what's new in v1.21" paragraph in the overview will trip this. |
| `V-54-30` | No `TBD`/`TODO`/`FIXME`/`XXX`/`PLACEHOLDER` in the five files outside `## Version History` / `## Changelog`. Draft placeholders must not be committed even transiently. |
| `V-54-31` | Duplicate platform-frontmatter assertion (SC#5). |
| `V-54-32` | Atomicity coupling: `V-54-19` + `V-54-20` + `V-54-21` must pass **together** — a split commit that lands one without the others fails. |

**How to avoid:** make `node scripts/validation/check-phase-54.mjs` a **pre-commit gate for every plan that touches `docs/operations/patch-management/` or `docs/admin-setup-ios/{04,07}`**, and a named success criterion on every such plan. It runs in well under a second standalone.

**Phase:** every content phase touching patch-management; state it in the phase's CONTEXT as a hard constraint list.

---

## Class-2 Pitfall 2: C11 ops anti-pattern regex — the Autopatch/SCCM pillar walks straight into it

**What goes wrong:** New Autopatch or co-management prose fails `C11: Ops-domain anti-pattern regex`. C11 exists in the v1.14–v1.20 harnesses, but only v1.20's reads live, so it reds **one** workflow — as one visible red plus a fan-out of silent SKIPs across its ten `needs: harness-run` jobs (see Correction 2).

**[MEASURED]** `v1.20-milestone-audit.mjs` check id 11. The patterns are **always** the hardcoded four: `:570-571` reads `ALLOWLIST.c11_ops_patterns` only if it exists and is non-empty, and `grep -n "c11_ops" scripts/validation/v1.20-audit-allowlist.json` returns exactly one key — `"c11_ops_exemptions": []`. **`c11_ops_patterns` is not in the sidecar at all** (`undefined`), so the D-03 fallback is unconditionally live and the "configurable pattern list" is not a real escape hatch. The four patterns:

```
\bSystem Center\b
\bSCCM\b[^.]*\bIntune\b
\bAutopatch rings\b
\bSafetyNet\b[^.]*\bcompliance\b
```

Scope: **all `docs/**/*.md`**. Each match passes only if one of these appears within ±200 chars:

```
successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|
co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout|
apple-business-side|intune-side|integration-handshake|owned-by-apple-business|owned-by-intune|scope-boundary
```

**[MEASURED]** `c11_ops_exemptions` in `scripts/validation/v1.20-audit-allowlist.json` is **empty** (`len=0`) — there is no escape hatch in use, and adding one requires editing a milestone sidecar.

**Why this bites v1.21 specifically:** Pillar C is Autopatch (so `Autopatch rings` will appear repeatedly) and the driver pillar discusses SCCM/WSUS scan-source conflicts (so `SCCM … Intune` in one sentence is unavoidable). Class-1 Pitfall C1-8 proposes deleting the phrase "mutually exclusive" — which is a keyword on the C11 allowlist.

**[MEASURED] The exposed line is in `00-overview.md`, not `01-windows-wufb-rings.md`.** Of the twelve corpus lines matching a C11 ops pattern, exactly **one** depends on `mutually exclusive` as its sole allowlisted keyword:

| Line | Match | What keeps it green | Survives the PITFALL-9 rewrite? |
|---|---|---|---|
| `docs/operations/patch-management/00-overview.md:78` | `Autopatch rings` | **only** the `mutually` / `exclusive` pair at `:76-77` | **NO — this is the one that breaks** |
| `docs/operations/patch-management/00-overview.md:84`, `:87` | `Autopatch rings` | `mutual-exclusion` at `:87` (also allowlisted) | No, if `mutual-exclusion` also goes |
| `docs/operations/patch-management/01-windows-wufb-rings.md:77` | `Autopatch rings` | its own `PITFALL-9` literal | **Yes** — independently green |
| `docs/operations/patch-management/01-windows-wufb-rings.md:169-188` | `SCCM … Intune` | `co-management`, `migration` | Yes |

An earlier draft named `01-windows-wufb-rings.md` as the at-risk file. It is the safe one. **Plan the C11 keyword substitution against `00-overview.md:76-87`**, and note that window overlaps `V-54-09` and `V-54-10` (see C1-8) — three constraints on the same twelve lines.

**How to avoid:** (a) prefer singular `Autopatch ring` — the pattern is `\bAutopatch rings\b`, plural only; (b) when the plural is required, keep `co-management`, `migration`, `transition`, `disambiguation`, or `PITFALL-9` within 200 characters; (c) **when rewriting the mutual-exclusivity prose, substitute another allowlisted keyword into `00-overview.md:76-87` first, then remove `mutually exclusive` / `mutual-exclusion` — in that order, in the same commit.** Verify with `node scripts/validation/v1.20-milestone-audit.mjs` before commit.

**Phase:** Pillar C (Autopatch) and Pillar B (drivers).

---

## Class-2 Pitfall 3: C17 — what a NEW doc must do to pass on first authoring

**[MEASURED]** `node scripts/validation/c17-eee-contract.mjs` → `234 files checked, 0 with violations`. Six harnesses spawn it against live HEAD (v1.15–v1.20), so **one violation reds six workflows**.

**The 13 assertions, as an authoring checklist** (from `scripts/validation/c17-eee-contract.mjs:202-415`):

| # | Requirement | What has tripped past authors |
|---|---|---|
| 1 | No ` ```mermaid ` fence at top level | v1.16 Phase 122 converted 30 files. Mermaid is a **hard fail**, never a carve-out. Draw nothing; write text-equivalents per STD-04. |
| 2 | Exactly one `# ` H1, appearing **after** the header block line | An H1 inside a fence is masked; an H1 before the `**Platform:** … **Doc Type:** …` line fails. |
| 3 | H1 text ≠ bare `RE-\d+` | Descriptive title required. |
| 4 | `## Summary` is the **first** H2, and no `### ` between the block line and it | The most common structural miss. |
| 5 | `## Summary` prose ≥ **30 words**, counted outside fences | Terse summaries fail. |
| 6 | Header block is an inline paragraph, not a table row | — |
| 7 | Block's first two fields are exactly `Platform` then `Doc Type` (case-insensitive keys) | `owner` is **never** in the block. |
| 8 | Front matter carries non-empty `doc_id`, `status`, `owner`, `doc_type`, `last_verified` | — |
| 9 | Block field values match front matter (skipped for `last_verified: 1970-01-01` template sentinel) | — |
| 10 | `platform:` **must** be a key in `D1_MAP` — unmapped is a **hard failure with no fallback** | The live map (`:26-47`) is: `Windows`, `windows`, `macOS`, `macos`, `iOS`, `ios`, `Android`, `android`, `Linux`, `linux`, `all`, `windows+macos+ios+android+linux`, `cross-platform`, `apple-tv`, `iOS,Android`, `ios+macos`, `ios+ipados+macos`, `ios+ipados+macos+tvos`, `ios+macos+shared-ipad`, `ios+shared-ipad`. **There is no `windows+linux`, no `Windows,macOS`, no `windows+macos`.** A five-platform update doc must use `all` or `cross-platform`. |
| 11 | Tables with **>25 data rows** need a prose line within 5 lines after the table (not `\|`, `#`, `>`, or a fence) | A per-OEM capability matrix will exceed 25 rows. |
| 12 | Every run of consecutive line-start `>` lines, joined with spaces, must be **≤ 200 chars** | The historic mass-failure: 56/75 files in Phase 116, 66/66 in Phase 117. Fix by **word-preserving splits** — a blank line between blockquote lines starts a new run. **Blind spot: indented blockquotes are not scanned** (`/^>/`, column 0 only), so an indented one is silently exempt — do not rely on that. |
| 13 | `status` ∈ {`Draft`, `Approved`, `Superseded`} | — |

**Prevention:** author against `docs/_templates/` and run `node scripts/validation/c17-eee-contract.mjs` before every commit touching `docs/`. It prints `C17 assertion-violation-counts: #1=0 … #13=0` — a per-assertion diff, so it is cheap to iterate.

**Phase:** every content phase.

---

## Class-2 Pitfall 4: Frozen-callsite pinning constrains any edit to `c17-eee-contract.mjs` and its harness callers

**What goes wrong:** Pillar H edits `c17-eee-contract.mjs` (to make the contract-presence guard frozen-aware) and/or the five C17-bearing harness call sites; a *distant* validator that pins the old string goes red.

**[MEASURED]** The complete pinning set on `c17-eee-contract.mjs`:

| Pinner | Assertion | Exact needle / condition |
|---|---|---|
| `check-phase-115.mjs:44` | `V-115-PRESENCE-C17` | file exists and is non-empty |
| `check-phase-115.mjs` | `V-115-SELFTEST-MODE` | file `.includes('--self-test')` |
| `check-phase-115.mjs` | `V-115-COUNTS-SUMMARY` | file `.includes('C17 assertion-violation-counts:')` |
| `check-phase-115.mjs:98` | `V-115-STANDALONE` | file must **NOT** contain `CHAIN_PHASES` — **so the frozen-aware conversion must not import anything that introduces that token** |
| `check-phase-120.mjs:89` | `V-120-C17-COMMENT` | file `.includes('[v1.16 Phase-120 addition, comment-only]')` — a **comment** at `:207` is load-bearing |
| `check-phase-140.mjs:152` | `V-140-C17CARVEOUT` | each of `v1.15`–`v1.18` harnesses must still `.includes('c17-eee-contract')` — **scoped to v1.15–v1.18 only**, so v1.19/v1.20 are free |

**[MEASURED]** Additionally, six *pipeline* files copy `D1_MAP` "verbatim from c17-eee-contract.mjs lines 26-47" (`retrofit-guide.mjs:56`, `retrofit-mermaid-structural.mjs:84`, `retrofit-nav-hub.mjs:65`, `retrofit-reference.mjs:61`, `retrofit-runbook.mjs:42`, `retrofit-structural.mjs:66`). **Adding a platform value to `D1_MAP` desynchronises six copies.** These are comment-asserted, not validator-asserted — nothing will catch the drift.

**[MEASURED]** The LINK-05 fence-mask rule is a **verbatim-copied reference instance**: `check-nav-hub-links.mjs:94` declares itself *"the reference instance the other 14 fence-mask sites copy verbatim"*, and `c17-eee-contract.mjs:150,159,167` carry the copy (`/^ {0,3}(`{3,}|~{3,})/`). Editing the mask in one place without the other 14 reopens `C17-VS-PIPELINE-FENCE-MASK-DIVERGENCE`, which v1.20 just closed.

**How to avoid:** before touching any line of `c17-eee-contract.mjs`, run `grep -rn "c17-eee-contract" scripts/ .github/` and satisfy every needle above. Prefer **append-only** edits (the pattern HARN-17 used for `frozen-at-close.mjs`). Never delete a comment line.

**Phase:** Pillar H.

---

## Class-2 Pitfall 5: Both publish-bundle canaries, and the four counts that must move together

**[MEASURED]** Both canaries currently pin **225**, and the live data agrees:

| Site | Line | Current value |
|---|---|---|
| `scripts/pipeline/build-filename-map.mjs` | `:283` `rows.length === 225` (comment `:274-277` records 221→223→225 lineage) | **225** |
| `scripts/pipeline/build-publish-bundle.mjs` | `:520,523` `rows.length === 225` (comment `:515-519` records that this canary sat **RED since the v1.18 close** because 6acc429b bumped only the other one) | **225** |
| `docs/_registry/RE-index.md` | `grep -c "^\| RE-"` | **225** rows, all `Approved`; highest ID **RE-225** |
| `scripts/pipeline/filename-map.md` | `grep -c "^\| RE-"` | **225** rows |

**[MEASURED]** `grep -rn "\b225\b" scripts/ .github/` (excluding `filename-map.md` data rows) returns **only** these two canary files — there is no third pin.

**What must move together for v1.21:** for *N* new documents (recipe #5 plus the firmware/BIOS/driver/app/Linux guides — likely 10–20), all four move by the same N: new `RE-226…` rows in `RE-index.md`, regenerate `filename-map.md`, and bump **both** `=== 225` literals to `225 + N`. Bumping one is exactly the v1.18 defect.

**Warning sign:** `node scripts/pipeline/build-filename-map.mjs --self-test` green while `node scripts/pipeline/build-publish-bundle.mjs --self-test` is red (or vice versa). Run **both**.

**[MEASURED]** `build-publish-bundle.mjs` also fails closed on: 0 Approved rows (`:316`), duplicate Doc IDs among Approved rows (`:326`), any Approved RE-ID missing from `filename-map.md` (`:342`), and registry `Status: Approved` vs front-matter `status: Draft` divergence (`:374`). So a new doc authored with `status: Draft` in front matter but registered `Approved` fails the bundle build.

**Phase:** the registration/publish phase, as a single atomic commit covering all four counts.

---

## Class-2 Pitfall 6: Apex extension and the archival-drift class

**[MEASURED]** `check-phase-144.mjs` header states the invariants precisely; the ones that govern v1.21's apex:

- Chain spans `[48..143]`, **96 entries**, generated by `Array.from` arithmetic, never transcribed. v1.21's apex spans `[48..(N−1)]` where N is v1.21's terminal phase.
- `CHAIN_SKIP = new Set([])` — never add entries; `V-NNN-SELF` hard-asserts `size === 0`.
- `CHAIN_EXTRA = [30, 31]` carries forward verbatim, must stay **disjoint** from `CHAIN_PHASES` (a fourth module-load guard added at 144 — keep it).
- The apex is **never** added to its own `CHAIN_PHASES`.
- Leaves must be authored **before** the apex, or the apex emits FAILs indistinguishable from real regressions.
- `maxBuffer: 20 MiB`; 600 s per-peer (`phaseNum >= 67`) / 300 s per-subprocess.
- The apex sets `CHECK_PHASE_NESTED=1` on every child, so it **structurally cannot** produce a non-nested chain result — never describe it as one.

**The archival-drift class, stated exactly:** a validator whose read path hardcodes `.planning/phases/NNN-*/` breaks when `/gsd-complete-milestone` moves that directory to `.planning/milestones/vX.Y-phases/`. The mitigation in use is `_lib/archive-path.mjs`'s resolver plus a per-apex **literal archive-root token**.

**[MEASURED]** The token is the trap, and `check-phase-144.mjs:36-41` documents the counterexample verbatim:

> "The resolver's null-vs-success behavior is explicitly NOT used as the wrong-token detector: `_lib/archive-path.mjs:23-24` checks the LIVE path first and returns success regardless of token correctness before archival — proven by counterexample `check-phase-125.mjs:86`, which carries the wrong `['v1.15-phases']` token and has been permanently green with a false detail string for two milestones. **Never copy a predecessor's token.**"

So v1.21's apex must carry `['v1.21-phases']`, and its greenness **before** archival proves nothing about token correctness.

**[MEASURED] Live drift census at HEAD — the class currently has ZERO live instances.** `.planning/phases/` is now empty (v1.20's six phase dirs are at `.planning/milestones/v1.20-phases/`). `grep -rn "'\.planning/phases/" scripts/validation/*.mjs` finds **three** hardcoded constants, not one — and **all three are consumed by frozen readers**, which is why none of them can drift:

| Site | Constant | Reader | Drift-exposed? |
|---|---|---|---|
| `check-phase-124.mjs:46` | `DELIVERABLE_PIPE05` | `:97` `readAtV116Close(DELIVERABLE_PIPE05)` | **No** |
| `check-phase-70.mjs:402` | `70-04-AUDIT-RESULTS.md` (V-70-18) | `readCorpusFileAtV17CloseGate(PATH)` | **No** |
| `check-phase-70.mjs:416` | same path (V-70-19) | `readCorpusFileAtV17CloseGate(PATH)` | **No** |

A frozen read resolves the path **inside a git object at a pinned SHA**, and git history never moves. `/gsd-complete-milestone` relocates the working tree, not the commit. So these three call sites are structurally immune, and an earlier draft's `[PREMISE]` that `check-phase-124` "is either resolver-backed elsewhere or tolerates absence" is discharged: it is frozen, one line below the constant.

**Consequence: delete the "audit hardcoded `.planning/phases/` constants" guardrail.** As stated it would send a planner to "fix" three correct call sites, and converting a frozen read to a resolver lookup would be a genuine regression. The archival-drift risk in v1.21 is entirely about **the apex's own archive-root token**, below — not about path constants.

**What makes an apex extension safe:** author all leaves first; generate the chain array arithmetically; use v1.21's own archive-root token; keep `CHAIN_SKIP` empty and `CHAIN_EXTRA` disjoint; re-derive every count and span string rather than copying; and **do not treat green-before-archival as token validation**.

**Phase:** Pillar H / terminal close.

---

## Class-2 Pitfall 7: `V120-PIN-DEFERRAL` is live and its recovery command has a documented false-positive form

**[MEASURED]** `MILESTONE_CLOSE_SHAS` keys at HEAD: `V141, V15, V16, V17, V17_CLOSEGATE, V18, V19, V110, V111, V112, V113, V114, V115, V116, V117, V118, V119, V14`. **No `V120`.** Confirmed by direct import. So `v1.20-milestone-audit.mjs` reads live HEAD (see Correction 2) until v1.21 pins it.

**[MEASURED]** `.planning/STATE.md` names the target SHA `246fa3dd` and repeats the warning: use the **subject-line pair discriminator**, not the dual-token `--grep --all-match` form, which matches on the commit *body* and returns multiple candidates:

```
git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.20/ && $2 ~ /MILESTONE CLOSE/'
```

**[MEASURED]** Verified: `git log --oneline -3 246fa3dd` → `246fa3dd docs(144-12): v1.20 MILESTONE CLOSE — single close-gate commit, 28/28 requirements Validated`. Both tokens are in the **subject line**. Count must be 1.

**How to avoid:** append-only edit to `_lib/frozen-at-close.mjs` (`V120` entry + `readAtV120Close` + `lsTreeAtV120Close`), then prove end-to-end as HARN-17 did (`readAtV119Close('.planning/REQUIREMENTS.md')` returned 27,286 bytes; `lsTreeAtV119Close('docs')` returned 296 entries). Then convert `v1.20-milestone-audit.mjs`'s `readFile`/`walkMd`/`androidDocPaths`/`linuxDocPaths` to the frozen reader.

**Ordering: the `V120` pin belongs at the TERMINAL CLOSE. Do not sequence it early.**

An earlier draft argued that landing the pin first would discharge the Correction-2 glossary hazard "structurally rather than by care". **That is backwards, and the mechanism is measurable.** The frozen conversion does not merely change where `readFile` looks — it rewrites the corpus enumeration:

**[MEASURED]** in the already-converted `v1.19-milestone-audit.mjs`, `walkMd` (`:71-73`) returns `FROZEN.paths` filtered by prefix instead of walking the working tree, and `androidDocPaths()` / `linuxDocPaths()` gate every candidate on `FROZEN.has(p)` (`:105, :118, :166, :217`). The unconverted `v1.20-milestone-audit.mjs` still uses a real recursive `readdirSync` walk (`:60-62`) and `existsSync(join(process.cwd(), p))` (`:103, :116, :164, :215`).

So converting `v1.20-milestone-audit.mjs` early would freeze its corpus enumeration at the v1.20 close SHA, and:

- **C11 goes blind to every line v1.21 writes.** Its scope is `walkMd('docs')` (`:585`). Frozen, that set is the v1.20-close corpus — the Autopatch and driver prose Class-2 Pitfall 2 is entirely about would never be scanned, and the one live-HEAD C11 check in the repo becomes a check of history.
- **Pillar D's new Linux docs become structurally unscoped.** `linuxDocPaths()` would gate on `FROZEN.has(p)`; a Linux patch-management doc created in v1.21 is by definition absent from the v1.20 close tree, so C10 would never see it.
- The glossary zero-margin exposure does disappear — but only because *nothing* is checked any more. That is not a structural discharge; it is the last live guardrail switching itself off at the start of the milestone that needs it.

**The right sequencing is the conventional one:** corpus content first under a live-HEAD v1.20 harness, `V120` pin last, at the terminal close, once the content it would freeze is final. The glossary zero-margin stays a care item (Correction 2), which is the correct cost.

**Phase:** Pillar H, terminal close — **not** early. No owner decision is needed; the early-placement option is withdrawn.

---

## Class-2 Pitfall 8: Deferred items that go LIVE because v1.21 touches corpus content again

`v1.20-DEFERRED-CLEANUP.md` carries items whose stated triggers are *"the next phase that touches this anchor doc"* or *"a third/fifth recipe lands"*. v1.20 shipped no corpus content, so none fired. v1.21 fires several.

| Item | Trigger | **[MEASURED]** status at 2026-08-19 | Action |
|---|---|---|---|
| **`ANCHOR-REVIEW-BY-PAST-DUE`** | "next phase or milestone that touches this anchor doc refreshes its `last_verified`/`review_by` pair" | `docs/admin-setup-android/05-dedicated-devices.md` → `review_by: 2026-06-22`, **58 days past due** (was 42 at v1.19 close). Cycle 60 d. It is in `androidDocPaths()` so it is under C5's ≤90 rule. **Context (see C1-14): it is one of 217 past-due docs out of 271, and no validator compares `review_by` to today — this item is a hygiene marker, not a red gate.** | **TRIGGER FIRES** if any Android update content links or edits it. Refresh to `last_verified: <date>` / `review_by: <date+60>` (keep 60 to match its Android peers) as a named correction. Do **not** widen the task to the other 216 — route those to BACKLOG. |
| **`ROLLBACK-RECOVERY-DIVERGENCE-COUNT`** | "a third recipe needs the `## Rollback/Recovery` slot" | **2 of 4** confirmed: `03-windows-11-multi-app-kiosk.md` and `04-android-dedicated-mhs-multi-app.md` have `## Rollback/Recovery`; `01-` and `02-` do not. `docs/_templates/recipe-template.md` H2 list is `Summary, Prerequisites, Unsupported and Anti-Feature Callouts, Steps, Verification, Configuration-Caused Failures, See Also` — **the template does not contain the section at all.** | **TRIGGER FIRES** — recipe #5 is a firmware/BIOS/update config artifact, i.e. the single most rollback-relevant recipe yet (see C1-2). Decide explicitly: add `## Rollback/Recovery` to the template and backfill 01/02 (making it 5-of-5), or ship 3-of-5 and re-record the tally. Do not leave it undecided. |
| **`SHARED-TAXONOMY-DOC (Option B)`** | "a third lockdown recipe lands and the canary budget is free" | Recipe #5 lands; canary budget is free (v1.21 bumps it anyway). | Evaluate. Low priority. |
| **`HUB-WIRING-NON-BARRED-SURFACE`** | "a kiosk-lockout or MHS-exit-PIN-lockout L1/L2 runbook is authored" | Unlikely in v1.21 | Probably stays deferred. |
| **`RECIPE-OUTBOUND-LINK-COVERAGE`** | "a fifth or later recipe lands and the coverage gap becomes an operational cost" | **Recipe #5 IS the fifth recipe.** 73 `../`-relative outbound links across recipes 01–04 have no standalone CI job; `check-nav-hub-links.mjs` covers them only via the apex chain (`CHAIN-143`). | **TRIGGER FIRES by its own wording.** At minimum, run `check-nav-hub-links.mjs` explicitly in recipe #5's verification rather than relying on the apex. |
| **`V-132-HUBSNOTWIRED-REGEX-BROKEN`** | frozen, unfixable in place | `check-phase-132.mjs:97` tests `/docs\/recipes\|01-shared-windows-avd\|02-shared-ipad/` against the three hubs; hub files live *inside* `docs/`, so a real relative link never carries the `docs/` prefix and that arm never fires. `check-phase-137.mjs` pins only the literals `recipes/03-` and `recipes/04-`. | **Consequence for recipe #5: NOTHING enforces that the hubs stay unwired to it.** The convention (recipes are Guides, not troubleshooting docs, so `common-issues.md`/`quick-ref-l1.md`/`quick-ref-l2.md` must not link them) must be held by review, not by CI. Say so in the phase CONTEXT. |
| **`C17-FROZEN-AWARE-RESIDUE-V15-V19`** | a tooling pass converting the C17 contract-presence guard across all five (now six) harnesses | Confirmed live: 6 harnesses spawn C17 at live HEAD | Pillar H's named scope. Convert **all** simultaneously — converting some leaves the same drift risk on the rest. |
| `HYG-05`, `CI-3`, Deployment/Infra trio, MTPSSO/KRBFUT, Part D v1.8 items | grounding pass / rebrand / infra | No trigger from v1.21 | Stay deferred. |

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|---|---|---|---|
| Bump `last_verified` without re-verifying the claims in the body | Clears the past-due backlog in one commit | Launders unverified predictions (C1-10) into "verified" facts; the corpus's credibility is its only product | **Never.** Freshness tasks must produce per-claim evidence. |
| Link a corpus doc to a `.planning/research/` or `.planning/phases/` path | Cheap citation | Dangles at the next milestone boundary and then silently re-points at unrelated content (Correction 1). Archiving is **not** a safety net for `research/`: successive `/gsd-new-milestone` runs overwrite it, so most generations are recoverable only from git history | **Never.** Inline the substance. Cite a planning path only under `.planning/milestones/vX.Y-*.md`, and only after confirming the target exists. |
| Copy a predecessor apex's archive-root token | Saves a lookup | Permanently green with a false detail string; `check-phase-125.mjs` has carried the wrong token for two milestones | **Never** (`check-phase-144.mjs:41`). |
| Bump one publish-bundle canary | Ships faster | The other sat RED for an entire milestone undetected | **Never.** Both, same commit. |
| Author the apex before its leaves | Parallelism | Emits FAILs indistinguishable from real regressions | **Never** (`check-phase-144.mjs` HAZARD FIX 3). |
| Widen `D1_MAP` for a new platform combo | One-line fix | Desynchronises six verbatim pipeline copies, unguarded by any validator | Only with all six updated in the same commit. |
| Add a `c11_ops_exemptions` entry instead of rewording | Unblocks a sentence | Line-pinned exemptions break when any line is inserted above them (the documented `link repair trips prose guards` failure) | Only when rewording genuinely cannot preserve meaning. |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|---|---|---|
| Intune ↔ DFCI | Assuming any Autopilot-registered device qualifies | OEM/CSP registration only; CSV-imported devices are excluded by design (C1-1) |
| Intune ↔ UEFI (retirement) | Deleting the DFCI profile to "remove" DFCI | Profile deletion does nothing; update the profile to the exit state first, then wipe, then delete the Autopilot record (C1-2) |
| Intune ↔ ConfigMgr (WU workload) | Reaching for `DisableDualScan` | Dual Scan is deprecated; use the scan source policy / move the workload slider (C1-6) |
| Intune ↔ Windows Update (drivers) | Enabling automatic approval fleet-wide | No rollback exists; use rings + manual approval on Pilot; one driver policy per device (C1-7) |
| Intune ↔ Autopatch | Treating Autopatch and update rings as mutually exclusive mechanisms | Autopatch groups own the policy objects; don't hand-assign competing rings (C1-8) |
| Intune ↔ Apple DDM | Assuming legacy update payloads still enforce | Enforcement stops **silently** at OS 26; migrate to DDM and add a detection check (C1-12) |
| Intune ↔ Linux (platform scripts) | Setting a package-upgrade script to **Root** and leaving **Execution frequency** at its default | The default is **Every 15 minutes** and the page documents **no run-time cap** — set an explicit frequency, design for lock contention, detect `/var/run/reboot-required` (C1-13) |
| Intune ↔ Linux (compliance) | Transplanting the compliance-script limits onto platform scripts | The 5-minute cap, 1 MB script/output caps and the user-context/no-elevation rule belong to **custom compliance discovery scripts**, a different surface (C1-13) |
| Intune ↔ ConfigMgr (drivers, workload staying put) | Assuming the WU workload must move before Intune driver policies can be used | First-party four-step co-existence procedure (Windows 11 only) + the "undefined and unpredictable device state" warning against configuring the same settings via Intune/CSP (C1-6) |
| Intune ↔ Autopilot (drivers) | Expecting driver update policies to stage drivers during provisioning | Driver updates aren't supported during Autopilot — and Windows may still install unapproved critical driver updates during OOBE (C1-7) |
| Intune ↔ Play Integrity | Requiring `MEETS_STRONG_INTEGRITY` without a patch-age audit | Audit per model against OEM support windows first (C1-11) |
| Vendor BIOS tooling ↔ Intune Win32 | Detection rule = installer exit code | Detect the resulting BIOS state; exit-0 no-ops report 100% success (C1-4) |

## Performance Traps

| Trap | Symptoms | Prevention | Threshold |
|---|---|---|---|
| Apex chain wall-clock on cold clone (Windows) | Apex stalls mid-chain with no output growth | `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, carried. **The 19.8 s figure quoted elsewhere in this file is a WARM run and does not rebut a cold-clone row.** Measured 2026-08-19: **cold 39.0 s vs warm 19.1 s** — a ~2× penalty, which is precisely the effect the row exists to track. Still non-blocking locally at 39 s, but do not cite a warm number as evidence about cold behaviour | 300 s per-subprocess / 600 s per-peer cap; `check-phase-66` measured at 386,235 ms **standalone non-nested** (deferred row 9) |
| Per-OEM capability matrix >25 rows | C17 assertion #11 fails | Prose summary line within 5 lines after the table | 26 data rows |
| 17-workflow dispatch cascade on the close | Long feedback loop | v1.20 dispatched all 17 directly at one shared SHA, 196 success / 15 event-gated skips / 0 failures | Every close |

## Security Mistakes

| Mistake | Risk | Prevention |
|---|---|---|
| Publishing BIOS/Supervisor/Setup passwords or an HP LAK in a doc example | Fleet-wide firmware compromise | Reference the escrow location; never a literal. There is no `secrets.` reference in any workflow in this repo today — keep it that way |
| Documenting a DFCI profile that disables virtualization | Silently disables VBS → Credential Guard → Hotpatch eligibility (C1-5) | Capability matrix "OS features gated by this setting" column |
| Recommending `DisableDualScan = 1` as a durable setting | Disables **all** WUfB cloud scan, not just driver/firmware — devices stop receiving cloud updates | Already labelled transitional in the corpus; add the deprecation (C1-6) |
| Relaxing an Android compliance policy from strong to device integrity without an expiry | Permanently weakened attestation posture | Document as a time-boxed exception with a named review date (C1-11) |

## "Looks Done But Isn't" Checklist

- [ ] **New doc authored:** `node scripts/validation/c17-eee-contract.mjs` → `0 with violations`
- [ ] **Patch-management edit:** `node scripts/validation/check-phase-54.mjs` → `32 passed, 0 failed`
- [ ] **Any corpus edit:** `node scripts/validation/check-nav-hub-links.mjs` → exits 0
- [ ] **Any corpus edit:** `node scripts/validation/v1.20-milestone-audit.mjs` → `16 passed, 0 failed` (this is the one live-HEAD harness; C1/C5/C9/C10/C11/C13/C17 all live here)
- [ ] **New docs registered:** `RE-index.md` rows, `filename-map.md` regenerated, **and both** `=== 225` canaries bumped by the same N
- [ ] **Both bundle self-tests:** `build-filename-map.mjs --self-test` **and** `build-publish-bundle.mjs --self-test`
- [ ] **Freshness task:** every date-bearing forward claim re-confirmed against a source dated after the event, not just `last_verified` bumped (C1-10)
- [ ] **Recipe #5:** hubs (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`) NOT linked to it — **CI does not enforce this**, review must
- [ ] **`## Rollback/Recovery`:** decision recorded (template + backfill, or 3-of-5 tally re-recorded)
- [ ] **Planning artifacts:** no occurrence of the literal formed by `05-compliance-` + `policy.md` in `REQUIREMENTS.md`/`ROADMAP.md`; no line-start `> **Platform:**` anywhere in `.planning/` or `docs/`
- [ ] **Before the milestone close:** apex reports `N PASS, 0 FAIL` — and the count was re-derived, not copied
- [ ] **Cross-platform doc:** `platform:` value is in `D1_MAP` (`all` or `cross-platform` for 5-platform docs)

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---|---|---|
| Dangling `.planning/` link (Correction 1) | **LOW** | **Inline the substance** — repointing has no target (the cited Pitfall 2/4 and OP-*/CI-* content is not in any archived research dir; recover it from `git show b736a3fc:` / `78be4743`). Re-run `check-nav-hub-links.mjs` |
| `V-54-11` bare-ring regression | LOW | Add the qualifier within 40 chars; re-run `check-phase-54.mjs` |
| C11 keyword lost during a PITFALL-9 rewrite | LOW | Reinstate an allowlisted keyword within ±200 chars |
| C17 blockquote >200 chars | LOW | Word-preserving split with a blank line between runs |
| One canary bumped, not both | MEDIUM | Bump the other; the v1.18 precedent shows this can hide for a full milestone |
| Apex authored before leaves | MEDIUM | Author leaves, re-run; FAILs are indistinguishable from regressions until then |
| Wrong archive-root token in the apex | **HIGH** | Undetectable until archival, then breaks the *next* milestone's apex. Only prevention works |
| Freshness dates bumped over unverified claims | **HIGH** | Requires a full re-audit of the affected docs; there is no diff that shows which claims were laundered |
| DFCI'd device wiped before unlock (C1-2) | **HIGH (physical)** | Boot to UEFI, "refresh management from network"; settings retain last-profile values, not defaults |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---|---|---|
| Correction 1 — dangling `.planning/` links | **First content phase, before anything else** | `grep -rn "\.planning/research/\|\.planning/phases/" docs/` → 0; apex → `N PASS, 0 FAIL` |
| Correction 2 / Class-2 #3 — C17 on new content | Every content phase | `c17-eee-contract.mjs` → 0 violations |
| Class-2 #1 — `check-phase-54` 32 assertions | Every patch-management phase | `check-phase-54.mjs` → 32/0 |
| Class-2 #2 — C11 ops regex | Pillar B (drivers), Pillar C (Autopatch) | `v1.20-milestone-audit.mjs` → 16/0 |
| Class-2 #5 — dual canaries | Registration/publish phase | Both `--self-test`s green, same commit |
| Class-2 #4 / #6 / #7 — c17 pinning, apex, `V120` | Pillar H, **terminal close** (early `V120` placement is withdrawn — it blinds C11 and unscopes Pillar D's Linux docs) | `grep -rn "c17-eee-contract" scripts/ .github/` needles all satisfied; `readAtV120Close` proven end-to-end; C11 still scanning live HEAD throughout every content phase |
| Class-2 #8 — triggered deferrals | Android/recipe phases | Each triggered item explicitly closed or re-recorded in `v1.21-DEFERRED-CLEANUP.md` |
| C1-1..C1-5 — DFCI/BIOS | Pillar A | Exit runbook + recovery runbook present; prerequisite disqualifier cross-linked from `admin-setup-apv1/01-hardware-hash-upload.md` |
| C1-6, C1-7 — dual-scan currency, driver rollback | Pillar B | `dual-scan` token survives; "no rollback" stated as a headline constraint |
| C1-8, C1-9 — PITFALL-9 rewrite, Autopatch licensing | Pillar C | `V-54-09`/`V-54-11`/C11 all still green after the rewrite |
| C1-10, C1-11, C1-12 — stale/forward-dated claims | Freshness pillar | Per-claim evidence lines, each citing a source dated after the event |
| C1-13 — Linux | Pillar D | every Root-context platform script carries an explicit, justified **Execution frequency** (never the 15-minute default); `/var/run/reboot-required` is the compliance signal; distro list reads Ubuntu 24.04/26.04 + RHEL 9/10; the 5-minute cap appears only in a compliance-discovery context |
| C1-14 — conflict doc | Freshness pillar + link-only tasks | `security-baseline-conflicts.md` refreshed; no duplicate conflict semantics elsewhere |

## Currency Flags (things I could NOT verify)

1. **Hotpatch "default-on May 2026" and "opt-out toggle April 2026"** (C1-10) — not corroborated in the Autopatch FAQ at ms.date 2026-05-28. Corpus-internal only, and pinned by `V-54-12`.
2. **Android "fleet compliance deadline October 31 2026"** (C1-11) — the 2025 Google/Intune enforcement dates corroborate; this specific 2026 date does not surface in any source I found. Pinned verbatim by `V-54-23`.
3. **Apple OS 26 legacy-MDM removal** (C1-12) — corroborated only by third-party MDM vendors (Ivanti, Addigy, SimpleMDM, Scudra). **No Apple first-party citation obtained.**
4. **Per-OEM BIOS tooling failure modes** (C1-4) — vendor KB/community tier, not vendor specification tier.
5. ~~**Intune Linux 5-minute script cap and discovery-script elevation limit**~~ — **RESOLVED 2026-08-19, and it was on the wrong surface.** Both limits are first-party but belong to **custom compliance discovery scripts** (`device-security/compliance/create-custom-script`, ms.date 2025-09-04, updated 2026-07-15, "## Limits"). The **platform-script** surface that would run `apt upgrade` (`device-configuration/templates/configure-custom-settings-linux`, ms.date 2025-01-09, updated 2026-07-01) documents **no run-time cap** and a **15-minute default execution frequency**. See C1-13.
6. **Whether the 25 docs at a 92-day cycle are covered by any live rule** — I proved no other `> 90` site exists in `scripts/`, but did not exhaustively enumerate every rule *shape*. **[PREMISE]** Narrowed by C1-14: no validator compares `review_by` to the current date at all, so the only live rules are cycle-length rules.
7. ~~**`check-phase-124.mjs:46`'s hardcoded `.planning/phases/124-*` constant**~~ — **RESOLVED 2026-08-19 by a one-line grep.** `:97` is `readAtV116Close(DELIVERABLE_PIPE05)` — a frozen read, structurally immune to archival. Two sibling constants in `check-phase-70.mjs` (`:402`, `:416`) are likewise frozen via `readCorpusFileAtV17CloseGate`. See Class-2 Pitfall 6. *(Both #5 and #7 were one-fetch / one-grep questions that should not have shipped unresolved; #7 additionally fed a misclassified drift census.)*
8. **Android "fleet compliance deadline October 31 2026"** — see #2; still uncorroborated and the highest-urgency open item at 73 days out.

## Sources

**Repo (all [MEASURED] this session at HEAD `a2edcd02`, 2026-08-19):**
- `scripts/validation/check-phase-54.mjs` (32/32 green, live-HEAD, pins the five patch-management files)
- `scripts/validation/check-phase-144.mjs` (apex; **100 PASS / 1 FAIL / 0 SKIPPED** at HEAD)
- `scripts/validation/check-nav-hub-links.mjs` (1 corpus-link failure)
- `scripts/validation/c17-eee-contract.mjs` (234 files, 0 violations; `D1_MAP` at `:26-47`; 13 assertions at `:202-415`)
- `scripts/validation/v1.20-milestone-audit.mjs` (16/16 green; C5 `:410`, C10 `:547`, C11; **only** live-HEAD harness)
- `scripts/validation/v1.14…v1.19-milestone-audit.mjs` (frozen-aware via `createFrozenCorpusReader`)
- `scripts/validation/check-phase-{115,120,140}.mjs` (the c17 pinning set)
- `scripts/validation/_lib/frozen-at-close.mjs` (no `V120` key)
- `scripts/pipeline/build-filename-map.mjs:283`, `build-publish-bundle.mjs:515-523` (both canaries at 225)
- `docs/_registry/RE-index.md` (225 Approved rows), `scripts/pipeline/filename-map.md` (225 rows)
- `docs/operations/patch-management/01-windows-wufb-rings.md`, `02-macos-update-enforcement.md`, `04-android-patch-delivery.md`
- `docs/_glossary*.md` (six files, front matter read directly)
- `.planning/milestones/v1.20-DEFERRED-CLEANUP.md`, `.planning/STATE.md`, `.planning/PROJECT.md`

**External [SOURCED]:**
- [Update Windows BIOS features using DFCI MDM policies — Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows) — ms.date 2026-06-23, updated 2026-07-01
- [Device Firmware Configuration Interface (DFCI) Management — Windows Autopilot](https://learn.microsoft.com/en-us/autopilot/dfci-management) — ms.date 2025-03-25, updated 2026-04-14. **Re-fetched 2026-08-19** for the nine-OEM list ("Other OEMs are pending.") and the "## Known issues" section (Windows 11 24H2 Professional / KB5046740 / OOBE workaround)
- [Windows Autopatch — Frequently Asked Questions](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-faq) — ms.date 2026-05-28
- [Configure Windows Driver Update Policies — Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy)
- [FAQ About Windows Driver Update Policies — Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) — ms.date 2026-01-06, updated 2026-04-09. **Fetched in full 2026-08-19** (rollback answer, Autopilot answer, ConfigMgr co-existence procedure, deferral scoping note)
- [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) — ms.date 2025-06-17, updated 2026-06-19 (the "logical container … and software update policies" containment quote; Test/Last rings; 15 rings per group, 300 groups per tenant)
- [Add custom settings to Linux devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-custom-settings-linux) — ms.date 2025-01-09, updated 2026-07-01 (Root execution context; Execution frequency default Every 15 minutes; no run-time cap; RHEL 8/9 prerequisite text)
- [Create discovery scripts for custom compliance policy in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script) — ms.date 2025-09-04, updated 2026-07-15 ("## Limits" — Linux 5 min / macOS 10 min / Windows 10 min, 1 MB script, 1 MB output; Linux user-context / no-elevation note)
- [Operating systems and browsers supported by Microsoft Intune](https://learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms) — ms.date 2025-10-14, updated 2026-07-01 (Linux: Ubuntu 24.04 / 26.04 LTS, RHEL 9 / RHEL 10)
- [Support tip: Changes to Google Play strong integrity for Android 13 or above](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130)
- [Integrity verdicts — Play Integrity, Android Developers](https://developer.android.com/google/play/integrity/verdicts)
- [Apple Deprecates Legacy Software Update Management in iOS/iPadOS and macOS 26 — Ivanti](https://hub.ivanti.com/s/article/Apple-Deprecates-Legacy-Software-Update-Management-in-iOS-iPadOS-and-macOS-26?language=en_US)
- [macOS, iOS and iPadOS 26: Seamless Apple Device Management Migration — Addigy](https://addigy.com/blog/os-26-device-management-migration/)
- [Secure BIOS with HP Sure Admin and CMSL — HP Developer Portal](https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl)
- [Dell Update Tool Fails to Upgrade BIOS on Computers Having BIOS Admin Password Configured](https://www.dell.com/support/kbdoc/en-us/000206452/dell-update-du-tool-fail-to-upgrade-bios-on-computers-having-bios-admin-password-configured)
- [BIOS Password Is Not Included in the Exported Configuration of Dell Command Update](https://www.dell.com/support/kbdoc/en-us/000187573/bios-password-is-not-included-in-the-exported-configuration-of-dell-command-update)
- [Lenovo BIOS/UEFI Deployment Guide — Lenovo CDRT](https://docs.lenovocdrt.com/ref/bios/bios_guide/)
- ~~[Manage Linux with Microsoft Intune — 4sysops](https://4sysops.com/archives/manage-linux-with-microsoft-intune/)~~ — **superseded 2026-08-19.** Its "5-minute cap on shell scripts" and "Ubuntu 20.04+ / RHEL 8/9" were both applied to the wrong surface and are two LTS generations stale; replaced by the four first-party pages above. Do not re-cite.
- [Automatic updates — Ubuntu Server documentation](https://ubuntu.com/server/docs/how-to/software/automatic-updates/)

---

## Corrections Applied (2026-08-19, adversarial review)

Twenty-one corrections, applied in referee-ruling order. Every external claim below was re-fetched this pass; every repo claim was re-measured at HEAD `a2edcd02`.

| # | Where | What changed |
|---|---|---|
| 2 | C1-7 | **Fabricated clause inside a verbatim quotation removed.** The quoted bridge read "To help mitigate this limitation, use…"; the page reads "**If you must remove a driver, consider manual methods like PowerShell. To help avoid issues that require rolling back a driver from large numbers of devices, use**…". Restored verbatim from a full fetch, and the elided sentence reinstated — it is the first-party manual-recovery path this file separately reinvented as its own recommendation. |
| 4 | C1-8 (was `:296`) | The unsourced `[SOURCED, secondary]` update-rings row replaced with a real quote, URL and date: `windows-autopatch-groups-overview` (ms.date 2025-06-17, updated 2026-06-19). |
| 12 | Correction 2, Prevention | **≤60-day carve-out added inline** for the five `patch-management/` files (`V-54-07`, `check-phase-54.mjs:116`), instead of appearing 320 lines later. Correct pair for a 2026-08-19 authoring date is `review_by: 2026-10-18`, not `2026-11-17`. |
| 13, 14 | C1-8, Class-2 Pitfall 2 | **The C11 collision was named in the wrong file.** It is `00-overview.md:78` (kept green solely by `mutually exclusive` at `:76-77`), not `01-windows-wufb-rings.md:77` (independently green via its own `PITFALL-9` literal). Scope widened: `00-overview.md` carries the false claim **three** times (`:67`, `:76-77`, `:84-86`), and `:70-83` sits under `V-54-09` and `V-54-10` simultaneously. |
| 16 | Class-2 Pitfall 1, checklist | **Self-referential `V-54-21` trap defused.** The banned filename is now written as "the literal formed by `05-compliance-` + `policy.md`" in both places, because this file is consumed while authoring the two artifacts `V-54-21` scans live. |
| 31 | C1-14, Class-2 Pitfall 8 | Measurement added (**217 of 271 past due**, worst 71 d, the five patch-management files 53 d) **and** the reframing fact: **no validator compares `review_by` to the current date** — only three `Date.now()`/`new Date()` hits exist in `scripts/validation/`, none a freshness gate. The 217 are routed to BACKLOG; Pillar E stays scoped to the five files. |
| 32 | Class-2 Pitfall 6 | Census corrected from one constant to **three** (`check-phase-124.mjs:46`, `check-phase-70.mjs:402`, `:416`) and reclassified: **all three sit under frozen readers**, so the drift class has **zero live instances**. The guardrail that would have sent a planner to "fix" three correct call sites is deleted. |
| 39 | C1-1 | Connected to C1-4: **Dell, HP and Lenovo are not on the DFCI OEM list** (nine names, "Other OEMs are pending."), which is why per-OEM vendor tooling exists. Prevents the reading that OEM registration makes DFCI work on those three. |
| 45 | C1-13, Currency Flag #5, Integration Gotchas | **Largest fix — the hazard was on the wrong Intune surface.** The 5-minute cap belongs to custom compliance **discovery** scripts (`create-custom-script`, "## Limits"); the **platform-script** surface that would run `apt upgrade` documents **no run-time cap**. The systemd hand-off mandate built on it is deleted. Added the real, first-party hazard it displaced: **Root execution context on the default `Every 15 minutes` execution frequency, fleet-wide.** Both pages fetched and quoted verbatim. |
| 46 | C1-13 | Linux distro list corrected from a 4sysops blog ("Ubuntu 20.04+ / RHEL 8/9", two LTS generations stale) to first-party `ref-supported-platforms`: **Ubuntu 24.04 / 26.04 LTS, RHEL 9 / RHEL 10**, with the intra-Microsoft RHEL 8-vs-9/10 conflict reproduced rather than resolved. |
| 48 | C1-7 | **ADDED (was missing entirely):** *"Can I apply driver update policies during Windows Autopilot? **No.** Driver updates aren't supported during Windows Autopilot at this time."* plus the note that Windows still applies critical updates — possibly unapproved driver updates — during Autopilot. |
| 55 | C1-9 | Licence-list conflict with STACK.md — **RESOLVED AGAINST THIS FILE** by orchestrator re-fetch 2026-08-19. The current page (`windows-autopatch-hotpatch-updates`, `ms.date` 2026-05-28) reads **"Microsoft 365 F3"**. STACK.md was right. This file's quoted block is a **stale revision** — it carries `Build 26100.2033 or later` and `an x64 (AMD/Intel) CPU`, neither of which the current page states. Do not carry that block into any deliverable. |
| 58 | C1-6 | **ADDED (was missing entirely):** the supported four-step **ConfigMgr co-existence procedure** — leave the WU workload on ConfigMgr, configure Intune driver policies, set the domain GPO "Specify source for specific classes of Windows Updates", enable data collection — with the warning that using Intune/CSP for the same settings *"result in an undefined and unpredictable device state."* This is the modern replacement for `DisableDualScan`. The claim that mitigation 1 is "the only Autopatch-compatible answer" is withdrawn. |
| 59 | C1-8 | **Invalid argument withdrawn.** The pause/resume/rollback-via-update-rings instruction does not contradict per-device exclusivity — those *are* the Autopatch-created ring objects. Replaced with the `windows-autopatch-groups-overview` containment quote, which does carry the refutation. The underlying conclusion (mutual exclusivity is false) is unchanged. |
| 60 | C1-1 | CSV is one of **three** registration paths, not the rule — Learn says "such as by importing from a CSV file". Added the corpus's own three paths; **Path 3 (`Get-WindowsAutopilotInfo`) is equally disqualifying** and was unmentioned. Heading corrected: Path 1 (OEM Delivery) **qualifies**, so "disqualified by the exact registration method this corpus teaches" was wrong. |
| 61 | C1-1 | **ADDED:** the first-party Known issue *"DFCI enrollment fails for Professional editions of Windows 11, version 24H2"* with KB5046740 and the three-step OOBE workaround — on the exact build the Hotpatch pillar targets. |
| 97 | Correction 2, Class-2 Pitfall 2 | Blast radius corrected from "three jobs red" to **one red plus a fan-out of silent SKIPs** — 10 `needs: harness-run` jobs in `audit-harness-v1.20-integrity.yml`, whose own header (`:22-25`) warns to read those skips as gaps. Same structure in all six C17-bearing workflows (6–10 dependent jobs each). |
| 98, 99 | Correction 2 | `check-phase-58.mjs:212` was presented as a live rule; `:200` is `readAtV15Close(COMPARISON_DOC)` — **frozen**. Meanwhile the live `4-platform-capability-comparison.md` sits at a **92-day** cycle and `V-58-10` passes anyway. The 92-day enumeration corrected from four non-macOS files to **six** — the two it omitted include exactly the file whose frozen/live contradiction went unnoticed. |
| 100 | Currency Flags #5, #7 | Both resolved and struck through. #7 was a one-grep question (`readAtV116Close` one line below the constant) that additionally fed the misclassified census in #32; #5 is finding 45. |
| 101-106 | assorted | Cold-clone row no longer rebutted with a warm number (**cold 39.0 s vs warm 19.1 s** — the ~2× penalty is the thing the row measures). The `check-phase-54` constants fence now shows all **twelve** constants at their real range `:23-35` with original alignment, not six normalised lines at `:22-34`. The `git ls-tree` block shows real five-line output, not a brace-collapsed rendering. **`V-54-06` added** to the table titled "the full constraint surface". `c11_ops_patterns` recorded as **absent** from the sidecar (`undefined`), so the hardcoded four-pattern fallback is unconditionally live. Correction 1's "all 11" narrowed to **nine** — two Apple TV citations already point at a stable milestone-level path. |
| — | Class-2 Pitfall 7 | **STRUCK by owner ruling.** The recommendation to sequence the `V120` pin early is withdrawn and replaced with the counter-evidence: under the frozen conversion `walkMd` is rewritten to enumerate `FROZEN.paths` and `linuxDocPaths()`/`androidDocPaths()` switch to `FROZEN.has(p)` (measured against the converted `v1.19-milestone-audit.mjs` vs the unconverted `v1.20`), so **C11 goes blind to every line v1.21 writes** and **Pillar D's new Linux docs become structurally unscoped**. The pin belongs at the terminal close. The Pitfall-to-Phase Mapping row was updated to match. |
| 3 | Correction 1 | **Diagnosis UNCHANGED — it was challenged and upheld.** The claim that this corpus contains a fabricated cross-reference is retracted. Added only what was verified: Prevention option (b) (link the archived path) **does not work** — `.planning/milestones/v1.19-research/PITFALLS.md` has a *different* Pitfall 2/4, `.planning/milestones/v1.6-research/` does not exist, and the cited content survives only at `b736a3fc` / `78be4743`. Option (a), inline the substance, is the only viable one. |

**Not changed, deliberately:** `PITFALL-2` / `PITFALL-4` are real headings in the file the corpus cites (confirmed by `git show b736a3fc`); the 271-of-282 both-dates denominator and its 8-template exclusion are correct; the C1-6 dual-scan mechanism and symptom quotes stand verbatim.

---
*Pitfalls research for: v1.21 Enterprise Update, Driver & Firmware/BIOS Governance*
*Researched: 2026-08-19. Corrected 2026-08-19 after adversarial review. No repository file was modified; this document is the only write.*
