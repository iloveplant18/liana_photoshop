import useLinearNoiseReducer from "@/hooks/useLinearNoiseReducer.js";
import style from "./Toolbar.module.css";

function LinearNoiseReducer() {
  const applyLinearNoiseReduce = useLinearNoiseReducer();

  return (
    <button className={style.toolbarButton} onClick={() => applyLinearNoiseReduce()}>
      linear
    </button>
  )
}

export default LinearNoiseReducer;