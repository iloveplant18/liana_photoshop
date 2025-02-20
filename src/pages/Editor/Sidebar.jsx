import styles from "./Sidebar.module.css"
import CropImage from "./Blocks/CropImage.jsx"

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <ul className={styles.sidebarInner}>
                <li className={styles.sidebarBlock}>
                    <CropImage />
                </li>
                <li className={styles.sidebarBlock}>
                    
                </li>
                <li className={styles.sidebarBlock}>
                    
                </li>
                <li className={`${styles.sidebarBlock} ${styles.lastBlock}`}>
                    
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar