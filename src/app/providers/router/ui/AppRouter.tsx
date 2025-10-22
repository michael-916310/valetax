import { Flex, Spin } from 'antd';
import { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: RouteProps) => {
    const element = (
      <Suspense
        fallback={
          <Flex justify="center" align="center" style={{ height: '100vh' }}>
            <Spin size="large" />
          </Flex>
        }
      >
        {route.element}
      </Suspense>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});

export { AppRouter };
