import tld from '../bin/public_suffix_list.dat';

let publicPart: string;
let privatePart: string;

function loader() {
  [publicPart, privatePart] = tld.split('===BEGIN PRIVATE DOMAINS===');
}

export default loader;
export { publicPart, privatePart };
