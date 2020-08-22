module.exports = {
  globalSetup: './scripts/jest-setup.js',
  globalTeardown: './scripts/jest-teardown.js',
  roots: [
    '<rootDir>/functions'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts)',
    '**/?(*.)+(spec|test).+(ts)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
};
