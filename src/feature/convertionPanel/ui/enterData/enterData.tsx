import { SwapOutlined } from '@ant-design/icons';
import { Button, Card, Flex, InputNumber, InputNumberProps, Typography } from 'antd';
import { useAppSelector } from 'app/providers/StoreProvider';
import { selectActualRatesData } from 'entities/rates';
import { useEffect, useState } from 'react';
import { CurrencyCard } from 'shared/ui';
import { loadConversionSettings, saveConversionSettings } from 'shared/utils/conversionStorage';

export const EnterData = () => {
  const savedSettings = loadConversionSettings();

  const [localAmount, setLocalAmount] = useState<number | null>(savedSettings?.amount ?? 1);
  const [debouncedAmount, setDebouncedAmount] = useState<number | null>(savedSettings?.amount ?? 1);
  const [fromCurrency, setFromCurrency] = useState(savedSettings?.fromCurrency ?? 'USD');
  const [toCurrency, setToCurrency] = useState(savedSettings?.toCurrency ?? 'EUR');

  const ratesData = useAppSelector(selectActualRatesData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAmount(localAmount);
    }, 500);

    return () => clearTimeout(timer);
  }, [localAmount]);

  const onChange: InputNumberProps['onChange'] = (value) => {
    setLocalAmount(value as number | null);
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
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
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
      console.log('Converting:', debouncedAmount, fromCurrency, 'to', toCurrency);
    }
  }, [debouncedAmount, fromCurrency, toCurrency]);

  useEffect(() => {
    if (!ratesData?.rates) return;

    const availableCodes = Object.keys(ratesData.rates);

    if (!availableCodes.includes(fromCurrency)) {
      const fallback = availableCodes[0] || 'USD';
      setFromCurrency(fallback);
    }

    if (!availableCodes.includes(toCurrency)) {
      const fallback = availableCodes[1] || 'EUR';
      setToCurrency(fallback);
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
            <CurrencyCard value={fromCurrency} onChange={setFromCurrency} />
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
            <CurrencyCard value={toCurrency} onChange={setToCurrency} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
