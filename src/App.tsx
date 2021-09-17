import React from "react";
import DrawBoard from "./components/drawBoard/DrawBoard";
import RepeaterBoard from "./components/drawBoard/RepeaterBoard";

function App() {
  return (
    <div className="App">
      <div>
        <DrawBoard />
        <RepeaterBoard />
      </div>
    </div>
  );
}

export default App;
