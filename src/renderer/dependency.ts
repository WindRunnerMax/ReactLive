import type { Sandbox } from "@/utils/constant";
import { getUniqueId } from "laser-utils";

export const renderWithDependency = (code: string, dependency: Sandbox) => {
  const id = getUniqueId();
  dependency.___BRIDGE___ = {};
  const bridge = dependency.___BRIDGE___ as Record<string, unknown>;
  const fn = new Function(
    "dependency",
    `with(dependency) { 
      function fn(){  "use strict"; return (${code.trim()}); };
      ___BRIDGE___["${id}"] = fn.call(null);
    }
    `
  );
  fn.call(null, dependency);
  return bridge[id];
};
