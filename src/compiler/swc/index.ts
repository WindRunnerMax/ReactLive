import { DEFAULT_SWC_OPTIONS, SWCOptions } from "@/utils/constant";
import type * as SWCType from "@swc/wasm-web";

let loaded = false;
let SWC: typeof SWCType | null = null;

export const prepare = async () => {
  if (!loaded || !SWC) {
    await import("@swc/wasm-web").then(swc => {
      SWC = swc;
      const init = swc.default;
      return init();
    });
  }
  loaded = true;
};

export const compileWithSWC = async (code: string, options?: SWCOptions) => {
  if (!loaded || !SWC) {
    await prepare();
  }
  if (SWC) {
    const result = SWC.transformSync(code, { ...DEFAULT_SWC_OPTIONS, ...options });
    return result.code;
  }
  return "";
};

// https://swc.rs/playground
// https://swc.rs/docs/usage/wasm
