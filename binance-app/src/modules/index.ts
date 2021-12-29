import { combineReducers } from "redux";
import { conditionReducer, ConditionState } from "./condition";

export interface StoreState{
    conditionReducer : ConditionState
}

const rootReducer = combineReducers<StoreState>({
    conditionReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;