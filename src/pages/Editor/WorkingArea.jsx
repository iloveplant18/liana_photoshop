import { useEffect } from "react"
import useImageStore from "@/stores/ImageStore.js"
import { TransformComponent } from "react-zoom-pan-pinch"
import styles from "./WorkingArea.module.css"

function WorkingArea() {
    const image = useImageStore(state => state.image)

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
                    <canvas id="canvas"></canvas>
                    <img id="original-image" src="" alt="" />
                </div>
            </TransformComponent>
        </div>
    )
}

export default WorkingArea