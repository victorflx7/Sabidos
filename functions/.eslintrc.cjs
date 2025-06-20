module.exports = {
    root: true,
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
    "plugin:node/recommended"
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
     "no-console": "off",
    "node/no-unsupported-features/es-syntax": "off"
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
