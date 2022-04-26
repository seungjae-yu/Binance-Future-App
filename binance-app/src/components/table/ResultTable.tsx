import { DataGrid, GridColDef } from "@material-ui/data-grid";
import React from "react";
import { resultType } from "../../types/types";

interface Props {
    items: resultType[];
}

const ResultTable = ({ items }: Props) => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "symbol", headerName: "Symbol", width: 350 },
    ];

    return (
        <div
            style={{
                height: 600,
                width: "100%",
                marginRight: "10px",
                marginLeft: "10px",
            }}
        >
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={100}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default React.memo(ResultTable);
