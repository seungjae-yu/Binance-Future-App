import axios from "axios";
import exchangeSymbol from '../config/exchangeInfo.json';

export enum Interval {

    /*
    m -> minutes; h -> hours; d -> days; w -> weeks; M -> months
    */
    '1m',
    '3m',
    '5m',
    '15m',
    '30m',
    '1h',
    '2h',
    '4h',
    '6h',
    '8h',
    '12h',
    '1d',
    '3d',
    '1w',
    '1M',
}

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

    export function exchangeInfo() {
        axios.get(BASE_URI + allExchange, {

        });
    }

    export async function getCandlestick(params: klinesParams) {
        //BTCUSDT&interval=1m&limit=30
        const url = BASE_URI + klines + '?symbol=BTCUSDT&interval=1m&limit=30';
        //alert(url);
        let result = await axios.get(url);
        console.log(JSON.stringify(result));
        return JSON.stringify(result);
    }



}