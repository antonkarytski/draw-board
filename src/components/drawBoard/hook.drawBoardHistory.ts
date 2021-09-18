import { MutableRefObject, useRef, useState } from "react";
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
  const [isPlayingState, setIsPlayingState] = useState(false);
  const { drawDot, drawLine, resetPosition, clear } = controller;

  function draw({ firstClick, ...point }: PointsHistory[0]) {
    if (firstClick) {
      resetPosition();
      drawDot(point);
      return;
    }
    drawLine(point);
  }

  function withDelay() {
    if (drawIndex.current >= history.current.length) {
      drawIndex.current = 0;
      return;
    }
    const point = history.current[drawIndex.current];
    draw(point);
    if (drawIndex.current === history.current.length - 1) return;
    drawIndex.current = drawIndex.current + 1;
    if (!isPlaying.current) return;
    const nextDelay =
      history.current[drawIndex.current].timeStamp - point.timeStamp;
    const timer = setTimeout(
      () => {
        withDelay();
        clearTimeout(timer);
      },
      nextDelay > 500 ? 500 : nextDelay
    );
  }

  function togglePlaying() {
    isPlaying.current = !isPlaying.current;
    setIsPlayingState(isPlaying.current);
    if (isPlaying.current) withDelay();
  }

  function pause() {
    isPlaying.current = false;
    setIsPlayingState(false);
  }

  function stepBack() {
    clear();
    if (!drawIndex.current) return;
    pause();
    const prevStepIndex = findLastIndex(
      history.current,
      ({ firstClick }, index) => {
        return !!firstClick && index < drawIndex.current;
      }
    );
    drawIndex.current = prevStepIndex;
    history.current.slice(0, prevStepIndex + 1).forEach(draw);
  }

  function stepForward() {
    if (drawIndex.current >= history.current.length - 1) return;
    pause();
    const nextStepIndex =
      history.current.findIndex(({ firstClick }, index) => {
        return !!firstClick && index > drawIndex.current;
      }) || history.current.length - 1;
    history.current
      .slice(drawIndex.current + 1, nextStepIndex + 1)
      .forEach(draw);
    drawIndex.current = nextStepIndex;
  }

  return {
    togglePlaying,
    pause,
    stepBack,
    stepForward,
    isPlaying: isPlayingState,
  };
}
