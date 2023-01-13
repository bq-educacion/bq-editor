import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import css from "rollup-plugin-import-css";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
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
      peerDepsExternal(),
      typescript({
        sourceMap: tsConfig.compilerOptions.sourceMap,
      }),
      css(),
      json(),
    ],
    external: [
      "refractor/lang/css.js",
      "refractor/lang/javascript.js",
      "refractor/lang/json.js",
      "refractor/lang/markdown.js",
      "refractor/lang/typescript.js",
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
