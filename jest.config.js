module.exports = {
  roots: [
    '<rootDir>/tests'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts)',
    '**/?(*.)+(spec).+(ts)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
};
