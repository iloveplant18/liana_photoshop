import {useEffect, useState} from "react";
import useProgressStore from "@/stores/ProgressStore.js";
import {chunkSize} from "@/utils/consts.js";
import useImageStore from "@/stores/ImageStore.js";

function useInvert() {
  const [invertImage, setInvertImage] = useState();
  const setProgress = useProgressStore(store => store.setProgress);
  const imageData = useImageStore(store => store.imageData);
  const setImageData = useImageStore(store => store.setImageData);

  useEffect(() => {
    if (!imageData) return
    const invertImageImplementation = () => {
      let data = structuredClone(imageData.data)

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
          setImageData(new ImageData(data, imageData.width, imageData.height))
          setProgress(0);
        }
      }

      handleChunkOfPixels()
    }
    setInvertImage(() => invertImageImplementation)
  }, [imageData, setImageData, setProgress])

  return {invertImage: invertImage}
}

export default useInvert