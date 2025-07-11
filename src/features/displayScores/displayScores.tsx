import BasicGrid from "../../components/basicGrid/basicGrid";
import { useScoreContext } from "../../contexts/scoresContext";
import calcHighestScore from "./utils/calculateHighestScore";

const DisplayScores = () => {
  const { scores } = useScoreContext();
  const gridOptions = [
    { field: "words", headerName: "Words Typed" },
    { field: "wpm", headerName: "WPM" },
    { field: "accuracy", headerName: "Accuracy (%)" },
    { field: "totalScore", headerName: "Score" },
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", textAlign: "left" }}>
      <h3 style={{ marginBottom: "1rem" }}>
        🏆 Highest Score: <strong>{calcHighestScore(scores)}</strong>
      </h3>
      <BasicGrid colDefs={gridOptions} rowData={scores} />
    </div>
  );
};

export default DisplayScores;
