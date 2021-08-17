import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
      '^@config/(.*)': '<rootDir>/src/config/$1',
      '^@graphql/(.*)': '<rootDir>/src/graphql/$1',
      '^@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
      '^@lib/(.*)': '<rootDir>/src/lib/$1',
      '^@mocks/(.*)': '<rootDir>/src/mocks/$1',
      '^@services/(.*)': '<rootDir>/src/services/$1'
    }
  }
}
