# Agent Guidelines and Project Conventions

## Operational Memory

* `index.html` -> The main application entry point. This is intentionally designed as a minimal, single-file application. Do not extract inline scripts, CSS, or domain logic into separate external files or ES modules, as this introduces unnecessary complexity and CORS restrictions.

## Architectural Rules

* **Centralized Error Reporting:** All code paths that handle unexpected errors MUST funnel through a centralized error-reporting function (e.g., `reportError`). Never call `console.error` directly at the call site for unhandled errors. If it doesn't exist, create it in the project's shared scope. Do not use empty catch blocks.
* **Single-file application:** Any modifications to the application behavior must remain inside `index.html`. Do not extract inline scripts to external JavaScript files.
* **Formatting:** HTML files (like `index.html`) should be formatted using Prettier. Enforce consistent indentation, double quotes, and trailing semicolons in inline JavaScript.
* **Security Constraints:** The application functions as a castable iframe relying on a specific Chrome extension. Iframes rendering arbitrary external URLs must always use the `sandbox` attribute, explicitly omitting `allow-top-navigation` while retaining necessary functionality (like `allow-scripts` and `allow-same-origin`).
* **Tooling:** All linting, formatting, and CI checks are executed via `mise` using pinned versions (e.g., `mise run test`). Do not use raw NPM scripts or create ad-hoc CI tasks.
