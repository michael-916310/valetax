import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Flex, Input, List, Modal, Typography } from 'antd';
import { useMemo, useState } from 'react';
import type { Currency } from 'shared/constants/currencies';

const { Text } = Typography;

interface CurrencySelectModalProps {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (currencyCode: string) => void;
  currencies: Currency[];
}

export const CurrencySelectModal = ({
  open,
  onClose,
  value,
  onChange,
  currencies,
}: CurrencySelectModalProps) => {
  const [searchText, setSearchText] = useState('');

  const filteredCurrencies = useMemo(() => {
    if (!searchText) return currencies;

    const searchLower = searchText.toLowerCase();
    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(searchLower) ||
        currency.name.toLowerCase().includes(searchLower) ||
        currency.symbolNative.toLowerCase().includes(searchLower),
    );
  }, [currencies, searchText]);

  const handleCurrencySelect = (currencyCode: string) => {
    onChange(currencyCode);
    onClose();
  };

  return (
    <Modal
      title="Select currency"
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      style={{ top: 20 }}
    >
      <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        Choose a currency from the list below or use the search bar to find a specific currency.
      </Text>

      <Input
        placeholder="Input"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <List
        dataSource={filteredCurrencies}
        renderItem={(currency) => (
          <List.Item
            onClick={() => handleCurrencySelect(currency.code)}
            style={{
              cursor: 'pointer',
              padding: '12px 16px',
              backgroundColor: value === currency.code ? '#f0f0f0' : 'transparent',
              borderRadius: 8,
              marginBottom: 4,
            }}
            onMouseEnter={(e) => {
              if (value !== currency.code) {
                e.currentTarget.style.backgroundColor = '#fafafa';
              }
            }}
            onMouseLeave={(e) => {
              if (value !== currency.code) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Flex align="center" justify="space-between" style={{ width: '100%' }}>
              <Flex align="center" gap={12}>
                <Avatar
                  style={{
                    backgroundColor: '#1890ff',
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                  size={32}
                >
                  {currency.symbolNative}
                </Avatar>
                <Flex vertical gap={0}>
                  <Text strong style={{ fontSize: 16 }}>
                    {currency.code}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {currency.name}
                  </Text>
                </Flex>
              </Flex>

              {value === currency.code && (
                <CheckOutlined style={{ color: '#1890ff', fontSize: 16 }} />
              )}
            </Flex>
          </List.Item>
        )}
        style={{ maxHeight: 400, overflowY: 'auto' }}
      />
    </Modal>
  );
};
