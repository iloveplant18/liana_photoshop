import style from "./ImageInfo.module.css"
import useImageStore from "@/stores/ImageStore.js";
import DownloadButton from "@/pages/Editor/Sidebar/DownloadButton.jsx";

function ImageInfo() {
  const imageName = useImageStore(store => store.name);
  const imageExtesion = useImageStore(store => store.extension);
  const imageSize = useImageStore(store => store.size);

  return (
    <div className={style.wrapper}>
      <div className={style.topBlockContainer}>
        <div className={style.nameContainer}>
          {imageName ? imageName : "Название"}
        </div>
        <DownloadButton/>
      </div>
      {imageName && imageSize && (
        <div className={style.descriptionContainer}>
          <div>
            Редактируемое&nbsp;изображение&nbsp;{imageExtesion}
          </div>
          <div className={style.textContainer}>
            <span>
              Высота:&nbsp;{imageSize.height}
            </span>
            <span>
              Ширина:&nbsp;{imageSize.width}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageInfo;