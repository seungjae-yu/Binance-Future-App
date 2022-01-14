import { useDispatch, useSelector } from "react-redux";
import SlowKConditionItem from "../../components/condition/SlowKConditionItem";
import { RootState } from "../../modules";
import { CreateAction } from "../../modules/condition";
import { conditionType } from "../../types/types";

const SlowKConditionItemContainer = () => {
    const { conditionItems } = useSelector(
        (state: RootState) => state.conditionReducer
    );

    const dispatch = useDispatch();

    const onItemAdd = (item: conditionType) => {
        dispatch(CreateAction(item));
    };

    return (
        <SlowKConditionItem
            onItemAdd={onItemAdd}
            conditionItems={conditionItems}
        />
    );
};

export default SlowKConditionItemContainer;
