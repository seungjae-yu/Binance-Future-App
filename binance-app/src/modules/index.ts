import { combineReducers } from "redux";
import { conditionReducer, ConditionState } from "./condition";
import { movingAvgReducer, MovingAvgState } from "./movingAvg";
import { resultReducer, ResultState } from "./result";
import { searchListRedurcer, SearchListState } from "./searchList";

export interface StoreState {
    conditionReducer: ConditionState,
    resultReducer: ResultState,
    movingAvgReducer : MovingAvgState,
    searchListRedurcer : SearchListState
}

const rootReducer = combineReducers<StoreState>({
    conditionReducer, resultReducer, movingAvgReducer, searchListRedurcer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;