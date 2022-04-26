import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ResultTable from "../../components/table/ResultTable";
import { RootState } from "../../modules";

const ResultTableContainer = () => {
    const { resultItems } = useSelector(
        (state: RootState) => state.resultReducer
    );

    return (
        <Grid container style={{ marginTop: "20px" }}>
            <ResultTable items={resultItems} />
        </Grid>
    );
};

export default React.memo(ResultTableContainer);
