import { ChangeEvent, useCallback, useEffect, useState } from "react";
import calcWordsPerMinute from "../utils/calcWordsPerMinute";
import calcTypingAccuracy from "../utils/calculateTypingAccuracy";

export interface TypedResults {
  words: string[];
  enteredText: string;
  wordsPerMinute: number;
  correctCount: number;
  started: boolean;
  onWordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isTestFinsh: boolean;
  resetTrial: () => void;
  accuracy: number;
}

const useTypeTrial = (): TypedResults => {
  const [typeTest] = useState("This is the sentence to type");
  const [words, setWords] = useState(typeTest.split(" "));
  const [enteredText, setEnteredText] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [charCorrectCount, setCharCorrectCount] = useState(0);

  const onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const typedTextCurr = e.currentTarget.value;
    if (!started) {
      setStarted(true);
      setStartTime(new Date());
    }
    handleAccuracy(typedTextCurr);

    const typedText = e.currentTarget.value.trim();
    setEnteredText(typedText);
    if (typedText === words[0]) {
      const startTrial = new Date();
      const timeMillis = startTime
        ? startTrial.getTime() - startTime.getTime()
        : 0;

      const updatedCorrectCount = (correctCount: number) => correctCount + 1;
      const wpm = calcWordsPerMinute(typeTest.length, timeMillis);

      setCorrectCount(updatedCorrectCount);
      setEnteredText("");
      setWords(words.slice(1));
      setWordsPerMinute(wpm);
    }
  };

  const handleAccuracy = (typedText: string) => {
      const typedLength  = typedText.length;
      setTotalCharacters((char) => char + 1);

      const expectedChar = words[0]?.[typedLength - 1];
      const actualChar = typedText[typedLength - 1];

      if (expectedChar && actualChar === expectedChar) {
        setCharCorrectCount((char) => char + 1);
      }
  };

  const checkFinished = useCallback(() => {
    if (!words.length) {
      if (startTime) {
        const timeMillis: number = new Date().getTime() - startTime.getTime();
        const wpm = calcWordsPerMinute(typeTest.length, timeMillis);
        setWordsPerMinute(wpm);
        setStarted(false);
      }
    }
  }, [words.length, startTime, typeTest]);

  useEffect(() => {
    if (words.length !== 0) return;
    checkFinished();
  }, [words, checkFinished]);

  const isTestFinsh: boolean = words.length === 0;

  const resetTrial = () => {
    setWords(typeTest.split(" "));
    setEnteredText("");
    setCorrectCount(0);
    setWordsPerMinute(0);
    setStarted(false);
    setStartTime(null);
  };

  return {
    words,
    enteredText,
    wordsPerMinute,
    correctCount,
    started,
    onWordChange,
    isTestFinsh,
    resetTrial,
    accuracy: calcTypingAccuracy(charCorrectCount, totalCharacters),
  };
};

export default useTypeTrial;
