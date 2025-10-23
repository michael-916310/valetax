import { ClockCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Flex, Grid, Typography } from 'antd';
import { useAppSelector } from 'app/providers/StoreProvider';
import { selectRatesLastUpdated, selectRatesStatus } from 'entities/rates';
import { useCallback, useRef, useState } from 'react';
import { BLUE_COLOR } from 'shared';
import { useGetRatesQuery } from 'shared/api/ratesApi';
import { STATUS_INFO_MAP } from '../model';

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

export const InfoBar = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const { refetch } = useGetRatesQuery();
  const status = useAppSelector(selectRatesStatus);
  const lastUpdated = useAppSelector(selectRatesLastUpdated);
  const formatedLastUpdated = lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A';

  const statusInfo = STATUS_INFO_MAP[status] || STATUS_INFO_MAP.pending;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsRefreshing(true);

    refetch();

    debounceTimerRef.current = setTimeout(() => {
      setIsRefreshing(false);
      debounceTimerRef.current = null;
    }, 2000);
  }, [isRefreshing, refetch]);

  return (
    <Flex vertical={isMobile} align="center" gap={16} style={{ marginBottom: 30 }}>
      <Button variant="outlined" color={statusInfo.color} icon={statusInfo.icon}>
        <Text
          type={status === 'success' ? 'success' : status === 'error' ? 'danger' : 'secondary'}
          strong
        >
          {statusInfo.text}
        </Text>
      </Button>

      <Flex gap={4}>
        <ClockCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
        <Text type="secondary">
          {status === 'success' ? 'Last updated: ' : 'Using cached rates from: '}
          {formatedLastUpdated}
        </Text>
      </Flex>

      <Button
        variant="outlined"
        color={'blue'}
        icon={<RedoOutlined style={{ color: BLUE_COLOR }} />}
        onClick={handleRefresh}
        loading={isRefreshing}
        disabled={isRefreshing}
      >
        <Text style={{ color: BLUE_COLOR }} strong>
          {isRefreshing ? 'Refreshing...' : 'Refresh rates'}
        </Text>
      </Button>
    </Flex>
  );
};
