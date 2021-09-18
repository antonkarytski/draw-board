import React, { MutableRefObject } from "react";
import { PointsHistory, useDrawBoard } from "./hook.drawBoard";
import classes from "./styles.module.scss";

type RepeaterBoardProps = {
  history: MutableRefObject<PointsHistory>;
};

export default function RepeaterBoard({ history }: RepeaterBoardProps) {
  const { canvasRef, drawDot, drawLine, resetPosition } = useDrawBoard();

  function withTimer(fullData: PointsHistory, currentIndex: number) {
    if (currentIndex >= fullData.length) return;
    const { firstClick, ...point } = fullData[currentIndex];
    if (firstClick) {
      resetPosition();
      drawDot(point);
    } else {
      drawLine(point);
    }
    if (currentIndex === fullData.length - 1) return;
    const timer = setTimeout(() => {
      withTimer(fullData, currentIndex + 1);
      clearTimeout(timer);
    }, fullData[currentIndex + 1].timeStamp - point.timeStamp);
  }

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
          withTimer(history.current, 0);
          //history.current.splice(0, history.current.length);
        }}
      >
        Draw
      </button>
    </div>
  );
}
