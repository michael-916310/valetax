import { getCurrencyByCode } from 'shared/constants/currencies';

export interface EnrichedCurrency {
  code: string;
  rate: number;
  name: string;
  symbolNative: string;
  flagSrc?: string;
  symbol?: string;
}

export const enrichCurrenciesWithRates = (rates: Record<string, number>): EnrichedCurrency[] => {
  const enriched = Object.entries(rates).map(([code, rate]) => {
    const currencyData = getCurrencyByCode(code);

    if (currencyData) {
      return {
        code,
        rate,
        name: currencyData.name,
        symbolNative: currencyData.symbolNative,
        flagSrc: currencyData.flagSrc,
        symbol: currencyData.symbol,
      };
    }

    return {
      code,
      rate,
      name: code,
      symbolNative: code,
    };
  });

  return enriched.sort((a, b) => {
    const popular = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CHF'];
    const aIndex = popular.indexOf(a.code);
    const bIndex = popular.indexOf(b.code);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return a.code.localeCompare(b.code);
  });
};
