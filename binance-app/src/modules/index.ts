import { combineReducers } from "redux";
import { conditionReducer, ConditionState } from "./condition";
import { resultReducer, ResultState } from "./result";

export interface StoreState {
    conditionReducer: ConditionState,
    resultReducer: ResultState
}

const rootReducer = combineReducers<StoreState>({
    conditionReducer, resultReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;