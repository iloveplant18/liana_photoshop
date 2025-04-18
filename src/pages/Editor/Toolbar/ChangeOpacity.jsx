import styles from "./Toolbar.module.css"
import useChangeBrightness from "@/hooks/useChangeBrightness.js";
import useChangeContrast from "@/hooks/useChangeContrast.js";
import Modal from "@/components/Modal.jsx";
import {useState} from "react";

function ChangeOpacity() {
  const [brightnessLevel, setBrightnessLevel] = useState(0);
  const [contrastLevel, setContrastLevel] = useState(0);

  // Именно эти значения пойдут в хуки. Ставим их в момент onMouseUp.
  const [finalBrightness, setFinalBrightness] = useState(0);
  const [finalContrast, setFinalContrast] = useState(0);

  // Ваши кастом-хуки:
  useChangeBrightness(finalBrightness);
  useChangeContrast(finalContrast);

  const handleBrightnessChange = (event) => {
    setBrightnessLevel(+event.target.value);
  };

  const handleContrastChange = (event) => {
    setContrastLevel(+event.target.value);
  };

  // Когда отпускаем мышку – обновляем финальные значения, чтобы хуки сработали
  const handleBrightnessMouseUp = () => {
    setFinalBrightness(brightnessLevel);
  };

  const handleContrastMouseUp = () => {
    setFinalContrast(contrastLevel);
  };

  return (<Modal
      openingButton={<button className={styles.toolbarButton}>
        <svg fill="#000000" width="15" height="15" viewBox="0 0 32 27" id="icon" xmlns="http://www.w3.org/2000/svg">
          <title>brightness-contrast</title>
          <rect x="15" y="2" width="2" height="3"/>
          <rect x="27" y="15" width="3" height="2"/>
          <rect x="15" y="27" width="2" height="3"/>
          <rect x="2" y="15" width="3" height="2"/>
          <rect x="6.22" y="5.73" width="2" height="3" transform="translate(-3 7.23) rotate(-45)"/>
          <rect x="23.27" y="6.23" width="3" height="2" transform="translate(2.14 19.63) rotate(-45)"/>
          <rect x="23.77" y="23.27" width="2" height="3" transform="translate(-10.26 24.77) rotate(-45)"/>
          <polygon points="5.47 25.13 7.59 23 9 24.42 6.88 26.54 5.47 25.13"/>
          <path d="M16,8a8,8,0,1,0,8,8A8,8,0,0,0,16,8Zm0,14a6,6,0,0,1,0-12Z"/>
          <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" style={{fill: "none"}} width="32"
                height="32"/>
        </svg>
      </button>}>
    <div>
      <div className={styles.textCenter}>
        <h2>Яркость / Контрастность</h2>
        <p>Изменения яркости и контрастности изображения</p>
      </div>
      <div className={styles.brightessLevelContainer}>
        Уровень яркости
        <span>
          <input
              type="range"
              onChange={handleBrightnessChange}
              onMouseUp={handleBrightnessMouseUp}
              value={brightnessLevel}
              step={1}
              min={-100}
              max={100}
          />
        </span>
      </div>
      <div style={{display: "flex",
        justifyContent: "right",
      }}>
        {brightnessLevel}
      </div>
      <div className={styles.brightessLevelContainer}>
        Уровень контрастности
        <span>
          <input
              type="range"
              onChange={handleContrastChange}
              onMouseUp={handleContrastMouseUp}
              value={contrastLevel}
              step={1}
              min={-100}
              max={100}
          />
        </span>
      </div>
      <div style={{display: "flex",
        justifyContent: "right",
      }}>
        {contrastLevel}
      </div>
    </div>
  </Modal>);
}

export default ChangeOpacity;