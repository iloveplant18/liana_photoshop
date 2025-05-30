const calcIndexesOfPixelsInSquare = (pixelIndex, imageSize, radius = 1) => {
  const squareIndexes = [];
  const pixelX = pixelIndex / 4 % imageSize.width;
  const pixelY = Math.floor(pixelIndex / 4 / imageSize.width);

  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
      const newPixelX = pixelX + j;
      const newPixelY = pixelY + i;

      if (newPixelY >= imageSize.height || newPixelY < 0 || newPixelX >= imageSize.width || newPixelX < 0) {
        squareIndexes.push(null);
        continue;
      }
      const newPixelIndex = (newPixelY * imageSize.width + newPixelX) * 4;
      squareIndexes.push(newPixelIndex);
    }
  }
  return squareIndexes;
}

export default calcIndexesOfPixelsInSquare;
