import React, { MutableRefObject } from "react";
import { PointsHistory, useDrawBoard } from "./hook.drawBoard";
import classes from "./styles.module.scss";
import PlayButton from "../buttons/PlayButton";
import { useDrawBoardHistory } from "./hook.drawBoardHistory";

type RepeaterBoardProps = {
  history: MutableRefObject<PointsHistory>;
};

export default function RepeaterBoard({ history }: RepeaterBoardProps) {
  const { canvasRef, ...controller } = useDrawBoard();
  const {
    stepBack,
    stepForward,
    togglePlaying,
    isPlaying,
  } = useDrawBoardHistory({
    controller,
    history,
  });

  return (
    <div>
      <canvas
        width={500}
        height={500}
        ref={canvasRef}
        className={classes.Canvas}
      />
      <div>
        <button onClick={stepBack}>Step back</button>
        <PlayButton isClicked={isPlaying} onClick={togglePlaying} />
        <button onClick={stepForward}>Step forward</button>
      </div>
    </div>
  );
}
