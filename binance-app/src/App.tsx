import React from "react";
import { createGlobalStyle } from "styled-components";
import GlobalTemplate from "./components/GlobalTemplate";
import RightSideTemplate from "./components/RightSideTemplate";
import Title from "./components/Title";
import MonitoringContainer from "./container/mainPage/MonitoringContainer";
import ResultTableContainer from "./container/mainPage/ResultTableContainer";
import ShowConditionContainer from "./container/mainPage/ShowConditionContainer";

const GlobalStype = createGlobalStyle`
    body{
        background: #c8d8e4;
    }
`;

const AppDivStyle = {
    display: "flex",
};

const MainDivStyle = {
    width: "97%",
};

const DrawDivStyle = {
    width: "3%",
    backgroundColor: "#c8d8e4",
};

const App = () => {
    return (
        <div style={AppDivStyle}>
            <GlobalStype />
            <div style={MainDivStyle}>
                <Title title={"Binance Future App"} />
                <GlobalTemplate>
                    <ResultTableContainer />
                    <MonitoringContainer />
                </GlobalTemplate>
            </div>
            <div style={DrawDivStyle}>
                <RightSideTemplate>
                    <ShowConditionContainer />
                </RightSideTemplate>
            </div>
        </div>
    );
};

export default React.memo(App);
