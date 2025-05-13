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


// function calcAmpertureIndexes(
//   index: number,
//   imageWidth: number,
//   imageHeight: number,
//   radius: number = 1,
// ): (number | null)[] {
//     const pixelY = Math.floor(index / 4 / imageWidth); // Calculate the Y coordinate
//     const pixelX = (index / 4) % imageWidth; // Calculate the X coordinate
//     const indexes: (number | null)[] = [];
//
//     for (let i = -radius; i <= radius; i++) {
//         for (let j = -radius; j <= radius; j++) {
//             const newPixelY = pixelY + i;
//             const newPixelX = pixelX + j;
//
//             // Check if the new pixel coordinates are within the image bounds
//             if (
//               newPixelY >= 0 &&
//               newPixelY < imageHeight &&
//               newPixelX >= 0 &&
//               newPixelX < imageWidth
//             ) {
//                 const pixelIndex = (newPixelY * imageWidth + newPixelX) * 4;
//                 indexes.push(pixelIndex);
//             } else {
//                 indexes.push(null); // Out of bounds
//             }
//         }
//     }
//
//     return indexes;
// }
