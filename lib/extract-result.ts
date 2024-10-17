export default class ExtractResult<T, U, V, W> {
  subdomain: T;
  domain: U;
  suffix: V;
  isPrivate: W;

  constructor(subdomain: T, domain: U, suffix: V, isPrivate: W) {
    this.subdomain = subdomain || ('' as T);
    this.domain = domain;
    this.suffix = suffix;
    this.isPrivate = isPrivate;
  }
}
