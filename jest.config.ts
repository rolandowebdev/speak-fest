import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/utils/api$': '<rootDir>/src/utils/api.ts',
  },
}

export default createJestConfig(config)
