export namespace utils {
    export function concatArr(arr : any[][]) {
        let newArr: any[] = [];
        for(let i = 0 ;i < arr.length; i++) {
            newArr = newArr.concat(arr[i]);
        }
        return Array.from(new Set(newArr));
    }
    
}