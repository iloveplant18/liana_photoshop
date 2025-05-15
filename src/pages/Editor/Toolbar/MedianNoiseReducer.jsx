import useMedianNoiseReducer from "@/hooks/useMedianNoiseReducer.js";
import style from "./Toolbar.module.css";

function MedianNoiseReducer() {
  const applyMedianNoiseReduce = useMedianNoiseReducer();

  return (
    <button className={style.toolbarButton} onClick={applyMedianNoiseReduce}>
      median
    </button>
  )
}

export default MedianNoiseReducer;