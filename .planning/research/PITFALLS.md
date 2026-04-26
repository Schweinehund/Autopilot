# Pitfalls Research

**Domain:** Intune provisioning documentation suite — v1.5 integration pitfalls
**Researched:** 2026-04-26
**Confidence:** HIGH (grounded in v1.0–v1.4.1 retrospectives, audit artifacts, and STATE.md carry-forward)

---

## Critical Pitfalls

### Pitfall 1: Linux Capability Parity Framing — "Writes As If Intune Is Full-Featured"

**What goes wrong:**
Authors write Linux admin guides using the same content depth and feature-by-feature walkthrough pattern as the Windows/macOS/iOS/Android guides. Linux gets a compliance policy section implying device-level CA, an app deployment section implying binary installer support, and an admin setup section implying the same management breadth. Readers attempt to configure things that don't exist, open support tickets, and lose trust in the documentation.

**Why it happens:**
The established pattern across v1.0–v1.4 is "write admin setup → write capability matrix → write L1/L2." That pattern implicitly assumes management depth. Linux Intune client (deb-based) has a genuinely narrow surface: compliance policy (subset of settings), web-app-only Conditional Access (no device-based CA), script-based app delivery only (no MSI, MSIX, .pkg, or APK analog), no Entra Hybrid Join for Linux, and no equivalent of Windows LAPS, macOS Bootstrap Token, iOS Supervision, or Android DPC.

**How to avoid:**
Adopt the PITFALL-7 framing established for AOSP in v1.4: the Linux foundation doc (analogous to `06-aosp-stub.md` or `00-enrollment-overview.md`) must open with an explicit **"Supported Management Surface"** H2 — a locked whitelist of what IS supported, followed by an equally prominent **"Out of Scope for Linux via Intune"** callout block enumerating what is not. Every subsequent doc in the Linux tier must carry a banner referencing this whitelist. Do not write H2 sections for capabilities that don't exist, even as stubs. Stub placeholders for unshipped features create the same "looks done but isn't" debt seen with the AOSP stub (`06-aosp-stub.md` 1089→696 word trim in v1.4.1 Phase 43).

**Warning signs:**
- A Linux admin setup guide has a "Conditional Access" H2 without a "web-app CA only" scoping callout in the opening paragraph
- A Linux compliance doc lists settings that map 1:1 with Windows compliance settings without verifying each is actually present in the Linux compliance policy profile type in Intune
- The Linux capability matrix has the same number of non-empty rows as the Windows or macOS matrix

**Phase to address:**
Linux foundation phase (first Linux phase, estimated Phase 49 or 50). The whitelist must be authored and locked before any Linux admin setup, L1, or L2 docs are written. Treat it as a PREREQ gate identical to Phase 34's Android foundation.

---

### Pitfall 2: Conditional Access Bait — Admins Expect Device-Level CA on Linux

**What goes wrong:**
An IT admin reads the Linux compliance policy guide, correctly configures a compliance policy, waits for the device to report compliant, then tries to scope a Conditional Access policy to require "compliant device" for a critical SaaS app. It fails — Linux does NOT support device-level CA (the `compliantDevice` grant in Entra CA is not available for Linux). Only web-app CA (requiring sign-in via a compliant browser) is supported. The admin then finds the compliance policy they spent time configuring has no CA enforcement path, which is a fundamental workflow difference from every other platform in the suite.

**Why it happens:**
The existing iOS, Android, and Windows guides all explain CA in terms of device compliance → Conditional Access grant. Admins reading Linux docs will naturally attempt the same workflow. The distinction between "device compliance exists" and "device-level CA grant works" is non-obvious; Microsoft's own Intune documentation historically conflated compliance reporting with CA enforceability.

**How to avoid:**
The Linux compliance policy doc must open with an architectural callout block:
```
> **Linux CA constraint:** Intune compliance policies on Linux report device state to Intune but
> do NOT unlock the "Require device to be marked as compliant" grant in Entra Conditional Access.
> Only web-app CA (browser-based sign-in + compliant browser requirement) is available on Linux.
> See [Linux admin setup — Conditional Access scope] for the supported CA workflow.
```
The Linux capability matrix must have an explicit "Conditional Access — device-level" row with `Not supported — web-app CA only` in the Linux column. This cell must not be left blank, N/A without explanation, or marked as a future feature.

**Warning signs:**
- The Linux compliance doc does not distinguish "device reports compliant" from "CA grants access"
- The Linux capability matrix CA row is blank or simply says "Partial"
- The Linux admin setup guide contains a standard "Conditional Access" step that mirrors the iOS or Windows CA sections

**Phase to address:**
Linux foundation phase (whitelist) and Linux admin setup phase. The Linux capability matrix cell for CA must be authored and reviewed before the L1 and L2 docs are written, because L1 agents will otherwise route CA-blocked Linux users down the wrong troubleshooting tree.

---

### Pitfall 3: Snap vs Deb Agent Confusion — Authoring the Wrong Delivery Method

**What goes wrong:**
The Linux docs describe the Microsoft Intune Linux agent as delivered via Snap package (as it was briefly in an early preview). Admins install from the wrong source, get stale agent versions, or run into Snap confinement issues that the docs don't mention. Or docs describe both delivery paths without clearly labeling which is GA and which is deprecated/preview.

**Why it happens:**
Microsoft shipped the Intune Linux client via Snap during preview (2023), then transitioned to the deb package as the GA delivery path (installed from packages.microsoft.com, same repo as Defender for Endpoint on Linux). Both paths still return results in web searches. Without a freshness-verified source check, an author will mix both.

**How to avoid:**
Verify the current GA delivery path against packages.microsoft.com and the official Microsoft Learn "Set up Linux device management" docs during the Linux foundation phase. Lock the delivery method as a DECISION in the Linux admin setup guide's Key Decisions equivalent. If both snap and deb are mentioned in troubleshooting contexts (e.g., "if you see snap-based agent errors, you are on the preview path"), frame them explicitly with a deprecated/GA label, mirroring the SafetyNet vs Play Integrity framing discipline from v1.4 (zero ambiguity about which is current).

**Warning signs:**
- Agent installation instructions use `snap install intune-portal` instead of `apt install intune-portal`
- Docs describe a `snapd` socket path for agent communication
- L2 log collection paths reference Snap container paths (e.g., `/var/snap/intune-portal/`) instead of `/var/log/microsoft/intune/`

**Phase to address:**
Linux foundation phase — verify GA delivery path before authoring any enrollment or troubleshooting doc. Include a `last_verified` date stamped to the official Microsoft Learn page URL.

---

### Pitfall 4: Distro Version Creep — Ubuntu HWE vs GA Kernels and LTS EOL

**What goes wrong:**
The Linux docs write for "Ubuntu LTS" as if it's a single homogeneous surface. In practice, Ubuntu LTS ships two kernel tracks: GA (stock) and HWE (Hardware Enablement, updated each 6 months within the LTS lifecycle). The Intune Linux agent has different kernel compatibility behaviors across these tracks. Additionally, Ubuntu 20.04 LTS reaches EOL in April 2025 (standard) / April 2027 (ESM), while 24.04 LTS shipped April 2024. Docs that don't version-scope their instructions will give incorrect guidance to admins on 20.04 with HWE kernel or admins already on 24.04.

**Why it happens:**
The established pattern for other platforms is to write "iOS 16+" or "Android 12+" breakpoints. For Linux, authors write "Ubuntu 22.04" and assume that covers all Ubuntu 22.04 variants, not realizing HWE kernel behavior diverges for PAM authentication module compatibility and that the Intune agent package has explicit kernel-version minimum requirements.

**How to avoid:**
The Linux foundation phase must author a Linux version-breakpoint matrix analogous to `03-android-version-matrix.md`. Axes: Ubuntu LTS version (20.04 / 22.04 / 24.04) × kernel track (GA / HWE) × support status (active / ESM / EOL). Flag 20.04 EOL (standard) explicitly. The agent installation prerequisite checklist must specify the minimum kernel version, not just the Ubuntu release. The L2 runbooks must include kernel-version verification as a diagnostic step.

**Warning signs:**
- Linux docs refer to "Ubuntu LTS" without specifying 20.04/22.04/24.04
- Agent prerequisites list "Ubuntu 20.04/22.04/24.04" without flagging 20.04 EOL status
- No mention of `uname -r` output in L2 log collection or diagnostic steps
- Linux capability matrix has a single "Ubuntu LTS" column instead of per-version breakpoint rows

**Phase to address:**
Linux foundation phase. Version matrix must be authored and locked before any platform-specific admin or troubleshooting guides.

---

### Pitfall 5: Glossary Collision — Linux Terms Overloading Existing Android / Cross-Platform Terms

**What goes wrong:**
`_glossary-linux.md` re-defines "DPC" (Device Policy Controller) in a Linux context, creating confusion with the Android DPC definition already in `_glossary-android.md`. Similarly, "agent" is used in Android contexts (Android Device Policy, Company Portal as DPC), iOS contexts (Intune app as MDM agent), and will be used in Linux contexts (intune-portal daemon). "Compliance partner" appears in Windows docs with a specific Intune meaning. Without an explicit cross-reference check, Linux authors inadvertently reuse terms with established meanings.

**Why it happens:**
Each platform glossary has been authored independently. The Android glossary (v1.4) already carries a "DPC" disambiguation because the same term confused Android admins. Linux has no GMS stack and no DPC concept in the Android sense, but authors may reach for familiar MDM vocabulary to describe agent-based management.

**How to avoid:**
During the Linux foundation phase, conduct an explicit cross-glossary collision audit before drafting `_glossary-linux.md`. For each Linux term candidate, check: (1) is it already defined in `_glossary.md`, `_glossary-macos.md`, `_glossary-ios.md`, or `_glossary-android.md`? (2) If yes, does the Linux usage match? If no, does the Linux glossary entry need a "not to be confused with [Android DPC]" see-also? This is the same discipline that the Android glossary used for "supervision" — carrying an explicit iOS cross-reference callout because the term exists in iOS with a different meaning.

Terms most at risk: **agent** (defined differently across iOS/Android/Linux), **compliance** (device compliance policy has different CA surface on Linux vs Windows), **enrollment** (Linux "enrollment" is distinct from GMS BYOD enrollment), **portal** (Company Portal vs Intune portal vs web portal have platform-specific meanings).

**Warning signs:**
- `_glossary-linux.md` uses "agent" without a see-also to the iOS and Android usages
- A Linux L1 runbook uses "DPC" to describe the intune-portal daemon
- `_glossary-linux.md` has terms that appear identically defined (or contradictorily defined) in another platform glossary

**Phase to address:**
Linux foundation phase — glossary cross-collision audit is a PREREQ before `_glossary-linux.md` is finalized. Add a validator check in the Linux phase validator (`check-phase-NN.mjs`) that ensures no term in `_glossary-linux.md` appears in another platform glossary without a cross-reference.

---

### Pitfall 6: Nav Backport Regression — `docs/index.md` Edits Break v1.0–v1.4.1 Cross-References

**What goes wrong:**
DEFER-07 requires backporting Android sections into `docs/index.md`. The edit modifies anchors or H2 headings in the file. Existing archived phase docs, cross-references in `common-issues.md`, and external links (e.g., SharePoint exports that may have anchored to specific headings) break silently. The v1.1 audit already surfaced one broken anchor (`admin-setup-apv1/00-overview.md` → `apv1-vs-apv2.md#decision-flowchart`) as a tech-debt item. Regression at a shared navigation hub is amplified.

**Why it happens:**
`docs/index.md` is the highest-traffic cross-reference target in the suite. The Key Decisions table (PROJECT.md) explicitly noted this risk: "v1.4 cross-platform nav deferred post-milestone — backport regression risk against v1.0-v1.3 archived/live docs." When a phase edits `docs/index.md`, it must enumerate ALL existing anchor links into that file and verify none are changed.

**How to avoid:**
Before any edit to `docs/index.md`, run a pre-edit anchor inventory: `grep -rn "index.md#" docs/` to enumerate all files that link to anchors in `index.md`. The DEFER-07 cleanup phase plan must include this inventory as a PREREQ task and verify each anchor survives the edit. New H2 sections (e.g., adding a full Android section) should be appended, not inserted, to avoid shifting the anchor IDs of existing sections. Apply the append-only H2-block contract from v1.4 Phase 42 D-03 explicitly to `docs/index.md` edits.

**Warning signs:**
- The DEFER-07 plan modifies an existing H2 heading in `docs/index.md` rather than appending a new one
- No pre-edit anchor inventory was run
- The plan edits `common-issues.md` and `quick-ref-l1.md` without checking incoming anchor links in those files

**Phase to address:**
Cleanup phase (DEFER-07, Phase 48 or equivalent). Must be the first cleanup sub-task, establishing the anchor inventory before any edits land.

---

### Pitfall 7: DEFER-08 Duplication — 4-Platform Comparison Copies Instead of Cross-References Existing Matrices

**What goes wrong:**
The 4-platform capability comparison document (`docs/reference/4-platform-comparison.md` or similar) is authored by copying cell values from the existing `macos-capability-matrix.md`, `ios-capability-matrix.md`, and `android-capability-matrix.md`. Immediately on authoring, the comparison doc is stale because it doesn't track the originals. Six months later, someone updates the macOS CA cell (macOS got a new capability), but the comparison doc still shows the old value. Readers make deployment decisions on stale information.

**Why it happens:**
DEFER-08's stated scope is a "side-by-side structural reference doc with feature parity matrix across enrollment, identity, app delivery, compliance, conditional access, monitoring." Authors naturally write standalone tables rather than reference-by-link architectures because markdown tables don't have transclusion. The temptation to author self-contained cells is high.

**How to avoid:**
The DEFER-08 doc must be a structural reference doc that aggregates LINKS to the per-platform matrices, not a cell-authored copy of their content. For each feature row in the 4-platform comparison, cells should either: (a) provide a brief assertion linking to the authoritative per-platform matrix section for detail ("Yes — see [macOS CA timing](macos-capability-matrix.md#compliance)"), or (b) provide a delta statement where the comparison IS the content ("macOS has no Hybrid Entra Join — Windows only"). Pure copy-paste of matrix cell values from existing docs into a new doc is explicitly not allowed.

The comparison doc's `last_verified` date must be pinned to a review cycle shorter than the per-platform matrices (recommend 45-day given cross-platform drift surface). The v1.5 audit harness structural check for this doc must verify that non-empty cells contain hyperlinks to the source matrices, not raw copied content.

**Warning signs:**
- Any cell in the 4-platform comparison doc does not contain a link to the per-platform matrix
- The 4-platform comparison doc's row count matches the per-platform matrices row-for-row (likely a copy)
- No `last_verified` date in the comparison doc frontmatter

**Phase to address:**
Cleanup phase (DEFER-08). The structural rule (link-not-copy) must be established as a design decision in the DEFER-08 plan before authoring begins. The audit harness structural check (4-platform-comparison-doc structural validity) enforces it mechanically.

---

### Pitfall 8: Co-Management Workload Slider Ambiguity — "Pilot Intune" vs "Intune" Framing Failure

**What goes wrong:**
The co-management documentation describes workload sliders in ConfigMgr using outdated or ambiguous terminology. Authors call the "Pilot Intune" slider state "partially migrated" and the "Intune" slider state "fully migrated," without explaining that the Pilot group can be a specific device collection while the remaining fleet stays on ConfigMgr. Admins follow the doc to set all 8 workload sliders to "Intune" immediately, removing ConfigMgr management from workloads they haven't validated — particularly the Endpoint Protection workload, which controls Defender for Endpoint policy. When Endpoint Protection slider is flipped to Intune before the Intune Defender policy is published and targeted, the fleet loses Defender policy coverage silently for a window.

**Why it happens:**
Microsoft's own co-management documentation has inconsistent naming across different versions of the ConfigMgr console (slider labels change between SCCM Current Branch versions). Authors working from a single documentation source miss the nuance of the Pilot Intune state. The Endpoint Protection workload's interaction with Defender for Endpoint is a non-obvious dependency: Defender policy in Intune must be live before the workload slider moves.

**How to avoid:**
The co-management admin guide must: (1) explain the three slider states (ConfigMgr / Pilot Intune / Intune) with the Pilot Intune state explicitly described as "collection-scoped Intune management, remainder stays on ConfigMgr"; (2) table the 8 workloads with a recommended migration order and a "Validate before moving slider" column; (3) call out the Endpoint Protection workload specifically as HIGH-RISK — "do not move this slider until Intune Defender for Endpoint policy is published, targeted, and confirmed reporting healthy." Apply the "what breaks" callout pattern established in v1.1 admin setup guides to each workload row.

**Warning signs:**
- Co-management doc describes only two slider states (ConfigMgr / Intune) without Pilot Intune
- Endpoint Protection workload gets the same treatment as lower-risk workloads (e.g., Compliance Policies)
- No cross-reference to Defender for Endpoint policy verification in the co-management guide

**Phase to address:**
Ops-depth co-management phase. The workload table with risk ratings must be authored before L1/L2 runbooks reference co-management state.

---

### Pitfall 9: WUfB Ring Naming Collision — Autopatch Rings vs WUfB Rings

**What goes wrong:**
The patch management documentation uses "ring" to describe both Windows Update for Business deployment rings (Fast / Broad / Preview or custom named rings) and Windows Autopatch rings (Test / First / Fast / Broad — Microsoft-managed). An admin reading a section that says "assign the device to the Fast ring" doesn't know whether "Fast" refers to their WUfB custom ring or the Autopatch Fast ring. The two systems have different assignment mechanisms, different cadences, and cannot be simultaneously active on the same device (Autopatch requires ceding WUfB policy control to Microsoft).

**Why it happens:**
Both systems use ring nomenclature. Many Microsoft Learn articles use "ring" without the system qualifier. Authors stitching together guidance from multiple sources inherit the collision.

**How to avoid:**
Every mention of "ring" in the patch management docs must be qualified: "WUfB deployment ring" or "Autopatch ring" — never bare "ring." The opening section of the patch management doc must disambiguate the two systems explicitly, including the mutual-exclusion: "If you adopt Windows Autopatch, you delegate WUfB ring management to Microsoft — custom WUfB ring assignments are replaced." Driver/firmware update policy via WUfB must be called out as a SEPARATE policy from quality and feature update rings; admins who only configure the feature/quality ring discover drivers aren't managed until a hardware-caused regression occurs.

**Warning signs:**
- Doc uses "ring" without WUfB/Autopatch qualifier
- Driver/firmware update policy is not mentioned separately from quality/feature update rings
- No mutual-exclusion callout between WUfB self-managed and Autopatch

**Phase to address:**
Ops-depth patch management phase. Disambiguation must be in the opening H2 before ring configuration steps.

---

### Pitfall 10: Win32 Supersedence Chain — App A Supersedes B But B Is Still Required

**What goes wrong:**
The app lifecycle documentation explains Win32 supersedence but leaves out the specific failure mode: if App A supersedes App B, but App B is still assigned as Required to a device group, the device receives conflicting instructions — "install A (which supersedes B) and also install B (Required assignment)." Intune's behavior in this case is non-obvious (required assignment wins; supersedence only removes B if it was deployed as Available, not Required). Admins set up a supersedence chain expecting automatic cleanup, then observe that the old app persists on devices with Required assignments.

**Why it happens:**
The supersedence feature is often documented as a replacement for manual uninstall-and-reinstall cycles. The Required assignment exception is buried in a footnote in Microsoft Learn. Authors document the feature at its surface, not its boundary conditions.

**How to avoid:**
The Win32 app lifecycle doc must table the supersedence behavior matrix: source assignment type (Available / Required) × supersedence action (Uninstall / Replace). The Required-assignment exception must appear as a dedicated `> ⚠️` callout, not buried in prose. Apply the same "what breaks" pattern established for per-setting admin callouts in v1.1 Windows guides.

**Warning signs:**
- App lifecycle doc describes supersedence without a behavior matrix
- No mention of Required assignment behavior exception
- No callout about dependency-graph depth (App A requires App B which supersedes App C) and its ordering implications

**Phase to address:**
Ops-depth app lifecycle phase. Behavior matrix must be authored as part of the Win32 section, with the audit harness optionally checking for the "supersedence" token in the app lifecycle doc.

---

### Pitfall 11: Audit Harness Path A Copy — FROZEN Markers Must Be Dropped When Copying v1.4.1 → v1.5

**What goes wrong:**
`v1.5-milestone-audit.mjs` is created as a Path A copy of `v1.4.1-milestone-audit.mjs`. The copy retains any comments that pin the v1.4.1 harness as a frozen predecessor (e.g., the comment at line 5 of v1.4.1: "Frozen-predecessor reproducibility anchor: v1.4-milestone-audit.mjs pinned at commit..."). The v1.5 harness also inherits informational-first grace markers on C6/C7/C9 that were intended as a temporary grace period during v1.4.1's high-churn phase. If those markers are not revisited, checks that should have graduated to blocking in v1.5 remain informational, silently missing regressions.

**Why it happens:**
Path A copy pattern (established in v1.4.1 lineage) copies the previous harness verbatim. Comments and flag values that were contextually meaningful in v1.4.1 persist unchecked into v1.5. The pre-existing FAIL on `regenerate-supervision-pins.mjs --self-test` (stale BASELINE_9 vs Phase 44+ file coordinates, flagged at v1.4.1 close per STATE.md) also persists into v1.5 tooling if not explicitly refreshed.

**How to avoid:**
The v1.5 audit-tooling phase plan must include an explicit line-by-line diff review of the copy vs the v1.4.1 source with the following checklist:
- Drop "Frozen-predecessor reproducibility anchor" comment (replace with v1.5's own anchor)
- Review each check's blocking/informational flag — checks marked informational-first in v1.4.1 should graduate to blocking in v1.5 unless there is a documented reason to extend grace
- Refresh `regenerate-supervision-pins.mjs` BASELINE_9 to reflect Phase 44+ file coordinates (pin coordinates for `_glossary-android.md` and `android-capability-matrix.md` may have shifted due to Phase 46 COPE additions)
- Update the sidecar filename reference from `v1.4.1-audit-allowlist.json` to `v1.5-audit-allowlist.json`

**Warning signs:**
- `v1.5-milestone-audit.mjs` contains "Frozen-predecessor reproducibility anchor: v1.4.1-milestone-audit.mjs" comment (correct concept, but the comment must point to v1.4.1, not appear to say v1.5 is frozen)
- C6/C7/C9 are still `INFORMATIONAL_ONLY = true` in v1.5 without a documented decision to maintain grace
- `regenerate-supervision-pins.mjs --self-test` still fails due to stale BASELINE_9

**Phase to address:**
Audit harness extension phase (Pillar 4). Must be one of the first v1.5 phases to produce a working harness that subsequent content phases can run against.

---

### Pitfall 12: Sidecar Pin Coordinate Stability — Line Shifts Break Existing Exemption Pins

**What goes wrong:**
The v1.5 audit harness adds new Linux platform docs to the supervised-term scan scope. The v1.4.1 sidecar (`v1.4.1-audit-allowlist.json`) has 18 hand-authored pins at specific `{file, line}` coordinates. When Linux docs are added and Android docs are extended (ops-depth content appended), existing pins drift. A pin at `docs/_glossary-android.md:65` becomes `docs/_glossary-android.md:72` after 7 lines are inserted above. The harness's C2 check then fails — the pinned line no longer contains the exempted term, and the real occurrence is now on a different line without a pin, causing a false FAIL or an unpinned false positive.

**Why it happens:**
The sidecar pin system uses absolute line numbers (as designed in v1.4 per Phase 42 D-03). Any insertion into a pinned file above a pin coordinate shifts all subsequent pins. This was not an issue in v1.4.1 because per-OEM AOSP files were new files (no existing pins) and glossary additions were appended. In v1.5, ops-depth content may extend existing Android docs (e.g., appending an ops-depth section to `_glossary-android.md`) and Linux docs may trigger NEW supervision-term scans.

**How to avoid:**
Before any v1.5 content phase appends to a file that contains existing sidecar pins, run `regenerate-supervision-pins.mjs --report` to see the current line coordinates for supervised-term occurrences. If lines were inserted above pins, run `--emit-stubs` and hand-compare to the current sidecar — update shifted coordinates. This is a commit-time check, not a plan-time check. The v1.5 audit harness phase should document the "pin coordinate refresh" procedure explicitly in its plan, and the harness should emit a warning (not a silent PASS) when a pin coordinate does not match the expected term at that line.

**Warning signs:**
- `v1.4.1-milestone-audit.mjs` C2 fails with "pin at line N does not contain expected term" after ops-depth content is appended to `_glossary-android.md`
- `regenerate-supervision-pins.mjs --report` shows term occurrences at different line numbers than the sidecar

**Phase to address:**
Audit harness extension phase, AND as a pre-commit gate in every phase that touches an Android or iOS doc that has existing pins.

---

### Pitfall 13: New Ops-Domain Check Anti-Pattern — "deprecated" / "end of life" Tokens as False Positives

**What goes wrong:**
The v1.5 audit harness adds ops-domain checks (co-mgmt-doc presence, patch-cycle freshness, app-lifecycle anchor reachability, drift-doc cross-references). A natural check is a token scan for terms like "deprecated" or "end of life" or "removed" to surface feature obsolescence. This check produces false positives on legitimate content: the AMAPI migration callout in BYOD Work Profile ("OMA-URI removed April 2025"), the SafetyNet deprecation context in Android L2 runbooks, the Ubuntu 20.04 EOL callout in Linux docs, and any "what not to do" framing that explicitly names deprecated approaches.

**Why it happens:**
This exact pattern was encountered in v1.4.1 (C9 `cope_banned_phrases` check producing false positives on historical-context callouts). The informational-first grace pattern was the resolution. A new harness author drafting v1.5 ops checks may re-introduce the problem by writing token scans without an allow-list or context window.

**How to avoid:**
Every new token-scan check in `v1.5-milestone-audit.mjs` must either: (a) ship informational-first with a documented promotion date, or (b) ship with a context window check (scan N lines before/after the token for legitimizing context). The "deprecated" / "end of life" token checks specifically must have an allow-list from day one, seeded with known-legitimate occurrences. Use the C9 sidecar `cope_banned_phrases` pattern as the template — blocked phrase list in sidecar, not hardcoded.

**Warning signs:**
- A new v1.5 check flags `AOSP stub` BYOD Work Profile docs for containing "removed"
- C-new check FAIL references the Android AMAPI migration callout in `04-byod-work-profile.md`
- No allow-list entry for the Ubuntu 20.04 EOL callout in the Linux version matrix

**Phase to address:**
Audit harness extension phase. Every new check must be reviewed against the existing doc corpus for false-positive candidates before the check is finalized.

---

### Pitfall 14: Broken-Link Sweep False Positives — Microsoft Learn Redirect Chains

**What goes wrong:**
The broken-link sweep phase uses `markdown-link-check` or a similar tool and flags 40+ links to `learn.microsoft.com` as broken. On investigation, most are valid redirect chains (Microsoft Learn relocated content from `docs.microsoft.com` to `learn.microsoft.com`, and internally reorganized docs URLs). The team spends significant effort triaging false positives instead of fixing real broken links.

**Why it happens:**
Microsoft Learn underwent a major URL migration from `docs.microsoft.com` to `learn.microsoft.com` in late 2022. Additionally, Microsoft continues to reorganize content within `learn.microsoft.com`. Many links that return HTTP 301 or 302 are flagged as broken by tools that don't follow redirects or that use a strict "200 OK only" rule. Anchor links (`#section-heading`) are particularly vulnerable because GFM anchor IDs are generated from heading text — if Microsoft renames a heading, the anchor breaks silently (returns 200 for the page but 404 for the anchor).

**How to avoid:**
The broken-link sweep plan must: (1) configure the tool to follow redirects (HTTP 3xx = not broken, unless the final destination is a 404); (2) maintain an allow-list of known-good redirect chains to exclude from re-checking; (3) separate anchor-link checks from bare URL checks (anchor failures are more expensive to verify); (4) for Microsoft Learn links specifically, check against the current canonical URL rather than the historical URL. Internal intra-doc anchor checks (links within the 179-doc tree) are HIGH priority and should be separated from external URL checks in tooling output.

**Warning signs:**
- Broken-link sweep report shows 30+ Microsoft Learn links as failed
- All failed links are `docs.microsoft.com` URLs (old domain — redirect, not broken)
- Tool output does not distinguish internal vs external link failures

**Phase to address:**
Cleanup phase (broken-link sweep). The plan must specify tool configuration (redirect-following, allow-list) before running the sweep. Do not act on raw tool output without the allow-list applied.

---

### Pitfall 15: Intra-Doc Anchor Case Sensitivity — GFM vs Non-GFM Renderers

**What goes wrong:**
A link like `[See compliance section](ca-enrollment-timing.md#Compliance-Policy-Timing)` works on GitHub (GFM lowercases anchor IDs) but fails on other renderers used for SharePoint/Confluence export. Anchor case mismatches are a significant portion of the broken-link sweep findings in the v1.1 audit (`admin-setup-apv1/00-overview.md` → `apv1-vs-apv2.md#decision-flowchart` was one such finding).

**Why it happens:**
Anchor IDs in GFM are generated by lowercasing the heading text, replacing spaces with hyphens, and removing most punctuation. Authors sometimes manually write anchors with capital letters (matching the heading's display case) or inconsistently handle headings that start with a number or contain parentheses.

**How to avoid:**
The broken-link sweep tooling must use a GFM-compliant anchor checker (one that generates anchor IDs using the same lowercase+hyphenate algorithm). The pre-sweep checklist must verify that all intra-doc anchors use lowercase-hyphenated form. A simple normalization rule: all links in the form `file.md#anchor` should have a lowercase `#anchor`. Flag any `#CapitalLetter` occurrence.

**Warning signs:**
- Links containing `#[A-Z]` anchors in markdown files
- Anchor links that work in GitHub preview but fail in wiki export
- The broken-link sweep finds anchor failures across files that have not been edited in this milestone

**Phase to address:**
Cleanup phase (broken-link sweep). Add a grep-based pre-check for `#[A-Z]` in all link targets before the full tool sweep.

---

### Pitfall 16: Parallel Phase Merge Conflicts on Shared Write Hotspots

**What goes wrong:**
v1.5 is a three-pillar milestone. If Pillar 1 cleanup phases and Pillar 2 Linux phases run in parallel, both may touch `docs/index.md` (DEFER-07 adds Android; Linux foundation adds Linux), `docs/reference/00-index.md` (adds ops-depth reference entries), and `docs/_glossary.md` (shared Windows/macOS glossary). Parallel writes to these files without coordination produce merge conflicts or — worse — silent overwrites where one agent's changes are lost.

**Why it happens:**
The v1.4 Phase 42 D-03 append-only H2-block contract was established specifically because Phases 44/45/46 all needed to write to `android-capability-matrix.md`. The same risk exists in v1.5 at a larger scale: more shared files, more parallel pillars. Without explicit hotspot identification and ownership assignment, agents writing to `docs/index.md` simultaneously produce non-resolvable conflicts.

**How to avoid:**
At roadmap time, identify all shared write hotspots and assign each to a single phase or a sequencing rule:
- `docs/index.md`: DEFER-07 phase owns the Android expansion; Linux foundation phase owns the Linux section. These must be sequential, not parallel.
- Per-platform capability matrices: ops-depth phases appending new rows must use append-only H2-block contract and NOT be parallelized with the DEFER-08 4-platform comparison phase.
- `docs/reference/00-index.md`: only one phase at a time; coordinate via sequential phasing.

Apply the v1.4 pattern: waves with disjoint file sets, append-only contract on shared files, atomic integration phase at the end.

**Warning signs:**
- Roadmap schedules two phases in parallel that both list `docs/index.md` as an output file
- A phase plan says "add entries to `docs/reference/00-index.md`" without checking whether another parallel phase also edits that file

**Phase to address:**
Roadmap planning step (pre-execution). The roadmap must enumerate shared write hotspots and annotate which phases touch them.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Author Linux capability matrix in one phase without splitting by domain | Faster authoring | Ops-depth phases later add rows that shift existing sidecar pins | Never — use append-by-H2-domain contract from authoring time |
| Write DEFER-08 4-platform comparison with copied cell values | Self-contained doc, no link maintenance | Stale cells at first capability update; no automated staleness detection | Never — cells must link to per-platform matrices |
| Skip `last_verified` date on Linux docs | Less frontmatter boilerplate | Linux Intune agent updates ship frequently; stale docs will mislead admins about deb package vs snap, kernel minimums, and CA scope | Never |
| Use informational-first for ALL v1.5 harness checks from day one | Avoids false positives | Checks that should be blocking never are; regressions go undetected | Only acceptable for genuinely new check logic with unknown corpus baseline; must have documented promotion date |
| Author co-management guide for Windows only, note macOS/iOS/Android "not applicable" | Faster | Admins on co-managed deployments with hybrid macOS/iOS fleets get no guidance on Intune workload implications for those platforms | Acceptable only if explicit scope callout is in the guide's opening; contextual notes must still be present |
| Reuse Android DPC glossary entry for Linux agent description | Single entry | Misleads admins; Linux has no DPC concept | Never — separate glossary entries required |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| `docs/index.md` DEFER-07 edit | Insert Android H2 between iOS and Cross-Platform References, shifting anchors | Append Android H2 before Cross-Platform References using append-only contract; run pre-edit anchor inventory first |
| `_glossary-linux.md` creation | Define "agent" without cross-reference to iOS/Android "agent" definitions | Explicit see-also block: "Not to be confused with [iOS MDM agent](...) or [Android DPC](...)" |
| `v1.5-milestone-audit.mjs` Path A copy | Copy retains v1.4.1 informational-first flags unchanged | Explicit per-check review at copy time; document which checks graduate to blocking |
| Sidecar `v1.5-audit-allowlist.json` creation | Copy v1.4.1 sidecar with same pins | Verify pin coordinates against current file line numbers before copying; refresh BASELINE_9 in regenerate helper |
| 4-platform comparison doc linking | Link to per-platform matrix filename without anchor | Link to specific matrix section anchor (e.g., `macos-capability-matrix.md#conditional-access`); anchors are stable once locked |
| ops-depth append to existing Android docs | Insert new H2 within existing file body | Append-only: new ops-depth H2s go at the end of existing files; never insert above existing H2s |

---

## "Looks Done But Isn't" Checklist

- [ ] **Linux capability matrix:** Has explicit "Not supported" cells, not blank cells, for features outside Linux management surface (CA device-level, MSI/MSIX delivery, native CA, Hybrid Entra Join)
- [ ] **Linux compliance doc:** Has explicit web-app-CA architectural callout in opening section, not buried in a footnote
- [ ] **DEFER-07 Android nav:** `docs/index.md` Android H2 has same structural completeness as Windows, macOS, iOS sections (L1 table, L2 table, Admin Setup table) — not a stub with one bullet
- [ ] **DEFER-08 4-platform comparison:** Every non-empty cell contains a hyperlink to the source per-platform matrix
- [ ] **Co-management guide:** Endpoint Protection workload has a HIGH-RISK callout distinguishing it from other workloads
- [ ] **Patch management guide:** WUfB rings and Autopatch rings are unambiguously labeled with system qualifier in every occurrence
- [ ] **Win32 app lifecycle:** Supersedence behavior matrix exists (assignment type × supersedence action)
- [ ] **`v1.5-milestone-audit.mjs`:** Frozen-predecessor anchor comment updated to reference v1.4.1; sidecar filename updated to `v1.5-audit-allowlist.json`
- [ ] **`regenerate-supervision-pins.mjs`:** BASELINE_9 refreshed for Phase 44+ line coordinate shifts
- [ ] **All Linux docs:** `last_verified` and `review_by` frontmatter present (60-day cycle per Phase 34 D-14 rule)
- [ ] **Broken-link sweep:** Tool configured for redirect-following; Microsoft Learn redirect chains excluded from false-positive triage

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Linux capability parity framing incorrect | HIGH | Rewrite opening sections of all Linux admin guides with whitelist framing; update capability matrix; L1/L2 runbooks referencing non-existent features need removal or correction |
| CA bait — device-level CA described as available | HIGH | Targeted edit to compliance doc + capability matrix CA row + L1 runbook routing; risk of admin trust loss if deployed |
| Snap vs deb confusion | MEDIUM | Targeted edit to enrollment guide + L2 log collection paths; test against fresh Ubuntu VM |
| Distro version creep | MEDIUM | Add version matrix retrospectively; retrofit L2 runbooks with `uname -r` step |
| Glossary collision (DPC reuse) | LOW | Add see-also cross-references; no content deletion needed |
| Nav backport regression (broken anchors) | MEDIUM | Run anchor inventory, fix broken anchors one-by-one; test in GitHub preview and Confluence export if applicable |
| DEFER-08 cell duplication discovered post-authoring | HIGH | Rewrite all cells as link-delegating; add staleness markers to cells not yet refreshed; high risk of information loss if copied cells were already updated in one place |
| Sidecar pin coordinate drift | LOW-MEDIUM | Run `regenerate-supervision-pins.mjs --report` and update shifted coordinates; one-time refresh |
| Harness frozen-marker not updated | LOW | Comment-only edit to `v1.5-milestone-audit.mjs` |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Linux capability parity framing | Linux foundation phase (first Linux phase) | Phase validator checks that Linux admin docs reference the whitelist H2 |
| CA bait — device-level CA | Linux foundation + Linux admin setup phase | Capability matrix CA row has "Not supported" cell; L1 runbook routes to correct CA troubleshooting |
| Snap vs deb agent confusion | Linux foundation phase | `last_verified` on agent installation section linked to packages.microsoft.com |
| Distro version creep | Linux foundation phase | Linux version matrix file exists with 20.04/22.04/24.04 × GA/HWE breakdown |
| Glossary collision | Linux foundation phase (pre-authoring audit) | Phase validator checks `_glossary-linux.md` for terms present in other platform glossaries |
| Nav backport regression | Cleanup phase (DEFER-07), pre-edit step | Pre-edit anchor inventory verified; post-edit anchor scan via broken-link tool |
| DEFER-08 duplication | Cleanup phase (DEFER-08), at authoring | Audit harness structural check: non-empty cells contain hyperlinks |
| Co-management slider ambiguity | Ops-depth co-management phase | Workload table with three slider states and Endpoint Protection HIGH-RISK callout |
| WUfB vs Autopatch ring collision | Ops-depth patch management phase | "ring" in patch management docs always carries WUfB/Autopatch qualifier |
| Win32 supersedence exception | Ops-depth app lifecycle phase | Behavior matrix present; Required assignment exception has a callout |
| Harness FROZEN marker drift | Audit harness extension phase | v1.5 harness file-header diff reviewed; no v1.4.1 frozen anchor comment retained |
| Pin coordinate shift | Audit harness extension phase + per-phase pre-commit | `regenerate-supervision-pins.mjs --self-test` passes after BASELINE_9 refresh |
| Ops-domain false positives | Audit harness extension phase | New checks allow-listed against known-legitimate corpus occurrences |
| Broken-link false positives | Cleanup phase (broken-link sweep) | Tool configured for redirect-following; separate internal vs external link reports |
| Anchor case sensitivity | Cleanup phase (broken-link sweep) | Pre-sweep grep for `#[A-Z]` in link targets |
| Parallel merge conflicts | Roadmap planning | Hotspot inventory in roadmap; shared files serialized across phases |

---

## Carry-Forward Methodology Pitfalls (v1.0–v1.4.1 Lessons — Must Not Recur in v1.5)

### Verification Debt Accumulation (v1.2 Phase 21+24, v1.1 Phase 15)

**What goes wrong:** Phases ship without VERIFICATION.md. The milestone audit then discovers "unverified" requirements that were actually complete but lack evidence. Phase 33 (v1.3) and Phase 47 (v1.4.1) both paid a gap-closure tax for this.

**Prevention:** Every v1.5 phase plan must include a VERIFICATION.md as an explicit deliverable in its must_have list — not an optional artifact. The audit harness structural check must count phases with missing VERIFICATION.md files as a non-passing condition.

**Phase gate:** Plan-time requirement. Every phase plan section must list `VERIFICATION.md` as a must_have deliverable.

---

### TBD Scanning Debt (v1.2 retro — single stale TBD survived 3 phases)

**What goes wrong:** A `TBD` forward-reference written in one phase persists through multiple subsequent phases because no automated scan catches it. In v1.5 with 12–15 phases, the window for TBD accumulation is larger.

**Prevention:** Add `grep -r "TBD\|TODO\|PLACEHOLDER" docs/` to the post-execution checklist for every v1.5 phase. The per-phase validator scripts (`check-phase-NN.mjs`) should include a TBD scan on any file authored in that phase.

**Phase gate:** Per-phase validator script deliverable and post-execution checklist item.

---

### Traceability Staleness (v1.2 + v1.4.1 retro — REQUIREMENTS.md checkboxes unchecked throughout)

**What goes wrong:** REQUIREMENTS.md checkboxes remain `[ ]` throughout execution. The milestone close then requires a bulk-sync pass. In v1.4.1, AECOPE-01..04 + AEINTEG-03 were still unchecked at close despite work having shipped.

**Prevention:** The commit workflow for every v1.5 phase plan must include updating the REQUIREMENTS.md checkbox for the requirement that plan addresses. This is a commit-time action, not a deferred-to-close action. The gsd-transition workflow should prompt for it.

**Phase gate:** Commit-time workflow step. Not an optional close-out task.

---

### Worktree Shell Drift on Windows (v1.3 retro)

**What goes wrong:** Agent isolation via worktree causes the orchestrator shell's cwd to drift into the worktree path. Subsequent `git commit` commands on the main tree fail because the shell is in the worktree directory. Has to be corrected with explicit `cd /d/claude/Autopilot` before each main-tree operation.

**Prevention:** All agent instructions that run in worktrees must explicitly `cd /d/claude/Autopilot` before any main-tree git operation. Orchestrator must not assume cwd stability between agent calls.

**Phase gate:** Execution-time operational practice. Document in phase plans that invoke parallel worktree agents.

---

### Parallel Merge Conflicts on Shared Write Hotspots (v1.4 Phase 42 D-03)

**What goes wrong:** Two parallel phases write to the same file. Git merge conflict or silent overwrite.

**Prevention:** At roadmap time, enumerate all shared write hotspots and assign single-phase ownership. Apply append-only H2-block contract on files that require multi-phase writes. If two phases must both write to a shared file, sequence them explicitly (Phase N then Phase N+1, not parallel).

**Phase gate:** Roadmap planning. Hotspot table in roadmap with ownership assignments.

---

*Pitfalls research for: Intune provisioning documentation suite — v1.5 integration (Linux + ops-depth + cleanup + audit harness)*
*Researched: 2026-04-26*
