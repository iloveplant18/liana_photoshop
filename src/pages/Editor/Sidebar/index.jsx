import styles from "./Sidebar.module.css"
import CurrentPixelInfo from "@/pages/Editor/Sidebar/CurrentPixelInfo.jsx";
import ImageInfo from "@/pages/Editor/Sidebar/ImageInfo.jsx";
import ColorHistogramsList from "@/pages/Editor/Sidebar/ColorHistogramsList/ColorHistogramsList.jsx";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarInner}>
        <li className={styles.sidebarBlock}>
          <ImageInfo/>
        </li>
        <li className={styles.sidebarBlock}>
          <ColorHistogramsList/>
        </li>
        <li className={styles.sidebarBlock}>
        </li>
        <li className={`${styles.sidebarBlock} ${styles.lastBlock}`}>
          <CurrentPixelInfo/>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar