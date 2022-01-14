import { Interval } from './../components/condition/SlowKConditionItem';
export namespace utils {
    export function concatArr(arr : any[][]) {
        let newArr: any[] = [];
        for(let i = 0 ;i < arr.length; i++) {
            newArr = newArr.concat(arr[i]);
        }
        return Array.from(new Set(newArr));
    }
    
    export function getEnumIntervalByValue(value : string) {
        const values: string[] = Object.values( Interval ).filter( v => v === v );
        const keys: string[] = Object.keys( Interval ).filter( k => k === k );
        const index: number = values.indexOf( value );
        return keys[ index ];
    }
}