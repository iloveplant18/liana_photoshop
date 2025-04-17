import {useState} from "react";
import useSaltPepper from "@/hooks/useSaltPepper.js";
import Modal from "@/components/Modal";
import style from "./Toolbar.module.css";

function SaltPepper() {
  const [probability, setProbability] = useState(0.2);
  const applySaltPepper = useSaltPepper(probability);

  return (
    <Modal
      openingButton={
        <button
          className={style.toolbarButton}
        >
          соль перец
        </button>
      }
    >
      <div className={style.textCenter}>
        <h3>Шум соль-перец</h3>
        <input
          className={style.range}
          type="range"
          value={probability}
          max={0.4}
          min={0.0}
          step={0.001}
          onChange={(event) => setProbability(event.target.value)}
        />
        {probability}
        <form method="dialog">
            <button onClick={() => applySaltPepper?.()} disabled={!applySaltPepper}>
              ОК
            </button>
        </form>
      </div>
    </Modal>
  );
}

export default SaltPepper;
