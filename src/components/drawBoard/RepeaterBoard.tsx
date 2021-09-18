import React, { MutableRefObject, useRef } from "react";
import { PointsHistory, useDrawBoard } from "./hook.drawBoard";
import classes from "./styles.module.scss";
import PlayButton from "../buttons/PlayButton";

type RepeaterBoardProps = {
  history: MutableRefObject<PointsHistory>;
};

export default function RepeaterBoard({ history }: RepeaterBoardProps) {
  const { canvasRef, drawDot, drawLine, resetPosition } = useDrawBoard();
  const drawIndex = useRef(0);
  const isPlaying = useRef(false);

  function withTimer() {
    if (drawIndex.current >= history.current.length) return;
    const { firstClick, ...point } = history.current[drawIndex.current];
    if (firstClick) {
      resetPosition();
      drawDot(point);
    } else {
      drawLine(point);
    }
    if (drawIndex.current === history.current.length - 1) {
      drawIndex.current = 0;
      return;
    }
    drawIndex.current = drawIndex.current + 1;
    if (!isPlaying.current) return;
    const nextDelay =
      history.current[drawIndex.current].timeStamp - point.timeStamp;
    const timer = setTimeout(
      () => {
        withTimer();
        clearTimeout(timer);
      },
      nextDelay > 500 ? 500 : nextDelay
    );
  }

  return (
    <div>
      <canvas
        width={500}
        height={500}
        ref={canvasRef}
        className={classes.Canvas}
      />
      <PlayButton
        onClick={() => {
          isPlaying.current = !isPlaying.current;
          if (isPlaying.current) withTimer();
          //history.current.splice(0, history.current.length);
        }}
      />
    </div>
  );
}
