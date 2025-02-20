import styles from "./Header.module.css"
import Dropdown from "@/components/Dropdown.jsx"
import useImageStore from "@/stores/ImageStore.js"

function Header() {
    const setImage = useImageStore(store => store.setImage)
    function uploadImage(event) {
        const imageBinary = event.target.files[0]
        const imagePath = URL.createObjectURL(imageBinary)
        const image = new Image()
        image.src = imagePath
        image.onload = () => setImage(image)
    }

    return (
        <header className={styles.header}>
            <img src="/logo.svg" alt="" width="19" height="19" />
            <Dropdown wrapperClass={styles.headerDropdownContaier} buttonClass={styles.headerButton} buttonText="Файл">
                <ul>
                    <li>
                        <label className={styles.listButton}>
                            Открыть
                            <input
                                onChange={uploadImage}
                                hidden
                                type="file"
                            />
                        </label>
                    </li>
                    <li>
                        <button className={styles.listButton}>
                            Сохранить
                        </button>
                    </li>
                </ul>
            </Dropdown>
            <a className={styles.headerButton} href="#">
                Помощь
            </a>
        </header>
    )
}

export default Header