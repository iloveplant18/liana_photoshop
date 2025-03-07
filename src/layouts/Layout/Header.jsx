import styles from "./Header.module.css"
import Dropdown from "@/components/Dropdown.jsx"
import useImageStore from "@/stores/ImageStore.js"

function Header() {
  const setImage = useImageStore(store => store.setImage)
  const setImageName = useImageStore(store => store.setImageName)
  const setImageExtension = useImageStore(store => store.setExtension)
  const setImageSize = useImageStore(store => store.setSize);

  function uploadImage(event) {
    const imageBinary = event.target.files[0]
    const imageName = event.target.files[0].name.split(".")[0]
    const imageExtension = event.target.files[0].name.split(".")[1];
    setImageName(imageName)
    setImageExtension(imageExtension);
    const imagePath = URL.createObjectURL(imageBinary)
    const image = new Image()
    image.src = imagePath
    image.onload = () => {
      setImage(image)
      setImageSize({width: image.naturalWidth, height: image.naturalHeight});
    }
  }

  return (
    <header className={styles.header}>
      <img src="/logo.svg" alt="" width="19" height="19"/>
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