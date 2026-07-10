# Phase 125 — Deferred Items

## DEFER-125-06-A: `docs/_glossary-android.md` (RE-179) fails `guard-docx.mjs` CUSTOM-PROPS check

**Discovered during:** Plan 125-06 Task 1 (PIPE-02-CLOSE-RUNBOOK representative-set conversion).

**Symptom:** `node scripts/pipeline/guard-docx.mjs` on the converted
`.docx` reports:

```
[CUSTOM-PROPS/3] V-GUARD-CUSTOM-PROPS: FAIL -- unexpected custom property name(s)
outside the known EEE key set: [phase_46_wave2_retrofit]
```

**Root cause:** `docs/_glossary-android.md` frontmatter carries a stale
`phase_46_wave2_retrofit: 2026-04-25` key (line 11) predating the 9-key EEE
custom-property set (`applies_to, audience, doc_id, doc_type, last_verified,
owner, platform, review_by, status`) locked at Phase 113/D-04 OQ4. Pandoc
promotes this non-standard YAML key to a `docProps/custom.xml` Word custom
property, which the guard's CUSTOM-PROPS check (a LENIENT permanent check —
any key outside the known set signals a promotion regression) correctly
flags.

**Scope decision:** Out of scope for Plan 125-06. `_glossary-android.md` is
not a file this plan is authorized to edit (Task 1's `<files>` scope is
`PIPE-02-CLOSE-RUNBOOK.md`; editing a structural content doc from a prior
milestone phase would be an unrelated-file fix, excluded per the executor's
scope-boundary rule). The representative-set selection substituted
`docs/android-lifecycle/00-enrollment-overview.md` (RE-185) for Android
platform coverage instead — converts + guards clean (3/3 PASS).

**Recommended follow-up (v1.17+):** Remove the stale `phase_46_wave2_retrofit`
frontmatter key from `docs/_glossary-android.md` (harmless historical
artifact; the retrofit it marks is long complete) so the file guard-passes
cleanly like its sibling glossaries.

**Status:** Logged, not fixed. Does not block Plan 125-06 (Android coverage
satisfied via RE-185 substitute).
