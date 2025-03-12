import useCanvas from "@/stores/CanvasStore.js";
import {useEffect, useState} from "react";
import calcBrightness from "@/utils/calcBrightness.js";
import useProgressStore from "@/stores/ProgressStore.js";
import {chunkSize} from "@/utils/consts.js";

function useBlackAndWhite() {
  const {canvas, context} = useCanvas()
  const [makeImageBlackAndWhite, setMakeImageBlackAndWhite] = useState()
  const setProgress = useProgressStore(store => store.setProgress)

  useEffect(() => {
    if (!(canvas && context)) {
      setMakeImageBlackAndWhite(undefined)
      return
    }

    const blackAndWhiteImplementation = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      let data = imageData.data

      let i = 0
      const percentInPixels = data.length / 100

      function handleChunkOfPixels() {
        const end = Math.min(data.length, i + chunkSize)
        for (; i < end; i += 4) {
          const brightness = calcBrightness(data[i], data[i + 1], data[i + 2]);
          data[i] = brightness
          data[i + 1] = brightness;
          data[i + 2] = brightness;
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
    setMakeImageBlackAndWhite(() => blackAndWhiteImplementation)
  }, [canvas, context])

  return {makeImageBlackAndWhite}
}

export default useBlackAndWhite