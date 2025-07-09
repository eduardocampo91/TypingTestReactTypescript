import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App tests", () => {
  describe("Render components", () => {
    it("App should render and contains the heading", () => {
      render(<App />);
      const headingText = "Test Your Typing Speed, Scrub!";
      const heading = screen.queryByText(headingText);
      expect(heading).toBeInTheDocument();
    });
  });
});
