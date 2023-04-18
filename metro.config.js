const { getDefaultConfig } = require('expo/metro-config')

module.exports = (async () => {
    const {
        resolver: { sourceExts },
    } = await getDefaultConfig(__dirname)

    return {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false,
                },
            }),
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },
        resolver: {
            assetsExts: ['cjs', 'bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'svg', 'webp'],
            sourceExts: [...sourceExts, 'svg', 'json', 'jsx', 'js', 'ts', 'tsx', 'cjs'],
        },
    }
})()
