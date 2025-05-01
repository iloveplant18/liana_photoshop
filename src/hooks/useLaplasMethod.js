import usePixelsOperationHandler from "@/hooks/usePixelsOperationHandler.js";
import calcIndexesOfPixelsInSquare from "@/utils/calcIndexesOfPixelsInSquare.js";
import useImageStore from "@/stores/ImageStore.js";
import calcBrightnessesByPixelsIndexes from "@/utils/calcBrightnessesByPIxelsIndexes.js";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness.js";

export default function useLaplasMethod() {
  const imageSize = useImageStore(store => store.size);

  const coefficients = [-1, -2, -1, -2, 12, -2, -1, -2, -1];
  const applyLaplasMethod = usePixelsOperationHandler((data, i) => {
    const pixelsIndexes = calcIndexesOfPixelsInSquare(i, imageSize, 1);
    const filteredIndexes = pixelsIndexes.filter(el => el != null);
    if (filteredIndexes.length !== 9) return;
    const brightnesses = calcBrightnessesByPixelsIndexes(data, filteredIndexes);
    const finalBrightness = brightnesses.reduce((sum, value, index) => sum + value * coefficients[index])
    updatePixelByNewBrightness(i, finalBrightness, data);
  }, {
    chunkSize: 50_000,
  });

  return applyLaplasMethod;
}