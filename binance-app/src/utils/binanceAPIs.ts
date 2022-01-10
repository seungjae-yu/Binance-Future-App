import axios from "axios";
import { Interval } from "../components/condition/SlowKConditionItem";
import exchangeSymbol from '../config/exchangeInfo.json';
import { ExchangeInfo } from "../types/binance";

export interface klinesParams {
    /**
    symbol	STRING	YES	
    interval	ENUM	YES	
    startTime	LONG	NO	
    endTime	LONG	NO	
    limit	INT	NO	Default 500; max 1500.
     */
    symbol: string[],
    interval: Interval,
    startTime?: number,
    endTime?: number,
    limit: number
}

export interface candleSticType {
    symbol : string,
    v : string;
};

export namespace binanceAPIs {

    const BASE_URI = `http://fapi.binance.com`;
    const allExchange = '/fapi/v1/exchangeInfo';
    const klines = '/fapi/v1/klines';

    export async function getCandlestick(params: klinesParams) {
        return Promise.all(params.symbol.map(async s => {
            if(params.interval === Interval["2분"]) {
                params.interval = Interval["1분"];
                params.limit = params.limit * 2;
            } else if(params.interval === Interval["10분"]) {
                params.interval = Interval["5분"];
                params.limit = params.limit * 2;
            }
            let url = BASE_URI + klines + `?symbol=${s}&interval=${params.interval}&limit=${params.limit}`;            
            const result = await axios.get(url);
            return {
                symbol: s,
                v: JSON.stringify(result)
            }
        }).filter((value, idx) => {
            // if(params.interval === Interval["2분"] || params.interval === Interval["10분"]) {
            //     if(idx % 2 === 1) return value;
            //     else return undefined;
            // } else {
            //     return value;
            // }
            return (params.interval !== Interval["2분"] && params.interval !== Interval["10분"]) || (idx % 2 === 1);
        }));

    }

    export async function getAllSymbolNames() {
        const result = await axios.get(BASE_URI + allExchange, {});
        const allInfo = JSON.parse(JSON.stringify(result));
        const symbols = allInfo.data as ExchangeInfo;
        return symbols.symbols.map(s => s.symbol) || [];
    }


}