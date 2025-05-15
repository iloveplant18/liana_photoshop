import style from "@/pages/Editor/Toolbar/Toolbar.module.css";
import useLaplasMethod from "@/hooks/borderMarkingMethods/useLaplasMethod.js";

export default function LaplasMethod() {
  const applyLaplasMethod = useLaplasMethod();

  return (
    <button className={style.toolbarButton} onClick={applyLaplasMethod}>
      laplas
    </button>
  )
}