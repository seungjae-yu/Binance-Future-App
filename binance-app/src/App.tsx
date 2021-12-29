import React from "react";
import { createGlobalStyle } from "styled-components";
import GlobalTemplate from "./components/GlobalTemplate";
import Monitoring from "./components/monitoring/Monitoring";
import Title from "./components/Title";
import ConditionItemContainer from "./container/ConditionItemContainer";
import TableContainer from "./container/TableContainer";

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
                <TableContainer />
                <Monitoring />
            </GlobalTemplate>
        </div>
    );
};

export default App;
