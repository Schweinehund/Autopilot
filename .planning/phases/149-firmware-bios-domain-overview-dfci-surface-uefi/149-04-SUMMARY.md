---
phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
plan: 04
subsystem: documentation
tags: [dfci, uefi, bios, bricking, settings-surface, interaction-traps, virtualization-based-security, intune]

requires:
  - phase: 149-01
    provides: "docs/operations/firmware-bios/00-overview.md as the routing hub and 01-windows-dfci.md founded with frontmatter, the platform-applicability blockquote and the two tail sections"
  - phase: 149-03
    provides: "`## Prerequisites and Disqualifiers`, `## OEM Support` and `## Surface Eligibility` in 01-windows-dfci.md, plus the one-physical-line rule for load-bearing quotations"
provides:
  - "`## The Settings Surface` — the eight DFCI setting categories under one evidence line, the ship-or-route rule stated by name with its honest consequence, and the category-versus-granular conflict loop as a callout with Learn's worked example as a numbered list"
  - "The boot-and-port trap in both halves under TWO evidence lines (compliance conflict plus generic recovery cost from the settings reference; the Surface replace-the-SSD worst case from the Surface guide)"
  - "The radios-disabled manageability trap under its own evidence line"
  - "The virtualization-to-update-eligibility chain in the corrected direction — no Disabled value, so the exposure lives outside DFCI — closing on the Autopatch FAQ's temporarily-ineligible sentence, live-fetched this session"
  - "`## Bricking and Irreversible Configuration` — the DFCI page's lock-beyond-repair warning, the settings reference's re-imaging sentence, and Success Criterion 5's third clause, each under its own evidence line"
  - "A live-fetch pass over four source pages (Autopatch FAQ, ref-dfci-settings-windows, configure-dfci-windows, surface-manage-dfci-guide), all HTTP 200, every shipped quotation grepped against the tag-stripped capture"
affects: [149-05, 150, 151, 152]

actuals:
  tokens: 2677
  tasks: 3
  commits: 4

tech-stack:
  added: []
  patterns:
    - "Two evidence lines for one topic that spans two pages — the trap's compliance half and its Surface worst case never share a Source line (D-56)"
    - "An interaction trap that is a user-caused misconfiguration ships as a callout under the topic H2, never under the callouts H2 reserved for first-party absences (D-36)"
    - "A worked example ships as a numbered list, never a fenced block — this file carries zero code fences (D-31, 148 D-48)"
    - "A quoted string is re-fetched as raw bytes with a browser User-Agent and grepped against the tag-stripped capture before it ships (D-37, D-50, D-52)"

key-files:
  created: []
  modified:
    - "docs/operations/firmware-bios/01-windows-dfci.md — +142 lines, two new anchored H2s (`dfci-settings-surface`, `bricking-irreversible`), bringing the file to six anchored H2s plus its two tail sections"

key-decisions:
  - "The ship-or-route rule's honest consequence ships as 'about a dozen individual setting names' rather than the plan's 'roughly ten' — 11 distinct setting names are in the file at this commit and plan 05's retire runbook adds a twelfth. The count was measured, not rounded toward the plan's phrasing (phase trap 9: state only what the source demonstrates)"
  - "Trap 1's `**Source:**` line cites `configure-dfci-windows`, not `ref-dfci-settings-windows`. The live fetch located the conflict-loop mechanics and the allow-only-Wi-Fi worked example on the profile page's `Conflicts` section; `ref-dfci-settings-windows` only cross-references it. The plan said 'the page the worked example comes from', which the fetch resolved to the profile page"
  - "The generic recovery-cost sentence ('significantly complicates OS recovery ... physically open the device and replace the hardware storage') is on `ref-dfci-settings-windows`, the SAME page as the compliance half, so both ship as one contiguous two-line blockquote under one evidence line. The SECOND evidence line covers the Surface guide's replace-the-SSD case. Two distinct Source lines, two distinct URLs, neither spanning two pages"
  - "Both recovery-consequence strings ship INSIDE quotation marks because both were re-fetched live this session and grepped byte-for-byte — the paraphrase fallback the plan permitted was not needed"
  - "The Autopatch FAQ fetch SUCCEEDED (HTTP 200, 89458 bytes), so the update-eligibility sentence ships quoted rather than under the plan's unquoted fallback"
  - "The forward pointer to retire, reuse and recover is prose, not a link — those sections do not exist until plan 05, and a link to them would dangle in `check-nav-hub-links`"

patterns-established:
  - "Pattern: measure-then-state — the approximate count in a self-describing scope rule is counted against the shipped file before the sentence is written"
  - "Pattern: an impossible-operation fact is stated once as an enumeration fact at the settings surface, then referenced as the premise of a downstream causal chain rather than restated"

requirements-completed: [BIOS-02, BIOS-11]

coverage:
  - id: D1
    description: "The eight DFCI setting categories ship under one evidence line for ref-dfci-settings-windows, without the per-setting option matrix"
    requirement: "BIOS-02"
    verification:
      - kind: other
        ref: "all eight of UEFI access / Security features / Cameras / Microphones and speakers / Radios / Boot Options / Ports / Wake settings present in the `## The Settings Surface` span => 8/8"
        status: pass
      - kind: other
        ref: "grep -c '^```' docs/operations/firmware-bios/01-windows-dfci.md => 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "The ship-or-route rule is stated by name with both halves, and the file honestly acknowledges the setting names it ships anyway"
    requirement: "BIOS-02"
    verification:
      - kind: manual_procedural
        ref: "prose assertion — durable-consequence half and high-churn half both present; count of distinct setting names measured at 11 at this commit"
        status: pass
    human_judgment: true
    rationale: "Whether the shipped prose actually states the rule (rather than gesturing at it) is a reading judgment no grep settles"
  - id: D3
    description: "All three documented interaction traps ship; trap 1 as a callout under the settings H2 with a numbered worked example; trap 2 in both halves under two evidence lines"
    requirement: "BIOS-02"
    verification:
      - kind: other
        ref: "grep -cF \"When set to Disabled, don't set the Boot from network adapters setting to Enabled.\" => 1"
        status: pass
      - kind: other
        ref: "grep -cF 'to become noncompliant.' => 1"
        status: pass
      - kind: other
        ref: "numbered list items in the settings-surface span => 6 (3 for the worked example, 3 for the virtualization chain)"
        status: pass
      - kind: other
        ref: "two distinct **Source:** lines follow the boot-and-port trap, citing ref-dfci-settings-windows and surface-manage-dfci-guide"
        status: pass
    human_judgment: false
  - id: D4
    description: "The virtualization chain reads in the corrected direction — no Disabled value, exposure outside DFCI, update-eligibility consequence — with the third step quoted from a live fetch under its own evidence line"
    verification:
      - kind: other
        ref: "grep -niE 'disabl[a-z]* (the )?CPU and IO virtualization' => no match (the impossible operation is absent)"
        status: pass
      - kind: other
        ref: "grep -n 'no Disabled value' => 1 hit, on one physical line"
        status: pass
      - kind: other
        ref: "live fetch of windows-autopatch-faq => HTTP 200; 'Devices might be temporarily ineligible because the devices don't have Virtualization-based Security (VBS) enabled and running.' present in the tag-stripped capture"
        status: pass
      - kind: other
        ref: "grep -c '../patch-management/01-windows-wufb-rings.md' => 1, no # fragment"
        status: pass
    human_judgment: false
  - id: D5
    description: "The bricking surface ships both first-party sentences plus Success Criterion 5's third clause, each under its own evidence line, without repeating the overview's Bitlocker Warning"
    requirement: "BIOS-11"
    verification:
      - kind: other
        ref: "grep -cF 'Configuring and assigning DFCI profiles can lock the device beyond repair.' => 1"
        status: pass
      - kind: other
        ref: "grep -cF \"The DFCI profile settings change the device hardware, and can't be fixed by re-imaging the OS.\" => 1"
        status: pass
      - kind: other
        ref: "grep -cF \"Deleting the DFCI profile, or removing a device from the group assigned to the profile doesn't remove DFCI settings or re-enable the UEFI (BIOS) menus.\" => 1"
        status: pass
      - kind: other
        ref: "grep -c 'ability to boot or access Bitlocker encrypted drives' => 0 (that quote belongs to 00-overview.md alone)"
        status: pass
      - kind: other
        ref: "three **Source:** lines in the bricking span, citing configure-dfci-windows / ref-dfci-settings-windows / configure-dfci-windows"
        status: pass
    human_judgment: false
  - id: D6
    description: "Every gate this phase binds is green after every commit"
    verification:
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs => 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total"
        status: pass
      - kind: other
        ref: "node scripts/validation/v1.20-milestone-audit.mjs => 16 passed, 0 failed, 0 skipped"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-144.mjs => 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)"
        status: pass
    human_judgment: false

duration: 32 min
completed: 2026-08-25
status: complete
---

# Phase 149 Plan 04: The DFCI Settings Surface, Interaction Traps and Bricking Summary

**The consequence half of the DFCI guide: eight setting categories under one evidence line, all three documented interaction traps (the boot-and-port trap carrying two evidence lines because it spans two pages), the virtualization-to-update-eligibility chain read in the corrected direction, and both first-party irreversibility sentences plus the deleting-the-profile-removes-nothing clause.**

## Performance

- **Duration:** 32 min
- **Started:** 2026-08-25T03:09Z
- **Completed:** 2026-08-25T03:41Z
- **Tasks:** 3
- **Files modified:** 1 (`docs/operations/firmware-bios/01-windows-dfci.md`, +142 lines)

## Accomplishments

- **`## The Settings Surface` (anchor `dfci-settings-surface`)** names all eight DFCI setting categories under one evidence line for `ref-dfci-settings-windows` and routes the per-setting option matrix out to that page rather than reproducing it.
- **The ship-or-route rule is stated by name** — a setting name ships when it carries a durable, high-consequence behavior; high-churn enumerable data routes out — followed by the honest consequence that about a dozen individual setting names appear in the file anyway, and by the reason the per-model-matrices bar does not reach a Microsoft Intune policy reference.
- **All three documented interaction traps ship.** Trap 1 (category versus granular) is a callout under the settings H2 with Learn's allow-only-Wi-Fi worked example as a numbered list. Trap 2 (boot and port) ships in both halves under two evidence lines. Trap 3 (radios disabled needs a wired connection) ships in one sentence under its own evidence line.
- **The virtualization chain reads forward, not backward:** the DFCI setting has no Disabled value, so the exposure lives in firmware settings configured outside DFCI, and the consequence lands as temporary hotpatch ineligibility — quoted from a live fetch of the Autopatch FAQ, linked to `../patch-management/01-windows-wufb-rings.md` at file level.
- **`## Bricking and Irreversible Configuration` (anchor `bricking-irreversible`)** carries three quoted first-party sentences from two pages under three evidence lines, points back to `00-overview.md` for the Dell Templates warning it deliberately does not repeat, and gives Success Criterion 5's third clause its own bold-led paragraph with the wrong-instinct note.

## Task Commits

1. **Task 1: Author the settings surface and the category-versus-granular trap** — `fd2985d9` (feat)
2. **Task 2: Author traps 2 and 3 and the virtualization-to-update-eligibility chain** — `40bd84cf` (feat)
3. **Task 3: Author the bricking and irreversible configuration section** — `38ae3fd6` (feat)

**Plan metadata:** see the `docs(149-04)` commit that carries this file.

## Files Created/Modified

- `docs/operations/firmware-bios/01-windows-dfci.md` — two new anchored H2s appended after `## Surface Eligibility` and before `## Related Resources`. The file now stands at six anchored H2s (`what-dfci-is`, `dfci-prerequisites`, `dfci-oem-support`, `surface-eligibility`, `dfci-settings-surface`, `bricking-irreversible`) plus `## Related Resources` and `## External References`.

## Live fetch record

All four pages re-fetched as raw bytes this session with `curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/120.0 Safari/537.36"`, tag-stripped, and grepped for every string that ships inside quotation marks.

| Page | HTTP | Bytes | `ms.date` / `updated_at` (from `<meta>`) | Strings confirmed |
|---|---|---|---|---|
| `windows/deployment/windows-autopatch/overview/windows-autopatch-faq` | 200 | 89458 | 2026-05-28 / 2026-05-28 | the temporarily-ineligible VBS sentence |
| `intune/device-configuration/templates/ref-dfci-settings-windows` | 200 | 63795 | 2026-06-23 / 2026-07-01 | the eight category headings; the boot compliance sentence; the OS-recovery Warning; the radios wired-connection sentence; the re-imaging sentence; CPU and IO virtualization listing only Not configured and Enabled |
| `intune/device-configuration/templates/configure-dfci-windows` | 200 | 62201 | 2026-06-23 / 2026-07-01 | the lock-beyond-repair warning; the deleting-the-profile Note; the `Conflicts` section and the allow-only-Wi-Fi worked example |
| `surface/surface-manage-dfci-guide` | 200 | 70053 | 2026-07-14 / 2026-07-14 | the replace-the-SSD CAUTION on `USB type A` |

**The Autopatch FAQ fetch succeeded**, so the update-eligibility sentence ships inside quotation marks rather than under the plan's unquoted fallback. **No string in this plan's output was taken from the research ledger.**

**The verifier is expected to re-fetch and diff every quoted string in this file.** `grep -rn "Source:" scripts/` returns zero — no validator in this repository parses evidence lines, so the verifier is the only gate that can catch a fabricated quotation, and this phase quotes seven pages.

## Decisions Made

- **"About a dozen", not "roughly ten".** The distinct setting names in the file were counted at this commit: `CPU and IO virtualization`, `Windows Platform Binary Table (WPBT)`, `Boot from network adapters`, `NFC`, `SD card`, `Radios (Bluetooth, Wi-Fi, NFC, etc.)`, `Wi-Fi`, `Microphones and speakers`, `Microphones`, `Boot from external media (USB, SD)`, `USB type A` — eleven, with plan 05's retire runbook adding `Allow local user to change UEFI (BIOS) settings` as a twelfth. Writing "roughly ten" would have been rounding toward the plan's phrasing rather than toward the measurement.
- **Trap 1's evidence line cites `configure-dfci-windows`.** The live fetch put both the conflict-loop mechanics and the worked example in that page's `Conflicts` section; `ref-dfci-settings-windows` only cross-references it ("For more information, see DFCI profile overview: Conflicts"). The plan asked for the page the worked example comes from, and the fetch answered.
- **The recovery-cost sentence is on the settings reference, not the Surface guide.** The plan's framing implied the recovery half came from the Surface guide alone. It does not — `ref-dfci-settings-windows` carries a generic Warning about replacing the hardware storage, and the Surface guide carries the specific replace-the-SSD case. Both ship: the generic one joins the compliance quote in one contiguous blockquote under the ref evidence line, and the Surface case takes the second evidence line. The two-Source requirement is satisfied on two genuinely different pages, and no line spans two pages.
- **The forward pointer to retire, reuse and recover is prose, not a Markdown link.** Those sections do not exist until plan 05; a link would dangle in `check-nav-hub-links` in the interval.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] A load-bearing phrase was split across a line wrap**

- **Found during:** Task 1
- **Issue:** The first draft wrapped as `... there is no Disabled` / `value, so DFCI can switch ...`. The phrase `no Disabled value` was therefore invisible to a literal grep — exactly the failure plan 03 handed forward, and the same class as wave 1's `Boot Options`.
- **Fix:** Rewrote the sentence so `no Disabled value for` sits entirely on one physical line.
- **Files modified:** `docs/operations/firmware-bios/01-windows-dfci.md`
- **Verification:** `grep -n "no Disabled value"` returns one hit, on one line.
- **Committed in:** `fd2985d9` (Task 1 commit)

**2. [Rule 1 - Bug] A garbled closing sentence in the bricking section**

- **Found during:** Task 3
- **Issue:** The draft closing read "The retire, reuse and recover sequences that sequence depends on are documented in the sections that follow" — a stray antecedent, ungrammatical, and the kind of wrong prose no validator can see.
- **Fix:** Rewrote as an explicit three-part pointer naming the retire sequence, the reuse sequence and the recovery path for a device already locked in the wrong order.
- **Files modified:** `docs/operations/firmware-bios/01-windows-dfci.md`
- **Verification:** Reread in place before the commit.
- **Committed in:** `38ae3fd6` (Task 3 commit)

### Planned fallbacks not needed

- The plan permitted shipping the boot-and-port recovery half and the update-eligibility sentence **unquoted** if a fetch failed. Both fetches returned HTTP 200 and both strings were confirmed byte-for-byte, so both ship quoted.

---

**Total deviations:** 2 auto-fixed (2 Rule 1 bugs, both in prose the gates cannot see)
**Impact on plan:** No scope change. Both fixes were in text this plan authored, caught before the task commit.

## Issues Encountered

- **`git` reports `LF will be replaced by CRLF` on every commit to this file.** The file is LF in the worktree (`cat -A` shows bare `$`), the repository has no `.gitattributes`, and `core.autocrlf` is on. This is the known repository-wide condition, not something this plan introduced, and the committed blob is unaffected. Line endings were checked with `cat -A` before the first edit, per the phase trap.
- **`Boot Options` and the other category names were laid out by hand** so that no category name straddles a line wrap. The eight-name enumeration is the highest-risk sentence in the plan for that failure.

## Handoffs to plan 05

- **`## External References` is now further behind the body.** Plan 03 already flagged three uncited pages; this plan adds a fourth — `windows/deployment/windows-autopatch/overview/windows-autopatch-faq`. All four are reachable through inline `**Source:**` links so nothing dangles, but the tail list is incomplete relative to the body. Plan 05 owns it.
- **The bricking section ends on a prose forward pointer to retire, reuse and recover.** Plan 05 must author `## Retiring a Device`, `## Reusing a Device` and `## Recovering a Device Locked in the Wrong Order` for that sentence to resolve. The pointer names all three explicitly, so leaving one out will read as a gap.
- **The retire runbook is the file's twelfth setting name.** `Allow local user to change UEFI (BIOS) settings` is the name plan 05 adds; the "about a dozen" sentence in `## The Settings Surface` was counted assuming exactly that one addition. If plan 05 ships materially more setting names, that sentence needs re-measuring.
- **Trap 2's Surface half already quotes the replace-the-SSD CAUTION.** Do not re-quote it in the recover section — one quotation per load-bearing fact, per the same discipline that keeps the Bitlocker Warning in `00-overview.md` alone. The recover section's own material is the `Refresh from Network` path and the destructive-order warning.
- **`configure-dfci-windows`'s retire steps were read but not written here.** The live capture confirms the page's own order: update the profile to the exit state, save, unlock, wipe, then delete the Autopilot record — and separately that the Surface guide's removal path performs the destructive steps first. That ordering contrast is plan 05's checkpoint content.

## Handoff to Phase 150

- **The matrix column naming which operating-system features are gated by each firmware setting is Phase 150's, not this plan's.** This plan ships the single virtualization-to-update-eligibility chain in prose; the general column (virtualization to VBS to hotpatch and Device Guard; Secure Boot to attestation; TPM to Autopilot attestation) is handed forward per the phase's own scoping.
- The four raw-byte captures from this session are reproducible with the `curl` invocation recorded above; the `<meta name="ms.date">` / `<meta name="updated_at">` values are the ones shipped in every evidence line.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

`docs/operations/firmware-bios/01-windows-dfci.md` stands at six anchored H2s plus its two tail sections, with the phase's highest-consequence content in place. Ready for `149-05` (the tail sections, the callouts H2, the device lifecycle sequences and `## External References`).

## Self-Check: PASSED

- `docs/operations/firmware-bios/01-windows-dfci.md` — FOUND on disk
- Commit `fd2985d9` — FOUND in `git log --oneline --all`
- Commit `40bd84cf` — FOUND in `git log --oneline --all`
- Commit `38ae3fd6` — FOUND in `git log --oneline --all`
- `node scripts/validation/check-nav-hub-links.mjs` — `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`
- `node scripts/validation/v1.20-milestone-audit.mjs` — `16 passed, 0 failed, 0 skipped`
- `node scripts/validation/check-phase-144.mjs` — `101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)`

---
*Phase: 149-firmware-bios-domain-overview-dfci-surface-uefi*
*Completed: 2026-08-25*
