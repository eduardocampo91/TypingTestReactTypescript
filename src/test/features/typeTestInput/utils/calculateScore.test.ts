import "@testing-library/jest-dom";
import calculateScore from "../../../../features/typeTrialInput/utils/calculateScore";

describe("calculateScore tests", () => {
  it("should calculate the value given the parameters", () => {
    let words = 10;
    let wpm = 50;
    let accuracy = 100 / 100;
    let firstStrikeAccuracy = 100 / 100;
    let result = calculateScore(words, wpm, accuracy, firstStrikeAccuracy);
    expect(result).toBe(83);

    words = 20;
    wpm = 50;
    accuracy = 70 / 100;
    firstStrikeAccuracy = 80 / 100;
    result = calculateScore(words, wpm, accuracy, firstStrikeAccuracy);
    expect(result).toBe(93);
  });
});
