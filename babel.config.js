module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './assets',
          '@shared': './src/shared',
          '@typings': './types',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
