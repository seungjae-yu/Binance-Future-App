import React from "react";
import { useDispatch } from "react-redux";
import ConditionItem from "../components/condition/ConditionItem";
import { CreateAction } from "../modules/condition";
import { conditionType } from "../types/types";

const ConditionItemContainer = () => {
    const dispatch = useDispatch();

    const onItemAdd = (item: conditionType) => {
        dispatch(CreateAction(item));
    };

    return <ConditionItem onItemAdd={onItemAdd} />;
};

export default ConditionItemContainer;
