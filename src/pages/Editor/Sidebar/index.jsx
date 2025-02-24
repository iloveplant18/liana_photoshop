import styles from "./Sidebar.module.css"
import CropImage from "./CropImage.jsx"
import CurrentPixelInfo from "@/pages/Editor/Sidebar/CurrentPixelInfo.jsx";
import MakeImageBlackAndWhite from "@/pages/Editor/Sidebar/MakeImageBlackAndWhite.jsx";
import InvertImage from "@/pages/Editor/Sidebar/InvertImage.jsx";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarInner}>
        <li className={styles.sidebarBlock}>
          <CropImage/>
        </li>
        <li className={styles.sidebarBlock}>
          <MakeImageBlackAndWhite/>
        </li>
        <li className={styles.sidebarBlock}>
          <InvertImage/>
        </li>
        <li className={`${styles.sidebarBlock} ${styles.lastBlock}`}>
          <CurrentPixelInfo/>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar