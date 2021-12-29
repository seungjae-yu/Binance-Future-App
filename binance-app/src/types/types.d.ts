export interface conditionType {
    period: number;
    candle?: number;
    findCount: number;
    slowK: number;
    slowD: number;
    filter: keyof typeof FilterType;
    compareVal : number;
    compareCond : keyof typeof compareType;
}

enum FilterType {
    'slow %K',
    'slow %D'    
}

enum compareType {
    "이상","이하"
}