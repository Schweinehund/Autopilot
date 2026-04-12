# Phase 3: Error Codes - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Master error code lookup tables covering every Autopilot error an IT team encounters. Each error maps to deployment mode(s), failure phase, root cause(s), and per-cause fix with L1 and L2 actions. Does not include investigation workflows (Phase 6 L2 Runbooks) or decision trees (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Entry Structure (Table Format)
- 7-column table: Code | # | Name | Phase | Mode | Cause | L1 Action | L2 Fix
- Multi-cause errors use multiple rows with the same code, numbered in the # column (1, 2, 3)
- Mode-dependent fixes use letter suffixes (1a, 1b) for same-cause-different-mode variants
- Sorted by hex code ascending within each category file
- Phase names abbreviated with legend at top: Reg=Registration, OOBE=Out-of-Box Experience, ESP=Enrollment Status Page, Post=Post-enrollment
- Mode names abbreviated with legend at top: UD=User-Driven, PP=Pre-Provisioning, SD=Self-Deploying
- Name column uses official Microsoft error name in CamelCase + source suffix in parens: `DeviceNotFound (Intune)`, `TPMAttestation (OOBE)`
- Hybrid join errors use dual identifiers: `0x80070774 (Event 807)` — hex primary, Event ID in parens
- TPM hardware-specific notes go in Cause column: `AMD fTPM firmware <v3.50`, `Infineon RSA-3072`
- Each category file has a brief 2-3 sentence intro linking to the relevant lifecycle stage guide

### L1 Action Column
- Imperative verb style: "Verify hash in portal", "Reboot device, retry OOBE"
- Escalation uses bold keyword: **Escalate** — collect: [standard base + error-specific data]
- Standard escalation base: device serial, error code, deployment mode, timestamp
- Error-specific additions: TPM adds BIOS version + manufacturer; hybrid join adds domain name + Event IDs
- Transient errors include retry guidance with limits: "Retry after 15 min (max 2), then **Escalate**"
- Non-transient errors have no retry guidance: "Verify hash in portal (no retry — this won't self-resolve)"
- Strictly portal/UI actions only — no PowerShell or registry (per Phase 1 L1 constraint)
- Generic escalation channel — no specifying how to reach L2 (environment-specific per PROJECT.md constraint)

### L2 Fix Column
- Action + brief context (3-5 words): `Remove-AutopilotDevice then re-register`
- PowerShell refs as inline name + link: [`Remove-AutopilotDevice`](../reference/powershell-ref.md#remove-autopilotdevice)
- Registry refs as brief path + link: [`HKLM:\...\AutopilotSettings`](../reference/registry-paths.md#autopilotsettings)
- Forward-links to Phase 6 L2 Runbooks for complex investigations: "see [L2 TPM runbook](link) (available after Phase 6)"
- No deep-dive investigation workflows — those belong in Phase 6

### Cross-Linking
- Phase column links to relevant lifecycle stage guide (e.g., "Reg" links to 01-hardware-hash.md)
- L2 Fix links to Phase 1 canonical references (powershell-ref.md, registry-paths.md)
- Forward-links to Phase 5/6 runbooks with "(available after Phase X)" annotation
- Cross-category errors: primary category has full entry, other categories have cross-reference row linking to canonical location

### File Organization
- 6 files in `docs/error-codes/`:
  - `00-index.md` — Master lookup table (ERRC-01): condensed table with Code, Name, Mode, Category columns
  - `01-mdm-enrollment.md` — 0x8018xxxx series (ERRC-02)
  - `02-tpm-attestation.md` — TPM and firmware errors (ERRC-03)
  - `03-esp-enrollment.md` — ESP and enrollment errors (ERRC-04)
  - `04-pre-provisioning.md` — Pre-provisioning AND self-deploying errors combined (ERRC-05)
  - `05-hybrid-join.md` — Hybrid join and device registration errors with event ID mapping (ERRC-06)
- Index has Categories section linking to each file with brief descriptions
- Mirrors `docs/lifecycle/` directory pattern from Phase 2

### Conventions (Consistent with Phase 1/2)
- YAML frontmatter: `last_verified`, `review_by`, `applies_to`, `audience: both`
- Version gate banner: "This guide primarily covers Windows Autopilot (classic). APv2 differences are noted inline."
- Version History table at bottom of each file
- Prev/next navigation links within error-codes directory
- First-mention glossary linking per file
- No screenshots — text descriptions only
- Direct second-person voice
- File-level versioning only (no per-row dates)
- No confidence indicators on entries

### Audience Handling
- Shared files for both L1 and L2 — split via L1 Action and L2 Fix columns
- Audience-neutral introductions — no "L1 should focus on..." guidance
- `audience: both` in frontmatter for Phase 7 navigation routing

### Deployment Mode Tagging
- Short codes in Mode column: UD, PP, SD, All — with legend at file top
- APv2 handled via blockquote notes section at bottom of each category file (not as a 4th mode tag)
- APv2 Notes list which errors in that category are also observed in Device Preparation
- APv2 Notes link to apv1-vs-apv2.md for framework differences
- PP and SD errors combined in one file (04-pre-provisioning.md) since they share most error codes

### Claude's Discretion
- Specific error codes to include in each category (research determines the actual codes)
- Number of errors per category
- Exact wording of cause descriptions and fix instructions
- Which errors get APv2 Notes
- Microsoft Learn URLs for APv2 callouts and Further Reading
- Exact content of the 2-3 sentence category intros
- Navigation link ordering

</decisions>

<specifics>
## Specific Ideas

- The table format should feel like a diagnostic lookup — technician sees hex code on screen, Ctrl+F finds it, reads across the row for what to do
- Bold **Escalate** keyword makes escalation decisions jump out when scanning — this is the critical L1 visual cue
- Numbered causes (1, 2, 3) and lettered mode variants (1a, 1b) give L1 and L2 a shared reference language for tickets: "0x80180014 cause 2" is unambiguous
- The master index is the single entry point — a technician shouldn't need to guess which category file their error is in

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/l2-template.md`: Base template for frontmatter structure, version gate banner, Version History format
- `docs/_glossary.md`: 26 terms to link on first mention per file
- `docs/apv1-vs-apv2.md`: Canonical source for APv2 callout links
- `docs/reference/powershell-ref.md`: 12 functions to link from L2 Fix cells
- `docs/reference/registry-paths.md`: 8 paths to link from L2 Fix cells
- `docs/reference/endpoints.md`: Endpoints to reference in connectivity-related error fixes
- `docs/lifecycle/01-hardware-hash.md` through `05-post-enrollment.md`: Phase column links to stage guides

### Established Patterns
- YAML frontmatter with `last_verified`, `review_by`, `applies_to`, `audience` fields
- Version gate banner as first content element after frontmatter
- Relative links to Phase 1 reference files (never inline definitions)
- Blockquote callouts for supplementary information (L2 Note, APv2 Note)
- Forward-links with "(available after Phase X)" annotation for future content
- `docs/lifecycle/` subdirectory pattern — replicate as `docs/error-codes/`

### Integration Points
- `docs/error-codes/` — new subdirectory alongside `docs/lifecycle/` and `docs/reference/`
- Phase 2 stage guides' "Failure Indicators" sections will eventually link to these error code tables
- Forward-links to future `docs/l1-runbooks/` (Phase 5) and `docs/l2-runbooks/` (Phase 6)
- Phase 7 navigation will route both L1 and L2 audiences to these files

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-error-codes*
*Context gathered: 2026-03-14*
