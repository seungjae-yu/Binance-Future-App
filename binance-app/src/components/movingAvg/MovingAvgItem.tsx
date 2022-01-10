import {
    TextField,
    Grid,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules";
import { compareType, movingAvgType, ValueOf } from "../../types/types";
import { Interval, periodOptions } from "../condition/SlowKConditionItem";

const TodoItemBlock = styled.div`
    display: flex;
    padding-top: 12px;

    padding-left: 12px;
    padding-right: 12px;
    border-bottom: 1px solid #e9ecef;
`;

interface compareOption {
    title: keyof typeof compareType;
    condition: keyof typeof compareType;
}

export enum AvgLine {
    /*
    m -> minutes; h -> hours; d -> days; w -> weeks; M -> months
    */
    "5개" = "5",
    "10개" = "10",
    "20개" = "20",
    "60개" = "60",
    "120개" = "120",
}

interface avgLineOption {
    title: string;
    condition: ValueOf<AvgLine>;
}

const avgLineOptions: avgLineOption[] = Object.entries(AvgLine).map(
    ([title, condition]) => ({ title, condition })
);

const compConditions: compareOption[] = [
    { title: "이상", condition: "이상" },
    { title: "이하", condition: "이하" },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
    })
);

interface Props {
    onItemAdd(item: movingAvgType): void;
}

const MovingAvgItem = ({ onItemAdd }: Props) => {
    const classes = useStyles();

    const { movingAvgItems } = useSelector(
        (state: RootState) => state.movingAvgReducer
    );

    const [period, setPeriod] = useState<Interval>(); //주기
    const [count, setCount] = useState<AvgLine>(); //찾는 개수
    const [compareLine, setCompareLine] = useState<AvgLine>();
    const [compareCond, setCompareCond] = useState();

    const handleChangePeriod = (event: any, value: any) => {
        if (value) {
            setPeriod(value.condition);
        }
    };

    const handleChangeCount = (event: any, value: any) => {
        if (value) {
            setCount(value.condition);
        }
    };

    const handleChangeCompareLine = (event: any, value: any) => {
        if (value) {
            setCompareLine(value.condition);
        }
    };

    const handleChangeComp = (event: any, value: any) => {
        setCompareCond(value?.condition || undefined);
    };

    const onClickAdd = () => {
        let item: movingAvgType = {
            period: period,
            findCount: count,
            compareVal: compareLine,
            compareCond: compareCond || "이상",
        };
        onItemAdd(item);
    };

    const onClickSave = () => {
        const result = window.confirm("테이블의 정보를 저장하시겠습니까?");
        if (result) {
            localStorage.setItem(
                "movingAvgItems",
                JSON.stringify(movingAvgItems)
            );
            alert("정보를 저장했습니다.");
        }
    };

    return (
        <TodoItemBlock className={classes.root}>
            <Grid container spacing={2} direction="row">
                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={periodOptions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 180 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="주기"
                                variant="outlined"
                            />
                        )}
                        onChange={(event, value) =>
                            handleChangePeriod(event, value)
                        }
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={avgLineOptions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 180 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="대상 평균선"
                                variant="outlined"
                            />
                        )}
                        onChange={(event, value) =>
                            handleChangeCount(event, value)
                        }
                    />
                </Grid>

                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={avgLineOptions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 180 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="비교 평균선"
                                variant="outlined"
                            />
                        )}
                        onChange={(event, value) =>
                            handleChangeCompareLine(event, value)
                        }
                    />
                </Grid>

                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={compConditions}
                        getOptionLabel={(option) => option.title?.toString()}
                        style={{ width: 120 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="비교조건"
                                variant="outlined"
                            />
                        )}
                        onChange={(event, value) =>
                            handleChangeComp(event, value)
                        }
                    />
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        color={"primary"}
                        onClick={onClickAdd}
                    >
                        추가
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#DDD1C7" }}
                        onClick={onClickSave}
                    >
                        저장
                    </Button>
                </Grid>
            </Grid>
        </TodoItemBlock>
    );
};

export default MovingAvgItem;
