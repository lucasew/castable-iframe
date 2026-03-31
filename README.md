# Castable iframe

Watch whatever you want in a Cast device without triggering their custom cast apps. 

Needs an extension to work properly: https://chromewebstore.google.com/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe

I recommend using it in a different browser profile so the bad things about enabling an extension like that do not expose everything.

## Architectural Flow
The application functions as a castable `iframe` designed to render arbitrary URLs on Cast devices.
The main entry point is `index.html`. It reads the `url` parameter from the query string (or prompts the user if missing) and injects it into the iframe's `src` attribute. By avoiding custom cast receivers, the playback flow is kept minimal.

## Security Nuances & Considerations
- **X-Frame-Options & CSP Bypass:** Browsers typically block cross-origin iframes via `X-Frame-Options` and `Content-Security-Policy`. This application relies on the 'Ignore X-Frame headers' extension to forcibly strip these headers, enabling unrestricted rendering.
- **Isolation Requirement:** Because stripping these security headers exposes the browser to significant risks (e.g., Clickjacking), it is strictly advised to run this setup in an isolated browser profile dedicated solely to casting. Do not use this extension in your primary browsing profile.
- **Frame Busting Prevention:** When embedding external URLs, there is a risk that the embedded site might attempt to break out of the iframe and hijack the top-level window. This app must strictly utilize the `sandbox` attribute on the iframe, omitting `allow-top-navigation` to prevent breakout, while keeping necessary flags like `allow-scripts` to maintain functionality.
