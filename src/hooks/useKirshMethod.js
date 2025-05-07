import usePixelsOperationHandler from "@/hooks/usePixelsOperationHandler.js";
import calcIndexesOfPixelsInSquare from "@/utils/calcIndexesOfPixelsInSquare.js";
import sortByCircleOrder from "@/utils/sortByCircleOrder.js";
import useImageStore from "@/stores/ImageStore.js";
import calcBrightnessesByPixelsIndexes from "@/utils/calcBrightnessesByPIxelsIndexes.js";
import zip from "@/utils/zip.js";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness.js";

export default function useKirshMethod() {
  const imageSize = useImageStore(store => store.size);
  const brightnessReduce = 200;

  const applyKirshMethod = usePixelsOperationHandler((data, i, originalData) => {
    const pixelIndexes = calcIndexesOfPixelsInSquare(i, imageSize, 1);
    const filteredIndexes = pixelIndexes.filter(
      (index) => index,
    );
    if (filteredIndexes.length !== 9) return;

    const sortedIndexes = sortByCircleOrder(filteredIndexes);
    sortedIndexes.length = 8;
    const brightnesses = calcBrightnessesByPixelsIndexes(originalData, sortedIndexes);
    const SList = brightnesses.map((_, index, arr) => calcS(index, arr));
    const TList = brightnesses.map((_, index, arr) => calcT(index, arr));
    const finalBrightness = zip(SList, TList).reduce((maxF, [s, t]) => {
      const F = Math.abs(5 * s - 3 * t);
      if (F > maxF) return F;
      return maxF;
    }, 0) - brightnessReduce;
    updatePixelByNewBrightness(i, finalBrightness, data);
  });

  return applyKirshMethod;
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
