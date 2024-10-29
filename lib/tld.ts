export function getSuffix(domain: string, publicSuffixList: Array<string>, privateSuffixList: Array<string>) {
  let suffix = '';
  let isPrivate = false;


  for (const privateSuffix of privateSuffixList) {
    if (domain.endsWith(privateSuffix) && privateSuffix.length > suffix.length) {
      suffix = privateSuffix;
      isPrivate = true;
    }
  }


  if (!suffix) {
    for (const publicSuffix of publicSuffixList) {
      if (domain.endsWith(publicSuffix) && publicSuffix.length > suffix.length) {
        suffix = publicSuffix;
        isPrivate = false;
      }
    }
  }


  if (!suffix) {
    const domainParts = domain.split('.');
    const sld = domainParts.pop(); // 最后一部分为 sld
    const subdomain = domainParts.join('.'); // 剩下的部分为 subdomain
    return { subdomain, sld, suffix: '', isPrivate: false };
  }



  const domainWithoutSuffix = domain.slice(0, -suffix.length - 1);
  const domainPartsWithoutSuffix = domainWithoutSuffix.split('.')

  let sld = ''

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
