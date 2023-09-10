import { DEFAULT_SWC_OPTIONS, SWCOptions } from "@/utils/constant";
import initSwc, { transformSync } from "@swc/wasm-web";

let loaded = false;

export const prepare = async () => {
  if (!loaded) {
    await initSwc();
  }
  loaded = true;
};

export const compileWithSWC = async (code: string, options?: SWCOptions) => {
  if (!loaded) {
    await prepare();
  }
  const result = transformSync(code, { ...DEFAULT_SWC_OPTIONS, ...options });
  return result.code;
};

// https://swc.rs/playground
// https://swc.rs/docs/usage/wasm
