import React, { MutableRefObject, useRef } from "react";
import { PointsHistory, useDrawBoard } from "./hook.drawBoard";
import classes from "./styles.module.scss";
import PlayButton from "../buttons/PlayButton";
import { findLastIndex } from "../../lib/findLastIndex";

type RepeaterBoardProps = {
  history: MutableRefObject<PointsHistory>;
};

export default function RepeaterBoard({ history }: RepeaterBoardProps) {
  const { canvasRef, drawDot, drawLine, resetPosition, clear } = useDrawBoard();
  const drawIndex = useRef(0);
  const isPlaying = useRef(false);

  function withTimer() {
    if (drawIndex.current >= history.current.length) {
      drawIndex.current = 0;
      return;
    }
    const { firstClick, ...point } = history.current[drawIndex.current];
    if (firstClick) {
      resetPosition();
      drawDot(point);
    } else {
      drawLine(point);
    }
    if (drawIndex.current === history.current.length - 1) return;
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

  function stepBack() {
    clear();
    if (!drawIndex.current) return;
    const prevStepIndex = findLastIndex(
      history.current,
      ({ firstClick }, index) => {
        return !!firstClick && index < drawIndex.current;
      }
    );
    drawIndex.current = prevStepIndex;
    history.current
      .filter((_, index) => {
        return index <= prevStepIndex;
      })
      .forEach(({ firstClick, ...point }) => {
        if (firstClick) {
          resetPosition();
          drawDot(point);
        } else {
          drawLine(point);
        }
      });
  }

  return (
    <div>
      <canvas
        width={500}
        height={500}
        ref={canvasRef}
        className={classes.Canvas}
      />
      <button onClick={stepBack}>Step back</button>
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
