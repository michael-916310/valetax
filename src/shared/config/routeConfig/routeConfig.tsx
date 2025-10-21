import {RouteProps} from 'react-router-dom';
import {Main} from "pages/main";


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
        element: <Main/>,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <div>not found </div>,
    },
};
