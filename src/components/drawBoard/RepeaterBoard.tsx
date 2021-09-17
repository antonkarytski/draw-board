import React from "react";
import { useDrawBoard } from "./hook.drawBoard";
import classes from "./styles.module.scss";

type RepeaterBoardProps = {};

export default function RepeaterBoard() {
  const { canvasRef } = useDrawBoard();

  return (
    <canvas
      width={500}
      height={500}
      ref={canvasRef}
      className={classes.Canvas}
    />
  );
}
