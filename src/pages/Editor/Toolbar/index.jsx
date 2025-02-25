import styles from "./Toolbar.module.css"
import InvertImage from "@/pages/Editor/Toolbar/InvertImage.jsx";
import MakeImageBlackAndWhite from "./MakeImageBlackAndWhite.jsx";
import ToBinary from "@/pages/Editor/Toolbar/ToBinary.jsx";

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <InvertImage />
      <MakeImageBlackAndWhite />
      <ToBinary />
    </div>
  );
}

export default Toolbar;