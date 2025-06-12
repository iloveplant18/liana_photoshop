import React, { useState } from "react";
import { magicScissors } from "../../tools/magicScissors";

const MagicScissorsButton = ({ canvasRef }) => {
  const [points, setPoints] = useState([]);

  const activate = () => {
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

      setPoints((prev) => {
        const next = [...prev, [x, y]];
        if (next.length === 2) {
          const ctx = canvas.getContext("2d");
          magicScissors(ctx, next[0][0], next[0][1], next[1][0], next[1][1]);
          canvas.removeEventListener("click", onClick);
          return [];
        }
        return next;
      });
    };

    canvas.addEventListener("click", onClick);
  };

  return (
    <button className="toolbar-btn" onClick={activate}>
      Magic&nbsp;Scissors
    </button>
  );
};

export default MagicScissorsButton;