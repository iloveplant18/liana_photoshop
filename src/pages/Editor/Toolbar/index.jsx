import styles from "./Toolbar.module.css"
import InvertImage from "./InvertImage.jsx";
import MakeImageBlackAndWhite from "./MakeImageBlackAndWhite.jsx";
import ToBinary from "./ToBinary.jsx";
import ProgressBar from "./ProgressBar.jsx";
import LinearNoiseReducer from "./LinearNoiseReducer.jsx";
import MedianNoiseReducer from "./MedianNoiseReducer.jsx";
import SaltPepper from "./SatlPepper.jsx";
import LaplasMethod from "@/pages/Editor/Toolbar/LaplasMethod.jsx";
import KirshMethod from "@/pages/Editor/Toolbar/KirshMethod.jsx";
import WollesMethod from "@/pages/Editor/Toolbar/WollesMethod.jsx";
import StaticMethod from "@/pages/Editor/Toolbar/StaticMethod.jsx";
import SobelMethod from "@/pages/Editor/Toolbar/SobelMethod.jsx";
import RobertsMethod from "@/pages/Editor/Toolbar/RobertsMethod.jsx";
import MagicScissorsButton from "../../../components/buttons/MagicScissorsButton.jsx";
import useCanvas from "../../../stores/CanvasStore.js";
import MagicWoundButton from "../../../components/buttons/MagicWandButton.jsx";
import { useEffect } from "react";
import ClatersButton from "../../../components/buttons/ClustersButton.jsx";

function Toolbar() {
  const canvasRef = useCanvas(store => store.canvas);

  useEffect(() => {
    console.log("canvas in original com[onent", canvasRef);
  }, [canvasRef])

  return (
    <div className={styles.toolbar}>
      <InvertImage/>
      <MakeImageBlackAndWhite/>
      <ToBinary/>
      <LinearNoiseReducer/>
      <MedianNoiseReducer/>
      <SaltPepper/>
      <LaplasMethod/>
      <KirshMethod />
      <WollesMethod />
      <StaticMethod />
      <RobertsMethod />
      <SobelMethod />
      {canvasRef && <MagicScissorsButton canvasRef={canvasRef}/>}
      <MagicWoundButton canvasRef={canvasRef} />
      <ClatersButton canvasRef={canvasRef} />
      <ProgressBar/>
    </div>
  );
}

export default Toolbar;