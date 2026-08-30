# Phase 149: Firmware/BIOS Domain — Overview, DFCI & Surface UEFI - Research

**Researched:** 2026-08-24
**Domain:** Documentation authoring (Microsoft Intune DFCI / BIOS firmware governance content) — source-fidelity research, not library/API selection
**Confidence:** HIGH (all seven mandated sources re-fetched as raw bytes this session; every load-bearing quote in CONTEXT.md cross-checked against live content and found byte-exact; two genuinely new findings surfaced, neither contradicts a locked decision)

## Summary

This is a documentation-corpus phase, not a software feature — "research" here means **source verification**, and 149-CONTEXT.md already carries 72 adjudicated decisions with citations. My job was to discharge the phase's own stated risk (`ROADMAP.md`'s "Research flag: YES", `STATE.md:169-170`'s "re-fetch first") by re-fetching all seven mandated pages as raw bytes (`curl -A <browser-UA>`, per D-50) **before** any planning happens, and to verify the existing-corpus conventions the two new files must match.

**Result: no divergence found.** Every quote, list, date and mechanism CONTEXT.md attributes to the seven sources is confirmed byte-exact against a live fetch performed in this session (dated 2026-08-24). The nine-OEM list, the "Other OEMs are pending." sentence, the six-OEM decoy on `configure-bios-windows`, both bricking quotes, the retire/reuse/recover structure (which — bonus finding — already exists as the page's own H2 shape), the CPU/IO-virtualization no-Disabled-value fact, the Surface disapplied-settings Note (with its `Disable Boot from network adapters` prefix), the HP cloud-vault sentence, the HP 30-day deactivation countdown, and the Lenovo Azure Key Vault mechanism all check out.

**Two things worth flagging that CONTEXT.md did not fully state:**
1. Page (d) `ref-dfci-settings-windows` carries an **expanded** bricking warning not in CONTEXT's quoted set — "*The DFCI profile settings change the device hardware, and can't be fixed by re-imaging the OS.*" This is a stronger, additional first-party sentence available to `01`'s bricking H2, on a different page than the two quotes already assigned (D-38), so it needs its own `**Source:**` line if used (D-56's one-page-per-line rule).
2. The "RBAC, logging and rotation" clause in BIOS-01's Lenovo custody claim is **not stated by Lenovo anywhere** in either fetched Lenovo page — confirmed by direct grep of both. It is a reasonable inference from "the private key lives in the customer's own Azure Key Vault" (an Azure Key Vault platform property, not a Lenovo-authored claim). Word this as inference, not as a Lenovo quote — the CONTEXT.md `PREMISE` grade (D-02) is correct and this session's fetch does not change it.

**Primary recommendation:** Follow `06-windows-driver-firmware-updates.md` as the structural template exactly (frontmatter keys, blockquote form, anchor style, Source-line format) and write both new files from the verbatim strings captured below — do not re-derive quotes from memory or from the research ledger; every quotation mark in the shipped files must trace to one of the raw-byte captures in this document or a fresh re-fetch at plan/execution time.

## Architectural Responsibility Map

This phase is pure content authoring (Markdown files in a documentation repository) — there is no application/browser/API/database tier split. The "architecture" that matters is **document-domain placement**, not code-tier placement.

| Capability | Primary Tier (doc-domain equivalent) | Secondary | Rationale |
|------------|-----------|-----------|-----------|
| Domain routing (who holds the BIOS secret) | `docs/operations/firmware-bios/00-overview.md` | — | BIOS-01 is a routing/hub responsibility, not a guide responsibility (D-25) |
| DFCI mechanics, prerequisites, OEM support, settings surface, bricking/retire/reuse | `docs/operations/firmware-bios/01-windows-dfci.md` | — | BIOS-02 (DFCI half)/03/04/11 all live here per D-25's "four of five requirements land in `01`" ruling |
| Surface UEFI specifics | Bounded section inside `01` | — | D-20: a standalone Surface file would carry zero requirement clauses |
| Terminology definitions | `docs/_glossary.md` | — | D-06: roadmap-locked to Phase 149, not deferred a third time |
| Registry/filename-map/canary/nav wiring | Phase 152 (not this phase) | — | INT-01..06; content phases never touch the registry (D-66) |
| Per-OEM guide content (Dell/HP/Lenovo mechanics) | Phase 150 (not this phase) | — | D-21/D-65; zero outbound links from `00` to these targets (D-26) |

## Package Legitimacy Audit

Not applicable. This phase installs no software packages — it authors two Markdown files and edits one existing Markdown file (`docs/_glossary.md`). No `npm install`, `pip install`, or equivalent occurs.

## Standard Stack (doc-conventions equivalent)

There is no library stack. The "stack" this phase must conform to is the corpus's existing `docs/operations/**` authoring convention, verified live this session against `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (the closest structural sibling — also a policy-surface guide living outside `PATCH_FILES`, per D-10).

### Frontmatter schema (`[VERIFIED: docs/operations/patch-management/06-windows-driver-firmware-updates.md:1-7]`)
```
---
last_verified: 2026-08-20
review_by: 2026-10-19
applies_to: all
audience: admin
platform: Windows
---
```
No `doc_id` key — confirmed absent on this sibling, matching D-30's instruction that the two new files carry no `doc_id`. For `149`'s files: `applies_to: APv1` (not `all` — D-30's reasoning, DFCI's central gate is an APv1 construct) and dates computed by arithmetic at actual execution time (60-day interval convention is the milestone's, not this file's frontmatter contract — no validator enforces 60 days on non-`PATCH_FILES` documents per D-30's own honest caveat).

### Platform-applicability blockquote (`[VERIFIED: docs/operations/patch-management/06-windows-driver-firmware-updates.md:9-14]`)
```
> **Platform applicability:** This guide is Windows-specific and covers the Intune driver and
> firmware update policy as its own surface — approval modes, the approval workflow, deferral and
> deadline behavior, OEM catalog and firmware delivery, reporting, Configuration Manager
> co-existence, and the documented absences. For the cross-platform overview, see
> [Patch Management Overview](00-overview.md). For WUfB deployment ring topology and Autopatch ring
> disambiguation, see [Windows WUfB Rings](01-windows-wufb-rings.md).
```
Confirms D-31's `> **Platform applicability:**` phrasing is the corpus's real convention (not `> **Platform:**`, which is the phrasing `V-54-27` bars — see Common Pitfalls below). Ends with cross-links to siblings, matching D-29's cross-link requirement.

### Anchor and Source-line conventions (`[VERIFIED: docs/operations/patch-management/06-windows-driver-firmware-updates.md]`)
- 10 H2s / 8 own-line `<a id="...">` anchors (excludes `## Related Resources` and `## External References`) — hand-authored short forms, e.g. `<a id="oem-catalog-firmware"></a>` above `## OEM Catalog and Firmware Delivery` (`:379-380`).
- `**Source:**` is a standalone, line-start paragraph *after* the claim it supports: `**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)` (`:48`). Sibling carries 64 such lines.
- Zero code fences confirmed (grep of the file returns none in the H2/anchor/Source scan above).

### Glossary schema (`[VERIFIED: docs/_glossary.md:1-40, 189-215, 109-140, 275-300]`)
- Frontmatter: `doc_id: RE-184`, `status: Approved`, `owner: Intune Admin Lead`, `doc_type: Reference`, `last_verified: 2026-06-29`, `review_by: 2026-09-27` (90-day cycle — confirmed do **not** match this to the milestone's 60-day convention, per D-63).
- `## Alphabetical Index` is a single pipe-delimited line of `[Term](#anchor)` entries directly under the summary blockquotes (`:29-31`).
- Term entries are `### Term Name` under a topical `## H2` (e.g. `## Security` at `:189` already holds `### Secure Boot` — `[VERIFIED, quoted verbatim below]`; `## Hardware` at `:109` already holds `### TPM`).
- `> See also:` cross-reference blockquotes follow a term body, e.g. under `### Entra ID SSO` (`:191-195`).
- `## Version History` is a markdown table at the file's tail (`:279+`), one row per change, format `| Date | Change | Author |`; the Phase-75 precedent row reads verbatim: `| 2026-06-20 | Phase 75 (SSOREF-01 / XC-1): added `### Entra ID SSO` term (Security section) and a reciprocal `> See also:` to Secure Enclave inside the existing `### TPM` body; Alphabetical Index updated | -- |` (`[VERIFIED: docs/_glossary.md:285]`).
- Existing `### Secure Boot` body, verbatim (`[VERIFIED: docs/_glossary.md:201-203]`): "*A UEFI firmware feature that verifies the bootloader's digital signature, required for TPM attestation.*" — this is D-41's Secure-Boot cross-link target; linking to it is not editing it.

## Architecture Patterns

### Document flow diagram

```
Reader arrives at firmware/BIOS question
        │
        ▼
docs/operations/firmware-bios/00-overview.md  (routing hub — BIOS-01)
   "Who holds the BIOS secret?"
        │
        ├── Dell answer ─────► names Intune-holds-secret custody + BIOS-02's Dell-Templates
        │                       mechanics (.cctk / 2 MB) — NO link yet (Phase 150 not authored)
        ├── HP answer ───────► names HP-cloud-vault custody — NO link yet
        ├── Lenovo answer ───► names customer-holds-secret custody (Key Vault) — NO link yet
        │
        ├── "Choosing a Path" section (still routing, still no forward links)
        ├── "What This Domain Does Not Own" ──► cross-links OUT to:
        │        ../../decision-trees/03-tpm-attestation.md   (TPM)
        │        ../../_glossary.md#secure-boot                (Secure Boot)
        │        ../../reference/security-baseline-conflicts.md (BitLocker)
        │        ../patch-management/06-windows-driver-firmware-updates.md (updates, not config)
        ├── "Before You Start" ──► Dell-template bricking quote + pointer to 01
        └── "Unsupported and Anti-Feature Callouts"
        │
        ▼  (only path into 01 — bidirectional, same commit)
docs/operations/firmware-bios/01-windows-dfci.md  (BIOS-02's DFCI half, 03, 04, 11)
   "What DFCI Is" → "Prerequisites and Disqualifiers" (4 registration channels, D-05)
        │
        ├── "OEM Support" ──► nine-OEM list + "pending" sentence + six/one-OEM conflict
        ├── "Surface Eligibility" (bounded, D-32)
        ├── "The Settings Surface" ──► 8 categories + 3 named traps
        ├── "Bricking and Irreversible Configuration" ──► configure-dfci-windows quote
        ├── "Retiring a Device" / "Reusing a Device" ──► DISTINCT sequences (BIOS-11)
        └── "Recovering a Device Locked in the Wrong Order" (deliberate over-delivery, D-40)
```

Both files land in **one commit** (D-28) — the diagram's bidirectional arrow between `00` and `01` is real: each file links to the other, so splitting the commit strands one direction regardless of ordering (this was proved with a live probe per the discussion log).

### Recommended file layout
```
docs/operations/firmware-bios/
├── 00-overview.md        # BIOS-01 + BIOS-02's disjointness statement + domain boundary
└── 01-windows-dfci.md    # BIOS-02's DFCI half, BIOS-03, BIOS-04, BIOS-11, Surface (bounded)
```
Phase 150 later adds `02-dell-*.md`, `03-hp-*.md`, `04-lenovo-*.md` in this same directory (D-21) — do not reserve or stub those numbers now.

### Pattern: durable-consequence-ships / high-churn-data-routes-out (D-35)
**What:** A named authoring rule for deciding what settings detail to ship inline vs. link out.
**When to use:** Any place a full enumerable table (all 8 DFCI categories' full option matrix, Surface's eligible-model list) tempts inclusion.
**Rule:** Ship a setting name if it carries a *durable, high-consequence behavior* (bricking, an interaction trap, a compliance conflict). Route out a setting if it is *high-churn enumerable data* with no independent narrative value. `REQUIREMENTS.md:164` bars per-model matrices outright — this is the mechanism that makes that bar operable without contradicting D-35's "roughly ten setting names ship anyway" observation.

### Anti-pattern: quoting the research ledger as if it were the source
CONTEXT D-37/D-52 both name this directly: `STACK.md`/`PITFALLS.md`/`FEATURES.md` are this milestone's own research notes, not primary sources. A string that looks quotable in one of those files but is unquoted researcher prose (verified this happened once already, per D-37) must never be rendered in italics/quotation marks in the shipped document. Only strings captured from a live fetch (this document's captures, or a fresh plan/execution-time re-fetch) may appear inside quotation marks.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Anchor ID scheme | A new heading-slug convention | Hand-authored short `<a id>` values matching D-12's convention (e.g. `oem-catalog-firmware`, not the full heading slug) | `check-nav-hub-links.mjs`'s anchor set is a union of explicit ids and heading slugs (`[VERIFIED: scripts/validation/check-nav-hub-links.mjs:142-172]`) — inventing a different id shape works but breaks the corpus's uniform short-id convention that Phase 151's Recipe #5 will need to consume |
| Source citation format | A new evidence-line shape | The sibling's `**Source:** [Title](url) (ms.date YYYY-MM-DD, updated YYYY-MM-DD)` pattern, standalone paragraph after the claim | D-51/D-56; the two-date requirement is what makes staleness visible in the shipped doc — a single-date shape (as one earlier phase's draft used) hides the exact defect this phase exists to prevent |
| Glossary term structure | A custom definition-list markup | `### Term Name` + prose body under an existing topical `## H2`, matching `### Secure Boot`'s and `### TPM`'s exact shape | `[VERIFIED: docs/_glossary.md:109-140,189-203]` — the file's own convention is plain, no template macro exists |

**Key insight:** every "don't hand-roll" item in this phase is really "don't invent a shape when a byte-identical sibling already exists three-to-four times in the same directory" — the four `patch-management/05-08` files are 10 H2s / 8 anchors / 0 fences / 0 Version-History each, and the H2 skeletons D-24 hands the planner already fit those constraints.

## Common Pitfalls

### Pitfall 1: The six-OEM decoy on `configure-bios-windows`
**What goes wrong:** Searching that page for "DFCI" surfaces a comparison table whose DFCI column reads (`[VERIFIED, verbatim below]`) "*Surface, Acer, Asus, Dynabook, Fujitsu, Panasonic*" — six names, a strict subset of the canonical nine.
**Why it happens:** That page is `configure-bios-windows`, about the Dell-only BIOS-configuration Templates feature; its DFCI column is a side-reference, not DFCI's own canonical enumeration, and it is dated 2024-06-06 — two years staler than the nine-OEM page.
**How to avoid:** The canonical nine-OEM list and its trailing "Other OEMs are pending." sentence live ONLY on `autopilot/dfci-management` (`ms.date` 2025-03-25). Cite that page for the nine; cite `configure-bios-windows` separately, by name, for the conflicting six — never let one grep hit stand in for the other.
**Warning signs:** A draft that names "the six" or "most business OEMs" without also naming the nine-OEM source and the conflict — both phrasings are explicitly barred (`REQUIREMENTS.md:73`).

### Pitfall 2: "as a blocking app" — a documented fabrication class
**What goes wrong:** An earlier research draft rendered "as a blocking app" as if quoted from `configure-bios-windows`.
**Why it happens:** Confirmed this session — that exact phrase does not occur anywhere on the page (`grep -n -i "blocking app"` returns zero hits against the live fetch).
**How to avoid:** D-52's `[DIRECT]`/`[RELAYED]` gate — nothing ships in quotation marks unless traced to a raw-byte fetch performed in the same session as authoring, never carried forward from an earlier research summary.
**Warning signs:** Any quoted string in a draft that isn't accompanied by a fresh `**Source:**` line pointing at a specific URL + date captured that session.

### Pitfall 3: "State" vs "Status" — a one-word product-name trap
**What goes wrong:** Writing "Enrollment Status Page" as a verbatim quote from `configure-dfci-windows`.
**Why it happens:** That page's own Step 2 heading reads (`[VERIFIED, verbatim]`) "*Step 2 - Create an Enrollment State Page profile*" — **State**, not **Status**. ESP's real product name is "Enrollment Status Page," but this specific page's heading uses "State."
**How to avoid:** Use "ESP / Enrollment Status Page" as the product name in prose (that's the correct, corpus-wide term), but never present "Enrollment Status Page" as a verbatim quotation of that specific heading — it isn't one.

### Pitfall 4: "UEFI CSP" — page-location trap
**What goes wrong:** Attributing "UEFI CSP" to `configure-dfci-windows` (page b).
**Why it happens:** Confirmed this session — `configure-dfci-windows` never uses that string (zero grep hits against the live fetch). It appears on `ref-dfci-settings-windows` ("*These settings use the UEFI CSP.*", line 35) and inside `configure-bios-windows`'s comparison table ("*Through UEFI CSP using the DFCI layer, which is isolated from the OS*").
**How to avoid:** Pin every quote by the page it was fetched from this session, never by which page "feels like" the natural home for a DFCI-mechanics fact.

### Pitfall 5: The "Disable" prefix — display-name divergence between two pages
**What goes wrong:** Quoting the Surface disapplied-settings Note's setting name as "Boot from network adapters" (dropping "Disable").
**Why it happens:** Confirmed this session — the Surface page's Note reads verbatim: "*DFCI in Intune includes settings that don't currently apply to Surface devices: CPU and IO virtualization, Disable Boot from network adapters, Windows Platform Binary Table (WPBT), NFC, and SD card.*" ("Disable Boot from network adapters" — capitalized as a compound). But `ref-dfci-settings-windows`'s own settings reference names the *same* underlying setting "**Boot from network adapters**" (no "Disable" prefix) as its section heading.
**How to avoid:** Quote the Surface Note verbatim including "Disable," and separately note which page's display-name convention you're using when cross-referencing the setting elsewhere (D-32 already flags this by name).

### Pitfall 6: CPU and IO virtualization has no Disabled value — an impossible-operation trap
**What goes wrong:** Writing "DFCI disables CPU and IO virtualization" as a mechanism for anything (e.g. as an explanation for a VBS/Hotpatch interaction).
**Why it happens:** Confirmed this session, `ref-dfci-settings-windows`, verbatim: "*CPU and IO virtualization: Your options: Not configured: Intune doesn't change or update this setting. Enabled: The BIOS enables the platform's CPU and IO virtualization capabilities...*" — there is no third, Disabled option listed. DFCI can turn this setting ON; it structurally cannot turn it OFF.
**How to avoid:** Any VBS-exposure narrative must locate the actual off-switch in firmware settings outside DFCI's reach (D-07's ship-the-inverse ruling), never inside a DFCI profile.

### Pitfall 7: The Surface retire/reuse/recover sequence — the milestone's single highest-consequence content
**What goes wrong:** Presenting the Surface "Removing DFCI management" removal path without a warning, because its own listed step order performs the destructive operation first.
**Why it happens:** Confirmed this session, verbatim from `surface-manage-dfci-guide`'s own numbered steps: (1) "*Retire the device from Intune*" (Retire/Wipe), (2) "*Delete the Autopilot registration from Intune*", (3) connect wired Ethernet + open UEFI menu, (4) "*Select Management > Configure > Refresh from Network*" (the unlock step) — i.e., the page's own prescribed order wipes and deletes the Autopilot record **before** unlocking, which is exactly the sequence the milestone's own pitfalls ledger calls the single highest-consequence mistake in the corpus.
**How to avoid:** Ship this sequence with an explicit ordering warning immediately adjacent (D-33) — never let the two steps sit unflagged next to each other, and never let a reader infer that this order is safe because it's "the vendor's own steps."
**Warning signs:** A retire/reuse/recover section that reads as a flat numbered list with no callout between the delete-record step and the unlock step.

### Pitfall 8: The Lenovo "only vendor" superlative has no first-party source
**What goes wrong:** Quoting Lenovo's blog as claiming to be "the only vendor" whose signing key can live under customer RBAC/logging/rotation.
**Why it happens:** Confirmed this session — grepping both fetched Lenovo pages for "only vendor," "RBAC," "logging," and "rotat[ion]" returns zero hits on all four terms. The pages document Azure Key Vault integration (a real, verifiable mechanism) but make no comparative claim against other OEMs, and never use the words RBAC/logging/rotation themselves — those are Azure Key Vault platform properties, not Lenovo-stated ones.
**How to avoid:** Write the custody position as "Lenovo's Azure Key Vault integration keeps the signing key in the customer's own Azure tenant" (sourced, true) and treat "the only vendor" / "RBAC, logging and rotation" as the milestone's own inference from Azure Key Vault's known platform capabilities — do not attribute either to Lenovo's own words.

## Code Examples

Verified patterns to copy directly (not paraphrase) when authoring the two new files:

### Frontmatter block (adapted from the verified sibling, with D-30's `applies_to` correction)
```yaml
---
last_verified: <execution date>
review_by: <execution date + 60>
applies_to: APv1
audience: admin
platform: Windows
---
```
Source pattern: `[VERIFIED: docs/operations/patch-management/06-windows-driver-firmware-updates.md:1-7]`. `applies_to: APv1` per D-30's substantive reasoning (not copied verbatim from the sibling, which uses `all`).

### Platform-applicability blockquote skeleton
```markdown
> **Platform applicability:** <one sentence naming the domain's scope and what this file
> covers>. For <related domain>, see [<Title>](<relative-path>). For <cross-link 2>, see
> [<Title>](<relative-path>).
```
Source pattern: `[VERIFIED: docs/operations/patch-management/06-windows-driver-firmware-updates.md:9-14]`.

### Anchor + H2 pairing
```markdown
<a id="oem-support"></a>
## OEM Support
```
Source pattern: `[VERIFIED: docs/operations/patch-management/06-windows-driver-firmware-updates.md:379-380]` (`<a id="oem-catalog-firmware"></a>` / `## OEM Catalog and Firmware Delivery`).

### Source-line pattern (two dates, standalone paragraph, after the claim)
```markdown
DFCI is supported on nine OEMs — Acer, Asus, Dynabook, Fujitsu, Microsoft Surface, Panasonic,
VAIO, Samsung, and NEC. "Other OEMs are pending."

**Source:** [Manage Windows devices with Windows Autopilot for existing devices](https://learn.microsoft.com/en-us/autopilot/dfci-management) (ms.date 2025-03-25, updated 2026-04-14)
```
Verbatim OEM order and trailing sentence `[VERIFIED, quoted below in Sources]`. Two-date format per D-51.

### Glossary term addition pattern
```markdown
### Device Firmware Configuration Interface (DFCI)

<definition prose>

> See also: [<related term>](#anchor) — <one-line reason>.
```
Placed under `## Security` or `## Hardware` (Claude's discretion per CONTEXT.md) — both H2s already exist at `docs/_glossary.md:189` and `:109` `[VERIFIED]`. Add one `## Alphabetical Index` entry and one `## Version History` row in the same edit, matching the Phase-75 precedent row quoted verbatim above.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| Old Intune URL path `intune/intune-service/configuration/configure-{dfci,bios}-windows` | `intune/device-configuration/templates/configure-{dfci,bios}-windows` | Confirmed live this session: old path 404s for (c)/(d), while old path for (b) 301-redirects | A 200-only link checker would silently pass the redirect; use the canonical `device-configuration/templates/` path in every citation (D-54) |
| DFCI enrollment on 24H2 Professional | Requires KB5046740+ or an Enterprise-edition upgrade before OOBE completes | `ms.date` 2025-03-25 (known issue "Date added: October 9, 2024 / Date updated: February 11, 2025") | Carry both the failure condition and the workaround verbatim — confirmed present on `autopilot/dfci-management` this session |

**Deprecated/outdated:** None identified specific to this phase's sources — all seven pages are live, current Microsoft/vendor documentation as of this session's fetch.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The Lenovo custody position ("the only vendor whose signing key can live under the customer's own RBAC, logging and rotation") is a reasonable inference from Azure Key Vault's documented platform behavior, not a claim Lenovo itself makes. | Pitfall 8 / BIOS-01 wording | If shipped as a Lenovo quote it would be a fabricated attribution — the milestone has already shipped two fabricated citations (D-52) and cannot afford a third. Word as inference, or fetch Microsoft's own Key Vault RBAC/logging docs as the source for that half of the claim. |
| A2 | The "SUMMARY" HP PDF found at a `catalogartifact.azureedge.net` URL (copyright 2023, "Second Edition: March 2023") is a marketing one-pager for an app-catalog listing, not a substitute for the canonical 57-page User Guide (Sept 27, 2022) hosted at `connect.admin.hp.com`. | Sources / oldest-source finding | If this assumption is wrong and the 2023 document is actually the maintained one, the HP citation date in the shipped file should be 2023, not 2022 — re-verify which document HP itself treats as canonical before finalizing the citation, though the load-bearing "cloud vault" sentence is confirmed present in *both* documents, so the substantive claim is unaffected either way. |

## Open Questions (RESOLVED)

1. **(RESOLVED) Which of the two Lenovo blog posts is the canonical (g) source?**
   - What we know: `introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2` is dated "November 4, 2025" — an exact match to CONTEXT D-46(g)'s cited date — and contains the Azure Key Vault signing-custody mechanism. A second, related post (`certificate-based-bios-authentication`) is dated "updated October 31, 2025" and also documents Key Vault key selection.
   - What's unclear: Nothing, actually — this is resolved. Use `introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2` (2025-11-04) as the cited URL; it is the one CONTEXT.md's date points to.
   - Recommendation: Cite that exact URL and date in the plan's `**Source:**` line; do not cite the other post unless a second, independent fact from it is used.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|--------------|-----------|---------|----------|
| `curl` with a browser User-Agent | Re-fetching the seven mandated sources (D-50) | ✓ | (Git Bash / mingw64 curl) | — |
| `pdftotext` | Extracting text from the HP Connect User Guide PDF | ✓ | mingw64 build | Python `PyPDF2`/`pdfminer`/`fitz` all unavailable in this environment — `pdftotext` was the only working extractor found |
| Node.js | Reading `scripts/validation/*.mjs` source (verification only, no execution needed) | ✓ (repo convention; not separately probed) | — | — |

No missing dependencies blocked this research pass.

## Validation Architecture

Skipped — `.planning/config.json` sets `"nyquist_validation": false` explicitly.

## Security Domain

Not applicable in the ASVS sense. This phase authors static Markdown documentation with no application code, no authentication surface, no user input handling, and no data storage — there is no attack surface for STRIDE/ASVS analysis to apply to. The content itself *documents* a third-party security feature (DFCI, BIOS password custody), but writing accurate documentation about a security control is not the same as implementing one; the relevant "risk" is factual accuracy (fabricated or stale quotes), which is governed by this milestone's own `[DIRECT]`/`[RELAYED]` quotation-fidelity gate (D-52) and the verifier's live re-fetch-and-diff step (D-55), not by a code-level security control.

## Sources

### Primary (HIGH confidence) — all fetched as raw HTML/PDF bytes this session, 2026-08-24, via `curl -A "Mozilla/5.0 ..."`

- **(a)** [Manage DFCI for Windows Autopilot devices](https://learn.microsoft.com/en-us/autopilot/dfci-management) — `ms.date` 2025-03-25T00:00:00Z, `updated_at` 2026-04-14T11:32:00Z `[VERIFIED via <meta name="ms.date">/<meta name="updated_at">]`. Confirmed verbatim: nine-OEM list in order "Acer. Asus. Dynabook. Fujitsu. Microsoft Surface. Panasonic. VAIO. Samsung. NEC." followed by "Other OEMs are pending."; Graph property `managedDevice/deviceFirmwareConfigurationInterfaceManaged`; the 24H2 Professional known-issue text and KB5046740 workaround, verbatim.
- **(b)** [Use DFCI profiles on Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows) — `ms.date` 2026-06-23T00:00:00Z, `updated_at` 2026-07-01T22:34:00Z. Confirmed verbatim: "Configuring and assigning DFCI profiles can lock the device beyond repair. So, pay attention to the values you configure." (line 60); "You can't use DFCI with devices manually registered for Windows Autopilot, such as imported from a csv file. By design, DFCI management requires external attestation of the device's commercial acquisition through an OEM or a Microsoft CSP partner registration to Windows Autopilot." (line 40); "Deleting the DFCI profile, or removing a device from the group assigned to the profile doesn't remove DFCI settings or re-enable the UEFI (BIOS) menus." (line 91); the page's own "Reuse, retire, or recover the device" H2 with three named sub-steps; Step 2 heading reads "Step 2 - Create an Enrollment State Page profile" (State, not Status). Confirmed absent: the string "UEFI CSP" (zero occurrences).
- **(c)** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) — `ms.date` 2024-06-06T00:00:00Z, `updated_at` 2026-07-01T22:34:00Z. Confirmed verbatim: "BIOS configuration changes can impact device functionality and operability, including the ability to boot or access Bitlocker encrypted drives." (line 37); "Currently, only Dell is supported." (line 76); "For Dell, upload the Dell Client Configuration Tool Kit file (.cctk). The file size limit is 2 MB." (line 81); "If the Intune subscription for your tenant ends, then there's no way to read or retrieve BIOS passwords. In this situation, your only option is to contact your OEM." (line 99); the DFCI-column six-OEM decoy list "Surface, Acer, Asus, Dynabook, Fujitsu, Panasonic" (line 132); "Through UEFI CSP using the DFCI layer, which is isolated from the OS" (line 138); Graph endpoint `https://graph.microsoft.com/beta/deviceManagement/hardwarePasswordDetails` — confirmed **beta**. Confirmed absent: "as a blocking app" (zero occurrences).
- **(d)** [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows) — `ms.date` 2026-06-23T00:00:00Z, `updated_at` 2026-07-01T22:34:00Z. Confirmed verbatim: "These settings use the UEFI CSP." (line 35); "Be careful. Configuring and assigning DFCI profiles can lock the device beyond repair. The DFCI profile settings change the device hardware, and can't be fixed by re-imaging the OS." (Warning box); CPU and IO virtualization options are only "Not configured" and "Enabled" (no Disabled value); "When set to Disabled, don't set the Boot from network adapters setting to Enabled. It causes the Boot from external media (USB, SD) setting or Boot from network adapters setting to become noncompliant." Eight category H2s confirmed: UEFI access, Security features, Cameras, Microphones and speakers, Radios, Boot Options, Ports, Wake settings.
- **(e)** [DFCI management for Surface devices](https://learn.microsoft.com/en-us/surface/surface-manage-dfci-guide) — `ms.date` 2026-07-14T00:00:00Z, `updated_at` 2026-07-14T22:52:00Z; no earlier `updated_at` was previously on record per CONTEXT — now captured. Confirmed verbatim: "DFCI in Intune includes settings that don't currently apply to Surface devices: CPU and IO virtualization, Disable Boot from network adapters, Windows Platform Binary Table (WPBT), NFC, and SD card." (line 146); "Windows 11 or Windows 10 version 1809 or later" (line 35); "Unless otherwise specified, listed devices are commercial SKUs only." (line 41); "Devices manually or self-registered for Autopilot, such as imported from a CSV file, aren't allowed to use DFCI." / "DFCI won't be applied to self-registered devices." (lines 38, 182); the removal-path step order — Retire/Wipe → Delete the Autopilot registration → connect Surface-branded Ethernet → open UEFI → "Select Management > Configure > Refresh from Network." (lines 173-181, confirming the destructive-order hazard D-33 names).
- **(f)** HP Connect for Microsoft Endpoint Manager — User Guide, PDF, fetched from `https://connect.admin.hp.com/static/HPConnectUserGuide.pdf` (57 pages, Version 1.2.0, September 27, 2022 — confirmed on every page footer). Confirmed verbatim: "Passwords are managed by HP Connect and stored in a cloud vault." (line 390); "Deactivation starts a 30-day countdown where tenant administrators will be able to login to admin.hp.com in read only mode (view only). At the end of the 30 days, all policies and secrets created by the organization in HP Connect will be permanently deleted." (lines 196-198). A second, separate 5-page "SUMMARY" PDF was also found at a `catalogartifact.azureedge.net` marketplace-artifact URL, copyright 2023 / "Second Edition: March 2023" — it also carries the cloud-vault sentence verbatim, but is a shorter app-listing document, not a substitute full guide (see Assumptions Log A2).
- **(g)** [Introducing Think BIOS Config Tool V2 and Lenovo BIOS Certificate Tool V2](https://blog.lenovocdrt.com/introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2/) — ThinkDeploy Blog, dated **November 4, 2025** (exact match to CONTEXT D-46(g)'s cited date). Confirmed verbatim: "The Lenovo BIOS Certificate Tool has been updated with a new UI and the Lenovo.BIOS.Certificates module has been updated to include support for Azure Key Vault for storage of private keys used in signing the settings change commands." (line 54). Confirmed absent: "only vendor," "RBAC," "logging," "rotat[ion]" (zero occurrences of all four). Bonus (Phase 150 scope): "NOTE: ThinkCentre desktops are not currently supported due to incompatible WMI BIOS Interface implementation." (line 206) — confirms BIOS-08's premise.

### Secondary (MEDIUM confidence)
- A related Lenovo post, [Certificate-based BIOS Authentication](https://blog.lenovocdrt.com/certificate-based-bios-authentication/) (updated October 31, 2025) — corroborates the Azure Key Vault mechanism but was not the date CONTEXT.md's D-46(g) cites; use (g) above as the primary citation.
- WebSearch used only to *locate* the HP and Lenovo URLs (D-02's two new fetch targets did not have a URL recorded anywhere in CONTEXT.md or the research ledger); all content claims above are from the direct `curl` fetch of those URLs, not from WebSearch summaries.

### Tertiary (LOW confidence)
None — every substantive claim above traces to a raw-byte fetch performed and quoted in this session.

## Metadata

**Confidence breakdown:**
- Source fidelity (the seven mandated pages): HIGH — every quote independently re-verified against raw bytes fetched this session, zero divergences from CONTEXT.md's citations found.
- Corpus conventions (frontmatter/anchors/Source-line/glossary shape): HIGH — verified by directly reading the sibling files and validator source this session, not by trusting CONTEXT.md's line-number citations (though all of those also checked out).
- HP/Lenovo custody sourcing (BIOS-01's newly-added SC#1 support, D-02): MEDIUM — the substantive mechanisms (cloud vault, Azure Key Vault) are HIGH confidence (directly quoted), but the comparative "only vendor ... RBAC, logging and rotation" framing in BIOS-01's exact wording is not first-party sourced from either vendor and must ship as inference, not quotation (Assumption A1).

**Research date:** 2026-08-24
**Valid until:** Re-fetch required if this phase's plan/execution slips past **2026-09-23** (30 days) — Microsoft Learn pages on this topic have shown multi-week update cycles in this milestone's own measurements (e.g. `configure-bios-windows` sat at `ms.date` 2024-06-06 for two years while its `updated_at` churns quarterly; a 30-day staleness window is conservative but appropriate given the two-fabrication history this milestone is actively correcting for).
