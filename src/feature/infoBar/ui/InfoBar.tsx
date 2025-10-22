import { Button, Flex, Typography } from 'antd';
import { useAppSelector } from 'app/providers/StoreProvider';
import { selectRatesStatus } from 'entities/rates';
import { STATUS_INFO_MAP } from '../model';

const { Title, Paragraph, Text } = Typography;

export const InfoBar = () => {
  const status = useAppSelector(selectRatesStatus);

  const statusInfo = STATUS_INFO_MAP[status] || STATUS_INFO_MAP.pending;

  return (
    <Flex vertical={true} align="center" style={{ height: '100vh' }}>
      <Button
        variant="outlined"
        color={statusInfo.color}
        onClick={() => {
          console.log('Refresh');
        }}
        icon={statusInfo.icon}
      >
        <Text
          type={status === 'success' ? 'success' : status === 'error' ? 'danger' : 'secondary'}
          strong
        >
          {statusInfo.text}
        </Text>
      </Button>
    </Flex>
  );
};
