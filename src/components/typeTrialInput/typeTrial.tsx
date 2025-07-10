import BasicButton from "../buttons/basicButton/basicButton";
import useTypeTrial from "./hooks/useTypeTrial";
import "../../styles/typeTrial.css";

const TypeTrial = () => {
  const {
    words,
    enteredText,
    wordsPerMinute,
    correctCount,
    started,
    onWordChange,
    isTestFinsh,
    resetTrial,
  } = useTypeTrial();

  const handleDisableButton = (): boolean => {
    return !started;
  };

  const currentWord = words[0] || "";
  const isCorrectText: boolean = currentWord.startsWith(enteredText.trim());
  const handleCorrectText =
    enteredText.length === 0
      ? ""
      : isCorrectText
      ? "text-correct"
      : "text-incorrect";

  return (
    <div className="App">
      <h1>
        {wordsPerMinute
          ? `You typed ${correctCount} words at ${wordsPerMinute} WPM.`
          : "Test Your Typing Speed, Scrub!"}
      </h1>
      <h3>
        {wordsPerMinute ? `Refresh to retake the test!` : `Type the following:`}
      </h3>
      <h6>
        {words.map((word: string, index: number) =>
          word === words[0] ? (
            <em className="current-word" key={index}>
              {word}{" "}
            </em>
          ) : (
            word + " "
          )
        )}
      </h6>
      {started ? (
        <div className="char-underline guide-word">
          {currentWord.split("").map((char, idx) => {
            const isNext = idx === enteredText.trim().length;
            return (
              <span key={idx} className={isNext &&  isCorrectText ? "underline-next" : ""}>
                {char}
              </span>
            );
          })}
        </div>
      ) : null}
      {!isTestFinsh ? (
        <input
          name="text"
          value={enteredText}
          onChange={onWordChange}
          className={handleCorrectText}
        />
      ) : null}

      {!isTestFinsh ? (
        <BasicButton
          onHandleCilck={resetTrial}
          label="Restart"
          disabled={handleDisableButton()}
        />
      ) : null}

      {isTestFinsh ? (
        <BasicButton onHandleCilck={resetTrial} label="Refresh!!"></BasicButton>
      ) : null}
    </div>
  );
};

export default TypeTrial;
