import React, { MutableRefObject } from "react";
import { PointsHistory, useDrawBoard } from "./hook.drawBoard";
import classes from "./styles.module.scss";

type RepeaterBoardProps = {
  history: MutableRefObject<PointsHistory>;
};

export default function RepeaterBoard({ history }: RepeaterBoardProps) {
  const { canvasRef, drawDot, drawLine } = useDrawBoard();

  return (
    <div>
      <canvas
        width={500}
        height={500}
        ref={canvasRef}
        className={classes.Canvas}
      />
      <button
        onClick={() => {
          history.current.forEach(({ firstClick, timeStamp, x, y }) => {
            if (firstClick) {
              drawDot({ x, y, timeStamp });
              return;
            }
            drawLine({ x, y, timeStamp });
          });
          history.current.splice(0, history.current.length);
        }}
      >
        Draw
      </button>
    </div>
  );
}
