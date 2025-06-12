/**
 * K-means colour-based image clustering (⚡ simple CPU version)
 * @param {CanvasRenderingContext2D} ctx   Canvas 2‑d context of the image layer to transform.
 * @param {number} k                       Number of clusters (2 … 16).
 * @param {number} maxIter                 Maximum algorithm iterations.
 */
export async function clusterizeImage(ctx, k = 4, maxIter = 10) {
  const { width, height } = ctx.canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // 1. Collect pixels → [r,g,b]
  const pixels = new Float32Array(width * height * 3);
  for (let i = 0, p = 0; i < data.length; i += 4, p += 3) {
    pixels[p] = data[i];
    pixels[p + 1] = data[i + 1];
    pixels[p + 2] = data[i + 2];
  }

  // 2. Randomly initialise centroids
  const centroids = Array.from({ length: k }, () => {
    const offset = Math.floor(Math.random() * width * height) * 3;
    return [pixels[offset], pixels[offset + 1], pixels[offset + 2]];
  });

  // 3. Lloyd iterations
  for (let iter = 0; iter < maxIter; iter++) {
    const sums = Array.from({ length: k }, () => [0, 0, 0, 0]); // r,g,b,count

    // Assignment step
    for (let p = 0, idx = 0; p < pixels.length; p += 3, idx++) {
      let best = 0;
      let bestDist = Infinity;
      for (let c = 0; c < k; c++) {
        const d = colourDistSq(pixels, p, centroids[c]);
        if (d < bestDist) {
          bestDist = d;
          best = c;
        }
      }
      sums[best][0] += pixels[p];
      sums[best][1] += pixels[p + 1];
      sums[best][2] += pixels[p + 2];
      sums[best][3]++;
    }

    // Update step
    for (let c = 0; c < k; c++) {
      if (sums[c][3] === 0) continue; // empty cluster
      centroids[c] = [
        sums[c][0] / sums[c][3],
        sums[c][1] / sums[c][3],
        sums[c][2] / sums[c][3],
      ];
    }
  }

  // 4. Re‑colour according to final centroids
  for (let p = 0, px = 0; p < pixels.length; p += 3, px++) {
    let best = 0;
    let bestDist = Infinity;
    for (let c = 0; c < k; c++) {
      const d = colourDistSq(pixels, p, centroids[c]);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }
    data[px * 4] = centroids[best][0];
    data[px * 4 + 1] = centroids[best][1];
    data[px * 4 + 2] = centroids[best][2];
  }

  ctx.putImageData(imageData, 0, 0);
}

function colourDistSq(buf, offset, [r, g, b]) {
  return (
    (buf[offset] - r) ** 2 +
    (buf[offset + 1] - g) ** 2 +
    (buf[offset + 2] - b) ** 2
  );
}