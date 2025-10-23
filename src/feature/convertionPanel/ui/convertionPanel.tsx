import { Flex, Grid } from 'antd';
import { useState } from 'react';
import { ConversionResult } from './conversionResult/conversionResult';
import { EnterData } from './enterData/enterData';

const { useBreakpoint } = Grid;

export const ConvertionPanel = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [amount, setAmount] = useState<number | null>(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  return (
    <Flex vertical={isMobile} gap={30}>
      <EnterData
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onAmountChange={setAmount}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onConvertedAmountChange={setConvertedAmount}
        onExchangeRateChange={setExchangeRate}
      />
      <ConversionResult
        amount={amount || 0}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        convertedAmount={convertedAmount}
        exchangeRate={exchangeRate}
      />
    </Flex>
  );
};
