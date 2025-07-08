import { ChangeEvent, useCallback, useEffect, useState } from "react";

export interface TypedResults {
  words: string[];
  enteredText: string;
  wordsPerMinute: number;
  correctCount: number;
  onWordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

 const useTypeTest = (text: string): TypedResults => {
  const [typeTest] = useState("This is the sentence to type");
  const [words, setWords] = useState(typeTest.split(" "));
  const [enteredText, setEnteredText] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [wordsPerMinute, setWordsPerMinute] = useState(0);

  const calcWordsPerMinute = (charsTyped: number, millis: number): number =>
    Math.floor(charsTyped / 5 / (millis / 60000));

  const onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!started) {
      setStarted(true);
      setStartTime(new Date());
    }
    const typedText = e.currentTarget.value.trim();
    setEnteredText(typedText);
    if (enteredText === words[0]) {
      setCorrectCount((correctCount) => correctCount + 1);
      setEnteredText("");
      setWords(words.slice(1));
    }
  };

  const checkFinished = useCallback(() => {
    if (!words.length) {
      if (startTime) {
        const timeMillis: number = new Date().getTime() - startTime.getTime();
        const wpm = calcWordsPerMinute(typeTest.length, timeMillis);
        setWordsPerMinute(wpm);
      }
    }
  }, [words.length, startTime, typeTest]);

  useEffect(() => {
    if (words.length !== 0) return;
    checkFinished();
  }, [words, checkFinished]);

  return {
    words,
    enteredText,
    wordsPerMinute,
    correctCount,
    onWordChange,
  };
}

export default useTypeTest;