import {BuildOptions} from '../types/config';

interface Props extends BuildOptions {
    isTsx?: boolean;
}

export function buildBabelLoader({isDev, isTsx}: Props) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    ['@babel/plugin-transform-typescript', {
                        isTSX: isTsx,
                    }]
                ].filter(Boolean),
            },
        },
    };
}
