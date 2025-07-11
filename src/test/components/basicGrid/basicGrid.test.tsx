import "@testing-library/jest-dom";
import { render, RenderResult, screen } from "@testing-library/react";
import BasicGrid from "../../../components/basicGrid/basicGrid";

const colDefs = [
  { field: "name", headerName: "Name" },
  { field: "email", headerName: "Email" },
];
const rowData = [
  { name: "John Doe", email: "john@email.com" },
  { name: "Jane Doe", email: "jane@email.com" },
];

describe("Basic grid test", () => {
  let component: RenderResult;

  it("should render the basic grid with the given column definitions and data", async () => {
    component = render(<BasicGrid colDefs={colDefs} rowData={rowData} />);
    
    const grid = await screen.findByRole("grid");
    expect(grid).toBeInTheDocument();

    const rowName = screen.getByRole("row", { name: /Name Email/i });
    expect(rowName).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);
  });
});
