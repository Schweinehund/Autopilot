# Windows App Win32 package - runtime dependencies

The two VCLibs runtime `.appx` packages this package's `Deploy-WindowsApp.ps1` installs alongside
Windows App are **not committed to this repository**. Both breach this phase's 2 MB acceptance cap by
a wide margin (the larger file alone is over 4x the largest file already tracked in this repository),
and `assets/recipes/06-walk-up-avd-kiosk/NOTICE` already applies the same size-avoidance disposition to
the Windows App MSIX itself (see `windows-app/WINDOWS-APP-MSIX.md`) and to this identical `Dependencies/`
folder when it was confirmed but not vendored during plan 155-02.

Each file below is pinned by exact filename, version, upstream source URL and the SHA256 this plan
computed directly from the staged bytes delivered by the owner — not a value copied from elsewhere.

## Microsoft.VCLibs.140.00.UWPDesktop_14.0.33728.0_Universal_X64.appx

- **Version:** 14.0.33728.0 (UWPDesktop variant)
- **Upstream source:** `Azure/WindowsAppKiosk`, pinned commit `17e1c09b4883ea2062bef801ae24bbc9722861d7`,
  path `source/WindowsApp/Apps/WindowsApp/Dependencies/Microsoft.VCLibs.140.00.UWPDesktop_14.0.33728.0_Universal_X64.appx`
  ( `https://raw.githubusercontent.com/Azure/WindowsAppKiosk/17e1c09b4883ea2062bef801ae24bbc9722861d7/source/WindowsApp/Apps/WindowsApp/Dependencies/Microsoft.VCLibs.140.00.UWPDesktop_14.0.33728.0_Universal_X64.appx` ).
  Confirmed reachable at this exact SHA and byte-size (`Content-Length: 6757465`) via a direct HTTP HEAD
  request against the raw URL above before this document was written.
- **SHA256 (computed from the staged bytes delivered by the owner):**
  `077a3d1a5d0622bd3004dca85f5e192d6e98ec79b83d4aa06766759ea6c09c3d`
- **Bytes:** 6,757,465

## Microsoft.VCLibs.140.00_14.0.33519.0_Universal_X64.appx

- **Version:** 14.0.33519.0
- **Upstream source:** `Azure/WindowsAppKiosk`, pinned commit `17e1c09b4883ea2062bef801ae24bbc9722861d7`,
  path `source/WindowsApp/Apps/WindowsApp/Dependencies/Microsoft.VCLibs.140.00_14.0.33519.0_Universal_X64.appx`
  ( `https://raw.githubusercontent.com/Azure/WindowsAppKiosk/17e1c09b4883ea2062bef801ae24bbc9722861d7/source/WindowsApp/Apps/WindowsApp/Dependencies/Microsoft.VCLibs.140.00_14.0.33519.0_Universal_X64.appx` ).
  Confirmed reachable at this exact SHA and byte-size (`Content-Length: 896581`) via a direct HTTP HEAD
  request against the raw URL above before this document was written.
- **SHA256 (computed from the staged bytes delivered by the owner):**
  `9c17b521f9d690a1f504da5108ed6eec5669eb3a8fd1331eef43e40d84e74283`
- **Bytes:** 896,581

## Assembly

Fetch both files directly from the pinned SHA above into this folder (`Dependencies/`) before running
`Build-WindowsAppPackage.ps1`. Do not substitute a different VCLibs release without re-confirming the
version this package's `Deploy-WindowsApp.ps1` expects.
