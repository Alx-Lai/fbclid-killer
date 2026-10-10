# fbclid Killer

A Chrome extension that removes the `fbclid` tracking parameter from URLs **before the request ever leaves your browser**.

Unlike content-script approaches that clean the URL after page load, this extension uses Chrome's `declarativeNetRequest` API to strip `fbclid` at the network level — the tracking parameter is never sent to the destination server.

## How it works

A single declarative rule intercepts all navigations (main frame and sub-frame) and removes the `fbclid` query parameter via a URL transform. No content scripts, no background service workers, no permissions beyond `declarativeNetRequest`.

## Installation

1. Go to [chrome://extensions/](chrome://extensions/) in Chrome.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select this folder.
4. Done — `fbclid` is now stripped from every URL you visit.
