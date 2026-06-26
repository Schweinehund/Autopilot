# Phase 91: Glossary + Capability Matrix - Context

**Gathered:** 2026-06-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Three reference-surface updates so the new MDM-migration terminology is discoverable and harness-consistent across the docs suite:

1. **Glossary** (`docs/_glossary-macos.md` + reciprocal `docs/_glossary.md` see-also) — add MDM-migration terminology entries, plus a Kandji→Iru rebrand note. **Scope expanded this discussion (see D-05):** mint glossary entries for **all 9 currently-dead inbound anchors** that guide 02's "Glossary Quick Reference" (Phase 90, `02-mdm-migration-psso.md` lines 541–550) already links to — not just REF-01's 3 named anchors.
2. **macOS capability matrix** (`docs/reference/macos-capability-matrix.md`) — add a single MDM-migration coverage row behind a **pre-edit anchor-inventory** artifact, with the `check-phase-63.mjs` **V-63-08** blob-hash pin updated in the **same atomic commit**.
3. **4-platform comparison** (`docs/reference/4-platform-capability-comparison.md`) — add a dedicated MDM-migration row, link-not-copy to the matrix, with **V-63-09** blob-hash pin updated atomically.

This phase does **not** touch top-level navigation hubs (Phase 92), does **not** author new scenario/runbook content (Phases 89/90 own that), and does **not** duplicate guide 02 / L2 #30 narrative (link-not-copy).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via `/adversarial-review` (Finder/Adversary/Referee, three Opus agents). Finder raised 38 flaws; Adversary disproved 0 (played conservative under the −2× penalty); Referee confirmed 35 real, caught 3 false positives, and surfaced the dead-anchor scope gap (→ D-05). Winners **1C-modified / 2A / 3A / 4C** are mutually coherent — no new `## Migration` H2 anywhere; everything attaches to existing H2s; every cross-link resolves to a pre-existing anchor.

### D1 — Glossary structure (Area 1)
- **D-01 (WINNER 1C, MODIFIED):** Add the new `###` term entries under the **existing `## Device Management` H2** (no new `## Migration` H2). Kandji/Iru is its **own standalone entry**, NOT folded into prose.
  - *Rationale:* 1A folds Kandji→Iru into the MDM Migration body ⇒ produces **no `#kandji-iru` anchor** ⇒ guide 02 line 547 link is permanently dead (CRITICAL). 1B introduces a `## Migration` H2 that no sibling glossary has (`_glossary.md` has none) ⇒ cross-family structural asymmetry (MEDIUM). Both 1B and vanilla-1C title the entry `### Kandji / Iru`, which slugifies to **`kandji--iru` (double hyphen)** — proven by the in-repo precedent `_glossary-android.md` → `_glossary-linux.md#cobo--cope--wpco` for heading `### COBO / COPE / WPCO` — mismatching guide 02's committed `#kandji-iru` (CRITICAL dead link).
  - **EXECUTION RULE — anchor fidelity is the load-bearing constraint of this phase.** The Kandji/Iru heading MUST slugify to single-hyphen `#kandji-iru`. Preference order: (a) explicit anchor override `### Kandji / Iru {#kandji-iru}` — **only if the repo's markdown renderer honors `{#id}`** (the `cobo--cope--wpco` precedent proves only the *default GitHub slug algorithm* is in play; it does NOT prove `{#…}` overrides are honored — **executor MUST verify before relying on it**); (b) fallback bare `### Kandji-Iru` heading (no space-slash-space) → slugifies to `kandji-iru`. Surface BOTH names + the Oct-2025 rebrand + "support portal URL unchanged at support.kandji.io".
  - **EXECUTION RULE:** add every new term to the `## Alphabetical Index` (line 17) in alpha order (the 3 confirmed-real LOW index flaws; reject the "index churn" false positive — adding index entries is correct, not churn).

### D1-sub — Windows-equivalent callout (Area 1 sub-question)
- **D-02 (OMIT positive callout; use a NEGATIVE callout):** For the migration terms, do **not** assert a Windows equivalent. Use the explicit-negative form, e.g. `> **Windows equivalent:** No direct equivalent — Windows tenant-to-tenant migration is a wipe + hardware-hash re-import, not an in-place re-enrollment.`
  - *Rationale:* the only Windows analog `_glossary.md#tenant-migration` is verified **wipe-only** (deregister + hardware-hash re-import + device reset, NOT Autopilot Reset) — asserting it as an equivalent of macOS-26 in-place ABM migration is factually wrong (MEDIUM). The negative-callout form matches the file's established pattern (ABM Token / APNs / Jailbreak Detection all carry explicit "No equivalent") and pre-empts a reader assuming the omission was an oversight. Locks CA5 coherence with the matrix `n/a`.
  - **EXECUTION RULE:** apply Phase-59 **D-15 anti-rename** — if a term reuses an existing `> **Windows equivalent:**` block, preserve the label verbatim and append `> See also:` lines *inside* the blockquote.

### D2 — Deadline entry depth (Area 2)
- **D-03 (WINNER 2A — concise + link-not-copy):** Glossary Deadline entry = one-sentence definition + the 1–90-day range stated **once** + cross-links to guide 02 (canonical narrative) and L2 #30 (lockout runbook). Do **not** restate the full non-dismissible-lockout UX inline.
  - *Rationale:* 2B (rich inline lockout prose) creates a **third drift-prone copy** of the 1–90-day/lockout facts (guide 02 + L2 #30 + glossary) ⇒ violates the link-not-copy / avoid-duplication-in-freshness-stamped-content ethos (MEDIUM), and tends to **strip the sources' MEDIUM-confidence hedges**, asserting as flat fact what guide 02 / L2 #30 deliberately qualify (MEDIUM caveat-integrity). 2A's two flaws were both ruled FALSE POSITIVES.
  - **EXECUTION RULE:** keep the entry consistent with guide 02's already-shipped def cell ("1–90 day range; non-dismissible full-screen prompt") so neither is a superset of the other.

### D3 — Capability-matrix row (Area 3)
- **D-04 (WINNER 3A — single row under existing `## Enrollment`, no new H2):** Add ONE row to the matrix's existing `## Enrollment` table, e.g. `| macOS 26 in-place ABM migration | n/a | Supported (profile-based re-enrollment, no wipe) |`. Windows column = **`n/a`**.
  - *Rationale:* 3B's new `## Migration` H2 = sibling-asymmetry (no `## Migration` anywhere in the matrix family) + larger blob-pin blast radius + pre-edit-inventory ordering risk (2× MEDIUM). 3C's multi-line pipe cell needs `<br>`/HTML — **zero precedent** in the matrix, introduces a novel fragile pattern into a blob-pinned file (MEDIUM). Windows sub-question: a non-`n/a` Windows cell would invent a capability (Windows has no in-place analog — verified) ⇒ `n/a`.
  - **EXECUTION RULE (precondition, mandatory):** the matrix edit changes its blob, so **V-63-08** pin (`73f16378197223378a8507a6751c763902de58db`, reconfirmed matching HEAD on authoring day 2026-06-24) MUST be regenerated in the **same atomic commit**. The **pre-edit anchor-inventory** artifact (all `## ` headings + anchor IDs) MUST be committed BEFORE the matrix edit (Phase 85 precedent). Cross-link target for downstream rows = `#enrollment` (stable existing anchor — no `#migration` exists).
  - **EXECUTION RULE:** the single cell must carry all required coverage facts (OS-26 ABM "Assign Device Management" + Deadline, pre-26 wipe fallback, PSSO re-registration ALWAYS required) without dropping any — and must keep the table's terse single-clause style.

### D4 — 4-platform cells + commit atomicity (Area 4)
- **D-05 (WINNER 4C — new dedicated row + ONE combined atomic commit):** Add ONE dedicated MDM-migration row to the 4-platform `## Enrollment` table; macOS cell = `Supported — [matrix](macos-capability-matrix.md#enrollment)`; **Windows / iOS / Android / Linux cells = `n/a`** (using the existing `n/a — [matrix](…#enrollment)` cell format).
  - *Rationale:* **4B is CRITICAL-disqualified** — two separate per-file commits guarantee a **red HEAD**: editing a pinned file without updating its V-63-08/V-63-09 pin in the *same* commit fails the byte-exact blob-hash guard at the intermediate commit boundary. 4A (reuse existing Enrollment rows) conflates the in-place-migration verdict into the unrelated `Re-enrollment fires blocking screen` / `Factory-reset` rows (LOW). 4C's dedicated row keeps the verdict semantically clean and mirrors the Area-3 single-new-row choice. iOS cell = `n/a` explicitly (iOS has no ABM "Assign Device Management" in-place-migration story — avoids the overreach trap).
  - **EXECUTION RULE (atomicity, locked):** ONE combined atomic commit touching `4-platform-capability-comparison.md` + its **V-63-09** pin (`2314ede7be54efbea1d4a4a787068310869a5896`, reconfirmed matching HEAD on authoring day). If the same commit also touches the matrix, V-63-08 too — single commit, all touched pinned files + their regenerated pins together. **Never split.** Run `node scripts/validation/check-phase-63.mjs` and confirm green before/after.
  - **EXECUTION RULE (anchor ordering):** the 4-platform macOS cell links to `#enrollment` (NOT `#migration` — none exists). Since Area 3 = 3A (no new H2), `#enrollment` is the final stable anchor; no dangling-anchor risk.

### D5 — Anchor scope: mint all 9 dead inbound anchors (scope decision)
- **D-06 (EXPAND scope — user-confirmed):** Phase 91 mints glossary entries for **all 9 currently-dead inbound anchors** that guide 02's Glossary Quick Reference links to, not just REF-01's 3 named anchors. Dead anchors (verified `git`-level on authoring day):
  - **In REF-01:** `#assign-device-management`, `#deadline`, `#kandji-iru` (+ the `MDM Migration` entry, which guide 02 does not itself link but REF-01 names).
  - **Beyond REF-01 (added by D-06):** `#filevault-recovery-key`, `#activation-lock-bypass`, `#acme`, `#profile-based-enrollment`, `#app-sso`, `#delete-device-record`.
  - **Already resolves (do nothing):** `#platform-sso`.
  - *Rationale:* the phase **goal** ("the macOS glossary captures the new MDM-migration terminology") is broader than REF-01's named list. Guide 02 (Phase 90) shipped 10 forward-links into the glossary before those entries existed; leaving 6 dead links indefinitely is a quality defect. Minting all 9 completes what Phase 90 started — it is **not** a new capability (no scope creep). User chose "Mint all 9" over the REF-01-literal alternative.
  - **EXECUTION RULE:** slug-verify ALL minted headings against the 10 committed link targets at guide 02 lines 541–550 (render or hash-slug each, assert byte-equality). The `kandji-iru` single-vs-double-hyphen is the known landmine. Each of the 6 added terms is a real migration/PSSO concept (FileVault recovery key, Activation Lock bypass, ACME cert protocol, profile-based enrollment, the `app-sso` CLI tool, ABM "Delete Device Record") — author concise entries consistent with sibling entry anatomy.

### Claude's Discretion
- Exact entry wording/phrasing, body prose, and which existing H2 sub-grouping each of the 6 added terms reads most naturally under (Device Management vs Enrollment vs Authentication) — within the no-new-`## Migration`-H2 rule.
- Exact matrix/4-platform cell phrasing and the dedicated row's label, within the coverage-fact and `n/a`-Windows rules.
- Sibling consistency: match the glossary's frontmatter freshness stamps (`last_verified` / `review_by`), entry anatomy, and the matrices' Version History footer rows.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements (read first)
- `.planning/REQUIREMENTS.md` — **REF-01** (glossary entries + reciprocal see-also) and **REF-02** (matrix migration row + atomic V-63-08 pin behind pre-edit anchor-inventory; 4-platform link-not-copy + atomic V-63-09 pin) are the LOCKED requirements. Note D-06 **expands** REF-01's entry set to all 9 dead anchors.
- `.planning/ROADMAP.md` §"Phase 91" — success criteria 1–4 (glossary entries + reciprocal; pre-edit anchor inventory; matrix row + V-63-08 atomic; 4-platform link-not-copy + atomic).

### Files this phase edits
- `docs/_glossary-macos.md` — entry anatomy (`### Term` under topic H2s + `> **Windows equivalent:**` blockquote + `> See also:` lines), `## Alphabetical Index` (line 17, MUST update), frontmatter freshness stamps.
- `docs/_glossary.md` — reciprocal Windows glossary; cross-links back via `> See also: [Term](_glossary-macos.md#anchor)`. Contains `#tenant-migration` (the wipe-path "Windows analog" referenced in D-02).
- `docs/reference/macos-capability-matrix.md` — Windows‖macOS 2-col tables; existing `## Enrollment` section. **Blob-pinned by V-63-08** (`73f16378…`).
- `docs/reference/4-platform-capability-comparison.md` — 5-col tables; existing `## Enrollment` rows; link-not-copy cell form. **Blob-pinned by V-63-09** (`2314ede7…`).
- `scripts/validation/check-phase-63.mjs` — V-63-08 (id 8, line ~204) + V-63-09 (id 9, line ~225) byte-exact blob-hash guards; each is a local `const BASELINE` — update in the same atomic commit as its file's edit.

### Inbound-link source (drives D-06 scope)
- `docs/macos-lifecycle/02-mdm-migration-psso.md` lines 541–550 — the "Glossary Quick Reference" block with the 10 inbound anchors (9 dead). This is the link-target spec the minted glossary headings must satisfy byte-for-byte.

### Link targets for glossary cross-links (link-not-copy, D-03)
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — canonical migration narrative (Deadline mechanics, 1–90-day range).
- `docs/l2-runbooks/30-macos-mdm-migration-failure.md` — Track A deadline-lockout runbook + ABM admin recovery.

### Slug precedent (D-01 anchor-fidelity proof)
- `docs/_glossary-android.md` → links to `docs/_glossary-linux.md#cobo--cope--wpco` for heading `### COBO / COPE / WPCO` — proves the repo relies on GitHub's **double-hyphen** slug rule for space-slash-space headings.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Glossary entry anatomy in `_glossary-macos.md` (body prose + Windows-equivalent blockquote + See-also) — clone for all minted entries.
- Existing `n/a — [matrix](…#enrollment)` cell format in `4-platform-capability-comparison.md` — reuse verbatim for the new row's non-macOS cells.
- Phase-85 pre-edit anchor-inventory convention (REF-02) and the Phase-59 D-15 anti-rename pattern (`_glossary-macos.md` Version History line ~159) — both are established precedents to follow, not invent.

### Established Patterns
- **Byte-exact blob-hash pins** (V-63-08/09 in `check-phase-63.mjs`): any edit to a pinned file is a no-op unless its `const BASELINE` is regenerated in the SAME commit. Both currently match HEAD (reconfirmed authoring day 2026-06-24).
- **No `## Migration` H2** exists in the glossary family or the matrix family — every winner deliberately attaches to existing H2s to preserve cross-surface symmetry.
- **Negative Windows-equivalent callouts** ("No equivalent / No direct equivalent") are the file's convention where no clean parallel exists.

### Integration Points
- Guide 02's Glossary Quick Reference (lines 541–550) is the inbound contract: minted headings must slugify to those exact anchors.
- 4-platform row's macOS cell links into `macos-capability-matrix.md#enrollment`.

</code_context>

<specifics>
## Specific Ideas

- Kandji/Iru anchor must be single-hyphen `#kandji-iru` — verified landmine, the phase's highest-risk execution step.
- All glossary cross-links and matrix rows must NOT assert same-tenant Secure Enclave key survival (PSSO re-registration is ALWAYS required post-migration — carried from Phase 90).

</specifics>

<deferred>
## Deferred Ideas

- **Process note (not actioned as a defect per user choice):** guide 02 (Phase 90) authored a 10-link Glossary Quick Reference before the target glossary entries existed, shipping 9 forward dead-links. User chose "Mint all 9" (close the gap in Phase 91) rather than flag it as a formal Phase-90 escaped defect. Worth a one-line mention at milestone audit/learnings if the pattern recurs.
- **Renderer `{#id}` support** — if the executor confirms the repo's markdown pipeline does NOT honor explicit `{#id}` anchors, that constraint affects any future heading whose human-readable form diverges from its needed slug; capture it as a repo-wide note.

</deferred>

---

*Phase: 91-glossary-capability-matrix*
*Context gathered: 2026-06-24*
