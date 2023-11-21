const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: '.',
});

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  collectCoverage: true,
  collectCoverageFrom: ['./components/**', './pages/**', '!./pages/_app.tsx'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|ico|jpeg|png|gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
