module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".storybook"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "no-sequences": "off",
    "no-undef": "off",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
