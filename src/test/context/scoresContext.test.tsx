import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import {
  Score,
  ScoresContext,
  ScoresProvider,
  useScoreContext,
} from "../../contexts/scoresContext";
import React from "react";

const TestComponent = () => {
  const { scores, addScore } = useScoreContext();

  return (
    <>
      <button
        onClick={() =>
          addScore({ words: 50, wpm: 80, accuracy: 100, totalScore: 50 })
        }
      >
        Add Score
      </button>
      {scores.map((score, i) => (
        <>
          <li key={i} data-testid="words">
            {score.words}
          </li>
          <li key={i} data-testid="wpm">
            {score.wpm}
          </li>
          <li key={i} data-testid="accuracy">
            {score.accuracy}
          </li>
          <li key={i} data-testid="totalScore">
            {score.totalScore}
          </li>
        </>
      ))}
    </>
  );
};

describe("ScoresContext test", () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(
      <ScoresProvider>
        <TestComponent />
      </ScoresProvider>
    );
  });

  it("should initialize component", () => {
    const textInButton = "Add Score";
    expect(screen.getByText(textInButton)).toBeInTheDocument();
  });

  it("should add score when calling addScore()", () => {
    const button = screen.getByRole("button", { name: /add score/i });

    act(() => {
      button.click();
    });

    const itemWords = screen.getByTestId("words");
    expect(itemWords.textContent).toContain("50");

    const itemwpm = screen.getByTestId("wpm");
    expect(itemwpm.textContent).toContain("80");

    const itemaccuracy = screen.getByTestId("accuracy");
    expect(itemaccuracy.textContent).toContain("100");

    const itemtotalScore = screen.getByTestId("totalScore");
    expect(itemtotalScore.textContent).toBeTruthy();
  });

  describe("ScoresContext functionality", () => {
    const mockAddScore = jest.fn();

    const mockContextValue = {
      scores: [] as Score[],
      addScore: mockAddScore,
    };

    it("should throw an error if context used without ScoresProvider", () => {
      const NoProviderComponent = () => {
        useScoreContext();
        return null;
      };

      expect(() => render(<NoProviderComponent />)).toThrow(
        "useScoreContext must be used within a ScoresProvider"
      );
    });

    beforeEach(() => {
      const TestComponent = () => {
        const { addScore } = React.useContext(ScoresContext)!;
        return (
          <button
            onClick={() =>
              addScore({ words: 50, wpm: 80, accuracy: 100, totalScore: 50 })
            }
          >
            Trigger
          </button>
        );
      };

      render(
        <ScoresContext.Provider value={mockContextValue}>
          <TestComponent />
        </ScoresContext.Provider>
      );
    });

    it("should call addScore when triggering action", () => {
      const textInButton = "Trigger";
      expect(screen.getByText(textInButton)).toBeInTheDocument();

      const button = screen.getByRole("button", { name: /trigger/i });

      fireEvent.click(button);

      expect(mockAddScore).toHaveBeenCalledTimes(1);
      expect(mockAddScore).toHaveBeenCalledWith({
        words: 50,
        wpm: 80,
        accuracy: 100,
        totalScore: 50,
      });
    });
  });
});
