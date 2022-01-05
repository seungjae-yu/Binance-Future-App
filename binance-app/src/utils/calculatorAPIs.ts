export namespace calculatorAPIs {

    export interface prices {
        open: number,
        high: number,
        low: number,
        close: number
    };

    export interface FastValues {
        fastK: number[],
        fastD: number[],
    };

    /* 
      [
        1499040000000,      // Open time
        "0.01634790",       // Open
        "0.80000000",       // High
        "0.01575800",       // Low
        "0.01577100",       // Close
        "148976.11427815",  // Volume
        1499644799999,      // Close time
        "2434.19055334",    // Quote asset volume
        308,                // Number of trades
        "1756.87402397",    // Taker buy base asset volume
        "28.46694368",      // Taker buy quote asset volume
        "17928899.62484339" // Ignore.
      ]
    */

    // let testRes = [
    //     [
    //         0,
    //         "10",
    //         "50",
    //         "30",
    //         "40"
    //     ],
    //     [
    //         1,
    //         "40",
    //         "70",
    //         "10",
    //         "20"
    //     ],
    //     [
    //         2,
    //         "20",
    //         "120",
    //         "15",
    //         "100"
    //     ],
    //     [
    //         3,
    //         "100",
    //         "160",
    //         "80",
    //         "60"
    //     ],
    // ];

    export function getPrices(pricesInfo: any[]): prices[] {
        const price = pricesInfo.reduce((prev, cur) => {
            const obj = {
                open: Number.parseFloat(cur[1]),
                high: Number.parseFloat(cur[2]),
                low: Number.parseFloat(cur[3]),
                close: Number.parseFloat(cur[4])
            };
            prev.push(obj);
            return prev;
        }, [] as prices[]);
        return price;
    }

    export function getFastK(pricesInfo: any[], N: number, M: number) {
        let price = getPrices(pricesInfo);
        let result: FastValues = {
            fastK: [],
            fastD: []
        };

        for (let i = N - 1; i < price.length; i++) {
            const sliced = price.slice(i - (N - 1), i + 1);
            const [minPrice, maxPrice] = sliced.reduce((prev, cur) => {
                return [Math.min(prev[0], cur.low), Math.max(prev[1], cur.high)];
            }, [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])

            const value = (price[i].close - minPrice) / (maxPrice - minPrice) * 100;
            result.fastK.push(+value.toPrecision(4));
        }

        for (let i = M - 1; i < result.fastK.length; i++) {            
            const sliced = result.fastK.slice(i - (M - 1), i + 1);
            const avg = sliced.reduce((sum, cur) => {
                return sum + cur
            }, 0) / M;
            result.fastD.push(+avg.toPrecision(4));
        }

        return result;
    }
}