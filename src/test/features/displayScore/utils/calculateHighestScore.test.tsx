import "@testing-library/jest-dom";
import calcHighestScore from "../../../../features/displayScores/utils/calculateHighestScore";
import { Score } from "../../../../contexts/scoresContext";

describe("calcHighestScore tests", () => {
  it("should return 0 if no score is given", () => {
    let scores: Score[] = [];
    let result = calcHighestScore(scores);
    expect(result).toBe(0);
  });
  it("should return the score given the parameters", () => {
    let scores: Score[] = [
      { words: 6, wpm: 90, accuracy: 100, totalScore: 90 },
    ];
    let result = calcHighestScore(scores);
    expect(result).toBe(90);
  });
  it("should return the higthest score of the given array of parameters", () => {
    let scores: Score[] = [
      { words: 6, wpm: 70, accuracy: 100, totalScore: 70 },
      { words: 2, wpm: 80, accuracy: 100, totalScore: 80 },
      { words: 9, wpm: 60, accuracy: 100, totalScore: 60 },
    ];
    let result = calcHighestScore(scores);
    expect(result).toBe(80);
  });
});
