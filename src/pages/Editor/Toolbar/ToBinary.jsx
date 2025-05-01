import styles from "./Toolbar.module.css"
import useToBinary from "@/hooks/useToBinary.js";
import Modal from "@/components/Modal.jsx";
import {useState} from "react";
import {RgbColorPicker} from "react-colorful";

function ToBinary() {
  const {makeImageBinary} = useToBinary()
  const [brightnessLevel, setBrightnessLevel] = useState(127)
  const [firstColor, setFirstColor] = useState({r: 0, g: 0, b: 0})
  const [secondColor, setSecondColor] = useState({r: 255, g: 255, b: 255})

  function handleClick() {
    makeImageBinary(brightnessLevel, firstColor, secondColor);
  }

  return (<Modal
    openingButton={<button className={styles.toolbarButton}>
      <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_22_83)">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M5.5 10C2.73858 10 0.5 7.76142 0.5 5C0.5 2.23858 2.73858 0 5.5 0C8.26142 0 10.5 2.23858 10.5 5C10.5 7.76142 8.26142 10 5.5 10ZM5.5 9.33334C3.14925 9.33334 1.16666 7.39323 1.16666 5C1.16666 2.82004 2.92879 0.666665 5.5 0.666665V9.33334Z"
                fill="#3C75B7"/>
        </g>
        <defs>
          <clipPath id="clip0_22_83">
            <rect width="10" height="10" fill="white" transform="translate(0.5)"/>
          </clipPath>
        </defs>
      </svg>
    </button>}>
    <div>
      <div className={styles.textCenter}>
        <h2>Бинаризация изображения</h2>
        <p>Превращает изображение в двухцветное</p>
      </div>
      <div className={styles.brightessLevelContainer}>
        Уровень яркости
        <span>
          <input
            type="range"
            onInput={(event) => setBrightnessLevel(+event.target.value)}
            value={brightnessLevel}
            step={1}
            min={0}
            max={255}
          />
          {brightnessLevel}
        </span>
      </div>
      <p className={styles.textCenter}>Все пикесли с ярокстью ниже указанной будут первого цвета, остальные -
        второго</p>
      <ul className={styles.colorpickersContainer}>
        <li className={styles.colorpickerWrapper}>
          <RgbColorPicker color={firstColor} onChange={setFirstColor}/>
        </li>
        <li className={styles.colorpickerWrapper}>
          <h3></h3>
          <RgbColorPicker color={secondColor} onChange={setSecondColor}/>
        </li>
      </ul>
      <form method="dialog">
        <button onClick={handleClick}>
          Ok
        </button>
      </form>
    </div>
  </Modal>);
}

export default ToBinary;