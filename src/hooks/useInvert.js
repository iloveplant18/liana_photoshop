import useCanvas from "@/stores/CanvasStore.js";
import {useEffect, useState} from "react";
import useProgressStore from "@/stores/ProgressStore.js";
import {chunkSize} from "@/utils/consts.js";

function useInvert() {
  const {canvas, context} = useCanvas()
  const [invertImage, setInvertImage] = useState()
  const setProgress = useProgressStore(store => store.setProgress)

  useEffect(() => {
    if (!(canvas && context)) {
      setInvertImage(undefined)
      return
    }

    const invertImageImplementation = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      let data = imageData.data

      let i = 0
      const percentInPixels = data.length / 100

      function handleChunkOfPixels() {
        const end = Math.min(data.length, i + chunkSize)
        for (; i < end; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }

        if (i < data.length) {
          const percent = Math.round(i / percentInPixels)
          setProgress(percent)
          requestIdleCallback(handleChunkOfPixels)
        } else {
          context.putImageData(imageData, 0, 0);
          setProgress(0);
        }
      }

      handleChunkOfPixels()
    }
    setInvertImage(() => invertImageImplementation)
  }, [canvas, context])

  return {invertImage: invertImage}
}

export default useInvert