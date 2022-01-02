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
];

let res = calculatorAPIs.getFastK(testRes, 5, 3);

console.log(res);