# Castable iframe

Watch whatever you want in a Cast device without triggering their custom cast apps.

## How it works

The page uses an iframe to load arbitrary URLs in full screen. This bypasses the typical Cast receiver apps, forcing the display to act as a raw browser rendering the target site.

You can supply the target URL via the `?url=` query parameter. If no parameter is provided, the page will prompt you to enter a URL.

## Requirements

Needs an extension to bypass `X-Frame-Options` or `Content-Security-Policy` restrictions, otherwise most modern websites will refuse to render inside the iframe.
Recommended extension: [Ignore X-Frame headers](https://chromewebstore.google.com/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe)

## Security considerations

**I strongly recommend using it in a different browser profile.**

Extensions that strip security headers (like X-Frame-Options) broadly disable crucial browser protections against clickjacking and other cross-site attacks. Running this in your primary profile exposes all your active sessions and data to unnecessary risk.
