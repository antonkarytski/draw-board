import React from "react";
import {
  useDrawBoard,
  UseDrawBoardProps,
  withMouseEvent,
} from "./hook.drawBoard";
import classes from "./styles.module.scss";
import cx from "classnames";

type DrawBoardProps = { className?: string } & UseDrawBoardProps;

export default function DrawBoard({
  saveHistoryTo,
  className,
}: DrawBoardProps) {
  const { canvasRef, drawLine, drawDot, resetPosition } = useDrawBoard({
    saveHistoryTo,
  });

  return (
    <canvas
      className={cx(classes.Canvas, className)}
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
