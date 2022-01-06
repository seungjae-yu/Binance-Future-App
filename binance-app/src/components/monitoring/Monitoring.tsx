import { Button, Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { LoadAction, resultItem } from "../../modules/result";
import {
    binanceAPIs,
    candleSticType,
    klinesParams,
} from "../../utils/binanceAPIs";
import { calculatorAPIs } from "../../utils/calculatorAPIs";
import { TelegramAPIs } from "../../utils/telegramAPIs";
import { utils } from "../../utils/utils";
import { Interval } from "../condition/ConditionItem";

interface SearchResult {
    symbol: string;
    interval: Interval;
    limit: number;
    values: [];
}

const Monitoring = () => {
    let running: boolean = false;
    let count = 0;
    let lastSentData: string[][] = [];
    let xTimes = 0;

    //forTest
    const [btnDisable, setBtnDisable] = useState(false);

    const { conditionItems } = useSelector(
        (state: RootState) => state.conditionReducer
    );

    const dispatch = useDispatch();

    const searchInfo = async () => {
        setBtnDisable(true);

        const maxCount = conditionItems.reduce((prev, cur) => {
            return Math.max(prev, cur.findCount);
        }, 0);

        const candleTime = conditionItems[0].period;

        const weight = (maxCount >= 100 ? 2 : 1) * ((candleTime === Interval["10분"] || candleTime === Interval["2분"]) ? 2 : 1);

        setTimeout(() => {
            setBtnDisable(false);
        }, 7500 * weight);

        const datas = await findDatas(maxCount);
        let result: any[][] = [];
        for (let i = 0; i < datas.length; i++) {
            if (conditionItems[i].compareCond === "이상") {
                result.push(
                    datas[i]
                        .filter(
                            (d) =>
                                d.values.fastD[d.values.fastD.length - 1] >=
                                conditionItems[i].compareVal
                        )
                        .map((m) => m.symbol)
                ); //(m => ({ symbol: m.symbol, slowK: m.values.fastD[m.values.fastD.length - 1] })));
            } else if (conditionItems[i].compareCond === "이하") {
                result.push(
                    datas[i]
                        .filter(
                            (d) =>
                                d.values.fastD[d.values.fastD.length - 1] <=
                                conditionItems[i].compareVal
                        )
                        .map((m) => m.symbol)
                );
            }
        }

        let idx = 0;
        const res = _.intersection(...result).map(
            (m) =>
            ({
                id: idx++,
                slowK: 0,
                symbol: m,
            } as resultItem)
        );
        dispatch(LoadAction(res));

        return res;
    };

    const findDatas = async (maxCount: number) => {
        let symbols: string[] = await binanceAPIs.getAllSymbolNames();
        symbols = symbols.filter(s => s.endsWith("USDT"));

        //for Test
        //symbols = symbols.slice(10, 20);

        // const maxCount = conditionItems.reduce((prev, cur) => {
        //     return Math.max(prev, cur.findCount);
        // }, 0);

        const params: klinesParams = {
            interval: conditionItems[0].period,
            symbol: symbols,
            limit: maxCount,
        };

        const candleStic = await binanceAPIs.getCandlestick(params);
        let candleSticks: candleSticType[][] = conditionItems.reduce(
            (prev, cur) => {
                const c = candleStic.slice(maxCount - cur.findCount, maxCount);
                prev.push(c);
                return prev;
            },
            [] as candleSticType[][]
        );

        let datas = [];

        for (let i = 0; i < candleSticks.length; i++) {
            const data = candleSticks[i].map((c) => {
                return {
                    symbol: c.symbol,
                    values: calculatorAPIs.getFastK(
                        JSON.parse(c.v).data as [][],
                        conditionItems[i].N,
                        conditionItems[i].M
                    ),
                };
            });
            datas.push(data);
        }
        return datas;
    };

    const saveConditionInfo = async () => {
        const result = window.confirm("테이블의 정보를 저장하시겠습니까?");
        if (result) {
            localStorage.setItem(
                "conditionItems",
                JSON.stringify(conditionItems)
            );
            alert("정보를 저장했습니다.");
        }
    };

    const onClickMonitoringStart = () => {
        const monitoringPeriod =
            window.prompt("모니터링 주기를 입력해주세요 (단위 : 분)") || "-1";
        let monitoringPeriodTime = parseInt(monitoringPeriod);

        const alertPeriod =
            window.prompt("중복 데이터를 얼마동안 받지 않으시겠습니까? (단위 : 분)") || "-1";
        let alertPeriodTime = parseInt(alertPeriod);

        if (alertPeriodTime < monitoringPeriodTime || (alertPeriodTime % monitoringPeriodTime !== 0)) {
            alert('값을 잘못 입력하셨습니다.');
            return;
        }
        xTimes = alertPeriodTime / monitoringPeriodTime;
        console.log(xTimes);

        if (
            monitoringPeriod &&
            alertPeriod &&
            monitoringPeriodTime !== -1 &&
            alertPeriodTime !== -1
        ) {
            if (running) {
                alert("이미 동작중인 작업이 존재합니다.");
                return;
            }
            running = true;
            const searchTimer = setInterval(async () => {
                if (running === false) {
                    clearInterval(searchTimer);
                    return;
                }
                //do things
                const resultData = await searchInfo();
                count++;
                if (count === xTimes) {
                    count = 0;
                }

                const compArr = utils.concatArr(lastSentData);
                const sendData = resultData
                    .map((m) => m.symbol)
                    .filter((item) => compArr.indexOf(item) === -1);

                if (sendData.length > 0)
                    TelegramAPIs.sendMessage(sendData.join(", "));

                if (lastSentData.length === xTimes) lastSentData.shift();
                lastSentData.push(resultData.map((m) => m.symbol));
            }, monitoringPeriodTime * 60000);
        } else {
            alert("취소가 선택되었습니다.");
        }
    };

    const onClickMonitoringStop = () => {
        const result = window.confirm("모니터링을 중지하시겠습니까?");
        if (result) {
            if (!running) {
                alert("동작중인 모니터링 작업이 존재하지 않습니다.");
                return;
            }
            running = false;
            alert("모니터링이 종료되었습니다.");
        }
    };

    return (
        <div style={{ marginRight: "10px", marginBottom: "25px" }}>
            <Grid
                container
                spacing={2}
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                }}
            >
                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#DDD1C7" }}
                        onClick={searchInfo}
                        disabled={btnDisable}
                    >
                        조회
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#DDD1C7" }}
                        onClick={saveConditionInfo}
                    >
                        정보 저장
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#DDD1C7" }}
                        onClick={onClickMonitoringStart}
                    >
                        모니터링 시작
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#DDD1C7" }}
                        onClick={onClickMonitoringStop}
                    >
                        모니터링 중지
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Monitoring;
