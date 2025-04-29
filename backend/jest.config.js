module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  setupFiles: ['dotenv/config'],
  testTimeout: 30000
}; 