import style from "@/pages/Editor/Toolbar/Toolbar.module.css";
import useSobelMethod from "@/hooks/borderMarkingMethods/useSobelMethod.js";

export default function SobelMethod() {
  const applySobelMethod = useSobelMethod();

  return (
    <button className={style.toolbarButton} onClick={applySobelMethod}>
      sobel
    </button>
  )
}