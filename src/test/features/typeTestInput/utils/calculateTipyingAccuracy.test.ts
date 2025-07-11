import "@testing-library/jest-dom";
import calcTypingAccuracy from "../../../../features/typeTrialInput/utils/calculateTypingAccuracy";

describe("calculateTypingAccuracy tests", () => {
  it("should calculate the value given the parameters", () => {
    let correctChar = 10;
    let totalChars = 10;
    let result = calcTypingAccuracy(correctChar, totalChars);
    expect(result).toBe(100);

    correctChar = 5;
    totalChars = 10;
    result = calcTypingAccuracy(correctChar, totalChars);
    expect(result).toBe(50);
  });
});
