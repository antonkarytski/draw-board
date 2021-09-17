import React, { MutableRefObject, useRef } from "react";

type Position = {
  x: number;
  y: number;
};

type PointData = {
  timeStamp: number;
} & Position;

export type PointsHistory = ({
  firstClick?: boolean;
} & PointData)[];

export type UseDrawBoardProps = {
  saveHistoryTo?: MutableRefObject<PointsHistory>;
};

export function withMouseEvent(
  handler: (position: PointData) => void,
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
) {
  const point = {
    x: event.nativeEvent.offsetX,
    y: event.nativeEvent.offsetY,
    timeStamp: event.timeStamp,
  };
  handler(point);
}

export function useDrawBoard({ saveHistoryTo }: UseDrawBoardProps = {}) {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const prevPosition = useRef<Position | null>(null);

  function resetPosition() {
    prevPosition.current = null;
  }

  function drawDot({ x, y, timeStamp }: PointData) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.fill();
    if (saveHistoryTo) {
      saveHistoryTo.current.push({
        x,
        y,
        timeStamp,
        firstClick: true,
      });
    }
  }

  function drawLine({ x, y, timeStamp }: PointData) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(prevPosition.current?.x ?? x, prevPosition.current?.y ?? y);
    ctx.lineTo(x, y);
    ctx.stroke();
    prevPosition.current = { x, y };
    if (saveHistoryTo) {
      saveHistoryTo.current.push({ x, y, timeStamp });
    }
  }

  return {
    drawDot,
    drawLine,
    resetPosition,
    canvasRef,
  };
}
