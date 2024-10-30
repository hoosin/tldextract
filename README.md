# tld-parse

`tldextract` accurately separates a URL's subdomain, domain, and public suffix,
using [the Public Suffix List (PSL)](https://publicsuffix.org).

Say you want just the "google" part of https://www.google.com. *Everybody gets
this wrong.* Splitting on the "." and taking the 2nd-to-last element only works
for simple domains, e.g. .com. Consider
[http://forums.bbc.co.uk](http://forums.bbc.co.uk): the naive splitting method
will give you "co" as the domain, instead of "bbc". Rather than juggle TLDs,
gTLDs, or ccTLDs yourself, `tldextract` extracts the currently living public
suffixes according to [the Public Suffix List](https://publicsuffix.org).

> A "public suffix" is one under which Internet users can directly register
> names.

A public suffix is also sometimes called an effective TLD (eTLD).



## Install

```bash
# Regular install
npm install --save tld-parse

# You can update the list of well-known TLD during the install
npm install --save tld-parse --tld-update-rules
```
The latter is useful if you significantly rely on an up-to-date list of TLDs. You can [list the recent changes][] ([changes Atom Feed][]) to get a better idea of what is going on in the Public Suffix world.

## Usage

```js
import tldParse from 'tld-parse'



const extract = tldParse('www.google.com');

// { domain: 'google',
//   isPrivate: false,
//   subdomain: 'www',
//   suffix: 'com',
// }
```

## FAQ

### Can you add suffix \_\_\_\_? Can you make an exception for domain \_\_\_\_?

This project doesn't contain an actual list of public suffixes. That comes from
[the Public Suffix List (PSL)](https://publicsuffix.org/). Submit amendments there.

In the meantime, you can tell tldextract about your exception by either
forking the PSL and using your fork in the `suffix_list_urls` param, or adding
your suffix piecemeal with the `extra_suffixes` param.

### I see my suffix in [the Public Suffix List (PSL)](https://publicsuffix.org/), but this library doesn't extract it.

Check if your suffix is in the private section of the list. See [this documentation](#public-vs-private-domains).
