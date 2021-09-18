import { MutableRefObject, useRef } from "react";
import { PointsHistory, useDrawBoard } from "./hook.drawBoard";
import { findLastIndex } from "../../lib/findLastIndex";

type UseDrawBoardHistoryProps = {
  history: MutableRefObject<PointsHistory>;
  controller: Omit<ReturnType<typeof useDrawBoard>, "canvasRef">;
};

export function useDrawBoardHistory({
  history,
  controller,
}: UseDrawBoardHistoryProps) {
  const drawIndex = useRef(0);
  const isPlaying = useRef(false);
  const { drawDot, drawLine, resetPosition, clear } = controller;

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
    [...history.current]
      .slice(0, prevStepIndex + 1)
      .forEach(({ firstClick, ...point }) => {
        if (firstClick) {
          resetPosition();
          drawDot(point);
        } else {
          drawLine(point);
        }
      });
  }

  function stepForward() {
    if (drawIndex.current >= history.current.length - 1) return;
    const nextStepIndex =
      history.current.findIndex(({ firstClick }, index) => {
        return !!firstClick && index > drawIndex.current;
      }) || history.current.length - 1;
    [...history.current]
      .slice(drawIndex.current + 1, nextStepIndex + 1)
      .forEach(({ firstClick, ...point }) => {
        if (firstClick) {
          resetPosition();
          drawDot(point);
        } else {
          drawLine(point);
        }
      });
    drawIndex.current = nextStepIndex;
  }

  function togglePlaying() {
    isPlaying.current = !isPlaying.current;
    if (isPlaying.current) withTimer();
  }

  return {
    togglePlaying,
    stepBack,
    stepForward,
  };
}
