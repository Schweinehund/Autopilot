---
phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
plan: 03
subsystem: documentation
tags: [dfci, uefi, bios, autopilot-registration, oem-support, surface, intune]

requires:
  - phase: 149-01
    provides: "docs/operations/firmware-bios/01-windows-dfci.md founded with frontmatter, the platform-applicability blockquote, `## What DFCI Is` and the two tail sections"
  - phase: 149-02
    provides: ".planning/REQUIREMENTS.md AMENDED note recording that SC#4's three-path premise was measured against one file only — the ledger record the four-channel ruling rests on"
provides:
  - "`## Prerequisites and Disqualifiers` — the three-part DFCI eligibility gate, the disqualifying prerequisite quoted first-party, all four registration channels classified, the APv2 no-DFCI statement, and the 24H2 Professional known issue with both workaround routes"
  - "`## OEM Support` — the canonical nine-OEM list in the source's own order with its 'Other OEMs are pending.' sentence, the six-OEM and one-OEM variants each recorded as a documented conflict under its own evidence line, and DFCI stated as UNAVAILABLE on Dell, HP and Lenovo"
  - "`## Surface Eligibility` — the prerequisite floor, the self-registration rule, the disapplied-settings Note with its leading Disable, per-model/per-processor routing, and the section's own bound stated on the record"
  - "A live-fetch verification pass over six source pages (five Microsoft Learn plus Project Mu), all HTTP 200, every shipped quotation byte-checked against the fetch"
affects: [149-04, 149-05, 150, 151, 152]

actuals:
  tokens: 3306
  tasks: 3
  commits: 4

tech-stack:
  added: []
  patterns:
    - "Three-list conflict recorded as a conflict: one evidence line per page, never one line spanning two pages (D-56)"
    - "Derived cross-corpus conclusions attributed to this corpus in its own voice, never to the vendor (145 D-08)"
    - "A deliberate scope bound stated inside the shipped document so a verifier cannot read it as a gap (D-32 / D-40)"

key-files:
  created: []
  modified:
    - "docs/operations/firmware-bios/01-windows-dfci.md — +190 lines, three new anchored H2s"

key-decisions:
  - "Checkpoint ruling `four-channel` (human gate, 2026-08-24): document all four registration channels, disqualify CSV upload and Get-WindowsAutopilotInfo including -Online, qualify OEM direct registration and Partner Center / CSP partner, and ship the explicit APv2 no-DFCI statement"
  - "SC#4 is graded THROUGH plan 02's filed REQUIREMENTS.md amendment, not literally; the ROADMAP Success Criterion text was NOT edited (D-05 scopes the amendment to .planning/REQUIREMENTS.md, where it already exists)"
  - "The six-OEM staleness superlative ships as 'the oldest Microsoft Learn page cited anywhere in this guide' rather than D-13's internal 'Pillar-A set' label — 'Pillar' has zero corpus occurrences and is undefined for a service-desk reader; the negative-grep target 'in the whole set' is absent"
  - "The Project Mu one-OEM name ships as an unquoted characterization (a logo image with alt text, not rendered prose) while only its rendered sentence 'More are in the works...' ships inside quotation marks"
  - "No new External References entries added — every new citation carries an inline **Source:** link, and the tail sections are plan 05's to expand"

patterns-established:
  - "Pattern: quote-per-physical-line — a load-bearing quotation is never allowed to wrap, so its acceptance grep matches the literal"
  - "Pattern: classification table with a reason column, four data rows, each on one physical line (147 D-34)"

requirements-completed: [BIOS-02, BIOS-03, BIOS-04]

coverage:
  - id: D1
    description: "The DFCI eligibility gate ships with its disqualifying prerequisite quoted verbatim first-party and all four registration channels classified against it"
    requirement: "BIOS-04"
    verification:
      - kind: other
        ref: "grep -cF \"You can't use DFCI with devices manually registered for Windows Autopilot, such as imported from a csv file.\" docs/operations/firmware-bios/01-windows-dfci.md => 1"
        status: pass
      - kind: other
        ref: "grep -cF 'through an OEM or a Microsoft CSP partner registration to Windows Autopilot.' => 1"
        status: pass
      - kind: other
        ref: "four channel names present: Partner Center=1, OEM direct registration=1, Get-WindowsAutopilotInfo=1, CSV upload=1; classification table = 4 data rows, each one physical line"
        status: pass
      - kind: other
        ref: "live re-fetch of configure-dfci-windows (HTTP 200, ms.date 2026-06-23 / updated_at 2026-07-01) — quotation byte-checked against raw bytes"
        status: pass
    human_judgment: false
  - id: D2
    description: "The APv2 no-registration/no-DFCI statement ships attributed to this corpus's own APv2 documents rather than to Microsoft"
    requirement: "BIOS-04"
    verification:
      - kind: other
        ref: "grep -c 'admin-setup-apv2' docs/operations/firmware-bios/01-windows-dfci.md => 2, in a paragraph closing 'Microsoft does not state it'"
        status: pass
    human_judgment: false
  - id: D3
    description: "The 24H2 Professional known issue ships with both workaround routes under its own two-date Source line"
    requirement: "BIOS-04"
    verification:
      - kind: other
        ref: "grep -c 'KB5046740' => 1; live re-fetch of autopilot/dfci-management (HTTP 200) — known-issue text byte-checked"
        status: pass
    human_judgment: false
  - id: D4
    description: "The nine-OEM list ships in the source's own order with its own closing 'Other OEMs are pending.' sentence under one Source line"
    requirement: "BIOS-03"
    verification:
      - kind: other
        ref: "single physical line '> Acer. Asus. Dynabook. Fujitsu. Microsoft Surface. Panasonic. VAIO. Samsung. NEC.' at :136; grep -cF 'Other OEMs are pending.' => 1"
        status: pass
    human_judgment: false
  - id: D5
    description: "The six-OEM and one-OEM variants are each recorded as a documented conflict, each under its own evidence line, with the six stated as a strict subset on a two-years-staler page"
    requirement: "BIOS-03"
    verification:
      - kind: other
        ref: "3 distinct **Source:** lines in ## OEM Support, each citing exactly 1 URL; grep -cF 'Surface, Acer, Asus, Dynabook, Fujitsu, Panasonic' => 1; grep -c 'microsoft.github.io' => 1; grep -c 'ms.date 2024-06-06' => 2"
        status: pass
      - kind: other
        ref: "barred phrasings absent: grep -ciE 'the six($|[^-])|most business OEMs' => 0; grep -ciE 'in the whole set' => 0"
        status: pass
    human_judgment: false
  - id: D6
    description: "DFCI is presented as UNAVAILABLE on Dell, HP and Lenovo rather than as an option declined"
    requirement: "BIOS-03"
    verification:
      - kind: other
        ref: "line 176: '**Dell, HP and Lenovo are on none of the three lists.** DFCI is unavailable on Dell, HP and Lenovo hardware — it is not an option an administrator declined, not a setting left switched off, and not a capability that can be turned on'"
        status: pass
    human_judgment: false
  - id: D7
    description: "Surface ships bounded — floor, self-registration rule, disapplied-settings Note with its leading Disable, display-name divergence named, and the bound stated on the record"
    requirement: "BIOS-02"
    verification:
      - kind: other
        ref: "all four literals present (1809 floor, commercial SKUs sentence, self-registered sentence, WPBT/NFC/SD card tail); grep -cF 'Disable Boot from network adapters' => 1"
        status: pass
      - kind: other
        ref: "zero markdown tables inside ## Surface Eligibility; zero 'Refresh from Network' occurrences (that path is plan 05's)"
        status: pass
      - kind: other
        ref: "live re-fetch of surface-manage-dfci-guide (HTTP 200) and ref-dfci-settings-windows (HTTP 200) — the display-name divergence confirmed live at refdfci:902 'Boot from network adapters' with no Disable prefix"
        status: pass
    human_judgment: false
  - id: D8
    description: "Corpus gates stay green after every commit in this plan"
    verification:
      - kind: integration
        ref: "node scripts/validation/check-nav-hub-links.mjs => 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total (run after each of the 3 task commits)"
        status: pass
      - kind: integration
        ref: "node scripts/validation/v1.20-milestone-audit.mjs => 16 passed, 0 failed, 0 skipped"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-144.mjs => 101 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
    human_judgment: false
  - id: D9
    description: "Every shipped quotation traces to raw bytes fetched in this execution session, and no research-ledger prose ships inside quotation marks"
    verification:
      - kind: other
        ref: "6 pages fetched with curl -A <browser-UA>, all HTTP 200; each shipped quoted string grepped against the tag-stripped raw capture before authoring"
        status: pass
    human_judgment: true
    rationale: "A mechanical grep proves the string exists on the page but not that the surrounding attribution is honest — the verifier's re-fetch-and-diff pass (D-55) is the only gate that can catch a correctly-quoted string attributed to the wrong page or heading, which is exactly the failure class RESEARCH Pitfalls 3 and 4 record."

duration: 34 min
completed: 2026-08-25
status: complete
---

# Phase 149 Plan 03: DFCI Prerequisites, OEM Support and Surface Eligibility Summary

**The DFCI guide's mechanics half ships: a three-part eligibility gate with all four Autopilot registration channels classified against it, three conflicting OEM support lists recorded as a conflict with one evidence line each, and a Surface section bounded on the record — every quotation re-fetched as raw bytes and byte-checked this session.**

## Checkpoint Resolution

Task 0 was a `checkpoint:decision` (gate: blocking), rated one-way by 149-CONTEXT.md D-05 because a service-desk reader acting on a wrong eligibility gate specifies or buys hardware that cannot be managed.

**The developer's ruling, recorded verbatim, attributed to the orchestrator's human gate on 2026-08-24:**

> `four-channel`

This confirms the existing owner ruling of 2026-08-24. Concretely, as executed:

- All FOUR registration channels this corpus teaches are documented and classified against DFCI's eligibility gate.
- **Disqualified:** CSV bulk upload; `Get-WindowsAutopilotInfo`, including `-Online`.
- **Qualified:** OEM direct registration; Partner Center / CSP partner.
- The explicit APv2 statement ships: an APv2 fleet carries no Autopilot registration at all, therefore no external attestation, therefore no DFCI — attributed to this corpus's own APv2 documents, not to Microsoft.
- ROADMAP Success Criterion 4 says "three". It is graded THROUGH plan 02's filed amendment, not literally. The ROADMAP Success Criterion text was **not** edited: D-05 scopes the amendment to `.planning/REQUIREMENTS.md`, where it already exists and is verified.

The checkpoint's own automated verify was re-measured after the ruling and passed:

```
test -f .planning/phases/149-.../149-02-SUMMARY.md   => present
grep -c "AMENDED" .planning/REQUIREMENTS.md          => 1
```

The ledger record therefore existed before any content depending on it was written.

## Performance

- **Duration:** 34 min
- **Started:** 2026-08-25T02:52:00Z
- **Completed:** 2026-08-25T03:26:48Z
- **Tasks:** 3 of 3 (task 0 was the checkpoint, resolved before this agent started)
- **Files modified:** 1 (`docs/operations/firmware-bios/01-windows-dfci.md`, +190 lines)

## Accomplishments

- **`## Prerequisites and Disqualifiers`** (anchor `dfci-prerequisites`) — opens with the three-part gate as prose (Autopilot registration; external attestation of commercial acquisition; the OS/UEFI floor), then ships the OS floor quoted from `autopilot/dfci-management` and the disqualifying prerequisite quoted contiguously from `configure-dfci-windows`, each under its own two-date `**Source:**` line. Follows with the four-channel classification table, the `-Online` trap called out on its own, the file-level cross-link back to `admin-setup-apv1/01-hardware-hash-upload.md`, the APv2 no-DFCI statement in the corpus's own voice, and the 24H2 Professional known issue with both workaround routes (KB5046740 or later; an Enterprise upgrade during OOBE onboarding).
- **`## OEM Support`** (anchor `dfci-oem-support`) — the canonical nine names in the source's own order on one physical line, immediately followed by the source's own `Other OEMs are pending.`, both under one `**Source:**` line because both come from that one page. Then the conflict, recorded as a conflict: the six-OEM variant quoted from `configure-bios-windows` under its own line (stated as a strict subset dropping VAIO, Samsung and NEC, on a page with `ms.date` 2024-06-06 — roughly two years staler than the canonical list, and the oldest Microsoft Learn page cited anywhere in this guide), and the one-OEM Project Mu variant under its own line recording that the page carries no date at all. Closes with the consequence BIOS-03 requires: Dell, HP and Lenovo appear on none of the three lists, so DFCI is unavailable on those fleets — not declined, not switched off, not turnable on — routing them to `00-overview.md`.
- **`## Surface Eligibility`** (anchor `surface-eligibility`) — exactly four things from `surface-manage-dfci-guide`: the prerequisite floor, the self-registration rule (with its silent-absence failure mode explained), the disapplied-settings Note quoted verbatim including its leading `Disable`, and one routing sentence for per-model and per-processor eligibility. Then the bound stated on the record: no eligible-model table and no model-gated-settings table ship, on the requirements document's per-model-matrices bar plus the high-churn-data ground.
- **A full live-fetch verification pass** over six source pages before a single quotation was authored — including the Project Mu page, which 149-RESEARCH.md had NOT re-fetched.

## Live Fetch Results (D-46 / D-50 / D-52)

All six fetched as raw bytes with `curl -A "Mozilla/5.0 …"`. **Every fetch succeeded — no fallback path was needed.**

| # | Page | HTTP | `ms.date` | `updated_at` | Outcome |
|---|---|---|---|---|---|
| (a) | `autopilot/dfci-management` | 200 | 2025-03-25 | 2026-04-14 | Nine-OEM list, `Other OEMs are pending.`, OS/UEFI floor, 24H2 known issue + KB5046740 — all byte-exact |
| (b) | `intune/device-configuration/templates/configure-dfci-windows` | 200 | 2026-06-23 | 2026-07-01 | Eligibility gate byte-exact; `UEFI CSP` = 0 occurrences (Pitfall 4 re-confirmed); `Enrollment State Page` × 2 (Pitfall 3 re-confirmed) |
| (c) | `intune/device-configuration/templates/configure-bios-windows` | 200 | 2024-06-06 | 2026-07-01 | Six-OEM decoy byte-exact, inside the comparison table's `Supported OEMs` row |
| (d) | `intune/device-configuration/templates/ref-dfci-settings-windows` | 200 | 2026-06-23 | — | Display-name divergence confirmed live: `Boot from network adapters`, no `Disable` prefix |
| (e) | `surface/surface-manage-dfci-guide` | 200 | 2026-07-14 | 2026-07-14 | Floor, commercial-SKU sentence, self-registration rule, disapplied-settings Note — all byte-exact |
| (mu) | `microsoft.github.io/…/DfciScenarios/` | 200 | — | — | **Fetch SUCCEEDED.** One-OEM section confirmed; page carries no date of any kind (zero date meta tags, zero revision strings) |

**Project Mu fetch outcome, recorded as task 2's acceptance criteria require: SUCCESS (HTTP 200).** The unquoted-fallback path in the plan's action text was therefore not exercised. One finding shaped how the variant ships: the page's `OEMs that support DFCI` section contains no text list at all — it is a single logo image with `alt="Microsoft Surface"` linking to the Surface DFCI guide, followed by the rendered sentence `More are in the works...`. Only that rendered sentence ships inside quotation marks; the manufacturer name ships as an unquoted characterization that says explicitly it is rendered as a logo rather than as text.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the prerequisites and disqualifiers section** — `a46f7e94` (feat)
2. **Task 2: Author the OEM support section and record the three-list conflict** — `6c495b39` (feat)
3. **Task 3: Author the bounded Surface eligibility section** — `0ed08481` (feat)

**Plan metadata:** see the `docs(149-03)` commit that carries this SUMMARY.

Every commit's `git diff --name-only HEAD~1 HEAD` listed exactly `docs/operations/firmware-bios/01-windows-dfci.md` and nothing else.

## Files Created/Modified

- `docs/operations/firmware-bios/01-windows-dfci.md` — +190 lines. Now stands at **6 H2s / 4 own-line anchors**: `## What DFCI Is` (plan 01), the three added here, plus the two unanchored tail sections. That matches D-24's anchors = H2 − 2 contract exactly.

## Decisions Made

1. **The staleness superlative is scoped without internal jargon.** D-13 instructs writing "the oldest source in the **Pillar-A** set" and negative-greps the wider "in the whole set" phrasing. `Pillar` has **zero occurrences anywhere in `docs/`** and is undefined for the service-desk reader this file is written for, so shipping it would export planning vocabulary into the corpus. The shipped wording is "the oldest Microsoft Learn page cited anywhere in this guide" — a scoped, independently verifiable superlative (the guide cites five Learn pages; `configure-bios-windows` at 2024-06-06 is the oldest) that satisfies D-13's actual purpose, which is preventing the milestone-wide overclaim the 2024-05-16 counter-source falsifies. `grep -ciE "in the whole set"` returns 0.
2. **The Project Mu OEM name is characterized, not quoted.** The name exists only as image alt text. Rendering alt text as a first-party verbatim quotation would be the exact fabrication class D-52 exists to prevent, so the shipped sentence describes the rendering explicitly and quotes only the page's real prose.
3. **No H3 headings were added.** The structural sibling `docs/operations/patch-management/06-windows-driver-firmware-updates.md` carries **zero** H3s; sub-topics are bold lead-ins. Following that avoids minting heading slugs Phase 151's Recipe #5 would then have to match.
4. **`## External References` was left untouched.** Three newly cited pages are not listed there. Every citation reaches its page through its inline `**Source:**` link, so nothing is unreachable, and the tail sections belong to plan 05. Handed forward below.

## Deviations from Plan

### Auto-fixed / adjusted

**1. [Rule 2 — Missing critical clarity] The `Pillar-A` label was replaced with a reader-facing scope.**
- **Found during:** Task 2 (OEM support section)
- **Issue:** The plan's action text prescribes shipping the superlative scoped to "the **Pillar-A** set". `grep -rc "Pillar" docs/` returns zero corpus occurrences — the term is milestone-planning vocabulary with no definition anywhere a reader can reach, so the shipped sentence would have been unresolvable.
- **Fix:** Shipped "the oldest Microsoft Learn page cited anywhere in this guide", which is narrower than the barred milestone-wide claim, is true, and is checkable against the file's own five Learn citations.
- **Files modified:** `docs/operations/firmware-bios/01-windows-dfci.md`
- **Verification:** `grep -ciE "in the whole set"` => 0 (D-13's negative-grep target absent); the five cited Learn `ms.date` values are 2024-06-06, 2025-03-25, 2026-06-23, 2026-06-23 and 2026-07-14, so the superlative holds as written.
- **Committed in:** `6c495b39`

---

**Total deviations:** 1 adjusted (1 × Rule 2).
**Impact on plan:** None on scope or on any must-have truth. D-13's substantive requirement — never assert the superlative at milestone-wide scope — is satisfied and negative-grepped. The change is a wording choice inside a sentence the plan already required.

## Issues Encountered

None. All three tasks executed as written, every acceptance criterion passed on its first measurement, and no fix-attempt budget was consumed.

One near-miss worth recording for plan 04/05: the eligibility quotation's first sentence would have wrapped at the corpus's ~100-character prose width, which would have made `grep -cF "You can't use DFCI with devices manually registered for Windows Autopilot, such as imported from a csv file."` return 0 while the prose read correctly. Every load-bearing quotation in this plan therefore ships on **one physical line**, with multi-sentence quotes split one sentence per `>` line inside a single contiguous blockquote. Plans 04 and 05 carry more quotations than this one and should adopt the same rule.

## Declined Research Instructions (recorded per D-32)

Two live instructions in `.planning/research/STACK.md` are **declined here, on the record**, so a later planner does not re-derive them as open work:

- **`.planning/research/STACK.md:113`** — the `A-4. Surface DFCI eligibility — a real, enumerable model list` framing, with its enumerated eligible families (Surface Pro X through Pro 12th Edition, the Laptop / Laptop Go / Laptop Studio generations, Hub 3, Book 3, Go 3, Go 4, Studio 2+). **Declined:** `.planning/REQUIREMENTS.md`'s Out of Scope section bars per-model matrices literally, on the stated ground that these guides route to vendor documentation rather than rewrite vendor manuals.
- **`.planning/research/STACK.md:120`** — the **model-gated settings** table proposal (Surface Pro X's camera/audio/Wi-Fi/Bluetooth exclusions; USB type A, Wake-on-LAN and Wake-on-Power supported only on Surface Laptop Go 2 and later). **Declined on the same ground.** The *existence* of per-model and per-processor gating ships as one routing sentence; the values do not.

Both declines are stated inside the shipped document as well as here, which is what stops a verifier reading the phase title's "Surface UEFI" mention as a gap.

## Correction Recorded (D-09)

`REQUIREMENTS.md:73` (BIOS-03) names **Microsoft Surface** verbatim among the nine OEMs. Any claim that "no BIOS requirement clause mentions Surface" is therefore **false** — only the Success-Criterion half of that claim is true. The surviving ground for bounding the Surface section is `REQUIREMENTS.md`'s Out of Scope bar on per-model matrices, which is the ground the shipped document actually names.

## Must-Haves: Per-Truth Satisfaction

| # | Truth | How satisfied |
|---|---|---|
| 1 | Disqualifying prerequisite verbatim from `configure-dfci-windows` | Two-line contiguous blockquote at `:69-70`, both sentences byte-exact against the live fetch, under one two-date `**Source:**` line |
| 2 | All four channels classified | 4-row table at `:86-91`; each row one physical line; `Partner Center`, `OEM direct registration`, `Get-WindowsAutopilotInfo`, `CSV upload` all present |
| 3 | APv2 fleet carries no registration, therefore no DFCI, attributed to this corpus | Paragraph at `:103-111`, closing "Microsoft does not state it, and no citation here should be read as if it did" |
| 4 | 24H2 known issue + workaround from `autopilot/dfci-management` with its own Source line | Blockquote at `:116-117` + Source at `:119`; the Enterprise-upgrade route in prose at `:121-127` |
| 5 | Nine OEMs in source order + `Other OEMs are pending.` under ONE Source line | `:136-138` — one blockquote, one Source line at `:140` |
| 6 | Six-OEM and one-OEM variants each under its OWN Source line; six stated as a strict subset on a staler page | Three distinct Source lines in the section, each with exactly one URL; subset and 2024-06-06 staleness both stated |
| 7 | Dell/HP/Lenovo on none of the three lists; DFCI UNAVAILABLE, not declined | `:176` onward — "not an option an administrator declined, not a setting left switched off, and not a capability that can be turned on" |
| 8 | Bounded Surface section: floor, self-registration rule, disapplied-settings Note with leading `Disable`, one routing sentence | All four present and greppable; zero tables in the section |
| 9 | The Surface bound stated on the record, naming the per-model-matrices bar | Final paragraph of `## Surface Eligibility` |
| 10 | `check-nav-hub-links.mjs` = 0 corpus-link failures after **every** commit | Run after each of the three task commits; 0/0/0 each time |

## Prohibitions: Verified Absent

| Prohibition | Grep | Result |
|---|---|---|
| Barred OEM phrasings (D-49) | `grep -ciE "the six($\|[^-])\|most business OEMs"` | 0 |
| Surface model tables (D-32) | tables inside `## Surface Eligibility` | 0 |
| `UEFI CSP` attributed to `configure-dfci-windows` (Pitfall 4) | that string appears only in plan 01's `## What DFCI Is`, cited to `ref-dfci-settings-windows` | correct attribution unchanged |
| `Enrollment State Page` as a quotation (Pitfall 3) | `grep -c 'Enrollment State Page'` | 0 — `Enrollment Status Page (ESP)`, the corpus's 29-occurrence standard form, is used in prose only |
| Source line spanning two pages (D-56) | every `**Source:**` line | exactly 1 URL each |
| Links to firmware-bios `02-`/`03-`/`04-` (D-26) | `grep -cE '\]\(0[234]-'` | 0 |
| Cross-file link carrying a heading anchor (D-27) | `grep -oE '\]\(\.\./[^)]*#[^)]*\)'` | 0 |
| British spellings (D-59) | the full 11-form regex | 0 |
| Banned phrases (D-58) | `System Center`, `SCCM`, `Autopatch rings`, `SafetyNet` | 0 |
| Code fences / version history (D-31) | `grep -c '^```'` | 0 |
| `SEMM` (D-34) | `grep -c 'SEMM'` | 0 |
| Files edited outside scope (D-44) | `git diff --name-only` per commit | only `01-windows-dfci.md`; `admin-setup-apv1`, `lifecycle` and `admin-setup-apv2` were read and linked, never edited |

## Verification

| Check | Result |
|---|---|
| `node scripts/validation/check-nav-hub-links.mjs` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` — after each of the 3 task commits |
| `node scripts/validation/v1.20-milestone-audit.mjs` | `16 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-144.mjs` (apex) | **`101 PASS, 0 FAIL, 0 SKIPPED`** |

All three measured at HEAD after the final task commit. No `[MEASURED]` row in this SUMMARY was written without running its command.

## Known Stubs

None. Every section this plan added is complete prose with live citations; no placeholder, TODO or empty data path ships.

## Threat Flags

None. The plan's `<threat_model>` disposed T-149-13 (three OEM lists) and T-149-14 (the eligibility gate) as `mitigate`, and both mitigations were applied as specified: each list carries its own evidence line naming the page it came from, the six-OEM decoy is quoted only from the page that carries it, the Project Mu variant was re-fetched at execution time, and the gate shipped only after the blocking human ruling. No security-relevant surface outside the register was introduced — this plan authors static Markdown.

## Handoffs

- **Plan 05** owns `## Related Resources` and `## External References`. Three pages newly cited here are not yet listed under External References: `autopilot/dfci-management`, `surface/surface-manage-dfci-guide` and the Project Mu DFCI Scenarios page. Each is reachable through its inline `**Source:**` link, so nothing dangles, but the tail list is now incomplete relative to the body.
- **Plan 05** also owns the Surface removal path (`Refresh from Network`), deliberately absent here — it sits adjacent to the default retire order behind its own one-way decision checkpoint, because the vendor's own step order performs the destructive operation first.
- **Phase 152** owns the inbound link direction from `docs/admin-setup-apv1/01-hardware-hash-upload.md` back to this guide (D-44). Only the outbound direction was written here.
- **Plans 04 and 05** should adopt the one-physical-line rule for load-bearing quotations recorded under Issues Encountered.

## Next

Ready for `149-04`.

## Self-Check: PASSED

- `docs/operations/firmware-bios/01-windows-dfci.md` — FOUND on disk
- `.planning/phases/149-firmware-bios-domain-overview-dfci-surface-uefi/149-03-SUMMARY.md` — FOUND on disk
- Commits `a46f7e94`, `6c495b39`, `0ed08481`, `ba271d66` — all FOUND in `git log --oneline --all`
