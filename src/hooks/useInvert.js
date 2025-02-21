import useCanvas from "@/stores/CanvasStore.js";
import {useEffect, useState} from "react";

function useInvert() {
  const {canvas, context} = useCanvas()
  const [invertImage, setInvertImage] = useState()

  useEffect(() => {
    if (!(canvas && context)) {
      setInvertImage(undefined)
      return
    }

    const invertImageImplementation = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      let data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      context.putImageData(imageData, 0, 0)
    }
    setInvertImage(() => invertImageImplementation)
  }, [canvas, context])

  return {invertImage: invertImage}
}

export default useInvert