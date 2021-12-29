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
import styled from "styled-components";
import { compareType, conditionType } from "../../types/types";

const TodoItemBlock = styled.div`
    display: flex;
    padding-top: 12px;

    padding-left: 12px;
    padding-right: 12px;
    border-bottom: 1px solid #e9ecef;
`;

interface filterOption {
    title: "slow %K" | "slow %D";
    condition: "slow %K" | "slow %D";
}

interface compareOption {
    title: keyof typeof compareType;
    condition: keyof typeof compareType;
}

const filterConditions: filterOption[] = [
    { title: "slow %D", condition: "slow %D" },
    { title: "slow %K", condition: "slow %K" },
];

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
    onItemAdd(item: conditionType): void;
}

const ConditionItem = ({ onItemAdd }: Props) => {
    const classes = useStyles();

    const [period, setPeriod] = useState(0); //주기
    //const [candle, setCandle] = useState(0); //봉전기준
    const [findCount, setFindCount] = useState(0); //조회갯수
    const [slowK, setSlowK] = useState(0); //slow %K
    const [slowD, setSlowD] = useState(0); //slow %D
    const [filter, setFilter] = useState(); //필터 조건
    const [compareval, setCompareVal] = useState(0);
    const [compareCond, setCompareCond] = useState();

    const handleChangeFilter = (event: any, value: any) => {
        setFilter(value?.condition || undefined);
    };

    const handleChangeComp = (event: any, value: any) => {
        setCompareCond(value?.condition || undefined);
    };

    const onClickAdd = () => {
        let item: conditionType = {
            period: period,
            // candle: candle,
            findCount: findCount,
            slowK: slowK,
            slowD: slowD,
            filter: filter || "slow %D",
            compareVal: compareval,
            compareCond: compareCond || "이상",
        };
        onItemAdd(item);
    };

    return (
        <TodoItemBlock className={classes.root}>
            <Grid container spacing={2} direction="row">
                <Grid item>
                    <TextField
                        id="standard-number"
                        label="주기"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: "3px" }}
                        onChange={(event) =>
                            setPeriod(parseInt(event.target.value))
                        }
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
                        onChange={(event) =>
                            setFindCount(parseInt(event.target.value))
                        }
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-number"
                        label="slow %K"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: "3px" }}
                        onChange={(event) =>
                            setSlowK(parseInt(event.target.value))
                        }
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-number"
                        label="slow %D"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: "3px" }}
                        onChange={(event) =>
                            setSlowD(parseInt(event.target.value))
                        }
                    />
                </Grid>

                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={filterConditions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="필터 조건"
                                variant="outlined"
                            />
                        )}
                        onChange={(event, value) =>
                            handleChangeFilter(event, value)
                        }
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
                        onChange={(event) =>
                            setCompareVal(parseInt(event.target.value))
                        }
                    />
                </Grid>

                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={compConditions}
                        getOptionLabel={(option) => option.title?.toString()}
                        style={{ width: 200 }}
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

                <Button
                    size="large"
                    variant="contained"
                    color={"primary"}
                    onClick={onClickAdd}
                >
                    추가
                </Button>
            </Grid>
        </TodoItemBlock>
    );
};

export default ConditionItem;
