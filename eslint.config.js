const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const reactPlugin = require("eslint-plugin-react");

module.exports = [
  {
    ignores: [
      "dist/**",
      "types/**",
      ".rollup.cache/**",
      ".storybook/**",
      "eslint.config.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-sequences": "off",
      "no-undef": "off",
      "react/prop-types": "off",
    },
  },
];
