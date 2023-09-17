import { Sandbox } from "@/utils/constant";
import { getUniqueId } from "laser-utils";

export const withIframeSandbox = (win: Record<string | symbol, unknown>, proto: Sandbox) => {
  const sandbox = Object.create(proto);
  return new Proxy(sandbox, {
    get(_, key) {
      return sandbox[key] || win[key];
    },
    has: () => true,
    set(_, key, newValue) {
      sandbox[key] = newValue;
      return true;
    },
  });
};

export const renderWithIframe = (code: string, dependency: Sandbox) => {
  const id = getUniqueId();
  dependency.___BRIDGE___ = {};
  const bridge = dependency.___BRIDGE___ as Record<string, unknown>;
  const iframe = document.createElement("iframe");
  iframe.src = "about:blank";
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "-10000px";
  iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
  document.body.appendChild(iframe);
  const win = iframe.contentWindow;
  document.body.removeChild(iframe);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sandbox = withIframeSandbox(win || {}, dependency);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fn = new win.Function(
    "dependency",
    `with(dependency) { 
      function fn(){  "use strict"; return (${code.trim()}); };
      ___BRIDGE___["${id}"] = fn.call(null);
    }
    `
  );
  fn.call(null, sandbox);
  return bridge[id];
};
