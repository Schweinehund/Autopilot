---
last_verified: 2026-04-22
review_by: 2026-06-21
audience: end-user
platform: Android
applies_to: BYOD
---

> **For personal-device users:** This guide is for personal-device users enrolling in BYOD Work Profile. If you administer Intune and are configuring BYOD policy, see [docs/admin-setup-android/04-byod-work-profile.md](../admin-setup-android/04-byod-work-profile.md).

# Set up your personal Android device for work (BYOD Work Profile)

## What is BYOD Work Profile?

Your organization uses Microsoft Intune to manage work apps and work data on personal devices through a feature called **BYOD Work Profile** (also known as "personally-owned work profile" in Google terminology). When you enroll your personal Android phone, a separate "work profile" is created on it. Work apps, work data, and work policies live inside the work profile. Your personal apps, photos, messages, and contacts live outside the work profile, and your organization cannot see or touch them. See the [BYOD glossary entry](../_glossary-android.md#byod) for the full definition.

## Before you start

Before enrolling, make sure you have:

- A **personal Android phone** (not a corporate-issued device).
- **Android 8 or newer** (most phones from 2018 onward qualify).
- A personal Google account signed into your phone so you can install apps from the Play Store.
- A work email address from your organization. If you have not received one yet, contact your IT helpdesk before continuing.
- A stable internet connection — Wi-Fi or cellular data.
- About 10 to 15 minutes.

## Enroll your device

Follow these steps to enroll using **Company Portal** (the primary method).

1. On your personal Android phone, open the **Google Play Store**.
2. Search for **Intune Company Portal** and tap **Install**.
3. When the installation finishes, open **Company Portal**.
4. Tap **Sign In** and enter your **work email address** — the one your IT team gave you, not your personal email.
5. Enter your **work password** when prompted. If your organization uses multi-factor authentication, approve the sign-in request on your authenticator app or enter the verification code you receive.
6. On the **Company Access Setup** screen, tap **BEGIN**.
7. Review the on-screen privacy information. Tap **CONTINUE** or **ACCEPT** to proceed.
8. Your phone creates a **work profile**. This may take a minute or two — you will see a progress indicator on screen.
9. When prompted, follow any remaining steps to finish setting up the work profile. You may be asked to set a PIN or screen lock specifically for the work profile.
10. After the work profile is ready, you may be asked to install additional work apps. These install automatically inside the work profile.
11. When you see **DONE** or **You're all set**, tap to finish. Your device is now enrolled.

**After enrollment:** Work apps appear with a small **briefcase icon** — that is how Android marks apps inside the work profile. You may see two management apps: **Company Portal** and **Microsoft Intune**. Use **Microsoft Intune** if IT asks you to report a problem or collect logs. Use **Company Portal** to view or install additional work apps.

### Web enrollment (alternative)

If your IT team has enabled web enrollment, see below for the alternative sign-in flow. Web enrollment is a newer option that does not require you to install Company Portal first.

1. Your IT team will send you a **web enrollment link**, or your phone may redirect you to one when you try to access a work resource.
2. Open the link in your phone's browser (usually Chrome).
3. Sign in with your **work email address** and **work password**.
4. Your phone creates a **work profile** automatically. **Microsoft Intune** and **Company Portal** install themselves inside the work profile.
5. You will see the work profile briefcase icon on your work apps once setup finishes.

If you are unsure whether your IT team has enabled web enrollment, use the Company Portal steps above. If you run into trouble with either method, see **If something goes wrong** below.

## What your IT team can and cannot see

Your work profile is separate from the personal side of your phone. Your IT team can manage the work profile but cannot access the personal side. Here is a plain-language summary:

**Your IT team CAN see:**

- **Work profile data** — work apps you have installed in the work profile, their configuration, and whether your work account is active.
- **Device compliance state** — whether your phone meets your organization's security requirements (for example: PIN set, OS version recent, device not rooted). IT sees a pass or fail result, not the details of what you do.
- **Device hardware basics** — your phone model, Android OS version, and serial number.
- **Work profile location** — if a work app requests your location while you are actively using it inside the work profile.

**Your IT team CANNOT see:**

- **Personal apps** — your IT team cannot see which personal apps you have installed on the personal side of your phone.
- **Personal data** — your personal photos, files, documents, and downloads on the personal side of your phone are invisible to IT.
- **Personal call, SMS, and browser history** — your call log, text messages, and browser history on the personal side are not visible to IT.
- **Your location outside the work profile** — IT cannot track where you are 24 hours a day. Your personal-side location is private.

For the full technical details, see the admin guide: [Privacy boundary](../admin-setup-android/04-byod-work-profile.md#privacy-boundary).

## If something goes wrong

Here are the most common problems you might run into during enrollment, and what to do about each one.

**Message you might see:** "Can't create work profile."
**What this means:** Your phone may already have a work profile from a previous enrollment, may not support work profiles, or may be low on storage space.
**Tell your IT helpdesk:** Check **Settings > Passwords and Accounts** (or **Settings > Accounts**) and look under **Work** to see if a work profile already exists. If one does, remove it and try again. Also tell your helpdesk your phone make and model.

**Message you might see:** "Your device doesn't meet your organization's security requirements."
**What this means:** Your phone failed a security check. Common causes include a screen-lock PIN that is not strong enough, an OS version that is too old, or a device integrity check that did not pass.
**Tell your IT helpdesk:** Take a screenshot of the message and tell your helpdesk the error code shown at the bottom of the screen (if one is displayed).

**Message you might see:** "Enrollment is blocked" or "This device is not allowed to enroll."
**What this means:** Your IT team has a policy in place that prevents this type of enrollment. You cannot resolve this yourself.
**Tell your IT helpdesk:** Your name, your work email address, and your phone model. Your IT team will need to adjust the policy before you can enroll.

**Message you might see:** A "Sign in" prompt that loops, or "We couldn't sign you in."
**What this means:** A security policy may be intercepting your sign-in, or you may have been prompted to sign in through the wrong app (for example, a browser instead of Company Portal).
**Tell your IT helpdesk:** Which app showed the error (Company Portal, a browser, etc.), your username, and whether you could move past the screen or whether it kept reappearing.

**Message you might see:** "Waiting for your device to be set up" or enrollment appears stuck on "Installing required apps."
**What this means:** App installation is taking longer than expected, or your internet connection cannot reach the Google Play Store.
**Tell your IT helpdesk:** How long you have been waiting, whether you are on corporate Wi-Fi, home Wi-Fi, or cellular data, and your phone model.

If your problem is not one of these five, contact your IT helpdesk and describe exactly what you are seeing on screen.

## For IT helpdesk agents

Quick reference for L1 service desk staff supporting BYOD Work Profile enrollment.

**When a user's enrollment fails**, verify these policy-side items:

- Enrollment restrictions allow **personally owned Android** devices for the user's Entra group.
- The user is licensed for Intune and assigned to the BYOD work profile policy.
- Managed Google Play binding is connected and healthy.
- The **Company Portal** app and **Microsoft Intune** app are assigned to the user.
- Compliance policy scope includes the user's Entra group.

For configuration settings, portal-step navigation, and policy templates, see the admin guide: [docs/admin-setup-android/04-byod-work-profile.md](../admin-setup-android/04-byod-work-profile.md).

**For privacy questions:** You cannot see personal-side data on the user's phone. If a user asks what IT can see, direct them to the **What your IT team can and cannot see** section above — or to the canonical [Privacy boundary](../admin-setup-android/04-byod-work-profile.md#privacy-boundary) table in the admin guide.

**For enrollment-flow questions:** The user-facing steps in **Enroll your device** above reflect the current flow. If a user is on an older management app version or the tenant uses web enrollment only, the flow may differ — refer them to your organization's specific guidance.

If the issue is beyond L1 scope, follow your standard L2 escalation path.
