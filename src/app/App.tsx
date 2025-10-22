import React, { Suspense } from 'react';
import { AppRouter } from 'app/providers/router';
import { Button, Space } from 'antd';
import { RatesPoller } from 'app/providers/StoreProvider/ui/RatesPoller';

function App() {
  return (
    <div>
      <Suspense fallback="">
        <AppRouter />
        <RatesPoller />
      </Suspense>
    </div>
  );
}

export default App;
