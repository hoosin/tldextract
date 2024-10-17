export default function parse(part: string) {
  return part
    .split('\n')
    .filter((line) => line && !line.startsWith('//'))
    .map((line) => line.trim())
}


