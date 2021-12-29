import produce from 'immer';
import { conditionType } from '../types/types';

//1. Type
export interface ConditionState{
    conditionItems : conditionItem[];
}

export interface conditionItem extends conditionType {
    id : number
};

export const LOAD = "cond/LOAD";
export const CREATE = "cond/CREATE";
export const REMOVE = "cond/REMOVE";

//2. Action
export const LoadAction = (data : conditionType[]) => ({type : LOAD, payload : data});
export const CreateAction = (data : conditionType) => ({type:CREATE, payload : data});
export const RemoveAction = (items : any[]) => ({type:REMOVE , payload : items});

//return types
type ConditionActions = 
    | ReturnType<typeof LoadAction>
    | ReturnType<typeof CreateAction>
    | ReturnType<typeof RemoveAction>;


const initialState : ConditionState = {
    conditionItems: []
};

//3. reducer
export function conditionReducer(
    state : ConditionState = initialState,
    action : ConditionActions
) : ConditionState {
    switch(action.type) {
        case LOAD : {
            return produce(state ,draft => {
                draft.conditionItems = action.payload as conditionItem[];
            });
        }
        case CREATE : {
            return produce(state, draft => {
                const nextItem = action.payload as conditionItem;
                nextItem.id = draft.conditionItems.length + 1;
                draft.conditionItems.push(nextItem);
            });
        }

        case REMOVE : {
            return produce(state, draft => {
                const selectedIDs = new Set(action.payload as any[]);
                let idx = 0;
                draft.conditionItems = draft.conditionItems.filter((x) => !selectedIDs.has(x.id)).map(m => ({
                    ...m,
                    id : idx++
                }));
            });
        }

        default :
            return produce(state,draft=>{});
    }
}