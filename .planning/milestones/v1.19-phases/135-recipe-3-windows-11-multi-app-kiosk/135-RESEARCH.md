# Phase 135: Recipe #3 — Windows 11 Multi-App Kiosk - Research

**Researched:** 2026-07-29
**Domain:** Windows 11 restricted user experience via AssignedAccess CSP `Configuration`, delivered by Intune custom OMA-URI; plus EEE-SOP fenced-content rationale correction (HYG-05)
**Confidence:** HIGH on the payload, the OMA-URI mechanism, and every B-6 / D5.5 / D3.1 deferral. MEDIUM on the Intune Data-type field (`chr`→String mapping is a defensible inference, not a first-party instruction). See `## Concerns` for eleven items where a locked claim needs a scope qualification.

**Every first-party claim below was fetched this session (2026-07-29).** Nothing is quoted from memory or from the existing `.planning/research/*` files. Quotes carry the URL and the section heading the sentence sits under, plus the scope the surrounding sentences impose. Unverifiable items are marked NOT-FOUND or `[UNVERIFIED]`.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

All of `135-CONTEXT.md` `<decisions>` is binding: anti-regression traps T-1..T-7; Area 1 (D1.1–D1.12, XML presentation); Area 2 (D2.1–D2.5, `## Rollback/Recovery`); Area 3 (D3.1–D3.6, verification); Area 4 (D4.0–D4.6, enrollment/account/app scope); Area 5 (D5.1–D5.7, prerequisites/file identity); Area 6 (D6.1–D6.3, first-lander precedent); Area 7 (D7.1–D7.7, HYG-05); Area 8 (D8.1–D8.3, plan structure).

**This research does not re-decide any of them.** Where a locked claim needs a scope qualification to survive contact with the actual source text, it is recorded in `## Concerns` with the evidence — never silently planned around.

### Claude's Discretion (verbatim from CONTEXT.md)

- Exact prose wording within every ruling above (step text, callout phrasing, table cell wording, row order beyond what is fixed).
- The concrete worked app set and the specific AUMIDs/placeholder names in the payload.
- Whether `applyOnce` is included in the worked JSON (D1.11), and the concrete `pinnedList` entries.
- The taxonomy sentence's exact wording in RE-224's Scope banner (D6.2), subject to the C17 `#12` measurement.
- The descriptive slug within `docs/recipes/03-*.md` (D5.6).
- Whether the UAC / no-RDP requirements are stated for the restricted user experience (D5.5) — rule it either way, but rule it explicitly.

**This research supplies a concrete recommendation for each discretion item** (§1 payload + app set + `applyOnce`; §5 slug + frontmatter; §3 UAC/RDP ruling).

### Deferred Ideas (OUT OF SCOPE)

- **Gray area #8** (shared conceptual anchor / kiosk-dedicated taxonomy) — chartered to Phase 136 by `ROADMAP.md:89`. Phase 135 rules the sentence for RE-224's own Scope banner only. Do not bind RE-225.
- `recipe-template.md` gaining an optional `## Rollback/Recovery` slot — next recipe milestone.
- C17-vs-pipeline fence-mask divergence (`c17-eee-contract.mjs` column-0 vs `convert.ps1:108` `^\s*`) — logged to `v1.19-DEFERRED-CLEANUP.md`; avoided in-phase by mandating column 0.
- HYG-05's "retrieve poorly" clause as an unfalsified extrapolation — ship the locked wording, log the extrapolation.
- RCPFUT-05 leg 1 satisfaction — record only, do not act.
- A Windows-kiosk L1/L2 runbook.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| KIOSK-01 | Linear happy path: enrollment → account → apps → XML → custom OMA-URI → verification; single-app as a one-line cross-link; zero edits to recipe 01 | §2 (OMA-URI click-path + data type, GATE 1 re-cited fresh); §1 (the payload); §3.C (verification seam) |
| KIOSK-02 | Bounded, schema-valid worked XML (`AllAppsList`/`AllowedApps`, `Taskbar`/`ShowTaskbar`, minimal `v5:StartPins`); 3-row namespace table; exclusions on correctness grounds | §1.A (complete payload, XSD-confirmed element order); §1.B (field-decomposition table, 22 rows); §1.C (namespace table verification, incl. the published `v5` double-binding defect) |
| KIOSK-03 | Account-model decision block + anti-feature table (CA/MFA, Win11-wrong-GUI, group-`Configs`-requires-`AllAppList`, nested `UserGroup`, hardcoded AUMIDs, `Configuration` supersedes `KioskModeApp`, SharedPC, `AssignedAccess/Status`) | §3.F (every anti-feature row now has a verbatim first-party quote); §3.D (CA blast radius) |
| KIOSK-04 | `## Rollback/Recovery` between `## Verification` and `## Configuration-Caused Failures`, named divergence, bounded to first-party facts | §3.A (B-6 **fully resolved** — `Remove Logoff`/`Remove Task Manager`/`Remove Change Password`/`IdleTimeOut`/30 s all first-party); §3.E (removal-is-not-rollback + Autopilot Reset) |
| KIOSK-05 | Admin-executable verification; `AppNotFound` as prerequisite symptom only | §3.C (Operational enable procedure verbatim + Event 31000 verbatim + registry-key profile-applied check); §3.G (AppLocker deny-list generated at first sign-in) |
| HYG-05 | EEE-SOP fenced-content rationale corrected at three sites | §4 (exact current text with line offsets, proposed replacements, no-fourth-site re-verification, validator-needle clearance, Version History row) |
</phase_requirements>

---

## Summary

The phase's core artifact — a complete, schema-valid, copy-pasteable Windows 11 multi-app kiosk payload — is now fully derivable from first-party sources, and every structural claim CONTEXT.md made about it is **confirmed** rather than merely plausible. The XSD's `profile_t` `AllAppsList` branch is an ordered `xs:sequence` in exactly the order D1.12 states; `Taskbar` is `minOccurs="1"` with `ShowTaskbar` `use="required"`; the root namespace is the unprefixed 2017 `xmlns` in every sample including Windows 11 (T-7); and the backslash rule (T-1) is not an inference from adjacent samples — Microsoft states it outright on the AssignedAccess CSP page: *"`domain\user` used in Configuration xml does not need `\\` but only one `\`, because xml does not (need to) escape `\`."* Better still, `assigned-access/examples` publishes a Windows-11-pivot **Restricted user experience** sample that is the exact shape RE-224 needs, carrying doubled backslashes inside the `v5:StartPins` JSON and single backslashes in `App/@DesktopAppPath` in the same document — the two forms centimetres apart, precisely as D1.9 requires the recipe to teach.

Every author-time item CONTEXT.md deferred is resolved, and three resolutions overturn the assumption that they might be NOT-FOUND. B-6 is fully discharged: `Remove Logoff`, `Remove Task Manager` and `Remove Change Password` are first-party table rows on `assigned-access/policy-settings` under a heading that scopes them to *"targeted user accounts when you deploy a restricted user experience"* — the exact scope RE-224 needs — and the `IdleTimeOut` registry key with its 30-second default is first-party on `configure-multi-app-kiosk`. None of them need cutting. D5.5's UAC / no-RDP question is resolved decisively in the negative: `assigned-access/overview` self-scopes both bullets to *"To use a **kiosk experience**…"*, so they must **not** be stated for the restricted user experience. And `applyOnce` acquired a version gate eight days before this research: it requires Windows 11 24H2 + KB5062660 and *"it's ignored on earlier versions"* — which, against the recipe's 22H2 floor, settles D1.11 as **omit**.

Eleven claims that are locked or mandated need a scope qualification before they ship, and they are the same defect class the milestone has been fighting. Two examples: the mandated shortcuts sentence's clause *"only Ctrl+Alt+Del reaches the security screen"* has **no** first-party sentence behind it (the `recommendations` page never mentions a security screen at all — which is exactly why T-5 is right — and no page ties Ctrl+Alt+Del to it either); and D4.5's *"Windows apps must be provisioned or installed for the Assigned Access account"* quote sits under `## Choose an app for a **kiosk experience**`, so it is single-app-scoped, while two correctly-scoped replacements exist. All eleven are in `## Concerns` with proposed minimal fixes.

**Primary recommendation:** lift §1.A's payload verbatim into the Step-N fence, §1.B's 22 rows into the decomposition table, §2's click-path into the delivery step, §3's quote bank into Prerequisites / Verification / Rollback / anti-features, and §4's exact-string pairs into Plan 1 — then treat `## Concerns` as a pre-authoring checklist, because each item is a shipped-documentation defect if it passes through unqualified.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Kiosk lockdown definition (allow-list, Start pins, taskbar) | Device / OS (AssignedAccess CSP `Configuration`) | — | The CSP node consumes one complete XML document; nothing in Intune models the fields |
| Policy transport | Intune MDM (Custom profile, OMA-URI) | — | `chr` (string) payload, Add/Replace/Get supported |
| Effective-configuration scope | XML `Configs` (account/group named inside the payload) | Intune assignment (device group) | **Two independent scopes** — D4.4 / Pitfall 8; a device can receive the policy and show no restricted experience |
| App presence on the device | Intune app assignment (device context, Required) | — | ESP tracks apps, not the custom profile; the recipe controls neither's ordering |
| Start-pin *rendering* of an assigned app | Device / OS, at first user sign-in | — | Per-user package registration; pins for not-yet-installed apps simply don't appear |
| App execution enforcement | Device / OS (AppLocker rules generated by Assigned Access) | — | Deny list is built **at runtime when the Assigned Access user signs in** |
| Verification evidence | Device / OS (observable behaviour + Event Viewer + registry) | — | `AssignedAccess/Status` is `Get`-only → not Intune-readable |
| Doc-class conformance | Repo harness (C17, check-phase-114/120/129/130) | — | Content strings, never line coordinates |

---

## 1. The Worked Payload

### 1.A — Complete, schema-valid, copy-pasteable `AssignedAccessConfiguration`

Bounded to KIOSK-02's field set. Excludes `BreakoutSequence`, managed folders, `v5:TaskbarLayout`, `ClassicAppPath`/`ClassicAppArguments`, `rs5:FileExplorerNamespaceRestrictions`, `StartLayout`, `rs5:AutoLaunch`.

Ships as a **column-0 ```` ```xml ```` fence** (D1.1/D1.2), immediately after the numbered click-list inside the Step that authors the XML (D1.7).

```xml
<?xml version="1.0" encoding="utf-8" ?>
<AssignedAccessConfiguration
    xmlns="http://schemas.microsoft.com/AssignedAccess/2017/config"
    xmlns:v5="http://schemas.microsoft.com/AssignedAccess/2022/config">
  <Profiles>
    <Profile Id="{9A2A490F-10F6-4764-974A-43B19E722C23}" Name="Frontline kiosk">
      <AllAppsList>
        <AllowedApps>
          <App AppUserModelId="Microsoft.WindowsCalculator_8wekyb3d8bbwe!App" />
          <App DesktopAppPath="%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" />
          <App AppUserModelId="[YOUR-LOB-APP-AUMID]" />
        </AllowedApps>
      </AllAppsList>
      <v5:StartPins><![CDATA[{
        "pinnedList":[
          {"packagedAppId":"Microsoft.WindowsCalculator_8wekyb3d8bbwe!App"},
          {"desktopAppLink":"%ALLUSERSPROFILE%\\Microsoft\\Windows\\Start Menu\\Programs\\Microsoft Edge.lnk"},
          {"packagedAppId":"[YOUR-LOB-APP-AUMID]"}
        ]
      }]]></v5:StartPins>
      <Taskbar ShowTaskbar="true" />
    </Profile>
  </Profiles>
  <Configs>
    <Config>
      <UserGroup Type="AzureActiveDirectoryGroup" Name="[YOUR-ENTRA-GROUP-OBJECT-ID]" />
      <DefaultProfile Id="{9A2A490F-10F6-4764-974A-43B19E722C23}" />
    </Config>
  </Configs>
</AssignedAccessConfiguration>
```

**Placeholder lead-in for the fence** (the `10-kerberos-sso-extension.md:92` idiom, per D1.4). Replace exactly three values: `[YOUR-LOB-APP-AUMID]` in both places (same value — the allow-list entry and its Start pin must match), `[YOUR-ENTRA-GROUP-OBJECT-ID]`, and both occurrences of the `Profile Id` GUID (one value, generated once with `New-Guid`). Everything else is a working value.

**The fence's own lead-in must state the order fact** (D1.12): `Taskbar` follows `v5:StartPins`, and both `Profile Id` and `DefaultProfile Id` carry the same braced GUID.

#### Element order — CONFIRMED against the published XSD

`[VERIFIED: learn.microsoft.com/en-us/windows/configuration/assigned-access/xsd, § "Assigned Access XSD"]` — the `profile_t` `AllAppsList` branch, verbatim:

```
<xs:complexType name="profile_t">
    <xs:choice>
        <xs:sequence minOccurs="1" maxOccurs="1">
            <xs:element name="AllAppsList" type="allappslist_t" minOccurs="1" maxOccurs="1"/>
            <xs:element ref="rs5:FileExplorerNamespaceRestrictions" minOccurs="0" maxOccurs="1"/>
            <xs:element name="StartLayout" type="xs:string" minOccurs="0" maxOccurs="1"/>
            <xs:element ref="v5:StartPins" minOccurs="0" maxOccurs="1"/>
            <xs:element name="Taskbar" type="taskbar_t" minOccurs="1" maxOccurs="1"/>
            <xs:element ref="v5:TaskbarLayout" minOccurs="0" maxOccurs="1"/>
        </xs:sequence>
        ...
    </xs:choice>
    <xs:attribute name="Id" type="guid_t" use="required"/>
    <xs:attribute name="Name" type="xs:string" use="optional"/>
</xs:complexType>
```

**D1.12 is exactly correct — confirm, no correction needed.** Additional confirmed facts from the same fetch:

- `<xs:complexType name="taskbar_t"><xs:attribute name="ShowTaskbar" type="xs:boolean" use="required"/></xs:complexType>` → `Taskbar` is mandatory (`minOccurs="1"`) **and** `ShowTaskbar` is `use="required"`. KIOSK-02's "genuinely mandatory element" claim is doubly confirmed.
- `Id` is `use="required"` on `Profile`, typed `guid_t` with pattern `\{[0-9a-fA-F]{8}\-([0-9a-fA-F]{4}\-){3}[0-9a-fA-F]{12}\}` → **the braces are part of the required pattern.** A GUID without braces is schema-invalid. Worth one caution line; it is a silent, easy error.
- `BreakoutSequence` appears only as `<xs:element ref="v4:BreakoutSequence" minOccurs="0" maxOccurs="1"/>` inside the **second** `xs:sequence` (the `KioskModeApp` branch of the `xs:choice`). **KIOSK-02's exclusion-on-correctness-grounds is confirmed** — it is schema-illegal in an `AllAppsList` profile.
- The root element is `<xs:all minOccurs="1">` over `Profiles` and `Configs` → their relative order is *not* schema-constrained (`xs:all`, not `xs:sequence`). Every sample nonetheless puts `Profiles` first; match the samples, but do not assert that the order is required.
- `AllowedApps` carries `<xs:unique name="ForbidDupApps">` on `@AppUserModelId|@DesktopAppPath` and `<xs:unique name="OnlyOneAppCanHaveAutoLaunch">`. Duplicate app entries are a schema violation.
- `groupType_t` enumerates exactly `LocalGroup`, `ActiveDirectoryGroup`, `AzureActiveDirectoryGroup`.

#### Namespace declarations

The payload uses two, and only two, namespaces because the bounded field set needs no more:

- `xmlns="http://schemas.microsoft.com/AssignedAccess/2017/config"` — the **unprefixed root**. `[VERIFIED: assigned-access/configuration-file, § opening basic example]`: `<AssignedAccessConfiguration xmlns="http://schemas.microsoft.com/AssignedAccess/2017/config">`, with children written bare (`<Profiles>`, `<AllAppsList>`, `<Taskbar>`). **T-7 confirmed on every sample fetched**, including the Windows-11-pivot ones.
- `xmlns:v5="http://schemas.microsoft.com/AssignedAccess/2022/config"` — needed for `v5:StartPins`. `[VERIFIED: assigned-access/configuration-file, § "Versioning"]`: *"To authorize a compatible configuration XML that includes version-specific elements and attributes, always include the namespace of the add-on schemas, and decorate the attributes and elements accordingly with the namespace alias. For example, to configure the `StartPins` feature that was added in Windows 11, version 22H2, use the below example. Note the alias `v5` associated to the `http://schemas.microsoft.com/AssignedAccess/2022/config` namespace for 22H2 release, and the alias is tagged on `StartPins` inline."*

**`default` is not writable.** `[VERIFIED: assigned-access/xsd]` — `xmlns:default="…/2017/config"` appears **only inside the XSD documents**, where it is used by internal XPath selectors (`<xs:selector xpath="default:App"/>`, `xpath="default:Profile"`, `xpath=".//default:AutoLogonAccount"`). It is never a prefix an instance document writes. **T-7's second half confirmed.**

Note the first-party samples on `assigned-access/examples` also declare `xmlns:xs="http://www.w3.org/2001/XMLSchema"` and `xmlns:default="…/2017/config"` on the instance root. Both are unused in the instance and harmless; the recipe should not copy them — a bounded payload declaring namespaces it never uses invites the reader to think they are required.

#### Backslash handling — T-1 confirmed, and upgraded from inference to a direct first-party statement

**This is the strongest citation available and it should be the one the recipe's SUMMARY records.** `[VERIFIED: learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp, § "KioskModeApp", Tip]`:

> *"In the above example the double `\\` is required because it's in JSON and JSON escapes `\\` into `\`. If an MDM server uses JSON parser\composer, they should ask customers to type only one `\`, which will be `\\` in the JSON. If user types `\\`, it'll become `\\\\` in JSON, which will cause erroneous results. **For the same reason, `domain\user` used in Configuration xml does not need `\\` but only one `\`, because xml does not (need to) escape `\`.**"*

Scope note: the Tip sits under the `KioskModeApp` H2 and its worked example is the `KioskModeApp` JSON. Its final sentence, however, generalises explicitly to *"Configuration xml"* — the node RE-224 uses — and states the XML half directly. This is a statement of the rule, not a sample from which the rule is inferred.

Two-sided sample confirmation, **both inside CDATA in the same document**, which is what kills the "CDATA causes the doubling" theory dead. `[VERIFIED: assigned-access/examples, § "Restricted user experience", Windows 11 pivot]`:

| Where | Verbatim | Form |
|---|---|---|
| XML attribute | `<App DesktopAppPath="C:\Windows\system32\cmd.exe" />` | **single** |
| XML attribute | `<App DesktopAppPath="%windir%\System32\WindowsPowerShell\v1.0\Powershell.exe" />` | **single** |
| Inside `v5:StartPins` CDATA (JSON) | `{"desktopAppLink":"%APPDATA%\\Microsoft\\Windows\\Start Menu\\Programs\\File Explorer.lnk"}` | **doubled** |
| Inside `StartLayout` CDATA (XML-in-XML, Win10 pivot of the same page) | `DesktopApplicationLinkPath="%ALLUSERSPROFILE%\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk"` | **single** |

The last row is the decisive one: it is *inside CDATA* and *single*, because the content is XML. Doubling tracks JSON string escaping, full stop. **T-1 confirmed; D1.9(1) and D1.9(2) both hold.** The payload in §1.A carries one instance of each form, twelve lines apart.

#### `pinnedList` key casing — D1.10 confirmed, with a corrected count

`[VERIFIED: learn.microsoft.com/en-us/windows/configuration/start/layout, § "Change the configuration file", Windows 11 pivot]` — the key **table**, verbatim, all four rows:

| Key | Description |
| --- | --- |
| `packagedAppID` | Used for Universal Windows Platform (UWP) apps. To pin a UWP app, use the app's AUMID. |
| `desktopAppID` | Used for desktop apps. To pin a desktop app, use the app's AUMID. If the app doesn't have an AUMID, use the `desktopAppLink` instead. |
| `desktopAppLink` | Used for desktop apps that don't have an associated AUMID. To pin this type of app, use the path to the `.lnk` shortcut that points to the app. |
| `secondaryTile` | Used for Microsoft Edge pinned sites. |

**The divergence is real and confirmed.** Counts from this session's fetches:

| Form | Occurrences | Where |
|---|---|---|
| `packagedAppID` (capital `D`) | **1** | the key table above, and nowhere else on any page fetched |
| `packagedAppId` (lowercase `d`) | **19** | `start/layout` Win11 JSON sample ×9 (8 top-level + 1 inside `secondaryTile`); `assigned-access/examples` Win11 "Restricted user experience" ×4; `assigned-access/configuration-file` Win11 `v5:StartPins` sample ×2 (1 top-level + 1 inside `secondaryTile`); plus 4 further sample lines across those pages |
| `desktopAppID` | **1** | the key table only — **zero** worked samples on any page fetched. `[NOT-FOUND: no sample confirms this key's casing]` |
| `desktopAppLink` | many | table **and** every sample, consistently camelCase |

**Recommendation: ship `packagedAppId` (sample casing).** JSON keys are case-sensitive; a copy-pasteable payload must use the casing that parses, and 19 worked samples across three separate pages beat one table cell. Add one caution line noting the table-vs-sample divergence so a reader who consults Learn's table isn't confused. CONTEXT.md D1.10 said "all eight worked samples" — the real count is higher and spread across three pages, which strengthens the ruling.

**`desktopAppID`: resolved by avoidance.** The worked payload uses `desktopAppLink` (sample-confirmed in both cases) and never `desktopAppID`. Its casing therefore never becomes load-bearing. Record it in the decomposition table with an explicit *"casing unconfirmed by any sample"* note rather than leaving the divergence flagged-but-open.

#### `applyOnce` — D1.11 RESOLVED: **omit**

The `start/layout` page was updated `2026-07-21`, eight days before this research, and now carries a version gate that did not exist when the milestone research was written.

`[VERIFIED: start/layout, § "Change the configuration file", Windows 11 pivot, step 2]`:

> *"The `applyOnce` property is supported starting with Windows 11, version 24H2 with [KB5062660], and it's ignored on earlier versions of Windows 11.*
> - *When set to **true**, the pinned list is applied only once. Users can modify the list afterward, and their changes won't be overwritten on future logins.*
> - *When set to **false**, the pinned list is reapplied at every login, resetting any user changes."*

The page's own Win11 standalone-JSON sample opens `{ "applyOnce":false, "pinnedList": [ … ] }`.

**Whether `v5:StartPins` honours `applyOnce` at all: `[NOT-FOUND]`.** The statement above is authored inside the Start-layout *policy* documentation, whose delivery surfaces on the same page are the Settings-catalog **Configure Start Pins** setting, the `Start/ConfigureStartPins` CSP node, GPO and PPKG. No sentence on any page fetched connects `applyOnce` to the AssignedAccess `v5:StartPins` element. D1.11's "no first-party statement covers whether `v5:StartPins` honours it" remains true.

**Four independent reasons to omit:**

1. Both Assigned Access pages' own `v5:StartPins` samples omit it — `assigned-access/configuration-file` ships `{ "pinnedList":[…] }` and `assigned-access/examples` ships `{ "pinnedList":[…] }`. The only sample that includes it is the *standalone* Start-layout JSON on a different page.
2. It is *"ignored on earlier versions of Windows 11"* and the recipe's floor is 22H2, so on the floor version it is a documented no-op. A bounded payload should not teach a key that does nothing at its own stated floor.
3. `false` — reapply at every login, resetting user changes — is the kiosk-correct semantics *and* is what absence produces.
4. Whether the element honours it is NOT-FOUND, so including it would be shipping an unverified key in a copy-pasteable artifact.

**One caution line to ship** (satisfying D1.11's "if omitted, say so"): an `Export-StartLayout` JSON exported from a 24H2 device may contain an `applyOnce` key; the worked payload omits it, kiosk behaviour is the `applyOnce: false` behaviour either way, and no first-party statement covers whether `v5:StartPins` honours the key.

`Export-StartLayout` on Windows 11 `[VERIFIED: start/layout, § "Export the Start layout configuration", Windows 11 pivot]`: `Export-StartLayout -Path "C:\Layouts\LayoutModification.json"` — note **no** `-UseDesktopApplicationID` flag on the Win11 pivot (that flag is Windows-10-only), and the export is JSON, not XML.

#### Does the payload validate against the published XSD as a standalone document?

**Recommendation: do not promise XSD validation in the recipe.** The honest position:

- The XSDs are published as **page text**, not as fetchable `.xsd` files at stable URLs. `[VERIFIED: assigned-access/xsd]` — the page presents five separate schema documents (targetNamespaces `2017/config`, `2022/config`, `2021/config`, `2020/config` + `202010/config`, `201810/config`) in fenced code blocks. The 2017 schema `xs:import`s the other four **without** `schemaLocation` attributes, so a validator cannot resolve them automatically.
- To validate locally an author must save each fragment as a separate file and hand all of them to the processor as a schema set.
- The three add-on schemas declare `xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning"` and `vc:minVersion="1.1"` `[VERIFIED: assigned-access/xsd, §§ "Windows 11, version 22H2 additions", "Windows 11, version 21H2 additions", "Windows 10, version 1909 additions"]`, so a fully-conformant validation needs an XSD 1.1 processor. `[ASSUMED]` that the common Windows-native option (.NET `XmlSchemaSet`) is XSD-1.0-only and will reject or ignore this — not verified this session.

**What to ship instead — two checks that are genuinely admin-executable:**

1. **Well-formedness, before pasting into Intune.** `[UNVERIFIED — standard PowerShell, not fetched]` `$x = [xml](Get-Content .\kiosk.xml -Raw)` throws on the errors that actually happen: an unescaped `&` in a path or app name, a mismatched tag, a broken `CDATA` boundary, a truncated copy-paste.
2. **Device-side schema acceptance.** A malformed or schema-invalid payload surfaces as a profile-parse/apply error in the `AssignedAccess > Operational` channel (§3.C), which is already SC5's mechanism. `[VERIFIED: kiosk-mode-issues-troubleshooting, § "Multi-app kiosk issues" → "Unexpected results" → "Troubleshooting steps", step 3]`: *"Verify that the configuration XML file is authored and formatted correctly. Correct any configuration errors, then create and apply a new provisioning package. Sign out and sign in again to check the new configuration."*

State in the recipe that XSD validation is possible but requires assembling five schema documents by hand, and that the two checks above are the practical author-time gate. Do not claim the payload "validates as a standalone document" — it cannot, without local schema assembly.

### 1.B — Field-decomposition table (22 data rows — C17 `#11` fires on **>25**)

The second surface per D1.1. Carries decision-relevant semantics in indexed body text. Per D1.9(3) the `v5:StartPins` JSON key set ships as rows here while the raw payload ships in the fence — both, not either. Learn's own precedent for decomposing this identical JSON into a `| Key | Description |` table is `start/layout`'s key table, quoted in §1.A.

**This table is explicitly not a schema statement** (D1.12) — say so in the lead-in, and state there that `Taskbar` must follow `v5:StartPins` in the fence.

| # | Field | What it is | Decision-relevant semantics |
|---|---|---|---|
| 1 | `AssignedAccessConfiguration` | Document root | The whole document is the single value of the `Configuration` CSP node — one document, one profile set |
| 2 | `xmlns` (2017) | Unprefixed default namespace | Mandatory on every payload including Windows 11. Children are written bare. `default` is an XSD-internal prefix, never writable here |
| 3 | `xmlns:v5` (2022) | Add-on namespace alias | Required whenever `v5:StartPins` is present. Omitting it makes the payload unparseable |
| 4 | `Profiles` | Container | One or more `Profile`; a file may hold multiple `AllAppList` profiles but only one `KioskModeApp` profile |
| 5 | `Profile/@Id` | Braced GUID, **required** | Schema pattern requires the enclosing braces. Must match `DefaultProfile/@Id` exactly. Generate with `New-Guid` |
| 6 | `AllAppsList` | Profile-type element | Selects the **restricted user experience**. Its presence excludes `KioskModeApp` in the same profile (schema `xs:choice`) — and therefore excludes `BreakoutSequence` |
| 7 | `AllowedApps` | Allow-list container | At least one `App`. AppLocker rules are generated from this list |
| 8 | `App/@AppUserModelId` | UWP app AUMID | Use for Store/UWP/inbox apps. A UWP update can change the AUMID and silently break the entry |
| 9 | `App/@DesktopAppPath` | Full path to a desktop `.exe` | Supports `%variableName%` environment variables. **Single** backslashes — this is XML, not JSON |
| 10 | `rs5:FileExplorerNamespaceRestrictions` | **Not in the worked payload** | Folder browsing is locked down by default in a restricted user experience; this node is the only way to open Downloads or removable drives back up. Adding it also requires declaring the `rs5` (and for removable drives, `v3`) namespace |
| 11 | `v5:StartPins` | Start layout for Windows 11 | Windows 11 22H2+. Content is **JSON inside CDATA**, not XML. Windows 10 uses `StartLayout` with XML instead |
| 12 | `pinnedList` (JSON) | Array of pin objects | The set of tiles the kiosk Start menu shows. A pin whose app isn't installed for the signing-in user simply doesn't appear — no error |
| 13 | `packagedAppId` (JSON) | UWP pin, by AUMID | **Casing:** every worked sample uses `packagedAppId`; Learn's key table says `packagedAppID`. JSON keys are case-sensitive — use the sample casing |
| 14 | `desktopAppLink` (JSON) | Desktop pin, by `.lnk` path | **Doubled** backslashes — this is a JSON string. The `.lnk` must already exist on the device at that path |
| 15 | `desktopAppID` (JSON) | Desktop pin, by AUMID | Alternative to `desktopAppLink` when the desktop app has an AUMID. Casing is unconfirmed by any published sample — prefer `desktopAppLink` |
| 16 | `secondaryTile` (JSON) | Microsoft Edge pinned site | Requires adding `msedge.exe`, `msedge_proxy.exe` **and** the Edge AUMID to `AllowedApps`. Out of this recipe's field set |
| 17 | `applyOnce` (JSON) | Apply-pins-once switch | Windows 11 24H2 + KB5062660 only; ignored on earlier Windows 11. Omitted here; absence gives the reapply-every-login behaviour a kiosk wants |
| 18 | `Taskbar` | **Mandatory** element | `minOccurs="1"` — a payload without it is schema-invalid. Must come **after** `v5:StartPins` |
| 19 | `Taskbar/@ShowTaskbar` | **Required** boolean | `false` hides the taskbar permanently — not the tablet-mode auto-hide behaviour. Pinning apps to the taskbar needs `v5:TaskbarLayout`, out of this recipe's field set |
| 20 | `Configs` / `Config` | Profile-to-identity binding | **This is the effective-configuration scope** — separate from Intune's assignment scope |
| 21 | `UserGroup/@Type` | `LocalGroup` \| `ActiveDirectoryGroup` \| `AzureActiveDirectoryGroup` | A `UserGroup` `Config` can only reference a restricted-user-experience profile, never a kiosk profile. Nested groups are not supported |
| 22 | `UserGroup/@Name` | Group identifier | For `AzureActiveDirectoryGroup` this is the **object ID**, not the display name. The device needs internet connectivity when a member of the group signs in |

**Prose summary line within 5 lines of the table** (D1.5 — the validator's own sanctioned remedy for `#11`, and good writing regardless). Something like: *"In short: `AllAppsList` decides what may run, `v5:StartPins` decides what the user sees, `Taskbar` is mandatory and must come last, and `Configs` decides who gets the experience — a separate question from which devices receive the policy."*

### 1.C — Namespace / version-floor table (D1.6's exact 3 rows) — verification

The published version table, `[VERIFIED: assigned-access/configuration-file, § "Versioning"]`, verbatim and complete:

| Version | Alias | Namespace |
| --- | --- | --- |
| Windows 11, version 22H2 | `v5` | `http://schemas.microsoft.com/AssignedAccess/2022/config` |
| Windows 11, version 21H2 | `v4` | `http://schemas.microsoft.com/AssignedAccess/2021/config` |
| Windows 10 | `v5` | `http://schemas.microsoft.com/AssignedAccess/202010/config` |
| Windows 10 | `v3` | `http://schemas.microsoft.com/AssignedAccess/2020/config` |
| Windows 10 | `rs5` | `http://schemas.microsoft.com/AssignedAccess/201810/config` |
| Windows 10 | default | `http://schemas.microsoft.com/AssignedAccess/2017/config` |

Findings against D1.6:

- **The `v5` double-binding defect is confirmed.** Alias `v5` is bound to `2022/config` (row 1) *and* `202010/config` (row 3). D1.6's instruction to note it stands.
- **The 2017 row's alias cell literally reads `default`** — confirming both that `REQUIREMENTS.md:15`'s "base 2017" is a paraphrase (Corrections item 4) *and* that a reader could mistake `default` for a writable prefix, which is exactly why T-7 exists.
- **The published table's version column names Windows builds, not namespace years.** D1.6's instruction to label the recipe's column by namespace **year** is a deliberate, correct divergence — it is the only way to state three rows without implying that `2017/config` is a "Windows 10" row that a Windows 11 admin can drop. Keep it, and keep the *"(root)"* qualifier in the year cell.
- `StartLayout` is confirmed to live in the **2017 root** namespace: `<xs:element name="StartLayout" type="xs:string" minOccurs="0" maxOccurs="1"/>` sits inside `profile_t` in the schema whose `targetNamespace` is `…/2017/config`, and every sample writes it bare as `<StartLayout>`. `[VERIFIED: assigned-access/xsd]`. KIOSK-02's "`StartLayout` lives here, not v4" is correct.
- `v4` adds exactly `ClassicAppPath`, `ClassicAppArguments` and `BreakoutSequence`; `v5` (2022) adds exactly `StartPins` and `TaskbarLayout`. `[VERIFIED: assigned-access/xsd, §§ "Windows 11, version 21H2 additions" and "Windows 11, version 22H2 additions"]` — both fragments are two or three declarations long and can be read in full.
- **No mismatch failure mode is documented.** `[NOT-FOUND]` — nothing on any page fetched states what happens when a `v5` element is sent to a 21H2 device. KIOSK-02's bar on asserting one holds. **T-6 holds:** Learn is silent on whether 21H2 has an equivalent multi-app Start-layout mechanism.

---

## 2. The OMA-URI Delivery Step

### 2.A — GATE 1, re-cited fresh (KIOSK-01's "re-cites fresh at authoring")

`[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/templates/configure-kiosk, § "Create the profile", step 7, Note nested under the **Multi app kiosk** bullet]` — `ms.date: 2026-02-10`, `updated_at: 2026-07-01`, fetched 2026-07-29:

> *"Currently, you can use Intune to configure a multi-app kiosk on Windows 10 devices. For more information about Windows 11 multi-app kiosk support, go to [Set up a multi-app kiosk on Windows 11 devices](/en-us/windows/configuration/lock-down-windows-11-to-specific-apps)."*

**Unchanged from the `STACK.md:13-16` discharge. The gate stays discharged.** Two supporting sentences worth having:

- `[VERIFIED: same page, intro]` *"Intune supports one kiosk profile per device. If you need multiple kiosk profiles on a single device, you can use a [Custom OMA-URI]."*
- `[VERIFIED: assigned-access/configure-multi-app-kiosk, "Settings" tab]` *"This option isn't available using Settings."*

The Templates → Kiosk click-path, for the anti-feature row that names the wrong-GUI trap concretely: `[VERIFIED: configure-kiosk, § "Create the profile"]` **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy**; **Platform**: *Windows 10 and later*; **Profile type**: *Templates* > *Kiosk*; then **Configuration settings** > **Select a kiosk mode** > *Multi app kiosk*. That last option is the trap — reachable on a Windows 11 target, documented as Windows-10-only.

### 2.B — The mechanism

`[VERIFIED: assigned-access/configure-multi-app-kiosk, "Intune/CSP" tab]`, complete and verbatim:

> *"You can configure devices using a [custom policy] with the [AssignedAccess CSP].*
> - ***Setting:** `./Vendor/MSFT/AssignedAccess/Configuration`*
> - ***Value:** content of the XML configuration file*
>
> *Assign the policy to a group that contains as members the devices that you want to configure."*

**Note what is absent: this page states no Data type.** That is a genuine gap, and it is the field admins get wrong.

### 2.C — The Data type — resolved by inference, labelled as such

`[VERIFIED: learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp, § "Configuration", **Description framework properties**]`:

| Property name | Property value |
| --- | --- |
| Format | `chr` (string) |
| Access Type | Add, Delete, Get, Replace |

`[VERIFIED: same page, § "Configuration"]` *"This node accepts an AssignedAccessConfiguration xml as input."*

`[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/templates/configure-custom-settings-windows, § "OMA-URI settings"]` — the complete **Data type** dropdown, verbatim:

> - *Base64 (file)*
> - *Boolean*
> - *String (XML file)*
> - *Date and time*
> - *String*
> - *Floating point*
> - *Integer*

**Recommendation: `String`.** Basis, stated honestly:

1. The CSP node's Format is `chr` (string) `[VERIFIED]`.
2. Direct first-party analogue: for a *different* CSP node whose documented Value is *"content of the XML file"*, Learn's CSP tab states the Data type explicitly. `[VERIFIED: start/layout, § "Deploy the Start layout configuration", CSP tab, Windows 10 pivot]`: *"**OMA-URI:** `./User/Vendor/MSFT/Policy/Config/Start/`StartLayout — **Data type:** String — **Value:** content of the XML file."* An XML-payload-valued CSP node documented as **String**, not "String (XML file)".
3. **`[NOT-FOUND]`** — no first-party sentence on any page fetched states which Intune Data type to select for `./Vendor/MSFT/AssignedAccess/Configuration`.

State it in the recipe as **String**, with the value pasted into the **Value** box as text. `String (XML file)` is the upload-a-file variant and is the plausible wrong pick; the recipe should name it as the wrong pick so the reader doesn't reach for it, but should not claim first-party support for the exclusion. This is the one MEDIUM-confidence item in the delivery step and it should be tagged as such in the phase SUMMARY.

Intune-deliverability, confirmed both ways: `[VERIFIED: configure-custom-settings-windows, § "Find the policies you can configure"]` *"To work with Intune, the setting must support the **Add**, **Replace**, and **Get** operations. If the value returned by the **Get** operation doesn't match the value supplied by the **Add** or **Replace** operations, then Intune reports a compliance error."* `Configuration` supports Add/Delete/Get/Replace → deliverable. `Status` supports **Get** only `[VERIFIED: assignedaccess-csp, § "Status", Access Type]` → **not** deliverable. KIOSK-03's `AssignedAccess/Status` anti-feature row is confirmed against the exact rule that makes it true, and note the phrasing: not deliverable, *not* "impossible".

### 2.D — Click-path

`[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/templates/configure-custom-settings, § "Create the profile"]`, verbatim, `ms.date: 2026-02-05`, `updated_at: 2026-07-01`:

1. *Sign in to the Microsoft Intune admin center.*
2. *Select **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy**.*
3. *Enter the following properties: **Platform**: … **Windows 10 and later**. **Profile type**: Select **Custom**. Or, select **Templates** > **Custom**.*
4. *Select **Create**.*
5. *In **Basics**, enter the following properties: **Name**… **Description**…*
6. *Select **Next**.*
7. *In **Configuration settings**…* → then the per-platform OMA-URI rows.
8. *Select **Next**.*
9. *In **Scope tags** (optional)…* → *Select **Next**.*
10. *In **Assignments**, select the users or groups that will receive your profile.* → *Select **Next**.*
11. *In **Review + create**, review your settings. When you select **Create**, your changes are saved, and the profile is assigned.*

The OMA-URI row fields, `[VERIFIED: configure-custom-settings-windows, § "OMA-URI settings"]`: **Name** (*"a unique name for the OMA-URI setting"*), **Description**, **OMA-URI** — the page states **(case sensitive)** — **Data type**, **Value** (*"Enter the data value you want to associate with the OMA-URI you entered"*).

**Assignment scope:** assign to a **device** group. `[VERIFIED: configure-multi-app-kiosk, "Intune/CSP" tab]` *"Assign the policy to a group that contains as members the devices that you want to configure."* Note the tension worth one sentence: the generic custom-profile page says *"select the users or groups"*, while the AssignedAccess page specifically says **devices**. `Configuration` is a Device-scope node (`✅ Device ❌ User` `[VERIFIED: assignedaccess-csp, § "Configuration", Scope]`), so the device-group instruction is the correct one. This is D4.4's two-scope distinction in its most concrete form.

### 2.E — Drift-prone, and one genuine gotcha

**Likely to drift:** the `Devices` > **Manage devices** > `Configuration` segment. "Manage devices" is a recent nav grouping, and older Learn revisions read *Devices > Configuration profiles > Create profile*. Both fetched pages agree on the current form as of `updated_at: 2026-07-01`. Write the path once, and consider a hedge phrase such as *"(the Configuration blade under Devices)"* so a nav rename does not falsify the step.

**The gotcha, worth a `What breaks if misconfigured` callout** `[VERIFIED: configure-custom-settings-windows, § "OMA-URI settings", Note]`:

> *"For settings created using a string, base64, or XML data type, the stored value is obscured. If the user who is accessing the value has any of the following permissions or roles, they can see the value:*
> - *A Microsoft Intune role that has the **Device configurations** > **Create**, **Read**, and **Update** permissions, like the **Policy and Profile manager** Intune built-in role.*
> - *Intune Administrator Microsoft Entra role"*

After saving, an admin without those permissions cannot read the XML back. Keep the authored XML in source control — the portal is not a reliable copy of it.

---

## 3. Author-Time Verification Items CONTEXT.md Deferred

### 3.A — B-6 / D2.5: `Remove Logoff`, `Remove Task Manager`, `Remove Change Password`, `IdleTimeOut` — **ALL FOUND. Cite, do not cut.**

The three GPO settings live on a page CONTEXT.md's canonical-refs list does not name: **`learn.microsoft.com/en-us/windows/configuration/assigned-access/policy-settings`**. It is reachable from `assigned-access/overview` (*"For more information, see [Assigned Access policy settings](policy-settings)"*) and from `recommendations` (*"For a list of these policies, see [Assigned Access policy settings](policy-settings)"*). **Add it to the recipe's citation set.**

`[VERIFIED: assigned-access/policy-settings, § "User policy settings"]` — the scoping sentence, verbatim:

> *"The following policy settings are applied to targeted user accounts when you deploy a restricted user experience:"*

**That is exactly RE-224's scope** — the restricted user experience, targeted user accounts. And the three rows, verbatim from that table:

| Type | Path | Name/Description |
| --- | --- | --- |
| **GPO** | User Configuration\Administrative Templates\System\Ctrl+Alt+Del Options | Remove Change Password |
| **GPO** | User Configuration\Administrative Templates\System\Ctrl+Alt+Del Options | Remove Logoff |
| **GPO** | User Configuration\Administrative Templates\System\Ctrl+Alt+Del Options | Remove Task Manager |

`Remove Logoff` is **unhyphenated** in the first-party name, confirming T-5's second defect. The `Ctrl+Alt+Del Options` grouping is the literal GPO category. All three are applied automatically — the recipe states them as *consequences of deploying the profile*, never as steps the admin performs.

Also on that page and materially important, `[VERIFIED: assigned-access/policy-settings, § "Device policy settings"]`:

> *"The following policy settings are applied at the device level when you deploy a restricted user experience. Any user accessing the device is subject to the policy settings, **including administrator accounts**:"*

Seventeen device-scope CSP rows follow (Cortana off, all Start pinned-folder icons off, `HideChangeAccountSettings`, update notifications suppressed, ink workspace off, `DontDisplayNetworkSelectionUI`). Worth one line in Prerequisites or the anti-feature table: deploying this profile changes the device for *every* user on it, admins included. That is a genuine surprise and it is first-party.

`[VERIFIED: assigned-access/policy-settings, § "Keyboard shortcuts"]` — the **blocked** list (the complement of `recommendations`' unblocked list), intro verbatim: *"The following keyboard shortcuts are blocked for the user accounts with Assigned Access:"* — includes `Ctrl + Shift + Esc` (Task Manager), `WIN + R` (Run), `WIN + E` (File Explorer), `WIN + I` (Settings), `WIN + X`, `WIN + D`, `WIN + Q`/`WIN + S` (search), and eleven more. **These are excellent Verification lines** — genuinely admin-executable, unambiguous, and they need no event log.

#### `IdleTimeOut` and the 30-second default — FOUND, with a scope qualification

`[VERIFIED: assigned-access/configure-multi-app-kiosk, § "User experience" → "Sign out of assigned access"]`, verbatim:

> *"By default, to exit the kiosk experience, press Ctrl + Alt + Del. The kiosk app exits automatically. If you sign in again as the Assigned Access account, or wait for the sign in screen time-out, the kiosk app relaunches. **The default time-out is 30 seconds**, but you can change the time-out with the registry key:*
> *`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI`*
> *To change the default time for Assigned Access to resume, add *IdleTimeOut* (DWORD) and enter the value data as milliseconds in hexadecimal."*
>
> *Note: "`IdleTimeOut` doesn't apply to the Microsoft Edge kiosk mode."*

**The key, the path, the type, the units and the 30-second default are all first-party.** B-6 is discharged: cite, do not cut.

⚠ **Scope qualification — do not skip this.** The section sits on the multi-app page under `## User experience`, but its prose uses singular single-app language (*"the kiosk app exits"*, *"the kiosk app relaunches"*), and the very next paragraph reads *"The Breakout Sequence of Ctrl + Alt + Del is the default, but this sequence can be configured to be a different sequence of keys"* — which is **schema-illegal in an `AllAppsList` profile** (`BreakoutSequence` exists only in the `KioskModeApp` branch; §1.A). So this paragraph is demonstrably mixed-scope single-app content sitting on the multi-app page. Two consequences:

1. **CONTEXT.md D2.5's A-4 instruction is vindicated exactly** — do not import Pitfall 7's *"(default; configurable)"* parenthetical. The configurability is `BreakoutSequence`, barred by KIOSK-02.
2. Cite the 30-second relaunch time-out **as documented on the multi-app kiosk page**, and do not additionally assert that it is verified for a multi-app profile specifically. Suggested wording: *"On the multi-app kiosk page Microsoft documents a 30-second sign-in-screen time-out after which the kiosk relaunches, adjustable via `IdleTimeOut` (DWORD, milliseconds in hex) under `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI`."* That is true, sourced, and does not overclaim.

The temporary-vs-permanent pairing A-4 needs is fully sourced from the same passage: Ctrl+Alt+Del exits the **running session only**, and the kiosk relaunches on re-sign-in **or** after the sign-in-screen time-out. The permanent path is policy unassignment (§3.E).

### 3.B — D5.5: the VM / vTPM `0x800705B4` limitation

`[VERIFIED: learn.microsoft.com/en-us/autopilot/self-deploying, § "Requirements", Important]`, verbatim:

> *"If a self-deploying mode deployment is attempted on a device that doesn't have support for TPM 2.0 or on a virtual machine, the process fails when verifying the device with an **0x800705B4** timeout error. This limitation includes Hyper-V virtual TPMs."*

**Confirmed NOT covered by the anchor.** Re-run this session:

```
grep -ciE 'virtual machine|hyper-v|0x800705B4|vTPM' docs/admin-setup-apv1/08-self-deploying.md docs/recipes/01-shared-windows-avd-client.md
→ docs/admin-setup-apv1/08-self-deploying.md:0
→ docs/recipes/01-shared-windows-avd-client.md:0
```

A-7 holds: not anchor-owned, so stating it in-recipe is delta-legal. **Recommendation: state it as one Prerequisites bullet.** It is the single most likely reason a reader's first attempt fails, and it fails at the *enrollment* stage — before any kiosk configuration is even in play — so leaving it to the SUMMARY as NOT-COVERED-BY-ANCHOR wastes it.

Companion VM fact, separately scoped, `[VERIFIED: assigned-access/configure-multi-app-kiosk, § "User experience" → "Autotrigger touch keyboard", Tip]`: *"The touch keyboard is triggered only when tapping a textbox. Mouse clicks don't trigger the touch keyboard. If you're testing this feature, use a physical device instead of a virtual machine (VM), as the touch keyboard isn't triggered on VMs."* Two independent reasons not to pilot on a VM — but keep them as two facts, not one welded sentence.

Also confirmed for Prerequisites, `[VERIFIED: autopilot/self-deploying, § "Requirements"]`: *"Self-deploying mode uses a device's Trusted Platform Module (TPM) 2.0 hardware to authenticate the device into an organization's Microsoft Entra tenant. Therefore, devices without TPM 2.0 can't be used with this mode. **Devices must also support TPM device attestation.**"*

⚠ **Ethernet-at-OOBE needs a precision fix — see Concerns #8.** `[VERIFIED: autopilot/self-deploying, intro]`: *"For devices with an Ethernet connection, no user interaction is required. For devices connected via Wi-Fi, the user must only: Select the language, locale, and keyboard. Make a network connection."* Ethernet is required for a **fully userless** OOBE; Wi-Fi works with minimal interaction. Do not state Ethernet as a hard requirement.

### 3.C — D3.1 / D3.2: the `Operational` channel, the enable procedure, and Event 31000

#### The enable procedure — exact Event Viewer path and action

`[VERIFIED: assigned-access/recommendations, § "Troubleshooting and logs"]`, verbatim:

> *"When testing Assigned Access, it can be useful to enable logging to help you troubleshoot issues. Logs can help you identify configuration and runtime issues. You can enable the following log: **Applications and Services Logs** > **Microsoft** > **Windows** > **AssignedAccess** > **Operational**."*

`[VERIFIED: learn.microsoft.com/en-us/troubleshoot/windows-client/shell-experience/kiosk-mode-issues-troubleshooting, § "Multi-app kiosk issues" → "Unexpected results" → "Troubleshooting steps", step 4]`, verbatim:

> *"Additional logs about configuration and runtime issues can be obtained by enabling the *Applications and Services Logs\Microsoft\Windows\AssignedAccess\Operational* channel, **which is disabled by default**."*

**T-3's first half confirmed, on the multi-app section of the page.** The **enable action** is first-party too, in the image alt text immediately below that step: *"Screenshot of Event Viewer with **Enable Log** selected on the menu, which shows by right-clicking **Operational**."* → right-click **Operational** → **Enable Log**.

#### The one-time-events caveat — verbatim, with its heading

`[VERIFIED: kiosk-mode-issues-troubleshooting, § "**Single-app kiosk issues**", Tip]`, verbatim:

> *"We recommend that you [enable logging for kiosk issues]. For some failures, events are only captured once. If you enable logging after an issue occurs with your kiosk, the logs may not capture those one-time events."*

⚠ **Do not present the two quotes as co-located — see Concerns #4.** They are on the same page but under **different H2s**: the "disabled by default" statement is under `## Multi-app kiosk issues`; the one-time-events Tip is under `## Single-app kiosk issues`. The Tip's own link target is the `recommendations#troubleshooting-and-logs` section, which covers Assigned Access generally, so applying it to multi-app is well-founded — but it is an inference from placement, not a co-located pair. Record both headings.

**D3.1's disposition is correct and now fully executable.** Retain SC5's *"clean `AssignedAccess > Operational`"* line verbatim; add the enable-before-first-sign-in step with the exact path and the right-click → Enable Log action; add Event 31000 absence as an additional secondary line; frame the logged correction as *incomplete, not wrong*.

#### `Microsoft-Windows-AssignedAccess/Admin` Event ID 31000

`[VERIFIED: learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/users-cannot-logon-windows-multi-app-kiosk, § "Symptoms", third bullet ("Assigned Access - Admin logs")]`, verbatim:

> *"Log Name: Microsoft-Windows-AssignedAccess/Admin Source: Microsoft-Windows-AssignedAccess Date: &lt;Timestamp&gt; Event ID: 31000 Task Category: Applying Assigned Access for current user. Level: Error User: &lt;User SID&gt; Computer: &lt;Computer Name&gt; Description: Error Unspecified error applying assigned access for current user, signing out..."*

The `Admin` channel is enabled by default (it is a standard Admin channel and the article instructs the reader to read it without any enable step) — `[ASSUMED]`; no page fetched states "the Admin channel is enabled by default" in so many words. Phrase the recipe line as *"check `Microsoft-Windows-AssignedAccess/Admin` for Event ID 31000"* rather than asserting the channel's default state.

#### D3.2's split precondition — confirmed, and a bonus mechanism for the admin-side half

The seam is right, and the admin-at-console half now has a real first-party check beyond "enable the log". `[VERIFIED: assigned-access/recommendations, § "Troubleshooting and logs"]`:

> *"The following registry keys contain the Assigned Access configurations:*
> - *`HKLM\Software\Microsoft\Windows\AssignedAccessConfiguration`*
> - *`HKLM\Software\Microsoft\Windows\AssignedAccessCsp`*
>
> *The following registry key contains the configuration for each user with an Assigned Access policy:*
> - *`HKCU\SOFTWARE\Microsoft\Windows\AssignedAccessConfiguration`*"*

**Use `HKLM\Software\Microsoft\Windows\AssignedAccessCsp` as the "the profile arrived" check** in the admin-at-console-before-first-kiosk-sign-in step. It is device-scope, readable without the kiosk account signing in, and it distinguishes *policy did not arrive* from *policy arrived but the account isn't in scope* — which is exactly D4.4's two-scope failure mode. The `HKCU` key is per-user and therefore only populated after the kiosk account signs in, which independently corroborates D3.2's seam.

Two more sequencing facts for the Verification section, `[VERIFIED: assigned-access/configure-multi-app-kiosk, § "User experience"]`: *"To validate the kiosk configuration, sign in with the user account you specified in the configuration file."* and *"The Assigned Access configuration takes effect the next time the targeted user signs in. If that user account is signed in when you apply the configuration, sign out and sign back in to validate the experience."*

### 3.D — D5.5: UAC and "must sign in from the console / not over RDP" — **RULED: do NOT state them**

`[VERIFIED: learn.microsoft.com/en-us/windows/configuration/assigned-access/overview]` — `ms.date: 2026-07-15`, `updated_at: 2026-07-21` (fetched 2026-07-29). The page's own definitions, verbatim:

> *"When you configure a **kiosk experience**, a single Universal Windows Platform (UWP) application or Microsoft Edge is executed in full screen, above the lock screen. Users can only use that application. If the kiosk app is closed, it automatically restarts."*
>
> *"When you configure a **restricted user experience**, users can only execute a defined list of applications, with a tailored Start menu and Taskbar. Different policy settings and AppLocker rules are enforced, creating a locked down experience."*

And `§ "System requirements"`, complete and verbatim:

> *"Here are the requirements for Assigned Access:*
> - *To use a **kiosk experience**, [User account control (UAC)] must be enabled*
> - *To use a **kiosk experience**, you must sign in from the console. The kiosk experience isn't supported over a remote desktop connection"*

**RULING: neither requirement is stated for the restricted user experience.** Both bullets self-scope in their own opening clause to *"To use a kiosk experience"*, and the page defines that term as the single-app case. RE-224 is the restricted user experience. **Do not state UAC-enabled. Do not state console-only / no-RDP.**

Recorded precisely, because D5.5 says getting the scope wrong *in either direction* is a defect: the two bullets sit under a section whose lead-in is *"Here are the requirements for Assigned Access"* — a heading that covers both experiences. The **section-level** framing is broader than the **bullet-level** scoping. The bullet-level scoping is explicit and narrower, so it governs. What is NOT established is any first-party sentence saying the restricted user experience *does* work over RDP or *does not* need UAC — that is `[NOT-FOUND]` in both directions. The recipe should be silent, not reassuring.

Corroborating signal, worth noting but not load-bearing: `[VERIFIED: kiosk-mode-issues-troubleshooting]` places *"Verify that User Account Control (UAC) is turned on"* under `## Single-app kiosk issues` → `### Sign-in issues`. The `## Multi-app kiosk issues` section has no UAC step. Two independent pages scope UAC to the single-app case.

#### Edition floors

`[VERIFIED: assigned-access/overview, § "Windows edition requirements"]`, verbatim and complete:

> *"The following list contains the Windows editions that support Assigned Access:*
> *✅ Pro ✅ Enterprise / Enterprise LTSC ✅ Education ✅ IoT Enterprise / IoT Enterprise LTSC"*

**D5.2's four families with LTSC spelled out are exactly this list.** Cite `overview` for it, not `assignedaccess-csp` — the CSP page's per-node tables read *"✅ Pro ✅ Enterprise ✅ Education ✅ IoT Enterprise / IoT Enterprise LTSC"*, without the `Enterprise LTSC` spelling. `[VERIFIED: assignedaccess-csp, § "Configuration"]`.

**"Pro Education" is `[NOT-FOUND]`** — the string does not appear on `overview` or `assignedaccess-csp`. **C-2e's footnote directive stands: ship *"assumed same as Pro, unconfirmed by name."***

⚠ **The "identical for both" clause needs care — see Concerns #7.** The page states **one** undifferentiated edition list for "Assigned Access", covering both experiences; there is no per-experience split anywhere on it. `PITFALLS.md:67`'s mandated clause *"identical for both single-app and multi-app Assigned Access"* is a correct **characterization** of that single list, but it is not a verbatim first-party sentence. Ship the clause (it is mandated and it is true), but do not present it inside quotation marks as a Microsoft statement.

Also confirmed: `ShellLauncher` is `❌ Pro` `[VERIFIED: assignedaccess-csp, § "ShellLauncher"]` — *"Shell Launcher as a feature and the ShellLauncher node both require Windows Enterprise or Windows Education to function. The ShellLauncher node is not supported in Windows 10 Pro."* Good for the `**This recipe is NOT:**` line.

### 3.E — D2.5 retained items: removal, Autopilot Reset, autologon breakers

**Removal is not rollback** `[VERIFIED: assigned-access/configure-multi-app-kiosk, § "Remove Assigned Access"]`, verbatim:

> *"Deleting the Assigned Access configuration removes the policy settings associated with the users, but it can't revert all the changes. For example, in a multi-app kiosk scenario the Start menu configuration is maintained."*

**Removal is channel-scoped** — same section: *"To remove the Assigned Access configuration, unassign or delete the policy that contains the configuration"* (Intune/CSP tab); *"uninstall the provisioning package"* (PPKG tab); `$obj.Configuration = $null` (PowerShell tab).

**Settings self-service removal is closed** — same section, Settings tab Note, verbatim: *"This option isn't available using Settings if you configured a restricted user experience."*

**Autopilot Reset / self-deploying re-enrollment** `[VERIFIED: autopilot/self-deploying, § "Requirements", Important]`, verbatim: *"A device can't automatically re-enroll through Windows Autopilot after an initial deployment with self-deploying mode. Instead, delete the device record in the [Microsoft Intune admin center]. From the Microsoft Intune admin center, select **Devices** > **All devices** > select the devices to delete > **Delete**."* Ships as KIOSK-04's one negative sentence, plus the unassign-the-policy-first instruction.

**Autologon breakers** — both first-party, and each from a different page, so keep them as two citations:
- `[VERIFIED: assigned-access/configuration-file, § "Configs" → "AutoLogon account", Important]`: *"When Exchange Active Sync (EAS) password restrictions are active on the device, the autologon feature doesn't work. This behavior is by design."*
- `[VERIFIED: autopilot/self-deploying, § "Validation", Note]`: *"Deploying Exchange ActiveSync (EAS) policies using self-deploying mode for kiosk deployments causes autologon functionality to fail."*
- `[VERIFIED: assigned-access/recommendations, § "Kiosk user account" → "Automatic sign-in"]`: *"Ensure that policy settings applied to the device don't prevent automatic sign in from working as expected. For example, the policy settings [PreferredAadTenantDomainName] prevents automatic sign-in from working."*

**`Clear-AssignedAccess`: `[NOT-FOUND]`** — zero occurrences across every page fetched this session. D2.5's exclusion holds.

**The autologon-vs-Entra recovery differential** must stay as two separately-cited facts under `[ASSUMED]`, never synthesized (D2.5). The two facts are: (a) the autologon account is a local standard user that Assigned Access creates and manages `[VERIFIED: assigned-access/configuration-file, § "AutoLogon account"]` — *"With `<AutoLogonAccount>`, Assigned Access creates and manages a user account to automatically sign in after a device restarts. The account is a local standard user."*; (b) an Entra-group `Config` requires internet connectivity at sign-in `[VERIFIED: assigned-access/configuration-file, § "Group accounts" → "Microsoft Entra group"]`. Do not weld them into a claim about which recovers better.

### 3.F — Anti-feature table: every KIOSK-03 row now has a verbatim first-party quote

| Anti-feature row | Verbatim first-party support | Source + section |
|---|---|---|
| Interactive CA / MFA hard-breaks sign-in "by design" | *"This behavior is by design. This issue occurs because the users are targeted by conditional access policies that require user interaction. For example, multi-factor authentication (MFA), or Terms of Use (TOU)."* | `users-cannot-logon-windows-multi-app-kiosk`, § "Cause" |
| — the config-file restatement | *"Don't apply the profile to users or groups that are targeted by conditional access policies that require user interaction. For example, multi-factor authentication (MFA), or Terms of Use (TOU)."* | `assigned-access/configuration-file`, § "Configs" → Limitations |
| Templates GUI is the wrong platform on Windows 11 | *"Currently, you can use Intune to configure a multi-app kiosk on Windows 10 devices."* | `configure-kiosk`, § "Create the profile" step 7 Note |
| Group `Configs` require the restricted-user-experience profile | *"Configs that specify group accounts can't use a kiosk profile, only a restricted user experience profile"* | `assigned-access/configuration-file`, § "Configs" → Limitations |
| Nested `UserGroup` unsupported | *"Group accounts are specified using `<UserGroup>`. Nested groups aren't supported. For example, if User A is member of Group A, Group A is member of Group B, and Group B is used in `<Config/>`, User A doesn't have the kiosk experience."* | `assigned-access/configuration-file`, § "Group accounts" |
| Hardcoded AUMIDs break on app update | *"UWP app updates can sometimes change the Application User Model ID (AUMID) of the app. In such scenario, you must update the Assigned Access settings to execute the updated app, because Assigned Access uses the AUMID to determine the app to launch"* | `assigned-access/recommendations`, § "Choose an app for a kiosk experience" ⚠ **kiosk-experience-scoped list** |
| `Configuration` silently supersedes `KioskModeApp`, still returns SUCCESS | *"starting in Windows 10, version 1803, the KioskModeApp node becomes No-Op if Configuration node is configured on the device. Add/Replace/Delete commands on KioskModeApp node always returns SUCCESS to the MDM server if Configuration node is set, but the data of KioskModeApp will not take any effect on the device. Get command on KioskModeApp will return the configured JSON string even it's not effective."* | `assignedaccess-csp`, § "KioskModeApp", Important |
| SharedPC layering | **`[NOT-FOUND]`** — no statement either way on any page fetched | — |
| `AssignedAccess/Status` not deliverable | Access Type = **Get** (§ "Status") **+** *"To work with Intune, the setting must support the **Add**, **Replace**, and **Get** operations."* | `assignedaccess-csp` § "Status" + `configure-custom-settings-windows` § "Find the policies you can configure" |
| Standard users only — no admin principals in the named group (C-2b) | *"Apply the restricted user experience to standard users only. It's not supported to associate an admin user with an Assigned Access profile"* | `assigned-access/configuration-file`, § "Configs" → Limitations |
| Autologon-arm routing row (D4.3/B-2) | see §3.H below | `assigned-access/recommendations`, § "Kiosk user account" |

Two clean bonus rows if the table has budget, both first-party and both genuinely surprising:

- **New UWP installs are not blocked until the next sign-in.** `[VERIFIED: assigned-access/policy-settings, § "AppLocker rules" → "Universal Windows Platform (UWP) app rules"]`: *"Assigned access doesn't prevent the organization or users from installing UWP apps. When a new UWP app is installed during an Assigned Access session, the app isn't in the deny list. When the user signs out and signs in again, the installed app is included in the deny list."*
- **You cannot manage the generated AppLocker rules.** Same section, Note: *"You can't manage AppLocker rules that are generated by the restricted user experience in MMC snap-ins. Avoid creating AppLocker rules that conflict with AppLocker rules generated by Assigned Access."*

`AppNotFound` stays a named prerequisite symptom (T-4/D3.5), and its provenance is confirmed: `[VERIFIED: assignedaccess-csp, § "Status"]` — status code table row *"| 2 | AppNotFound | The kiosk app isn't deployed to the machine. |"*, plus `status_t`'s `<xs:enumeration value="2"/> <!-- AppNotFound -->`. It is a `Status`-node code, not an event-log entry.

### 3.G — D4.5: app provisioning and the first-sign-in timing hazard

**Two correctly-scoped statements, both about the Start layout, both applicable to a restricted user experience:**

1. `[VERIFIED: assigned-access/configuration-file, § "Start menu customizations", Note immediately after the Windows-11 `v5:StartPins` example]`: *"If an app isn't installed for the user, but is included in the Start layout XML, the app isn't shown on the Start screen."*
2. `[VERIFIED: start/layout, § "Customize the Start layout on a reference device", Windows 11 pivot, Important]`: *"If the Start layout includes pins for apps that aren't installed on the target device, the pins for those apps don't appear until the apps are installed."*

**Both say the same thing and neither reports an error.** That is precisely D4.5's hazard: on a self-deploying device the kiosk identity has never signed in, so the first sign-in can legitimately show a partial or empty pin set with no error surfaced anywhere — which the Verification lines would otherwise read as a genuine failure. Note the Windows 11 wording is *better* than Windows 10's (Win10 pivot: *"the tiles for those apps appear blank. The blank tiles persist until the next time the user signs in."*) — on Win11 the pin is simply absent.

Third, multi-app-scoped, and useful as the diagnostic: `[VERIFIED: kiosk-mode-issues-troubleshooting, § "Multi-app kiosk issues" → "Start layout not as expected"]`: *"Check if the apps included in the Start layout are installed for the assigned access user."* and *"Check if the shortcut exists on the target device, if a desktop app is missing on Start."* — the second is the `desktopAppLink` failure mode exactly.

⚠ **The "must be provisioned or installed" quote is kiosk-experience-scoped — see Concerns #2.** `[VERIFIED: assigned-access/recommendations, § "Choose an app for a kiosk experience", first bullet]`: *"Windows apps must be provisioned or installed for the Assigned Access account before they can be selected as the Assigned Access app."* The list's own lead-in is *"The following guidelines help you choose an appropriate Windows app for a **kiosk experience**"*, and the phrase *"the Assigned Access app"* (singular) is single-app language. Use quotes 1 and 2 as the recipe's support. If quote 3's sentence is used, label it as kiosk-experience guidance.

Also confirmed for the Start-layout step: `[VERIFIED: assigned-access/configuration-file, § "Start menu customizations"]` *"For a restricted user experience profile (`AllAppList`), **you must define the Start layout**."* Note the tension worth one sentence: the prose says *must*, while the XSD makes both `StartLayout` and `v5:StartPins` `minOccurs="0"`. The recipe includes `v5:StartPins`, so it satisfies the prose regardless — but do not tell the reader the element is schema-mandatory, because it is not.

And the dependency rule, `[VERIFIED: assigned-access/configuration-file, § "AllAppList", Note]`: *"If an app has a dependency on another app, both must be included in the allowed apps list."*

### 3.H — D4.1 and D4.3: the account-model scoping, re-verified, plus the autologon row's content

**D4.1's scoping argument is exactly right.** `[VERIFIED: assigned-access/recommendations]`:

The chosen sentence sits in a list whose lead-in is *"When planning to deploy a kiosk **or a restricted user experience**, consider the following recommendations:"* — verbatim: *"Evaluate all applications that users should use. If applications require user authentication, don't use a local or generic user account. Rather, target the group of users within the Assigned Access configuration file."*

The competing sentence is the **last bullet of the preceding list**, whose lead-in is *"The following guidelines help you choose an appropriate Windows app for a **kiosk experience**"* — verbatim: *"The kiosk profile is designed for public-facing kiosk devices. Use a local, nonadministrator account. If the device is connected to your organization network, using a domain or Microsoft Entra account could compromise confidential information."* **Scoped to the kiosk profile. D4.1 confirmed.**

**Input for D4.3's autologon-arm anti-feature row** (the tradeoff the Branch cell routes to). There is a *third* passage, and it is not scoped to the kiosk profile — `[VERIFIED: assigned-access/recommendations, § "Kiosk user account", opening paragraph]`:

> *"For kiosks devices located in public-facing environments, configure as a kiosk account a user account with the least privileges, such as a local, standard user account. Using an Active Directory user or Microsoft Entra user might allow an attacker to gain access to domain resources that are accessible to any domain accounts. When using domain accounts with assigned access, proceed with caution. Consider the domain resources potentially exposed by using a domain account."*

This is the honest counterweight to D4.1's pick, and it is the *"Why it's unsupported / what breaks"* content the autologon row needs: the local-autologon arm's advantage is blast-radius containment on a public-facing device; the Entra-group arm's advantage is that authenticated apps work at all. Both are first-party, both are scoped by device placement rather than by profile type. State the tradeoff in one line, exactly as D4.3 specifies, then route *"Do this instead"* to `01-shared-windows-avd-client.md#step-5a-kiosk-configuration` **explicitly framed as the single-app case**.

The autologon element itself, for the row's accuracy: `[VERIFIED: assigned-access/configuration-file, § "AutoLogon account"]` — `<AutoLogonAccount rs5:DisplayName="…"/>`, requiring the `rs5` namespace; *"The account is a local standard user."*

**D3.3's Entra-arm scoping is first-party.** `[VERIFIED: users-cannot-logon-windows-multi-app-kiosk, § "Symptoms"]`: *"In this situation, the kiosk profile logon type is **Microsoft Entra user** or **Group**."* The failure mode is definitionally Entra-arm-only. Label the check *"Entra account/group only"* exactly as D3.3 requires. And the two error strings, verbatim from the same section, in `Microsoft-Windows-AAD/Operational`, both Event ID 1098:
- *"AADSTS50076: Due to a configuration change made by your administrator, or because you moved to a new location, you must use multi-factor authentication to access '00000003-0000-0000-c000-000000000000'."* (MFA)
- *"AADSTS50158: External security challenge not satisfied. User will be redirected to another page or authentication provider to satisfy additional authentication challenges."* (Terms of Use)

Both prefixed *"Error: 0xCAA2000C The request requires user interaction. Code: interaction_required"*. **D3.3 confirmed: `50158` is Terms of Use, not MFA.** Note the channel is `Microsoft-Windows-AAD/Operational` — a different channel from both AssignedAccess channels; do not conflate.

**D3.6's blast radius** `[VERIFIED: users-cannot-logon-windows-multi-app-kiosk, § "Solution"]`, verbatim: *"To fix this issue, exclude the kiosk users from any conditional access policies that require user interaction, such as MFA or TOU. If the kiosk user is enabled for MFA, disable it because MFA is currently not supported in multi-app kiosk mode scenarios."* With a `<UserGroup>` `Config` this is a per-member identity-security change for every member of the kiosk group. State the scope.

### 3.I — D4.4 / C-2c: the two-scope distinction, scoping re-verified exactly

**C-2c is precisely correct.** `[VERIFIED: assigned-access/configuration-file, § "**User accounts**", Important + the two sentences after it]`, verbatim:

> *"Individual accounts are specified using `<Account>`.*
> *Important: Before applying the Assigned Access configuration, make sure the specified user account is available on the device, otherwise it fails.*
> *For both domain and Microsoft Entra accounts, as long as the device is Active Directory joined or Microsoft Entra joined, the account can be discovered in the domain forest or tenant that the device is joined to. **For local accounts, it is required that the account exist before you configure the account for assigned access.**"*

The availability requirement sits under `### User accounts`, governs `<Account>`, and its own following sentences (a) discharge it for domain/Entra accounts on a joined device and (b) restate it as a hard requirement specifically *"For local accounts"*. **Mention it only as the local-arm contrast, never as a precondition of the worked group path.**

`### Group accounts` carries **no** availability requirement. What it carries instead, `[VERIFIED: assigned-access/configuration-file, § "Group accounts" → "Microsoft Entra group"]`, verbatim:

> *"Use the object ID of the Microsoft Entra group. You can find the object ID on the overview page for the group by signing in to the Microsoft Entra admin center and browsing to **Identity** > **Groups** > **All groups**. Specify the group type as `AzureActiveDirectoryGroup`. **The kiosk device must have internet connectivity when users that belong to the group sign-in.**"*

**That last sentence is the only fact the `What breaks if misconfigured` callout carries.** C-2c confirmed exactly. Bonus: the object-ID-not-display-name requirement, with its own click-path, is a real trap and belongs in the step that fills in `UserGroup/@Name`.

**C-2b's caution line, verbatim** `[VERIFIED: assigned-access/configuration-file, § "Configs" → Limitations]`: *"Apply the restricted user experience to standard users only. It's not supported to associate an admin user with an Assigned Access profile."* The hazard turns on who is named inside the `Config`, not on enrollment mode. Do not claim self-deploying structurally prevents it.

One more first-party fact that fits the two-scope step, `[VERIFIED: assigned-access/configuration-file, § "Configs", Note]`: on Entra-joined and domain-joined devices, local user accounts are not shown on the sign-in screen by default unless `WindowsLogon/EnumerateLocalUsersOnDomainJoinedComputers` is enabled. Relevant only if the reader takes the local/autologon arm; mention it there or not at all.

### 3.J — D4.0: the self-deploying / interactive-Entra-sign-in compatibility

`[VERIFIED: autopilot/self-deploying, § "Validation", final bullet]`, verbatim:

> *"Depending on the device settings deployed, the device will either:*
> - *Remain at the sign-on screen, where any member of the organization can sign in by specifying their Microsoft Entra credentials.*
> - *Automatically sign in as a local account, for devices configured as a kiosk or digital signage."*

**The first documented outcome is the interactive-Entra-sign-in one. D4.0 confirmed compatible with D4.1.** The two axes really are independent, exactly as Area 4 rules.

---

## 4. The HYG-05 Edit

### 4.A — No fourth site: re-verified independently this session

```
grep -rniE "invisible to (the )?(Copilot|retrieval|SharePoint)|silently hide the decision|silently remove the decision|hide the decision from retrieval" docs/ .planning/ scripts/
```

Results in `docs/` — **the shipped corpus** — are **exactly four lines, all in `EEE-SOP-standard.md`, comprising exactly three claim sites**:

| Line | Content | Disposition |
|---|---|---|
| 268 | `block, metadata is invisible to Copilot at query time.` | **D7.4 — DO NOT EDIT.** This is the *metadata/custom-property* claim, which is TRUE and out of scope |
| 462 | `and the standing no-key-info-in-code-fences rule (fenced content is invisible to the Copilot` | **Site 1** |
| 497–498 | `content is invisible to the retrieval body text (see Grounding Notes), so putting the prompt,` / `options, or consequences in a fence would silently remove the decision from what Copilot can` | **Site 2** (sentence begins on 496) |
| 539 | `would silently hide the decision from retrieval.` | **Site 3** (sentence begins on 538) |

No other `docs/` file matches. `scripts/pipeline/README.md:67` matches the regex but is about the **Draft label**, not fences — not a site. **D7.1's "no fourth site in `docs/`" is confirmed.**

⚠ **One correction to D7.1's stated sweep — see Concerns #5.** `.planning/milestones/v1.18-phases/130-recipe-1-shared-windows-avd-client-device/130-RESEARCH.md:264` reads *"a code fence is invisible to the Copilot/SharePoint retrieval body text (STD-04/STD-001 Grounding Notes)"* — a genuine fourth occurrence of the false mechanism, in `.planning/`. D7.1 claims the sweep covered `.planning/` and found exactly three. **It is out of scope** (an archived v1.18 research artifact, a historical record of what was believed at the time, and D8.2's appends touch only current-milestone research files). **Recommend: do not edit it; note it in the phase SUMMARY so a successor's grep doesn't read as a regression.**

### 4.B — Site 1: line 462 (STD-05 section intro)

**Current text** — exact-string anchor, lines 461–463, safe for exact replacement:

```
constraints: C17 assertion #12 (contiguous top-level blockquote runs capped at 200 characters)
and the standing no-key-info-in-code-fences rule (fenced content is invisible to the Copilot
Studio / SharePoint retrieval body text — see Grounding Notes above). The composite documents a
```

**Proposed replacement:**

```
constraints: C17 assertion #12 (contiguous top-level blockquote runs capped at 200 characters)
and the standing no-key-info-in-code-fences rule (fenced content **is** indexed, but as non-prose
runs that retrieve poorly — see Grounding Notes above). The composite documents a
```

Line count unchanged (3→3); wrap width preserved (~95 chars, matching the file); the `— see Grounding Notes above` pointer is **kept** per D7.4 (it becomes a correct citation).

### 4.C — Site 2: lines 496–498 (D-03 Case-boundary rule)

**Current text** — exact-string anchor, lines 494–500:

```
Use a table only when the decision has more than one dimension to convey per option (what to
choose, why, and either a consequence/branch or a recorded value); a Case 3 free-value prompt
never gets a table. Decision content is never placed inside a code fence in a live recipe — fenced
content is invisible to the retrieval body text (see Grounding Notes), so putting the prompt,
options, or consequences in a fence would silently remove the decision from what Copilot can
ground on. The one exception is this standard's own fenced worked example below (D-07), which is
a spec sample in an index-excluded meta-document, not live decision content in an indexed recipe.
```

**Proposed replacement:**

```
Use a table only when the decision has more than one dimension to convey per option (what to
choose, why, and either a consequence/branch or a recorded value); a Case 3 free-value prompt
never gets a table. Decision content is never placed inside a code fence in a live recipe — fenced
content **is** indexed, but as non-prose runs that retrieve poorly (see Grounding Notes), so
putting the prompt, options, or consequences in a fence leaves the decision retrievable only as
non-prose, rather than as body-text prose Copilot can ground on. The one exception is this
standard's own fenced worked example below (D-07), which is a spec sample in an index-excluded
meta-document, not live decision content in an indexed recipe.
```

✓ **Typo corrected at plan time** (the draft read `Copilate`); the block above is now the text to ship. Verify `Copilot` spelling at author time regardless.

**D7.2 compliance:** the normative sentence *"Decision content is never placed inside a code fence in a live recipe"* is byte-identical and unchanged in force. Only the causal clause after the em dash is rewritten. The D-07 exception sentence is unchanged in meaning (re-wrapped only).

**This is the site to get right.** It is the one that carries D-03's normative force, and the rewrite must not weaken the rule — the rule survives on a *different, true* rationale (poor retrievability), not on the false one (invisibility).

### 4.D — Site 3: lines 538–539 (D-07 worked example preamble) — the ADDITIVE edit

**Current text** — exact-string anchor, lines 536–539:

```
sample in this Approved, index-excluded standard is NOT the same as fenced decision content in a
live indexed recipe, which remains banned under D-03 above; the inCodeFence mask exempts this
sample from C17 assertions #11/#12 on this document, but the same fence in an enrolled recipe
would silently hide the decision from retrieval.
```

**Proposed replacement:**

```
sample in this Approved, index-excluded standard is NOT the same as fenced decision content in a
live indexed recipe, which remains banned under D-03 above; the inCodeFence mask exempts this
sample from C17 assertions #11/#12 on this document, but the same fence in an enrolled recipe
would leave the decision indexed only as non-prose runs that retrieve poorly.
```

**A-3 is critical here.** `ROADMAP.md:65` SC6 names only `:462`/`:496-497`. This third edit does not falsify SC6 (*"the rationale at :462/:496-497 is corrected"* stays true) — but **without an explicit `must_haves` entry in Plan 1 the verifier will never look for it.** Add: *"`docs/_standards/EEE-SOP-standard.md` D-07 preamble (≈:538-539) no longer contains the string `silently hide the decision from retrieval`."*

### 4.E — Sites NOT to touch

| Site | Why |
|---|---|
| `:415` (STD-04 D-01) | D7.3 — already states the true mechanism (*"lands verbatim as garbage in the citation body"*). Editing re-opens the ratified v1.16 Mermaid policy |
| `:252-296` Grounding Notes, incl. `:268` | D7.4 — body-text-only indexing is TRUE and is what makes the corrected proposition true. **Keep** the "see Grounding Notes" pointers |
| `:74-76` / `:260-268` | The custom-property non-indexing claim — also true, also out of scope |
| The `2026-07-17` Version History row | D7.6 — `check-phase-129`'s D-02 regex is satisfied by it. Append only |
| `last_verified` on STD-001 | D7.6 — Phase 129 D-12 governs. No bump |

### 4.F — Validator clearance: verified, all three readers safe

Every needle that reads `docs/_standards/EEE-SOP-standard.md` was read from source this session. **All are content strings; none is a line coordinate; none falls inside any proposed edit range.**

| Validator | Needle (verbatim from source) | Line region | Disturbed? |
|---|---|---|---|
| `check-phase-114.mjs:57` | file presence + non-empty | — | No |
| `check-phase-114.mjs:70` | `**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** STD-001 · **Status:** Approved` | doc header | No |
| `check-phase-114.mjs:85` | `An unmapped \`platform:\` value is a HARD FAILURE. There is NO silent fallback.` | D1 map section | No |
| `check-phase-120.mjs` | file presence + `## Mermaid-in-Enrolled-Classes Policy (STD-04)` + `#### Non-MECE precedence rule (D-08)` | STD-04 region | No |
| `check-phase-129.mjs:40-68` | `Admin Decision-Point Block Format (STD-05)` (the **H2 at line 456**) + a `docs/recipes/* → Guide` regex | H2 + D-02 table | No — line 456 is **above** site 1 (462) and is not edited |

Also verified: **no `vX.Y-milestone-audit.mjs` and no `*-audit-allowlist.json` references `EEE-SOP-standard.md`** (grep over `scripts/validation/`). And no validator anywhere in `scripts/` contains the string `Remove-Logoff`, `Remove Logoff` or `security screen`, so §5's research-file and REQUIREMENTS corrections are needle-free.

**C17 on EEE-SOP itself:** the file is enrolled (`doc_id: STD-001`). Assertions that could plausibly move: `#11` (tables >25 data rows need prose within 5 lines) — the Version History table goes 3 → 4 data rows, nowhere near the threshold; `#12` (blockquote runs ≤200 chars) — no blockquote is touched. Line counts are preserved at all three sites. **No C17 movement expected.**

### 4.G — Version History row (D7.6)

**Table column shape verified** — `docs/_standards/EEE-SOP-standard.md` `## Version History` (H2 at line 609):

```
| Date | Change |
|------|--------|
```

Two columns. Existing data rows are dated `2026-07-04` (v1.15), `2026-07-07` (v1.16), `2026-07-17` (v1.18) — three rows, appended chronologically. **Append one row after the `2026-07-17` row; do not alter it.**

```
| 2026-07-29 | v1.19 HYG-05 — corrected the fenced-content rationale at three sites (STD-05 section intro, D-03 case-boundary rule, D-07 worked-example preamble): fenced content **is** indexed, but as non-prose runs that retrieve poorly. The normative D-03/D-04 rules are unchanged in force; the Grounding Notes pointers are retained and now cite a correct proposition |
```

Use the date Plan 1 actually lands.

### 4.H — D7.2's F2-11: log HYG-05's own wording as an extrapolation

`PIPE-02-FINDINGS.md` (`.planning/milestones/v1.15-phases/113-…/PIPE-02-FINDINGS.md`) has **zero** occurrences of `fence`, `code block`, `SourceCode` or `VerbatimChar`. Its live queries covered header blocks, the Draft label, table chunk boundaries and platform scoping. **Retrieval of fenced content was never tested.**

Ship the locked wording (it is mandated), and log in the phase SUMMARY + `v1.19-DEFERRED-CLEANUP.md`: the *"retrieve poorly"* clause is an unfalsified extrapolation. The honest formulation for the SUMMARY: *fenced content reaches the `.docx` body text and therefore the index, but as `SourceCode`/`*Tok` runs rather than prose; PIPE-02 did not test retrieval of fenced content.*

D7.5's durable in-repo proof, verified this session: `scripts/pipeline/guard-docx.mjs:286` builds a fenced `---` fixture and asserts YAML-LEAK **fails** on it, routing through `runYamlLeakCheck` → `extractBodyText` → the decompressed `word/document.xml`. It genuinely proves fenced strings reach `.docx` body text. Both qualifications hold: say **"runnable wherever pandoc is on PATH"** (`:234-236` does `stAssert(…, true, '… SKIPPED')` when pandoc is absent — a vacuous pass), and name the run styles correctly as `SourceCode` + `NormalTok`/`KeywordTok`/`StringTok`/`OtherTok`, with `VerbatimChar` = 0 (that is pandoc's *inline* code-span style — it appears for D1.8's OMA-URI span, never for a fence).

---

## 5. Plan Decomposition Input

### 5.A — Plan 1 (wave 1, `depends_on: []`) — exact file list

| File | Edit |
|---|---|
| `docs/_standards/EEE-SOP-standard.md` | §4.B site 1 (:461-463), §4.C site 2 (:494-500), §4.D site 3 (:536-539), §4.G Version History append |
| `docs/recipes/03-windows-11-multi-app-kiosk.md` | **Create** — frontmatter + EEE block only, sentinel stripped, real dates (§5.C). Body authored in Plan 2 |
| `.planning/research/STACK.md` | one-line appends at `:16` and `:72` (§5.B) |
| `.planning/research/FEATURES.md` | correction at `:44`, one-line append at `:169` (§5.B) |
| `.planning/research/SUMMARY.md` | one-line append at `:55` (§5.B) |
| `.planning/REQUIREMENTS.md` | Corrections items 1, 2, 4 at `:17` and `:15` — see the safety note below |

**REQUIREMENTS.md edit safety — verified.** Three validators reference `.planning/REQUIREMENTS.md`: `check-phase-54.mjs`, `check-phase-61.mjs`, `check-phase-70.mjs`. `check-phase-54.mjs`'s assertion (id 21, `V-54-21`) is a **NEGATIVE**: *REQUIREMENTS.md + ROADMAP.md contain ZERO `05-compliance-policy.md` references*. None of the proposed edits introduces that string. No validator needle contains `Remove-Logoff`, `Remove Logoff` or `security screen`. **The edits are safe.** (Precedent: `457adc25` — *"apply adversarial-review corrections to research files"* — this milestone already corrects planning artifacts in flight.)

⚠ **Do not add a `## Rollback/Recovery` slot to `docs/_templates/recipe-template.md`.** D2.1 rules divergence, not amendment, and the reason is the recipes-01/02 non-conformance ripple, **not** a harness block.

### 5.B — D8.2 append sites: exact current text for exact-string edits

**`.planning/research/STACK.md:16`** — full line (truncated here at 400 chars; the executor must match the tail, which ends `— see the Status row below).`):

> `**Does this re-scope or cancel Recipe #3?** No — it re-shapes it. The recipe is achievable and first-party-documented, but its authored mechanism must be the **custom OMA-URI + hand-authored AssignedAccess XML** path, not a Templates walkthrough. …` **CORRECTED 2026-07-25 (adversarial review):** *validating via **observable device behaviour + the AssignedAccess Operational event log**, NOT via the `AssignedAccess/Status` node (Get-only; no admin-reachable read path from Intune — see the Status row below).*

**Append** (one sentence, tagged `CORRECTED 2026-07-29`): the `Operational` channel is **disabled by default** and must be enabled — Event Viewer → **Applications and Services Logs** > **Microsoft** > **Windows** > **AssignedAccess** > **Operational** → right-click → **Enable Log** — **before** the first kiosk sign-in; for some failures events are captured only once.

**`.planning/research/STACK.md:72`** — **the critical one** (KIOSK-01 and ROADMAP Hard constraints point the phase at `STACK.md:13-16`, and this row is what the planner and researcher actually read). Line begins:

> `| **\`AssignedAccess/Status\` node** (read-only) — **DO NOT USE AS THE VERIFICATION MECHANISM** | Runtime status codes since Windows 10 1809+ | **CORRECTED 2026-07-25 (adversarial review).** \`Status\` Access Type is **\`Get\` only**; Intune requires *"the Add, Replace, and Get operations"*, so it is not deliverable as a custom OMA-URI row. …`

Its final cell ends: `… \`AppNotFound\` survives as a named symptom under the pre-installed-apps prerequisite. |`. **Append inside that final cell**, before the closing `|`.

**`.planning/research/FEATURES.md:44`** — the ONLY correction needed here is the hyphen. Exact current substring:

> `and that the targeted account has Remove-Logoff applied so Ctrl+Alt+Del reaches the security screen with the sign-out affordance stripped.`

Replace `Remove-Logoff` → `Remove Logoff`. ⚠ **See Concerns #6: this site does NOT carry the security-screen defect** — it already scopes the security screen to Ctrl+Alt+Del alone, which is the corrected form. T-5's "both defects at both sites" is inaccurate for this line. Editing the security-screen clause here would be a wrong edit.

**`.planning/research/FEATURES.md:169`** — line begins `- [ ] **CORRECTED 2026-07-25 (adversarial review) — the \`AssignedAccess/Status\` check is NOT executable and has been replaced.**` and ends `… This mirrors RE-223's own precedent at \`02:271\` (*"Verification is on-device… does not surface in Intune reports"*).` It already contains the full Event Viewer path `Applications and Services Logs > Microsoft > Windows > AssignedAccess > Operational`. **Append** the enable-before-first-sign-in precondition sentence at end of line.

**`.planning/research/SUMMARY.md:55`** — final cell ends `… \`AppNotFound\` retained as a named symptom only. |`. **Append inside that final cell** before the closing `|`.

`ROADMAP.md:64` / `REQUIREMENTS.md:18` / `:93` / `STATE.md:58` are left **textually intact** per D8.2 — correct as written once the precondition exists.

### 5.C — File identity, slug and frontmatter (D5.6 / D5.7)

**`doc_id: RE-224` — verified.** `grep -cE '^\|\s*RE-[0-9]+\s*\|' docs/_registry/RE-index.md` → **223**. The registry ends at RE-223. Next ID is **RE-224**. `build-filename-map.mjs --self-test` sub-test (c) asserts `parseRegistry(RE-index.md).length === 223` — it counts registry **rows**, not files — so creating the recipe file does not trip the canary before Phase 137. **Do not touch the registry in this phase.**

**Recommended slug: `docs/recipes/03-windows-11-multi-app-kiosk.md`**

Rationale: matches the siblings' `NN-<device-end-state>` shape (`01-shared-windows-avd-client.md`, `02-shared-ipad-full-provisioning.md`); "multi-app kiosk" is the exact phrase both Microsoft and admins use, so it drives a good Copilot citation title; and it is short enough not to truncate in a citation list. **Alternative worth one line of consideration:** `03-windows-11-multi-app-kiosk-assigned-access.md` — adds the mechanism name, which is the discriminating search term (`grep -ril "assigned access" docs/` currently returns almost nothing outside recipe 01's Step 5a), at the cost of length. Either satisfies ROADMAP SC1's `docs/recipes/03-*.md` wildcard.

**Frontmatter, concrete** (sentinel stripped, real dates — D5.7; `review_by = last_verified + 90 days` per `recipe-template.md`'s own usage block):

```yaml
---
doc_id: RE-224
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-29
review_by: 2026-10-27
applies_to: Windows 11 multi-app kiosk (restricted user experience via the AssignedAccess CSP Configuration node, delivered by an Intune custom OMA-URI profile)
audience: admin
---
```

**EEE block line** (immediately after the frontmatter close, blank line between):

```
**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-224 · **Status:** Draft
```

Verifications behind each value:
- `platform: Windows` → resolves in C17's `D1_MAP` to `'Windows'` (`c17-eee-contract.mjs:27`) → the block must read `**Platform:** Windows`. Assertion `#10` is a HARD FAILURE on an unmapped value; `#9` requires block/frontmatter equality.
- `doc_type: Guide` → `docs/recipes/*` is always Guide (EEE D-02 edge-case ruling + `check-phase-129`'s `docs/recipes/* → Guide` regex + `recipe-template.md`'s usage block: *"never introduce a new 'Recipe' doc_type value, the taxonomy is a closed 4-value enum"*).
- `status: Draft` → in C17's `VALID_STATUSES` (`#13`). Phase 137 flips Draft→Approved as a **two-site** edit (frontmatter + block), per D5.6.
- `owner: Intune Admin Lead` → matches recipe 01; `recipe-template.md`'s reviewer note says role, not person name.
- Dates: if Plan 1 lands on a different day, use that day and that day + 90.

**D5.7 ordering is load-bearing:** strip the `TEMPLATE-SENTINEL` and set real frontmatter **before** measuring the Scope banner's blockquote length, because the sentinel makes C17 skip `#9` and `#12` and any earlier measurement is void.

### 5.D — Plan 2 (wave 2, `depends_on: ["135-01"]`) — exact file list

| File | Edit |
|---|---|
| `docs/recipes/03-windows-11-multi-app-kiosk.md` | Author the full body — the only file Plan 2 touches |

**Read-only inputs** (zero edits): `docs/_templates/recipe-template.md`, `docs/recipes/01-shared-windows-avd-client.md`, `docs/recipes/02-shared-ipad-full-provisioning.md`, `docs/admin-setup-macos/10-kerberos-sso-extension.md:92-154`, `docs/admin-setup-apv1/09-intune-connector-ad.md:84-96`, `docs/admin-setup-apv1/08-self-deploying.md`, `docs/admin-setup-apv1/03-esp-policy.md`, `docs/admin-setup-apv1/04-dynamic-groups.md`, `docs/apv1-vs-apv2.md`.

**Zero edits to `docs/recipes/01-shared-windows-avd-client.md`.** `check-phase-130.mjs:64,67` pins `Step 5a: Kiosk configuration` and `Step 5b: Shared PC configuration` as literal strings against live HEAD inside every apex chain.

### 5.E — C17 assertions that will fire on the new file, and how to pre-empt each

Read from `scripts/validation/c17-eee-contract.mjs` this session. A file is enrolled iff its frontmatter has a `doc_id` key and its path starts with `docs/` — so RE-224 is enrolled the moment Plan 1 creates it.

| # | Assertion (source line) | Pre-emption |
|---|---|---|
| 1 | No ` ```mermaid ` fences, using the `inCodeFence` mask (:201) | Author no Mermaid. The ` ```xml ` payload fence is **not** matched — only `/^```mermaid/` is |
| 2 | Exactly one H1, appearing **after** the block line (:214) | One `# <Title>`, placed after the EEE block line |
| 3 | H1 text ≠ bare `RE-\d+` (:226) | Title is a concrete device end-state, e.g. `# Windows 11 Multi-App Kiosk: Assigned Access Provisioning` |
| 4 | `## Summary` heading present (:234) | Template default |
| 5 | `## Summary` word count ≥ 30 (:234) | Write ≥ 30 words. Template's own comment warns `#5` fires on templates |
| 6 | Block is a single inline paragraph, not a table (:270) | Copy §5.C's block line exactly |
| 7 | Platform + Doc Type are the **first two** block fields (:275) | §5.C's order |
| 8 | Required frontmatter keys present, non-empty (:285) | §5.C — all nine set, no `[FILL-IN]` left |
| 9 | Block values **equal** frontmatter values — skipped for TEMPLATE-SENTINEL (:298) | `Windows`/`Guide`/`RE-224`/`Draft` must match exactly. **Live once the sentinel is stripped** |
| 10 | `platform` resolves in `D1_MAP` — HARD FAILURE, no fallback (:334) | `Windows` is entry 1 of the map |
| 11 | Tables with **>25** data rows need a prose line within 5 lines (:344) | §1.B's table is **22** rows. Add a prose summary line anyway — D1.5 |
| 12 | Contiguous top-level `^>` runs ≤ 200 chars — skipped for TEMPLATE-SENTINEL (:386) | **Measure after the sentinel strip.** Recipe 01's Scope banner is 175 chars, so overflow is near-certain → split into two blank-line-separated sub-200-char runs (the `01:101`/`01:103` idiom). Also affects every `> **Ask the admin:**` lead-in and every `> **What breaks if misconfigured:**` callout |
| 13 | `status ∈ {Draft, Approved, Superseded}` (:410) | `Draft` |

**Fence position is mandatory at column 0** (D1.2): C17's `inCodeFence` mask matches `/^(\`{3,}|~{3,})/` — `^`-anchored, no leading whitespace tolerated — while `convert.ps1:108` uses `^\s*`. Column 0 is the only position where the two agree. An indented fence would be *unmasked* by C17, so assertions `#2`–`#5` would then see the payload's own `<` lines and the `#11`/`#12` masks would misbehave. Log the divergence to `v1.19-DEFERRED-CLEANUP.md` per `REQUIREMENTS.md:68`.

---

## 6. Validation Commands

All copy-pasteable. Run from the repo root, `D:/claude/Autopilot`.

### 6.A — C17 (the primary gate)

```bash
node scripts/validation/c17-eee-contract.mjs
```

**Expected:** exit 0, **233 files / 0 violations** — the 232-file baseline plus RE-224. A file count of 232 after Plan 1 means the new recipe was not enrolled (missing `doc_id`, or not under `docs/`).

```bash
node scripts/validation/c17-eee-contract.mjs --self-test
node scripts/validation/c17-eee-contract.mjs --verbose   # per-file detail when a violation fires
```

### 6.B — The four validators that read the files this phase edits

```bash
node scripts/validation/check-phase-114.mjs   # EEE-SOP: presence, STD-001 block, D1 no-fallback
node scripts/validation/check-phase-120.mjs   # EEE-SOP: STD-04 Mermaid policy, D-08 Non-MECE
node scripts/validation/check-phase-129.mjs   # EEE-SOP: STD-05 H2 + recipes→Guide; recipe-template + SENTINEL
node scripts/validation/check-phase-130.mjs   # recipe 01 Step 5a/5b literal strings in live HEAD
```

**Expected:** all four exit 0. `check-phase-130` is the zero-edits-to-recipe-01 tripwire — run it after Plan 2 as well as after Plan 1.

### 6.C — Link integrity

```bash
node scripts/validation/check-nav-hub-links.mjs
node scripts/validation/check-nav-hub-links.mjs --self-test
```

**Expected:** exit 0, zero broken links across the outbound + inbound scans. Every cross-link RE-224 adds (`01-shared-windows-avd-client.md#step-5a-kiosk-configuration`, `08-self-deploying.md`, `03-esp-policy.md`, `04-dynamic-groups.md`, `apv1-vs-apv2.md`) is checked here. Known gotcha: `{#id}` anchor overrides produce phantom-slug false negatives — use plain GitHub slugs.

### 6.D — Pandoc convertibility + guard-docx (HARN-16 prerequisite)

**First confirm pandoc is actually present — otherwise guard-docx returns a vacuous pass** (`guard-docx.mjs:234-236` does `stAssert(…, true, '… SKIPPED')` when pandoc is absent):

```bash
pandoc --version   # must report 3.7.0.2 (PINNED per convert.ps1)
```

Then, in PowerShell 7+ (`convert.ps1` has `#Requires -Version 7.0`):

```powershell
pwsh -File scripts/pipeline/convert.ps1 `
  -InputMd docs/recipes/03-windows-11-multi-app-kiosk.md `
  -OutputDocx .pipeline-output/03-windows-11-multi-app-kiosk.docx

node scripts/pipeline/guard-docx.mjs .pipeline-output/03-windows-11-multi-app-kiosk.docx
```

**Expected:** convert exits 0; guard-docx exits 0 with both checks passing — (a) YAML-leak: no `---` in the first ~500 chars of extracted body text, (b) heading styles: `Heading1`/`Heading2`/`Heading3` pStyle IDs present.

**This is the check that de-risks HARN-16 in-phase** — HARN-16 requires both new recipes be pandoc-convertible and guard-docx-clean, and the payload fence is exactly the novel content that could break it. Running it in Phase 135 rather than Phase 138 is cheap insurance. Also worth checking by hand once: that the payload's `&`-free, CDATA-bearing fence survives conversion (the D7.5 mechanism says it lands as `SourceCode` + `*Tok` runs).

```bash
node scripts/pipeline/guard-docx.mjs --self-test
```

### 6.E — Drift canary (must NOT move in this phase)

```bash
node scripts/pipeline/build-filename-map.mjs --self-test
```

**Expected:** exit 0, still asserting **223** registry rows. This phase does not touch `docs/_registry/RE-index.md`; the 223 → 225 bump is CLASS-05's named deliverable in **Phase 137**. If this fails, the registry was edited out of turn.

### 6.F — HYG-05 spot checks

```bash
# The three sites must be gone from docs/ (expect: only line 268, the metadata claim)
grep -rniE "invisible to (the )?(Copilot|retrieval|SharePoint)|silently hide the decision|silently remove the decision" docs/

# D-03's normative sentence must survive byte-identical
grep -n "Decision content is never placed inside a code fence in a live recipe" docs/_standards/EEE-SOP-standard.md

# The two DO-NOT-TOUCH sites must still be present
grep -n "lands verbatim as garbage in the citation body" docs/_standards/EEE-SOP-standard.md   # :415
grep -n "metadata is invisible to Copilot at query time" docs/_standards/EEE-SOP-standard.md   # :268

# Version History row count: 3 → 4
grep -c "^| 2026-" docs/_standards/EEE-SOP-standard.md
```

---

## Concerns

Eleven items where a locked, mandated, or recorded claim does not survive contact with the source text unqualified. **None re-litigates a decision** — each is a scope or sourcing precision that, if it passes through, becomes a shipped-documentation defect of exactly the class this phase's two adversarial rounds were fighting.

**#1 — The mandated shortcuts sentence contains an unsourced clause. [HIGH severity]**

D2.5 and `<specifics>` mandate: *"Alt+F4, Alt+Tab, Alt+Shift+Tab and Ctrl+Alt+Del are not blocked for a restricted-user-experience account; **only Ctrl+Alt+Del reaches the security screen**."* The first clause is verbatim-sourced. The second is **not**. `[VERIFIED: assigned-access/recommendations, § "Keyboard shortcuts"]` states only: *"The following keyboard shortcuts aren't blocked for any user account that is configured with a restricted user experience: Alt + F4, Alt + Tab, Alt + Shift + Tab, Ctrl + Alt + Delete."* The page never mentions a security screen — which is exactly why T-5 is right that `REQUIREMENTS.md:17` is false. But no page fetched ties Ctrl+Alt+Del to a security screen either. The nearest adjacency: the GPO category is literally named `Ctrl+Alt+Del Options` and contains `Remove Logoff`/`Remove Task Manager`/`Remove Change Password` `[VERIFIED: policy-settings]`; the term *"security options screen"* appears at `recommendations` § "Power settings" Note (*"disable the power button from the security options screen"*) and *"security options" UI* appears in a `policy-settings` device-table row. **Verdict: `[ASSUMED — adjacency-supported, no first-party sentence]`.** Under D2.5's own B-6 rule (cite it or cut it), this clause needs treatment. **Minimal fix that keeps the meaning and is fully sourced:** *"…are not blocked for a restricted-user-experience account. Ctrl+Alt+Del is the documented way to exit the kiosk experience, and the profile automatically applies the `Ctrl+Alt+Del Options` policies `Remove Logoff`, `Remove Task Manager` and `Remove Change Password`, which strip those affordances."* Every clause there is verbatim-sourced.

**#2 — D4.5's second quote is kiosk-experience-scoped. [HIGH severity]** *"Windows apps must be provisioned or installed for the Assigned Access account before they can be selected as the Assigned Access app"* is the first bullet of a list lead by *"The following guidelines help you choose an appropriate Windows app for a **kiosk experience**"*, and its own phrase *"the Assigned Access app"* is singular. Two correctly-scoped replacements exist (§3.G quotes 1 and 2). **Fix:** use those; if this sentence is used at all, label it kiosk-experience guidance.

**#3 — The `IdleTimeOut` / 30-second paragraph is mixed-scope. [MEDIUM]** It sits on the multi-app page but uses singular single-app prose and its next paragraph makes a `BreakoutSequence` claim that is schema-illegal in `AllAppsList`. **Fix:** §3.A's suggested wording — attribute the 30 s to *"the multi-app kiosk page"* rather than asserting it verified for a multi-app profile.

**#4 — T-3 welds two quotes from different H2s. [MEDIUM]** "disabled by default" is under `## Multi-app kiosk issues`; the one-time-events Tip is under `## Single-app kiosk issues`. Same page, different sections. **Fix:** record both headings; present the caveat as applicable-by-placement, not co-located.

**#5 — D7.1's `.planning/` sweep claim is inaccurate. [LOW]** A fourth occurrence exists at `.planning/milestones/v1.18-phases/130-…/130-RESEARCH.md:264`. Out of scope (archived artifact) but the claim as written is wrong. **Fix:** note in SUMMARY; do not edit.

**#6 — T-5 over-attributes defects to `FEATURES.md:44`. [MEDIUM — would cause a wrong edit]** That line already scopes the security screen to Ctrl+Alt+Del alone, i.e. the corrected form. Only the `Remove-Logoff` hyphen is a defect there. **Fix:** §5.B — edit the hyphen only.

**#7 — `PITFALLS.md:67`'s mandated clause is a characterization, not a quote. [LOW]** `assigned-access/overview` states one undifferentiated edition list for Assigned Access; the literal phrase *"identical for both single-app and multi-app Assigned Access"* appears nowhere. **Fix:** ship the clause (mandated, and true), but never inside quotation marks.

**#8 — "Wired Ethernet at OOBE" overstates the source. [LOW]** Learn: Ethernet → *"no user interaction is required"*; Wi-Fi → the user picks language/locale/keyboard and connects. Ethernet is required for a **fully userless** OOBE, not for self-deploying to function. **Fix:** phrase it as the zero-touch precondition.

**#9 — `applyOnce` acquired a version gate after the milestone research. [INFORMATIONAL]** `start/layout` was updated `2026-07-21`; `applyOnce` now requires 24H2 + KB5062660 and is *"ignored on earlier versions"*. This **supports** D1.11's omit option and is new information, not a conflict.

**#10 — `AllAppsList` (element) vs `AllAppList` (profile-type name) differ by one `s`. [MEDIUM — a reader-breaking trap]** The XSD element is `<AllAppsList>`; Learn's prose calls the profile *type* `AllAppList`, and `REQUIREMENTS.md`/KIOSK-02/`STACK.md` correctly use the prose form for the type. Both are right in their own register — but a reader who writes `<AllAppList>` in the payload ships an unparseable document. **Fix:** one explicit caution line in the recipe distinguishing the two, and make sure the field-decomposition table row (§1.B row 6) uses the **element** spelling.

**#11 — The Entra-arm security counter-consideration is unaddressed. [MEDIUM]** `recommendations` § "Kiosk user account" cautions that *"Using an Active Directory user or Microsoft Entra user might allow an attacker to gain access to domain resources"* on public-facing devices — and that passage is **not** scoped to the kiosk profile. D4.1's pick stands (its own quote explicitly covers *"a kiosk or a restricted user experience"*), but the recipe should carry the tradeoff rather than omit it. **Fix:** it is exactly the content D4.3's autologon anti-feature row needs (§3.H) — use it there, which discharges the concern and fills the row simultaneously.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| A Start-layout JSON | Hand-typed `pinnedList` | `Export-StartLayout -Path "…\LayoutModification.json"` on a configured reference device | First-party prescribed route; gets AUMIDs and `.lnk` paths right. The recipe's fence is the *worked example*, not the recommended production method |
| AUMID discovery | Guessing or copying AUMIDs from blogs | `Get-StartApps` / the `find-aumid` page — cross-link RE-222's existing step | Hardcoded AUMIDs break on UWP update (first-party, §3.F) |
| A payload schema check | A bespoke XSD assembly script | `[xml](Get-Content … -Raw)` for well-formedness + the `Operational` log for schema acceptance | The five XSD documents have no resolvable `schemaLocation` and the add-ons need XSD 1.1 (§1.A) |
| Kiosk health monitoring | Anything on `AssignedAccess/Status` | Observable behaviour + `Operational`/`Admin` channels + `HKLM\…\AssignedAccessCsp` | `Status` is `Get`-only; Intune needs Add/Replace/Get |
| Blocking hotkeys | Custom AppLocker or hotkey policy | Nothing — Assigned Access blocks 21 shortcuts automatically; `Keyboard Filter` for the four it doesn't | *"You can't manage AppLocker rules that are generated by the restricted user experience in MMC snap-ins"* |
| Kiosk exit control | A custom `BreakoutSequence` | Nothing — schema-illegal in `AllAppsList` | XSD `xs:choice`: `BreakoutSequence` exists only in the `KioskModeApp` branch |
| A Windows-kiosk runbook | A new L1/L2 doc | Route the failures table to in-recipe anchors + existing refs | `REQUIREMENTS.md:81` out of scope; `130-VERIFICATION.md:32` T6 locked the resolution: no fabricated runbook links |

---

## Common Pitfalls

**P1 — Doubling backslashes in XML attributes.** The inverse of the real rule. `App/@DesktopAppPath` takes single backslashes; only the `v5:StartPins` JSON doubles. **Detect:** the app silently fails to launch or the profile fails to apply. **Prevent:** §1.A's payload shows both forms twelve lines apart; state the rule explicitly (D1.9(2)).

**P2 — Reading an empty `Operational` channel as PASS.** The channel is disabled by default; a fresh kiosk's channel is empty, which "clean" reads as success. **Prevent:** enable it, with the one-time-events caveat, **before** the first kiosk sign-in (D3.1(2)).

**P3 — Using the Entra group's display name instead of its object ID.** `UserGroup/@Name` for `AzureActiveDirectoryGroup` is the object ID. **Detect:** policy applies successfully, no restricted experience appears. **Prevent:** the object-ID click-path (§3.I) in the step that fills the field.

**P4 — Reading a partial Start menu at first sign-in as a failure.** Pins for not-yet-registered packages simply don't appear, with no error. **Prevent:** state the timing hazard next to the verification line (D4.5).

**P5 — A `Profile Id` without braces.** `guid_t`'s pattern requires them. **Detect:** schema-invalid payload, profile never applies. **Prevent:** one caution line; `New-Guid` output is already braced when formatted as `{…}`.

**P6 — Assuming the policy landing means the kiosk is configured.** Two independent scopes. **Prevent:** D4.4's named step; `HKLM\…\AssignedAccessCsp` distinguishes the two failure modes.

**P7 — Naming a group that contains admin principals.** *"It's not supported to associate an admin user with an Assigned Access profile."* A group holding Global Administrators or *Entra Joined Device Local Administrator* holders re-creates it regardless of enrollment mode. **Prevent:** C-2b's caution line.

**P8 — Excluding the kiosk group from CA without noticing the blast radius.** With a `<UserGroup>` `Config` the documented remedy is a per-member identity-security change for every group member. **Prevent:** D3.6 — state the scope.

**P9 — Piloting on a VM.** Self-deploying fails with `0x800705B4` including Hyper-V vTPM; separately, the touch keyboard doesn't trigger on VMs. **Prevent:** §3.B's Prerequisites bullet.

**P10 — Indenting the payload fence.** C17's mask is `^`-anchored; `convert.ps1`'s is `^\s*`. Column 0 only (D1.2).

**P11 — Measuring blockquote lengths before stripping the sentinel.** The sentinel makes C17 skip `#9` and `#12`; any earlier measurement is void (D5.7).

---

## State of the Art

| Old / stale belief | Current documented position | When changed | Impact on RE-224 |
|---|---|---|---|
| Multi-app kiosk is Enterprise/Education only | ✅ Pro ✅ Enterprise / Enterprise LTSC ✅ Education ✅ IoT Enterprise / IoT Enterprise LTSC — one list for all of Assigned Access | `overview` `updated_at: 2026-07-21` | D5.1/D5.2 — a stale source produces a wrongly restrictive prerequisite |
| Intune's Templates → Kiosk covers multi-app on Windows 11 | Documented Windows-10-only; Windows 11 routes to the AssignedAccess CSP article family | `configure-kiosk` `ms.date: 2026-02-10` | GATE 1 — the whole shape of the recipe |
| `applyOnce` is a plain `pinnedList` sibling | Requires 24H2 + KB5062660; *"ignored on earlier versions of Windows 11"* | `start/layout` `updated_at: 2026-07-21` | D1.11 — omit |
| Windows 11 Start layouts use `StartLayout` XML | Windows 11 uses `v5:StartPins` with **JSON**; `StartLayout` XML is the Windows 10 path | 22H2 | The CDATA-JSON tension native to RE-224 |
| `KioskModeApp` is the kiosk node | Deprecated (*"may be removed in a future release"*); no-ops when `Configuration` is set, while still returning SUCCESS | Windows 10 1803 | A KIOSK-03 anti-feature row |
| `Export-StartLayout -UseDesktopApplicationID` | Windows-10-only flag; Win11 export is `-Path …json` with no such flag | Windows 11 | Do not carry the Win10 invocation |

**Deprecated / do not author:** `KioskModeApp` (deprecated node); `<CustomTaskbarLayoutCollection>` inside an Assigned Access layout (*"It's not supported to configure a Taskbar layout using the `<CustomTaskbarLayoutCollection>` tag in a layout modification XML, as part of the Assigned Access configuration"* — Win10 pivot); `Size`/`Row`/`Column` tile attributes (Windows-10 `StartLayout` only — note `kiosk-mode-issues-troubleshooting` § "Start layout not as expected" still instructs checking them, which is stale for a Windows 11 `v5:StartPins` kiosk; do not carry that line).

---

## Assumptions Log

| # | Claim | Section | Risk if wrong |
|---|---|---|---|
| A1 | Intune **Data type** for `./Vendor/MSFT/AssignedAccess/Configuration` is `String` (from Format `chr` + the `start/layout` CSP-tab analogue) | §2.C | The delivery step's most error-prone field is wrong → profile never applies. **MEDIUM confidence — tag it as such in the recipe.** No first-party statement exists |
| A2 | `Microsoft-Windows-AssignedAccess/Admin` is enabled by default | §3.C | An "absence of Event 31000" check could be vacuous. **Mitigate by wording:** instruct reading the channel, don't assert its default state |
| A3 | *"only Ctrl+Alt+Del reaches the security screen"* | Concerns #1 | Ships an unsourced mechanism in a doc whose purpose is correcting an unsourced mechanism. **Use the sourced rewording** |
| A4 | The XSD add-ons' `vc:minVersion="1.1"` means .NET `XmlSchemaSet` cannot validate the payload | §1.A | Only affects the "can you XSD-validate this" advice. Mitigated by recommending well-formedness + the device log instead |
| A5 | `$x = [xml](Get-Content … -Raw)` is the well-formedness check | §1.A | Standard PowerShell, not fetched this session. Low risk; verify once before shipping the line |
| A6 | The one-time-events caveat applies to the multi-app case | §3.C, Concerns #4 | Authored under the single-app H2. Its own link target is the general Assigned Access logging section, so the inference is sound — but record it as an inference |
| A7 | The autologon-vs-Entra recovery differential | §3.E | D2.5 already mandates `[ASSUMED]` and two separate citations, never a synthesis. Honour that |
| A8 | Expected C17 count after Plan 1 is 233 | §6.A | Arithmetic on the recorded 232 baseline, not measured post-edit. If it reads 232, the file isn't enrolled — which is itself the useful signal |

---

## Sources

All fetched 2026-07-29. Freshness read from each page's `ms.date` / `updated_at`.

### Primary (HIGH confidence — first-party, fetched this session, quoted verbatim with section headings)

| URL | `updated_at` | What was taken |
|---|---|---|
| `learn.microsoft.com/en-us/windows/configuration/assigned-access/xsd` | 2025-03-10 | `profile_t` ordered sequence, `taskbar_t`, `guid_t` brace pattern, `xs:all` root, `groupType_t`, all five schema fragments' targetNamespaces, `vc:minVersion="1.1"`, `BreakoutSequence`'s branch |
| `…/assigned-access/configuration-file` | 2025-09-26 | Versioning table, `v5` namespace instruction, `AllAppList` semantics, `AllowedApps` sample, `### User accounts` vs `### Group accounts` scoping, Entra-group object-ID + internet-connectivity, `Configs` Limitations (standard-users-only, group-can't-use-kiosk-profile, CA), nested-groups, `AutoLogonAccount` + EAS, Start-menu Note, `ShowTaskbar` |
| `…/assigned-access/examples` | 2025-03-10 | **The Windows 11 "Restricted user experience" payload** — element order, `packagedAppId` casing, doubled-in-JSON / single-in-XML backslashes in one document, `UserGroup` variants |
| `…/assigned-access/overview` | **2026-07-21** | kiosk-experience vs restricted-user-experience definitions, `## System requirements` (UAC + console-only, both kiosk-scoped), `### Windows edition requirements` |
| `…/assigned-access/recommendations` | 2025-03-10 | `## Keyboard shortcuts` (the four unblocked; **no security screen**), group-targeting recommendation with its scoping, `## Kiosk user account` + automatic sign-in + `PreferredAadTenantDomainName`, `## Troubleshooting and logs` (channel path + three registry keys) |
| `…/assigned-access/policy-settings` | 2025-03-10 | **`Remove Logoff` / `Remove Task Manager` / `Remove Change Password`** under `Ctrl+Alt+Del Options`; device-vs-user scope statements; AppLocker deny-list-at-sign-in; the 21 blocked shortcuts |
| `…/assigned-access/configure-multi-app-kiosk` | 2025-03-10 | OMA-URI Setting/Value, Settings-unavailable, removal-is-not-rollback, Settings-removal-closed, **`IdleTimeOut` + 30 s**, touch-keyboard-on-VM, sign-in-to-validate |
| `…/windows/configuration/start/layout` | **2026-07-21** | `pinnedList` key table (the casing divergence), the standalone Win11 JSON sample, **`applyOnce`'s 24H2/KB5062660 gate**, `Export-StartLayout`, the not-installed-pins Important, the Data-type-String CSP analogue |
| `…/windows/client-management/mdm/assignedaccess-csp` | 2025-03-12 | **The backslash rule stated outright**; `Configuration` Format `chr` + Access Type; `Status` Get-only + `status_t` code 2 = AppNotFound; `KioskModeApp` no-op-returns-SUCCESS; edition tables; `## Handling XML in Configuration` |
| `…/troubleshoot/windows-client/shell-experience/kiosk-mode-issues-troubleshooting` | 2026-02-19 | **Operational-channel-disabled-by-default** (multi-app H2), one-time-events Tip (single-app H2), right-click → **Enable Log**, Start-layout-not-as-expected checks |
| `…/troubleshoot/mem/intune/device-configuration/users-cannot-logon-windows-multi-app-kiosk` | 2026-04-17 | **Event 31000 verbatim**, Event 1098 + `AADSTS50076` (MFA) / `AADSTS50158` (ToU), Entra-user-or-Group scoping, the CA-exclusion remedy |
| `…/autopilot/self-deploying` | 2026-06-22 | **`0x800705B4` VM/vTPM**, no-automatic-re-enrollment, `## Validation` sign-on-screen-first outcome, EAS-breaks-autologon, TPM 2.0 + attestation, Ethernet-vs-Wi-Fi |
| `…/intune/device-configuration/templates/configure-kiosk` | 2026-07-01 | **GATE 1 re-cited fresh**, one-kiosk-profile-per-device, the Templates→Kiosk click-path |
| `…/intune/device-configuration/templates/configure-custom-settings` | 2026-07-01 | The 11-step custom-profile click-path |
| `…/intune/device-configuration/templates/configure-custom-settings-windows` | 2026-07-01 | The Data-type dropdown's seven values, the OMA-URI row fields, Add/Replace/Get requirement, the obscured-value Note |

### In-repo verification (HIGH — read from source this session)

`docs/_standards/EEE-SOP-standard.md` (:461-463, :493-500, :534-541, :605-625) · `docs/_templates/recipe-template.md` (usage block + frontmatter) · `docs/recipes/01-shared-windows-avd-client.md` (frontmatter) · `docs/_registry/RE-index.md` (223 rows) · `scripts/validation/c17-eee-contract.mjs` (13 assertions, `D1_MAP`, fence mask) · `scripts/validation/check-phase-114.mjs` / `-120` / `-129` (needles) · `scripts/validation/check-phase-54.mjs` (the REQUIREMENTS.md negative) · `scripts/pipeline/guard-docx.mjs` / `convert.ps1` / `check-nav-hub-links.mjs` (usage) · `.planning/research/{STACK,FEATURES,SUMMARY}.md` (D8.2 sites) · corpus-wide grep for the false fence mechanism.

### Tertiary (LOW — flagged, not relied on)

`[UNVERIFIED]` — the `[xml](Get-Content)` well-formedness idiom and .NET `XmlSchemaSet`'s XSD-1.0 limitation are training knowledge, not fetched. Both are advisory only.

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|---|---|---|
| Worked payload + element order | **HIGH** | XSD read verbatim; a first-party Win11 sample of the same shape exists at `assigned-access/examples` |
| Backslash rule (T-1) | **HIGH** | Direct first-party *statement* on `assignedaccess-csp`, plus four-way sample confirmation in one document |
| `pinnedList` casing | **HIGH** | 19 sample occurrences vs 1 table occurrence, across three pages |
| `applyOnce` disposition | **HIGH** | Explicit version gate quoted; the "does `v5:StartPins` honour it" gap is recorded as NOT-FOUND, not guessed |
| Namespace table (D1.6) | **HIGH** | Published table quoted complete; the `v5` double-binding defect confirmed |
| OMA-URI mechanism + click-path | **HIGH** | Both pages fetched, `updated_at: 2026-07-01` |
| **Intune Data type** | **MEDIUM** | `chr` → `String` is inference + analogue. No first-party instruction exists. **A1** |
| B-6 items (`Remove Logoff` etc., `IdleTimeOut`) | **HIGH** | Found on `policy-settings` under a restricted-user-experience heading; `IdleTimeOut` verbatim with a mixed-scope qualification recorded |
| UAC / no-RDP scope (D5.5) | **HIGH** | Both bullets self-scope in their own opening clause; corroborated by a second page |
| Operational channel + Event 31000 | **HIGH** | Both verbatim, with headings; the cross-H2 placement recorded honestly |
| HYG-05 edit sites | **HIGH** | Line-exact current text read from source; validator needles individually cleared |
| Plan decomposition | **HIGH** | Every file and line offset read from disk; the REQUIREMENTS.md edit-safety question answered from validator source |
| The eleven `## Concerns` | **HIGH** as findings | Each is a quoted-scope observation, not a judgement call |

**Research date:** 2026-07-29
**Valid until:** 2026-08-28 (30 days). Two caveats: `assigned-access/overview` and `start/layout` were both updated `2026-07-21` — eight days before this research — and `start/layout`'s change materially altered `applyOnce`. Re-check both if authoring slips past mid-August. `configure-kiosk` (GATE 1) is the load-bearing one; it has been stable since `ms.date: 2026-02-10`.
