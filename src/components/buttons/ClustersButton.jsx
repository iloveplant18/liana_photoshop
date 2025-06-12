import React from "react";
import { clusterizeImage } from "../../tools/clusterizeImage";

const ClatersButton = ({ canvasRef }) => {
  const handleClick = () => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    clusterizeImage(ctx, 4);
  };

  return (
    <button className="toolbar-btn" onClick={handleClick}>
      Clusterise
    </button>
  );
};

export default ClatersButton;