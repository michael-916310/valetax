import { ExclamationCircleOutlined, LoadingOutlined, WifiOutlined } from '@ant-design/icons';
import type { FetchStatus } from 'entities/rates';

export const STATUS_INFO_MAP = {
  success: {
    color: 'green',
    text: 'Online',
    icon: <WifiOutlined />,
  },
  error: {
    color: 'red',
    text: 'Error',
    icon: <ExclamationCircleOutlined />,
  },
  pending: {
    color: 'blue',
    text: 'Loading',
    icon: <LoadingOutlined />,
  },
} as const satisfies Record<FetchStatus, { color: string; text: string; icon: JSX.Element }>;
