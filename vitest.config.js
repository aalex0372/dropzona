/** @type {import('vitest').UserConfig} */
export default {
  test: {
    environment: 'node',
    include: ['**/*.test.js'],
    globals: false
  }
};
