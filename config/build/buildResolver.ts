import type {ResolveOptions} from 'webpack';
import {BuildOptions} from './types/config';

export function BuildResolver(options: BuildOptions): ResolveOptions {
    return {
        // не указывать расширение при импорте
        extensions: ['.tsx', '.ts', '.js'],
        // настройка абсолютных импортов
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {},
    };
}
