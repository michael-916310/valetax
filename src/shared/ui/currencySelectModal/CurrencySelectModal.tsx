import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Flex, Input, List, Modal, Typography } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);

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

  useEffect(() => {
    if (open) {
      const selectedIndex = currencies.findIndex((c) => c.code === value);
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      setSearchText('');

      // Устанавливаем фокус на input с небольшой задержкой для корректной работы
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open, value, currencies]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchText]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => Math.min(prev + 1, filteredCurrencies.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCurrencies[highlightedIndex]) {
            handleCurrencySelect(filteredCurrencies[highlightedIndex].code);
          }
          break;
        case 'Home':
          e.preventDefault();
          setHighlightedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setHighlightedIndex(filteredCurrencies.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredCurrencies, highlightedIndex]);

  useEffect(() => {
    const highlightedElement = listRef.current?.querySelector(
      `[data-index="${highlightedIndex}"]`,
    ) as HTMLElement;

    if (highlightedElement) {
      highlightedElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightedIndex]);

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
        ref={inputRef}
        placeholder="Input"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <List
        ref={listRef}
        dataSource={filteredCurrencies}
        renderItem={(currency, index) => {
          const isSelected = value === currency.code;
          const isHighlighted = index === highlightedIndex;

          return (
            <List.Item
              data-index={index}
              onClick={() => handleCurrencySelect(currency.code)}
              onMouseEnter={() => setHighlightedIndex(index)}
              style={{
                cursor: 'pointer',
                padding: '12px 16px',
                backgroundColor: isSelected ? '#f0f0f0' : isHighlighted ? '#e6f7ff' : 'transparent',
                borderRadius: 8,
                marginBottom: 4,
                border: isHighlighted ? '2px solid #1890ff' : '2px solid transparent',
                transition: 'all 0.2s ease',
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
          );
        }}
        style={{ maxHeight: 400, overflowY: 'auto' }}
      />
    </Modal>
  );
};
