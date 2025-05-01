import styles from "./Toolbar.module.css"
import InvertImage from "./InvertImage.jsx";
import MakeImageBlackAndWhite from "./MakeImageBlackAndWhite.jsx";
import ToBinary from "./ToBinary.jsx";
import ProgressBar from "./ProgressBar.jsx";
import LinearNoiseReducer from "./LinearNoiseReducer.jsx";
import MedianNoiseReducer from "./MedianNoiseReducer.jsx";
import SaltPepper from "./SatlPepper.jsx";
import LaplasMethod from "@/pages/Editor/Toolbar/LaplasMethod.jsx";

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <InvertImage/>
      <MakeImageBlackAndWhite/>
      <ToBinary/>
      <LinearNoiseReducer/>
      <MedianNoiseReducer/>
      <SaltPepper/>
      <LaplasMethod/>
      <ProgressBar/>
    </div>
  );
}

export default Toolbar;