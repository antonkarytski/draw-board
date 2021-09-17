import React, { useRef } from "react";

type Position = {
  x: number;
  y: number;
};

export default function DrawBoard() {
  const canvas = useRef<null | HTMLCanvasElement>(null);
  const prevPosition = useRef<Position | null>(null);

  function drawDot(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const ctx = canvas.current?.getContext("2d");
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
    const ctx = canvas.current?.getContext("2d");
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
  }

  return (
    <canvas
      width={500}
      height={500}
      ref={canvas}
      style={style}
      onMouseDown={drawDot}
      onMouseMove={(event) => {
        if (!event.buttons) return;
        drawLine(event);
      }}
      onMouseUp={() => {
        prevPosition.current = null;
      }}
    />
  );
}

const style = {
  width: 500,
  height: 500,
  border: "1px solid black",
};
