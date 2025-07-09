import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import TypeTrial from "../../../components/typeTrialInput/typeTrial";
import useTypeTrial from "../../../components/typeTrialInput/hooks/useTypeTrial";

jest.mock("../../../components/typeTrialInput/hooks/useTypeTrial");

describe("TypeTrial tests", () => {
  let component: RenderResult;

  describe("Render components", () => {
    it("TypeTrial should render and contains the heading", () => {
      (useTypeTrial as jest.Mock).mockReturnValue({
        words: ["This", "is", "the", "sentence", "to", "type"],
        enteredText: "",
        wordsPerMinute: 0,
        correctCount: 0,
        onWordChange: jest.fn(),
      });

      component = render(<TypeTrial />);

      const headingText = "Test Your Typing Speed, Scrub!";
      const heading = screen.queryByText(headingText);
      expect(heading).toBeInTheDocument();
    });

    it("should render and contains the sub heading when done typing", () => {
      (useTypeTrial as jest.Mock).mockReturnValue({
        words: [],
        enteredText: "",
        wordsPerMinute: 10,
        correctCount: 10,
        onWordChange: jest.fn(),
      });

      component = render(<TypeTrial />);

      const headingText = "Test Your Typing Speed, Scrub!";
      const heading = screen.queryByText(headingText);
      const secondHeadingText = "You typed 10 words at 10 WPM.";
      const secondHeading = screen.queryByText(secondHeadingText);

      expect(heading).not.toBeInTheDocument();
      expect(secondHeading).toBeInTheDocument();
    });

    it("should render the text input", () => {
      component = render(<TypeTrial />);

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });
  });

  describe("TypeTrial functionality", () => {
    const onWordChangeMock = jest.fn();

    it("starts typing and progresses with onWordChange when a word is entered", () => {
      (useTypeTrial as jest.Mock).mockReturnValue({
        words: ["This", "is", "the", "sentence", "to", "type"],
        enteredText: "",
        wordsPerMinute: 0,
        correctCount: 0,
        onWordChange: onWordChangeMock,
      });

      component = render(<TypeTrial />);

      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "Thi" } });

      expect(onWordChangeMock).toHaveBeenCalledWith(expect.any(Object));
    });

    it("progresses a correct word entered", () => {
      (useTypeTrial as jest.Mock).mockReturnValue({
        words: ["This", "is", "the", "sentence", "to", "type"],
        enteredText: "",
        wordsPerMinute: 0,
        correctCount: 0,
        onWordChange: onWordChangeMock,
      });

      component = render(<TypeTrial />);

      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "This " } });

      // mock word accepted

      (useTypeTrial as jest.Mock).mockReturnValueOnce({
        words: ["is", "the", "sentence", "to", "type"],
        enteredText: "",
        wordsPerMinute: 0,
        correctCount: 1,
        onWordChange: onWordChangeMock,
      });
      component.rerender(<TypeTrial />);

      const currentWord = screen.getByText("is");
      expect(currentWord.tagName).toBe("EM");
    });

    it("shows results in screen after entering the complete and correct sentence", () => {
      (useTypeTrial as jest.Mock).mockReturnValue({
        words: [],
        enteredText: "",
        wordsPerMinute: 60,
        correctCount: 6,
        onWordChange: onWordChangeMock,
      });

      component = render(<TypeTrial />);

      const finalScore = "You typed 6 words at 60 WPM.";
      const scoreHeading = screen.queryByText(finalScore);
      expect(scoreHeading).toBeInTheDocument();
    });
  });
});
