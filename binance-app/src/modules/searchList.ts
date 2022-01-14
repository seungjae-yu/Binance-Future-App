import produce from "immer";
import { Interval } from "../components/condition/SlowKConditionItem";
import { conditionType, movingAvgType } from "../types/types";

//1. type
export interface SearchListState {
    searchListItems : SearchListItem[];
}

export interface SearchListItem extends SearchListType {
    id : number;    
}

export interface SearchListType {
    searchList : (conditionType | movingAvgType) [];
    name : string;
    type : '스토캐스틱' | '이동평균선';
    period : Interval;
};

export const LOAD = "list/LOAD";
export const ADD = "list/ADD";
export const REMOVE = "list/REMOVE";

//2. Action
export const LoadAction = (data : SearchListItem[]) => ({type : LOAD, payload : data});
export const AddAction = (data : SearchListType) => ({type: ADD, payload : data});
export const RemoveAction = (items : any[]) => ({type: REMOVE, payload: items});

//3. return Action type
type SearchListActions =
    | ReturnType<typeof LoadAction>
    | ReturnType<typeof AddAction>
    | ReturnType<typeof RemoveAction>;

const initialState : SearchListState = {
    searchListItems : []
};

//4. redurce
export function searchListRedurcer(
    state : SearchListState = initialState,
    action : SearchListActions
) : SearchListState {    
    switch(action.type) {
        case LOAD : {
            return produce(state ,draft => {
                draft.searchListItems = action.payload as SearchListItem[];
            });
        }

        case ADD : {
            return produce(state, draft => {
                const newItem = action.payload as SearchListType;
                const nextItem : SearchListItem = {
                    id : draft.searchListItems.length + 1,
                    name : newItem.name,
                    searchList : newItem.searchList,
                    type : newItem.type,
                    period : newItem.period
                };
                draft.searchListItems.push(nextItem);
            });
        }

        case REMOVE : {
            return produce(state, draft => {
                const selectedIDs = new Set(action.payload as any[]);
                let idx = 0;
                draft.searchListItems = draft.searchListItems.filter((x) => !selectedIDs.has(x.id)).map(m => ({
                    ...m,
                    id : idx++
                }));
            });
        }

        default : 
            return produce(state, draft => draft);
        }
    
}