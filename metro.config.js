const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {withExpoAtlasWithoutExpo} = require('expo-atlas-without-expo');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = withExpoAtlasWithoutExpo(
  mergeConfig(getDefaultConfig(__dirname), config),
);
