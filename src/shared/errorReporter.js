/**
 * Centralized error reporting module.
 * Funnels all unexpected errors to Sentry (if available) or logs them with context.
 */
export function reportError(error, context = {}) {
  if (window && window.Sentry) {
    window.Sentry.captureException(error, { extra: context });
  } else {
    console.error("Unexpected Error:", error, "Context:", context);
  }
}
