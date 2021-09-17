import React from "react";
import { useDrawBoard } from "./hook.drawBoard";
import classes from "./styles.module.scss";

export default function DrawBoard() {
  const { canvasRef, drawLine, drawDot, resetPosition } = useDrawBoard({
    saveHistory: true,
  });

  return (
    <canvas
      className={classes.Canvas}
      width={500}
      height={500}
      ref={canvasRef}
      onMouseDown={drawDot}
      onMouseMove={(event) => {
        if (!event.buttons) return;
        drawLine(event);
      }}
      onMouseUp={resetPosition}
    />
  );
}
