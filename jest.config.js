module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-.*)/)',
  ],
  moduleNameMapper: {
    '^react-native-keyboard-controller$': 'react-native-keyboard-controller/jest',
  },
};
