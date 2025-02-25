import useBlackAndWhite from "@/hooks/useBlackAndWhite.js"
import {memo} from "react";
import styles from "./Toolbar.module.css";

const MakeImageBlackAndWhite = memo(() => {
  const {makeImageBlackAndWhite} = useBlackAndWhite()

  return (<button
    className={styles.toolbarButton}
    onClick={() => makeImageBlackAndWhite?.()}
  >
    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_22_81)">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M5.5 10C2.73858 10 0.5 7.76142 0.5 5C0.5 2.23858 2.73858 0 5.5 0C8.26142 0 10.5 2.23858 10.5 5C10.5 7.76142 8.26142 10 5.5 10ZM5.5 9.33334C3.14925 9.33334 1.16666 7.39323 1.16666 5C1.16666 2.82004 2.92879 0.666665 5.5 0.666665V9.33334Z"
              fill="#1C274C" fillOpacity="0.6"/>
      </g>
      <defs>
        <clipPath id="clip0_22_81">
          <rect width="10" height="10" fill="white" transform="translate(0.5)"/>
        </clipPath>
      </defs>
    </svg>
  </button>);
})

MakeImageBlackAndWhite.displayName = "MakeImageBlackAndWhite"

export default MakeImageBlackAndWhite;