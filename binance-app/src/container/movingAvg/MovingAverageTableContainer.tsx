import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovingAverageTable from "../../components/table/MovingAverageTable";
import { RootState } from "../../modules";
import { RemoveAction } from "../../modules/movingAvg";

const MovingAverageTableContainer = () => {
    const dispatch = useDispatch();

    const { movingAvgItems } = useSelector(
        (state: RootState) => state.movingAvgReducer
    );

    const onRemove = (selectionModel: any[]) => {
        dispatch(RemoveAction(selectionModel));
    };

    return (
        <Grid container style={{ marginTop: "20px", marginBottom: "45px" }}>
            <MovingAverageTable items={movingAvgItems} onRemove={onRemove} />
        </Grid>
    );
};

export default MovingAverageTableContainer;
