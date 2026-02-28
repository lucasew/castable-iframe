class ErrorReporter {
  constructor() {
    if (ErrorReporter.instance) {
      return ErrorReporter.instance;
    }
    ErrorReporter.instance = this;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    window.addEventListener('error', (event) => {
      this.report(event.error || new Error(event.message));
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.report(event.reason || new Error('Unhandled Promise Rejection'));
    });
  }

  report(error, context = {}) {
    // In a real app, this would send to Sentry or another service
    const payload = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    };

    // Using console.error here internally as the ultimate sink,
    // but application code should only call ErrorReporter.report()
    console.error('[ErrorReporter]', payload);
  }
}

const errorReporter = new ErrorReporter();
errorReporter.init();

window.reportError = (error, context) => errorReporter.report(error, context);
