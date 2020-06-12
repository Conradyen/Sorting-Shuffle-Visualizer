import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SortingBoard from "./components/SortingBoard";
import Control from "./components/Control";

function App() {
  //TODO :make array a hook

  return (
    <div className="App">
      <Control />
      <SortingBoard />
    </div>
  );
}

export default App;
