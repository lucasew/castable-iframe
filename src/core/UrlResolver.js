export class UrlResolver {
  static PARAM_URL = 'url';
  static PROMPT_MSG = 'URL:';

  constructor(windowLocation) {
    this.searchParams = new URLSearchParams(windowLocation.search);
  }

  resolve(promptFunction = prompt) {
    if (this.searchParams.has(UrlResolver.PARAM_URL)) {
      return this.searchParams.get(UrlResolver.PARAM_URL);
    }
    return promptFunction(UrlResolver.PROMPT_MSG);
  }
}
