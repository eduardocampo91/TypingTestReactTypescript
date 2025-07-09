import useTypeTrial from "./hooks/useTypeTrial";

const TypeTrial = () => {
  const testedText = "This is the sentence to type";
  const { words, enteredText, wordsPerMinute, correctCount, onWordChange } = useTypeTrial(testedText);

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
      <input name="text" value={enteredText} onChange={onWordChange} />
    </div>
  );
};

export default TypeTrial;