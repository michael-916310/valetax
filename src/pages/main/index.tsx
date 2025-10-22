import { Flex, Typography } from 'antd';
import { InfoBar } from 'feature/infoBar';

const { Title, Paragraph, Text } = Typography;

export const Main = () => {
  console.log('Page 1');

  return (
    <Flex vertical={true} align="center" style={{ height: '100vh' }}>
      <Paragraph style={{ textAlign: 'center', marginBottom: 30 }}>
        <Title level={2} style={{ marginBottom: 10 }}>
          Currency converter
        </Title>
        <Text type="secondary">Get real-time exchange rates</Text>
      </Paragraph>

      <InfoBar />
    </Flex>
  );
};
