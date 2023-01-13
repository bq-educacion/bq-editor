import babel from "@rollup/plugin-babel";
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
      babel({
        babelHelpers: "bundled",
        plugins: ["transform-class-properties"],
      }),
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
