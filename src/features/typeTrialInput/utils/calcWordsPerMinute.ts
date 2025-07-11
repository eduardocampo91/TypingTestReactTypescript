const calcWordsPerMinute = (charsTyped: number, millis: number): number =>
  Math.floor(charsTyped / 5 / (millis / 60000));

export default calcWordsPerMinute;
