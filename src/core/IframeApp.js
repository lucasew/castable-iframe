import { UrlResolver } from './UrlResolver.js';
import { reportError } from '../shared/errorReporter.js';

export class IframeApp {
  static ELEMENT_ID = 'content';

  constructor(windowRef = window, documentRef = document) {
    this.window = windowRef;
    this.document = documentRef;
  }

  run() {
    try {
      const resolver = new UrlResolver(this.window.location);
      // We pass the bound prompt method to maintain correct context if it relies on window
      const url = resolver.resolve(this.window.prompt.bind(this.window));

      if (!url) {
        throw new Error("URL resolution failed or was cancelled by the user.");
      }

      const iframe = this.document.getElementById(IframeApp.ELEMENT_ID);
      if (!iframe) {
        throw new Error(`Element with id '${IframeApp.ELEMENT_ID}' not found.`);
      }

      iframe.src = url;
    } catch (error) {
      reportError(error, { component: 'IframeApp', action: 'run' });
    }
  }
}
