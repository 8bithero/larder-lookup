export const SPECIAL_CHARS = ['#', '>'];

export function filterItems(rawQuery, items, specialChar) {
  const specialCharRegex = new RegExp(`^[${SPECIAL_CHARS.join('')}]`);
  const query = rawQuery.toLowerCase().replace(specialCharRegex, '');

  const otherSpecialChars = SPECIAL_CHARS.filter((char) => char !== specialChar);
  return rawQuery === specialChar
    ? items
    : query === '' || otherSpecialChars.some((char) => rawQuery.startsWith(char))
    ? []
    : items.filter((item) => item.name.toLowerCase().includes(query));
}

export const updateObjectArray = (arr, obj) => {
  const index = arr.findIndex((item) => item.id === obj.id);

  return index !== -1 ? [...arr.slice(0, index), ...arr.slice(index + 1)] : [...arr, obj];
};
