import { Flex, Typography } from 'antd';

const { Title, Text } = Typography;

const NotFound = () => {
  return (
    <Flex vertical={true} align="center" justify="center" style={{ height: '100vh' }}>
      <Title level={1}>404</Title>
      <Text type="secondary">Страница не найдена</Text>
    </Flex>
  );
};

export default NotFound;
