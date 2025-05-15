import calcBrightness from "@/utils/calcBrightness.js";

export default function updatePixelByNewBrightness(index, newBrightness, data) {
  const currentBrightness = calcBrightness(data[index], data[index + 1], data[index + 2]);
  const diff = newBrightness - currentBrightness;

  data[index] = Math.min(Math.max(data[index] + diff, 0), 255);
  data[index + 1] = Math.min(Math.max(data[index + 1] + diff, 0), 255);
  data[index + 2] = Math.min(Math.max(data[index + 2] + diff, 0), 255);
}