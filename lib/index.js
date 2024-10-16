(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // Node.js环境
    module.exports = factory();
  } else {
    // 浏览器环境
    root.tldExtract = factory();
  }
}(this, function () {
  const suffixList = require('./public_suffix_list.dat.txt');

  const [publicPart, privatePart] = suffixList.split('===BEGIN PRIVATE DOMAINS===');

  const publicSuffixList = publicPart
    .split('\n')
    .filter((line) => line && !line.startsWith('//'))
    .map((line) => line.trim());

  const privateSuffixList = privatePart
    .split('\n')
    .filter((line) => line && !line.startsWith('//'))
    .map((line) => line.trim());

  class ExtractResult {
    constructor(subdomain, domain, suffix, isPrivate) {
      this.subdomain = subdomain || '';
      this.domain = domain;
      this.suffix = suffix;
      this.isPrivate = isPrivate;
    }
  }

  function getPublicSuffix(domain) {
    const domainParts = domain.split('.').reverse();
    let publicSuffix = '';
    let isPrivate = false;

    for (let i = 0; i < domainParts.length; i++) {
      const candidate = domainParts.slice(0, i + 1).reverse().join('.');

      if (privateSuffixList.includes(candidate)) {
        isPrivate = true;
        publicSuffix = candidate;
        break;
      }
    }

    if (!publicSuffix) {
      for (let i = 0; i < domainParts.length; i++) {
        const candidate = domainParts.slice(0, i + 1).reverse().join('.');

        if (publicSuffixList.includes(candidate)) {
          publicSuffix = candidate;
          break;
        }
      }
    }

    const domainWithoutSuffix = domain.replace(`.${publicSuffix}`, '');
    const domainPartsWithoutSuffix = domainWithoutSuffix.split('.');

    let sld = '';
    let subdomain = '';

    if (domainPartsWithoutSuffix.length === 1) {
      sld = domainPartsWithoutSuffix[0];
      subdomain = '';
    } else {
      sld = domainPartsWithoutSuffix.pop();
      subdomain = domainPartsWithoutSuffix.join('.');
    }

    return new ExtractResult(subdomain, sld, publicSuffix, isPrivate);
  }

  return {
    tldExtract: function (domain) {
      return getPublicSuffix(domain);
    }
  };
}));
