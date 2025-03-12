import {useEffect} from "react";
import useImageStore from "@/stores/ImageStore.js";
import useCanvas from "@/stores/CanvasStore.js";

function useUndo() {
  const prevStep = useImageStore(store => store.prevStep)
  const setImageData = useImageStore(store => store.setImageData)
  const context = useCanvas(store => store.context)

  useEffect(() => {
    function handleKeydown(event) {
      if (!event.ctrlKey || event.key !== 'z') return

      applyPrevStep()
    }

    function applyPrevStep() {
      if (!prevStep || !context) return

      const newImageData = structuredClone(prevStep)
      setImageData(newImageData, null)
    }

    document.addEventListener("keydown", handleKeydown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [prevStep, context, setImageData]);
}

export default useUndo;