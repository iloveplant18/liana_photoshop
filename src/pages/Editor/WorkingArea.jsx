import {useEffect, useRef} from "react"
import useImageStore from "@/stores/ImageStore.js"
import {TransformComponent} from "react-zoom-pan-pinch"
import styles from "./WorkingArea.module.css"
import useCanvas from "@/stores/CanvasStore.js";
import Toolbar from "@/pages/Editor/Toolbar";
import useImageRedraw from "@/hooks/useImageRedraw.js";
import useGlobalEventHandlers from "@/hooks/useGlobalEventHandlers.js";

function WorkingArea() {
  const image = useImageStore(store => store.image)
  const setImageData = useImageStore(store => store.setImageData)
  const setOriginalImageData = useImageStore(store => store.setOriginalImageData)
  const canvasRef = useRef()
  const contextRef = useRef()
  const {setCanvas, setContext} = useCanvas()

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d")
  })

  useEffect(() => {
    setCanvas(canvasRef.current)
    setContext(contextRef.current)
  }, [setCanvas, setContext]);

  useEffect(() => {
    if (!image) return
    canvasRef.current.width = image.width
    canvasRef.current.height = image.height
    contextRef.current.drawImage(image, 0, 0, image.width, image.height)
    const initialImageData = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    setImageData(initialImageData)
    setOriginalImageData(initialImageData); // только один раз

    const originalImage = document.querySelector("#original-image")
    originalImage.src = image.src

    return () => {
      contextRef.current.clearRect(0, 0, image.width, image.height);
      originalImage.src = ""
    }
  }, [image])

  useImageRedraw()
  useGlobalEventHandlers();

  return (
    <div className={styles.workingArea}>
      <TransformComponent wrapperStyle={{height: '100%', width: "100%"}}>
        <div className={styles.imagesContainer}>
          <canvas id="canvas" ref={canvasRef}></canvas>
          <img id="original-image" alt=""/>
        </div>
      </TransformComponent>
      <Toolbar/>
    </div>
  )
}

export default WorkingArea