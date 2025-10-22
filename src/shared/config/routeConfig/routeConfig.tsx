import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const Main = lazy(() => import('pages/main').then((module) => ({ default: module.default })));
const NotFound = lazy(() =>
  import('pages/not-found').then((module) => ({ default: module.default })),
);

export enum AppRoutes {
  MAIN = 'main',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <Main />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFound />,
  },
};
