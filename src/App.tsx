import React, { useRef } from "react";
import DrawBoard from "./components/drawBoard/DrawBoard";
import RepeaterBoard from "./components/drawBoard/RepeaterBoard";
import classes from "./styles.module.scss";
import { PointsHistory } from "./components/drawBoard/hook.drawBoard";

function App() {
  const history = useRef<PointsHistory>([]);

  return (
    <div>
      <div className={classes.Container}>
        <DrawBoard saveHistoryTo={history} />
        <RepeaterBoard history={history} />
      </div>
    </div>
  );
}

export default App;
