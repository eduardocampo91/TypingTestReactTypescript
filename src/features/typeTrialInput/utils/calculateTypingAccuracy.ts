const calcTypingAccuracy = (correctChar: number, totalChars: number) => {
  return totalChars > 0 ? Math.round((correctChar / totalChars) * 100): 100;
};

export default calcTypingAccuracy;
