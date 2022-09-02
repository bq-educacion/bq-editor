import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import tsConfig from './tsconfig.json';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        sourceMap: tsConfig.compilerOptions.sourceMap
      }),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/types.d.ts", format: "esm" }],
    plugins: [dts()]
  }
];
