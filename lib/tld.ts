export function getSuffix(domain:string, publicSuffixList:Array<string>, privateSuffixList:Array<string>) {
  const domainParts = domain.split('.').reverse()
  let suffix = ''
  let isPrivate = false

  for (let i = 0; i < domainParts.length; i++) {
    const candidate = domainParts
      .slice(0, i + 1)
      .reverse()
      .join('.')

    if (privateSuffixList.includes(candidate)) {
      isPrivate = true
      suffix = candidate
      break
    }
  }

  if (!suffix) {
    for (let i = 0; i < domainParts.length; i++) {
      const candidate = domainParts
        .slice(0, i + 1)
        .reverse()
        .join('.')

      if (publicSuffixList.includes(candidate)) {
        suffix = candidate
        break
      }
    }
  }

  const domainWithoutSuffix = domain.replace(`.${suffix}`, '')
  const domainPartsWithoutSuffix = domainWithoutSuffix.split('.')

  let sld: undefined | string = ''
  let subdomain = ''

  if (domainPartsWithoutSuffix.length === 1) {
    sld = domainPartsWithoutSuffix[0]
    subdomain = ''
  } else {
    sld = domainPartsWithoutSuffix.pop()
    subdomain = domainPartsWithoutSuffix.join('.')
  }

  return { subdomain, sld, suffix, isPrivate }
}
