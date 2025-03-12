import {useEffect} from "react";
import useImageStore from "@/stores/ImageStore.js";
import useCanvas from "@/stores/CanvasStore.js";

function useImageRedraw() {
  const imageData = useImageStore(store => store.imageData)
  const context = useCanvas(store => store.context)
  const canvas = useCanvas(store => store.canvas)

  useEffect(() => {
    if (!context || !canvas) return
    if (!imageData) {
      context.putImageData(new ImageData(1, 1), 0, 0);
    } else {
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      context.putImageData(imageData, 0, 0)
    }
  }, [imageData, context, canvas]);
}

export default useImageRedraw;