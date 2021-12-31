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
    onRemove(selectedItems: any[]): void;
}

const ConditionTable = ({ items, onRemove }: Props) => {
    const [selectionModel, setSelectionModel] = useState<any[]>([]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "period",
            headerName: "주기",
            width: 150,
            editable: true,
        },
        // {
        //     field: "candle",
        //     headerName: "봉전 기준",
        //     width: 150,
        //     editable: true,
        // },
        {
            field: "findCount",
            headerName: "조회 개수",
            // type: "number",
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
        {
            field: "nm",
            headerName: "(N,M)",
            description: "slow, fast를 계산하는 N과 M변수입니다.",
            sortable: false,
            width: 160,
            editable: false,
            valueGetter: (params: GridValueGetterParams) =>
                `(${params.getValue(params.id, "N") || ""}, 
                 ${params.getValue(params.id, "M" || "")})`,
        },
        {
            field: "condition",
            headerName: "조건 상세 내용",
            description: "필터링 할 조건의 상세 내용입니다.",
            sortable: false,
            width: 800,
            editable: false,
            valueGetter: (params: GridValueGetterParams) =>
                `[${params.getValue(params.id, "period") || ""}] 
                 Stochastic slow(${params.getValue(
                     params.id,
                     "findCount" || ""
                 )}, ${params.getValue(
                    params.id,
                    "slowK" || ""
                )}, ${params.getValue(
                    params.id,
                    "slowD" || ""
                )}) 에서 ${params.getValue(
                    params.id,
                    "filter" || ""
                )}가 ${params.getValue(
                    params.id,
                    "compareVal"
                )} ${params.getValue(params.id, "compareCond")}`,
        },
        {
            field: "delete",
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
                return (
                    <IconButton
                        onClick={() => {
                            onRemove(selectionModel);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <div>Filter Table</div>
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(ids) => {
                    setSelectionModel(ids);
                }}
            />
        </div>
    );
};

export default ConditionTable;
