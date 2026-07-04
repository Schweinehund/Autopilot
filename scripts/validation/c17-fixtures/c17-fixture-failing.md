<!-- INTENTIONAL VIOLATIONS — DO NOT "FIX" THIS FILE
     This file is the C17 self-test failing fixture. It is designed to trigger exactly
     two assertion violations so the --self-test mode can confirm C17 blocks on failures.

     Violation 1 — Assertion #13: status: InvalidStatus is NOT in {Draft, Approved, Superseded}
     Violation 2 — Assertion #5: ## Summary body has fewer than 30 words (currently 2 words)

     All other assertions pass:
     - Assertion #9 (block↔frontmatter match) PASSES because block Status = "InvalidStatus"
       matches frontmatter status = "InvalidStatus" — both carry the same invalid value.
     - Assertion #10 (D1 map) PASSES because platform: Windows IS in the D1 map.

     If you need to modify this file for any reason, ensure it still triggers ≥1 violation.
-->
---
doc_id: C17-TEST-FAIL-001
status: InvalidStatus
owner: test-author
doc_type: Runbook
platform: Windows
last_verified: 2026-07-04
---

**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** C17-TEST-FAIL-001 · **Status:** InvalidStatus

# Test Fixture: Intentionally Failing C17 Assertions

## Summary

Too short.

## Version History

| Date | Change |
|------|--------|
| 2026-07-04 | Initial version — C17 self-test failing fixture (intentional violations: #5 + #13) |
