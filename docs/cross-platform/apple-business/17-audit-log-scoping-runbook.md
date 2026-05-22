---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: ios+ipados+macos+tvos
---

> **Platform applicability:** This document covers Apple Business audit log access and
> scoping — how sub-org admins access Activity logs within their OU scope, understand
> author-scope vs target-scope semantics, and export logs to an external SIEM for long-term
> retention. This covers iOS, iPadOS, macOS, and tvOS devices managed in Apple Business OUs.
> This is distinct from Intune device audit logs and Intune compliance reports, which are
<!-- ABAUDIT-16: next line distinguishes Apple Business Activity log access from Intune audit log and compliance reporting surfaces; C15 regex 4 false-positive exemption (disambiguation clause clarifying distinct surfaces, not conflating Apple Business and Intune audit capabilities) -->
> Intune-side operations outside the Apple Business permission surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Scope boundary:** This runbook covers Apple Business-side Activity log access and export;
> Intune-side audit logs, compliance reports, and device diagnostic data are outside the
> Apple Business permission surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Training-data notice:** Activity log UI labels, filter dimensions, and export mechanics
> are authored from AI training knowledge of Apple Business portal behavior as of the
> pre-2026-04-14 rebrand, cross-referenced against research/FEATURES.md §7 + PITFALLS.md
> OP-13/OP-14 (SIEM export pattern + author-scope semantics). Steps are marked
> `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# Audit Log Scoping Runbook (DELEG-07)

This runbook documents the Apple Business Activity log access model, including how to access
and filter audit logs within an OU scope, the critical author-scope vs target-scope distinction
(OP-14), the recommended SIEM export pattern (OP-13), and the "no public REST API" anti-feature
that operators must understand before building automation.

## Required Role & Permission

**Required permission:**
- "Read log files" — Logs / Activity permission group — OU-scoped — delegatable via custom role

Sub-org admins holding "Read log files" can access Activity logs for events **authored** within
their OU scope. Tenant-wide Activity log queries (cross-OU) require a tenant IT administrator
or Account Holder role. See the Author-Scope vs Target-Scope section below for the critical
distinction.

For the full permission catalog, see [01-role-permission-model.md](01-role-permission-model.md).

| Permission | Scope | Permitted for sub-org admin? |
|------------|-------|------------------------------|
| Read log files | OU-scoped | Yes — delegatable via custom role |
| Tenant-wide Activity log query | tenant-wide | **DENY-by-default** — requires tenant IT administrator or Account Holder |

> **OP-2:** Activity log access for routine audit reviews must NOT use Account Holder
> credentials. Account Holder is not a delegatable role for operational log access.

---

## Accessing Activity Logs

The Apple Business Activity log is accessed via the **Activity** sidebar in the Apple Business
portal. `[CITED: FEATURES.md §7.1 — sourced from Apple Support axmf7d043c03]`

### Activity Log Access Procedure

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Sign in to Apple Business with a Managed Apple Account holding "Read log files" | Sub-org admin or IT administrator | OP-2: do not use Account Holder credentials |
| 2 | Navigate to **Activity** sidebar | Admin | `[CITED: training; needs live verification]` — label may differ in 2026 Apple Business portal |
| 3 | Apply filters to scope the log view | Admin | Available filter dimensions: Category, Event name, Activity status (Success/Failure), Date range — `[CITED: training; needs live verification]` |
| 4 | Review filtered log entries | Admin | Entries show: timestamp, event name, author (who performed the action), target resource, status |
| 5 | Download the filtered log set | Admin | Select **Download Logs** to export the filtered view — see No Public REST API section below |

> **Note (filter dimensions — [CITED: training; needs live verification]):** The filter
> dimensions listed above (Category, Event name, Activity status, Date range) are based on
> AI training knowledge of the Apple Business portal. The exact labels and available filter
> options should be confirmed against the live portal. `[CITED: training; needs live verification]`

---

## Author-Scope vs Target-Scope

> **Note (critical audit visibility model):** Apple Business audit log entries are scoped to
> the **AUTHOR's OU** — the OU of the admin who performed the action — NOT the OU of the
> TARGET resource. This distinction affects what sub-org admins can see and is a common
> source of audit-trail gaps. [CITED: PITFALLS.md OP-14 — MEDIUM confidence; Apple does
> not single-source document this matrix]

### The "Ghost Device" Example (OP-14)

**Scenario:** Sub-org admin for OU-A transfers a device from OU-A to OU-B (a cross-OU
transfer; see [14-device-transfer-runbook.md](14-device-transfer-runbook.md)).

| Role | Can see the transfer audit entry? | Why |
|------|----------------------------------|-----|
| Sub-org admin for OU-A (author) | **Yes** — sees the action they performed | Audit entry exists in OU-A's author-scope log |
| Sub-org admin for OU-B (target) | **May NOT see it** — the inbound device transfer | The action was authored in OU-A's scope; OU-B's log shows only actions authored by OU-B admins |
| Tenant IT administrator | **Yes** — sees both | Tenant-wide scope covers all OU author-scopes |

**Consequence:** The OU-B sub-org admin discovers a "ghost device" — a device that appeared
in their OU with no visible audit trail for why or when. The transfer is traceable only via a
tenant-wide log query.

### Resolution for OU-B Admins Discovering Ghost Devices

| Step | Action |
|------|--------|
| 1 | Note the device serial number and approximate discovery date |
| 2 | Escalate to a tenant IT administrator with the device serial and date range |
| 3 | Tenant IT administrator performs a tenant-wide Activity log query filtering by device serial and event type "Device Location Changed" |
| 4 | Confirm the source OU, author admin, and timestamp from the tenant-wide result |
| 5 | Document the finding for your OU's audit trail |

> **Note (OU-A admin best practice):** When performing cross-OU transfers, the OU-A admin
> should notify the OU-B admin directly and document the transfer reason in a ticket or
> change record. The Apple Business audit log alone is insufficient for OU-B's visibility.
> See [14-device-transfer-runbook.md](14-device-transfer-runbook.md) for the cross-OU
> transfer pre-checklist, which includes notifying the device user and confirming
> enrollment profile compatibility.

---

## SIEM Export Pattern (OP-13)

For compliance retention requirements (SOX, ISO 27001, NIST, HIPAA), Apple Business Activity
logs should be exported to an external SIEM or log archive on a regular schedule.
[CITED: PITFALLS.md OP-13 — HIGH confidence for "no published retention SLA" claim;
MEDIUM confidence for export mechanics]

> **Note (retention SLA — Apple does not publish):** Apple does NOT publish a definitive
> retention period for Apple Business Activity logs. Community reports suggest fewer than
> one year of log history may be available in the portal (MEDIUM confidence — unverified).
> Do NOT rely on Apple Business as a long-term audit log archive. For any retention
> requirement beyond a few months, configure regular export to an external SIEM.

> **Note (recommended export cadence):** Export Apple Business Activity logs to an external
> SIEM or log archive at least **monthly**. For compliance frameworks requiring 7-year
> retention (SOX, HIPAA), monthly exports ensure no log entries are lost to portal
> roll-off before being archived. More frequent exports (weekly or daily) are recommended
> for high-activity environments.

### SIEM Export Procedure

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Sign in to Apple Business with a Managed Apple Account holding "Read log files" | Admin | OP-2: do not use Account Holder credentials |
| 2 | Navigate to **Activity** sidebar | Admin | `[CITED: training; needs live verification]` |
| 3 | Set the Date range filter to cover the export window (e.g., previous calendar month) | Admin | Ensure the window does not overlap with the previous export to avoid duplicates |
| 4 | Apply any required Category or Event filters for the SIEM feed | Admin | `[CITED: training; needs live verification]` — adjust filters per your SIEM intake policy |
| 5 | Select **Download Logs** | Admin | Apple exports the filtered log set as a downloadable file (text/log format; CSV available for device-assignment-specific events) `[CITED: FEATURES.md §7.4]` |
| 6 | Upload the exported file to your SIEM ingest endpoint | SIEM operator | Follow your organization's SIEM upload procedure; index on timestamp, event type, and author OU |
| 7 | Verify log entries are indexed and searchable in the SIEM | SIEM operator | Spot-check 2–3 entries against the Apple Business Activity view to confirm no data loss during export/import |

> **Note (cross-OU SIEM completeness):** A sub-org admin's Activity log download covers only
> their OU author-scope. For a complete tenant-wide audit archive, a tenant IT administrator
> must perform the export from a tenant-wide Activity view. OU-scoped exports cover actions
> authored by that OU's admins only — not inbound transfers or actions by other OUs affecting
> resources in this OU. See the Author-Scope vs Target-Scope section above.

---

## No Public REST API

> **Note (anti-feature — no public REST API for audit log export):** Apple Business does NOT
> provide a public REST API for Activity log access or export. Audit log access is
> **UI-only** — the only export mechanism is the manual **Download Logs** button in the
> Apple Business portal Activity sidebar.
> [CITED: FEATURES.md §7.6 — HIGH confidence, directly stated in Apple Support documentation]

Admins and engineers seeking to automate audit log collection should be aware of this limitation
before designing compliance or SIEM automation workflows.

### No Public REST API — What This Means for Automation

| Automation request | Status | Alternative |
|-------------------|--------|-------------|
| Automated API pull of audit logs into SIEM | **Not possible** — no public REST API | Manual periodic export via Download Logs (see SIEM Export Procedure above) |
| Webhook or push notification on audit events | **Not available** | Export at regular cadence to catch recent events |
| Bulk historical log extract via script | **Not possible** | Portal-based filtered export only; filter by date range and download |
| Real-time audit log streaming | **Not available** | No streaming API; export frequency is limited by the manual UI download mechanism |

### Feature Requests

If your organization's compliance requirements cannot be met by the manual download mechanism,
submit a feature request to Apple via **Apple Feedback Assistant** at https://feedbackassistant.apple.com.
Select the **Apple Business** category and request a REST API for audit log access.

### Distinction: Apple Business Device API Is NOT Audit Log Access

> **Note (Apple Business Device API — separate surface):** The Apple Business portal
> includes a **Device API Manager** preset role associated with the Apple Business Device
> API (introduced alongside the April 2026 rebrand). This API surface covers device
> management operations, NOT audit log access. The Apple Business Device API does not
> expose Activity log entries or audit event data.
> [CITED: STACK.md §9.3; 01-role-permission-model.md Device API Manager note]
>
> If you encounter the Device API Manager preset role in your portal, treat it as a
> device-management API surface (see [01-role-permission-model.md](01-role-permission-model.md)
> for the current v1.6 policy on Device API Manager — acknowledge but do not document deeply
> pending Apple publishing developer-facing documentation). It is unrelated to the audit log
> limitation described in this section.

---

## Verification

### Post-Access Verification

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Activity sidebar visible | Activity sidebar accessible after sign-in with "Read log files" permission | Verify "Read log files" is included in the admin's custom role and the companion View permission is present (OP-3) |
| Log entries filtered by date range | Entries shown match the specified date range | Adjust date range filters; note that if the portal history is shorter than expected, prior entries may have been rolled off — check SIEM for historical data |
| Author-scope entries correct | Entries show only actions authored by admins in the OU scope | Cross-OU entries authored by other OUs will not appear; escalate to tenant IT administrator for tenant-wide queries |
| Download Logs produces a file | Log export file downloads successfully | Retry; check browser download settings; if persistent, escalate to Apple Enterprise Support |

### SIEM Export Verification

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Exported file contains expected entries | Spot-check 2–3 entries from the Apple Business Activity view against the downloaded file | Re-filter and re-download; verify no export window gaps |
| SIEM ingest successful | Log entries indexed and searchable in SIEM within expected ingest window | Check SIEM ingest pipeline health; verify file format compatibility |
| No duplicate entries | SIEM does not contain duplicate entries from overlapping export windows | Adjust export window boundaries to avoid overlap; use end-of-previous-export timestamp as start of next export window |

---

## Cross-References

- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — Logs / Activity permission group; "Read log files" permission
- Cross-OU device transfer: [14-device-transfer-runbook.md](14-device-transfer-runbook.md) — OP-14 "ghost device" scenario; cross-OU transfers and their audit visibility implications
- Cross-org boundary: [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md) — full Apple-Business-vs-Intune responsibility table (D-02 SOT)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 64 plan 64-04: initial authoring — audit log scoping runbook (DELEG-07); author-scope vs target-scope (OP-14) with ghost-device example; SIEM export pattern (OP-13) with no-retention-SLA Note; No Public REST API anti-feature section; Device API distinction; 01- D-03 citation (no 04- cite per D-03 differential) | -- |
