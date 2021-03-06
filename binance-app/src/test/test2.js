import { calculatorAPIs } from "../utils/calculatorAPIs";

let testRes = [
    [
        4,
        "10",
        "50",
        "30",
        "40"
    ],
    [
        5,
        "40",
        "70",
        "10",
        "20"
    ],
    [
        6,
        "20",
        "120",
        "15",
        "100"
    ],
    [
        7,
        "100",
        "160",
        "80",
        "60"
    ],
    [
        8,
        "60",
        "200",
        "50",
        "100"
    ],
    [
        9,
        "100",
        "150",
        "80",
        "130"
    ],
    [
        10,
        "130",
        "300",
        "100",
        "200"
    ],
    [
        11,
        "200",
        "250",
        "180",
        "210"
    ],
    [
        12,
        "210",
        "220",
        "200",
        "215"
    ],
    [
        13,
        "215",
        "230",
        "200",
        "220"
    ],
];

let testRes2 = [
    [
        4,
        "53611.86",
        "53889.69",
        "40888.89",
        "49135.66"
    ],
    [
        5,
        "49135.66",
        "49699.49",
        "47755.00",
        "49376.60"
    ],
    [
        6,
        "49373.83",
        "50888.00",
        "47000.00",
        "50424.72"
    ],
    [
        7,
        "50424.72",
        "51929.00",
        "50012.00",
        "50577.20"
    ],
    [
        8,
        "50577.20",
        "51210.60",
        "48533.33",
        "50455.61"
    ],
    [
        9,
        "50459.61",
        "50773.03",
        "47312.89",
        "47539.76"
    ],
    [
        10,
        "47539.34",
        "50188.42",
        "46828.23",
        "47136.35"
    ],
    [
        11,
        "47132.31",
        "49499.05",
        "46724.35",
        "49381.15"
    ],
    [
        12,
        "49379.51",
        "50768.00",
        "48616.16",
        "50057.01"
    ],
];

let testRes3 = [
    [
        3,
        "53611.86",
        "53889.69",
        "40888.89",
        "49135.66"
    ],
    [
        4,
        "53611.86",
        "53889.69",
        "40888.89",
        "49135.66"
    ],
    [
        5,
        "49135.66",
        "49699.49",
        "47755.00",
        "49376.60"
    ],
    [
        6,
        "49373.83",
        "50888.00",
        "47000.00",
        "50424.72"
    ],
    [
        7,
        "50424.72",
        "51929.00",
        "50012.00",
        "50577.20"
    ],
    [
        8,
        "50577.20",
        "51210.60",
        "48533.33",
        "50455.61"
    ],
    [
        9,
        "50459.61",
        "50773.03",
        "47312.89",
        "47539.76"
    ],
    [
        10,
        "47539.34",
        "50188.42",
        "46828.23",
        "47136.35"
    ],
    [
        11,
        "47132.31",
        "49499.05",
        "46724.35",
        "49381.15"
    ],
    [
        12,
        "49379.51",
        "50768.00",
        "48616.16",
        "50057.01"
    ],
    [
        3,
        "53611.86",
        "53889.69",
        "40888.89",
        "49135.66"
    ],
    [
        4,
        "53611.86",
        "53889.69",
        "40888.89",
        "49135.66"
    ],
    [
        5,
        "49135.66",
        "49699.49",
        "47755.00",
        "49376.60"
    ],
    [
        6,
        "49373.83",
        "50888.00",
        "47000.00",
        "50424.72"
    ],
    [
        7,
        "50424.72",
        "51929.00",
        "50012.00",
        "50577.20"
    ],
    [
        8,
        "50577.20",
        "51210.60",
        "48533.33",
        "50455.61"
    ],
    [
        9,
        "50459.61",
        "50773.03",
        "47312.89",
        "47539.76"
    ],
    [
        10,
        "47539.34",
        "50188.42",
        "46828.23",
        "47136.35"
    ],
    [
        11,
        "47132.31",
        "49499.05",
        "46724.35",
        "49381.15"
    ],
    [
        12,
        "49379.51",
        "50768.00",
        "48616.16",
        "50057.01"
    ],
];

// let res = calculatorAPIs.getFastK(testRes3, 20, 5);

// console.log(res);

let res2 = calculatorAPIs.getMovingAvg(testRes);
console.log(res2);