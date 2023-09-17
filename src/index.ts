export { compileWithBabel } from "./compiler/babel";
export { compileWithSucrase } from "./compiler/sucrase";
export { renderWithInline } from "./renderer/inline";
export { renderWithDependency } from "./renderer/dependency";
export { renderWithIframe } from "./renderer/iframe";
export { BabelPluginLimit } from "./compiler/babel/babel-plugin-limit";
export type { SucraseOptions, SWCOptions, BabelOptions, Sandbox } from "./utils/constant";
export {
  DEFAULT_BABEL_OPTION,
  DEFAULT_SWC_OPTIONS,
  DEFAULT_SUCRASE_OPTIONS,
  BUILD_IN_SANDBOX_KEY,
} from "./utils/constant";
export { withSandbox } from "./utils/sandbox";

// https://github.com/iotaledger/identity.rs/issues/338
// use: import { prepare, compileWithSWC } from "react-live-runtime/dist/compiler/swc";
