import React from "react";
import {
  useDrawBoard,
  UseDrawBoardProps,
  withMouseEvent,
} from "./hook.drawBoard";
import classes from "./styles.module.scss";

type DrawBoardProps = {} & UseDrawBoardProps;

export default function DrawBoard({ saveHistoryTo }: DrawBoardProps) {
  const { canvasRef, drawLine, drawDot, resetPosition } = useDrawBoard({
    saveHistoryTo,
  });

  return (
    <canvas
      className={classes.Canvas}
      width={500}
      height={500}
      ref={canvasRef}
      onMouseDown={(event) => withMouseEvent(drawDot, event)}
      onMouseMove={(event) => {
        if (!event.buttons) return;
        withMouseEvent(drawLine, event);
      }}
      onMouseUp={resetPosition}
    />
  );
}
