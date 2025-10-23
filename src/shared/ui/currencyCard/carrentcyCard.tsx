import { Avatar, Card, Flex, Typography } from 'antd';
import { useState } from 'react';
import { CURRENCIES, getCurrencyByCode } from 'shared/constants/currencies';
import { CurrencySelectModal } from '../currencySelectModal/CurrencySelectModal';

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

  const selectedCurrency = getCurrencyByCode(value);

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const handleCurrencySelect = (currencyCode: string) => {
    onChange(currencyCode);
    setModalOpen(false);
  };

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

      <CurrencySelectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        value={value}
        onChange={handleCurrencySelect}
        currencies={CURRENCIES}
      />
    </>
  );
};
