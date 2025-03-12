import {useEffect, useState} from "react";
import calcBrightness from "@/utils/calcBrightness.js";
import useProgressStore from "@/stores/ProgressStore.js";
import {chunkSize} from "@/utils/consts.js";
import useImageStore from "@/stores/ImageStore.js";

function useBlackAndWhite() {
  const imageData = useImageStore(store => store.imageData);
  const setImageData = useImageStore(store => store.setImageData);
  const [makeImageBlackAndWhite, setMakeImageBlackAndWhite] = useState();
  const setProgress = useProgressStore(store => store.setProgress);

  useEffect(() => {
    const blackAndWhiteImplementation = () => {
      if (!imageData) return

      let data = structuredClone(imageData.data)

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
          const newImageData = new ImageData(data, imageData.width, imageData.height)
          setImageData(newImageData)
        }
      }

      handleChunkOfPixels()
    }
    setMakeImageBlackAndWhite(() => blackAndWhiteImplementation)
  }, [imageData, setImageData, setProgress])

  return {makeImageBlackAndWhite}
}

export default useBlackAndWhite