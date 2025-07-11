import React from "react";
import "./App.css";
import TypeTrial from "./features/typeTrialInput/typeTrial";
import DisplayScores from "./features/displayScores/displayScores";
import { ScoresProvider } from "./contexts/scoresContext";

const App: React.FC = () => {
  return (
    <ScoresProvider>
      <div className="App">
        <TypeTrial />
        <DisplayScores />
      </div>
    </ScoresProvider>
  );
};

export default App;
