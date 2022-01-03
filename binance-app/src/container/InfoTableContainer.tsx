import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import InfoTable from "../components/table/InfoTable";
import { RootState } from "../modules";

const InfoTableContainer = () => {
    const { resultItems } = useSelector(
        (state: RootState) => state.resultReducer
    );

    return (
        <Grid container style={{ marginTop: "20px" }}>
            <InfoTable items={resultItems} />
        </Grid>
    );
};

export default InfoTableContainer;
