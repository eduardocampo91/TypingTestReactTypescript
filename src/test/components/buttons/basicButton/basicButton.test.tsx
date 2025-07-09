import "@testing-library/jest-dom";
import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import BasicButton from "../../../../components/buttons/basicButton/basicButton";

describe("Basic button test", () => {
  let component: RenderResult;

  it("should render basic button with props", () => {
    const textInButton = "Reusable button";

    component = render(
      <BasicButton onHandleCilck={jest.fn()} label={textInButton} />
    );

    expect(screen.getByText(textInButton)).toBeInTheDocument();
  });

  it("should call the onHandleCilck given function", () => {
    const handlerFunction = jest.fn();
    const textInButton = "Reusable button";

    component = render(
      <BasicButton onHandleCilck={handlerFunction} label={textInButton} />
    );

    fireEvent.click(screen.getByRole("button", { name: textInButton }));
    
    expect(handlerFunction).toHaveBeenCalledTimes(1);
  });
});
