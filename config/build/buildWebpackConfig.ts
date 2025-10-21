import type {Configuration} from 'webpack';
import {BuildOptions} from './types/config';
import {BuildPlugins} from './buildPlugins';
import {BuildLoaders} from './buildLoaders';
import {BuildResolver} from './buildResolver';
import {buildDevServer} from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const {mode, paths, isDev} = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: BuildPlugins(options),
        module: {
            // Все что не JS обрабатываеся здесь
            rules: BuildLoaders(options),
        },
        resolve: BuildResolver(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
