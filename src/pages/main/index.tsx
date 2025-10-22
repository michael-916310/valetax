import { Flex, Typography } from 'antd';
import { Counter } from 'feature/counter';
import { InfoBar } from 'feature/infoBar';

const { Title, Paragraph, Text } = Typography;

export const Main = () => {
  console.log('Page 1');

  return (
    <Flex vertical={true} align="center" style={{ height: '100vh' }}>
      <Paragraph>
        <Title level={2}>Currency converter</Title>
        <Text type="secondary">Get real-time exchange rates</Text>
      </Paragraph>

      <InfoBar />
      <Counter />
    </Flex>
  );
};
