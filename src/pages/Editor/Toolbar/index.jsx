import styles from "./Toolbar.module.css"
import InvertImage from "./InvertImage.jsx";
import MakeImageBlackAndWhite from "./MakeImageBlackAndWhite.jsx";
import ToBinary from "./ToBinary.jsx";
import ProgressBar from "./ProgressBar.jsx";
import ChangeOpacity from "./ChangeOpacity.jsx";

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <InvertImage />
      <MakeImageBlackAndWhite />
      <ToBinary />
        <ChangeOpacity />
      <ProgressBar />
    </div>
  );
}

export default Toolbar;