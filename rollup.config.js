import json from "@rollup/plugin-json";
import sucrase from "@rollup/plugin-sucrase";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import tsConfig from "./tsconfig.json";
import packageJson from "./package.json";

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
        sourceMap: tsConfig.compilerOptions.sourceMap,
      }),
      json(),
      sucrase({
        exclude: ["node_modules/**"],
        transforms: ["typescript", "jsx"],
      }),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/types.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
