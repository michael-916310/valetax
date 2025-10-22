import { ClockCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useAppSelector } from 'app/providers/StoreProvider';
import { selectRatesLastUpdated, selectRatesStatus } from 'entities/rates';
import { STATUS_INFO_MAP } from '../model';

const { Title, Paragraph, Text } = Typography;

export const InfoBar = () => {
  const status = useAppSelector(selectRatesStatus);
  const lastUpdated = useAppSelector(selectRatesLastUpdated);
  const formatedLastUpdated = lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A';

  const statusInfo = STATUS_INFO_MAP[status] || STATUS_INFO_MAP.pending;

  return (
    <Flex vertical={false} align="center" gap={16}>
      <Button variant="outlined" color={statusInfo.color} danger={true} icon={statusInfo.icon}>
        <Text
          type={status === 'success' ? 'success' : status === 'error' ? 'danger' : 'secondary'}
          strong
        >
          {statusInfo.text}
        </Text>
      </Button>

      <Flex gap={4}>
        <ClockCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
        <Text type="secondary">Last updated: {formatedLastUpdated}</Text>
      </Flex>
    </Flex>
  );
};
