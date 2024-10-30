export function getSuffix(domain: string, publicSuffixList: Array<string>, privateSuffixList: Array<string>) {
  let suffix = '';
  let isPrivate = false;


  function isSuffixMatch(domainParts: string[], suffixParts: string[]): boolean {
    if (suffixParts.length > domainParts.length) return false;
    return suffixParts.every((part, index) => part === domainParts[domainParts.length - suffixParts.length + index]);
  }

  const domainParts = domain.split('.');


  for (const privateSuffix of privateSuffixList) {
    const privateSuffixParts = privateSuffix.split('.');
    if (isSuffixMatch(domainParts, privateSuffixParts) && privateSuffix.length > suffix.length) {
      suffix = privateSuffix;
      isPrivate = true;
    }
  }


  if (!suffix) {
    for (const publicSuffix of publicSuffixList) {
      const publicSuffixParts = publicSuffix.split('.');
      if (isSuffixMatch(domainParts, publicSuffixParts) && publicSuffix.length > suffix.length) {
        suffix = publicSuffix;
        isPrivate = false;
      }
    }
  }


  if (!suffix) {
    const sld = domainParts.pop() || '';
    const subdomain = domainParts.join('.');
    return { subdomain, sld, suffix: '', isPrivate: false };
  }


  const domainWithoutSuffix = domain.slice(0, -suffix.length - 1);
  const domainPartsWithoutSuffix = domainWithoutSuffix.split('.');

  let sld = '';
  let subdomain = '';

  if (domainPartsWithoutSuffix.length === 1) {
    sld = domainPartsWithoutSuffix[0];
    subdomain = '';
  } else {
    sld = domainPartsWithoutSuffix.pop() || '';
    subdomain = domainPartsWithoutSuffix.join('.');
  }

  return { subdomain, sld, suffix, isPrivate };
}
