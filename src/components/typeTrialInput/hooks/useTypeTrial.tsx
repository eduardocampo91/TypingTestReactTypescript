import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import calcWordsPerMinute from "../utils/calcWordsPerMinute";
import calcTypingAccuracy from "../utils/calculateTypingAccuracy";
import calculateScore from "../utils/calculateScore";

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
  score: number;
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
  const [firstStrikeTotal, setFirstStrikeTotal] = useState(0);
  const [firstStrikeCorrect, setFirstStrikeCorrect] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const prevTypedLength = useRef(0);

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
    if (typedLength > prevTypedLength.current) {
      setFirstStrikeTotal((count) => count + 1);
      if (expectedChar && actualChar === expectedChar) {
        setFirstStrikeCorrect((count) => count + 1);
      }
    }

    prevTypedLength.current = typedLength;
  };

  const checkFinished = useCallback(() => {
    if (!words.length) {
      if (startTime) {
        const timeMillis: number = new Date().getTime() - startTime.getTime();
        const wpm = calcWordsPerMinute(typeTest.length, timeMillis);

        const accuracy = calcTypingAccuracy(charCorrectCount, totalCharacters);
        const firstStrikeAccuracy = calcTypingAccuracy(
          firstStrikeCorrect,
          firstStrikeTotal
        );

        const wordCount = correctCount;

        const calculated = calculateScore(
          wordCount,
          wpm,
          accuracy / 100,
          firstStrikeAccuracy / 100
        );
        
        setFinalScore(calculated);
        setWordsPerMinute(wpm);
        setStarted(false);
      }
    }
  }, [
    words.length,
    startTime,
    typeTest,
    correctCount,
    charCorrectCount,
    totalCharacters,
    firstStrikeCorrect,
    firstStrikeTotal,
  ]);

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
    setFinalScore(0);
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
    score: finalScore,
  };
};

export default useTypeTrial;
