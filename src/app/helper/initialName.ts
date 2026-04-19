export function initialName(words: string) {
  const result = words
    ? words
        .replace(/\b(\w)\w+/g, '$1')
        .replace(/\s/g, '')
        .replace(/\.$/, '')
        .toUpperCase()
    : '';
  return result;
}
