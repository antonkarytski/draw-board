import React, { MutableRefObject } from "react";
import { PointsHistory, useDrawBoard } from "./hook.drawBoard";
import classes from "./styles.module.scss";
import PlayButton from "../buttons/PlayButton";
import { useDrawBoardHistory } from "./hook.drawBoardHistory";
import cx from "classnames";
import Button from "../buttons/Button";

type RepeaterBoardProps = {
  history: MutableRefObject<PointsHistory>;
  className?: string;
};

export default function RepeaterBoard({
  history,
  className,
}: RepeaterBoardProps) {
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
    <div className={className}>
      <canvas
        width={500}
        height={500}
        ref={canvasRef}
        className={cx(classes.Canvas)}
      />
      <div className={classes.ButtonsSet}>
        <Button label={"Step back"} onClick={stepBack} />
        <PlayButton isClicked={isPlaying} onClick={togglePlaying} />
        <Button label={"Step forward"} onClick={stepForward} />
      </div>
    </div>
  );
}
