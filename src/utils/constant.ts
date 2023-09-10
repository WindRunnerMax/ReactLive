import type { Options as SucraseOptions } from "sucrase";
import type { Options as SWCOptions } from "@swc/wasm-web";
import type { TransformOptions as BabelOptions } from "babel-standalone";

export type { SucraseOptions, SWCOptions, BabelOptions };

export const DEFAULT_BABEL_OPTION: BabelOptions = {
  presets: ["stage-3", "react", "es2015"],
  plugins: [],
};
export const DEFAULT_SWC_OPTIONS: SWCOptions = {
  jsc: {
    parser: { syntax: "ecmascript", jsx: true },
  },
};
export const DEFAULT_SUCRASE_OPTIONS: SucraseOptions = {
  transforms: ["jsx"],
  production: true,
};
