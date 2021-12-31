import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import GlobalTemplate from "./components/GlobalTemplate";
import Monitoring from "./components/monitoring/Monitoring";
import InfoTable from "./components/table/InfoTable";
import Title from "./components/Title";
import ConditionItemContainer from "./container/ConditionItemContainer";
import FilterTableContainer from "./container/FilterTableContainer";
import InfoTableContainer from "./container/InfoTableContainer";

const GlobalStype = createGlobalStyle`
    body{
        background: #e9ecef;
    }
`;

const App = () => {
    return (
        <div>
            <GlobalStype />
            <Title />
            <GlobalTemplate>
                <ConditionItemContainer />
                <FilterTableContainer />
                <InfoTableContainer />
                <Monitoring />
            </GlobalTemplate>
        </div>
    );
};

export default App;
