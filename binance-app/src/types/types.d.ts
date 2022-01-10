export interface conditionType extends commonType{
    //period: Interval;
    candle?: number;
    //findCount: number;    
    N: number;
    M: number;
    filter: keyof typeof FilterType;
    //compareVal: number;
    //compareCond: keyof typeof compareType;
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

export interface resultType {
    symbol: string,
    slowK: number
};

export interface movingAvgType extends commonType{
    // period: Interval;
    // findCount : AvgLine;
    //compareVal: AvgLine;
    //compareCond: keyof typeof compareType;
}

export interface commonType {
    period: Interval;
    findCount: number | AvgLine;
    compareVal?: number | AvgLine;
    compareCond: keyof typeof compareType;
}

