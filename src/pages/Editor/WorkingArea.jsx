import {useEffect, useRef} from "react"
import useImageStore from "@/stores/ImageStore.js"
import { TransformComponent } from "react-zoom-pan-pinch"
import styles from "./WorkingArea.module.css"
import useCanvas from "@/stores/CanvasStore.js";

function WorkingArea() {
    const image = useImageStore(state => state.image)
    const canvasRef = useRef()
    const {setCanvas, setContext} = useCanvas()

    useEffect(() => {
        if (!canvasRef.current) return
        const context = canvasRef.current.getContext("2d")
        if (!context) return;
        setCanvas(canvasRef.current)
        setContext(context)
    }, [canvasRef, setCanvas, setContext]);

    useEffect(() => {
        if (!image) return
        const canvas = document.querySelector("#canvas");
        const context = canvas.getContext("2d")
        canvas.width = image.width
        canvas.height = image.height
        context.drawImage(image, 0, 0, image.width, image.height)

        const originalImage = document.querySelector("#original-image")
        originalImage.src = image.src
        return () => {
            context.clearRect(0, 0, image.width, image.height);
            originalImage.src = ""
        }
    }, [image])

    return (
        <div className={styles.workingArea}>
            <TransformComponent wrapperClass={styles.workingArea}>
                <div className={styles.imagesContainer}>
                    <canvas id="canvas" ref={canvasRef}></canvas>
                    <img id="original-image" alt="" />
                </div>
            </TransformComponent>
        </div>
    )
}

export default WorkingArea