import useCanvas from "@/stores/CanvasStore.js";
import {useEffect, useState} from "react";

function useBlackAndWhite() {
  const {canvas, context} = useCanvas()
  const [makeImageBlackAndWhite, setMakeImageBlackAndWhite] = useState()

  useEffect(() => {
    if (!(canvas && context)) {
      setMakeImageBlackAndWhite(undefined)
      return
    }

    const blackAndWhiteImplementation = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      let data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const brightness = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        data[i] = brightness
        data[i + 1] = brightness;
        data[i + 2] = brightness;
      }
      // это инвертирование
      // for (let i = 0; i < data.length; i += 4) {
      //   data[i] = 255 - data[i];
      //   data[i + 1] = 255 - data[i + 1];
      //   data[i + 2] = 255 - data[i + 2];
      // }
      context.putImageData(imageData, 0, 0)
    }
    setMakeImageBlackAndWhite(() => blackAndWhiteImplementation)
  }, [canvas, context])

  return {makeImageBlackAndWhite}
}

export default useBlackAndWhite