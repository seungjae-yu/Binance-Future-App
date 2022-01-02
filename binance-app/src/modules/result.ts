import produce from 'immer';
import { resultType } from '../types/types';

//1. Type
export interface ResultState {
    resultItems: resultItem[];
}

export interface resultItem extends resultType {
    id: number
}

export const LOAD = "result/LOAD";

//2. Action
export const LoadAction = (data: resultItem[]) => ({ type: LOAD, payload: data });
//return types
type ResultActions =
    | ReturnType<typeof LoadAction>;

const initialState: ResultState = {
    resultItems: []
};

//3. reducer
export function resultReducer(
    state: ResultState = initialState,
    action: ResultActions
): ResultState {
    switch (action.type) {
        case LOAD: {
            return produce(state, draft => {
                draft.resultItems = action.payload as resultItem[];
            });
        }

        default:
            return produce(state, draft => { });
    }
}