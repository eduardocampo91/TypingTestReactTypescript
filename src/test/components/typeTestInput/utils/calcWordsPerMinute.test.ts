import "@testing-library/jest-dom";
import calcWordsPerMinute from "../../../../components/typeTrialInput/utils/calcWordsPerMinute";

describe("calcWordsPerMinute tests", () => {
  it("should calculate the value given the parameters", () => {
    const charsTyped = 100;
    const millis = 10_000;
    const result = calcWordsPerMinute(charsTyped, millis);
    expect(result).toBe(120);
  });
});
