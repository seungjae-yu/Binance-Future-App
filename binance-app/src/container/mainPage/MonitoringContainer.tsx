import React from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Interval } from "../../components/condition/SlowKConditionItem";
import Monitoring from "../../components/monitoring/Monitoring";
import { RootState } from "../../modules";
import { LoadAction, resultItem } from "../../modules/result";
import { commonType } from "../../types/types";
import { candleSticType, klinesParams } from "../../utils/binanceAPIs";
import { calculatorAPIs } from "../../utils/calculatorAPIs";

const MonitoringContainer = () => {
    const { conditionItems } = useSelector(
        (state: RootState) => state.conditionReducer
    );

    const { movingAvgItems } = useSelector(
        (state: RootState) => state.movingAvgReducer
    );

    const dispatch = useDispatch();

    const findSlowK = useCallback(
        async (candleSticks: candleSticType[][], params: klinesParams) => {
            let datas = [];

            for (let i = 0; i < candleSticks.length; i++) {
                const data = candleSticks[i].map((c) => {
                    return {
                        symbol: c.symbol,
                        values: calculatorAPIs.getFastK(
                            JSON.parse(c.v).data as [][],
                            conditionItems[i].N || 0,
                            conditionItems[i].M || 0,
                            params
                        ),
                    };
                });

                datas.push(data);
            }
            return datas;
        },
        [conditionItems]
    );

    const findMovingAvg = useCallback(
        async (candleSticks: candleSticType[][], params: klinesParams) => {
            let datas = [];

            for (let i = 0; i < candleSticks.length; i++) {
                const data = candleSticks[i].map((c) => {
                    return {
                        symbol: c.symbol,
                        values: calculatorAPIs.getMovingAvg(
                            JSON.parse(c.v).data as [][],
                            params
                        ),
                    };
                });
                datas.push(data);
            }
            return datas;
        },
        []
    );

    const getAvgNameFunc = useCallback((cnt: string) => {
        switch (cnt) {
            case "5":
                return "avg_5";
            case "10":
                return "avg_10";
            case "20":
                return "avg_20";
            case "60":
                return "avg_60";
            case "120":
                return "avg_120";
            default:
                return "avg_0";
        }
    }, []);

    const setInfo = useCallback((items: commonType[]) => {
        if (items.length === 0) {
            return {
                maxCount: -1,
                weight: 1,
                interval: undefined,
            };
        }

        //2. 최대 조회수 설정
        const maxCount = items.reduce((prev, cur) => {
            return cur.compareVal
                ? Math.max(cur.compareVal, Math.max(prev, cur.findCount))
                : Math.max(prev, cur.findCount);
        }, 0);

        //3. 분봉 설정
        const candleTime = items[0].period;

        //4. 조회 시간제한 걸기
        const weight =
            (maxCount >= 100 ? 2 : 1) *
            (candleTime === Interval["10분"] || candleTime === Interval["2분"]
                ? 2
                : 1);

        return {
            maxCount: maxCount,
            weight: weight,
            interval: candleTime,
        };
    }, []);

    const reduceCandleStickData = useCallback(
        (
            candleStic: {
                symbol: string;
                v: string;
            }[],
            items: commonType[]
        ): candleSticType[][] => {
            return items.reduce((prev) => {
                const c = candleStic; //.slice(-+cur.findCount);
                prev.push(c);
                return prev;
            }, [] as candleSticType[][]);
        },
        []
    );

    const settingResult = useCallback((res: resultItem[]) => {
        dispatch(LoadAction(res));
    }, []);

    return (
        <Monitoring
            conditionItems={conditionItems}
            movingAvgItems={movingAvgItems}
            findSlowK={findSlowK}
            findMovingAvg={findMovingAvg}
            getAvgNameFunc={getAvgNameFunc}
            setInfo={setInfo}
            reduceCandleStickData={reduceCandleStickData}
            settingResult={settingResult}
        />
    );
};

export default React.memo(MonitoringContainer);
