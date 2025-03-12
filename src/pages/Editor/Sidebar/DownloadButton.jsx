import style from './DownloadButton.module.css'
import useCanvas from "@/stores/CanvasStore"
import useImageStore from "@/stores/ImageStore"

function DownloadButton() {
  const canvas = useCanvas(store => store.canvas)
  const imageName = useImageStore(store => store.name)

  function downloadImage() {
    const url = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = imageName;
    downloadLink.click();
    downloadLink.remove();
  }

  return (
    <button className={style.button} onClick={downloadImage}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_34_72)">
          <path d="M2.375 4.875L4.25 4.875V0.5H6.75L6.75 4.875H8.625V5.5L5.5 8.625L2.375 5.5L2.375 4.875Z"
                fill="#F0F1F1"/>
          <path d="M1.75 9.25H9.25V10.5L1.75 10.5V9.25Z" fill="#F0F1F1"/>
        </g>
        <defs>
          <clipPath id="clip0_34_72">
            <rect width="10" height="10" fill="white" transform="matrix(-1 0 0 -1 10.5 10.5)"/>
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default DownloadButton;