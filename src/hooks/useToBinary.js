import useCanvas from "@/stores/CanvasStore.js";
import {useEffect, useState} from "react";
import calcBrightness from "@/utils/calcBrightness.js";

function useToBinary() {
  const { context, canvas } = useCanvas();
  const [makeImageBinary, setMakeImageBinary] = useState(() => {})

  useEffect(() => {
    if (!context) return

    const makeImageBinaryImplementation = (brightnessLevel, firstColor, secondColor) => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
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
      context.putImageData(imageData, 0, 0)
    }

    setMakeImageBinary(() => makeImageBinaryImplementation)
  }, [context, canvas?.height, canvas?.width]);

  return {makeImageBinary}
}

export default useToBinary