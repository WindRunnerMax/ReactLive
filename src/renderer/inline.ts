import type { Sandbox } from "@/utils/constant";

export const renderWithInline = (code: string, dependency: Sandbox) => {
  const fn = new Function("dependency", `with(dependency) { return (${code.trim()})}`);
  return fn(dependency);
};
