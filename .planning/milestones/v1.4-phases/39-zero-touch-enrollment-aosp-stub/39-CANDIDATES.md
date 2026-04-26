# Phase 39 Candidate Options — Adversarial Review Brief

**Phase:** 39 — Zero-Touch Enrollment + AOSP Stub
**Milestone:** v1.4 Android Enterprise Enrollment Documentation
**Purpose:** Adversarial-review scoring of candidate options per gray area. NOT a code review. Each candidate below is a design choice for how to implement Phase 39's two deliverables.

---

## Phase 39 Scope (Authoritative)

Phase 39 delivers TWO artifacts:

1. **Extension** to `docs/admin-setup-android/02-zero-touch-portal.md` (same file Phase 35 authored — appended, not duplicated). Per Phase 35 D-22 split contract:
   - Phase 39 owns: reseller-upload handoff, device-claim workflow, profile assignment at scale, dual-SIM IMEI 1 registration, full KME/ZT mutual-exclusion callout at device-claim, configuration-must-be-assigned gotcha
   - Reserved Phase 39 anchors: `#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff` (must NOT collide with Phase 35's `#prerequisites`, `#step-0-reseller`, `#create-zt-account`, `#dpc-extras-json`, `#link-zt-to-intune`, `#kme-zt-mutual-exclusion`, `#renewal-maintenance`)
   - Maps to requirement AEZTE-01

2. **New file** `docs/admin-setup-android/06-aosp-stub.md` — hard-scoped AOSP stub:
   - Explicit scope callout at top ("stub in v1.4; full coverage v1.4.1")
   - What AOSP is
   - When to use it (RealWear confirmed GA; other OEMs — Zebra, Pico, HTC VIVE Focus, Meta Quest — status uncertain in research)
   - OEM matrix from MS Learn (`https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices`, verified 2025-05-12)
   - QR-only enrollment note
   - One-device-at-a-time enrollment constraint
   - Wi-Fi credential embedding requirement (RealWear-specific)
   - Deferred-content table pointing to v1.4.1 targets
   - Word-count / section-count scope-guard audit — stub size bounded (AEAOSP-01 SC4)
   - Maps to requirement AEAOSP-01

**NOT in scope:** ZTE L1 triage runbook 27 (Phase 40 owns per STATE.md decision); AOSP L1/L2 (deferred to v1.4.1 by explicit scope).

---

## Locked Constraints (do not re-open; flaws proposing changes to these are DISPROVED)

Agents MUST read these files before scoring (full paths relative to project root):

- `.planning/ROADMAP.md` — Phase 39 entry (Success Criteria 1-5)
- `.planning/REQUIREMENTS.md` — AEZTE-01, AEAOSP-01 verbatim
- `.planning/STATE.md` — v1.4 decisions; research flags for Phase 35/39 (ZT portal UI current nav) and Phase 40 (AOSP supported-devices page last verified 2025-05-12)
- `.planning/PROJECT.md` — v1.4 scope; deferred-items tracking
- `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-CONTEXT.md` — Phase 35 D-22 ZT portal split contract; D-23 anchor namespace reservation for Phase 39; D-17 HTML-comment subtractive-deletion pattern (inherited from Phase 34 D-17)
- `.planning/phases/38-dedicated-devices-admin/38-CONTEXT.md` — Phase 38 D-10 ARCH Q6 Platform note banner pattern; Phase 38 D-15 Phase 39 ZT extension boundary acknowledgment; Phase 38 D-12 source-confidence marker pattern (inherited from Phase 37 D-10/D-11)
- `.planning/research/SUMMARY.md` — Phase 39 section line 230 onward; Phase 40 AOSP stub section line 245 onward; deferred items; research flags
- `.planning/research/STACK.md` — AOSP section (3.5) line 116 onward with OEM matrix; ZTE reseller ecosystem section 7 line 249 onward (dual-SIM IMEI, corporate Google account, reseller directory)
- `.planning/research/PITFALLS.md` — PITFALL 4 (ZT reseller Step 0; dual-SIM IMEI 1; KME exclusion); PITFALL 12 (AOSP scope creep; hard audit)
- `docs/admin-setup-android/02-zero-touch-portal.md` — Phase 35's existing file that Phase 39 appends to; existing H2 order (Prerequisites → Step 0 → Create Account → Link Methods A/B → DPC Extras JSON → KME/ZT Mutual Exclusion → Verification → Renewal → See Also → Changelog)

**Locked carry-forward from prior phases:**

- **Anti-Pattern 1 guard:** matrices live in single canonical reference docs; never duplicated into mode guides. Phase 34 owns `02-provisioning-methods.md` and `03-android-version-matrix.md`.
- **PITFALL 1 discipline:** every behavioral assertion carries inline version tag.
- **PITFALL 2 pattern:** "What breaks if misconfigured" callouts at point of admin decision; inline, not footnote.
- **PITFALL 9/11:** NO modifications to v1.0–v1.3 shared files (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `_glossary.md`, `_glossary-macos.md`, `docs/admin-setup-ios/*`, `docs/admin-setup-macos/*`, `docs/l1-runbooks/*`, `docs/l2-runbooks/*`).
- **AEAUDIT-04 guards:** no "supervision" as Android management term; Play Integrity only, never SafetyNet; `last_verified` frontmatter mandatory.
- **Source-confidence marker pattern** (Phase 37 D-10/D-11): inline markers `[HIGH/MEDIUM/LOW: source, last_verified YYYY-MM-DD]` for MEDIUM/LOW-confidence claims.
- **Anchor stability contract** for downstream phase consumers (Phase 40/41 L1/L2 runbooks).
- **60-day review cycle** via frontmatter `last_verified` + `review_by`.
- **HTML-comment subtractive-deletion pattern** (Phase 34 D-17): `<!-- subsection intentionally omitted -->` when template sections don't apply.

---

## Gray Area 1 (GA1) — ZTE Extension Structural Placement + Device-Claim Workflow Depth

**Decision scope:** How do Phase 39's 6 content pieces (reseller-upload handoff, device-claim workflow, profile assignment, dual-SIM IMEI 1, full KME/ZT callout at device-claim, configuration-must-be-assigned) slot into the existing `02-zero-touch-portal.md` H2 structure? AND how much portal-UI detail for the device-claim workflow given ZT portal redesigns frequently (STATE.md research flag)?

### Candidate 1A — Single appended H2 block "Zero-Touch Enrollment at Scale" + decision-points-only depth

Insert ONE new H2 `## Zero-Touch Enrollment at Scale` at position 7 (after `## KME/ZT Mutual Exclusion`, before `## Verification`).

Sub-structure (H3 within the H2):
- `### Reseller-Upload Handoff Workflow` (anchor `#reseller-upload-handoff`) — reseller adds devices to ZT portal with IMEI/serial/MEID; customer confirmation; handoff receipt expectations
- `### Device Claim Workflow` (anchor `#device-claim-workflow`) — admin sees uploaded devices in ZT portal → assigns configuration → devices become claimable by customer org
- `### Profile Assignment at Scale` (anchor `#profile-assignment`) — bulk configuration assignment to device groups; default configuration behavior; per-device overrides
- `### Dual-SIM IMEI 1 Registration` (anchor `#dual-sim-imei-1`) — PITFALL 4 MEDIUM-confidence callout: for dual-SIM devices, register with the numerically lowest IMEI only
- `### KME/ZT Mutual Exclusion — At Device Claim` (anchor `#kme-zt-device-claim`) — expanded callout with cross-link back to Phase 35's `#kme-zt-mutual-exclusion`; Samsung-specific guidance for admins claiming devices
- `### Configuration Must Be Assigned` (anchor `#configuration-must-be-assigned`) — gotcha: devices uploaded to ZT portal without assigned configuration fall through to consumer setup

Device-claim UI depth: decision-points-as-prose. No screen-by-screen portal step listings. Cross-link to Google ZT customer portal help (`https://enterprise.google.com/android/zero-touch/customers/help`) for current UI. Use HTML-comment `<!-- verify UI at execute time -->` for any portal-specific nav.

Update `## Verification` H2 to reference device-claim testing at scale (append, not rewrite).

Update `## Changelog` with Phase 39 entry.

### Candidate 1B — Interleaved H2s inserted at natural touch-points throughout existing structure

Insert H2s at multiple positions:

- NEW `## Reseller-Upload Handoff` inserted BEFORE existing `## Step 0 — Verify Reseller Relationship` (reseller ecosystem context belongs adjacent to reseller gate)
- NEW `## Device Claim Workflow` inserted AFTER existing `## Link Zero-Touch to Intune` (natural flow: link ZT to Intune → then claim devices)
- NEW `## Profile Assignment at Scale` inserted AFTER `## Device Claim Workflow`
- Dual-SIM IMEI 1 note inserted as inline callout inside existing `## Link Zero-Touch to Intune` → Method B section (where identifier format is discussed)
- Full KME/ZT callout at device-claim extends existing `## KME/ZT Mutual Exclusion (Samsung)` H2 by adding an H3 subsection `### At Device Claim (Samsung fleets)` within it
- Configuration-must-be-assigned inserted as inline blockquote inside existing `## DPC Extras JSON Configuration` H2

Device-claim UI depth: decision-points-only + Google canonical link.

Updated H2 order after interleaving:
1. Prerequisites (Phase 35)
2. NEW: Reseller-Upload Handoff
3. Step 0 — Verify Reseller Relationship (Phase 35)
4. Create Zero-Touch Portal Account (Phase 35)
5. Link Zero-Touch to Intune (Phase 35, with inline dual-SIM callout)
6. NEW: Device Claim Workflow
7. NEW: Profile Assignment at Scale
8. DPC Extras JSON Configuration (Phase 35, with inline config-must-be-assigned blockquote)
9. KME/ZT Mutual Exclusion (Phase 35, with appended H3 Phase 39 subsection)
10. Verification (updated to include device-claim testing)
11. Renewal / Maintenance (Phase 35)
12. See Also
13. Changelog

### Candidate 1C — Single appended H2 block + screen-by-screen device-claim depth

Same H2 structure as 1A (single `## Zero-Touch Enrollment at Scale` appended).

BUT device-claim workflow is documented screen-by-screen:
- Lists exact portal breadcrumb paths: "ZT portal > Devices > [device batch]"
- Lists exact button labels: "Select devices > Assign configuration > [configuration name]"
- Lists exact dialog sequences
- Uses HTML-comment `<!-- verify UI at execute time; portal redesigns per STATE.md research flag -->` on every screen-specific claim
- MEDIUM-confidence source-confidence markers on every portal-step

Rationale premise: admins need exact click paths; the cost of staleness is mitigated by execute-time re-verification.

### Candidate 1D — Hybrid: appended H2 block for corporate-scale + inline inserts for naturally-adjacent items

Primary: `## Zero-Touch Enrollment at Scale` H2 appended after `## KME/ZT Mutual Exclusion` (like 1A), containing:
- `### Reseller-Upload Handoff Workflow`
- `### Device Claim Workflow` (decision-points-as-prose + Google canonical link)
- `### Profile Assignment at Scale`
- `### Configuration Must Be Assigned`

INLINE inserts for naturally-adjacent items:
- Dual-SIM IMEI 1 note inserted as inline callout inside existing `## Link Zero-Touch to Intune` → Method B section (natural touchpoint: where identifier format is discussed), WITH cross-link to the anchor `#dual-sim-imei-1` pointing to a one-line definition inside the appended H2 block
- Full KME/ZT callout at device-claim — added as inline `> ⚠️` blockquote within the appended `### Device Claim Workflow` H3, cross-linking Phase 35's `#kme-zt-mutual-exclusion`

Device-claim UI depth: decision-points-as-prose + Google canonical link.

Reserved Phase 39 anchors: `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1` (pointing to the in-block one-liner), `#configuration-must-be-assigned`.

Update `## Verification` to reference device-claim testing.

---

## Gray Area 2 (GA2) — AOSP OEM Matrix Shape and Depth

**Decision scope:** How does the OEM matrix render in `docs/admin-setup-android/06-aosp-stub.md` given that only RealWear is verifiably GA (per research 2025-05-12) and other OEMs have sparse public docs with high staleness risk?

### Candidate 2A — Full 5-column table sourced from MS Learn

Columns: **OEM** | **Device models** | **Device type** | **GA status** | **Notes**

Rows populated from MS Learn aosp-supported-devices page as of plan-time verification:
- RealWear | HMT-1, HMT-1Z1, Navigator 500 | AR/VR Headset | GA | Requires Wi-Fi credential embedding in QR
- Zebra | [models from MS Learn] | Wearable scanner | [GA status from MS Learn] | [per-OEM notes]
- Pico | [models] | AR/VR | [status] | [notes]
- HTC VIVE Focus | [models] | AR/VR | [status] | [notes]
- Meta Quest | [models] | AR/VR | [status] | [notes]

Source attribution inline: `[HIGH: MS Learn aosp-supported-devices, last_verified YYYY-MM-DD]`

Matrix is the single canonical source for AOSP device coverage in v1.4 docs.

### Candidate 2B — RealWear-spotlight + minimal other-OEM list

Dedicated H3 subsection `### RealWear (confirmed GA)` with detailed prose:
- HMT-1, HMT-1Z1, Navigator 500 device models
- AR/VR headset usage context
- Wi-Fi credential embedding in QR enrollment (RealWear-specific)
- QR-only enrollment confirmed for these models
- `[HIGH: MS Learn, last_verified YYYY-MM-DD]`

Other-OEM coverage as short bulleted list:
- Zebra (wearable scanners)
- Pico (AR/VR)
- HTC VIVE Focus (AR/VR)
- Meta Quest (AR/VR)

With disclaimer: "For current GA status and device models per OEM, consult [MS Learn — AOSP supported devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) — authoritative and updated more frequently than this doc."

No inline Notes column. Non-RealWear OEM specifics deferred to v1.4.1.

### Candidate 2C — MS Learn reference + 1-paragraph summary (hyper-minimal)

Single paragraph in `## When to use AOSP` H2:

"AOSP support in Intune (v1.4 scope) covers specialty hardware — dedicated AR/VR headsets and wearable scanners. **RealWear** (HMT-1, HMT-1Z1, Navigator 500) is confirmed GA and carries a RealWear-specific Wi-Fi credential embedding requirement in the QR enrollment payload. Other OEMs (Zebra, Pico, HTC VIVE Focus, Meta Quest) appear in Microsoft's supported-devices list but their per-OEM specifics are deferred to v1.4.1. For the current supported-devices list, consult [MS Learn — AOSP supported devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) — `[HIGH: MS Learn, last_verified YYYY-MM-DD]`."

No table at all. Source URL carries the canonical list.

### Candidate 2D — 2-column table + callouts for RealWear specifics

Table columns: **OEM** | **GA status**

Rows:
- RealWear | GA (HMT-1, HMT-1Z1, Navigator 500)
- Zebra | See MS Learn for current status
- Pico | See MS Learn for current status
- HTC VIVE Focus | See MS Learn for current status
- Meta Quest | See MS Learn for current status

Separate callout blockquotes (OUTSIDE the table):
- ⚠️ **RealWear-specific requirement**: Wi-Fi credentials must be embedded in the QR enrollment payload.
- ⚠️ **QR-only enrollment**: AOSP enrollment is QR code only. No NFC, no Zero-Touch, no DPC identifier, no token-based mechanisms.
- ⚠️ **One device at a time**: AOSP enrollment is one device per operator session. No bulk enrollment.

Source attribution inline: `[HIGH: MS Learn, last_verified YYYY-MM-DD]`

---

## Gray Area 3 (GA3) — AOSP Scope-Guard Enforcement Mechanism

**Decision scope:** AEAOSP-01 SC4 requires the AOSP stub to pass a "word-count / section-count scope-guard audit — stub size is bounded, not allowed to drift into de-facto full coverage." AEAUDIT-04 runs this audit in Phase 42. What is the concrete, measurable, mechanical bound the audit checks?

### Candidate 3A — Hard word count ceiling

Stub body (excluding frontmatter, See Also, Changelog) must be **≤ 800 words**.

AEAUDIT-04 check:
```bash
word_count=$(sed -n '/^---$/,/^---$/!p' docs/admin-setup-android/06-aosp-stub.md \
  | awk '/^## See Also$/{exit}1' \
  | awk '/^## Changelog$/{exit}1' \
  | wc -w)
[[ $word_count -le 800 ]] || echo "AOSP stub exceeds 800-word scope guard"
```

Simple, mechanical, one-number bound. Length-driven.

### Candidate 3B — Fixed section whitelist

Stub must contain exactly these H2 sections, no more, no fewer:
1. **Scope and Status** (scope callout: "stub in v1.4; full coverage v1.4.1")
2. **What AOSP Is**
3. **When to Use AOSP** (OEM context)
4. **Supported OEMs** (matrix — whatever GA2 decides)
5. **Enrollment Constraints** (QR-only; one-device-at-a-time; Wi-Fi credential embedding for RealWear)
6. **Prerequisites and Licensing** (Intune Plan 2 / Suite — research flag verify at plan time)
7. **Deferred Content (v1.4.1)** (table pointing to v1.4.1 targets)
8. **See Also**
9. **Changelog**

AEAUDIT-04 check:
```bash
actual_h2s=$(grep -E '^## ' docs/admin-setup-android/06-aosp-stub.md | sed 's/^## //')
expected_h2s="Scope and Status|What AOSP Is|When to Use AOSP|Supported OEMs|Enrollment Constraints|Prerequisites and Licensing|Deferred Content (v1.4.1)|See Also|Changelog"
# flag if any H2 not in expected list, OR expected H2 missing
```

Structural bound, not length bound. No word count.

### Candidate 3C — Both word count AND section whitelist (belt + suspenders)

Stub body word count ≤ **1000 words** AND fixed H2 whitelist per Candidate 3B.

AEAUDIT-04 runs BOTH checks; failure of either fails the audit.

Rationale: word count alone can be bypassed by dense prose; section whitelist alone can be bypassed by padding inside an allowed section.

### Candidate 3D — Relative-size bound (no hard number)

Stub word count ≤ 50% of smallest sibling admin guide (e.g., if `03-fully-managed-cobo.md` is 3200 words, stub ≤ 1600 words).

AEAUDIT-04 check:
```bash
stub_wc=$(wc -w docs/admin-setup-android/06-aosp-stub.md | awk '{print $1}')
smallest_sibling=$(wc -w docs/admin-setup-android/0[3-5]-*.md | grep -v total | sort -n | head -1 | awk '{print $1}')
ratio=$(echo "scale=2; $stub_wc / $smallest_sibling" | bc)
[[ $(echo "$ratio < 0.5" | bc) -eq 1 ]] || echo "AOSP stub exceeds 50% of smallest sibling"
```

No hard section whitelist. Scope boundaries described in prose within the Scope callout section.

---

## Gray Area 4 (GA4) — Phase 39 PLAN Structure

**Decision scope:** ROADMAP Phase 39 says "Runs in parallel with Phases 36-38 (independent after Phase 35)." Phase 39 has two independent deliverables. How are PLAN files structured?

Precedent:
- Phase 36 (1 doc): 1 plan with 3 waves (W0 anchor-verify, W1 author, W2 audit)
- Phase 37 (2 docs, same mode): 2 plans, one per doc (W0/W1/W2 each)
- Phase 38 (1 doc): 1 plan with 3 waves

### Candidate 4A — ONE plan covering both artifacts

`39-01-PLAN.md` covers both ZTE extension + AOSP stub together.

Wave structure:
- W0: Anchor-stability verify for both files (Phase 35 ZT portal anchors still present; no 06-aosp-stub.md exists yet)
- W1: Author both artifacts together (executor does ZTE extension first, then AOSP stub, or vice versa)
- W2: Single AEAUDIT-04 audit pass covering both deliverables

Single verification gate. Atomic delivery.

### Candidate 4B — TWO plans, parallelizable within phase

`39-01-PLAN.md` — ZTE extension only. W0/W1/W2 for `02-zero-touch-portal.md` Phase 39 sections.
`39-02-PLAN.md` — AOSP stub only. W0/W1/W2 for `06-aosp-stub.md`.

Both plans can execute in parallel (no dependencies between them per ROADMAP "independent after Phase 35").

Matches Phase 37 precedent (separate plans per doc).

Better atomic rollback: if AOSP stub has issues, ZTE extension still lands clean.

### Candidate 4C — TWO plans with sequential waves (39-01 ZTE first, then 39-02 AOSP)

Same 2-plan split as 4B, but `39-02-PLAN.md` blocks on `39-01-PLAN.md` completion.

Sequential execution; no parallelism within phase.

Rationale premise: sequential is safer because the executor is fully focused on one deliverable at a time.

### Candidate 4D — ONE plan with per-artifact waves (hybrid)

Single `39-01-PLAN.md` with multi-artifact wave structure:
- W0: Anchor-stability verify for both files
- W1a: Author ZTE extension (parallel to W1b)
- W1b: Author AOSP stub (parallel to W1a)
- W2: Single audit pass covering both

Waves-within-single-plan provides parallelism without plan proliferation.

Departs from Phase 37 precedent (which used 2 separate plan files for parallelizable work).

---

## Scoring Rubric (for all three agents)

**Severity:**
- **CRITICAL**: violates a locked constraint (Phase 34/35/36/37/38 CONTEXT decision, PROJECT.md / REQUIREMENTS.md / ROADMAP.md requirement, research pitfall), introduces factual error, breaks Phase 40/41 downstream consumer contract, or makes the phase fail a Success Criterion
- **MEDIUM**: creates readability or maintainability pain, increases staleness risk materially, creates audit ambiguity, requires cross-phase coordination not captured
- **LOW**: style preference, non-blocking minor inefficiency, alternative would be slightly better but this works

**Scoring per candidate (lower is better — we pick winners by FEWEST confirmed real flaws):**
- weighted_total = 5 × CRIT_count + 2 × MED_count + 1 × LOW_count
- Tiebreaker 1: fewer CRIT
- Tiebreaker 2: fewer MED
- Tiebreaker 3: fewer LOW
- Tiebreaker 4: author judgment

**Winner per area:** candidate with fewest confirmed real flaws.

---

*Written for adversarial review. Finder → Adversary → Referee → Synthesis. Each agent reads the full file list in its own context.*
