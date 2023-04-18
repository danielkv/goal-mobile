module.exports = function (api) {
    api.cache(true)

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './src/common/components',
                        '@routes': './src/infra/config/routes',
                        '@types': './src/common/types',
                        '@models': './src/common/models',
                        '@utils': './src/common/utils',
                        '@common': './src/common',
                        '@useCases': './src/domain/useCases',
                        '@contexts': './src/domain/contexts',
                        '@assets': './src/assets',
                        '@view': './src/view',
                    },
                },
            ],
        ],
    }
}
