import { BabelOptions, DEFAULT_BABEL_OPTION } from "@/utils/constant";
import { transform } from "babel-standalone";

export const compileWithBabel = function (code: string, options?: BabelOptions) {
  const result = transform(code, { ...DEFAULT_BABEL_OPTION, ...options });
  return result.code;
};

// https://babel.dev/repl
// https://babel.dev/docs/babel-standalone
