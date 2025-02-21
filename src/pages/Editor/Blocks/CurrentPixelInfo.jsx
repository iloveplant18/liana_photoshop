import styles from "./CurrentPixel.module.css"
import useCanvas from "@/stores/CanvasStore.js";
import {useEffect, useState} from "react";

function CurrentPixelInfo() {
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

  return (<div className={styles.container}>
    <span>x:&nbsp;{currentPixelInfo.x}</span>
    <span>y:&nbsp;{currentPixelInfo.x}</span>
    <span>color:&nbsp;RGB&nbsp;{currentPixelInfo.color?.red}&nbsp;{currentPixelInfo.color?.green}&nbsp;{currentPixelInfo.color?.blue}&nbsp;{currentPixelInfo.color?.alpha}</span>
  </div>);
}

export default CurrentPixelInfo;