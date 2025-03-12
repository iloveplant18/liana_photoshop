import {useEffect, useState} from "react";
import calcBrightness from "@/utils/calcBrightness.js";
import {chunkSize} from "@/utils/consts.js";
import useProgressStore from "@/stores/ProgressStore.js";
import useImageStore from "@/stores/ImageStore.js";

function useToBinary() {
  const [makeImageBinary, setMakeImageBinary] = useState(() => {})
  const setProgress = useProgressStore(store => store.setProgress)
  const imageData = useImageStore(store => store.imageData)
  const setImageData = useImageStore(store => store.setImageData);

  useEffect(() => {

    const makeImageBinaryImplementation = (brightnessLevel, firstColor, secondColor) => {
      if (!imageData) return
      const data = structuredClone(imageData.data);

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
          setImageData(new ImageData(data, imageData.width ,imageData.height))
        }
      }

      handleChunkOfPixels()
    }

    setMakeImageBinary(() => makeImageBinaryImplementation)
  }, [imageData, setImageData, setProgress]);

  return {makeImageBinary}
}

export default useToBinary