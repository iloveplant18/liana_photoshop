/**
 * Flood‑fill region growing a‑la "Magic Wand".
 * Highlights the selected region in red overlay.
 */
export function magicWandSelect(ctx, startX, startY, tolerance = 32) {
  const { width, height } = ctx.canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const startIdx = (startY * width + startX) * 4;
  const seedColour = [data[startIdx], data[startIdx + 1], data[startIdx + 2]];
  const visited = new Uint8Array(width * height);
  const stack = [[startX, startY]];

  const tolSq = tolerance * tolerance;

  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= width || y >= height) continue;
    const idx = y * width + x;
    if (visited[idx]) continue;
    visited[idx] = 1;

    const off = idx * 4;
    const colourSq =
      (data[off] - seedColour[0]) ** 2 +
      (data[off + 1] - seedColour[1]) ** 2 +
      (data[off + 2] - seedColour[2]) ** 2;
    if (colourSq > tolSq) continue;

    // Colour the pixel bright‑red as visual feedback
    data[off] = 255;
    data[off + 1] = 0;
    data[off + 2] = 0;

    stack.push([x + 1, y]);
    stack.push([x - 1, y]);
    stack.push([x, y + 1]);
    stack.push([x, y - 1]);
  }

  ctx.putImageData(imageData, 0, 0);
}