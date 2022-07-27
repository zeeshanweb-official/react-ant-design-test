import React from "react";
import { TasksProvider } from "./context/TasksContext";
import MainContainer from "./components/mainContainer";
import "./App.css";

function App() {
  return (
    <TasksProvider>
      <div className="App">
        <MainContainer />
      </div>
    </TasksProvider>
  );
}

export default App;
