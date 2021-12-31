

export interface RateLimit {
    rateLimitType: string;
    interval: string;
    intervalNum: number;
    limit: number;
}

export interface Asset {
    asset: string;
    marginAvailable: boolean;
    autoAssetExchange: string;
}

export interface Filter {
    minPrice: string;
    maxPrice: string;
    filterType: string;
    tickSize: string;
    stepSize: string;
    maxQty: string;
    minQty: string;
    limit?: number;
    notional: string;
    multiplierDown: string;
    multiplierUp: string;
    multiplierDecimal: string;
}

export interface Symbol {
    symbol: string;
    pair: string;
    contractType: string;
    deliveryDate: any;
    onboardDate: any;
    status: string;
    maintMarginPercent: string;
    requiredMarginPercent: string;
    baseAsset: string;
    quoteAsset: string;
    marginAsset: string;
    pricePrecision: number;
    quantityPrecision: number;
    baseAssetPrecision: number;
    quotePrecision: number;
    underlyingType: string;
    underlyingSubType: string[];
    settlePlan: number;
    triggerProtect: string;
    liquidationFee: string;
    marketTakeBound: string;
    filters: Filter[];
    orderTypes: string[];
    timeInForce: string[];
}

export interface ExchangeInfo {
    timezone: string;
    serverTime: number;
    futuresType: string;
    rateLimits: RateLimit[];
    exchangeFilters: any[];
    assets: Asset[];
    symbols: Symbol[];
}

