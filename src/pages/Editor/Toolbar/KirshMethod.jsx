import style from "@/pages/Editor/Toolbar/Toolbar.module.css";
import useKirshMethod from "@/hooks/borderMarkingMethods/useKirshMethod.js";

export default function KirshMethod() {
  const applyKirshMethod = useKirshMethod();

  return (
    <button className={style.toolbarButton} onClick={applyKirshMethod}>
      kirsh
    </button>
  )
}