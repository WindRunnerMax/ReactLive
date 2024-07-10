import type { SucraseOptions } from "@/utils/constant";
import { DEFAULT_SUCRASE_OPTIONS } from "@/utils/constant";
import { transform } from "sucrase";

export const compileWithSucrase = (code: string, options?: SucraseOptions) => {
  const result = transform(code, { ...DEFAULT_SUCRASE_OPTIONS, ...options });
  return result.code;
};

// https://sucrase.io/
// https://github.com/alangpierce/sucrase
