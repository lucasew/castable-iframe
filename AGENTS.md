# AGENTS.md

## General

-   **Mise First:** `mise` is used for all task execution.
-   **Centralized Error Handling:** All errors must route through the single centralized error-reporting function (`src/shared/errorReporter.js`). Do not use `console.error` directly.
-   **Group by Domain and Responsibility:** Code should be structured around its domain purpose, not by file type.

## Operational Memory

-   `index.html` -> Main entry point of the frontend
-   `src/shared/errorReporter.js` -> Centralized Error Reporting module
-   `mise.toml` -> CI / Test task runner configurations
