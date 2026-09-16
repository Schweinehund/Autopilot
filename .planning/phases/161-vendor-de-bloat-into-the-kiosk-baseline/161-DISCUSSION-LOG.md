# Phase 161: Vendor De-Bloat into the Kiosk Baseline - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-15 → 2026-09-16
**Phase:** 161-vendor-de-bloat-into-the-kiosk-baseline
**Areas discussed:** Vendoring shape & GPL compliance; Kiosk-safety review & whitelist; Baseline wiring, signing & failure policy; RE-237 edits & the pilot checkpoint (round 1); Amendment scope & mechanics; Phase 167 needle handover & gate bracket; Pilot record & scrub allowlist; Review artifacts' shape (round 2); Decision ledger & DRAFTS lock scope; Four plan frontmatters & task trees; Sensor defect handover to Phase 164; Evidence & fact-check file set (round 3)

**Method.** At the owner's standing instruction ("Use /grill-me to thoroughly raise additional questions in each of the areas and use /adversarial review to evaluate each of the questions in each of those areas to recommend the best one and provide your reasoning"), each round wrote a question tree with recommended picks, drafted text and measured counts to the session scratchpad, then ran Finder → Adversary → Referee (Opus, fresh context, re-measuring everything). Only owner-only calls plus one accept-all were put to the owner per round.

| Round | Areas | Finder issues | Adversary disproved | Referee real / partial / false | Owner calls |
|---|---|---|---|---|---|
| 1 | A-D (20 questions) | 34 | 8 full, 4 partial | 22 / 4 / 8 | 7 + accept-all |
| 2 | E-H (24 questions, 4 added by Referee) | 43 | 3 full, 6 partial | 35 / 6 / 2 | 3 + accept-all |
| 3 | I-L (ledger, lock table, plans, handover, file set) | 41 | 17 full, 12 partial | 12 / 15 / 14 | 2 + accept-all |

---

## Round 1 — Area A: Vendoring shape & GPL compliance

| Option | Description | Selected |
|--------|-------------|----------|
| Verbatim upstream bytes | SHA256 equals the upstream blob; upstream signature block kept in-repo; zero in-file modifications; residual fetch paths documented | ✓ |
| Pinned-URL edits | Rewrite the four GitHub `main` URLs to the commit SHA as marked GPL §5(a) modifications | |
| Vendor payloads | Commit the McAfee zips and ODT — rejected (14-16 MB, ten times the size precedent) | |

**Owner's choice (A9, owner-only):** accept and record the OOBE-gated block (unconditional Office Deployment Tool download and Chrome removal during ESP) rather than neuter it by a marked in-file edit. Measure its cost on the pilot.
**Notes:** the Referee falsified my premise that the `$intunecomplete` guard gated this block (it is an OOBE check), and my "largest non-planning file" qualifier (the corpus states 1.6 MB repo-wide; the script becomes the largest file outside `.planning/`). GPL text goes in `Files\` so it travels in the `.intunewin`; the GAP row is closed by a dated paragraph in place.

## Round 1 — Area B: Kiosk-safety review & whitelist

| Option | Description | Selected |
|--------|-------------|----------|
| Empty `-customwhitelist` | De-Bloat removes the HP Wolf Security / Sure Run / Sure Recover / Client Security Manager / Security Update Service family | ✓ |
| Whitelist the HP security family | Keep the Windows agents for the BIOS-anchored protections; exact-string match, one entry version-baked | |

**Owner's choice (B2):** empty. **Owner's choice (B11):** accept the Quick Assist removal and record it as a measured exception (RE-237 line 48 names Quick Assist as one of three viewing paths).
**Notes:** `-AllowStartMenuReset false` passed; `-custombloatlist` prohibited because line 519 strips entries from the protection list — this is what protects Edge, which sits on the removal blacklist at line 444. EEE scripts unchanged (15-row reconciliation shows De-Bloat is not a superset). `reg unload HKU\temphive` added after De-Bloat.

## Round 1 — Area C: Baseline wiring, signing & failure policy

| Option | Description | Selected |
|--------|-------------|----------|
| Measure ESP runtime on the pilot, no timeout | De-Bloat writes its own duration line; owner rules at the checkpoint | ✓ |
| Kill-timer inside the package | `Start-ADTProcess` timeout, fail-open on time | |
| Hard ceiling now | Flip back to EEE-only above N minutes | |
| README signing step | `Set-AuthenticodeSignature` thumbprint idiom from `Build-WindowsAppPackage.ps1`; count-only evidence | ✓ |
| `Build-KioskBaselinePackage.ps1` | New assembly script, untested as written | |
| Commit signed bytes | Rejected: breaks verbatim provenance and discloses the org certificate | |
| D-28 amendment on SC2/VND-02 | Rescope the signing clause to a README step plus `[PILOT]` evidence | ✓ |
| Move VND-02 into the checkpoint plan | Loses one-requirement-per-plan control | |
| Leave as-is | Vacuous flip | |

**Notes:** the Referee found the Baseline's 70002 gate has never been reachable under PSADT 4.1.7 (a non-zero exit throws; the session exits 60001) and added `-ErrorAction SilentlyContinue`.

## Round 1 — Area D: RE-237 edits & the pilot checkpoint

| Option | Description | Selected |
|--------|-------------|----------|
| Phase 160 D-30 analogue | `decline` is a resume signal; VND flips at the boundary; absence stated; run carried forward | ✓ |
| Leave VND-03 unowned | Pending requirement no plan owns | |
| Block the phase on the run | Stalls Phases 162-167 | |

**Notes:** ruling recorded inside the Step 8 STD-05 block (Step 4 idiom); Asset Provenance "Three artifacts" → "Two"; 160-REVIEW WR-01/WR-02 deferred to `/gsd-code-review 160 --fix`.

## Round 2 — Area E: Amendment scope & mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| Amend both pairs (SC2/VND-02 and SC3/VND-03) | The pilot-reading clause is undischarged on a declined run, same defect as the signing clause | ✓ |
| SC2/VND-02 only | Treat SC3's reading as corroboration like LIC-01 | |
| Declare VND-02 and VND-03 together in 161-04 | Both flip where both evidences exist; 161-03 declares none | ✓ |
| Rescope VND-02 further to keep one-per-plan | SC2 loses any tie to a measurement | |
| Carry a declined run to Phase 163 | Restores the round-1 lock | ✓ |
| Carry to Phase 165 | Where REF-02 reuses the residual-line detail | |

**Notes:** the Referee rewrote all four amendment strings: my ground ("no committed file carries a signature chain") was falsified by the verbatim vendored file's own signature block; the new ground is the assembly-time signing idiom, with the retained block named as the wrong chain. Scratch-applied at check-phase-54 32/0 both sides.

## Round 2 — Area F: Phase 167 needle handover & gate bracket

**Notes (no owner call):** 40-row needle table, one grep form per row; `-F` mandatory for the `reg unload` literal (every regex form measures 0); the `-custombloatlist` needle replaced with one that catches the real `-ArgumentList "…"` idiom; amendment count, `D-NN` purge and a taken-versus-declined disambiguator added; `## Asset Provenance` dropped as a validator statement.

## Round 2 — Area G: Pilot record & scrub allowlist

**Notes (no owner call):** the sensor's RUN/RUN1 lines emit the kiosk SID (dead guard at line 111), so a raw paste can never pass a zero-SID check; the paste rule became redact-then-verify (any SID form → `<SID>`, non-kiosk profile paths → `<USER>`). Both the Finder and the Adversary fabricated a PSADT log-header citation (`Computer Name is [...]`); the Referee measured the real strings (logged-on users, SIDs, domain, profile paths). Hostname needle struck (cannot be derived in-process). Sensor defect recorded and handed to Phase 164.

## Round 2 — Area H: Review artifacts' shape

| Option | Description | Selected |
|--------|-------------|----------|
| Reword the Sticky Notes / new Outlook clause without names | Rubric stays fail-closed; Phase 165 adds names with a corpus source | ✓ |
| Admit REQUIREMENTS.md:39 as a recorded rubric relaxation | Keeps the names now; a planning document as evidence | |

**Notes:** README is the single review home; NOTICE block placed immediately before `Plan 155-05 wiring`; header amendment drafted against the real line-wrapped bytes; three-round caps with a stated disposition.

## Round 3 — Areas I-L: Decision ledger, plan frontmatters, sensor handover, file set

| Option | Description | Selected |
|--------|-------------|----------|
| No pilot claim in the whitelist clause | No class-2 source exists in RE-237 for the dialog-producer attribution; the clause states measured whitelist disposition only | ✓ |
| Reinstate the REQUIREMENTS.md:39 relaxation | Keep the `[PILOT]` marker on the clause now | |
| Runtime question default `NOT RULED`, carried to Phase 163 | Neither yes nor no is conservative | ✓ |
| Default `no` | Mirrors 160's conservative default | |
| Default `yes` | Accepts the measured runtime silently | |

**Notes:** the Referee produced the final 57-decision ledger in CONTEXT grammar (the amendment is D-27), fixed my inverted `one-way` rating on D-27 (160 rates the identical decision `reversible`), found the NOTICE's `Plan 155-05 wiring` paragraph also says the script is not vendored (a dated `SUPERSEDED IN PART` paragraph is added), replaced an ASCII double-hyphen in a `docs/` cell with the tight em dash (RE-237 carries 74 em dashes and zero ASCII dashes), extended the pre-declared GUID set from five to all ten in the upstream file, made 161-01 bootstrap the evidence file it writes, and gave the anti-pattern-15 carve-out its own decision (D-40).

---

## Claude's Discretion

- Exact README prose outside the locked H2 literals; NOTICE field values; PSADT log-entry wording outside the locked code; SUMMARY structure; EVIDENCE subsection order within a plan; estimate tokens per plan.

## Deferred Ideas

- `Build-KioskBaselinePackage.ps1` assembly script (only if the owner wants reproducible assembly).
- Sensor v6 fix (Phase 164).
- 160-REVIEW WR-01/WR-02 → `/gsd-code-review 160 --fix`; `/gsd-secure-phase 160` still owed.
- Phase 165 notes: `crossdeviceresume.exe`; Quick Assist.
- Repository-level LICENSE file (155 D-34).
- Neutering the OOBE-gated block (revisit only on a `no` runtime ruling).
