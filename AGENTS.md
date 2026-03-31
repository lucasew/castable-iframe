# Project Conventions & Architectural Rules

## 1. File Responsibilities (Operational Memory)
- `index.html` -> Main frontend entry point. Sets up the iframe application and bypasses X-Frame-Options/CSP restrictions via an extension in an isolated browser profile. Uses ES modules to import core logic.
- `src/core/` -> Domain and application logic (e.g., `UrlResolver`, `IframeApp`).
- `src/shared/` -> Cross-cutting utilities (e.g., `errorReporter`).

## 2. Global Error Handling
- **Centralized Error Reporting:** The project MUST route all unexpected errors through a single centralized error-reporting function (`src/shared/errorReporter.js`).
- Direct calls to `console.error` or external error trackers (like `Sentry.captureException`) at the call site are strictly prohibited.
- Do not leave empty `catch` blocks. All unrecoverable errors MUST be reported to the centralized handler.

## 3. Iframe Security Guidelines
- Iframes rendering arbitrary external URLs must always use the `sandbox` attribute.
- **Rule:** Explicitly omit `allow-top-navigation` to prevent frame busting attacks (hijacking the parent window). Retain necessary functionality such as `allow-scripts` and `allow-same-origin`.

## 4. CI/CD & Tooling Rules
- The project requires exactly one GitHub Actions workflow file (`.github/workflows/autorelease.yml`) containing a single job.
  - Execution flow: install dependencies -> run codegen -> create PR if differences exist -> run CI -> release (conditional) -> upload artifacts (conditional).
- **Mise Constraints:**
  - All linting and formatting must be done using `workspaced` via `mise` (always pinned to a specific version, never 'latest' or 'lts'). Manual installation of linters is prohibited.
  - In `mise.toml`, standard tasks like `install`, `test`, and `codegen` must strictly depend on wildcards (e.g., `[task]:*`). Empty fallback tasks (e.g., `[tasks."test:noop"]`) must be provided to satisfy requirements without hacking execution constraints.
- Tooling/bootstrap artifacts (e.g., downloaded binaries, `install-mise.sh`) must NEVER be committed.
- Piping `curl` directly to `sh`/`bash` is blocked. Download binaries directly, make executable, and place in `~/.local/bin`.

## 5. Pull Request & Agent Rules
- **PR Titles:** Must strictly follow the active agent's designated title format (e.g., '📝 Docs: [Description]', '🧹 Janitor: [Description]', '🛠️ Refactor: [Description]', '🛡️ Sentinel: [Severity] [Description]', '🛟 Arrumador: [Description]').
- **PR Body:** Must include the mandatory sections: `Assumptions`, `Alternatives Not Chosen`, `How To Pivot`, and `Next Knobs`.
- **Journals:** Agent journals (e.g., `.jules/docs.md`, `.jules/janitor.md`) must be maintained by appending a single-sentence insight formatted exactly as `- YYYY-MM-DD: [reusable insight]` for every PR without adding headers or bold fields.
- **Agent Scope Limits:**
  - "Arrumador" is restricted to tooling/CI paths and forbidden from modifying business logic unless unblocking CI.
  - "Docs" must strictly avoid obvious comments (e.g., "Returns user" for `getUser`). Documentation must explain the 'why', architectural flow, non-obvious nuances, and security considerations.
  - "Docs" is restricted to specific allowed paths (`**/*.md`, `**/*.mdx`, `**/*.txt`, `**/*.d.ts`, `**/*.ts`, `**/*.svelte`). Editing other files like `index.html` is strictly forbidden.

## 6. Testing & Visual Verification
- Frontend UI changes require visual verification using a temporary Playwright Python script to take and review a screenshot.
- A local HTTP server (e.g., `python3 -m http.server`) must be spawned for the Playwright script to bypass `file://` protocol CORS and module loading restrictions due to ES modules.
- Use `os.getcwd()` for robust workspace root referencing in Python scripts instead of hardcoded absolute paths.
