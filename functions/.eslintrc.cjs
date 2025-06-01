module.exports = {
  env: {
    node: true, 
    es6: true,
    commonjs: true,
    es2021: true,
  },
  
  parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
