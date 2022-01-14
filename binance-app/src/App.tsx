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

const App = () => {
    return (
        // <Grid container spacing={1}>
        //     <Grid item xs={11}>
        <div style={{ display: "flex" }}>
            <GlobalStype />
            <div style={{ width: "97%" }}>
                <Title
                    title={"Binance Future App"}
                    backgroundColor={"#2b6777"}
                />
                <GlobalTemplate>
                    <ResultTableContainer />
                    <MonitoringContainer />
                </GlobalTemplate>
            </div>
            <div style={{ width: "3%", backgroundColor: "#c8d8e4" }}>
                <RightSideTemplate>
                    <ShowConditionContainer />
                </RightSideTemplate>
            </div>
        </div>
    );
};

export default App;
