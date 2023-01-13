import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-import-css";
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
        exports: "named",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    onwarn(warning, warn) {
      if (warning.code === "THIS_IS_UNDEFINED") return;
      warn(warning);
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        sourceMap: tsConfig.compilerOptions.sourceMap,
        exclude: ["node_modules/**"],
      }),
      css(),
      json(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts()],
    external: [
      "remirror/styles/extension-code-block.css",
      "remirror/styles/extension-placeholder.css",
    ],
  },
];
