import { useState, useEffect } from "react";
import useProgressStore from "@/stores/ProgressStore.js";
import useImageStore from "@/stores/ImageStore.js";
import { chunkSize as defaultChunkSize } from "@/utils/consts.js"

function usePixelsOperationHandler(pixelsHandlingFunction, config) {
  const [decoratedFunction, setDecoratedFunction] = useState();
  const setProgress = useProgressStore(store => store.setProgress);
  const imageData = useImageStore(store => store.imageData);
  const setImageData = useImageStore(store => store.setImageData);
  const chunkSize = config?.chunkSize ?? defaultChunkSize;

  useEffect(() => {
    if (!imageData) return
    const decoratedFunctionImplementation = () => {
      let data = structuredClone(imageData.data)

      let i = 0
      const percentInPixels = data.length / 100

      function handleChunkOfPixels() {
        const end = Math.min(data.length, i + chunkSize)
        for (; i < end; i += 4) {
          pixelsHandlingFunction(data, i);
        }

        if (i < data.length) {
          const percent = Math.round(i / percentInPixels)
          setProgress(percent)
          requestIdleCallback(handleChunkOfPixels)
        } else {
          setImageData(new ImageData(data, imageData.width, imageData.height))
          setProgress(0);
        }
      }

      handleChunkOfPixels()
    }
    setDecoratedFunction(() => decoratedFunctionImplementation)
  }, [imageData, setImageData, setProgress])

  return decoratedFunction
}

export default usePixelsOperationHandler;