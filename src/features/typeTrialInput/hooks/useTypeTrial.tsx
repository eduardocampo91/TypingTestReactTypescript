import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import calcWordsPerMinute from "../utils/calcWordsPerMinute";
import calcTypingAccuracy from "../utils/calculateTypingAccuracy";
import calculateScore from "../utils/calculateScore";
import { useScoreContext } from "../../../contexts/scoresContext";
import { fetchSentences } from "../../../services/sentencesApi";

export interface TypedResults {
  words: string[];
  enteredText: string;
  wordsPerMinute: number;
  correctCount: number;
  started: boolean;
  onWordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isTestFinsh: boolean;
  resetTrial: () => void;
  trialAccuracy: number;
  finalScore: number;
}

const useTypeTrial = (): TypedResults => {
  const [typeTest, setTypeTest] = useState("Loading test...");
  const [words, setWords] = useState<string[]>([]);
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
  const [trialAccuracy, settrialAccuracy] = useState(0);

  const prevTypedLength = useRef(0);
  const { addScore } = useScoreContext();

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
    const typedLength = typedText.length;
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

        settrialAccuracy(accuracy);
        setFinalScore(calculated);
        setWordsPerMinute(wpm);
        setStarted(false);
        addScore({
          totalScore: calculated,
          wpm: wpm,
          accuracy: accuracy,
          words: correctCount,
        });
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
    const loadWords = async () => {
      try {
        const sentence = await fetchSentences();
        setTypeTest(sentence);
        setWords(sentence.split(" "));
      } catch (error) {
        console.error(
          "Failed to fetch sentence from API. Using fallback.",
          error
        );
        const fallbackSentence = "This is the sentence to type";
        setTypeTest(fallbackSentence);
        setWords(fallbackSentence.split(" "));
      }
    };
    loadWords();
  }, []);

  useEffect(() => {
    if (words.length !== 0) return;
    checkFinished();
  }, [words, checkFinished]);

  useEffect(() => {
    const newAccuracy = calcTypingAccuracy(charCorrectCount, totalCharacters);
    settrialAccuracy(newAccuracy);
  }, [charCorrectCount, totalCharacters]);

  useEffect(() => {
  console.log("Current Scores:", finalScore);
}, [finalScore]);


  const isTestFinsh: boolean = words.length === 0;

  const resetTrial = async () => {
  try {
    const sentence = await fetchSentences();
    setTypeTest(sentence);
    setWords(sentence.split(" "));
  } catch (error) {
    console.error("Failed to fetch sentence during reset. Using fallback.", error);
    const fallbackSentence = "This is the sentence to type";
    setTypeTest(fallbackSentence);
    setWords(fallbackSentence.split(" "));
  }
    setEnteredText("");
    setCorrectCount(0);
    setWordsPerMinute(0);
    setStarted(false);
    setStartTime(null);
    setFinalScore(0);
    settrialAccuracy(0);
    setTotalCharacters(0);
    setCharCorrectCount(0);
    setFirstStrikeTotal(0);
    setFirstStrikeCorrect(0);
    prevTypedLength.current = 0;
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
    trialAccuracy,
    finalScore,
  };
};

export default useTypeTrial;
