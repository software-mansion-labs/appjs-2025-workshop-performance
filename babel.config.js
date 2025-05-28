const ReactCompilerConfig = {
  target: '19', // '17' | '18' | '19'
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['babel-plugin-react-compiler', ReactCompilerConfig],
    'react-native-worklets/plugin',
    ['babel-plugin-inline-import', {extensions: ['.svg']}],
  ],
};
