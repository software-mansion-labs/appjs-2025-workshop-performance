const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const {withExpoAtlasWithoutExpo} = require('expo-atlas-without-expo');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
let config = {};

// config = {
//   transformer: {
//     babelTransformerPath: require.resolve(
//       'react-native-svg-transformer/react-native',
//     ),
//   },
//   resolver: {
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg'],
//   },
// };

config = mergeConfig(getDefaultConfig(__dirname), config);

// config = withExpoAtlasWithoutExpo(config);

module.exports = config;
