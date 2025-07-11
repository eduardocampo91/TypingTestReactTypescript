import { Score } from "../../../contexts/scoresContext";

 const calcHighestScore = (scores: Score[]): number => {
    return scores.length
    ? Math.max(...scores.map((s) => s.totalScore))
    : 0;
 }
export default calcHighestScore;