
// const v : number = 25;

import { CollectionsOutlined } from "@material-ui/icons";

// switch(true) {
//     case v >= 120 : {
//         console.log('120');
//     }
//     case v >= 60 : {
//         console.log('60');
//     }
//     case v >= 20 : {
//         console.log('20');
//     }
//     case v >= 10 : {
//         console.log('12');
//     }
//     case v>=5 : {
//         console.log('5');
//     }
// }

const testArray = [1,2,3,4,5,6,7,8,9,10];
// console.log(testArray.slice(-2));

// const avgFunc = (arr : number[]) => {
//     const len = arr.length;
//     return arr.reduce((sum, cur) => {
//         return sum + cur
//     }, 0) / len;
// }

// console.log(avgFunc(testArray));

const a = 2;

console.log(testArray.slice(-+a));