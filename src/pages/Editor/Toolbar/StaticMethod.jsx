import style from "@/pages/Editor/Toolbar/Toolbar.module.css";
import useStaticMethod from "@/hooks/borderMarkingMethods/useStaticMethod.js";

export default function SobelMethod() {
  const applyStaticMethod = useStaticMethod();

  return (
    <button className={style.toolbarButton} onClick={applyStaticMethod}>
      static
    </button>
  )
}