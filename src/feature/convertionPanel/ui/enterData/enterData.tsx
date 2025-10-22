import { Card, Flex, InputNumber, InputNumberProps, Typography } from 'antd';
import { CurrencyCard } from 'shared/ui';

export const EnterData = () => {
  console.log('EnterDataForm');

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
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

  return (
    <Card>
      <Flex vertical gap={8} style={{ marginBottom: 24 }}>
        <Typography.Text strong>Amount</Typography.Text>
        <InputNumber
          min={0}
          defaultValue={3}
          onChange={onChange}
          parser={parser}
          formatter={formatter}
          placeholder="Enter amount"
          style={{ width: '100%' }}
          precision={2}
          size="large"
        />
      </Flex>
      <Flex gap={12}>
        <Flex vertical gap={8} style={{ marginBottom: 24 }}>
          <Typography.Text strong>From</Typography.Text>
          <CurrencyCard />
        </Flex>

        <Flex vertical gap={8} style={{ marginBottom: 24 }}>
          <Typography.Text strong>To</Typography.Text>
          <CurrencyCard />
        </Flex>
      </Flex>
    </Card>
  );
};
