import React, { useRef, useState } from "react";
import DrawBoard from "./components/drawBoard/DrawBoard";
import RepeaterBoard from "./components/drawBoard/RepeaterBoard";
import classes from "./styles.module.scss";
import { PointsHistory } from "./components/drawBoard/hook.drawBoard";

function App() {
  const history = useRef<PointsHistory>([]);
  const [keys, setKeys] = useState({
    draw: Math.random(),
    repeater: Math.random(),
  });

  function reset() {
    history.current = [];
    setKeys({
      draw: Math.random(),
      repeater: Math.random(),
    });
  }

  return (
    <div>
      <div className={classes.Container}>
        <div>
          <DrawBoard key={keys.draw} saveHistoryTo={history} />
          <div>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
        <RepeaterBoard key={keys.repeater} history={history} />
      </div>
    </div>
  );
}

export default App;
