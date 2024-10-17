import loader, { publicPart, privatePart } from "./lib/loder";

import parse from "./lib/parse";
import { getSuffix } from "./lib/tld";
import ExtractResult from './lib/extract-result'

interface Attributes {
  [key: string]: any;
}

export default function factory(domain: string) {

  loader()

  const { subdomain, sld, suffix, isPrivate }: Attributes = getSuffix(domain, parse(publicPart), parse(privatePart))


  return new ExtractResult<string, string, string, boolean>(
    subdomain,
    sld,
    suffix,
    isPrivate
  );
}
