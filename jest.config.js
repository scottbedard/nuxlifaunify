module.exports = {
  'roots': [
    '<rootDir>/functions'
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts)',
    '**/?(*.)+(spec|test).+(ts)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
};
