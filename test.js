export default function zip(
  arr1,
  arr2,
) {
  if (arr1.length > arr2.length) {
    arr1.length = arr2.length;
  }
  return arr1.map((el, i) => [el, arr2[i]]);
}

function calcS(index, brightnesses) {
  return (
    brightnesses[index] +
    brightnesses[addByModule8(index, 1)] +
    brightnesses[addByModule8(index, 2)]
  );
}

function calcT(index, brightnesses) {
  return (
    brightnesses[addByModule8(index, 3)] +
    brightnesses[addByModule8(index, 4)] +
    brightnesses[addByModule8(index, 5)] +
    brightnesses[addByModule8(index, 6)] +
    brightnesses[addByModule8(index, 7)]
  );
}

function addByModule8(a, b) {
  return (a + b) % 8;
}



const brightnesses = [100, 200, 100, 100, 100, 100, 100, 100];
const SList = brightnesses.map((_, index, arr) => calcS(index, arr));
const TList = brightnesses.map((_, index, arr) => calcT(index, arr));
const finalBrightness = zip(SList, TList).reduce((maxF, [s, t]) => {
  const F = Math.abs(5 * s - 3 * t);
  if (F > maxF) return F;
  return maxF;
}, 0);
console.log("S list: ", SList);
console.log("T list: ", TList);
console.log("final brightenss: ", finalBrightness);
