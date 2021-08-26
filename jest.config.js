/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: `src`,
  moduleNameMapper: {
    "^lodash-es$": "lodash"
  },
  collectCoverage: true,
};