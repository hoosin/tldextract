module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '\\.(txt)$': 'jest-raw-loader',
  },
  moduleFileExtensions: ['ts', 'js', 'txt'],  
  transformIgnorePatterns: ['/node_modules/'],
};
