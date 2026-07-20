# Phase 130: Recipe #1 — Shared Windows AVD-Client Device - Context

**Gathered:** 2026-07-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 130 authors **`docs/recipes/01-shared-windows-avd-client.md`** — the first live instantiation of the Phase-129 recipe doc-class — plus the HYG-04 correction to an existing doc (RE-084). The recipe walks an Intune admin from zero to a verified, self-deploying, Entra-joined shared Windows device running the **Windows App** as an AVD client, covering both major configuration forks and the highest-cost pitfalls.

Delivers (AVD-01..05, HYG-04):
1. **Linear happy-path spine:** self-deploying profile (Entra-join only) → device-phase-only ESP → dynamic device group → Windows App (Microsoft Store app, Required, **device-context**) → AVD feed/workspace subscription → verification.
2. **The dominant fork, both branches fully worked** and non-converging: kiosk lockdown (Assigned Access) vs. Shared PC mode (SharedPC CSP), with the Shell-Launcher/Assigned-Access mutual-exclusion stated.
3. **Anti-feature callouts** for the four highest-cost mistakes: hybrid Entra join, APv2/Device Preparation, Wi-Fi at OOBE (reframed as anti-pattern, not "unsupported"), retired legacy MSRDC client.
4. **Session-hygiene/patch-cadence decision points** and a wired-vs-Wi-Fi post-enrollment fork that cross-links (never inlines) the existing v1.14 802.1X corpus.
5. **HYG-04:** RE-084's "Wi-Fi unsupported for self-deploying" claim independently re-verified against current Microsoft Learn and corrected (it is stale — see C-LOCK series).

**Out of scope** (hard constraints, per ROADMAP + REQUIREMENTS Out-of-Scope table): the AVD session host / host pool / FSLogix (Azure-side infra, assumed to exist — this recipe configures the *client endpoint* only); Intune management OF the session hosts; RemoteApp publishing; anything beyond device/Intune config. HYG-04 is the milestone's only edit to an existing doc — the frozen-surface/validator reconciliation is scoped once, here.

**Decision provenance:** All decisions below were resolved through **two full `/adversarial-review` rounds** (Finder/Adversary/Referee, 4 parallel Finders per round; 8 gray areas; 114 findings adjudicated — 112 confirmed, 2 disproved, 0 referee overturns). Every load-bearing external claim was independently verified against first-party Microsoft Learn 2–3× across rounds. Each round's verdicts were explicitly ratified by the user. **These are LOCKED — do not re-litigate.** Three round-1 locks carry first-party-grounded amendments (flagged AMENDS below).

</domain>

<decisions>
## Implementation Decisions

Decision IDs preserve the review's area lettering: **A** kiosk depth, **B** feed subscription, **C** HYG-04, **D** recipe shape (round 1); **E** anti-feature table, **F** SharedPC internals, **G** verification, **H** scope/prerequisites (round 2).

### A — Kiosk-path depth (AVD-02) — LOCKED: fully-worked via first-party GUI path
- **A-LOCK-1:** BOTH forks authored as complete step-by-step branches (ROADMAP SC2). Rejected: shallow-pointer kiosk (SC2 violation) and depth-gated authoring (the gate is already resolved — the kiosk mechanism is now first-party).
- **A-LOCK-2:** Kiosk branch authored via the **first-party Intune Kiosk-template GUI path** (portal prose, no XML): "Single app, full-screen kiosk" → Add Store app (Windows App AUMID) + Auto logon. Raw AssignedAccess CSP XML is at most an *optional advanced pointer* (keeps D-04 rule 2 / STD-04 body-text-only clean).
- **A-LOCK-3:** Single-app kiosk running the single Windows App **only**. No single-vs-multi-app sub-fork (out of scope; disproved in review).
- **A-LOCK-4:** Confidence flags are **surgical** — applied ONLY to residual repo-sourced items (exact Windows App AUMID string, Windows-App-specific auto-logoff/session-reset tuning, optional turnkey script → `Azure/WindowsAppKiosk`). Core steps are first-party HIGH-confidence — no blanket flags.
- **A-LOCK-5 (must-carry callouts):** (i) Shell-Launcher / Assigned-Access mutual exclusion, first-party cite; (ii) **MSIX machine-wide provisioning** for the autologon local account, tied explicitly to AVD-01's device-context Store deployment (else kiosk launches to a missing app); (iii) autologon-account Store-license evaluation as a **plan-time verification item** (offline-license caveat — non-Entra local account); (iv) "configure from console, not over RDP" one-liner disambiguation; (v) point to **`Azure/WindowsAppKiosk`**, never the legacy `Azure/AVDClientKiosk` (MSRDC-era, collides with AVD-03).
- **A-PLANNER-NOTE:** The AVD-02 premise "kiosk is MEDIUM-confidence, not first-party" is **stale** — first-party Learn now covers the whole kiosk mechanism (configure-single-app-kiosk, ref-kiosk-settings-windows, assignedaccess-csp, configuration-file mutual-exclusion). Correct this framing at plan time (D-15-style one-line fix).

### B — Feed-subscription design (AVD-01) — LOCKED: state the resolved fact, no decision block
- **B-LOCK-1:** **No device-context feed auto-subscription mechanism exists for Windows App.** The app deploys device-context (Store, Required, device group — first-party confirmed correct); the **feed subscribes automatically, per signed-in user, on sign-in** — the correct and desirable behavior on a shared device.
- **B-LOCK-2:** **NO decision-point block** for feed scope. A device-vs-user block would document a non-existent device node (the `RemoteDesktop/AutoSubscription` CSP has no device scope) — fabricated content, and an STD-05 format misuse (freezing a resolved fact as an admin preference).
- **B-LOCK-3 (AMENDED by E-LOCK-4):** `RemoteDesktop/AutoSubscription` CSP mentioned **once, inline** in the AVD-01 feed step as a legacy user-scope MSRDC policy (serving AVD-01's device-vs-user-scope plan-time flag). Distinct from the MSRDC-client retirement fact, which lives once in the anti-feature table (see E-LOCK-4).
- **B-LOCK-4 (AMENDED by G-LOCK-2):** Verification MUST include a per-user feed re-population check — its per-branch meaning is defined in G-LOCK-2.
- **B-PLANNER-NOTE:** AVD-01 prose (REQUIREMENTS.md L19) carries a latent factual error — "AVD feed/workspace subscription URL configured **device-context**." Device-context is correct for the *app*, not the *feed*. Flag to planner. **ROADMAP SC1 is already correct** (device-context there qualifies the Windows App deployment; feed listed unqualified) — do not "fix" SC1.
- **B-DATE-NOTE:** MSRDC (MSI) retirement **2026-03-27** (first-party: Windows-365/Windows-IT-Pro-Blog/MC1043461); Store "Remote Desktop" app EoS **May 27 2025** (not "Sept 2025"); classic `mstsc.exe` unaffected — don't over-claim in AVD-03.

### C — HYG-04 RE-084 Wi-Fi fix — LOCKED: stale fork is live, atomic correction
- **C-LOCK-1:** The claim is **verifiably STALE** (verified 3× independently vs. current Microsoft Learn). Wi-Fi IS supported for self-deploying: `autopilot/self-deploying#validation` — "If no Ethernet connection is available and Wi-Fi is built in, the user needs to connect to a wireless network." Ethernet = zero-touch; Wi-Fi = supported but requires manual region/language/keyboard + network join. The fix fork executes; the "record a no-op" option tree is dead.
- **C-LOCK-2:** Correct **all 6 sites in one commit** — `docs/admin-setup-apv1/08-self-deploying.md` L31, L55, L61, L63, L69, L108 (the roadmap's "3 sites" undercounted; L55/L69 would survive a minimal-touch fix and leave the Approved doc self-contradicting).
- **C-LOCK-3:** Replace BOTH the absolute claim ("NOT supported") AND the **fabricated causal mechanism** ("cannot reach the Autopilot service before OOBE" / "no network at pre-authentication stage" — no such stage exists). New framing: Ethernet recommended/zero-touch; Wi-Fi supported but not zero-touch. Softening-only is insufficient.
- **C-LOCK-4:** **Preserve** the legitimate Ethernet-recommended-for-zero-touch guidance (this shared/kiosk doc genuinely wants Ethernet). L108's failure-table row becomes a nuance/caveat row ("Wi-Fi at OOBE → breaks zero-touch; manual OOBE steps required") or folds into the prerequisite — not a hard "failure."
- **C-LOCK-5:** Bump `last_verified` → 2026-07-17 AND advance `review_by` (currently 2026-07-12, already overdue); append a dated **v1.18 Version-History row** (changelog table L128-132). No in-body dated verification note. *(Note vs 129 D-12: "do not bump last_verified" governs the STD-001 standard only; RE-084 is a live Guide and HYG-04 explicitly makes this a content correction that DOES update last_verified.)*
- **C-LOCK-6 (guardrails):** (i) Re-measure C17 #12 — rewritten L61/L63 callouts must keep each contiguous top-level `>`-run ≤200 chars (RE-084 is C17-enrolled; a violation retroactively fails v1.15/16/17 audits). (ii) **No new inline external URL in RE-084's body** — a new C13 match hits frozen allowlists; keep Learn citations in Phase-130 SUMMARY/VERIFICATION, body reuses existing internal cross-links only. (iii) No H1/`doc_id`/title change (filename-map.md:95 keys RE-084 → docx). (iv) **No sidecar re-pin needed** — grep confirmed no milestone-audit script or `*-audit-allowlist.json` pins this file by `{file,line}`.
- **C-LOCK-7:** Record verification evidence (URLs + quoted wording) in the Phase-130 SUMMARY/VERIFICATION artifact.

### D — Recipe shape / slug / link boundaries (AVD-01..05) — LOCKED
- **D-LOCK-1 (slug):** **`docs/recipes/01-shared-windows-avd-client.md`**; recipe #2 = `02-shared-ipad*.md`; frontmatter `platform: Windows` (D1-mapped, zero C17 #10 risk). Numbered NN-kebab mandated by **ROADMAP SC1** (not CLASS-03, which names only the directory). Rejected: unnumbered, fork-embedded (`01-kiosk-*`), `-device`-suffixed variants.
- **D-LOCK-2 (branch mapping):** Shared spine `### Step 1..N` under a single `## Steps` H2; STD-05 Case-1 decision block at the fork; non-converging `### Step 5a: Kiosk configuration` / `### Step 5b: Shared PC configuration`. Rejected: boolean if/then prose (two fully-worked procedures ≠ boolean; leaves decision-table Branch cells with no anchor targets).
- **D-LOCK-3 (heading style — resolves a latent 129-lock inconsistency):** Adopt the **template's `### Step 5a/5b`** heading style (the C17-green artifact, anchors `#step-5a-kiosk-configuration` / `#step-5b-shared-pc-configuration`) over 129-D-05's illustrative `### Branch A —`. Justification: 129-D-05 is RECOMMENDED, not normative; the D-04 3-rule floor is satisfied either way; the template example is the checked surface. Executor MUST pick this one style and sync the decision-table Branch-cell anchors to it (avoids the double-hyphen `#branch-a--kiosk` slug trap).
- **D-LOCK-4 (verification):** Two **labeled per-branch checklists inside the single `## Verification` H2** (kiosk and SharedPC need different gates; forks don't reconverge). No per-branch `## Verification` H2; no new H2s beyond the D-06 skeleton anywhere. (See G-LOCK series for full detail.)
- **D-LOCK-5 (link-not-copy by OWNERSHIP):** **LINK (never inline):** RE-084 full self-deploying field reference, the ESP policy doc, RE-080's ZTDId dynamic-group membership rule (owned as a fenced string — re-inlining reintroduces drift AND injects a code fence into a live recipe), RE-177, ALL 802.1X content, and the Wi-Fi-at-OOBE constraint (link the corrected RE-084, never restate). **INLINE (recipe-owned, no source doc exists):** the sequence itself, AVD-specific happy-path values (Windows App Store/Required/device-context; feed config), both branch procedures, session-reset/InactiveThreshold values, decision blocks. Per step: inline the minimal actionable toggle, link the exhaustive reference (PSSO L111 precedent). SharedPC CSP values render as a **table**, not a code fence.
- **D-LOCK-6 (AMENDED by F-LOCK-6):** AVD-04's three items are three STD-05 decision blocks at their natural steps, NOT a dedicated section (a single AVD-04 H2 breaks D-06 and falsely implies convergence): session-reset (Case-2) in the shared Windows App step; **InactiveThreshold inside Step 5b** — see F-LOCK-6 for its nested-conditional placement; update-ring / `MaintenanceStartTime` (Case-2) as a late shared block or per-branch.
- **D-LOCK-7 (AVD-05):** Boolean if/then prose pair (late post-enrollment step or callout before `## Verification`), cross-linking `docs/admin-setup-8021x/03-windows.md` + `00-overview.md`. **Never inline** any 802.1X config. Do not over-structure as a full Step Na/Nb branch (D-04 rule-3 prose suffices).
- **D-LOCK-8 (ONE Wi-Fi story, two explicitly-separated stages):** (1) **At OOBE** — Ethernet strongly recommended for true unattended self-deploying; Wi-Fi **SUPPORTED but an ANTI-PATTERN** for the zero-touch shared/kiosk use case (forces manual OOBE interaction). AVD-03's callout keeps SC3's mandated anti-feature call-out, reframed as anti-pattern, **NOT "unsupported."** (2) **Post-enrollment (AVD-05)** — Wi-Fi via 802.1X fully supported, linked. The recipe states these are different stages and LINKS the corrected RE-084. This single story must hold across the scope banner, the Prerequisites Ethernet row, and the anti-feature Wi-Fi row.

### E — Anti-feature & unsupported callouts (AVD-03) — LOCKED
- **E-LOCK-1:** The `## Unsupported and Anti-Feature Callouts` table (frozen header `| Feature | Why it's unsupported / what breaks | Do this instead |`) carries **exactly 4 rows**, ordered **hybrid Entra join → APv2/Device Preparation → MSRDC (retired client) → Wi-Fi at OOBE** (anti-pattern last). No AutoSubscription 5th row; no AVDClientKiosk row (that warning stays inline in Step 5a per A-LOCK-5v).
- **E-LOCK-2:** The Wi-Fi row's **Feature cell carries an inline qualifier** — e.g. "Wi-Fi at OOBE (supported — anti-pattern for zero-touch)" — never a bare "Wi-Fi" under the "unsupported" header (that would resurrect the exact stale claim the C-LOCK fix deletes in the same commit → cross-doc contradiction). This degrades cleanly to IPAD-02's all-unsupported table via cell qualifier, not a split table.
- **E-LOCK-3:** Wi-Fi stays a **table row**, never a moved-out standalone blockquote (table cells are C17 #12-immune; a faithful Wi-Fi statement as a top-level blockquote measures >200 chars and hard-fails #12). Each "Why" cell is **one scannable clause**; mechanism delegated by link, never restated (D-LOCK-5): hybrid→RE-084, APv2→RE-177, Wi-Fi→corrected RE-084 (D-LOCK-8 framing), MSRDC→internal anchor to the recipe's own AVD-01 Windows-App step.
- **E-LOCK-4 (AMENDS B-LOCK-3):** MSRDC-client retirement (2026-03-27) is stated **once**, in the AVD-03 table row (its mandatory home); AVD-01 feed prose does not repeat it. The `RemoteDesktop/AutoSubscription` CSP legacy note is stated **once, inline** in the AVD-01 feed step. *Basis:* two distinct objects (retired client app vs. feed CSP node) — B-LOCK-3 bundled them; per-fact "ONCE" is preserved by giving each a single separate home.
- **E-LOCK-5 (external-URL rule):** Internal owners are the **safe default, not a hard ban.** A **stable first-party** `learn.microsoft.com` external is permissible and needs no 16th allowlist entry (119 working externals already exist across 57 docs; the frozen `count==15` allowlist governs only broken/transient/placeholder links). Barred: any **flaky/transient/placeholder** external forcing a 16th `-audit-allowlist.json` entry. The MSRDC and Wi-Fi "Do this instead" targets route to **internal anchors**, satisfying the rule without invoking it.
- **E-LOCK-6:** The 802.1X pointer is owned by **AVD-05** (D-LOCK-7), not the Wi-Fi row. The Wi-Fi row's "Do this instead" links corrected RE-084 (+ optional internal anchor to the AVD-05 step).
- **E-PLANNER-NOTE:** Author-time consistency check — the Wi-Fi row ("supported/anti-pattern") and the Prerequisites Ethernet row must not read as contradictory; both flow from D-LOCK-8. This recipe is the **first live instantiation** of the anti-feature table — its class-signaling choice sets the de-facto precedent IPAD-02 (Phase 131) inherits.

### F — Step 5b Shared PC configuration internals (AVD-02 / AVD-04) — LOCKED
- **F-LOCK-1 (surface):** Step 5b is authored via the Intune **Templates > Shared multi-user device** GUI path (portal prose + GUI display names), mirroring the kiosk sibling's Templates posture (A-LOCK-2); raw CSP / OMA-URI is an **advanced pointer only**. Note inline that Microsoft's current docs lead with Settings Catalog (Templates ages faster) — accept Templates for symmetry, note the alternative. Values render as a table carrying BOTH the GUI choice AND the recorded CSP value (STD-05 Case-2 "Recorded as" column); use GUI wording "storage space," not "disk."
- **F-LOCK-2 (RestrictLocalStorage — polarity, first-party verified):** Assert **GUI "Local storage: Disabled" (= CSP `RestrictLocalStorage = true` = restrict)** with a one-line polarity/why-here note. Do NOT render as a raw boolean decision block, and NEVER as "RestrictLocalStorage = Enabled" (inverts the admin's action — Intune's allow-framed GUI maps to the restrict-framed CSP).
- **F-LOCK-3 (AccountModel):** Collapse "guest sign-in" and AccountModel into **ONE** decision surface (same setting — never a boolean+enumerable pair). Happy-path **asserts AccountModel = Domain-joined only (1)**. First-party value set: 0 (Only guest, **default**) / 1 (domain-joined only) / 2 (both). Carry the **guest-empty-feed anti-note**: default 0 = local guest account, no Entra token → empty AVD feed; never leave it defaulted.
- **F-LOCK-4 (EnableSharedPCMode):** Asserted as the branch premise (Step 5b's entry condition), not a decision block.
- **F-LOCK-5 (EnableAccountManager gate):** Explicit **boolean if/then gate** (Account management = Enabled), per D-04 rule 3 — the master toggle gating DeletionPolicy/InactiveThreshold, currently unnamed in AVD-02/04.
- **F-LOCK-6 (DeletionPolicy + InactiveThreshold; AMENDS D-LOCK-6):** DeletionPolicy is a **Case-2 enumerable** (3 values: Immediately after log-out / At storage space threshold [default] / At storage space threshold and inactive threshold) placed under the Account-management gate. InactiveThreshold is **NOT a peer block** — it is a **nested conditional under the DeletionPolicy = "…and inactive threshold" (2) arm**, rendered only when DeletionPolicy=2 AND Account management=Enabled, framed as Case-2 canned values OR Case-3 with the GUI **0–60-day bound stated** (pure free-value framing is invalid; the GUI is bounded). *Basis (first-party):* the GUI field does not exist unless DeletionPolicy=2 + Account management=Enabled. **Net Step 5b decision load: 1 gate + 1 enumerable + 1 nested conditional** (+ asserted values).
- **F-LOCK-7 (callouts):** (i) Account deletion clears the Windows App token cache → fresh Entra auth (possibly re-MFA) on the next session — real-UX callout, verify-hook owed (ties B-LOCK-1/B-LOCK-4). (ii) "Local storage why-here" one-liner (data lives in the remote session). (iii) OneDrive-sync variant note (`EnableSharedPCModeWithOneDriveSync`) **only if** the CSP/Settings-Catalog path is shown — moot on Templates single-toggle, pointless on an AVD thin client.
- **F-CROSS-NOTE:** With DeletionPolicy = Immediately-after-log-out, **every** sign-in is effectively a fresh Entra auth — the F-LOCK-7(i) re-auth callout and the G-LOCK-2 SharedPC feed check must cross-reference each other.

### G — Verification (single `## Verification` H2) — LOCKED
- **G-LOCK-1 (structure):** **Two branch checklists** inside the single `## Verification` H2, labeled by **bold pseudo-headings** (`**Kiosk branch:**` / `**Shared PC branch:**`) — never H3s. No 3-group structure. A short prose lead-in **"Both branches — confirm first:"** carries only genuinely-shared checks (avoids duplication / D-07 drift).
- **G-LOCK-2 (per-branch feed check; AMENDS B-LOCK-4):** B-LOCK-4's "second-distinct-user feed check" takes **per-branch meaning**:
  - **Shared PC branch:** a second **distinct Entra** Windows user signs in → feed **auto-re-populates** per-user (validates B-LOCK-1 auto-subscription).
  - **Kiosk branch:** after a session reset (`ResetAppOn*`), autologon relaunches the locked-down Windows App and the next end user authenticates the feed **interactively** (in-app Entra sign-in). The autologon-launch check IS the feed-reach check.
  - *Basis (first-party):* the kiosk autologon account is a **local** account with no Entra identity → session-identity auto-subscription cannot fire; a literal "second distinct user" has no referent on kiosk. But the Windows App supports **interactive** Entra sign-in independent of the Windows logon, so the check stays valid and the kiosk design does not collapse. Pasting SharedPC wording onto kiosk is factually wrong.
- **G-LOCK-3 (shared "confirm first" checks — IN):** OOBE-completed-unattended one-liner (own the end-state gate only, never ESP progress detail); Entra-joined-not-hybrid and Intune-enrolled as single-line gates (do not reproduce RE-084's own verification list); dynamic-group-membership gate **with an expected-latency caveat (minutes–hours)**; **Windows App present BEFORE any user signs in** (device-context class-defining; "appears after first sign-in" = user-context corruption).
- **G-LOCK-4 (format & OUT):** Declarative end-state `- [ ]` task-list per the RE-084 idiom; **no "You should see X"** phrasing (no precedent); kiosk behavioral-observational checks allowed as declarative statements. **OUT of Verification:** ESP progress detail, dynamic-group rule internals, hybrid/APv2/MSRDC/Wi-Fi mechanics. **NOT a checkbox:** DeletionPolicy/InactiveThreshold cleanup (deferred, unobservable at provisioning time → note or failures table). Keep checklists **bare** — no inline "if not, see X"; route failures via the table.
- **G-LOCK-5 (Configuration-Caused Failures table):** Recipe-**owned** rows only, each branch-specific symptom prefixed `(Kiosk) …` / `(Shared PC) …` in the Misconfiguration cell (single shared table has no Branch column). **No ESP-timeout row** (ESP is LINK-owned; duplicates RE-084 routing). Route each row to an **in-recipe step or linked reference**, never a fabricated runbook link.
- **G-PLANNER-NOTE (runbook gap):** No AVD/feed/kiosk/autologon/SharedPC runbook exists in `docs/l1-runbooks/` or `docs/l2-runbooks/` (verified). The recipe's characteristic failures (feed-empty, autologon-fails, app-not-deployed, session-reset misbehaves) have **no runbook target.** Planner MUST resolve the Configuration-Caused-Failures "Runbook" column to in-recipe steps or existing linked references — **do not fabricate runbook links** (mlc CI would flag broken links; generic-runbook mis-routing otherwise). Flag the AVD-runbook gap as a candidate future phase.

### H — Scope banner & prerequisites — LOCKED
- **H-LOCK-1 (banner — highest-value trap):** The generic template Scope banner (recipe-template.md L89-90, C17-green) MUST be **specialized** — it passes the harness but fails the Pitfall-#1 disambiguation (D-10 human-review-only enforcement). Ship this (measured **173 chars**, C17 #12 PASS): `> **Scope:** Provisions the physical shared Windows device that runs the AVD client, not the Azure session hosts. Assumes host pools, session hosts, and FSLogix already exist.` — carries both the client-vs-session-host disambiguation and the infra assumption in one run.
- **H-LOCK-2 (#12 guardrail):** The banner is an **isolated blockquote run with blank lines on both sides** (consecutive `>`-lines merge into one run and would tip past 200c). Re-measure at author time.
- **H-LOCK-3 (Prerequisites — plain bullets, no verify column):** RBAC (owned-inline) · licensing (owned-inline) · Autopilot-registered → **link** `docs/admin-setup-apv1/01-hardware-hash-upload.md` (never inline hash steps) · dynamic group → **link RE-080** · TPM 2.0 → **link RE-084** + one-liner · Ethernet-for-zero-touch → **link corrected RE-084** with D-LOCK-8 framing (never restate old "Wi-Fi not supported" — same-commit contradiction) · ESP device-phase policy → **link** the ESP doc · AVD infra exists (host pool/session hosts/FSLogix) → **plain assumption, no link** (802.1X precedent; zero internal targets) · users assigned to AVD app groups → plain assumption.
- **H-LOCK-4 (scoping traps):** Intune is scoped **strictly to the client device** — never "session hosts enrolled in Intune" (Intune *can* manage session hosts, but that is out of scope). Enrollment is **device-object-only / no-user-affinity** (self-deploying), stated without denying the per-user feed (defer feed to Steps/Verification). Prereqs/steps must not conflate the **Windows App on the client endpoint** with a **RemoteApp published on the host pool** (distinct objects).
- **H-LOCK-5 (SDM name-collision):** Banner and Prerequisites must **never invoke** Entra "Shared device mode" (SDM / Global Sign-Out) — iOS/Android-only; Windows uses SharedPC CSP (REQUIREMENTS Out-of-Scope table). The SDM callout, if any, belongs on the AVD-03 anti-feature surface. The first Prerequisites line MAY carry a one-sentence "what this recipe is NOT" absorbing the SDM/RemoteApp traps.
- **H-PLANNER-NOTE:** App-group assignment is dual-natured — the prereq row states the assumption; the empty-feed symptom lives in the failures table; the G-LOCK-2 "second Entra user" MUST be app-group-assigned or the SharedPC feed check false-negatives (flag in the verification step).

### Claude's Discretion
- Exact prose wording within every LOCKED constraint above (step text, callout phrasing, table cell wording, row order beyond what E-LOCK-1 fixes).
- The synthetic values chosen for asserted happy-path settings where the requirement doesn't pin one (e.g. the specific InactiveThreshold canned values within 0–60, the update-ring cadence).
- Whether the update-ring/`MaintenanceStartTime` block (D-LOCK-6) is a single late shared block or split per-branch — author's call based on whether kiosk and SharedPC cadences differ in the worked content.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Locked format & foundation (Phase 129 — the surfaces this recipe instantiates)
- `.planning/phases/129-device-recipe-doc-class-foundation/129-CONTEXT.md` — LOCKED D-01..D-15: STD-05 composite decision-block format (3 cases), 3-rule branch floor, D-06 fixed skeleton, D-13 Summary end-state, template anti-feature table shape. **This recipe's amendments (E-LOCK-4/F-LOCK-6/G-LOCK-2) refine round-1 locks, never the Phase-129 locks.**
- `docs/_templates/recipe-template.md` — the skeleton this recipe instantiates: fixed H2 order, `> **Scope:**` placeholder (L89-90 generic banner — MUST specialize per H-LOCK-1), `## Unsupported and Anti-Feature Callouts` table header, `### Step N:` pattern, per-step `> **What breaks if misconfigured:**` callouts, `## Verification` `- [ ]` idiom, `## Configuration-Caused Failures` table, TEMPLATE-SENTINEL convention.
- `docs/_standards/EEE-SOP-standard.md` — STD-05 spec (decision-block format), D-02 recipe→Guide ruling, C17 needle-spec.

### The gate (stay green; DO NOT EDIT)
- `scripts/validation/c17-eee-contract.mjs` — live C17. Load-bearing mechanics: #4 Summary-first-H2 + #5 ≥30-word Summary fire on templates; #11 prose-summary fires only on tables >25 rows (L361 — the 4-row anti-feature table is exempt); #12 caps each contiguous top-level `>`-run ≤200 chars (L390-408, markup counted, blank line splits runs); inCodeFence mask exempts fenced content. Subprocess-spawned by v1.15/16/17 milestone audits — any assertion edit retroactively mutates every predecessor audit (D-10). **DO NOT EDIT.**
- `scripts/validation/check-nav-hub-links.mjs` (L207: external `http(s)` returns null) + the milestone-audit `-audit-allowlist.json` frozen `count==15` assertion — the basis for E-LOCK-5 (stable first-party externals need no allowlist entry; flaky ones do and are barred).

### The doc HYG-04 edits (this milestone's only existing-doc edit)
- `docs/admin-setup-apv1/08-self-deploying.md` (RE-084) — the 6 Wi-Fi claim sites (L31/55/61/63/69/108), changelog table (L128-132), `review_by`/`last_verified` frontmatter. Also the AVD-01 link target for self-deploying-profile field reference, TPM, and network prerequisites. `filename-map.md:95` keys RE-084 → docx (no H1/doc_id change).

### Corpus exemplars & link targets (AVD-01's link-not-copy set + branch idiom)
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — RECOMMENDED branch idiom source (L111 link-not-copy rule; L397-408 requirements-summary table idiom; L65 non-reconvergence precedent).
- `docs/admin-setup-apv1/04-dynamic-groups.md` (RE-080) — owns the ZTDId dynamic-group membership rule as a fenced string (L46-47) — LINK, never inline.
- `docs/apv1-vs-apv2.md` (RE-177) — APv2/Device-Preparation "Do this instead" target for AVD-03.
- `docs/admin-setup-8021x/03-windows.md` + `docs/admin-setup-8021x/00-overview.md` — AVD-05 post-enrollment 802.1X cross-link targets (linked, never inlined); 00-overview is also the assumed-infra scope-idiom precedent.
- `docs/admin-setup-apv1/01-hardware-hash-upload.md` — Autopilot-registration prerequisite link target (H-LOCK-3).
- ESP policy doc — AVD-01 link target (device-phase-only ESP). *(Planner: resolve exact path from RE-index at plan time.)*

### Planning inputs
- `.planning/REQUIREMENTS.md` — AVD-01..05, HYG-04, Out-of-Scope table. **AVD-01 prose L19 carries a latent factual error** (B-PLANNER-NOTE: "feed subscription URL configured device-context" — device-context is the app, not the feed).
- `.planning/ROADMAP.md` — Phase 130 goal + SC1-SC5. **SC1 is correct** (do not "fix" per B-PLANNER-NOTE).
- `.planning/research/ARCHITECTURE.md` — grounded option space, Pitfalls #1 (client vs session host), #2 (RE-084 re-verify).

### First-party Microsoft Learn (verified during review — cite in SUMMARY/VERIFICATION, keep OUT of RE-084 body per C-LOCK-6)
- Self-deploying Wi-Fi support: `learn.microsoft.com/autopilot/self-deploying#validation`, `learn.microsoft.com/autopilot/pre-provision#requirements` (C-LOCK-1).
- Kiosk (first-party, A-LOCK-2): `configure-single-app-kiosk`, `intune/.../ref-kiosk-settings-windows`, `assignedaccess-csp`, `assigned-access/configuration-file` (mutual exclusion).
- Feed/CSP (B-LOCK): `policy-csp-remotedesktop#autosubscription` (user-scope only), `windows-app/get-started-connect-devices-desktops-apps`, `windows-365/enterprise/install-windows-365-app-intune`.
- SharedPC (F-LOCK): `sharedpc-csp`, `intune/.../ref-shared-device-settings-windows`, `windows/configuration/shared-pc/set-up-shared-or-guest-pc`, `wcd-sharedpc`.
- MSRDC retirement (B-DATE): `windows-365/end-user-access-cloud-pc`, Windows IT Pro Blog + MC1043461.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/recipe-template.md` — instantiated wholesale; its Scope-banner placeholder, anti-feature table header, `### Step N:`/what-breaks idiom, `## Verification` `- [ ]` list, and Configuration-Caused Failures table are the recipe's fixed spine.
- C17 self-test (`node scripts/validation/c17-eee-contract.mjs --self-test`) + full-corpus run (`--verbose`) — the green-gate for the new recipe AND for the RE-084 edit; must exit 0.
- The registry → filename-map → publish pipeline is data-driven; the new recipe integrates via registry rows only (Phase 132's concern) — this phase invents zero pipeline hooks.

### Established Patterns
- Templates are structurally C17-checked but value-exempt (TEMPLATE-SENTINEL) — the recipe is a *live* doc, so #4/#5/#9/#11/#12 all fire on real values; the anti-feature table is #11-exempt only because it is ≤25 rows.
- Frozen-surface doctrine: RE-084 is a predecessor-audit-touched surface but is NOT pinned by any `{file,line}` sidecar (grep-confirmed) — the HYG-04 edit needs no re-pin, only C17 #12 + C13 discipline (C-LOCK-6).
- Link-not-copy by ownership (D-LOCK-5) mirrors the PSSO walkthrough's established two-tier style (inline actionable value, link exhaustive reference).

### Integration Points
- `08-self-deploying.md` (RE-084) ↔ the recipe: the recipe LINKS RE-084 for self-deploying/TPM/network/Wi-Fi; HYG-04 corrects RE-084 in the same phase, so the recipe must not restate the corrected claim (single-source discipline).
- Phase 132 wires `docs/index.md` (navigation-last) and flips registry rows; this phase writes recipe content only — no nav, no registry edits.
- IPAD-02 (Phase 131) inherits the anti-feature-table class-signaling precedent this recipe sets (E-PLANNER-NOTE).

</code_context>

<specifics>
## Specific Ideas

- **Scope banner (verbatim, 173 chars, C17 #12 PASS):** `> **Scope:** Provisions the physical shared Windows device that runs the AVD client, not the Azure session hosts. Assumes host pools, session hosts, and FSLogix already exist.`
- **Wi-Fi anti-feature Feature-cell qualifier (illustrative):** "Wi-Fi at OOBE (supported — anti-pattern for zero-touch)".
- **Step 5b SharedPC decision load (target shape):** 1 boolean gate (Account management) + 1 Case-2 enumerable (DeletionPolicy, 3 values) + 1 nested conditional (InactiveThreshold under the DeletionPolicy=2 arm, 0–60-day bound); EnableSharedPCMode / AccountModel=Domain(1) / Local storage=Disabled(restrict) asserted with callouts.
- **Per-branch feed verification (the load-bearing kiosk vs SharedPC distinction):** SharedPC = second distinct Entra user → auto-re-populate; kiosk = post-reset autologon relaunch + interactive in-app Entra sign-in.

</specifics>

<deferred>
## Deferred Ideas

- **AVD/kiosk/feed/SharedPC L1/L2 runbook(s)** — none exist today (G-PLANNER-NOTE); the recipe routes failures to in-recipe steps/linked refs for now. A dedicated troubleshooting runbook is a candidate future phase, not Phase 130 (would be new scope + navigation-last violation).
- **`EnableSharedPCModeWithOneDriveSync` / Settings-Catalog SharedPC path** — documented only as an advanced-pointer note (F-LOCK-1/7iii); a full Settings-Catalog-based SharedPC walkthrough is out of scope (Templates surface chosen for kiosk-sibling symmetry).
- **Multi-app kiosk** — explicitly out of scope (A-LOCK-3); single-app Windows App kiosk only. A multi-app variant, if ever wanted, is a separate recipe.

### Reviewed Todos (not folded)
None — no pending todos matched Phase 130 (`todo.match-phase` returned 0).

</deferred>

---

*Phase: 130-Recipe #1 — Shared Windows AVD-Client Device*
*Context gathered: 2026-07-17*
