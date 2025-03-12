import useCanvas from "@/stores/CanvasStore.js";
import {useEffect, useState} from "react";
import calcBrightness from "@/utils/calcBrightness.js";
import {chunkSize} from "@/utils/consts.js";
import useProgressStore from "@/stores/ProgressStore.js";

function useToBinary() {
  const { context, canvas } = useCanvas();
  const [makeImageBinary, setMakeImageBinary] = useState(() => {})
  const setProgress = useProgressStore(store => store.setProgress)

  useEffect(() => {
    if (!context) return

    const makeImageBinaryImplementation = (brightnessLevel, firstColor, secondColor) => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let i = 0
      const percentInPixels = data.length / 100

      function handleChunkOfPixels() {
        const end = Math.min(data.length, i + chunkSize)
        for (; i < end; i += 4) {
          const brightness = calcBrightness(data[i], data[i + 1], data[i + 2])
          if (brightness < brightnessLevel) {
            data[i] = firstColor.r;
            data[i + 1] = firstColor.g;
            data[i + 2] = firstColor.b;
          } else {
            data[i] = secondColor.r;
            data[i + 1] = secondColor.g;
            data[i + 2] = secondColor.b;
          }
          data[i + 3] = 255;
        }

        if (i < data.length) {
          const percent = Math.round(i / percentInPixels)
          setProgress(percent)
          requestIdleCallback(handleChunkOfPixels)
        } else {
          setProgress(0)
          context.putImageData(imageData, 0, 0)
        }
      }

      handleChunkOfPixels()
    }

    setMakeImageBinary(() => makeImageBinaryImplementation)
  }, [context, canvas?.height, canvas?.width]);

  return {makeImageBinary}
}

export default useToBinary