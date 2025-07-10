import "@testing-library/jest-dom";
import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import BasicButton from "../../../../components/buttons/basicButton/basicButton";

describe("Basic button test", () => {
  let component: RenderResult;
  const handlerFunction = jest.fn();

  it("should render basic button with props", () => {
    const textInButton = "Reusable button";

    component = render(
      <BasicButton onHandleCilck={handlerFunction} label={textInButton} disabled={false}/>
    );

    expect(screen.getByText(textInButton)).toBeInTheDocument();
  });

  it("should call the onHandleCilck given function", () => {
    const textInButton = "Reusable button";

    component = render(
      <BasicButton onHandleCilck={handlerFunction} label={textInButton} />
    );

    fireEvent.click(screen.getByRole("button", { name: textInButton }));
    
    expect(handlerFunction).toHaveBeenCalledTimes(1);
  });

  it("should render basic button as disabled when prop disabled set to true", () => {
    const textInButton = "Reusable button";

    component = render(
      <BasicButton
        onHandleCilck={handlerFunction}
        label={textInButton}
        disabled={true}
      />
    );

    expect(screen.getByText(textInButton)).toBeDisabled();
  });
});
