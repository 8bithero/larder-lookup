export const updateObjectArray = (arr, obj) => {
  const index = arr.findIndex((item) => item.id === obj.id);

  return index !== -1 ? [...arr.slice(0, index), ...arr.slice(index + 1)] : [...arr, obj];
}
