function calcIndexesOfPixelsInSquare(pixelIndex, imageSize, radius = 1) {
    const squareIndexes = [];
    const pixelPosition = calcPixelPosition(pixelIndex, imageSize);
    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            const newPixelX = pixelPosition.x + j;
            const newPixelY = pixelPosition.y + i; 
            if (newPixelY >= imageSize.height || newPixelY < 0 || newPixelX >= imageSize.width || newPixelX < 0) {
                squareIndexes.push(null)
                continue;                
            }
            const newPixelIndex = (newPixelY * imageSize.width + newPixelX) * 4;
            squareIndexes.push(newPixelIndex)
        }
    }
    return squareIndexes
}

function calcPixelPosition(pixelIndex, imageSize) {
    const x = pixelIndex / 4 % imageSize.width;
    const y = Math.floor(pixelIndex / 4 / imageSize.width);
    return {x, y};
}

export default calcIndexesOfPixelsInSquare;