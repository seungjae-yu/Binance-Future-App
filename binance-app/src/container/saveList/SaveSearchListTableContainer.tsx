import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveSearchListTable from "../../components/table/SaveSearchListTable";
import { RootState } from "../../modules";
import { RemoveAction } from "../../modules/searchList";

const SaveSearchListTableContainer = () => {
    const { searchListItems } = useSelector(
        (state: RootState) => state.searchListRedurcer
    );

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem(
            "saveSearchLists",
            JSON.stringify(searchListItems)
        );
    }, [searchListItems]);

    const onRemove = useCallback(
        (selectionModel: any[]) => {
            dispatch(RemoveAction(selectionModel));
        },
        [dispatch]
    );

    return (
        <SaveSearchListTable
            items={searchListItems}
            onRemove={onRemove}
            isRemove={true}
        />
    );
};

export default React.memo(SaveSearchListTableContainer);
