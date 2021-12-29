import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConditionTable from "../components/table/ConditionTable";
import { RootState } from "../modules";
import { LoadAction, RemoveAction } from "../modules/condition";
import { conditionType } from "../types/types";

const TableContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let items = localStorage.getItem("conditionItems");
        if (items) {
            const itemToJson: conditionType[] = JSON.parse(
                items
            ) as conditionType[];
            dispatch(LoadAction(itemToJson));
        }
    }, []);

    const { conditionItems } = useSelector(
        (state: RootState) => state.conditionReducer
    );

    const onRemove = (selectionModel: any[]) => {
        dispatch(RemoveAction(selectionModel));
    };

    return (
        <Grid container style={{ marginTop: "20px" }}>
            <ConditionTable items={conditionItems} onRemove={onRemove} />
        </Grid>
    );
};

export default TableContainer;
