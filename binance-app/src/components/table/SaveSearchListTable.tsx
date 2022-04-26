import { IconButton } from "@material-ui/core";
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
} from "@material-ui/data-grid";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { SearchListItem } from "../../modules/searchList";
import { utils } from "../../utils/utils";
import React from "react";

interface Props {
    items: SearchListItem[];
    onRemove(selectedItems: any[]): void;
    isRemove: boolean;
    setSelectedItem?(item: any): any;
}

const SaveSearchListTable = ({
    items,
    isRemove,
    onRemove,
    setSelectedItem,
}: Props) => {
    const [selectionModel, setSelectionModel] = useState<any[]>([]);

    let columns: GridColDef[] = [
        {
            field: "name",
            headerName: "이름",
            width: 150,
            editable: true,
        },
        {
            field: "times",
            headerName: "분봉",
            width: 150,
            editable: true,
            valueGetter: (params: GridValueGetterParams) =>
                `${utils.getEnumIntervalByValue(
                    params.getValue(params.id, "period")?.toString() || ""
                )}`,
        },
        {
            field: "type",
            headerName: "타입",
            width: 150,
            editable: true,
        },
    ];

    if (isRemove) {
        columns.push({
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
        });
    }

    const style = {
        height: 400,
        width: "100%",
    };

    return (
        <div style={style}>
            <DataGrid
                rows={items}
                columns={columns}
                checkboxSelection
                hideFooterSelectedRowCount
                selectionModel={selectionModel}
                onSelectionModelChange={(selection) => {
                    if (selection.length > 1) {
                        const selectionSet = new Set(selectionModel);
                        const result = selection.filter(
                            (s) => !selectionSet.has(s)
                        );
                        setSelectionModel(result);
                    } else {
                        setSelectionModel(selection);
                    }

                    if (setSelectedItem) {
                        if (selection) {
                            const arr = selection as number[];
                            console.log(arr[0]);
                            setSelectedItem(
                                items.filter((item) => item.id === arr[0])
                            );
                        } else {
                            setSelectedItem(undefined);
                        }
                    }
                }}
            />
        </div>
    );
};

export default React.memo(SaveSearchListTable);
