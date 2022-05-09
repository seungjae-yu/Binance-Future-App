import { Button, Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { conditionItem } from "../../modules/condition";
import { movingAvgItem } from "../../modules/movingAvg";
import { resultItem } from "../../modules/result";
import { commonType } from "../../types/types";
import {
    binanceAPIs,
    candleSticType,
    klinesParams,
} from "../../utils/binanceAPIs";
import { calculatorAPIs } from "../../utils/calculatorAPIs";
import { TelegramAPIs } from "../../utils/telegramAPIs";
import { utils } from "../../utils/utils";
import { AvgLine } from "../movingAvg/MovingAvgItem";
import { TelegramInfos } from "../telegram/TelegramInfo";
import SearchRadio, { radioOptions } from "./SearchRadio";

interface searchProps {
    maxCount: number;
    weight: any;
    interval: any;
}

interface Props {
    conditionItems: conditionItem[];
    movingAvgItems: movingAvgItem[];
    findSlowK(
        candleSticks: candleSticType[][],
        params: klinesParams
    ): Promise<
        {
            symbol: string;
            values: calculatorAPIs.FastValues;
        }[][]
    >;
    findMovingAvg(
        candleSticks: candleSticType[][],
        params: klinesParams
    ): Promise<
        {
            symbol: string;
            values: calculatorAPIs.MovingAverageValues;
        }[][]
    >;
    getAvgNameFunc(
        cnt: string
    ): "avg_5" | "avg_10" | "avg_20" | "avg_60" | "avg_120" | "avg_0";
    setInfo(items: commonType[]): {
        maxCount: number;
        weight: number;
        interval: any;
    };
    reduceCandleStickData(
        candleStic: {
            symbol: string;
            v: string;
        }[],
        items: commonType[]
    ): candleSticType[][];
    settingResult(res: resultItem[]): void;
}

const Monitoring = ({
    conditionItems,
    movingAvgItems,
    findSlowK,
    findMovingAvg,
    getAvgNameFunc,
    setInfo,
    reduceCandleStickData,
    settingResult,
}: Props) => {
    let count = 0;
    let lastSentData: string[][] = [];
    let xTimes = 0;

    const [btnDisable, setBtnDisable] = useState(false);
    const [radioOption, setRadioOption] = useState<radioOptions>(
        radioOptions.slowK
    );
    const [isRunning, setIsRunning] = useState(false);
    const [searchTimer, setSearchTimer] = useState<any>();

    useEffect(() => {
        if (isRunning === false) {
            clearTimeout(searchTimer);
        }
    }, [isRunning, searchTimer]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const opt = (event.target as HTMLInputElement)
                .value as radioOptions;
            setRadioOption(radioOptions[opt]);
        },
        []
    );

    const searchData = async () => {
        if (radioOption === radioOptions.slowK && conditionItems.length === 0) {
            alert("slow K 조회 조건이 없습니다.");
            return;
        }

        if (
            radioOption === radioOptions.movingAvg &&
            movingAvgItems.length === 0
        ) {
            alert("moving Average 조회 조건이 없습니다.");
            return;
        }

        if (
            radioOption === radioOptions.all &&
            (conditionItems.length === 0 || movingAvgItems.length === 0)
        ) {
            alert("slow K 조회조건이나 moving Average 조회 조건이 없습니다.");
            return;
        }

        const { maxCount, weight, interval } = {
            maxCount: Math.max(
                setInfo(conditionItems).maxCount,
                setInfo(movingAvgItems).maxCount
            ),
            weight: Math.max(
                setInfo(conditionItems).weight,
                setInfo(movingAvgItems).weight
            ),
            interval: [
                setInfo(conditionItems).interval,
                setInfo(movingAvgItems).interval,
            ],
        };

        if (radioOption === radioOptions.all && interval[0] !== interval[1]) {
            alert("두 조회조건의 조회 주기가 다릅니다.");
            return;
        }

        return await searchInfo({
            maxCount: maxCount,
            weight: weight,
            interval: interval[0] || interval[1],
        });
    };

    const searchInfo = async ({ maxCount, weight, interval }: searchProps) => {
        setBtnDisable(true);

        let [isSlowK, isMovingAvg] = [false, false];

        if (radioOption === radioOptions.slowK) isSlowK = true;
        else if (radioOption === radioOptions.movingAvg) isMovingAvg = true;
        else if (radioOption === radioOptions.all) {
            isSlowK = true;
            isMovingAvg = true;
        }

        //1. symbol 가져옴
        let symbols: string[] = await binanceAPIs.getAllSymbolNames();
        symbols = symbols.filter((s) => s.endsWith("USDT")); //.slice(0, 1);

        setTimeout(() => {
            setBtnDisable(false);
        }, 7500 * weight);

        //5. 가져온정보 설정하기
        const params: klinesParams = {
            interval: interval,
            symbol: symbols,
            limit: maxCount,
        };

        const candleStic = await binanceAPIs.getCandlestick(params);

        //slow K candle stick정보로 가공
        let candleSticks_slowK: candleSticType[][] = reduceCandleStickData(
            candleStic,
            conditionItems
        );

        //moving avg 정보로 가공
        let candleSticks_movingAvg: candleSticType[][] = reduceCandleStickData(
            candleStic,
            movingAvgItems
        );

        let slowK_result: any[][] = [];
        let movingAvg_result: any[][] = [];

        let result: any[][] = [];

        if (isSlowK) {
            const datas = await findSlowK(candleSticks_slowK, params);

            //필터링
            for (let i = 0; i < datas.length; i++) {
                if (conditionItems[i].compareCond === "이상") {
                    slowK_result.push(
                        datas[i]
                            .filter(
                                (d) =>
                                    d.values.fastD[d.values.fastD.length - 1] >=
                                    conditionItems[i].compareVal
                            )
                            .map((m) => {
                                //console.log(JSON.stringify(m));
                                return m.symbol;
                            })
                    ); //(m => ({ symbol: m.symbol, slowK: m.values.fastD[m.values.fastD.length - 1] })));
                } else if (conditionItems[i].compareCond === "이하") {
                    slowK_result.push(
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
        }

        if (isMovingAvg) {
            const datas = await findMovingAvg(candleSticks_movingAvg, params);
            //console.log(JSON.stringify(datas));
            /*
                 * symbol: "BTCUSDT"
                    values:
                    avg_5: 41689.91
                    avg_10: 41700.47
                 */
            for (let i = 0; i < datas.length; i++) {
                const itVal = movingAvgItems[i].findCount as AvgLine;
                const compVal = movingAvgItems[i].compareVal as AvgLine;
                if (movingAvgItems[i].compareCond === "이상") {
                    movingAvg_result.push(
                        datas[i]
                            .filter(
                                (d) =>
                                    d.values[getAvgNameFunc(itVal)] >=
                                    d.values[getAvgNameFunc(compVal)]
                            )
                            .map((m) => m.symbol)
                    );
                } else if (movingAvgItems[i].compareCond === "이하") {
                    movingAvg_result.push(
                        datas[i]
                            .filter(
                                (d) =>
                                    d.values[getAvgNameFunc(itVal)] <=
                                    d.values[getAvgNameFunc(compVal)]
                            )
                            .map((m) => m.symbol)
                    );
                }
            }
        }

        result = slowK_result.concat(movingAvg_result);
        result = result.filter((item, idx) => result.indexOf(item) === idx);

        let idx = 0;
        const res = _.intersection(...result).map(
            (m) =>
                ({
                    id: idx++,
                    slowK: 0,
                    symbol: m,
                } as resultItem)
        );

        settingResult(res);
        return res;
    };

    const onClickMonitoringStart = () => {
        const monitoringPeriod =
            window.prompt("모니터링 주기를 입력해주세요 (단위 : 분)") || "-1";
        let monitoringPeriodTime = parseInt(monitoringPeriod);

        const alertPeriod =
            window.prompt(
                "중복 데이터를 얼마동안 받지 않으시겠습니까? (단위 : 분)"
            ) || "-1";
        let alertPeriodTime = parseInt(alertPeriod);

        if (
            alertPeriodTime < monitoringPeriodTime ||
            alertPeriodTime % monitoringPeriodTime !== 0
        ) {
            alert("값을 잘못 입력하셨습니다.");
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
            // if (isRunning) {
            //     alert("이미 동작중인 작업이 존재합니다.");
            //     return;
            // }
            setIsRunning(true);
            setSearchTimer(
                setTimeout(async function search() {
                    //do things
                    const resultData = (await searchData()) || [];
                    count++;
                    if (count === xTimes) {
                        count = 0;
                    }

                    const compArr = utils.concatArr(lastSentData);
                    const sendData = resultData
                        .map((m) => m.symbol)
                        .filter((item) => compArr.indexOf(item) === -1);

                    if (sendData.length > 0) {
                        const telegramInfo =
                            localStorage.getItem("telegramInfo");
                        if (telegramInfo) {
                            const telegramInfoJson: TelegramInfos =
                                JSON.parse(telegramInfo);
                            TelegramAPIs.sendMessage(
                                sendData.join(", "),
                                telegramInfoJson
                            );
                        }
                    }

                    if (lastSentData.length === xTimes) lastSentData.shift();
                    lastSentData.push(resultData.map((m) => m.symbol));
                    setTimeout(search, monitoringPeriodTime * 60000);
                }, monitoringPeriodTime * 60000)
            );
        } else {
            alert("취소가 선택되었습니다.");
        }
    };

    const onClickMonitoringStop = () => {
        const result = window.confirm("모니터링을 중지하시겠습니까?");
        if (result) {
            if (!isRunning) {
                alert("동작중인 모니터링 작업이 존재하지 않습니다.");
                return;
            }
            setIsRunning(false);
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
                    <SearchRadio
                        radioOption={radioOption}
                        handleChange={handleChange}
                    />
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{
                            background: !btnDisable ? "#52ab98" : "#808080",
                            color: "white",
                        }}
                        onClick={searchData}
                        disabled={btnDisable}
                    >
                        조회
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{
                            background: !isRunning ? "#52ab98" : "#808080",
                            color: "white",
                        }}
                        onClick={onClickMonitoringStart}
                        disabled={isRunning}
                    >
                        모니터링 시작
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{
                            background: isRunning ? "#52ab98" : "#808080",
                            color: "white",
                        }}
                        onClick={onClickMonitoringStop}
                        disabled={!isRunning}
                    >
                        모니터링 중지
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default React.memo(Monitoring);
