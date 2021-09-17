import React, { useRef } from "react";

type Position = {
  x: number;
  y: number;
};

type PointsHistory = ({
  timestamp: number;
  firstClick?: boolean;
} & Position)[];

type UseDrawBoardProps = {
  saveHistory?: boolean;
};

export function useDrawBoard({ saveHistory }: UseDrawBoardProps = {}) {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const prevPosition = useRef<Position | null>(null);
  const history = useRef<PointsHistory>([]);

  function resetPosition() {
    prevPosition.current = null;
  }

  function drawDot(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY,
      1,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  function drawLine(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    const currentX = event.nativeEvent.offsetX;
    const currentY = event.nativeEvent.offsetY;
    ctx.moveTo(
      prevPosition.current?.x ?? currentX,
      prevPosition.current?.y ?? currentY
    );
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    prevPosition.current = {
      x: currentX,
      y: currentY,
    };
    if (saveHistory) {
      history.current.push({
        x: currentX,
        y: currentY,
        timestamp: 1,
      });
    }
  }

  return {
    drawDot,
    drawLine,
    resetPosition,
    canvasRef,
    history,
  };
}
