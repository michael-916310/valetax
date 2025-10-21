import { Button, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { increment, decrement, incrementByAmount } from 'entities/counter';

const { Title } = Typography;

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Space direction="vertical" size="middle">
      <Title level={2}>Counter: {count}</Title>
      <Space>
        <Button onClick={() => dispatch(increment())}>+1</Button>
        <Button onClick={() => dispatch(decrement())}>-1</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
      </Space>
    </Space>
  );
};
