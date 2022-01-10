import { IconButton, Divider, Drawer } from "@material-ui/core";
import { FilterList, TrendingUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useEffect } from "react";
import SlowKConditionItemContainer from "../../container/slowk/SlowKConditionItemContainer";
import { LoadAction as LoadCondition } from "../../modules/condition";
import { LoadAction as LoadMovingAvg } from "../../modules/movingAvg";
import { conditionType, movingAvgType } from "../../types/types";
import { useDispatch } from "react-redux";
import MovingAverageTableContainer from "../../container/movingAvg/MovingAverageTableContainer";
import FilterTableContainer from "../../container/slowk/FilterTableContainer";
import MovingAvgItemContainer from "../../container/movingAvg/MovingAvgItemContainer";

interface Props {
    value: string;
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const useStyles = makeStyles({
    list: {
        width: 1350,
    },
    fullList: {
        width: "auto",
    },
});

type Anchor = "filter" | "moving";

const ShowCondition = ({ value, handleChange }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        filter: false,
        moving: false,
    });

    useEffect(() => {
        let conditionItems = localStorage.getItem("conditionItems");
        if (conditionItems) {
            const itemToJson: conditionType[] = JSON.parse(
                conditionItems
            ) as conditionType[];
            dispatch(LoadCondition(itemToJson));
        }

        let movingAvgItems = localStorage.getItem("movingAvgItems");
        if (movingAvgItems) {
            const itemToJson: movingAvgType[] = JSON.parse(
                movingAvgItems
            ) as movingAvgType[];
            dispatch(LoadMovingAvg(itemToJson));
        }
    }, []);

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false,
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, true)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            {anchor === "filter" ? (
                <div>
                    <SlowKConditionItemContainer />
                    <FilterTableContainer />
                </div>
            ) : (
                <div>
                    <MovingAvgItemContainer />
                    <MovingAverageTableContainer />
                </div>
            )}
            <Divider />
        </div>
    );

    return (
        <div>
            {(["filter", "moving"] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        {anchor === "filter" ? (
                            <FilterList fontSize={"large"} />
                        ) : (
                            <TrendingUp fontSize={"large"} />
                        )}
                    </IconButton>
                    <Drawer
                        anchor={"left"}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};

export default ShowCondition;
