import usePixelsOperationHandler from "@/hooks/usePixelsOperationHandler";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness";
import useImageStorage from "@/stores/ImageStore";
import calcBrightnessesByPixelsIndexes from "@/utils/calcBrightnessesByPixelsIndexes";

export default function useRobertsMethod() {
  const { width, height } = useImageStorage((store) => store.size);

  const applyRobertsMehtod = usePixelsOperationHandler((data, i, originalData) => {
    const indexes = calc2x2AmpertureIndexes(i, width, height);
    const filteredIndexes = indexes.filter((index) => index !== null);
    if (filteredIndexes.length !== 4) return;
    const brightnesses = calcBrightnessesByPixelsIndexes(
      originalData,
      filteredIndexes,
    );
    const finalBrightness = Math.sqrt(
      (brightnesses[0] - brightnesses[3]) ** 2 +
        (brightnesses[2] - brightnesses[1]) ** 2,
    );
    updatePixelByNewBrightness(i, finalBrightness, data);
  });

  return applyRobertsMehtod;
}

function calc2x2AmpertureIndexes(
  index,
  imageWidth,
  imageHeight,
) {
  const positionY = Math.floor(index / 4 / imageWidth);
  const positionX = (index / 4) % imageWidth;
  let pixelsPositions = [
    { x: positionX, y: positionY },
    { x: positionX + 1, y: positionY },
    { x: positionX, y: positionY + 1 },
    { x: positionX + 1, y: positionY + 1 },
  ];

  return pixelsPositions
    .map((position) =>
      position.x >= imageWidth || position.y >= imageHeight ? null : position,
    )
    .map((position) => position && (position.x + position.y * imageWidth) * 4);
}
