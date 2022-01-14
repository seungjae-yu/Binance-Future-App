import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import SaveSearchListDialog from "../../components/saveListDialog/SaveSearchListDialog";
import SlowKConditionTable from "../../components/table/SlowKConditionTable";
import { RootState } from "../../modules";
import {
    conditionItem,
    LoadAction,
    RemoveAction,
} from "../../modules/condition";
import { movingAvgItem } from "../../modules/movingAvg";
import { AddAction, SearchListItem } from "../../modules/searchList";
import { conditionType } from "../../types/types";

const FilterTableContainer = () => {
    const dispatch = useDispatch();

    const { conditionItems } = useSelector(
        (state: RootState) => state.conditionReducer
    );

    // useEffect(() => {
    //     let items = localStorage.getItem("conditionItems");
    //     if (items) {
    //         const itemToJson: conditionType[] = JSON.parse(
    //             items
    //         ) as conditionType[];
    //         dispatch(LoadAction(itemToJson));
    //     }
    // }, []);

    const onRemove = (selectionModel: any[]) => {
        dispatch(RemoveAction(selectionModel));
    };

    const addListItem = (
        list: (movingAvgItem | conditionItem)[],
        itemName: string
    ) => {
        const getItem = localStorage.getItem("saveSearchLists");
        console.log(getItem);
        if (getItem) {
            const searchList = JSON.parse(getItem) as SearchListItem[];
            searchList.push({
                id: searchList.length + 1,
                name: itemName,
                searchList: list,
                type: "스토캐스틱",
                period: list[0].period,
            });
            dispatch(
                AddAction({
                    searchList: list,
                    name: itemName,
                    type: "스토캐스틱",
                    period: list[0].period,
                })
            );
            console.log(searchList);
            localStorage.setItem("saveSearchLists", JSON.stringify(searchList));
        }
    };

    const importItem = (item: SearchListItem[]) => {
        if (item) {
            const data = item[0].searchList as conditionType[];
            dispatch(LoadAction(data));
        }
    };

    return (
        <Grid container style={{ marginTop: "20px", marginBottom: "45px" }}>
            <SaveSearchListDialog
                list={conditionItems}
                addListItem={addListItem}
                importItem={importItem}
                importType={"스토캐스틱"}
            />
            <SlowKConditionTable items={conditionItems} onRemove={onRemove} />
        </Grid>
    );
};

export default FilterTableContainer;
