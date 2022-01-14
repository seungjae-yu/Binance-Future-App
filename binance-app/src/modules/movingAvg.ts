import produce from 'immer';
import { movingAvgType } from '../types/types';

//1. Type
export interface MovingAvgState{
    movingAvgItems : movingAvgItem[];
}

export interface movingAvgItem extends movingAvgType {
    id : number
};

export const LOAD = "moving/LOAD";
export const CREATE = "moving/CREATE";
export const REMOVE = "moving/REMOVE";

//2. Action
export const LoadAction = (data : movingAvgType[]) => ({type : LOAD, payload : data});
export const CreateAction = (data : movingAvgType) => ({type:CREATE, payload : data});
export const RemoveAction = (items : any[]) => ({type:REMOVE , payload : items});

//return types
type MovingAvgActions = 
    | ReturnType<typeof LoadAction>
    | ReturnType<typeof CreateAction>
    | ReturnType<typeof RemoveAction>;


const initialState : MovingAvgState = {
    movingAvgItems: []
};

//3. reducer
export function movingAvgReducer(
    state : MovingAvgState = initialState,
    action : MovingAvgActions
) : MovingAvgState {
    switch(action.type) {
        case LOAD : {
            return produce(state ,draft => {
                draft.movingAvgItems = action.payload as movingAvgItem[];
            });
        }
        case CREATE : {
            return produce(state, draft => {
                const nextItem = action.payload as movingAvgItem;
                nextItem.id = draft.movingAvgItems.length + 1;
                draft.movingAvgItems.push(nextItem);
            });
        }

        case REMOVE : {
            return produce(state, draft => {
                const selectedIDs = new Set(action.payload as any[]);
                let idx = 0;
                draft.movingAvgItems = draft.movingAvgItems.filter((x) => !selectedIDs.has(x.id)).map(m => ({
                    ...m,
                    id : idx++
                }));
            });
        }

        default :
            return produce(state,draft=>draft);
    }
}