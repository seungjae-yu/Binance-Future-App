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

    const onRemove = (selectionModel: any[]) => {
        dispatch(RemoveAction(selectionModel));
    };

    return (
        <SaveSearchListTable
            items={searchListItems}
            onRemove={onRemove}
            isRemove={true}
        />
    );
};

export default SaveSearchListTableContainer;
