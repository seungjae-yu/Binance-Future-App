import { IconButton, Divider, Drawer, Tooltip } from "@material-ui/core";
import { FilterList, Save, TrendingUp, Call } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useCallback, useEffect } from "react";
import SlowKConditionItemContainer from "../../container/slowk/SlowKConditionItemContainer";
import { LoadAction as LoadCondition } from "../../modules/condition";
import { LoadAction as LoadMovingAvg } from "../../modules/movingAvg";
import { LoadAction as LoadSearchList } from "../../modules/searchList";
import { conditionType, movingAvgType } from "../../types/types";
import { useDispatch } from "react-redux";
import MovingAverageTableContainer from "../../container/movingAvg/MovingAverageTableContainer";
import FilterTableContainer from "../../container/slowk/FilterTableContainer";
import MovingAvgItemContainer from "../../container/movingAvg/MovingAvgItemContainer";
import SaveSearchListTableContainer from "../../container/saveList/SaveSearchListTableContainer";
import { SearchListItem } from "../../modules/searchList";
import Title from "../Title";
import TelegramInfoContainer from "../../container/telegram/TelegramInfoContainer";

type Anchor = "filter" | "moving" | "db" | "telegram";

const ShowCondition = () => {
    const useStyles = makeStyles({
        list: {
            width: 1350,
        },
        fullList: {
            width: "auto",
        },
        paper: {
            // backgroundColor: "#c8d8e4",
        },
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        filter: false,
        moving: false,
        db: false,
        telegram: false,
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

        let saveSearchList = localStorage.getItem("saveSearchLists");
        if (saveSearchList) {
            const itemToJSON: SearchListItem[] = JSON.parse(
                saveSearchList
            ) as SearchListItem[];
            dispatch(LoadSearchList(itemToJSON));
        }
    }, [dispatch]);

    const toggleDrawer = useCallback(
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
            },
        [state]
    );

    const list = useCallback(
        (anchor: Anchor) => (
            <div
                className={clsx(classes.list, {
                    [classes.fullList]: false,
                })}
                role="presentation"
            >
                {anchor === "filter" ? (
                    <div>
                        <Title title={"Stochastic"} />
                        <SlowKConditionItemContainer />
                        <FilterTableContainer />
                    </div>
                ) : anchor === "moving" ? (
                    <div>
                        <Title title={"Moving Average"} />
                        <MovingAvgItemContainer />
                        <MovingAverageTableContainer />
                    </div>
                ) : anchor === "db" ? (
                    <div>
                        <Title title={"Saved Search List"} />
                        <SaveSearchListTableContainer />
                    </div>
                ) : (
                    <div>
                        <Title title={"Telegram Info"} />
                        <TelegramInfoContainer />
                    </div>
                )}
                <Divider />
            </div>
        ),
        [classes]
    );

    return (
        <div>
            {(["filter", "moving", "db", "telegram"] as Anchor[]).map(
                (anchor) => (
                    <React.Fragment key={anchor}>
                        <IconButton onClick={toggleDrawer(anchor, true)}>
                            {anchor === "filter" ? (
                                <Tooltip
                                    title="???????????????"
                                    placement="left"
                                    arrow
                                >
                                    <FilterList fontSize={"large"} />
                                </Tooltip>
                            ) : anchor === "moving" ? (
                                <Tooltip
                                    title="???????????????"
                                    placement="left"
                                    arrow
                                >
                                    <TrendingUp fontSize={"large"} />
                                </Tooltip>
                            ) : anchor === "db" ? (
                                <Tooltip
                                    title="?????? ?????????"
                                    placement="left"
                                    arrow
                                >
                                    <Save fontSize={"large"} />
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    title="???????????? ??????"
                                    placement="left"
                                    arrow
                                >
                                    <Call fontSize={"large"} />
                                </Tooltip>
                            )}
                        </IconButton>
                        <Drawer
                            classes={{ paper: classes.paper }}
                            anchor={"left"}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                )
            )}
        </div>
    );
};

export default React.memo(ShowCondition);
