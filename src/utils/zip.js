export default function zip(
  arr1,
  arr2,
) {
  if (arr1.length > arr2.length) {
    arr1.length = arr2.length;
  }
  return arr1.map((el, i) => [el, arr2[i]]);
}
