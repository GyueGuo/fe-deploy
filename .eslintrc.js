module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true,
    es6: true,
    // mocha: true,
    // jest: true,
    // jasmine: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  plugins: [
    'react-hooks',
    'jsx-a11y',
    'babel',
    'flowtype',
    'import',
  ],
  // settings: {
  //   polyfills: ['fetch', 'promises', 'url'],
  // },
};
