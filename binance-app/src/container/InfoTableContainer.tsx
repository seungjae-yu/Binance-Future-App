import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConditionTable from "../components/table/ConditionTable";
import InfoTable from "../components/table/InfoTable";
import { RootState } from "../modules";
import { LoadAction, RemoveAction } from "../modules/condition";
import { conditionType } from "../types/types";

const InfoTableContainer = () => {
    const { conditionItems } = useSelector(
        (state: RootState) => state.conditionReducer
    );

    return (
        <Grid container style={{ marginTop: "20px" }}>
            <InfoTable items={conditionItems} />
        </Grid>
    );
};

export default InfoTableContainer;
