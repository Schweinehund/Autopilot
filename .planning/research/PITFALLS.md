# Pitfalls Research

**Domain:** Intune/Autopilot documentation corpus — adding kiosk-class L2 runbooks, reference rows, AVD host-pool SSO procedures, a licensing decision record, and a vendored third-party script, to a repo that already ships RE-237 and a strict structural harness (v1.23 Walk-Up AVD Kiosk Class Follow-Through)
**Researched:** 2026-09-10
**Confidence:** MEDIUM-HIGH (harness/process pitfalls are [MEASURED] against this repository; technical pitfalls rest on fetched Microsoft Learn pages, with two claims from PROJECT.md explicitly downgraded to [UNVERIFIED] below because no first-party citation was found in this pass)

## Critical Pitfalls

### Pitfall 1: New authorship has no "before" state for the meaning-preservation judge pass

**What goes wrong:**
Every pillar this milestone (A–F) is brand-new prose, not a rewrite of existing text. The corpus's entire style-verification apparatus — `google-style-verify`, `verify-meaning.py`, the fresh-agent modal-loss judge pass that caught 26 STRENGTHENED / 19 INVERTED hunks in v1.22 — is a **diff instrument**: it compares a pre-pass hunk to a post-pass hunk and asks whether meaning survived. A freshly-authored L2 runbook, reference row, or SSO section has no pre-pass version to diff against, so the mechanism that has caught every semantic defect in this corpus for two milestones running structurally cannot fire here.

**Why it happens:**
The tooling was built to answer "did formatting change meaning," not "does this new sentence overstate what the evidence supports." Google style's own bias toward direct, imperative phrasing (`must`, unhedged declaratives) is exactly the failure mode STRENGTHENED hunks exhibited in v1.22 — except here it would be authored directly into first-draft text with no verified baseline to catch it, and no `_JUDGE-VERDICTS.json`-style artifact would ever be produced because there is no hunk pair to judge.

**How to avoid:**
Treat every new `[PILOT]`-eligible sentence as if it had already been through one STRENGTHENED-hunk failure: write the hedged form first (`observed`, `in this tenant`, `on the pilot device`) and require a second pass — human or a repurposed judge prompt — that specifically hunts for accidental fact-promotion in new text, not just formatting compliance. `check.py --no-headings` still applies and still cannot gate (9,363 candidates on the finished corpus), so this is a review-process requirement, not a mechanical one.

**Warning signs:**
A new sentence uses `must` or an unqualified declarative to describe something only the pilot observed (account rotation, dialog text, timing values); a new document ships with zero `[PILOT]` markers despite describing pilot-specific behavior; nobody can point to which two-agent (or judge-and-referee) review pass looked at the new prose for over-claiming.

**Phase to address:**
Every content pillar (A, B, C, D, F) at authoring time; the discuss-phase / adversarial-review step already used for gray-area picks (per user's standing preference) is the natural place to add this specific check, since no mechanical gate exists.

---

### Pitfall 2: A pilot observation is promoted to a sourced mechanism without a citation

**What goes wrong:**
RE-237 and its Phase 155 formalization drew a hard line — twice, at owner ruling — between what the pilot *observed* and what Microsoft *documents* (D-44, D-45 in `155-CONTEXT.md`). Pillar B's reference rows and Pillar C's SSO guide are the highest-risk pillars for re-crossing that line, because they read as authoritative "how it works" content rather than a recipe's tenant-specific narrative, which makes an unhedged assertion look more natural to write.

**Why it happens:**
The pilot device and tenant are live and available this milestone (`PROJECT.md` Key context), which makes it tempting to write what was *seen* as if it were what Microsoft *guarantees* — especially for content like "Credential Guard blocks CredSSP" where a real mechanism exists but the exact trigger conditions, error text, and workarounds the pilot hit are tenant-specific.

**How to avoid:**
Apply RCP-10's own discipline to every new external claim in Pillars B/C/D: fetch the canonical Learn page as source bytes, quote only what is visibly there, and mark anything not found there `[UNVERIFIED]` rather than silently attributing it to Microsoft. Two concrete misses from this research pass that the content phase must not inherit as fact:
- **The exact client-side CredSSP error text** in `SEED-002`/`PROJECT.md` ("server's authentication policy does not allow ... saved credentials") does not appear verbatim on Microsoft's own `considerations-known-issues` Credential Guard page `[SOURCED, fetched 2026-09-10]`. That page documents a *different* message for a related-but-distinct scenario ("Attempts to use saved Windows credentials fail, displaying the error message *Logon attempt failed*") and otherwise describes the CredSSP/SSO-credential block only in prose, with no quoted client dialog string. Pillar B must fetch this string from wherever it was actually observed (the pilot device, or a different Learn/KB page) and label it accordingly — not present it as a verbatim Microsoft quote.
- **The `kioskUser0` → `kioskUser1` account-rotation-on-every-config-change rule** does not appear on Microsoft's own Assigned Access "Recommendations" page `[SOURCED, ms.date 2025-03-07, fetched 2026-09-10]`, which discusses the kiosk account and automatic sign-in at length but says nothing about rotation on reconfiguration. RE-237 already labels this `[PILOT]` correctly; Pillar A's new L2 runbook must preserve that label rather than "upgrading" it once it's rewritten into runbook language, and must not cite a Learn URL for it that doesn't exist.

**Warning signs:**
A reference row or SSO doc states a mechanism as fact with no adjacent citation; a `[PILOT]` label present in RE-237 is missing from the same claim when it's re-stated in a new document; an agent describes "Microsoft documents X" without having fetched the specific page in the same session.

**Phase to address:**
Pillars B, C and D at authoring time; verify at review with the same fetch-discipline RCP-10 used (source bytes, not summarized WebFetch, per this project's own `reference_canonical_source_bytes_not_webfetch` lesson).

---

### Pitfall 3: ConfigMgr Remote Control's CMG limitation has no first-party citation this pass found

**What goes wrong:**
Pillar B is scoped to state "ConfigMgr Remote Control never over CMG" as a reference row. This is a widely repeated community claim (Prajwal Desai, Eskonr, multiple Microsoft Q&A threads) and RE-237 already ships an anti-feature row asserting it as fact, but this research pass fetched both the canonical `manage-clients-internet` page and the `cloud-management-gateway-faq` page `[SOURCED, both fetched 2026-09-10]` and neither one mentions Remote Control at all.

**Why it happens:**
A claim that is true and well-known in the admin community can still lack a clean, quotable first-party sentence — Microsoft's CMG docs describe what CMG *does* support (software distribution, inventory, compliance) rather than exhaustively listing what it doesn't. It's easy to treat "everyone knows this" as equivalent to "Microsoft states this," which is precisely the gap RCP-10 was created to close for RE-237's own two claims.

**How to avoid:**
Before Pillar B ships this row, fetch the dedicated "Remote control" prerequisites/planning page (not yet checked in this pass — `configmgr/core/clients/manage/remote-control` or similar) and quote its exact CMG-support language if present; if no first-party page states it plainly, label the row `[UNVERIFIED]` with the community sources named, exactly as D-43/D-44 handled RE-237's own unsourceable claims (word the corpus assertion as the durable positive — "Remote Help, Quick Assist, or AVD session shadowing are the supported paths for internet-only clients" — rather than an unqualified vendor negative).

**Warning signs:**
The reference row cites no URL, or cites a URL that (on inspection) never mentions Remote Control; the claim is phrased as an absolute vendor negative ("never shipped") rather than the sourced positive plus an unverified aside.

**Phase to address:**
Pillar B, at authoring time.

---

### Pitfall 4: AVD host-pool Entra SSO is five distinct tasks, not one property — and the Kerberos-object trigger is undercounted

**What goes wrong:**
`PROJECT.md` Pillar C names `enablerdsaadauth`, "Kerberos server object for hybrid session hosts," `targetDeviceGroups`, Conditional Access review, and `screen mode id:i:2` as one bundle. Microsoft's own configuration page `[SOURCED, ms.date 2025-08-29, updated 2026-07-29, fetched 2026-09-10]` lists **five separate tasks**, and two of the pillar's own framings are measurably incomplete against it:
1. **`enablerdsaadauth:i:1` is a host-pool RDP property (task 5)** — a *separate* prerequisite is enabling Microsoft Entra authentication for RDP at the **tenant** level, by setting `isRemoteDesktopProtocolEnabled: true` on the **Windows Cloud Login service principal's** `remoteDesktopSecurityConfiguration` object (task 1). Configuring the host pool without ever touching the service principal leaves SSO silently non-functional.
2. **`targetDeviceGroups` is not part of enabling SSO at all.** It configures the **consent-dialog trust list** (task 2, "Hide the consent prompt dialog") — a cosmetic/UX task, independent of whether SSO itself works. Bundling it with the mechanism that makes SSO work risks the corpus implying it's required for functionality when it only suppresses a one-time prompt.
3. **The Kerberos server object requirement is not "for hybrid session hosts"** — it applies in **two** cases per Microsoft's own text: "Your session host is Microsoft Entra **hybrid** joined" *or* "Your session host is Microsoft Entra **joined** and your environment contains Active Directory domain controllers" (i.e., a pure Entra-joined host still needs it if the tenant has any on-prem AD DS to reach). RE-237's device class is Entra-joined-only per its own applies_to line — the SSO pillar must check this second trigger condition explicitly for the pilot's actual environment rather than assuming "hybrid-only" absolves an Entra-joined-only device.
4. **`screen mode id:i:2` (full-screen) is not mentioned anywhere on the SSO configuration page.** It's an unrelated RDP display property. Presenting it inside the same bulleted list as the SSO tasks risks implying a dependency that doesn't exist.

**Why it happens:**
The pilot likely configured all of these in the same session, so they read as one coherent "turn on SSO" checklist from the operator's chair — but Microsoft's docs, and the actual failure modes, separate them along different axes (tenant vs. host pool, functional vs. cosmetic, conditional vs. universal).

**How to avoid:**
Structure Pillar C's content around Microsoft's own five-task sequence, and state the Kerberos-object trigger condition in full (both clauses) rather than "hybrid only." Document the two documented failure modes when the Kerberos object is skipped but required: *"You receive an error message saying the specific session doesn't exist"* or *"Single sign-on will be skipped and you see a standard authentication dialog"* `[SOURCED, same page]` — these make good Configuration-Caused-Failures rows in the RE-237-delta or a standalone guide.

**Warning signs:**
The new content has one bullet list conflating tenant-level and host-pool-level settings; the Kerberos-object callout says only "hybrid-joined hosts"; `screen mode id:i:2` appears inside the SSO prerequisites rather than as an unrelated display setting.

**Phase to address:**
Pillar C, at authoring time — this is exactly the kind of "single-tenant checklist re-narrated as universal procedure" error RCP-06/07 caught in RE-222/RE-224 last milestone.

---

### Pitfall 5: "IoT Enterprise hardware" is assumed to be a MAK-activatable substitute for Enterprise, when it isn't always

**What goes wrong:**
Pillar D frames the decision as "MAK per-device Enterprise versus IoT Enterprise versus clean-image hardware," implying these are three interchangeable paths to the same activated state. Microsoft's own IoT Enterprise licensing page `[SOURCED, ms.date 2026-06-24, fetched 2026-09-10]` states the requirement matrix explicitly:

| Requirement | OEM License | Volume License |
|---|---|---|
| New Device | Yes | **No** |
| Upgrade Existing Device | Yes | Yes |
| Activation methods | OA3.0, ePKEA, PKEA | KMS, MAK |

A **Volume License MAK key cannot license a new device into IoT Enterprise** — Volume Licensing is explicitly an *upgrade* path for a device that already runs "a qualifying operating system," not a way to turn arbitrary Pro/Enterprise hardware into IoT Enterprise from a MAK key alone. Getting IoT Enterprise on **new** hardware requires an OEM license baked in at manufacture ("devices produced by OEMs must be enabled for activation before leaving the factory"). So "clean-image hardware" for this device class, in practice, means *purchasing hardware pre-licensed by an OEM as IoT Enterprise*, not re-imaging stock hardware and applying a MAK key to get IoT Enterprise — that MAK path only ever produces **volume-licensed Windows Enterprise**, the other arm of the decision, not IoT Enterprise.

**Why it happens:**
"MAK activates once over the internet" (already field-confirmed true for the Enterprise arm in RE-237 Step 4) reads as a generic fact about volume activation, and it's easy to assume the same mechanism applies symmetrically to the IoT Enterprise SKU without checking that SKU's own OEM-vs-Volume split.

**How to avoid:**
Write the decision record as two genuinely distinct arms, not three points on one spectrum: (1) MAK-activated Windows Enterprise on existing/any hardware — this is what RE-237's own build already validated and what unblocks the multi-app branch immediately; (2) IoT Enterprise, which requires sourcing hardware that already carries an OEM IoT Enterprise license (or upgrading an existing *qualifying* OS via Volume License — check what "qualifying" means before asserting it covers this device class's current image). Do not present "buy IoT Enterprise hardware" and "apply a MAK key" as the same action.

**Warning signs:**
The decision record's remedy language says a "per-device volume key... **or** purpose-built hardware" without distinguishing which SKU each path produces (this is the exact unsourced RCP-08 "third claim" D-45 flagged and refused to let ship as fact — Pillar D repeats that structure and must not repeat that gap); the licensing-matrix.md row conflates the two SKUs' activation methods.

**Phase to address:**
Pillar D, at authoring time, before the ruling lands in RE-237 and `docs/reference/licensing-matrix.md`.

---

### Pitfall 6: Vendoring GPLv3 code into the Kiosk Baseline doesn't fit the corpus's existing (MIT-shaped) vendoring pattern

**What goes wrong:**
`andrew-s-taylor/public` (the De-Bloat script Pillar E vendors) is licensed **GNU GPLv3** `[SOURCED — fetched the repository's own LICENSE file directly, 2026-09-10: "GNU GENERAL PUBLIC LICENSE, Version 3, 29 June 2007"]`. Phase 155 already established a vendoring pattern for this asset tree — a per-file provenance comment plus a `NOTICE` entry naming the pinned SHA and retrieval date — for `Azure/WindowsAppKiosk`, which is MIT-licensed. That pattern (a short attribution comment, no license text bundled, repository-wide "no LICENSE file, founding one is out of scope") is very likely **insufficient for GPLv3**, which — unlike MIT — requires that copies of the work carry the license text itself and preserve all copyright/license notices, and imposes copyleft obligations on modified redistributions ("`-customwhitelist`" pinning per RE-237 Step 8 is exactly the kind of modification that matters here).

**Why it happens:**
The existing `NOTICE` file's own header states plainly, "This repository carries no LICENSE file. Founding one is deliberately out of scope for this phase" `[MEASURED, assets/recipes/06-walk-up-avd-kiosk/NOTICE]` — that ruling was made for MIT-shaped content and was reasonable there; reusing it unexamined for a GPLv3 dependency changes the legal posture of the vendoring, not just its bookkeeping.

**How to avoid:**
Treat this as its own decision, not an extension of D-27/D-34's precedent: bundle the GPLv3 license text alongside the vendored `RemoveBloat.ps1` (not just a NOTICE reference), preserve the upstream copyright header in the file itself, and record explicitly whether any pinning/parameterization counts as a "modification" requiring a documented changelog under GPL. This is a genuine legal question this repository has never had to answer for vendored content before — flag it for the owner rather than silently reusing the MIT-era NOTICE convention.

**Warning signs:**
`RemoveBloat.ps1` is committed with only a provenance comment and no accompanying license text; the NOTICE entry for it copies the Azure/WindowsAppKiosk wording verbatim without addressing copyleft; Authenticode re-signing is treated as risk-free without checking whether it interacts with GPLv3 §6/§7 at all (likely fine for a script with no anti-tivoization hardware lock, but worth a one-line confirmation rather than an assumption).

**Phase to address:**
Pillar E, at authoring/vendoring time — before the first commit that adds the file, since D-27's "fabrication is prohibited, but so is skipping the legal read" bar applies here as much as it did to the SHA-pinning requirement.

---

### Pitfall 7: Registry/canary/status-flip ordering trap recurs for every new document this milestone

**What goes wrong:**
If Pillar A's L2 runbook or Pillar B's reference content becomes a new registered document (a new `RE-` ID), every mechanical trap Phase 155 spent an entire adversarial-review cycle uncovering for RE-237 recurs verbatim: (1) the registry `Status` column and a document's frontmatter `status:` key are different vocabularies — only the registry column gates the publish bundle (`build-publish-bundle.mjs:524` filters `Approved` registry rows, never frontmatter); (2) the flip is two sites per file (`status:` in frontmatter **and** the `**Status:**` byline), enforced by C17 assertion #9; (3) **both** publish-bundle drift canaries (`build-publish-bundle.mjs`'s own Approved-row canary, two sites, plus `build-filename-map.mjs`) must bump together in the same commit as the registry row, computed from the registry, never hand-typed — splitting the bumps is the exact regression that once sat RED for an entire milestone; (4) the corrected precedent is **flip-then-register** (review → owner sign-off → two-site frontmatter flip → atomic registration commit), reversing what an agent unfamiliar with D-05/D-06 would guess from the requirement text's literal ordering clause.

**Why it happens:**
None of these constraints are visible from reading the requirement text alone — they were only discovered by measurement (running the actual generator, reading `git log`, perturbing a validator) in Phase 155, and REQUIREMENTS.md for v1.23 has not yet been written to carry the corrected precedent forward explicitly (v1.23's REQUIREMENTS.md did not exist as of this research pass — PROJECT.md's Key context bullet is the only place the registry-growth rule is stated for this milestone).

**How to avoid:**
Whichever phase authors the new document(s), re-derive (don't assume) the current registry row count and the canary site line numbers before editing — they will have moved since Phase 155 (RE-237 landed at row 237; a new Pillar B/A document would be 238, and canary line numbers in `build-publish-bundle.mjs`/`build-filename-map.mjs` will differ from `:522`/`:525`/`:274` etc. as prior phases have edited those files). Use `build-filename-map.mjs --dry-run` to preview the exact collision/diff before committing, exactly as D-41 did for row 237.

**Warning signs:**
A commit bumps only one of the two canary sites; the frontmatter flip touches `:3` but not the `**Status:**` byline (or vice versa); the registration commit predates the review/flip rather than following it; the registry row's Status column is set to anything other than `Approved` (there is no `Pending` precedent live in this corpus — 236-of-236, now 237-of-237, rows are `Approved`).

**Phase to address:**
Whichever pillar creates a new registered document (most likely A and/or B); verify with the same `[MEASURED]` re-derivation discipline Phase 155 used, not by copying literal line numbers from 155-CONTEXT.md.

---

### Pitfall 8: Harness-close ordering mistakes — V122 pin placement, batching with content, and frozen-vs-live path confusion

**What goes wrong:**
Pillar H (harness close) carries three independent trip-hazards, each already caught the hard way in a prior milestone:
1. **`MILESTONE_CLOSE_SHAS.V122` must be inserted strictly BEFORE the `V14` entry, never appended** — `V-140-V14PIN` regex-asserts `V14` stays the object's last key, and appending fails the apex-chain check. This is a mechanical trap this project's own memory has hit before and is stated explicitly in `PROJECT.md` Pillar H — but it's easy to forget mid-edit if the pin is added with a simple end-of-object insertion instead of a deliberate before-`V14` placement.
2. **The harness-close cluster must be its own final phase and must never batch with content work** (`PROJECT.md` Key context, and the same rule held for Pillars G+H in v1.22 and v1.21). A common process shortcut — folding the pin insertion into whichever content phase happens to touch validators last — breaks this invariant and has no test that catches it except human process discipline.
3. **`C17-FROZEN-AWARE-RESIDUE-V22` requires converting `v1.22-milestone-audit.mjs` to frozen reads, "including the `existsSync` doc-path gates (the CR-01 class)."** This project's own prior code review found a real CR-01-class defect in the *previous* milestone's claimed-fix auditor at Phase 159 — a live-vs-frozen path confusion is exactly the kind of bug that recurs when a new content phase adds files (e.g., `docs/l2-runbooks/NN-...`) that an `existsSync` gate inside a frozen-audit script must resolve against the **frozen SHA's tree**, not the working tree at HEAD, or the gate silently passes/fails for the wrong reason.

**Why it happens:**
These are structural properties of a milestone-numbered chain of validators that only reveal themselves under perturbation testing (D-09's "proven by perturbation, not by reading" pattern) — reading the code does not reliably surface them; running the apex before and after a change does.

**How to avoid:**
Re-run the same perturbation discipline Phase 155 used for `check-phase-135.mjs` (D-09): make the change, run the apex, confirm the expected FAIL/PASS shift, then `git checkout --` and confirm return-to-green, before trusting any claim about the pin's placement or the frozen-read conversion's correctness. Never insert `V122` by appending to the SHA map without checking the `V14`-last invariant first.

**Warning signs:**
The apex fails `V-XXX-V14PIN` (or its v1.23-numbered successor) after the pin lands; a content phase's commit touches a `check-phase-*.mjs` file; the harness-close phase's plan references "while we're in here, also land Pillar F" or similar batching language.

**Phase to address:**
Pillar H only, as its own final phase — exactly as `PROJECT.md` already states, but worth re-stating here because it is the single most process-fragile constraint in the milestone.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|-----------------|------------------|
| Reusing RE-237's per-file provenance-comment NOTICE pattern for the GPLv3 De-Bloat vendor without adding license text | Saves a legal-research step; matches existing convention | Copyleft non-compliance risk on a public repo (`origin` is confirmed public — `gh repo view` "isPrivate":false per Phase 155's own D-29 finding) | Never — this is a distinct license class from the MIT precedent it copies |
| Labeling a new claim `[PILOT]` instead of researching whether it's actually documented | Fast, avoids a fetch | Under-cites content that could have been `[SOURCED]`, and trains reviewers to stop distinguishing the two | Acceptable only as a placeholder pending the RCP-10-style research pass, never as the shipped state |
| Writing the AVD SSO section as a single flattened checklist instead of Microsoft's five-task structure | Shorter document, feels more "recipe-like" | Readers who skip the Kerberos-object step (because it reads as optional/hybrid-only) hit the two documented failure modes with no diagnostic hook back to this section | Never for the first-class SSO guide; borderline acceptable in a terse reference-row summary if it links out to the full five-task sequence |
| Treating `Trace-StorisEula.ps1`'s "explicitly untested" status as good enough to ship a recipe step | Unblocks Pillar F without a live test cycle | A first-party-documented "how to install ClickOnce in a kiosk account" step built on an untested diagnostic risks shipping wrong guidance with the corpus's authority behind it | Acceptable only as a documented negative/open-investigation, never as a prescriptive step, until the live pilot device actually confirms it |
| Copying 155-CONTEXT.md's literal line numbers for canary/registry edit sites into v1.23 planning docs | Saves a re-measurement step | Every one of those files has been edited since Phase 155; stale line numbers cause an executor to edit provenance history instead of the editable site (152 D-18's exact failure mode) | Never — always re-run the measurement commands fresh |

## Integration Gotchas

Common mistakes when connecting to external services/sources for this milestone.

| Integration | Common Mistake | Correct Approach |
|-------------|-----------------|-------------------|
| Azure Virtual Desktop Entra SSO | Enabling `enablerdsaadauth` at the host pool without first setting `isRemoteDesktopProtocolEnabled: true` on the Windows Cloud Login service principal | Do both; the service-principal step is a **tenant-wide, one-time** prerequisite, the host-pool property is **per-host-pool** |
| Azure Virtual Desktop Entra SSO | Assuming `targetDeviceGroups` is required for SSO to function | It only suppresses the per-host consent dialog (up to 10 groups, up to 15 hosts/30 days remembered without it); SSO works without it, just with a recurring prompt |
| Microsoft Graph PowerShell SDK (for the SSO config) | Using an old cached SDK version | Learn's own prerequisite names **version 2.9.0 or later** `[SOURCED]`; verify installed version before scripting the config |
| Intune Remote Help "unattended support" claim | Citing a WebFetch summary of the Microsoft Community Hub announcement blog as if it were the fetched page body | This research pass's own WebFetch call on that exact URL returned only the page title with no article text — a silent fetch failure, not evidence the feature is undocumented. Re-fetch via a different method (defuddle, direct HTML) before citing it as `[SOURCED]` |
| `andrew-s-taylor/public` De-Bloat | Vendoring from a moving branch reference (`main`) instead of a pinned commit SHA | Follow the Phase 155 precedent exactly: pin to a specific commit SHA confirmed via the GitHub API, the same way `Azure/WindowsAppKiosk` was pinned |
| ConfigMgr client (Pillar B reference row) | Repeating the CMG-secrets mistake Phase 155 already found and fixed once (real FQDN/site code in a committed script) for any new SSO-related service-principal IDs or Kerberos server object names | Run the same scrub discipline (`/gsd-secure-phase`) on any new committed config or script this milestone introduces, not just the ones Phase 155 already touched |

## Security Mistakes

Domain-specific security issues beyond general web security, specific to this milestone's content.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Committing a Kerberos server object name, service-principal app ID, or tenant-specific device-group name from the live pilot tenant into the SSO guide's example config | Public-repo tenant disclosure (this repo's `origin` is confirmed public) | Scrub to placeholders exactly as `Install-ConfigMgrClient.ps1` was scrubbed in Phase 155 (D-29); treat every new asset this milestone touches as subject to the same negative-control scan |
| Shipping the GPLv3 De-Bloat script without its license text, then later needing to remove it from history | A public-repo copyleft violation is a one-way problem once pushed — "removal from HEAD is not removal" (Phase 155's own D-29 conclusion, reapplied) | Resolve the license-bundling question before the first commit, not after |
| Presenting the Credential Guard/CredSSP fix as "disable Credential Guard" without the security tradeoff Microsoft's own page states | Recommending a fix that "leaves stored domain credentials vulnerable to theft" `[SOURCED]` as if it were cost-free | If documenting the disable-CG workaround at all, carry Microsoft's own caveat alongside it; prefer the Kerberos-clean-target or host-pool-SSO fix RE-237 already prefers |
| Trace-StorisEula.ps1 or the ClickOnce wrapper investigation touching a real vendor URL, license key, or credential from the pilot tenant | Same public-repo disclosure risk as above, in a script nobody has scrubbed yet | Run the same full-tree scrub scan Phase 155 ran (case-insensitive employer-name search, GUID-shaped pattern search) before committing Pillar F's output |

## "Looks Done But Isn't" Checklist

- [ ] **L2 runbook "wired":** Verify it's reachable from all three named surfaces — the L2 hub (`docs/l2-runbooks/00-index.md`), `quick-ref-l2.md`, and the Windows triage tree — not just one of them; also verify no hub links `docs/recipes/06-` directly (the `HUBSNOTWIRED` convention is binding even though its regex doesn't mechanically catch a `recipes/06-` link, per Phase 155's D-20 finding).
- [ ] **AVD SSO "documented":** Verify the Kerberos-server-object condition is stated for **both** trigger cases (hybrid-joined, and Entra-joined-with-on-prem-AD-DS) — not just "hybrid session hosts" as `PROJECT.md`'s own summary phrases it.
- [ ] **De-Bloat "vendored":** Verify the GPLv3 license text is bundled with the file (not just referenced in NOTICE), and that the pinned-commit-SHA-plus-GitHub-API-confirmation method from Phase 155 was actually followed rather than trusting a branch HEAD.
- [ ] **Licensing decision "recorded":** Verify both `docs/reference/licensing-matrix.md` **and** RE-237 were updated in the same edit set — Phase 155's D-46 precedent found the matrix already carries an activation row that a new decision should amend, not duplicate.
- [ ] **New reference document "registered":** Verify the registry row, **both** publish-bundle canary sites, and the regenerated `filename-map.md` all land in one atomic commit, computed fresh from the current registry state, not copied from a prior phase's line numbers.
- [ ] **Harness close "done":** Verify the V122 pin sits **before** `V14` (not appended), the apex chain range was extended to include the new v1.23 phases, and the new v1.23 CI workflow was actually added (not just planned) — count against the prior milestone's 18-then-19 workflow count.
- [ ] **`[PILOT]` labels "protected":** Verify new `[PILOT]` blockquotes stay under roughly 185 characters (the corpus's own measured C17 #12 headroom margin from RE-237's own five tightest blockquotes) before a later style pass could push them over the 200-char cap.
- [ ] **DEFER-121-07-A "closed":** Verify Pillar G's Version-History date-fill actually lands this milestone rather than being deferred a fourth time — these are GFM table rows that, per this project's own memory, "can NEVER be suppressed" and will keep resurfacing at every future close until filled.

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|-----------------|------------------|
| A `[PILOT]`-eligible claim shipped unlabeled as fact | LOW | Add the label and, if the underlying claim was also unsourced, downgrade wording to the hedged form in a follow-up commit; no structural rework needed since this is prose-only |
| Registry/canary bump split across two commits | MEDIUM | Follow the D-05/D-06 recovery pattern already proven in this repo: the second canary can be bumped in an immediate follow-up commit; confirm with `build-filename-map.mjs --dry-run` before committing |
| GPLv3 script committed without license text to a public remote | HIGH | This is Phase 155's own "one-way" class (D-29): removal from HEAD is not removal from history; a history rewrite (`git filter-repo` or equivalent) is required if compliance can't be satisfied after the fact by simply adding the missing license text and notices in a follow-up commit — prefer the cheap fix (add the license text now) over history rewrite if the omission is caught before broader distribution |
| V122 pin appended instead of inserted before V14 | LOW-MEDIUM | Re-order the map entry in a follow-up commit; re-run the apex to confirm `V-XXX-V14PIN`-equivalent returns to PASS |
| A new document's `[MEASURED]` line-number citations go stale immediately after a subsequent phase edits the same files | LOW | Treat all cross-phase line-number citations as provisional; re-derive with grep/awk at time of use rather than trusting a prior phase's numbers, exactly as this research file itself does |

## Pitfall-to-Phase Mapping

How the v1.23 roadmap phases should address these pitfalls (mapped to `PROJECT.md`'s Pillars A–H; exact phase numbers are assigned at roadmap time starting from Phase 160).

| Pitfall | Prevention Phase | Verification |
|---------|-------------------|----------------|
| No "before" state for meaning-preservation judging on new prose | All content pillars (A, B, C, D, F) | A review pass explicitly hunts for `must`/unhedged declaratives on `[PILOT]`-eligible claims before merge, since no automated judge diff exists for new text |
| Pilot observation promoted to sourced fact (CredSSP message, kioskUser rotation) | Pillar B (reference rows), Pillar A (L2 runbook) | Re-fetch cited Learn pages as source bytes at review time; confirm every quoted string is found verbatim on the page cited |
| ConfigMgr Remote Control CMG claim unsourced | Pillar B | Fetch the dedicated Remote Control prerequisites Learn page before shipping the row; label `[UNVERIFIED]` if no first-party statement is found |
| AVD SSO five-task conflation, Kerberos-object trigger undercounted | Pillar C | Structure content around Microsoft's own five numbered tasks; state both Kerberos-object trigger clauses |
| IoT Enterprise "clean-image hardware" MAK assumption | Pillar D | Confirm the OEM-vs-Volume-License requirement table against the licensing-matrix.md rewrite before it ships |
| GPLv3 vendoring license-text gap | Pillar E | Confirm license text is bundled and copyright notices preserved before the first commit adding the file |
| Registry/canary/status-flip ordering trap | Whichever of A/B creates a new registered document | Re-derive registry count and canary line numbers fresh; use `--dry-run`; follow flip-then-register order |
| V122 pin ordering, batching-with-content, frozen/live path confusion | Pillar H (harness close, standalone final phase) | Perturbation-test the pin insertion and the frozen-audit conversion against the apex before and after, exactly as Phase 155's D-09 did for `check-phase-135.mjs` |
| DEFER-121-07-A perpetual re-deferral | Pillar G | Confirm the nine Version-History rows actually carry the filled date in the same milestone's close artifact, not carried to v1.24 |

## Sources

- `D:/claude/Autopilot/.planning/PROJECT.md` — v1.23 Current Milestone section (Pillars A–H, Key context), v1.22 previous-milestone section — `[MEASURED, read 2026-09-10]`
- `D:/claude/Autopilot/.planning/seeds/SEED-002-walk-up-avd-kiosk-recipe.md` — `[MEASURED, read 2026-09-10]`
- `D:/claude/Autopilot/.planning/milestones/v1.22-phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-CONTEXT.md` — D-01 through D-53, all `[MEASURED]` rows — `[read 2026-09-10]`
- `D:/claude/Autopilot/docs/recipes/06-walk-up-avd-kiosk-autologon.md` (RE-237) — `[MEASURED, read 2026-09-10]`
- `D:/claude/Autopilot/assets/recipes/06-walk-up-avd-kiosk/NOTICE` — `[MEASURED, read 2026-09-10]`
- `D:/claude/Autopilot/.claude/skills/google-style-verify/SKILL.md:117-138` — `[MEASURED]`
- `D:/claude/Autopilot/scripts/validation/check-phase-132.mjs`, `check-phase-137.mjs` — `HUBSNOTWIRED` regex text — `[MEASURED]`
- `D:/claude/Autopilot/docs/_registry/RE-index.md:1-14` — `[MEASURED]`
- [Configure single sign-on for Azure Virtual Desktop using Microsoft Entra ID](https://learn.microsoft.com/en-us/azure/virtual-desktop/configure-single-sign-on) — Microsoft Learn, `ms.date: 2025-08-29`, `updated_at: 2026-07-29` — `[SOURCED, fetched as source bytes 2026-09-10]`
- [Considerations and known issues when using Credential Guard](https://learn.microsoft.com/en-us/windows/security/identity-protection/credential-guard/considerations-known-issues) — Microsoft Learn, `ms.date: 2026-04-23`, `updated_at: 2026-04-25` — `[SOURCED, fetched as source bytes 2026-09-10]`
- [Assigned Access Recommendations](https://learn.microsoft.com/en-us/windows/configuration/assigned-access/recommendations) — Microsoft Learn, `ms.date: 2025-03-07` — `[SOURCED, fetched as source bytes 2026-09-10]` — silent on account rotation
- [Windows IoT Enterprise Licensing](https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing) — Microsoft Learn, `ms.date: 2026-06-24` — `[SOURCED, fetched as source bytes 2026-09-10]`
- [Manage clients over the internet - Configuration Manager](https://learn.microsoft.com/en-us/intune/configmgr/core/clients/manage/manage-clients-internet) — Microsoft Learn, `ms.date: 2021-08-02`, `updated_at: 2026-08-31` — `[SOURCED, fetched 2026-09-10]` — silent on Remote Control
- [CMG FAQ - Configuration Manager](https://learn.microsoft.com/en-us/mem/configmgr/core/clients/manage/cmg/cloud-management-gateway-faq) — Microsoft Learn, `ms.date: 2024-12-04` — `[SOURCED, fetched 2026-09-10]` — silent on Remote Control
- [andrew-s-taylor/public LICENSE](https://raw.githubusercontent.com/andrew-s-taylor/public/main/LICENSE) — `[SOURCED, fetched directly 2026-09-10]` — GNU GPLv3
- [Remote Help on Windows: Unattended Support with Remote Sign-In Is Here](https://techcommunity.microsoft.com/blog/intunecustomersuccess/remote-help-on-windows-unattended-support-with-remote-sign-in-is-here/4549772) — Microsoft Community Hub — `[UNVERIFIED body text — WebFetch returned only the page title, no article content, on the attempt made 2026-09-10; corroborated only via secondary community sources (MSEndpointMgr, Patch My PC, community forum posts) in WebSearch summaries, not fetched as source bytes]`

---
*Pitfalls research for: Intune/Autopilot kiosk-class follow-through content, v1.23*
*Researched: 2026-09-10*
