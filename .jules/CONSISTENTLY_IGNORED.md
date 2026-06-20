## IGNORE: Modifying Out-of-Bounds Code Files

**- Pattern:** Restricted agents attempting to directly modify core code files (e.g., `index.html`) when they are outside their allowed scope.
**- Justification:** Agents must respect their path restrictions. If an agent cannot modify the necessary code file, the expected fallback is to document the architectural flow, issues, or security nuances in permitted markdown files like `README.md` or `AGENTS.md`.
**- Files Affected:** `index.html`

## IGNORE: Dummy CI Task Bypass

**- Pattern:** Creating configuration files filled with artificial or dummy execution logic (e.g., inline `test -f` or `grep` commands in `mise.toml`) to simulate successful CI checks.
**- Justification:** Do not create dummy commands just to bypass execution constraints or linter requirements. If a tool is missing or unconfigured, it is acceptable for its execution to fail naturally.
**- Files Affected:** `mise.toml`

## IGNORE: Committing Ephemeral PR Artifacts

**- Pattern:** Including temporary files used during PR creation, such as `commit_msg.txt`, which contain PR body sections.
**- Justification:** Committing tooling, bootstrap artifacts, or temporary files clutters the repository. Changes must be strictly limited to the intended code or configuration updates.
**- Files Affected:** `commit_msg.txt`, `install-mise.sh`

## IGNORE: Transcribing Code Execution in Docs

**- Pattern:** Writing documentation that merely explains the code line-by-line (e.g., "reads the url parameter... and injects it into the iframe's src attribute").
**- Justification:** Documentation must exclusively explain the 'why', architectural flow, non-obvious nuances, and security considerations, rather than stating obvious code execution steps.
**- Files Affected:** `README.md`, `**/*.md`

## IGNORE: Incorrect Inline JavaScript Formatting

**- Pattern:** Using single quotes or inconsistent formatting for inline JavaScript inside HTML files.
**- Justification:** HTML files (like `index.html`) must follow Prettier formatting standards to enforce consistent indentation, double quotes, and trailing semicolons in inline scripts.
**- Files Affected:** `index.html`

## IGNORE: Downgrading GitHub Actions Dependencies

**- Pattern:** Using `actions/checkout@v4` and `jdx/mise-action@v2` in GitHub workflows.
**- Justification:** Dependencies must never be downgraded unless explicitly asked. Specifying these specific versions is considered a downgrade in this project's context.
**- Files Affected:** `.github/workflows/autorelease.yml`
