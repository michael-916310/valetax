import { Card, Divider, Flex, Typography } from 'antd';
import { getCurrencyByCode } from 'shared/constants/currencies';

const { Title, Text } = Typography;

interface ConversionResultProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: number;
  exchangeRate: number;
}

export const ConversionResult = ({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  exchangeRate,
}: ConversionResultProps) => {
  const toCurrencyData = getCurrencyByCode(toCurrency);
  const symbol = toCurrencyData?.symbolNative || toCurrency;
  const inverseRate = 1 / exchangeRate;

  return (
    <Card style={{ borderRadius: 16 }}>
      <Flex vertical gap={16}>
        <Title level={5} style={{ margin: 0 }}>
          Conversion result
        </Title>

        <Flex vertical align="center" gap={4}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', lineHeight: 1 }}>
            {symbol}
            {convertedAmount.toFixed(2)}
          </Text>
          <Text type="secondary" style={{ fontSize: 14 }}>
            {amount} {fromCurrency} =
          </Text>
        </Flex>

        <Divider style={{ margin: '8px 0' }} />

        <Flex justify="space-between" align="center">
          <Text>Exchange Rate</Text>
          <Text strong>
            1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
          </Text>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text>Inverse Rate</Text>
          <Text strong>
            1 {toCurrency} = {inverseRate.toFixed(6)} {fromCurrency}
          </Text>
        </Flex>

        <Divider style={{ margin: '8px 0' }} />

        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text type="secondary" style={{ fontSize: 12 }}>
            Rates are for informational purposes only and may not reflect real-time market rates
          </Text>
        </div>
      </Flex>
    </Card>
  );
};
