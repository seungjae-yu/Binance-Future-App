import React, { useState } from "react";
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
} from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { conditionItem } from "../../modules/condition";

interface Props {
    items: conditionItem[];
}

const InfoTable = ({ items }: Props) => {
    const columns: GridColDef[] = [
        { field: "Symbol", headerName: "Symbol", width: 150 },
        {
            field: "fastK",
            headerName: "fast%K",
            width: 150,
            editable: true,
        },
        {
            field: "slowK",
            headerName: "slow %K",
            description: "slow k",
            sortable: false,
            width: 160,
        },
        {
            field: "slowD",
            headerName: "slow %D",
            description: "slow D",
            sortable: false,
            width: 160,
        },
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
