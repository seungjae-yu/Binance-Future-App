import { Grid } from "@material-ui/core";
import React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveSearchListDialog from "../../components/saveListDialog/SaveSearchListDialog";
import MovingAverageTable from "../../components/table/MovingAverageTable";
import { RootState } from "../../modules";
import { conditionItem } from "../../modules/condition";
import {
    LoadAction,
    movingAvgItem,
    RemoveAction,
} from "../../modules/movingAvg";
import { AddAction, SearchListItem } from "../../modules/searchList";
import { movingAvgType } from "../../types/types";

const MovingAverageTableContainer = () => {
    const dispatch = useDispatch();

    const { movingAvgItems } = useSelector(
        (state: RootState) => state.movingAvgReducer
    );

    const onRemove = useCallback(
        (selectionModel: any[]) => {
            dispatch(RemoveAction(selectionModel));
        },
        [dispatch]
    );

    const addListItem = useCallback(
        (list: (movingAvgItem | conditionItem)[], itemName: string) => {
            const getItem = localStorage.getItem("saveSearchLists");
            console.log(getItem);
            if (getItem) {
                const searchList = JSON.parse(getItem) as SearchListItem[];
                searchList.push({
                    id: searchList.length + 1,
                    name: itemName,
                    searchList: list,
                    type: "이동평균선",
                    period: list[0].period,
                });
                dispatch(
                    AddAction({
                        searchList: list,
                        name: itemName,
                        type: "이동평균선",
                        period: list[0].period,
                    })
                );
                localStorage.setItem(
                    "saveSearchLists",
                    JSON.stringify(searchList)
                );
            }
        },
        [dispatch]
    );

    const importItem = useCallback(
        (item: SearchListItem[]) => {
            if (item) {
                const data = item[0].searchList as movingAvgType[];
                dispatch(LoadAction(data));
            }
        },
        [dispatch]
    );

    return (
        <Grid container style={{ marginTop: "20px", marginBottom: "45px" }}>
            <SaveSearchListDialog
                list={movingAvgItems}
                addListItem={addListItem}
                importItem={importItem}
                importType={"이동평균선"}
            />
            <MovingAverageTable items={movingAvgItems} onRemove={onRemove} />
        </Grid>
    );
};

export default React.memo(MovingAverageTableContainer);
