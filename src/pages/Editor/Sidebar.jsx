import styles from "./Sidebar.module.css"
import CropImage from "./Blocks/CropImage.jsx"
import CurrentPixelInfo from "@/pages/Editor/Blocks/CurrentPixelInfo.jsx";
import MakeImageBlackAndWhite from "@/pages/Editor/Blocks/MakeImageBlackAndWhite.jsx";

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <ul className={styles.sidebarInner}>
                <li className={styles.sidebarBlock}>
                    <CropImage />
                </li>
                <li className={styles.sidebarBlock}>
                    <MakeImageBlackAndWhite />
                </li>
                <li className={styles.sidebarBlock}>
                    
                </li>
                <li className={`${styles.sidebarBlock} ${styles.lastBlock}`}>
                    <CurrentPixelInfo />
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar