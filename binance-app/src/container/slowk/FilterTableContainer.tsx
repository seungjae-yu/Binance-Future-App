import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlowKConditionTable from "../../components/table/SlowKConditionTable";
import { RootState } from "../../modules";
import { LoadAction, RemoveAction } from "../../modules/condition";
import { conditionType } from "../../types/types";

const FilterTableContainer = () => {
    const dispatch = useDispatch();

    const { conditionItems } = useSelector(
        (state: RootState) => state.conditionReducer
    );

    // useEffect(() => {
    //     let items = localStorage.getItem("conditionItems");
    //     if (items) {
    //         const itemToJson: conditionType[] = JSON.parse(
    //             items
    //         ) as conditionType[];
    //         dispatch(LoadAction(itemToJson));
    //     }
    // }, []);

    const onRemove = (selectionModel: any[]) => {
        dispatch(RemoveAction(selectionModel));
    };

    return (
        <Grid container style={{ marginTop: "20px", marginBottom: "45px" }}>
            <SlowKConditionTable items={conditionItems} onRemove={onRemove} />
        </Grid>
    );
};

export default FilterTableContainer;
