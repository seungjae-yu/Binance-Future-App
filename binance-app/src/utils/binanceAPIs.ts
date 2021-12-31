import axios from "axios";
import { Interval } from "../components/condition/ConditionItem";
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
    symbol: string,
    interval: Interval,
    startTime?: number,
    endTime?: number,
    limit?: number
}

export namespace binanceAPIs {

    const BASE_URI = `http://fapi.binance.com`;
    const allExchange = '/fapi/v1/exchangeInfo';
    const klines = '/fapi/v1/klines';

    export async function exchangeInfo() {
        let result = await axios.get(BASE_URI + allExchange, {});
        const allInfo = JSON.stringify(result);
        return JSON.parse(allInfo);
    }

    export async function getCandlestick(params: klinesParams) {
        const url = BASE_URI + klines + `?symbol=${params.symbol}&interval=${params.interval}&limit=${params.limit}`;
        let result = await axios.get(url);
        return JSON.stringify(result);
    }



}