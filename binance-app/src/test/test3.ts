let searchedData = [[1,2,3,4,5],[1,2,13,14,16],[1,2,17,4,18],[99,15,14,5,6,7]];

let testArr : number[][] = [];

const func = (arr : number[][]) => {
    let newArr: any[] = [];
    for(let i = 0 ;i < arr.length; i++) {
        newArr = newArr.concat(arr[i]);
    }
    return Array.from(new Set(newArr));
}

//console.log(func(searchedData));

//console.log(searchedData.shift());

searchedData.forEach(s => {
    const compArr = func(testArr);
    const result = s.filter(item => compArr.indexOf(item) === -1);
    console.log(result);

    console.log(testArr);
    if(testArr.length === 2) testArr = testArr.slice(1);
    testArr.push(s);
});
