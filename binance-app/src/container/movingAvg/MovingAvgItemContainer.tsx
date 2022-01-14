import { useDispatch } from "react-redux";
import MovingAvgItem from "../../components/movingAvg/MovingAvgItem";
import { CreateAction } from "../../modules/movingAvg";
import { movingAvgType } from "../../types/types";

const MovingAvgItemContainer = () => {
    const dispatch = useDispatch();

    const onItemAdd = (item: movingAvgType) => {
        dispatch(CreateAction(item));
    };

    return <MovingAvgItem onItemAdd={onItemAdd} />;
};

export default MovingAvgItemContainer;
