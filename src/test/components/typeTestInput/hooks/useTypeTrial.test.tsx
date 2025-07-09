import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import useTypeTrial from "../../../../components/typeTrialInput/hooks/useTypeTrial";
import { ChangeEvent } from "react";

describe("useTypeTrial tests", () => {

  it("should have the correct default values", () => {
    const { result } = renderHook(() => useTypeTrial());

    expect(result.current.words).toEqual([
      "This",
      "is",
      "the",
      "sentence",
      "to",
      "type",
    ]);
    expect(result.current.enteredText).toBe("");
    expect(result.current.correctCount).toBe(0);
    expect(result.current.wordsPerMinute).toBe(0);
    expect(result.current.isTestFinsh).toBe(false);
  });

  it("starts the test and updates state when typing correct word", () => {
    const { result } = renderHook(() => useTypeTrial());

    const mockEvent = {
      currentTarget: { value: "This" },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.onWordChange(mockEvent);
    });

    expect(result.current.enteredText).toBe("");
    expect(result.current.correctCount).toBe(1);
    expect(result.current.words).toEqual(["is", "the", "sentence", "to", "type"]);
  });
});
