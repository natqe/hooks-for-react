/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^lodash-es$": "lodash"
  },
  collectCoverage: true,
  roots: [`test`]
}