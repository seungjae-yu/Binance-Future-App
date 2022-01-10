import React from "react";
import { useDispatch } from "react-redux";
import SlowKConditionItem from "../../components/condition/SlowKConditionItem";
import { CreateAction } from "../../modules/condition";
import { conditionType } from "../../types/types";

const SlowKConditionItemContainer = () => {
    const dispatch = useDispatch();

    const onItemAdd = (item: conditionType) => {
        dispatch(CreateAction(item));
    };

    return <SlowKConditionItem onItemAdd={onItemAdd} />;
};

export default SlowKConditionItemContainer;
