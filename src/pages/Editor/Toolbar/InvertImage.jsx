import useInvert from "@/hooks/useInvert.js";
import styles from "./Toolbar.module.css";

function InvertImage() {
  const {invertImage} = useInvert()

  return (
    <button className={styles.toolbarButton} onClick={invertImage}>
      <svg width="11" height="10" viewBox="0 0 11 10">
        <g clipPath="url(#clip0_22_85)">
          <path
            d="M5.49991 0C2.7432 0 0.500092 2.24311 0.500092 5C0.500092 7.75689 2.7432 9.99982 5.49991 9.99982C8.2568 9.99982 10.4999 7.75689 10.4999 5C10.4999 2.24311 8.25698 0 5.49991 0ZM5.49991 9.19377C3.18733 9.19377 1.30596 7.3124 1.30596 4.99982C1.30596 2.68724 3.18751 0.805867 5.49991 0.805867C7.81267 0.805867 9.69422 2.68724 9.69422 4.99982C9.69422 7.3124 7.81267 9.19377 5.49991 9.19377Z"
            fill="#1C274C" fillOpacity="0.6"/>
          <path
            d="M7.38021 4.59698H3.61998C3.39755 4.59698 3.21713 4.7774 3.21713 4.99983C3.21713 5.22225 3.39755 5.40285 3.61998 5.40285H7.38021C7.60263 5.40285 7.78305 5.22225 7.78305 4.99983C7.78305 4.7774 7.60263 4.59698 7.38021 4.59698Z"
            fill="#1C274C" fillOpacity="0.6"/>
        </g>
        <defs>
          <clipPath id="clip0_22_85">
            <rect width="10" height="10" fill="white" transform="translate(0.5)"/>
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default InvertImage;