# Architecture Research

**Domain:** Document architecture + pipeline architecture for a mature 282-file Markdown corpus with a heavy chain-validator harness (NOT application architecture)
**Milestone:** v1.21 Enterprise Update, Driver & Firmware/BIOS Governance (Phase 145+)
**Researched:** 2026-08-19
**Confidence:** HIGH on structure/enforcement (every claim below is a command I ran against this worktree at HEAD `a2edcd02`); MEDIUM on build-order sequencing (dependency-derived inference, labelled PREMISE)
**Revised:** 2026-08-19 — adversarial-review corrections + owner rulings applied. **Read the `## Corrections Applied` section at the end before trusting any figure quoted from an earlier draft of this file.**

---

## Evidence Discipline

Every row and claim carries one of three labels. This project has a documented failure mode where reproducible-count-correct rows rested on a false premise, so a correct count is never presented as proof of an assumption.

| Label | Means |
|---|---|
| **[MEASURED]** | A command I ran in this session, with the command shown |
| **[SOURCED]** | A quotation from a first-party repo file, with path + line |
| **[PREMISE]** | My inference. Not verified. Second-guess these first. |

Working tree state for every measurement below:

```
$ git log --oneline -2
a2edcd02 chore(jira): create v1.21 epic RTS-806 (phases pending roadmap)
b21ee88c docs: archive v1.19 project research to milestones/v1.19-research/
```

---

## §0 — The Load-Bearing Finding: `docs/operations/` Is An Unenrolled Class

**This single fact reshapes every placement decision in §1 and every blast-radius row in §2. Read it before anything else.**

**[MEASURED]**
```
$ cd docs && find . -name "*.md" | wc -l
282
$ grep -L "^doc_id:" $(find . -name "*.md") | wc -l
48
$ grep -L "^doc_id:" operations/*/*.md operations/00-index.md | wc -l
20        # ALL 20 operations files lack doc_id
$ grep -c "docs/operations" _registry/RE-index.md
0         # ZERO registry rows for docs/operations
$ node scripts/validation/c17-eee-contract.mjs | tail -1
C17 summary: 234 files checked, 0 with violations, 0 total violations
```

282 files − 48 unenrolled = 234 enrolled, which matches C17's own count. The 48 unenrolled files are: `docs/operations/` (20), `docs/cross-platform/apple-business/` (20), `docs/device-operations/` (5), plus `architecture.md`, `v1.9-DEFERRED-CLEANUP.md`, `_registry/RE-index.md`.

**Do not read that arithmetic as independent corroboration.** Both the `grep -L "^doc_id:"` count and C17's own enrollment filter key on `doc_id` presence, by slightly different rules (C17 additionally requires `relPath.startsWith('docs/')` — `c17-eee-contract.mjs:523-536`). The match is near-tautological. It is a useful consistency check that the two rules do not diverge on this corpus; it is not a second measurement.

**[SOURCED]** `docs/_standards/EEE-SOP-standard.md:327-331`:

> The following directories are **outside Phase-1** and remain deferred to a **future whole-class enrollment milestone (v1.17+)** — enrolled by directory, never cherry-picked by filename.
>
> - `docs/operations/` (~20 documents) — owner-confirmed 2026-07-04

### What this means mechanically — and how the owner ruled it

**OWNER RULING, 2026-08-19 (binding; this is no longer an open question).** New `docs/operations/**` documents authored by v1.21 get **registry rows + filename-map rows, and NO `doc_id`**. They therefore reach the `.docx` publish bundle and Copilot Studio / SharePoint. They are **not** C17-gated. The 20 legacy ops docs are **not** retrofitted.

**Why the "all 20 or none" framing was a false binary.** `EEE-SOP-standard.md:327` governs *EEE enrollment* — the `doc_id` key and the C17 contract that keys off it. It does not govern registry membership. The publish gate is the **registry table**: `build-publish-bundle.mjs` selects `Status: Approved` rows from `docs/_registry/RE-index.md` and fails closed (PUB-03, `:339-345`) if an Approved row has no `filename-map.md` row. Nothing in that path reads `doc_id` from the document's frontmatter. So a registry row without a `doc_id` is exactly the "reachable but not C17-gated" state the ruling names, and it is per-file, not per-directory.

| Placement | doc_id? | Registry row? | filename-map row? | Canary bump? | C17-gated? | In publish bundle / SharePoint / Copilot? |
|---|---|---|---|---|---|---|
| `docs/operations/**` — the 20 legacy files (unchanged) | No | No | No | **No** | **No** | **No** |
| `docs/operations/**` — **v1.21 new files (RULED)** | **No** | **Yes** | **Yes** | **Yes** | **No** | **Yes** |
| `docs/reference/**` | Yes | Yes | Yes | **Yes** | **Yes** | Yes |
| `docs/admin-setup-*/**` | Yes | Yes | Yes | **Yes** | **Yes** | Yes |
| `docs/recipes/**` | Yes | Yes | Yes | **Yes** | **Yes** | Yes |

**The one thing that must be proven before this is planned, not assumed:** run `node scripts/pipeline/build-publish-bundle.mjs` end to end with a *single* scratch registry + filename-map row pointing at an unenrolled `docs/operations/` file, and confirm the `.docx` lands in the bundle and the CSV manifest. The ruling rests on the registry being the sole gate; that is a reading of the pipeline, and this milestone's own evidence discipline says a reading is not a measurement. One scratch run settles it. **[PREMISE]** until that run exists.

**[MEASURED]** Registry row distribution confirming the enrolled classes:
```
$ grep "^| RE-" docs/_registry/RE-index.md | sed 's|^| RE-[0-9]* | \(docs/[^/]*\)/.*|\1|' | sort | uniq -c | sort -rn | head -4
     42 docs/l1-runbooks
     33 docs/l2-runbooks
     26 docs/reference
     14 docs/admin-setup-android
```
(`docs/operations` does not appear at any count.)

### The consequence, as ruled

Pillars A–D as scoped put **10 net-new documents into `docs/operations/`** (Pillar A: 6 in `firmware-bios/`; Pillar B: 1; Pillar C: 2; Pillar D: 1). Under the ruling those documents:

- **DO** reach the `.docx` publish bundle → Copilot Studio / SharePoint (registry + filename-map rows),
- are **not** gated by C17 (no `doc_id`) → **zero** C17 authoring/conformance cost,
- **DO** cost both drift canaries — 10 registry rows and 10 filename-map rows.

The milestone's flagship content is therefore reachable through the knowledge base the project's Core Value statement names, without paying the C17 retrofit of 20 legacy siblings. That is the whole point of the ruling: it separates *reachability* (registry) from *contract conformance* (EEE/C17), which the corpus had until now conflated.

**Two consequences that must be carried into planning:**

1. **The canary literal is computed, never counted from a document list.** See §1 Pillar F. `227 + N` where `N` is the number of new ops docs that actually receive registry rows; the literal is read out of `grep -c "^| RE-" docs/_registry/RE-index.md` *after* the rows land.
2. **The two canaries do not measure the same thing.** `build-filename-map.mjs:282-283` asserts **all** parsed registry rows === 225; `build-publish-bundle.mjs:519,522` asserts **Approved-only** rows === 225. They are equal today only because every row is Approved. If any v1.21 ops row lands at a non-Approved status, the two literals diverge and must be set independently. **[MEASURED]** read of both self-test blocks.

---

## §1 — Placement Per Pillar

Every recommendation below names the rejected alternative, because the roadmap step will be adversarially reviewed.

### Pillar A — Firmware/BIOS governance

**RECOMMENDATION: a hybrid split, not a single home.**

| Deliverable | Placement | New/Modified |
|---|---|---|
| DFCI guide (Autopilot/ADE-registration prerequisite, profile surface, irreversible-unenroll trap) | `docs/operations/firmware-bios/01-windows-dfci.md` | NEW |
| Surface UEFI settings | `docs/operations/firmware-bios/02-surface-uefi.md` | NEW |
| Cross-OEM concept hub | `docs/operations/firmware-bios/00-overview.md` | NEW |
| Dell Command \| Configure | `docs/operations/firmware-bios/03-dell-command-configure.md` | NEW |
| HP Sure Admin / BIOS Configuration Utility | `docs/operations/firmware-bios/04-hp-sure-admin.md` | NEW |
| Lenovo Think BIOS Config | `docs/operations/firmware-bios/05-lenovo-think-bios-config.md` | NEW |
| **Per-OEM capability matrix** | `docs/reference/firmware-oem-matrix.md` | NEW — **enrolled**, RE-ID, registry row, filename-map row, canary bump, C17-gated |

**This matrix is one of the two canary-bumping enrolled artefacts in v1.21** (the other is recipe 05). It is *not* free, and the canary arithmetic in §1 Pillar F and §2 rows 13-16 counts it. The six `firmware-bios/` guides above are ops-class: registry + filename-map rows under the §0 ruling, no `doc_id`, no C17.

**Why the ops-domain per-OEM shape does NOT break the pattern.** The precedent PROJECT.md cites is real and I verified it:

**[MEASURED]**
```
$ ls docs/admin-setup-android/
00-overview.md  01-managed-google-play.md  02-zero-touch-portal.md  03-fully-managed-cobo.md
04-byod-work-profile.md  05-dedicated-devices.md  06-aosp-stub.md  07-knox-mobile-enrollment.md
08-cope-full-admin.md  09-aosp-realwear.md  10-aosp-zebra.md  11-aosp-pico.md
12-aosp-htc-vive-focus.md  13-aosp-meta-quest.md
$ ls docs/reference/aosp-oem-matrix.md && head -3 docs/reference/aosp-oem-matrix.md
docs/reference/aosp-oem-matrix.md
---
doc_id: RE-145
```

But note the precise shape of that precedent, because it is **not** an ops-domain precedent: five per-OEM guides live in an `admin-setup-*` directory, and the **matrix lives in `docs/reference/`** as an enrolled Reference doc (RE-145). That is exactly the split I recommend, transplanted.

**[MEASURED]** No `docs/operations/<domain>/` has ever had a non-platform sibling:
```
$ find docs/operations -type f | sort
docs/operations/00-index.md
docs/operations/app-lifecycle/{00-overview,01-windows-...,02-macos-...,03-ios-...,04-android-...}.md
docs/operations/co-management/{00-overview,01-windows-tenant-attach,02-windows-workload-sliders,03-cocmgmt-migration-paths}.md
docs/operations/drift-migration/{00-overview,01-windows-...,02-macos-...,03-ios-android-...,04-tenant-migration-runbook}.md
docs/operations/patch-management/{00-overview,01-windows-...,02-macos-...,03-ios-...,04-android-...}.md
```
co-management is already the odd one out — 4 files, three of them Windows-scoped, one of them not platform-keyed at all (`03-cocmgmt-migration-paths.md`). **[PREMISE]** So the "ops domains are 00 + per-platform siblings" rule is already only 3-of-4 true, and firmware/BIOS being 00 + per-OEM siblings is a second, smaller deviation, not a break of an unbroken invariant.

**Rejected alternative 1 — extend `patch-management/` with `06-…`, `07-…` OEM files.** Rejected because it would put per-OEM siblings inside the one domain that is 100% per-platform-keyed and whose file numbering is load-bearing in `check-phase-54.mjs` (five pinned path constants at `:23-27`), and because firmware/BIOS *configuration* is not patch *delivery* — the driver/firmware **update** surface (Pillar B) belongs in patch-management; BIOS **settings governance** does not.

**Rejected alternative 2 — a new `docs/admin-setup-firmware/` directory (the `admin-setup-8021x` precedent).** `docs/admin-setup-8021x/` is a genuine precedent for a new topic-domain admin-setup directory (8 files, `00-overview` + foundation + per-platform, RE-134..RE-141 **[MEASURED]** `grep -h "^doc_id:" docs/admin-setup-8021x/*.md`). Rejected, but **the original cost argument was mispriced and is withdrawn.** It claimed "~6 registry rows, ~6 filename-map rows, two canary bumps, and full C17 conformance work". Under the §0 ruling the ops placement *already* pays the ~6 registry rows and ~6 filename-map rows, and the two canary bumps are one-line edits that Pillar F's recipe 05 makes mandatory regardless — **marginal cost of the canary bumps is zero**. The only genuine delta is **C17 conformance on ~6 files**, which is roughly one fifth the cost of the whole-class enrollment the old framing implied, for the same reachability the registry rows already buy.

**The surviving objection is purely semantic, and it is sufficient:** `admin-setup-*` is *provisioning* setup. Firmware governance is a day-2 operational domain, which is what `docs/operations/` is for. Reject on semantics, not on price. **If the owner later wants the six guides C17-gated, this alternative is the cheap way to get it and should be re-costed at ~6 files of C17 work, not at whole-class-enrollment scale.**

**Rejected alternative 3 — DFCI-core plus a matrix, no per-OEM guides.** Already OWNER-RULED against in PROJECT.md. Not re-litigated.

**Guardrail that must survive to plan time [SOURCED, PROJECT.md v1.21 Pillar A]:** these guides stay "Intune-delivery-shaped and link-not-copy where the vendor doc is authoritative."

**C17 trap on the matrix [MEASURED, `docs/_standards/EEE-SOP-standard.md:571`]:** assertion #11 — "Markdown tables with >25 rows have a prose summary paragraph within 5 lines of the table". A per-OEM × per-capability matrix will very likely exceed 25 rows. Assertion #1 additionally bars Mermaid fences in enrolled files. Both apply to `docs/reference/firmware-oem-matrix.md`; neither applies to the `docs/operations/firmware-bios/` guides.

---

### Pillar B — Driver updates promoted out of the WUfB rings H2

**RECOMMENDATION: promote to `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (NEW), and leave a shortened stub H2 in place at `01-windows-wufb-rings.md:151-152` (MODIFIED) that retains the anchor, the "this is NOT a ring" disambiguation, and the whole dual-scan section.**

**The anchor-orphaning concern is empirically unfounded. [MEASURED]:**
```
$ rg -n "driver-firmware-policy" D:/claude/Autopilot
docs\operations\patch-management\01-windows-wufb-rings.md:151:<a id="driver-firmware-policy"></a>
.planning\milestones\v1.5-phases\54-patch-update-management\54-PATTERNS.md:186 …
.planning\milestones\v1.5-phases\54-patch-update-management\54-CONTEXT.md:199 …
.planning\milestones\v1.5-phases\54-patch-update-management\54-02-SUMMARY.md:64 …
.planning\milestones\v1.5-phases\54-patch-update-management\54-02-PLAN.md:299,358,464 …
```
**Exactly one occurrence in `docs/`, and it is the anchor definition itself. Zero inbound links from any document.** The other six hits are archived v1.5 planning artefacts. So the anchor is not load-bearing for navigation — but keep it anyway, because it is free and because the `check-nav-hub-links.mjs` anchor model would flag any future inbound link.

**The real constraint is not the anchor, it is `check-phase-54.mjs`, which live-reads this file. [MEASURED]** `node scripts/validation/check-phase-54.mjs` — three checks bind Pillar B:

| Check | File:line | What it forces |
|---|---|---|
| `V-54-13` | `check-phase-54.mjs:229-242` | `01-windows-wufb-rings.md` must still contain an H2 matching `/^## .*[Dd]river[^\n]*[Ff]irmware[^\n]*$/m` **and** the literal `dual-scan` somewhere in the file. **A clean promotion that deletes the H2 takes this red.** |
| `V-54-11` | `check-phase-54.mjs:173-213` | NEGATIVE: every word-boundary `ring`/`rings` token in that file (outside frontmatter, fences, inline code, anchors and headings) must be preceded within ~40 chars by `WUfB deployment` / `Autopatch` / `Update` / `deployment`, or be one of three whitelisted meta-forms. **Any new prose added to this file that says a bare "ring" fails.** |
| `V-54-12` | `check-phase-54.mjs:214-228` | `## Hotpatch` H2 + literals `May 2026`, `VBS`, `default`, and (`opt-out` OR `April 2026`) must survive Pillar E's Hotpatch re-verification. |

`check-phase-54.mjs` is **not** frozen-aware — it reads live HEAD via a local `readFile()` at `:16-20`. It is a chain member of the apex.

**Rejected alternative — leave the driver content in place and only extend it in situ.** Rejected because Pillar B's added surface (manual-vs-automatic approval workflow, OEM catalog behaviour, ring alignment) would roughly triple a file that is already 214 lines and whose subject is WUfB rings, and every added sentence would have to run the `V-54-11` bare-ring gauntlet.

**Rejected alternative — `docs/operations/firmware-bios/`.** Rejected: driver/firmware *update delivery* is patch management; BIOS *settings* is firmware governance. Splitting them by mechanism, not by the word "firmware", keeps `patch-management/00-overview.md`'s existing routing sentence at `:143-145` truthful.

---

### Pillar C — Application update management (Autopatch, M365 channels, Enterprise App Catalog / WinGet)

**RECOMMENDATION: `docs/operations/patch-management/`, not `app-lifecycle/`, and not both.**

| Deliverable | Placement | New/Modified |
|---|---|---|
| Windows Autopatch full guide | `docs/operations/patch-management/07-windows-autopatch.md` | NEW |
| M365 Apps update channels + Enterprise App Catalog | `docs/operations/patch-management/08-windows-app-updates.md` | NEW |
| **WinGet patching** — same file, separate section | `docs/operations/patch-management/08-windows-app-updates.md` | NEW — **⚠ RESEARCH GAP, see below** |
| Autopatch prerequisites (existing) | `docs/operations/co-management/03-cocmgmt-migration-paths.md` | **MODIFIED — cross-link only. Do not re-author.** |

#### ⚠ WinGet is IN SCOPE by owner ruling and has ZERO research coverage

**Do not let this ride as though it were covered by the Enterprise App Catalog research.** The owner ruled WinGet **IN SCOPE** for v1.21. STACK explicitly excluded it and independently confirmed that **Enterprise App Management is NOT WinGet-based** — it is a separate delivery surface with its own admin model, its own agent/client requirements and its own failure modes. Every WinGet sentence this milestone would ship today would be unsourced.

**Consequence for the roadmap:** the `08-windows-app-updates.md` WinGet section is a **plan-time research deliverable**, not an authoring deliverable. Phase 148 must open with a WinGet research pass (first-party Microsoft Learn WinGet / `winget configure` / Intune WinGet-app surfaces) before any requirement text is written against it. If that research does not land, the honest outcome is to ship `08-` covering M365 channels + EAC only and route WinGet to BACKLOG with the gap named — **not** to write it from the EAC material.

**Why patch-management and not app-lifecycle.** `app-lifecycle/` owns *deployment*; `patch-management/` owns *update enforcement*. The `00-overview.md` of each states its own scope. Putting app **patching** in `patch-management/` keeps the domain boundary at "deploy vs. keep current", which is the boundary the corpus already draws. **[PREMISE]** — this is a judgement about which of two defensible boundaries to preserve, not a measurement.

**The duplication risk is real and already present. [MEASURED]:**
```
$ grep -rln "Autopatch" docs --include=*.md
docs/index.md
docs/operations/00-index.md
docs/operations/co-management/{00-overview,01-windows-tenant-attach,02-windows-workload-sliders,03-cocmgmt-migration-paths}.md
docs/operations/patch-management/{00-overview,01-windows-wufb-rings}.md
docs/reference/linux-capability-matrix.md
```
`co-management/03-cocmgmt-migration-paths.md` already carries `## Windows Autopatch Overview` (`:21`), `## Autopatch Prerequisites` (`:34`), a three-workload prerequisite list, a licensing checklist and a "Before enabling Autopatch" callout. `patch-management/01-windows-wufb-rings.md:61` carries `## Windows Autopatch Rings (Disambiguation)`.

**Anti-duplication rule for the new guide:** it owns enrollment mechanics, the service-managed **Test and Last** ring model (**CORRECTED** — "Test/First/Fast/Broad" is the falsified legacy naming; Autopatch's service-managed rings are **Test** and **Last**, which cannot be removed or renamed, with up to 15 rings per group and 300 groups per tenant), Autopatch app updates (M365 Apps / Edge / Teams), and reporting surfaces. It **cross-links** to `co-management/03` for prerequisites and to `01-windows-wufb-rings.md#autopatch-disambiguation` for the ring-vs-ring distinction. Neither is re-authored.

**Validator trap on the co-management edit. [MEASURED]** `check-phase-53.mjs:328` — `V-53-21` is a NEGATIVE assertion that `03-cocmgmt-migration-paths.md` does **NOT** contain `> **Platform applicability:**`. So the standard ops-domain blockquote must **not** be added to that file while cross-linking it. Also `check-phase-53.mjs:314` (`V-53-20`) pins Autopatch prerequisite literals in that file — trimming the prereq section to "see the new guide" would take it red.

**Rejected alternative — split across both domains (Autopatch → patch-management, EAC/WinGet → app-lifecycle).** Rejected: it puts two halves of one admin task in two domains, and `app-lifecycle/` carries its own counted validator (`V-55-07`, `check-phase-55.mjs:90`, five hardcoded files with a **60-day** freshness cycle) that a sixth file would sit outside — creating an unenforced file in an enforced directory.

---

### Pillar D — `patch-management/05-linux-update-delivery.md`

**RECOMMENDATION: `docs/operations/patch-management/05-linux-update-delivery.md` (NEW). Nothing is pinned to the existing four platform files in a way that a fifth breaks — with one exception, and it is in a different file.**

I checked every count I could find:

| Surface | Pinned to 4/5? | Verdict | Evidence |
|---|---|---|---|
| `check-phase-54.mjs` `PATCH_FILES` | Explicit 5-element array of the existing `00`–`04` literals (`:23-27`, `:34`) — **not** a directory walk | **SAFE.** A new `05-` file is simply outside every `V-54-07/26/30/31` scope | **[MEASURED]** read of `check-phase-54.mjs:9,23-34` |
| `V-54-08` 4-platform comparison-table regex | `/\|[^\n]*\bWindows\b[^\n]*\bmacOS\b[^\n]*\biOS\b[^\n]*\bAndroid\b[^\n]*\|/` | **SAFE** whether Linux is appended after Android or inserted before it | **[MEASURED]** I executed the actual regex against both synthetic header rows — both `true` |
| `docs/operations/00-index.md` Patch table row count | **`V-59-14` hard-pins `patchRows !== 5` (and `appRows !== 5`, `driftRows !== 5`)** → FAIL, live-read via `readFile()` at `check-phase-59.mjs:19-23` | **WAS BLOCKING — RESOLVED by owner ruling: convert to frozen reads (see below)** | **[MEASURED]** `check-phase-59.mjs:446-472`, counter at `:85-87`; `node scripts/validation/check-phase-59.mjs` → 36 passed, 0 failed at HEAD |
| `docs/index.md` `### Patch & Update Management` sub-table | 3 curated rows today; `V-59-16` asserts only that every data row carries a link | **SAFE** to add rows | **[MEASURED]** `check-phase-59.mjs:496-516`; `docs/index.md:301-310` |
| `V-59-11` / `V-59-13` H2/H3 rosters | Subset checks (`missing = list.filter(h => !c.includes(h))`) | **SAFE** to add a 5th/6th section | **[MEASURED]** `check-phase-59.mjs:399-446` |
| `docs/reference/4-platform-capability-comparison.md` | Already **5-platform** despite the filename — H1 reads "5-Platform Capability Comparison"; `## Software Updates` already has a Linux column reading "Not supported" | **MODIFIED, low risk** | **[MEASURED]** `sed -n '15p;103,118p' docs/reference/4-platform-capability-comparison.md` |
| Any `readdirSync` count of `patch-management/` | None found | **SAFE** | **[MEASURED]** `grep -rn "readdirSync" scripts/validation/check-phase-5[3-9].mjs` — all hits are the `walkMd` helper inside the corpus-wide `> **Platform:**` negative scans |

**`V-59-14` is the one genuine blocker. It is RULED: convert `check-phase-59.mjs` to frozen reads.**

**[MEASURED]** `V-59-14` asserts **three** equalities, not one — `patchRows`, `appRows` and `driftRows` (`check-phase-59.mjs:446-473`). Pillar D takes the Patch region **5 → 6** on its own; the four new guides across Pillars B/C/D take it **5 → 9**. Any option that leaves the equality reading live HEAD has to be re-litigated for every one of those rows.

**Owner ruling, 2026-08-19:** convert `check-phase-59.mjs`'s ops-index read to the frozen readers. This makes the assertion mean what it always meant — "Phase 59 shipped 5 patch / N app / N drift rows" — instead of what it accidentally means now: "nobody may ever add a patch-management guide."

**The conversion is neither novel nor risky, and the evidence for that was sitting in the file the whole time:**

- **[MEASURED]** `check-phase-59.mjs:14` **already imports** `readAtV15Close, readAtV116Close` from `./_lib/frozen-at-close.mjs`, and already uses them at `:287`, `:315`, `:659` and `:940`. `:315` is already `readAtV15Close(INDEX_MD)` — the very same ops-index file. The file is already frozen-aware; the `V-59-14` block is a straggler that kept the local live `readFile()` at `:19-23`.
- **[MEASURED]** Phase 128 commit `066a9068` (`feat(128-03): Atom 2a — V116 pin + D-128-C frozen-aware conversion (8 validators/14 checks)`) did exactly this conversion across **8 validators / 14 checks**. This is a well-worn, already-ratified mechanic on this repo.
- **[MEASURED]** `grep -rln "check-phase-59" scripts/validation/check-phase-*.mjs` → **no hits.** No `check-phase-*.mjs` pins `check-phase-59.mjs`'s content, so the frozen-callsite-pinning hazard does not apply here.

**Cost:** one import already present, one read swapped from `readFile(OPS_INDEX)` to `readAtV15Close(OPS_INDEX)` inside the `V-59-14` block. **Belongs in phase 145**, before Pillar D is planned. Confirm `node scripts/validation/check-phase-59.mjs` still exits 0 (36 passed / 0 failed at HEAD) and re-run the apex.

**Rejected alternative — put Linux update delivery in `docs/admin-setup-linux/` or `docs/linux-lifecycle/`.** Rejected: it is an update-enforcement topic, its four peers all live in `patch-management/`, and burying it elsewhere would leave the 4-vs-5-platform gap visually open in the one hub that advertises the comparison.

---

### Pillar F — Device Recipe #5

**RECOMMENDATION: `docs/recipes/05-<enterprise-update-plan>.md` (NEW). This is one of two v1.21 content files with full C17 cost, and one of twelve with registry/canary cost.**

**[MEASURED]** Current state:
```
$ grep -c "^| RE-" docs/_registry/RE-index.md
225
$ grep -c "^| RE-" scripts/pipeline/filename-map.md
225
$ grep -o "^| RE-[0-9]*" docs/_registry/RE-index.md | sort -t- -k2 -n | tail -1
| RE-225
```

### The canary target is 227 + N — and it is COMPUTED, never counted from a document list

**CORRECTED (was "226").** Recipe #5 is not the only new registry row. There are three distinct contributors:

| Contributor | Rows | Enrolled (`doc_id` + C17)? |
|---|---|---|
| `docs/recipes/05-<enterprise-update-plan>.md` | 1 | **Yes** |
| `docs/reference/firmware-oem-matrix.md` (§1 Pillar A) | 1 | **Yes** |
| New `docs/operations/**` guides, per the §0 owner ruling | **N** | No — registry + filename-map row only |

225 + 2 = **227**, then **+ N**. On the pillar scope as written, **N = 10** (Pillar A: 6 × `firmware-bios/`; Pillar B: `06-windows-driver-firmware-updates.md`; Pillar C: `07-windows-autopatch.md`, `08-windows-app-updates.md`; Pillar D: `05-linux-update-delivery.md`) → target **237**.

> **The `10` above is a scope estimate and MUST NOT become the literal.** The canary literals are to be **read out of the registry after the rows land**:
> ```
> $ grep -c "^| RE-" docs/_registry/RE-index.md                              # → build-filename-map.mjs literal
> $ grep -c "^| RE-" docs/_registry/RE-index.md   # ...filtered to Status: Approved → build-publish-bundle.mjs literal
> ```
> Hard-coding a number derived from a document count is precisely how `build-publish-bundle.mjs`'s Approved-row canary sat RED for a whole milestone. Compute, then paste.

| Canary | Path:line | Current literal | Counts |
|---|---|---|---|
| filename-map generator self-test | `scripts/pipeline/build-filename-map.mjs:282-283` | `rows.length === 225` | **all** parsed registry rows |
| publish-bundle Approved-row self-test | `scripts/pipeline/build-publish-bundle.mjs:519, 522` | `rows.length === 225` | **`Status: Approved` rows only** |

**These two are not the same number.** They are equal today only because every row is Approved. If any v1.21 registry row lands non-Approved, set each literal from its own measurement — do not copy one into the other.

**[SOURCED]** `build-publish-bundle.mjs:515-518` records that this second canary "was MISSED then — RED since the v1.18 close … both canaries now bumped together". **Bump both in the same commit, and in the same phase the registry rows land** (see §3 and §4 — this is a corrected ordering constraint). **[MEASURED]** No `check-phase-*.mjs` pins the literal `225` (`grep -rn "225" scripts/validation/check-phase-*.mjs` → no hits), so the canaries are the only enforcement.

`filename-map.md` must be **regenerated** via `node scripts/pipeline/build-filename-map.mjs`, never hand-edited — the generator is the source of truth and its own self-test proves the parse.

**Two carried deferrals fire on this recipe:**

| Item | Trigger text | Fires? |
|---|---|---|
| `ROLLBACK-RECOVERY-DIVERGENCE-COUNT` | "a third recipe needs the `## Rollback/Recovery` slot" | **[MEASURED]** `grep -c "^## Rollback" docs/recipes/*.md` → 01:0, 02:0, 03:1, 04:1; `docs/_templates/recipe-template.md` has **no** `## Rollback/Recovery` H2 (`grep -n "^## " docs/_templates/recipe-template.md` → Summary/Prerequisites/Unsupported/Steps/Verification/Configuration-Caused Failures/See Also). An update plan almost certainly needs a rollback slot → **FIRES**, taking the tally to 3-of-5 and forcing the template question. |
| `RECIPE-OUTBOUND-LINK-COVERAGE` | "**a fifth or later recipe lands** and the coverage gap becomes an operational cost" | **FIRES by construction.** |
| `SHARED-TAXONOMY-DOC` | "a third *lockdown* recipe lands" | Does **not** fire — an update plan is not a lockdown recipe. Matches PROJECT.md. |

**Rejected alternative — ship the ring topology as a settings-catalog export or Graph payload under a new `docs/_config/` class.** Rejected for v1.21: **[MEASURED, STATE.md]** "no configuration artifact of any kind exists in the repository". Founding a new doc class *and* an eight-pillar content milestone in one go is the shape that produced v1.18's six-phase cost for two recipes. The recipe class already exists and already yields "a concrete, reproducible device configuration" — use it.

---

## §2 — Integration Points and Blast Radius

**ENFORCED** = a validator fails if you skip it, with the check ID named. **CONVENTION** = nothing fails; a human reviewer or a stale doc is the only consequence.

| # | Surface | New/Modified | Enforced by | Status |
|---|---|---|---|---|
| 1 | `docs/operations/00-index.md` — Patch table gains a Linux row | MODIFIED | `V-59-14`, `check-phase-59.mjs:447-474`, live read | **ENFORCED — and it is an equality pin at 5. This is the §1 Pillar D blocker.** |
| 2 | `docs/operations/00-index.md` — new `## Firmware & BIOS Governance` H2 + table | MODIFIED | `V-59-13` (`check-phase-59.mjs:430-445`) is a **subset** check → adding a 6th H2 is safe. `V-65-10` (`check-phase-65.mjs:200-208`) requires `## Apple Business` to survive. | ENFORCED (subset only) — the Phase-65 append of a 5th H2 is the direct precedent |
| 3 | `docs/operations/00-index.md` — Version History row | MODIFIED | Nothing tests it | **CONVENTION** (every prior ops-index edit added one — `:78-79`) |
| 4 | `docs/index.md` — `### Patch & Update Management` sub-table rows | MODIFIED | `V-59-16` (`check-phase-59.mjs:496-516`) — link-presence per row only, no count | ENFORCED (weakly) |
| 5 | `docs/index.md` — new `### Firmware & BIOS Governance` H3 under `## Operations` | MODIFIED | `V-59-11` subset check | ENFORCED (subset only) |
| 6 | `docs/index.md` — recipes table row for recipe 05 | MODIFIED | Successor of `V-137-TABLEROW-03/04` (`check-phase-137.mjs:52-68`) — a line-scoped `^\| \[.*\]\(recipes/05-…\)` regex | **ENFORCED once the successor leaf is authored** |
| 7 | `docs/index.md:38` — the single quick-nav bullet line | MODIFIED | `V-137-BULLET` (`check-phase-137.mjs:76-97`) — requires **exactly one** line matching `^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)` containing both existing fragments | **ENFORCED. Append recipe 05's fragment to that one line; never split it.** This is the WR-01 Phase-132 defect pattern. |
| 8 | `docs/common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md` | **NOT MODIFIED for recipes** | `V-132-HUBSNOTWIRED` + `V-137-HUBSNOTWIRED` | **ENFORCED — negative.** See §3 |
| 9 | `quick-ref-l1.md` / `quick-ref-l2.md` — new update/firmware quick-ref sections | MODIFIED (optional) | `V-59-32` / `V-57-25` preserve **existing** H2 literals only | CONVENTION for additions; ENFORCED against removal/rename |
| 10 | Glossaries — DFCI, Hotpatch, Autopatch ring, `unattended-upgrades`, update channel | MODIFIED | C17 (all six glossaries are enrolled) + the milestone-audit C5/C10 90-day tests — but **those now read frozen**, see below | Mixed; see the zero-margin note |
| 11 | `docs/reference/4-platform-capability-comparison.md` `## Software Updates` | MODIFIED | C17 #11 (>25-row prose summary) and C17 #12 (≤200-char blockquote) | ENFORCED via C17 |
| 12 | Per-platform capability matrices (`linux-`, `android-`, `macos-`, `ios-capability-matrix.md`) | MODIFIED (only if a row's verdict changes) | `V-58-22` / `V-58-23` preserve named anchors + 5 H2 literals across the matrices (`check-phase-58.mjs:365-399`) | **ENFORCED — line-shifting edits to `android-capability-matrix.md` are the known 139-pin hazard.** Prefer cell-value edits over structural edits. |
| 13 | `docs/_registry/RE-index.md` — **12 new rows** at `Status: Approved`: RE-226 (recipe 05), RE-227 (`reference/firmware-oem-matrix.md`), + **N=10** `docs/operations/**` rows per the §0 ruling | MODIFIED | Successor of `V-132-REGISTRY` (`check-phase-132.mjs:45-59`) + `build-publish-bundle.mjs:339-345` PUB-03 fail-closed coverage join | ENFORCED |
| 14 | `scripts/pipeline/filename-map.md` — **regenerate**, do not hand-edit | MODIFIED | PUB-03 coverage check fails closed if any Approved RE-ID has no map row | ENFORCED |
| 15 | `build-filename-map.mjs:282-283` canary 225 → **227 + N** (all rows) | MODIFIED | Its own `--self-test` | ENFORCED — **set the literal from `grep -c "^\| RE-"` after the rows land, never from a document count** |
| 16 | `build-publish-bundle.mjs:519, 522` canary 225 → **227 + N** (Approved rows only) | MODIFIED | Its own `--self-test` | **ENFORCED — the one that sat RED for a whole milestone. Bump in the same commit as #15, and measure it separately: #15 counts all rows, #16 counts Approved rows only.** |
| 17 | Publish bundle regenerated `--version=v1.21` | Generated | `publish-bundle-gate.cjs` Stop-hook | ENFORCED (nudge/warn) |
| 18 | Corpus-wide: no bare `> **Platform:**` in any new file | NEW files | **Three** independent corpus-wide negative scans: `V-54-27` (`check-phase-54.mjs:437-479`), `V-55-27`, `V-56-28` — each walks all of `docs/` **and** `.planning/` | **ENFORCED ×3. Use `> **Platform applicability:**`.** |
| 19 | `.planning/REQUIREMENTS.md` / `.planning/ROADMAP.md` must not contain the literal formed by `05-compliance-` + `policy.md` | v1.21 planning docs | `V-54-21` (`check-phase-54.mjs:347-362`) and `V-54-32` (`:560-...`), both live-reading | **ENFORCED — and this is the named `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01` exposure. Do not transcribe that literal into either file when discussing Pillar D's `05-` prefix.** |
| 20 | New CI workflow `audit-harness-v1.21-integrity.yml` (the 18th) | NEW | Close-phase convention; must be born with `fetch-depth: 0` | **[MEASURED]** `ls .github/workflows/ \| wc -l` → 17 |
| 21 | `docs/l1-runbooks/00-index.md`, `docs/decision-trees/` | Optional | Named as the two **non-barred** surfaces in `HUB-WIRING-NON-BARRED-SURFACE` | CONVENTION |
| **22** | **`docs/operations/patch-management/00-overview.md`** — routing matrix gains the driver/firmware guide (B) and the Linux guide (D); Autopatch routing (C); frontmatter re-verification (E) | **MODIFIED by four pillars** | **Pinned `PATCH_FILES` member** (`check-phase-54.mjs:23`, `:35`) carrying **`V-54-07`** (60-day frontmatter cycle, `:88-120`), **`V-54-08`** (4-platform comparison table, `:127`), **`V-54-09`** (Ring Terminology H2 + WUfB/Autopatch ring proximity, `:145`), **`V-54-10`** (deferral vs enforcement prose, `:161`), **`V-54-29`** (NEGATIVE — body prose must NOT substantively contain `Hotpatch` / `VBS` / `MEETS_STRONG_INTEGRITY`, `:494`). All live-read via `readFile()` at `check-phase-54.mjs:16-20`; `check-phase-54` is an apex chain member. | **ENFORCED ×5 on a live-HEAD apex chain member. The single most constrained file in v1.21.** |

#### Row 22's four-pillar collision, stated as traps

`docs/operations/patch-management/00-overview.md` is touched by B, C, D **and** E, and it was absent from this table entirely in the first draft. Four things must all hold on the same file:

- **`V-54-08` — the 4-platform comparison table must survive Pillar D.** The regex is `/\|[^\n]*\bWindows\b[^\n]*\bmacOS\b[^\n]*\biOS\b[^\n]*\bAndroid\b[^\n]*\|/`. Appending a Linux column is safe (verified by executing the regex against both synthetic header rows); **replacing** the table with a 5-platform rewrite that drops one of the four literals is not.
- **`V-54-09` — the Ring Terminology H2 and the WUfB-ring / Autopatch-ring proximity window must survive Pillar C.** The Autopatch guide's cross-link must not restructure this section.
- **`V-54-29` is a NEGATIVE assertion and Pillar E is the pillar most likely to trip it.** Pillar E re-verifies the Hotpatch claims — but `Hotpatch`, `VBS` and `MEETS_STRONG_INTEGRITY` must **not** appear substantively in `00-overview.md`'s body prose. Do the Hotpatch work in `01-windows-wufb-rings.md` (where `V-54-12` *requires* it) and keep it out of `00-`.
- **`V-54-07` — the 60-day cycle.** See the 60-day trap below. `00-overview.md` is one of the five.

The routing matrix at `:141-145` is where Pillars B and D add their rows; `:175` of this document records the placement decision that keeps that matrix truthful (driver *delivery* stays in `patch-management/`, BIOS *settings* go to `firmware-bios/`), and `V-54-13` independently forces the driver/firmware H2 to survive in `01-windows-wufb-rings.md`.

### The glossary zero-margin hazard: re-measured, and it has changed

**[MEASURED]** As of 2026-08-19:
```
_glossary.md / -android / -linux / -macos / -network:  last_verified 2026-06-29, review_by 2026-09-27   (span exactly 90d)
_glossary-apple-business.md:                           last_verified 2026-05-21, review_by 2026-07-20   (span 60d; 30 days PAST DUE)
```

**But the harness leg of the hazard appears discharged.** **[MEASURED]**
```
$ grep -l "createFrozenCorpusReader" scripts/validation/v1.*-milestone-audit.mjs | wc -l
17          # of 18 total; the sole holdout is v1.20-milestone-audit.mjs
$ grep -ln "diffDays > 90\|diffDays > 60" scripts/validation/check-phase-*.mjs
(no output)
```

> **CORRECTED — that grep is `diffDays`-specific and the repo uses `days`.** Its empty output proves nothing about the freshness surface. The real roster, re-measured:
>
> ```
> $ grep -n "days > 60\|days > 90" scripts/validation/check-phase-*.mjs
> check-phase-49.mjs:279   check-phase-50.mjs:370   check-phase-50.mjs:396
> check-phase-51.mjs:113   check-phase-52.mjs:85    check-phase-53.mjs:102
> check-phase-54.mjs:116   check-phase-55.mjs:116   check-phase-56.mjs:115
> ```
>
> **Nine sites across eight validators.** Two of them were missing from this document's roster and both pin v1.21 surfaces:
>
> - **`check-phase-53.mjs:102`** — 60-day cycle over the `docs/operations/co-management/*` content files, which Pillar C modifies (`03-cocmgmt-migration-paths.md` cross-link).
> - **`check-phase-56.mjs:115`** — 60-day cycle over `docs/operations/drift-migration/*`.
>
> And one must be **reclassified**: **`check-phase-49.mjs:279` is FROZEN, not live** — its files are read via `readAtV15Close(f)` at `:266`, so a live frontmatter edit cannot move it. The genuinely **live** 60-day checks are `check-phase-50/51/52/53/54/55/56`.

The `>90` C5/C10 tests live only in the milestone-audit harnesses (`v1.19-milestone-audit.mjs:412,549`), and 17 of 18 now read their corpus at their own frozen close SHA. **[PREMISE]** therefore a live glossary edit can no longer flip those six workflows red — the hazard as stated in PROJECT.md's Key Context reflects the pre-SWEEP-05 world. **Do not carry it forward unre-measured; but do not assume my inference either — re-measure at plan time by editing a glossary date in a scratch commit and re-running the six workflows' harnesses.** The live 60-day checks listed above are all scoped to named non-glossary files.

*(This block's original headline — that "no freshness test exists in any `check-phase-*.mjs`" — is struck. The conclusion it was reaching, about the >90 glossary rule, stands; the supporting grep did not.)*

### The 60-day trap on Pillar E

**[MEASURED]** `check-phase-54.mjs:114-116` (the `days > 60` throw is at **`:116`**):
```js
const days = (rb - lv) / (1000 * 60 * 60 * 24);
if (days > 60) issues.push("review_by > 60 days after last_verified (was " + Math.round(days) + ")");
```
All five `patch-management/` docs sit at `last_verified: 2026-04-28` / `review_by: 2026-06-27` — span exactly 60, **53 days past due today**. Pillar E's re-verification must set `review_by = last_verified + ≤60 days`, **not** the 90-day cadence used everywhere else in the corpus. `V-55-07` imposes the same 60-day rule on the five `app-lifecycle/` files. Getting this wrong is a silent, apex-reddening one-character mistake.

---

## §3 — Navigation-Last Ordering: Exactly Which Hubs May Link What

### The four hubs, and the three that are barred

**[MEASURED]** `scripts/validation/check-nav-hub-links.mjs:36-41` — the D-01 locked roster of four nav-hubs is `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`.

**[MEASURED]** `check-phase-132.mjs:40` and `check-phase-137.mjs:40` — the barred set is the **three troubleshooting hubs only**: `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`. `docs/index.md` is deliberately **not** in `HUB_FILES` — it is the hub that *does* carry the recipes table.

| Surface | May link `docs/recipes/05-…`? | May link the new `operations/` guides? | Enforcement |
|---|---|---|---|
| `docs/index.md` | **YES — required.** Table row + quick-nav bullet fragment | YES | `V-137-TABLEROW-*`, `V-137-BULLET` (successors) |
| `docs/common-issues.md` | **NO** | YES (they are not recipes) | `V-132-HUBSNOTWIRED`, `V-137-HUBSNOTWIRED` |
| `docs/quick-ref-l1.md` | **NO** | YES | same |
| `docs/quick-ref-l2.md` | **NO** | YES | same |
| `docs/operations/00-index.md` | not a recipe surface | **YES — required** | `V-59-13/14` |
| `docs/l1-runbooks/00-index.md` | **YES, permitted** (explicitly non-barred) | YES | `HUB-WIRING-NON-BARRED-SURFACE` names it |
| `docs/decision-trees/**` | **YES, permitted** (explicitly non-barred) | YES | same |

### The bar is under-enforced — do not rely on it, honour it

**[MEASURED]** `check-phase-132.mjs:97` tests `/docs\/recipes|01-shared-windows-avd|02-shared-ipad/`. The hub files live *inside* `docs/`, so a real relative link from `docs/quick-ref-l1.md` reads `recipes/05-…`, never `docs/recipes/…` — **the generic arm never fires**, and the other two arms name recipes 01 and 02 only. `check-phase-137.mjs:113` covers `recipes/03-` and `recipes/04-` with corrected literals.

**Therefore: `recipes/05-` is enforced by nothing today.** The successor leaf must add `const HUB_LITERAL_05 = 'recipes/05-';` following `check-phase-137.mjs:48-49` verbatim (`HUB_LITERAL_03` is at **`:48`**, `HUB_LITERAL_04` at `:49`; both are consumed at `:104` and `:110`). **[SOURCED]** `v1.20-DEFERRED-CLEANUP.md:276-293` (`V-132-HUBSNOTWIRED-REGEX-BROKEN`) confirms `check-phase-132.mjs` is byte-unchanged since the V119 pin and is to stay that way — **fix additively in the successor, never edit the frozen validator.**

### Correct wiring order

1. Content lands (new `operations/` files, new `reference/` matrix, recipe 05) — **no hub edits and no registry rows in the same phase**. Content phases author documents; they do not touch `docs/_registry/RE-index.md`.
2. **ALL registry work lands in ONE phase — phase 152 — as one atomic unit:** all 12 rows (RE-226 recipe 05, RE-227 `firmware-oem-matrix.md`, + N=10 ops rows) at `Status: Approved`, `filename-map.md` **regenerated** via `node scripts/pipeline/build-filename-map.mjs`, **and both canary literals bumped in the same commit**.

   > **This is a corrected ordering constraint.** The earlier draft let the `reference/` matrix carry its own registry row in phase 149-150 while the canaries bumped in 152. That splits an assertion from the state it asserts over: the moment a row lands without its canary bump, **both `--self-test` canaries sit RED, and they stay RED across three phases** (149 → 152). The rows and the literals they count are one atom. Never split them.

3. **Then** `docs/index.md` (recipes table row, quick-nav bullet fragment, Operations H3), `docs/operations/00-index.md` (Patch row + Firmware H2 + Version History row).
4. **Then** the successor leaf validator asserting the wiring, plus an explicit written hubs-not-wired ruling.
5. Full-corpus C17 green + `check-nav-hub-links.mjs` at 0 failures.

**What breaks if you violate it:** wiring a hub to a document that does not yet exist takes `check-nav-hub-links.mjs` red immediately (it is a corpus-wide relative-link resolver with **no baseline, allowlist, ratchet or expected-failure list** — `check-nav-hub-links.mjs:6-7`), and that checker is spawned by `check-phase-143.mjs`, which is inside the apex chain.

---

## §4 — Suggested Build Order

Eight pillars, two hard constraints from the prompt: (a) the harness-close cluster (G+H) is the FINAL phase and never batches with content; (b) integration/nav wiring is last among content phases.

| # | Phase | Pillars | Why here | What breaks if moved earlier/later |
|---|---|---|---|---|
| **145** | **Freshness re-verification + the `V-59-14` frozen-read conversion + the `_glossary-linux.md:157` archival-drift fix** | **E** (+ the Pillar D validator gate + the §7 pre-existing RED) | Every other content phase edits at least one of the five past-due `patch-management/` docs. Re-verifying *first* means one dated `last_verified` bump per file, not five phases each re-touching frontmatter. It also front-loads the two hard external deadlines (Apple OS 26, Android 2026-10-31) and the past-its-date Hotpatch "May 2026 default" claim, both of which downstream phases would otherwise copy forward stale. **Deliverables (explicit, so a generated roadmap cannot drop them):** (1) `review_by = last_verified + ≤60d` on all five `patch-management/` docs; (2) convert `V-59-14`'s ops-index read in `check-phase-59.mjs` to `readAtV15Close`; (3) **fix `docs/_glossary-linux.md:157`** per §7 — demote the `[PITFALL-2](../.planning/research/PITFALLS.md)` markdown link to the inline-code form the other seven references already use. | Deferring it means Pillars B/C/D each independently touch these files' frontmatter and each independently risks the 60-day `V-54-07` trap. Deferring (2) means Pillar D lands a red apex child. **Deferring (3) means v1.21's own close-time research archival re-reddens `check-phase-143` → the apex, AFTER the close-gate apex has been measured green** — the failure mode is invisible until the milestone is already closing. |
| **146** | **Driver/firmware update depth** | **B** | Smallest content delta, and it is the only pillar that edits `01-windows-wufb-rings.md` — the file with the two most hostile live assertions (`V-54-11` bare-ring, `V-54-13` H2+dual-scan). Do that surgery once, early, in isolation, with the apex re-run as the gate. | If B lands after C, both phases edit `01-windows-wufb-rings.md` and the bare-ring negative has to be re-cleared twice. |
| **147** | **Linux update delivery** | **D** | Depends on 145's `V-59-14` frozen-read conversion actually having landed. Independent of A/B/C content. Small (one file). | Landing D before the conversion puts a red apex child in the middle of the milestone. |
| **148** | **Application update management** (+ the **WinGet research pass**) | **C** | Larger than B/D, and it must cross-link `co-management/03` (which carries `V-53-20`/`V-53-21` **and the `check-phase-53.mjs:102` 60-day cycle**) and `01-windows-wufb-rings.md#autopatch-disambiguation`, both of which are stable only after 146. **This phase opens with the WinGet research gap named in §1 Pillar C — WinGet is owner-ruled IN SCOPE with zero research behind it.** | If C lands before B, the Autopatch guide cross-links a driver section that is about to move. If the WinGet research is skipped, `08-windows-app-updates.md` ships an unsourced section on a surface that is provably *not* Enterprise App Management. |
| **149-150** | **Firmware/BIOS domain** (likely two phases: 149 = DFCI + Surface UEFI + `00-overview`; 150 = three per-OEM guides + the `reference/` matrix) | **A** | The largest net-new surface, and the only content pillar with **zero** existing corpus to conflict with (`DFCI` = 0 occurrences). It is genuinely independent of B/C/D, so it can be scheduled last among the domain pillars where the milestone's remaining budget is known. The `reference/` matrix is authored here (C17 conformance work is a 149-150 deliverable) but **its registry row is NOT** — all registry rows and both canary bumps land together in 152. | Landing A first would put the biggest unknown before the cheap wins, and would author OEM guides before the driver-update guide (146) that they must cross-link. **Landing the matrix's registry row here would leave both `--self-test` canaries RED from 149 through 152** — see §3 step 2. |
| **151** | **Recipe #5** | **F** | Recipe 05 is a *synthesis* artifact — it prescribes ring topology, deadlines, driver/firmware approval cadence and app-update channels. Every one of those is authored in 146/147/148/149-150. Writing it earlier means writing it twice. | If F lands before B/C/D, its cross-links point at content that does not exist → `check-nav-hub-links.mjs` red. |
| **152** | **Integration, registry & navigation-last close** | integration for A–F | The nav-last discipline. **All 12 registry rows (RE-226, RE-227 + N=10 ops rows) at `Status: Approved`, filename-map regeneration, and both canary bumps — one atomic unit, one commit** (§3 step 2). Then all hub edits, `operations/00-index.md`, `docs/index.md`, the successor leaf validators, the explicit hubs-not-wired ruling, full-corpus C17 + link-checker green. | Wiring before content = link-checker red (§3). Wiring inside a content phase = the WR-01 defect pattern (a quick-nav bullet forgotten because the phase's attention was on prose). |
| **153** | **Harness close: V120 pin + 19th Path-A lineage bump + C17 frozen-aware conversion** | **G + H** | Hard constraint (a). Also genuinely last by dependency: `check-phase-153.mjs` must chain `[48..152]`, which cannot be authored until 152 exists. | Batching G/H with content is exactly the "pre-close scramble folded into an unrelated content milestone" that CARVE-1's own routing barred verbatim. |

**Optional split of 153 into two plans, not two phases:** Atom 1 = V120 pin + `v1.20-milestone-audit.mjs` conversion (the 18th) + `v1.21-milestone-audit.mjs` Path-A copy + sidecar + BASELINE_25; Atom 2 = the five-harness C17 conversion; Atom 3 = `check-phase-145..153.mjs` + apex + the 18th workflow + publish bundle `--version=v1.21`.

**[PREMISE]** on phase count: nine phases (145-153) is between v1.14 (12) and v1.16 (6). PROJECT.md's own estimate names v1.14 as the comparable shape, so nine may be light; 149-150 and 148 are the likeliest to want splitting once plan counts are known.

### Ordering dependencies stated as breakages

- **145 → 152 (CORRECTED from "145 → 147").** The old statement was falsifiable and false: the `V-59-14` equality counts rows in `docs/operations/00-index.md`, and **every ops-index edit lands in 152**, not in 147 (§3 step 3, §2 row 1). Pillar D authoring `patch-management/05-linux-update-delivery.md` in 147 adds no ops-index row and therefore reddens nothing. The real dependency is **145 → 152**: the frozen-read conversion must land before the Patch table gains its 6th row in 152. *(145 → 147 survives only as a soft ordering preference — do the validator conversion before the content it protects — not as a breakage.)*
- **145 → 152 (second edge, same phase pair):** the `_glossary-linux.md:157` link fix must land before v1.21's research is archived at close.
- **146 → 148:** the Autopatch guide cross-links `01-windows-wufb-rings.md#autopatch-disambiguation` and the promoted driver guide; both must be final.
- **146/147/148/149-150 → 151:** recipe 05 cites all four; citing not-yet-existing files fails `check-nav-hub-links.mjs` with no allowlist to hide behind.
- **all content → 152:** nav-last.
- **152 → 153:** the apex `CHAIN_END` is `N-1` (`check-phase-144.mjs:116` — `const CHAIN_END = 143; // [48..N-1] invariant`), so the close phase's validator cannot be authored until the last content phase's number is fixed.
- **G before H within 153:** H's conversion needs the `V120` pin only if you also convert `v1.20-milestone-audit.mjs`. The five v1.15–v1.19 C17 conversions do **not** need V120 (their own pins already exist), so H can technically precede G — but keeping G first keeps a single ordering rule.

---

## §5 — Pillar H: The Actual Shape of the C17 Frozen-Aware Conversion

### Where the guard sits, verbatim

**[MEASURED]** `scripts/validation/v1.15-milestone-audit.mjs:817-845`, with sibling blocks at `v1.16:817-845`, `v1.17:817-845`, `v1.18:817-845`, `v1.19:817-845` (all five open at line 818 with the same `name:` string; `grep -n "c17\|C17"` returns the same line numbers 818/828/829/834/838/842 in all five).

> **CORRECTED — the five blocks are *functionally* identical, not byte-identical.** `git hash-object` over `sed -n '817,845p'` yields **two** distinct hashes: v1.15 stands alone, and v1.16–v1.19 are byte-identical to each other. **[MEASURED]** `diff <(sed -n '817,845p' v1.15-…) <(sed -n '817,845p' v1.16-…)` → exactly **two differing lines, both comments** (v1.15: *"This is the first milestone where the Path-A harness gates a corpus-wide STRUCTURAL contract…"*; v1.16+: *"Inherited byte-unchanged into v1.16 (this milestone does not re-fold or re-derive the contract)."*). **Executable code is identical in all five.** The shared-helper conclusion below therefore survives intact — but do not carry a `[MEASURED]` byte-identity claim into a plan, because a plan that diffs the five files expecting zero delta will stall on a comment.

```js
run() {
  const CONTRACT = 'scripts/validation/c17-eee-contract.mjs';
  // SWEEP-05 EXCEPTION (Phase 140, deferred per CONTEXT.md <deferred>): this guard and the C17
  // spawn below intentionally stay LIVE-HEAD. c17-eee-contract.mjs is CARVE Category 3, owned by
  // Phase 143 -- converting this leg here would collide two phases' scopes. …
  if (!existsSync(join(process.cwd(), CONTRACT))) {
    return { pass: false, detail: 'C17 FAIL: ' + CONTRACT + ' not present (EEE contract validator missing)' };
  }
  try {
    execFileSync('node', [CONTRACT], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
    return { pass: true, detail: 'c17-eee-contract.mjs exits 0 (all enrolled files pass 13 assertions)' };
  } catch (err) { … execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'C17 FAIL: ' }) … }
}
```

Two live-HEAD legs, precisely:
1. **The contract-presence guard** — `existsSync(join(process.cwd(), 'scripts/validation/c17-eee-contract.mjs'))`. Reads the *validator file* at live HEAD.
2. **The spawn** — `execFileSync('node', [CONTRACT], { cwd: process.cwd() })`. Runs the *live* validator over the *live* `docs/` tree.

Everything else in these harnesses already reads frozen: `v1.15-milestone-audit.mjs:50-58` sets `MILESTONE_TAG = 'V115'` and builds `const FROZEN = createFrozenCorpusReader(MILESTONE_TAG, { extraPaths: [SIDECAR_PATH] })`, and `readFile()` / `walkMd()` at `:64-76` are pure `FROZEN` accessors.

### The drift this creates

Leg 2 is the substantive one. v1.15's audit is supposed to answer "was the v1.15 corpus conformant at v1.15's close?" — but it actually answers "is *today's* corpus conformant under *today's* rules?". That is not wrong so much as meaningless: it makes five frozen audits into five identical live audits.

**Right-sizing the urgency [CORRECTED].** The first draft argued this from "v1.21 adds ~10 documents; C17 will validate them inside all five predecessor harnesses" — **that is ~5× inflated.** Under the §0 owner ruling the new `docs/operations/**` docs carry **no `doc_id`** and are therefore **not enrolled and not C17-visible at all**. v1.21's actual new C17 surface is **two** files: `docs/reference/firmware-oem-matrix.md` and `docs/recipes/05-…`. Plus whatever *existing* enrolled files v1.21 modifies (the glossaries, `4-platform-capability-comparison.md`, the capability matrices) — which C17 already re-validates in the five harnesses today, drift or no drift.

**The argument for Pillar H is therefore about correctness, not volume.** Five audits that claim to be frozen and are not is a defect at n=1. Do not let a planner cost this pillar off a document count.

### The lazy additive conversion — zero edits to `c17-eee-contract.mjs`

**[MEASURED]** In normal (non-`--self-test`) mode, `c17-eee-contract.mjs` touches nothing outside `docs/` relative to `process.cwd()`:
```
$ grep -n "walkMd(\|readFile(\|'docs\|c17-fixtures\|process.cwd()" scripts/validation/c17-eee-contract.mjs
61,62,68,69,91,92   # readFile/walkMd/relNormalize, all join(process.cwd(), …)
434,447             # c17-fixtures — INSIDE selfTest() only
526                 # const allMdPaths = walkMd('docs');
530,536,550         # readFile(relPath); relPath.startsWith('docs/')
```

Therefore the conversion is a **`cwd` swap**, not a code change to the contract:

1. Materialize the frozen `docs/` tree once per harness: `git archive <MILESTONE_CLOSE_SHAS[TAG]> docs | tar -x -C <tmpdir>` (or equivalent), into `mkdtempSync` — the same temp-dir idiom `_lib/frozen-at-close.mjs` already imports (`mkdtempSync, rmSync` at `:29`).
2. Copy the *live* `c17-eee-contract.mjs` into `<tmpdir>/scripts/validation/` (or spawn it by absolute path — `execFileSync('node', [absoluteContractPath], { cwd: tmpdir })` works because the contract resolves `docs` from `cwd`, and the fixtures path is never touched outside `--self-test`).
3. `existsSync` guard stays, but on the live absolute path — the guard asks "does the validator exist", which is correctly a live question. **Leave leg 1 alone.** Only leg 2 needs converting.
4. `rmSync(tmpdir, { recursive: true, force: true })` in a `finally`.

**Why this shape and not "add a `--root <dir>` flag to `c17-eee-contract.mjs`":** the flag is arguably cleaner, but `c17-eee-contract.mjs` is **CARVE Category 3**, last edited by v1.20's LINK-05 fence-mask unification, and this project has a documented frozen-callsite-pinning hazard (a later `check-phase-NN` can pin an earlier validator's exact call-site string verbatim). The `cwd`-swap keeps the contract byte-unchanged and moves the entire change into the five harnesses, which are the files the requirement names anyway. **[MEASURED]** `check-phase-115.mjs:95-103` already pins properties of `c17-eee-contract.mjs` (it must not contain `CHAIN_PHASES`), confirming that file is pinned surface.

### What is frozen surface here, and what needs re-baselining

| File | Frozen? | Pinned by | Re-baseline needed? |
|---|---|---|---|
| `v1.15`–`v1.19-milestone-audit.mjs` | Yes, but **additively editable** | `V-140-C17CARVEOUT` (`check-phase-140.mjs:149-166`) requires v1.15..v1.18 to each still `.includes('c17-eee-contract')`. `V-140-CONVERSIONS` (`:91-118`) requires each to still `.includes('createFrozenCorpusReader')`. `V-119/125/128/134/138-AUDIT-HARNESS` require each to **exit 0**. | **NO** — an additive conversion keeps both strings and keeps exit 0. **[MEASURED]** `node scripts/validation/check-phase-140.mjs` → 5 PASS / 0 FAIL at HEAD. |
| `c17-eee-contract.mjs` | Yes (CARVE Cat 3) | `check-phase-115.mjs:95-103`; `check-phase-143.mjs` fence-mask work | **NO** if you take the `cwd`-swap. **YES, and you must grep every `check-phase-*.mjs` for verbatim call-site pins first**, if you take the `--root` flag. |
| `v1.20-milestone-audit.mjs` | Not yet frozen | `V-144-AUDIT-HARNESS` (exit 0) | **[MEASURED] It DOES carry a C17 check** — `v1.20-milestone-audit.mjs:816` `name: 'C17: EEE document contract (13 assertions, all enrolled docs/ files)'`, spawn at `:826-836`. **Clarification, not a correction of record [SOFTENED].** `v1.20-DEFERRED-CLEANUP.md:111-113`'s full sentence already supplies the right reading: *"v1.20's own new harness carries no C17 check of its own **to convert, since it is not yet frozen against anything**."* Read whole, that says what this row says — the check exists; what did not exist was a `V120` pin to convert it *against*. Only the clause quoted in isolation misleads. Once Pillar G lands V120, **this is a SIXTH convertible C17 site**, not five. Whether it is in scope is §8 OQ-3. |
| `_lib/frozen-at-close.mjs` | Yes | `V-140-V14PIN` (see §6) | **NO** for Pillar H; **YES, with a placement constraint,** for Pillar G |

**The "convert all five simultaneously" requirement is well-founded:** the five blocks are byte-identical, so a partial conversion leaves the identical drift class on the remainder with no way to tell from the code which is which. **[PREMISE]** the cheapest safe implementation is one shared helper (e.g. `spawnC17AtClose(milestoneTag)` exported from `_lib/`), imported by all five, so the five edits are one-line each and the logic exists once.

**Runtime budget check.** **[MEASURED]** `node scripts/validation/c17-eee-contract.mjs` completes over 234 files well inside its 300 000 ms spawn timeout today; adding a `git archive` + extract per harness is a per-invocation cost of the full frozen `docs/` tree (~2.7 MB per `_lib/frozen-at-close.mjs:314`'s own note). **Named risk to re-measure at plan time:** `check-phase-60.mjs` re-runs the v1.5 harness as a subprocess under a **60 000 ms** timeout, pinned byte-exact by `V-140-SUBPROCBUDGET` (`check-phase-140.mjs:167-180`, "expected 2 occurrences of `timeout: 60000`"). v1.5's harness has no C17 check, so it should be unaffected — but this is the exact trap that Phase 140 named for the corpus conversion, and it deserves a measurement, not an assumption.

---

## §6 — Pillar G: The V120 Pin Has A Placement Constraint That "Append" Gets Wrong

**[MEASURED]** SHA recovery, both forms:
```
$ git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.20/ && $2 ~ /MILESTONE CLOSE/'
246fa3ddc88a73792744285468a0265dfbab68e8|docs(144-12): v1.20 MILESTONE CLOSE — single close-gate commit, 28/28 requirements Validated
$ … | wc -l
1
$ git log --all --grep="v1.20" --grep="MILESTONE CLOSE" --all-match --format="%h|%s" | wc -l
1
```
Subject-line discriminator → **count=1 → `246fa3dd`**, matching PROJECT.md. **Honest correction of record:** the naive dual-token `--grep --all-match` form *also* returns exactly 1 here. The trap that fired for V118/V119 does **not** manifest for v1.20. Use the subject-line form anyway (it is the ratified method and it is the one that stays correct), but do not record "the naive form returned multiple candidates" as a v1.20 fact — it did not.

### The trap: `V120` must be inserted BEFORE the `V14` entry, not appended

**[SOURCED]** `check-phase-140.mjs:140-144`:
```js
const after = body.slice(pinIdx + PIN.length);
if (/\n\s*V\w+:\s*'/.test(after)) {
  return { pass: false, detail: 'V14PIN regression: another V-tag key appears after V14 -- V14 is no longer the last entry (AUDIT-CLOSE pin invariant violated)' };
}
```

`V-140-V14PIN` requires `V14: '0b3be9ab'` to be the **last** entry in `MILESTONE_CLOSE_SHAS`. **[MEASURED]** current layout: `V119` at `_lib/frozen-at-close.mjs:135`, `V14` at `:147`, object closes at `:170`.

I proved both branches by executing the actual assertion against the actual file:
```
$ node -e "…read frozen-at-close.mjs, extract MILESTONE_CLOSE_SHAS body, slice after \"V14: '0b3be9ab'\"…"
current after-V14 tail matches another V-tag: false
if V120 APPENDED after V14 -> V-140-V14PIN would FAIL: true
if V120 INSERTED before V14 -> after-tail unchanged, PASS: true
```

**PROJECT.md Pillar G says "Append `MILESTONE_CLOSE_SHAS.V120`". Taken literally that reddens `check-phase-140`, which is inside the apex chain.** The correct instruction is: insert `V120: '246fa3dd',` immediately after the `V119` entry's comment block and **before** the `V14` entry. `check-phase-140.mjs` must not be edited (it is a v1.20 leaf, frozen).

Also add `readAtV120Close` and `lsTreeAtV120Close` following the `:219` / `:287` export patterns. **[MEASURED]** `V-140-CONVERSIONS` uses a `>= 16` floor plus 16 named paths — adding an 18th converted harness (`v1.20-milestone-audit.mjs`) is safe against that check.

---

## §7 — Pre-Existing RED at HEAD (must be owned by the roadmap)

**The apex is not green right now.**

**[MEASURED]**
```
$ node scripts/validation/check-phase-144.mjs | tail -1
Result: 100 PASS, 1 FAIL, 0 SKIPPED (total checks: 101)

$ node scripts/validation/check-phase-144.mjs | grep FAIL
[CHAIN-143/101] V-144-CHAIN-143: check-phase-143.mjs exits 0 (CHAIN regression-guard) FAIL

$ node scripts/validation/check-phase-143.mjs | tail -1
Result: 7 PASS, 2 FAIL, 0 SKIPPED

$ node scripts/validation/check-nav-hub-links.mjs | tail -2
docs/_glossary-linux.md:157 -> [PITFALL-2](../.planning/research/PITFALLS.md)  -- target file not found: .planning/research/PITFALLS.md
check-nav-hub-links summary: 0 hub-presence failure(s), 1 corpus-link failure(s), 1 total
```

**Root cause, measured:**
```
$ git log --oneline -1 --diff-filter=D -- .planning/research/PITFALLS.md
b21ee88c docs: archive v1.19 project research to milestones/v1.19-research/     # == HEAD~1
$ git ls-tree -r --name-only 246fa3dd -- .planning/research
.planning/research/{ARCHITECTURE,FEATURES,PITFALLS,STACK,SUMMARY}.md            # present at the v1.20 close
$ ls .planning/milestones/v1.19-research/
ARCHITECTURE.md FEATURES.md PITFALLS.md STACK.md SUMMARY.md
```

`docs/_glossary-linux.md:157` carries a real markdown link `[PITFALL-2](../.planning/research/PITFALLS.md)`. The v1.19 research archival at HEAD~1 moved that target, breaking the link and taking `check-phase-143` → the apex red. **This is a new archival-drift vector: not the phase-dir move that v1.20 measured as zero-drift, but the `.planning/research/` move.**

**[MEASURED, CORRECTED CENSUS]** `grep -rn "\.planning/research/PITFALLS\.md" docs --include=*.md` → **8 references in total**, not "eight further":

| File | Count | Form |
|---|---|---|
| `docs/_glossary-apple-business.md` | **×6** (`:54, :96, :136, :148, :164, :190`) — **not ×5** | inline code / prose |
| `docs/l2-runbooks/25-linux-agent-investigation.md` | ×1 (`:93`) | inline code |
| `docs/_glossary-linux.md` | ×1 (`:157`) | **markdown link — the failing one** |

So it is **7 further** references, all inline-code/prose, which the checker does not follow. **Only `_glossary-linux.md:157` is a link.** **[MEASURED]** `grep -rn "\.planning/" docs --include=*.md | wc -l` → **11** total `.planning/` references across the corpus, of which these 8 are the PITFALLS subset.

**The temporary masking effect is CONFIRMED, not predicted. [MEASURED]** The sibling researcher's `PITFALLS.md` landed mid-session, and the red vanished:
```
$ ls .planning/research/
ARCHITECTURE.md  FEATURES.md  PITFALLS.md  STACK.md
$ node scripts/validation/check-nav-hub-links.mjs | tail -1
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
$ node scripts/validation/check-phase-143.mjs | tail -1
Result: 9 PASS, 0 FAIL, 0 SKIPPED
```
So `docs/_glossary-linux.md:157`'s target is satisfied only while an *active milestone's* research directory happens to contain a `PITFALLS.md`. It was red between the v1.19-research archival (HEAD~1) and this research step, and it will go red again the moment v1.21's research is archived. **Do not let the roadmap read the now-green apex as evidence this is fixed — the dependency is on an ephemeral planning artefact, which is the defect.**

**Durable fix — cheap, one line, and it is now an explicit PHASE 145 DELIVERABLE (see §4).** Demote `docs/_glossary-linux.md:157`'s link to the inline-code form the other seven references already use. **[PREMISE]** the inline-code demotion beats repointing at `../.planning/milestones/v1.19-research/PITFALLS.md`: it removes a `docs/` → `.planning/` link entirely, which is the class of link that archival will keep breaking.

> **Why this had to be written into a phase deliverable list and not left as a §7 recommendation.** A roadmap is generated from §4. A fix that appears only in §7 prose is dropped, and this one fails *silently and late*: the close-gate apex is measured green **before** v1.21's research is archived, and the archival then re-breaks the link and re-reddens `check-phase-143` → `check-phase-144` → the apex. Nobody re-runs the apex after archival. It is now item (3) on phase 145.

---

## §8 — Open Questions

**OQ-1 and OQ-2 are RULED (owner, 2026-08-19) and are recorded here as decisions, not questions.** OQ-3 through OQ-6 remain genuine gray areas for discuss-phase.

### OQ-1 — RULED: registry rows + filename-map rows, NO `doc_id`

**Question as originally posed:** does v1.21 enroll `docs/operations/` into EEE, or ship 8-10 documents outside the publish bundle?

**That framing was a false binary and it is withdrawn.** It offered only "~28-30 registry rows + C17 retrofit of 20 existing ops docs, as a ninth pillar" vs "accept the gap and name it", on the premise that `EEE-SOP-standard.md:327`'s "by directory, never cherry-picked by filename" governs registry membership. It does not. `:327` governs **EEE enrollment** — the `doc_id` key and the C17 contract that keys off it. **The publish gate is the registry table** (`build-publish-bundle.mjs` selects `Status: Approved` rows and fails closed at PUB-03 `:339-345` on a missing filename-map row; nothing in that path reads document frontmatter for `doc_id`). Registry membership is per-file and always was.

**THE RULING.** New `docs/operations/**` docs get **registry rows + filename-map rows, and NO `doc_id`.**

**Consequences, carried forward:**

| | Effect |
|---|---|
| Publish bundle / SharePoint / Copilot Studio | **Reachable.** The flagship content is in the knowledge base the Core Value statement names. |
| C17 | **Not gated.** Zero C17 conformance cost on the 10 new ops docs. New C17 surface is **two** files (§5). |
| The 20 legacy ops docs | **Not retrofitted.** No ninth pillar. |
| Canaries | **Both bump**, to `227 + N`, computed from the registry (§1 Pillar F). This is the ruling's real cost. |
| Ordering | All 12 registry rows + regeneration + both canary bumps land in **phase 152, one atom** (§3 step 2). |

**The one open verification, not an open question:** the ruling rests on the registry being the sole publish gate. Prove it before planning with a single end-to-end `build-publish-bundle.mjs` run over one scratch registry + filename-map row pointing at an unenrolled `docs/operations/` file (§0). If that run shows the bundle *does* require `doc_id`, the ruling's mechanism — not its intent — needs a different implementation, and that is a plan-time discovery worth thirty seconds now.

### OQ-2 — RULED: convert `check-phase-59.mjs` to frozen reads

**Question as originally posed:** how is the `V-59-14` `patchRows !== 5` equality collision resolved?

**THE RULING.** Convert `check-phase-59.mjs`'s ops-index read to the frozen readers, so `V-59-14` asserts what it always meant — "Phase 59 shipped 5/5/5 rows" — rather than "nobody may ever add a patch-management guide". Lands in phase 145. Full mechanics in §1 Pillar D.

**Evidence this section originally omitted while calling the option novel:**

- **`check-phase-59.mjs:14` already imports `readAtV15Close, readAtV116Close`**, and already uses them at `:287`, `:315`, `:659`, `:940`. `:315` is already `readAtV15Close(INDEX_MD)`. The file is frozen-aware; the `V-59-14` block is a straggler still on the local live `readFile()` at `:19-23`.
- **Phase 128 commit `066a9068`** — *"Atom 2a — V116 pin + D-128-C frozen-aware conversion (8 validators/14 checks)"* — did exactly this conversion across 8 validators. Ratified precedent, not novelty.
- **[MEASURED]** `grep -rln "check-phase-59" scripts/validation/check-phase-*.mjs` → no hits. **No `check-phase-*.mjs` pins `check-phase-59.mjs`'s content**, so the frozen-callsite-pinning hazard does not apply.
- **Scope was understated:** `V-59-14` asserts **three** equalities (`patchRows`, `appRows`, `driftRows`, `:446-472`), and the four new guides across B/C/D take the Patch region **5 → 9**, not 5 → 6.

**On the rejected options, for the record.** Option (b) — additive successor + accept red — violated v1.20's zero-accepted-red bar and is correctly rejected. Option (c) — put the row outside the Patch H2 region — was dismissed with the single parenthesised word "(dishonest)", and **that dismissal was unsound reasoning even though the option loses on the merits.** The counter is mechanical, not moral: `countDataRows` is `(window.match(/^\| \[/gm) || []).length` (`check-phase-59.mjs:85-87`) — it counts only rows whose first cell opens with a markdown link, so a non-link row form would evade the count. §2 row 2 recommends exactly that kind of shape-aware placement elsewhere in this document. Option (c) loses because a Linux update-delivery guide belongs in the Patch table and hiding it elsewhere makes the ops index wrong for readers — a content argument, which is the argument that should have been made. Moot under the ruling; recorded so the reasoning pattern is not reused.

**OQ-3 — Is `v1.20-milestone-audit.mjs`'s C17 leg (a sixth site, `:816-836`) in Pillar H's scope?**
The requirement text names five. STATE.md independently requires converting that harness's *corpus* reads once V120 lands. Converting the corpus but not the C17 leg reproduces the exact residue Pillar H exists to close.

**OQ-4 — Does the recipe template gain a `## Rollback/Recovery` H2?**
`ROLLBACK-RECOVERY-DIVERGENCE-COUNT` fires at 3-of-5. `docs/_templates/recipe-template.md` currently has no such H2 while recipes 03/04 do.

**OQ-5 — Firmware/BIOS domain naming and file numbering.**
`docs/operations/firmware-bios/` vs `firmware-governance/` vs `bios-management/`, and whether the per-OEM guides are `03/04/05` or `01/02/03` under a separate DFCI numbering. Cosmetic but load-bearing once `check-phase-<N>.mjs` pins the literals.

**OQ-6 — Which glossary receives DFCI / Hotpatch / Autopatch ring / `unattended-upgrades` / update channel?**
`docs/_glossary.md` is the Windows/Autopilot glossary (H2 sections: Autopilot, Enrollment, Hardware, Network, Security, Deployment Modes — **[MEASURED]** `grep -n "^## " docs/_glossary.md`). None of those six sections is an obvious home for update-governance terms; `unattended-upgrades` belongs in `_glossary-linux.md`. A seventh glossary is almost certainly the wrong answer, but a new H2 in `_glossary.md` is a structural change to an enrolled, heavily-pinned file.

### Things I could not verify

- Whether any GitHub Actions workflow beyond the 17 named enforces anything relevant — I read the filenames only, not the YAML bodies.
- The runtime cost of the §5 `git archive` conversion. Not measured; explicitly flagged as a plan-time measurement.
- Whether the glossary zero-margin hazard is genuinely discharged by SWEEP-05 (§2). I measured that all 17 predecessor harnesses read frozen and that no `check-phase-*.mjs` carries a freshness diff test, but I did not run the falsifying experiment (edit a glossary date, re-run the six workflows).

---

## Corrections Applied (2026-08-19, adversarial review)

Applied against repo HEAD `a2edcd02`. Every repo fact asserted below was re-measured in this pass; no repository file other than this one was modified.

| # | Section | What changed |
|---|---|---|
| 23 | §0, §1 Pillar A, §1 Pillar F, §2 rows 13-16 | Canary target corrected **226 → 227 + N**. `firmware-oem-matrix.md` and recipe 05 are both new enrolled artefacts (225 + 2 = 227); N = the ops-doc registry rows added under the OQ-1 ruling (10 at current scope → 237). Added an explicit instruction that the literals be **computed from the registry after the rows land**, never from a document count, and recorded that the two canaries measure different sets (all rows vs Approved-only). |
| 15 | §1 Pillar D, §2 row 1, §4, §8 OQ-2 | `V-59-14` **RESOLVED by owner ruling**: convert `check-phase-59.mjs` to frozen reads. Added the omitted evidence — `:14` already imports `readAtV15Close, readAtV116Close` (used `:287, :315, :659, :940`), Phase 128 `066a9068` converted 8 validators, and no `check-phase-*.mjs` pins its content. Corrected the scope from one equality to three (`patchRows`/`appRows`/`driftRows`, `:446-472`) and 5→6 to 5→9. |
| — (OQ-1) | §0, §8 OQ-1 | Owner ruling recorded as a decision: **registry + filename-map rows, NO `doc_id`**. Removed the all-20-or-none false binary and explained why `EEE-SOP-standard.md:327` governs EEE enrollment, not registry membership. Added the one required pre-plan verification (one end-to-end publish-bundle run on an unenrolled doc). |
| 87 | §2 blast-radius table | **Added row 22 — `docs/operations/patch-management/00-overview.md`**, previously absent. Modified by Pillars B, C, D and E; pinned `PATCH_FILES` member (`check-phase-54.mjs:23, :35`) carrying `V-54-07/08/09/10/29` under a live-HEAD apex chain member. Added a four-pillar collision subsection naming the `V-54-29` Hotpatch-negative trap that Pillar E is most likely to trip. |
| 84 | §4 phase 145, §7 | The `_glossary-linux.md:157` fix is now an **explicit phase-145 deliverable** (item 3), not orphaned §7 prose, with the silent-late failure mode spelled out: the close-gate apex is measured *before* research archival re-breaks the link. |
| 85 | §4 dependency list | **145 → 147 corrected to 145 → 152.** Ops-index edits land in 152, so Pillar D in 147 reddens nothing; 145 → 147 survives only as a soft preference. |
| 86 | §3 step 2, §4 phases 149-150 and 152 | **§3-vs-§4 contradiction resolved.** All 12 registry rows + filename-map regeneration + **both** canary bumps land in phase **152** as one atom. The matrix's registry row no longer rides in 149-150 — that split would have left both `--self-test` canaries RED across three phases. |
| 95 | §1 Pillar C, §4 phase 148 | **WinGet flagged explicitly.** Owner-ruled IN SCOPE with **zero research coverage**; STACK excluded it and confirmed Enterprise App Management is NOT WinGet-based. Split out as its own deliverable row marked a **plan-time research deliverable**, with the honest fallback (ship M365 + EAC only, route WinGet to BACKLOG) rather than writing it from EAC material. |
| 30 | §2 glossary hazard block | The `diffDays`-specific grep is struck — the repo uses `days`. Replaced with the real roster of **nine sites across eight validators**. **Added `check-phase-53.mjs:102`** (co-management, a Pillar C surface) and **`check-phase-56.mjs:115`** (drift-migration). **Reclassified `check-phase-49.mjs:279` as FROZEN** (`:266` is `readAtV15Close(f)`). |
| 33 | §5 | Byte-identity claim downgraded to **functionally identical**. Two hashes, not one: v1.15 stands alone, v1.16–v1.19 match; the delta is exactly two comment lines, executable code identical. Shared-helper conclusion unchanged. |
| 42 | §1 Pillar C anti-duplication rule | Autopatch ring naming corrected **Test/First/Fast/Broad → Test and Last** (cannot be removed or renamed; 15 rings/group, 300 groups/tenant). |
| 91 | §5 | "v1.21 adds ~10 documents; C17 will validate them in all five harnesses" was ~5× inflated — under the OQ-1 ruling the new ops docs are not C17-visible. Actual new C17 surface is **two** files. Pillar H re-argued on correctness, not volume. |
| 88, 89 | §8 OQ-2 | Recorded `countDataRows = (window.match(/^\| \[/gm) \|\| []).length` (`:85-87`) and replaced the one-word "(dishonest)" dismissal of option (c) with the actual content argument. Moot under the ruling; recorded so the reasoning pattern is not reused. |
| 25 | §1 Pillar A rejected alternative 2 | **Mispricing withdrawn.** The registry/filename-map rows are paid either way and the two canary bumps are already mandatory for Pillar F (zero marginal cost). Real delta is ~6 files of C17 work — ~1/5 the implied cost. Rejection now rests on the semantic argument alone, which is sufficient. |
| 34, 35, 108 | §2, §3, §5, §7 | Line drift fixed: `check-phase-54.mjs` 60-day throw is **`:116`** (not `:112-115`); `HUB_LITERAL_03` is **`:48`** (not `:49`); `build-publish-bundle.mjs` canary literal is **`:519, :522`**. §7 census corrected to `_glossary-apple-business.md` **×6** (not ×5), **8 total** PITFALLS refs (not "eight further" — 7 further), **11 total** `.planning/` refs. §5's "correction of record" **softened to a clarification** — the cleanup doc's full sentence at `:111-113` already supplies the same reading. |
| 27 | §0 | "282 − 48 = 234 matches C17 exactly" flagged as **near-tautological** — both counts key on `doc_id` presence by slightly different rules. Consistency check, not corroboration. |

**Not corrected (ruled FALSE POSITIVES / already-answered, recorded so they are not re-raised):** the `V120` pin stays at terminal close (§4 phase 153 unchanged — early freezing would rewrite `walkMd` to `FROZEN.paths` and blind C11 to every line v1.21 writes); the `§2` row-19 `05-compliance-` + `policy.md` evasion is correct as written and is the pattern PITFALLS was told to adopt.

## Version / Provenance

Authored 2026-08-19 by the GSD project researcher for v1.21 Phase 6 (Research). Every command shown was executed in `D:/claude/Autopilot` at HEAD `a2edcd02`. No file in the repository was modified by this research task other than this file.

**Revised 2026-08-19** following adversarial review and owner rulings — see **Corrections Applied** above. All corrections were re-measured against the same HEAD `a2edcd02`. **OQ-1 and OQ-2 are now RULED and are recorded in §8 as decisions, not open questions.** No repository file other than this one was modified by the correction pass.
