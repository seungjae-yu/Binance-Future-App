import { combineReducers } from "redux";
import { conditionReducer, ConditionState } from "./condition";
import { movingAvgReducer, MovingAvgState } from "./movingAvg";
import { resultReducer, ResultState } from "./result";

export interface StoreState {
    conditionReducer: ConditionState,
    resultReducer: ResultState,
    movingAvgReducer : MovingAvgState
}

const rootReducer = combineReducers<StoreState>({
    conditionReducer, resultReducer, movingAvgReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;