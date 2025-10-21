import type {RuleSetRule} from 'webpack';
import {BuildOptions} from './types/config';
import {buildCssLoader} from './loaders/buildCssLoader';
import {buildBabelLoader} from './loaders/buildBabelLoader';

export function BuildLoaders(options: BuildOptions): RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const codeBabelLoader = buildBabelLoader({...options, isTsx: false});
    const tsxCodeBabelLoader = buildBabelLoader({...options, isTsx: true});

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const cssLoaders = buildCssLoader(options.isDev);

    return [fileLoader, svgLoader, codeBabelLoader, tsxCodeBabelLoader, cssLoaders];
}
