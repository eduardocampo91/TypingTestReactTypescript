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

  it("should start the test and update state when typing the correct word", () => {
    const { result } = renderHook(() => useTypeTrial());

    const mockEvent = {
      currentTarget: { value: "This" },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.onWordChange(mockEvent);
    });

    expect(result.current.enteredText).toBe("");
    expect(result.current.correctCount).toBe(1);
    expect(result.current.wordsPerMinute).toBeGreaterThan(1);
    expect(result.current.started).toBeTruthy();
    expect(result.current.words).toEqual(["is", "the", "sentence", "to", "type"]);
  });

   it("should not update correctCount and should not remove a word if is not the correct word", () => {
     const { result } = renderHook(() => useTypeTrial());

     const mockEvent = {
       currentTarget: { value: "That" },
     } as ChangeEvent<HTMLInputElement>;

     act(() => {
       result.current.onWordChange(mockEvent);
     });

     expect(result.current.enteredText).toBe("That");
     expect(result.current.correctCount).toBe(0);
     expect(result.current.words).toEqual([
       "This",
       "is",
       "the",
       "sentence",
       "to",
       "type",
     ]);
   });

   it("should update wordsPerMinutes result, remove all the words from the sentence to type and finish the test when whole the sentece is being correctly typed", () => {
     const { result } = renderHook(() => useTypeTrial());

     const words = ["This", "is", "the", "sentence", "to", "type"];

     for (let word of words) {
       const event = {
         currentTarget: { value: word },
       } as React.ChangeEvent<HTMLInputElement>;

       act(() => {
         result.current.onWordChange(event);
       });
     }

     expect(result.current.enteredText).toBe("");
     expect(result.current.correctCount).toBe(6);
     expect(result.current.words).toEqual([]);
     expect(result.current.wordsPerMinute).toBeTruthy();
     expect(result.current.started).toBeFalsy();
     expect(result.current.isTestFinsh).toBe(true);
   });
});
