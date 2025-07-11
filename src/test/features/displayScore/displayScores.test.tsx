import "@testing-library/jest-dom";
import { Score, ScoresContext } from "../../../contexts/scoresContext";
import { render, RenderResult, screen } from "@testing-library/react";
import DisplayScores from "../../../features/displayScores/displayScores";

jest.mock("../../../components/basicGrid/basicGrid", () => {
  return ({ rowData }: { rowData: Score[] }) => (
    <div data-testid="grid">
      {rowData.map((row, index) => (
        <div key={index} data-testid="row">
          {row.totalScore}
        </div>
      ))}
    </div>
  );
});

const mockScore: Score[] = [
  { words: 6, wpm: 90, accuracy: 100, totalScore: 90 },
];
const mockScores: Score[] = [
  { words: 6, wpm: 70, accuracy: 100, totalScore: 70 },
  { words: 2, wpm: 80, accuracy: 100, totalScore: 80 },
  { words: 9, wpm: 60, accuracy: 100, totalScore: 60 },
];

describe("DisplayScores tests", () => {
  let component: RenderResult;

  it("should render the grid when a single score is registrered", () => {
    component = render(
      <ScoresContext.Provider
        value={{ scores: mockScore, addScore: jest.fn() }}
      >
        <DisplayScores />
      </ScoresContext.Provider>
    );
    const rows = screen.getAllByTestId("row");

    expect(screen.getByText(/🏆 Highest Score:/)).toHaveTextContent("90");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent("90");
  });

  it("should render the highest score as 0 when no score is registrered", () => {
    component = render(
      <ScoresContext.Provider value={{ scores: [], addScore: jest.fn() }}>
        <DisplayScores />
      </ScoresContext.Provider>
    );

    expect(screen.getByText(/🏆 Highest Score:/)).toHaveTextContent("0");
  });

  it("should render the grid with all the scores and should show the higthest score of the bunch", () => {
    component = render(
      <ScoresContext.Provider
        value={{ scores: mockScores, addScore: jest.fn() }}
      >
        <DisplayScores />
      </ScoresContext.Provider>
    );
    const rows = screen.getAllByTestId("row");

    expect(screen.getByText(/🏆 Highest Score:/)).toHaveTextContent("80");
    expect(rows).toHaveLength(3);
    expect(rows[2]).toHaveTextContent("60");
  });
});
