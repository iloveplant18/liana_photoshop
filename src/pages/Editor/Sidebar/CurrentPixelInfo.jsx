import styles from "./CurrentPixel.module.css"
import useCurrentPixelInfo from "@/hooks/useCurrentPixelInfo.js";

function CurrentPixelInfo() {
  const currentPixelInfo = useCurrentPixelInfo()

  return (
    <div className={styles.container}>
      <span>x:&nbsp;{currentPixelInfo.x}</span>
      <span>y:&nbsp;{currentPixelInfo.y}</span>
      <span>color:&nbsp;RGB&nbsp;{currentPixelInfo.color?.red}&nbsp;{currentPixelInfo.color?.green}&nbsp;{currentPixelInfo.color?.blue}&nbsp;{currentPixelInfo.color?.alpha}</span>
    </div>
  );
}

export default CurrentPixelInfo;