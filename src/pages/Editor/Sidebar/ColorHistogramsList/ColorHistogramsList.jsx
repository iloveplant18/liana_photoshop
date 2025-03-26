import style from "./ColorHistogramsList.module.css"
import useImageStore from "@/stores/ImageStore.js";
import {useEffect, useState} from "react";
import calcBrightness from "@/utils/calcBrightness.js";
import ColorHistogram from "./ColorHistogram.jsx";

function ColorHistogramsList() {
  const imageData = useImageStore(store => store.imageData);
  const [stats, setStats] = useState(getDefaultStat)

  useEffect(() => {
    if (!imageData) {
      setStats(getDefaultStat);
      return;
    }

    const redStats = Array(256).fill(0);
    const greenStats = Array(256).fill(0);
    const blueStats = Array(256).fill(0);
    const brightnessStats = Array(256).fill(0);

    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = calcBrightness(r, g, b);

      redStats[r]++;
      greenStats[g]++;
      blueStats[b]++;
      brightnessStats[brightness]++;
    }

    const newStats = {
      redStats: formatStat(redStats),
      blueStats: formatStat(blueStats),
      greenStats: formatStat(greenStats),
      brightnessStats: formatStat(brightnessStats),
    }

    setStats(newStats);
  }, [imageData]);

  function formatStat(stat) {
    return Array.from(stat, (value, index) => ({
      index: index,
      value: value,
    }))
  }

  function getDefaultStat() {
    return {
      redStats: formatStat(Array(256).fill(0)),
      blueStats: formatStat(Array(256).fill(0)),
      greenStats: formatStat(Array(256).fill(0)),
      brightnessStats: formatStat(Array(256).fill(0)),
    };
  }

  return (
    <div className={style.container}>
      <ColorHistogram title="Частоты красного спектра" stats={stats?.redStats} color="red" />
      <ColorHistogram title="Частоты зеленого спектра" stats={stats?.redStats} color="green" />
      <ColorHistogram title="Частоты синего спектра" stats={stats?.redStats} color="blue" />
      <ColorHistogram title="Яркость" stats={stats?.redStats} color="purple" />
    </div>
  );
}

export default ColorHistogramsList;