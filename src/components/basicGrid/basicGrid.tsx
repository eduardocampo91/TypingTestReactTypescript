import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import "../../styles/basicGrid.css";

ModuleRegistry.registerModules([ AllCommunityModule ]);

interface GridProps {
  colDefs: any;
  rowData: any;
}

const BasicGrid: React.FC<GridProps> = ({ colDefs, rowData }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: "300px", width: "100%", marginTop: "2rem" }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

export default BasicGrid;
