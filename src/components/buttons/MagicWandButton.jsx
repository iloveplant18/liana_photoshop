import React from "react";
import { magicWandSelect } from "../../tools/magicWand";

const MagicWoundButton = ({ canvasRef }) => {
  const activate = () => {
    console.log("canvas ", canvasRef);
    if (!canvasRef) return;
    const canvas = canvasRef;
    const rect = canvas.getBoundingClientRect();

    const onClick = (e) => {
      const x = Math.floor(
        ((e.clientX - rect.left) / rect.width) * canvas.width
      );
      const y = Math.floor(
        ((e.clientY - rect.top) / rect.height) * canvas.height
      );
      const ctx = canvas.getContext("2d");
      magicWandSelect(ctx, x, y, 48);
      canvas.removeEventListener("click", onClick);
    };

    canvas.addEventListener("click", onClick);
    console.log("add onCLick bulshot to canvas")
  };

  return (
    <button className="toolbar-btn" onClick={activate}>
      Magic&nbsp;Wand
    </button>
  );
};

export default MagicWoundButton;