import useImageStorage from "@/stores/ImageStore.js";
import usePixelsOperationHandler from "@/hooks/usePixelsOperationHandler.js";
import calcIndexesOfPixelsInSquare from "@/utils/calcIndexesOfPixelsInSquare.js";
import sortByCircleOrder from "@/utils/sortByCircleOrder.js";
import calcBrightnessesByPixelsIndexes from "@/utils/calcBrightnessesByPIxelsIndexes.js";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness.js";

export default function useWollesMethod() {
  const imageSize = useImageStorage((store) => store.size);

  const applyWollesMethod = usePixelsOperationHandler((data, i, originalData) => {
    const pixelIndexes = calcIndexesOfPixelsInSquare(i, imageSize, 1);
    const filteredIndexes = pixelIndexes.filter(
      (index) => index,
    );
    if (filteredIndexes.length !== 9) return;

    const sortedIndexes = sortByCircleOrder(filteredIndexes);
    const brightnesses = calcBrightnessesByPixelsIndexes(originalData, sortedIndexes);
    const finalBrightness = (Math.log(
        (brightnesses[8] / (brightnesses[1] + 1)) *
        (brightnesses[8] / (brightnesses[3] + 1)) *
        (brightnesses[8] / (brightnesses[5] + 1)) *
        (brightnesses[8] / (brightnesses[7] + 1)),
      ) /
      4) *
    500;

    updatePixelByNewBrightness(i, finalBrightness, data);
  }, {
    chunkSize: 20_000,
  });

  return applyWollesMethod;
}
