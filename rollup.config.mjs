import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
    onwarn(warning, warn) {
      if (warning.code === "THIS_IS_UNDEFINED") return;
      warn(warning);
    },
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.rollup.esm.json",
        outputToFilesystem: true,
      }),
      json(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    onwarn(warning, warn) {
      if (warning.code === "THIS_IS_UNDEFINED") return;
      warn(warning);
    },
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.rollup.cjs.json",
        outputToFilesystem: true,
      }),
      json(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts()],
  },
];
