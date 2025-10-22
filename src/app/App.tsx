import { Flex, Spin } from 'antd';
import { AppRouter } from 'app/providers/router';
import { RatesPoller } from 'app/providers/StoreProvider/ui/RatesPoller';
import { Suspense } from 'react';

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <Flex justify="center" align="center" style={{ height: '100vh' }}>
            <Spin size="large" />
          </Flex>
        }
      >
        <AppRouter />
        <RatesPoller />
      </Suspense>
    </div>
  );
}

export default App;
