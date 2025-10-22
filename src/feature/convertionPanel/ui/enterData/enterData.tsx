import { SwapOutlined } from '@ant-design/icons';
import { Button, Card, Flex, InputNumber, InputNumberProps, Typography } from 'antd';
import { useState } from 'react';
import { CurrencyCard } from 'shared/ui';

export const EnterData = () => {
  console.log('EnterDataForm');

  const [amount, setAmount] = useState<number | null>(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
    setAmount(value as number | null);
  };

  const parser = (value: string | undefined) => {
    if (!value) return '';
    // Убираем все, кроме цифр, точки и запятой
    const cleaned = value.replace(/[^\d.,]/g, '');
    // Заменяем запятую на точку
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

  return (
    <Card style={{ borderRadius: 16 }}>
      <Flex vertical gap={24}>
        <Flex vertical gap={8}>
          <Typography.Text strong>Amount</Typography.Text>
          <InputNumber
            min={0}
            value={amount}
            onChange={onChange}
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
            icon={<SwapOutlined style={{ transform: 'rotate(90deg)' }} />}
            onClick={handleSwapCurrencies}
            style={{
              alignSelf: 'flex-end',
              marginBottom: '8px',
              fontSize: '20px',
              color: '#666',
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
