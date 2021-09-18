import React, { MutableRefObject } from "react";
import { PointsHistory } from "./hook.drawBoard";
import classes from "./styles.module.scss";
import PlayButton from "../buttons/PlayButton";
import { useRepeaterBoard } from "./hook.repeaterBoard";
import Button from "../buttons/Button";

type RepeaterBoardProps = {
  history: MutableRefObject<PointsHistory>;
  className?: string;
};

export default function RepeaterBoard({
  history,
  className,
}: RepeaterBoardProps) {
  const {
    canvasRef,
    stepBack,
    stepForward,
    togglePlaying,
    isPlaying,
  } = useRepeaterBoard(history);

  return (
    <div className={className}>
      <canvas
        width={500}
        height={500}
        ref={canvasRef}
        className={classes.Canvas}
      />
      <div className={classes.ButtonsSet}>
        <Button label={"Step back"} onClick={stepBack} />
        <PlayButton
          className={classes.PlayButton}
          isClicked={isPlaying}
          onClick={togglePlaying}
        />
        <Button label={"Step forward"} onClick={stepForward} />
      </div>
    </div>
  );
}
