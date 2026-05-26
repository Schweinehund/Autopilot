# Phase 67 — Verification & Close-Gate Report

**Closed:** TBD (Plan 67-03)
**Status:** in-progress

Plan 67-01 produces this DRAFT artifact populating the SWEEP-01 H2 subsection only.
Plan 67-02 (SWEEP-02 atomic) and Plan 67-03 (close-gate) will append additional
sections (SWEEP-02 H2, full chain validator exit table, SC#1-4 satisfaction
checklist, traceability blocks).

---

## SWEEP-01: ABM URL Live-State Verification (2026-05-26)

### Mechanism

`markdown-link-check@3.14.2` invoked locally via `node -e "require('markdown-link-check')(...)"` — same pin as `.github/workflows/audit-harness-v1.6-integrity.yml:167` `rotting-external-quarterly` job; IS-equivalent evidence per CONTEXT.md D-02. Pinned via `npm install --no-save markdown-link-check@3.14.2` to avoid `package.json` mutation (no top-level `package.json` exists at repo root — verified per 67-RESEARCH.md A4).

**Invocation rationale:** Per CONTEXT.md Claude's Discretion line 158 + 67-RESEARCH.md Pitfall 2, ONE probe is sufficient for the 4 `ci_1_abm_urls` entries because all 4 entries point to the same URL (`https://business.apple.com` — different files / lines, same target). Probing once also naturally avoids Apple's bot-mitigation rate-limiting on 4-in-rapid-succession requests.

**Pin verification (executed before probe):**

```
$ npm view markdown-link-check@3.14.2 version
3.14.2

$ node -e "console.log(require('markdown-link-check/package.json').version)"
3.14.2
```

Both registry-current and locally-installed versions match the cron pin at `audit-harness-v1.6-integrity.yml:167` — no pin drift.

### Tool Output (primary evidence)

Invocation: `node -e "require('markdown-link-check')('[ABM](https://business.apple.com)', { timeout: '10s' }, (err, results) => { console.log(JSON.stringify(results, null, 2)); process.exit(results[0].status === 'alive' ? 0 : 1); });"`

Captured: 2026-05-26 15:58:44 UTC
Exit code: **0** (status === 'alive')

```json
[
  {
    "link": "https://business.apple.com",
    "statusCode": 200,
    "err": null,
    "status": "alive"
  }
]
```

### Corroborating Evidence (secondary — curl HEAD)

Invocation: `curl.exe -I -L --max-time 10 https://business.apple.com` (use `curl.exe` explicitly, not the PowerShell `curl` alias which is `Invoke-WebRequest`).

Captured: 2026-05-26 15:58:15 UTC (Date header from Apple's edge)
Exit code: **0**

```
HTTP/1.1 200 OK
Server: Apple
Content-Type: text/html
Access-Control-Allow-Origin: *
Content-Language: en
Content-Security-Policy: default-src 'self' *.apple.com; base-uri 'self'; script-src 'self' *.apple.com 'strict-dynamic' 'nonce-a7bbfbeca5a0908e638cfef73098b284' 'unsafe-eval'; style-src 'self' *.apple.com 'unsafe-inline'; img-src 'self' *.apple.com data: pineapple-coyote.s3.amazonaws.com data.securemetrics-apple.com; media-src 'self' *.apple.com blob: embed.apple.media pineapple-coyote.s3.amazonaws.com; frame-src 'self' *.apple.com embed.apple.media pineapple-coyote.s3.amazonaws.com; connect-src 'self' *.apple.com dpm.demdex.net data.securemetrics-apple.com; worker-src 'self' blob:; object-src 'none'
Cross-Origin-Opener-Policy: same-origin
Hwp-Trace-Id: 4aac7ae26aa07d0f7ed5de2b9f810626
Server-Timing: marketing;dur=84.1;desc="Marketing Static Pages Proxy",total;dur=84.3;desc="Total Response Time"
Strict-Transport-Security: max-age=31536000; includeSubdomains
Vary: Accept-Language, User-Agent
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-Xss-Protection: 1; mode=block
Expires: Tue, 26 May 2026 15:58:15 GMT
Cache-Control: max-age=0, no-cache, no-store
Pragma: no-cache
Date: Tue, 26 May 2026 15:58:15 GMT
Content-Length: 0
Connection: keep-alive
```

**Key signals:**
- `HTTP/1.1 200 OK` — alive
- `Server: Apple` — authoritative origin, not a CDN error/maintenance page
- **No `Location:` redirect header** — URL is NOT being redirected (no Apple-issued 301/302 to a successor URL)
- **No rebrand-banner header** — Apple has not added a sunset/migration banner header to this URL
- `Strict-Transport-Security: max-age=31536000` — production HSTS preserved

Advisor's earlier corroborating probe (per 67-CONTEXT.md D-02 line 48): 2026-05-26 14:29:40 UTC, same `HTTP/1.1 200 OK / Server: Apple / no redirect / no rebrand-banner` response — IS-consistent with this probe at 15:58:15 UTC (1h 29m later, same edge behavior).

### Outcome

**Branch A taken** — All 4 `c13_rotting_external.ci_1_abm_urls` entries point to the same alive URL `https://business.apple.com` which returned `status: 'alive'` / `statusCode: 200` via the cron-pinned `markdown-link-check@3.14.2` tool, AND `HTTP/1.1 200 OK / Server: Apple / no redirect` via the corroborating `curl.exe -I -L` HEAD probe. NO tool divergence observed (markdown-link-check and curl agree). NO corpus edits required.

**Sites confirmed alive (no edit):**

| # | File | Line | URL |
|---|------|------|-----|
| 1 | `docs/admin-setup-ios/05-app-deployment.md` | 92 | https://business.apple.com |
| 2 | `docs/admin-setup-macos/01-abm-configuration.md` | 52 | https://business.apple.com |
| 3 | `docs/admin-setup-macos/04-app-deployment.md` | 105 | https://business.apple.com |
| 4 | `docs/_glossary-macos.md` | 64 | https://business.apple.com |

**Sidecar annotation applied (Plan 67-01 commit):**
Each of the 4 entries in `scripts/validation/v1.6-audit-allowlist.json` `c13_rotting_external.ci_1_abm_urls` gained one new field `"last_revalidated": "2026-05-26"` (ANNOTATE-not-remove per CONTEXT.md D-04 line 103). 4-entry shape preserved (V-66-02 shape stability per `check-phase-66.mjs:85-112`).

**Quarterly cron continues monitoring** at `audit-harness-v1.6-integrity.yml:160` cron `'0 8 1 1,4,7,10 *'`; next first-fire 2026-07-01.

---

*Plan 67-02 (SWEEP-02 atomic VPP-location-token → content-token surgical rename) and Plan 67-03 (close-gate full chain re-run + traceability flips) will append additional H2 sections below.*
