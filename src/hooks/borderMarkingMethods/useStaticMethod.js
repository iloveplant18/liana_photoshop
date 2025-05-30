import useImageStore from "@/stores/ImageStore.js";
import usePixelsOperationHandler from "@/hooks/usePixelsOperationHandler.js";
import calcIndexesOfPixelsInSquare from "@/utils/calcIndexesOfPixelsInSquare.js";
import calcBrightnessesByPixelsIndexes from "@/utils/calcBrightnessesByPixelsIndexes.js";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness.js";
import calcBrightness from "@/utils/calcBrightness.js";

function useStaticMethod() {
  const imageSize = useImageStore(store => store.size);

  const applyStaticFilter = usePixelsOperationHandler((data, i, originalData) => {
    const indexes = calcIndexesOfPixelsInSquare(i, imageSize, 1);
    const filteredIndexes = indexes.filter(index => index);
    const brightnesses = calcBrightnessesByPixelsIndexes(originalData, filteredIndexes);
    const averageBrightness = brightnesses.reduce((acc, val) => acc + val) / brightnesses.length;
    const averageDeviation = Math.sqrt(
      brightnesses.reduce((sum, value) => sum + (value - averageBrightness) ** 2, 0) /
      brightnesses.length,
    );
    for (let j of filteredIndexes) {
      const pixelBrightness = calcBrightness(
        originalData[j],
        originalData[j + 1],
        originalData[j + 2],
    );
      const finalBrightness = pixelBrightness * averageDeviation;
      updatePixelByNewBrightness(j, finalBrightness, data);
    }
  })

  return applyStaticFilter;
}

export default useStaticMethod;