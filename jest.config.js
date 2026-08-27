module.exports = {
  preset: '@react-native/jest-preset',

  transformIgnorePatterns: [
    'node_modules/(?!(' +
      'react-native' +
      '|@react-native' +
      '|@react-native-async-storage' +
      '|@react-navigation' +
      '|react-redux' +
      '|redux-persist' +
      '|@reduxjs' +
      '|immer' +
      ')/)',
  ],

  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '<rootDir>/__mocks__/asyncStorage.js',
  },
};