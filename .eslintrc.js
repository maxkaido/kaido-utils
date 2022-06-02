module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
    "jest/globals": true,
  },
  plugins: ["@typescript-eslint", "jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // "@nuxtjs/eslint-config-typescript",
    "prettier",
  ],
};
