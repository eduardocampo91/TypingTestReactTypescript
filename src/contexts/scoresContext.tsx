import { createContext, ReactNode, useContext, useState } from "react";

export interface Score {
  words: number;
  wpm: number;
  accuracy: number;
  totalScore: number;
}

interface ScoresContextProps {
  scores: Score[];
  addScore: (entry: Score) => void;
}

const ScoresContext = createContext<ScoresContextProps | undefined>(undefined);

export const useScoreContext = () => {
  const context = useContext(ScoresContext);
if (!context) {
    throw new Error("useScoreContext must be used within a ScoresProvider");
}
  return context;
};

export const ScoresProvider = ({ children }: { children: ReactNode }) => {
  const [scores, setScores] = useState<Score[]>([]);

  const addScore = (entry: Score) => {
    setScores((prev) => [...prev, entry]);
  };

  return (
    <ScoresContext.Provider value={{ scores, addScore }}>
      {children}
    </ScoresContext.Provider>
  );
};
