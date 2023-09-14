import type { Options as SucraseOptions } from "sucrase";
import type { Options as SWCOptions } from "@swc/wasm-web";
import type { TransformOptions as BabelOptions } from "babel-standalone";

export type { SucraseOptions, SWCOptions, BabelOptions };
export type Sandbox = Record<string | symbol, unknown>;

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

export const BUILD_IN_SANDBOX_KEY = ["___BRIDGE___"];
