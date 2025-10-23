import { Avatar, Card, Flex, Spin, Typography } from 'antd';
import { useAppSelector } from 'app/providers/StoreProvider';
import { selectActualRatesData } from 'entities/rates';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { getCurrencyByCode } from 'shared/constants/currencies';
import { enrichCurrenciesWithRates } from 'shared/utils/enrichCurrencies';

const CurrencySelectModal = lazy(() =>
  import('../currencySelectModal/CurrencySelectModal').then((m) => ({
    default: m.CurrencySelectModal,
  })),
);

const { Text } = Typography;

interface CurrencyCardProps {
  value: string;
  onChange: (currencyCode: string) => void;
  placeholder?: string;
}

export const CurrencyCard = ({
  value,
  onChange,
  placeholder = 'Select currency',
}: CurrencyCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const ratesData = useAppSelector(selectActualRatesData);
  const selectedCurrency = getCurrencyByCode(value);

  const enrichedCurrencies = useMemo(() => {
    if (!ratesData?.rates) {
      const fallbackCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
      return fallbackCodes
        .map((code) => getCurrencyByCode(code))
        .filter(Boolean)
        .map((currency) => ({
          code: currency!.code,
          rate: 1,
          name: currency!.name,
          symbolNative: currency!.symbolNative,
          flagSrc: currency!.flagSrc,
          symbol: currency!.symbol,
        }));
    }
    return enrichCurrenciesWithRates(ratesData.rates);
  }, [ratesData]);

  const handleCardClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCurrencySelect = useCallback(
    (currencyCode: string) => {
      onChange(currencyCode);
      setModalOpen(false);
    },
    [onChange],
  );

  return (
    <>
      <Card
        hoverable
        onClick={handleCardClick}
        style={{
          cursor: 'pointer',
          borderRadius: 8,
          border: '1px solid #d9d9d9',
          width: '255px',
          height: '70px',
        }}
        bodyStyle={{ padding: '12px 16px' }}
      >
        <Flex align="center" gap={12}>
          <Avatar
            style={{
              backgroundColor: '#1890ff',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              flexShrink: 0,
            }}
            size={32}
          >
            {selectedCurrency?.symbolNative || '?'}
          </Avatar>
          <Flex vertical gap={0}>
            <Text strong style={{ fontSize: 16 }}>
              {selectedCurrency?.code || placeholder}
            </Text>
            <Text type="secondary" style={{ fontSize: 12, maxWidth: '190px' }} ellipsis>
              {selectedCurrency?.name || ''}
            </Text>
          </Flex>
        </Flex>
      </Card>

      {modalOpen && (
        <Suspense fallback={<Spin />}>
          <CurrencySelectModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            value={value}
            onChange={handleCurrencySelect}
            currencies={enrichedCurrencies}
          />
        </Suspense>
      )}
    </>
  );
};
