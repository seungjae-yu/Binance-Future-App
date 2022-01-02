import React, { useState } from "react";
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
} from "@material-ui/data-grid";
import { resultType } from "../../types/types";

interface Props {
    items: resultType[];
}

const InfoTable = ({ items }: Props) => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "symbol", headerName: "Symbol", width: 300 },
        // {
        //     field: "slowK",
        //     headerName: "slow %K",
        //     description: "slow k",
        //     sortable: false,
        //     width: 200,
        // },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <div>Result Table</div>
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default InfoTable;