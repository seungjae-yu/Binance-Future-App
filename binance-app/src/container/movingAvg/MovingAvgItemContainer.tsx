import React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import MovingAvgItem from "../../components/movingAvg/MovingAvgItem";
import { CreateAction } from "../../modules/movingAvg";
import { movingAvgType } from "../../types/types";

const MovingAvgItemContainer = () => {
    const dispatch = useDispatch();

    const onItemAdd = useCallback(
        (item: movingAvgType) => {
            dispatch(CreateAction(item));
        },
        [dispatch]
    );

    return <MovingAvgItem onItemAdd={onItemAdd} />;
};

export default React.memo(MovingAvgItemContainer);
