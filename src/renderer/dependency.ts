import { Sandbox } from "@/utils/constant";
import { getUniqueId } from "laser-utils";

export const renderWithDependency = (code: string, dependency: Sandbox) => {
  const id = getUniqueId();
  dependency.___BRIDGE___ = {};
  const bridge = dependency.___BRIDGE___ as Record<string, unknown>;
  const fn = new Function(
    "dependency",
    `with(dependency) { ___BRIDGE___["${id}"] = ${code.trim()}; }`
  );
  fn(dependency);
  return bridge[id];
};
