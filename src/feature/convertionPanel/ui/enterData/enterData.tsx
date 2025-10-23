import { SwapOutlined } from '@ant-design/icons';
import { Button, Card, Flex, InputNumber, InputNumberProps, Typography } from 'antd';
import { useAppSelector } from 'app/providers/StoreProvider';
import { selectActualRatesData } from 'entities/rates';
import { useEffect, useState } from 'react';
import { CurrencyCard } from 'shared/ui';
import { loadConversionSettings, saveConversionSettings } from 'shared/utils/conversionStorage';

interface EnterDataProps {
  amount: number | null;
  fromCurrency: string;
  toCurrency: string;
  onAmountChange: (amount: number | null) => void;
  onFromCurrencyChange: (currency: string) => void;
  onToCurrencyChange: (currency: string) => void;
  onConvertedAmountChange: (amount: number) => void;
  onExchangeRateChange: (rate: number) => void;
}

export const EnterData = ({
  amount,
  fromCurrency,
  toCurrency,
  onAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onConvertedAmountChange,
  onExchangeRateChange,
}: EnterDataProps) => {
  const savedSettings = loadConversionSettings();

  const [localAmount, setLocalAmount] = useState<number | null>(savedSettings?.amount ?? 1);
  const [debouncedAmount, setDebouncedAmount] = useState<number | null>(savedSettings?.amount ?? 1);

  const ratesData = useAppSelector(selectActualRatesData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAmount(localAmount);
    }, 500);

    return () => clearTimeout(timer);
  }, [localAmount]);

  const onChange: InputNumberProps['onChange'] = (value) => {
    const newAmount = value as number | null;
    setLocalAmount(newAmount);
    onAmountChange(newAmount);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];
    const allowedChars = /[0-9.,]/;

    if (allowedKeys.includes(e.key)) {
      return;
    }

    if (!allowedChars.test(e.key)) {
      e.preventDefault();
    }
  };

  const parser = (value: string | undefined) => {
    if (!value) return '';
    const cleaned = value.replace(/[^\d.,]/g, '');
    return cleaned.replace(/,/g, '.');
  };

  const formatter = (value: number | string | undefined) => {
    if (!value) return '';
    return String(value);
  };

  const handleSwapCurrencies = () => {
    onFromCurrencyChange(toCurrency);
    onToCurrencyChange(fromCurrency);
  };

  useEffect(() => {
    saveConversionSettings(debouncedAmount, fromCurrency, toCurrency);
  }, [fromCurrency]);

  useEffect(() => {
    saveConversionSettings(debouncedAmount, fromCurrency, toCurrency);
  }, [toCurrency]);

  useEffect(() => {
    if (debouncedAmount && fromCurrency && toCurrency) {
      saveConversionSettings(debouncedAmount, fromCurrency, toCurrency);

      if (ratesData?.rates) {
        const rate = ratesData.rates[toCurrency] / ratesData.rates[fromCurrency];
        const convertedAmount = debouncedAmount * rate;

        onExchangeRateChange(rate);
        onConvertedAmountChange(convertedAmount);
      }
    }
  }, [
    debouncedAmount,
    fromCurrency,
    toCurrency,
    ratesData,
    onExchangeRateChange,
    onConvertedAmountChange,
  ]);

  useEffect(() => {
    if (!ratesData?.rates) return;

    const availableCodes = Object.keys(ratesData.rates);

    if (!availableCodes.includes(fromCurrency)) {
      const fallback = availableCodes[0] || 'USD';
      onFromCurrencyChange(fallback);
    }

    if (!availableCodes.includes(toCurrency)) {
      const fallback = availableCodes[1] || 'EUR';
      onToCurrencyChange(fallback);
    }
  }, [ratesData]);

  return (
    <Card style={{ borderRadius: 16 }}>
      <Flex vertical gap={24}>
        <Flex vertical gap={8}>
          <Typography.Text strong>Amount</Typography.Text>
          <InputNumber
            min={0}
            value={localAmount}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            parser={parser}
            formatter={formatter}
            placeholder="Enter amount"
            style={{ width: '100%' }}
            precision={2}
            size="large"
          />
        </Flex>

        <Flex align="center" gap={16}>
          <Flex vertical gap={8} style={{ flex: 1 }}>
            <Typography.Text strong>From</Typography.Text>
            <CurrencyCard value={fromCurrency} onChange={onFromCurrencyChange} />
          </Flex>

          <Button
            type="text"
            icon={<SwapOutlined style={{ transform: 'rotate(180deg)' }} />}
            onClick={handleSwapCurrencies}
            style={{
              alignSelf: 'flex-end',
              fontSize: '20px',
              color: '#666',
              marginBottom: 20,
            }}
          />

          <Flex vertical gap={8} style={{ flex: 1 }}>
            <Typography.Text strong>To</Typography.Text>
            <CurrencyCard value={toCurrency} onChange={onToCurrencyChange} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
