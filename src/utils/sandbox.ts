import { Sandbox } from "./constant";

export const withSandbox = (dependency: Sandbox) => {
  const whitelist: (keyof Sandbox)[] = [...Object.keys(dependency)];

  const proxy = new Proxy(dependency, {
    get(_, prop) {
      if (whitelist.indexOf(prop) > -1) {
        return dependency[prop];
      } else {
        return null;
      }
    },
    has: () => true,
  });

  return proxy;
};
