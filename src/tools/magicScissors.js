/**
 * Ultra‑light "Intelligent Scissors" using Dijkstra on 8‑connected grid.
 * Draws a red poly‑line between two clicks that hugs high‑contrast edges.
 */
export async function magicScissors(ctx, startX, startY, endX, endY) {
  const { width, height } = ctx.canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Helper to approximate gradient magnitude (edge strength)
  const grad = (x, y) => {
    if (x <= 0 || y <= 0 || x >= width - 1 || y >= height - 1) return 0;
    const idx = (y * width + x) * 4;
    const gx = Math.abs(data[idx] - data[idx + 4]);
    const gy = Math.abs(data[idx] - data[idx + width * 4]);
    return gx + gy;
  };

  const dirs = [
    [1, 0],[0, 1],[-1, 0],[0, -1],
    [1, 1],[-1, 1],[1, -1],[-1, -1],
  ];
  const dist = new Float32Array(width * height).fill(Infinity);
  const prev = new Int32Array(width * height).fill(-1);
  const heap = [];
  const startIdx = startY * width + startX;
  const endIdx = endY * width + endX;
  dist[startIdx] = 0;
  heap.push(startIdx);

  const push = (i) => {
    heap.push(i);
    let c = heap.length - 1;
    while (c > 0) {
      const p = (c - 1) >> 1;
      if (dist[heap[c]] < dist[heap[p]]) {
        [heap[c], heap[p]] = [heap[p], heap[c]];
        c = p;
      } else break;
    }
  };
  const pop = () => {
    if (heap.length === 1) return heap.pop();
    const top = heap[0];
    heap[0] = heap.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1,
            r = l + 1,
            s = (r < heap.length && dist[heap[r]] < dist[heap[l]]) ? r : l;
      if (s < heap.length && dist[heap[s]] < dist[heap[i]]) {
        [heap[i], heap[s]] = [heap[s], heap[i]];
        i = s;
      } else break;
    }
    return top;
  };

  // Dijkstra
  while (heap.length) {
    const v = pop();
    if (v === endIdx) break;
    const vx = v % width;
    const vy = (v / width) | 0;
    for (const [dx, dy] of dirs) {
      const nx = vx + dx;
      const ny = vy + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const nIdx = ny * width + nx;
      const weight = 257 - Math.min(256, grad(nx, ny)); // edge ⇒ low cost
      const alt = dist[v] + weight;
      if (alt < dist[nIdx]) {
        dist[nIdx] = alt;
        prev[nIdx] = v;
        push(nIdx);
      }
    }
  }

  // Reconstruct path & draw
  ctx.lineWidth = 1;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(startX + 0.5, startY + 0.5);
  let cur = endIdx;
  const pts = [];
  while (cur !== -1 && cur !== startIdx) {
    pts.push(cur);
    cur = prev[cur];
  }
  pts.reverse().forEach((p) => {
    const x = p % width;
    const y = (p / width) | 0;
    ctx.lineTo(x + 0.5, y + 0.5);
  });
  ctx.stroke();
}