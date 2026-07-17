# Phase 130: Recipe #1 — Shared Windows AVD-Client Device - Research

**Researched:** 2026-07-17
**Domain:** Microsoft Intune device configuration (Windows Autopilot self-deploying, Assigned Access kiosk, SharedPC CSP, Windows App/AVD client) + internal EEE-SOP documentation standard (STD-05 decision blocks, C17 gate)
**Confidence:** HIGH (all portal paths, field names, and CSP values below are fetched verbatim from current `learn.microsoft.com` pages; the two GitHub-sourced items are explicitly flagged MEDIUM per A-LOCK-4)

<user_constraints>
## User Constraints (from CONTEXT.md)

All decisions below are **LOCKED** via two full `/adversarial-review` rounds (114 findings adjudicated, 0 referee overturns, user-ratified). **Do not re-litigate.** Copied verbatim from `130-CONTEXT.md`.

### Locked Decisions

**A — Kiosk-path depth (AVD-02):** BOTH forks fully worked. Kiosk authored via first-party Intune Kiosk-template GUI path ("Single app, full-screen kiosk" → Add Store app + Auto logon); raw AssignedAccess XML is at most an optional advanced pointer. Single-app kiosk running Windows App only — no multi-app sub-fork. Confidence flags surgical (only on: exact Windows App AUMID string, Windows-App-specific auto-logoff/session-reset tuning, `Azure/WindowsAppKiosk` turnkey script). Must-carry callouts: (i) Shell-Launcher/Assigned-Access mutual exclusion, first-party cite; (ii) MSIX machine-wide provisioning for the autologon local account, tied to AVD-01's device-context deployment; (iii) autologon Store-license offline-license caveat as a plan-time verification item; (iv) "configure from console, not RDP" one-liner; (v) point to `Azure/WindowsAppKiosk`, never the legacy `Azure/AVDClientKiosk`. The AVD-02 "kiosk is MEDIUM-confidence, not first-party" framing is stale — correct it; first-party Learn now covers the whole kiosk mechanism.

**B — Feed-subscription design (AVD-01):** No device-context feed auto-subscription mechanism exists. App deploys device-context (Store, Required, device group); feed auto-subscribes per signed-in user on sign-in — correct/desirable on a shared device. NO decision-point block for feed scope (would document a non-existent device node — fabricated content). `RemoteDesktop/AutoSubscription` CSP mentioned once, inline, in the AVD-01 feed step as a legacy user-scope MSRDC policy. MSRDC retirement fact lives once, in the anti-feature table (not repeated in AVD-01). Verification MUST include a per-user feed re-population check (per-branch meaning defined in G-LOCK-2). AVD-01 prose in REQUIREMENTS.md L19 carries a latent error ("feed... configured device-context" — device-context is correct for the app, not the feed); flag to planner but do NOT "fix" ROADMAP SC1 (already correctly qualifies device-context to the app). MSRDC (MSI) retirement **2026-03-27**; Store "Remote Desktop" app EoS **May 27 2025** (not Sept 2025); classic `mstsc.exe` unaffected.

**C — HYG-04 RE-084 Wi-Fi fix:** Claim is verifiably STALE (3x independently verified). Wi-Fi IS supported for self-deploying (`autopilot/self-deploying#validation`). Fix fork executes — correct all 6 sites (`docs/admin-setup-apv1/08-self-deploying.md` L31, L55, L61, L63, L69, L108) in one commit. Replace BOTH the absolute "NOT supported" claim AND the fabricated causal mechanism ("cannot reach the Autopilot service before OOBE" — no such stage exists). New framing: Ethernet recommended/zero-touch; Wi-Fi supported but not zero-touch. Preserve the legitimate Ethernet-recommended-for-zero-touch guidance. L108's failure-table row becomes a nuance/caveat row or folds into the prerequisite — not a hard "failure." Bump `last_verified` → 2026-07-17, advance `review_by` (was 2026-07-12, overdue); append v1.18 Version-History row; no in-body dated verification note. Guardrails: (i) re-measure C17 #12 on rewritten L61/L63 (≤200 chars, markup counted, blank line splits runs); (ii) no new inline external URL in RE-084's body (Learn citations stay in Phase-130 SUMMARY/VERIFICATION only); (iii) no H1/`doc_id`/title change; (iv) no sidecar re-pin needed (grep-confirmed no milestone-audit script pins this file by `{file,line}`). Record verification evidence (URLs + quoted wording) in the Phase-130 SUMMARY/VERIFICATION artifact.

**D — Recipe shape / slug / link boundaries (AVD-01..05):** Slug `docs/recipes/01-shared-windows-avd-client.md`; frontmatter `platform: Windows`. Shared spine `### Step 1..N` under one `## Steps` H2; STD-05 Case-1 decision block at the fork; non-converging `### Step 5a: Kiosk configuration` / `### Step 5b: Shared PC configuration` (adopt this heading style, not `### Branch A —`; sync decision-table Branch-cell anchors to `#step-5a-kiosk-configuration` / `#step-5b-shared-pc-configuration`). Two labeled per-branch checklists inside a single `## Verification` H2 — no per-branch H2s, no new H2s beyond the D-06 skeleton. Link-not-copy by ownership: LINK (never inline) RE-084 full self-deploying reference, ESP policy doc, RE-080's ZTDId rule (fenced string — never re-inline), RE-177, ALL 802.1X content, corrected RE-084's Wi-Fi constraint. INLINE (recipe-owned, no source doc exists): the sequence itself, AVD-specific happy-path values, both branch procedures, session-reset/InactiveThreshold values, decision blocks. SharedPC CSP values render as a table, not a code fence. AVD-04's three items are three STD-05 decision blocks at their natural steps (session-reset Case-2 in the shared Windows App step; InactiveThreshold inside Step 5b nested under DeletionPolicy=2; update-ring/MaintenanceStartTime Case-2 late-shared-or-per-branch, author's discretion). AVD-05 is boolean if/then prose (late step or callout before Verification), cross-linking `docs/admin-setup-8021x/03-windows.md` + `00-overview.md` — never inline 802.1X config, never a full Step Na/Nb branch. ONE Wi-Fi story, two stages: (1) at OOBE, Ethernet strongly recommended, Wi-Fi supported-but-anti-pattern (never "unsupported"); (2) post-enrollment (AVD-05), Wi-Fi via 802.1X fully supported, linked. Must hold consistently across scope banner, Prerequisites Ethernet row, and anti-feature Wi-Fi row.

**E — Anti-feature & unsupported callouts (AVD-03):** Table (frozen header `| Feature | Why it's unsupported / what breaks | Do this instead |`) carries exactly 4 rows, ordered hybrid Entra join → APv2/Device Preparation → MSRDC (retired client) → Wi-Fi at OOBE (anti-pattern last). No 5th AutoSubscription row; no AVDClientKiosk row (stays inline in Step 5a). Wi-Fi row's Feature cell carries an inline qualifier (e.g. "Wi-Fi at OOBE (supported — anti-pattern for zero-touch)") — never a bare "Wi-Fi" under the "unsupported" header. Wi-Fi stays a table row, never a moved-out blockquote (table cells are C17 #12-immune). Each "Why" cell is one scannable clause; mechanism delegated by link: hybrid→RE-084, APv2→RE-177, Wi-Fi→corrected RE-084, MSRDC→internal anchor to the recipe's own AVD-01 Windows-App step. MSRDC retirement date stated once, in this table row (its mandatory home); AVD-01 feed prose does not repeat it. `RemoteDesktop/AutoSubscription` CSP legacy note stated once, inline, in the AVD-01 feed step. Internal owners are the safe default, not a hard ban — a stable first-party `learn.microsoft.com` external needs no new allowlist entry; only flaky/transient/placeholder externals are barred. The 802.1X pointer is owned by AVD-05, not the Wi-Fi row (Wi-Fi row's "Do this instead" links corrected RE-084 + optional internal anchor to the AVD-05 step). This recipe is the first live instantiation of the anti-feature table — sets precedent for IPAD-02 (Phase 131).

**F — Step 5b Shared PC internals (AVD-02/AVD-04):** Authored via Intune **Templates > Shared multi-user device** GUI path (mirrors kiosk's Templates posture); raw CSP/OMA-URI is an advanced pointer only. Note inline that Microsoft's current docs lead with Settings Catalog (Templates ages faster) — accept Templates for symmetry, note the alternative. Values render as a table carrying BOTH the GUI choice AND the recorded CSP value; use GUI wording "storage space," not "disk." Assert GUI **"Local storage: Disabled" (= CSP `RestrictLocalStorage = true` = restrict)** with a one-line polarity/why-here note — never render as a raw boolean decision block, never "RestrictLocalStorage = Enabled." Collapse "guest sign-in" and AccountModel into ONE decision surface (the "Guest account" GUI field IS the AccountModel CSP). Happy-path asserts **AccountModel = Domain-joined only (1)**. Values: 0 (Only guest, default) / 1 (domain-joined only) / 2 (both) — carry the guest-empty-feed anti-note (default 0 = local guest, no Entra token → empty AVD feed; never leave defaulted). `EnableSharedPCMode` asserted as the branch premise, not a decision block. `EnableAccountManager` is an explicit boolean if/then gate ("Account management = Enabled"). `DeletionPolicy` is a Case-2 enumerable (3 values) placed under the Account-management gate. `InactiveThreshold` is NOT a peer block — nested conditional under DeletionPolicy="…and inactive threshold" (2) arm, rendered only when DeletionPolicy=2 AND Account management=Enabled, GUI 0–60-day bound stated. Net Step 5b decision load: 1 gate + 1 enumerable + 1 nested conditional + asserted values. Callouts: (i) account deletion clears the Windows App token cache → fresh Entra auth (possibly re-MFA) next session (cross-references G-LOCK-2's SharedPC feed check); (ii) local-storage why-here one-liner (data lives in the remote session); (iii) `EnableSharedPCModeWithOneDriveSync` noted only if the CSP/Settings-Catalog path is shown.

**G — Verification (single `## Verification` H2):** Two branch checklists labeled by bold pseudo-headings (`**Kiosk branch:**` / `**Shared PC branch:**`) — never H3s. Prose lead-in "Both branches — confirm first:" carries only genuinely-shared checks. Per-branch feed check: SharedPC branch = second distinct Entra Windows user signs in → feed auto-re-populates; Kiosk branch = after a session reset (`ResetAppOn*`), autologon relaunches Windows App and the next end user authenticates the feed interactively (in-app Entra sign-in) — the autologon-launch check IS the feed-reach check (kiosk autologon account is local, no Entra identity; "second distinct user" has no referent there). Shared "confirm first" checks: OOBE-completed-unattended one-liner; Entra-joined-not-hybrid + Intune-enrolled single-line gates; dynamic-group-membership gate with expected-latency caveat (minutes–hours); Windows App present BEFORE any user signs in. Declarative end-state `- [ ]` task-list per RE-084 idiom; no "You should see X" phrasing; OUT of Verification: ESP progress detail, dynamic-group rule internals, hybrid/APv2/MSRDC/Wi-Fi mechanics. DeletionPolicy/InactiveThreshold cleanup is NOT a checkbox (deferred, unobservable at provisioning time). Configuration-Caused Failures table: recipe-owned rows only, branch-specific symptoms prefixed `(Kiosk) …` / `(Shared PC) …` in the Misconfiguration cell (no Branch column). No ESP-timeout row (LINK-owned, duplicates RE-084 routing). No AVD/feed/kiosk/autologon/SharedPC runbook exists in `docs/l1-runbooks/` or `docs/l2-runbooks/` (verified via glob — 0 matches) — route each failure row to an in-recipe step or existing linked reference, never a fabricated runbook link. Flag the AVD-runbook gap as a candidate future phase.

**H — Scope banner & prerequisites:** Banner MUST be specialized (verbatim, 173 chars, C17 #12 PASS): `> **Scope:** Provisions the physical shared Windows device that runs the AVD client, not the Azure session hosts. Assumes host pools, session hosts, and FSLogix already exist.` — isolated blockquote run, blank lines both sides, re-measure at authoring time. Prerequisites as plain bullets, no verify column: RBAC (inline) · licensing (inline) · Autopilot-registered → link `docs/admin-setup-apv1/01-hardware-hash-upload.md` · dynamic group → link RE-080 · TPM 2.0 → link RE-084 + one-liner · Ethernet-for-zero-touch → link corrected RE-084 with the two-stage Wi-Fi framing (never restate the old claim) · ESP device-phase policy → link the ESP doc · AVD infra exists → plain assumption, no link · users assigned to AVD app groups → plain assumption. Intune is scoped strictly to the client device (never "session hosts enrolled in Intune"). Enrollment is device-object-only/no-user-affinity, stated without denying the per-user feed. Never conflate the Windows App client endpoint with a RemoteApp published on the host pool. Never invoke Entra "Shared device mode" (SDM/Global Sign-Out) — iOS/Android-only; if mentioned at all, belongs on the AVD-03 anti-feature surface, not Banner/Prerequisites. App-group assignment is dual-natured — G-LOCK-2's "second Entra user" must be app-group-assigned or the SharedPC feed check false-negatives (flag in the verification step).

### Claude's Discretion
- Exact prose wording within every LOCKED constraint above.
- Synthetic values for asserted happy-path settings where the requirement doesn't pin one (e.g. specific InactiveThreshold canned values within 0–60, update-ring cadence).
- Whether the update-ring/`MaintenanceStartTime` block is a single late shared block or split per-branch.

### Deferred Ideas (OUT OF SCOPE)
- AVD/kiosk/feed/SharedPC L1/L2 runbook(s) — none exist today; recipe routes failures to in-recipe steps/linked refs. Candidate future phase, not Phase 130.
- `EnableSharedPCModeWithOneDriveSync` / Settings-Catalog SharedPC path — advanced-pointer note only; full walkthrough out of scope.
- Multi-app kiosk — explicitly out of scope; single-app Windows App kiosk only.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AVD-01 | Linear happy-path: self-deploying profile → device-phase ESP → dynamic group → Windows App (Store/Required/device-context) → feed subscription → verification | Exact portal paths for deployment profile, ESP, dynamic group (already-shipped RE-084/RE-079/RE-080 link targets confirmed); exact Windows App Store-app add path + "installed before the user signs in" quote (`install-windows-365-app-intune`); feed auto-subscription mechanism confirmed (`get-started-connect-devices-desktops-apps`); `AutoSubscription` CSP scope confirmed User-only (`policy-csp-remotedesktop`) |
| AVD-02 | Kiosk (Assigned Access) vs Shared PC (SharedPC CSP) decision point, both branches fully worked, Shell-Launcher mutual exclusion stated | Exact Intune Kiosk-template GUI fields (`ref-kiosk-settings-windows`); exact Templates > Shared multi-user device GUI fields + CSP mapping (`ref-shared-device-settings-windows`, `sharedpc-csp`); verbatim mutual-exclusion quote (`assigned-access/configuration-file`); AUMID discovery commands (`store/find-aumid`); MEDIUM-confidence `Azure/WindowsAppKiosk` repo summary |
| AVD-03 | 4-row anti-feature table: hybrid Entra join, APv2/Device Preparation, MSRDC retired client, Wi-Fi at OOBE (anti-pattern) | MSRDC retirement dates verified first-party (`end-user-access-cloud-pc`); Wi-Fi framing sourced from the same C-LOCK-1 verification; hybrid/APv2 sourced from already-shipped RE-084/RE-177 |
| AVD-04 | Session-reset behaviors, `InactiveThreshold`, kiosk-tuned update ring/`MaintenanceStartTime` | `InactiveThreshold` nesting + 0-60-day GUI bound confirmed (`ref-shared-device-settings-windows`); `MaintenanceStartTime` field confirmed (`sharedpc-csp`, `ref-shared-device-settings-windows`); Windows App session-reset behaviors flagged MEDIUM (no first-party Learn page found — GitHub-only) |
| AVD-05 | Wired-vs-Wi-Fi post-enrollment cross-link to existing 802.1X corpus | Confirmed link targets exist and are current: `docs/admin-setup-8021x/03-windows.md` (RE-137), `00-overview.md` (RE-134) |
| HYG-04 | RE-084 Wi-Fi claim independently re-verified and corrected | Full verbatim first-party quotes fetched from `autopilot/self-deploying#validation` and `autopilot/pre-provision#requirements`; exact 6-site current text re-read from the live file; character-counted replacement candidates for the two blockquote sites (L61/L63) |
</phase_requirements>

## Summary

This phase authors one new file (`docs/recipes/01-shared-windows-avd-client.md`) instantiating the Phase-129 recipe template, plus a targeted correction to an existing file (`docs/admin-setup-apv1/08-self-deploying.md`, RE-084). All design decisions are locked; this research supplies the implementation-level facts the planner needs: exact Intune portal navigation paths, exact GUI field labels and their CSP-value mappings, exact first-party verbatim quotes for the HYG-04 fix, and character-counted candidate replacement text for the two blockquote sites that must stay under C17 assertion #12's 200-character cap.

The single most load-bearing verification this research performed is **C-LOCK-1**: fetching `learn.microsoft.com/autopilot/self-deploying#validation` directly confirms Wi-Fi is supported for self-deploying mode today — "If no Ethernet connection is available and Wi-Fi is built in, the user needs to connect to a wireless network" — and that the RE-084 claim ("Wi-Fi is NOT supported," "cannot reach the Autopilot service before OOBE") describes a mechanism that does not exist in current documentation. The second most load-bearing finding is the exact SharedPC GUI-to-CSP mapping (**F-LOCK series**): the Intune Templates > Shared multi-user device page's "Guest account" field literally IS the `AccountModel` CSP node (values Guest=0/Domain=1/Guest and domain=2), and "Local Storage: Disabled" maps to `RestrictLocalStorage = true` — both confirmed verbatim from `ref-shared-device-settings-windows`, closing two GUI/CSP-naming traps a planner working from CSP docs alone would likely invert.

**Primary recommendation:** Author the recipe as a single linear spine with one Case-1 branching decision point at Step 5, following the exact portal paths and field names cited below; make the HYG-04 fix a single commit touching only the 6 identified line-sites, replacing "unsupported" framing with "supported, not zero-touch" framing at every site, with no new external URLs added to RE-084's body.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Self-deploying enrollment (TPM attestation, Entra join) | Intune / Entra ID (cloud control plane) | Client device (executes OOBE flow) | Autopilot profile + ESP are cloud-defined policy; the device only executes them |
| Device-context app deployment (Windows App via Store) | Intune app-management pipeline | Client device (Store agent installs pre-sign-in) | Required assignment to a device group is a server-side (Intune) targeting decision; install execution is client-side but happens before any user context exists |
| AVD feed/workspace subscription | Client device, per signed-in user (Windows App client-side auto-discovery) | Azure Virtual Desktop control plane (issues the feed) | No admin-configurable CSP exists for device-scope feed subscription (`AutoSubscription` is User-scope only and legacy/MSRDC) — this is correctly a client-side, per-user behavior, not an Intune policy surface |
| Kiosk lockdown (Assigned Access) | Client device (AssignedAccess CSP enforced locally) | Intune (delivers the CSP payload via Kiosk template profile) | The restricted shell/AppLocker enforcement is local OS behavior; Intune's role is delivery only |
| Shared PC account lifecycle (guest creation/deletion) | Client device (SharedPC CSP-driven OS subsystem) | Intune (delivers the CSP payload via Templates profile) | Account creation/deletion/local-storage restriction is a local Windows subsystem behavior triggered by the CSP; Intune is the delivery mechanism, not the runtime enforcer |
| 802.1X wired/Wi-Fi network authentication | Client device (dot3svc / WLAN AutoConfig supplicant) + RADIUS/NPS (network tier, out of scope) | Intune (delivers Wi-Fi/Wired network profiles) | Out of scope for this recipe body — linked, not inlined, per D-LOCK-7; documented here only to confirm AVD-05's cross-link targets are correctly scoped to the client tier, matching the existing 802.1X corpus's own scope statement |
| Session hygiene (ResetAppOn*, InactiveThreshold cleanup) | Client device (Windows App client / OS account-manager subsystem) | Intune (delivers the triggering policy values) | Both are local runtime behaviors triggered by delivered policy; no server-side enforcement exists |

## Package Legitimacy Audit

**N/A — no external packages installed by this phase.** Phase 130 is a documentation-authoring phase: it writes one new Markdown file and edits one existing Markdown file. No `npm install`, `pip install`, or `cargo` dependency is introduced. The Package Legitimacy Gate protocol does not apply; this section is included only to record that the gate was considered and explicitly does not fire.

## Standard Surfaces (in place of "Standard Stack" — this is a docs phase, not a code phase)

### Authoring surfaces (already shipped, reused wholesale)
| Surface | Role | Why Standard |
|---------|------|--------------|
| `docs/_templates/recipe-template.md` | Skeleton this recipe instantiates | Phase-129 output; C17-green, TEMPLATE-SENTINEL'd, fixed H2 order (`## Summary` → `> **Scope:**` → `## Prerequisites` → `## Unsupported and Anti-Feature Callouts` → `## Steps` → `## Verification` → `## Configuration-Caused Failures` → `## See Also`) |
| `docs/_standards/EEE-SOP-standard.md` STD-05 section | Decision-block format spec (3-case composite) this recipe must follow at every admin decision point | Locked D-01..D-07; the fenced worked example there is the exact Case-1 branching shape to instantiate at Step 5 |
| `scripts/validation/c17-eee-contract.mjs` | Live gate; `--self-test` + full-corpus `--verbose` run must exit 0 after authoring both the new recipe and the RE-084 edit | DO NOT EDIT (D-10 / D-00a doctrine) |
| `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` | RECOMMENDED (not normative) branch idiom source — sibling H3 branch sections, bold pseudo-headings, non-reconvergence precedent at its line ~65 | D-05; already production-proven pattern |

### First-party Microsoft Learn surfaces this recipe's content is grounded against
See the Sources section below for the full fetched-URL list with verified retrieval dates; every portal-path and CSP-value claim in this document is sourced from a direct `microsoft_docs`/WebFetch retrieval performed during this research session, not from training-data recall.

**Version verification:** Not applicable in the npm/pip/cargo sense — the "versions" in scope here are Windows/Intune feature-availability gates, all confirmed current as of this research session (all Learn pages fetched carry `updated_at` timestamps in 2026, most 2026-06/07).

## Architecture Patterns

### Recipe document structure (the fixed spine this file must follow)

```
docs/recipes/01-shared-windows-avd-client.md
├── frontmatter (doc_id, status: Draft, owner, doc_type: Guide, platform: Windows,
│     last_verified: <authoring date>, review_by, applies_to)
├── EEE header block: **Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft
├── H1 (concrete end-state title)
├── ## Summary (opens: "Following this recipe yields a self-deploying Entra-joined
│     shared Windows AVD-client device, provisioned end-to-end from zero through Intune." + ≥30 words)
├── > **Scope:** [H-LOCK-1 verbatim 173-char banner — isolated blockquote run]
├── ## Prerequisites [H-LOCK-3 bullet list — RBAC/license inline, everything else linked]
├── ## Unsupported and Anti-Feature Callouts [4-row table — E-LOCK-1 order]
├── ## Steps
│   ├── ### Step 1: Create the self-deploying deployment profile
│   ├── ### Step 2: Configure device-phase-only ESP
│   ├── ### Step 3: Create/confirm the dynamic device group
│   ├── ### Step 4: Deploy Windows App (Store, Required, device group)
│   │     [+ AVD-04 session-reset Case-2 decision block lives here per D-LOCK-6]
│   ├── ### Step 5: [STD-05 Case-1 decision block — Kiosk vs Shared PC]
│   ├── ### Step 5a: Kiosk configuration [full worked branch]
│   ├── ### Step 5b: Shared PC configuration [full worked branch, incl. AVD-04's
│   │     InactiveThreshold nested conditional]
│   └── [late shared or per-branch: update-ring/MaintenanceStarttime block; AVD-05
│         wired-vs-Wi-Fi boolean if/then prose pair before Verification]
├── ## Verification [single H2, two bold-pseudo-heading branch checklists + shared lead-in]
├── ## Configuration-Caused Failures [branch-prefixed rows, in-recipe/linked routing only]
└── ## See Also
```

### Pattern 1 — AVD-01 Happy-Path Spine (Steps 1-4)

Each step below is INLINE the minimal actionable toggle; the exhaustive field reference is LINKED per D-LOCK-5.

**Step 1 — Self-deploying deployment profile.** Portal path (already shipped in RE-084, LINK only): `Intune admin center > Devices > Windows > Enrollment > Windows Autopilot > Deployment Profiles > [profile name]`. Confirm: Deployment mode = **Self-Deploying**; Join type = **Microsoft Entra joined** (hybrid unavailable). `[VERIFIED: learn.microsoft.com/autopilot/self-deploying]` — "Windows Autopilot self-deploying mode is only supported for Microsoft Entra join devices. Windows Autopilot self-deploying mode isn't supported for Microsoft Entra hybrid join devices."

**Step 2 — Device-phase-only ESP.** Portal path (already shipped in RE-079, LINK only): `Intune admin center > Devices > Enrollment (Device onboarding) > Windows > Windows Autopilot > Enrollment Status Page > Create`. Self-deploying inherently has no user phase (no user affinity — RE-084 Step 3 already states this); the recipe's Step 2 need only note "the device phase runs; there is no user phase to configure" and link RE-079 for the full field set, echoing RE-084's existing prerequisite bullet "ESP policy configured -- only the device phase runs."

**Step 3 — Dynamic device group.** Portal path (already shipped in RE-080, LINK only, plus the fenced ZTDId rule per D-LOCK-5): `Azure portal > Microsoft Entra ID > Groups > New group` → Membership type: **Dynamic Device** → rule `(device.devicePhysicalIDs -any (_ -startsWith "[ZTDid]"))`. Do not re-inline this fenced string — link RE-080.

**Step 4 — Windows App deployment (device-context).** Exact portal path `[VERIFIED: learn.microsoft.com/windows-365/enterprise/install-windows-365-app-intune]`:
1. `Intune admin center > Apps > All apps > Add`
2. **App type**: `Microsoft Store app (new)` → Select
3. Search Microsoft Store app (new) for **"Windows app"**, select it → Select
4. App information page: leave defaults or adjust → Next
5. Assignments: under **Required**, Add group → the dynamic device group from Step 3

Verbatim quote confirming device-context pre-sign-in install: *"On the Assignments page, add device and/or user groups containing the Cloud PCs on which you want Windows App to be automatically installed. If you target a user group, the users must first sign in to their Cloud PC before the app is installed. If you target a device group, the app is installed before the user signs in."* This directly satisfies AVD-01's device-context requirement and G-LOCK-3's "Windows App present BEFORE any user signs in" verification check.

**Feed subscription (no separate admin step — state the resolved fact per B-LOCK-2).** `[VERIFIED: learn.microsoft.com/windows-app/get-started-connect-devices-desktops-apps]`: *"If you're signed in to your local Windows device with a work or school account on a managed device, you're signed in automatically."* No feed URL configuration is required for standard Azure Virtual Desktop / commercial-cloud deployments; the feed auto-populates per signed-in Entra user once Windows App is present. The recipe states this as a fact, not a decision point (B-LOCK-2).

**`RemoteDesktop/AutoSubscription` CSP — inline legacy note (B-LOCK-3/E-LOCK-4).** `[VERIFIED: learn.microsoft.com/windows/client-management/mdm/policy-csp-remotedesktop]`: Scope is **User only** (`❌ Device ✅ User`), targets `./User/Vendor/MSFT/Policy/Config/RemoteDesktop/AutoSubscription`, description: *"This policy lets you enable automatic subscription for the Microsoft Remote Desktop client. If you define this policy, the client uses the specified URL to subscribe the signed-in user... To automatically subscribe to Azure Virtual Desktop in the Azure public cloud, set the URL to `https://rdweb.wvd.microsoft.com/api/arm/feeddiscovery`."* This resolves the AVD-01 discuss-phase flag definitively: there is no device-scope equivalent; this CSP targets the legacy MSRDC client specifically (Group Policy mapping references `TerminalServer.admx` / "Microsoft Remote Desktop client"), not Windows App, and is not needed for the recipe's happy path — mention it once, inline, purely as a legacy-context note per B-LOCK-3.

### Pattern 2 — AVD-02 Step 5 Decision Block (Case 1, STD-05 composite)

Instantiate the STD-05 fenced worked example verbatim (it is literally this recipe's own subject matter):

```markdown
> **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared desktop)?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Kiosk | Single-purpose fixed-app device | Users get full shell instead | [Step 5a](#step-5a-kiosk-configuration) |
| Shared PC | Multi-app shared desktop | Locked to one app unexpectedly | [Step 5b](#step-5b-shared-pc-configuration) |
```

Lead-in is 100 chars (well under the 200-char cap); blank line before the table is mandatory (D-02).

### Pattern 3 — Step 5a Kiosk Configuration (AVD-02)

Exact GUI path and field names `[VERIFIED: learn.microsoft.com/intune/device-configuration/templates/configure-kiosk + ref-kiosk-settings-windows]`:

1. `Intune admin center > Devices > Manage devices > Configuration > Create > New policy`
2. Platform: **Windows 10 and later**; Profile type: **Templates > Kiosk**
3. Configuration settings → **Select a kiosk mode**: **Single app, full-screen kiosk**
4. **User logon type**: **Auto logon (Windows 10 version 1803 and newer)** — *"Use on kiosks in public-facing environments that don't require the user to sign in, similar to a guest account. This setting uses the AssignedAccess CSP."*
5. **Application type**: **Add Store app** → **Select a store app** → choose the Windows App entry already added to Intune (from AVD-01 Step 4's device-context deployment — a prerequisite dependency the recipe must state explicitly, per A-LOCK-5(ii))
6. Scope tags (optional) → Assignments (target the dynamic device group) → Review + create

**AUMID discovery (surgical MEDIUM-confidence flag per A-LOCK-4 — only the exact string is unverified, the mechanism is HIGH-confidence first-party):** `[VERIFIED: learn.microsoft.com/windows/configuration/store/find-aumid]` — run `Get-StartApps` in PowerShell on a reference device with Windows App installed to retrieve its exact AUMID (e.g., filter output for "Windows App"/"Remote Desktop"). Do not hardcode a guessed AUMID string into the recipe; instruct the admin to discover it on their own reference device, since Store-app package identifiers can carry publisher-specific suffixes that shift across releases.

**Shell-Launcher / Assigned-Access mutual exclusion (A-LOCK-5(i), must-carry callout).** `[VERIFIED: learn.microsoft.com/windows/configuration/assigned-access/configuration-file]` — verbatim: *"You can't set both `KioskModeApp` and `ShellLauncher` at the same time on the device."* Also: *"A configuration file can contain only one `KioskModeApp` profile, but it can contain multiple `AllAppList` profiles."* This is the exact first-party cite to place at Step 5a's mutual-exclusion callout.

**MSIX machine-wide provisioning + offline-license caveat (A-LOCK-5(ii)/(iii)).** The Auto logon account is a **local** account with no Entra credentials; Windows App must therefore be provisioned machine-wide (not user-scoped) so it is present for that local account at first logon. `[CITED: learn.microsoft.com/powershell/module/dism/add-appxprovisionedpackage]` — `Add-AppxProvisionedPackage` (or the equivalent Intune device-context Required deployment from AVD-01 Step 4, which already satisfies this since Required + device group = machine-wide provisioning, confirmed by the "installed before the user signs in" quote above) stages the package for every account, including the autologon local account. Offline-license caveat, directly analogous first-party precedent `[VERIFIED: learn.microsoft.com/intune/device-configuration/templates/ref-kiosk-settings-windows]`: *"Windows Kiosks with Autologon enabled using Microsoft Kiosk Browser must use an offline license from the Microsoft Store for Business. This requirement is because Autologon uses a local user account with no Microsoft Entra credentials. So, online licenses can't be evaluated."* The recipe must state this as a plan-time/pre-deployment verification item for Windows App specifically (Store licensing for Windows App under an autologon local account needs the same offline-license treatment) — flag this as `[ASSUMED]` since no first-party page states this specifically for Windows App (only for Kiosk Browser); the underlying licensing mechanism is identical (Store online-license evaluation requires an Entra-authenticated context) so the inference is HIGH-confidence mechanically but the specific Windows-App sentence is not first-party-quoted.

**"Configure from console, not RDP" (A-LOCK-5(iv)).** One-liner disambiguation: Assigned Access / kiosk configuration and initial AUMID discovery should be performed at the physical device console (or via a non-RDP remote-management channel), not over an active Remote Desktop session — kiosk lockdown that engages mid-session can lock out the very session used to configure it. `[ASSUMED]` — general Windows kiosk community guidance, no single first-party sentence located; low-risk operational caveat, flag for author confirmation.

**Turnkey script pointer (A-LOCK-5(v), MEDIUM confidence per A-LOCK-4).** `[ASSUMED — GitHub, non-authoritative source]`: `Azure/WindowsAppKiosk` (https://github.com/Azure/WindowsAppKiosk) — "Code to configure Windows 10 and 11 Thin Clients as a locked down Windows 365 or AVD Client using the Windows App," primary script `Set-WindowsAppKioskSettings.ps1`. Repo confirms OS/edition split: Shell Launcher supports Education/Enterprise/Enterprise LTSC/IoT Enterprise/IoT Enterprise LTSC; Multi-App Kiosk (Assigned Access) additionally supports Pro/Pro Education. Point to this repo only as an *optional* advanced/turnkey pointer, never as the primary path (A-LOCK-2 mandates the first-party GUI path as primary) — and explicitly never point to the legacy `Azure/AVDClientKiosk` repo (MSRDC-era, collides with AVD-03's retired-client anti-feature row).

### Pattern 4 — Step 5b Shared PC Configuration (AVD-02/AVD-04)

Exact GUI path `[VERIFIED: learn.microsoft.com/intune/device-configuration/templates/ref-shared-device-settings-windows]`: `Intune admin center > Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Shared multi-user device`. (Note inline per F-LOCK-1: Microsoft's current documentation increasingly leads with the Settings Catalog surface for these nodes — Templates is used here for symmetry with the kiosk sibling's own Templates posture; the Settings Catalog remains a valid advanced alternative.)

**Recorded-as table (STD-05 Case-2 style, GUI choice + CSP value per row):**

| GUI Setting | GUI Value (asserted) | CSP Node | Recorded As |
|---|---|---|---|
| Shared PC mode | Enable | `EnableSharedPCMode` | `true` (branch premise — F-LOCK-4, not a decision block) |
| Guest account | **Domain** | `AccountModel` | `1` (domain-joined only) |
| Account management | Enabled | `EnableAccountManager` | `true` (F-LOCK-5 boolean gate) |
| Account Deletion | *[admin picks one of 3 — see enumerable below]* | `DeletionPolicy` | `0` / `1` / `2` |
| Inactive account threshold | *[nested — see below]* | `InactiveThreshold` | `0`–`60` (days) |
| Local Storage | **Disabled** | `RestrictLocalStorage` | `true` (F-LOCK-2 — GUI "Disabled" = CSP `true` = restricted) |

**F-LOCK-3 — "Guest account" IS the AccountModel decision (do not split into two decisions).** `[VERIFIED]` verbatim GUI options and their CSP mapping, cross-confirmed against `sharedpc-csp`:

| GUI "Guest account" option | `AccountModel` value | Meaning |
|---|---|---|
| Guest | 0 (Default) | Only local guest accounts allowed — **anti-note: default; a guest account has no Entra token, so the AVD feed is empty. Never leave this defaulted for the AVD recipe.** |
| Domain | 1 | Only Microsoft Entra domain accounts allowed — **the happy-path assertion for this recipe** |
| Guest and domain | 2 | Both allowed |

**F-LOCK-5 — Account management gate.** GUI options: **Not configured** (default) / **Enabled** (*"Accounts created by guests, and accounts in on-premises Active Directory and Microsoft Entra ID are automatically deleted from the devices. When a user signs off the device, or when system maintenance runs, these accounts are removed."*) / **Disabled** (*"accounts... stay on the device, and aren't deleted"*). The recipe asserts **Enabled** and frames it as the explicit if/then gate per D-04 rule 3.

**F-LOCK-6 — DeletionPolicy (Case-2 enumerable, nested under the gate) + InactiveThreshold (nested conditional).** Verbatim GUI-level "Account Deletion" options, shown only when Account management = Enabled:

| Option | `DeletionPolicy` value | Notes |
|---|---|---|
| Immediately after log-out | 0 | Every sign-in is a fresh Entra auth (F-CROSS-NOTE — cross-reference the token-cache re-auth callout and G-LOCK-2's SharedPC feed check) |
| At storage space threshold | 1 (Default per CSP) | Uses `DiskLevelCaching`/`DiskLevelDeletion` (50%/25% CSP defaults) |
| At storage space threshold and inactive threshold | 2 | **Only this arm exposes the Inactive account threshold field** |

`InactiveThreshold` GUI field ("Inactive account threshold"): *"Enter the number of consecutive days before deleting the account that hasn't signed in, from 0-60 days"* `[VERIFIED]` — this is the GUI-imposed bound; the raw CSP allows `[0-4294967295]` `[VERIFIED: sharedpc-csp]` but the Intune Templates UI clamps it to 0-60. State the GUI bound (0-60), not the raw CSP range, since the recipe is GUI-authored per F-LOCK-1. This field renders **only** when DeletionPolicy = "At storage space threshold and inactive threshold" (2) AND Account management = Enabled — the nested-conditional structure F-LOCK-6 mandates.

**F-LOCK-2 — RestrictLocalStorage polarity (verified, do not invert).** GUI "Local Storage" options: **Not configured** (default) / **Enabled** (*"Allows users to see and save files locally using File Explorer"*) / **Disabled** (*"Prevents users from saving and viewing files on the device's hard drive"*) `[VERIFIED]`. The recipe asserts GUI **"Local Storage: Disabled"** = CSP `RestrictLocalStorage = true` (restrict) — confirmed by cross-referencing `sharedpc-csp`'s node description ("Restricts the user from using local storage... false (Default)"). GUI-allow-framed, CSP-restrict-framed: the inversion trap F-LOCK-2 warns about is real and now first-party-confirmed both directions.

**AVD-04 — `MaintenanceStartTime` (update-ring / patch cadence).** `[VERIFIED: ref-shared-device-settings-windows]` GUI field "Maintenance start time (in minutes from midnight)": range 0-1440, default 0 (midnight); example given inline in the doc: *"if you want maintenance to begin at 2 AM, enter `120`."* Cross-confirmed against `sharedpc-csp` (`MaintenanceStartTime`, range `[0-1440]`, default 0). Render as a Case-2 enumerable or Case-3 free-value block (author's discretion per D-LOCK-6/Claude's Discretion) — single late shared block is simpler since the field and its semantics are branch-agnostic (both kiosk autologon-restart windows and SharedPC maintenance windows use the same underlying Windows maintenance-scheduler concept, though kiosk's variant is `ApplicationManagement/ScheduleForceRestartForUpdateFailures`, a *different* CSP node — see next paragraph).

**Kiosk-side maintenance window is a DIFFERENT CSP than SharedPC's.** `[VERIFIED: ref-kiosk-settings-windows]`: the kiosk template's own "Specify Maintenance Window for App Restarts" section uses `ApplicationManagement/ScheduleForceRestartForUpdateFailures` CSP (Maintenance Window Start Time + Recurrence, default Daily) — this is a **separate node** from SharedPC's `MaintenanceStartTime`. If the recipe places the update-ring/maintenance block as a single shared late block (author's discretion), it must state clearly that the underlying CSP differs per branch even though the admin-facing concept (a maintenance window) is the same — do not imply a single shared CSP value applies to both branches.

### Pattern 5 — Verification (AVD-01/02/04, G-LOCK series)

```markdown
## Verification

Both branches — confirm first:

- [ ] OOBE completed unattended (no manual credential entry during device deployment)
- [ ] Device is Entra joined (not hybrid) and enrolled in Intune
- [ ] Device appears as a member of the dynamic device group (expected latency: minutes to hours)
- [ ] Windows App appears installed BEFORE any user has signed in to the device

**Kiosk branch:**

- [ ] Device boots directly into Windows App in full-screen kiosk mode via the autologon local account
- [ ] After a session reset ([ResetAppOn* trigger]), Windows App relaunches automatically and the next end user
      can authenticate the feed interactively inside the app

**Shared PC branch:**

- [ ] A second, distinct, app-group-assigned Entra user signs in and the AVD feed auto-re-populates for that user
- [ ] Local Storage is confirmed restricted (File Explorer save/view to local disk is blocked)
```

This directly instantiates G-LOCK-1 through G-LOCK-4. The "second distinct Entra user" check (G-LOCK-2/H-PLANNER-NOTE) requires that user to already be assigned to the AVD app group — flag this as a pre-check note inside the Shared PC branch item, not a separate checkbox (keeps checklists bare per G-LOCK-4).

### Pattern 6 — Configuration-Caused Failures (G-LOCK-5)

No AVD/kiosk/feed/SharedPC-specific runbook exists in `docs/l1-runbooks/` or `docs/l2-runbooks/` — confirmed via glob (`docs/l1-runbooks/*avd*` and `docs/l2-runbooks/*avd*` both return zero matches). Route every row's "Runbook" column to either an in-recipe step anchor (e.g., `#step-4-deploy-windows-app`) or an existing linked reference (RE-084/RE-080/RE-079/RE-137). Do not fabricate a runbook link — the mlc link-checker will flag it, and G-PLANNER-NOTE explicitly forbids this. Example rows:

| Misconfiguration | Symptom | Runbook |
|---|---|---|
| (Both) Windows App assigned Available instead of Required, device group | App absent at first sign-in; feed never appears | [Step 4](#step-4-deploy-windows-app-device-context) |
| (Kiosk) Autologon account has no offline Store license | Windows App fails to launch after autologon; blank/error screen | [Step 5a](#step-5a-kiosk-configuration) |
| (Shared PC) `AccountModel` left at default (Guest) | AVD feed is empty for every signed-in user — no Entra token | [Step 5b](#step-5b-shared-pc-configuration) |
| (Shared PC) `InactiveThreshold` field not visible in Intune | `DeletionPolicy` not set to "storage space and inactive threshold," or Account management left Disabled | [Step 5b](#step-5b-shared-pc-configuration) |

### Anti-Patterns to Avoid
- **Treating `RemoteDesktop/AutoSubscription` as a viable device-scope feed mechanism** — it is User-scope only and targets the legacy MSRDC client, not Windows App; do not build a decision point around it (B-LOCK-2).
- **Rendering SharedPC CSP values as a code fence** — D-LOCK-5 mandates a table; a code fence is invisible to the Copilot/SharePoint retrieval body text (STD-04/STD-001 Grounding Notes).
- **Inverting the `RestrictLocalStorage` polarity** — GUI "Disabled" is the restrictive choice; do not write "Local Storage = Enabled" when the intent is to restrict.
- **Presenting `InactiveThreshold` as a top-level peer decision to `DeletionPolicy`** — it is nested and only exists in the UI under one specific `DeletionPolicy` arm.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Feed subscription targeting | A custom device-scope feed CSP workaround, a "provisioning script" to force-populate the feed | Nothing — state the resolved fact (auto-subscribes per signed-in user) | No such device-scope mechanism exists (`policy-csp-remotedesktop` confirms User-only scope); building a workaround would be inventing unsupported behavior |
| Kiosk lockdown mechanism | A custom AppLocker/registry-based lockdown script | Intune Kiosk template (AssignedAccess CSP) | First-party, fully GUI-driven, already covers Store-app single-app kiosk with autologon — no gap to fill |
| Shared-account lifecycle management | A custom profile-cleanup scheduled task | SharedPC CSP (Templates > Shared multi-user device) | Purpose-built OS subsystem for exactly this; account creation/deletion, disk-threshold cleanup, and inactivity cleanup are all native |
| A new C17 validator assertion for decision-block correctness | A #14 mechanical decision-block validator | Nothing (D-10 — deferred, human-review-only) | Would retroactively mutate every predecessor milestone audit via the shared C17 script; explicitly rejected for v1.18 |
| An AVD troubleshooting runbook | A new l1/l2 runbook invented mid-phase | In-recipe step anchors / existing RE-084/RE-080/RE-079/RE-137 links | Scope creep — flagged as a candidate future phase (G-PLANNER-NOTE), not this phase's job |

**Key insight:** Every "gap" this recipe might be tempted to fill with custom tooling (feed targeting, kiosk lockdown, account lifecycle) already has a first-party Intune/Windows mechanism — the actual work here is documentation precision (exact field names, exact CSP mappings, exact portal paths), not engineering.

## Common Pitfalls

### Pitfall 1: Confusing the AVD client endpoint with the AVD session host
**What goes wrong:** A planner or author drifts into describing host-pool, session-host, or FSLogix configuration.
**Why it happens:** "AVD" colloquially refers to the whole Azure Virtual Desktop service, not just the client.
**How to avoid:** The H-LOCK-1 scope banner exists precisely to prevent this — keep it verbatim, and treat any content that would require Azure-portal (not Intune-portal) navigation as out of scope.
**Warning signs:** Any step referencing "host pool," "session host," "FSLogix," or an Azure portal (not Intune admin center) navigation path.

### Pitfall 2: RE-084's stale Wi-Fi claim propagating into the new recipe
**What goes wrong:** Copying RE-084's Prerequisites language verbatim into the new recipe before HYG-04 lands, re-introducing the stale claim in two places at once.
**Why it happens:** RE-084 is the natural link target and its exact wording looks authoritative.
**How to avoid:** Author HYG-04 first (or in the same commit sequence) and have the new recipe LINK to the corrected RE-084, never restate the (old or new) Wi-Fi claim inline (D-LOCK-8).
**Warning signs:** The word "supported" or "unsupported" appearing next to "Wi-Fi" anywhere in the new recipe body outside the anti-feature table's qualified cell.

### Pitfall 3: C17 assertion #12 blockquote-run miscounting
**What goes wrong:** Two adjacent blockquote paragraphs without a blank line between them silently merge into one contiguous run, pushing the combined character count over 200 and failing C17.
**Why it happens:** GFM lazy continuation treats consecutive `>`-prefixed lines (even across paragraph breaks without a blank line) as one blockquote.
**How to avoid:** Every distinct blockquote callout (decision lead-ins, what-breaks callouts, the HYG-04 L61/L63 replacement pair) needs a blank line on both sides if it must stay under its own 200-char budget; re-measure with `.length` after drafting, don't estimate by eye.
**Warning signs:** Any blockquote block spanning more than ~2 sentences without an intervening blank line.

### Pitfall 4: GUI field name vs CSP node name drift
**What goes wrong:** Authoring the SharedPC table using CSP node names as if they were GUI labels (e.g., writing "AccountModel: Domain" instead of "Guest account: Domain"), confusing an admin who only sees the GUI.
**Why it happens:** `sharedpc-csp` documents nodes, not GUI labels; `ref-shared-device-settings-windows` documents GUI labels mapped to nodes — they must be cross-referenced, not used interchangeably.
**How to avoid:** Every Step 5b table row lists GUI label first, CSP node/value as the "Recorded as" column (per D-LOCK-5/F-LOCK-1) — never the reverse.
**Warning signs:** A field name in Step 5b prose that doesn't match any label quoted in the "F-LOCK" tables above.

### Pitfall 5: Assuming Windows App session-reset behaviors are Windows Learn-documented
**What goes wrong:** Treating `ResetAppOnCloseOnly`/`ResetAppAfterConnection`/`ResetAppOnIdle` as confirmed first-party CSP/Settings-Catalog node names without verification.
**Why it happens:** These names appear in REQUIREMENTS.md AVD-04 and read like plausible Settings Catalog field names, but this research could not locate a first-party `learn.microsoft.com` page documenting Windows-App-specific session-reset policy nodes (searches surfaced only community/GitHub sources).
**How to avoid:** Flag this as `[ASSUMED]` in the recipe's session-reset decision block; if the executor cannot independently verify the exact field names via a live Intune tenant's Settings Catalog search at authoring time, present the concept (session resets on close/after-connection/on-idle) without asserting unverified exact policy-node strings, or explicitly mark the block "verify against your tenant's Settings Catalog before deploying."
**Warning signs:** Any of the three `ResetAppOn*` strings presented as `[VERIFIED]` without a corresponding fetched Learn URL.

## Code Examples

### Decision-block instantiation (Step 5, Case 1)
```markdown
> **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared desktop)?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Kiosk | Single-purpose fixed-app device | Users get full shell instead | [Step 5a](#step-5a-kiosk-configuration) |
| Shared PC | Multi-app shared desktop | Locked to one app unexpectedly | [Step 5b](#step-5b-shared-pc-configuration) |
```
Source: `docs/_standards/EEE-SOP-standard.md` STD-05 D-07 worked example (already-Approved, index-excluded fenced spec sample) — this recipe is the first live, unfenced instantiation of exactly this shape.

### AUMID discovery (PowerShell, run on a reference device with Windows App installed)
```powershell
Get-StartApps
```
Source: `learn.microsoft.com/windows/configuration/store/find-aumid`. Filter/search the output for the Windows App entry; use the returned AUMID verbatim in the Kiosk template's "Add Store app" step.

### dot3svc / SharedPC prerequisite verification pattern (existing corpus idiom, reusable model for AVD-05's cross-link)
The Windows 802.1X guide's `sc query dot3svc` / `Get-Service dot3svc` detection pattern (`docs/admin-setup-8021x/03-windows.md`) is the existing corpus idiom for "detect via PowerShell before enabling enforcement" — AVD-05's cross-link should point here rather than reproduce it, since the recipe never inlines 802.1X content (D-LOCK-7).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| Microsoft Remote Desktop (MSRDC, MSI installer) as the AVD/W365 client | Windows App | MSRDC (MSI) end of support **2026-03-27**; Store "Remote Desktop" app already EoS **2025-05-27** | Any recipe referencing "Remote Desktop client" or `Azure/AVDClientKiosk` is now describing a retired product — AVD-03's anti-feature row exists specifically to prevent this drift |
| RE-084's "Wi-Fi is NOT supported for self-deploying" (dated framing, cause unknown but pre-dates the current `autopilot/self-deploying` page's `2026-06-22` last-update) | Wi-Fi is supported but not zero-touch (manual language/locale/keyboard + network join required) | Reflected in the live `autopilot/self-deploying#validation` page as of this research session (2026-07-17) | HYG-04's entire purpose; RE-084 must be corrected in the same commit that authors this recipe's Ethernet-recommended Prerequisites row, or the two docs will contradict each other post-publish |
| Windows 10 multi-app kiosk via Intune template | Windows 11 multi-app kiosk via `lock-down-windows-11-to-specific-apps` (separate, non-Intune-Templates mechanism) | Windows 10 reached end of support **2025-10-14**; still an "allowed" (not blocked) Intune version per the fetched kiosk docs | Not directly relevant to this recipe (single-app kiosk only, per A-LOCK-3) but confirms the kiosk-template docs fetched here are current and account for the OS-support transition |

**Deprecated/outdated:**
- `Azure/AVDClientKiosk` (GitHub) — MSRDC-era turnkey kiosk script; superseded by `Azure/WindowsAppKiosk`. Never point to the former (A-LOCK-5(v)).
- Store "Remote Desktop" app — no longer available for download/install as of 2025-05-27; do not instruct admins to install it.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|----------------|
| A1 | `Azure/WindowsAppKiosk` is the correct, current, non-retired turnkey kiosk script (vs. `Azure/AVDClientKiosk`) | Pattern 3 (Kiosk), A-LOCK-5(v) | Low — this is explicitly framed as an *optional* advanced pointer, never the primary path; if the repo has since been renamed/archived, only a pointer link breaks, not the core recipe content |
| A2 | Windows App under an autologon local account requires an offline Store license, by direct analogy to the first-party Kiosk Browser autologon-licensing statement | Pattern 3 (Kiosk), A-LOCK-5(iii) | Medium — if Windows App's licensing model differs from Kiosk Browser's (e.g., if it ships as a provisioned system app not requiring per-account Store license evaluation), this plan-time verification flag would be a false-positive caveat; low downstream cost since it's framed as "verify before deploying," not an asserted fact |
| A3 | "Configure from console, not RDP" is a valid operational caveat for kiosk/Assigned-Access configuration | Pattern 3 (Kiosk), A-LOCK-5(iv) | Low — general Windows administration best practice, no specific mechanism claimed; worst case the callout is unnecessary, not wrong |
| A4 | `ResetAppOnCloseOnly` / `ResetAppAfterConnection` / `ResetAppOnIdle` are real, currently-named Windows App / Settings Catalog policy nodes | AVD-04 (session-reset), Pitfall 5 | Medium-High — these three exact strings originate from REQUIREMENTS.md, not from a first-party page fetched in this session; if incorrect or renamed, the recipe's AVD-04 session-reset decision block would cite nonexistent field names. **Flagged for plan-time/author-time verification against a live Intune tenant's Settings Catalog search** before finalizing exact field names |
| A5 | The Windows App AUMID string itself (whatever it resolves to for a given Store SKU) is stable enough to hardcode | Pattern 3 (Kiosk), A-LOCK-4 | Low — mitigated by design: the recipe instructs discovery via `Get-StartApps` on a reference device rather than hardcoding a specific AUMID string |

## Open Questions (RESOLVED)

1. **Exact Windows App AUMID string**
   - What we know: The discovery mechanism (`Get-StartApps`) is first-party and HIGH-confidence.
   - What's unclear: The literal AUMID string, which may vary by Store distribution channel/region and could change across app updates.
   - Recommendation: Do not hardcode a specific AUMID in the recipe body; instruct discovery via the PowerShell command on a reference device, consistent with A-LOCK-4's surgical confidence-flag scope.
   - RESOLVED: AUMID discovered via `Get-StartApps` on a reference device, NOT hardcoded (carried into Plan 130-02 Task 2 / A-LOCK-4).

2. **Windows App session-reset policy node names (AVD-04)**
   - What we know: The concept (reset the app on close / after connection / on idle) is a plausible and commonly-requested Windows App admin control; a Settings Catalog category likely exists for it.
   - What's unclear: No first-party `learn.microsoft.com` page was located during this research session documenting the exact policy-node names `ResetAppOnCloseOnly`/`ResetAppAfterConnection`/`ResetAppOnIdle`.
   - Recommendation: Flag as `[ASSUMED]` per Assumption A4; the executor should perform a live Settings Catalog search (`Intune admin center > Devices > Configuration > New policy > Settings catalog`, search "Windows App" or "reset") at authoring time to confirm exact field names before finalizing this AVD-04 decision block, or present the concept generically with a "verify against your tenant" caveat if it cannot be confirmed.
   - RESOLVED: session-reset node names carried as `[ASSUMED]` author-time-verify flags (Plan 130-02 Task 1 Step 4 + Task 2; live Settings Catalog confirmation at authoring).

3. **Recipe `doc_id` assignment timing**
   - What we know: `docs/_registry/RE-index.md` currently tops out at RE-221; CLASS-03 (Phase 132) is the phase that formally adds registry rows and flips status to Approved.
   - What's unclear: Whether Phase 130 should pre-assign a real `RE-222` in the recipe's frontmatter now (matching the pattern of other recently-authored Guide docs, which appear to receive their `RE-NNN` at creation time) or leave the template's `RE-[FILL-IN]` placeholder until Phase 132.
   - Recommendation: Assign `RE-222` now in the frontmatter (status: Draft) — consistent with how every other corpus doc in this repository carries its real Doc ID from creation, with the registry *row* (not the ID itself) added later at Phase 132. This is a low-risk planning note, not a locked decision — flag for planner confirmation.
   - RESOLVED: recipe `doc_id` = RE-222 assigned at authoring in Plan 130-02 frontmatter (status Draft); registry ROW + status→Approved deferred to Phase 132 CLASS-03.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js (for C17 validator) | `scripts/validation/c17-eee-contract.mjs --self-test` / full-corpus run | ✓ | v24.17.0 | — |
| Git | Commit workflow | ✓ | 2.51.0.windows.2 | — |
| `microsoft_docs_search`/`fetch` MCP tools | First-party Learn verification | Partial — search-style WebSearch/WebFetch worked reliably; the dedicated MCP fetch tool name did not resolve in this session | — | WebFetch + WebSearch (used throughout this research; produced full verbatim page content successfully) |
| Live Intune tenant access | Confirming exact Settings Catalog field names for Windows App session-reset (Open Question 2) | ✗ (not available to this research agent) | — | Executor must perform this verification during authoring/execution using their own tenant access, or ship the AVD-04 block with an explicit "verify against your tenant" caveat |

**Missing dependencies with no fallback:** None — the one missing dependency (live Intune tenant for Settings Catalog field-name confirmation) has a documented fallback (author-time verification or explicit caveat).

**Missing dependencies with fallback:** Live Intune tenant access (see above).

## Security Domain

**N/A — `security_enforcement` default (enabled) does not produce an applicable ASVS mapping for this phase.** Phase 130 is a documentation-content phase (Markdown authoring + one existing-file correction); it does not introduce application code, an authentication surface, session management, input validation, or cryptography into this repository's own codebase. The subject matter it *documents* (Intune device configuration, Entra join, Assigned Access lockdown, SharedPC account lifecycle) is Microsoft's platform-security surface, not this project's own attack surface — ASVS categories (V2 Authentication, V3 Session Management, etc.) apply to software this team builds and runs, not to documentation describing a third-party product's admin console. No threat-pattern table is applicable for the same reason.

## Sources

### Primary (HIGH confidence — first-party Microsoft Learn, fetched verbatim this session)
- `learn.microsoft.com/autopilot/self-deploying` (updated_at 2026-06-22) — C-LOCK-1 validation quote, TPM/Entra-join requirements
- `learn.microsoft.com/autopilot/pre-provision` (updated_at 2026-06-22) — network-connectivity requirements corroborating quote
- `learn.microsoft.com/intune/device-configuration/templates/configure-kiosk` (updated_at 2026-07-01) — Kiosk profile creation portal path
- `learn.microsoft.com/intune/device-configuration/templates/ref-kiosk-settings-windows` (updated_at 2026-07-01) — exact Single-app kiosk GUI fields, Auto logon, offline-license Kiosk Browser precedent, maintenance-window CSP
- `learn.microsoft.com/windows/configuration/assigned-access/configuration-file` (updated_at 2025-09-26) — verbatim `KioskModeApp`/`ShellLauncher` mutual-exclusion quote
- `learn.microsoft.com/windows/configuration/store/find-aumid` — `Get-StartApps` AUMID discovery command
- `learn.microsoft.com/intune/device-configuration/templates/ref-shared-device-settings-windows` (updated_at 2026-07-01) — exact Shared multi-user device GUI fields, CSP mapping, Inactive-account-threshold 0-60-day GUI bound
- `learn.microsoft.com/windows/client-management/mdm/sharedpc-csp` — full SharedPC CSP node/value reference
- `learn.microsoft.com/windows-365/enterprise/install-windows-365-app-intune` — exact Windows App Store-app device-context deployment steps + "installed before the user signs in" quote
- `learn.microsoft.com/windows-app/get-started-connect-devices-desktops-apps` — feed auto-subscription-per-signed-in-user confirmation
- `learn.microsoft.com/windows/client-management/mdm/policy-csp-remotedesktop` — `AutoSubscription` User-only scope confirmation, legacy MSRDC-client targeting
- `learn.microsoft.com/windows-365/end-user-access-cloud-pc` (updated_at 2026-05-07) — verbatim MSRDC MSI retirement (2026-03-27) and Store Remote Desktop app EoS (2025-05-27) dates

### Secondary (MEDIUM confidence — WebSearch cross-verified against an official/community source)
- `github.com/Azure/WindowsAppKiosk` — repo purpose, `Set-WindowsAppKioskSettings.ps1`, OS/edition support split (A-LOCK-4 surgical MEDIUM flag)
- `techcommunity.microsoft.com` Windows IT Pro Blog (via WebSearch) — corroborates mstsc.exe being unaffected by MSRDC retirement (not independently fetched verbatim in this session, but consistent across multiple search results and Microsoft's own retirement FAQ framing)
- `learn.microsoft.com/powershell/module/dism/add-appxprovisionedpackage` (via WebSearch summary, not directly fetched) — MSIX machine-wide provisioning mechanism, general (not Windows-App-specific)

### Tertiary (LOW confidence — flagged for validation, see Assumptions Log)
- Windows App session-reset policy node names (`ResetAppOnCloseOnly`/`ResetAppAfterConnection`/`ResetAppOnIdle`) — sourced only from REQUIREMENTS.md, no first-party page located this session (Open Question 2 / Assumption A4)
- Windows App-specific offline-license requirement under autologon — inferred by analogy to Kiosk Browser's documented requirement, not independently first-party-confirmed for Windows App specifically (Assumption A2)

## HYG-04 Fix Plan (RE-084 Wi-Fi Claim Correction)

### Current state (verified by direct file read, 2026-07-17)

`docs/admin-setup-apv1/08-self-deploying.md` — `last_verified: 2026-04-13`, `review_by: 2026-07-12` (already overdue). Six sites carry the stale claim:

| Line | Current text | Context |
|---|---|---|
| L31 | `- **Wired ethernet** mandatory -- network connection is required before any user input; Wi-Fi is NOT supported` | Prerequisites bullet |
| L55 | `- **Wired ethernet** connection available at the deployment location` | Step 2 bullet |
| L61 | `> **What breaks if misconfigured:** Using Wi-Fi instead of wired ethernet means the device cannot reach the Autopilot service before OOBE.` | Step 2 blockquote (own C17 #12 run) |
| L63 | `> No network connectivity is available at the pre-authentication stage. See: [Network Connectivity](../l1-runbooks/04-network-connectivity.md)` | Step 2 blockquote (own C17 #12 run) |
| L69 | `1. Device powers on, connected to wired ethernet.` | Step 3 numbered flow list |
| L108 | `| Wi-Fi used instead of wired ethernet \| No network at pre-authentication stage \| [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |` | Configuration-Caused Failures table row |

### First-party ground truth (C-LOCK-1, fetched verbatim)

`[VERIFIED: learn.microsoft.com/autopilot/self-deploying]`:
> "Windows Autopilot self-deploying mode allows deployment of a device with little to no user interaction. For devices with an Ethernet connection, no user interaction is required. For devices connected via Wi-Fi, the user must only: Select the language, locale, and keyboard. Make a network connection."

> "Boot the device, connecting it to Wi-Fi if necessary, then wait for the provisioning process to complete." (Step-by-step section)

> "If connected via Ethernet, no network prompt is expected. If no Ethernet connection is available and Wi-Fi is built in, the user needs to connect to a wireless network." (Validation section)

`[VERIFIED: learn.microsoft.com/autopilot/pre-provision]`:
> "Network connectivity. Using wireless connectivity requires selecting region, language and keyboard before being able to connect and start provisioning."

**No first-party sentence anywhere in either fetched page describes an inability to "reach the Autopilot service before OOBE" or a "pre-authentication stage" with no network connectivity.** This confirms C-LOCK-3's finding that RE-084's causal mechanism is fabricated, not merely outdated.

### Proposed corrected wording (character-counted where C17 #12 applies; plain list/table text is unconstrained)

**L31** (plain bullet, no char constraint):
> `- **Wired ethernet** strongly recommended for a fully unattended, zero-touch deployment; Wi-Fi is supported but requires the user to manually select language, locale, and keyboard, then join the wireless network -- see Step 2`

**L55** (plain bullet, no char constraint):
> `- **Wired ethernet** connection available at the deployment location (recommended for zero-touch); if unavailable, built-in Wi-Fi is supported but requires manual language/locale/keyboard selection and network join at OOBE`

**L61** (blockquote, own C17 #12 run — measured 161 chars, under the 200-char cap; re-measure at authoring time per H-LOCK-2 discipline). Reframe away from "What breaks if misconfigured" since Wi-Fi is no longer a misconfiguration:
> `> **Wi-Fi at OOBE:** Supported, but not zero-touch -- the user must manually pick language, locale, keyboard, and join the network before provisioning continues.`

**L63** (blockquote, own C17 #12 run — measured 106 chars). Replace the fabricated "pre-authentication stage" claim and the runbook cross-link (which pointed at a genuine failure runbook — no longer the correct target since this is not a failure) with an internal-only pointer, satisfying C-LOCK-6(ii)'s no-new-external-URL rule:
> `> Ethernet remains recommended for unattended deployment. See Step 2 above for the full prerequisite list.`

**L69** (plain numbered list item, no char constraint):
> `1. Device powers on, connected to wired ethernet (or Wi-Fi, with manual language/locale/keyboard selection and network join -- see Prerequisites).`

**L108** — **recommend removal**, not reframing-in-place. C-LOCK-4 offers "becomes a nuance/caveat row... or folds into the prerequisite." A row that says "not really a failure" inside a table titled `## Configuration-Caused Failures` (whose contract, per every other row in this exact table and the shipped template, is `Misconfiguration | Symptom | Runbook` describing genuine breakage) is self-contradictory with the table's own semantics. Recommend removing this row entirely — the caveat is already fully carried by the corrected L31/L55/L61/L63. If the executor prefers to keep a row for discoverability, the fold-into-Prerequisites option (already satisfied by the L31/L55 rewrites above) is the cleaner of C-LOCK-4's two sanctioned options; do not invent a "nuance/caveat" 4th table column, since none exists in this table's frozen header and D-06/template discipline does not license adding one to an already-Approved doc mid-fix.

### Frontmatter and changelog updates (C-LOCK-5)

```yaml
last_verified: 2026-07-17
review_by: 2026-10-15
```
(90-day cadence from `last_verified`, computed and verified: 2026-07-17 + 90 days = 2026-10-15.)

New `## Version History` row (append, matching the existing table's `| Date | Change | Author |` shape):
> `| 2026-07-17 | v1.18 HYG-04: corrected Wi-Fi-at-OOBE claim at 6 sites (L31/55/61/63/69/108) -- Wi-Fi is supported but not zero-touch per current Microsoft Learn; removed fabricated pre-authentication-stage mechanism; Ethernet-recommended-for-zero-touch guidance preserved; Configuration-Caused Failures Wi-Fi row removed (no longer a failure) | — |`

### C17 guardrail checklist for this edit (C-LOCK-6)
- [ ] Re-measure L61 and L63 replacement text (`.length` including the leading `> `) — both currently measure well under 200 chars (161 and 106 respectively) with comfortable margin for further copyedits
- [ ] Confirm no new external URL added to the body (the L63 replacement removes the existing `../l1-runbooks/04-network-connectivity.md` link rather than adding one — net URL count decreases, not increases)
- [ ] Confirm H1 (`# Self-Deploying Mode Configuration`), `doc_id` (`RE-084`), and title are unchanged
- [ ] Confirm no `-audit-allowlist.json` or milestone-audit sidecar pins this file by `{file,line}` (already grep-confirmed absent per CONTEXT.md C-LOCK-6(iv) — re-verify at commit time as a final gate, not re-researched here since the grep result is stable/deterministic)
- [ ] Run `node scripts/validation/c17-eee-contract.mjs --self-test` and the full-corpus `--verbose` run after the edit; must exit 0

## Metadata

**Confidence breakdown:**
- Standard surfaces / portal paths / CSP mappings: HIGH — every claim in Patterns 1-6 is sourced from a directly-fetched, verbatim `learn.microsoft.com` page retrieved during this research session (not training-data recall)
- HYG-04 fix plan: HIGH for the factual correction (C-LOCK-1 quotes are verbatim first-party); MEDIUM for the exact character counts of the proposed replacement text (computed via script this session, but the final rendered text will shift slightly during actual authoring — re-measure is explicitly flagged)
- Kiosk turnkey script / session-reset field names / offline-license-for-Windows-App specifics: MEDIUM-LOW, explicitly flagged per A-LOCK-4's surgical scope and this document's Assumptions Log — these are the only areas where training-adjacent inference (not direct first-party quotation) was used

**Research date:** 2026-07-17
**Valid until:** ~30 days (2026-08-16) — this domain (Intune GUI field names, CSP defaults, retirement dates) is moderately fast-moving; the MSRDC 2026-03-27 retirement date in particular should be re-confirmed if this research is reused after that date passes, since post-retirement Learn pages may restructure or remove the current MSRDC-comparison content.
