import style from "@/pages/Editor/Toolbar/Toolbar.module.css";
import useWollesMethod from "@/hooks/useWollesMethod.js";

export default function WollesMethod() {
  const applyWollesMethod = useWollesMethod();

  return (
    <button className={style.toolbarButton} onClick={applyWollesMethod}>
      wolles
    </button>
  )
}