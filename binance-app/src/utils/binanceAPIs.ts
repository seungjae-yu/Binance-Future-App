import axios from "axios";
import exchangeSymbol from '../config/exchangeInfo.json';

export namespace binanceAPIs {

    const BASE_URI = `http://https://fapi.binance.com/`;

    export function exchangeInfo() {
        const exchangeInfo = 'fapi/v1/exchangeInfo';
        axios.get(BASE_URI + exchangeInfo, {

        });
    }




}