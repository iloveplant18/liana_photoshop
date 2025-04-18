import styles from "./Toolbar.module.css"
import InvertImage from "./InvertImage.jsx";
import MakeImageBlackAndWhite from "./MakeImageBlackAndWhite.jsx";
import ToBinary from "./ToBinary.jsx";
import ProgressBar from "./ProgressBar.jsx";
<<<<<<< HEAD
import ChangeOpacity from "./ChangeOpacity.jsx";
=======
import LinearNoiseReducer from "./LinearNoiseReducer.jsx";
import MedianNoiseReducer from "./MedianNoiseReducer.jsx";
import SaltPepper from "./SatlPepper.jsx";
>>>>>>> 28b42c7acb91fd001764ef89c5a72cf9c4254c8f

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <InvertImage />
      <MakeImageBlackAndWhite />
      <ToBinary />
<<<<<<< HEAD
        <ChangeOpacity />
=======
      <LinearNoiseReducer />
      <MedianNoiseReducer />
      <SaltPepper />
>>>>>>> 28b42c7acb91fd001764ef89c5a72cf9c4254c8f
      <ProgressBar />
    </div>
  );
}

export default Toolbar;