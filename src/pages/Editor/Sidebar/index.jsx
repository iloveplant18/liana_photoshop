import styles from "./Sidebar.module.css"
import CurrentPixelInfo from "@/pages/Editor/Sidebar/CurrentPixelInfo.jsx";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarInner}>
        <li className={styles.sidebarBlock}>
        </li>
        <li className={styles.sidebarBlock}>
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