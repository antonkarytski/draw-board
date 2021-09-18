import React, { useRef, useState } from "react";
import DrawBoard from "./components/drawBoard/DrawBoard";
import RepeaterBoard from "./components/drawBoard/RepeaterBoard";
import classes from "./styles.module.scss";
import { PointsHistory } from "./components/drawBoard/hook.drawBoard";
import Button from "./components/buttons/Button";

function App() {
  const history = useRef<PointsHistory>([]);
  const [keys, setKeys] = useState({
    draw: 1,
    repeater: 2,
  });

  function reset() {
    history.current = [];
    setKeys(({ draw, repeater }) => ({
      draw: draw + 1,
      repeater: repeater + 1,
    }));
  }

  return (
    <div className={classes.App}>
      <div>
        <DrawBoard
          key={keys.draw}
          saveHistoryTo={history}
          className={classes.DrawBoard}
        />
        <div>
          <Button label={"Reset"} onClick={reset} />
        </div>
      </div>
      <RepeaterBoard
        key={keys.repeater}
        history={history}
        className={classes.RepeaterBoard}
      />
    </div>
  );
}

export default App;
