import useImageStorage from "@/stores/ImageStore";
import usePixelsOperationHandler from "@/hooks/usePixelsOperationHandler";
import calcIndexesOfPixelsInSquare from "@/utils/calcIndexesOfPixelsInSquare.js";
import calcBrightnessesByIndexes from "@/utils/calcBrightnessesByPixelsIndexes.js";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness.js";

export default function useSobelMethod() {
  const imageSize = useImageStorage((store) => store.size);

  const applySobelMethod = usePixelsOperationHandler((data, i, originalData) => {
    const indexes = calcIndexesOfPixelsInSquare(i, imageSize, 1);
    const filteredIndexes = indexes.filter((index) => index != null);
    if (filteredIndexes.length !== 9) return;
    const brightnesses = calcBrightnessesByIndexes(
      originalData,
      filteredIndexes,
    );
    const x =
      brightnesses[0] +
      brightnesses[1] * 2 +
      brightnesses[2] -
      (brightnesses[6] + brightnesses[7] * 2 + brightnesses[8]);
    const y =
      brightnesses[0] +
      brightnesses[3] * 2 +
      brightnesses[6] -
      (brightnesses[2] + brightnesses[5] * 2 + brightnesses[8]);
    const finalBrightness = Math.sqrt(x ** 2 + y ** 2);
    updatePixelByNewBrightness(i, finalBrightness, data);
  });

  return applySobelMethod;
}