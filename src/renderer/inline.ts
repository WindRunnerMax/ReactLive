import { Sandbox } from "@/utils/constant";

export const renderWithInline = (code: string, dependency: Sandbox) => {
  return new Function("dependency", `return (${code.trim()})`)(dependency);
};
