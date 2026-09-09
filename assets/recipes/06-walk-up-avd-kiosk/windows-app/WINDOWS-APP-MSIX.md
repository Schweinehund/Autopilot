# Windows App MSIX — pinned by reference, not committed

This document pins the Windows App MSIX package that `Deploy-WindowsApp.ps1` installs. The
binary itself is **not** committed to this repository (see "Why the binary is not committed"
below). A packager downloads it once, pins it into the Win32 package alongside
`Deploy-WindowsApp.ps1` and `Detect-WindowsApp.ps1`, and re-uses that pinned copy so the
Enrollment Status Page never depends on reaching the CDN at first boot — this preserves RE-237
Step 3 item 1's stated intent.

## Download

- **Store product:** Windows App, Microsoft Store product ID `9N1F85V9T8BN`.
- **Store page:** https://apps.microsoft.com/detail/9n1f85v9t8bn
- **Offline/scripted download** (documented in the vendored `Deploy-WindowsApp.ps1`'s own header,
  lines 20-21):
  ```
  winget download --id 9N1F85V9T8BN --architecture=x64 -d <destination-folder> --accept-package-agreements --accept-source-agreements --skip-license
  ```
  This downloads the MSIX package plus its dependency files in one step.

## Version to pin

`Detect-WindowsApp.ps1`, vendored verbatim in this tree, ships with `$TargetVersion = '2.0.704.0'`
as its default — that is the version the upstream reference implementation (`Azure/WindowsAppKiosk`,
pinned commit `17e1c09b4883ea2062bef801ae24bbc9722861d7`) targets. Detection is greater-or-equal, so
a packager who downloads a newer MSIX should update `$TargetVersion` in the deployed copy of
`Detect-WindowsApp.ps1` to match the exact version they packaged, per RE-237 Step 3 item 2.

## SHA256

**Could not be computed in this execution environment.** `winget download --source msstore` for
this package requires Microsoft Entra ID authentication with a Global Administrator, User
Administrator, or License Administrator role (`winget`'s own reported message, reproduced verbatim
below) — a non-interactive automation agent cannot satisfy this, and no cached copy of the MSIX
exists anywhere in this repository or its history to hash instead. No hash is recorded here because
none was computed; recording an invented one would be worse than recording none.

```
Microsoft Store package download requires Microsoft Entra Id authentication. Authentication prompt
may appear when necessary. Authenticated information will be shared with Microsoft services for
access authorization. For Microsoft Store package licensing, the Microsoft Entra Id account needs
to be a member of Global Administrator, User Administrator, or License Administrator.
...
Failed to retrieve Microsoft Store package download information
```

**Action for the packager:** after running the `winget download` command above (from a
Store-licensed, Entra-authenticated session), compute and record the SHA256 of the downloaded
`.msix` file before pinning it into the Win32 package:

```powershell
Get-FileHash -Algorithm SHA256 -Path .\Windows365.msix
```

## Why the binary is not committed

The largest file currently tracked in this repository is 1.6 MB. This repository has never used
Git LFS. Introducing a Microsoft Store MSIX binary would touch every clone, all 18 GitHub Actions
workflows, and HARN-04's fresh-clone re-audit — for a binary that a packager must re-download and
re-pin per environment anyway (the MSIX carries no long-term identity beyond its own version and
hash, both of which are recorded, or pending computation, here). Pinning by URL, package ID and
version, plus a computed SHA256 once a packager has store access, preserves RE-237's own stated
intent — a pinned, verifiable MSIX — without the binary.
