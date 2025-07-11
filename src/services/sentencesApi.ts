export const fetchSentences = async () => {
  const response = await fetch("http://localhost:3000/wordsets");
  if (!response.ok) throw new Error("Failed to fetch");

  const data = await response.json();
  const randomSet = data[Math.floor(Math.random() * data.length)];
  return randomSet.text;
};