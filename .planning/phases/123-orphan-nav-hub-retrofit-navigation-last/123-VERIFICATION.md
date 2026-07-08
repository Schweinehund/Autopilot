# Phase 123 Verification: Orphan Nav-Hub Retrofit (Navigation-Last)

**Verified:** 2026-07-08
**Verifier:** 123-04 (Phase 123 close plan)
**Verdict:** PASS — all 3 ROADMAP Success Criteria confirmed TRUE. Phase 123 is closed. RETRO-06 is Complete.

---

## Roadmap Success Criteria — Evidence

### SC1 — C17 exits 0 on the FULL corpus (the 4 new hubs green AND all previously-enrolled files still green)

**TRUE.**

```
node scripts/validation/c17-eee-contract.mjs
C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0
C17 summary: 229 files checked, 0 with violations, 0 total violations
```

229 files checked (up from 225 at Phase 122 close — the +4 delta is exactly the 4 nav-hubs enrolled in Plan 123-03). Re-run **after** this plan's Task 1 pre-existing-rot link fixes (commit `5b28c88`) to confirm the link fixes did not regress C17 — confirmed 0 violations, same as pre-fix. This is a full-corpus run (no path args); it re-validates every previously-enrolled Phase-1/Phase-2 file alongside the 4 new hubs, matching the Phase-122-15 "225/0" full-corpus discipline (here: "229/0").

### SC2 — check-nav-hub-links.mjs exits 0 — zero broken links in BOTH outbound and inbound scans, across the final (post-123-03) corpus

**TRUE.**

```
node scripts/validation/check-nav-hub-links.mjs --verbose
check-nav-hub-links: 0 failures (outbound + inbound clean)
check-nav-hub-links summary: 0 outbound failure(s), 0 inbound failure(s), 0 total
```

**Before-state (true-positive baseline, re-confirmed this plan before any fix was applied):** the checker (built standalone in Plan 123-02) reported exactly 12 outbound failures and 0 inbound failures against the post-123-03 corpus:

```
docs/common-issues.md:388 -> [macOS: Compliance / Access Blocked](#compliance-access-blocked)  -- anchor not found: #compliance-access-blocked
docs/quick-ref-l2.md:341,342,343,345,347 -> [...](../operations/patch-management/04-android-patch-delivery.md...)  -- target file not found
docs/quick-ref-l2.md:393,394,395,396,398,400 -> [...](../admin-setup-linux/03-compliance-policy.md...)  -- target file not found
check-nav-hub-links summary: 12 outbound failure(s), 0 inbound failure(s), 12 total
```

This exactly matches the 12 pre-existing broken links enumerated in `123-CONTEXT.md` D-01 and re-verified byte-level in `123-RESEARCH.md` — proving (a) the checker is not a no-op, and (b) 123-03's retrofit did not introduce or shift the count (line numbers shifted from the RESEARCH-era 316-373/360 range to 341-400/388 due to 123-03's Summary insertion + `#12` blockquote splits, but the link targets and count are identical).

**Fix applied (separate git-blame-attributed commit, per D-01):** `5b28c88` — `fix(123-04): pre-existing-rot cleanup — 12 broken nav-hub links (predates Phases 121/122)`. This commit is distinct from the 123-03 EEE-retrofit commits (`15b1b20` feat, `d2ea0c8` fix). Git-blame evidence cited in the commit message:

| File:Line (post-123-03) | git blame commit | git blame date |
|---|---|---|
| `quick-ref-l2.md:341` (1st of 3 `play-integrity-attestation` rows) | `d1ecbaef` | 2026-04-30 |
| `quick-ref-l2.md:393` (1st of 4 Linux compliance-category rows) | `ff42fd6d` | 2026-05-05 |
| `common-issues.md:388` (dead anchor) | `caf45241` | 2026-04-30 |

All predate Phases 121/122's 2026-07-07 content commits by 2+ months — confirming these are pre-existing corpus rot, not retrofit-induced regressions.

**The 12 fixes:**
- 11 `../`-over-escape links in `quick-ref-l2.md` (dirs `operations/` and `admin-setup-linux/` live directly under `docs/`, as siblings of `quick-ref-l2.md`, not one level up) — dropped the `../` prefix on all 11.
- 1 dead same-file anchor in `common-issues.md` (`#compliance-access-blocked` → repointed to the real GitHub slug `#compliance-failure-or-access-blocked` of the existing `### Compliance Failure or Access Blocked` heading) — per the RESEARCH-recommended repoint (content is legitimate; the anchor was a hand-typed typo).
- One target anchor required the GitHub double-hyphen slug correction: `### Step 4: Configure Device Encryption (dm-crypt + LUKS)` slugifies to `step-4-configure-device-encryption-dm-crypt--luks` (double hyphen — the `+` is surrounded by spaces on both sides, so its in-place removal leaves two adjacent spaces, which become two hyphens), not the single-hyphen form RESEARCH's table listed. Caught by running the checker against the corrected link and observing 1 residual failure before the double-hyphen correction.

### SC3 — Git history confirms the earliest Phase-123 hub commit post-dates the latest Phase-121/122 content commit (navigation-last)

**TRUE.**

**Step 1 — latest commit touching any Phase-121/122 content class** (decision-trees, lifecycle directories, glossaries, and the named admin-setup/reference overview files):

```
git log -1 --format='%H %cI %s' -- docs/decision-trees/ docs/lifecycle/ docs/lifecycle-apv2/ \
  docs/android-lifecycle/ docs/ios-lifecycle/ docs/macos-lifecycle/ docs/linux-lifecycle/ \
  docs/end-user-guides/ docs/_glossary*.md \
  docs/admin-setup-apv1/00-overview.md docs/admin-setup-apv1/01-hardware-hash-upload.md \
  docs/admin-setup-apv2/00-overview.md docs/admin-setup-android/00-overview.md \
  docs/admin-setup-ios/00-overview.md docs/admin-setup-macos/00-overview.md \
  docs/admin-setup-linux/00-overview.md docs/admin-setup-8021x/00-overview.md \
  docs/admin-setup-8021x/01-eap-method-overview.md docs/reference/ca-enrollment-timing.md

=> e2ec2a5e93874ebc07dd22b44605bc6a706b33db  2026-07-07T23:19:51-05:00  fix(122): correct macos-setup/00 topology description (D-01 finding)
```

**Step 2 — earliest commit touching any of the 4 nav-hubs that lands after the Step-1 cutoff:**

```
git log --reverse --format='%H %cI %s' -- docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md \
  | awk -v cutoff="2026-07-07" '$2 > cutoff' | head -1

=> 15b1b20dbd879c795bac6bcf3b019cbf5d46f062  2026-07-08T09:09:13-05:00  feat(123-03): EEE-enroll the 4 orphan nav-hubs with net-new Summaries
```

**Comparison:** `2026-07-08T09:09:13-05:00` (earliest Phase-123 hub commit, `15b1b20`) is strictly later than `2026-07-07T23:19:51-05:00` (latest Phase-121/122 content commit, `e2ec2a5`) — **navigation-last confirmed by construction and by git history.** No Phase-123 nav-hub commit exists before this cutoff; the phase's own registry-prep commits (Plan 123-01) and link-checker-build commits (Plan 123-02) do not touch the 4 hub files themselves (123-01 only touches `docs/_registry/RE-index.md` + `scripts/pipeline/`; 123-02 only touches `scripts/validation/`), so they are correctly excluded from this hub-file-scoped query.

---

## Registry Confirmation (RE-218..221)

```
grep -E '\| RE-(218|219|220|221) \|' docs/_registry/RE-index.md
| RE-218 | docs/common-issues.md | Common Provisioning Issues | Reference | Approved |
| RE-219 | docs/index.md | Device Provisioning Documentation | Reference | Approved |
| RE-220 | docs/quick-ref-l1.md | L1 Quick-Reference Card | Reference | Approved |
| RE-221 | docs/quick-ref-l2.md | L2 Quick-Reference Card | Reference | Approved |
```

All 4 confirmed `Doc Type: Reference`, `Status: Approved` — matching the D-01/Registry LOCK in `123-CONTEXT.md`.

---

## Requirement Completion

`RETRO-06`'s full text (`REQUIREMENTS.md:22`) requires BOTH:
1. "All orphan nav-hubs retrofitted to EEE with navigation-last discipline; C17 exits 0" — satisfied by Plan 123-03 (SC1 above re-confirms it holds post-link-fixes).
2. "Routing/link tables remain accurate" — satisfied by this plan's Task 1 (the 12 pre-existing-rot fixes) + Task 2 (SC2 link-checker green, SC3 navigation-last attestation).

Both halves are now TRUE. `RETRO-06` is flipped to `Complete` in `.planning/REQUIREMENTS.md`'s traceability table as part of this plan's close (see REQUIREMENTS.md diff in this plan's commits).

---

## Conclusion

All 3 Phase-123 Success Criteria are demonstrably TRUE:

1. **SC1** — Full-corpus C17 exits 0 (229 files, 0 violations, all 13 assertions) — the 4 hubs plus every previously-enrolled file. ✅
2. **SC2** — `check-nav-hub-links.mjs` exits 0 (outbound + inbound); the 12 pre-existing broken links fixed in a separate git-blame-attributed commit (`5b28c88`), distinct from the 123-03 retrofit commits. ✅
3. **SC3** — Navigation-last git-history attestation: earliest Phase-123 hub commit (`15b1b20`, 2026-07-08T09:09:13-05:00) strictly post-dates the latest Phase-121/122 content commit (`e2ec2a5`, 2026-07-07T23:19:51-05:00). ✅

**Phase 123 is CLOSED.** RETRO-06 is Complete.

---
*Phase: 123-orphan-nav-hub-retrofit-navigation-last*
*Verified: 2026-07-08*
