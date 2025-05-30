import style from "@/pages/Editor/Toolbar/Toolbar.module.css";
import useRobertsMethod from "@/hooks/borderMarkingMethods/useRobertsMethod";

export default function LaplasMethod() {
  const applyRobertsMethod = useRobertsMethod();

  return (
    <button className={style.toolbarButton} onClick={applyRobertsMethod}>
      roberts
    </button>
  )
}