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

    it("should render the Restart button as disabled when no input has been typed", () => {
      (useTypeTrial as jest.Mock).mockReturnValue({
        words: ["This", "is", "the", "sentence", "to", "type"],
        enteredText: "",
        wordsPerMinute: 0,
        correctCount: 0,
        onWordChange: jest.fn(),
      });

      component = render(<TypeTrial />);

      const restartButton = screen.getByRole("button", {
        name: /restart/i,
      });
      expect(restartButton).toBeInTheDocument();
      expect(restartButton).toBeDisabled();
    });
  });

  describe("TypeTrial functionality", () => {
    const onWordChangeMock = jest.fn();

    it("should start typing and progress with onWordChange when a word is entered", () => {
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

    it("should progress with the trial when a correct word is entered", () => {
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

    it("should enable the Restart button when user starts typing", () => {
      (useTypeTrial as jest.Mock).mockReturnValue({
        words: ["is", "the", "sentence", "to", "type"],
        enteredText: "",
        wordsPerMinute: 0,
        correctCount: 1,
        started: true,
      });

      component = render(<TypeTrial />);

      const restartButton = screen.getByRole("button", {
        name: /restart/i,
      });
      expect(restartButton).toBeInTheDocument();
      expect(restartButton).not.toBeDisabled();
    });

    it("should call resetTrial when the Restart button is clicked", () => {
      const mockResetTrial = jest.fn();

      (useTypeTrial as jest.Mock).mockReturnValue({
        words: ["is", "the", "sentence", "to", "type"],
        enteredText: "",
        wordsPerMinute: 0,
        correctCount: 1,
        started: true,
        resetTrial: mockResetTrial,
      });

      component = render(<TypeTrial />);

      const restartButton = screen.getByRole("button", {
        name: /restart/i,
      });

      fireEvent.click(restartButton);

      component.rerender(<TypeTrial />);

      expect(mockResetTrial).toHaveBeenCalled();
    });

    describe("TypeTrial: finished trial", () => {
      const mockResetTrial = jest.fn();

      beforeEach(() => {
        (useTypeTrial as jest.Mock).mockReturnValue({
          words: [],
          enteredText: "",
          wordsPerMinute: 60,
          correctCount: 6,
          isTestFinsh: true,
          onWordChange: onWordChangeMock,
          resetTrial: mockResetTrial,
        });
      });
      it("should show results in screen after entering the complete and correct sentence", () => {
        component = render(<TypeTrial />);

        const finalScore = "You typed 6 words at 60 WPM.";
        const scoreHeading = screen.queryByText(finalScore);
        expect(scoreHeading).toBeInTheDocument();
      });

      it("should hide the input and when the trial is finish", () => {
        component = render(<TypeTrial />);

        const input = screen.queryByRole("textbox");
        expect(input).toBeNull();
      });

      it("should show the Refresh!! button when the trial is finish", () => {
        component = render(<TypeTrial />);

        const refreshButton = screen.getByRole("button", {
          name: /refresh/i,
        });
        expect(refreshButton).toBeInTheDocument();
      });

      it("should show the input again after clicking the Refresh!! button", () => {
        component = render(<TypeTrial />);

        const refreshButton = screen.getByRole("button", {
          name: /refresh/i,
        });
        fireEvent.click(refreshButton);

        (useTypeTrial as jest.Mock).mockReturnValue({
          words: ["This"],
          enteredText: "",
          wordsPerMinute: 0,
          correctCount: 0,
          isTestFinsh: false,
          onWordChange: jest.fn(),
          resetTrial: jest.fn(),
        });

        component.rerender(<TypeTrial />);

        const input = screen.queryByRole("textbox");
        expect(input).toBeInTheDocument();
      });

      it("should call resetTrial when the Refresh!! button is clicked", () => {
        component = render(<TypeTrial />);

        const refreshButton = screen.getByRole("button", {
          name: /refresh/i,
        });

        fireEvent.click(refreshButton);

        component.rerender(<TypeTrial />);

        expect(mockResetTrial).toHaveBeenCalled();
      });
    });
  });
});
