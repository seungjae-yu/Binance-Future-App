
interface Te {
    avg_5 ?: number,
    avg_10 ?: number,
    avg_20 ?: number,
    avg_60 ?: number,
    avg_120 ?: number
};

const vv : Te = {
    avg_10 : 10
}

type keyOfTe = keyof Te;
