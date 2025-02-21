import useCanvas from "@/stores/CanvasStore.js";
import {useEffect, useState} from "react";

function useCurrentPixelInfo() {
  const {canvas, context} = useCanvas()
  const [currentPixelInfo, setCurrentPixelInfo] = useState({})

  useEffect(() => {
    if (!canvas || !context) return

    function handleMouseMove(event) {
      const {offsetX, offsetY} = event;
      const [red = 0, green = 0, blue = 0, alpha = 0] = context.getImageData(offsetX, offsetY, 1, 1).data
      setCurrentPixelInfo({
        x: offsetX, y: offsetY, color: {
          red: red, green: green, blue: blue, alpha: alpha,
        }
      })
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [canvas, context]);

  return {currentPixelInfo}
}

export default useCurrentPixelInfo