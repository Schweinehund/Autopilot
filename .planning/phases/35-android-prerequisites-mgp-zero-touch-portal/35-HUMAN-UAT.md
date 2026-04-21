---
status: partial
phase: 35-android-prerequisites-mgp-zero-touch-portal
source: [35-VERIFICATION.md]
started: 2026-04-21T00:00:00Z
updated: 2026-04-21T00:00:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Mermaid flowchart renders on GitHub
expected: `docs/admin-setup-android/00-overview.md` 5-branch flowchart renders with all expected nodes and edges (Admin lands here → Choose your mode → three branches: COBO/BYOD/Dedicated → MGP → three mode leaves; ZTE → MGP → ZT → ZTE content; AOSP → AOSP stub). All node labels legible.
result: [pending]

### 2. SC5 callout placement review (subjective)
expected: Reading all four deliverables top-to-bottom, inline blockquotes appear at the moment of each URL/account/disconnect/KME/Method decision; no "Gotchas" section exists.
result: [pending]

### 3. DPC extras JSON copy-paste sanity check
expected: Copy the DPC extras JSON block from `02-zero-touch-portal.md` lines 93–105 into a JSON validator — parses without error; zero in-JSON `//` or `/* */` comments.
result: [pending]

### 4. Live portal re-verification (authenticated session)
expected: With an authenticated Intune admin session, walk the documented portal paths:
- `endpoint.microsoft.com` → Devices → Enrollment → Android
- Devices → By platform → Android → Device onboarding → Enrollment → Bulk enrollment methods → Zero-touch enrollment
- `enterprise.google.com/android/zero-touch/customers` sidebar
- `accounts.google.com/signupwithoutgmail`
- CloudDPC signature checksum `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` matches current MS Learn ref-corporate-methods

All paths resolve; all URLs load; signature checksum matches.
result: [pending]

### 5. REVIEW.md warnings decision (WR-01, WR-02, WR-03)
expected: Review the three warnings in `35-REVIEW.md` and decide apply-fix or accept-with-rationale:
- WR-01 (`01-managed-google-play.md:100`) — author meta-comment `(text-only stub, not hyperlink)` leaked into what-breaks table
- WR-02 (`01-managed-google-play.md:26`) — "Google requires a minimum of two" overstates RESEARCH-sourced "recommends"
- WR-03 (`01-managed-google-play.md:120`) — "1–65,535 days" vs "up to ~65 years" numerical inconsistency

Either apply three edits or accept with rationale.
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps
