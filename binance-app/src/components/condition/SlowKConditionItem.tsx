import {
    TextField,
    Grid,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import styled from "styled-components";
import { conditionItem } from "../../modules/condition";
import { compareType, conditionType, ValueOf } from "../../types/types";

const TodoItemBlock = styled.div`
    display: flex;
    padding-top: 12px;

    padding-left: 12px;
    padding-right: 12px;
    border-bottom: 1px solid #e9ecef;
`;

export enum Interval {
    /*
    m -> minutes; h -> hours; d -> days; w -> weeks; M -> months
    */
    "1분" = "1m",
    "2분" = "2m",
    "3분" = "3m",
    "5분" = "5m",
    "10분" = "10m",
    "15분" = "15m",
    "30분" = "30m",
    "1시간" = "1h",
    "2시간" = "2h",
    "4시간" = "4h",
    "6시간" = "6h",
    "8시간" = "8h",
    "12시간" = "12h",
    "1일" = "1d",
    "3일" = "3d",
    "1주" = "1w",
    "1달" = "1M",
}

interface filterOption {
    title: "slow %K" | "slow %D";
    condition: "slow %K" | "slow %D";
}

interface nmOption {
    title: "80/40" | "40/20" | "20/10" | "10/5" | "5/3";
    N: "80" | "40" | "20" | "10" | "5";
    M: "40" | "20" | "10" | "5" | "3";
}

interface compareOption {
    title: keyof typeof compareType;
    condition: keyof typeof compareType;
}

export interface periodOption {
    title: string;
    condition: ValueOf<Interval>;
}

export const periodOptions: periodOption[] = Object.entries(Interval).map(
    ([title, condition]) => ({ title, condition })
);

const filterConditions: filterOption[] = [
    { title: "slow %K", condition: "slow %K" },
];

export const compConditions: compareOption[] = [
    { title: "이상", condition: "이상" },
    { title: "이하", condition: "이하" },
];

const nmConditions: nmOption[] = [
    {
        title: "80/40",
        N: "80",
        M: "40",
    },
    {
        title: "40/20",
        N: "40",
        M: "20",
    },
    {
        title: "20/10",
        N: "20",
        M: "10",
    },
    {
        title: "10/5",
        N: "10",
        M: "5",
    },
    {
        title: "5/3",
        N: "5",
        M: "3",
    },
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
    conditionItems: conditionItem[];
    onItemAdd(item: conditionType): void;
}

const SlowKConditionItem = ({ conditionItems, onItemAdd }: Props) => {
    const classes = useStyles();

    const [period, setPeriod] = useState<Interval>(); //주기
    //const [candle, setCandle] = useState(0); //봉전기준
    const [findCount, setFindCount] = useState(0); //조회갯수
    const [N, setN] = useState(0);
    const [M, setM] = useState(0);
    const [filter, setFilter] = useState(); //필터 조건
    const [compareval, setCompareVal] = useState(0);
    const [compareCond, setCompareCond] = useState();

    const handleChangePeriod = useCallback((_event: any, value: any) => {
        if (value) {
            setPeriod(value.condition);
        }
    }, []);

    const handleChangeFindCount = useCallback((event: any) => {
        setFindCount(parseInt(event.target.value));
    }, []);

    const handleChangeFilter = useCallback((_event: any, value: any) => {
        setFilter(value?.condition || undefined);
    }, []);

    const handleChangeComp = useCallback((_event: any, value: any) => {
        setCompareCond(value?.condition || undefined);
    }, []);

    const handleChangeNM = useCallback((_event: any, value: any) => {
        if (value) {
            setN(value.N);
            setM(value.M);
        }
    }, []);

    const handleChangeCompareVal = useCallback((event: any) => {
        setCompareVal(parseInt(event.target.value));
    }, []);

    const onClickAdd = useCallback(() => {
        let item: conditionType = {
            period: period,
            // candle: candle,
            findCount: findCount,
            N: N,
            M: M,
            filter: filter || "slow %D",
            compareVal: compareval,
            compareCond: compareCond || "이상",
        };
        onItemAdd(item);
    }, [period, findCount, N, M, filter, compareval, compareCond, onItemAdd]);

    const onClickSave = useCallback(() => {
        const result = window.confirm("테이블의 정보를 저장하시겠습니까?");
        if (result) {
            localStorage.setItem(
                "conditionItems",
                JSON.stringify(conditionItems)
            );
            alert("정보를 저장했습니다.");
        }
    }, [conditionItems]);

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
                        onChange={handleChangePeriod}
                    />
                </Grid>
                {/* <Grid item>
                    <TextField
                        id="standard-number"
                        label="봉전 기준"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: "3px" }}
                        onChange={(event) =>
                            setCandle(parseInt(event.target.value))
                        }
                    />
                </Grid> */}
                <Grid item>
                    <TextField
                        id="standard-number"
                        label="개수"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: "3px" }}
                        onChange={handleChangeFindCount}
                    />
                </Grid>

                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={nmConditions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 150 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="(N, M)"
                                variant="outlined"
                            />
                        )}
                        onChange={handleChangeNM}
                    />
                </Grid>

                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={filterConditions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 180 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="필터 조건"
                                variant="outlined"
                            />
                        )}
                        onChange={handleChangeFilter}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="standard-number"
                        label="비교 값"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: "3px" }}
                        onChange={handleChangeCompareVal}
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
                        onChange={handleChangeComp}
                    />
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#52ab98", color: "white" }}
                        onClick={onClickAdd}
                    >
                        추가
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#52ab98", color: "white" }}
                        onClick={onClickSave}
                    >
                        저장
                    </Button>
                </Grid>
            </Grid>
        </TodoItemBlock>
    );
};

export default React.memo(SlowKConditionItem);
