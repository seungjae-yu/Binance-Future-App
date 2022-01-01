export interface conditionType {
    period: Interval;
    candle?: number;
    findCount: number;
    slowK: number;
    slowD: number;
    N: number;
    M: number;
    filter: keyof typeof FilterType;
    compareVal: number;
    compareCond: keyof typeof compareType;
}

export type ValueOf<T> = T[keyof T];

enum FilterType {
    'slow %K',
    'slow %D'
}

enum compareType {
    "이상", "이하"
}

export interface FastValues {
    fastK: number[],
    fastD: number[],
};