import style from "./ProgressBar.module.css"
import useProgressStore from "@/stores/ProgressStore.js";

function ProgressBar() {
  const progress = useProgressStore(store => store.progress);
  return (
    <div className={style.progressBar}>
      <div className={style.progressLine}
           style={{backgroundImage: `linear-gradient(90deg, var(--neutral-100) ${progress}%, transparent ${progress}%)`}}></div>
      <span className={style.percent}>
        {progress}%
      </span>
    </div>
  );
}

export default ProgressBar;