import exchangeInfo from '../config/exchangeInfo.json';

const v = exchangeInfo.symbols.filter(m => m.symbol.endsWith('USDT')).map(m => m.symbol);
console.log(v.length);