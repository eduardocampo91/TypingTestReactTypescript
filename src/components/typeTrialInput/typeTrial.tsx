import BasicButton from "../buttons/basicButton/basicButton";
import useTypeTrial from "./hooks/useTypeTrial";

const TypeTrial = () => {
  const {
    words,
    enteredText,
    wordsPerMinute,
    correctCount,
    onWordChange,
    isTestFinsh,
    resetTrial,
  } = useTypeTrial();

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
      {!isTestFinsh ? (
        <input name="text" value={enteredText} onChange={onWordChange} />
      ) : null}
      {isTestFinsh ? (
        <BasicButton onHandleCilck={resetTrial} label="Refresh!!"></BasicButton>
      ) : null}
    </div>
  );
};

export default TypeTrial;
