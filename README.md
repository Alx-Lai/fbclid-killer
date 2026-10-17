# fbclid Killer

A lightweight, privacy-focused Chrome extension (Manifest V3) that stops Facebook / Meta click tracking, Meta Pixel tracking, and 1st-party cookie tracking (`_fbp` and `_fbc`).

## What it blocks

1. **`fbclid` & Facebook URL Trackers**:
   - Strips `fbclid`, `fb_action_ids`, `fb_action_types`, `fb_source`, and `fb_ref` from URLs before the navigation request leaves your browser via `declarativeNetRequest`.
   - Prevents landing pages from receiving the click identifier.

2. **Meta Pixel & Tracking Beacons**:
   - Blocks `connect.facebook.net/*fbevents.js` (Meta Pixel library).
   - Blocks `connect.facebook.net/signals/*` (Meta AAM / Signals).
   - Blocks `facebook.com/tr` and `facebook.net/tr` tracking beacons on third-party websites.

3. **1st-Party Tracking Cookies (`_fbp` and `_fbc`)**:
   - **In-Page JavaScript Protection (`MAIN` world)**: Intercepts `document.cookie` setters and getters at `document_start`. Prevents scripts from writing `_fbp` / `_fbc` to the cookie store and masks them from client reads.
   - **Background Service Worker**: Continuously monitors `chrome.cookies.onChanged` to purge any `_fbp` or `_fbc` cookies created via HTTP response headers (`Set-Cookie`), neutralizing **Meta Conversions API (CAPI)** server-to-server tracking.

## Installation

1. Open [chrome://extensions/](chrome://extensions/) in Chrome.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** (or click the reload icon if already loaded) and select this folder.
4. Enjoy a cleaner, tracker-free browsing experience.
